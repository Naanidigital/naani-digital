import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import { Phone, MessageCircle, Star, Shield, Clock, CheckCircle, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import heroImg from "@/assets/sri-soho/hero.jpg";
import livingRoom from "@/assets/sri-soho/living-room.jpg";
import bedroom from "@/assets/sri-soho/bedroom.jpg";
import kitchen from "@/assets/sri-soho/kitchen.jpg";
import dining from "@/assets/sri-soho/dining.jpg";
import kidsBedroom from "@/assets/sri-soho/kids-bedroom.jpg";
import decorativeUnits from "@/assets/sri-soho/decorative-units.jpg";
import office from "@/assets/sri-soho/office.jpg";
import commercial from "@/assets/sri-soho/commercial.jpg";
import gallery1 from "@/assets/sri-soho/gallery-1.jpg";
import gallery2 from "@/assets/sri-soho/gallery-2.jpg";
import gallery3 from "@/assets/sri-soho/gallery-3.jpg";
import logo from "@/assets/sri-soho/logo.png";

const PHONE = "+919705080909";
const WA_MSG = encodeURIComponent("Hi, I am interested in interior design services in Hyderabad. Please share details.");
const PROJECT_NAME = "Sri Soho Interiors";

const galleryImages = [
  { src: livingRoom, alt: "Interior designers in Hyderabad - Sri Soho Interiors living room design" },
  { src: bedroom, alt: "Best home interiors Hyderabad bedroom design" },
  { src: kitchen, alt: "Modular kitchen Hyderabad Sri Soho Interiors" },
  { src: dining, alt: "Premium dining room interior design Hyderabad by Sri Soho Interiors" },
  { src: kidsBedroom, alt: "Kids bedroom interior design Hyderabad Sri Soho Interiors" },
  { src: decorativeUnits, alt: "Decorative TV unit and wall unit design Hyderabad Sri Soho Interiors" },
  { src: office, alt: "Modern office interior design Hyderabad Sri Soho Interiors" },
  { src: commercial, alt: "Commercial space interior design Hyderabad Sri Soho Interiors" },
  { src: gallery1, alt: "Luxury home interior design Hyderabad Sri Soho Interiors" },
  { src: gallery2, alt: "Premium residential interior design Hyderabad Sri Soho Interiors" },
  { src: gallery3, alt: "Modern bathroom interior design Hyderabad Sri Soho Interiors" },
];

const SriSohoInteriorsPage = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySource, setEnquirySource] = useState("General");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const openEnquiry = (src: string) => { setEnquirySource(src); setEnquiryOpen(true); };
  const handleCall = () => { window.location.href = `tel:${PHONE}`; };
  const handleWhatsApp = () => { window.open(`https://wa.me/919705080909?text=${WA_MSG}`, "_blank"); };

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-slide gallery
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(p => (p + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sri Soho Interiors",
    image: "https://www.naani.in/images/sri-soho-interiors.jpg",
    telephone: "+91-9705080909",
    address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "India" },
    url: "https://www.naani.in/projects/sri-soho-interiors-designers-hyderabad",
    sameAs: [],
    priceRange: "₹₹₹",
    description: "Premium interior designers in Hyderabad offering modular kitchens, home interiors & luxury designs for 2BHK, 3BHK and Villas."
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Products", id: "concepts" },
    { label: "About", id: "about" },
    { label: "Contact", id: "cta" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2d2d2d] font-sans">
      <Helmet>
        <title>Best Interior Designers in Hyderabad | Sri Soho Interiors</title>
        <meta name="description" content="Looking for interior designers in Hyderabad? Explore Sri Soho Interiors project offering modular kitchens, home interiors & luxury designs. Call 9705080909." />
        <meta name="keywords" content="interior designers in Hyderabad, home interiors Hyderabad, modular kitchen Hyderabad, Sri Soho Interiors, luxury interior design Hyderabad, 2BHK interiors, 3BHK interiors, villa interiors Hyderabad" />
        <link rel="canonical" href="https://www.naani.in/projects/sri-soho-interiors-designers-hyderabad" />
        <meta property="og:title" content="Best Interior Designers in Hyderabad | Sri Soho Interiors" />
        <meta property="og:description" content="Premium Home Interiors Hyderabad - Modular kitchens, living rooms, bedrooms & luxury designs by Sri Soho Interiors." />
        <meta property="og:image" content="https://www.naani.in/og/sri-soho-interiors.png" />
        <meta property="og:image:alt" content="Sri Soho Interiors - Premium Interior Designers in Hyderabad" />
        <meta property="og:url" content="https://www.naani.in/projects/sri-soho-interiors-designers-hyderabad" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sri Soho Interiors" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interior Designers in Hyderabad" />
        <meta name="twitter:description" content="Premium Home Interiors Hyderabad" />
        <meta name="twitter:image" content="https://www.naani.in/og/sri-soho-interiors.png" />
        <meta name="twitter:image:alt" content="Sri Soho Interiors - Premium Interior Designers in Hyderabad" />
        <link rel="icon" href={logo} type="image/png" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img src={logo} alt="Sri Soho Interiors Logo" className="h-10 w-10 object-contain" width={40} height={40} fetchPriority="high" decoding="async" />
            <span className={`font-bold text-lg hidden sm:block transition-colors ${headerScrolled ? "text-[#2d2d2d]" : "text-white"}`}>Sri SoHo</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className={`text-sm font-medium hover:text-[#5a7a3d] transition-colors ${headerScrolled ? "text-[#2d2d2d]" : "text-white"}`}>
                {item.label}
              </button>
            ))}
            <button onClick={handleCall} className="call-btn bg-[#5a7a3d] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#4a6a2d] transition-colors flex items-center gap-2">
              <Phone size={14} /> Call Now
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className={`md:hidden ${headerScrolled ? "text-[#2d2d2d]" : "text-white"}`}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t shadow-lg">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full text-left px-6 py-3 text-[#2d2d2d] hover:bg-[#f0ebe3] font-medium">
                {item.label}
              </button>
            ))}
            <button onClick={handleCall} className="call-btn block w-full text-left px-6 py-3 text-[#5a7a3d] font-semibold">
              📞 Call Now
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Sri Soho Interiors - Premium Interior Designers in Hyderabad" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center md:text-left md:ml-16">
          <p className="text-[#c9a96e] text-sm uppercase tracking-[3px] mb-4 font-medium">Welcome to Sri Soho Interiors</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Interior Designers<br />in Hyderabad
          </h1>
          <h2 className="text-lg md:text-xl text-white/80 mb-8 font-light">
            Transform your space with premium interior designers in Hyderabad — Home Interiors, Modular Kitchens, Luxury Designs
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={() => openEnquiry("Hero - Free Consultation")} className="lead-btn bg-[#c9a96e] hover:bg-[#b89558] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl">
              Get Free Consultation
            </button>
            <button onClick={handleWhatsApp} className="whatsapp-btn bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg">
              <MessageCircle size={20} /> WhatsApp Now
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="concepts" className="py-20 bg-[#5a7a3d]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-white/70 text-sm uppercase tracking-[3px] mb-2">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Modern & Creative Interior Solutions</h2>
            <p className="text-white/60 mt-3 max-w-2xl mx-auto">From modular kitchens to commercial spaces, Sri Soho Interiors delivers bespoke designs crafted for every room in your home and business.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: kitchen, title: "Kitchen", alt: "Modular kitchen interior designers Hyderabad Sri Soho Interiors" },
              { img: bedroom, title: "Bedroom", alt: "Best bedroom interior design Hyderabad Sri Soho Interiors" },
              { img: dining, title: "Dining", alt: "Dining room interior design Hyderabad Sri Soho Interiors" },
              { img: livingRoom, title: "Living", alt: "Living room interior designers in Hyderabad Sri Soho Interiors" },
              { img: decorativeUnits, title: "Decorative Units", alt: "TV unit decorative wall unit design Hyderabad Sri Soho Interiors" },
              { img: kidsBedroom, title: "Kids Bedroom", alt: "Kids bedroom interior design Hyderabad Sri Soho Interiors" },
              { img: office, title: "Office Spaces", alt: "Office interior design Hyderabad Sri Soho Interiors" },
              { img: commercial, title: "Commercial Spaces", alt: "Commercial shop interior design Hyderabad Sri Soho Interiors" },
            ].map((card, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="overflow-hidden aspect-square">
                  <img src={card.img} alt={card.alt} loading="lazy" width={800} height={800} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white text-base font-semibold">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => openEnquiry("Products - Get Started")} className="lead-btn bg-[#c9a96e] hover:bg-[#b89558] text-white px-8 py-3 rounded-full font-semibold transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6">
          {[
            { icon: Star, label: "Best Quality" },
            { icon: Clock, label: "On-Time Delivery" },
            { icon: Shield, label: "Warranty Support" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-md border border-[#e8e0d4] hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f0ebe3] rounded-full flex items-center justify-center">
                <item.icon className="text-[#c9a96e]" size={28} />
              </div>
              <p className="text-sm md:text-base font-semibold text-[#5a7a3d] text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Why Choose Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-6 leading-tight">
              Why Choose<br /><span className="text-[#5a7a3d]">Sri Soho Interiors</span>
            </h2>
            <p className="text-[#555] mb-4 leading-relaxed">
              Sri Soho Interiors is one of the most trusted and sought-after <strong>interior designers in Hyderabad</strong>, known for delivering premium, customized home and commercial interior solutions. Whether you are looking for a complete <strong>home interior design in Hyderabad</strong> for your newly purchased 2BHK or 3BHK flat, or need a stunning makeover for your villa, our expert team transforms every space into a functional masterpiece.
            </p>
            <p className="text-[#555] mb-4 leading-relaxed">
              Our specialization spans across <strong>modular kitchen designs in Hyderabad</strong>, elegant living room setups, luxurious bedroom interiors, creative kids' bedrooms, sophisticated dining spaces, and modern decorative TV units. We also cater to <strong>office interior design in Hyderabad</strong> and commercial establishments including retail showrooms, restaurants, and corporate workspaces — ensuring every project meets the highest standards of aesthetics and functionality.
            </p>
            <p className="text-[#555] mb-4 leading-relaxed">
              What sets us apart as the <strong>best interior designers near me in Hyderabad</strong> is our commitment to understanding each client's unique lifestyle and translating it into beautiful, space-efficient designs. We use only ISI-certified, eco-friendly materials with 10-year warranty support, ensuring durability and peace of mind. Our end-to-end project management covers everything from initial concept and 3D visualization to material procurement, execution, and final handover — all within your budget and timeline.
            </p>
            <p className="text-[#555] mb-6 leading-relaxed">
              Serving all major localities including Kondapur, Gachibowli, HITEC City, Madhapur, Miyapur, Kukatpally, Manikonda, Nallagandla, Bachupally, Kompally, Banjara Hills, and Jubilee Hills — Sri Soho Interiors is Hyderabad's preferred choice for <strong>affordable luxury home interiors</strong>, <strong>turnkey interior solutions</strong>, and <strong>commercial space design</strong>. With 100+ satisfied clients and a 100% on-time delivery track record, we are the growth partner your space deserves.
            </p>
            <ul className="space-y-3">
              {[
                "Premium interior designers in Hyderabad",
                "Space-saving smart designs for 2BHK, 3BHK & Villas",
                "Affordable packages — no hidden costs",
                "End-to-end execution & project management",
                "Modular kitchens, wardrobes & false ceilings",
                "Kids bedroom & office interior specialists",
                "10-year warranty on materials",
                "Serving all areas of Hyderabad",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-[#5a7a3d] mt-0.5 shrink-0" size={20} />
                  <span className="text-[#444]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={gallery1} alt="Premium home interior design Hyderabad" loading="lazy" width={400} height={300} className="rounded-2xl shadow-lg w-full h-auto object-cover" />
            <img src={gallery3} alt="Modern bathroom design Hyderabad Sri Soho" loading="lazy" width={400} height={300} className="rounded-2xl shadow-lg w-full h-auto object-cover mt-8" />
            <img src={dining} alt="Dining room interior Hyderabad Sri Soho Interiors" loading="lazy" width={400} height={300} className="rounded-2xl shadow-lg w-full h-auto object-cover" />
            <img src={office} alt="Office interior design Hyderabad Sri Soho" loading="lazy" width={400} height={300} className="rounded-2xl shadow-lg w-full h-auto object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* Gallery Slider */}
      <section className="py-20 bg-[#f0ebe3]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2d2d2d] mb-12">Our Portfolio</h2>
          <div className="relative" ref={galleryRef}>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {galleryImages.map((img, i) => (
                  <div key={i} className="min-w-full cursor-pointer" onClick={() => setLightbox(i)}>
                    <img src={img.src} alt={img.alt} loading="lazy" width={800} height={600} className="w-full h-[400px] md:h-[500px] object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setCurrentSlide(p => (p - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setCurrentSlide(p => (p + 1) % galleryImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
              <ChevronRight size={20} />
            </button>
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? "bg-[#5a7a3d] scale-125" : "bg-[#c9a96e]/50"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white" onClick={() => setLightbox(null)}><X size={32} /></button>
          <button className="absolute left-4 text-white" onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }}><ChevronLeft size={36} /></button>
          <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt} loading="lazy" decoding="async" className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 text-white" onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }}><ChevronRight size={36} /></button>
        </div>
      )}

      {/* Final CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated interior design with Sri Soho Interiors. Discover bespoke modular kitchens, luxury living spaces, and custom interiors designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button data-lead-gate="sitevisit" onClick={() => openEnquiry("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openEnquiry("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <button onClick={handleWhatsApp} data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
              <MessageCircle size={20} /> WhatsApp Us
            </button>
          </div>
          <div className="mt-6">
            <a href={`tel:${PHONE}`} className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <Phone size={18} /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#2d2d2d] mb-12">Frequently Asked Questions</h2>
          {[
            { q: "What services does Sri Soho Interiors offer?", a: "We offer complete home interiors including living rooms, bedrooms, modular kitchens, wardrobes, false ceilings, and bathroom designs for 2BHK, 3BHK apartments and villas in Hyderabad." },
            { q: "How much does interior design cost in Hyderabad?", a: "Interior design costs vary based on the scope. We offer affordable packages starting from budget-friendly to luxury. Contact us for a free consultation and customized quote." },
            { q: "Do you provide end-to-end interior services?", a: "Yes, Sri Soho Interiors handles everything from design conceptualization to material procurement, execution, and final handover — complete end-to-end project management." },
            { q: "Which areas in Hyderabad do you serve?", a: "We serve all areas of Hyderabad including Kondapur, Gachibowli, Madhapur, Miyapur, Kukatpally, Manikonda, Nallagandla, Bachupally, and surrounding areas." },
            { q: "How long does an interior project take?", a: "A typical 2BHK interior project takes 35-45 days. 3BHK and villa projects may take 45-60 days depending on the complexity and customization required." },
          ].map((faq, i) => (
            <details key={i} className="group border-b border-[#e8e0d4] py-4">
              <summary className="cursor-pointer font-semibold text-[#2d2d2d] group-open:text-[#5a7a3d] flex items-center justify-between">
                {faq.q}
                <ChevronRight size={18} className="group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="mt-3 text-[#555] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d2d2d] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="Sri Soho Interiors Logo" className="h-12 w-12 mb-4 bg-white rounded-lg p-1" width={48} height={48} loading="lazy" decoding="async" />
            <h3 className="font-bold text-lg mb-2">Sri Soho Interiors</h3>
            <p className="text-white/60 text-sm">Premium interior designers in Hyderabad transforming homes into masterpieces.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#c9a96e]">Interior Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Modular Kitchen</li>
              <li>Bedroom Designs</li>
              <li>Dining Interiors</li>
              <li>Living Room Interiors</li>
              <li>Decorative Units</li>
              <li>Kids Bedroom</li>
              <li>Office Spaces</li>
              <li>Commercial Spaces</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#c9a96e]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><button onClick={() => scrollToSection("hero")} className="hover:text-white">Home</button></li>
              <li><button onClick={() => scrollToSection("about")} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => scrollToSection("concepts")} className="hover:text-white">Products</button></li>
              <li><button onClick={() => scrollToSection("faq")} className="hover:text-white">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#c9a96e]">Contact</h4>
            <p className="text-sm text-white/70 mb-4">Hyderabad, Telangana, India</p>
            <div className="flex flex-col gap-3">
              <a href={`tel:${PHONE}`} className="call-btn flex items-center gap-2 bg-[#5a7a3d] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4a6a2d] transition-colors">
                <Phone size={16} /> Call Now
              </a>
              <button onClick={handleWhatsApp} className="whatsapp-btn flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                <MessageCircle size={16} /> WhatsApp
              </button>
              <button onClick={() => openEnquiry("Footer - Schedule Site Visit")} className="lead-btn flex items-center gap-2 bg-[#c9a96e] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#b89558] transition-colors">
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Sri Soho Interiors. All rights reserved. | Powered by{" "}
          <a href="https://www.naani.in" className="text-[#c9a96e] hover:underline">Naani Projects</a>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e8e0d4] p-3 md:hidden">
        <div className="flex gap-3">
          <a href={`tel:${PHONE}`} className="call-btn flex-1 flex items-center justify-center gap-2 bg-[#5a7a3d] text-white py-3 rounded-xl font-medium">
            <Phone size={18} /> Call Now
          </a>
          <button onClick={handleWhatsApp} className="whatsapp-btn flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-medium">
            <MessageCircle size={18} /> WhatsApp
          </button>
        </div>
      </div>

      {/* Popups */}
      <LeadCapturePopup open={enquiryOpen} onOpenChange={setEnquiryOpen} source={enquirySource} projectName={PROJECT_NAME} />
      <ScrollTriggerPopup projectName={PROJECT_NAME} />
    </div>
  );
};

export default SriSohoInteriorsPage;
