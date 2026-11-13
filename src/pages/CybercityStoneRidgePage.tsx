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
  Mountain,
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
  name: "Cybercity Stone Ridge",
  developer: "Cybercity Builders & Developers Pvt. Ltd.",
  architect: "Hafeez Contractor",
  landscapeArchitect: "CPG Asia",
  location: "Moosapet, Hyderabad",
  address: "Green Hills Road, Sevalal Nagar, Moosapet, Near HITEC City, Hyderabad, Telangana 500018",
  startingPrice: "₹1.08 Cr Onwards",
  priceRange: "₹1.08 Cr – ₹3.45 Cr",
  pricePerSqFt: "₹8,300 – ₹9,100 per sq. ft. (Base rate + statutory charges)",
  reraNumbers: "P02200009747 & P02200009748",
  reraDisplay: "TG RERA Registered: P02200009747 & P02200009748",
  landArea: "12.33 Acres Gated Township",
  towers: "6 Residential Towers (25 & 27 Floors)",
  totalUnits: "1,424 Luxury Residences",
  openSpace: "70%+ Open Spaces with Vehicle-Free Podium Deck",
  clubhouseSize: "66,000 Sq.Ft. (6-Level Lifestyle Hub)",
  launchDate: "Launched 2025",
  possession: "May 2030 – September 2030",
  canonicalUrl: "https://www.naani.in/projects/cybercity-stone-ridge",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Cybercity Stone Ridge",
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
    sizeRange: "~1,300 Sq.Ft.",
    priceRange: "₹1.08 Cr – ₹1.21 Cr",
    keyHighlights: "Compact luxury layout with living/dining area, balcony, and utility space.",
    features: [
      "Vastu-compliant East/West orientation with abundant natural illumination",
      "Dedicated utility balcony adjoining the kitchen for seamless laundry & storage",
      "Spacious living and dining space opening to a scenic sit-out balcony",
      "High rental demand driven by IT professionals working in HITEC City and Madhapur",
    ],
  },
  {
    id: "3-bhk",
    bhk: "3 BHK Premium Residences",
    category: "3bhk",
    sizeRange: "1,650 – 2,760 Sq.Ft.",
    priceRange: "₹1.60 Cr – ₹2.50 Cr",
    keyHighlights: "Multiple variants including large formats with dedicated puja corners and dressers.",
    features: [
      "Multiple layout variants ranging from smart family living to extra-large presidential suites",
      "Dedicated puja room and private dressing areas in master bedrooms",
      "Expansive three-side open layouts maximizing cross-ventilation and outdoor vistas",
      "Generous balconies overlooking the 1.5-acre Central Park and rock gardens",
    ],
  },
  {
    id: "4-bhk",
    bhk: "4 BHK Grand Presidential Residences",
    category: "4bhk",
    sizeRange: "3,170 – 3,805 Sq.Ft.",
    priceRange: "₹2.73 Cr – ₹3.45 Cr",
    keyHighlights: "Expansive corner residences designed for joint families with wide decks.",
    features: [
      "Prime corner placement with panoramic 270-degree views of the cityscape and greens",
      "Palatial dual living rooms (formal reception + private family lounge)",
      "Wide entertainment decks and maid/utility suite with independent washroom",
      "Reserved basement parking bays ensuring effortless vehicle accommodation",
    ],
  },
];

