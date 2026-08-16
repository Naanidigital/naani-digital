import Header from "@/components/Header";
import PortfolioContent from "@/components/PortfolioContent";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import InternalLinkBlock from "@/components/InternalLinkBlock";

const PortfolioPage = () => {
  const faqs = [
    {
      question: "What kind of results has Naani Projects achieved for Hyderabad businesses?",
      answer: "We've delivered exceptional results across industries: 320% increase in leads for real estate, 150% patient growth for healthcare clinics, 2x table reservations for restaurants, and 500+ B2B leads for IT startups. Every campaign is designed for measurable ROI."
    },
    {
      question: "Which industries does Naani Projects work with in Hyderabad?",
      answer: "We specialize in serving startups, real estate developers, doctors and clinics, restaurants, salons, manufacturing companies, IT firms, and service businesses in Hyderabad. Our team quickly adapts to understand each industry's unique marketing needs."
    },
    {
      question: "Can I see detailed case studies for my specific industry?",
      answer: "Absolutely! We provide detailed case studies with full metrics upon request. Contact us on WhatsApp and we'll share relevant portfolio samples and results specific to your industry."
    },
    {
      question: "How do you measure success for digital marketing campaigns?",
      answer: "We track ROI-focused KPIs including website traffic, lead generation, conversion rates, cost per acquisition, and revenue attribution. You receive transparent monthly reports showing exactly how your investment is performing."
    },
    {
      question: "What makes Naani Projects's portfolio different from other agencies?",
      answer: "Our portfolio is 100% Hyderabad-focused with real, verifiable results. We don't pad our numbers with vanity metrics—every stat represents actual business impact for local businesses just like yours."
    },
    {
      question: "How many successful campaigns has Naani Projects completed?",
      answer: "Since 2022, we've completed 50+ successful campaigns across 14+ clients in Hyderabad. Our campaigns span SEO, PPC, social media marketing, website design, and content marketing."
    },
    {
      question: "Do you have experience with startup marketing in Hyderabad?",
      answer: "Yes! Startups are one of our core focus areas. We understand the unique challenges of limited budgets and aggressive growth targets. We've helped multiple Hyderabad startups generate leads and scale efficiently."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Digital Marketing Agency Portfolio - Hyderabad",
    "description": "See real results from Naani Projects's digital marketing campaigns. Portfolio showcasing SEO, PPC, social media success stories from Hyderabad businesses.",
    "url": "https://www.naani.in/portfolio",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Real Estate Lead Generation",
          "description": "320% increase in qualified leads for Hyderabad property developer"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Healthcare Clinic Growth",
          "description": "150% more patient appointments through SEO services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Restaurant Social Media Success",
          "description": "2x table reservations through Instagram and Facebook marketing"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Our Portfolio | Best Digital Marketing Agency in Hyderabad"
        description="See real results, not promises. Explore our portfolio and discover why Naani Projects is a top digital marketing agency in Hyderabad."
        canonicalUrl="https://www.naani.in/portfolio"
        keywords="digital marketing portfolio Hyderabad, agency case studies, SEO results, PPC success stories, social media campaigns Hyderabad"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <PortfolioContent />
        <FAQSection faqs={faqs} pageUrl="https://www.naani.in/portfolio" />
        <InternalLinkBlock
          text="Hear directly from our satisfied clients across Hyderabad. Read their"
          linkUrl="/testimonials"
          linkTitle="Client Testimonials - Online Marketing Agency Reviews Hyderabad"
          anchorText="testimonials and success experiences"
        />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default PortfolioPage;
