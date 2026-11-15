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
  Plane,
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
import miraiSunsetHero from "@/assets/pavani-mirai/pavani-mirai-tower-elevation-sunset.webp";
import miraiTwilightCrown from "@/assets/pavani-mirai/pavani-mirai-tower-crown-twilight.webp";
import miraiHelipadAerial from "@/assets/pavani-mirai/pavani-mirai-helipad-rooftop-aerial.jpg";
import miraiSkyPodsCrown from "@/assets/pavani-mirai/pavani-mirai-sky-pods-crown.jpg";
import miraiTerraPodLounge from "@/assets/pavani-mirai/pavani-mirai-terra-pod-lounge.jpg";
import miraiTerraClubLounge from "@/assets/pavani-mirai/pavani-mirai-terra-club-lounge.jpg";
import miraiSkyResidenceLounge from "@/assets/pavani-mirai/pavani-mirai-sky-residence-lounge.jpg";
import miraiFloorPlateBlueprint from "@/assets/pavani-mirai/pavani-mirai-floor-plate-blueprint.jpg";
import miraiMasterLayoutPlan from "@/assets/pavani-mirai/pavani-mirai-master-layout-plan.webp";

// Centralized Project Configuration (Fact-Checked & Authoritative)
export const PROJECT_CONFIG = {
  name: "Pavani Mirai",
  developer: "Pavani Infra",
  promoter: "Sai Sravanthi Infra Projects Private Limited",
  location: "Puppalaguda",
  microMarket: "Financial District, Hyderabad",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  address: "Puppalaguda, Financial District, Hyderabad, Telangana 500089",
  startingPrice: "Contact for Latest Price",
  priceRange: "Price on Request (Dynamic Inventory)",
  pricePerSqFt: "Pricing available on verified developer request",
  reraNumber: "P02400007735",
  reraDisplay: "TG RERA Registered: P02400007735",
  landArea: "Approximately 2.46 Acres",
  towerConcept: "Single 55-Storey Mono Skyscraper",
  towerHeight: "55 Floors (Published Developer Marketing) · ~720 Feet",
  totalUnits: "Approximately 175 – 178 Units (Published Developer Marketing)",
  configurations: "Ultra-Luxury 4 BHK Sky Residences & 5 BHK Sky Mansions",
  sizeRange: "7,812 – 16,000 Sq. Ft.",
  openSpace: "Approximately 75% Open Spaces (Advertised)",
  clubhouseSize: "Approximately 1,01,415 Sq. Ft. (4 Levels)",
  lifestyleAmenities: "2,00,000+ Sq. Ft. of Curated Leisure Infrastructure",
  possession: "Provisional RERA Target (Conflicting public timelines of Nov 2028 & Mar 2029; verify on official portal)",
  status: "Under Construction",
  canonicalUrl: "https://www.naani.in/projects/pavani-mirai-financial-district",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Pavani Mirai",
  developerWebsite: "https://pavaniinfra.com",
  projectWebsite: "https://pavanimirai.com",
  reraWebsite: "https://rera.telangana.gov.in/",
  hero_image: "/assets/pavani-mirai/pavani-mirai-tower-elevation-sunset.webp",
  gallery: [
    "/assets/pavani-mirai/pavani-mirai-tower-elevation-sunset.webp",
    "/assets/pavani-mirai/pavani-mirai-tower-crown-twilight.webp",
    "/assets/pavani-mirai/pavani-mirai-helipad-rooftop-aerial.jpg",
    "/assets/pavani-mirai/pavani-mirai-sky-pods-crown.jpg",
    "/assets/pavani-mirai/pavani-mirai-terra-pod-lounge.jpg",
    "/assets/pavani-mirai/pavani-mirai-terra-club-lounge.jpg",
    "/assets/pavani-mirai/pavani-mirai-sky-residence-lounge.jpg",
    "/assets/pavani-mirai/pavani-mirai-floor-plate-blueprint.jpg",
    "/assets/pavani-mirai/pavani-mirai-master-layout-plan.webp",
  ],
};

export interface ProjectVisual {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
  tag: string;
  category: "elevation" | "skypods" | "lounge" | "blueprint";
  alt: string;
}

export const PROJECT_VISUALS: ProjectVisual[] = [
  {
    id: "elevation-sunset",
    title: "55-Storey Mono Skyscraper at Sunset",
    subtitle: "Majestic single-tower silhouette rising 55 floors amidst western Hyderabad green canopy and Financial District skyline",
    src: miraiSunsetHero,
    badge: "Skyscraper Silhouette",
    tag: "55 Floors · 720 Ft",
    category: "elevation",
    alt: "Pavani Mirai 55-floor ultra-luxury skyscraper elevation at sunset in Puppalaguda, Financial District, Hyderabad",
  },
  {
    id: "crown-twilight",
    title: "Tower Crown & Sky Pods at Twilight",
    subtitle: "Illuminated architectural crown, suspended elemental Sky Pods, vertical garden ribbons, and upper penthouse levels",
    src: miraiTwilightCrown,
    badge: "Architectural Crown",
    tag: "Twilight Sky Pods",
    category: "elevation",
    alt: "Pavani Mirai illuminated skyscraper crown at twilight showing Sky Pods and rooftop architecture",
  },
  {
    id: "helipad-aerial",
    title: "Rooftop Helipad & Sky Pod Aerial Perspective",
    subtitle: "High-angle bird's-eye view detailing the central circular Helipad, four curved Sky Pod pavilions, and dual infinity pools",
    src: miraiHelipadAerial,
    badge: "Rooftop Helipad",
    tag: "720 Ft Rooftop Deck",
    category: "skypods",
    alt: "Pavani Mirai top-down aerial render of rooftop helipad, infinity pools, and 4 curved Sky Pods",
  },
  {
    id: "skypods-crown",
    title: "Elevated Sky Pod Pavilions & Landscaped Terraces",
    subtitle: "Curved floor-to-ceiling glass sky pods, open-air sky recreation deck, children's play arena, and vertical greenery",
    src: miraiSkyPodsCrown,
    badge: "Sky Pod Pavilions",
    tag: "Biophilic Sky Deck",
    category: "skypods",
    alt: "Pavani Mirai architectural close-up of elevated Sky Pods with landscaped sky terraces",
  },
  {
    id: "terra-pod-lounge",
    title: "Terra Pod Ultra-Luxury Sky Lounge",
    subtitle: "Organic earth-sculpted curving walls, circular conversation pit, golden sculptural chandelier, and panoramic horizon glass",
    src: miraiTerraPodLounge,
    badge: "Terra Pod Interior",
    tag: "Earth Element",
    category: "lounge",
    alt: "Pavani Mirai Terra Pod luxury sky lounge interior with organic wood and stone finishes",
  },
  {
    id: "terra-club-lounge",
    title: "Terra Club Panoramic Horizon Lounge",
    subtitle: "Double-height private observation lounge with monumental bronze disk chandelier and floor-to-ceiling glass vistas",
    src: miraiTerraClubLounge,
    badge: "Terra Club Lounge",
    tag: "Observation Deck",
    category: "lounge",
    alt: "Pavani Mirai Terra Club panoramic observation lounge overlooking Hyderabad Financial District horizon",
  },
  {
    id: "sky-residence-lounge",
    title: "Sky Residence Circular Formal Living Expanse",
    subtitle: "Palatial circular entertaining lounge featuring custom marble inlays, cyan velvet curved sectional, and crystal art installation",
    src: miraiSkyResidenceLounge,
    badge: "Sky Residence Interior",
    tag: "~8,000 Sft Format",
    category: "lounge",
    alt: "Pavani Mirai 4 BHK Sky Residence interior formal living room with curved luxury furniture and art deco marble",
  },
  {
    id: "floor-plate-blueprint",
    title: "Authentic Sanctioned Typical Floor Plate (Units 1 to 4)",
    subtitle: "Official layout detailing 4 palatial residences per floor (7,812 to 8,448 Sft), home theatre, 2 maid rooms, and private elevator lobbies",
    src: miraiFloorPlateBlueprint,
    badge: "Sanctioned Blueprint",
    tag: "4 Units Per Floor",
    category: "blueprint",
    alt: "Pavani Mirai official typical floor plate blueprint detailing units 1 through 4 with home theatre and servant quarters",
  },
  {
    id: "master-layout-plan",
    title: "Site Master Plan & 41-Point Leisure Legend",
    subtitle: "Comprehensive 2.46-acre master layout with 41 numbered features including cricket turf, badminton, skating rink, and waterbodies",
    src: miraiMasterLayoutPlan,
    badge: "Site Master Layout",
    tag: "41-Point Legend",
    category: "blueprint",
    alt: "Pavani Mirai 2.46-acre site layout plan detailing 41 outdoor amenities, sports arenas, and landscaped gardens",
  },
];

