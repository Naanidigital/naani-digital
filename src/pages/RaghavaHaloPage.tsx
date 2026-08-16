import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Bath,
  Compass,
  Layers,
  Users,
  Crown,
  TreePine,
  Sun,
  Sparkles,
  ArrowUpDown,
  Heart,
  Dumbbell,
  Wind,
  Activity,
  Stethoscope,
  Gamepad2,
  Film,
  Telescope,
  Flame,
  Spade,
  Brain,
  Lightbulb,
  Smile,
  Monitor,
  GraduationCap,
  Baby,
  Briefcase,
  BedDouble,
  Coffee,
  ShoppingBag,
  Dog,
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
} from "lucide-react";
import ProjectsHeader from "@/components/ProjectsHeader";
import StickyContact from "@/components/tridasa/StickyContact";
import SEOHead from "@/components/SEOHead";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NAANI_PHONE, NAANI_WA } from "@/lib/leadProfile";

// CDN-hosted hero & gallery
import heroFacade from "@/assets/raghava-halo/Image_1.jpg.asset.json";
import heroTowers from "@/assets/raghava-halo/Image_3.jpg.asset.json";
import heroLowAngle from "@/assets/raghava-halo/Image_4.jpg.asset.json";
import skyline from "@/assets/raghava-halo/Image_2.jpg.asset.json";
import facade2 from "@/assets/raghava-halo/Image_5.jpg.asset.json";
import towerCrown from "@/assets/raghava-halo/Image.jpg.asset.json";
import kidsPlay from "@/assets/raghava-halo/Raghava_Halo_KidsPlay_6.jpg.asset.json";
import pathway from "@/assets/raghava-halo/Raghava_Halo_Pathwaycam_6.jpg.asset.json";
import golf from "@/assets/raghava-halo/Raghava_Halo_TerraceGolf_6.jpg.asset.json";
import yoga from "@/assets/raghava-halo/Raghava_Halo_TerraceYoga02_6.jpg.asset.json";

const PROJECT = "Raghava Halo";
const LOCATION = "Kondapur, Hyderabad";
const PAGE_URL = "https://www.naani.in/projects/raghava-halo-kondapur-hyderabad";

const FACTS = [
  { icon: Layers, label: "Total Area", value: "5.14 Acres" },
  { icon: Building2, label: "Towers", value: "3 Iconic Towers" },
  { icon: ArrowUpDown, label: "Floors", value: "52 Residential" },
  { icon: Ruler, label: "Sizes", value: "1830 – 2455 Sq.Ft." },
  { icon: Home, label: "Configuration", value: "Premium 3 BHK" },
];

const HIGHLIGHTS = [
  { icon: Crown, title: "Premium 3 BHK Residences", desc: "Crafted for modern luxury living" },
  { icon: Ruler, title: "1830 – 2455 Sq.Ft.", desc: "Spacious carpet areas" },
  { icon: Bath, title: "Attached Bathrooms", desc: "Every bedroom · ensuite" },
  { icon: Sparkles, title: "Dedicated Pooja Space", desc: "Vaastu-aligned sanctity" },
  { icon: ArrowUpDown, title: "1:1 Lift Ratio", desc: "Zero wait times" },
  { icon: Users, title: "Only 4 Residences / Floor", desc: "In premium tower" },
  { icon: Compass, title: "60% Corner Residences", desc: "More light · more air" },
  { icon: TreePine, title: "Expansive Balconies", desc: "Luxury outdoor living" },
  { icon: CheckCircle2, title: "100% Vaastu Compliant", desc: "Every home" },
  { icon: Sun, title: "Just 30% Common Area", desc: "Maximum carpet efficiency" },
  { icon: Telescope, title: "Panoramic Balcony Views", desc: "Skyline & greens" },
  { icon: Compass, title: "East · West · North Facing", desc: "Choose your direction" },
];

