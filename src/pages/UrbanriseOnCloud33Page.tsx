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
import cloud33TwilightHero from "@/assets/urbanrise-cloud33/urbanrise-cloud33-elevation-twilight.jpg";
import cloud33DroneDay from "@/assets/urbanrise-cloud33/urbanrise-cloud33-drone-aerial-day.jpg";
import cloud33AerialNight from "@/assets/urbanrise-cloud33/urbanrise-cloud33-aerial-night.jpg";
import cloud33ClubhousePark from "@/assets/urbanrise-cloud33/urbanrise-cloud33-clubhouse-park.jpg";
import cloud33MoroccanClubhouse from "@/assets/urbanrise-cloud33/urbanrise-cloud33-moroccan-clubhouse.jpg";
import cloud33MasterPlan from "@/assets/urbanrise-cloud33/urbanrise-cloud33-master-plan.jpg";
import cloud33HammockPark from "@/assets/urbanrise-cloud33/urbanrise-cloud33-hammock-park.jpg";
import cloud33RooftopYoga from "@/assets/urbanrise-cloud33/urbanrise-cloud33-rooftop-yoga.jpg";
import cloud33RooftopPartyBar from "@/assets/urbanrise-cloud33/urbanrise-cloud33-rooftop-party-bar.jpg";
import cloud33RooftopDining from "@/assets/urbanrise-cloud33/urbanrise-cloud33-rooftop-dining.jpg";
import cloud33MiyapurRoad from "@/assets/urbanrise-cloud33/urbanrise-cloud33-miyapur-bachupally-road.jpg";

// Centralized Project Configuration (Fact-Checked & Authoritative)
export const PROJECT_CONFIG = {
  name: "Urbanrise On Cloud 33",
  developer: "Urbanrise",
  promoter: "Urbanrise Lifestyles Private Limited",
  location: "Bachupally",
  roadFacing: "200-ft Miyapur–Bachupally Main Road",
  microMarket: "North-West Hyderabad Residential Corridor",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  address: "200-ft Miyapur-Bachupally Road, Bachupally, Hyderabad, Telangana 500090",
  startingPrice: "Starting ₹1.14 Cr*",
  priceRange: "₹1.14 Cr – ₹2.10 Cr* (Dynamic Developer Pricing)",
  priceNote: "*Indicative developer marketing starting price. Final price varies by tower, floor rise, orientation, and inventory release.",
  reraNumber: "P02200003724",
  reraDisplay: "TG RERA Registered: P02200003724",
  landArea: "Approximately 9.16 Acres",
  towerCount: "5 Iconic Residential Towers",
  towerHeight: "33 Floors (B+G+33)",
  totalUnits: "2,000+ Premium Residences",
  configurations: "3 & 4 BHK Luxury High-Rise Residences",
  sizeRange: "1,353 – 2,021 Sq. Ft.",
  openSpace: "Approximately 70% Landscaped Open Spaces",
  clubhouseSize: "Approximately 85,000 Sq. Ft. (Moroccan Themed)",
  rooftopAmenitiesSize: "Approximately 70,000 Sq. Ft. across 10 Sky Lounges",
  totalAmenities: "203+ Curated Lifestyle Amenities",
  communityScale: "1,200+ Resident Families Already Living",
  possession: "Ready to Move (Select Towers) / RERA Target 31 March 2027",
  status: "Ready to Move & Under Construction",
  canonicalUrl: "https://www.naani.in/projects/urbanrise-on-cloud-33-bachupally",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Urbanrise On Cloud 33 Bachupally",
  developerWebsite: "https://urbanrise.in",
  mapEmbedUrl: "https://www.google.com/maps?q=Urbanrise+On+Cloud+33+Bachupally+Hyderabad&output=embed",
};

// High-Resolution Project Visuals Gallery Item Definition
export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
  tag: string;
  category: "elevation" | "clubhouse" | "rooftop" | "landscape" | "masterplan" | "connectivity";
  alt: string;
}

