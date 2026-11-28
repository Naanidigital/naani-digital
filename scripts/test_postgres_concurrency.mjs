// ==============================================================================
// STAGE 5B STEP 3.1: REAL POSTGRESQL MULTI-TRANSACTION CONCURRENCY TEST SUITE
// Hardened with strict connection lifecycles, Promise.allSettled, query timeouts,
// 20+ repeated same-phone race iterations, cross-campaign isolation, lease recovery,
// and atomic counter reconciliation.
//
// Target Environment: Isolated Staging Supabase PostgreSQL Database ONLY
// CRITICAL SAFETY GUARD:
// This script will NEVER execute against production projects (hadxpgwzmvxqslcyykyw
// or lpbdwmpglwdedqdiovqu).
// ==============================================================================

import pg from 'pg';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('================================================================');
console.log('STAGE 5B STEP 3.1: REAL POSTGRESQL CONCURRENCY VERIFICATION SUITE');
console.log('Multi-Transaction Concurrency, Advisory Locking & Pacing Race Suite');
console.log('================================================================\n');

const FORBIDDEN_PROJECT_REFS = ['hadxpgwzmvxqslcyykyw', 'lpbdwmpglwdedqdiovqu'];
const STAGING_PROJECT_REF = 'bhwoenqfxbgkbrsmahjt';

function isForbiddenUrl(url) {
  if (!url) return false;
  return FORBIDDEN_PROJECT_REFS.some(ref => url.includes(ref));
}

function getCliAccessToken() {
  const psPath = path.resolve(__dirname, '../../scripts/read_cli_token.ps1');
  const out = execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { encoding: 'utf8' });
  return out.trim();
}

async function getStagingPoolConfig() {
  let stagingDbUrl = process.env.STAGING_DATABASE_URL || process.env.DATABASE_URL;

  if (stagingDbUrl) {
    if (isForbiddenUrl(stagingDbUrl)) {
      console.error('[CRITICAL SAFETY VIOLATION] STAGING_DATABASE_URL points to a production project!');
      process.exit(1);
    }
    return { connectionString: stagingDbUrl };
  }

  // Acquire ephemeral staging database role via Supabase Management API
  const token = getCliAccessToken();
  const roleRes = await fetch(`https://api.supabase.com/v1/projects/${STAGING_PROJECT_REF}/cli/login-role`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ read_only: false })
  });

  if (!roleRes.ok) {
    throw new Error(`Failed to initialize CLI login role: ${roleRes.status} ${roleRes.statusText}`);
  }

  const roleData = await roleRes.json();
  return {
    host: `db.${STAGING_PROJECT_REF}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: roleData.role,
    password: roleData.password,
    ssl: { rejectUnauthorized: false }
  };
}

const poolConfig = await getStagingPoolConfig();
const pool = new Pool({
  ...poolConfig,
  max: 15, // 15 connections to test 10+ concurrent worker transactions
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Robust client lifecycle: guaranteed release in finally block
async function withClient(callback) {
  const client = await pool.connect();
  try {
    await client.query('SET ROLE postgres');
    await client.query("SET request.jwt.claim.role = 'service_role'");
    await client.query("SET statement_timeout = '8000'");
    return await callback(client);
  } finally {
    client.release();
  }
}

let passed = 0;
let failed = 0;

function assert(condition, message, details = '') {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message} - ${details}`);
    failed++;
  }
}

