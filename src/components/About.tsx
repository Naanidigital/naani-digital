import { Award, Users, Target, Sparkles, TrendingUp, Shield, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const stats = [
  { icon: Award, label: "Years of Excellence", value: "3+" },
  { icon: Users, label: "Happy Clients", value: "14+" },
  { icon: Target, label: "Campaigns Completed", value: "50+" },
  { icon: Sparkles, label: "Client Satisfaction", value: "100%" },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal variant="slideLeft">
            <div className="space-y-6">
              <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">About Naani Projects</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Hyderabad's Trusted{" "}
                <span className="text-gold-gradient">Digital Growth Partner</span>{" "}
                Since 2022
              </h2>
              <p className="text-lg text-secondary leading-relaxed">
                At <Link to="/" className="text-primary hover:underline font-semibold">Naani Projects</Link>,
                we're more than just a digital marketing agency—we're your dedicated partners in growth.
                Our professional team combines creativity, strategy, and technical expertise to deliver
                <strong className="text-foreground"> measurable results</strong> that directly impact your bottom line.
              </p>
              <p className="text-lg text-secondary leading-relaxed">
                Whether you're a local shop in Kondapur, a growing startup in HITEC City, or an established
                enterprise in Banjara Hills, we craft tailored digital strategies that align with your unique
                business goals.
              </p>
              <div className="pt-4">
                <div className="glass-card inline-block px-6 py-4">
                  <p className="text-primary font-semibold text-lg">
                    💼 Proudly serving 14+ clients across diverse industries in Hyderabad
                  </p>
                  <p className="text-secondary text-sm mt-2">
                    From startups to established businesses—will you be the next success story?
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.12}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={index}>
                  <div className="glass-card p-6 text-center space-y-3 group hover:-translate-y-2 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold-purple p-[2px]">
                      <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                        <Icon className="text-primary transition-transform duration-300 group-hover:scale-110" size={24} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gold-gradient">{stat.value}</div>
                    <div className="text-sm text-secondary font-medium">{stat.label}</div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <StaggerContainer className="mt-16 grid md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {[
            { icon: TrendingUp, title: "ROI-Focused", desc: "Every campaign is designed to maximize your return on investment with data-driven strategies." },
            { icon: Shield, title: "Transparent", desc: "Clear reporting, no hidden fees. You always know exactly where your marketing budget goes." },
            { icon: Clock, title: "24/7 Support", desc: "Available round the clock via WhatsApp, phone, or email. Your growth never sleeps." },
            { icon: Zap, title: "Fast Results", desc: "Quick turnaround times. PPC campaigns launch in days, not weeks. Growth starts immediately." },
          ].map((item, index) => (
            <StaggerItem key={index}>
              <div className="glass-card p-6 space-y-3 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <item.icon className="text-accent transition-transform duration-300 group-hover:scale-110" size={20} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-secondary text-sm">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default About;