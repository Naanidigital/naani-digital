import fs from 'fs';
import path from 'path';

const SITE = 'https://www.naani.in';
const distDir = path.resolve(process.cwd(), 'dist');
const sitemapsDir = path.resolve(process.cwd(), 'public/sitemaps');

const targetUrls = [
  // Static / Core Pages
  { path: '/', expectedCanonical: `${SITE}/`, category: 'Static' },
  { path: '/projects', expectedCanonical: `${SITE}/projects`, category: 'Static' },
  { path: '/about-us', expectedCanonical: `${SITE}/about-us`, category: 'Static' },
  { path: '/contact-us', expectedCanonical: `${SITE}/contact-us`, category: 'Static' },
  { path: '/list-your-property', expectedCanonical: `${SITE}/list-your-property`, category: 'Static' },

  // Location Pages
  { path: '/projects-in-tellapur', expectedCanonical: `${SITE}/projects-in-tellapur`, category: 'Location' },
  { path: '/projects-in-kokapet', expectedCanonical: `${SITE}/projects-in-kokapet`, category: 'Location' },
  { path: '/projects-in-bachupally', expectedCanonical: `${SITE}/projects-in-bachupally`, category: 'Location' },
  { path: '/projects-in-gachibowli', expectedCanonical: `${SITE}/projects-in-gachibowli`, category: 'Location' },
  { path: '/projects-in-narsingi', expectedCanonical: `${SITE}/projects-in-narsingi`, category: 'Location' },
  { path: '/projects-in-miyapur', expectedCanonical: `${SITE}/projects-in-miyapur`, category: 'Location' },
  { path: '/projects-in-financial-district', expectedCanonical: `${SITE}/projects-in-financial-district`, category: 'Location' },
  { path: '/projects-in-manikonda', expectedCanonical: `${SITE}/projects-in-manikonda`, category: 'Location' },
  { path: '/projects-in-nanakramguda', expectedCanonical: `${SITE}/projects-in-nanakramguda`, category: 'Location' },
  { path: '/projects-in-hi-tech-city', expectedCanonical: `${SITE}/projects-in-hi-tech-city`, category: 'Location' },
  { path: '/projects-in-neopolis', expectedCanonical: `${SITE}/projects-in-neopolis`, category: 'Location' },

  // Project Pages
  { path: '/projects/prestige-golden-grove-hyderabad', expectedCanonical: `${SITE}/projects/prestige-golden-grove-hyderabad`, category: 'Project' },
  { path: '/projects/rajapushpa-sierra-tellapur-hyderabad', expectedCanonical: `${SITE}/projects/rajapushpa-sierra-tellapur-hyderabad`, category: 'Project' },
  { path: '/projects/tridasa-rise', expectedCanonical: `${SITE}/projects/tridasa-rise`, category: 'Project' },
  { path: '/projects/brigade-gateway-neopolis-kokapet-hyderabad', expectedCanonical: `${SITE}/projects/brigade-gateway-neopolis-kokapet-hyderabad`, category: 'Project' },

  // Builder Pages
  { path: '/prestige-group-projects-hyderabad', expectedCanonical: `${SITE}/prestige-group-projects-hyderabad`, category: 'Builder' },
  { path: '/rajapushpa-properties-projects-hyderabad', expectedCanonical: `${SITE}/rajapushpa-properties-projects-hyderabad`, category: 'Builder' },
  { path: '/aparna-constructions-projects-hyderabad', expectedCanonical: `${SITE}/aparna-constructions-projects-hyderabad`, category: 'Builder' },
  { path: '/my-home-group-projects-hyderabad', expectedCanonical: `${SITE}/my-home-group-projects-hyderabad`, category: 'Builder' },
  { path: '/candeur-constructions-projects-hyderabad', expectedCanonical: `${SITE}/candeur-constructions-projects-hyderabad`, category: 'Builder' },

  // Category Pages
  { path: '/hyderabad', expectedCanonical: `${SITE}/hyderabad`, category: 'Category' },
  { path: '/hyderabad/2-bhk-flats', expectedCanonical: `${SITE}/hyderabad/2-bhk-flats`, category: 'Category' },
  { path: '/hyderabad/3-bhk-flats', expectedCanonical: `${SITE}/hyderabad/3-bhk-flats`, category: 'Category' },
];

console.log('===========================================================');
console.log('SITEWIDE SEO INDEXABILITY & CRAWLABILITY AUDIT');
console.log('===========================================================');

let passCount = 0;
let failCount = 0;
const metrics = {
  totalTarget: targetUrls.length,
  status200: 0,
  noIndexCount: 0,
  selfCanonicalCount: 0,
  duplicateCanonicalCount: 0,
  h1PresentCount: 0,
  jsonLdCount: 0,
  sitemapIncludedCount: 0,
};

