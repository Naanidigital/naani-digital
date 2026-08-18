import { ALL_PROJECTS } from "@/data/projectsList";
import { HYDERABAD_LOCATIONS } from "@/config/seoKeywords";

export interface ProjectMetadataItem {
  name: string;
  slug: string;
  location: string;
  bhk: string[];
  price?: string;
  builder?: string;
}

export interface SeoPageData {
  title: string;
  description: string;
  h1: string;
  canonicalUrl: string;
  robots: string;
  isIndexable: boolean;
  bhkType?: "2 BHK" | "3 BHK" | "All";
  locationName?: string;
  locationSlug?: string;
  projects: ProjectMetadataItem[];
  allBhkProjects: ProjectMetadataItem[];
  intro: string;
  faqs: { q: string; a: string }[];
  breadcrumbs: { name: string; item: string }[];
  structuredData: object;
}

const SITE_URL = "https://www.naani.in";

// Map project names to their supported BHK configurations
const BHK_MAP: Record<string, string[]> = {
  "/projects/tridasa-rise": ["3 BHK", "4 BHK"],
  "/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad": ["4 BHK", "Villa"],
  "/projects/brigade-gateway-neopolis-kokapet-hyderabad": ["3 BHK", "4 BHK"],
  "/projects/prestige-golden-grove-hyderabad": ["2 BHK", "3 BHK", "4 BHK"],
  "/projects/jaycon-gateway-tirupati": ["Suite"],
  "/projects/aspire-spaces-a3-bachupally": ["2 BHK", "3 BHK"],
  "/projects/sri-soho-interiors-designers-hyderabad": ["Interiors"],
  "/projects/team4-aria-miyapur-luxury-apartments-hyderabad": ["3 BHK"],
  "/projects/rajapushpa-sierra-tellapur-hyderabad": ["2 BHK", "3 BHK"],
  "/projects/candeur-eternia-bachupally-hyderabad": ["2 BHK", "3 BHK"],
  "/projects/godrej-kukatpally-hyderabad": ["2 BHK", "3 BHK", "4 BHK"],
  "/projects/raghava-halo-kondapur-hyderabad": ["4 BHK"],
  "/projects/aritha-gbr-dhanwin-towers-bowrampet-hyderabad": ["2 BHK", "3 BHK"],
  "/projects/sanvis-kowsalya-vasudha-mallampet": ["2 BHK", "3 BHK"],
  "/projects/sanvi-kowsalya-manidweepa-shikaram-bachupally": ["2 BHK", "3 BHK"],
  "/projects/sanvi-kowsalya-avani-kristareddypet": ["2 BHK", "3 BHK"],
  "/projects/neo-towers-neopolis-kokapet": ["3 BHK", "4 BHK"],
};

export const getProjectsForLocationAndBhk = (locationSlug?: string, bhk?: "2 BHK" | "3 BHK"): ProjectMetadataItem[] => {
  const allFormatted = ALL_PROJECTS.map(p => ({
    name: p.name,
    slug: p.slug,
    location: p.location,
    bhk: BHK_MAP[p.slug] || ["2 BHK", "3 BHK"],
  }));

  if (!locationSlug && !bhk) return allFormatted;

  return allFormatted.filter(p => {
    let matchLoc = true;
    let matchBhk = true;
    if (locationSlug) {
      const locObj = HYDERABAD_LOCATIONS.find(l => l.slug === locationSlug);
      const targetName = locObj ? locObj.name.toLowerCase() : locationSlug.toLowerCase();
      matchLoc = p.location.toLowerCase().includes(targetName) || targetName.includes(p.location.toLowerCase());
    }
    if (bhk) {
      matchBhk = p.bhk ? p.bhk.includes(bhk) : true;
    }
    return matchLoc && matchBhk;
  });
};