// Sanctioned Floor Plate Units (From Authentic Blueprint df6fe72c.jpg)
export interface FloorPlateUnit {
  unitNo: string;
  bhk: string;
  sizeSft: number;
  facing: string;
  orientation: string;
  features: string;
}

export const FLOOR_PLATE_UNITS: FloorPlateUnit[] = [
  {
    unitNo: "Unit 01",
    bhk: "4 BHK + Home Theatre + 2 Maid Rooms",
    sizeSft: 8424,
    facing: "North-East",
    orientation: "North-East Corner",
    features: "Palatial 8,424 Sft layout with private foyer, formal lounge, dining lounge, family deck, home theatre room, master suite with expansive closet, and dual maid rooms with independent bath.",
  },
  {
    unitNo: "Unit 02",
    bhk: "4 BHK + Home Theatre + 2 Maid Rooms",
    sizeSft: 8448,
    facing: "North-West",
    orientation: "North-West Corner",
    features: "Largest standard Sky Residence on floor plate at 8,448 Sft. Incorporates massive wrap-around viewing decks, separate service entrance, home theatre, and four king-sized en-suite bedrooms.",
  },
  {
    unitNo: "Unit 03",
    bhk: "4 BHK + Home Theatre + 2 Maid Rooms",
    sizeSft: 7812,
    facing: "South-West",
    orientation: "South-West Corner",
    features: "Spacious 7,812 Sft configuration featuring optimal cross-ventilation, scenic balcony sit-out, dedicated pooja room, formal drawing room, home theatre, and dual staff accommodation.",
  },
  {
    unitNo: "Unit 04",
    bhk: "4 BHK + Home Theatre + 2 Maid Rooms",
    sizeSft: 8141,
    facing: "South-East",
    orientation: "South-East Corner",
    features: "Commanding 8,141 Sft floor plan with morning light, extensive family dining hall, landscape deck, private lift lobby entrance, home theatre, and wet + dry kitchen provisions.",
  },
];

// The Sixth Element Concept Cards
export const SIXTH_ELEMENT_CARDS = [
  {
    id: "earth",
    element: "EARTH",
    symbol: "Terra",
    icon: <Trees size={24} className="text-amber-400" />,
    title: "Nature-Inspired Sanctuary",
    tagline: "Grounded in Biophilic Harmony",
    desc: "Over 75% open landscaped campus featuring zen gardens, tropical water bodies, nature trails, and native botanical flora that isolate residents from urban stress.",
  },
  {
    id: "water",
    element: "WATER",
    symbol: "Aqua",
    icon: <Waves size={24} className="text-cyan-400" />,
    title: "Cascading Horizons & Pools",
    tagline: "Fluidity Above the City",
    desc: "Two panoramic rooftop infinity swimming pools perched at 720 feet, stepped arrival water features, reflective streams, and a half Olympic-size clubhouse lap pool.",
  },
  {
    id: "fire",
    element: "FIRE",
    symbol: "Ignis",
    icon: <Flame size={24} className="text-rose-400" />,
    title: "Energy & Architectural Spark",
    tagline: "Dynamic Skyscraper Expression",
    desc: "A bold, kinetic facade crowned with illuminated sky pods and architectural ribbons that animate the Financial District skyline into a glowing nocturnal landmark.",
  },
  {
    id: "air",
    element: "AIR",
    symbol: "Ventus",
    icon: <Wind size={24} className="text-sky-300" />,
    title: "Breezes & Endless Vistas",
    tagline: "Pure Elevated Air at 720 Feet",
    desc: "300 to 350 sq.ft private outdoor balconies and aerodynamic pod structures capturing uninterrupted cross-breezes and 360-degree vistas of Kokapet and the Financial District.",
  },
  {
    id: "space",
    element: "SPACE",
    symbol: "Aether",
    icon: <Globe size={24} className="text-indigo-400" />,
    title: "Palatial 13-Foot Proportions",
    tagline: "Freedom of Grand Dimensions",
    desc: "Expansive 8,000 to 16,000 sq.ft residences featuring soaring ~13-foot ceiling heights, private elevator lobbies, and column-free spans designed for grand entertaining.",
  },
  {
    id: "life",
    element: "THE SIXTH ELEMENT",
    symbol: "Mirai (Life)",
    icon: <Sparkles size={24} className="text-amber-300" />,
    title: "Life Itself: The Human Experience",
    tagline: "Beyond Luxury. Above Expectations.",
    desc: "Where the five cosmic elements unite into a transcendent living reality—curating a life of absolute privacy, architectural majesty, and holistic family well-being.",
  },
];

// Four Elemental Sky Pods
export const SKY_PODS = [
  {
    id: "terra-pod",
    name: "Terra Pod",
    element: "Earth & Living Sanctuary",
    elevation: "~720 Feet",
    desc: "An organic, biophilic sky lounge finished with flowing wood and stone curves, dedicated conversation circular pits, and lush interior plantings offering serene relaxation above the clouds.",
    highlights: ["Organic curved architecture", "Sculptural metallic art lighting", "Panoramic horizon viewing glass", "Private lounge seating"],
    image: miraiTerraPodLounge,
  },
  {
    id: "aqua-pod",
    name: "Aqua Pod",
    element: "Water & Floating Infinity",
    elevation: "~720 Feet",
    desc: "Perched between the sky and water, this pod connects directly to the two rooftop infinity swimming pools, sunken cocktail kiosks, and private daybeds suspended over the skyline.",
    highlights: ["Twin rooftop infinity pools", "Sunken water seating deck", "Rooftop cabana lounges", "Sunset observation zone"],
    image: miraiHelipadAerial,
  },
  {
    id: "ignis-pod",
    name: "Ignis Pod",
    element: "Fire & Evening Revelry",
    elevation: "~720 Feet",
    desc: "The pinnacle of nocturnal entertaining featuring a private cigar lounge, ambient fire-inspired illumination, cocktail serving bar, and executive business entertaining suites.",
    highlights: ["Private executive cigar lounge", "Artisan cocktail kiosk & bar", "Night skyline illumination", "Exclusive resident events"],
    image: miraiTwilightCrown,
  },
  {
    id: "ventus-pod",
    name: "Ventus Pod",
    element: "Air & Celestial Deck",
    elevation: "~720 Feet",
    desc: "An aerodynamic open-air observation pavilion crowned with the central Helipad, viewing telescopes, stargazing deck, and high-altitude meditation lawns.",
    highlights: ["Rooftop Helipad access", "360° Stargazing observation deck", "High-altitude meditation zone", "Children sky play terrace"],
    image: miraiSkyPodsCrown,
  },
];

