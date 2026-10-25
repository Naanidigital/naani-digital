import Services from "../components/Services";
import SEOHead from "../components/SEOHead";
import FAQSection from "../components/FAQSection";
import InternalLinkBlock from "../components/InternalLinkBlock";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesPage = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/919493943946?text=Hi%2C%20I%20want%20to%20know%20more%20about%20your%20digital%20marketing%20services", "_blank");
  };

  const faqs = [
    {
      question: "What digital marketing services does Naani Projects offer in Hyderabad?",
      answer: "Naani Projects offers comprehensive **digital marketing services in Hyderabad** including SEO (Search Engine Optimization), PPC advertising (Google Ads & Facebook Ads), social media marketing, website design & development, content marketing, WhatsApp marketing, graphic design, video marketing, and complete branding solutions. We are your one-stop shop for all digital growth needs."
    },
    {
      question: "How do I know which digital marketing service is right for my business?",
      answer: "During your **free consultation**, our experts analyze your business goals, target audience, competition in Hyderabad, and budget. Based on this data, we recommend the most effective service mix—whether that's SEO for long-term organic growth, PPC for immediate leads, or social media for brand awareness."
    },
    {
      question: "Can I combine multiple services in one package?",
      answer: "Absolutely! In fact, our most successful clients use **integrated digital marketing strategies**. Combining SEO, PPC, and social media often delivers better results than standalone efforts. We create customized, multi-channel packages tailored to your specific business objectives and budget."
    },
    {
      question: "What is the minimum budget to start with digital marketing?",
      answer: "We make premium **digital marketing services accessible** to businesses of all sizes in Hyderabad. We have packages starting from ₹15,000/month, but the ideal budget depends on your goals and competition. Contact us for a free consultation to get a customized quote."
    },
    {
      question: "How quickly can I see results from your services?",
      answer: "Results timeline varies by service: **PPC campaigns can generate leads within 24-48 hours**. Social media engagement typically grows within 2-4 weeks. SEO shows significant improvements in 3-6 months. We provide regular progress reports so you can track your growth."
    },
    {
      question: "Do you provide monthly reports on campaign performance?",
      answer: "Yes! We believe in **100% transparency**. You receive weekly/monthly reports with clear metrics: traffic, leads, conversions, ROI, and more. Our dashboards show exactly where your money goes and what results you're getting."
    },
    {
      question: "What industries do you specialize in for digital marketing?",
      answer: "We serve diverse industries in Hyderabad including **real estate, healthcare (doctors & clinics), restaurants, salons & spas, manufacturing, IT companies, startups, e-commerce, and service businesses**. Our team understands each sector's unique challenges and creates targeted strategies."
    }
  ];

  return (
    <>
      <SEOHead
        title="Digital Marketing Services in Hyd | Naani Projects Agency"
        description="Need fast growth? Our digital marketing services in Hyd drive traffic, leads & sales. Partner with Naani Projects Agency for measurable results."
        canonicalUrl="https://www.naani.in/services"
        keywords="Digital Marketing Services in Hyderabad, Digital Marketing Services Hyd, SEO Services Hyderabad, PPC Hyderabad, Social Media Marketing Hyderabad, Naani Projects Agency"
      />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
            Digital Marketing Services in Hyderabad
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
            Need fast, sustainable growth? <Link to="/" className="text-primary hover:underline font-bold">Naani Projects</Link> delivers 
            <strong> comprehensive digital marketing services in Hyderabad</strong> that drive traffic, generate leads, and convert visitors 
            into paying customers. From SEO to social media, PPC to content marketing—we're your complete growth partner.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <Services />

      {/* Detailed Services Overview */}
      <section className="py-16 container mx-auto px-4 bg-card/40 border-y border-border/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Complete Digital Marketing Solutions Under One Roof
          </h2>
          
          <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
            <p>
              In today's competitive Hyderabad market, having a strong digital presence isn't optional—it's essential. 
              <Link to="/" className="text-primary hover:underline font-bold"> Naani Projects</Link> offers a full suite 
              of <strong>digital marketing services</strong> designed to help businesses like yours stand out, attract more 
              customers, and grow revenue.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-8">Our Core Digital Marketing Services</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-foreground font-bold">SEO Services:</strong> Rank #1 on Google for keywords that matter. 
                  Our <Link to="/services/seo-services" className="text-primary hover:underline font-bold">SEO services in Hyderabad</Link> include 
                  technical SEO, on-page optimization, local SEO, and link building.
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-foreground font-bold">PPC Advertising:</strong> Get instant, qualified leads with our 
                  <Link to="/services/pay-per-click-ads" className="text-primary hover:underline font-bold"> pay-per-click campaigns</Link>. 
                  We manage Google Ads, Facebook Ads, and Instagram Ads with laser-focused targeting.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-foreground font-bold">Social Media Marketing:</strong> Build your brand and engage your audience with 
                  <Link to="/services/social-media-marketing" className="text-primary hover:underline font-bold"> social media marketing</Link> that 
                  turns followers into customers.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-foreground font-bold">Website Design:</strong> Convert more visitors with 
                  <Link to="/services/website-design-services" className="text-primary hover:underline font-bold"> high-converting websites</Link> that 
                  are fast, mobile-friendly, and SEO-optimized.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <strong className="text-foreground font-bold">WhatsApp Marketing:</strong> Reach customers instantly with 
                  <Link to="/services/whatsapp-marketing-services" className="text-primary hover:underline font-bold"> WhatsApp marketing</Link> campaigns 
                  that boost engagement and conversions.
                </div>
              </div>
            </div>

            <p className="mt-6">
              Every strategy we create is <strong>custom-built for your business</strong> and the Hyderabad market. We don't 
              believe in cookie-cutter solutions—your business is unique, and your digital marketing should be too.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary/20 via-card to-background text-foreground rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-gold border border-primary/30">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Get a Free Digital Marketing Consultation
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto font-medium">
            Tell us about your business and goals. Our experts will analyze your current presence and 
            recommend the best digital marketing services to grow your business in Hyderabad.
          </p>
          <Button
            size="lg"
            className="bg-gradient-gold hover:opacity-95 text-primary-foreground font-bold text-lg px-10 py-6 group shadow-gold"
            onClick={handleWhatsApp}
          >
            💬 Chat on WhatsApp Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-muted-foreground font-medium mt-4">Free consultation • No obligations • Response within 5 minutes</p>
        </div>
      </section>

      <FAQSection faqs={faqs} pageUrl="https://www.naani.in/services" />
      
      <InternalLinkBlock
        text="See how our digital marketing strategies have delivered real results for Hyderabad businesses in our"
        linkUrl="/portfolio"
        linkTitle="Digital Marketing Portfolio - Client Success Stories Hyderabad"
        anchorText="portfolio of success stories"
      />
    </>
  );
};

export default ServicesPage;
