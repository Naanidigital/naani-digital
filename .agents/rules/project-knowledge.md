# Naani.in — Project Knowledge and Implementation Standards

## Project purpose

Naani.in is a Hyderabad-focused real estate property discovery platform covering apartments, villas, open plots, residential and commercial properties, new projects, and resale opportunities.

The platform should help buyers discover relevant properties and help property owners connect with potential buyers.

## Existing architecture to preserve

The project has an existing Lovable/Supabase implementation. Inspect the current code before editing. Do not rebuild completed functionality unnecessarily.

Existing data and implementation components include:

- Supabase tables: builders, locations, properties, property_media, property_leads, property_slug_history, property_status_history, and property_views.
- Property APIs in `src/lib/propertiesApi.ts`.
- SEO and keyword utilities in `src/lib/seo/keywordEngine.ts`.
- A six-step `/list-your-property` submission wizard.
- Existing dynamic property, location, builder, and project page functionality.
- Existing publishing controls, database permissions, and public/private data boundaries.
- Existing sitemap and prerendering configuration, including `vite-plugin-og-prerender.ts` where still applicable.

Verify the current code and deployed implementation before relying on these details. Do not assume a previous implementation remains unchanged.

## About Us page

Canonical route: `/about-us`  
Canonical URL: `https://www.naani.in/about-us`

Required content:

- Brand purpose and Hyderabad focus.
- Founder profile for Shitish Kumar.
- MBA in Marketing from Osmania University.
- Real estate journey beginning in 2017.
- Team/company track record of 500+ flats and 100+ villas sold across Hyderabad, without attributing all sales personally to the founder.
- Property buying and selling assistance.
- RERA checks where applicable, developer background review, and available project documents.
- Hyderabad areas followed and emerging areas monitored.
- Buyer/seller process, customer due diligence, limitations, and contact CTA.

Use only confirmed claims. Do not invent a founder photo, office details, team members, legal credentials, testimonials, or third-party endorsements.

## Official contact

Latest supplied phone number: +91 94939 43946.  
WhatsApp URL, if this number is confirmed and configured for WhatsApp: `https://wa.me/919493943946`.

Centralise contact details where possible so legacy components do not display an outdated number. Check call links, WhatsApp links, forms, headers, footers, metadata, and mobile sticky CTAs.

## SEO and rendering

- Ensure `/about-us` returns meaningful, crawlable HTML.
- Confirm the deployed route does not return only the SPA shell or a tag-manager iframe to crawlers.
- Use one clear H1 and a logical heading hierarchy.
- Generate unique title and meta description within existing project standards.
- Preserve the canonical URL and working internal links.
- Add structured data that accurately reflects visible content.
- Keep private lead information and unpublished property data inaccessible to public crawlers.

## Structured data

For `/about-us`, use appropriate `AboutPage`, `Organization`, `Person`, and `BreadcrumbList` markup where supported by the actual content and site architecture.

The Person entity should represent the real founder. Organization and contact details must be consistent with the live site. Do not invent social profiles, address details, ratings, credentials, or sameAs URLs.

Do not add FAQPage markup unless the relevant FAQs are actually visible on the page and comply with applicable search-engine guidelines.

## Site-wide E-E-A-T application

Apply consistent trust and accuracy standards to:

- `/projects` and individual project pages.
- Dynamic property detail pages.
- Builder pages.
- Location pages.
- BHK and property-type landing pages.
- `/list-your-property`.
- Blog and buyer education pages.

Use real project and property records, relevant internal links, transparent verification language, and helpful buyer guidance. Avoid creating thin pages solely to target keyword combinations.

## Property data rules

- Public property pages must expose only approved and published records.
- Preserve existing RLS policies and access controls.
- Keep seller/owner contact data private unless specifically authorised for publication.
- Never infer missing RERA IDs, prices, possession dates, approvals, amenities, or builder claims.
- Keep slug redirects, canonical URLs, media references, and sitemap entries consistent.
- Use only truthful, visible information in structured data.

## Analytics and lead handling

Track useful interactions such as property views, calls, WhatsApp clicks, enquiry submissions, and brochure requests where appropriate.

Never place personal information in analytics event names or parameters. Preserve consent, privacy, and existing security requirements.

## Change management

Before changes:

1. Inspect the existing route and components.
2. Identify shared components and data dependencies.
3. Preserve completed features.
4. Implement only the requested changes.
5. Test desktop and mobile layouts, rendering, SEO metadata, structured data, and public/private data boundaries.
6. Report files changed, tests completed, unresolved issues, and claims needing confirmation.
