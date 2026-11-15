import React, { useState, useId } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
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
  Clock,
  Compass,
  Home,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Dumbbell,
  Waves,
  Trees,
  Users,
  Briefcase,
  Zap,
  Activity,
  Tv,
  Check,
  Info,
  HelpCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Download,
  Eye,
  FileText,
  X,
  Flame,
  Wind,
  Globe,
  Star,
  GraduationCap,
  Coffee,
  Heart,
  Smile,
  SunMedium,
  Palette,
  BookOpen,
  Route as RouteIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { sendLeadToSheet, type LeadProfile, type PageContext } from "@/lib/leadProfile";

// High-resolution authentic project visual assets
import skyHabitatElevationDay from "@/assets/urbanrise-sky-habitat/urbanrise-skyhabitat-elevation-day.webp";
import skyHabitatTowerFacade from "@/assets/urbanrise-sky-habitat/urbanrise-skyhabitat-tower-facade.webp";
import skyHabitatDroneAerial from "@/assets/urbanrise-sky-habitat/urbanrise-skyhabitat-drone-aerial-day.jpg";
import skyHabitatRooftopSkywalk from "@/assets/urbanrise-sky-habitat/urbanrise-skyhabitat-rooftop-skywalk.webp";
import skyHabitatCourtyardPool from "@/assets/urbanrise-sky-habitat/urbanrise-skyhabitat-central-courtyard-pool.jpg";
import skyHabitatMasterPlan from "@/assets/urbanrise-sky-habitat/urbanrise-skyhabitat-master-plan.webp";

// Centralized Project Configuration (Fact-Checked & Authoritative)
export const PROJECT_CONFIG = {
  name: "Urbanrise Sky Habitat",
  alternativeName: "Urbanrise Codename Sky Habitat",
  developer: "Urbanrise",
  promoterGroup: "Alliance Group",
  location: "Miyapur",
  subLocation: "Ameenpur",
  microMarket: "North-West Hyderabad Residential Corridor",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  address: "Near Ameenpur Lake, Miyapur – Ameenpur Road, Hyderabad, Telangana 502032",
  startingPrice: "Starting ₹1.32 Cr*",
  priceRange: "₹1.32 Cr – ₹2.50 Cr* (Dynamic Developer Pricing)",
  priceNote: "*Indicative developer marketing starting price. Final price varies by tower, floor rise, orientation, and inventory release.",
  reraNumber: "P01100006655",
  reraDisplay: "TG RERA Registered: P01100006655",
  landArea: "Approximately 10.6 – 10.85 Acres (Advertised)",
  towerCount: "5 Monolithic Residential Towers",
  towerHeight: "42 Floors (B+G+42)",
  totalUnits: "2,000+ Premium High-Rise Residences",
  configurations: "3 & 4 BHK Luxury Residences",
  sizeRange: "1,333 – 2,309 Sq. Ft.",
  openSpace: "Approximately 6 Acres Landscaped Greens (~60%+ Open Space)",
  clubhouseSize: "Approximately 1,00,000 Sq. Ft. (1 Lakh Sft)",
  rooftopAmenitiesSize: "Approximately 70,000 Sq. Ft. across 15 Sky Lounges",
  skywalkLength: "500-Metre Interconnected Rooftop Skywalk",
  totalAmenities: "200+ / 203+ Advertised Lifestyle Amenities",
  lakeSurroundings: "Ameenpur Lake Proximity & Horizon Views",
  possession: "Developer-Advertised December 2027 (Provisional; Verify Latest TG RERA Milestone Filing)",
  status: "Under Construction",
  canonicalUrl: "https://www.naani.in/projects/urbanrise-sky-habitat-miyapur",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Urbanrise Sky Habitat Miyapur",
  developerWebsite: "https://urbanrise.group",
  mapEmbedUrl: "https://www.google.com/maps?q=Urbanrise+Sky+Habitat+Miyapur+Ameenpur+Hyderabad&output=embed",
};

// High-Resolution Project Visuals Gallery Item Definition
export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
  tag: string;
  category: "elevation" | "skywalk" | "courtyard" | "masterplan";
  alt: string;
}

export const PROJECT_GALLERY: GalleryItem[] = [
  {
    id: "elevation-day",
    title: "Twin 42-Storey Monolithic Towers Elevation",
    subtitle: "Striking daytime perspective showing the soaring 42-storey monolithic residential towers rising against the blue sky with landscaped podium facade",
    src: skyHabitatElevationDay,
    badge: "Architectural Elevation",
    tag: "42 Storeys · B+G+42",
    category: "elevation",
    alt: "Urbanrise Sky Habitat Miyapur daytime architectural elevation showing 42-floor high-rise towers and podium facade",
  },
  {
    id: "rooftop-skywalk",
    title: "500-Metre Interconnected Skywalk & Sky Lounges",
    subtitle: "Signature architectural skywalk spanning 42 storeys high, linking tower rooftops with landscaped terrace lounges, dining pergolas, and sunset views",
    src: skyHabitatRooftopSkywalk,
    badge: "500m Rooftop Skywalk",
    tag: "15 Sky Lounges",
    category: "skywalk",
    alt: "Urbanrise Sky Habitat 500-metre interconnected rooftop skywalk linking 42-storey towers with landscaped sky terraces at sunset",
  },
  {
    id: "tower-facade",
    title: "Monolithic Tower Facade & Sky Bridge Connection",
    subtitle: "Frontal elevation highlighting Mivan monolithic formwork, floor-to-ceiling glass balconies, sky bridge connections, and green boundary planting",
    src: skyHabitatTowerFacade,
    badge: "Tower Architecture",
    tag: "Sky Bridge Connections",
    category: "elevation",
    alt: "Urbanrise Sky Habitat architectural facade showing 42-floor residential towers connected by rooftop sky bridges",
  },
  {
    id: "drone-aerial-day",
    title: "3D Aerial Drone Master Perspective of 5 Towers",
    subtitle: "Bird's-eye perspective capturing the layout of all 5 towers rising 42 storeys with rooftop skywalks and surrounding green landscapes",
    src: skyHabitatDroneAerial,
    badge: "3D Aerial Perspective",
    tag: "5 Towers · 10.6+ Acres",
    category: "elevation",
    alt: "Urbanrise Sky Habitat 3D aerial drone render showing 5 residential towers rising 42 storeys with interconnected skywalks",
  },
  {
    id: "central-courtyard-pool",
    title: "Central Landscaped Courtyard & Elevated Walkway",
    subtitle: "Multi-tiered podium garden featuring illuminated meandering footbridges, tropical palm court, reflective ponds, and Olympic-length swimming pool",
    src: skyHabitatCourtyardPool,
    badge: "Podium Courtyard & Pool",
    tag: "~6 Acres Landscaped Greens",
    category: "courtyard",
    alt: "Urbanrise Sky Habitat central landscaped courtyard with illuminated elevated walkway, swimming pool, and lush palm gardens",
  },
  {
    id: "master-plan-layout",
    title: "Official Master Plan – 'Park by the Lake'",
    subtitle: "Comprehensive 10.6-acre campus site plan detailing the Park by the Lake, ground-level amenities, podium deck, clubhouse terrace, and tower rooftops",
    src: skyHabitatMasterPlan,
    badge: "Sanctioned Master Plan",
    tag: "Park by the Lake Layout",
    category: "masterplan",
    alt: "Urbanrise Sky Habitat official master plan layout titled Park by the Lake showing ground, podium, and terrace amenity legends",
  },
];

