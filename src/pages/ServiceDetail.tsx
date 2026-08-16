import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ArrowRight, MessageCircle, Phone, Target, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import InternalLinkBlock from "@/components/InternalLinkBlock";
import { servicesData } from "@/data/servicesData";
import { serviceSEOData } from "@/data/serviceSEOData";

// Internal linking map for service pages
const serviceInternalLinks: Record<string, { text: string; linkUrl: string; linkTitle: string; anchorText: string }[]> = {
  "seo-services": [
    {
      text: "Want instant leads while your SEO builds? Explore our high-ROI",
      linkUrl: "/services/pay-per-click-ads",
      linkTitle: "Pay Per Click Campaigns in Hyderabad - Google Ads Management",
      anchorText: "PPC and paid advertising services"
    },
    {
      text: "Boost your online presence further with",
      linkUrl: "/services/social-media-marketing",
      linkTitle: "Social Media Marketing in Hyderabad - SMM Strategy",
      anchorText: "social media marketing strategies"
    }
  ],
  "pay-per-click-ads": [
    {
      text: "Build long-term organic visibility alongside your ads with our",
      linkUrl: "/services/seo-services",
      linkTitle: "SEO Services in Hyderabad - SEO Agency",
      anchorText: "SEO services in Hyderabad"
    },
    {
      text: "Convert your ad traffic better with a",
      linkUrl: "/services/website-design-services",
      linkTitle: "Best Website Design Services in Hyderabad",
      anchorText: "professionally designed website"
    }
  ],
  "social-media-marketing": [
    {
      text: "Need a website that converts your social traffic? Check out our",
      linkUrl: "/services/website-design-services",
      linkTitle: "Website Design & Development Services Hyderabad - Custom Web Solutions",
      anchorText: "custom website design services"
    },
    {
      text: "Amplify your reach with",
      linkUrl: "/services/influencer-marketing",
      linkTitle: "Influencer Marketing Services in Hyderabad",
      anchorText: "influencer marketing partnerships"
    }
  ],
  "website-design-services": [
    {
      text: "Keep your website fresh with engaging content. Learn about our",
      linkUrl: "/services/content-management",
      linkTitle: "Content Management Services Hyderabad - Professional Content Writing",
      anchorText: "content management solutions"
    },
    {
      text: "Drive traffic to your new website with",
      linkUrl: "/services/seo-services",
      linkTitle: "SEO Services in Hyderabad - SEO Agency",
      anchorText: "SEO optimization services"
    }
  ],
  "content-management": [
    {
      text: "Build authority and attract leads with strategic",
      linkUrl: "/services/content-marketing-services",
      linkTitle: "Content Marketing Services Hyderabad - Content Strategy",
      anchorText: "content marketing services"
    },
    {
      text: "Improve your content's search rankings with our",
      linkUrl: "/services/seo-services",
      linkTitle: "SEO Services in Hyderabad - SEO Agency",
      anchorText: "SEO optimization expertise"
    }
  ],
  "google-facebook-ads-experts": [
    {
      text: "Maximize your ad ROI with landing pages from our",
      linkUrl: "/services/website-design-services",
      linkTitle: "Best Website Design Services in Hyderabad",
      anchorText: "website design team"
    },
    {
      text: "Complement paid ads with organic growth through",
      linkUrl: "/services/seo-services",
      linkTitle: "SEO Services in Hyderabad - SEO Agency",
      anchorText: "SEO services"
    }
  ],
  "graphic-design-services": [
    {
      text: "Build a complete brand identity in Hyderabad. Discover our",
      linkUrl: "/services/content-marketing-services",
      linkTitle: "Branding & Content Marketing Hyderabad - Brand Identity Design",
      anchorText: "branding and content marketing expertise"
    },
    {
      text: "Use your designs effectively with",
      linkUrl: "/services/social-media-marketing",
      linkTitle: "Social Media Marketing in Hyderabad",
      anchorText: "strategic social media marketing"
    }
  ],
  "content-marketing-services": [
    {
      text: "Amplify your content with",
      linkUrl: "/services/social-media-marketing",
      linkTitle: "Social Media Marketing in Hyderabad",
      anchorText: "social media distribution"
    },
    {
      text: "Ensure your content ranks with professional",
      linkUrl: "/services/seo-services",
      linkTitle: "SEO Services in Hyderabad - SEO Agency",
      anchorText: "SEO optimization"
    }
  ],
  "whatsapp-marketing-services": [
    {
      text: "Generate leads for your WhatsApp campaigns with",
      linkUrl: "/services/pay-per-click-ads",
      linkTitle: "Pay Per Click Campaigns in Hyderabad",
      anchorText: "targeted PPC advertising"
    },
    {
      text: "Capture leads on your website with proper",
      linkUrl: "/services/website-design-services",
      linkTitle: "Best Website Design Services in Hyderabad",
      anchorText: "website design optimization"
    }
  ],
  "influencer-marketing": [
    {
      text: "Build your brand presence alongside influencer campaigns with",
      linkUrl: "/services/social-media-marketing",
      linkTitle: "Social Media Marketing in Hyderabad",
      anchorText: "social media marketing"
    },
    {
      text: "Stay updated with the latest digital marketing trends on our",
      linkUrl: "/blogs",
      linkTitle: "Digital Marketing Blog - Expert Tips and Trends Hyderabad",
      anchorText: "marketing insights blog"
    }
  ]
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const service = servicesData.find(s => s.slug === slug);
  const seoData = serviceSEOData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  const handleWhatsApp = () => {
    const message = `Hi Naani Projects! I'm interested in your ${service.title}. Can we discuss how you can help my business grow?`;
    window.open(`https://wa.me/919502541934?text=${encodeURIComponent(message)}`, "_blank");
  };

  const structuredData = seoData ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDescription,
    "url": seoData.canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "Naani Projects",
      "url": "https://www.naani.in",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "India"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.approach.map((item, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      }))
    }
  } : undefined;

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const internalLinks = slug ? serviceInternalLinks[slug] || [] : [];

  return (
    <>
      {seoData && (
        <SEOHead
          title={seoData.title}
          description={seoData.description}
          canonicalUrl={seoData.canonicalUrl}
          keywords={seoData.keywords}
          structuredData={structuredData}
        />
      )}
      
      <div className="min-h-screen bg-background">
        <Header />
        <WhatsAppButton />
      
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <Button
              variant="ghost"
              onClick={() => navigate("/services")}
              className="mb-8 hover:bg-secondary"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Services
            </Button>

            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-rainbow p-[2px] mb-6">
                <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                  <Icon className="text-accent" size={36} />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{service.shortDescription}</p>
              
              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Chat on WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                >
                  <Phone className="mr-2" size={20} />
                  Get Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Why Your Hyderabad Business Needs {service.title.replace(' in Hyderabad', '')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.overview}
              </p>
              
              {/* Link to Naani Projects */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                At <Link to="/" className="text-primary font-semibold hover:underline" title="Naani Projects - Best Digital Marketing Agency in Hyderabad">Naani Projects</Link>, we've helped hundreds of Hyderabad businesses achieve their growth goals through strategic digital marketing. Our {service.title.toLowerCase()} are designed to deliver measurable results, not just vanity metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Our {service.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.benefits.map((benefit, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="text-primary" size={18} />
                        </div>
                        <p className="text-muted-foreground">{benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA Block 1 */}
        <section className="py-12 bg-gradient-to-r from-[#25D366] to-[#128C7E]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Grow Your Business with {service.title}?
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Chat with our experts on WhatsApp and get a free consultation. No obligation, just honest advice on how we can help.
            </p>
            <Button
              size="lg"
              className="bg-white text-[#25D366] hover:bg-white/90"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="mr-2" size={20} />
              Start WhatsApp Chat Now
            </Button>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Approach to {service.title}</h2>
              <Card>
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    {service.approach.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-accent font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-lg text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">How We Work</h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                Our proven process ensures you get results without the hassle. Here's how we deliver {service.title.toLowerCase()} for Hyderabad businesses:
              </p>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {service.process.map((step, index) => {
                  const [title, description] = step.split(': ');
                  return (
                    <div key={index} className="relative">
                      <Card className="h-full">
                        <CardContent className="p-5 text-center">
                          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                            {index + 1}
                          </div>
                          <h3 className="font-semibold mb-2">{title}</h3>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </CardContent>
                      </Card>
                      {index < service.process.length - 1 && (
                        <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground/30" size={24} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">Industries We Serve in Hyderabad</h2>
              <p className="text-center text-muted-foreground mb-10">
                Our {service.title.toLowerCase()} have helped businesses across various industries in Hyderabad achieve remarkable growth.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.industries.map((industry, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                    <Target className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-muted-foreground">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Naani Projects */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose <Link to="/" className="text-primary hover:underline" title="Naani Projects Home">Naani Projects</Link> for {service.title}?</h2>
              <Card>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {service.whyNaani}
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Users className="text-primary" size={24} />
                      </div>
                      <h4 className="font-semibold">100+ Clients</h4>
                      <p className="text-sm text-muted-foreground">in Hyderabad</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="text-primary" size={24} />
                      </div>
                      <h4 className="font-semibold">300%+ Growth</h4>
                      <p className="text-sm text-muted-foreground">Average Traffic</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Award className="text-primary" size={24} />
                      </div>
                      <h4 className="font-semibold">Certified Team</h4>
                      <p className="text-sm text-muted-foreground">Google & Meta</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <MessageCircle className="text-primary" size={24} />
                      </div>
                      <h4 className="font-semibold">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">via WhatsApp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA Block 2 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Your Free {service.title.replace(' in Hyderabad', '')} Consultation
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop losing customers to competitors. Let <Link to="/" className="text-primary font-semibold hover:underline" title="Naani Projects - Digital Marketing Agency Hyderabad">Naani Projects</Link> help your Hyderabad business grow with proven {service.title.toLowerCase()}. Message us on WhatsApp for a free, no-obligation consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg px-8 py-6"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="mr-2" size={24} />
                  WhatsApp Us Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                  onClick={scrollToContact}
                >
                  Fill Contact Form
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                ✓ Free consultation ✓ No obligation ✓ Response within 1 hour
              </p>
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        {internalLinks.length > 0 && (
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-center">Explore Related Services</h3>
                <div className="space-y-4">
                  {internalLinks.map((link, index) => (
                    <InternalLinkBlock
                      key={index}
                      text={link.text}
                      linkUrl={link.linkUrl}
                      linkTitle={link.linkTitle}
                      anchorText={link.anchorText}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <Contact />
        
        {/* FAQ Section */}
        {seoData && (
          <FAQSection faqs={seoData.faqs} pageUrl={seoData.canonicalUrl} />
        )}
        
        <Footer />
      </div>
    </>
  );
};

export default ServiceDetail;
