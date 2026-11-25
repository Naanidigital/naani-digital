// ==============================================================================
// Persistent Queue Manager & Lease Broker (Stage 4)
// Mirroring the Stage 1 SQL schema contract: atomic claiming, leases, and reconciliation
// ==============================================================================

import {
  CampaignStatus,
  RecipientDispatchStatus,
  QueueRecipientItem,
  CampaignRunSummary,
  WorkerBatchClaimResult,
} from './types';
import { CampaignDraft } from '../campaignComposer/types';
import { NormalizedContact } from '../campaignImport/types';

const QUEUE_STORAGE_KEY_PREFIX = 'naani_crm_campaign_queue_';
const CAMPAIGN_RUNS_KEY = 'naani_crm_campaign_runs_v1';

export class CampaignQueueManager {
  private campaignId: string;
  private recipients: QueueRecipientItem[] = [];
  private campaignStatus: CampaignStatus = 'draft';
  private campaignName: string = '';
  private startedAt?: string;
  private completedAt?: string;
  private pausedAt?: string;
  private activeWorkers: Set<string> = new Set();
  private isDryRun: boolean = true;
  private pendingHeadIndex: number = 0;
  private requiresAdminReview: boolean = false;

  constructor(campaignId: string) {
    this.campaignId = campaignId;
    this.loadState();
  }

  /**
   * Initializes queue for a campaign from verified contacts and draft configuration
   */
  public initializeQueue(
    draft: CampaignDraft,
    eligibleContacts: NormalizedContact[],
    isDryRun: boolean = true
  ): void {
    this.campaignId = draft.id;
    this.campaignName = draft.name;
    this.campaignStatus = 'active';
    this.startedAt = new Date().toISOString();
    this.isDryRun = isDryRun;

    this.recipients = eligibleContacts.map((c, index) => {
      const recipientId = `rec_${draft.id}_${index + 1}_${Math.random().toString(36).substring(2, 7)}`;
      // Meta opaque callback token for webhook correlation (Stage 1.2 / 1.3 contract)
      const nonce = Math.random().toString(36).substring(2, 8);
      const bizOpaqueCallbackData = `cmp_${draft.id.substring(0, 12)}_rec_${index + 1}_${nonce}`;

      return {
        id: recipientId,
        campaignId: draft.id,
        recipientIndex: index + 1,
        phone: c.normalizedPhone,
        name: c.name || 'Valued Buyer',
        status: 'pending',
        attemptCount: 0,
        maxAttempts: 3,
        bizOpaqueCallbackData,
        auditLog: [
          {
            timestamp: new Date().toISOString(),
            action: 'Queued recipient',
            details: `Initial status: pending. Opaque callback token: ${bizOpaqueCallbackData}`,
          },
        ],
      };
    });

    this.saveState();
  }

  /**
   * Re-evaluates 131049-deferred/skipped recipients and returns them to the pending queue
   * once their deferralRetryUntil timestamp has elapsed.
   */
  public requeueDeferredRecipients(asOfIso?: string): number {
    const checkTimeIso = asOfIso || new Date().toISOString();
    let requeuedCount = 0;

    for (const r of this.recipients) {
      if (r.status === 'skipped' && r.deferralRetryUntil && r.deferralRetryUntil <= checkTimeIso) {
        r.status = 'pending';
        r.retryAfter = undefined;
        r.auditLog.push({
          timestamp: checkTimeIso,
          action: '131049 Deferral window expired',
          details: `Deferral until ${r.deferralRetryUntil} completed. Re-queued for batch claiming. Opt-in consent preserved.`,
        });
        r.deferralRetryUntil = undefined;
        requeuedCount++;
      }
    }

    if (requeuedCount > 0) {
      this.pendingHeadIndex = 0; // Reset search head to pick up re-queued items
      this.saveState();
    }
    return requeuedCount;
  }