const AMENITIES = [
  {
    title: "Wellness Retreat",
    color: "from-amber-500/15 to-amber-700/5",
    items: [
      { icon: Heart, label: "Red Light Therapy" },
      { icon: Wind, label: "Hyperbaric Oxygen Tank" },
      { icon: Sparkles, label: "Sensory Deprivation Tank" },
      { icon: Flame, label: "Sauna & Steam Room" },
      { icon: Activity, label: "Pilates Studio" },
      { icon: Activity, label: "Yoga Studio" },
      { icon: Dumbbell, label: "Gym" },
      { icon: Stethoscope, label: "Diagnostic Lounge" },
    ],
  },
  {
    title: "Social Arena",
    color: "from-purple-500/15 to-purple-700/5",
    items: [
      { icon: Spade, label: "Bowling Alley" },
      { icon: Gamepad2, label: "VR Gaming Arena" },
      { icon: Film, label: "Preview Theatre" },
      { icon: Telescope, label: "Rooftop Stargazing Deck" },
      { icon: Flame, label: "BBQ & Party Terrace" },
      { icon: Spade, label: "Cards Room" },
      { icon: Spade, label: "Billiards" },
      { icon: Gamepad2, label: "Arcade" },
    ],
  },
  {
    title: "Little Minds Studio",
    color: "from-emerald-500/15 to-emerald-700/5",
    items: [
      { icon: Lightbulb, label: "Thinkers & Makers Lab" },
      { icon: Brain, label: "Physical Intelligence Space" },
      { icon: Smile, label: "Emotional Intelligence Space" },
      { icon: Monitor, label: "Digital Classrooms" },
      { icon: GraduationCap, label: "Tuition Pods" },
      { icon: Baby, label: "Kids Play Zone" },
    ],
  },
  {
    title: "Lifestyle Essentials",
    color: "from-rose-500/15 to-rose-700/5",
    items: [
      { icon: Briefcase, label: "Co-working Spaces" },
      { icon: BedDouble, label: "Guest Rooms" },
      { icon: Coffee, label: "Juice Bar" },
      { icon: Coffee, label: "Outdoor Cafe" },
      { icon: ShoppingBag, label: "Convenience Store" },
      { icon: Dog, label: "Pet Park" },
      { icon: Cross, label: "Pharmacy & Clinic" },
    ],
  },
];

const LOCATION_BENEFITS = [
  { icon: MapPin, title: "Kondapur Centre", desc: "0 km · the project itself" },
  { icon: Train, title: "HITEC City", desc: "5 min drive" },
  { icon: Briefcase, title: "Financial District", desc: "12 min drive" },
  { icon: Briefcase, title: "Gachibowli", desc: "10 min drive" },
  { icon: School, title: "International Schools", desc: "DPS · Oakridge · Glendale" },
  { icon: Cross, title: "Hospitals", desc: "Continental · KIMS · Care" },
  { icon: ShoppingCart, title: "Shopping Malls", desc: "Inorbit · Sarath City Capital" },
  { icon: Building2, title: "IT Parks", desc: "Cyber Towers · Mindspace · Raheja" },
];

const FLOOR_PLANS = [
  { size: "1830 Sq.Ft.", config: "3 BHK · Compact Luxury", img: facade2.url },
  { size: "2455 Sq.Ft.", config: "3 BHK · Premium Estate", img: towerCrown.url },
];

const INVEST_REASONS = [
  { title: "Strong IT Employment Corridor", desc: "Kondapur sits at the heart of Hyderabad's 800,000+ IT workforce zone, fuelling consistent end-user demand." },
  { title: "Premium Rental Demand", desc: "3 BHK units in Kondapur fetch ₹45,000 – ₹85,000/month — among the highest yields in Hyderabad." },
  { title: "Infrastructure Growth", desc: "Outer Ring Road, ORR Phase 2 and the proposed metro extension are unlocking western Hyderabad's next decade." },
  { title: "Metro Connectivity", desc: "Hyderabad Metro Blue Line links Kondapur to MG Road, Ameerpet and Nagole — easy citywide reach." },
  { title: "Capital Appreciation", desc: "Kondapur land values have grown 18–22% CAGR over the last 5 years, outpacing most micro-markets." },
  { title: "Premium Residential Demand", desc: "Limited fresh supply of true 3 BHK premium inventory keeps demand pressure high — ideal for early-bird launch pricing." },
];

