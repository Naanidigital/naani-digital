import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import TrumpTowersLeadPopup, { TrumpPopupType } from "@/components/trump-towers/TrumpTowersLeadPopup";
import {
  Phone,
  MessageSquare,
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  X,
  ZoomIn,
  Download,
  Sparkles,
  ExternalLink,
  Award,
  Info,
  ChevronRight,
  Eye,
  FileText,
  Compass,
} from "lucide-react";

// Official Uploaded Trump Towers Hyderabad Asset Imports
import heroImage from "@/assets/trump-towers/hero.jpg";
import elevationUpwardImage from "@/assets/trump-towers/elevation-upward.jpg";
import elevationDiagramImage from "@/assets/trump-towers/elevation-diagram.png";
import entranceImage from "@/assets/trump-towers/entrance.png";
import logoCardImage from "@/assets/trump-towers/logo-card.png";

const PROJECT_NAME = "Trump Towers Hyderabad";
const DEVELOPER_NAME = "Ira The Edge Developers LLP";
const BRAND_PARTNER = "Tribeca Developers";
const RERA_NO = "TG RERA P02400010871";
const HMDA_NO = "2128/HMDA/SWBP/2026 (RERA)";
const RERA_COMPLETION_DATE = "15 May 2031";
const LOCATION_NAME = "Golden Mile, Kokapet, Hyderabad";
const SITE_ADDRESS = "Golden Mile, Kokapet, Gandipet Mandal, Hyderabad, Telangana – 500075";
const PHONE_NUMBER = "9705080909";
const CANONICAL_URL = "https://www.naani.in/projects/trump-towers-hyderabad-kokapet";

