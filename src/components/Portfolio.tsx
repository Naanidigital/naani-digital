import { Briefcase, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const caseStudies = [
  {
    title: "Restaurant Chain — Hyderabad",
    before: { leads: "~10/month", roi: "0.5x", visibility: "Page 5+" },
    after: { leads: "80+/month", roi: "5.2x", visibility: "Page 1" },
    growth: "700%",
    desc: "Complete digital overhaul — SEO, Google Ads, and social media strategy.",
  },
  {
    title: "Real Estate Developer",
    before: { leads: "~5/month", roi: "1x", visibility: "No rankings" },
    after: { leads: "50+/month", roi: "4.8x", visibility: "Top 3" },
    growth: "900%",
    desc: "Lead generation campaigns with targeted PPC and WhatsApp marketing.",
  },
  {
    title: "Healthcare Clinic — Kondapur",
    before: { leads: "~15/month", roi: "1.2x", visibility: "Page 3" },
    after: { leads: "120+/month", roi: "6x", visibility: "Featured Snippet" },
    growth: "500%",
    desc: "Local SEO domination with Google Business Profile optimization.",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Proven Track Record</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Real results from real businesses we've helped grow in Hyderabad.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12" staggerDelay={0.12}>
          {caseStudies.map((study, i) => (
            <StaggerItem key={i}>
              <div className="glass-card p-6 space-y-5 hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">{study.title}</h3>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">+{study.growth}</span>
                </div>
                <p className="text-sm text-secondary">{study.desc}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-3">
                    <p className="text-xs text-destructive font-medium mb-2">Before</p>
                    <p className="text-sm text-secondary">Leads: <span className="text-foreground font-medium">{study.before.leads}</span></p>
                    <p className="text-sm text-secondary">ROI: <span className="text-foreground font-medium">{study.before.roi}</span></p>
                    <p className="text-sm text-secondary">Rank: <span className="text-foreground font-medium">{study.before.visibility}</span></p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                    <p className="text-xs text-primary font-medium mb-2">After</p>
                    <p className="text-sm text-secondary">Leads: <span className="text-primary font-bold">{study.after.leads}</span></p>
                    <p className="text-sm text-secondary">ROI: <span className="text-primary font-bold">{study.after.roi}</span></p>
                    <p className="text-sm text-secondary">Rank: <span className="text-primary font-bold">{study.after.visibility}</span></p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Overall stats */}
        <ScrollReveal variant="zoomIn">
          <div className="glass-card p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground">Proudly Serving Hyderabad Since 2022</h3>
            </div>
            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
              {[
                { icon: TrendingUp, value: "50+", label: "Successful Campaigns" },
                { icon: Users, value: "14+", label: "Happy Clients" },
                { icon: Briefcase, value: "100%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <StaggerItem key={i}>
                  <div className="text-center space-y-2 group">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <stat.icon className="text-primary" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-gold-gradient">{stat.value}</p>
                    <p className="text-sm text-secondary">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="text-center mt-8">
              <div className="inline-block px-8 py-4 rounded-xl bg-gold-purple">
                <p className="text-xl font-bold text-primary-foreground">Will you be the next success story?</p>
              </div>
            </div>
            <p className="text-sm text-secondary italic pt-4 text-center">
              Detailed case studies and portfolio samples available upon request
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Portfolio;