const FAQS = [
  {
    q: "What is Cybercity Stone Ridge and who is the developer?",
    a: "Cybercity Stone Ridge is an under-construction luxury high-rise gated township developed by Cybercity Builders & Developers Pvt. Ltd., spread across 12.33 acres on Green Hills Road in Moosapet, near HITEC City, Hyderabad. It features 6 towers (25 and 27 floors) with 1,424 apartments.",
  },
  {
    q: "Who designed Cybercity Stone Ridge?",
    a: "The project's master plan and architecture are designed by renowned architect Hafeez Contractor, with landscape architecture curated by international landscape consultancy CPG Asia.",
  },
  {
    q: "Is Cybercity Stone Ridge TG RERA registered?",
    a: "Yes, the project is registered with the Telangana Real Estate Regulatory Authority under registration numbers TG RERA P02200009747 and P02200009748.",
  },
  {
    q: "What is the expected possession timeline?",
    a: "The project was launched in 2025 and has a registered possession and handover timeline scheduled between May 2030 and September 2030.",
  },
  {
    q: "What configurations and sizes are available?",
    a: "Cybercity Stone Ridge offers 2 BHK (~1,300 sq.ft.), 3 BHK (1,650 – 2,760 sq.ft.), and 4 BHK (3,170 – 3,805 sq.ft.) luxury residences with Vastu-compliant layouts.",
  },
  {
    q: "What is the pricing and per sq. ft. rate?",
    a: "Estimated base prices range between ₹8,300 and ₹9,100 per sq. ft. Unit costs track from ₹1.08 Cr – ₹1.21 Cr for 2 BHK, ₹1.60 Cr – ₹2.50 Cr for 3 BHK, and ₹2.73 Cr – ₹3.45 Cr for 4 BHK, subject to floor rise, preferred location charges (PLC), and statutory fees.",
  },
  {
    q: "What amenities are included in Club Stone Ridge?",
    a: "Club Stone Ridge is a massive 66,000 sq. ft., 6-level lifestyle hub featuring a spa & salon, modern gymnasium, yoga/aerobics studios, indoor badminton & squash courts, co-working lounges, guest rooms, and a rooftop party deck. The campus also includes an Olympic-length 50m lap pool, a 1.5-acre Central Park, a 1.2-acre Rock Adventure Zone, and 70+ sports and leisure amenities.",
  },
  {
    q: "How close is the project to HITEC City and metro connectivity?",
    a: "Cybercity Stone Ridge is situated roughly 10 minutes from Cyber Towers and 15–20 minutes from Raheja Mindspace and Sattva Knowledge City. It is within 3 to 5 minutes of Moosapet and Balanagar Metro stations (Red Line) and the HITEC City MMTS railway station.",
  },
];