export const PROJECT_GALLERY: GalleryItem[] = [
  {
    id: "elevation-twilight",
    title: "Twilight Architectural Perspective",
    subtitle: "Striking evening perspective of the 33-floor monolithic towers illuminated against the twilight sky with private balconies and glass railings",
    src: cloud33TwilightHero,
    badge: "Architectural Elevation",
    tag: "33 Storeys · B+G+33",
    category: "elevation",
    alt: "Urbanrise On Cloud 33 Bachupally evening twilight architectural elevation showing 33-floor high-rise residential towers",
  },
  {
    id: "drone-aerial-day",
    title: "33-Floor Daytime Aerial Drone Perspective",
    subtitle: "High-angle daytime drone perspective showcasing the 5 towers rising 33 floors, central park landscape, and podium open spaces",
    src: cloud33DroneDay,
    badge: "Daytime Drone Aerial",
    tag: "5 Towers · 9.16 Acres",
    category: "elevation",
    alt: "Urbanrise On Cloud 33 daytime drone aerial photograph showing 5 residential towers rising 33 floors across 9.16 acres",
  },
  {
    id: "aerial-night",
    title: "9.16-Acre Illuminated Master Layout Night Perspective",
    subtitle: "Bird's-eye illuminated evening drone view capturing the entire gated community footprint, central pool, sports arenas, and tower crowns",
    src: cloud33AerialNight,
    badge: "Illuminated Master Layout",
    tag: "Top-Down Night View",
    category: "elevation",
    alt: "Urbanrise On Cloud 33 night drone aerial view showing the illuminated 9.16-acre campus, swimming pool, and towers",
  },
  {
    id: "moroccan-clubhouse",
    title: "Grand 85,000 Sq. Ft. Moroccan Luxury Clubhouse & Azure Pool",
    subtitle: "Exquisite Moroccan arches, terracotta and sand accents, palm-fringed deck, and expansive resort-style swimming pool",
    src: cloud33MoroccanClubhouse,
    badge: "Moroccan Clubhouse",
    tag: "~85,000 Sq. Ft.",
    category: "clubhouse",
    alt: "Urbanrise On Cloud 33 Moroccan themed luxury clubhouse with ornate arches, swimming pool, sun deck, and palm trees",
  },
  {
    id: "clubhouse-park",
    title: "Central Park-Inspired Landscaped Enclave & Palm Court",
    subtitle: "Serene open green court linking the central park, children's play zones, and the iconic Moroccan clubhouse facade",
    src: cloud33ClubhousePark,
    badge: "Central Park Enclave",
    tag: "70% Open Green Space",
    category: "landscape",
    alt: "Urbanrise On Cloud 33 central park landscaping with manicured lawns, palm trees, and clubhouse view",
  },
  {
    id: "rooftop-yoga",
    title: "70,000 Sq. Ft. Rooftop Sky Lounge & Aerial Yoga Deck",
    subtitle: "Elevated rooftop open-air yoga and meditation deck perched 33 storeys high, providing unobstructed panoramic views over Hyderabad",
    src: cloud33RooftopYoga,
    badge: "Sky Yoga Deck",
    tag: "33rd Floor Rooftop",
    category: "rooftop",
    alt: "Urbanrise On Cloud 33 rooftop aerial yoga deck on the 33rd floor terrace with panoramic skyline views",
  },
  {
    id: "rooftop-party-bar",
    title: "Rooftop Party Bar, Barbecue Deck & Open Sky Dining",
    subtitle: "Chic rooftop entertaining lounge equipped with a wooden bar counter, outdoor barbecue station, dining tables, and lush planters",
    src: cloud33RooftopPartyBar,
    badge: "Rooftop Party Bar",
    tag: "BBQ & Dining Lounge",
    category: "rooftop",
    alt: "Urbanrise On Cloud 33 rooftop party bar with outdoor barbecue grill, bar counter, and open-air dining tables",
  },
  {
    id: "rooftop-dining",
    title: "Elevated Sky Dining & Social Horizon Deck",
    subtitle: "Private rooftop dining terrace with landscaped planter boxes and panoramic sunset vistas for resident gatherings",
    src: cloud33RooftopDining,
    badge: "Sky Dining Lounge",
    tag: "Horizon Terraces",
    category: "rooftop",
    alt: "Urbanrise On Cloud 33 rooftop sky dining deck with circular outdoor tables and scenic views",
  },
  {
    id: "hammock-park",
    title: "Hammock Park & Lush Themed Greenery",
    subtitle: "Shaded tranquility grove nestled inside the central park, featuring relaxed hammocks between tropical palms and flowering shrubs",
    src: cloud33HammockPark,
    badge: "Hammock Park",
    tag: "Tranquility Grove",
    category: "landscape",
    alt: "Urbanrise On Cloud 33 Hammock Park featuring relaxation hammocks suspended among lush greenery and trees",
  },
  {
    id: "master-plan-layout",
    title: "Official Sanctioned Master Plan & 37-Point Legend",
    subtitle: "Complete campus master layout detailing ground-level amenities (1-27) and elevated rooftop terrace amenities (28-37)",
    src: cloud33MasterPlan,
    badge: "Sanctioned Master Plan",
    tag: "37-Point Detailed Legend",
    category: "masterplan",
    alt: "Urbanrise On Cloud 33 sanctioned master plan layout detailing ground level features 1 to 27 and rooftop terrace levels 28 to 37",
  },
  {
    id: "miyapur-bachupally-road",
    title: "Prime 200-ft Miyapur–Bachupally Main Road Connectivity",
    subtitle: "Direct wide-frontage road connectivity linking the project to Miyapur Metro Station (10 mins) and Outer Ring Road Exit 4A/B",
    src: cloud33MiyapurRoad,
    badge: "Road Frontage",
    tag: "200-Ft Main Arterial",
    category: "connectivity",
    alt: "Urbanrise On Cloud 33 wide 200-ft Miyapur-Bachupally main road showing direct arterial access and surrounding infrastructure",
  },
];

// Sanctioned Master Plan Legend Items (Ground 1-27 & Terraces 28-37)
export interface MasterPlanPoint {
  num: number;
  name: string;
  category: "ground" | "terrace";
  description: string;
}

