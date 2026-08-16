import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Building2, MapPin, Home, Tag, Clock, TrendingUp, Loader2 } from "lucide-react";
import {
  buildSuggestions,
  buildFuse,
  POPULAR_SEARCHES,
  getRecent,
  pushRecent,
  type Suggestion,
  type SuggestionKind,
} from "@/lib/searchIndex";
import { fetchProjects, projectPath, type DBProject } from "@/lib/projectsApi";
import ProjectImage from "@/components/ProjectImage";

const KIND_ICON: Record<SuggestionKind, typeof Search> = {
  project: Building2, builder: Tag, location: MapPin, bhk: Home,
  type: Home, status: Tag, budget: Tag, keyword: TrendingUp,
};

const SECTION_ORDER: { kind: SuggestionKind; label: string }[] = [
  { kind: "project", label: "Projects" },
  { kind: "builder", label: "Builders" },
  { kind: "location", label: "Locations" },
  { kind: "type", label: "Property Types" },
  { kind: "bhk", label: "Configurations" },
  { kind: "status", label: "Possession" },
  { kind: "budget", label: "Budget" },
  { kind: "keyword", label: "Popular" },
];

const HOME_POPULAR = [
  "Kokapet", "Financial District", "Tellapur", "Bachupally", "Miyapur",
  "Ready To Move", "Luxury Villas", "Apartments", "Under ₹1 Cr", "Near ORR",
];

