# Rebrand to Naani Projects — Phased Plan

This is a large scope. To ship safely without breaking your 9 custom project pages, existing URLs, schemas, or Supabase data, I'll deliver in 3 phases. **This turn = Phase 1.** I'll execute Phase 2 and 3 in follow-up turns once you confirm Phase 1 looks right.

---

## Phase 1 (this turn) — Brand, Favicon, Home, Global SEO

1. **Logo & favicon swap (site-wide)**
   - Copy uploaded `Naani_Projects_Logo-2.png` → `public/favicon.png`, `public/naani-projects-logo.png`, `src/assets/naani-projects-logo.png`.
   - Delete old `public/favicon.ico` so it doesn't override.
   - Update `index.html`: favicon, apple-touch-icon, OG image, default `<title>`, `<meta description>`, `og:site_name`, twitter handle.
   - Replace logo image in `Header.tsx`, `Footer.tsx`, `ProjectsHeader.tsx`, `ProjectsFooter.tsx`, `ProjectHeader.tsx`.

2. **Global brand string replacement**
   - Find/replace `"Naani Digital"` → `"Naani Projects"` across all `.tsx`/`.ts`/`.html` files (including SEOHead default `og:site_name`).
   - Update `SEOHead.tsx` default `ogImage` → new logo path.
   - Default site title: `Get Best Property Deals on WhatsApp | Naani Projects`.
   - Default meta description: the new one provided.

3. **Home page rewrite (`HomeContent.tsx` / `Hero.tsx` / `Index.tsx`)**
   - Hero: "Find the Right Property, Smarter & Faster in WhatsApp" + new subheading + 3 CTAs (WhatsApp / Site Visit / Explore Projects).
   - Replace marketing-agency sections with: Featured Projects (8 listed), Explore by Location, Explore by Builder, Apartments, Villas, Investment, Why Choose, Hyderabad Guide, Buying Assistance, Testimonials, FAQ, WhatsApp Lead CTA.
   - 1000+ words of SEO real-estate copy.
   - Featured Projects cards link to existing custom URLs (no URL changes).

4. **Remove agency wording from primary nav/footer copy** (Header/Footer text only — routes preserved).

**Untouched in Phase 1:** all 9 custom project pages, Supabase data, `/projects` listing, dynamic project template, sitemaps, redirects.

---

## Phase 2 (next turn) — About, Contact, Services-page replacement

- Rewrite `AboutPage.tsx` (1000+ words, real-estate focused, no agency mention).
- Rewrite `ContactPage.tsx` with the inquiry form spec (Name, Phone, Email, Location, Budget, Property Type, Message) wired to existing lead capture.
- Repurpose or hide `/services`, `/portfolio`, `/blog`, `/testimonials` agency pages (decision: hide from nav, keep routes returning real-estate content or 301-style redirects to `/projects`).
- Sticky mobile CTA bar (WhatsApp / Call / Inquiry) on all pages.

## Phase 3 (next turn) — Location & Builder hub pages

- 8 location pages: `/projects-in-{kokapet|tellapur|miyapur|gachibowli|bachupally|tukkuguda|neopolis|financial-district}` — dynamic component pulling matching projects from Supabase + 800+ word SEO copy.
- 6 builder pages: `/builders/{rajapushpa|prestige|brigade|aparna|my-home|team4}` — same pattern.
- Add to sitemap generator.
- Update `robots.txt`/sitemap index.

---

## Technical Notes

- Brand replacements use exact-string find/replace, not URL changes. All existing routes (`/projects/tridasa-rise`, etc.) and slugs remain identical.
- `SEOHead` default `og:site_name` change will affect every page that uses defaults — pages passing custom OG tags are unaffected.
- The 9 custom project pages keep their per-page schema (project name there refers to the project, not the brand) — only brand strings ("Naani Digital") inside them get swapped.
- Favicon: browsers cache aggressively; expect a hard-refresh to see the new icon.
- No DB migration needed in Phase 1.

---

**Confirm to proceed with Phase 1**, or tell me to reorder / adjust scope (e.g., "do location pages first").
