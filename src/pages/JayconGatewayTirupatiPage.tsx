import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin, Download, MessageCircle, Phone, Building2, Landmark, Check,
  Trees, UtensilsCrossed, Gamepad2, Baby, PartyPopper, Wrench, Waves,
  Shield, IndianRupee, CalendarCheck, Home, Star, Plane, Hotel,
  BedDouble, Sofa, CookingPot, PanelLeft, Briefcase, Users,
  TrendingUp, Percent, ChevronDown, Sparkles, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import ScrollTriggerPopup from "@/components/ScrollTriggerPopup";
import ProjectHeader from "@/components/ProjectHeader";
import SEOHead from "@/components/SEOHead";
import elevationImg from "@/assets/jaycon/elevation-collage.png";
import amenitiesImg from "@/assets/jaycon/amenities-collage.png";
import floorPlanImg from "@/assets/jaycon/floor-plan.png";

/* ── WhatsApp helper ── */
const WA_NUM = "919705080909";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
const defaultMsg = "Hi, I am interested in Jaycon Gateway Tirupati. Please share details.";
const brochureMsg = "Please share the brochure for Jaycon Gateway Tirupati.";
const siteVisitMsg = "I'd like to schedule a site visit for Jaycon Gateway Tirupati.";
const floorPlanMsg = "Please share the floor plans for Jaycon Gateway Tirupati.";
const priceMsg = "Please share the latest price and payment plan for Jaycon Gateway Tirupati.";
const expertMsg = "I'd like to speak with an expert about Jaycon Gateway Tirupati investment.";

/* ── Theme constants ── */
const NAVY_BG = "#0B1C2C";
const NAVY_DEEP = "#0E2238";
const GOLD = "#F5B400";
const GOLD_LIGHT = "#FFD54F";
const SUBTEXT = "#AAB3C5";
const CARD_BG = "rgba(255,255,255,0.05)";
const CARD_BORDER = "rgba(245,180,0,0.2)";
const CARD_HOVER_SHADOW = "0 8px 32px rgba(245,180,0,0.15)";

/* ── Count-up hook ── */
const useCountUp = (end: number, duration = 2000, inView = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
};