export const getSeoPageData = (type: "hub" | "bhk-2" | "bhk-3" | "location-bhk", locationSlug?: string, bhk?: "2 BHK" | "3 BHK"): SeoPageData => {
  const locObj = locationSlug ? HYDERABAD_LOCATIONS.find(l => l.slug === locationSlug) : undefined;
  const locName = locObj ? locObj.name : (locationSlug ? locationSlug.charAt(0).toUpperCase() + locationSlug.slice(1) : "Hyderabad");

  const allFormatted = ALL_PROJECTS.map(p => ({
    name: p.name,
    slug: p.slug,
    location: p.location,
    bhk: BHK_MAP[p.slug] || ["2 BHK", "3 BHK"],
  }));

  if (type === "hub") {
    const projects = allFormatted;
    const canonicalUrl = `${SITE_URL}/hyderabad`;
    return {
      title: "Properties & Flats for Sale in Hyderabad | Naani Projects",
      description: "Explore verified 2 BHK & 3 BHK flats, luxury apartments, and new residential projects for sale in Hyderabad. Compare top locations, prices, and builders with Naani.",
      h1: "Properties & Flats for Sale in Hyderabad",
      canonicalUrl,
      robots: "index,follow",
      isIndexable: true,
      projects,
      allBhkProjects: projects,
      intro: "Hyderabad is a major IT and real estate hub in South India. From high-rise apartments in Kokapet and Tellapur to gated communities in Gachibowli and Kondapur, Naani Projects helps buyers explore verified property listings from RERA-registered developers.",
      faqs: [
        { q: "Which are the best locations to buy flats in Hyderabad?", a: "Kokapet, Tellapur, Narsingi, Gachibowli, Kondapur, Miyapur, and Bachupally are among the top residential locations in Hyderabad for self-use and investment." },
        { q: "What is the average price of 2 BHK and 3 BHK flats in Hyderabad?", a: "2 BHK flats range from ₹50 Lakhs to ₹1.2 Cr depending on location, while 3 BHK flats in prime corridors range from ₹90 Lakhs to ₹2.5 Cr+." },
        { q: "Are all projects on Naani RERA approved?", a: "Yes, Naani Projects features verified RERA-approved residential projects from reputed developers in Hyderabad." },
      ],
      breadcrumbs: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Hyderabad", item: canonicalUrl },
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Properties for Sale in Hyderabad",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}${p.slug}`,
        })),
      },
    };
  }

  if (type === "bhk-2") {
    const projects = getProjectsForLocationAndBhk(undefined, "2 BHK");
    const canonicalUrl = `${SITE_URL}/hyderabad/2-bhk-flats`;
    return {
      title: "2 BHK Flats for Sale in Hyderabad | Naani Projects",
      description: "Explore 2 BHK flats and apartments for sale in Hyderabad. Compare verified projects, locations, builders, amenities and floor plans with Naani.",
      h1: "2 BHK Flats for Sale in Hyderabad",
      canonicalUrl,
      robots: "index,follow",
      isIndexable: true,
      bhkType: "2 BHK",
      projects,
      allBhkProjects: projects,
      intro: "Looking for 2 BHK flats in Hyderabad? Discover premium 2 BHK apartments in top locations including Tellapur, Bachupally, Miyapur, and Kukatpally. Ideal for small families, working professionals, and real estate investors.",
      faqs: [
        { q: "What is the typical size of a 2 BHK flat in Hyderabad?", a: "2 BHK flats in Hyderabad usually range between 1,150 sq.ft and 1,450 sq.ft with spacious living rooms, balconies, and modern kitchens." },
        { q: "Where can I find affordable 2 BHK flats in West Hyderabad?", a: "Locations like Bachupally, Mallampet, Miyapur, and Kollur offer excellent 2 BHK options starting from ₹50 Lakhs to ₹80 Lakhs." },
      ],
      breadcrumbs: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Hyderabad", item: `${SITE_URL}/hyderabad` },
        { name: "2 BHK Flats", item: canonicalUrl },
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "2 BHK Flats for Sale in Hyderabad",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}${p.slug}`,
        })),
      },
    };
  }

  if (type === "bhk-3") {
    const projects = getProjectsForLocationAndBhk(undefined, "3 BHK");
    const canonicalUrl = `${SITE_URL}/hyderabad/3-bhk-flats`;
    return {
      title: "3 BHK Flats for Sale in Hyderabad | Naani Projects",
      description: "Explore 3 BHK luxury flats and apartments for sale in Hyderabad. Discover gated communities in Kokapet, Nallagandla, Tellapur & Gachibowli with Naani.",
      h1: "3 BHK Flats for Sale in Hyderabad",
      canonicalUrl,
      robots: "index,follow",
      isIndexable: true,
      bhkType: "3 BHK",
      projects,
      allBhkProjects: projects,
      intro: "Upgrade your lifestyle with spacious 3 BHK apartments for sale in Hyderabad. Featuring high-rise gated communities in Kokapet, Nallagandla, Kondapur, and Miyapur equipped with clubhouses, infinity pools, and lush green courtyards.",
      faqs: [
        { q: "What amenities come with luxury 3 BHK apartments in Hyderabad?", a: "Modern 3 BHK gated communities feature 30,000+ sq.ft clubhouses, swimming pools, fitness centers, sports courts, 24/7 security, and landscaped gardens." },
        { q: "Which areas are best for 3 BHK luxury living in Hyderabad?", a: "Kokapet (Neopolis), Nallagandla, Gachibowli, Tellapur, and Kondapur are prime destinations for premium 3 BHK residences." },
      ],
      breadcrumbs: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Hyderabad", item: `${SITE_URL}/hyderabad` },
        { name: "3 BHK Flats", item: canonicalUrl },
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "3 BHK Flats for Sale in Hyderabad",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}${p.slug}`,
        })),
      },
    };
  }

  // Location + BHK page
  const b = bhk || "2 BHK";
  const projects = getProjectsForLocationAndBhk(locationSlug, b);
  const allBhkProjects = getProjectsForLocationAndBhk(undefined, b);
  const isIndexable = true;
  const canonicalUrl = `${SITE_URL}/hyderabad/${locationSlug}/${b === "2 BHK" ? "2-bhk-flats" : "3-bhk-flats"}`;

  return {
    title: `${b} Flats in ${locName}, Hyderabad | Naani Projects`,
    description: `Explore verified ${b} flats and apartments for sale in ${locName}, Hyderabad. Compare project details, pricing, floor plans and amenities with Naani.`,
    h1: `${b} Flats for Sale in ${locName}, Hyderabad`,
    canonicalUrl,
    robots: "index,follow",
    isIndexable,
    bhkType: b,
    locationName: locName,
    locationSlug,
    projects,
    allBhkProjects,
    intro: `Discover ${b} flats in ${locName}, one of Hyderabad's premier residential corridors. Compare real projects, verified configurations, developer reputation, and pricing directly on Naani Projects.`,
    faqs: [
      { q: `Why buy a ${b} flat in ${locName}?`, a: `${locName} offers excellent connectivity to major IT parks, reputed schools, hospitals, and Financial District, making it a high-demand location for homebuyers.` },
      { q: `How can I schedule a site visit for ${b} flats in ${locName}?`, a: `You can click 'Schedule Site Visit' on any project listing to connect with a Naani property advisor who will arrange your complimentary guided tour.` },
    ],
    breadcrumbs: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Hyderabad", item: `${SITE_URL}/hyderabad` },
      { name: locName, item: `${SITE_URL}/projects-in-${locationSlug}` },
      { name: `${b} Flats`, item: canonicalUrl },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${b} Flats for Sale in ${locName}, Hyderabad`,
      numberOfItems: projects.length,
      itemListElement: (projects.length ? projects : allBhkProjects).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}${p.slug}`,
      })),
    },
  };
};
