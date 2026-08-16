import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Layers,
  Home,
  Ruler,
  Users,
  Crown,
  MapPin,
  Phone,
  Phone as PhoneIcon,
  MessageCircle,
  Download,
  Calendar,
  IndianRupee,
  CheckCircle2,
  ChevronRight,
  School,
  Cross,
  Briefcase,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  FileText,
} from "lucide-react";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import SEOHead from "@/components/SEOHead";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import LeadQualificationPopup from "@/components/LeadQualificationPopup";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAANI_PHONE, NAANI_WA, getLeadProfile, PageContext } from "@/lib/leadProfile";
import {
  SanviProject,
  SANVI_ABOUT,
  SANVI_BUILDER,
  SANVI_BUILDER_SLUG,
  SITE,
  otherSanviProjects,
} from "@/data/sanviProjects";

/* --------------------------- analytics helpers --------------------------- */
type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void; dataLayer?: unknown[] };

const track = (event: string, params: Record<string, unknown> = {}) => {
  const w = window as W;
  try {
    w.gtag?.("event", event, params);
    w.dataLayer?.push({ event, ...params });
    if (event === "brochure_download") w.fbq?.("track", "Lead", { content_name: params.project, action: "Brochure Download" });
    else w.fbq?.("trackCustom", event, params);
  } catch {
    /* analytics is never allowed to break the page */
  }
};

const CATEGORY_ICONS: Record<string, typeof School> = {
  Schools: School,
  Hospitals: Cross,
  "IT Parks & Workplaces": Briefcase,
  "Shopping & Leisure": ShoppingCart,
};

interface Props {
  project: SanviProject;
}

