import fs from 'fs';
import path from 'path';

const locationsToTest = [
  'tellapur',
  'kokapet',
  'gachibowli',
  'financial-district',
  'bachupally',
  'narsingi',
  'miyapur',
  'kukatpally',
  'manikonda',
  'nanakramguda',
  'hi-tech-city',
  'neopolis'
];

const distDir = path.resolve(process.cwd(), 'dist');

console.log('===========================================================');
console.log('AUTOMATED INDEXABILITY & PRERENDER AUDIT (DIST FOLDER)');
console.log('===========================================================');

let passCount = 0;
let failCount = 0;

for (const loc of locationsToTest) {
  const routePath = `projects-in-${loc}`;
  const indexPath = path.join(distDir, routePath, 'index.html');

  console.log(`\nTesting route: /${routePath}`);

  if (!fs.existsSync(indexPath)) {
    console.error(`❌ FAIL: File not found at ${indexPath}`);
    failCount++;
    continue;
  }

  const html = fs.readFileSync(indexPath, 'utf-8');

  // 1. Check for robots meta tag
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  const robotsVal = robotsMatch ? robotsMatch[1] : 'NONE';
  const hasNoIndex = html.includes('noindex');

  if (robotsVal.includes('index') && !robotsVal.includes('noindex') && !hasNoIndex) {
    console.log(`  ✅ Robots Meta: "${robotsVal}" (INDEXABLE)`);
  } else {
    console.error(`  ❌ FAIL Robots Meta: "${robotsVal}" | contains noindex: ${hasNoIndex}`);
    failCount++;
  }

  // 2. Check canonical tag
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const expectedCanonical = `https://www.naani.in/projects-in-${loc}`;
  if (canonicalMatch && canonicalMatch[1] === expectedCanonical) {
    console.log(`  ✅ Canonical: "${canonicalMatch[1]}"`);
  } else {
    console.error(`  ❌ FAIL Canonical: Expected "${expectedCanonical}", found "${canonicalMatch ? canonicalMatch[1] : 'NONE'}"`);
    failCount++;
  }

  // 3. Check for H1 tag
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    console.log(`  ✅ H1 Heading: Present`);
  } else {
    console.error(`  ❌ FAIL H1 Heading: Missing in pre-rendered HTML`);
    failCount++;
  }

  // 4. Check for JSON-LD schemas (BreadcrumbList & WebPage)
  const hasBreadcrumbSchema = html.includes('"@type": "BreadcrumbList"');
  const hasWebPageSchema = html.includes('"@type": "WebPage"');
  if (hasBreadcrumbSchema && hasWebPageSchema) {
    console.log(`  ✅ JSON-LD Schemas: BreadcrumbList & WebPage present`);
  } else {
    console.error(`  ❌ FAIL JSON-LD Schemas: BreadcrumbList (${hasBreadcrumbSchema}), WebPage (${hasWebPageSchema})`);
    failCount++;
  }

  passCount++;
}

console.log('\n===========================================================');
console.log(`SUMMARY: ${passCount} Passed, ${failCount} Failed.`);
console.log('===========================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
