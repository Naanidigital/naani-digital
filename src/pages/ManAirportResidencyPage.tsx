import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import ProjectHeader from "@/components/ProjectHeader";
import {
  Home, MapPin, Ruler, Compass, Building2, AlertTriangle, CheckCircle, Shield,
  Phone, MessageCircle, Waves, Dumbbell, Baby, Gamepad2, PartyPopper, Lock,
  Droplets, CloudRain, Car, Tv, Users, Trees, Play, ChevronDown
} from "lucide-react";
import layoutPlan from "@/assets/man-airport/layout-plan.png";
import villaElevation from "@/assets/man-airport/villa-elevation.png";
import layoutElevation from "@/assets/man-airport/layout-elevation.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PHONE = "+919705080909";
const WHATSAPP_MSG = encodeURIComponent(
  "Hi, I am interested in Man Airport Residency 4BHK Villas at Tukkuguda, Hyderabad. Please share more details."
);
const WA_LINK = `https://wa.me/919705080909?text=${WHATSAPP_MSG}`;

const ManAirportResidencyPage = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySource, setEnquirySource] = useState("General Enquiry");

  const openEnquiry = (source: string) => {
    setEnquirySource(source);
    setEnquiryOpen(true);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919705080909?text=${WHATSAPP_MSG}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${PHONE}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": "https://www.naani.in/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad#listing",
        name: "Man Airport Residency – Luxury 4BHK Villas in Tukkuguda, Hyderabad",
        description: "Ready-to-occupy luxury 4BHK villas at Man Airport Residency, Tukkuguda, Hyderabad. 39 exclusive villas on 4.05 acres near Rajiv Gandhi International Airport & ORR Exit 14.",
        url: "https://www.naani.in/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad",
        image: ["https://www.naani.in/naani-logo-full.webp"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mankhal, Tukkuguda",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "501510",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: "17.2965", longitude: "78.4446" },
        provider: { "@type": "Organization", name: "Naani Projects" },
        numberOfRooms: "4",
        floorSize: { "@type": "QuantitativeValue", minValue: 3704, maxValue: 3718, unitCode: "SQF" },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.naani.in/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad#business",
        name: "Man Airport Residency by Naani Projects",
        description: "Luxury 4BHK ready-to-occupy villas near Hyderabad Airport at Tukkuguda",
        url: "https://www.naani.in/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad",
        telephone: "+919705080909",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mankhal, Tukkuguda",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "501510",
          addressCountry: "IN",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "09:00",
          closes: "21:00",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.naani.in/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad#faq",
        mainEntity: [
          { "@type": "Question", name: "Are these villas near Hyderabad airport?", acceptedAnswer: { "@type": "Answer", text: "Yes, Man Airport Residency is located just 5 minutes from Rajiv Gandhi International Airport in Tukkuguda, Hyderabad." }},
          { "@type": "Question", name: "Are the villas ready to move?", acceptedAnswer: { "@type": "Answer", text: "Yes, all villas at Man Airport Residency are ready for occupancy. You can move in immediately after purchase." }},
          { "@type": "Question", name: "What is the size of each villa?", acceptedAnswer: { "@type": "Answer", text: "Each luxury 4BHK villa ranges from 3,704 to 3,718 sq.ft. built-up area on a 250 sq. yards plot." }},
          { "@type": "Question", name: "Is this project RERA approved?", acceptedAnswer: { "@type": "Answer", text: "Yes, Man Airport Residency is RERA approved with registration number P02400001431." }},
          { "@type": "Question", name: "How many villas are available?", acceptedAnswer: { "@type": "Answer", text: "Only 5 out of 39 exclusive villas are currently available. We recommend booking early to secure your dream villa." }},
          { "@type": "Question", name: "Is Tukkuguda good for real estate investment?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Tukkuguda benefits from airport proximity, ORR connectivity, rapid infrastructure growth, and upcoming IT developments making it a high-appreciation zone." }},
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.naani.in/" },
          { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.naani.in/projects" },
          { "@type": "ListItem", position: 3, name: "Man Airport Residency", item: "https://www.naani.in/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad" },
        ],
      },
    ],
  };

  const highlights = [
    { icon: <Ruler className="w-6 h-6" />, label: "Land Area", value: "4.05 Acres" },
    { icon: <Home className="w-6 h-6" />, label: "Total Villas", value: "39 Exclusive Units" },
    { icon: <Building2 className="w-6 h-6" />, label: "Villa Size", value: "3,704 – 3,718 Sq.Ft." },
    { icon: <Compass className="w-6 h-6" />, label: "Facing", value: "East & West" },
    { icon: <Users className="w-6 h-6" />, label: "Clubhouse", value: "11,000 Sq.Ft." },
    { icon: <AlertTriangle className="w-6 h-6" />, label: "Availability", value: "Only 5 Left!" },
    { icon: <CheckCircle className="w-6 h-6" />, label: "Status", value: "Ready to Occupy" },
    { icon: <Shield className="w-6 h-6" />, label: "RERA", value: "P02400001431" },
  ];

  const villaFeatures = [
    { icon: <Home className="w-8 h-8" />, title: "4 BHK with Home Theatre", desc: "Spacious living with a dedicated entertainment room" },
    { icon: <Users className="w-8 h-8" />, title: "Maid Room", desc: "Separate quarters for household staff" },
    { icon: <Car className="w-8 h-8" />, title: "EV Charging Point", desc: "Future-ready electric vehicle charging station" },
    { icon: <Droplets className="w-8 h-8" />, title: "Car Wash Area", desc: "Dedicated car wash bay within your villa" },
    { icon: <Tv className="w-8 h-8" />, title: "Premium Interiors", desc: "High-end finishes and modern design throughout" },
    { icon: <Trees className="w-8 h-8" />, title: "250 Sq Yards Plot", desc: "Generous plot size for your dream home" },
  ];

  const amenities = [
    { icon: <Waves className="w-6 h-6" />, name: "Swimming Pool" },
    { icon: <Dumbbell className="w-6 h-6" />, name: "A/C Gym" },
    { icon: <Baby className="w-6 h-6" />, name: "Children Play Area" },
    { icon: <Gamepad2 className="w-6 h-6" />, name: "Indoor Games" },
    { icon: <PartyPopper className="w-6 h-6" />, name: "Party Hall & Lawn" },
    { icon: <Play className="w-6 h-6" />, name: "Sports Area" },
    { icon: <Lock className="w-6 h-6" />, name: "24x7 Security" },
    { icon: <CloudRain className="w-6 h-6" />, name: "Rainwater Harvesting" },
    { icon: <Droplets className="w-6 h-6" />, name: "Sewage Treatment" },
  ];

  const faqs = [
    { q: "Are these villas near Hyderabad airport?", a: "Yes! Man Airport Residency is located at Mankhal, Tukkuguda – just 5 minutes from Rajiv Gandhi International Airport. It's one of the closest luxury villa communities to the airport in Hyderabad, making it ideal for frequent flyers and professionals." },
    { q: "Are the villas ready to move in?", a: "Absolutely. All villas at Man Airport Residency are fully constructed and ready for immediate occupancy. You can move into your dream 4BHK villa right away without any waiting period." },
    { q: "What is the size of each villa?", a: "Each luxury 4BHK villa offers a built-up area of 3,704 to 3,718 sq.ft. on a spacious 250 sq. yards plot. Every villa includes a home theatre room, maid room, EV charging point, and premium interiors." },
    { q: "Is Man Airport Residency RERA approved?", a: "Yes, the project is fully RERA approved with registration number P02400001431. You can verify this on the Telangana RERA website for complete transparency and trust." },
    { q: "How many villas are still available?", a: "Only 5 out of 39 exclusive villas are currently available. Given the prime location near the airport and ORR Exit 14, these remaining units are selling fast. We recommend scheduling a site visit soon." },
    { q: "Is Tukkuguda a good area for real estate investment?", a: "Tukkuguda is one of Hyderabad's fastest-growing suburbs. With proximity to the international airport, ORR Exit 14, upcoming IT corridors, and excellent infrastructure development, property values here have shown strong appreciation. It's an excellent investment destination." },
  ];

  return (
    <>
      <SEOHead
        title="4BHK Villas in Tukkuguda Hyderabad | Man Airport Residency"
        description="Looking for 4BHK villas near me? Explore ready-to-occupy luxury villas at Man Airport Residency, Tukkuguda Hyderabad near Airport & ORR. Call/WhatsApp +91 9705080909."
        canonicalUrl="https://www.naani.in/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad"
        keywords="4BHK Villas near me, Villas in Tukkuguda Hyderabad, Villas near Hyderabad Airport, Ready to move villas in Hyderabad, Luxury villas in Tukkuguda, Villas near ORR Exit 14, Man Airport Residency"
        ogImage="https://www.naani.in/og/man-airport-residency.png"
        structuredData={structuredData}
      />

      <main className="dark min-h-screen bg-slate-950 text-white pb-20 md:pb-0">
        <ProjectHeader projectName="Man Airport Residency" />
        <section className="relative">
          <div className="absolute inset-0">
            <img src={layoutElevation} alt="Man Airport Residency - Luxury 4BHK Villas aerial view at Tukkuguda Hyderabad" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
          </div>
          <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
            <div className="inline-block bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-6">
              <span className="text-amber-400 text-sm font-semibold tracking-wide">🔥 Only 5 Villas Left – Ready to Occupy</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Luxury 4BHK Villas Near Me in{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Tukkuguda, Hyderabad
              </span>
              <br className="hidden md:block" />
              <span className="text-2xl md:text-3xl text-gray-300 mt-2 block">– Ready to Occupy</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Man Airport Residency – 39 exclusive 4BHK luxury villas on 4.05 acres at Mankhal, Tukkuguda. Just 5 mins from Hyderabad Airport & 2 mins from ORR Exit 14. RERA Approved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openEnquiry("Hero - Book Site Visit")} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all text-lg">
                Book Site Visit
              </button>
              <a href={`tel:${PHONE}`} className="px-8 py-4 border-2 border-amber-500/50 text-amber-300 hover:bg-amber-500/10 rounded-xl font-bold transition-all text-lg">
                📞 Call: +91 97050 80909
              </a>
            </div>
          </div>
        </section>

        {/* AEO OPENING SECTION */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              If you're searching for <strong className="text-amber-400">4BHK villas near me</strong> in Hyderabad, Man Airport Residency at Tukkuguda is the answer. Located just 5 minutes from Rajiv Gandhi International Airport and 2 minutes from ORR Exit 14, these <strong className="text-amber-400">ready-to-move luxury villas in Hyderabad</strong> offer the perfect blend of connectivity, comfort, and exclusivity.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Spread across 4.05 acres with only 39 exclusive units, Man Airport Residency is a low-density gated community designed for families who value space, privacy, and premium living. Each villa features 3,704 to 3,718 sq.ft. of thoughtfully designed living space with a home theatre, maid room, and EV charging point – making these the finest <strong className="text-amber-400">villas in Tukkuguda Hyderabad</strong>.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're looking for <strong className="text-amber-400">villas near Hyderabad airport</strong> for convenience or <strong className="text-amber-400">luxury villas near ORR Exit 14</strong> for investment potential, Man Airport Residency delivers on every front. With RERA approval (P02400001431) and only 5 villas remaining, this is your chance to own a piece of Hyderabad's most promising real estate corridor.
            </p>
          </div>
        </section>

        {/* PROJECT HIGHLIGHTS */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Project <span className="text-amber-400">Highlights</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {highlights.map((h, i) => (
                <div key={i} className={`bg-slate-900 border rounded-2xl p-5 text-center transition-all hover:scale-105 ${h.label === "Availability" ? "border-amber-500/60 bg-amber-500/10" : "border-slate-800"}`}>
                  <div className="text-amber-400 flex justify-center mb-3">{h.icon}</div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{h.label}</p>
                  <p className={`font-bold text-sm md:text-base ${h.label === "Availability" ? "text-amber-400" : "text-white"}`}>{h.value}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button onClick={handleWhatsApp} className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg">
                <MessageCircle className="w-5 h-5 inline mr-2" /> WhatsApp: +91 97050 80909
              </button>
            </div>
          </div>
        </section>

        {/* VILLA ELEVATION IMAGE */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Villa <span className="text-amber-400">Elevation</span>
            </h2>
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <img src={villaElevation} alt="Man Airport Residency 4BHK Villa Elevation - Luxury villa exterior design at Tukkuguda Hyderabad" className="w-full" loading="lazy" />
            </div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Watch <span className="text-amber-400">Video Tour</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/0kDHAh5QEnU"
                  title="Man Airport Residency Villa Tour"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/1r8REtO9EG4"
                  title="Man Airport Residency Project Walkthrough"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* LAYOUT PLAN */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Layout <span className="text-amber-400">Plan</span>
            </h2>
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <img src={layoutPlan} alt="Man Airport Residency Layout Plan - 39 luxury villas on 4.05 acres at Tukkuguda" className="w-full" loading="lazy" />
            </div>
            <div className="text-center mt-8">
              <button onClick={() => openEnquiry("Layout Plan")} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg transition-all">
                Download Detailed Layout Plan
              </button>
            </div>
          </div>
        </section>

        {/* LOCATION ADVANTAGE */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Location <span className="text-amber-400">Advantage</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
              {[
                { icon: "✈️", title: "5 Mins to Airport", desc: "Rajiv Gandhi International Airport is just a 5-minute drive away" },
                { icon: "🛣️", title: "2 Mins to ORR Exit 14", desc: "Seamless connectivity to Outer Ring Road for all parts of Hyderabad" },
                { icon: "🏫", title: "Schools & Hospitals", desc: "Close proximity to top schools, hospitals, and IT hubs in Hyderabad" },
              ].map((loc, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">{loc.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{loc.title}</h3>
                  <p className="text-gray-400 text-sm">{loc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VILLA FEATURES */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Villa <span className="text-amber-400">Features</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {villaFeatures.map((f, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all group">
                  <div className="text-amber-400 mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AMENITIES */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              World-Class <span className="text-amber-400">Amenities</span>
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {amenities.map((a, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-amber-500/40 transition-all">
                  <div className="text-amber-400 flex justify-center mb-2">{a.icon}</div>
                  <p className="text-sm font-medium">{a.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY INVEST */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Why Invest in <span className="text-amber-400">Tukkuguda?</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Tukkuguda is rapidly emerging as one of Hyderabad's most sought-after residential destinations. The proximity to Rajiv Gandhi International Airport, combined with direct access to ORR Exit 14, makes this area a hotspot for both end-users and investors looking for <strong className="text-amber-400">luxury villas near Hyderabad airport</strong>.
              </p>
              <p>
                With the Hyderabad airport expansion, upcoming Pharma City, NIMZ (National Investment & Manufacturing Zone), and rapid infrastructure development along the airport corridor, property values in Tukkuguda have witnessed significant appreciation. The peaceful suburban setting, away from city congestion yet well-connected, makes it perfect for families seeking quality living.
              </p>
              <p>
                Man Airport Residency offers a rare opportunity to own a <strong className="text-amber-400">ready-to-occupy 4BHK villa in Tukkuguda</strong> in a low-density gated community with world-class amenities. With only 5 villas remaining, this is the ideal time to secure your investment in Hyderabad's growth corridor.
              </p>
            </div>
            <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openEnquiry("Schedule Site Visit - Why Invest")} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg">
                Schedule Site Visit
              </button>
              <button onClick={handleWhatsApp} className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg">
                <MessageCircle className="w-5 h-5 inline mr-2" /> WhatsApp Now
              </button>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Frequently Asked <span className="text-amber-400">Questions</span>
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-slate-900 border border-slate-800 rounded-xl px-6 overflow-hidden">
                  <AccordionTrigger className="text-left text-white font-semibold hover:text-amber-400 transition-colors py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Book Your <span className="text-amber-400">Dream Home</span> Today
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
              Experience elevated living at Man Airport Residency. Discover luxury 4BHK villas near Tukkuguda Hyderabad, premium amenities, and a vibrant community designed for modern lifestyles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button data-lead-gate="sitevisit" onClick={() => openEnquiry("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all hover:scale-105">
                Schedule Site Visit
              </button>
              <button data-lead-gate="brochure" onClick={() => openEnquiry("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105">
                Get Latest Offers
              </button>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
                <MessageCircle size={20} /> WhatsApp Us
              </a>
            </div>
            <div className="mt-6">
              <a href={`tel:${PHONE}`} className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
                <Phone size={18} /> Call Now: +91 97050 80909
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 hidden md:flex">
        <button onClick={handleCall} className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 transition-transform" aria-label="Call us">
          <Phone className="w-6 h-6 text-white" />
        </button>
        <button onClick={handleWhatsApp} className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform" aria-label="Chat on WhatsApp">
          <MessageCircle className="w-6 h-6 text-white" fill="white" />
        </button>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 md:hidden">
        <div className="flex gap-3">
          <button onClick={handleCall} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-medium">
            <Phone className="w-5 h-5" /> Call Now
          </button>
          <button onClick={handleWhatsApp} className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-medium">
            <MessageCircle className="w-5 h-5" fill="white" /> WhatsApp
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">+91 97050 80909</p>
      </div>

      <LeadCapturePopup open={enquiryOpen} onOpenChange={setEnquiryOpen} source={enquirySource} projectName="Man Airport Residency" />
      <ScrollTriggerPopup projectName="Man Airport Residency" />
    </>
  );
};

export default ManAirportResidencyPage;