  /**
   * Atomically claims a batch of recipients for a worker with a lease timeout
   * Mirrors Stage 1 SQL function: claim_campaign_recipient_batch()
   */
  public claimBatch(
    workerId: string,
    batchSize: number = 50,
    leaseDurationSeconds: number = 300,
    asOfIso?: string
  ): WorkerBatchClaimResult {
    if (this.campaignStatus !== 'active') {
      return {
        claimedBatch: [],
        workerId,
        leaseDurationSeconds,
        claimedAt: new Date().toISOString(),
        remainingQueueSize: this.getPendingCount(),
      };
    }

    const now = asOfIso ? new Date(asOfIso) : new Date();
    const leaseExpires = new Date(now.getTime() + leaseDurationSeconds * 1000).toISOString();
    const nowIso = now.toISOString();

    // Re-queue any 131049 deferred recipients whose retry timestamp has arrived
    this.requeueDeferredRecipients(nowIso);

    const claimedBatch: QueueRecipientItem[] = [];
    const len = this.recipients.length;
    let firstPending = -1;

    for (let i = this.pendingHeadIndex; i < len; i++) {
      if (claimedBatch.length >= batchSize) break;
      const r = this.recipients[i];

      // Claim if pending, or if transient retry whose retryAfter time has arrived
      const isRetryReady =
        r.status === 'pending' && (!r.retryAfter || r.retryAfter <= nowIso);

      if (isRetryReady) {
        r.status = 'claimed';
        r.workerId = workerId;
        r.leaseExpiresAt = leaseExpires;
        r.attemptCount += 1;
        r.lastAttemptAt = nowIso;
        r.auditLog.push({
          timestamp: nowIso,
          action: 'Leased to worker',
          details: `Worker ${workerId} leased item until ${leaseExpires} (Attempt ${r.attemptCount}/${r.maxAttempts})`,
        });

        claimedBatch.push(r);
      } else if (r.status === 'pending' && firstPending === -1) {
        firstPending = i;
      }
    }

    if (firstPending !== -1) {
      this.pendingHeadIndex = firstPending;
    } else if (claimedBatch.length > 0) {
      this.pendingHeadIndex = Math.min(len, this.pendingHeadIndex + claimedBatch.length);
    }

    this.activeWorkers.add(workerId);
    this.saveState();

    return {
      claimedBatch,
      workerId,
      leaseDurationSeconds,
      claimedAt: nowIso,
      remainingQueueSize: this.getPendingCount(),
    };
  }

  /**
   * Recovers stale leases from crashed or timed-out workers
   * Mirrors Stage 1 SQL function: recover_stale_campaign_leases()
   */
  public recoverStaleLeases(): number {
    const nowIso = new Date().toISOString();
    let recoveredCount = 0;

    for (const r of this.recipients) {
      if (r.status === 'claimed' && r.leaseExpiresAt && r.leaseExpiresAt < nowIso) {
        const crashedWorker = r.workerId || 'unknown';
        r.status = 'pending';
        r.workerId = undefined;
        r.leaseExpiresAt = undefined;
        r.auditLog.push({
          timestamp: nowIso,
          action: 'Stale lease recovered',
          details: `Worker ${crashedWorker} timed out. Item returned to pending queue.`,
        });
        recoveredCount++;
      }
    }

    if (recoveredCount > 0) {
      this.pendingHeadIndex = 0;
      this.saveState();
    }
    return recoveredCount;
  }

  /**
   * Marks recipient as successfully dispatched with Meta message ID
   */
  public recordSentSuccess(recipientId: string, metaMessageId: string): void {
    const r = this.recipients.find((item) => item.id === recipientId);
    if (!r) return;

    const nowIso = new Date().toISOString();
    r.status = 'sent';
    r.metaMessageId = metaMessageId;
    r.sentAt = nowIso;
    r.workerId = undefined;
    r.leaseExpiresAt = undefined;
    r.auditLog.push({
      timestamp: nowIso,
      action: 'Dispatched to Meta',
      details: `Accepted by WhatsApp Cloud API. Meta Message ID: ${metaMessageId}`,
    });

    this.checkCompletion();
    this.saveState();
  }

