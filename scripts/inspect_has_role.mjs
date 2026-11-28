import { execSync } from 'child_process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pg = require('C:/Users/PC/Desktop/naani-main/naani-main/node_modules/pg');

function getCliAccessToken() {
  const out = execSync('powershell -ExecutionPolicy Bypass -File "C:/Users/PC/Desktop/naani-main/scripts/read_cli_token.ps1"', { encoding: 'utf8' });
  return out.trim();
}

async function inspectHasRole() {
  const token = getCliAccessToken();
  const roleRes = await fetch(`https://api.supabase.com/v1/projects/lpbdwmpglwdedqdiovqu/cli/login-role`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ read_only: false })
  });
  const roleData = await roleRes.json();

  const client = new pg.Client({
    host: `db.lpbdwmpglwdedqdiovqu.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: roleData.role,
    password: roleData.password,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  await client.query('SET ROLE postgres;');
  await client.query('SET default_transaction_read_only = on;');
  await client.query('BEGIN READ ONLY;');

  const fnRes = await client.query(`
    SELECT p.proname, n.nspname, pg_get_functiondef(p.oid) as def,
           p.prosecdef, p.proacl
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE p.proname = 'has_role';
  `);
  console.log('has_role functions found:', fnRes.rows.length);
  fnRes.rows.forEach(r => {
    console.log(`Schema: ${r.nspname} | SecDef: ${r.prosecdef} | ACL: ${r.proacl}`);
    console.log(`Definition:\n${r.def}`);
  });

  // Check grant on has_role to public / anon
  const perms = await client.query(`
    SELECT routine_schema, routine_name, grantee, privilege_type
    FROM information_schema.routine_privileges
    WHERE routine_name = 'has_role';
  `);
  console.log('Privileges on has_role:', perms.rows);

  await client.query('ROLLBACK;');
  await client.end();
}

inspectHasRole();
