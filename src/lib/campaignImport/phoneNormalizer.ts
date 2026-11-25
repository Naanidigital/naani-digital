// ==============================================================================
// Phone Number Normalizer & E.164 Validator
// Specialized for India (91) with full international E.164 support
// ==============================================================================

export interface PhoneValidationResult {
  isValid: boolean;
  raw: string;
  normalized: string; // E.164 digits without '+' (e.g. '919876543210')
  formatted: string;  // Visual display (e.g. '+91 98765 43210')
  countryCode: string;
  error?: string;
}

// Common dummy numbers to block
const DUMMY_NUMBERS = new Set([
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999',
  '1234567890',
  '0123456789',
  '9876543210',
]);

/**
 * Normalizes and validates any raw phone number string to E.164 standard.
 * Defaults to India (+91) for 10-digit mobile numbers.
 */
export function normalizePhoneNumber(rawInput: any, defaultCountry: string = '91'): PhoneValidationResult {
  if (rawInput === null || rawInput === undefined) {
    return {
      isValid: false,
      raw: '',
      normalized: '',
      formatted: '',
      countryCode: defaultCountry,
      error: 'Empty or missing phone number',
    };
  }

  const rawStr = String(rawInput).trim();
  if (!rawStr) {
    return {
      isValid: false,
      raw: '',
      normalized: '',
      formatted: '',
      countryCode: defaultCountry,
      error: 'Empty phone number',
    };
  }

  const hasLeadingPlus = rawStr.startsWith('+');
  // Strip all non-numeric characters except leading plus check
  const digitsOnly = rawStr.replace(/\D/g, '');

  if (digitsOnly.length === 0) {
    return {
      isValid: false,
      raw: rawStr,
      normalized: '',
      formatted: '',
      countryCode: defaultCountry,
      error: 'Contains no numeric digits',
    };
  }

  // 1. Check for obvious dummy patterns
  const last10 = digitsOnly.slice(-10);
  if (last10.length === 10 && DUMMY_NUMBERS.has(last10)) {
    return {
      isValid: false,
      raw: rawStr,
      normalized: '',
      formatted: '',
      countryCode: defaultCountry,
      error: 'Known test or placeholder dummy number',
    };
  }

  let normalized = '';
  let countryCode = defaultCountry;

  // 2. India (+91) Parsing Logic
  if (defaultCountry === '91') {
    // Case A: 10 digits starting with 6, 7, 8, or 9
    if (digitsOnly.length === 10) {
      const firstDigit = digitsOnly[0];
      if (['6', '7', '8', '9'].includes(firstDigit)) {
        normalized = `91${digitsOnly}`;
        countryCode = '91';
      } else {
        return {
          isValid: false,
          raw: rawStr,
          normalized: '',
          formatted: '',
          countryCode: '91',
          error: `Invalid Indian mobile prefix '${firstDigit}'. Mobile numbers must start with 6, 7, 8, or 9.`,
        };
      }
    }
    // Case B: 11 digits starting with 0 followed by 6-9
    else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
      const trimmed = digitsOnly.slice(1);
      const firstDigit = trimmed[0];
      if (['6', '7', '8', '9'].includes(firstDigit)) {
        normalized = `91${trimmed}`;
        countryCode = '91';
      } else {
        return {
          isValid: false,
          raw: rawStr,
          normalized: '',
          formatted: '',
          countryCode: '91',
          error: `Invalid mobile number '${digitsOnly}' after stripping leading zero.`,
        };
      }
    }
    // Case C: 12 digits starting with 91 followed by 6-9
    else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
      const nationalPart = digitsOnly.slice(2);
      const firstDigit = nationalPart[0];
      if (['6', '7', '8', '9'].includes(firstDigit)) {
        normalized = digitsOnly;
        countryCode = '91';
      } else {
        return {
          isValid: false,
          raw: rawStr,
          normalized: '',
          formatted: '',
          countryCode: '91',
          error: `Invalid Indian mobile number '${digitsOnly}'. National number must start with 6, 7, 8, or 9.`,
        };
      }
    }
    // Case D: International number with explicit '+' or non-Indian prefix
    else if (hasLeadingPlus && digitsOnly.length >= 10 && digitsOnly.length <= 15) {
      normalized = digitsOnly;
      countryCode = digitsOnly.slice(0, digitsOnly.length - 10);
    }
    // Case E: Too short or too long
    else {
      if (digitsOnly.length < 10) {
        return {
          isValid: false,
          raw: rawStr,
          normalized: '',
          formatted: '',
          countryCode: defaultCountry,
          error: `Too short (${digitsOnly.length} digits). Minimum 10 digits required.`,
        };
      }
      if (digitsOnly.length > 15) {
        return {
          isValid: false,
          raw: rawStr,
          normalized: '',
          formatted: '',
          countryCode: defaultCountry,
          error: `Too long (${digitsOnly.length} digits). ITU E.164 maximum is 15 digits.`,
        };
      }
      // If 10-15 digits without '+'
      normalized = digitsOnly;
    }
  } else {
    // Non-Indian default country
    if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
      normalized = digitsOnly;
    } else {
      return {
        isValid: false,
        raw: rawStr,
        normalized: '',
        formatted: '',
        countryCode: defaultCountry,
        error: `Invalid length (${digitsOnly.length} digits). Expected 10 to 15 digits.`,
      };
    }
  }

  // Format visual string: e.g. "+91 98765 43210"
  let formatted = `+${normalized}`;
  if (normalized.startsWith('91') && normalized.length === 12) {
    const nat = normalized.slice(2);
    formatted = `+91 ${nat.slice(0, 5)} ${nat.slice(5)}`;
  }

  return {
    isValid: true,
    raw: rawStr,
    normalized,
    formatted,
    countryCode,
  };
}

/**
 * Heuristic detector to determine if an unknown string looks like a phone number.
 */
export function looksLikePhoneNumber(val: any): boolean {
  if (!val) return false;
  const str = String(val).trim();
  const digits = str.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}
