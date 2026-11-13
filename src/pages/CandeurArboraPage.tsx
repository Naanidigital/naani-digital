import { useState, useId } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import {
  MessageCircle,
  Phone,
  MapPin,
  Building2,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  Download,
  Home,
  Check,
  ChevronRight,
  ChevronLeft,
  Dumbbell,
  Waves,
  Trees,
  Shield,
  Zap,
  X,
  Compass,
  Maximize2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";

// Authoritative user-uploaded media imports
import arboraHeroClubhouse from "@/assets/candeur-arbora/hero-clubhouse.jpg";
import arboraAerialMaster from "@/assets/candeur-arbora/aerial-masterview.jpg";
import arboraMasterplanLayout from "@/assets/candeur-arbora/masterplan-layout.png";
import arboraPool from "@/assets/candeur-arbora/swimming-pool.jpg";
import arboraCentralPark from "@/assets/candeur-arbora/central-park.jpg";
import arboraKidsPlay from "@/assets/candeur-arbora/kids-play-zone.jpg";
import arboraAmphitheater from "@/assets/candeur-arbora/amphitheater.jpg";
import arboraJoggingTrack from "@/assets/candeur-arbora/jogging-track.jpg";
import arboraMeditationLawn from "@/assets/candeur-arbora/meditation-lawn.webp";
import arboraGiantChess from "@/assets/candeur-arbora/giant-chess.jpg";
import arboraPromenade from "@/assets/candeur-arbora/evening-promenade.jpg";

import { sendLeadToSheet, type LeadProfile, type PageContext } from "@/lib/leadProfile";

// Centralized Project Configuration (Fact-Checked & Verified)
export const PROJECT_CONFIG = {
  name: "Candeur Arbora",
  developer: "Candeur Constructions",
  location: "Kukatpally, Hyderabad",
  address: "Off Green Hills Road, Near IDL Lake (Opp. Rainbow Vistas), Kukatpally, Hyderabad, Telangana 500072",
  startingPrice: "₹1.3 Cr Onwards",
  priceNote: "Provisional launch price · Subject to developer confirmation & payment plans",
  reraPhase1: "P02200011363",
  reraPhase2: "P02200011362",
  reraDisplay: "TG RERA Registered: P02200011362 & P02200011363",
  landArea: "~20 Acres Contiguous Land Parcel",
  towers: "Multiple High-Rise Towers (G+25 Floors)",
  clubhouseSize: "~1.35 Lakh to 1.36 Lakh Sq.Ft. Multi-Level Clubhouse",
  openSpace: "~4.3 Acres Central Open Courtyard (~75% Open Space)",
  possession: "September 2031 (Official TG RERA Registered Completion)",
  canonicalUrl: "https://www.naani.in/projects/candeur-arbora",
  phone: "+919493943946",
  phoneDisplay: "+91 94939 43946",
  phoneRaw: "9493943946",
  leadSource: "Website - Candeur Arbora",
};

export const CandeurArboraPage = () => {
  const formId = useId();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeHeroTab, setActiveHeroTab] = useState<number>(0);
  const [activePlanTab, setActivePlanTab] = useState<"compact" | "standard" | "large" | "premium" | "masterplan">("compact");
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>("all");
  const [activeSpecTab, setActiveSpecTab] = useState<string>("structure");

  // Simple Enquiry Form State (Consent UNCHECKED by default)
  const [formData, setFormData] = useState({ fullName: "", mobileNumber: "", consent: false });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [submittedPhones, setSubmittedPhones] = useState<string[]>([]);

  // Brochure Modal State (Honest WhatsApp Enquiry CTA - Consent UNCHECKED by default)
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochureFormData, setBrochureFormData] = useState({ fullName: "", mobileNumber: "", consent: false });
  const [brochureSubmitting, setBrochureSubmitting] = useState(false);
  const [brochureSuccess, setBrochureSuccess] = useState(false);
  const [brochureError, setBrochureError] = useState("");

  // Strict Indian mobile validation (10 digits starting with 6-9)
  const validateIndianMobile = (phone: string) => {
    const cleaned = phone.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)/, "");
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const getCleanMobile = (phone: string) => {
    return phone.replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)/, "");
  };

  const handleSimpleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!validateIndianMobile(formData.mobileNumber)) {
      setFormError("Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).");
      return;
    }
    if (!formData.consent) {
      setFormError("Please check the consent box to authorize contact before proceeding.");
      return;
    }

    const cleanNumber = getCleanMobile(formData.mobileNumber);

    // Duplicate submission prevention
    if (submittedPhones.includes(cleanNumber)) {
      setFormError("You have already submitted an enquiry with this mobile number. Our advisor will connect shortly.");
      return;
    }

    setFormSubmitting(true);
    const cleanPhone = `+91${cleanNumber}`;

    const profile: LeadProfile = {
      name: formData.fullName.trim(),
      phone: cleanPhone,
      lookingFor: "3 BHK",
      capturedAt: new Date().toISOString(),
    };

    const context: PageContext = {
      propertyName: PROJECT_CONFIG.name,
      projectName: PROJECT_CONFIG.name,
      builderName: PROJECT_CONFIG.developer,
      location: "Kukatpally, Hyderabad",
      propertyType: "Apartment",
      pageUrl: typeof window !== "undefined" ? window.location.href : PROJECT_CONFIG.canonicalUrl,
      sourcePage: typeof document !== "undefined" ? document.referrer : "",
    };

    try {
      await sendLeadToSheet({
        profile,
        context,
        leadSource: PROJECT_CONFIG.leadSource,
      });
      setSubmittedPhones((prev) => [...prev, cleanNumber]);
      setFormSuccess(true);
    } catch {
      setFormError("Unable to submit at this moment. Please connect with us directly on WhatsApp or call.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBrochureError("");

    if (!brochureFormData.fullName.trim() || brochureFormData.fullName.trim().length < 2) {
      setBrochureError("Please enter your full name.");
      return;
    }
    if (!validateIndianMobile(brochureFormData.mobileNumber)) {
      setBrochureError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!brochureFormData.consent) {
      setBrochureError("Please check the consent box to authorize contact before proceeding.");
      return;
    }

    const cleanNumber = getCleanMobile(brochureFormData.mobileNumber);

    if (submittedPhones.includes(cleanNumber)) {
      setBrochureError("You have already submitted an enquiry with this number. Our advisor will share the details on WhatsApp.");
      return;
    }

    setBrochureSubmitting(true);
    const cleanPhone = `+91${cleanNumber}`;

    const profile: LeadProfile = {
      name: brochureFormData.fullName.trim(),
      phone: cleanPhone,
      lookingFor: "3 BHK",
      capturedAt: new Date().toISOString(),
    };

    const context: PageContext = {
      propertyName: PROJECT_CONFIG.name,
      projectName: PROJECT_CONFIG.name,
      builderName: PROJECT_CONFIG.developer,
      location: "Kukatpally, Hyderabad",
      propertyType: "Apartment",
      pageUrl: typeof window !== "undefined" ? window.location.href : PROJECT_CONFIG.canonicalUrl,
      sourcePage: typeof document !== "undefined" ? document.referrer : "",
    };

    try {
      await sendLeadToSheet({
        profile,
        context,
        leadSource: `${PROJECT_CONFIG.leadSource} - Brochure Request`,
      });
      setSubmittedPhones((prev) => [...prev, cleanNumber]);
      setBrochureSuccess(true);
    } catch {
      setBrochureError("Unable to submit request. Please tap WhatsApp to contact us directly.");
    } finally {
      setBrochureSubmitting(false);
    }
  };

  const waLeadMsg = encodeURIComponent(
    `Hi Naani Projects, I'm interested in Candeur Arbora (Kukatpally, Hyderabad). Please share the current developer pricing sheet, 3 BHK floor sizes, and site visit schedule.`
  );
  const waUrl = `https://wa.me/91${PROJECT_CONFIG.phoneRaw}?text=${waLeadMsg}`;

  // Interactive Hero Media Carousel (Official images only)
  const heroMedia = [
    {
      id: "clubhouse",
      title: "Signature Multi-Level Clubhouse (~1.35 Lakh Sq.Ft.)",
      subtitle: "Architectural glass facade with landscaped terrace greenery, resort swimming pool & sports court",
      src: arboraHeroClubhouse,
      badge: "1.35 Lakh Sft Clubhouse",
      alt: "Candeur Arbora grand multi-level clubhouse with swimming pool and residential high-rise towers in Kukatpally",
    },
    {
      id: "aerial",
      title: "20-Acre Master Township Aerial Perspective",
      subtitle: "Multiple G+25 high-rise towers wrapped around a linear 4.3-acre central courtyard",
      src: arboraAerialMaster,
      badge: "20-Acre Master Township",
      alt: "Candeur Arbora 20-acre high-rise master layout view with central courtyard and 30-meter wide road",
    },
    {
      id: "masterplan",
      title: "Official 2D Master Plan & Zoning Blueprint",
      subtitle: "Detailed layout showing gated entrance, tower footprints, central lawns and vehicular circulation",
      src: arboraMasterplanLayout,
      badge: "Master Layout Blueprint",
      alt: "Candeur Arbora master layout plan showing towers, amenities, and 30M wide access road",
    },
    {
      id: "centralpark",
      title: "4.3-Acre Central Open Courtyard & Sports Lawn",
      subtitle: "Lush green community courtyard with outdoor sports arena and family picnic zones",
      src: arboraCentralPark,
      badge: "4.3-Acre Courtyard",
      alt: "Candeur Arbora central open courtyard with landscaped park and basketball court",
    },
    {
      id: "pool",
      title: "Resort-Style Swimming Pool & Sun Deck",
      subtitle: "Expansive lap pool with poolside relaxation deck and lush green buffer",
      src: arboraPool,
      badge: "Resort Lap Pool",
      alt: "Candeur Arbora luxury swimming pool and wooden sun deck beside the glass clubhouse",
    },
  ];

  // Curated Gallery Items (All 11 official images with categorization)
  const galleryItems = [
    {
      src: arboraHeroClubhouse,
      title: "Multi-Level Signature Clubhouse (~1.35 Lakh Sq.Ft.)",
      subtitle: "Terraced glass architecture, indoor leisure & wellness facilities",
      category: "clubhouse",
      tag: "Clubhouse View",
    },
    {
      src: arboraAerialMaster,
      title: "20-Acre Master Township 3D Aerial View",
      subtitle: "G+25 towers enclosing the ~4.3-acre linear central green core",
      category: "masterplan",
      tag: "Aerial Master View",
    },
    {
      src: arboraMasterplanLayout,
      title: "Master Plan Layout Blueprint & Amenity Map",
      subtitle: "Full layout of towers, peripheral 30M road, and central park",
      category: "masterplan",
      tag: "Master Layout",
    },
    {
      src: arboraPool,
      title: "Resort Swimming Pool & Sun Loungers",
      subtitle: "Designer swimming pool overlooking the landscaped clubhouse courtyard",
      category: "clubhouse",
      tag: "Swimming Pool",
    },
    {
      src: arboraCentralPark,
      title: "4.3-Acre Open Green Central Courtyard",
      subtitle: "Lush parkland, half basketball court, and seating pavilions",
      category: "landscape",
      tag: "Central Courtyard",
    },
    {
      src: arboraAmphitheater,
      title: "Open-Air Amphitheater & Performance Plaza",
      subtitle: "Tiered seating for community celebrations and outdoor events",
      category: "landscape",
      tag: "Amphitheater",
    },
    {
      src: arboraKidsPlay,
      title: "Children's Adventure Play Area & Trampoline",
      subtitle: "Safe rubber-turf playground with climbing walls and swings",
      category: "sports",
      tag: "Kids Play Zone",
    },
    {
      src: arboraJoggingTrack,
      title: "Dedicated Jogging & Cycling Corridor",
      subtitle: "Paved jogging track alongside the landscaped sports turf",
      category: "sports",
      tag: "Jogging Track",
    },
    {
      src: arboraMeditationLawn,
      title: "Tranquil Yoga & Meditation Lawns",
      subtitle: "Lush shaded greenery and gazebo for morning wellness",
      category: "landscape",
      tag: "Yoga & Meditation",
    },
    {
      src: arboraGiantChess,
      title: "Outdoor Giant Chess & Interactive Plaza",
      subtitle: "Life-sized chess board set within landscaped garden walkways",
      category: "sports",
      tag: "Giant Chess",
    },
    {
      src: arboraPromenade,
      title: "Tree-Lined Evening Walking Promenade",
      subtitle: "Paved paths with pergolas and evening lighting",
      category: "landscape",
      tag: "Evening Promenade",
    },
  ];

  const filteredGallery =
    activeGalleryFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeGalleryFilter);

  // In-Page Desktop Sub-Navigation
  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Highlights", href: "#highlights" },
    { label: "3 BHK Configurations", href: "#configurations" },
    { label: "Clubhouse", href: "#clubhouse" },
    { label: "Amenities", href: "#amenities" },
    { label: "Specifications", href: "#specifications" },
    { label: "Location & Transit", href: "#location" },
    { label: "Gallery", href: "#gallery" },
    { label: "Developer", href: "#developer" },
    { label: "FAQs", href: "#faqs" },
  ];

  // 50+ Planned Lifestyle Amenities (Categorized)
  const amenityCategories = [
    {
      category: "1.35 Lakh Sft Clubhouse & Leisure",
      badge: "Grand Hub",
      icon: <Building2 className="text-amber-400" size={22} />,
      items: [
        "Multi-Level Residents Clubhouse (~1.35 Lakh sq.ft.)",
        "Grand Double-Height Entrance Lobby & Guest Lounge",
        "Multipurpose Banquet Hall & Celebrations Deck",
        "Executive Business Center & Co-Working Pods",
        "Air-Conditioned Indoor Badminton Courts",
        "Squash Court & Indoor Table Tennis Arena",
        "Billiards, Snooker & Board Games Lounge",
        "Preview Theater / Mini Cinema Hall",
        "Guest Suites for Visiting Family",
      ],
    },
    {
      category: "Aquatic, Fitness & Active Health",
      badge: "Wellness",
      icon: <Waves className="text-emerald-400" size={22} />,
      items: [
        "Resort-Style Swimming Pool with Sun Loungers",
        "Dedicated Children's Splash Pool",
        "Air-Conditioned Gymnasium & Aerobics Studio",
        "Outdoor Yoga & Meditation Lawns with Shaded Gazebo",
        "Acupressure Reflexology Walking Path",
        "Dedicated Cycling Track & Continuous Jogging Loop",
        "Steam, Sauna & Wellness Spa Facility",
      ],
    },
    {
      category: "4.3-Acre Central Courtyard & Nature",
      badge: "Green Core",
      icon: <Trees className="text-emerald-400" size={22} />,
      items: [
        "~4.3 Acres Continuous Central Open Courtyard",
        "Open-Air Tiered Amphitheater for Cultural Gatherings",
        "Landscaped Pergola Walkways & Shaded Benches",
        "Lush Tree Canopies & Central Lawn",
        "Family Picnic Lawns & Sit-Out Decks",
        "Elderly Seating Pavilion with Senior-Friendly Access",
        "Rainwater Harvesting Recharge Pits Across Estate",
        "Water Softening Plant (WTP) & Sewage Treatment (STP)",
      ],
    },
    {
      category: "Sports, Games & Adventure Play",
      badge: "Active Living",
      icon: <Dumbbell className="text-amber-400" size={22} />,
      items: [
        "Multi-Purpose Sports Court (Basketball / Volleyball)",
        "Mini Football Turf / Futsal Arena",
        "Outdoor Giant Chess Plaza with Decorative Pavers",
        "Children's Adventure Playground with Safety Turf",
        "Climbing Wall & Rope Agility Obstacle Nets",
        "Trampoline Play Zone & Sand Pit for Toddlers",
        "Cricket Practice Net with Bowling Pitch",
      ],
    },
    {
      category: "Infrastructure, Security & Smart Utilities",
      badge: "24/7 Safety",
      icon: <Shield className="text-amber-400" size={22} />,
      items: [
        "24x7 Multi-Tier Security with Command Center",
        "CCTV Surveillance for Entrances, Basements & Corridors",
        "RFID Automated Boom Barriers at Main Gates",
        "Solar-Powered Perimeter Security Fencing",
        "100% DG Power Backup for Common Areas & Residences",
        "Dedicated EV Charging Infrastructure Bays",
        "Peripheral 30-Meter Wide Access Road",
        "Multi-Level Secure Car Parking",
      ],
    },
  ];

  // Construction Specifications (Grade-A Standard Benchmark)
  const specificationsData = [
    {
      id: "structure",
      title: "Structure & Walls",
      icon: <Building2 size={18} />,
      details: [
        { label: "Earthquake Resistant Structure", val: "R.C.C. framed structure engineered to withstand severe wind and seismic Zone II loads." },
        { label: "Super Structure", val: "High-quality CC Blocks / AAC blocks: 8-inch external perimeter walls and 4-inch internal dividing walls." },
        { label: "Internal Plastering", val: "Single-coat cement plaster with smooth gypsum/putty finish." },
        { label: "External Plastering", val: "Double-coat water-resistant cement plaster with sponge finish." },
      ],
    },
    {
      id: "flooring",
      title: "Flooring & Skirting",
      icon: <Layers size={18} />,
      details: [
        { label: "Drawing, Living & Dining", val: "Premium 800x800mm or 1200x600mm double-charged glazed vitrified tiles with elegant skirting." },
        { label: "Master Bedroom", val: "Laminated wooden flooring or premium vitrified tiles matching master bedroom aesthetics." },
        { label: "Other Bedrooms & Kitchen", val: "Premium anti-skid double-charged vitrified tiles of reputed make." },
        { label: "Bathrooms & Balconies", val: "Acid-resistant, anti-skid ceramic/vitrified designer tiles." },
        { label: "Corridors & Lobbies", val: "Polished granite/granite-finished vitrified flooring with accent borders." },
      ],
    },
    {
      id: "doors-windows",
      title: "Doors, Windows & Balconies",
      icon: <Home size={18} />,
      details: [
        { label: "Main Entrance Door", val: "Engineered teak wood frame with designer veneered flush shutter, polyurethane polish, and biometric smart lock." },
        { label: "Internal Doors", val: "Engineered wood frames with laminated or enamel-painted flush shutters and brass/SS hardware." },
        { label: "French Doors & Windows", val: "Heavy-duty UPVC sliding doors with clear toughened glass and provision for mosquito mesh track." },
        { label: "Balcony Railings", val: "Toughened laminated glass railings or MS safety grill with anti-corrosion primer coating." },
      ],
    },
    {
      id: "electrical",
      title: "Electrical & Smart Provisions",
      icon: <Zap size={18} />,
      details: [
        { label: "Wiring & Cables", val: "Concealed copper wiring with fire-retardant (FRLS) insulation of Finolex / Havells / Polycab or equivalent make." },
        { label: "Switches & Sockets", val: "Modular switches and sockets of Schneider / Legrand / Crabtree or equivalent premium brands." },
        { label: "Air Conditioning", val: "Pre-installed copper piping and electrical points for split AC units in all bedrooms and living hall." },
        { label: "Power Backup", val: "100% DG generator power backup for all lighting, fans, and common amenities." },
        { label: "EV Charging", val: "Designated electric vehicle charging bays in parking." },
      ],
    },
    {
      id: "sanitary",
      title: "Sanitary, CP & Water Supply",
      icon: <Waves size={18} />,
      details: [
        { label: "Sanitary Ware", val: "Wall-hung EWC with concealed flush tank of Kohler / Grohe / Toto or equivalent premium brand." },
        { label: "CP Fittings", val: "Premium single-lever diverters, rain shower, and basin mixers of Grohe / Kohler make." },
        { label: "Domestic Water Supply", val: "Centralized water softening plant ensuring treated non-RO soft water for all apartments." },
        { label: "Hot Water System", val: "Provision for geysers in all attached bathrooms." },
      ],
    },
  ];

  // Proximity Matrix for Kukatpally (Realistic Off-Peak Times)
  const locationDistances = [
    { place: "Green Hills Road & Rainbow Vistas Junction", time: "~1-2 Mins", distance: "0.2 km", category: "Immediate Corridor" },
    { place: "IDL Lake Waterfront", time: "~2-3 Mins", distance: "0.8 km", category: "Immediate Corridor" },
    { place: "Moosapet Metro Station (Red Line)", time: "~5-7 Mins", distance: "2.1 km", category: "Metro Transit" },
    { place: "KPHB Colony & Metro Station", time: "~7-10 Mins", distance: "3.2 km", category: "Metro Transit" },
    { place: "Nexus / Forum Sujana Mall Kukatpally", time: "~8-10 Mins", distance: "3.5 km", category: "Retail & Dining" },
    { place: "JNTU Hyderabad Campus", time: "~10-12 Mins", distance: "4.5 km", category: "Education" },
    { place: "HITEC City / Cyber Towers IT Hub", time: "~15-20 Mins", distance: "6.8 km", category: "IT Corridor" },
    { place: "Madhapur & Inorbit Mall", time: "~18-22 Mins", distance: "8.2 km", category: "IT Corridor" },
    { place: "Gachibowli Financial District", time: "~25-30 Mins", distance: "12.5 km", category: "IT Corridor" },
    { place: "OMNI / Yashoda Hospitals", time: "~10-15 Mins", distance: "4.8 km", category: "Healthcare" },
  ];

  // JSON-LD Structured Data Schema (Fact-Checked)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#listing`,
        "name": "Candeur Arbora – Luxury 3 BHK High-Rise Apartments in Kukatpally, Hyderabad",
        "description": "Candeur Arbora by Candeur Constructions is an iconic 20-acre luxury residential township in Kukatpally, Hyderabad. Features G+25 high-rise towers, 1.35 lakh sq.ft. clubhouse, 4.3-acre central open courtyard, and 3 BHK luxury residences near HITEC City.",
        "url": PROJECT_CONFIG.canonicalUrl,
        "image": "https://www.naani.in/og-candeur-arbora.jpg",
        "datePosted": "2026-11-12",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "price": "13000000",
          "lowPrice": "13000000",
          "highPrice": "22000000",
          "offerCount": "1000",
          "availability": "https://schema.org/PreOrder",
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Off Green Hills Road, Kukatpally",
          "addressLocality": "Kukatpally",
          "addressRegion": "Telangana",
          "postalCode": "500072",
          "addressCountry": "IN",
        },
      },
      {
        "@type": "Residence",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#residence`,
        "name": "Candeur Arbora",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Off Green Hills Road, Near IDL Lake",
          "addressLocality": "Kukatpally",
          "addressRegion": "Hyderabad",
          "addressCountry": "IN",
        },
        "brand": {
          "@type": "Brand",
          "name": "Candeur Constructions",
          "url": "https://www.candeurconstructions.com",
        },
        "amenityFeature": [
          "1.35 Lakh Sq.Ft. Clubhouse",
          "4.3-Acre Central Courtyard",
          "Resort Swimming Pool",
          "Gymnasium",
          "Amphitheater",
          "Adventure Play Area",
          "Giant Chess Plaza",
          "Jogging Track",
          "Yoga Lawns",
          "100% DG Power Backup",
          "24/7 Security",
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": "https://www.naani.in/#organization",
        "name": "Naani Projects",
        "telephone": PROJECT_CONFIG.phone,
        "url": PROJECT_CONFIG.canonicalUrl,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressCountry": "India",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
          { "@type": "ListItem", "position": 3, "name": "Projects in Kukatpally", "item": "https://www.naani.in/projects-in-kukatpally" },
          { "@type": "ListItem", "position": 4, "name": "Candeur Arbora", "item": PROJECT_CONFIG.canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PROJECT_CONFIG.canonicalUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where is Candeur Arbora located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Candeur Arbora is situated off Green Hills Road, Kukatpally, Hyderabad, near IDL Lake and opposite Rainbow Vistas, approximately 15-20 minutes from HITEC City.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the starting price for Candeur Arbora Kukatpally?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pricing starts provisionally at ₹1.3 Cr onwards for 3 BHK luxury residences, subject to developer confirmation, floor rise, and launch payment plans.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the land area and scale of Candeur Arbora?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Candeur Arbora is a ~20-acre high-rise gated township featuring multiple towers (G+25 floors), a ~4.3-acre central open courtyard, and an iconic ~1.35 lakh sq.ft. multi-level clubhouse.",
            },
          },
          {
            "@type": "Question",
            "name": "What are the RERA registration numbers for Candeur Arbora?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Candeur Arbora is registered under Telangana RERA with registration numbers P02200011362 and P02200011363.",
            },
          },
          {
            "@type": "Question",
            "name": "What unit configurations are available at Candeur Arbora?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The project exclusively offers 3 BHK luxury residences across four verified size bands: Compact 3 BHK (~1,550-1,575 sft), Standard 3 BHK (~1,655-1,830 sft), Large 3 BHK (~1,830-1,965 sft), and Premium 3 BHK (~2,048-2,205 sft).",
            },
          },
          {
            "@type": "Question",
            "name": "When is possession scheduled for Candeur Arbora?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Official registered TG RERA completion is September 2031. The project is currently in early construction/pre-launch phase.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#090D16] text-white min-h-screen">
      <SEOHead
        title="Candeur Arbora Kukatpally Hyderabad | Luxury 3 BHK High-Rise Apartments"
        description="Candeur Arbora by Candeur Constructions in Kukatpally, Hyderabad. 20-acre luxury township with 1.35 lakh sft clubhouse & 4.3-acre central courtyard. Starting ₹1.3 Cr. Book site visit with Naani Projects."
        canonicalUrl={PROJECT_CONFIG.canonicalUrl}
        ogImage="https://www.naani.in/og-candeur-arbora.jpg"
        keywords="Candeur Arbora, Candeur Arbora Kukatpally, Candeur Kukatpally, Candeur Constructions Hyderabad, 3 BHK flats Kukatpally, luxury apartments near HITEC City, flats near IDL Lake Hyderabad"
        structuredData={structuredData}
      />

      {/* 1. HERO SECTION WITH OFFICIAL INTERACTIVE MEDIA SWITCHER */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-gradient-to-b from-[#0B111F] via-[#090D16] to-[#090D16] border-b border-amber-500/20 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Header */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight size={13} className="text-slate-600" />
            <Link to="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
            <ChevronRight size={13} className="text-slate-600" />
            <Link to="/projects-in-kukatpally" className="hover:text-amber-400 transition-colors">Kukatpally</Link>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-amber-400 font-bold">Candeur Arbora</span>
          </nav>

          {/* Project Title & Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 border border-amber-400/40 text-amber-300">
              <Sparkles size={13} /> PRE-LAUNCH · BOOKINGS OPEN
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
              <ShieldCheck size={13} /> {PROJECT_CONFIG.reraDisplay}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-300">
              <MapPin size={13} className="text-amber-400" /> Near IDL Lake, Kukatpally
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Project Title, Details, Interactive Media Carousel */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Candeur <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Arbora</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 font-medium mt-1">
                  20-Acre Luxury High-Rise Township with ~4.3-Acre Central Courtyard & 1.35 Lakh Sft Clubhouse
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1">
                  <span>By <strong className="text-white">{PROJECT_CONFIG.developer}</strong></span>
                  <span>•</span>
                  <span>{PROJECT_CONFIG.location}</span>
                </div>
              </div>

              {/* Interactive Hero Visual Container */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl group">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                  <img
                    src={heroMedia[activeHeroTab].src}
                    alt={heroMedia[activeHeroTab].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    fetchPriority="high"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-[11px] font-bold text-amber-300 shadow">
                      {heroMedia[activeHeroTab].badge}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-[10px] font-bold text-emerald-300 shadow">
                      Official Project Render
                    </span>
                  </div>

                  {/* Zoom Action Icon */}
                  <button
                    onClick={() => setSelectedImage(heroMedia[activeHeroTab].src)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-amber-400 transition-colors z-10"
                    aria-label="View Fullscreen Render"
                  >
                    <Maximize2 size={16} />
                  </button>

                  {/* Desktop Prev / Next Navigation Arrows */}
                  <button
                    onClick={() => setActiveHeroTab((prev) => (prev === 0 ? heroMedia.length - 1 : prev - 1))}
                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white hover:text-amber-400 hover:border-amber-400/50 items-center justify-center transition-all z-10 shadow-lg"
                    aria-label="Previous Project Render"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setActiveHeroTab((prev) => (prev === heroMedia.length - 1 ? 0 : prev + 1))}
                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white hover:text-amber-400 hover:border-amber-400/50 items-center justify-center transition-all z-10 shadow-lg"
                    aria-label="Next Project Render"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-left">
                    <p className="text-xs sm:text-sm font-bold text-white flex items-center justify-between">
                      <span>{heroMedia[activeHeroTab].title}</span>
                      <span className="text-[11px] text-amber-400 font-mono hidden sm:inline">
                        {activeHeroTab + 1} / {heroMedia.length}
                      </span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {heroMedia[activeHeroTab].subtitle}
                    </p>
                  </div>
                </div>

                {/* Media Switcher Thumbnails (Hidden native scrollbars, touch swipe preserved) */}
                <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {heroMedia.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveHeroTab(idx)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        activeHeroTab === idx
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm"
                          : "bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <span>{m.badge}</span>
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Right 5 Cols: Quick Stats Card & Direct Lead Enquiry Form */}
            <div className="lg:col-span-5 space-y-5">
              {/* Pricing & Key Project Highlights Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950/90 border border-amber-500/30 shadow-2xl backdrop-blur-md relative">
                <div className="flex items-baseline justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Launch Pricing</span>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-0.5">
                      {PROJECT_CONFIG.startingPrice}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                      {PROJECT_CONFIG.priceNote}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Configurations</span>
                    <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">3 BHK Residences</div>
                    <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">1,550 – 2,205 Sft</span>
                  </div>
                </div>

                {/* Key Metric Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Land Parcel</span>
                    <span className="font-extrabold text-slate-200 text-xs sm:text-sm">~20 Acres</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Grand Clubhouse</span>
                    <span className="font-extrabold text-amber-300 text-xs sm:text-sm">~1.35 Lakh Sft</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Central Courtyard</span>
                    <span className="font-extrabold text-emerald-300 text-xs sm:text-sm">~4.3 Acres Open</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">RERA Possession</span>
                    <span className="font-extrabold text-slate-200 text-xs sm:text-sm">Sept 2031</span>
                  </div>
                </div>

                {/* SIMPLE ENQUIRY FORM (Strict: Name + Valid Indian Mobile + Consent) */}
                <div className="rounded-xl bg-slate-950 p-4 border border-amber-500/25">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <h2 className="text-sm font-extrabold text-white tracking-wide uppercase">
                      Request Latest Price & Floor Plans
                    </h2>
                  </div>

                  {formSuccess ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-sm font-bold text-white">Thank You, {formData.fullName}!</p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Your inquiry for <strong>Candeur Arbora</strong> has been recorded. Our Kukatpally project advisor is sharing the price breakdown and layout plans on WhatsApp.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors"
                      >
                        <MessageCircle size={14} /> Open Immediate WhatsApp Chat
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSimpleEnquirySubmit} className="space-y-3">
                      <div>
                        <label htmlFor={`${formId}-name`} className="block text-[11px] font-bold text-slate-300 mb-1">
                          Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          id={`${formId}-name`}
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor={`${formId}-phone`} className="block text-[11px] font-bold text-slate-300 mb-1">
                          Mobile Number <span className="text-amber-400">*</span> (10 Digits)
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-xs font-bold text-slate-400 select-none">+91</span>
                          <input
                            id={`${formId}-phone`}
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="98765 43210"
                            value={formData.mobileNumber}
                            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, "") })}
                            className="w-full h-10 pl-11 pr-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                          />
                        </div>
                      </div>

                      {/* Consent Checkbox */}
                      <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer pt-0.5">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 accent-amber-500"
                        />
                        <span>
                          I agree to be contacted via WhatsApp/Call regarding Candeur Arbora Kukatpally.
                        </span>
                      </label>

                      {formError && (
                        <p className="text-[11px] text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg flex items-center gap-1.5">
                          <AlertCircle size={14} className="flex-shrink-0" />
                          <span>{formError}</span>
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full h-10 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all"
                      >
                        {formSubmitting ? "Submitting..." : "Request Latest Price & Floor Plans"}
                      </Button>

                      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <ShieldCheck size={13} className="text-emerald-400" /> Free Buyer Advisory
                        </span>
                        <span>Direct Developer Pricing</span>
                      </div>
                    </form>
                  )}
                </div>

                {/* Instant Call / WhatsApp Fast Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors shadow"
                  >
                    <MessageCircle size={15} /> WhatsApp Us
                  </a>
                  <a
                    href={`tel:${PROJECT_CONFIG.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-extrabold text-xs transition-colors shadow"
                  >
                    <Phone size={14} className="text-amber-400" /> Call {PROJECT_CONFIG.phoneDisplay}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY IN-PAGE SUB-NAVIGATION BAR (DESKTOP) */}
      <div className="sticky top-16 z-30 bg-[#090D16]/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
          <nav aria-label="Project sections" className="flex items-center space-x-1 lg:space-x-4 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 py-1 text-xs font-bold text-slate-300 hover:text-amber-400 transition-colors whitespace-nowrap rounded-md hover:bg-amber-500/10"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setBrochureModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center gap-1 shadow-sm"
            >
              <Download size={13} /> Brochure Request
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors flex items-center gap-1 shadow-sm"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* 3. PROJECT HIGHLIGHTS STRIP */}
      <section id="highlights" className="py-8 bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Land Area", val: "~20 Acres", sub: "Gated Township", icon: <Layers className="text-amber-400" size={18} /> },
              { label: "Tower Elevation", val: "G+25 Floors", sub: "Multiple Towers", icon: <Building2 className="text-amber-400" size={18} /> },
              { label: "Central Courtyard", val: "~4.3 Acres", sub: "Linear Open Park", icon: <Trees className="text-emerald-400" size={18} /> },
              { label: "Grand Clubhouse", val: "1.35 Lakh Sft", sub: "Multi-Level Hub", icon: <Award className="text-amber-400" size={18} /> },
              { label: "Configurations", val: "3 BHK Residences", sub: "1,550 - 2,205 Sft", icon: <Home className="text-emerald-400" size={18} /> },
              { label: "Access Road", val: "30M Wide Road", sub: "Off Green Hills Rd", icon: <MapPin className="text-amber-400" size={18} /> },
            ].map((stat, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="flex justify-center mb-1.5">{stat.icon}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">{stat.label}</div>
                <div className="text-sm sm:text-base font-black text-white mt-0.5">{stat.val}</div>
                <div className="text-[10px] text-slate-400 font-medium">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OVERVIEW SECTION */}
      <section id="overview" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 border border-amber-400/40 text-amber-300">
                KUKATPALLY'S NEXT LANDMARK
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                An Urban Sanctuary on Green Hills Road, Kukatpally
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                <strong>Candeur Arbora</strong> is an expansive <strong>~20-acre residential high-rise gated community</strong> crafted by <strong>Candeur Constructions</strong>, situated right off Green Hills Road near IDL Lake and opposite Rainbow Vistas in Kukatpally, Hyderabad. Designed for modern tech professionals and families, Arbora fuses urban connectivity with calm, green living.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Anchored by a dedicated <strong>~4.3-acre linear central courtyard</strong> and a signature <strong>~1.35 lakh sq.ft. multi-level clubhouse</strong>, Candeur Arbora features 50+ planned lifestyle amenities, an open-air amphitheater, outdoor giant chess plaza, and comprehensive sports infrastructure framed by multiple G+25 residential towers.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  "TG RERA Registered: P02200011362 & P02200011363",
                  "~15-20 Minutes to HITEC City & Cyber Towers",
                  "~5-7 Minutes to Moosapet & KPHB Metro Stations",
                  "~75% Open Landscaped Spaces & Tree-Lined Avenues",
                  "100% DG Power Backup & Rainwater Harvesting",
                  "Wide 30-Meter Peripheral Access Road",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 font-semibold">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Button
                  onClick={() => setBrochureModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Download size={15} /> Request Latest Price & Floor Plans
                </Button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-extrabold text-xs transition-colors"
                >
                  <MessageCircle size={15} /> Chat with Kukatpally Advisor
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-900 group">
                <img
                  src={arboraCentralPark}
                  alt="Candeur Arbora 4.3-acre central courtyard with landscaped lawn and basketball court"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-amber-400 block tracking-wider">
                    Community Perspective
                  </span>
                  <div className="text-sm font-bold text-white">4.3-Acre Central Courtyard</div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Linear open green landscape bringing natural light, cross-ventilation, and recreation to every resident.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED 3 BHK CONFIGURATIONS & FLOOR SIZES */}
      <section id="configurations" className="py-12 sm:py-16 bg-slate-950 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Verified Unit Bands</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
              3 BHK Residences Across 4 Verified Size Bands
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Candeur Arbora features exclusively 3 BHK luxury configurations (with compact, standard, large, and premium formats from ~1,550 to ~2,205 sq.ft.) designed with Vastu compliance and central courtyard views.
            </p>
          </div>

          {/* Configuration Tab Selectors */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-full">
              {[
                { id: "compact", label: "Compact 3 BHK (~1,550 Sft)" },
                { id: "standard", label: "Standard 3 BHK (~1,655 - 1,830 Sft)" },
                { id: "large", label: "Large 3 BHK (~1,830 - 1,965 Sft)" },
                { id: "premium", label: "Premium 3 BHK (~2,048 - 2,205 Sft)" },
                { id: "masterplan", label: "20-Acre Master Layout" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlanTab(tab.id as typeof activePlanTab)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activePlanTab === tab.id
                      ? "bg-amber-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-900/70 p-6 sm:p-8 rounded-2xl border border-amber-500/20">
            {activePlanTab === "masterplan" ? (
              <>
                <div className="lg:col-span-7">
                  <div
                    onClick={() => setSelectedImage(arboraMasterplanLayout)}
                    className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 cursor-zoom-in group"
                  >
                    <img
                      src={arboraMasterplanLayout}
                      alt="Candeur Arbora 20-acre master plan layout blueprint"
                      className="w-full h-auto object-contain max-h-[460px] mx-auto p-2 group-hover:scale-102 transition-transform"
                    />
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-[11px] font-bold text-amber-300 border border-slate-700">
                      Tap to Enlarge
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-400/30">
                    Master Blueprint
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">20-Acre Master Zoning Plan</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    The master layout demonstrates the intelligent peripheral vehicular circulation along the 30-meter wide road, completely isolating vehicle traffic from the 4.3-acre central pedestrianized sanctuary.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="text-amber-400" size={14} /> Grand security entrance with boom barrier lanes
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-amber-400" size={14} /> Multi-level central clubhouse beside the swimming pool
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-amber-400" size={14} /> Multiple G+25 residential towers with expansive inter-tower buffers
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-amber-400" size={14} /> Central open courtyard featuring amphitheater, sports turf & lawns
                    </li>
                  </ul>
                  <button
                    onClick={() => setBrochureModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow"
                  >
                    Request Full-Resolution Master Blueprint
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="lg:col-span-7">
                  {/* Premium Architectural Floor Plan Placeholder (No fake generic icon) */}
                  <div className="relative rounded-2xl bg-[#070A12] border border-amber-500/30 p-6 sm:p-8 text-center overflow-hidden shadow-2xl">
                    {/* Architectural corner registration marks */}
                    <div className="absolute top-2 left-2 text-amber-500/30 font-mono text-xs select-none">+</div>
                    <div className="absolute top-2 right-2 text-amber-500/30 font-mono text-xs select-none">+</div>
                    <div className="absolute bottom-2 left-2 text-amber-500/30 font-mono text-xs select-none">+</div>
                    <div className="absolute bottom-2 right-2 text-amber-500/30 font-mono text-xs select-none">+</div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-300 border border-amber-400/30 mb-3 tracking-wider">
                      Architectural Unit Schedule
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Official floor plan available on request.
                    </h4>

                    <p className="text-xs sm:text-sm font-bold text-amber-400 mt-1">
                      {activePlanTab === "compact"
                        ? "Compact 3 BHK (~1,550 - 1,575 Sq.Ft.)"
                        : activePlanTab === "standard"
                        ? "Standard 3 BHK Luxury Residence (~1,655 - 1,830 Sq.Ft.)"
                        : activePlanTab === "large"
                        ? "Large 3 BHK Luxury Residence (~1,830 - 1,965 Sq.Ft.)"
                        : "Spacious Premium 3 BHK (~2,048 - 2,205 Sq.Ft.)"}
                    </p>

                    <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                      Approved architectural unit layouts, precise room measurements, and tower allocations are released directly by Candeur Constructions on request. Connect with our Kukatpally project advisor to receive verified layout sheets.
                    </p>

                    <div className="pt-3">
                      <Button
                        onClick={() => setBrochureModalOpen(true)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 py-2 rounded-xl shadow-lg inline-flex items-center gap-1.5"
                      >
                        <Download size={14} /> Request Official Floor Plan
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mt-5 pt-4 border-t border-slate-800">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Facing</span>
                        <span className="font-bold text-white">East / West</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Configuration</span>
                        <span className="font-bold text-white">3 BHK</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Bathrooms</span>
                        <span className="font-bold text-white">
                          {activePlanTab === "compact" ? "2 - 3 Baths" : "3 Baths"}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Balcony</span>
                        <span className="font-bold text-white">Courtyard Facing</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-400/30">
                    Configuration Band
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {activePlanTab === "compact"
                      ? "Compact 3 BHK (~1,550 - 1,575 Sft)"
                      : activePlanTab === "standard"
                      ? "Standard 3 BHK (~1,655 - 1,830 Sft)"
                      : activePlanTab === "large"
                      ? "Large 3 BHK (~1,830 - 1,965 Sft)"
                      : "Premium 3 BHK (~2,048 - 2,205 Sft)"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activePlanTab === "compact"
                      ? "A smart, efficient 3 BHK layout designed for families seeking a 3-bedroom setup at an optimized starting budget in Kukatpally."
                      : activePlanTab === "standard"
                      ? "The most popular 3 BHK format featuring balanced room dimensions, cross-ventilated living areas, and private family dining spaces."
                      : activePlanTab === "large"
                      ? "A spacious 3 BHK option offering enhanced master bedroom dimensions, expansive balcony views, and dedicated foyer entry."
                      : "The flagship large-format 3 BHK offering sprawling living halls, walk-in wardrobe spaces, and unhindered vistas across the central green park."}
                  </p>

                  <div className="border-t border-slate-800 pt-3 space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Starting Price:</span>
                      <strong className="text-amber-400">{PROJECT_CONFIG.startingPrice}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">RERA Status:</span>
                      <strong className="text-emerald-400">TG RERA Registered</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Possession:</span>
                      <strong className="text-slate-300">Sept 2031 (RERA Target)</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setBrochureModalOpen(true)}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-lg shadow"
                  >
                    Request Latest Price & Floor Plans
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE CLUBHOUSE SPOTLIGHT (~1.35 LAKH SQ.FT.) */}
      <section id="clubhouse" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 border border-amber-400/40 text-amber-300">
                1.35 LAKH SFT MULTI-LEVEL CLUBHOUSE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                One of Kukatpally’s Largest Private Clubhouses
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                The centerpiece of Candeur Arbora is its <strong>~1.35 lakh sq.ft. multi-level clubhouse</strong>. Built with contemporary glass architecture and landscaped terrace greenery, it offers a world-class wellness, sports, and social lifestyle hub directly beside the swimming pool.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                {[
                  "Multi-Level Air-Conditioned Clubhouse",
                  "Resort Swimming Pool with Poolside Deck",
                  "Indoor Badminton & Squash Courts",
                  "Equipped Gymnasium & Aerobics Studio",
                  "Banquet Hall with Dining & Party Lawn",
                  "Executive Co-Working Hub & Meeting Rooms",
                  "Indoor Board Games, Table Tennis & Billiards",
                  "Wellness Spa, Steam & Salon Provision",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors shadow-lg"
                >
                  <MessageCircle size={15} /> Inquire About Clubhouse Amenities
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                onClick={() => setSelectedImage(arboraHeroClubhouse)}
                className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-900 group cursor-zoom-in"
              >
                <img
                  src={arboraHeroClubhouse}
                  alt="Candeur Arbora iconic 1.35 lakh sq.ft. multi-level clubhouse with swimming pool and G+25 towers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-left">
                  <div className="text-xs font-bold text-white">Architectural Glass Facade with Green Terraces</div>
                  <p className="text-[11px] text-slate-300">
                    Directly connected to the swimming pool, sports courts, and 4.3-acre central courtyard.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 50+ PLANNED AMENITIES */}
      <section id="amenities" className="py-12 sm:py-16 bg-slate-950 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Unmatched Lifestyle</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
              50+ Planned Lifestyle Amenities
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
              Featuring 30+ open-air courtyard facilities spread across the ~4.3-acre linear central green park and extensive indoor sports, leisure, and co-working hubs inside the ~1.35 lakh sq.ft. multi-level clubhouse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenityCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-amber-500/40 transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white mb-3">{cat.category}</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <Check className="text-amber-400 flex-shrink-0 mt-0.5" size={13} />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONSTRUCTION SPECIFICATIONS */}
      <section id="specifications" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Engineering Standards</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
              Construction Specifications & Material Standards
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Grade-A construction benchmarks subject to final developer technical schedules.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Desktop Spec Tabs */}
            <div className="flex justify-center gap-2 mb-6 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1">
              {specificationsData.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveSpecTab(spec.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                    activeSpecTab === spec.id
                      ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {spec.icon}
                  <span>{spec.title}</span>
                </button>
              ))}
            </div>

            {/* Spec Card Display */}
            {specificationsData
              .filter((s) => s.id === activeSpecTab)
              .map((spec) => (
                <div key={spec.id} className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-extrabold text-base border-b border-slate-800 pb-3">
                    {spec.icon}
                    <h3>{spec.title}</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {spec.details.map((detail, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                        <span className="text-[11px] font-bold text-amber-300 block mb-1 uppercase tracking-wider">
                          {detail.label}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">{detail.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION ADVANTAGE & MAP */}
      <section id="location" className="py-12 sm:py-16 bg-slate-950 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Strategic Address</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
              Prime Kukatpally Location with HITEC City Proximity
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Located off Green Hills Road near IDL Lake and Rainbow Vistas, Candeur Arbora provides convenient commuting to Cyber Towers, KPHB Colony, Moosapet Metro, and Outer Ring Road.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Cols: Proximity Transit Matrix */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-2"><Compass size={16} /> Distance & Transit Guide</span>
                  <span className="text-[10px] text-slate-400 font-normal normal-case">Off-peak estimates</span>
                </div>
                <div className="divide-y divide-slate-800/80 text-xs">
                  {locationDistances.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block">{item.place}</span>
                        <span className="text-[10px] text-slate-400">{item.category} • {item.distance}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 font-extrabold text-xs border border-amber-500/20 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                  <AlertCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    *Note: Distances are verified road navigation estimates via Green Hills Road and Kukatpally arterial routes. Travel times are approximate off-peak estimates and will vary depending on peak hour traffic conditions, weather, and traffic signal delays.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Google Maps Embed & Address Box */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl h-[340px] sm:h-[400px]">
                <iframe
                  title="Candeur Arbora Kukatpally Location Map"
                  src="https://www.google.com/maps?q=IDL+Lake+Kukatpally+Hyderabad&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter invert-[0.88] hue-rotate-180 brightness-[0.95] contrast-[1.1]"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                  <MapPin size={16} className="text-amber-400" /> Site Address:
                </div>
                <p className="leading-relaxed text-slate-300">
                  {PROJECT_CONFIG.address}
                </p>
                <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-400">
                  <span>Telangana RERA: <strong>P02200011362 & P02200011363</strong></span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE PHOTO LIGHTBOX GALLERY */}
      <section id="gallery" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Official Renders</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
                Candeur Arbora Project Visuals
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Official renders of the 20-acre master township, grand clubhouse, and landscaped open courtyard.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All Visuals" },
                { id: "clubhouse", label: "Clubhouse" },
                { id: "landscape", label: "Landscape & Park" },
                { id: "sports", label: "Sports & Kids" },
                { id: "masterplan", label: "Master Plan" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveGalleryFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    activeGalleryFilter === f.id
                      ? "bg-amber-500 text-slate-950 font-extrabold"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img.src)}
                className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-950/80 text-amber-300 border border-slate-700">
                    {img.tag}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <div className="text-xs font-bold text-white line-clamp-1">{img.title}</div>
                  <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">{img.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. DEVELOPER PROFILE: CANDEUR CONSTRUCTIONS */}
      <section id="developer" className="py-12 sm:py-16 bg-slate-950 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-slate-900/90 border border-amber-500/20 shadow-xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 border border-amber-400/40 text-amber-300">
                  DEVELOPER PROFILE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Candeur Constructions</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Candeur Constructions is a regional real estate developer with residential high-rise communities across Hyderabad and Bengaluru. Established in key urban growth corridors, Candeur's portfolio in Hyderabad includes Candeur Crescent (Gachibowli), Candeur Skyline (Financial District), Candeur Eternia (Bachupally), and Candeur Lakescape (Kondapur).
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <span className="px-3 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                    Candeur Crescent (Gachibowli)
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                    Candeur Skyline (Financial District)
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                    Candeur Eternia (Bachupally)
                  </span>
                  <span className="px-3 py-1 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                    Candeur Lakescape (Kondapur)
                  </span>
                </div>
              </div>
              <div className="lg:col-span-4 p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <ShieldCheck size={36} className="text-amber-400 mx-auto" />
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-300 border border-amber-400/30">
                  Independent Advisory
                </span>
                <div className="text-sm font-bold text-white">Naani Projects Advisory</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Naani Projects is an independent real estate discovery and advisory platform. We assist homebuyers with verified TG RERA documentation, site visit coordination, and direct developer pricing with zero brokerage.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-extrabold hover:underline pt-1"
                >
                  <MessageCircle size={14} /> Connect with our property advisor for project details and assistance
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS (FAQ SECTION) */}
      <section id="faqs" className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Buyer Insights</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Frequently Asked Questions: Candeur Arbora
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Everything you need to know about the location, pricing, RERA approval, and handover timeline.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "Where exactly is Candeur Arbora located in Kukatpally?",
                a: "Candeur Arbora is situated off Green Hills Road in Kukatpally, Hyderabad, near IDL Lake and directly opposite Rainbow Vistas. It provides direct road connectivity to Moosapet Metro (approx. 5-7 mins), KPHB Colony (approx. 7-10 mins), and HITEC City / Cyber Towers (approx. 15-20 mins, traffic dependent).",
              },
              {
                q: "What is the starting price of apartments at Candeur Arbora?",
                a: "Pricing starts provisionally from ₹1.3 Cr onwards for 3 BHK luxury residences. Base pre-launch rates are subject to developer confirmation, floor rise, premium facing, and applicable taxes. Contact Naani Projects on WhatsApp (+91 94939 43946) for the latest developer-confirmed price list.",
              },
              {
                q: "What configurations and sizes are available at Candeur Arbora?",
                a: "Candeur Arbora exclusively offers 3 BHK luxury residences across 4 size bands: Compact 3 BHK (~1,550-1,575 sq.ft.), Standard 3 BHK (~1,655-1,830 sq.ft.), Large 3 BHK (~1,830-1,965 sq.ft.), and Premium 3 BHK (~2,048-2,205 sq.ft.).",
              },
              {
                q: "Is Candeur Arbora RERA registered?",
                a: "Yes. Candeur Arbora is registered under Telangana State Real Estate Regulatory Authority (TG RERA) with registration numbers P02200011362 and P02200011363.",
              },
              {
                q: "What makes the clubhouse and open spaces unique?",
                a: "The project spans ~20 acres of prime land, dedicating over 4.3 acres to a continuous linear central open courtyard (~75% open space). It also features an iconic ~1.35 lakh sq.ft. multi-level clubhouse with an expansive swimming pool, sports courts, banquet facilities, and co-working suites.",
              },
              {
                q: "When is the possession scheduled for Candeur Arbora?",
                a: "The registered TG RERA completion date is September 2031. The project is currently in the pre-launch / early construction phase.",
              },
              {
                q: "Do buyers pay any commission or brokerage to Naani Projects?",
                a: "No. Naani Projects provides 100% free advisory, verified documentation, project walkthroughs, and direct developer pricing for all homebuyers.",
              },
            ].map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-slate-900/90 border border-slate-800 rounded-xl px-5 py-1"
              >
                <AccordionTrigger className="text-left text-xs sm:text-sm font-bold text-white hover:text-amber-400 py-3.5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-300 leading-relaxed pb-3.5 border-t border-slate-800/60 pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 13. RERA DISCLAIMER STRIP */}
      <section className="py-6 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-400 px-4">
        <div className="max-w-5xl mx-auto space-y-1">
          <p>
            <strong>Disclaimer:</strong> Naani Projects is an independent real estate property discovery and advisory platform. All project details, specifications, floor plans, and pricing for <strong>Candeur Arbora</strong> are based on publicly registered TG RERA filings (Reg: <strong>P02200011362 & P02200011363</strong>) and marketing materials. Subject to change by the developer without prior notice.
          </p>
          <p className="text-slate-400">
            For official project verification, visit the Telangana RERA web portal: <span className="text-slate-300">rera.telangana.gov.in</span>.
          </p>
        </div>
      </section>

      {/* 14. MOBILE STICKY BOTTOM BAR (Call, WhatsApp, Get Price) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090D16]/95 backdrop-blur-xl border-t border-amber-500/30 p-2.5 grid grid-cols-3 gap-2 shadow-2xl">
        <a
          href={`tel:${PROJECT_CONFIG.phone}`}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 active:scale-95 transition-transform"
        >
          <Phone size={16} className="text-amber-400" />
          <span className="text-[10px] font-bold mt-0.5">Call</span>
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-emerald-600 text-white font-extrabold active:scale-95 transition-transform shadow"
        >
          <MessageCircle size={16} />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </a>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black active:scale-95 transition-transform shadow"
        >
          <Sparkles size={16} />
          <span className="text-[10px] font-extrabold mt-0.5">Request Price</span>
        </button>
      </div>

      {/* 15. HONEST BROCHURE REQUEST MODAL (No False Promises, Direct WhatsApp Assistance) */}
      <Dialog open={brochureModalOpen} onOpenChange={setBrochureModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#090D16] text-white border border-amber-500/30 p-6 pt-8 gap-3 shadow-2xl rounded-2xl">
          <DialogTitle className="sr-only">Request Candeur Arbora Project Information</DialogTitle>
          <DialogClose
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 transition-colors border border-amber-500/30"
          >
            <X size={16} strokeWidth={2.5} />
          </DialogClose>

          <div className="text-center space-y-1.5 mb-2">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-1">
              {brochureSuccess ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <Download className="w-6 h-6" />}
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {brochureSuccess ? "Request Acknowledged!" : "Candeur Arbora Project Details"}
            </h3>
            <p className="text-xs text-slate-300">
              {brochureSuccess
                ? "Your request has been registered. Our advisor is ready to assist you on WhatsApp."
                : "The official public brochure is awaiting final developer release. Leave your number to receive verified materials on WhatsApp as soon as they become available."}
            </p>
          </div>

          {brochureSuccess ? (
            <div className="space-y-4 pt-1 text-center">
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold leading-relaxed">
                ✅ Success! We have registered your request. For immediate assistance with pricing sheets and layout details, connect directly on WhatsApp:
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-colors"
              >
                <MessageCircle size={16} /> Open WhatsApp Chat with Advisor
              </a>
            </div>
          ) : (
            <form onSubmit={handleBrochureSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={brochureFormData.fullName}
                  onChange={(e) => setBrochureFormData({ ...brochureFormData, fullName: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Mobile Number <span className="text-amber-400">*</span> (10 Digits)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={brochureFormData.mobileNumber}
                    onChange={(e) =>
                      setBrochureFormData({ ...brochureFormData, mobileNumber: e.target.value.replace(/\D/g, "") })
                    }
                    className="w-full h-10 pl-11 pr-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer pt-0.5">
                <input
                  type="checkbox"
                  checked={brochureFormData.consent}
                  onChange={(e) => setBrochureFormData({ ...brochureFormData, consent: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-0 accent-amber-500"
                />
                <span>I agree to be contacted via WhatsApp/Call regarding Candeur Arbora Kukatpally.</span>
              </label>

              {brochureError && (
                <p className="text-[11px] text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg flex items-center gap-1.5">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{brochureError}</span>
                </p>
              )}

              <Button
                type="submit"
                disabled={brochureSubmitting}
                className="w-full h-10 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow transition-all"
              >
                {brochureSubmitting ? "Submitting..." : "Request Latest Price & Floor Plans"}
              </Button>

              <div className="text-center pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <MessageCircle size={12} /> Or connect immediately on WhatsApp
                </a>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 16. FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-slate-950/95 border-amber-500/30 p-2 sm:p-4 text-white">
          <DialogTitle className="sr-only">Candeur Arbora High-Resolution Render</DialogTitle>
          <DialogClose
            aria-label="Close image"
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-900/90 text-amber-400 border border-amber-500/30 hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </DialogClose>
          {selectedImage && (
            <div className="relative max-h-[85vh] flex items-center justify-center p-2">
              <img
                src={selectedImage}
                alt="Candeur Arbora High Resolution Render"
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandeurArboraPage;
