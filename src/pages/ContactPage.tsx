import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, CalendarCheck, ShieldCheck, Building2, TrendingUp, Instagram, Facebook, Youtube, Clock, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEOHead from "../components/SEOHead";
import FAQSection from "../components/FAQSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

const WA_URL = "https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I'm%20looking%20for%20a%20property%20in%20Hyderabad.";
const TEL = "tel:+919705080909";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", location: "", budget: "", propertyType: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const text = encodeURIComponent(
      `Hi Naani Projects,\n\nI'd like property assistance.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nPreferred Location: ${form.location}\nBudget: ${form.budget}\nProperty Type: ${form.propertyType}\nMessage: ${form.message}`
    );
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Inquiry sent! Opening WhatsApp to confirm with our expert.");
      window.open(`https://wa.me/919705080909?text=${text}`, "_blank");
      setForm({ name: "", phone: "", email: "", location: "", budget: "", propertyType: "", message: "" });
    }, 600);
  };

  const faqs = [
    { question: "What is the fastest way to contact Naani Projects?", answer: "WhatsApp is fastest — message +91 97050 80909 with your location, budget and BHK preference. You'll receive curated property options within minutes." },
    { question: "Are property recommendations and site visits free?", answer: "Yes. Property recommendations, brochures, pricing details and guided site visits arranged through Naani Projects are completely free for buyers." },
    { question: "How soon will someone respond to my inquiry?", answer: "Most WhatsApp and call inquiries receive a response within 15–30 minutes during business hours. Form submissions are followed up within a few hours." },
    { question: "Can I book a site visit on a weekend?", answer: "Yes. We arrange site visits 7 days a week including weekends. Just share your preferred date and time on WhatsApp and we'll confirm the slot with the project sales team." },
    { question: "Do you handle home loan and legal documentation?", answer: "We connect you with trusted loan partners and legal advisors who help with sanctions, agreements and registration — so your property purchase is smooth from start to finish." },
    { question: "Do you assist NRI buyers?", answer: "Absolutely. We support NRI buyers with virtual site tours, video walkthroughs, end-to-end documentation guidance and post-purchase property management referrals across Hyderabad and Tirupati." },
    { question: "Which property types can I inquire about?", answer: "Inquire about 2/3/4 BHK apartments, premium gated communities, luxury villas, plotted developments, commercial spaces and pre-launch investment opportunities." },
    { question: "Where is Naani Projects based?", answer: "We're based in Kondapur, Hyderabad and serve buyers across Hyderabad, Telangana and Tirupati. Connect on WhatsApp or call +91 97050 80909 anytime." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["ContactPage", "RealEstateAgent"],
    "name": "Contact Naani Projects",
    "description": "Connect with Naani Projects for personalized property assistance, site visits, brochures and investment opportunities in Hyderabad.",
    "url": "https://www.naani.in/contact-us",
    "telephone": "+919705080909",
    "email": "digitalnaani@gmail.com",
    "image": "https://www.naani.in/naani-projects-logo.png",
    "areaServed": ["Hyderabad", "Tirupati"],
    "address": { "@type": "PostalAddress", "streetAddress": "Kondapur", "addressLocality": "Hyderabad", "addressRegion": "Telangana", "postalCode": "500084", "addressCountry": "IN" },
    "sameAs": [
      "https://www.instagram.com/naaniprojects/",
      "https://www.facebook.com/NaaniProjects/",
      "https://www.youtube.com/@NaaniProjects",
    ],
  };

  return (
    <>
      <SEOHead
        title="Contact Naani Projects | Property Assistance & Site Visits"
        description="Connect with Naani Projects for personalized property assistance, site visits, apartment details, villa projects, pricing, brochures and investment opportunities."
        canonicalUrl="https://www.naani.in/contact-us"
        keywords="contact naani projects, property assistance hyderabad, site visit booking, real estate enquiry hyderabad, property advisor whatsapp"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-[#090D16] text-white">
        <Header />

        {/* Hero */}
        <section className="py-24 md:py-28 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12 relative">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#111726] border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] shadow-md">Contact Naani Projects</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Let's Find Your <span className="text-gold-gradient">Perfect Property</span></h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
                Connect with Naani Projects for premium property recommendations, WhatsApp assistance, brochures, and free site visits across Hyderabad and Tirupati.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-6 rounded-xl shadow-md" onClick={() => window.open(WA_URL, "_blank")}>
                  <MessageCircle size={18} className="mr-2" /> WhatsApp Expert
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold px-6 py-6 rounded-xl shadow-xs" onClick={() => (window.location.href = TEL)}>
                  <Phone size={18} className="mr-2" /> Call Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact info + Inquiry Form */}
        <section className="py-12 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-card p-6 space-y-4 shadow-xl">
                  <h2 className="text-2xl font-extrabold text-white">Reach Us</h2>
                  <a href={TEL} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-400 transition-colors border border-amber-500/30"><Phone size={18} /></div>
                    <div><p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Phone</p><p className="font-bold text-white group-hover:text-amber-400 transition-colors">+91 97050 80909</p></div>
                  </a>
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white text-emerald-400 transition-colors border border-emerald-500/30"><MessageCircle size={18} /></div>
                    <div><p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">WhatsApp</p><p className="font-bold text-white group-hover:text-emerald-400 transition-colors">+91 97050 80909</p></div>
                  </a>
                  <a href="mailto:digitalnaani@gmail.com" className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-400 transition-colors border border-amber-500/30"><Mail size={18} /></div>
                    <div><p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Email</p><p className="font-bold text-white group-hover:text-amber-400 transition-colors break-all">digitalnaani@gmail.com</p></div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-400 border border-amber-500/30"><MapPin size={18} /></div>
                    <div><p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Office</p><p className="font-bold text-white">Kondapur, Hyderabad, Telangana 500084</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-400 border border-amber-500/30"><Clock size={18} /></div>
                    <div><p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Hours</p><p className="font-bold text-white">Mon–Sun · 9 AM – 9 PM</p></div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a href="https://www.instagram.com/naaniprojects/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all flex items-center justify-center border border-amber-500/30"><Instagram size={16} /></a>
                    <a href="https://www.facebook.com/NaaniProjects/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all flex items-center justify-center border border-amber-500/30"><Facebook size={16} /></a>
                    <a href="https://www.youtube.com/@NaaniProjects" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all flex items-center justify-center border border-amber-500/30"><Youtube size={16} /></a>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 p-6 rounded-2xl space-y-3 shadow-xl">
                  <CalendarCheck size={28} className="text-slate-950" />
                  <h2 className="text-xl font-extrabold text-slate-950">Book Free Site Visit</h2>
                  <p className="text-sm text-slate-900 font-bold">Visit any project with a dedicated expert. Zero cost, zero pressure.</p>
                  <Button className="mt-3 w-full bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold shadow-md border border-amber-400/40" onClick={() => window.open(WA_URL, "_blank")}>
                    <CalendarCheck size={16} className="mr-2" /> Book Site Visit on WhatsApp
                  </Button>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="lg:col-span-3">
                <div className="glass-card p-8 space-y-5 shadow-xl">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">Smart <span className="text-gold-gradient">Inquiry Form</span></h2>
                    <p className="text-slate-300 font-medium text-sm mt-1">Share your preferences — get curated property options instantly.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-1"><label htmlFor="contact-name" className="text-xs font-bold text-amber-400 mb-1 block">Name *</label><Input id="contact-name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="bg-slate-900 border-amber-500/30 text-white font-medium" /></div>
                    <div className="sm:col-span-1"><label htmlFor="contact-phone" className="text-xs font-bold text-amber-400 mb-1 block">Phone *</label><Input id="contact-phone" name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="+91 ..." className="bg-slate-900 border-amber-500/30 text-white font-medium" /></div>
                    <div className="sm:col-span-2"><label htmlFor="contact-email" className="text-xs font-bold text-amber-400 mb-1 block">Email</label><Input id="contact-email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@email.com" className="bg-slate-900 border-amber-500/30 text-white font-medium" /></div>
                    <div><label htmlFor="contact-location" className="text-xs font-bold text-amber-400 mb-1 block">Preferred Location</label>
                      <select id="contact-location" name="location" value={form.location} onChange={handleChange} className="flex h-10 w-full rounded-md border border-amber-500/30 bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                        <option value="">Select location</option>
                        {["Kokapet","Tellapur","Gachibowli","Miyapur","Bachupally","Tukkuguda","Financial District","Neopolis","Kondapur","Tirupati","Other"].map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div><label htmlFor="contact-budget" className="text-xs font-bold text-[#040957] mb-1 block">Budget</label>
                      <select id="contact-budget" name="budget" value={form.budget} onChange={handleChange} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-[#040957]">
                        <option value="">Select budget</option>
                        {["Under ₹50L","₹50L – ₹1Cr","₹1Cr – ₹2Cr","₹2Cr – ₹5Cr","₹5Cr+"].map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2"><label htmlFor="contact-property-type" className="text-xs font-bold text-[#040957] mb-1 block">Property Type</label>
                      <select id="contact-property-type" name="propertyType" value={form.propertyType} onChange={handleChange} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-[#040957]">
                        <option value="">Select type</option>
                        {["2 BHK Apartment","3 BHK Apartment","4 BHK Apartment","Villa","Gated Community","Plot","Commercial","Investment"].map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2"><label htmlFor="contact-message" className="text-xs font-bold text-[#040957] mb-1 block">Message</label><Textarea id="contact-message" name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us what you're looking for..." className="bg-white border-slate-300 font-medium" /></div>
                    <Button type="submit" disabled={submitting} className="sm:col-span-2 bg-[#0080FF] hover:bg-[#006bd6] text-white font-bold py-3 text-base shadow-md">
                      {submitting ? "Sending..." : (<><Send size={16} className="mr-2" /> Send Inquiry on WhatsApp</>)}
                    </Button>
                    <p className="sm:col-span-2 text-xs text-slate-600 font-medium text-center flex items-center justify-center gap-1"><CheckCircle2 size={14} className="text-green-600" /> Your details are private. We never spam.</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto glass-card p-2 overflow-hidden">
              <iframe
                title="Naani Projects Office - Kondapur, Hyderabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.6985!2d78.3625!3d17.4649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKondapur%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%" height="400" style={{ border: 0 }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Why Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Contact <span className="text-gold-gradient">Naani Projects</span></h2>
              <p className="text-secondary">Honest answers, verified inventory, and end-to-end property support.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Sparkles, title: "Personalized Property Support", desc: "Real conversations on WhatsApp — never automated, never generic." },
                { icon: Building2, title: "Luxury Apartments", desc: "Premium 2/3/4 BHK apartments from Hyderabad's top developers." },
                { icon: ShieldCheck, title: "Verified Builders", desc: "Only RERA-approved projects from trusted developer partners." },
                { icon: TrendingUp, title: "Investment Opportunities", desc: "Pre-launch deals, high-appreciation corridors and rental-ready homes." },
                { icon: MapPin, title: "Hyderabad Expertise", desc: "Deep micro-market knowledge across every prime locality." },
                { icon: CalendarCheck, title: "Free Site Visits", desc: "Guided visits, brochures and pricing — all at no cost to you." },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 space-y-3 group hover:-translate-y-2 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={22} />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto glass-card p-10 md:p-14 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Stop Searching. <span className="text-gold-gradient">Start Finding.</span></h2>
                <p className="text-secondary mb-6 max-w-2xl mx-auto">Message Naani Projects on WhatsApp and discover the right property smarter & faster.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="bg-gradient-gold text-primary-foreground font-semibold hover:scale-105 transition-all hover:shadow-gold-lg" onClick={() => window.open(WA_URL, "_blank")}>
                    <MessageCircle size={18} className="mr-2" /> WhatsApp Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:border-primary hover:bg-primary/10" onClick={() => (window.location.href = "/projects")}>
                    Get Property Deals
                  </Button>
                </div>
                <p className="text-xs text-secondary pt-4">
                  Or browse the catalog · <Link to="/projects" className="text-primary hover:underline">All Projects</Link> · <Link to="/about-us" className="text-primary hover:underline">About Naani Projects</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} pageUrl="https://www.naani.in/contact-us" />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ContactPage;
