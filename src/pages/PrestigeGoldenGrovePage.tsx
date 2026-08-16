import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import { MessageCircle, MapPin, Building2, Layers, Maximize2, Star, ChevronDown, ChevronUp, Home, Zap, Shield, Leaf, Award, Trees, Calendar, IndianRupee, Users, Ruler, Phone } from "lucide-react";

import elevationImg from "@/assets/prestige/elevation.jpg";
import amenitiesImg from "@/assets/prestige/amenities.jpg";

const PROJECT_NAME = "Prestige Golden Grove";

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
    q: "What is Prestige Golden Grove Hyderabad?",
    a: "Prestige Golden Grove is a premium luxury apartment township by Prestige Group, spread across 28.7 acres in Tellapur, near Kollur, West Hyderabad. It features 10 high-rise towers (3P+52 floors) with 5,120 luxury apartments in 2, 3, and 4 BHK configurations, sized between 1,100 and 3,600 sq.ft., starting from ₹93.5 Lakhs.",
  },
  {
    q: "Where is Prestige Golden Grove located in Hyderabad?",
    a: "Prestige Golden Grove is located in Tellapur, Velimela, near Kollur, off ORR Exit 2, on 100 ft Road, West Hyderabad, Telangana – 502032. It is close to ICRISAT Research Centre, Gaudium School, and just 15 minutes from Gachibowli and HITEC City IT hubs.",
  },
  {
    q: "What types of apartments are available in Prestige Golden Grove?",
    a: "Prestige Golden Grove offers 2 BHK (1,100–1,300 sq.ft.), 2 BHK + Study (1,450–1,570 sq.ft.), 3 BHK Smart (1,600–1,700 sq.ft.), 3 BHK Prima (1,900–2,100 sq.ft.), 3 BHK + Study (2,300–2,400 sq.ft.), and 4 BHK (3,000–3,600 sq.ft.) apartments. All units are Vaastu-compliant.",
  },
  {
    q: "What are the amenities at Prestige Golden Grove?",
    a: "The project features 2 clubhouses with party halls, spa, dance rooms, and café; temperature-controlled swimming pool; fully equipped gym; jogging and cycling tracks; themed gardens; kids' play zone; gaming arena; outdoor BBQ areas; 24/7 CCTV security; rainwater harvesting; and 70% green open spaces.",
  },
  {
    q: "Is Prestige Golden Grove a good investment near ORR Hyderabad?",
    a: "Yes. Prestige Golden Grove is located just 2 minutes from ORR Exit 2, in the fast-developing Tellapur-Kollur corridor. With Prestige Group's 39+ years of track record, budget-friendly pricing starting at ₹93.5L, and strong future appreciation driven by IT hub proximity and upcoming infrastructure, it's an excellent investment choice.",
  },
  {
    q: "What is the price of Prestige Golden Grove apartments?",
    a: "Prices start from ₹93.5 Lakhs for 2 BHK apartments and go up to ₹2.04 Crores for 4 BHK apartments. The pre-launch rate is ₹8,500 per sq.ft. The payment plan follows a 10:10:80 structure. WhatsApp us for the latest offers and exclusive pre-launch pricing.",
  },
  {
    q: "When is Prestige Golden Grove launching and what is the possession date?",
    a: "Prestige Golden Grove pre-launch is on 15 April 2026 and the official launch date is 20 April 2026. The expected possession date is 31 March 2030. RERA approval is in progress and expected by April 2026.",
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
      "@id": "https://www.naani.in/projects/prestige-golden-grove-hyderabad",
      "name": "Prestige Golden Grove – Luxury Apartments in Tellapur, Hyderabad",
      "description": "Premium luxury apartment township by Prestige Group across 28.7 acres in Tellapur, West Hyderabad. 10 towers, 5120 apartments, 2/3/4 BHK from 1100–3600 sq.ft. Starting ₹93.5 Lakhs.",
      "url": "https://www.naani.in/projects/prestige-golden-grove-hyderabad",
      "image": "https://www.naani.in/og-prestige-golden-grove.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tellapur, Velimela, 100 ft Road, off ORR Exit 2, near Kollur",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "502032",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.4675",
        "longitude": "78.2835"
      },
      "numberOfRooms": "2-4",
      "floorSize": {
        "@type": "QuantitativeValue",
        "minValue": 1100,
        "maxValue": 3600,
        "unitCode": "FTK"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "9350000",
        "availability": "https://schema.org/PreOrder",
        "seller": {
          "@type": "Organization",
          "name": "Prestige Group"
        }
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.naani.in/#prestige-golden-grove-agent",
      "name": "Naani Projects – Prestige Golden Grove Sales",
      "telephone": "+91-9705080909",
      "url": "https://www.naani.in/projects/prestige-golden-grove-hyderabad",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tellapur, Velimela, near Kollur",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "502032",
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
        { "@type": "ListItem", "position": 3, "name": "Prestige Golden Grove", "item": "https://www.naani.in/projects/prestige-golden-grove-hyderabad" }
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

const PrestigeGoldenGrovePage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("General");
  const openLead = (src: string) => { setPopupSource(src); setPopupOpen(true); };

  return (
    <div className="bg-[#090D16] text-white min-h-screen">
      <SEOHead
        title="Prestige Golden Grove Hyderabad | Luxury Apartments Near ORR"
        description="Discover Prestige Golden Grove Hyderabad – premium 2, 3 & 4 BHK luxury apartments in Tellapur near ORR. 28.7 acres, 10 towers, 5120 units. Starting ₹93.5 Lakhs. Enquire on WhatsApp now."
        canonicalUrl="https://www.naani.in/projects/prestige-golden-grove-hyderabad"
        keywords="Prestige Golden Grove Hyderabad, luxury apartments in Hyderabad near me, Prestige Group apartments Hyderabad, flats near ORR Hyderabad, premium residential project in Hyderabad, Tellapur apartments, Kollur flats Hyderabad"
        ogImage="https://www.naani.in/og/prestige-golden-grove.png"
        structuredData={structuredData}
      />
      <ProjectsHeader />

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={elevationImg}
            alt="Prestige Golden Grove luxury high-rise apartments Tellapur Hyderabad"
            className="w-full h-full object-cover object-center" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F1F1F1] via-[#F1F1F1]/70 to-[#F1F1F1]/20" />
          {/* Tentative disclaimer */}
          <div className="absolute bottom-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#0080FF]/20 shadow-xs">
            <p className="text-[10px] text-slate-600 italic font-medium">*Tentative image – actual may differ</p>
          </div>
        </div>

        <div className="relative z-10 px-4 md:px-8 pb-16 pt-24 max-w-5xl mx-auto w-full">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#0080FF]/30 text-[#0080FF] text-xs font-bold uppercase tracking-[0.2em] shadow-xs mb-3">
            Prestige Group · Tellapur, West Hyderabad
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#040957] leading-tight mb-4">
            Prestige Golden Grove –<br />
            <span className="text-[#0080FF]">
              Luxury Residential Apartments in Hyderabad
            </span>
          </h1>
          <p className="text-slate-800 font-medium text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Hyderabad's biggest luxury apartment launch of 2026 is here. Prestige Golden Grove by the renowned Prestige Group brings 5,120 premium 2, 3, and 4 BHK homes across 28.7 acres in Tellapur — West Hyderabad's fastest-growing real estate corridor.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 w-full">
            <CTAButton text="Enquire on WhatsApp" className="!bg-emerald-600 hover:!bg-emerald-700 w-52 h-12 flex items-center justify-center !text-base !font-extrabold !shadow-md" onClick={() => openLead("Enquire on WhatsApp")} />
            <button
              onClick={() => openLead("Enquire Now")}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold w-52 h-12 rounded-xl shadow-md transition-all text-base"
            >
              <Calendar size={18} />
              Book a Site Visit
            </button>
          </div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> 4.8/5 Rating</div>
          </div>
        </section>

      {/* ── PROJECT HIGHLIGHTS GRID ── */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">At a Glance</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Project Highlights</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Home size={22} />, label: "Project Type", value: "Apartment" },
            { icon: <IndianRupee size={22} />, label: "Starting Price", value: "₹93.5 L* Onwards" },
            { icon: <Layers size={22} />, label: "Unit Type", value: "2, 3 & 4 BHK" },
            { icon: <Ruler size={22} />, label: "Unit Sizes", value: "1100 – 3600 Sq Ft" },
            { icon: <Star size={22} />, label: "Project Status", value: "Pre-Launch" },
            { icon: <Maximize2 size={22} />, label: "Land Area", value: "28.7 Acres" },
            { icon: <Users size={22} />, label: "Total Units", value: "5,120 Units" },
            { icon: <Building2 size={22} />, label: "Total Floors", value: "3P + 52" },
            { icon: <Award size={22} />, label: "Builder", value: "Prestige Group" },
            { icon: <Building2 size={22} />, label: "No. of Towers", value: "10" },
            { icon: <Shield size={22} />, label: "RERA No", value: "Applied" },
            { icon: <Calendar size={22} />, label: "Possession", value: "March 2030" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-slate-800/60 border border-emerald-600/15 rounded-xl p-5 text-center">
              <div className="text-emerald-400 flex justify-center mb-2">{icon}</div>
              <div className="text-lg font-bold text-white">{value}</div>
              <div className="text-slate-400 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="py-16 bg-slate-900/50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">About The Project</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Project Overview</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-slate-300 text-base leading-relaxed mb-5">
                <strong className="text-white">Prestige Golden Grove</strong> is an urban residential masterpiece by India's most trusted developer, <strong className="text-emerald-400">Prestige Group</strong>, with 39+ years of excellence and 300+ delivered projects. Spanning <strong className="text-white">28.7 acres</strong> in Tellapur, Velimela, near Kollur, this is Hyderabad's largest and most premium apartment launch of 2026.
              </p>
              <p className="text-slate-300 text-base leading-relaxed mb-5">
                The project features <strong className="text-white">10 iconic towers</strong> rising 52 floors high with 3 parking podiums, housing <strong className="text-emerald-400">5,120 luxury Vaastu-compliant apartments</strong>. With a density of just 178 flats per acre and 70% green open spaces, Prestige Golden Grove offers the perfect balance of urban living and natural tranquillity.
              </p>
              <p className="text-slate-300 text-base leading-relaxed mb-5">
                The meaning of "Golden Grove" symbolises luxury and high value with abundant greenery — combining opulence and natural beauty to create an exceptional living experience. Grand lobbies with triple-height ceilings, beautiful expansive greenery, and world-class amenities define every corner of this majestic gated community.
              </p>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                With prices starting from just <strong className="text-emerald-400">₹93.5 Lakhs</strong> (₹8,500/sq.ft. at pre-launch) and a buyer-friendly <strong className="text-white">10:10:80 payment plan</strong>, this is an unmissable opportunity for both end-users and investors looking for premium apartments in West Hyderabad.
              </p>
              <CTAButton
              text="Get Project Details on WhatsApp"
              onClick={() => openLead("Get Project Details on WhatsApp")}
             />
            </div>
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={amenitiesImg}
                  alt="Prestige Golden Grove amenities clubhouse swimming pool Tellapur Hyderabad"
                  className="w-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                  <p className="text-[9px] text-slate-400 italic">*Tentative image – actual may differ</p>
                </div>
              </div>
              {/* Key dates box */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/80 border border-emerald-600/20 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Key Dates</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "EOI Started", value: "18 Dec 2025" },
                    { label: "Pre-Launch", value: "15 April 2026" },
                    { label: "Official Launch", value: "20 April 2026" },
                    { label: "Possession", value: "31 March 2030" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between border-b border-slate-700/40 pb-2">
                      <span className="text-slate-400">{label}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONFIGURATION & SIZES TABLE ── */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Sizes & Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Configuration & Floor Plans – Prestige Golden Grove
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-emerald-600/20 shadow-2xl mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-700/40 to-emerald-600/30 border-b border-emerald-600/30">
                  <th className="text-left text-emerald-300 font-semibold px-6 py-4 whitespace-nowrap">Configuration</th>
                  <th className="text-left text-emerald-300 font-semibold px-6 py-4 whitespace-nowrap">Size (Sq.Ft.)</th>
                  <th className="text-left text-emerald-300 font-semibold px-6 py-4 whitespace-nowrap">Price*</th>
                  <th className="text-left text-emerald-300 font-semibold px-6 py-4 whitespace-nowrap">Enquire</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "2 BHK", area: "1,100 – 1,300 Sq.Ft.", price: "₹93.5 L* Onwards", msg: "Hi, I'm interested in the 2 BHK apartment at Prestige Golden Grove Hyderabad. Please share floor plans and pricing." },
                  { type: "2 BHK + Study", area: "1,450 – 1,570 Sq.Ft.", price: "On Request", msg: "Hi, I'm interested in the 2 BHK + Study at Prestige Golden Grove Hyderabad. Please share details." },
                  { type: "3 BHK Smart", area: "1,600 – 1,700 Sq.Ft.", price: "On Request", msg: "Hi, I'm interested in the 3 BHK Smart apartment at Prestige Golden Grove Hyderabad. Please share floor plans and pricing." },
                  { type: "3 BHK Prima", area: "1,900 – 2,100 Sq.Ft.", price: "On Request", msg: "Hi, I'm interested in the 3 BHK Prima apartment at Prestige Golden Grove Hyderabad. Please share details." },
                  { type: "3 BHK + Study", area: "2,300 – 2,400 Sq.Ft.", price: "On Request", msg: "Hi, I'm interested in the 3 BHK + Study at Prestige Golden Grove Hyderabad. Please share details." },
                  { type: "4 BHK", area: "3,000 – 3,600 Sq.Ft.", price: "₹2.04 Cr* Onwards", msg: "Hi, I'm interested in the 4 BHK apartment at Prestige Golden Grove Hyderabad. Please share floor plans and pricing." },
                ].map(({ type, area, price, msg }, i) => (
                  <tr key={type} className={`border-b border-slate-700/50 transition-colors hover:bg-emerald-500/5 ${i % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}`}>
                    <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{type}</td>
                    <td className="px-6 py-4 text-slate-300 whitespace-nowrap">{area}</td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold whitespace-nowrap">{price}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openLead("Enquire Now")}
                        className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
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

          <p className="text-slate-500 text-xs text-center mb-6">
            *Prices are indicative and subject to change. Pre-launch rate: ₹8,500/sq.ft. Contact us for latest offers.
          </p>

          {/* EOI Info */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-700/20 border border-emerald-500/30 rounded-2xl p-8 text-center mb-8">
            <h3 className="text-white font-bold text-xl mb-3">EOI (Expression of Interest) – Pre-Booking Open</h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed max-w-2xl mx-auto">
              EOI holders get priority during bookings and access to exclusive discount offers. Pre-booking requires a post-dated cheque: 2 BHK – ₹8L, 3 BHK – ₹15L, 4 BHK – ₹20L. Bookings begin April 2026.
            </p>
            <CTAButton
              text="Get Floor Plans on WhatsApp"
              onClick={() => openLead("Get Floor Plans on WhatsApp")}
             />
          </div>

          {/* Payment Plan */}
          <div className="bg-slate-800/60 border border-emerald-600/15 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Payment Plan – 10:10:80 Structure</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-900/60 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">10%</div>
                <div className="text-xs text-slate-400 mt-1">At Booking</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">10%</div>
                <div className="text-xs text-slate-400 mt-1">Agreement Stage</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-400">80%</div>
                <div className="text-xs text-slate-400 mt-1">Easy Instalments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="py-16 bg-slate-900/50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Prime Location</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Location Advantage – Hyderabad</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Prestige Golden Grove is strategically located in <strong className="text-white">Tellapur, Velimela</strong> — one of West Hyderabad's fastest-developing real estate corridors. Positioned on a <strong className="text-emerald-400">30-metre wide approach road</strong> near the famous ICRISAT Research Centre, this location promises excellent connectivity, rapid infrastructure growth, and high return on investment.
              </p>
              <div className="space-y-3">
                {[
                  { label: "ORR Exit 2", detail: "Just 2 minutes (1.5 km)" },
                  { label: "Financial District / IT Hubs", detail: "12 minutes drive" },
                  { label: "Gachibowli", detail: "15 minutes drive" },
                  { label: "Kokapet & Neopolis", detail: "15 minutes drive" },
                  { label: "HITEC City", detail: "20 minutes drive" },
                  { label: "Rajiv Gandhi International Airport", detail: "32 minutes (30 km)" },
                  { label: "Miyapur Metro Station", detail: "10 minutes (6 km)" },
                  { label: "Lingampalli Railway Station", detail: "15 minutes (4.9 km)" },
                  { label: "Gaudium School", detail: "5 minutes drive" },
                  { label: "ICRISAT Research Centre", detail: "Adjacent – 10 mins" },
                  { label: "Airaavata Hospital", detail: "5 minutes drive" },
                  { label: "Sarath City Capital Mall", detail: "15 minutes drive" },
                ].map(({ label, detail }) => (
                  <div key={label} className="flex items-start gap-3">
                    <MapPin size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-semibold text-sm">{label}:</span>
                      <span className="text-slate-400 text-sm ml-1">{detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Address card */}
              <div className="bg-slate-800/60 border border-emerald-600/15 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">📍 Project Address</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300"><strong className="text-white">Area:</strong> Tellapur, Velimela, near Kollur</p>
                  <p className="text-slate-300"><strong className="text-white">City:</strong> West Hyderabad</p>
                  <p className="text-slate-300"><strong className="text-white">State:</strong> Telangana</p>
                  <p className="text-slate-300"><strong className="text-white">Pin Code:</strong> 502032</p>
                  <p className="text-slate-300"><strong className="text-white">Landmark:</strong> Close to ICRISAT Research Centre</p>
                </div>
              </div>

              {/* About Tellapur */}
              <div className="bg-slate-800/60 border border-emerald-600/15 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">About Tellapur</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Tellapur is a fast-developing locality in West Hyderabad, strategically positioned along the Outer Ring Road. It is part of the Tellapur–Gachibowli corridor, one of the most revered housing hubs of the city. The Hyderabad-Solapur Highway (NH 65) runs through this area, ensuring seamless connectivity. With multiple IT parks, SEZs, top schools, and hospitals in close proximity, Tellapur has become a top choice for both homebuyers and investors.
                </p>
              </div>

              {/* About Kollur */}
              <div className="bg-slate-800/60 border border-emerald-600/15 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">About Kollur</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Kollur is an emerging residential hotspot near Tellapur, benefitting from the rapid growth of West Hyderabad's IT corridor. With affordable entry prices, excellent connectivity to Gachibowli and Financial District, and upcoming infrastructure projects, Kollur is poised for significant appreciation in the coming years.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <CTAButton
              text="Check Location Benefits on WhatsApp"
              onClick={() => openLead("Check Location Benefits on WhatsApp")}
             />
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Premium Lifestyle</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Amenities & Lifestyle</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
          </div>

          <p className="text-slate-300 text-base text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Prestige Golden Grove offers an unmatched lifestyle with world-class amenities designed for every age group. Set amidst 70% green open spaces, the project features two grand clubhouses and an extensive range of recreational and wellness facilities.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              "2 Grand Clubhouses",
              "Temperature-Controlled Pool",
              "Kids' Swimming Pool",
              "Fully Equipped Gymnasium",
              "Spa & Wellness Centre",
              "Dance Rooms",
              "Café & Party Halls",
              "Jogging & Cycling Tracks",
              "Gaming Arena (Indoor)",
              "Multi-purpose Party Hall",
              "Outdoor BBQ Areas",
              "Themed & Butterfly Gardens",
              "Kids' Play Zone & Tree House",
              "Sports Courts",
              "No-Traffic Zone Tracks",
              "24/7 CCTV & Security",
              "Rainwater Harvesting",
              "Water Treatment Plants",
              "EV Charging Points",
              "Landscaped Open Spaces",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800/40 border border-emerald-600/10 rounded-lg p-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                {amenity}
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton
              text="View Amenities on WhatsApp"
              onClick={() => openLead("View Amenities on WhatsApp")}
             />
          </div>
        </div>
      </section>

      {/* ── TOWER DETAILS ── */}
      <section className="py-16 bg-slate-900/50 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Tower Configuration</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Towers & Blocks</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
          </div>

          <p className="text-slate-300 text-sm text-center max-w-2xl mx-auto mb-8">
            Prestige Golden Grove comprises 12 buildings hosting 10 high-rise residential towers, a clubhouse, and an amenity tower spread across 28.7 acres.
          </p>

          <div className="overflow-x-auto rounded-xl border border-emerald-600/20 shadow-xl mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-700/30 to-emerald-600/20 border-b border-emerald-600/20">
                  <th className="text-left text-emerald-300 font-semibold px-5 py-3">Block</th>
                  <th className="text-left text-emerald-300 font-semibold px-5 py-3">Towers</th>
                  <th className="text-left text-emerald-300 font-semibold px-5 py-3">Tower Names</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { block: "Block 1", towers: "2", names: "T-01, T-02" },
                  { block: "Block 2", towers: "3", names: "T-03, T-04, T-05" },
                  { block: "Block 3", towers: "2", names: "T-06, T-07" },
                  { block: "Block 4", towers: "2", names: "T-08, T-09" },
                  { block: "Block 5", towers: "1", names: "T-10" },
                  { block: "Block 6", towers: "2", names: "T-11, T-12" },
                  { block: "Block 7", towers: "2", names: "T-13, T-14" },
                  { block: "Block 8", towers: "3", names: "T-15, T-16, T-17" },
                  { block: "Block 9", towers: "3", names: "T-18, T-19" },
                  { block: "Block 10", towers: "2", names: "T-20, T-21" },
                  { block: "Block 11", towers: "2", names: "T-22, T-23" },
                  { block: "Block 12", towers: "2", names: "T-24, T-25" },
                ].map(({ block, towers, names }, i) => (
                  <tr key={block} className={`border-b border-slate-700/40 ${i % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/10"}`}>
                    <td className="px-5 py-3 text-white font-medium">{block}</td>
                    <td className="px-5 py-3 text-slate-300">{towers}</td>
                    <td className="px-5 py-3 text-slate-300">{names}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Investment Value</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Why Invest in Prestige Golden Grove?</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Award size={28} />, title: "Prestige Group Trust", desc: "39+ years of excellence, 300+ projects delivered across India. Prestige Group aims for ₹50,000 Cr in sales by FY30 with launches worth ₹42,000 Cr in FY26." },
              { icon: <Zap size={28} />, title: "High-Growth Corridor", desc: "Tellapur–Kollur is West Hyderabad's fastest-growing corridor with rapid infrastructure development, proximity to IT hubs, and strong appreciation potential." },
              { icon: <IndianRupee size={28} />, title: "Budget-Friendly Entry", desc: "Starting from just ₹93.5 Lakhs with a 10:10:80 payment plan, this project is accessible to salaried professionals and first-time investors." },
              { icon: <Trees size={28} />, title: "Green Living", desc: "70% green open spaces, themed gardens, butterfly gardens, jogging tracks, and a no-traffic zone create a peaceful, nature-rich living environment." },
              { icon: <Home size={28} />, title: "Rental & Resale Potential", desc: "Proximity to Gachibowli, HITEC City, and Financial District ensures strong rental demand and excellent resale value in the years ahead." },
              { icon: <Shield size={28} />, title: "Biggest Launch of 2026", desc: "5,120 homes across 28.7 acres — the largest and most premium residential launch in Hyderabad this year, with Vaastu-compliant units and grand lobbies." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-slate-800/60 border border-emerald-600/15 rounded-xl p-6">
                <div className="text-emerald-400 mb-3">{icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Other Prestige projects */}
          <div className="bg-slate-800/40 border border-emerald-600/15 rounded-xl p-6 mb-10">
            <h3 className="text-white font-bold text-lg mb-4 text-center">Top Prestige Projects in Hyderabad</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm text-center">
              {[
                "Prestige High Fields",
                "Prestige Ivy League",
                "Prestige Clairemont",
                "Prestige Tranquil",
                "Prestige Beverly Hills",
              ].map((name) => (
                <div key={name} className="bg-slate-900/60 border border-emerald-600/10 rounded-lg p-3 text-slate-300">
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <CTAButton
              text="Check Price & Offers on WhatsApp"
              onClick={() => openLead("Check Price & Offers on WhatsApp")}
             />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-slate-900/50 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Common Questions</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-700 mx-auto" />
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
            Experience elevated living at Prestige Golden Grove. Discover spacious 2, 3 & 4 BHK luxury homes, premium amenities, and a vibrant community designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <button data-lead-gate="sitevisit" onClick={() => openLead("Schedule Site Visit")} className="lead-btn bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold w-52 h-12 inline-flex items-center justify-center rounded-xl shadow-lg transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openLead("Get Latest Offers")} className="lead-btn bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold w-52 h-12 inline-flex items-center justify-center rounded-xl shadow-lg transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href="https://wa.me/919705080909?text=Hi%2C%20I%27m%20interested%20in%20Prestige%20Golden%20Grove" target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
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
          All images are tentative & for representation purposes only. Actual images may differ. Pricing and specifications are subject to change without prior notice.
        </p>
      </footer>

      {/* ── MOBILE STICKY CTA BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-emerald-600/20 p-3">
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
            className="call-btn flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-semibold text-sm"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
      <ProjectsFooter />
      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={popupSource} projectName={PROJECT_NAME} />
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </div>
  );
};

export default PrestigeGoldenGrovePage;
