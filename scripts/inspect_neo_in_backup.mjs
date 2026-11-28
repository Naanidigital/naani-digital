import fs from 'fs';
import path from 'path';

const backupPath = path.resolve('naani-main/supabase/backups/projects_backup_live_hadxpgwzmvxqslcyykyw_20261121.json');
const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8').replace(/^\uFEFF/, ''));

const neo = backup.find(p => p.slug === 'neo-by-yula-globus');
console.log('neo-by-yula-globus in backup:', JSON.stringify(neo, null, 2));