const HomeSmartSearch = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects()
      .then((p) => setProjects(p))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const entries = useMemo(() => buildSuggestions(projects), [projects]);
  const fuse = useMemo<Fuse<Suggestion>>(() => buildFuse(entries), [entries]);
  const projectBySlug = useMemo(() => {
    const m = new Map<string, DBProject>();
    projects.forEach((p) => m.set(projectPath(p), p));
    return m;
  }, [projects]);

  // Debounce (250ms)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => { if (open) setRecent(getRecent()); }, [open]);

  const results = useMemo<Suggestion[]>(() => {
    const term = debounced.trim();
    if (!term) return [];
    return fuse.search(term, { limit: 12 }).map((r) => r.item);
  }, [debounced, fuse]);

  const grouped = useMemo(() => {
    const g = new Map<SuggestionKind, Suggestion[]>();
    results.forEach((r) => {
      const arr = g.get(r.kind) ?? [];
      arr.push(r);
      g.set(r.kind, arr);
    });
    return g;
  }, [results]);

  const flat = useMemo(() => {
    const list: Suggestion[] = [];
    SECTION_ORDER.forEach(({ kind }) => (grouped.get(kind) ?? []).forEach((s) => list.push(s)));
    return list;
  }, [grouped]);

  useEffect(() => { setActiveIdx(0); }, [debounced, results.length]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const track = (event: string, payload: Record<string, unknown>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event, ...payload });
    } catch { /* noop */ }
  };

  const commit = (s: Suggestion) => {
    pushRecent(s.label);
    track("homepage_search", { keyword: debounced, clicked: s.label, category: s.kind, result_count: results.length });
    setOpen(false);
    setQ("");
    navigate(s.path);
  };

  const commitFreeText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushRecent(trimmed);
    track("homepage_search", { keyword: trimmed, category: "free_text", result_count: results.length });
    setOpen(false);
    navigate(`/projects?q=${encodeURIComponent(trimmed)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, Math.max(flat.length - 1, 0))); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[activeIdx]) commit(flat[activeIdx]);
      else commitFreeText(q);
    } else if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  };

  const term = debounced.trim();
  const hasResults = flat.length > 0;
  let runningIdx = -1;

  return (
    <div ref={wrapRef} className={`w-full max-w-4xl mx-auto text-left relative ${open ? "z-50" : "z-20"}`}>
      {/* Search input */}
      <div className="relative flex items-center bg-card/70 backdrop-blur-xl border border-primary/25 rounded-2xl p-2.5 shadow-2xl focus-within:border-primary/70 focus-within:shadow-gold-lg transition-all">
        <Search className="text-primary ml-3 shrink-0" size={22} />
        <input
          ref={inputRef}
          type="text"
          aria-label="Search projects, builders, locations or communities"
          placeholder="Search Projects, Builders, Locations or Communities…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent border-0 outline-none px-3 py-3 md:py-4 text-base md:text-lg text-foreground placeholder:text-muted-foreground/70"
        />
        {loading && <Loader2 className="mr-3 animate-spin text-primary/60" size={16} />}
        {q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => { setQ(""); inputRef.current?.focus(); }}
            className="mr-2 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Popular chips */}
      {!open && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground self-center mr-1">Popular:</span>
          {HOME_POPULAR.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => commitFreeText(p)}
              className="px-3 py-1.5 rounded-full text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Dropdown — inline (pushes content down, never overlaps) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mt-3 bg-card/95 backdrop-blur-xl border border-primary/25 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-[550px] overflow-y-auto p-4">
              {term ? (
                hasResults ? (
                  <div className="space-y-4">
                    {SECTION_ORDER.map(({ kind, label }) => {
                      const items = grouped.get(kind);
                      if (!items || items.length === 0) return null;
                      return (
                        <div key={kind}>
                          <div className="px-2 pb-1.5 text-[11px] uppercase tracking-wider text-primary/80 font-semibold">
                            {label}
                          </div>
                          <ul role="listbox" className="space-y-1">
                            {items.map((s) => {
                              runningIdx += 1;
                              const i = runningIdx;
                              const active = i === activeIdx;
                              const Icon = KIND_ICON[s.kind];
                              const proj = s.kind === "project" ? projectBySlug.get(s.path) : undefined;
                              return (
                                <li key={`${s.kind}-${s.label}-${i}`}>
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActiveIdx(i)}
                                    onClick={() => commit(s)}
                                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors ${active ? "bg-primary/15" : "hover:bg-muted/40"}`}
                                  >
                                    {proj ? (
                                      <span className="w-14 h-14 rounded-lg overflow-hidden bg-muted/50 shrink-0 border border-border">
                                        <ProjectImage
                                          hero={proj.hero_image}
                                          gallery={proj.gallery}
                                          slug={proj.slug}
                                          name={proj.name}
                                          alt={proj.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </span>
                                    ) : (
                                      <span className={`w-14 h-14 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-primary/20 text-primary" : "bg-muted/60 text-muted-foreground"}`}>
                                        <Icon size={20} />
                                      </span>
                                    )}
                                    <span className="flex-1 min-w-0">
                                      <span className="block text-sm md:text-base font-semibold text-foreground truncate">{s.label}</span>
                                      {proj ? (
                                        <span className="block text-xs text-muted-foreground truncate">
                                          {[proj.builder, proj.location].filter(Boolean).join(" · ")}
                                          {proj.configuration ? ` · ${proj.configuration}` : ""}
                                        </span>
                                      ) : (
                                        s.sub && <span className="block text-xs text-muted-foreground truncate">{s.sub}</span>
                                      )}
                                      {proj?.price_range && (
                                        <span className="block text-xs text-primary font-medium mt-0.5">{proj.price_range}</span>
                                      )}
                                    </span>
                                    {proj?.status && (
                                      <span className="hidden sm:inline text-[10px] uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 rounded-full px-2 py-0.5 shrink-0">
                                        {proj.status}
                                      </span>
                                    )}
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0 hidden md:inline">{s.kind}</span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-sm text-foreground font-medium">No matching properties found.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Press Enter to search "{term}" across all projects.
                    </p>
                    <div className="mt-4 text-left">
                      <div className="text-[11px] uppercase tracking-wider text-primary/80 font-semibold mb-2">Trending</div>
                      <div className="flex flex-wrap gap-2">
                        {HOME_POPULAR.slice(0, 6).map((p) => (
                          <button key={p} onClick={() => commitFreeText(p)}
                            className="px-3 py-1.5 rounded-full text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  {recent.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 px-2 pb-2 text-[11px] uppercase tracking-wider text-primary/80 font-semibold">
                        <Clock size={12} /> Recent Searches
                      </div>
                      <div className="flex flex-wrap gap-2 px-2">
                        {recent.map((r) => (
                          <button key={r} type="button" onClick={() => commitFreeText(r)}
                            className="px-3 py-1.5 rounded-full text-xs bg-muted/60 hover:bg-primary/15 text-foreground border border-border">
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 px-2 pb-2 text-[11px] uppercase tracking-wider text-primary/80 font-semibold">
                      <TrendingUp size={12} /> Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-2 px-2">
                      {POPULAR_SEARCHES.concat(HOME_POPULAR).filter((v, i, a) => a.indexOf(v) === i).map((p) => (
                        <button key={p} type="button" onClick={() => commitFreeText(p)}
                          className="px-3 py-1.5 rounded-full text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeSmartSearch;
