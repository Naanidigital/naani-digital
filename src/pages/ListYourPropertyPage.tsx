import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Building2, MapPin, Image as ImageIcon, User, Sparkles, CheckCircle2,
  ArrowRight, ArrowLeft, ShieldCheck, TrendingUp, Users, DollarSign,
  FileText, Layers, Check, Plus, AlertCircle, RefreshCw, Lock, HelpCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  submitProperty,
  generateAIDescription,
  calculateSEOScore,
  EMPTY_PROPERTY_SUBMISSION,
  FEATURE_OPTIONS,
  AMENITY_OPTIONS,
  type PropertySubmission,
  type PurposeType,
  type PropertyCategory,
  type OwnershipType,
  type ProjectType,
  type FurnishingStatus,
  type ParkingType,
  type AreaType,
  type AreaUnit,
  type FacingDirection,
  type FlooringType,
  type PowerBackupType,
  type OverlookingType,
} from "@/lib/propertySubmission";

const RESIDENTIAL_TYPES = ["Apartment", "Independent House", "Villa", "Builder Floor", "Plot/Land", "Farmhouse", "Other"];
const COMMERCIAL_TYPES = ["Office Space", "Shop", "Showroom", "Warehouse", "Industrial Building", "Commercial Land", "Co-working Space", "Other"];

const OTHER_ROOMS = ["Pooja Room", "Study Room", "Servant Room", "Store Room"];
const CHARGES_LIST = ["Floor Rise", "PLC", "East Facing Charges", "Corner Charges", "Amenities Charges", "Parking Charges", "Maintenance Charges", "Registration Charges", "GST"];

const STEPS = [
  { n: 1, label: "Basic Details", icon: User },
  { n: 2, label: "Location", icon: MapPin },
  { n: 3, label: "Property & Floor", icon: Building2 },
  { n: 4, label: "Pricing & Features", icon: DollarSign },
  { n: 5, label: "Description & SEO", icon: FileText },
  { n: 6, label: "Media & Submit", icon: ImageIcon },
];