// Four-Level Clubhouse Structure (~1,01,415 Sq. Ft.)
export const CLUBHOUSE_LEVELS = [
  {
    id: "level-1",
    levelName: "Level 1: Social & Entertainment",
    subtitle: "Grand Social Galas, Cultural Gatherings & Youth Arenas",
    scale: "~25,000 Sq. Ft.",
    facilities: [
      { name: "350-Seater Multipurpose Banquet Hall", desc: "Palatial banquet venue equipped with acoustic staging and banquet dining for grand family celebrations." },
      { name: "Grand Pre-Function Foyer", desc: "Expansive reception lobby with double-height ceilings for guest welcoming and cocktail hosting." },
      { name: "Dance & Performing Arts Studio", desc: "Mirrored studio with sprung hardwood flooring for ballet, contemporary dance, and workshops." },
      { name: "Modern Crèche & Childcare Zone", desc: "Supervised children's center with safe play equipment and quiet rest rooms for toddlers." },
      { name: "Virtual Cricket Simulation Cage", desc: "Ultra-realistic ball tracking simulator recreating world-famous stadium bowling environments." },
      { name: "Virtual Golf Simulator Arena", desc: "Full-swing sensor technology mapping world-championship 18-hole international golf courses." },
      { name: "Children's Creative Activity Rooms", desc: "Dedicated arts, crafts, and board game spaces fostering cognitive growth in a safe environment." },
    ],
  },
  {
    id: "level-2",
    levelName: "Level 2: Entertainment & Recreation",
    subtitle: "Private Screenings, Gentlemen's Lounges & Luxury Hospitality",
    scale: "~25,000 Sq. Ft.",
    facilities: [
      { name: "50-Seater Private Cinema / Preview Theatre", desc: "Dolby Atmos surround sound, 4K digital projection, and plush recliner seating for private family screenings." },
      { name: "Billiards & Championship Snooker Room", desc: "Full-size English tournament tables with ambient pendant lighting and spectator lounge seating." },
      { name: "Ultra-Luxury Guest Suites", desc: "Five-star hospitality guest rooms allowing visiting dignitaries and family to stay in supreme comfort." },
      { name: "Rejuvenating Luxury Spa & Salon", desc: "Private treatment suites, massage therapy, steam, sauna, and premium salon grooming stations." },
      { name: "Mini Sports Lounge & Bar Kiosk", desc: "Live match broadcasting screens, craft beverage counter, and comfortable sports viewing lounges." },
      { name: "Private Executive Cigar Lounge", desc: "Climate-controlled humidor, leather wingback club chairs, and specialized ventilation system." },
    ],
  },
  {
    id: "level-3",
    levelName: "Level 3: Sports & Fitness",
    subtitle: "Indoor Arenas, Aquatics & Executive Co-Working Suites",
    scale: "~26,000 Sq. Ft.",
    facilities: [
      { name: "Half Olympic-Size Indoor Lap Pool", desc: "Temperature-controlled 25-meter swimming pool with dedicated swimming lanes and loungers." },
      { name: "Indoor Squash Court", desc: "WSF-compliant glass-backed court with shock-absorbent timber flooring." },
      { name: "Dual Indoor Badminton Courts", desc: "BWF-spec badminton courts with anti-glare illumination and high overhead clearance." },
      { name: "Table Tennis Competition Arena", desc: "Multi-table setup with tournament-grade Stiga equipment and safety barriers." },
      { name: "Executive Co-Working Space & Hot Desks", desc: "Sound-insulated workstations, high-speed fiber internet, and ergonomic Herman Miller seating." },
      { name: "Boardroom & Conference Arena", desc: "State-of-the-art teleconferencing facilities, smart displays, and private meeting pods." },
    ],
  },
  {
    id: "level-4",
    levelName: "Level 4: Wellness & Holistic Fitness",
    subtitle: "Cardio Theatres, Mindful Meditation & Rejuvenation Decks",
    scale: "~25,415 Sq. Ft.",
    facilities: [
      { name: "Expansive Fitness Centre & Cardio Theatre", desc: "Commercial-grade Technogym equipment, free weights arena, and heart-rate monitoring stations." },
      { name: "Open-Air Yoga Deck & Sun Salutation Lawn", desc: "East-facing open-air deck designed for sunrise yoga, pranayama, and mindful movement." },
      { name: "Tranquil Meditation & Sound Healing Pavilion", desc: "Acoustically isolated zen sanctuary with natural wood finishes for quiet introspection." },
      { name: "CrossFit & Functional Training Corner", desc: "TRX suspension trainers, kettlebells, battle ropes, and turf agility tracks." },
      { name: "Hydrotherapy Jet Pools & Jacuzzis", desc: "Heated therapeutic jet pools designed for muscle recovery and post-workout revitalization." },
      { name: "Wellness Juice & Nutrition Bar", desc: "Organic cold-pressed refreshments, protein bar, and healthy lifestyle consulting corner." },
    ],
  },
];

// 41 Master Layout Legend Items (From Authentic Plan 20058c93.webp)
export const MASTER_LAYOUT_FEATURES = [
  "1. Entry/Exit Gate", "2. Security Control Room", "3. Welcome Garden", "4. Boomerang Seating Pergola",
  "5. Roller Skating Rink", "6. Cul-de-Sac Drop-off", "7. Jogging Track Loop", "8. Buddha Meditation Garden",
  "9. Sculpture Court", "10. Trickling Water Cascade", "11. Zen Rock Garden", "12. Tropical Water Body",
  "13. Biophilic Cove Seating / Reading Lounge", "14. Cozy Seating Corner", "15. Pet Park & Play Lawn", "16. Gathering Lawn",
  "17. Barbeque Counter", "18. Statue of Peace", "19. Couch Sit-Outs", "20. Serving Counter with Bar Stools",
  "21. Cocktail Kiosk", "22. Indoor Bike Stand", "23. Stepped Entrance Waterbody", "24. Grand Main Drop-Off",
  "25. Reflective Waterbody", "26. Parametric Feature Wall", "27. Nature Walking Trail", "28. Outdoor Bicycle Stand",
  "29. Senior Citizen Corner", "30. Children's Sand Pit", "31. Kids Climbing Wall", "32. Timber Seating Deck",
  "33. Kids Adventure Play Zone", "34. Live Board Game Play Zone", "35. Vortex Garden", "36. Stroll Lawn",
  "37. Arrival Water Sculpture", "38. Pet Grooming Corner", "39. Cricket Practice Turf", "40. Badminton Court",
  "41. Multipurpose Sports Court"
];

// Verification Status Matrix (Phase 1 & 14)
export const VERIFICATION_MATRIX = [
  { field: "Project Name", value: "Pavani Mirai", status: "Verified", source: "TG RERA Application & Developer Brochure" },
  { field: "RERA Registration Number", value: "P02400007735", status: "Verified", source: "Telangana State RERA Portal" },
  { field: "Developer & Promoter", value: "Pavani Infra / Sai Sravanthi Infra Projects Pvt. Ltd.", status: "Verified", source: "RERA Official Record" },
  { field: "Project Location", value: "Puppalaguda, Financial District, Hyderabad", status: "Verified", source: "RERA Sanctioned Address" },
  { field: "Land Footprint", value: "Approximately 2.46 Acres", status: "Verified", source: "Sanctioned Site Master Plan" },
  { field: "Tower Structure", value: "Single Mono Tower (55 Floors / 720 Ft)", status: "Provisional", source: "Developer Marketing (Some filings cite 51-55 Floors; verify sanctioned plan)" },
  { field: "Total Residential Inventory", value: "178 Units (Published)", status: "Provisional", source: "Developer Portfolio (Subject to final release)" },
  { field: "4 BHK Sky Residence Sizes", value: "7,812 – 8,448 Sq. Ft.", status: "Verified", source: "Sanctioned Floor Plate Blueprint (Units 1 to 4)" },
  { field: "5 BHK Sky Mansion Duplex", value: "~16,000 Sq. Ft. (8 Units Advertised)", status: "Provisional", source: "Developer Marketing Announcement (Verify unit availability)" },
  { field: "Clubhouse Magnitude", value: "~1,01,415 Sq. Ft. across 4 Levels", status: "Provisional", source: "Developer Advertised Schedule" },
  { field: "Four Elemental Sky Pods", value: "Terra, Aqua, Ignis, Ventus (~720 Ft)", status: "Provisional", source: "Architectural Concept Presentation" },
  { field: "Possession Timeline", value: "Nov 2028 / Mar 2029 (Conflicting Public Claims)", status: "Pending Verification", source: "Subject to inspection of latest sanctioned milestone filings on RERA portal" },
  { field: "Current Pricing", value: "Dynamic / Price on Authorized Request", status: "Verified", source: "Secondary mentions (~₹15,999/sq.ft.) are indicative only" },
];

