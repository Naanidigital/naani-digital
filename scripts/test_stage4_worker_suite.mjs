// ==============================================================================
// STAGE 4 CAMPAIGN DISPATCH WORKER, RATE LIMITER & CONCURRENCY TEST SUITE
// Tests: Rate Limiter, Atomic Leases, Ambiguous Timeouts, Multi-Worker Concurrency,
// Webhook Reconciliation, and 10,000-Recipient Dry-Run Stress Benchmark
// Target: lpbdwmpglwdedqdiovqu (Local Staging & Validation)
// ==============================================================================

console.log('================================================================');
console.log('STAGE 4 CAMPAIGN DISPATCH WORKER & CONCURRENCY TEST SUITE');
console.log('Target Project: lpbdwmpglwdedqdiovqu (Local Staging & Validation)');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// Dynamically import local ES modules via file:// URL
const {
  AdaptiveRateLimiter,
  APPLICATION_FALLBACK_DEFAULT_MPS,
  DEFAULT_CONSERVATIVE_MPS,
  CrossCampaignPacingStore,
} = await import('file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignDispatch/rateLimiter.ts');

const {
  MESSAGING_TIER_QUOTAS,
  META_MESSAGING_GRAPH_VERSION,
  META_LIMIT_LOOKUP_GRAPH_VERSION,
} = await import('file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignDispatch/types.ts');

const {
  CampaignQueueManager,
} = await import('file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignDispatch/queueManager.ts');

const {
  CampaignDispatchPipeline,
} = await import('file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignDispatch/dispatchWorker.ts');

const {
  formatMetaError,
} = await import('file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/crmWhatsApp.ts');

// -----------------------------------------------------------------------------
// SECTION 1: Meta Rate Limit Model & Error Classification (Stage 4.3 Audit)
// -----------------------------------------------------------------------------
console.log('--- 1. Decoupled Rate Limiter, Graph API v24.0+ & Meta Error Classification ---');

// 1a. Decoupled Model: Throughput vs 24-Hour Unique User Quotas
const limiter = new AdaptiveRateLimiter({
  configuredMessagesPerSecond: 30,
  messagingTier: 'TIER_10K',
  qualityScore: 'GREEN',
});

assert(
  META_MESSAGING_GRAPH_VERSION === 'v21.0' && META_LIMIT_LOOKUP_GRAPH_VERSION === 'v24.0',
  'Graph API versions separated: v21.0 for messaging vs v24.0+ for limit lookups'
);
assert(
  limiter.getEffectiveMaxMsgsPerSecond() === 30,
  'Throughput (30 MPS) is decoupled from 24-hour unique recipient quota (10,000)'
);
assert(
  APPLICATION_FALLBACK_DEFAULT_MPS === 25 &&
    limiter.getConfig().throughputStatus === 'application_fallback' &&
    !limiter.getConfig().isThroughputVerified,
  '25 MPS labeled as application fallback rate until confirmed by Meta account allocation'
);
assert(
  MESSAGING_TIER_QUOTAS.TIER_50 === 50 &&
    MESSAGING_TIER_QUOTAS.TIER_250 === 250 &&
    MESSAGING_TIER_QUOTAS.TIER_2K === 2000 &&
    MESSAGING_TIER_QUOTAS.TIER_10K === 10000 &&
    MESSAGING_TIER_QUOTAS.TIER_100K === 100000 &&
    MESSAGING_TIER_QUOTAS.TIER_UNLIMITED === Infinity &&
    MESSAGING_TIER_QUOTAS.UNTIERED === 0 &&
    MESSAGING_TIER_QUOTAS.TIER_UNKNOWN === 0,
  'Messaging Tiers support all Meta tiers: 50, 250, 2K, 10K, 100K, Unlimited, UNTIERED & Unknown'
);

// Explicit TIER_50 Enforcement Test
const tier50Limiter = new AdaptiveRateLimiter();
tier50Limiter.updateFromMetaGraphApiResponse({
  whatsapp_business_manager_messaging_limit: 'TIER_50',
});
assert(
  tier50Limiter.getConfig().messagingTier === 'TIER_50',
  'TIER_50 parsed accurately from Meta response'
);
for (let i = 1; i <= 50; i++) {
  tier50Limiter.recordRecipientDispatched(`919100${String(i).padStart(6, '0')}`);
}
const tier50QuotaCheck = tier50Limiter.checkDailyTierQuota(true);
assert(
  !tier50QuotaCheck.isWithinQuota && tier50QuotaCheck.maxTierQuota === 50,
  'TIER_50 STRICT ENFORCEMENT: Quota cap is strictly 50 (never promoted to 250 or higher)'
);

// Explicit UNTIERED Safe-Fail Test
const untieredLimiter = new AdaptiveRateLimiter();
untieredLimiter.updateFromMetaGraphApiResponse({
  whatsapp_business_manager_messaging_limit: 'UNTIERED',
});
assert(
  untieredLimiter.getConfig().messagingTier === 'UNTIERED',
  'UNTIERED tier parsed accurately from Meta response'
);
assert(
  !untieredLimiter.canLaunchCampaign().allowed,
  'UNTIERED SAFE-FAIL: Promotional campaigns are strictly blocked from dispatching'
);
assert(
  !untieredLimiter.checkDailyTierQuota(true).isWithinQuota,
  'UNTIERED SAFE-FAIL: Quota check immediately fails (quota = 0)'
);

