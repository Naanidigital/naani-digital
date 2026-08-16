# Technical SEO Audit & Strategic Architecture — Naani.in

---

## 1. Technical Framework & Environment Detection

| Component | Detected Technology | SEO Capability / Implications |
| :--- | :--- | :--- |
| **Framework** | Vite 5 + React 18 + TypeScript | Client-Side Rendered (CSR) Single Page Application (SPA). Requires static/build-time metadata prerendering or hydration for non-JS crawlers. |
| **Routing** | React Router DOM (v6) | Client-side routing with lazy-loaded page chunks (`React.lazy`). Dynamic parameter routing (`/projects/:slug`, `/property/:slug`, `/projects-in-:locationSlug`, `/:builderSeoSlug`). |
| **Prerendering & OG** | Custom Vite Plugin (`vite-plugin-og-prerender.ts`) | Injects static `<title>`, `<meta name="description">`, OpenGraph, and Twitter tags into generated `dist/` HTML pages at build time for key project pages. |
| **Head Management** | `react-helmet-async` (`<SEOHead />`) | Manages document title, meta tags, canonical link, OpenGraph, and JSON-LD structured data dynamically on route change. |
| **Server & Deployment** | Vercel (`vercel.json`) | Single-page application rewrites to `/index.html` with explicit 301 redirects for legacy URLs and custom caching headers for static assets. |
| **Sitemap Generation** | Node Build Script (`scripts/generate-sitemap.mjs`) | Executed during `prebuild`. Connects to Supabase to dynamically construct `sitemap.xml` index linking to `static.xml`, `projects.xml`, `properties.xml`, `locations.xml`, and `builders.xml`. |

---

## 2. Current Strengths

1. **Clean URL Structure**: Custom project routes use clean, descriptive slugs (e.g. `/projects/brigade-gateway-neopolis-kokapet-hyderabad`, `/projects/prestige-golden-grove-hyderabad`).
2. **Prerendering Integration**: Social crawlers (WhatsApp, Facebook, Twitter) receive HTML with injected OpenGraph cards via `vite-plugin-og-prerender.ts`.
3. **Structured Data Implementation**: Individual project pages implement basic `RealEstateListing`, `BreadcrumbList`, `FAQPage`, and `RealEstateAgent` JSON-LD schemas.
4. **Disallow Rules in `robots.txt`**: Appropriately blocks internal admin routes (`/admin`, `/dashboard`, `/crm`), parameter query strings (`?utm_`, `?s=`), and authentication endpoints.
5. **Clean Redirects**: Legacy agency endpoints (`/services`, `/portfolio`, `/testimonials`, `/blog`) use permanent 301 redirects to `/projects`.

---

## 3. Current Technical SEO Weaknesses & Deficiencies

1. **Missing BHK-Specific SEO Architecture**:
   - No dedicated, indexable landing pages exist for core high-intent queries such as `2 bhk flats in hyderabad`, `3 bhk flats in hyderabad`, `2 bhk flats in kokapet`, or `3 bhk flats in tellapur`.
   - Buyers searching for specific bedroom configurations are forced onto generic listing pages or unrelated project pages.

2. **Absence of Main Hyderabad Hub (`/hyderabad`)**:
   - The platform lacks a centralized `/hyderabad` real estate discovery hub. All traffic currently defaults to `/projects` or individual project landing pages.

3. **Thin & Query-Param Filter Indexing Risks**:
   - Dynamic location and builder routes (`/projects-in-:locationSlug`, `/:builderSeoSlug`) rely on client-side state without structured BHK filters or rich contextual content.
   - Filtering by BHK or price relies on transient React component state without canonical URL targets.

4. **Internal Linking Hierarchy Gaps**:
   - Project pages lack reciprocal breadcrumb links back to parent Location and BHK landing pages (e.g., Home → Hyderabad → Kokapet → 2 BHK → Project).

5. **Inconsistent Canonicals & Robots Directives**:
   - Some pages lack explicit self-referential canonical tags or omit explicit `robots="index,follow"` headers.

---

## 4. Recommended Target SEO Architecture

```
                                [ / ] (Homepage)
                                  │
                          [ /hyderabad ] (Main Hub)
                         ┌────────┴────────┐
                         ▼                 ▼
          [ /hyderabad/2-bhk-flats ]   [ /hyderabad/3-bhk-flats ]
                         │                 │
             ┌───────────┼───────────┐     └───────────┬───────────┐
             ▼           ▼           ▼                 ▼           ▼
        [ /hyderabad/kokapet/2-bhk-flats ]    [ /hyderabad/tellapur/3-bhk-flats ]
                         │                                 │
                         └─────────────────┬───────────────┘
                                           ▼
                      [ /projects/rajapushpa-sierra-tellapur ]
```

---

## 5. Planned Route Matrix

### A. Routes to Create
- `/hyderabad` — Main Hyderabad Real Estate Discovery Hub
- `/hyderabad/2-bhk-flats` — Core 2 BHK Hyderabad Landing Page
- `/hyderabad/3-bhk-flats` — Core 3 BHK Hyderabad Landing Page
- `/hyderabad/:locationSlug/2-bhk-flats` — Location + 2 BHK Landing Pages (Kokapet, Tellapur, Narsingi, Gachibowli, Kondapur, Miyapur, Bachupally, Financial District, Kollur, Nallagandla)
- `/hyderabad/:locationSlug/3-bhk-flats` — Location + 3 BHK Landing Pages
- `/guides/2-bhk-flats-in-hyderabad` — Educational Buyer Guide for 2 BHK Homebuyers
- `/guides/3-bhk-flats-in-hyderabad` — Educational Buyer Guide for 3 BHK Homebuyers

### B. Routes to Maintain & Enhance
- `/` — Enhance metadata and link to `/hyderabad` and BHK hubs.
- `/projects` — Maintain projects listing hub; ensure canonical points to `https://www.naani.in/projects`.
- `/projects/:slug` & `/property/:slug` — Enhance schema validation, breadcrumbs, and internal reciprocal linking.

---

## 6. Metadata & Indexing Strategy

1. **Title Tag Protocol**:
   - Format: `[Primary Keyword] | Naani Projects`
   - Example: `2 BHK Flats for Sale in Hyderabad | Naani Projects`
   - Example: `2 BHK Flats in Kokapet, Hyderabad | Naani Projects`

2. **Meta Description Protocol**:
   - Unique, non-repetitive descriptions under 160 characters deriving real property metrics (e.g. starting prices, verified project counts, developer names).

3. **Doorway Page Prevention & Indexability Control**:
   - Only location + BHK combinations containing **at least 1 real verified project** in the database will be indexable (`robots="index,follow"`).
   - Empty combinations will return `robots="noindex,follow"` to prevent Google doorway-abuse penalties.

4. **Structured Data Strategy**:
   - **ItemList**: On `/hyderabad`, `/hyderabad/2-bhk-flats`, `/hyderabad/3-bhk-flats`, and location BHK pages listing real projects.
   - **BreadcrumbList**: On all landing pages and project pages.
   - **RealEstateListing**: On individual project detail pages.
