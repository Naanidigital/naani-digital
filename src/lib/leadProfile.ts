// Lead Qualification Profile - sessionStorage-backed buyer intent
// Captured once per session, then attached to every Call / WhatsApp / Brochure / Site Visit action.

export const LEAD_API_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby30gkREDd8MHYr_OAHgD9TNq-4sfUZ49b4apFQUn8Ta_9K5x2ugDfAaNeoQi-3OwtWmg/exec";

export const NAANI_PHONE = "+919705080909";
export const NAANI_WA = "919705080909";

export type LookingFor =
  | "2 BHK"
  | "2.5 BHK"
  | "3 BHK"
  | "3.5 BHK"
  | "4 BHK"
  | "Villa"
  | "Plot"
  | "Commercial";

export type BudgetRange =
  | "Under 50 Lakhs"
  | "50 Lakhs - 1 Cr"
  | "1 Cr - 2 Cr"
  | "2 Cr - 3 Cr"
  | "Above 3 Cr";

export type Purpose = "Self Use" | "Investment" | "Rental Income" | "Undecided";

export type Timeline =
  | "Immediately"
  | "Within 3 Months"
  | "Within 6 Months"
  | "Within 1 Year"
  | "Just Exploring";

export const LOOKING_FOR_OPTIONS: LookingFor[] = [
  "2 BHK",
  "2.5 BHK",
  "3 BHK",
  "3.5 BHK",
  "4 BHK",
  "Villa",
  "Plot",
  "Commercial",
];
export const BUDGET_OPTIONS: BudgetRange[] = [
  "Under 50 Lakhs",
  "50 Lakhs - 1 Cr",
  "1 Cr - 2 Cr",
  "2 Cr - 3 Cr",
  "Above 3 Cr",
];
export const PURPOSE_OPTIONS: Purpose[] = [
  "Self Use",
  "Investment",
  "Rental Income",
  "Undecided",
];
export const TIMELINE_OPTIONS: Timeline[] = [
  "Immediately",
  "Within 3 Months",
  "Within 6 Months",
  "Within 1 Year",
  "Just Exploring",
];

export interface LeadProfile {
  name: string;
  phone: string;
  email?: string;
  lookingFor: LookingFor;
  /** @deprecated Retained for backward compatibility; no longer collected in the popup. */
  budget?: BudgetRange;
  /** @deprecated Retained for backward compatibility; no longer collected in the popup. */
  purpose?: Purpose;
  /** @deprecated Retained for backward compatibility; no longer collected in the popup. */
  timeline?: Timeline;
  capturedAt: string;
}

const STORAGE_KEY = "naani_lead_profile_v1";

export const getLeadProfile = (): LeadProfile | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadProfile) : null;
  } catch {
    return null;
  }
};

export const saveLeadProfile = (profile: LeadProfile) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
};

export const clearLeadProfile = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

// ---------- Page context auto-detection ----------

export interface PageContext {
  propertyName: string;
  projectName: string;
  builderName: string;
  location: string;
  propertyType: string;
  pageUrl: string;
  sourcePage: string;
}

export const detectPageContext = (overrides: Partial<PageContext> = {}): PageContext => {
  const h1 = document.querySelector("h1")?.textContent?.trim() || "";
  const title = document.title || "";
  const ld = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  let projectName = "";
  let builderName = "";
  let location = "";
  let propertyType = "";
  if (ld?.textContent) {
    try {
      const data = JSON.parse(ld.textContent);
      const arr = Array.isArray(data) ? data : [data];
      for (const node of arr) {
        if (!projectName && typeof node?.name === "string") projectName = node.name;
        if (!builderName && typeof node?.brand?.name === "string") builderName = node.brand.name;
        if (!builderName && typeof node?.provider?.name === "string") builderName = node.provider.name;
        if (!location && typeof node?.address?.addressLocality === "string") location = node.address.addressLocality;
        if (!propertyType && typeof node?.["@type"] === "string" && /Residence|Apartment|House|Place/i.test(node["@type"]))
          propertyType = node["@type"];
      }
    } catch {
      // ignore
    }
  }
  const propertyName = h1 || title;
  return {
    propertyName,
    projectName: projectName || propertyName,
    builderName,
    location,
    propertyType,
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    sourcePage: typeof document !== "undefined" ? document.referrer : "",
    ...overrides,
  };
};

