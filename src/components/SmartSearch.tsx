import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { Search, X, Building2, MapPin, Home, Tag, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buildSuggestions, buildFuse, POPULAR_SEARCHES, getRecent, pushRecent, type Suggestion, type SuggestionKind } from "@/lib/searchIndex";
import type { DBProject } from "@/lib/projectsApi";

const KIND_ICON: Record<SuggestionKind, typeof Search> = {
  project: Building2, builder: Tag, location: MapPin, bhk: Home,
  type: Home, status: Tag, budget: Tag, keyword: TrendingUp,
};

interface Props {
  projects: DBProject[];
  onQueryChange?: (q: string) => void;
  className?: string;
}

const SmartSearch = ({ projects, onQueryChange, className = "" }: Props) => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const entries = useMemo(() => buildSuggestions(projects), [projects]);
  const fuse = useMemo<Fuse<Suggestion>>(() => buildFuse(entries), [entries]);

  useEffect(() => { setRecent(getRecent()); }, [open]);

  const results = useMemo<Suggestion[]>(() => {
    if (!q.trim()) return [];
    return fuse.search(q.trim(), { limit: 8 }).map((r) => r.item);
  }, [q, fuse]);

  useEffect(() => { setActiveIdx(0); }, [q, results.length]);

  // Outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const commit = (s: Suggestion) => {
    pushRecent(s.label);
    setOpen(false);
    setQ("");
    onQueryChange?.("");
    navigate(s.path);
  };

  const commitFreeText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushRecent(trimmed);
    setOpen(false);
    onQueryChange?.(trimmed);
    navigate(`/projects?q=${encodeURIComponent(trimmed)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, Math.max(results.length - 1, 0))); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIdx]) commit(results[activeIdx]);
      else commitFreeText(q);
    } else if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  };

  const showDropdown = open && (q.trim() ? results.length >= 0 : true);

  return (
    <div ref={wrapRef} className={`relative ${open ? "z-50" : "z-20"} ${className}`}>
      <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-2 shadow-xl focus-within:border-primary/60 transition-colors">
        <Search className="text-primary ml-3 shrink-0" size={20} />
        <Input
          ref={inputRef}
          aria-label="Search projects, builders, locations, BHK, villas, apartments"
          placeholder="Search projects, builders, locations, BHK, villas…"
          value={q}
          onChange={(e) => { setQ(e.target.value); onQueryChange?.(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="border-0 bg-transparent focus-visible:ring-0 text-base"
        />
        {q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => { setQ(""); onQueryChange?.(""); inputRef.current?.focus(); }}
            className="mr-2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/40"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 bg-card border border-primary/20 rounded-xl shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
          {q.trim() ? (
            results.length > 0 ? (
              <ul role="listbox">
                {results.map((s, i) => {
                  const Icon = KIND_ICON[s.kind];
                  const active = i === activeIdx;
                  return (
                    <li key={`${s.kind}-${s.label}-${i}`}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIdx(i)}
                        onClick={() => commit(s)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${active ? "bg-primary/10" : "hover:bg-muted/40"}`}
                      >
                        <span className={`p-2 rounded-lg ${active ? "bg-primary/20 text-primary" : "bg-muted/60 text-muted-foreground"}`}>
                          <Icon size={16} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-foreground truncate">{s.label}</span>
                          {s.sub && <span className="block text-xs text-muted-foreground truncate">{s.sub}</span>}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">{s.kind}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-4 py-6 text-sm text-muted-foreground">
                No matches. Press Enter to search “{q.trim()}” across all projects.
              </div>
            )
          ) : (
            <div className="p-3 space-y-3">
              {recent.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 px-2 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
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
                <div className="flex items-center gap-2 px-2 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <TrendingUp size={12} /> Popular Searches
                </div>
                <div className="flex flex-wrap gap-2 px-2 pb-1">
                  {POPULAR_SEARCHES.map((p) => (
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
      )}
    </div>
  );
};

export default SmartSearch;
