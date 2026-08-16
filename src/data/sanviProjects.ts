// ============================================================================
// SANVI INFRA PROJECTS PRIVATE LIMITED — project data (single source of truth)
// Drives /projects/sanvis-kowsalya-vasudha-mallampet,
//        /projects/sanvi-kowsalya-manidweepa-shikaram-bachupally,
//        /projects/sanvi-kowsalya-avani-kristareddypet
// ============================================================================

export const SANVI_BUILDER = "Sanvi Infra Projects Private Limited";
export const SANVI_BUILDER_SLUG = "sanvi-infra-projects-private-limited-projects-hyderabad";
export const SITE = "https://www.naani.in";

export interface SanviFaq {
  q: string;
  a: string;
}

export interface SanviUnit {
  type: string;
  size: string;
  bathrooms: string;
  note: string;
}

export interface SanviNearby {
  category: string;
  items: { name: string; distance: string }[];
}

export interface SanviProject {
  key: string;
  name: string;
  slug: string; // full path
  location: string; // locality
  locationFull: string;
  locationSlug: string;
  propertyType: string;
  configuration: string;
  bhkList: number[];
  projectArea: string;
  structure: string;
  towers: string;
  units: string;
  clubhouse: string;
  possession: string;
  rera: string;
  status: string;
  loanPrice: string;
  oneTimePrice: string;
  floorRise: string;
  amenitiesCharges: string;
  priceNote: string;
  heroTagline: string;
  seoTitle: string;
  metaDescription: string;
  ogImage: string;
  mapEmbed: string;
  mapLink: string;
  geo: { lat: number; lng: number };
  highlights: { title: string; desc: string }[];
  units_: SanviUnit[];
  overview: string[];
  whyChoose: { title: string; desc: string }[];
  amenityGroups: { title: string; items: string[] }[];
  clubhouseCopy: string[];
  specifications: { head: string; body: string }[];
  floorPlans: { label: string; desc: string }[];
  connectivity: { name: string; distance: string }[];
  nearby: SanviNearby[];
  investment: string[];
  aboutProject: string[];
  faqs: SanviFaq[];
  keywords: string[];
  relatedSearches: string[];
  primaryKeyword: string;
  brochureUrl?: string;
}

/* -------------------------------------------------------------------------- */
/* Shared developer copy                                                       */
/* -------------------------------------------------------------------------- */

export const SANVI_ABOUT: string[] = [
  "Sanvi Infra Projects Private Limited is a Hyderabad-based residential developer with a clear focus on large-format gated communities along the city's fastest-growing north-western growth corridor — Mallampet, Bachupally, Nizampet, Kristareddypet and the Outer Ring Road exit belt. The company builds under the well-recognised 'Kowsalya' family of addresses, each planned around generous clubhouses, podium-level landscaping and efficient, Vaastu-aligned floor plates.",
  "The developer's construction philosophy is simple and consistent: buy land in locations that are already served by schools, hospitals and IT employment, keep tower densities sensible, and put a disproportionate share of the budget into the shared amenity block that families actually use every day. That is why every Sanvi community launched in the last cycle carries a clubhouse of 15,000 sft or more, with the flagship Avani community crossing 21,000 sft.",
  "Sanvi Infra Projects works with RCC shear-wall and conventional framed structures designed by empanelled structural consultants for seismic Zone II compliance, uses branded CP and sanitary fittings, and hands over homes with vitrified tile flooring, modular-ready kitchens and 100% power backup for common areas. Buyers get transparent, per-square-foot pricing with clearly stated floor rise and amenity charges rather than hidden loading.",
  "Naani Projects is an authorised channel partner for Sanvi Infra Projects. Our advisors handle unit selection, floor and facing availability, bank loan tie-ups, cost sheets and site visits at no extra cost to the buyer — the price you pay is the same as booking directly with the developer.",
];

/* -------------------------------------------------------------------------- */
/* 1. SANVI'S KOWSALYA VASUDHA — Mallampet                                     */
/* -------------------------------------------------------------------------- */