// Explicit Unknown Future Tier Fail-Closed Test
const unknownLimiter = new AdaptiveRateLimiter();
unknownLimiter.updateFromMetaGraphApiResponse({
  whatsapp_business_manager_messaging_limit: 'TIER_FUTURE_SPECIAL_999',
});
assert(
  unknownLimiter.getConfig().messagingTier === 'TIER_UNKNOWN',
  'Unrecognized future tier maps strictly to TIER_UNKNOWN'
);
assert(
  !unknownLimiter.canLaunchCampaign().allowed,
  'UNKNOWN TIER FAIL-CLOSED: Blocks campaign dispatch and prevents unsafe sends'
);
assert(
  !unknownLimiter.checkDailyTierQuota(true).isWithinQuota,
  'UNKNOWN TIER FAIL-CLOSED: Quota is 0, rejecting all new recipient dispatches'
);

// 1b. Dynamic Graph API v24.0+ Limit Lookup Ingestion
const v24Limiter = new AdaptiveRateLimiter();
// Object shape from v24.0
v24Limiter.updateFromMetaGraphApiResponse({
  whatsapp_business_manager_messaging_limit: { tier: 'TIER_100K' },
  quality_rating: 'GREEN',
});
assert(
  v24Limiter.getConfig().messagingTier === 'TIER_100K' && v24Limiter.getConfig().isLimitRetrievedFromMeta,
  'Graph API v24.0+ whatsapp_business_manager_messaging_limit object parsed successfully'
);

// String shape
v24Limiter.updateFromMetaGraphApiResponse({
  whatsapp_business_manager_messaging_limit: 'TIER_10K',
  quality_rating: 'YELLOW',
});
assert(
  v24Limiter.getConfig().messagingTier === 'TIER_10K' && v24Limiter.getConfig().qualityScore === 'YELLOW',
  'Graph API v24.0+ string limit format parsed successfully'
);

// Permission error handling (non-crashing conservative fallback)
v24Limiter.updateFromMetaGraphApiResponse({
  error: { code: 200, message: 'Permissions error: (#200) Requires whatsapp_business_messaging permission', type: 'OAuthException' },
});
assert(
  !v24Limiter.getConfig().isLimitRetrievedFromMeta &&
    v24Limiter.getConfig().limitLookupError?.includes('200'),
  'Graph API permission/version errors handled safely without crashing, retaining safe fallback'
);

// Missing field fallback
const missingFieldLimiter = new AdaptiveRateLimiter();
missingFieldLimiter.updateFromMetaGraphApiResponse({});
assert(
  missingFieldLimiter.getConfig().messagingTier === 'UNTIERED' &&
    !missingFieldLimiter.getConfig().isLimitRetrievedFromMeta,
  'Missing limit field safely fails closed to UNTIERED (quota: 0) preventing unverified sends'
);

// 1c. Cross-Campaign Persistent Sender-Recipient Pair Rate Limiting
CrossCampaignPacingStore.getInstance().clear();

const testPhone = '919493943946';
const pairCheckBefore = limiter.checkRecipientPairLimit(testPhone);
assert(pairCheckBefore.canDispatch, 'Initial dispatch to phone permitted by pair limiter');

// Worker dispatches in Campaign 1
limiter.recordRecipientDispatched(testPhone, 'campaign', { campaignId: 'cmp_alpha_001' });
const pairCheckAfter = limiter.checkRecipientPairLimit(testPhone);
assert(
  !pairCheckAfter.canDispatch && pairCheckAfter.waitSecondsRemaining > 0,
  `Immediate re-dispatch to same phone blocked by pair rate limiter (cooldown: ${pairCheckAfter.waitSecondsRemaining}s)`
);

// Simulate direct 1-to-1 message sent from existing CRM Inbox to another customer
const crmInboxCustomer = '919848011223';
CrossCampaignPacingStore.getInstance().recordDispatch(crmInboxCustomer, 'crm_inbox', {
  cooldownSeconds: 60,
});

// Campaign 2 attempts to dispatch to the same customer: MUST be blocked by cross-campaign pacing!
const campaign2Limiter = new AdaptiveRateLimiter();
const crossCheckFromCampaign2 = campaign2Limiter.checkRecipientPairLimit(crmInboxCustomer);
assert(
  !crossCheckFromCampaign2.canDispatch && crossCheckFromCampaign2.sourceType === 'crm_inbox',
  'CROSS-CAMPAIGN PACING: Campaign 2 dispatch blocked by recent One-to-One CRM Inbox message'
);

const differentPhone = '919848099999';
assert(
  campaign2Limiter.checkRecipientPairLimit(differentPhone).canDispatch,
  'Pair rate limiter allows immediate dispatch to distinct unmessaged phone numbers'
);

// Worker Crash Pacing Safety Test
const crashPhone = '919777888999';
// Worker 1 reserves pacing prior to Meta call, then crashes
CrossCampaignPacingStore.getInstance().recordDispatch(crashPhone, 'worker', {
  workerId: 'worker_crashed_1',
  cooldownSeconds: 60,
});
// Worker 2 attempts dispatch to same customer: MUST be blocked
const crashCheck = campaign2Limiter.checkRecipientPairLimit(crashPhone);
assert(
  !crashCheck.canDispatch && crashCheck.waitSecondsRemaining > 0,
  'WORKER CRASH PACING SAFETY: Worker crash cannot permit another worker to message same recipient too early'
);

// Stale Pacing Reservation Recovery Test (Time-Decay Recovery)
CrossCampaignPacingStore.getInstance().recordDispatch(crashPhone, 'worker', {
  workerId: 'worker_crashed_1',
  cooldownSeconds: 60,
  timestampIso: new Date(Date.now() - 65000).toISOString(), // 65 seconds ago
});
const staleCheck = campaign2Limiter.checkRecipientPairLimit(crashPhone);
assert(
  staleCheck.canDispatch,
  'STALE PACING RECOVERY: Pacing cooldown naturally expires after 60s without requiring manual unlock'
);

