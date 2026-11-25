// ==============================================================================
// Campaign Import Engine & Contact Management — Type Definitions
// Corresponds to Stage 1 Schema (crm_campaign_imports & crm_campaign_recipients)
// ==============================================================================

export type ConsentStatus = 'opted_in' | 'unverified' | 'opted_out' | 'suppressed';

export type ConsentSource = 
  | 'web_form' 
  | 'whatsapp_inbound_optin' 
  | 'offline_agreement' 
  | 'csv_import' 
  | 'crm_historical'
  | 'unverified_import';

export interface ConsentMetadata {
  status: ConsentStatus;
  source: ConsentSource;
  capturedAt?: string;
  proofReference?: string;
  proofNotes?: string;
}

export type StandardField = 
  | 'name'
  | 'phone'
  | 'email'
  | 'location'
  | 'budget'
  | 'property_interest'
  | 'bhk'
  | 'lead_source'
  | 'consent_status'
  | 'notes'
  | 'ignore';

export interface ColumnMapping {
  fileHeader: string;
  targetField: StandardField;
  confidence: number; // 0 to 1
  sampleValues: string[];
}

export interface RawParsedRow {
  rowIndex: number;
  data: Record<string, any>;
}

export interface NormalizedContact {
  rowIndex: number;
  rawPhone: string;
  normalizedPhone: string; // E.164 standard without '+'
  formattedPhone: string;  // Visual display '+91 98765 43210'
  name: string;
  email?: string;
  location?: string;
  budget?: string;
  propertyInterest?: string;
  bhk?: string;
  leadSource?: string;
  customVariables: Record<string, string>;
  consent: ConsentMetadata;
  isValid: boolean;
  validationError?: string;
  isDuplicateInFile: boolean;
  isDuplicateInCrm: boolean;
  isSuppressed: boolean;
  crmLeadId?: string;
}

export interface ImportValidationReport {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateInFileRows: number;
  duplicateInCrmRows: number;
  suppressedRows: number;
  consentEligibleRows: number; // opted_in
  unverifiedRows: number;      // unverified
  errors: Array<{
    rowIndex: number;
    phone: string;
    reason: string;
    details?: string;
  }>;
}

export interface ImportHistoryRecord {
  id: string;
  originalFilename: string;
  fileSizeBytes: number;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  excludedRows: number;
  consentEligibleRows: number;
  columnMapping: Record<string, StandardField>;
  errorReport: Array<{ rowIndex: number; phone: string; reason: string }>;
  importedBy?: string;
  createdAt: string;
}

export interface AudienceFilterCriteria {
  searchQuery?: string;
  locations?: string[];
  budgets?: string[];
  bhkTypes?: string[];
  propertyInterests?: string[];
  leadSources?: string[];
  consentStatuses?: ConsentStatus[];
  includeSuppressed?: boolean;
  sourceType?: 'all' | 'crm_leads' | 'imported_files';
}
