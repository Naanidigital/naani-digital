// SEO slug helpers for location & builder hub pages.
export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Match a user-typed slug against a value from the DB by comparing normalized slugs.
export const matchesSlug = (value: string | null | undefined, slug: string) =>
  !!value && slugify(value) === slug.toLowerCase();

export const BUILDER_SUFFIX = "-projects-hyderabad";

export const isBuilderSeoSlug = (s: string) => s.toLowerCase().endsWith(BUILDER_SUFFIX);
export const builderSlugFromSeo = (s: string) =>
  s.toLowerCase().replace(new RegExp(`${BUILDER_SUFFIX}$`), "");

export const titleCase = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
