import { Link } from "react-router-dom";
import { MessageCircle, Phone, MapPin, ShieldCheck, Sparkles, Building2, Home, TrendingUp, Users, Award, CheckCircle2, ArrowRight, Search, CalendarCheck, Key, Send, Instagram, Facebook, Youtube, Compass, FileSearch, Scale, AlertTriangle, Layers, HelpCircle, Check, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";

const WA_URL = "https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I'm%20looking%20for%20a%20property%20in%20Hyderabad.";
const TEL = "tel:+919705080909";

const AboutPage = () => {
  const faqs = [
    {
      question: "What is Naani Projects?",
      answer: "Naani Projects is a specialized Hyderabad-focused property discovery platform helping buyers explore residential properties, including 2 BHK and 3 BHK apartments, luxury villas, gated community plots, and new launch residential projects across Hyderabad's key growth corridors through curated listings and instant WhatsApp support."
    },
    {
      question: "What types of properties can I find on Naani Projects?",
      answer: "You can discover a comprehensive range of residential properties in Hyderabad, including high-rise apartments, gated community flats, independent luxury villas, residential plots, new launch projects, under-construction developments, and ready-to-move properties."
    },
    {
      question: "Which areas of Hyderabad does Naani Projects cover?",
      answer: "We cover major residential and commercial growth corridors across Hyderabad, including Kokapet, Neopolis, Financial District, Gachibowli, Narsingi, Tellapur, Kondapur, HITECH City, Miyapur, Bachupally, Kollur, Tukkuguda, and Shamshabad."
    },
    {
      question: "Can I find new projects in Hyderabad on Naani?",
      answer: "Yes. Naani Projects features curated new projects in Hyderabad from top developers such as Rajapushpa, Prestige, Brigade, Aparna, My Home, and Team4. Users can compare floor plans, amenities, pricing, and project locations."
    },
    {
      question: "Can I compare residential projects on Naani Projects?",
      answer: "Absolutly. Naani Projects provides detailed project insights, location comparisons, floor plan layout efficiency notes, and pricing structures so property buyers in Hyderabad can compare developments objectively before scheduling visits."
    },
    {
      question: "Can I request a site visit through Naani Projects?",
      answer: "Yes. Interested buyers can request free site visit coordination for shortlisted projects across Hyderabad. Our team coordinates convenient visit timings, transportation guidance, and project walkthroughs."
    },
    {
      question: "How can I contact Naani Projects?",
      answer: "You can easily contact Naani Projects via WhatsApp at +91 97050 80909, call us directly, or send an enquiry through our official contact page. Our property discovery advisors respond promptly with customized project information."
    },
    {
      question: "Does Naani Projects verify project information?",
      answer: "Naani Projects collects and reviews information from developer documentation, RERA public portals, official marketing collateral, and project site visits. However, pricing, offers, availability, and timelines can change, so we always encourage buyers to complete independent legal and financial due diligence."
    }
  ];

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.naani.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://www.naani.in/about-us"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "@id": "https://www.naani.in/#organization",
    "name": "Naani Projects",
    "alternateName": ["Naani Projects Hyderabad", "Naani Real Estate"],
    "url": "https://www.naani.in",
    "logo": {
      "@type": "ImageObject",
      "@id": "https://www.naani.in/#logo",
      "url": "https://www.naani.in/naani-projects-logo.png",
      "caption": "Naani Projects Logo"
    },
    "image": "https://www.naani.in/naani-projects-hyderabad-real-estate-team.webp",
    "telephone": "+919705080909",
    "email": "info@naani.in",
    "description": "Naani Projects is a specialized Hyderabad real estate discovery platform helping property buyers explore apartments, villas, plots, and new residential developments.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kondapur",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500084",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Telangana" }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919705080909",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Telugu", "Hindi"]
    },
    "sameAs": [
      "https://www.instagram.com/naaniprojects/",
      "https://www.facebook.com/NaaniProjects/",
      "https://www.youtube.com/@NaaniProjects?sub_confirmation=1",
      "https://www.linkedin.com/company/naaniprojects/",
      "https://in.pinterest.com/naaniprojects/"
    ]
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.naani.in/about-us#webpage",
    "url": "https://www.naani.in/about-us",
    "name": "About Naani Projects | Hyderabad Real Estate Experts",
    "description": "Learn about Naani Projects, a Hyderabad-focused real estate platform helping buyers explore apartments, villas, plots and new residential projects across Hyderabad.",
    "isPartOf": {
      "@id": "https://www.naani.in/#website"
    },
    "about": {
      "@id": "https://www.naani.in/#organization"
    },
    "breadcrumb": breadcrumbsSchema
  };

  const structuredDataCombined = [breadcrumbsSchema, organizationSchema, webpageSchema];

  return (
    <>
      <SEOHead
        title="About Naani Projects | Hyderabad Real Estate Experts"
        description="Learn about Naani Projects, a Hyderabad-focused real estate platform helping buyers explore apartments, villas, plots and new residential projects across Hyderabad."
        canonicalUrl="https://www.naani.in/about-us"
        keywords="about naani projects, hyderabad real estate, real estate in hyderabad, properties in hyderabad, residential projects in hyderabad, hyderabad homebuyers, buy property in hyderabad"
        ogImage="https://www.naani.in/naani-projects-hyderabad-real-estate-team.webp"
        structuredData={structuredDataCombined}
      />

      <div className="min-h-screen bg-[#090D16] text-slate-100">
        <Header />

        {/* Breadcrumb Bar */}
        <nav className="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
          <div className="max-w-6xl mx-auto flex items-center gap-2">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">About Us</span>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles size={14} /> Hyderabad Real Estate Discovery
            </div>
            
            {/* PRIMARY H1 - EXACT SPECIFICATION */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto">
              About Naani Projects – <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Hyderabad Real Estate Experts</span>
            </h1>

            {/* Introductory Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
              Naani Projects is a specialized Hyderabad-focused property discovery platform helping buyers explore residential properties across prime locations. Whether you are searching for apartments, luxury villas, gated community plots, or new residential projects, Naani Projects simplifies project evaluation, location comparison, and direct advisor connectivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-6 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all" onClick={() => window.open(WA_URL, "_blank")}>
                <MessageCircle size={18} className="mr-2" /> Explore Deals on WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-semibold px-6 py-6 rounded-xl" onClick={() => window.open(WA_URL, "_blank")}>
                <CalendarCheck size={18} className="mr-2" /> Request Site Visit Assistance
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 1: WHO WE ARE */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Users size={16} /> Section 1 — Who We Are
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
                Your Trusted Guide to Hyderabad Real Estate
              </h2>
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                <p>
                  Naani Projects is a specialized digital platform designed specifically for <strong>Hyderabad real estate</strong> discovery. We understand that finding the right <strong>properties in Hyderabad</strong> requires clear data, honest location insights, and trustworthy guidance rather than high-pressure sales calls.
                </p>
                <p>
                  Our platform aggregates and organizes verified details on premium <strong>residential projects in Hyderabad</strong>, covering premier high-rise developments, gated communities, and luxury residential layouts. By focusing exclusively on Hyderabad's dynamic housing ecosystem, we empower <strong>Hyderabad homebuyers</strong>, first-time property seekers, and seasoned real estate buyers to research housing options efficiently before making a major financial commitment.
                </p>
                <p>
                  We collaborate with established real estate developers and property advisory networks to bring up-to-date layout details, floor plan configurations, location connectivity maps, and pricing structures directly to your fingertips.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-slate-900">
                <img
                  src="/naani-projects-hyderabad-real-estate-team.webp"
                  alt="Naani Projects Hyderabad real estate team and property discovery platform"
                  className="w-full h-80 object-cover object-center"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Hyderabad Property Discovery Platform</p>
                  <p className="text-sm font-semibold text-white mt-1">Connecting Homebuyers with Verified Projects Across Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHY NAANI PROJECTS EXISTS */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Compass size={16} /> Section 2 — Why Naani Projects Exists
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Simplifying Complex Real Estate Choices in Hyderabad
              </h2>
              <p className="text-slate-300 text-base md:text-lg">
                Navigating the modern property market in Hyderabad can quickly become overwhelming for buyers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem Card */}
              <div className="p-8 rounded-2xl bg-[#0F1629] border border-red-500/20 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">The Buyer's Challenge</h3>
                <ul className="space-y-3 text-slate-300 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span> Hundreds of active residential projects spread across vast growth corridors.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span> Inconsistent pricing quotes, confusing carpet area versus super built-up metrics.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span> Persistent, unsolicited sales calls from unverified listing portals.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span> Difficulty comparing floor plan efficiency, amenities, and developer track records objectively.
                  </li>
                </ul>
              </div>

              {/* Solution Card */}
              <div className="p-8 rounded-2xl bg-[#0F1629] border border-amber-500/30 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">The Naani Projects Solution</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We built Naani Projects around one central mission: <strong className="text-amber-400 font-semibold">"Find the Right Property, Smarter &amp; Faster in Hyderabad."</strong>
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Rather than forcing you through tedious registration forms or spamming your inbox, Naani Projects brings clear project brochures, floor plans, pricing estimates, and micro-market analysis directly to you. We help you narrow down your search based on your budget, configuration, and preferred location without pushy tactics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE DO */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Layers size={16} /> Section 3 — What We Do
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Comprehensive Property Discovery Services
              </h2>
              <p className="text-slate-300 text-base">
                Naani Projects provides end-to-end informational and discovery support for property buyers in Hyderabad.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Search, title: "Property Discovery", desc: "Help buyers explore apartments, luxury villas, plots, and new residential projects across Hyderabad's prime locations." },
                { icon: Scale, title: "Project Comparison", desc: "Enable buyers to evaluate projects based on location advantages, pricing structures, amenity packages, and configuration layouts." },
                { icon: MapPin, title: "Location Discovery", desc: "Provide in-depth neighborhood insights covering major residential growth corridors and IT hubs in Hyderabad." },
                { icon: MessageCircle, title: "Property Enquiries", desc: "Allow buyers to query project details instantly via WhatsApp, direct phone calls, or streamlined enquiry forms." },
                { icon: CalendarCheck, title: "Site Visit Assistance", desc: "Help users schedule and coordinate guided property site visits with verified project representatives." },
                { icon: FileSearch, title: "Buyer Guidance", desc: "Deliver actionable insights, buying guides, and micro-market data to assist buyers before making booking decisions." },
              ].map((card, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all group space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                    <card.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{card.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW WE EVALUATE PROJECT INFORMATION (TRUST SECTION) */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} /> Section 4 — How We Evaluate Project Information
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Our Commitment to Data Verification &amp; Trust
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Establishing trust and transparency is fundamental to our platform. We gather property details through structured evaluation processes to ensure high-quality information.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-amber-400" /> Information Sources
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Project details on Naani Projects are compiled from official developer releases, public RERA documentation, architectural site plans, physical site visits, and direct updates from builder representatives.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-amber-400" /> RERA Verification Guidelines
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Where applicable, we reference Real Estate Regulatory Authority (RERA) registration numbers. We strongly encourage buyers to independently check official RERA Telangana portals for registered approvals.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-amber-400" /> Dynamic Pricing &amp; Offers
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Base prices, launch discounts, payment plans, and floor-rise charges are subject to frequent developer revisions. All financial quotes should be re-confirmed prior to signing booking agreements.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-amber-400" /> Construction Timelines
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Project completion dates, tower handovers, and possession schedules reflect estimates provided by developers and should be confirmed directly during site visits.
                </p>
              </div>
            </div>

            {/* MANDATORY LEGAL DUE DILIGENCE DISCLAIMER */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200 text-sm leading-relaxed space-y-2">
              <div className="font-bold text-amber-400 text-base flex items-center gap-2">
                <AlertTriangle size={18} /> Important Legal Due Diligence Notice
              </div>
              <p>
                <strong>Naani Projects does not replace independent legal, financial or technical due diligence. Buyers should verify title, approvals, agreements and other legal documentation with qualified professionals before purchasing.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR HYDERABAD REAL ESTATE FOCUS */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} /> Section 5 — Hyderabad Areas We Cover
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Focusing on Hyderabad's Major Growth Corridors
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Hyderabad has emerged as one of India's premier real estate destinations. Naani Projects actively tracks residential developments across key residential hubs and IT corridors in Hyderabad:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Kokapet", path: "/projects-in-kokapet", desc: "Ultra-luxury high-rise corridor near Financial District." },
                { name: "Tellapur", path: "/projects-in-tellapur", desc: "Fast-growing residential hub near Gachibowli & ORR." },
                { name: "Gachibowli", path: "/projects-in-gachibowli", desc: "Established IT financial hub with premium apartments." },
                { name: "Narsingi", path: "/projects-in-narsingi", desc: "Strategic junction connecting Financial District & ORR." },
                { name: "Kondapur", path: "/projects-in-kondapur", desc: "Prime residential ecosystem close to HITECH City." },
                { name: "Miyapur", path: "/projects-in-miyapur", desc: "Excellent metro connectivity and affordable gated flats." },
                { name: "Bachupally", path: "/projects-in-bachupally", desc: "Educational & residential hub for families." },
                { name: "Kollur", path: "/projects-in-kollur", desc: "Rapidly expanding township zone along the ORR." },
                { name: "Tukkuguda", path: "/projects-in-tukkuguda", desc: "Villa and plot corridor near Hyderabad Airport." },
                { name: "Nallagandla", path: "/projects-in-nallagandla", desc: "Premium family housing near HCU & Financial District." },
                { name: "Bowrampet", path: "/projects-in-bowrampet", desc: "Emerging northern residential growth pocket." },
                { name: "Mallampet", path: "/projects-in-mallampet", desc: "Affordable gated community project destination." },
              ].map((loc, i) => (
                <Link key={i} to={loc.path} className="p-4 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 hover:-translate-y-1 transition-all space-y-1 group">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>{loc.name}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{loc.desc}</p>
                </Link>
              ))}
            </div>

            <div className="pt-2 text-sm text-slate-400">
              Looking for a specific micro-market? Explore our dedicated <Link to="/hyderabad" className="text-amber-400 hover:underline font-semibold">Hyderabad Real Estate Hub</Link> for complete area listings.
            </div>
          </div>
        </section>

        {/* SECTION 6: PROPERTY TYPES YOU CAN EXPLORE */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Home size={16} /> Section 6 — Property Types You Can Explore
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Diverse Housing Categories Across Hyderabad
              </h2>
              <p className="text-slate-300 text-base">
                Whether you are seeking a compact 2 BHK apartment, a spacious 3 BHK family home, or an independent luxury villa, Naani Projects covers all major property types:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: "2 BHK Flats in Hyderabad", url: "/hyderabad/2-bhk-flats", badge: "Popular" },
                { title: "3 BHK Flats in Hyderabad", url: "/hyderabad/3-bhk-flats", badge: "High Demand" },
                { title: "Apartments in Hyderabad", url: "/projects", badge: "All Types" },
                { title: "Villas in Hyderabad", url: "/projects", badge: "Luxury" },
                { title: "Plots in Hyderabad", url: "/projects", badge: "Investment" },
                { title: "New Residential Projects", url: "/projects", badge: "New Launch" },
                { title: "Gated Community Projects", url: "/projects", badge: "Gated Layouts" },
                { title: "Luxury Homes in Hyderabad", url: "/projects", badge: "Premium" },
              ].map((item, idx) => (
                <Link key={idx} to={item.url} className="p-5 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/50 hover:bg-[#131B32] transition-all flex items-center justify-between group">
                  <div className="space-y-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">{item.badge}</span>
                    <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mt-1">{item.title}</div>
                  </div>
                  <ArrowRight size={16} className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: WHO WE HELP */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Users size={16} /> Section 7 — Who We Help
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Tailored Support for Every Buyer Persona
              </h2>
              <p className="text-slate-300 text-base">
                Naani Projects serves diverse property search requirements across Hyderabad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Home className="text-amber-400" size={20} /> Homebuyers
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Individuals and families looking for a residential home in Hyderabad based on budget, commute preferences, school proximity, and desired lifestyle amenities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-amber-400" size={20} /> First-Time Buyers
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  First-time property buyers who benefit from straightforward guidance on carpet area, total pricing components, loan approvals, and site visit scheduling.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-amber-400" size={20} /> Property Investors
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Investors evaluating growth corridors in Hyderabad. We provide objective corridor data without offering guaranteed financial returns or speculative claims.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="text-amber-400" size={20} /> NRI Buyers
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Non-Resident Indians living outside Hyderabad who require digital brochures, video walkthroughs, and trusted assistance to evaluate properties remotely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: OUR APPROACH TO PROPERTY DISCOVERY */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Section 8 — Our Approach to Property Discovery
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Simple 5-Step Discovery Journey
              </h2>
              <p className="text-slate-300 text-base">
                We put control back into the hands of the buyer through a transparent, 5-step process:
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: "01", title: "Explore Properties", desc: "Browse curated apartments, villas, and new launches across Hyderabad on our website." },
                { step: "02", title: "Shortlist Projects", desc: "Select projects that match your budget, BHK configuration, and location requirements." },
                { step: "03", title: "Compare Details", desc: "Review detailed floor plans, cost structures, and neighborhood connectivity side-by-side." },
                { step: "04", title: "Request Visit", desc: "Schedule a free, guided site visit or connect with an advisor on WhatsApp." },
                { step: "05", title: "Informed Decision", desc: "Complete independent due diligence and finalize your dream home with full confidence." },
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 text-center space-y-3 relative">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Step {s.step}</span>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: MEET THE NAANI PROJECTS TEAM */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Users size={16} /> Section 9 — Meet the Naani Projects Team
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Local Market Knowledge &amp; Dedicated Support
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Naani Projects is powered by a dedicated team of real estate research analysts, property advisors, and digital technology specialists focused exclusively on the Hyderabad property market.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <Search size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Real Estate Research Team</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Monitors active developments, RERA listings, construction progress updates, and infrastructure growth across Hyderabad's key residential corridors.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <MessageCircle size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">WhatsApp Advisory Specialists</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Assists property seekers with customized brochures, site visit arrangements, pricing breakdowns, and direct builder coordination.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <Building2 size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Developer Network Coordinators</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Maintains active communication with leading Hyderabad builders like Rajapushpa, Prestige, Brigade, Aparna, My Home, and Team4.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: WHY CHOOSE NAANI PROJECTS */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Award size={16} /> Section 10 — Why Choose Naani Projects
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Honest Differentiators You Can Rely On
              </h2>
              <p className="text-slate-300 text-base">
                We build user confidence through authentic platform advantages rather than sensational claims.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Hyderabad-Focused Expertise", desc: "Dedicated exclusively to Hyderabad residential real estate, giving buyers deeper micro-market knowledge." },
                { title: "Objective Project Comparison", desc: "Clear floor plan breakdowns, cost structure comparisons, and location connectivity analysis." },
                { title: "Instant WhatsApp Support", desc: "No unwanted spam. Speak with helpful advisors and get brochures directly on WhatsApp." },
                { title: "Buyer-First Transparency", desc: "Honest project summaries including construction status, possession estimates, and RERA guidance." },
                { title: "Wide Property Range", desc: "Coverage spanning affordable 2 BHKs, spacious 3 BHKs, luxury villas, and investment plots." },
                { title: "Convenient Site Visit Booking", desc: "Hassle-free, free site visit coordination at times that fit your personal schedule." },
              ].map((diff, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Check size={18} />
                    <span className="text-white font-bold text-base">{diff.title}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed pl-6">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: TRANSPARENCY & BUYER DUE DILIGENCE */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} /> Section 11 — Transparency &amp; Buyer Due Diligence
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Fostering E-E-A-T &amp; Informed Decision-Making
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Real estate decisions are among the most significant financial commitments a homebuyer will ever make. Naani Projects adheres to high standards of transparency, clarity, and buyer education:
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-4 text-slate-300 text-sm leading-relaxed">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Pricing Fluidity:</strong> Developer pricing, promotional discounts, and payment schemes can change without notice. Always request a written price sheet during site visits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Inventory Availability:</strong> Unit availability changes dynamically as bookings occur. Unit allocations must be confirmed directly with the builder.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Independent Review:</strong> Title deeds, encumbrance certificates, layout approvals, and agreement conditions should be verified independently by a licensed legal legal practitioner.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Official RERA Portals:</strong> Verify project registration details on the official Telangana RERA web portal for official timelines and registered documents.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <HelpCircle size={16} /> Section 12 — Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Frequently Asked Questions About Naani Projects
              </h2>
              <p className="text-slate-300 text-base">
                Find answers to common questions about our platform, project coverage, and property discovery services.
              </p>
            </div>

            {/* Rendered directly in HTML DOM without client interaction required for crawlers */}
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono text-sm">Q{idx + 1}.</span> {faq.question}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 13: EXPLORE HYDERABAD PROPERTIES (CTAS & INTERNAL LINKS) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#0B101D] to-[#090D16]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#131C35] to-[#0F172A] border border-amber-500/30 text-center space-y-8 shadow-2xl relative overflow-hidden">
              <div className="space-y-4 max-w-3xl mx-auto">
                <span className="text-amber-400 text-sm font-bold uppercase tracking-wider block">Section 13 — Ready to Find Your Dream Property?</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Explore Premium Real Estate Across Hyderabad
                </h2>
                <p className="text-slate-300 text-base md:text-lg">
                  Browse our active project listings, compare growth locations, or message our team directly on WhatsApp for instant assistance.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-6 rounded-xl shadow-lg" onClick={() => window.open(WA_URL, "_blank")}>
                  <MessageCircle size={18} className="mr-2" /> WhatsApp Enquiry
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold px-6 py-6 rounded-xl" onClick={() => window.location.href = TEL}>
                  <Phone size={18} className="mr-2" /> Speak to an Expert
                </Button>
              </div>

              {/* Internal Links Hub */}
              <div className="pt-8 border-t border-slate-800 max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-300">
                <Link to="/projects" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Browse Projects <ExternalLink size={12} />
                </Link>
                <Link to="/hyderabad" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Hyderabad Real Estate Hub <ExternalLink size={12} />
                </Link>
                <Link to="/hyderabad/2-bhk-flats" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  2 BHK Flats in Hyderabad <ExternalLink size={12} />
                </Link>
                <Link to="/hyderabad/3-bhk-flats" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  3 BHK Flats in Hyderabad <ExternalLink size={12} />
                </Link>
                <Link to="/list-your-property" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  List Your Property <ExternalLink size={12} />
                </Link>
                <Link to="/contact-us" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Contact Naani Projects <ExternalLink size={12} />
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 pt-4">
                <a href="https://www.instagram.com/naaniprojects/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/NaaniProjects/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Facebook size={18} />
                </a>
                <a href="https://www.youtube.com/@NaaniProjects" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default AboutPage;