  /**
   * Marks recipient as sending_unknown due to network timeout or socket drop
   * STRICT SAFETY: Never automatically retried! Quarantined for reconciliation.
   */
  public recordAmbiguousTimeout(recipientId: string, errorDetails: string): void {
    const r = this.recipients.find((item) => item.id === recipientId);
    if (!r) return;

    const nowIso = new Date().toISOString();
    r.status = 'sending_unknown';
    r.errorMessage = errorDetails;
    r.workerId = undefined;
    r.leaseExpiresAt = undefined;
    r.auditLog.push({
      timestamp: nowIso,
      action: 'Ambiguous timeout quarantine',
      details: `Network timeout before Meta response. Quarantined as sending_unknown. Never auto-retried. Reason: ${errorDetails}`,
    });

    this.checkCompletion();
    this.saveState();
  }

  /**
   * Handles transient vs terminal failures with exponential retry scheduling
   */
  public recordFailure(
    recipientId: string,
    errorCode: string,
    errorMessage: string,
    canRetry: boolean,
    retryDelaySeconds: number = 30
  ): void {
    const r = this.recipients.find((item) => item.id === recipientId);
    if (!r) return;

    const now = new Date();
    const nowIso = now.toISOString();

    r.errorCode = errorCode;
    r.errorMessage = errorMessage;
    r.workerId = undefined;
    r.leaseExpiresAt = undefined;

    if (canRetry && r.attemptCount < r.maxAttempts) {
      const retryAt = new Date(now.getTime() + retryDelaySeconds * 1000).toISOString();
      r.status = 'pending';
      r.retryAfter = retryAt;
      r.auditLog.push({
        timestamp: nowIso,
        action: 'Transient error retry scheduled',
        details: `Error ${errorCode}: ${errorMessage}. Retry scheduled at ${retryAt} (Attempt ${r.attemptCount}/${r.maxAttempts})`,
      });
    } else {
      r.status = 'failed';
      r.auditLog.push({
        timestamp: nowIso,
        action: 'Terminal dispatch failure',
        details: `Exhausted retries or non-retryable error ${errorCode}: ${errorMessage}`,
      });
    }

    // Special handling for Spam/Quality rate restriction (131048)
    if (
      errorCode === 'SPAM_OR_QUALITY_RESTRICTION_131048' ||
      errorCode === 'MESSAGING_LIMIT_HIT_131048' ||
      errorCode.includes('131048')
    ) {
      this.requiresAdminReview = true;
      this.pause();
    }

    this.checkCompletion();
    this.saveState();
  }

  /**
   * Records Meta user marketing frequency restriction (Error 131049)
   * CRITICAL COMPLIANCE GUARANTEE:
   * - Does NOT mark recipient as opted-out
   * - Does NOT insert recipient into customer suppression list
   * - Preserves customer consent status as 'opted_in'
   * - Skips/defers recipient for this campaign according to configurable retry window
   */
  public recordMarketingRestriction(recipientId: string, retryHours: number = 24): void {
    const r = this.recipients.find((item) => item.id === recipientId);
    if (!r) return;

    const now = new Date();
    const nowIso = now.toISOString();
    const retryAtIso = new Date(now.getTime() + retryHours * 3600 * 1000).toISOString();

    r.status = 'skipped';
    r.errorCode = 'MARKETING_MESSAGE_RESTRICTION_131049';
    r.errorMessage = 'Recipient reached Meta marketing message frequency cap. Deferred/skipped without altering opt-in consent.';
    r.metaMarketingCapped = true;
    r.metaMarketingRestrictedAt = nowIso;
    r.deferralRetryUntil = retryAtIso;
    r.workerId = undefined;
    r.leaseExpiresAt = undefined;

    r.auditLog.push({
      timestamp: nowIso,
      action: 'Meta marketing restriction (131049)',
      details: `Skipped/deferred for current campaign. Customer consent preserved as opted_in. Re-evaluation scheduled after ${retryHours}h (${retryAtIso}).`,
    });

    this.checkCompletion();
    this.saveState();
  }

