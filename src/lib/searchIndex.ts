import Fuse from "fuse.js";
import type { DBProject } from "./projectsApi";
import { projectPath } from "./projectsApi";

export type SuggestionKind = "project" | "builder" | "location" | "bhk" | "type" | "status" | "budget" | "keyword";

export interface Suggestion {
  kind: SuggestionKind;
  label: string;
  sub?: string;
  path: string;                     // where to go on select
  project?: DBProject;
}

const slugifyLoc = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Build a flat, weighted list of searchable entries from all projects. */
export const buildSuggestions = (projects: DBProject[]): Suggestion[] => {
  const list: Suggestion[] = [];
  const seen = new Set<string>();
  const push = (s: Suggestion) => {
    const key = `${s.kind}:${s.label.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    list.push(s);
  };

  projects.forEach((p) => {
    push({ kind: "project", label: p.name, sub: [p.builder, p.location].filter(Boolean).join(" · "), path: projectPath(p), project: p });
    if (p.builder) push({ kind: "builder", label: p.builder, sub: "Builder", path: `/projects?builder=${encodeURIComponent(p.builder)}` });
    if (p.location) push({ kind: "location", label: p.location, sub: `Projects in ${p.location}`, path: `/projects?location=${encodeURIComponent(p.location)}` });
    if (p.property_type) push({ kind: "type", label: p.property_type, sub: "Property type", path: `/projects?type=${encodeURIComponent(p.property_type)}` });
    (p.bhk_list ?? []).forEach((n) => push({ kind: "bhk", label: `${n} BHK`, sub: "Configuration", path: `/projects?bhk=${n}` }));
    if (p.status) push({ kind: "status", label: p.status, sub: "Possession status", path: `/projects?status=${encodeURIComponent(p.status)}` });
  });

  // Curated keyword shortcuts users commonly type
  const staticKeywords: Suggestion[] = [
    { kind: "budget", label: "Under 1 Crore", sub: "Budget", path: "/projects?budget=Under%201%20Cr" },
    { kind: "budget", label: "1-2 Crore", sub: "Budget", path: "/projects?budget=1-2%20Cr" },
    { kind: "budget", label: "2-5 Crore", sub: "Budget", path: "/projects?budget=2-5%20Cr" },
    { kind: "budget", label: "5+ Crore", sub: "Luxury budget", path: "/projects?budget=5%2B%20Cr" },
    { kind: "status", label: "Ready to Move", sub: "Possession", path: "/projects?status=Ready" },
    { kind: "status", label: "Under Construction", sub: "Possession", path: "/projects?status=Under%20Construction" },
    { kind: "status", label: "Pre-Launch", sub: "Possession", path: "/projects?status=Pre-Launch" },
    { kind: "keyword", label: "Luxury Villas", sub: "Curated", path: "/projects?type=Villa" },
    { kind: "keyword", label: "Luxury Apartments", sub: "Curated", path: "/projects?type=Apartment" },
  ];
  staticKeywords.forEach(push);
  return list;
};

export const buildFuse = (entries: Suggestion[]) =>
  new Fuse(entries, {
    keys: [
      { name: "label", weight: 0.7 },
      { name: "sub", weight: 0.3 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });

export const POPULAR_SEARCHES = ["Ready to Move", "Under 1 Crore", "Villas", "Kokapet", "3 BHK", "Prestige"];

const RECENT_KEY = "naani:recent-searches";
export const getRecent = (): string[] => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]").slice(0, 5); } catch { return []; }
};
export const pushRecent = (q: string) => {
  if (!q || q.length < 2) return;
  try {
    const list = [q, ...getRecent().filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 5);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch { /* ignore */ }
};

export { slugifyLoc };
