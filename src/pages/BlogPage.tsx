import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEOHead from "../components/SEOHead";
import FAQSection from "../components/FAQSection";
import InternalLinkBlock from "../components/InternalLinkBlock";
import BlogContent from "../components/BlogContent";

const BlogPage = () => {
  const faqs = [
    {
      question: "What topics does the Naani Projects blog cover?",
      answer: "Our blog covers actionable digital marketing strategies including SEO, PPC advertising, social media marketing, content marketing, website design tips, and industry-specific guides. Every article is focused on helping Hyderabad businesses grow."
    },
    {
      question: "How can your blog help my Hyderabad business stay competitive?",
      answer: "We share the latest digital marketing trends, algorithm updates, and proven strategies tested in the Hyderabad market. By following our blog, you gain insights that can be immediately applied to improve your campaigns and ROI."
    },
    {
      question: "Are your blog articles suitable for beginners?",
      answer: "Yes! Our content caters to all skill levels. We write step-by-step guides for beginners and advanced strategies for experienced marketers. Each article is clearly labeled so you can find content at your level."
    },
    {
      question: "Can I request a specific topic for your digital marketing blog?",
      answer: "Absolutely! We welcome topic suggestions from our readers. If there's a specific digital marketing challenge you're facing, contact us and we'll consider covering it in a future article."
    },
    {
      question: "How often do you publish new marketing articles?",
      answer: "We publish new articles regularly to keep our content fresh and relevant. Subscribe to our newsletter to get notified whenever we publish new insights and strategies."
    },
    {
      question: "Do you provide industry-specific marketing guides?",
      answer: "Yes! We create guides tailored to specific industries including real estate, healthcare, restaurants, salons, IT, and manufacturing. These guides address unique marketing challenges each industry faces in Hyderabad."
    },
    {
      question: "Can I implement your blog strategies myself or do I need an agency?",
      answer: "Our articles are designed to be actionable so you can implement them yourself. However, if you'd prefer expert execution, Naani Projects offers full-service digital marketing packages to handle everything for you."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Naani Projects Marketing Blog",
    "description": "Learn winning digital marketing campaigns that generate leads and sales. Expert insights from Naani Projects's high-impact marketing blog.",
    "url": "https://www.naani.in/blogs",
    "publisher": {
      "@type": "Organization",
      "name": "Naani Projects",
      "url": "https://www.naani.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.naani.in/naani-logo-full.webp"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Digital Marketing Campaigns | Naani Projects Marketing Blog"
        description="Learn winning digital marketing campaigns that generate leads and sales. Read expert insights from Naani Projects's high-impact marketing blog."
        canonicalUrl="https://www.naani.in/blogs"
        keywords="digital marketing blog, marketing campaigns, SEO tips, social media marketing, PPC strategies, Hyderabad marketing blog"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <BlogContent />
        <FAQSection faqs={faqs} pageUrl="https://www.naani.in/blogs" />
        <InternalLinkBlock
          text="Ready to take action? Get a free consultation with our Hyderabad marketing experts."
          linkUrl="/contact-us"
          linkTitle="Contact Naani Projects - Free Marketing Consultation Hyderabad"
          anchorText="Contact us today"
        />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default BlogPage;