const TrumpTowersHyderabadPage: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<TrumpPopupType>("price_request");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openPopup = (type: TrumpPopupType) => {
    setPopupType(type);
    setPopupOpen(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hi, I am interested in Trump Towers Hyderabad in Golden Mile, Kokapet. Please share current availability, floor plans, and pricing details."
    );
    window.open(`https://wa.me/91${PHONE_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      <SEOHead
        title="Trump Towers Hyderabad Kokapet | Luxury Branded Residences"
        description="Explore Trump Towers Hyderabad in Kokapet's Golden Mile. Discover 65-storey twin towers, private elevators, large-format residences, the three-level Trump Club and West Hyderabad connectivity."
        canonicalUrl={CANONICAL_URL}
        ogImage="https://www.naani.in/assets/trump-towers/hero.jpg"
      />

      {/* Floating Header */}
      <ProjectsHeader />

      {/* Sticky Bottom Lead CTA Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B101D]/95 backdrop-blur-lg border-t border-amber-500/30 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-2">
        <a
          href={`tel:+91${PHONE_NUMBER}`}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call 9705080909</span>
        </a>
        <button
          onClick={handleWhatsApp}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>
        <button
          onClick={() => openPopup("price_request")}
          className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 shadow-lg shadow-amber-500/20"
        >
          <span>Get Price</span>
        </button>
      </div>

      <main className="pt-16 sm:pt-20">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 lg:py-20">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Trump Towers Hyderabad twin towers architectural elevation in Golden Mile Kokapet"
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A11] via-[#070A11]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A11]/90 via-[#070A11]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide uppercase">
                Ultra-Luxury Branded Residential Landmark
              </span>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Trump Towers Hyderabad, <span className="text-amber-400">Kokapet</span> – Ultra-Luxury Branded Residences
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-200">
                Ultra-Luxury Branded Residences in Kokapet's Golden Mile
              </p>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-3xl">
                A landmark twin-tower residential development rising up to 65 storeys, combining expansive residences, private elevators, private decks and a three-level floating Trump Club in one of West Hyderabad's premium residential corridors.
              </p>
            </div>

            {/* Fact Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl pt-2">
              <div className="bg-[#0B101D]/90 border border-amber-500/20 p-3.5 rounded-2xl backdrop-blur-md text-center">
                <span className="block text-xl font-black text-amber-400">Up to 65 Storeys</span>
                <span className="text-xs text-slate-400 font-medium">Vertical Skyline Icon</span>
              </div>
              <div className="bg-[#0B101D]/90 border border-amber-500/20 p-3.5 rounded-2xl backdrop-blur-md text-center">
                <span className="block text-xl font-black text-amber-400">Approx. 4.04 Acres</span>
                <span className="text-xs text-slate-400 font-medium">Master-Planned Site</span>
              </div>
              <div className="bg-[#0B101D]/90 border border-amber-500/20 p-3.5 rounded-2xl backdrop-blur-md text-center">
                <span className="block text-xl font-black text-amber-400">2 Towers</span>
                <span className="text-xs text-slate-400 font-medium">Iconic Twin Architecture</span>
              </div>
              <div className="bg-[#0B101D]/90 border border-amber-500/20 p-3.5 rounded-2xl backdrop-blur-md text-center">
                <span className="block text-xl font-black text-amber-400">3.5, 4, 4.5 & 6 BHK</span>
                <span className="text-xs text-slate-400 font-medium">Large-Format Suites</span>
              </div>
              <div className="bg-[#0B101D]/90 border border-amber-500/20 p-3.5 rounded-2xl backdrop-blur-md text-center col-span-2 sm:col-span-1">
                <span className="block text-xl font-black text-emerald-400">P02400010871</span>
                <span className="text-xs text-slate-400 font-medium">Telangana RERA Approved</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openPopup("price_request")}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-base font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Get Current Price</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => openPopup("hero_site_visit")}
                className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-white text-base font-bold px-8 py-4 rounded-2xl border border-slate-700 backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Schedule a Site Visit</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto bg-emerald-600/90 hover:bg-emerald-500 text-white text-base font-bold px-8 py-4 rounded-2xl border border-emerald-500/40 backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp 9705080909</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 italic">
              * Public pricing is available upon private request through Naani Projects. Contact 9705080909 for verified inventory details.
            </p>
          </div>
        </section>

        {/* PROJECT FACT BOX */}
        <section className="py-12 bg-[#0B101D] border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center sm:text-left space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Verified Project Specification</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Trump Towers Hyderabad at a Glance</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#070A11]">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-[#0F1627] text-slate-100 font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Project Detail</th>
                    <th className="py-4 px-6">Verified / Current Information</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Project Name</td>
                    <td className="py-3.5 px-6 font-bold text-amber-400">Trump Towers Hyderabad</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Location</td>
                    <td className="py-3.5 px-6">Golden Mile, Kokapet, Hyderabad, Telangana – 500075</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Developer / Promoter</td>
                    <td className="py-3.5 px-6 font-semibold text-slate-100">Ira The Edge Developers LLP</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Development Partner</td>
                    <td className="py-3.5 px-6 font-semibold text-slate-100">Tribeca Developers</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Project Type</td>
                    <td className="py-3.5 px-6">Ultra-Luxury Branded Residential Development</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Site Area</td>
                    <td className="py-3.5 px-6">16,389.76 sq.m. (Approximately 4.04 Acres)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Towers & Elevation</td>
                    <td className="py-3.5 px-6">2 Iconic Residential Towers (Up to 65 Storeys)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Residential Units</td>
                    <td className="py-3.5 px-6 text-amber-300 font-semibold">
                      [Verify against current RERA certificate]
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Configurations</td>
                    <td className="py-3.5 px-6">3.5, 4, 4.5 & 6 BHK / Sky Duplex Formats</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Residence Sizes</td>
                    <td className="py-3.5 px-6">Approx. 3,600 to 12,000 sq.ft. (subject to inventory plan verification)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Telangana RERA Reg. No.</td>
                    <td className="py-3.5 px-6 font-mono font-bold text-emerald-400">P02400010871</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">RERA Completion Date</td>
                    <td className="py-3.5 px-6 font-semibold text-amber-300">15 May 2031</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">HMDA / Permit No.</td>
                    <td className="py-3.5 px-6 font-mono">2128/HMDA/SWBP/2026 (RERA)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-6 font-semibold text-white">Public Pricing</td>
                    <td className="py-3.5 px-6 font-bold text-amber-400">
                      Contact 9705080909 for current private pricing & inventory
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400">
              Note: Residential unit counts reported across third-party sources vary between 448 and 460. Buyers must verify exact approved inventory count against the official RERA certificate.
            </p>
          </div>
        </section>

        {/* DETAILED PROJECT OVERVIEW */}
        <section className="py-16 md:py-24 bg-[#070A11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-4xl space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
                Comprehensive Project Overview
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Branded Luxury Redefined in Kokapet's Golden Mile
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Trump Towers Hyderabad brings a global branded-residential concept to Kokapet's Golden Mile, placing a highly amenity-rich luxury development within West Hyderabad's premium residential corridor.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
                <p>
                  Spanning approximately 4.04 acres (16,389.76 sq.m.), Trump Towers Hyderabad features two iconic 65-storey residential towers designed to command an unmistakable presence on West Hyderabad's skyline. Developed by Ira The Edge Developers LLP in partnership with Tribeca Developers, the project introduces a high-elevation architectural form paired with large-format 3.5, 4, 4.5, and 6 BHK residences ranging from approximately 3,600 sq.ft. to 12,000 sq.ft.
                </p>
                <p>
                  Every residence is conceived around maximum privacy and grand living proportions. Highlights include dedicated private elevator entry directly into individual apartments, expansive floor-to-ceiling double-glazed window walls, private outdoor decks with panoramic vistas over the Golden Mile, and meticulously engineered room layouts designed for high-end bespoke interior customization.
                </p>
                <p>
                  At the heart of the development is the signature Three-Level Floating Trump Club—a cantilevered sky-bridge lifestyle venue suspended between the twin towers. This elevated sanctuary brings together an infinity-edge swimming pool, specialty dining restaurant, private cigar lounge, executive business centre, full-service spa, wellness salons, and dedicated entertainment arcades, creating a hospitality-grade residential experience reserved exclusively for homeowners.
                </p>
                <p>
                  Situated in the Golden Mile corridor of Kokapet, Trump Towers Hyderabad enjoys seamless connectivity to Exit 1A of the Nehru Outer Ring Road (ORR), placing the Financial District, Gachibowli, HITEC City, international schools, specialty healthcare, and Rajiv Gandhi International Airport within effortless driving reach.
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => openPopup("brochure_request")}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-amber-500/10"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Project E-Brochure</span>
                  </button>
                  <button
                    onClick={() => openPopup("callback_request")}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl border border-slate-700 transition flex items-center gap-2 text-sm"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Talk to Property Advisor</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
                  <img
                    src={elevationUpwardImage}
                    alt="Trump Towers Hyderabad twin towers low angle view showing skybridge and sun flare"
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0B101D]/90 backdrop-blur-md rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Artist's Impression</p>
                    <p className="text-sm font-semibold text-white mt-1">Twin-tower architecture with floating skybridge in Kokapet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT HIGHLIGHTS */}
        <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                Architectural Differentiators
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Signature Project Highlights
              </h2>
              <p className="text-slate-300 text-base">
                Discover the engineering, architectural, and hospitality features that define Trump Towers Hyderabad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Highlight 1 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">1. Landmark Twin Towers</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Dual high-rise residential towers designed with symmetry, striking glass-facade aesthetics, and a central skybridge structure that forms a vertical landmark in Golden Mile, Kokapet.
                </p>
              </div>

              {/* Highlight 2 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">2. Up to 65 Storeys</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Soaring up to 65 storeys, offering unhindered 180° views across West Hyderabad, Gandipet Lake vistas, and the surrounding Financial District skyline.
                </p>
              </div>

              {/* Highlight 3 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">3. Private Elevator Entry</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Every apartment enjoys private elevator access opening directly into an exclusive foyer, delivering unmatched privacy, security, and prestige for residents.
                </p>
              </div>

              {/* Highlight 4 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">4. Large-Format Homes</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Generous 3,600 to 12,000 sq.ft. residential configurations engineered with grand living spaces, double-height ceilings, and expansive master suites.
                </p>
              </div>

              {/* Highlight 5 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">5. Private Outdoor Decks</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Deep private outdoor balconies integrated into each home, seamlessly extending indoor living rooms into fresh-air relaxation zones with sky views.
                </p>
              </div>

              {/* Highlight 6 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">6. Floor-to-Ceiling Glazing</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  High-performance double-glazed acoustic glass walls that optimize natural daylighting, energy efficiency, and unobstructed panoramic vistas.
                </p>
              </div>

              {/* Highlight 7 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">7. Floating Trump Club</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  A three-level suspended club bridge featuring an infinity pool, private cigar lounge, fine dining restaurant, and luxury health spa elevated high above the ground.
                </p>
              </div>

              {/* Highlight 8 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">8. Branded Concept</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Delivers hospitality-grade residential services, white-glove concierge standards, valet parking, and lifestyle privileges unique to global branded developments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE THREE-LEVEL FLOATING TRUMP CLUB */}
        <section className="py-16 md:py-24 bg-[#070A11] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                  Elevated Lifestyle Sanctuary
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  The Three-Level Floating Trump Club
                </h2>
                <p className="text-base text-slate-300 leading-relaxed">
                  Suspended between the twin towers, the three-level floating Trump Club serves as the epicenter of hospitality, recreation, and business for residents of Trump Towers Hyderabad.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-1">
                    <span className="font-bold text-white text-sm block">Infinity Sky Pool</span>
                    <span className="text-xs text-slate-400">Temperature-controlled pool with panoramic views</span>
                  </div>
                  <div className="p-4 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-1">
                    <span className="font-bold text-white text-sm block">Specialty Restaurant</span>
                    <span className="text-xs text-slate-400">Gourmet dining and private chef services</span>
                  </div>
                  <div className="p-4 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-1">
                    <span className="font-bold text-white text-sm block">Cigar Lounge</span>
                    <span className="text-xs text-slate-400">Exclusive private club atmosphere for socializing</span>
                  </div>
                  <div className="p-4 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-1">
                    <span className="font-bold text-white text-sm block">Executive Business Suite</span>
                    <span className="text-xs text-slate-400">Private meeting rooms & high-tech workspaces</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openPopup("amenity_request")}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <span>Request Trump Club Amenity Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
                  <img
                    src={entranceImage}
                    alt="Trump Towers Hyderabad main entrance facade with gold lettering"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A11] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0B101D]/90 backdrop-blur-md rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Arrival & Entrance</p>
                    <p className="text-sm font-semibold text-white">Grand double-height entrance lobby & valet reception area</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIZED AMENITIES */}
        <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                Comprehensive Lifestyle Offerings
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                World-Class Amenities
              </h2>
              <p className="text-slate-300 text-base">
                Curated across six dedicated zones to cater to fitness, dining, recreation, business, and family lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category 1 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-extrabold text-amber-400 uppercase tracking-wider">Wellness & Fitness</h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>State-of-the-art Gymnasium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Yoga & Meditation Studio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Pilates Training Studio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Luxury Spa & Hydrotherapy Facilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unisex Beauty & Grooming Salon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Temperature-Controlled Swimming Pool</span>
                  </li>
                </ul>
              </div>

              {/* Category 2 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-extrabold text-amber-400 uppercase tracking-wider">Dining & Social</h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Specialty Fine-Dining Restaurant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Private Members' Cigar Lounge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Skydeck Terrace Social Zones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Private Resident Lounges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hospitality Banquet & Event Halls</span>
                  </li>
                </ul>
              </div>

              {/* Category 3 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-extrabold text-amber-400 uppercase tracking-wider">Recreation & Leisure</h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>High-Tech Gaming Arcade & Simulator Room</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Indoor Squash & Badminton Courts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Private Screening Mini-Theater</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Billiards & Cards Room</span>
                  </li>
                </ul>
              </div>

              {/* Category 4 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-extrabold text-amber-400 uppercase tracking-wider">Business & Executive</h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Executive Business Centre</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Private Conference & Board Meeting Rooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Professional Resident Work Suites</span>
                  </li>
                </ul>
              </div>

              {/* Category 5 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-extrabold text-amber-400 uppercase tracking-wider">Children & Family</h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Kids' Club & Activity Centre</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Indoor Soft Play Zone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Outdoor Children's Playground</span>
                  </li>
                </ul>
              </div>

              {/* Category 6 */}
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-extrabold text-amber-400 uppercase tracking-wider">Arrival & Hospitality</h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Double-Height Grand Portico Entrance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Concierge Reception & Waiting Lobbies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Valet & Resident Parking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-Tier Security & CCTV Surveillance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RESIDENCES & CONFIGURATIONS */}
        <section className="py-16 md:py-24 bg-[#070A11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                Exclusive Inventory Options
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Residences Designed Around Space and Privacy
              </h2>
              <p className="text-slate-300 text-base">
                Generous unit layouts featuring private elevator foyers, panoramic decks, and floor-to-ceiling glass walls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 3.5 BHK */}
              <div className="bg-[#0B101D] p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 hover:border-amber-500/40 transition">
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-md">3.5 BHK Residence</span>
                  <h3 className="text-2xl font-extrabold text-white">3.5 BHK Luxury Suite</h3>
                  <p className="text-sm font-semibold text-slate-300">Approx. 3,600 sq.ft. (verify)</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Includes 3 master bedrooms, home office / study nook, private elevator lobby entry, staff quarter, and wide balcony deck.
                  </p>
                </div>
                <button
                  onClick={() => openPopup("floor_plan_request")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-xl border border-slate-700 transition text-sm flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Floor Plan</span>
                </button>
              </div>

              {/* 4 BHK */}
              <div className="bg-[#0B101D] p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 hover:border-amber-500/40 transition">
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-md">4 BHK Residence</span>
                  <h3 className="text-2xl font-extrabold text-white">4 BHK Executive Residence</h3>
                  <p className="text-sm font-semibold text-slate-300">Approx. 4,200 sq.ft. (verify)</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Spacious 4-bedroom plan with dual living areas, private foyer, chef's kitchen, domestic staff suite, and double-height balcony.
                  </p>
                </div>
                <button
                  onClick={() => openPopup("floor_plan_request")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-xl border border-slate-700 transition text-sm flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Floor Plan</span>
                </button>
              </div>

              {/* 4.5 BHK */}
              <div className="bg-[#0B101D] p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 hover:border-amber-500/40 transition">
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-md">4.5 BHK Residence</span>
                  <h3 className="text-2xl font-extrabold text-white">4.5 BHK Sky Residence</h3>
                  <p className="text-sm font-semibold text-slate-300">Approx. 4,800 sq.ft. (verify)</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Expansive 4-bedroom plus family lounge & study, dedicated staff room, dual private decks, and panoramic corner glazing.
                  </p>
                </div>
                <button
                  onClick={() => openPopup("floor_plan_request")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 px-4 rounded-xl border border-slate-700 transition text-sm flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Floor Plan</span>
                </button>
              </div>

              {/* 6 BHK Sky Duplex */}
              <div className="bg-[#0B101D] p-6 rounded-3xl border border-amber-500/30 flex flex-col justify-between space-y-6 hover:border-amber-400 transition shadow-xl">
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-extrabold rounded-md">6 BHK / Sky Duplex</span>
                  <h3 className="text-2xl font-extrabold text-white">6 BHK Presidential Duplex</h3>
                  <p className="text-sm font-bold text-amber-400">Up to Approx. 12,000 sq.ft. (verify)</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ultra-exclusive multi-level sky mansion featuring private internal plunge pool, double-height living room, and 360° skyline views.
                  </p>
                </div>
                <button
                  onClick={() => openPopup("price_request")}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3 px-4 rounded-xl transition text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <span>Check Availability</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center italic">
              * Configuration sizes are based on currently available project information and should be independently verified against the latest floor plans and inventory.
            </p>
          </div>
        </section>

        {/* FLOOR PLANS */}
        <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                Architectural Layouts
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Trump Towers Hyderabad Floor Plans
              </h2>
              <p className="text-slate-300 text-base">
                View architectural elevation diagrams and layout schemes for the twin 65-storey towers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-[#070A11] p-4 rounded-3xl border border-slate-800 space-y-3 relative group">
                <div
                  className="relative overflow-hidden rounded-2xl cursor-pointer bg-white p-2"
                  onClick={() => setSelectedImage(elevationDiagramImage)}
                >
                  <img
                    src={elevationDiagramImage}
                    alt="Trump Towers Hyderabad architectural elevation diagram and line drawing"
                    className="w-full h-80 object-contain mx-auto"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="bg-amber-500 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1">
                      <ZoomIn className="w-4 h-4" />
                      <span>Enlarge Plan</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Artist's Impression</span>
                  <span className="text-xs text-slate-400">Architectural Line Drawing</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Request Official Architectural Layouts</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Detailed 3.5 BHK, 4 BHK, 4.5 BHK, and 6 BHK sky duplex floor plans are available upon private request. Share your preferred configuration to receive exact dimensions, foyer specs, and balcony orientation details directly on WhatsApp or Email.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3.5 bg-[#070A11] rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-200">High-resolution PDF layout sheets with balcony dimensions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 bg-[#070A11] rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-200">Private elevator foyer & service elevator layout plans</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 bg-[#070A11] rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-200">Tower A & Tower B floor orientation diagrams</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => openPopup("floor_plan_request")}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Request Detailed Floor Plan</span>
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition text-sm flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Get on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION & GOLDEN MILE ADVANTAGE */}
        <section className="py-16 md:py-24 bg-[#070A11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-4xl space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
                Prime Kokapet Location
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Trump Towers Hyderabad Location – Golden Mile, Kokapet
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Positioned in Kokapet's Golden Mile, Trump Towers Hyderabad enjoys a prime location in West Hyderabad's high-tech employment corridor.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
                <p>
                  The Golden Mile in Kokapet represents West Hyderabad's most sought-after luxury residential precinct. Strategically planned adjacent to Neopolis and the Financial District, this micro-market has emerged as the address of choice for corporate leaders, technology executives, global entrepreneurs, and high-net-worth families seeking high-rise living with unmatched urban infrastructure.
                </p>
                <p>
                  Trump Towers Hyderabad offers direct connectivity to Exit 1A of the Nehru Outer Ring Road (ORR), placing major IT parks, financial hubs, and commercial centers within quick commuting range:
                </p>
                <ul className="space-y-2 pl-4 list-disc text-slate-200">
                  <li><strong>Financial District (Nanakramguda):</strong> Home to global tech campuses including Amazon, Google, Microsoft, and Waverock.</li>
                  <li><strong>Gachibowli & HITEC City:</strong> Hyderabad's premier IT corridors accessible via ORR and main arterial roads.</li>
                  <li><strong>Neopolis Kokapet:</strong> The mega high-rise commercial and luxury residential hub currently under rapid development.</li>
                  <li><strong>Rajiv Gandhi International Airport (Shamshabad):</strong> Seamless 25-minute drive via the Outer Ring Road express corridor.</li>
                </ul>
                <p>
                  Beyond commercial proximity, the Golden Mile offers an established social ecosystem including premier international schools (Phoenix Greens, Rockwell, Indus), multi-specialty hospitals (Continental, Care), luxury retail centers, and fine-dining destinations.
                </p>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#0B101D] p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span>Location & Travel Time Matrix</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Key destinations around Trump Towers Hyderabad, Golden Mile, Kokapet:
                  </p>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-[#0F1627] text-slate-100 font-bold border-b border-slate-800">
                        <tr>
                          <th className="py-3 px-4">Destination</th>
                          <th className="py-3 px-4 text-right">Distance / Travel Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">ORR Exit 1A (Kokapet)</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">Financial District (Nanakramguda)</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">Gachibowli Circle</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">HITEC City (Cyber Towers)</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">Raidurg Metro Station</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">Rajiv Gandhi Intl. Airport</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">Phoenix Greens Intl. School</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">Continental Hospitals</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-semibold text-white">Inorbit Mall Gachibowli</td>
                          <td className="py-2.5 px-4 text-right font-medium text-amber-400">[Confirm with client]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button
                    onClick={() => openPopup("location_request")}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-3 rounded-xl border border-slate-700 transition text-xs flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Get Detailed Location Map</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPER / BRAND LEGAL STRUCTURE */}
        <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-4xl space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
                Developer & Licensing Structure
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Who Is Developing Trump Towers Hyderabad?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Ira The Edge Developers LLP</h3>
                    <p className="text-xs text-amber-400 font-semibold">Official Project Developer & Promoter</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ira The Edge Developers LLP is the official project developer and promoter registered with Telangana RERA under registration number P02400010871. Ira The Edge Developers LLP owns the project site, secures all municipal approvals, and executes the development.
                </p>
              </div>

              <div className="bg-[#070A11] p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Tribeca Developers</h3>
                    <p className="text-xs text-amber-400 font-semibold">Development & Brand Partner</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tribeca Developers is the official development and brand partner bringing the Trump branded-residential concept to India. Tribeca works alongside the developer to oversee design standards, branded amenity concepts, and marketing execution.
                </p>
              </div>
            </div>

            {/* MANDATORY TRUMP BRAND DISCLAIMER */}
            <div className="p-6 bg-[#070A11] rounded-3xl border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Info className="w-5 h-5 shrink-0" />
                <span>Official Brand Licensing Disclaimer</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Trump Towers Hyderabad is not owned, developed or sold by Donald J. Trump, The Trump Organization or any of their affiliates. Ira The Edge Developers LLP is the developer and promoter of the property and uses the “Trump” name and mark under licence from DT Marks Hyderabad LLC, subject to the applicable agreement.
              </p>
            </div>
          </div>
        </section>

        {/* TELANGANA RERA & LEGAL SECTION */}
        <section className="py-16 md:py-24 bg-[#070A11] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-4xl space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Regulatory Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Trump Towers Hyderabad RERA & Legal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#0B101D] rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 uppercase font-bold block">TG RERA Reg. No.</span>
                <span className="text-xl font-mono font-extrabold text-emerald-400 block">P02400010871</span>
                <span className="text-xs text-slate-400 block">Registered with Telangana RERA Authority</span>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 uppercase font-bold block">RERA Completion Date</span>
                <span className="text-xl font-extrabold text-amber-400 block">15 May 2031</span>
                <span className="text-xs text-slate-400 block">RERA-registered completion target</span>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-3xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 uppercase font-bold block">HMDA / Permit No.</span>
                <span className="text-sm font-mono font-bold text-white block">2128/HMDA/SWBP/2026 (RERA)</span>
                <span className="text-xs text-slate-400 block">HMDA Building Permit Approval</span>
              </div>
            </div>

            <div className="p-6 bg-[#0B101D] rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">Verify RERA Details on Official Portal</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Buyers can verify sanctioned plans, land documents, and registration records directly on the Telangana RERA website.
                  </p>
                </div>
                <a
                  href="https://rera.telangana.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-1.5 transition"
                >
                  <span>Open Telangana RERA Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                Buyers should independently verify the project's registration, sanctioned plans, specifications, payment schedules, possession commitments and other legal information through the official Telangana RERA record before making a purchase decision.
              </p>
            </div>
          </div>
        </section>

        {/* INVESTMENT & BUYER CONSIDERATIONS */}
        <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-4xl space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
                End-User & Market Evaluation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Why Buyers May Consider Trump Towers Hyderabad
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-[#070A11] rounded-3xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">1. Prime Golden Mile Address</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Kokapet's Golden Mile is West Hyderabad's premier luxury high-rise enclave, positioned adjacent to Financial District tech campuses.
                </p>
              </div>

              <div className="p-6 bg-[#070A11] rounded-3xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">2. Branded Residential Positioning</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Branded residential developments typically command higher long-term brand equity, hospitality service standards, and international recognition.
                </p>
              </div>

              <div className="p-6 bg-[#070A11] rounded-3xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">3. Large-Format Luxury Layouts</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Residences ranging from 3,600 to 12,000 sq.ft. cater specifically to high-net-worth families seeking expansive living space.
                </p>
              </div>

              <div className="p-6 bg-[#070A11] rounded-3xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">4. Private Elevator Exclusivity</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct elevator entry into private apartment foyers enhances privacy, security, and resident comfort.
                </p>
              </div>

              <div className="p-6 bg-[#070A11] rounded-3xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">5. Suspended Skybridge Amenities</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The 3-level floating Trump Club offers infinity pool, cigar lounge, and fine dining elevated high above the ground.
                </p>
              </div>

              <div className="p-6 bg-[#070A11] rounded-3xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">6. Express ORR Connectivity</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct access to ORR Exit 1A connects to Shamshabad Airport, Gachibowli, and HITEC City without traffic bottlenecks.
                </p>
              </div>
            </div>

            <div className="p-5 bg-[#070A11] rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-300 block mb-1">Financial Risk Disclaimer:</span>
              Buyers should independently evaluate acquisition cost, payment schedule, maintenance obligations, project execution, liquidity, future competing supply and legal documentation. No return or appreciation is guaranteed.
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (19 FAQs) */}
        <section className="py-16 md:py-24 bg-[#070A11] border-t border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                Answers to Common Questions
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-300 text-base">
                Verified answers regarding Trump Towers Hyderabad, RERA details, promoter structure, and amenities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">1. What is Trump Towers Hyderabad?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trump Towers Hyderabad is an ultra-luxury branded residential development located in Golden Mile, Kokapet, Hyderabad. Spanning approximately 4.04 acres, it features two iconic 65-storey towers offering 3.5, 4, 4.5, and 6 BHK sky residences with private elevators and a three-level floating Trump Club.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">2. Where is Trump Towers Hyderabad located?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trump Towers Hyderabad is located in Golden Mile, Kokapet, Gandipet Mandal, Hyderabad, Telangana – 500075. It is situated adjacent to Neopolis and Financial District with direct connectivity to ORR Exit 1A.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">3. Who is the developer and promoter of Trump Towers Hyderabad?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The official developer and promoter registered under Telangana RERA is <strong>Ira The Edge Developers LLP</strong>. Tribeca Developers is the official development and brand partner.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">4. Is Trump Towers Hyderabad owned or developed by Donald Trump?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  No. Trump Towers Hyderabad is not owned, developed or sold by Donald J. Trump, The Trump Organization or any of their affiliates. Ira The Edge Developers LLP is the developer and promoter and uses the “Trump” name and mark under licence from DT Marks Hyderabad LLC.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">5. What is the RERA registration number for Trump Towers Hyderabad?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The project is registered with Telangana RERA under registration number <strong>P02400010871</strong> (HMDA permit no. 2128/HMDA/SWBP/2026).
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">6. What is the RERA completion date?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The registered RERA completion date is <strong>15 May 2031</strong>. Buyers should independently verify possession terms against official RERA filings and agreement documents.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">7. How many towers are in the development?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trump Towers Hyderabad consists of 2 iconic residential high-rise towers connected by a central 3-level floating skybridge club.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">8. How tall are the towers in Trump Towers Hyderabad?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The twin towers rise up to 65 storeys, forming a major high-elevation architectural presence in West Hyderabad.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">9. What residential configurations are available?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Available configurations include 3.5 BHK, 4 BHK, 4.5 BHK, and multi-level 6 BHK Sky Duplex formats.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">10. What are the approximate residence sizes?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Residence sizes extend from approximately 3,600 sq.ft. up to 12,000 sq.ft. Buyers should verify specific unit sizes against the latest approved floor plans.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">11. Does every apartment have a private elevator?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Yes. Each residence features private elevator access opening directly into an exclusive private entry foyer.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">12. What is the three-level floating Trump Club?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The Trump Club is a 3-level cantilevered skybridge connecting the twin towers, housing an infinity-edge pool, private cigar lounge, fine dining restaurant, executive business suite, spa, and wellness salons.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">13. What amenities are provided for residents?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Amenities include gym, yoga, pilates, spa, unisex salon, temperature-controlled pool, gaming arcade, kids' club, mini-theater, banquet hall, co-working suite, and double-height valet lobby.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">14. What is the Golden Mile advantage in Kokapet?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Golden Mile is Kokapet's premier high-rise residential zone, offering wide planned access roads, proximity to Neopolis and Financial District IT hubs, and rapid ORR connectivity.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">15. How is the project connected to the Outer Ring Road (ORR)?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Trump Towers Hyderabad is situated close to ORR Exit 1A (Kokapet), offering express access to Shamshabad Airport and major Hyderabad suburbs.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">16. How far is Financial District and Gachibowli from Trump Towers Hyderabad?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Financial District (Nanakramguda) is within a 5-10 minute drive, while Gachibowli Circle is accessible in approximately 10-15 minutes.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">17. What is the current price of apartments in Trump Towers Hyderabad?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Current pricing and availability vary by configuration, floor, orientation and inventory. Contact Naani Projects on <strong>9705080909</strong> for the latest private pricing information.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">18. How can I download the floor plans and e-brochure?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click the "Request Floor Plan" or "Download Brochure" buttons on this page, or WhatsApp Naani Projects at <strong>9705080909</strong> for instant layout sheets.
                </p>
              </div>

              <div className="p-6 bg-[#0B101D] rounded-2xl border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-white">19. How do I schedule a site visit for Trump Towers Hyderabad?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Call or WhatsApp Naani Projects at <strong>9705080909</strong> or click "Schedule a Site Visit" to register your preferred date and time for a guided tour.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY OF UPLOADED IMAGES */}
        <section className="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
                Verified Project Gallery
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Trump Towers Hyderabad Showcase
              </h2>
              <p className="text-slate-300 text-base">
                Explore official architectural renders, elevation drawings, entrance facades, and brand badges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Image 1 */}
              <div className="bg-[#070A11] p-3 rounded-2xl border border-slate-800 space-y-2 group">
                <div
                  className="overflow-hidden rounded-xl cursor-pointer h-64 bg-slate-900"
                  onClick={() => setSelectedImage(heroImage)}
                >
                  <img
                    src={heroImage}
                    alt="Trump Towers Hyderabad twilight high-rise perspective with illuminated TRUMP logo"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-white">Tower A & B Twilight Perspective</span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">Artist's Impression</span>
                </div>
              </div>

              {/* Image 2 */}
              <div className="bg-[#070A11] p-3 rounded-2xl border border-slate-800 space-y-2 group">
                <div
                  className="overflow-hidden rounded-xl cursor-pointer h-64 bg-slate-900"
                  onClick={() => setSelectedImage(elevationUpwardImage)}
                >
                  <img
                    src={elevationUpwardImage}
                    alt="Trump Towers Hyderabad low-angle view showing Tribeca logo and RERA registration"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-white">65-Storey Skybridge View</span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">Artist's Impression</span>
                </div>
              </div>

              {/* Image 3 */}
              <div className="bg-[#070A11] p-3 rounded-2xl border border-slate-800 space-y-2 group">
                <div
                  className="overflow-hidden rounded-xl cursor-pointer h-64 bg-white p-2"
                  onClick={() => setSelectedImage(elevationDiagramImage)}
                >
                  <img
                    src={elevationDiagramImage}
                    alt="Trump Towers Hyderabad architectural line drawing elevation diagram"
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-white">Architectural Elevation Line Drawing</span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">Artist's Impression</span>
                </div>
              </div>

              {/* Image 4 */}
              <div className="bg-[#070A11] p-3 rounded-2xl border border-slate-800 space-y-2 group">
                <div
                  className="overflow-hidden rounded-xl cursor-pointer h-64 bg-slate-900"
                  onClick={() => setSelectedImage(entranceImage)}
                >
                  <img
                    src={entranceImage}
                    alt="Trump Towers Hyderabad main entrance facade with gold lettering"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-white">Entrance Portico & Facade</span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">Artist's Impression</span>
                </div>
              </div>

              {/* Image 5 */}
              <div className="bg-[#070A11] p-3 rounded-2xl border border-slate-800 space-y-2 group">
                <div
                  className="overflow-hidden rounded-xl cursor-pointer h-64 bg-white p-4"
                  onClick={() => setSelectedImage(logoCardImage)}
                >
                  <img
                    src={logoCardImage}
                    alt="Trump Towers Hyderabad gold logo card Authorized Marketing Partner"
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-white">Authorised Marketing Partner Badge</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Official Logo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS / CONTEXTUAL COMPARISON */}
        <section className="py-16 md:py-24 bg-[#070A11] border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Explore Nearby Enclaves</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Compare Trump Towers Hyderabad with other luxury projects in Kokapet
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                to="/projects/neo-towers-neopolis-kokapet"
                className="p-5 bg-[#0B101D] rounded-2xl border border-slate-800 hover:border-amber-500/40 transition block space-y-2"
              >
                <span className="text-xs font-bold text-amber-400">Neopolis Kokapet</span>
                <h3 className="text-base font-bold text-white">Neo Towers</h3>
                <p className="text-xs text-slate-400">57-storey twin towers with skydeck & Club Neo in Neopolis.</p>
              </Link>

              <Link
                to="/projects/the-cascades-neopolis"
                className="p-5 bg-[#0B101D] rounded-2xl border border-slate-800 hover:border-amber-500/40 transition block space-y-2"
              >
                <span className="text-xs font-bold text-amber-400">Neopolis Kokapet</span>
                <h3 className="text-base font-bold text-white">The Cascades Neopolis</h3>
                <p className="text-xs text-slate-400">Lakeside luxury high-rise apartments by Candeur & Jayabheri.</p>
              </Link>

              <Link
                to="/projects/rise-with-9-neopolis-kokapet"
                className="p-5 bg-[#0B101D] rounded-2xl border border-slate-800 hover:border-amber-500/40 transition block space-y-2"
              >
                <span className="text-xs font-bold text-amber-400">Neopolis Kokapet</span>
                <h3 className="text-base font-bold text-white">Rise With 9</h3>
                <p className="text-xs text-slate-400">Large-format double-height residences with 9th House club.</p>
              </Link>

              <Link
                to="/projects/linq-by-raghava"
                className="p-5 bg-[#0B101D] rounded-2xl border border-slate-800 hover:border-amber-500/40 transition block space-y-2"
              >
                <span className="text-xs font-bold text-amber-400">Neopolis Kokapet</span>
                <h3 className="text-base font-bold text-white">LINQ by Raghava</h3>
                <p className="text-xs text-slate-400">Ultra-spacious 3 BHK suites with 5.5 lakh+ sq.ft. sky amenities.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <ProjectsFooter />

      {/* LEAD CAPTURE POPUP MODAL */}
      <TrumpTowersLeadPopup
        open={popupOpen}
        onOpenChange={setPopupOpen}
        popupType={popupType}
      />

      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Trump Towers Hyderabad enlarged image"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrumpTowersHyderabadPage;
