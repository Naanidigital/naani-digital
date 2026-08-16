import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import ProjectHeader from "@/components/ProjectHeader";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Building2, Layers, ArrowUp, ChevronLeft, ChevronRight, ChevronDown, Maximize2, X, CheckCircle2, Calendar, Download, Shield, Clock, Award, Home, Dumbbell, Users, TreePine, TrendingUp, Star } from "lucide-react";

import heroImg from "@/assets/team4-aria/hero.png";
import masterplanImg from "@/assets/team4-aria/masterplan.jpg";
import towerAD from "@/assets/team4-aria/tower-a-d.jpg";
import towerBE1 from "@/assets/team4-aria/tower-b-e-1.png";
import towerBE2 from "@/assets/team4-aria/tower-b-e-2.png";
import towerCF from "@/assets/team4-aria/tower-c-f.png";
import towerG from "@/assets/team4-aria/tower-g.png";

const PROJECT_NAME = "Team4 Aria Miyapur";
const WA_MSG = encodeURIComponent("Hi, I'm interested in Team4 Aria Miyapur. Please share details.");
const WA_LINK = `https://wa.me/919705080909?text=${WA_MSG}`;
const CALL_LINK = "tel:+919705080909";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "name": "Team4 Aria Miyapur – Ultra Luxury 3 & 3.5 BHK Apartments",
      "description": "Ultra luxury G+48 high-rise apartments in Miyapur, Hyderabad with 3.5 acre central courtyard, infinity pool & premium amenities.",
      "url": "https://www.naani.in/projects/team4-aria-miyapur-luxury-apartments-hyderabad",
      "image": "https://www.naani.in/team4-aria-hero.png",
      "datePosted": "2026-04-15",
      "address": { "@type": "PostalAddress", "addressLocality": "Miyapur", "addressRegion": "Hyderabad", "addressCountry": "IN" },
      "offers": { "@type": "AggregateOffer", "priceCurrency": "INR", "lowPrice": "6099", "highPrice": "6399", "unitText": "per sq.ft" }
    },
    {
      "@type": "LocalBusiness",
      "name": "Team4 Aria Miyapur Sales Office",
      "telephone": "+91-9705080909",
      "address": { "@type": "PostalAddress", "addressLocality": "Miyapur, Hyderabad", "addressCountry": "India" },
      "url": "https://www.naani.in/projects/team4-aria-miyapur-luxury-apartments-hyderabad"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the price of Team4 Aria Miyapur?", "acceptedAnswer": { "@type": "Answer", "text": "EOI Price starts from ₹6,099 – ₹6,399 per sq.ft. Special OTP pricing available during pre-launch." } },
        { "@type": "Question", "name": "What are the configurations available?", "acceptedAnswer": { "@type": "Answer", "text": "3 BHK (1490–1998 sq.ft) and 3.5 BHK (2056–2218 sq.ft) ultra luxury apartments." } },
        { "@type": "Question", "name": "When is the possession date?", "acceptedAnswer": { "@type": "Answer", "text": "Expected possession is January 2031. RERA Number: P02400010543." } },
        { "@type": "Question", "name": "Where is Team4 Aria located?", "acceptedAnswer": { "@type": "Answer", "text": "Miyapur, Hyderabad – 4 mins from Miyapur Metro, close to HITEC City & Gachibowli." } },
        { "@type": "Question", "name": "How many towers does Team4 Aria have?", "acceptedAnswer": { "@type": "Answer", "text": "7 high-rise towers (G+48 floors) spread across 12.35 acres with 3.5 acre central courtyard." } }
      ]
    }
  ]
};

const floorPlans = [
  { name: "Tower A & D", img: towerAD, alt: "Team4 Aria Miyapur Tower A D floor plan 3 BHK Hyderabad" },
  { name: "Tower B & E (Central Balconies)", img: towerBE1, alt: "Team4 Aria Miyapur Tower B E floor plan central balconies" },
  { name: "Tower B & E (Full Balconies)", img: towerBE2, alt: "Team4 Aria Miyapur Tower B E floor plan full balconies" },
  { name: "Tower C & F", img: towerCF, alt: "Team4 Aria Miyapur Tower C F floor plan 3 BHK" },
  { name: "Tower G", img: towerG, alt: "Team4 Aria Miyapur Tower G floor plan 3.5 BHK" },
];

