// ==============================================================================
// STAGE 3 CAMPAIGN MANAGER TEST SUITE
// Tests: Template Library, Variable Mapping, Audience Eligibility, and Draft Saving
// Target: lpbdwmpglwdedqdiovqu (Local Staging & Validation)
// ==============================================================================

import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('STAGE 3 CAMPAIGN MANAGER — TEMPLATES, AUDIENCE & COMPOSER SUITE');
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
  getAllWhatsAppTemplates,
  getApprovedTemplates,
  getTemplateById,
  extractPlaceholders,
  getTemplatePlaceholders,
  interpolateComponentText,
  validateVariableMappings,
} = await import('file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignComposer/templateService.ts');

const {
  calculateAudienceEligibility,
  validateCampaignDraft,
  saveCampaignDraft,
  getCampaignDrafts,
} = await import('file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignComposer/campaignStorage.ts');

// -----------------------------------------------------------------------------
// SECTION 1: Meta Template Library & Status Gating
// -----------------------------------------------------------------------------
console.log('--- 1. Meta Template Library & Status Gating ---');

const allTemplates = getAllWhatsAppTemplates();
assert(allTemplates.length >= 8, `Retrieved ${allTemplates.length} WhatsApp templates from Meta library`);

const approvedMarketing = getApprovedTemplates('MARKETING');
assert(
  approvedMarketing.every((t) => t.category === 'MARKETING' && t.translations.some((tr) => tr.status === 'APPROVED')),
  'getApprovedTemplates("MARKETING") returns only approved marketing templates'
);

const pendingTmpl = allTemplates.find((t) => t.id === 'tmpl_festival_villas_07');
assert(
  pendingTmpl && pendingTmpl.translations[0].status === 'PENDING',
  'Pending template identified (festival_exclusive_villas_2026)'
);
assert(
  !approvedMarketing.some((t) => t.id === 'tmpl_festival_villas_07'),
  'Pending template excluded from approved marketing list'
);

const rejectedTmpl = allTemplates.find((t) => t.id === 'tmpl_unapproved_blast_08');
assert(
  rejectedTmpl && rejectedTmpl.translations[0].status === 'REJECTED',
  'Rejected template identified (unapproved_promotional_blast)'
);
assert(
  !approvedMarketing.some((t) => t.id === 'tmpl_unapproved_blast_08'),
  'Rejected template strictly excluded from approved marketing list'
);

// -----------------------------------------------------------------------------
// SECTION 2: Variable Placeholder Extraction
// -----------------------------------------------------------------------------
console.log('\n--- 2. Variable Placeholder Extraction ---');

const cascadesTmpl = getTemplateById('tmpl_cascades_launch_01');
assert(cascadesTmpl !== undefined, 'Template tmpl_cascades_launch_01 located');

const enTranslation = cascadesTmpl.translations.find((t) => t.code === 'en_US');
const extracted = getTemplatePlaceholders(enTranslation.components);
assert(extracted.length === 3, 'Accurately extracted 3 dynamic placeholders from Cascades template');
assert(
  extracted[0].placeholder === '{{1}}' && extracted[1].placeholder === '{{2}}' && extracted[2].placeholder === '{{3}}',
  'Placeholders extracted in proper sequence: {{1}}, {{2}}, {{3}}'
);

// -----------------------------------------------------------------------------
// SECTION 3: Dynamic Variable Mapping & Text Interpolation
// -----------------------------------------------------------------------------
console.log('\n--- 3. Variable Mapping & Text Interpolation ---');

const testMappings = [
  {
    placeholder: '{{1}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'name',
    fallbackValue: 'Esteemed Buyer',
  },
  {
    placeholder: '{{2}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'propertyInterest',
    fallbackValue: 'The Cascades',
  },
  {
    placeholder: '{{3}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'location',
    fallbackValue: 'Neopolis, Kokapet',
  },
];

const mockRecipient1 = {
  name: 'Rajesh Sharma',
  propertyInterest: 'The Cascades',
  location: 'Kokapet',
};

const bodyComp = enTranslation.components.find((c) => c.type === 'BODY');
const interpolated1 = interpolateComponentText(bodyComp.text, 'BODY', testMappings, mockRecipient1);

assert(
  interpolated1.includes('Hello Rajesh Sharma'),
  'Placeholder {{1}} interpolated with recipient name: "Hello Rajesh Sharma"'
);
assert(
  interpolated1.includes('exclusive preview of The Cascades located in Kokapet'),
  'Placeholders {{2}} and {{3}} interpolated with project and location'
);

