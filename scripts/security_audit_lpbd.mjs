// scripts/security_audit_lpbd.mjs
// Read-only / transaction-rollback security audit for Phase 4A.1 on lpbdwmpglwdedqdiovqu
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pg = require('C:/Users/PC/Desktop/naani-main/naani-main/node_modules/pg');
import { execSync } from 'child_process';

const PROD_REF = 'lpbdwmpglwdedqdiovqu';

function getCliAccessToken() {
  const out = execSync('powershell -ExecutionPolicy Bypass -File "C:/Users/PC/Desktop/naani-main/scripts/read_cli_token.ps1"', { encoding: 'utf8' });
  return out.trim();
}

async function getPgClient() {
  const token = getCliAccessToken();
  const roleRes = await fetch(`https://api.supabase.com/v1/projects/${PROD_REF}/cli/login-role`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ read_only: false })
  });
  const roleData = await roleRes.json();
  if (roleData.error) throw new Error(`Failed to acquire DB role: ${JSON.stringify(roleData)}`);

  const client = new pg.Client({
    host: `db.${PROD_REF}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: roleData.role,
    password: roleData.password,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  await client.query('SET ROLE postgres;');
  return client;
}

async function runAudit() {
  const client = await getPgClient();
  console.log('Connected to PostgreSQL on', PROD_REF);

  try {
    // -------------------------------------------------------------
    // PART 1: INSPECT has_role FUNCTION
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('1. INSPECT has_role FUNCTION');
    console.log('=============================================================');

    const fnInfo = await client.query(`
      SELECT 
        p.oid,
        p.proname,
        n.nspname AS schema_name,
        pg_get_function_identity_arguments(p.oid) AS arguments,
        pg_get_function_result(p.oid) AS result_type,
        r.rolname AS owner_name,
        p.prosecdef AS is_security_definer,
        p.proconfig AS configuration_settings,
        p.proacl AS raw_acl,
        pg_get_functiondef(p.oid) AS definition
      FROM pg_proc p
      JOIN pg_namespace n ON p.pronamespace = n.oid
      JOIN pg_roles r ON p.proowner = r.oid
      WHERE p.proname = 'has_role';
    `);

    console.log('Functions found count:', fnInfo.rows.length);
    fnInfo.rows.forEach((fn) => {
      console.log('Name:               ', fn.proname);
      console.log('Schema:             ', fn.schema_name);
      console.log('Arguments:          ', fn.arguments);
      console.log('Result Type:        ', fn.result_type);
      console.log('Owner:              ', fn.owner_name);
      console.log('Security Definer:   ', fn.is_security_definer);
      console.log('Config Settings:    ', fn.configuration_settings);
      console.log('Raw ACL:            ', fn.raw_acl);
      console.log('\n--- Function SQL Definition ---');
      console.log(fn.definition);
    });

    const perms = await client.query(`
      SELECT routine_schema, routine_name, grantee, privilege_type, is_grantable
      FROM information_schema.routine_privileges
      WHERE routine_name = 'has_role' AND routine_schema = 'public';
    `);
    console.log('\nRoutine Privileges (information_schema):');
    perms.rows.forEach(p => {
      console.log(`  - Grantee: ${p.grantee.padEnd(20)} | Privilege: ${p.privilege_type} | Grantable: ${p.is_grantable}`);
    });

    // Check has_role permission check specifically for anon
    const anonCanExec = await client.query(`
      SELECT has_function_privilege('anon', 'public.has_role(uuid, public.app_role)', 'EXECUTE') as anon_execute,
             has_function_privilege('authenticated', 'public.has_role(uuid, public.app_role)', 'EXECUTE') as auth_execute,
             has_function_privilege('service_role', 'public.has_role(uuid, public.app_role)', 'EXECUTE') as service_execute;
    `);
    console.log('\nhas_function_privilege results:');
    console.log('  anon execute:         ', anonCanExec.rows[0].anon_execute);
    console.log('  authenticated execute:', anonCanExec.rows[0].auth_execute);
    console.log('  service_role execute: ', anonCanExec.rows[0].service_execute);

    // -------------------------------------------------------------
    // PART 2: RLS POLICY ON projects
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('2. PROJECTS RLS POLICIES & BEHAVIOR');
    console.log('=============================================================');

    const pols = await client.query(`
      SELECT policyname, permissive, roles, cmd, qual, with_check
      FROM pg_policies
      WHERE schemaname = 'public' AND tablename = 'projects';
    `);
    pols.rows.forEach(p => {
      console.log(`[${p.cmd}] Policy: "${p.policyname}" | Roles: ${p.roles}`);
      console.log(`  USING: ${p.qual}`);
      if (p.with_check) console.log(`  WITH CHECK: ${p.with_check}`);
    });

    // Check app_role enum values
    const appRoleEnum = await client.query(`
      SELECT enumlabel FROM pg_enum e
      JOIN pg_type t ON e.enumtypid = t.oid
      WHERE t.typname = 'app_role'
      ORDER BY enumsortorder;
    `);
    console.log('\napp_role enum values:', appRoleEnum.rows.map(r => r.enumlabel));

    // Check user_roles table schema and count
    const userRolesCount = await client.query(`SELECT count(*) FROM public.user_roles;`);
    console.log('user_roles row count:', userRolesCount.rows[0].count);

    // -------------------------------------------------------------
    // PART 3: SIMULATING RLS BEHAVIOR IN ROLLBACK TRANSACTION
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('3. TRANSACTION-BASED RLS SIMULATION (STRICTLY ROLLBACK)');
    console.log('=============================================================');

    // Begin a transaction we will ALWAYS rollback
    await client.query('BEGIN;');

    // Insert a temporary test draft project and test published project inside transaction
    const testDraftSlug = 'test-audit-draft-' + Date.now();
    const testPubSlug = 'test-audit-published-' + Date.now();

    await client.query(`
      INSERT INTO public.projects (slug, name, publish_status, featured)
      VALUES 
        ('${testDraftSlug}', 'Audit Test Draft Project', 'draft', false),
        ('${testPubSlug}', 'Audit Test Published Project', 'published', false);
    `);
    console.log('Temporarily inserted 1 draft and 1 published project within transaction.');

    // Test 1: Query as postgres / superuser
    const superRes = await client.query(`
      SELECT slug, publish_status FROM public.projects 
      WHERE slug IN ('${testDraftSlug}', '${testPubSlug}');
    `);
    console.log('\n--- Test 3.1: Superuser (postgres) query ---');
    console.log(`Found ${superRes.rows.length} rows (expected 2):`, superRes.rows.map(r => `${r.slug} (${r.publish_status})`));

    // Test 2: Query as anon
    console.log('\n--- Test 3.2: Anonymous (anon) query simulation ---');
    try {
      await client.query(`SET LOCAL ROLE anon;`);
      await client.query(`SET LOCAL "request.jwt.claim.role" = 'anon';`);
      // Note: when anon, auth.uid() is NULL
      const anonRes = await client.query(`
        SELECT slug, publish_status FROM public.projects 
        WHERE slug IN ('${testDraftSlug}', '${testPubSlug}');
      `);
      console.log(`Anon query returned ${anonRes.rows.length} rows:`, anonRes.rows.map(r => `${r.slug} (${r.publish_status})`));
      
      const canSeePub = anonRes.rows.some(r => r.slug === testPubSlug);
      const canSeeDraft = anonRes.rows.some(r => r.slug === testDraftSlug);
      console.log('  -> Anonymous can see published project:', canSeePub);
      console.log('  -> Anonymous can see draft project:    ', canSeeDraft);
    } catch (anonErr) {
      console.log('  -> Anon query raised error:', anonErr.message);
    } finally {
      await client.query(`SET LOCAL ROLE postgres;`);
    }

    // Test 3: Query as authenticated non-admin
    console.log('\n--- Test 3.3: Authenticated non-admin query simulation ---');
    const mockNormalUserId = '11111111-1111-1111-1111-111111111111';
    try {
      await client.query(`SET LOCAL ROLE authenticated;`);
      await client.query(`SET LOCAL "request.jwt.claim.role" = 'authenticated';`);
      await client.query(`SET LOCAL "request.jwt.claim.sub" = '${mockNormalUserId}';`);
      
      const authRes = await client.query(`
        SELECT slug, publish_status FROM public.projects 
        WHERE slug IN ('${testDraftSlug}', '${testPubSlug}');
      `);
      console.log(`Non-admin query returned ${authRes.rows.length} rows:`, authRes.rows.map(r => `${r.slug} (${r.publish_status})`));
      
      const canSeePub = authRes.rows.some(r => r.slug === testPubSlug);
      const canSeeDraft = authRes.rows.some(r => r.slug === testDraftSlug);
      console.log('  -> Authenticated non-admin can see published project:', canSeePub);
      console.log('  -> Authenticated non-admin can see draft project:    ', canSeeDraft);
    } catch (authErr) {
      console.log('  -> Non-admin query raised error:', authErr.message);
    } finally {
      await client.query(`SET LOCAL ROLE postgres;`);
    }

    // Test 4: Query as authenticated admin
    console.log('\n--- Test 3.4: Authenticated admin query simulation ---');
    const mockAdminUserId = '22222222-2222-2222-2222-222222222222';
    try {
      // Temporarily give mockAdminUserId admin role in user_roles
      await client.query(`
        INSERT INTO public.user_roles (user_id, role)
        VALUES ('${mockAdminUserId}', 'admin');
      `);

      await client.query(`SET LOCAL ROLE authenticated;`);
      await client.query(`SET LOCAL "request.jwt.claim.role" = 'authenticated';`);
      await client.query(`SET LOCAL "request.jwt.claim.sub" = '${mockAdminUserId}';`);
      
      const adminRes = await client.query(`
        SELECT slug, publish_status FROM public.projects 
        WHERE slug IN ('${testDraftSlug}', '${testPubSlug}');
      `);
      console.log(`Admin query returned ${adminRes.rows.length} rows:`, adminRes.rows.map(r => `${r.slug} (${r.publish_status})`));
      
      const canSeePub = adminRes.rows.some(r => r.slug === testPubSlug);
      const canSeeDraft = adminRes.rows.some(r => r.slug === testDraftSlug);
      console.log('  -> Admin can see published project:', canSeePub);
      console.log('  -> Admin can see draft project:    ', canSeeDraft);
    } catch (adminErr) {
      console.log('  -> Admin query raised error:', adminErr.message);
    } finally {
      await client.query(`SET LOCAL ROLE postgres;`);
    }

    // Always rollback the transaction so 0 rows are persisted!
    await client.query('ROLLBACK;');
    console.log('\n[SUCCESS] Transaction rolled back cleanly. 0 rows persisted.');

    // Verify count is still 238
    const finalCount = await client.query('SELECT count(*) FROM public.projects;');
    console.log('Final project count verified:', finalCount.rows[0].count);

  } catch (err) {
    console.error('Audit exception:', err);
    try { await client.query('ROLLBACK;'); } catch {}
  } finally {
    await client.end();
  }
}

runAudit();
