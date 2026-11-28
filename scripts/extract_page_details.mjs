import fs from 'fs';
import path from 'path';

function inspectFile(filename) {
  const fullPath = path.resolve('naani-main/src/pages', filename);
  const text = fs.readFileSync(fullPath, 'utf8');
  console.log(`\n======================================================`);
  console.log(`INSPECTING: ${filename}`);
  console.log(`======================================================`);

  // Look for SEOHead
  const seoMatch = text.match(/<SEOHead[\s\S]*?\/>/);
  if (seoMatch) {
    console.log('[SEOHead]:\n', seoMatch[0]);
  }

  // Look for JSON-LD schemas
  const jsonLdMatch = text.match(/dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(([\s\S]*?)\)\s*\}\}/);
  if (jsonLdMatch) {
    console.log('[JSON-LD snippet found]');
  }

  // Look for constants like PROJECT_NAME, RERA, DEVELOPER, etc.
  const consts = text.match(/const\s+([A-Z0-9_]+)\s*=\s*([^;]+);/g);
  if (consts) {
    console.log('[Constants]:\n', consts.slice(0, 15).join('\n'));
  }
}

['RiseWith9Page.tsx', 'LinqByRaghavaPage.tsx', 'CandeurEterniaPage.tsx', 'GodrejKukatpallyPage.tsx', 'NeoTowersPage.tsx', 'TrumpTowersHyderabadPage.tsx'].forEach(inspectFile);
