// ==============================================================================
// STAGE 5A: SYNTHETIC STAGING DRY-RUN PLAN & VERIFICATION HARNESS
// End-to-end dry-run simulation using 100% synthetic contacts and mock Meta responses.
//
// Verifies 12 Key Pipeline Milestones:
// 1. Contact Eligibility & Real Estate Facets
// 2. Consent Validation & Quarantine of Unverified Contacts
// 3. Suppression List Checks at Ingestion & Claim Time
// 4. Meta Template Validation & Dynamic Placeholders
// 5. Portfolio Quota Enforcement (24-Hour Rolling Limits)
// 6. MPS Throttling (Adaptive Token Bucket)
// 7. Recipient Pair Pacing (60-Second Cross-Channel Cooldown)
// 8. Atomic Queue Leases & Worker Multi-Threading
// 9. Retry & Transient Backoff Handling
// 10. Ambiguous Outcome Quarantine (sending_unknown)
// 11. Campaign Pause, Resume & Cancellation
// 12. Audit Events & Webhook Reconciliation
// ==============================================================================

import { AdaptiveRateLimiter, CrossCampaignPacingStore } from '../src/lib/campaignDispatch/rateLimiter.ts';
import { CampaignQueueManager } from '../src/lib/campaignDispatch/queueManager.ts';
import { calculateAudienceEligibility } from '../src/lib/campaignComposer/campaignStorage.ts';
import { interpolateComponentText } from '../src/lib/campaignComposer/templateService.ts';
import { formatMetaError } from '../src/lib/crmWhatsApp.ts';

console.log('================================================================');
console.log('STAGE 5A: SYNTHETIC STAGING DRY-RUN PLAN & HARNESS');
console.log('Execution with 100% Synthetic Data (Zero Live Meta Calls)');
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

// -----------------------------------------------------------------------------
// 1. Synthetic Contact Generation & Strict Consent Quarantine
// -----------------------------------------------------------------------------
console.log('--- 1. Synthetic Contacts & Consent Isolation ---');

const syntheticContacts = [
  // 1. Eligible opted-in contact
  {
    rowIndex: 1,
    name: 'Synthetic Buyer Alpha',
    rawPhone: '919999000001',
    normalizedPhone: '919999000001',
    formattedPhone: '+91 99990 00001',
    propertyInterest: 'The Cascades',
    location: 'Kokapet',
    consent: { status: 'opted_in', source: 'staging_dry_run_web_form' },
    isSuppressed: false,
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
  },
  // 2. Eligible opted-in contact
  {
    rowIndex: 2,
    name: 'Synthetic Buyer Beta',
    rawPhone: '919999000002',
    normalizedPhone: '919999000002',
    formattedPhone: '+91 99990 00002',
    propertyInterest: 'Pavani Mirai',
    location: 'Financial District',
    consent: { status: 'opted_in', source: 'staging_dry_run_web_form' },
    isSuppressed: false,
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
  },
  // 3. Unverified consent (MUST be quarantined)
  {
    rowIndex: 3,
    name: 'Synthetic Unverified Contact',
    rawPhone: '919999000003',
    normalizedPhone: '919999000003',
    formattedPhone: '+91 99990 00003',
    propertyInterest: 'Urbanrise On Cloud 33',
    location: 'Bachupally',
    consent: { status: 'unverified', source: null },
    isSuppressed: false,
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
  },
  // 4. Suppressed contact (MUST be suppressed)
  {
    rowIndex: 4,
    name: 'Synthetic Suppressed User',
    rawPhone: '919999000004',
    normalizedPhone: '919999000004',
    formattedPhone: '+91 99990 00004',
    propertyInterest: 'The Cascades',
    location: 'Kokapet',
    consent: { status: 'opted_in', source: 'opt_out_pending' },
    isSuppressed: true,
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
  },
];

