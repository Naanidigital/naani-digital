import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQSection from "@/components/FAQSection";
import { HYDERABAD_LOCATIONS } from "@/config/seoKeywords";
import { getSeoPageData } from "@/lib/seoDataHelper";
import { MapPin, Building2, Home, CheckCircle2, ArrowRight, Shield, Award, Sparkles } from "lucide-react";

const HyderabadHubPage = () => {
  const pageData = getSeoPageData("hub");

  return (
    <>
      <SEOHead
        title={pageData.title}
        description={pageData.description}
        canonicalUrl={pageData.canonicalUrl}
        structuredData={pageData.structuredData}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* HERO SECTION */}
        <section className="relative pt-28 pb-14 bg-[#F1F1F1] border-b border-[#0080FF]/20">
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="text-xs text-[#0080FF] mb-6 font-medium">
              <Link to="/" className="hover:text-[#040957] transition-colors">Home</Link> / <span className="text-[#040957] font-semibold">Hyderabad Real Estate</span>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-block bg-[#0080FF]/15 border border-[#0080FF]/30 text-[#0080FF] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                Hyderabad Real Estate Discovery Hub
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#040957]">
                Properties &amp; Flats for Sale in Hyderabad
              </h1>
              <p className="text-base md:text-lg text-slate-700 mb-8 leading-relaxed">
                {pageData.intro}
              </p>

              {/* QUICK BHK FILTER TILES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                <Link to="/hyderabad/2-bhk-flats" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 text-center group shadow-md">
                  <Home className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-sm text-foreground">2 BHK Flats</p>
                  <p className="text-xs text-muted-foreground">Top Locations</p>
                </Link>
                <Link to="/hyderabad/3-bhk-flats" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 text-center group shadow-md">
                  <Building2 className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-sm text-foreground">3 BHK Flats</p>
                  <p className="text-xs text-muted-foreground">Luxury Living</p>
                </Link>
                <Link to="/projects" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 text-center group shadow-md">
                  <Sparkles className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-sm text-foreground">All Projects</p>
                  <p className="text-xs text-muted-foreground">Verified Listings</p>
                </Link>
                <Link to="/list-your-property" className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 text-center group shadow-md">
                  <Award className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-sm text-foreground">List Property</p>
                  <p className="text-xs text-muted-foreground">Free Listing</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TOP HYDERABAD LOCATIONS GRID */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-primary text-xs font-semibold uppercase tracking-widest">Explore Top Corridors</span>
                <h2 className="text-2xl md:text-4xl font-bold mt-1">Popular Residential Locations in Hyderabad</h2>
              </div>
              <Link to="/projects" className="text-primary hover:underline text-sm font-semibold inline-flex items-center gap-1">
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {HYDERABAD_LOCATIONS.slice(0, 16).map((loc) => (
                <div key={loc.slug} className="bg-card border border-border/80 rounded-2xl p-5 hover:border-primary/40 transition-all hover:shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-bold text-base text-foreground">{loc.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {loc.description || `Explore 2 & 3 BHK flats for sale in ${loc.name}, Hyderabad.`}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Link to={`/hyderabad/${loc.slug}/2-bhk-flats`} className="text-primary hover:underline font-medium">
                      2 BHK
                    </Link>
                    <span className="text-muted-foreground">&bull;</span>
                    <Link to={`/hyderabad/${loc.slug}/3-bhk-flats`} className="text-primary hover:underline font-medium">
                      3 BHK
                    </Link>
                    <span className="text-muted-foreground">&bull;</span>
                    <Link to={`/projects-in-${loc.slug}`} className="text-muted-foreground hover:text-foreground">
                      All
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">Featured Residential Projects in Hyderabad</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.projects.slice(0, 6).map((p) => (
                <Link key={p.slug} to={p.slug} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-gold">
                  <div className="p-6 space-y-3">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-md">
                      {p.location}
                    </span>
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Spacious 2 &amp; 3 BHK Gated Community Apartments in {p.location}, Hyderabad.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>Explore Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BUYING GUIDES LINK SECTION */}
        <section className="py-12 px-4 bg-muted/40 border-t border-b border-border/50">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Hyderabad Property Buyer Guides</h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-8">
              Explore insightful buying guides, location comparisons, and pricing insights prepared by Naani property experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/guides/2-bhk-flats-in-hyderabad" className="px-6 py-3 rounded-xl bg-card border border-border hover:border-primary text-sm font-semibold text-foreground hover:text-primary transition-all shadow-sm">
                2 BHK Buying Guide Hyderabad →
              </Link>
              <Link to="/guides/3-bhk-flats-in-hyderabad" className="px-6 py-3 rounded-xl bg-card border border-border hover:border-primary text-sm font-semibold text-foreground hover:text-primary transition-all shadow-sm">
                3 BHK Buying Guide Hyderabad →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <FAQSection items={pageData.faqs} />
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default HyderabadHubPage;
