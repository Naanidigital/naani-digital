import fs from 'fs';
import path from 'path';

const pages = [
  'RiseWith9Page.tsx',
  'LinqByRaghavaPage.tsx',
  'CandeurEterniaPage.tsx',
  'GodrejKukatpallyPage.tsx',
  'NeoTowersPage.tsx',
  'TrumpTowersHyderabadPage.tsx'
];

for (const p of pages) {
  const filePath = path.resolve('naani-main/src/pages', p);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${p}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n================= ${p} =================`);
  console.log(`Size: ${content.length} characters`);
  
  // Extract project meta if present
  const lines = content.split('\n');
  const preview = lines.slice(0, 50).join('\n');
  console.log('Preview (first 50 lines):');
  console.log(preview.substring(0, 1000));
}
