import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import ScrollReveal from "./ScrollReveal";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000)
});

const PinterestIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const v = contactSchema.parse(formData);
      const msg = `Name: ${encodeURIComponent(v.name)}%0AEmail: ${encodeURIComponent(v.email)}%0AMessage: ${encodeURIComponent(v.message)}`;
      window.open(`https://wa.me/918185856789?text=${msg}`, "_blank");
      toast({ title: "Message sent!", description: "We'll get back to you as soon as possible." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Validation Error", description: error.issues[0].message, variant: "destructive" });
      }
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 81858 56789", href: "tel:+918185856789" },
    { icon: Mail, label: "Email", value: "digitalnaani@gmail.com", href: "mailto:digitalnaani@gmail.com" },
    { icon: MapPin, label: "Location", value: "Hyderabad, Telangana", href: undefined },
  ];

  const socials = [
    { icon: Youtube, href: "https://www.youtube.com/@NaaniProjects?sub_confirmation=1", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/NaaniProjects/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/naaniprojects/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/naaniprojects/", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Let's Start Your Digital Journey</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Ready to transform your business? Contact us today and discover the Naani Projects difference.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ScrollReveal variant="slideLeft" delay={0.1}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>
                {contactInfo.map((info, i) => (
                  <div key={i} className="glass-card flex items-start gap-4 p-4 group hover:-translate-y-1 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-gold-purple p-[2px] flex-shrink-0">
                      <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                        <info.icon className="text-primary group-hover:scale-110 transition-transform" size={20} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-secondary hover:text-primary transition-colors">{info.value}</a>
                      ) : (
                        <p className="text-secondary">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-gold-purple p-[2px] hover:scale-110 transition-all duration-300 hover:shadow-gold"
                      aria-label={`Visit our ${social.label} page`}>
                      <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                        <social.icon className="text-primary" size={20} />
                      </div>
                    </a>
                  ))}
                  <a href="https://in.pinterest.com/naaniprojects/" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-gold-purple p-[2px] hover:scale-110 transition-all duration-300 hover:shadow-gold"
                    aria-label="Visit our Pinterest page">
                    <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                      <PinterestIcon size={20} className="text-primary" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideRight" delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">Your Name</label>
                <Input id="name" type="text" placeholder="John Doe" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} required maxLength={100}
                  className="bg-muted border-border focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Your Email</label>
                <Input id="email" type="email" placeholder="john@example.com" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} required maxLength={255}
                  className="bg-muted border-border focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">Your Message</label>
                <Textarea id="message" placeholder="Tell us about your project..." rows={6} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} required maxLength={1000}
                  className="bg-muted border-border focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-gold text-primary-foreground font-semibold hover:scale-[1.02] transition-all duration-300 hover:shadow-gold-lg">
                <MessageCircle className="mr-2" size={20} />
                Send Message via WhatsApp
              </Button>
              <p className="text-sm text-secondary text-center">Your message will open in WhatsApp for quick delivery</p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;