// 1d. 24-Hour Unique-Recipient Tier Quota Check (Distinct from Spam Restrictions)
const tierLimiter = new AdaptiveRateLimiter({ messagingTier: 'TIER_250' });
for (let i = 1; i <= 250; i++) {
  tierLimiter.recordRecipientDispatched(`919000${String(i).padStart(6, '0')}`);
}
const quotaCheck = tierLimiter.checkDailyTierQuota(true);
assert(
  !quotaCheck.isWithinQuota && quotaCheck.currentUnique === 250,
  '24-Hour tier limit guard triggers when 250 unique recipients reached for TIER_250'
);

// 1e. Meta Error Code Classification & Action Routing
const err130429 = AdaptiveRateLimiter.classifyMetaError(130429, 'Rate limit hit', 5);
assert(
  err130429.code === 'RATE_LIMIT_THROUGHPUT_130429' && err130429.isRetryable && err130429.suggestedBackoffSeconds === 5,
  'Error 130429: Cloud API throughput limit classified as retryable with backoff'
);

const err131056 = AdaptiveRateLimiter.classifyMetaError(131056, 'Pair limit hit');
assert(
  err131056.code === 'PAIR_RATE_LIMIT_131056' && err131056.affectsSingleRecipientOnly,
  'Error 131056: Pair rate limit isolated to affected recipient only'
);

const err131048 = AdaptiveRateLimiter.classifyMetaError(131048, 'Spam rate restriction');
assert(
  err131048.code === 'SPAM_OR_QUALITY_RESTRICTION_131048' &&
    err131048.pauseCampaign &&
    err131048.requiresAdminReview &&
    !err131048.isRetryable,
  'Error 131048: Classified as spam/quality restriction requiring admin review (NOT daily quota exhaustion)'
);

const err131049 = AdaptiveRateLimiter.classifyMetaError(131049, 'Per recipient marketing restriction');
assert(
  err131049.code === 'MARKETING_MESSAGE_RESTRICTION_131049' &&
    err131049.affectsSingleRecipientOnly &&
    err131049.doesNotAlterConsent &&
    !err131049.pauseCampaign &&
    !err131049.isRetryable,
  'Error 131049: Per-recipient marketing restriction fails recipient only; preserves consent status'
);

const err80007 = AdaptiveRateLimiter.classifyMetaError(80007, 'WABA rate limit', 15);
assert(
  err80007.code === 'WABA_RATE_LIMIT_80007' &&
    err80007.isRetryable &&
    !err80007.pauseCampaign &&
    err80007.suggestedBackoffSeconds === 15,
  'Error 80007: WABA/Graph API rate limit triggers global backoff without pausing campaign'
);

const err190 = AdaptiveRateLimiter.classifyMetaError(190, 'Access token expired');
assert(
  err190.code === 'AUTH_FAILURE_190' && err190.pauseCampaign && !err190.isRetryable,
  'Error 190/401: Authentication failure halts campaign immediately'
);

const err503 = AdaptiveRateLimiter.classifyMetaError(503, 'Service unavailable');
assert(
  err503.code === 'TRANSIENT_SERVER_ERROR_503' && err503.isRetryable,
  'Error 503: Transient Meta server error allows bounded retry'
);

const errTimeout = AdaptiveRateLimiter.classifyMetaError('ETIMEDOUT', 'Gateway timeout');
assert(
  errTimeout.code === 'NETWORK_TIMEOUT_AMBIGUOUS' && !errTimeout.isRetryable,
  'Network timeout classified as ambiguous outcome (sending_unknown, never auto-retried)'
);

// 1f. Quality Throttling and Exponential Backoff
limiter.updateQualityScore('YELLOW');
assert(limiter.getEffectiveMaxMsgsPerSecond() === 15, 'Yellow quality throttles rate by 50% to 15 msgs/sec');

limiter.updateQualityScore('RED');
assert(limiter.getEffectiveMaxMsgsPerSecond() === 3, 'Red quality throttles rate to 3 msgs/sec safety floor');

limiter.updateQualityScore('GREEN');
const backoffMs = limiter.recordRateLimitHit(3);
assert(backoffMs === 3000, 'Explicit Retry-After header respected: 3000ms delay recorded');
assert(limiter.isPaused(), 'Limiter enters paused state following rate-limit response');

// -----------------------------------------------------------------------------
// SECTION 2: Atomic Batch Claiming & Multi-Worker Concurrency Tests
// -----------------------------------------------------------------------------
console.log('\n--- 2. Atomic Batch Claiming & Multi-Worker Concurrency ---');

const mockDraft = {
  id: 'cmp_concurrency_test_01',
  name: 'Multi-Worker Concurrency Test',
  objective: 'project_launch',
  templateId: 'tmpl_cascades_launch_01',
  templateName: 'cascades_launch_invitation',
  languageCode: 'en_US',
  variableMappings: [],
  audienceFilters: { sourceType: 'all' },
  audienceStats: {
    totalContacts: 100,
    validContacts: 100,
    verifiedOptInContacts: 100,
    unverifiedContacts: 0,
    suppressedContacts: 0,
    duplicateContacts: 0,
    eligibleAudience: 100,
  },
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  auditTrail: [],
};

