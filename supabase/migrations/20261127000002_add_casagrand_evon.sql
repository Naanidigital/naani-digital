-- Migration: Insert or Update Casagrand Evon in public.projects
-- Database Target: lpbdwmpglwdedqdiovqu (Master Property Catalogue)
-- Status: Draft (Unpublished pending publication review)
-- Idempotent: ON CONFLICT (slug) DO UPDATE with safe non-destructive preservation
-- Phase 2.1: Pruned unconfirmed open-space percentages, speculative floor plan claims, and combined promoter entities.

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
  min_price_inr,
  max_price_inr,
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
  'casagrand-evon-kompally',
  'Casagrand Evon',
  'Casagrand',
  'Kompally',
  'Hyderabad',
  '3 & 4 BHK Luxury Residences',
  ARRAY[3, 4],
  'Apartment',
  'Pricing Upon Request · Awaiting Official Price Sheet',
  NULL,
  NULL,
  'Under Construction',
  'TG RERA Registered Completion: June 18, 2030 · Developer Target: Early 2029 (Indicative)',
  '6.84 Acres Japanese-Themed Enclave · 579 Luxury Apartments · 3 Towers (2B+G+11) · ~34,860 Sft Clubhouse · 3 & 4 BHK Formats · TG RERA P02200009350 · HMDA Approved',
  'Casagrand Evon is a premium 6.84-acre Japanese-themed residential apartment community in Kompally, North Hyderabad developed by Casagrand Hyderwise Private Limited under the Casagrand brand (TG RERA Reg. No. P02200009350 | HMDA Permit No. 013326/BP/HMDA/2977/MED/2023). The development comprises 579 residential apartments across 3 towers of 2 basements, ground floor, and 11 upper floors (2B+G+11). Designed exclusively with 3 BHK (2,075–2,080 SFT developer-advertised super built-up area) and 4 BHK (2,850 SFT developer-advertised super built-up area) formats, the enclave features authentic Zen landscaped courtyards, shaded pergola walkways, and a grand resident clubhouse of approximately 34,860 SFT offering indoor sports, fitness, and lifestyle facilities. Situated along the NH-44 residential corridor with connectivity to Nehru Outer Ring Road (ORR Exit 6 at Kandlakoya) and Suchitra Circle. TG RERA certificate validity extends through June 18, 2030.',
  ARRAY[
    'Grand Resident Clubhouse (~34,860 SFT)',
    'Swimming Pool',
    'Gymnasium',
    'Multi-Purpose Hall',
    'Japanese Zen Landscaped Courtyard',
    'Pergola Walkways & Green Corridors',
    'Indoor Badminton Facility',
    'Indoor Games Zone',
    'Children Outdoor Play Area',
    '24/7 Gated Security & Checkpoints',
    'Generator Power Backup',
    'Rainwater Harvesting & Sewage Treatment'
  ]::text[],
  '[
    {"q": "Who is the registered promoter of Casagrand Evon in Kompally?", "a": "Casagrand Evon is developed under the Casagrand brand, with Casagrand Hyderwise Private Limited registered as the official promoter entity on the Telangana RERA certificate."},
    {"q": "What is the TG RERA registration number and validity?", "a": "Casagrand Evon is registered under TG RERA Registration Number P02200009350, with certificate completion recorded as June 18, 2030."},
    {"q": "What is the municipal building approval number?", "a": "The project has obtained HMDA building permission under Sanction Permit Number 013326/BP/HMDA/2977/MED/2023."},
    {"q": "What is the project land extent and unit count?", "a": "The project spans approximately 6.84 acres as recorded in regulatory filings, comprising 579 apartments across 3 towers structured as 2 Basements + Ground + 11 Floors."},
    {"q": "Which apartment configurations and sizes are available?", "a": "The project offers 3 BHK apartments (2,075 to 2,080 SFT developer-advertised super built-up area) and 4 BHK luxury residences (2,850 SFT developer-advertised super built-up area). Actual unit areas and sanctioned plans must be confirmed with the developer."},
    {"q": "What is the expected possession timeline?", "a": "The developer marketing literature cites an indicative target of early 2029 (unconfirmed guarantee), while the statutory TG RERA certificate validity extends through June 18, 2030."}
  ]'::jsonb,
  ARRAY[]::text[],
  NULL,
  NULL,
  NULL,
  'Casagrand Evon Kompally | 3 & 4 BHK Japanese-Themed Residences',
  'Explore Casagrand Evon in Kompally, North Hyderabad. 6.8 acres with 579 luxury 3 & 4 BHK apartments, 34,860 Sft clubhouse & TG RERA P02200009350.',
  'https://www.naani.in/projects/casagrand-evon-kompally',
  '/projects/casagrand-evon-kompally',
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
  featured = CASE
    WHEN projects.featured IS NOT NULL THEN projects.featured
    ELSE EXCLUDED.featured
  END,
  publish_status = CASE
    WHEN projects.publish_status IS NOT NULL THEN projects.publish_status
    ELSE EXCLUDED.publish_status
  END,
  source = COALESCE(projects.source, EXCLUDED.source),
  updated_at = NOW();
