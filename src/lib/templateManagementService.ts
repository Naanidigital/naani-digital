// ==============================================================================
// WhatsApp Template Management Service (Gate 7)
// Manages WhatsApp template authoring, validation, Meta API submission,
// and real-time approval status synchronization.
// ==============================================================================

import { crmSupabase } from '@/integrations/supabase/crmClient';

export type WhatsAppTemplateStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'PAUSED'
  | 'DISABLED';

export type WhatsAppTemplateCategory = 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';

export type HeaderFormat = 'NONE' | 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';

export interface TemplateButton {
  type: 'QUICK_REPLY' | 'PHONE_NUMBER' | 'URL';
  text: string;
  phone_number?: string;
  url?: string;
  example?: string[];
}

export interface TemplateComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  text?: string;
  example?: {
    header_text?: string[];
    header_handle?: string[];
    body_text?: string[][];
  };
  buttons?: TemplateButton[];
}

export interface CrmWhatsAppTemplate {
  id: string;
  meta_template_id?: string | null;
  template_name: string;
  language: string;
  category: WhatsAppTemplateCategory;
  status: WhatsAppTemplateStatus;
  header_type: HeaderFormat;
  components: TemplateComponent[];
  variable_placeholders: string[];
  description?: string | null;
  rejection_reason?: string | null;
  quality_score?: string;
  last_synced_at?: string;
  created_at?: string;
  updated_at?: string;
}

// Initial fallback templates representing approved Meta templates
export const SEED_TEMPLATES: CrmWhatsAppTemplate[] = [
  {
    id: 'tmpl-canny-01',
    meta_template_id: 'meta_canny_aravindham1',
    template_name: 'canny_aravindham1',
    language: 'en',
    category: 'MARKETING',
    status: 'APPROVED',
    header_type: 'IMAGE',
    components: [
      {
        type: 'HEADER',
        format: 'IMAGE',
        example: {
          header_text: ['https://naani.in/assets/canny-aravindam-clubhouse.jpg'],
        },
      },
      {
        type: 'BODY',
        text: 'Hello, welcome to Canny Aravindam by Naani Projects. Discover premium luxury 3 BHK apartments in Kompally with grand amenities and lush landscapes.',
      },
      {
        type: 'FOOTER',
        text: 'Naani Projects • Hyderabad',
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'QUICK_REPLY',
            text: 'Schedule Site Visit',
          },
          {
            type: 'URL',
            text: 'View Project Details',
            url: 'https://naani.in/canny-aravindam',
          },
        ],
      },
    ],
    variable_placeholders: [],
    description: 'Official approved Canny Aravindam promotional template.',
    quality_score: 'HIGH',
    last_synced_at: new Date().toISOString(),
  },
  {
    id: 'tmpl-cascades-02',
    meta_template_id: 'meta_cascades_launch',
    template_name: 'cascades_launch_invitation',
    language: 'en',
    category: 'MARKETING',
    status: 'APPROVED',
    header_type: 'IMAGE',
    components: [
      {
        type: 'HEADER',
        format: 'IMAGE',
        example: {
          header_text: ['https://naani.in/assets/the-cascades-neopolis.jpg'],
        },
      },
      {
        type: 'BODY',
        text: 'Hello {{1}}, you are cordially invited to the exclusive preview of {{2}} located in {{3}}. Experience ultra-luxury high-rise residences with panoramic sky decks.\n\nReply to this message or tap below to reserve your priority site visit.',
        example: {
          body_text: [['Srikanth Rao', 'The Cascades', 'Neopolis, Kokapet']],
        },
      },
      {
        type: 'FOOTER',
        text: 'Naani Projects • TS RERA Approved',
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'QUICK_REPLY',
            text: 'Book Site Visit',
          },
          {
            type: 'PHONE_NUMBER',
            text: 'Call Advisor',
            phone_number: '+919493943946',
          },
        ],
      },
    ],
    variable_placeholders: ['{{1}}', '{{2}}', '{{3}}'],
    description: 'Neopolis Kokapet ultra-luxury high-rise preview invitation.',
    quality_score: 'HIGH',
    last_synced_at: new Date().toISOString(),
  },
  {
    id: 'tmpl-pending-03',
    meta_template_id: 'meta_price_drop_review',
    template_name: 'property_price_drop_alert',
    language: 'en',
    category: 'MARKETING',
    status: 'PENDING',
    header_type: 'TEXT',
    components: [
      {
        type: 'HEADER',
        format: 'TEXT',
        text: 'Price Drop Alert: {{1}}',
        example: {
          header_text: ['Urbanrise On Cloud 33'],
        },
      },
      {
        type: 'BODY',
        text: 'Dear {{1}}, great news! The price for {{2}} in {{3}} has dropped by {{4}} for a limited time. Contact us now to reserve at this special pricing.',
        example: {
          body_text: [['Aditya', '3 BHK Residence', 'Bachupally', '₹ 5 Lakhs']],
        },
      },
      {
        type: 'FOOTER',
        text: 'Naani Digital Real Estate Advisory',
      },
    ],
    variable_placeholders: ['{{1}}', '{{2}}', '{{3}}', '{{4}}'],
    description: 'Submitted to Meta on Nov 25 — awaiting review.',
    quality_score: 'UNKNOWN',
    last_synced_at: new Date().toISOString(),
  },
  {
    id: 'tmpl-rejected-04',
    meta_template_id: 'meta_festive_offer_99',
    template_name: 'diwali_super_offer',
    language: 'en',
    category: 'MARKETING',
    status: 'REJECTED',
    header_type: 'NONE',
    components: [
      {
        type: 'BODY',
        text: 'Special festive discount! Get free gold coins with every booking.',
      },
    ],
    variable_placeholders: [],
    description: 'Rejected by Meta automated moderation.',
    rejection_reason: 'PROMOTIONAL_CONTENT_IN_WRONG_CATEGORY: Message content violates WhatsApp Commerce Policy regarding financial incentives.',
    quality_score: 'LOW',
    last_synced_at: new Date().toISOString(),
  },
];

// Local storage key for offline drafts
const LOCAL_DRAFTS_STORAGE_KEY = 'naani_crm_whatsapp_template_drafts';

function getLocalDrafts(): CrmWhatsAppTemplate[] {
  try {
    const raw = localStorage.getItem(LOCAL_DRAFTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalDrafts(drafts: CrmWhatsAppTemplate[]): void {
  try {
    localStorage.setItem(LOCAL_DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    // silent
  }
}

/**
 * Removes a variable placeholder {{varIndex}} from the template body and automatically
 * renumbers all subsequent variables down by 1 so the sequence remains strictly 1..N.
 *
 * Example:
 *   Input: "{{1}} {{2}} {{3}}", varIndex: 2
 *   Output: "{{1}} {{2}}"
 */
export function removeAndRenumberVariable(bodyText: string, varIndex: number): string {
  if (!bodyText) return '';

  // 1. Remove all occurrences of {{varIndex}}
  let text = bodyText.replace(new RegExp(`\\{\\{${varIndex}\\}\\}`, 'g'), '');

  // 2. Renumber any {{n}} where n > varIndex down to {{n - 1}}
  text = text.replace(/\{\{(\d+)\}\}/g, (match, digits) => {
    const n = parseInt(digits, 10);
    if (n > varIndex) {
      return `{{${n - 1}}}`;
    }
    return match;
  });

  // 3. Clean up spaces before punctuation (e.g. "welcome to ." -> "welcome to.")
  text = text.replace(/ +([.,!?;:])/g, '$1');

  // 4. Collapse multiple consecutive spaces into a single space
  text = text.replace(/ {2,}/g, ' ');

  // 5. Trim leading and trailing whitespace
  return text.trim();
}

export interface MetaMediaUploadResult {
  success: boolean;
  handle?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  error?: string;
  missingConfig?: string;
  metaError?: {
    message?: string;
    code?: number;
    error_subcode?: number;
    error_user_title?: string;
    error_user_msg?: string;
    details?: string;
    fbtrace_id?: string;
  };
}

/**
 * Validates and uploads an image to the Meta Resumable Upload API via backend Edge Function.
 * Enforces JPEG/PNG file types, max 5MB size limit, and verifies magic bytes.
 */
export async function uploadTemplateMedia(file: File): Promise<MetaMediaUploadResult> {
  if (!file) {
    return { success: false, error: 'No file selected for upload.' };
  }

  // 1. Size check: 5MB limit for WhatsApp template images
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_IMAGE_SIZE) {
    return {
      success: false,
      error: `File size exceeds the 5MB limit supported by Meta (file size: ${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select a smaller JPG or PNG image.`,
    };
  }

  // 2. MIME type check
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const ext = file.name.split('.').pop()?.toLowerCase();
  const validExt = ['jpg', 'jpeg', 'png'].includes(ext || '');

  if (!allowedTypes.includes(file.type.toLowerCase()) && !validExt) {
    return {
      success: false,
      error: 'Unsupported file format. Only JPG, JPEG, and PNG images are supported for WhatsApp template headers.',
    };
  }

  // 3. Inspect binary magic bytes
  try {
    const buffer = await file.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const isJpeg = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
    const isPng =
      bytes.length >= 8 &&
      bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 &&
      bytes[4] === 0x0D && bytes[5] === 0x0A && bytes[6] === 0x1A && bytes[7] === 0x0A;

    if (!isJpeg && !isPng) {
      return {
        success: false,
        error: 'File content does not match a valid JPG or PNG image. Please upload a genuine image file.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      error: `Could not verify file contents: ${err.message}`,
    };
  }

  // 4. Send authenticated multipart/form-data to manage-whatsapp-templates Edge Function
  try {
    const { data: sessionData } = await crmSupabase.auth.getSession();
    const token = sessionData.session?.access_token;

    const funcUrl = `${import.meta.env.VITE_CRM_SUPABASE_URL || 'https://lpbdwmpglwdedqdiovqu.supabase.co'}/functions/v1/manage-whatsapp-templates`;
    const formData = new FormData();
    formData.append('action', 'upload_media');
    formData.append('file', file);

    const res = await fetch(funcUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const resData = await res.json();
    if (!res.ok || !resData.success) {
      let formattedError = resData.error || 'Failed to upload image to Meta Resumable Upload API.';
      if (resData.metaError) {
        const parts: string[] = [];
        if (resData.metaError.error_user_title) parts.push(resData.metaError.error_user_title);
        if (resData.metaError.message) parts.push(resData.metaError.message);
        if (resData.metaError.error_user_msg) parts.push(`(${resData.metaError.error_user_msg})`);
        if (resData.metaError.details) parts.push(`Details: ${resData.metaError.details}`);
        if (resData.metaError.code) {
          parts.push(`[Meta Code: ${resData.metaError.code}${resData.metaError.error_subcode ? `, Subcode: ${resData.metaError.error_subcode}` : ''}]`);
        }
        if (parts.length > 0) formattedError = parts.join(' - ');
      }

      return {
        success: false,
        error: formattedError,
        metaError: resData.metaError,
        missingConfig: resData.missingConfig,
      };
    }

    return {
      success: true,
      handle: resData.handle,
      fileName: resData.fileName || file.name,
      fileSize: resData.fileSize || file.size,
      fileType: resData.fileType || file.type,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Media upload network error: ${err.message}`,
    };
  }
}

/**
 * Validates template components client-side before draft saving or Meta submission.
 */
export function validateTemplate(template: Partial<CrmWhatsAppTemplate>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 1. Name check
  if (!template.template_name || !/^[a-z0-9_]{1,512}$/.test(template.template_name)) {
    errors.push('Template name must be 1-512 characters, lowercase alphanumeric and underscores only (no spaces or hyphens).');
  }

  // 2. Language check
  if (!template.language) {
    errors.push('Language code is required (e.g. "en", "te").');
  }

  // 3. Category check
  if (!template.category || !['MARKETING', 'UTILITY', 'AUTHENTICATION'].includes(template.category)) {
    errors.push('Category must be MARKETING, UTILITY, or AUTHENTICATION.');
  }

  // 4. Components check
  const components = template.components || [];
  const bodyComp = components.find((c) => c.type === 'BODY');
  if (!bodyComp || !bodyComp.text || bodyComp.text.trim().length === 0) {
    errors.push('Body message text is required.');
  } else {
    if (bodyComp.text.length > 1024) {
      errors.push(`Body exceeds max 1024 characters (current: ${bodyComp.text.length}).`);
    }

    // Check sequential variables
    const matches = [...bodyComp.text.matchAll(/\{\{(\d+)\}\}/g)];
    const indices = matches.map((m) => parseInt(m[1], 10));

    if (indices.length > 0) {
      for (let i = 1; i <= indices.length; i++) {
        if (!indices.includes(i)) {
          errors.push(`Variables must be sequential starting at {{1}}. Missing {{${i}}}.`);
          break;
        }
      }

      const examples = bodyComp.example?.body_text?.[0] || [];
      if (examples.length < indices.length) {
        errors.push(`Please provide sample values for all ${indices.length} variables.`);
      } else if (examples.length > indices.length) {
        errors.push(`Found ${examples.length - indices.length} orphaned sample value(s) with no matching variable placeholders in the template body.`);
      } else if (examples.some((val) => !val || !val.trim())) {
        errors.push('All variable placeholders must have non-empty sample values for Meta approval.');
      }
    } else {
      const examples = bodyComp.example?.body_text?.[0] || [];
      if (examples.length > 0) {
        errors.push('Template body contains no variables, but sample values are present.');
      }
    }
  }

  // Header check
  const headerComp = components.find((c) => c.type === 'HEADER');
  if (headerComp) {
    if (headerComp.format === 'TEXT') {
      if (headerComp.text && headerComp.text.length > 60) {
        errors.push('Header text exceeds max 60 characters.');
      }
    } else if (headerComp.format === 'IMAGE') {
      const handles = headerComp.example?.header_handle;
      if (!handles || !Array.isArray(handles) || handles.length === 0 || !handles[0] || !handles[0].trim()) {
        errors.push('IMAGE header requires an uploaded image handle (header_handle). Please upload an image.');
      }
      if ((headerComp.example as any)?.header_text) {
        errors.push('IMAGE header must not use header_text; use header_handle.');
      }
    }
  }

  // Footer check
  const footerComp = components.find((c) => c.type === 'FOOTER');
  if (footerComp && footerComp.text && footerComp.text.length > 60) {
    errors.push('Footer text exceeds max 60 characters.');
  }

  // Buttons check
  const btnComp = components.find((c) => c.type === 'BUTTONS');
  if (btnComp && btnComp.buttons) {
    if (btnComp.buttons.length > 10) {
      errors.push('Maximum 10 buttons are permitted.');
    }
    const urls = btnComp.buttons.filter((b) => b.type === 'URL');
    const phones = btnComp.buttons.filter((b) => b.type === 'PHONE_NUMBER');
    if (urls.length > 2) errors.push('Maximum 2 URL buttons are permitted.');
    if (phones.length > 1) errors.push('Maximum 1 Call Phone Number button is permitted.');

    for (const b of btnComp.buttons) {
      if (b.text.length > 25) errors.push(`Button "${b.text}" exceeds 25 characters.`);
      if (b.type === 'URL' && !b.url) errors.push(`URL button "${b.text}" requires a destination URL.`);
      if (b.type === 'PHONE_NUMBER' && !b.phone_number) errors.push(`Phone button "${b.text}" requires a phone number.`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Fetches all templates from Supabase and local storage drafts.
 */
export async function getTemplates(): Promise<CrmWhatsAppTemplate[]> {
  const localDrafts = getLocalDrafts();

  try {
    const { data, error } = await crmSupabase
      .from('crm_whatsapp_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      // Merge database templates with local drafts
      const dbTemplates: CrmWhatsAppTemplate[] = data.map((d: any) => ({
        id: d.id,
        meta_template_id: d.meta_template_id,
        template_name: d.template_name,
        language: d.language || 'en',
        category: d.category,
        status: d.status,
        header_type: d.header_type || 'NONE',
        components: Array.isArray(d.components) ? d.components : [],
        variable_placeholders: Array.isArray(d.variable_placeholders) ? d.variable_placeholders : [],
        description: d.description,
        rejection_reason: d.rejection_reason,
        quality_score: d.quality_score || 'UNKNOWN',
        last_synced_at: d.last_synced_at,
        created_at: d.created_at,
        updated_at: d.updated_at,
      }));

      // Filter out drafts that match db templates
      const uniqueDrafts = localDrafts.filter(
        (draft) => !dbTemplates.some((t) => t.template_name === draft.template_name && t.language === draft.language)
      );

      return [...uniqueDrafts, ...dbTemplates];
    }
  } catch (e) {
    console.warn('[templateManagementService] DB query failed, falling back to seed & local:', e);
  }

  // Fallback to seed templates plus local drafts
  const uniqueDrafts = localDrafts.filter(
    (draft) => !SEED_TEMPLATES.some((t) => t.template_name === draft.template_name && t.language === draft.language)
  );

  return [...uniqueDrafts, ...SEED_TEMPLATES];
}

/**
 * Saves or updates a template draft.
 */
export async function saveDraftTemplate(
  template: Partial<CrmWhatsAppTemplate>
): Promise<{ success: boolean; template?: CrmWhatsAppTemplate; error?: string }> {
  const validation = validateTemplate(template);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join('; ') };
  }

  // Extract variables
  const bodyComp = template.components?.find((c) => c.type === 'BODY');
  const matches = [...(bodyComp?.text || '').matchAll(/\{\{(\d+)\}\}/g)];
  const placeholders = matches.map((m) => `{{${m[1]}}}`);

  const headerComp = template.components?.find((c) => c.type === 'HEADER');
  const headerType: HeaderFormat = headerComp ? (headerComp.format as HeaderFormat) || 'TEXT' : 'NONE';

  const newDraft: CrmWhatsAppTemplate = {
    id: template.id || `draft_${Date.now()}`,
    meta_template_id: null,
    template_name: template.template_name!,
    language: template.language || 'en',
    category: template.category || 'MARKETING',
    status: 'DRAFT',
    header_type: headerType,
    components: template.components || [],
    variable_placeholders: placeholders,
    description: template.description || null,
    rejection_reason: null,
    quality_score: 'UNKNOWN',
    last_synced_at: new Date().toISOString(),
    created_at: template.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Try saving to DB if migration is active
  try {
    const { data, error } = await crmSupabase
      .from('crm_whatsapp_templates')
      .upsert(
        {
          template_name: newDraft.template_name,
          language: newDraft.language,
          category: newDraft.category,
          status: 'DRAFT',
          header_type: newDraft.header_type,
          components: newDraft.components,
          variable_placeholders: newDraft.variable_placeholders,
          description: newDraft.description,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'template_name,language' }
      )
      .select()
      .maybeSingle();

    if (!error && data) {
      newDraft.id = data.id;
    }
  } catch {
    // If DB has strict constraints before migration, save in local storage
  }

  // Always update local storage drafts
  const existing = getLocalDrafts();
  const idx = existing.findIndex((d) => d.template_name === newDraft.template_name && d.language === newDraft.language);
  if (idx >= 0) {
    existing[idx] = newDraft;
  } else {
    existing.unshift(newDraft);
  }
  saveLocalDrafts(existing);

  return { success: true, template: newDraft };
}

/**
 * Submits a validated template to Meta WhatsApp Business API.
 */
export async function submitTemplateToMeta(
  template: CrmWhatsAppTemplate
): Promise<{ success: boolean; metaTemplateId?: string; status?: string; error?: string }> {
  const validation = validateTemplate(template);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join('; ') };
  }

  try {
    const { data: sessionData } = await crmSupabase.auth.getSession();
    const token = sessionData.session?.access_token;

    // Call Edge Function
    const funcUrl = `${import.meta.env.VITE_CRM_SUPABASE_URL || 'https://lpbdwmpglwdedqdiovqu.supabase.co'}/functions/v1/manage-whatsapp-templates`;
    const res = await fetch(funcUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'submit_to_meta',
        template: {
          name: template.template_name,
          category: template.category,
          language: template.language,
          components: template.components,
        },
        description: template.description,
      }),
    });

    const resData = await res.json();
    if (!res.ok || !resData.success) {
      let formattedError = resData.error || 'Failed to submit template to Meta';
      if (resData.metaError) {
        const parts: string[] = [];
        if (resData.metaError.error_user_title) parts.push(resData.metaError.error_user_title);
        if (resData.metaError.message) parts.push(resData.metaError.message);
        if (resData.metaError.error_user_msg) parts.push(`(${resData.metaError.error_user_msg})`);
        if (resData.metaError.details) parts.push(`Details: ${resData.metaError.details}`);
        if (resData.metaError.code) {
          parts.push(`[Meta Code: ${resData.metaError.code}${resData.metaError.error_subcode ? `, Subcode: ${resData.metaError.error_subcode}` : ''}]`);
        }
        if (parts.length > 0) formattedError = parts.join(' - ');
      }
      return { success: false, error: formattedError };
    }

    return {
      success: true,
      metaTemplateId: resData.metaTemplateId,
      status: resData.status,
    };
  } catch (err: any) {
    console.error('[templateManagementService] Submission exception:', err);
    return {
      success: false,
      error: `Network / backend error: ${err.message}`,
    };
  }
}

/**
 * Triggers full synchronization of templates from Meta.
 */
export async function syncTemplatesWithMeta(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const { data: sessionData } = await crmSupabase.auth.getSession();
    const token = sessionData.session?.access_token;

    const funcUrl = `${import.meta.env.VITE_CRM_SUPABASE_URL || 'https://lpbdwmpglwdedqdiovqu.supabase.co'}/functions/v1/manage-whatsapp-templates`;
    const res = await fetch(funcUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'sync_with_meta' }),
    });

    const resData = await res.json();
    if (!res.ok) {
      return { success: false, count: 0, error: resData.error || 'Sync request failed' };
    }

    return { success: true, count: resData.count || 0 };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message };
  }
}
