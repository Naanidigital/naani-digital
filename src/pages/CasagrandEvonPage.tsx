import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  MessageCircle,
  FileText,
  Compass,
  ArrowRight,
  ChevronDown,
  Check,
  Copy,
  Award,
  ExternalLink,
  Info,
  Clock,
  TreePine,
  Dumbbell,
  Users,
  CheckCircle2,
  Share2,
  Landmark,
  ShieldAlert,
  FileCheck2,
  Maximize2
} from "lucide-react";
import { sendLeadToSheet, detectPageContext } from "@/lib/leadProfile";

// Assets
import elevationRender from "@/assets/casagrand-evon/casagrand-evon-elevation-day.webp";

// Centralized Data Baseline
import {
  CASAGRAND_EVON_PROJECT,
  CASAGRAND_EVON_CONFIGURATIONS,
  CASAGRAND_EVON_AMENITIES,
  CASAGRAND_EVON_FAQS
} from "@/data/casagrandEvonData";

export default function CasagrandEvonPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedRera, setCopiedRera] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [selectedConfig, setSelectedConfig] = useState<"3 BHK" | "4 BHK">("3 BHK");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    configuration: "3 BHK (2,075 – 2,080 SFT Developer-Advertised SBA)",
    budgetRange: "",
    consent: false
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleCopyRera = () => {
    navigator.clipboard.writeText(CASAGRAND_EVON_PROJECT.tgReraNumber);
    setCopiedRera(true);
    setTimeout(() => setCopiedRera(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(CASAGRAND_EVON_PROJECT.canonicalUrl);
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
      alert("Please confirm your consent to receive requested project information.");
      return;
    }

    setSubmitting(true);
    try {
      const pageCtx = detectPageContext({
        propertyName: CASAGRAND_EVON_PROJECT.name,
        projectName: CASAGRAND_EVON_PROJECT.name,
        builderName: CASAGRAND_EVON_PROJECT.developer,
        location: "Kompally",
        propertyType: "Apartment",
        pageUrl: window.location.href
      });

      await sendLeadToSheet({
        profile: {
          name: formData.name,
          phone: formData.phone,
          lookingFor: formData.configuration.includes("4 BHK") ? "4 BHK" : "3 BHK",
          budget: formData.budgetRange ? (formData.budgetRange as any) : undefined,
          capturedAt: new Date().toISOString()
        },
        context: pageCtx,
        leadSource: `Casagrand Evon Page Form (${formData.configuration}) [Budget Interest: ${formData.budgetRange || "Not Specified"}] [Consent Given: true]`
      });

      setFormSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Casagrand Evon Kompally | 3 &amp; 4 BHK Japanese-Themed Luxury Apartments</title>
        <meta
          name="description"
          content="Explore Casagrand Evon in Kompally, North Hyderabad. 6.84-acre Japanese-themed gated community with 579 luxury 3 &amp; 4 BHK apartments, 34,860 SFT clubhouse. TG RERA P02200009350."
        />
        <link rel="canonical" href={CASAGRAND_EVON_PROJECT.canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:title" content="Casagrand Evon Kompally | 3 &amp; 4 BHK Japanese-Themed Luxury Apartments" />
        <meta
          property="og:description"
          content="Explore Casagrand Evon in Kompally, North Hyderabad. 6.84-acre Japanese-themed gated community with 579 luxury 3 &amp; 4 BHK apartments, 34,860 SFT clubhouse. TG RERA P02200009350."
        />
        <meta property="og:url" content={CASAGRAND_EVON_PROJECT.canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.naani.in/og-casagrand-evon.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Casagrand Evon Kompally | 3 &amp; 4 BHK Japanese-Themed Luxury Apartments" />
        <meta
          name="twitter:description"
          content="Explore Casagrand Evon in Kompally, North Hyderabad. 6.84-acre Japanese-themed gated community with 579 luxury 3 &amp; 4 BHK apartments, 34,860 SFT clubhouse. TG RERA P02200009350."
        />
        <meta name="twitter:image" content="https://www.naani.in/og-casagrand-evon.jpg" />

        {/* Schema.org BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
              { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
              { "@type": "ListItem", "position": 3, "name": "Kompally", "item": "https://www.naani.in/projects-in-kompally" },
              { "@type": "ListItem", "position": 4, "name": "Casagrand Evon", "item": CASAGRAND_EVON_PROJECT.canonicalUrl }
            ]
          })}
        </script>

        {/* Schema.org RealEstateListing / ApartmentComplex */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            "name": CASAGRAND_EVON_PROJECT.name,
            "url": CASAGRAND_EVON_PROJECT.canonicalUrl,
            "description": "Japanese-inspired luxury residential gated community by Casagrand across approximately 6.84 acres in Kompally, North Hyderabad. Comprising 579 apartments across 3 towers of 2B+G+11 floors, featuring 3 & 4 BHK residences and a ~34,860 SFT resident clubhouse. Officially sanctioned under TG RERA P02200009350.",
            "provider": {
              "@type": "Organization",
              "name": CASAGRAND_EVON_PROJECT.developer,
              "legalName": CASAGRAND_EVON_PROJECT.promoterLegalEntity,
              "url": CASAGRAND_EVON_PROJECT.developerOfficialUrl
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kompally",
              "addressRegion": CASAGRAND_EVON_PROJECT.state,
              "postalCode": CASAGRAND_EVON_PROJECT.pincode,
              "addressCountry": "IN"
            }
          })}
        </script>

        {/* Schema.org FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": CASAGRAND_EVON_FAQS.map((f) => ({
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

      <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-amber-500 selection:text-slate-950 pt-[76px] lg:pt-[80px] pb-20 lg:pb-12">
        {/* 1. TOP STATUS BAR & REGULATORY SUMMARY */}
        <section className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-[76px] lg:top-[80px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <span>/</span>
              <Link to="/projects-in-kompally" className="hover:text-amber-400 transition-colors">Kompally</Link>
              <span>/</span>
              <span className="text-amber-400 font-medium">Casagrand Evon</span>
            </nav>

            {/* Regulatory Badges & Share */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>TG RERA: {CASAGRAND_EVON_PROJECT.tgReraNumber}</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                <span>HMDA Sanction: {CASAGRAND_EVON_PROJECT.hmdaApprovalNumber}</span>
              </div>

              <button
                onClick={handleCopyRera}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                title="Copy TG RERA Number"
              >
                {copiedRera ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copiedRera ? "Copied" : "Copy RERA"}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copy Project Link"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              {copiedLink && <span className="text-[11px] text-emerald-400">Link Copied!</span>}
            </div>
          </div>
        </section>

        {/* 2. HERO SECTION */}
        <section className="relative pt-8 pb-14 lg:py-16 overflow-hidden border-b border-slate-800/80">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-emerald-500/5 to-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Badge & Title */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Japanese-Inspired Luxury Living · North Hyderabad</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Casagrand Evon Kompally – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Japanese-Themed 3 &amp; 4 BHK Luxury Residences</span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
                An expansive 6.84-acre gated residential sanctuary in Kompally, North Hyderabad, featuring 579 luxury apartments across 3 high-rise towers of 2 basements, ground floor, and 11 upper floors (2B + G + 11). Centered around a grand ~34,860 SFT luxury clubhouse and serene Japanese landscape courtyards. Officially sanctioned under TG RERA Registration Number <strong className="text-white">P02200009350</strong>.
              </p>
            </div>

            {/* Hero Grid: Visual Elevation Frame + Key Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Architectural Elevation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl group">
                  <img
                    src={elevationRender}
                    alt="Casagrand Evon Kompally modern architectural facade and Japanese-themed clubhouse render"
                    className="w-full h-auto object-cover aspect-[16/9] transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20 pointer-events-none" />

                  {/* Top Floating Badge (Visible on Tablet & Desktop) */}
                  <div className="hidden sm:flex absolute top-4 left-4 right-4 items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      Architectural Elevation · Modern Japanese Facade
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>Kompally, Hyderabad</span>
                    </span>
                  </div>

                  {/* Bottom Caption Overlay (Visible on Tablet and Desktop) */}
                  <div className="hidden sm:block absolute bottom-4 left-4 right-4 text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800/80">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>3 Towers (2B + G + 11 Floors) &amp; Grand ~34,860 SFT Clubhouse</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Conceptual developer rendering illustrating contemporary glass-fronted clubhouse and Zen courtyard gardens.
                    </p>
                  </div>
                </div>

                {/* Mobile Caption Card (Clean spacing below image on small screens) */}
                <div className="sm:hidden p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>3 Towers (2B + G + 11 Floors) &amp; ~34,860 SFT Clubhouse</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Conceptual developer rendering illustrating contemporary glass-fronted clubhouse and Zen courtyard gardens.
                  </p>
                </div>

                {/* Verification Disclaimers */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Statutory Sanction Verified</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Promoter: <strong>Casagrand Hyderwise Private Limited</strong> · TG RERA Certificate: <strong>P02200009350</strong> (Valid through June 18, 2030) · HMDA Permission: <strong>013326/BP/HMDA/2977/MED/2023</strong>.
                  </p>
                </div>
              </div>

              {/* Right Column: Key Parameter Cards & Action Buttons */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Project Snapshot</span>
                      <h3 className="text-lg font-bold text-white">Verified Specifications</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      Under Construction
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <span className="text-slate-400 block text-[11px]">Land Extent</span>
                      <span className="text-white font-extrabold text-base mt-0.5 block">6.84 Acres</span>
                      <span className="text-[10px] text-slate-500">TG RERA Sanctioned</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <span className="text-slate-400 block text-[11px]">Total Scale</span>
                      <span className="text-white font-extrabold text-base mt-0.5 block">579 Units</span>
                      <span className="text-[10px] text-slate-500">Across 3 Towers</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <span className="text-slate-400 block text-[11px]">Tower Elevation</span>
                      <span className="text-white font-extrabold text-base mt-0.5 block">2B + G + 11</span>
                      <span className="text-[10px] text-slate-500">2 Basements + 11 Floors</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <span className="text-slate-400 block text-[11px]">Grand Clubhouse</span>
                      <span className="text-white font-extrabold text-base mt-0.5 block">~34,860 SFT</span>
                      <span className="text-[10px] text-slate-500">Multi-Level Lifestyle</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <span className="text-slate-400 block text-[11px]">Typologies</span>
                      <span className="text-white font-extrabold text-base mt-0.5 block">3 &amp; 4 BHK</span>
                      <span className="text-[10px] text-slate-500">2,075 – 2,850 SFT (Developer SBA)</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <span className="text-slate-400 block text-[11px]">RERA Completion</span>
                      <span className="text-emerald-400 font-extrabold text-base mt-0.5 block">June 18, 2030</span>
                      <span className="text-[10px] text-slate-500">Target: Early 2029</span>
                    </div>
                  </div>

                  {/* Pricing Overview */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-amber-300 font-semibold">Pricing Status</span>
                      <span className="text-[11px] text-slate-400">Official Price Sheet</span>
                    </div>
                    <div className="text-base font-extrabold text-white mt-1">
                      Pricing Upon Request
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Direct developer price sheets provided upon consultation. We do not publish historical or speculative launch rates.
                    </p>
                  </div>

                  {/* Action CTAs */}
                  <div className="space-y-2.5 pt-1">
                    <a
                      href="#enquiry-section"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Enquire for Unit Availability &amp; Floor Plans</span>
                    </a>

                    <a
                      href="https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Casagrand%20Evon%20Kompally.%20Please%20share%20verified%20project%20details."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Project Details</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROJECT OVERVIEW & JAPANESE LANDSCAPE THEME */}
        <section id="overview" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Concept &amp; Community Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Japanese-Inspired Architecture in North Hyderabad
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Casagrand Evon represents a distinct design philosophy in Kompally’s residential landscape. Designed across approximately 6.84 acres, the community integrates traditional Japanese landscape principles with contemporary high-rise luxury. The community is orchestrated into three residential towers offering an exclusive low-density feel with 579 residences.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  The landscape master plan weaves Zen courtyards, shaded pergola corridors, water elements, and sculpted green zones around the central residential towers. This provides peaceful natural transitions between resident homes and recreational zones.
                </p>

                {/* Editorial Accuracy Callout */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 mt-4 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span>Editorial Standards Note on Open Space</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    In accordance with Naani Projects verification standards, the community features landscaped open spaces with Japanese garden themes, awaiting formal statutory municipal landscape clearance before stating definitive area percentages.
                  </p>
                </div>
              </div>

              {/* Overview Highlights Card */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Community Highlights
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <TreePine className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white block">Zen Garden Elements</strong>
                        <span>Contemplative rock arrangements, shaded pavilions, and lush pedestrian pathways.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <Building2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white block">High-Rise Elegance</strong>
                        <span>3 Towers configured as 2 Basements + Ground + 11 Upper Floors.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <Dumbbell className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white block">34,860 SFT Clubhouse</strong>
                        <span>Multi-level lifestyle clubhouse dedicated to resident wellness, fitness, and celebrations.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONFIGURATIONS & RESIDENTIAL SIZES */}
        <section id="configurations" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Floor Plans &amp; Typologies
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Planned 3 &amp; 4 BHK Apartment Configurations
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Casagrand Evon offers large-format residences suited for modern family living in Kompally. Floor plates emphasize spacious living, dining, and private bedroom suites.
              </p>
            </div>

            {/* Typology Toggle Tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setSelectedConfig("3 BHK")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedConfig === "3 BHK"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                3 BHK Residences (2,075 – 2,080 SFT Developer-Advertised SBA)
              </button>
              <button
                onClick={() => setSelectedConfig("4 BHK")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedConfig === "4 BHK"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                4 BHK Residences (2,850 SFT Developer-Advertised SBA)
              </button>
            </div>

            {/* Configuration Detail Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {CASAGRAND_EVON_CONFIGURATIONS.filter(c => c.typology === selectedConfig).map((cfg, idx) => (
                <React.Fragment key={idx}>
                  <div className="lg:col-span-7 space-y-5">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-5 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                        <div>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Configuration Details</span>
                          <h3 className="text-2xl font-extrabold text-white">{cfg.typology} Luxury Apartment</h3>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-sm">
                          {cfg.superBuiltUpAreaRange}
                        </div>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {cfg.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Sanctioned Parameters
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {cfg.verifiedFeatures.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Unit Area & Sanctioned Plan Disclaimer */}
                      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-200 block">Unit Area &amp; Sanctioned Plan Disclaimer</strong>
                          <span>The quoted dimensions (2,075–2,080 SFT for 3 BHK and 2,850 SFT for 4 BHK) represent developer-advertised super built-up areas and must not be construed as carpet areas. Actual unit areas and sanctioned plans must be confirmed with the developer.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floor Plan Placeholder & Request Action */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-8 text-center space-y-4 flex flex-col justify-center items-center min-h-[320px]">
                      <div className="p-4 rounded-2xl bg-slate-800/60 text-amber-400">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Official Floor Plans Releasing Soon</h4>
                        <p className="text-xs text-slate-400 max-w-xs mt-1">
                          Detailed CAD floor plates and wing orientation layouts for {cfg.typology} residences are in final documentation.
                        </p>
                      </div>
                      <a
                        href="#enquiry-section"
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Register for Priority Floor Plan PDF</span>
                      </a>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CURATED AMENITIES */}
        <section id="amenities" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Lifestyle &amp; Recreation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Curated Resident Amenities &amp; Infrastructure
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Casagrand Evon incorporates both lifestyle conveniences and vital municipal utility systems. Each feature below has been cross-referenced with developer announcements and sanctioned filings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASAGRAND_EVON_AMENITIES.map((group, gIdx) => (
                <div key={gIdx} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white">{group.category}</h3>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                      group.source === "rera-sanction"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                    }`}>
                      {group.source === "rera-sanction" ? "Sanctioned Utility" : "Developer Lifestyle Facility"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {group.amenities.map((item, iIdx) => (
                      <div key={iIdx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 text-xs">
                        <div className="font-semibold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <p className="text-slate-400 mt-1 leading-relaxed pl-5.5">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. LOCATION & TRANSIT CONNECTIVITY */}
        <section id="location" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Micro-Market Profile
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Kompally, North Hyderabad: Strategic Connectivity
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Situated in Medchal-Malkajgiri District along the NH-44 highway corridor, Kompally combines tranquil suburban living with swift highway transit to Secunderabad, Suchitra, and the Nehru Outer Ring Road.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Transit & Arterial Links */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Road &amp; Expressway Access</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>NH-44 Corridor:</strong> Direct connectivity to Suchitra Circle, Bowenpally, and Secunderabad railway station.</li>
                  <li>• <strong>Nehru ORR Exit 6 (Kandlakoya):</strong> Swift access to Financial District, Gachibowli, and Rajiv Gandhi International Airport.</li>
                  <li>• <strong>Dullapally &amp; Gundlapochampally Road Network:</strong> Local thoroughfares linking residential neighborhoods and green reserves.</li>
                </ul>
              </div>

              {/* Schools & Healthcare */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>Schools &amp; Healthcare Hubs</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>Educational Institutions:</strong> DRS International School, Delhi World Public School (DWPS), Suchitra Academy, and St. Ann's High School.</li>
                  <li>• <strong>Healthcare Centers:</strong> Russh Super Speciality Hospital, Narayana Multispeciality Hospital, KIMS Hospital, and Surekha Hospital.</li>
                </ul>
              </div>

              {/* Commercial & Retail */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Retail &amp; Employment Centers</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>Retail &amp; Leisure:</strong> Cineplanet Kompally, D-Mart Kompally, Suchitra retail boulevard, fine dining, and supermarkets.</li>
                  <li>• <strong>Life Sciences Corridor:</strong> Straightforward highway access to Genome Valley (Shamirpet), India's premier biotechnology hub.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. REGULATORY TRANSPARENCY & STATUTORY COMPLIANCE */}
        <section id="regulatory" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Statutory Transparency &amp; RERA Sanction
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    Official TG RERA Registration: P02200009350
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-emerald-500/20 pt-4">
                <p>
                  Casagrand Evon is officially registered with the <strong>Telangana Real Estate Regulatory Authority (TG RERA)</strong> under Registration Certificate Number <strong>P02200009350</strong>. The statutory completion date recorded on the official certificate is <strong>June 18, 2030</strong>.
                </p>
                <p>
                  The registered promoter entity under RERA filings is <strong>Casagrand Hyderwise Private Limited</strong>. Municipal planning approval has been sanctioned by the Hyderabad Metropolitan Development Authority under Permit Number <strong>013326/BP/HMDA/2977/MED/2023</strong>.
                </p>
                <p>
                  <strong>Possession Timeline Notice:</strong> While developer promotional literature references an indicative handover milestone of early 2029, Naani Projects explicitly advises prospective buyers that this represents an internal target and not a statutory contractual guarantee. The legally binding project completion date under Telangana RERA is June 18, 2030.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={CASAGRAND_EVON_PROJECT.tgReraPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify on TG RERA Portal (rerait.telangana.gov.in)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. PRICING & INVESTMENT ADVISORY */}
        <section id="pricing" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Investment Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pricing Upon Official Request
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Unit pricing at Casagrand Evon varies according to unit typology (3 BHK vs 4 BHK), floor-rise considerations, and facing premiums. In compliance with strict real estate publication ethics, Naani Projects does not quote historic or unverified promotional rates.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-xl mx-auto">
              To review current developer inventory, payment milestone schedules, and authorized unit cost sheets, register your details with our verified advisory desk below.
            </div>

            <div className="pt-2">
              <a
                href="#enquiry-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all"
              >
                <span>Request Current Price Sheet &amp; Cost Breakup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 9. LEAD CAPTURE & ADVISORY REGISTRATION */}
        <section id="enquiry-section" className="py-16 border-b border-slate-800/80 bg-[#080d1a]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Verified Project Desk
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Enquire for Casagrand Evon Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
                  Receive verified project specifications, sanctioned floor plates, and direct developer pricing sheets. We never share your contact details with external third-party brokers.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Enquiry Received</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, {formData.name}. Your enquiry for Casagrand Evon Kompally has been recorded. Our property advisor will reach out to share verified floor plans and pricing information.
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
                        placeholder="e.g. Anand Sharma"
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
                        <option value="3 BHK (2,075 – 2,080 SFT Developer SBA)">3 BHK (2,075 – 2,080 SFT Developer-Advertised SBA)</option>
                        <option value="4 BHK (2,850 SFT Developer SBA)">4 BHK (2,850 SFT Developer-Advertised SBA)</option>
                        <option value="Both 3 & 4 BHK">Both 3 &amp; 4 BHK</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-slate-300">
                          Target Budget Range (Optional)
                        </label>
                        <span className="text-[11px] text-amber-400/80">Pricing Upon Request</span>
                      </div>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option value="">Select your preferred range (Optional)</option>
                        <option value="1.25 Cr - 1.75 Cr">₹1.25 Cr – ₹1.75 Cr</option>
                        <option value="1.75 Cr - 2.25 Cr">₹1.75 Cr – ₹2.25 Cr</option>
                        <option value="2.25 Cr - 3.00 Cr">₹2.25 Cr – ₹3.00 Cr</option>
                        <option value="Above 3.00 Cr">Above ₹3.00 Cr</option>
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Indicate your target budget. Exact unit costs depend on selected floor rise and facing.
                      </p>
                    </div>
                  </div>

                  {/* Explicit Privacy & Contact Consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                      />
                      <span>
                        I authorize Naani Projects to record my contact details and contact me via Phone, SMS, or WhatsApp solely to share verified project information, sanctioned floor plans, and pricing for Casagrand Evon. My data will not be shared with external brokers.
                      </span>
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                    >
                      {submitting ? "Submitting Request..." : "Request Floor Plans & Price Sheet"}
                    </button>
                  </div>

                  <div className="pt-2 text-center text-[11px] text-slate-400">
                    Naani Projects is an independent real estate advisory and discovery platform. Submitted information is processed solely for requested project enquiries in accordance with our <Link to="/privacy-policy" className="text-amber-400 underline hover:text-amber-300">Privacy Policy</Link>.
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 10. FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" className="py-16 border-b border-slate-800/80 bg-[#070b14]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Buyer Knowledge Base
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Frequently Asked Questions — Casagrand Evon
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Factual, regulatory-verified answers for prospective homeowners.
              </p>
            </div>

            <div className="space-y-3">
              {CASAGRAND_EVON_FAQS.map((faq, idx) => (
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

        {/* 11. SIMILAR NORTH HYDERABAD PROJECTS */}
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
              <Link to="/projects/brigade-kompally" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Kompally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Brigade Kompally</div>
                <div className="text-xs text-slate-400 mt-0.5">5.6 Acres · 2, 3 &amp; 4 BHK High-Rise</div>
              </Link>
              <Link to="/projects/urbanrise-on-cloud-33-bachupally" className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-amber-400/40 transition-all group">
                <div className="text-xs text-amber-400 font-bold uppercase">Bachupally</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">Urbanrise On Cloud 33</div>
                <div className="text-xs text-slate-400 mt-0.5">9.16 Acres · 33 Floors · Moroccan Club</div>
              </Link>
            </div>
          </div>
        </section>

        {/* 12. MOBILE STICKY ACTION BAR */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-2.5 px-4 shadow-2xl flex items-center justify-between gap-3">
          <a
            href="tel:+919493943946"
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call</span>
          </a>
          <a
            href="https://wa.me/919493943946?text=Hi%20Naani%20Projects%2C%20I%20am%20interested%20in%20Casagrand%20Evon%20Kompally.%20Please%20share%20verified%20project%20details."
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </>
  );
}
