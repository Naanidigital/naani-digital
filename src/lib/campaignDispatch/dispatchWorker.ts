// ==============================================================================
// Campaign Dispatch Worker & Dry-Run Simulator (Stage 4)
// High-throughput multi-worker pipeline with pre-send compliance and lease recovery
// ==============================================================================

import { CampaignQueueManager } from './queueManager';
import { AdaptiveRateLimiter } from './rateLimiter';
import {
  CampaignRunSummary,
  QueueRecipientItem,
} from './types';

export interface DispatchPipelineOptions {
  workerCount?: number;          // Number of parallel workers (default 2)
  batchSize?: number;            // Items per claim (default 25)
  leaseSeconds?: number;         // Lease duration (default 120s)
  isDryRun?: boolean;            // Mandatory dry run flag (default true)
  onProgress?: (summary: CampaignRunSummary, latestItems: QueueRecipientItem[]) => void;
  // Simulation edge-case knobs for test suites
  simulateTimeoutProbability?: number;   // e.g. 0.01 for 1% timeout
  simulateRateLimitProbability?: number; // e.g. 0.01 for 1% rate limit
  simulateFailureProbability?: number;   // e.g. 0.01 for 1% transient error
}

export class CampaignDispatchPipeline {
  private queueManager: CampaignQueueManager;
  private rateLimiter: AdaptiveRateLimiter;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private options: Required<DispatchPipelineOptions>;
  private activeWorkers: Promise<void>[] = [];
  private dispatchedPhonesInCampaign: Set<string> = new Set();

  constructor(
    queueManager: CampaignQueueManager,
    rateLimiter?: AdaptiveRateLimiter,
    options?: DispatchPipelineOptions
  ) {
    this.queueManager = queueManager;
    this.rateLimiter = rateLimiter || new AdaptiveRateLimiter();
    this.options = {
      workerCount: options?.workerCount || 2,
      batchSize: options?.batchSize || 25,
      leaseSeconds: options?.leaseSeconds || 120,
      isDryRun: options?.isDryRun ?? true,
      onProgress: options?.onProgress || (() => {}),
      simulateTimeoutProbability: options?.simulateTimeoutProbability || 0.005,
      simulateRateLimitProbability: options?.simulateRateLimitProbability || 0.005,
      simulateFailureProbability: options?.simulateFailureProbability || 0.005,
    };
  }

  /**
   * Starts the multi-worker dispatch pipeline
   */
  public async start(): Promise<CampaignRunSummary> {
    if (this.isRunning) return this.queueManager.getSummary(this.rateLimiter.getCurrentSpeed());

    this.isRunning = true;
    this.isPaused = false;

    // Pre-populate set of already dispatched phones in this campaign for duplicate defense
    this.dispatchedPhonesInCampaign.clear();
    for (const r of this.queueManager.getRecipients()) {
      if (r.status === 'sent' || r.status === 'delivered' || r.status === 'read') {
        this.dispatchedPhonesInCampaign.add(r.phone);
      }
    }

    // Launch parallel workers
    this.activeWorkers = [];
    for (let i = 1; i <= this.options.workerCount; i++) {
      const workerId = `worker_${i}_${Math.random().toString(36).substring(2, 6)}`;
      this.activeWorkers.push(this.runWorkerLoop(workerId));
    }

    // Wait for all workers to finish their queue items
    await Promise.all(this.activeWorkers);

    this.isRunning = false;
    const finalSummary = this.queueManager.getSummary(this.rateLimiter.getCurrentSpeed());
    this.options.onProgress(finalSummary, this.queueManager.getRecipients());
    return finalSummary;
  }

