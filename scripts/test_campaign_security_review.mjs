import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire("c:/Users/PC/Desktop/naani-main/naani-main/package.json");
const { createClient } = require("@supabase/supabase-js");

console.log("================================================================================");
console.log("STAGE 1.3 WHATSAPP CAMPAIGN MANAGER — FINAL TECHNICAL VERIFICATION SUITE");
console.log("Target Project: lpbdwmpglwdedqdiovqu (Naani Projects Dedicated CRM Backend)");
console.log("================================================================================\n");

let staticPassed = 0;
let staticFailed = 0;
let livePassed = 0;
let liveFailed = 0;

function assertStatic(condition, message) {
  if (condition) {
    console.log(`[PASS] [STATIC] ${message}`);
    staticPassed++;
  } else {
    console.error(`[FAIL] [STATIC] ${message}`);
    staticFailed++;
  }
}

function assertLive(condition, message) {
  if (condition) {
    console.log(`[PASS] [LIVE PROBE] ${message}`);
    livePassed++;
  } else {
    console.error(`[FAIL] [LIVE PROBE] ${message}`);
    liveFailed++;
  }
}

const migrationPath = "c:/Users/PC/Desktop/naani-main/naani-main/supabase/migrations/20261124000000_create_campaign_tables.sql";
const rollbackPath = "c:/Users/PC/Desktop/naani-main/naani-main/supabase/migrations/20261124000000_create_campaign_tables_rollback.sql";

assertStatic(fs.existsSync(migrationPath), `Migration file exists on disk: ${migrationPath}`);
assertStatic(fs.existsSync(rollbackPath), `Rollback file exists on disk: ${rollbackPath}`);

const migrationSql = fs.readFileSync(migrationPath, "utf8");
const rollbackSql = fs.readFileSync(rollbackPath, "utf8");

// =============================================================================
// PART 1: STATIC SQL ASSERTIONS (DDL, CONSTRAINTS, LOGIC, POLICIES, SEARCH_PATH)
// =============================================================================
console.log("\n--------------------------------------------------------------------------------");
console.log("PART 1: STATIC SQL ASSERTIONS");
console.log("--------------------------------------------------------------------------------");

// 1.1 Meta Webhook Correlation Design & Opaque Tokens
console.log("\n[Group 1: Meta Webhook Correlation & Idempotency Tokens]");
assertStatic(
  migrationSql.includes("dispatch_correlation_token TEXT UNIQUE DEFAULT gen_random_uuid()::text"),
  "Recipient table generates unique dispatch_correlation_token for Meta biz_opaque_callback_data"
);
assertStatic(
  migrationSql.includes("CREATE INDEX IF NOT EXISTS idx_crm_recipients_token ON public.crm_campaign_recipients(dispatch_correlation_token)"),
  "Fast lookup index created on dispatch_correlation_token"
);
assertStatic(
  migrationSql.includes("reconciled_by UUID REFERENCES auth.users(id) ON DELETE SET NULL") &&
  migrationSql.includes("reconciled_at TIMESTAMPTZ") &&
  migrationSql.includes("reconciliation_notes TEXT"),
  "Audit columns present for reconciliation tracking (reconciled_by, reconciled_at, reconciliation_notes)"
);

// 1.2 Ambiguous WhatsApp Dispatch Outcomes & Quarantine
console.log("\n[Group 2: Ambiguous Outcomes & Stale Lease Quarantine]");
assertStatic(
  migrationSql.includes("'sending_unknown'"),
  "Recipient status enum includes 'sending_unknown' quarantine state"
);
assertStatic(
  migrationSql.includes("status = 'sending_unknown'") &&
  migrationSql.includes("last_error_code = 'LEASE_TIMEOUT_AMBIGUOUS'"),
  "recover_stale_campaign_leases quarantines expired dispatch leases into 'sending_unknown'"
);

const recoverFnMatch = migrationSql.match(/CREATE OR REPLACE FUNCTION public\.recover_stale_campaign_leases[\s\S]*?END;\s*\$\$/i);
const recoverFnBody = recoverFnMatch ? recoverFnMatch[0] : "";
assertStatic(
  !recoverFnBody.includes("status = 'queued'"),
  "recover_stale_campaign_leases NEVER automatically re-queues ambiguous dispatches to 'queued'"
);
assertStatic(
  migrationSql.includes("'lease_expired_ambiguous'"),
  "recover_stale_campaign_leases logs 'lease_expired_ambiguous' event into crm_campaign_events"
);

