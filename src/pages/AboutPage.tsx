import { Link } from "react-router-dom";
import { MessageCircle, Phone, MapPin, ShieldCheck, Sparkles, Building2, Home, TrendingUp, Users, Award, CheckCircle2, ArrowRight, Search, CalendarCheck, Key, Send, Instagram, Facebook, Youtube } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEOHead from "../components/SEOHead";
import FAQSection from "../components/FAQSection";
import { Button } from "../components/ui/button";

const WA_URL = "https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I'm%20looking%20for%20a%20property%20in%20Hyderabad.";
const TEL = "tel:+919705080909";

const AboutPage = () => {
  const faqs = [
    { question: "What is Naani Projects?", answer: "Naani Projects is a smart real estate discovery platform that helps buyers find premium apartments, villas, gated communities and investment properties across Hyderabad and Tirupati through personalized WhatsApp assistance and curated property recommendations." },
    { question: "How does Naani Projects help me find the right property?", answer: "Share your budget, preferred location and property type on WhatsApp. Our team curates verified options, shares brochures, organizes free site visits and supports you end-to-end until you choose the right home." },
    { question: "Is Naani Projects a builder or a property advisor?", answer: "Naani Projects is an independent real estate discovery platform. We work with India's leading builders such as Rajapushpa, Prestige, Brigade, Aparna, My Home and Team4 to bring buyers verified, RERA-approved projects." },
    { question: "Which areas of Hyderabad do you cover?", answer: "We cover Kokapet, Tellapur, Gachibowli, Miyapur, Bachupally, Tukkuguda, Financial District, Neopolis, Kondapur, Narsingi, Kompally and other prime micro-markets, plus selected projects in Tirupati." },
    { question: "Are site visits really free?", answer: "Yes. Site visits arranged through Naani Projects are completely free. We coordinate timings, transportation guidance and a dedicated property expert who walks you through the project, amenities and pricing." },
    { question: "Do you only list luxury projects?", answer: "We list a wide range — affordable 2 BHK apartments, premium 3 BHK and 4 BHK homes, ultra-luxury villas and gated communities — so every buyer finds something matched to their budget and lifestyle." },
    { question: "Why should I trust Naani Projects with my property search?", answer: "Every project we recommend is verified, RERA-checked and shortlisted by experts who track Hyderabad real estate daily. You get unbiased guidance, current pricing, exclusive offers and personal support — all on WhatsApp." },
    { question: "How do I get started?", answer: "Click 'Get Property Deals on WhatsApp' or message +91 97050 80909 with your location, budget and BHK preference. You'll receive curated options within minutes." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["AboutPage", "RealEstateAgent"],
    "name": "About Naani Projects",
    "description": "Smart real estate discovery platform for premium apartments, villas and investment properties in Hyderabad and Tirupati.",
    "url": "https://www.naani.in/about-us",
    "telephone": "+919705080909",
    "image": "https://www.naani.in/naani-projects-logo.png",
    "areaServed": ["Hyderabad", "Tirupati"],
    "address": { "@type": "PostalAddress", "addressLocality": "Hyderabad", "addressRegion": "Telangana", "postalCode": "500084", "addressCountry": "IN" },
    "sameAs": [
      "https://www.instagram.com/naaniprojects/",
      "https://www.facebook.com/NaaniProjects/",
      "https://www.youtube.com/@NaaniProjects",
    ],
  };

  return (
    <>
      <SEOHead
        title="About Naani Projects | Smart Property Discovery Platform"
        description="Meet Naani Projects, a Hyderabad property discovery brand for verified apartments, villas, gated communities and investment homes."
        canonicalUrl="https://www.naani.in/about-us"
        keywords="about naani projects, real estate hyderabad, property discovery, luxury apartments hyderabad, villas hyderabad, real estate advisor hyderabad"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-[#090D16] text-white">
        <Header />

        {/* Hero */}
        <section className="py-24 md:py-28 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#111726] border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-md">About Naani Projects</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                Helping You Find the Right Property,{" "}
                <span className="text-gold-gradient">Smarter &amp; Faster</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
                Naani Projects simplifies property discovery through personalized real estate assistance on WhatsApp, helping buyers explore premium apartments, villas, and investment opportunities across Hyderabad and Tirupati.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-6 rounded-xl shadow-md" onClick={() => window.open(WA_URL, "_blank")}>
                  <MessageCircle size={18} className="mr-2" /> Get Property Deals on WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold px-6 py-6 rounded-xl shadow-xs" onClick={() => window.open(WA_URL, "_blank")}>
                  <CalendarCheck size={18} className="mr-2" /> Book Free Site Visit
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-[#0B101D]">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 space-y-5 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Story</h2>
              <p className="text-slate-200 font-medium leading-relaxed text-lg">
                Naani Projects was born out of a simple frustration that every property buyer in Hyderabad knows too well — endless calls from random brokers, outdated listings, inflated prices, and no clear answers. We believed buying a home should feel exciting, not exhausting.
              </p>
              <p className="text-slate-300 font-medium leading-relaxed">
                We built Naani Projects as a smart property discovery platform that puts the buyer first. Instead of forcing you to scroll through hundreds of irrelevant listings, our team listens to what you actually want — your budget, your preferred location, your lifestyle, your investment goals — and then handpicks verified projects that genuinely match.
              </p>
              <p className="text-slate-300 font-medium leading-relaxed">
                Every recommendation is RERA-checked, every project is visited and re-verified by our team, and every conversation happens where you already are: WhatsApp. From a young couple booking their first 2 BHK in Miyapur to NRI investors building wealth through luxury villas in Kokapet and Tellapur, we help buyers across every life stage make confident, informed decisions about Hyderabad real estate.
              </p>
              <p className="text-slate-300 font-medium leading-relaxed">
                Today, Naani Projects partners with India's most trusted builders — Rajapushpa, Prestige, Brigade, Aparna, My Home, Team4 and many more — to bring you the best of Hyderabad's premium residential market in one curated, transparent place.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 space-y-4 shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                <Sparkles className="text-amber-400" size={26} />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-slate-300 font-medium leading-relaxed">To simplify property buying through smart technology, personalized WhatsApp assistance, and trusted real estate guidance — so every buyer can find the right home without the noise.</p>
            </div>
            <div className="glass-card p-8 space-y-4 shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                <TrendingUp className="text-amber-400" size={26} />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              <p className="text-slate-300 font-medium leading-relaxed">To become one of the most trusted real estate discovery platforms for premium apartments, villas, and investment properties in India — known for transparency, expertise and a buyer-first approach.</p>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-gold-gradient">Naani Projects</span></h2>
              <p className="text-secondary">Premium real estate guidance, verified inventory, and personal support — every step of the way.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: ShieldCheck, title: "Verified Projects", desc: "Every project is RERA-checked and physically verified by our property experts." },
                { icon: Sparkles, title: "Personalized Recommendations", desc: "Curated property options tailored to your budget, location and lifestyle." },
                { icon: MessageCircle, title: "WhatsApp Assistance", desc: "Real conversations, instant updates, brochures and pricing — all on WhatsApp." },
                { icon: CalendarCheck, title: "Site Visit Support", desc: "Free guided site visits with a dedicated expert who answers every question." },
                { icon: TrendingUp, title: "Investment Guidance", desc: "Data-backed insights on appreciation, rental yields and emerging Hyderabad corridors." },
                { icon: Building2, title: "Premium Builder Network", desc: "Direct access to Rajapushpa, Prestige, Brigade, Aparna, My Home and Team4." },
                { icon: MapPin, title: "Hyderabad Expertise", desc: "Deep local knowledge — from Kokapet to Tukkuguda, we know every micro-market." },
                { icon: Award, title: "Buyer-First Always", desc: "No pushy sales calls. Just honest advice and the right property at the right price." },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 space-y-3 group hover:-translate-y-2 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={22} />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Discovery Process */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Property <span className="text-gold-gradient">Discovery Process</span></h2>
              <p className="text-secondary">Four simple steps from your first message to your new home.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Send, step: "01", title: "Share Budget & Location", desc: "Tell us your preferred area, budget and BHK on WhatsApp." },
                { icon: Search, step: "02", title: "Receive Curated Options", desc: "Get verified, hand-picked projects matched to your needs." },
                { icon: CalendarCheck, step: "03", title: "Schedule Site Visit", desc: "Book a free guided site visit at a time that suits you." },
                { icon: Key, step: "04", title: "Choose the Right Property", desc: "Negotiate, finalize and book with confidence and full support." },
              ].map((s, i) => (
                <div key={i} className="glass-card p-6 text-center space-y-3 relative">
                  <span className="absolute top-4 right-4 text-4xl font-bold text-primary/10">{s.step}</span>
                  <div className="w-14 h-14 rounded-xl bg-gold-purple p-[2px] mx-auto">
                    <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                      <s.icon className="text-primary" size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="text-secondary text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas <span className="text-gold-gradient">We Serve</span></h2>
              <p className="text-secondary">Premium properties across Hyderabad's most sought-after micro-markets and Tirupati.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {["Kokapet", "Tellapur", "Gachibowli", "Miyapur", "Bachupally", "Tukkuguda", "Financial District", "Neopolis", "Tirupati"].map((loc) => (
                <Link key={loc} to="/projects" className="glass-card px-5 py-3 hover:-translate-y-1 hover:shadow-gold transition-all">
                  <span className="flex items-center gap-2 text-sm font-medium"><MapPin className="text-primary" size={14} /> {loc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Builders */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gold-gradient">Builders</span></h2>
              <p className="text-secondary">Trusted developer partnerships shaping Hyderabad's premium real estate skyline.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {["Rajapushpa", "Prestige", "Brigade", "Aparna", "My Home", "Team4"].map((b) => (
                <Link key={b} to="/projects" className="glass-card p-6 text-center hover:-translate-y-1 hover:shadow-gold transition-all">
                  <Building2 className="text-primary mx-auto mb-2" size={24} />
                  <span className="text-sm font-semibold">{b}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto glass-card p-10 md:p-14 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Best Property Deals on <span className="text-gold-gradient">WhatsApp</span></h2>
                <p className="text-secondary mb-6 max-w-2xl mx-auto">Stop searching. Start finding. Message us with your location, budget and preferences — get the best property options instantly.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="bg-gradient-gold text-primary-foreground font-semibold hover:scale-105 transition-all hover:shadow-gold-lg" onClick={() => window.open(WA_URL, "_blank")}>
                    <MessageCircle size={18} className="mr-2" /> WhatsApp Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:border-primary hover:bg-primary/10" onClick={() => (window.location.href = TEL)}>
                    <Phone size={18} className="mr-2" /> Talk to Expert
                  </Button>
                </div>
                <div className="flex justify-center gap-3 pt-6">
                  <a href="https://www.instagram.com/naaniprojects/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all flex items-center justify-center"><Instagram size={16} className="text-primary" /></a>
                  <a href="https://www.facebook.com/NaaniProjects/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all flex items-center justify-center"><Facebook size={16} className="text-primary" /></a>
                  <a href="https://www.youtube.com/@NaaniProjects" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all flex items-center justify-center"><Youtube size={16} className="text-primary" /></a>
                </div>
                <p className="text-xs text-secondary pt-4">
                  Prefer browsing first? <Link to="/projects" className="text-primary hover:underline">Explore all projects →</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} pageUrl="https://www.naani.in/about-us" />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default AboutPage;
