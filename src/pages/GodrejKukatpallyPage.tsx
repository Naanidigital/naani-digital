import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import ProjectHeader from "@/components/ProjectHeader";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import { Button } from "@/components/ui/button";
import {
  Phone, MessageCircle, MapPin, Building2, ArrowUp, X, CheckCircle2,
  Calendar, Download, Shield, Award, Home, Dumbbell, Users, TreePine,
  TrendingUp, Star, Layers,
} from "lucide-react";

import heroImg from "@/assets/godrej-kukatpally/hero.jpg";
import floorPlanImg from "@/assets/godrej-kukatpally/floor-plan.png";
import aerialImg from "@/assets/godrej-kukatpally/aerial.png";
import masterplanImg from "@/assets/godrej-kukatpally/masterplan.png";

const PROJECT_NAME = "Godrej Kukatpally Hyderabad";
const WA_MSG = encodeURIComponent("Hi, I'm interested in Godrej Kukatpally Hyderabad. Please share details.");
const WA_LINK = `https://wa.me/919705080909?text=${WA_MSG}`;
const PAGE_URL = "https://www.naani.in/projects/godrej-kukatpally-hyderabad";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "name": "Godrej Kukatpally Hyderabad – Luxury 3 & 4 BHK Apartments",
      "description": "Ultra-luxury G+46 high-rise residential apartments in KPHB Phase IV, Kukatpally, Hyderabad. 7.8 acres, 2 towers, premium 3 & 4 BHK homes near HITEC City.",
      "url": PAGE_URL,
      "image": "https://www.naani.in/og-godrej-kukatpally.jpg",
      "datePosted": "2026-05-12",
      "address": { "@type": "PostalAddress", "addressLocality": "Kukatpally", "addressRegion": "Telangana", "addressCountry": "IN" },
    },
    {
      "@type": "Residence",
      "name": "Godrej Kukatpally Hyderabad",
      "address": { "@type": "PostalAddress", "addressLocality": "KPHB Phase IV, Kukatpally", "addressRegion": "Hyderabad", "addressCountry": "IN" },
      "amenityFeature": ["Swimming Pool", "Clubhouse", "Gymnasium", "Yoga Zone", "Kids Play Area", "Jogging Track", "Indoor Games", "Landscaped Gardens", "CCTV Security"],
    },
    {
      "@type": "Organization",
      "name": "Godrej Properties",
      "url": "https://www.godrejproperties.com/",
    },
    {
      "@type": "RealEstateAgent",
      "name": "Naani Projects – Godrej Kukatpally Sales Partner",
      "telephone": "+91-9705080909",
      "url": PAGE_URL,
      "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressCountry": "India" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
        { "@type": "ListItem", "position": 3, "name": "Godrej Kukatpally Hyderabad", "item": PAGE_URL },
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Where is Godrej Kukatpally located?", "acceptedAnswer": { "@type": "Answer", "text": "Godrej Kukatpally is located at KPHB Phase IV, Kukatpally, Hyderabad — an established premium neighbourhood with metro connectivity and direct access to HITEC City and the Financial District." } },
        { "@type": "Question", "name": "What configurations are available?", "acceptedAnswer": { "@type": "Answer", "text": "Ultra-luxury 3 & 4 BHK apartments across 2 high-rise G+46 towers." } },
        { "@type": "Question", "name": "Is it close to HITEC City?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. HITEC City, Madhapur, Gachibowli and the Financial District are all within easy driving distance via the ORR and main arterials." } },
        { "@type": "Question", "name": "What amenities are available?", "acceptedAnswer": { "@type": "Answer", "text": "Premium clubhouse, swimming pool, gymnasium, yoga zone, kids play area, jogging track, indoor games, landscaped gardens, multipurpose hall and 24x7 CCTV security." } },
        { "@type": "Question", "name": "Is it a good investment?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Kukatpally is a high-demand IT-corridor neighbourhood offering strong rental yields, brand-led capital appreciation and Godrej's premium positioning." } },
        { "@type": "Question", "name": "Is metro connectivity available?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. KPHB and Kukatpally metro stations are within minutes, with direct connectivity to HITEC City and Miyapur." } },
        { "@type": "Question", "name": "When is possession expected?", "acceptedAnswer": { "@type": "Answer", "text": "Possession is expected by 2031. The project is currently in pre-launch with EOI bookings open." } },
      ]
    }
  ]
};

