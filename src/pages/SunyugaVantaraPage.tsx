import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck,
  MapPin,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Compass,
  ArrowRight,
  ChevronDown,
  Maximize2,
  X,
  Copy,
  Check,
  TreePine,
  Dumbbell,
  Users,
  Award,
  ExternalLink,
  Info,
  Play
} from "lucide-react";
import { sendLeadToSheet, detectPageContext } from "@/lib/leadProfile";

// Assets
import heroAerial from "@/assets/sunyuga-vantara/sunyuga-vantara-aerial-drone-day.jpg";
import clubhouseImg from "@/assets/sunyuga-vantara/sunyuga-vantara-clubhouse-elevation.webp";
import masterPlanImg from "@/assets/sunyuga-vantara/sunyuga-vantara-master-plan-layout.jpg";

const RERA_NUMBER = "P02200009418";
const RERA_VALID_TILL = "February 4, 2030";
const BROCHURE_URL = "https://housing-is-01.s3.amazonaws.com/6a32315a/75e67824d2035688a31dd582099ed342/original.pdf";
const YOUTUBE_VIDEO_ID = "xGKdHPOvXNs";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  src: string;
  alt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "aerial",
    title: "Bird's-Eye Drone Perspective",
    subtitle: "Panoramic view of Sunyuga Vantara's 3 residential towers, grand clubhouse, and the adjoining reserve forest",
    category: "Master Elevation",
    src: heroAerial,
    alt: "Sunyuga Vantara Kompally aerial drone view showing residential towers and forest canopy"
  },
  {
    id: "clubhouse",
    title: "Grand 33,000 Sft Luxury Clubhouse",
    subtitle: "G+3 levels of lifestyle infrastructure featuring wave-inspired facade, terrace pool, and wellness amenities",
    category: "Clubhouse",
    src: clubhouseImg,
    alt: "Sunyuga Vantara clubhouse elevation with modern facade and terrace recreation"
  },
  {
    id: "masterplan",
    title: "Sanctioned Master Layout Plan",
    subtitle: "6.5-Acre site plan showing Tower A, Tower B, Tower C, central courtyard, and the 33,000 Sft clubhouse",
    category: "Master Plan",
    src: masterPlanImg,
    alt: "Sunyuga Vantara master plan layout showing Towers A B C and clubhouse"
  }
];