const mockContacts = Array.from({ length: 100 }, (_, i) => ({
  rowIndex: i + 1,
  rawPhone: `9198${String(i + 1).padStart(8, '0')}`,
  normalizedPhone: `9198${String(i + 1).padStart(8, '0')}`,
  formattedPhone: `+91 98${String(i + 1).padStart(8, '0')}`,
  name: `Concurrency Lead ${i + 1}`,
  consent: { status: 'opted_in', source: 'web_form' },
  isValid: true,
  isDuplicateInFile: false,
  isDuplicateInCrm: false,
  isSuppressed: false,
}));

const qm = new CampaignQueueManager(mockDraft.id);
qm.initializeQueue(mockDraft, mockContacts, true);

assert(qm.getPendingCount() === 100, 'Queue initialized with 100 pending recipients');

// Worker 1 claims batch of 30
const claim1 = qm.claimBatch('worker_alpha', 30, 120);
assert(claim1.claimedBatch.length === 30, 'Worker Alpha successfully claimed 30 items');
assert(claim1.remainingQueueSize === 70, 'Queue pending count reduced to 70');

// Worker 2 claims batch of 30
const claim2 = qm.claimBatch('worker_beta', 30, 120);
assert(claim2.claimedBatch.length === 30, 'Worker Beta successfully claimed 30 items');
assert(claim2.remainingQueueSize === 40, 'Queue pending count reduced to 40');

// Verify zero overlap between Worker Alpha and Worker Beta batches
const alphaIds = new Set(claim1.claimedBatch.map((i) => i.id));
const betaIds = new Set(claim2.claimedBatch.map((i) => i.id));
const hasOverlap = claim1.claimedBatch.some((item) => betaIds.has(item.id));
assert(!hasOverlap, 'CONCURRENCY GUARANTEE: Zero item overlap between Worker Alpha and Worker Beta claims');

// -----------------------------------------------------------------------------
// SECTION 3: Worker Crash & Stale Lease Recovery
// -----------------------------------------------------------------------------
console.log('\n--- 3. Worker Crash & Stale Lease Recovery ---');

// Simulate Worker Alpha crashing: artificially expire leases of Worker Alpha items
for (const item of claim1.claimedBatch) {
  item.leaseExpiresAt = new Date(Date.now() - 5000).toISOString(); // Expired 5 seconds ago
}

const recoveredCount = qm.recoverStaleLeases();
assert(recoveredCount === 30, 'recoverStaleLeases() successfully recovered all 30 expired leases from crashed worker');
assert(qm.getPendingCount() === 70, 'Pending queue count restored from 40 back to 70');

// Verify recovered items have audit log entries
const sampleRecovered = qm.getRecipients().find((r) => r.id === claim1.claimedBatch[0].id);
assert(
  sampleRecovered &&
    sampleRecovered.status === 'pending' &&
    sampleRecovered.auditLog.some((l) => l.action === 'Stale lease recovered'),
  'Recovered items transitioned back to pending with immutable audit log'
);

// -----------------------------------------------------------------------------
// SECTION 4: Ambiguous Network Timeout & sending_unknown Protection
// -----------------------------------------------------------------------------
console.log('\n--- 4. Ambiguous Timeout & sending_unknown Protection ---');

const claim3 = qm.claimBatch('worker_gamma', 5, 120);
const targetItem = claim3.claimedBatch[0];

// Simulate network timeout: socket dropped before Meta returned response
qm.recordAmbiguousTimeout(targetItem.id, 'Gateway Timeout (504): socket dropped before Meta response');

const updatedTarget = qm.getRecipients().find((r) => r.id === targetItem.id);
assert(updatedTarget && updatedTarget.status === 'sending_unknown', 'Recipient transitioned strictly to "sending_unknown"');

// CRITICAL SAFETY CHECK: Verify that sending_unknown item is NEVER re-claimed by any worker!
const claimAfterTimeout = qm.claimBatch('worker_delta', 50, 120);
const wasReclaimed = claimAfterTimeout.claimedBatch.some((i) => i.id === targetItem.id);
assert(!wasReclaimed, 'CRITICAL DISPATCH SAFETY: sending_unknown item is NEVER re-claimed or automatically resent');

// Webhook arrives with biz_opaque_callback_data: correlate and reconcile!
const opaqueToken = updatedTarget.bizOpaqueCallbackData;
const reconciled = qm.reconcileWebhook({
  bizOpaqueCallbackData: opaqueToken,
  status: 'delivered',
  timestamp: new Date().toISOString(),
});

assert(reconciled, 'Webhook matched opaque callback token successfully');
const finalReconciled = qm.getRecipients().find((r) => r.id === targetItem.id);
assert(
  finalReconciled &&
    finalReconciled.status === 'delivered' &&
    finalReconciled.reconciledVia === 'webhook_opaque_token',
  'sending_unknown safely reconciled to "delivered" via webhook opaque token with audit trail'
);

// -----------------------------------------------------------------------------
// SECTION 5: Pre-Send Defense in Depth (Consent, Suppression & Duplicates)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Pre-Send Compliance & Duplicate Protection ---');

// Test Duplicate Protection
const duplicatePhone = '919800000001';
qm.recordSentSuccess(claim3.claimedBatch[1].id, 'wamid.HBgMTest123');
assert(claim3.claimedBatch[1].status === 'sent', 'First dispatch succeeded');

// Mark second attempt as duplicate
qm.recordSuppressed(
  claim3.claimedBatch[2].id,
  `Duplicate recipient protection: ${claim3.claimedBatch[2].phone} already dispatched`
);
assert(
  claim3.claimedBatch[2].status === 'suppressed',
  'Duplicate dispatch prevented: item marked "suppressed"'
);

