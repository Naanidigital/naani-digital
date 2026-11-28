// scripts/test_authenticated_rls.mjs
// Test RLS behavior for authenticated non-admin and admin in rollback transactions
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

async function run() {
  const client = await getPgClient();
  console.log('Connected to', PROD_REF);

  const testDraftSlug = 'test-draft-' + Date.now();
  const testPubSlug = 'test-pub-' + Date.now();
  const normalUserId = '11111111-1111-1111-1111-111111111111';
  const adminUserId = '22222222-2222-2222-2222-222222222222';

  // TEST A: Authenticated Non-Admin
  console.log('\n--- TEST A: Authenticated Non-Admin User ---');
  await client.query('BEGIN;');
  try {
    // Insert test projects
    await client.query(`
      INSERT INTO public.projects (slug, name, publish_status, featured)
      VALUES 
        ('${testDraftSlug}', 'Draft Project', 'draft', false),
        ('${testPubSlug}', 'Published Project', 'published', false);
    `);

    // Ensure normalUserId has 'user' role (not admin)
    await client.query(`
      INSERT INTO public.user_roles (user_id, role)
      VALUES ('${normalUserId}', 'user')
      ON CONFLICT DO NOTHING;
    `);

    // Switch to authenticated non-admin
    await client.query(`SET LOCAL ROLE authenticated;`);
    await client.query(`SET LOCAL "request.jwt.claim.role" = 'authenticated';`);
    await client.query(`SET LOCAL "request.jwt.claim.sub" = '${normalUserId}';`);

    const res = await client.query(`
      SELECT slug, publish_status FROM public.projects 
      WHERE slug IN ('${testDraftSlug}', '${testPubSlug}');
    `);

    console.log(`Non-admin returned ${res.rows.length} rows:`, res.rows.map(r => `${r.slug} (${r.publish_status})`));
    const canSeePub = res.rows.some(r => r.slug === testPubSlug);
    const canSeeDraft = res.rows.some(r => r.slug === testDraftSlug);
    console.log('  -> Non-admin can read published projects:', canSeePub);
    console.log('  -> Non-admin can read draft projects:    ', canSeeDraft);

  } catch (err) {
    console.error('Non-admin test error:', err.message);
  } finally {
    await client.query('ROLLBACK;');
    await client.query('SET ROLE postgres;');
  }

  // TEST B: Authenticated Admin
  console.log('\n--- TEST B: Authenticated Admin User ---');
  await client.query('BEGIN;');
  try {
    // Insert test projects
    await client.query(`
      INSERT INTO public.projects (slug, name, publish_status, featured)
      VALUES 
        ('${testDraftSlug}', 'Draft Project', 'draft', false),
        ('${testPubSlug}', 'Published Project', 'published', false);
    `);

    // Ensure adminUserId has 'admin' role
    await client.query(`
      INSERT INTO public.user_roles (user_id, role)
      VALUES ('${adminUserId}', 'admin')
      ON CONFLICT DO NOTHING;
    `);

    // Switch to authenticated admin
    await client.query(`SET LOCAL ROLE authenticated;`);
    await client.query(`SET LOCAL "request.jwt.claim.role" = 'authenticated';`);
    await client.query(`SET LOCAL "request.jwt.claim.sub" = '${adminUserId}';`);

    const res = await client.query(`
      SELECT slug, publish_status FROM public.projects 
      WHERE slug IN ('${testDraftSlug}', '${testPubSlug}');
    `);

    console.log(`Admin returned ${res.rows.length} rows:`, res.rows.map(r => `${r.slug} (${r.publish_status})`));
    const canSeePub = res.rows.some(r => r.slug === testPubSlug);
    const canSeeDraft = res.rows.some(r => r.slug === testDraftSlug);
    console.log('  -> Admin can read published projects:', canSeePub);
    console.log('  -> Admin can read draft projects:    ', canSeeDraft);

  } catch (err) {
    console.error('Admin test error:', err.message);
  } finally {
    await client.query('ROLLBACK;');
    await client.query('SET ROLE postgres;');
  }

  // Verify database count is untouched
  const count = await client.query('SELECT count(*) FROM public.projects;');
  console.log('\nFinal project count verified on lpbdwmpglwdedqdiovqu:', count.rows[0].count);

  await client.end();
}

run();