const SanviProjectPage = ({ project: p }: Props) => {
  const [leadOpen, setLeadOpen] = useState(false);
  const [source, setSource] = useState("Enquiry");
  const pendingAction = useRef<null | (() => void)>(null);

  const pageUrl = `${SITE}${p.slug}`;
  const others = otherSanviProjects(p.key);

  const context: PageContext = {
    propertyName: p.name,
    projectName: p.name,
    builderName: SANVI_BUILDER,
    location: p.locationFull,
    propertyType: p.propertyType,
    pageUrl,
    sourcePage: p.slug,
  };

  /** Gate any CTA behind the lead popup — once per session. */
  const gate = useCallback(
    (label: string, action?: () => void) => {
      track("cta_click", { cta: label, project: p.name });
      const existing = getLeadProfile();
      if (existing) {
        action?.();
        return;
      }
      setSource(`${p.name} · ${label}`);
      pendingAction.current = action ?? null;
      setLeadOpen(true);
    },
    [p.name]
  );

  const openBrochure = useCallback(() => {
    track("brochure_download", { project: p.name });
    if (p.brochureUrl) window.open(p.brochureUrl, "_blank", "noopener");
    else
      window.open(
        `https://wa.me/${NAANI_WA}?text=${encodeURIComponent(`Hi, please send me the brochure for ${p.name}, ${p.location}.`)}`,
        "_blank",
        "noopener"
      );
  }, [p]);

  const onCaptured = () => {
    const action = pendingAction.current;
    pendingAction.current = null;
    action?.();
  };

  /* ------------------------------ JSON-LD ------------------------------ */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Naani Projects",
        url: SITE,
        logo: `${SITE}/naani-projects-logo.png`,
        telephone: NAANI_PHONE,
        areaServed: "Hyderabad",
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE}/#localbusiness`,
        name: "Naani Projects",
        image: `${SITE}/naani-projects-logo.png`,
        url: SITE,
        telephone: NAANI_PHONE,
        priceRange: "₹₹₹",
        address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Naani Projects",
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE}/projects?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: p.seoTitle,
        description: p.metaDescription,
        isPartOf: { "@id": `${SITE}/#website` },
        primaryImageOfPage: { "@type": "ImageObject", url: p.ogImage, caption: `${p.name} ${p.location} Hyderabad` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/projects` },
          { "@type": "ListItem", position: 3, name: `Projects in ${p.location}`, item: `${SITE}/projects-in-${p.locationSlug}` },
          { "@type": "ListItem", position: 4, name: p.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "ApartmentComplex",
        name: p.name,
        url: pageUrl,
        image: p.ogImage,
        description: p.metaDescription,
        numberOfAccommodationUnits: p.units,
        amenityFeature: p.amenityGroups.flatMap((g) => g.items).slice(0, 30).map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a,
          value: true,
        })),
        address: {
          "@type": "PostalAddress",
          streetAddress: p.locationFull,
          addressLocality: p.location,
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: p.geo.lat, longitude: p.geo.lng },
      },
      {
        "@type": "Place",
        name: `${p.name}, ${p.location}`,
        address: { "@type": "PostalAddress", addressLocality: p.location, addressRegion: "Telangana", addressCountry: "IN" },
        geo: { "@type": "GeoCoordinates", latitude: p.geo.lat, longitude: p.geo.lng },
      },
      {
        "@type": "RealEstateListing",
        "@id": `${pageUrl}#listing`,
        name: p.name,
        image: p.ogImage,
        url: pageUrl,
        description: p.metaDescription,
        address: {
          "@type": "PostalAddress",
          streetAddress: p.locationFull,
          addressLocality: p.location,
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: p.geo.lat, longitude: p.geo.lng },
        provider: { "@type": "Organization", name: "Naani Projects" },
      },

    ],
  };

  /* ------------------------------- render ------------------------------ */
  const Fact = ({ icon: Icon, label, value }: { icon: typeof Home; label: string; value: string }) => (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-background/40 border border-amber-500/15">
      <span className="w-10 h-10 shrink-0 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-amber-500" />
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-semibold text-sm">{value}</div>
      </div>
    </div>
  );

  const SectionHead = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
    <ScrollReveal>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-amber-500 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">{eyebrow}</span>
        <h2 className="text-2xl md:text-4xl font-bold mt-3">{title}</h2>
        {sub && <p className="text-muted-foreground mt-4 text-sm md:text-base">{sub}</p>}
      </div>
    </ScrollReveal>
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <SEOHead
        title={p.seoTitle}
        description={p.metaDescription}
        canonicalUrl={pageUrl}
        keywords={p.keywords.slice(0, 30).join(", ")}
        ogImage={p.ogImage}
        structuredData={structuredData}
      />

      <ProjectsHeader />

      {/* ============================ HERO ============================ */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/25 via-background to-purple-950/15" />
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-amber-500">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link to="/projects" className="hover:text-amber-500">Projects</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link to={`/projects-in-${p.locationSlug}`} className="hover:text-amber-500">{p.location}</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li aria-current="page" className="text-amber-500 font-medium">{p.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                {SANVI_BUILDER}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  {p.name}
                </span>
              </h1>
              <p className="text-base md:text-xl text-foreground/75 mt-4">{p.heroTagline}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                <MapPin className="w-4 h-4 text-amber-500" /> {p.locationFull}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
                <Fact icon={Home} label="Configuration" value={`${p.configuration} Apartments`} />
                <Fact icon={Ruler} label="Sizes" value={p.units_[0].size.split(" – ")[0] + " – " + p.units_[p.units_.length - 1].size.split(" – ").slice(-1)[0]} />
                <Fact icon={Layers} label="Project Area" value={p.projectArea} />
                <Fact icon={Building2} label="Structure" value={p.towers} />
                <Fact icon={Users} label="Units" value={p.units} />
                <Fact icon={Crown} label="Clubhouse" value={p.clubhouse} />
                <Fact icon={IndianRupee} label="Price From" value={p.oneTimePrice} />
                <Fact icon={Calendar} label="Possession" value={p.possession} />
                <Fact icon={FileText} label="RERA" value="On Request" />
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Button onClick={() => gate("Schedule Site Visit")} className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold">
                  <Calendar className="w-4 h-4 mr-2" /> Schedule Site Visit
                </Button>
                <Button onClick={() => gate("Request Price")} variant="outline" className="border-amber-500/40 hover:bg-amber-500/10">
                  <IndianRupee className="w-4 h-4 mr-2" /> Request Price
                </Button>
                <Button onClick={() => gate("Download Brochure", openBrochure)} variant="outline" className="border-amber-500/40 hover:bg-amber-500/10">
                  <Download className="w-4 h-4 mr-2" /> Download Brochure
                </Button>
                <a
                  href={`https://wa.me/${NAANI_WA}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}, ${p.location}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { project: p.name })}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Now
                </a>
                <a
                  href={`tel:${NAANI_PHONE}`}
                  onClick={() => track("call_click", { project: p.name })}
                  className="call-btn inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                >
                  <PhoneIcon className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>

            {/* Desktop sticky enquiry card */}
            <aside className="hidden lg:block sticky top-28">
              <div className="rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-950/40 to-background p-7 shadow-2xl shadow-amber-900/20">
                <h2 className="text-xl font-bold mb-1">Get {p.name} Price & Cost Sheet</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Share your details — a Hyderabad expert will call you with live availability, floor plans and the complete cost sheet.
                </p>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between"><span className="text-muted-foreground">Loan Option</span><span className="font-semibold text-amber-400">{p.loanPrice}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">One Time</span><span className="font-semibold text-amber-400">{p.oneTimePrice}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Amenity Charges</span><span className="font-semibold">{p.amenitiesCharges}</span></div>
                </div>
                <div className="space-y-2">
                  <Button onClick={() => gate("Sticky Card · Request Price")} className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold">
                    Request Price
                  </Button>
                  <Button onClick={() => gate("Sticky Card · Schedule Site Visit")} variant="outline" className="w-full border-amber-500/40 hover:bg-amber-500/10">
                    Schedule Site Visit
                  </Button>
                  <Button onClick={() => gate("Sticky Card · Download Brochure", openBrochure)} variant="outline" className="w-full border-amber-500/40 hover:bg-amber-500/10">
                    Download Brochure
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground text-center mt-4">
                  Or call <a href={`tel:${NAANI_PHONE}`} className="call-btn text-amber-400 font-semibold">+91 97050 80909</a>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ========================= OVERVIEW ========================= */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHead eyebrow="Project Overview" title={`About ${p.name}, ${p.location}`} />
          <ScrollReveal>
            <div className="space-y-5 text-sm md:text-base leading-relaxed text-foreground/80">
              {p.overview.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================= WHY CHOOSE ========================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-amber-950/5">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Why Choose This Project" title={`Six Reasons Buyers Pick ${p.name}`} />
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {p.whyChoose.map((w) => (
              <StaggerItem key={w.title}>
                <div className="h-full rounded-2xl border border-amber-500/15 bg-background/40 p-6 hover:border-amber-500/40 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-amber-500 mb-3" />
                  <h3 className="font-semibold mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========================= HIGHLIGHTS ========================= */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Project Highlights" title="Key Facts At A Glance" />
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {p.highlights.map((h) => (
              <StaggerItem key={h.title}>
                <div className="h-full rounded-2xl border border-amber-500/15 bg-background/40 p-5 hover:bg-amber-500/5 transition-colors">
                  <Sparkles className="w-5 h-5 text-amber-500 mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{h.title}</h3>
                  <p className="text-xs text-muted-foreground">{h.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== UNIT CONFIGURATIONS ==================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-950/5 to-background">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Unit Configurations" title={`${p.configuration} Apartment Sizes`} sub="Carpet-efficient, Vaastu-aligned floor plates with utility and balcony provision." />
          <div className="overflow-x-auto max-w-4xl mx-auto rounded-2xl border border-amber-500/20">
            <table className="w-full text-sm">
              <caption className="sr-only">{p.name} unit configurations and sizes</caption>
              <thead className="bg-amber-500/10">
                <tr>
                  <th scope="col" className="text-left p-4 font-semibold">Configuration</th>
                  <th scope="col" className="text-left p-4 font-semibold">Size Range</th>
                  <th scope="col" className="text-left p-4 font-semibold">Bathrooms</th>
                  <th scope="col" className="text-left p-4 font-semibold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {p.units_.map((u) => (
                  <tr key={u.type + u.size} className="border-t border-amber-500/10">
                    <td className="p-4 font-semibold text-amber-400">{u.type}</td>
                    <td className="p-4">{u.size}</td>
                    <td className="p-4 text-muted-foreground">{u.bathrooms}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{u.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <Button onClick={() => gate("Unit Table · Request Cost Sheet")} className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
              Request Cost Sheet
            </Button>
          </div>
        </div>
      </section>

      {/* ========================== PRICING ========================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Pricing Information" title={`${p.name} Price & Payment Options`} />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-amber-500/25 bg-background/40 p-7">
              <h3 className="text-lg font-bold mb-2">Loan Option</h3>
              <div className="text-3xl font-bold text-amber-400 mb-4">{p.loanPrice}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Floor Rise: {p.floorRise}</li>
                <li>Amenities Charges: {p.amenitiesCharges}</li>
                <li>East &amp; corner charges applicable</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/25 bg-background/40 p-7">
              <h3 className="text-lg font-bold mb-2">One Time Payment</h3>
              <div className="text-3xl font-bold text-amber-400 mb-4">{p.oneTimePrice}</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Best-value outright purchase rate</li>
                <li>Amenities Charges: {p.amenitiesCharges}</li>
                <li>East &amp; corner charges applicable</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto mt-6">
            {p.priceNote} Prices are indicative, exclusive of GST, registration and statutory charges, and are subject to change at the developer's discretion.
          </p>
          <div className="text-center mt-6">
            <Button onClick={() => gate("Pricing · Unlock Exact Price")} className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
              <IndianRupee className="w-4 h-4 mr-2" /> Unlock Exact Price
            </Button>
          </div>
        </div>
      </section>

      {/* ========================= AMENITIES ========================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-amber-950/5">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Amenities" title={`${p.clubhouse} Of World-Class Amenities`} />
          <div className="grid md:grid-cols-2 gap-6">
            {p.amenityGroups.map((g, i) => (
              <ScrollReveal key={g.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl p-6 md:p-8 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/15">
                  <h3 className="text-lg md:text-xl font-bold mb-5 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{g.title}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-foreground/85">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= CLUBHOUSE ========================= */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHead eyebrow="Clubhouse" title={`Inside The ${p.clubhouse}`} />
          <ScrollReveal>
            <div className="space-y-5 text-sm md:text-base leading-relaxed text-foreground/80">
              {p.clubhouseCopy.map((c, i) => <p key={i}>{c}</p>)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================= SPECIFICATIONS ======================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-950/5 to-background">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Specifications" title="Construction & Finish Standards" />
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {p.specifications.map((s) => (
              <div key={s.head} className="rounded-2xl border border-amber-500/15 bg-background/40 p-6">
                <h3 className="font-semibold text-amber-400 mb-2">{s.head}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FLOOR PLANS ======================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Floor Plans" title={`${p.name} Floor Plans`} sub="Detailed dimensioned plans are shared instantly after you share your contact details." />
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {p.floorPlans.map((f) => (
              <StaggerItem key={f.label}>
                <div className="h-full rounded-2xl border border-amber-500/15 bg-background/40 p-6 flex flex-col">
                  <h3 className="font-semibold text-amber-400 mb-2">{f.label}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{f.desc}</p>
                  <Button onClick={() => gate(`Floor Plan · ${f.label}`, openBrochure)} variant="outline" size="sm" className="mt-4 border-amber-500/40 hover:bg-amber-500/10">
                    <Download className="w-4 h-4 mr-2" /> View Floor Plan
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================== GALLERY =========================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-amber-950/5">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Gallery" title={`${p.name} Gallery`} sub="High-resolution elevations, clubhouse and amenity renders are shared on request." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {["Tower Elevation", "Clubhouse", "Podium Landscape", "Sample Interior"].map((label) => (
              <button
                key={label}
                onClick={() => gate(`Gallery · ${label}`, openBrochure)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-900/25 to-background flex items-center justify-center text-center p-4"
                aria-label={`${p.name} ${label} images — ${p.location} Hyderabad`}
              >
                <span className="text-sm font-semibold text-amber-300 group-hover:scale-105 transition-transform">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== LOCATION & CONNECTIVITY ===================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Location Advantages" title={`Why ${p.location} Works`} sub={p.locationFull} />
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <ScrollReveal variant="slideLeft">
              <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl">
                <iframe
                  src={p.mapEmbed}
                  className="w-full h-[380px] md:h-[460px]"
                  loading="lazy"
                  title={`${p.name} ${p.location} Hyderabad location map`}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href={p.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("maps_click", { project: p.name })}
                className="inline-flex items-center gap-2 text-sm text-amber-400 mt-3"
              >
                <MapPin className="w-4 h-4" /> Open in Google Maps
              </a>
            </ScrollReveal>

            <div>
              <h3 className="text-lg font-bold mb-4">Connectivity</h3>
              <StaggerContainer className="grid sm:grid-cols-2 gap-3">
                {p.connectivity.map((c) => (
                  <StaggerItem key={c.name}>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-background/40 border border-amber-500/15">
                      <MapPin className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.distance}</div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {p.nearby.map((n) => {
              const Icon = CATEGORY_ICONS[n.category] ?? MapPin;
              return (
                <div key={n.category} className="rounded-2xl border border-amber-500/15 bg-background/40 p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-amber-500" /> Nearby {n.category}
                  </h3>
                  <ul className="space-y-2">
                    {n.items.map((it) => (
                      <li key={it.name} className="flex justify-between gap-3 text-sm">
                        <span className="text-foreground/80">{it.name}</span>
                        <span className="text-muted-foreground shrink-0">{it.distance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== INVESTMENT POTENTIAL ===================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-950/5 to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHead eyebrow="Investment Potential" title={`Is ${p.location} A Good Investment?`} />
          <ScrollReveal>
            <div className="space-y-5 text-sm md:text-base leading-relaxed text-foreground/80">
              {p.investment.map((t, i) => (
                <p key={i} className="flex gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  <span>{t}</span>
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===================== ABOUT THIS PROJECT ===================== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHead eyebrow="About This Project" title={`${p.name} — The Complete Picture`} />
          <ScrollReveal>
            <div className="space-y-5 text-sm md:text-base leading-relaxed text-foreground/80">
              {p.aboutProject.map((t, i) => <p key={i}>{t}</p>)}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================= ABOUT DEVELOPER ======================= */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-amber-950/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHead eyebrow="About The Developer" title={SANVI_BUILDER} />
          <ScrollReveal>
            <div className="space-y-5 text-sm md:text-base leading-relaxed text-foreground/80">
              {SANVI_ABOUT.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            <div className="mt-6">
              <Link to={`/${SANVI_BUILDER_SLUG}`} className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm">
                View the full builder profile <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================= RELATED PROJECTS ======================= */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHead eyebrow="Related Projects" title={`More Projects by ${SANVI_BUILDER}`} />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={o.slug}
                className="rounded-2xl border border-amber-500/20 bg-background/40 p-6 hover:border-amber-500/50 transition-colors"
              >
                <h3 className="font-bold text-amber-400 mb-1">{o.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{o.locationFull}</p>
                <p className="text-sm text-foreground/80">{o.configuration} · {o.projectArea} · {o.clubhouse}</p>
                <span className="inline-flex items-center gap-1 text-sm text-amber-400 mt-3">View project <ChevronRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-950/5 to-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHead eyebrow="FAQs" title={`${p.name} — Frequently Asked Questions`} />
          <Accordion type="single" collapsible className="w-full">
            {p.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-amber-500/15">
                <AccordionTrigger className="text-left text-sm md:text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ======================= INTERNAL LINKS ======================= */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl md:text-2xl font-bold mb-8">Explore More on Naani Projects</h2>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {[
              { label: "Apartments in Mallampet", to: "/projects-in-mallampet" },
              { label: "Apartments in Bachupally", to: "/projects-in-bachupally" },
              { label: "Apartments in Kristareddypet", to: "/projects-in-kristareddypet" },
              { label: "Projects Near ORR Exit 4", to: "/projects?q=ORR" },
              { label: "2 BHK Apartments", to: "/projects?bhk=2" },
              { label: "3 BHK Apartments", to: "/projects?bhk=3" },
              { label: "Luxury Apartments in Hyderabad", to: "/projects?type=Apartment" },
              { label: "Under Construction Projects", to: "/projects?status=Under%20Construction" },
              { label: "Ready to Move Projects", to: "/projects?status=Ready" },
              { label: `${SANVI_BUILDER} Projects`, to: `/${SANVI_BUILDER_SLUG}` },
              { label: "All Projects", to: "/projects" },
              { label: "Contact Naani Projects", to: "/contact-us" },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="px-4 py-2 rounded-full border border-amber-500/25 bg-background/40 text-xs md:text-sm hover:border-amber-500/60 hover:bg-amber-500/10 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            Related searches: {p.relatedSearches.join(" · ")}
          </p>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-amber-900/30 to-slate-900 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Book Your <span className="text-amber-400">Dream Home</span> Today
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-base">
            Experience elevated living at {p.name}. Discover spacious floor plans, premium amenities, and a vibrant community designed for modern lifestyles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <button data-lead-gate="sitevisit" onClick={() => gate("Bottom CTA · Schedule Site Visit")} className="lead-btn bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold w-52 h-12 inline-flex items-center justify-center rounded-xl shadow-lg transition-all hover:scale-105">
              Schedule Site Visit
            </button>
            <button data-lead-gate="brochure" onClick={() => gate("Bottom CTA · Get Offers")} className="lead-btn bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold w-52 h-12 inline-flex items-center justify-center rounded-xl shadow-lg transition-all hover:scale-105">
              Get Latest Offers
            </button>
            <a href={`https://wa.me/919705080909?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`} target="_blank" rel="noopener noreferrer" data-lead-gate="whatsapp" className="whatsapp-btn bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold w-52 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-6">
            <a href="tel:+919705080909" className="call-btn text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors inline-flex items-center gap-2">
              <Phone size={18} /> Call Now: +91 97050 80909
            </a>
          </div>
        </div>
      </section>

      <ProjectsFooter />

      {/* ==================== MOBILE STICKY CTA BAR ==================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-amber-500/20 px-2 py-2">
        <div className="flex items-stretch gap-1.5">
          <a
            href={`tel:${NAANI_PHONE}`}
            onClick={() => track("call_click", { project: p.name })}
            className="call-btn flex-1 flex flex-col items-center justify-center gap-0.5 bg-blue-600 text-white rounded-lg py-2 text-[10px] font-semibold"
          >
            <PhoneIcon className="w-4 h-4" /> Call
          </a>
          <a
            href={`https://wa.me/${NAANI_WA}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}, ${p.location}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { project: p.name })}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-green-600 text-white rounded-lg py-2 text-[10px] font-semibold"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <button
            onClick={() => gate("Mobile Bar · Request Price")}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-amber-600 text-white rounded-lg py-2 text-[10px] font-semibold"
          >
            <IndianRupee className="w-4 h-4" /> Price
          </button>
          <button
            onClick={() => gate("Mobile Bar · Download Brochure", openBrochure)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-amber-700 text-white rounded-lg py-2 text-[10px] font-semibold"
          >
            <Download className="w-4 h-4" /> Brochure
          </button>
          <button
            onClick={() => gate("Mobile Bar · Schedule Site Visit")}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-purple-700 text-white rounded-lg py-2 text-[10px] font-semibold"
          >
            <Calendar className="w-4 h-4" /> Visit
          </button>
        </div>
      </div>

      <LeadQualificationPopup
        open={leadOpen}
        onOpenChange={setLeadOpen}
        context={context}
        leadSource={source}
        onCaptured={onCaptured}
      />
    </div>
  );
};

export default SanviProjectPage;
