// ==============================================================================
// Meta WhatsApp Adaptive Rate Limiter & Multi-Dimensional Pacing Engine (Stage 4.3)
// Aligned with Current Meta Business Platform Architecture:
// - Graph API v24.0+ dynamic `whatsapp_business_manager_messaging_limit` lookup
// - Portfolio-Level Shared 24h Quotas (250, 2K, 10K, 100K, Unlimited)
// - Explicit application fallback throughput (25 MPS) until verified
// - Error 131048: spam/quality rate restriction (NOT daily quota exhaustion)
// - Error 131049: marketing restriction (preserves consent, no permanent suppression)
// - Cross-campaign persistent sender-recipient pair pacing (campaigns + CRM inbox)
// ==============================================================================

import {
  MetaMessagingTier,
  MESSAGING_TIER_QUOTAS,
  MetaQualityScore,
  MetaErrorCode,
  ErrorClassification,
  RateLimiterConfig,
  MetaMessagingLimitResponse,
  CrossCampaignPacingRecord,
  PacingCheckResult,
  PacingSourceType,
} from './types';

// Application fallback throughput when confirmed Meta account throughput is not verified
export const APPLICATION_FALLBACK_DEFAULT_MPS = 25;
export const DEFAULT_CONSERVATIVE_MPS = APPLICATION_FALLBACK_DEFAULT_MPS; // Alias for backward compatibility

/**
 * Cross-Campaign Persistent Pacing Store
 * Enforces per-recipient pair-rate cooldowns across ALL campaigns,
 * distributed workers, and direct one-to-one CRM inbox messages.
 */
export class CrossCampaignPacingStore {
  private static instance: CrossCampaignPacingStore;
  private records: Map<string, CrossCampaignPacingRecord> = new Map();

  public static getInstance(): CrossCampaignPacingStore {
    if (!CrossCampaignPacingStore.instance) {
      CrossCampaignPacingStore.instance = new CrossCampaignPacingStore();
    }
    return CrossCampaignPacingStore.instance;
  }

  public recordDispatch(
    phone: string,
    sourceType: PacingSourceType,
    options?: {
      campaignId?: string;
      workerId?: string;
      cooldownSeconds?: number;
      timestampIso?: string;
    }
  ): void {
    const nowIso = options?.timestampIso || new Date().toISOString();
    this.records.set(phone, {
      phone,
      lastDispatchedAt: nowIso,
      sourceType,
      campaignId: options?.campaignId,
      workerId: options?.workerId,
      cooldownSeconds: options?.cooldownSeconds || 60,
    });
  }

  public checkPacing(phone: string, requiredCooldownSeconds: number = 60): PacingCheckResult {
    const record = this.records.get(phone);
    if (!record) {
      return { canDispatch: true, waitSecondsRemaining: 0 };
    }

    const lastMs = new Date(record.lastDispatchedAt).getTime();
    const nowMs = Date.now();
    const elapsedSec = (nowMs - lastMs) / 1000;
    const cooldownToUse = Math.max(requiredCooldownSeconds, record.cooldownSeconds);

    if (elapsedSec < cooldownToUse) {
      const waitSec = Math.ceil(cooldownToUse - elapsedSec);
      return {
        canDispatch: false,
        waitSecondsRemaining: waitSec,
        lastDispatchedAt: record.lastDispatchedAt,
        sourceType: record.sourceType,
      };
    }

    return {
      canDispatch: true,
      waitSecondsRemaining: 0,
      lastDispatchedAt: record.lastDispatchedAt,
      sourceType: record.sourceType,
    };
  }

  public clear(): void {
    this.records.clear();
  }
}

export class AdaptiveRateLimiter {
  private config: RateLimiterConfig;
  private tokens: number;
  private lastTokenRefillTime: number;
  private slidingWindowTimestamps: number[] = [];
  private consecutiveRateLimits: number = 0;
  private pauseUntilTimestamp: number = 0;

  // 1. Recipient Pair Rate Limiter: In-memory cache + persistent database coordination
  private lastDispatchedPerPhone: Map<string, number> = new Map();

  // 2. Rolling 24-Hour Unique Recipients Quota Tracker (Portfolio Level)
  private uniqueRecipients24h: Set<string> = new Set();