// Sanctioned Master Plan Legend Items (Ground, Podium, Clubhouse Terrace, Tower Terraces, and Park By The Lake)
export interface MasterPlanPoint {
  num: number;
  name: string;
  zone: "Park by the Lake" | "Ground" | "Podium" | "Clubhouse & Terraces";
  description: string;
}

export const MASTER_PLAN_LEGEND: MasterPlanPoint[] = [
  { num: 1, name: "Grand Entry Portal & Security Cabin", zone: "Ground", description: "Main entryscape with automated RFID boom barriers, CCTV-monitored security gatehouse, and illuminated signage." },
  { num: 2, name: "Driveway & Drop-Off Zones", zone: "Ground", description: "Wide two-lane paved peripheral driveway ensuring vehicle-free podium circulation and smooth cab drop-offs." },
  { num: 3, name: "School Bus Waiting Bay", zone: "Ground", description: "Safe, weather-sheltered waiting bay for school children with seating benches and security supervision." },
  { num: 4, name: "Cricket Practice Nets", zone: "Ground", description: "Enclosed cricket practice pitch with bowling crease and safety netting for resident enthusiasts." },
  { num: 5, name: "Outdoor Table Tennis & Games", zone: "Ground", description: "Weather-resistant competition-grade table tennis tables shaded under landscaped pergolas." },
  { num: 6, name: "Half – Basketball Court", zone: "Ground", description: "Regulation outdoor half-court basketball with synthetic shock-absorbent acrylic surfacing." },
  { num: 7, name: "Park by the Lake Entrance", zone: "Park by the Lake", description: "Dedicated scenic green gateway leading towards the 6-acre natural park enclave near Ameenpur Lake." },
  { num: 8, name: "Lakeview Walking & Jogging Track", zone: "Park by the Lake", description: "Meandering tree-lined fitness track providing natural lake views and early morning fresh breeze." },
  { num: 9, name: "Aroma Garden & Herbal Planting Beds", zone: "Park by the Lake", description: "Therapeutic garden planted with fragrant tropical blossoms, neem, tulsi, and medicinal shrubs." },
  { num: 10, name: "Children Adventure Play Enclave", zone: "Park by the Lake", description: "Outdoor obstacle course, balance logs, climbing nets, and toddlers play lawn." },
  { num: 11, name: "Hammock Park & Rest Groves", zone: "Podium", description: "Shaded tranquility alcove with woven hammocks suspended under mature tropical palms for peaceful relaxation." },
  { num: 12, name: "Elevated Meandering Sky Bridge", zone: "Podium", description: "Architectural timber-and-glass elevated pedestrian walkway threading through the central courtyard canopy." },
  { num: 13, name: "Olympic-Length Swimming Pool", zone: "Podium", description: "Expansive azure resort swimming pool with dedicated lap lanes and underwater LED illumination." },
  { num: 14, name: "Kids Splash Pool & Water Bubblers", zone: "Podium", description: "Zero-depth shallow pool for safe toddlers water play with gentle mushroom fountains." },
  { num: 15, name: "Sunken Conversational Lounge", zone: "Podium", description: "Submerged circular conversation pit surrounded by tranquil reflective water bodies." },
  { num: 16, name: "Senior Citizen Pavilion & Reflexology", zone: "Podium", description: "Quiet shaded pavilion with ergonomic seating and textured stone barefoot acupressure pathway." },
  { num: 17, name: "500-Metre Interconnected Skywalk", zone: "Clubhouse & Terraces", description: "Iconic 500-metre pedestrian sky bridge connecting the rooftops of all 5 residential towers at 42 storeys." },
  { num: 18, name: "15 Curated Rooftop Sky Lounges", zone: "Clubhouse & Terraces", description: "Elevated themed pavilions including Yoga Deck, Bar & Lounge, Co-Working with Sky, and Interactive Lounges." },
  { num: 19, name: "Rooftop Stargazing Observation Deck", zone: "Clubhouse & Terraces", description: "High-altitude telescope deck for nighttime astronomy and 360-degree horizon panoramas." },
  { num: 20, name: "Private BBQ Party Lounge & Sky Dining", zone: "Clubhouse & Terraces", description: "Equipped outdoor barbecue counters, al-fresco dining furniture, and party terraces under the stars." },
  { num: 21, name: "Grand 1 Lakh Sq. Ft. Luxury Clubhouse", zone: "Clubhouse & Terraces", description: "Multi-level community lifestyle club with badminton, squash, gym, banquet halls, and Urbanrise Genius hub." },
];

// Configuration Cards Specification (Fact-Checked to Prompt)
export interface UnitConfig {
  bhk: string;
  type: string;
  sizeSqFt: string;
  carpetSqFt: string;
  priceEstimate: string;
  facing: string;
  balconies: string;
  keyHighlights: string[];
}

export const UNIT_CONFIGS: UnitConfig[] = [
  {
    bhk: "3 BHK + 2 Toilets",
    type: "Type A (Smart 3 BHK)",
    sizeSqFt: "1,333 Sq. Ft.",
    carpetSqFt: "~933 Sq. Ft.*",
    priceEstimate: "Starting ₹1.32 Cr*",
    facing: "East / West",
    balconies: "2 Balconies",
    keyHighlights: [
      "Optimized zero-wastage floor layout",
      "Vastu-compliant entrance and kitchen placement",
      "Spacious master bedroom with en-suite bath",
      "Living room balcony with podium green views",
      "Dedicated dry utility space adjoining kitchen",
    ],
  },
  {
    bhk: "3 BHK + 2 Toilets",
    type: "Type B (Comfort 3 BHK)",
    sizeSqFt: "1,509 Sq. Ft.",
    carpetSqFt: "~1,056 Sq. Ft.*",
    priceEstimate: "Starting ₹1.49 Cr*",
    facing: "East / West / North",
    balconies: "2 Balconies",
    keyHighlights: [
      "Expansive combined living and formal dining expanse",
      "Wide French windows ensuring 3-side cross-ventilation",
      "Private entry foyer for enhanced apartment privacy",
      "Two spacious secondary bedrooms for kids and parents",
      "Provision for study desk / work-from-home nook",
    ],
  },
  {
    bhk: "3 BHK + 3 Toilets",
    type: "Type C (Grand 3 BHK)",
    sizeSqFt: "1,839 Sq. Ft.",
    carpetSqFt: "~1,287 Sq. Ft.*",
    priceEstimate: "Starting ₹1.82 Cr*",
    facing: "East / West Corner",
    balconies: "3 Balconies",
    keyHighlights: [
      "Palatial 1,839 Sft layout with 3 full bathrooms",
      "Corner orientation providing dual-side panoramic lake views",
      "Master bedroom suite with private morning balcony",
      "Large modular kitchen layout with attached store/utility",
      "Mivan monolithic construction ensuring acoustic isolation",
    ],
  },
  {
    bhk: "4 BHK + 3 Toilets",
    type: "Type D (Signature 4 BHK)",
    sizeSqFt: "2,309 Sq. Ft.",
    carpetSqFt: "~1,616 Sq. Ft.*",
    priceEstimate: "Starting ₹2.28 Cr*",
    facing: "East / North Corner",
    balconies: "3 Large Balconies",
    keyHighlights: [
      "Signature 4 BHK floor plate designed for large families",
      "Four king-sized bedrooms with dedicated wardrobe alcoves",
      "Grand double-aspect living hall with expansive viewing deck",
      "Unobstructed panoramic vistas towards Ameenpur Lake",
      "Independent powder room / servant room provisions",
    ],
  },
];

