/**
 * Casagrand Evon — Structured Project Data & Foundation
 * File: src/data/casagrandEvonData.ts
 * 
 * Phase 2.1: Corrected baseline following strict data verification standards.
 * All speculative floor plan claims, unconfirmed open-space percentages, and
 * historical promotional pricing have been removed from the publishable dataset.
 */

export interface ProjectSpecification {
  category: string;
  items: string[];
}

export interface AmenityGroup {
  category: string;
  source: "developer-brochure" | "rera-sanction";
  amenities: {
    name: string;
    description: string;
    verified: boolean;
  }[];
}

export interface ProjectConfiguration {
  typology: "3 BHK" | "4 BHK";
  superBuiltUpAreaRange: string;
  carpetAreaStatus: string;
  description: string;
  verifiedFeatures: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface DataDiscrepancy {
  field: string;
  marketingVariants: string[];
  sanctionStatus: string;
  editorialResolution: string;
}

export const CASAGRAND_EVON_PROJECT = {
  id: "casagrand-evon-kompally",
  slug: "casagrand-evon-kompally",
  aliasSlug: "casagrand-evon",
  name: "Casagrand Evon",
  developer: "Casagrand",
  promoterLegalEntity: "Casagrand Hyderwise Private Limited", // Exact legal entity on TG RERA certificate
  location: "Kompally, Hyderabad",
  microMarket: "North Hyderabad (NH-44 Corridor)",
  district: "Medchal-Malkajgiri District",
  state: "Telangana",
  pincode: "500014",
  
  // Regulatory Sanctions
  tgReraNumber: "P02200009350",
  tgReraPortalUrl: "https://rerait.telangana.gov.in/",
  tgReraCompletionDate: "June 18, 2030", // As declared on official TG RERA certificate
  hmdaApprovalNumber: "013326/BP/HMDA/2977/MED/2023",
  
  // Development Scale
  landExtentAcres: 6.84, // TG RERA sanctioned land area
  totalApartments: 579,
  totalTowers: 3,
  structure: "2 Basements + Ground + 11 Upper Floors (2B + G + 11)",
  propertyType: "Apartment",
  
  // Open Space: Removed percentage from public data; stored as unconfirmed / null
  openSpacePercentage: null as number | null,
  
  // Lifestyle Architecture
  theme: "Japanese-Themed Landscaped Community",
  clubhouseAreaSft: 34860, // approximately 34,860 to 35,000 Sft
  advertisedAmenitiesSummary: "Developer-advertised clubhouse & outdoor lifestyle amenities",
  
  // Timelines & Possession
  status: "Under Construction",
  developerTargetPossession: "January 2029 (Developer Indicative Target · Not a Contractual Guarantee)",
  possessionTarget: "Awaiting Final Phased Handover Schedule · TG RERA Certificate Valid Through June 18, 2030",
  
  // Pricing: Strictly NULL in database / unannounced
  priceRangeDisplay: "Pricing Upon Request · Awaiting Official Developer Price Sheet",
  minPriceInr: null as number | null,
  maxPriceInr: null as number | null,
  
  // URLs
  canonicalUrl: "https://www.naani.in/projects/casagrand-evon-kompally",
  customPagePath: "/projects/casagrand-evon-kompally",
  developerOfficialUrl: "https://www.casagrand.co.in/residential/ongoing-projects-hyderabad-attapur/casagrand-Evon/",
};

export const CASAGRAND_EVON_CONFIGURATIONS: ProjectConfiguration[] = [
  {
    typology: "3 BHK",
    superBuiltUpAreaRange: "2,075 – 2,080 SFT (Developer-Advertised Super Built-Up Area)",
    carpetAreaStatus: "Actual unit areas and sanctioned plans must be confirmed with the developer",
    description: "Planned 3-bedroom residential apartment format across 2,075 to 2,080 SFT developer-advertised super built-up area in high-rise towers of 2 basements, ground floor, and 11 upper floors. Actual unit areas and sanctioned plans must be confirmed with the developer.",
    verifiedFeatures: [
      "2,075 to 2,080 SFT developer-advertised super built-up area",
      "Multi-storeyed tower placement (2B + G + 11 floors)",
      "Official room dimensions releasing post-sanction",
      "Actual unit areas and sanctioned plans must be confirmed with the developer"
    ]
  },
  {
    typology: "4 BHK",
    superBuiltUpAreaRange: "2,850 SFT (Developer-Advertised Super Built-Up Area)",
    carpetAreaStatus: "Actual unit areas and sanctioned plans must be confirmed with the developer",
    description: "Spacious 4-bedroom executive apartment floor plate encompassing approximately 2,850 SFT developer-advertised super built-up area. Actual unit areas and sanctioned plans must be confirmed with the developer.",
    verifiedFeatures: [
      "2,850 SFT developer-advertised super built-up area executive floor plate",
      "Multi-storeyed tower placement (2B + G + 11 floors)",
      "Official room dimensions releasing post-sanction",
      "Actual unit areas and sanctioned plans must be confirmed with the developer"
    ]
  }
];

export const CASAGRAND_EVON_AMENITIES: AmenityGroup[] = [
  {
    category: "Clubhouse & Lifestyle Infrastructure",
    source: "developer-brochure",
    amenities: [
      {
        name: "Grand Resident Clubhouse (~34,860 SFT)",
        description: "Multi-level resident lifestyle hub housing sports, recreation, and wellness infrastructure.",
        verified: true
      },
      {
        name: "Swimming Pool",
        description: "Resident swimming pool with adjacent deck area.",
        verified: true
      },
      {
        name: "Gymnasium",
        description: "Dedicated indoor fitness centre for cardio and resistance training.",
        verified: true
      },
      {
        name: "Multi-Purpose Hall",
        description: "Community banquet and event facility for residents.",
        verified: true
      }
    ]
  },
  {
    category: "Japanese-Themed Landscaping",
    source: "developer-brochure",
    amenities: [
      {
        name: "Zen Landscaped Courtyard",
        description: "Contemplative garden area designed with Japanese-inspired aesthetic elements.",
        verified: true
      },
      {
        name: "Pergola Walkways & Green Corridors",
        description: "Outdoor pedestrian pathways with architectural shade structures and perimeter landscaping.",
        verified: true
      }
    ]
  },
  {
    category: "Sports & Recreation",
    source: "developer-brochure",
    amenities: [
      {
        name: "Indoor Badminton Facility",
        description: "Indoor court allocated within the clubhouse complex.",
        verified: true
      },
      {
        name: "Indoor Games Zone",
        description: "Dedicated space for recreational table sports such as table tennis and chess.",
        verified: true
      },
      {
        name: "Children's Outdoor Play Area",
        description: "Designated play zone equipped with children's play equipment.",
        verified: true
      }
    ]
  },
  {
    category: "Safety & Essential Utilities",
    source: "rera-sanction",
    amenities: [
      {
        name: "24/7 Gated Security & Checkpoints",
        description: "Perimeter boundary, manned security posts, and digital access control.",
        verified: true
      },
      {
        name: "Generator Power Backup",
        description: "DG electrical backup for lifts, water pumps, and essential services.",
        verified: true
      },
      {
        name: "Rainwater Harvesting & Sewage Treatment",
        description: "Sanctioned environmental infrastructure in compliance with municipal norms.",
        verified: true
      }
    ]
  }
];

export const CASAGRAND_EVON_FAQS: FaqItem[] = [
  {
    q: "Who is the registered promoter of Casagrand Evon in Kompally?",
    a: "Casagrand Evon is developed under the Casagrand brand, with Casagrand Hyderwise Private Limited registered as the official promoter entity on the Telangana RERA certificate."
  },
  {
    q: "What is the TG RERA registration number and validity?",
    a: "Casagrand Evon is officially registered under TG RERA Registration Number P02200009350. The RERA certificate completion date is recorded as June 18, 2030."
  },
  {
    q: "What is the municipal building approval number?",
    a: "The project has obtained HMDA building permission under Sanction Permit Number 013326/BP/HMDA/2977/MED/2023."
  },
  {
    q: "Where is Casagrand Evon located in Kompally?",
    a: "The development is located in Kompally, Medchal-Malkajgiri District, North Hyderabad, situated near the NH-44 highway corridor with connectivity toward Nehru Outer Ring Road (ORR Exit 6 at Kandlakoya) and Suchitra Circle."
  },
  {
    q: "What is the total land extent and apartment count?",
    a: "The project spans approximately 6.84 acres as recorded in regulatory filings, comprising 579 residential apartments across 3 towers of 2 basements, ground floor, and 11 upper floors (2B + G + 11)."
  },
  {
    q: "Which apartment configurations and sizes are available?",
    a: "The project offers 3 BHK apartments (2,075 to 2,080 SFT developer-advertised super built-up area) and 4 BHK luxury residences (2,850 SFT developer-advertised super built-up area). Actual unit areas and sanctioned plans must be confirmed with the developer."
  },
  {
    q: "What is the scale of the clubhouse?",
    a: "The project features a dedicated resident clubhouse spanning approximately 34,860 SFT, planned to house indoor sports, fitness, and community recreation facilities."
  },
  {
    q: "What is the expected possession timeline?",
    a: "The developer's marketing literature cites an indicative target of early 2029 (unconfirmed guarantee), while the statutory TG RERA certificate validity extends through June 18, 2030."
  },
  {
    q: "Has official unit pricing been confirmed?",
    a: "Official unit pricing depends on the selected floor-rise, unit facing, and promotional phase. Naani Projects does not quote historical unconfirmed promotional rates as binding contractual prices; prospective buyers are advised to verify active price sheets directly with the sales desk."
  }
];

export const CASAGRAND_EVON_DATA_DISCREPANCIES: DataDiscrepancy[] = [
  {
    field: "Open Space Percentage",
    marketingVariants: ["62% Open Space", "67% Open Space"],
    sanctionStatus: "Unconfirmed in public copy; awaits municipal landscape sanction audit",
    editorialResolution: "Removed all numerical percentages from public copy. Stored strictly as null / unconfirmed."
  },
  {
    field: "Historical Promotional Pricing",
    marketingVariants: ["₹7,099/SFT (Early launch flyer)", "₹1.46 Cr to ₹2.00 Cr (Web portal variants)"],
    sanctionStatus: "Promotional marketing rates fluctuate across releases and do not represent contractual prices",
    editorialResolution: "Kept min_price_inr and max_price_inr as null. Stated as 'Pricing Upon Request'."
  },
  {
    field: "Promoter Legal Entity",
    marketingVariants: ["Casagrand Builder Private Limited", "Casagrand Hyderwise Private Limited"],
    sanctionStatus: "TG RERA Certificate explicitly registers Casagrand Hyderwise Private Limited",
    editorialResolution: "Separated brand ('Casagrand') from registered legal entity ('Casagrand Hyderwise Private Limited')."
  },
  {
    field: "Possession Target",
    marketingVariants: ["January 2029 (Developer Marketing)", "June 18, 2030 (TG RERA Certificate Declared Date)"],
    sanctionStatus: "TG RERA certificate completion date is June 18, 2030",
    editorialResolution: "Published both distinctly: RERA completion June 18, 2030; early 2029 labeled as developer indicative milestone."
  }
];
