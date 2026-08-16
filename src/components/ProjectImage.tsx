import { useState, useMemo, ImgHTMLAttributes } from "react";
import placeholder from "@/assets/naani-project-placeholder.jpg";
import { getMappedProjectImage, DEFAULT_BUILDING_IMAGES } from "@/lib/projectImagesMap";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  hero?: string | null;
  gallery?: string[] | null;
  slug?: string | null;
  name?: string | null;
  alt: string;
}

/**
 * Smart property image with a resilient fallback chain:
 * hero_image → gallery[0..n] → static mapped image by slug/name → default luxury building images.
 * Auto-advances on load errors so a dead URL never leaves a blank card.
 */
const ProjectImage = ({ hero, gallery, slug, name, alt, className, ...rest }: Props) => {
  const candidates = useMemo(() => {
    const list: string[] = [];

    // 1. Static mapped image for known projects first (high priority)
    const mapped = getMappedProjectImage(slug, name);
    if (mapped) list.push(mapped);

    // 2. Hero image if provided and valid
    if (hero && typeof hero === "string" && hero.trim().length > 0 && !hero.includes("placeholder")) {
      list.push(hero.trim());
    }

    // 3. Gallery images
    if (Array.isArray(gallery)) {
      gallery.forEach((g) => {
        if (g && typeof g === "string" && g.trim().length > 0 && !list.includes(g.trim())) {
          list.push(g.trim());
        }
      });
    }

    // 4. Fallback luxury building images
    DEFAULT_BUILDING_IMAGES.forEach((img) => {
      if (!list.includes(img)) list.push(img);
    });

    if (placeholder && !list.includes(placeholder)) {
      list.push(placeholder);
    }

    return list;
  }, [hero, gallery, slug, name]);

  const [idx, setIdx] = useState(0);
  const src = candidates[idx] ?? candidates[0];

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setIdx((i) => (i < candidates.length - 1 ? i + 1 : i))}
      {...rest}
    />
  );
};

export default ProjectImage;