const VASUDHA: SanviProject = {
  key: "vasudha",
  name: "Sanvi's Kowsalya Vasudha",
  slug: "/projects/sanvis-kowsalya-vasudha-mallampet",
  location: "Mallampet",
  locationFull: "Near ORR Exit 4A, Mallampet, Hyderabad",
  locationSlug: "mallampet",
  propertyType: "Apartment",
  configuration: "2 & 3 BHK",
  bhkList: [2, 3],
  projectArea: "2 Acres",
  structure: "Cellar + 2 Podiums + 13 Floors",
  towers: "1 Tower",
  units: "215 Premium Units",
  clubhouse: "15,000+ Sft Clubhouse",
  possession: "On Request",
  rera: "RERA Number — Application in Process (available on request)",
  status: "Under Construction",
  loanPrice: "₹5,X99 / Sft (Loan Option)",
  oneTimePrice: "₹4,X99 / Sft (One Time Payment)",
  floorRise: "₹20 per Sft from the 6th floor onwards",
  amenitiesCharges: "₹6 Lakhs (includes 1 car parking)",
  priceNote: "East and corner charges applicable. Exact per-sft rate is shared on request.",
  heroTagline: "Luxury 2 & 3 BHK gated community apartments moments from ORR Exit 4A",
  seoTitle: "Sanvi's Kowsalya Vasudha Mallampet | 2 & 3 BHK Price",
  metaDescription:
    "Sanvi's Kowsalya Vasudha, Mallampet: 2 & 3 BHK luxury apartments (1400-3030 sft), 215 units, 15,000+ sft clubhouse. Get price, floor plans & brochure. Call now.",
  ogImage: `${SITE}/og/naani-projects-og.png`,
  mapEmbed:
    "https://www.google.com/maps?q=Mallampet%2C%20Hyderabad&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Mallampet+Hyderabad",
  geo: { lat: 17.5382, lng: 78.3672 },
  primaryKeyword: "Sanvi's Kowsalya Vasudha Mallampet",
  highlights: [
    { title: "2 & 3 BHK Luxury Homes", desc: "1400 – 3030 sft of efficient, Vaastu-aligned space" },
    { title: "2 Acres Gated Community", desc: "Compact, secure and easy to manage" },
    { title: "Cellar + 2 Podiums + 13 Floors", desc: "Vehicle-free podium living above parking" },
    { title: "215 Premium Units", desc: "Single tower with low resident density" },
    { title: "15,000+ Sft Clubhouse", desc: "Gym, pool, indoor games and banquet" },
    { title: "ORR Exit 4A Proximity", desc: "Fast access to Gachibowli and the airport" },
    { title: "100% Vaastu Layouts", desc: "East, west and north facing options" },
    { title: "1 Car Park Included", desc: "Covered parking within amenity charges" },
    { title: "Podium Landscape Deck", desc: "Two full podium levels of greenery" },
    { title: "Loan & One-Time Pricing", desc: "Two transparent payment structures" },
    { title: "Bachupally School Belt", desc: "Top CBSE and IB schools within 10 minutes" },
    { title: "Investor-Friendly Ticket Size", desc: "Entry pricing below Kokapet and Tellapur" },
  ],
  units_: [
    { type: "2 BHK", size: "1400 – 1650 Sft", bathrooms: "2 Bathrooms", note: "Compact luxury with utility and dry balcony" },
    { type: "3 BHK", size: "1845 – 2400 Sft", bathrooms: "3 Bathrooms", note: "Standard 3 BHK with pooja and utility" },
    { type: "3 BHK Large", size: "2400 – 3030 Sft", bathrooms: "3 Bathrooms + Powder", note: "Corner and east-facing premium floor plates" },
  ],
  overview: [
    "Sanvi's Kowsalya Vasudha is a 2-acre luxury gated community rising just off ORR Exit 4A in Mallampet, one of the most actively transacted residential micro-markets in north-west Hyderabad. The community is planned as a single tower of Cellar + 2 Podiums + 13 floors carrying 215 premium residences, which keeps the resident density comfortably low while still delivering the scale needed for a 15,000+ sft clubhouse.",
    "The two podium levels are the defining idea of the master plan. All vehicular movement and parking is pushed below and into the podium structure, freeing the entire upper deck for landscaped walkways, children's play areas, seating courts and open-air fitness zones. Residents step out of the lift onto a green, traffic-free level rather than into a driveway — a planning standard normally reserved for far more expensive Financial District addresses.",
    "Homes are offered in 2 BHK configurations of 1400 to 1650 sft and 3 BHK configurations from 1845 sft going up to 3030 sft for the largest corner units. Every floor plate has been drawn for cross-ventilation and natural light, with living and dining spaces opening to deep balconies, separate utility and dry-balcony provision off the kitchen, and dedicated pooja space in the 3 BHK layouts.",
    "Pricing is deliberately structured in two clean options — a loan-linked rate of ₹5,X99 per sft and a one-time payment rate of ₹4,X99 per sft. Floor rise of ₹20 per sft applies from the sixth floor onwards, amenity charges of ₹6 lakhs include one covered car parking, and east or corner premium is quoted upfront. There is no hidden loading in the saleable area calculation.",
  ],
  whyChoose: [
    { title: "ORR Exit 4A At Your Doorstep", desc: "The Outer Ring Road entry sits minutes away, putting Gachibowli, the Financial District and Shamshabad Airport on a single uninterrupted drive." },
    { title: "Low-Density Single Tower", desc: "215 homes on two acres means shorter lift waits, less crowding at the clubhouse and better long-term maintenance economics." },
    { title: "Clubhouse Ahead Of Segment", desc: "15,000+ sft of indoor amenity for a two-acre project is unusually generous and directly supports resale and rental demand." },
    { title: "Established Social Infrastructure", desc: "Mallampet is wrapped by the Bachupally-Nizampet school and hospital belt, so daily life does not depend on future promises." },
    { title: "Transparent Price Sheet", desc: "Loan rate, one-time rate, floor rise, amenity charges and facing premium are all disclosed before booking." },
    { title: "Strong Rental Catchment", desc: "IT employees working in HITEC City, Kompally and Gachibowli form a deep, year-round tenant pool for 2 and 3 BHK stock." },
  ],
  amenityGroups: [
    { title: "Clubhouse & Fitness", items: ["Fully equipped gymnasium", "Indoor swimming pool", "Yoga and meditation deck", "Aerobics studio", "Steam and sauna", "Squash court", "Indoor badminton", "Table tennis"] },
    { title: "Social & Community", items: ["Banquet hall", "Multipurpose party lawn", "Mini theatre", "Library and reading lounge", "Board games room", "Co-working lounge", "Guest rooms", "Cafeteria"] },
    { title: "Family & Kids", items: ["Children's play area", "Toddler zone", "Creche", "Skating rink", "Sand pit", "Kids' pool", "Amphitheatre", "Senior citizen court"] },
    { title: "Outdoor & Podium", items: ["Two-level podium garden", "Jogging track", "Half basketball court", "Cricket practice net", "Open gym", "Reflexology walkway", "Pet zone", "Sculpture court"] },
    { title: "Safety & Utility", items: ["24x7 CCTV surveillance", "Gated security with intercom", "100% power backup for common areas", "Fire-fighting system", "Rainwater harvesting", "Sewage treatment plant", "Organic waste converter", "EV charging provision"] },
  ],
  clubhouseCopy: [
    "The 15,000+ sft clubhouse at Kowsalya Vasudha is planned as the social spine of the community and sits at podium level so it is directly walkable from every lift core without crossing a road.",
    "The ground level of the club is dedicated to active use — gym, aerobics studio, indoor pool with a separate kids' pool, and changing rooms with steam and sauna. The upper level houses the quieter functions: library, board-games room, co-working lounge and a banquet hall that opens to an outdoor party lawn for family functions.",
    "A mini theatre, guest rooms for visiting family and a small cafeteria round out the programme. Because the clubhouse serves only 215 families, booking pressure on the banquet and guest rooms stays low compared with 800-unit townships in the same price band.",
  ],
  specifications: [
    { head: "Structure", body: "RCC framed structure designed for seismic Zone II compliance, with solid block masonry walls and cellar plus two podium parking levels." },
    { head: "Flooring", body: "800x800 mm double-charged vitrified tiles in living, dining and bedrooms; anti-skid ceramic tiles in balconies, bathrooms and utility." },
    { head: "Kitchen", body: "Granite platform with stainless steel sink, glazed tile dado up to 2 feet above the counter, provision for water purifier, chimney, hob and modular fit-out." },
    { head: "Bathrooms", body: "Branded CP fittings and sanitaryware, wall-hung EWC, single-lever diverters, hot and cold mixer, and glazed tiles up to false ceiling height." },
    { head: "Doors & Windows", body: "Teak-finish main door with designer hardware, engineered flush doors internally, UPVC glazed windows with mosquito mesh provision." },
    { head: "Electrical", body: "Concealed copper wiring with modular switches, TV and telephone points in living and master bedroom, AC provision in all bedrooms and living, 100% common-area DG backup." },
    { head: "Painting", body: "Smooth putty finish with premium emulsion internally; textured and weatherproof exterior paint on the external facade." },
    { head: "Lifts & Security", body: "High-speed automatic passenger lifts with a dedicated service lift, video door phone, CCTV on all common floors and a gated single-entry security plaza." },
  ],
  floorPlans: [
    { label: "2 BHK — 1400 Sft", desc: "Efficient two-bedroom layout with living-dining combine, open kitchen with utility and two full bathrooms." },
    { label: "2 BHK — 1650 Sft", desc: "Larger two-bedroom plan with a deeper living room, wider master bedroom and an extended balcony." },
    { label: "3 BHK — 1845 Sft", desc: "Entry-level three-bedroom plan with pooja niche, three bathrooms and a utility off the kitchen." },
    { label: "3 BHK — 2400 Sft", desc: "Premium three-bedroom plan with all-ensuite bathrooms, formal foyer and a large family lounge." },
    { label: "3 BHK — 3030 Sft", desc: "Signature corner residence with three-side openings, powder room, maid's room provision and dual balconies." },
  ],
  connectivity: [
    { name: "ORR Exit 4A", distance: "Approx. 5 minutes" },
    { name: "Bachupally Main Road", distance: "Approx. 6 minutes" },
    { name: "Nizampet Circle", distance: "Approx. 10 minutes" },
    { name: "Miyapur Metro Station", distance: "Approx. 20 minutes" },
    { name: "HITEC City", distance: "Approx. 30 minutes via ORR" },
    { name: "Gachibowli", distance: "Approx. 30 minutes via ORR" },
    { name: "Kompally", distance: "Approx. 25 minutes" },
    { name: "Rajiv Gandhi International Airport", distance: "Approx. 60 minutes via ORR" },
  ],
  nearby: [
    { category: "Schools", items: [{ name: "Sancta Maria International School", distance: "6 km" }, { name: "Silver Oaks International", distance: "8 km" }, { name: "Vikas The Concept School", distance: "5 km" }, { name: "Narayana & Sri Chaitanya", distance: "4 km" }] },
    { category: "Hospitals", items: [{ name: "Pranaam Hospitals, Nizampet", distance: "7 km" }, { name: "Sri Sri Holistic Hospital", distance: "8 km" }, { name: "Remedy Hospitals, Kukatpally", distance: "10 km" }, { name: "Malla Reddy Narayana", distance: "12 km" }] },
    { category: "IT Parks & Workplaces", items: [{ name: "HITEC City", distance: "22 km" }, { name: "Gachibowli IT Corridor", distance: "24 km" }, { name: "Kompally Business Hub", distance: "14 km" }, { name: "Genome Valley", distance: "20 km" }] },
    { category: "Shopping & Leisure", items: [{ name: "Sarath City Capital Mall", distance: "12 km" }, { name: "Manjeera Mall, KPHB", distance: "11 km" }, { name: "D-Mart Bachupally", distance: "4 km" }, { name: "Forum Sujana Mall", distance: "13 km" }] },
  ],
  investment: [
    "Mallampet has moved from an outlying village address to a mainstream residential destination in a single property cycle, driven almost entirely by the ORR Exit 4A interchange and the spillover of demand from Bachupally and Nizampet where land is now largely consumed.",
    "Entry pricing here still sits meaningfully below comparable gated stock in Tellapur, Kollur or Kokapet, while the drive time to Gachibowli over the Outer Ring Road is broadly similar. That price gap is the core investment argument: buyers acquire a similar lifestyle product at a lower per-sft base with more headroom for appreciation.",
    "Rental demand is anchored by IT and pharma employment across HITEC City, Genome Valley and the Kompally belt, and by the very large student and faculty population attached to the schools and colleges around Bachupally. Two-bedroom homes in this corridor let quickly, and three-bedroom stock is increasingly taken by families relocating from older Kukatpally apartments.",
    "For end-users, the 215-unit scale is the practical advantage — maintenance charges stay predictable, the association is easier to run, and the clubhouse never feels oversubscribed.",
  ],
  aboutProject: [
    "Choosing a home in Mallampet today is largely a decision about how much community you want for your budget. Sanvi's Kowsalya Vasudha answers that by concentrating on three things that hold value over a ten-year horizon: a podium-led master plan that removes cars from daily life, an amenity block far larger than the project's two-acre footprint would suggest, and floor plates that use nearly every square foot productively.",
    "The single-tower configuration also simplifies construction sequencing, which usually translates into a tighter handover schedule than phased townships where later blocks routinely slip. Buyers who want possession certainty rather than a five-year construction window tend to prefer exactly this format.",
    "Naani Projects advisors can walk you through live inventory, tell you which floors and facings are still open, prepare a complete cost sheet including floor rise and facing premium, and arrange a site visit at a time that suits you. Request the price sheet or download the brochure to get started.",
  ],
  faqs: [
    { q: "Where exactly is Sanvi's Kowsalya Vasudha located?", a: "The project is located in Mallampet, just off ORR Exit 4A in north-west Hyderabad, within easy reach of Bachupally Main Road, Nizampet and the Kukatpally-Miyapur belt." },
    { q: "What configurations are available at Kowsalya Vasudha?", a: "The community offers 2 BHK apartments from 1400 to 1650 sft and 3 BHK apartments from 1845 sft up to 3030 sft for the largest corner residences." },
    { q: "What is the price per square foot?", a: "Two structures are offered — a loan-linked rate of ₹5,X99 per sft and a one-time payment rate of ₹4,X99 per sft. Floor rise of ₹20 per sft applies from the sixth floor onwards. Request the live price sheet for the exact figure." },
    { q: "What are the amenity charges?", a: "Amenity charges are ₹6 lakhs and include one covered car parking space. East and corner facing premiums are charged separately and are disclosed in the cost sheet." },
    { q: "How many units and towers does the project have?", a: "It is a single tower with 215 premium units, planned as Cellar + 2 Podiums + 13 floors across a 2-acre site." },
    { q: "How large is the clubhouse?", a: "The clubhouse measures over 15,000 sft and includes a gym, indoor swimming pool, banquet hall, mini theatre, indoor games, co-working lounge and dedicated kids' zones." },
    { q: "Is the project RERA approved?", a: "The RERA registration number is shared with buyers on request. Our advisors will provide the current approval status and documentation before you pay any booking amount." },
    { q: "Are home loans available for this project?", a: "Yes. Leading banks and housing finance companies fund the project, and the loan-linked price option is designed specifically for buyers taking finance. We assist with loan sanction end to end." },
    { q: "What is the expected possession timeline?", a: "Construction is in progress and the current handover schedule is shared during the site visit or on request, along with the approved construction milestones." },
    { q: "How do I book a site visit or get the brochure?", a: "Click Schedule Site Visit or Download Brochure on this page, share your name and mobile number, and a Naani Projects advisor will confirm your slot and send the brochure immediately." },
  ],
  keywords: [
    "Sanvi's Kowsalya Vasudha", "Sanvi's Kowsalya Vasudha Mallampet", "Sanvi's Kowsalya Vasudha price", "Sanvi's Kowsalya Vasudha brochure", "Sanvi's Kowsalya Vasudha floor plan", "Sanvi's Kowsalya Vasudha amenities", "Sanvi's Kowsalya Vasudha reviews", "Sanvi's Kowsalya Vasudha location", "Sanvi's Kowsalya Vasudha possession date", "Sanvi's Kowsalya Vasudha RERA number", "Sanvi's Kowsalya Vasudha price list", "Sanvi's Kowsalya Vasudha cost sheet", "Book site visit for Sanvi's Kowsalya Vasudha", "Download Sanvi's Kowsalya Vasudha brochure",
    "2 BHK flats for sale in Mallampet", "3 BHK flats for sale in Mallampet", "Luxury apartments in Mallampet", "Luxury flats in Mallampet", "Premium apartments in Mallampet", "Ready to move flats in Mallampet", "Under construction flats in Mallampet", "New launch apartments in Mallampet", "Apartments near Mallampet", "Flats near Mallampet", "Residential projects in Mallampet", "Best apartments in Mallampet", "Best gated community in Mallampet", "Top residential projects in Mallampet", "Affordable flats in Mallampet", "Premium gated community in Mallampet", "Homes in Mallampet", "Gated community apartments in Mallampet", "Buy flat in Mallampet", "Buy apartment in Mallampet", "Invest in Mallampet", "Property for sale in Mallampet", "Apartment for sale in Mallampet", "Flat for sale in Mallampet", "Luxury property in Mallampet", "New apartments in Mallampet", "Best property in Mallampet", "Residential property in Mallampet", "Apartments near ORR Exit 4A", "HMDA approved apartments in Mallampet", "RERA approved apartments in Mallampet",
    "Apartments by Sanvi Infra Projects", "Projects by Sanvi Infra Projects", "New projects by Sanvi Infra Projects", "Upcoming projects by Sanvi Infra Projects", "Luxury projects by Sanvi Infra Projects", "Premium homes by Sanvi Infra Projects", "Buy property from Sanvi Infra Projects", "Top builders in Mallampet",
    "2 BHK apartments in Mallampet", "3 BHK apartments in Mallampet", "2 BHK homes in Mallampet", "3 BHK homes in Mallampet", "Investment property in Mallampet", "Best real estate investment in Mallampet", "Property near IT hub in Mallampet", "Apartments near metro in Mallampet", "Family apartments in Mallampet", "High rise apartments in Mallampet", "Upcoming apartments in Mallampet", "Best apartment project in Mallampet", "Flats near Bachupally", "Apartments near Nizampet", "Gated community near ORR Exit 4A",
  ],
  relatedSearches: [
    "Apartments in Mallampet", "Projects near ORR Exit 4A", "2 BHK flats in Bachupally", "Sanvi Infra Projects Hyderabad", "Gated communities in Nizampet", "Under construction projects in Hyderabad",
  ],
};

