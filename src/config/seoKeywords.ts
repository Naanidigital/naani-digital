// Centralized SEO Keyword & Location Configuration for Naani.in
// Built strictly following Google Search Essentials & Industry SEO Standards.

export interface LocationConfig {
  name: string;
  slug: string;
  aliases?: string[];
  district?: string;
  popularTypes?: ("2 BHK" | "3 BHK" | "4 BHK" | "Villa" | "Plot")[];
  description?: string;
  nearbyLandmarks?: string[];
}

export interface KeywordCluster {
  primary: string;
  secondary: string[];
}

// -------------------------------------------------------------
// CORE BHK KEYWORD CLUSTERS
// -------------------------------------------------------------

export const BHK_2_KEYWORDS: KeywordCluster = {
  primary: "2 bhk flats in Hyderabad",
  secondary: [
    "2 bhk flats for sale in Hyderabad",
    "2 bhk apartments in Hyderabad",
    "2 bhk apartments for sale in Hyderabad",
    "2 bhk flat for sale in Hyderabad",
    "buy 2 bhk flat in Hyderabad",
    "new 2 bhk flats in Hyderabad",
    "new 2 bhk apartments in Hyderabad",
    "2 bhk homes in Hyderabad",
    "2 bhk property in Hyderabad",
    "2 bhk residential flats in Hyderabad",
    "2 bhk gated community flats in Hyderabad",
    "2 bhk luxury flats in Hyderabad",
    "2 bhk ready to move flats in Hyderabad",
    "2 bhk new projects in Hyderabad",
  ],
};

export const BHK_3_KEYWORDS: KeywordCluster = {
  primary: "3 bhk flats in Hyderabad",
  secondary: [
    "3 bhk flats for sale in Hyderabad",
    "3 bhk apartments in Hyderabad",
    "3 bhk apartments for sale in Hyderabad",
    "3 bhk flat for sale in Hyderabad",
    "buy 3 bhk flat in Hyderabad",
    "new 3 bhk flats in Hyderabad",
    "new 3 bhk apartments in Hyderabad",
    "3 bhk homes in Hyderabad",
    "3 bhk property in Hyderabad",
    "3 bhk residential flats in Hyderabad",
    "3 bhk gated community flats in Hyderabad",
    "3 bhk luxury flats in Hyderabad",
    "3 bhk ready to move flats in Hyderabad",
    "3 bhk new projects in Hyderabad",
  ],
};

export const GENERAL_HYDERABAD_KEYWORDS = [
  "flats for sale in Hyderabad",
  "apartments for sale in Hyderabad",
  "new flats in Hyderabad",
  "new apartments in Hyderabad",
  "residential projects in Hyderabad",
  "new projects in Hyderabad",
  "upcoming projects in Hyderabad",
  "gated community flats Hyderabad",
  "luxury apartments Hyderabad",
  "ready to move flats Hyderabad",
  "under construction flats Hyderabad",
  "RERA approved projects Hyderabad",
  "property for sale Hyderabad",
  "residential property Hyderabad",
  "new launch projects Hyderabad",
];

// -------------------------------------------------------------
// HYDERABAD LOCATIONS REGISTRY
// -------------------------------------------------------------

