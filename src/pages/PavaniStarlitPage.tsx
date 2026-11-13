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
  Car,
  Zap,
  Droplets,
  Flame,
  Tv,
  Coffee,
  Check,
  Info,
  HelpCircle,
  Sun,
  Activity,
  AlertTriangle,
  ExternalLink,
  Copy,
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
  name: "Pavani Starlit",
  developer: "Sai Sravanthi Infra Projects Private Limited",
  location: "Miyapur, Hyderabad",
  locality: "Maqtha Mahaboobpet, Miyapur",
  address: "Maqtha Mahaboobpet, Miyapur, Hyderabad, Telangana 500049",
  startingPrice: "Contact for Latest Price",
  priceRange: "Price on Request (Dynamic Inventory)",
  pricePerSqFt: "Pricing available on verified developer request",
  reraNumber: "P02400008769",
  reraDisplay: "TG RERA Registered: P02400008769",
  landArea: "Approximately 3 Acres",
  towers: "3 Residential Towers (Subject to Sanctioned Plan Verification)",
  structure: "2 Cellars + Stilt + 10 Floors (Mid-Rise)",
  configurations: "2 BHK, 2.5 BHK & 3 BHK Luxury Apartments",
  sizeRange: "1,275 – 2,139 Sq. Ft. (Provisional Range)",
  openSpace: "Approximately 70% Open Spaces (Marketed)",
  amenitiesScale: "45,000+ Sq. Ft. Advertised Amenities",
  possession: "2029 (Provisional / Under Construction)",
  status: "Under Construction",
  canonicalUrl: "https://www.naani.in/projects/pavani-starlit-miyapur",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Pavani Starlit",
  developerWebsite: "https://pavaniinfra.com/project",
  reraWebsite: "https://rera.telangana.gov.in/",
};

interface ConfigPlan {
  id: string;
  bhk: string;
  category: "2bhk" | "2.5bhk" | "3bhk";
  sizeRange: string;
  priceEstimate: string;
  keyHighlights: string;
  features: string[];
}

const CONFIG_PLANS: ConfigPlan[] = [
  {
    id: "2-bhk",
    bhk: "2 BHK Premium Residences",
    category: "2bhk",
    sizeRange: "1,275 – 1,471 Sq.Ft.",
    priceEstimate: "Request Latest Price",
    keyHighlights: "Efficient living and dining zones, spacious master suite, and private utility balcony.",
    features: [
      "Vastu-compliant layouts with planned natural cross-ventilation",
      "Separated living and dining areas creating functional privacy for families",
      "Dedicated utility space for washing machine and laundry operations",
      "Ideal entry format for young IT professionals and nuclear families in Miyapur",
    ],
  },
  {
    id: "2.5-bhk",
    bhk: "2.5 BHK Versatile Residences",
    category: "2.5bhk",
    sizeRange: "1,348 – 1,590 Sq.Ft.",
    priceEstimate: "Request Latest Price",
    keyHighlights: "In-demand format featuring an extra flexible room ideal for a home office, study, or guest room.",
    features: [
      "Dedicated multi-purpose flexi-room suitable for Work-From-Home or child study",
      "Spacious living room leading to an airy outdoor sit-out balcony",
      "Optimized carpet efficiency minimizing corridor wastage",
      "High resale and rental liquidity in the West Hyderabad IT corridor",
    ],
  },
  {
    id: "3-bhk",
    bhk: "3 BHK Family Residences",
    category: "3bhk",
    sizeRange: "1,604 – 2,139 Sq.Ft.",
    priceEstimate: "Request Latest Price",
    keyHighlights: "Expansive three-bedroom homes with lavish master suites, large balconies, and enhanced privacy.",
    features: [
      "Expansive 3-bedroom configurations accommodating multi-generational living",
      "Master bedroom with dedicated wardrobe space and en-suite bath",
      "Multiple private balconies offering panoramic residential and skyline views",
      "Reserved basement parking allocations for convenient family commuting",
    ],
  },
];

interface AmenityGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  subtitle: string;
  items: string[];
}