export const CybercityStoneRidgePage = () => {
  const formId = useId();
  const [activeConfigTab, setActiveConfigTab] = useState<"all" | "2bhk" | "3bhk" | "4bhk">("all");
  const [activeAmenityHub, setActiveAmenityHub] = useState<"club" | "nature" | "sports" | "daily">("club");

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
      location: "Moosapet, Hyderabad",
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
    `Hi Naani Projects, I'm interested in Cybercity Stone Ridge (Green Hills Road, Moosapet). Please share current pricing sheets, floor plan PDFs, and construction milestone details.`
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
          { "@type": "ListItem", "position": 3, "name": "Moosapet", "item": "https://www.naani.in/projects-in-moosapet" },
          { "@type": "ListItem", "position": 4, "name": "Cybercity Stone Ridge", "item": PROJECT_CONFIG.canonicalUrl },
        ],
      },
      {
        "@type": "ApartmentComplex",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#project`,
        name: "Cybercity Stone Ridge",
        url: PROJECT_CONFIG.canonicalUrl,
        description:
          "Cybercity Stone Ridge by Cybercity Builders on Green Hills Road, Moosapet, near HITEC City, Hyderabad. 12.33 acres with 6 towers (25-27 floors), 70%+ open space, vehicle-free podium deck, and 66,000 sq.ft. 6-level clubhouse.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Green Hills Road, Sevalal Nagar",
          addressLocality: "Moosapet",
          addressRegion: "Telangana",
          postalCode: "500018",
          addressCountry: "IN",
        },
        telephone: PROJECT_CONFIG.phone,
        developer: {
          "@type": "Organization",
          name: "Cybercity Builders & Developers Pvt. Ltd.",
        },
      },
      {
        "@type": "RealEstateListing",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#listing`,
        name: "Cybercity Stone Ridge Moosapet – Luxury 2, 3 & 4 BHK High-Rise Apartments",
        url: PROJECT_CONFIG.canonicalUrl,
        image: "https://www.naani.in/og-cybercity-stone-ridge.jpg",
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
        title="Cybercity Stone Ridge Moosapet Hyderabad | Luxury 2, 3 & 4 BHK Apartments"
        description="Cybercity Stone Ridge on Green Hills Road, Moosapet, near HITEC City, Hyderabad. 12.33 acres, 6 towers (25-27 floors), 66,000 sft clubhouse, 70%+ open spaces by Hafeez Contractor. Get pricing & floor plans."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        keywords="Cybercity Stone Ridge, Cybercity Stone Ridge Moosapet, Stone Ridge Cybercity, Cybercity Builders Hyderabad, Flats in Moosapet, Luxury apartments near HITEC City, Green Hills Road apartments"
        ogImage="https://www.naani.in/og-cybercity-stone-ridge.jpg"
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
              <span className="text-slate-400">Moosapet</span>
              <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
              <span className="text-amber-400 font-semibold truncate">Cybercity Stone Ridge</span>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[11px]">
                <Clock size={12} className="text-amber-400" /> Possession: May–Sept 2030
              </span>
              <span className="text-slate-500 text-[11px]">TG RERA: P02200009747 &amp; 9748</span>
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
                  <span>Architecture by Hafeez Contractor · Landscaping by CPG Asia</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Cybercity Stone Ridge <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                    Luxury High-Rise in Moosapet
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                  An expansive 12.33-acre luxury gated community developed by Cybercity Builders on Green Hills Road, Moosapet. Positioned just 10 minutes from HITEC City, featuring 6 soaring towers (25 and 27 floors), 70%+ open green spaces with a vehicle-free podium deck, and a colossal 66,000 sq. ft. 6-level clubhouse.
                </p>

                {/* 6 Key Highlights Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Township Scale</p>
                    <p className="text-base font-extrabold text-white mt-0.5">12.33 Acres</p>
                    <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">6 Towers · 25 &amp; 27 Floors</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Open Footprint</p>
                    <p className="text-base font-extrabold text-white mt-0.5">70%+ Open</p>
                    <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Vehicle-free podium deck</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Units</p>
                    <p className="text-base font-extrabold text-white mt-0.5">1,424 Flats</p>
                    <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">2, 3 &amp; 4 BHK formats</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Club Stone Ridge</p>
                    <p className="text-base font-extrabold text-white mt-0.5">66,000 Sq.Ft.</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">6-level lifestyle clubhouse</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">RERA Verified</p>
                    <p className="text-base font-extrabold text-white mt-0.5">P02200009747</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">&amp; P02200009748</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Possession Target</p>
                    <p className="text-base font-extrabold text-amber-400 mt-0.5">2030</p>
                    <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Handover May–Sept 2030</p>
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
                      Receive verified tower floor layouts, cost sheets, and construction milestone schedules directly on WhatsApp.
                    </p>
                  </div>

                  {formSuccess ? (
                    <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                        <Check size={20} />
                      </div>
                      <h4 className="text-sm font-bold text-white">Enquiry Registered</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Thank you! Our Moosapet &amp; HITEC City property advisor will share verified Cybercity Stone Ridge inventory details, unit cost sheets, and floor plans with you shortly.
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
                          placeholder="e.g. Rahul Sharma"
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
                          <option value="2 BHK">2 BHK (~1,300 Sq.Ft.)</option>
                          <option value="3 BHK">3 BHK (1,650 – 2,760 Sq.Ft.)</option>
                          <option value="4 BHK">4 BHK (3,170 – 3,805 Sq.Ft.)</option>
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
                          I agree to be contacted via WhatsApp/Call regarding Cybercity Stone Ridge project details and pricing.
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
        <section className="py-16 lg:py-24 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Master Plan &amp; Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Project Overview &amp; Architectural Pillars
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Conceived by master architect Hafeez Contractor and international landscape designers CPG Asia, Stone Ridge merges urban luxury with preserved natural rock topography.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Master Plan &amp; Scale</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Designed by renowned architect Hafeez Contractor with landscaping by CPG Asia, dedicating over 70% of the 12.33-acre campus to open spaces, manicured gardens, courtyards, and pedestrian avenues.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Vehicle-Free Podium Deck</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Incorporates an elevated vehicle-free podium deck at ground level to keep pedestrian zones tranquil and child-safe, seamlessly routing resident and visitor vehicles to multiple subterranean basement parking levels.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Calendar size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">RERA &amp; Clear Timelines</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Registered under TG RERA numbers P02200009747 and P02200009748. Launched in 2025 with structured construction phases targeting handover between May and September 2030.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sun size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">IGBC Green Sustainability</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Developed by an IGBC-certified developer, integrating solar-powered entrance roofing, extensive rainwater harvesting recharge pits, and preserved natural rock formations native to the terrain.
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
                Floor Plans &amp; Unit Options
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Configurations &amp; Pricing Breakdown
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Vastu-compliant layouts featuring distinct living and dining zones, utility balconies, and dedicated puja spaces. Prevailing base rates track between ₹8,300 and ₹9,100 per sq. ft. plus statutory charges.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              {[
                { id: "all", label: "All Configurations" },
                { id: "2bhk", label: "2 BHK (~1,300 Sft)" },
                { id: "3bhk", label: "3 BHK (1,650 – 2,760 Sft)" },
                { id: "4bhk", label: "4 BHK (3,170 – 3,805 Sft)" },
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
                <span className="text-[11px] text-slate-400">Base rate ~₹8,300 – ₹9,100/sq.ft.</span>
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
                      <td className="py-3.5 px-4">~1,300 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹1.08 Cr – ₹1.21 Cr</td>
                      <td className="py-3.5 px-4 text-slate-300">Compact luxury layout with living/dining area, balcony, and utility space.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">3 BHK</td>
                      <td className="py-3.5 px-4">1,650 – 2,760 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹1.60 Cr – ₹2.50 Cr</td>
                      <td className="py-3.5 px-4 text-slate-300">Multiple variants including large formats with dedicated puja corners and dressers.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">4 BHK</td>
                      <td className="py-3.5 px-4">3,170 – 3,805 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹2.73 Cr – ₹3.45 Cr</td>
                      <td className="py-3.5 px-4 text-slate-300">Expansive corner residences designed for joint families with wide decks.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pricing Advisory Guidance Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
              <Info size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-300">Statutory &amp; Additional Costs Note: </span>
                Listed base price ranges reflect prevailing launch rates on property portals (₹8,300 to ₹9,100 per sq. ft.). Final all-inclusive costs are subject to floor rise charges, preferred location premiums (PLC), car parking slots, clubhouse infrastructure fees, and applicable GST/registration duties. Connect with our advisory team for an exact unit-level cost sheet.
              </div>
            </div>
          </div>
        </section>

        {/* 4. CLUBHOUSE & 70+ LIFESTYLE AMENITIES */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="amenities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Resort-Scale Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Clubhouse &amp; 70+ Lifestyle Amenities
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Anchored by a grand 66,000 sq. ft. 6-level central clubhouse, surrounded by a 1.5-acre Central Park and a 1.2-acre Rock Adventure Zone with boulder trails.
              </p>
            </div>

            {/* Hub Selector Buttons */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto">
                <button
                  onClick={() => setActiveAmenityHub("club")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "club"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Building2 size={16} /> Club Stone Ridge (66,000 Sft)
                </button>
                <button
                  onClick={() => setActiveAmenityHub("nature")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "nature"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Trees size={16} /> Nature &amp; Rock Adventure
                </button>
                <button
                  onClick={() => setActiveAmenityHub("sports")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "sports"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Dumbbell size={16} /> Sports &amp; Fitness
                </button>
                <button
                  onClick={() => setActiveAmenityHub("daily")}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "daily"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Coffee size={16} /> Daily Conveniences
                </button>
              </div>
            </div>

            {/* Hub 1: Club Stone Ridge */}
            {activeAmenityHub === "club" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Luxury Spa &amp; Salon</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Full-service wellness sanctuary featuring steam, sauna, massage suites, and professional grooming salons for men and women.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Dumbbell size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Modern Gymnasium &amp; Studios</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    State-of-the-art strength and cardio training equipment paired with dedicated wooden-floored yoga and aerobics studios.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Activity size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Squash &amp; Badminton Courts</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Glass-back indoor squash court and standard wooden badminton courts for competitive play and daily recreation.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Briefcase size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Co-Working Lounges &amp; Library</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Quiet work-from-home suites with high-speed internet, private pods, conference meeting rooms, and a reading library.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Home size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Air-Conditioned Guest Rooms</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Hotel-grade furnished suites allowing residents to host visiting family and outstation guests in complete comfort.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Rooftop Party Deck &amp; Banquets</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Elevated open-air rooftop celebration deck with sunset views, complemented by spacious indoor banquet and party halls.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 2: Nature & Rock Adventure */}
            {activeAmenityHub === "nature" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Trees size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">1.5-Acre Central Park</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Massive green expanse featuring manicured lawns, botanical groves, flowering shrubs, and shaded family seating pergolas.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Mountain size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">1.2-Acre Rock Adventure Zone</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Preserves natural granite terrain with a dedicated boulder-climbing trail, natural rocky amphitheater, and adventure challenges.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Eight Themed Gardens</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Includes relaxing hammock gardens, tranquil reflective water gardens, aroma gardens, and sensory groves for meditation.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Dedicated Pet Park</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Secure, fenced pet-friendly play lawn equipped with agility structures, dog-wash stations, and pet-owner benches.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Compass size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Tree-Lined Walking Avenues</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Paved pedestrian promenade weaving through dense canopy trees, completely isolated from motorized vehicle circulation.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Sun size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Outdoor Meditation Pavilion</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Zen-inspired open meditation decks overlooking serene reflective pools and rock gardens for morning yoga.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 3: Sports & Fitness */}
            {activeAmenityHub === "sports" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Waves size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">50-Meter Lap Pool &amp; Splash Pools</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Olympic-length 50-meter lap pool for serious swimmers, complemented by dedicated family recreation and toddler splash pools.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Award size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Tennis &amp; Pickleball Courts</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Floodlit synthetic tennis court and dedicated fast-growing pickleball court for all-age sports excitement.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Basketball &amp; Sand Volleyball</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Full-size basketball court alongside an authentic sand volleyball court for beach-sport community tournaments.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Activity size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Cricket Nets &amp; Skate Park</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Enclosed cricket batting nets with bowling pitch, plus a purpose-built skate park for rollerblading and skateboarding kids.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Compass size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Jogging &amp; Cycling Tracks</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated rubberized jogging track and smooth peripheral cycling track designed safely away from traffic on the podium level.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                    <Dumbbell size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Outdoor Open-Air Calisthenics</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Cross-fit and bodyweight training stations nestled within shaded garden pockets for natural outdoor workouts.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 4: Daily Conveniences */}
            {activeAmenityHub === "daily" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Building2 size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">On-Site Supermarket &amp; Retail</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Convenient on-campus grocery store, fresh produce counter, and daily essentials retail outlet inside the gates.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Pharmacy &amp; First-Aid Clinic</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    On-site medical store and consultation room providing immediate prescription support and medical care for residents.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Crèche &amp; Daycare Center</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Professionally supervised early learning and childcare center designed for working parents in the tech corridor.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Home size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Banquet &amp; Multipurpose Halls</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Grand air-conditioned function spaces with food preparation areas for private family celebrations and society events.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">EV Charging Infrastructure</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated electric vehicle charging bays across multi-level basements supporting eco-friendly daily commutes.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">24/7 Smart Security &amp; RFID</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Automated RFID vehicle access control, visitor verification apps, perimeter sensor fencing, and comprehensive CCTV monitoring.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. LOCATION ADVANTAGE & STRATEGIC CONNECTIVITY */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="location">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Strategic Transit Corridor
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Location Advantage &amp; Connectivity
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Situated on Green Hills Road in Sevalal Nagar (Moosapet), perfectly bridged between the mature residential hub of Kukatpally and the high-growth IT corridors of Madhapur and HITEC City.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Distance Card 1: IT Hubs */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                    <Briefcase size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Major IT &amp; Tech Hubs</h3>
                    <p className="text-xs text-slate-400">Direct HITEC City arterial access</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Cyber Towers (HITEC City)</span>
                    <span className="font-bold text-amber-400">~10 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Raheja Mindspace IT Park</span>
                    <span className="font-bold text-amber-400">15 – 20 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Sattva Knowledge City</span>
                    <span className="font-bold text-amber-400">15 – 20 Mins</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Financial District &amp; Gachibowli</span>
                    <span className="font-bold text-amber-400">~25 Mins</span>
                  </div>
                </div>
              </div>

              {/* Distance Card 2: Transit */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Compass size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Rapid Transit &amp; Rail</h3>
                    <p className="text-xs text-slate-400">Red Line Metro &amp; MMTS connectivity</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Moosapet Metro Station</span>
                    <span className="font-bold text-emerald-400">3 – 5 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Balanagar Metro Station</span>
                    <span className="font-bold text-emerald-400">3 – 5 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">HITEC City MMTS Station</span>
                    <span className="font-bold text-emerald-400">~5 Mins</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Secunderabad Railway Station</span>
                    <span className="font-bold text-emerald-400">~25 Mins</span>
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
                    <h3 className="text-base font-bold text-white">Retail &amp; Healthcare</h3>
                    <p className="text-xs text-slate-400">Malls, schools &amp; super-specialty care</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Nexus Hyderabad Mall</span>
                    <span className="font-bold text-sky-400">~8 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Ashoka One Mall</span>
                    <span className="font-bold text-sky-400">~6 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">KIMS &amp; Yashoda Hospitals</span>
                    <span className="font-bold text-sky-400">10 – 15 Mins</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Arbor International School</span>
                    <span className="font-bold text-sky-400">~10 Mins</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500">
              *Approximate drive times are based on typical conditions via Google Maps and may vary during peak morning/evening traffic.
            </p>
          </div>
        </section>

        {/* 6. BUYER CONSIDERATIONS & COMMUNITY FEEDBACK */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Transparent Homebuyer Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Buyer Considerations &amp; Community Feedback
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Naani Projects provides honest, balanced property insights so you evaluate both community strengths and practical trade-offs before investing.
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
                      <strong className="text-white">Low Tower Density on 12.33 Acres: </strong>
                      Housing just 6 residential towers across a 12.33-acre land parcel ensures expansive breathing room, unlike cluttered high-density developments with 15–20 crowded towers.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Generous Floor Sizes: </strong>
                      Spacious unit footprints (2 BHK at ~1,300 sft, 3 BHK up to 2,760 sft, and 4 BHK up to 3,805 sft) offer significantly larger rooms compared to newer compact city apartments.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Pedigree Architecture &amp; Landscaping: </strong>
                      Designed by legendary architect Hafeez Contractor with landscape architecture by CPG Asia, featuring a 1.5-acre Central Park and a 1.2-acre natural Rock Adventure Zone.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">66,000 Sq.Ft. Lifestyle Clubhouse: </strong>
                      The six-level Club Stone Ridge delivers true resort infrastructure right outside your doorstep, catering to wellness, sports, dining, and co-working.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Considerations Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-950/30 to-[#120F16] border border-amber-500/30 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Info size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Points to Evaluate &amp; Verify</h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Inward-Facing Tower Orientation: </strong>
                      Property analysts note that inward-facing apartments on lower floors may experience reduced natural sunlight and closer sightlines toward facing balconies compared to outward-facing units.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Green Hills Road Approach Traffic: </strong>
                      Community feedback on local forums highlights peak-hour road congestion around the Kukatpally and Moosapet junctions. Visiting the site during rush hours (9 AM – 11 AM or 6 PM – 8 PM) is strongly recommended.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Developer Maintenance History: </strong>
                      Some buyers on online discussion boards have raised questions regarding maintenance operations in earlier Cybercity townships. Inspecting operational Cybercity projects (like Cybercity Rainbow Vistas) helps establish real-world expectations.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">2030 Delivery Horizon: </strong>
                      With possession targeted between May and September 2030, buyers should align construction-linked payment milestones with their long-term financial planning.
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
                Looking for a Customized Unit Match &amp; All-Inclusive Cost Breakdown?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Please share your preferred apartment size (<strong>2, 3, or 4 BHK</strong>), budget range, and whether you are purchasing for <strong>end-use</strong> or <strong>investment</strong> so our senior advisors can provide a tailored floor-plan comparison, all-inclusive cost estimation, and nearby project alternatives.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#enquiry-section"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all"
                >
                  Share My Preferences
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-1.5"
                >
                  <MessageCircle size={15} /> Discuss on WhatsApp
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
                Key questions answered about Cybercity Stone Ridge Moosapet.
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
              Ready to Explore Cybercity Stone Ridge?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Connect with Naani Projects for verified inventory availability, tower floor plans, payment schedule guidance, and private on-site walkthroughs. Free consultation for homebuyers.
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

export default CybercityStoneRidgePage;
