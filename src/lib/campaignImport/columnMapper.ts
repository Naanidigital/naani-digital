// ==============================================================================
// Column Mapper & Auto-Detection Engine
// Heuristic mapping of user spreadsheet headers to standard CRM campaign fields
// ==============================================================================

import { ColumnMapping, StandardField, RawParsedRow } from './types';
import { looksLikePhoneNumber } from './phoneNormalizer';

interface FieldPattern {
  field: StandardField;
  headerRegex: RegExp;
  valueValidator?: (val: string) => boolean;
}

const FIELD_PATTERNS: FieldPattern[] = [
  {
    field: 'phone',
    headerRegex: /(phone|mobile|cell|whatsapp|contact[_\s]?no|contact[_\s]?number|phone[_\s]?number|mobile[_\s]?number|tel|wa|ph)/i,
    valueValidator: looksLikePhoneNumber,
  },
  {
    field: 'name',
    headerRegex: /(name|full[_\s]?name|customer[_\s]?name|client[_\s]?name|lead[_\s]?name|contact[_\s]?name|first[_\s]?name)/i,
  },
  {
    field: 'email',
    headerRegex: /(email|e[_\s-]?mail|email[_\s]?address)/i,
    valueValidator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  },
  {
    field: 'location',
    headerRegex: /(location|city|area|locality|address|preferred[_\s]?location|suburb)/i,
  },
  {
    field: 'budget',
    headerRegex: /(budget|price|range|max[_\s]?budget|investment|budget[_\s]?range)/i,
  },
  {
    field: 'property_interest',
    headerRegex: /(project|property|interested[_\s]?in|project[_\s]?name|property[_\s]?interest|community)/i,
  },
  {
    field: 'bhk',
    headerRegex: /(bhk|configuration|bedroom|unit[_\s]?type|bedrooms|flat[_\s]?type)/i,
  },
  {
    field: 'lead_source',
    headerRegex: /(source|lead[_\s]?source|channel|campaign[_\s]?source|origin)/i,
  },
  {
    field: 'consent_status',
    headerRegex: /(consent|opt[_\s-]?in|permission|marketing[_\s]?consent|agreed)/i,
  },
  {
    field: 'notes',
    headerRegex: /(notes|remarks|comments|details|description)/i,
  },
];

/**
 * Automatically inspects headers and sample rows to produce recommended column mappings.
 */
export function autoDetectColumnMappings(
  headers: string[],
  rows: RawParsedRow[]
): ColumnMapping[] {
  const sampleRows = rows.slice(0, 15);
  const mappings: ColumnMapping[] = [];
  const assignedFields = new Set<StandardField>();

  for (const header of headers) {
    const cleanHeader = header.trim();
    const sampleValues = sampleRows
      .map((r) => String(r.data[header] || '').trim())
      .filter(Boolean);

    let bestField: StandardField = 'ignore';
    let highestConfidence = 0;

    for (const pattern of FIELD_PATTERNS) {
      let confidence = 0;

      // 1. Exact or partial regex match on header name
      if (pattern.headerRegex.test(cleanHeader)) {
        confidence += 0.7;
      } else if (new RegExp(pattern.field.replace('_', '[_\\s]?'), 'i').test(cleanHeader)) {
        confidence += 0.4;
      }

      // 2. Value-based heuristic inspection
      if (pattern.valueValidator && sampleValues.length > 0) {
        const matchCount = sampleValues.filter(pattern.valueValidator).length;
        const matchRatio = matchCount / sampleValues.length;
        if (matchRatio >= 0.5) {
          confidence += 0.5;
        }
      }

      // Special priority: phone column is mandatory for WhatsApp
      if (pattern.field === 'phone' && sampleValues.some(looksLikePhoneNumber)) {
        confidence += 0.3;
      }

      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        bestField = pattern.field;
      }
    }

    // Do not double-assign single-purpose fields like 'phone' or 'name' unless confidence is low
    if (bestField !== 'ignore' && assignedFields.has(bestField) && bestField === 'phone') {
      if (highestConfidence < 0.8) {
        bestField = 'notes';
      }
    }

    if (bestField !== 'ignore') {
      assignedFields.add(bestField);
    }

    mappings.push({
      fileHeader: header,
      targetField: bestField,
      confidence: Math.min(1, highestConfidence),
      sampleValues: sampleValues.slice(0, 3),
    });
  }

  return mappings;
}