  /**
   * Core worker loop: claims batches, enforces pre-send checks, paces with rate limiter
   */
  private async runWorkerLoop(workerId: string): Promise<void> {
    while (this.isRunning) {
      if (this.isPaused) {
        await new Promise((r) => setTimeout(r, 200));
        continue;
      }

      // Periodically check and recover stale leases
      this.queueManager.recoverStaleLeases();

      // Claim next batch atomically
      const claimResult = this.queueManager.claimBatch(
        workerId,
        this.options.batchSize,
        this.options.leaseSeconds
      );

      if (claimResult.claimedBatch.length === 0) {
        // If no items claimed, verify if any pending items remain or if all work is done
        if (claimResult.remainingQueueSize === 0) {
          // No more items in queue; worker exits
          break;
        } else {
          // Items exist but are in retry-backoff or leased by another worker; wait briefly
          await new Promise((r) => setTimeout(r, 250));
          continue;
        }
      }

      // Process batch items sequentially under rate-limited token pacing
      for (const item of claimResult.claimedBatch) {
        if (!this.isRunning || this.isPaused) break;

        // 1. Pre-Send Compliance & Safety Checks (Defense in Depth)
        // 1a. Duplicate Recipient Check
        const isDuplicate = this.dispatchedPhonesInCampaign.has(item.phone);
        if (isDuplicate) {
          this.queueManager.recordSuppressed(
            item.id,
            `Duplicate recipient protection: ${item.phone} was already dispatched in this campaign.`
          );
          continue;
        }

        // 1b. Per-Recipient Pair Rate Limit Check (Meta Error 131056 Protection)
        const pairCheck = this.rateLimiter.checkRecipientPairLimit(item.phone);
        if (!pairCheck.canDispatch) {
          this.queueManager.recordFailure(
            item.id,
            'PAIR_RATE_LIMIT_131056',
            `Meta Pair Rate Limit protection: recipient received message recently. Cooldown: ${pairCheck.waitSecondsRemaining}s`,
            true,
            pairCheck.waitSecondsRemaining
          );
          continue;
        }

        // 1c. Rolling 24-Hour Unique-Recipient Quota Check (Portfolio Daily Quota Protection)
        // Kept strictly separate from spam/quality restriction error 131048!
        const quotaCheck = this.rateLimiter.checkDailyTierQuota(true);
        if (!quotaCheck.isWithinQuota) {
          this.pause();
          this.queueManager.recordFailure(
            item.id,
            'PORTFOLIO_DAILY_QUOTA_EXHAUSTED',
            `Campaign paused: Meta 24-hour unique recipient portfolio quota (${quotaCheck.maxTierQuota.toLocaleString()}) reached for account tier.`,
            false
          );
          break;
        }

        // 2. Acquire pacing token from rate limiter
        await this.rateLimiter.acquireToken();

        // 3. Dispatch Execution (DRY-RUN ENFORCEMENT)
        if (this.options.isDryRun) {
          await this.executeDryRunDispatch(item, workerId);
        } else {
          // Live sending is blocked in Stage 4
          throw new Error('CRITICAL SAFETY: Live sending is disabled in Stage 4. Only dry-run is permitted.');
        }

        // Notify progress observer
        const summary = this.queueManager.getSummary(this.rateLimiter.getCurrentSpeed());
        this.options.onProgress(summary, this.queueManager.getRecipients());
      }
    }
  }

  /**
   * Dry-run simulation simulating realistic network outcomes, timeouts, and webhooks
   */
  private async executeDryRunDispatch(item: QueueRecipientItem, workerId: string): Promise<void> {
    // Micro-delay to simulate network roundtrip (5–15ms)
    await new Promise((r) => setTimeout(r, 5 + Math.random() * 10));

    const rand = Math.random();

    // 1. Simulate Rate Limit (HTTP 429)
    if (rand < this.options.simulateRateLimitProbability) {
      const backoffMs = this.rateLimiter.recordRateLimitHit(2); // 2-second Retry-After
      this.queueManager.recordFailure(
        item.id,
        'META_RATE_LIMIT_130429',
        `Simulated HTTP 429 Rate Limit Hit. Backoff: ${backoffMs}ms`,
        true,
        Math.ceil(backoffMs / 1000)
      );
      return;
    }

    // 2. Simulate Transient 503 Gateway Error
    if (rand < this.options.simulateRateLimitProbability + this.options.simulateFailureProbability) {
      this.queueManager.recordFailure(
        item.id,
        'META_TRANSIENT_503',
        'Simulated Meta 503 Service Unavailable',
        true,
        5 // retry in 5s
      );
      return;
    }

    // 3. Simulate Ambiguous Network Timeout (Stage 1 contract: sending_unknown)
    if (
      rand <
      this.options.simulateRateLimitProbability +
        this.options.simulateFailureProbability +
        this.options.simulateTimeoutProbability
    ) {
      this.queueManager.recordAmbiguousTimeout(
        item.id,
        'Simulated Gateway Timeout (504): socket dropped before Meta returned message ID'
      );
      return;
    }

    // 4. Successful Dispatch
    const metaMessageId = `wamid.HBgM${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}A`;
    this.rateLimiter.recordSuccess();
    this.rateLimiter.recordRecipientDispatched(item.phone, 'campaign', {
      campaignId: item.campaignId,
      workerId,
    });
    this.dispatchedPhonesInCampaign.add(item.phone);
    this.queueManager.recordSentSuccess(item.id, metaMessageId);

    // Asynchronously simulate Meta handset delivery & read webhooks
    setTimeout(() => {
      this.queueManager.reconcileWebhook({
        metaMessageId,
        bizOpaqueCallbackData: item.bizOpaqueCallbackData,
        status: 'delivered',
        timestamp: new Date().toISOString(),
      });
      // Further simulate read receipt after another short delay
      setTimeout(() => {
        this.queueManager.reconcileWebhook({
          metaMessageId,
          bizOpaqueCallbackData: item.bizOpaqueCallbackData,
          status: 'read',
          timestamp: new Date().toISOString(),
        });
      }, 30);
    }, 20);
  }

  public pause(): void {
    this.isPaused = true;
    this.queueManager.pause();
  }

  public resume(): void {
    this.isPaused = false;
    this.queueManager.resume();
  }

  public cancel(): void {
    this.isRunning = false;
    this.queueManager.cancel();
  }

  public getSummary(): CampaignRunSummary {
    return this.queueManager.getSummary(this.rateLimiter.getCurrentSpeed());
  }

  public getRateLimiter(): AdaptiveRateLimiter {
    return this.rateLimiter;
  }
}
