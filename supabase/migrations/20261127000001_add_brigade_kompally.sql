-- Migration: Insert or Update Brigade Kompally in public.projects
-- Database Target: lpbdwmpglwdedqdiovqu (Master Property Catalogue)
-- Status: Draft (Unpublished pending publication review)
-- Idempotent: ON CONFLICT (slug) DO UPDATE with safe non-destructive preservation

INSERT INTO public.projects (
  slug,
  name,
  builder,
  location,
  city,
  configuration,
  bhk_list,
  property_type,
  price_range,
  status,
  possession,
  usp,
  description,
  amenities,
  faqs,
  gallery,
  hero_image,
  brochure_url,
  map_embed_url,
  seo_title,
  meta_description,
  canonical_url,
  custom_page_path,
  featured,
  publish_status,
  source
)
VALUES (
  'brigade-kompally',
  'Brigade Kompally',
  'Brigade Group',
  'Kompally',
  'Hyderabad',
  'Planned 2, 3 & 4 BHK High-Rise Residences',
  ARRAY[2, 3, 4],
  'Apartment',
  'Pricing Unannounced · Awaiting TG RERA Sanction',
  'Pre-Launch Planning',
  'Unannounced · Awaiting TG RERA Sanction',
  '~5.6 Acres under Joint Development Agreement (JDA) · Planned 2, 3 & 4 BHK High-Rise Residences · Developed by Brigade Enterprises Limited · NH-44 & ORR Exit 6 Connectivity · TG RERA Registration Reported in Process · Est. GDV ~₹850 Cr',
  'Brigade Kompally is an upcoming ~5.6-acre residential community in Kompally, North Hyderabad by Brigade Enterprises Limited (NSE: BRIGADE | BSE: 532929), secured under a Joint Development Agreement (JDA) with an estimated Gross Development Value (GDV) of ~₹850 Crore as disclosed in SEBI regulatory filings. The development is planned to offer 2 BHK, 3 BHK, and 4 BHK high-rise residences along the NH-44 corridor with direct transit access toward Nehru Outer Ring Road (ORR Exit 6 at Kandlakoya). TG RERA registration is reported as in process. Official pricing, sanctioned floor plans, apartment dimensions, and possession timelines remain unannounced pending statutory approvals.',
  ARRAY[]::text[],
  '[
    {"q": "Who is developing Brigade Kompally?", "a": "Brigade Kompally is being developed by Brigade Enterprises Limited (Brigade Group), one of India premier listed real estate developers founded in 1986."},
    {"q": "Where is Brigade Kompally located?", "a": "The project is located in Kompally, Medchal-Malkajgiri District, North Hyderabad along the NH-44 corridor with direct transit access toward Nehru Outer Ring Road (ORR Exit 6 at Kandlakoya)."},
    {"q": "What is the project land extent?", "a": "Brigade Enterprises Limited secured approximately 5.6 acres in Kompally under a Joint Development Agreement (JDA), as officially disclosed to the stock exchanges (BSE & NSE)."},
    {"q": "Which configurations are planned?", "a": "The development is planned to offer 2 BHK, 3 BHK, and 4 BHK residential apartments in modern high-rise towers. Final typologies will be confirmed upon regulatory sanction."},
    {"q": "What is the current TG RERA status?", "a": "TG RERA registration is reported as in process. In accordance with the Real Estate (Regulation and Development) Act, official marketing, sales, and bookings will commence only after the registration certificate and number are granted by the Telangana Real Estate Regulatory Authority."},
    {"q": "Are apartment sizes and floor plans available?", "a": "Official unit dimensions, carpet areas, and floor plans are currently unannounced. They will be published once sanctioned building plans are approved by municipal authorities and TG RERA."},
    {"q": "Has pricing been announced?", "a": "No official pricing or payment schedule has been announced by the developer. The estimated Gross Development Value (GDV) of ~₹850 Crore disclosed in exchange filings reflects the project overall anticipated development realization, not individual apartment pricing."}
  ]'::jsonb,
  ARRAY[]::text[],
  NULL,
  NULL,
  NULL,
  'Brigade Kompally Hyderabad | 2, 3 & 4 BHK by Brigade',
  'Explore Brigade Kompally in North Hyderabad. Discover its 5.6-acre development, planned configurations, developer details and latest TG RERA status.',
  'https://www.naani.in/projects/brigade-kompally',
  '/projects/brigade-kompally',
  false,
  'draft',
  'internal'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  builder = EXCLUDED.builder,
  location = EXCLUDED.location,
  configuration = EXCLUDED.configuration,
  bhk_list = EXCLUDED.bhk_list,
  property_type = EXCLUDED.property_type,
  price_range = EXCLUDED.price_range,
  status = EXCLUDED.status,
  possession = EXCLUDED.possession,
  usp = EXCLUDED.usp,
  description = EXCLUDED.description,
  amenities = CASE
    WHEN projects.amenities IS NOT NULL AND cardinality(projects.amenities) > 0 THEN projects.amenities
    ELSE EXCLUDED.amenities
  END,
  faqs = CASE
    WHEN projects.faqs IS NOT NULL AND jsonb_array_length(projects.faqs) > 0 THEN projects.faqs
    ELSE EXCLUDED.faqs
  END,
  gallery = CASE
    WHEN projects.gallery IS NOT NULL AND cardinality(projects.gallery) > 0 THEN projects.gallery
    ELSE EXCLUDED.gallery
  END,
  hero_image = COALESCE(projects.hero_image, EXCLUDED.hero_image),
  brochure_url = COALESCE(projects.brochure_url, EXCLUDED.brochure_url),
  map_embed_url = COALESCE(projects.map_embed_url, EXCLUDED.map_embed_url),
  seo_title = EXCLUDED.seo_title,
  meta_description = EXCLUDED.meta_description,
  canonical_url = EXCLUDED.canonical_url,
  custom_page_path = EXCLUDED.custom_page_path,
  featured = COALESCE(projects.featured, EXCLUDED.featured),
  publish_status = COALESCE(projects.publish_status, EXCLUDED.publish_status),
  source = COALESCE(projects.source, EXCLUDED.source),
  updated_at = NOW();