/* -------------------------------------------------------------------------- */
/* 2. SANVI KOWSALYA MANIDWEEPA SHIKARAM — Bachupally                          */
/* -------------------------------------------------------------------------- */

const SHIKARAM: SanviProject = {
  key: "shikaram",
  name: "Sanvi Kowsalya Manidweepa Shikaram",
  slug: "/projects/sanvi-kowsalya-manidweepa-shikaram-bachupally",
  location: "Bachupally",
  locationFull: "Nizampet Road, Bachupally, Hyderabad",
  locationSlug: "bachupally",
  propertyType: "Apartment",
  configuration: "2.5 & 3 BHK",
  bhkList: [2, 3],
  projectArea: "1.75 Acres",
  structure: "Block A: 2 Cellars + Stilt + 13 Floors · Block B: 2 Cellars + 17 Floors",
  towers: "2 Blocks (A & B)",
  units: "184 Units",
  clubhouse: "15,000+ Sft Clubhouse",
  possession: "On Request",
  rera: "RERA Number — Application in Process (available on request)",
  status: "Under Construction",
  loanPrice: "₹6,X99 / Sft (Loan Option)",
  oneTimePrice: "₹5,X99 / Sft (One Time Payment)",
  floorRise: "₹20 per Sft from the 6th floor onwards",
  amenitiesCharges: "₹8 Lakhs (includes 1 car parking)",
  priceNote: "East and corner charges applicable. Exact per-sft rate is shared on request.",
  heroTagline: "Premium 2.5 & 3 BHK residences on Nizampet Road, Bachupally",
  seoTitle: "Sanvi Kowsalya Manidweepa Shikaram Bachupally | Price",
  metaDescription:
    "Sanvi Kowsalya Manidweepa Shikaram, Bachupally: premium 2.5 & 3 BHK apartments, 184 units, 2 blocks, 15,000+ sft clubhouse. Get price & brochure. Call now.",
  ogImage: `${SITE}/og/naani-projects-og.png`,
  mapEmbed: "https://www.google.com/maps?q=Bachupally%2C%20Hyderabad&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Bachupally+Hyderabad",
  geo: { lat: 17.5479, lng: 78.3872 },
  primaryKeyword: "Sanvi Kowsalya Manidweepa Shikaram Bachupally",
  highlights: [
    { title: "Premium 2.5 & 3 BHK", desc: "1750 – 2890 sft with study or family room" },
    { title: "1.75 Acre Boutique Community", desc: "Only 184 families across two blocks" },
    { title: "Two Distinct Blocks", desc: "Block A 13 floors · Block B 17 floors" },
    { title: "Two Cellar Parking Levels", desc: "Ample resident and visitor parking" },
    { title: "15,000+ Sft Clubhouse", desc: "Full-scale amenity block for 184 homes" },
    { title: "Nizampet Road Frontage", desc: "Direct access to the arterial corridor" },
    { title: "2.5 BHK Format", desc: "Rare configuration ideal for work-from-home" },
    { title: "Vaastu-Compliant Plans", desc: "East, north and west facing choices" },
    { title: "Best Amenity-To-Unit Ratio", desc: "Highest shared space per family in the belt" },
    { title: "Established Neighbourhood", desc: "Schools, hospitals and retail already in place" },
    { title: "Strong Resale Corridor", desc: "Bachupally has deep secondary market demand" },
    { title: "Loan & One-Time Options", desc: "Transparent dual pricing structure" },
  ],
  units_: [
    { type: "2.5 BHK", size: "1750 – 1790 Sft", bathrooms: "2 Bathrooms + Study", note: "Two bedrooms plus a flexible study or nursery" },
    { type: "3 BHK", size: "1890 – 2300 Sft", bathrooms: "3 Bathrooms", note: "Classic three-bedroom plan with pooja and utility" },
    { type: "3 BHK Grand", size: "2300 – 2890 Sft", bathrooms: "3 Bathrooms + Powder", note: "High-floor Block B residences with wide skyline balconies" },
  ],
  overview: [
    "Sanvi Kowsalya Manidweepa Shikaram is a 1.75-acre boutique gated community on Nizampet Road in Bachupally, planned as two architecturally distinct blocks that together hold just 184 residences. Block A rises as 2 Cellars + Stilt + 13 floors, while Block B goes higher at 2 Cellars + 17 floors, giving the skyline a deliberate stepped profile and giving upper-floor buyers uninterrupted views across the Bachupally green belt.",
    "The configuration mix is what sets this project apart in its micro-market. Alongside conventional 3 BHK homes of 1890 to 2890 sft, the developer offers a 2.5 BHK format of 1750 to 1790 sft — two full bedrooms plus a flexible half room that works as a home office, nursery, guest room or study. Since the pandemic permanently changed how Hyderabad's IT workforce uses space at home, this format has become one of the fastest-moving inventory types in the city.",
    "Two full cellar levels handle parking for both blocks, so ground and stilt levels are given back to landscape, drop-off courts and the arrival plaza. The 15,000+ sft clubhouse serves only 184 families, which produces an amenity-per-household ratio higher than almost any competing project on Nizampet Road.",
    "Pricing follows the same transparent two-track structure used across Sanvi communities: ₹6,X99 per sft on the loan option and ₹5,X99 per sft on one-time payment, with ₹20 per sft floor rise from the sixth floor and amenity charges of ₹8 lakhs covering one car parking space.",
  ],
  whyChoose: [
    { title: "The 2.5 BHK Advantage", desc: "A genuinely useful half room at a price well below the next 3 BHK slab — the most efficient rupee-per-usable-space buy in Bachupally." },
    { title: "Only 184 Families", desc: "Boutique scale means quieter common areas, faster lifts and a residents' association small enough to actually function." },
    { title: "17-Floor Block B Views", desc: "The taller block delivers long, unobstructed views that mid-rise Bachupally stock simply cannot offer." },
    { title: "Nizampet Road Connectivity", desc: "Direct arterial access to Kukatpally, Miyapur Metro, JNTU and the ORR, without navigating internal colony roads." },
    { title: "Mature Social Infrastructure", desc: "Schools, hospitals, supermarkets and restaurants are already operational within a two to four kilometre radius." },
    { title: "Two Cellars Of Parking", desc: "Parking stress — the single biggest complaint in older Bachupally buildings — is designed out from day one." },
  ],
  amenityGroups: [
    { title: "Clubhouse & Fitness", items: ["Air-conditioned gymnasium", "Swimming pool with deck", "Yoga and meditation room", "Zumba and aerobics studio", "Steam and sauna", "Indoor badminton court", "Table tennis", "Snooker and billiards"] },
    { title: "Social & Work", items: ["Banquet and party hall", "Business centre", "Co-working lounge", "Mini theatre", "Library", "Cards and board games room", "Guest suites", "Rooftop lounge"] },
    { title: "Family & Kids", items: ["Kids' play zone", "Creche and daycare", "Toddler splash pool", "Homework and tuition room", "Amphitheatre", "Sand pit", "Cycling loop", "Senior citizens' sit-out"] },
    { title: "Outdoor & Landscape", items: ["Central landscaped court", "Jogging and walking track", "Open-air gym", "Half basketball court", "Cricket practice net", "Herb and butterfly garden", "Pet-friendly lawn", "Reflexology path"] },
    { title: "Safety & Utility", items: ["24x7 manned gated security", "CCTV across common areas", "Video door phone", "Fire detection and sprinkler system", "100% common-area power backup", "Rainwater harvesting", "Sewage treatment plant", "EV charging points"] },
  ],
  clubhouseCopy: [
    "Manidweepa Shikaram places its 15,000+ sft clubhouse between the two blocks so that residents of Block A and Block B reach it in the same short walk across the landscaped court.",
    "Programming is split by energy level. The lower floor holds the pool, gymnasium and aerobics studio along with changing rooms, steam and sauna. Above it sit the indoor games — badminton, table tennis, snooker and a cards room — plus a business centre and co-working lounge that has become essential for hybrid-working residents.",
    "The top of the club opens into a banquet hall and rooftop lounge used for festivals, birthdays and community events, with guest suites adjacent for visiting family. Serving just 184 homes, the club rarely runs at capacity, which is a meaningful quality-of-life difference from the 600-plus unit projects nearby.",
  ],
  specifications: [
    { head: "Structure", body: "RCC framed structure with shear walls for the 17-floor Block B, designed to seismic Zone II standards, over two full cellar parking levels." },
    { head: "Flooring", body: "Large-format double-charged vitrified tiles in all living areas and bedrooms; anti-skid tiles in balconies, bathrooms and utility areas; granite in staircases and lobbies." },
    { head: "Kitchen", body: "Polished granite counter with stainless steel sink, glazed tile dado, provision for chimney, hob, water purifier and dishwasher point in the utility." },
    { head: "Bathrooms", body: "Premium branded CP fittings and sanitaryware, wall-hung EWC with concealed flush tanks, glass shower partition provision in master bathrooms." },
    { head: "Doors & Windows", body: "Designer teak-finish main door, engineered internal flush doors with laminate finish, UPVC or powder-coated aluminium glazed windows." },
    { head: "Electrical", body: "Concealed copper wiring with modular switches, split AC points in every bedroom and living, DTH and internet conduits, 100% DG backup for common services." },
    { head: "Painting", body: "Two coats of premium emulsion over putty internally; textured weatherproof exterior finish designed for a low-maintenance facade." },
    { head: "Lifts & Security", body: "High-speed passenger lifts plus service lift in each block, video door phone, boom barrier at entry, CCTV coverage of cellars, lobbies and podium." },
  ],
  floorPlans: [
    { label: "2.5 BHK — 1750 Sft", desc: "Two bedrooms with attached baths plus a flexible half room usable as a study or nursery." },
    { label: "2.5 BHK — 1790 Sft", desc: "Slightly wider variant with an extended living room and a larger utility balcony." },
    { label: "3 BHK — 1890 Sft", desc: "Efficient three-bedroom plan with pooja space, three bathrooms and a dedicated dining zone." },
    { label: "3 BHK — 2300 Sft", desc: "Block B plan with all-ensuite bedrooms, a family lounge and a wide skyline balcony." },
    { label: "3 BHK — 2890 Sft", desc: "Signature high-floor residence with powder room, maid's room provision and dual-aspect balconies." },
  ],
  connectivity: [
    { name: "Nizampet Road", distance: "Frontage — 0 km" },
    { name: "Bachupally Circle", distance: "Approx. 4 minutes" },
    { name: "JNTU Hyderabad", distance: "Approx. 15 minutes" },
    { name: "Miyapur Metro Station", distance: "Approx. 18 minutes" },
    { name: "KPHB Colony", distance: "Approx. 18 minutes" },
    { name: "ORR Exit 4 / 4A", distance: "Approx. 10 minutes" },
    { name: "HITEC City", distance: "Approx. 30 minutes" },
    { name: "Rajiv Gandhi International Airport", distance: "Approx. 65 minutes via ORR" },
  ],
  nearby: [
    { category: "Schools", items: [{ name: "Sancta Maria International School", distance: "3 km" }, { name: "Vikas The Concept School", distance: "2 km" }, { name: "Delhi Public School, Nacharam Road", distance: "9 km" }, { name: "Narayana e-Techno School", distance: "2 km" }] },
    { category: "Hospitals", items: [{ name: "Pranaam Hospitals", distance: "4 km" }, { name: "Sri Sri Holistic Hospital", distance: "5 km" }, { name: "Aster Prime, Ameerpet", distance: "16 km" }, { name: "Remedy Hospitals, KPHB", distance: "9 km" }] },
    { category: "IT Parks & Workplaces", items: [{ name: "HITEC City", distance: "18 km" }, { name: "Gachibowli", distance: "21 km" }, { name: "Q City / Nanakramguda", distance: "23 km" }, { name: "Genome Valley", distance: "22 km" }] },
    { category: "Shopping & Leisure", items: [{ name: "Sarath City Capital Mall", distance: "11 km" }, { name: "Manjeera Trinity Mall", distance: "10 km" }, { name: "Forum Sujana Mall", distance: "12 km" }, { name: "Local retail on Nizampet Road", distance: "1 km" }] },
  ],
  investment: [
    "Bachupally is one of the few Hyderabad micro-markets that has delivered steady, low-volatility appreciation across multiple cycles. Its strength is not a single trigger but a stack of them: proximity to the JNTU-Kukatpally education cluster, the pharma and life-sciences employment base, the ORR interchange, and a mature retail spine along Nizampet Road.",
    "Supply on Nizampet Road is now constrained. Most remaining parcels are small, which means large 5 and 10-acre townships are unlikely here — and boutique projects like Manidweepa Shikaram, with only 184 units, carry scarcity value in the resale market.",
    "The 2.5 BHK configuration deserves specific attention from investors. It rents to double-income couples and small families at close to 3 BHK yields while carrying a lower acquisition price, which improves gross rental return relative to the standard configuration mix.",
    "Buyers should also weigh the two-cellar parking design. In Bachupally's older building stock, inadequate parking is a documented drag on resale price; projects that solved for it at design stage consistently command a premium in secondary transactions.",
  ],
  aboutProject: [
    "Manidweepa Shikaram is best understood as a boutique alternative to the mass-scale townships that dominate Hyderabad's north-west. The trade-off it offers is explicit: you give up the 5-acre central park, and in exchange you get a shorter lift queue, a clubhouse that is never crowded, a lower monthly maintenance base and an association that can make decisions.",
    "Architecturally, the decision to build two blocks of different heights on a compact 1.75-acre site is what makes the density work. Block B's 17 floors free up ground-level open space that a uniform mid-rise layout would have consumed, and the taller block's upper floors gain views that are increasingly rare in this part of the city.",
    "If you are comparing this project against other Nizampet Road options, ask three questions: how many families share the clubhouse, how many parking bays exist per unit, and how much of the saleable area is actually usable. Manidweepa Shikaram was designed with those three answers in mind.",
    "Speak to a Naani Projects advisor for live availability by block, floor and facing, a full cost sheet including floor rise and premium charges, and a site visit at your convenience.",
  ],
  faqs: [
    { q: "Where is Sanvi Kowsalya Manidweepa Shikaram located?", a: "The project is located on Nizampet Road in Bachupally, north-west Hyderabad, with direct arterial connectivity to Kukatpally, JNTU, Miyapur Metro and the Outer Ring Road." },
    { q: "What configurations does the project offer?", a: "It offers premium 2.5 BHK apartments of 1750 to 1790 sft and 3 BHK apartments from 1890 sft up to 2890 sft." },
    { q: "What exactly is a 2.5 BHK?", a: "A 2.5 BHK has two full bedrooms with attached bathrooms plus a smaller flexible room that can be used as a home office, study, nursery or guest room." },
    { q: "What is the price at Manidweepa Shikaram?", a: "The loan option is priced at ₹6,X99 per sft and the one-time payment option at ₹5,X99 per sft, with ₹20 per sft floor rise applicable from the sixth floor onwards. Request the current price sheet for the exact rate." },
    { q: "What are the amenity charges?", a: "Amenity charges are ₹8 lakhs and include one car parking space. East and corner facing premiums are additional and are shown clearly in the cost sheet." },
    { q: "How many blocks, floors and units are there?", a: "There are two blocks — Block A with 2 Cellars + Stilt + 13 floors and Block B with 2 Cellars + 17 floors — totalling 184 units on a 1.75-acre site." },
    { q: "How big is the clubhouse?", a: "The clubhouse exceeds 15,000 sft and includes a swimming pool, gym, indoor games, business centre, mini theatre, banquet hall, guest suites and kids' zones." },
    { q: "Is Manidweepa Shikaram RERA registered?", a: "The RERA registration details are provided to buyers on request. Our team shares the current approval documentation before any booking amount is collected." },
    { q: "Is the project approved for home loans?", a: "Yes, leading banks and housing finance companies fund the project. The loan-linked price option exists specifically for financed purchases, and we assist with the full sanction process." },
    { q: "How can I get the brochure or book a site visit?", a: "Use the Download Brochure or Schedule Site Visit button on this page, enter your name and mobile number, and a Naani Projects advisor will share the brochure and confirm your visit slot." },
  ],
  keywords: [
    "Sanvi Kowsalya Manidweepa Shikaram", "Sanvi Kowsalya Manidweepa Shikaram Bachupally", "Manidweepa Shikaram price", "Manidweepa Shikaram brochure", "Manidweepa Shikaram floor plan", "Manidweepa Shikaram amenities", "Manidweepa Shikaram location", "Manidweepa Shikaram reviews", "Manidweepa Shikaram possession date", "Manidweepa Shikaram RERA number", "Manidweepa Shikaram price list", "Manidweepa Shikaram cost sheet", "Book site visit for Manidweepa Shikaram", "Download Manidweepa Shikaram brochure",
    "2.5 BHK flats for sale in Bachupally", "3 BHK flats for sale in Bachupally", "2 BHK flats for sale in Bachupally", "Luxury apartments in Bachupally", "Luxury flats in Bachupally", "Premium apartments in Bachupally", "Ready to move flats in Bachupally", "Under construction flats in Bachupally", "New launch apartments in Bachupally", "Apartments near Bachupally", "Flats near Nizampet Road", "Residential projects in Bachupally", "Best apartments in Bachupally", "Best gated community in Bachupally", "Top residential projects in Bachupally", "Premium gated community in Bachupally", "Homes in Bachupally", "Gated community apartments in Bachupally", "Buy flat in Bachupally", "Buy apartment in Bachupally", "Invest in Bachupally", "Property for sale in Bachupally", "Apartment for sale in Bachupally", "Flat for sale in Bachupally", "Luxury property in Bachupally", "New apartments in Bachupally", "Best property in Bachupally", "Residential property in Bachupally", "HMDA approved apartments in Bachupally", "RERA approved apartments in Bachupally", "Apartments on Nizampet Road",
    "Apartments by Sanvi Infra Projects", "Projects by Sanvi Infra Projects", "New projects by Sanvi Infra Projects", "Upcoming projects by Sanvi Infra Projects", "Luxury projects by Sanvi Infra Projects", "Premium homes by Sanvi Infra Projects", "Buy property from Sanvi Infra Projects", "Top builders in Bachupally",
    "2.5 BHK apartments in Bachupally", "3 BHK apartments in Bachupally", "2.5 BHK homes in Hyderabad", "Investment property in Bachupally", "Best real estate investment in Bachupally", "Property near IT hub in Bachupally", "Apartments near Miyapur metro", "Family apartments in Bachupally", "High rise apartments in Bachupally", "Upcoming apartments in Bachupally", "Best apartment project in Bachupally", "Apartments near JNTU Hyderabad", "Flats near Kukatpally",
  ],
  relatedSearches: [
    "Apartments in Bachupally", "2.5 BHK apartments in Hyderabad", "Projects on Nizampet Road", "Sanvi Infra Projects Hyderabad", "Flats near JNTU", "Luxury apartments in Hyderabad",
  ],
};