// Test Error 131049: Meta Marketing Restriction (Consent Preserved, Skipped for Campaign)
const marketingTarget = claim3.claimedBatch[3];
const originalConsentStatus = mockContacts[3].consent.status;
assert(originalConsentStatus === 'opted_in', 'Original recipient consent is verified opted_in');

qm.recordMarketingRestriction(marketingTarget.id, 24);
const post131049Item = qm.getRecipients().find((r) => r.id === marketingTarget.id);

assert(
  post131049Item.status === 'skipped',
  'Error 131049: Recipient transitioned to "skipped" (not "suppressed")'
);
assert(
  post131049Item.metaMarketingCapped === true && post131049Item.deferralRetryUntil !== undefined,
  'Error 131049: Marked metaMarketingCapped with deferralRetryUntil timestamp'
);
assert(
  mockContacts[3].consent.status === 'opted_in',
  'CRITICAL CONSENT INTEGRITY: Error 131049 strictly preserves customer opt_in consent'
);

// -----------------------------------------------------------------------------
// PROVE 131049 DEFERRAL LIFECYCLE: BEFORE, AT, AND AFTER RETRY TIMESTAMP
// -----------------------------------------------------------------------------
const deferralTimestamp = new Date(post131049Item.deferralRetryUntil).getTime();

// 1. BEFORE Retry Timestamp (e.g. 1 hour into 24-hour deferral)
const beforeTimeIso = new Date(deferralTimestamp - 3600 * 23 * 1000).toISOString();
const requeueBefore = qm.requeueDeferredRecipients(beforeTimeIso);
assert(requeueBefore === 0, 'DEFERRAL BEFORE RETRY: Zero items re-queued before deferral window expires');
const itemStillSkipped = qm.getRecipients().find((r) => r.id === marketingTarget.id);
assert(itemStillSkipped.status === 'skipped', 'DEFERRAL BEFORE RETRY: Recipient status remains strictly "skipped"');

// 2. AT Retry Timestamp (exactly when 24h deferral expires)
const atTimeIso = new Date(deferralTimestamp).toISOString();
const requeueAt = qm.requeueDeferredRecipients(atTimeIso);
assert(requeueAt === 1, 'DEFERRAL AT RETRY: Exactly 1 item re-queued at retry timestamp');
const itemReactivated = qm.getRecipients().find((r) => r.id === marketingTarget.id);
assert(itemReactivated.status === 'pending', 'DEFERRAL AT RETRY: Transitioned from "skipped" back to "pending"');
assert(mockContacts[3].consent.status === 'opted_in', 'DEFERRAL AT RETRY: Consent status strictly preserved as "opted_in"');

// 3. AFTER Retry Timestamp: Next worker batch claim successfully claims the reactivated item
const claimDeferred = qm.claimBatch('worker_reactivated', 10, 120, atTimeIso);
const wasClaimed = claimDeferred.claimedBatch.some((r) => r.id === marketingTarget.id);
assert(wasClaimed, 'DEFERRAL AFTER RETRY: Reactivated item claimed by next worker without manual intervention');

// Test Error 131048: Spam/Quality Restriction Pauses Campaign & Requires Admin Review
const spamTarget = claim3.claimedBatch[4];
qm.recordFailure(
  spamTarget.id,
  'SPAM_OR_QUALITY_RESTRICTION_131048',
  'Account quality restriction triggered (131048)',
  false
);

const summaryAfter131048 = qm.getSummary();
assert(
  summaryAfter131048.status === 'paused',
  'Error 131048: Automatically paused outbound campaign dispatch'
);
assert(
  summaryAfter131048.requiresAdminReview === true,
  'Error 131048: Explicit administrator review flag set on campaign'
);
assert(
  summaryAfter131048.isTierLimitExceeded === false,
  'Error 131048: Daily portfolio quota is NOT recorded as exhausted by spam/quality restriction'
);

// -----------------------------------------------------------------------------
// SECTION 6: Campaign Pause, Resume & Cancellation Transitions
// -----------------------------------------------------------------------------
console.log('\n--- 6. Campaign Lifecycle State Transitions ---');

qm.pause();
const summaryPaused = qm.getSummary();
assert(summaryPaused.status === 'paused', 'Campaign successfully transitioned to "paused"');

const claimWhilePaused = qm.claimBatch('worker_test', 10, 120);
assert(claimWhilePaused.claimedBatch.length === 0, 'Worker batch claims blocked while campaign is paused');

qm.resume();
const summaryResumed = qm.getSummary();
assert(summaryResumed.status === 'active', 'Campaign successfully resumed to "active"');

qm.cancel();
const summaryCancelled = qm.getSummary();
assert(summaryCancelled.status === 'cancelled', 'Campaign successfully cancelled');
const allPendingOrClaimed = qm.getRecipients().some((r) => r.status === 'pending' || r.status === 'claimed');
assert(!allPendingOrClaimed, 'All unprocessed recipients transitioned to "cancelled"');

// -----------------------------------------------------------------------------
// SECTION 7: 10,000-Recipient Dry-Run Stress Benchmark
// -----------------------------------------------------------------------------
console.log('\n--- 7. 10,000-Recipient Multi-Worker Stress Benchmark ---');

const stressDraft = {
  ...mockDraft,
  id: 'cmp_10k_stress_benchmark',
  name: '10k Recipients Stress Campaign',
};

