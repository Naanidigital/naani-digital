// ==============================================================================
// WhatsApp Template Service & Variable Resolver (Stage 3)
// Representative Meta Cloud API WhatsApp Templates for Naani Projects
// ==============================================================================

import {
  WhatsAppTemplate,
  TemplateComponent,
  TemplateTranslation,
  VariableMapping,
  WhatsAppTemplateCategory,
} from './types';

// Curated collection of Meta-approved and review-state templates
export const MOCK_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'tmpl_cascades_launch_01',
    name: 'cascades_launch_invitation',
    category: 'MARKETING',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-11-20T10:30:00Z',
    qualityScore: 'HIGH',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'APPROVED',
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
            text: 'Hello {{1}},\n\nYou are cordially invited to the exclusive preview of {{2}} located in {{3}}. Experience ultra-luxury high-rise residences with panoramic sky decks and 60,000 sq.ft. clubhouse.\n\nReply to this message or tap below to reserve your priority site visit.',
            example: {
              body_text: [['Srikanth Rao', 'The Cascades', 'Neopolis, Kokapet']],
            },
          },
          {
            type: 'FOOTER',
            text: 'Naani Projects • TS RERA Approved P02400007890',
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
                url: 'https://naani.in/the-cascades-neopolis',
              },
            ],
          },
        ],
      },
      {
        code: 'te',
        languageName: 'Telugu (తెలుగు)',
        status: 'APPROVED',
        components: [
          {
            type: 'HEADER',
            format: 'IMAGE',
          },
          {
            type: 'BODY',
            text: 'నమస్కారం {{1}},\n\n{{3}} లో ప్రతిష్టాత్మకంగా నిర్మిస్తున్న {{2}} ప్రాజెక్ట్ ప్రత్యేక వీక్షణకు మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము. అత్యాధునిక స్కై డెక్స్ మరియు 60,000 చ.అ. క్లబ్‌హౌస్ అనుభూతిని పొందండి.\n\nమీ సైట్ విజిట్ కోసం క్రింది బటన్ నొక్కండి.',
            example: {
              body_text: [['శ్రీకాంత్ గారు', 'ది క్యాస్కేడ్స్', 'నియోపోలిస్, కోకాపేట్']],
            },
          },
          {
            type: 'FOOTER',
            text: 'నాని ప్రాజెక్ట్స్ • తెలంగాణ రెరా ఆమోదితం',
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'QUICK_REPLY',
                text: 'సైట్ విజిట్ బుక్ చేయండి',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tmpl_price_drop_alert_02',
    name: 'property_price_drop_alert',
    category: 'MARKETING',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-11-18T14:15:00Z',
    qualityScore: 'HIGH',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'APPROVED',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'Exclusive Price Advantage: {{1}}',
            example: {
              header_text: ['Limited 3 BHK Release'],
            },
          },
          {
            type: 'BODY',
            text: 'Dear {{1}},\n\nSpecial festive pricing has just been announced for {{2}} in {{3}}. Premium units starting at ₹{{4}} for pre-registered buyers only.\n\nSlots are limited. Contact our relationship team today.',
            example: {
              body_text: [['Ananya Sharma', 'Rise with 9', 'Financial District', '2.85 Cr']],
            },
          },
          {
            type: 'FOOTER',
            text: 'Naani Projects Investment Advisory',
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'URL',
                text: 'Claim Offer',
                url: 'https://naani.in/contact',
              },
            ],
          },
        ],
      },
      {
        code: 'hi',
        languageName: 'Hindi (हिन्दी)',
        status: 'APPROVED',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'विशेष मूल्य लाभ: {{1}}',
          },
          {
            type: 'BODY',
            text: 'नमस्ते {{1}},\n\n{{3}} स्थित {{2}} के लिए सीमित समय का विशेष ऑफर घोषित किया गया है। कीमतें ₹{{4}} से शुरू।\n\nआज ही अपने सलाहकार से संपर्क करें।',
          },
          {
            type: 'FOOTER',
            text: 'नानी प्रोजेक्ट्स एडवाइजरी',
          },
        ],
      },
    ],
  },
  {
    id: 'tmpl_open_house_weekend_03',
    name: 'weekend_open_house_invite',
    category: 'MARKETING',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-11-15T09:00:00Z',
    qualityScore: 'MEDIUM',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'APPROVED',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'Weekend Open House Invitation',
          },
          {
            type: 'BODY',
            text: 'Hello {{1}},\n\nJoin us this Saturday & Sunday for the Model Apartment walkthrough of {{2}} at {{3}}.\n\nMeet the master architects, review floor layouts, and enjoy complimentary refreshments.',
            example: {
              body_text: [['Vikram Reddy', 'Pavani Mirai', 'Tellapur']],
            },
          },
          {
            type: 'FOOTER',
            text: 'RSVP Required for entry pass',
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'PHONE_NUMBER',
                text: 'Call Concierge',
                phoneNumber: '+919493943946',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tmpl_luxury_market_report_04',
    name: 'quarterly_luxury_market_report',
    category: 'MARKETING',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-11-10T12:00:00Z',
    qualityScore: 'HIGH',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'APPROVED',
        components: [
          {
            type: 'HEADER',
            format: 'DOCUMENT',
          },
          {
            type: 'BODY',
            text: 'Hi {{1}},\n\nHere is your Q4 2026 West Hyderabad Real Estate Market Intelligence Report, covering Neopolis, Kokapet, and Gachibowli capital appreciation trends.',
            example: {
              body_text: [['Investor']],
            },
          },
          {
            type: 'FOOTER',
            text: 'Naani Projects Research Desk',
          },
        ],
      },
    ],
  },
  {
    id: 'tmpl_site_visit_reminder_05',
    name: 'site_visit_appointment_reminder',
    category: 'UTILITY',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-11-05T16:20:00Z',
    qualityScore: 'HIGH',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'APPROVED',
        components: [
          {
            type: 'BODY',
            text: 'Reminder: Hello {{1}}, your site visit for {{2}} is confirmed for {{3}} at {{4}}.\n\nOur project manager will meet you at the site experience center.',
            example: {
              body_text: [['Rajesh', 'The Cascades', 'Tomorrow', '11:00 AM']],
            },
          },
          {
            type: 'FOOTER',
            text: 'Naani Projects Client Services',
          },
        ],
      },
    ],
  },
  {
    id: 'tmpl_crm_auth_otp_06',
    name: 'crm_staff_otp_verification',
    category: 'AUTHENTICATION',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-10-30T08:00:00Z',
    qualityScore: 'HIGH',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'APPROVED',
        components: [
          {
            type: 'BODY',
            text: '{{1}} is your Naani CRM staff verification code. Valid for 10 minutes. Do not share this code with anyone.',
            example: {
              body_text: [['849201']],
            },
          },
          {
            type: 'BUTTONS',
            buttons: [
              {
                type: 'QUICK_REPLY',
                text: 'Copy Code',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tmpl_festival_villas_07',
    name: 'festival_exclusive_villas_2026',
    category: 'MARKETING',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-11-22T11:00:00Z',
    qualityScore: 'UNKNOWN',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'PENDING',
        components: [
          {
            type: 'BODY',
            text: 'Dear {{1}}, get ready for our upcoming luxury villa enclave in Mokila. Register now for early-bird discounts.',
          },
        ],
      },
    ],
  },
  {
    id: 'tmpl_unapproved_blast_08',
    name: 'unapproved_promotional_blast',
    category: 'MARKETING',
    defaultLanguage: 'en_US',
    lastUpdated: '2026-11-01T15:00:00Z',
    qualityScore: 'LOW',
    translations: [
      {
        code: 'en_US',
        languageName: 'English (US)',
        status: 'REJECTED',
        components: [
          {
            type: 'BODY',
            text: 'CHEAP FLATS AVAILABLE NOW! Call immediately for unbelievable cash discounts.',
          },
        ],
      },
    ],
  },
];

/**
 * Returns all templates
 */
export function getAllWhatsAppTemplates(): WhatsAppTemplate[] {
  return MOCK_WHATSAPP_TEMPLATES;
}

/**
 * Returns only APPROVED templates suitable for campaigns
 */
export function getApprovedTemplates(category?: WhatsAppTemplateCategory): WhatsAppTemplate[] {
  return MOCK_WHATSAPP_TEMPLATES.filter((tmpl) => {
    // Must match category if specified
    if (category && tmpl.category !== category) return false;
    // Must have at least one APPROVED translation
    return tmpl.translations.some((t) => t.status === 'APPROVED');
  });
}

/**
 * Finds a template by its ID
 */
export function getTemplateById(id: string): WhatsAppTemplate | undefined {
  return MOCK_WHATSAPP_TEMPLATES.find((t) => t.id === id);
}

/**
 * Extracts placeholder tokens (e.g. {{1}}, {{2}}) from text in order
 */
export function extractPlaceholders(text?: string): string[] {
  if (!text) return [];
  const regex = /\{\{(\d+)\}\}/g;
  const matches = new Set<string>();
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.add(match[0]);
  }
  return Array.from(matches).sort((a, b) => {
    const numA = parseInt(a.replace(/[{}]/g, ''), 10);
    const numB = parseInt(b.replace(/[{}]/g, ''), 10);
    return numA - numB;
  });
}

