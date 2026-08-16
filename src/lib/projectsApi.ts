import { supabase } from "@/integrations/supabase/client";

export interface DBProject {
  id: string;
  slug: string;
  name: string;
  builder: string | null;
  location: string | null;
  city: string | null;
  configuration: string | null;
  bhk_list: number[] | null;
  property_type: string | null;
  price_range: string | null;
  min_price_inr: number | null;
  max_price_inr: number | null;
  status: string | null;
  possession: string | null;
  usp: string | null;
  description: string | null;
  amenities: string[] | null;
  faqs: { q?: string; a?: string; question?: string; answer?: string }[] | null;
  gallery: string[] | null;
  hero_image: string | null;
  brochure_url: string | null;
  map_embed_url: string | null;
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  custom_page_path: string | null;
  featured: boolean | null;
}

export const fetchProjects = async (): Promise<DBProject[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })
    .order("name", { ascending: true })
    .limit(1000);
  if (error) throw error;
  return (data ?? []) as unknown as DBProject[];
};

export const fetchProjectBySlug = async (slug: string): Promise<DBProject | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as DBProject | null;
};

export const projectPath = (p: Pick<DBProject, "slug" | "custom_page_path">) =>
  p.custom_page_path || `/projects/${p.slug}`;
