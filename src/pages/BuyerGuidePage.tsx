import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQSection from "@/components/FAQSection";
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Phone, MessageCircle } from "lucide-react";

const BuyerGuidePage = () => {
  const { guideSlug } = useParams<{ guideSlug?: string }>();
  const is3Bhk = guideSlug?.includes("3-bhk");

  const title = is3Bhk
    ? "Complete 3 BHK Home Buying Guide in Hyderabad (2026) | Naani Projects"
    : "Complete 2 BHK Home Buying Guide in Hyderabad (2026) | Naani Projects";

  const h1 = is3Bhk
    ? "3 BHK Home Buying Guide in Hyderabad"
    : "2 BHK Home Buying Guide in Hyderabad";

  const description = is3Bhk
    ? "Comprehensive 2026 homebuyer guide for 3 BHK luxury flats in Hyderabad. Compare top locations like Kokapet, Tellapur & Nallagandla, pricing, and RERA verification."
    : "Essential 2026 homebuyer guide for 2 BHK flats in Hyderabad. Learn about top locations, budget estimations, documentation, and RERA checklists.";

  const canonicalUrl = `https://www.naani.in/guides/${guideSlug || "2-bhk-flats-in-hyderabad"}`;

  const faqs = is3Bhk
    ? [
        { q: "What should I look for when buying a 3 BHK in Hyderabad?", a: "Focus on developer track record, RERA registration, floor layout efficiency (less corridor space wastage), clubhouse size, parking allocations, and distance to Financial District/HITEC City." },
        { q: "What is the expected maintenance fee for a 3 BHK gated community?", a: "Maintenance fees typically range from ₹3.5 to ₹5.0 per sq.ft per month in modern high-rise gated communities in West Hyderabad." },
      ]
    : [
        { q: "Is a 2 BHK flat a good investment in Hyderabad?", a: "Yes, 2 BHK flats offer higher rental yields (3.5% - 4.2%) and faster liquidity compared to larger configurations in IT corridors like Miyapur, Bachupally, and Tellapur." },
        { q: "How much loan can I get for a 2 BHK property in Hyderabad?", a: "Banks generally finance 80% to 90% of the agreement value for RERA-registered properties based on your income eligibility." },
      ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description,
    author: { "@type": "Organization", name: "Naani Projects" },
    publisher: { "@type": "Organization", name: "Naani Projects", logo: "https://www.naani.in/naani-projects-logo.png" },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* HERO */}
        <section className="relative pt-28 pb-14 bg-[#F1F1F1] border-b border-[#0080FF]/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <nav aria-label="breadcrumb" className="text-xs text-[#0080FF] mb-6 font-medium">
              <Link to="/" className="hover:text-[#040957]">Home</Link> / <Link to="/hyderabad" className="hover:text-[#040957]">Hyderabad</Link> / <span className="text-[#040957] font-semibold">Buyer Guide</span>
            </nav>
            <span className="inline-block bg-[#0080FF]/15 border border-[#0080FF]/30 text-[#0080FF] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              2026 Homebuyer Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#040957]">
              {h1}
            </h1>
            <p className="text-slate-700 text-base md:text-lg leading-relaxed">
              Everything you need to know before investing in a {is3Bhk ? "3 BHK" : "2 BHK"} flat in Hyderabad: pricing trends, RERA verification checklist, top locations, and step-by-step process.
            </p>
          </div>
        </section>

        {/* CONTENT BODY */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl space-y-12">
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">1. Why Choose a {is3Bhk ? "3 BHK" : "2 BHK"} Flat in Hyderabad?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Hyderabad's residential market is booming driven by expansion along the Outer Ring Road (ORR). {is3Bhk ? "3 BHK flats offer ample space for growing families, home offices, and luxury living amenities." : "2 BHK flats offer optimal affordability, lower maintenance overheads, and excellent rental demand from IT professionals."}
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">2. Top Locations to Consider</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-card border border-border">
                  <h3 className="font-bold text-lg text-primary mb-2">West Hyderabad (IT Corridor)</h3>
                  <p className="text-sm text-muted-foreground">Kokapet, Tellapur, Narsingi, Gachibowli, Kondapur. Highest capital appreciation and proximity to Financial District.</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border">
                  <h3 className="font-bold text-lg text-primary mb-2">North-West Hyderabad</h3>
                  <p className="text-sm text-muted-foreground">Miyapur, Bachupally, Mallampet, Bowrampet. Excellent value for money, educational institutions, and metro connectivity.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">3. RERA &amp; Legal Verification Checklist</h2>
              <ul className="space-y-3">
                {[
                  "Verify TG-RERA Registration number on official Telangana RERA portal.",
                  "Check title deed and clear ownership documentation (30-year search report).",
                  "Ensure HMDA / GHMC building plan approval and Occupancy Certificate (OC) terms.",
                  "Inspect bank approval status for hassle-free home loan processing.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground bg-card p-4 rounded-xl border border-border/80">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA CARD */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-card to-background border border-primary/30 text-center space-y-4 shadow-xl">
              <h3 className="text-2xl font-bold text-foreground">Need Personalized Property Advice in Hyderabad?</h3>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Talk to a dedicated Naani Projects advisor for verified listings, site visits, and direct developer pricing with zero brokerage.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link to={is3Bhk ? "/hyderabad/3-bhk-flats" : "/hyderabad/2-bhk-flats"} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-gold">
                  Explore {is3Bhk ? "3 BHK" : "2 BHK"} Projects →
                </Link>
                <a href="tel:+919705080909" className="call-btn px-6 py-3 rounded-xl bg-card border border-primary/40 text-primary font-bold text-sm hover:bg-primary/10">
                  <Phone className="w-4 h-4 inline mr-2" /> Call Advisor
                </a>
              </div>
            </div>

            {/* FAQS */}
            <FAQSection items={faqs} />
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default BuyerGuidePage;