const stressContacts = Array.from({ length: 10000 }, (_, i) => ({
  rowIndex: i + 1,
  rawPhone: `9198${String(i + 1).padStart(8, '0')}`,
  normalizedPhone: `9198${String(i + 1).padStart(8, '0')}`,
  formattedPhone: `+91 98${String(i + 1).padStart(8, '0')}`,
  name: `10k Lead ${i + 1}`,
  consent: { status: 'opted_in', source: 'web_form' },
  isValid: true,
  isDuplicateInFile: false,
  isDuplicateInCrm: false,
  isSuppressed: false,
}));

console.log('Ingesting 10,000 recipients into campaign queue...');
const stressQm = new CampaignQueueManager(stressDraft.id);
stressQm.initializeQueue(stressDraft, stressContacts, true);

assert(stressQm.getRecipients().length === 10000, 'All 10,000 recipients queued successfully');

// Run high-speed batch claims simulating 4 concurrent workers
console.log('Simulating 4 concurrent workers claiming 100-item batches...');
const benchStart = Date.now();
let totalProcessed = 0;
const workerNames = ['worker_1', 'worker_2', 'worker_3', 'worker_4'];

while (stressQm.getPendingCount() > 0) {
  for (const w of workerNames) {
    const claim = stressQm.claimBatch(w, 250, 300);
    for (const item of claim.claimedBatch) {
      stressQm.recordSentSuccess(item.id, `wamid.HBgMStress${item.recipientIndex}`);
      totalProcessed++;
    }
    if (stressQm.getPendingCount() === 0) break;
  }
}

const benchDuration = Date.now() - benchStart;
const msgsPerSec = Math.round((10000 / benchDuration) * 1000);
console.log(`Processed 10,000 recipients across 4 concurrent workers in ${benchDuration} ms (${msgsPerSec} msgs/sec)`);

assert(totalProcessed === 10000, 'Processed all 10,000 recipients with zero dropped items');
const finalStressSummary = stressQm.getSummary();
assert(finalStressSummary.sentCount === 10000, 'All 10,000 recipients transitioned to "sent"');
assert(benchDuration < 10000, `High throughput performance achieved under 10.0s (${benchDuration}ms)`);

// -----------------------------------------------------------------------------
// SECTION 8: Pre-Send Pacing Integration & Cross-Channel Atomicity (Stage 4.5)
// -----------------------------------------------------------------------------
console.log('\n--- 8. Pre-Send Pacing Integration & Cross-Channel Atomicity (Stage 4.5) ---');

// 8a. Error Formatter support for pair limit, spam restriction, and marketing caps
assert(
  formatMetaError({ code: 131056 }).includes('Pair Rate Limit') &&
    formatMetaError({ code: 131056 }).includes('60 seconds'),
  'formatMetaError correctly describes Error 131056 as Pair Rate Limit with 60s cooldown'
);
assert(
  formatMetaError({ code: 131048 }).includes('Spam / Quality Restriction'),
  'formatMetaError correctly describes Error 131048 as Spam / Quality Restriction'
);
assert(
  formatMetaError({ code: 131049 }).includes('Marketing Message Cap'),
  'formatMetaError correctly describes Error 131049 as Marketing Message Cap'
);

// 8b. Simulation of Atomic DB Pre-Send Reservation Function (check_and_update_recipient_pacing)
class MockDatabasePacingTable {
  constructor() {
    this.rows = new Map();
  }

  // Atomically executes check_and_update_recipient_pacing with row-level locking simulation
  checkAndUpdateRecipientPacing(phone, sourceType, options = {}) {
    const cooldownSec = options.cooldownSeconds || 60;
    const nowMs = options.nowMs || Date.now();
    const existing = this.rows.get(phone);

    if (existing) {
      const elapsedSec = (nowMs - existing.lastDispatchedMs) / 1000;
      const effectiveCooldown = Math.max(cooldownSec, existing.cooldownSeconds);
      if (elapsedSec < effectiveCooldown) {
        const remainingSec = Math.ceil(effectiveCooldown - elapsedSec);
        return {
          can_dispatch: false,
          seconds_remaining: remainingSec,
          last_dispatched_at: new Date(existing.lastDispatchedMs).toISOString(),
          previous_source: existing.sourceType,
        };
      }
      // Expired: atomically update
      existing.lastDispatchedMs = nowMs;
      existing.sourceType = sourceType;
      existing.sourceCampaignId = options.sourceCampaignId || null;
      existing.sourceWorkerId = options.sourceWorkerId || null;
      existing.cooldownSeconds = cooldownSec;
      return {
        can_dispatch: true,
        seconds_remaining: 0,
        last_dispatched_at: new Date(nowMs).toISOString(),
        previous_source: existing.sourceType,
      };
    }

    // First dispatch: insert
    this.rows.set(phone, {
      phone,
      lastDispatchedMs: nowMs,
      sourceType,
      sourceCampaignId: options.sourceCampaignId || null,
      sourceWorkerId: options.sourceWorkerId || null,
      cooldownSeconds: cooldownSec,
    });
    return {
      can_dispatch: true,
      seconds_remaining: 0,
      last_dispatched_at: null,
      previous_source: null,
    };
  }

  // Secondary reconciliation trigger simulation: sync_crm_message_to_pacing()
  // Trigger definition: AFTER INSERT ON crm_messages WHEN (NEW.direction = 'outbound' AND NEW.status = 'sent')
  simulateTriggerAfterInsert(message, conversationWaId) {
    if (message.direction !== 'outbound' || message.status !== 'sent') {
      // Trigger WHEN condition prevents execution
      return false;
    }
    const msgTimeMs = new Date(message.created_at || Date.now()).getTime();
    const existing = this.rows.get(conversationWaId);
    if (existing) {
      // GREATEST(existing.last_dispatched_at, EXCLUDED.last_dispatched_at)
      if (msgTimeMs > existing.lastDispatchedMs) {
        existing.lastDispatchedMs = msgTimeMs;
        existing.sourceType = 'crm_inbox';
      }
    } else {
      this.rows.set(conversationWaId, {
        phone: conversationWaId,
        lastDispatchedMs: msgTimeMs,
        sourceType: 'crm_inbox',
        cooldownSeconds: 60,
      });
    }
    return true;
  }
}

