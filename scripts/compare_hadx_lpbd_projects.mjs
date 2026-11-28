import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { execSync } from "child_process";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pg = require('C:/Users/PC/Desktop/naani-main/naani-main/node_modules/pg');

const hadxUrl = "https://hadxpgwzmvxqslcyykyw.supabase.co";
const dotenv = fs.readFileSync(".env", "utf8");
let hadxKey = "";

dotenv.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed.startsWith("VITE_SUPABASE_PUBLISHABLE_KEY=")) {
    hadxKey = trimmed.split("=")[1].replace(/^["']|["']$/g, "");
  }
});

function getCliAccessToken() {
  const out = execSync('powershell -ExecutionPolicy Bypass -File "C:/Users/PC/Desktop/naani-main/scripts/read_cli_token.ps1"', { encoding: 'utf8' });
  return out.trim();
}

async function getLpbdClient() {
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
  return client;
}

async function compareProjects() {
  const hadxClient = createClient(hadxUrl, hadxKey);
  const { data: hadxProjects } = await hadxClient
    .from("projects")
    .select("id, slug, name, publish_status")
    .limit(1000);

  const hadxSlugs = new Set((hadxProjects || []).map(p => p.slug));

  const lpbd = await getLpbdClient();
  const lpbdRes = await lpbd.query("SELECT id, slug, name, publish_status, source FROM public.projects;");
  const lpbdProjects = lpbdRes.rows;
  await lpbd.end();

  console.log(`HADX projects: ${hadxProjects.length}`);
  console.log(`LPBD projects: ${lpbdProjects.length}`);

  const inLpbdNotInHadx = lpbdProjects.filter(p => !hadxSlugs.has(p.slug));
  console.log(`In LPBD but NOT in HADX (${inLpbdNotInHadx.length}):`);
  inLpbdNotInHadx.forEach(p => console.log(`  - ${p.slug} (${p.publish_status}) [source: ${p.source}]`));

  const lpbdSlugs = new Set(lpbdProjects.map(p => p.slug));
  const inHadxNotInLpbd = hadxProjects.filter(p => !lpbdSlugs.has(p.slug));
  console.log(`In HADX but NOT in LPBD (${inHadxNotInLpbd.length}):`);
  inHadxNotInLpbd.forEach(p => console.log(`  - ${p.slug} (${p.publish_status})`));
}

compareProjects();
