import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, CalendarCheck, ShieldCheck, Building2, TrendingUp, Instagram, Facebook, Youtube, Clock, Sparkles, Search, Compass, Layers, Scale, HelpCircle, Check, ExternalLink, Share2, Linkedin, Pin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEOHead from "../components/SEOHead";
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
    {
      question: "How can I contact Naani Projects?",
      answer: "You can easily contact Naani Projects via WhatsApp at +91 97050 80909, call us directly at +91 97050 80909, email digitalnaani@gmail.com, or submit a property enquiry through our online form. Our property discovery team responds promptly during business hours."
    },
    {
      question: "What types of properties can I enquire about?",
      answer: "You can enquire about a wide range of residential properties across Hyderabad, including 2 BHK and 3 BHK apartments, luxury villas, gated community plots, new launch projects, under-construction developments, and ready-to-move properties."
    },
    {
      question: "Which areas of Hyderabad does Naani Projects cover?",
      answer: "We cover major residential growth corridors across Hyderabad, including Kokapet, Neopolis, Financial District, Gachibowli, Narsingi, Tellapur, Kondapur, HITECH City, Miyapur, Bachupally, Kollur, Tukkuguda, and Shamshabad."
    },
    {
      question: "Can I enquire about new projects in Hyderabad?",
      answer: "Yes. You can request current floor plans, project brochures, amenity details, and pricing structures for new residential projects developed by leading builders such as Rajapushpa, Prestige, Brigade, Aparna, My Home, and Team4."
    },
    {
      question: "Can I get current project pricing and availability?",
      answer: "Yes. When you submit an enquiry, our team shares available unit configurations, base pricing estimates, and active developer offers. Pricing and availability are subject to change and are reconfirmed prior to booking."
    },
    {
      question: "Can I request a site visit through Naani Projects?",
      answer: "Absolutly. You can request free site visit coordination for shortlisted projects in Hyderabad. Our team coordinates convenient visit timings, transportation guidance, and guided walkthroughs."
    },
    {
      question: "Can I compare Hyderabad residential projects?",
      answer: "Yes. Naani Projects assists property buyers by providing side-by-side project comparisons covering location advantages, floor plan layout efficiency, carpet area vs built-up area metrics, and total cost considerations."
    },
    {
      question: "Can I list my property on Naani Projects?",
      answer: "Yes. Property owners, builders, and developers interested in showcasing residential properties or new projects to active Hyderabad homebuyers can visit our List Your Property page or reach out on WhatsApp."
    }
  ];

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.naani.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": "https://www.naani.in/contact-us"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent"],
    "@id": "https://www.naani.in/#organization",
    "name": "Naani Projects",
    "alternateName": ["Naani Projects Hyderabad", "Naani Real Estate"],
    "url": "https://www.naani.in",
    "logo": {
      "@type": "ImageObject",
      "@id": "https://www.naani.in/#logo",
      "url": "https://www.naani.in/naani-projects-logo.png",
      "caption": "Naani Projects Logo"
    },
    "image": "https://www.naani.in/naani-projects-contact-hyderabad-real-estate.webp",
    "telephone": "+919705080909",
    "email": "digitalnaani@gmail.com",
    "description": "Contact Naani Projects for apartments, villas, plots and new residential projects in Hyderabad. Get property details, compare projects or request a site visit.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kondapur",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500084",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Telangana" }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919705080909",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Telugu", "Hindi"]
    },
    "sameAs": [
      "https://www.instagram.com/naaniprojects/",
      "https://www.facebook.com/NaaniProjects/",
      "https://www.youtube.com/@NaaniProjects?sub_confirmation=1",
      "https://www.linkedin.com/company/naaniprojects/",
      "https://in.pinterest.com/naaniprojects/"
    ]
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.naani.in/contact-us#webpage",
    "url": "https://www.naani.in/contact-us",
    "name": "Contact Naani Projects | Hyderabad Real Estate Experts",
    "description": "Contact Naani Projects for apartments, villas, plots and new residential projects in Hyderabad. Get property details, compare projects or request a site visit.",
    "isPartOf": {
      "@id": "https://www.naani.in/#website"
    },
    "about": {
      "@id": "https://www.naani.in/#organization"
    },
    "breadcrumb": breadcrumbsSchema
  };

  const structuredDataCombined = [breadcrumbsSchema, organizationSchema, webpageSchema];

  return (
    <>
      <SEOHead
        title="Contact Naani Projects | Hyderabad Real Estate Experts"
        description="Contact Naani Projects for apartments, villas, plots and new residential projects in Hyderabad. Get property details, compare projects or request a site visit."
        canonicalUrl="https://www.naani.in/contact-us"
        keywords="Naani Projects, Naani Projects Hyderabad, Naani real estate, property enquiry Hyderabad, real estate enquiry Hyderabad, site visit Hyderabad, apartments in Hyderabad, villas in Hyderabad"
        ogImage="https://www.naani.in/naani-projects-contact-hyderabad-real-estate.webp"
        structuredData={structuredDataCombined}
      />

      <div className="min-h-screen bg-[#090D16] text-slate-100">
        <Header />

        {/* Breadcrumb Bar */}
        <nav className="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
          <div className="max-w-6xl mx-auto flex items-center gap-2">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">Contact Us</span>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles size={14} /> Property Discovery &amp; Assistance
            </div>
            
            {/* PRIMARY H1 - EXACT SPECIFICATION */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto">
              Contact Naani Projects – <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Hyderabad Real Estate Experts</span>
            </h1>

            {/* Introductory Copy */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
              Naani Projects is a Hyderabad-focused property discovery platform helping buyers explore apartments, villas, plots and new residential projects across Hyderabad. Contact us to explore properties, request project details, compare projects, check unit availability, request floor plans, or schedule a guided site visit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-6 rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all" onClick={() => window.open(WA_URL, "_blank")}>
                <MessageCircle size={18} className="mr-2" /> WhatsApp Naani Projects
              </Button>
              <Button size="lg" variant="outline" className="bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-semibold px-6 py-6 rounded-xl" onClick={() => window.location.href = TEL}>
                <Phone size={18} className="mr-2" /> Call Naani Projects
              </Button>
            </div>
          </div>
        </section>

        {/* HOW CAN WE HELP YOU? */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">How Can We Help You?</h2>
              <p className="text-slate-300 text-base">Select the type of property enquiry or assistance you need in Hyderabad.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Building2 size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Buy a Property</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Looking for an apartment, luxury villa, plot or residential property in Hyderabad based on your budget and preferences.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Explore New Projects</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Discover upcoming new residential projects, pre-launch offers, and gated community developments across Hyderabad.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Scale size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Compare Projects</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Compare residential developments based on location advantages, configuration, amenities, and available pricing data.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Search size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Get Project Details</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Request comprehensive project information including digital brochures, floor plans, specifications, and cost sheets.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <CalendarCheck size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Schedule a Site Visit</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Request free coordination for guided project site visits at convenient times with dedicated property advisors.</p>
              </div>

              <Link to="/list-your-property" className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 group block">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <ExternalLink size={22} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">List Your Property</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Property owners or developers can explore options to list a residential project or property with Naani Projects.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CONTACT NAANI PROJECTS (4 CARDS) */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Contact Naani Projects</h2>
              <p className="text-slate-300 text-base">Reach out directly through any of our verified communication channels.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href={TEL} className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 group block">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Phone size={20} />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">Call Us</h3>
                <p className="text-amber-400 font-bold text-sm">+91 97050 80909</p>
                <p className="text-xs text-slate-400">Speak directly with a Hyderabad property expert.</p>
              </a>

              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 group block">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle size={20} />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">WhatsApp</h3>
                <p className="text-emerald-400 font-bold text-sm">+91 97050 80909</p>
                <p className="text-xs text-slate-400">Instant project details, floor plans &amp; pricing.</p>
              </a>

              <a href="mailto:digitalnaani@gmail.com" className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 group block">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Mail size={20} />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">Email</h3>
                <p className="text-amber-400 font-bold text-sm break-all">digitalnaani@gmail.com</p>
                <p className="text-xs text-slate-400">Send detailed project requirements &amp; queries.</p>
              </a>

              <div className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <MapPin size={20} />
                </div>
                <h3 className="text-base font-bold text-white">Visit Us</h3>
                <p className="text-slate-200 font-bold text-sm">Kondapur, Hyderabad</p>
                <p className="text-xs text-slate-400">Telangana 500084, India</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEND A PROPERTY ENQUIRY (LEAD FORM + IMAGE) */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Send a Property Enquiry</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Share your location preference, budget limits, and housing requirements. Our property discovery advisors will curate verified options and share floor plans directly with you.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-slate-900">
                <img
                  src="/naani-projects-contact-hyderabad-real-estate.webp"
                  alt="Naani Projects Hyderabad real estate property assistance"
                  className="w-full h-72 object-cover object-center"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Direct WhatsApp Lead Handoff</p>
                  <p className="text-sm font-semibold text-white mt-0.5">Quick Response &amp; Verified Project Information</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1629] border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <Clock size={14} /> Advisory Business Hours
                </div>
                <p>Monday – Sunday: 9:00 AM – 9:00 PM IST</p>
                <p className="text-slate-400">Inquiries received outside business hours are answered early next morning.</p>
              </div>
            </div>

            {/* Lead Form Column */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-5 shadow-2xl">
                <div>
                  <h3 className="text-xl font-bold text-white">Property Assistance Form</h3>
                  <p className="text-slate-400 text-xs mt-1">Fields marked with * are required.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-1">
                    <label htmlFor="contact-name" className="text-xs font-bold text-amber-400 mb-1 block">Full Name *</label>
                    <Input id="contact-name" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="bg-[#0B101D] border-slate-700 text-white font-medium text-sm" />
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="contact-phone" className="text-xs font-bold text-amber-400 mb-1 block">Mobile Number *</label>
                    <Input id="contact-phone" name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="+91 97050 80909" className="bg-[#0B101D] border-slate-700 text-white font-medium text-sm" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-email" className="text-xs font-bold text-amber-400 mb-1 block">Email Address (Optional)</label>
                    <Input id="contact-email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" className="bg-[#0B101D] border-slate-700 text-white font-medium text-sm" />
                  </div>

                  <div>
                    <label htmlFor="contact-property-type" className="text-xs font-bold text-amber-400 mb-1 block">Looking For</label>
                    <select id="contact-property-type" name="propertyType" value={form.propertyType} onChange={handleChange} className="flex h-10 w-full rounded-md border border-slate-700 bg-[#0B101D] px-3 py-2 text-sm font-medium text-white">
                      <option value="">Select option</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Plot">Plot</option>
                      <option value="New Project">New Project</option>
                      <option value="Investment Property">Investment Property</option>
                      <option value="Resale Property">Resale Property</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-location" className="text-xs font-bold text-amber-400 mb-1 block">Preferred Location</label>
                    <select id="contact-location" name="location" value={form.location} onChange={handleChange} className="flex h-10 w-full rounded-md border border-slate-700 bg-[#0B101D] px-3 py-2 text-sm font-medium text-white">
                      <option value="">Select location</option>
                      {["Kokapet", "Tellapur", "Gachibowli", "Narsingi", "Kondapur", "Miyapur", "Bachupally", "Tukkuguda", "Financial District", "Neopolis", "Other"].map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-budget" className="text-xs font-bold text-amber-400 mb-1 block">Budget Range</label>
                    <select id="contact-budget" name="budget" value={form.budget} onChange={handleChange} className="flex h-10 w-full rounded-md border border-slate-700 bg-[#0B101D] px-3 py-2 text-sm font-medium text-white">
                      <option value="">Select budget</option>
                      {["Under ₹50 Lakhs", "₹50 Lakhs – ₹1 Crore", "₹1 Crore – ₹2 Crores", "₹2 Crores – ₹5 Crores", "Above ₹5 Crores"].map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="text-xs font-bold text-amber-400 mb-1 block">Message / Requirements</label>
                    <Textarea id="contact-message" name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us what you're looking for (e.g., 3 BHK near Gachibowli, ready to move)..." className="bg-[#0B101D] border-slate-700 text-white font-medium text-sm" />
                  </div>

                  <Button type="submit" disabled={submitting} className="sm:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-base shadow-lg">
                    {submitting ? "Sending..." : (<><Send size={16} className="mr-2" /> Send Enquiry on WhatsApp</>)}
                  </Button>

                  <p className="sm:col-span-2 text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                    <CheckCircle2 size={14} className="text-emerald-400" /> Your information is private. We respect your privacy and never spam.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* WHY CONTACT NAANI PROJECTS? */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Why Contact Naani Projects?</h2>
              <p className="text-slate-300 text-base">Legitimate platform advantages designed for property buyers in Hyderabad.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Hyderabad Focus", desc: "Naani Projects focuses exclusively on residential property discovery across major growth corridors in Hyderabad." },
                { title: "Multiple Property Options", desc: "Explore high-rise apartments, gated community flats, luxury villas, and residential plots under one roof." },
                { title: "Project Discovery", desc: "Compare project configurations, floor plans, and amenities across multiple locations and builders." },
                { title: "Easy Enquiry Handoff", desc: "Contact our team conveniently through WhatsApp, direct phone calls, or online enquiry forms." },
                { title: "Buyer Assistance", desc: "Get help understanding floor plan efficiency, project specifications, and guided site visit coordination." },
                { title: "Convenient Property Search", desc: "Filter and discover properties based on your preferred location, configuration, budget, and possession timeline." },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Check size={18} />
                    <span className="text-white font-bold text-base">{item.title}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed pl-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW OUR PROPERTY ENQUIRY PROCESS WORKS */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">How Our Property Enquiry Process Works</h2>
              <p className="text-slate-300 text-base">A transparent, 5-step process from initial query to site visit.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: "01", title: "Tell Us Requirements", desc: "Share property type, preferred location, budget, and BHK configuration." },
                { step: "02", title: "Explore Suitable Projects", desc: "Review relevant residential projects in Hyderabad curated to match your needs." },
                { step: "03", title: "Compare Your Options", desc: "Compare available project details, locations, amenities, and floor plan layouts." },
                { step: "04", title: "Request Project Info", desc: "Ask for pricing sheets and specifications. Pricing & availability are reconfirmed prior to booking." },
                { step: "05", title: "Schedule a Site Visit", desc: "Request site visit coordination for shortlisted projects where available." },
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 text-center space-y-3 relative">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Step {s.step}</span>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HYDERABAD AREAS WE SERVE */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Hyderabad Areas We Serve</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Naani Projects connects buyers with residential developments across major growth corridors in Hyderabad. Explore projects in key micro-markets:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "Kokapet", path: "/projects-in-kokapet", desc: "Ultra-luxury high-rise corridor near Financial District." },
                { name: "Tellapur", path: "/projects-in-tellapur", desc: "Fast-growing residential hub near Gachibowli & ORR." },
                { name: "Gachibowli", path: "/projects-in-gachibowli", desc: "Established IT financial hub with premium apartments." },
                { name: "Narsingi", path: "/projects-in-narsingi", desc: "Strategic junction connecting Financial District & ORR." },
                { name: "Kondapur", path: "/projects-in-kondapur", desc: "Prime residential ecosystem close to HITECH City." },
                { name: "Miyapur", path: "/projects-in-miyapur", desc: "Excellent metro connectivity and gated community flats." },
                { name: "Bachupally", path: "/projects-in-bachupally", desc: "Educational & residential hub for families." },
                { name: "Kollur", path: "/projects-in-kollur", desc: "Rapidly expanding township zone along the ORR." },
                { name: "Tukkuguda", path: "/projects-in-tukkuguda", desc: "Villa and plot corridor near Hyderabad Airport." },
                { name: "Nallagandla", path: "/projects-in-nallagandla", desc: "Family housing near HCU & Financial District." },
                { name: "Bowrampet", path: "/projects-in-bowrampet", desc: "Northern residential growth corridor." },
                { name: "Mallampet", path: "/projects-in-mallampet", desc: "Affordable gated community project destination." },
              ].map((loc, i) => (
                <Link key={i} to={loc.path} className="p-4 rounded-xl bg-[#0B101D] border border-slate-800 hover:border-amber-500/40 hover:-translate-y-1 transition-all space-y-1 group">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>{loc.name}</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{loc.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PROPERTY TYPES YOU CAN EXPLORE */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Property Types You Can Explore</h2>
              <p className="text-slate-300 text-base">
                Discover diverse property categories across Hyderabad suited to different budgets and lifestyle choices:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: "Apartments in Hyderabad", url: "/projects" },
                { title: "Flats in Hyderabad", url: "/hyderabad/2-bhk-flats" },
                { title: "2 BHK Flats in Hyderabad", url: "/hyderabad/2-bhk-flats" },
                { title: "3 BHK Flats in Hyderabad", url: "/hyderabad/3-bhk-flats" },
                { title: "Villas in Hyderabad", url: "/projects" },
                { title: "Plots in Hyderabad", url: "/projects" },
                { title: "New Projects in Hyderabad", url: "/projects" },
                { title: "Residential Projects", url: "/hyderabad" },
              ].map((item, idx) => (
                <Link key={idx} to={item.url} className="p-4 rounded-xl bg-[#0F1629] border border-slate-800 hover:border-amber-500/40 text-amber-400 font-bold text-sm flex items-center justify-between group">
                  <span>{item.title}</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHO WE HELP */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Who We Help</h2>
              <p className="text-slate-300 text-base">Tailored property assistance for different buyer personas.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="text-amber-400" size={20} /> Homebuyers
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  People looking for homes in Hyderabad based on location, budget, BHK configuration, and lifestyle requirements.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-amber-400" size={20} /> First-Time Buyers
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  People researching apartments and residential projects before making their first property purchase decision.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-amber-400" size={20} /> Property Investors
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  People researching Hyderabad locations and residential developments objectively without speculative yield claims.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B101D] border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="text-amber-400" size={20} /> NRI Buyers
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Non-Resident Indians seeking digital brochures, project information, and remote initial enquiry assistance in Hyderabad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HYDERABAD REAL ESTATE ENQUIRIES (SEMANTIC PARAGRAPH) */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Hyderabad Real Estate Enquiries</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Whether you are looking for apartments in Hyderabad, a villa in a gated community, a residential plot or a new project, Naani Projects provides a convenient way to explore property options across Hyderabad. Our team helps you review project details, compare neighborhood locations, and connect with verified builder representatives for site visit arrangements.
            </p>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-slate-300 text-base">Find quick answers to common questions about contacting Naani Projects.</p>
            </div>

            {/* Rendered directly in HTML DOM without client interaction required for crawlers */}
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono text-sm">Q{idx + 1}.</span> {faq.question}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSPARENCY & BUYER DUE DILIGENCE */}
        <section className="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Transparency &amp; Buyer Due Diligence</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Naani Projects provides property discovery and project information to help users research their options. Information such as pricing, availability, offers, construction status and possession timelines may change. Buyers should independently verify important project and legal information before making a purchase.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0F1629] border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2">
              <p>• <strong>Price &amp; Availability Notice:</strong> Builder pricing sheets, unit availability, and promotional offers change dynamically. Always reconfirm specs during site visits.</p>
              <p>• <strong>Legal Due Diligence:</strong> Independent legal review of title deeds, approvals, and agreements should be completed by a qualified attorney prior to booking.</p>
              <p>• <strong>RERA Verification:</strong> Verify project registration status on the official Telangana RERA portal.</p>
            </div>
          </div>
        </section>

        {/* EXPLORE HYDERABAD PROPERTIES (CTAS & INTERNAL LINKS) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#0B101D] to-[#090D16]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
            <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#131C35] to-[#0F172A] border border-amber-500/30 text-center space-y-8 shadow-2xl relative overflow-hidden">
              <div className="space-y-4 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Explore Hyderabad Properties
                </h2>
                <p className="text-slate-300 text-base md:text-lg">
                  Browse curated project listings, explore growth corridors, or message our team directly on WhatsApp.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-6 rounded-xl shadow-lg" onClick={() => window.open(WA_URL, "_blank")}>
                  <MessageCircle size={18} className="mr-2" /> WhatsApp Naani Projects
                </Button>
                <Button size="lg" variant="outline" className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold px-6 py-6 rounded-xl" onClick={() => window.location.href = TEL}>
                  <Phone size={18} className="mr-2" /> Call Naani Projects
                </Button>
              </div>

              {/* Internal Links Navigation */}
              <div className="pt-8 border-t border-slate-800 max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-300">
                <Link to="/projects" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Browse Projects <ExternalLink size={12} />
                </Link>
                <Link to="/about-us" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  About Naani Projects <ExternalLink size={12} />
                </Link>
                <Link to="/list-your-property" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  List Your Property <ExternalLink size={12} />
                </Link>
                <Link to="/hyderabad" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Hyderabad Properties <ExternalLink size={12} />
                </Link>
                <Link to="/contact-us" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Contact Us <ExternalLink size={12} />
                </Link>
              </div>

              {/* Verified Social Channels */}
              <div className="flex justify-center gap-3 pt-4">
                <a href="https://www.youtube.com/@NaaniProjects?sub_confirmation=1" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Youtube size={18} />
                </a>
                <a href="https://www.facebook.com/NaaniProjects/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/naaniprojects/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/company/naaniprojects/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="https://in.pinterest.com/naaniprojects/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 flex items-center justify-center text-amber-400 transition-all">
                  <Pin size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ContactPage;