/**
 * Finds all placeholders across all components (HEADER, BODY) of a translation
 */
export function getTemplatePlaceholders(components: TemplateComponent[]): Array<{
  placeholder: string;
  componentType: 'HEADER' | 'BODY';
}> {
  const result: Array<{ placeholder: string; componentType: 'HEADER' | 'BODY' }> = [];

  const header = components.find((c) => c.type === 'HEADER' && c.format === 'TEXT');
  if (header?.text) {
    extractPlaceholders(header.text).forEach((p) => {
      result.push({ placeholder: p, componentType: 'HEADER' });
    });
  }

  const body = components.find((c) => c.type === 'BODY');
  if (body?.text) {
    extractPlaceholders(body.text).forEach((p) => {
      result.push({ placeholder: p, componentType: 'BODY' });
    });
  }

  return result;
}

/**
 * Resolves a single placeholder value given recipient data, variable mappings, and fallbacks
 */
export function resolvePlaceholderValue(
  placeholder: string,
  componentType: 'HEADER' | 'BODY',
  mappings: VariableMapping[],
  recipient: Record<string, any>
): string {
  const mapping = mappings.find(
    (m) => m.placeholder === placeholder && m.componentType === componentType
  );

  if (!mapping) {
    return `[${placeholder}]`;
  }

  if (mapping.sourceType === 'static') {
    return mapping.staticValue || mapping.fallbackValue || `[${placeholder}]`;
  }

  // Field mapping
  if (mapping.sourceField && recipient) {
    const val = recipient[mapping.sourceField];
    if (val !== undefined && val !== null && String(val).trim() !== '') {
      return String(val).trim();
    }
  }

  // Fallback
  return mapping.fallbackValue || `[${placeholder}]`;
}

