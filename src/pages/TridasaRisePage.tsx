import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/tridasa/HeroSection";
import ProjectOverview from "@/components/tridasa/ProjectOverview";
import VideoSection from "@/components/tridasa/VideoSection";
import MasterPlan from "@/components/tridasa/MasterPlan";
import TowerPlans from "@/components/tridasa/TowerPlans";
import AmenitiesSection from "@/components/tridasa/AmenitiesSection";
import LocationSection from "@/components/tridasa/LocationSection";
import SpecificationsSection from "@/components/tridasa/SpecificationsSection";
import EnquiryPopup from "@/components/tridasa/EnquiryPopup";
import StickyContact from "@/components/tridasa/StickyContact";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";

import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";

const TridasaRisePage = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySource, setEnquirySource] = useState("General Enquiry");

  const openEnquiry = (source: string) => {
    setEnquirySource(source);
    setEnquiryOpen(true);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": "https://www.naani.in/projects/tridasa-rise#listing",
        "name": "Tridasa Rise - Luxury 3 & 4 BHK Apartments in Nallagandla, Hyderabad",
        "description": "Premium 3 & 4 BHK luxury apartments in a 10.38 acre gated community with 55,000 sq ft clubhouse at Nallagandla, Hyderabad. IGBC Pre-Certified Gold rated project.",
        "url": "https://www.naani.in/projects/tridasa-rise",
        "image": [
          "https://www.naani.in/naani-logo-full.webp"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nallagandla",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500019",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "17.4720",
          "longitude": "78.3040"
        },
        "numberOfRooms": "3-4",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "14500000",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Tridasa Developers"
          }
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.naani.in/projects/tridasa-rise#business",
        "name": "Tridasa Rise by Naani Projects",
        "description": "Premium 3 & 4 BHK apartments in Nallagandla, Hyderabad",
        "url": "https://www.naani.in/projects/tridasa-rise",
        "telephone": "+919705080909",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nallagandla",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500019",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "17.4483",
          "longitude": "78.3908"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.naani.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": "https://www.naani.in/projects"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Tridasa Rise",
            "item": "https://www.naani.in/projects/tridasa-rise"
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Tridasa Rise Nallagandla | Luxury 3 & 4 BHK Apartments Hyderabad"
        description="Tridasa Rise - Premium 3 & 4 BHK apartments in Nallagandla, Hyderabad. 10.38 acres, 7 blocks, 55,000 sq ft clubhouse. IGBC Gold rated low-density luxury living with 40+ amenities."
        canonicalUrl="https://www.naani.in/projects/tridasa-rise"
        keywords="Tridasa Rise, Nallagandla apartments, 3 BHK Hyderabad, 4 BHK Nallagandla, luxury apartments Hyderabad, gated community Hyderabad, IGBC certified apartments Nallagandla"
        ogImage="https://www.naani.in/og/tridasa-rise.png"
        structuredData={structuredData}
      />
      <ProjectsHeader />

      <main className="min-h-screen bg-[#090D16] text-white pt-20 pb-20 md:pb-0">
        <HeroSection
          onEnquireClick={() => openEnquiry("Enquire Now")}
          onBrochureClick={() => openEnquiry("Download Brochure")}
          onSiteVisitClick={() => openEnquiry("Schedule Site Visit")}
        />

        <ProjectOverview />
        
        <VideoSection />

        <MasterPlan onViewClick={() => openEnquiry("Master Plan")} />

        <TowerPlans onViewPlan={(block) => openEnquiry(block)} />

        <AmenitiesSection />

        <LocationSection onEnquireClick={() => openEnquiry("Location Details")} />

        <SpecificationsSection />

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 px-4 bg-white border-t border-[#0080FF]/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#040957] mb-4">
              Book Your <span className="text-[#0080FF]">Dream Home</span> Today
            </h2>
            <p className="text-slate-700 font-medium mb-8 max-w-2xl mx-auto text-base">
              Experience elevated living at Tridasa Rise. Discover spacious 3 BHK luxury homes, premium amenities, and a vibrant community designed for modern lifestyles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button data-lead-gate="sitevisit" onClick={() => openEnquiry("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-bold rounded-xl shadow-md bg-[#0080FF] hover:bg-[#006bd6] text-white transition-all hover:scale-105">
                Schedule Site Visit
              </button>
              <button data-lead-gate="brochure" onClick={() => openEnquiry("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-bold rounded-xl shadow-md bg-[#040957] hover:bg-[#020536] text-white transition-all hover:scale-105">
                Get Latest Offers
              </button>
              <a href="https://wa.me/919705080909?text=Hi%2C%20I%27m%20interested%20in%20Tridasa%20Rise" target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all hover:scale-105 text-lg">
                <MessageCircle size={20} /> WhatsApp Us
              </a>
            </div>
            <div className="mt-6">
              <a href="tel:+919705080909" className="call-btn text-[#0080FF] hover:text-[#040957] font-bold text-lg transition-colors inline-flex items-center gap-2">
                <Phone size={18} /> Call Now: +91 97050 80909
              </a>
            </div>
          </div>
        </section>
      </main>

      <ProjectsFooter />
      <EnquiryPopup
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        source={enquirySource}
      />

      <StickyContact />
      <ScrollTriggerPopup projectName="Tridasa Rise" />
    </>
  );
};

export default TridasaRisePage;
