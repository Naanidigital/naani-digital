// ==============================================================================
// Audience Filter & Segment Builder
// Combines CRM Leads and Imported Contacts with multidimensional real estate filters
// ==============================================================================

import { NormalizedContact, AudienceFilterCriteria } from './types';

export interface FilteredAudienceResult {
  totalAudience: number;
  sendableCount: number;      // Valid, opted_in, non-suppressed
  unverifiedCount: number;    // Needs explicit consent confirmation
  suppressedCount: number;    // Excluded due to opt-out or bounce
  duplicateCount: number;     // Excluded due to in-file or cross-source duplicate
  contacts: NormalizedContact[];
  availableLocations: string[];
  availableBudgets: string[];
  availableProperties: string[];
  availableBhkTypes: string[];
  availableSources: string[];
}

/**
 * Filters and aggregates contacts from multiple sources based on campaign targeting criteria.
 */
export function filterCampaignAudience(
  allContacts: NormalizedContact[],
  criteria: AudienceFilterCriteria
): FilteredAudienceResult {
  const {
    searchQuery = '',
    locations = [],
    budgets = [],
    bhkTypes = [],
    propertyInterests = [],
    leadSources = [],
    consentStatuses = [],
    includeSuppressed = false,
    sourceType = 'all',
  } = criteria;

  const locSet = new Set(locations.map((l) => l.toLowerCase()));
  const budSet = new Set(budgets.map((b) => b.toLowerCase()));
  const bhkSet = new Set(bhkTypes.map((b) => b.toLowerCase()));
  const propSet = new Set(propertyInterests.map((p) => p.toLowerCase()));
  const srcSet = new Set(leadSources.map((s) => s.toLowerCase()));
  const conSet = new Set(consentStatuses);

  const searchClean = searchQuery.toLowerCase().trim();

  // Extract all distinct filter facets across the full dataset
  const locationFacet = new Set<string>();
  const budgetFacet = new Set<string>();
  const propertyFacet = new Set<string>();
  const bhkFacet = new Set<string>();
  const sourceFacet = new Set<string>();

  for (const c of allContacts) {
    if (c.location) locationFacet.add(c.location);
    if (c.budget) budgetFacet.add(c.budget);
    if (c.propertyInterest) propertyFacet.add(c.propertyInterest);
    if (c.bhk) bhkFacet.add(c.bhk);
    if (c.leadSource) sourceFacet.add(c.leadSource);
  }

  const filteredContacts: NormalizedContact[] = [];
  let sendableCount = 0;
  let unverifiedCount = 0;
  let suppressedCount = 0;
  let duplicateCount = 0;

  for (const contact of allContacts) {
    // 1. Source Type Filter
    if (sourceType === 'crm_leads' && !contact.crmLeadId) continue;
    if (sourceType === 'imported_files' && contact.crmLeadId) continue;

    // 2. Suppression Check
    if (contact.isSuppressed && !includeSuppressed) {
      suppressedCount++;
      continue;
    }

    // 3. Search Query Filter (Name, Phone, Location, Project)
    if (searchClean) {
      const matchName = contact.name.toLowerCase().includes(searchClean);
      const matchPhone = contact.normalizedPhone.includes(searchClean) || contact.rawPhone.includes(searchClean);
      const matchLoc = contact.location?.toLowerCase().includes(searchClean) || false;
      const matchProp = contact.propertyInterest?.toLowerCase().includes(searchClean) || false;
      if (!matchName && !matchPhone && !matchLoc && !matchProp) {
        continue;
      }
    }

    // 4. Facet Filters
    if (locSet.size > 0 && (!contact.location || !locSet.has(contact.location.toLowerCase()))) {
      continue;
    }

    if (budSet.size > 0 && (!contact.budget || !budSet.has(contact.budget.toLowerCase()))) {
      continue;
    }

    if (bhkSet.size > 0 && (!contact.bhk || !bhkSet.has(contact.bhk.toLowerCase()))) {
      continue;
    }

    if (propSet.size > 0 && (!contact.propertyInterest || !propSet.has(contact.propertyInterest.toLowerCase()))) {
      continue;
    }

    if (srcSet.size > 0 && (!contact.leadSource || !srcSet.has(contact.leadSource.toLowerCase()))) {
      continue;
    }

    if (conSet.size > 0 && !conSet.has(contact.consent.status)) {
      continue;
    }

    // Tally counts
    if (contact.isDuplicateInFile) {
      duplicateCount++;
    } else if (contact.isSuppressed) {
      suppressedCount++;
    } else if (contact.consent.status === 'opted_in' && contact.isValid) {
      sendableCount++;
    } else if (contact.consent.status === 'unverified') {
      unverifiedCount++;
    }

    filteredContacts.push(contact);
  }

  return {
    totalAudience: filteredContacts.length,
    sendableCount,
    unverifiedCount,
    suppressedCount,
    duplicateCount,
    contacts: filteredContacts,
    availableLocations: Array.from(locationFacet).sort(),
    availableBudgets: Array.from(budgetFacet).sort(),
    availableProperties: Array.from(propertyFacet).sort(),
    availableBhkTypes: Array.from(bhkFacet).sort(),
    availableSources: Array.from(sourceFacet).sort(),
  };
}
