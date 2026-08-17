import fs from 'fs';
import path from 'path';

const userUrls = [
  'https://www.naani.in/projects-in-manikonda',
  'https://www.naani.in/projects-in-jai-bharat-nagar',
  'https://www.naani.in/projects-in-tukkuguda',
  'https://www.naani.in/projects-in-kukatpally',
  'https://www.naani.in/vessella-group-projects-hyderabad',
  'https://www.naani.in/projects-in-tellapur',
  'https://www.naani.in/projects-in-manikonda-jagir',
  'https://www.naani.in/koncept-ambience-projects-hyderabad',
  'https://www.naani.in/projects-in-gachibowli',
  'https://www.naani.in/ghr-infra-lakshmi-infra-urban-blocks-realty-projects-hyderabad',
  'https://www.naani.in/projects-in-mokila',
  'https://www.naani.in/vertex-homes-pvt-ltd-projects-hyderabad',
  'https://www.naani.in/projects-in-brindavan-colony',
  'https://www.naani.in/ramky-estates-projects-hyderabad',
  'https://www.naani.in/projects-in-vanasthalipuram',
  'https://www.naani.in/projects-in-huda',
  'https://www.naani.in/projects-in-rajendra-nagar',
  'https://www.naani.in/jaycon-builders-projects-hyderabad',
  'https://www.naani.in/projects-in-vittal-rao-nagar',
  'https://www.naani.in/ghr-infra-projects-hyderabad',
  'https://www.naani.in/projects-in-suchitra',
  'https://www.naani.in/candeur-constructions-projects-hyderabad',
  'https://www.naani.in/projects-in-shaikpet',
  'https://www.naani.in/projects-in-gundlapochampalli',
  'https://www.naani.in/dsr-builders-projects-hyderabad',
  'https://www.naani.in/projects-in-isnapur',
  'https://www.naani.in/projects-in-ameenpur',
  'https://www.naani.in/tridasa-group-projects-hyderabad',
  'https://www.naani.in/projects-in-nallagandla',
  'https://www.naani.in/aspire-spaces-projects-hyderabad',
  'https://www.naani.in/projects-in-hyderabad',
  'https://www.naani.in/projects-in-kompally',
  'https://www.naani.in/projects-in-gandimaisamma',
  'https://www.naani.in/prestige-group-projects-hyderabad',
  'https://www.naani.in/projects-in-nanakramguda',
  'https://www.naani.in/projects-in-satyam-enclave',
  'https://www.naani.in/vasavi-group-projects-hyderabad',
  'https://www.naani.in/aurum-projects-hyderabad',
  'https://www.naani.in/projects-in-shamirpet',
  'https://www.naani.in/vision-infra-projects-hyderabad',
  'https://www.naani.in/projects-in-madhapur',
  'https://www.naani.in/projects-in-laxmi-nagar-colony',
  'https://www.naani.in/projects-in-madinaguda',
  'https://www.naani.in/projects-in-tirupati',
  'https://www.naani.in/team4-group-projects-hyderabad',
  'https://www.naani.in/cybercity-builders-projects-hyderabad',
  'https://www.naani.in/projects-in-lb-nagar',
  'https://www.naani.in/projects-in-huda-complex',
  'https://www.naani.in/projects-in-whitefields',
  'https://www.naani.in/projects-in-patancheru',
  'https://www.naani.in/projects-in-uppal',
  'https://www.naani.in/projects-in-narsingi',
  'https://www.naani.in/projects-in-pragathi-nagar',
  'https://www.naani.in/rajapushpa-properties-projects-hyderabad',
  'https://www.naani.in/namishree-infrastructure-and-projects-pvt-ltd-projects-hyderabad',
  'https://www.naani.in/projects-in-boduppal',
  'https://www.naani.in/projects-in-patrika-nagar',
  'https://www.naani.in/projects-in-sultan-bagh',
  'https://www.naani.in/projects-in-ameerpet',
  'https://www.naani.in/projects-in-osman-nagar',
  'https://www.naani.in/gangothri-infra-projects-hyderabad',
  'https://www.naani.in/projects-in-bandam-kommu',
  'https://www.naani.in/projects-in-hi-tech-city',
  'https://www.naani.in/projects-in-neknampur',
  'https://www.naani.in/projects-in-moti-nagar',
  'https://www.naani.in/vajra-infra-projects-hyderabad',
  'https://www.naani.in/asbl-projects-hyderabad',
  'https://www.naani.in/brigade-group-projects-hyderabad',
  'https://www.naani.in/projects-in-financial-district',
  'https://www.naani.in/projects-in-bachupally',
  'https://www.naani.in/projects-in-alluri-seetaramaraju-nagar',
  'https://www.naani.in/urbansky-developers-projects-hyderabad',
  'https://www.naani.in/projects-in-hanumanpet-secunderabad',
  'https://www.naani.in/projects-in-banjara-hills',
  'https://www.naani.in/projects-in-khajaguda',
  'https://www.naani.in/projects-in-miyapur',
  'https://www.naani.in/projects-in-srinagar-colony',
  'https://www.naani.in/aparna-constructions-projects-hyderabad',
  'https://www.naani.in/projects-in-nanakaramguda',
  'https://www.naani.in/my-home-group-projects-hyderabad',
  'https://www.naani.in/theme-group-projects-hyderabad',
  'https://www.naani.in/anuhar-homes-projects-hyderabad',
  'https://www.naani.in/projects-in-kokapet'
];

const distDir = path.resolve(process.cwd(), 'dist');
const sitemapsDir = path.resolve(process.cwd(), 'public/sitemaps');

// Load sitemap URLs
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

console.log('===========================================================');
console.log(`AUDITING ${userUrls.length} SOFT-404 REPORTED URLS`);
console.log('===========================================================');

let passCount = 0;
let failCount = 0;
const missingFromSitemap = [];
const missingPrerender = [];
const failedRobots = [];

for (const u of userUrls) {
  const urlObj = new URL(u);
  const routePath = urlObj.pathname;
  const relPath = routePath.replace(/^\//, '');
  const indexPath = path.join(distDir, relPath, 'index.html');

  let ok = true;
  const inSitemap = sitemapUrls.has(u);
  if (!inSitemap) {
    missingFromSitemap.push(u);
  }

  if (!fs.existsSync(indexPath)) {
    missingPrerender.push(u);
    ok = false;
  } else {
    const html = fs.readFileSync(indexPath, 'utf-8');
    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
    const robotsVal = robotsMatch ? robotsMatch[1] : 'NONE';
    if (!robotsVal.includes('index') || html.includes('noindex')) {
      failedRobots.push(u);
      ok = false;
    }
  }

  if (ok) passCount++;
  else failCount++;
}

console.log(`\nRESULTS:`);
console.log(`  Total URLs Audited: ${userUrls.length}`);
console.log(`  Passed Static Prerender Audit: ${passCount}`);
console.log(`  Failed: ${failCount}`);
console.log(`  Missing from Sitemap XML: ${missingFromSitemap.length}`);
if (missingFromSitemap.length > 0) console.log('   -', missingFromSitemap.join('\n   - '));
console.log(`  Missing Static Prerender HTML: ${missingPrerender.length}`);
if (missingPrerender.length > 0) console.log('   -', missingPrerender.join('\n   - '));
console.log(`  Failed Robots Meta (noindex): ${failedRobots.length}`);

process.exit(failCount === 0 ? 0 : 1);