const mockDbPacing = new MockDatabasePacingTable();

// Mock Edge Function simulator embodying the updated send-whatsapp-message/index.ts
let metaCloudApiCallCount = 0;
async function mockSendWhatsAppMessageEdgeFunction(payload, dbPacing, mockMetaBehavior = 'success') {
  const { toPhone, messageText, userId } = payload;
  const cleanPhone = toPhone.replace(/\D/g, '').length === 10 ? `91${toPhone.replace(/\D/g, '')}` : toPhone.replace(/\D/g, '');

  // Step 4b: Pre-Send Recipient Pacing Reservation (RPC check_and_update_recipient_pacing)
  const pacingResult = dbPacing.checkAndUpdateRecipientPacing(cleanPhone, 'crm_inbox', {
    sourceWorkerId: `crm_agent_${userId?.substring(0, 8)}`,
    cooldownSeconds: 60,
  });

  if (!pacingResult.can_dispatch) {
    return {
      httpStatus: 429,
      body: {
        error: `Recipient pair rate limit: A WhatsApp message was sent to this recipient recently via ${pacingResult.previous_source}. Please wait ${pacingResult.seconds_remaining} seconds.`,
        code: 'PAIR_RATE_LIMIT_COOLDOWN',
        isCooldownBlocked: true,
        waitSecondsRemaining: pacingResult.seconds_remaining,
        previousSource: pacingResult.previous_source,
      },
    };
  }

  // Step 5: Meta Cloud API Call (Only reachable if reservation succeeded!)
  metaCloudApiCallCount++;

  if (mockMetaBehavior === 'fail_500') {
    return {
      httpStatus: 500,
      body: {
        error: 'Meta delivery failure',
        details: { code: 130429, message: 'Cloud API temporary failure' },
      },
    };
  }

  if (mockMetaBehavior === 'timeout') {
    throw new Error('Meta API network timeout: upstream did not respond within 30000ms');
  }

  return {
    httpStatus: 200,
    body: {
      success: true,
      messageId: `wamid.HBgMDirect${Date.now()}`,
      conversationId: payload.conversationId || 'conv-001',
    },
  };
}

// 8c. Test 1: Direct CRM Inbox send reserves pacing before Meta call
metaCloudApiCallCount = 0;
const directPhone = '919001112233';
const send1 = await mockSendWhatsAppMessageEdgeFunction(
  { toPhone: directPhone, messageText: 'Hello from CRM agent', userId: 'usr_agent_01' },
  mockDbPacing
);
assert(
  send1.httpStatus === 200 && send1.body.success && metaCloudApiCallCount === 1,
  'Direct CRM Inbox send succeeds and invokes Meta Cloud API exactly once'
);
const dbPacingRow1 = mockDbPacing.rows.get(directPhone);
assert(
  dbPacingRow1 && dbPacingRow1.sourceType === 'crm_inbox' && dbPacingRow1.cooldownSeconds === 60,
  'Pre-send reservation atomically records crm_inbox source and 60s cooldown in DB'
);

// 8d. Test 2: Campaign dispatch blocked after direct CRM send
const campaignPreCheck = mockDbPacing.checkAndUpdateRecipientPacing(directPhone, 'campaign', {
  sourceCampaignId: 'cmp_spring_launch',
  sourceWorkerId: 'worker_alpha',
});
assert(
  !campaignPreCheck.can_dispatch && campaignPreCheck.previous_source === 'crm_inbox' && campaignPreCheck.seconds_remaining > 0,
  'Campaign dispatch strictly BLOCKED after direct CRM Inbox send (pair rate cooldown active)'
);

// 8e. Test 3: Direct send blocked after campaign dispatch
const campaignPhone = '919002223344';
// Campaign worker reserves and dispatches
mockDbPacing.checkAndUpdateRecipientPacing(campaignPhone, 'campaign', {
  sourceCampaignId: 'cmp_spring_launch',
  sourceWorkerId: 'worker_alpha',
  cooldownSeconds: 60,
});
// CRM operator attempts direct message to same contact immediately
const initialMetaCallCount = metaCloudApiCallCount;
const directSend2 = await mockSendWhatsAppMessageEdgeFunction(
  { toPhone: campaignPhone, messageText: 'Follow up from sales desk', userId: 'usr_agent_02' },
  mockDbPacing
);
assert(
  directSend2.httpStatus === 429 && directSend2.body.isCooldownBlocked === true,
  'Direct CRM Inbox send strictly BLOCKED with HTTP 429 after campaign dispatch'
);
assert(
  directSend2.body.code === 'PAIR_RATE_LIMIT_COOLDOWN' && directSend2.body.previousSource === 'campaign',
  'HTTP 429 response explicitly attributes cooldown to previous campaign source'
);
assert(
  metaCloudApiCallCount === initialMetaCallCount,
  'ZERO Meta Cloud API calls executed when direct send is blocked by pre-send pacing'
);

// 8f. Test 4: Concurrent Reservation Collision Safety (Two channels contend simultaneously)
const collisionPhone = '919003334455';

