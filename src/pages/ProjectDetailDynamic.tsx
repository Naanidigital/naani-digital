import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import {
  MapPin, Phone, MessageCircle, Calendar, Building2, Home, Sparkles,
  CheckCircle2, ArrowRight, Download, Star,
} from "lucide-react";
import { fetchProjectBySlug, fetchProjects, projectPath, type DBProject } from "@/lib/projectsApi";
import { useLeadPopup } from "@/hooks/useLeadPopup";
import BrochureGateModal from "@/components/BrochureGateModal";

const PHONE = "+919493943946";
const WA = (msg: string) => `https://wa.me/919493943946?text=${encodeURIComponent(msg)}`;

interface ProjectDetailDynamicProps {
  slugOverride?: string;
}

const getFallbackProject = (slug: string): DBProject => {
  if (slug.includes("candeur-arbora")) {
    return {
      id: "candeur-arbora",
      slug: "candeur-arbora",
      name: "Candeur Arbora",
      builder: "Candeur Constructions",
      location: "Kukatpally",
      city: "Hyderabad",
      configuration: "3 BHK Luxury High-Rise Residences (1,550 - 2,205 Sq.Ft.)",
      bhk_list: [3],
      property_type: "Apartment",
      price_range: "₹1.3 Cr Onwards (Subject to Developer Confirmation)",
      min_price_inr: 13000000,
      max_price_inr: 22000000,
      status: "Pre-Launch",
      possession: "September 2031",
      usp: "20 Acres · Multiple Towers (G+25) · 1.35 Lakh Sq.Ft. Clubhouse · ~4.3 Acres Central Courtyard · Near IDL Lake",
      description: "Candeur Arbora is a luxury high-rise gated community spread across 20 acres off Green Hills Road, Kukatpally, Hyderabad. It features G+25 residential towers, a grand 1.35 lakh sq.ft. multi-level clubhouse, ~4.3 acres of open central courtyard, and premium 3 BHK residences across 4 size bands (~1,550 to ~2,205 sq.ft.) near HITEC City and KPHB Metro.",
      amenities: ["1.35 Lakh Sq.Ft. Clubhouse", "4.3-Acre Central Courtyard", "Swimming Pool & Deck", "Gymnasium & Fitness Studio", "Open-Air Amphitheater", "Kids Adventure Playground", "Outdoor Giant Chess", "Jogging Track", "Yoga & Meditation Lawns"],
      faqs: [
        { q: "Where is Candeur Arbora located?", a: "Candeur Arbora is located off Green Hills Road, Kukatpally, Hyderabad, near IDL Lake and opposite Rainbow Vistas, near Moosapet Metro and HITEC City." },
        { q: "What is the price of Candeur Arbora?", a: "Pricing starts provisionally from ₹1.3 Cr onwards for 3 BHK luxury residences, subject to developer confirmation." }
      ],
      gallery: [
        "/assets/candeur-arbora/hero-clubhouse.jpg",
        "/assets/candeur-arbora/aerial-masterview.jpg",
        "/assets/candeur-arbora/masterplan-layout.png",
        "/assets/candeur-arbora/swimming-pool.jpg",
        "/assets/candeur-arbora/central-park.jpg"
      ],
      hero_image: "/assets/candeur-arbora/hero-clubhouse.jpg",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=IDL+Lake+Kukatpally+Hyderabad&output=embed",
      seo_title: "Candeur Arbora Kukatpally Hyderabad | Luxury 3 BHK High-Rise Apartments",
      meta_description: "Explore Candeur Arbora in Kukatpally, Hyderabad. 20-acre luxury township with 1.35 lakh sft clubhouse and 4.3-acre central courtyard. Starting ₹1.3 Cr.",
      canonical_url: "https://www.naani.in/projects/candeur-arbora",
      custom_page_path: "/projects/candeur-arbora",
      featured: true,
    };
  }

  if (slug.includes("aparna-serenity")) {
    return {
      id: "f498449e-5735-4608-a796-1b9fddaa2939",
      slug: "aparna-serenity",
      name: "Aparna Serenity",
      builder: "Aparna Constructions",
      location: "Kompally",
      city: "Hyderabad",
      configuration: "2, 2.5, 3 & 4 BHK Luxury Residences (1,335 - 2,730 Sq.Ft.)",
      bhk_list: [2, 3, 4],
      property_type: "Apartment",
      price_range: "₹1.10 Cr – ₹2.50 Cr+",
      min_price_inr: 11000000,
      max_price_inr: 25000000,
      status: "Ready to Move",
      possession: "Ready to Move",
      usp: "22.45 Acres · 22 Towers (G+9 Mid-Rise) · 80% Open Greens · Zero Common Walls · Dual Clubhouses",
      description: "Aparna Serenity is a 22.45-acre ready-to-move luxury gated community crafted by Aparna Constructions in Brundavan Colony, Kompally, North Hyderabad. Features low-density G+9 mid-rise living, zero common walls, and dual resort clubhouses.",
      amenities: [
        "Club Serenity (34,700 Sq.Ft.)",
        "Dedicated Sports Complex (15,590 Sq.Ft.)",
        "All-Weather Indoor Swimming Pool",
        "Zero Common Walls (Acoustic Privacy)",
        "80% Open Green Landscaped Grounds",
        "Squash & Indoor Wooden Badminton Courts",
        "Commercial Plaza & On-Site Supermarket",
        "Crèche & Managed Daycare Center",
        "Dedicated Fenced Pet Park",
        "Water Softening (WSP) & Sewage Treatment (STP)"
      ],
      faqs: [
        { q: "What is Aparna Serenity?", a: "Aparna Serenity is an expansive 22.45-acre ready-to-move luxury residential community by Aparna Constructions in Brundavan Colony, Kompally, North Hyderabad." },
        { q: "Is Aparna Serenity RERA registered?", a: "Yes, registered under TS RERA No. P02200002386." },
        { q: "What is the price range?", a: "Indicative market pricing starts from ₹1.10 Cr to ₹2.50 Cr+ across 2, 2.5, 3 and 4 BHK configurations (~₹9,650+/sq.ft.)." }
      ],
      gallery: [
        "/og-aparna-serenity.jpg"
      ],
      hero_image: "/og-aparna-serenity.jpg",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Aparna+Serenity+Kompally+Hyderabad&output=embed",
      seo_title: "Aparna Serenity Kompally Hyderabad | Ready to Move 2, 3 & 4 BHK Flats",
      meta_description: "Aparna Serenity in Kompally, Hyderabad by Aparna Constructions. 22.45-acre luxury township with 80% open space, zero common walls, dual clubhouses & ready-to-move homes.",
      canonical_url: "https://www.naani.in/projects/aparna-serenity",
      custom_page_path: "/projects/aparna-serenity",
      featured: true,
    };
  }

  if (slug.includes("cybercity-stone-ridge")) {
    return {
      id: "cybercity-stone-ridge",
      slug: "cybercity-stone-ridge",
      name: "Cybercity Stone Ridge",
      builder: "Cybercity Builders & Developers Pvt. Ltd.",
      location: "Moosapet",
      city: "Hyderabad",
      configuration: "2, 3 & 4 BHK Luxury High-Rise Residences (1,300 - 3,805 Sq.Ft.)",
      bhk_list: [2, 3, 4],
      property_type: "Apartment",
      price_range: "₹1.08 Cr – ₹3.45 Cr",
      min_price_inr: 10800000,
      max_price_inr: 34500000,
      status: "Under Construction",
      possession: "2030-09",
      usp: "12.33 Acres · 6 Towers (25 & 27 Floors) · 66,000 Sft Clubhouse · 70%+ Open Spaces · Vehicle-Free Podium Deck",
      description: "Cybercity Stone Ridge is an under-construction luxury high-rise gated community developed by Cybercity Builders on Green Hills Road in Moosapet, near HITEC City, Hyderabad. Conceived by Hafeez Contractor with landscaping by CPG Asia.",
      amenities: [
        "Club Stone Ridge (66,000 Sq.Ft. / 6 Levels)",
        "1.5-Acre Central Park & Manicured Lawns",
        "1.2-Acre Rock Adventure Zone with Boulders Trail",
        "50-Meter Olympic Lap Pool & Splash Pools",
        "Vehicle-Free Ground Podium Deck",
        "Indoor Badminton & Squash Courts",
        "Tennis & Dedicated Pickleball Courts",
        "On-Site Supermarket, Pharmacy & Daycare",
        "Dedicated Fenced Pet Park",
        "Solar-Powered Entrance & Rainwater Harvesting"
      ],
      faqs: [
        { q: "What is Cybercity Stone Ridge?", a: "Cybercity Stone Ridge is a 12.33-acre luxury high-rise gated community on Green Hills Road, Moosapet, near HITEC City, featuring 6 towers and 1,424 apartments." },
        { q: "Is Cybercity Stone Ridge RERA registered?", a: "Yes, registered under TG RERA numbers P02200009747 and P02200009748." },
        { q: "What is the price range?", a: "Base prices range between ₹8,300 and ₹9,100 per sq. ft. Unit values range from ₹1.08 Cr – ₹1.21 Cr for 2 BHK, ₹1.60 Cr – ₹2.50 Cr for 3 BHK, and ₹2.73 Cr – ₹3.45 Cr for 4 BHK." }
      ],
      gallery: [
        "/og-cybercity-stone-ridge.jpg"
      ],
      hero_image: "/og-cybercity-stone-ridge.jpg",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Cybercity+Stone+Ridge+Moosapet+Hyderabad&output=embed",
      seo_title: "Cybercity Stone Ridge Moosapet Hyderabad | Luxury 2, 3 & 4 BHK Apartments",
      meta_description: "Cybercity Stone Ridge on Green Hills Road, Moosapet, near HITEC City, Hyderabad. 12.33 acres, 6 towers (25-27 floors), 66,000 sft clubhouse, 70%+ open spaces by Hafeez Contractor.",
      canonical_url: "https://www.naani.in/projects/cybercity-stone-ridge",
      custom_page_path: "/projects/cybercity-stone-ridge",
      featured: true,
    };
  }

  if (slug.includes("vasavi-atlantis")) {
    return {
      id: "vasavi-atlantis",
      slug: "vasavi-atlantis",
      name: "Vasavi Atlantis",
      builder: "Vasavi Group",
      location: "Narsingi",
      city: "Hyderabad",
      configuration: "2, 3, 3.5 & 4 BHK Ultra-High-Rise Residences (1,250 - 3,330 Sq.Ft.)",
      bhk_list: [2, 3, 4],
      property_type: "Apartment",
      price_range: "₹1.06 Cr – ₹3.16 Cr",
      min_price_inr: 10600000,
      max_price_inr: 31600000,
      status: "Under Construction",
      possession: "2028-08",
      usp: "12.3 Acres · 8 Towers (40-45 Floors) · Rare Twin Clubhouses · ~70% Open Space · Adjacent to ORR",
      description: "Vasavi Atlantis is a large-scale, ultra-high-rise luxury gated community developed by Vasavi Group in Narsingi, Hyderabad, positioned right off the Nehru Outer Ring Road near the Financial District.",
      amenities: [
        "Twin Clubhouse Complex (Dedicated North & South Hubs)",
        "Temperature-Controlled Indoor Pool & Resort Outdoor Pool",
        "Multiple High-Tech Gymnasiums & Yoga/Aerobics Studios",
        "Indoor Badminton & Squash Courts",
        "Lakefront Viewing Deck & Pedestrian Water Bridges",
        "Dedicated Business Center & Co-working Lounges",
        "Grand Banquet Hall & Party Lawns",
        "Open-Air Amphitheatre & Mini Private Theatre",
        "4 Basement Parking Levels with EV Charging",
        "100% DG Power Backup & Piped Gas Infrastructure"
      ],
      faqs: [
        { q: "What is Vasavi Atlantis?", a: "Vasavi Atlantis is a 12.3-acre ultra-high-rise gated community in Narsingi, Hyderabad, right off the Nehru Outer Ring Road near the Financial District, featuring 8 towers (40-45 floors) and ~2,199 apartments." },
        { q: "Is Vasavi Atlantis RERA approved?", a: "Yes, registered under TG RERA ID P02400003398." },
        { q: "What are the apartment sizes and prices?", a: "2 BHKs range from 1,250 to 1,310 sq. ft. (₹1.06 Cr – ₹1.25 Cr), 3 BHKs range from 1,610 to 2,220 sq. ft. (₹1.52 Cr – ₹2.10 Cr), and 3.5 & 4 BHKs range from 2,450 to 3,330 sq. ft. (₹2.30 Cr – ₹3.16 Cr)." }
      ],
      gallery: [
        "/og-vasavi-atlantis.jpg"
      ],
      hero_image: "/og-vasavi-atlantis.jpg",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Vasavi+Atlantis+Narsingi+Hyderabad&output=embed",
      seo_title: "Vasavi Atlantis Narsingi Hyderabad | Luxury 2, 3, 3.5 & 4 BHK High-Rise Apartments",
      meta_description: "Vasavi Atlantis in Narsingi, Hyderabad, off ORR near Financial District. 12.3 acres, 8 towers (40-45 floors), twin clubhouses, 70% open green space, RERA P02400003398.",
      canonical_url: "https://www.naani.in/projects/vasavi-atlantis",
      custom_page_path: "/projects/vasavi-atlantis",
      featured: true,
    };
  }

  if (slug.includes("pavani-starlit")) {
    return {
      id: "pavani-starlit-miyapur",
      slug: "pavani-starlit-miyapur",
      name: "Pavani Starlit",
      builder: "Sai Sravanthi Infra Projects Private Limited",
      location: "Miyapur",
      city: "Hyderabad",
      configuration: "2, 2.5 & 3 BHK Premium Residences (1,275 - 2,139 Sq.Ft.)",
      bhk_list: [2, 3],
      property_type: "Apartment",
      price_range: "Contact for Latest Price",
      min_price_inr: 0,
      max_price_inr: 0,
      status: "Under Construction",
      possession: "2029",
      usp: "~3 Acres · 3 Towers (G+10) · 45,000+ Sft Amenities · ~70% Open Space · Maqtha Mahaboobpet, Miyapur",
      description: "Pavani Starlit is a premium residential apartment community by Sai Sravanthi Infra Projects in Maqtha Mahaboobpet, Miyapur, Hyderabad. Featuring 2, 2.5 and 3 BHK homes across ~3 acres with 45,000+ sq. ft. of amenities.",
      amenities: [
        "Grand Clubhouse & Banquet Hall",
        "Modern Gymnasium & Yoga Pavilions",
        "Resort-Scale Swimming Pool & Kids Pool",
        "Dedicated Business Lounge & Co-Working Hub",
        "Indoor Games (Table Tennis, Billiards, Carrom)",
        "Landscaped Open Spaces & Walking Paths",
        "Children Play Areas & Outdoor Gazebos",
        "2-Level Basement Parking with EV Provisions",
        "100% DG Power Backup for Common Areas",
        "24/7 Security Surveillance & Access Control"
      ],
      faqs: [
        { q: "What is Pavani Starlit?", a: "Pavani Starlit is a ~3-acre premium residential community in Maqtha Mahaboobpet, Miyapur, Hyderabad, featuring 3 towers (G+10) with 2, 2.5 & 3 BHK homes." },
        { q: "Is Pavani Starlit RERA approved?", a: "Yes, registered with Telangana RERA under registration ID TG RERA P02400008769." },
        { q: "What is the expected possession timeline?", a: "Expected possession is scheduled for 2029 as per provisional disclosures." }
      ],
      gallery: [
        "/og-pavani-starlit.jpg"
      ],
      hero_image: "/og-pavani-starlit.jpg",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Miyapur+Hyderabad&output=embed",
      seo_title: "Pavani Starlit Miyapur | 2, 2.5 & 3 BHK Flats in Hyderabad",
      meta_description: "Explore Pavani Starlit Miyapur, Hyderabad. Discover spacious 2, 2.5 & 3 BHK apartments, project details, amenities, location and floor plans.",
      canonical_url: "https://www.naani.in/projects/pavani-starlit-miyapur",
      custom_page_path: "/projects/pavani-starlit-miyapur",
      featured: true,
    };
  }

  if (slug.includes("prestige-golden-grove")) {
    return {
      id: "prestige-golden-grove",
      slug: "prestige-golden-grove-hyderabad",
      name: "Prestige Golden Grove",
      builder: "Prestige Group",
      location: "Tellapur",
      city: "Hyderabad",
      configuration: "2, 3 & 4 BHK Luxury Apartments",
      bhk_list: [2, 3, 4],
      property_type: "Apartment",
      price_range: "₹93.5 Lakhs Onwards",
      min_price_inr: 9350000,
      max_price_inr: 20400000,
      status: "Pre-Launch",
      possession: "March 2030",
      usp: "28.7 Acres Development · 10 Towers · Near ORR Exit 2",
      description: "Prestige Golden Grove is a residential apartment project by Prestige Group spread across 28.7 acres in Tellapur, West Hyderabad. It offers 2, 3, and 4 BHK apartments with clubhouse facilities, open spaces, and access to ORR Exit 2.",
      amenities: ["Clubhouse Facilities", "Swimming Pool", "Fitness Center", "Jogging Track", "Tennis Court", "Play Area", "24/7 Security"],
      faqs: [
        { q: "What is Prestige Golden Grove Hyderabad?", a: "Prestige Golden Grove is a premium luxury apartment township by Prestige Group, spread across 28.7 acres in Tellapur, near Kollur, West Hyderabad. It features 10 high-rise towers (3P+52 floors) with 5,120 luxury apartments in 2, 3, and 4 BHK configurations." },
        { q: "Where is Prestige Golden Grove located?", a: "Located in Tellapur, near Kollur off ORR Exit 2, West Hyderabad, just 15 minutes from Gachibowli and HITEC City IT hubs." },
        { q: "What is the price of Prestige Golden Grove apartments?", a: "Prices start from ₹93.5 Lakhs for 2 BHK apartments up to ₹2.04 Crores for 4 BHK apartments." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200"
      ],
      hero_image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Tellapur+Hyderabad&output=embed",
      seo_title: "Prestige Golden Grove Tellapur Hyderabad | Luxury Apartments",
      meta_description: "Explore Prestige Golden Grove in Tellapur, Hyderabad. 2, 3 & 4 BHK luxury apartments by Prestige Group starting ₹93.5 Lakhs.",
      canonical_url: "https://www.naani.in/projects/prestige-golden-grove-hyderabad",
      custom_page_path: null,
      featured: true,
    };
  }

  if (slug.includes("tridasa-rise")) {
    return {
      id: "tridasa-rise",
      slug: "tridasa-rise",
      name: "Tridasa Rise",
      builder: "Tridasa Developers",
      location: "Nallagandla",
      city: "Hyderabad",
      configuration: "3 & 4 BHK Luxury Apartments",
      bhk_list: [3, 4],
      property_type: "Apartment",
      price_range: "₹1.45 Cr Onwards",
      min_price_inr: 14500000,
      max_price_inr: 28000000,
      status: "Under Construction",
      possession: "December 2027",
      usp: "10.38 Acres · IGBC Gold Rated · 55,000 sq.ft. Clubhouse",
      description: "Tridasa Rise is a premium high-rise gated community in Nallagandla offering 3 and 4 BHK luxury residences. Built with IGBC Gold green building certification, it features a 55,000 sq.ft. clubhouse, temperature-controlled pool, and 5-minute access to Gachibowli Financial District.",
      amenities: ["55,000 sq.ft. Clubhouse", "Infinity Pool", "Squash Court", "Gym", "Landscaped Gardens"],
      faqs: [
        { q: "What is Tridasa Rise Nallagandla?", a: "Tridasa Rise is a luxury 3 and 4 BHK high-rise residential project spread across 10.38 acres in Nallagandla, Hyderabad." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
      ],
      hero_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Nallagandla+Hyderabad&output=embed",
      seo_title: "Tridasa Rise Nallagandla Hyderabad | Luxury 3 & 4 BHK Apartments",
      meta_description: "Explore Tridasa Rise in Nallagandla Hyderabad. Premium 3 & 4 BHK luxury apartments with 55k sqft clubhouse.",
      canonical_url: "https://www.naani.in/projects/tridasa-rise",
      custom_page_path: null,
      featured: true,
    };
  }

  if (slug.includes("brigade-gateway")) {
    return {
      id: "brigade-gateway-neopolis",
      slug: "brigade-gateway-neopolis-kokapet-hyderabad",
      name: "Brigade Gateway Neopolis",
      builder: "Brigade Group",
      location: "Kokapet",
      city: "Hyderabad",
      configuration: "3 & 4 BHK Sky Residences",
      bhk_list: [3, 4],
      property_type: "Apartment",
      price_range: "₹2.10 Cr Onwards",
      min_price_inr: 21000000,
      max_price_inr: 45000000,
      status: "New Launch",
      possession: "December 2028",
      usp: "Kokapet Neopolis SEZ · 45-Story Skyscrapers · Infinity Sky Pool",
      description: "Brigade Gateway Neopolis is a signature ultra-luxury skyscraper development by Brigade Group located in Neopolis, Kokapet. Featuring 3 and 4 BHK sky residences with expansive balconies, private lift lobbies, sky lounge, and panoramic views of Kokapet lake.",
      amenities: ["Infinity Sky Pool", "Sky Lounge", "Private Lift Lobbies", "Concierge Service"],
      faqs: [
        { q: "What is Brigade Gateway Neopolis?", a: "Brigade Gateway Neopolis is an ultra-luxury skyscraper apartment project by Brigade Group in Neopolis, Kokapet, Hyderabad." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"
      ],
      hero_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Kokapet+Neopolis+Hyderabad&output=embed",
      seo_title: "Brigade Gateway Neopolis Kokapet Hyderabad | Sky Villas",
      meta_description: "Brigade Gateway Neopolis in Kokapet, Hyderabad. Ultra-luxury 3 & 4 BHK sky residences by Brigade Group.",
      canonical_url: "https://www.naani.in/projects/brigade-gateway-neopolis-kokapet-hyderabad",
      custom_page_path: null,
      featured: true,
    };
  }

  if (slug.includes("canny-aravindam")) {
    return {
      id: "canny-aravindam",
      slug: "canny-aravindam",
      name: "Canny Aravindam",
      builder: "Canny Life Spaces",
      location: "Bowrampet",
      city: "Hyderabad",
      configuration: "2 & 3 BHK Luxury Apartments",
      bhk_list: [2, 3],
      property_type: "Apartment",
      price_range: "Price on Request",
      min_price_inr: null,
      max_price_inr: null,
      status: "Under Construction",
      possession: "December 2027",
      usp: "3 Acres · 3 Towers (G+9) · 5-Level Clubhouse · No Common Walls · Near ORR Exit 4A",
      description: "Canny Aravindam is a premium gated residential apartment community developed by Canny Life Spaces across 3 acres in Bowrampet, North-West Hyderabad. The project features 3 towers rising G+9 floors with 340 spacious 2 and 3 BHK apartments, 60% open spaces, no common walls, and a signature 5-level 17,000 sq.ft. clubhouse with 30+ lifestyle amenities.",
      amenities: [
        "5-Level Clubhouse (~17,000 sq.ft.)",
        "Swimming Pool & Kids Pool",
        "AC Gym",
        "Co-working Space",
        "Indoor Games",
        "Badminton Court",
        "Party Deck",
        "Kids Play Area",
        "Yoga Zone",
        "Rooftop Garden",
        "2-Level Parking",
        "24/7 Security",
      ],
      faqs: [
        { q: "What is Canny Aravindam?", a: "Canny Aravindam is a luxury 2 and 3 BHK gated community in Bowrampet, Hyderabad, spanning 3 acres with 3 towers (G+9), 340 flats, and a 5-level clubhouse." },
        { q: "Where is Canny Aravindam located?", a: "Canny Aravindam is situated in Bowrampet, Hyderabad, near ORR Exit 4A, within ~30 minutes of Miyapur, Kukatpally, and HITEC City." },
        { q: "What configurations are available?", a: "Canny Aravindam offers 2 BHK flats (1,250–1,285 sq.ft.) and 3 BHK flats (1,505–2,300 sq.ft.) designed with no common walls." },
        { q: "What is the RERA registration number for Canny Aravindam?", a: "Canny Aravindam is TS RERA approved with registration number P02200007242." },
        { q: "What is the expected possession timeline?", a: "As per current official project schedules, expected possession is December 2027." },
        { q: "How can I enquire about price and availability?", a: "Pricing is available on request. Contact Naani Projects via WhatsApp or call +91 94939 43946 for official pricing and guided site visits." }
      ],
      gallery: [
        "/assets/canny-aravindam/canny-aravindam-elevation.jpg",
        "/assets/canny-aravindam/canny-aravindam-clubhouse.jpg",
        "/assets/canny-aravindam/canny-aravindam-brochure.png"
      ],
      hero_image: "/assets/canny-aravindam/canny-aravindam-elevation.jpg",
      brochure_url: null,
      map_embed_url: "https://www.google.com/maps?q=Bowrampet+Hyderabad&output=embed",
      seo_title: "Canny Aravindam, Bowrampet | 2 & 3 BHK Flats",
      meta_description: "Explore Canny Aravindam in Bowrampet, Hyderabad. View 2 and 3 BHK apartment details, amenities, floor plans and RERA information.",
      canonical_url: "https://www.naani.in/projects/canny-aravindam",
      custom_page_path: "/projects/canny-aravindam",
      featured: true,
    };
  }

  const title = slug
    .replace(/-hyderabad$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: slug,
    slug: slug,
    name: title,
    builder: title.split(" ")[0] || "Naani Partner Builder",
    location: "Hyderabad",
    city: "Hyderabad",
    configuration: "2, 3 & 4 BHK Apartments",
    bhk_list: [2, 3, 4],
    property_type: "Apartment",
    price_range: "Price on Request",
    min_price_inr: 10000000,
    max_price_inr: 25000000,
    status: "RERA Approved",
    possession: "2027-12",
    usp: "Gated Community · Premium Amenities · Prime Location Connectivity",
    description: `${title} is a premier residential property development in Hyderabad offering modern amenities, spacious floor plans, and exceptional connectivity to major IT corridors, top schools, and shopping centers.`,
    amenities: ["Clubhouse", "Swimming Pool", "Fitness Center", "Landscaped Gardens", "24/7 Security"],
    faqs: [
      { q: `What is ${title}?`, a: `${title} is a verified luxury residential project in Hyderabad offering premium apartments and modern lifestyle amenities.` }
    ],
    gallery: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200"],
    hero_image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
    brochure_url: null,
    map_embed_url: "https://www.google.com/maps?q=Hyderabad&output=embed",
    seo_title: `${title} | Premium Real Estate Hyderabad`,
    meta_description: `Discover ${title} in Hyderabad. Explore floor plans, prices, location benefits and amenities with Naani Projects.`,
    canonical_url: `https://www.naani.in/projects/${slug}`,
    custom_page_path: null,
    featured: true,
  };
};

const ProjectDetailDynamic = ({ slugOverride }: ProjectDetailDynamicProps = {}) => {
  const params = useParams<{ slug: string }>();
  const slug = slugOverride || params.slug;
  const navigate = useNavigate();
  const [project, setProject] = useState<DBProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [nearby, setNearby] = useState<DBProject[]>([]);
  const [byBuilder, setByBuilder] = useState<DBProject[]>([]);
  const [byBudget, setByBudget] = useState<DBProject[]>([]);
  const [brochureGateOpen, setBrochureGateOpen] = useState(false);
  const { open, setOpen, source, projectName, openPopup } = useLeadPopup();

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        let p: DBProject | null = null;
        try {
          p = await fetchProjectBySlug(slug);
        } catch {
          p = null;
        }

        if (!p) {
          p = getFallbackProject(slug);
        }

        if (!mounted) return;
        if (p?.custom_page_path && typeof window !== "undefined" && window.location.pathname !== p.custom_page_path) {
          navigate(p.custom_page_path, { replace: true });
          return;
        }
        setProject(p);
        setLoading(false);

        // Fetch related items safely in background
        try {
          const all = await fetchProjects();
          if (!mounted) return;
          const others = (all || []).filter(x => x.id !== p!.id);
          setNearby(others.filter(x => x.location === p!.location).slice(0, 6));
          setByBuilder(others.filter(x => x.builder && x.builder === p!.builder).slice(0, 6));
        } catch {
          // Ignore related projects fetch error
        }
      } catch {
        if (!mounted) return;
        const fallback = getFallbackProject(slug);
        setProject(fallback);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);

  // Auto popup after 6s
  useEffect(() => {
    if (!project) return;
    const t = setTimeout(() => openPopup("Auto Popup", project.name), 6000);
    return () => clearTimeout(t);
  }, [project, openPopup]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-20 space-y-6">
        <Skeleton className="h-[40vh] w-full rounded-2xl" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid md:grid-cols-3 gap-4">
          <Skeleton className="h-40" /><Skeleton className="h-40" /><Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-foreground mb-3">Project not found</h1>
        <p className="text-muted-foreground mb-6 font-medium">We couldn't find this project. Browse all projects below.</p>
        <Link to="/projects" className="text-primary hover:underline font-bold">View all projects →</Link>
      </div>
    );
  }

  const waMsg = `Hi, I'm interested in ${project.name} (${project.location || 'Hyderabad'}). Please share details.`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in/" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
      { "@type": "ListItem", position: 3, name: project.name, item: project.canonical_url ?? `https://www.naani.in/projects/${project.slug}` },
    ],
  };
  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.description || "",
    url: project.canonical_url || `https://www.naani.in/projects/${project.slug}`,
    image: project.gallery && project.gallery.length ? project.gallery : [project.hero_image || ""],
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location || "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    ...(project.min_price_inr
      ? {
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: String(project.min_price_inr),
          url: project.canonical_url ?? `https://www.naani.in/projects/${project.slug}`,
          availability: "https://schema.org/InStock",
        },
      }
      : {}),

    brand: { "@type": "Organization", name: project.builder ?? "Naani Projects" },
  };
  const faqSchema = project.faqs && project.faqs.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: project.faqs.map((f: any) => ({
      "@type": "Question",
      name: f.question || f.q || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer || f.a || "",
      },
    })),
  } : null;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Naani Projects",
    image: "https://www.naani.in/naani-projects-og.jpg",
    url: "https://www.naani.in/projects",
    telephone: "+91-9493943946",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kondapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500084",
      addressCountry: "IN",
    },
    areaServed: project.location ? `${project.location}, Hyderabad` : "Hyderabad",
    sameAs: [
      "https://www.instagram.com/naaniprojects/",
      "https://www.facebook.com/NaaniProjects/",
      "https://www.youtube.com/@NaaniProjects",
    ],
  };

  const heroImg = project.hero_image || (project.gallery && project.gallery[0]) || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600";

  return (
    <>
      <SEOHead
        title={project.seo_title || `${project.name} ${project.location} | Naani Projects`}
        description={project.meta_description || project.description?.slice(0, 160) || `${project.name} by ${project.builder} in ${project.location}.`}
        canonicalUrl={project.canonical_url ?? `https://www.naani.in/projects/${project.slug}`}
        ogImage={heroImg}
        structuredData={{ "@context": "https://schema.org", "@graph": [breadcrumbSchema, realEstateSchema, localBusinessSchema, faqSchema].filter(Boolean) }}
      />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-end pt-20 bg-background">
        <div className="absolute inset-0">
          <img src={heroImg} alt={`${project.name} - ${project.property_type} in ${project.location}`} className="w-full h-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pb-16 relative z-10">
          <nav aria-label="breadcrumb" className="text-xs font-semibold text-slate-300 mb-4 flex items-center gap-1">
            <Link to="/" className="hover:text-amber-400">Home</Link> / <Link to="/projects" className="hover:text-amber-400">Projects</Link> / <span className="text-amber-400 font-bold">{project.name}</span>
          </nav>
          {project.status && (
            <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-extrabold px-4 py-1.5 rounded-full mb-3 shadow-md">{project.status}</span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3">{project.name}</h1>
          {project.builder && <p className="text-lg text-slate-200 font-medium mb-2">by <span className="text-amber-400 font-bold">{project.builder}</span></p>}
          <p className="flex items-center gap-2 text-slate-200 font-semibold mb-6"><MapPin size={20} className="text-amber-400" /> {project.location}, {project.city}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-8">
            <div className="glass-card p-4 text-center">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Configuration</p>
              <p className="font-extrabold text-white text-base md:text-lg mt-1">{project.configuration || "—"}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Starting Price</p>
              <p className="font-extrabold text-amber-400 text-base md:text-lg mt-1">{project.price_range || "On Request"}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Possession</p>
              <p className="font-extrabold text-white text-base md:text-lg mt-1">{project.possession?.slice(0, 7) || "TBA"}</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Property Type</p>
              <p className="font-extrabold text-white text-base md:text-lg mt-1">{project.property_type}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 w-full">
            <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" className="whatsapp-btn bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              <MessageCircle size={20} /> WhatsApp Now
            </a>
            <a href={`tel:${PHONE}`} className="call-btn bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              <Phone size={20} /> Call Now
            </a>
            <Button onClick={() => openPopup("Hero Site Visit", project.name)} className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              <Calendar size={20} /> Book Site Visit
            </Button>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-16 bg-background">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-extrabold text-foreground flex items-center gap-3"><Sparkles className="text-primary" /> About {project.name}</h2>
            <p className="text-muted-foreground leading-relaxed font-medium text-base md:text-lg glass-card p-8">{project.description}</p>
            {project.usp && (
              <div className="bg-card border-l-4 border-primary p-5 rounded-2xl shadow-md border border-border/40">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Project Highlight / USP</p>
                <p className="text-white font-semibold text-base md:text-lg mt-1">{project.usp}</p>
              </div>
            )}
          </div>
          <aside className="glass-card p-8 space-y-4 h-fit sticky top-24 shadow-xl">
            <h3 className="font-extrabold text-white text-xl">Get Best Exclusive Offer</h3>
            <p className="text-xs text-slate-300 font-medium">Limited inventory available. Direct pre-launch pricing.</p>
            <Button onClick={() => openPopup("Sidebar Enquiry", project.name)} className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold h-12 shadow-md hover:from-amber-600 hover:to-yellow-600">Enquire Now</Button>
            <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" className="whatsapp-btn w-full h-12 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md"><MessageCircle size={18} /> WhatsApp</a>
            <a href={`tel:${PHONE}`} className="call-btn w-full h-12 inline-flex items-center justify-center gap-2 bg-slate-900 border border-amber-500/40 text-amber-400 font-bold rounded-xl shadow-md hover:bg-slate-800"><Phone size={18} /> Call +91 94939 43946</a>
          </aside>
        </div>
      </section>

      {/* RICH SEO CONTENT — Builder · Connectivity · Lifestyle · Investment */}
      <section className="py-16 bg-card/40 border-y border-border/40">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 grid md:grid-cols-2 gap-8">
          <article className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Building2 className="text-amber-400" size={24} /> About the Builder</h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              {project.builder ? `${project.builder} is among Hyderabad's trusted real estate developers, recognised for delivering RERA-compliant projects with quality construction, on-time possession and lasting buyer value. ${project.name} reflects the developer's commitment to premium design, modern amenities and thoughtful planning across ${project.location}.` : `${project.name} is developed by a reputed Hyderabad builder with a strong track record of timely possession and quality construction.`}
            </p>
          </article>

          <article className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><MapPin className="text-amber-400" size={24} /> Connectivity &amp; Nearby Landmarks</h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              {project.location} enjoys seamless connectivity to HITEC City, Gachibowli Financial District, ORR and the upcoming metro corridor. Top schools, multi-speciality hospitals, malls and IT parks are within a short drive — making {project.name} a strategic choice for both end-users and investors.
            </p>
          </article>

          <article className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Sparkles className="text-amber-400" size={24} /> Lifestyle Benefits</h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              {project.name} offers a {project.property_type?.toLowerCase() || "premium"} lifestyle with {project.configuration ? `${project.configuration} layouts` : "spacious layouts"} crafted for modern families. Residents enjoy resort-style amenities, landscaped greens and a vibrant community designed for comfort, wellness and entertainment.
            </p>
          </article>

          <article className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Home className="text-amber-400" size={24} /> Why Invest in {project.name}</h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              {project.location} has shown consistent capital appreciation over the last 5 years driven by IT expansion, infrastructure upgrades and rising rental demand. {project.price_range ? `Starting at ${project.price_range},` : ""} {project.name} offers strong investment potential with {project.status?.toLowerCase().includes("ready") ? "ready-to-move inventory and immediate rental yield." : "pre-launch pricing advantage and high appreciation upside on possession."}
            </p>
          </article>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 bg-background">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <h2 className="text-3xl font-extrabold text-white mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.gallery.map((g, i) => (
                <img key={i} src={g} alt={`${project.name} gallery ${i + 1}`} loading="lazy" className="w-full h-72 object-cover rounded-2xl border border-amber-500/30 shadow-lg hover:scale-[1.02] transition-transform" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AMENITIES */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-16 bg-card/40 border-y border-border/40">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
            <h2 className="text-3xl font-extrabold text-white mb-3">Project Amenities</h2>
            <p className="text-slate-300 font-medium mb-8">Everything you need for a luxury lifestyle.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {project.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 glass-card p-4">
                  <CheckCircle2 size={20} className="text-amber-400 shrink-0" />
                  <span className="text-sm font-bold text-white">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MID CTA - EQUAL SIZED BOXES */}
      <section className="py-14 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-slate-950 shadow-2xl">
        <div className="w-full px-4 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3">Want the Best Price for {project.name}?</h2>
          <p className="text-slate-900 mb-8 text-base md:text-lg font-bold max-w-3xl mx-auto">Talk to our property advisor — zero brokerage, instant floor plans on WhatsApp.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" className="whatsapp-btn bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              <MessageCircle size={20} /> WhatsApp
            </a>
            <Button onClick={() => setBrochureGateOpen(true)} className="bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg border border-amber-400/40 transition-all hover:scale-105">
              <Download size={20} /> Download Brochure
            </Button>
            <a href={`tel:${PHONE}`} className="call-btn bg-slate-950 hover:bg-slate-900 text-white font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg border border-slate-700 transition-all hover:scale-105">
              <Phone size={20} /> Call
            </a>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-16 bg-background">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-3xl font-extrabold text-white mb-3 flex items-center gap-3"><MapPin className="text-amber-400" /> Location Advantages</h2>
          <p className="text-slate-300 mb-8 font-medium text-base md:text-lg max-w-4xl">{project.location} is one of Hyderabad's fastest-growing residential corridors with excellent connectivity to IT hubs, schools, hospitals and entertainment zones.</p>
          <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl">
            <iframe
              title={`${project.name} location map`}
              src={project.map_embed_url || `https://www.google.com/maps?q=${encodeURIComponent((project.location ?? "") + ", Hyderabad")}&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      {project.faqs && project.faqs.length > 0 && (
        <section className="py-16 bg-card/40 border-y border-border/40">
          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-10">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {project.faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6">
                  <AccordionTrigger className="text-white font-bold text-left hover:text-amber-400 py-5 text-base md:text-lg">{f.question || f.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-300 font-medium leading-relaxed pb-5 text-base">{f.answer || f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* FINAL CTA SECTION - EQUAL SIZED BOXES */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto text-center glass-card p-10 sm:p-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-10 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            Experience elevated living at {project.name}. Discover spacious floor plans, premium amenities, and a vibrant community designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <button data-lead-gate="sitevisit" onClick={() => openPopup("Schedule Site Visit", project.name)} className="lead-btn bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openPopup("Get Latest Offers", project.name)} className="lead-btn bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-8">
            <a href={`tel:${PHONE}`} className="call-btn text-amber-400 hover:text-amber-300 font-extrabold text-xl transition-colors inline-flex items-center gap-2">
              <Phone size={22} /> Call Now: +91 94939 43946
            </a>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING — Nearby / Builder / Budget */}
      {(() => {
        const sections: { title: string; items: DBProject[]; icon: React.ReactNode }[] = [
          { title: `More Projects in ${project.location}`, items: nearby, icon: <MapPin className="text-amber-400" /> },
          ...(project.builder ? [{ title: `More by ${project.builder}`, items: byBuilder, icon: <Building2 className="text-amber-400" /> }] : []),
          { title: "Similar Budget Projects", items: byBudget, icon: <Star className="text-amber-400" /> },
        ].filter(s => s.items.length > 0);
        if (!sections.length) return null;
        return (
          <section className="py-16 bg-card/40 border-y border-border/40 space-y-12">
            {sections.map((sec) => (
              <div key={sec.title} className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 flex items-center gap-3">{sec.icon} {sec.title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sec.items.slice(0, 3).map((s) => (
                    <Link key={s.id} to={projectPath(s)} className="group glass-card overflow-hidden hover:-translate-y-1 transition-all">
                      <img src={s.hero_image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"} alt={`${s.name} — ${s.location}`} loading="lazy" className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                      <div className="p-5">
                        <h3 className="font-bold text-white text-lg group-hover:text-amber-400 transition-colors line-clamp-1">{s.name}</h3>
                        <p className="text-xs text-slate-300 font-medium mt-2"><MapPin size={14} className="inline text-amber-400" /> {s.location}{s.builder ? ` · ${s.builder}` : ""}</p>
                        <p className="text-sm font-extrabold text-amber-400 mt-2">{s.price_range || "On Request"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })()}

      {/* MOBILE STICKY BOTTOM CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/40 p-3 grid grid-cols-3 gap-2 shadow-2xl">
        <a href={`tel:${PHONE}`} className="call-btn flex flex-col items-center justify-center bg-card border border-primary/40 text-primary py-2.5 rounded-xl text-xs font-bold shadow-md"><Phone size={18} />Call</a>
        <a href={WA(waMsg)} target="_blank" rel="noopener noreferrer" className="whatsapp-btn flex flex-col items-center justify-center bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md"><MessageCircle size={18} />WhatsApp</a>
        <button onClick={() => openPopup("Sticky Bar", project.name)} className="flex flex-col items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 py-2.5 rounded-xl text-xs font-extrabold shadow-md"><Calendar size={18} />Visit</button>
      </div>

      <LeadCapturePopup open={open} onOpenChange={setOpen} source={source} projectName={projectName || project.name} />
      <BrochureGateModal open={brochureGateOpen} onOpenChange={setBrochureGateOpen} brochureUrl={project.brochure_url} projectName={project.name} />
      <ScrollTriggerPopup projectName={project.name} />
    </>
  );
};

export default ProjectDetailDynamic;
