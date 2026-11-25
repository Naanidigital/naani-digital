// ==============================================================================
// Meta WhatsApp Template & Campaign Composer Domain Models (Stage 3)
// ==============================================================================

import { StandardField, AudienceFilterCriteria } from '../campaignImport/types';

export type WhatsAppTemplateCategory = 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';

export type WhatsAppTemplateStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | 'PAUSED';

export type TemplateComponentType = 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';

export type HeaderFormat = 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';

export interface TemplateButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string;
  phoneNumber?: string;
}

export interface TemplateComponent {
  type: TemplateComponentType;
  format?: HeaderFormat;
  text?: string;
  example?: {
    body_text?: string[][];
    header_text?: string[];
  };
  buttons?: TemplateButton[];
}

export interface TemplateTranslation {
  code: string; // e.g. 'en_US', 'te', 'hi'
  languageName: string; // e.g. 'English (US)', 'Telugu', 'Hindi'
  status: WhatsAppTemplateStatus;
  components: TemplateComponent[];
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: WhatsAppTemplateCategory;
  defaultLanguage: string;
  translations: TemplateTranslation[];
  lastUpdated: string;
  qualityScore?: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
}

export interface VariableMapping {
  placeholder: string; // e.g. '{{1}}'
  componentType: 'HEADER' | 'BODY';
  sourceType: 'field' | 'static';
  sourceField?: StandardField; // 'name' | 'propertyInterest' | 'location' | 'budget' | 'bhk'
  staticValue?: string;
  fallbackValue: string;
}

export type CampaignObjective =
  | 'project_launch'
  | 'lead_reengagement'
  | 'open_house'
  | 'price_alert'
  | 'event_invitation'
  | 'general_promotional';

export interface CampaignAudienceStats {
  totalContacts: number;
  validContacts: number;
  verifiedOptInContacts: number;
  unverifiedContacts: number;
  suppressedContacts: number;
  duplicateContacts: number;
  eligibleAudience: number; // Strictly verifiedOptIn contacts that are NOT suppressed
}

export interface CampaignAuditEntry {
  timestamp: string;
  action: string;
  actor: string;
  details?: string;
}

export interface CampaignDraft {
  id: string;
  name: string;
  objective: CampaignObjective;
  templateId: string;
  templateName: string;
  languageCode: string;
  variableMappings: VariableMapping[];
  audienceFilters: AudienceFilterCriteria;
  audienceStats: CampaignAudienceStats;
  status: 'draft';
  createdAt: string;
  updatedAt: string;
  auditTrail: CampaignAuditEntry[];
}
