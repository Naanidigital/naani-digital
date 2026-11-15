import React, { useState, useId } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import {
  MessageCircle,
  Phone,
  MapPin,
  Building2,
  Layers,
  Maximize2,
  Calendar,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  Compass,
  Home,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Dumbbell,
  Waves,
  Trees,
  Users,
  Briefcase,
  Zap,
  Activity,
  Tv,
  Check,
  Info,
  HelpCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Download,
  Eye,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { sendLeadToSheet, type LeadProfile, type PageContext } from "@/lib/leadProfile";

// High-resolution authentic project visual assets
import felicityElevationTwilight from "@/assets/pavani-felicity/pavani-felicity-elevation-twilight.webp";
import felicityTower from "@/assets/pavani-felicity/pavani-felicity-tower.webp";
import felicityDroneAerial from "@/assets/pavani-felicity/pavani-felicity-drone-aerial.webp";
import felicityBalconyView from "@/assets/pavani-felicity/pavani-felicity-balcony-view.webp";
import felicityElevationDay from "@/assets/pavani-felicity/pavani-felicity-elevation-day.webp";
import felicityAerialCourtyard from "@/assets/pavani-felicity/pavani-felicity-aerial-courtyard.webp";
import felicityMasterplan from "@/assets/pavani-felicity/pavani-felicity-masterplan.jpg";

// Centralized Project Configuration (Fact-Checked & Authoritative)
export const PROJECT_CONFIG = {
  name: "Pavani Felicity",
  developer: "Pavani Infra",
  promoter: "Sai Sravanthi Infra Projects Private Limited",
  location: "Nizampet, Hyderabad",
  locality: "Opposite Sapthapadi Convention Centre, Near Hill County",
  address: "Opposite Sapthapadi Convention Centre, Adjacent to Hill County, Nizampet, Hyderabad, Telangana 500090",
  startingPrice: "Contact for Latest Price",
  priceRange: "Price on Request (Dynamic Inventory)",
  pricePerSqFt: "Pricing available on verified developer request",
  reraNumber: "P02200005477",
  reraDisplay: "TG RERA Registered: P02200005477",
  landArea: "Approximately 2.16 – 2.5 Acres",
  towers: "Single Residential High-Rise Tower",
  structure: "2 Cellars + Stilt + 23 Floors (Provisional / Approved Plan)",
  totalUnits: "Approximately 273 – 278 Units (Subject to Verification)",
  configurations: "Exclusive 3 BHK Luxury Residences",
  sizeRange: "1,561 – 2,514 Sq. Ft.",
  openSpace: "Approximately 65% Open Spaces (Advertised)",
  amenitiesScale: "Multi-Level Clubhouse & Rooftop Lifestyle Infrastructure",
  possession: "October 2028 (Provisional RERA Target)",
  status: "Under Construction",
  canonicalUrl: "https://www.naani.in/projects/pavani-felicity-nizampet",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Pavani Felicity",
  developerWebsite: "https://pavaniinfra.com",
  reraWebsite: "https://rera.telangana.gov.in/",
  hero_image: "/assets/pavani-felicity/pavani-felicity-elevation-twilight.webp",
  gallery: [
    "/assets/pavani-felicity/pavani-felicity-elevation-twilight.webp",
    "/assets/pavani-felicity/pavani-felicity-elevation-day.webp",
    "/assets/pavani-felicity/pavani-felicity-tower.webp",
    "/assets/pavani-felicity/pavani-felicity-aerial-courtyard.webp",
    "/assets/pavani-felicity/pavani-felicity-drone-aerial.webp",
    "/assets/pavani-felicity/pavani-felicity-balcony-view.webp",
    "/assets/pavani-felicity/pavani-felicity-masterplan.jpg",
  ],
};

export interface ProjectVisual {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
  tag: string;
  category: "elevation" | "aerial" | "lifestyle" | "masterplan";
  alt: string;
}

export const PROJECT_VISUALS: ProjectVisual[] = [
  {
    id: "elevation-twilight",
    title: "Tower Elevation at Twilight (23 Storeys)",
    subtitle: "Iconic high-rise single tower with illuminated private balconies, cascading architectural facade, and landscaped ground perimeter",
    src: felicityElevationTwilight,
    badge: "Twilight Elevation",
    tag: "23 Floors High-Rise",
    category: "elevation",
    alt: "Pavani Felicity illuminated 23-floor luxury high-rise tower at twilight in Nizampet, Hyderabad",
  },
  {
    id: "elevation-day",
    title: "Daytime Front Elevation & Modern Facade",
    subtitle: "Contemporary glass-and-concrete exterior detailing with expansive floor-to-ceiling balcony projections and multi-tier greens",
    src: felicityElevationDay,
    badge: "Daytime Elevation",
    tag: "Contemporary Architecture",
    category: "elevation",
    alt: "Pavani Felicity daytime front architectural elevation of the 23-storey residential tower",
  },
  {
    id: "tower",
    title: "Vertical Skyline Tower Perspective",
    subtitle: "Dramatic high-angle vertical perspective emphasizing the 23-floor height, tree-lined avenue approach, and prime Nizampet location",
    src: felicityTower,
    badge: "Skyline Landmark",
    tag: "Nizampet Corridor",
    category: "elevation",
    alt: "Pavani Felicity vertical architectural high-rise tower facade with landscaped road approach",
  },
  {
    id: "aerial-courtyard",
    title: "3D Isometric Quad-Courtyard Master Architecture",
    subtitle: "Geometric quad-wing design surrounding an internal open courtyard, ground-level vehicle circulation, entry plaza, and rooftop gardens",
    src: felicityAerialCourtyard,
    badge: "3D Architectural Render",
    tag: "Quad-Courtyard Design",
    category: "aerial",
    alt: "Pavani Felicity 3D isometric architectural aerial view highlighting central courtyard and rooftop terrace",
  },
  {
    id: "drone-aerial",
    title: "High-Altitude Neighborhood & Locality Drone Aerial",
    subtitle: "Expansive bird's-eye view showcasing the immediate proximity to the natural lake, Sapthapadi Convention Centre, and Hill County enclave",
    src: felicityDroneAerial,
    badge: "Locality Aerial View",
    tag: "Lake Proximity",
    category: "aerial",
    alt: "Pavani Felicity high-altitude aerial drone perspective showing tower, lake waterbody, and Nizampet neighborhood",
  },
  {
    id: "balcony-view",
    title: "Panoramic Horizon Sit-Out Balcony View",
    subtitle: "Wide sit-out balcony offering uninterrupted vistas across the tranquil lake waterbody, Nizampet residential greens, and city skyline",
    src: felicityBalconyView,
    badge: "Balcony Skyline View",
    tag: "Lake & City Vistas",
    category: "lifestyle",
    alt: "Pavani Felicity spacious sit-out balcony view overlooking panoramic Nizampet lake and city skyline",
  },
  {
    id: "masterplan",
    title: "Official Sanctioned Typical Floor Plate & Master Layout",
    subtitle: "Architectural floor plate detailing 12 exclusive 3 BHK units per floor (Units 01 to 12 from 1,797 to 2,514 Sft), central swimming pool courtyard, and dual entry-exit boulevards",
    src: felicityMasterplan,
    badge: "Sanctioned Blueprint",
    tag: "Floor Plate Layout",
    category: "masterplan",
    alt: "Pavani Felicity official floor plate layout showing 12 3-BHK units per floor with exact square footage and central courtyard swimming pool",
  },
];

export interface FloorPlateUnit {
  unitNo: string;
  bhk: string;
  sizeSft: number;
  facing: string;
  features: string;
}

export const FLOOR_PLATE_UNITS: FloorPlateUnit[] = [
  { unitNo: "01", bhk: "3 BHK", sizeSft: 2172, facing: "East", features: "Spacious layout with foyer, 3 baths, dual balconies, utility" },
  { unitNo: "02", bhk: "3 BHK", sizeSft: 2491, facing: "North-East", features: "Large 3 BHK with expansive living/dining, walk-in closet, sit-out" },
  { unitNo: "03", bhk: "3 BHK", sizeSft: 2269, facing: "North", features: "Large living area, pooja room, dedicated utility balcony" },
  { unitNo: "04", bhk: "3 BHK", sizeSft: 2491, facing: "North-West", features: "Grand three-bedroom layout with panoramic corner ventilation" },
  { unitNo: "05", bhk: "3 BHK", sizeSft: 2088, facing: "West", features: "Efficient 3 BHK with master bedroom sit-out and family lounge" },
  { unitNo: "06", bhk: "3 BHK", sizeSft: 2088, facing: "West", features: "Symmetrical three-bedroom plan with cross-ventilation" },
  { unitNo: "07", bhk: "3 BHK", sizeSft: 2514, facing: "South-West", features: "Largest unit configuration on floor plate, palatial room sizes" },
  { unitNo: "08", bhk: "3 BHK", sizeSft: 1879, facing: "South", features: "Compact luxury 3 BHK with optimal space efficiency" },
  { unitNo: "09", bhk: "3 BHK", sizeSft: 1797, facing: "South-East", features: "Smart 3 BHK layout with dedicated dining and utility zone" },
  { unitNo: "10", bhk: "3 BHK", sizeSft: 1879, facing: "East", features: "East-facing 3 BHK with private foyer and sit-out balcony" },
  { unitNo: "11", bhk: "3 BHK", sizeSft: 2476, facing: "East", features: "Expansive luxury unit with lake views and large master suite" },
  { unitNo: "12", bhk: "3 BHK", sizeSft: 2172, facing: "North-East", features: "Premium unit facing courtyard pool and open sky" },
];

// 12 Published Sizes grouped for browsing
export interface ConfigTier {
  id: string;
  category: "all" | "compact" | "spacious" | "large";
  tierTitle: string;
  sizeBand: string;
  description: string;
  sizes: number[];
  highlights: string[];
}

export const CONFIG_TIERS: ConfigTier[] = [
  {
    id: "compact-3bhk",
    category: "compact",
    tierTitle: "Compact 3 BHK Residences",
    sizeBand: "1,561 – 1,818 Sq.Ft.",
    description: "Highly efficient 3-bedroom configurations offering smart zoning, dedicated utility balconies, and optimal space utilization for young urban families.",
    sizes: [1561, 1725, 1797, 1805, 1818],
    highlights: [
      "Vastu-compliant layouts designed for abundant natural light & cross-ventilation",
      "Separated living & dining areas ensuring privacy when hosting guests",
      "Functional kitchen layout with attached dedicated utility balcony",
      "Low maintenance overheads with premium high-rise lifestyle benefits",
    ],
  },
  {
    id: "spacious-3bhk",
    category: "spacious",
    tierTitle: "Spacious 3 BHK Residences",
    sizeBand: "1,961 – 2,190 Sq.Ft.",
    description: "Generously proportioned three-bedroom layouts featuring grand master suites, large sit-out balconies, and dedicated pooja spaces.",
    sizes: [1961, 2014, 2152, 2190],
    highlights: [
      "Expansive master bedroom with walk-in wardrobe space and en-suite bath",
      "Wide sit-out balcony opening to panoramic Nizampet & Hill County skyline views",
      "Dedicated pooja space and enhanced foyer transition area",
      "High-liquidity format favored by corporate & IT executives in West Hyderabad",
    ],
  },
  {
    id: "large-3bhk",
    category: "large",
    tierTitle: "Large 3 BHK Residences",
    sizeBand: "2,269 – 2,514 Sq.Ft.",
    description: "Palatial 3 BHK residences rivaling villa floor plates, engineered for multi-generational comfort with dual balconies and extensive living areas.",
    sizes: [2269, 2395, 2514],
    highlights: [
      "L-shaped expansive living & dining expanse accommodating lavish entertaining",
      "Three grand bedrooms each with private attached bathrooms",
      "Dual outdoor balconies offering scenic cross-ventilation and views",
      "Reserved prime cellar parking slots with EV charging infrastructure access",
    ],
  },
];

interface AmenityCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  subtitle: string;
  items: string[];
}

