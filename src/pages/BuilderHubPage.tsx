import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MessageCircle, Phone, ChevronRight, Building2, Home, Award, ShieldCheck } from "lucide-react";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProjects, type DBProject } from "@/lib/projectsApi";
import { matchesSlug, isBuilderSeoSlug, builderSlugFromSeo, titleCase } from "@/lib/seoSlug";
import NotFound from "@/pages/NotFound";

const SITE = "https://www.naani.in";
const WA = "https://wa.me/919705080909";
const TEL = "tel:+919705080909";

const BUILDER_BLURB: Record<string, string> = {
  "aparna-constructions": "Aparna Constructions is one of Hyderabad's most trusted developers — known for premium gated communities across Kondapur, Tellapur, Bachupally and Kompally.",
  "prestige-group": "Prestige Group brings Bangalore's premium standards to Hyderabad with landmark launches in Bachupally, Rajendra Nagar and the Financial District corridor.",
  "brigade-group": "Brigade Group is renowned for premium high-rise communities — including Brigade Gateway Neopolis at Kokapet, one of Hyderabad's most-watched launches.",
  "my-home-group": "My Home Group is Hyderabad's flagship developer — over 30+ delivered communities across Madhapur, Tellapur, Kondapur and Kokapet.",
  "rajapushpa-properties": "Rajapushpa Properties delivers premium 3 & 4 BHK communities in Tellapur, Manikonda and the western ORR belt.",
  "candeur-constructions": "Candeur Constructions is known for spacious premium homes in Bachupally and Tellapur with strong post-handover service.",
  "godrej-properties": "Godrej Properties brings its trusted national brand to Hyderabad with premium launches in Kukatpally and the Western corridor.",
};

const BuilderHubPage = () => {
  const { builderSeoSlug = "" } = useParams();
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  // Guard: only handle URLs ending in -projects-hyderabad
  if (!isBuilderSeoSlug(builderSeoSlug)) return <NotFound />;

  const rawSlug = builderSlugFromSeo(builderSeoSlug);

  const matching = useMemo(
    () => projects.filter((p) => matchesSlug(p.builder, rawSlug)),
    [projects, rawSlug]
  );

  const displayName = useMemo(() => {
    const fromData = matching.find((p) => p.builder)?.builder;
    return fromData ?? titleCase(rawSlug);
  }, [matching, rawSlug]);

  const blurb = BUILDER_BLURB[rawSlug.toLowerCase()] ??
    `${displayName} is among Hyderabad's noted developers. Browse their active and upcoming projects below — all curated and verified by Naani Projects.`;

  const canonical = `${SITE}/${builderSeoSlug}`;
  const title = `${displayName} Projects in Hyderabad | Active & Upcoming | Naani Projects`;
  const description = `Explore all ${displayName} projects in Hyderabad — RERA-verified, builder-direct pricing, expert guidance from Naani Projects. WhatsApp +91 97050 80909.`;

  const faqs = [
    { question: `How many ongoing projects does ${displayName} have in Hyderabad?`, answer: `${displayName} currently has ${matching.length || "multiple"} active and upcoming residential projects across Hyderabad, all listed on Naani Projects.` },
    { question: `Are ${displayName} projects RERA-approved?`, answer: `Yes. Every ${displayName} project listed on Naani Projects is RERA-approved. Share the project on WhatsApp at +91 97050 80909 to receive the RERA number instantly.` },
    { question: `What is the price range of ${displayName} apartments?`, answer: `${displayName} pricing typically ranges from ₹1.2 Cr to ₹4.5 Cr depending on configuration, tower views and amenities. Naani Projects negotiates the best builder-direct deal.` },
    { question: `Where can I see floor plans and brochures of ${displayName}?`, answer: `Click any ${displayName} project below to view configurations, floor plans, master plan and pricing. For full brochures, message us on WhatsApp.` },
    { question: `Does Naani Projects charge anything to buyers?`, answer: `No. Buyers pay nothing. Naani Projects is paid by builders — you get unbiased ${displayName} recommendations at the best on-ground price.` },
    { question: `How do I book a site visit for a ${displayName} project?`, answer: `Tap WhatsApp on any ${displayName} project page or message +91 97050 80909. Free cab pickup is available for shortlisted premium tours.` },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/projects` },
      { "@type": "ListItem", position: 3, name: displayName, item: canonical },
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: displayName,
    url: canonical,
    description: blurb,
    areaServed: { "@type": "Place", name: "Hyderabad, Telangana, India" },
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

  if (!loading && matching.length === 0 && !BUILDER_BLURB[rawSlug.toLowerCase()]) {
    return <NotFound />;
  }

  // Build location chip set for internal linking
  const locations = Array.from(new Set(matching.map((p) => p.location).filter(Boolean))) as string[];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonical}
        keywords={`${displayName} Hyderabad, ${displayName} projects, ${displayName} apartments, ${displayName} flats, ${displayName} new launch, Naani Projects ${displayName}`}
        structuredData={breadcrumbSchema}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        {itemListSchema && <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>}
      </Helmet>

      <div className="min-h-screen bg-background">
        <ProjectsHeader />

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
            <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">Builder Spotlight</span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-3">
              <span className="text-gold-gradient">{displayName}</span>{" "}
              <span className="text-foreground">Projects in Hyderabad</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-5 max-w-3xl">{blurb}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground font-semibold">
                <a href={`${WA}?text=${encodeURIComponent(`Hi, share all ${displayName} projects in Hyderabad with the best price.`)}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" size={18} /> WhatsApp for {displayName} Projects
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary">
                <a href={TEL}><Phone className="mr-2" size={18} /> Call +91 97050 80909</a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              {[
                { icon: Building2, label: "Active Projects", value: loading ? "…" : `${matching.length}+` },
                { icon: Award, label: "RERA", value: "Approved" },
                { icon: ShieldCheck, label: "Pricing", value: "Builder Direct" },
                { icon: Home, label: "Coverage", value: "All Hyderabad" },
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
              {displayName} — Active & Upcoming Projects
            </h2>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (<Skeleton key={i} className="h-96 rounded-2xl" />))}
              </div>
            ) : matching.length === 0 ? (
              <div className="text-center py-12 glass-card">
                <Home size={40} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-foreground mb-2">New {displayName} launches coming soon.</p>
                <p className="text-muted-foreground mb-6">Get notified the moment they go live.</p>
                <Button asChild className="bg-gradient-gold text-primary-foreground font-semibold">
                  <a href={`${WA}?text=${encodeURIComponent(`Hi, alert me about new ${displayName} launches in Hyderabad.`)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" size={16} /> Notify Me
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

        {/* Locations served */}
        {locations.length > 0 && (
          <section className="py-12 bg-card/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">
                {displayName} Locations in Hyderabad
              </h2>
              <div className="flex flex-wrap gap-3">
                {locations.map((loc) => (
                  <Link key={loc} to={`/projects-in-${loc.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 text-sm font-medium transition">
                    Projects in {loc}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQSection faqs={faqs} pageUrl={canonical} />

        <section className="py-14 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-3">Talk to a {displayName} Expert</h2>
            <p className="text-muted-foreground mb-6">Get pricing, availability and an honest opinion within minutes.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground font-semibold">
                <a href={`${WA}?text=${encodeURIComponent(`Hi, I'm interested in ${displayName} projects.`)}`} target="_blank" rel="noopener noreferrer">
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

export default BuilderHubPage;
