#!/usr/bin/env node
/**
 * Dynamic sitemap generator for Naani Projects.
 * Pulls all projects from Supabase and writes:
 *   - public/sitemap.xml          (sitemap index)
 *   - public/sitemaps/projects.xml
 *   - public/sitemaps/static.xml
 *   - public/sitemaps/locations.xml
 *   - public/sitemaps/builders.xml
 *
 * Runs at build time (predeploy). No runtime dependency on Supabase.
 */
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { resolve } from "path";

const SITE = "https://www.naani.in";
const URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!URL || !KEY) {
  console.error("[sitemap] Missing Supabase env vars — skipping dynamic sitemap.");
  process.exit(0);
}

const supabase = createClient(URL, KEY);

// lastmod is emitted ONLY from a real page-specific timestamp (projects.updated_at).
// Never fall back to the generation date — that would be a meaningless signal.
const urlEntry = (loc, { lastmod, changefreq = "weekly", priority = "0.7" } = {}) =>
  [
    `  <url>`,
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    `  </url>`,
  ].filter(Boolean).join("\n");


const wrap = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

// Only routes that return 200 (no redirects, no 404s, no parameter URLs).
const STATIC_URLS = [
  ["/", "1.00", "weekly"],
  ["/hyderabad", "0.98", "daily"],
  ["/hyderabad/2-bhk-flats", "0.95", "daily"],
  ["/hyderabad/3-bhk-flats", "0.95", "daily"],
  ["/guides/2-bhk-flats-in-hyderabad", "0.85", "monthly"],
  ["/guides/3-bhk-flats-in-hyderabad", "0.85", "monthly"],
  ["/projects", "0.90", "daily"],
  ["/about-us", "0.7", "monthly"],
  ["/contact-us", "0.7", "monthly"],
  ["/list-your-property", "0.6", "monthly"],
];


const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

(async () => {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("slug, custom_page_path, location, builder, updated_at, featured, publish_status, source")
    .eq("publish_status", "published")
    .limit(5000);

  if (error) { console.error("[sitemap]", error); process.exit(1); }

  const outDir = resolve("public/sitemaps");
  mkdirSync(outDir, { recursive: true });

  const published = projects ?? [];

  // Projects sitemap (all published projects — custom page wins)
  const seen = new Set();
  const projectEntries = published
    .map((p) => {
      const path = p.custom_page_path || `/projects/${p.slug}`;
      if (!path || seen.has(path)) return null;
      seen.add(path);
      const lastmod = p.updated_at ? p.updated_at.slice(0, 10) : undefined;
      return urlEntry(`${SITE}${path}`, { lastmod, changefreq: "weekly", priority: p.featured ? "0.9" : "0.8" });
    })
    .filter(Boolean);
  writeFileSync(resolve(outDir, "projects.xml"), wrap(projectEntries));

  // Properties sitemap — user-submitted, published listings only
  const submittedEntries = published
    .filter((p) => p.source && p.source !== "internal")
    .map((p) => {
      const path = p.custom_page_path || `/property/${p.slug}`;
      const lastmod = p.updated_at ? p.updated_at.slice(0, 10) : undefined;
      return urlEntry(`${SITE}${path}`, { lastmod, changefreq: "weekly", priority: "0.7" });
    });
  if (submittedEntries.length) {
    writeFileSync(resolve(outDir, "properties.xml"), wrap(submittedEntries));
  } else {
    rmSync(resolve(outDir, "properties.xml"), { force: true });
  }

  // Locations sitemap
  const locations = Array.from(new Set(published.map((p) => p.location).filter(Boolean)));
  const locationEntries = locations.flatMap((loc) => {
    const slug = slugify(loc);
    return [
      urlEntry(`${SITE}/projects-in-${slug}`, { changefreq: "weekly", priority: "0.8" }),
      urlEntry(`${SITE}/hyderabad/${slug}/2-bhk-flats`, { changefreq: "weekly", priority: "0.8" }),
      urlEntry(`${SITE}/hyderabad/${slug}/3-bhk-flats`, { changefreq: "weekly", priority: "0.8" }),
    ];
  });
  writeFileSync(resolve(outDir, "locations.xml"), wrap(locationEntries));

  // Builders sitemap
  const builders = Array.from(new Set(published.map((p) => p.builder).filter(Boolean)));
  const builderEntries = builders.map((b) =>
    urlEntry(`${SITE}/${slugify(b)}-projects-hyderabad`, { changefreq: "monthly", priority: "0.6" })
  );
  writeFileSync(resolve(outDir, "builders.xml"), wrap(builderEntries));

  // Static sitemap
  const staticEntries = STATIC_URLS.map(([p, pr, cf]) =>
    urlEntry(`${SITE}${p}`, { priority: pr, changefreq: cf })
  );
  writeFileSync(resolve(outDir, "static.xml"), wrap(staticEntries));

  // Sitemap index (no lastmod — no authoritative per-sitemap timestamp)
  const indexFiles = ["static.xml", "projects.xml", "locations.xml", "builders.xml"];
  if (submittedEntries.length) indexFiles.splice(2, 0, "properties.xml");
  const index =
`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexFiles.map((f) => `  <sitemap><loc>${SITE}/sitemaps/${f}</loc></sitemap>`).join("\n")}
</sitemapindex>
`;
  writeFileSync(resolve("public/sitemap.xml"), index);


  console.log(`[sitemap] wrote ${projectEntries.length} projects (${submittedEntries.length} user-submitted), ${locations.length} locations, ${builders.length} builders.`);
})();

