import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

interface OGRoute {
  path: string;
  title: string;
  description: string;
  url: string;
  image: string;
}

const SITE = 'https://www.naani.in';
const DEFAULT_OG = `${SITE}/naani-projects-logo.png`;

// Per-route pre-rendered HTML for social crawlers (WhatsApp / FB / Twitter /
// LinkedIn / Telegram). Real-estate only — Naani Projects. We deliberately do
// NOT pre-render `/` here; the static `index.html` already carries the correct
// Naani Projects homepage metadata and is served as the SPA fallback for any
// route not listed below (builder hubs, location hubs, /property/:slug, etc).
// Per-page canonical/OG for those dynamic routes is applied client-side by
// SEOHead (react-helmet-async) for JS-executing crawlers like Googlebot.
const ogRoutes: OGRoute[] = [
  // ===== SEO Hubs =====
  {
    path: '/hyderabad',
    title: 'Properties & Flats for Sale in Hyderabad | Naani Projects',
    description: 'Explore verified 2 BHK & 3 BHK flats, luxury apartments, and new residential projects for sale in Hyderabad. Compare top locations, prices, and builders with Naani.',
    url: `${SITE}/hyderabad`,
    image: DEFAULT_OG,
  },
  {
    path: '/hyderabad/2-bhk-flats',
    title: '2 BHK Flats for Sale in Hyderabad | Naani Projects',
    description: 'Explore 2 BHK flats and apartments for sale in Hyderabad. Compare verified projects, locations, builders, amenities and floor plans with Naani.',
    url: `${SITE}/hyderabad/2-bhk-flats`,
    image: DEFAULT_OG,
  },
  {
    path: '/hyderabad/3-bhk-flats',
    title: '3 BHK Flats for Sale in Hyderabad | Naani Projects',
    description: 'Explore 3 BHK luxury flats and apartments for sale in Hyderabad. Discover gated communities in Kokapet, Nallagandla, Tellapur & Gachibowli with Naani.',
    url: `${SITE}/hyderabad/3-bhk-flats`,
    image: DEFAULT_OG,
  },

  // ===== Projects hub =====
  {
    path: '/projects',
    title: "Naani's Properties | Premium Real Estate Projects in Hyderabad",
    description: 'Explore curated premium real estate projects in Hyderabad and beyond. Get instant project details on WhatsApp from Naani Projects.',
    url: `${SITE}/projects`,
    image: DEFAULT_OG,
  },

  // ===== Individual project pages =====
  {
    path: '/projects/tridasa-rise',
    title: 'Tridasa Rise Nallagandla | Luxury 3 & 4 BHK Apartments Hyderabad',
    description: 'Tridasa Rise – Premium 3 & 4 BHK apartments in Nallagandla, Hyderabad. 10.38 acres, 7 blocks, 55,000 sq ft clubhouse. IGBC Gold low-density luxury living.',
    url: `${SITE}/projects/tridasa-rise`,
    image: `${SITE}/og-tridasa-rise.jpg`,
  },
  {
    path: '/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad',
    title: '4BHK Villas Near Me in Tukkuguda Hyderabad | Man Airport Residency',
    description: 'Looking for 4BHK villas near me? Explore ready-to-occupy luxury villas at Man Airport Residency, Tukkuguda Hyderabad near Airport & ORR.',
    url: `${SITE}/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad`,
    image: `${SITE}/og-man-airport-residency.jpg`,
  },
  {
    path: '/projects/brigade-gateway-neopolis-kokapet-hyderabad',
    title: 'Luxury Apartments in Kokapet Hyderabad | Brigade Gateway Neopolis',
    description: 'Brigade Gateway Neopolis – premium 3, 4, 5 & 6 BHK homes in Kokapet, Hyderabad with world-class amenities, sky-high towers, excellent connectivity.',
    url: `${SITE}/projects/brigade-gateway-neopolis-kokapet-hyderabad`,
    image: `${SITE}/og-brigade-gateway-neopolis.jpg`,
  },
  {
    path: '/projects/prestige-golden-grove-hyderabad',
    title: 'Prestige Golden Grove Hyderabad | Luxury Apartments Near ORR',
    description: 'Prestige Golden Grove Hyderabad – premium 2, 3 & 4 BHK luxury apartments in Tellapur near ORR. 28.7 acres, 10 towers. Starting ₹93.5 Lakhs.',
    url: `${SITE}/projects/prestige-golden-grove-hyderabad`,
    image: `${SITE}/og-prestige-golden-grove.jpg`,
  },
  {
    path: '/projects/jaycon-gateway-tirupati',
    title: 'Jaycon Gateway Tirupati | Premium Suites with Rental Income',
    description: 'Invest in Jaycon Gateway Tirupati premium managed suites near Tirumala. Earn passive rental income with a fully managed property. Book your unit today.',
    url: `${SITE}/projects/jaycon-gateway-tirupati`,
    image: `${SITE}/og-jaycon-gateway-tirupati.jpg`,
  },
  {
    path: '/projects/aspire-spaces-a3-bachupally',
    title: 'Aspire Spaces A3 Bachupally | 2 & 3 BHK Apartments Mallampet Hyderabad',
    description: 'Aspire Spaces A3 – Premium 2 & 3 BHK apartments in Mallampet, Hyderabad. 3.7 acres, 2 towers, top-tier amenities. Click to unlock pricing.',
    url: `${SITE}/projects/aspire-spaces-a3-bachupally`,
    image: `${SITE}/og-aspire-spaces-a3.jpg`,
  },
  {
    path: '/projects/sri-soho-interiors-designers-hyderabad',
    title: 'Sri Soho Interiors | Premium Interior Designers in Hyderabad',
    description: 'Sri Soho Interiors – premium modular kitchens, bedrooms, living, dining, decorative units, kids rooms, office and commercial interiors in Hyderabad.',
    url: `${SITE}/projects/sri-soho-interiors-designers-hyderabad`,
    image: `${SITE}/og-sri-soho-interiors.jpg`,
  },
  {
    path: '/projects/team4-aria-miyapur-luxury-apartments-hyderabad',
    title: 'Team4 Aria Miyapur | Price, Floor Plans & Luxury Apartments Hyderabad',
    description: 'Team4 Aria Miyapur – ultra luxury 3 & 3.5 BHK G+48 apartments in Hyderabad with 3.5 acre courtyard, infinity pool & premium amenities.',
    url: `${SITE}/projects/team4-aria-miyapur-luxury-apartments-hyderabad`,
    image: `${SITE}/og-team4-aria-miyapur.jpg`,
  },
  {
    path: '/projects/rajapushpa-sierra-tellapur-hyderabad',
    title: 'Rajapushpa Sierra Tellapur | Luxury 2 & 3 BHK Apartments in Hyderabad',
    description: 'Rajapushpa Sierra – G+49 luxury 2 & 3 BHK apartments in Tellapur, Hyderabad. 1.5 lakh sft clubhouse near Gachibowli. Starting ₹94 Lakhs. Book site visit.',
    url: `${SITE}/projects/rajapushpa-sierra-tellapur-hyderabad`,
    image: `${SITE}/og-rajapushpa-sierra.jpg`,
  },
];

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectOGTags(html: string, route: OGRoute): string {
  const t = escapeHtml(route.title);
  const d = escapeHtml(route.description);
  const u = escapeHtml(route.url);
  const img = escapeHtml(route.image);

  // Strip every existing canonical / og:* / twitter:* tag that the static
  // index.html ships with so the per-route values are the only ones present.
  let result = html
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<meta\s+property="og:[^"]+"[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, '');

  // Swap the <title> and <meta name="description"> to the per-route values.
  result = result.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  result = result.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${d}" />`
  );

  const ogTags = `
    <!-- Per-route SEO metadata (Naani Projects) -->
    <link rel="canonical" href="${u}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${u}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:secure_url" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Naani Projects" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@NaaniProjects" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${img}" />`;

  result = result.replace('</head>', `${ogTags}\n  </head>`);
  return result;
}