/* ── Scroll-reveal ── */
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Stagger container ── */
const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Glassmorphism Card ── */
const GlassCard = ({ children, className = "", hoverGlow = true }: { children: React.ReactNode; className?: string; hoverGlow?: boolean }) => (
  <div
    className={`rounded-2xl backdrop-blur-[10px] transition-all duration-500 ${hoverGlow ? "hover:-translate-y-[5px]" : ""} ${className}`}
    style={{
      background: CARD_BG,
      border: `1px solid ${CARD_BORDER}`,
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    }}
    onMouseEnter={(e) => hoverGlow && (e.currentTarget.style.boxShadow = CARD_HOVER_SHADOW)}
    onMouseLeave={(e) => hoverGlow && (e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)")}
  >
    {children}
  </div>
);

/* ── CTA Button ── */
const CtaBtn = ({ text, onClick, variant = "gold", icon, className = "", pulse = false }: { text: string; onClick?: () => void; msg?: string; variant?: "gold" | "outline"; icon?: React.ReactNode; className?: string; pulse?: boolean }) => (
  <div onClick={onClick} className="cursor-pointer inline-block">
    <Button
      className={`group px-7 py-5 text-sm font-bold rounded-xl transition-all duration-300 ${
        variant === "gold"
          ? `bg-gradient-to-r from-[${GOLD}] to-[${GOLD_LIGHT}] hover:from-[#e0a600] hover:to-[${GOLD}] text-[${NAVY_BG}] shadow-[0_0_30px_rgba(245,180,0,0.3)] hover:shadow-[0_0_50px_rgba(245,180,0,0.5)]`
          : `border border-[${GOLD}]/30 text-[${GOLD}] bg-[${GOLD}]/5 hover:bg-[${GOLD}]/10 hover:border-[${GOLD}]/60`
      } hover:scale-[1.05] ${pulse ? "animate-[pulse_2s_ease-in-out_infinite]" : ""} ${className}`}
      style={variant === "gold" ? {
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
        color: NAVY_BG,
        boxShadow: "0 0 30px rgba(245,180,0,0.3)",
      } : {
        border: `1px solid rgba(245,180,0,0.3)`,
        color: GOLD,
        background: "rgba(245,180,0,0.05)",
      }}
    >
      {icon || <MessageCircle className="w-4 h-4 mr-2" />}
      {text}
    </Button>
  </div>
);

/* ── Section Label ── */
const SectionLabel = ({ text }: { text: string }) => (
  <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: GOLD }}>{text}</p>
);

/* ── Section Wrapper ── */
const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-20 md:py-24 relative ${className}`}>
    <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
      {children}
    </div>
  </section>
);

/* ── Structured Data ── */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      name: "Jaycon Gateway Tirupati",
      description: "Jaycon Gateway Tirupati is a premium rent-cum-residential project offering fully managed suite rooms with rental income potential near Tirumala.",
      url: "https://www.naani.in/projects/jaycon-gateway-tirupati",
      image: "https://www.naani.in/og-jaycon-gateway-tirupati.jpg",
      address: { "@type": "PostalAddress", addressLocality: "Tirupati", addressRegion: "Andhra Pradesh", addressCountry: "India" },
      offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: "2000000", highPrice: "4000000", offerCount: "2" },
      floorSize: { "@type": "QuantitativeValue", value: "300-625", unitCode: "SQFT" },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Food Court", value: true },
        { "@type": "LocationFeatureSpecification", name: "Banquet Hall", value: true },
        { "@type": "LocationFeatureSpecification", name: "Indoor Games", value: true },
        { "@type": "LocationFeatureSpecification", name: "Children Play Area", value: true },
      ],
      additionalProperty: [
        { "@type": "PropertyValue", name: "Project Area", value: "12.5 Acres" },
        { "@type": "PropertyValue", name: "Property Type", value: "Rent-cum-Residential Suites" },
        { "@type": "PropertyValue", name: "Rental Model", value: "50% Revenue Sharing" },
      ],
      provider: { "@type": "Organization", name: "Jaycon Group", url: "https://www.naani.in" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is Jaycon Gateway Tirupati?", acceptedAnswer: { "@type": "Answer", text: "Jaycon Gateway Tirupati is a premium rent-cum-residential project offering fully managed suite rooms with rental income potential." } },
        { "@type": "Question", name: "What is the starting price of Jaycon Gateway?", acceptedAnswer: { "@type": "Answer", text: "The project offers suites starting from approximately ₹20 Lakhs and goes up to ₹40 Lakhs depending on configuration." } },
        { "@type": "Question", name: "Can I earn rental income from this property?", acceptedAnswer: { "@type": "Answer", text: "Yes, owners can earn rental income through a 50% revenue sharing model managed by the developer." } },
        { "@type": "Question", name: "Where is Jaycon Gateway located?", acceptedAnswer: { "@type": "Answer", text: "Jaycon Gateway is located in Tirupati, Andhra Pradesh, near major landmarks like Tirumala Temple and Renigunta Airport." } },
      ],
    },
  ],
};

