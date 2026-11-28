import fs from 'fs';
import path from 'path';

const backupPath = path.resolve('naani-main/supabase/backups/projects_backup_live_hadxpgwzmvxqslcyykyw_20261121.json');
const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8').replace(/^\uFEFF/, ''));

console.log('Auditing backup records for completeness...');
const incomplete = [];

for (const p of backup) {
  const issues = [];
  if (!p.name) issues.push('Missing name');
  if (!p.builder) issues.push('Missing builder');
  if (!p.location) issues.push('Missing location');
  if (!p.city) issues.push('Missing city');
  if (!p.description) issues.push('Missing description');
  if (!p.hero_image) {
    issues.push('Missing hero_image');
  } else if (p.hero_image.includes('/__l5e/assets-v1/placeholder/')) {
    issues.push('Placeholder hero_image (' + p.hero_image + ')');
  }
  if (!p.price_range && !p.min_price_inr) issues.push('Missing price');
  if (!p.amenities || p.amenities.length === 0) issues.push('Empty amenities');
  if (!p.faqs || p.faqs.length === 0) issues.push('Empty faqs');

  if (issues.length > 0) {
    incomplete.push({
      id: p.id,
      slug: p.slug,
      name: p.name,
      issues
    });
  }
}

console.log(`Total records in backup: ${backup.length}`);
console.log(`Total incomplete records: ${incomplete.length}`);

// Group by issue type
const issueCounts = {};
for (const item of incomplete) {
  for (const iss of item.issues) {
    const key = iss.split(' (')[0];
    issueCounts[key] = (issueCounts[key] || 0) + 1;
  }
}
console.log('Issues breakdown:', issueCounts);

// Sample incomplete records
console.log('\nSample 5 incomplete records:');
console.log(JSON.stringify(incomplete.slice(0, 5), null, 2));
