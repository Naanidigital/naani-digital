import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Users, Target, BarChart3, Award, CheckCircle, MessageCircle, ArrowRight, Building2, Stethoscope, UtensilsCrossed, Scissors, Factory, Monitor, Wrench } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const PortfolioContent = () => {
  const industries = [
    { icon: Building2, name: "Real Estate", projects: "5+" },
    { icon: Stethoscope, name: "Healthcare & Clinics", projects: "3+" },
    { icon: UtensilsCrossed, name: "Restaurants & Food", projects: "4+" },
    { icon: Scissors, name: "Salons & Beauty", projects: "2+" },
    { icon: Factory, name: "Manufacturing", projects: "3+" },
    { icon: Monitor, name: "IT & Software", projects: "4+" },
    { icon: Wrench, name: "Service Industry", projects: "5+" },
  ];

  const caseStudyHighlights = [
    {
      title: "Real Estate Lead Generation",
      result: "320% increase in qualified leads",
      description: "A leading Hyderabad property developer saw massive growth in enquiries through our SEO and Google Ads strategy.",
    },
    {
      title: "Restaurant Social Media Success",
      result: "2x table reservations",
      description: "A popular Hyderabad restaurant chain doubled their bookings with our Instagram and Facebook marketing campaigns.",
    },
    {
      title: "Healthcare Clinic Growth",
      result: "150% more patient appointments",
      description: "A multi-specialty clinic in Hyderabad achieved top Google rankings and consistent patient flow through our SEO services.",
    },
    {
      title: "IT Startup Brand Launch",
      result: "500+ leads in 60 days",
      description: "A Hyderabad tech startup generated massive B2B leads through our LinkedIn marketing and content strategy.",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Best Digital Marketing Agency Portfolio in Hyderabad
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Looking for proof that digital marketing works? You're in the right place. At{" "}
            <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link>, 
            we don't just promise results—we deliver them. Our portfolio showcases real campaigns, 
            real businesses in Hyderabad, and real growth. From startups to established enterprises, 
            we've helped 14+ clients across diverse industries achieve measurable success.
          </p>
          <p className="text-muted-foreground">
            Whether you need <Link to="/services/seo-services" className="text-accent hover:underline">SEO services in Hyderabad</Link>, 
            {" "}<Link to="/services/pay-per-click-ads" className="text-accent hover:underline">PPC campaigns</Link>, 
            {" "}or <Link to="/services/social-media-marketing" className="text-accent hover:underline">social media marketing</Link>—our 
            track record speaks for itself. Explore our work and see why Hyderabad businesses trust us.
          </p>
        </div>

        {/* Stats Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-accent/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-rainbow p-[2px]">
                <div className="bg-card p-12 text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-rainbow p-[2px]">
                    <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                      <Briefcase className="text-accent" size={32} />
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold">
                    Proudly Serving Hyderabad Since 2022
                  </h2>

                  <p className="text-xl text-muted-foreground">
                    We've delivered exceptional results for{" "}
                    <span className="text-accent font-bold">14+ unique clients</span> across diverse industries
                  </p>

                  <div className="grid md:grid-cols-4 gap-8 pt-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                        <TrendingUp className="text-accent" size={24} />
                      </div>
                      <p className="text-2xl font-bold">50+</p>
                      <p className="text-sm text-muted-foreground">Successful Campaigns</p>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                        <Users className="text-accent" size={24} />
                      </div>
                      <p className="text-2xl font-bold">14+</p>
                      <p className="text-sm text-muted-foreground">Happy Clients</p>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                        <Target className="text-accent" size={24} />
                      </div>
                      <p className="text-2xl font-bold">₹2Cr+</p>
                      <p className="text-sm text-muted-foreground">Revenue Generated</p>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                        <Award className="text-accent" size={24} />
                      </div>
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What Makes Our Portfolio Different */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Makes Our Portfolio Different?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">100% Hyderabad-Focused</h3>
                <p className="text-muted-foreground text-sm">Every campaign is tailored for Hyderabad businesses with local SEO, regional targeting, and city-specific strategies.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Measurable Results</h3>
                <p className="text-muted-foreground text-sm">We track every metric—traffic, leads, conversions, and ROI. No vanity metrics, only business-impacting data.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Multi-Industry Expertise</h3>
                <p className="text-muted-foreground text-sm">From real estate to restaurants, healthcare to IT—we understand what works in each industry.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Full-Service Campaigns</h3>
                <p className="text-muted-foreground text-sm">SEO, PPC, social media, website design, content marketing—we handle everything under one roof.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Industries We've Served */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Industries We've Served in Hyderabad</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our diverse portfolio spans across Hyderabad's most competitive industries. 
            <Link to="/" className="text-accent hover:underline ml-1">Naani Projects</Link> adapts to each industry's unique challenges.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-3">
                  <industry.icon className="text-accent" size={24} />
                </div>
                <p className="font-semibold text-sm">{industry.name}</p>
                <p className="text-xs text-muted-foreground">{industry.projects} Projects</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Highlights */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Campaign Success Highlights</h2>
          <p className="text-center text-muted-foreground mb-8">
            Real results from real Hyderabad businesses. These are just a few examples of what we've achieved.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudyHighlights.map((study, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="text-accent" size={20} />
                    <span className="text-accent font-bold">{study.result}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{study.title}</h3>
                  <p className="text-muted-foreground text-sm">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6 italic">
            Detailed case studies with full metrics available upon request
          </p>
        </div>

        {/* Our Process */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How We Deliver Results</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Discovery & Audit", desc: "We analyze your current digital presence, competitors, and market opportunities in Hyderabad." },
              { step: "2", title: "Strategy Development", desc: "Custom marketing strategy aligned with your business goals, budget, and target audience." },
              { step: "3", title: "Execution & Optimization", desc: "We launch campaigns, continuously test, and optimize for maximum ROI." },
              { step: "4", title: "Reporting & Scaling", desc: "Transparent monthly reports with actionable insights. We scale what works." },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-foreground font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-8 text-center">
              <MessageCircle className="mx-auto text-accent mb-4" size={40} />
              <h2 className="text-2xl font-bold mb-4">Want to See Your Industry Case Study?</h2>
              <p className="text-muted-foreground mb-6">
                Contact us on WhatsApp for detailed portfolio samples and case studies specific to your industry. 
                Let's discuss how <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link> can 
                deliver similar results for your Hyderabad business.
              </p>
              <a 
                href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20want%20to%20see%20portfolio%20samples%20for%20my%20industry."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                  <MessageCircle className="mr-2" size={20} />
                  Request Case Studies on WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Hyderabad Businesses Choose Naani Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                <Target className="text-accent" size={24} />
              </div>
              <h3 className="font-bold mb-2">ROI-Focused</h3>
              <p className="text-muted-foreground text-sm">Every rupee spent is tracked. We optimize for leads and revenue, not vanity metrics.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                <Users className="text-accent" size={24} />
              </div>
              <h3 className="font-bold mb-2">Dedicated Team</h3>
              <p className="text-muted-foreground text-sm">You get a dedicated account manager who understands your business inside-out.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                <TrendingUp className="text-accent" size={24} />
              </div>
              <h3 className="font-bold mb-2">Proven Growth</h3>
              <p className="text-muted-foreground text-sm">50+ successful campaigns with measurable results across Hyderabad industries.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-8 py-6 rounded-xl bg-gradient-rainbow">
            <p className="text-xl font-bold text-primary-foreground mb-2">
              Will You Be Our Next Success Story?
            </p>
            <p className="text-primary-foreground/80 text-sm">
              Join 14+ Hyderabad businesses that trusted us with their growth
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                <MessageCircle className="mr-2" size={20} />
                Start Your Project Today
              </Button>
            </a>
            <Link to="/testimonials">
              <Button size="lg" variant="outline">
                Read Client Reviews <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioContent;