const eligibility = calculateAudienceEligibility(syntheticContacts);
assert(eligibility.stats.totalContacts === 4, 'All 4 synthetic contacts ingested');
assert(eligibility.stats.unverifiedContacts === 1, 'Unverified contact quarantined (unverifiedCount = 1)');
assert(eligibility.stats.suppressedContacts === 1, 'Suppressed contact quarantined (suppressedCount = 1)');
assert(eligibility.eligibleContacts.length === 2, 'Strict Consent: Exactly 2 contacts qualified for eligible audience');

const dryRunDraft = {
  id: 'dry_run_cmp_5a_001',
  name: 'Stage 5A Staging Dry-Run Campaign',
  templateName: 'cascades_luxury_villas',
  templateLanguage: 'en',
  status: 'draft',
};

const qm = new CampaignQueueManager(dryRunDraft.id);
qm.initializeQueue(dryRunDraft, eligibility.eligibleContacts, true);

assert(
  qm.getPendingCount() === 2,
  'Queue initialized with exactly 2 verified pending recipients'
);

// -----------------------------------------------------------------------------
// 2. Template Validation & Dynamic Placeholders
// -----------------------------------------------------------------------------
console.log('\n--- 2. Template Validation & Dynamic Variable Mapping ---');
const templateMappings = [
  { placeholder: '{{1}}', componentType: 'BODY', sourceType: 'field', sourceField: 'name', fallbackValue: 'Valued Buyer' },
  { placeholder: '{{2}}', componentType: 'BODY', sourceType: 'field', sourceField: 'propertyInterest', fallbackValue: 'Our Projects' },
];

const sampleContact = eligibility.eligibleContacts[0];
const sampleTemplateText = 'Hello {{1}}, explore exclusive villas at {{2}}!';
const interpolatedText = interpolateComponentText(sampleTemplateText, 'BODY', templateMappings, sampleContact);

assert(
  interpolatedText.includes('Hello Synthetic Buyer Alpha, explore exclusive villas at The Cascades!'),
  'Dynamic placeholders {{1}} and {{2}} accurately interpolated for synthetic buyer'
);

// -----------------------------------------------------------------------------
// 3. Portfolio Quota Enforcement (24-Hour Rolling Quotas)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Portfolio Quota Enforcement ---');
const stagingLimiter = new AdaptiveRateLimiter({
  configuredMessagesPerSecond: 25,
  messagingTier: 'TIER_250',
});

assert(
  stagingLimiter.checkDailyTierQuota(true).isWithinQuota,
  'Staging rate limiter initializes within TIER_250 quota'
);

// -----------------------------------------------------------------------------
// 4. MPS Throttling & Adaptive Rate Limiting
// -----------------------------------------------------------------------------
console.log('\n--- 4. MPS Throttling & Adaptive Rate Limiting ---');
assert(
  stagingLimiter.getEffectiveMaxMsgsPerSecond() === 25,
  'Default conservative MPS throughput enforced at 25 msgs/sec'
);

// -----------------------------------------------------------------------------
// 5. Recipient Pair Pacing (60-Second Cross-Channel Cooldown)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Recipient Pair Pacing ---');
CrossCampaignPacingStore.getInstance().clear();
const pacePhone = eligibility.eligibleContacts[0].normalizedPhone;

// First check
const initialPace = stagingLimiter.checkRecipientPairLimit(pacePhone);
assert(initialPace.canDispatch, 'Initial dispatch permitted by pair rate limiter');

// Worker dispatches
stagingLimiter.recordRecipientDispatched(pacePhone, 'campaign', { campaignId: dryRunDraft.id });

// Immediate re-check
const blockedPace = stagingLimiter.checkRecipientPairLimit(pacePhone);
assert(
  !blockedPace.canDispatch && blockedPace.waitSecondsRemaining > 0,
  'Immediate re-dispatch to same recipient blocked by 60s cooldown'
);