  constructor(customConfig?: Partial<RateLimiterConfig>) {
    const tier: MetaMessagingTier = customConfig?.messagingTier || 'TIER_2K';
    const quality: MetaQualityScore = customConfig?.qualityScore || 'GREEN';
    const configuredMPS = customConfig?.configuredMessagesPerSecond || APPLICATION_FALLBACK_DEFAULT_MPS;
    const isThroughputVerified = customConfig?.isThroughputVerified ?? false;

    this.config = {
      configuredMessagesPerSecond: configuredMPS,
      burstCapacity: customConfig?.burstCapacity || configuredMPS * 2,
      isThroughputAssumption: customConfig?.configuredMessagesPerSecond === undefined,
      isThroughputVerified,
      throughputStatus: isThroughputVerified ? 'meta_confirmed' : 'application_fallback',
      wabaId: customConfig?.wabaId,
      messagingTier: tier,
      uniqueRecipientsDispatchedLast24h: customConfig?.uniqueRecipientsDispatchedLast24h || 0,
      isLimitRetrievedFromMeta: customConfig?.isLimitRetrievedFromMeta ?? false,
      limitRetrievedAt: customConfig?.limitRetrievedAt,
      limitLookupError: customConfig?.limitLookupError,
      minSecondsBetweenMessagesToSamePhone: customConfig?.minSecondsBetweenMessagesToSamePhone || 60,
      marketingRestrictionRetryHours: customConfig?.marketingRestrictionRetryHours || 24,
      qualityScore: quality,
      backoffBaseMs: customConfig?.backoffBaseMs || 1000,
      maxBackoffMs: customConfig?.maxBackoffMs || 60000,
    };

    this.tokens = this.config.burstCapacity;
    this.lastTokenRefillTime = Date.now();
  }

  // ---------------------------------------------------------------------------
  // 1. Dynamic Retrieval of Account Limits (Meta Graph API v24.0+ Adapter)
  // ---------------------------------------------------------------------------