// 20 Comprehensive SEO FAQs
export const PROJECT_FAQS = [
  {
    q: "What is Urbanrise Sky Habitat?",
    a: "Urbanrise Sky Habitat, also marketed as Urbanrise Codename Sky Habitat, is a landmark luxury high-rise gated community developed by Urbanrise (Alliance Group). Spread across approximately 10.6 to 10.85 acres in the Miyapur–Ameenpur corridor of Hyderabad, the project features 5 residential towers rising 42 storeys high, an iconic 500-metre interconnected rooftop skywalk, 15 elevated sky lounges, ~1 Lakh sq. ft. clubhouse, and 3 & 4 BHK residences.",
  },
  {
    q: "Where is Urbanrise Sky Habitat located?",
    a: "Urbanrise Sky Habitat is strategically located in the Miyapur–Ameenpur region of North-West Hyderabad (PIN 502032). It sits near Ameenpur Lake and connects directly to Miyapur Metro Station (5–10 mins), NH-65 Mumbai Highway, and the Outer Ring Road (ORR Exit 4A), offering swift transit to HITEC City and Financial District.",
  },
  {
    q: "Who is the developer of Urbanrise Sky Habitat?",
    a: "The project is developed by Urbanrise, a leading South Indian real estate developer backed by the Alliance Group. Urbanrise has planned and delivered over 100,000 homes across Hyderabad, Chennai, and Bengaluru with a real estate portfolio exceeding 54 million sq. ft.",
  },
  {
    q: "What is the TG RERA number of Urbanrise Sky Habitat?",
    a: "Urbanrise Sky Habitat is officially registered under Telangana Real Estate Regulatory Authority (TG RERA) registration number P01100006655. Prospective buyers can independently verify all sanctioned approvals and milestone filings on the official portal rerait.telangana.gov.in.",
  },
  {
    q: "What apartment configurations are available?",
    a: "The project exclusively offers thoughtfully designed 3 BHK and 4 BHK luxury residences. Configurations include 3 BHK + 2 Toilets (1,333 and 1,509 sq. ft.), 3 BHK + 3 Toilets (1,839 sq. ft.), and 4 BHK + 3 Toilets (2,309 sq. ft.).",
  },
  {
    q: "What are the apartment sizes and area measurements?",
    a: "Advertised saleable areas are: 1,333 sq. ft. (3 BHK), 1,509 sq. ft. (3 BHK), 1,839 sq. ft. (3 BHK), and 2,309 sq. ft. (4 BHK). Carpet areas range from approximately 933 to 1,616 sq. ft., subject to final verification on approved floor plans.",
  },
  {
    q: "What is the starting price of Urbanrise Sky Habitat?",
    a: "Developer marketing indications advertise starting prices from approximately ₹1.32 Cr* for 3 BHK configurations. Final prices depend on tower release, floor-rise premium, facing charges, and inventory availability. Contact Naani Projects at +91 94939 43946 for a customized all-inclusive cost sheet.",
  },
  {
    q: "What is the expected possession date?",
    a: "The developer has marketed an indicative possession timeline of December 2027. Homebuyers should verify tower-specific construction milestones and official completion filings on the Telangana RERA portal before finalizing a purchase.",
  },
  {
    q: "How many towers and floors are in Urbanrise Sky Habitat?",
    a: "The master development comprises 5 iconic monolithic high-rise residential towers rising 42 storeys high (Basement + Ground + 42 Floors), making it one of the tallest residential skylines in the Miyapur corridor.",
  },
  {
    q: "Does Urbanrise Sky Habitat have a clubhouse?",
    a: "Yes, the project features an expansive ~1,00,000 sq. ft. (1 Lakh Sft) luxury clubhouse. Amenities include indoor badminton and squash courts, an Olympic-length swimming pool, fully equipped gymnasium, aerobics studio, multipurpose banquet halls, co-working suites, games arcade, and guest rooms.",
  },
  {
    q: "What are the rooftop amenities and 15 sky lounges?",
    a: "Urbanrise Sky Habitat reserves approximately 70,000 sq. ft. across tower rooftops for elevated leisure. It features 15 curated sky lounges, an aerial yoga deck, barbecue party bar, open-air sky dining, stargazing telescope decks, sky co-working pods, and mini screening theatres at 42 storeys high.",
  },
  {
    q: "What is the 500-metre interconnected skywalk?",
    a: "The 500-metre skywalk is a signature architectural feature that physically interconnects the rooftop terraces of all 5 residential towers. It provides an uninterrupted elevated walking and jogging circuit high above the city with 360-degree skyline views.",
  },
  {
    q: "Does the project offer lake views?",
    a: "Yes, the project is situated in close proximity to the scenic 100-acre Ameenpur Lake. Select higher-floor residences and rooftop sky lounges offer picturesque panoramic vistas towards the lake. Specific views depend on tower orientation, floor level, and surrounding development.",
  },
  {
    q: "What is Urbanrise Genius?",
    a: "Urbanrise Genius is an integrated on-campus child development center offering after-school tuition, STEM robotics, coding, music, classical dance, and martial arts academies right inside the gated community, eliminating commuting hassles for parents and children.",
  },
  {
    q: "Is the project close to Miyapur Metro Station?",
    a: "Yes, Miyapur Metro Station (Red Line terminus) is located approximately 4.8 km (5–10 minutes drive) from the project entrance, providing swift, traffic-free metro transit to Kukatpally, Ameerpet, and central Hyderabad.",
  },
  {
    q: "Which schools are near Urbanrise Sky Habitat?",
    a: "Top reputed schools within a 3 to 10-minute radius include Sentia Global School (1.8 km), Vikas Concept School (2.5 km), Oakridge International School (4.5 km), Delhi Public School DPS Miyapur (5.0 km), and Creek International School (4.0 km).",
  },
  {
    q: "Which hospitals are near the project?",
    a: "Nearby emergency healthcare facilities include Mirra Hospital (2.1 km), Vijaya Hospital (3.2 km), SLG Hospital (5.5 km), Malla Reddy Hospital (6.0 km), and Shankar Nethralaya (5.0 km).",
  },
  {
    q: "What construction technology is being used?",
    a: "The towers are constructed using monolithic aluminum Mivan formwork technology with seismic-resistant RCC frames. This ensures superior structural longevity, smooth crack-free walls, maximum usable carpet area, and enhanced acoustic isolation between units.",
  },
  {
    q: "How can I schedule a site visit or download the brochure?",
    a: "You can schedule an authorized private site visit, tour the model apartments, or request the sanctioned master plan and cost breakup by filling the consultation form on this page or contacting Naani Projects at +91 94939 43946 / WhatsApp.",
  },
  {
    q: "How can I verify the project's TG RERA registration?",
    a: "You can visit the official Telangana RERA website at rerait.telangana.gov.in and search registration number P01100006655 to inspect approved site layouts, sanctioned tower floors, promoter details, and quarterly progress reports.",
  },
];

