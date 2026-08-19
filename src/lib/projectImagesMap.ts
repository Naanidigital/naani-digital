import candeurHero from "@/assets/candeur-eternia/hero.png";
import godrejHero from "@/assets/godrej-kukatpally/hero.jpg";
import prestigeElevation from "@/assets/prestige/elevation.jpg";
import brigadeElevation from "@/assets/brigade/elevation.png";
import aspireElevation from "@/assets/aspire-a3-elevation.jpg";
import jayconElevation from "@/assets/jaycon/elevation-collage.png";
import manAirportElevation from "@/assets/man-airport/villa-elevation.png";
import team4Hero from "@/assets/team4-aria/hero.png";
import rajapushpaHero from "@/assets/rajapushpa-sierra/hero.webp";
import tridasaBlock from "@/assets/tridasa/block-a-b.png";
import cascadesHero from "@/assets/cascades/the-cascades-neopolis-elevation-hero.jpg";
import riseHero from "@/assets/rise-with-9/rise-with-9-trilight-hero.jpg";
import linqHero from "@/assets/linq-by-raghava/linq-by-raghava-elevation-hero.jpg";
import neoHero from "@/assets/neo-towers/tower.webp";
import trumpHero from "@/assets/trump-towers/hero.jpg";

export const STATIC_PROJECT_IMAGES: Record<string, string> = {
  "prestige-golden-grove-hyderabad": prestigeElevation,
  "prestige-golden-grove": prestigeElevation,
  "brigade-gateway-neopolis-kokapet-hyderabad": brigadeElevation,
  "brigade-gateway-neopolis": brigadeElevation,
  "the-cascades-neopolis": cascadesHero,
  "rise-with-9": riseHero,
  "rise-with-9-neopolis-kokapet": riseHero,
  "linq-by-raghava": linqHero,
  "linq-by-raghava-neopolis": linqHero,
  "neo-towers": neoHero,
  "neo-towers-neopolis-kokapet": neoHero,
  "trump-towers-hyderabad-kokapet": trumpHero,
  "trump-towers-hyderabad": trumpHero,
  "candeur-eternia-bachupally-hyderabad": candeurHero,
  "candeur-eternia": candeurHero,
  "godrej-kukatpally-hyderabad": godrejHero,
  "godrej-kukatpally": godrejHero,
  "aspire-spaces-a3-bachupally": aspireElevation,
  "aspire-spaces-a3": aspireElevation,
  "jaycon-gateway-tirupati": jayconElevation,
  "jaycon-gateway": jayconElevation,
  "man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad": manAirportElevation,
  "man-airport-residency": manAirportElevation,
  "team4-aria-miyapur-luxury-apartments-hyderabad": team4Hero,
  "team4-aria": team4Hero,
  "rajapushpa-sierra-tellapur-hyderabad": rajapushpaHero,
  "rajapushpa-sierra": rajapushpaHero,
  "tridasa-rise": tridasaBlock,
  "sri-soho-interiors-designers-hyderabad": "/og/sri-soho-interiors.png",
};

export const DEFAULT_BUILDING_IMAGES = [
  prestigeElevation,
  brigadeElevation,
  candeurHero,
  godrejHero,
  aspireElevation,
  rajapushpaHero,
  team4Hero,
  tridasaBlock,
  jayconElevation,
  manAirportElevation,
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
];

export function getMappedProjectImage(slug?: string | null, name?: string | null): string | null {
  if (slug) {
    const s = slug.toLowerCase().trim();
    if (STATIC_PROJECT_IMAGES[s]) return STATIC_PROJECT_IMAGES[s];
    for (const [k, v] of Object.entries(STATIC_PROJECT_IMAGES)) {
      if (s.includes(k) || k.includes(s)) return v;
    }
  }

  if (name) {
    const n = name.toLowerCase().trim();
    if (n.includes("prestige") || n.includes("golden grove")) return prestigeElevation;
    if (n.includes("brigade") || n.includes("neopolis")) return brigadeElevation;
    if (n.includes("aspire") || n.includes("spaces a3")) return aspireElevation;
    if (n.includes("jaycon") || n.includes("gateway")) return jayconElevation;
    if (n.includes("man airport") || n.includes("tukkuguda")) return manAirportElevation;
    if (n.includes("candeur") || n.includes("eternia")) return candeurHero;
    if (n.includes("godrej") || n.includes("kukatpally")) return godrejHero;
    if (n.includes("rajapushpa") || n.includes("sierra")) return rajapushpaHero;
    if (n.includes("team4") || n.includes("aria")) return team4Hero;
    if (n.includes("tridasa") || n.includes("rise")) return tridasaBlock;
  }

  return null;
}
