import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import ProjectHeader from "@/components/ProjectHeader";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import { Button } from "@/components/ui/button";
import {
  Phone, MessageCircle, MapPin, Building2, ArrowUp, X, CheckCircle2,
  Calendar, Download, Shield, Award, Home, Dumbbell, Users, TreePine,
  TrendingUp, Star, Layers, Car, Zap, ChevronDown,
} from "lucide-react";

import heroImg from "@/assets/candeur-eternia/hero.png";
import clubhouseImg from "@/assets/candeur-eternia/clubhouse.png";
import towersImg from "@/assets/candeur-eternia/towers.png";
import masterplanImg from "@/assets/candeur-eternia/masterplan.png";
import paymentImg from "@/assets/candeur-eternia/payment-plan.png";

const PROJECT_NAME = "Candeur Eternia";
const WA_MSG = encodeURIComponent("Hi, I'm interested in Candeur Eternia, Bachupally. Please share details.");
const WA_LINK = `https://wa.me/919705080909?text=${WA_MSG}`;
const PAGE_URL = "https://www.naani.in/projects/candeur-eternia-bachupally-hyderabad";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "name": "Candeur Eternia – Premium 2, 2.5 & 3 BHK Apartments in Bachupally",
      "description": "Candeur Eternia is a premium high-rise gated community in Bachupally, Hyderabad. 7.7 acres, 4 towers, 33 floors, 73,000 sft clubhouse. RERA P02200010709.",
      "url": PAGE_URL,
      "image": "https://www.naani.in/og-candeur-eternia.jpg",
      "datePosted": "2026-05-12",
      "address": { "@type": "PostalAddress", "addressLocality": "Bachupally", "addressRegion": "Telangana", "addressCountry": "IN" },
      "numberOfRooms": "2,3",
    },
    {
      "@type": "Residence",
      "name": "Candeur Eternia",
      "address": { "@type": "PostalAddress", "addressLocality": "Bachupally", "addressRegion": "Hyderabad", "addressCountry": "IN" },
      "amenityFeature": ["Swimming Pool", "Clubhouse", "Gym", "Yoga Deck", "Kids Play Area", "EV Charging", "100% Power Backup", "CCTV Security"],
    },
    {
      "@type": "RealEstateAgent",
      "name": "Naani Projects – Candeur Eternia Sales Partner",
      "telephone": "+91-9705080909",
      "url": PAGE_URL,
      "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressCountry": "India" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
        { "@type": "ListItem", "position": 3, "name": "Candeur Eternia", "item": PAGE_URL },
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Where is Candeur Eternia located?", "acceptedAnswer": { "@type": "Answer", "text": "Candeur Eternia is located in Bachupally, Hyderabad — a fast-growing residential corridor with seamless connectivity to Miyapur Metro, HITEC City, Kukatpally and ORR." } },
        { "@type": "Question", "name": "What configurations are available at Candeur Eternia?", "acceptedAnswer": { "@type": "Answer", "text": "Premium 2 BHK (1462 / 1546 sft), 3B2T (1590 / 1619 sft) and 3B3T (1711 / 1874 / 2004 / 2192 sft) apartments." } },
        { "@type": "Question", "name": "Is Candeur Eternia RERA approved?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Candeur Eternia is RERA approved with registration number P02200010709." } },
        { "@type": "Question", "name": "What amenities are available at Candeur Eternia?", "acceptedAnswer": { "@type": "Answer", "text": "73,000 sft clubhouse with 5 levels, swimming pool, gymnasium, yoga deck, kids play area, jogging track, indoor games, landscaped gardens, EV charging, 100% power backup and 24x7 security." } },
        { "@type": "Question", "name": "How is the connectivity from Candeur Eternia?", "acceptedAnswer": { "@type": "Answer", "text": "Excellent — Miyapur Metro, KPHB, HITEC City, Gachibowli, ORR exit and top schools/hospitals are all within easy reach." } },
        { "@type": "Question", "name": "Is Candeur Eternia good for investment?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Bachupally is a high-growth IT-corridor neighbourhood with strong rental demand and long-term capital appreciation." } },
      ]
    }
  ]
};