const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "indoor",
    name: "Indoor & Clubhouse",
    icon: <Briefcase className="w-5 h-5 text-amber-400" />,
    subtitle: "Air-conditioned multi-level clubhouse, remote work lounges and leisure",
    items: [
      "Grand Reception & Waiting Foyer",
      "Multipurpose Celebration Banquet Hall",
      "Co-Working Space & Business Workstations",
      "Air-Conditioned Mini Theatre Screening Room",
      "Indoor Games Arena (Table Tennis, Billiards)",
      "Carrom, Chess & Board Game Lounge",
      "Wellness Spa & Grooming Infrastructure Provision",
      "Community Gathering Spaces & Society Office",
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Recreation & Sports",
    icon: <Waves className="w-5 h-5 text-amber-400" />,
    subtitle: "Active sports facilities, landscaped leisure gardens and family parks",
    items: [
      "Resort-Scale Swimming Pool & Sunbathing Deck",
      "Safe Kids Splash Pool with Overflow Filtration",
      "Badminton Practice Court",
      "Basketball Practice Half-Court",
      "Cricket Practice Pitch with Protective Netting",
      "Smooth Roller Skating Rink",
      "Children Play Area with Impact Rubber Flooring",
      "Landscaped Theme Gardens & Sculpture Court",
      "Acupressure Reflexology Walking Path",
      "Senior Citizen Sit-Outs & Outdoor Gazebos",
    ],
  },
  {
    id: "fitness",
    name: "Fitness & Wellness",
    icon: <Dumbbell className="w-5 h-5 text-amber-400" />,
    subtitle: "Dedicated health facilities promoting holistic everyday wellness",
    items: [
      "Fully Equipped Modern Gymnasium with Cardio & Strength Stations",
      "Dedicated Peaceful Yoga & Meditation Studio",
      "Perimeter Jogging & Brisk Walking Track",
      "Aerobics & Freehand Workout Deck",
      "Green Open-Air Exercise Pavilions",
      "Health & First Aid Consultation Room",
    ],
  },
  {
    id: "security",
    name: "Infrastructure & Security",
    icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    subtitle: "Engineered safety, smart access control, and 24/7 estate reliability",
    items: [
      "2-Level Basement Parking with Clear Directional Signage",
      "Provisions for Resident EV Vehicle Charging",
      "100% DG Emergency Power Backup for Common Areas",
      "24/7 CCTV Surveillance with High-Definition IP Cameras",
      "Automated Boom Barriers with RFID Resident Tags",
      "Rainwater Harvesting System & Modern STP",
    ],
  },
];

