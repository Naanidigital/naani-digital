import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Bath,
  Layers,
  Users,
  TreePine,
  Sparkles,
  ArrowUpDown,
  Dumbbell,
  Wind,
  Activity,
  Gamepad2,
  Baby,
  Phone as PhoneIcon,
  MessageCircle,
  Download,
  Calendar,
  MapPin,
  Train,
  School,
  ShoppingCart,
  Cross,
  ChevronRight,
  IndianRupee,
  Ruler,
  CheckCircle2,
  Shield,
  Zap,
  Car,
  Waves,
  Trees,
  Music,
  BookOpen,
  Flower2,
  BatteryCharging,
  Video,
  Bell,
  Droplets,
  SunMedium,
  Flame,
  Trophy,
  Briefcase,
  Landmark,
  TrendingUp,
  Heart,
  Award,
  Building,
} from "lucide-react";
import ProjectsHeader from "@/components/ProjectsHeader";
import StickyContact from "@/components/tridasa/StickyContact";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAANI_PHONE, NAANI_WA } from "@/lib/leadProfile";
import { Link } from "react-router-dom";

import elevation from "@/assets/aritha-dhanwin/elevation-aerial.jpg.asset.json";
import facadeNight from "@/assets/aritha-dhanwin/facade-night.jpg.asset.json";
import courtyard from "@/assets/aritha-dhanwin/courtyard-night.jpg.asset.json";
import garden from "@/assets/aritha-dhanwin/garden-day.jpg.asset.json";
import facadeDay from "@/assets/aritha-dhanwin/facade-day.jpg.asset.json";
import specs from "@/assets/aritha-dhanwin/specifications.jpg.asset.json";
import fp13 from "@/assets/aritha-dhanwin/floorplans-block-1-3.jpg.asset.json";
import fp46 from "@/assets/aritha-dhanwin/floorplans-block-4-6.jpg.asset.json";
import fp79 from "@/assets/aritha-dhanwin/floorplans-block-7-9.jpg.asset.json";

const PROJECT = "Aritha GBR Dhanwin Towers";
const LOCATION = "Bowrampet, Hyderabad";
const PAGE_URL =
  "https://www.naani.in/projects/aritha-gbr-dhanwin-towers-bowrampet-hyderabad";
const RERA = "P02200005853";

const FACTS = [
  { icon: Layers, label: "Land Parcel", value: "4.7 Acres" },
  { icon: Building2, label: "Towers", value: "9 Blocks" },
  { icon: Home, label: "Apartments", value: "~470 Units" },
  { icon: Ruler, label: "Sizes", value: "1165 – 2355 Sq.Ft." },
  { icon: Award, label: "RERA", value: RERA },
];

const HIGHLIGHTS = [
  { icon: Shield, title: "Premium Gated Community" },
  { icon: Layers, title: "4.7 Acres Land Parcel" },
  { icon: Building2, title: "9 Residential Towers" },
  { icon: Home, title: "~470 Apartments" },
  { icon: Trophy, title: "Premium Clubhouse" },
  { icon: Waves, title: "Swimming Pool" },
  { icon: Activity, title: "Indoor & Outdoor Sports" },
  { icon: Trees, title: "Landscaped Gardens" },
  { icon: Baby, title: "Children's Play Area" },
  { icon: Shield, title: "24×7 Security" },
  { icon: BatteryCharging, title: "Power Backup" },
  { icon: ArrowUpDown, title: "High Speed Elevators" },
  { icon: Car, title: "Covered Car Parking" },
];

const CONFIGS = [
  {
    type: "2 BHK",
    color: "from-blue-500/20 to-blue-700/5",
    sizes: ["1165 Sq.Ft.", "1225 Sq.Ft."],
  },
  {
    type: "3 BHK",
    color: "from-amber-500/20 to-amber-700/5",
    sizes: [
      "1200 Sq.Ft.",
      "1285 Sq.Ft.",
      "1395 Sq.Ft.",
      "1570 Sq.Ft.",
      "1650 Sq.Ft.",
      "1730 Sq.Ft.",
      "1945 Sq.Ft.",
      "2355 Sq.Ft.",
    ],
  },
];

