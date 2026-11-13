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
  ExternalLink,
  ChevronDown,
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
  name: "Aparna Serenity",
  developer: "Aparna Constructions",
  location: "Kompally, Hyderabad",
  address: "Brundavan Colony, Off NH-44, Kompally, Hyderabad, Telangana 500014",
  startingPrice: "₹1.10 Cr Onwards",
  priceRange: "₹1.10 Cr – ₹2.50 Cr+",
  marketRate: "Around ₹9,650+ per sq. ft. (varying by tower, floor, facing & upgrades)",
  reraNumber: "P02200002386",
  reraDisplay: "TS RERA Registered: P02200002386",
  landArea: "22.45 Acres Expansive Township",
  towers: "22 Mid-Rise Towers (G+9 Floors)",
  totalUnits: "1,499 Luxury Residences",
  openSpace: "80% Open Green Landscape",
  possession: "Ready to Move (Thriving & Occupied Community)",
  canonicalUrl: "https://www.naani.in/projects/aparna-serenity",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Aparna Serenity",
};

interface ConfigPlan {
  id: string;
  bhk: string;
  category: "2bhk" | "3bhk" | "4bhk";
  sizeRange: string;
  priceRange: string;
  parking: string;
  idealFor: string;
  highlights: string[];
}

const CONFIG_PLANS: ConfigPlan[] = [
  {
    id: "2-bhk",
    bhk: "2 BHK Luxury Residences",
    category: "2bhk",
    sizeRange: "1,335 – 1,525 Sq.Ft.",
    priceRange: "₹1.10 Cr – ₹1.36 Cr",
    parking: "2 Covered Cellar Slots",
    idealFor: "Young couples, nuclear families, and smart rental investors",
    highlights: [
      "Zero common walls for complete acoustic privacy",
      "Three-side open ventilation with continuous natural light",
      "Spacious living and dining layout with private balcony",
      "High rental yield with immediate occupancy readiness",
    ],
  },
  {
    id: "2.5-3-bhk",
    bhk: "2.5 & 3 BHK Premium Residences",
    category: "3bhk",
    sizeRange: "1,525 – 2,230 Sq.Ft.",
    priceRange: "₹1.48 Cr – ₹2.25 Cr",
    parking: "2 Covered Cellar Slots",
    idealFor: "Growing families seeking home-office flexibility or servant quarters",
    highlights: [
      "Select larger 3 BHK layouts include separate maid/utility room",
      "Generous master bedroom suite with attached dressing space",
      "Wide balconies overlooking central themed landscape gardens",
      "Versatile study/hobby room option in 2.5 BHK units",
    ],
  },
  {
    id: "4-bhk",
    bhk: "4 BHK Grand Presidential Residences",
    category: "4bhk",
    sizeRange: "2,639 – 2,730 Sq.Ft.",
    priceRange: "₹2.20 Cr – ₹2.50 Cr+",
    parking: "3 Covered Cellar Slots",
    idealFor: "Multi-generational families wanting villa-like space with gated security",
    highlights: [
      "Expansive formal and family living halls with dual balconies",
      "Dedicated maid room with separate washroom and entry",
      "3 reserved cellar parking bays for multi-vehicle convenience",
      "Corner and East/West facing units with panoramic township views",
    ],
  },
];