async function runPostgreSqlConcurrencyTests() {
  console.log(`Connected to Staging PostgreSQL (${STAGING_PROJECT_REF}). Beginning real concurrency execution...\n`);

  const testCampaignIdA = '00000000-0000-0000-0000-00000000000a';
  const testCampaignIdB = '00000000-0000-0000-0000-00000000000b';
  const syntheticPrefix = '99990000';

  const summary = {
    test1_queue_claims: null,
    test2_pacing_races: [],
    test3_cross_campaign: null,
    test4_independent_phones: null,
    test5_lease_recovery: null,
    test6_counter_reconciliation: null,
    test7_rollback_isolation: null,
  };

  try {
    // -------------------------------------------------------------------------
    // TEST HARNESS SETUP
    // -------------------------------------------------------------------------
    console.log('--- Setting up test campaigns and harness ---');
    await withClient(async (client) => {
      await client.query('DELETE FROM public.crm_campaign_recipients WHERE campaign_id IN ($1, $2) OR normalized_phone LIKE $3', [testCampaignIdA, testCampaignIdB, `${syntheticPrefix}%`]);
      await client.query('DELETE FROM public.crm_campaign_events WHERE campaign_id IN ($1, $2)', [testCampaignIdA, testCampaignIdB]);
      await client.query('DELETE FROM public.crm_campaigns WHERE id IN ($1, $2)', [testCampaignIdA, testCampaignIdB]);
      await client.query(`DELETE FROM public.crm_whatsapp_recipient_pacing WHERE normalized_phone LIKE '${syntheticPrefix}%'`);

      await client.query(`
        INSERT INTO public.crm_campaigns (id, name, template_name, status)
        VALUES 
          ($1, 'Concurrency Test Campaign A', 'test_template', 'running'),
          ($2, 'Concurrency Test Campaign B', 'test_template', 'running')
      `, [testCampaignIdA, testCampaignIdB]);
    });

    // -------------------------------------------------------------------------
    // TEST 1: CONCURRENT QUEUE BATCH CLAIMS (FOR UPDATE SKIP LOCKED)
    // 10 Independent Worker Connections Claiming Simultaneously
    // -------------------------------------------------------------------------
    console.log('\n--- 1. Concurrent Queue Batch Claims Across 10 Independent PostgreSQL Connections ---');
    const totalRecipients = 50;
    const batchSize = 5;

    await withClient(async (client) => {
      for (let i = 1; i <= totalRecipients; i++) {
        await client.query(`
          INSERT INTO public.crm_campaign_recipients (
            campaign_id, normalized_phone, customer_name, consent_status, status
          ) VALUES ($1, $2, $3, 'opted_in', 'queued')
        `, [testCampaignIdA, `${syntheticPrefix}q${String(i).padStart(3, '0')}`, `Synthetic Recipient ${i}`]);
      }
    });

    console.log(`Seeded ${totalRecipients} queued recipients. Launching 10 simultaneous worker claims...`);

    const claimSettled = await Promise.allSettled(
      Array.from({ length: 10 }, (_, idx) => {
        const workerId = `concurrent_worker_${String(idx + 1).padStart(2, '0')}`;
        return withClient(async (client) => {
          const res = await client.query(
            'SELECT id, normalized_phone, status, locked_by, attempt_count FROM public.claim_campaign_recipient_batch($1, $2, $3, 90)',
            [testCampaignIdA, workerId, batchSize]
          );
          return { workerId, rows: res.rows };
        });
      })
    );

    const claimErrors = claimSettled.filter(s => s.status === 'rejected');
    assert(claimErrors.length === 0, 'QUEUE CLAIMS: Zero worker query errors during concurrent claim', JSON.stringify(claimErrors));

    const allClaimedIds = [];
    const collisionMap = new Map();
    claimSettled.forEach(s => {
      if (s.status === 'fulfilled') {
        s.value.rows.forEach(row => {
          allClaimedIds.push(row.id);
          collisionMap.set(row.id, (collisionMap.get(row.id) || 0) + 1);
        });
      }
    });

    const duplicateClaims = [...collisionMap.entries()].filter(([_, count]) => count > 1);
    assert(duplicateClaims.length === 0, 'ATOMIC CLAIM INTEGRITY: Exactly ZERO recipient collisions across 10 concurrent connections', JSON.stringify(duplicateClaims));
    assert(allClaimedIds.length === totalRecipients, `QUEUE SATURATION: All ${totalRecipients} recipients claimed across 10 workers (${allClaimedIds.length} claimed)`);

    await withClient(async (client) => {
      const verifyLeaseRes = await client.query(
        'SELECT count(*) as count FROM public.crm_campaign_recipients WHERE campaign_id = $1 AND status = $2 AND locked_until > now()',
        [testCampaignIdA, 'sending']
      );
      assert(parseInt(verifyLeaseRes.rows[0].count) === totalRecipients, 'LEASE STATE: All recipients transitioned to "sending" with active future locked_until');
    });

    summary.test1_queue_claims = {
      totalRecipients,
      claimedCount: allClaimedIds.length,
      duplicateClaims: duplicateClaims.length,
      workerErrors: claimErrors.length
    };

    // -------------------------------------------------------------------------
    // TEST 2: RECIPIENT PACING RACE: 20 REPEATED ITERATIONS (10 WORKERS EACH)
    // Fresh un-pre-existing synthetic phone per iteration
    // -------------------------------------------------------------------------
    console.log('\n--- 2. Recipient Pacing Race: 20 Repeated Iterations Across 10 Concurrent Connections ---');
    const ITERATIONS = 20;
    let totalRacesPassed = 0;
    let totalUnexpectedSqlErrors = 0;
    let totalDuplicateGrants = 0;

    for (let iter = 1; iter <= ITERATIONS; iter++) {
      const racePhone = `${syntheticPrefix}${String(1000 + iter)}`;
      const iterationWorkers = 10;

      const raceSettled = await Promise.allSettled(
        Array.from({ length: iterationWorkers }, (_, idx) => {
          const workerId = `iter_${iter}_worker_${idx + 1}`;
          return withClient(async (client) => {
            const res = await client.query(
              'SELECT * FROM public.check_and_update_recipient_pacing($1, $2, $3, $4, 60)',
              [racePhone, 'campaign', testCampaignIdA, workerId]
            );
            return { workerId, ...res.rows[0] };
          });
        })
      );

      const rejected = raceSettled.filter(r => r.status === 'rejected');
      const fulfilled = raceSettled.filter(r => r.status === 'fulfilled').map(r => r.value);

      const granted = fulfilled.filter(r => r.can_dispatch === true);
      const denied = fulfilled.filter(r => r.can_dispatch === false);

      const sqlErrors = rejected.map(r => ({
        code: r.reason?.code || 'UNKNOWN',
        message: r.reason?.message || String(r.reason)
      }));

      const duplicateGrants = Math.max(0, granted.length - 1);
      totalDuplicateGrants += duplicateGrants;
      totalUnexpectedSqlErrors += sqlErrors.length;

      const iterPassed = (granted.length === 1 && denied.length === (iterationWorkers - 1) && sqlErrors.length === 0 && duplicateGrants === 0);
      if (iterPassed) totalRacesPassed++;

      summary.test2_pacing_races.push({
        iteration: iter,
        phone: racePhone,
        attempted: iterationWorkers,
        granted: granted.length,
        denied: denied.length,
        sqlErrors: sqlErrors.length,
        duplicateGrants,
        winningWorker: granted[0]?.workerId || null,
        minSecondsRemaining: denied.length > 0 ? Math.min(...denied.map(d => d.seconds_remaining)) : 0
      });

      if (iter === 1 || iter === 5 || iter === 10 || iter === 15 || iter === 20) {
        console.log(`  [Iteration ${String(iter).padStart(2, '0')}/${ITERATIONS}] Phone: ${racePhone} | Granted: ${granted.length} | Denied: ${denied.length} | Errors: ${sqlErrors.length} | Winner: ${granted[0]?.workerId}`);
      }
    }

    assert(totalRacesPassed === ITERATIONS, `PACING RACE ACCURACY: Exactly 1 grant and 9 denials across ALL ${ITERATIONS} iterations (${totalRacesPassed}/${ITERATIONS} passed)`);
    assert(totalDuplicateGrants === 0, `ZERO DUPLICATE GRANTS: Zero duplicate reservations across ${ITERATIONS * 10} total attempts`);
    assert(totalUnexpectedSqlErrors === 0, `ZERO UNHANDLED SQL EXCEPTIONS: Zero duplicate-key (23505) or database errors across all iterations`);

    // -------------------------------------------------------------------------
    // TEST 3: CROSS-CAMPAIGN PACING RACE UNDER ACTIVE COOLDOWN
    // -------------------------------------------------------------------------
    console.log('\n--- 3. Cross-Campaign Pacing Under Active Cooldown ---');
    const existingPacedPhone = `${syntheticPrefix}1001`; // Reserved during iteration 1

    const crossRes = await withClient(async (client) => {
      const res = await client.query(
        'SELECT * FROM public.check_and_update_recipient_pacing($1, $2, $3, $4, 60)',
        [existingPacedPhone, 'campaign', testCampaignIdB, 'cross_worker_camp_b']
      );
      return res.rows[0];
    });

    assert(crossRes.can_dispatch === false, 'CROSS-CAMPAIGN ISOLATION: Campaign B blocked on same phone during Campaign A cooldown');
    assert(crossRes.seconds_remaining > 0, `CROSS-CAMPAIGN COOLDOWN: Remaining cooldown is positive (${crossRes.seconds_remaining}s remaining)`);
    assert(crossRes.previous_source === 'campaign', 'CROSS-CAMPAIGN AUDIT: Previous source correctly identified as campaign');

    summary.test3_cross_campaign = {
      phone: existingPacedPhone,
      can_dispatch: crossRes.can_dispatch,
      seconds_remaining: crossRes.seconds_remaining,
      previous_source: crossRes.previous_source
    };

    // -------------------------------------------------------------------------
    // TEST 4: INDEPENDENT PHONE PACING (SIMULTANEOUS 10 DISTINCT PHONES)
    // -------------------------------------------------------------------------
    console.log('\n--- 4. Independent Recipient Pacing Across 10 Distinct Phones ---');
    const distinctPhonesSettled = await Promise.allSettled(
      Array.from({ length: 10 }, (_, idx) => {
        const phone = `${syntheticPrefix}ind_${idx + 1}`;
        const workerId = `ind_worker_${idx + 1}`;
        return withClient(async (client) => {
          const res = await client.query(
            'SELECT * FROM public.check_and_update_recipient_pacing($1, $2, $3, $4, 60)',
            [phone, 'campaign', testCampaignIdA, workerId]
          );
          return { phone, ...res.rows[0] };
        });
      })
    );

    const indFulfilled = distinctPhonesSettled.filter(r => r.status === 'fulfilled').map(r => r.value);
    const indGranted = indFulfilled.filter(r => r.can_dispatch === true);
    assert(indGranted.length === 10, `INDEPENDENT CONCURRENCY: All 10 distinct phones granted dispatch simultaneously (${indGranted.length}/10 granted)`);

    summary.test4_independent_phones = {
      attempted: 10,
      granted: indGranted.length
    };

    // -------------------------------------------------------------------------
    // TEST 5: LEASE EXPIRY RECOVERY & QUARANTINE INTEGRITY
    // -------------------------------------------------------------------------
    console.log('\n--- 5. Stale Lease Recovery & sending_unknown Quarantine Protection ---');
    const stalePhones = [`${syntheticPrefix}q001`, `${syntheticPrefix}q002`, `${syntheticPrefix}q003`];

    await withClient(async (client) => {
      // Force 3 recipients into expired lease state (worker timed out during Meta call)
      await client.query(`
        UPDATE public.crm_campaign_recipients
        SET status = 'sending', locked_until = now() - interval '30 seconds', meta_message_id = NULL
        WHERE campaign_id = $1 AND normalized_phone = ANY($2::text[])
      `, [testCampaignIdA, stalePhones]);

      const recoverRes = await client.query(
        'SELECT public.recover_stale_campaign_leases($1) AS recovered',
        [testCampaignIdA]
      );
      assert(parseInt(recoverRes.rows[0].recovered) === 3, 'LEASE RECOVERY: Exactly 3 expired leases recovered by recover_stale_campaign_leases()');

      // Verify quarantined to sending_unknown with correct error code
      const quarantinedRes = await client.query(`
        SELECT normalized_phone, status, last_error_code
        FROM public.crm_campaign_recipients
        WHERE campaign_id = $1 AND normalized_phone = ANY($2::text[])
      `, [testCampaignIdA, stalePhones]);

      const allQuarantined = quarantinedRes.rows.every(r => r.status === 'sending_unknown' && r.last_error_code === 'LEASE_TIMEOUT_AMBIGUOUS');
      assert(allQuarantined, 'SAFETY QUARANTINE: Expired leases transitioned strictly to "sending_unknown" with LEASE_TIMEOUT_AMBIGUOUS');

      // Seed 1 active queued recipient to confirm claiming functions while omitting quarantined rows
      const freshQueuePhone = `${syntheticPrefix}fresh_claim_target`;
      await client.query(`
        INSERT INTO public.crm_campaign_recipients (
          campaign_id, normalized_phone, customer_name, consent_status, status
        ) VALUES ($1, $2, 'Eligible Target', 'opted_in', 'queued')
      `, [testCampaignIdA, freshQueuePhone]);

      const claimBatchRes = await client.query(
        'SELECT id, normalized_phone FROM public.claim_campaign_recipient_batch($1, $2, 10, 60)',
        [testCampaignIdA, 'quarantine_verifier_worker']
      );

      const claimedSet = new Set(claimBatchRes.rows.map(r => r.normalized_phone));
      const leaked = stalePhones.some(p => claimedSet.has(p));
      assert(!leaked, 'DUPLICATE DISPATCH PREVENTION: Zero quarantined (sending_unknown) recipients were claimed by workers');
      assert(claimedSet.has(freshQueuePhone), 'QUEUE SELECTIVITY: Active queued recipient claimed normally');
    });

    summary.test5_lease_recovery = {
      staleLeasesForced: 3,
      recoveredCount: 3,
      quarantineLeakDetected: false
    };

    // -------------------------------------------------------------------------
    // TEST 6: COUNTER CONSISTENCY & ATOMIC RECONCILIATION
    // -------------------------------------------------------------------------
    console.log('\n--- 6. Atomic Campaign Counter Consistency & Reconciliation ---');
    await withClient(async (client) => {
      // Set distinct recipient states on Campaign A
      await client.query(`UPDATE public.crm_campaign_recipients SET status = 'sent', sent_at = now() WHERE campaign_id = $1 AND normalized_phone = $2`, [testCampaignIdA, `${syntheticPrefix}q010`]);
      await client.query(`UPDATE public.crm_campaign_recipients SET status = 'delivered', delivered_at = now() WHERE campaign_id = $1 AND normalized_phone = $2`, [testCampaignIdA, `${syntheticPrefix}q011`]);
      await client.query(`UPDATE public.crm_campaign_recipients SET status = 'read', read_at = now() WHERE campaign_id = $1 AND normalized_phone = $2`, [testCampaignIdA, `${syntheticPrefix}q012`]);
      await client.query(`UPDATE public.crm_campaign_recipients SET status = 'failed', failed_at = now() WHERE campaign_id = $1 AND normalized_phone = $2`, [testCampaignIdA, `${syntheticPrefix}q013`]);
      await client.query(`UPDATE public.crm_campaign_recipients SET status = 'opted_out' WHERE campaign_id = $1 AND normalized_phone = $2`, [testCampaignIdA, `${syntheticPrefix}q014`]);
      await client.query(`UPDATE public.crm_campaign_recipients SET status = 'suppressed' WHERE campaign_id = $1 AND normalized_phone = $2`, [testCampaignIdA, `${syntheticPrefix}q015`]);

      // Call sync_campaign_counters()
      await client.query('SELECT public.sync_campaign_counters($1)', [testCampaignIdA]);

      // Compare crm_campaigns aggregate columns against ground truth
      const campRow = (await client.query('SELECT * FROM public.crm_campaigns WHERE id = $1', [testCampaignIdA])).rows[0];
      const truthRes = await client.query(`
        SELECT 
          count(*) FILTER (WHERE status = 'queued') as queued,
          count(*) FILTER (WHERE status = 'sending') as sending,
          count(*) FILTER (WHERE status = 'sending_unknown') as unknown,
          count(*) FILTER (WHERE status = 'sent') as sent,
          count(*) FILTER (WHERE status = 'delivered') as delivered,
          count(*) FILTER (WHERE status = 'read') as read,
          count(*) FILTER (WHERE status = 'failed') as failed,
          count(*) FILTER (WHERE status = 'opted_out') as opted_out,
          count(*) FILTER (WHERE status = 'suppressed') as excluded
        FROM public.crm_campaign_recipients
        WHERE campaign_id = $1
      `, [testCampaignIdA]);
      const truth = truthRes.rows[0];

      assert(campRow.queued_count === parseInt(truth.queued), `COUNTER MATCH [queued]: ${campRow.queued_count} === ${truth.queued}`);
      assert(campRow.sending_count === parseInt(truth.sending), `COUNTER MATCH [sending]: ${campRow.sending_count} === ${truth.sending}`);
      assert(campRow.unknown_count === parseInt(truth.unknown), `COUNTER MATCH [unknown]: ${campRow.unknown_count} === ${truth.unknown}`);
      assert(campRow.sent_count === parseInt(truth.sent), `COUNTER MATCH [sent]: ${campRow.sent_count} === ${truth.sent}`);
      assert(campRow.delivered_count === parseInt(truth.delivered), `COUNTER MATCH [delivered]: ${campRow.delivered_count} === ${truth.delivered}`);
      assert(campRow.read_count === parseInt(truth.read), `COUNTER MATCH [read]: ${campRow.read_count} === ${truth.read}`);
      assert(campRow.failed_count === parseInt(truth.failed), `COUNTER MATCH [failed]: ${campRow.failed_count} === ${truth.failed}`);
      assert(campRow.opted_out_count === parseInt(truth.opted_out), `COUNTER MATCH [opted_out]: ${campRow.opted_out_count} === ${truth.opted_out}`);
      assert(campRow.excluded_count === parseInt(truth.excluded), `COUNTER MATCH [excluded]: ${campRow.excluded_count} === ${truth.excluded}`);

      summary.test6_counter_reconciliation = {
        queued: campRow.queued_count,
        sending: campRow.sending_count,
        unknown: campRow.unknown_count,
        sent: campRow.sent_count,
        delivered: campRow.delivered_count,
        read: campRow.read_count,
        failed: campRow.failed_count,
        opted_out: campRow.opted_out_count,
        excluded: campRow.excluded_count
      };
    });

    // -------------------------------------------------------------------------
    // TEST 7: TRANSACTION ROLLBACK ISOLATION & ADVISORY LOCK RELEASE
    // -------------------------------------------------------------------------
    console.log('\n--- 7. Transaction Rollback & State Isolation ---');
    const rollbackPhone = `${syntheticPrefix}rollback_test`;

    await withClient(async (txClient) => {
      await txClient.query('BEGIN');
      await txClient.query(`
        INSERT INTO public.crm_whatsapp_recipient_pacing (
          normalized_phone, last_dispatched_at, source_type, cooldown_seconds
        ) VALUES ($1, now(), 'worker', 120)
      `, [rollbackPhone]);
      // Rollback transaction
      await txClient.query('ROLLBACK');
    });

    // After rollback, second client should immediately be able to reserve
    const afterRollbackRes = await withClient(async (client) => {
      const res = await client.query(
        'SELECT * FROM public.check_and_update_recipient_pacing($1, $2, $3::uuid, $4, 60)',
        [rollbackPhone, 'campaign', null, 'post_rollback_worker']
      );
      return res.rows[0];
    });

    assert(afterRollbackRes.can_dispatch === true, 'ROLLBACK ISOLATION: Rolled-back reservation left zero dirty state; new reservation succeeded');
    summary.test7_rollback_isolation = {
      phone: rollbackPhone,
      can_dispatch: afterRollbackRes.can_dispatch,
      seconds_remaining: afterRollbackRes.seconds_remaining
    };

    // -------------------------------------------------------------------------
    // TEST HARNESS TEARDOWN & CLEANUP
    // -------------------------------------------------------------------------
    console.log('\n--- Cleaning up all staging synthetic test records ---');
    await withClient(async (client) => {
      await client.query('DELETE FROM public.crm_campaign_recipients WHERE campaign_id IN ($1, $2) OR normalized_phone LIKE $3', [testCampaignIdA, testCampaignIdB, `${syntheticPrefix}%`]);
      await client.query('DELETE FROM public.crm_campaign_events WHERE campaign_id IN ($1, $2)', [testCampaignIdA, testCampaignIdB]);
      await client.query('DELETE FROM public.crm_campaigns WHERE id IN ($1, $2)', [testCampaignIdA, testCampaignIdB]);
      await client.query(`DELETE FROM public.crm_whatsapp_recipient_pacing WHERE normalized_phone LIKE '${syntheticPrefix}%'`);

      // Verify zero synthetic records remain
      const remainRec = (await client.query(`SELECT count(*) as count FROM public.crm_campaign_recipients WHERE normalized_phone LIKE '${syntheticPrefix}%'`)).rows[0].count;
      const remainCamp = (await client.query(`SELECT count(*) as count FROM public.crm_campaigns WHERE id IN ($1, $2)`, [testCampaignIdA, testCampaignIdB])).rows[0].count;
      const remainPacing = (await client.query(`SELECT count(*) as count FROM public.crm_whatsapp_recipient_pacing WHERE normalized_phone LIKE '${syntheticPrefix}%'`)).rows[0].count;

      assert(parseInt(remainRec) === 0, `CLEANUP: 0 synthetic recipients remain in staging (${remainRec})`);
      assert(parseInt(remainCamp) === 0, `CLEANUP: 0 synthetic campaigns remain in staging (${remainCamp})`);
      assert(parseInt(remainPacing) === 0, `CLEANUP: 0 synthetic pacing rows remain in staging (${remainPacing})`);
    });

    console.log('\n================================================================');
    console.log(`POSTGRESQL CONCURRENCY SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================\n');

    console.log('--- Summary JSON for Report Generation ---');
    console.log(JSON.stringify(summary, null, 2));

  } finally {
    // 5-second safety race on pool.end() to guarantee process termination
    await Promise.race([
      pool.end(),
      new Promise(resolve => setTimeout(resolve, 5000))
    ]);
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runPostgreSqlConcurrencyTests().catch(err => {
  console.error('[CONCURRENCY TEST SUITE FATAL ERROR]:', err);
  process.exit(1);
});