const AMENITY_GROUPS: AmenityGroup[] = [
  {
    id: "fitness",
    name: "Fitness & Wellness",
    icon: <Dumbbell className="w-5 h-5 text-amber-400" />,
    subtitle: "Modern health, fitness and mindfulness facilities",
    items: [
      "Fully Equipped Modern Gymnasium",
      "Dedicated Yoga & Meditation Pavilions",
      "Spa & Salon Infrastructure Provision",
      "Aerobics & Freehand Fitness Space",
      "Jogging & Brisk Walking Perimeter Path",
      "Health & Wellness Consultation Room",
    ],
  },
  {
    id: "indoor",
    name: "Indoor Recreation & Business",
    icon: <Briefcase className="w-5 h-5 text-amber-400" />,
    subtitle: "Work-from-home lounges and indoor recreational spaces",
    items: [
      "Dedicated Business Lounge & Co-Working Hub",
      "Conference Facility with AV Equipment",
      "Indoor Games Room (Table Tennis, Billiards, Carrom, Chess)",
      "Multipurpose Celebration Hall",
      "Resident Association & Facility Office",
      "Fully Furnished Guest Bedrooms for Visitors",
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Recreation & Greenery",
    icon: <Waves className="w-5 h-5 text-amber-400" />,
    subtitle: "Resort-style aquatic and landscaped leisure spaces",
    items: [
      "Grand Swimming Pool with Sunken Lounge Deck",
      "Safe Kids Splash Pool with Overflow Filters",
      "Lush Landscaped Courtyards & Themed Green Pockets",
      "Open Party Celebration Lawns",
      "Outdoor Gazebos & Senior Citizen Sit-Outs",
      "Secure Children Play Park with Impact Flooring",
    ],
  },
  {
    id: "community",
    name: "Community & Infrastructure",
    icon: <Users className="w-5 h-5 text-amber-400" />,
    subtitle: "Smart estate services, vehicular safety and convenience",
    items: [
      "Grand Reception & Waiting Lounge",
      "Café & Social Gathering Zone",
      "2-Level Basement Parking with Clear Directional Signage",
      "100% DG Emergency Power Backup for Common Areas",
      "24/7 Security Surveillance with Automated Boom Barriers",
      "Rainwater Harvesting System & Water Treatment Plant",
    ],
  },
];

export const PavaniStarlitPage = () => {
  const formId = useId();
  const [selectedBhkTab, setSelectedBhkTab] = useState<"all" | "2bhk" | "2.5bhk" | "3bhk">("all");
  const [activeAmenityTab, setActiveAmenityTab] = useState<string>("fitness");
  const [copiedRera, setCopiedRera] = useState(false);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    preference: "2.5 BHK",
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
        notes: `Pavani Starlit Enquiry | Config: ${formData.preference} | Purpose: ${formData.purpose} | Preferred Visit: ${formData.visitDate || "Not Specified"}`,
        search_intent: {
          budget_min: undefined,
          budget_max: undefined,
          preferred_locations: ["Miyapur", "Maqtha Mahaboobpet"],
          preferred_bhk: [formData.preference],
        },
      };

      const context: PageContext = {
        projectName: PROJECT_CONFIG.name,
        projectSlug: "pavani-starlit-miyapur",
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

  const filteredPlans =
    selectedBhkTab === "all"
      ? CONFIG_PLANS
      : CONFIG_PLANS.filter((p) => p.category === selectedBhkTab);

  const waText = encodeURIComponent(
    `Hi Naani Projects, I am interested in Pavani Starlit in Miyapur, Hyderabad. Please share the latest pricing, available configurations, and floor plans.`
  );
  const waUrl = `https://wa.me/91${PROJECT_CONFIG.phoneRaw}?text=${waText}`;

  // Structured Data (JSON-LD)
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
      { "@type": "ListItem", "position": 3, "name": "Miyapur", "item": "https://www.naani.in/projects-in-miyapur" },
      { "@type": "ListItem", "position": 4, "name": "Pavani Starlit", "item": PROJECT_CONFIG.canonicalUrl },
    ],
  };

  const schemaProject = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": PROJECT_CONFIG.name,
    "url": PROJECT_CONFIG.canonicalUrl,
    "description": "Pavani Starlit is a premium residential apartment community by Sai Sravanthi Infra Projects in Maqtha Mahaboobpet, Miyapur, Hyderabad. Featuring 2, 2.5 and 3 BHK homes across ~3 acres with 45,000+ sq. ft. of amenities. Registered under TG RERA ID P02400008769.",
    "telephone": PROJECT_CONFIG.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maqtha Mahaboobpet, Miyapur",
      "addressLocality": "Miyapur",
      "addressRegion": "Telangana",
      "postalCode": "500049",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4968",
      "longitude": "78.3562",
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Grand Swimming Pool", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Fully Equipped Gymnasium", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Yoga and Meditation Room", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Business Lounge and Conference Facility", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Multipurpose Banquet Hall", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Indoor Games Arena", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Landscaped Open Spaces", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "2-Level Basement Parking", "value": true },
    ],
  };

  const schemaFaqs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where is Pavani Starlit located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pavani Starlit is located in Maqtha Mahaboobpet, Miyapur, Hyderabad, Telangana 500049, offering rapid access to the Miyapur Metro Station, NH-65 Mumbai Highway, and the Western Hyderabad IT corridor.",
        },
      },
      {
        "@type": "Question",
        "name": "Who is the developer of Pavani Starlit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The project is developed by Sai Sravanthi Infra Projects Private Limited (Pavani Group), an active infrastructure and residential development firm in Hyderabad.",
        },
      },
      {
        "@type": "Question",
        "name": "What configurations are available at Pavani Starlit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The community offers 2 BHK, 2.5 BHK (with dedicated home office/study room), and 3 BHK apartment configurations.",
        },
      },
      {
        "@type": "Question",
        "name": "What are the apartment sizes at Pavani Starlit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Published indicative size ranges are: 2 BHK from 1,275 to 1,471 sq. ft., 2.5 BHK from 1,348 to 1,590 sq. ft., and 3 BHK from 1,604 to 2,139 sq. ft. Overall project sizes range approximately 1,275–2,139 sq. ft.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the RERA number of Pavani Starlit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pavani Starlit is registered with Telangana RERA under registration number TG RERA ID P02400008769.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the expected possession date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expected possession is scheduled for 2029 as per provisional project timelines. Buyers are advised to verify tower-specific milestones on the official TG RERA portal.",
        },
      },
      {
        "@type": "Question",
        "name": "What amenities are available at Pavani Starlit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The project advertises over 45,000 sq. ft. of amenities including a clubhouse, gymnasium, yoga room, swimming pool, business lounge, conference facilities, multipurpose hall, guest rooms, and landscaped open spaces.",
        },
      },
      {
        "@type": "Question",
        "name": "Is Pavani Starlit suitable for families?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, with low-density 10-storey mid-rise towers, dedicated 2.5 BHK study configurations, safe children play zones, and proximity to leading schools in Miyapur and Nizampet, it is designed as a family-friendly community.",
        },
      },
      {
        "@type": "Question",
        "name": "How can I get the floor plans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can request verified floor plan drawings and tower layout brochures directly through Naani Projects by clicking 'Request Floor Plans' or messaging our property advisor on WhatsApp.",
        },
      },
      {
        "@type": "Question",
        "name": "How can I schedule a site visit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fill out the site visit schedule form on this page or call our advisory desk at +91 94939 43946 for assisted site visit scheduling and guided model flat tours.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the latest price of Pavani Starlit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pricing is dynamic and provided on request based on available tower inventory, floor rise, and current builder releases. Contact our advisory team for the official cost sheet.",
        },
      },
      {
        "@type": "Question",
        "name": "How can I check apartment availability?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Connect with Naani Projects via phone or WhatsApp at +91 94939 43946 to check live unit availability across 2, 2.5 and 3 BHK layouts.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Pavani Starlit Miyapur | 2, 2.5 & 3 BHK Flats in Hyderabad"
        description="Explore Pavani Starlit Miyapur, Hyderabad. Discover spacious 2, 2.5 & 3 BHK apartments, project details, amenities, location and floor plans."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        ogImage="https://www.naani.in/og-pavani-starlit.jpg"
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

      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200">
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
              <Link to="/projects-in-miyapur" className="hover:text-amber-400 transition-colors">
                Miyapur
              </Link>
              <ChevronRight size={14} className="text-slate-600" />
              <span className="text-amber-400 font-semibold truncate">Pavani Starlit</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Headings & Value Badges */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
                  <span>Sai Sravanthi Infra Projects · Maqtha Mahaboobpet, Miyapur</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Pavani Starlit <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                    Premium Apartments in Miyapur, Hyderabad
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                  Discover thoughtfully planned 2, 2.5 &amp; 3 BHK residences in a well-connected residential neighbourhood of Hyderabad. Featuring mid-rise tower architecture, generous open spaces, and over 45,000 sq. ft. of clubhouse and wellness amenities.
                </p>

                {/* 6 Key Project Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Land Parcel
                    </span>
                    <span className="text-base font-extrabold text-white">~3 Acres</span>
                    <span className="text-[11px] text-slate-400 block">~70% Open Spaces</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Towers &amp; Height
                    </span>
                    <span className="text-base font-extrabold text-white">3 Towers</span>
                    <span className="text-[11px] text-slate-400 block">2 Cellars + Stilt + 10 Floors</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Configurations
                    </span>
                    <span className="text-base font-extrabold text-white">2, 2.5 &amp; 3 BHK</span>
                    <span className="text-[11px] text-amber-400 font-semibold block">1,275 – 2,139 Sq.Ft.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Lifestyle Hub
                    </span>
                    <span className="text-base font-extrabold text-white">45,000+ Sft</span>
                    <span className="text-[11px] text-slate-400 block">Clubhouse &amp; Wellness</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      RERA Verified
                    </span>
                    <span className="text-base font-extrabold text-amber-400">P02400008769</span>
                    <span className="text-[11px] text-slate-400 block">TG RERA Registered</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Possession
                    </span>
                    <span className="text-base font-extrabold text-amber-400">2029 Target</span>
                    <span className="text-[11px] text-slate-400 block">Under Construction</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="#enquiry-section"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <span>Request Latest Price</span>
                    <ArrowRight size={16} className="ml-2" />
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm transition-all border border-emerald-500/40 shadow-sm active:scale-95"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    <span>WhatsApp Advisor</span>
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
                        Our senior property advisor for <strong>Pavani Starlit</strong> will connect with you via WhatsApp/Call with the latest pricing and layout plans.
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
                          placeholder="e.g. Rajesh Reddy"
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
                            Configuration
                          </label>
                          <select
                            id={`${formId}-pref`}
                            value={formData.preference}
                            onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                          >
                            <option value="2 BHK">2 BHK (1,275 - 1,471 Sft)</option>
                            <option value="2.5 BHK">2.5 BHK (1,348 - 1,590 Sft)</option>
                            <option value="3 BHK">3 BHK (1,604 - 2,139 Sft)</option>
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
                            <option value="Investment">Investment / Rental Yield</option>
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
                          I agree to be contacted via WhatsApp/Call regarding Pavani Starlit project details, pricing, and availability.
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

        {/* 2. PROJECT OVERVIEW & DEVELOPMENT HIGHLIGHTS */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="overview">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Project Overview &amp; Master Plan
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                About Pavani Starlit
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Pavani Starlit is a residential apartment development by <strong>Sai Sravanthi Infra Projects Private Limited</strong>, located in the thriving Maqtha Mahaboobpet pocket of Miyapur, Hyderabad.
              </p>
            </div>

            {/* Narrative Context Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 mb-12 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Spread across approximately <strong>3 acres</strong>, the project is marketed with <strong>2 BHK, 2.5 BHK and 3 BHK</strong> apartment configurations thoughtfully engineered to accommodate diverse family requirements and lifestyle aspirations.
              </p>
              <p>
                The development highlights spacious apartment layouts, dedicated clubhouse facilities, recreational amenities, and landscaped open spaces. With mid-rise towers designed with 2 Cellars, Stilt, and 10 Upper Floors, the project offers a low-density alternative to sprawling high-rises.
              </p>
              <p>
                Its strategic location in Miyapur provides direct access to established educational institutions, multispecialty hospitals, shopping destinations like GSM Mall, and uninterrupted connectivity toward the Western Hyderabad employment corridors of HITEC City and Gachibowli.
              </p>
            </div>

            {/* 6 Attractive Highlight Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Maximize2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Approximately 3 Acres</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Carefully proportioned residential footprint ensuring adequate open space, sunlight penetration, and pedestrian circulation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3 Residential Towers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Published information indicates 3 towers rising 2 Cellars + Stilt + 10 Floors (subject to sanctioned-plan verification).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2, 2.5 &amp; 3 BHK Configurations</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ranging from 1,275 to 2,139 sq. ft., offering functional floor plans with a dedicated 2.5 BHK study option.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Trees size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">~70% Open Spaces</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Roughly seven-tenths of the land parcel is dedicated to landscaped gardens, open green lawns, and recreational zones.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">45,000+ Sft Advertised Amenities</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dedicated multi-level clubhouse, swimming pool, gymnasium, indoor sports, business hub, and banquet facilities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">TG RERA Registered</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Officially registered with Telangana RERA under ID <strong>P02400008769</strong>, ensuring statutory project compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. APARTMENT CONFIGURATIONS & DYNAMIC PRICING */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="configurations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Floor Plans &amp; Sizing
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Apartment Configurations
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Featuring spacious, Vastu-compliant layouts designed for modern urban families. Published sizes range between 1,275 and 2,139 sq. ft.
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[
                  { key: "all", label: "All Configurations" },
                  { key: "2bhk", label: "2 BHK (1,275 – 1,471 Sft)" },
                  { key: "2.5bhk", label: "2.5 BHK (1,348 – 1,590 Sft)" },
                  { key: "3bhk", label: "3 BHK (1,604 – 2,139 Sft)" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedBhkTab(tab.key as any)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      selectedBhkTab === tab.key
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        {plan.category.toUpperCase()}
                      </span>
                      <Home size={18} className="text-slate-500" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.bhk}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs text-slate-400">Super Built-up:</span>
                        <span className="text-sm font-extrabold text-amber-400">{plan.sizeRange}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Price Status:
                      </span>
                      <span className="text-base font-extrabold text-white">Contact for Latest Price</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900">
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        &quot;{plan.keyHighlights}&quot;
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-200">Layout Highlights:</span>
                      <ul className="space-y-2">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <a
                      href="#enquiry-section"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500/10 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-amber-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Request Detailed Floor Plans</span>
                      <ChevronRight size={14} />
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
                    Official Quotation &amp; Payment Schedules
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    In compliance with verified real estate standards, Naani Projects does not publish unverified flat rates. Actual unit pricing varies based on tower release phase, floor rise charges, preferred facing (East/West), and statutory registration fees.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Current Price</span>
                      <span className="text-xs sm:text-sm font-bold text-amber-400">On Request</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Apartment Sizes</span>
                      <span className="text-xs sm:text-sm font-bold text-white">1,275 – 2,139 Sft</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Total Cost</span>
                      <span className="text-xs sm:text-sm font-bold text-amber-400">Request Quotation</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Availability</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-400">Enquire Inventory</span>
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

        {/* 4. CATEGORIZED AMENITIES (45,000+ SFT) */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="amenities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Resort Lifestyle Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                45,000+ Sq. Ft. of Advertised Amenities
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Carefully planned across dedicated indoor and outdoor zones to support fitness, remote business, and family recreation.
              </p>

              {/* Amenity Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {AMENITY_GROUPS.map((grp) => (
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
                AMENITY_GROUPS.find((g) => g.id === activeAmenityTab) || AMENITY_GROUPS[0];
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
                          <span className="text-[11px] text-slate-400">Official Amenity Schedule</span>
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
                <em>Note: Amenity specifications are based on developer marketing disclosures and are subject to final delivery schedules and sanctioned layout approvals.</em>
              </p>
            </div>
          </div>
        </section>

        {/* 5. STRATEGIC LOCATION IN MIYAPUR */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="location">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Transit &amp; Growth Corridor
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Strategically Located in Miyapur
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Situated in <strong>Maqtha Mahaboobpet, Miyapur</strong>, offering rapid access to Western Hyderabad&apos;s metro rail, highway corridors, and leading employment centers.
              </p>
            </div>

            {/* Location Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Miyapur Metro Station</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~5–7 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Terminal metro station on the Red Line providing seamless, traffic-free transit directly into Ameerpet, Secunderabad, and LB Nagar.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Activity size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Srikara &amp; Multispecialty Hospitals</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~6–8 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Close proximity to leading healthcare facilities including Srikara Hospital, Pranaam Hospital, and Apollo Clinic Miyapur.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Tv size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">GSM Mall &amp; Multiplex</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~8–10 Mins Drive</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Key retail and entertainment hub featuring multi-screen cinema, departmental stores, restaurants, and family leisure.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Top Schools &amp; Academies</h3>
                <span className="text-xs font-bold text-amber-400 block mb-2">~5–12 Mins Radius</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Proximity to Silver Oaks, Kennedy High The Global School, The Creek Planet School, and Genesis International.
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
                  <span className="text-xs font-bold text-amber-400 block">Kukatpally &amp; JNTU</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">~12–15 Mins</span>
                  <p className="text-[11px] text-slate-400 mt-1">Direct access along the NH-65 Mumbai Highway corridor.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block">HITEC City / Cyber Towers</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">~20–25 Mins</span>
                  <p className="text-[11px] text-slate-400 mt-1">Direct commute via Miyapur–Gachibowli Road and Hafeezpet.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block">Financial District &amp; ORR</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">~25–30 Mins</span>
                  <p className="text-[11px] text-slate-400 mt-1">Fast highway access via ORR Sultanpur / Patancheru junctions.</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4 italic">
                * Note: Commute durations are estimates based on normal road conditions and may vary depending on peak-hour traffic.
              </p>
            </div>
          </div>
        </section>

        {/* 6. DEVELOPER PROFILE & RERA VERIFICATION */}
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
                    About Sai Sravanthi Infra Projects
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong>Sai Sravanthi Infra Projects Private Limited</strong> (part of Pavani Group) is an established real estate enterprise focused on delivering residential developments and quality infrastructure in the Hyderabad metropolitan area.
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    The developer emphasizes practical, family-centric architectural planning, Vastu compliance, and lifestyle infrastructure in emerging urban growth corridors like Miyapur.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <a
                    href={PROJECT_CONFIG.developerWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>View Official Developer Project Portfolio</span>
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
                    Pavani Starlit is an officially registered project under the Telangana Real Estate Regulatory Authority (TG RERA).
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
                      <div><strong className="text-slate-300">Location:</strong> Maqtha Mahaboobpet, Miyapur, Hyderabad</div>
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

        {/* 7. INDEPENDENT BUYER ADVISORY & DUE DILIGENCE */}
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
                Naani Projects provides balanced, research-driven advisory highlighting both project strengths and critical points to evaluate before making a purchase.
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
                      <strong className="text-white">Low-Density Mid-Rise Scale:</strong> At 10 floors across 3 towers, the project avoids the excessive elevator waiting times and high maintenance overheads common in 40+ storey mega high-rises.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Practical 2.5 BHK Configuration:</strong> The 1,348–1,590 sq. ft. flexi-format meets the exact demand of work-from-home IT families needing a dedicated study without the budget leap of a full 3 BHK.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Robust Transit Proximity:</strong> Located just 5–7 minutes from Miyapur Metro Station with direct links toward HITEC City via Hafeezpet and Gachibowli.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Extensive 45,000+ Sft Amenities:</strong> A substantial clubhouse and recreational footprint designed for a mid-size 3-acre community ensures low per-capita amenity crowding.
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
                      <strong className="text-white">Provisional Possession Timeline (2029):</strong> The project is in the under-construction phase. Buyers should inspect tower-wise RERA completion milestones before committing capital.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Sanctioned Plan Verification:</strong> Confirm sanctioned tower heights (2 Cellars + Stilt + 10 Floors) and unit numbers against GHMC approved municipal drawings.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Approach Road &amp; Peak Hour Traffic:</strong> Maqtha Mahaboobpet feeder roads experience traffic during school and commute hours. Inspect physical approach width before final booking.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">Phase-Wise Clubhouse Handover:</strong> Ensure the 45,000+ sq. ft. clubhouse amenities are tied to an explicit phased delivery commitment in the Agreement of Sale.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-4xl mx-auto space-y-4">
              <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest inline-block">
                Tailored Advisory Assistance
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Need Help Selecting the Right Floor, Facing &amp; Tower?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Connect with our senior property advisors for an unbiased comparative assessment between Pavani Starlit and other prominent residential developments across Miyapur and Nizampet.
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

        {/* 8. FREQUENTLY ASKED QUESTIONS (12 FAQS) */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="faqs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Everything You Need to Know About Pavani Starlit
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Transparent answers to common queries regarding location, pricing, RERA status, and amenities.
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

        {/* 9. MOBILE FIXED STICKY CTA BAR */}
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

export default PavaniStarlitPage;
