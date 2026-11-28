import fs from 'fs';
import path from 'path';

const text = fs.readFileSync(path.resolve('naani-main/src/pages/TrumpTowersHyderabadPage.tsx'), 'utf8');

// match faqs
const faqMatch = text.match(/(?:const\s+faqs|const\s+FAQ_ITEMS|const\s+FAQS)\s*=\s*(\[[\s\S]*?\n\s*\]);/);
if (faqMatch) {
  console.log('[Trump faqs snippet]:\n', faqMatch[1].substring(0, 1000));
}

// look for structured data / schema
const schemaMatch = text.match(/const\s+schemaJson\s*=\s*(\{[\s\S]*?\n\s*\});/);
if (schemaMatch) {
  console.log('[Trump schemaJson]:\n', schemaMatch[1].substring(0, 1000));
}