const highlights = [
  { icon: <Shield className="w-5 h-5" />, label: "Premium Gated Community" },
  { icon: <Home className="w-5 h-5" />, label: "2, 2.5 & 3 BHK Apartments" },
  { icon: <MapPin className="w-5 h-5" />, label: "Prime Bachupally Location" },
  { icon: <Star className="w-5 h-5" />, label: "73,000 sft Grand Clubhouse" },
  { icon: <Zap className="w-5 h-5" />, label: "EV Charging Provision" },
  { icon: <CheckCircle2 className="w-5 h-5" />, label: "100% Power Backup" },
  { icon: <TreePine className="w-5 h-5" />, label: "Landscaped Open Spaces" },
  { icon: <Shield className="w-5 h-5" />, label: "Smart Security" },
];

const amenityCategories = [
  { title: "Lifestyle", icon: <Star className="w-5 h-5" />, items: ["Grand Clubhouse (73,000 sft)", "5 Levels of Clubhouses", "Swimming Pool", "Multipurpose Hall"] },
  { title: "Sports & Fitness", icon: <Dumbbell className="w-5 h-5" />, items: ["Gymnasium", "Yoga Deck", "Badminton Court", "Jogging Track"] },
  { title: "Community", icon: <Users className="w-5 h-5" />, items: ["Co-working Spaces", "Kids Play Area", "Indoor Games", "Senior Citizen Lounge"] },
  { title: "Wellness & Green", icon: <TreePine className="w-5 h-5" />, items: ["Landscaped Gardens", "CCTV Security", "EV Charging", "100% Power Backup"] },
];

const locationItems = [
  { name: "Miyapur Metro", time: "10 mins" },
  { name: "Kukatpally / KPHB", time: "12 mins" },
  { name: "HITEC City", time: "25 mins" },
  { name: "Gachibowli", time: "30 mins" },
  { name: "ORR Exit", time: "8 mins" },
  { name: "Oakridge International School", time: "15 mins" },
  { name: "DPS Bachupally", time: "10 mins" },
  { name: "Mamata Hospital", time: "10 mins" },
];

const faqs = [
  { q: "Where is Candeur Eternia located?", a: "Candeur Eternia is located in Bachupally, Hyderabad — a fast-growing residential corridor with seamless connectivity to Miyapur Metro, HITEC City, Kukatpally and ORR." },
  { q: "What configurations are available?", a: "Premium 2 BHK (1462 / 1546 sft), 3B2T (1590 / 1619 sft) and 3B3T (1711 / 1874 / 2004 / 2192 sft) apartments." },
  { q: "Is the project RERA approved?", a: "Yes. Candeur Eternia is RERA approved with registration number P02200010709." },
  { q: "What amenities are available?", a: "A 73,000 sft clubhouse with 5 levels, swimming pool, gymnasium, yoga deck, kids play area, jogging track, indoor games, landscaped gardens, EV charging, 100% power backup and 24x7 security." },
  { q: "How is the connectivity?", a: "Excellent — Miyapur Metro, KPHB, HITEC City, Gachibowli, ORR exit and top schools/hospitals are all within easy reach." },
  { q: "Is it good for investment?", a: "Yes. Bachupally is a high-growth IT-corridor neighbourhood with strong rental demand and long-term capital appreciation." },
];

const CandeurEterniaPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("General");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [exitShown, setExitShown] = useState(false);

  const openPopup = (src: string) => { setPopupSource(src); setPopupOpen(true); };

  // 8s entry popup
  useEffect(() => {
    const key = "timed_popup_candeur_eternia";
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => { openPopup("Entry – Unlock Project Details"); sessionStorage.setItem(key, "done"); }, 8000);
    return () => clearTimeout(t);
  }, []);

  // Exit-intent popup
  useEffect(() => {
    if (exitShown) return;
    const key = "exit_popup_candeur_eternia";
    if (sessionStorage.getItem(key)) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitShown) {
        setExitShown(true);
        sessionStorage.setItem(key, "done");
        openPopup("Exit Intent – Talk to Expert");
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
        title="Candeur Eternia Bachupally Hyderabad | Premium Apartments | Naani Projects"
        description="Explore Candeur Eternia in Bachupally, Hyderabad featuring premium 2, 2.5 & 3 BHK apartments with luxury amenities, excellent connectivity, and world-class lifestyle features. Book your free site visit today with Naani Projects."
        canonicalUrl={PAGE_URL}
        keywords="Candeur Eternia, Candeur Eternia Bachupally, Apartments in Bachupally, Luxury Apartments Hyderabad, Premium Flats Hyderabad, New Launch Apartments Bachupally"
        ogImage={heroImg}
        structuredData={structuredData}
      />

      <ProjectHeader projectName={PROJECT_NAME} />

      {/* HERO */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Candeur Eternia Bachupally Hyderabad luxury high-rise apartments night view" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-slate-950" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl space-y-6 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">RERA P02200010709 · New Launch</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Experience Elevated Living at{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Candeur Eternia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Premium High-Rise 2, 2.5 &amp; 3 BHK Apartments in Bachupally, Hyderabad — 7.7 acres, 4 towers, 33 floors, 73,000 sft clubhouse.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["7.7 Acres", "4 Towers", "33 Floors", "1505 Units", "73K sft Clubhouse", "5 Clubhouse Levels"].map(h => (
              <span key={h} className="px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">{h}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={() => openPopup("Hero – Download Brochure")} size="lg" className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/25">
              <Download className="w-5 h-5 mr-2" /> Download Brochure
            </Button>
            <Button onClick={() => openPopup("Hero – Book Site Visit")} size="lg" variant="outline" className="lead-btn border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-8 py-6 text-lg">
              <Calendar className="w-5 h-5 mr-2" /> Book Site Visit
            </Button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-6 rounded-md text-lg">
              <MessageCircle className="w-5 h-5" /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Quick Highlights</h2>
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

      {/* ABOUT */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">About Candeur Eternia</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={towersImg} alt="Candeur Eternia 4 premium towers Bachupally Hyderabad architectural elevation" className="rounded-2xl border border-amber-500/20 cursor-pointer hover:scale-[1.02] transition-transform" loading="lazy" onClick={() => setLightboxImg(towersImg)} />
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Candeur Eternia</strong> is a residential apartment community located in Bachupally, Hyderabad. This project offers 2, 2.5, and 3 BHK apartments, clubhouse amenities, and access to nearby schools, hospitals, and IT corridors.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  ["Project Type", "Premium High-Rise"],
                  ["Configurations", "2, 2.5 & 3 BHK"],
                  ["Total Units", "1,505"],
                  ["Possession", "December 2029"],
                  ["RERA", "P02200010709"],
                  ["Developer", "Candeur Developers"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-[10px] uppercase text-gray-400 tracking-wider">{k}</p>
                    <p className="text-sm font-semibold text-amber-300 mt-1">{v}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => openPopup("About – Get Details")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white mt-4">
                Get Complete Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIGURATION */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Configurations & Sizes</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Spacious, naturally ventilated layouts with large balconies and premium specifications.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: "2 BHK", sizes: "1462 / 1546 sft", note: "Smart, family-friendly homes" },
              { type: "3 BHK · 2T", sizes: "1590 / 1619 sft", note: "Premium space planning" },
              { type: "3 BHK · 3T", sizes: "1711 / 1874 / 2004 / 2192 sft", note: "Expansive luxury layouts" },
            ].map(c => (
              <div key={c.type} className="bg-white/5 border border-amber-500/20 rounded-2xl p-8 space-y-3 hover:border-amber-500/50 transition-all">
                <Home className="w-10 h-10 text-amber-500" />
                <h3 className="text-2xl font-bold text-white">{c.type}</h3>
                <p className="text-amber-300 font-medium">{c.sizes}</p>
                <p className="text-gray-400 text-sm">{c.note}</p>
                <Button onClick={() => openPopup(`Config – ${c.type} Floor Plan`)} className="lead-btn w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white mt-2">
                  Get Floor Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">World-Class Amenities</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">A 73,000 sft clubhouse spread across 5 levels, plus everything you need for elevated everyday living.</p>
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
          <div className="mt-10">
            <img src={clubhouseImg} alt="Candeur Eternia clubhouse and landscaped community amenities Bachupally" className="rounded-2xl w-full border border-amber-500/20 cursor-pointer hover:scale-[1.01] transition-transform" loading="lazy" onClick={() => setLightboxImg(clubhouseImg)} />
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Location Advantages</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Bachupally is one of Hyderabad's most connected and rapidly appreciating residential corridors.</p>
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
              src="https://www.google.com/maps?q=Bachupally+Hyderabad&output=embed"
              className="w-full h-80"
              loading="lazy"
              title="Candeur Eternia Bachupally location map"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: heroImg, alt: "Candeur Eternia exterior tower facade night Bachupally" },
              { src: clubhouseImg, alt: "Candeur Eternia clubhouse and landscaped open spaces" },
              { src: towersImg, alt: "Candeur Eternia 4 premium high-rise towers" },
              { src: masterplanImg, alt: "Candeur Eternia masterplan layout 7.7 acres community" },
            ].map((g, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-amber-500/15 cursor-pointer group" onClick={() => setLightboxImg(g.src)}>
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASTERPLAN & PAYMENT */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Masterplan</h3>
            <img src={masterplanImg} alt="Candeur Eternia masterplan with towers, clubhouses and amenities" className="rounded-2xl border border-amber-500/20 cursor-pointer hover:scale-[1.01] transition-transform" loading="lazy" onClick={() => setLightboxImg(masterplanImg)} />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Flexible Payment Plan</h3>
            <img src={paymentImg} alt="Candeur Eternia flexible payment plan structure" className="rounded-2xl border border-amber-500/20 cursor-pointer hover:scale-[1.01] transition-transform" loading="lazy" onClick={() => setLightboxImg(paymentImg)} />
            <Button onClick={() => openPopup("Payment Plan")} className="lead-btn w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
              Get Detailed Payment Plan
            </Button>
          </div>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className={`${sectionClass} bg-gradient-to-b from-black via-slate-950 to-slate-900`}>
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Why Invest in Candeur Eternia</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <TrendingUp className="w-6 h-6" />, t: "High Growth Corridor", d: "Bachupally is among Hyderabad's fastest-appreciating IT-belt zones." },
              { icon: <Building2 className="w-6 h-6" />, t: "IT Connectivity", d: "Easy reach to HITEC City, Gachibowli & Financial District." },
              { icon: <Award className="w-6 h-6" />, t: "Trusted Developer", d: "Candeur Developers — known for quality and timely delivery." },
              { icon: <Star className="w-6 h-6" />, t: "Premium Lifestyle", d: "73,000 sft clubhouse and 5 levels of curated amenities." },
              { icon: <Layers className="w-6 h-6" />, t: "Future-Ready", d: "EV charging, smart security, 100% backup, modern infra." },
              { icon: <Shield className="w-6 h-6" />, t: "RERA Approved", d: "Clear title, bank-approved, RERA P02200010709." },
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
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">Frequently Asked <span className="text-amber-400">Questions</span></h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden transition-all">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-4 md:p-5 flex items-center justify-between font-bold text-white text-base md:text-lg hover:text-amber-400 transition-colors">
                  <span>{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-4 pb-4 md:px-5 md:pb-5 text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-800/50 pt-3">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated living at Candeur Eternia. Discover spacious 2 & 3 BHK luxury homes, premium amenities, and a vibrant community designed for modern lifestyles.
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

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-4 right-4 text-white p-2"><X className="w-8 h-8" /></button>
          <img src={lightboxImg} alt="Candeur Eternia gallery view enlarged" className="max-h-[90vh] max-w-full rounded-lg" loading="lazy" decoding="async" />
        </div>
      )}

      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={popupSource} projectName={PROJECT_NAME} />
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </div>
  );
};

export default CandeurEterniaPage;