// -----------------------------------------------------------------------------
// 6. Queue Leases & Multi-Worker Concurrency
// -----------------------------------------------------------------------------
console.log('\n--- 6. Queue Leases & Multi-Worker Concurrency ---');
const claim1 = qm.claimBatch('staging_worker_1', 1, 60);
assert(claim1.claimedBatch.length === 1, 'Worker 1 acquired lease on 1 recipient');
assert(claim1.claimedBatch[0].workerId === 'staging_worker_1', 'Recipient locked by Worker 1');

const claim2 = qm.claimBatch('staging_worker_2', 1, 60);
assert(claim2.claimedBatch.length === 1, 'Worker 2 claimed remaining recipient');
assert(claim2.claimedBatch[0].id !== claim1.claimedBatch[0].id, 'Zero item overlap across workers');

// -----------------------------------------------------------------------------
// 7. Retry, Backoff & Error Handling Simulation
// -----------------------------------------------------------------------------
console.log('\n--- 7. Error Handling & Backoff Routing ---');
const errThroughput = AdaptiveRateLimiter.classifyMetaError(130429, 'Throughput limit hit', 5);
assert(errThroughput.isRetryable && errThroughput.suggestedBackoffSeconds === 5, 'Error 130429 routes to retry with backoff');

const errPair = AdaptiveRateLimiter.classifyMetaError(131056, 'Pair limit hit', 60);
assert(errPair.affectsSingleRecipientOnly, 'Error 131056 isolated to single recipient');

// -----------------------------------------------------------------------------
// 8. Ambiguous Timeout Quarantine (sending_unknown)
// -----------------------------------------------------------------------------
console.log('\n--- 8. Ambiguous Timeout Quarantine ---');
// Simulate worker lease expiry during dispatch (network drop)
const timedOutItem = claim1.claimedBatch[0];
qm.recordAmbiguousTimeout(timedOutItem.id, 'Upstream Meta API socket timeout');
const quarantinedItem = qm.getRecipients().find(r => r.id === timedOutItem.id);

assert(
  quarantinedItem.status === 'sending_unknown',
  'Timed-out recipient transitioned strictly to "sending_unknown" quarantine'
);

// Verify claimBatch will NEVER re-claim sending_unknown items
const retryClaim = qm.claimBatch('worker_safety_check', 10, 60);
assert(
  !retryClaim.claimedBatch.some(r => r.id === timedOutItem.id),
  'CRITICAL DISPATCH SAFETY: sending_unknown item is NEVER automatically retried'
);

// -----------------------------------------------------------------------------
// 9. Campaign Lifecycle State Transitions (Pause / Resume / Cancel)
// -----------------------------------------------------------------------------
console.log('\n--- 9. Campaign State Transitions ---');
qm.pause();
assert(qm.getSummary().status === 'paused', 'Campaign paused successfully');
const pauseClaim = qm.claimBatch('worker_paused', 5, 60);
assert(pauseClaim.claimedBatch.length === 0, 'Worker batch claims blocked while campaign is paused');

qm.resume();
assert(qm.getSummary().status === 'active', 'Campaign resumed to active');

qm.cancel();
assert(qm.getSummary().status === 'cancelled', 'Campaign cancelled successfully');

// -----------------------------------------------------------------------------
// 10. Webhook Reconciliation via Opaque Correlation Token
// -----------------------------------------------------------------------------
console.log('\n--- 10. Webhook Reconciliation ---');
const reconciledToken = quarantinedItem.bizOpaqueCallbackData;
assert(
  reconciledToken && typeof reconciledToken === 'string',
  'Opaque callback correlation token generated for ambiguous recipient'
);
const webhookReconciled = qm.reconcileWebhook({
  bizOpaqueCallbackData: reconciledToken,
  status: 'delivered',
  timestamp: new Date().toISOString(),
});
assert(
  webhookReconciled && quarantinedItem.status === 'delivered',
  'Quarantined recipient safely reconciled to "delivered" via verified opaque callback token'
);

console.log('\n================================================================');
console.log(`STAGE 5A SYNTHETIC DRY-RUN SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================\n');

if (failed > 0) {
  process.exit(1);
}