// Related Projects Data in North & West Hyderabad
export const RELATED_PROJECTS = [
  {
    name: "Team4 Aria",
    location: "Miyapur, Hyderabad",
    slug: "team4-aria-miyapur-luxury-apartments-hyderabad",
    href: "/projects/team4-aria-miyapur-luxury-apartments-hyderabad",
    bhk: "3 & 4 BHK",
    highlights: "Luxury high-rise apartments with Miyapur metro connectivity and resort clubhouse.",
  },
  {
    name: "Pavani Starlit",
    location: "Miyapur, Hyderabad",
    slug: "pavani-starlit-miyapur",
    href: "/projects/pavani-starlit-miyapur",
    bhk: "2, 2.5 & 3 BHK",
    highlights: "3 Acres, 3 Towers, 14 Floors, 40,000 Sft Club Starlit with Mivan construction.",
  },
  {
    name: "Urbanrise On Cloud 33",
    location: "Bachupally, Hyderabad",
    slug: "urbanrise-on-cloud-33-bachupally",
    href: "/projects/urbanrise-on-cloud-33-bachupally",
    bhk: "3 & 4 BHK",
    highlights: "9.16 Acres, 33 Floors, 85,000 Sft Moroccan Clubhouse, 70,000 Sft rooftop amenities.",
  },
  {
    name: "Pavani Felicity",
    location: "Nizampet, Hyderabad",
    slug: "pavani-felicity-nizampet",
    href: "/projects/pavani-felicity-nizampet",
    bhk: "3 BHK Premium",
    highlights: "Single iconic 21-storey tower, 25,000 Sft Club Felicity, 1,440–1,985 Sft.",
  },
];

export default function UrbanriseSkyHabitatPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedZoneTab, setSelectedZoneTab] = useState<"All" | "Park by the Lake" | "Ground" | "Podium" | "Clubhouse & Terraces">("All");
  const [copiedRera, setCopiedRera] = useState(false);

  // Lead Generation Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredBhk, setPreferredBhk] = useState("3 BHK (1,333 Sft)");
  const [buyingPurpose, setBuyingPurpose] = useState("Self Use");
  const [preferredVisitDate, setPreferredVisitDate] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formErrorMsg, setFormErrorMsg] = useState("");

  const consentId = useId();

  // Filter master plan legend items by selected zone
  const filteredLegend = selectedZoneTab === "All"
    ? MASTER_PLAN_LEGEND
    : MASTER_PLAN_LEGEND.filter((item) => item.zone === selectedZoneTab);

  // Copy RERA Number to Clipboard
  const handleCopyRera = async () => {
    try {
      await navigator.clipboard.writeText(PROJECT_CONFIG.reraNumber);
      setCopiedRera(true);
      setTimeout(() => setCopiedRera(false), 2500);
    } catch {
      // Fallback
    }
  };

  // WhatsApp Intent Link
  const waMessage = encodeURIComponent(
    `Hello Naani Projects, I am interested in Urbanrise Sky Habitat (Miyapur). Please share the live unit availability, floor plans, and all-inclusive pricing sheet.`
  );
  const waUrl = `https://wa.me/${PROJECT_CONFIG.phoneRaw}?text=${waMessage}`;

  // Form Submission Handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMsg("");

    if (!fullName.trim()) {
      setFormErrorMsg("Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setFormErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!consentChecked) {
      setFormErrorMsg("Please consent to receive project details and pricing updates.");
      return;
    }

    setFormStatus("submitting");

    const leadData: LeadProfile = {
      name: fullName.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      preferred_bhk: preferredBhk.includes("4 BHK") ? "4 BHK" : "3 BHK",
      preferred_size: preferredBhk,
      buying_purpose: buyingPurpose as any,
      site_visit_date: preferredVisitDate || undefined,
      notes: `Urbanrise Sky Habitat Enquiry. Selected: ${preferredBhk}. Visit: ${preferredVisitDate || "Not specified"}. Purpose: ${buyingPurpose}.`,
      source: "Website - Urbanrise Sky Habitat Miyapur",
      project_name: PROJECT_CONFIG.name,
      project_slug: "urbanrise-sky-habitat-miyapur",
    };

    const pageContext: PageContext = {
      source: "Website - Urbanrise Sky Habitat Miyapur",
      project_name: PROJECT_CONFIG.name,
      project_slug: "urbanrise-sky-habitat-miyapur",
      device: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
    };

    try {
      const ok = await sendLeadToSheet(leadData, pageContext);
      if (ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setFormErrorMsg("Enquiry submitted. Our senior advisor will connect with you shortly.");
      }
    } catch {
      setFormStatus("error");
      setFormErrorMsg("Something went wrong. Please connect via WhatsApp or Call directly.");
    }
  };

  // Structured Data Schemas
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${PROJECT_CONFIG.canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
      { "@type": "ListItem", position: 3, name: "Miyapur", item: "https://www.naani.in/projects-in-miyapur" },
      { "@type": "ListItem", position: 4, name: "Urbanrise Sky Habitat", item: PROJECT_CONFIG.canonicalUrl },
    ],
  };

  const schemaApartmentComplex = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${PROJECT_CONFIG.canonicalUrl}#project`,
    name: "Urbanrise Sky Habitat",
    alternateName: "Urbanrise Codename Sky Habitat",
    description:
      "Urbanrise Sky Habitat is a landmark 10.6-acre luxury high-rise gated community in Miyapur–Ameenpur, Hyderabad by Urbanrise. Featuring 5 residential towers of 42 floors, 500-metre interconnected rooftop skywalk, 15 sky lounges, 1 Lakh Sft clubhouse, ~70,000 Sft rooftop amenities, Ameenpur lake views, and 3 & 4 BHK residences.",
    url: PROJECT_CONFIG.canonicalUrl,
    telephone: PROJECT_CONFIG.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Miyapur–Ameenpur Road, Near Ameenpur Lake",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "502032",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.5145",
      longitude: "78.3360",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    numberOfAccommodationUnits: 2000,
    petsAllowed: true,
  };

  const schemaFaqs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PROJECT_CONFIG.canonicalUrl}#faq`,
    mainEntity: PROJECT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const schemaJsonArray = [schemaBreadcrumbs, schemaApartmentComplex, schemaFaqs];

  return (
    <>
      <SEOHead
        title="Urbanrise Sky Habitat Miyapur | 3 & 4 BHK Apartments Hyderabad"
        description="Explore Urbanrise Sky Habitat in Miyapur, Hyderabad. View project details, 3 & 4 BHK sizes, amenities, location, 500m skywalk, RERA information and latest prices."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        ogImage="https://www.naani.in/og-urbanrise-sky-habitat.jpg"
        schemaJson={schemaJsonArray}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-300">
        {/* =========================================================================
            SECTION 1: BREADCRUMBS & RERA ANNOUNCEMENT TOP BAR
           ========================================================================= */}
        <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Breadcrumb Trail */}
            <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <Link to="/projects-in-miyapur" className="hover:text-amber-400 transition-colors">Miyapur</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <span className="text-slate-200 font-medium truncate">Urbanrise Sky Habitat</span>
            </nav>

            {/* TG RERA Copy Pill */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold tracking-wide">
                <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
                <span>TG RERA: {PROJECT_CONFIG.reraNumber}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyRera}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                title="Copy RERA Number"
              >
                {copiedRera ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedRera ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: HERO SECTION WITH MULTI-IMAGE SWITCHER & KEY SPECS
           ========================================================================= */}
        <section id="hero-section" className="relative overflow-hidden pt-6 pb-12 sm:pb-16 border-b border-slate-800/80">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Title Block */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                <Sparkles size={13} className="text-amber-400" />
                <span>Miyapur’s 42-Floor Elevated Landmark</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Urbanrise Sky Habitat – <span className="text-amber-400">Luxury 3 & 4 BHK Apartments in Miyapur, Hyderabad</span>
                  </h1>
                  <p className="mt-2 text-base sm:text-lg text-slate-300 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">Rise Above the Ordinary. Experience Elevated Living in Miyapur.</span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin size={15} className="text-amber-400 shrink-0" />
                      Miyapur – Ameenpur, Hyderabad
                    </span>
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex flex-col lg:items-end bg-slate-900/80 border border-slate-800 rounded-2xl p-4 lg:p-5 backdrop-blur-sm shrink-0">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Developer Indicative Marketing Price
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-0.5">
                    {PROJECT_CONFIG.startingPrice}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1">
                    3 & 4 BHK Luxury Residences · Dynamic Cost Sheet
                  </span>
                  <a
                    href="#enquiry-section"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    <span>Request Live Price Sheet</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Main Visual Display & Interactive Thumbnails */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Main Active Image Showcase (8 Cols) */}
              <div className="lg:col-span-8 space-y-3">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
                  <img
                    src={PROJECT_GALLERY[activeImageIndex].src}
                    alt={PROJECT_GALLERY[activeImageIndex].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-amber-300 text-xs font-semibold">
                      {PROJECT_GALLERY[activeImageIndex].badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300 text-xs">
                      {PROJECT_GALLERY[activeImageIndex].tag}
                    </span>
                  </div>

                  {/* Expand Image Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedImage(PROJECT_GALLERY[activeImageIndex])}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-white backdrop-blur-md shadow-lg transition-transform active:scale-90"
                    title="View Fullscreen"
                  >
                    <Maximize2 size={16} />
                  </button>

                  {/* Navigation Arrows */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? PROJECT_GALLERY.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-white backdrop-blur-md transition-transform active:scale-90"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === PROJECT_GALLERY.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-white backdrop-blur-md transition-transform active:scale-90"
                    aria-label="Next Image"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
                    <div className="max-w-xl">
                      <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md">
                        {PROJECT_GALLERY[activeImageIndex].title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 drop-shadow">
                        {PROJECT_GALLERY[activeImageIndex].subtitle}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 bg-slate-950/60 px-2 py-0.5 rounded backdrop-blur">
                      {activeImageIndex + 1} of {PROJECT_GALLERY.length} Visuals
                    </span>
                  </div>
                </div>

                {/* Horizontal Scrollable Thumbnails Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
                  {PROJECT_GALLERY.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? "border-amber-400 ring-2 ring-amber-400/30 scale-105"
                          : "border-slate-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Spec Highlights Card (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <Building2 size={18} className="text-amber-400" />
                    <span>Project Highlights at a Glance</span>
                  </h3>

                  <dl className="mt-4 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Trees size={15} className="text-emerald-400" />
                        <span>Land Area & Greens</span>
                      </dt>
                      <dd className="font-semibold text-white">~10.6–10.85 Acres (~6 Acres Greens)</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Layers size={15} className="text-sky-400" />
                        <span>Towers & Height</span>
                      </dt>
                      <dd className="font-semibold text-white">5 Towers · 42 Floors (B+G+42)</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <RouteIcon size={15} className="text-amber-400" />
                        <span>Rooftop Skywalk</span>
                      </dt>
                      <dd className="font-semibold text-amber-300">500-Metre Interconnected</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Wind size={15} className="text-indigo-400" />
                        <span>Sky Lounges</span>
                      </dt>
                      <dd className="font-semibold text-white">15 Elevated Sky Lounges</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Waves size={15} className="text-sky-400" />
                        <span>Clubhouse Scale</span>
                      </dt>
                      <dd className="font-semibold text-white">~1,00,000 Sq. Ft. (1 Lakh Sft)</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Home size={15} className="text-amber-400" />
                        <span>Residences & Sizes</span>
                      </dt>
                      <dd className="font-semibold text-white">3 & 4 BHK (1,333 – 2,309 Sft)</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Eye size={15} className="text-emerald-400" />
                        <span>Lake Views</span>
                      </dt>
                      <dd className="font-semibold text-emerald-400">Ameenpur Lake Views</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Calendar size={15} className="text-orange-400" />
                        <span>Possession Timeline</span>
                      </dt>
                      <dd className="font-semibold text-amber-300 text-right text-xs">
                        Dec 2027 (Developer-Adv; Verify)
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Quick Consultation CTA Buttons */}
                <div className="pt-2 space-y-2.5">
                  <a
                    href={`tel:${PROJECT_CONFIG.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                  >
                    <Phone size={15} className="text-amber-400" />
                    <span>Call Sales Desk: {PROJECT_CONFIG.phoneDisplay}</span>
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                  >
                    <MessageCircle size={15} />
                    <span>Chat on WhatsApp for Availability</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: ABOUT URBANRISE SKY HABITAT (OVERVIEW)
           ========================================================================= */}
        <section id="overview" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Project Overview
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                About Urbanrise Sky Habitat
              </h2>
              <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 text-left pt-3">
                <p>
                  <strong>Urbanrise Sky Habitat</strong>, also widely marketed as <strong>Urbanrise Codename Sky Habitat</strong>, is an ambitious high-rise residential landmark positioned in the rapidly evolving Miyapur–Ameenpur residential corridor of North-West Hyderabad. Spanning approximately 10.6 to 10.85 acres, the community is planned around the central philosophy of elevated vertical living.
                </p>
                <p>
                  The development comprises 5 iconic residential towers soaring 42 storeys high, housing spacious 3 and 4 BHK luxury residences. Its defining architectural hallmark is a <strong>500-metre interconnected rooftop skywalk</strong> linking the crowns of all five towers, complemented by 15 elevated sky lounges, ~70,000 sq. ft. of rooftop recreation, and breathtaking panoramic vistas towards the tranquil 100-acre Ameenpur Lake.
                </p>
                <p>
                  At ground and podium levels, residents enjoy approximately 6 acres of landscaped green spaces with dedicated "Park by the Lake" themed recreation, an expansive <strong>~1,00,000 sq. ft. (1 Lakh Sft) luxury clubhouse</strong>, and the innovative <strong>Urbanrise Genius</strong> on-campus child learning hub. Constructed using precision Mivan monolithic aluminum formwork and registered under <strong>TG RERA No. P01100006655</strong>, Sky Habitat delivers exceptional structural longevity and urban connectivity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: THE 500-METRE SKYWALK EXPERIENCE & 15 SKY LOUNGES
           ========================================================================= */}
        <section id="skywalk" className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Image Card */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group cursor-pointer" onClick={() => setSelectedImage(PROJECT_GALLERY[1])}>
                  <img
                    src={skyHabitatRooftopSkywalk}
                    alt="Urbanrise Sky Habitat 500-metre interconnected rooftop skywalk bridging towers at 42 storeys"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold backdrop-blur-md">
                      Signature Architectural Feature
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">
                      The 500-Metre Skywalk Experience
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Concepts */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Life Above the Clouds
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                    Experience Life at 42 Storeys High
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-300">
                    Sky Habitat takes residential recreation to unprecedented heights. The 500-metre elevated skywalk connects the crowns of all five towers, transforming the rooftop into an active social and fitness promenade floating above Hyderabad.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <RouteIcon className="text-amber-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">500m Sky Promenade</strong>
                      <span className="text-slate-400 text-xs">Interconnected jogging & walking bridge linking all 5 towers</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Wind className="text-sky-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">15 Elevated Sky Lounges</strong>
                      <span className="text-slate-400 text-xs">Curated themed pavilions for yoga, music, and quiet reading</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Eye className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Ameenpur Lake Panoramas</strong>
                      <span className="text-slate-400 text-xs">Unobstructed horizon vistas across the 100-acre lake reserve</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Flame className="text-orange-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Rooftop Party Bar & BBQ</strong>
                      <span className="text-slate-400 text-xs">High-altitude bar counters and open-air dining under starlight</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: ~1 LAKH SQ. FT. LUXURY CLUBHOUSE
           ========================================================================= */}
        <section id="clubhouse" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Community Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                ~1 Lakh Sq. Ft. Grand Luxury Clubhouse
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Designed to cater to families of all generations, the sprawling 1,00,000 sq. ft. multi-level clubhouse integrates world-class fitness, sports, business, and social celebration arenas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors">
                <Dumbbell size={24} className="text-amber-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Commercial Gymnasium & Aerobics</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fully equipped fitness studio featuring imported cardio machines, weight-training racks, certified trainer zones, and private yoga studios.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-colors">
                <Activity size={24} className="text-sky-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Indoor Badminton & Squash</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Competition-standard wooden badminton courts and squash arenas with spectator galleries for year-round sports competitions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-colors">
                <Waves size={24} className="text-emerald-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Olympic Pool & Kids Splash</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Temperature-controlled Olympic lap swimming pool complemented by a shallow kids splash pool and poolside sundecks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-colors">
                <Briefcase size={24} className="text-purple-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Executive Co-Working Suites</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-speed broadband workstations, video conference suites, and silent calling pods tailored for remote-working professionals.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/40 transition-colors">
                <Users size={24} className="text-pink-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Grand Celebration Banquet Hall</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Spacious banquet halls with pre-function foyers and catering kitchens for family birthdays, weddings, and community festivals.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition-colors">
                <Tv size={24} className="text-orange-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Indoor Games Arcade & Billiards</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Snooker and 8-ball pool tables, table tennis, chess, carrom, and gaming lounges for weekend recreation with friends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: ~70,000 SQ. FT. ROOFTOP AMENITIES & 15 SKY LOUNGES
           ========================================================================= */}
        <section id="rooftop" className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Elevated Leisure Spaces
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                ~70,000 Sq. Ft. Rooftop Leisure Infrastructure
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Perched high on the 42nd-floor terraces, Urbanrise Sky Habitat dedicates over 70,000 sq. ft. of space across 15 themed sky lounges designed for relaxation, community bonding, and scenic skyline enjoyment.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <SunMedium size={16} className="text-amber-400 shrink-0" />
                <span className="font-semibold text-white">1. Sky Yoga Deck</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Flame size={16} className="text-orange-400 shrink-0" />
                <span className="font-semibold text-white">2. BBQ Party Lounge</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Coffee size={16} className="text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">3. Sky Dining Pergola</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Eye size={16} className="text-sky-400 shrink-0" />
                <span className="font-semibold text-white">4. Stargazing Observatory</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Briefcase size={16} className="text-purple-400 shrink-0" />
                <span className="font-semibold text-white">5. Sky Co-Working Pods</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Tv size={16} className="text-pink-400 shrink-0" />
                <span className="font-semibold text-white">6. Rooftop Mini Cinema</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <MessageCircle size={16} className="text-indigo-400 shrink-0" />
                <span className="font-semibold text-white">7. Interactive Social Pod</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Activity size={16} className="text-teal-400 shrink-0" />
                <span className="font-semibold text-white">8. Sky Games Zone</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Trees size={16} className="text-green-400 shrink-0" />
                <span className="font-semibold text-white">9. Carpet Grass Terraces</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Zap size={16} className="text-yellow-400 shrink-0" />
                <span className="font-semibold text-white">10. Solar Renewable Deck</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: LANDSCAPED GREENS & PARK BY THE LAKE
           ========================================================================= */}
        <section id="lake-greens" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Visual of Courtyard */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group cursor-pointer" onClick={() => setSelectedImage(PROJECT_GALLERY[4])}>
                  <img
                    src={skyHabitatCourtyardPool}
                    alt="Urbanrise Sky Habitat central landscaped courtyard and elevated walkway over swimming pool"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                      ~6 Acres of Landscaped Nature
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      Podium Waterways & Palm Courts
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Column: Park by the Lake Details */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Nature-Infused Living
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  A More Elevated Connection with Nature
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Urbanrise Sky Habitat is conceived as an ecological retreat nestled right beside Ameenpur Lake. With roughly 6 acres of ground and podium landscape dedicated to green foliage, tropical palms, and waterbodies, residents experience tranquil resort-style living every single day.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Park by the Lake Enclave:</strong> Dedicated waterfront-adjacent recreation park with walking trails, meditation lawns, and reflexology pathways.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Meandering Elevated Walkways:</strong> Illuminated timber bridges winding through tree canopies above the swimming pool.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Lake Breeze & Natural Ventilation:</strong> Open tower orientation allowing natural three-side cross-ventilation and unhindered air circulation.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: URBANRISE GENIUS – CHILDREN'S LEARNING HUB
           ========================================================================= */}
        <section id="urbanrise-genius" className="py-14 sm:py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Educational Concept Description */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Integrated Child Development
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  Urbanrise Genius – A Dedicated Learning Experience for Children
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  <strong>Urbanrise Genius</strong> is an innovative on-campus enrichment ecosystem conceptualized by the developer to provide certified educational, artistic, and athletic coaching for children without requiring them to commute outside the gated perimeter.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <BookOpen size={18} className="text-amber-400 mb-1.5" />
                    <h4 className="text-sm font-bold text-white">After-School Tuitions</h4>
                    <p className="text-xs text-slate-400 mt-1">Structured academic coaching and homework study labs for all school boards.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <Zap size={18} className="text-sky-400 mb-1.5" />
                    <h4 className="text-sm font-bold text-white">Robotics & STEM Labs</h4>
                    <p className="text-xs text-slate-400 mt-1">Future-ready coding, computational logic, and hands-on robotics tinkering.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <Palette size={18} className="text-pink-400 mb-1.5" />
                    <h4 className="text-sm font-bold text-white">Music & Classical Dance</h4>
                    <p className="text-xs text-slate-400 mt-1">Acoustic vocal/instrument studios and dedicated dance academies.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <Award size={18} className="text-emerald-400 mb-1.5" />
                    <h4 className="text-sm font-bold text-white">Martial Arts & Fitness</h4>
                    <p className="text-xs text-slate-400 mt-1">Karate and Taekwondo dojos building discipline and physical fitness.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Parental Benefits */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={22} />
                  <h3 className="text-base font-bold text-white">Child Safety & Parental Convenience</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Commuting Stress:</strong> Saves 1 to 2 hours of evening road travel every day.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Gated Security:</strong> RFID card access and CCTV supervision for complete peace of mind.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Certified Mentors:</strong> Specialized curricula driven by reputed third-party academies.</span>
                  </li>
                </ul>

                <a
                  href="#enquiry-section"
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                >
                  <span>Enquire for Urbanrise Genius Program</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: SANCTIONED MASTER PLAN WITH PARK BY THE LAKE LEGEND
           ========================================================================= */}
        <section id="master-plan" className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Official Sanctioned Layout
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Master Plan & 'Park by the Lake' Legend
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Inspect the sanctioned master plan of Urbanrise Sky Habitat. Explore how ground-level amenities, podium decks, the 1 Lakh Sft clubhouse, and 42nd-floor terrace skywalks are seamlessly organized across the 10.6-acre campus.
              </p>
            </div>

            {/* Master Plan High-Res Image Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-2 sm:p-4 mb-8 shadow-2xl">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden cursor-pointer group" onClick={() => setSelectedImage(PROJECT_GALLERY[5])}>
                <img
                  src={skyHabitatMasterPlan}
                  alt="Urbanrise Sky Habitat official master plan layout titled Park by the Lake showing ground, podium, and terrace legends"
                  className="w-full h-full object-contain bg-slate-950 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-700 text-white px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 backdrop-blur-md">
                  <Maximize2 size={13} className="text-amber-400" />
                  <span>Click to Inspect High-Res Master Plan</span>
                </div>
              </div>
            </div>

            {/* Interactive Zone Filter Tabs */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <FileText size={18} className="text-amber-400" />
                    <span>Master Plan Amenity Catalog</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Filter amenities across Ground, Podium, Park by the Lake, and Clubhouse Terraces
                  </p>
                </div>

                <div className="inline-flex flex-wrap rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
                  {(["All", "Park by the Lake", "Ground", "Podium", "Clubhouse & Terraces"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setSelectedZoneTab(tab)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                        selectedZoneTab === tab
                          ? "bg-amber-500 text-slate-950 shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Legend Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredLegend.map((item) => (
                  <div
                    key={item.num}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-amber-500/40 transition-colors flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400/90 font-medium shrink-0">
                          {item.zone}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: APARTMENT CONFIGURATIONS & FLOOR PLANS
           ========================================================================= */}
        <section id="configurations" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Spacious Living Formats
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Spacious Residences Designed for Modern Families
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Crafted using monolithic aluminum Mivan formwork for smooth finishes, seismic resistance, and zero space wastage. Each residence features wide balconies, independent foyers, and three-side cross-ventilation.
              </p>
            </div>

            {/* 4 Unit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {UNIT_CONFIGS.map((unit) => (
                <div
                  key={unit.sizeSqFt + unit.bhk}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                        {unit.type}
                      </span>
                      <span className="text-xs text-slate-400">{unit.balconies}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-white mt-1">{unit.bhk}</h3>
                    <div className="mt-2 text-2xl font-black text-amber-400">
                      {unit.sizeSqFt}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Carpet Area: {unit.carpetSqFt} · Facing: {unit.facing}
                    </span>

                    <div className="mt-4 pt-4 border-t border-slate-800/80">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                        Floor Plan Highlights
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {unit.keyHighlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                    <div className="text-xs text-slate-400">
                      Indicative: <strong className="text-white">{unit.priceEstimate}</strong>
                    </div>
                    <a
                      href="#enquiry-section"
                      className="w-full flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                    >
                      <span>Request Floor Plan PDF</span>
                      <ChevronRight size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: LOCATION ADVANTAGES & DISTANCE MATRIX
           ========================================================================= */}
        <section id="location-connectivity" className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Strategic Location
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Strategically Located in Miyapur, Hyderabad
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Situated in the thriving Miyapur–Ameenpur corridor, Urbanrise Sky Habitat offers effortless access to metro connectivity, major highways, leading educational institutions, hospitals, and HITEC City work hubs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Connectivity Clusters */}
              <div className="lg:col-span-6 space-y-4">
                {/* Cluster 1: Metro, Highway & Transit */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Compass size={16} />
                    <span>Metro, Highway & IT Hubs</span>
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Miyapur Metro Station (Red Line Terminus)</span>
                      <span className="text-amber-400 font-bold shrink-0">~5–10 Mins (4.8 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Outer Ring Road (ORR Exit 4A)</span>
                      <span className="text-amber-400 font-bold shrink-0">~8 Mins (4.2 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">NH-65 Mumbai Highway</span>
                      <span className="text-amber-400 font-bold shrink-0">~5 Mins (2.5 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">HITEC City & Cyber Towers</span>
                      <span className="text-amber-400 font-bold shrink-0">~20–25 Mins (13 km)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Financial District & Gachibowli</span>
                      <span className="text-amber-400 font-bold shrink-0">~30 Mins (via ORR)</span>
                    </div>
                  </div>
                </div>

                {/* Cluster 2: Top Schools */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span>Schools & Colleges</span>
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Sentia Global School</span>
                      <span className="text-emerald-400 font-bold shrink-0">~3–5 Mins (1.8 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Vikas Concept School</span>
                      <span className="text-emerald-400 font-bold shrink-0">~5 Mins (2.5 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Oakridge International School</span>
                      <span className="text-emerald-400 font-bold shrink-0">~10 Mins (4.5 km)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Delhi Public School (DPS Miyapur)</span>
                      <span className="text-emerald-400 font-bold shrink-0">~10 Mins (5.0 km)</span>
                    </div>
                  </div>
                </div>

                {/* Cluster 3: Hospitals & Shopping */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Heart size={16} />
                    <span>Hospitals & Malls</span>
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Mirra Multi-Specialty Hospital</span>
                      <span className="text-sky-400 font-bold shrink-0">~3–5 Mins (2.1 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">SLG Hospitals (Bachupally)</span>
                      <span className="text-sky-400 font-bold shrink-0">~10 Mins (5.5 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">GSM Mall & Multiplex (Miyapur)</span>
                      <span className="text-sky-400 font-bold shrink-0">~8 Mins (4.0 km)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Sarath City Capital Mall</span>
                      <span className="text-sky-400 font-bold shrink-0">~22 Mins (12 km)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Maps Embed & Aerial View */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl group cursor-pointer" onClick={() => setSelectedImage(PROJECT_GALLERY[3])}>
                  <img
                    src={skyHabitatDroneAerial}
                    alt="Urbanrise Sky Habitat 3D aerial drone render showing 5 residential towers rising 42 storeys"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      Miyapur – Ameenpur Corridor
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      Direct connectivity to Miyapur metro and Outer Ring Road Exit 4A.
                    </p>
                  </div>
                </div>

                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
                  <iframe
                    title="Urbanrise Sky Habitat Location Map"
                    src={PROJECT_CONFIG.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: DEVELOPER PROFILE – URBANRISE (ALLIANCE GROUP)
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Trusted Real Estate Brand
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  About the Developer – Urbanrise
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Urbanrise is a leading South Indian real estate developer backed by the prestigious Alliance Group. With active landmark developments across Hyderabad, Chennai, and Bengaluru, the brand is celebrated for pioneering architectural concepts like monolithic Mivan construction, 500m rooftop skywalks, and Urbanrise Genius child learning hubs.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xl sm:text-2xl font-black text-amber-400">100,000+</span>
                    <span className="text-xs text-slate-400 block mt-0.5">Homes Planned & Delivered</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xl sm:text-2xl font-black text-amber-400">54+ Mn Sft</span>
                    <span className="text-xs text-slate-400 block mt-0.5">Real Estate Portfolio</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-xl sm:text-2xl font-black text-emerald-400">42 Floors</span>
                    <span className="text-xs text-slate-400 block mt-0.5">Iconic Sky Habitat Towers</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/builders/urbanrise"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>View all Urbanrise projects in Hyderabad</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Promoter Legal Matrix Card */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3.5 text-xs sm:text-sm">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>Sanction & Statutory Matrix</span>
                </h3>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Project Name</span>
                  <span className="font-semibold text-white">Urbanrise Sky Habitat</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Developer</span>
                  <span className="font-semibold text-white">Urbanrise / Alliance Group</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">TG RERA ID</span>
                  <span className="font-semibold text-emerald-400">{PROJECT_CONFIG.reraNumber}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Developer Advertised Possession</span>
                  <span className="font-semibold text-amber-300">December 2027 (Verify)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Status</span>
                  <span className="font-semibold text-emerald-400">Under Construction</span>
                </div>

                <div className="pt-2">
                  <a
                    href="https://rerait.telangana.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <span>Verify on TG RERA Portal</span>
                    <ExternalLink size={13} className="text-amber-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: RERA AND PROJECT LEGAL DETAILS NOTICE
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                    <ShieldCheck size={14} />
                    <span>Statutory Transparency Notice</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Official TG RERA Details & Legal Verification
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyRera}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                  >
                    {copiedRera ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedRera ? "RERA Copied!" : "Copy RERA ID"}</span>
                  </button>

                  <a
                    href="https://rerait.telangana.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    <span>TG RERA Portal</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm mb-6">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-xs block">RERA Registration</span>
                  <span className="font-bold text-emerald-400 text-base mt-1 block">
                    {PROJECT_CONFIG.reraNumber}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Telangana RERA Authority</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-xs block">Advertised Possession</span>
                  <span className="font-bold text-amber-300 text-base mt-1 block">
                    December 2027
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Developer-Stated Timeline</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-xs block">Sanctioned Land Area</span>
                  <span className="font-bold text-white text-base mt-1 block">
                    ~10.6–10.85 Acres
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Marketing Source Figure</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-xs block">Tower Heights</span>
                  <span className="font-bold text-white text-base mt-1 block">
                    5 Towers · 42 Floors
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">High-Rise Residential</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-amber-200">Buyer Advisory Note:</strong>
                  <span>
                    Project information is provided for general reference. Buyers should independently verify the latest Telangana RERA registration details, approved plans, project specifications, agreement terms and unit availability before making a purchase decision. Naani Projects facilitates transparent verification of all sanctioned building plans.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 14: DYNAMIC PRICING & PRIVATE CONSULTATION ENQUIRY FORM
           ========================================================================= */}
        <section id="enquiry-section" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Authorized Advisory Desk
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Urbanrise Sky Habitat Price and Payment Details
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                Connect directly with our senior Hyderabad property advisors to receive live inventory availability, tower-specific cost breakups, floor plans, and customized home loan payment schedules.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {formStatus === "success" ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Enquiry Received Successfully!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong>{fullName}</strong>. Our senior property advisor for Urbanrise Sky Habitat will connect with you within 15 minutes with the latest price sheet and availability.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      <MessageCircle size={15} />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFormStatus("idle");
                        setFullName("");
                        setPhone("");
                        setEmail("");
                        setConsentChecked(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  {formErrorMsg && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertTriangle size={15} className="shrink-0" />
                      <span>{formErrorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Anand Reddy"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Preferred Configuration */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Preferred Configuration
                      </label>
                      <select
                        value={preferredBhk}
                        onChange={(e) => setPreferredBhk(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="3 BHK + 2 Toilets (1,333 Sft)">3 BHK + 2 Toilets (1,333 Sft)</option>
                        <option value="3 BHK + 2 Toilets (1,509 Sft)">3 BHK + 2 Toilets (1,509 Sft)</option>
                        <option value="3 BHK + 3 Toilets (1,839 Sft)">3 BHK + 3 Toilets (1,839 Sft)</option>
                        <option value="4 BHK + 3 Toilets (2,309 Sft)">4 BHK + 3 Toilets (2,309 Sft)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Buying Purpose */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Purchase Intent
                      </label>
                      <select
                        value={buyingPurpose}
                        onChange={(e) => setBuyingPurpose(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Self Use">Primary Home (Self Use)</option>
                        <option value="Investment">Investment (Rental Yield / Capital Appreciation)</option>
                        <option value="Relocation">Relocation to North-West Hyderabad</option>
                      </select>
                    </div>

                    {/* Preferred Site Visit Date */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Preferred Site Visit Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={preferredVisitDate}
                        onChange={(e) => setPreferredVisitDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Explicit Consent Checkbox (Unchecked by Default) */}
                  <div className="pt-2">
                    <label htmlFor={consentId} className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400">
                      <input
                        type="checkbox"
                        id={consentId}
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-0.5 rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-amber-400"
                      />
                      <span>
                        I authorize Naani Projects and Urbanrise representatives to contact me via Call, SMS, or WhatsApp with official pricing, brochure updates, and site visit coordinates. (Unchecked by default for user consent).
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 active:scale-98 transition-all"
                    >
                      {formStatus === "submitting" ? "Submitting Request..." : "Request Official Cost Sheet & Site Visit"}
                    </Button>
                  </div>

                  <p className="text-[11px] text-center text-slate-500">
                    Zero spam guaranteed. Your personal details are protected under standard consumer privacy protocols.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 15: 20 COMPREHENSIVE SEO FAQS
           ========================================================================= */}
        <section id="faqs" className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Buyer Knowledge Base
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Authoritative answers covering location, developer track record, TG RERA registration, apartment sizes, 500m skywalk, 1 Lakh Sft clubhouse, and possession timelines.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {PROJECT_FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-900 border border-slate-800 rounded-2xl px-5 overflow-hidden transition-colors data-[state=open]:border-amber-500/40"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-white hover:text-amber-400 py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-300 pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* =========================================================================
            SECTION 16: RELATED RESIDENTIAL PROJECTS IN HYDERABAD
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Explore Alternatives
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Related Projects in North & West Hyderabad
                </h2>
              </div>
              <Link
                to="/projects"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View All Hyderabad Projects</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RELATED_PROJECTS.map((proj) => (
                <Link
                  key={proj.slug}
                  to={proj.href}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-amber-400" />
                        {proj.location}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {proj.bhk}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {proj.highlights}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                    <span>View Project</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 17: MOBILE FIXED STICKY CTA BAR
           ========================================================================= */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
          <a
            href={`tel:${PROJECT_CONFIG.phone}`}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-[11px] font-bold active:scale-95 transition-transform"
          >
            <Phone size={16} className="text-amber-400 mb-0.5" />
            <span>Call</span>
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white text-[11px] font-bold active:scale-95 transition-transform shadow-md shadow-emerald-900/30"
          >
            <MessageCircle size={16} className="mb-0.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#enquiry-section"
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-[11px] font-extrabold active:scale-95 transition-transform shadow-md shadow-amber-500/20"
          >
            <Home size={16} className="mb-0.5 text-slate-950" />
            <span>Request Price</span>
          </a>
        </div>

        {/* =========================================================================
            SECTION 18: LIGHTBOX MODAL FOR FULL-RESOLUTION INSPECTION
           ========================================================================= */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-slate-950/95 border border-slate-800 text-slate-100 p-4 sm:p-6 backdrop-blur-2xl">
            <DialogClose className="absolute right-4 top-4 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors z-20">
              <X size={18} />
            </DialogClose>
            {selectedImage && (
              <div className="space-y-3">
                <div className="relative max-h-[80vh] flex items-center justify-center p-2 bg-slate-950 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
                <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedImage.title}</h4>
                    <p className="text-xs text-slate-400">{selectedImage.subtitle}</p>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 self-start sm:self-auto shrink-0">
                    {selectedImage.badge}
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
