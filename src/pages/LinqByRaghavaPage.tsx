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

import elevationHero from "@/assets/linq-by-raghava/linq-by-raghava-elevation-hero.jpg";
import skyBridge from "@/assets/linq-by-raghava/linq-by-raghava-sky-bridge.jpg";
import brandCollage from "@/assets/linq-by-raghava/linq-by-raghava-brand-collage.jpg";
import masterLayoutPlan from "@/assets/linq-by-raghava/linq-by-raghava-master-layout-plan.png";
import skyAmenitiesRooftop from "@/assets/linq-by-raghava/linq-by-raghava-sky-amenities-rooftop.jpg";

const PROJECT_NAME = "LINQ by Raghava";
const RERA_NO = "P02400011056";
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

export default function LinqByRaghavaPage() {
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

  const canonicalUrl = "https://www.naani.in/projects/linq-by-raghava";
  const seoTitle = "LINQ by Raghava Neopolis Kokapet | Luxury 3 BHK Apartments";
  const seoDescription =
    "Explore LINQ by Raghava in Kokapet, Neopolis, Hyderabad. Discover spacious 3 BHK residences, 5.5 lakh+ sq.ft. amenities, sky experiences, clubhouse facilities and connectivity.";

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${canonicalUrl}#listing`,
        url: canonicalUrl,
        name: "LINQ by Raghava Neopolis Kokapet Hyderabad",
        description: seoDescription,
        category: "Luxury Residential Apartments",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kokapet, Neopolis Layout",
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
            name: "LINQ by Raghava",
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
            name: "What is LINQ by Raghava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LINQ by Raghava is a luxury 3 BHK residential high-rise community comprising 4 landmark towers rising to 58 floors across a 9.2-acre land parcel in Kokapet near Neopolis, West Hyderabad.",
            },
          },
          {
            "@type": "Question",
            name: "Where is LINQ by Raghava located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LINQ by Raghava is located in Kokapet, adjacent to Neopolis, Hyderabad, Telangana – 500075, offering quick access to the Outer Ring Road (ORR) Exit, Financial District, and Gachibowli.",
            },
          },
          {
            "@type": "Question",
            name: "Who is developing LINQ by Raghava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LINQ by Raghava is developed by Raghava Projects, a leading infrastructure and real-estate conglomerate with a legacy originating in 1991.",
            },
          },
          {
            "@type": "Question",
            name: "What is the RERA registration number of LINQ by Raghava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LINQ by Raghava is registered under Telangana RERA with registration number P02400011056.",
            },
          },
          {
            "@type": "Question",
            name: "What configurations and sizes are available at LINQ by Raghava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LINQ by Raghava exclusively offers spacious 3 BHK luxury residences ranging from approximately 1,798 sq.ft. to 2,388 sq.ft.",
            },
          },
          {
            "@type": "Question",
            name: "What are The Nest and The Celestia at LINQ by Raghava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "'The Nest' is a sky-level lifestyle zone connecting the high-rise towers, while 'The Celestia' represents the elevated rooftop experience featuring an amphitheatre, stargazing deck, and sky lounge overlooking Gandipet Lake and the city skyline.",
            },
          },
          {
            "@type": "Question",
            name: "What is the total amenity space at LINQ by Raghava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "LINQ by Raghava offers over 5,50,000 sq.ft. of integrated lifestyle amenities including a central clubhouse, sports courts, infinity pool, sky deck, and landscaped open spaces.",
            },
          },
          {
            "@type": "Question",
            name: "How can I request price details or schedule a site visit for LINQ by Raghava?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Current price details, unit cost sheets, and site visit appointments are provided privately by contacting Naani Projects at 9705080909.",
            },
          },
        ],
      },
    ],
  };

  const faqs = [
    {
      q: "What is LINQ by Raghava?",
      a: "LINQ by Raghava is an ultra-luxury 3 BHK residential community developed by Raghava Projects. Situated across 9.2 acres in Kokapet near Neopolis, it features four 58-storey high-rise towers and over 5.5 lakh sq.ft. of lifestyle amenities.",
    },
    {
      q: "Where is LINQ by Raghava located?",
      a: "LINQ by Raghava is located in Kokapet, Neopolis, Hyderabad, Telangana – 500075. It is positioned within 5 minutes of Kokapet ORR Exit and 8 minutes of Financial District.",
    },
    {
      q: "Who is developing LINQ by Raghava?",
      a: "The project is developed by Raghava Projects, an established infrastructure and real estate group with expertise spanning engineering, urban development, and high-rise construction.",
    },
    {
      q: "What is the RERA number of LINQ by Raghava?",
      a: "LINQ by Raghava is registered under Telangana RERA bearing registration number P02400011056.",
    },
    {
      q: "What configurations and residence sizes are available?",
      a: "The project features spacious 3 BHK residences ranging from approximately 1,798 sq.ft. to 2,388 sq.ft., designed for expansive family living.",
    },
    {
      q: "What is the total land area and tower structure?",
      a: "LINQ by Raghava spans approximately 9.2 acres and comprises 4 iconic high-rise towers (Towers A, B, C, and D) rising 58 floors high.",
    },
    {
      q: "What is The Nest?",
      a: "'The Nest' is an architectural sky-level lifestyle bridge and social zone that connects the high-rise towers, offering elevated lounge and community spaces.",
    },
    {
      q: "What is The Celestia?",
      a: "'The Celestia' is a rooftop lifestyle destination featuring a sky deck, rooftop amphitheatre, stargazing area, and viewing lounges with panoramic vistas toward Gandipet Lake.",
    },
    {
      q: "Does LINQ by Raghava have sky-level amenities?",
      a: "Yes, LINQ by Raghava features elevated sky amenities including sky bridges, rooftop outdoor performance arenas, stargazing decks, sky dining, and private party spaces.",
    },
    {
      q: "How close is LINQ by Raghava to Neopolis and Financial District?",
      a: "LINQ by Raghava is situated adjacent to Neopolis (~1-2 minutes) and approximately 8 minutes from Financial District (GAR InfoBahn, Continental Hospitals, Microsoft Campus).",
    },
    {
      q: "How far is LINQ by Raghava from the ORR?",
      a: "The project is located approximately 5 minutes from Kokapet ORR Exit under normal traffic conditions.",
    },
    {
      q: "How far is LINQ from Raidurg Metro Station and Rajiv Gandhi International Airport?",
      a: "Published approximate travel times are ~15 minutes to Raidurg Metro Station and ~35 minutes to Rajiv Gandhi International Airport via the ORR express route.",
    },
    {
      q: "Which international schools and hospitals are near LINQ by Raghava?",
      a: "Nearby education hubs include Phoenix Greens (10 min), Oakridge International (12 min), Glendale Academy (15 min), and ISB (12 min). Healthcare facilities include Continental Hospitals (10 min) and AIG Hospitals (15 min).",
    },
    {
      q: "Is LINQ by Raghava suitable for families?",
      a: "Yes, LINQ by Raghava is specifically designed for end-use families, offering large 3 BHK layouts, 5.5 lakh+ sq.ft. of sports and children's amenities, 24x7 security, and open green acres.",
    },
    {
      q: "What is the expected possession timeline?",
      a: "Possession timelines should be confirmed with official client and RERA documentation (`[Confirm with client]`).",
    },
    {
      q: "How can I request pricing or schedule a site visit?",
      a: "Current unit availability, pricing, cost sheets, and site visit schedules are provided privately by contacting Naani Projects at 9705080909.",
    },
  ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        ogImage="https://www.naani.in/linq-by-raghava/linq-by-raghava-elevation-hero.jpg"
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
              <span className="text-amber-400 font-medium">LINQ by Raghava</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Text Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm px-4 py-1.5 rounded-full font-semibold">
                  <Sparkles size={16} />
                  <span>City Connected, Nature Surrounded • Neopolis Kokapet</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  LINQ by Raghava Neopolis, Kokapet, Hyderabad – <span className="text-amber-400">Luxury 3 BHK Residences</span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  A landmark residential community designed around spacious 3 BHK homes, elevated lifestyle amenities, sky-level experiences, and the connectivity advantage of West Hyderabad.
                </p>

                {/* Key Quick Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Project Area</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">9.2 Acres</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Towers & Floors</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">4 Towers (58 Floors)</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Residence Sizes</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">1,798 – 2,388 Sq.Ft.</div>
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
                    href={`https://wa.me/91${CONTACT_PHONE}?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20LINQ%20by%20Raghava%20Neopolis%20Kokapet.`}
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
                    src={elevationHero}
                    alt="LINQ by Raghava Neopolis Kokapet Hyderabad 58 Storey Towers Architecture"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B101D]/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Developer: Raghava Projects</span>
                      <span className="text-amber-400 font-bold">Kokapet, Neopolis</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">4 Towers (58 Storeys) • 5.5 Lakh+ Sq.Ft. Amenities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Project Facts Strip */}
        <section className="py-12 bg-[#0B101D] border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { label: "Land Parcel", val: "9.2 Acres", sub: "Master planned site" },
                { label: "Towers", val: "4 Towers", sub: "Towers A, B, C & D" },
                { label: "Tower Height", val: "58 Floors", sub: "High-rise skyline" },
                { label: "Configuration", val: "3 BHK", sub: "Spacious layouts" },
                { label: "Size Range", val: "1,798–2,388", sub: "Sq.Ft. saleable" },
                { label: "Amenity Area", val: "5.5 Lakh+", sub: "Sq.Ft. lifestyle spaces" },
                { label: "Micro Market", val: "Neopolis", sub: "Kokapet corridor" },
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

        {/* Section 1: LINQ by Raghava Overview */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Building2 size={16} />
                <span>Project Overview</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                LINQ by Raghava Overview – Ultra-Luxury 3 BHK Community
              </h2>

              <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  LINQ by Raghava is a premium 3 BHK residential community located in Kokapet, close to Neopolis in West Hyderabad. Spanning approximately 9.2 acres, the development features four iconic high-rise towers rising 58 floors high against the skyline.
                </p>
                <p>
                  Residences range from approximately 1,798 sq.ft. to 2,388 sq.ft., offering well-planned 3 BHK living spaces crafted for modern urban families, work-from-home flexibility, and entertaining. Rather than compact apartments, LINQ focuses on generous spatial proportions, expansive windows, and private balcony decks.
                </p>
                <p>
                  The project's lifestyle ecosystem is highlighted by over 5,50,000 sq.ft. of amenities, including a central clubhouse, <strong>The Nest</strong> sky bridge social zone, and <strong>The Celestia</strong> rooftop deck with elevated viewing arenas toward Gandipet Lake and Neopolis.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <CTAButton
                  text="Get Project Details"
                  onClick={() => openLeadModal("Overview CTA - Get Details")}
                />
                <button
                  onClick={() => openLeadModal("Overview CTA - Request Cost Sheet")}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-700 transition-all"
                >
                  <FileText size={18} className="text-amber-400" />
                  Get Latest Cost Sheet
                </button>
              </div>
            </div>

            {/* Right Card / Highlights */}
            <div className="lg:col-span-5 bg-[#0D1426] border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-amber-500/20 pb-3">
                Key Project Highlights
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>9.2 Acre Land Parcel:</strong> Master-planned gated community with central green parklands.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>Four 58-Storey Towers:</strong> Iconic vertical architecture with elevated panoramic views.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>Spacious 3 BHK Homes:</strong> 1,798 to 2,388 sq.ft. saleable configurations with wide balconies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>5.5 Lakh+ Sq.Ft. Amenities:</strong> Comprehensive clubhouse, sports, wellness, and leisure facilities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5" size={18} />
                  <span><strong>The Nest & The Celestia:</strong> Sky bridge social zones and rooftop amphitheatre facing Gandipet lake vistas.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Why LINQ by Raghava Stands Out */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-semibold">
                <Sparkles size={14} />
                <span>Core Differentiators</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Why LINQ by Raghava Stands Out
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Eight architectural and lifestyle features that make LINQ by Raghava a landmark address in Kokapet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "1. 9.2-Acre Community",
                  desc: "Expansive land parcel allowing dedicated green parklands, sports arenas, internal boulevard driveways, and central clubhouse facilities.",
                  icon: Leaf,
                },
                {
                  title: "2. Four 58-Storey Towers",
                  desc: "Striking high-rise silhouette designed for vertical elegance, wide views, natural ventilation, and optimal solar orientation.",
                  icon: Building2,
                },
                {
                  title: "3. Spacious 3 BHK Homes",
                  desc: "Residences ranging from 1,798 to 2,388 sq.ft. tailored for families seeking expansive living rooms, larger bedrooms, and utility spaces.",
                  icon: Maximize2,
                },
                {
                  title: "4. 5.5 Lakh+ Sq.Ft. Amenities",
                  desc: "One of Kokapet's largest lifestyle amenity footprints encompassing indoor sports, wellness, banquet facilities, and sky lounges.",
                  icon: Layers,
                },
                {
                  title: "5. The Nest Sky Lifestyle Zone",
                  desc: "Elevated sky-bridge connecting the towers, featuring private lounge areas, co-working pods, and sunset viewing terraces.",
                  icon: Sparkles,
                },
                {
                  title: "6. The Celestia Rooftop Deck",
                  desc: "Rooftop amphitheatre, stargazing deck, and outdoor performance arena with views toward Gandipet Lake and city skyline.",
                  icon: Star,
                },
                {
                  title: "7. Central Clubhouse Heart",
                  desc: "Multi-level clubhouse offering grand reception, banquet hall, fitness centre, indoor games, and private dining rooms.",
                  icon: Shield,
                },
                {
                  title: "8. Neopolis & ORR Access",
                  desc: "Situated minutes from Neopolis business hub, Kokapet ORR Exit (5 min), Financial District (8 min), and Gachibowli.",
                  icon: MapPin,
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-amber-500/40 transition-all hover:scale-[1.02]">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-bold text-white">{card.title}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: 3 BHK Residences & Floor Plan Preview */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              3 BHK Residences at LINQ by Raghava
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Explore the published configuration sizes and layout options across Towers A, B, C, and D.
            </p>
          </div>

          {/* Configuration Table */}
          <div className="bg-[#0D1426] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-6 p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-[#0B101D] text-amber-400 font-bold uppercase text-xs">
                  <tr>
                    <th className="p-4 border-b border-slate-800">Configuration</th>
                    <th className="p-4 border-b border-slate-800">Size Range (Approx.)</th>
                    <th className="p-4 border-b border-slate-800">Key Features</th>
                    <th className="p-4 border-b border-slate-800 text-right">Floor Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="p-4 font-semibold text-white">3 BHK Compact Variant</td>
                    <td className="p-4 text-amber-400 font-bold">1,798 Sq.Ft.</td>
                    <td className="p-4">Efficient 3 BHK layout with living balcony and utility space</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 3BHK 1798")} className="text-xs font-bold text-amber-400 hover:underline">Request Plan</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">3 BHK Standard Variant</td>
                    <td className="p-4 text-amber-400 font-bold">1,950 – 2,100 Sq.Ft.</td>
                    <td className="p-4">Spacious living-dining area with extended foyer and master suite</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 3BHK Standard")} className="text-xs font-bold text-amber-400 hover:underline">Request Plan</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">3 BHK Large Format Variant</td>
                    <td className="p-4 text-amber-400 font-bold">2,388 Sq.Ft.</td>
                    <td className="p-4">Premium 3 BHK layout with wide deck balcony, servant/utility space & corner views</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLeadModal("Floorplan - 3BHK 2388")} className="text-xs font-bold text-amber-400 hover:underline">Request Plan</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Info size={14} className="text-amber-400" />
                <span>Sizes mentioned are indicative saleable area configurations. Contact Naani Projects for unit-wise floor plans and cost sheets.</span>
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
                LINQ by Raghava Architectural Gallery & Master Plan
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                View official render imagery of the four 58-storey towers, 'The Nest' sky bridge, 'The Celestia' rooftop deck, and master layout plan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1: Day Elevation Hero */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={elevationHero}
                  alt="LINQ by Raghava 4 High-Rise 58-Storey Towers Kokapet"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">Four 58-Storey High-Rise Towers</h3>
                  <p className="text-xs text-slate-400 mt-1">Rising across 9.2 green acres with "City Connected, Nature Surrounded" positioning.</p>
                </div>
              </div>

              {/* Image 2: Sky Bridge The Nest */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={skyBridge}
                  alt="LINQ by Raghava The Nest Sky Bridge Social Lounge"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400">The Nest – Sky Bridge Lifestyle Zone</h3>
                  <p className="text-xs text-slate-400 mt-1">Elevated sky lounge connecting high-rise towers with panoramic vistas.</p>
                </div>
              </div>

              {/* Image 3: The Celestia Rooftop Deck */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={skyAmenitiesRooftop}
                  alt="LINQ by Raghava The Celestia Rooftop Sky Amphitheatre and Stargazing Deck"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">The Celestia – Rooftop Experience</h3>
                  <p className="text-xs text-slate-400 mt-1">Rooftop sky deck, outdoor performance amphitheatre, stargazing, and sky dining café.</p>
                </div>
              </div>

              {/* Image 4: Master Layout Plan */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all md:col-span-2 lg:col-span-2">
                <img
                  src={masterLayoutPlan}
                  alt="LINQ by Raghava 9.2-Acre Site Master Layout Plan Towers A B C D and Clubhouse"
                  className="w-full h-72 object-contain bg-white/5 p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400">Master Layout Plan (Towers A, B, C, D & Clubhouse)</h3>
                  <p className="text-xs text-slate-400 mt-1">9.2-acre master layout showing internal driveways, central parklands, and clubhouse positioning.</p>
                </div>
              </div>

              {/* Image 5: Brand Collage */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={brandCollage}
                  alt="LINQ by Raghava Brand Identity and Architecture Collage"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">LINQ Brand Vision & Identity</h3>
                  <p className="text-xs text-slate-400 mt-1">Combining modern architecture, sky experiences, and Raghava Projects quality.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: LINQ by Raghava Amenities */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              LINQ by Raghava Amenities (5.5 Lakh+ Sq.Ft.)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              A comprehensive multi-tiered lifestyle offering divided across 6 curated amenity categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category 1: Fitness & Wellness */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Shield size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Fitness & Wellness</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Fully equipped air-conditioned gymnasium</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Yoga & meditation deck</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Outdoor swimming pool & deck</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Aerobics and fitness studio</li>
              </ul>
            </div>

            {/* Category 2: Sports */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Sports & Athletics</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Indoor badminton courts</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Outdoor tennis court</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Cricket practice nets</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Dedicated cycling lanes & jogging track</li>
              </ul>
            </div>

            {/* Category 3: Family & Children */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Home size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Family & Children</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Multi-age kids outdoor play area</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Family recreation lawns</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Toddler splash pool</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Seated Senior Citizens' park</li>
              </ul>
            </div>

            {/* Category 4: Social & Community */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Building2 size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Social & Community</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Central multi-level clubhouse</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Multipurpose banquet hall</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Indoor games room & billiards</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Community gathering plazas</li>
              </ul>
            </div>

            {/* Category 5: Sky-Level Experiences */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Star size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Sky-Level Experiences</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> The Nest sky bridge lifestyle zone</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> The Celestia rooftop stargazing deck</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Outdoor performance amphitheatre</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Sky dining café & private party space</li>
              </ul>
            </div>

            {/* Category 6: Outdoor & Infrastructure */}
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                  <Leaf size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Outdoor & Infrastructure</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Landscaped central park gardens</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> 24x7 security monitoring with smart access</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Multi-level basement parking</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> EV charging station provisions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Location & Micro Market Focus */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-semibold">
                <MapPin size={14} />
                <span>Micro Market Focus</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                LINQ by Raghava Location – Neopolis, Kokapet
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Positioned in Kokapet, adjacent to Neopolis Business District in West Hyderabad.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Location Text Column */}
              <div className="lg:col-span-7 text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  <strong>Kokapet and Neopolis</strong> represent West Hyderabad's premier growth corridor for luxury high-rise living and corporate headquarters. Featuring wide multi-lane sector roads, underground utility ducting, and direct access to the Outer Ring Road (ORR), the locality offers urban infrastructure built for future density.
                </p>
                <p>
                  LINQ by Raghava is positioned just ~1-2 minutes from the Neopolis commercial boundary and ~5 minutes from the <strong>Kokapet ORR Exit</strong>. This gives residents effortless commute times to Financial District (GAR InfoBahn, WaveRock, Microsoft, Amazon), Gachibowli, Nanakramguda, and Raidurg Metro Station.
                </p>
                <p>
                  Families living at LINQ enjoy immediate proximity to top international schools (Phoenix Greens 10 min, Oakridge 12 min, Glendale 15 min, ISB 12 min), multispecialty hospitals (Continental 10 min, AIG 15 min, CARE 18 min), and lifestyle destinations (Inorbit Mall 15 min, Sarath City Capital Mall 18 min).
                </p>
              </div>

              {/* Location Table Column */}
              <div className="lg:col-span-5 bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-amber-500/20 pb-3">
                  Published Travel-Time References
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="py-2.5 font-medium text-white">Neopolis Business District</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~2 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Kokapet ORR Exit</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~5 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Financial District</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~8 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Phoenix Greens Intl School</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~10 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Continental Hospitals</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~10 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Oakridge International School / ISB</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~12 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Raidurg Metro Station</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~15 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Inorbit Mall / SLN Terminus</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~15 min</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-medium text-white">Rajiv Gandhi Intl Airport</td>
                        <td className="py-2.5 text-right font-bold text-amber-400">~35 min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-[11px] text-slate-500 pt-1">
                  Travel times are approximate based on published project location references under normal traffic conditions. Actual times may vary.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Developer Profile */}
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#0D1426] border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              About Raghava Projects
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Raghava Projects is a professionally managed real-estate and infrastructure conglomerate that commenced operations in 1991. Over three decades, the group has developed expertise spanning heavy civil engineering, urban infrastructure, high-rise construction, and luxury residential communities across Telangana and Andhra Pradesh.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              With projects like LINQ by Raghava, the group emphasizes architectural innovation, structural safety, high-rise engineering, and large-format amenity spaces crafted for multi-generational family living.
            </p>
          </div>
        </section>

        {/* Section 8: Objective Evaluation & Buyer Perspective */}
        <section className="py-12 md:py-16 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Who Is LINQ by Raghava Suited For?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                An objective analysis of target buyer profiles and key decision factors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 text-sm leading-relaxed">
              <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Ideal Buyer Profiles
                </h3>
                <ul className="space-y-2">
                  <li>• <strong>Families Seeking Space:</strong> Buyers prioritizing large 3 BHK layouts (1,798 – 2,388 sq.ft.) over compact formats.</li>
                  <li>• <strong>IT & Corporate Executives:</strong> Professionals seeking short commutes to Financial District (8 min) and Neopolis (2 min).</li>
                  <li>• <strong>Lifestyle & High-Rise Enthusiasts:</strong> Buyers seeking sky-level amenities, rooftop stargazing decks, and 5.5 lakh+ sq.ft. amenity spaces.</li>
                </ul>
              </div>

              <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                  <Info size={18} className="text-amber-400" />
                  Buyer Evaluation Checklist
                </h3>
                <ul className="space-y-2">
                  <li>• <strong>Possession Schedule:</strong> Verify RERA possession dates with official client documentation (`[Confirm with client]`).</li>
                  <li>• <strong>Cost Breakup & Charges:</strong> Evaluate floor rise charges, view premiums, maintenance deposits, and statutory taxes.</li>
                  <li>• <strong>Orientation & Views:</strong> Check individual unit orientation and tower placement for lake/skyline view preferences.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0D1426] p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
              <p>
                <em>Summary Note:</em> LINQ by Raghava offers a strong proposition for end-users seeking spacious 3 BHK homes in Kokapet with extensive amenity infrastructure. Buyers are advised to independently verify inventory, pricing, and RERA registration documents before booking.
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
                  LINQ by Raghava Telangana RERA Registration: <span className="text-amber-400">{RERA_NO}</span>
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
              <strong>RERA Disclaimer:</strong> LINQ by Raghava is registered under Telangana RERA bearing registration number <strong>{RERA_NO}</strong>. Buyers are advised to independently verify the project's RERA registration, approved building plans, specifications, unit layouts, cost sheet breakup, payment schedules, possession commitments, applicable statutory charges, and legal disclosures with the promoter (Raghava Projects) and official Telangana RERA authorities before making any purchase decision. Information published on Naani Projects is for general informational purposes only and may change without prior notice.
            </p>
          </div>
        </section>

        {/* Section 10: FAQ Section */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Frequently Asked Questions – LINQ by Raghava
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Got questions about LINQ by Raghava Kokapet? Find verified answers below.
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
              Schedule Your Site Visit to LINQ by Raghava
            </h2>
            <p className="text-slate-300 text-base max-w-2xl mx-auto">
              Request updated price details, unit cost sheets, floor plan brochures, or schedule a private site visit with our senior real estate advisors.
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
            href={`https://wa.me/91${CONTACT_PHONE}?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20LINQ%20by%20Raghava%20Neopolis%20Kokapet.`}
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
