// ==============================================================================
// Campaign Import Storage & Local State Adapter
// Decouples UI from backend; preserves production database safety while unapplied
// ==============================================================================

import { ImportHistoryRecord, NormalizedContact } from './types';
import { crmSupabase } from '@/integrations/supabase/crmClient';

const STORAGE_KEY_IMPORTS = 'naani_crm_campaign_imports';
const STORAGE_KEY_RECIPIENTS = 'naani_crm_campaign_recipients';
const STORAGE_KEY_SUPPRESSIONS = 'naani_crm_whatsapp_suppressions';

// Initial mock suppression list (for safe testing)
const INITIAL_SUPPRESSIONS = [
  '919000000001',
  '919000000002',
  '919123456789',
];

/**
 * Reads existing CRM leads from the live CRM database for cross-referencing (read-only).
 */
export async function fetchExistingCrmLeadPhones(): Promise<Map<string, string>> {
  const phoneMap = new Map<string, string>();
  try {
    const { data, error } = await crmSupabase
      .from('crm_leads')
      .select('id, phone')
      .limit(1000);

    if (!error && Array.isArray(data)) {
      for (const lead of data) {
        if (lead.phone) {
          const digits = String(lead.phone).replace(/\D/g, '');
          if (digits.length === 10) {
            phoneMap.set(`91${digits}`, lead.id);
          } else if (digits.length >= 10) {
            phoneMap.set(digits, lead.id);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[importStorage] Unable to fetch CRM leads (using empty lead cache):', err);
  }
  return phoneMap;
}

/**
 * Returns the current suppression set.
 */
export function getSuppressedPhones(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_SUPPRESSIONS);
    if (stored) {
      const arr = JSON.parse(stored);
      return new Set(Array.isArray(arr) ? arr : INITIAL_SUPPRESSIONS);
    }
  } catch {}
  return new Set(INITIAL_SUPPRESSIONS);
}

/**
 * Stores a new suppression number (local testing).
 */
export function addSuppressedPhone(phone: string): void {
  const current = getSuppressedPhones();
  current.add(phone.replace(/\D/g, ''));
  try {
    localStorage.setItem(STORAGE_KEY_SUPPRESSIONS, JSON.stringify(Array.from(current)));
  } catch {}
}

/**
 * Retrieves the audit history of spreadsheet imports.
 */
export function getImportHistory(): ImportHistoryRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_IMPORTS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return [];
}

/**
 * Saves a new import audit record into history (adhering to crm_campaign_imports contract).
 */
export function saveImportRecord(record: ImportHistoryRecord): void {
  const history = getImportHistory();
  history.unshift(record);
  try {
    localStorage.setItem(STORAGE_KEY_IMPORTS, JSON.stringify(history.slice(0, 50)));
  } catch (e) {
    console.warn('[importStorage] Failed to save import history to localStorage:', e);
  }
}

/**
 * Retrieves currently cached / staged campaign contacts.
 */
export function getStagedContacts(): NormalizedContact[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_RECIPIENTS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return [];
}

/**
 * Saves contacts to the staging area for campaign dispatch.
 */
export function saveStagedContacts(contacts: NormalizedContact[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_RECIPIENTS, JSON.stringify(contacts));
  } catch (e) {
    console.warn('[importStorage] Failed to save contacts to localStorage:', e);
  }
}
