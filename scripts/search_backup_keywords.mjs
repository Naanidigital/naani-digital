import fs from 'fs';
import path from 'path';

const backupPath = path.resolve('naani-main/supabase/backups/projects_backup_live_hadxpgwzmvxqslcyykyw_20261121.json');
const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8').replace(/^\uFEFF/, ''));

const keywords = ['eternia', 'godrej', 'neo', 'trump', 'rise with 9', 'linq', 'raghava', 'candeur', 'ira'];

for (const kw of keywords) {
  const matches = backup.filter(p => {
    const s = `${p.slug} ${p.name} ${p.builder} ${p.location}`.toLowerCase();
    return s.includes(kw);
  });
  console.log(`\nKeyword: "${kw}" -> ${matches.length} matches:`);
  matches.forEach(m => console.log(`  - slug: ${m.slug.padEnd(40)} | name: ${m.name.padEnd(30)} | builder: ${m.builder}`));
}