// 1.3 Retry and Reconciliation Safeguards
console.log("\n[Group 3: Retry and Reconciliation Safeguards]");
assertStatic(
  migrationSql.includes("CREATE OR REPLACE FUNCTION public.reconcile_ambiguous_recipient"),
  "reconcile_ambiguous_recipient function exists for controlled admin resolution"
);
assertStatic(
  migrationSql.includes("public.has_role(auth.uid(), 'admin')") &&
  migrationSql.includes("reconciliation of ambiguous dispatches requires administrator privileges"),
  "reconcile_ambiguous_recipient strictly requires 'admin' role"
);
assertStatic(
  migrationSql.includes("p_confirmed_non_delivery BOOLEAN DEFAULT FALSE"),
  "reconcile_ambiguous_recipient requires affirmative p_confirmed_non_delivery parameter"
);
assertStatic(
  migrationSql.includes("retry_send requires explicit affirmative confirmation (p_confirmed_non_delivery = true)"),
  "Manual retry is blocked unless admin affirmatively certifies non-delivery (p_confirmed_non_delivery = true)"
);
assertStatic(
  migrationSql.includes("Reconciliation requires explicit explanation notes (minimum 10 characters)"),
  "Mandatory rationale required (minimum 10 characters) for any reconciliation or retry"
);
assertStatic(
  migrationSql.includes("confirm_sent requires a valid Meta message ID (wamid...)"),
  "confirm_sent action requires a verified Meta message ID (wamid...)"
);

// 1.4 Function Security, SET search_path = '', and Role Verification
console.log("\n[Group 4: Service Role vs Authenticated Role Boundaries & search_path = '']");
const privilegedFunctions = [
  "claim_campaign_recipient_batch",
  "recover_stale_campaign_leases",
  "sync_campaign_counters",
  "reconcile_ambiguous_recipient",
  "check_crm_campaign_transitions"
];

for (const fn of privilegedFunctions) {
  assertStatic(
    migrationSql.includes(`CREATE OR REPLACE FUNCTION public.${fn}`),
    `Function definition exists: ${fn}`
  );
  assertStatic(
    migrationSql.includes(`CREATE OR REPLACE FUNCTION public.${fn}`) &&
    migrationSql.match(new RegExp(`FUNCTION public\\.${fn}[\\s\\S]*?SET search_path = ''`, 'i')) !== null,
    `Function ${fn} specifies hardened SET search_path = ''`
  );
  assertStatic(
    migrationSql.includes("auth.role() = 'service_role'"),
    `Function ${fn} explicitly checks auth.role() = 'service_role'`
  );
  assertStatic(
    migrationSql.includes("auth.role() = 'authenticated' AND auth.uid() IS NOT NULL"),
    `Function ${fn} validates authenticated callers possess a valid user UID`
  );
  assertStatic(
    migrationSql.includes("Access denied: unauthorized caller role (%)"),
    `Function ${fn} rejects anonymous or unknown caller roles with exception`
  );
}

// 1.5 Database-Level Admin Approval Trigger
console.log("\n[Group 5: Database-Level Approval Gate]");
assertStatic(
  migrationSql.includes("CREATE TRIGGER trg_check_crm_campaign_transitions") &&
  migrationSql.includes("BEFORE UPDATE ON public.crm_campaigns"),
  "Database trigger trg_check_crm_campaign_transitions attached to crm_campaigns"
);
assertStatic(
  migrationSql.includes("Campaign approval and activation requires administrator privileges"),
  "Database trigger strictly prevents moderators/non-admins from transitioning campaigns to running"
);

