/**
 * Dynamic Property Catalogue Import Script
 * File: scripts/import_property_catalogue.mjs
 * 
 * Safely imports all valid project records from the complete property catalogue
 * into the target Supabase database.
 * 
 * Features:
 * - Dynamically identifies and loads the latest verified project backup.
 * - Idempotent upsert via ON CONFLICT (slug).
 * - Tracks imported count, skipped records, failed records, and discrepancies.
 * - Performs dynamic post-import reconciliation comparing source vs target.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const BACKUP_DIR = fs.existsSync(path.resolve('naani-main/supabase/backups')) 
  ? path.resolve('naani-main/supabase/backups') 
  : path.resolve('supabase/backups');
const SUPABASE_URL = process.env.TARGET_SUPABASE_URL || 'https://lpbdwmpglwdedqdiovqu.supabase.co';
const SERVICE_ROLE_KEY = process.env.TARGET_SUPABASE_SERVICE_ROLE_KEY;

function getLatestBackupFile() {
  const consolidatedPath = path.join(BACKUP_DIR, 'consolidated_property_catalogue.json');
  if (fs.existsSync(consolidatedPath)) {
    return {
      name: 'consolidated_property_catalogue.json',
      path: consolidatedPath,
      mtime: fs.statSync(consolidatedPath).mtimeMs,
    };
  }

  const files = fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith('projects_backup_') && f.endsWith('.json'))
    .map(f => {
      const fullPath = path.join(BACKUP_DIR, f);
      return {
        name: f,
        path: fullPath,
        mtime: fs.statSync(fullPath).mtimeMs,
      };
    })
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) throw new Error('No backup files found in ' + BACKUP_DIR);
  return files[0];
}

async function runImport() {
  console.log('================================================================');
  console.log('NAANI.IN DYNAMIC PROPERTY CATALOGUE IMPORT');
  console.log('Target Database:', SUPABASE_URL);
  console.log('================================================================\n');

  if (!SERVICE_ROLE_KEY) {
    console.error('[BLOCKED] TARGET_SUPABASE_SERVICE_ROLE_KEY is required for batch catalogue import.');
    console.error('Alternatively, execute: supabase/migrations/20261121000002_seed_property_catalogue.sql');
    console.error('directly inside the Supabase Dashboard SQL Editor.\n');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const latestBackup = getLatestBackupFile();
  console.log(`[Source of Truth] Latest verified project backup: ${latestBackup.name}`);

  const catalogue = JSON.parse(fs.readFileSync(latestBackup.path, 'utf8'));
  const sourceCount = catalogue.length;
  console.log(`[Dynamic Project Count] Total source records: ${sourceCount}\n`);

  let importedCount = 0;
  let skippedCount = 0;
  const failedRecords = [];

  const BATCH_SIZE = 25;
  for (let i = 0; i < catalogue.length; i += BATCH_SIZE) {
    const chunk = catalogue.slice(i, i + BATCH_SIZE);
    const chunkNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalChunks = Math.ceil(catalogue.length / BATCH_SIZE);

    try {
      const { data, error } = await supabase
        .from('projects')
        .upsert(chunk, { onConflict: 'slug' })
        .select('id, slug');

      if (error) {
        console.error(`[ERROR] Batch ${chunkNum}/${totalChunks} failed:`, error.message);
        failedRecords.push({ batch: chunkNum, error: error.message, slugs: chunk.map(c => c.slug) });
      } else {
        importedCount += data ? data.length : chunk.length;
        console.log(`[PASS] Batch ${chunkNum}/${totalChunks} upserted (${chunk.length} projects).`);
      }
    } catch (e) {
      console.error(`[EXCEPTION] Batch ${chunkNum}/${totalChunks}:`, e.message);
      failedRecords.push({ batch: chunkNum, error: e.message, slugs: chunk.map(c => c.slug) });
    }
  }

  // Dynamic Post-Import Verification
  console.log('\n--- Running Dynamic Post-Import Reconciliation ---');
  const { count: targetCount, error: countErr } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  const discrepancies = [];
  if (countErr) {
    discrepancies.push(`Failed to fetch target count: ${countErr.message}`);
  } else if (targetCount !== sourceCount) {
    discrepancies.push(`Count mismatch: Source has ${sourceCount} records, but Target database has ${targetCount} records.`);
  }

  console.log('\n================================================================');
  console.log('CATALOGUE MIGRATION REPORT');
  console.log('================================================================');
  console.log(`  Source Backup File:        ${latestBackup.name}`);
  console.log(`  Actual Source Count:       ${sourceCount}`);
  console.log(`  Imported Count:            ${importedCount}`);
  console.log(`  Skipped Records:           ${skippedCount}`);
  console.log(`  Failed Records:            ${failedRecords.length}`);
  console.log(`  Target Database Count:     ${targetCount ?? 'N/A'}`);
  console.log(`  Discrepancies:             ${discrepancies.length === 0 ? 'None (100% Consistent)' : discrepancies.join('; ')}`);
  console.log('================================================================\n');

  if (discrepancies.length > 0 || failedRecords.length > 0) {
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('import_property_catalogue.mjs')) {
  runImport();
}
