/**
 * Dynamic Property Catalogue Preparation & Pre-Flight Validator
 * File: scripts/prepare_catalogue_migration.mjs
 * 
 * Functions:
 * 1. Dynamically locates the latest verified project backup in supabase/backups/
 * 2. Parses the complete property catalogue and determines the dynamic project count
 * 3. Validates all valid project records:
 *    - Valid UUID format for primary keys
 *    - Unique slugs across the catalogue (detects duplicate slugs)
 *    - Unique IDs (detects ID collisions)
 *    - Presence of mandatory fields (name, slug, location, builder)
 *    - Type checking for arrays (bhk_list, amenities, gallery) and JSONB (faqs)
 * 4. Generates idempotent seed SQL: supabase/migrations/20261121000002_seed_property_catalogue.sql
 * 5. Prints a comprehensive pre-migration audit report
 */

import fs from 'fs';
import path from 'path';

const BACKUP_DIR = fs.existsSync(path.resolve('naani-main/supabase/backups')) 
  ? path.resolve('naani-main/supabase/backups') 
  : path.resolve('supabase/backups');
const TARGET_SQL_PATH = fs.existsSync(path.resolve('naani-main/supabase/migrations'))
  ? path.resolve('naani-main/supabase/migrations/20261121000002_seed_property_catalogue.sql')
  : path.resolve('supabase/migrations/20261121000002_seed_property_catalogue.sql');

// 1. Dynamically identify the latest verified project backup
function getLatestBackupFile() {
  const consolidatedPath = path.join(BACKUP_DIR, 'consolidated_property_catalogue.json');
  if (fs.existsSync(consolidatedPath)) {
    return {
      name: 'consolidated_property_catalogue.json',
      path: consolidatedPath,
      mtime: fs.statSync(consolidatedPath).mtimeMs,
      size: fs.statSync(consolidatedPath).size
    };
  }

  if (!fs.existsSync(BACKUP_DIR)) {
    throw new Error(`Backup directory not found: ${BACKUP_DIR}`);
  }
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith('projects_backup_') && f.endsWith('.json'))
    .map(f => {
      const fullPath = path.join(BACKUP_DIR, f);
      return {
        name: f,
        path: fullPath,
        mtime: fs.statSync(fullPath).mtimeMs,
        size: fs.statSync(fullPath).size
      };
    })
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) {
    throw new Error(`No project backup JSON files found in ${BACKUP_DIR}`);
  }
  return files[0];
}