export function ogPrerender(): Plugin {
  return {
    name: 'og-prerender',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) {
        console.warn('[og-prerender] dist/index.html not found, skipping');
        return;
      }
      const indexHtml = fs.readFileSync(indexPath, 'utf-8');

      // Dynamically discover all routes from public/sitemaps/*.xml
      const allRoutesMap = new Map<string, OGRoute>();

      // Handcrafted routes take precedence
      for (const r of ogRoutes) {
        allRoutesMap.set(r.path, r);
      }

      // Helper to format slug to Title Case: "aparna-cyber-heights" -> "Aparna Cyber Heights"
      const formatSlugTitle = (slug: string) =>
        slug
          .replace(/-hyderabad$/, '')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

      // Parse XML sitemap files in public/sitemaps/
      const sitemapsDir = path.resolve(process.cwd(), 'public/sitemaps');
      if (fs.existsSync(sitemapsDir)) {
        const files = fs.readdirSync(sitemapsDir);
        for (const file of files) {
          if (!file.endsWith('.xml')) continue;
          const xmlContent = fs.readFileSync(path.join(sitemapsDir, file), 'utf-8');
          const matches = xmlContent.matchAll(/<loc>(https:\/\/www\.naani\.in(\/[^<]*))<\/loc>/g);
          for (const match of matches) {
            const fullUrl = match[1];
            const routePath = match[2];
            if (!routePath || routePath === '/' || allRoutesMap.has(routePath)) continue;

            let title = 'Naani Projects | Real Estate Hyderabad';
            let description =
              'Explore verified real estate properties, flats, villas and plots in Hyderabad with Naani Projects.';

            if (routePath.startsWith('/projects/')) {
              const slug = routePath.replace('/projects/', '');
              const cleanTitle = formatSlugTitle(slug);
              title = `${cleanTitle} | Residential Project in Hyderabad | Naani Projects`;
              description = `Explore project details for ${cleanTitle} in Hyderabad. Review floor plans, location connectivity, and developer information on Naani Projects.`;
            } else if (routePath.startsWith('/projects-in-')) {
              const loc = formatSlugTitle(routePath.replace('/projects-in-', ''));
              title = `Projects in ${loc}, Hyderabad | Apartments & Homes | Naani Projects`;
              description = `Compare residential projects, apartments, and gated layouts in ${loc}, Hyderabad. View floor plans, location advantages, and project details.`;
            } else if (routePath.endsWith('-projects-hyderabad')) {
              const builder = formatSlugTitle(
                routePath.replace(/^\//, '').replace('-projects-hyderabad', '')
              );
              title = `${builder} Projects in Hyderabad | Residential Developments | Naani Projects`;
              description = `Explore residential developments by ${builder} in Hyderabad. Compare floor plans, project locations, and available configurations on Naani Projects.`;
            } else if (routePath.startsWith('/hyderabad/')) {
              const sub = formatSlugTitle(routePath.replace('/hyderabad/', ''));
              title = `${sub} in Hyderabad | Naani Projects`;
              description = `Browse ${sub} in Hyderabad. Compare project locations, floor plans, and developer details with Naani Projects.`;
            }

            allRoutesMap.set(routePath, {
              path: routePath,
              title,
              description,
              url: fullUrl,
              image: DEFAULT_OG,
            });
          }
        }
      }

      // Pre-render static HTML file with route-specific canonical & OG tags for every route
      let count = 0;
      for (const route of allRoutesMap.values()) {
        if (route.path === '/') continue;
        const html = injectOGTags(indexHtml, route);
        const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        count++;
      }
      console.log(`[og-prerender] ✅ Successfully pre-rendered ${count} pages with explicit canonical & OG tags.`);
    },
  };
}
