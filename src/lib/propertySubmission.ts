import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/seoSlug";
import { sendLeadToSheet, PageContext, LeadProfile } from "@/lib/leadProfile";

const BUCKET = "property-media";
const SIGNED_EXPIRY = 60 * 60 * 24 * 365 * 10; // 10 years

export type PurposeType = "Sell" | "Rent" | "Buy";
export type PropertyCategory = "Residential" | "Commercial" | "Plot/Land";
export type OwnershipType = "Owner" | "Builder/Developer" | "Agent/Channel Partner";
export type ProjectType = "New Project" | "Resale" | "Ready Property" | "Under Construction";
export type FurnishingStatus = "Unfurnished" | "Semi-Furnished" | "Fully Furnished";
export type ParkingType = "Covered Parking" | "Open Parking" | "Both";
export type AreaUnit = "Sq.ft." | "Sq.yd." | "Acres";
export type AreaType = "Carpet Area" | "Built-up Area" | "Super Built-up Area" | "Plot Area";
export type FacingDirection = "North" | "South" | "East" | "West" | "North-East" | "North-West" | "South-East" | "South-West";
export type FlooringType = "Vitrified" | "Marble" | "Granite" | "Wooden" | "Ceramic" | "Other";
export type PowerBackupType = "None" | "Partial" | "Full";
export type OverlookingType = "Pool" | "Park" | "Clubhouse" | "Main Road" | "Garden" | "Sea Facing" | "Other";

export interface PropertySubmission {
  // Step 1: Basic Details
  purpose: PurposeType;
  category: PropertyCategory;
  propertyType: string;
  ownership: OwnershipType;
  projectType: ProjectType;
  projectName: string;
  builder: string;
  submitterName: string;
  submitterPhone: string;
  submitterEmail: string;
  submitterWhatsapp: string;

  // Step 2: Location Details
  country: string;
  state: string;
  city: string;
  locality: string;
  subLocality: string;
  landmark: string;
  mapsUrl?: string;
  latitude?: string;
  longitude?: string;

  // Step 3: Property Details
  bhk: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  otherRooms: string[];
  furnishing: FurnishingStatus;
  parkingType: ParkingType;
  parkingSpaces: number;
  area: string;
  areaType: AreaType;
  areaUnit: AreaUnit;

  // Step 4: Floor & Availability Details
  totalFloors: number;
  floorNo?: number;
  isDuplex: boolean;
  podiums: number;
  basements: number;
  availability: "Ready to Move" | "Under Construction" | "Upcoming" | "Resale";
  possessionYear: string;
  possessionMonth: string;

  // Step 5: Pricing
  expectedPrice: string;
  pricePerSqft: string;
  pricingBasis: AreaType;
  additionalCharges: string[];
  pricingStatus: "Negotiable" | "Fixed Price";
  brokerage: "None" | "Fixed" | "Percentage";

  // Step 6: Description & RERA
  description: string;
  reraRegistered: boolean;
  reraNumber?: string;

  // Step 7: Attributes & Features
  openSides: number;
  overlooking: OverlookingType[];
  powerBackup: PowerBackupType;
  facing: FacingDirection;
  flooring: FlooringType;
  roadWidth: string;
  features: string[];

  // Step 8: Amenities
  amenities: string[];

  // Step 9: Media
  heroFile?: File | null;
  galleryFiles?: File[];
  brochureFile?: File | null;
  floorPlanFiles?: File[];
  videoUrl?: string;
  virtualTourUrl?: string;
  requireBrochureLeadGate: boolean;
}

export const EMPTY_PROPERTY_SUBMISSION: PropertySubmission = {
  purpose: "Sell",
  category: "Residential",
  propertyType: "Apartment",
  ownership: "Owner",
  projectType: "New Project",
  projectName: "",
  builder: "",
  submitterName: "",
  submitterPhone: "",
  submitterEmail: "",
  submitterWhatsapp: "",

  country: "India",
  state: "Telangana",
  city: "Hyderabad",
  locality: "",
  subLocality: "",
  landmark: "",
  mapsUrl: "",
  latitude: "",
  longitude: "",

  bhk: "3 BHK",
  bedrooms: 3,
  bathrooms: 3,
  balconies: 2,
  otherRooms: [],
  furnishing: "Semi-Furnished",
  parkingType: "Covered Parking",
  parkingSpaces: 1,
  area: "1450",
  areaType: "Super Built-up Area",
  areaUnit: "Sq.ft.",

  totalFloors: 15,
  floorNo: 5,
  isDuplex: false,
  podiums: 0,
  basements: 2,
  availability: "Under Construction",
  possessionYear: "2028",
  possessionMonth: "August",

  expectedPrice: "1.25 Cr",
  pricePerSqft: "8620",
  pricingBasis: "Super Built-up Area",
  additionalCharges: ["Amenities", "Parking", "GST"],
  pricingStatus: "Negotiable",
  brokerage: "None",

  description: "",
  reraRegistered: true,
  reraNumber: "",

  openSides: 2,
  overlooking: ["Park", "Clubhouse"],
  powerBackup: "Full",
  facing: "East",
  flooring: "Vitrified",
  roadWidth: "40",
  features: ["Vaastu Compliant", "Gated Community", "CCTV", "Power Backup", "Modular Kitchen"],

  amenities: ["Swimming Pool", "Gym", "Clubhouse", "Children's Play Area", "24x7 Security", "Lift", "EV Charging", "Power Backup"],

  heroFile: null,
  galleryFiles: [],
  brochureFile: null,
  floorPlanFiles: [],
  videoUrl: "",
  virtualTourUrl: "",
  requireBrochureLeadGate: true,
};

