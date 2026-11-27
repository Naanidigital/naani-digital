import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ShieldAlert,
  Building2,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  MessageCircle,
  Bell,
  ArrowRight,
  ChevronDown,
  Info,
  ExternalLink,
  Award,
  Compass,
  FileCheck2,
  HelpCircle,
  CheckCircle2,
  Clock,
  Landmark,
  Share2
} from "lucide-react";
import { sendLeadToSheet, detectPageContext } from "@/lib/leadProfile";

export default function BrigadeKompallyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    configuration: "3 BHK (Planned)",
    budgetRange: "",
    consent: false
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText("https://www.naani.in/projects/brigade-kompally");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || formData.phone.length < 10) {
      alert("Please enter your name and a valid 10-digit mobile number.");
      return;
    }
    if (!formData.consent) {
      alert("Please confirm your consent to receive requested project notifications.");
      return;
    }

    setSubmitting(true);
    try {
      const pageCtx = detectPageContext({
        propertyName: "Brigade Kompally",
        projectName: "Brigade Kompally",
        builderName: "Brigade Group",
        location: "Kompally",
        propertyType: "Apartment",
        pageUrl: window.location.href
      });

      await sendLeadToSheet({
        profile: {
          name: formData.name,
          phone: formData.phone,
          lookingFor: formData.configuration.includes("2 BHK")
            ? "2 BHK"
            : formData.configuration.includes("4 BHK")
            ? "4 BHK"
            : "3 BHK",
          budget: formData.budgetRange ? (formData.budgetRange as any) : undefined,
          capturedAt: new Date().toISOString()
        },
        context: pageCtx,
        leadSource: `Brigade Kompally Pre-Launch Updates Form (${formData.configuration}) [Budget Interest: ${formData.budgetRange || "Not Specified"}] [Consent Given: true]`
      });

      setFormSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Who is developing Brigade Kompally?",
      a: "Brigade Kompally is being developed by Brigade Enterprises Limited (Brigade Group), one of India's premier listed real estate developers founded in 1986, with over 250 delivered landmarks across Bengaluru, Hyderabad, Chennai, and other key cities."
    },
    {
      q: "Where is Brigade Kompally located?",
      a: "The project is located in Kompally, Medchal-Malkajgiri District, North Hyderabad. The site is situated along the high-growth NH-44 corridor with direct transit access toward Nehru Outer Ring Road (ORR Exit 6 at Kandlakoya) and Suchitra Circle."
    },
    {
      q: "What is the project land extent?",
      a: "Brigade Enterprises Limited secured approximately 5.6 acres in Kompally under a Joint Development Agreement (JDA), as officially disclosed to the stock exchanges (BSE & NSE)."
    },
    {
      q: "Which configurations are planned?",
      a: "The development is planned to offer premium 2 BHK, 3 BHK, and 4 BHK residential apartments in modern high-rise towers. Final typologies will be confirmed upon regulatory sanction."
    },
    {
      q: "What is the current TG RERA status?",
      a: "TG RERA registration is currently in process. In accordance with the Real Estate (Regulation and Development) Act, official marketing, sales, and bookings will commence only after the registration certificate and number are granted by the Telangana Real Estate Regulatory Authority."
    },
    {
      q: "Are apartment sizes and floor plans available?",
      a: "Official unit dimensions, carpet areas, and floor plans are currently awaiting release. They will be published once sanctioned building plans are approved by municipal authorities and TG RERA."
    },
    {
      q: "Has pricing been announced?",
      a: "No official pricing or payment schedule has been published by the developer. The estimated Gross Development Value (GDV) of ~₹850 Crore disclosed in exchange filings reflects the project's overall development potential, not individual unit pricing."
    },
    {
      q: "When will official launch information be available?",
      a: "Official launch details, tower plans, pricing sheets, and construction schedules will be announced by Brigade Enterprises Limited following statutory approvals and RERA certificate issuance."
    },
    {
      q: "Can I register for project updates?",
      a: "Yes. You can register on Naani Projects to receive verified alerts when official RERA registration is confirmed, sanctioned floor plans are issued, and developer bookings commence. Naani Projects does not collect any token or advance payments for unapproved projects."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Brigade Kompally Hyderabad | 2, 3 & 4 BHK by Brigade</title>
        <meta
          name="description"
          content="Explore Brigade Kompally in North Hyderabad. Discover its 5.6-acre development, planned configurations, developer details and latest TG RERA status."
        />
        <link rel="canonical" href="https://www.naani.in/projects/brigade-kompally" />

        {/* OpenGraph */}
        <meta property="og:title" content="Brigade Kompally Hyderabad | 2, 3 & 4 BHK by Brigade" />
        <meta
          property="og:description"
          content="Explore Brigade Kompally in North Hyderabad. Discover its 5.6-acre development, planned configurations, developer details and latest TG RERA status."
        />
        <meta property="og:url" content="https://www.naani.in/projects/brigade-kompally" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brigade Kompally Hyderabad | 2, 3 & 4 BHK by Brigade" />
        <meta
          name="twitter:description"
          content="Explore Brigade Kompally in North Hyderabad. Discover its 5.6-acre development, planned configurations, developer details and latest TG RERA status."
        />

        {/* Schema.org BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
              { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
              { "@type": "ListItem", "position": 3, "name": "Kompally", "item": "https://www.naani.in/projects-in-kompally" },
              { "@type": "ListItem", "position": 4, "name": "Brigade Kompally", "item": "https://www.naani.in/projects/brigade-kompally" }
            ]
          })}
        </script>

        {/* Schema.org RealEstateListing / ApartmentComplex */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": "Brigade Kompally",
            "url": "https://www.naani.in/projects/brigade-kompally",
            "description": "Upcoming premium residential gated community by Brigade Enterprises Limited across approximately 5.6 acres in Kompally, North Hyderabad. Planned 2, 3 and 4 BHK high-rise residences in modern towers. TG RERA registration under process.",
            "provider": {
              "@type": "Organization",
              "name": "Brigade Enterprises Limited",
              "alternateName": "Brigade Group",
              "url": "https://www.brigadegroup.com"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kompally",
              "addressRegion": "Telangana",
              "postalCode": "500014",
              "addressCountry": "IN"
            }
          })}
        </script>

        {/* Schema.org FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-amber-500 selection:text-slate-950 pb-20 lg:pb-12">
        {/* TOP STATUS BAR & BREADCRUMBS */}
        <section className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-1.5 text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <span>/</span>
              <Link to="/projects-in-kompally" className="hover:text-amber-400 transition-colors">Kompally</Link>
              <span>/</span>
              <span className="text-amber-400 font-medium">Brigade Kompally</span>
            </nav>

            {/* Regulatory Status Badge */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>TG RERA: Registration in Process · Pre-Launch Planning</span>
              </div>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copy Project Link"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              {copiedLink && <span className="text-[11px] text-emerald-400">Copied!</span>}
            </div>
          </div>
        </section>

        {/* HERO SECTION */}
        <section className="relative pt-8 pb-14 lg:py-16 overflow-hidden border-b border-slate-800/80">
          {/* Subtle Glow Background */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 to-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Project Header Title */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>Upcoming Landmark by Brigade Enterprises Limited · North Hyderabad</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Brigade Kompally – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Planned 2, 3 &amp; 4 BHK Residences</span> in Hyderabad
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
                A planned ~5.6-acre residential community in Kompally secured under a Joint Development Agreement (JDA) by Brigade Enterprises Limited, with an estimated Gross Development Value (GDV) of approximately ₹850 Crore as disclosed in stock exchange filings. Currently in the pre-launch planning stage awaiting statutory TG RERA clearance.
              </p>
            </div>

            {/* Hero Grid: Visual Conceptual Frame & Key Parameter Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Architectural Canvas */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
                  {/* Blueprint Grid Watermark */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#f59e0b 1px, transparent 1px)",
                      backgroundSize: "24px 24px"
                    }}
                  />

                  {/* Top Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-slate-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                      Architectural Staging · JDA Planning Stage
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kompally, North Hyderabad</span>
                    </span>
                  </div>

                  {/* Conceptual Frame Content */}
                  <div className="relative z-10 my-auto py-8 text-center sm:text-left">
                    <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
                      <Compass className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Master Layout &amp; Renderings in Preparation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                      Official elevation renders, clubhouse blueprints, and sanctioned floor plates are being finalized by Brigade Enterprises Limited for municipal and RERA submissions. Naani Projects displays verified project materials exclusively upon regulatory sanction.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>5.6-Acre Land Extent (JDA)</span>
                      </div>
                      <span className="text-slate-600 hidden sm:inline">·</span>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Planned 2, 3 &amp; 4 BHK Typologies</span>
                      </div>
                      <span className="text-slate-600 hidden sm:inline">·</span>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tier-1 Developer Track Record</span>
                      </div>
                    </div>
                  </div>

                  {/* Empty Media Slot Notice */}
                  <div className="relative z-10 p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Asset Slot: Official elevation and layout plans will appear here upon RERA grant.</span>
                    </span>
                    <a
                      href="#regulatory-status"
                      className="text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap text-[11px]"
                    >
                      Read RERA Note
                    </a>
                  </div>
                </div>

                {/* Sub-CTAs Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <a
                    href="#enquiry-section"
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-center transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-amber-400 flex items-center justify-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                      <span>Launch Alert</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Register for Updates</div>
                  </a>
                  <a
                    href="https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Brigade%20Kompally.%20Please%20share%20project%20updates%20when%20released."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-center transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 flex items-center justify-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Direct Advisory</div>
                  </a>
                  <a
                    href="tel:+919493943946"
                    className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-center transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-blue-400 flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <span>Call Now</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">+91 94939 43946</div>
                  </a>
                </div>
              </div>

              {/* Right Column: Key Parameter Cards & Registration Module */}
              <div className="lg:col-span-5 space-y-4">
                {/* 6 Key Verified Highlights */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Project Baseline (Phase 2 Source-Verified)
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Developer</span>
                      </div>
                      <div className="font-bold text-white mt-1">Brigade Enterprises Ltd</div>
                      <div className="text-[11px] text-slate-400">NSE / BSE Listed</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>Land Extent</span>
                      </div>
                      <div className="font-bold text-white mt-1">~5.6 Acres</div>
                      <div className="text-[11px] text-slate-400">Joint Development Agreement</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Corridor</span>
                      </div>
                      <div className="font-bold text-white mt-1">Kompally</div>
                      <div className="text-[11px] text-slate-400">North Hyderabad (NH-44)</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Est. GDV</span>
                      </div>
                      <div className="font-bold text-white mt-1">~₹850 Crore</div>
                      <div className="text-[11px] text-amber-400/80">Project Development Value</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span>Typologies</span>
                      </div>
                      <div className="font-bold text-white mt-1">2, 3 &amp; 4 BHK</div>
                      <div className="text-[11px] text-slate-400">Multi-Storeyed High-Rise</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>RERA Status</span>
                      </div>
                      <div className="font-bold text-amber-300 mt-1">Under Process</div>
                      <div className="text-[11px] text-slate-400">Pre-Launch Stage</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Important Clarification:</strong> The ~₹850 Crore figure represents the developer's estimated Gross Development Value (GDV / total anticipated project realization) disclosed to stock exchanges under SEBI regulations, not individual apartment pricing. Apartment prices will be announced upon TG RERA sanction.
                    </span>
                  </div>
                </div>

                {/* Quick Registration Jump Card */}
                <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Receive Official Project Alerts</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Be the first to receive verified TG RERA sanction notifications.
                      </p>
                    </div>
                    <a
                      href="#enquiry-section"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors shadow-md shadow-amber-500/20"
                    >
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK NAVIGATION SUB-BAR */}
        <section className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-12 z-20 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 py-3 text-xs font-semibold overflow-x-auto scrollbar-none text-slate-400">
              <a href="#overview" className="hover:text-amber-400 transition-colors">Project Overview</a>
              <a href="#highlights" className="hover:text-amber-400 transition-colors">Highlights</a>
              <a href="#configurations" className="hover:text-amber-400 transition-colors">Planned Configurations</a>
              <a href="#location" className="hover:text-amber-400 transition-colors">Location &amp; Infrastructure</a>
              <a href="#developer" className="hover:text-amber-400 transition-colors">Brigade Enterprises</a>
              <a href="#regulatory-status" className="hover:text-amber-400 transition-colors">Regulatory Status</a>
              <a href="#buyer-advisory" className="hover:text-amber-400 transition-colors text-amber-400">Buyer Advisory</a>
              <a href="#faqs" className="hover:text-amber-400 transition-colors">FAQs</a>
              <a href="#enquiry-section" className="text-amber-400 ml-auto hover:text-amber-300">Register for Updates →</a>
            </div>
          </div>
        </section>

        {/* SECTION B: PROJECT OVERVIEW */}
        <section id="overview" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Corporate Announcement &amp; Background
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Strategic Expansion into North Hyderabad's Growth Corridor
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
              <div className="lg:col-span-8 space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Brigade Enterprises Limited, a prominent national property developer listed on both the National Stock Exchange (NSE: BRIGADE) and Bombay Stock Exchange (BSE: 532929), has formally entered into a <strong>Joint Development Agreement (JDA)</strong> to develop a prime <strong>5.6-acre land parcel</strong> in <strong>Kompally</strong>, North Hyderabad.
                </p>
                <p>
                  As officially disclosed in regulatory filings submitted under Regulation 30 of the SEBI (Listing Obligations and Disclosure Requirements) Regulations, the planned residential development is projected to yield an estimated <strong>Gross Development Value (GDV) of approximately ₹850 Crore</strong> under the Joint Development Agreement. This represents the developer's anticipated revenue potential, not individual apartment pricing.
                </p>
                <p>
                  Planned as an integrated high-rise residential enclave, the development will offer thoughtfully planned <strong>2 BHK, 3 BHK, and 4 BHK residences</strong> catering to homebuyers and professionals seeking Tier-1 corporate construction standards, expansive landscaped open spaces, and modern lifestyle amenities in North Hyderabad.
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 mt-4 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-amber-400" />
                    <span>Regulatory Filing Verification</span>
                  </div>
                  <p className="text-slate-400 leading-normal">
                    The land transaction was formally communicated to the stock exchanges as a material event by Brigade Enterprises Limited. All architectural parameters, exact tower configurations, unit counts, and possession timelines will be documented upon issuance of municipal approvals and the official TG RERA registration certificate.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    JDA Parameter Matrix
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Promoter / Developer</span>
                      <span className="font-medium text-white">Brigade Enterprises Ltd</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Transaction Structure</span>
                      <span className="font-medium text-white">Joint Development (JDA)</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Land Extent</span>
                      <span className="font-medium text-white">5.6 Acres</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Estimated Project GDV</span>
                      <span className="font-medium text-white">~₹850 Crore</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Micro-Market</span>
                      <span className="font-medium text-white">Kompally, North Hyderabad</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Target Typologies</span>
                      <span className="font-medium text-white">2, 3 &amp; 4 BHK Apartments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C: PROJECT HIGHLIGHTS */}
        <section id="highlights" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Supported Project Baseline
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Verified Project Highlights
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                In adherence to Naani Projects' verified disclosure standards, only information confirmed through exchange filings and statutory disclosures is presented below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Highlight 1 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Tier-1 Developer Pedigree</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Developed by Brigade Enterprises Limited, bringing over three decades of engineering excellence, institutional project governance, and a proven track record across South India.
                </p>
              </div>

              {/* Highlight 2 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">5.6-Acre Land Extent</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The land parcel provides a generous footprint in Kompally, allowing for high-density multi-storeyed towers harmonized with expansive open landscape courtyards and lifestyle zones.
                </p>
              </div>

              {/* Highlight 3 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">2, 3 &amp; 4 BHK Typologies</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Planned for multiple family formats, including compact modern 2 BHK layouts, comfortable 3 BHK family residences, and spacious 4 BHK luxury residences.
                </p>
              </div>

              {/* Highlight 4 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">NH-44 &amp; ORR Gateway</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Strategic placement along the Kompally NH-44 residential corridor with direct 10-minute transit to Nehru Outer Ring Road (ORR Exit 6), connecting smoothly toward the airport and West Hyderabad.
                </p>
              </div>

              {/* Highlight 5 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Transparent RERA Governance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Official registration with the Telangana Real Estate Regulatory Authority (TG RERA) is actively under process. No public bookings will open until statutory clearance is issued.
                </p>
              </div>

              {/* Highlight 6 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Lifestyle Infrastructure</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  As standard across Brigade communities, the development is planned with a signature resident clubhouse, swimming pool, sports courts, and green recreational corridors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D: PLANNED CONFIGURATIONS */}
        <section id="configurations" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Apartment Configurations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Planned 2, 3 &amp; 4 BHK Typologies
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Official floor plans, unit carpet areas, and dimensions will be updated upon regulatory sanction by HMDA and TG RERA. The planned categories include:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2 BHK Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Smart Urban Living
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">2 BHK Residences</h3>
                  <div className="text-xs text-slate-400 mt-1">Status: Floor Plans Awaiting Release</div>

                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Optimized layout for nuclear families and young working professionals.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Planned cross-ventilation, functional utility area, and balcony.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Exact carpet area &amp; Sft will be published from approved RERA filings.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full block py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-amber-400 transition-colors"
                  >
                    Alert Me on 2 BHK Plans
                  </a>
                </div>
              </div>

              {/* 3 BHK Card */}
              <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 p-6 flex flex-col justify-between shadow-xl relative">
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[11px] font-bold text-amber-300">
                  Popular Planned
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Spacious Family Living
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">3 BHK Residences</h3>
                  <div className="text-xs text-slate-400 mt-1">Status: Floor Plans Awaiting Release</div>

                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Comfortable 3-bedroom formats planned for growing family requirements.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Spacious living-dining corridors, dedicated kitchen utility &amp; wide balconies.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Exact dimensions and unit facing options pending statutory release.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full block py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-center text-xs font-extrabold text-slate-950 transition-colors shadow-md shadow-amber-500/20"
                  >
                    Alert Me on 3 BHK Plans
                  </a>
                </div>
              </div>

              {/* 4 BHK Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Expansive Luxury Living
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">4 BHK Residences</h3>
                  <div className="text-xs text-slate-400 mt-1">Status: Floor Plans Awaiting Release</div>

                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Grand multi-bedroom residences designed for multi-generational living.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Planned with expansive master suites, corner views, and premium privacy.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Exact architectural layouts pending developer launch collaterals.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full block py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-amber-400 transition-colors"
                  >
                    Alert Me on 4 BHK Plans
                  </a>
                </div>
              </div>
            </div>

            {/* Factual Disclaimer Box */}
            <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 text-center max-w-2xl mx-auto">
              <span>Notice: Unit dimensions, carpet areas, and architectural drawings will be published strictly from the sanctioned TG RERA approval certificate. Naani Projects does not publish unverified mock floor plates.</span>
            </div>
          </div>
        </section>

        {/* SECTION E: LOCATION ADVANTAGES & INFRASTRUCTURE */}
        <section id="location" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Micro-Market Connectivity
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Kompally &amp; North Hyderabad Corridor Advantages
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Situated in the green, self-contained residential corridor of Kompally with seamless highway and expressway transit links across the Hyderabad metropolitan region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {/* Highway & Expressway Access */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Road &amp; Expressway Links</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>NH-44 (Hyderabad-Nagpur Highway):</strong> Primary arterial link connecting Kompally to Suchitra Circle, Bowenpally, and Secunderabad.</li>
                  <li>• <strong>Nehru Outer Ring Road (ORR Exit 6):</strong> Located near the Kandlakoya junction, providing signal-free transit to Financial District, Gachibowli, and the Airport.</li>
                  <li>• <strong>Medchal Growth Highway:</strong> Northward connectivity toward the Medchal industrial and logistics zone.</li>
                </ul>
              </div>

              {/* Education & Healthcare Hubs */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>Nearby Schools &amp; Healthcare</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>Schools:</strong> DRS International School, Delhi World Public School (DWPS), Pallavi Model School, St. Ann's High School, and Unicent School.</li>
                  <li>• <strong>Hospitals:</strong> Russh Super Speciality Hospital, Narayana Multispeciality Hospital, Kakatiya Children's Hospital, and Surekha Hospital.</li>
                </ul>
              </div>

              {/* Retail & Employment Clusters */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Retail &amp; Employment Clusters</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>Retail &amp; Leisure:</strong> Cineplanet Kompally, D-Mart, Suchitra retail boulevard, family restaurants, and supermarkets.</li>
                  <li>• <strong>Biotech &amp; Life Sciences:</strong> Direct transit corridor toward Genome Valley (Shamirpet), a global biotechnology and pharmaceutical hub.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F: DEVELOPER OVERVIEW */}
        <section id="developer" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Developer Profile
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Brigade Enterprises Limited (Brigade Group)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Established in 1986 by M.R. Jaishankar and headquartered in Bengaluru, Brigade Enterprises Limited is one of India's leading publicly traded real estate developers (NSE: BRIGADE | BSE: 532929). Over the past three decades, Brigade has completed over 250 buildings encompassing more than 80 million square feet across residential, commercial, retail, and hospitality domains.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  In Hyderabad, Brigade Group has established a significant presence with landmark developments including Brigade Citadel (Moti Nagar) and Brigade Gateway Neopolis (Kokapet). The proposed Kompally development marks Brigade's strategic entry into North Hyderabad's premium residential corridor.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-amber-400 font-extrabold text-base">1986</div>
                    <div className="text-slate-400 mt-0.5">Established Year</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-amber-400 font-extrabold text-base">250+</div>
                    <div className="text-slate-400 mt-0.5">Delivered Buildings</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                    <div className="text-amber-400 font-extrabold text-base">Tier-1</div>
                    <div className="text-slate-400 mt-0.5">Listed Corporate Governance</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Corporate Credentials
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">NSE Symbol</span>
                      <span className="font-mono text-white">BRIGADE</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">BSE Scrip Code</span>
                      <span className="font-mono text-white">532929</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Headquarters</span>
                      <span className="text-white">Bengaluru, Karnataka</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Major Cities</span>
                      <span className="text-white">Hyderabad, Bengaluru, Chennai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION G: REGULATORY STATUS */}
        <section id="regulatory-status" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Statutory Transparency
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    TG RERA Registration Awaited — Pre-launch Planning
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-amber-500/20">
                <p>
                  As of late 2026, Brigade Kompally is in its pre-launch architectural and municipal approval phase following the signing of the Joint Development Agreement. The formal registration process with the <strong>Telangana Real Estate Regulatory Authority (TG RERA)</strong> is currently underway.
                </p>
                <p>
                  Under RERA statutory provisions, real estate projects cannot be marketed for sale, nor can promoters collect booking advances or earnest money, prior to the issuance of an official RERA registration certificate.
                </p>
                <p>
                  Naani Projects maintains strict transparency: all unit dimensions, sanctioned layout plans, exact pricing, and handover milestones will be updated on this page immediately upon formal notification and verification through <a href="https://rera.telangana.gov.in" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300">rera.telangana.gov.in</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION H: BUYER ADVISORY */}
        <section id="buyer-advisory" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Buyer Protection Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Naani Real Estate Advisory: Guidance for Prospective Buyers
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Essential consumer precautions to observe when tracking pre-launch or early-stage residential developments in Telangana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Wait for Official RERA Registration</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Never transfer booking tokens or advances based on informal sales circulars or unapproved marketing briefs. Ensure the project possesses an active TG RERA number before executing any binding agreement.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Verify Approved Building Plans</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Check apartment dimensions against the sanctioned municipal layout approved by HMDA/GHMC rather than preliminary marketing brochures. Sanctioned plans confirm exact setbacks, parking allocations, and carpet areas.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Conduct Independent Title Diligence</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prospective buyers should review the registered Joint Development Agreement (JDA), revenue records, and encumbrance certificates (EC) with an independent legal advisor prior to entering into sale agreements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION I: FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Buyer Knowledge Base
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Frequently Asked Questions — Brigade Kompally
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Factual, verified answers reflecting the current pre-launch and regulatory status.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
                        openFaq === idx ? "rotate-180 text-amber-400" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: LEAD CAPTURE / NOTIFICATION FORM */}
        <section id="enquiry-section" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Pre-Launch Notification Desk
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Register for Official Launch Updates
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
                  Receive direct notifications when TG RERA registration is confirmed, sanctioned floor plans are released, and official developer bookings open.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Registration Confirmed</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, {formData.name}. You are registered for Brigade Kompally launch updates. Our advisory desk will notify you immediately once official RERA approvals are granted.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Configuration</label>
                      <select
                        value={formData.configuration}
                        onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option value="2 BHK (Planned)">2 BHK (Planned)</option>
                        <option value="3 BHK (Planned)">3 BHK (Planned)</option>
                        <option value="4 BHK (Planned)">4 BHK (Planned)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-slate-300">
                          Target Budget Preference (Optional)
                        </label>
                        <span className="text-[11px] text-amber-400/80">Pricing unannounced</span>
                      </div>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option value="">Select your preferred range (Optional)</option>
                        <option value="1 Cr - 1.5 Cr">₹1.00 Cr – ₹1.50 Cr</option>
                        <option value="1.5 Cr - 2 Cr">₹1.50 Cr – ₹2.00 Cr</option>
                        <option value="2 Cr - 2.5 Cr">₹2.00 Cr – ₹2.50 Cr</option>
                        <option value="2.5 Cr - 3.5 Cr">₹2.50 Cr – ₹3.50 Cr</option>
                        <option value="Above 3.5 Cr">Above ₹3.50 Cr</option>
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Indicate your target budget preference. Official developer apartment prices will be announced post-RERA sanction.
                      </p>
                    </div>
                  </div>

                  {/* Explicit Consent Checkbox (Privacy Discipline) */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                      />
                      <span>
                        I authorize Naani Projects to record my contact details (stored securely via Google Sheets integration) and contact me via Phone, SMS, or WhatsApp solely to share verified project updates, regulatory approvals, and official launch announcements for Brigade Kompally. My details will not be sold or distributed to third-party marketing brokers.
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                    >
                      {submitting ? "Registering Alert..." : "Notify Me When Official Details Are Released"}
                    </button>
                  </div>

                  <div className="pt-2 text-center text-[11px] text-slate-400">
                    Naani Projects is an independent advisory and property discovery platform. We do not solicit or accept booking tokens or advances for unapproved projects. Submitted information is processed solely for requested notifications in accordance with our <Link to="/privacy-policy" className="text-amber-400 underline hover:text-amber-300">Privacy Policy</Link>.
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* SIMILAR NORTH HYDERABAD PROJECTS */}
        <section className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Explore Options</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Similar Residential Communities</h3>
              </div>
              <Link to="/projects-in-kompally" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                <span>View All Kompally Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Link to="/projects/sunyuga-vantara" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Kompally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Sunyuga Vantara</div>
                <div className="text-xs text-slate-400 mt-0.5">6.5 Acres · TG RERA P02200009418 · 33k Sft Club</div>
              </Link>
              <Link to="/projects/aparna-serenity" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Kompally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Aparna Serenity</div>
                <div className="text-xs text-slate-400 mt-0.5">22.45 Acres · G+9 Floors · 1,499 Units</div>
              </Link>
              <Link to="/projects/brigade-gateway-neopolis-kokapet-hyderabad" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Kokapet</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Brigade Gateway Neopolis</div>
                <div className="text-xs text-slate-400 mt-0.5">9.7 Acres · Ultra-Luxury G+57/60 Towers</div>
              </Link>
              <Link to="/projects/urbanrise-on-cloud-33-bachupally" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Bachupally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Urbanrise On Cloud 33</div>
                <div className="text-xs text-slate-400 mt-0.5">9.16 Acres · 33 Floors · Moroccan Club</div>
              </Link>
            </div>
          </div>
        </section>

        {/* MOBILE STICKY ACTION BAR */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2.5 px-4 shadow-2xl flex items-center justify-between gap-3">
          <a
            href="tel:+919493943946"
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call</span>
          </a>
          <a
            href="https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Brigade%20Kompally.%20Please%20share%20project%20updates%20when%20released."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <a
            href="#enquiry-section"
            className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Get Updates</span>
          </a>
        </div>
      </div>
    </>
  );
}