/* ══════════════════════════ PAGE ══════════════════════════ */
const JayconGatewayTirupatiPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSource, setPopupSource] = useState("General");
  const openLead = (src: string) => { setPopupSource(src); setPopupOpen(true); };

  const roiRef = useRef(null);
  const roiInView = useInView(roiRef, { once: true, margin: "-100px" });

  const suiteCount = useCountUp(625, 1500, roiInView);
  const rentalPercent = useCountUp(50, 1200, roiInView);
  const monthlyIncome = useCountUp(30, 1500, roiInView);

  return (
    <div className="min-h-screen font-sans text-white" style={{ background: `linear-gradient(180deg, ${NAVY_BG} 0%, ${NAVY_DEEP} 50%, ${NAVY_BG} 100%)` }}>
      <SEOHead
        title="Jaycon Gateway Tirupati – Premium Suites with Rental Income & Investment Opportunity"
        description="Invest in Jaycon Gateway Tirupati premium suites. Earn passive rental income with fully managed property near Tirumala. Book your unit today."
        canonicalUrl="https://www.naani.in/projects/jaycon-gateway-tirupati"
        keywords="Jaycon Gateway Tirupati, Tirupati real estate, rental income property, luxury suites Tirupati, investment property India, passive income property near Tirumala"
        ogImage="https://www.naani.in/og-jaycon-gateway-tirupati.jpg"
        structuredData={structuredData}
      />
      <ProjectHeader projectName="Jaycon Gateway Tirupati" />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[96vh] flex items-center justify-center overflow-hidden">
        {/* Layered backgrounds */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${NAVY_BG}, ${NAVY_DEEP}, #0a1830)` }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,180,0,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,180,0,0.04),transparent_60%)]" />
        {/* Diagonal pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(245,180,0,0.3) 35px, rgba(245,180,0,0.3) 36px)" }} />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,180,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,180,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6" style={{ background: "rgba(245,180,0,0.1)", border: "1px solid rgba(245,180,0,0.25)", color: GOLD }}>
              <Sparkles className="w-3.5 h-3.5" /> Premium Investment Opportunity
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight"
          >
            Own a Piece of{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})` }}>
              Tirupati's Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl mb-3 max-w-2xl mx-auto"
            style={{ color: SUBTEXT }}
          >
            Premium Rent-Cum-Residential Suites in the Heart of Spiritual Tirupati
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-sm mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(170,179,197,0.6)" }}
          >
            Spread across 12.5 acres, Jaycon Gateway Tirupati offers fully managed luxury suites designed for both personal stay and passive rental income.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CtaBtn text="Get Brochure" onClick={() => openLead("Get Brochure")} icon={<Download className="w-4 h-4 mr-2" />} pulse />
            <CtaBtn text="Schedule Site Visit" onClick={() => openLead("Schedule Site Visit")} variant="outline" icon={<CalendarCheck className="w-4 h-4 mr-2" />} />
          </motion.div>

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-14 max-w-2xl mx-auto"
          >
            <GlassCard className="p-6">
              <div className="grid grid-cols-3 divide-x" style={{ borderColor: "rgba(245,180,0,0.1)" }}>
                {[
                  { val: "12.5", unit: "Acres", icon: <Building2 className="w-5 h-5" /> },
                  { val: "625", unit: "Sq.ft Max", icon: <Home className="w-5 h-5" /> },
                  { val: "50%", unit: "Rental Share", icon: <TrendingUp className="w-5 h-5" /> },
                ].map((s, i) => (
                  <div key={i} className="text-center px-4">
                    <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(245,180,0,0.1)", color: GOLD }}>
                      {s.icon}
                    </div>
                    <p className="text-2xl md:text-3xl font-extrabold" style={{ color: GOLD }}>{s.val}</p>
                    <p className="text-[10px] uppercase tracking-[0.15em] mt-1" style={{ color: SUBTEXT }}>{s.unit}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: "rgba(245,180,0,0.4)" }} />
        </motion.div>
      </section>

      {/* ═══════════ PROJECT OVERVIEW ═══════════ */}
      <Section>
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <SectionLabel text="About The Project" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
              Your <span style={{ color: GOLD }}>Tranquil Retreat</span> in Tirupati
            </h2>
            <p className="leading-relaxed mb-4 text-[15px]" style={{ color: SUBTEXT }}>
              Jaycon Gateway Tirupati is a premium development located near Tirumala, offering 3 & 4-star hospitality-style living. Each suite is 625 & 300 Sq.ft, designed for comfort, investment, and spiritual lifestyle.
            </p>
            <p className="leading-relaxed mb-8 text-sm" style={{ color: "rgba(170,179,197,0.5)" }}>
              A rare opportunity to own property in one of India's most visited spiritual destinations, with guaranteed rental income potential.
            </p>
            <CtaBtn text="Get Project Details" onClick={() => openLead("Get Project Details")} />
          </Reveal>
          <Reveal delay={0.2}>
            <GlassCard className="overflow-hidden">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C] via-transparent to-transparent z-10 pointer-events-none" />
                <img src={elevationImg} alt="Jaycon Gateway Tirupati premium elevation view" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ KEY HIGHLIGHTS ═══════════ */}
      <Section>
        <Reveal>
          <div className="text-center mb-14">
            <SectionLabel text="Why Choose Us" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Key Highlights</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: SUBTEXT }}>Every detail designed for premium living and smart investment</p>
          </div>
        </Reveal>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { icon: <Building2 className="w-6 h-6" />, title: "12.5 Acres Development", desc: "Sprawling campus", color: "#3B82F6" },
            { icon: <Home className="w-6 h-6" />, title: "625 & 300 Sq.ft Suites", desc: "Two suite options", color: GOLD },
            { icon: <Shield className="w-6 h-6" />, title: "Fully Managed Property", desc: "Zero hassle ownership", color: "#10B981" },
            { icon: <IndianRupee className="w-6 h-6" />, title: "Passive Rental Income", desc: "Earn while you own", color: "#F97316" },
            { icon: <MapPin className="w-6 h-6" />, title: "Prime Tirupati Location", desc: "Near Tirumala", color: "#8B5CF6" },
            { icon: <Landmark className="w-6 h-6" />, title: "Bank Loan Available", desc: "Easy financing", color: "#22D3EE" },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <GlassCard className="p-6 h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}15`, color: item.color, boxShadow: `0 0 20px ${item.color}10` }}>
                  {item.icon}
                </div>
                <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                <p className="text-xs" style={{ color: SUBTEXT }}>{item.desc}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ═══════════ CONFIGURATION & PRICING ═══════════ */}
      <Section className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,180,0,0.04),transparent_70%)]" />

        <Reveal>
          <div className="text-center mb-14">
            <SectionLabel text="Investment Plans" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Suite Options & Pricing</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: SUBTEXT }}>Choose your ideal suite and start earning</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Presidential Suite */}
          <Reveal delay={0.1}>
            <GlassCard className="overflow-hidden relative">
              {/* Popular badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, color: NAVY_BG }}>
                <Star className="w-3 h-3" /> Most Popular
              </div>
              <div className="p-6 border-b" style={{ borderColor: "rgba(245,180,0,0.15)" }}>
                <SectionLabel text="Presidential Suite" />
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-5xl font-extrabold" style={{ color: GOLD }}>625</span>
                  <span className="text-sm" style={{ color: SUBTEXT }}>SQ.FT</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "rgba(245,180,0,0.1)", border: "1px solid rgba(245,180,0,0.2)" }}>
                  <IndianRupee className="w-4 h-4" style={{ color: GOLD }} />
                  <span className="font-extrabold text-lg" style={{ color: GOLD }}>40 Lakhs</span>
                </div>
              </div>
              <div className="p-5 space-y-1">
                {[
                  { icon: <IndianRupee className="w-4 h-4" />, label: "Advance", val: "₹5 Lakhs" },
                  { icon: <CalendarCheck className="w-4 h-4" />, label: "Payment Period", val: "18 Months" },
                  { icon: <PanelLeft className="w-4 h-4" />, label: "Installments", val: "8 EMIs" },
                  { icon: <Briefcase className="w-4 h-4" />, label: "Rent Per Day (50-50)", val: "₹8,000 – ₹9,000" },
                  { icon: <TrendingUp className="w-4 h-4" />, label: "Fixed Monthly Rent", val: "₹30,000" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-300 hover:bg-white/[0.04]" style={{ borderLeft: `2px solid ${GOLD}30` }}>
                    <div style={{ color: GOLD }}>{row.icon}</div>
                    <span className="flex-1 text-sm" style={{ color: SUBTEXT }}>{row.label}</span>
                    <span className="font-bold text-sm text-white">{row.val}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 pt-2">
                <CtaBtn text="Enquire Now" onClick={() => openLead("Enquire Now")} className="w-full" />
              </div>
            </GlassCard>
          </Reveal>

          {/* Eco Suite */}
          <Reveal delay={0.2}>
            <GlassCard className="overflow-hidden">
              <div className="p-6 border-b" style={{ borderColor: "rgba(245,180,0,0.15)" }}>
                <SectionLabel text="Eco Suite" />
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-5xl font-extrabold text-white">300</span>
                  <span className="text-sm" style={{ color: SUBTEXT }}>SQ.FT</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <IndianRupee className="w-4 h-4" style={{ color: SUBTEXT }} />
                  <span className="font-extrabold text-lg text-white">20 Lakhs</span>
                </div>
              </div>
              <div className="p-5 space-y-1">
                {[
                  { icon: <IndianRupee className="w-4 h-4" />, label: "Advance", val: "₹3 Lakhs" },
                  { icon: <CalendarCheck className="w-4 h-4" />, label: "Payment Period", val: "18 Months" },
                  { icon: <PanelLeft className="w-4 h-4" />, label: "Installments", val: "8 EMIs" },
                  { icon: <Briefcase className="w-4 h-4" />, label: "Rent Per Day (50-50)", val: "₹3,000 – ₹3,500" },
                  { icon: <TrendingUp className="w-4 h-4" />, label: "Fixed Monthly Rent", val: "₹15,000" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-300 hover:bg-white/[0.04]" style={{ borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ color: SUBTEXT }}>{row.icon}</div>
                    <span className="flex-1 text-sm" style={{ color: SUBTEXT }}>{row.label}</span>
                    <span className="font-bold text-sm text-white">{row.val}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 pt-2">
                <CtaBtn text="Enquire Now" onClick={() => openLead("Enquire Now")} variant="outline" className="w-full" />
              </div>
            </GlassCard>
          </Reveal>
        </div>

        {/* Floor Plan */}
        <Reveal delay={0.3}>
          <div className="mt-20 max-w-xl mx-auto text-center">
            <SectionLabel text="Typical Layout" />
            <h3 className="text-2xl font-extrabold tracking-tight mb-6">Floor Plan</h3>
            <GlassCard className="overflow-hidden">
              <div className="group relative">
                <img src={floorPlanImg} alt="Jaycon Gateway Tirupati suite floor plan layout" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
            </GlassCard>
            <div className="mt-6">
              <CtaBtn text="Get Floor Plans on WhatsApp" onClick={() => openLead("Get Floor Plans on WhatsApp")} icon={<Download className="w-4 h-4 mr-2" />} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ═══════════ AMENITIES ═══════════ */}
      <Section>
        <Reveal>
          <div className="text-center mb-14">
            <SectionLabel text="Lifestyle & Comfort" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Premium Amenities</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: SUBTEXT }}>World-class facilities for a luxurious lifestyle</p>
          </div>
        </Reveal>

        {/* Top badges */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: <Wrench className="w-4 h-4" />, label: "24/7 Maintenance" },
              { icon: <Star className="w-4 h-4" />, label: "Best Investment" },
              { icon: <Trees className="w-4 h-4" />, label: "Green Spaces" },
              { icon: <UtensilsCrossed className="w-4 h-4" />, label: "Food Court & Pantry" },
              { icon: <Landmark className="w-4 h-4" />, label: "Bank Loan Available" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5" style={{ background: "rgba(245,180,0,0.06)", border: "1px solid rgba(245,180,0,0.15)", color: GOLD }}>
                {a.icon}
                {a.label}
              </div>
            ))}
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <BedDouble className="w-5 h-5" />, label: "Suite Rooms" },
            { icon: <CookingPot className="w-5 h-5" />, label: "Pantry" },
            { icon: <Gamepad2 className="w-5 h-5" />, label: "Indoor Games" },
            { icon: <Waves className="w-5 h-5" />, label: "Swimming Pool" },
            { icon: <Baby className="w-5 h-5" />, label: "Children Play Area" },
            { icon: <Gamepad2 className="w-5 h-5" />, label: "Games Zone" },
            { icon: <UtensilsCrossed className="w-5 h-5" />, label: "Food Court" },
            { icon: <PartyPopper className="w-5 h-5" />, label: "Banquet Hall" },
          ].map((a, i) => (
            <StaggerItem key={i}>
              <GlassCard className="p-5 text-center h-full">
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(245,180,0,0.08)", color: GOLD, boxShadow: "0 0 15px rgba(245,180,0,0.05)" }}>
                  {a.icon}
                </div>
                <p className="font-semibold text-sm text-white">{a.label}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <GlassCard className="overflow-hidden max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2C] via-transparent to-transparent z-10 pointer-events-none" />
              <img src={amenitiesImg} alt="Jaycon Gateway Tirupati amenities swimming pool clubhouse aerial view" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
          </GlassCard>
        </Reveal>
      </Section>

      {/* ═══════════ ROI / INVESTMENT ═══════════ */}
      <Section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,180,0,0.05),transparent_60%)]" />
        {/* Diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(245,180,0,0.4) 40px, rgba(245,180,0,0.4) 41px)" }} />

        <Reveal>
          <div className="text-center mb-14">
            <SectionLabel text="Returns & Growth" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Smart Investment Opportunity</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: SUBTEXT }}>Numbers that make your investment worthwhile</p>
          </div>
        </Reveal>

        {/* Big ROI number cards */}
        <div ref={roiRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-14">
          {[
            { label: "Max Suite Size", value: suiteCount, suffix: " Sq.ft", icon: <Home className="w-6 h-6" />, color: GOLD },
            { label: "Rental Revenue Share", value: rentalPercent, suffix: "%", icon: <Percent className="w-6 h-6" />, color: "#10B981" },
            { label: "Monthly Income Upto", value: monthlyIncome, prefix: "₹", suffix: "K", icon: <TrendingUp className="w-6 h-6" />, color: "#3B82F6" },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <GlassCard className="p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }} />
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${card.color}15`, color: card.color, boxShadow: `0 0 25px ${card.color}15` }}>
                  {card.icon}
                </div>
                <p className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: card.color }}>
                  {card.prefix}{card.value}{card.suffix}
                </p>
                <p className="text-xs uppercase tracking-[0.15em] font-medium" style={{ color: SUBTEXT }}>{card.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Benefits checklist */}
        <div className="max-w-2xl mx-auto space-y-3">
          {[
            "Own a premium suite room in Tirupati",
            "Stay anytime for personal or spiritual visits",
            "Earn rental income when not in use",
            "50% rental share with professional management",
            "Hassle-free maintenance by Jaycon Group",
          ].map((point, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <GlassCard className="flex items-center gap-4 px-5 py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={roiInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(245,180,0,0.1)", color: GOLD }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
                <p className="text-sm font-medium text-white">{point}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <div className="text-center mt-10">
            <CtaBtn text="Get Investment Details" onClick={() => openLead("Get Investment Details")} icon={<ArrowUpRight className="w-4 h-4 mr-2" />} />
          </div>
        </Reveal>
      </Section>

      {/* ═══════════ LOCATION ADVANTAGE ═══════════ */}
      <Section>
        <Reveal>
          <div className="text-center mb-14">
            <SectionLabel text="Connectivity" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Location Advantage</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: SUBTEXT }}>Strategically located near spiritual and lifestyle landmarks</p>
          </div>
        </Reveal>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Alipiri Mettu", dist: "12 km", icon: <Landmark className="w-5 h-5" /> },
            { name: "Tirumala", dist: "32 km", icon: <Landmark className="w-5 h-5" /> },
            { name: "Renigunta Airport", dist: "20 km", icon: <Plane className="w-5 h-5" /> },
            { name: "Taj Hotel", dist: "5.5 km", icon: <Hotel className="w-5 h-5" /> },
            { name: "Alivelu Mangapuram", dist: "7 km", icon: <Landmark className="w-5 h-5" /> },
            { name: "ISKCON Temple", dist: "13 km", icon: <Landmark className="w-5 h-5" /> },
            { name: "Shilparamam", dist: "6.5 km", icon: <MapPin className="w-5 h-5" /> },
            { name: "Ashoka Palace", dist: "3.4 km", icon: <Hotel className="w-5 h-5" /> },
            { name: "Brahmrishi Ashram", dist: "3.3 km", icon: <Landmark className="w-5 h-5" /> },
            { name: "Appalayagunta", dist: "8.5 km", icon: <MapPin className="w-5 h-5" /> },
            { name: "Siddeshwara Mutt", dist: "4 km", icon: <Landmark className="w-5 h-5" /> },
          ].map((loc, i) => (
            <StaggerItem key={i}>
              <GlassCard className="p-5 text-center h-full">
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(245,180,0,0.08)", color: GOLD }}>
                  {loc.icon}
                </div>
                <p className="font-bold text-sm text-white mb-1">{loc.name}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(245,180,0,0.1)", color: GOLD }}>{loc.dist}</span>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ═══════════ FAQ ═══════════ */}
      <Section>
        <Reveal>
          <div className="text-center mb-14">
            <SectionLabel text="Have Questions?" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Frequently Asked Questions</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: SUBTEXT }}>Everything you need to know about Jaycon Gateway</p>
          </div>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          {[
            { q: "What is Jaycon Gateway Tirupati?", a: "Jaycon Gateway Tirupati is a premium rent-cum-residential project offering fully managed suite rooms with rental income potential near Tirumala." },
            { q: "What is the starting price?", a: "The project offers suites starting from approximately ₹20 Lakhs (Eco-Suite, 300 sq.ft) and goes up to ₹40 Lakhs (Presidential Suite, 625 sq.ft)." },
            { q: "Can I earn rental income from this property?", a: "Yes, owners can earn rental income through a 50% revenue sharing model managed professionally by the developer." },
            { q: "Where is Jaycon Gateway located?", a: "Jaycon Gateway is located in Tirupati, Andhra Pradesh, near major landmarks like Tirumala Temple (32 km) and Renigunta Airport (20 km)." },
            { q: "What amenities are available?", a: "The project offers swimming pool, food court, banquet hall, indoor games, children play area, green spaces, and 24/7 maintenance." },
            { q: "How can I get price details?", a: "You can enquire directly on WhatsApp for the latest pricing, payment plans, and exclusive offers." },
          ].map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <details className="group mb-3 overflow-hidden rounded-2xl backdrop-blur-[10px] transition-all duration-300" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
                <summary className="cursor-pointer p-5 font-bold text-sm flex justify-between items-center text-white hover:bg-white/[0.03] transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" style={{ color: GOLD }} />
                </summary>
                <div className="px-5 pb-5 border-t" style={{ borderColor: "rgba(245,180,0,0.1)" }}>
                  <p className="text-sm leading-relaxed pt-4" style={{ color: SUBTEXT }}>{faq.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated living at Jaycon Gateway Tirupati. Discover spacious suite rooms, premium amenities, and an income-generating property designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button data-lead-gate="sitevisit" onClick={() => openLead("Schedule Site Visit")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-amber-600 hover:bg-amber-700 text-white transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => openLead("Get Latest Offers")} className="lead-btn py-4 px-8 text-lg font-semibold rounded-lg shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href="https://wa.me/919705080909?text=Hi%2C%20I%27m%20interested%20in%20Jaycon%20Gateway%20Tirupati" target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 text-lg">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-6">
            <a href="tel:+919705080909" className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <Phone size={18} /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ STICKY MOBILE CTA ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-xl p-3 flex gap-3" style={{ background: "rgba(11,28,44,0.95)", borderTop: `1px solid ${CARD_BORDER}` }}>
        <div onClick={() => openLead("Mobile - Enquire Now")} className="flex-1 cursor-pointer">
          <Button className="w-full font-bold py-5 text-sm rounded-xl" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, color: NAVY_BG, boxShadow: "0 0 25px rgba(245,180,0,0.3)" }}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Enquire Now
          </Button>
        </div>
        <div onClick={() => openLead("Mobile - Site Visit")} className="flex-1 cursor-pointer">
          <Button className="w-full font-bold py-5 text-sm rounded-xl" style={{ border: `1px solid rgba(245,180,0,0.3)`, color: GOLD, background: "rgba(245,180,0,0.05)" }}>
            <CalendarCheck className="w-4 h-4 mr-2" />
            Site Visit
          </Button>
        </div>
      </div>
      <div className="h-16 md:hidden" />
      <LeadCapturePopup open={popupOpen} onOpenChange={setPopupOpen} source={popupSource} projectName="Jaycon Gateway Tirupati" />
      <ScrollTriggerPopup projectName="Jaycon Gateway Tirupati" />
    </div>
  );
};

export default JayconGatewayTirupatiPage;
