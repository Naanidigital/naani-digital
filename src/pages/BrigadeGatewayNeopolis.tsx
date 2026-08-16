import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import { MessageCircle, Phone, MapPin, Building2, Layers, Maximize2, Star, ChevronDown, ChevronUp, Home, Zap, Shield, Leaf, Award } from "lucide-react";

import elevationImg from "@/assets/brigade/elevation.png";
import sideElevationImg from "@/assets/brigade/side-elevation.png";
import clubhouseElevationImg from "@/assets/brigade/clubhouse-elevation.png";
import layoutPlanImg from "@/assets/brigade/layout-plan.png";
import towerA1to32 from "@/assets/brigade/tower-a-floors-1-32.png";
import towerA34to50 from "@/assets/brigade/tower-a-floors-34-50.png";
import specsLuxury from "@/assets/brigade/specs-luxury.png";
import specsWashrooms from "@/assets/brigade/specs-washrooms.png";
import specsFinishes from "@/assets/brigade/specs-finishes.png";
import awardsImg from "@/assets/brigade/awards.png";

const PROJECT_NAME = "Brigade Gateway Neopolis";

const CTAButton = ({ text, className = "", onClick }: { text: string; message?: string; className?: string; onClick?: () => void }) => (
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
    q: "What is Brigade Gateway Neopolis in Hyderabad?",
    a: "Brigade Gateway Neopolis is a landmark mixed-use luxury residential development by Brigade Group located in Neopolis, Kokapet, Hyderabad. It comprises two ultra-premium high-rise towers (G+57 and G+60 floors) offering 3, 4, 5, and 6 BHK apartments and duplexes across approximately 9.7 acres, with ~594 premium units ranging from 3,067 to 9,859+ sq.ft.",
  },
  {
    q: "Where is Brigade Gateway Neopolis located near me in Hyderabad?",
    a: "Brigade Gateway Neopolis is located in Neopolis, Kokapet — one of Hyderabad's fastest-growing western real estate corridors. It is adjacent to the Outer Ring Road (ORR), minutes from HITEC City, Gachibowli, and Rajiv Gandhi International Airport, making it ideal for IT professionals and business executives.",
  },
  {
    q: "What types of apartments are available in Brigade Gateway Neopolis?",
    a: "Brigade Gateway Neopolis offers 3 BHK, 4 BHK, 5 BHK, and 6 BHK apartments along with sky villas and duplexes. Apartment sizes range from approximately 3,067 sq.ft. to 9,859+ sq.ft., with premium configurations featuring family lounges, home offices, maid's rooms, and private balconies.",
  },
  {
    q: "What amenities are offered at Brigade Gateway Neopolis?",
    a: "The project features a grand 2,30,000 sq.ft. clubhouse with swimming pool, spa, gym, library, and cafes; landscaped gardens; children's play areas; jogging tracks; sports courts; wellness zones; amphitheater; event plaza; sky lounge; and a helipad. It also includes 24/7 security, power backup, EV charging, and smart home automation provisions.",
  },
  {
    q: "Is Brigade Gateway Neopolis a good investment in Hyderabad?",
    a: "Yes. Kokapet's Neopolis zone is Hyderabad's most rapidly appreciating western corridor. With ORR connectivity, proximity to HITEC City and the international airport, strong infrastructure growth, and Brigade Group's track record, Brigade Gateway Neopolis offers excellent long-term capital appreciation and rental yield potential for investors.",
  },
  {
    q: "What is the price of apartments in Brigade Gateway Neopolis Kokapet?",
    a: "Pricing varies by configuration, floor, and unit orientation. For the latest pricing, payment plans, and availability, WhatsApp or call +91 9705080909 and our team will provide you with a customized quote within minutes.",
  },
  {
    q: "How do I book a site visit at Brigade Gateway Neopolis?",
    a: "Simply WhatsApp +91 9705080909 with your preferred date and time. Our team will confirm your slot and arrange a complimentary pickup if required. You can also call the same number for instant assistance.",
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-[#0B101D]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-[#0B101D] hover:bg-[#111726] transition-colors gap-4"
      >
        <span className="font-bold text-white text-sm md:text-base">{q}</span>
        {open ? <ChevronUp size={18} className="text-amber-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-amber-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#090D16] text-slate-300 font-medium text-sm leading-relaxed border-t border-amber-500/20">
          {a}
        </div>
      )}
    </div>
  );
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "@id": "https://www.naani.in/projects/brigade-gateway-neopolis-kokapet-hyderabad",
      "name": "Brigade Gateway Neopolis",
      "description": "Premium mixed-use luxury residential development by Brigade Group in Neopolis, Kokapet, Hyderabad. Features two high-rise towers (G+57/G+60) with 3, 4, 5, and 6 BHK apartments ranging from 3,067 to 9,859+ sq.ft. across ~9.7 acres.",
      "url": "https://www.naani.in/projects/brigade-gateway-neopolis-kokapet-hyderabad",
      "image": "https://www.naani.in/og-brigade-gateway-neopolis.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Neopolis, Kokapet",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500075",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.4062",
        "longitude": "78.3245"
      },
      "numberOfRooms": "3-6",
      "floorSize": {
        "@type": "QuantitativeValue",
        "minValue": 3067,
        "maxValue": 9859,
        "unitCode": "FTK"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "21000000",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Brigade Group"
        }
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.naani.in/#brigade-agent",
      "name": "Naani Projects – Brigade Gateway Neopolis Sales",
      "telephone": "+91-9705080909",
      "url": "https://www.naani.in/projects/brigade-gateway-neopolis-kokapet-hyderabad",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Neopolis, Kokapet",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500075",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9705080909",
        "contactType": "Sales",
        "availableLanguage": ["English", "Telugu", "Hindi"]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
        { "@type": "ListItem", "position": 3, "name": "Brigade Gateway Neopolis", "item": "https://www.naani.in/projects/brigade-gateway-neopolis-kokapet-hyderabad" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a }
      }))
    }
  ]
};

