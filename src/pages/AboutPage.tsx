import { Link } from "react-router-dom";
import { 
  MessageCircle, Phone, MapPin, ShieldCheck, Sparkles, Building2, Home, 
  TrendingUp, Users, Award, CheckCircle2, ArrowRight, Search, CalendarCheck, 
  HelpCircle, Check, Compass, FileSearch, Scale, AlertTriangle, Layers, UserCheck, Briefcase, GraduationCap, Globe
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";

const WA_URL = "https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I'm%20looking%20to%20buy%2Fsell%20a%20property%20in%20Hyderabad.";
const TEL = "tel:+919493943946";

const AboutPage = () => {
  const faqs = [
    {
      question: "What is Naani Projects?",
      answer: "Naani Projects is a Hyderabad-focused real estate property discovery and assistance platform built around one simple goal: connecting the right buyer with the right seller."
    },
    {
      question: "Who is the founder of Naani Projects?",
      answer: "Naani Projects was founded by Shitish Kumar, who holds an MBA in Marketing from Osmania University and began his real estate journey in Hyderabad in 2017."
    },
    {
      question: "What property sales track record is associated with Naani Projects?",
      answer: "Across team and company sales activity, the experience behind Naani Projects includes more than 500 flats and 100 villas sold across Hyderabad since 2017. Note that these figures represent broader team/company sales performance and not the founder's individual sales count."
    },
    {
      question: "What types of properties does Naani Projects cover?",
      answer: "We support enquiries and discovery for apartments, luxury villas, open plots, residential developments, resale properties, and commercial spaces across Hyderabad."
    },
    {
      question: "How does Naani Projects evaluate real estate projects?",
      answer: "We check RERA registration details where applicable, review developer background and history, inspect project approvals and progress documents, communicate transparently, and encourage buyers to conduct independent legal and financial due diligence."
    },
    {
      question: "Which areas in Hyderabad does Naani Projects follow?",
      answer: "We follow established growth corridors including Kokapet, Tellapur, Kollur, Narsingi, Shankarpally, Shamshabad, Tukkuguda, Budvel, Rajendra Nagar, Adibatla, Kompally, Bachupally, Nizampet, Gundlapochampally, Medchal, Uppal, Pocharam, and Ghatkesar, as well as emerging areas like Mokila, Patancheru, Isnapur, Nandigama, Maheshwaram, Shadnagar, and Kothur."
    },
    {
      question: "Can Naani Projects assist with home loans and payment plans?",
      answer: "Yes. We help customers understand property payment arrangements and the general steps involved in securing a home loan, though final loan eligibility, interest rates, and approval are determined by financial institutions."
    },
    {
      question: "Does Naani Projects guarantee property appreciation or legal safety?",
      answer: "No. Our evaluation process is intended to support informed decision-making. It is not a guarantee of legal title, construction quality, project completion, investment returns, or price appreciation. Buyers are encouraged to complete independent legal due diligence before committing."
    }
  ];

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.naani.in/about-us#breadcrumb",
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.naani.in/#founder",
    "name": "Shitish Kumar",
    "jobTitle": "Founder",
    "worksFor": {
      "@id": "https://www.naani.in/#organization"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Osmania University"
    },
    "knowsAbout": [
      "Hyderabad Real Estate",
      "Property Discovery",
      "Marketing Strategy",
      "RERA Project Evaluation",
      "Residential & Commercial Properties"
    ],
    "image": "https://www.naani.in/shitish-kumar.png",
    "description": "Founder of Naani Projects. Holds an MBA in Marketing from Osmania University with real estate industry experience in Hyderabad dating back to 2017."
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
    "founder": {
      "@id": "https://www.naani.in/#founder"
    },
    "image": "https://www.naani.in/naani-projects-hyderabad-real-estate-team.webp",
    "telephone": "+919493943946",
    "email": "Naaniprojects@gmail.com",
    "description": "Naani Projects is a Hyderabad-focused real estate property discovery and assistance platform connecting the right buyer with the right seller.",
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
      "telephone": "+919493943946",
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
    "@type": "AboutPage",
    "@id": "https://www.naani.in/about-us#webpage",
    "url": "https://www.naani.in/about-us",
    "name": "About Naani Projects | Hyderabad Real Estate",
    "description": "Meet Naani Projects founder Shitish Kumar. Explore Hyderabad properties, learn about our project-checking approach, and connect with the right buyer or seller.",
    "isPartOf": {
      "@id": "https://www.naani.in/#website"
    },
    "about": [
      { "@id": "https://www.naani.in/#organization" },
      { "@id": "https://www.naani.in/#founder" }
    ],
    "breadcrumb": breadcrumbsSchema
  };

  const structuredDataCombined = [breadcrumbsSchema, personSchema, organizationSchema, webpageSchema];

  const areasFollowed = [
    { name: "Kokapet", path: "/projects-in-kokapet" },
    { name: "Tellapur", path: "/projects-in-tellapur" },
    { name: "Kollur", path: "/projects-in-kollur" },
    { name: "Narsingi", path: "/projects-in-narsingi" },
    { name: "Shankarpally", path: "/projects" },
    { name: "Shamshabad", path: "/projects" },
    { name: "Tukkuguda", path: "/projects-in-tukkuguda" },
    { name: "Budvel", path: "/projects" },
    { name: "Rajendra Nagar", path: "/projects" },
    { name: "Adibatla", path: "/projects" },
    { name: "Kompally", path: "/projects" },
    { name: "Bachupally", path: "/projects-in-bachupally" },
    { name: "Nizampet", path: "/projects" },
    { name: "Gundlapochampally", path: "/projects" },
    { name: "Medchal", path: "/projects" },
    { name: "Uppal", path: "/projects" },
    { name: "Pocharam", path: "/projects" },
    { name: "Ghatkesar", path: "/projects" }
  ];

  const emergingLocations = [
    "Mokila", "Patancheru", "Isnapur", "Nandigama", 
    "Maheshwaram", "Shadnagar", "Kothur", "Pharma City Region", 
    "Sagar Road Belt", "Keesara", "Bogaram", "Pocharam Extensions"
  ];

  return (
    <>
      <SEOHead
        title="About Naani Projects | Hyderabad Real Estate"
        description="Meet Naani Projects founder Shitish Kumar. Explore Hyderabad properties, learn about our project-checking approach, and connect with the right buyer or seller."
        canonicalUrl="https://www.naani.in/about-us"
        keywords="about naani projects, hyderabad real estate, shitish kumar, real estate in hyderabad, properties in hyderabad, residential projects in hyderabad, rera hyderabad, buy property in hyderabad"
        ogImage="https://www.naani.in/naani-projects-hyderabad-real-estate-team.webp"
        structuredData={structuredDataCombined}
      />

      <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans">
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
              <Sparkles size={14} /> Hyderabad Real Estate Discovery &amp; Assistance
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto">
              About Naani Projects – <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Hyderabad Real Estate</span>
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-amber-300/90 max-w-3xl mx-auto">
              Connecting the Right Buyer with the Right Property
            </p>

            <div className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto space-y-4 text-left sm:text-center">
              <p>
                Naani Projects is a Hyderabad-focused real estate property discovery and assistance platform built around one simple goal: connecting the right buyer with the right seller.
              </p>
              <p>
                Whether you are looking to buy an apartment, purchase a villa, invest in an open plot, explore a commercial property, or sell a property you already own, we help you explore options based on your requirements, budget, preferred location, and property goals.
              </p>
              <p>
                Our approach centres on practical property guidance, clear communication, and helping customers understand the information available before making an important real estate decision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-md mx-auto">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-6 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all" onClick={() => window.open(WA_URL, "_blank")}>
                <MessageCircle size={18} className="mr-2" /> Connect on WhatsApp (+91 94939 43946)
              </Button>
              <Button size="lg" variant="outline" className="bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-semibold px-6 py-6 rounded-xl" onClick={() => window.location.href = TEL}>
                <Phone size={18} className="mr-2" /> Call +91 94939 43946
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION: OUR STORY */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={16} /> Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
                Built on Real Estate Experience Since 2017
              </h2>
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                <p>
                  Naani Projects is built on real estate experience in Hyderabad dating back to 2017. Founder Shitish Kumar holds an MBA in Marketing from Osmania University and has developed an understanding of the property market through work with real estate teams and companies.
                </p>
                <p className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-200">
                  Across team and company sales activity, the experience behind Naani Projects includes more than <strong>500 flats</strong> and <strong>100 villas</strong> sold across Hyderabad. These figures represent the broader team/company track record and should not be interpreted as the founder's individual sales count.
                </p>
                <p>
                  This experience informs our focus on understanding buyer requirements, helping sellers reach relevant prospects, and making property information easier to explore.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-slate-900">
                <img
                  src="/naani-projects-hyderabad-real-estate-team.webp"
                  alt="Naani Projects Hyderabad real estate property discovery team"
                  className="w-full h-80 object-cover object-center"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Hyderabad Property Discovery Platform</p>
                  <p className="text-sm font-semibold text-white mt-1">Connecting Homebuyers &amp; Sellers Across Hyderabad</p>
                </div>
              </div>

              {/* Track Record Stats Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0F1629] border border-slate-800 text-center">
                  <div className="text-2xl font-extrabold text-amber-400">500+</div>
                  <div className="text-xs text-slate-400 mt-1">Flats Sold Across Hyderabad (Team/Company Sales)</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1629] border border-slate-800 text-center">
                  <div className="text-2xl font-extrabold text-amber-400">100+</div>
                  <div className="text-xs text-slate-400 mt-1">Villas Sold Across Hyderabad (Team/Company Sales)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: MEET OUR FOUNDER - SHITISH KUMAR */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex justify-center">
                <div className="p-8 rounded-3xl bg-[#0F1629] border border-amber-500/30 text-center space-y-4 w-full max-w-sm shadow-xl relative overflow-hidden">
                  <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-500 p-1 shadow-lg shadow-amber-500/20">
                    <img 
                      src="/shitish-kumar.png" 
                      alt="Shitish Kumar" 
                      title="Shitish Kumar - Founder, Naani Projects"
                      className="w-full h-full rounded-full object-cover object-top bg-slate-950" 
                      width="144" 
                      height="144"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">Shitish Kumar</h3>
                    <p className="text-amber-400 text-sm font-semibold mt-1">Founder, Naani Projects</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap size={16} className="text-amber-400" />
                      <span>MBA in Marketing, Osmania University</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CalendarCheck size={16} className="text-amber-400" />
                      <span>Real Estate Journey Since 2017</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin size={16} className="text-amber-400" />
                      <span>Hyderabad Real Estate Market</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Users size={16} /> Meet Our Founder – Shitish Kumar
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Making Property Discovery &amp; Connections Straightforward
                </h2>
                <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                  <p>
                    Shitish Kumar founded Naani Projects with the aim of making property discovery and buyer-seller connections more straightforward.
                  </p>
                  <p>
                    With an MBA in Marketing from Osmania University and a real estate journey that began in 2017, he brings together marketing knowledge and practical exposure to Hyderabad's property market.
                  </p>
                  <p>
                    His vision is to help people explore suitable property options while helping owners connect with prospective buyers. Naani Projects supports enquiries related to apartments, villas, open plots, residential properties, and commercial properties.
                  </p>
                  <p className="italic text-amber-200/90 bg-[#0F1629] p-4 rounded-xl border border-slate-800">
                    "For Shitish, real estate is about more than presenting a listing. It is about understanding what a customer needs, sharing available information clearly, and helping them take the next step with greater confidence."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHAT WE DO */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Layers size={16} /> What We Do
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Comprehensive Property Assistance Services
              </h2>
              <p className="text-slate-300 text-base">
                We support property buyers and sellers across Hyderabad with practical guidance and clear communication.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Property Buying Assistance</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We help buyers explore property options based on their preferred location, budget, property type, configuration, and intended use. Available options may include new residential projects, apartments, villas, plots, resale properties, and commercial spaces.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Building2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Property Selling Assistance</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Property owners can contact Naani Projects to discuss selling their apartments, villas, plots, or other eligible properties. We help present property information and connect owners with relevant prospective buyers.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <FileSearch size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Project and Developer Information</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  For applicable real estate projects, we prioritise checking RERA registration details and reviewing available information about the developer, project documents, progress, and expected possession. The extent of verification depends on the information and records available.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Scale size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Payment and Home-Loan Guidance</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  We help customers understand the payment arrangements associated with a property and the general steps involved in a home-loan process. Loan eligibility, approval, interest rates, and final terms are determined by the relevant financial institution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: OUR APPROACH TO PROPERTY AND PROJECT EVALUATION */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} /> Our Evaluation Approach
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Our Approach to Property and Project Evaluation
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                A property decision can have long-term financial implications. We therefore aim to make relevant information easier for customers to understand.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  num: "1",
                  title: "RERA registration checks",
                  desc: "Check relevant registration details for projects where registration is applicable."
                },
                {
                  num: "2",
                  title: "Developer background",
                  desc: "Review available information about the developer's history, completed projects, reputation, and publicly available track record."
                },
                {
                  num: "3",
                  title: "Project information",
                  desc: "Review available project documents, approvals, construction or development progress, and expected possession details."
                },
                {
                  num: "4",
                  title: "Clear communication",
                  desc: "Distinguish information that has been checked from information supplied by a developer, seller, or other source."
                },
                {
                  num: "5",
                  title: "Customer due diligence",
                  desc: "Encourage buyers to independently verify property documents, legal title, approvals, payment terms, and other matters relevant to their transaction before committing."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#0F1629] border border-slate-800 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Evaluation Disclaimer Card */}
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200 text-sm leading-relaxed space-y-2">
              <div className="font-bold text-amber-400 text-base flex items-center gap-2">
                <AlertTriangle size={18} /> Disclaimer on Evaluation Scope
              </div>
              <p>
                Our evaluation process is intended to support informed decisions. It is not a guarantee of legal title, construction quality, project completion, investment returns, or future property appreciation. RERA registration, where applicable, should not be treated as a substitute for independent due diligence.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: OUR FOCUS ON HYDERABAD */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} /> Hyderabad Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Our Focus on Hyderabad
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Hyderabad includes established residential neighbourhoods, expanding development corridors, and locations attracting new buyer interest. We follow property opportunities across the city and surrounding areas, considering factors such as connectivity, available infrastructure, project information, budget, and customer requirements.
              </p>
            </div>

            {/* Areas We Follow */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={18} className="text-amber-400" /> Areas We Follow
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {areasFollowed.map((area, i) => (
                  <Link 
                    key={i} 
                    to={area.path} 
                    className="p-3.5 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 hover:text-amber-400 transition-all flex items-center justify-between text-sm font-semibold text-slate-200 group"
                  >
                    <span>{area.name}</span>
                    <ArrowRight size={14} className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Emerging Locations We Monitor */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass size={18} className="text-amber-400" /> Emerging Locations We Monitor
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {emergingLocations.map((loc, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-xl bg-[#0F1629] border border-slate-800 text-xs font-semibold text-slate-300 hover:border-amber-500/30 transition-colors">
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              These lists describe the areas we follow; they are not guarantees of price appreciation or investment performance. Suitability depends on individual requirements, property-specific facts, infrastructure, approvals, and prevailing market conditions.
            </div>
          </div>
        </section>

        {/* SECTION: OUR MISSION */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
              <Award size={14} /> Our Core Mission
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
              Connecting the Right Buyer with the Right Seller
            </h2>
            <div className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto space-y-4">
              <p>
                Our mission is to connect the right buyer with the right seller through clear communication, relevant property options, and responsible guidance.
              </p>
              <p>
                We aim to help buyers understand their options and help property owners reach potential customers without creating unrealistic expectations or promising outcomes we cannot control.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: OUR COMMITMENT TO CUSTOMERS */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} /> Customer Standards
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Our Commitment to Customers
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                We believe that property decisions deserve careful consideration. We aim to:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Understand each customer's property requirements and budget.",
                "Share relevant property details and identify information that still needs confirmation.",
                "Check applicable RERA details and review available project and developer information.",
                "Communicate clearly about pricing information, payment arrangements, and the home-loan process.",
                "Encourage independent verification of important legal, financial, and property documents.",
                "Correct listing information when reliable updated details are provided."
              ].map((commitment, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 space-y-2 flex items-start gap-3">
                  <Check size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-slate-200 text-sm leading-relaxed">{commitment}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
              Property information, availability, pricing, project progress, and possession timelines may change. Customers should verify current details and obtain appropriate professional advice before completing a transaction.
            </div>
          </div>
        </section>

        {/* SECTION: BUYING OR SELLING A PROPERTY IN HYDERABAD? (CTA) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16] border-b border-slate-800/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Buying or Selling a Property in Hyderabad?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Whether you are searching for an apartment, villa, open plot, residential property, or commercial space—or want to sell a property you own—Naani Projects welcomes your enquiry.
            </p>
            <p className="text-amber-300 font-medium text-sm sm:text-base">
              Tell us what you need, your preferred location, and your budget. We will help you explore relevant options and understand the next steps.
            </p>

            {/* Contact Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1629] border border-amber-500/30 space-y-6 max-w-2xl mx-auto shadow-2xl">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">Contact Naani Projects</h3>
                <p className="text-slate-300 text-sm sm:text-base">Call or WhatsApp us directly for property discovery &amp; selling assistance:</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                <a 
                  href={WA_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-900/40 text-sm sm:text-base whitespace-nowrap"
                >
                  <MessageCircle size={20} className="shrink-0" />
                  <span>WhatsApp +91 94939 43946</span>
                </a>
                <a 
                  href={TEL}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold px-5 py-4 rounded-xl transition-all text-sm sm:text-base whitespace-nowrap"
                >
                  <Phone size={20} className="shrink-0" />
                  <span>Call +91 94939 43946</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-400 flex items-center justify-center gap-2">
                <Globe size={16} className="text-amber-400" />
                <span>Website: <a href="https://www.naani.in/" className="text-amber-400 hover:underline font-semibold">https://www.naani.in/</a></span>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
              Naani Projects – Connecting the Right Buyer with the Right Seller.
            </p>
          </div>
        </section>

        {/* SECTION: FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 md:py-20 bg-[#090D16]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <HelpCircle size={16} /> Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Frequently Asked Questions About Naani Projects
              </h2>
              <p className="text-slate-300 text-base">
                Answers to common questions about our platform, founder, evaluation approach, and services.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono text-sm">Q{idx + 1}.</span> {faq.question}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
