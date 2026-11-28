/**
 * Multi-Tier Real Estate Duplicate Detection Engine
 * File: src/lib/duplicateDetector.ts
 * 
 * Evaluates candidate project data against existing project repositories to prevent:
 * 1. Duplicate RERA registrations.
 * 2. URL slug collisions.
 * 3. Transliterated / alternative spelling project duplications.
 * 4. Micro-market / location duplicate submissions.
 */

import { slugify } from "./seoSlug";

export interface CandidateProject {
  rera_registration_number?: string | null;
  name: string;
  builder?: string | null;
  location?: string | null;
  slug?: string | null;
}

export interface ExistingProjectRecord {
  id: string;
  slug: string;
  name: string;
  builder?: string | null;
  location?: string | null;
  rera_registration_number?: string | null;
  description?: string | null;
  usp?: string | null;
  faqs?: any;
  publish_status?: string | null;
}

export type DuplicateMatchLevel =
  | "EXACT_RERA_NUMBER"
  | "EXACT_SLUG"
  | "NAME_AND_BUILDER"
  | "NAME_AND_LOCATION"
  | "FUZZY_NAME_AND_LOCATION"
  | "NONE";

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  isWarning: boolean;
  matchLevel: DuplicateMatchLevel;
  reason: string;
  matchedRecord: ExistingProjectRecord | null;
  suggestedAction: "REJECT" | "UPDATE_EXISTING" | "MANUAL_REVIEW" | "PROCEED";
}

/**
 * Normalizes a RERA registration number for canonical comparison.
 * Extracts standard TG RERA pattern (e.g., P02200009350).
 */
export function normalizeRera(val?: string | null): string | null {
  if (!val) return null;
  const cleaned = val.toUpperCase().trim().replace(/[^A-Z0-9]/g, "");
  const match = cleaned.match(/P0[0-9]{9,10}/);
  return match ? match[0] : (cleaned.length >= 8 ? cleaned : null);
}

/**
 * Normalizes project names by stripping generic stop words and punctuation.
 */
export function normalizeProjectName(val?: string | null): string {
  if (!val) return "";
  return val
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(apartments|apartment|flats|flat|villas|villa|towers|tower|residency|heights|gated|community|luxury|project|projects|hyderabad|kompally|kokapet|gachibowli|miyapur|tellapur|kondapur|narsingi|bowrampet|bachupally)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalizes developer / promoter names.
 */
export function normalizeBuilder(val?: string | null): string {
  if (!val) return "";
  return val
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/\b(private|limited|pvt|ltd|constructions|infra|developers|builders|group|properties|hyderwise)\b/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Token set overlap similarity between two strings (0.0 to 1.0).
 */
export function calculateTokenSimilarity(s1: string, s2: string): number {
  const set1 = new Set(s1.split(" ").filter(w => w.length > 2));
  const set2 = new Set(s2.split(" ").filter(w => w.length > 2));
  if (set1.size === 0 || set2.size === 0) return 0;
  
  let intersection = 0;
  for (const token of set1) {
    if (set2.has(token)) intersection++;
  }
  return (2 * intersection) / (set1.size + set2.size);
}

/**
 * Extracts any embedded TG RERA registration number from project text columns.
 */
export function extractEmbeddedRera(record: ExistingProjectRecord): string | null {
  if (record.rera_registration_number) {
    const norm = normalizeRera(record.rera_registration_number);
    if (norm) return norm;
  }
  const texts = [
    record.description || "",
    record.usp || "",
    typeof record.faqs === "string" ? record.faqs : JSON.stringify(record.faqs || "")
  ].join(" ");
  
  const match = texts.match(/P0[0-9]{9,10}/);
  return match ? match[0] : null;
}

/**
 * Performs comprehensive multi-tier duplicate evaluation.
 */
export function evaluateCandidateDuplicate(
  candidate: CandidateProject,
  existingRecords: ExistingProjectRecord[]
): DuplicateCheckResult {
  const candRera = normalizeRera(candidate.rera_registration_number);
  const candSlug = candidate.slug ? slugify(candidate.slug) : slugify(candidate.name);
  const candNormName = normalizeProjectName(candidate.name);
  const candNormBuilder = normalizeBuilder(candidate.builder);
  const candNormLoc = candidate.location ? slugify(candidate.location) : "";

  for (const record of existingRecords) {
    // 1. Level 1: Exact RERA Registration Number Match
    const existingRera = extractEmbeddedRera(record);
    if (candRera && existingRera && candRera === existingRera) {
      return {
        isDuplicate: true,
        isWarning: false,
        matchLevel: "EXACT_RERA_NUMBER",
        reason: `Exact TG RERA registration number collision: '${candRera}' already registered to '${record.name}' (${record.slug}).`,
        matchedRecord: record,
        suggestedAction: "UPDATE_EXISTING",
      };
    }

    // 2. Level 2: Exact Slug Match
    const recordSlug = slugify(record.slug);
    if (candSlug && recordSlug && candSlug === recordSlug) {
      return {
        isDuplicate: true,
        isWarning: false,
        matchLevel: "EXACT_SLUG",
        reason: `Slug collision: '${candSlug}' already exists for project '${record.name}'.`,
        matchedRecord: record,
        suggestedAction: "REJECT",
      };
    }

    // 3. Level 3: Normalized Name + Builder Match
    const recNormName = normalizeProjectName(record.name);
    const recNormBuilder = normalizeBuilder(record.builder);
    if (candNormName.length >= 3 && recNormName.length >= 3) {
      if (candNormName === recNormName && candNormBuilder && recNormBuilder && (candNormBuilder === recNormBuilder || recNormBuilder.includes(candNormBuilder) || candNormBuilder.includes(recNormBuilder))) {
        return {
          isDuplicate: true,
          isWarning: false,
          matchLevel: "NAME_AND_BUILDER",
          reason: `Project name and developer match: '${candidate.name}' by '${candidate.builder}' matches existing '${record.name}' by '${record.builder}'.`,
          matchedRecord: record,
          suggestedAction: "UPDATE_EXISTING",
        };
      }
    }

    // 4. Level 4: Normalized Name + Location Match
    const recNormLoc = record.location ? slugify(record.location) : "";
    if (candNormName.length >= 3 && recNormName.length >= 3) {
      if (candNormName === recNormName && candNormLoc && recNormLoc && candNormLoc === recNormLoc) {
        return {
          isDuplicate: true,
          isWarning: false,
          matchLevel: "NAME_AND_LOCATION",
          reason: `Project name and micro-market match: '${candidate.name}' in '${candidate.location}' matches existing '${record.name}' in '${record.location}'.`,
          matchedRecord: record,
          suggestedAction: "MANUAL_REVIEW",
        };
      }
    }

    // 5. Level 5: Fuzzy Name Similarity + Location Match
    if (candNormName && recNormName && candNormLoc && recNormLoc && candNormLoc === recNormLoc) {
      const sim = calculateTokenSimilarity(candNormName, recNormName);
      if (sim >= 0.75) {
        return {
          isDuplicate: false,
          isWarning: true,
          matchLevel: "FUZZY_NAME_AND_LOCATION",
          reason: `High similarity (${Math.round(sim * 100)}%) detected in same location '${record.location}': '${candidate.name}' vs '${record.name}'.`,
          matchedRecord: record,
          suggestedAction: "MANUAL_REVIEW",
        };
      }
    }
  }

  // No collisions
  return {
    isDuplicate: false,
    isWarning: false,
    matchLevel: "NONE",
    reason: "No duplicate records detected across RERA number, slug, developer, or location.",
    matchedRecord: null,
    suggestedAction: "PROCEED",
  };
}