// Test Fallback Behavior with empty recipient fields
const mockRecipientEmpty = { name: '', propertyInterest: '', location: '' };
const interpolatedFallback = interpolateComponentText(bodyComp.text, 'BODY', testMappings, mockRecipientEmpty);

assert(
  interpolatedFallback.includes('Hello Esteemed Buyer'),
  'Empty recipient field cleanly used fallback value: "Hello Esteemed Buyer"'
);
assert(
  interpolatedFallback.includes('The Cascades located in Neopolis, Kokapet'),
  'Empty property/location used fallbacks cleanly without breaking template'
);

// -----------------------------------------------------------------------------
// SECTION 4: Multi-Language Telugu (తెలుగు) Translation
// -----------------------------------------------------------------------------
console.log('\n--- 4. Multi-Language Support (Telugu) ---');

const teTranslation = cascadesTmpl.translations.find((t) => t.code === 'te');
assert(teTranslation !== undefined && teTranslation.status === 'APPROVED', 'Telugu translation approved');

const teBodyComp = teTranslation.components.find((c) => c.type === 'BODY');
const teRecipient = { name: 'శ్రీకాంత్ గారు', propertyInterest: 'ది క్యాస్కేడ్స్', location: 'కోకాపేట్' };
const teInterpolated = interpolateComponentText(teBodyComp.text, 'BODY', testMappings, teRecipient);

assert(
  teInterpolated.includes('నమస్కారం శ్రీకాంత్ గారు'),
  'Telugu template interpolated recipient name cleanly: "నమస్కారం శ్రీకాంత్ గారు"'
);
assert(
  teInterpolated.includes('కోకాపేట్ లో ప్రతిష్టాత్మకంగా నిర్మిస్తున్న ది క్యాస్కేడ్స్'),
  'Telugu template interpolated project and location accurately'
);

// -----------------------------------------------------------------------------
// SECTION 5: Variable Validation & Missing Fallbacks
// -----------------------------------------------------------------------------
console.log('\n--- 5. Variable Validation Guardrails ---');

// Incomplete mapping (missing {{3}})
const incompleteMappings = [
  {
    placeholder: '{{1}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'name',
    fallbackValue: 'Esteemed Buyer',
  },
  {
    placeholder: '{{2}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'propertyInterest',
    fallbackValue: 'The Cascades',
  },
];
const check1 = validateVariableMappings(enTranslation.components, incompleteMappings);
assert(!check1.isValid && check1.missingMappings.length === 1, 'Incomplete variable mapping detected (missing {{3}})');

// Mapping with empty fallback
const emptyFallbackMappings = [
  {
    placeholder: '{{1}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'name',
    fallbackValue: '', // Empty!
  },
  {
    placeholder: '{{2}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'propertyInterest',
    fallbackValue: 'The Cascades',
  },
  {
    placeholder: '{{3}}',
    componentType: 'BODY',
    sourceType: 'field',
    sourceField: 'location',
    fallbackValue: 'Kokapet',
  },
];
const check2 = validateVariableMappings(enTranslation.components, emptyFallbackMappings);
assert(!check2.isValid && check2.missingFallbacks.length === 1, 'Empty fallback value detected and rejected');

// -----------------------------------------------------------------------------
// SECTION 6: Strict Audience Eligibility & Unverified Quarantine
// -----------------------------------------------------------------------------
console.log('\n--- 6. Strict Audience Eligibility & Quarantine ---');

const testContacts = [
  // 1. Valid and Verified Opt-In
  {
    rowIndex: 1,
    rawPhone: '9493943946',
    normalizedPhone: '919493943946',
    formattedPhone: '+91 94939 43946',
    name: 'Verified Buyer 1',
    location: 'Kokapet',
    consent: { status: 'opted_in', source: 'web_form' },
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
    isSuppressed: false,
  },
  // 2. Valid but Unverified (Quarantined)
  {
    rowIndex: 2,
    rawPhone: '9848012345',
    normalizedPhone: '919848012345',
    formattedPhone: '+91 98480 12345',
    name: 'Unverified Buyer 2',
    location: 'Kokapet',
    consent: { status: 'unverified', source: 'unverified_import' },
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
    isSuppressed: false,
  },
  // 3. Suppressed Number (Opted Out / Do Not Contact)
  {
    rowIndex: 3,
    rawPhone: '9848054321',
    normalizedPhone: '919848054321',
    formattedPhone: '+91 98480 54321',
    name: 'Suppressed Buyer 3',
    location: 'Kokapet',
    consent: { status: 'opted_in', source: 'web_form' },
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
    isSuppressed: true, // SUPPRESSED
  },
  // 4. In-File Duplicate
  {
    rowIndex: 4,
    rawPhone: '9493943946',
    normalizedPhone: '919493943946',
    formattedPhone: '+91 94939 43946',
    name: 'Duplicate Buyer 4',
    location: 'Kokapet',
    consent: { status: 'opted_in', source: 'web_form' },
    isValid: true,
    isDuplicateInFile: true, // DUPLICATE
    isDuplicateInCrm: false,
    isSuppressed: false,
  },
  // 5. Invalid Phone Number
  {
    rowIndex: 5,
    rawPhone: '12345',
    normalizedPhone: '',
    formattedPhone: '12345',
    name: 'Invalid Phone Buyer 5',
    location: 'Kokapet',
    consent: { status: 'opted_in', source: 'web_form' },
    isValid: false, // INVALID
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
    isSuppressed: false,
  },
];

