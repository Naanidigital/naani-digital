import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import {
  MessageCircle,
  Phone,
  MapPin,
  Building2,
  Layers,
  Maximize2,
  Star,
  ChevronDown,
  ChevronUp,
  Home,
  Zap,
  Shield,
  Leaf,
  Award,
  Sparkles,
  Compass,
  CheckCircle2,
  Info,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react";

import trilightHero from "@/assets/rise-with-9/rise-with-9-trilight-hero.jpg";
import elevationNight from "@/assets/rise-with-9/rise-with-9-elevation-night.jpg";
import waterfall18thHour from "@/assets/rise-with-9/rise-with-9-18th-hour-waterfall.jpg";
import clubhouse9thHouse from "@/assets/rise-with-9/rise-with-9-clubhouse-9th-house.jpg";
import goldLogo9 from "@/assets/rise-with-9/rise-with-9-logo.jpg";

const PROJECT_NAME = "Rise With 9";
const RERA_NO = "P02400009942";
const CONTACT_PHONE = "9705080909";

const CTAButton = ({
  text,
  className = "",
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-105 ${className}`}
  >
    <Sparkles size={18} />
    <span>{text}</span>
  </button>
);

export default function RiseWith9Page() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("Direct Click");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openLeadModal = (source: string) => {
    setPopupSource(source);
    setPopupOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const canonicalUrl = "https://www.naani.in/projects/rise-with-9";
  const seoTitle = "Rise With 9 Neopolis Kokapet Hyderabad | Luxury 3 & 4 BHK";
  const seoDescription =
    "Explore Rise With 9 in Neopolis, Kokapet, Hyderabad. Discover its large-format luxury residences, double-height living, sky amenities, clubhouse, connectivity and RERA details.";

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${canonicalUrl}#listing`,
        url: canonicalUrl,
        name: "Rise With 9 Neopolis Kokapet Hyderabad",
        description: seoDescription,
        category: "Ultra-Luxury Residential Apartments",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot No. 9, Neopolis, Kokapet",
          addressLocality: "Kokapet",
          addressRegion: "Telangana",
          postalCode: "500075",
          addressCountry: "IN",
        },
        offeredBy: {
          "@type": "RealEstateAgent",
          name: "Naani Projects",
          url: "https://www.naani.in/",
          telephone: `+91${CONTACT_PHONE}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.naani.in/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: "https://www.naani.in/projects",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Hyderabad",
            item: "https://www.naani.in/hyderabad",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Kokapet",
            item: "https://www.naani.in/projects-in-kokapet",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Rise With 9",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Rise With 9?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rise With 9 – The Trilight Residences is an ultra-luxury residential high-rise project featuring 2 landmark towers (9 North and 9 South) with expansive large-format 3 & 4 BHK residences, double-height living spaces, and sky-level amenities in Neopolis, Kokapet, Hyderabad.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Rise With 9 located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rise With 9 is located at Plot No. 9, Neopolis Layout, Kokapet, Hyderabad, Telangana – 500075, just 200 metres from ORR Neopolis Exit 1A.",
            },
          },
          {
            "@type": "Question",
            name: "Who is developing Rise With 9?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rise With 9 is promoted and developed by De Blueoak and P Mangatram Properties LLP.",
            },
          },
          {
            "@type": "Question",
            name: "What is the RERA number of Rise With 9?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rise With 9 is registered under Telangana RERA bearing registration number P02400009942.",
            },
          },
          {
            "@type": "Question",
            name: "What configurations are available at Rise With 9?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The project offers large-format 3 BHK (3,303 to 3,888 sq.ft.) and 4 BHK (4,333 to 5,777 sq.ft.) residences.",
            },
          },
          {
            "@type": "Question",
            name: "Does Rise With 9 offer double-height living spaces?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Rise With 9 features approximately 22+ ft double-height living room volumes in select layouts, giving a villa-like architectural grandness within a high-rise residence.",
            },
          },
          {
            "@type": "Question",
            name: "What is the height of the arrival lobby?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rise With 9 features an impressive approximately 33-ft triple-height arrival lobby that sets a grand hospitality-style entrance experience.",
            },
          },
          {
            "@type": "Question",
            name: "What amenities are available at Rise With 9?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Amenities include 'The 9th House' (52,187 sq.ft. clubhouse across 6 levels), 'The 18th Hour' (Level 1 Sky Deck at 593.5 ft height with infinity pool & waterfall), grand arrival plaza, wellness spa, sports courts, and smart home automation provisions.",
            },
          },
          {
            "@type": "Question",
            name: "How close is Rise With 9 to the ORR and Financial District?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rise With 9 is located approximately 200 metres from ORR Neopolis Exit 1A, placing it within 5-10 minutes of Financial District, Nanakramguda, and Gachibowli.",
            },
          },
          {
            "@type": "Question",
            name: "How can I request price details or schedule a site visit for Rise With 9?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Current pricing, floor plans, and site visit schedules are available by contacting Naani Projects directly at 9705080909.",
            },
          },
        ],
      },
    ],
  };

  const faqs = [
    {
      q: "What is Rise With 9?",
      a: "Rise With 9 – The Trilight Residences is an ultra-luxury high-rise residential development located in Neopolis, Kokapet, Hyderabad. It features two architectural towers (9 North and 9 South) with large-format 3 & 4 BHK residences, double-height living spaces, and elevated sky amenities.",
    },
    {
      q: "Where is Rise With 9 located?",
      a: "The project is situated at Plot No. 9, Neopolis Layout, Kokapet, Hyderabad, Telangana – 500075. It is positioned adjacent to ORR Neopolis Exit 1A, offering seamless access to Financial District, Gachibowli, and Rajiv Gandhi International Airport.",
    },
    {
      q: "Who is developing Rise With 9?",
      a: "Rise With 9 is developed by De Blueoak and P Mangatram Properties LLP, partnering with leading international consultants including RWDI (Wind Engineering), Amit Meerpuri Design Studio (Interiors), Integral Design (Landscape), and TÜV SÜD (Vertical Transportation).",
    },
    {
      q: "What is the RERA registration number of Rise With 9?",
      a: "The project is registered with Telangana RERA under registration number P02400009942.",
    },
    {
      q: "What configurations and sizes are available?",
      a: "Rise With 9 offers large-format residences ranging from 3,303 sq.ft. to 5,777 sq.ft. Options include 3 BHK (3,303 – 3,888 sq.ft.), 4 BHK (4,333 – 4,999 sq.ft.), and premium 4 BHK format homes up to 5,777 sq.ft.",
    },
    {
      q: "How many towers and floors are in Rise With 9?",
      a: "Rise With 9 comprises 2 iconic high-rise towers (9 North and 9 South) standing 56+ storeys high across a 3.6-acre gated site.",
    },
    {
      q: "What makes Rise With 9 different from conventional luxury apartments?",
      a: "Key differentiators include 22+ ft double-height living room volumes, a 33-ft triple-height arrival lobby, 'The 18th Hour' elevated sky deck with a cascading waterfall at 593.5 ft height, 'The 9th House' 52,187 sq.ft. clubhouse, limited residences per floor, and a prime Neopolis location.",
    },
    {
      q: "Does Rise With 9 offer double-height living spaces?",
      a: "Yes, select 3 & 4 BHK residences feature ~22+ ft double-height living room ceilings, enhancing light, airiness, and vertical proportions.",
    },
    {
      q: "What is the height of the arrival lobby?",
      a: "The project features a ~33-ft triple-height entrance arrival lobby designed for a hospitality-inspired entrance experience.",
    },
    {
      q: "What amenities are available at Rise With 9?",
      a: "Amenities include 'The 9th House' 52,187 sq.ft. clubhouse across 6 levels, 'The 18th Hour' sky deck at 593.5 ft with waterfall, infinity pool, fitness studio, wellness spa, indoor games, children's play areas, multi-level parking, and EV charging provisions.",
    },
    {
      q: "Does Rise With 9 have sky-level amenities?",
      a: "Yes, 'The 18th Hour' elevated sky deck at 593.5 ft height provides a rooftop sky lounge, infinity deck, waterfall element, and panoramic views of Neopolis and Gandipet lake.",
    },
    {
      q: "How close is Rise With 9 to the ORR?",
      a: "Rise With 9 is located approximately 200 metres from ORR Neopolis Exit 1A.",
    },
    {
      q: "How is Rise With 9 connected to Financial District and Gachibowli?",
      a: "It is located within ~5 minutes of Financial District (GAR InfoBahn 2.9 km, Continental Hospitals 5 km, Microsoft Campus 5.8 km) and approximately 10-15 minutes from Gachibowli via ORR and Neopolis access roads.",
    },
    {
      q: "What is the expected possession timeline?",
      a: "The expected possession schedule is May 2030, subject to verification against the latest RERA commitments and project documentation.",
    },
    {
      q: "Is Rise With 9 suitable for end-use?",
      a: "Rise With 9 is designed specifically for ultra-luxury end-users seeking large-format homes, high-rise views, privacy, and an address in Neopolis Kokapet.",
    },
    {
      q: "How can I request price details or schedule a site visit?",
      a: "You can request updated price details, floor plan brochures, or schedule a site visit by calling or messaging Naani Projects directly at 9705080909.",
    },
  ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        ogImage="https://www.naani.in/rise-with-9/rise-with-9-trilight-hero.jpg"
        ogType="website"
        jsonLd={schemaJson}
      />

      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 pb-20 md:pb-0">
        <ProjectsHeader />

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0B101D] via-[#090D16] to-[#0D1426]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 flex-wrap">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <span>/</span>
              <Link to="/hyderabad" className="hover:text-amber-400 transition-colors">Hyderabad</Link>
              <span>/</span>
              <Link to="/projects-in-kokapet" className="hover:text-amber-400 transition-colors">Kokapet</Link>
              <span>/</span>
              <span className="text-amber-400 font-medium">Rise With 9</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Text Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm px-4 py-1.5 rounded-full font-semibold">
                  <img src={goldLogo9} alt="Rise With 9 Logo" className="w-5 h-5 object-contain" />
                  <span>The Trilight Residences • Neopolis Kokapet</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Rise With 9 Neopolis, Kokapet, Hyderabad – <span className="text-amber-400">Ultra-Luxury Apartments</span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  A distinctive high-rise residential address designed around expansive living, privacy, double-height spaces, elevated sky amenities, and the connectivity advantage of Neopolis.
                </p>

                {/* Key Quick Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Towers & Height</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">2 Towers (56+ Floors)</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Residences</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">3 & 4 BHK Formats</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Size Range</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">3,303 – 5,777 Sq.Ft.</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">TG RERA No.</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{RERA_NO}</div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <CTAButton
                    text="Request Price Details"
                    onClick={() => openLeadModal("Hero CTA - Request Price Details")}
                  />
                  <button
                    onClick={() => openLeadModal("Hero CTA - Schedule Site Visit")}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700 transition-all hover:scale-105"
                  >
                    <Calendar size={18} className="text-amber-400" />
                    Schedule a Site Visit
                  </button>
                  <a
                    href={`https://wa.me/91${CONTACT_PHONE}?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Rise%20With%209%20Neopolis%20Kokapet.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3.5 rounded-xl transition-all"
                  >
                    <MessageCircle size={18} />
                    WhatsApp {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              {/* Right Image Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#0F1629] group">
                  <img
                    src={trilightHero}
                    alt="Rise With 9 Neopolis Kokapet Hyderabad Exterior Architecture"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B101D]/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Promoter: De Blueoak & P Mangatram</span>
                      <span className="text-amber-400 font-bold">Neopolis, Kokapet</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">Plot No. 9, Neopolis Layout (3.6 Acres)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Project Facts Grid */}
        <section className="py-12 bg-[#0B101D] border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { label: "Land Area", val: "3.6 Acres", sub: "Gated luxury site" },
                { label: "Towers", val: "2 Towers", sub: "9 North & 9 South" },
                { label: "Configurations", val: "3 & 4 BHK", sub: "Large-format units" },
                { label: "Size Range", val: "3,303–5,777", sub: "Sq.Ft. saleable" },
                { label: "Tower Height", val: "56+ Storeys", sub: "High-rise living" },
                { label: "Arrival Lobby", val: "33 Ft", sub: "Triple-height lobby" },
                { label: "Living Ceiling", val: "22+ Ft", sub: "Double-height living" },
                { label: "RERA Reg.", val: RERA_NO, sub: "TG RERA Approved" },
              ].map((fact, idx) => (
                <div key={idx} className="bg-[#0D1426] border border-slate-800/80 p-4 rounded-xl text-center space-y-1 hover:border-amber-500/30 transition-colors">
                  <div className="text-xs text-slate-400 font-medium">{fact.label}</div>
                  <div className="text-base font-extrabold text-amber-400">{fact.val}</div>
                  <div className="text-[11px] text-slate-500">{fact.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Overview & Editorial Narrative */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Building2 size={16} />
                <span>Project Narrative</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ultra-Luxury Living Redefined at Rise With 9 Neopolis
              </h2>

              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Rise With 9 is positioned as an ultra-luxury residential landmark in Neopolis, Kokapet—one of West Hyderabad's most prominent high-rise corridors. Designed around expansive living, privacy, and architectural grandness, the project emphasizes large-format homes rather than maximizing unit density within the towers.
                </p>
                <p>
                  Rising across a 3.6-acre premium land parcel, the project comprises two signature high-rise towers: <strong>9 North</strong> and <strong>9 South</strong>. Each tower is crafted with limited residences per floor, expansive glass facades, corner-oriented layouts, and double-height living room volumes that bring villa-like proportions to elevated living.
                </p>
                <p>
                  From the dramatic ~33-ft triple-height entrance lobby to the elevated sky-level recreational decks over 590 feet in the air, Rise With 9 blends spatial scale with refined urban privacy in the heart of Neopolis.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <CTAButton
                  text="Get Project Details"
                  onClick={() => openLeadModal("Overview CTA - Get Details")}
                />
                <button
                  onClick={() => openLeadModal("Overview CTA - Request Floor Plans")}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-700 transition-all"
                >
                  <FileText size={18} className="text-amber-400" />
                  Get Latest Floor Plans
                </button>
              </div>
            </div>

            {/* Right Card / Highlights */}
            <div className="lg:col-span-5 bg-[#0D1426] border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-amber-500/20 pb-3">
                Key Architectural Highlights
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>Landmark Location:</strong> Plot No. 9, Neopolis Layout, Kokapet—200m from ORR Exit 1A.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>Double-Height Living:</strong> ~22+ ft living room ceilings in select layouts for dramatic vertical volume.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>Triple-Height Arrival:</strong> ~33-ft lobby volume delivering a hospitality-style arrival experience.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>The 9th House Clubhouse:</strong> 52,187 sq.ft. multi-level clubhouse across 6 curated levels.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>The 18th Hour Sky Deck:</strong> Elevated sky recreation deck at 593.5 ft height featuring a cascading waterfall element.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: What Makes Rise With 9 Different? */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-semibold">
                <Sparkles size={14} />
                <span>Distinctive Features</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                What Makes Rise With 9 Different?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Six architectural and lifestyle pillars that differentiate Rise With 9 from conventional high-rise residential projects in Kokapet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Large-Format Residences",
                  desc: "Ranging from 3,303 sq.ft. up to 5,777 sq.ft., Rise With 9 prioritizes substantially larger floor formats, family-oriented layouts, expansive bedrooms, and villa-inspired privacy.",
                  icon: Maximize2,
                },
                {
                  title: "2. Double-Height Living (~22+ Ft)",
                  desc: "Select 3 & 4 BHK layouts feature dramatic ~22+ ft double-height living room volumes, creating visual grandeur, enhanced natural light, and superior indoor vertical proportions.",
                  icon: Layers,
                },
                {
                  title: "3. Triple-Height Arrival (~33 Ft)",
                  desc: "An impressive ~33-ft triple-height arrival lobby sets the tone for your daily arrival, combining marble finishes, hospitality lounges, and secure concierge access.",
                  icon: Building2,
                },
                {
                  title: "4. Limited Residences Per Floor",
                  desc: "Designed to provide privacy and acoustic separation, each floor features a limited number of corner-oriented homes with wide balconies and minimal shared walls.",
                  icon: Shield,
                },
                {
                  title: "5. Elevated Sky-Level Lifestyle",
                  desc: "Features 'The 18th Hour' elevated sky deck at 593.5 ft height with infinity pool, cascading waterfall, sky lounge, and panoramic views over Neopolis and Gandipet lake.",
                  icon: Sparkles,
                },
                {
                  title: "6. Prime Neopolis Address",
                  desc: "Positioned at Plot No. 9, Neopolis Kokapet—just 200m from ORR Exit 1A—placing Financial District, Gachibowli, top international schools, and hospitals minutes away.",
                  icon: MapPin,
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-amber-500/40 transition-all hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Residences & Floor Plans */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Residences at Rise With 9
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Explore the published configuration sizes and layout options across 9 North and 9 South towers.
            </p>
          </div>

          {/* Configuration Table */}
          <div className="bg-[#0D1426] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-6 p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-[#0B101D] text-amber-400 font-bold uppercase text-xs">
                  <tr>
                    <th className="p-4 border-b border-slate-800">Tower</th>
                    <th className="p-4 border-b border-slate-800">Home Variant</th>
                    <th className="p-4 border-b border-slate-800">Approx. Size</th>
                    <th className="p-4 border-b border-slate-800">Facing / Architectural Feature</th>
                    <th className="p-4 border-b border-slate-800 text-right">Floor Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="p-4 font-semibold text-white">9 NORTH</td>
                    <td className="p-4">9N Home-1 (3 BHK)</td>
                    <td className="p-4 text-amber-400 font-bold">3,888 Sq.Ft.</td>
                    <td className="p-4">West facing residence</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9N Home-1")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">9 NORTH</td>
                    <td className="p-4">9N Home-2 (3 BHK)</td>
                    <td className="p-4 text-amber-400 font-bold">3,303 Sq.Ft.</td>
                    <td className="p-4">West facing residence</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9N Home-2")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">9 NORTH</td>
                    <td className="p-4">9N Home-3 (3 BHK)</td>
                    <td className="p-4 text-amber-400 font-bold">3,303 Sq.Ft.</td>
                    <td className="p-4">East facing residence</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9N Home-3")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">9 NORTH</td>
                    <td className="p-4">9N Home-4 (3/4 BHK)</td>
                    <td className="p-4 text-amber-400 font-bold">3,888 Sq.Ft.</td>
                    <td className="p-4">East facing, Double-Height Living (Odd/Even variants)</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9N Home-4")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">9 SOUTH</td>
                    <td className="p-4">9S Home-1 (4 BHK)</td>
                    <td className="p-4 text-amber-400 font-bold">4,333 Sq.Ft.</td>
                    <td className="p-4">West facing large residence</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9S Home-1")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">9 SOUTH</td>
                    <td className="p-4">9S Home-2 (4 BHK Large)</td>
                    <td className="p-4 text-amber-400 font-bold">4,999 Sq.Ft.</td>
                    <td className="p-4">East/West facing variants, Double-Height Living</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9S Home-2")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">9 SOUTH</td>
                    <td className="p-4">9S Home-3 (4 BHK Premium)</td>
                    <td className="p-4 text-amber-400 font-bold">5,777 Sq.Ft.</td>
                    <td className="p-4">Largest residence format, Double-Height Living</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9S Home-3")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">9 SOUTH</td>
                    <td className="p-4">9S Home-4 (4 BHK Large)</td>
                    <td className="p-4 text-amber-400 font-bold">4,999 Sq.Ft.</td>
                    <td className="p-4">Double-Height Living (Odd/Even variants)</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 9S Home-4")} className="text-xs font-bold text-amber-400 hover:underline">Get Layout</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Info size={14} className="text-amber-400" />
                <span>Sizes mentioned are indicative saleable area configurations. Contact Naani Projects for unit-wise floor plans and availability.</span>
              </div>
              <CTAButton
                text="Request Price Details"
                onClick={() => openLeadModal("Table CTA - Request Price")}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Official Architectural Visuals & Render Gallery */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-semibold">
                <Sparkles size={14} />
                <span>Official Project Gallery</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Rise With 9 Architectural Visuals & Renders
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                View official render imagery of the 56+ storey Trilight towers, 'The 18th Hour' sky deck, and 'The 9th House' clubhouse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1: Trilight Hero Elevation */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={trilightHero}
                  alt="The Trilight Rise With 9 Neopolis Kokapet Towers Architecture"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">The Trilight Towers (9 North & 9 South)</h3>
                  <p className="text-xs text-slate-400 mt-1">Dual 56+ storey high-rise towers rising across 3.6 acres in Neopolis Kokapet.</p>
                </div>
              </div>

              {/* Image 2: Night Elevation */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={elevationNight}
                  alt="Rise With 9 Neopolis Kokapet Night Elevation Skyline View"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400">Night Skyline Silhouette</h3>
                  <p className="text-xs text-slate-400 mt-1">Dazzling night illumination overlooking Neopolis expressways and Financial District.</p>
                </div>
              </div>

              {/* Image 3: The 18th Hour Sky Deck Waterfall */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={waterfall18thHour}
                  alt="Rise With 9 The 18th Hour Sky Deck Waterfall at 593.5 ft height"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">The 18th Hour (593.5 Ft Height)</h3>
                  <p className="text-xs text-slate-400 mt-1">Level 1 Sky Deck featuring infinity deck, sky pool, and cascading waterfall feature.</p>
                </div>
              </div>

              {/* Image 4: The 9th House Clubhouse */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all md:col-span-2 lg:col-span-2">
                <img
                  src={clubhouse9thHouse}
                  alt="Rise With 9 The 9th House Clubhouse 52,187 sqft across 6 levels"
                  className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400">The 9th House Clubhouse (52,187 Sq.Ft.)</h3>
                  <p className="text-xs text-slate-400 mt-1">6-level dedicated clubhouse featuring 44,795 sq.ft. covered & 7,329 sq.ft. uncovered leisure zones.</p>
                </div>
              </div>

              {/* Image 5: Golden Logo Card */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-center items-center p-6 text-center">
                <img
                  src={goldLogo9}
                  alt="Rise With 9 Brand Logo"
                  className="w-32 h-32 object-contain mb-3 group-hover:scale-110 transition-transform duration-500"
                />
                <h3 className="text-base font-bold text-white">Rise With 9</h3>
                <p className="text-xs text-slate-400 mt-1">The Trilight Residences • Neopolis Kokapet</p>
                <button onClick={() => openLeadModal("Gallery Logo CTA")} className="mt-4 text-xs font-bold text-amber-400 hover:underline">Download Brochure</button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Amenities Categories */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Rise With 9 Amenities & Sky-Level Lifestyle
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              A curated ecosystem combining a 52,187 sq.ft. clubhouse and an elevated sky deck over 590 ft high.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category 1: Grand Arrival & Lobby */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Building2 size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Grand Arrival & Triple-Height Lobby</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> ~33-ft triple-height entrance arrival lobby volume</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Marble-finished reception and concierge desk</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Air-conditioned guest lounges and seating bays</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Secure high-speed elevator banks with access control</li>
              </ul>
            </div>

            {/* Category 2: The 9th House Clubhouse */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Layers size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">The 9th House Clubhouse (52,187 Sq.Ft.)</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Spans across 6 curated levels (44,795 sq.ft. covered + 7,329 sq.ft. uncovered)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Multipurpose banqueting and private dining suites</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Indoor games lounge, billiards, card room, and reading library</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Business lounge and executive work suites</li>
              </ul>
            </div>

            {/* Category 3: The 18th Hour Sky Deck */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">The 18th Hour Sky Deck (593.5 Ft Height)</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Sky recreation level positioned over 590 feet above ground</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Signature cascading waterfall feature into sky pool</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Sky deck lounge with panoramic views of Neopolis and Gandipet lake</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Sunset viewing terrace and open-air seating</li>
              </ul>
            </div>

            {/* Category 4: Fitness, Wellness & Mobility */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Shield size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Fitness, Wellness & Mobility</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Fully equipped gymnasium with cardio & strength zones</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Yoga and aerobics studio</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Multi-level parking garage with EV charging provisions</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> 24x7 security monitoring with smart access controls</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Location & Micro Market */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-semibold">
                <MapPin size={14} />
                <span>Micro Market Focus</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Rise With 9 Location – Neopolis, Kokapet
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Positioned at Plot No. 9, Neopolis Layout, Kokapet—West Hyderabad's master-planned high-rise district.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Location Text */}
              <div className="lg:col-span-7 text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  <strong>Neopolis Kokapet</strong> has emerged as West Hyderabad's premier master-planned commercial and luxury residential corridor. Built with wide 36m & 45m sector roads, underground utility cabling, and direct access to the Outer Ring Road (ORR), Neopolis represents a modern urban infrastructure model.
                </p>
                <p>
                  Rise With 9 sits at <strong>Plot No. 9</strong>, just 200 metres from <strong>ORR Exit 1A</strong>. This strategic positioning provides effortless commute times to Financial District (GAR InfoBahn, WaveRock, Knowledge City), Gachibowli, Nanakramguda, and Rajiv Gandhi International Airport via the expressway.
                </p>
                <p>
                  Residents enjoy proximity to top international schools (Rockwell, Oakridge, Indus), multispecialty healthcare destinations (Continental Hospitals, Star Hospitals), 5-star hospitality (Sheraton, Hyatt, Marriott), and the natural landscape of Gandipet (Osman Sagar Lake).
                </p>
              </div>

              {/* Location Table */}
              <div className="lg:col-span-5 bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-amber-500/20 pb-3">
                  Published Distance References
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="py-2.5 font-medium text-white">Neopolis ORR Exit 1A</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~200 m</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Kokapet Lake</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~2.0 km</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">GAR InfoBahn</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~2.9 km</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Osman Sagar Lake (Gandipet)</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~3.0 km</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Kokapet One Shopping Mall</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~4.9 km</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Continental Hospitals</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~5.0 km</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Sheraton & Hyatt Hotels</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~5.0 km</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Microsoft Campus</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~5.8 km</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Star Hospitals Nanakramguda</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~6.0 km</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-slate-500 pt-1">
                  Distances are approximate based on published project location references. Driving times may vary based on route and traffic.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Project Development & Design Team */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Project Development & Design Consultants
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Rise With 9 brings together leading national and international engineering, architectural, structural, and design consultants.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { role: "Developer / Promoter", name: "De Blueoak & P Mangatram LLP" },
              { role: "Interior Design", name: "Amit Meerpuri Design Studio" },
              { role: "Project Contractor", name: "BSR Infra" },
              { role: "Structural Consultant", name: "STRUDCOM" },
              { role: "MEP Engineering", name: "SYNERGY" },
              { role: "Landscape Design", name: "Integral Design" },
              { role: "Façade & Lighting", name: "SAHVIA" },
              { role: "Parking Management", name: "CMDS" },
              { role: "Vertical Transportation", name: "TÜV SÜD South Asia" },
              { role: "Wind Engineering", name: "RWDI" },
              { role: "IGBC Green Consultant", name: "Green Inertia" },
              { role: "Architectural Management", name: "TQCERT Services Pvt. Ltd." },
            ].map((team, idx) => (
              <div key={idx} className="bg-[#0D1426] border border-slate-800 p-4 rounded-xl space-y-1 text-center hover:border-amber-500/30 transition-colors">
                <div className="text-xs text-amber-400 font-semibold">{team.role}</div>
                <div className="text-sm font-bold text-white">{team.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Objective Evaluation & Risk Perspective */}
        <section className="py-12 md:py-16 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Is Rise With 9 Worth Considering?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                An objective evaluation of key buyer factors and risk considerations for Rise With 9 in Neopolis Kokapet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm leading-relaxed">
              <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Key Strategic Advantages
                </h3>
                <ul className="space-y-2">
                  <li>• <strong>Neopolis Growth Corridor:</strong> Direct access to 200m ORR Exit 1A and West Hyderabad's IT/Financial hubs.</li>
                  <li>• <strong>Generous Spatial Volume:</strong> Large 3,303 to 5,777 sq.ft. formats with ~22+ ft double-height living ceilings.</li>
                  <li>• <strong>Elevated Sky Amenities:</strong> 'The 18th Hour' deck at 593.5 ft height providing rare high-rise views and recreation.</li>
                  <li>• <strong>Privacy Focus:</strong> Limited units per floor with corner-oriented floor plan layouts.</li>
                </ul>
              </div>

              <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                  <Info size={18} className="text-amber-400" />
                  Buyer Evaluation Checklist
                </h3>
                <ul className="space-y-2">
                  <li>• <strong>Construction Timeline:</strong> Project possession commitment is May 2030; evaluate construction progress milestones.</li>
                  <li>• <strong>Total Acquisition Outlay:</strong> Account for floor rise premiums, view charges, statutory taxes, and maintenance funds.</li>
                  <li>• <strong>Liquidity & Resale Horizon:</strong> Large-format luxury homes appeal to a niche end-user demographic; plan for appropriate holding periods.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0D1426] p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
              <p>
                <em>Summary Note:</em> Rise With 9 is well suited for buyers prioritizing ultra-luxury living spaces, double-height volumes, and a prime Neopolis Kokapet address. Prospective buyers are advised to independently verify inventory availability, pricing details, and RERA disclosures before making booking decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: RERA & Legal Information */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#0D1426] border border-emerald-500/30 p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Statutory RERA Compliance</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Rise With 9 Telangana RERA Registration: <span className="text-amber-400">{RERA_NO}</span>
                </h2>
              </div>
              <a
                href="https://rera.telangana.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30 font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
              >
                <span>Verify on TG RERA Portal</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              <strong>RERA Disclaimer:</strong> Rise With 9 is registered under Telangana RERA bearing registration number <strong>{RERA_NO}</strong>. Buyers are advised to independently verify the project's RERA registration, approved building plans, specifications, unit layouts, pricing breakup, payment schedules, possession commitments, applicable statutory charges, and legal disclosures with the promoter (De Blueoak & P Mangatram Properties LLP) and official Telangana RERA authorities before making any purchase decision. Information on Naani Projects is provided for general informational purposes only and may change without prior notice.
            </p>
          </div>
        </section>

        {/* Section 10: FAQ Section */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Frequently Asked Questions – Rise With 9
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Got questions about Rise With 9 Neopolis Kokapet? Find verified answers below.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#0D1426] border border-slate-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-amber-400 transition-colors text-sm sm:text-base"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp size={20} className="text-amber-400 shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-slate-300 text-sm leading-relaxed border-t border-slate-800/50 mt-1">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-amber-600/20 via-[#0D1426] to-amber-600/20 border-t border-amber-500/30">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Schedule Your Site Visit to Rise With 9 Neopolis
            </h2>
            <p className="text-slate-300 text-base max-w-2xl mx-auto">
              Request updated pricing details, floor plan brochures, or schedule an exclusive private site visit with our senior real estate advisors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <CTAButton
                text="Request Price Details"
                onClick={() => openLeadModal("Bottom CTA - Request Price")}
              />
              <button
                onClick={() => openLeadModal("Bottom CTA - Schedule Visit")}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl border border-slate-700 transition-all hover:scale-105"
              >
                <Calendar size={18} className="text-amber-400" />
                Schedule a Site Visit
              </button>
              <a
                href={`tel:+91${CONTACT_PHONE}`}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-6 py-3.5 rounded-xl border border-amber-500/30 transition-all"
              >
                <Phone size={18} />
                Call {CONTACT_PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* Mobile Sticky Bottom CTA Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B101D]/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 flex items-center justify-between gap-2 shadow-2xl">
          <a
            href={`tel:+91${CONTACT_PHONE}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded-lg border border-slate-700"
          >
            <Phone size={15} className="text-amber-400" />
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/91${CONTACT_PHONE}?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Rise%20With%209%20Neopolis%20Kokapet.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-lg"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => openLeadModal("Mobile Sticky - Get Price")}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 rounded-lg shadow-lg"
          >
            <Sparkles size={15} />
            <span>Site Visit</span>
          </button>
        </div>

        <ProjectsFooter />

        {/* Unified Lead Capture Popup */}
        <LeadCapturePopup
          open={popupOpen}
          onOpenChange={setPopupOpen}
          source={popupSource}
          projectName={PROJECT_NAME}
        />

        <ScrollTriggerPopup projectName={PROJECT_NAME} />
      </div>
    </>
  );
}