const amenityCategories = [
  { title: "Lifestyle", icon: <Star className="w-5 h-5" />, items: ["Infinity Swimming Pool", "Olympic Swimming Pool", "Spa & Sauna", "Grand Clubhouse"] },
  { title: "Sports", icon: <Dumbbell className="w-5 h-5" />, items: ["Badminton Courts", "Tennis Court", "Cricket Pitch", "Basketball Court"] },
  { title: "Community", icon: <Users className="w-5 h-5" />, items: ["Amphitheatre", "Party Hall", "Kids Play Area", "Co-working Space"] },
  { title: "Fitness", icon: <TreePine className="w-5 h-5" />, items: ["Gym", "Jogging Track", "Aerobics Room", "Yoga Deck"] },
];

const faqs = [
  { q: "What is the price of Team4 Aria Miyapur?", a: "EOI Price starts from ₹6,099 – ₹6,399 per sq.ft. Special OTP pricing is available during the pre-launch phase. Contact us at 9705080909 for the latest offers." },
  { q: "What are the unit configurations available?", a: "Team4 Aria offers spacious 3 BHK (1490–1998 sq.ft) and 3.5 BHK (2056–2218 sq.ft) ultra luxury apartments designed for maximum ventilation and natural light." },
  { q: "When is the expected possession date?", a: "Expected possession is January 2031. The project is currently in Pre-Launch / EOI Phase. RERA Number: P02400010543." },
  { q: "Where is Team4 Aria Miyapur located?", a: "Located in Miyapur, Hyderabad – just 4 mins from Miyapur Metro Station, with easy connectivity to HITEC City, Gachibowli, and ORR." },
  { q: "How many towers and floors does the project have?", a: "Team4 Aria features 7 high-rise towers with G+48 floors each, spread across a massive 12.35-acre campus with a 3.5-acre central courtyard." },
  { q: "Is Team4 Aria RERA approved?", a: "Yes, Team4 Aria Miyapur is RERA approved with registration number P02400010543." },
  { q: "What amenities does Team4 Aria offer?", a: "The project features dual clubhouses, Olympic & rooftop infinity pools, tennis & badminton courts, gym, spa, amphitheatre, jogging track, kids play area, and much more." },
  { q: "Is Team4 Aria a good investment?", a: "Absolutely. Miyapur is a well-connected residential corridor in West Hyderabad with metro access, IT proximity, and steady rental interest." },
];