const BrigadeGatewayNeopolis = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("General");
  const openLead = (src: string) => { setPopupSource(src); setPopupOpen(true); };

  return (
    <div className="bg-[#090D16] text-white min-h-screen">
      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={popupSource} projectName={PROJECT_NAME} />
      <SEOHead
        title="Brigade Gateway Neopolis Kokapet | Luxury Apartments"
        description="Explore Brigade Gateway Neopolis – premium 3, 4, 5 & 6 BHK homes in Kokapet, Hyderabad with world-class amenities, sky-high towers, and excellent connectivity. Call/WhatsApp +91 9705080909."
        canonicalUrl="https://www.naani.in/projects/brigade-gateway-neopolis-kokapet-hyderabad"
        keywords="Brigade Gateway Neopolis Hyderabad, luxury apartments in Kokapet Hyderabad, 4 BHK flats near ORR Hyderabad, Brigade Group apartments Neopolis, Brigade Gateway Hyderabad real estate"
        ogImage="https://www.naani.in/og/brigade-gateway-neopolis.png"
        structuredData={structuredData}
      />
      <ProjectsHeader />

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={elevationImg}
            alt="Brigade Gateway Neopolis – Luxury High-Rise Towers in Kokapet Hyderabad"
            className="w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F1F1F1] via-[#F1F1F1]/70 to-[#F1F1F1]/20" />
        </div>

        <div className="relative z-10 px-4 md:px-8 pb-16 pt-24 max-w-5xl mx-auto w-full">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#0080FF]/30 text-[#0080FF] text-xs font-bold uppercase tracking-[0.2em] shadow-xs mb-3">
            Brigade Group · Neopolis, Kokapet, Hyderabad
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#040957] leading-tight mb-4">
            Brigade Gateway Neopolis –<br />
            <span className="text-[#0080FF]">
              Premium Luxury Homes in Kokapet, Hyderabad
            </span>
          </h1>
          <p className="text-slate-800 font-medium text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Brigade Gateway Neopolis offers 3–6 BHK residences with high-rise views and clubhouse amenities in Neopolis, Kokapet.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => openLead("Hero - Enquire Now")}
              className="lead-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-4 rounded-xl shadow-md transition-all hover:scale-105 text-base"
            >
              <MessageCircle size={20} />
              Enquire Now
            </button>
            <button
              onClick={() => openLead("Hero - Book Site Visit")}
              className="lead-btn inline-flex items-center gap-2 bg-[#0080FF] hover:bg-[#006bd6] text-white font-bold px-7 py-4 rounded-xl shadow-md transition-all text-base"
            >
              <Phone size={18} />
              Book a Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">About The Project</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Project Overview</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              Brigade Gateway Neopolis is a landmark mixed-use luxury development by the renowned <strong className="text-white">Brigade Group</strong>, spanning approximately <strong className="text-amber-400">9.7 acres</strong> in Neopolis, Kokapet — Hyderabad's premium western real estate corridor. This extraordinary project stands as a testament to architectural brilliance with two iconic residential towers soaring to <strong className="text-white">G+57 and G+60 floors</strong>, offering <strong className="text-amber-400">~594 premium residences</strong>.
            </p>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              From sprawling 3 BHK homes to palatial 6 BHK sky villas, every unit is meticulously crafted with natural marble flooring, premium fixtures, and intelligent space planning. The project integrates residential towers with a World Trade Center, a luxury hotel, and a premier retail mall — creating a truly integrated lifestyle destination in Hyderabad.
            </p>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Strategically located near the Outer Ring Road (ORR), HITEC City, Gachibowli, and Rajiv Gandhi International Airport, Brigade Gateway Neopolis offers unmatched connectivity and convenience for working professionals, families, and savvy investors alike.
            </p>
            <CTAButton
              text="Book a Site Visit"
              onClick={() => openLead("Book a Site Visit")}
            />
          </div>
          <div>
            <img
              src={sideElevationImg}
              alt="Brigade Gateway Neopolis Side Elevation – Kokapet Hyderabad"
              className="rounded-2xl shadow-2xl w-full object-cover" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Maximize2 size={22} />, label: "Total Area", value: "~9.7 Acres" },
            { icon: <Building2 size={22} />, label: "Towers", value: "2 High-Rise" },
            { icon: <Home size={22} />, label: "Units", value: "~594 Homes" },
            { icon: <Layers size={22} />, label: "Max Floors", value: "60+ Floors" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-slate-800/60 border border-amber-600/20 rounded-xl p-5 text-center">
              <div className="text-amber-400 flex justify-center mb-2">{icon}</div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-slate-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY FEATURES & SPECIFICATIONS ── */}
      <section className="py-16 bg-slate-900/50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">What You Get</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Key Features & Specifications</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              {[
                { label: "Land Area", value: "~9.7 Acres (Mixed-Use Development)" },
                { label: "Residential Towers", value: "2 Towers – G+57 & G+60 Floors" },
                { label: "Total Units", value: "~594 Premium Apartments" },
                { label: "Unit Configurations", value: "3, 4, 5 & 6 BHK + Sky Villas & Duplexes" },
                { label: "Unit Sizes", value: "3,067 sq.ft. – 9,859+ sq.ft." },
                { label: "Structure", value: "RCC Framed – Aluminium Formwork / Precast" },
                { label: "Flooring (Living)", value: "Natural Marble / Engineered Marble" },
                { label: "Kitchen Flooring", value: "Natural Marble / Engineered Marble" },
                { label: "Balcony", value: "Wood-Finish Outdoor Vitrified Tiles" },
                { label: "Elevators", value: "High-Speed (Multiple per Tower)" },
                { label: "Air Conditioning", value: "VRV / VRF – Living & Bedrooms" },
                { label: "Electrical Backup", value: "100% DG Backup – Common Areas & Apartments" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3 border-b border-slate-700/50 pb-3">
                  <Star size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 text-sm">{label}: </span>
                    <span className="text-white text-sm font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { label: "Main Entry Door", value: "Teak Wood Frame with Designer Shutter, Architrave – PU/Melamine Polish & Digilock" },
                { label: "Windows", value: "Aluminium with DGU & Bug Screen" },
                { label: "Balcony Railing", value: "Glass Railing" },
                { label: "Master Bed Washroom", value: "Imported Marble Countertop, Glass Partition, Overhead Rain Shower, EWC – Concealed Cistern" },
                { label: "CP Fittings", value: "Grohe / Kohler / Duravit or equivalent" },
                { label: "Sanitary Fixtures", value: "Grohe / Kohler / Duravit / Roca or equivalent" },
                { label: "Security System", value: "CCTV, Access Control, Gas Leak Detection, Smart Home Automation Provision" },
                { label: "Car Park", value: "Common EV Charging Points at B1 Level" },
                { label: "False Ceiling", value: "Calcium Silicate / Sintax / Water-Resistant Gypsum Boards" },
                { label: "Exterior Finish", value: "External Texture Paint / Scratch Coat with Exterior Emulsion" },
                { label: "Sky Villa / 5 BHK", value: "14 kW Electrical Load" },
                { label: "6 BHK / Duplex", value: "16 kW Electrical Load" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3 border-b border-slate-700/50 pb-3">
                  <Star size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 text-sm">{label}: </span>
                    <span className="text-white text-sm font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specs images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <img src={specsLuxury} alt="Brigade Gateway Neopolis luxury interior specifications marble flooring Kokapet Hyderabad" className="rounded-xl shadow-lg w-full object-contain bg-white p-3" loading="lazy" decoding="async" />
            <img src={specsWashrooms} alt="Brigade Gateway Neopolis premium washroom fittings Grohe Kohler specifications high-rise apartments Hyderabad" className="rounded-xl shadow-lg w-full object-contain bg-white p-3" loading="lazy" decoding="async" />
            <img src={specsFinishes} alt="Brigade Gateway Neopolis painting finishes exterior texture specifications Neopolis Hyderabad" className="rounded-xl shadow-lg w-full object-contain bg-white p-3" loading="lazy" decoding="async" />
          </div>

          <div className="text-center">
            <CTAButton
              text="Get Latest Brochure"
              onClick={() => openLead("Get Latest Brochure")}
            />
          </div>
        </div>
      </section>

      {/* ── LOCATION & CONNECTIVITY ── */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Prime Address</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Location & Connectivity</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-10">
          <div>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              Kokapet's <strong className="text-white">Neopolis</strong> zone is Hyderabad's most strategically located emerging real estate destination. Brigade Gateway Neopolis sits at the crossroads of modern infrastructure, global business hubs, and premium social amenities — making it an address of unrivalled prestige.
            </p>
            <div className="space-y-4">
              {[
                { label: "Outer Ring Road (ORR)", detail: "Immediate access – direct ORR ramp" },
                { label: "HITEC City & Cyberabad", detail: "~15 minutes drive" },
                { label: "Gachibowli Financial District", detail: "~10 minutes drive" },
                { label: "Rajiv Gandhi International Airport", detail: "~30 minutes via ORR" },
                { label: "Top International Schools", detail: "Oakridge, Glendale, Silver Oaks – within 15 km" },
                { label: "Hospitals", detail: "Yashoda, Continental, Aster – within 15 km" },
                { label: "Shopping & Entertainment", detail: "Inorbit, Sarath City Mall nearby" },
                { label: "Kokapet Growth Corridor", detail: "Hyderabad's fastest-appreciating western zone" },
              ].map(({ label, detail }) => (
                <div key={label} className="flex items-start gap-3">
                  <MapPin size={15} className="text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-white font-semibold text-sm">{label}:</span>
                    <span className="text-slate-400 text-sm ml-1">{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src={layoutPlanImg}
              alt="Brigade Gateway Neopolis master layout plan Kokapet Neopolis Hyderabad mixed-use development"
              className="rounded-2xl shadow-2xl w-full object-contain bg-white/5 border border-amber-600/20 p-2" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="text-center">
          <CTAButton
              text="Check Price & Payment Plans"
              onClick={() => openLead("Check Price & Payment Plans")}
          />
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-16 bg-slate-900/50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">World-Class Lifestyle</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Amenities & Facilities</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img
                src={clubhouseElevationImg}
                alt="Brigade Gateway Neopolis amenities clubhouse elevation Kokapet Hyderabad 230000 sqft grand clubhouse"
                className="rounded-2xl shadow-2xl w-full" loading="lazy" decoding="async" />
            </div>
            <div>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Brigade Gateway Neopolis raises the bar for luxury living with a <strong className="text-amber-400">~2,30,000 sq.ft. grand clubhouse</strong> — one of Hyderabad's largest residential clubhouses — offering every lifestyle experience imaginable for residents of all ages.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Grand Clubhouse (~2,30,000 sq.ft.)",
                  "Swimming Pool & Spa",
                  "Fully Equipped Gymnasium",
                  "Library & Reading Lounge",
                  "Cafes & Restaurants",
                  "Landscaped Gardens",
                  "Children's Play Zone",
                  "Outdoor Gym",
                  "Jogging & Cycling Tracks",
                  "Sports Courts (Multi-Purpose)",
                  "Amphitheater",
                  "Event Plaza",
                  "Quiet Corner & Outdoor Seating",
                  "Helipad (Atop Tower)",
                  "Sky Lounge",
                  "24/7 Security & CCTV",
                  "Power Backup (100%)",
                  "EV Charging Points",
                  "Smart Home Automation Provision",
                  "Arrival & Drop-Off Plazas",
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <CTAButton
              text="Schedule a Walkthrough"
              onClick={() => openLead("Schedule a Walkthrough")}
            />
          </div>
        </div>
      </section>

      {/* ── FLOOR PLANS ── */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Unit Layouts</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Tower A – Floor Plans</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Below are the typical floor plans for Tower A. For detailed floor plans of individual units, WhatsApp us and we'll send them to you directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-800/40 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-amber-400 font-semibold text-sm text-center mb-3">Tower A · 1st–15th, 17th–24th, 26th–32nd Floors (6 Cluster)</p>
            <img
              src={towerA1to32}
              alt="Brigade Gateway Neopolis Tower A typical floor plan 3 BHK apartment Kokapet Hyderabad floors 1-32"
              className="w-full rounded-xl object-contain bg-white/5" loading="lazy" decoding="async" />
          </div>
          <div className="bg-slate-800/40 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-amber-400 font-semibold text-sm text-center mb-3">Tower A · 34th–41st, 43rd–50th Floors (5 Cluster)</p>
            <img
              src={towerA34to50}
              alt="Luxury sky duplex 5 BHK Brigade Gateway Neopolis Tower A floor plan Hyderabad floors 34-50"
              className="w-full rounded-xl object-contain bg-white/5" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-900/30 to-amber-700/20 border border-amber-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-3">Want Detailed Unit Plans?</h3>
          <p className="text-slate-300 mb-6">WhatsApp us your preferred BHK type (3/4/5/6 BHK) and we'll send you the individual unit floor plans, carpet area details, and pricing instantly.</p>
          <CTAButton
              text="Get Floor Plans on WhatsApp"
              onClick={() => openLead("Get Floor Plans on WhatsApp")}
          />
        </div>
      </section>

      {/* ── SIZES & FLOOR PLANS TABLE ── */}
      <section className="py-16 bg-slate-900/50 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Pricing & Availability</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Sizes & Floor Plans – Brigade Gateway Neopolis, Hyderabad
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-amber-600/20 shadow-2xl mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-amber-700/40 to-amber-600/30 border-b border-amber-600/30">
                  <th className="text-left text-amber-300 font-semibold px-6 py-4 whitespace-nowrap">Project Type</th>
                  <th className="text-left text-amber-300 font-semibold px-6 py-4 whitespace-nowrap">Built-up Area (Sq.Ft.)</th>
                  <th className="text-left text-amber-300 font-semibold px-6 py-4 whitespace-nowrap">Price*</th>
                  <th className="text-left text-amber-300 font-semibold px-6 py-4 whitespace-nowrap">Enquire</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "3 BHK", area: "2,024 Sq.Ft. Onwards", price: "₹4.6 Cr* Onwards", msg: "Hi, I'm interested in the 3 BHK apartment at Brigade Gateway Neopolis. Please share floor plans and pricing." },
                  { type: "4 BHK", area: "2,590 Sq.Ft. Onwards", price: "On Request", msg: "Hi, I'm interested in the 4 BHK apartment at Brigade Gateway Neopolis. Please share floor plans and pricing." },
                  { type: "Sky Duplex – 5 BHK", area: "3,747 Sq.Ft. Onwards", price: "On Request", msg: "Hi, I'm interested in the Sky Duplex 5 BHK at Brigade Gateway Neopolis. Please share floor plans and pricing." },
                  { type: "Sky Duplex – 6 BHK", area: "6,432 Sq.Ft. Onwards", price: "On Request", msg: "Hi, I'm interested in the Sky Duplex 6 BHK at Brigade Gateway Neopolis. Please share floor plans and pricing." },
                ].map(({ type, area, price, msg }, i) => (
                  <tr key={type} className={`border-b border-slate-700/50 transition-colors hover:bg-amber-500/5 ${i % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}`}>
                    <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{type}</td>
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap">{area}</td>
                    <td className="px-6 py-4 text-amber-400 font-semibold whitespace-nowrap">{price}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openLead(`${type} Enquiry`)}
                        className="lead-btn inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <MessageCircle size={13} />
                        Enquire Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-500 text-xs text-center mb-8">
            *Prices are indicative and subject to change. Contact us for latest offers.
          </p>

          <div className="text-center">
            <CTAButton
              text="Get Floor Plans on WhatsApp"
              onClick={() => openLead("Get Floor Plans on WhatsApp")}
            />
          </div>
        </div>
      </section>


      <section className="py-16 bg-slate-900/50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Why Invest Here</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Investment & Value Proposition</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Zap size={28} />,
                title: "High Growth Location",
                desc: "Kokapet's Neopolis corridor is Hyderabad's fastest-appreciating real estate zone, driven by IT expansion, ORR connectivity, and government infrastructure development."
              },
              {
                icon: <Award size={28} />,
                title: "Brigade Group Trust",
                desc: "Brigade Group has 30+ years of pan-India real estate development, recognized as one of India's Top Builders and awarded multiple prestigious industry accolades."
              },
              {
                icon: <Shield size={28} />,
                title: "Mixed-Use Advantage",
                desc: "With a World Trade Center, luxury hotel, and retail mall integrated into the same campus, Brigade Gateway Neopolis delivers an unmatched lifestyle ecosystem."
              },
              {
                icon: <Leaf size={28} />,
                title: "Planned Future Infrastructure",
                desc: "Upcoming metro connectivity, business parks, and social infrastructure around Neopolis will further accelerate property values in the next 3–5 years."
              },
              {
                icon: <Home size={28} />,
                title: "Premium Rental Yields",
                desc: "Proximity to HITEC City and the Financial District ensures strong rental demand from senior IT professionals and expats, delivering solid rental returns."
              },
              {
                icon: <Star size={28} />,
                title: "Iconic Skyline Address",
                desc: "Owning an apartment in a 60+ floor tower with helipad, sky lounge, and panoramic city views is a statement of success — and an asset that holds enduring value."
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-slate-800/60 border border-amber-600/20 rounded-xl p-6">
                <div className="text-amber-400 mb-3">{icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Brigade Group – Awards & Accolades</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Brigade Group is recognized for being among India's <strong className="text-amber-400">Best Workplaces in Real Estate for 14 consecutive years</strong> at the 'Great Place To Work' awards. Their projects have won at CWAB, Asia Pacific Property Awards, Economic Times Real Estate Awards, and more.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                With prestigious honours across ESG leadership, residential townships, villa projects, and commercial developments, Brigade Group is a name you can trust with your most important investment.
              </p>
            </div>
            <img
              src={awardsImg}
              alt="Brigade Group awards accolades Great Place to Work real estate India"
              className="rounded-2xl shadow-xl w-full object-contain bg-white p-4" loading="lazy" decoding="async" />
          </div>

          <div className="text-center">
            <CTAButton
              text="Enquire Now"
              onClick={() => openLead("Enquire Now")}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Common Questions</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto" />
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated living at Brigade Gateway Neopolis. Discover spacious 3, 4, 5 & 6 BHK luxury homes, premium amenities, and a vibrant community designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button data-lead-gate="sitevisit" onClick={() => openLead("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openLead("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href="https://wa.me/919705080909?text=Hi%2C%20I%27m%20interested%20in%20Brigade%20Gateway%20Neopolis" target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-6">
            <a href="tel:+919705080909" className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <Phone size={18} /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-4 bg-slate-950 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm">
          © 2026 Naani Projects. All rights reserved. · Real Estate Digital Marketing Hyderabad
        </p>
        <p className="text-slate-600 text-xs mt-2">
          All images are indicative & for representation purposes only. Pricing and specifications are subject to change without prior notice.
        </p>
      </footer>

      {/* ── MOBILE STICKY CTA BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-amber-600/20 p-3">
        <div className="flex gap-3">
          <button
            onClick={() => openLead("Mobile - Enquire Now")}
            className="lead-btn flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold text-sm"
          >
            <MessageCircle size={18} />
            Enquire Now
          </button>
          <a
            href="tel:+919705080909"
            className="call-btn flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl font-semibold text-sm"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
      <ProjectsFooter />
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </div>
  );
};

export default BrigadeGatewayNeopolis;
