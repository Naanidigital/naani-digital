// ==============================================================================
// STAGE 2 IMPORT ENGINE & CONTACT MANAGEMENT TEST SUITE
// Tests: Normalization, Auto-Detection, Deduplication, Consent, and 10k Benchmark
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire('c:/Users/PC/Desktop/naani-main/naani-main/package.json');
const XLSX = require('xlsx');

console.log('================================================================');
console.log('STAGE 2 CAMPAIGN MANAGER — IMPORT ENGINE & CONTACT SUITE');
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
const { normalizePhoneNumber, looksLikePhoneNumber } = await import(
  'file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignImport/phoneNormalizer.ts'
);
const { autoDetectColumnMappings } = await import(
  'file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignImport/columnMapper.ts'
);
const { processSpreadsheetImport } = await import(
  'file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignImport/importEngine.ts'
);
const { filterCampaignAudience } = await import(
  'file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/campaignImport/audienceFilter.ts'
);

// -----------------------------------------------------------------------------
// SECTION 1: Phone Number Normalization & E.164 Compliance
// -----------------------------------------------------------------------------
console.log('--- 1. Phone Number Normalization & Validation ---');

// Standard 10-digit Indian mobile
const t1 = normalizePhoneNumber('9493943946');
assert(t1.isValid && t1.normalized === '919493943946', '10-digit mobile normalized to E.164: 919493943946');

// Number with spaces, dashes, and parentheses
const t2 = normalizePhoneNumber(' (09493) 943-946 ');
assert(t2.isValid && t2.normalized === '919493943946', 'Formatted Indian mobile with 0-prefix stripped: 919493943946');

// Number with +91 prefix
const t3 = normalizePhoneNumber('+91 98480 12345');
assert(t3.isValid && t3.normalized === '919848012345', 'Number with +91 prefix normalized cleanly: 919848012345');

// Invalid sequential dummy number
const tDummy = normalizePhoneNumber('9876543210');
assert(!tDummy.isValid && tDummy.error.includes('placeholder dummy'), 'Sequential dummy number 9876543210 rejected');

// International number (+1 US)
const t4 = normalizePhoneNumber('+1 (415) 555-2671');
assert(t4.isValid && t4.normalized === '14155552671', 'International US number normalized: 14155552671');

// Invalid dummy repeating numbers
const t5 = normalizePhoneNumber('9999999999');
assert(!t5.isValid && t5.error.includes('placeholder dummy'), 'Repeating dummy number 9999999999 rejected');

// Invalid short number
const t6 = normalizePhoneNumber('94939');
assert(!t6.isValid && t6.error.includes('Too short'), 'Short number 94939 rejected (< 10 digits)');

// Non-mobile Indian prefix (starts with 2 landline)
const t7 = normalizePhoneNumber('2401234567');
assert(!t7.isValid && t7.error.includes('Invalid Indian mobile prefix'), 'Landline prefix starting with 2 rejected');

// -----------------------------------------------------------------------------
// SECTION 2: Column Mapping & Auto-Detection
// -----------------------------------------------------------------------------
console.log('\n--- 2. Column Auto-Detection ---');

const mockHeaders = ['Client Name', 'WhatsApp Number', 'E-mail', 'Target City', 'Investment Budget', 'BHK Type'];
const mockSampleRows = [
  {
    rowIndex: 1,
    data: {
      'Client Name': 'Rajesh Sharma',
      'WhatsApp Number': '9848012345',
      'E-mail': 'rajesh@example.com',
      'Target City': 'Kokapet, Hyderabad',
      'Investment Budget': '₹2.5 - 3.5 Cr',
      'BHK Type': '3 BHK',
    },
  },
];

const detectedMappings = autoDetectColumnMappings(mockHeaders, mockSampleRows);

const phoneMap = detectedMappings.find((m) => m.fileHeader === 'WhatsApp Number');
assert(phoneMap && phoneMap.targetField === 'phone', "Auto-detected 'WhatsApp Number' header as target 'phone'");