const AMENITIES = [
  { icon: Waves, label: "Swimming Pool" },
  { icon: Waves, label: "Kids Pool" },
  { icon: Trophy, label: "Clubhouse" },
  { icon: Dumbbell, label: "Gymnasium" },
  { icon: Gamepad2, label: "Indoor Games" },
  { icon: Activity, label: "Badminton Court" },
  { icon: Music, label: "Multipurpose Hall" },
  { icon: Trees, label: "Party Lawn" },
  { icon: Activity, label: "Jogging Track" },
  { icon: Activity, label: "Cycling Track" },
  { icon: Wind, label: "Yoga Deck" },
  { icon: Heart, label: "Meditation Area" },
  { icon: Baby, label: "Children Play Area" },
  { icon: Users, label: "Senior Citizen Seating" },
  { icon: Trophy, label: "Cricket Practice Area" },
  { icon: Flower2, label: "Landscaped Gardens" },
  { icon: Music, label: "Amphitheatre" },
  { icon: BookOpen, label: "Library" },
  { icon: Baby, label: "Creche" },
  { icon: Zap, label: "EV Charging Provision" },
  { icon: BatteryCharging, label: "Power Backup" },
  { icon: Video, label: "CCTV Surveillance" },
  { icon: Shield, label: "24×7 Security" },
  { icon: Car, label: "Visitor Parking" },
  { icon: Droplets, label: "Rain Water Harvesting" },
  { icon: Droplets, label: "STP" },
  { icon: SunMedium, label: "Solar Lighting" },
  { icon: ArrowUpDown, label: "Lift" },
  { icon: Flame, label: "Fire Safety System" },
  { icon: Bell, label: "Intercom" },
  { icon: Video, label: "Video Door Phone" },
  { icon: Droplets, label: "Water Treatment Plant" },
];

const SPECS = [
  {
    title: "Flooring",
    items: ["Large Vitrified Tiles in Living, Dining & Bedrooms"],
  },
  {
    title: "Kitchen",
    items: [
      "Granite Platform",
      "Stainless Steel Sink",
      "Provision for Water Purifier",
    ],
  },
  {
    title: "Bedrooms",
    items: ["Premium Vitrified Flooring", "Wooden Finish Doors"],
  },
  {
    title: "Bathrooms",
    items: [
      "Anti Skid Flooring",
      "Premium CP Fittings",
      "Branded Sanitary Ware",
    ],
  },
  { title: "Windows", items: ["UPVC Windows with mosquito mesh provision"] },
  { title: "Painting", items: ["Premium Emulsion Paint (Interior & Exterior)"] },
  {
    title: "Electrical",
    items: [
      "Concealed Copper Wiring",
      "Modular Switches",
      "AC Provision in Bedrooms",
    ],
  },
  {
    title: "Doors",
    items: ["Teak Wood Main Door", "Engineered Internal Doors"],
  },
];

const LOCATION_BENEFITS = [
  { icon: School, title: "Shikara School", desc: "3 min drive" },
  { icon: Cross, title: "SLG Hospital", desc: "12 min drive" },
  { icon: MapPin, title: "Patancheru", desc: "15 min drive" },
  { icon: Train, title: "Miyapur Metro", desc: "~20 min drive" },
  { icon: MapPin, title: "ORR Exit", desc: "Nearby" },
  { icon: MapPin, title: "Bachupally", desc: "Nearby" },
  { icon: MapPin, title: "Kompally", desc: "Nearby" },
  { icon: MapPin, title: "Kukatpally", desc: "Easy connectivity" },
  { icon: Briefcase, title: "HITEC City", desc: "Excellent connectivity" },
];

const WHY_BUY = [
  { icon: Home, title: "Large, Efficient Apartments" },
  { icon: MapPin, title: "Prime Bowrampet Location" },
  { icon: Building, title: "Premium Construction Quality" },
  { icon: TrendingUp, title: "High Appreciation Potential" },
  { icon: IndianRupee, title: "Excellent Rental Demand" },
  { icon: School, title: "Close to Reputed Schools" },
  { icon: Cross, title: "Close to Hospitals" },
  { icon: MapPin, title: "Near ORR & Regional Ring Road" },
  { icon: Briefcase, title: "Near IT Corridor" },
  { icon: Trophy, title: "Modern Lifestyle Amenities" },
  { icon: Users, title: "Family-Friendly Community" },
  { icon: Award, title: "Trusted Builder" },
];