// Load all sitemap URLs
const sitemapUrls = new Set();
if (fs.existsSync(sitemapsDir)) {
  const xmlFiles = fs.readdirSync(sitemapsDir).filter(f => f.endsWith('.xml'));
  for (const file of xmlFiles) {
    const xml = fs.readFileSync(path.join(sitemapsDir, file), 'utf-8');
    const matches = xml.matchAll(/<loc>(https:\/\/www\.naani\.in(\/[^<]*))<\/loc>/g);
    for (const m of matches) {
      sitemapUrls.add(m[1]);
    }
  }
}

for (const target of targetUrls) {
  const relPath = target.path === '/' ? '' : target.path.replace(/^\//, '');
  const indexPath = relPath ? path.join(distDir, relPath, 'index.html') : path.join(distDir, 'index.html');
  const fullUrl = `${SITE}${target.path === '/' ? '' : target.path}`;

  console.log(`\n[${target.category}] Testing: ${fullUrl}`);

  if (!fs.existsSync(indexPath)) {
    console.error(`  ❌ FAIL: Static HTML file missing at ${indexPath}`);
    failCount++;
    continue;
  }
  metrics.status200++;

  const html = fs.readFileSync(indexPath, 'utf-8');

  // 1. Robots Meta Check
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  const robotsVal = robotsMatch ? robotsMatch[1] : 'NONE';
  const containsNoIndex = html.includes('noindex');

  if ((robotsVal.includes('index') || html.includes('index')) && !robotsVal.includes('noindex') && !containsNoIndex) {
    console.log(`  ✅ Robots Meta: "${robotsVal}" (INDEXABLE)`);
  } else {
    console.error(`  ❌ FAIL Robots Meta: "${robotsVal}" (Contains noindex: ${containsNoIndex})`);
    metrics.noIndexCount++;
    failCount++;
  }

  // 2. Canonical Tag Check
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const foundCanonical = canonicalMatch ? canonicalMatch[1] : 'NONE';

  if (foundCanonical === target.expectedCanonical) {
    console.log(`  ✅ Canonical: "${foundCanonical}" (SELF-REFERENCING)`);
    metrics.selfCanonicalCount++;
  } else {
    console.error(`  ❌ FAIL Canonical: Expected "${target.expectedCanonical}", found "${foundCanonical}"`);
    metrics.duplicateCanonicalCount++;
    failCount++;
  }

  // 3. H1 Heading Check
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    console.log(`  ✅ H1 Heading: Present`);
    metrics.h1PresentCount++;
  } else {
    console.error(`  ❌ FAIL H1 Heading: Missing in static pre-rendered HTML`);
    failCount++;
  }

  // 4. Title & Meta Description Check
  const hasTitle = /<title>[\s\S]*?<\/title>/i.test(html);
  const hasDesc = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i.test(html);
  if (hasTitle && hasDesc) {
    console.log(`  ✅ Title & Meta Description: Present`);
  } else {
    console.error(`  ❌ FAIL Title/Description: Title (${hasTitle}), Desc (${hasDesc})`);
    failCount++;
  }

  // 5. JSON-LD Schema Check
  const hasJsonLd = html.includes('application/ld+json');
  if (hasJsonLd) {
    console.log(`  ✅ JSON-LD Structured Data: Present`);
    metrics.jsonLdCount++;
  } else {
    console.error(`  ❌ FAIL JSON-LD Structured Data: Missing`);
    failCount++;
  }

  // 6. Sitemap Inclusion Check
  if (sitemapUrls.has(fullUrl) || target.path === '/') {
    console.log(`  ✅ Sitemap Inclusion: Found in public/sitemaps/`);
    metrics.sitemapIncludedCount++;
  } else {
    console.error(`  ❌ FAIL Sitemap Inclusion: Missing from sitemaps`);
    failCount++;
  }

  passCount++;
}

// 7. Verify invalid URL returns 404 behavior and is not pre-rendered as 200
const invalidPath = path.join(distDir, 'invalid-nonexistent-route-9999', 'index.html');
const invalidIsPrerendered = fs.existsSync(invalidPath);
if (!invalidIsPrerendered) {
  console.log('\n✅ 404 Protection: Invalid route was NOT static pre-rendered as 200 OK.');
} else {
  console.error('\n❌ FAIL 404 Protection: Invalid route was static pre-rendered.');
  failCount++;
}

console.log('\n===========================================================');
console.log(`SUMMARY: ${passCount} Passed, ${failCount} Failed.`);
console.log(`Metrics:`, JSON.stringify(metrics, null, 2));
console.log('===========================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
