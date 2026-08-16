import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Phone, MapPin, Building2, Home, TrendingUp, ShieldCheck, Search, Sparkles, Star, Briefcase, Plus } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEOHead from "../components/SEOHead";
import FAQSection from "../components/FAQSection";
import ScrollReveal from "../components/ScrollReveal";
import { Button } from "../components/ui/button";
import HomeSmartSearch from "../components/HomeSmartSearch";
import { fetchProjects, projectPath } from "@/lib/projectsApi";

import candeurHero from "@/assets/candeur-eternia/hero.png";
import godrejHero from "@/assets/godrej-kukatpally/hero.jpg";

const WA_LINK = "https://wa.me/919705080909?text=Hi%2C%20I'm%20looking%20for%20a%20property%20in%20Hyderabad.%20Please%20share%20best%20options.";
const TEL_LINK = "tel:+919705080909";

const FEATURED = [
  { name: "Candeur Eternia", location: "Bachupally", builder: "Candeur Developers", configuration: "2, 2.5 & 3 BHK · 33 Floors", price_range: "New Launch", path: "/projects/candeur-eternia-bachupally-hyderabad", image: candeurHero, tag: "New Launch" },
  { name: "Godrej Kukatpally", location: "Kukatpally", builder: "Godrej Properties", configuration: "3 & 4 BHK · G+46 Towers", price_range: "Pre-Launch", path: "/projects/godrej-kukatpally-hyderabad", image: godrejHero, tag: "Pre-Launch" },
  { name: "Rajapushpa Sierra", location: "Tellapur", builder: "Rajapushpa", configuration: "2 & 3 BHK · 49 Floors", price_range: "On Request", path: "/projects/rajapushpa-sierra-tellapur-hyderabad", image: "/og/rajapushpa-sierra.png", tag: "Featured" },
  { name: "Aspire Spaces A3", location: "Bachupally", builder: "Aspire Spaces", configuration: "2 & 3 BHK", price_range: "On Request", path: "/projects/aspire-spaces-a3-bachupally", image: "/og/aspire-spaces-a3.png", tag: "Premium" },
  { name: "Team4 Aria Miyapur", location: "Miyapur", builder: "Team4", configuration: "3 BHK Luxury", price_range: "On Request", path: "/projects/team4-aria-miyapur-luxury-apartments-hyderabad", image: "/og/team4-aria.png", tag: "Luxury" },
  { name: "Brigade Gateway Neopolis", location: "Kokapet", builder: "Brigade", configuration: "3–6 BHK", price_range: "On Request", path: "/projects/brigade-gateway-neopolis-kokapet-hyderabad", image: "/og/brigade-gateway-neopolis.png", tag: "Ultra-Luxury" },
  { name: "Prestige Golden Grove", location: "Kollur", builder: "Prestige", configuration: "2, 3 & 4 BHK", price_range: "On Request", path: "/projects/prestige-golden-grove-hyderabad", image: "/og/prestige-golden-grove.png", tag: "Premium" },
  { name: "Tridasa Rise", location: "Nallagandla", builder: "Tridasa", configuration: "3 & 4 BHK", price_range: "On Request", path: "/projects/tridasa-rise", image: "/og/tridasa-rise.png", tag: "Featured" },
];

const LOCATIONS = [
  "Gachibowli", "Hitech City", "Kondapur", "Kokapet",
  "Tellapur", "Narsingi", "Financial District", "Miyapur",
  "Bachupally", "Shamshabad", "Jubilee Hills", "Banjara Hills",
];
const BUILDERS = ["Rajapushpa", "Prestige", "Brigade", "Aparna", "My Home", "Team4"];
const CATEGORIES = [
  { label: "Buy Property", icon: Home },
  { label: "New Projects", icon: Sparkles },
  { label: "Ready To Move", icon: ShieldCheck },
  { label: "Luxury Apartments", icon: Building2 },
  { label: "Villas", icon: Home },
  { label: "Plots", icon: MapPin },
  { label: "Commercial", icon: Briefcase },
  { label: "Rent Property", icon: Search },
];

