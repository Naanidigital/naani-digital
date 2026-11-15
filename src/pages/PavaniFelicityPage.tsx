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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { sendLeadToSheet, type LeadProfile, type PageContext } from "@/lib/leadProfile";

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
};

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
      "100% DG Emergency Power Backup for Common Areas & Elevators",
      "24/7 CCTV Surveillance & Automated Security Boom Barriers",
      "High-Speed Automatic Passenger & Stretcher Lifts",
      "Rainwater Harvesting System & Comprehensive Sewage Treatment Plant",
    ],
  },
];

export const PavaniFelicityPage = () => {
  const formId = useId();
  const [selectedTierTab, setSelectedTierTab] = useState<"all" | "compact" | "spacious" | "large">("all");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [activeAmenityTab, setActiveAmenityTab] = useState<string>("indoor");
  const [copiedRera, setCopiedRera] = useState(false);

  // Lead Form State (Consent UNCHECKED by default)
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    preference: "3 BHK (1,961 - 2,190 Sft)",
    budget: "Contact for Pricing",
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

    const trimmedName = formData.name.trim();
    const cleanMobile = formData.mobile.replace(/\D/g, "");

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please check the consent box to proceed.");
      return;
    }

    setFormStatus("loading");

    try {
      const profile: LeadProfile = {
        name: trimmedName,
        phone: `+91${cleanMobile}`,
        email: formData.email.trim() || undefined,
        lead_score: 85,
        lead_stage: "new",
        notes: `Pavani Felicity Enquiry | Config: ${formData.preference} | Purpose: ${formData.purpose} | Preferred Visit: ${formData.visitDate || "Not Specified"}`,
        search_intent: {
          budget_min: undefined,
          budget_max: undefined,
          preferred_locations: ["Nizampet", "Bachupally"],
          preferred_bhk: ["3 BHK"],
        },
      };

      const context: PageContext = {
        projectName: PROJECT_CONFIG.name,
        projectSlug: "pavani-felicity-nizampet",
        location: PROJECT_CONFIG.location,
        leadSource: PROJECT_CONFIG.leadSource,
        pageUrl: window.location.href,
      };

      const result = await sendLeadToSheet(profile, context);

      if (result.success) {
        setFormStatus("success");
      } else {
        setErrorMessage(result.error || "Failed to submit enquiry. Please call our advisor directly.");
        setFormStatus("error");
      }
    } catch (err: any) {
      setErrorMessage("Network issue. Please reach us via WhatsApp or Phone.");
      setFormStatus("error");
    }
  };

  const filteredTiers =
    selectedTierTab === "all"
      ? CONFIG_TIERS
      : CONFIG_TIERS.filter((t) => t.category === selectedTierTab);

  const waText = encodeURIComponent(
    `Hi Naani Projects, I am interested in Pavani Felicity in Nizampet, Hyderabad. Please share current pricing, floor plans, and unit availability.`
  );
  const waUrl = `https://wa.me/91${PROJECT_CONFIG.phoneRaw}?text=${waText}`;

  // Structured Data (JSON-LD)
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
      { "@type": "ListItem", "position": 3, "name": "Nizampet", "item": "https://www.naani.in/projects-in-nizampet" },
      { "@type": "ListItem", "position": 4, "name": "Pavani Felicity", "item": PROJECT_CONFIG.canonicalUrl },
    ],
  };

  const schemaProject = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": PROJECT_CONFIG.name,
    "url": PROJECT_CONFIG.canonicalUrl,
    "image": [
      "https://www.naani.in/og-pavani-felicity.jpg",
    ],
    "description": "Pavani Felicity is a premium residential high-rise apartment development by Pavani Infra in Nizampet, Hyderabad. Spanning ~2.5 acres with a single 23-storey tower offering spacious 3 BHK residences (1,561 to 2,514 sq. ft.) with clubhouse amenities and ~65% open spaces. Registered under TG RERA ID P02200005477.",
    "telephone": PROJECT_CONFIG.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Opposite Sapthapadi Convention Centre, Adjacent to Hill County",
      "addressLocality": "Nizampet",
      "addressRegion": "Telangana",
      "postalCode": "500090",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.5186",
      "longitude": "78.3754",
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Swimming Pool & Kids Pool", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Fully Equipped Gymnasium", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Co-Working Business Lounge", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Multipurpose Banquet Hall", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Badminton & Sports Practice Courts", "value": true },
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
          "text": "You can request verified architectural floor plans directly through Naani Projects by clicking 'Request Floor Plans' or messaging our property advisor on WhatsApp at +91 94939 43946.",
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
        {/* 1. HERO SECTION */}
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
              {/* Left Column: Headings, Badges, Showcase Card & CTAs */}
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

                {/* Hero Showcase Card */}
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl p-6 sm:p-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                        23-Floor Tower
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                        Exclusive 3 BHK Community
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">TG RERA: P02200005477</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">High-Rise Living Beside Hill County</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Designed as a standalone landmark rising <strong>2 Cellars + Stilt + 23 Upper Floors</strong> across ~2.5 acres, Pavani Felicity offers generous 3 BHK floor plans ranging from 1,561 to 2,514 sq. ft. with over 65% open spaces and multi-tier recreation.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Tower Height</span>
                      <span className="text-xs sm:text-sm font-extrabold text-white">23 Floors</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Size Spectrum</span>
                      <span className="text-xs sm:text-sm font-extrabold text-amber-400">1,561 – 2,514 Sft</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Provisional Possession</span>
                      <span className="text-xs sm:text-sm font-extrabold text-emerald-400">Oct 2028 (RERA)</span>
                    </div>
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
                    href="#configurations"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 font-bold text-sm transition-all active:scale-95"
                  >
                    <Layers size={15} className="mr-2 text-amber-400" />
                    <span>View Floor Plans</span>
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

              {/* Right Column: Lead Form Card */}
              <div className="lg:col-span-5" id="enquiry-section">
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950 border border-amber-500/30 shadow-2xl backdrop-blur-md relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-extrabold text-amber-400 tracking-wider uppercase block">
                      Direct Advisory Access
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      Request Pricing &amp; Floor Plans
                    </h2>
                    <p className="text-xs text-slate-300">
                      Receive verified floor plans, transparent cost estimates, and unit availability directly from authorized advisors.
                    </p>
                  </div>

                  {formStatus === "success" ? (
                    <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Enquiry Received Successfully</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Our senior property advisor for <strong>Pavani Felicity</strong> will connect with you via WhatsApp/Call with the latest pricing and layout plans.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all"
                      >
                        <MessageCircle size={14} className="mr-1.5" />
                        Chat on WhatsApp Now
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
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
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id={`${formId}-name`}
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sravan Kumar"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label
                          htmlFor={`${formId}-phone`}
                          className="block text-xs font-bold text-slate-300 mb-1"
                        >
                          Mobile Number *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-sm text-slate-400 font-medium">
                            +91
                          </span>
                          <input
                            type="tel"
                            id={`${formId}-phone`}
                            required
                            maxLength={10}
                            value={formData.mobile}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                mobile: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            placeholder="9876543210"
                            className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">10-digit Indian mobile number</p>
                      </div>

                      {/* Email (Optional) */}
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      {/* Configuration & Purpose Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`${formId}-pref`}
                            className="block text-xs font-bold text-slate-300 mb-1"
                          >
                            Preferred Size
                          </label>
                          <select
                            id={`${formId}-pref`}
                            value={formData.preference}
                            onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="Compact 3 BHK (1,561 - 1,818 Sft)">Compact 3 BHK (1,561–1,818 Sft)</option>
                            <option value="Spacious 3 BHK (1,961 - 2,190 Sft)">Spacious 3 BHK (1,961–2,190 Sft)</option>
                            <option value="Large 3 BHK (2,269 - 2,514 Sft)">Large 3 BHK (2,269–2,514 Sft)</option>
                            <option value="Undecided">Undecided / Exploring</option>
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

        {/* 2. PROJECT OVERVIEW */}
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
                  Officially registered under TG RERA ID <strong>P02200005477</strong>, ensuring statutory regulatory disclosures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. APARTMENT CONFIGURATIONS (ALL 12 SIZES) */}
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

              {/* Tier Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[
                  { key: "all", label: "All 3 BHK Sizes (12)" },
                  { key: "compact", label: "Compact 3 BHK (1,561–1,818 Sft)" },
                  { key: "spacious", label: "Spacious 3 BHK (1,961–2,190 Sft)" },
                  { key: "large", label: "Large 3 BHK (2,269–2,514 Sft)" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setSelectedTierTab(tab.key as any);
                      setSelectedSizeFilter(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      selectedTierTab === tab.key
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Size Pill Selectors */}
            <div className="mb-10 p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3 text-center sm:text-left">
                Select Specific Published Floor Size (Sq. Ft.):
              </span>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {[1561, 1725, 1797, 1805, 1818, 1961, 2014, 2152, 2190, 2269, 2395, 2514].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizeFilter(selectedSizeFilter === size ? null : size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedSizeFilter === size
                        ? "bg-amber-400 text-slate-950 ring-2 ring-amber-400/50"
                        : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40"
                    }`}
                  >
                    {size.toLocaleString()} Sft
                  </button>
                ))}
                {selectedSizeFilter && (
                  <button
                    onClick={() => setSelectedSizeFilter(null)}
                    className="text-xs text-amber-400 underline font-semibold px-2 py-1"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Configuration Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {filteredTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        {tier.category.toUpperCase()} 3 BHK
                      </span>
                      <Home size={18} className="text-slate-500" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">{tier.tierTitle}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs text-slate-400">Super Built-up Band:</span>
                        <span className="text-sm font-extrabold text-amber-400">{tier.sizeBand}</span>
                      </div>
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
                      <span>Request Floor Plan Drawing</span>
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

        {/* 4. FLOOR PLANS SECTION */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="floorplans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Architectural Layouts
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Explore Pavani Felicity Floor Plans
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Authentic unit layouts detailing bedroom arrangements, living and dining spaces, kitchen with utility, bathrooms, balconies, and pooja spaces.
              </p>
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

        {/* 6. CLUBHOUSE & LIFESTYLE EXPERIENCE */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="clubhouse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-amber-500/30 shadow-2xl space-y-6">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                  Signature Lifestyle
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  A Lifestyle Beyond Your Apartment
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Pavani Felicity incorporates a multi-level clubhouse conceived as an active social and wellness destination for the community&apos;s ~273 to 278 resident families.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-4">
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
          </div>
        </section>

        {/* 7. STRATEGIC LOCATION IN NIZAMPET */}
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
                  Fast access to Miyapur Metro Terminal (Red Line) and JNTU Kukatpally Metro for traffic-free commuting across Hyderabad.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Activity size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Hospitals &amp; Healthcare</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~8–12 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Close proximity to Pranaam Hospital Nizampet, SLG Hospital Bachupally, Sri Sri Holistic, and Mamata Academy of Medical Sciences.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Top Tier Schools</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~5–10 Mins Radius</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Surrounded by Silver Oaks, Kennedy High The Global School, Oakridge International, The Creek Planet, and Vikas The Concept School.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Tv size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Malls &amp; Entertainment</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~10–15 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quick reach to Forum Sujana Mall, Manjeera Trinity Mall, GSM Mall Miyapur, and local retail centers along Nizampet Road.
                </p>
              </div>
            </div>

            {/* Regional IT Connectivity Row */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="text-amber-400" size={18} />
                <span>Regional Highway &amp; IT Corridor Links</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block">Outer Ring Road (ORR Exit 4A)</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">~10 Mins</span>
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

        {/* 8. DEVELOPER PROFILE & RERA TRANSPARENCY */}
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

        {/* 9. INDEPENDENT BUYER ADVISORY & DUE DILIGENCE */}
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

        {/* 10. FREQUENTLY ASKED QUESTIONS (12 FAQS) */}
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

        {/* 11. MOBILE FIXED STICKY CTA BAR */}
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
      </div>
    </>
  );
};

export default PavaniFelicityPage;
