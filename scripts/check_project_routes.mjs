import fs from 'fs';
import path from 'path';

const appPath = path.resolve('naani-main/src/App.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

// Match all Route tags
const routeRegex = /<Route\s+path=["']([^"']+)["']\s+element=\{<([^ />]+)(?:[^>]*)?\/>\}/g;
let match;
const routes = [];
while ((match = routeRegex.exec(appContent)) !== null) {
  routes.push({ path: match[1], component: match[2] });
}

console.log(`Total routes in App.tsx: ${routes.length}`);
const projectRoutes = routes.filter(r => r.path.startsWith('/projects/'));
console.log(`Project routes count: ${projectRoutes.length}`);

// Compare with backup
const backupPath = path.resolve('naani-main/supabase/backups/projects_backup_live_hadxpgwzmvxqslcyykyw_20261121.json');
const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8').replace(/^\uFEFF/, ''));
const backupSlugs = new Set(backup.map(p => p.slug));

console.log('\n--- Route vs Backup Comparison ---');
for (const r of projectRoutes) {
  if (r.path === '/projects/:slug') continue;
  const slug = r.path.replace('/projects/', '');
  const inBackup = backupSlugs.has(slug);
  console.log(`${r.path.padEnd(55)} -> Component: ${r.component.padEnd(25)} -> In DB Backup? ${inBackup}`);
}
