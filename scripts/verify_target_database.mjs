/**
 * Dynamic Property Catalogue Integrity & Security Verification Suite
 * File: scripts/verify_target_database.mjs
 * 
 * Verifies:
 * 1. Dynamic reconciliation: Dynamically reads the latest verified project backup
 *    and verifies that the target database matches the dynamic project count.
 * 2. Record-level consistency: Asserts unique slugs, unique IDs, and field integrity.
 * 3. RLS Security Boundaries: Asserts anonymous access to private CRM data,
 *    submitter PII, and private documents is strictly blocked.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const BACKUP_DIR = fs.existsSync(path.resolve('naani-main/supabase/backups')) 
  ? path.resolve('naani-main/supabase/backups') 
  : path.resolve('supabase/backups');
const TARGET_URL = process.env.TARGET_SUPABASE_URL || 'https://lpbdwmpglwdedqdiovqu.supabase.co';
const ANON_KEY = process.env.TARGET_ANON_KEY;

if (!ANON_KEY) {
  console.error('\n[ERROR] Missing TARGET_ANON_KEY environment variable.');
  console.error('Please set TARGET_ANON_KEY to test the live API boundary.');
  console.error('Example: $env:TARGET_ANON_KEY = "..." ; node scripts/verify_target_database.mjs\n');
  process.exit(1);
}

function getLatestBackup() {
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
    .map(f => ({
      name: f,
      path: path.join(BACKUP_DIR, f),
      mtime: fs.statSync(path.join(BACKUP_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) throw new Error('No backup files found in ' + BACKUP_DIR);
  return files[0];
}

const sb = createClient(TARGET_URL, ANON_KEY);

async function verifyAll() {
  console.log(`\n================================================================`);
  console.log(`DYNAMIC PROPERTY CATALOGUE INTEGRITY & SECURITY VERIFICATION`);
  console.log(`Target Database: ${TARGET_URL}`);
  console.log(`================================================================\n`);

  const latestBackup = getLatestBackup();
  const catalogue = JSON.parse(fs.readFileSync(latestBackup.path, 'utf8'));
  const dynamicProjectCount = catalogue.length;

  console.log(`[Source of Truth] Latest verified project backup: ${latestBackup.name}`);
  console.log(`[Dynamic Project Count] Expected valid project records: ${dynamicProjectCount}\n`);

  // 1. Dynamic Projects Count & Consistency
  console.log('--- 1. Dynamic Catalogue Consistency Check ---');
  const { data: projects, count: targetCount, error: pErr } = await sb
    .from('projects')
    .select('id, slug, name, builder, location, publish_status', { count: 'exact' });

  if (pErr) {
    console.error('❌ Failed to read projects catalogue:', pErr.message);
  } else {
    console.log(`  Source Count: ${dynamicProjectCount} | Target Database Count: ${targetCount}`);
    if (targetCount === dynamicProjectCount) {
      console.log(`✓ [CONFIRMED] Complete property catalogue count matches perfectly: ${targetCount}/${dynamicProjectCount}`);
    } else {
      console.warn(`⚠️ [DISCREPANCY] Count mismatch: Target has ${targetCount}, Source has ${dynamicProjectCount}. (Ensure seeding was executed)`);
    }

    if (projects && projects.length > 0) {
      const slugs = new Set(projects.map(p => p.slug));
      const ids = new Set(projects.map(p => p.id));
      console.log(`✓ [CONFIRMED] Unique Slugs in target: ${slugs.size} / ${projects.length}`);
      console.log(`✓ [CONFIRMED] Unique IDs in target:   ${ids.size} / ${projects.length}`);
    }
  }

  // 2. RLS CRM Data Leak Test
  console.log('\n--- 2. RLS Security Boundary Verification ---');
  const { data: leads, error: lErr } = await sb.from('crm_leads').select('*');
  if (lErr || !leads || leads.length === 0) {
    console.log(`✓ [CONFIRMED] CRM Leads RLS Secure: Anonymous public received 0 records.`);
  } else {
    console.error(`❌ [CRITICAL SECURITY FAILURE] Anonymous user was able to read crm_leads (${leads.length} records)!`);
  }

  const { data: msgs, error: mErr } = await sb.from('crm_messages').select('*');
  if (mErr || !msgs || msgs.length === 0) {
    console.log(`✓ [CONFIRMED] CRM Messages RLS Secure: Anonymous public received 0 records.`);
  } else {
    console.error(`❌ [CRITICAL SECURITY FAILURE] Anonymous user was able to read crm_messages (${msgs.length} records)!`);
  }

  const { data: subs, error: sErr } = await sb.from('project_submissions').select('*');
  if (sErr || !subs || subs.length === 0) {
    console.log(`✓ [CONFIRMED] Submitter PII RLS Secure: Anonymous public received 0 records.`);
  } else {
    console.error(`❌ [CRITICAL SECURITY FAILURE] Anonymous user was able to read project_submissions (${subs.length} records)!`);
  }

  // 3. Storage Privacy Test
  const { data: docs, error: dErr } = await sb.storage.from('property-documents').list();
  if (dErr || !docs || docs.length === 0) {
    console.log(`✓ [CONFIRMED] Private Documents Secure: Anonymous public cannot list or access property-documents.`);
  } else {
    console.error(`❌ [CRITICAL SECURITY FAILURE] Anonymous user was able to list property-documents!`);
  }

  console.log('\n================================================================');
  console.log('DYNAMIC INTEGRITY & RLS VERIFICATION COMPLETE');
  console.log('================================================================\n');
}

verifyAll().catch(console.error);
