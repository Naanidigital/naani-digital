import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, MessageCircle, Phone, Calendar, ChevronRight, Building2, Home } from "lucide-react";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProjects, type DBProject } from "@/lib/projectsApi";
import { slugify, matchesSlug, titleCase } from "@/lib/seoSlug";
import NotFound from "@/pages/NotFound";

const SITE = "https://www.naani.in";
const WA = "https://wa.me/919705080909";
const TEL = "tel:+919705080909";

// Curated long-tail locations with extra context. Any other location still works dynamically.
const LOCATION_INTRO: Record<string, string> = {
  "kokapet": "Kokapet is Hyderabad's most premium emerging hub — home to Financial District, Neopolis SEZ, and ₹3 Cr+ luxury launches by Brigade, Aparna and My Home.",
  "gachibowli": "Gachibowli is the IT heartbeat of Hyderabad — minutes from Microsoft, Wipro and the Outer Ring Road, with strong rental yields for 2 & 3 BHK apartments.",
  "tellapur": "Tellapur is the fastest-growing western corridor with seamless ORR connectivity, top schools and large gated communities by Rajapushpa, MyHome and Aparna.",
  "financial-district": "Financial District is Hyderabad's banking & fintech hub — premium gated towers, walkable office access and strong long-term appreciation.",
  "narsingi": "Narsingi offers a calm residential pocket on the ORR — strong builder presence, easy airport access and balanced 2/3 BHK pricing.",
  "kondapur": "Kondapur is a mature IT-adjacent neighborhood — ready-to-move stock, excellent social infra and tested rental demand.",
  "miyapur": "Miyapur is a metro-connected family corridor — value 2 & 3 BHK options with Aparna, Team4 and Anuhar launches.",
  "bachupally": "Bachupally is the new growth pocket on NH-65 — affordable luxury launches by Prestige, Candeur and Aspire Spaces, with strong upcoming infra.",
  "shamshabad": "Shamshabad is the airport-corridor investment story — villa plots, plotted developments and high land appreciation.",
  "tukkuguda": "Tukkuguda is the premium villa belt near RGIA — 4 BHK villas, gated layouts and excellent ORR/airport access.",
};

const slug = (s: string) => slugify(s);

const buildFaqs = (loc: string) => [
  { question: `Why invest in property in ${loc}, Hyderabad?`, answer: `${loc} offers strong appreciation, proximity to IT hubs, ORR connectivity and a fast-improving social infrastructure — making it one of Hyderabad's most search-driven micro-markets in 2026.` },
  { question: `What is the price range for apartments in ${loc}?`, answer: `Prices in ${loc} typically range from ₹1.2 Cr to ₹4.5 Cr depending on builder reputation, configuration (2/3/4 BHK), tower views and amenity quality. Naani Projects gets you the best on-ground negotiated rates.` },
  { question: `Which are the top builders launching projects in ${loc}?`, answer: `Top builders active in ${loc} include Aparna, Brigade, Prestige, My Home, Rajapushpa, Candeur, Anuhar and Team4 — all available on Naani Projects with verified RERA details.` },
  { question: `Are ready-to-move flats available in ${loc}?`, answer: `Yes. We list both Ready-to-Move and Under-Construction inventory in ${loc}. Filter on the listing or message us on WhatsApp at +91 97050 80909 for handpicked options.` },
  { question: `Is ${loc} good for rental investment?`, answer: `${loc} sees consistent rental demand from IT, BFSI and education professionals. Expected rental yield ranges from 3.2% to 4.5% depending on configuration and project amenities.` },
  { question: `How do I book a site visit in ${loc}?`, answer: `Click any project, choose "Book Site Visit", or message +91 97050 80909 on WhatsApp. Free cab pickup is available for shortlisted premium projects.` },
  { question: `Do you charge any brokerage to buyers?`, answer: `No. Naani Projects is a buyer-side advisor. We are paid by builders, never by buyers — you get unbiased recommendations at the best builder price.` },
];

const SIMILAR: Record<string, string[]> = {
  "kokapet": ["narsingi", "financial-district", "gachibowli", "neopolis"],
  "gachibowli": ["kondapur", "nanakramguda", "kokapet", "financial-district"],
  "tellapur": ["bachupally", "kollur", "narsingi", "gachibowli"],
  "financial-district": ["kokapet", "narsingi", "gachibowli", "nanakramguda"],
  "narsingi": ["kokapet", "manikonda", "financial-district", "puppalaguda"],
  "kondapur": ["gachibowli", "madhapur", "miyapur", "kothaguda"],
  "miyapur": ["bachupally", "kukatpally", "kondapur", "madinaguda"],
  "bachupally": ["miyapur", "kukatpally", "pragathi-nagar", "tellapur"],
  "shamshabad": ["tukkuguda", "rajendra-nagar", "kothur", "adibatla"],
  "tukkuguda": ["shamshabad", "adibatla", "rajendra-nagar", "kothur"],
};

