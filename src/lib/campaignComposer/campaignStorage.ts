// ==============================================================================
// Campaign Draft Storage & Audience Eligibility Service (Stage 3)
// Strictly local draft persistence with full audit log and consent enforcement
// ==============================================================================

import {
  CampaignDraft,
  CampaignAudienceStats,
  CampaignAuditEntry,
  VariableMapping,
} from './types';
import { NormalizedContact, AudienceFilterCriteria } from '../campaignImport/types';
import { filterCampaignAudience } from '../campaignImport/audienceFilter';
import { getTemplateById, validateVariableMappings } from './templateService';

const CAMPAIGN_DRAFTS_STORAGE_KEY = 'naani_crm_campaign_drafts_v1';

// Initial preloaded draft for instant demonstration
const INITIAL_DEMO_DRAFTS: CampaignDraft[] = [
  {
    id: 'draft_cascades_vip_preview',
    name: 'The Cascades Neopolis — VIP Investor Preview',
    objective: 'project_launch',
    templateId: 'tmpl_cascades_launch_01',
    templateName: 'cascades_launch_invitation',
    languageCode: 'en_US',
    variableMappings: [
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
        sourceType: 'static',
        staticValue: 'The Cascades',
        fallbackValue: 'The Cascades',
      },
      {
        placeholder: '{{3}}',
        componentType: 'BODY',
        sourceType: 'static',
        staticValue: 'Neopolis, Kokapet',
        fallbackValue: 'Kokapet',
      },
    ],
    audienceFilters: {
      sourceType: 'all',
      locations: ['Neopolis, Kokapet', 'Kokapet'],
      bhkTypes: ['3 BHK', '4 BHK'],
    },
    audienceStats: {
      totalContacts: 145,
      validContacts: 145,
      verifiedOptInContacts: 42,
      unverifiedContacts: 98,
      suppressedContacts: 5,
      duplicateContacts: 0,
      eligibleAudience: 42, // Strictly verified opt-ins
    },
    status: 'draft',
    createdAt: '2026-11-22T08:00:00Z',
    updatedAt: '2026-11-23T10:00:00Z',
    auditTrail: [
      {
        timestamp: '2026-11-22T08:00:00Z',
        action: 'Created campaign draft',
        actor: 'Staff Admin',
        details: 'Initial draft configured with cascades_launch_invitation template',
      },
      {
        timestamp: '2026-11-23T10:00:00Z',
        action: 'Updated audience filter',
        actor: 'Staff Admin',
        details: 'Applied 3 BHK & 4 BHK filter, eligible audience updated to 42',
      },
    ],
  },
];

/**
 * Loads all saved campaign drafts from localStorage or fallback
 */
export function getCampaignDrafts(): CampaignDraft[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_DRAFTS;
  try {
    const raw = localStorage.getItem(CAMPAIGN_DRAFTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CAMPAIGN_DRAFTS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DRAFTS));
      return INITIAL_DEMO_DRAFTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read campaign drafts from localStorage', err);
    return INITIAL_DEMO_DRAFTS;
  }
}

/**
 * Gets a specific campaign draft by its ID
 */
export function getCampaignDraftById(id: string): CampaignDraft | undefined {
  const drafts = getCampaignDrafts();
  return drafts.find((d) => d.id === id);
}

/**
 * Saves or updates a campaign draft with an audit trail entry
 */
export function saveCampaignDraft(
  draft: CampaignDraft,
  actor: string = 'Staff Admin',
  actionNote?: string
): CampaignDraft {
  const drafts = getCampaignDrafts();
  const existingIdx = drafts.findIndex((d) => d.id === draft.id);

  const timestamp = new Date().toISOString();
  const auditEntry: CampaignAuditEntry = {
    timestamp,
    action: actionNote || (existingIdx >= 0 ? 'Updated campaign draft' : 'Created campaign draft'),
    actor,
    details: `Objective: ${draft.objective}, Template: ${draft.templateName}, Audience: ${draft.audienceStats.eligibleAudience} recipients`,
  };

  const updatedDraft: CampaignDraft = {
    ...draft,
    status: 'draft', // Hard guarantee: strictly remains 'draft'
    updatedAt: timestamp,
    createdAt: draft.createdAt || timestamp,
    auditTrail: [auditEntry, ...(draft.auditTrail || [])],
  };

  let updatedList: CampaignDraft[];
  if (existingIdx >= 0) {
    updatedList = [...drafts];
    updatedList[existingIdx] = updatedDraft;
  } else {
    updatedList = [updatedDraft, ...drafts];
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CAMPAIGN_DRAFTS_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (err) {
      console.error('Failed to persist campaign drafts', err);
    }
  }

  return updatedDraft;
}

