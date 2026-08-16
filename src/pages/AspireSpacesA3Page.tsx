import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import ProjectHeader from "@/components/ProjectHeader";
import { MessageCircle, Phone, MapPin, Building2, Layers, Maximize2, Star, ChevronDown, ChevronUp, Home, Zap, Shield, Leaf, Award, Users, Dumbbell, TreePine, Car, GraduationCap, Stethoscope, Plane, Play } from "lucide-react";

import elevationImg from "@/assets/aspire-a3-elevation.jpg";
import masterplanImg from "@/assets/aspire-a3-masterplan.jpg";
import clubhouseImg from "@/assets/aspire-a3-clubhouse.jpg";

const PROJECT_NAME = "Aspire Spaces A3";

const CTAButton = ({ text, className = "", onClick }: { text: string; className?: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`lead-btn inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all hover:scale-105 ${className}`}
  >
    <MessageCircle size={18} />
    {text}
  </button>
);

const faqs = [
  {
    q: "What is the price of Aspire Spaces A3?",
    a: "Aspire Spaces A3 offers competitive pricing starting at ₹4,500/sft (all inclusive). Final pricing depends on the configuration, floor, and unit orientation. Contact us on WhatsApp at +91 9705080909 for the latest offers and payment plans.",
  },
  {
    q: "Where is Aspire Spaces A3 located?",
    a: "Aspire Spaces A3 is located in Mallampet, near Bachupally, Hyderabad. It enjoys excellent connectivity to the Outer Ring Road (ORR), Miyapur, Hitech City, and Gachibowli, making it one of the most accessible residential locations in Hyderabad.",
  },
  {
    q: "What configurations are available at Aspire Spaces A3?",
    a: "The project offers spacious 2 BHK apartments (1,350 sq.ft.) and 3 BHK apartments (1,560 to 2,115 sq.ft.). Every unit is designed for maximum ventilation, natural light, and optimal space utilization.",
  },
  {
    q: "Is Aspire Spaces A3 a good investment?",
    a: "Yes. Mallampet is one of Hyderabad's fastest-growing residential corridors with strong infrastructure development, proximity to IT hubs, and excellent rental demand. Aspire Spaces A3 offers competitive pricing with high appreciation potential, making it ideal for both end-users and investors.",
  },
  {
    q: "What amenities are provided at Aspire Spaces A3?",
    a: "The project features a 36,000 sq.ft. clubhouse with swimming pool, gym, yoga studio, library, co-working spaces, conference room, preview theatre, children's play area, senior citizens' zone, jogging tracks, landscaped gardens, and much more.",
  },
  {
    q: "How far is Aspire Spaces A3 from ORR and Hitech City?",
    a: "Aspire Spaces A3 has easy access to the Outer Ring Road and is approximately 30 minutes from Hitech City and Gachibowli IT hubs. Miyapur Metro Station is also nearby for convenient public transport.",
  },
  {
    q: "How do I book a site visit at Aspire Spaces A3?",
    a: "Simply WhatsApp +91 9705080909 with your preferred date and time. Our team will confirm your slot and arrange a visit. You can also call the same number for instant assistance.",
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-amber-200/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-slate-800/60 hover:bg-slate-700/60 transition-colors gap-4"
      >
        <span className="font-semibold text-white text-sm md:text-base">{q}</span>
        {open ? <ChevronUp size={18} className="text-amber-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-amber-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 py-4 bg-slate-900/60 text-slate-300 text-sm leading-relaxed">{a}</div>
      )}
    </div>
  );
};

