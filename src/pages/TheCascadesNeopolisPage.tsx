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
import elevationHero from "@/assets/cascades/the-cascades-neopolis-elevation-hero.jpg";
import skyLoungeClouds from "@/assets/cascades/the-cascades-neopolis-sky-lounge-clouds.jpg";
import clubhouseLakeside from "@/assets/cascades/the-cascades-neopolis-clubhouse-lakeside.jpg";
import entranceDriveway from "@/assets/cascades/the-cascades-neopolis-grand-entrance-driveway.jpg";
import nightFacadeLighting from "@/assets/cascades/the-cascades-neopolis-night-facade-lighting.jpg";

const PROJECT_NAME = "The Cascades Neopolis";
const RERA_NO = "P02400009538";
const HMDA_NO = "003505/BP/HMDA/0728/SKP/2024";

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
    className={`lead-btn inline-flex items-center gap-2 bg-[#0080FF] hover:bg-[#006bd6] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105 ${className}`}
  >
    <MessageCircle size={18} />
    {text}
  </button>
);

const faqs = [
  {
    q: "What is The Cascades Neopolis?",
    a: "The Cascades Neopolis is an ultra-luxury high-rise residential development located in Plot No. 14, Neopolis Layout II, Kokapet, Hyderabad. Spanning 7.34 acres, it features five 63-storey towers standing 216.23 metres tall, offering 1,189 regular 3 & 4 BHK residences and 10 exclusive triplex penthouses.",
  },
  {
    q: "Where is The Cascades Neopolis located?",
    a: "The Cascades Neopolis is located in Plot No. 14, Neopolis Layout II, Kokapet, Hyderabad, Telangana – 500075. It enjoys direct connectivity to the Outer Ring Road (ORR), Financial District, Gachibowli, and Rajiv Gandhi International Airport.",
  },
  {
    q: "Who is developing The Cascades Neopolis?",
    a: "The Cascades Neopolis is developed by GHR Lakshmi Urbanblocks Infra LLP — a consortium formed in 2023 combining GHR Infra (est. 2019), Lakshmi Infra (est. 2007), and Urbanblocks Realty.",
  },
  {
    q: "What is the RERA registration number of The Cascades Neopolis?",
    a: "The Cascades Neopolis is registered under Telangana RERA bearing registration number P02400009538. HMDA permission number is 003505/BP/HMDA/0728/SKP/2024.",
  },
  {
    q: "What configurations are available in The Cascades Neopolis?",
    a: "The primary official configurations are 3 BHK (2,560 – 3,390 sq.ft.), 4 BHK (3,895 – 4,825 sq.ft.), and 10 exclusive triplex penthouses. Certain campaign materials also reference 3.5 and 4.5 BHK variants; contact Naani Projects for current inventory details.",
  },
  {
    q: "What are the 3 BHK apartment sizes at The Cascades Neopolis?",
    a: "3 BHK apartments at The Cascades Neopolis range from 2,560 sq.ft. to 3,390 sq.ft. featuring spacious living rooms, expansive balconies, and private utility spaces.",
  },
  {
    q: "What are the 4 BHK apartment sizes at The Cascades Neopolis?",
    a: "4 BHK luxury apartments range from 3,895 sq.ft. to 4,825 sq.ft., offering grand foyer entrances, family lounges, servant quarters, and panoramic views of Neopolis.",
  },
  {
    q: "What is the price of apartments at The Cascades Neopolis?",
    a: "Campaign starting prices begin at ₹3.5 Cr* for 3/3.5 BHK and ₹5 Cr* for 4 BHK. Prices are dynamic and depend on unit size, floor, orientation, and taxes. Contact Naani Projects for the latest developer price sheet.",
  },
  {
    q: "What is the expected possession date for The Cascades Neopolis?",
    a: "Third-party and RERA schedules indicate an estimated possession starting around March 2030. Buyers are advised to confirm current possession milestones directly with the developer.",
  },
  {
    q: "What amenities are available at The Cascades Neopolis?",
    a: "The project features 2,00,000+ sq.ft. of amenity space spread across 7 distinct lifestyle levels, including a 50,000+ sq.ft. 7-storey clubhouse, lagoon pool, sky lounge, infinity pool, studio gym, hammam, sauna, sports courts, and 2 rooftop helipads.",
  },
  {
    q: "Does The Cascades have smart-home automation?",
    a: "Yes, every residence at The Cascades Neopolis is equipped with advanced smart-home automation compatible with Google Assistant and Amazon Alexa for lighting, climate, security, and access control.",
  },
  {
    q: "Is The Cascades Neopolis WELL Pre-Certified?",
    a: "According to the developer, The Cascades Neopolis is WELL Pre-Certified, designed around health and wellness factors including air purification, water filtration, natural lighting, and acoustic comfort.",
  },
  {
    q: "Is The Cascades IGBC certified?",
    a: "The project is positioned as IGBC Platinum Pre-Certified, emphasizing green building design, energy conservation, rainwater harvesting, and eco-friendly construction practices.",
  },
  {
    q: "How many towers are there in The Cascades Neopolis?",
    a: "The project comprises five ultra-tall high-rise towers.",
  },
  {
    q: "How many floors does each tower have?",
    a: "Each tower stands 63 storeys tall (216.23 metres), making it one of the tallest residential developments in Hyderabad.",
  },
  {
    q: "How many total apartments are there in The Cascades Neopolis?",
    a: "There are 1,199 total residences across the 7.34-acre development, including 1,189 regular 3 & 4 BHK apartments and 10 triplex penthouses.",
  },
  {
    q: "Does The Cascades have penthouses?",
    a: "Yes, The Cascades Neopolis features 10 exclusive triplex penthouses located on the top residential levels with private terraces and sky views.",
  },
  {
    q: "Does The Cascades have a clubhouse?",
    a: "Yes, it features a grand 50,000+ sq.ft. 7-storey clubhouse with luxury lounges, spa, VR gaming, mini-theatre, co-working spaces, and indoor sports.",
  },
  {
    q: "How far is The Cascades from Financial District?",
    a: "The Cascades is located right in Neopolis Layout, Kokapet, just 5 to 10 minutes from Financial District offices, IT hubs, and corporate parks.",
  },
  {
    q: "How is The Cascades connected to the Outer Ring Road (ORR)?",
    a: "Neopolis Kokapet has direct dedicated access ramps to ORR (Exit 1), providing seamless connectivity to Rajiv Gandhi International Airport (~25-30 mins) and HITEC City.",
  },
  {
    q: "Is The Cascades Neopolis suitable for end-use?",
    a: "Yes, with 2,00,000+ sq.ft. of lifestyle amenities, international design consultants (UHA London, Studio HBA, Coopers Hill, RWDI), and wellness certification, it is designed for ultra-luxury end-use living.",
  },
  {
    q: "Is The Cascades Neopolis suitable for real estate investment?",
    a: "Neopolis Kokapet is Hyderabad's premier high-growth luxury corridor. Investors evaluate entry price, unit layout, developer reputation, and holding timeline for long-term appreciation.",
  },
  {
    q: "How can I schedule a site visit to The Cascades Neopolis?",
    a: "You can schedule a site visit by clicking any 'Schedule Site Visit' button on this page, calling +91 9705080909, or messaging our Naani Projects advisory team on WhatsApp.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.naani.in/projects/the-cascades-neopolis#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
        { "@type": "ListItem", position: 3, name: "Hyderabad", item: "https://www.naani.in/hyderabad" },
        { "@type": "ListItem", position: 4, name: "Kokapet", item: "https://www.naani.in/projects-in-kokapet" },
        { "@type": "ListItem", position: 5, name: "The Cascades Neopolis", item: "https://www.naani.in/projects/the-cascades-neopolis" },
      ],
    },
    {
      "@type": "RealEstateListing",
      "@id": "https://www.naani.in/projects/the-cascades-neopolis#listing",
      name: "The Cascades Neopolis Kokapet",
      url: "https://www.naani.in/projects/the-cascades-neopolis",
      description: "Ultra-luxury 3 & 4 BHK apartments and triplex penthouses in Neopolis Layout, Kokapet, Hyderabad by GHR Lakshmi Urbanblocks Infra LLP.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot No. 14, Neopolis Layout II, Kokapet",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500075",
        addressCountry: "IN",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.naani.in/projects/the-cascades-neopolis#faq",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const TheCascadesNeopolisPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("Direct Click");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const openLeadModal = (source: string) => {
    setPopupSource(source);
    setPopupOpen(true);
  };

  return (
    <>
      <SEOHead
        title="The Cascades Neopolis Hyderabad | Price, Floor Plans & RERA"
        description="Explore The Cascades Neopolis in Kokapet, Hyderabad. View 3 & 4 BHK sizes, prices, floor plans, amenities, RERA details, location and project highlights."
        canonicalUrl="https://www.naani.in/projects/the-cascades-neopolis"
        ogType="website"
        jsonLd={structuredData}
      />

      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans">
        <ProjectsHeader />

        {/* Hero Section */}
        <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-[#0B101D] via-[#0D1426] to-[#090D16] border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6 overflow-x-auto whitespace-nowrap pb-1">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <span>/</span>
              <Link to="/hyderabad" className="hover:text-amber-400 transition-colors">Hyderabad</Link>
              <span>/</span>
              <Link to="/projects-in-kokapet" className="hover:text-amber-400 transition-colors">Kokapet</Link>
              <span>/</span>
              <span className="text-amber-400 font-medium">The Cascades Neopolis</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm px-3 py-1.5 rounded-full font-semibold">
                  <Sparkles size={14} />
                  <span>Ultra-Luxury 63-Storey High-Rise Towers</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  The Cascades Neopolis Kokapet, Hyderabad – <span className="text-amber-400">3 & 4 BHK Luxury Apartments</span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Experience 7.34 acres of iconic architecture in Neopolis Kokapet. Featuring 5 majestic 63-storey towers (216.23m), 2,00,000+ sq.ft. of 7-level lifestyle amenities, international design consultants (UHA London, Studio HBA, Coopers Hill, RWDI), and Google/Alexa smart home automation.
                </p>

                {/* Key Quick Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Towers & Height</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">5 Towers (63 Floors)</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Total Residences</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">1,199 Homes</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">Clubhouse & Amenities</div>
                    <div className="text-sm font-bold text-amber-400 mt-0.5">2,50,000+ sq.ft.</div>
                  </div>
                  <div className="bg-[#0D1426] border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-xs text-slate-400">RERA Registration</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5">{RERA_NO}</div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <CTAButton
                    text="Get Price & Floor Plans"
                    onClick={() => openLeadModal("Hero CTA - Get Price")}
                  />
                  <button
                    onClick={() => openLeadModal("Hero CTA - Schedule Site Visit")}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl border border-slate-700 transition-all hover:scale-105"
                  >
                    <Calendar size={18} className="text-amber-400" />
                    Schedule Site Visit
                  </button>
                  <a
                    href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20The%20Cascades%20Neopolis%20Kokapet."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl transition-all"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Advisor
                  </a>
                </div>
              </div>

              {/* Right Image Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-[#0F1629]">
                  <img
                    src={elevationHero}
                    alt="The Cascades Neopolis Kokapet 63 Storey High Rise Towers Architecture"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B101D]/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Developer: GHR Lakshmi Urbanblocks Infra LLP</span>
                      <span className="text-amber-400 font-bold">Neopolis, Kokapet</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">Starting from ₹3.5 Cr* onwards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Overview & Quick Facts */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-amber-500/30 pb-3">
                The Cascades Neopolis Overview
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                <strong>The Cascades Neopolis</strong> is an ultra-luxury high-rise residential landmark situated in Plot No. 14, Neopolis Layout II, Kokapet, Hyderabad. Developed by <strong>GHR Lakshmi Urbanblocks Infra LLP</strong>, the project sets a new benchmark for West Hyderabad's skyline with five towering 63-storey residential structures standing 216.23 metres tall.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Spread over <strong>7.34 acres</strong>, the development accommodates 1,199 residences comprising 1,189 regular 3 & 4 BHK apartments and 10 exclusive triplex penthouses. The project features over 2,00,000 sq.ft. of amenity space designed across 7 vertical lifestyle levels, including a 50,000+ sq.ft. 7-storey clubhouse, twin rooftop helipads, lagoon-style pools, and international design consultant partnerships.
              </p>

              {/* Key Features Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "7.34 Acre Prime Neopolis Layout II Land",
                  "Five 63-Storey Towers (216.23m Height)",
                  "1,189 Regular 3 & 4 BHKs + 10 Penthouses",
                  "50,000+ sq.ft. 7-Storey Clubhouse",
                  "2,00,000+ sq.ft. 7-Level Amenity Concept",
                  "Two Rooftop Helipads",
                  "WELL Pre-Certified & IGBC Platinum Pre-Certified",
                  "Google & Alexa Smart Home Automation",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-200 bg-[#0F1629] p-3 rounded-lg border border-slate-800">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Quick Facts Table */}
            <div className="lg:col-span-5 bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-3 flex items-center gap-2">
                <Building2 size={20} className="text-amber-400" />
                Quick Project Facts
              </h3>
              <div className="divide-y divide-slate-800 text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Project Name</span>
                  <span className="font-semibold text-white">The Cascades Neopolis</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Developer</span>
                  <span className="font-semibold text-amber-400">GHR Lakshmi Urbanblocks Infra LLP</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Location</span>
                  <span className="font-semibold text-white">Neopolis, Kokapet, Hyderabad</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Project Area</span>
                  <span className="font-semibold text-white">7.34 Acres</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Towers / Height</span>
                  <span className="font-semibold text-white">5 Towers (63 Storeys / 216.23m)</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Total Units</span>
                  <span className="font-semibold text-white">1,199 (1,189 3/4 BHK + 10 Penthouses)</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Clubhouse Size</span>
                  <span className="font-semibold text-amber-400">50,000+ sq.ft. (7 Storeys)</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">TG RERA No.</span>
                  <span className="font-semibold text-emerald-400">{RERA_NO}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">HMDA Approval</span>
                  <span className="font-semibold text-slate-300">{HMDA_NO}</span>
                </div>
              </div>

              <div className="pt-3">
                <CTAButton
                  text="Download Brochure & RERA Doc"
                  className="w-full justify-center"
                  onClick={() => openLeadModal("Quick Facts - Download Brochure")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Pricing & Configurations */}
        <section className="py-12 md:py-16 bg-[#0D1426] border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                The Cascades Neopolis Price & Configurations
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Explore available unit sizes, floor plan configurations, and indicative starting price points for 3 & 4 BHK ultra-luxury residences and triplex penthouses.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-[#0B101D] border border-slate-800 rounded-xl overflow-hidden text-sm">
                <thead>
                  <tr className="bg-slate-800/80 text-amber-400 uppercase text-xs tracking-wider">
                    <th className="p-4 border-b border-slate-700">Configuration</th>
                    <th className="p-4 border-b border-slate-700">Super Built-Up Area</th>
                    <th className="p-4 border-b border-slate-700">Advertised Starting Price</th>
                    <th className="p-4 border-b border-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-white">3 BHK Luxury Residence</td>
                    <td className="p-4">2,560 – 3,390 sq.ft.</td>
                    <td className="p-4 text-amber-400 font-bold">₹3.5 Cr* onwards</td>
                    <td className="p-4">
                      <button
                        onClick={() => openLeadModal("Table 3BHK - Get Price")}
                        className="text-xs bg-[#0080FF] hover:bg-[#006bd6] text-white px-3 py-1.5 rounded-md font-bold"
                      >
                        Request Cost Sheet
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-white">4 BHK Ultra-Luxury Residence</td>
                    <td className="p-4">3,895 – 4,825 sq.ft.</td>
                    <td className="p-4 text-amber-400 font-bold">₹5.0 Cr* onwards</td>
                    <td className="p-4">
                      <button
                        onClick={() => openLeadModal("Table 4BHK - Get Price")}
                        className="text-xs bg-[#0080FF] hover:bg-[#006bd6] text-white px-3 py-1.5 rounded-md font-bold"
                      >
                        Request Cost Sheet
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-white">Triplex Penthouses (10 Units)</td>
                    <td className="p-4">Custom Sky Villa Layouts</td>
                    <td className="p-4 text-amber-400 font-bold">₹6.0 Cr* onwards</td>
                    <td className="p-4">
                      <button
                        onClick={() => openLeadModal("Table Penthouse - Get Price")}
                        className="text-xs bg-[#0080FF] hover:bg-[#006bd6] text-white px-3 py-1.5 rounded-md font-bold"
                      >
                        Enquire Inventory
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mandatory Price Disclaimer */}
            <div className="bg-[#0B101D] border border-amber-500/20 p-4 rounded-xl text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Info size={14} />
                Pricing Disclaimer
              </div>
              <p>
                Prices are indicative starting values and subject to change based on configuration, floor rise, orientation, view, applicable statutory taxes, floor-plan variations, and developer availability. Contact Naani Projects for the latest verified developer price sheet and unit availability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: 7 Levels of Lifestyle Amenities */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Seven Levels of Lifestyle Amenities
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              The Cascades Neopolis introduces a 2,00,000+ sq.ft. multi-tiered amenity ecosystem curated across 7 vertical levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                lvl: "Level 1 — Groundscape",
                desc: "Grand entry plaza, landscaped green lawns, dedicated cycling tracks, visitor parking, and outdoor walking promenades.",
                icon: Leaf,
              },
              {
                lvl: "Level 2 — Under Tower",
                desc: "Guest lounges, quiet reading library, gaming zone, children's play court, crèche, art & pottery studio, co-working hub, and guest rooms.",
                icon: Building2,
              },
              {
                lvl: "Level 3 — Podium",
                desc: "Lagoon-style swimming pool, kids splash pool, lap pool, landscaped gardens, walking trail, outdoor amphitheatre, cricket and basketball courts.",
                icon: Sparkles,
              },
              {
                lvl: "Level 4 — 50,000+ sq.ft. Clubhouse",
                desc: "7-storey clubhouse featuring wellness spa, library, VR gaming lounge, mini theatre, social lounges, and fitness centres.",
                icon: Layers,
              },
              {
                lvl: "Level 5 — Tower Lifestyle Lounges",
                desc: "Dedicated tower-level private TV lounge, private dining suites, card rooms, and executive reading corners.",
                icon: Home,
              },
              {
                lvl: "Level 6 — Sky Lounge",
                desc: "Sky-level indoor plunge pool, studio gym, Turkish hammam, sauna, executive business lounge, and panoramic city decks.",
                icon: Zap,
              },
              {
                lvl: "Level 7 — Sky Garden & Rooftop Helipads",
                desc: "Rooftop sky garden, infinity pool, outdoor dining areas, seating pods, walking paths, and twin rooftop helipads.",
                icon: Shield,
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <IconComp size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.lvl}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Official Architectural Visuals & Project Renders */}
        <section className="py-12 md:py-20 bg-[#0B101D] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3 py-1 rounded-full font-semibold">
                <Sparkles size={14} />
                <span>Official Project Renders</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                The Cascades Neopolis Architecture & Visual Gallery
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Explore the iconic 63-storey high-rise towers, sky lounge above clouds, 7-storey lakeside clubhouse, grand entrance drop-off, and glowing night facade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1: High Rise Towers */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={elevationHero}
                  alt="The Cascades Neopolis 63 Storey Towers and Helipad View"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">5 High-Rise Towers (216.23m)</h3>
                  <p className="text-xs text-slate-400 mt-1">Iconic 63-storey towers with twin rooftop helipads designed by UHA London.</p>
                </div>
              </div>

              {/* Image 2: Sky Lounge in Clouds */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={skyLoungeClouds}
                  alt="The Cascades Neopolis Sky Lounge Sky Plunge Pool Above Clouds"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400">Sky Lounge Above Clouds</h3>
                  <p className="text-xs text-slate-400 mt-1">Level 6 & 7 sky lounges featuring sky plunge pool, infinity deck, and sunset views.</p>
                </div>
              </div>

              {/* Image 3: 7-Storey Clubhouse & Podium */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all">
                <img
                  src={clubhouseLakeside}
                  alt="The Cascades Neopolis 50,000 sq ft 7-Storey Clubhouse and Podium"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">50,000+ sq.ft. Clubhouse & Podium</h3>
                  <p className="text-xs text-slate-400 mt-1">7-storey clubhouse with lagoon pools, sports courts, and lush landscaped gardens.</p>
                </div>
              </div>

              {/* Image 4: Grand Entrance Driveway */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all lg:col-span-1">
                <img
                  src={entranceDriveway}
                  alt="The Cascades Neopolis Grand Entrance Drop-off Driveway"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-white">Grand Entrance Plaza & Drop-Off</h3>
                  <p className="text-xs text-slate-400 mt-1">Level 1 Groundscape featuring double-height lobby drop-off and green buffer zones.</p>
                </div>
              </div>

              {/* Image 5: Night Facade Lighting */}
              <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1426] shadow-xl hover:border-amber-500/50 transition-all md:col-span-2 lg:col-span-2">
                <img
                  src={nightFacadeLighting}
                  alt="The Cascades Neopolis Night Architectural Lighting Facade"
                  className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#0D1426] border-t border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400">Architectural Night Lighting Facade</h3>
                  <p className="text-xs text-slate-400 mt-1">Dramatic vertical accent lighting outlining the 63-storey silhouette across Neopolis skyline.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: International Design Consultants & Smart Home */}
        <section className="py-12 md:py-16 bg-[#0D1426] border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* International Consultants */}
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-white border-b border-amber-500/30 pb-3">
                  World-Class International Consultants
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The Cascades Neopolis brings together globally renowned architecture, landscape, and engineering firms to craft an international landmark in Hyderabad:
                </p>
                <div className="space-y-4">
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
                    <div className="text-amber-400 font-bold text-base">UHA London</div>
                    <div className="text-slate-300 text-xs mt-1">Concept & Architectural Design Consultant</div>
                  </div>
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
                    <div className="text-amber-400 font-bold text-base">Studio HBA</div>
                    <div className="text-slate-300 text-xs mt-1">Luxury Interior Design Consultant</div>
                  </div>
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
                    <div className="text-amber-400 font-bold text-base">Coopers Hill</div>
                    <div className="text-slate-300 text-xs mt-1">Landscape Architecture & Design</div>
                  </div>
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
                    <div className="text-amber-400 font-bold text-base">RWDI</div>
                    <div className="text-slate-300 text-xs mt-1">Wind Engineering & Environmental Microclimate Analysis</div>
                  </div>
                </div>
              </div>

              {/* Smart Home & Wellness */}
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-white border-b border-amber-500/30 pb-3">
                  Smart Home Automation & Sustainability
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every apartment is integrated with smart home technology compatible with Google Assistant and Amazon Alexa. According to developer published claims, The Cascades Neopolis is <strong>WELL Pre-Certified</strong> and <strong>IGBC Platinum Pre-Certified</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <Zap size={16} />
                      Voice & App Automation
                    </div>
                    <p className="text-xs text-slate-300">Control lighting, climate, security, and access via Google & Alexa smart home devices.</p>
                  </div>
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <Leaf size={16} />
                      WELL Pre-Certified
                    </div>
                    <p className="text-xs text-slate-300">Designed around air filtration, water quality, natural daylighting, and acoustic comfort.</p>
                  </div>
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <Award size={16} />
                      IGBC Platinum Pre-Certified
                    </div>
                    <p className="text-xs text-slate-300">Focusing on energy conservation, rainwater harvesting, and eco-friendly construction.</p>
                  </div>
                  <div className="bg-[#0B101D] p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <Shield size={16} />
                      7-Tier Security System
                    </div>
                    <p className="text-xs text-slate-300">24/7 CCTV surveillance, RFID access control, and biometric lobby security.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Location & Connectivity */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Cascades Neopolis Location & Connectivity
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Address: Plot No. 14, Neopolis Layout II, Kokapet, Hyderabad, Telangana – 500075. Located in Hyderabad's premier high-growth IT and commercial corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin size={20} className="text-amber-400" />
                Neopolis Kokapet Location Advantages
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Neopolis Kokapet is a master-planned 530-acre layout featuring wide 36m to 45m access roads, underground cabling, dedicated green belts, and direct access ramps to the Outer Ring Road (ORR).
              </p>
              <div className="divide-y divide-slate-800 text-sm">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Financial District</span>
                  <span className="font-semibold text-amber-400">~5-8 Mins</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Gachibowli IT Hub</span>
                  <span className="font-semibold text-white">~10-12 Mins</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Outer Ring Road (Exit 1)</span>
                  <span className="font-semibold text-white">Direct Access</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Rajiv Gandhi Intl Airport</span>
                  <span className="font-semibold text-white">~25-30 Mins via ORR</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">International Schools</span>
                  <span className="font-semibold text-white">Rockwell, Phoenix Greens nearby</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Hospitals</span>
                  <span className="font-semibold text-white">Continental Hospital nearby</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1426] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass size={20} className="text-amber-400" />
                Developer Profile: GHR Lakshmi Urbanblocks Infra LLP
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                The project is developed by <strong>GHR Lakshmi Urbanblocks Infra LLP</strong>, a development consortium formed in 2023 combining the expertise of three established real estate entities:
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="bg-[#0B101D] p-3 rounded-lg border border-slate-800">
                  <strong className="text-amber-400 text-sm block">GHR Infra</strong>
                  Established in 2019 in Hyderabad with founders V. Shyam Sunder Reddy & M. Karteesh Reddy bringing 35+ years of combined experience.
                </li>
                <li className="bg-[#0B101D] p-3 rounded-lg border border-slate-800">
                  <strong className="text-amber-400 text-sm block">Lakshmi Infra</strong>
                  Established in 2007 in Hyderabad under the leadership of Gummadi Lakshmi Narayana (CA).
                </li>
                <li className="bg-[#0B101D] p-3 rounded-lg border border-slate-800">
                  <strong className="text-amber-400 text-sm block">Urbanblocks Realty</strong>
                  Established real estate developer with long-standing expertise across West Hyderabad.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: RERA & Mandatory Legal Disclaimer */}
        <section className="py-10 bg-[#0D1426] border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText size={20} className="text-emerald-400" />
              RERA & Mandatory Legal Disclaimer
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed bg-[#0B101D] p-5 rounded-xl border border-slate-800">
              <strong>RERA Disclaimer:</strong> The Cascades Neopolis is registered under Telangana RERA bearing registration number <strong>{RERA_NO}</strong> (HMDA Permission No. {HMDA_NO}). Buyers are advised to independently verify the project's RERA registration, approved plans, specifications, pricing, payment schedule, possession schedule, applicable statutory charges, and legal details with the promoter (GHR Lakshmi Urbanblocks Infra LLP) and the official Telangana RERA portal before making any purchase decision. Information presented on Naani Projects is provided for general informational purposes and may change without prior notice.
            </p>
          </div>
        </section>

        {/* Section 7: FAQs */}
        <section className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-slate-300 text-sm">
              Answers to common queries regarding The Cascades Neopolis, Kokapet.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0D1426] border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-white flex items-center justify-between gap-4 hover:text-amber-400 text-sm sm:text-base transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp size={18} className="text-amber-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 pt-0 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 bg-[#0B101D]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Site Visit CTA Banner */}
        <section className="py-12 bg-gradient-to-r from-amber-500/20 via-[#0D1426] to-[#0080FF]/20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Explore The Cascades Neopolis?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Get the latest developer price breakup, 3D floor plans, brochure, and schedule an exclusive private site visit with our Naani Projects advisors.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <CTAButton
                text="Request Price Breakup & Floor Plans"
                onClick={() => openLeadModal("Bottom Banner - Request Price")}
              />
              <a
                href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I%20want%20to%20schedule%20a%20site%20visit%20for%20The%20Cascades%20Neopolis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all"
              >
                <MessageCircle size={18} />
                WhatsApp Us (+91 9705080909)
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <ProjectsFooter />

        {/* Unified Lead Capture Popup */}
        <LeadCapturePopup
          open={popupOpen}
          onOpenChange={setPopupOpen}
          source={popupSource}
          projectName={PROJECT_NAME}
        />

        {/* Scroll Triggered Popup */}
        <ScrollTriggerPopup projectName={PROJECT_NAME} />
      </div>
    </>
  );
};

export default TheCascadesNeopolisPage;
