// naani-main/scripts/test_direct_connection.mjs
import pg from 'pg';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getAccessToken() {
  const psPath = path.resolve(__dirname, '../../scripts/read_cli_token.ps1');
  const out = execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { encoding: 'utf8' });
  return out.trim();
}

async function testConnection() {
  const token = getAccessToken();
  console.log('Access token acquired in memory (len=' + token.length + ')');

  // Request temporary login role for staging project bhwoenqfxbgkbrsmahjt
  const roleRes = await fetch('https://api.supabase.com/v1/projects/bhwoenqfxbgkbrsmahjt/cli/login-role', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ read_only: false })
  });
  const roleData = await roleRes.json();
  console.log('Login role created:', roleData.role, 'ttl:', roleData.ttl_seconds);

  // Test direct connection
  console.log('\n--- Testing Direct DB Connection (db.bhwoenqfxbgkbrsmahjt.supabase.co:5432) ---');
  const directClient = new Client({
    host: 'db.bhwoenqfxbgkbrsmahjt.supabase.co',
    port: 5432,
    database: 'postgres',
    user: roleData.role,
    password: roleData.password,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000
  });

  try {
    await directClient.connect();
    const res = await directClient.query('SELECT version(), current_user, current_database()');
    console.log('[SUCCESS] Connected directly to PostgreSQL:');
    console.log('  Database:', res.rows[0].current_database);
    console.log('  User:    ', res.rows[0].current_user);
    console.log('  Version: ', res.rows[0].version.split(' ')[0], res.rows[0].version.split(' ')[1]);
    await directClient.end();
    return;
  } catch (err) {
    console.log('[DIRECT FAILED]', err.message);
  }

  // Test pooler connection
  console.log('\n--- Testing Pooler Connection (aws-1-ap-northeast-1.pooler.supabase.com:6543) ---');
  const poolerClient = new Client({
    host: 'aws-1-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: `${roleData.role}.bhwoenqfxbgkbrsmahjt`,
    password: roleData.password,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000
  });

  try {
    await poolerClient.connect();
    const res = await poolerClient.query('SELECT version(), current_user, current_database()');
    console.log('[SUCCESS] Connected via Pooler to PostgreSQL:');
    console.log('  Database:', res.rows[0].current_database);
    console.log('  User:    ', res.rows[0].current_user);
    await poolerClient.end();
  } catch (err) {
    console.log('[POOLER FAILED]', err.message);
  }
}

testConnection().catch(console.error);