const Index = () => {
  const [featured, setFeatured] = useState(FEATURED);

  useEffect(() => {
    fetchProjects()
      .then((all) => {
        const matched = FEATURED.map((f) => {
          const found = all.find((p) => projectPath(p) === f.path);
          if (!found) return f;
          return {
            ...f,
            name: found.name || f.name,
            location: found.location || f.location,
            builder: found.builder || f.builder,
            configuration: found.configuration || f.configuration,
            image: f.image || found.hero_image,
          };
        });
        setFeatured(matched);
      })
      .catch(() => {});
  }, []);

  const faqs = [
    {
      question: "How does Naani Projects help me find the right property in Hyderabad?",
      answer: "Just send your **location, budget and preferences on WhatsApp** to +91 97050 80909. Our property experts curate the best matching apartments, villas, gated communities and luxury homes in Hyderabad and share verified options instantly — no endless browsing, no spam calls."
    },
    {
      question: "Which areas of Hyderabad do you cover?",
      answer: "We cover all major real estate corridors including **Kokapet, Tellapur, Gachibowli, Miyapur, Bachupally, Tukkuguda, Neopolis, Financial District, Nallagandla, Kollur, Kondapur** and surrounding micro-markets — both new launches and ready-to-move properties."
    },
    {
      question: "Do you charge any fee from buyers?",
      answer: "**No.** Our property advisory service is completely free for buyers. We work directly with reputed builders like Rajapushpa, Prestige, Brigade, Aparna, My Home and Team4, so you get the best price plus exclusive offers — at zero cost to you."
    },
    {
      question: "Can I book a site visit through WhatsApp?",
      answer: "Yes. Once we shortlist properties matching your budget and location, we arrange **free guided site visits** with pickup options. Just reply on WhatsApp with your preferred date and time."
    },
    {
      question: "What types of properties can I find on Naani Projects?",
      answer: "Premium **2/3/4/5 BHK apartments, independent villas, gated community plots, luxury penthouses, ready-to-move flats, under-construction launches and high-yield investment properties** across Hyderabad."
    },
    {
      question: "How quickly will I get property options after enquiring?",
      answer: "Within **15–30 minutes** during business hours. Our team prepares a personalised shortlist of 3–5 best-fit projects with pricing, floor plans, amenities and location maps — all on WhatsApp."
    },
    {
      question: "Are the projects RERA approved?",
      answer: "Yes. We only recommend **RERA-registered, bank-approved projects** from established Hyderabad builders. Every listing is verified for clear title and legal compliance before sharing."
    },
  ];

  return (
    <>
      <SEOHead
        title="Naani Projects | Flats, Villas, Plots & New Projects in Hyderabad"
        description="Explore apartments, villas, plots and new projects in Hyderabad. Compare properties, book site visits and get instant help on WhatsApp with Naani Projects."
        canonicalUrl="https://www.naani.in/"
        keywords="flats for sale Hyderabad, apartments Hyderabad, new projects Hyderabad, ready to move flats Hyderabad, 2 BHK Hyderabad, 3 BHK Hyderabad, luxury apartments Hyderabad, villas Hyderabad, plots for sale Hyderabad, real estate Hyderabad, Naani Projects"
      />

      <div className="min-h-screen bg-[#090D16] text-white">
        <Header />

        {/* HERO - Full Width */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
          {/* LCP hero image */}
          <picture>
            <source media="(max-width: 767px)" srcSet="/hero/naani-hero-760.webp" type="image/webp" />
            <img
              src="/hero/naani-hero-1600.webp"
              alt="Luxury high-rise apartment towers in Hyderabad illuminated at twilight"
              width={1600}
              height={906}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/90 via-[#090D16]/80 to-[#090D16]" />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-40">
            <div className="w-full text-center space-y-7">
              <div className="bg-[#111726]/90 backdrop-blur-md border border-amber-500/40 px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-lg">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-amber-300 font-bold text-sm sm:text-base">Hyderabad Real Estate Advisory &amp; Project Discovery</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1] max-w-7xl mx-auto">
                <span className="text-white">Find the Right Property</span>
                <br />
                <span className="text-gold-gradient">in Hyderabad</span>
              </h1>

              <p className="text-base md:text-xl text-slate-300 font-medium max-w-4xl mx-auto leading-relaxed">
                Compare verified apartments, villas, and new launches across Kokapet, Tellapur, Bachupally, Miyapur, and key employment corridors with direct advisor guidance.
              </p>

              {/* Smart Property Search */}
              <div className="w-full max-w-6xl mx-auto">
                <h2 className="sr-only">Smart Property Search</h2>
                <HomeSmartSearch />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 w-full max-w-5xl mx-auto">
                {[
                  { value: "200+", label: "Verified Projects" },
                  { value: "50+", label: "Hyderabad Builders" },
                  { value: "8+", label: "Key Residential Zones" },
                  { value: "Free", label: "Advisory for Buyers" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#111726]/90 backdrop-blur-md p-5 rounded-2xl border border-amber-500/30 shadow-md text-center hover:border-amber-500/60 transition-all">
                    <p className="text-2xl md:text-4xl font-extrabold text-amber-400">{s.value}</p>
                    <p className="text-xs md:text-sm font-bold text-slate-200 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
                <Button asChild className="cta-equal-btn bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-base w-full sm:w-auto min-w-[240px] h-14">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" size={20} />
                    Talk to a Property Advisor
                  </a>
                </Button>
                <Button asChild variant="outline" className="cta-equal-btn bg-slate-900/80 hover:bg-slate-800 text-amber-400 border-amber-500/50 font-bold text-base w-full sm:w-auto min-w-[200px] h-14">
                  <Link to="/projects">
                    <Building2 className="mr-2" size={20} />
                    Explore All Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" className="cta-equal-btn bg-slate-900/80 hover:bg-slate-800 text-white border-slate-700 font-bold text-base w-full sm:w-auto min-w-[200px] h-14">
                  <Link to="/list-your-property">
                    <Plus className="mr-2" size={20} />
                    List Your Property
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* FEATURED PROJECTS - Full Width Grid */}
        <section className="py-20 bg-[#0B101D] border-y border-amber-500/20">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-14">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Featured Projects</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3">
                  Selected Residential Projects in Hyderabad
                </h2>
                <p className="text-slate-300 font-medium text-base md:text-lg mt-3 max-w-3xl mx-auto leading-relaxed">
                  Explore active launches and ongoing developments across major West &amp; North Hyderabad corridors.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 w-full">
              {featured.map((p) => (
                <Link
                  key={p.path}
                  to={p.path}
                  className="glass-card group overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.name} — ${p.configuration} in ${p.location}, Hyderabad`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                      {p.builder}
                    </div>
                    {p.tag && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                        {p.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-white text-xl leading-tight group-hover:text-amber-400 transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-300 mt-2 font-medium">
                      <MapPin size={14} className="text-amber-400" /> {p.location}
                    </div>
                    <p className="text-xs text-amber-400 mt-3 font-bold">{p.configuration}</p>
                    <p className="text-sm text-slate-200 mt-1 font-semibold">{p.price_range}</p>
                    <div className="flex gap-2 mt-5 pt-4 border-t border-amber-500/20">
                      <span className="text-xs text-amber-400 font-bold flex-1">View Project Details →</span>
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-emerald-400 font-bold hover:underline"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-base px-8 py-6 rounded-xl shadow-lg">
                <Link to="/projects">View All Projects <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROPERTY CATEGORIES - Full Width Grid */}
        <section className="py-20 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Browse Options</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Filter by Property Type</h2>
              <p className="text-slate-300 mt-3 max-w-3xl mx-auto text-base">
                Whether you are looking for an apartment, independent villa, or land, narrow down projects by your preferred format.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.label}
                  to="/projects"
                  className="glass-card p-5 text-center hover:-translate-y-1 transition-all group flex flex-col items-center justify-center"
                >
                  <c.icon className="text-amber-400 mb-3 group-hover:scale-110 transition-transform" size={26} />
                  <div className="font-bold text-white text-xs sm:text-sm">{c.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* EXPLORE BY LOCATION - Full Width */}
        <section className="py-20 bg-[#0B101D] border-y border-amber-500/20">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Explore Locations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Key Residential Corridors in Hyderabad</h2>
              <p className="text-slate-300 mt-3 max-w-3xl mx-auto text-base">
                Compare neighborhoods based on proximity to your workplace, school access, and expected commute times.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
              {LOCATIONS.map((loc) => (
                <Link
                  key={loc}
                  to={`/projects?location=${encodeURIComponent(loc)}`}
                  className="glass-card p-5 text-center hover:-translate-y-1 transition-all group"
                >
                  <MapPin className="mx-auto text-amber-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <div className="font-bold text-white text-sm sm:text-base">{loc}</div>
                  <div className="text-[11px] text-amber-400 mt-1 font-semibold">View Projects →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* EXPLORE BY BUILDER - Full Width */}
        <section className="py-20 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Developers</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Established Developers in Hyderabad</h2>
              <p className="text-slate-300 mt-3 max-w-3xl mx-auto text-base">
                We track projects across major developers to provide clear information on construction status, floor plans, and pricing.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
              {BUILDERS.map((b) => (
                <Link
                  key={b}
                  to="/projects"
                  className="glass-card p-6 text-center font-extrabold text-white text-lg hover:text-amber-400 hover:-translate-y-1 transition-all"
                >
                  {b}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* APARTMENTS & VILLAS COLLECTIONS - Full Width */}
        <section className="py-20 bg-[#0B101D] border-y border-amber-500/20">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid md:grid-cols-2 gap-8 w-full">
              <Link to="/projects" className="glass-card p-8 sm:p-10 hover:-translate-y-2 transition-all group">
                <Building2 className="text-amber-400 mb-5 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-3xl font-extrabold text-white mb-3">Apartment Developments</h3>
                <p className="text-slate-300 text-base mb-6 leading-relaxed font-medium">
                  High-rise and mid-rise gated communities featuring 2, 3, and 4 BHK layouts across West and North Hyderabad.
                </p>
                <span className="text-amber-400 font-extrabold text-base inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Apartments →</span>
              </Link>
              <Link to="/projects" className="glass-card p-8 sm:p-10 hover:-translate-y-2 transition-all group">
                <Home className="text-amber-400 mb-5 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-3xl font-extrabold text-white mb-3">Gated Community Villas</h3>
                <p className="text-slate-300 text-base mb-6 leading-relaxed font-medium">
                  Independent villa communities and gated layouts in areas such as Tukkuguda, Tellapur, and Kollur.
                </p>
                <span className="text-amber-400 font-extrabold text-base inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Villas →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* INVESTMENT OPPORTUNITIES - Full Width */}
        <section className="py-20 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Buyer Considerations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Understanding Your Options</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 w-full">
              {[
                { title: "Early-Stage Launches", desc: "Booking during early launch phases can mean lower base pricing, though buyers should factor in project timelines and builder delivery history." },
                { title: "IT Hub Commute Zones", desc: "Locations close to Financial District and HITEC City generally see consistent rental demand for 2 and 3 BHK layouts." },
                { title: "Approved Plotted Developments", desc: "HMDA or RERA-approved plotted layouts in expanding corridors offer land ownership with flexibility on when you build." },
              ].map((i) => (
                <div key={i.title} className="glass-card p-8 hover:-translate-y-1 transition-all">
                  <TrendingUp className="text-amber-400 mb-4" size={32} />
                  <h3 className="font-bold text-white text-xl mb-3">{i.title}</h3>
                  <p className="text-base text-slate-300 leading-relaxed font-medium">{i.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE NAANI PROJECTS - Full Width */}
        <section className="py-20 bg-[#0B101D] border-y border-amber-500/20">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center mb-14">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Our Approach</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3">
                How We Help You Find the Right Property
              </h2>
              <p className="text-slate-300 font-medium mt-3 max-w-3xl mx-auto text-base sm:text-lg">
                We focus on giving you clear project information and practical trade-offs so you can decide comfortably.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                { icon: MessageCircle, title: "Direct Communication", desc: "Share your location preferences and budget on WhatsApp. We share relevant project options and floor plans directly." },
                { icon: ShieldCheck, title: "Verified Project Details", desc: "We review builder credentials, RERA registrations, and project approvals so you have reliable information upfront." },
                { icon: TrendingUp, title: "Clear Cost Structure", desc: "We help you break down overall pricing, including base rates, parking, clubhouse fees, and applicable taxes." },
                { icon: MapPin, title: "Local Area Insights", desc: "Get practical feedback on commute times, road access, and neighborhood infrastructure across Hyderabad." },
                { icon: Star, title: "Objective Comparisons", desc: "We compare floor plan efficiency, price per square foot, and layout pros and cons without pushing a single project." },
                { icon: Phone, title: "Support Through the Process", desc: "From shortlisting and site visits to builder discussions, we assist you at every step of your search." },
              ].map((i) => (
                <div key={i.title} className="glass-card p-7 flex gap-5 hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <i.icon className="text-amber-400" size={26} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{i.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">{i.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HYDERABAD REAL ESTATE GUIDE - Full Width */}
        <section className="py-20 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Buyer Guidance</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3">Navigating Real Estate in Hyderabad</h2>
            </div>
            <div className="space-y-5 text-slate-300 text-base md:text-lg leading-relaxed font-medium glass-card p-8 sm:p-12">
              <p>
                Hyderabad's residential market is centered around active IT and employment hubs like Gachibowli, Financial District, and HITEC City, expanding outward into areas like <strong className="text-white font-bold">Kokapet, Tellapur, Nallagandla, Miyapur, and Bachupally</strong>. Choosing the right neighborhood often comes down to your daily commute, budget preference, and whether you need immediate possession or are open to an under-construction project.
              </p>
              <p>
                Whether you are looking for a 2 or 3 BHK apartment close to work, a larger family home in a gated community, or a long-term property investment, evaluating options across multiple developers can get overwhelming quickly. At <Link to="/" className="text-amber-400 hover:underline font-bold">Naani Projects</Link>, we help you filter through available projects based on your specific requirements rather than pushing a single developer.
              </p>
              <p>
                Major projects in West Hyderabad offer a range of configurations, layouts, and community amenities. Instead of relying on promotional claims, we encourage buyers to examine project approvals, construction timelines, floor plan efficiency, and total cost breakdowns including maintenance and parking.
              </p>
              <p>
                We keep communication straightforward and direct on WhatsApp. Tell us your location preference, budget range, and BHK requirement, and we will send you a tailored list of matching projects with clear details—no unsolicited marketing calls or exaggerated promises.
              </p>
              <p>
                Have questions or ready to explore options? <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">Message us on WhatsApp at +91 97050 80909</a> or <Link to="/projects" className="text-amber-400 hover:underline font-bold">browse our project listings</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* HOW WE WORK - Full Width */}
        <section className="py-20 bg-[#0B101D] border-y border-amber-500/20">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-[0.2em]">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">How We Assist Homebuyers</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 w-full">
              {[
                { name: "1. Share Your Requirement", role: "Location, Budget & BHK", quote: "Tell us your preferred areas, budget limit, and timeline on WhatsApp or through our search tool." },
                { name: "2. Review Matching Projects", role: "Floor Plans & Price Breakdowns", quote: "We send a curated shortlist of verified project options with layout details and pricing information." },
                { name: "3. Visit & Decide", role: "Guided Site Visits", quote: "We coordinate site visits so you can inspect project locations, construction quality, and surroundings firsthand." },
              ].map((t) => (
                <div key={t.name} className="glass-card p-7 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-amber-400 text-lg mb-1">{t.name}</h3>
                    <div className="text-xs text-slate-300 font-bold mb-4">{t.role}</div>
                    <p className="text-base text-slate-200 font-medium leading-relaxed">{t.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={faqs} pageUrl="https://www.naani.in/" />

        <Footer />
        <WhatsAppButton />

        {/* Sticky Mobile CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#090D16]/95 backdrop-blur-xl border-t border-amber-500/30 grid grid-cols-3 divide-x divide-amber-500/20">
          <a href={TEL_LINK} className="flex flex-col items-center justify-center py-3 text-amber-400 text-xs font-bold">
            <Phone size={18} className="mb-0.5" /> Call
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-3 text-emerald-400 text-xs font-bold">
            <MessageCircle size={18} className="mb-0.5" /> WhatsApp
          </a>
          <Link to="/contact-us" className="flex flex-col items-center justify-center py-3 text-white text-xs font-bold">
            <Building2 size={18} className="mb-0.5" /> Enquire
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
