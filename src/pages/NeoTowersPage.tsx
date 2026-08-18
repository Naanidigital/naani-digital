import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import NeoTowersLeadPopup, { NeoPopupType } from "@/components/neo-towers/NeoTowersLeadPopup";
import NeoTowersStickyCTA from "@/components/neo-towers/NeoTowersStickyCTA";
import {
  MessageCircle,
  Phone,
  MapPin,
  Building2,
  Layers,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Home,
  Zap,
  Shield,
  Leaf,
  Award,
  Sparkles,
  Compass,
  Info,
  Calendar,
  FileText,
  ExternalLink,
  Briefcase,
  Sun,
  Eye,
  TreePine,
  Wifi,
  Users,
  Check,
  ArrowRight,
  Clock,
  X,
  ZoomIn,
  Image as ImageIcon,
} from "lucide-react";

// Official Uploaded Neo Towers Asset Imports
import towerAImage from "@/assets/neo-towers/tower-a.webp";
import towerBImage from "@/assets/neo-towers/tower-b.jpg";
import clubNeoImage from "@/assets/neo-towers/club-neo.png";
import colorBuildingImage from "@/assets/neo-towers/color-building.png";
import skydeckImage from "@/assets/neo-towers/skydeck.jpg";
import floorPlan1Image from "@/assets/neo-towers/floor-plan-1.jpg";
import floorPlan2Image from "@/assets/neo-towers/floor-plan-2.jpg";

const PROJECT_NAME = "Neo Towers";
const DEVELOPER_NAME = "Yula Globus Developers LLP";
const RERA_NO = "TG RERA P02400010006";
const LOCATION_NAME = "Neopolis, Kokapet, Hyderabad";
const SITE_ADDRESS = "Plot No. 11, Neopolis, Kokapet, Gandipet, Telangana – 500075";
const PHONE_NUMBER = "9705080909";
const CANONICAL_URL = "https://www.naani.in/projects/neo-towers-neopolis-kokapet";

// Analytics tracking helper
const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, {
      project: "neo_towers",
      ...params,
    });
  }
};

const galleryImages = [
  {
    src: towerAImage,
    title: "Neo Towers - Tower A Exterior",
    alt: "Neo Towers luxury apartments in Neopolis Kokapet Hyderabad",
    tag: "Tower A",
  },
  {
    src: towerBImage,
    title: "Neo Towers - Tower B Perspective",
    alt: "Neo Towers twin tower residential development in Neopolis Kokapet",
    tag: "Tower B",
  },
  {
    src: colorBuildingImage,
    title: "Neo Towers Twin Tower Elevation",
    alt: "Neo Towers twin tower architecture in Neopolis Kokapet Hyderabad",
    tag: "Architecture",
  },
  {
    src: clubNeoImage,
    title: "Club Neo - Signature Clubhouse",
    alt: "Club Neo amenities at Neo Towers Neopolis Kokapet",
    tag: "Club Neo",
  },
  {
    src: skydeckImage,
    title: "Skydeck Rooftop Experience",
    alt: "Neo Towers Skydeck rooftop amenities in Neopolis Kokapet",
    tag: "Skydeck",
  },
  {
    src: floorPlan1Image,
    title: "Neo Towers 3 BHK Apartment Floor Plan",
    alt: "Neo Towers 3 BHK apartment floor plan",
    tag: "Floor Plan",
  },
  {
    src: floorPlan2Image,
    title: "Neo Towers 4 BHK Apartment Floor Plan",
    alt: "Neo Towers 4 BHK apartment floor plan",
    tag: "Floor Plan",
  },
];

const NeoTowersPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<NeoPopupType>("price_request");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const scrollTriggeredRef = useRef(false);
  const exitTriggeredRef = useRef(false);

  const openPopup = (type: NeoPopupType) => {
    setPopupType(type);
    setPopupOpen(true);
    trackEvent("popup_open", { source: type });
  };

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    trackEvent("lightbox_open", { index });
  };

  // Trigger Exit Intent (Desktop only, max 1x per session)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      if (e.clientY <= 0 && !exitTriggeredRef.current) {
        const sessionKey = "neo_towers_exit_popup";
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, "done");
          exitTriggeredRef.current = true;
          openPopup("exit_intent");
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Trigger Scroll Engagement Popup (60-70% scroll, max 1x per session)
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTriggeredRef.current) return;
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent >= 0.65) {
        const sessionKey = "neo_towers_scroll_popup";
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, "done");
          scrollTriggeredRef.current = true;
          openPopup("scroll_popup");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Page View Event
  useEffect(() => {
    trackEvent("project_page_view");
  }, []);

  const faqs = [
    {
      q: "What is Neo Towers?",
      a: "Neo Towers is an uber-premium high-rise residential development located in Plot No. 11, Neopolis, Kokapet, West Hyderabad. Spanning 4.36 acres, it features two iconic 57-storey towers offering luxurious 3 & 4 BHK residences, panoramic 180° views, Sky Office facilities, and Club Neo.",
    },
    {
      q: "Where is Neo Towers located?",
      a: "Neo Towers is located at Plot No. 11, Neopolis, Kokapet, Gandipet, Telangana – 500075. It commands a prime position in West Hyderabad's high-tech corridor, offering direct access to ORR Exit 1A, Financial District, Gachibowli, and HITEC City.",
    },
    {
      q: "Who is developing Neo Towers?",
      a: "Neo Towers is developed by Yula Globus Developers LLP, combining the property development expertise of Yula Properties, Globus, and Meeka.",
    },
    {
      q: "What configurations are available?",
      a: "Neo Towers offers large-format 3 BHK and 4 BHK uber-premium apartments.",
    },
    {
      q: "What are the apartment sizes?",
      a: "Residences at Neo Towers range from approximately 2,235 sq.ft. for 3 BHK layouts up to 4,565 sq.ft. for expansive 4 BHK suites.",
    },
    {
      q: "What is the RERA number?",
      a: "Neo Towers is registered under Telangana RERA with registration number TG RERA P02400010006.",
    },
    {
      q: "What amenities are available?",
      a: "Neo Towers features 40+ lifestyle amenities spread across Club Neo, outdoor sports grounds, convenience lobbies, and rooftop sky decks including tennis courts, swimming pools, pet parks, and crèche.",
    },
    {
      q: "What is Club Neo?",
      a: "Club Neo is the dedicated social, wellness, and recreational clubhouse hub at Neo Towers, featuring fitness studios, indoor sports, lounges, clinic, crèche, and community event spaces.",
    },
    {
      q: "What is Sky Office?",
      a: "Sky Office is a signature executive workplace amenity at Neo Towers providing private meeting pods, open sky co-working desks, executive boardrooms, plug & play workstations, and office suites for resident professionals.",
    },
    {
      q: "What is Skydeck?",
      a: "Skydeck is an elevated rooftop lifestyle deck situated atop the 57-storey twin towers featuring an Open Air Amphitheatre, 3 Telescopic Points, Surya Namaskar Lawn, Star-Map Deck, Sky Trail, Sky Gym, Fragrance Garden, and Sky Cafe.",
    },
    {
      q: "How is Neo Towers connected to Financial District?",
      a: "Financial District is located approximately 15–25 minutes from Neo Towers via the Neopolis ORR access network, providing quick daily commutes for corporate professionals.",
    },
    {
      q: "How is Neo Towers connected to HITEC City?",
      a: "HITEC City and Mindspace IT Park are accessible within an estimated 15–25 minute drive band depending on route and traffic conditions.",
    },
    {
      q: "How can I get current pricing?",
      a: "Current pricing and availability can vary by configuration, floor, orientation and inventory. Contact Naani Projects at 9705080909 for the latest details.",
    },
    {
      q: "How can I schedule a site visit?",
      a: "You can click 'Schedule a Site Visit' on this page, or directly call or WhatsApp Naani Projects on 9705080909 to arrange a guided property tour.",
    },
  ];

  // Structural Schema
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL_URL}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
          { "@type": "ListItem", "position": 3, "name": "Hyderabad", "item": "https://www.naani.in/hyderabad" },
          { "@type": "ListItem", "position": 4, "name": "Kokapet", "item": "https://www.naani.in/projects-in-kokapet" },
          { "@type": "ListItem", "position": 5, "name": "Neo Towers", "item": CANONICAL_URL },
        ],
      },
      {
        "@type": "ApartmentComplex",
        "@id": `${CANONICAL_URL}#project`,
        "name": "Neo Towers",
        "url": CANONICAL_URL,
        "description": "Neo Towers in Neopolis, Kokapet, Hyderabad. Discover 3 & 4 BHK residences, 57-storey towers, sky amenities, Club Neo, Sky Office, Skydeck and West Hyderabad connectivity.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot No. 11, Neopolis, Kokapet, Gandipet",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500075",
          "addressCountry": "IN",
        },
        "telephone": "+919705080909",
        "developer": {
          "@type": "Organization",
          "name": "Yula Globus Developers LLP",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${CANONICAL_URL}#faq`,
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-20 md:pb-0">
      <SEOHead
        title="Neo Towers Neopolis Kokapet Hyderabad | 3 & 4 BHK Apartments"
        description="Explore Neo Towers in Neopolis, Kokapet, Hyderabad. Discover 3 & 4 BHK residences, 57-storey towers, sky amenities, Club Neo, Sky Office, Skydeck and West Hyderabad connectivity."
        canonicalUrl={CANONICAL_URL}
        ogImage={towerAImage}
      />

      {/* Preload Primary Hero Image */}
      <link rel="preload" as="image" href={towerAImage} />

      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <ProjectsHeader />

      {/* BREADCRUMBS NAVIGATION */}
      <nav aria-label="Breadcrumb" className="bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-slate-400">
          <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <Home size={14} />
            Home
          </Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-amber-400 transition-colors">
            Projects
          </Link>
          <span>/</span>
          <Link to="/hyderabad" className="hover:text-amber-400 transition-colors">
            Hyderabad
          </Link>
          <span>/</span>
          <Link to="/projects-in-kokapet" className="hover:text-amber-400 transition-colors">
            Kokapet
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Neo Towers</span>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
        {/* Hero Image: Neo Towers - TOWER A.jpg */}
        <div className="absolute inset-0 z-0">
          <img
            src={towerAImage}
            alt="Neo Towers luxury apartments in Neopolis Kokapet Hyderabad"
            className="w-full h-full object-cover object-top opacity-40 filter brightness-95"
            width="1200"
            height="800"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/75 to-[#090D16]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md">
            <Sparkles size={16} />
            {RERA_NO} • Neopolis, Kokapet
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Neo Towers Neopolis, Kokapet, Hyderabad – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">3 & 4 BHK Luxury Apartments</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200">
              3 & 4 BHK Uber-Premium Apartments
            </p>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
              2,235–4,565 sq.ft. Residences • A distinctive high-rise address combining expansive residences, panoramic views, elevated workspaces, sky-level amenities and the connectivity advantage of Neopolis.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openPopup("price_request")}
              className="lead-btn inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-extrabold px-7 py-3.5 rounded-xl shadow-xl transition-all hover:scale-105 text-sm sm:text-base"
            >
              <Info size={18} />
              Get Current Price
            </button>

            <button
              onClick={() => openPopup("hero_site_visit")}
              className="lead-btn inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl border border-amber-500/30 transition-all hover:scale-105 text-sm sm:text-base"
            >
              <Calendar size={18} />
              Schedule Site Visit
            </button>

            <a
              href={`https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent("Hi Naani Projects, I want to inquire about Neo Towers Neopolis Kokapet.")}`}
              onClick={() => trackEvent("whatsapp_click")}
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
            >
              <MessageCircle size={18} />
              WhatsApp {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* PROJECT FACT BOX: "Neo Towers at a Glance" */}
      <section className="py-12 bg-[#0B101D] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="bg-[#090D16] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Project Fact Sheet</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Neo Towers at a Glance</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Clock size={14} className="text-amber-400" />
                <span>Last verified: August 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Project Name</span>
                <span className="text-white font-bold text-base mt-0.5 block">{PROJECT_NAME}</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Developer</span>
                <span className="text-white font-bold text-base mt-0.5 block">{DEVELOPER_NAME}</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Location</span>
                <span className="text-white font-bold text-base mt-0.5 block">{LOCATION_NAME}</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Project Type</span>
                <span className="text-white font-bold text-base mt-0.5 block">Uber-Premium Apartments</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Configurations</span>
                <span className="text-amber-400 font-bold text-base mt-0.5 block">3 & 4 BHK</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Residence Size</span>
                <span className="text-white font-bold text-base mt-0.5 block">2,235–4,565 sq.ft.</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Project Area</span>
                <span className="text-white font-bold text-base mt-0.5 block">4.36 Acres</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Towers & Floors</span>
                <span className="text-white font-bold text-base mt-0.5 block">2 Towers • 57 Storeys</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">RERA Number</span>
                <span className="text-amber-400 font-bold text-base mt-0.5 block">{RERA_NO}</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium text-xs">Pricing</span>
                <span className="text-amber-300 font-bold text-base mt-0.5 block">Contact for current details</span>
              </div>
              <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800/80 sm:col-span-2">
                <span className="text-slate-400 block font-medium text-xs">Expected Possession</span>
                <span className="text-white font-bold text-base mt-0.5 block">[Confirm with client]</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic text-center pt-2">
              Pricing and availability are subject to change. Contact Naani Projects on {PHONE_NUMBER} for current information.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROJECT OVERVIEW */}
      <section className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                Project Overview
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Neo Towers Overview
              </h2>
              <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  Neo Towers is positioned as an uber-premium residential development in Neopolis, Kokapet, one of West Hyderabad's emerging high-end residential and business districts. The development spans approximately 4.36 acres and comprises two iconic 57-storey towers that define the modern high-rise skyline of West Hyderabad.
                </p>
                <p>
                  Residences are offered in 3 and 4 BHK configurations, with sizes ranging from approximately 2,235 to 4,565 sq.ft. The twin-tower concept is engineered to maximize privacy, natural light, and panoramic views across Kokapet and the Outer Ring Road (ORR) expressway corridor.
                </p>
                <p>
                  Positioned around high-rise living, premium architecture, and elevated wellness facilities, Neo Towers provides seamless connectivity to the Financial District, Gachibowli, and HITEC City, offering a landmark residential address in West Hyderabad.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => openPopup("floor_plan_request")}
                  className="lead-btn inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-md text-sm transition-all"
                >
                  <FileText size={18} />
                  Get Detailed Floor Plans
                </button>
                <button
                  onClick={() => openPopup("price_request")}
                  className="lead-btn inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-6 py-3 rounded-xl border border-amber-500/30 text-sm transition-all"
                >
                  <Info size={18} />
                  Request Price Details
                </button>
              </div>
            </div>

            {/* Image: Neo Towers - TOWER B.jpg */}
            <div className="lg:col-span-5">
              <div
                onClick={() => openLightbox(1)}
                className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group cursor-pointer"
              >
                <img
                  src={towerBImage}
                  alt="Neo Towers twin tower residential development in Neopolis Kokapet"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B101D]/90 backdrop-blur-md border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Twin Tower Architecture</span>
                    <p className="text-sm font-semibold text-white mt-0.5">Neo Towers - Tower B Perspective</p>
                  </div>
                  <ZoomIn className="w-5 h-5 text-amber-400 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT HIGHLIGHTS */}
      <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Architectural Highlights</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                Project Highlights
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Core verified specifications defining the twin-tower skyline development of Neo Towers.
              </p>
            </div>

            {/* Image: Neo Towers color-building.png */}
            <div className="lg:col-span-6">
              <div
                onClick={() => openLightbox(2)}
                className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group cursor-pointer bg-[#090D16]/50 p-4"
              >
                <img
                  src={colorBuildingImage}
                  alt="Neo Towers twin tower architecture in Neopolis Kokapet Hyderabad"
                  className="w-full h-[320px] object-contain group-hover:scale-105 transition-transform duration-700 mx-auto"
                  loading="lazy"
                />
                <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-amber-500/30 p-2 rounded-xl text-amber-400">
                  <ZoomIn size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Visually strong highlight cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
              <Building2 className="w-8 h-8 text-amber-400 mx-auto" />
              <span className="block text-2xl font-black text-white">4.36 Acres</span>
              <span className="text-xs text-slate-400 font-medium block">Project Land Area</span>
            </div>
            <div className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
              <Layers className="w-8 h-8 text-amber-400 mx-auto" />
              <span className="block text-2xl font-black text-white">2 Towers</span>
              <span className="text-xs text-slate-400 font-medium block">Iconic Twin Architecture</span>
            </div>
            <div className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
              <Compass className="w-8 h-8 text-amber-400 mx-auto" />
              <span className="block text-2xl font-black text-white">57 Storeys</span>
              <span className="text-xs text-slate-400 font-medium block">Vertical High-Rise Living</span>
            </div>
            <div className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
              <Maximize2 className="w-8 h-8 text-amber-400 mx-auto" />
              <span className="block text-2xl font-black text-white">3 & 4 BHK</span>
              <span className="text-xs text-slate-400 font-medium block">2,235–4,565 sq.ft.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLUB NEO SECTION */}
      <section className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image: Neo Towers club_neo.jpg */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div
                onClick={() => openLightbox(3)}
                className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group cursor-pointer"
              >
                <img
                  src={clubNeoImage}
                  alt="Club Neo amenities at Neo Towers Neopolis Kokapet"
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B101D]/90 backdrop-blur-md border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Signature Clubhouse</span>
                    <p className="text-sm font-bold text-white mt-1">Club Neo – Standalone Architectural Hub</p>
                  </div>
                  <ZoomIn className="w-5 h-5 text-amber-400 shrink-0" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Recreation & Wellness</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Club Neo at Neo Towers
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                The official website positions Club Neo as a major lifestyle component and the social and recreational hub of the project, incorporating fitness, indoor sports, family facilities, and community lounges.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#0B101D] p-4 rounded-xl border border-amber-500/20 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Fitness & Gym</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Equipped workout studios</p>
                  </div>
                </div>
                <div className="bg-[#0B101D] p-4 rounded-xl border border-amber-500/20 flex items-start gap-3">
                  <Users className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Social Lounges</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Sitting coves & community areas</p>
                  </div>
                </div>
                <div className="bg-[#0B101D] p-4 rounded-xl border border-amber-500/20 flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Indoor Sports</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Badminton & squash courts</p>
                  </div>
                </div>
                <div className="bg-[#0B101D] p-4 rounded-xl border border-amber-500/20 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Wellness & Health</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Clinic & physio suite</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openPopup("amenity_request")}
                  className="lead-btn inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-md text-sm transition-all"
                >
                  <Sparkles size={18} />
                  Explore Club Neo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKYDECK & ELEVATED LIFESTYLE */}
      <section className="py-16 md:py-24 bg-[#0B101D] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Elevated Amenities</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Skydeck & Elevated Lifestyle
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                The official website highlights Skydeck as a signature lifestyle experience situated at the crown of the 57-storey twin towers.
              </p>

              {/* Skydeck Storytelling timeline */}
              <div className="space-y-3 pt-2">
                <div className="bg-[#090D16] p-4 rounded-xl border border-amber-500/20 flex gap-4 items-center">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-widest w-20 shrink-0">Morning</span>
                  <p className="text-xs sm:text-sm text-slate-300">Surya Namaskar Lawn & sunrise stretch high above Neopolis.</p>
                </div>
                <div className="bg-[#090D16] p-4 rounded-xl border border-amber-500/20 flex gap-4 items-center">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-widest w-20 shrink-0">Fitness</span>
                  <p className="text-xs sm:text-sm text-slate-300">Sky Gym workouts & jogs along the elevated Sky Trail.</p>
                </div>
                <div className="bg-[#090D16] p-4 rounded-xl border border-amber-500/20 flex gap-4 items-center">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-widest w-20 shrink-0">Evening</span>
                  <p className="text-xs sm:text-sm text-slate-300">Sky Cafe lounge & Open Air Amphitheatre gatherings.</p>
                </div>
                <div className="bg-[#090D16] p-4 rounded-xl border border-amber-500/20 flex gap-4 items-center">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-widest w-20 shrink-0">Night</span>
                  <p className="text-xs sm:text-sm text-slate-300">Star-Map Deck & stargazing at 3 Telescopic Points.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openPopup("amenity_request")}
                  className="lead-btn inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-md text-sm transition-all"
                >
                  <Eye size={18} />
                  Get Amenity Details
                </button>
              </div>
            </div>

            {/* Image: Neo Towers skydeck-1200w.jpg */}
            <div className="lg:col-span-6">
              <div
                onClick={() => openLightbox(4)}
                className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl group cursor-pointer"
              >
                <img
                  src={skydeckImage}
                  alt="Neo Towers Skydeck rooftop amenities in Neopolis Kokapet"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B101D]/90 backdrop-blur-md border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Rooftop Skydeck</span>
                    <p className="text-sm font-bold text-white mt-1">Skydeck • Sky Trail • Star-Map Deck • Telescopic Points</p>
                  </div>
                  <ZoomIn className="w-5 h-5 text-amber-400 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AMENITIES CATEGORIES */}
      <section className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Master Amenity List</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Neo Towers Amenities
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Verified amenities divided into lifestyle, wellness, recreation, community, outdoor, and sky-level experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#0B101D] p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400">
                <TreePine size={24} />
              </div>
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Outdoor & Sports</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Tennis Court</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Pickleball Court</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Half Basketball Court</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Box Cricket</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Multipurpose Lawn</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Dedicated Pet Park</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Fitness Strip</li>
              </ul>
            </div>

            <div className="bg-[#0B101D] p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400">
                <Building2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Community & Lobbies</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Reception Lobby</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Clinic & Physio</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Pharmacy & Grocery</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> ATM Kiosk</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Senior Citizen Lounge</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Crèche & Play Area</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Art Gallery</li>
              </ul>
            </div>

            <div className="bg-[#0B101D] p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400">
                <Briefcase size={24} />
              </div>
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Sky Office Workspaces</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Private Meeting Pods</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Open Sky Co-Working</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Boardrooms</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Plug & Play Workstations</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Executive Office Suites</li>
              </ul>
            </div>

            <div className="bg-[#0B101D] p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Sky-Level Experiences</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Open Air Amphitheatre</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Telescope Points ×3</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Surya Namaskar Lawn</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Star-Map Deck</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Sky Trail & Sky Gym</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Fragrance Garden</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Sky Cafe</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEDICATED FLOOR PLANS SECTION */}
      <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Architectural Drawings</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Neo Towers Floor Plans
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Explore high-resolution layout drawings for 3 & 4 BHK residences at Neo Towers.
            </p>
          </div>

          {/* Floor Plan Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Floor Plan 1 */}
            <div className="bg-[#090D16] p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">Neo Towers 3 BHK Apartment Floor Plan</h3>
                <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-md font-semibold">3 BHK Layout</span>
              </div>
              <div
                onClick={() => openLightbox(5)}
                className="relative rounded-2xl overflow-hidden border border-slate-800 bg-white p-2 cursor-pointer group"
              >
                <img
                  src={floorPlan1Image}
                  alt="Neo Towers 3 BHK apartment floor plan"
                  className="w-full h-[360px] object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-amber-400 border border-amber-500/30 p-2 rounded-xl flex items-center gap-1.5 text-xs font-bold">
                  <ZoomIn size={16} />
                  <span>Tap to Enlarge</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">High-resolution layout drawing</span>
                <button
                  onClick={() => openPopup("floor_plan_request")}
                  className="lead-btn inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                >
                  <FileText size={14} />
                  Request Detailed Floor Plan
                </button>
              </div>
            </div>

            {/* Floor Plan 2 */}
            <div className="bg-[#090D16] p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">Neo Towers 4 BHK Apartment Floor Plan</h3>
                <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-md font-semibold">4 BHK Layout</span>
              </div>
              <div
                onClick={() => openLightbox(6)}
                className="relative rounded-2xl overflow-hidden border border-slate-800 bg-white p-2 cursor-pointer group"
              >
                <img
                  src={floorPlan2Image}
                  alt="Neo Towers 4 BHK apartment floor plan"
                  className="w-full h-[360px] object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-amber-400 border border-amber-500/30 p-2 rounded-xl flex items-center gap-1.5 text-xs font-bold">
                  <ZoomIn size={16} />
                  <span>Tap to Enlarge</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">High-resolution layout drawing</span>
                <button
                  onClick={() => openPopup("floor_plan_request")}
                  className="lead-btn inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                >
                  <FileText size={14} />
                  Request Detailed Floor Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PROJECT GALLERY */}
      <section className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Project Showcase</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Neo Towers Project Gallery
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Explore all uploaded project images including Tower A, Tower B, Twin Tower Elevation, Club Neo, Skydeck, and Floor Plans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="bg-[#0B101D] rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {img.tag}
                  </div>
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-amber-400">
                    <ZoomIn size={32} />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{img.title}</span>
                  <ImageIcon size={16} className="text-amber-400 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & CONNECTIVITY */}
      <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Prime West Hyderabad</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
              Neo Towers Location & Connectivity
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Positioned in Neopolis, Kokapet, offering high-rise connectivity advantage across West Hyderabad.
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-base sm:text-lg leading-relaxed font-normal">
            <div>
              <h3 className="text-2xl font-bold text-white">Neopolis & Kokapet Significance</h3>
              <p>
                Neopolis, Kokapet has emerged as West Hyderabad's master-planned high-rise skyline district. Characterized by wide arterial grid roads, underground utility networks, commercial high-rises, and prime residential developments, Neopolis offers direct access to the Outer Ring Road (ORR) expressway network.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Connectivity to Financial District & HITEC City</h3>
              <p>
                Positioned near ORR Exit 1A, Neo Towers provides seamless transit toward Financial District, Gachibowli, HITEC City, and Mindspace IT Park. Contact Naani Projects for the latest location and connectivity details.
              </p>
            </div>
          </div>

          {/* Location Table */}
          <div className="overflow-x-auto bg-[#090D16] rounded-2xl border border-amber-500/20 p-4 mt-8">
            <h3 className="text-lg font-bold text-white mb-4 px-2">Location Connectivity Table</h3>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-amber-400 font-bold uppercase text-xs">
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4 text-right">Approximate Project-Published Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs sm:text-sm">
                <tr><td className="py-3 px-4 font-semibold text-white">ORR Exit 1A</td><td className="py-3 px-4 text-right text-amber-300 font-bold">Immediate expressway route</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">Financial District</td><td className="py-3 px-4 text-right text-amber-300 font-bold">15–25 min</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">HITEC City IT Park</td><td className="py-3 px-4 text-right text-amber-300 font-bold">15–25 min</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">Mindspace IT Park</td><td className="py-3 px-4 text-right text-amber-300 font-bold">15–25 min</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">Rajiv Gandhi International Airport</td><td className="py-3 px-4 text-right text-amber-300 font-bold">1–30 min category</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">Oakridge International School</td><td className="py-3 px-4 text-right text-amber-300 font-bold">10–22 min category</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">DPS Khajaguda</td><td className="py-3 px-4 text-right text-amber-300 font-bold">10–22 min category</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">AIG Hospitals</td><td className="py-3 px-4 text-right text-amber-300 font-bold">15–25 min category</td></tr>
                <tr><td className="py-3 px-4 font-semibold text-white">Inorbit Mall / IKEA Hyderabad</td><td className="py-3 px-4 text-right text-amber-300 font-bold">20–25 min category</td></tr>
              </tbody>
            </table>
            <p className="text-[11px] text-slate-400 mt-3 italic text-center">
              Travel times are approximate, based on project-published location information, and may vary depending on traffic, route and time of day. Contact Naani Projects for the latest location and connectivity details.
            </p>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => openPopup("location_request")}
              className="lead-btn inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <MapPin size={18} />
              Get Location Details
            </button>
          </div>
        </div>
      </section>

      {/* DEVELOPER / PROJECT PARTNERS */}
      <section className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 bg-[#0B101D] p-8 rounded-3xl border border-amber-500/20">
              <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Developer Entity</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">About the Project Developers</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                The official website displays Yula Properties, Globus, and Meeka as project-related brands/partners and identifies {DEVELOPER_NAME} in the project information.
              </p>
              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300">
                <p><strong>Project Entity:</strong> {DEVELOPER_NAME}</p>
                <p><strong>Project Site Address:</strong> {SITE_ADDRESS}</p>
              </div>
            </div>

            {/* RERA Section */}
            <div className="space-y-6 bg-[#0B101D] p-8 rounded-3xl border border-amber-500/20">
              <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Legal Status</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Neo Towers RERA & Legal Information</h2>
              <div className="p-4 rounded-xl bg-[#090D16] border border-amber-500/30">
                <span className="text-xs text-slate-400 block font-semibold">Telangana RERA Registration</span>
                <span className="text-2xl font-black text-amber-400 tracking-wider block mt-1">{RERA_NO}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Buyers should independently verify the project's registration, approved plans, specifications and current status through the official Telangana RERA portal.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://rera.telangana.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold px-5 py-2.5 rounded-xl text-xs transition-all"
                >
                  <ExternalLink size={14} />
                  Verify RERA Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING SECTION */}
      <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Explore West Hyderabad</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Compare Neo Towers With Premium Projects in West Hyderabad
            </h2>
            <p className="text-slate-300 text-base">
              Explore nearby locations and luxury residential developments in Neopolis and Kokapet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/projects-in-neopolis"
              className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors">Explore Projects in Neopolis</span>
                <ArrowRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-2">Discover high-rise apartments & master-planned projects in Neopolis.</p>
            </Link>

            <Link
              to="/projects-in-kokapet"
              className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors">Compare Apartments in Kokapet</span>
                <ArrowRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-2">View verified residential developments in the Kokapet corridor.</p>
            </Link>

            <Link
              to="/projects-in-financial-district"
              className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors">Flats Near Financial District</span>
                <ArrowRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-2">Explore luxury residences close to Financial District IT offices.</p>
            </Link>

            <Link
              to="/projects/the-cascades-neopolis"
              className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors">The Cascades Neopolis</span>
                <ArrowRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-2">63-storey high-rise 3 & 4 BHK residences in Neopolis, Kokapet.</p>
            </Link>

            <Link
              to="/projects/rise-with-9-neopolis-kokapet"
              className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors">Rise With 9 Neopolis</span>
                <ArrowRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-2">Large-format luxury residences with sky-level amenities in Kokapet.</p>
            </Link>

            <Link
              to="/projects/linq-by-raghava-neopolis"
              className="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white group-hover:text-amber-400 transition-colors">LINQ by Raghava</span>
                <ArrowRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-2">Ultra-luxury 3 BHK apartments in Neopolis, Kokapet.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Informational Guide</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-base">
              Clear answers to essential questions about Neo Towers in Neopolis, Kokapet.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#0B101D] border border-amber-500/20 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-amber-400 text-sm sm:text-base transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="shrink-0 text-amber-400" /> : <ChevronDown className="shrink-0 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => openPopup("price_request")}
              className="lead-btn inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <Info size={18} />
              Check Current Availability & Pricing
            </button>
          </div>
        </div>
      </section>

      {/* SCHEDULE SITE VISIT FINAL CTA SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            Experience Neo Towers
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Schedule Your Guided Site Visit Today
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Connect with Naani Projects on <strong>{PHONE_NUMBER}</strong> to request unit availability, floor plans, and arrange your personal project tour.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openPopup("hero_site_visit")}
              className="lead-btn inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-xl transition-all hover:scale-105 text-base"
            >
              <Calendar size={20} />
              Schedule Site Visit
            </button>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-8 py-4 rounded-xl border border-amber-500/30 text-base transition-all hover:scale-105"
            >
              <Phone size={20} />
              Call {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* SOURCE METHODOLOGY & RERA DISCLAIMER */}
      <section className="py-8 bg-[#070A11] border-t border-slate-800 text-slate-400 text-[11px] leading-relaxed">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-3">
          <p>
            <strong>Information Source:</strong> Project information has been compiled primarily from the official Neo Towers project website and publicly available regulatory information. Project specifications, availability, plans and other details may change. Buyers should independently verify current information with the promoter and Telangana RERA before making a purchase decision.
          </p>
          <p>
            <strong>RERA Disclaimer:</strong> Neo Towers is presented with Telangana RERA registration number {RERA_NO} as published by the project website. Buyers are advised to independently verify the project's RERA registration, approved plans, specifications, unit details, payment schedule, possession commitments, applicable charges and other legal/project information with the promoter and official Telangana RERA authorities before making any purchase decision. Information published on Naani Projects is intended for general informational purposes and may change without prior notice.
          </p>
          <p>
            Naani Projects makes no guaranteed appreciation, returns, or profit claims regarding property purchases. Contact sales support on {PHONE_NUMBER} for official documentation and developer verified specs.
          </p>
        </div>
      </section>

      <ProjectsFooter />

      {/* STICKY CTA */}
      <NeoTowersStickyCTA onOpenPopup={openPopup} />

      {/* REUSABLE LEAD POPUP FOR NEO TOWERS */}
      <NeoTowersLeadPopup
        open={popupOpen}
        onOpenChange={setPopupOpen}
        popupType={popupType}
      />

      {/* LIGHTBOX MODAL FOR FULLSCREEN IMAGE & FLOOR PLAN INSPECTION */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6">
          <div className="w-full max-w-7xl flex items-center justify-between text-white border-b border-slate-800 pb-3">
            <div>
              <h4 className="font-bold text-sm sm:text-base text-amber-400">
                {galleryImages[activeImageIndex].title}
              </h4>
              <p className="text-xs text-slate-400">
                Image {activeImageIndex + 1} of {galleryImages.length} • {galleryImages[activeImageIndex].tag}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-auto">
            <img
              src={galleryImages[activeImageIndex].src}
              alt={galleryImages[activeImageIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl bg-white p-1"
            />
          </div>

          <div className="w-full max-w-4xl flex items-center justify-between gap-4 pt-2 border-t border-slate-800">
            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
              }
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-800 transition-colors"
            >
              ← Previous
            </button>

            <button
              onClick={() => openPopup(galleryImages[activeImageIndex].tag === "Floor Plan" ? "floor_plan_request" : "price_request")}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-5 py-2 rounded-xl shadow-md transition-all"
            >
              {galleryImages[activeImageIndex].tag === "Floor Plan" ? "Request Floor Plan Details" : "Get Current Price"}
            </button>

            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
              }
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-800 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeoTowersPage;
