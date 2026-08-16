import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEOHead from "../components/SEOHead";
import InternalLinkBlock from "../components/InternalLinkBlock";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import FAQSection from "../components/FAQSection";
import { CheckCircle, Target, Users, Palette, DollarSign, BarChart3, Lightbulb, Wrench, Phone, MessageCircle } from "lucide-react";

const BlogPostFacebookAds = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = "https://www.naani.in/blogs/how-to-run-facebook-ads";
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Run Facebook Ads in Hyderabad (2026 Guide for Beginners & Businesses)",
    "description": "A complete guide explaining how to run Facebook Ads in Hyderabad with step-by-step setup, targeting, creatives, budgeting, and optimization tips for businesses.",
    "image": "https://www.naani.in/naani-logo-full.webp",
    "author": {
      "@type": "Organization",
      "name": "Naani Projects",
      "url": "https://www.naani.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Naani Projects",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.naani.in/naani-logo-full.webp"
      }
    },
    "datePublished": "2025-01-20",
    "dateModified": "2026-04-07",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "inLanguage": "en-IN",
    "keywords": "Facebook Ads Hyderabad, how to run Facebook ads, Facebook advertising guide, Facebook ads for real estate, digital marketing Hyderabad, Meta Ads Hyderabad"
  };

  // Single FAQ list used by both FAQSection component (which handles schema injection)
  const faqs = [
    {
      question: "How much budget do I need to start Facebook Ads?",
      answer: "You can start Facebook Ads with ₹100–₹300 per day. Start small, test creatives and audiences, and scale based on performance."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most campaigns show initial results within 3–7 days after the learning phase."
    },
    {
      question: "Do I need a website to run Facebook Ads?",
      answer: "No, you can run lead ads, WhatsApp ads, or Instagram DM ads without a website."
    },
    {
      question: "Which Facebook Ad objective works best for Hyderabad businesses?",
      answer: "For most Hyderabad businesses, Lead Generation and WhatsApp Ads work best. Real estate, local services, and startups see the highest ROI with these objectives."
    },
    {
      question: "Can I target specific areas in Hyderabad with Facebook Ads?",
      answer: "Yes! You can target specific areas like Banjara Hills, Jubilee Hills, Gachibowli, HITEC City, Kondapur, and Madhapur. You can also set a radius of 10–20 km around any location."
    },
    {
      question: "Is Facebook Ads better than Google Ads for lead generation?",
      answer: "Facebook Ads are excellent for generating awareness and leads at scale, especially for real estate and local services. Google Ads work better for high-intent search queries. The best strategy combines both."
    },
    {
      question: "How can Naani Projects help me with Facebook Ads?",
      answer: "Naani Projects is a performance-focused digital marketing agency in Hyderabad with 3+ years of experience in lead generation. We handle complete campaign setup, creative design, audience targeting, and optimization for maximum ROI."
    }
  ];

  const steps = [
    {
      icon: Users,
      title: "Define Your Goal",
      tip: "Before running ads, decide what you want — Leads, Website traffic, WhatsApp messages, or Brand awareness.",
      example: "For Hyderabad businesses, Lead Generation & WhatsApp Ads work best."
    },
    {
      icon: Target,
      title: "Set Up Facebook Ads Manager",
      tip: "Create your Facebook Business Manager, Ad Account, and connect your payment method.",
      example: "Go to Ads Manager → Create Campaign → Choose your objective."
    },
    {
      icon: DollarSign,
      title: "Budget Planning (Hyderabad Market)",
      tip: "Start with ₹100–₹300/day. Test multiple creatives. Scale based on performance.",
      example: "Hyderabad is competitive — so testing is key. Don't put all budget in one ad."
    },
    {
      icon: Users,
      title: "Target the Right Audience",
      tip: "For Hyderabad: Location + 10–20 km radius. Interests: Real estate, investment, business. Age: 25–55.",
      example: "You can also target NRI investors, high-income audiences, and business owners."
    },
    {
      icon: Palette,
      title: "Create High-Converting Ads",
      tip: "Use eye-catching image/video, clear offer, strong headline, and CTA (Call Now / WhatsApp / Book Now).",
      example: "\"Book with ₹1 Lakh & Get ₹1 Lakh Discount – Limited Offer!\""
    },
    {
      icon: BarChart3,
      title: "Launch & Optimize",
      tip: "Wait 3–7 days (learning phase). Analyze performance. Kill poor ads. Scale winning ads.",
      example: "If CTR is below 1%, change creatives or audience targeting."
    }
  ];

  const comparisonData = [
    { factor: "Objective", description: "Goal of your ad", example: "Leads, Sales, Traffic", action: "Choose based on business need" },
    { factor: "Audience", description: "Who sees your ad", example: "Hyderabad + 10km radius", action: "Test multiple segments" },
    { factor: "Creative", description: "How your ad looks", example: "Video demo / carousel", action: "Improve CTR with visuals" },
    { factor: "Budget", description: "Daily spend amount", example: "₹300–₹500/day", action: "Scale what works" },
    { factor: "Optimization", description: "How Meta learns", example: "Landing page views", action: "Switch if results drop" }
  ];

  const tools = [
    { name: "Meta Ads Manager", description: "Create and monitor campaigns" },
    { name: "Meta Pixel & CAPI", description: "Track conversions accurately" },
    { name: "Canva / Figma", description: "Design ad creatives" },
    { name: "Google Analytics", description: "Measure traffic and user behavior" },
    { name: "Facebook Ads Library", description: "Research competitor ads" }
  ];

  const pros = [
    "Highly targeted audience reach (area-specific in Hyderabad)",
    "Affordable for small businesses — start with ₹100/day",
    "Works for almost all industries — real estate, services, e-commerce",
    "Instant lead generation via WhatsApp & lead forms"
  ];

  const cons = [
    "Learning curve for beginners",
    "Requires continuous testing and optimization",
    "Creative fatigue can reduce performance over time"
  ];

  return (
    <>
      <SEOHead
        title="How to Run Facebook Ads in Hyderabad (2026 Guide) | Naani Projects"
        description="Learn how to run Facebook Ads in Hyderabad step-by-step. Complete guide covering setup, targeting, budgeting, creatives & optimization for businesses. Get leads & sales."
        canonicalUrl={canonicalUrl}
        keywords="Facebook Ads Hyderabad, how to run Facebook ads, Facebook advertising guide, Facebook ads for real estate, digital marketing Hyderabad, Meta Ads tutorial"
        ogType="article"
        structuredData={articleSchema}
      />
      
      {/* NO separate FAQ schema here — FAQSection component handles it */}
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12 md:py-16">
          <article className="max-w-5xl mx-auto">
            {/* Article Header */}
            <header className="mb-16 text-center pt-4">
              <div className="flex flex-wrap gap-2 mb-6 justify-center px-2">
                <Badge className="text-sm px-4 py-1.5 whitespace-nowrap">Facebook Ads</Badge>
                <Badge variant="outline" className="text-sm px-4 py-1.5 whitespace-nowrap">Hyderabad</Badge>
                <Badge variant="outline" className="text-sm px-4 py-1.5 whitespace-nowrap">2026 Guide</Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                How to Run Facebook Ads in Hyderabad (2026 Guide for Beginners & Businesses)
              </h1>
              
              <div className="flex items-center gap-4 text-muted-foreground justify-center mb-8">
                <time dateTime="2026-04-07" className="font-medium">April 7, 2026</time>
                <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                <span className="font-medium">12 min read</span>
              </div>
              
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full"></div>
            </header>

            {/* Intro / Key Takeaways */}
            <div className="mb-16">
              <Card className="p-8 bg-gradient-to-br from-primary/5 via-primary/10 to-background border-primary/20">
                <p className="text-lg leading-relaxed mb-6">
                  If you're a business owner in <strong>Hyderabad</strong> looking to generate high-quality leads, sales, or brand awareness, <strong>Facebook Ads</strong> can be a game-changer. Whether you're into real estate, interior design, local services, or e-commerce, Facebook Ads help you reach the right audience at the right time. In this guide, we'll explain how to run Facebook Ads in Hyderabad step-by-step — even if you're a beginner.
                </p>
                <div className="border-t border-primary/20 pt-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle className="text-primary" size={20} />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Target specific Hyderabad areas like Banjara Hills, Jubilee Hills, Gachibowli
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Reach people based on interests, income level, and behavior
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Generate instant leads via WhatsApp or lead forms — perfect for real estate, local businesses, startups
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Table of Contents */}
            <div className="mb-16">
              <Card className="p-6 border-border">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <nav className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {["Why Facebook Ads Work in Hyderabad", "Step-by-Step Guide", "Comparison Table", "Use Cases", "Expert Insights", "Tools & Resources", "Pros & Cons", "FAQs", "Work With Naani Projects"].map((item, index) => (
                    <a key={index} href={`#section-${index + 1}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {index + 1}. {item}
                    </a>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Why Facebook Ads Work in Hyderabad */}
            <section id="section-1" className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Facebook Ads Work in Hyderabad</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Hyderabad is one of India's fastest-growing digital markets. With millions of active users on Facebook and Instagram, you can target specific areas, reach people based on interests and income level, and generate instant leads via WhatsApp or forms.
              </p>
              <Card className="p-6 bg-muted/30">
                <h3 className="font-bold text-lg mb-4">This makes Facebook Ads perfect for:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {["Real estate projects", "Local businesses & services", "Service providers & consultants", "Startups & e-commerce"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="text-primary flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Step-by-Step Guide */}
            <section id="section-2" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Step-by-Step Guide to Running Facebook Ads</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3">
                          Step {index + 1}: {step.title}
                        </h3>
                        <div className="space-y-2 text-muted-foreground">
                          <p><strong className="text-foreground">Tip:</strong> {step.tip}</p>
                          <p><strong className="text-foreground">Example:</strong> {step.example}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Comparison Table */}
            <section id="section-3" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Facebook Ads Optimization Table</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full"></div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="border border-border p-3 text-left font-bold">Factor</th>
                      <th className="border border-border p-3 text-left font-bold">Description</th>
                      <th className="border border-border p-3 text-left font-bold">Example</th>
                      <th className="border border-border p-3 text-left font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                        <td className="border border-border p-3 font-medium">{row.factor}</td>
                        <td className="border border-border p-3 text-muted-foreground">{row.description}</td>
                        <td className="border border-border p-3 text-muted-foreground">{row.example}</td>
                        <td className="border border-border p-3 text-muted-foreground">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Use Cases */}
            <section id="section-4" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Use Cases for Hyderabad Businesses</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Running lead generation ads for real estate projects in Hyderabad",
                  "Driving online sales for e-commerce and D2C brands",
                  "Promoting local businesses, restaurants, gyms, and events in Hyderabad"
                ].map((useCase, index) => (
                  <Card key={index} className="p-6 text-center hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="text-primary" size={24} />
                    </div>
                    <p className="text-muted-foreground">{useCase}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Expert Insights */}
            <section id="section-5" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
                  <Lightbulb className="text-primary" size={32} />
                  Expert Insights
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full"></div>
              </div>
              
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-background border-primary/20">
                <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                  "As a performance marketer in Hyderabad, your biggest wins come from testing — not guessing. Start with broad audiences, monitor creative fatigue, and use Conversion API + Pixel for better tracking. The best campaigns scale when you follow data, not assumptions. For Hyderabad's competitive market, build multiple ad variations and let Meta's algorithm optimize toward the best performer."
                </blockquote>
                <p className="mt-4 font-bold text-primary">
                  — <Link to="/" className="hover:underline">Naani Projects Team | Naani.in</Link>
                </p>
              </Card>
            </section>

            {/* Tools and Resources */}
            <section id="section-6" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
                  <Wrench className="text-primary" size={32} />
                  Tools and Resources
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool, index) => (
                  <Card key={index} className="p-4 hover:border-primary/50 transition-colors">
                    <h3 className="font-bold mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Pros and Cons */}
            <section id="section-7" className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Pros and Cons of Facebook Ads</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-l-4 border-l-green-500">
                  <h3 className="font-bold text-lg mb-4 text-green-600">Pros</h3>
                  <ul className="space-y-2">
                    {pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </Card>
                
                <Card className="p-6 border-l-4 border-l-red-500">
                  <h3 className="font-bold text-lg mb-4 text-red-600">Cons</h3>
                  <ul className="space-y-2">
                    {cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            {/* CTA Section - Work With Naani Projects */}
            <section id="section-9" className="mb-16">
              <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Want Done-For-You Facebook Ads in Hyderabad?</h2>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    If you don't want to waste money testing ads, let experts handle it. <Link to="/" className="text-primary hover:underline font-semibold">Naani Projects</Link> helps businesses generate high-quality leads, real estate conversions, WhatsApp inquiries, and ROI-focused campaigns.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-xl mx-auto">
                    {["3+ Years Lead Gen Experience", "Hyderabad Market Expertise", "Performance-Based Strategy"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                        <CheckCircle className="text-primary flex-shrink-0" size={16} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+919705080909"
                      className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
                    >
                      <Phone size={20} />
                      Call: 9705 08 0909
                    </a>
                    <a
                      href="https://wa.me/919705080909?text=Hi%2C%20I%20need%20help%20with%20Facebook%20Ads%20for%20my%20business%20in%20Hyderabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
                    >
                      <MessageCircle size={20} />
                      WhatsApp Now
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    💡 Limited clients only — we focus on results, not volume.
                  </p>
                </div>
              </Card>
            </section>

            {/* Internal Links */}
            <section className="mb-12 space-y-4">
              <h3 className="text-xl font-bold mb-4">🔗 Explore More Resources</h3>
              <InternalLinkBlock
                text="Want to boost your brand visibility across Facebook and Instagram? Explore our"
                linkUrl="/services/social-media-marketing"
                linkTitle="Social Media Marketing Services in Hyderabad"
                anchorText="Social Media Marketing Services"
              />
              <InternalLinkBlock
                text="Looking for high-quality leads through paid advertising? Check out our"
                linkUrl="/services/pay-per-click-ads"
                linkTitle="PPC and Paid Ads Services in Hyderabad"
                anchorText="PPC & Paid Ads Services"
              />
              <InternalLinkBlock
                text="Need a complete digital marketing strategy for your Hyderabad business? Visit"
                linkUrl="/"
                linkTitle="Naani Projects - Digital Marketing Agency in Hyderabad"
                anchorText="Naani Projects homepage"
              />
            </section>
          </article>
        </main>

        {/* Single FAQSection — this component injects the only FAQPage schema */}
        <FAQSection faqs={faqs} pageUrl={canonicalUrl} />

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default BlogPostFacebookAds;
