import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pg = require('C:/Users/PC/Desktop/naani-main/naani-main/node_modules/pg');
import { execSync } from 'child_process';

const PROD_REF = 'lpbdwmpglwdedqdiovqu';

function getCliAccessToken() {
  const out = execSync('powershell -ExecutionPolicy Bypass -File "../scripts/read_cli_token.ps1"', { encoding: 'utf8' });
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

(async () => {
  try {
    const client = await getPgClient();
    console.log('Connected to db.lpbdwmpglwdedqdiovqu.supabase.co as postgres role');

    // 1. List public tables
    const tablesRes = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Public tables on lpbdwmpglwdedqdiovqu:');
    tablesRes.rows.forEach(r => console.log('  -', r.table_name));

    // 2. Check if 'projects' table exists on lpbdwmpglwdedqdiovqu
    const hasProjects = tablesRes.rows.some(r => r.table_name === 'projects');
    console.log('\nHas "projects" table on lpbdwmpglwdedqdiovqu:', hasProjects);

    if (hasProjects) {
      const projCount = await client.query('SELECT count(*) FROM public.projects;');
      console.log('Projects count on lpbdwmpglwdedqdiovqu:', projCount.rows[0].count);

      const sampleProjects = await client.query('SELECT slug, name, location FROM public.projects LIMIT 5;');
      console.log('Sample projects:', sampleProjects.rows);
    }

    // 3. Check migration history table
    const migHist = await client.query(`
      SELECT version FROM supabase_migrations.schema_migrations ORDER BY version;
    `);
    console.log('\nsupabase_migrations.schema_migrations on lpbdwmpglwdedqdiovqu:');
    migHist.rows.forEach(r => console.log('  -', r.version));

    await client.end();
  } catch (err) {
    console.error('Error:', err);
  }
})();