  /**
   * Parses or updates messaging tier and quality score dynamically using Graph API v24.0+.
   * Inspects `whatsapp_business_manager_messaging_limit` (with legacy fallback).
   * Safely handles missing fields, permissions errors, unsupported versions, and unknown tiers.
   */
  public updateFromMetaGraphApiResponse(apiData?: MetaMessagingLimitResponse | null): void {
    if (!apiData) {
      this.config.limitLookupError = 'Empty or null response received from Meta Graph API';
      return;
    }

    // Safely handle Graph API errors (e.g. permissions, unsupported version, expired token)
    if (apiData.error) {
      this.config.limitLookupError = `Meta API Error (${apiData.error.code}): ${apiData.error.message}`;
      this.config.isLimitRetrievedFromMeta = false;
      // Retain conservative fallback (TIER_250) without throwing or crashing
      return;
    }

    // Extract raw tier indicator from v24.0+ field or fallback legacy field
    let rawLimit: string | undefined;
    const newField = apiData.whatsapp_business_manager_messaging_limit;
    if (typeof newField === 'string') {
      rawLimit = newField;
    } else if (typeof newField === 'object' && newField !== null) {
      rawLimit = String(newField.tier || newField.current_limit || newField.limit || '');
    } else if (typeof apiData.messaging_limit_tier === 'string') {
      rawLimit = apiData.messaging_limit_tier;
    }

    if (rawLimit && rawLimit.trim()) {
      const cleanTier = rawLimit.trim().toUpperCase();
      const tierMap: Record<string, MetaMessagingTier> = {
        TIER_50: 'TIER_50',
        TIER_250: 'TIER_250',
        TIER_2K: 'TIER_2K',
        TIER_10K: 'TIER_10K',
        TIER_100K: 'TIER_100K',
        TIER_UNLIMITED: 'TIER_UNLIMITED',
        UNTIERED: 'UNTIERED',
        // Also handle numeric representations if Meta returns raw recipient numbers:
        '50': 'TIER_50',
        '250': 'TIER_250',
        '2000': 'TIER_2K',
        '10000': 'TIER_10K',
        '100000': 'TIER_100K',
        'UNLIMITED': 'TIER_UNLIMITED',
      };

      if (cleanTier in tierMap) {
        this.config.messagingTier = tierMap[cleanTier];
        this.config.isLimitRetrievedFromMeta = true;
        this.config.limitRetrievedAt = new Date().toISOString();
        this.config.limitLookupError = undefined;
      } else {
        // Unknown future or unrecognized tier: Fail closed!
        this.config.messagingTier = 'TIER_UNKNOWN';
        this.config.isLimitRetrievedFromMeta = false;
        this.config.limitLookupError = `Unrecognized Meta messaging tier '${cleanTier}'. Failing closed (quota: 0) to prevent unsafe campaign dispatch.`;
      }
    } else {
      // Safe fallback when field is missing or empty: Fail closed to UNTIERED
      this.config.messagingTier = 'UNTIERED';
      this.config.isLimitRetrievedFromMeta = false;
      this.config.limitLookupError = 'Field whatsapp_business_manager_messaging_limit missing or invalid';
    }

    if (apiData.quality_rating) {
      const q = apiData.quality_rating.toUpperCase();
      if (q === 'GREEN' || q === 'YELLOW' || q === 'RED') {
        this.config.qualityScore = q as MetaQualityScore;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 2. DIMENSION 1: Instantaneous Throughput (MPS) & Token Bucket
  // ---------------------------------------------------------------------------

  /**
   * Returns effective messages-per-second, throttled dynamically by account quality score
   * Note: This is purely throughput (speed), independent of the 24-hour unique-recipient tier!
   */
  public getEffectiveMaxMsgsPerSecond(): number {
    const base = this.config.configuredMessagesPerSecond;
    switch (this.config.qualityScore) {
      case 'GREEN':
        return base;
      case 'YELLOW':
        // Degraded quality: throttle to 50% speed to allow quality score recovery
        return Math.max(5, Math.floor(base * 0.5));
      case 'RED':
        // Critical quality: throttle to 10% speed to protect account from suspension
        return Math.max(2, Math.floor(base * 0.1));
      case 'UNKNOWN':
      default:
        return Math.min(base, 20);
    }
  }

  public isPaused(): boolean {
    return Date.now() < this.pauseUntilTimestamp;
  }

  public getPauseRemainingMs(): number {
    return Math.max(0, this.pauseUntilTimestamp - Date.now());
  }

  private refillTokens(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastTokenRefillTime) / 1000;
    const effectiveRate = this.getEffectiveMaxMsgsPerSecond();

    const newTokens = elapsedSeconds * effectiveRate;
    if (newTokens > 0) {
      this.tokens = Math.min(this.config.burstCapacity, this.tokens + newTokens);
      this.lastTokenRefillTime = now;
    }
  }

  public async acquireToken(): Promise<void> {
    while (true) {
      const now = Date.now();
      if (now < this.pauseUntilTimestamp) {
        const waitMs = this.pauseUntilTimestamp - now;
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }

      this.refillTokens();
      if (this.tokens >= 1) {
        this.tokens -= 1;
        this.recordDispatchTimestamp(Date.now());
        return;
      }

      const effectiveRate = this.getEffectiveMaxMsgsPerSecond();
      const waitMs = Math.max(10, Math.ceil((1 / effectiveRate) * 1000));
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }

  // ---------------------------------------------------------------------------
  // 3. DIMENSION 2: Cross-Campaign Persistent Coordinated Pair-Rate Limiting
  // ---------------------------------------------------------------------------

  /**
   * Verifies that sending to this phone number will not violate Meta's pair limits.
   * NOTE: The cooldown (default: 60s) is an APPLICATION SAFETY SETTING, not a universal
   * public Meta numeric constant. It prevents triggering Meta Error 131056.
   *
   * Coordinates persistently across:
   * 1. Other concurrent workers in the same campaign.
   * 2. Other distinct campaigns running in the CRM.
   * 3. Direct one-to-one CRM inbox messages sent to this recipient.
   */
  public checkRecipientPairLimit(
    phone: string,
    persistentLastAttemptAtIso?: string,
    crossCampaignStore: CrossCampaignPacingStore = CrossCampaignPacingStore.getInstance()
  ): { canDispatch: boolean; waitSecondsRemaining: number; sourceType?: PacingSourceType } {
    const now = Date.now();
    const requiredCooldownMs = this.config.minSecondsBetweenMessagesToSamePhone * 1000;

    // 1. Check cross-campaign persistent pacing store (covers all campaigns & direct CRM inbox)
    const crossCheck = crossCampaignStore.checkPacing(phone, this.config.minSecondsBetweenMessagesToSamePhone);
    if (!crossCheck.canDispatch) {
      return {
        canDispatch: false,
        waitSecondsRemaining: crossCheck.waitSecondsRemaining,
        sourceType: crossCheck.sourceType,
      };
    }

    // 2. Check local in-memory cache for this worker/instance
    let mostRecentSendMs = this.lastDispatchedPerPhone.get(phone) || 0;

    // 3. Check persistent database timestamp (from shared queue rows or DB records)
    if (persistentLastAttemptAtIso) {
      const dbTs = new Date(persistentLastAttemptAtIso).getTime();
      if (!isNaN(dbTs) && dbTs > mostRecentSendMs) {
        mostRecentSendMs = dbTs;
      }
    }

    if (mostRecentSendMs > 0) {
      const elapsedMs = now - mostRecentSendMs;
      if (elapsedMs < requiredCooldownMs) {
        const waitSec = Math.ceil((requiredCooldownMs - elapsedMs) / 1000);
        return { canDispatch: false, waitSecondsRemaining: waitSec, sourceType: 'campaign' };
      }
    }

    return { canDispatch: true, waitSecondsRemaining: 0 };
  }

  public recordRecipientDispatched(
    phone: string,
    sourceType: PacingSourceType = 'campaign',
    options?: { campaignId?: string; workerId?: string }
  ): void {
    const now = Date.now();
    this.lastDispatchedPerPhone.set(phone, now);
    this.uniqueRecipients24h.add(phone);
    this.config.uniqueRecipientsDispatchedLast24h = this.uniqueRecipients24h.size;

    // Persist to cross-campaign pacing store so other campaigns/inbox notice immediately
    CrossCampaignPacingStore.getInstance().recordDispatch(phone, sourceType, {
      campaignId: options?.campaignId || this.config.wabaId,
      workerId: options?.workerId,
      cooldownSeconds: this.config.minSecondsBetweenMessagesToSamePhone,
    });
  }

  // ---------------------------------------------------------------------------
  // 4. DIMENSION 3: Portfolio-Level Rolling 24-Hour Unique-Recipient Quota
  // ---------------------------------------------------------------------------

  /**
   * Verifies whether the business portfolio has reached its 24-hour unique recipient tier limit.
   * Tier limits apply at the portfolio level and are shared across all phone numbers.
   */
  public checkDailyTierQuota(isNewRecipient: boolean): {
    isWithinQuota: boolean;
    currentUnique: number;
    maxTierQuota: number;
    tier: MetaMessagingTier;
  } {
    const maxQuota = MESSAGING_TIER_QUOTAS[this.config.messagingTier];
    const currentCount = this.uniqueRecipients24h.size;

    if (isNewRecipient && currentCount >= maxQuota) {
      return {
        isWithinQuota: false,
        currentUnique: currentCount,
        maxTierQuota: maxQuota,
        tier: this.config.messagingTier,
      };
    }

    return {
      isWithinQuota: true,
      currentUnique: currentCount,
      maxTierQuota: maxQuota,
      tier: this.config.messagingTier,
    };
  }

  // ---------------------------------------------------------------------------
  // 5. DIMENSION 4: Comprehensive Meta Error Code Classification
  // ---------------------------------------------------------------------------

  /**
   * Classifies raw Meta WhatsApp Cloud API response errors into precise actionable strategies
   */
  public static classifyMetaError(
    rawCode: number | string,
    rawMessage?: string,
    retryAfterSeconds?: number
  ): ErrorClassification {
    const codeNum = Number(rawCode);
    const upperStr = `${rawCode || ''} ${rawMessage || ''}`.toUpperCase();

    // 1. Throughput rate limit hit (Cloud API capacity: Error 130429)
    if (codeNum === 130429 || upperStr.includes('130429')) {
      return {
        code: 'RATE_LIMIT_THROUGHPUT_130429',
        rawErrorCode: 130429,
        message: rawMessage || 'Cloud API throughput limit hit. Exponential backoff required.',
        isRetryable: true,
        requiresBackoff: true,
        pauseCampaign: false,
        affectsSingleRecipientOnly: false,
        suggestedBackoffSeconds: retryAfterSeconds || 2,
      };
    }

    // 2. Per-Recipient pair rate limit (rapid repeated messages to same customer: Error 131056)
    if (codeNum === 131056 || upperStr.includes('131056')) {
      return {
        code: 'PAIR_RATE_LIMIT_131056',
        rawErrorCode: 131056,
        message: rawMessage || 'Pair rate limit hit: too many messages sent to this recipient in short interval.',
        isRetryable: true,
        requiresBackoff: false,
        pauseCampaign: false,
        affectsSingleRecipientOnly: true,
        suggestedBackoffSeconds: 60, // Re-queue recipient after 60s cooldown
      };
    }

    // 3. Spam/quality-related sending restriction (Error 131048)
    // CRITICAL: Treated strictly as a spam/quality restriction requiring administrator review,
    // NOT as proof that the daily portfolio quota is exhausted!
    if (codeNum === 131048 || upperStr.includes('131048')) {
      return {
        code: 'SPAM_OR_QUALITY_RESTRICTION_131048',
        rawErrorCode: 131048,
        message: rawMessage || 'Spam or account quality sending restriction hit (131048). Outbound dispatch paused for administrator review.',
        isRetryable: false,
        requiresBackoff: true,
        pauseCampaign: true,           // MUST pause campaign: requires explicit admin review before resuming
        requiresAdminReview: true,     // Admin review required
        affectsSingleRecipientOnly: false,
      };
    }

    // 4. Per-recipient marketing message frequency restriction (Error 131049)
    // Meta user-level cap: individual user has received too many marketing templates across WhatsApp
    // CRITICAL: Preserves actual customer consent status. Does NOT mark recipient opted_out or permanently suppressed.
    if (codeNum === 131049 || upperStr.includes('131049')) {
      return {
        code: 'MARKETING_MESSAGE_RESTRICTION_131049',
        rawErrorCode: 131049,
        message: rawMessage || 'Per-recipient marketing message frequency restriction: recipient capped by Meta. Customer consent preserved as opted_in.',
        isRetryable: false, // Non-retryable in current campaign run
        requiresBackoff: false,
        pauseCampaign: false, // Does NOT pause campaign: only affects this specific recipient
        affectsSingleRecipientOnly: true,
        doesNotAlterConsent: true, // Guarantees consent status is never corrupted to opted_out
      };
    }

    // 5. WABA Rate Limit or Graph API App Limit (Error 80007)
    if (codeNum === 80007 || upperStr.includes('80007')) {
      return {
        code: 'WABA_RATE_LIMIT_80007',
        rawErrorCode: 80007,
        message: rawMessage || 'WABA-level or Graph API rate limit hit. Global backoff required.',
        isRetryable: true,
        requiresBackoff: true,
        pauseCampaign: false,
        affectsSingleRecipientOnly: false,
        suggestedBackoffSeconds: retryAfterSeconds || 15,
      };
    }

    // 6. Authentication Failure (Error 190 / 401)
    if (codeNum === 190 || codeNum === 401 || upperStr.includes('190')) {
      return {
        code: 'AUTH_FAILURE_190',
        rawErrorCode: codeNum,
        message: rawMessage || 'Meta WABA access token is invalid or expired. Admin intervention required.',
        isRetryable: false,
        requiresBackoff: false,
        pauseCampaign: true, // Fatal for campaign
        affectsSingleRecipientOnly: false,
      };
    }

    // 7. Template Parameter / Translation / Rejection Errors
    if (codeNum === 132000) {
      return {
        code: 'TEMPLATE_PARAM_COUNT_132000',
        rawErrorCode: 132000,
        message: rawMessage || 'Template parameter count mismatch.',
        isRetryable: false,
        requiresBackoff: false,
        pauseCampaign: true,
        affectsSingleRecipientOnly: false,
      };
    }
    if (codeNum === 132001) {
      return {
        code: 'TEMPLATE_NOT_FOUND_132001',
        rawErrorCode: 132001,
        message: rawMessage || 'Template or language translation not found.',
        isRetryable: false,
        requiresBackoff: false,
        pauseCampaign: true,
        affectsSingleRecipientOnly: false,
      };
    }
    if (codeNum === 132015) {
      return {
        code: 'TEMPLATE_PAUSED_132015',
        rawErrorCode: 132015,
        message: rawMessage || 'Template has been paused by Meta due to low quality rating.',
        isRetryable: false,
        requiresBackoff: false,
        pauseCampaign: true,
        affectsSingleRecipientOnly: false,
      };
    }
    if (codeNum === 132016) {
      return {
        code: 'TEMPLATE_REJECTED_132016',
        rawErrorCode: 132016,
        message: rawMessage || 'Template was rejected by Meta policy review.',
        isRetryable: false,
        requiresBackoff: false,
        pauseCampaign: true,
        affectsSingleRecipientOnly: false,
      };
    }

    // 8. Transient Meta Server Errors (HTTP 500, 502, 503, error code 2)
    if (codeNum === 2 || codeNum === 500 || codeNum === 502 || codeNum === 503) {
      return {
        code: 'TRANSIENT_SERVER_ERROR_503',
        rawErrorCode: codeNum,
        message: rawMessage || 'Temporary Meta server failure. Retryable with bounded attempts.',
        isRetryable: true,
        requiresBackoff: true,
        pauseCampaign: false,
        affectsSingleRecipientOnly: false,
        suggestedBackoffSeconds: 5,
      };
    }

    // 9. Network Timeout / Socket Drop (Ambiguous Outcome)
    if (upperStr.includes('TIMEOUT') || upperStr.includes('TIMEDOUT') || codeNum === 504) {
      return {
        code: 'NETWORK_TIMEOUT_AMBIGUOUS',
        rawErrorCode: 504,
        message: rawMessage || 'Network timeout before Meta returned response. Quarantined as sending_unknown.',
        isRetryable: false, // NEVER automatically retry an ambiguous dispatch!
        requiresBackoff: false,
        pauseCampaign: false,
        affectsSingleRecipientOnly: true,
      };
    }

    // Default unknown error
    return {
      code: 'TRANSIENT_SERVER_ERROR_503',
      rawErrorCode: typeof rawCode === 'number' ? rawCode : undefined,
      message: rawMessage || `Meta API Error ${rawCode}`,
      isRetryable: false,
      requiresBackoff: false,
      pauseCampaign: false,
      affectsSingleRecipientOnly: true,
    };
  }

  /**
   * Applies exponential backoff with full jitter for throughput limit hits
   */
  public recordRateLimitHit(retryAfterSeconds?: number): number {
    this.consecutiveRateLimits++;

    let backoffMs: number;
    if (retryAfterSeconds && retryAfterSeconds > 0) {
      backoffMs = retryAfterSeconds * 1000;
    } else {
      const exp = Math.min(6, this.consecutiveRateLimits);
      const rawBackoff = this.config.backoffBaseMs * Math.pow(2, exp);
      // Full jitter: between 50% and 150% of calculated backoff
      const jitterFactor = 0.5 + Math.random();
      backoffMs = Math.min(this.config.maxBackoffMs, Math.round(rawBackoff * jitterFactor));
    }

    this.pauseUntilTimestamp = Date.now() + backoffMs;
    this.tokens = 0;
    return backoffMs;
  }

  public recordSuccess(): void {
    if (this.consecutiveRateLimits > 0) {
      this.consecutiveRateLimits = Math.max(0, this.consecutiveRateLimits - 1);
    }
  }

  private recordDispatchTimestamp(ts: number): void {
    this.slidingWindowTimestamps.push(ts);
    this.cleanSlidingWindow(ts);
  }

  private cleanSlidingWindow(now: number): void {
    const windowStart = now - 10000;
    this.slidingWindowTimestamps = this.slidingWindowTimestamps.filter((t) => t >= windowStart);
  }

  public getCurrentSpeed(): number {
    const now = Date.now();
    this.cleanSlidingWindow(now);
    if (this.slidingWindowTimestamps.length < 2) return 0;
    const count = this.slidingWindowTimestamps.length;
    return Math.round((count / 10) * 10) / 10;
  }

  public updateQualityScore(score: MetaQualityScore): void {
    this.config.qualityScore = score;
  }

  /**
   * Verifies whether the account tier permits launching/dispatching campaigns.
   * UNTIERED and TIER_UNKNOWN fail closed and return allowed: false.
   */
  public canLaunchCampaign(): { allowed: boolean; reason?: string } {
    if (this.config.messagingTier === 'UNTIERED') {
      return {
        allowed: false,
        reason: 'Account is UNTIERED. Promotional campaigns cannot be dispatched without an assigned Meta messaging tier.',
      };
    }
    if (this.config.messagingTier === 'TIER_UNKNOWN') {
      return {
        allowed: false,
        reason: 'Account messaging tier is unrecognized. Failing closed to prevent unsafe dispatch.',
      };
    }
    return { allowed: true };
  }

  public updateTier(tier: MetaMessagingTier): void {
    this.config.messagingTier = tier;
  }

  public setConfiguredMPS(mps: number): void {
    this.config.configuredMessagesPerSecond = mps;
    this.config.burstCapacity = mps * 2;
    this.config.isThroughputAssumption = false; // Confirmed configuration
  }

  public setPairCooldownSeconds(seconds: number): void {
    this.config.minSecondsBetweenMessagesToSamePhone = seconds;
  }

  public getConfig(): Readonly<RateLimiterConfig> {
    return this.config;
  }
}