const highlights = [
  { icon: <Layers className="w-5 h-5" />, label: "7.8 Acres" },
  { icon: <Building2 className="w-5 h-5" />, label: "G+46 Floors" },
  { icon: <Home className="w-5 h-5" />, label: "3 & 4 BHK Luxury" },
  { icon: <MapPin className="w-5 h-5" />, label: "Near HITEC City" },
  { icon: <Star className="w-5 h-5" />, label: "Premium Clubhouse" },
  { icon: <TreePine className="w-5 h-5" />, label: "70%+ Open Spaces" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Metro Connectivity" },
  { icon: <Award className="w-5 h-5" />, label: "By Godrej Properties" },
];

const amenityCategories = [
  { title: "Lifestyle", icon: <Star className="w-5 h-5" />, items: ["Premium Clubhouse", "Swimming Pool", "Multipurpose Hall", "Banquet Lawn"] },
  { title: "Sports & Fitness", icon: <Dumbbell className="w-5 h-5" />, items: ["Gymnasium", "Yoga Zone", "Indoor Games", "Jogging Track"] },
  { title: "Community", icon: <Users className="w-5 h-5" />, items: ["Kids Play Area", "Co-working Lounge", "Senior Citizen Deck", "Cycling Track"] },
  { title: "Wellness & Green", icon: <TreePine className="w-5 h-5" />, items: ["Landscaped Gardens", "70% Open Spaces", "CCTV Security", "Smart Access"] },
];

const locationItems = [
  { name: "HITEC City", time: "20 mins" },
  { name: "Financial District", time: "30 mins" },
  { name: "Gachibowli", time: "25 mins" },
  { name: "Madhapur", time: "22 mins" },
  { name: "Kokapet", time: "30 mins" },
  { name: "NH-65 / ORR", time: "10 mins" },
  { name: "KPHB Metro", time: "5 mins" },
  { name: "Forum Mall", time: "8 mins" },
];

const faqs = [
  { q: "Where is Godrej Kukatpally located?", a: "Godrej Kukatpally is located at KPHB Phase IV, Kukatpally, Hyderabad — an established premium neighbourhood with metro connectivity and direct access to HITEC City and the Financial District." },
  { q: "What configurations are available?", a: "Ultra-luxury 3 & 4 BHK apartments across 2 high-rise G+46 towers." },
  { q: "Is it close to HITEC City?", a: "Yes. HITEC City, Madhapur, Gachibowli and the Financial District are all within easy driving distance via the ORR and main arterials." },
  { q: "What amenities are available?", a: "Premium clubhouse, swimming pool, gymnasium, yoga zone, kids play area, jogging track, indoor games, landscaped gardens, multipurpose hall and 24x7 CCTV security." },
  { q: "Is it a good investment?", a: "Yes. Kukatpally is a high-demand IT-corridor neighbourhood offering strong rental yields, brand-led capital appreciation and Godrej's premium positioning." },
  { q: "Is metro connectivity available?", a: "Yes. KPHB and Kukatpally metro stations are within minutes, with direct connectivity to HITEC City and Miyapur." },
  { q: "When is possession expected?", a: "Possession is expected by 2031. The project is currently in pre-launch with EOI bookings open." },
];

const GodrejKukatpallyPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("General");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [exitShown, setExitShown] = useState(false);

  const openPopup = (src: string) => { setPopupSource(src); setPopupOpen(true); };

  useEffect(() => {
    const key = "timed_popup_godrej_kukatpally";
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => { openPopup("Entry – Discover Ultra-Luxury Living"); sessionStorage.setItem(key, "done"); }, 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (exitShown) return;
    const key = "exit_popup_godrej_kukatpally";
    if (sessionStorage.getItem(key)) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitShown) {
        setExitShown(true);
        sessionStorage.setItem(key, "done");
        openPopup("Exit Intent – Send Details");
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [exitShown]);

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const sectionClass = "py-16 md:py-24 px-4";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead
        title="Godrej Kukatpally Hyderabad | Luxury 3 & 4 BHK Apartments"
        description="Explore Godrej Kukatpally Hyderabad, an ultra-luxury high-rise residential project offering premium 3 & 4 BHK apartments near HITEC City with world-class amenities and excellent connectivity."
        canonicalUrl={PAGE_URL}
        keywords="Godrej Kukatpally, Godrej Hyderabad, Luxury Apartments Hyderabad, Kukatpally Apartments, 3 BHK Hyderabad, 4 BHK Hyderabad, Godrej Properties Hyderabad, High Rise Apartments Hyderabad"
        ogImage={heroImg}
        structuredData={structuredData}
      />

      <ProjectHeader projectName={PROJECT_NAME} />

      {/* HERO */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Godrej Kukatpally Hyderabad luxury G+46 high-rise apartments at dusk" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-slate-950" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl space-y-6 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">Pre-Launch · Godrej Properties</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Ultra-Luxury Living at{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Godrej Kukatpally</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Premium 3 &amp; 4 BHK G+46 high-rise apartments in KPHB Phase IV, Kukatpally — minutes from HITEC City &amp; Financial District.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["7.8 Acres", "2 Towers", "G+46 Floors", "3 & 4 BHK", "70% Open", "Possession 2031"].map(h => (
              <span key={h} className="px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">{h}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={() => openPopup("Hero – Enquire Now")} size="lg" className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/25">
              <Calendar className="w-5 h-5 mr-2" /> Enquire Now
            </Button>
            <Button onClick={() => openPopup("Hero – Download Brochure")} size="lg" variant="outline" className="lead-btn border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-8 py-6 text-lg">
              <Download className="w-5 h-5 mr-2" /> Download Brochure
            </Button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-6 rounded-md text-lg">
              <MessageCircle className="w-5 h-5" /> Book Site Visit
            </a>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={aerialImg} alt="Godrej Kukatpally aerial view KPHB Phase IV Hyderabad" className="rounded-2xl border border-amber-500/20 cursor-pointer hover:scale-[1.02] transition-transform" loading="lazy" onClick={() => setLightboxImg(aerialImg)} />
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Godrej Kukatpally Hyderabad</strong> is an ultra-luxury high-rise residential development by Godrej Properties, set on 7.8 acres in the heart of KPHB Phase IV. Two G+46 architectural landmarks are designed for contemporary high-rise living — bringing together expansive floor plates, panoramic city views, and 70%+ green open spaces.
              </p>
              <p>
                Effortless connectivity to HITEC City, the Financial District, ORR and KPHB Metro makes it the perfect address for IT professionals, business owners, NRIs and luxury homebuyers seeking long-term capital appreciation.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  ["Project Type", "Ultra-Luxury High-Rise"],
                  ["Configurations", "3 & 4 BHK"],
                  ["Land Area", "7.8 Acres"],
                  ["Towers / Floors", "2 / G+46"],
                  ["Open Space", "70%+"],
                  ["Possession", "Expected 2031"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-[10px] uppercase text-gray-400 tracking-wider">{k}</p>
                    <p className="text-sm font-semibold text-amber-300 mt-1">{v}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => openPopup("Overview – Get Details")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white mt-4">
                Get Complete Project Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map(h => (
              <div key={h.label} className="bg-white/5 border border-amber-500/20 rounded-xl p-5 flex flex-col items-center gap-2 text-center hover:border-amber-500/50 transition-all">
                <div className="text-amber-500">{h.icon}</div>
                <p className="text-sm font-medium">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Location Advantages</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">KPHB Phase IV, Kukatpally — one of Hyderabad's most established premium IT-corridor neighbourhoods.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locationItems.map(l => (
              <div key={l.name} className="bg-white/5 border border-amber-500/20 rounded-xl p-4 text-center hover:border-amber-500/50 transition-all">
                <MapPin className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-white">{l.name}</p>
                <p className="text-xs text-amber-300 mt-1">{l.time}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl overflow-hidden border border-amber-500/20">
            <iframe
              src="https://www.google.com/maps?q=KPHB+Phase+IV+Kukatpally+Hyderabad&output=embed"
              className="w-full h-80"
              loading="lazy"
              title="Godrej Kukatpally KPHB Phase IV location map"
            />
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Luxury Amenities</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">A signature Godrej clubhouse and curated lifestyle amenities — designed for elevated everyday living.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenityCategories.map(cat => (
              <div key={cat.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-2 text-amber-500 mb-4">{cat.icon}<h3 className="text-lg font-semibold text-white">{cat.title}</h3></div>
                <ul className="space-y-2">
                  {cat.items.map(i => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOOR PLAN & MASTERPLAN */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Floor Plans</h3>
            <p className="text-gray-400">3 BHK &amp; 4 BHK premium layouts. Tap to enlarge or download.</p>
            <img src={floorPlanImg} alt="Godrej Kukatpally 3 BHK and 4 BHK floor plans" className="rounded-2xl border border-amber-500/20 cursor-pointer hover:scale-[1.01] transition-transform bg-white" loading="lazy" onClick={() => setLightboxImg(floorPlanImg)} />
            <Button onClick={() => openPopup("Floor Plan – Download")} className="lead-btn w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
              <Download className="w-4 h-4 mr-2" />Download Floor Plan
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Masterplan</h3>
            <p className="text-gray-400">Two iconic G+46 towers with curated amenities and 70%+ open spaces.</p>
            <img src={masterplanImg} alt="Godrej Kukatpally masterplan layout" className="rounded-2xl border border-amber-500/20 cursor-pointer hover:scale-[1.01] transition-transform bg-white" loading="lazy" onClick={() => setLightboxImg(masterplanImg)} />
            <Button onClick={() => openPopup("Masterplan – Get Details")} className="lead-btn w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
              Get Masterplan Details
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: heroImg, alt: "Godrej Kukatpally exterior tower elevation dusk" },
              { src: aerialImg, alt: "Godrej Kukatpally aerial neighbourhood KPHB Phase IV" },
              { src: masterplanImg, alt: "Godrej Kukatpally masterplan layout" },
              { src: floorPlanImg, alt: "Godrej Kukatpally floor plan options" },
            ].map((g, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-amber-500/15 cursor-pointer group bg-white/5" onClick={() => setLightboxImg(g.src)}>
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className={`${sectionClass} bg-gradient-to-b from-black via-slate-950 to-slate-900`}>
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Why Invest in Godrej Kukatpally</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <TrendingUp className="w-6 h-6" />, t: "Kukatpally Growth", d: "Established premium micro-market with consistent appreciation." },
              { icon: <Building2 className="w-6 h-6" />, t: "IT Corridor Edge", d: "Direct connectivity to HITEC City, Financial District & Madhapur." },
              { icon: <Users className="w-6 h-6" />, t: "Strong Rental Demand", d: "Year-round demand from IT professionals and corporate executives." },
              { icon: <Star className="w-6 h-6" />, t: "Premium Brand Value", d: "Backed by Godrej Properties — India's most trusted developer." },
              { icon: <Layers className="w-6 h-6" />, t: "Infra Upside", d: "Metro expansion, ORR access and new commercial hubs nearby." },
              { icon: <Shield className="w-6 h-6" />, t: "Long-Term Appreciation", d: "Limited high-rise inventory in KPHB drives long-term value." },
            ].map(c => (
              <div key={c.t} className="bg-white/5 border border-amber-500/20 rounded-2xl p-6 text-left">
                <div className="text-amber-500 mb-3">{c.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{c.t}</h3>
                <p className="text-sm text-gray-400">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 flex justify-between items-center font-semibold hover:bg-white/5">
                  <span>{f.q}</span>
                  <span className="text-amber-400 text-2xl">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="px-5 pb-4 text-gray-300 text-sm leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Explore Godrej Kukatpally. Discover 2, 3, and 4 BHK apartments with clubhouse facilities and convenient access to Gachibowli and HITEC City.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button data-lead-gate="sitevisit" onClick={() => openPopup("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openPopup("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
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

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-amber-500/20 p-2 grid grid-cols-3 gap-2">
        <a href="tel:+919705080909" className="call-btn flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2.5 rounded-lg text-xs font-semibold">
          <Phone size={14} /> Call
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn flex items-center justify-center gap-1.5 bg-green-600 text-white py-2.5 rounded-lg text-xs font-semibold">
          <MessageCircle size={14} /> WhatsApp
        </a>
        <button onClick={() => openPopup("Sticky Mobile – Brochure")} className="lead-btn flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2.5 rounded-lg text-xs font-semibold">
          <Download size={14} /> Brochure
        </button>
      </div>

      {/* Floating WhatsApp */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn fixed bottom-24 md:bottom-6 right-4 z-40 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-transform hover:scale-110">
        <MessageCircle className="w-6 h-6 text-white" fill="white" />
      </a>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-44 md:bottom-24 right-4 z-40 w-12 h-12 bg-amber-600 hover:bg-amber-700 rounded-full shadow-lg flex items-center justify-center transition">
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-4 right-4 text-white p-2"><X className="w-8 h-8" /></button>
          <img src={lightboxImg} alt="Godrej Kukatpally gallery view enlarged" className="max-h-[90vh] max-w-full rounded-lg" loading="lazy" decoding="async" />
        </div>
      )}

      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={popupSource} projectName={PROJECT_NAME} />
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </div>
  );
};

export default GodrejKukatpallyPage;