const ListYourPropertyPage = () => {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<PropertySubmission>(EMPTY_PROPERTY_SUBMISSION);
  const [submitting, setSubmitting] = useState(false);
  const [amenitySearch, setAmenitySearch] = useState("");
  const [customAmenity, setCustomAmenity] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const seoHealth = useMemo(() => calculateSEOScore(form), [form]);

  const update = <K extends keyof PropertySubmission>(field: K, value: PropertySubmission[K]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleArrayItem = <K extends "otherRooms" | "additionalCharges" | "features" | "amenities" | "overlooking">(
    field: K,
    item: PropertySubmission[K][number]
  ) => {
    setForm((f) => {
      const arr = (f[field] as string[]) || [];
      const next = arr.includes(item as string)
        ? arr.filter((x) => x !== item)
        : [...arr, item as string];
      return { ...f, [field]: next };
    });
  };

  const handleAddCustomAmenity = () => {
    if (!customAmenity.trim()) return;
    const item = customAmenity.trim();
    if (!form.amenities.includes(item)) {
      update("amenities", [...form.amenities, item]);
    }
    setCustomAmenity("");
  };

  const handleGenerateAIDescription = () => {
    setGeneratingAI(true);
    setTimeout(() => {
      const desc = generateAIDescription(form);
      update("description", desc);
      setGeneratingAI(false);
      toast({
        title: "AI Description Generated",
        description: "Generated rich description strictly using your property details.",
      });
    }, 400);
  };

  const validateCurrentStep = (): string | null => {
    if (step === 1) {
      if (!form.projectName.trim()) return "Project name is required";
      if (!form.builder.trim()) return "Builder name is required";
      if (!form.submitterName.trim()) return "Your name is required";
      if (!/^[+0-9 \-()]{7,16}$/.test(form.submitterPhone.trim())) return "Valid 10-digit mobile number is required";
    }
    if (step === 2) {
      if (!form.locality.trim()) return "Locality is required";
      if (!form.city.trim()) return "City is required";
      if (form.mapsUrl && !/^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)\//i.test(form.mapsUrl)) {
        return "Enter a valid Google Maps URL";
      }
    }
    if (step === 3) {
      if (!form.area || isNaN(parseFloat(form.area))) return "Valid area is required";
    }
    if (step === 4) {
      if (!form.expectedPrice.trim()) return "Expected price is required";
    }
    if (step === 5) {
      if (form.description && form.description.trim().length > 0 && form.description.trim().length < 30) {
        return "Description must be at least 30 characters (or click AI Generate)";
      }
    }
    if (step === 6) {
      if (!form.heroFile) return "Cover image is required";
      if (!form.galleryFiles || form.galleryFiles.length === 0) return "Add at least 1 property/project photo";
    }
    return null;
  };

  const nextStep = () => {
    const err = validateCurrentStep();
    if (err) {
      toast({ title: "Please complete step requirements", description: err, variant: "destructive" });
      return;
    }
    setStep((s) => (s < 6 ? s + 1 : s));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((s) => (s > 1 ? s - 1 : s));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const err = validateCurrentStep();
    if (err) {
      toast({ title: "Validation Error", description: err, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { path } = await submitProperty(form);
      toast({
        title: "Property Submitted Successfully!",
        description: "Your property is undergoing verification and will be published live shortly.",
      });
      navigate("/thank-you", {
        state: {
          projectName: form.projectName || "your property",
          projectUrl: path,
          intentType: "knowmore",
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Submission failed. Please try again.";
      toast({ title: "Submission Error", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAmenities = AMENITY_OPTIONS.filter((a) =>
    a.toLowerCase().includes(amenitySearch.toLowerCase())
  );

  const faqs = [
    { question: "Who can list a property on Naani Projects?", answer: "Property owners, builders, and channel partners in Hyderabad & Tirupati can submit residential apartments, villas, plots, and commercial properties. Listings undergo quick verification prior to indexing." },
    { question: "Is there any upfront listing fee?", answer: "Listing is **free**. Naani Projects earns standard success fee only when your property transacts via our qualified buyer network." },
    { question: "How does the AI description generator work?", answer: "Our AI description generator synthesizes strictly the property attributes you supply (BHK, location, builder, area, amenities) into a professional, human-readable description. It never invents fake prices or approvals." },
    { question: "How does the Brochure Lead Gate work?", answer: "When enabled, buyers requesting your PDF brochure submit their contact details first. This captures verified buyer leads directly for your property." },
    { question: "Will my listing appear on search engines?", answer: "Yes! Every published property automatically gets a canonical SEO URL (`/property/:slug`), JSON-LD schema, sitemap inclusion, and dynamic distribution across relevant location and BHK pages." },
  ];

  return (
    <>
      <SEOHead
        title="List Your Property in Hyderabad | Free Submission Platform | Naani Projects"
        description="Submit your apartment, villa, plot or commercial property on Naani Projects. Multi-step professional submission, AI description, brochure lead gate, and automatic SEO page distribution."
        canonicalUrl="https://www.naani.in/list-your-property"
        keywords="list property Hyderabad, post property free, submit property Naani Projects, sell flat Bachupally, sell villa Kokapet, real estate listing platform Hyderabad"
      />
      <div className="min-h-screen bg-[#090D16] text-white">
        <Header />

        {/* HERO BANNER */}
        <section className="pt-28 pb-12 bg-[#090D16] border-b border-amber-500/20">
          <div className="w-full px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#111726] border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-[0.2em] shadow-md mb-4">
              Owner, Builder &amp; Partner Platform
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              List Your Property on <span className="text-gold-gradient">Naani Projects</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-medium mt-4 max-w-3xl mx-auto leading-relaxed">
              Submit your property details to reach active homebuyers and tenants across Hyderabad. Provide structured information to help buyers evaluate your listing quickly.
            </p>
          </div>
        </section>

        {/* MULTI-STEP PROGRESS BAR */}
        <section className="py-6 bg-[#0B101D] border-b border-amber-500/20 sticky top-16 md:top-20 z-30 backdrop-blur-md bg-opacity-95">
          <div className="w-full px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
              {STEPS.map((s) => {
                const active = step === s.n;
                const done = step > s.n;
                const Icon = s.icon;
                return (
                  <button
                    key={s.n}
                    onClick={() => {
                      if (s.n < step) setStep(s.n);
                    }}
                    disabled={s.n > step}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                      active
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border-amber-500 text-amber-400 font-extrabold shadow-md"
                        : done
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-400 font-bold"
                        : "bg-slate-900/50 border-amber-500/10 text-slate-500"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        active
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950"
                          : done
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {done ? <Check size={14} /> : s.n}
                    </div>
                    <span className="text-xs truncate hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* MAIN FORM CONTAINER */}
        <section className="py-12 bg-[#090D16]">
          <div className="w-full px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto">
            <div className="glass-card p-6 sm:p-10 shadow-2xl border border-amber-500/20">

              {/* ---------------------------------------------------- */}
              {/* STEP 1: BASIC DETAILS                                */}
              {/* ---------------------------------------------------- */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-amber-500/20 pb-4">
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                      <User className="text-amber-400" /> Step 1: Add Basic Details
                    </h2>
                    <p className="text-xs text-slate-300 font-medium mt-1">Specify listing objective, category, property type, and contact details.</p>
                  </div>

                  {/* Purpose */}
                  <div>
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">A. I want to *</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["Sell", "Rent", "Buy"] as PurposeType[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => update("purpose", p)}
                          className={`p-3 rounded-xl border text-sm font-extrabold transition-all ${
                            form.purpose === p
                              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-400 shadow-md"
                              : "bg-slate-900 border-amber-500/20 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">B. Property Category *</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["Residential", "Commercial", "Plot/Land"] as PropertyCategory[]).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            update("category", c);
                            if (c === "Commercial") update("propertyType", "Office Space");
                            else if (c === "Plot/Land") update("propertyType", "Plot/Land");
                            else update("propertyType", "Apartment");
                          }}
                          className={`p-3 rounded-xl border text-sm font-extrabold transition-all ${
                            form.category === c
                              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-400 shadow-md"
                              : "bg-slate-900 border-amber-500/20 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">C. Property Type *</Label>
                    <div className="flex flex-wrap gap-2">
                      {(form.category === "Commercial" ? COMMERCIAL_TYPES : RESIDENTIAL_TYPES).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update("propertyType", t)}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            form.propertyType === t
                              ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md"
                              : "bg-slate-900 border-amber-500/20 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ownership & Project Type */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">D. Listing Ownership *</Label>
                      <select
                        value={form.ownership}
                        onChange={(e) => update("ownership", e.target.value as OwnershipType)}
                        className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium"
                      >
                        <option value="Owner">Owner</option>
                        <option value="Builder/Developer">Builder/Developer</option>
                        <option value="Agent/Channel Partner">Agent/Channel Partner</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">E. Project Type *</Label>
                      <select
                        value={form.projectType}
                        onChange={(e) => update("projectType", e.target.value as ProjectType)}
                        className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium"
                      >
                        <option value="New Project">New Project</option>
                        <option value="Resale">Resale</option>
                        <option value="Ready Property">Ready Property</option>
                        <option value="Under Construction">Under Construction</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Name & Builder */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectName" className="text-xs font-bold text-amber-400 mb-1 block">F. Project Name *</Label>
                      <Input
                        id="projectName"
                        value={form.projectName}
                        onChange={(e) => update("projectName", e.target.value)}
                        placeholder="e.g. Fortune Towers / Aparna Greenscapes"
                        required
                        className="bg-slate-900 border-amber-500/30 text-white font-medium h-11"
                      />
                    </div>

                    <div>
                      <Label htmlFor="builder" className="text-xs font-bold text-amber-400 mb-1 block">G. Builder / Developer *</Label>
                      <Input
                        id="builder"
                        value={form.builder}
                        onChange={(e) => update("builder", e.target.value)}
                        placeholder="e.g. Prestige Group / Rajapushpa Properties"
                        required
                        className="bg-slate-900 border-amber-500/30 text-white font-medium h-11"
                      />
                    </div>
                  </div>

                  {/* Submitter Contact */}
                  <div className="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-4">
                    <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">H. Submitter Contact Details</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subName" className="text-xs font-bold text-slate-300 mb-1 block">Full Name *</Label>
                        <Input
                          id="subName"
                          value={form.submitterName}
                          onChange={(e) => update("submitterName", e.target.value)}
                          placeholder="Your name"
                          required
                          className="bg-slate-900 border-amber-500/30 text-white font-medium h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subPhone" className="text-xs font-bold text-slate-300 mb-1 block">Mobile Number * (Validated)</Label>
                        <Input
                          id="subPhone"
                          type="tel"
                          value={form.submitterPhone}
                          onChange={(e) => update("submitterPhone", e.target.value)}
                          placeholder="+91 10-digit mobile"
                          required
                          className="bg-slate-900 border-amber-500/30 text-white font-medium h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subEmail" className="text-xs font-bold text-slate-300 mb-1 block">Email Address</Label>
                        <Input
                          id="subEmail"
                          type="email"
                          value={form.submitterEmail}
                          onChange={(e) => update("submitterEmail", e.target.value)}
                          placeholder="you@email.com"
                          className="bg-slate-900 border-amber-500/30 text-white font-medium h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subWa" className="text-xs font-bold text-slate-300 mb-1 block">WhatsApp Number</Label>
                        <Input
                          id="subWa"
                          type="tel"
                          value={form.submitterWhatsapp || form.submitterPhone}
                          onChange={(e) => update("submitterWhatsapp", e.target.value)}
                          placeholder="+91 WhatsApp"
                          className="bg-slate-900 border-amber-500/30 text-white font-medium h-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 2: LOCATION DETAILS                            */}
              {/* ---------------------------------------------------- */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-amber-500/20 pb-4">
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                      <MapPin className="text-amber-400" /> Step 2: Location Hierarchy
                    </h2>
                    <p className="text-xs text-slate-300 font-medium mt-1">Specify full location hierarchy required for dynamic location SEO hubs.</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="country" className="text-xs font-bold text-amber-400 mb-1 block">Country</Label>
                      <Input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} className="bg-slate-900 border-amber-500/30 text-white h-11" />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-xs font-bold text-amber-400 mb-1 block">State</Label>
                      <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} className="bg-slate-900 border-amber-500/30 text-white h-11" />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-xs font-bold text-amber-400 mb-1 block">City *</Label>
                      <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Hyderabad / Tirupati" className="bg-slate-900 border-amber-500/30 text-white h-11" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="locality" className="text-xs font-bold text-amber-400 mb-1 block">Locality *</Label>
                      <Input id="locality" value={form.locality} onChange={(e) => update("locality", e.target.value)} placeholder="e.g. Bachupally / Kokapet / Tellapur" className="bg-slate-900 border-amber-500/30 text-white h-11" required />
                    </div>
                    <div>
                      <Label htmlFor="subLocality" className="text-xs font-bold text-amber-400 mb-1 block">Sub-locality / Sector</Label>
                      <Input id="subLocality" value={form.subLocality} onChange={(e) => update("subLocality", e.target.value)} placeholder="e.g. Mallampet / Neopolis / Nallagandla" className="bg-slate-900 border-amber-500/30 text-white h-11" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="landmark" className="text-xs font-bold text-amber-400 mb-1 block">Landmark / Proximity</Label>
                    <Input id="landmark" value={form.landmark} onChange={(e) => update("landmark", e.target.value)} placeholder="e.g. Near ORR Exit 4A / Opposite Metro Station" className="bg-slate-900 border-amber-500/30 text-white h-11" />
                  </div>

                  <div>
                    <Label htmlFor="mapsUrl" className="text-xs font-bold text-amber-400 mb-1 block">Google Maps Location Link</Label>
                    <Input id="mapsUrl" value={form.mapsUrl || ""} onChange={(e) => update("mapsUrl", e.target.value)} placeholder="https://maps.app.goo.gl/..." className="bg-slate-900 border-amber-500/30 text-white h-11" />
                    <p className="text-[11px] text-slate-400 mt-1">Paste valid Google Maps link for verified location map embed.</p>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 3: PROPERTY & FLOOR DETAILS                    */}
              {/* ---------------------------------------------------- */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-amber-500/20 pb-4">
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                      <Building2 className="text-amber-400" /> Step 3: Property &amp; Floor Details
                    </h2>
                    <p className="text-xs text-slate-300 font-medium mt-1">Specify room configurations, dimensions, floor level, and possession timeline.</p>
                  </div>

                  {/* BHK */}
                  <div>
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">BHK Configuration *</Label>
                    <div className="flex flex-wrap gap-2">
                      {["1 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "5 BHK", "5+ BHK"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => update("bhk", b)}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            form.bhk === b
                              ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md"
                              : "bg-slate-900 border-amber-500/20 text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms / Bathrooms / Balconies */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Bedrooms</Label>
                      <select value={form.bedrooms} onChange={(e) => update("bedrooms", parseInt(e.target.value))} className="w-full h-10 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white">
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Bathrooms</Label>
                      <select value={form.bathrooms} onChange={(e) => update("bathrooms", parseInt(e.target.value))} className="w-full h-10 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white">
                        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Balconies</Label>
                      <select value={form.balconies} onChange={(e) => update("balconies", parseInt(e.target.value))} className="w-full h-10 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white">
                        {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Other Rooms */}
                  <div>
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Other Rooms</Label>
                    <div className="flex flex-wrap gap-3">
                      {OTHER_ROOMS.map((r) => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-2 rounded-xl border border-amber-500/20 text-xs font-semibold">
                          <input
                            type="checkbox"
                            checked={form.otherRooms.includes(r)}
                            onChange={() => toggleArrayItem("otherRooms", r)}
                            className="rounded accent-amber-500"
                          />
                          {r}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Furnishing & Parking */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Furnishing Status</Label>
                      <select value={form.furnishing} onChange={(e) => update("furnishing", e.target.value as FurnishingStatus)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Parking Type &amp; Spaces</Label>
                      <div className="flex gap-2">
                        <select value={form.parkingType} onChange={(e) => update("parkingType", e.target.value as ParkingType)} className="w-2/3 h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                          <option value="Covered Parking">Covered Parking</option>
                          <option value="Open Parking">Open Parking</option>
                          <option value="Both">Both</option>
                        </select>
                        <Input type="number" min={0} value={form.parkingSpaces} onChange={(e) => update("parkingSpaces", parseInt(e.target.value) || 0)} className="w-1/3 h-11 bg-slate-900 border-amber-500/30 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Area Details */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="area" className="text-xs font-bold text-amber-400 mb-1 block">Area Value *</Label>
                      <Input id="area" value={form.area} onChange={(e) => update("area", e.target.value)} placeholder="e.g. 1450" className="bg-slate-900 border-amber-500/30 text-white h-11" required />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Area Type</Label>
                      <select value={form.areaType} onChange={(e) => update("areaType", e.target.value as AreaType)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        <option value="Super Built-up Area">Super Built-up Area</option>
                        <option value="Built-up Area">Built-up Area</option>
                        <option value="Carpet Area">Carpet Area</option>
                        <option value="Plot Area">Plot Area</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Unit</Label>
                      <select value={form.areaUnit} onChange={(e) => update("areaUnit", e.target.value as AreaUnit)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        <option value="Sq.ft.">Sq.ft.</option>
                        <option value="Sq.yd.">Sq.yd.</option>
                        <option value="Acres">Acres</option>
                      </select>
                    </div>
                  </div>

                  {/* Floor Level Details */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Total Floors in Building</Label>
                      <Input type="number" min={1} value={form.totalFloors} onChange={(e) => update("totalFloors", parseInt(e.target.value) || 1)} className="bg-slate-900 border-amber-500/30 text-white h-10" />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Property Floor No.</Label>
                      <Input type="number" min={0} value={form.floorNo || 0} onChange={(e) => update("floorNo", parseInt(e.target.value) || 0)} className="bg-slate-900 border-amber-500/30 text-white h-10" />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Duplex Structure</Label>
                      <select value={form.isDuplex ? "Yes" : "No"} onChange={(e) => update("isDuplex", e.target.value === "Yes")} className="w-full h-10 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        <option value="No">No</option>
                        <option value="Yes">Yes (Duplex)</option>
                      </select>
                    </div>
                  </div>

                  {/* Possession & Availability */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Availability Status</Label>
                      <select value={form.availability} onChange={(e) => update("availability", e.target.value as never)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Resale">Resale</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Possession Month</Label>
                      <select value={form.possessionMonth} onChange={(e) => update("possessionMonth", e.target.value)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Possession Year</Label>
                      <select value={form.possessionYear} onChange={(e) => update("possessionYear", e.target.value)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        {["2024", "2025", "2026", "2027", "2028", "2029", "2030"].map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 4: PRICING, FEATURES & AMENITIES               */}
              {/* ---------------------------------------------------- */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-amber-500/20 pb-4">
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                      <DollarSign className="text-amber-400" /> Step 4: Pricing, Attributes &amp; Amenities
                    </h2>
                    <p className="text-xs text-slate-300 font-medium mt-1">Set clear pricing breakdown, property orientation, features, and searchable amenities.</p>
                  </div>

                  {/* Pricing Fields */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expPrice" className="text-xs font-bold text-amber-400 mb-1 block">Expected Total Price *</Label>
                      <Input id="expPrice" value={form.expectedPrice} onChange={(e) => update("expectedPrice", e.target.value)} placeholder="e.g. 1.25 Cr or 85 Lakhs" className="bg-slate-900 border-amber-500/30 text-white h-11" required />
                    </div>
                    <div>
                      <Label htmlFor="sqftPrice" className="text-xs font-bold text-amber-400 mb-1 block">Price per Sq.ft. (₹)</Label>
                      <Input id="sqftPrice" value={form.pricePerSqft} onChange={(e) => update("pricePerSqft", e.target.value)} placeholder="e.g. 8620" className="bg-slate-900 border-amber-500/30 text-white h-11" />
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Pricing Status</Label>
                      <select value={form.pricingStatus} onChange={(e) => update("pricingStatus", e.target.value as "Negotiable" | "Fixed Price")} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        <option value="Negotiable">Negotiable</option>
                        <option value="Fixed Price">Fixed Price</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Charges Checkboxes */}
                  <div>
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Additional Pricing Breakdown</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {CHARGES_LIST.map((ch) => (
                        <label key={ch} className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-amber-500/20 text-xs font-semibold">
                          <input type="checkbox" checked={form.additionalCharges.includes(ch)} onChange={() => toggleArrayItem("additionalCharges", ch)} className="rounded accent-amber-500" />
                          {ch}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Facing, Flooring, Road Width */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Property Facing</Label>
                      <select value={form.facing} onChange={(e) => update("facing", e.target.value as FacingDirection)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        {["East", "North", "West", "South", "North-East", "North-West", "South-East", "South-West"].map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-amber-400 mb-1 block">Flooring Type</Label>
                      <select value={form.flooring} onChange={(e) => update("flooring", e.target.value as FlooringType)} className="w-full h-11 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                        {["Vitrified", "Marble", "Granite", "Wooden", "Ceramic", "Other"].map((fl) => <option key={fl} value={fl}>{fl}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="roadWidth" className="text-xs font-bold text-amber-400 mb-1 block">Road Width (ft.)</Label>
                      <Input id="roadWidth" value={form.roadWidth} onChange={(e) => update("roadWidth", e.target.value)} placeholder="e.g. 40" className="bg-slate-900 border-amber-500/30 text-white h-11" />
                    </div>
                  </div>

                  {/* Selectable Features */}
                  <div>
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Property Features &amp; Highlights</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {FEATURE_OPTIONS.map((f) => (
                        <label key={f} className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-amber-500/20 text-xs font-semibold">
                          <input type="checkbox" checked={form.features.includes(f)} onChange={() => toggleArrayItem("features", f)} className="rounded accent-amber-500" />
                          {f}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Searchable Amenities */}
                  <div className="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <Label className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Searchable Amenities Multi-Select ({form.amenities.length} selected)</Label>
                      <Input
                        value={amenitySearch}
                        onChange={(e) => setAmenitySearch(e.target.value)}
                        placeholder="Search amenities..."
                        className="bg-slate-900 border-amber-500/30 text-white text-xs h-9 sm:w-60"
                      />
                    </div>

                    <div className="max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-2 bg-slate-900/60 rounded-xl border border-amber-500/10 no-scrollbar">
                      {filteredAmenities.map((a) => {
                        const sel = form.amenities.includes(a);
                        return (
                          <button
                            key={a}
                            type="button"
                            onClick={() => toggleArrayItem("amenities", a)}
                            className={`p-2 rounded-lg text-left text-xs font-bold flex items-center justify-between border transition-all ${
                              sel
                                ? "bg-amber-500/20 border-amber-500 text-amber-300"
                                : "bg-slate-900 border-amber-500/10 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            <span>{a}</span>
                            {sel && <Check size={14} className="text-amber-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amenity Addition */}
                    <div className="flex gap-2 pt-2">
                      <Input
                        value={customAmenity}
                        onChange={(e) => setCustomAmenity(e.target.value)}
                        placeholder="Add custom amenity..."
                        className="bg-slate-900 border-amber-500/30 text-white text-xs h-10"
                      />
                      <Button type="button" onClick={handleAddCustomAmenity} className="bg-amber-500 text-slate-950 font-bold px-4 h-10 shrink-0">
                        <Plus size={16} className="mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 5: DESCRIPTION & AI ENGINE & SEO DIAGNOSTIC     */}
              {/* ---------------------------------------------------- */}
              {step === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-amber-500/20 pb-4">
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                      <FileText className="text-amber-400" /> Step 5: Description &amp; Internal SEO Diagnostic
                    </h2>
                    <p className="text-xs text-slate-300 font-medium mt-1">Provide comprehensive description or use AI generator. Review internal SEO health scorecard.</p>
                  </div>

                  {/* AI Description Button & Textarea */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <Label htmlFor="desc" className="text-xs font-bold text-amber-400 uppercase tracking-wider">Property Description (30 - 5000 chars)</Label>
                      <Button
                        type="button"
                        onClick={handleGenerateAIDescription}
                        disabled={generatingAI}
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs px-4 h-9 shadow-md hover:scale-105 transition-all"
                      >
                        <Sparkles size={14} className="mr-1.5" />
                        {generatingAI ? "Generating..." : "Generate Property Description (AI)"}
                      </Button>
                    </div>

                    <Textarea
                      id="desc"
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      rows={6}
                      maxLength={5000}
                      placeholder="Describe what makes this property unique. Mention location, project highlights, amenities, connectivity, configuration, pricing and possession details..."
                      className="bg-slate-900 border-amber-500/30 text-white font-medium leading-relaxed"
                    />

                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <HelpCircle size={12} className="text-amber-400" />
                      Tip: AI Generator uses ONLY your provided listing fields without inventing unverified facts.
                    </p>
                  </div>

                  {/* RERA Registration */}
                  <div className="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-4">
                    <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">RERA Compliance Details</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-bold text-slate-300 mb-1 block">RERA Registered?</Label>
                        <select value={form.reraRegistered ? "Yes" : "No"} onChange={(e) => update("reraRegistered", e.target.value === "Yes")} className="w-full h-10 bg-slate-900 border border-amber-500/30 rounded-xl px-3 text-sm text-white font-medium">
                          <option value="Yes">Yes (Registered)</option>
                          <option value="No">No / Under Process</option>
                        </select>
                      </div>
                      {form.reraRegistered && (
                        <div>
                          <Label htmlFor="reraNo" className="text-xs font-bold text-slate-300 mb-1 block">RERA Number</Label>
                          <Input id="reraNo" value={form.reraNumber || ""} onChange={(e) => update("reraNumber", e.target.value)} placeholder="e.g. P02400007890" className="bg-slate-900 border-amber-500/30 text-white h-10" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* INTERNAL SEO HEALTH SCORECARD */}
                  <div className="p-6 rounded-2xl bg-[#0B101D] border border-amber-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-white">Internal SEO Diagnostic Score</h3>
                        <p className="text-xs text-slate-400">Calculates optimization completeness for search indexing.</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-3xl font-extrabold ${seoHealth.score >= 80 ? "text-emerald-400" : seoHealth.score >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                          {seoHealth.score}
                        </span>
                        <span className="text-xs text-slate-400">/100</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      {seoHealth.checks.map((c) => (
                        <div key={c.name} className={`p-2.5 rounded-lg border flex items-center justify-between ${c.passed ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300" : "bg-slate-900 border-amber-500/20 text-slate-400"}`}>
                          <span className="font-semibold">{c.name}</span>
                          <span className="font-bold">{c.passed ? "✅ +"+c.weight : "❌ 0/"+c.weight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 6: MEDIA UPLOAD & SUBMIT                        */}
              {/* ---------------------------------------------------- */}
              {step === 6 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-amber-500/20 pb-4">
                    <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                      <ImageIcon className="text-amber-400" /> Step 6: Media Upload &amp; Submission
                    </h2>
                    <p className="text-xs text-slate-300 font-medium mt-1">Upload property cover photo, gallery images, floor plans, and digital brochure.</p>
                  </div>

                  {/* Cover Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Cover Photo * (Main Image)</Label>
                    <div className="p-6 rounded-2xl border-2 border-dashed border-amber-500/40 bg-slate-900/60 text-center space-y-3">
                      {form.heroFile ? (
                        <div className="flex items-center justify-center gap-3 text-emerald-400 font-bold text-sm">
                          <CheckCircle2 size={20} /> Cover Selected: {form.heroFile.name} ({(form.heroFile.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon className="mx-auto text-amber-400" size={36} />
                          <p className="text-sm font-bold text-white">Click or Drag &amp; Drop Cover Image</p>
                          <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP, AVIF (Max 10MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) update("heroFile", file);
                        }}
                        className="w-full text-xs text-slate-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Gallery Photos */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Gallery Photos * (Add 2 or more)</Label>
                    <div className="p-6 rounded-2xl border-2 border-dashed border-amber-500/30 bg-slate-900/60 text-center space-y-3">
                      {form.galleryFiles && form.galleryFiles.length > 0 ? (
                        <p className="text-emerald-400 font-bold text-sm">
                          ✅ {form.galleryFiles.length} Gallery photos selected
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400">Select multiple property, tower &amp; elevation images</p>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length) update("galleryFiles", files);
                        }}
                        className="w-full text-xs text-slate-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Floor Plans & Brochure */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Floor Plan Images</Label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length) update("floorPlanFiles", files);
                        }}
                        className="w-full text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-amber-500/20"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">PDF Brochure Document</Label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) update("brochureFile", file);
                        }}
                        className="w-full text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-amber-500/20"
                      />
                    </div>
                  </div>

                  {/* Brochure Lead Gate Toggle */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-white flex items-center gap-1.5">
                        <Lock size={14} className="text-amber-400" /> Brochure Lead Gate Enable
                      </p>
                      <p className="text-[11px] text-slate-400">Requires buyer contact details before downloading PDF brochure.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={form.requireBrochureLeadGate}
                      onChange={(e) => update("requireBrochureLeadGate", e.target.checked)}
                      className="w-5 h-5 rounded accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Video Links */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="videoUrl" className="text-xs font-bold text-amber-400 mb-1 block">YouTube Video URL</Label>
                      <Input id="videoUrl" value={form.videoUrl || ""} onChange={(e) => update("videoUrl", e.target.value)} placeholder="https://youtube.com/watch?v=..." className="bg-slate-900 border-amber-500/30 text-white h-10 text-xs" />
                    </div>
                    <div>
                      <Label htmlFor="vTour" className="text-xs font-bold text-amber-400 mb-1 block">3D Virtual Tour Link</Label>
                      <Input id="vTour" value={form.virtualTourUrl || ""} onChange={(e) => update("virtualTourUrl", e.target.value)} placeholder="https://my.matterport.com/..." className="bg-slate-900 border-amber-500/30 text-white h-10 text-xs" />
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS & NAVIGATION */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-amber-500/20">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-bold px-6">
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                ) : <div />}

                {step < 6 ? (
                  <Button type="button" onClick={nextStep} className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold px-8 hover:scale-105 transition-all shadow-md">
                    Next Step <ArrowRight size={16} className="ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-10 h-12 text-base shadow-xl hover:scale-105 transition-all"
                  >
                    {submitting ? "Submitting Property..." : "Submit Property for Publication"}
                  </Button>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* WHY LIST WITH NAANI */}
        <section className="py-16 bg-[#0B101D] border-t border-amber-500/20">
          <div className="w-full px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10">
              Why List Your Property with <span className="text-gold-gradient">Naani Projects</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Verified Buyer Network", desc: "Reach thousands of active property seekers looking for apartments and villas across Hyderabad corridors." },
                { icon: ShieldCheck, title: "100% Privacy Protection", desc: "Your personal mobile stays private. All buyer inquiries are pre-qualified by Naani team before connection." },
                { icon: TrendingUp, title: "Automatic SEO Page", desc: "Your property gets an auto-generated canonical page (`/property/:slug`), JSON-LD schema, and sitemap inclusion." },
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-6 space-y-3 border border-amber-500/20">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 text-amber-400">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} pageUrl="https://www.naani.in/list-your-property" />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ListYourPropertyPage;