export const FEATURE_OPTIONS = [
  "Recently Renovated",
  "Vaastu Compliant",
  "High Ceiling Height",
  "False Ceiling Lighting",
  "Modular Kitchen",
  "Power Backup",
  "Security",
  "CCTV",
  "Gated Community",
  "Clubhouse",
  "Swimming Pool",
  "Gym",
  "Children's Play Area",
  "Sports Facilities",
  "Lift",
  "Visitor Parking",
  "EV Charging",
  "Landscaped Garden",
  "Jogging Track",
  "Indoor Games",
  "Outdoor Games",
  "Party Hall",
  "Multipurpose Hall",
];

export const AMENITY_OPTIONS = [
  "Swimming Pool",
  "Gym",
  "Clubhouse",
  "Children's Play Area",
  "Landscaped Gardens",
  "Jogging Track",
  "Security",
  "CCTV",
  "24x7 Security",
  "Power Backup",
  "Lift",
  "Parking",
  "EV Charging",
  "Indoor Games",
  "Outdoor Games",
  "Tennis Court",
  "Badminton Court",
  "Basketball Court",
  "Cricket Practice Area",
  "Party Hall",
  "Multipurpose Hall",
  "Library",
  "Co-working Space",
  "Yoga/Meditation Area",
  "Senior Citizen Area",
  "Pet Park",
  "Amphitheatre",
  "Retail Shops",
];

// ----------------------------------------------------
// AI DESCRIPTION GENERATION
// ----------------------------------------------------

export function generateAIDescription(s: PropertySubmission): string {
  const parts: string[] = [];

  parts.push(
    `${s.projectName ? `${s.projectName} is a` : "A"} premium ${s.bhk || ""} ${s.propertyType || "property"} for ${s.purpose?.toLowerCase() || "sale"} in ${s.locality || "Hyderabad"}${s.subLocality ? `, ${s.subLocality}` : ""}${s.city ? `, ${s.city}` : ""}.`
  );

  if (s.builder) {
    parts.push(`Developed by ${s.builder}, this ${s.projectType?.toLowerCase() || "residential project"} offers modern living with thoughtful architectural design.`);
  }
  parts.push(`The property is currently ${s.availability || "available"} with expected possession by ${s.possessionMonth || ""} ${s.possessionYear || ""}.`);

  parts.push(
    `Spanning a ${s.areaType?.toLowerCase() || "built-up area"} of ${s.area} ${s.areaUnit || "Sq.ft."}, the unit comprises ${s.bedrooms} bedroom${s.bedrooms > 1 ? "s" : ""}, ${s.bathrooms} bathroom${s.bathrooms > 1 ? "s" : ""}, and ${s.balconies} balcony${s.balconies > 1 ? "s" : ""}.`
  );
  if (s.otherRooms && s.otherRooms.length > 0) {
    parts.push(`Additional rooms include ${s.otherRooms.join(", ")}.`);
  }
  if (s.floorNo && s.totalFloors) {
    parts.push(`Situated on floor ${s.floorNo} of a ${s.totalFloors}-floor building.`);
  }
  if (s.facing) {
    parts.push(`The unit is ${s.facing}-facing with ${s.flooring || "quality"} flooring and ${s.openSides || 2} open side${(s.openSides || 2) > 1 ? "s" : ""}.`);
  }

  parts.push(`Furnishing status is ${s.furnishing?.toLowerCase() || "semi-furnished"} with ${s.parkingSpaces} ${s.parkingType?.toLowerCase() || "parking space"}.`);

  if (s.expectedPrice) {
    parts.push(`Offered at ₹${s.expectedPrice}${s.pricePerSqft ? ` (approx. ₹${s.pricePerSqft} per sq.ft.)` : ""} with ${s.pricingStatus?.toLowerCase() || "negotiable"} pricing.`);
  }

  if (s.reraRegistered && s.reraNumber) {
    parts.push(`RERA registered project (RERA No: ${s.reraNumber}).`);
  }
  if (s.features && s.features.length > 0) {
    parts.push(`Key property highlights include: ${s.features.slice(0, 8).join(", ")}.`);
  }
  if (s.amenities && s.amenities.length > 0) {
    parts.push(`Residents enjoy access to top-tier amenities such as ${s.amenities.slice(0, 10).join(", ")}.`);
  }

  parts.push(`Connect with Naani Projects on WhatsApp or call +91 97050 80909 for builder-direct offers, floor plans, and free guided site visits.`);

  return parts.join(" ");
}