const nameMap = detectedMappings.find((m) => m.fileHeader === 'Client Name');
assert(nameMap && nameMap.targetField === 'name', "Auto-detected 'Client Name' header as target 'name'");

const locMap = detectedMappings.find((m) => m.fileHeader === 'Target City');
assert(locMap && locMap.targetField === 'location', "Auto-detected 'Target City' header as target 'location'");

const budMap = detectedMappings.find((m) => m.fileHeader === 'Investment Budget');
assert(budMap && budMap.targetField === 'budget', "Auto-detected 'Investment Budget' header as target 'budget'");

// -----------------------------------------------------------------------------
// SECTION 3: Deduplication & Consent Assignment
// -----------------------------------------------------------------------------
console.log('\n--- 3. Deduplication & Consent Isolation ---');

const testRows = [
  { rowIndex: 1, data: { phone: '9493943946', name: 'Buyer 1' } },
  { rowIndex: 2, data: { phone: '9493943946', name: 'Buyer 1 Duplicate' } }, // In-file duplicate
  { rowIndex: 3, data: { phone: '919848012345', name: 'Buyer 3 CRM Match' } }, // In CRM
  { rowIndex: 4, data: { phone: '919000000001', name: 'Buyer 4 Suppressed' } }, // Suppressed
  { rowIndex: 5, data: { phone: 'invalid-phone', name: 'Buyer 5' } },           // Invalid
];

const mockCrmPhones = new Map([['919848012345', 'crm-lead-uuid-123']]);
const mockSuppressedPhones = new Set(['919000000001']);

const importResult = await processSpreadsheetImport({
  rows: testRows,
  columnMappings: [
    { fileHeader: 'phone', targetField: 'phone', confidence: 1, sampleValues: [] },
    { fileHeader: 'name', targetField: 'name', confidence: 1, sampleValues: [] },
  ],
  defaultConsent: {
    status: 'unverified', // Strict compliance default
    source: 'unverified_import',
  },
  existingCrmPhones: mockCrmPhones,
  suppressedPhones: mockSuppressedPhones,
});

assert(importResult.report.totalRows === 5, 'Total rows ingested: 5');
assert(importResult.report.invalidRows === 1, 'Invalid phone detected: 1');
assert(importResult.report.duplicateInFileRows === 1, 'In-file duplicate detected: 1');
assert(importResult.report.duplicateInCrmRows === 1, 'CRM database match identified: 1');
assert(importResult.report.suppressedRows === 1, 'Global suppression identified: 1');
assert(importResult.report.unverifiedRows === 4, 'Unverified consent enforced: 4 contacts quarantined');
assert(importResult.report.consentEligibleRows === 0, 'Zero contacts automatically promoted to opted-in without proof');

// -----------------------------------------------------------------------------
// SECTION 4: Audience Filtering & Segmentation
// -----------------------------------------------------------------------------
console.log('\n--- 4. Audience Filtering & Real Estate Facets ---');

const sampleAudience = [
  {
    rowIndex: 1,
    rawPhone: '9493943946',
    normalizedPhone: '919493943946',
    formattedPhone: '+91 94939 43946',
    name: 'Ananya Rao',
    location: 'Kokapet',
    budget: '₹2.5 - 3.5 Cr',
    propertyInterest: 'The Cascades',
    bhk: '3 BHK',
    leadSource: 'Website',
    customVariables: {},
    consent: { status: 'opted_in', source: 'web_form' },
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
    isSuppressed: false,
  },
  {
    rowIndex: 2,
    rawPhone: '919848012345',
    normalizedPhone: '919848012345',
    formattedPhone: '+91 98480 12345',
    name: 'Vikram Reddy',
    location: 'Gachibowli',
    budget: '₹4 - 7 Cr',
    propertyInterest: 'Rise with 9',
    bhk: '4 BHK',
    leadSource: 'CSV Import',
    customVariables: {},
    consent: { status: 'unverified', source: 'unverified_import' },
    isValid: true,
    isDuplicateInFile: false,
    isDuplicateInCrm: false,
    isSuppressed: false,
  },
];