export const MASTER_PLAN_LEGEND: MasterPlanPoint[] = [
  { num: 1, name: "Entryscape", category: "ground", description: "Grand gated entrance portal with automated RFID boom barriers, security guard stations, and illuminated water fountains." },
  { num: 2, name: "Children Waiting Area", category: "ground", description: "Safe, weather-sheltered pick-up and drop-off bay dedicated for school buses and shuttle services." },
  { num: 3, name: "Young Children Hangout Area", category: "ground", description: "Dedicated soft-turf social zone for young kids with interactive seating and play features." },
  { num: 4, name: "Sensory Pathway", category: "ground", description: "Acupressure and tactile reflexology reflex trail paved with textured river stones and herbal planting beds." },
  { num: 5, name: "Outdoor Table Tennis", category: "ground", description: "Weatherproof competition-grade outdoor table tennis arena shaded under landscaped pergolas." },
  { num: 6, name: "Half – Basketball Court", category: "ground", description: "Regulation outdoor half-court basketball with shock-absorbent synthetic sports surfacing." },
  { num: 7, name: "Children Play Area", category: "ground", description: "Multi-activity outdoor jungle gym with slides, climbing frames, swings, and rubberized safety flooring." },
  { num: 8, name: "Kids Pool", category: "ground", description: "Zero-depth shallow splash pool with water jets, gentle bubblers, and non-slip coping." },
  { num: 9, name: "Planting Bed", category: "ground", description: "Themed evergreen botanical shrub borders and flowering perennial display beds." },
  { num: 10, name: "Great Lawn", category: "ground", description: "Expansive natural carpet lawn for open-air yoga, festival gatherings, picnics, and community festivities." },
  { num: 11, name: "Hammock Park", category: "ground", description: "Secluded relaxation alcove featuring woven hammocks suspended under mature shade canopies." },
  { num: 12, name: "Pavilions", category: "ground", description: "Architectural shaded wooden and metal pergolas providing comfortable retreat spots." },
  { num: 13, name: "Co-Working Spaces at the Park", category: "ground", description: "Outdoor Wi-Fi-enabled workstations and shaded benches nestled within green landscape." },
  { num: 14, name: "Spill Over Water Body", category: "ground", description: "Reflective decorative pool with gentle recirculating water cascades creating acoustic serenity." },
  { num: 15, name: "Ladies Kitty Corner", category: "ground", description: "Private, beautifully landscaped social lounge dedicated for women's circles and gatherings." },
  { num: 16, name: "Sunken Lounge", category: "ground", description: "Submerged circular seating pit centered beside the water body for evening conversations." },
  { num: 17, name: "Swimming Pool", category: "ground", description: "Olympic-length luxury resort pool with crystalline blue tiles and dedicated lap lanes." },
  { num: 18, name: "Pool Deck", category: "ground", description: "Broad timber-finished sun deck with cushioned loungers, parasols, and poolside towel stations." },
  { num: 19, name: "Bar Counter (Ground)", category: "ground", description: "Poolside mocktail juice counter and refreshments pantry serving the pool deck." },
  { num: 20, name: "Games Room", category: "ground", description: "Indoor club arcade with billiards, snooker, foosball, carrom, and board game lounges." },
  { num: 21, name: "Trampoline Park", category: "ground", description: "Safe enclosed outdoor jumping arena with high-density mesh nets for children." },
  { num: 22, name: "Open Dinning", category: "ground", description: "Al-fresco terrace dining area beside the clubhouse lawn for family dinners and celebrations." },
  { num: 23, name: "Bar Counter (Al-Fresco)", category: "ground", description: "Secondary outdoor beverage station adjoining the dining terraces." },
  { num: 24, name: "Dinning with Nature", category: "ground", description: "Intimate garden dining clusters surrounded by aromatic flowering shrubs." },
  { num: 25, name: "Senior Citizen Plaza", category: "ground", description: "Dedicated peaceful seating enclave with ergonomic benches, low-impact paths, and gentle lighting." },
  { num: 26, name: "Lawn", category: "ground", description: "Secondary landscaped green carpet providing peripheral buffer and leisure space." },
  { num: 27, name: "Seating Plaza", category: "ground", description: "Geometric plaza with stone bench arrangements and shaded flowering tree clusters." },
  { num: 28, name: "Viewing Deck and Lounge", category: "terrace", description: "33rd-floor panoramic observation terrace overlooking the skyline and horizon." },
  { num: 29, name: "Yoga Deck", category: "terrace", description: "Open-air sky yoga pavilion with sunrise alignment and morning meditation ambiance." },
  { num: 30, name: "Games Zone", category: "terrace", description: "Elevated rooftop active recreation area with giant chess, putting green, and board games." },
  { num: 31, name: "Solar Panel", category: "terrace", description: "Eco-friendly rooftop photovoltaic solar array generating clean green energy for common utilities." },
  { num: 32, name: "Party-Bar and Barbeque", category: "terrace", description: "Rooftop barbecue station and cocktail party bar with outdoor high-top counters." },
  { num: 33, name: "Dinning with Nature (Terrace)", category: "terrace", description: "Elevated rooftop dining area equipped with weather-resistant outdoor dining suites." },
  { num: 34, name: "Interactive Lounge", category: "terrace", description: "Rooftop conversational sky pod with comfortable sectional seating and ambient evening lighting." },
  { num: 35, name: "Mini Theatre", category: "terrace", description: "Open-air sky cinema and projection screen for screening live sports and movie nights." },
  { num: 36, name: "Co-Working Space in the Sky", category: "terrace", description: "33rd-floor high-speed broadband co-working workstations with breathtaking horizon views." },
  { num: 37, name: "Terraces with Carpet Grass", category: "terrace", description: "Lush artificial turf rooftop leisure zones providing soft foot feel and thermal insulation." },
];

// Configuration Cards Specification
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
    bhk: "3 BHK Classic",
    type: "Type A (Compact Luxury)",
    sizeSqFt: "1,353 Sq. Ft.",
    carpetSqFt: "~947 Sq. Ft.",
    priceEstimate: "Starting ₹1.14 Cr*",
    facing: "East / West",
    balconies: "2 Balconies",
    keyHighlights: [
      "Optimized zero-wastage floor plan",
      "Vastu-compliant entrance and kitchen",
      "Spacious master bedroom with en-suite bath",
      "Wide living room balcony overlooking central park",
      "Dedicated utility area adjoining modular kitchen",
    ],
  },
  {
    bhk: "3 BHK Comfort",
    type: "Type B (Premium 3 BHK)",
    sizeSqFt: "1,480 Sq. Ft.",
    carpetSqFt: "~1,036 Sq. Ft.",
    priceEstimate: "Starting ₹1.28 Cr*",
    facing: "East / West / North",
    balconies: "2 Balconies",
    keyHighlights: [
      "Expansive living-cum-dining expanse",
      "3 spacious bedrooms with cross-ventilation",
      "3-side natural illumination through wide French windows",
      "Private foyer entrance ensuring home privacy",
      "Provision for home workstation / study nook",
    ],
  },
  {
    bhk: "3 BHK Grand",
    type: "Type C (Spacious Family Suite)",
    sizeSqFt: "1,617 Sq. Ft.",
    carpetSqFt: "~1,132 Sq. Ft.",
    priceEstimate: "Starting ₹1.42 Cr*",
    facing: "East / West",
    balconies: "3 Balconies",
    keyHighlights: [
      "Palatial 1,617 Sft layout with 3 full bathrooms",
      "Master bedroom with private sunset balcony",
      "Large kitchen with separate dry utility space",
      "Corner unit advantages with unhindered panoramic views",
      "Mivan formwork construction for lifetime durability",
    ],
  },
  {
    bhk: "4 BHK Royal Residence",
    type: "Type D (Ultra-Spacious Luxury)",
    sizeSqFt: "2,021 Sq. Ft.",
    carpetSqFt: "~1,415 Sq. Ft.",
    priceEstimate: "Starting ₹1.85 Cr*",
    facing: "East / North Corner",
    balconies: "3 Large Balconies",
    keyHighlights: [
      "Signature 4 BHK floor plate designed for large families",
      "4 spacious king-size bedrooms with dedicated wardrobe niches",
      "Grand double-aspect living and dining hall",
      "Wrap-around viewing balconies offering dual-side vistas",
      "Private foyer and dedicated servant/powder room provisions",
    ],
  },
];

