import fs from 'fs';
import path from 'path';
import { parseMigrationSql } from './test_migration_parser.mjs';

const dir = path.resolve('naani-main/supabase/migrations');
const files = [
  '20261011000000_add_canny_aravindam.sql',
  '20261112000000_add_candeur_arbora.sql',
  '20261113000000_update_aparna_serenity.sql',
  '20261113000001_update_cybercity_stone_ridge.sql',
  '20261113000002_update_vasavi_atlantis.sql',
  '20261113000003_update_pavani_starlit.sql',
  '20261115000000_add_pavani_felicity.sql',
  '20261115000001_add_pavani_mirai.sql',
  '20261115000002_add_urbanrise_on_cloud_33.sql',
  '20261115000003_add_urbanrise_sky_habitat.sql'
];

for (const f of files) {
  const p = parseMigrationSql(path.join(dir, f));
  if (!p) {
    console.error(`Failed to parse ${f}`);
  } else {
    console.log(`Parsed ${f} -> slug: ${p.slug} | name: ${p.name} | builder: ${p.builder} | bhk: ${JSON.stringify(p.bhk_list)}`);
  }
}