export const PavaniMiraiPage = () => {
  const formId = useId();

  // Visual Slider & Lightbox State
  const [activeHeroTab, setActiveHeroTab] = useState(0);
  const [activeGalleryTab, setActiveGalleryTab] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<ProjectVisual | null>(null);
  const [activeFloorPlateUnit, setActiveFloorPlateUnit] = useState<FloorPlateUnit>(FLOOR_PLATE_UNITS[0]);
  const [activeClubhouseTab, setActiveClubhouseTab] = useState("level-1");
  const [activeElementTab, setActiveElementTab] = useState("earth");

  // Lead Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredResidence, setPreferredResidence] = useState("4-bhk-sky-residence");
  const [buyingPurpose, setBuyingPurpose] = useState("Self Use / Family Living");
  const [preferredVisitDate, setPreferredVisitDate] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Filter gallery items
  const filteredVisuals =
    activeGalleryTab === "all"
      ? PROJECT_VISUALS
      : PROJECT_VISUALS.filter((v) => v.category === activeGalleryTab);

  // WhatsApp Pre-filled URL
  const waMessage = `Hi Naani Projects, I am interested in Pavani Mirai, Puppalaguda - Financial District (TG RERA P02400007735). Please share the official brochure, verified floor plans, and current pricing for Sky Residences & Mansions.`;
  const waUrl = `https://wa.me/919493943946?text=${encodeURIComponent(waMessage)}`;

  // Copy RERA to clipboard
  const handleCopyRera = async () => {
    try {
      await navigator.clipboard.writeText(PROJECT_CONFIG.reraNumber);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      setCopySuccess(false);
    }
  };

  // Lead Submission Handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMsg("");

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!fullName.trim()) {
      setFormErrorMsg("Please enter your full name.");
      return;
    }

    if (!consentChecked) {
      setFormErrorMsg("Please check the consent box to proceed.");
      return;
    }

    setFormStatus("submitting");

    const leadData: LeadProfile = {
      name: fullName.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      preferred_bhk: preferredResidence.includes("5-bhk") ? "5 BHK" : "4 BHK",
      preferred_size: preferredResidence.includes("5-bhk") ? "~16,000 Sq. Ft. (Sky Mansion)" : "7,812 – 8,448 Sq. Ft. (Sky Residence)",
      buying_purpose: buyingPurpose as any,
      site_visit_date: preferredVisitDate || undefined,
      notes: `Pavani Mirai Enquiry. Selected Category: ${preferredResidence}. Visit: ${preferredVisitDate || "Not specified"}. Purpose: ${buyingPurpose}.`,
      source: "Website - Pavani Mirai Financial District",
      project_name: PROJECT_CONFIG.name,
      project_slug: "pavani-mirai-financial-district",
    };

    const pageContext: PageContext = {
      source: "Website - Pavani Mirai Financial District",
      project_name: PROJECT_CONFIG.name,
      project_slug: "pavani-mirai-financial-district",
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

  // Schema Structured Data
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${PROJECT_CONFIG.canonicalUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
      { "@type": "ListItem", position: 3, name: "Financial District", item: "https://www.naani.in/projects-in-financial-district" },
      { "@type": "ListItem", position: 4, name: "Pavani Mirai", item: PROJECT_CONFIG.canonicalUrl },
    ],
  };

  const schemaProject = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${PROJECT_CONFIG.canonicalUrl}#project`,
    name: "Pavani Mirai",
    url: PROJECT_CONFIG.canonicalUrl,
    description:
      "Pavani Mirai is an ultra-luxury 55-storey single mono skyscraper in Puppalaguda, Financial District, Hyderabad by Pavani Infra. Featuring exclusive ~8,000 Sft Sky Residences, ~16,000 Sft Sky Mansions, 4 Sky Pods at ~720 feet, and 1,01,415 Sft 4-level clubhouse. Registered under TG RERA P02400007735.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Puppalaguda, Financial District",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500089",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.4116",
      longitude: "78.3498",
    },
    telephone: "+919493943946",
    developer: {
      "@type": "Organization",
      name: "Pavani Infra",
      url: "https://pavaniinfra.com/",
    },
    image: [
      "https://www.naani.in/og-pavani-mirai.jpg",
      "https://www.naani.in/assets/pavani-mirai/pavani-mirai-tower-elevation-sunset.webp",
      "https://www.naani.in/assets/pavani-mirai/pavani-mirai-floor-plate-blueprint.jpg",
    ],
  };

  const schemaFaqs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PROJECT_CONFIG.canonicalUrl}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is Pavani Mirai located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pavani Mirai is situated in Puppalaguda, right in the Financial District corridor of Hyderabad, near Outer Ring Road (ORR Exit 4), Kokapet Neopolis, and major IT campuses.",
        },
      },
      {
        "@type": "Question",
        name: "Who is the developer of Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pavani Mirai is developed by Pavani Infra with promoter Sai Sravanthi Infra Projects Private Limited, prominent real estate developers with luxury projects across Hyderabad.",
        },
      },
      {
        "@type": "Question",
        name: "What is the RERA registration number of Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pavani Mirai is officially registered with Telangana RERA under registration ID TG RERA P02400007735.",
        },
      },
      {
        "@type": "Question",
        name: "What configurations and sizes are available at Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pavani Mirai exclusively offers 4 BHK Sky Residences ranging from 7,812 to 8,448 sq. ft. (with dedicated home theatre and 2 maid rooms) and palatial 5 BHK Sky Mansion Duplexes spanning approximately 16,000 sq. ft.",
        },
      },
      {
        "@type": "Question",
        name: "What are the four Sky Pods at Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The four Sky Pods (Terra Pod, Aqua Pod, Ignis Pod, and Ventus Pod) are architectural pavilions perched at approximately 720 feet elevation, hosting private sky lounges, rooftop infinity pools, and panoramic horizon observation decks.",
        },
      },
      {
        "@type": "Question",
        name: "What is The Sixth Element concept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Sixth Element is the central design philosophy uniting the five cosmic elements—Earth, Water, Fire, Air, and Space—with Life itself, delivering an elevated, biophilic living environment.",
        },
      },
      {
        "@type": "Question",
        name: "How large is the clubhouse at Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The development features a four-level luxury clubhouse spanning approximately 1,01,415 sq. ft., housing a 350-seater banquet hall, 50-seater private cinema, half Olympic-size pool, virtual sports, squash, and holistic wellness spa.",
        },
      },
      {
        "@type": "Question",
        name: "What is the latest price of residences at Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pricing is dynamic and provided upon authorized private enquiry based on unit selection, floor rise, and developer release. Contact Naani Projects at +91 94939 43946 for official pricing.",
        },
      },
      {
        "@type": "Question",
        name: "What is the possession timeline for Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Public sources cite completion timelines between late 2028 and early 2029. Prospective buyers should inspect the latest sanctioned milestones on the official TG RERA portal.",
        },
      },
      {
        "@type": "Question",
        name: "How can I schedule a private site visit to Pavani Mirai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can submit the private consultation form on this page or connect with our senior luxury property advisors via WhatsApp or phone at +91 94939 43946.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Pavani Mirai Financial District | Ultra Luxury Apartments Hyderabad"
        description="Explore Pavani Mirai in Puppalaguda, Hyderabad. Discover exclusive 4 & 5 BHK Sky Residences, Sky Mansions, Sky Pods, clubhouse and luxury amenities."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        ogImage="https://www.naani.in/og-pavani-mirai.jpg"
        type="website"
      />

      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProject) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaqs) }}
      />

      <div className="min-h-screen bg-[#060911] text-slate-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 pb-20 md:pb-0">
        {/* =========================================================================
            SECTION 1: HERO SECTION WITH OFFICIAL INTERACTIVE VISUAL SHOWCASE
           ========================================================================= */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-800/80">
          {/* Subtle Ambient Gold Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none">
            <div className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-amber-500/10 blur-[150px] rounded-full" />
            <div className="absolute top-20 right-1/4 w-[450px] h-[320px] bg-cyan-600/10 blur-[140px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-6">
              <Link to="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-slate-600" />
              <Link to="/projects" className="hover:text-amber-400 transition-colors">
                Projects
              </Link>
              <ChevronRight size={14} className="text-slate-600" />
              <Link to="/projects-in-financial-district" className="hover:text-amber-400 transition-colors">
                Financial District
              </Link>
              <ChevronRight size={14} className="text-slate-600" />
              <span className="text-amber-400 font-medium">Pavani Mirai</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Hero Copy & Interactive Visual Showcase */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
                  <span>PAVANI INFRA · SAI SRAVANTHI · PUPPALAGUDA – FINANCIAL DISTRICT</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                    Pavani Mirai <br />
                    <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                      Beyond Luxury. Above Expectations.
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg font-medium text-slate-300">
                    Ultra-Luxury Sky Residences &amp; Sky Mansions in Financial District, Hyderabad
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Experience an exclusive architectural landmark rising 55 storeys with panoramic ~720-foot Sky Pods, sweeping ~8,000 Sft Sky Residences, palatial ~16,000 Sft Sky Mansions, and a 1,01,415 Sft four-level luxury clubhouse.
                </p>

                {/* OFFICIAL INTERACTIVE HERO VISUAL SHOWCASE */}
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl group">
                  <div
                    className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden cursor-zoom-in"
                    onClick={() => setSelectedImage(PROJECT_VISUALS[activeHeroTab])}
                  >
                    <img
                      src={PROJECT_VISUALS[activeHeroTab].src}
                      alt={PROJECT_VISUALS[activeHeroTab].alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      fetchPriority="high"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow">
                        {PROJECT_VISUALS[activeHeroTab].badge}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-[10px] font-bold text-emerald-300 shadow">
                        Official Project Visual
                      </span>
                    </div>

                    {/* Zoom Action Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(PROJECT_VISUALS[activeHeroTab]);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-amber-400 transition-colors z-10 shadow"
                      aria-label="Enlarge image"
                    >
                      <Maximize2 size={16} />
                    </button>

                    {/* Desktop Prev / Next Navigation Arrows */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHeroTab((prev) => (prev === 0 ? PROJECT_VISUALS.length - 1 : prev - 1));
                      }}
                      className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white hover:text-amber-400 hover:border-amber-400/50 items-center justify-center transition-all z-10 shadow-lg"
                      aria-label="Previous Visual"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHeroTab((prev) => (prev === PROJECT_VISUALS.length - 1 ? 0 : prev + 1));
                      }}
                      className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white hover:text-amber-400 hover:border-amber-400/50 items-center justify-center transition-all z-10 shadow-lg"
                      aria-label="Next Visual"
                    >
                      <ChevronRight size={18} />
                    </button>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-left">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white font-bold truncate">
                          {PROJECT_VISUALS[activeHeroTab].title}
                        </strong>
                        <span className="text-amber-400 font-mono text-[11px] shrink-0 ml-2">
                          {activeHeroTab + 1} / {PROJECT_VISUALS.length}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 truncate mt-0.5">
                        {PROJECT_VISUALS[activeHeroTab].subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
                    {PROJECT_VISUALS.map((vis, idx) => (
                      <button
                        key={vis.id}
                        type="button"
                        onClick={() => setActiveHeroTab(idx)}
                        className={`relative rounded-lg overflow-hidden shrink-0 w-14 sm:w-16 h-10 sm:h-11 border transition-all ${
                          activeHeroTab === idx
                            ? "border-amber-400 ring-2 ring-amber-400/30 scale-105"
                            : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700"
                        }`}
                        title={vis.title}
                      >
                        <img src={vis.src} alt={vis.title} className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Land Parcel
                    </span>
                    <span className="text-base font-extrabold text-amber-400">~2.46 Acres</span>
                    <span className="text-[11px] text-slate-400 block">~75% Open Space</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Mono Skyscraper
                    </span>
                    <span className="text-base font-extrabold text-amber-400">55 Floors</span>
                    <span className="text-[11px] text-slate-400 block">~720 Ft Elevation</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      Residences
                    </span>
                    <span className="text-base font-extrabold text-amber-400">4 &amp; 5 BHK</span>
                    <span className="text-[11px] text-slate-400 block">7,812 – 16,000 Sft</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 shadow-sm hover:border-amber-500/30 transition-all">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                      TG RERA
                    </span>
                    <span className="text-base font-extrabold text-amber-400">P02400007735</span>
                    <span className="text-[11px] text-slate-400 block">Registered</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="#enquiry-section"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <span>Request Private Consultation</span>
                    <ArrowRight size={16} className="ml-2" />
                  </a>

                  <a
                    href="#floorplans"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 font-bold text-sm transition-all active:scale-95"
                  >
                    <Layers size={15} className="mr-2 text-amber-400" />
                    <span>View Floor Plans</span>
                  </a>

                  <a
                    href="#clubhouse"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 font-bold text-sm transition-all active:scale-95"
                  >
                    <Building2 size={15} className="mr-2 text-amber-400" />
                    <span>Clubhouse (4 Levels)</span>
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-sm transition-all border border-emerald-500/40 shadow-sm active:scale-95"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Advisory Lead Capture Card */}
              <div className="lg:col-span-5" id="enquiry-section">
                <div className="sticky top-24 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-7 shadow-2xl space-y-5">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-widest uppercase text-amber-400 block mb-1">
                      Direct Advisory Access
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Request Pricing &amp; Sky Residences
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Receive verified floor plans, transparent cost schedules, and confidential inventory availability from senior luxury advisors.
                    </p>
                  </div>

                  {formStatus === "success" ? (
                    <div className="p-5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className="text-base font-bold text-white">Consultation Request Received</h4>
                      <p className="text-xs text-slate-300">
                        Thank you for your interest in Pavani Mirai. Our dedicated luxury property consultant will connect with you privately.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all gap-1.5"
                      >
                        <MessageCircle size={14} />
                        <span>Continue Conversation on WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      {formErrorMsg && (
                        <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                          <AlertTriangle size={14} className="shrink-0" />
                          <span>{formErrorMsg}</span>
                        </div>
                      )}

                      <div>
                        <label htmlFor={`${formId}-name`} className="block text-xs font-bold text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          id={`${formId}-name`}
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sravan Kumar"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor={`${formId}-phone`} className="block text-xs font-bold text-slate-300 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          id={`${formId}-phone`}
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          10-digit Indian mobile number
                        </span>
                      </div>

                      <div>
                        <label htmlFor={`${formId}-email`} className="block text-xs font-bold text-slate-300 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          id={`${formId}-email`}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor={`${formId}-residence`} className="block text-xs font-bold text-slate-300 mb-1">
                            Preferred Format
                          </label>
                          <select
                            id={`${formId}-residence`}
                            value={preferredResidence}
                            onChange={(e) => setPreferredResidence(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                          >
                            <option value="4-bhk-sky-residence">4 BHK Sky Residence (~8,000 Sft)</option>
                            <option value="5-bhk-sky-mansion">5 BHK Sky Mansion Duplex (~16,000 Sft)</option>
                            <option value="undecided-consultation">Request Advisor Guidance</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor={`${formId}-purpose`} className="block text-xs font-bold text-slate-300 mb-1">
                            Buying Purpose
                          </label>
                          <select
                            id={`${formId}-purpose`}
                            value={buyingPurpose}
                            onChange={(e) => setBuyingPurpose(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                          >
                            <option value="Self Use / Family Living">Self Use / Family Living</option>
                            <option value="Long Term Ultra-Luxury Asset">Long Term Asset</option>
                            <option value="Portfolio Investment">Portfolio Investment</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor={`${formId}-visit-date`} className="block text-xs font-bold text-slate-300 mb-1">
                          Preferred Site Visit Date (Optional)
                        </label>
                        <input
                          id={`${formId}-visit-date`}
                          type="date"
                          value={preferredVisitDate}
                          onChange={(e) => setPreferredVisitDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* Consent Checkbox: Unchecked by Default */}
                      <div className="flex items-start gap-2.5 pt-1">
                        <input
                          id={`${formId}-consent`}
                          type="checkbox"
                          checked={consentChecked}
                          onChange={(e) => setConsentChecked(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400 cursor-pointer"
                        />
                        <label htmlFor={`${formId}-consent`} className="text-[11px] text-slate-400 leading-snug cursor-pointer">
                          I agree to be contacted via WhatsApp/Call regarding Pavani Mirai project details, floor plans, and pricing availability.
                        </label>
                      </div>

                      <Button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                      >
                        {formStatus === "submitting" ? "Registering Request..." : "Request Latest Price & Floor Plans"}
                      </Button>

                      <div className="pt-1 text-center">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                        >
                          <MessageCircle size={13} className="text-emerald-400" />
                          <span>Or connect immediately on WhatsApp</span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE SIXTH ELEMENT ARCHITECTURAL PHILOSOPHY
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60 relative overflow-hidden" id="concept">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Architectural Concept
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                THE SIXTH ELEMENT
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Where Five Elements Come Together to Create an Extraordinary Living Experience.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
                Inspired by the cosmic building blocks of nature—Earth, Water, Fire, Air, and Space—with the Sixth Element representing Life itself, curating an ultra-luxury ecosystem where architecture and human well-being become one.
              </p>
            </div>

            {/* Element Interactive Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SIXTH_ELEMENT_CARDS.map((el) => (
                <div
                  key={el.id}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    el.id === "life"
                      ? "bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/50 shadow-xl shadow-amber-500/10 sm:col-span-2 lg:col-span-1"
                      : "bg-slate-900/80 border-slate-800/90 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {el.icon}
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                      {el.symbol}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    {el.element}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{el.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{el.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: AN ICON ABOVE THE CITY — FOUR ELEMENTAL SKY PODS
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="sky-pods">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Architectural Iconography
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                AN ICON ABOVE THE CITY
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Four Elemental Sky Pods. One Extraordinary Skyline Experience.
              </p>
            </div>

            {/* Key Skyscraper Highlights Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 block">55 Floors</span>
                  <span className="text-xs text-slate-300">Single Mono Tower</span>
                </div>
                <div className="p-3">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 block">~720 Feet</span>
                  <span className="text-xs text-slate-300">Sky Pod Altitude</span>
                </div>
                <div className="p-3">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 block">2 Pools</span>
                  <span className="text-xs text-slate-300">Rooftop Infinity Edge</span>
                </div>
                <div className="p-3">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 block">~13 Feet</span>
                  <span className="text-xs text-slate-300">Ceiling Heights</span>
                </div>
              </div>
            </div>

            {/* Sky Pods 4-Card Showcase */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {SKY_PODS.map((pod) => (
                <div
                  key={pod.id}
                  className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                    <img
                      src={pod.image}
                      alt={pod.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                          {pod.element}
                        </span>
                        <h3 className="text-xl font-extrabold text-white">{pod.name}</h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700 text-xs font-mono text-slate-300">
                        {pod.elevation}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{pod.desc}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                      {pod.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: EXCLUSIVE RESIDENCES — SKY RESIDENCES & SKY MANSIONS
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="residences">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Palatial Living Formats
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                A RESIDENCE BEYOND THE ORDINARY
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Discover the two distinct ultra-luxury residential categories engineered for uncompromising privacy and generous proportions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Category 1: Sky Residences */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/40 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    Category 1
                  </span>
                  <span className="text-xs font-bold text-slate-400">4 BHK Formats</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    SKY RESIDENCES
                  </h3>
                  <div className="text-amber-400 font-extrabold text-lg">
                    Approximately 8,000 Sq. Ft.
                  </div>
                  <span className="text-xs text-slate-400 block">
                    Sanctioned blueprint units: 7,812 to 8,448 Sft (4 BHK + Home Theatre + 2 Maid Rooms)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Expansive single-level residential spaces designed for families who appreciate privacy, generous proportions, premium interiors, and elevated skyline living.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Four palatial master suites with walk-in wardrobes and en-suite baths</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Dedicated Home Theatre room (~14' x 16') with acoustic isolation</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Dual maid rooms with private independent bathroom and service access</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Private passenger elevator lobby ensuring zero common corridor transit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>300–350 sq.ft expansive sit-out balconies &amp; landscaped deck</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#enquiry-section"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs text-center transition-all shadow block"
                  >
                    Request 4 BHK Sky Residence Cost Sheet
                  </a>
                </div>
              </div>

              {/* Category 2: Sky Mansions */}
              <div className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                    Category 2 · Ultra-Exclusive
                  </span>
                  <span className="text-xs font-bold text-slate-400">5 BHK Duplex</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    SKY MANSIONS
                  </h3>
                  <div className="text-amber-400 font-extrabold text-lg">
                    Approximately 16,000 Sq. Ft.
                  </div>
                  <span className="text-xs text-slate-400 block">
                    Eight exclusive duplex residences advertised by developer (Subject to release)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  An extraordinary duplex residential concept designed for connoisseurs seeking monumental space, supreme privacy, double-height volumes, and a distinctive luxury lifestyle.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Two-level palatial duplex configuration with internal architectural staircase</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Five expansive bedroom suites with private lounges &amp; study spaces</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Double-height grand living hall with soaring ~26-foot glazed facade</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Private plunge pool, personal gymnasium corner, and sky terrace</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>Reserved multi-vehicle prime parking bays in secure cellar</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#enquiry-section"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs text-center transition-all block"
                  >
                    Enquire for Sky Mansion Availability
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: SANCTIONED FLOOR PLANS & MASTER LAYOUT BLUEPRINT
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="floorplans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Architectural Layouts &amp; Floor Plate
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                EXPLORE THE ART OF SPACIOUS LIVING
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Authentic municipal blueprints and sanctioned master site layout detailing unit proportions, home theatre integration, servant quarters, and 41 outdoor amenities.
              </p>
            </div>

            {/* SANCTIONED TYPICAL FLOOR PLATE SHOWCASE */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/30 shadow-2xl mb-12">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div
                    onClick={() => setSelectedImage(PROJECT_VISUALS[7])}
                    className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-slate-950 cursor-zoom-in group p-2"
                  >
                    <img
                      src={miraiFloorPlateBlueprint}
                      alt="Pavani Mirai official typical floor plate blueprint detailing units 1 to 4 with square footage, home theatre, and maid rooms"
                      className="w-full h-auto object-contain max-h-[500px] mx-auto rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/90 text-[11px] font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                      <Maximize2 size={13} />
                      <span>Click to Zoom Blueprint</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Authentic Sanctioned Floor Plate (Units 01 to 04)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(PROJECT_VISUALS[7])}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                    >
                      <Eye size={13} />
                      <span>Full Screen</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: 4-Unit Selector */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-widest uppercase text-amber-400 block mb-1">
                      4 Units Per Floor Plate
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      Typical Floor Plan &amp; Unit Sizing
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Every floor plate features 4 exclusive 4 BHK Sky Residences ranging from 7,812 to 8,448 Sft, each with private lift lobby, home theatre room, and 2 maid rooms.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                      Select Unit to Inspect Dimensions:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {FLOOR_PLATE_UNITS.map((u) => (
                        <button
                          key={u.unitNo}
                          type="button"
                          onClick={() => setActiveFloorPlateUnit(u)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            activeFloorPlateUnit.unitNo === u.unitNo
                              ? "bg-amber-500/15 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40"
                              : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-amber-400">{u.unitNo}</span>
                            <span className="text-[10px] text-slate-400">{u.facing}</span>
                          </div>
                          <span className="text-sm font-extrabold text-white block mt-0.5">
                            {u.sizeSft.toLocaleString()} Sft
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Unit Highlight Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-white font-bold">{activeFloorPlateUnit.unitNo} · {activeFloorPlateUnit.orientation}</strong>
                      <span className="text-amber-400 font-extrabold">{activeFloorPlateUnit.sizeSft.toLocaleString()} Sq. Ft.</span>
                    </div>
                    <div className="text-[11px] text-slate-300 leading-relaxed">
                      {activeFloorPlateUnit.features}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(PROJECT_VISUALS[7])}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-center text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <Maximize2 size={14} />
                      <span>Inspect Sanctioned Blueprint in Lightbox</span>
                    </button>
                    <a
                      href="#enquiry-section"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <FileText size={14} className="text-amber-400" />
                      <span>Request Individual Unit CAD / PDF Layout</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* MASTER SITE PLAN & 41-POINT LEGEND */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 space-y-6">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                    Ground-Level Infrastructure
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Master Site Plan &amp; 41-Point Legend
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Spread across ~2.46 acres, the ground realm features a vehicle-free central podium with 41 distinct outdoor recreational amenities, sports arenas, and water sculptures.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-white block">Key Outdoor Highlights:</span>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      <li>Cricket practice turf &amp; sports cage</li>
                      <li>Badminton &amp; multipurpose sports courts</li>
                      <li>Roller skating rink &amp; jogging track loop</li>
                      <li>Zen garden, Buddha garden &amp; pet park</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedImage(PROJECT_VISUALS[8])}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Maximize2 size={13} className="text-amber-400" />
                    <span>Zoom Master Plan &amp; Legend</span>
                  </button>
                </div>

                <div className="lg:col-span-7">
                  <div
                    onClick={() => setSelectedImage(PROJECT_VISUALS[8])}
                    className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-zoom-in group p-2"
                  >
                    <img
                      src={miraiMasterLayoutPlan}
                      alt="Pavani Mirai site master layout plan detailing 41 outdoor amenities"
                      className="w-full h-auto object-contain max-h-[460px] mx-auto rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/90 text-[11px] font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 shadow">
                      <Eye size={13} />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 41-Point Legend Collapsible/Scrollable Area */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                  Complete 41-Point Landscape Legend:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-[11px] text-slate-400 max-h-48 overflow-y-auto pr-2">
                  {MASTER_LAYOUT_FEATURES.map((feat, idx) => (
                    <div key={idx} className="p-1.5 rounded bg-slate-950/60 border border-slate-800/60 truncate">
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FOUR-LEVEL LUXURY CLUBHOUSE (~1,01,415 SQ. FT.)
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="clubhouse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Lifestyle Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                AN EXTRAORDINARY WORLD OF LIFESTYLE
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Approximately 1,01,415 Sq. Ft. of Curated Clubhouse Space across Four Dedicated Levels.
              </p>

              {/* Level Selector Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {CLUBHOUSE_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setActiveClubhouseTab(lvl.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeClubhouseTab === lvl.id
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    {lvl.levelName.split(":")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Clubhouse Level Content */}
            {(() => {
              const currentLvl =
                CLUBHOUSE_LEVELS.find((l) => l.id === activeClubhouseTab) || CLUBHOUSE_LEVELS[0];
              return (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{currentLvl.levelName}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{currentLvl.subtitle}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 self-start sm:self-auto">
                      {currentLvl.scale}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentLvl.facilities.map((fac, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between hover:border-amber-500/30 transition-all space-y-2"
                      >
                        <div className="flex items-start gap-2.5">
                          <Check size={16} className="text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-bold text-white">{fac.name}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{fac.desc}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono tracking-wider">
                          Advertised Specification
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: ROOFTOP & OUTDOOR AMENITIES
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="amenities">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Elevated Leisure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                ELEVATED LEISURE. EXCEPTIONAL EXPERIENCES.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Discover 2,00,000+ Sq. Ft. of combined rooftop observation spaces and ground-level athletic arenas.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Waves size={22} className="text-cyan-400" />
                <h4 className="text-sm font-bold text-white">2 Rooftop Infinity Pools</h4>
                <p className="text-xs text-slate-400">Perched at ~720 feet with panoramic sunset vistas over western Hyderabad.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Plane size={22} className="text-amber-400" />
                <h4 className="text-sm font-bold text-white">Rooftop Helipad</h4>
                <p className="text-xs text-slate-400">Central circular helipad engineered atop the 55-storey skyscraper crown.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Globe size={22} className="text-indigo-400" />
                <h4 className="text-sm font-bold text-white">Four Sky Pods</h4>
                <p className="text-xs text-slate-400">Terra, Aqua, Ignis, and Ventus elemental observation and entertaining pavilions.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <Activity size={22} className="text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Sports Turf &amp; Courts</h4>
                <p className="text-xs text-slate-400">Ground-level cricket practice turf, badminton court, and multipurpose play zone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: DEDICATED PROJECT GALLERY & ARCHITECTURAL SHOWCASE
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Visual Documentation
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Project Gallery &amp; Architectural Showcase
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Explore high-resolution visual documentation of Pavani Mirai, from sunset skyscraper silhouettes and rooftop helipad aerials to sanctioned blueprints.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {[
                  { id: "all", label: `All Visuals (${PROJECT_VISUALS.length})` },
                  { id: "elevation", label: "Tower Elevations (2)" },
                  { id: "skypods", label: "Sky Pods & Rooftop (2)" },
                  { id: "lounge", label: "Interior Lounges (3)" },
                  { id: "blueprint", label: "Sanctioned Blueprints (2)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveGalleryTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeGalleryTab === tab.id
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVisuals.map((vis) => (
                <div
                  key={vis.id}
                  onClick={() => setSelectedImage(vis)}
                  className="group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 hover:border-amber-500/50 transition-all duration-300 cursor-zoom-in flex flex-col shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                    <img
                      src={vis.src}
                      alt={vis.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-amber-300 shadow">
                        {vis.badge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 group-hover:text-amber-400 transition-colors">
                      <Maximize2 size={13} />
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold mb-0.5">
                        <span className="uppercase tracking-wider">{vis.tag}</span>
                        <span className="text-slate-400">Official Release</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {vis.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {vis.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-800/80">
                      <span className="group-hover:text-slate-200 transition-colors">Inspect High-Resolution Render</span>
                      <ArrowRight size={13} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: STRATEGIC LOCATION & REGIONAL CONNECTIVITY
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="location">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Strategic Location
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                AN ADDRESS IN HYDERABAD'S MOST PROMINENT BUSINESS CORRIDOR
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Puppalaguda – Financial District, Hyderabad. Offering rapid access to prime IT destinations, arterial expressways, and international schools.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Connectivity Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase">Employment Clusters</span>
                    <h4 className="text-sm font-bold text-white">Financial District &amp; Kokapet</h4>
                    <p className="text-xs text-slate-400">~3–5 mins to Microsoft, Google, Amazon, and Neopolis SEZ.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase">Expressway Link</span>
                    <h4 className="text-sm font-bold text-white">Nehru Outer Ring Road (ORR)</h4>
                    <p className="text-xs text-slate-400">Direct access via Exit 4 (Nanakramguda / Gachibowli).</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase">Airport Reach</span>
                    <h4 className="text-sm font-bold text-white">Rajiv Gandhi Int'l Airport</h4>
                    <p className="text-xs text-slate-400">Seamless 25-minute signal-free expressway transit.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase">Schools &amp; Healthcare</span>
                    <h4 className="text-sm font-bold text-white">Elite Institutions</h4>
                    <p className="text-xs text-slate-400">Keystone, Rockwell, Oakridge, and Continental Hospital within 10 mins.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white block">Regional Commute Matrix:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-400 block text-[10px]">Financial District</span>
                      <strong>~3–5 Mins</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-400 block text-[10px]">Kokapet Neopolis</span>
                      <strong>~5 Mins</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-400 block text-[10px]">Gachibowli Stadium</span>
                      <strong>~8–10 Mins</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-400 block text-[10px]">Raidurg Metro</span>
                      <strong>~12 Mins</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-400 block text-[10px]">HITEC City</span>
                      <strong>~15 Mins</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-900 text-slate-300">
                      <span className="text-slate-400 block text-[10px]">RGIA Airport</span>
                      <strong>~25 Mins</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Maps Embed */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl h-[340px]">
                  <iframe
                    title="Pavani Mirai Location Map"
                    src="https://www.google.com/maps?q=Puppalaguda+Financial+District+Hyderabad&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: DEVELOPER PROFILE & RERA TRANSPARENCY
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="developer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-8">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                  Developer Profile
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  ABOUT PAVANI INFRA &amp; SAI SRAVANTHI
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pavani Infra (promoter Sai Sravanthi Infra Projects Private Limited) is an established real estate developer in Hyderabad, recognized for delivering well-engineered gated residential projects across western and northern growth corridors.
                </p>
              </div>

              {/* Cross-linking other Pavani projects on Naani */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                  Other Verified Pavani Projects on Naani Projects:
                </span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link
                    to="/projects/pavani-starlit-miyapur"
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        Pavani Starlit
                      </h4>
                      <span className="text-[11px] text-slate-400">Miyapur, Hyderabad · Premium Residential</span>
                    </div>
                    <ArrowRight size={15} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/projects/pavani-felicity-nizampet"
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        Pavani Felicity
                      </h4>
                      <span className="text-[11px] text-slate-400">Nizampet, Hyderabad · 3 BHK High-Rise (23 Floors)</span>
                    </div>
                    <ArrowRight size={15} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* External Developer & RERA Links */}
              <div className="flex flex-wrap gap-3 pt-2 text-xs">
                <a
                  href={PROJECT_CONFIG.developerWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ExternalLink size={13} />
                  <span>Pavani Infra Official Website</span>
                </a>
                <a
                  href={PROJECT_CONFIG.projectWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ExternalLink size={13} />
                  <span>Pavani Mirai Official Portal</span>
                </a>
                <a
                  href={PROJECT_CONFIG.reraWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>Telangana RERA Official Portal</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: DATA VERIFICATION MATRIX & INDEPENDENT ADVISORY
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="due-diligence">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Consumer Transparency
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                PROJECT DATA VERIFICATION MATRIX
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Naani Projects publishes verified project parameters alongside provisional developer marketing claims so buyers can conduct rigorous due diligence.
              </p>
            </div>

            {/* RERA Fast-Action Bar */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block">Telangana RERA Registration ID</span>
                  <strong className="text-base text-white font-mono">{PROJECT_CONFIG.reraNumber}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyRera}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <Copy size={13} />
                  <span>{copySuccess ? "Copied!" : "Copy RERA ID"}</span>
                </button>
                <a
                  href={PROJECT_CONFIG.reraWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>Verify on TG RERA</span>
                </a>
              </div>
            </div>

            {/* Verification Table */}
            <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Parameter</th>
                      <th className="py-3 px-4">Published Value</th>
                      <th className="py-3 px-4">Verification Status</th>
                      <th className="py-3 px-4">Source / Advisory Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {VERIFICATION_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-3 px-4 font-bold text-white">{row.field}</td>
                        <td className="py-3 px-4 text-slate-200">{row.value}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              row.status === "Verified"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                : row.status === "Provisional"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                : "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{row.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: PRICE & PRIVATE ENQUIRY SECTION
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="pricing">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/40 shadow-2xl text-center space-y-6">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Confidential Consultation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                EXCLUSIVE RESIDENCES. PRIVATE ENQUIRIES.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                While secondary market whispers have quoted rates around ₹15,999/sq.ft., developer inventory, floor premiums, and launch schedules remain strictly confidential.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2 text-left">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">4 BHK Sky Residence (~8,000 Sft)</span>
                  <span className="text-base font-bold text-amber-400">Enquire for Current Availability</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">5 BHK Sky Mansion Duplex (~16,000 Sft)</span>
                  <span className="text-base font-bold text-amber-400">Private Advisory Consultation</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <a
                  href="#enquiry-section"
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20"
                >
                  Request Private Consultation
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  <span>Receive Details on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: 18 COMPREHENSIVE SEO FREQUENTLY ASKED QUESTIONS
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60" id="faqs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Buyer Knowledge Base
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-300">
                Essential information on architecture, specifications, RERA validation, and booking procedures.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "Where is Pavani Mirai located?", a: "Pavani Mirai is located in Puppalaguda, directly within the Financial District corridor of Hyderabad, near Nehru Outer Ring Road (ORR Exit 4), Kokapet Neopolis, and major IT campuses." },
                { q: "Who is the developer of Pavani Mirai?", a: "The development is crafted by Pavani Infra with promoter entity Sai Sravanthi Infra Projects Private Limited." },
                { q: "What is the RERA registration number of Pavani Mirai?", a: "Pavani Mirai is registered with Telangana State Real Estate Regulatory Authority under TG RERA ID P02400007735." },
                { q: "What configurations are available at Pavani Mirai?", a: "The project exclusively offers ultra-luxury 4 BHK Sky Residences and 5 BHK Sky Mansion Duplexes." },
                { q: "What is a Sky Residence?", a: "Sky Residences are palatial single-level four-bedroom homes spanning approximately 8,000 sq. ft. (7,812 to 8,448 Sft on sanctioned blueprints) featuring home theatres, dual maid rooms, and private elevator lobbies." },
                { q: "What is a Sky Mansion?", a: "Sky Mansions are exclusive duplex residences spanning approximately 16,000 sq. ft. across two levels with internal architectural staircases, double-height living halls, and private plunge pool decks." },
                { q: "What is the difference between Sky Residences and Sky Mansions?", a: "Sky Residences are single-floor 4 BHK homes (~8,000 Sft) occupying 1 of the 4 quadrants on a floor plate, whereas Sky Mansions are two-level 5 BHK duplexes (~16,000 Sft) with grander double-height volumes." },
                { q: "How large are the 4 BHK residences?", a: "The sanctioned floor plate blueprint details four 4 BHK units per floor: Unit 1 (8,424 Sft), Unit 2 (8,448 Sft), Unit 3 (7,812 Sft), and Unit 4 (8,141 Sft)." },
                { q: "What is the size of the 5 BHK Sky Mansions?", a: "The developer advertises eight exclusive Sky Mansions with floor plates of approximately 16,000 sq. ft." },
                { q: "What are the four Sky Pods?", a: "The four Sky Pods (Terra Pod, Aqua Pod, Ignis Pod, and Ventus Pod) are elevated architectural pavilions situated at ~720 feet elevation offering rooftop pools, private lounges, and sky recreation." },
                { q: "What is The Sixth Element concept?", a: "It is an architectural design philosophy uniting the five cosmic elements—Earth, Water, Fire, Air, and Space—with Life itself to deliver holistic luxury living." },
                { q: "How many floors does Pavani Mirai have?", a: "Developer marketing advertises a 55-storey single mono skyscraper rising approximately 720 feet above ground level." },
                { q: "What clubhouse facilities are available?", a: "The four-level clubhouse spans approximately 1,01,415 sq. ft., featuring a 350-seater banquet hall, 50-seater private cinema, half Olympic-size pool, squash court, badminton courts, virtual cricket/golf, cigar lounge, and luxury spa." },
                { q: "Where is the project located in relation to Financial District?", a: "Pavani Mirai is positioned in Puppalaguda directly adjacent to the Financial District and Nanakramguda IT corridor, approximately 3 to 5 minutes from major global corporate campuses." },
                { q: "What is the latest price?", a: "Pricing is dynamic and provided upon private consultation based on unit category, floor rise, and developer release. Secondary market mentions (~₹15,999/sq.ft.) are indicative only." },
                { q: "What is the possession timeline?", a: "Public information cites completion dates between November 2028 and March 2029. Prospective buyers should inspect the official TG RERA portal for the latest sanctioned tower milestone dates." },
                { q: "How can I request the floor plans?", a: "You can submit the enquiry form on this page or connect with our advisory team on WhatsApp at +91 94939 43946 to receive official high-resolution CAD and PDF layout documents." },
                { q: "How can I schedule a private site visit?", a: "Select your preferred date in the consultation form above or call our property desk directly at +91 94939 43946 for guided on-site inspection." },
              ].map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-1 text-left"
                >
                  <AccordionTrigger className="text-left text-sm font-bold text-white hover:text-amber-400 transition-colors py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-slate-300 leading-relaxed pb-4 pt-1">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* =========================================================================
            SECTION 14: RELATED LUXURY RESIDENTIAL PROJECTS
           ========================================================================= */}
        <section className="py-16 lg:py-24 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-400">
                Explore More Properties
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Related Ultra-Luxury Projects in West Hyderabad
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/projects/neo-towers-neopolis-kokapet"
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Kokapet Neopolis
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Neo Towers
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Sky-high luxury residences in the heart of Kokapet Neopolis.</p>
                </div>
                <span className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                  <span>Explore Project</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/projects/trump-towers-hyderabad-kokapet"
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Kokapet
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Trump Towers Hyderabad
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Global branded ultra-luxury residential skyscraper.</p>
                </div>
                <span className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                  <span>Explore Project</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/projects/pavani-felicity-nizampet"
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Nizampet
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Pavani Felicity
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Premium 3 BHK high-rise residences with lake frontage.</p>
                </div>
                <span className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                  <span>Explore Project</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                to="/projects/pavani-starlit-miyapur"
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Miyapur
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Pavani Starlit
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Premium gated residential apartment community.</p>
                </div>
                <span className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1">
                  <span>Explore Project</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 15: MOBILE FIXED STICKY CTA BAR
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

        {/* LIGHTBOX MODAL FOR FULL-RESOLUTION INSPECTION */}
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
};

export default PavaniMiraiPage;