  /**
   * Marks recipient as suppressed during pre-send defense-in-depth check
   */
  public recordSuppressed(recipientId: string, reason: string): void {
    const r = this.recipients.find((item) => item.id === recipientId);
    if (!r) return;

    const nowIso = new Date().toISOString();
    r.status = 'suppressed';
    r.errorMessage = reason;
    r.workerId = undefined;
    r.leaseExpiresAt = undefined;
    r.auditLog.push({
      timestamp: nowIso,
      action: 'Blocked by pre-send compliance check',
      details: reason,
    });

    this.checkCompletion();
    this.saveState();
  }

  /**
   * Webhook event reconciliation (sent -> delivered -> read)
   * Safely reconciles sending_unknown records via biz_opaque_callback_data or meta_message_id
   */
  public reconcileWebhook(event: {
    metaMessageId?: string;
    bizOpaqueCallbackData?: string;
    status: 'delivered' | 'read' | 'failed';
    timestamp?: string;
    errorCode?: string;
  }): boolean {
    const nowIso = event.timestamp || new Date().toISOString();

    // Correlate by opaque token first (guaranteed exact match), then Meta message ID
    let r: QueueRecipientItem | undefined;
    let matchType: 'webhook_opaque_token' | 'webhook_meta_id' = 'webhook_meta_id';

    if (event.bizOpaqueCallbackData) {
      r = this.recipients.find((item) => item.bizOpaqueCallbackData === event.bizOpaqueCallbackData);
      if (r) matchType = 'webhook_opaque_token';
    }

    if (!r && event.metaMessageId) {
      r = this.recipients.find((item) => item.metaMessageId === event.metaMessageId);
      if (r) matchType = 'webhook_meta_id';
    }

    if (!r) return false;

    const prevStatus = r.status;
    if (event.status === 'delivered') {
      r.status = 'delivered';
      r.deliveredAt = nowIso;
    } else if (event.status === 'read') {
      r.status = 'read';
      r.readAt = nowIso;
    } else if (event.status === 'failed') {
      r.status = 'failed';
      r.errorCode = event.errorCode || 'WEBHOOK_FAILURE';
    }

    if (prevStatus === 'sending_unknown') {
      r.reconciledAt = nowIso;
      r.reconciledVia = matchType;
      r.auditLog.push({
        timestamp: nowIso,
        action: 'Reconciled from sending_unknown',
        details: `Correlated via ${matchType} from Meta webhook. Transitioned: sending_unknown -> ${event.status}`,
      });
    } else {
      r.auditLog.push({
        timestamp: nowIso,
        action: `Webhook update: ${event.status}`,
        details: `Handset status updated to ${event.status} via ${matchType}`,
      });
    }

    this.saveState();
    return true;
  }

  public pause(): void {
    if (this.campaignStatus === 'active') {
      this.campaignStatus = 'paused';
      this.pausedAt = new Date().toISOString();
      this.saveState();
    }
  }

  public resume(): void {
    if (this.campaignStatus === 'paused') {
      this.campaignStatus = 'active';
      this.pausedAt = undefined;
      this.saveState();
    }
  }

  public cancel(): void {
    this.campaignStatus = 'cancelled';
    this.completedAt = new Date().toISOString();
    for (const r of this.recipients) {
      if (r.status === 'pending' || r.status === 'claimed') {
        r.status = 'cancelled';
        r.workerId = undefined;
        r.leaseExpiresAt = undefined;
        r.auditLog.push({
          timestamp: this.completedAt,
          action: 'Campaign cancelled',
          details: 'Item cancelled by administrator action',
        });
      }
    }
    this.saveState();
  }

