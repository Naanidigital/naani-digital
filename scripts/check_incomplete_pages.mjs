import fs from 'fs';
import path from 'path';

const pagesToAudit = [
  { slug: 'team4-aria-miyapur-luxury-apartments-hyderabad', file: 'Team4AriaMiyapurPage.tsx' },
  { slug: 'prestige-golden-grove-hyderabad', file: 'PrestigeGoldenGrovePage.tsx' },
  { slug: 'brigade-gateway-neopolis-kokapet-hyderabad', file: 'BrigadeGatewayNeopolis.tsx' },
  { slug: 'sri-soho-interiors-designers-hyderabad', file: 'SriSohoInteriorsPage.tsx' },
  { slug: 'man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad', file: 'ManAirportResidencyPage.tsx' },
  { slug: 'rajapushpa-sierra-tellapur-hyderabad', file: 'RajapushpaSierraPage.tsx' },
  { slug: 'jaycon-gateway-tirupati', file: 'JayconGatewayTirupatiPage.tsx' },
  { slug: 'aspire-spaces-a3-bachupally', file: 'AspireSpacesA3Page.tsx' },
  { slug: 'tridasa-rise', file: 'TridasaRisePage.tsx' },
  { slug: 'raghava-halo-kondapur-hyderabad', file: 'RaghavaHaloPage.tsx' },
  { slug: 'sanvi-kowsalya-manidweepa-shikaram-bachupally', file: 'SanviManidweepaShikaramPage.tsx' },
  { slug: 'sanvi-kowsalya-avani-kristareddypet', file: 'SanviKowsalyaAvaniPage.tsx' },
  { slug: 'sanvis-kowsalya-vasudha-mallampet', file: 'SanviKowsalyaVasudhaPage.tsx' },
  { slug: 'aritha-gbr-dhanwin-towers-bowrampet-hyderabad', file: 'ArithaDhanwinTowersPage.tsx' }
];

for (const item of pagesToAudit) {
  const p = path.resolve('naani-main/src/pages', item.file);
  if (!fs.existsSync(p)) {
    console.log(`File not found: ${item.file}`);
    continue;
  }
  const text = fs.readFileSync(p, 'utf8');
  console.log(`\n==============================================`);
  console.log(`PAGE: ${item.file} (slug: ${item.slug})`);
  
  // Look for hero image import
  const heroImport = text.match(/import\s+(\w+Hero|\w+Img|hero\w*)\s+from\s+["']([^"']+)["']/i);
  if (heroImport) {
    console.log(`Hero import: ${heroImport[1]} -> ${heroImport[2]}`);
  }
  
  // Look for description in SEOHead
  const seoDesc = text.match(/description=["']([^"']+)["']/);
  if (seoDesc) {
    console.log(`SEO Description: ${seoDesc[1].substring(0, 120)}...`);
  }
  
  // Look for FAQs
  const faqCount = (text.match(/q:\s*["']/g) || []).length;
  console.log(`FAQ items found: ${faqCount}`);

  // Look for amenities
  const amenityMatch = text.match(/(?:amenities|AMENITIES|amenityFeature)\s*[:=]\s*(\[[\s\S]*?\])/);
  if (amenityMatch) {
    console.log(`Amenities snippet found: ${amenityMatch[1].substring(0, 150)}...`);
  }
}