/* -------------------------------------------------------------------------- */
/* 3. SANVI KOWSALYA AVANI — Kristareddypet                                    */
/* -------------------------------------------------------------------------- */

const AVANI: SanviProject = {
  key: "avani",
  name: "Sanvi Kowsalya Avani",
  slug: "/projects/sanvi-kowsalya-avani-kristareddypet",
  location: "Kristareddypet",
  locationFull: "Near ORR Exit 4, Kristareddypet, Hyderabad",
  locationSlug: "kristareddypet",
  propertyType: "Apartment",
  configuration: "2, 2.5 & 3 BHK",
  bhkList: [2, 3],
  projectArea: "3.25 Acres",
  structure: "2 Cellars + 2 Podiums + 14 Floors",
  towers: "1 Tower",
  units: "420 Premium Units",
  clubhouse: "21,000+ Sft Grand Clubhouse",
  possession: "On Request",
  rera: "RERA Number — Application in Process (available on request)",
  status: "Under Construction",
  loanPrice: "₹5,X99 / Sft (Loan Option)",
  oneTimePrice: "₹4,X99 / Sft (One Time Payment)",
  floorRise: "₹20 per Sft from the 6th floor onwards",
  amenitiesCharges: "₹6 Lakhs (includes 1 car parking)",
  priceNote: "East and corner charges applicable. Exact per-sft rate is shared on request.",
  heroTagline: "2, 2.5 & 3 BHK luxury homes with a 21,000+ sft grand clubhouse near ORR Exit 4",
  seoTitle: "Sanvi Kowsalya Avani Kristareddypet | 2, 2.5 & 3 BHK",
  metaDescription:
    "Sanvi Kowsalya Avani, Kristareddypet: 2, 2.5 & 3 BHK apartments on 3.25 acres, 420 units, 21,000+ sft clubhouse near ORR Exit 4. Get price & brochure today.",
  ogImage: `${SITE}/og/naani-projects-og.png`,
  mapEmbed: "https://www.google.com/maps?q=Kristareddypet%2C%20Hyderabad&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Kristareddypet+Hyderabad",
  geo: { lat: 17.5285, lng: 78.3524 },
  primaryKeyword: "Sanvi Kowsalya Avani Kristareddypet",
  highlights: [
    { title: "2, 2.5 & 3 BHK Homes", desc: "1380 – 3150 sft across three configurations" },
    { title: "3.25 Acre Master Plan", desc: "The largest Sanvi community in the corridor" },
    { title: "21,000+ Sft Grand Clubhouse", desc: "Flagship amenity block of the portfolio" },
    { title: "2 Cellars + 2 Podiums + 14 Floors", desc: "Four levels of parking and podium deck" },
    { title: "420 Premium Units", desc: "Scale that keeps maintenance costs efficient" },
    { title: "ORR Exit 4 Proximity", desc: "Fast Outer Ring Road access in minutes" },
    { title: "Widest Configuration Choice", desc: "Entry 2 BHK to 3150 sft signature homes" },
    { title: "Podium-Level Green Deck", desc: "Two full podium levels of landscaping" },
    { title: "100% Vaastu Compliance", desc: "East, west and north facing options" },
    { title: "Dual Pricing Structure", desc: "Loan-linked and one-time payment rates" },
    { title: "Included Car Parking", desc: "One covered bay within amenity charges" },
    { title: "High Rental Absorption", desc: "Deep tenant demand from the IT and pharma belt" },
  ],
  units_: [
    { type: "2 BHK", size: "1380 – 1490 Sft", bathrooms: "2 Bathrooms", note: "Efficient entry-level luxury with utility balcony" },
    { type: "2.5 BHK", size: "1540 Sft", bathrooms: "2 Bathrooms + Study", note: "Two bedrooms plus a flexible half room" },
    { type: "3 BHK", size: "2070 – 3150 Sft", bathrooms: "3 Bathrooms + Powder", note: "Spacious plans up to signature corner residences" },
  ],
  overview: [
    "Sanvi Kowsalya Avani is the largest and most ambitious community in the Sanvi Infra Projects portfolio — a 3.25-acre luxury gated development near ORR Exit 4 in Kristareddypet, planned as 2 Cellars + 2 Podiums + 14 floors carrying 420 premium residences and anchored by a 21,000+ sft grand clubhouse.",
    "What distinguishes Avani is configuration breadth. Very few projects in this corridor let a first-time buyer enter at a 1380 sft 2 BHK while also offering 3150 sft signature three-bedroom residences within the same address. That range creates a genuinely mixed resident community and, importantly for investors, gives an exit route to several different buyer segments at resale.",
    "The four-level vertical stack — two cellars for parking and two podiums for landscape and amenities — means residents never share space with moving vehicles above cellar level. The podium decks carry the jogging track, children's play zones, seating courts, open gym and landscaped gardens, while the grand clubhouse sits directly on the deck for step-out access.",
    "Pricing mirrors the Sanvi standard: ₹5,X99 per sft on the loan option, ₹4,X99 per sft on one-time payment, ₹20 per sft floor rise from the sixth floor, and ₹6 lakhs in amenity charges inclusive of one covered car parking bay. East and corner residences carry a disclosed premium.",
  ],
  whyChoose: [
    { title: "Flagship 21,000+ Sft Clubhouse", desc: "The largest amenity block Sanvi has built — closer in programme to a city club than a society facility." },
    { title: "Three Configuration Choices", desc: "2 BHK, 2.5 BHK and 3 BHK under one roof, so families can upgrade within the same community over time." },
    { title: "Four Parking And Podium Levels", desc: "Two cellars plus two podiums remove parking scarcity and create a completely vehicle-free living deck." },
    { title: "ORR Exit 4 Access", desc: "Direct Outer Ring Road entry shortens the commute to Gachibowli, the Financial District and the airport." },
    { title: "Scale Without Crowding", desc: "420 homes on 3.25 acres delivers township-grade amenity economics while retaining a single, well-managed tower." },
    { title: "Best Value Per Square Foot", desc: "Entry pricing in the ₹4,X99 to ₹5,X99 band buys amenities normally attached to considerably higher rates in west Hyderabad." },
  ],
  amenityGroups: [
    { title: "Grand Clubhouse", items: ["Double-height entrance lobby", "Olympic-style swimming pool", "Air-conditioned gymnasium", "Spa and salon", "Steam, sauna and jacuzzi", "Multipurpose banquet hall", "Mini theatre", "Rooftop lounge"] },
    { title: "Sports & Fitness", items: ["Indoor badminton court", "Squash court", "Table tennis", "Snooker and billiards", "Half basketball court", "Cricket practice net", "Open-air gym", "Jogging and cycling track"] },
    { title: "Family & Kids", items: ["Kids' adventure play zone", "Toddler splash pool", "Creche and daycare", "Homework and tuition room", "Indoor kids' activity room", "Amphitheatre", "Sand pit and swings", "Senior citizens' court"] },
    { title: "Work & Social", items: ["Co-working business centre", "Conference and meeting room", "Library and reading room", "Cards and board games room", "Guest rooms", "Cafeteria and juice bar", "Convenience store", "Community celebration lawn"] },
    { title: "Landscape & Sustainability", items: ["Two podium garden levels", "Reflexology walkway", "Butterfly and herb garden", "Pet park", "Rainwater harvesting", "Sewage treatment plant", "Organic waste converter", "Solar-assisted common lighting"] },
    { title: "Safety & Services", items: ["24x7 gated security with boom barriers", "CCTV across cellars, podiums and lobbies", "Video door phone in every home", "Fire detection and sprinkler system", "100% common-area DG backup", "Passenger and service lifts", "Visitor management system", "EV charging provision"] },
  ],
  clubhouseCopy: [
    "At over 21,000 sft, the grand clubhouse at Kowsalya Avani is the single largest amenity investment Sanvi Infra Projects has made, and it is programmed across three levels rather than crammed into one floor plate.",
    "The lower level holds the wet and active zones — swimming pool with a separate toddler pool, gymnasium, spa and salon, and steam, sauna and jacuzzi facilities with full changing rooms. The middle level is the sports and games floor with badminton, squash, table tennis, snooker and an indoor kids' activity room.",
    "The upper level is the community and work floor: banquet hall opening to the celebration lawn, mini theatre, library, business centre with a conference room, cafeteria and guest rooms. A rooftop lounge caps the building with skyline views over the ORR corridor.",
    "For a 420-home community, this level of facility is what turns an apartment purchase into a lifestyle decision — and it is the amenity block that resale buyers will be told about first.",
  ],
  specifications: [
    { head: "Structure", body: "RCC framed structure with shear wall support designed for seismic Zone II, built over two cellars and two podium levels." },
    { head: "Flooring", body: "Premium double-charged vitrified tiles in living, dining and bedrooms; anti-skid ceramic tiles in bathrooms, balconies and utility; granite in lift lobbies and staircases." },
    { head: "Kitchen", body: "Granite counter with stainless steel sink, glazed tile dado above the platform, provision for chimney, hob, water purifier, dishwasher and modular cabinetry." },
    { head: "Bathrooms", body: "Branded CP fittings and sanitaryware, wall-hung EWC with concealed cistern, single-lever diverters, shower partition provision, glazed tiles to ceiling height." },
    { head: "Doors & Windows", body: "Teak-finish designer main door with security hardware, laminated engineered internal doors, UPVC glazed windows with mosquito mesh provision." },
    { head: "Electrical", body: "Concealed FRLS copper wiring, modular switches, AC points in all bedrooms and living, DTH and broadband conduits, generator backup for lifts, pumps and common lighting." },
    { head: "Painting", body: "Premium acrylic emulsion over two coats of putty internally; weatherproof textured exterior paint over the full facade." },
    { head: "Lifts & Security", body: "High-speed automatic lifts with ARD, dedicated service lift, video door phone, CCTV surveillance, boom-barrier controlled single entry and visitor management." },
  ],
  floorPlans: [
    { label: "2 BHK — 1380 Sft", desc: "Compact, highly efficient two-bedroom layout with utility and a full-width living balcony." },
    { label: "2 BHK — 1490 Sft", desc: "Larger two-bedroom plan with a wider master bedroom and separate dining space." },
    { label: "2.5 BHK — 1540 Sft", desc: "Two bedrooms plus a flexible half room ideal as a home office, study or nursery." },
    { label: "3 BHK — 2070 Sft", desc: "Three-bedroom plan with pooja space, three bathrooms, utility and a family lounge." },
    { label: "3 BHK — 2600 Sft", desc: "Premium plan with all-ensuite bedrooms, powder room and dual balconies." },
    { label: "3 BHK — 3150 Sft", desc: "Signature corner residence with three-side openings, maid's room provision and an entertainment deck." },
  ],
  connectivity: [
    { name: "ORR Exit 4", distance: "Approx. 4 minutes" },
    { name: "Kristareddypet Junction", distance: "Approx. 2 minutes" },
    { name: "Bachupally Main Road", distance: "Approx. 10 minutes" },
    { name: "Miyapur Metro Station", distance: "Approx. 20 minutes" },
    { name: "JNTU Hyderabad", distance: "Approx. 20 minutes" },
    { name: "HITEC City", distance: "Approx. 28 minutes via ORR" },
    { name: "Financial District", distance: "Approx. 35 minutes via ORR" },
    { name: "Rajiv Gandhi International Airport", distance: "Approx. 60 minutes via ORR" },
  ],
  nearby: [
    { category: "Schools", items: [{ name: "Sancta Maria International School", distance: "5 km" }, { name: "Silver Oaks International", distance: "7 km" }, { name: "Global Edge School", distance: "8 km" }, { name: "Vikas The Concept School", distance: "6 km" }] },
    { category: "Hospitals", items: [{ name: "Pranaam Hospitals, Nizampet", distance: "8 km" }, { name: "Sri Sri Holistic Hospital", distance: "9 km" }, { name: "Malla Reddy Narayana Hospital", distance: "13 km" }, { name: "Remedy Hospitals, KPHB", distance: "12 km" }] },
    { category: "IT Parks & Workplaces", items: [{ name: "HITEC City", distance: "20 km" }, { name: "Gachibowli IT Corridor", distance: "23 km" }, { name: "Financial District", distance: "26 km" }, { name: "Genome Valley", distance: "21 km" }] },
    { category: "Shopping & Leisure", items: [{ name: "Sarath City Capital Mall", distance: "13 km" }, { name: "Forum Sujana Mall", distance: "14 km" }, { name: "Manjeera Mall, KPHB", distance: "12 km" }, { name: "D-Mart Bachupally", distance: "7 km" }] },
  ],
  investment: [
    "Kristareddypet sits directly on the growth line created by ORR Exit 4, and that single piece of infrastructure has done more for land values here than any other factor. Exit 4 collapses the drive to Gachibowli and the Financial District into a single expressway run, which is why developers have concentrated launches within a few kilometres of the interchange.",
    "Because the locality is earlier in its development curve than Bachupally or Nizampet, base pricing is still in the ₹4,X99 to ₹5,X99 band. Investors buying at this stage capture the repricing that typically follows the first wave of handovers, when completed inventory and functioning clubhouses reset the benchmark for the micro-market.",
    "Avani's configuration spread is also an exit advantage. A 1380 sft 2 BHK appeals to first-time buyers and investors; the 1540 sft 2.5 BHK targets hybrid-working couples; and the 2070 to 3150 sft three-bedroom homes serve upgraders from Kukatpally and Miyapur. Three buyer pools means shorter time on market at resale.",
    "Finally, the 21,000+ sft clubhouse is a durable differentiator. Amenity quality is one of the few project attributes that cannot be replicated by a neighbouring launch after the fact, and it consistently supports both rental rate and resale premium over the long term.",
  ],
  aboutProject: [
    "Sanvi Kowsalya Avani is designed for buyers who want township-grade facilities without moving far out of the established north-west Hyderabad belt. The 3.25-acre site is large enough to justify the grand clubhouse, the double podium and a full sports programme, yet compact enough that everything remains within a two-minute walk of any lift core.",
    "The planning logic is consistent throughout. Vehicles stop at cellar level. Podiums carry landscape and play. The tower rises 14 floors above that with flexible floor plates that let the developer offer 2, 2.5 and 3 BHK homes on the same slab. Vaastu compliance is maintained across facings, and corner units are positioned to maximise cross-ventilation.",
    "For families, the practical draw is everyday convenience: schools within five to eight kilometres, hospitals within ten, retail on the Bachupally and Nizampet spine, and an ORR entry that removes the usual city-traffic penalty from the office commute.",
    "Naani Projects can share live availability by floor and facing, prepare a complete cost sheet with floor rise and premium charges, arrange bank loan pre-approval, and schedule a guided site visit. Request the price sheet or download the brochure below to begin.",
  ],
  faqs: [
    { q: "Where is Sanvi Kowsalya Avani located?", a: "The project is in Kristareddypet, near ORR Exit 4 in north-west Hyderabad, a short drive from Bachupally, Nizampet and the Miyapur-Kukatpally belt." },
    { q: "What configurations are offered at Kowsalya Avani?", a: "Avani offers 2 BHK apartments of 1380 to 1490 sft, a 2.5 BHK of 1540 sft, and 3 BHK apartments from 2070 sft up to 3150 sft." },
    { q: "How big is the project and how many units are there?", a: "The community spans 3.25 acres with a single tower of 2 Cellars + 2 Podiums + 14 floors, holding 420 premium units." },
    { q: "What is the size of the clubhouse?", a: "Avani has a grand clubhouse of over 21,000 sft spread across multiple levels, with a swimming pool, gym, spa, indoor sports, mini theatre, banquet hall, business centre and kids' zones." },
    { q: "What is the price per square foot at Kowsalya Avani?", a: "Pricing is ₹5,X99 per sft on the loan option and ₹4,X99 per sft on one-time payment, with ₹20 per sft floor rise from the sixth floor onwards. Request the price sheet for the exact current rate." },
    { q: "What are the amenity and parking charges?", a: "Amenity charges are ₹6 lakhs and include one covered car parking bay. East and corner facing premiums apply and are stated separately in the cost sheet." },
    { q: "Is Kowsalya Avani RERA approved?", a: "RERA registration details are shared with buyers on request, along with the approval documentation, before any booking amount is collected." },
    { q: "How far is the project from Gachibowli and HITEC City?", a: "Via ORR Exit 4, HITEC City is roughly 28 minutes and the Financial District about 35 minutes, depending on traffic conditions." },
    { q: "Are home loans available for Kowsalya Avani?", a: "Yes. The project is funded by leading banks and housing finance companies, and the loan-linked price option is structured for financed purchases. We assist with the entire loan process." },
    { q: "How do I get the brochure, cost sheet or a site visit?", a: "Click Download Brochure, Request Price or Schedule Site Visit on this page and share your name and mobile number — a Naani Projects advisor will respond immediately with the documents and confirm your visit." },
  ],
  keywords: [
    "Sanvi Kowsalya Avani", "Sanvi Kowsalya Avani Kristareddypet", "Kowsalya Avani price", "Kowsalya Avani brochure", "Kowsalya Avani floor plan", "Kowsalya Avani master plan", "Kowsalya Avani amenities", "Kowsalya Avani location", "Kowsalya Avani reviews", "Kowsalya Avani possession date", "Kowsalya Avani RERA number", "Kowsalya Avani price list", "Kowsalya Avani cost sheet", "Book site visit for Kowsalya Avani", "Download Kowsalya Avani brochure",
    "2 BHK flats for sale in Kristareddypet", "2.5 BHK flats for sale in Kristareddypet", "3 BHK flats for sale in Kristareddypet", "Luxury apartments in Kristareddypet", "Luxury flats in Kristareddypet", "Premium apartments in Kristareddypet", "Ready to move flats in Kristareddypet", "Under construction flats in Kristareddypet", "New launch apartments in Kristareddypet", "Apartments near Kristareddypet", "Flats near Kristareddypet", "Residential projects in Kristareddypet", "Best apartments in Kristareddypet", "Best gated community in Kristareddypet", "Top residential projects in Kristareddypet", "Affordable flats in Kristareddypet", "Premium gated community in Kristareddypet", "Homes in Kristareddypet", "Gated community apartments in Kristareddypet", "Buy flat in Kristareddypet", "Buy apartment in Kristareddypet", "Invest in Kristareddypet", "Property for sale in Kristareddypet", "Apartment for sale in Kristareddypet", "Flat for sale in Kristareddypet", "Luxury property in Kristareddypet", "New apartments in Kristareddypet", "Best property in Kristareddypet", "Residential property in Kristareddypet", "Apartments near ORR Exit 4", "HMDA approved apartments in Kristareddypet", "RERA approved apartments in Kristareddypet",
    "Apartments by Sanvi Infra Projects", "Projects by Sanvi Infra Projects", "New projects by Sanvi Infra Projects", "Upcoming projects by Sanvi Infra Projects", "Luxury projects by Sanvi Infra Projects", "Premium homes by Sanvi Infra Projects", "Buy property from Sanvi Infra Projects", "Top builders in Kristareddypet",
    "2 BHK apartments in Kristareddypet", "2.5 BHK apartments in Kristareddypet", "3 BHK apartments in Kristareddypet", "Investment property in Kristareddypet", "Best real estate investment in Kristareddypet", "Property near IT hub in Kristareddypet", "Family apartments in Kristareddypet", "High rise apartments in Kristareddypet", "Upcoming apartments in Kristareddypet", "Best apartment project in Kristareddypet", "Apartments with big clubhouse in Hyderabad", "Gated community near ORR Exit 4",
  ],
  relatedSearches: [
    "Apartments in Kristareddypet", "Projects near ORR Exit 4", "3 BHK apartments in Hyderabad", "Sanvi Infra Projects Hyderabad", "Gated communities near ORR", "New launch apartments in Hyderabad",
  ],
};

export const SANVI_PROJECTS: SanviProject[] = [VASUDHA, SHIKARAM, AVANI];

export const getSanviProject = (key: string) =>
  SANVI_PROJECTS.find((p) => p.key === key)!;

export const otherSanviProjects = (key: string) =>
  SANVI_PROJECTS.filter((p) => p.key !== key);
