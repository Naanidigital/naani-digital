import fs from 'fs';
import path from 'path';

const files = ['SanviManidweepaShikaramPage.tsx', 'SanviKowsalyaAvaniPage.tsx', 'SanviKowsalyaVasudhaPage.tsx'];

for (const f of files) {
  const filePath = path.resolve('naani-main/src/pages', f);
  const text = fs.readFileSync(filePath, 'utf8');
  console.log(`\n--- ${f} ---`);
  const lines = text.split('\n');
  const imports = lines.filter(l => l.includes('import ') && l.includes('assets/'));
  console.log('Asset imports:', imports);
  const seo = lines.filter(l => l.includes('title=') || l.includes('description='));
  console.log('SEO lines:', seo);
}