const Team4AriaMiyapurPage = () => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("General");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [floorPlanIdx, setFloorPlanIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openPopup = (src: string) => { setPopupSource(src); setPopupOpen(true); };

  // Timed popup at 5s
  useEffect(() => {
    const key = `timed_popup_team4aria`;
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => { openPopup("5-Second Auto Popup"); sessionStorage.setItem(key, "done"); }, 5000);
    return () => clearTimeout(t);
  }, []);

  // Scroll top button
  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const sectionClass = "py-16 md:py-24 px-4";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead
        title="Team4 Aria Miyapur | Price, Floor Plans & Luxury Apartments Hyderabad"
        description="Explore Team4 Aria Miyapur – ultra luxury 3 & 3.5 BHK apartments in Hyderabad with 3.5 acre courtyard, infinity pool & premium amenities. Book site visit now."
        canonicalUrl="https://www.naani.in/projects/team4-aria-miyapur-luxury-apartments-hyderabad"
        keywords="Team4 Aria Miyapur, Luxury apartments Miyapur, 3 BHK flats Hyderabad, High rise apartments Hyderabad, Pre launch projects Miyapur"
        ogImage="https://www.naani.in/og/team4-aria.png"
        structuredData={structuredData}
      />

      <ProjectHeader projectName={PROJECT_NAME} />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Team4 Aria Miyapur ultra luxury high rise apartments Hyderabad aerial view" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-950" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl space-y-6 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">Pre-Launch | EOI Phase – Limited Slots</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Miyapur's Only <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">G+48</span> Ultra Luxury High-Rise Living
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">3 & 3.5 BHK Premium Residences with 3.5 Acre Central Courtyard & Infinity Lifestyle</p>

          {/* Highlights pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["12.35 Acres", "7 Towers (G+48)", "10.5 Ft Ceiling", "1:1 Lift Ratio", "Dual Clubhouses", "Infinity Pools"].map(h => (
              <span key={h} className="px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">{h}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={() => openPopup("Hero – Get Price Details")} size="lg" className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/25">
              Get Price Details
            </Button>
            <Button onClick={() => openPopup("Hero – Book Site Visit")} size="lg" variant="outline" className="lead-btn border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-8 py-6 text-lg">
              <Calendar className="w-5 h-5 mr-2" /> Book Site Visit
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-6 text-gray-400 text-sm">
            {["RERA Approved", "Bank Approved", "Clear Title"].map(b => (
              <span key={b} className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full" />{b}</span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex justify-center pt-2"><div className="w-1.5 h-3 bg-amber-500 rounded-full animate-pulse" /></div></div>
      </section>

      {/* ===== PROJECT OVERVIEW ===== */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                ["Project Type", "Ultra Luxury High-Rise Apartments"],
                ["Land Area", "12.35 Acres"],
                ["Towers", "7 Towers"],
                ["Floors", "G+48"],
                ["Parking", "Podium Parking"],
                ["Road Frontage", "900 Ft"],
                ["Status", "Pre Launch / EOI Phase"],
                ["RERA No.", "P02400010543"],
                ["Possession", "January 2031"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-amber-300">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-semibold text-amber-300">About the Project</h3>
              <p className="text-gray-300 leading-relaxed">Team4 Aria Miyapur is a landmark ultra-luxury residential development designed for premium living and long-term investment growth. Spread across 12.35 acres in Miyapur, Hyderabad, this iconic G+48 high-rise community features 7 magnificent towers with 3 & 3.5 BHK residences ranging from 1490 to 2218 sq.ft.</p>
              <p className="text-gray-300 leading-relaxed">With a 3.5-acre central courtyard, dual clubhouses, Olympic and infinity pools, and 10.5 ft ceiling heights, Team4 Aria redefines luxury apartment living in West Hyderabad. The project offers a 1:1 lift ratio, podium parking, and 900 ft road frontage for unmatched convenience.</p>
              <Button onClick={() => openPopup("Overview – Get Details")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white mt-4">Get Complete Details</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICE SECTION ===== */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Price Details</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-amber-500/20 rounded-2xl p-8 space-y-3">
              <p className="text-gray-400 text-sm">EOI Price</p>
              <p className="text-3xl font-bold text-white">₹6,099 – ₹6,399 <span className="text-lg font-normal text-amber-300">/ sq.ft</span></p>
            </div>
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-500/10 border border-amber-500/30 rounded-2xl p-8 space-y-3">
              <p className="text-gray-400 text-sm">Special OTP Price</p>
              <p className="text-3xl font-bold text-white">₹5XXX <span className="text-lg font-normal text-amber-300">/ sq.ft + PLC</span></p>
              <p className="text-amber-300 text-sm">🔥 Pre-launch exclusive pricing</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">⚠️ Limited inventory available in pre-launch phase. Prices may increase anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => openPopup("Price – Download Price Sheet")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6"><Download className="w-5 h-5 mr-2" />Download Price Sheet</Button>
            <Button onClick={() => openPopup("Price – Check Availability")} variant="outline" className="lead-btn border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-8 py-6">Check Availability</Button>
          </div>
        </div>
      </section>

      {/* ===== CONFIGURATIONS ===== */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Unit Configurations</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/40 transition-colors">
              <Home className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">3 BHK</h3>
              <p className="text-3xl font-bold text-amber-300">1490 – 1998 <span className="text-base font-normal text-gray-400">Sq.ft</span></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/40 transition-colors">
              <Building2 className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">3.5 BHK</h3>
              <p className="text-3xl font-bold text-amber-300">2056 – 2218 <span className="text-base font-normal text-gray-400">Sq.ft</span></p>
            </div>
          </div>
          <p className="text-gray-400">Spacious layouts designed for maximum ventilation, natural light, and privacy.</p>
        </div>
      </section>

      {/* ===== USP ===== */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Why This Project is Unique</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <TreePine className="w-8 h-8" />, title: "3.5 Acre Central Courtyard", desc: "Massive landscaped courtyard offering resort-style living experience" },
              { icon: <Maximize2 className="w-8 h-8" />, title: "Open Green Views", desc: "Most units enjoy unobstructed green views from every room" },
              { icon: <ArrowUp className="w-8 h-8" />, title: "10.5 Ft Ceiling Height", desc: "Grand ceiling height for a spacious, premium feel" },
              { icon: <Layers className="w-8 h-8" />, title: "Cross Ventilation Design", desc: "Thoughtful layouts ensuring natural air flow and light" },
              { icon: <Shield className="w-8 h-8" />, title: "Low Density Planning", desc: "Exclusive community with fewer units per floor" },
              { icon: <Award className="w-8 h-8" />, title: "Premium Lifestyle", desc: "Complete lifestyle ecosystem with dual clubhouses" },
            ].map(u => (
              <div key={u.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all group">
                <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform">{u.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{u.title}</h3>
                <p className="text-gray-400 text-sm">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MASTERPLAN ===== */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Master Plan</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">7 towers spread across 12.35 acres with a 3.5-acre central courtyard, dual clubhouses, and world-class amenities</p>
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 cursor-pointer group" onClick={() => setLightboxImg(masterplanImg)}>
            <img src={masterplanImg} alt="Team4 Aria Miyapur master plan layout 7 towers Hyderabad" className="w-full group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <Maximize2 className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLOOR PLANS ===== */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Floor Plans</h2>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {floorPlans.map((fp, i) => (
              <button key={fp.name} onClick={() => setFloorPlanIdx(i)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === floorPlanIdx ? "bg-amber-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>{fp.name}</button>
            ))}
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 cursor-pointer group" onClick={() => setLightboxImg(floorPlans[floorPlanIdx].img)}>
            <img src={floorPlans[floorPlanIdx].img} alt={floorPlans[floorPlanIdx].alt} className="w-full group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center">
              <Maximize2 className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <Button onClick={() => openPopup("Floor Plan – Download")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6">
            <Download className="w-5 h-5 mr-2" /> Download Floor Plans
          </Button>
        </div>
      </section>

      {/* ===== AMENITIES ===== */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Amenities</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">A lifestyle ecosystem designed for wellness, recreation, and community living.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenityCategories.map(cat => (
              <div key={cat.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-2 text-amber-500 mb-4">{cat.icon}<h3 className="text-lg font-semibold text-white">{cat.title}</h3></div>
                <ul className="space-y-2">
                  {cat.items.map(it => <li key={it} className="text-gray-400 text-sm flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Prime Location – Miyapur</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" />Connectivity</h3>
                <ul className="space-y-3">
                  {["4 mins to Miyapur Metro", "Close to HITEC City & Gachibowli", "Easy access to ORR", "Near top schools & hospitals"].map(c => (
                    <li key={c} className="text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-4">Nearby Landmarks</h3>
                <ul className="space-y-3">
                  {["JNTU – 13 mins", "Hospitals – 5 to 10 mins", "Shopping malls – 10 to 15 mins", "IT Corridor – 20 mins"].map(l => (
                    <li key={l} className="text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />{l}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-400 text-sm">Miyapur is one of Hyderabad's fastest-growing real estate investment hubs, offering excellent metro connectivity, proximity to IT corridors, and strong rental demand.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-amber-500/20 h-[400px]">
              <iframe
                title="Team4 Aria Miyapur Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2!2d78.35!3d17.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMiyapur%2C+Hyderabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== INVESTMENT ===== */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Why Invest in Team4 Aria</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <TrendingUp className="w-8 h-8" />, title: "High Appreciation", desc: "Pre-launch pricing with strong value growth potential in West Hyderabad" },
              { icon: <Building2 className="w-8 h-8" />, title: "IT Hub Proximity", desc: "Close to HITEC City, Gachibowli, and Financial District" },
              { icon: <Award className="w-8 h-8" />, title: "Luxury Demand", desc: "Growing demand for ultra high-rise luxury in West Hyderabad" },
              { icon: <Star className="w-8 h-8" />, title: "Rental Yield", desc: "Strong rental income potential due to IT workforce demand" },
              { icon: <MapPin className="w-8 h-8" />, title: "Metro Connected", desc: "4 mins from Miyapur Metro – the busiest metro station" },
              { icon: <Shield className="w-8 h-8" />, title: "Pre-Launch Advantage", desc: "Lock in lowest price before public launch price revision" },
            ].map(inv => (
              <div key={inv.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all group">
                <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform">{inv.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{inv.title}</h3>
                <p className="text-gray-400 text-sm">{inv.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => openPopup("Investment – Free Consultation")} size="lg" className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6 text-lg">
              Schedule Free Investment Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PROJECT STATUS ===== */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Timeline</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Clock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Status</p>
              <p className="font-semibold text-amber-300">Under Construction</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Possession</p>
              <p className="font-semibold text-amber-300">January 2031</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Shield className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-sm text-gray-400">RERA</p>
              <p className="font-semibold text-amber-300 text-xs md:text-sm">P02400010543</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
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

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#01406D]/70 via-[hsl(205,50%,10%)] to-background border-t border-[#01B4BA]/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-[#FF7A0F]">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated living at Team4 Aria Miyapur. Discover spacious 3 &amp; 3.5 BHK luxury homes, world-class amenities, and a vibrant community designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button data-lead-gate="sitevisit" onClick={() => openPopup("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-[#FF7A0F] hover:bg-[#e06800] text-white transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openPopup("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-[#01B4BA] hover:bg-[#019aa0] text-white transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-6">
            <a href={CALL_LINK} className="call-btn text-[#01B4BA] hover:text-[#FF7A0F] font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <Phone size={18} /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-amber-300 mb-4">Team4 Aria Miyapur</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Ultra luxury G+48 high-rise apartments in Miyapur, Hyderabad. 3 & 3.5 BHK residences with world-class amenities.</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 mb-4">Configurations</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>3 BHK – 1490 to 1998 Sq.ft</li>
                <li>3.5 BHK – 2056 to 2218 Sq.ft</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 mb-4">Key Highlights</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>12.35 Acres Campus</li>
                <li>7 Towers, G+48 Floors</li>
                <li>3.5 Acre Courtyard</li>
                <li>Dual Clubhouses</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 mb-4">Contact</h3>
              <div className="space-y-3">
                <a href={CALL_LINK} className="call-btn flex items-center gap-2 text-gray-300 hover:text-amber-300 text-sm"><Phone className="w-4 h-4" />+91 97050 80909</a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn flex items-center gap-2 text-gray-300 hover:text-green-400 text-sm"><MessageCircle className="w-4 h-4" />WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-gray-500 text-xs">
            <p>© 2026 Team4 Aria Miyapur. All rights reserved. | RERA No: P02400010543</p>
            <p className="mt-1">Marketing Partner: <a href="https://www.naani.in" className="text-amber-500 hover:underline">Naani Projects</a></p>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-sm border-t border-amber-500/20 p-3 flex gap-2">
        <a href={CALL_LINK} className="call-btn flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg"><Phone className="w-4 h-4" />Call</a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white text-sm font-semibold py-3 rounded-lg"><MessageCircle className="w-4 h-4" />WhatsApp</a>
        <button onClick={() => openPopup("Sticky CTA – Enquire")} className="lead-btn flex-1 flex items-center justify-center gap-1.5 bg-amber-500 text-white text-sm font-semibold py-3 rounded-lg">Enquire</button>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-20 md:bottom-8 right-4 z-50 w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-amber-600 transition-colors">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-4 right-4 text-white"><X className="w-8 h-8" /></button>
          <img src={lightboxImg} alt="Full view" loading="lazy" decoding="async" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Popups */}
      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={popupSource} projectName={PROJECT_NAME} />
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </div>
  );
};

export default Team4AriaMiyapurPage;
