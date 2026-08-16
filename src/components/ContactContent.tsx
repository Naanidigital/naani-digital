import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, ArrowRight, Building2, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import { saveLeadProfile, sendLeadToSheet, detectPageContext, LeadProfile } from "@/lib/leadProfile";

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    
    const profile: LeadProfile = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      lookingFor: "3 BHK",
      capturedAt: new Date().toISOString(),
    };
    
    saveLeadProfile(profile);
    const context = detectPageContext({ propertyName: "Contact Form Enquiry" });
    await sendLeadToSheet({ profile, context, leadSource: "Contact Page Form" });

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you! Your message has been received. Our team will contact you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-2">
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-rainbow bg-clip-text text-transparent pb-2">
            Digital Marketing Pricing Packages – Get a Free Consultation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to grow your business in Hyderabad? Contact{" "}
            <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link> today 
            for a free consultation. Whether you need{" "}
            <Link to="/services/seo-services" className="text-accent hover:underline">SEO services</Link>,{" "}
            <Link to="/services/social-media-marketing" className="text-accent hover:underline">social media marketing</Link>, or{" "}
            <Link to="/services/pay-per-click-ads" className="text-accent hover:underline">PPC campaigns</Link>—we 
            have flexible pricing packages designed for startups, SMBs, and enterprises.
          </p>
          <p className="text-muted-foreground">
            No hidden fees. No long-term contracts. Just transparent pricing and measurable results. 
            Let's discuss what works best for your budget and goals.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <Building2 className="mx-auto text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">14+</p>
            <p className="text-sm text-muted-foreground">Clients Served</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <Users className="mx-auto text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-muted-foreground">Satisfaction</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <Award className="mx-auto text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">₹2Cr+</p>
            <p className="text-sm text-muted-foreground">Revenue Generated</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <TrendingUp className="mx-auto text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">50+</p>
            <p className="text-sm text-muted-foreground">Campaigns</p>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA - Primary */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-8 text-center">
              <MessageCircle className="mx-auto text-accent mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-4">Fastest Way to Reach Us: WhatsApp</h2>
              <p className="text-muted-foreground mb-6">
                Get instant replies on WhatsApp. Share your requirements and get a custom quote within 2 hours. 
                Our team is available 7 days a week.
              </p>
              <a 
                href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20want%20to%20discuss%20digital%20marketing%20services%20and%20pricing%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                  <MessageCircle className="mr-2" size={20} />
                  Chat on WhatsApp Now – Get Free Quote
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-4">Response time: Usually within 30 minutes</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our services or pricing? Whether you prefer a call, email, or in-person meeting 
                at our Hyderabad office—we're here to help you grow your business.
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="bg-secondary/10 border-accent/20 hover:bg-secondary/20 transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone & WhatsApp</h3>
                    <p className="text-sm text-muted-foreground mb-1">Available 7 days a week</p>
                    <a href="tel:+918185856789" className="text-accent hover:underline font-medium">
                      +91 81858 56789
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/10 border-accent/20 hover:bg-secondary/20 transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground mb-1">Response within 24 hours</p>
                    <a href="mailto:digitalnaani@gmail.com" className="text-accent hover:underline font-medium">
                      digitalnaani@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/10 border-accent/20 hover:bg-secondary/20 transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Address</h3>
                    <p className="text-sm text-muted-foreground mb-1">Visit us for in-person meetings</p>
                    <p className="text-foreground font-medium">
                      Kondapur, Hyderabad, Telangana 500084
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary/10 border-accent/20 hover:bg-secondary/20 transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-sm text-muted-foreground mb-1">We're flexible for our clients</p>
                    <p className="text-foreground font-medium">
                      Mon-Sat: 9 AM - 7 PM | Sun: By Appointment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Thank you for contacting{" "}
                  <Link to="/" className="text-accent hover:underline">Naani Projects</Link>. 
                  We'll get back to you within 24 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name *</label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Your name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email *</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject *</label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="e.g., SEO Services Inquiry" 
                      required 
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message *</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us about your business, goals, and budget..." 
                    rows={5} 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-rainbow hover:opacity-90" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Clock className="animate-spin w-4 h-4" /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Transparent Pricing, No Surprises</h2>
          <p className="text-center text-muted-foreground mb-8">
            At <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link>, 
            we believe in transparent pricing. Here's what makes our packages different:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <CheckCircle2 className="mx-auto text-accent mb-4" size={32} />
              <h3 className="font-bold mb-2">Custom Packages</h3>
              <p className="text-sm text-muted-foreground">Every business is different. We create packages that fit your specific goals and budget.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <CheckCircle2 className="mx-auto text-accent mb-4" size={32} />
              <h3 className="font-bold mb-2">No Lock-In Contracts</h3>
              <p className="text-sm text-muted-foreground">Flexible month-to-month agreements. Stay because you love the results, not because you're locked in.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <CheckCircle2 className="mx-auto text-accent mb-4" size={32} />
              <h3 className="font-bold mb-2">ROI-Focused</h3>
              <p className="text-sm text-muted-foreground">We optimize for leads and revenue, not vanity metrics. You see real business impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="text-primary" size={20} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Find Us on Google Maps – Naani Projects, Hyderabad
              </h2>
            </div>
            
            <address 
              className="not-italic text-muted-foreground text-sm mb-4"
              itemScope 
              itemType="https://schema.org/LocalBusiness"
            >
              <meta itemProp="name" content="Naani Projects" />
              <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">Kondapur</span>,{" "}
                <span itemProp="addressLocality">Hyderabad</span>,{" "}
                <span itemProp="addressRegion">Telangana</span>{" "}
                <span itemProp="postalCode">500084</span>,{" "}
                <span itemProp="addressCountry">India</span>
              </span>
              {" • "}
              <a 
                href="tel:+918185856789" 
                itemProp="telephone" 
                className="text-primary hover:underline"
              >
                +91 81858 56789
              </a>
            </address>

            <div className="w-full rounded-xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2851876983547!2d78.35849807489771!3d17.45682840086628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93d9f85c6f6f%3A0x7c9c6c8b5a6a7a8a!2sKondapur%2C%20Hyderabad%2C%20Telangana%20500084!5e0!3m2!1sen!2sin!4v1702400000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Naani Projects Location - Digital Marketing Agency in Hyderabad"
                aria-label="Google Maps showing Naani Projects office location in Kondapur, Hyderabad"
                className="w-full h-[300px] md:h-[400px]"
              />
            </div>

            <p className="sr-only">
              Naani Projects is a digital marketing agency located in Kondapur, Hyderabad, Telangana 500084, India. 
              We serve businesses in Hyderabad with SEO, social media marketing, website development, and branding services.
            </p>
          </div>
        </div>
      </section>

      {/* Final WhatsApp CTA */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-8 py-6 rounded-xl bg-gradient-rainbow">
            <p className="text-xl font-bold text-primary-foreground mb-2">
              Stop Waiting. Start Growing.
            </p>
            <p className="text-primary-foreground/80 text-sm">
              Get your free consultation today and discover how we can 10x your business
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20want%20a%20free%20consultation%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                <MessageCircle className="mr-2" size={20} />
                Get Free Consultation on WhatsApp
              </Button>
            </a>
            <Link to="/portfolio">
              <Button size="lg" variant="outline">
                View Our Work <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactContent;
