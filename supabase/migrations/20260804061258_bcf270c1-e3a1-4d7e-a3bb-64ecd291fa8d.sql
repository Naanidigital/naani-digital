UPDATE public.projects
SET canonical_url = replace(canonical_url, 'https://naani.lovable.app', 'https://www.naani.in')
WHERE canonical_url LIKE 'https://naani.lovable.app%';

INSERT INTO public.projects (name, slug, custom_page_path, canonical_url, builder, city, location, configuration, property_type, status, publish_status, published_at, featured, seo_title, meta_description, price_range, source)
SELECT 'Aritha GBR Dhanwin Towers', 'aritha-gbr-dhanwin-towers-bowrampet-hyderabad', '/projects/aritha-gbr-dhanwin-towers-bowrampet-hyderabad', 'https://www.naani.in/projects/aritha-gbr-dhanwin-towers-bowrampet-hyderabad', 'Aritha Developers LLP', 'Hyderabad', 'Bowrampet', '2 & 3 BHK', 'Apartment', 'Ready to Move', 'published', now(), true,
 'Aritha GBR Dhanwin Towers Bowrampet | 2 & 3 BHK Apartments', 'Aritha GBR Dhanwin Towers, Bowrampet: 2 & 3 BHK apartments across 4.7 acres and 9 blocks. Get price, floor plans, brochure and site visit. Call now.', 'Price on request', 'internal'
WHERE NOT EXISTS (SELECT 1 FROM public.projects WHERE slug = 'aritha-gbr-dhanwin-towers-bowrampet-hyderabad');