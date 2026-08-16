# Naani.in — Google Search Console & SEO Deployment Guide

---

## 1. Deployment & Environment Verification

1. Ensure all environment variables are set in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
2. Build command: `npm run build`
   - Automatically runs `prebuild` (`node scripts/generate-sitemap.mjs`).
   - Automatically runs `vite build` with static OpenGraph prerendering for social crawlers (`vite-plugin-og-prerender.ts`).

---

## 2. Google Search Console Setup & Verification

1. Log into [Google Search Console](https://search.google.com/search-console).
2. Add Property:
   - **Domain Property**: `naani.in` (Requires DNS TXT record verification via your domain registrar).
   - **URL Prefix**: `https://www.naani.in/`
3. Verify ownership via HTML file / Meta Tag / DNS TXT record.

---

## 3. Sitemap Submission

1. In Google Search Console, navigate to **Sitemaps** under the *Indexing* menu.
2. Enter the primary sitemap URL:
   `https://www.naani.in/sitemap.xml`
3. Submit and verify that all sub-sitemaps are successfully fetched:
   - `https://www.naani.in/sitemaps/static.xml`
   - `https://www.naani.in/sitemaps/projects.xml`
   - `https://www.naani.in/sitemaps/locations.xml`
   - `https://www.naani.in/sitemaps/builders.xml`

---

## 4. Priority Index Inspection & Requesting Indexing

Use the **URL Inspection** tool in Search Console to inspect and request indexing for high-priority pages in order:

1. `https://www.naani.in/`
2. `https://www.naani.in/hyderabad`
3. `https://www.naani.in/hyderabad/2-bhk-flats`
4. `https://www.naani.in/hyderabad/3-bhk-flats`
5. `https://www.naani.in/hyderabad/kokapet/2-bhk-flats`
6. `https://www.naani.in/hyderabad/tellapur/3-bhk-flats`
7. `https://www.naani.in/projects`

---

## 5. Ongoing Monitoring Workflow

- **Coverage & Page Indexing**: Monitor weekly for any *Excluded* or *Not Indexed* URLs.
- **Performance Report**: Track clicks, impressions, average CTR, and average position for search terms such as:
  - `2 bhk flats in hyderabad`
  - `3 bhk flats in hyderabad`
  - `2 bhk flats in kokapet`
  - `3 bhk flats for sale in tellapur`