export const HYDERABAD_LOCATIONS: LocationConfig[] = [
  { name: "Kokapet", slug: "kokapet", popularTypes: ["2 BHK", "3 BHK", "4 BHK"], description: "Premier IT & Financial District extension corridor in West Hyderabad." },
  { name: "Tellapur", slug: "tellapur", popularTypes: ["2 BHK", "3 BHK", "Villa"], description: "Fastest growing residential hub with mega gated communities near BHEL & ORR." },
  { name: "Narsingi", slug: "narsingi", popularTypes: ["2 BHK", "3 BHK"], description: "Strategic ORR junction connecting Financial District, Gachibowli and Mehdipatnam." },
  { name: "Gachibowli", slug: "gachibowli", popularTypes: ["2 BHK", "3 BHK", "4 BHK"], description: "Hyderabad's primary IT financial hub & institutional corridor." },
  { name: "Kondapur", slug: "kondapur", popularTypes: ["2 BHK", "3 BHK"], description: "Established residential neighborhood adjacent to HITEC City & Botanical Garden." },
  { name: "Hitech City", slug: "hitech-city", aliases: ["HITEC City"], popularTypes: ["2 BHK", "3 BHK"], description: "India's premier technology township & commercial epicenter." },
  { name: "Financial District", slug: "financial-district", popularTypes: ["2 BHK", "3 BHK", "4 BHK"], description: "High-density corporate & luxury high-rise residential zone in Nanakramguda." },
  { name: "Miyapur", slug: "miyapur", popularTypes: ["2 BHK", "3 BHK"], description: "Major residential hub on NH-65 with Metro Rail connectivity." },
  { name: "Bachupally", slug: "bachupally", popularTypes: ["2 BHK", "3 BHK"], description: "Rapidly expanding educational & residential destination in North-West Hyderabad." },
  { name: "Neopolis", slug: "neopolis", popularTypes: ["3 BHK", "4 BHK"], description: "Ultra-luxury high-rise SEZ & residential district in Kokapet." },
  { name: "Kollur", slug: "kollur", popularTypes: ["2 BHK", "3 BHK"], description: "Promising ORR Exit 2 location featuring affordable luxury gated communities." },
  { name: "Nallagandla", slug: "nallagandla", popularTypes: ["2 BHK", "3 BHK"], description: "Upscale residential neighborhood near BHEL, Lingampally & HCU." },
  { name: "Jubilee Hills", slug: "jubilee-hills", popularTypes: ["3 BHK", "4 BHK", "Villa"], description: "Hyderabad's most affluent ultra-luxury residential neighborhood." },
  { name: "Banjara Hills", slug: "banjara-hills", popularTypes: ["3 BHK", "4 BHK"], description: "Prime commercial & luxury residential address in Central-West Hyderabad." },
  { name: "Madhapur", slug: "madhapur", popularTypes: ["2 BHK", "3 BHK"], description: "Heart of Hyderabad IT corridor with high rental demand." },
  { name: "Kukatpally", slug: "kukatpally", popularTypes: ["2 BHK", "3 BHK"], description: "Established commercial & residential hub with comprehensive metro connectivity." },
  { name: "Manikonda", slug: "manikonda", popularTypes: ["2 BHK", "3 BHK"], description: "Popular residential location adjacent to Lanco Hills and Gachibowli." },
  { name: "Puppalaguda", slug: "puppalaguda", popularTypes: ["2 BHK", "3 BHK"], description: "Fast-developing corridor connecting Manikonda to Financial District." },
  { name: "Nanakramguda", slug: "nanakramguda", popularTypes: ["2 BHK", "3 BHK", "4 BHK"], description: "Financial hub hosting multinational corporate headquarters & premium residences." },
  { name: "Raidurg", slug: "raidurg", popularTypes: ["2 BHK", "3 BHK"], description: "Major metro terminal & IT commercial hub opposite Knowledge City." },
  { name: "Shamshabad", slug: "shamshabad", popularTypes: ["Plot", "Villa", "2 BHK"], description: "International airport zone with strong long-term appreciation potential." },
  { name: "Tukkuguda", slug: "tukkuguda", popularTypes: ["Villa", "Plot", "2 BHK"], description: "Airport corridor Exit 14 location famous for premium villa communities." },
  { name: "Mokila", slug: "mokila", popularTypes: ["Villa", "Plot"], description: "Serene villa country location along Shankarpally road near ORR." },
  { name: "Osman Nagar", slug: "osman-nagar", popularTypes: ["2 BHK", "3 BHK"], description: "Emerging residential cluster between Tellapur and Kollur." },
  { name: "Gandipet", slug: "gandipet", popularTypes: ["Villa", "3 BHK"], description: "Scenic reservoir destination with luxury lakeview villas and resorts." },
  { name: "Patancheru", slug: "patancheru", popularTypes: ["2 BHK", "3 BHK"], description: "Industrial & residential gateway on NH-65 with fast ORR access." },
  { name: "Kompally", slug: "kompally", popularTypes: ["2 BHK", "3 BHK", "Villa"], description: "North Hyderabad's fastest-growing residential corridor along NH-44." },
  { name: "Uppal", slug: "uppal", popularTypes: ["2 BHK", "3 BHK"], description: "East Hyderabad's major IT & residential hub with Metro connectivity." },
  { name: "LB Nagar", slug: "lb-nagar", popularTypes: ["2 BHK", "3 BHK"], description: "Primary commercial gateway to South-East Hyderabad." },
];

// Helper to generate location + BHK keyword clusters
export const getLocationBhkKeywords = (locationName: string, bhk: "2 BHK" | "3 BHK"): KeywordCluster => {
  const loc = locationName;
  const b = bhk;
  return {
    primary: `${b} flats in ${loc}`,
    secondary: [
      `${b} flats for sale in ${loc}`,
      `${b} apartments in ${loc}`,
      `${b} apartments for sale in ${loc}`,
      `${loc} ${b} flats`,
      `buy ${b} flat in ${loc}`,
      `new ${b} flats in ${loc}`,
      `flats for sale in ${loc}`,
      `apartments for sale in ${loc}`,
      `new projects in ${loc}`,
      `gated community flats in ${loc}`,
    ],
  };
};