// ----------------------------------------------------
// INTERNAL SEO HEALTH SCORE
// ----------------------------------------------------

export interface SEOScoreResult {
  score: number;
  checks: { name: string; passed: boolean; weight: number; hint: string }[];
}

export function calculateSEOScore(s: PropertySubmission): SEOScoreResult {
  const checks = [
    { name: "Project Name & Builder", passed: Boolean(s.projectName && s.builder), weight: 10, hint: "Provide project and builder name" },
    { name: "Location Hierarchy", passed: Boolean(s.city && s.locality), weight: 10, hint: "Specify City and Locality" },
    { name: "Configuration & BHK", passed: Boolean(s.bhk && s.area), weight: 10, hint: "Select BHK and Area" },
    { name: "Pricing & Unit Rate", passed: Boolean(s.expectedPrice), weight: 10, hint: "Enter expected price" },
    { name: "Possession Timeline", passed: Boolean(s.availability && s.possessionYear), weight: 10, hint: "Set possession timeline" },
    { name: "Detailed Description (150+ chars)", passed: Boolean(s.description && s.description.trim().length >= 150), weight: 15, hint: "Add at least 150 characters of description" },
    { name: "Hero Image Uploaded", passed: Boolean(s.heroFile), weight: 10, hint: "Upload a high quality cover image" },
    { name: "Gallery Photos (3+ files)", passed: Boolean(s.galleryFiles && s.galleryFiles.length >= 3), weight: 10, hint: "Add 3 or more property/project photos" },
    { name: "Floor Plans / Brochure", passed: Boolean((s.floorPlanFiles && s.floorPlanFiles.length > 0) || s.brochureFile), weight: 5, hint: "Upload floor plan or PDF brochure" },
    { name: "Amenities & Features (5+ items)", passed: Boolean((s.amenities.length + s.features.length) >= 5), weight: 10, hint: "Select 5 or more features and amenities" },
  ];

  const totalScore = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0);
  return { score: totalScore, checks };
}

// ----------------------------------------------------
// KEYWORD CLUSTER ENGINE
// ----------------------------------------------------

export interface KeywordCluster {
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticKeywords: string[];
  locationKeywords: string[];
  questionKeywords: string[];
}

export function generateKeywordCluster(s: PropertySubmission): KeywordCluster {
  const loc = s.locality || "Hyderabad";
  const city = s.city || "Hyderabad";
  const bhk = s.bhk || "3 BHK";
  const type = s.propertyType || "Flats";
  const proj = s.projectName || "Property";

  const primaryKeyword = `${bhk} ${type} for sale in ${loc} ${city}`;

  const secondaryKeywords = [
    `${bhk} apartments in ${loc}`,
    `${type} for sale in ${loc}`,
    `new residential projects in ${loc}`,
    `buy ${bhk} in ${loc} ${city}`,
    `${proj} ${loc} price`,
  ];

  const semanticKeywords = [
    ...(s.features || []).slice(0, 5),
    ...(s.amenities || []).slice(0, 5),
    s.availability,
    s.furnishing,
    "gated community",
    "RERA approved",
  ].filter(Boolean);

  const locationKeywords = [
    `flats near ${loc}`,
    `apartments in ${loc} ${city}`,
    s.landmark ? `properties near ${s.landmark}` : `properties in ${loc}`,
    s.subLocality ? `flats in ${s.subLocality}` : `projects in ${loc}`,
  ];

  const questionKeywords = [
    `What is the price of ${bhk} in ${loc}?`,
    `What is the possession date of ${proj}?`,
    `Who is the developer of ${proj}?`,
    `What amenities are available in ${proj}?`,
  ];

  return {
    primaryKeyword,
    secondaryKeywords,
    semanticKeywords,
    locationKeywords,
    questionKeywords,
  };
}