const AspireSpacesA3Page = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);

  const waLink = `https://wa.me/919705080909?text=${encodeURIComponent("Hi, I'm interested in Aspire Spaces A3 Bachupally. Please share price details and availability.")}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: "Aspire Spaces A3 – Premium 2 & 3 BHK Apartments in Bachupally / Mallampet",
        description: "Explore Aspire Spaces A3 in Mallampet near Bachupally – premium 2 & 3 BHK apartments with modern amenities. Get exclusive ₹4500/sft offer.",
        url: "https://www.naani.in/projects/aspire-spaces-a3-bachupally",
        image: "https://www.naani.in/aspire-a3-elevation.jpg",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mallampet, Bachupally",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "4500",
          unitText: "per sq.ft.",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in" },
          { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
          { "@type": "ListItem", position: 3, name: "Aspire Spaces A3 Bachupally", item: "https://www.naani.in/projects/aspire-spaces-a3-bachupally" },
        ],
      },
    ],
  };

  const highlights = [
    { icon: Building2, label: "2 Towers", sub: "34 Floors Each" },
    { icon: Layers, label: "3.7 Acres", sub: "Site Area" },
    { icon: Home, label: "2 & 3 BHK", sub: "1350–2115 Sft" },
    { icon: Users, label: "36,000 Sft", sub: "Clubhouse" },
    { icon: Shield, label: "Gated Community", sub: "24/7 Security" },
    { icon: Zap, label: "₹4,500/sft*", sub: "All Inclusive" },
  ];

  const amenities = [
    "Entrance Lobby", "Multipurpose Court", "Grocery", "Crèche", "Library", "Cafeteria",
    "Indoor Games", "Hobby Room", "Waiting Lounge", "Senior Citizens Room", "Cards Room",
    "Guest Room", "Co-Working Spaces", "Conference Room", "Preview Theatre", "Gym",
    "Yoga & Aerobics", "Swimming Pool", "Deck Area", "Jogging Track", "Children's Play Area",
    "Landscaped Gardens", "Party Hall", "Pet Park",
  ];

  const locationAdvantages = [
    { icon: Car, label: "Easy Access to ORR", distance: "5 min" },
    { icon: MapPin, label: "Near Bachupally & Miyapur", distance: "10 min" },
    { icon: Building2, label: "Hitech City & Gachibowli", distance: "30 min" },
    { icon: GraduationCap, label: "Top Schools & Colleges", distance: "Nearby" },
    { icon: Stethoscope, label: "Hospitals & Healthcare", distance: "10 min" },
    { icon: Plane, label: "International Airport", distance: "40 min" },
    { icon: Car, label: "Bus Depot & Metro", distance: "5 min" },
    { icon: TreePine, label: "Financial District", distance: "30 min" },
  ];

  const configs = [
    { type: "2 BHK", size: "1,350 Sft", ideal: "Small Families & Professionals" },
    { type: "3 BHK", size: "1,560 Sft", ideal: "Growing Families" },
    { type: "3 BHK Premium", size: "1,775 Sft", ideal: "Spacious Living" },
    { type: "3 BHK Luxe", size: "1,925 Sft", ideal: "Premium Lifestyle" },
    { type: "3 BHK Ultra", size: "1,930 Sft", ideal: "Large Families" },
    { type: "3 BHK Grand", size: "2,115 Sft", ideal: "Ultimate Comfort" },
  ];

  return (
    <>
      <SEOHead
        title="Aspire Spaces A3 Bachupally | 2 & 3 BHK Apartments in Mallampet Hyderabad"
        description="Explore Aspire Spaces A3 in Mallampet near Bachupally – premium 2 & 3 BHK apartments with modern amenities. Get exclusive ₹4500/sft offer. Book site visit now!"
        canonicalUrl="https://www.naani.in/projects/aspire-spaces-a3-bachupally"
        keywords="Aspire Spaces A3, flats in Mallampet Hyderabad, apartments near Bachupally, 2 BHK flats Hyderabad, 3 BHK apartments Mallampet, gated community Bachupally, new projects Bachupally Hyderabad"
        ogImage="https://www.naani.in/og/aspire-spaces-a3.png"
        structuredData={structuredData}
      />

      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={PROJECT_NAME} />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Header */}
        <ProjectHeader projectName={PROJECT_NAME} onEnquireClick={openPopup} />

        {/* Hero */}
        <section className="relative pt-20">
          <div className="relative">
            <img
              src={elevationImg}
              alt="Aspire Spaces A3 Project in Bachupally"
              className="w-full h-[60vh] md:h-[80vh] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="max-w-5xl mx-auto">
                <span className="inline-block bg-amber-600/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  Limited Units at Launch Price
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
                  Aspire Spaces A3 – Premium{" "}
                  <span className="text-amber-400">2 & 3 BHK Apartments</span>
                  <br className="hidden md:block" /> in Bachupally / Mallampet
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-6">
                  Starting <span className="text-amber-400 font-bold text-2xl">₹4,500/sft*</span> (All Inclusive) &bull; Mallampet, Hyderabad
                </p>
                <div className="flex flex-wrap gap-3">
                  <CTAButton text="Get Price Details" onClick={openPopup} />
                  <CTAButton text="Book Site Visit" onClick={openPopup} className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800" />
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all hover:scale-105">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Project <span className="text-amber-400">Overview</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="bg-white/5 border border-amber-400/20 rounded-2xl p-5 text-center backdrop-blur-sm hover:border-amber-400/50 transition-all hover:-translate-y-1">
                  <h.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="font-bold text-white text-lg">{h.label}</p>
                  <p className="text-slate-400 text-sm">{h.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-white/5 border border-amber-400/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <p className="text-slate-300 leading-relaxed">
                Aspire Spaces A3 is a residential project offering 2 & 3 BHK apartments in Mallampet, Hyderabad. Spread across 3.7 acres, this high-rise community features 2 towers with 34 residential floors, offering floor plans, clubhouse facilities, and layout designs for families. Whether you are looking for <strong className="text-white">flats in Mallampet Hyderabad</strong> or <strong className="text-white">apartments near Bachupally</strong>, this project provides a residential option in North-West Hyderabad.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-20 px-4 bg-slate-900/50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pricing & <span className="text-amber-400">Offers</span>
            </h2>
            <p className="text-slate-400 mb-8">Exclusive launch pricing for limited units</p>
            <div className="bg-gradient-to-br from-amber-900/30 to-slate-800/50 border border-amber-400/30 rounded-2xl p-8 md:p-12 max-w-lg mx-auto">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Starting From</p>
              <p className="text-5xl md:text-6xl font-bold text-amber-400 mb-2">₹4,500<span className="text-2xl">/sft*</span></p>
              <p className="text-slate-400 mb-6">All Inclusive | No Hidden Charges</p>
              <CTAButton text="Unlock Full Price Sheet" onClick={openPopup} className="w-full justify-center py-4 text-lg" />
              <p className="text-xs text-slate-500 mt-4">*T&C apply. Price subject to availability.</p>
            </div>
          </div>
        </section>

        {/* Configurations */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Floor Plans & <span className="text-amber-400">Configurations</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {configs.map((c) => (
                <div key={c.type + c.size} className="bg-white/5 border border-amber-400/20 rounded-2xl p-6 hover:border-amber-400/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Home className="w-6 h-6 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">{c.type}</h3>
                  </div>
                  <p className="text-2xl font-bold text-amber-400 mb-1">{c.size}</p>
                  <p className="text-slate-400 text-sm mb-4">{c.ideal}</p>
                  <button onClick={openPopup} className="lead-btn text-sm text-amber-400 border border-amber-400/40 rounded-lg px-4 py-2 hover:bg-amber-400/10 transition-colors w-full">
                    Get Floor Plan →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Master Plan */}
        <section className="py-16 md:py-20 px-4 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Master <span className="text-amber-400">Plan</span>
            </h2>
            <div className="bg-white/5 border border-amber-400/20 rounded-2xl overflow-hidden">
              <img src={masterplanImg} alt="Master plan of Aspire Spaces A3 Project" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="mt-6 bg-white/5 border border-amber-400/20 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-slate-300 leading-relaxed">
                The master plan of Aspire Spaces A3 features a well-planned gated community with wide internal roads, pedestrian pathways, landscaped green spaces, a central 36,000 sq.ft. clubhouse, organized parking, and a safe, secure environment. Block A and Block B are positioned for maximum ventilation and privacy, with tot lots and open spaces strategically placed throughout.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Project <span className="text-amber-400">Walkthrough</span>
            </h2>
            <div className="relative rounded-2xl overflow-hidden border border-amber-400/20 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/q3Co-JYDfW0"
                title="Aspire Spaces A3 Bachupally Project Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-16 md:py-20 px-4 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Amenities & <span className="text-amber-400">Clubhouse</span>
            </h2>
            <p className="text-center text-slate-400 mb-10">36,000 Sft Clubhouse – Where Lifestyles Shine Through</p>
            <div className="mb-8">
              <img src={clubhouseImg} alt="Clubhouse of Aspire Spaces A3 Project" className="w-full h-auto rounded-2xl border border-amber-400/20" loading="lazy" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {amenities.map((a) => (
                <div key={a} className="bg-white/5 border border-amber-400/15 rounded-xl p-3 text-center hover:border-amber-400/40 transition-all">
                  <Star className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-300 font-medium">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Advantages */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Location <span className="text-amber-400">Advantages</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {locationAdvantages.map((l) => (
                <div key={l.label} className="bg-white/5 border border-amber-400/20 rounded-2xl p-5 text-center hover:border-amber-400/50 transition-all hover:-translate-y-1">
                  <l.icon className="w-7 h-7 text-amber-400 mx-auto mb-3" />
                  <p className="font-semibold text-white text-sm mb-1">{l.label}</p>
                  <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">{l.distance}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white/5 border border-amber-400/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-amber-400 mb-3">Why Mallampet is a Smart Investment</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Mallampet is one of Hyderabad's fastest-growing residential corridors. With direct ORR connectivity, proximity to IT hubs like Hitech City and Gachibowli, strong infrastructure development, and competitive property prices, it offers excellent capital appreciation and rental yields. If you're looking for <strong className="text-white">2 BHK flats in Hyderabad</strong> or <strong className="text-white">3 BHK apartments near ORR</strong>, Mallampet presents the best value proposition.
              </p>
            </div>
          </div>
        </section>

        {/* Why Invest */}
        <section className="py-16 md:py-20 px-4 bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Why Invest in <span className="text-amber-400">Aspire Spaces A3</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: MapPin, title: "High-Growth Zone", desc: "Located in Mallampet – Hyderabad's next big residential hub with rapid infrastructure development." },
                { icon: Zap, title: "Competitive Pricing", desc: "Starting ₹4,500/sft all inclusive with high appreciation potential and strong rental demand." },
                { icon: Award, title: "Premium Construction", desc: "Modern elevation, quality finishes, and thoughtfully designed layouts for maximum comfort." },
                { icon: Leaf, title: "Green & Sustainable", desc: "Landscaped gardens, open spaces, and eco-friendly design for a healthy lifestyle." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-amber-400/20 rounded-2xl p-6 hover:border-amber-400/50 transition-all">
                  <item.icon className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Frequently Asked <span className="text-amber-400">Questions</span>
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-[#01406D]/70 via-[hsl(205,50%,10%)] to-background border-t border-[#01B4BA]/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Book Your <span className="text-[#FF7A0F]">Dream Home</span> Today
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Experience elevated living at Aspire Spaces A3. Discover spacious homes, premium amenities, and a vibrant community designed for modern lifestyles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton text="Schedule Site Visit" onClick={openPopup} className="py-4 px-8 text-lg bg-[#FF7A0F] hover:bg-[#e06800]" />
              <CTAButton text="Get Latest Offers" onClick={openPopup} className="py-4 px-8 text-lg bg-[#01B4BA] hover:bg-[#019aa0]" />
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
                <MessageCircle size={20} /> WhatsApp Us
              </a>
            </div>
            <div className="mt-6">
              <a href="tel:+919705080909" className="call-btn text-[#01B4BA] hover:text-[#FF7A0F] font-semibold text-lg transition-colors">
                📞 Call Now: +91 97050 80909
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-amber-400/10 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 Naani Projects. All rights reserved. · Real Estate Digital Marketing Hyderabad
          </p>
          <p className="text-slate-600 text-xs mt-2">
            All images are indicative & for representation purposes only. Pricing and specifications are subject to change without prior notice.
          </p>
        </footer>

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-amber-400/20 p-3 md:hidden">
          <div className="flex gap-3">
            <a href="tel:+919705080909" className="call-btn flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="whatsapp-btn flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-medium">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </>
  );
};

export default AspireSpacesA3Page;