export const PavaniFelicityPage = () => {
  const formId = useId();
  const [activeHeroTab, setActiveHeroTab] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<ProjectVisual | null>(null);
  const [galleryCategory, setGalleryCategory] = useState<string>("all");
  const [selectedFloorUnit, setSelectedFloorUnit] = useState<number | null>(null);

  const [activeConfigCategory, setActiveConfigCategory] = useState<
    "all" | "compact" | "spacious" | "large"
  >("all");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [activeAmenityTab, setActiveAmenityTab] = useState<string>("indoor");
  const [copiedRera, setCopiedRera] = useState(false);

  // Lead Form State (Consent UNCHECKED by default)
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    sizePreference: "Compact 3 BHK (1,561–1,818 Sft)",
    purpose: "Self Use",
    visitDate: "",
    consent: false,
  });

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyRera = () => {
    navigator.clipboard.writeText(PROJECT_CONFIG.reraNumber);
    setCopiedRera(true);
    setTimeout(() => setCopiedRera(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please provide your full name.");
      return;
    }

    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please acknowledge and check the consent box to proceed.");
      return;
    }

    setFormStatus("loading");

    try {
      const leadProfile: LeadProfile = {
        name: formData.name.trim(),
        mobile: cleanMobile,
        email: formData.email.trim() || undefined,
        requirements: {
          bhk: "3 BHK",
          preferredUnitSize: formData.sizePreference,
          purpose: formData.purpose as "Self Use" | "Investment",
          preferredVisitDate: formData.visitDate || undefined,
        },
      };

      const pageContext: PageContext = {
        projectName: PROJECT_CONFIG.name,
        location: PROJECT_CONFIG.location,
        leadSource: PROJECT_CONFIG.leadSource,
        pageUrl: typeof window !== "undefined" ? window.location.href : PROJECT_CONFIG.canonicalUrl,
        pageTitle: `${PROJECT_CONFIG.name} Nizampet | 3 BHK Flats in Hyderabad`,
        timestamp: new Date().toISOString(),
      };

      await sendLeadToSheet(leadProfile, pageContext);
      setFormStatus("success");
    } catch {
      setFormStatus("error");
      setErrorMessage("Unable to submit enquiry at this moment. Please call or WhatsApp us directly.");
    }
  };

  const waMessage = encodeURIComponent(
    `Hi Naani Projects, I am interested in Pavani Felicity Nizampet. Please share current pricing, 3 BHK floor plans, and availability.`
  );
  const waUrl = `https://wa.me/91${PROJECT_CONFIG.phoneRaw}?text=${waMessage}`;

  // Structured Data (JSON-LD)
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.naani.in/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://www.naani.in/projects",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Nizampet",
        "item": "https://www.naani.in/projects-in-nizampet",
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Pavani Felicity",
        "item": PROJECT_CONFIG.canonicalUrl,
      },
    ],
  };

  const schemaProject = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": "Pavani Felicity",
    "description":
      "Pavani Felicity is a premium high-rise residential apartment development by Pavani Infra, located opposite Sapthapadi Convention Centre and adjacent to Hill County in Nizampet, Hyderabad. Offering spacious 3 BHK luxury residences across ~2.5 acres.",
    "url": PROJECT_CONFIG.canonicalUrl,
    "telephone": PROJECT_CONFIG.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": PROJECT_CONFIG.address,
      "addressLocality": "Nizampet",
      "addressRegion": "Telangana",
      "postalCode": "500090",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.5186",
      "longitude": "78.3842",
    },
    "numberOfAccommodationUnits": 278,
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Multi-Level Clubhouse", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Swimming Pool & Kids Pool", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Gymnasium & Fitness Center", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Co-Working Business Hub", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Landscaped Theme Gardens", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "2-Level Basement Parking", "value": true },
    ],
  };

  const schemaFaqs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where is Pavani Felicity located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pavani Felicity is located opposite Sapthapadi Convention Centre and adjacent to Hill County in Nizampet, Hyderabad, Telangana 500090, offering convenient access to Bachupally, Miyapur Metro, and JNTU Kukatpally.",
        },
      },
      {
        "@type": "Question",
        "name": "Who is the developer of Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The project is developed by Pavani Infra and promoted under Sai Sravanthi Infra Projects Private Limited, an established real estate developer in the Hyderabad metropolitan region.",
        },
      },
      {
        "@type": "Question",
        "name": "What apartment configurations are available at Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pavani Felicity exclusively offers spacious 3 BHK residential apartments across twelve published size options ranging from 1,561 to 2,514 sq. ft.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the RERA registration number of Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pavani Felicity is registered with Telangana RERA under registration ID TG RERA P02200005477.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the expected possession timeline for Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The provisional RERA-linked completion timeline is October 2028. Prospective buyers are advised that earlier marketing literature showed December 2026; therefore, October 2028 serves as the provisional regulatory benchmark, and buyers should verify current tower-specific milestones on the TG RERA portal.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the tower height and structure of Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Published information indicates a single high-rise residential tower rising 2 Cellars + Stilt + 23 Floors, housing approximately 273 to 278 units across ~2.5 acres.",
        },
      },
      {
        "@type": "Question",
        "name": "What amenities are featured at Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Amenities include a multi-level clubhouse, swimming pool, kids splash pool, gymnasium, yoga studio, co-working space, banquet hall, mini theatre, badminton court, basketball practice court, cricket pitch, skating rink, and landscaped gardens.",
        },
      },
      {
        "@type": "Question",
        "name": "How can I get verified floor plans for Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can inspect the official typical floor plate diagram on this page or request sanctioned high-resolution architectural drawings directly through Naani Projects by clicking 'Request Floor Plans' or messaging our property advisor on WhatsApp at +91 94939 43946.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the pricing for apartments at Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pricing is dynamic and provided on request based on floor rise, facing, and current builder releases. Connect with Naani Projects for the latest transparent cost sheet.",
        },
      },
      {
        "@type": "Question",
        "name": "Is Pavani Felicity close to schools and hospitals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is situated along the Nizampet-Bachupally education corridor near Silver Oaks, Kennedy High The Global School, Oakridge International, and within 10-15 minutes of Pranaam Hospital and SLG Hospital.",
        },
      },
      {
        "@type": "Question",
        "name": "How far is Pavani Felicity from the metro station?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Miyapur Metro Station is approximately 10 to 12 minutes drive, and JNTU Kukatpally Metro is approximately 10 to 14 minutes drive along Nizampet Main Road.",
        },
      },
      {
        "@type": "Question",
        "name": "How can I schedule a site visit to Pavani Felicity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fill out the site visit request form on this page or call our property advisory team at +91 94939 43946 for guided on-site inspection and inventory consultation.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Pavani Felicity Nizampet | 3 BHK Flats in Hyderabad"
        description="Explore Pavani Felicity Nizampet, Hyderabad. Discover spacious 3 BHK apartments, floor plans, clubhouse amenities, location advantages and project details."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        ogImage="https://www.naani.in/og-pavani-felicity.jpg"
        type="website"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProject) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaqs) }}
      />

      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 pb-20 md:pb-0">
        {/* 1. HERO SECTION WITH OFFICIAL INTERACTIVE VISUAL SHOWCASE */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-800/80">
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
            <div className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full" />
            <div className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-6">
              <Link to="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-slate-600" />
              <Link to="/projects" className="hover:text-amber-400 transition-colors">
                Projects
              </Link>
              <ChevronRight size={14} className="text-slate-600" />
              <Link to="/projects-in-nizampet" className="hover:text-amber-400 transition-colors">
                Nizampet
              </Link>
              <ChevronRight size={14} className="text-slate-600" />
              <span className="text-amber-400 font-semibold truncate">Pavani Felicity</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Headings, Interactive Media Carousel, Badges & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
                  <span>Pavani Infra · Sai Sravanthi · Opposite Sapthapadi Convention, Nizampet</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Pavani Felicity <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                    Premium 3 BHK Apartments in Nizampet, Hyderabad
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                  Experience spacious living with thoughtfully designed 3 BHK residences, premium lifestyle amenities, and convenient connectivity in Nizampet. Positioned opposite Sapthapadi Convention Centre and adjacent to Hill County.
                </p>

                {/* OFFICIAL INTERACTIVE HERO VISUAL SHOWCASE */}
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl group">
                  <div
                    className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden cursor-zoom-in"
                    onClick={() => setSelectedImage(PROJECT_VISUALS[activeHeroTab])}
                  >
                    <img
                      src={PROJECT_VISUALS[activeHeroTab].src}
                      alt={PROJECT_VISUALS[activeHeroTab].alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fetchPriority="high"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow">
                        {PROJECT_VISUALS[activeHeroTab].badge}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-[10px] font-bold text-emerald-300 shadow">
                        Official Project Visual
                      </span>
                    </div>

                    {/* Zoom Action Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(PROJECT_VISUALS[activeHeroTab]);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-amber-400 transition-colors z-10 shadow"
                      aria-label="Enlarge image"
                    >
                      <Maximize2 size={16} />
                    </button>

                    {/* Desktop Prev / Next Navigation Arrows */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHeroTab((prev) => (prev === 0 ? PROJECT_VISUALS.length - 1 : prev - 1));
                      }}
                      className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white hover:text-amber-400 hover:border-amber-400/50 items-center justify-center transition-all z-10 shadow-lg"
                      aria-label="Previous Visual"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHeroTab((prev) => (prev === PROJECT_VISUALS.length - 1 ? 0 : prev + 1));
                      }}
                      className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white hover:text-amber-400 hover:border-amber-400/50 items-center justify-center transition-all z-10 shadow-lg"
                      aria-label="Next Visual"
                    >
                      <ChevronRight size={18} />
                    </button>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-left">
                      <p className="text-xs sm:text-sm font-bold text-white flex items-center justify-between">
                        <span>{PROJECT_VISUALS[activeHeroTab].title}</span>
                        <span className="text-[11px] text-amber-400 font-mono hidden sm:inline">
                          {activeHeroTab + 1} / {PROJECT_VISUALS.length}
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {PROJECT_VISUALS[activeHeroTab].subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Quick Switcher Thumbnails */}
                  <div className="grid grid-cols-4 sm:grid-cols-7 p-2 bg-slate-950/90 border-t border-slate-800 gap-1.5 overflow-x-auto">
                    {PROJECT_VISUALS.map((vis, idx) => (
                      <button
                        key={vis.id}
                        type="button"
                        onClick={() => setActiveHeroTab(idx)}
                        className={`flex items-center gap-1.5 p-1 rounded-lg text-left transition-all ${
                          activeHeroTab === idx
                            ? "bg-amber-500/20 border border-amber-500/50 text-amber-300 ring-1 ring-amber-400/40"
                            : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                        }`}
                      >
                        <img
                          src={vis.src}
                          alt={vis.badge}
                          className="w-8 h-8 sm:w-10 sm:h-8 object-cover rounded shrink-0"
                        />
                        <div className="min-w-0 hidden lg:block">
                          <span className="text-[9px] font-bold block truncate">{vis.badge}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6 Key Project Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Land Parcel
                    </span>
                    <span className="text-base font-extrabold text-white">~2.5 Acres</span>
                    <span className="text-[11px] text-slate-400 block">~65% Open Spaces</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Tower Configuration
                    </span>
                    <span className="text-base font-extrabold text-white">Single Tower</span>
                    <span className="text-[11px] text-slate-400 block">2C + Stilt + 23 Floors</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Total Units
                    </span>
                    <span className="text-base font-extrabold text-white">~273 – 278</span>
                    <span className="text-[11px] text-amber-400 font-semibold block">Provisional Units</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Residences
                    </span>
                    <span className="text-base font-extrabold text-white">3 BHK Only</span>
                    <span className="text-[11px] text-slate-400 block">1,561 – 2,514 Sq.Ft.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      RERA Verified
                    </span>
                    <span className="text-base font-extrabold text-amber-400">P02200005477</span>
                    <span className="text-[11px] text-slate-400 block">TG RERA Registered</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Possession
                    </span>
                    <span className="text-base font-extrabold text-amber-400">Oct 2028</span>
                    <span className="text-[11px] text-slate-400 block">Provisional Target</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="#enquiry-section"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <span>Get Latest Price</span>
                    <ArrowRight size={16} className="ml-2" />
                  </a>

                  <a
                    href="#floorplans"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 font-bold text-sm transition-all active:scale-95"
                  >
                    <Layers size={15} className="mr-2 text-amber-400" />
                    <span>View Floor Plans</span>
                  </a>

                  <a
                    href="#gallery"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 font-bold text-sm transition-all active:scale-95"
                  >
                    <Eye size={15} className="mr-2 text-amber-400" />
                    <span>Visual Gallery</span>
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm transition-all border border-emerald-500/40 shadow-sm active:scale-95"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    <span>WhatsApp Now</span>
                  </a>

                  <a
                    href={`tel:${PROJECT_CONFIG.phone}`}
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 font-bold text-sm transition-all active:scale-95"
                  >
                    <Phone size={15} className="mr-2 text-amber-400" />
                    <span>{PROJECT_CONFIG.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Advisory Lead Capture Card */}
              <div className="lg:col-span-5" id="enquiry-section">
                <div className="sticky top-24 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-7 shadow-2xl space-y-5">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-widest uppercase text-amber-400 block mb-1">
                      Direct Advisory Access
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Request Pricing &amp; Floor Plans
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Receive verified floor plans, transparent cost estimates, and unit availability directly from authorized advisors.
                    </p>
                  </div>

                  {formStatus === "success" ? (
                    <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="text-base font-bold text-white">Enquiry Received!</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Thank you for your interest in <strong>Pavani Felicity</strong>. Our senior property advisor will connect with you on WhatsApp / Phone shortly with verified floor plans and pricing.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 pt-2"
                      >
                        <MessageCircle size={14} />
                        <span>Chat immediately on WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                          <AlertTriangle size={15} className="shrink-0 text-red-400" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor={`${formId}-name`}
                          className="block text-xs font-bold text-slate-300 mb-1"
                        >
                          Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          id={`${formId}-name`}
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sravan Kumar"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label
                          htmlFor={`${formId}-mobile`}
                          className="block text-xs font-bold text-slate-300 mb-1"
                        >
                          Mobile Number <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id={`${formId}-mobile`}
                            required
                            maxLength={10}
                            value={formData.mobile}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mobile: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            placeholder="+91 9876543210"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          10-digit Indian mobile number
                        </span>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor={`${formId}-email`}
                          className="block text-xs font-bold text-slate-300 mb-1"
                        >
                          Email Address <span className="text-slate-400 text-[10px]">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          id={`${formId}-email`}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      {/* Preferred Size & Buying Purpose */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`${formId}-size`}
                            className="block text-xs font-bold text-slate-300 mb-1"
                          >
                            Preferred Size
                          </label>
                          <select
                            id={`${formId}-size`}
                            value={formData.sizePreference}
                            onChange={(e) =>
                              setFormData({ ...formData, sizePreference: e.target.value })
                            }
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="Compact 3 BHK (1,561–1,818 Sft)">Compact 3 BHK (1,561–1,818 Sft)</option>
                            <option value="Spacious 3 BHK (1,961–2,190 Sft)">Spacious 3 BHK (1,961–2,190 Sft)</option>
                            <option value="Large 3 BHK (2,269–2,514 Sft)">Large 3 BHK (2,269–2,514 Sft)</option>
                            <option value="All Sizes">Explore All Sizes</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor={`${formId}-purpose`}
                            className="block text-xs font-bold text-slate-300 mb-1"
                          >
                            Buying Purpose
                          </label>
                          <select
                            id={`${formId}-purpose`}
                            value={formData.purpose}
                            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="Self Use">Self Use / Family Living</option>
                            <option value="Investment">Investment / Long-Term</option>
                          </select>
                        </div>
                      </div>

                      {/* Preferred Visit Date */}
                      <div>
                        <label
                          htmlFor={`${formId}-date`}
                          className="block text-xs font-bold text-slate-300 mb-1"
                        >
                          Preferred Site Visit Date <span className="text-slate-400 text-[10px]">(Optional)</span>
                        </label>
                        <input
                          type="date"
                          id={`${formId}-date`}
                          value={formData.visitDate}
                          onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      {/* Consent Checkbox (UNCHECKED by default) */}
                      <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1 leading-snug">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-400"
                        />
                        <span>
                          I agree to be contacted via WhatsApp/Call regarding Pavani Felicity project details, pricing, and availability.
                        </span>
                      </label>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
                      >
                        {formStatus === "loading" ? "Submitting Enquiry..." : "Request Latest Price & Floor Plans"}
                      </Button>

                      <div className="text-center pt-1">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                        >
                          <MessageCircle size={13} className="text-emerald-400" />
                          <span>Or connect immediately on WhatsApp</span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROJECT OVERVIEW WITH DRONE LOCALITY SHOWCASE */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="overview">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Project Overview &amp; Master Vision
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                About Pavani Felicity
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Pavani Felicity is a premium residential apartment development by <strong>Pavani Infra</strong>, located in the prominent residential neighborhood of Nizampet, Hyderabad.
              </p>
            </div>

            {/* AERIAL PERSPECTIVE SHOWCASE CARD */}
            <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setSelectedImage(PROJECT_VISUALS[4])}
                    className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-slate-950 cursor-zoom-in group aspect-[16/10]"
                  >
                    <img
                      src={felicityDroneAerial}
                      alt="Pavani Felicity high-altitude aerial drone perspective showing tower, lake waterbody, and Nizampet neighborhood"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      Locality Drone Perspective
                    </div>
                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-300">
                      <Maximize2 size={15} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                      <h4 className="text-xs sm:text-sm font-bold text-white">Adjacent to Hill County &amp; Natural Lake</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        High-altitude drone view showing the tower rising beside the tranquil lake and residential enclave. Tap to enlarge.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400 block">
                    Strategic Neighborhood Context
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Uninterrupted Waterbody Vistas &amp; Suburban Peace
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Positioned <strong>opposite Sapthapadi Convention Centre</strong> and <strong>adjacent to Hill County</strong>, the single residential tower stands tall as a prominent skyline focal point in the Nizampet–Bachupally growth corridor.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Scenic Waterbody Frontage:</strong> North &amp; East facing residences enjoy open lake views.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>High-Rise Elevation:</strong> 2 Cellars + Stilt + 23 upper floors with 360-degree daylight exposure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Low Density Footprint:</strong> 278 units across ~2.5 acres ensuring quiet, privacy-centric living.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(PROJECT_VISUALS[4])}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow active:scale-95"
                    >
                      <Maximize2 size={14} />
                      <span>Inspect Locality Drone Aerial</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Context Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 mb-12 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Positioned <strong>opposite Sapthapadi Convention Centre</strong> and <strong>adjacent to Hill County</strong>, the project is designed for families looking for spacious 3 BHK homes in the prime Nizampet–Bachupally residential corridor.
              </p>
              <p>
                The project features a single high-rise residential tower rising <strong>2 Cellars + Stilt + 23 Floors</strong> across approximately <strong>2.16 to 2.5 acres</strong>, planned with ~273 to 278 residences. The development incorporates dedicated clubhouse facilities, recreational amenities, and over 65% landscaped open spaces.
              </p>
              <p>
                With its generous 3 BHK apartment layouts ranging from 1,561 to 2,514 sq. ft. and advertised lifestyle amenities, Pavani Felicity provides an elevated residential alternative for homebuyers prioritizing space, privacy, and suburban tranquility with quick connectivity to Miyapur and Kukatpally.
              </p>
            </div>

            {/* 6 Attractive Highlight Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Maximize2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Approximately 2.5 Acres</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Carefully proportioned residential footprint reserving roughly 65% of the campus for open green zones and pedestrian circulation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Single 23-Floor Tower</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Published information indicates a single high-rise tower rising 2 Cellars + Stilt + 23 Floors (subject to sanctioned plan verification).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Exclusive 3 BHK Formats</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dedicated purely to three-bedroom families with twelve published floor sizes ranging from 1,561 to 2,514 sq. ft.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Trees size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">~65% Open Greenery</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Significant green buffer featuring themed gardens, reflexology paths, children play zones, and senior citizen pavilions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Clubhouse &amp; Lifestyle Hub</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Multi-level recreation complex with swimming pool, gym, banquet hall, mini theatre, co-working suites, and indoor games.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">TG RERA Registered</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Official registration under TG RERA ID <strong>P02200005477</strong> providing regulatory transparency for buyers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. APARTMENT CONFIGURATIONS */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="configurations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Floor Plans &amp; Sizing
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Spacious 3 BHK Apartments
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Explore twelve published size options across Compact, Spacious, and Large 3 BHK layouts (1,561 to 2,514 sq. ft.).
              </p>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveConfigCategory("all");
                    setSelectedSizeFilter(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeConfigCategory === "all"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                  }`}
                >
                  All 3 BHK Sizes (12)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveConfigCategory("compact");
                    setSelectedSizeFilter(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeConfigCategory === "compact"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                  }`}
                >
                  Compact 3 BHK (1,561–1,818 Sft)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveConfigCategory("spacious");
                    setSelectedSizeFilter(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeConfigCategory === "spacious"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                  }`}
                >
                  Spacious 3 BHK (1,961–2,190 Sft)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveConfigCategory("large");
                    setSelectedSizeFilter(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeConfigCategory === "large"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                  }`}
                >
                  Large 3 BHK (2,269–2,514 Sft)
                </button>
              </div>

              {/* Published Sizes Pills Bar */}
              <div className="pt-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Select Specific Published Floor Size (Sq. Ft.):
                </span>
                <div className="flex flex-wrap gap-2">
                  {[1561, 1725, 1797, 1805, 1818, 1961, 2014, 2152, 2190, 2269, 2395, 2514].map(
                    (size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSizeFilter(selectedSizeFilter === size ? null : size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedSizeFilter === size
                            ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300"
                            : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-white"
                        }`}
                      >
                        {size.toLocaleString()} Sft
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* 3 Browsing Tier Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {(activeConfigCategory === "all"
                ? CONFIG_TIERS
                : CONFIG_TIERS.filter((t) => t.category === activeConfigCategory)
              ).map((tier) => (
                <div
                  key={tier.id}
                  className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        {tier.category === "compact"
                          ? "Compact 3 BHK"
                          : tier.category === "spacious"
                          ? "Spacious 3 BHK"
                          : "Large 3 BHK"}
                      </span>
                      <Home size={16} className="text-slate-500" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">{tier.tierTitle}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Super Built-up Band: <strong className="text-amber-300 font-mono">{tier.sizeBand}</strong>
                      </p>
                    </div>

                    {/* Published Sft Breakdown */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Published Sizes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {tier.sizes.map((s) => (
                          <span
                            key={s}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                              selectedSizeFilter === s
                                ? "bg-amber-400 text-slate-950"
                                : "bg-slate-900 border border-slate-800 text-slate-200"
                            }`}
                          >
                            {s} Sft
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900">
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        &quot;{tier.description}&quot;
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-200">Layout Highlights:</span>
                      <ul className="space-y-2">
                        {tier.highlights.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2">
                    <a
                      href="#enquiry-section"
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <span>Request Price &amp; Cost Sheet</span>
                      <ChevronRight size={14} />
                    </a>
                    <a
                      href="#floorplans"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Inspect Sanctioned Blueprint</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Price & Availability Advisory Section */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-amber-500/30">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    <Info size={14} />
                    <span>Dynamic Pricing &amp; Inventory Policy</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Official Quotation &amp; Transparent Cost Estimates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    In compliance with verified real estate standards, Naani Projects does not publish unverified flat rates. Exact unit pricing depends on floor rise charges, corner facing, and current developer release phases.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Current Price</span>
                      <span className="text-xs sm:text-sm font-bold text-amber-400">On Request</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Apartment Sizes</span>
                      <span className="text-xs sm:text-sm font-bold text-white">1,561 – 2,514 Sft</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Total Cost</span>
                      <span className="text-xs sm:text-sm font-bold text-amber-400">Request Cost Sheet</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Availability</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-400">Check Inventory</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <a
                    href="#enquiry-section"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-center font-extrabold text-sm transition-all shadow-md active:scale-95"
                  >
                    Get Latest Price &amp; Availability
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 text-center font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={15} className="text-emerald-400" />
                    <span>Request Quotation on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SANCTIONED FLOOR PLANS & MASTER LAYOUT BLUEPRINT */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="floorplans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Architectural Layouts &amp; Floor Plate
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Explore Pavani Felicity Typical Floor Plate
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Authentic unit layouts detailing bedroom arrangements, living and dining spaces, kitchen with utility, bathrooms, balconies, and central courtyard swimming pool.
              </p>
            </div>

            {/* SANCTIONED MASTER BLUEPRINT SHOWCASE CARD */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 shadow-2xl mb-12">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div
                    onClick={() => setSelectedImage(PROJECT_VISUALS[6])}
                    className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-slate-950 cursor-zoom-in group p-2"
                  >
                    <img
                      src={felicityMasterplan}
                      alt="Pavani Felicity official floor plate layout showing 12 3-BHK units per floor with exact square footage and central courtyard swimming pool"
                      className="w-full h-auto object-contain max-h-[500px] mx-auto rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/90 text-[11px] font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                      <Maximize2 size={13} />
                      <span>Click to Zoom Blueprint</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Authentic Sanctioned Typical Floor Plate (Units 01 to 12)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(PROJECT_VISUALS[6])}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                    >
                      <Eye size={13} />
                      <span>Full Screen</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400 block mb-1">
                      12 Units Per Floor Plate
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Typical Floor Plan &amp; Unit Sizing
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Every floor incorporates 12 thoughtfully configured 3 BHK residences wrapped around a central courtyard featuring the resort swimming pool, kids pool, and wooden deck.
                    </p>
                  </div>

                  {/* Interactive Unit Pills */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Tap Unit to Inspect Dimensions &amp; Facing:
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                      {FLOOR_PLATE_UNITS.map((u, i) => (
                        <button
                          key={u.unitNo}
                          type="button"
                          onClick={() => setSelectedFloorUnit(selectedFloorUnit === i ? null : i)}
                          className={`p-1.5 rounded-lg text-center transition-all ${
                            selectedFloorUnit === i
                              ? "bg-amber-400 text-slate-950 font-extrabold ring-2 ring-amber-300 shadow"
                              : "bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-400/40"
                          }`}
                        >
                          <span className="text-[10px] block font-mono">Unit {u.unitNo}</span>
                          <span className="text-[11px] font-bold block">{u.sizeSft} Sft</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Unit Details Panel */}
                  {selectedFloorUnit !== null ? (
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/40 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-amber-400">
                            Unit {FLOOR_PLATE_UNITS[selectedFloorUnit].unitNo}
                          </span>
                          <h4 className="text-sm font-bold text-white">
                            {FLOOR_PLATE_UNITS[selectedFloorUnit].bhk} · {FLOOR_PLATE_UNITS[selectedFloorUnit].sizeSft.toLocaleString()} Sq. Ft.
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                          {FLOOR_PLATE_UNITS[selectedFloorUnit].facing} Facing
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {FLOOR_PLATE_UNITS[selectedFloorUnit].features}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                      <em>Select any unit number above to review its orientation, balcony placement, and layout specification.</em>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(PROJECT_VISUALS[6])}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Maximize2 size={14} />
                      <span>Inspect Sanctioned Blueprint in Lightbox</span>
                    </button>
                    <a
                      href="#enquiry-section"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <FileText size={14} className="text-amber-400" />
                      <span>Request Individual Unit CAD / PDF Layout</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Floor Plan Verification Notice */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 max-w-4xl mx-auto space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                  <FileText size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Verified Architectural Drawings Available on Request
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    To maintain strict consumer accuracy and comply with RERA advertisement regulations, Naani Projects provides sanctioned municipal floor plans directly upon buyer request rather than displaying unofficial sketches.
                  </p>
                </div>
              </div>

              {/* What each verified floor plan includes */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Exact Carpet &amp; Built-up Areas:</strong>
                    <span className="text-[11px] text-slate-400">RERA verified carpet efficiency with zero fabricated dimensions.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Room-wise Dimensions:</strong>
                    <span className="text-[11px] text-slate-400">Clear measurement of master bedroom, living area, and balconies.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Vastu &amp; Directional Orientation:</strong>
                    <span className="text-[11px] text-slate-400">Clear compass facing (East / West / North) for main entrance &amp; pooja.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs text-white block">Tower Key Plan:</strong>
                    <span className="text-[11px] text-slate-400">Unit position on the floor plate relative to lifts and staircases.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 justify-center sm:justify-start">
                <a
                  href="#enquiry-section"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow"
                >
                  Request Official Floor Plan PDF
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle size={15} className="text-emerald-400" />
                  <span>Receive Plans on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CATEGORIZED AMENITIES */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="amenities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Resort Lifestyle Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Premium Lifestyle Amenities
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Organized across dedicated indoor clubhouse spaces, outdoor sporting arenas, wellness zones, and landscaped greens.
              </p>

              {/* Amenity Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {AMENITY_CATEGORIES.map((grp) => (
                  <button
                    key={grp.id}
                    onClick={() => setActiveAmenityTab(grp.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeAmenityTab === grp.id
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    {grp.icon}
                    <span>{grp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Amenity Group Details */}
            {(() => {
              const currentGroup =
                AMENITY_CATEGORIES.find((g) => g.id === activeAmenityTab) || AMENITY_CATEGORIES[0];
              return (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {currentGroup.icon}
                      <span>{currentGroup.name}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{currentGroup.subtitle}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentGroup.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3 hover:border-amber-500/30 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{item}</h4>
                          <span className="text-[11px] text-slate-400">Published Amenity Schedule</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Note on Amenities */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-center">
              <p className="text-xs text-slate-400">
                <em>Note: Amenity specifications are based on developer marketing disclosures and are subject to final sanctioned delivery schedules.</em>
              </p>
            </div>
          </div>
        </section>

        {/* 6. CLUBHOUSE, ROOFTOP & BALCONY LIFESTYLE EXPERIENCE */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="clubhouse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Signature Lifestyle
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                A Lifestyle Beyond Your Apartment
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Pavani Felicity combines an internal courtyard pool deck, multi-level clubhouse, and expansive sit-out balconies overlooking the lake.
              </p>
            </div>

            {/* BALCONY & SKYLINE HIGHLIGHT CARD */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setSelectedImage(PROJECT_VISUALS[5])}
                    className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-slate-950 cursor-zoom-in group aspect-[16/10]"
                  >
                    <img
                      src={felicityBalconyView}
                      alt="Pavani Felicity spacious sit-out balcony view overlooking panoramic Nizampet lake and city skyline"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      Panoramic Balcony Living
                    </div>
                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-300">
                      <Maximize2 size={15} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                      <h4 className="text-xs sm:text-sm font-bold text-white">Panoramic Horizon Sit-Out Balconies</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Deep recessed balconies designed for open-air tea sessions, morning sunrise views, and natural lake ventilation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400 block">
                    Private Outdoor Living
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Unobstructed Skyline Views Over Nizampet
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Unlike congested mid-rise clusters, the 23-floor vantage point of Pavani Felicity affords high-altitude fresh breezes, zero common wall privacy, and sweeping panoramas toward Hill County and the tranquil lake.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Continuous Cross-Ventilation:</strong> 3-side open apartment geometries ensuring abundant fresh airflow.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Dedicated Utility Balconies:</strong> Separate laundry and utility zones keep sit-out balconies clutter-free.</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(PROJECT_VISUALS[5])}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow active:scale-95"
                    >
                      <Maximize2 size={14} />
                      <span>View Full Balcony Experience</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Lifestyle Pillars */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h4 className="text-base font-bold text-white">Social &amp; Celebrations</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Air-conditioned banquet celebration hall, landscaped open terrace lawn, and resident community lounge for festivals and private family events.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Briefcase size={20} />
                </div>
                <h4 className="text-base font-bold text-white">Co-Working &amp; Media</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dedicated business hub with ergonomic workstations, high-speed Wi-Fi, and an acoustic mini-theatre screening room for weekend entertainment.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Dumbbell size={20} />
                </div>
                <h4 className="text-base font-bold text-white">Wellness &amp; Aquatics</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Resort-scale swimming pool with sunken lounge deck, safe kids splash pool, yoga and aerobics pavilions, and a modern gymnasium.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DEDICATED PROJECT GALLERY & ARCHITECTURAL SHOWCASE */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Visual Documentation
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Project Gallery &amp; Architectural Showcase
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Explore high-resolution visual documentation of Pavani Felicity, from twilight elevations and 3D courtyard aerials to the sanctioned typical floor plate.
              </p>

              {/* Gallery Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[
                  { key: "all", label: "All Visuals (7)" },
                  { key: "elevation", label: "Tower Elevations (3)" },
                  { key: "aerial", label: "Aerial Perspectives (2)" },
                  { key: "lifestyle", label: "Balcony & Views (1)" },
                  { key: "masterplan", label: "Sanctioned Blueprint (1)" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setGalleryCategory(tab.key)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      galleryCategory === tab.key
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(galleryCategory === "all"
                ? PROJECT_VISUALS
                : PROJECT_VISUALS.filter((v) => v.category === galleryCategory)
              ).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-300">
                        {item.badge}
                      </span>
                    </div>

                    {/* Tap to Enlarge pill */}
                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 group-hover:text-amber-400 transition-colors">
                      <Maximize2 size={15} />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-950">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-slate-500">Official Release</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>Inspect High-Resolution Render</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. STRATEGIC LOCATION IN NIZAMPET */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="location">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Transit &amp; Growth Corridor
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Strategically Positioned in Nizampet
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Situated <strong>opposite Sapthapadi Convention Centre and adjacent to Hill County</strong>, offering direct arterial access to Kukatpally, Bachupally, and the Western Hyderabad IT corridor.
              </p>
            </div>

            {/* Location Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Miyapur &amp; JNTU Metro</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~10–12 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct arterial access to Red Line Metro stations for hassle-free transit to Ameerpet, HITEC City, and Secunderabad.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Top Tier Schools</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~5–10 Mins Radius</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Minutes from Silver Oaks, Kennedy High The Global School, Oakridge International, and Creek Planet School.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Activity size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Hospitals &amp; Healthcare</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~8–15 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prompt medical access to SLG Hospitals, Pranaam Hospital, Apollo Clinic, and Relief Hospital Nizampet.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Building2 size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Retail &amp; Entertainment</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~10–15 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Near Nexus Hyderabad Mall, GSM Mall, daily supermarkets, multiplexes, and fine dining along Nizampet Road.
                </p>
              </div>
            </div>

            {/* Regional IT Connectivity Row */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="text-amber-400" size={18} />
                <span>Regional Connectivity &amp; Employment Corridors</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block">Nehru Outer Ring Road (ORR)</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">~10 Mins (Exit 4A/5)</span>
                  <p className="text-[11px] text-slate-400 mt-1">Direct access onto the 158 km ORR expressway toward Financial District &amp; Airport.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block">HITEC City &amp; Cyber Towers</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">~20–25 Mins</span>
                  <p className="text-[11px] text-slate-400 mt-1">Direct commute via Nizampet Road, KPHB Colony, and Hafeezpet bypass.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block">Financial District &amp; Gachibowli</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">~25–30 Mins</span>
                  <p className="text-[11px] text-slate-400 mt-1">Fast signal-free highway commute along the Nehru Outer Ring Road.</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4 italic">
                * Note: Commute durations are estimates based on standard traffic conditions and may vary during peak hours.
              </p>
            </div>
          </div>
        </section>

        {/* 9. DEVELOPER PROFILE & RERA TRANSPARENCY */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="developer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Developer Profile Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                    Developer Profile
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    About Pavani Infra &amp; Sai Sravanthi
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong>Pavani Infra</strong> (promoted by <strong>Sai Sravanthi Infra Projects Private Limited</strong>) is an established real estate developer with multiple high-profile projects in Hyderabad, including Pavani Starlit in Miyapur and Pavani Felicity in Nizampet.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The promoter specializes in mid-rise and high-rise gated communities featuring practical Vastu compliance, generous open spaces, and modern lifestyle clubhouse amenities.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <a
                    href={PROJECT_CONFIG.developerWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>View Official Developer Portfolio</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* RERA Transparency Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/40 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                      Statutory Regulatory Compliance
                    </span>
                    <ShieldCheck size={20} className="text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">
                    TG RERA Registration Details
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Pavani Felicity is an officially registered project under the Telangana Real Estate Regulatory Authority (TG RERA).
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold uppercase">RERA ID</span>
                      <button
                        onClick={handleCopyRera}
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                        title="Click to copy RERA number"
                      >
                        {copiedRera ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedRera ? "Copied!" : "Copy ID"}</span>
                      </button>
                    </div>
                    <span className="text-xl font-extrabold text-white tracking-wider block font-mono">
                      {PROJECT_CONFIG.reraNumber}
                    </span>
                    <div className="text-[11px] text-slate-400 space-y-0.5 pt-1 border-t border-slate-900">
                      <div><strong className="text-slate-300">Promoter:</strong> Sai Sravanthi Infra Projects Private Limited</div>
                      <div><strong className="text-slate-300">Location:</strong> Opposite Sapthapadi Convention Centre, Nizampet</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={PROJECT_CONFIG.reraWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Verify on Official TG RERA Portal</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. INDEPENDENT BUYER ADVISORY & DUE DILIGENCE */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="advisory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Transparent Homebuyer Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Independent Buyer Advisory &amp; Due Diligence
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Naani Projects provides balanced, research-driven advisory highlighting both project advantages and critical points to evaluate before making a purchase.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Strengths Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-[#0A121A] border border-emerald-500/30 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Key Strengths &amp; Advantages</h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Pure 3 BHK High-Rise Community:</strong> Catering exclusively to 3 BHK families, creating a homogenous residential neighborhood with low tenant turnover and high community pride.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Generous Floor Plates (Up to 2,514 Sft):</strong> Offers spacious room dimensions and large living areas that are increasingly rare in new high-rise launches in the Nizampet micro-market.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Hill County Neighborhood Value:</strong> Situated adjacent to the landmark Hill County township and opposite Sapthapadi Convention Centre, benefiting from established social infrastructure.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Proximity to Premier Schools:</strong> Located within 5 to 10 minutes of Silver Oaks, Kennedy High, and Oakridge International along the Bachupally education corridor.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Due Diligence Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-950/30 to-[#120E0A] border border-amber-500/30 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <AlertTriangle size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Points to Evaluate &amp; Verify</h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Possession Timeline Notice:</strong> Public portals and developer listings show timeline variations (December 2026 on older marketing vs October 2028 under RERA records). Buyers should use October 2028 as the provisional benchmark and verify milestones on TG RERA.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Sanctioned Height &amp; Unit Count:</strong> Confirm the sanctioned tower height (2 Cellars + Stilt + 23 Floors) and total approved unit count (273–278 units) against municipal GHMC drawings.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Nizampet Peak-Hour Feeder Traffic:</strong> Nizampet Road experiences peak congestion during school and commute hours. Inspect physical approach width and planned feeder connectivity before booking.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Under Construction Stage Milestones:</strong> Ensure construction payment milestones are strictly linked to verified slab-casting progress rather than calendar deadlines.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Advisory Assistance Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-4xl mx-auto space-y-4">
              <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest inline-block">
                Tailored Advisory Assistance
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Need Help Selecting the Right Floor, Facing &amp; Layout?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Connect with our senior property advisors for an unbiased comparative assessment between Pavani Felicity and other prominent residential developments across Nizampet, Bachupally, and Miyapur.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <a
                  href="#enquiry-section"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all"
                >
                  Schedule an In-Person Consultation
                </a>
                <a
                  href={`tel:${PROJECT_CONFIG.phone}`}
                  className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-amber-500/40 text-slate-200 font-bold text-xs sm:text-sm transition-all"
                >
                  Call Advisor: {PROJECT_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FREQUENTLY ASKED QUESTIONS (12 FAQS) */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="faqs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Everything You Need to Know About Pavani Felicity
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Transparent answers to common queries regarding location, configurations, RERA compliance, and possession.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {schemaFaqs.mainEntity.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl bg-slate-900/60 border border-slate-800/80 px-5 data-[state=open]:border-amber-500/40 transition-colors"
                >
                  <AccordionTrigger className="text-left font-bold text-white text-sm sm:text-base py-4 hover:text-amber-400 transition-colors">
                    {faq.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-4 pt-1">
                    {faq.acceptedAnswer.text}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 12. MOBILE FIXED STICKY CTA BAR */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090D16]/95 backdrop-blur-xl border-t border-amber-500/30 p-2.5 grid grid-cols-3 gap-2 shadow-2xl">
          <a
            href={`tel:${PROJECT_CONFIG.phone}`}
            className="flex flex-col items-center justify-center py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold active:scale-95 transition-transform"
          >
            <Phone size={16} className="text-amber-400" />
            <span className="text-[10px] mt-0.5">Call</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 rounded-xl bg-emerald-600 text-white font-extrabold active:scale-95 transition-transform shadow"
          >
            <MessageCircle size={16} />
            <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
          </a>
          <a
            href="#enquiry-section"
            className="flex flex-col items-center justify-center py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold active:scale-95 transition-transform shadow"
          >
            <Home size={16} />
            <span className="text-[10px] font-bold mt-0.5">Request Price</span>
          </a>
        </div>

        {/* LIGHTBOX MODAL FOR FULL-RESOLUTION INSPECTION */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-slate-950/95 border border-slate-800 text-slate-100 p-4 sm:p-6 backdrop-blur-2xl">
            <DialogClose className="absolute right-4 top-4 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors z-20">
              <X size={18} />
            </DialogClose>
            {selectedImage && (
              <div className="space-y-3">
                <div className="relative max-h-[80vh] flex items-center justify-center p-2 bg-slate-950 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
                <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedImage.title}</h4>
                    <p className="text-xs text-slate-400">{selectedImage.subtitle}</p>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 self-start sm:self-auto shrink-0">
                    {selectedImage.badge}
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default PavaniFelicityPage;
