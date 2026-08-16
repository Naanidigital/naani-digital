import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQSection from "@/components/FAQSection";
import { getSeoPageData } from "@/lib/seoDataHelper";
import { HYDERABAD_LOCATIONS } from "@/config/seoKeywords";
import { MapPin, Building2, Home, CheckCircle2, ArrowRight, ShieldCheck, Phone, MessageCircle } from "lucide-react";

interface BhkLandingPageProps {
  forcedType?: "bhk-2" | "bhk-3";
}

const BhkLandingPage = ({ forcedType }: BhkLandingPageProps) => {
  const { locationSlug, bhkSlug } = useParams<{ locationSlug?: string; bhkSlug?: string }>();

  // Resolve type
  let type: "bhk-2" | "bhk-3" | "location-bhk" = forcedType || "bhk-2";
  let bhkTarget: "2 BHK" | "3 BHK" = forcedType === "bhk-3" ? "3 BHK" : "2 BHK";

  if (locationSlug && bhkSlug) {
    type = "location-bhk";
    bhkTarget = bhkSlug.startsWith("3") ? "3 BHK" : "2 BHK";
  } else if (!forcedType && bhkSlug) {
    type = bhkSlug.startsWith("3") ? "bhk-3" : "bhk-2";
    bhkTarget = bhkSlug.startsWith("3") ? "3 BHK" : "2 BHK";
  }

  const pageData = getSeoPageData(type, locationSlug, bhkTarget);

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
            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb" className="text-xs text-[#0080FF] mb-6 flex flex-wrap gap-1 items-center font-medium">
              {pageData.breadcrumbs.map((b, i) => (
                <span key={b.name} className="flex items-center gap-1">
                  {i > 0 && <span className="text-slate-400">/</span>}
                  {i === pageData.breadcrumbs.length - 1 ? (
                    <span className="text-[#040957] font-bold">{b.name}</span>
                  ) : (
                    <Link to={b.item.replace("https://www.naani.in", "")} className="hover:text-[#0080FF] transition-colors">
                      {b.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>

            <div className="max-w-4xl">
              <span className="inline-block bg-[#0080FF]/15 border border-[#0080FF]/30 text-[#0080FF] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                Verified {pageData.bhkType} Listings
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#040957]">
                {pageData.h1}
              </h1>
              <p className="text-base md:text-lg text-slate-700 mb-8 leading-relaxed">
                {pageData.intro}
              </p>

              {/* TOGGLE 2 BHK / 3 BHK */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to={locationSlug ? `/hyderabad/${locationSlug}/2-bhk-flats` : "/hyderabad/2-bhk-flats"}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    bhkTarget === "2 BHK"
                      ? "bg-[#0080FF] text-white shadow-sm"
                      : "bg-white border border-[#0080FF]/30 text-[#040957] hover:border-[#0080FF]"
                  }`}
                >
                  2 BHK {pageData.locationName ? `in ${pageData.locationName}` : "Flats"}
                </Link>
                <Link
                  to={locationSlug ? `/hyderabad/${locationSlug}/3-bhk-flats` : "/hyderabad/3-bhk-flats"}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    bhkTarget === "3 BHK"
                      ? "bg-[#0080FF] text-white shadow-sm"
                      : "bg-white border border-[#0080FF]/30 text-[#040957] hover:border-[#0080FF]"
                  }`}
                >
                  3 BHK {pageData.locationName ? `in ${pageData.locationName}` : "Flats"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS LISTING SECTION */}
        <section className="py-16 px-4 bg-[#F1F1F1]">
          <div className="container mx-auto max-w-6xl">
            {pageData.projects.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#040957]">
                    Listed {pageData.bhkType} Projects {pageData.locationName ? `in ${pageData.locationName}` : "in Hyderabad"} ({pageData.projects.length})
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pageData.projects.map((p) => (
                    <div key={p.slug} className="group bg-white border border-[#0080FF]/25 rounded-2xl overflow-hidden hover:border-[#0080FF] transition-all hover:shadow-md flex flex-col justify-between">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 bg-[#0080FF]/10 text-[#0080FF] text-xs font-bold px-3 py-1 rounded-full border border-[#0080FF]/20">
                            <MapPin size={12} /> {p.location}
                          </span>
                          <span className="text-xs text-[#040957] font-bold flex items-center gap-1">
                            <ShieldCheck size={14} className="text-[#0080FF]" /> RERA Approved
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-[#040957] group-hover:text-[#0080FF] transition-colors mb-1">{p.name}</h3>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {p.bhk.map((b) => (
                              <span key={b} className={`text-xs font-bold px-2.5 py-0.5 rounded ${b === pageData.bhkType ? "bg-[#0080FF]/15 text-[#0080FF] border border-[#0080FF]/30" : "bg-slate-100 text-slate-700"}`}>
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Premium {p.bhk.join(", ")} luxury gated community residences with clubhouse, swimming pool &amp; sports amenities in {p.location}, Hyderabad.
                        </p>
                      </div>
                      <div className="p-6 pt-0 flex items-center gap-3">
                        <Link to={p.slug} className="flex-1 text-center bg-[#0080FF] hover:bg-[#006bd6] text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-1">
                          View Details <ArrowRight size={14} />
                        </Link>
                        <a href={`https://wa.me/919705080909?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                          <MessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 mb-12 text-center max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold text-amber-400 mb-2">
                    Looking for {pageData.bhkType} Flats in {pageData.locationName}?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    In {pageData.locationName}, our primary luxury listings are currently high-rise 3 &amp; 4 BHK residences (like <strong>Brigade Gateway Neopolis</strong>). Below are all verified <strong>{pageData.bhkType} projects available nearby in West Hyderabad</strong>:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link to={`/hyderabad/${locationSlug}/3-bhk-flats`} className="px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl text-sm shadow-gold">
                      View 3 BHK Projects in {pageData.locationName} →
                    </Link>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    All Verified {pageData.bhkType} Projects in Hyderabad ({pageData.allBhkProjects.length})
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pageData.allBhkProjects.map((p) => (
                    <div key={p.slug} className="group bg-card border border-border/80 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-gold flex flex-col justify-between">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                            <MapPin size={12} /> {p.location}
                          </span>
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                            <ShieldCheck size={14} /> RERA Approved
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors mb-1">{p.name}</h3>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {p.bhk.map((b) => (
                              <span key={b} className={`text-xs font-semibold px-2.5 py-0.5 rounded ${b === pageData.bhkType ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-muted text-muted-foreground"}`}>
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Premium {p.bhk.join(", ")} luxury gated community residences with clubhouse, swimming pool &amp; sports amenities in {p.location}, Hyderabad.
                        </p>
                      </div>
                      <div className="p-6 pt-0 flex items-center gap-3">
                        <Link to={p.slug} className="flex-1 text-center bg-primary hover:bg-amber-600 text-primary-foreground font-semibold py-3 px-4 rounded-xl text-sm transition-colors shadow-gold flex items-center justify-center gap-1">
                          View Details <ArrowRight size={14} />
                        </Link>
                        <a href={`https://wa.me/919705080909?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                          <MessageCircle size={18} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* LOCATION EXPLORER GRID */}
        <section className="py-16 px-4 bg-muted/30 border-t border-border">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Explore {pageData.bhkType} Flats in Popular Hyderabad Locations
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {HYDERABAD_LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/hyderabad/${loc.slug}/${bhkTarget === "2 BHK" ? "2-bhk-flats" : "3-bhk-flats"}`}
                  className="p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 text-sm font-medium text-foreground hover:text-primary transition-all flex items-center justify-between group"
                >
                  <span>{loc.name} {pageData.bhkType}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </Link>
              ))}
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

export default BhkLandingPage;