const LocationHubPage = () => {
  const { locationSlug = "" } = useParams();
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  const matching = useMemo(
    () => projects.filter((p) => matchesSlug(p.location, locationSlug)),
    [projects, locationSlug]
  );

  const displayName = useMemo(() => {
    const fromData = matching.find((p) => p.location)?.location;
    return fromData ?? titleCase(locationSlug);
  }, [matching, locationSlug]);

  const intro = LOCATION_INTRO[locationSlug.toLowerCase()] ??
    `Discover the best premium and luxury residential projects in ${displayName}, Hyderabad — handpicked, RERA-verified and curated by Naani Projects.`;

  const faqs = buildFaqs(displayName);
  const canonical = `${SITE}/projects-in-${locationSlug}`;
  const title = `Projects in ${displayName}, Hyderabad | Apartments & Villas | Naani Projects`;
  const description = `Find verified premium apartments, villas and plots in ${displayName}, Hyderabad. RERA-approved, builder-direct pricing. Talk to Naani Projects on WhatsApp.`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/projects` },
      { "@type": "ListItem", position: 3, name: displayName, item: canonical },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `Naani Projects — ${displayName}`,
    image: `${SITE}/naani-projects-logo.png`,
    url: canonical,
    telephone: "+91 9705080909",
    areaServed: { "@type": "Place", name: `${displayName}, Hyderabad` },
    address: { "@type": "PostalAddress", addressLocality: displayName, addressRegion: "Telangana", addressCountry: "IN" },
  };

  const itemListSchema = matching.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: matching.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${p.custom_page_path || `/projects/${p.slug}`}`,
      name: p.name,
    })),
  } : null;

  const similar = (SIMILAR[locationSlug.toLowerCase()] ?? []).slice(0, 6);

  // If no projects AND no curated intro, treat as 404 (prevents thin pages indexing junk).
  if (!loading && matching.length === 0 && !LOCATION_INTRO[locationSlug.toLowerCase()]) {
    return <NotFound />;
  }

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonical}
        keywords={`projects in ${displayName}, apartments in ${displayName}, villas in ${displayName}, flats in ${displayName} Hyderabad, ${displayName} real estate, Naani Projects ${displayName}`}
        structuredData={breadcrumbSchema}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        {itemListSchema && <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>}
      </Helmet>

      <div className="min-h-screen bg-background">
        <ProjectsHeader />

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="pt-24 pb-2 container mx-auto px-4 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <ChevronRight size={14} />
            <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
            <ChevronRight size={14} />
            <li className="text-foreground font-semibold">{displayName}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative py-12 md:py-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">Hyderabad Properties</span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-3">
              <span className="text-foreground">Projects in</span>{" "}
              <span className="text-gold-gradient">{displayName}</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-5 max-w-3xl">{intro}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground font-semibold">
                <a href={`${WA}?text=${encodeURIComponent(`Hi, share top projects in ${displayName}, Hyderabad.`)}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" size={18} /> WhatsApp for {displayName} Projects
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary">
                <a href={TEL}><Phone className="mr-2" size={18} /> Call +91 97050 80909</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent/40 text-accent">
                <a href={`${WA}?text=${encodeURIComponent(`Hi, I want to book a site visit in ${displayName}.`)}`} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2" size={18} /> Book Site Visit
                </a>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              {[
                { icon: Building2, label: "Active Projects", value: loading ? "…" : `${matching.length}+` },
                { icon: Home, label: "Configurations", value: "2/3/4 BHK" },
                { icon: MapPin, label: "Location", value: `${displayName}, HYD` },
                { icon: Calendar, label: "Possession", value: "2025-2028" },
              ].map((s) => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <s.icon className="mx-auto text-primary mb-1.5" size={20} />
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects grid */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Featured Projects in {displayName}
            </h2>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-2xl" />
                ))}
              </div>
            ) : matching.length === 0 ? (
              <div className="text-center py-12 glass-card">
                <Home size={40} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-foreground mb-2">New launches coming soon in {displayName}.</p>
                <p className="text-muted-foreground mb-6">Message us on WhatsApp to get early access to off-market deals.</p>
                <Button asChild className="bg-gradient-gold text-primary-foreground font-semibold">
                  <a href={`${WA}?text=${encodeURIComponent(`Hi, alert me about new projects in ${displayName}.`)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" size={16} /> Get Early Access
                  </a>
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matching.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </div>
            )}
          </div>
        </section>

        {/* Why this location */}
        <section className="py-14 bg-card/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Buy Property in {displayName}?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                `Strong builder presence and RERA-approved launches in ${displayName}.`,
                `Excellent ORR / Metro / IT-corridor connectivity from ${displayName}.`,
                `Strong appreciation and 3-4% rental yields for premium 2 & 3 BHK stock.`,
                `Top schools, hospitals and retail catchment within 5 km of ${displayName}.`,
                `Naani Projects gets you builder-direct pricing — no buyer brokerage.`,
                `Verified inventory, exclusive launch alerts and WhatsApp-first support.`,
              ].map((line) => (
                <div key={line} className="glass-card p-5 text-sm text-muted-foreground leading-relaxed">{line}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Similar locations */}
        {similar.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Explore Similar Locations</h2>
              <div className="flex flex-wrap gap-3">
                {similar.map((s) => (
                  <Link key={s} to={`/projects-in-${s}`} className="px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 text-sm font-medium transition">
                    Projects in {titleCase(s)}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQSection faqs={faqs} pageUrl={canonical} />

        {/* CTA */}
        <section className="py-14 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-3">Find Your Dream Home in {displayName}</h2>
            <p className="text-muted-foreground mb-6">Tell us your budget and preferences — we'll share matched options instantly.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground font-semibold">
                <a href={`${WA}?text=${encodeURIComponent(`Hi, share matched property options in ${displayName}.`)}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" size={18} /> WhatsApp Naani Projects
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary">
                <a href={TEL}><Phone className="mr-2" size={18} /> Call +91 97050 80909</a>
              </Button>
            </div>
          </div>
        </section>

        <ProjectsFooter />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default LocationHubPage;