// 18 Comprehensive SEO FAQs
export const PROJECT_FAQS = [
  {
    q: "Where is Urbanrise On Cloud 33 located in Bachupally, Hyderabad?",
    a: "Urbanrise On Cloud 33 is strategically located on the prime 200-ft Miyapur–Bachupally Main Road in Bachupally, North-West Hyderabad (PIN 500090). It sits just 10 minutes from the Miyapur Metro Station and 8 minutes from the Outer Ring Road (ORR Exits 4A and 4B), offering seamless arterial access to HITEC City, Kondapur, and the Gachibowli Financial District.",
  },
  {
    q: "Who is the developer of Urbanrise On Cloud 33?",
    a: "The project is developed by Urbanrise, one of South India's premier and most trusted real estate developers (an Alliance Group company), and promoted under Urbanrise Lifestyles Private Limited. Urbanrise has successfully delivered millions of square feet of landmark residential communities across Chennai, Bengaluru, and Hyderabad.",
  },
  {
    q: "What is the TG RERA registration number for Urbanrise On Cloud 33?",
    a: "Urbanrise On Cloud 33 is fully sanctioned and registered with Telangana Real Estate Regulatory Authority under TG RERA Registration Number P02200003724. Prospective buyers can independently verify the approved layout, sanctioned floors, and quarterly progress filings on the official TG RERA portal.",
  },
  {
    q: "What is the total land extent and tower height of Urbanrise On Cloud 33?",
    a: "Urbanrise On Cloud 33 spans an expansive land parcel of approximately 9.16 Acres. The master development comprises 5 iconic residential towers rising 33 storeys high (Basement + Ground + 33 Floors), reserving approximately 70% of the ground footprint for themed landscaped gardens, water features, and outdoor sports arenas.",
  },
  {
    q: "What apartment configurations and sizes are available?",
    a: "The community offers meticulously crafted 3 BHK and 4 BHK luxury residences. Sizes include: 3 BHK Classic at 1,353 sq. ft., 3 BHK Comfort at 1,480 sq. ft., 3 BHK Grand at 1,617 sq. ft., and 4 BHK Royal Residences at 2,021 sq. ft. All floor plans are 100% Vastu-compliant with acoustic wall isolation and large French balconies.",
  },
  {
    q: "What is the Moroccan-Themed Clubhouse at Urbanrise On Cloud 33?",
    a: "The project features a sprawling ~85,000 sq. ft. Moroccan-themed luxury clubhouse designed with traditional Islamic horseshoe arches, sandstone facades, and luxury poolside cabanas. Amenities include an Olympic-length swimming pool, kids pool, indoor badminton courts, squash court, commercial-grade gym, aerobics studio, banquet halls, games arcade, and guest rooms.",
  },
  {
    q: "What are the 70,000 Sq. Ft. Rooftop Amenities and 10 Sky Lounges?",
    a: "Urbanrise On Cloud 33 activates its tower rooftops with approximately 70,000 sq. ft. of lifestyle spaces distributed across 10 themed sky lounges at 33 floors high. These include a rooftop aerial yoga deck, barbecue party bar, sky dining terraces, co-working pods in the sky, stargazing viewing decks, interactive lounges, and an open-air rooftop mini theatre.",
  },
  {
    q: "What is the Urbanrise Genius Children's Learning Hub?",
    a: "Urbanrise Genius is an innovative on-campus children's enrichment facility created to give children world-class coaching without travelling outside the gated community. It hosts professional tutoring/study labs, robotics and coding courses, Western & classical music classes, dance academies, and martial arts/karate training led by certified experts.",
  },
  {
    q: "What is Hammock Park and the Central Park landscaping?",
    a: "Central Park at Urbanrise On Cloud 33 features themed natural zones, including Hammock Park where residents can recline in suspended hammocks beneath tropical canopies. The landscaping also incorporates a sensory barefoot reflexology trail, sunken conversation pit, Great Lawn, water fountains, and senior citizen relaxation plazas.",
  },
  {
    q: "How many families are already living at Urbanrise On Cloud 33?",
    a: "Over 1,200 families already reside within the vibrant, occupied community. Handover of select towers is complete with families enjoying operational clubhouse amenities, daily security, high-speed elevators, and maintained park facilities.",
  },
  {
    q: "Is Urbanrise On Cloud 33 ready to move in or under construction?",
    a: "The project features both ready-to-move-in inventory in handed-over blocks and active construction/finishing phases for newer releases. While developers advertise ready units, the overall master RERA milestone filing cites a completion target of 31 March 2027. Buyers should verify specific tower and unit handover dates with Naani Projects advisors.",
  },
  {
    q: "What is the starting price of flats in Urbanrise On Cloud 33?",
    a: "Developer marketing starting prices begin at approximately ₹1.14 Cr* for 3 BHK Classic configurations (1,353 sq. ft.). Prices vary depending on tower release, floor level, East/West facing preferences, and corner premiums. Contact Naani Projects at +91 94939 43946 for the authentic unit-wise cost sheet.",
  },
  {
    q: "What construction technology is used in Urbanrise On Cloud 33?",
    a: "The towers are constructed using monolithic Mivan aluminum formwork technology with seismic-resistant RCC framing. This delivers smooth crack-resistant wall finishes, superior structural durability, maximized usable carpet area, and enhanced thermal and sound insulation compared to conventional brickwork.",
  },
  {
    q: "What are the key schools and educational institutes near Bachupally?",
    a: "Bachupally is renowned as Hyderabad's foremost educational hub. Nearby top schools include Silver Oaks International School (5 mins), Oakridge International School (10 mins), Delhi Public School Miyapur (10 mins), Creek Planet School (5 mins), Kennedy High The Global School (7 mins), and VNR VJIET Engineering College (5 mins).",
  },
  {
    q: "What hospitals and emergency healthcare centers are nearby?",
    a: "Top healthcare centers within immediate reach include SLG Hospitals (8 mins), Mamata Academy of Medical Sciences & Hospital (5 mins), Relief Hospital (5 mins), and Apollo Clinic Nizampet (10 mins), ensuring round-the-clock medical convenience.",
  },
  {
    q: "What security and infrastructure systems are installed?",
    a: "The gated community is protected by multi-tier 24/7 security with RFID boom barriers at the main portal, CCTV cameras covering all common corridors and perimeter fences, intercom connectivity, 100% DG power backup for common areas and residential lighting, piped cooking gas, and STP water treatment plants.",
  },
  {
    q: "Which major banks have approved home loans for Urbanrise On Cloud 33?",
    a: "Being a certified TG RERA project (P02200003724), Urbanrise On Cloud 33 is pre-approved for customized home loan financing by leading public and private banks including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda at competitive prevailing interest rates.",
  },
  {
    q: "How can I book a site visit or download the official brochure and cost sheet?",
    a: "You can schedule a private site visit, inspect model apartments, or request the sanctioned master plan and detailed cost breakup by submitting the consultation form on this page or calling Naani Projects directly at +91 94939 43946 / WhatsApp.",
  },
];