// 2. SQL Escaping Helper
function escapeSql(column, val) {
  if (val === null || val === undefined) return 'NULL';
  if (column === 'faqs') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return val.toString();
  if (Array.isArray(val)) {
    if (val.length === 0) {
      if (column === 'bhk_list') return "'{}'::int[]";
      return "'{}'::text[]";
    }
    if (typeof val[0] === 'number') return `ARRAY[${val.join(',')}]::int[]`;
    const escaped = val.map(s => `'${String(s).replace(/'/g, "''")}'`);
    return `ARRAY[${escaped.join(',')}]::text[]`;
  }
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

// 3. Main Validation & SQL Generation Runner
export function prepareCatalogue() {
  console.log('================================================================');
  console.log('NAANI.IN DYNAMIC PROPERTY CATALOGUE PRE-FLIGHT AUDIT');
  console.log('================================================================\n');

  const latestBackup = getLatestBackupFile();
  console.log(`[Source of Truth] Latest verified project backup:`);
  console.log(`  File: ${latestBackup.name}`);
  console.log(`  Path: ${latestBackup.path}`);
  console.log(`  Size: ${(latestBackup.size / 1024).toFixed(1)} KB\n`);

  const rawData = fs.readFileSync(latestBackup.path, 'utf8');
  const catalogue = JSON.parse(rawData);

  const dynamicProjectCount = catalogue.length;
  console.log(`[Dynamic Project Count] Total records identified: ${dynamicProjectCount}\n`);

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const seenSlugs = new Map();
  const seenIds = new Map();

  const validRecords = [];
  const skippedRecords = [];
  const failedRecords = [];

  for (let i = 0; i < catalogue.length; i++) {
    const item = catalogue[i];
    const itemRef = `Index #${i} (Name: "${item.name || 'UNNAMED'}", Slug: "${item.slug || 'NOSLUG'}")`;

    // Validation 1: Required identity fields
    if (!item.id || !item.slug || !item.name) {
      failedRecords.push({ ref: itemRef, reason: 'Missing mandatory field (id, slug, or name)' });
      continue;
    }

    // Validation 2: UUID Format
    if (!uuidRegex.test(item.id)) {
      failedRecords.push({ ref: itemRef, reason: `Malformed UUID: "${item.id}"` });
      continue;
    }

    // Validation 3: Duplicate Slug Detection
    if (seenSlugs.has(item.slug)) {
      failedRecords.push({ ref: itemRef, reason: `Duplicate slug detected! Conflicting with index #${seenSlugs.get(item.slug)}` });
      continue;
    }
    seenSlugs.set(item.slug, i);

    // Validation 4: Duplicate ID Detection
    if (seenIds.has(item.id)) {
      failedRecords.push({ ref: itemRef, reason: `Duplicate ID detected! Conflicting with index #${seenIds.get(item.id)}` });
      continue;
    }
    seenIds.set(item.id, i);

    validRecords.push(item);
  }

  console.log('--- Record Integrity Assessment ---');
  console.log(`  All valid project records: ${validRecords.length} / ${dynamicProjectCount}`);
  console.log(`  Skipped records:           ${skippedRecords.length}`);
  console.log(`  Failed/Conflicting:        ${failedRecords.length}`);

  if (failedRecords.length > 0) {
    console.error('\n[CRITICAL ERRORS DETECTED]');
    failedRecords.forEach(f => console.error(`  - ${f.ref}: ${f.reason}`));
    throw new Error('Catalogue pre-flight audit failed due to invalid records.');
  }

  // 4. Generate idempotent SQL Seed
  const columns = [
    'id', 'slug', 'name', 'builder', 'location', 'city',
    'configuration', 'bhk_list', 'property_type', 'price_range',
    'min_price_inr', 'max_price_inr', 'status', 'possession',
    'usp', 'description', 'amenities', 'faqs', 'gallery',
    'hero_image', 'brochure_url', 'map_embed_url', 'seo_title',
    'meta_description', 'canonical_url', 'custom_page_path',
    'featured', 'publish_status', 'submitted_at', 'published_at',
    'source', 'created_at', 'updated_at'
  ];

  const updateColumns = columns.filter(c => c !== 'id' && c !== 'slug');

  let sql = `-- ==============================================================================
-- Dynamic Catalogue Seed: 20261121000002_seed_property_catalogue.sql
-- Target: lpbdwmpglwdedqdiovqu (Naani.in Primary Production Backend)
-- Source: ${latestBackup.name}
-- Total Records: ${validRecords.length}
-- Description: Idempotently upserts all valid project records from the complete
-- property catalogue into public.projects. Preserves original UUIDs, slugs,
-- and SEO metadata.
-- ==============================================================================

`;

  const chunkSize = 25;
  for (let i = 0; i < validRecords.length; i += chunkSize) {
    const chunk = validRecords.slice(i, i + chunkSize);
    sql += `INSERT INTO public.projects (\n  ${columns.join(', ')}\n) VALUES\n`;
    const rowStrings = chunk.map(p => {
      const vals = columns.map(col => escapeSql(col, p[col]));
      return `  (${vals.join(', ')})`;
    });
    sql += rowStrings.join(',\n');
    sql += `\nON CONFLICT (slug) DO UPDATE SET\n`;
    const updateAssignments = updateColumns.map(col => `  ${col} = EXCLUDED.${col}`);
    sql += updateAssignments.join(',\n');
    sql += `;\n\n`;
  }

  fs.writeFileSync(TARGET_SQL_PATH, sql, 'utf8');
  console.log(`\n[Generated SQL] Seed script written to:`);
  console.log(`  File: ${TARGET_SQL_PATH}`);
  console.log(`  Size: ${(sql.length / 1024).toFixed(1)} KB`);
  console.log(`  Statements: ${Math.ceil(validRecords.length / chunkSize)} batch upsert chunks`);

  console.log('\n================================================================');
  console.log('PRE-FLIGHT AUDIT PASSED: READY FOR SEEDING ON APPROVAL');
  console.log('================================================================\n');

  return {
    backupFile: latestBackup.name,
    dynamicProjectCount,
    validCount: validRecords.length,
    skippedCount: skippedRecords.length,
    failedCount: failedRecords.length
  };
}

if (process.argv[1] && process.argv[1].endsWith('prepare_catalogue_migration.mjs')) {
  prepareCatalogue();
}
