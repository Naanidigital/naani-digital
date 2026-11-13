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
  name: "Vasavi Atlantis",
  developer: "Vasavi Group (Vasavi Constructions LLP)",
  location: "Narsingi, Hyderabad",
  address: "Adjacent to Nehru Outer Ring Road (ORR), Narsingi Village, Gandipet Mandal, Near Financial District, Hyderabad, Telangana 500075",
  startingPrice: "₹1.06 Cr Onwards",
  priceRange: "₹1.06 Cr – ₹3.16 Cr+",
  pricePerSqFt: "₹7,700 – ₹9,500 per sq. ft. (Base rate + floor rise & statutory taxes)",
  reraNumber: "P02400003398",
  reraDisplay: "TG RERA Registered: P02400003398",
  landArea: "12 to 12.3 Acres Expansive Gated Township",
  towers: "8 Ultra-High-Rise Towers (40 to 45 Floors · Sky Villas up to 49 Floors)",
  totalUnits: "2,160 to 2,199 Luxury Residences",
  openSpace: "70% Open Spaces with Water Features & Landscaped Gardens",
  clubhouseType: "Rare Twin-Clubhouse Architecture",
  launchDate: "Launched Late 2021",
  possession: "Phased Deliveries through August 2028",
  canonicalUrl: "https://www.naani.in/projects/vasavi-atlantis",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Vasavi Atlantis",
};

interface ConfigPlan {
  id: string;
  bhk: string;
  category: "2bhk" | "3bhk" | "4bhk";
  sizeRange: string;
  priceRange: string;
  keyHighlights: string;
  features: string[];
}

const CONFIG_PLANS: ConfigPlan[] = [
  {
    id: "2-bhk",
    bhk: "2 BHK Luxury Residences",
    category: "2bhk",
    sizeRange: "1,250 – 1,310 Sq.Ft.",
    priceRange: "₹1.06 Cr – ₹1.25 Cr",
    keyHighlights: "Generously proportioned living/dining space, balcony, and separate utility.",
    features: [
      "Vastu-compliant layouts with clear East/West entrance options",
      "Separated living and dining areas creating distinct formal and private spaces",
      "Dedicated utility balcony for laundry and washing machine setup",
      "High rental yield driven by Financial District and Kokapet corporate workforce",
    ],
  },
  {
    id: "3-bhk",
    bhk: "3 BHK Premium Residences",
    category: "3bhk",
    sizeRange: "1,610 – 2,220 Sq.Ft.",
    priceRange: "₹1.52 Cr – ₹2.10 Cr",
    keyHighlights: "Multiple size variants with spacious master suites and wide balconies.",
    features: [
      "Diverse format options spanning from smart 1,610 sft to expansive 2,220 sft layouts",
      "Master bedroom suite with attached dressing area and lavish bathroom fittings",
      "Expansive sit-out balconies offering panoramic high-rise skyline views",
      "Cross-ventilated three-side open orientations maximizing natural light",
    ],
  },
  {
    id: "3.5-4-bhk",
    bhk: "3.5 & 4 BHK Sky Villas & Presidential Suites",
    category: "4bhk",
    sizeRange: "2,450 – 3,330 Sq.Ft.",
    priceRange: "₹2.30 Cr – ₹3.16 Cr",
    keyHighlights: "Expansive luxury formats and upper-level Sky Villas designed for large families.",
    features: [
      "Ultra-spacious formats including top-tier Sky Villas rising up to 49 floors",
      "Dedicated maid/utility room with separate washroom and entry access",
      "Dual private balconies with sweeping views of the Financial District and ORR",
      "Multiple reserved basement parking slots across 4 basement levels",
    ],
  },
];