/**
 * Deletes a draft by ID
 */
export function deleteCampaignDraft(id: string): void {
  const drafts = getCampaignDrafts().filter((d) => d.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CAMPAIGN_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    } catch (err) {
      console.error('Failed to update campaign drafts after deletion', err);
    }
  }
}

/**
 * Calculates strict audience eligibility statistics for campaign targeting
 * GUARANTEE: Unverified and suppressed contacts are excluded from eligibleAudience.
 */
export function calculateAudienceEligibility(
  allContacts: NormalizedContact[],
  filterCriteria: AudienceFilterCriteria
): {
  stats: CampaignAudienceStats;
  eligibleContacts: NormalizedContact[];
  quarantinedContacts: NormalizedContact[];
  suppressedContacts: NormalizedContact[];
} {
  // Always include suppressed in intermediate filter to calculate exact suppression statistics
  const filteredResult = filterCampaignAudience(allContacts, {
    ...filterCriteria,
    includeSuppressed: true,
  });
  const contacts = filteredResult.contacts;

  let validContacts = 0;
  let verifiedOptInContacts = 0;
  let unverifiedContacts = 0;
  let suppressedContactsCount = 0;
  let duplicateContacts = 0;

  const eligibleContacts: NormalizedContact[] = [];
  const quarantinedContacts: NormalizedContact[] = [];
  const suppressedContactsList: NormalizedContact[] = [];

  for (const c of contacts) {
    if (!c.isValid) {
      continue;
    }
    validContacts++;

    if (c.isDuplicateInFile || c.isDuplicateInCrm) {
      duplicateContacts++;
    }

    if (c.isSuppressed) {
      suppressedContactsCount++;
      suppressedContactsList.push(c);
      continue;
    }

    if (c.consent.status === 'unverified') {
      unverifiedContacts++;
      quarantinedContacts.push(c);
      continue; // STRICT: Unverified cannot be eligible
    }

    if (c.consent.status === 'opted_in') {
      verifiedOptInContacts++;
      // Eligible only if not suppressed and not duplicate
      if (!c.isDuplicateInFile && !c.isDuplicateInCrm) {
        eligibleContacts.push(c);
      }
    }
  }

  const stats: CampaignAudienceStats = {
    totalContacts: contacts.length,
    validContacts,
    verifiedOptInContacts,
    unverifiedContacts,
    suppressedContacts: suppressedContactsCount,
    duplicateContacts,
    eligibleAudience: eligibleContacts.length,
  };

  return {
    stats,
    eligibleContacts,
    quarantinedContacts,
    suppressedContacts: suppressedContactsList,
  };
}

/**
 * Performs full validation before saving a campaign draft
 */
export function validateCampaignDraft(draft: CampaignDraft): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!draft.name || !draft.name.trim()) {
    errors.push('Campaign name is required.');
  }

  if (!draft.templateId) {
    errors.push('A WhatsApp template must be selected.');
  }

  const template = getTemplateById(draft.templateId);
  if (!template) {
    errors.push('Selected WhatsApp template was not found.');
  } else {
    // Check translation
    const translation = template.translations.find((t) => t.code === draft.languageCode);
    if (!translation) {
      errors.push(`Language '${draft.languageCode}' is not supported by template '${template.name}'.`);
    } else {
      if (translation.status !== 'APPROVED') {
        errors.push(`Template translation is ${translation.status}. Only APPROVED templates may be used in campaigns.`);
      }

      // Check variable mappings
      const mappingCheck = validateVariableMappings(translation.components, draft.variableMappings);
      if (!mappingCheck.isValid) {
        if (mappingCheck.missingMappings.length > 0) {
          errors.push(`Missing variable mappings: ${mappingCheck.missingMappings.join(', ')}.`);
        }
        if (mappingCheck.missingFallbacks.length > 0) {
          errors.push(`Missing fallbacks or values: ${mappingCheck.missingFallbacks.join(', ')}.`);
        }
      }
    }
  }

  if (draft.audienceStats.eligibleAudience === 0) {
    warnings.push('Eligible audience is currently 0. Add verified contacts before sending.');
  }

  if (draft.audienceStats.unverifiedContacts > 0) {
    warnings.push(
      `${draft.audienceStats.unverifiedContacts} contact(s) are unverified and quarantined from this campaign.`
    );
  }

  if (draft.audienceStats.suppressedContacts > 0) {
    warnings.push(
      `${draft.audienceStats.suppressedContacts} contact(s) are on the global suppression list and excluded.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
