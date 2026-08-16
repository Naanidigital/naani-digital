import { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import ProjectHeader from "@/components/ProjectHeader";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import { Button } from "@/components/ui/button";
import {
  Phone, MessageCircle, MapPin, Building2, ArrowUp, Maximize2, X, CheckCircle2,
  Calendar, Download, Shield, Clock, Award, Home, Dumbbell, Users, TreePine,
  TrendingUp, Star, Layers,
} from "lucide-react";

import heroImg from "@/assets/rajapushpa-sierra/hero.webp";
import exteriorImg from "@/assets/rajapushpa-sierra/exterior-1.jpg";
import communityImg from "@/assets/rajapushpa-sierra/community.jpg";
import lifestyle1Img from "@/assets/rajapushpa-sierra/lifestyle-1.jpg";
import lifestyle2Img from "@/assets/rajapushpa-sierra/lifestyle-2.jpg";
import clubhouseImg from "@/assets/rajapushpa-sierra/clubhouse.png";

const PROJECT_NAME = "Rajapushpa Sierra";
const WA_MSG = encodeURIComponent("Hi, I'm interested in Rajapushpa Sierra. Please share details.");
const WA_LINK = `https://wa.me/919705080909?text=${WA_MSG}`;
const CALL_LINK = "tel:+919705080909";
const PAGE_URL = "https://www.naani.in/projects/rajapushpa-sierra-tellapur-hyderabad";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "name": "Rajapushpa Sierra Tellapur – Luxury 2 & 3 BHK Apartments",
      "description": "Premium G+49 high-rise 2 & 3 BHK apartments in Tellapur, Hyderabad with 1.5 lakh sqft clubhouse and 150-acre lifestyle township.",
      "url": PAGE_URL,
      "image": "https://www.naani.in/og-rajapushpa-sierra.jpg",
      "datePosted": "2026-04-21",
      "address": { "@type": "PostalAddress", "addressLocality": "Tellapur", "addressRegion": "Hyderabad", "addressCountry": "IN" },
      "offers": { "@type": "AggregateOffer", "priceCurrency": "INR", "lowPrice": "9400000", "highPrice": "30000000" }
    },
    {

      "@type": "RealEstateAgent",
      "name": "Naani Projects – Rajapushpa Sierra Sales Partner",
      "telephone": "+91-9705080909",
      "url": PAGE_URL,
      "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressCountry": "India" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the price of Rajapushpa Sierra?", "acceptedAnswer": { "@type": "Answer", "text": "Rajapushpa Sierra Tellapur starts from ₹94 Lakhs for 2 BHK and ₹1.2 Crore onwards for 3 BHK luxury apartments." } },
        { "@type": "Question", "name": "Where is Rajapushpa Sierra located?", "acceptedAnswer": { "@type": "Answer", "text": "Rajapushpa Sierra is located in Tellapur, Hyderabad – just 15 minutes from Gachibowli & Financial District with excellent ORR connectivity." } },
        { "@type": "Question", "name": "Is Rajapushpa Sierra a good investment?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Tellapur is one of Hyderabad's fastest-appreciating IT corridor zones, with strong rental demand and a trusted developer track record from Rajapushpa." } },
        { "@type": "Question", "name": "What is the possession date of Rajapushpa Sierra?", "acceptedAnswer": { "@type": "Answer", "text": "Possession is expected by 2030. The project is currently under construction with active bookings open." } },
        { "@type": "Question", "name": "What amenities are available at Rajapushpa Sierra?", "acceptedAnswer": { "@type": "Answer", "text": "1.5 lakh sqft grand clubhouse, swimming pool, gym, sports courts, kids play area, jogging tracks, indoor games, co-working spaces and 24/7 security." } }
      ]
    }
  ]
};