const FAQS = [
  {
    q: "What is Vasavi Atlantis and who is the developer?",
    a: "Vasavi Atlantis is a large-scale, ultra-high-rise luxury gated community developed by Vasavi Group (Vasavi Constructions LLP) in Narsingi, Hyderabad. Spanning 12 to 12.3 acres, it features 8 residential towers rising 40 to 45 floors (select Sky Villas up to 49 floors) with approximately 2,160 to 2,199 apartments.",
  },
  {
    q: "Where is Vasavi Atlantis located?",
    a: "Vasavi Atlantis is positioned directly adjacent to the Nehru Outer Ring Road (ORR) in Narsingi Village, Gandipet Mandal, right at the gateway to the Financial District (Nanakramguda) and Kokapet Neopolis in West Hyderabad.",
  },
  {
    q: "Is Vasavi Atlantis TG RERA registered?",
    a: "Yes, Vasavi Atlantis is registered with Telangana RERA under TG RERA Registration No. P02400003398.",
  },
  {
    q: "What is the expected possession and handover timeline?",
    a: "The project was launched in late 2021 with phased tower handovers scheduled through August 2028. (In September 2026, Vasavi Group also sought environmental clearance for a potential township expansion up to 10 blocks and ~2,259 units).",
  },
  {
    q: "What configurations and sizes are available at Vasavi Atlantis?",
    a: "The project offers 2 BHK (1,250 – 1,310 sq.ft.), 3 BHK (1,610 – 2,220 sq.ft.), and 3.5 & 4 BHK Sky Villas (2,450 – 3,330 sq.ft.) luxury residences, known for above-average super built-up room dimensions.",
  },
  {
    q: "What is the pricing and per sq. ft. rate?",
    a: "Base pricing tracks between ₹7,700 and ₹9,500 per sq. ft. Indicative base prices range from ₹1.06 Cr – ₹1.25 Cr for 2 BHK, ₹1.52 Cr – ₹2.10 Cr for 3 BHK, and ₹2.30 Cr – ₹3.16 Cr for 3.5 & 4 BHK, subject to floor rise, preferred location charges (PLC), amenities fees, and statutory taxes.",
  },
  {
    q: "What is the Twin Clubhouse concept at Vasavi Atlantis?",
    a: "To comfortably serve the large ~2,200 family resident base, Vasavi Atlantis features a rare Twin-Clubhouse architecture. Amenities include multiple gymnasiums, indoor badminton & squash courts, yoga studios, spa/salon facilities, guest rooms, a business center, library, temperature-controlled & outdoor swimming pools, lakefront viewing deck, and an open-air amphitheater.",
  },
  {
    q: "How close is the project to the Financial District and RGIA Airport?",
    a: "Vasavi Atlantis sits just 5 to 10 minutes from the Financial District (Nanakramguda), 10 to 15 minutes from Gachibowli and Kokapet Neopolis, and 20 minutes from HITEC City. Direct ORR connectivity provides a fast 25 to 30-minute drive to Rajiv Gandhi International Airport (RGIA).",
  },
];