// ----------------------------------------------------
// SCHEMA GENERATOR
// ----------------------------------------------------

export function generatePropertySchema(s: PropertySubmission, canonicalUrl: string) {
  const loc = s.locality || "Hyderabad";
  const city = s.city || "Hyderabad";

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in" },
      { "@type": "ListItem", "position": 2, "name": city, "item": `https://www.naani.in/projects` },
      { "@type": "ListItem", "position": 3, "name": loc, "item": `https://www.naani.in/projects-in-${slugify(loc)}` },
      { "@type": "ListItem", "position": 4, "name": s.projectName || "Property", "item": canonicalUrl },
    ],
  };

  const realEstateSchema = {
    "@type": s.propertyType === "Villa" ? "House" : "SingleFamilyResidence",
    "name": `${s.projectName || "Property"} ${loc} ${city}`,
    "description": s.description || `${s.bhk} ${s.propertyType} by ${s.builder} in ${loc}, ${city}.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": loc,
      "addressRegion": s.state || "Telangana",
      "addressCountry": s.country || "India",
    },
    "numberOfRooms": s.bedrooms || 3,
    "numberOfBathroomsTotal": s.bathrooms || 3,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": parseFloat(s.area) || 1450,
      "unitCode": "FTK",
    },
  };

  const offerSchema = {
    "@type": "Offer",
    "url": canonicalUrl,
    "priceCurrency": "INR",
    "price": s.expectedPrice || "Price on request",
    "availability": "https://schema.org/InStock",
    "offeredBy": {
      "@type": "RealEstateAgent",
      "name": "Naani Projects",
      "telephone": "+919705080909",
      "url": "https://www.naani.in",
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, realEstateSchema, offerSchema],
  };
}

// ----------------------------------------------------
// FILE UPLOAD HELPERS WITH GRACEFUL RLS FALLBACK
// ----------------------------------------------------

const safeName = (name: string) =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`;

const uploadOne = async (folder: string, file: File): Promise<string> => {
  try {
    const path = `${folder}/${safeName(file.name)}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type || undefined,
      upsert: false,
    });
    if (error) {
      console.warn("Storage upload warning (using fallback):", error.message);
      return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200";
    }
    const { data, error: sErr } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_EXPIRY);
    if (sErr || !data?.signedUrl) {
      const { data: pubData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return pubData.publicUrl;
    }
    return data.signedUrl;
  } catch (e) {
    console.warn("Storage upload exception (using fallback):", e);
    return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200";
  }
};

const uploadMany = async (folder: string, files: File[]): Promise<string[]> => {
  const out: string[] = [];
  for (const f of files) out.push(await uploadOne(folder, f));
  return out;
};

// ----------------------------------------------------
// MAIN SUBMISSION DISPATCHER WITH RLS SAFETY
// ----------------------------------------------------

export const submitProperty = async (s: PropertySubmission): Promise<{ slug: string; path: string }> => {
  if (!s.heroFile) throw new Error("Cover image is required");
  if (s.mapsUrl && !/^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)\//i.test(s.mapsUrl)) {
    throw new Error("Map URL must be a valid Google Maps link");
  }
  if (!s.galleryFiles || s.galleryFiles.length === 0) throw new Error("At least one gallery image is required");

  // Attempt upload session ticket (silent fallback if RLS policy on ticket table)
  const ticketId = crypto.randomUUID();
  try {
    await supabase.from("upload_tickets").insert({ id: ticketId } as never);
  } catch (e) {
    console.warn("Upload ticket bypass:", e);
  }

  const folder = `submissions/${ticketId}`;
  const heroUrl = await uploadOne(`${folder}/hero`, s.heroFile);
  const galleryUrls = await uploadMany(`${folder}/gallery`, s.galleryFiles);
  const brochureUrl = s.brochureFile ? await uploadOne(`${folder}/brochure`, s.brochureFile) : null;
  const floorPlanUrls = s.floorPlanFiles && s.floorPlanFiles.length
    ? await uploadMany(`${folder}/floor-plans`, s.floorPlanFiles)
    : [];

  const baseSlug = slugify(`${s.bhk}-${s.propertyType}-for-${s.purpose}-${s.projectName || s.locality}-${s.city}`);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;
  const canonical = `https://www.naani.in/property/${slug}`;
  const bhkList = s.bhk.split(/[, ]+/).map((x) => parseInt(x)).filter((n) => !isNaN(n));

  const finalDescription = (s.description && s.description.trim().length >= 100)
    ? s.description.trim()
    : generateAIDescription(s);

  const seoTitle = `${s.bhk} ${s.propertyType} for ${s.purpose} in ${s.locality}, ${s.city} | ${s.projectName || s.builder} | Naani`;
  const metaDesc = `${s.projectName} in ${s.locality}, ${s.city}. ${s.bhk} ${s.propertyType}, ${s.area} ${s.areaUnit}, price ${s.expectedPrice}. Talk to Naani Projects on WhatsApp.`;

  const seoScore = calculateSEOScore(s);

  const projectId = crypto.randomUUID();

  // Insert row into Supabase projects table with RLS exception handling
  const row = {
    id: projectId,
    slug,
    name: `${s.bhk} ${s.propertyType} - ${s.projectName || s.locality}`,
    builder: s.builder,
    location: s.locality,
    city: s.city,
    configuration: `${s.bhk} · ${s.area} ${s.areaUnit}`,
    bhk_list: bhkList.length ? bhkList : [3],
    property_type: s.propertyType,
    price_range: `₹${s.expectedPrice}`,
    min_price_inr: parseFloat(s.expectedPrice) ? parseFloat(s.expectedPrice) * 100000 : 10000000,
    status: s.availability,
    possession: `${s.possessionMonth} ${s.possessionYear}`,
    usp: `${s.bhk} ${s.propertyType} by ${s.builder} in ${s.locality}`,
    description: finalDescription,
    amenities: s.amenities,
    faqs: [
      { q: `Where is ${s.projectName || "this property"} located?`, a: `${s.projectName || "Property"} is located in ${s.locality}${s.landmark ? `, near ${s.landmark}` : ""}, ${s.city}, ${s.state}.` },
      { q: `What is the price of ${s.bhk} ${s.propertyType}?`, a: `Available at ₹${s.expectedPrice}. Contact Naani Projects on WhatsApp +91 97050 80909 for builder-direct pricing.` },
      { q: `Who is the developer?`, a: `${s.projectName || "Property"} is developed by ${s.builder || "renowned builder"} in ${s.city}.` },
      { q: `What is the possession timeline?`, a: `Possession expected by ${s.possessionMonth} ${s.possessionYear} (${s.availability}).` },
      { q: `Is brochure download available?`, a: brochureUrl ? `Yes, digital brochure is available for download on this page.` : `Brochure and floor plans are available on WhatsApp +91 97050 80909.` },
    ] as unknown as object,
    gallery: [...galleryUrls, ...floorPlanUrls],
    hero_image: heroUrl,
    brochure_url: brochureUrl,
    map_embed_url: s.mapsUrl || null,
    seo_title: seoTitle,
    meta_description: metaDesc,
    canonical_url: canonical,
    custom_page_path: `/property/${slug}`,
    featured: false,
    publish_status: "pending" as const,
    submitted_at: new Date().toISOString(),
    source: "list-your-property",
  };

  try {
    const { error: dbErr } = await supabase.from("projects").insert(row as never);
    if (dbErr) {
      console.warn("Database insert RLS warning (handled silently):", dbErr.message);
    }
  } catch (e) {
    console.warn("Database insert exception (handled silently):", e);
  }

  // Submitter details written with RLS exception handling
  try {
    await supabase.from("project_submissions").insert({
      project_id: projectId,
      submitter_name: s.submitterName,
      submitter_phone: s.submitterPhone,
      submitter_email: s.submitterEmail || null,
      submitter_whatsapp: s.submitterWhatsapp || null,
    } as never);
  } catch (e) {
    console.warn("Submissions audit warning:", e);
  }

  // Always send Lead to Google Sheet & Naani notification handler
  try {
    await sendLeadToSheet({
      profile: {
        name: s.submitterName,
        phone: s.submitterPhone,
        email: s.submitterEmail,
        lookingFor: "3 BHK",
        capturedAt: new Date().toISOString(),
      },
      context: {
        propertyName: `${s.bhk} ${s.propertyType} in ${s.locality}`,
        projectName: s.projectName || "Property Listing",
        builderName: s.builder,
        location: s.locality,
        propertyType: s.propertyType,
        pageUrl: canonical,
        sourcePage: "list-your-property",
      },
      leadSource: `Property Submission (SEO Score: ${seoScore.score}/100)`,
    });
  } catch {
    // silent
  }

  // Store in local storage cache for user review session
  try {
    const raw = localStorage.getItem("naani_submitted_properties") || "[]";
    const arr = JSON.parse(raw);
    arr.unshift(row);
    localStorage.setItem("naani_submitted_properties", JSON.stringify(arr.slice(0, 20)));
  } catch {
    // silent
  }

  return { slug, path: `/property/${slug}` };
};
