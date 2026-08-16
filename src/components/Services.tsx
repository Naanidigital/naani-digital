import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open("https://wa.me/918185856789?text=Hi%2C%20I%20want%20to%20discuss%20digital%20marketing%20services%20for%20my%20business", "_blank");
  };

  return (
    <section id="services" className="py-24 relative bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Complete Digital Marketing Solutions in Hyderabad
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              From strategy to execution, <Link to="/" className="text-primary hover:underline font-semibold">Naani Projects</Link> provides
              everything your business needs to dominate the digital landscape. <strong className="text-foreground">All under one roof.</strong>
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.08}>
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === index;
            return (
              <StaggerItem key={index}>
                <div
                  className={`glass-card group cursor-pointer transition-all duration-300 hover:-translate-y-2 p-6 text-center space-y-4 ${
                    isActive ? "border-primary/40 shadow-gold" : ""
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() => navigate(`/services/${service.slug}`)}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(43_67%_52%/0.2)]">
                    <Icon className="text-primary transition-transform duration-300 group-hover:scale-110" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm text-secondary">{service.shortDescription}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal variant="zoomIn" delay={0.2}>
          <div className="mt-16 glass-card p-8 md:p-10 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Need a Custom Solution for Your Hyderabad Business?</h3>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Every business is unique. Tell us about your goals, and we'll create a tailored digital marketing strategy that fits your budget.
            </p>
            <Button
              size="lg"
              className="bg-gradient-gold text-primary-foreground text-lg px-8 py-5 group hover:scale-105 transition-all duration-300 hover:shadow-gold-lg font-semibold"
              onClick={handleWhatsApp}
            >
              💬 Discuss Your Project on WhatsApp
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
              Why <Link to="/" className="text-primary hover:underline">Naani Projects</Link> for Digital Marketing in Hyderabad?
            </h3>
            <div className="prose prose-lg max-w-none text-secondary space-y-4 text-center">
              <p>
                We don't believe in one-size-fits-all solutions. Our team analyzes your business, understands
                your competition in Hyderabad, and creates <strong className="text-foreground">custom strategies</strong> that drive measurable results.
                Whether you need <Link to="/services/seo-services" className="text-primary hover:underline">SEO services</Link>,{" "}
                <Link to="/services/pay-per-click-ads" className="text-primary hover:underline">PPC campaigns</Link>, or{" "}
                <Link to="/services/social-media-marketing" className="text-primary hover:underline">social media marketing</Link>—we've got you covered.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;