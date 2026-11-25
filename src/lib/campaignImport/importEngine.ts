// ==============================================================================
// Chunked Import & Validation Engine (Supports up to 10,000 rows)
// Guarantees non-blocking UI, E.164 normalization, deduplication & consent checks
// ==============================================================================

import {
  RawParsedRow,
  ColumnMapping,
  NormalizedContact,
  ImportValidationReport,
  ConsentMetadata,
  StandardField,
} from './types';
import { normalizePhoneNumber } from './phoneNormalizer';

export interface ProcessImportOptions {
  rows: RawParsedRow[];
  columnMappings: ColumnMapping[];
  defaultConsent: ConsentMetadata;
  existingCrmPhones?: Map<string, string>; // normalizedPhone -> leadId
  suppressedPhones?: Set<string>;          // set of suppressed E.164 phones
  chunkSize?: number;                      // default 500
  onProgress?: (processed: number, total: number) => void;
}

export interface ProcessImportResult {
  contacts: NormalizedContact[];
  report: ImportValidationReport;
  processingTimeMs: number;
}

/**
 * Processes and validates spreadsheet rows in non-blocking asynchronous chunks.
 */
export async function processSpreadsheetImport(
  options: ProcessImportOptions
): Promise<ProcessImportResult> {
  const startTime = Date.now();
  const {
    rows,
    columnMappings,
    defaultConsent,
    existingCrmPhones = new Map<string, string>(),
    suppressedPhones = new Set<string>(),
    chunkSize = 500,
    onProgress,
  } = options;

  // Build lookup map from target field to header name
  const fieldToHeader: Partial<Record<StandardField, string>> = {};
  for (const mapping of columnMappings) {
    if (mapping.targetField !== 'ignore') {
      fieldToHeader[mapping.targetField] = mapping.fileHeader;
    }
  }

  const phoneHeader = fieldToHeader.phone;
  if (!phoneHeader) {
    throw new Error('A column must be mapped to the Phone Number field.');
  }

  const nameHeader = fieldToHeader.name;
  const emailHeader = fieldToHeader.email;
  const locationHeader = fieldToHeader.location;
  const budgetHeader = fieldToHeader.budget;
  const propertyHeader = fieldToHeader.property_interest;
  const bhkHeader = fieldToHeader.bhk;
  const sourceHeader = fieldToHeader.lead_source;
  const consentHeader = fieldToHeader.consent_status;

  const contacts: NormalizedContact[] = [];
  const errors: ImportValidationReport['errors'] = [];
  const seenPhonesInFile = new Map<string, number>(); // normalizedPhone -> first rowIndex

  let validCount = 0;
  let invalidCount = 0;
  let duplicateInFileCount = 0;
  let duplicateInCrmCount = 0;
  let suppressedCount = 0;
  let consentEligibleCount = 0;
  let unverifiedCount = 0;

  const total = rows.length;

  // Process rows in asynchronous chunks to avoid blocking the browser main thread
  for (let i = 0; i < total; i += chunkSize) {
    const chunkEnd = Math.min(i + chunkSize, total);
    
    for (let j = i; j < chunkEnd; j++) {
      const rawRow = rows[j];
      const rawData = rawRow.data;
      const rawPhoneVal = rawData[phoneHeader];
      const rawPhoneStr = String(rawPhoneVal || '').trim();

      // 1. Phone Normalization
      const phoneResult = normalizePhoneNumber(rawPhoneStr);

      if (!phoneResult.isValid) {
        invalidCount++;
        errors.push({
          rowIndex: rawRow.rowIndex,
          phone: rawPhoneStr || '[Empty]',
          reason: phoneResult.error || 'Invalid phone format',
        });

        contacts.push({
          rowIndex: rawRow.rowIndex,
          rawPhone: rawPhoneStr,
          normalizedPhone: '',
          formattedPhone: rawPhoneStr,
          name: nameHeader ? String(rawData[nameHeader] || '').trim() : `Contact ${rawRow.rowIndex}`,
          customVariables: {},
          consent: { status: 'unverified', source: 'unverified_import' },
          isValid: false,
          validationError: phoneResult.error,
          isDuplicateInFile: false,
          isDuplicateInCrm: false,
          isSuppressed: false,
        });
        continue;
      }

      const normPhone = phoneResult.normalized;

      // 2. Duplicate Detection within File
      let isDuplicateInFile = false;
      if (seenPhonesInFile.has(normPhone)) {
        isDuplicateInFile = true;
        duplicateInFileCount++;
        errors.push({
          rowIndex: rawRow.rowIndex,
          phone: phoneResult.formatted,
          reason: `Duplicate phone number in file (first seen at row ${seenPhonesInFile.get(normPhone)})`,
        });
      } else {
        seenPhonesInFile.set(normPhone, rawRow.rowIndex);
      }

      // 3. Duplicate Detection against CRM Leads
      const crmLeadId = existingCrmPhones.get(normPhone);
      const isDuplicateInCrm = Boolean(crmLeadId);
      if (isDuplicateInCrm && !isDuplicateInFile) {
        duplicateInCrmCount++;
      }

      // 4. Global Suppression Detection
      const isSuppressed = suppressedPhones.has(normPhone);
      if (isSuppressed) {
        suppressedCount++;
      }

      // 5. Consent Assessment (STRICT COMPLIANCE: Defaults to unverified)
      let rowConsentStatus = defaultConsent.status || 'unverified';
      let rowConsentSource = defaultConsent.source || 'unverified_import';

      // If spreadsheet has an explicit consent column, parse it safely
      if (consentHeader && rawData[consentHeader]) {
        const val = String(rawData[consentHeader]).toLowerCase().trim();
        if (val === 'yes' || val === 'true' || val === 'opted_in' || val === '1' || val === 'subscribed') {
          // Only promote to opted_in if explicit proof is documented
          if (defaultConsent.proofReference || defaultConsent.proofNotes) {
            rowConsentStatus = 'opted_in';
            rowConsentSource = 'csv_import';
          } else {
            // Lacks proof documentation: keep unverified
            rowConsentStatus = 'unverified';
          }
        } else if (val === 'no' || val === 'false' || val === 'opted_out' || val === '0' || val === 'unsubscribed') {
          rowConsentStatus = 'opted_out';
        }
      }

      if (isSuppressed) {
        rowConsentStatus = 'suppressed';
      }

      if (rowConsentStatus === 'opted_in') {
        consentEligibleCount++;
      } else {
        unverifiedCount++;
      }

      // 6. Extract Custom Variables for WhatsApp Template Placeholders
      const customVariables: Record<string, string> = {};
      for (const [header, cellVal] of Object.entries(rawData)) {
        if (cellVal !== undefined && cellVal !== null && String(cellVal).trim() !== '') {
          // Normalize header key for template interpolation (e.g. {{name}}, {{project}})
          const cleanKey = header.toLowerCase().replace(/[^a-z0-9_]/g, '_');
          customVariables[cleanKey] = String(cellVal).trim();
        }
      }

      const contact: NormalizedContact = {
        rowIndex: rawRow.rowIndex,
        rawPhone: rawPhoneStr,
        normalizedPhone: normPhone,
        formattedPhone: phoneResult.formatted,
        name: nameHeader ? String(rawData[nameHeader] || '').trim() || `Contact ${rawRow.rowIndex}` : `Contact ${rawRow.rowIndex}`,
        email: emailHeader ? String(rawData[emailHeader] || '').trim() : undefined,
        location: locationHeader ? String(rawData[locationHeader] || '').trim() : undefined,
        budget: budgetHeader ? String(rawData[budgetHeader] || '').trim() : undefined,
        propertyInterest: propertyHeader ? String(rawData[propertyHeader] || '').trim() : undefined,
        bhk: bhkHeader ? String(rawData[bhkHeader] || '').trim() : undefined,
        leadSource: sourceHeader ? String(rawData[sourceHeader] || '').trim() : 'CSV Import',
        customVariables,
        consent: {
          status: rowConsentStatus,
          source: rowConsentSource,
          capturedAt: defaultConsent.capturedAt || new Date().toISOString(),
          proofReference: defaultConsent.proofReference,
          proofNotes: defaultConsent.proofNotes,
        },
        isValid: !isDuplicateInFile,
        isDuplicateInFile,
        isDuplicateInCrm,
        isSuppressed,
        crmLeadId,
      };

      if (!isDuplicateInFile) {
        validCount++;
      }

      contacts.push(contact);
    }

    if (onProgress) {
      onProgress(chunkEnd, total);
    }

    // Yield control to event loop to keep the UI completely responsive
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  const report: ImportValidationReport = {
    totalRows: total,
    validRows: validCount,
    invalidRows: invalidCount,
    duplicateInFileRows: duplicateInFileCount,
    duplicateInCrmRows: duplicateInCrmCount,
    suppressedRows: suppressedCount,
    consentEligibleRows: consentEligibleCount,
    unverifiedRows: unverifiedCount,
    errors,
  };

  const processingTimeMs = Date.now() - startTime;

  return {
    contacts,
    report,
    processingTimeMs,
  };
}