// ---------- Rich WhatsApp message ----------

export const buildWhatsAppMessage = (
  profile: LeadProfile | null,
  ctx: PageContext,
  intent?: string
): string => {
  const intentLabel = intent ? intent.toUpperCase() : "";
  const intentHeading = 
    intent === "brochure" ? "Requesting Digital Brochure & Pricing" :
    intent === "sitevisit" ? "Scheduling Site Visit Request" :
    intent === "knowmore" ? "Requesting Project Details & Floor Plans" :
    "Property Inquiry";

  if (!profile) {
    return `Hi Naani Digital, I'm interested in ${ctx.propertyName} (${ctx.location || 'Hyderabad'}). [${intentHeading}] Please share complete details.`;
  }
  const lines = [
    "Hi Naani Digital,",
    "",
    `I would like more information regarding ${ctx.propertyName} [${intentHeading}]:`,
    "",
    `Property: ${ctx.propertyName}`,
    `Project: ${ctx.projectName}`,
    ctx.location ? `Location: ${ctx.location}` : "",
    ctx.propertyType ? `Property Type: ${ctx.propertyType}` : `Property Type: ${profile.lookingFor}`,
    profile.budget ? `Budget Preference: ${profile.budget}` : "",
    "",
    "My Contact Details:",
    `Name: ${profile.name}`,
    `Mobile: ${profile.phone}`,
    profile.email ? `Email: ${profile.email}` : "",
    profile.purpose ? `Purpose: ${profile.purpose}` : "",
    profile.timeline ? `Purchase Timeline: ${profile.timeline}` : "",
    "",
    `Property Page: ${ctx.pageUrl}`,
    "",
    "Please connect with me and share complete details.",
  ].filter(Boolean);
  return lines.join("\n");
};

export const buildWhatsAppUrl = (profile: LeadProfile | null, ctx: PageContext, intent?: string) =>
  `https://wa.me/${NAANI_WA}?text=${encodeURIComponent(buildWhatsAppMessage(profile, ctx, intent))}`;

// ---------- UTM helpers ----------

const getUtmParams = () => {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  return {
    utmSource: sp.get("utm_source") || "",
    utmCampaign: sp.get("utm_campaign") || "",
    utmMedium: sp.get("utm_medium") || "",
    utmTerm: sp.get("utm_term") || "",
    utmContent: sp.get("utm_content") || "",
  };
};

// ---------- Google Sheet sync ----------

export interface LeadPayload {
  profile: LeadProfile;
  context: PageContext;
  leadSource: string;
}

export const sendLeadToSheet = async (payload: LeadPayload) => {
  const now = new Date();
  const utm = getUtmParams();
  const body = {
    // Legacy fields (kept for backward compatibility with existing Sheet)
    name: payload.profile.name,
    phone: payload.profile.phone,
    project: payload.context.projectName || payload.context.propertyName,
    page: payload.context.pageUrl,
    // Extended qualification fields
    date: now.toISOString().slice(0, 10),
    time: now.toTimeString().slice(0, 8),
    leadName: payload.profile.name,
    email: payload.profile.email || "",
    propertyName: payload.context.propertyName,
    projectName: payload.context.projectName,
    location: payload.context.location,
    propertyType: payload.context.propertyType || payload.profile.lookingFor,
    lookingFor: payload.profile.lookingFor,
    budgetRange: payload.profile.budget || "",
    purpose: payload.profile.purpose || "",
    timeline: payload.profile.timeline || "",
    pageUrl: payload.context.pageUrl,
    sourcePage: payload.context.sourcePage,
    leadSource: payload.leadSource,
    referrer: typeof document !== "undefined" ? document.referrer : "",
    ...utm,
  };
  try {
    await fetch(LEAD_API_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // silent — no-cors hides the response anyway
  }
};