const FAQS = [
  {
    q: "What are the apartment sizes at Raghava Halo?",
    a: "Raghava Halo offers premium 3 BHK residences ranging from 1830 sq.ft. to 2455 sq.ft. carpet area, designed with attached bathrooms for every bedroom, dedicated pooja space and expansive luxury balconies.",
  },
  {
    q: "What is the launch price of Raghava Halo Kondapur?",
    a: "Pre-launch pricing starts at ₹7,800 per sq.ft. EOI is open for the first 100 customers at ₹6,500 — call +91 97050 80909 to confirm current pricing.",
  },
  {
    q: "Is Raghava Halo RERA approved?",
    a: "Raghava Halo is in its pre-launch EOI phase. RERA approval details will be shared with registered buyers — connect with our Naani Projects expert for the latest documentation.",
  },
  {
    q: "What configurations are available?",
    a: "Only premium 3 BHK residences — no 1 BHK or 2 BHK. East, West and North facing options are available across three iconic towers rising 52 residential floors.",
  },
  {
    q: "What amenities are included at Raghava Halo?",
    a: "World-class amenities across four categories — Wellness Retreat (Hyperbaric Oxygen, Sauna, Pilates, Gym), Social Arena (Bowling, VR Gaming, Preview Theatre, Rooftop Deck), Little Minds Studio for children, and Lifestyle Essentials including co-working, guest rooms, juice bar and pet park.",
  },
  {
    q: "Where exactly is Raghava Halo located?",
    a: "Raghava Halo is located in Kondapur, Hyderabad — within 5 minutes of HITEC City, 10 minutes of Gachibowli and 12 minutes of the Financial District, on Hyderabad's premium western growth corridor.",
  },
  {
    q: "How can I schedule a site visit?",
    a: "Click 'Schedule Site Visit' anywhere on this page or call +91 97050 80909. Our Naani Projects expert will coordinate a personalised on-site walkthrough at your convenient time.",
  },
];

const RaghavaHaloPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("Hero CTA");

  const openLead = (source: string) => {
    setPopupSource(source);
    setPopupOpen(true);
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Residence",
      name: "Raghava Halo",
      description:
        "Premium 3 BHK residences (1830 – 2455 sq.ft.) in Kondapur, Hyderabad. 5.14 acres, 3 iconic towers, 52 floors, world-class amenities.",
      url: PAGE_URL,
      image: [heroFacade.url, heroTowers.url, heroLowAngle.url],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kondapur",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500084",
        addressCountry: "IN",
      },
      brand: { "@type": "Brand", name: "Raghava" },
      provider: { "@type": "RealEstateAgent", name: "Naani Projects", telephone: NAANI_PHONE },
      numberOfRooms: 3,
      floorSize: { "@type": "QuantitativeValue", minValue: 1830, maxValue: 2455, unitCode: "FTK" },
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
      address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Raghava Halo Kondapur | 3 BHK Luxury Apartments Hyderabad"
        description="Explore Raghava Halo, a premium luxury residential project in Kondapur, Hyderabad. Spacious 3 BHK apartments from 1830 to 2455 sq.ft. with world-class amenities and exclusive pre-launch offers."
        canonicalUrl={PAGE_URL}
        keywords="flats for sale in Hyderabad, apartments in Kondapur, 3 BHK flats in Hyderabad, luxury apartments Hyderabad, new launch projects Hyderabad, premium apartments Kondapur, gated community flats Hyderabad, apartments near HITEC City, property investment Hyderabad, luxury homes Hyderabad, Raghava Halo Kondapur"
        ogImage={heroFacade.url}
        structuredData={structuredData}
      />

      <ProjectsHeader />
      <StickyContact />

      {/* ============== SECTION 1: HERO ============== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroLowAngle.url}
            alt="Raghava Halo Kondapur Hyderabad — iconic luxury towers exterior view"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
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
              <Sparkles className="w-3.5 h-3.5" /> Pre-Launch · Kondapur, Hyderabad
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4">
              <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Hyderabad's Next
              </span>
              <br />
              <span className="text-foreground">Iconic Landmark</span>
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 mb-8 font-light">
              Premium 3 BHK Residences in Kondapur
            </p>

            {/* Project facts */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="bg-background/50 backdrop-blur-md border border-amber-500/20 rounded-xl p-3 md:p-4"
                >
                  <f.icon className="w-5 h-5 text-amber-500 mb-2" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label}</div>
                  <div className="text-sm md:text-base font-semibold">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                onClick={() => openLead("Hero · Get Pricing")}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-6 py-6 shadow-lg shadow-amber-900/30"
              >
                <IndianRupee className="w-4 h-4 mr-2" /> Get Pricing
              </Button>
              <Button
                onClick={() => openLead("Hero · Download Brochure")}
                variant="outline"
                data-lead-gate="brochure"
                className="border-amber-500/50 hover:bg-amber-500/10 px-6 py-6"
              >
                <Download className="w-4 h-4 mr-2" /> Download Brochure
              </Button>
              <Button
                onClick={() => openLead("Hero · Site Visit")}
                variant="outline"
                data-lead-gate="sitevisit"
                className="border-amber-500/50 hover:bg-amber-500/10 px-6 py-6"
              >
                <Calendar className="w-4 h-4 mr-2" /> Schedule Site Visit
              </Button>
            </div>

            <a
              href={`tel:${NAANI_PHONE}`}
              className="call-btn inline-flex items-center gap-3 text-lg md:text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                <PhoneIcon className="w-5 h-5" />
              </span>
              +91 97050 80909
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============== SECTION 2: OVERVIEW ============== */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal variant="slideLeft">
              <img
                src={heroTowers.url}
                alt="Raghava Halo three iconic towers Kondapur skyline"
                className="rounded-2xl shadow-2xl shadow-amber-900/20 border border-amber-500/10"
                loading="lazy"
              />
            </ScrollReveal>
            <ScrollReveal variant="slideRight">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">About</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">
                About <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Raghava Halo</span>
              </h2>
              <p className="text-foreground/75 leading-relaxed text-lg mb-6">
                Raghava Halo is a landmark luxury residential development located in <strong className="text-foreground">Kondapur, Hyderabad</strong>. Spread across <strong className="text-foreground">5.14 acres</strong>, the project features <strong className="text-foreground">three iconic towers rising 52 residential floors</strong> high.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-8">
                Designed for modern families seeking luxury, privacy and convenience, Raghava Halo offers spacious <strong className="text-foreground">3 BHK residences ranging from 1830 to 2455 sq.ft.</strong> with premium specifications, panoramic balcony views, and a world-class amenity ecosystem of wellness retreats, social arenas and curated kids' learning spaces.
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

      {/* ============== SECTION 3: HIGHLIGHTS ============== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-amber-950/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">Project Highlights</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">Crafted for the Discerning Few</h2>
              <p className="text-muted-foreground mt-4">Every detail of Raghava Halo is engineered for legacy-grade luxury.</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {HIGHLIGHTS.map((h) => (
              <StaggerItem key={h.title}>
                <div className="group h-full bg-background/40 backdrop-blur-md border border-amber-500/15 rounded-2xl p-5 md:p-6 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <h.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">{h.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============== SECTION 4: EOI OFFER ============== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-purple-900/5 to-background" />
        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-950/40 to-background border border-amber-500/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-amber-900/20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                Limited · First 100 Customers
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-amber-300 to-amber-600 bg-clip-text text-transparent">
                  Exclusive Pre-Launch Offer
                </span>
              </h2>
              <p className="text-foreground/70 mb-8 text-lg">EOI Benefits for the First 100 Customers</p>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
                <div className="bg-background/60 border border-amber-500/20 rounded-2xl p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">EOI / OTP</div>
                  <div className="text-4xl md:text-5xl font-bold text-amber-400">₹6,500</div>
                </div>
                <div className="bg-background/60 border border-amber-500/20 rounded-2xl p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Launch Pricing</div>
                  <div className="text-4xl md:text-5xl font-bold text-amber-400">
                    ₹7,800<span className="text-xl text-muted-foreground"> /sq.ft.*</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => openLead("EOI Card · Enquire Now")}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-amber-900/30"
              >
                Enquire Now
              </Button>
              <div className="mt-5">
                <a href={`tel:${NAANI_PHONE}`} className="call-btn text-amber-400 font-semibold inline-flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" /> +91 97050 80909
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-4">* Indicative. Final pricing on confirmation.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============== SECTION 5: AMENITIES ============== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">Project Amenities</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">An Ecosystem of Well-Being</h2>
              <p className="text-muted-foreground mt-4">Four curated worlds — designed to elevate every facet of modern luxury living.</p>
            </div>
          </ScrollReveal>

          {/* Amenity image strip */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
              {[
                { src: yoga.url, label: "Terrace Yoga" },
                { src: golf.url, label: "Terrace Mini Golf" },
                { src: kidsPlay.url, label: "Kids Play Zone" },
                { src: pathway.url, label: "Sculpted Pathways" },
              ].map((a) => (
                <div key={a.label} className="relative group rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src={a.src} alt={`Raghava Halo ${a.label}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-sm font-semibold">{a.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {AMENITIES.map((group, idx) => (
              <ScrollReveal key={group.title} delay={idx * 0.1}>
                <div className={`h-full rounded-3xl p-6 md:p-8 bg-gradient-to-br ${group.color} border border-amber-500/15`}>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    {group.title}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.items.map((it) => (
                      <li key={it.label} className="flex items-center gap-3 text-sm">
                        <span className="w-8 h-8 rounded-lg bg-background/60 border border-amber-500/20 flex items-center justify-center shrink-0">
                          <it.icon className="w-4 h-4 text-amber-500" />
                        </span>
                        <span className="text-foreground/85">{it.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SECTION 6: LOCATION ============== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-amber-950/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">Location Advantage</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Live at the Heart of Hyderabad's Growth Corridor
              </h2>
              <p className="text-muted-foreground mt-4">
                Kondapur sits at the centre of Hyderabad's premium western IT belt — moments from HITEC City, Gachibowli and the Financial District.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <ScrollReveal variant="slideLeft">
              <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.7!2d78.3636!3d17.4615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKondapur%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1700000000000"
                  className="w-full h-[400px] md:h-[480px]"
                  loading="lazy"
                  title="Raghava Halo Kondapur Hyderabad Location Map"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOCATION_BENEFITS.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-background/40 border border-amber-500/15 hover:border-amber-500/40 transition-colors">
                    <span className="w-10 h-10 shrink-0 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                      <b.icon className="w-5 h-5 text-amber-500" />
                    </span>
                    <div>
                      <div className="font-semibold text-sm">{b.title}</div>
                      <div className="text-xs text-muted-foreground">{b.desc}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ============== SECTION 7: FLOOR PLANS ============== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">Floor Plans</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">Two Premium Configurations</h2>
              <p className="text-muted-foreground mt-4">Detailed unit plans are shared on request to qualified buyers.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {FLOOR_PLANS.map((p) => (
              <ScrollReveal key={p.size}>
                <div className="group bg-background/40 border border-amber-500/15 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all">
                  <div className="aspect-[5/4] overflow-hidden">
                    <img src={p.img} alt={`Raghava Halo ${p.size} 3 BHK floor plan`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-amber-500">{p.config}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{p.size}</h3>
                    <Button
                      onClick={() => openLead(`Floor Plan · ${p.size}`)}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold"
                    >
                      Request Floor Plan
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SECTION 8: WHY INVEST ============== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-amber-950/5 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">Investment Outlook</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">
                Why Kondapur is Hyderabad's Most Preferred Investment Destination
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INVEST_REASONS.map((r) => (
              <StaggerItem key={r.title}>
                <div className="h-full p-6 rounded-2xl bg-background/40 border border-amber-500/15 hover:border-amber-500/40 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 mb-3" />
                  <h3 className="font-semibold text-base md:text-lg mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============== SECTION 9: FINAL CTA ============== */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated living at Raghava Halo. Discover spacious 4 BHK luxury sky villas, world-class amenities, and a vibrant community designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button data-lead-gate="sitevisit" onClick={() => openLead("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openLead("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href={`https://wa.me/${NAANI_WA}?text=Hi%2C%20I%27m%20interested%20in%20Raghava%20Halo`} target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
          <div className="mt-6">
            <a href={`tel:${NAANI_PHONE}`} className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      {/* ============== SECTION 10: FAQ ============== */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-amber-950/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-amber-500 text-sm font-semibold tracking-[0.3em] uppercase">FAQ</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">Frequently Asked Questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-background/40 border border-amber-500/15 rounded-2xl px-5 data-[state=open]:border-amber-500/40">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/75 pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* Standalone clean footer (per project landing architecture memory) */}
      <footer className="border-t border-amber-500/10 py-10 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Raghava Halo · Marketed by{" "}
            <a href="/" className="text-amber-500 hover:underline font-semibold">Naani Projects</a> · Hyderabad
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            +91 97050 80909 · Disclaimer: All visuals are artistic impressions. Pricing & specifications subject to change at the developer's discretion.
          </p>
        </div>
      </footer>

      <LeadCapturePopup
        open={popupOpen}
        onOpenChange={setPopupOpen}
        source={popupSource}
        projectName={PROJECT}
      />
    </div>
  );
};

export default RaghavaHaloPage;