// Test Filter by Location
const filterLoc = filterCampaignAudience(sampleAudience, { locations: ['Kokapet'] });
assert(filterLoc.totalAudience === 1 && filterLoc.contacts[0].name === 'Ananya Rao', 'Filtered by location: Kokapet (1 match)');

// Test Filter by BHK
const filterBhk = filterCampaignAudience(sampleAudience, { bhkTypes: ['4 BHK'] });
assert(filterBhk.totalAudience === 1 && filterBhk.contacts[0].name === 'Vikram Reddy', 'Filtered by BHK: 4 BHK (1 match)');

// Test Consent Segregation
assert(filterLoc.sendableCount === 1, 'Sendable count includes only opted_in contacts (1)');
assert(filterBhk.sendableCount === 0 && filterBhk.unverifiedCount === 1, 'Unverified contact quarantined from sendable count (0 sendable, 1 unverified)');

// -----------------------------------------------------------------------------
// SECTION 5: Excel (.xlsx) Binary Generation & Ingestion Test
// -----------------------------------------------------------------------------
console.log('\n--- 5. Excel (.xlsx) Binary Parsing Test ---');

const wb = XLSX.utils.book_new();
const wsData = [
  ['Customer Name', 'Phone Number', 'Preferred Locality'],
  ['Suresh Naidu', '9848012345', 'Neopolis'],
  ['Pooja Hegde', '9848054321', 'Financial District'],
];
const ws = XLSX.utils.aoa_to_sheet(wsData);
XLSX.utils.book_append_sheet(wb, ws, 'Leads');
const xlsxBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

assert(xlsxBuffer.length > 0, `Generated valid XLSX binary buffer (${xlsxBuffer.length} bytes)`);

const parsedWb = XLSX.read(xlsxBuffer, { type: 'buffer' });
const parsedData = XLSX.utils.sheet_to_json(parsedWb.Sheets['Leads'], { header: 1 });
assert(parsedData.length === 3, 'XLSX sheet parsed accurately: 1 header row + 2 data rows');
assert(parsedData[1][0] === 'Suresh Naidu' && parsedData[1][1] === '9848012345', 'XLSX cell values match expected buyer record');

// -----------------------------------------------------------------------------
// SECTION 6: 10,000-Row Chunked Processing Performance Benchmark
// -----------------------------------------------------------------------------
console.log('\n--- 6. 10,000-Row Stress Test & Benchmark ---');

const largeRows = [];
for (let i = 1; i <= 10000; i++) {
  largeRows.push({
    rowIndex: i,
    data: {
      phone: `9198${String(i).padStart(8, '0')}`,
      name: `Stress Lead ${i}`,
      location: i % 2 === 0 ? 'Kokapet' : 'Gachibowli',
    },
  });
}

console.log(`Generated 10,000 test rows. Processing with chunk size = 1,000...`);
const benchStart = Date.now();

const benchResult = await processSpreadsheetImport({
  rows: largeRows,
  columnMappings: [
    { fileHeader: 'phone', targetField: 'phone', confidence: 1, sampleValues: [] },
    { fileHeader: 'name', targetField: 'name', confidence: 1, sampleValues: [] },
  ],
  defaultConsent: {
    status: 'unverified',
    source: 'unverified_import',
  },
  chunkSize: 1000,
});

const benchDuration = Date.now() - benchStart;
console.log(`Processed 10,000 rows in ${benchDuration} ms (${Math.round((10000 / benchDuration) * 1000)} rows/sec)`);

assert(benchResult.report.totalRows === 10000, 'Processed all 10,000 rows without dropping records');
assert(benchResult.report.validRows === 10000, 'All 10,000 rows normalized to E.164 accurately');
assert(benchDuration < 3000, `Performance target met: processed 10,000 rows under 3.0s (${benchDuration}ms)`);

console.log('\n================================================================');
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================\n');

if (failed > 0) {
  process.exit(1);
}