const FAQS = [
  {
    q: "What is Aparna Serenity and who is the developer?",
    a: "Aparna Serenity is a 22.45-acre ready-to-move-in luxury residential township crafted by Aparna Constructions in Brundavan Colony, Kompally, North Hyderabad. The project features mid-rise, low-density living across 22 towers (G+9 floors) with 1,499 apartments and resort-scale amenities.",
  },
  {
    q: "Is Aparna Serenity TS RERA registered?",
    a: "Yes, Aparna Serenity is fully registered under Telangana RERA with TS RERA Registration No. P02200002386.",
  },
  {
    q: "What is the current possession status of Aparna Serenity?",
    a: "The project is completely Ready to Move. It is already a thriving, occupied neighborhood with active residents, select primary inventory from the developer, and premium resale units available.",
  },
  {
    q: "What configurations and sizes are available at Aparna Serenity?",
    a: "Aparna Serenity offers 2, 2.5, 3, and 4 BHK apartments ranging from 1,335 sq. ft. to 2,730 sq. ft. Larger 3 and 4 BHK layouts also feature a separate maid/utility room.",
  },
  {
    q: "What is the price range and indicative per sq. ft. rate?",
    a: "Indicative market values range from ₹1.10 Cr – ₹1.36 Cr for 2 BHK, ₹1.48 Cr – ₹2.25 Cr for 2.5 & 3 BHK, and ₹2.20 Cr – ₹2.50 Cr+ for 4 BHK. Prevailing market rates track around ₹9,650+ per sq. ft., varying based on tower position, floor rise, unit facing, and interior upgrades.",
  },
  {
    q: "What makes the construction and architectural design unique?",
    a: "Aparna Serenity is designed with Zero Common Walls—each home is architecturally isolated for superior acoustic privacy and three-side cross-ventilation. It is constructed using monolithic aluminum Mivan formwork technology with seismic-resistant RCC framing, and offers 80% open green landscaped grounds.",
  },
  {
    q: "What are the lifestyle and sports amenities available?",
    a: "Amenities are split into two dedicated hubs: Club Serenity (34,700 sq. ft.) featuring a multicuisine restaurant, cafe, preview theater, spa & jacuzzi, library, banquet hall, and guest suites; and a Dedicated Sports Complex (15,590 sq. ft.) with all-weather indoor pool, gym, squash, badminton, tennis, basketball, soccer turf, crèche, pet park, and an on-site commercial plaza.",
  },
  {
    q: "What are the monthly maintenance charges?",
    a: "Monthly maintenance runs at approximately ₹4.50 per sq. ft., covering 24/7 security, dual-hub clubhouse operations, lush 80% landscape upkeep, water treatment, and infrastructure management.",
  },
  {
    q: "How can I check available resale units or schedule a site visit?",
    a: "You can schedule a site visit or request current availability of verified resale and builder units by contacting Naani Projects at +91 94939 43946 or clicking the WhatsApp CTA button.",
  },
];