  private checkCompletion(): void {
    const isAllFinal = this.recipients.every(
      (r) =>
        r.status === 'sent' ||
        r.status === 'delivered' ||
        r.status === 'read' ||
        r.status === 'failed' ||
        r.status === 'suppressed' ||
        r.status === 'skipped' ||
        r.status === 'sending_unknown' ||
        r.status === 'cancelled'
    );

    if (isAllFinal && this.recipients.length > 0) {
      this.campaignStatus = 'completed';
      this.completedAt = new Date().toISOString();
    }
  }

  public getSummary(currentSpeedMsgsPerSec: number = 0): CampaignRunSummary {
    let pendingCount = 0;
    let claimedCount = 0;
    let sendingUnknownCount = 0;
    let sentCount = 0;
    let deliveredCount = 0;
    let readCount = 0;
    let failedCount = 0;
    let suppressedCount = 0;
    let skippedCount = 0;
    let cancelledCount = 0;

    for (const r of this.recipients) {
      switch (r.status) {
        case 'pending':
          pendingCount++;
          break;
        case 'claimed':
          claimedCount++;
          break;
        case 'sending_unknown':
          sendingUnknownCount++;
          break;
        case 'sent':
          sentCount++;
          break;
        case 'delivered':
          deliveredCount++;
          break;
        case 'read':
          readCount++;
          break;
        case 'failed':
          failedCount++;
          break;
        case 'suppressed':
          suppressedCount++;
          break;
        case 'skipped':
          skippedCount++;
          break;
        case 'cancelled':
          cancelledCount++;
          break;
      }
    }

    const unfinished = pendingCount + claimedCount;
    let estimatedSecondsRemaining: number | undefined;
    if (currentSpeedMsgsPerSec > 0 && unfinished > 0) {
      estimatedSecondsRemaining = Math.ceil(unfinished / currentSpeedMsgsPerSec);
    }

    return {
      campaignId: this.campaignId,
      campaignName: this.campaignName,
      status: this.campaignStatus,
      totalRecipients: this.recipients.length,
      pendingCount,
      claimedCount,
      sendingUnknownCount,
      sentCount,
      deliveredCount,
      readCount,
      failedCount,
      suppressedCount,
      skippedCount,
      cancelledCount,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
      pausedAt: this.pausedAt,
      currentSpeedMsgsPerSec,
      estimatedSecondsRemaining,
      activeWorkers: Array.from(this.activeWorkers),
      isDryRun: this.isDryRun,
      messagingTier: 'TIER_10K',
      dailyQuotaLimit: 10000,
      uniqueRecipientsCount: new Set(this.recipients.map((r) => r.phone)).size,
      effectiveThroughputLimitMPS: 25,
      isTierLimitExceeded: false,
      isLimitRetrievedFromMeta: false,
      isThroughputVerified: false,
      throughputStatus: 'application_fallback',
      pairCooldownSeconds: 60,
      requiresAdminReview: this.requiresAdminReview,
    };
  }

  public getRecipients(): QueueRecipientItem[] {
    return this.recipients;
  }

  public getPendingCount(): number {
    return this.recipients.filter((r) => r.status === 'pending').length;
  }

  private saveState(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        `${QUEUE_STORAGE_KEY_PREFIX}${this.campaignId}`,
        JSON.stringify({
          campaignId: this.campaignId,
          campaignName: this.campaignName,
          status: this.campaignStatus,
          startedAt: this.startedAt,
          completedAt: this.completedAt,
          pausedAt: this.pausedAt,
          isDryRun: this.isDryRun,
          recipients: this.recipients,
        })
      );
    } catch (err) {
      console.error('Failed to save queue state', err);
    }
  }

  private loadState(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(`${QUEUE_STORAGE_KEY_PREFIX}${this.campaignId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.campaignName = parsed.campaignName || '';
        this.campaignStatus = parsed.status || 'draft';
        this.startedAt = parsed.startedAt;
        this.completedAt = parsed.completedAt;
        this.pausedAt = parsed.pausedAt;
        this.isDryRun = parsed.isDryRun ?? true;
        this.recipients = parsed.recipients || [];
      }
    } catch (err) {
      console.error('Failed to load queue state', err);
    }
  }
}
