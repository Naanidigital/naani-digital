import fs from 'fs';
import path from 'path';

function inspectFullPage(filename) {
  const filePath = path.resolve('naani-main/src/pages', filename);
  const text = fs.readFileSync(filePath, 'utf8');
  console.log(`\n======================================================`);
  console.log(`PAGE: ${filename}`);
  console.log(`======================================================`);

  // Extract structuredData if present
  const sdMatch = text.match(/const\s+structuredData\s*=\s*(\{[\s\S]*?\n\s*\});/);
  if (sdMatch) {
    console.log('[structuredData]:\n', sdMatch[1].substring(0, 1500));
  }

  // Extract schemaJson if present
  const schemaMatch = text.match(/const\s+schemaJson\s*=\s*(\{[\s\S]*?\n\s*\});/);
  if (schemaMatch) {
    console.log('[schemaJson]:\n', schemaMatch[1].substring(0, 1500));
  }

  // Extract FAQs
  const faqMatch = text.match(/(?:const\s+faqs|const\s+FAQ_ITEMS|const\s+faqsList)\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (faqMatch) {
    console.log('[faqs snippet]:\n', faqMatch[1].substring(0, 800));
  }

  // Extract configurations / specs / pricing
  const specsMatch = text.match(/(?:const\s+specs|const\s+PROJECT_SPECS|const\s+specifications)\s*=\s*(\{[\s\S]*?\n\s*\});/);
  if (specsMatch) {
    console.log('[specs snippet]:\n', specsMatch[1].substring(0, 800));
  }
}

['RiseWith9Page.tsx', 'LinqByRaghavaPage.tsx', 'CandeurEterniaPage.tsx', 'GodrejKukatpallyPage.tsx', 'NeoTowersPage.tsx', 'TrumpTowersHyderabadPage.tsx'].forEach(inspectFullPage);