const FAQS = [
  {
    q: "What configurations are available at Aritha GBR Dhanwin Towers?",
    a: "Aritha GBR Dhanwin Towers offers thoughtfully planned 2 BHK apartments (1165 – 1225 sq.ft.) and 3 BHK apartments (1200 – 2355 sq.ft.) across 9 residential blocks in Bowrampet, Hyderabad.",
  },
  {
    q: "Is Aritha GBR Dhanwin Towers RERA approved?",
    a: `Yes. The project is registered with the Telangana State RERA under registration number ${RERA}.`,
  },
  {
    q: "What is the possession date?",
    a: "Possession is scheduled for September 2025 (Ready Soon). Construction is in the final phase — a limited window is available for buyers seeking near-ready inventory.",
  },
  {
    q: "What amenities are available?",
    a: "Residents enjoy a premium clubhouse, swimming pool, kids pool, gymnasium, indoor games, badminton court, jogging & cycling tracks, yoga deck, cricket practice area, children's play area, landscaped gardens, amphitheatre, library, creche, EV charging, 24×7 CCTV security, power backup and more.",
  },
  {
    q: "Is home loan available for Aritha GBR Dhanwin Towers?",
    a: "Yes. The project is approved by leading banks and NBFCs including SBI, HDFC, ICICI, Axis and LIC Housing Finance. Our team assists with end-to-end loan documentation and disbursement.",
  },
  {
    q: "Where exactly is the project located?",
    a: "Aritha GBR Dhanwin Towers is located in Bowrampet, Hyderabad — well connected to Bachupally, Miyapur, Kompally, Kukatpally, ORR and the western IT corridor including HITEC City.",
  },
  {
    q: "What are the nearby schools?",
    a: "Shikara School is just 3 minutes away, along with several reputed CBSE and IB curriculum schools within a 5–15 minute drive across Bachupally and Miyapur.",
  },
  {
    q: "What are the nearby hospitals?",
    a: "SLG Hospital is 12 minutes away. Other multi-speciality hospitals including Pranaam, Remedy and Malla Reddy Narayana are within a short drive.",
  },
  {
    q: "Is Aritha GBR Dhanwin Towers a good investment?",
    a: "Bowrampet is one of Hyderabad's fastest-growing western residential corridors with strong rental demand from IT professionals, rising land values and excellent ORR + Regional Ring Road connectivity — making it well-suited for both end-users and investors.",
  },
  {
    q: "Can I schedule a site visit?",
    a: "Yes. Click 'Schedule Site Visit' anywhere on this page or call +91 97050 80909 to arrange a personalised on-site walkthrough at your convenient time.",
  },
];

const GALLERY = [
  { src: elevation.url, alt: "Aritha GBR Dhanwin Towers Bowrampet — aerial elevation view" },
  { src: facadeNight.url, alt: "Aritha GBR Dhanwin Towers night facade Bowrampet Hyderabad" },
  { src: courtyard.url, alt: "Aritha GBR Dhanwin Towers landscaped central courtyard" },
  { src: garden.url, alt: "Aritha GBR Dhanwin Towers gardens and open spaces" },
  { src: facadeDay.url, alt: "Aritha GBR Dhanwin Towers day facade Bowrampet" },
  { src: specs.url, alt: "Aritha GBR Dhanwin Towers specifications" },
];

const INTERNAL_LINKS = [
  { label: "Apartments in Bowrampet", to: "/projects" },
  { label: "Apartments in Bachupally", to: "/projects/candeur-eternia-bachupally-hyderabad" },
  { label: "Apartments in Miyapur", to: "/projects/team4-aria-miyapur-luxury-apartments-hyderabad" },
  { label: "2 BHK Apartments Hyderabad", to: "/projects" },
  { label: "3 BHK Apartments Hyderabad", to: "/projects" },
  { label: "Projects Near ORR", to: "/projects" },
];

const ArithaDhanwinTowersPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("Hero CTA");
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  const openLead = (source: string) => {
    setPopupSource(source);
    setPopupOpen(true);
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Residence",
      name: PROJECT,
      description:
        "Premium 2 & 3 BHK apartments (1165 – 2355 sq.ft.) in Bowrampet, Hyderabad. 4.7 acres, 9 residential towers, ~470 units, clubhouse, swimming pool, landscaped gardens.",
      url: PAGE_URL,
      image: [elevation.url, facadeNight.url, courtyard.url, garden.url],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bowrampet",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500043",
        addressCountry: "IN",
      },
      brand: { "@type": "Brand", name: "Aritha Developers LLP" },
      provider: {
        "@type": "RealEstateAgent",
        name: "Naani Projects",
        telephone: NAANI_PHONE,
      },
      floorSize: {
        "@type": "QuantitativeValue",
        minValue: 1165,
        maxValue: 2355,
        unitCode: "FTK",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Apartment",
      name: PROJECT,
      numberOfRooms: "2-3",
      floorSize: {
        "@type": "QuantitativeValue",
        minValue: 1165,
        maxValue: 2355,
        unitCode: "FTK",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bowrampet, Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: PROJECT,
      image: elevation.url,
      url: PAGE_URL,
      description:
        "Premium 2 & 3 BHK apartments in Bowrampet, Hyderabad by Aritha Developers LLP.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bowrampet, Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      provider: { "@type": "Organization", name: "Naani Projects" },
    },

    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
        { "@type": "ListItem", position: 3, name: PROJECT, item: PAGE_URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Naani Projects",
      telephone: NAANI_PHONE,
      url: "https://www.naani.in",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Aritha GBR Dhanwin Towers Bowrampet | 2 & 3 BHK Flats"
        description="Explore Aritha GBR Dhanwin Towers in Bowrampet, Hyderabad. Premium 2 & 3 BHK apartments from 1165 to 2355 sq.ft with clubhouse, swimming pool, landscaped gardens and excellent connectivity. Schedule a site visit today."
        canonicalUrl={PAGE_URL}
        keywords="Aritha GBR Dhanwin Towers, apartments in Bowrampet, 2 BHK Bowrampet, 3 BHK Bowrampet, flats near Miyapur, apartments near ORR Hyderabad, ready to move apartments Hyderabad, Bachupally apartments, Kompally apartments, gated community Bowrampet"
        ogImage={elevation.url}
        structuredData={structuredData}
      />

      <ProjectsHeader />
      <StickyContact />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={elevation.url}
            alt="Aritha GBR Dhanwin Towers Bowrampet Hyderabad aerial elevation"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Ready Soon · Bowrampet, Hyderabad
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4">
              <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Aritha GBR
              </span>
              <br />
              <span className="text-foreground">Dhanwin Towers</span>
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 mb-3 font-light">
              Luxury 2 & 3 BHK Apartments in Bowrampet
            </p>
            <p className="text-sm md:text-base text-muted-foreground mb-8">
              Sizes from <strong className="text-foreground">1,165 Sq.Ft.</strong> up to{" "}
              <strong className="text-foreground">2,355 Sq.Ft.</strong> · RERA {RERA}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="bg-background/50 backdrop-blur-md border border-amber-500/20 rounded-xl p-3 md:p-4"
                >
                  <f.icon className="w-5 h-5 text-amber-500 mb-2" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </div>
                  <div className="text-sm md:text-base font-semibold">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                onClick={() => openLead("Hero · Site Visit")}
                data-lead-gate="sitevisit"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-6 py-6 shadow-lg shadow-amber-900/30"
              >
                <Calendar className="w-4 h-4 mr-2" /> Schedule Site Visit
              </Button>
              <Button
                onClick={() => openLead("Hero · Brochure")}
                data-lead-gate="brochure"
                variant="outline"
                className="border-amber-500/50 hover:bg-amber-500/10 px-6 py-6"
              >
                <Download className="w-4 h-4 mr-2" /> Download Brochure
              </Button>
              <Button
                onClick={() => openLead("Hero · WhatsApp")}
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-6 py-6"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Now
              </Button>
              <a
                href={`tel:${NAANI_PHONE}`}
                className="call-btn inline-flex items-center gap-2 px-6 py-3 rounded-md border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 font-semibold"
              >
                <PhoneIcon className="w-4 h-4" /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background to-background/60">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Project Highlights
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                What makes it{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  exceptional
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-amber-500/40 rounded-2xl p-5 transition-all hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition">
                  <h.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-sm md:text-base font-semibold text-foreground/90">
                  {h.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal variant="slideLeft">
              <img
                src={facadeNight.url}
                alt="Aritha GBR Dhanwin Towers facade night Bowrampet Hyderabad"
                className="rounded-2xl shadow-2xl shadow-amber-900/20 border border-amber-500/10"
                loading="lazy"
              />
            </ScrollReveal>
            <ScrollReveal variant="slideRight">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Overview
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Aritha GBR Dhanwin Towers
                </span>
              </h2>
              <p className="text-foreground/75 leading-relaxed mb-4">
                <strong className="text-foreground">Aritha GBR Dhanwin Towers</strong> is a premium
                gated community located in <strong className="text-foreground">Bowrampet, Hyderabad</strong>,
                designed for families seeking spacious homes, modern amenities and excellent
                connectivity to Miyapur, Bachupally, ORR and the western IT corridor.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Spread across approximately <strong className="text-foreground">4.7 acres</strong> with{" "}
                <strong className="text-foreground">9 residential towers</strong> and around{" "}
                <strong className="text-foreground">470 apartments</strong>, the project offers
                thoughtfully planned 2 & 3 BHK apartments with efficient layouts, cross ventilation
                and lifestyle amenities. Residents benefit from landscaped open spaces, a premium
                clubhouse, swimming pool, gymnasium, children's play area, indoor games, jogging
                track and multiple recreational spaces.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-8">
                Excellent access to reputed schools, multi-speciality hospitals, shopping
                destinations and employment hubs makes Aritha GBR Dhanwin Towers equally suitable
                for end-users and investors. RERA registered: <strong className="text-foreground">{RERA}</strong>.
              </p>
              <Button
                onClick={() => openLead("Overview CTA")}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-6 py-6"
              >
                Get Complete Details <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CONFIGURATIONS */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background/60 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Unit Configurations
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Choose your{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  perfect home
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {CONFIGS.map((c) => (
              <div
                key={c.type}
                className={`rounded-2xl border border-white/10 bg-gradient-to-br ${c.color} backdrop-blur-md p-8`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                    <Home className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">{c.type}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {c.sizes.length} floor plan variants
                    </div>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {c.sizes.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2 text-sm text-foreground/85 bg-background/40 rounded-lg px-3 py-2 border border-white/5"
                    >
                      <Ruler className="w-3.5 h-3.5 text-amber-400" /> {s}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => openLead(`${c.type} · Floor Plan`)}
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Floor Plan
                  </Button>
                  <Button
                    onClick={() => openLead(`${c.type} · Enquire`)}
                    size="sm"
                    variant="outline"
                    className="border-amber-500/50"
                  >
                    Enquire Now
                  </Button>
                  <Button
                    onClick={() => openLead(`${c.type} · Brochure`)}
                    size="sm"
                    variant="outline"
                    data-lead-gate="brochure"
                    className="border-amber-500/50"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Brochure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Amenities
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                A resort-style{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  lifestyle
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {AMENITIES.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="group flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <a.icon className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground/85">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background to-background/70">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <ScrollReveal variant="slideLeft" className="lg:col-span-2">
              <img
                src={specs.url}
                alt="Aritha GBR Dhanwin Towers premium specifications"
                className="rounded-2xl border border-amber-500/10 shadow-xl"
                loading="lazy"
              />
            </ScrollReveal>
            <div className="lg:col-span-3">
              <ScrollReveal>
                <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                  Specifications
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-8">
                  Where quality is{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    in the details
                  </span>
                </h2>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {SPECS.map((s) => (
                  <div
                    key={s.title}
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-5"
                  >
                    <div className="text-amber-400 font-semibold mb-2">{s.title}</div>
                    <ul className="space-y-1.5">
                      {s.items.map((i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Location Advantages
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Bowrampet · {" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  perfectly connected
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {LOCATION_BENEFITS.map((l, i) => (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition"
              >
                <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <l.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="font-semibold">{l.title}</div>
                  <div className="text-sm text-muted-foreground">{l.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl">
              <iframe
                title="Aritha GBR Dhanwin Towers Bowrampet location on Google Maps"
                src="https://www.google.com/maps?q=Bowrampet,+Hyderabad,+Telangana&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRICE */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background/70 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-amber-500/10 via-background to-background border border-amber-500/30 rounded-3xl p-10 md:p-14 backdrop-blur-md">
              <IndianRupee className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-bold mb-3">Price on Request</h2>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Get the latest per-sq.ft. pricing, floor-wise variations, EMI plans and
                pre-negotiated offers directly from our Naani Projects expert.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {[
                  { icon: IndianRupee, label: "Request Latest Price" },
                  { icon: Landmark, label: "Bank Loan Assistance" },
                  { icon: TrendingUp, label: "Price Breakup" },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="bg-white/[0.04] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2"
                  >
                    <p.icon className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-medium">{p.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => openLead("Price · Request")}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-6"
                >
                  Request Price
                </Button>
                <Button
                  onClick={() => openLead("Price · EMI")}
                  variant="outline"
                  className="border-amber-500/50 px-6 py-6"
                >
                  EMI Calculator
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Gallery
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Life at{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Dhanwin
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map((g, i) => (
              <motion.button
                key={i}
                onClick={() => setZoomImg(g.src)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-amber-500/40 transition ${
                  i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FLOOR PLANS */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background to-background/70">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Floor Plans
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Detailed{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  layouts
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <Accordion type="single" collapsible defaultValue="fp-1" className="space-y-3">
            {[
              { key: "fp-1", label: "Blocks 1, 2 & 3 · 2 & 3 BHK Floor Plans", img: fp13.url },
              { key: "fp-2", label: "Blocks 4, 5 & 6 · 2 & 3 BHK Floor Plans", img: fp46.url },
              { key: "fp-3", label: "Blocks 7, 8 & 9 · 2 & 3 BHK Floor Plans", img: fp79.url },
            ].map((fp) => (
              <AccordionItem
                key={fp.key}
                value={fp.key}
                className="border border-amber-500/20 rounded-xl bg-white/[0.03] px-5"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{fp.label}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <button
                    onClick={() => setZoomImg(fp.img)}
                    className="block w-full rounded-lg overflow-hidden border border-white/10 mb-4"
                  >
                    <img
                      src={fp.img}
                      alt={fp.label}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </button>
                  <Button
                    onClick={() => openLead(`Floor Plan · ${fp.label}`)}
                    data-lead-gate="brochure"
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Floor Plan
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* MASTER PLAN */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Master Plan
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                9 Towers ·{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  4.7 acres
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <button
            onClick={() => setZoomImg(garden.url)}
            className="block w-full rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl"
          >
            <img
              src={garden.url}
              alt="Aritha GBR Dhanwin Towers master plan and landscaping"
              className="w-full h-auto"
              loading="lazy"
            />
          </button>
        </div>
      </section>

      {/* WHY BUY */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background/70 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                Why Buy Here
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Why{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Aritha GBR Dhanwin
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_BUY.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <w.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-semibold text-foreground/90">{w.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDER */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
              Builder Profile
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
              Aritha{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Developers LLP
              </span>
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-4">
              Aritha Developers LLP is a Hyderabad-based residential real estate developer focused
              on building thoughtfully-planned gated communities across the city's fast-growing
              western and northern corridors. The team combines strong construction quality,
              modern architectural planning and customer-centric design to deliver homes that
              balance comfort, functionality and long-term value.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              With a clear commitment to on-time delivery, transparent documentation and RERA
              compliance, Aritha Developers has earned trust among home-buyers and investors alike.
              Aritha GBR Dhanwin Towers in Bowrampet reflects this philosophy — spacious 2 & 3 BHK
              layouts, resort-style amenities, curated landscaping, and a location that connects
              seamlessly to Hyderabad's key employment hubs and lifestyle destinations.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-background to-background/70">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">
                FAQ
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Frequently{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  asked
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-amber-500/20 rounded-xl bg-white/[0.03] px-5"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-500 mb-4">
              Explore More
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {INTERNAL_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-sm px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-500/50 hover:text-amber-400 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
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
            Experience elevated living at Aritha GBR Dhanwin Towers. Discover spacious 2 & 3 BHK luxury homes, premium amenities, and a vibrant community designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button data-lead-gate="sitevisit" onClick={() => openLead("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openLead("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href={`https://wa.me/${NAANI_WA}?text=Hi%2C%20I%27m%20interested%20in%20Aritha%20GBR%20Dhanwin%20Towers`} target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-6">
            <a href={`tel:${NAANI_PHONE}`} className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <PhoneIcon size={18} /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      <LeadCapturePopup
        open={popupOpen}
        onOpenChange={setPopupOpen}
        source={popupSource}
        projectName={PROJECT}
      />

      {/* Image zoom lightbox */}
      {zoomImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomImg(null)}
        >
          <img
            src={zoomImg}
            alt="Zoomed"
            className="max-w-full max-h-full object-contain rounded-lg" loading="lazy" decoding="async" />
        </div>
      )}
    </div>
  );
};

export default ArithaDhanwinTowersPage;