/**
 * Interpolates text replacing all {{1}}, {{2}} tokens with resolved recipient data
 */
export function interpolateComponentText(
  text: string,
  componentType: 'HEADER' | 'BODY',
  mappings: VariableMapping[],
  recipient: Record<string, any>
): string {
  if (!text) return '';
  return text.replace(/\{\{(\d+)\}\}/g, (match) => {
    return resolvePlaceholderValue(match, componentType, mappings, recipient);
  });
}

/**
 * Validates whether all placeholders in a template have mapped values with non-empty fallbacks
 */
export function validateVariableMappings(
  components: TemplateComponent[],
  mappings: VariableMapping[]
): { isValid: boolean; missingMappings: string[]; missingFallbacks: string[] } {
  const placeholders = getTemplatePlaceholders(components);
  const missingMappings: string[] = [];
  const missingFallbacks: string[] = [];

  for (const item of placeholders) {
    const found = mappings.find(
      (m) => m.placeholder === item.placeholder && m.componentType === item.componentType
    );
    if (!found) {
      missingMappings.push(`${item.componentType} ${item.placeholder}`);
    } else {
      if (found.sourceType === 'static' && (!found.staticValue || !found.staticValue.trim())) {
        missingFallbacks.push(`${item.componentType} ${item.placeholder} (empty static value)`);
      } else if (found.sourceType === 'field' && (!found.fallbackValue || !found.fallbackValue.trim())) {
        missingFallbacks.push(`${item.componentType} ${item.placeholder} (requires fallback value)`);
      }
    }
  }

  return {
    isValid: missingMappings.length === 0 && missingFallbacks.length === 0,
    missingMappings,
    missingFallbacks,
  };
}
