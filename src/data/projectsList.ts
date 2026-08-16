// Single source of truth for all project pages used by Footer & Projects hub.
export interface ProjectListItem {
  name: string;
  slug: string; // path
  location: string;
}

export const ALL_PROJECTS: ProjectListItem[] = [
  { name: "Tridasa Rise", slug: "/projects/tridasa-rise", location: "Nallagandla" },
  { name: "Man Airport Residency", slug: "/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad", location: "Tukkuguda" },
  { name: "Brigade Gateway Neopolis", slug: "/projects/brigade-gateway-neopolis-kokapet-hyderabad", location: "Kokapet" },
  { name: "Prestige Golden Grove", slug: "/projects/prestige-golden-grove-hyderabad", location: "Kollur" },
  { name: "Jaycon Gateway Tirupati", slug: "/projects/jaycon-gateway-tirupati", location: "Tirupati" },
  { name: "Aspire Spaces A3", slug: "/projects/aspire-spaces-a3-bachupally", location: "Mallampet" },
  { name: "Sri Soho Interiors", slug: "/projects/sri-soho-interiors-designers-hyderabad", location: "Hyderabad" },
  { name: "Team4 Aria Miyapur", slug: "/projects/team4-aria-miyapur-luxury-apartments-hyderabad", location: "Miyapur" },
  { name: "Rajapushpa Sierra", slug: "/projects/rajapushpa-sierra-tellapur-hyderabad", location: "Tellapur" },
  { name: "Candeur Eternia", slug: "/projects/candeur-eternia-bachupally-hyderabad", location: "Bachupally" },
  { name: "Godrej Kukatpally", slug: "/projects/godrej-kukatpally-hyderabad", location: "Kukatpally" },
  { name: "Raghava Halo", slug: "/projects/raghava-halo-kondapur-hyderabad", location: "Kondapur" },
  { name: "Aritha GBR Dhanwin Towers", slug: "/projects/aritha-gbr-dhanwin-towers-bowrampet-hyderabad", location: "Bowrampet" },
  { name: "Sanvi's Kowsalya Vasudha", slug: "/projects/sanvis-kowsalya-vasudha-mallampet", location: "Mallampet" },
  { name: "Sanvi Kowsalya Manidweepa Shikaram", slug: "/projects/sanvi-kowsalya-manidweepa-shikaram-bachupally", location: "Bachupally" },
  { name: "Sanvi Kowsalya Avani", slug: "/projects/sanvi-kowsalya-avani-kristareddypet", location: "Kristareddypet" },
];
