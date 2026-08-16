import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import ProjectsHeader from "@/components/ProjectsHeader";
import ProjectsFooter from "@/components/ProjectsFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmartSearch from "@/components/SmartSearch";
import ProjectImage from "@/components/ProjectImage";
import { MapPin, Home, MessageCircle, Star, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { fetchProjects, projectPath, type DBProject } from "@/lib/projectsApi";

const PAGE_SIZE = 18;

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") ?? "All");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") ?? "All");
  const [bhkFilter, setBhkFilter] = useState<string>(searchParams.get("bhk") ?? "All");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "All");
  const [builderFilter, setBuilderFilter] = useState(searchParams.get("builder") ?? "All");
  const [budgetFilter, setBudgetFilter] = useState(searchParams.get("budget") ?? "All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((e) => console.error("Failed to load projects", e))
      .finally(() => setLoading(false));
  }, []);

  // Sync URL params → state when navigation happens (e.g. from SmartSearch on another page)
  useEffect(() => {
    setSearch(searchParams.get("q") ?? "");
    setLocationFilter(searchParams.get("location") ?? "All");
    setTypeFilter(searchParams.get("type") ?? "All");
    setBhkFilter(searchParams.get("bhk") ?? "All");
    setStatusFilter(searchParams.get("status") ?? "All");
    setBuilderFilter(searchParams.get("builder") ?? "All");
    setBudgetFilter(searchParams.get("budget") ?? "All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const { locations, types, builders } = useMemo(() => {
    const locs = new Set<string>();
    const tps = new Set<string>();
    const bs = new Set<string>();
    projects.forEach((p) => {
      if (p.location) locs.add(p.location);
      if (p.property_type) tps.add(p.property_type);
      if (p.builder) bs.add(p.builder);
    });
    return {
      locations: ["All", ...Array.from(locs).sort()],
      types: ["All", ...Array.from(tps).sort()],
      builders: ["All", ...Array.from(bs).sort()],
    };
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) => {
      if (q && !`${p.name} ${p.location} ${p.builder}`.toLowerCase().includes(q)) return false;
      if (locationFilter !== "All" && p.location !== locationFilter) return false;
      if (typeFilter !== "All" && p.property_type !== typeFilter) return false;
      if (builderFilter !== "All" && p.builder !== builderFilter) return false;
      if (bhkFilter !== "All") {
        const want = parseInt(bhkFilter);
        if (!(p.bhk_list ?? []).includes(want)) return false;
      }
      if (statusFilter !== "All") {
        const s = (p.status ?? "").toLowerCase();
        if (statusFilter === "Ready" && !s.includes("ready")) return false;
        if (statusFilter === "Under Construction" && !s.includes("under")) return false;
        if (statusFilter === "Pre-Launch" && !s.includes("pre")) return false;
      }
      if (budgetFilter !== "All") {
        const min = p.min_price_inr ?? 0;
        if (budgetFilter === "Under 1 Cr" && min >= 10000000) return false;
        if (budgetFilter === "1-2 Cr" && (min < 10000000 || min >= 20000000)) return false;
        if (budgetFilter === "2-5 Cr" && (min < 20000000 || min >= 50000000)) return false;
        if (budgetFilter === "5+ Cr" && min < 50000000) return false;
      }
      return true;
    });
  }, [projects, search, locationFilter, typeFilter, builderFilter, bhkFilter, statusFilter, budgetFilter]);

  useEffect(() => setVisible(PAGE_SIZE), [search, locationFilter, typeFilter, builderFilter, bhkFilter, statusFilter, budgetFilter]);

  const shown = filtered.slice(0, visible);
  const waLink = (name: string) =>
    `https://wa.me/919705080909?text=${encodeURIComponent(`Hi, I'm interested in ${name}. Please share details.`)}`;

  const activeFilterCount = [locationFilter, typeFilter, bhkFilter, statusFilter, builderFilter, budgetFilter].filter(v => v !== "All").length;
  const resetFilters = () => {
    setLocationFilter("All"); setTypeFilter("All"); setBhkFilter("All");
    setStatusFilter("All"); setBuilderFilter("All"); setBudgetFilter("All");
  };

  const FilterSelect = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 bg-card/60 border-border text-sm min-w-[120px]" aria-label={`Filter by ${label}`}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {options.map((o) => <SelectItem key={o} value={o}>{o === "All" ? `All ${label}` : o}</SelectItem>)}
      </SelectContent>
    </Select>
  );

  return (
    <>
      <SEOHead
        title="Premium Real Estate Projects in Hyderabad | Naani Projects"
        description="Browse verified Hyderabad apartments, villas and plotted projects by location, builder, BHK and budget with Naani Projects."
        canonicalUrl="https://www.naani.in/projects"
      />
      <ProjectsHeader />

      {/* Hero */}
      <section className="relative z-40 min-h-[45vh] flex items-center justify-center bg-[#090D16] pt-24 pb-12">
        <div className="w-full px-4 sm:px-8 lg:px-12 text-center relative z-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-5 py-2 rounded-full bg-[#111726] text-amber-400 text-xs md:text-sm font-extrabold mb-4 border border-amber-500/30 shadow-md">
              Naani Projects · {projects.length}+ Premium Properties
            </span>
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-3 leading-tight">
              Hyderabad's Curated<br />
              <span className="text-gold-gradient">Luxury Real Estate Portal</span>
            </h1>
            <p className="text-base md:text-xl text-slate-300 font-medium max-w-3xl mx-auto mb-8">
              Explore premium apartments, villas &amp; plots from top builders — Tellapur, Kokapet, Miyapur, Gachibowli &amp; more.
            </p>
          </motion.div>

          <SmartSearch
            projects={projects}
            className="max-w-4xl mx-auto"
            onQueryChange={(q) => {
              setSearch(q);
              const params = new URLSearchParams(searchParams);
              if (q) params.set("q", q); else params.delete("q");
              setSearchParams(params, { replace: true });
            }}
          />
        </div>
      </section>

      {/* Sleek Filter Bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-[#0B101D]/95 backdrop-blur border-y border-amber-500/20 py-4">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex gap-3 items-center overflow-x-auto no-scrollbar">
            <FilterSelect label="Locations" value={locationFilter} onChange={setLocationFilter} options={locations} />
            <FilterSelect label="Budget" value={budgetFilter} onChange={setBudgetFilter}
              options={["All", "Under 1 Cr", "1-2 Cr", "2-5 Cr", "5+ Cr"]} />
            <FilterSelect label="Type" value={typeFilter} onChange={setTypeFilter} options={types} />
            <FilterSelect label="BHK" value={bhkFilter} onChange={setBhkFilter}
              options={["All", "2", "3", "4", "5"]} />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 shrink-0 border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-bold">
                  <SlidersHorizontal size={14} className="mr-1.5" />
                  More Filters{activeFilterCount > 0 && (
                    <span className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 rounded-full text-[10px] px-2 py-0.5 font-extrabold">{activeFilterCount}</span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto bg-[#090D16] border-amber-500/30 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white text-xl">Refine Your Search</SheetTitle>
                </SheetHeader>
                <div className="space-y-5 py-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2 block">Status</label>
                    <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}
                      options={["All", "Ready", "Under Construction", "Pre-Launch"]} />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2 block">Builder</label>
                    <FilterSelect label="Builders" value={builderFilter} onChange={setBuilderFilter} options={builders} />
                  </div>
                </div>
                <SheetFooter className="flex-row gap-2">
                  <Button variant="outline" className="flex-1 border-amber-500/40 text-amber-400 hover:bg-amber-500/10" onClick={resetFilters}>
                    <X size={14} className="mr-1" /> Reset
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="text-xs text-amber-400 hover:underline shrink-0 font-bold">Clear All</button>
            )}

            <span className="text-xs text-slate-300 font-bold ml-auto shrink-0 hidden sm:block">{filtered.length} projects found</span>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="py-16 bg-[#090D16]">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <Skeleton className="h-52 w-full bg-slate-800" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-slate-800" /><Skeleton className="h-4 w-1/2 bg-slate-800" />
                    <Skeleton className="h-12 w-full bg-slate-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shown.map((project, i) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.05, duration: 0.4 }}
                    className="group glass-card overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
                    onClick={() => navigate(projectPath(project))}
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden">
                        <ProjectImage
                          hero={project.hero_image}
                          gallery={project.gallery}
                          slug={project.slug}
                          name={project.name}
                          alt={`${project.name} — ${project.property_type ?? "property"} in ${project.location}, Hyderabad`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {project.status && (
                          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                            {project.status}
                          </span>
                        )}
                        {project.featured && (
                          <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Star size={11} className="fill-amber-400" /> Featured
                          </span>
                        )}
                      </div>

                      <div className="p-6 space-y-3">
                        <h2 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {project.name}
                        </h2>
                        {project.builder && (
                          <p className="text-xs text-amber-400 font-bold -mt-2">by {project.builder}</p>
                        )}
                        <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
                          <MapPin size={16} className="text-amber-400" /> {project.location}, {project.city}
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div className="text-center bg-slate-900/80 rounded-xl p-2.5 border border-amber-500/20">
                            <p className="text-[10px] text-amber-400 font-bold uppercase">Config</p>
                            <p className="text-sm font-bold text-white line-clamp-1">{project.configuration || "—"}</p>
                          </div>
                          <div className="text-center bg-slate-900/80 rounded-xl p-2.5 border border-amber-500/20">
                            <p className="text-[10px] text-amber-400 font-bold uppercase">Possession</p>
                            <p className="text-sm font-bold text-white">{project.possession?.slice(0, 7) || "—"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                        <div>
                          <p className="text-[11px] text-slate-400 font-bold uppercase">Starting From</p>
                          <p className="text-lg font-extrabold text-amber-400">{project.price_range || "On Request"}</p>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={waLink(project.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-btn p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105 shadow-md flex items-center justify-center"
                            aria-label={`WhatsApp about ${project.name}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageCircle size={18} />
                          </a>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold hover:scale-105 transition-all h-11 px-4"
                            onClick={(e) => { e.stopPropagation(); navigate(projectPath(project)); }}
                          >
                            View <ArrowRight size={14} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <Home size={48} className="mx-auto text-amber-400 mb-4" />
                  <p className="text-lg text-slate-300 font-bold">No properties match your filters. Try resetting them.</p>
                </div>
              )}

              {visible < filtered.length && (
                <div className="text-center mt-12">
                  <Button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold px-8 h-12 text-base shadow-lg">
                    Load More ({filtered.length - visible} more)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B101D] border-t border-amber-500/20">
        <div className="w-full px-4 sm:px-8 lg:px-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base">
            Tell us your location, budget and preferences — we'll find the perfect property on WhatsApp.
          </p>
          <a
            href="https://wa.me/919705080909?text=Hi%2C%20I%27m%20looking%20for%20a%20property.%20Please%20help%20me%20find%20the%20best%20option."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl transition-all hover:scale-105 text-base"
          >
            <MessageCircle size={20} /> Get Property Recommendations on WhatsApp
          </a>
        </div>
      </section>

      <ProjectsFooter />
      <WhatsAppButton />
    </>
  );
};

export default ProjectsPage;
