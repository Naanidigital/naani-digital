CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  builder TEXT,
  location TEXT,
  city TEXT DEFAULT 'Hyderabad',
  configuration TEXT,
  bhk_list INT[] DEFAULT '{}',
  property_type TEXT DEFAULT 'Apartment',
  price_range TEXT,
  min_price_inr BIGINT,
  max_price_inr BIGINT,
  status TEXT,
  possession TEXT,
  usp TEXT,
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  faqs JSONB DEFAULT '[]'::jsonb,
  gallery TEXT[] DEFAULT '{}',
  hero_image TEXT,
  brochure_url TEXT,
  map_embed_url TEXT,
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  custom_page_path TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_location ON public.projects(location);
CREATE INDEX idx_projects_builder ON public.projects(builder);
CREATE INDEX idx_projects_status ON public.projects(status);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON public.projects FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete projects"
  ON public.projects FOR DELETE TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();