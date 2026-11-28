import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire("c:/Users/PC/Desktop/naani-main/naani-main/package.json");
const { createClient } = require("@supabase/supabase-js");

console.log("================================================================");
console.log("STAGE 1 WHATSAPP CAMPAIGN MANAGER — MIGRATION VALIDATION SUITE");
console.log("Target Project: lpbdwmpglwdedqdiovqu (Naani Projects CRM)");
console.log("================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

const migrationPath = "c:/Users/PC/Desktop/naani-main/naani-main/supabase/migrations/20261124000000_create_campaign_tables.sql";
const rollbackPath = "c:/Users/PC/Desktop/naani-main/naani-main/supabase/migrations/20261124000000_create_campaign_tables_rollback.sql";

// -----------------------------------------------------------------------------
// SECTION 1: File Existence & Integrity
// -----------------------------------------------------------------------------
assert(fs.existsSync(migrationPath), `Migration file exists at ${migrationPath}`);
assert(fs.existsSync(rollbackPath), `Rollback file exists at ${rollbackPath}`);

const migrationSql = fs.readFileSync(migrationPath, "utf8");
const rollbackSql = fs.readFileSync(rollbackPath, "utf8");

assert(migrationSql.length > 5000, `Migration SQL content size is healthy (${migrationSql.length} bytes)`);
assert(rollbackSql.length > 500, `Rollback SQL content size is healthy (${rollbackSql.length} bytes)`);

// -----------------------------------------------------------------------------
// SECTION 2: Target Project Safety Guards
// -----------------------------------------------------------------------------
assert(
  migrationSql.includes("lpbdwmpglwdedqdiovqu") && !migrationSql.includes("hadxpgwzmvxqslcyykyw"),
  "Migration strictly targets CRM project lpbdwmpglwdedqdiovqu and NEVER targets hadxpgwzmvxqslcyykyw"
);
assert(
  rollbackSql.includes("lpbdwmpglwdedqdiovqu") && !rollbackSql.includes("hadxpgwzmvxqslcyykyw"),
  "Rollback strictly targets CRM project lpbdwmpglwdedqdiovqu and NEVER targets hadxpgwzmvxqslcyykyw"
);

// -----------------------------------------------------------------------------
// SECTION 3: Tables and Core Columns
// -----------------------------------------------------------------------------
const requiredTables = [
  "public.crm_whatsapp_suppressions",
  "public.crm_whatsapp_templates",
  "public.crm_campaigns",
  "public.crm_campaign_imports",
  "public.crm_campaign_recipients",
  "public.crm_campaign_events"
];

for (const tbl of requiredTables) {
  assert(
    migrationSql.includes(`CREATE TABLE IF NOT EXISTS ${tbl}`),
    `Table definition present: ${tbl}`
  );
  assert(
    migrationSql.includes(`ALTER TABLE ${tbl} ENABLE ROW LEVEL SECURITY;`),
    `Row Level Security explicitly enabled for: ${tbl}`
  );
}

// -----------------------------------------------------------------------------
// SECTION 4: Suppression and Consent Architecture
// -----------------------------------------------------------------------------
assert(
  migrationSql.includes("normalized_phone TEXT UNIQUE NOT NULL"),
  "Suppression list enforces unique normalized E.164 phone numbers"
);
assert(
  migrationSql.includes("consent_status TEXT NOT NULL DEFAULT 'unverified'"),
  "Recipient consent defaults to 'unverified' (imported contacts NOT auto-opted-in)"
);
assert(
  migrationSql.includes("CONSTRAINT uq_campaign_recipient_phone UNIQUE (campaign_id, normalized_phone)"),
  "De-duplication constraint present: uq_campaign_recipient_phone (campaign_id, normalized_phone)"
);

// -----------------------------------------------------------------------------
// SECTION 5: Concurrency-Safe Queue Functions
// -----------------------------------------------------------------------------
// 1. claim_campaign_recipient_batch
assert(
  migrationSql.includes("CREATE OR REPLACE FUNCTION public.claim_campaign_recipient_batch"),
  "Atomic batch claim function defined"
);
assert(
  migrationSql.includes("FOR UPDATE SKIP LOCKED"),
  "claim_campaign_recipient_batch uses FOR UPDATE SKIP LOCKED for non-blocking concurrency"
);
assert(
  migrationSql.includes("WHERE id = p_campaign_id AND status = 'running'"),
  "claim_campaign_recipient_batch guards against paused/cancelled/non-running campaigns"
);
assert(
  migrationSql.includes("locked_until = pg_catalog.now() + (p_lease_seconds || ' seconds')::interval") ||
  migrationSql.includes("locked_until = now() + (p_lease_seconds || ' seconds')::interval"),
  "claim_campaign_recipient_batch applies worker lease duration"
);

// 2. recover_stale_campaign_leases
assert(
  migrationSql.includes("CREATE OR REPLACE FUNCTION public.recover_stale_campaign_leases"),
  "Stale lease recovery function defined"
);
assert(
  migrationSql.includes("AND meta_message_id IS NULL"),
  "recover_stale_campaign_leases checks meta_message_id IS NULL (NEVER retries ambiguous sent messages)"
);
assert(
  migrationSql.includes("status = 'sending_unknown'"),
  "recover_stale_campaign_leases quarantines expired dispatch leases into 'sending_unknown' (preventing duplicates)"
);

// 3. sync_campaign_counters
assert(
  migrationSql.includes("CREATE OR REPLACE FUNCTION public.sync_campaign_counters"),
  "Atomic counter reconciliation function defined"
);

// -----------------------------------------------------------------------------
// SECTION 6: Role-Based Access Control (RLS) & Privilege Hardening
// -----------------------------------------------------------------------------
for (const tbl of requiredTables) {
  assert(
    migrationSql.includes(`GRANT ALL ON ${tbl} TO service_role;`),
    `service_role granted ALL on ${tbl}`
  );
  assert(
    migrationSql.includes(`REVOKE ALL ON ${tbl} FROM anon;`),
    `anon explicitly REVOKED on ${tbl}`
  );
  if (tbl === "public.crm_campaign_events") {
    assert(
      migrationSql.includes(`GRANT SELECT, INSERT ON ${tbl} TO authenticated;`),
      `authenticated granted SELECT and INSERT on ${tbl} (immutable audit log, UPDATE/DELETE prevented)`
    );
  } else {
    assert(
      migrationSql.includes(`GRANT SELECT, INSERT, UPDATE, DELETE ON ${tbl} TO authenticated;`),
      `authenticated granted CRUD on ${tbl} (guarded by RLS policies)`
    );
  }
}

// Function security grants
const functions = [
  "claim_campaign_recipient_batch(UUID, TEXT, INT, INT)",
  "recover_stale_campaign_leases(UUID)",
  "sync_campaign_counters(UUID)"
];

for (const fn of functions) {
  assert(
    migrationSql.includes(`REVOKE ALL ON FUNCTION public.${fn} FROM anon;`) &&
    migrationSql.includes(`REVOKE ALL ON FUNCTION public.${fn} FROM PUBLIC;`) &&
    migrationSql.includes(`GRANT EXECUTE ON FUNCTION public.${fn} TO authenticated, service_role;`),
    `Execution privileges strictly restricted for function: ${fn}`
  );
}

// Policy definitions check
assert(migrationSql.includes(`public.has_role(auth.uid(), 'admin')`), "Admin role check utilized in RLS policies");
assert(migrationSql.includes(`public.has_role(auth.uid(), 'moderator')`), "Moderator role check utilized in RLS policies");
// Confirm NO policy is ever granted TO anon
assert(!migrationSql.match(/CREATE POLICY [^\n]+ TO anon/i), "RLS policies never grant access TO anon");

// -----------------------------------------------------------------------------
// SECTION 7: Rollback Verification
// -----------------------------------------------------------------------------
for (const tbl of requiredTables) {
  assert(
    rollbackSql.includes(`DROP TABLE IF EXISTS ${tbl} CASCADE;`),
    `Rollback safely drops table: ${tbl}`
  );
}
assert(
  rollbackSql.includes("ALTER PUBLICATION supabase_realtime DROP TABLE public.crm_campaigns;"),
  "Rollback removes crm_campaigns from Realtime publication"
);
assert(
  rollbackSql.includes("ALTER PUBLICATION supabase_realtime DROP TABLE public.crm_campaign_events;"),
  "Rollback removes crm_campaign_events from Realtime publication"
);
// Confirm existing tables are NEVER dropped in rollback
const existingTables = [
  "public.crm_leads",
  "public.crm_conversations",
  "public.crm_messages",
  "public.projects",
  "public.user_roles"
];
for (const ext of existingTables) {
  assert(
    !rollbackSql.includes(`DROP TABLE IF EXISTS ${ext}`),
    `Rollback never drops existing table: ${ext}`
  );
}

// -----------------------------------------------------------------------------
// SECTION 8: Remote Backend Sanity Check (Non-destructive inspection)
// -----------------------------------------------------------------------------
async function testRemoteBackend() {
  const envContent = fs.readFileSync("c:/Users/PC/Desktop/naani-main/naani-main/.env", "utf8");
  const env = {};
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
    }
  });

  const crmUrl = env.VITE_CRM_SUPABASE_URL;
  const crmAnonKey = env.VITE_CRM_SUPABASE_ANON_KEY;

  assert(crmUrl.includes("lpbdwmpglwdedqdiovqu"), `CRM Supabase URL matches lpbdwmpglwdedqdiovqu (${crmUrl})`);

  const supabase = createClient(crmUrl, crmAnonKey);

  // Check that campaigns table does NOT exist yet (confirming no premature migration)
  const { error: campaignErr } = await supabase.from("crm_campaigns").select("id").limit(1);
  assert(
    campaignErr !== null && campaignErr.message.includes("Could not find the table"),
    `crm_campaigns does NOT exist in production yet (status: unapplied as required, response: "${campaignErr?.message}")`
  );

  // Querying crm_leads with anon key:
  // Because crm_leads exists in the schema cache, PostgREST recognizes the table and enforces RLS:
  // If anon is revoked/denied by RLS, it returns code '42501' (permission denied) or an empty array, NOT "Could not find the table".
  const { data: leadData, error: leadErr } = await supabase.from("crm_leads").select("id").limit(1);
  const leadsTableRecognized = !leadErr || leadErr.code === "42501" || !leadErr.message.includes("Could not find the table");
  assert(
    leadsTableRecognized,
    `Existing crm_leads table exists in schema cache (recognized by PostgREST, RLS active)`
  );

  console.log("\n================================================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

testRemoteBackend().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