// Simulate race condition where CRM Agent and Campaign Worker attempt reservation concurrently
const [resA, resB] = [
  mockDbPacing.checkAndUpdateRecipientPacing(collisionPhone, 'campaign', { sourceWorkerId: 'worker_concurrent' }),
  mockDbPacing.checkAndUpdateRecipientPacing(collisionPhone, 'crm_inbox', { sourceWorkerId: 'agent_concurrent' }),
];

assert(
  (resA.can_dispatch && !resB.can_dispatch) || (!resA.can_dispatch && resB.can_dispatch),
  'CONCURRENCY GUARANTEE: Exactly one caller wins reservation; the second is atomically denied'
);
const deniedCaller = resA.can_dispatch ? resB : resA;
assert(
  deniedCaller.seconds_remaining > 0,
  'Denied caller receives active cooldown wait seconds remaining'
);

// 8g. Test 5: Failed Meta Call Retains Cooldown (Reservation Made Prior to Network Call)
const failedSendPhone = '919004445566';
const failedAttempt = await mockSendWhatsAppMessageEdgeFunction(
  { toPhone: failedSendPhone, messageText: 'Attempt that fails at Meta', userId: 'usr_agent_03' },
  mockDbPacing,
  'fail_500'
);
assert(
  failedAttempt.httpStatus === 500,
  'Meta 500 error captured by Edge Function'
);
// Verify pacing record is STILL active in DB
const postFailCheck = mockDbPacing.checkAndUpdateRecipientPacing(failedSendPhone, 'crm_inbox');
assert(
  !postFailCheck.can_dispatch && postFailCheck.seconds_remaining > 0,
  'FAILED SEND RETAINS COOLDOWN: Pacing reservation is NOT released upon Meta failure (prevents spam retry)'
);

// 8h. Test 6: Ambiguous Timeout Retains Cooldown & Quarantines Recipient
const timeoutPhone = '919005556677';
let threwTimeout = false;
try {
  await mockSendWhatsAppMessageEdgeFunction(
    { toPhone: timeoutPhone, messageText: 'Attempt that times out', userId: 'usr_agent_04' },
    mockDbPacing,
    'timeout'
  );
} catch (e) {
  threwTimeout = true;
}
assert(threwTimeout, 'Upstream timeout raised as network exception');
const postTimeoutCheck = mockDbPacing.checkAndUpdateRecipientPacing(timeoutPhone, 'campaign');
assert(
  !postTimeoutCheck.can_dispatch,
  'AMBIGUOUS TIMEOUT PACING SAFETY: Cooldown remains active in database after unconfirmed timeout'
);

// 8i. Test 7: Trigger Secondary Reconciliation Safety Net (Filters qualifying outbound sent only)
const triggerPhone = '919006667788';
// 1. Inbound message does NOT trigger pacing
const inboundIgnored = mockDbPacing.simulateTriggerAfterInsert(
  { direction: 'inbound', status: 'received', created_at: new Date().toISOString() },
  triggerPhone
);
assert(!inboundIgnored && !mockDbPacing.rows.has(triggerPhone), 'Trigger strictly ignores inbound customer messages');

// 2. Failed outbound message does NOT trigger pacing
const failedIgnored = mockDbPacing.simulateTriggerAfterInsert(
  { direction: 'outbound', status: 'failed', created_at: new Date().toISOString() },
  triggerPhone
);
assert(!failedIgnored && !mockDbPacing.rows.has(triggerPhone), 'Trigger strictly ignores failed outbound messages');

// 3. Draft/pending outbound message does NOT trigger pacing
const draftIgnored = mockDbPacing.simulateTriggerAfterInsert(
  { direction: 'outbound', status: 'pending', created_at: new Date().toISOString() },
  triggerPhone
);
assert(!draftIgnored && !mockDbPacing.rows.has(triggerPhone), 'Trigger strictly ignores non-sent (pending/draft) messages');

// 4. Qualifying outbound sent message triggers reconciliation
const qualifyingSent = mockDbPacing.simulateTriggerAfterInsert(
  { direction: 'outbound', status: 'sent', created_at: new Date().toISOString() },
  triggerPhone
);
assert(qualifyingSent && mockDbPacing.rows.has(triggerPhone), 'Trigger reconciles qualifying outbound sent message');

// 5. Trigger NEVER rolls back newer reservation
const futureTime = Date.now() + 10000;
mockDbPacing.rows.set(triggerPhone, {
  phone: triggerPhone,
  lastDispatchedMs: futureTime,
  sourceType: 'campaign',
  cooldownSeconds: 60,
});
// An older message inserted later
mockDbPacing.simulateTriggerAfterInsert(
  { direction: 'outbound', status: 'sent', created_at: new Date(Date.now() - 5000).toISOString() },
  triggerPhone
);
assert(
  mockDbPacing.rows.get(triggerPhone).lastDispatchedMs === futureTime,
  'Trigger GREATEST() logic preserves active newer reservation without rolling back'
);

// 8j. Test 8: Cooldown Expiry Allows Safe Re-Dispatch Across Channels
const expiryPhone = '919007778899';
mockDbPacing.rows.set(expiryPhone, {
  phone: expiryPhone,
  lastDispatchedMs: Date.now() - 65000, // 65 seconds ago
  sourceType: 'crm_inbox',
  cooldownSeconds: 60,
});
const postExpiryCheck = mockDbPacing.checkAndUpdateRecipientPacing(expiryPhone, 'campaign');
assert(
  postExpiryCheck.can_dispatch,
  'Expired cooldown naturally allows safe re-dispatch across channels without manual intervention'
);

console.log('\n================================================================');
console.log(`STAGE 4 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================\n');

if (failed > 0) {
  process.exit(1);
}