const faqs = [
  { q: "What is the price of Rajapushpa Sierra?", a: "Rajapushpa Sierra Tellapur starts from ₹94 Lakhs for 2 BHK and ₹1.2 Crore onwards for 3 BHK luxury apartments. Final pricing depends on tower, floor, and unit facing." },
  { q: "Where is Rajapushpa Sierra located?", a: "Located in Tellapur, Hyderabad – within Rajapushpa Lifestyle City, a 150-acre integrated township. It is just 15 minutes from Gachibowli & Financial District and offers easy access to ORR." },
  { q: "Is Rajapushpa Sierra a good investment?", a: "Yes. Tellapur is one of Hyderabad's fastest-appreciating zones thanks to IT-corridor proximity, planned infrastructure, and strong rental demand. Rajapushpa is a trusted developer known for timely delivery." },
  { q: "What is the possession date of Rajapushpa Sierra?", a: "Possession is expected by 2030. The project is currently under construction with active EOI and bookings open in the pre-launch phase." },
  { q: "What amenities are available at Rajapushpa Sierra?", a: "Residents get a 1.5 lakh sqft grand clubhouse and sports complex, swimming pool, gym, indoor games, multiple sports courts, kids play area, jogging tracks, co-working spaces, and 24/7 security." },
  { q: "Is Rajapushpa Sierra RERA approved?", a: "Yes, Rajapushpa Sierra is RERA approved. Connect with our team on +91 97050 80909 for the full RERA registration details." },
  { q: "How many towers and floors are there?", a: "Sierra has 9 iconic towers with G+49 floors and 3,537 premium residences spread across 21.1 acres with 76% open spaces." },
];

const amenityCategories = [
  { title: "Lifestyle", icon: <Star className="w-5 h-5" />, items: ["Grand Clubhouse (1.5 Lakh Sft)", "Swimming Pool", "Spa & Sauna", "Banquet Hall"] },
  { title: "Sports", icon: <Dumbbell className="w-5 h-5" />, items: ["Badminton Court", "Squash Court", "Tennis Court", "Basketball Court"] },
  { title: "Community", icon: <Users className="w-5 h-5" />, items: ["Co-working Spaces", "Kids Play Area", "Multipurpose Hall", "Indoor Games"] },
  { title: "Wellness", icon: <TreePine className="w-5 h-5" />, items: ["Gym & Fitness", "Yoga Hall", "Jogging Tracks", "76% Open Spaces"] },
];

const RajapushpaSierraPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("General");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openPopup = (src: string) => { setPopupSource(src); setPopupOpen(true); };

  // 5-second auto popup
  useEffect(() => {
    const key = "timed_popup_rajapushpa_sierra";
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => { openPopup("5-Second Auto Popup"); sessionStorage.setItem(key, "done"); }, 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const sectionClass = "py-16 md:py-24 px-4";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead
        title="Rajapushpa Sierra Tellapur | Luxury 2 & 3 BHK Apartments"
        description="Buy premium 2 & 3 BHK apartments in Rajapushpa Sierra, Tellapur. G+49 luxury high-rise near Gachibowli & Financial District. Starting ₹94 Lakhs. Book site visit today."
        canonicalUrl={PAGE_URL}
        keywords="Rajapushpa Sierra, Rajapushpa Sierra Tellapur, Tellapur apartments, flats in Tellapur, luxury apartments Hyderabad, flats near Gachibowli, 2 BHK Tellapur, 3 BHK Tellapur, investment property Hyderabad"
        ogImage="https://www.naani.in/og/rajapushpa-sierra.png"
        structuredData={structuredData}
      />

      <ProjectHeader projectName={PROJECT_NAME} />

      {/* HERO */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Rajapushpa Sierra Tellapur Hyderabad luxury high-rise apartments aerial view" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-slate-950" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl space-y-6 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">RERA Approved | Now Open for Bookings</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Live Above the City – <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Luxury High-Rise</span> Living in Tellapur
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Experience 49-floor premium lifestyle at Rajapushpa Sierra, strategically located near Financial District & Gachibowli.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {["2 & 3 BHK", "150 Acre Township", "1.5 Lakh Sft Clubhouse", "G+49 Floors", "From ₹94 Lakhs"].map(h => (
              <span key={h} className="px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">{h}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={() => openPopup("Hero – Book Site Visit")} size="lg" className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/25">
              <Calendar className="w-5 h-5 mr-2" /> Book Free Site Visit
            </Button>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-6 rounded-md text-lg">
              <MessageCircle className="w-5 h-5" /> Get Brochure on WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-6 text-gray-400 text-sm">
            {["RERA Approved", "Trusted Builder", "Bank Approved", "Clear Title"].map(b => (
              <span key={b} className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full" />{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Trusted by Thousands of Homebuyers in Hyderabad</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Rajapushpa is one of Hyderabad's most trusted developers, known for premium construction quality, on-time delivery, and landmark projects across the city.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield className="w-6 h-6" />, label: "RERA Approved" },
              { icon: <MapPin className="w-6 h-6" />, label: "Prime Location" },
              { icon: <TrendingUp className="w-6 h-6" />, label: "High Appreciation Zone" },
              { icon: <Award className="w-6 h-6" />, label: "Trusted Builder" },
            ].map(b => (
              <div key={b.label} className="bg-white/5 border border-amber-500/20 rounded-xl p-5 flex flex-col items-center gap-2">
                <div className="text-amber-500">{b.icon}</div>
                <p className="text-sm font-medium">{b.label}</p>
              </div>
            ))}
          </div>
          <Button onClick={() => openPopup("Trust – Schedule Expert Call")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6">
            Schedule a Call with Expert
          </Button>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src={exteriorImg} alt="Rajapushpa Sierra Tellapur exterior elevation premium high-rise apartments" className="rounded-2xl border border-amber-500/20 cursor-pointer hover:scale-[1.02] transition-transform" loading="lazy" onClick={() => setLightboxImg(exteriorImg)} />
            <div className="space-y-4">
              {[
                ["Project Type", "Luxury High-Rise Apartments"],
                ["Land Area", "21.1 Acres (within 150-acre township)"],
                ["Towers", "9 Towers"],
                ["Floors", "G+49"],
                ["Total Units", "3,537 Apartments"],
                ["Configurations", "2 & 3 BHK"],
                ["Sizes", "1295 – 2555 Sq.ft"],
                ["Floor Height", "10.3 ft"],
                ["Possession", "2030"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-amber-300 text-right">{v}</span>
                </div>
              ))}
              <Button onClick={() => openPopup("Overview – Check Availability")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white mt-4">
                Check Availability Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Pricing & Floor Plans</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-amber-500/20 rounded-2xl p-8 space-y-3 text-left">
              <Home className="w-10 h-10 text-amber-500" />
              <p className="text-gray-400 text-sm">2 BHK – ~1295 Sq.ft</p>
              <p className="text-3xl font-bold text-white">₹94 Lakhs <span className="text-lg font-normal text-amber-300">onwards</span></p>
            </div>
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-500/10 border border-amber-500/30 rounded-2xl p-8 space-y-3 text-left">
              <Building2 className="w-10 h-10 text-amber-500" />
              <p className="text-gray-400 text-sm">3 BHK – 1665 to 2555 Sq.ft</p>
              <p className="text-3xl font-bold text-white">₹1.2 Cr <span className="text-lg font-normal text-amber-300">onwards</span></p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">⚠️ Limited inventory. Prices may rise with Tellapur's growing demand.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => openPopup("Price – Download Floor Plans")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6">
              <Download className="w-5 h-5 mr-2" />Download Floor Plans
            </Button>
            <Button onClick={() => openPopup("Price – Get Price Sheet")} variant="outline" className="lead-btn border-amber-500/50 text-amber-300 hover:bg-amber-500/10 px-8 py-6">
              Get Price Sheet
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Designed for the Life You Aspire</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: communityImg, alt: "Rajapushpa Sierra community living open spaces Tellapur" },
              { src: lifestyle1Img, alt: "Rajapushpa Sierra lifestyle family living premium apartments" },
              { src: lifestyle2Img, alt: "Rajapushpa Sierra wellness greenery cycling tracks Tellapur" },
              { src: clubhouseImg, alt: "Rajapushpa Sierra 1.5 lakh sft clubhouse and sports complex" },
            ].map((g, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-amber-500/15 cursor-pointer group" onClick={() => setLightboxImg(g.src)}>
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">World-Class Amenities for Premium Lifestyle</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Over 1,50,000 sft of clubhouse and sports complex thoughtfully crafted for recreation, wellness and community.</p>
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
          <div className="text-center mt-10">
            <Button onClick={() => openPopup("Amenities – Explore")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6">
              Explore Amenities
            </Button>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Prime Location in Tellapur – Future Growth Hub</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" />Connectivity</h3>
                <ul className="space-y-3">
                  {[
                    "15 mins to Gachibowli & Financial District",
                    "Close to ORR (Outer Ring Road)",
                    "Near top IT companies, schools & hospitals",
                    "Excellent connectivity to Hyderabad hotspots",
                  ].map(c => (
                    <li key={c} className="text-gray-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{c}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-400 text-sm">Tellapur sits at the heart of West Hyderabad's growth story, surrounded by IT hubs, premium schools, and lifestyle destinations — making it a top investment property choice.</p>
              <Button onClick={() => openPopup("Location – View Map")} className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                View Location Map
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-amber-500/20 h-[400px]">
              <iframe
                title="Rajapushpa Sierra Tellapur Location Map"
                src="https://www.google.com/maps?q=Tellapur,+Hyderabad&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className={sectionClass}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Why Invest in Rajapushpa Sierra?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <TrendingUp className="w-8 h-8" />, title: "High Appreciation Potential", desc: "IT corridor growth driving strong long-term value in Tellapur" },
              { icon: <Award className="w-8 h-8" />, title: "Premium Builder Reputation", desc: "Rajapushpa is known for landmark projects and timely delivery" },
              { icon: <Layers className="w-8 h-8" />, title: "Large Township Living", desc: "150-acre integrated lifestyle city with everything within reach" },
              { icon: <Home className="w-8 h-8" />, title: "Long-Term Investment", desc: "Ideal for end-use families and serious long-term investors" },
              { icon: <Shield className="w-8 h-8" />, title: "Future-Ready Infrastructure", desc: "Well-planned roads, utilities and civic infrastructure around" },
              { icon: <Star className="w-8 h-8" />, title: "Strong Rental Demand", desc: "High rental yield from IT professionals and HNIs" },
            ].map(inv => (
              <div key={inv.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all group">
                <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform">{inv.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{inv.title}</h3>
                <p className="text-gray-400 text-sm">{inv.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => openPopup("Investment – Talk to Expert")} size="lg" className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6 text-lg">
              Talk to Investment Expert
            </Button>
          </div>
        </div>
      </section>

      {/* URGENCY */}
      <section className={`${sectionClass} bg-gradient-to-br from-amber-600/15 via-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Limited Units Available – Book Before Price Increase</h2>
          <p className="text-gray-300 text-lg">Tellapur's demand is rising rapidly. Lock in your unit at today's pre-launch price before the next revision.</p>
          <Button onClick={() => openPopup("Urgency – Reserve Unit")} size="lg" className="lead-btn bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-6 text-lg">
            Reserve Your Unit Now
          </Button>
        </div>
      </section>

      {/* PROJECT STATUS */}
      <section className={sectionClass}>
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
              <p className="font-semibold text-amber-300">2030</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Shield className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Approval</p>
              <p className="font-semibold text-amber-300">RERA</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${sectionClass} bg-gradient-to-b from-slate-900 to-slate-950`}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
                  <span className="font-medium pr-4">{f.q}</span>
                  <span className="text-amber-500 shrink-0 text-xl">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-gray-400 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated living at Rajapushpa Sierra. Discover spacious 2 & 3 BHK luxury homes, world-class amenities, and a vibrant community designed for modern lifestyles.
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
            <a href={CALL_LINK} className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <Phone size={18} /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-amber-300 mb-4">Rajapushpa Sierra</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Luxury G+49 high-rise 2 & 3 BHK apartments in Tellapur, Hyderabad — within Rajapushpa Lifestyle City.</p>
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 mb-4">Configurations</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>2 BHK – ~1295 Sq.ft</li>
                <li>3 BHK – 1665 to 2555 Sq.ft</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 mb-4">Key Highlights</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>21.1 Acres Campus</li>
                <li>9 Towers, G+49</li>
                <li>3,537 Apartments</li>
                <li>1.5 Lakh Sft Clubhouse</li>
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
            <p>© 2026 Rajapushpa Sierra. All rights reserved.</p>
            <p className="mt-1">Marketing Partner: <a href="https://www.naani.in" className="text-amber-500 hover:underline">Naani Projects</a></p>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-sm border-t border-amber-500/20 p-3 flex gap-2">
        <a href={CALL_LINK} className="call-btn flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg"><Phone className="w-4 h-4" />Call</a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-btn flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white text-sm font-semibold py-3 rounded-lg"><MessageCircle className="w-4 h-4" />WhatsApp</a>
        <button onClick={() => openPopup("Sticky CTA – Enquire")} className="lead-btn flex-1 flex items-center justify-center gap-1.5 bg-amber-500 text-white text-sm font-semibold py-3 rounded-lg">Enquire</button>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-20 md:bottom-8 right-4 z-50 w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-amber-600 transition-colors">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {lightboxImg && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-4 right-4 text-white"><X className="w-8 h-8" /></button>
          <img src={lightboxImg} alt="Full view" loading="lazy" decoding="async" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={popupSource} projectName={PROJECT_NAME} />
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </div>
  );
};

export default RajapushpaSierraPage;