export const AparnaSerenityPage = () => {
  const formId = useId();
  const [activeConfigTab, setActiveConfigTab] = useState<"all" | "2bhk" | "3bhk" | "4bhk">("all");
  const [activeAmenityHub, setActiveAmenityHub] = useState<"club" | "sports" | "daily">("club");

  // Lead Form State
  const [formData, setFormData] = useState({ fullName: "", mobileNumber: "", consent: false });
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
      lookingFor: "3 BHK",
      capturedAt: new Date().toISOString(),
    };

    const context: PageContext = {
      propertyName: PROJECT_CONFIG.name,
      projectName: PROJECT_CONFIG.name,
      builderName: PROJECT_CONFIG.developer,
      location: "Kompally, Hyderabad",
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
      setFormError("Unable to submit at this moment. Please connect with us directly on WhatsApp or call.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const waLeadMsg = encodeURIComponent(
    `Hi Naani Projects, I'm interested in Aparna Serenity (Kompally, Hyderabad). Please share verified resale inventory, pricing breakdown, and site visit availability.`
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
          { "@type": "ListItem", "position": 3, "name": "Kompally", "item": "https://www.naani.in/projects-in-kompally" },
          { "@type": "ListItem", "position": 4, "name": "Aparna Serenity", "item": PROJECT_CONFIG.canonicalUrl },
        ],
      },
      {
        "@type": "ApartmentComplex",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#project`,
        name: "Aparna Serenity",
        url: PROJECT_CONFIG.canonicalUrl,
        description:
          "Aparna Serenity by Aparna Constructions in Brundavan Colony, Kompally, North Hyderabad. Spread across 22.45 acres with 22 mid-rise towers (G+9), 80% open greens, zero common walls, and dual-hub clubhouses.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Brundavan Colony, Off NH-44",
          addressLocality: "Kompally",
          addressRegion: "Telangana",
          postalCode: "500014",
          addressCountry: "IN",
        },
        telephone: PROJECT_CONFIG.phone,
        developer: {
          "@type": "Organization",
          name: "Aparna Constructions",
        },
      },
      {
        "@type": "RealEstateListing",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#listing`,
        name: "Aparna Serenity Kompally – Luxury Ready-to-Move Apartments",
        url: PROJECT_CONFIG.canonicalUrl,
        image: "https://www.naani.in/og-aparna-serenity.jpg",
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
        title="Aparna Serenity Kompally Hyderabad | Ready to Move 2, 3 & 4 BHK Flats"
        description="Aparna Serenity in Kompally, Hyderabad by Aparna Constructions. 22.45-acre luxury township with 80% open space, zero common walls, dual clubhouses & ready-to-move homes. Get price sheet & resale list."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        keywords="Aparna Serenity, Aparna Serenity Kompally, Aparna Constructions Kompally, Ready to move flats in Kompally, 3 BHK flats Kompally, Luxury apartments North Hyderabad"
        ogImage="https://www.naani.in/og-aparna-serenity.jpg"
        structuredData={structuredData}
      />

      <div className="bg-[#090D16] text-slate-100 min-h-screen selection:bg-amber-500/20 selection:text-amber-300 pb-24 md:pb-16 font-sans">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-slate-800/80 bg-[#090D16]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
              <span className="text-slate-400">Kompally</span>
              <ChevronRight size={13} className="text-slate-600 flex-shrink-0" />
              <span className="text-amber-400 font-semibold truncate">Aparna Serenity</span>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready to Move
              </span>
              <span className="text-slate-500 text-[11px]">TS RERA: P02200002386</span>
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
                  <span>Aparna Constructions · Kompally, North Hyderabad</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Aparna Serenity <br />
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                    Resort-Scale Mid-Rise Living
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                  An expansive 22.45-acre ready-to-move luxury gated community in Brundavan Colony, Kompally. Combining low-density G+9 mid-rise architecture across 22 towers with 80% open landscaped greenery, zero common walls, and dual resort clubhouses.
                </p>

                {/* 6 Key Highlights Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Township Scale</p>
                    <p className="text-base font-extrabold text-white mt-0.5">22.45 Acres</p>
                    <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">22 Towers · G+9 Mid-Rise</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Open Green Space</p>
                    <p className="text-base font-extrabold text-white mt-0.5">80% Open</p>
                    <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Urban forest & gardens</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Acoustic Privacy</p>
                    <p className="text-base font-extrabold text-white mt-0.5">Zero Common Walls</p>
                    <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">Isolated 3-side light</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Dual Clubhouses</p>
                    <p className="text-base font-extrabold text-white mt-0.5">50,290 Sq.Ft.</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Club Serenity + Sports Complex</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Possession Status</p>
                    <p className="text-base font-extrabold text-emerald-400 mt-0.5">Ready to Move</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Occupied community</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">RERA Verified</p>
                    <p className="text-base font-extrabold text-white mt-0.5">P02200002386</p>
                    <p className="text-[10px] text-amber-400/90 font-medium mt-0.5">Telangana RERA approved</p>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#enquiry-section"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                  >
                    Request Availability & Resale Rates <ArrowRight size={16} />
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
                      Request Pricing & Floor Plans
                    </h3>
                    <p className="text-xs text-slate-400">
                      Receive verified resale inventory, floor layouts, and current market valuations directly on WhatsApp.
                    </p>
                  </div>

                  {formSuccess ? (
                    <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                        <Check size={20} />
                      </div>
                      <h4 className="text-sm font-bold text-white">Enquiry Registered</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Thank you! Our Kompally property advisor will share verified Aparna Serenity inventory details and layout plans with you shortly.
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

                      {/* Consent Checkbox (UNCHECKED by default) */}
                      <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1 leading-snug">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-400"
                        />
                        <span>
                          I agree to be contacted via WhatsApp/Call regarding Aparna Serenity Kompally property details.
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

        {/* 2. VISION, DESIGN & CONSTRUCTION PHILOSOPHY */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Architectural Distinction
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Vision, Design & Engineering Philosophy
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Unlike dense high-rise clusters, Aparna Serenity was engineered around low-density openness, acoustical isolation, and long-term structural durability.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Zero Common Walls</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Every apartment is architecturally isolated from neighboring units—sharing no common walls. This provides superior acoustic privacy, uninterrupted natural daylight, and true three-side cross-ventilation.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Trees size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">80% Open Green Space</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Roughly four-fifths of the 22.45-acre masterplan is dedicated to lush themed gardens, an urban forest sanctuary, sculpture plazas, water bodies, and vehicle-free pedestrian walkways.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mivan Formwork Tech</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Built using monolithic aluminum formwork (Mivan) with seismic-resistant RCC framing. This delivers ultra-smooth wall finishes, enhanced tensile strength, and superior protection against dampness and seepage.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Droplets size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Self-Sustaining Utilities</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Equipped with a dedicated domestic Water Softening Plant (WSP), Sewage Treatment Plant (STP) for recycled flushing and gardening, rainwater harvesting pits, and centralized prepaid piped LPG gas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. RESIDENCES & CONFIGURATIONS */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="configurations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Floor Plans & Sizing
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Residences & Unit Configurations
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Thoughtfully proportioned 2, 2.5, 3, and 4 BHK luxury residences ranging from 1,335 sq. ft. to 2,730 sq. ft., complete with vitrified flooring, UPVC double-glazed windows, and 2 to 3 cellar parking spaces.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              {[
                { id: "all", label: "All Configurations" },
                { id: "2bhk", label: "2 BHK (1,335 – 1,525 Sft)" },
                { id: "3bhk", label: "2.5 & 3 BHK (1,525 – 2,230 Sft)" },
                { id: "4bhk", label: "4 BHK (2,639 – 2,730 Sft)" },
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
                        <span className="text-slate-400 font-medium">Indicative Value:</span>
                        <span className="text-amber-400 font-bold text-sm">{plan.priceRange}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Cellar Parking:</span>
                        <span className="text-slate-200 font-semibold">{plan.parking}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Ideal Buyer Profile:
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                        "{plan.idealFor}"
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {plan.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800">
                    <a
                      href="#enquiry-section"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors"
                    >
                      Check Available Units in this Size <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Pricing & Sizing Reference Table */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden mb-6">
              <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Building2 size={16} className="text-amber-400" /> Indicative Market Valuation Matrix
                </h4>
                <span className="text-[11px] text-slate-400">Subject to floor rise & upgrades</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">Configuration</th>
                      <th className="py-3 px-4 font-bold">Super Area (Sq.Ft.)</th>
                      <th className="py-3 px-4 font-bold">Indicative Price Range</th>
                      <th className="py-3 px-4 font-bold">Cellar Parking</th>
                      <th className="py-3 px-4 font-bold">Ideal Profile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">2 BHK</td>
                      <td className="py-3.5 px-4">1,335 – 1,525 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹1.10 Cr – ₹1.36 Cr</td>
                      <td className="py-3.5 px-4">2 Covered Slots</td>
                      <td className="py-3.5 px-4 text-slate-300">Young couples, nuclear families, rental investors</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">2.5 & 3 BHK</td>
                      <td className="py-3.5 px-4">1,525 – 2,230 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹1.48 Cr – ₹2.25 Cr</td>
                      <td className="py-3.5 px-4">2 Covered Slots</td>
                      <td className="py-3.5 px-4 text-slate-300">Growing families (maid room in select layouts)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">4 BHK</td>
                      <td className="py-3.5 px-4">2,639 – 2,730 sq. ft.</td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">₹2.20 Cr – ₹2.50 Cr+</td>
                      <td className="py-3.5 px-4">3 Covered Slots</td>
                      <td className="py-3.5 px-4 text-slate-300">Multi-generational families wanting villa space</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market Rate Guidance Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
              <Info size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-300">Market Rate Guidance: </span>
                Prevailing market rates currently track around <strong className="text-white">₹9,650+ per sq. ft.</strong>, varying depending on tower position, floor height, East/West facing preference, and interior wood-work upgrades. Verified resale and developer unit lists can be requested directly from our advisory team.
              </div>
            </div>
          </div>
        </section>

        {/* 4. DUAL-HUB LIFESTYLE & AMENITIES */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="amenities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Resort Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Dual-Hub Lifestyle & Amenities
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Rather than crowding facilities into a single block, Aparna Serenity thoughtfully separates social leisure from active sports across two dedicated grand hubs totaling over 50,290 sq. ft.
              </p>
            </div>

            {/* Hub Selector Buttons */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto">
                <button
                  onClick={() => setActiveAmenityHub("club")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "club"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Coffee size={16} /> Club Serenity (34,700 Sft)
                </button>
                <button
                  onClick={() => setActiveAmenityHub("sports")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "sports"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Dumbbell size={16} /> Sports Complex (15,590 Sft)
                </button>
                <button
                  onClick={() => setActiveAmenityHub("daily")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeAmenityHub === "daily"
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Building2 size={16} /> Everyday Family Spaces
                </button>
              </div>
            </div>

            {/* Hub 1 Content */}
            {activeAmenityHub === "club" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Coffee size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Multicuisine Restaurant & Cafe</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    A grand dining restaurant with an outdoor terrace cafeteria for daily family dining and social brunches.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Tv size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Private Mini Preview Theater</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Acoustically treated cinema hall with plush seating for private movie screenings and community entertainment.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Waves size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Spa & Jacuzzi Sanctuary</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated rejuvenation center with sauna, steam bath, and massage therapy rooms for residents.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Grand Banquet & Event Hall</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Spacious air-conditioned party hall with kitchen setup for family celebrations, birthdays, and festivals.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Briefcase size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Business Lounge & Library</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Quiet co-working workstations with high-speed WiFi, conference facilities, and a curated book library.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Home size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Air-Conditioned Guest Suites</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Hotel-grade furnished guest rooms for visiting friends, relatives, and outstation family members.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 2 Content */}
            {activeAmenityHub === "sports" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Waves size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">All-Weather Indoor Pool & Kids Pool</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Temperature-controlled all-season swimming pool with sun deck, poolside showers, and safe splash pool for kids.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Dumbbell size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Modern Fitness Gym & Yoga Studio</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    State-of-the-art cardio and strength equipment paired with a wooden-floored yoga and aerobics hall.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Squash & Indoor Badminton Courts</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Standard indoor squash court and multiple wooden badminton courts for competitive and casual play.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Award size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Outdoor Tennis & Basketball Court</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Floodlit synthetic outdoor tennis court and half-basketball court for evening matches.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Soccer Turf & Skating Rink</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated synthetic football mini-turf, cricket practice nets, and smooth roller skating rink for youngsters.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                    <Trees size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Jogging & Cycling Tracks</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Dedicated rubberized jogging track and paved perimeter cycling circuit weaving through tree groves.
                  </p>
                </div>
              </div>
            )}

            {/* Hub 3 Content */}
            {activeAmenityHub === "daily" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Building2 size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Commercial Plaza & Supermarket</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    On-site convenience store, daily grocery, pharmacy, clinic, and 24/7 bank ATM right inside the gates.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Users size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Crèche & Daycare Center</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Professionally managed on-campus childcare center offering safe after-school care for working parents.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Trees size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Dedicated Pet Park</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Fenced off-leash green lawn with agility obstacles designed specifically for dog walking and pet recreation.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Open-Air Amphitheater</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Tiered green amphitheater hosting community festivals, music concerts, and weekend cultural gatherings.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <Home size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Children's Adventure Playgrounds</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Age-segregated play structures with soft rubber flooring, sandpits, swings, and climbing frames.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white">Multi-Tier Security & CCTV</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Boom barriers, RFID vehicle entry, solar fencing, and 24/7 central surveillance across all 22 towers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. LOCATION ADVANTAGE & CONNECTIVITY */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="location">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Strategic Transit Hub
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Location Advantage & Connectivity
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Nestled in Brundavan Colony just off NH-44, Aparna Serenity benefits from Kompally's established social infrastructure, top schools, and direct Outer Ring Road access.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Distance Card 1 */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                    <Compass size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Highway & Express Transit</h3>
                    <p className="text-xs text-slate-400">Effortless North-West commute</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Suchitra Junction</span>
                    <span className="font-bold text-amber-400">~5 Mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Outer Ring Road (Exit 6)</span>
                    <span className="font-bold text-amber-400">5.0 km (10 Mins)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Bolarum Railway Station</span>
                    <span className="font-bold text-amber-400">2.8 km (8 Mins)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Secunderabad Railway Station</span>
                    <span className="font-bold text-amber-400">12.0 km (25 Mins)</span>
                  </div>
                </div>
              </div>

              {/* Distance Card 2 */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MapPin size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Walkable Daily Essentials</h3>
                    <p className="text-xs text-slate-400">Under 500 meters from gate</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">DMart Kompally</span>
                    <span className="font-bold text-emerald-400">&lt; 500 Meters (Walk)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">St. Ann's High School</span>
                    <span className="font-bold text-emerald-400">&lt; 500 Meters (Walk)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Renova Hospitals</span>
                    <span className="font-bold text-emerald-400">1.3 km (4 Mins)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Decathlon Kompally</span>
                    <span className="font-bold text-emerald-400">2.5 km (6 Mins)</span>
                  </div>
                </div>
              </div>

              {/* Distance Card 3 */}
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
                    <Award size={22} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Premier Education & Health</h3>
                    <p className="text-xs text-slate-400">Top institutions within 10 mins</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Sadhu Vaswani Int. School</span>
                    <span className="font-bold text-sky-400">4.1 km (8 Mins)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Delhi International School</span>
                    <span className="font-bold text-sky-400">3.5 km (7 Mins)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-300">Siva Sivani Public School</span>
                    <span className="font-bold text-sky-400">3.8 km (8 Mins)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">KIMS Hospitals Secunderabad</span>
                    <span className="font-bold text-sky-400">11.5 km (22 Mins)</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500">
              *Drive times and distances are approximate based on standard Google Maps routes and vary during peak traffic hours.
            </p>
          </div>
        </section>

        {/* 6. BUYER ADVISORY: WHY BUYERS CHOOSE IT & PRACTICAL CONSIDERATIONS */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Transparent Homebuyer Advisory
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Why Buyers Choose It (And What to Keep in Mind)
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Naani Projects provides unbiased, practical real estate guidance so you make fully informed decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Strengths Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-[#0A121A] border border-emerald-500/30 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Key Strengths & Advantages</h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Ready-to-Move Certainty: </strong>
                      Zero construction delays, zero GST liability, and immediate possession. You can physically walk into your chosen home before making a buying commitment.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Aparna Brand Trust: </strong>
                      Backed by Aparna Constructions' 30+ year reputation for flawless execution, clear legal titles, and professional in-house property maintenance.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Lush Low-Rise Ambiance: </strong>
                      G+9 mid-rise architecture across 22.45 acres with 80% open greens provides an expansive community feel without the overcrowding of 50-storey high-rises.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Solid Rental Demand: </strong>
                      Consistent rental yields fueled by doctors from nearby hospitals, faculty from premier institutions, and corporate executives commuting to Secunderabad and West Hyderabad via ORR.
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
                  <h3 className="text-xl font-bold text-white">Practical Considerations</h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Monthly Maintenance: </strong>
                      Monthly maintenance runs at approximately ₹4.50 per sq. ft., reflecting the cost of sustaining 22.45 acres of landscaped grounds, 24/7 security, dual clubhouses, and water treatment plants.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Pay-Per-Use Sports Facilities: </strong>
                      While community amenities are broadly accessible, select specialized premium sports facilities (such as floodlit squash/tennis courts and guest rooms) operate on a nominal pay-per-use structure.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Peak Summer Water Management: </strong>
                      During peak summer months (April–May), the society actively supplements borewell groundwater with external water tankers to ensure uninterrupted 24/7 supply.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Resale vs Primary Inventory: </strong>
                      As an occupied township, availability consists primarily of resale units alongside select builder stock. Pricing varies based on flat facing and interior wood-work condition.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
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
                Essential questions answered about Aparna Serenity Kompally.
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
              Ready to Explore Aparna Serenity?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Connect with Naani Projects for verified available resale inventory, price negotiations, and private on-site township walkthroughs. Free consultation for homebuyers.
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

export default AparnaSerenityPage;