// Related Projects Data
export const RELATED_PROJECTS = [
  {
    name: "Team4 Aria",
    location: "Miyapur, Hyderabad",
    slug: "team4-aria-miyapur-luxury-apartments-hyderabad",
    href: "/projects/team4-aria-miyapur-luxury-apartments-hyderabad",
    bhk: "3 & 4 BHK",
    highlights: "Luxury high-rise apartments, Miyapur metro connectivity, expansive clubhouse.",
  },
  {
    name: "Candeur Arbora",
    location: "Kukatpally, Hyderabad",
    slug: "candeur-arbora",
    href: "/projects/candeur-arbora",
    bhk: "3 & 4 BHK",
    highlights: "Premium gated community beside HITEC City corridor with world-class amenities.",
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
    name: "Pavani Felicity",
    location: "Nizampet, Hyderabad",
    slug: "pavani-felicity-nizampet",
    href: "/projects/pavani-felicity-nizampet",
    bhk: "3 BHK Premium",
    highlights: "Single iconic 21-storey tower, 25,000 Sft Club Felicity, 1,440–1,985 Sft.",
  },
];

export default function UrbanriseOnCloud33Page() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedPlanTab, setSelectedPlanTab] = useState<"ground" | "terrace">("ground");
  const [copiedRera, setCopiedRera] = useState(false);

  // Lead Generation Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredBhk, setPreferredBhk] = useState("3 BHK Classic (1,353 Sft)");
  const [buyingPurpose, setBuyingPurpose] = useState("Self Use");
  const [preferredVisitDate, setPreferredVisitDate] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formErrorMsg, setFormErrorMsg] = useState("");

  const consentId = useId();

  // Filter gallery items by category
  const filteredGallery = activeCategory === "all"
    ? PROJECT_GALLERY
    : PROJECT_GALLERY.filter((item) => item.category === activeCategory);

  // Filter master plan legend points by ground vs terrace
  const filteredLegend = MASTER_PLAN_LEGEND.filter((item) => item.category === selectedPlanTab);

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
    `Hello Naani Projects, I am interested in Urbanrise On Cloud 33 (Bachupally). Please share the live unit availability, floor plans, and all-inclusive pricing sheet.`
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
      notes: `Urbanrise On Cloud 33 Enquiry. Selected: ${preferredBhk}. Visit: ${preferredVisitDate || "Not specified"}. Purpose: ${buyingPurpose}.`,
      source: "Website - Urbanrise On Cloud 33 Bachupally",
      project_name: PROJECT_CONFIG.name,
      project_slug: "urbanrise-on-cloud-33-bachupally",
    };

    const pageContext: PageContext = {
      source: "Website - Urbanrise On Cloud 33 Bachupally",
      project_name: PROJECT_CONFIG.name,
      project_slug: "urbanrise-on-cloud-33-bachupally",
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
      { "@type": "ListItem", position: 3, name: "Bachupally", item: "https://www.naani.in/projects-in-bachupally" },
      { "@type": "ListItem", position: 4, name: "Urbanrise On Cloud 33", item: PROJECT_CONFIG.canonicalUrl },
    ],
  };

  const schemaApartmentComplex = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${PROJECT_CONFIG.canonicalUrl}#project`,
    name: "Urbanrise On Cloud 33",
    description:
      "Urbanrise On Cloud 33 is a 9.16-acre luxury high-rise gated community in Bachupally, Hyderabad, featuring 5 residential towers of 33 floors, 85,000 Sft Moroccan clubhouse, 70,000 Sft rooftop amenities across 10 sky lounges, Urbanrise Genius children's hub, and 3 & 4 BHK residences.",
    url: PROJECT_CONFIG.canonicalUrl,
    telephone: PROJECT_CONFIG.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "200-ft Miyapur-Bachupally Main Road, Bachupally",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500090",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.5318",
      longitude: "78.3682",
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
        title="Urbanrise On Cloud 33 Bachupally | 3 & 4 BHK Flats Hyderabad"
        description="Explore Urbanrise On Cloud 33 Bachupally, Hyderabad. Discover 3 & 4 BHK apartments, Moroccan clubhouse, 70,000 Sft rooftop amenities, master layout and price details."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        ogImage="https://www.naani.in/og-urbanrise-cloud33.jpg"
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
              <Link to="/projects-in-bachupally" className="hover:text-amber-400 transition-colors">Bachupally</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <span className="text-slate-200 font-medium truncate">Urbanrise On Cloud 33</span>
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
        <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 border-b border-slate-800/80">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Title Block */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                <Sparkles size={13} className="text-amber-400" />
                <span>Bachupally’s 33-Floor Landmark Living</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                    Urbanrise On Cloud 33
                  </h1>
                  <p className="mt-2 text-base sm:text-lg text-slate-300 flex flex-wrap items-center gap-2">
                    <span>By <strong className="text-white font-semibold">{PROJECT_CONFIG.developer}</strong></span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin size={15} className="text-amber-400 shrink-0" />
                      {PROJECT_CONFIG.roadFacing}, Bachupally, Hyderabad
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
              {/* Main Active Image Showcase (7 Cols) */}
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

              {/* Quick Spec Highlights Card (5 Cols) */}
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
                        <span>Land Extent & Campus</span>
                      </dt>
                      <dd className="font-semibold text-white">9.16 Acres (~70% Open Space)</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Layers size={15} className="text-sky-400" />
                        <span>Towers & Elevation</span>
                      </dt>
                      <dd className="font-semibold text-white">5 Towers · 33 Floors (B+G+33)</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Waves size={15} className="text-amber-400" />
                        <span>Moroccan Clubhouse</span>
                      </dt>
                      <dd className="font-semibold text-amber-300">~85,000 Sq. Ft. Club</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Wind size={15} className="text-indigo-400" />
                        <span>Rooftop Sky Lounges</span>
                      </dt>
                      <dd className="font-semibold text-white">~70,000 Sft (10 Sky Lounges)</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <GraduationCap size={15} className="text-emerald-400" />
                        <span>Children Learning Hub</span>
                      </dt>
                      <dd className="font-semibold text-white">Urbanrise Genius</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Users size={15} className="text-pink-400" />
                        <span>Community Status</span>
                      </dt>
                      <dd className="font-semibold text-emerald-400">1,200+ Families Residing</dd>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Home size={15} className="text-amber-400" />
                        <span>Residences & Sizes</span>
                      </dt>
                      <dd className="font-semibold text-white">3 & 4 BHK (1,353 – 2,021 Sft)</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Calendar size={15} className="text-orange-400" />
                        <span>Handover Status</span>
                      </dt>
                      <dd className="font-semibold text-amber-300 text-right text-xs">
                        Ready to Move / RERA Mar 2027
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
            SECTION 3: ARCHITECTURAL CONCEPT & CENTRAL PARK LANDSCAPING
           ========================================================================= */}
        <section id="central-park" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Design & Master Planning
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Central Park Living Across 9.16 Acres
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Urbanrise On Cloud 33 dedicates roughly 70% of its expansive 9.16-acre footprint to landscaped greenery, themed recreation courtyards, and tranquil water features. Towers are strategically laid out with broad setbacks to guarantee unhindered natural sunlight and three-side cross-ventilation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Concept 1: Hammock Park & Reflexology */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Trees size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Hammock Park & Sensory Trails</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A tranquil relaxation haven shaded by tropical canopies where residents unwind in suspended hammocks. Adjacent sensory pathways with textured river stones provide natural acupressure reflexology for healthy morning routines.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center text-xs text-amber-400 font-semibold gap-1">
                  <span>Nature-infused tranquility</span>
                </div>
              </div>

              {/* Concept 2: Sunken Lounge & Water Bodies */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-sky-500/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                  <Waves size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Sunken Lounge & Cascading Waters</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A submerged circular conversational lounge set beside soothing reflective water bodies and architectural fountains. Designed for evening gatherings, coffee conversations, and peaceful reading away from vehicular circulation.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center text-xs text-sky-400 font-semibold gap-1">
                  <span>Reflective water features</span>
                </div>
              </div>

              {/* Concept 3: Great Lawn & Family Plazas */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Great Lawn & Senior Plazas</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  An expansive natural grass lawn hosting festival celebrations, yoga sessions, and picnics. Features dedicated senior citizen quiet pavilions with ergonomic seating and a Ladies Kitty Corner for community bonding.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center text-xs text-emerald-400 font-semibold gap-1">
                  <span>Inclusive community spaces</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: THE MOROCCAN-THEMED LUXURY CLUBHOUSE (~85,000 SQ. FT.)
           ========================================================================= */}
        <section id="moroccan-clubhouse" className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Image Card */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group">
                  <img
                    src={cloud33MoroccanClubhouse}
                    alt="Urbanrise On Cloud 33 Moroccan themed clubhouse and azure swimming pool"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold backdrop-blur-md">
                      Signature Clubhouse Architecture
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">
                      Grand 85,000 Sq. Ft. Moroccan Palace
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Amenity Highlights */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Resort-Scale Infrastructure
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                    ~85,000 Sq. Ft. Moroccan Luxury Clubhouse
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-300">
                    Inspired by royal Moroccan architecture, the clubhouse showcases soaring keyhole arches, terracotta-toned facades, intricate jali screens, and palm-lined pool decks. It offers an all-inclusive lifestyle club right at your doorstep.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Waves className="text-amber-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Resort Swimming Pool</strong>
                      <span className="text-slate-400 text-xs">Olympic-length pool, kids splash pool & timber sun deck</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Dumbbell className="text-sky-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Commercial Gymnasium</strong>
                      <span className="text-slate-400 text-xs">Cardio zones, strength training & certified aerobics studio</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Activity className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Indoor Badminton & Squash</strong>
                      <span className="text-slate-400 text-xs">Sanctioned indoor wooden sports courts & table tennis</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Briefcase className="text-purple-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Co-Working Lounge & Cafe</strong>
                      <span className="text-slate-400 text-xs">High-speed Wi-Fi, conference suites & coffee bar</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Tv className="text-pink-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Games Arcade & Billiards</strong>
                      <span className="text-slate-400 text-xs">Snooker tables, foosball, carrom & virtual gaming</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <Users className="text-orange-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <strong className="text-white block font-semibold">Grand Banquet Hall</strong>
                      <span className="text-slate-400 text-xs">Celebration hall with dining terrace for family events</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: 70,000 SQ. FT. ROOFTOP AMENITIES ACROSS 10 SKY LOUNGES
           ========================================================================= */}
        <section id="rooftop-amenities" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Elevated Rooftop Living
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                ~70,000 Sq. Ft. Across 10 Rooftop Sky Lounges
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Perched 33 storeys high above Bachupally, the rooftops of Urbanrise On Cloud 33 are transformed into active leisure sky parks. Residents enjoy 10 dedicated elevated pavilions with endless horizon views.
              </p>
            </div>

            {/* 3 Featured Rooftop Visuals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Visual 1: Aerial Yoga Deck */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group shadow-xl">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={cloud33RooftopYoga}
                    alt="Urbanrise On Cloud 33 rooftop aerial yoga deck on 33rd floor"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700/80">
                    Sky Yoga Deck
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-white mb-1.5">Aerial Yoga & Meditation</h4>
                  <p className="text-xs text-slate-300">
                    Open-air teakwood yoga decks aligned toward the sunrise, offering serene morning meditation above the urban hustle.
                  </p>
                </div>
              </div>

              {/* Visual 2: Rooftop Party Bar & BBQ */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group shadow-xl">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={cloud33RooftopPartyBar}
                    alt="Urbanrise On Cloud 33 rooftop party bar and barbecue terrace"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700/80">
                    Party Bar & BBQ
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-white mb-1.5">Barbecue Party Bar & Terrace</h4>
                  <p className="text-xs text-slate-300">
                    Fitted outdoor high-top bar counter and barbecue grills, creating the perfect social venue for weekend celebrations under starlight.
                  </p>
                </div>
              </div>

              {/* Visual 3: Sky Dining with Nature */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group shadow-xl">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={cloud33RooftopDining}
                    alt="Urbanrise On Cloud 33 elevated rooftop dining terrace overlooking Hyderabad"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700/80">
                    Sky Dining Deck
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-white mb-1.5">Al-Fresco Horizon Dining</h4>
                  <p className="text-xs text-slate-300">
                    Landscaped dining enclaves with weather-resistant furniture for intimate family meals overlooking panoramic city lights.
                  </p>
                </div>
              </div>
            </div>

            {/* 10 Sky Lounges Pill Matrix */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles size={16} />
                <span>The 10 Curated Rooftop Sky Lounges at 33 Floors High</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <SunMedium size={15} className="text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">1. Sky Yoga Deck</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Flame size={15} className="text-orange-400 shrink-0" />
                  <span className="font-semibold text-white">2. BBQ Party Bar</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Coffee size={15} className="text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">3. Sky Dining Deck</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Eye size={15} className="text-sky-400 shrink-0" />
                  <span className="font-semibold text-white">4. Stargazing Deck</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Briefcase size={15} className="text-purple-400 shrink-0" />
                  <span className="font-semibold text-white">5. Sky Co-Working</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Tv size={15} className="text-pink-400 shrink-0" />
                  <span className="font-semibold text-white">6. Rooftop Mini Cinema</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <MessageCircle size={15} className="text-indigo-400 shrink-0" />
                  <span className="font-semibold text-white">7. Interactive Lounge</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Activity size={15} className="text-teal-400 shrink-0" />
                  <span className="font-semibold text-white">8. Sky Games Zone</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Trees size={15} className="text-green-400 shrink-0" />
                  <span className="font-semibold text-white">9. Carpet Grass Terraces</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-2">
                  <Zap size={15} className="text-yellow-400 shrink-0" />
                  <span className="font-semibold text-white">10. Solar Energy Deck</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: URBANRISE GENIUS – CHILDREN'S LEARNING HUB
           ========================================================================= */}
        <section id="urbanrise-genius" className="py-14 sm:py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Educational Concept Description */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Unique Child Development Facility
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  Urbanrise Genius – Nurturing Young Minds Right at Home
                </h2>
                <p className="text-sm sm:text-base text-slate-300">
                  One of the crowning highlights of Urbanrise On Cloud 33 is <strong>Urbanrise Genius</strong>, an integrated learning academy created specifically for resident children. Instead of spending hours caught in traffic commuting to extracurricular centers across the city, your kids learn from certified mentors right inside the safety of your gated community.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <BookOpen size={20} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">After-School Tuitions & Study Labs</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Guided academic study centers and homework coaching for all standard boards (CBSE, ICSE, Cambridge).
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <Zap size={20} className="text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Robotics, Coding & STEM</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Next-generation computational thinking, robotics tinkering, and science labs preparing children for tomorrow.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <Palette size={20} className="text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Dance, Arts & Creative Expression</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Professional studios for classical Indian and Western contemporary dance, pottery, and fine arts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <Award size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Music Academy & Martial Arts</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Acoustically treated vocal and instrumental rooms (keyboard, guitar, drums) plus Karate/Taekwondo dojos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Benefits Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={24} />
                  <h3 className="text-lg font-bold text-white">Why Parents Love Urbanrise Genius</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Commute Stress:</strong> No evening traffic runs or pick-up hassles. Kids walk downstairs safely to class.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Gated Security:</strong> RFID biometric access and CCTV supervision ensure full child protection.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Certified Faculty:</strong> Structured curriculum powered by reputed academies and trained educators.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Holistic Peer Learning:</strong> Children build lifelong bonds with neighborhood peers of similar age.</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-800">
                  <a
                    href="#enquiry-section"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-colors"
                  >
                    <span>Enquire About Urbanrise Genius Schedule</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: SANCTIONED MASTER PLAN WITH 37-POINT INTERACTIVE LEGEND
           ========================================================================= */}
        <section id="master-plan" className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Official Sanctioned Layout
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Master Plan & 37-Feature Leisure Legend
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Every square foot of Urbanrise On Cloud 33 is engineered for maximum utility. Explore all 27 ground-level features and 10 elevated rooftop terrace amenities exactly as sanctioned on the official layout plan.
              </p>
            </div>

            {/* Master Plan High-Res Image Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-2 sm:p-4 mb-8 shadow-2xl">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden cursor-pointer group" onClick={() => setSelectedImage(PROJECT_GALLERY[9])}>
                <img
                  src={cloud33MasterPlan}
                  alt="Urbanrise On Cloud 33 official sanctioned master plan blueprint showing 37 numbered amenities"
                  className="w-full h-full object-contain bg-slate-950 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-700 text-white px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 backdrop-blur-md">
                  <Maximize2 size={13} className="text-amber-400" />
                  <span>Click to Inspect High-Res Master Plan</span>
                </div>
              </div>
            </div>

            {/* Interactive Legend Tabs: Ground Level vs Terraces Level */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <FileText size={18} className="text-amber-400" />
                    <span>Master Plan Legend Catalog</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Switch between ground-level amenities (1 to 27) and elevated terrace amenities (28 to 37)
                  </p>
                </div>

                <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanTab("ground")}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                      selectedPlanTab === "ground"
                        ? "bg-amber-500 text-slate-950 shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Ground Level (Points 1–27)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanTab("terrace")}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                      selectedPlanTab === "terrace"
                        ? "bg-amber-500 text-slate-950 shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Terraces Level (Points 28–37)
                  </button>
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
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {item.name}
                      </h4>
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
            SECTION 8: APARTMENT CONFIGURATIONS & FLOOR PLANS
           ========================================================================= */}
        <section id="configurations" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Spacious Living Formats
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                3 & 4 BHK Luxury Residences
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Crafted using monolithic aluminum Mivan formwork for smooth finishes, seismic resistance, and zero dead corridors. Each residence boasts wide balconies, independent foyers, and three-side cross-ventilation.
              </p>
            </div>

            {/* 4 Unit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {UNIT_CONFIGS.map((unit) => (
                <div
                  key={unit.bhk}
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
            SECTION 9: LOCATION ADVANTAGES & CONNECTIVITY MATRIX
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Arterial Connectivity
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Prime 200-ft Miyapur–Bachupally Main Road Location
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Fronting the wide 200-ft Miyapur–Bachupally Main Road, Urbanrise On Cloud 33 connects residents effortlessly to the Miyapur Metro Station, Outer Ring Road, and Hyderabad's primary IT corridors.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Connectivity Clusters */}
              <div className="lg:col-span-6 space-y-4">
                {/* Cluster 1: Metro & Highway Arterials */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Compass size={16} />
                    <span>Metro, Highway & IT Hubs</span>
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Miyapur Metro Station (Red Line)</span>
                      <span className="text-amber-400 font-bold shrink-0">~10 Mins (5.0 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Outer Ring Road (ORR Exit 4A/B Mallampet)</span>
                      <span className="text-amber-400 font-bold shrink-0">~8 Mins (4.5 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">HITEC City & Cyber Towers</span>
                      <span className="text-amber-400 font-bold shrink-0">~25 Mins (14 km)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Financial District & Gachibowli</span>
                      <span className="text-amber-400 font-bold shrink-0">~30 Mins (via ORR)</span>
                    </div>
                  </div>
                </div>

                {/* Cluster 2: Renowned Educational Institutions */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span>Top Schools & Colleges (Bachupally Hub)</span>
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Silver Oaks International School</span>
                      <span className="text-emerald-400 font-bold shrink-0">~5 Mins (2.0 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Oakridge International School</span>
                      <span className="text-emerald-400 font-bold shrink-0">~10 Mins (4.5 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Delhi Public School (DPS Miyapur)</span>
                      <span className="text-emerald-400 font-bold shrink-0">~10 Mins (5.0 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Kennedy High The Global School</span>
                      <span className="text-emerald-400 font-bold shrink-0">~7 Mins (3.2 km)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">VNR VJIET Engineering College</span>
                      <span className="text-emerald-400 font-bold shrink-0">~5 Mins (2.5 km)</span>
                    </div>
                  </div>
                </div>

                {/* Cluster 3: Healthcare & Shopping Centers */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Heart size={16} />
                    <span>Hospitals & Malls</span>
                  </h3>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">Mamata Academy of Medical Sciences</span>
                      <span className="text-sky-400 font-bold shrink-0">~5 Mins (2.2 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">SLG Multi-Specialty Hospital</span>
                      <span className="text-sky-400 font-bold shrink-0">~8 Mins (3.8 km)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                      <span className="text-slate-300 font-medium">GSM Mall & Multiplex (Miyapur)</span>
                      <span className="text-sky-400 font-bold shrink-0">~12 Mins (6.0 km)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium">Forum Nexus Mall (Kukatpally)</span>
                      <span className="text-sky-400 font-bold shrink-0">~20 Mins (10 km)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Maps Embed & Road Drone Visual */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                  <img
                    src={cloud33MiyapurRoad}
                    alt="Urbanrise On Cloud 33 fronting 200-ft Miyapur-Bachupally main road"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      Direct 200-ft Wide Frontage
                    </span>
                    <p className="text-xs text-slate-300 mt-1">
                      No congested internal gullies; direct access to major arterial four-lane highway.
                    </p>
                  </div>
                </div>

                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
                  <iframe
                    title="Urbanrise On Cloud 33 Location Map"
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
            SECTION 10: DEVELOPER PROFILE & BRAND CREDENTIALS
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Trusted Real Estate Brand
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                  Crafted by Urbanrise (Alliance Group)
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Urbanrise is the aspirational residential arm of Alliance Group, recognized as one of South India's largest and most reliable real estate conglomerates. Guided by a mission to deliver premium lifestyle infrastructure at accessible value points, Urbanrise has pioneered monolithic Mivan construction, resort-scale Moroccan clubhouses, and children's Genius learning hubs across Hyderabad, Bengaluru, and Chennai.
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
                    <span className="text-xl sm:text-2xl font-black text-emerald-400">1,200+</span>
                    <span className="text-xs text-slate-400 block mt-0.5">Families at Cloud 33</span>
                  </div>
                </div>
              </div>

              {/* Promoter Legal Matrix Card */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3.5 text-xs sm:text-sm">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>Sanction & Promoter Matrix</span>
                </h3>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Project Name</span>
                  <span className="font-semibold text-white">Urbanrise On Cloud 33</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Promoter Company</span>
                  <span className="font-semibold text-white">Urbanrise Lifestyles Pvt Ltd</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">TG RERA ID</span>
                  <span className="font-semibold text-emerald-400">{PROJECT_CONFIG.reraNumber}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Master RERA Handover Target</span>
                  <span className="font-semibold text-amber-300">31 March 2027</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Occupancy Status</span>
                  <span className="font-semibold text-emerald-400">Active (Select Towers Handed Over)</span>
                </div>

                <div className="pt-2">
                  <a
                    href="https://rera.telangana.gov.in"
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
            SECTION 11: DATA VERIFICATION MATRIX & TG RERA COMPLIANCE
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
                    Official TG RERA Compliance & Buyer Advisory
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
                    href="https://rera.telangana.gov.in"
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
                  <span className="text-slate-400 text-xs block">Master RERA Possession</span>
                  <span className="font-bold text-amber-300 text-base mt-1 block">
                    31 March 2027
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Overall Phase Milestone Target</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-xs block">Delivered Units</span>
                  <span className="font-bold text-white text-base mt-1 block">
                    1,200+ Families
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Residing In Operational Blocks</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400 text-xs block">Promoter Entity</span>
                  <span className="font-bold text-white text-base mt-1 block truncate">
                    Urbanrise Lifestyles
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Private Limited (Alliance)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-amber-200">Buyer Advisory Note:</strong>
                  <span>
                    While developer marketing advertises ready-to-move-in inventory, prospective purchasers should verify tower-specific occupancy certificates (OC) and handover schedules against the overall master phase RERA completion date (31 March 2027). Naani Projects facilitates transparent verification of all sanctioned building plans.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: DYNAMIC PRICING & PRIVATE CONSULTATION ENQUIRY FORM
           ========================================================================= */}
        <section id="enquiry-section" className="py-14 sm:py-20 border-b border-slate-800/80 bg-slate-900/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Authorized Advisory Desk
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Request Live Price Sheet & Private Site Visit
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
                    Thank you, <strong>{fullName}</strong>. Our senior property advisor for Urbanrise On Cloud 33 will connect with you within 15 minutes with the latest price sheet and availability.
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
                        placeholder="e.g. Rahul Sharma"
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
                        <option value="3 BHK Classic (1,353 Sft)">3 BHK Classic (1,353 Sft)</option>
                        <option value="3 BHK Comfort (1,480 Sft)">3 BHK Comfort (1,480 Sft)</option>
                        <option value="3 BHK Grand (1,617 Sft)">3 BHK Grand (1,617 Sft)</option>
                        <option value="4 BHK Royal Residence (2,021 Sft)">4 BHK Royal Residence (2,021 Sft)</option>
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
                        <option value="Investment">Investment (Rental Yield / Appreciation)</option>
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
            SECTION 13: 18 COMPREHENSIVE SEO FAQS
           ========================================================================= */}
        <section className="py-14 sm:py-20 border-b border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Buyer Knowledge Base
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Authoritative answers covering location, developer track record, TG RERA registration, apartment sizes, Moroccan clubhouse, rooftop sky lounges, ready-to-move status, and pricing.
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
            SECTION 14: RELATED RESIDENTIAL PROJECTS IN HYDERABAD
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

        {/* =========================================================================
            SECTION 16: LIGHTBOX MODAL FOR FULL-RESOLUTION INSPECTION
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