export const VasaviAtlantisPage = () => {
  const formId = useId();
  const [activeConfigTab, setActiveConfigTab] = useState<"all" | "2bhk" | "3bhk" | "4bhk">("all");
  const [activeAmenityHub, setActiveAmenityHub] = useState<"twinclub" | "wfh" | "recreation" | "infra">("twinclub");

  // Lead Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    preference: "3 BHK",
    consent: false,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [submittedPhones, setSubmittedPhones] = useState<string[]>([]);

  // Strict Indian mobile validation
  const validateIndianMobile = (phone: string) => {
    const cleaned = phone.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)/, "");
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const getCleanMobile = (phone: string) => {
    return phone.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)/, "");
  };

  const handleSimpleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!validateIndianMobile(formData.mobileNumber)) {
      setFormError("Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).");
      return;
    }
    if (!formData.consent) {
      setFormError("Please check the consent box to authorize contact before proceeding.");
      return;
    }

    const cleanNumber = getCleanMobile(formData.mobileNumber);

    if (submittedPhones.includes(cleanNumber)) {
      setFormError("You have already submitted an enquiry with this mobile number. Our advisor will connect shortly.");
      return;
    }

    setFormSubmitting(true);
    const cleanPhone = `+91${cleanNumber}`;

    const profile: LeadProfile = {
      name: formData.fullName.trim(),
      phone: cleanPhone,
      lookingFor: formData.preference,
      capturedAt: new Date().toISOString(),
    };

    const context: PageContext = {
      propertyName: PROJECT_CONFIG.name,
      projectName: PROJECT_CONFIG.name,
      builderName: PROJECT_CONFIG.developer,
      location: "Narsingi, Hyderabad",
      propertyType: "Apartment",
      pageUrl: typeof window !== "undefined" ? window.location.href : PROJECT_CONFIG.canonicalUrl,
      sourcePage: typeof document !== "undefined" ? document.referrer : "",
    };

    try {
      await sendLeadToSheet({
        profile,
        context,
        leadSource: PROJECT_CONFIG.leadSource,
      });
      setSubmittedPhones((prev) => [...prev, cleanNumber]);
      setFormSuccess(true);
    } catch {
      setFormError("Unable to submit right now. Please connect directly via WhatsApp or call.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const waLeadMsg = encodeURIComponent(
    `Hi Naani Projects, I'm interested in Vasavi Atlantis (Narsingi, ORR). Please share tower-specific floor plans, latest pricing sheets, and current construction progress.`
  );
  const waUrl = `https://wa.me/91${PROJECT_CONFIG.phoneRaw}?text=${waLeadMsg}`;

  const filteredPlans = activeConfigTab === "all"
    ? CONFIG_PLANS
    : CONFIG_PLANS.filter((p) => p.category === activeConfigTab);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
          { "@type": "ListItem", "position": 3, "name": "Narsingi", "item": "https://www.naani.in/projects-in-narsingi" },
          { "@type": "ListItem", "position": 4, "name": "Vasavi Atlantis", "item": PROJECT_CONFIG.canonicalUrl },
        ],
      },
      {
        "@type": "ApartmentComplex",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#project`,
        name: "Vasavi Atlantis",
        url: PROJECT_CONFIG.canonicalUrl,
        description:
          "Vasavi Atlantis by Vasavi Group in Narsingi, Hyderabad adjacent to Nehru ORR near Financial District. Spanning 12.3 acres with 8 towers (40-45 floors, Sky Villas up to 49 floors), 70% open spaces, and twin clubhouses.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Adjacent to Nehru ORR, Narsingi Village, Gandipet Mandal",
          addressLocality: "Narsingi",
          addressRegion: "Telangana",
          postalCode: "500075",
          addressCountry: "IN",
        },
        telephone: PROJECT_CONFIG.phone,
        developer: {
          "@type": "Organization",
          name: "Vasavi Group (Vasavi Constructions LLP)",
        },
      },
      {
        "@type": "RealEstateListing",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#listing`,
        name: "Vasavi Atlantis Narsingi – Luxury 2, 3, 3.5 & 4 BHK High-Rise Apartments",
        url: PROJECT_CONFIG.canonicalUrl,
        image: "https://www.naani.in/og-vasavi-atlantis.jpg",
        datePosted: "2026-11-13",
      },
      {
        "@type": "FAQPage",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Vasavi Atlantis Narsingi Hyderabad | 2, 3 & 4 BHK High-Rise Flats"
        description="Vasavi Atlantis in Narsingi, Hyderabad by Vasavi Group off Nehru ORR near Financial District. 12.3 acres, 8 towers (40-45 floors), twin clubhouses, 70% open spaces. Get price sheet & floor plans."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        keywords="Vasavi Atlantis, Vasavi Atlantis Narsingi, Vasavi Group Narsingi, Luxury apartments in Narsingi, Flats near Financial District Hyderabad, 3 BHK flats Narsingi ORR, Sky Villas Narsingi"
        ogImage="https://www.naani.in/og-vasavi-atlantis.jpg"
        structuredData={structuredData}
      />

      <div className="bg-[#090D16] text-slate-100 min-h-screen selection:bg-amber-500/20 selection:text-amber-300 pb-24 md:pb-16 font-sans">
        {/* Top Breadcrumb Navigation */}
        <div className="border-b border-slate-800/80 bg-[#090D16]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
              <span className="text-slate-400">Narsingi</span>
              <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
              <span className="text-amber-400 font-semibold truncate">Vasavi Atlantis</span>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[11px]">
                <Clock size={12} className="text-amber-400" /> Handovers: Through August 2028
              </span>
              <span className="text-slate-500 text-[11px]">TG RERA: P02400003398</span>
            </div>
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-slate-800/60">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Headlines & Key Stats */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Vasavi Group · Adjacent to Nehru ORR, Narsingi</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Vasavi Atlantis <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                    Ultra-High-Rise Living in Narsingi
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                  An iconic 12.3-acre luxury high-rise landmark positioned directly off the Nehru Outer Ring Road near the Financial District. Featuring 8 soaring towers rising 40 to 45 floors (with Sky Villas up to 49 floors), ~70% open spaces, expansive floor formats, and rare twin-clubhouse lifestyle infrastructure.
                </p>

                {/* 6 Key Highlights Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Township Scale</p>
                    <p className="text-base font-extrabold text-white mt-0.5">12.3 Acres</p>
                    <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">8 Towers · 40–45 Floors</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Open Footprint</p>
                    <p className="text-base font-extrabold text-white mt-0.5">~70% Open</p>
                    <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Landscaped water bodies</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Units</p>
                    <p className="text-base font-extrabold text-white mt-0.5">~2,199 Units</p>
                    <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">2, 3, 3.5 &amp; 4 BHK</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Lifestyle Hub</p>
                    <p className="text-base font-extrabold text-white mt-0.5">Twin Clubhouses</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Dual club system &amp; WFH</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">RERA Verified</p>
                    <p className="text-base font-extrabold text-white mt-0.5">P02400003398</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Telangana RERA approved</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Delivery Target</p>
                    <p className="text-base font-extrabold text-amber-400 mt-0.5">Through 2028</p>
                    <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Phased handovers</p>
                  </div>
                </div>

                {/* Primary Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#enquiry-section"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                  >
                    Request Price Sheet &amp; Floor Plans <ArrowRight size={16} />
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm border border-emerald-500/30 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle size={16} /> WhatsApp Advisor
                  </a>
                  <a
                    href={`tel:${PROJECT_CONFIG.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
                  >
                    <Phone size={15} /> {PROJECT_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Lead Form */}
              <div className="lg:col-span-5" id="enquiry-section">
                <div className="rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#0B101D] border border-amber-500/30 p-6 sm:p-7 shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="space-y-1 mb-5">
                    <span className="text-[11px] font-extrabold tracking-widest uppercase text-amber-400">
                      Direct Advisory Access
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Request Pricing &amp; Floor Plans
                    </h3>
                    <p className="text-xs text-slate-400">
                      Receive verified tower layout PDFs, all-inclusive cost breakdowns, and construction milestone schedules directly on WhatsApp.
                    </p>
                  </div>

                  {formSuccess ? (
                    <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                        <Check size={20} />
                      </div>
                      <h4 className="text-sm font-bold text-white">Enquiry Registered</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Thank you! Our Narsingi &amp; Financial District property advisor will share verified Vasavi Atlantis unit cost sheets, tower layouts, and construction updates with you shortly.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors"
                      >
                        <MessageCircle size={14} /> Open Immediate WhatsApp Chat
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSimpleEnquirySubmit} className="space-y-4">
                      <div>
                        <label htmlFor={`${formId}-name`} className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          id={`${formId}-name`}
                          type="text"
                          required
                          placeholder="e.g. Rajesh Reddy"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Mobile Number <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            +91
                          </span>
                          <input
                            id={`${formId}-phone`}
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="9876543210"
                            value={formData.mobileNumber}
                            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                            className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">10-digit Indian mobile number</p>
                      </div>

                      <div>
                        <label htmlFor={`${formId}-pref`} className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Preferred Configuration
                        </label>
                        <select
                          id={`${formId}-pref`}
                          value={formData.preference}
                          onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        >
                          <option value="2 BHK">2 BHK (1,250 – 1,310 Sq.Ft.)</option>
                          <option value="3 BHK">3 BHK (1,610 – 2,220 Sq.Ft.)</option>
                          <option value="3.5 & 4 BHK">3.5 &amp; 4 BHK Sky Villas (2,450 – 3,330 Sq.Ft.)</option>
                          <option value="Undecided">Undecided / Exploring Options</option>
                        </select>
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
                          I agree to be contacted via WhatsApp/Call regarding Vasavi Atlantis project details and pricing.
                        </span>
                      </label>

                      {formError && (
                        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-lg leading-relaxed">
                          {formError}
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-md transition-all"
                      >
                        {formSubmitting ? "Submitting Request..." : "Request Latest Price & Floor Plans"}
                      </Button>

                      <div className="pt-2 text-center">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <MessageCircle size={13} /> Or connect immediately on WhatsApp
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROJECT OVERVIEW & ARCHITECTURAL PILLARS */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="architecture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Iconic 45-Storey Master Plan
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Project Overview &amp; Architectural Pillars
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Engineered with staggered tower heights and contemporary glass facades, Vasavi Atlantis redefines the luxury skyline along the Narsingi–Financial District corridor.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Iconic Wavering Skyline</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  8 towers rising 40 to 45 floors (with select sky villas reaching 49 floors). Features staggered heights and glass-and-concrete facades creating an unmistakable skyline signature along the ORR corridor.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Trees size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">~70% Open Space &amp; Water</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Roughly seven-tenths of the 12.3-acre footprint is dedicated to landscaped courtyards, reflection pools, pedestrian bridges, and lush botanical gardens insulating homes from expressway noise.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Car size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">4 Basements &amp; Robust Infra</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Features 4 subterranean basement levels plus ground-level parking, dedicated EV charging bays, 100% DG power backup, high-speed elevators, and centralized piped cooking gas connections.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">RERA &amp; Phased Timelines</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Registered under TG RERA ID P02400003398. Launched in late 2021 with phased handovers scheduled through August 2028, supported by Vasavi Group's multi-decade Hyderabad development record.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CONFIGURATIONS & PRICING MATRIX */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="configurations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Floor Plans &amp; Sizing
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Configurations &amp; Pricing Breakdown
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Known in the Narsingi market for offering generous super built-up areas compared to newer compact high-rises. Base rates range between ₹7,700 and ₹9,500 per sq. ft. plus floor-rise and statutory taxes.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              {[
                { id: "all", label: "All Configurations" },
                { id: "2bhk", label: "2 BHK (1,250 – 1,310 Sft)" },
                { id: "3bhk", label: "3 BHK (1,610 – 2,220 Sft)" },
                { id: "4bhk", label: "3.5 & 4 BHK (2,450 – 3,330 Sft)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveConfigTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeConfigTab === tab.id
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0A0F1A] border border-slate-800 hover:border-amber-500/50 p-6 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest">
                          {plan.category.toUpperCase()}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-0.5">{plan.bhk}</h3>
                      </div>
                      <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                        <Home size={20} />
                      </span>
                    </div>

                    <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Super Built-up Area:</span>
                        <span className="text-white font-bold">{plan.sizeRange}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Estimated Base Price:</span>
                        <span className="text-amber-400 font-bold text-sm">{plan.priceRange}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Key Layout Highlights:
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                        "{plan.keyHighlights}"
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800">
                    <a
                      href="#enquiry-section"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors"
                    >
                      Request Layout Plans &amp; Cost Sheet <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Pricing & Sizing Reference Table */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden mb-6">
              <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Building2 size={16} className="text-amber-400" /> Indicative Unit Type &amp; Pricing Matrix
                </h4>
                <span className="text-[11px] text-slate-400">Base rate ~₹7,700 – ₹9,500/sq.ft.</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">Unit Type</th>
                      <th className="py-3 px-4 font-bold">Super Built-up Area</th>
                      <th className="py-3 px-4 font-bold">Estimated Base Price Range</th>
                      <th className="py-3 px-4 font-bold">Key Layout Highlights</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">2 BHK</td>
                      <td className="py-3.5 px-4">1,250 – 1,310 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹1.06 Cr – ₹1.25 Cr</td>
                      <td className="py-3.5 px-4 text-slate-300">Generously proportioned living/dining space, balcony, and separate utility.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">3 BHK</td>
                      <td className="py-3.5 px-4">1,610 – 2,220 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹1.52 Cr – ₹2.10 Cr</td>
                      <td className="py-3.5 px-4 text-slate-300">Multiple size variants with spacious master suites and wide balconies.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">3.5 &amp; 4 BHK</td>
                      <td className="py-3.5 px-4">2,450 – 3,330 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹2.30 Cr – ₹3.16 Cr</td>
                      <td className="py-3.5 px-4 text-slate-300">Expansive luxury formats and upper-level Sky Villas designed for large families.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Advisory Guidance Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
              <Info size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-300">Statutory &amp; Floor-Rise Note: </span>
                Listed base price ranges reflect prevailing rates (₹7,700 to ₹9,500 per sq. ft.). Final costs vary with floor rise charges (due to heights up to 45–49 floors), premium facing charges (lake/city views), car parking slots, clubhouse infrastructure fees, and applicable GST/registration duties. Request a customized unit breakdown from our advisors.
              </div>
            </div>
          </div>
        </section>

        {/* 4. TWIN CLUBHOUSES & 50+ LIFESTYLE AMENITIES */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="amenities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Resort Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Twin Clubhouses &amp; 50+ Lifestyle Amenities
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Designed around a rare twin-clubhouse concept to comfortably serve ~2,200 families without overcrowding, backed by dedicated WFH business suites and lakefront recreation.
              </p>
            </div>

            {/* Hub Selector Buttons */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto">
                <button
                  onClick={() => setActiveAmenityHub("twinclub")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "twinclub"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Building2 size={16} /> Twin Clubhouses &amp; Wellness
                </button>
                <button
                  onClick={() => setActiveAmenityHub("wfh")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "wfh"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Briefcase size={16} /> WFH &amp; Business Hub
                </button>
                <button
                  onClick={() => setActiveAmenityHub("recreation")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "recreation"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Waves size={16} /> Recreation &amp; Lakefront
                </button>
                <button
                  onClick={() => setActiveAmenityHub("infra")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "infra"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Car size={16} /> 4 Basements &amp; Infra
                </button>
              </div>
            </div>

            {/* Hub 1: Twin Clubhouses & Wellness */}
            {activeAmenityHub === "twinclub" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Building2 size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Twin Clubhouse Architecture</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Two independent grand clubhouse structures strategically placed to divide resident leisure traffic and ensure uncrowded access to amenities.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Dumbbell size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Multiple Gymnasiums &amp; Studios</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dual modern fitness centers with high-end cardio and strength machinery, yoga and aerobics halls, and dedicated personal training zones.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Activity size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Indoor Badminton &amp; Squash</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Multiple standard indoor wooden badminton courts and regulation glass-back squash courts for year-round sports action.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Spa &amp; Wellness Salon</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated therapeutic massage rooms, steam and sauna baths, jacuzzi lounges, and in-house beauty and grooming services.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Grand Banquet Hall</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Double-height air-conditioned multipurpose banquet hall with attached banquet lawn and kitchen setup for community festivals and weddings.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Home size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Furnished Guest Bedrooms</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Well-appointed air-conditioned suites allowing residents to host visiting friends and family with resort-level hospitality.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 2: WFH Ecosystem */}
            {activeAmenityHub === "wfh" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Briefcase size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Dedicated Business Center</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Professionally equipped co-working environment with high-speed fiber internet, printing stations, and ergonomic workstations.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Private Conference Halls</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Acoustically insulated conference meeting rooms with AV presentation setups tailored for IT, finance, and corporate executives.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Coffee size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Curated Library &amp; Reading Cafe</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Peaceful reading lounge with curated book collections, daily periodicals, and an attached coffee station for remote work.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 3: Recreation & Lakefront */}
            {activeAmenityHub === "recreation" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Waves size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Swimming Pools &amp; Deck</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Temperature-controlled indoor pool and expansive outdoor resort pool with poolside sun loungers and separate toddler splash pool.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Trees size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Lakefront Viewing Deck</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Elevated viewing gazebo and wooden deck offering sunset views over nearby water bodies and lush Gandipet greenery.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Droplets size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Water Features &amp; Bridges</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Central landscaped water fountains with pedestrian footbridges weaving across themed gardens and evening promenades.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Tv size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Mini-Theatre &amp; Open-Air Theatre</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Acoustically engineered indoor mini-cinema hall for private screenings, paired with an open-air amphitheater for live performances.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Activity size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Skating Rink &amp; Basketball</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Full-size outdoor basketball court, roller-skating rink for youngsters, and dedicated jogging/cycling tracks across the campus.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Dedicated Pet Walking Park</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Fenced green lawn designed specifically for dog walking, pet exercise, and pet-friendly community interactions.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 4: Infrastructure & Parking */}
            {activeAmenityHub === "infra" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Car size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">4 Basement Parking Levels</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Quad-level underground parking network keeping the ground realm vehicle-free and ensuring ample covered bays for all residents.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">EV Charging Infrastructure</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated EV charging ports in basement parking zones supporting sustainable green mobility for modern electric cars.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Flame size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">100% DG Backup &amp; Piped Gas</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Uninterrupted 100% power backup for apartments and common amenities, paired with centralized prepaid piped gas supply.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. LOCATION ADVANTAGE & STRATEGIC TRANSIT */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="location">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Direct ORR Gateway
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Location Advantage &amp; Connectivity
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Located in Narsingi Village, Gandipet Mandal, directly adjacent to the Nehru Outer Ring Road (ORR). Seamlessly connecting residents to Financial District tech offices, Kokapet Neopolis, and RGIA Airport.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Distance Card 1: Employment Hubs */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                    <Briefcase size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Major Employment Hubs</h3>
                    <p className="text-xs text-slate-400">Quick access to West Hyderabad IT</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Financial District (Nanakramguda)</span>
                    <span className="font-bold text-amber-400">5 – 10 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Kokapet Neopolis</span>
                    <span className="font-bold text-amber-400">10 – 12 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Gachibowli Junction</span>
                    <span className="font-bold text-amber-400">10 – 15 Mins</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">HITEC City / Cyber Towers</span>
                    <span className="font-bold text-amber-400">~20 Mins</span>
                  </div>
                </div>
              </div>

              {/* Distance Card 2: Airport & Transit */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Compass size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Express Highway &amp; Airport</h3>
                    <p className="text-xs text-slate-400">Direct Nehru ORR access</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Nehru Outer Ring Road (ORR)</span>
                    <span className="font-bold text-emerald-400">Direct Entry / 0 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">RGIA International Airport</span>
                    <span className="font-bold text-emerald-400">25 – 30 Mins (Signal-free)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Planned Metro Extension Corridor</span>
                    <span className="font-bold text-emerald-400">Nearby Proposed Route</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Gandipet / Osman Sagar Lake</span>
                    <span className="font-bold text-emerald-400">~8 Mins</span>
                  </div>
                </div>
              </div>

              {/* Distance Card 3: Social Infrastructure */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
                    <Award size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Schools &amp; Super-Specialty</h3>
                    <p className="text-xs text-slate-400">Top-rated institutions in vicinity</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Phoenix Greens School of Learning</span>
                    <span className="font-bold text-sky-400">~5 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Oakridge International School</span>
                    <span className="font-bold text-sky-400">~10 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Continental Hospitals</span>
                    <span className="font-bold text-sky-400">~8 Mins</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">AIG Hospitals Gachibowli</span>
                    <span className="font-bold text-sky-400">~15 Mins</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500">
              *Approximate drive times are based on normal conditions via Google Maps and may vary during peak office hours.
            </p>
          </div>
        </section>

        {/* 6. BUYER CONSIDERATIONS & DUE DILIGENCE */}
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

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Unbeatable ORR &amp; Financial District Access: </strong>
                      Direct frontage on Nehru ORR allows professionals to reach Nanakramguda IT offices in under 10 minutes without navigating congested inner neighborhood lanes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Striking 45-Storey Architectural Skyline: </strong>
                      Modern glass-and-concrete elevation with staggered wavering heights creates immense landmark prestige along the Narsingi–Gachibowli corridor.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Spacious Apartment Floor Plans: </strong>
                      Above-average super built-up sizes (2 BHK from 1,250 sft, 3 BHK up to 2,220 sft, and 4 BHK up to 3,330 sft) offer noticeably larger rooms than newer compact high-rise formats.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Rare Twin-Clubhouse Ecosystem: </strong>
                      Two independent clubhouses ensure sports, dining, and co-working facilities are distributed efficiently without common weekend crowding.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Considerations Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-950/30 to-[#120F16] border border-amber-500/30 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <AlertTriangle size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Points to Evaluate &amp; Verify</h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">High Population Density: </strong>
                      Housing approximately 2,160 to 2,199 units across 12.3 acres translates to a dense ~180+ homes per acre. Buyers should expect high elevator traffic and peak-hour vehicle movement.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Internal Tower Spacing &amp; Privacy: </strong>
                      Due to the close orientation of certain inward-facing towers, lower-floor units may experience limited direct sunlight and facing-balcony sightlines.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Adjacent Surroundings: </strong>
                      Community feedback points out that select outward-facing wings overlook an adjacent local burial ground. Checking the exact tower orientation and floor view before booking is essential.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Tower-Specific Delivery Timelines: </strong>
                      With phased handovers extending through August 2028, delivery schedules vary significantly across blocks. Always verify the specific RERA milestone date for your target tower.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Personalized Unit Matcher Box */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 p-6 sm:p-8 text-center space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                Tailored Advisory Assistance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Need Help Selecting the Right Tower, Floor &amp; Facing?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Connect with our senior property advisors to receive an unbiased floor-by-floor view analysis, exact tower delivery milestones, all-inclusive cost sheets, and comparative evaluations against nearby Kokapet and Narsingi luxury projects.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#enquiry-section"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all"
                >
                  Request Tower View Analysis
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-1.5"
                >
                  <MessageCircle size={15} /> Consult on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="faqs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Buyer FAQ Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-300">
                Essential questions answered about Vasavi Atlantis Narsingi.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 px-5 data-[state=open]:border-amber-500/40 transition-colors"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-white hover:text-amber-400 py-4 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-4 pt-1">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 8. ADVISORY CTA BANNER */}
        <section className="py-16 bg-gradient-to-b from-[#090D16] to-[#0D1424] text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Building2 size={28} />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Explore Vasavi Atlantis?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Connect with Naani Projects for verified inventory availability, tower-specific floor layouts, price negotiations, and private on-site walkthroughs. Free consultation for homebuyers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle size={16} /> WhatsApp Project Advisor
              </a>
              <a
                href={`tel:${PROJECT_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-colors"
              >
                <Phone size={15} /> Call {PROJECT_CONFIG.phoneDisplay}
              </a>
            </div>
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
            <span className="text-[10px] font-bold mt-0.5">Check Units</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default VasaviAtlantisPage;
