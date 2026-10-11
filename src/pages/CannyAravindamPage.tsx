import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import BrochureGateModal from "@/components/BrochureGateModal";
import {
  MessageCircle,
  Phone,
  MapPin,
  Building2,
  Layers,
  Maximize2,
  Calendar,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  Download,
  Clock,
  Compass,
  Home,
  Check,
  ChevronRight,
  ArrowRight,
  Dumbbell,
  Waves,
  Trees,
  Users,
  Briefcase,
  Wifi,
  Car,
  Zap,
  Eye,
  Shield,
  FileText,
  ExternalLink,
  Play,
  Flower2,
  Droplets,
  Flame,
  Accessibility,
  Tv,
  Coffee,
  X,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Authoritative user-uploaded media imports
import cannyElevation from "@/assets/canny-aravindam/canny-aravindam-elevation.jpg";
import cannyClubhouse from "@/assets/canny-aravindam/canny-aravindam-clubhouse.jpg";
import cannyBrochure from "@/assets/canny-aravindam/canny-aravindam-brochure.png";

const PROJECT_NAME = "Canny Aravindam";
const DEVELOPER_NAME = "Canny Life Spaces";
const RERA_NO = "TS RERA Approved P02200007242";
const LOCATION_NAME = "Bowrampet, Hyderabad";
const SITE_ADDRESS = "166/19, Near The Creek Planet School - Mercury Campus, Bowrampet, Hyderabad - 502 325";
const CORPORATE_OFFICE = "2nd Floor, Plot No. 19, Jayabheri Pine Valley, Gachibowli, Hyderabad, Telangana - 500 032";
const CANONICAL_URL = "https://www.naani.in/projects/canny-aravindam";
const PHONE = "+919493943946";
const PHONE_DISPLAY = "+91 94939 43946";
const WA_URL = (msg: string) => `https://wa.me/919493943946?text=${encodeURIComponent(msg)}`;

export const CannyAravindamPage = () => {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadSource, setLeadSource] = useState("Hero CTA");
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeHeroTab, setActiveHeroTab] = useState<number>(0);
  const [activePlanTab, setActivePlanTab] = useState<"2bhk" | "3bhk" | "towers">("2bhk");
  const [activeSpecTab, setActiveSpecTab] = useState<string>("structure");

  const openEnquiry = (source: string) => {
    setLeadSource(source);
    setLeadModalOpen(true);
  };

  const defaultWaMsg =
    "Hi Naani Projects, I want to get current price, floor plans and site visit details for Canny Aravindam in Bowrampet.";

  // Hero interactive images array
  const heroMedia = [
    {
      id: "elevation",
      title: "Community Elevation & Grand Gate",
      subtitle: "3 Majestic Towers (G+9) with 60% Open Landscaped Courtyard",
      src: cannyElevation,
      badge: "Community Perspective",
      alt: "Canny Aravindam residential towers and grand entrance gate in Bowrampet Hyderabad",
    },
    {
      id: "clubhouse",
      title: "Signature 5-Level Clubhouse (~17,000 Sq.Ft.)",
      subtitle: "G+4 Architectural Jaali Facade housing 50+ Modern Amenities",
      src: cannyClubhouse,
      badge: "5-Level Clubhouse",
      alt: "Canny Aravindam 5-level jaali facade clubhouse in Bowrampet",
    },
    {
      id: "brochure",
      title: "Official Fact Sheet & Marketing Creative",
      subtitle: "Verified Specifications, Floor Sizes, 30+ Amenities & Corridor Map",
      src: cannyBrochure,
      badge: "Verified Project Sheet",
      alt: "Canny Aravindam official project brochure facts and amenities overview",
    },
  ];

  const galleryItems = [
    {
      src: cannyElevation,
      title: "Canny Aravindam — Community Elevation & Grand Entrance",
      subtitle: "3 Towers (G+9 Floors) with 60% open landscape and secure gated entry",
      tag: "Community Elevation",
      alt: "Canny Aravindam residential towers and gated entrance in Bowrampet Hyderabad",
    },
    {
      src: cannyClubhouse,
      title: "Exclusive 5-Level Clubhouse (~17,000 Sq.Ft.)",
      subtitle: "Modern jaali architecture, fitness studios, co-working spaces & rooftop garden",
      tag: "5-Storey Clubhouse",
      alt: "Canny Aravindam 5-level clubhouse architectural view in Bowrampet",
    },
    {
      src: cannyBrochure,
      title: "Official Project Fact Sheet & Floor Configurations",
      subtitle: "Verified configurations, key highlights, 50+ amenities and location corridor",
      tag: "Project Creative",
      alt: "Canny Aravindam official project facts, amenities and location highlights",
    },
  ];

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Highlights", href: "#highlights" },
    { label: "Floor Plans", href: "#floor-plans" },
    { label: "5-Level Clubhouse", href: "#clubhouse" },
    { label: "50+ Amenities", href: "#amenities" },
    { label: "Video Tour", href: "#video-tour" },
    { label: "Specifications", href: "#specifications" },
    { label: "Location & Map", href: "#location" },
    { label: "Gallery", href: "#gallery" },
    { label: "Developer", href: "#developer" },
    { label: "FAQs", href: "#faqs" },
  ];

  const amenityCategories = [
    {
      category: "5-Level Clubhouse & Leisure",
      badge: "G+4 Storey Hub",
      icon: <Building2 className="text-amber-400" size={22} />,
      items: [
        "Exclusive G+4 Residents Clubhouse (~17,000 sq.ft.)",
        "3 Well-Appointed Guest Suites for Visitors",
        "Multipurpose Banquet Hall & Party Deck",
        "Rooftop Sky Garden & Leisure Terrace",
        "Terrace Seating & Stargazing Lounge",
        "Provision for In-House Salon / Spa",
        "Senior Citizens Shaded Pavilions",
      ],
    },
    {
      category: "Wellness, Aquatic & Fitness",
      badge: "Active Health",
      icon: <Waves className="text-emerald-400" size={22} />,
      items: [
        "Swimming Pool with Dedicated Kids' Splash Pool",
        "Fully Equipped Air-Conditioned Gymnasium / Fitness Studio",
        "Serene Yoga & Meditation Hall",
        "Dedicated Jogging & Walking Track",
        "Changing Rooms & Poolside Sun Deck",
        "Acupressure Reflexology Path",
      ],
    },
    {
      category: "Work, Business & Connectivity",
      badge: "Smart Living",
      icon: <Briefcase className="text-amber-400" size={22} />,
      items: [
        "Executive Co-Working Spaces & Work Pods",
        "Conference & Meeting Hall for Remote Teams",
        "High-Speed Wi-Fi Provision in Clubhouse",
        "Provision for DTH & High-Speed Optical Fiber in All Flats",
      ],
    },
    {
      category: "Sports, Games & Children",
      badge: "Family Recreation",
      icon: <Dumbbell className="text-emerald-400" size={22} />,
      items: [
        "Indoor Games Arena (Table Tennis, Billiards, Snooker)",
        "Carrom, Chess & Board Game Lounge",
        "Themed Children's Play Area with Safe Turf",
        "Tot-Lot Play Zones & Sand Pit",
      ],
    },
    {
      category: "Greenery, Eco-Care & Water",
      badge: "Sustainable Design",
      icon: <Trees className="text-emerald-400" size={22} />,
      items: [
        "~60% Open Landscaped Green Spaces",
        "Lush Tree-Lined Avenues & Central Greenscape",
        "Exclusive Domestic Water Softening Plant (WTP - Non-RO)",
        "Sewage Treatment Plant (STP) for Garden & WC Flushing",
        "Rainwater Harvesting Recharge Pits",
      ],
    },
    {
      category: "Multi-Tier Security & Utilities",
      badge: "24/7 Peace of Mind",
      icon: <Shield className="text-amber-400" size={22} />,
      items: [
        "CCTV Surveillance with Central Security Room Monitoring",
        "Solar-Powered Security Fence around Compound Wall",
        "RF-Controlled Automated Boom Barriers",
        "100% DG Power Backup for Common Areas & Residences (excl. 16A)",
        "Dedicated Car Wash Facility in Parking Floor",
        "High-Speed Passenger Lifts with Automatic Rescue Device (ARD)",
        "Access Ramps at all Block Entrances for Differently-Abled",
        "Fire Hydrant System (FHS) & Basement Sprinklers",
      ],
    },
  ];

  const specificationsData = [
    {
      id: "structure",
      title: "Structure & Walls",
      icon: <Building2 size={18} />,
      details: [
        { label: "Structure", val: "R.C.C. framed structure engineered to withstand wind and seismic loads." },
        { label: "Super Structure", val: "CC brick / AAC blocks — 8-inch thickness for external walls and 4-inch thickness for internal walls." },
        { label: "Internal Plastering", val: "12mm to 18mm thick cement plaster with smooth putty finishing." },
        { label: "External Plastering", val: "18mm thick cement plaster with sponge smooth finishing." },
      ],
    },
    {
      id: "flooring",
      title: "Flooring & Finishes",
      icon: <Layers size={18} />,
      details: [
        { label: "Living, Dining, Beds & Kitchen", val: "Premium vitrified GVT / Double charged vitrified tiles of 600mm x 600mm size of reputed make." },
        { label: "Balconies / Sit-Outs", val: "Premium vitrified / ceramic tiles of reputed make." },
        { label: "Bathrooms & Utility", val: "Anti-skid, acid-resistant tiles of reputed make as per Architect design." },
        { label: "Corridors & Lobby", val: "Combination of granite and vitrified tiles as per architect design." },
        { label: "Staircases", val: "Combination of granite and Tandur/Kota stone." },
        { label: "False Ceiling", val: "All toilets provided with gypsum board false ceiling to conceal plumbing lines." },
      ],
    },
    {
      id: "doors",
      title: "Doors, Windows & Painting",
      icon: <Home size={18} />,
      details: [
        { label: "Main Door", val: "Designer engineered wood frame and shutter fitted with hardware of reputed make." },
        { label: "Internal Doors", val: "Engineered wood frames and shutters for bedrooms and bathrooms with reputed hardware." },
        { label: "Utility Door", val: "UPVC door with half-glass and half-shutter." },
        { label: "Windows", val: "2.5-track UPVC sliding shutters with clear glass panels, provision for mosquito mesh & MS safety grills." },
        { label: "Internal Painting", val: "Water-based putty, one coat primer and two coats of premium emulsion paint of reputed make." },
        { label: "External Painting", val: "Combination of water-based texture / putty with two coats of weather-proof paint finish." },
      ],
    },
    {
      id: "kitchen",
      title: "Kitchen & Bathrooms",
      icon: <Droplets size={18} />,
      details: [
        { label: "Kitchen Provisions", val: "Provision for domestic and municipal water connections and RO water purifier point. Wall dado up to 2 ft height. Provision for modular kitchen." },
        { label: "Utility Water Point", val: "Provision for washing machine water inlet and drain in utility." },
        { label: "Bathroom Dadoing", val: "Glazed tiles of standard make up to door height." },
        { label: "Sanitary Fixtures", val: "All CP and sanitary fixtures of reputed make; wall-mounted EWC with flush valve / tank." },
        { label: "Plumbing Lines", val: "CPVC waterlines for hot & cold supply; PVC drainage pipes of reputed make." },
      ],
    },
    {
      id: "electrical",
      title: "Electrical & Power Backup",
      icon: <Zap size={18} />,
      details: [
        { label: "Wiring & Switches", val: "Concealed copper wiring and modular switches of reputed make." },
        { label: "Air Conditioning", val: "Power outlets for air-conditioners provided in all bedrooms." },
        { label: "Geysers & Exhaust", val: "Power outlets for geysers and exhaust fans in all bathrooms." },
        { label: "Power Supply", val: "Three-phase power supply for each unit with individual Smart Meters and MCBs in distribution boards." },
        { label: "DG Generator Backup", val: "100% DG backup for common areas and 100% DG backup for flats (excluding 16 Amp points)." },
      ],
    },
    {
      id: "utilities",
      title: "Security, Lifts & Eco Systems",
      icon: <ShieldCheck size={18} />,
      details: [
        { label: "Security Network", val: "CCTV cameras at designated common areas & clubhouse with central security room recording. Solar-powered fence on boundary walls." },
        { label: "Gate Control", val: "RF controlled automated boom barrier for authorized vehicle entry." },
        { label: "Lifts", val: "High-speed automatic passenger lifts with automatic rescue device (KONE / Thyssenkrupp / Johnson or reputed make)." },
        { label: "WTP & STP", val: "Exclusive water softening plant (WTP). Sewage treatment plant (STP) with treated water utilized for landscape and WC flushing." },
        { label: "Car Wash", val: "Dedicated car wash facility provided in parking floor level." },
        { label: "Accessibility", val: "Access ramps at all block entrances provided for the differently-abled." },
        { label: "Fire Safety", val: "Fire Hydrant System (FHS) & sprinklers in basements, fire alarm & public address system as per fire safety norms." },
      ],
    },
  ];

  const locationAdvantages = [
    {
      category: "Highways & IT Corridors",
      icon: <Compass className="text-amber-400" size={18} />,
      items: [
        { title: "Outer Ring Road (ORR) Exit 4A", time: "Immediate / ~3 mins" },
        { title: "Miyapur Metro Station", time: "~20–25 mins" },
        { title: "Kukatpally (KPHB Colony)", time: "~25–30 mins" },
        { title: "HITEC City & Cyber Towers", time: "~30 mins" },
        { title: "Gachibowli Financial District", time: "~40–45 mins" },
      ],
    },
    {
      category: "Top Educational Institutions",
      icon: <Award className="text-emerald-400" size={18} />,
      items: [
        { title: "The Creek Planet School (Mercury Campus)", time: "Adjacent / Next Door" },
        { title: "Oakridge International School", time: "~10 mins" },
        { title: "Silver Oaks International School", time: "~12 mins" },
        { title: "Kennedy High The Global School", time: "~10 mins" },
        { title: "Delhi Public School (DPS) Bowrampet", time: "~8 mins" },
        { title: "VNR Vignana Jyothi Institute (VJIET)", time: "~12 mins" },
      ],
    },
    {
      category: "Healthcare & Hospitals",
      icon: <Shield className="text-amber-400" size={18} />,
      items: [
        { title: "SLG Hospitals (Bachupally)", time: "~12 mins" },
        { title: "Usha Mullapudi Cardiac Centre", time: "~18 mins" },
        { title: "Relief Hospital", time: "~10 mins" },
        { title: "Malla Reddy Narayana Multispeciality", time: "~15 mins" },
      ],
    },
    {
      category: "Retail, Malls & Supermarkets",
      icon: <Coffee className="text-emerald-400" size={18} />,
      items: [
        { title: "D-Mart Mallampet", time: "~8 mins" },
        { title: "GSM Mall & Multiplex (Miyapur)", time: "~22 mins" },
        { title: "Forum Sujana Mall (Kukatpally)", time: "~28 mins" },
        { title: "Pragathi Nagar Commercial Hub", time: "~15 mins" },
      ],
    },
  ];

  const faqs = [
    {
      q: "What is Canny Aravindam and where is it located?",
      a: "Canny Aravindam is an upscale 3.05-acre luxury gated community developed by Canny Life Spaces in Bowrampet, Hyderabad (Address: 166/19, Near The Creek Planet School - Mercury Campus, Bowrampet, 502 325). Strategically located near ORR Exit 4A, it comprises 3 residential towers (G+9 floors) with 360 premium 2 & 3 BHK apartments and an exclusive 5-level standalone clubhouse.",
    },
    {
      q: "What configurations and unit sizes are available at Canny Aravindam?",
      a: "The project offers thoughtfully designed 2 BHK apartments (1,250 to 1,285 sq.ft.) and 3 BHK apartments (1,505 to 2,300 sq.ft.). Every unit features a zero common wall layout for maximum acoustic privacy, three-sided natural light, and cross ventilation.",
    },
    {
      q: "What are the key highlights of the 5-Level Clubhouse?",
      a: "The community includes a signature G+4 (5-Level) standalone clubhouse spanning approximately 17,000 sq.ft. It is equipped with an air-conditioned gymnasium, swimming pool with kids' splash pool, co-working spaces, 3 guest suites, banquet hall, terrace seating, rooftop garden, yoga & meditation hall, and provision for a salon/spa.",
    },
    {
      q: "Is Canny Aravindam approved by HMDA and Telangana RERA?",
      a: "Yes. Canny Aravindam is fully approved by HMDA and registered under the Telangana State Real Estate Regulatory Authority with TS RERA Registration Number P02200007242. Buyers can verify project filings on the official portal at rera.telangana.gov.in.",
    },
    {
      q: "What is the expected possession timeline for Canny Aravindam?",
      a: "The project marketing timeline indicates an expected possession date of December 2027. Construction is progressing steadily across all three towers (A, B, and C) and the clubhouse.",
    },
    {
      q: "What is the price of 2 & 3 BHK flats at Canny Aravindam?",
      a: "Pricing is available on request. Base prices vary depending on flat configuration, floor rise, orientation, and payment terms. You can request the latest builder cost sheet, payment schedules, and bank loan approvals by clicking 'Request Current Price' or chatting directly with Naani Projects on WhatsApp.",
    },
    {
      q: "How does the zero common wall design benefit residents?",
      a: "Zero common walls ensure that none of your primary living or bedroom walls are shared with neighbouring apartments. This guarantees acoustic dampening, total privacy from corridor noise, and allows for large perimeter windows on three sides for natural daylight and continuous cross-breeze.",
    },
    {
      q: "How can I book a guided site visit with Naani Projects?",
      a: "You can schedule a private site visit by calling or messaging Naani Projects on +91 94939 43946 (or WhatsApp 9493 943 946). Our team provides zero-brokerage buyer assistance, transparent documentation review, and on-site walkthroughs.",
    },
  ];

  // Schema definitions
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
      { "@type": "ListItem", position: 3, name: "Bowrampet", item: "https://www.naani.in/projects-in-bowrampet" },
      { "@type": "ListItem", position: 4, name: "Canny Aravindam", item: CANONICAL_URL },
    ],
  };

  const apartmentComplexSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Canny Aravindam",
    description:
      "Canny Aravindam is a luxury 2 & 3 BHK gated community in Bowrampet, Hyderabad, featuring 3 towers (G+9), 360 apartments, a 5-level clubhouse, and 60% open space.",
    url: CANONICAL_URL,
    telephone: PHONE,
    image: [
      "https://www.naani.in/assets/canny-aravindam/canny-aravindam-elevation.jpg",
      "https://www.naani.in/assets/canny-aravindam/canny-aravindam-clubhouse.jpg",
      "https://www.naani.in/assets/canny-aravindam/canny-aravindam-brochure.png",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS,
      addressLocality: "Bowrampet",
      addressRegion: "Telangana",
      postalCode: "502325",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.5735715",
      longitude: "78.3960389",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "5-Level Clubhouse", value: true },
      { "@type": "LocationFeatureSpecification", name: "Gymnasium", value: true },
      { "@type": "LocationFeatureSpecification", name: "Co-working Lounge", value: true },
      { "@type": "LocationFeatureSpecification", name: "Jogging Track", value: true },
      { "@type": "LocationFeatureSpecification", name: "Guest Suites", value: true },
    ],
    numberOfAccommodationUnits: "360",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Naani Projects",
    image: "https://www.naani.in/naani-projects-logo.png",
    url: "https://www.naani.in",
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kondapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500084",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <SEOHead
        title="Canny Aravindam Bowrampet | 2 & 3 BHK Luxury Flats Near ORR | Naani Projects"
        description="Explore Canny Aravindam in Bowrampet, Hyderabad by Canny Life Spaces. 3.05 acres, 3 towers (G+9), 360 units (1,250-2,300 sft), 5-level clubhouse, 60% open spaces. TG RERA P02200007242."
        canonicalUrl={CANONICAL_URL}
        ogImage="https://www.naani.in/assets/canny-aravindam/canny-aravindam-elevation.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, apartmentComplexSchema, faqSchema, realEstateAgentSchema],
        }}
      />

      <ProjectsHeader />

      {/* 1. BREADCRUMBS */}
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-[#070B14] border-b border-slate-800/80 pt-24 pb-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link to="/projects" className="hover:text-amber-400 transition-colors">
            Projects
          </Link>
          <ChevronRight size={12} />
          <Link to="/projects-in-bowrampet" className="hover:text-amber-400 transition-colors">
            Bowrampet
          </Link>
          <ChevronRight size={12} />
          <span className="text-amber-400 font-semibold">{PROJECT_NAME}</span>
        </div>
      </nav>

      {/* 2. STICKY SUB-NAVIGATION BAR */}
      <div className="sticky top-16 z-30 bg-[#090D16]/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 overflow-x-auto py-2.5 scrollbar-none text-xs font-semibold">
          <div className="flex items-center gap-5 text-slate-300 shrink-0">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-amber-400 transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-amber-400"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => openEnquiry("Sticky Nav Price")}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1 text-xs h-8"
            >
              Get Price Sheet
            </Button>
            <a
              href={WA_URL(defaultWaMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 text-xs h-8 rounded-md inline-flex items-center gap-1.5"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION WITH MASTER MEDIA SHOWCASE */}
      <section className="relative py-10 lg:py-16 bg-gradient-to-b from-[#070B14] via-[#090D16] to-[#0B101D] overflow-hidden">
        {/* Glow ambient background accents */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines, Credibility & Actions */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} /> TG RERA: P02200007242
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} /> HMDA Approved
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
                  <MapPin size={13} className="text-amber-400" /> Bowrampet Near ORR Exit 4A
                </span>
              </div>

              {/* Solitaire Tagline & Main Title */}
              <div className="space-y-2">
                <span className="text-amber-400 font-extrabold text-sm sm:text-base tracking-widest uppercase block flex items-center gap-2">
                  <Sparkles size={16} /> Live Life Solitaire
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Canny Aravindam —{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    2 &amp; 3 BHK Luxury Apartments
                  </span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
                  Let your life rise beyond the everyday in Bowrampet. A 3.05-acre sanctuary of 3 high-rise towers, zero shared walls, and a signature 5-level jaali clubhouse.
                </p>
              </div>

              {/* Developer & Proximity Highlights */}
              <div className="bg-[#0B101D]/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>
                    Developer:{" "}
                    <Link
                      to="/canny-life-spaces-projects-hyderabad"
                      className="text-amber-400 font-bold hover:underline"
                    >
                      {DEVELOPER_NAME}
                    </Link>
                  </span>
                  <span className="text-emerald-400 font-semibold">Target Possession: Dec 2027</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  📍 Located at <strong>166/19, Bowrampet</strong> right next to{" "}
                  <strong>The Creek Planet School (Mercury Campus)</strong> with swift 3-minute access to{" "}
                  <strong>ORR Exit 4A</strong> and ~30 mins to HITEC City.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={() => openEnquiry("Hero Request Price")}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black shadow-xl text-sm h-auto"
                >
                  Request Current Price
                </Button>
                <Button
                  onClick={() => setBrochureModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:bg-slate-800 text-amber-400 font-bold text-sm h-auto inline-flex items-center gap-2"
                >
                  <Download size={16} /> Download Brochure
                </Button>
                <a
                  href={WA_URL(defaultWaMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-sm h-auto inline-flex items-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-sm h-auto inline-flex items-center gap-2"
                >
                  <Phone size={16} /> Call
                </a>
              </div>
            </div>

            {/* Right Column: User-Uploaded Media Interactive Showcase */}
            <div className="lg:col-span-6 space-y-3">
              {/* Image Mode Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
                {heroMedia.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveHeroTab(idx)}
                    className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-all text-center ${
                      activeHeroTab === idx
                        ? "bg-amber-500 text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {m.badge}
                  </button>
                ))}
              </div>

              {/* Master Media Display Frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-slate-950 group">
                <img
                  src={heroMedia[activeHeroTab].src}
                  alt={heroMedia[activeHeroTab].alt}
                  width={1280}
                  height={800}
                  className="w-full h-[320px] sm:h-[420px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                  fetchPriority="high"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-black/20 opacity-80" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles size={14} /> {heroMedia[activeHeroTab].badge}
                </div>

                {/* Lightbox / Zoom Trigger */}
                <button
                  onClick={() => setSelectedImage(heroMedia[activeHeroTab].src)}
                  className="absolute top-3 right-3 bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white p-2 rounded-lg border border-slate-700 transition-colors"
                  aria-label="Enlarge view"
                  title="Click to Enlarge"
                >
                  <Maximize2 size={16} />
                </button>

                {/* Captions & Info Footer */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800/80 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-extrabold text-sm sm:text-base leading-tight">
                      {heroMedia[activeHeroTab].title}
                    </h2>
                    <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      Slide {activeHeroTab + 1} of 3
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {heroMedia[activeHeroTab].subtitle}
                  </p>
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {heroMedia.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveHeroTab(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all h-20 sm:h-24 ${
                      activeHeroTab === idx
                        ? "border-amber-400 scale-[1.02] shadow-lg shadow-amber-500/20"
                        : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white font-bold truncate bg-black/70 px-1 py-0.5 rounded text-center">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. MARQUEE / LIVE HIGHLIGHTS RIBBON */}
          <div className="mt-12 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between gap-4 flex-wrap text-center">
              <div className="flex-1 min-w-[120px] p-2 border-r border-amber-500/20 last:border-none">
                <span className="block text-2xl font-black text-amber-400">3.05 Acres</span>
                <span className="text-xs text-slate-300 font-medium">Pristine Land Area</span>
              </div>
              <div className="flex-1 min-w-[120px] p-2 border-r border-amber-500/20 last:border-none">
                <span className="block text-2xl font-black text-amber-400">3 Towers</span>
                <span className="text-xs text-slate-300 font-medium">Blocks A, B, C (G+9)</span>
              </div>
              <div className="flex-1 min-w-[120px] p-2 border-r border-amber-500/20 last:border-none">
                <span className="block text-2xl font-black text-amber-400">360 Units</span>
                <span className="text-xs text-slate-300 font-medium">2 &amp; 3 BHK Homes</span>
              </div>
              <div className="flex-1 min-w-[120px] p-2 border-r border-amber-500/20 last:border-none">
                <span className="block text-2xl font-black text-amber-400">1250–2300 Sft</span>
                <span className="text-xs text-slate-300 font-medium">Smart Configurations</span>
              </div>
              <div className="flex-1 min-w-[120px] p-2 border-r border-amber-500/20 last:border-none">
                <span className="block text-2xl font-black text-amber-400">5 Levels</span>
                <span className="text-xs text-slate-300 font-medium">17k Sft Clubhouse</span>
              </div>
              <div className="flex-1 min-w-[120px] p-2">
                <span className="block text-2xl font-black text-emerald-400">~60% Open</span>
                <span className="text-xs text-slate-300 font-medium">Green Courtyards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT FACT SHEET AT A GLANCE */}
      <section id="overview" className="py-14 bg-[#0B101D] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Official Facts &amp; Disclosures
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Canny Aravindam at a Glance
              </h2>
            </div>
            <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Clock size={14} className="text-amber-400" />
              Information verified against official builder source: October 2026
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Project Name</span>
              <span className="text-white font-bold text-base mt-0.5 block">{PROJECT_NAME}</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Developer</span>
              <Link
                to="/canny-life-spaces-projects-hyderabad"
                className="text-amber-400 hover:underline font-bold text-base mt-0.5 block"
              >
                {DEVELOPER_NAME}
              </Link>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Site Location</span>
              <Link
                to="/projects-in-bowrampet"
                className="text-white hover:text-amber-400 font-bold text-base mt-0.5 block"
              >
                Bowrampet, Hyderabad
              </Link>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Land Parcel</span>
              <span className="text-white font-bold text-base mt-0.5 block">3.05 Acres</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Structure &amp; Blocks</span>
              <span className="text-white font-bold text-base mt-0.5 block">3 Towers • G+9 Floors</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Total Units</span>
              <span className="text-white font-bold text-base mt-0.5 block">360 Apartments</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Configurations</span>
              <span className="text-amber-400 font-bold text-base mt-0.5 block">2 &amp; 3 BHK</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Unit Sizes</span>
              <span className="text-white font-bold text-base mt-0.5 block">1,250 – 2,300 sq.ft.</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">RERA Registration</span>
              <span className="text-amber-400 font-bold text-base mt-0.5 block">TS RERA P02200007242</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Architectural Hallmark</span>
              <span className="text-white font-bold text-base mt-0.5 block">Zero Common Walls • 60% Open</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Clubhouse Facility</span>
              <span className="text-white font-bold text-base mt-0.5 block">Exclusive G+4 (~17,000 sft)</span>
            </div>
            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800/90 hover:border-amber-500/30 transition-colors">
              <span className="text-slate-400 block font-medium text-xs">Expected Possession</span>
              <span className="text-emerald-400 font-bold text-base mt-0.5 block">December 2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "LET YOUR LIFE RISE BEYOND THE EVERYDAY" — OFFICIAL PROJECT MATTER */}
      <section id="highlights" className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Official Project Overview
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Let Your Life <span className="text-amber-400">Rise Beyond the Everyday</span>
            </h2>

            <div className="text-slate-300 space-y-4 text-base leading-relaxed">
              <p>
                <strong>Canny Aravindam</strong> is a luxurious residential gated community designed to portray a life above the mundane. With three stunning towers (Blocks A, B, and C) rising Ground plus Nine floors (G+9) and a total of 360 two and three BHK apartments, this address delivers smart floor plans crafted to optimize functional space, daylight, and breeze.
              </p>
              <p>
                The outdoor spaces are extravagant and curated to provide a serene escape. Immerse yourself in the expanse of landscaped gardens, floral walkways, and calm open pockets designed to help your family unwind in tranquil surroundings.
              </p>
              <p>
                A core hallmark of Canny Aravindam is its <strong>no common wall architecture</strong>. Each home acts as an independent residence, providing acoustic quietness, three-sided daylight, and enhanced cross ventilation.
              </p>
            </div>

            {/* 6 Core Official Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="bg-[#0B101D] border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
                <Compass className="text-amber-400 mx-auto" size={20} />
                <h3 className="text-white font-bold text-xs">Well-Connected</h3>
                <p className="text-[11px] text-slate-400">Near ORR Exit 4A</p>
              </div>
              <div className="bg-[#0B101D] border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
                <Home className="text-amber-400 mx-auto" size={20} />
                <h3 className="text-white font-bold text-xs">Practical Layout</h3>
                <p className="text-[11px] text-slate-400">No Common Walls</p>
              </div>
              <div className="bg-[#0B101D] border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
                <Trees className="text-emerald-400 mx-auto" size={20} />
                <h3 className="text-white font-bold text-xs">Landscaped Gardens</h3>
                <p className="text-[11px] text-slate-400">~60% Open Spaces</p>
              </div>
              <div className="bg-[#0B101D] border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
                <Eye className="text-amber-400 mx-auto" size={20} />
                <h3 className="text-white font-bold text-xs">Panoramic Views</h3>
                <p className="text-[11px] text-slate-400">Unobstructed Greens</p>
              </div>
              <div className="bg-[#0B101D] border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
                <Building2 className="text-amber-400 mx-auto" size={20} />
                <h3 className="text-white font-bold text-xs">5-Level Clubhouse</h3>
                <p className="text-[11px] text-slate-400">17,000 Sft Facilities</p>
              </div>
              <div className="bg-[#0B101D] border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
                <ShieldCheck className="text-emerald-400 mx-auto" size={20} />
                <h3 className="text-white font-bold text-xs">Multi-Tier Security</h3>
                <p className="text-[11px] text-slate-400">CCTV &amp; Solar Fence</p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Request Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B101D] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Direct Builder Pricing
                </span>
                <h3 className="text-2xl font-black text-white">
                  Get Official Cost Sheet &amp; Availability
                </h3>
                <p className="text-xs text-slate-300">
                  Zero buyer brokerage. Receive official floor plans, price breakdown, and phase updates directly from Naani Projects.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => openEnquiry("Sidebar Cost Sheet")}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black h-12 rounded-xl text-sm shadow-lg"
                >
                  Request Official Cost Sheet
                </Button>
                <a
                  href={WA_URL(defaultWaMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl inline-flex items-center justify-center gap-2 transition-colors text-sm shadow-md"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp ({PHONE_DISPLAY})
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="w-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold h-12 rounded-xl inline-flex items-center justify-center gap-2 text-sm"
                >
                  <Phone size={18} /> Direct Call: {PHONE_DISPLAY}
                </a>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400">
                  🔒 Your information is completely confidential and only used for your verified property inquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. "LET EVERY SQUARE FOOT SHAPE A LIFE FULL OF POSSIBILITIES" — INTERACTIVE FLOOR PLANS */}
      <section id="floor-plans" className="py-16 md:py-24 bg-[#0B101D] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Floor Plans &amp; Layouts
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Let Every Square Foot Shape a Life Full of Possibilities
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Smartly engineered unit layouts designed with Vaastu compliance, independent entry foyers, and zero shared walls.
            </p>
          </div>

          {/* Plan Selector Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-2">
              <button
                onClick={() => setActivePlanTab("2bhk")}
                className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activePlanTab === "2bhk"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2 BHK (1,250 – 1,285 Sq.Ft.)
              </button>
              <button
                onClick={() => setActivePlanTab("3bhk")}
                className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activePlanTab === "3bhk"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                3 BHK (1,505 – 2,300 Sq.Ft.)
              </button>
              <button
                onClick={() => setActivePlanTab("towers")}
                className={`py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  activePlanTab === "towers"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Tower Layouts (A, B, C)
              </button>
            </div>
          </div>

          {/* Active Plan Card Details */}
          <div className="max-w-5xl mx-auto">
            {activePlanTab === "2bhk" && (
              <div className="bg-[#090D16] border border-amber-500/30 rounded-3xl p-6 sm:p-10 grid md:grid-cols-12 gap-8 items-center shadow-xl">
                <div className="md:col-span-6 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                      Compact Luxury Living
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      2 BHK Residences
                    </h3>
                    <span className="inline-block bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                      Super Built-Up Area: 1,250 – 1,285 Sq.Ft.
                    </span>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>No Common Walls:</strong> Individual privacy and sound dampening between residences.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>Spacious Master Suite:</strong> Dedicated wardrobe alcove and attached modern bathroom.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>Living &amp; Dining Segregation:</strong> Practical unit layout with airy sit-out balcony.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>Dedicated Utility:</strong> Washing machine point, separate drying area, and RO inlet.</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Button
                      onClick={() => openEnquiry("2 BHK Floor Plan & Cost Sheet")}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5"
                    >
                      Request 2 BHK Cost Sheet
                    </Button>
                    <Button
                      onClick={() => setBrochureModalOpen(true)}
                      className="bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-400 font-bold text-xs sm:text-sm px-4 py-2.5"
                    >
                      Download 2 BHK Plan PDF
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 block font-medium">Pricing Status</span>
                    <span className="text-2xl font-black text-amber-400 block">Price on Request</span>
                    <p className="text-xs text-slate-400">
                      Floor-wise and facing-wise rates available. Contact Naani Projects for the latest builder payment plan.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="bg-[#0B101D] p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block">Orientation</span>
                      <span className="text-white font-bold">East &amp; West Facing</span>
                    </div>
                    <div className="bg-[#0B101D] p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block">Vaastu</span>
                      <span className="text-white font-bold">100% Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlanTab === "3bhk" && (
              <div className="bg-[#090D16] border border-amber-500/30 rounded-3xl p-6 sm:p-10 grid md:grid-cols-12 gap-8 items-center shadow-xl">
                <div className="md:col-span-6 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                      Spacious Family Residences
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      3 BHK Apartments
                    </h3>
                    <span className="inline-block bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                      Super Built-Up Area: 1,505 – 2,300 Sq.Ft.
                    </span>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>Expansive Living &amp; Lounge:</strong> Designed for larger families and entertaining guests.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>Three-Side Natural Light:</strong> Wide balconies overlooking pristine community gardens.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>Zero Common Walls:</strong> Complete acoustic separation from neighboring apartments.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="text-amber-400 shrink-0 mt-0.5" size={16} />
                      <span><strong>Granite Lobbies:</strong> High-speed passenger lifts with automatic rescue device.</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Button
                      onClick={() => openEnquiry("3 BHK Floor Plan & Cost Sheet")}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5"
                    >
                      Request 3 BHK Cost Sheet
                    </Button>
                    <Button
                      onClick={() => setBrochureModalOpen(true)}
                      className="bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-400 font-bold text-xs sm:text-sm px-4 py-2.5"
                    >
                      Download 3 BHK Plan PDF
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 block font-medium">Pricing Status</span>
                    <span className="text-2xl font-black text-amber-400 block">Price on Request</span>
                    <p className="text-xs text-slate-400">
                      Custom sizes from 1,505 up to 2,300 sq.ft. Available on various levels across Towers A, B, and C.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="bg-[#0B101D] p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block">Orientation</span>
                      <span className="text-white font-bold">East &amp; West Facing</span>
                    </div>
                    <div className="bg-[#0B101D] p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block">Ventilation</span>
                      <span className="text-white font-bold">3-Sided Openings</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlanTab === "towers" && (
              <div className="bg-[#090D16] border border-amber-500/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h3 className="text-2xl font-black text-white">Tower Typical Layouts (Blocks A, B &amp; C)</h3>
                  <p className="text-xs text-slate-300">
                    Three high-rise towers rising G+9 storeys with optimal core spacing, wide granite corridors, high-speed ARD elevators, and fire evacuation stairs.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-[#0B101D] p-5 rounded-2xl border border-slate-800 space-y-3 text-center">
                    <span className="text-amber-400 font-extrabold text-lg block">Tower A</span>
                    <p className="text-xs text-slate-300">Typical Floor Plan featuring 2 &amp; 3 BHK units overlooking main entrance avenue.</p>
                    <Button
                      onClick={() => openEnquiry("Tower A Floor Plan")}
                      className="bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-amber-400 w-full"
                    >
                      Request Tower A Plan
                    </Button>
                  </div>
                  <div className="bg-[#0B101D] p-5 rounded-2xl border border-slate-800 space-y-3 text-center">
                    <span className="text-amber-400 font-extrabold text-lg block">Tower B</span>
                    <p className="text-xs text-slate-300">Central tower offering panoramic central greenscape views and direct clubhouse access.</p>
                    <Button
                      onClick={() => openEnquiry("Tower B Floor Plan")}
                      className="bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-amber-400 w-full"
                    >
                      Request Tower B Plan
                    </Button>
                  </div>
                  <div className="bg-[#0B101D] p-5 rounded-2xl border border-slate-800 space-y-3 text-center">
                    <span className="text-amber-400 font-extrabold text-lg block">Tower C</span>
                    <p className="text-xs text-slate-300">Quiet perimeter block with open countryside views and optimal cross-ventilation.</p>
                    <Button
                      onClick={() => openEnquiry("Tower C Floor Plan")}
                      className="bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-amber-400 w-full"
                    >
                      Request Tower C Plan
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. EXCLUSIVE 5-LEVEL CLUBHOUSE & 50+ MODERN AMENITIES */}
      <section id="clubhouse" className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Lifestyle &amp; Recreation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Let Every Moment <span className="text-amber-400">Pulse with Energy</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Celebrate the joys of life at the exclusive residents-only clubhouse — a dedicated G+4 five-level destination spanning ~17,000 sq.ft. designed for leisure, wellness, co-working, and family celebrations.
            </p>
          </div>

          {/* Featured Clubhouse Visual Spotlight (User's Uploaded Image) */}
          <div className="bg-[#0B101D] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-amber-500/20 relative group">
              <img
                src={cannyClubhouse}
                alt="Exclusive 5-Level Clubhouse at Canny Aravindam Bowrampet"
                width={800}
                height={800}
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-400 text-xs font-bold">
                🏛️ G+4 Storeys · ~17,000 Sq.Ft.
              </div>
              <button
                onClick={() => setSelectedImage(cannyClubhouse)}
                className="absolute bottom-4 right-4 bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white p-2 rounded-lg border border-slate-700 transition-colors"
                title="Enlarge clubhouse photo"
              >
                <Maximize2 size={16} />
              </button>
            </div>

            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Architectural Landmark
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Exclusive 5-Level Clubhouse Experience
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Rising beside the residential towers, the standalone clubhouse features a striking contemporary facade with perforated jaali solar screens and floor-to-ceiling glass pavilions. Within its 5 levels, residents discover curated comforts for every generation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-sm">Swimming Pool</span>
                  <span className="text-slate-400">With separate kids' splash pool</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-sm">3 Guest Suites</span>
                  <span className="text-slate-400">Accommodate visiting family</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-sm">Co-Working Pods</span>
                  <span className="text-slate-400">Quiet remote work spaces</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-bold block text-sm">Rooftop Garden</span>
                  <span className="text-slate-400">Terrace seating &amp; breeze</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  onClick={() => openEnquiry("Clubhouse Enquiry")}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-6 py-2.5"
                >
                  Explore Clubhouse Amenities
                </Button>
                <Button
                  onClick={() => setBrochureModalOpen(true)}
                  className="bg-slate-900 border border-slate-700 hover:border-amber-400 text-amber-400 font-bold text-xs sm:text-sm px-5 py-2.5"
                >
                  <Download size={15} className="mr-1.5" /> Download Fact Sheet
                </Button>
              </div>
            </div>
          </div>

          {/* 50+ Modern Amenities Categorized Grid */}
          <div id="amenities" className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Comprehensive Lifestyle Catalog
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                50+ Curated Modern Amenities
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenityCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-4 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5 text-white font-bold text-base">
                        {cat.icon}
                        <span>{cat.category}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {cat.badge}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800/80">
                    Compliant with HMDA &amp; TS RERA approved layout standards
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. "WHERE EVERYDAY LIVING RISES" — OFFICIAL VIDEO WALKTHROUGH */}
      <section id="video-tour" className="py-16 md:py-24 bg-[#0B101D] border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8 text-center">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Virtual Walkthrough
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Where Everyday Living Rises
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Watch the official video tour to explore the flats, community layout, amenities, and everything that makes Canny Aravindam your ideal home.
            </p>
          </div>

          {/* YouTube Video Embed Frame */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl aspect-video bg-slate-950">
            <iframe
              src="https://www.youtube.com/embed/pOtmz14ilqs?rel=0&modestbranding=1"
              title="Canny Aravindam Bowrampet Official Video Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://www.youtube.com/watch?v=pOtmz14ilqs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg"
            >
              <Play size={16} /> Open on YouTube
            </a>
            <Button
              onClick={() => openEnquiry("Video Section Site Visit")}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg"
            >
              Book Physical Site Visit
            </Button>
          </div>
        </div>
      </section>

      {/* 10. "LET EVERY FINISH ADD STRENGTH, STYLE, AND SPIRIT" — VERBATIM SPECIFICATIONS */}
      <section id="specifications" className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Construction Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Let Every Finish Add Strength, Style, and Spirit to Your Space
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Engineered with premium branded materials, RCC earthquake-resistant frameworks, concealed copper utilities, and water conservation systems.
            </p>
          </div>

          {/* Specifications Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-2">
            {specificationsData.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setActiveSpecTab(spec.id)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSpecTab === spec.id
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {spec.icon}
                <span>{spec.title}</span>
              </button>
            ))}
          </div>

          {/* Active Specification Detail Card */}
          <div className="max-w-4xl mx-auto bg-[#0B101D] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
            {specificationsData
              .filter((s) => s.id === activeSpecTab)
              .map((spec) => (
                <div key={spec.id} className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <span className="text-amber-400">{spec.icon}</span>
                    <h3 className="text-xl font-bold text-white">{spec.title}</h3>
                  </div>

                  <div className="grid gap-3">
                    {spec.details.map((d, i) => (
                      <div
                        key={i}
                        className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <span className="text-amber-400 font-bold text-xs sm:w-1/3">
                          {d.label}
                        </span>
                        <span className="text-slate-300 text-xs sm:w-2/3 leading-relaxed">
                          {d.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 11. "LIVE AT THE HEARTBEAT OF CONVENIENCE" — LOCATION ADVANTAGE & MAP */}
      <section id="location" className="py-16 md:py-24 bg-[#0B101D] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Strategic Location
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Live at the Heartbeat of <span className="text-amber-400">Convenience &amp; Connectivity</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Perfectly placed near the Outer Ring Road (ORR Exit 4A), Canny Aravindam keeps you effortlessly connected to Hyderabad's prime destinations, top schools, healthcare, and IT corridors.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Specific Address & Distance Matrix */}
            <div className="lg:col-span-6 space-y-6">
              {/* Site Address Card */}
              <div className="bg-[#090D16] p-5 rounded-2xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin size={14} /> Official Site Address
                </span>
                <p className="text-white font-bold text-sm sm:text-base">
                  {SITE_ADDRESS}
                </p>
                <p className="text-xs text-slate-400">
                  Geo Coordinates: 17.5735715° N, 78.3960389° E • Near Creek Planet School (Mercury Campus)
                </p>
              </div>

              {/* Categorized Proximity Grids */}
              <div className="grid sm:grid-cols-2 gap-4">
                {locationAdvantages.map((cat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#090D16] p-4 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-white font-bold text-xs border-b border-slate-800 pb-2">
                      {cat.icon}
                      <span>{cat.category}</span>
                    </div>
                    <ul className="space-y-2 text-xs">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-center justify-between gap-1 text-slate-300">
                          <span className="truncate">{item.title}</span>
                          <span className="text-amber-400 font-bold shrink-0">{item.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Google Map Embed centered on Bowrampet */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl h-[420px] bg-slate-950">
                <iframe
                  title="Canny Aravindam Bowrampet Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68542.96449368818!2d78.3442694950969!3d17.563617739512146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f533d3f1e91%3A0xe14704b98c3c41c3!2sCanny%20Aravindam!5e0!3m2!1sen!2sin!4v1763413332098!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span>Direct Site Coordinates: 17.5735715, 78.3960389</span>
                <a
                  href="https://maps.google.com/?q=17.5735715,78.3960389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold inline-flex items-center gap-1"
                >
                  Open in Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. PROJECT GALLERY — SPOTLIGHT ON UPLOADED MEDIA */}
      <section id="gallery" className="py-16 md:py-24 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Visual Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Canny Aravindam Project Gallery
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Authorized architectural elevations, 5-level jaali clubhouse, and official marketing collateral.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item.src)}
                className="group bg-[#0B101D] border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-slate-950">
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-amber-400 border border-amber-500/30">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 p-1.5 rounded-lg text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Maximize2 size={16} />
                  </div>
                </div>
                <div className="p-4 space-y-1 text-left">
                  <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-snug">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. DEVELOPER PROFILE & STATUTORY COMPLIANCE */}
      <section id="developer" className="py-16 bg-[#0B101D] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-8 items-stretch">
          {/* Builder Profile */}
          <div className="bg-[#090D16] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                About The Developer
              </span>
              <h3 className="text-2xl font-black text-white">{DEVELOPER_NAME}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Canny Life Spaces is a premier real estate development enterprise in Hyderabad recognized for delivering design-driven, high-value residential communities. Built on core principles of customer-centric layouts, transparent transactions, robust engineering, and sustainable living standards, Canny Life Spaces creates vibrant modern environments across Hyderabad's fastest-growing corridors.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                <span className="text-slate-400 block font-semibold">Corporate Office:</span>
                <span className="text-slate-200 block">{CORPORATE_OFFICE}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <Link
                to="/canny-life-spaces-projects-hyderabad"
                className="text-amber-400 hover:text-amber-300 text-sm font-bold inline-flex items-center gap-1.5"
              >
                View all Canny Life Spaces Projects in Hyderabad <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* RERA Compliance */}
          <div className="bg-[#090D16] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                Government Compliance
              </span>
              <h3 className="text-2xl font-black text-white">Telangana RERA &amp; HMDA Approved</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Canny Aravindam is an officially registered project under the Telangana State Real Estate Regulatory Authority. Buyers can review title disclosures, approved building layouts, sanction orders, and phase milestones on the official government website.
              </p>
              <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl space-y-1">
                <span className="text-xs text-slate-400 block font-medium">TS RERA Registration Number</span>
                <span className="text-amber-400 font-black text-lg block">{RERA_NO}</span>
                <span className="text-[11px] text-slate-400 block">Website: rera.telangana.gov.in</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <a
                href="https://rera.telangana.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-amber-400 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                Verify on Telangana RERA Portal <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="py-16 md:py-20 bg-[#090D16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Buyer Guide &amp; Clarifications
            </span>
            <h2 className="text-3xl font-black text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-[#0B101D] border border-slate-800 rounded-xl px-5"
              >
                <AccordionTrigger className="text-white hover:text-amber-400 font-bold text-left py-4 text-sm sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 text-xs sm:text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 15. INTERNAL LINKING & ADJACENT CLUSTERS */}
      <section className="py-16 bg-[#070B14] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Explore Related Hyderabad Real Estate Hubs
            </h2>
            <p className="text-xs text-slate-400">
              Browse verified residential developments, location guides, and builder profiles across North-West Hyderabad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <Link
              to="/projects/aritha-gbr-dhanwin-towers-bowrampet-hyderabad"
              className="bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl block transition-all"
            >
              <span className="text-amber-400 font-bold block">Aritha Dhanwin Towers</span>
              <span className="text-slate-400 text-[11px] mt-1 block">Bowrampet • 2 &amp; 3 BHK Gated Community</span>
            </Link>

            <Link
              to="/projects/candeur-eternia-bachupally-hyderabad"
              className="bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl block transition-all"
            >
              <span className="text-amber-400 font-bold block">Candeur Eternia</span>
              <span className="text-slate-400 text-[11px] mt-1 block">Bachupally • High-rise 2 &amp; 3 BHK</span>
            </Link>

            <Link
              to="/projects/aspire-spaces-a3-bachupally"
              className="bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl block transition-all"
            >
              <span className="text-amber-400 font-bold block">Aspire Spaces A3</span>
              <span className="text-slate-400 text-[11px] mt-1 block">Bachupally • Premium 2 &amp; 3 BHK</span>
            </Link>

            <Link
              to="/projects/sanvis-kowsalya-vasudha-mallampet"
              className="bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl block transition-all"
            >
              <span className="text-amber-400 font-bold block">Sanvi Kowsalya Vasudha</span>
              <span className="text-slate-400 text-[11px] mt-1 block">Mallampet • 2 &amp; 3 BHK Apartments</span>
            </Link>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              to="/projects-in-bowrampet"
              className="px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-amber-500 text-slate-300 font-semibold"
            >
              Projects in Bowrampet
            </Link>
            <Link
              to="/hyderabad/bowrampet/2-bhk-flats"
              className="px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-amber-500 text-slate-300 font-semibold"
            >
              2 BHK Flats in Bowrampet
            </Link>
            <Link
              to="/hyderabad/bowrampet/3-bhk-flats"
              className="px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-amber-500 text-slate-300 font-semibold"
            >
              3 BHK Flats in Bowrampet
            </Link>
            <Link
              to="/hyderabad/2-bhk-flats"
              className="px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-amber-500 text-slate-300 font-semibold"
            >
              2 BHK Flats in Hyderabad
            </Link>
            <Link
              to="/hyderabad/3-bhk-flats"
              className="px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-amber-500 text-slate-300 font-semibold"
            >
              3 BHK Flats in Hyderabad
            </Link>
            <Link
              to="/canny-life-spaces-projects-hyderabad"
              className="px-3.5 py-1.5 rounded-full border border-slate-800 hover:border-amber-500 text-amber-400 font-semibold"
            >
              Canny Life Spaces Projects
            </Link>
          </div>
        </div>
      </section>

      {/* 16. FINAL CALL TO ACTION BANNER */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-5">
          <span className="text-xs font-black tracking-widest uppercase bg-slate-950 text-amber-400 px-3 py-1 rounded-full inline-block">
            Connect Today &amp; Move Your Dreams into Motion
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">
            Schedule Your Guided Site Visit to Canny Aravindam
          </h2>
          <p className="text-slate-900 text-sm sm:text-base font-bold max-w-2xl mx-auto">
            Zero buyer brokerage. Receive official floor plans, unit availability, and builder price sheet directly on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              onClick={() => openEnquiry("Bottom CTA Site Visit")}
              className="bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-sm sm:text-base px-8 py-3.5 h-auto rounded-xl shadow-2xl"
            >
              Book Site Visit
            </Button>
            <a
              href={WA_URL(defaultWaMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-2xl inline-flex items-center gap-2"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="bg-slate-950 border border-slate-800 text-white font-black text-sm sm:text-base px-7 py-3.5 rounded-xl inline-flex items-center gap-2"
            >
              <Phone size={18} /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* 17. MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090D16]/95 backdrop-blur-xl border-t border-amber-500/30 p-2.5 grid grid-cols-3 gap-2 shadow-2xl">
        <a
          href={`tel:${PHONE}`}
          className="flex flex-col items-center justify-center bg-slate-900 border border-amber-500/40 text-amber-400 py-2 rounded-xl text-xs font-bold"
        >
          <Phone size={16} />
          <span>Call</span>
        </a>
        <a
          href={WA_URL(defaultWaMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-emerald-600 text-white py-2 rounded-xl text-xs font-bold"
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => openEnquiry("Mobile Sticky Bar")}
          className="flex flex-col items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 py-2 rounded-xl text-xs font-extrabold"
        >
          <Calendar size={16} />
          <span>Site Visit</span>
        </button>
      </div>

      {/* 18. FULL-RESOLUTION LIGHTBOX ZOOM MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Canny Aravindam enlarged view"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-amber-500/30"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-slate-900/90 text-white rounded-full p-2.5 hover:bg-amber-500 hover:text-slate-950 transition-colors border border-slate-700"
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>
            <div className="mt-3 text-center text-xs text-slate-400">
              Press anywhere outside or click Close to return to page
            </div>
          </div>
        </div>
      )}

      <ProjectsFooter />
      <WhatsAppButton />

      {/* Modals */}
      <LeadCapturePopup
        open={leadModalOpen}
        onOpenChange={setLeadModalOpen}
        source={leadSource}
        projectName={PROJECT_NAME}
      />

      <BrochureGateModal
        open={brochureModalOpen}
        onOpenChange={setBrochureModalOpen}
        brochureUrl={cannyBrochure}
        projectName={PROJECT_NAME}
      />
    </>
  );
};

export default CannyAravindamPage;
