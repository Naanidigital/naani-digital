// ==============================================================================
// Campaign Dispatch, Rate Limiting & Queue Pipeline Types (Stage 4.3 Correction)
// Incorporates Current Meta Business Platform Model:
// - Separate Graph API versions: v21.0 for messaging vs v24.0 for limit lookup
// - Dynamic lookup of `whatsapp_business_manager_messaging_limit`
// - Explicit application fallback throughput (25 MPS) until verified
// - Error 131048: spam/quality rate restriction (NOT daily quota exhaustion)
// - Error 131049: marketing restriction (preserves consent, no permanent suppression)
// - Cross-campaign persistent sender-recipient pair pacing (campaigns + CRM inbox)
// ==============================================================================

export const META_MESSAGING_GRAPH_VERSION = 'v21.0';
export const META_LIMIT_LOOKUP_GRAPH_VERSION = 'v24.0';
export const APPLICATION_FALLBACK_DEFAULT_MPS = 25;

export type CampaignStatus =
  | 'draft'
  | 'scheduled'
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'failed';

export type RecipientDispatchStatus =
  | 'pending'           // In queue, waiting to be claimed
  | 'claimed'           // Leased by a worker with active lease
  | 'sending_unknown'   // Ambiguous outcome: network timeout before Meta response
  | 'sent'              // Meta accepted message (meta_message_id recorded)
  | 'delivered'         // Meta status webhook: delivered to handset
  | 'read'              // Meta status webhook: read by recipient
  | 'failed'            // Meta rejected or terminal failure
  | 'suppressed'        // Blocked pre-send by consent/suppression check
  | 'skipped'           // Temporarily skipped/deferred (e.g. 131049 Meta marketing cap; consent preserved)
  | 'cancelled';        // Campaign was stopped

/**
 * Current Meta WhatsApp Business Platform Messaging-Limit Tiers
 * NOTE: Limits apply at the Business Portfolio / WABA level and are shared across
 * all phone numbers registered under the portfolio. These are 24-hour unique-user
 * quotas, completely decoupled from messages-per-second (MPS) throughput.
 *
 * Explicit Handling:
 * - TIER_50: Strictly 50 recipients (never interpreted as 250 or higher).
 * - TIER_250: 250 unique business-initiated recipients per rolling 24h.
 * - TIER_2K: 2,000 unique recipients per rolling 24h (Standard verified portfolio base tier).
 * - TIER_10K: 10,000 unique recipients per rolling 24h.
 * - TIER_100K: 100,000 unique recipients per rolling 24h.
 * - TIER_UNLIMITED: Unlimited (Infinity) unique recipients per rolling 24h.
 * - UNTIERED: Strict fail-safe. Quota = 0, campaign dispatch blocked.
 * - TIER_UNKNOWN: Strict fail-closed. Quota = 0, unknown future values block campaign dispatch.
 */
export type MetaMessagingTier =
  | 'TIER_50'
  | 'TIER_250'
  | 'TIER_2K'
  | 'TIER_10K'
  | 'TIER_100K'
  | 'TIER_UNLIMITED'
  | 'UNTIERED'
  | 'TIER_UNKNOWN';

export const MESSAGING_TIER_QUOTAS: Record<MetaMessagingTier, number> = {
  TIER_50: 50,
  TIER_250: 250,
  TIER_2K: 2000,
  TIER_10K: 10000,
  TIER_100K: 100000,
  TIER_UNLIMITED: Infinity,
  UNTIERED: 0,
  TIER_UNKNOWN: 0,
};

export type MetaQualityScore = 'GREEN' | 'YELLOW' | 'RED' | 'UNKNOWN';

/**
 * Standard Meta Cloud API Error Codes for WhatsApp Business Platform
 */
export type MetaErrorCode =
  | 'RATE_LIMIT_THROUGHPUT_130429'            // Cloud API messages-per-second throughput limit hit
  | 'PAIR_RATE_LIMIT_131056'                  // Recipient pair rate limit: too many messages to same recipient in short interval
  | 'SPAM_OR_QUALITY_RESTRICTION_131048'      // Spam/quality sending restriction (requires admin review before resume)
  | 'MESSAGING_LIMIT_HIT_131048'              // Backward compatibility alias for 131048
  | 'MARKETING_MESSAGE_RESTRICTION_131049'    // Per-recipient marketing message frequency restriction (Meta user-level cap; consent untouched)
  | 'PORTFOLIO_DAILY_QUOTA_EXHAUSTED'         // Internal tracker: rolling 24h portfolio quota reached based on delivery/tier data
  | 'WABA_RATE_LIMIT_80007'                   // WABA-level or Graph API app-level rate limit hit
  | 'AUTH_FAILURE_190'                        // Access token invalid, expired, or revoked
  | 'TEMPLATE_PARAM_COUNT_132000'             // Template parameter count mismatch
  | 'TEMPLATE_NOT_FOUND_132001'               // Template does not exist or translation missing
  | 'TEMPLATE_PAUSED_132015'                  // Template paused by Meta due to low quality rating
  | 'TEMPLATE_REJECTED_132016'                // Template rejected by Meta policy review
  | 'TRANSIENT_SERVER_ERROR_503'              // Meta 500/502/503 temporary server outage
  | 'NETWORK_TIMEOUT_AMBIGUOUS';              // ETIMEDOUT / 504 Gateway Timeout before response

export interface ErrorClassification {
  code: MetaErrorCode;
  rawErrorCode?: number;
  message: string;
  isRetryable: boolean;
  requiresBackoff: boolean;
  pauseCampaign: boolean;
  requiresAdminReview?: boolean;
  affectsSingleRecipientOnly: boolean;
  suggestedBackoffSeconds?: number;
  doesNotAlterConsent?: boolean;
}

/**
 * Graph API v24.0+ messaging limit response payload structure
 */
export interface MetaMessagingLimitResponse {
  whatsapp_business_manager_messaging_limit?:
    | string
    | {
        tier?: string;
        limit?: string | number;
        current_limit?: string | number;
      };
  messaging_limit_tier?: string; // Legacy fallback field
  quality_rating?: string;
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
}

/**
 * Cross-campaign sender-recipient pair pacing record
 * Spans all campaigns, distributed workers, and one-to-one CRM inbox messages
 */
export type PacingSourceType = 'campaign' | 'crm_inbox' | 'worker';

export interface CrossCampaignPacingRecord {
  phone: string;
  lastDispatchedAt: string; // ISO string
  sourceType: PacingSourceType;
  campaignId?: string;
  workerId?: string;
  cooldownSeconds: number;
}

export interface PacingCheckResult {
  canDispatch: boolean;
  waitSecondsRemaining: number;
  lastDispatchedAt?: string;
  sourceType?: PacingSourceType;
}

/**
 * Portfolio-Level Limit & Throughput Configuration
 */
export interface RateLimiterConfig {
  // 1. Throughput: Messages per second (Token Bucket pacing)
  configuredMessagesPerSecond: number; // Application fallback default: 25 MPS
  burstCapacity: number;
  isThroughputAssumption: boolean;     // True if MPS is an application fallback rather than Meta confirmed
  isThroughputVerified: boolean;       // False until verified via official business manager allocation
  throughputStatus: 'application_fallback' | 'meta_confirmed';

  // 2. Business Portfolio Rolling 24-Hour Unique-Recipient Quota
  wabaId?: string;
  messagingTier: MetaMessagingTier;
  uniqueRecipientsDispatchedLast24h: number;
  isLimitRetrievedFromMeta: boolean;   // True if fetched dynamically from Meta Graph API v24.0
  limitRetrievedAt?: string;
  limitLookupError?: string;

  // 3. Cross-Campaign Pair Rate Limiting (Application Safety Setting)
  // Configurable safety setting to prevent triggering Meta Error 131056 across all campaigns & CRM inbox
  minSecondsBetweenMessagesToSamePhone: number; // Default: 60s (Configurable)
  marketingRestrictionRetryHours: number;       // Default: 24h for Error 131049 temporary deferral

  // 4. Quality & Restrictions
  qualityScore: MetaQualityScore;
  backoffBaseMs: number;
  maxBackoffMs: number;
}

export interface QueueRecipientItem {
  id: string;
  campaignId: string;
  recipientIndex: number;
  phone: string;                // E.164 digits
  name: string;
  status: RecipientDispatchStatus;
  workerId?: string;
  leaseExpiresAt?: string;      // ISO timestamp for worker lease
  attemptCount: number;
  maxAttempts: number;
  lastAttemptAt?: string;
  metaMessageId?: string;       // Meta Graph API 'wamid.HBg...'
  bizOpaqueCallbackData?: string; // Opaque callback token for correlation
  errorCode?: MetaErrorCode | string;
  errorMessage?: string;
  retryAfter?: string;          // ISO timestamp if rate limited or backoff scheduled
  metaMarketingCapped?: boolean; // Error 131049: recipient capped by Meta; consent status preserved
  metaMarketingRestrictedAt?: string;
  deferralRetryUntil?: string;   // ISO timestamp for deferred re-evaluation
  interpolatedBody?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  reconciledAt?: string;
  reconciledVia?: 'webhook_opaque_token' | 'webhook_meta_id' | 'manual_admin';
  auditLog: Array<{ timestamp: string; action: string; details?: string }>;
}

export interface CampaignRunSummary {
  campaignId: string;
  campaignName: string;
  status: CampaignStatus;
  totalRecipients: number;
  pendingCount: number;
  claimedCount: number;
  sendingUnknownCount: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  suppressedCount: number;
  skippedCount: number;
  cancelledCount: number;
  startedAt?: string;
  completedAt?: string;
  pausedAt?: string;
  currentSpeedMsgsPerSec: number;
  estimatedSecondsRemaining?: number;
  activeWorkers: string[];
  lastStaleLeaseRecoveryAt?: string;
  isDryRun: boolean;
  // Portfolio & Quota Audit Metrics
  messagingTier: MetaMessagingTier;
  dailyQuotaLimit: number;
  uniqueRecipientsCount: number;
  effectiveThroughputLimitMPS: number;
  isTierLimitExceeded: boolean;
  isLimitRetrievedFromMeta: boolean;
  isThroughputVerified: boolean;
  throughputStatus: 'application_fallback' | 'meta_confirmed';
  pairCooldownSeconds: number;
  requiresAdminReview?: boolean;
}

export interface WorkerBatchClaimResult {
  claimedBatch: QueueRecipientItem[];
  workerId: string;
  leaseDurationSeconds: number;
  claimedAt: string;
  remainingQueueSize: number;
}