const eligibility = calculateAudienceEligibility(testContacts, {
  sourceType: 'all',
  locations: ['Kokapet'],
});

assert(eligibility.stats.totalContacts === 5, 'Total matching contacts: 5');
assert(eligibility.stats.validContacts === 4, 'Valid phone contacts: 4');
assert(eligibility.stats.verifiedOptInContacts === 2, 'Verified opt-in non-suppressed contacts: 2');
assert(eligibility.stats.unverifiedContacts === 1, 'Unverified contacts counted: 1');
assert(eligibility.stats.suppressedContacts === 1, 'Suppressed contacts counted: 1');
assert(eligibility.stats.duplicateContacts === 1, 'Duplicate contacts counted: 1');

// CRITICAL SAFETY CHECK: Final eligible audience size
assert(eligibility.stats.eligibleAudience === 1, 'STRICT ENFORCEMENT: Only 1 contact qualifies for eligibleAudience');
assert(
  eligibility.eligibleContacts[0].name === 'Verified Buyer 1',
  'Eligible contact is Verified Buyer 1 (unverified, suppressed & duplicates completely purged)'
);
assert(
  !eligibility.eligibleContacts.some((c) => c.consent.status === 'unverified'),
  'Zero unverified contacts present in final eligible audience'
);
assert(
  !eligibility.eligibleContacts.some((c) => c.isSuppressed),
  'Zero suppressed contacts present in final eligible audience'
);

// -----------------------------------------------------------------------------
// SECTION 7: Campaign Draft Saving & Audit Trail Integrity
// -----------------------------------------------------------------------------
console.log('\n--- 7. Campaign Draft Saving & Audit Logging ---');

const draftCandidate = {
  id: 'draft_test_verification_01',
  name: 'The Cascades Neopolis Launch Invitation',
  objective: 'project_launch',
  templateId: 'tmpl_cascades_launch_01',
  templateName: 'cascades_launch_invitation',
  languageCode: 'en_US',
  variableMappings: testMappings,
  audienceFilters: { sourceType: 'all', locations: ['Kokapet'] },
  audienceStats: eligibility.stats,
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  auditTrail: [],
};

const draftValidation = validateCampaignDraft(draftCandidate);
assert(draftValidation.isValid, 'Draft candidate passed all pre-flight validation checks');

const savedDraft = saveCampaignDraft(draftCandidate, 'Lead Engineer', 'Verified Stage 3 creation test');
assert(savedDraft.status === 'draft', 'Draft saved with status strictly equal to "draft"');
assert(savedDraft.auditTrail.length >= 1, 'Audit trail entry automatically recorded');
assert(
  savedDraft.auditTrail[0].actor === 'Lead Engineer',
  'Audit trail recorded correct actor ("Lead Engineer")'
);

// Check that invalid draft (empty name) is blocked
const invalidDraft = { ...draftCandidate, name: '' };
const invalidCheck = validateCampaignDraft(invalidDraft);
assert(!invalidCheck.isValid && invalidCheck.errors.includes('Campaign name is required.'), 'Draft with empty name rejected');

// Check that unapproved template is blocked
const unapprovedDraft = {
  ...draftCandidate,
  templateId: 'tmpl_unapproved_blast_08',
  templateName: 'unapproved_promotional_blast',
};
const unapprovedCheck = validateCampaignDraft(unapprovedDraft);
assert(
  !unapprovedCheck.isValid &&
    unapprovedCheck.errors.some((e) => e.includes('Only APPROVED templates may be used in campaigns')),
  'Draft using REJECTED template blocked by validation'
);

console.log('\n================================================================');
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================\n');

if (failed > 0) {
  process.exit(1);
}