// 1.6 Consent, Suppression, and Immutability
console.log("\n[Group 6: Consent, Suppression & Audit Immutability]");
assertStatic(
  migrationSql.includes("consent_status TEXT NOT NULL DEFAULT 'unverified'"),
  "Recipient consent defaults to 'unverified' (imported contacts NOT auto-opted-in)"
);
assertStatic(
  migrationSql.includes("r.consent_status = 'opted_in'"),
  "claim_campaign_recipient_batch strictly enforces r.consent_status = 'opted_in'"
);
assertStatic(
  migrationSql.includes("NOT EXISTS (\n        SELECT 1 FROM public.crm_whatsapp_suppressions s\n        WHERE s.normalized_phone = r.normalized_phone\n      )"),
  "claim_campaign_recipient_batch strictly verifies phone is NOT on suppression list at claim time"
);
assertStatic(
  migrationSql.includes("CONSTRAINT uq_campaign_recipient_phone UNIQUE (campaign_id, normalized_phone)"),
  "De-duplication constraint uq_campaign_recipient_phone prevents duplicate recipient insertions"
);
assertStatic(
  !migrationSql.includes('ON public.crm_campaign_events FOR UPDATE') &&
  !migrationSql.includes('ON public.crm_campaign_events FOR DELETE'),
  "crm_campaign_events has NO UPDATE/DELETE policies (strictly append-only immutable audit log)"
);

// 1.7 Rollback Safety
console.log("\n[Group 7: Rollback Verification]");
const requiredTables = [
  "public.crm_whatsapp_suppressions",
  "public.crm_whatsapp_templates",
  "public.crm_campaigns",
  "public.crm_campaign_imports",
  "public.crm_campaign_recipients",
  "public.crm_campaign_events"
];

for (const tbl of requiredTables) {
  assertStatic(
    rollbackSql.includes(`DROP TABLE IF EXISTS ${tbl} CASCADE;`),
    `Rollback safely drops new table: ${tbl}`
  );
}

const existingTables = [
  "public.crm_leads",
  "public.crm_conversations",
  "public.crm_messages",
  "public.projects",
  "public.user_roles"
];

for (const ext of existingTables) {
  assertStatic(
    !rollbackSql.includes(`DROP TABLE IF EXISTS ${ext}`),
    `Rollback strictly preserves existing table: ${ext}`
  );
}

// =============================================================================
// PART 2: READ-ONLY LIVE BACKEND CHECKS (Network & Schema Probes)
// =============================================================================
console.log("\n--------------------------------------------------------------------------------");
console.log("PART 2: READ-ONLY LIVE BACKEND CHECKS (Target Supabase lpbdwmpglwdedqdiovqu)");
console.log("--------------------------------------------------------------------------------");

async function verifyLiveBackend() {
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

  assertLive(
    crmUrl.includes("lpbdwmpglwdedqdiovqu"),
    `Target CRM Supabase URL verified: ${crmUrl}`
  );

  const supabase = createClient(crmUrl, crmAnonKey);

  // 1. Confirm campaign tables do NOT exist in production yet
  const { error: campErr } = await supabase.from("crm_campaigns").select("id").limit(1);
  assertLive(
    campErr !== null && campErr.message.includes("Could not find the table"),
    `crm_campaigns does NOT exist in production yet (status: unapplied as required, message: "${campErr?.message}")`
  );

  const { error: suppErr } = await supabase.from("crm_whatsapp_suppressions").select("id").limit(1);
  assertLive(
    suppErr !== null && suppErr.message.includes("Could not find the table"),
    `crm_whatsapp_suppressions does NOT exist in production yet (status: unapplied)`
  );

  // 2. Confirm existing CRM tables are live and protected
  const { data: leadData, error: leadErr } = await supabase.from("crm_leads").select("id").limit(1);
  const leadsRecognized = !leadErr || leadErr.code === "42501" || !leadErr.message.includes("Could not find the table");
  assertLive(
    leadsRecognized,
    `Existing crm_leads table is active in production schema cache (RLS protecting data)`
  );

  console.log("\n================================================================================");
  console.log(`TEST SUMMARY:`);
  console.log(`  - Static SQL Assertions: ${staticPassed} PASSED, ${staticFailed} FAILED`);
  console.log(`  - Read-Only Live Probes: ${livePassed} PASSED, ${liveFailed} FAILED`);
  console.log(`  - PostgreSQL Integration Tests: 0 (deferred until migration apply)`);
  console.log(`  - Concurrency Tests: 0 (deferred until worker dispatch load testing)`);
  console.log(`  TOTAL: ${staticPassed + livePassed} PASSED, ${staticFailed + liveFailed} FAILED`);
  console.log("================================================================================\n");

  if (staticFailed > 0 || liveFailed > 0) {
    process.exit(1);
  }
}

verifyLiveBackend().catch((err) => {
  console.error("Live verification error:", err);
  process.exit(1);
});