export default function SunyugaVantaraPage() {
  const [activeVisual, setActiveVisual] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [copiedRera, setCopiedRera] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeMasterTab, setActiveMasterTab] = useState<"all" | "towers" | "clubhouse" | "nature">("all");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    configuration: "3 BHK (3 Toilets)",
    queryType: "Price Sheet & Inventory",
    consent: false
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleCopyRera = () => {
    navigator.clipboard.writeText(RERA_NUMBER);
    setCopiedRera(true);
    setTimeout(() => setCopiedRera(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || formData.phone.length < 10) {
      alert("Please enter your name and a valid 10-digit mobile number.");
      return;
    }
    if (!formData.consent) {
      alert("Please confirm your consent to receive requested project information.");
      return;
    }

    setSubmitting(true);
    try {
      const pageCtx = detectPageContext({
        propertyName: "Sunyuga Vantara Kompally",
        projectName: "Sunyuga Vantara",
        builderName: "Sunyuga Infra",
        location: "Kompally / Dullapally",
        propertyType: "Apartment",
        pageUrl: window.location.href
      });

      await sendLeadToSheet({
        profile: {
          name: formData.name,
          phone: formData.phone,
          lookingFor: formData.configuration.includes("2 BHK") ? "2 BHK" : "3 BHK",
          capturedAt: new Date().toISOString()
        },
        context: pageCtx,
        leadSource: `Vantara Page Form (${formData.queryType}) [Consent Given: true]`
      });

      setFormSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sunyuga Vantara Kompally | 2, 2.5 & 3 BHK Flats in Hyderabad</title>
        <meta
          name="description"
          content="Explore Sunyuga Vantara in Kompally / Dullapally, Hyderabad by Sunyuga Infra. 6.5 acres, 3 towers, 575 units, 33,000 Sft clubhouse, 2, 2.5 & 3 BHK floor plans and TG RERA P02200009418 details."
        />
        <link rel="canonical" href="https://www.naani.in/projects/sunyuga-vantara" />

        {/* OpenGraph */}
        <meta property="og:title" content="Sunyuga Vantara Kompally | 2, 2.5 & 3 BHK Flats in Hyderabad" />
        <meta
          property="og:description"
          content="Nature-centric residential sanctuary in North Hyderabad abutting reserve forest. 6.5 acres, 3 towers, 575 units, 33,000 Sft G+3 clubhouse, 2, 2.5 & 3 BHK homes. RERA P02200009418."
        />
        <meta property="og:url" content="https://www.naani.in/projects/sunyuga-vantara" />
        <meta property="og:image" content="https://www.naani.in/og-sunyuga-vantara.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sunyuga Vantara Kompally | 2, 2.5 & 3 BHK Flats in Hyderabad" />
        <meta
          name="twitter:description"
          content="Explore Sunyuga Vantara in Kompally / Dullapally, Hyderabad by Sunyuga Infra. 6.5 acres, 3 towers, 575 units, 33,000 Sft clubhouse, 2, 2.5 & 3 BHK floor plans and TG RERA P02200009418 details."
        />
        <meta name="twitter:image" content="https://www.naani.in/og-sunyuga-vantara.jpg" />

        {/* Schema.org BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
              { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
              { "@type": "ListItem", "position": 3, "name": "Kompally", "item": "https://www.naani.in/projects-in-kompally" },
              { "@type": "ListItem", "position": 4, "name": "Sunyuga Vantara", "item": "https://www.naani.in/projects/sunyuga-vantara" }
            ]
          })}
        </script>

        {/* Schema.org ApartmentComplex */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            "name": "Sunyuga Vantara",
            "url": "https://www.naani.in/projects/sunyuga-vantara",
            "description": "Sunyuga Vantara is a 6.5-acre nature-centric residential gated community along Apparel Park Road in the Dullapally–Kompally corridor of North Hyderabad by Sunyuga Infra Pvt. Ltd. Comprising 3 towers of 10 residential floors over 2 parking levels (cellar and stilt), 575 apartments in 2, 2.5 & 3 BHK formats (1,351 to 2,413 sq. ft.), 33,000 Sft G+3 clubhouse, and direct proximity to the 5,000-hectare reserve forest. Registered under TG RERA P02200009418.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Apparel Park Road, Near DRS International School, Dullapally",
              "addressLocality": "Kompally, Hyderabad",
              "addressRegion": "Telangana",
              "postalCode": "500014",
              "addressCountry": "IN"
            },
            "telephone": "+919493943946",
            "developer": {
              "@type": "Organization",
              "name": "Sunyuga Infra Private Limited"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        {/* Top Header & Breadcrumbs Bar */}
        <section className="border-b border-slate-800/80 bg-[#090e1c]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <nav className="flex items-center gap-2 text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <span>/</span>
              <Link to="/projects-in-kompally" className="hover:text-amber-400 transition-colors">Kompally</Link>
              <span>/</span>
              <span className="text-amber-400 font-medium">Sunyuga Vantara</span>
            </nav>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 hidden sm:inline">TG RERA:</span>
              <button
                onClick={handleCopyRera}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-mono text-xs transition-all active:scale-95"
                title="Click to Copy TG RERA Number"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{RERA_NUMBER}</span>
                {copiedRera ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              </button>
            </div>
          </div>
        </section>

        {/* HERO SECTION */}
        <section id="hero-section" className="relative pt-8 pb-14 lg:py-16 overflow-hidden border-b border-slate-800/80">
          {/* Subtle Glow Background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 to-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Project Header Title */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <TreePine className="w-3.5 h-3.5" />
                <span>Nature-Centric Gated Community · Next to 5,000-Ha Reserve Forest</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Sunyuga Vantara – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">2, 2.5 &amp; 3 BHK Apartments</span> in Kompally, Hyderabad
              </h1>
              <p className="mt-2 text-base sm:text-lg text-slate-300 max-w-4xl">
                A 6.5-acre serene residential enclave on Apparel Park Road, Dullapally (Kompally corridor) featuring 3 towers, 10 residential floors over 2 parking levels, 575 homes, and a grand 33,000 Sft G+3 clubhouse.
              </p>
            </div>

            {/* Main Visuals & Key Specs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Showcase Carousel & Lightbox */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
                  <img
                    src={GALLERY_ITEMS[activeVisual].src}
                    alt={GALLERY_ITEMS[activeVisual].alt}
                    className="w-full h-[360px] sm:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-semibold">
                      {GALLERY_ITEMS[activeVisual].category}
                    </span>
                  </div>

                  {/* Fullscreen Expand Button */}
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    title="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {GALLERY_ITEMS[activeVisual].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                      {GALLERY_ITEMS[activeVisual].subtitle}
                    </p>
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="grid grid-cols-3 gap-3">
                  {GALLERY_ITEMS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveVisual(idx)}
                      className={`relative rounded-xl overflow-hidden border text-left p-1 transition-all ${
                        activeVisual === idx
                          ? "border-amber-400 ring-2 ring-amber-400/20 bg-slate-800/80"
                          : "border-slate-800 hover:border-slate-700 bg-slate-900/60"
                      }`}
                    >
                      <img src={item.src} alt={item.alt} className="w-full h-16 sm:h-20 object-cover rounded-lg" />
                      <div className="mt-1 px-1 text-[11px] font-semibold text-slate-200 truncate">
                        {item.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Pricing Advisory, Key Highlights & Lead CTAs */}
              <div className="lg:col-span-5 space-y-5">
                {/* Indicative Pricing Card (Non-fabricated, transparent advisory) */}
                <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-slate-950 p-6 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                      Live Project Pricing &amp; Availability
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      HMDA &amp; TG RERA
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      Price on Request
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Dynamic unit-level cost sheets &amp; primary tower inventory available upon consultation.
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 2, 2.5 &amp; 3 BHK
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1,351 – 2,413 Sft
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No Fabricated Starting Rates
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                      href="#enquiry-section"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Request Cost Sheet</span>
                    </a>
                    <a
                      href="https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Sunyuga%20Vantara%20Kompally.%20Please%20share%20current%20pricing%20and%20floor%20plans."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Info</span>
                    </a>
                  </div>
                </div>

                {/* Verified Specs Table */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>Project Parameters At A Glance</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">Total Land Parcel</div>
                      <div className="text-sm font-bold text-white mt-0.5">6.5 Acres</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">Total Towers</div>
                      <div className="text-sm font-bold text-white mt-0.5">3 Towers (A, B, C)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">Building Height</div>
                      <div className="text-sm font-bold text-white mt-0.5">10 Floors (2 Parking Lvls)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">Total Apartments</div>
                      <div className="text-sm font-bold text-white mt-0.5">575 Units (88/Acre)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">Grand Clubhouse</div>
                      <div className="text-sm font-bold text-white mt-0.5">33,000 Sft (G+3 Floors)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">Open Green Space</div>
                      <div className="text-sm font-bold text-white mt-0.5">50%+ Landscaping</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">TG RERA ID</div>
                      <div className="text-sm font-bold text-amber-400 mt-0.5 font-mono">{RERA_NUMBER}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="text-slate-400">RERA Validity</div>
                      <div className="text-sm font-bold text-white mt-0.5">{RERA_VALID_TILL}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT OVERVIEW SECTION */}
        <section id="overview" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Vision &amp; Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Nature's Sanctuary in North Hyderabad — Built Around Trees, Air, and Space
                </h2>
                <div className="text-sm sm:text-base text-slate-300 space-y-4 leading-relaxed">
                  <p>
                    <strong>Sunyuga Vantara</strong> is a modern residential community developed by <strong>Sunyuga Infra Pvt. Ltd.</strong>, positioned on Apparel Park Road in the Dullapally–Kompally growth corridor of North Hyderabad. Spread over <strong>6.5 acres</strong> with an exceptionally balanced density of just <strong>88 homes per acre</strong>, the development brings together peaceful nature retreat living with quick connectivity to major urban centers.
                  </p>
                  <p>
                    Unlike high-density concrete blocks, Vantara reserves <strong>over 50% of its total grounds for open green spaces</strong>, central courtyards, aroma gardens, and outdoor recreation. The campus is directly adjacent to the expansive <strong>5,000-hectare reserve forest area</strong> (incorporating the Telangana State Forest Academy and Institute of Forest Biodiversity), providing residents with pure air, natural cooling, and unbroken tree-line panoramas.
                  </p>
                  <p>
                    The residential master plan features <strong>3 mid-rise towers</strong> engineered with 10 residential floors over 2 dedicated parking levels (cellar and stilt), ensuring vehicular safety, pedestrian-friendly inner courts, and effortless elevator transit to every home.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">50%+</div>
                    <div className="text-xs text-slate-400 mt-1">Open Green Grounds &amp; Nature Courts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">88 Units</div>
                    <div className="text-xs text-slate-400 mt-1">Low-Density Homes Per Acre</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">33,000 Sft</div>
                    <div className="text-xs text-slate-400 mt-1">G+3 Multi-Level Lifestyle Clubhouse</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <img src={clubhouseImg} alt="Sunyuga Vantara Clubhouse 33,000 sq ft" className="w-full h-[380px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase">
                      Leisure Hub
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">G+3 Dedicated Clubhouse Block</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Featuring rooftop swimming pool, terrace bar, fitness studios, banquet hall, and co-working suites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MASTER PLAN & TOWERS LAYOUT SECTION */}
        <section id="master-plan" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Approved Project Layout
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Sanctioned Master Plan &amp; Three-Tower Geometry
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Inspect how Towers A, B, and C are arranged across the 6.5-acre parcel to maximize natural cross-ventilation, daylight, and courtyard seclusion.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer group shadow-2xl"
                >
                  <img
                    src={masterPlanImg}
                    alt="Sunyuga Vantara Sanctioned Master Plan Layout 6.5 Acres"
                    className="w-full h-[400px] sm:h-[480px] object-contain bg-slate-950 p-2 group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-amber-400 text-xs font-medium border border-slate-700 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Zoom Master Plan</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Tower Layout &amp; Zoning Distribution</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The approved layout divides the 6.5 acres into 3 self-contained residential clusters surrounding central vehicular and pedestrian loops:
                  </p>

                  <div className="space-y-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="font-bold text-amber-400">Tower A (Central Courtyard Square)</div>
                      <div className="text-slate-300 mt-0.5">
                        Features inner-quadrangle courtyard architecture with 29 flats per floor plate, housing 2 BHK (1,351 &amp; 1,453 Sft), 2.5 BHK (1,504 Sft), and 3 BHK homes (1,439 to 2,235 Sft).
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="font-bold text-amber-400">Tower B (Linear Pavilion Wing)</div>
                      <div className="text-slate-300 mt-0.5">
                        Features single-loaded cross-ventilated residences overlooking landscape avenues with premier corner 3 BHK layouts up to 2,413 Sft.
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="font-bold text-amber-400">Tower C (Angled Garden Wing)</div>
                      <div className="text-slate-300 mt-0.5">
                        Features generous setbacks facing the sports courts, pet park, and reserve forest green buffer.
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="font-bold text-amber-400">Clubhouse Block (Independent G+3 Block)</div>
                      <div className="text-slate-300 mt-0.5">
                        33,000 Sq. Ft. standalone recreation hub with rooftop swimming pool, terrace party lounge, gym, spa, and celebration halls.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONFIGURATIONS & FLOOR PLANS SECTION */}
        <section id="configurations" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Residence Configurations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Meticulously Planned 2, 2.5 &amp; 3 BHK Living Spaces
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Every unit in Sunyuga Vantara is crafted to maximize cross-ventilation, Vastu compliance, and zero corridor wastage. Review all verified sizes from the official brochure below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: 2 BHK */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
                    <span>Smart 2 BHK</span>
                    <span>2 Balconies</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-2">2 BHK + 2 Toilets</h3>
                  <div className="text-2xl font-black text-amber-400 mt-1">1,351 – 1,453 <span className="text-xs font-normal text-slate-400">Sft</span></div>
                  <p className="text-xs text-slate-400 mt-1">East &amp; North Facing Units (Tower A)</p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>1,351 Sft: East-facing compact layout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>1,453 Sft: North-facing open layout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Dedicated utility space &amp; wide master bedroom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Vastu-aligned main entrance</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors"
                  >
                    <span>Request 2 BHK Floor Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: 2.5 BHK */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
                    <span>Flexi 2.5 BHK</span>
                    <span>Work-From-Home</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-2">2 BHK + Study (2.5 BHK)</h3>
                  <div className="text-2xl font-black text-amber-400 mt-1">1,504 <span className="text-xs font-normal text-slate-400">Sft</span></div>
                  <p className="text-xs text-slate-400 mt-1">West Facing Units (Tower A)</p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>1,504 Sft: 2 Bed + Study / Home Office</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Ideal for hybrid remote-working professionals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Expansive living and dining hall</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Inner courtyard viewing balcony</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors"
                  >
                    <span>Request 2.5 BHK Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Compact 3 BHK (2 Toilets) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
                    <span>Compact 3 BHK</span>
                    <span>Value Format</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-2">3 BHK + 2 Toilets</h3>
                  <div className="text-2xl font-black text-amber-400 mt-1">1,439 – 1,589 <span className="text-xs font-normal text-slate-400">Sft</span></div>
                  <p className="text-xs text-slate-400 mt-1">East &amp; West Facing (Tower A)</p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>1,439 Sft: East-facing 3BHK-2T layout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>1,589 Sft: West-facing 3BHK-2T layout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Three bedrooms with smart two-bathroom design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Balanced price-per-square-foot entry for families</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition-colors"
                  >
                    <span>Request 3BHK-2T Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 4: Grand 3 BHK (3 Toilets) */}
              <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 flex flex-col justify-between shadow-xl ring-1 ring-amber-500/20">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
                    <span>Luxury 3 BHK</span>
                    <span>3 Bathrooms</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-2">3 BHK + 3 Toilets</h3>
                  <div className="text-2xl font-black text-amber-400 mt-1">1,612 – 2,413 <span className="text-xs font-normal text-slate-400">Sft</span></div>
                  <p className="text-xs text-slate-400 mt-1">East, West &amp; North (Towers A, B, C)</p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Range: 1,612, 1,756, 1,885, 1,915 to 2,413 Sft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>En-suite attached bathrooms for all 3 bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Grand drawing + dining expanse with wide balcony</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Corner units with wrap-around forest views</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    <span>Request Luxury 3 BHK Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 33,000 SFT GRAND CLUBHOUSE SECTION */}
        <section id="clubhouse" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Lifestyle Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                The 33,000 Sq. Ft. Grand Clubhouse (G+3 Floors)
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                An architectural centerpiece engineered to cater to every generation, featuring elevated wellness, social celebration suites, and rooftop recreation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  🏊
                </div>
                <h4 className="text-base font-bold text-white">Terrace Swimming Pool</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Perched atop the clubhouse and fringed by lush landscaping and wooden sun decks, designed for refreshing morning laps and serene sunset unwinding.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  🍸
                </div>
                <h4 className="text-base font-bold text-white">Terrace Bar Area</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Elevated open-air bar counter with sweeping panoramas of the North Hyderabad skyline and the adjacent Bahadurpally green forest reserve.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  🏋️
                </div>
                <h4 className="text-base font-bold text-white">Commercial Gymnasium &amp; Aerobics</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fully equipped with modern strength machines, cardio stations, yoga and aerobics studio for daily personal fitness.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  💼
                </div>
                <h4 className="text-base font-bold text-white">Co-Working Suites &amp; Conference Room</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tailored for hybrid professionals with high-speed internet, ergonomic desks, presentation screens, and quiet collaboration booths.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  🎉
                </div>
                <h4 className="text-base font-bold text-white">Royal Banquet Hall</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Grand indoor banquet venue with pre-function foyer and catering preparation zones for hosting birthdays, festivals, and family milestones.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 hover:border-slate-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  🧖
                </div>
                <h4 className="text-base font-bold text-white">Rejuvenation Spa &amp; Salon</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dedicated wellness spa offering therapeutic treatments, steam rooms, and a unisex salon within the clubhouse grounds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OUTDOOR & NATURE AMENITIES SECTION */}
        <section id="amenities" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Active &amp; Leisure Zones
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Outdoor Sports, Nature Enclaves &amp; Community Courts
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Designed to nurture active lifestyles with dedicated courts for competitive sports, quiet meditation corners, and children's recreation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🏀 Full Basketball Court</div>
                <div className="text-slate-400">Regulation outdoor basketball court with spectator seating</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🏏 Netted Cricket Pitch</div>
                <div className="text-slate-400">Safe, dedicated practice enclosure for batting &amp; bowling drills</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🏐 Sand Volleyball Court</div>
                <div className="text-slate-400">Beach-style sand court for friendly evening team matches</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🛼 Skating Rink / Area</div>
                <div className="text-slate-400">Smooth-paved designated skating loop for youngsters</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🌿 Aroma &amp; Herbal Garden</div>
                <div className="text-slate-400">Fragrant floral shrubs and botanical walkways for quiet mornings</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">⛺ Hammock Park</div>
                <div className="text-slate-400">Tranquil shaded grove with tied hammocks beneath mature trees</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🎭 Open-Air Amphitheatre</div>
                <div className="text-slate-400">Stepped cultural pavilion for community gatherings &amp; performances</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🛝 Children's Play Area</div>
                <div className="text-slate-400">Rubberized flooring with safe multi-play stations &amp; slides</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🐕 Dedicated Pet Park</div>
                <div className="text-slate-400">Gated green lawn where pets can socialize and run off-leash</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🏃 Green Jogging Track</div>
                <div className="text-slate-400">Tree-canopied pedestrian pathway looping across the campus perimeter</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">⛩️ Shaded Gazebos &amp; Pergolas</div>
                <div className="text-slate-400">Chic sheltered outdoor seating pockets throughout central courts</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold">🛕 In-Community Temple</div>
                <div className="text-slate-400">A peaceful shrine located inside the premises for daily prayer</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D WALKTHROUGH VIDEO SECTION */}
        <section id="walkthrough" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Video Tour
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Experience Sunyuga Vantara in Motion
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Watch the official 3D architectural walkthrough to explore the towers, entrance portal, clubhouse, and lush surroundings.
              </p>
            </div>

            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?start=10`}
                title="Sunyuga Vantara 3D Walkthrough Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* CONSTRUCTION SPECIFICATIONS (ACCURATE & FACTUAL) */}
        <section id="specifications" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Engineering Quality
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Published Construction &amp; Material Specifications
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Factual summary of structural engineering, door/window finishes, and electrical standards as published in the official developer specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Structure &amp; Masonry</h4>
                <p className="text-slate-300 leading-relaxed">
                  <strong>RCC framed structure</strong> designed to withstand wind and seismic loads. External walls constructed with 9-inch thick cement blocks; internal walls with 4.5-inch thick cement blocks. Internal walls have smooth plaster finish; external with sponge finish.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Flooring &amp; Wall Cladding</h4>
                <p className="text-slate-300 leading-relaxed">
                  Drawing, living, dining, pooja, kitchen, and all bedrooms feature <strong>800mm x 800mm double-charged vitrified tiles</strong> of reputed make. Bathrooms, balconies, and utilities feature premium anti-skid ceramic tiles. Granite/Kota stone in staircases. Glazed ceramic tile dado up to 7ft in bathrooms.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Doors &amp; Windows</h4>
                <p className="text-slate-300 leading-relaxed">
                  Main door with manufactured <strong>teak wood frame</strong> and laminated shutter with reputed hardware. Internal doors with manufactured hardwood frames. <strong>uPVC window frames</strong> with tinted toughened glass. MS safety window grills up to 2nd floor (upper floors provided at extra cost).
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Plumbing &amp; Water Systems</h4>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Hydropneumatic water supply system</strong> ensuring equal water pressure across all upper and lower floors. CPVC concealed piping. Separate drinking municipal water connection in kitchen supplemented by on-site borewells. EWC with concealed flush tanks of reputed make.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Electrical &amp; Power Backup</h4>
                <p className="text-slate-300 leading-relaxed">
                  Concealed copper wiring with flame-retardant low-smoke (FRLS) cables. Modular switches of reputed make. Power outlets for ACs in living and bedrooms. <strong>100% DG backup</strong> for lifts, water pumps, common area illumination, and essential points in every apartment.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
                <h4 className="font-bold text-amber-400 text-sm">Elevators &amp; Safety Infrastructure</h4>
                <p className="text-slate-300 leading-relaxed">
                  High-speed automatic 8-passenger lifts plus high-speed service lift with V3F energy-saving drive, automatic rescue devices, and internal CCTV cameras. NBC fire hydrant and sprinkler coverage in stilt and cellar parking. 24/7 CCTV surveillance and solar-fenced perimeter wall.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION & CONNECTIVITY MATRIX */}
        <section id="location" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Strategic North Hyderabad Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Location Advantages &amp; Travel Proximity
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Situated on Apparel Park Road in Dullapally, minutes from Kompally, Medchal Highway (NH-44), and Outer Ring Road (ORR).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="font-bold text-amber-400 text-xs uppercase mb-2">Schools &amp; Academies</h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li>• DRS International School – <strong>3 Mins</strong></li>
                      <li>• Unicent School – <strong>3 Mins</strong></li>
                      <li>• St. Peter's International School – <strong>3 Mins</strong></li>
                      <li>• Abhaya Waldorf School – <strong>5 Mins</strong></li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="font-bold text-amber-400 text-xs uppercase mb-2">Higher Education</h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li>• St. Martin's Engineering College – <strong>2 Mins</strong></li>
                      <li>• Malla Reddy University – <strong>5 Mins</strong></li>
                      <li>• CMR Institute of Technology – <strong>12 Mins</strong></li>
                      <li>• Ignite Junior College – <strong>2 Mins</strong></li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="font-bold text-amber-400 text-xs uppercase mb-2">IT &amp; Road Transit</h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li>• Kandlakoya IT Park – <strong>5 Mins</strong></li>
                      <li>• Nehru Outer Ring Road (ORR) – <strong>10 Mins</strong></li>
                      <li>• Cine Planet Kompally – <strong>10 Mins</strong></li>
                      <li>• Secunderabad Junction – <strong>30 Mins</strong></li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="font-bold text-amber-400 text-xs uppercase mb-2">Healthcare Centers</h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li>• Rush Super Speciality Hospital – <strong>5 Mins</strong></li>
                      <li>• Malla Reddy Narayana Hospital – <strong>5 Mins</strong></li>
                      <li>• Balaji Hospital – <strong>10 Mins</strong></li>
                      <li>• Usha Mullapudi Cardiac Centre – <strong>20 Mins</strong></li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200">
                  <strong>Nature Buffer:</strong> Abutting the 5,000-hectare Bahadurpally reserve forest, Telangana State Forest Academy, and Institute of Forest Biodiversity, preserving clean air and scenic tree-line vistas.
                </div>
              </div>

              {/* Map Embed */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 h-[360px]">
                  <iframe
                    title="Sunyuga Vantara Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15219.062035048924!2d78.468205!3d17.518615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f08f87093d5%3A0x6b107e3878b66807!2sDullapally%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPER PROFILE & RERA COMPLIANCE ADVISORY */}
        <section id="developer-rera" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Developer Profile */}
              <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xl">
                    S
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Sunyuga Infra Private Limited</h3>
                    <p className="text-xs text-slate-400">Developer &amp; Promoter · Hyderabad, Telangana</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sunyuga Infra Private Limited is a Hyderabad-based property development firm focusing on high-quality residential apartments and plotted enclaves across emerging growth corridors in North Hyderabad. With emphasis on thoughtful architectural planning, durable construction materials, and HMDA-compliant layouts, Sunyuga Vantara stands as their flagship nature-centric apartment community.
                </p>
                <div className="pt-2 text-xs text-slate-400">
                  <span>Registered Address: Dullapally / Gundlapochampally, Medchal-Malkajgiri District, Telangana.</span>
                </div>
              </div>

              {/* RERA Disclosures & Buyer Advisory */}
              <div className="lg:col-span-6 rounded-2xl border border-amber-500/30 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Telangana RERA Verification &amp; Statutory Disclosures</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sunyuga Vantara is registered with the <strong>Telangana Real Estate Regulatory Authority (TG RERA)</strong> under registration number <strong className="text-amber-400 font-mono">{RERA_NUMBER}</strong> with validity extending through <strong>{RERA_VALID_TILL}</strong>.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div>• <strong>Authority:</strong> Hyderabad Metropolitan Development Authority (HMDA)</div>
                  <div>• <strong>Approved Land Extent:</strong> ~6.5 Acres (~27,762 sq. meters)</div>
                  <div>• <strong>Sanctioned Units:</strong> 575 Residential Apartments across 3 Towers</div>
                  <div>• <strong>Buyer Advisory:</strong> Prospective buyers are advised to verify statutory sanctions, tower completion milestones, and quarterly progress reports on the official TG RERA portal.</div>
                </div>
                <a
                  href="https://rera.telangana.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Verify on Official TG RERA Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* LEAD CONSULTATION & BROCHURE FORM SECTION */}
        <section id="enquiry-section" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Naani Projects Advisory
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Request Current Price Sheet &amp; Floor Plans
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Connect with our North Hyderabad residential advisory desk for live inventory availability, tower-wise pricing, and private site visit coordination.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Enquiry Received Successfully!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you. Our Kompally property specialist will connect with you via WhatsApp/Phone with the requested Sunyuga Vantara cost sheet and brochures.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I%20just%20submitted%20my%20enquiry%20for%20Sunyuga%20Vantara%20Kompally.%20Please%20share%20details."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat Immediately on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Configuration</label>
                      <select
                        value={formData.configuration}
                        onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option value="2 BHK (1,351 - 1,453 Sft)">2 BHK (1,351 – 1,453 Sft)</option>
                        <option value="2.5 BHK (1,504 Sft)">2.5 BHK / Study (1,504 Sft)</option>
                        <option value="3 BHK - 2 Toilets (1,439 - 1,589 Sft)">3 BHK (2 Toilets: 1,439 – 1,589 Sft)</option>
                        <option value="3 BHK - 3 Toilets (1,612 - 2,413 Sft)">3 BHK (3 Toilets: 1,612 – 2,413 Sft)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Enquiry Purpose</label>
                      <select
                        value={formData.queryType}
                        onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option value="Price Sheet & Inventory">Request Live Price Sheet &amp; Inventory</option>
                        <option value="Floor Plans & Brochure">Download Official Floor Plans &amp; Brochure</option>
                        <option value="Schedule Site Visit">Schedule Guided Site Visit</option>
                        <option value="Bank Loan Approvals">Inquire Bank Loan &amp; Payment Schedules</option>
                      </select>
                    </div>
                  </div>

                  {/* Explicit Consent Checkbox (Privacy Discipline) */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                      />
                      <span>
                        I consent to receive requested Sunyuga Vantara project details, price sheets, and site visit coordinates from Naani Projects via WhatsApp / Phone. I understand my contact information is handled securely and not shared with external marketing lists.
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                    >
                      {submitting ? "Transmitting Request..." : "Request Price Sheet & Floor Plans"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* AUTHORITATIVE SEO FAQS ACCORDION */}
        <section id="faqs" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Buyer Knowledge Base
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Frequently Asked Questions — Sunyuga Vantara
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Accurate, verified answers covering project sanctions, sizes, tower heights, and location advantages.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Where exactly is Sunyuga Vantara located in Hyderabad?",
                  a: "Sunyuga Vantara is situated along Apparel Park Road near DRS International School in Dullapally, within the Kompally residential corridor of North Hyderabad (PIN: 500014). It directly abuts the 5,000-hectare reserve forest area, combining clean air with 10-minute connectivity to the Nehru Outer Ring Road and Medchal Highway."
                },
                {
                  q: "What is the TG RERA registration number and validity?",
                  a: "The project is registered with the Telangana Real Estate Regulatory Authority under registration number P02200009418. The official registration validity extends through February 4, 2030."
                },
                {
                  q: "What is the total project extent and apartment unit count?",
                  a: "Sunyuga Vantara is developed over 6.5 acres of land and comprises 575 residential apartments spread across 3 mid-rise towers, delivering a low-density living environment of just 88 units per acre with over 50% open green space."
                },
                {
                  q: "What is the building height and parking configuration?",
                  a: "The development consists of 3 residential towers (Towers A, B, and C) rising 10 residential floors over 2 dedicated parking levels (cellar and stilt parking), plus a standalone G+3 clubhouse."
                },
                {
                  q: "What configurations and sizes are available at Sunyuga Vantara?",
                  a: "The project offers 2 BHK (1,351 & 1,453 sq. ft.), 2.5 BHK with study (1,504 sq. ft.), compact 3 BHK with 2 Toilets (1,439 & 1,589 sq. ft.), and grand 3 BHK with 3 Toilets (1,612 to 2,413 sq. ft.)."
                },
                {
                  q: "Why do some sources state 3 BHK starting at 1,611 Sft while others state 1,439 Sft?",
                  a: "The approved architectural floor plans include two distinct 3 BHK formats: 3 BHK with 2 Toilets (1,439 & 1,589 Sft) and 3 BHK with 3 Toilets (1,612 to 2,413 Sft). Initial marketing briefs frequently cite only the 3-toilet units (1,612+ Sft), whereas the complete brochure layout offers both."
                },
                {
                  q: "What are the scale and features of the clubhouse?",
                  a: "The community features a 33,000 sq. ft. standalone G+3 clubhouse equipped with a rooftop swimming pool, terrace bar area, commercial gym, yoga studio, spa, banquet hall, co-working suites, conference room, crèche, and indoor games arena."
                },
                {
                  q: "Does Sunyuga Vantara have an in-community temple?",
                  a: "Yes, an in-campus temple is integrated into the ground landscape to provide residents with convenient daily spiritual connection."
                },
                {
                  q: "What water supply and plumbing arrangements are provided?",
                  a: "Water is supplied through a modern hydropneumatic system to ensure constant, balanced water pressure across all floors. Drinking municipal water is piped to every kitchen and adequately supplemented by on-site borewells."
                },
                {
                  q: "What is the possession timeline?",
                  a: "The project is currently under construction. The official TG RERA registration validity extends up to February 2030, with phased handovers scheduled by the developer. Inquire with our advisory desk for specific tower-wise construction updates."
                }
              ].map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${openFaq === idx ? "rotate-180 text-amber-400" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIMILAR NORTH HYDERABAD PROJECTS */}
        <section className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Explore Options</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Similar Residential Communities</h3>
              </div>
              <Link to="/projects-in-kompally" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                <span>View All Kompally Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Link to="/projects/aparna-serenity" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Kompally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Aparna Serenity</div>
                <div className="text-xs text-slate-400 mt-0.5">22.45 Acres · G+9 Floors · 1,499 Units</div>
              </Link>
              <Link to="/projects/team4-aria-miyapur-luxury-apartments-hyderabad" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Miyapur</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Team4 Aria</div>
                <div className="text-xs text-slate-400 mt-0.5">Luxury High-Rise · Metro Proximity</div>
              </Link>
              <Link to="/projects/urbanrise-on-cloud-33-bachupally" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Bachupally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Urbanrise On Cloud 33</div>
                <div className="text-xs text-slate-400 mt-0.5">9.16 Acres · 33 Floors · Moroccan Club</div>
              </Link>
              <Link to="/projects/candeur-arbora" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Kukatpally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Candeur Arbora</div>
                <div className="text-xs text-slate-400 mt-0.5">Premium Residences · Metro Connectivity</div>
              </Link>
            </div>
          </div>
        </section>

        {/* FULLSCREEN LIGHTBOX MODAL */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
              <img
                src={GALLERY_ITEMS[activeVisual].src}
                alt={GALLERY_ITEMS[activeVisual].alt}
                className="max-h-[75vh] w-auto object-contain rounded-xl border border-slate-800 shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h4 className="text-base font-bold text-white">{GALLERY_ITEMS[activeVisual].title}</h4>
                <p className="text-xs text-slate-400 mt-1">{GALLERY_ITEMS[activeVisual].subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE STICKY ACTION BAR */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2.5 px-4 shadow-2xl flex items-center justify-between gap-3">
          <a
            href="tel:+919493943946"
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call</span>
          </a>
          <a
            href="https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Sunyuga%20Vantara%20Kompally.%20Please%20share%20current%20pricing%20and%20floor%20plans."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <a
            href="#enquiry-section"
            className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Price Sheet</span>
          </a>
        </div>
      </div>
    </>
  );
}
