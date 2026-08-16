import Header from "@/components/Header";
import TestimonialsContent from "@/components/TestimonialsContent";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import InternalLinkBlock from "@/components/InternalLinkBlock";

const TestimonialsPage = () => {
  const faqs = [
    {
      question: "Where can I find verified reviews about Naani Projects?",
      answer: "You can find genuine client testimonials on this page, our Google My Business profile, Facebook page, and LinkedIn company page. We maintain a 4.9/5 rating from satisfied Hyderabad businesses across multiple platforms."
    },
    {
      question: "What results have your clients achieved with Naani Projects?",
      answer: "Our clients have achieved remarkable results: 320% more leads for real estate, 150% patient growth for healthcare, 2x reservations for restaurants, and 500+ B2B leads for IT startups. Every testimonial is backed by real, measurable outcomes."
    },
    {
      question: "Are these testimonials from real Hyderabad businesses?",
      answer: "Yes, all testimonials are from verified clients who have worked with Naani Projects. We can provide contact references upon request for serious inquiries looking to validate our work."
    },
    {
      question: "Can I speak with a past client before hiring Naani Projects?",
      answer: "Absolutely! We're confident in our work and happy to connect you with past clients (with their permission) who operate in similar industries. Contact us on WhatsApp to arrange a reference call."
    },
    {
      question: "Which industries have given positive reviews to Naani Projects?",
      answer: "Our testimonials span diverse industries including real estate, healthcare clinics, restaurants, salons, IT startups, manufacturing, and service businesses in Hyderabad. This showcases our versatility across sectors."
    },
    {
      question: "Why do Hyderabad businesses trust Naani Projects?",
      answer: "Businesses trust us for our transparent communication, results-driven approach, local expertise, and dedicated support. We focus on measurable ROI, not vanity metrics, and keep clients informed at every step."
    },
    {
      question: "How can I share my experience after working with Naani Projects?",
      answer: "We love hearing from our clients! After your campaign shows results, we'll invite you to share your experience. You can leave reviews on Google, Facebook, or provide a testimonial for our website."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Client Testimonials - Online Marketing Agency Hyderabad",
    "description": "Read real testimonials from Hyderabad businesses that achieved growth with Naani Projects's digital marketing services.",
    "url": "https://www.naani.in/testimonials",
    "about": {
      "@type": "Service",
      "serviceType": "Digital Marketing Services",
      "provider": {
        "@type": "Organization",
        "name": "Naani Projects",
        "url": "https://www.naani.in",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "14",
          "bestRating": "5"
        }
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Client Testimonials | Online Marketing Agency in Hyderabad"
        description="Don't take our word for it. Read real client testimonials and see why businesses choose Naani Projects as their online marketing agency in Hyderabad."
        canonicalUrl="https://www.naani.in/testimonials"
        keywords="digital marketing testimonials Hyderabad, client reviews, online marketing agency reviews, Naani Projects success stories"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TestimonialsContent />
        <FAQSection faqs={faqs} pageUrl="https://www.naani.in/testimonials" />
        <InternalLinkBlock
          text="Stay ahead with the latest digital marketing trends and insights from Hyderabad experts on our"
          linkUrl="/blogs"
          linkTitle="Digital Marketing Blog - Expert Campaigns & Tips Hyderabad"
          anchorText="marketing insights blog"
        />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default TestimonialsPage;
