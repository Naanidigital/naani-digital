import { useNavigate } from "react-router-dom";
import LeadQualificationPopup from "@/components/LeadQualificationPopup";
import { LeadProfile, PageContext } from "@/lib/leadProfile";

export type TrumpPopupType =
  | "hero_site_visit"
  | "price_request"
  | "floor_plan_request"
  | "brochure_request"
  | "callback_request"
  | "whatsapp_click"
  | "amenity_request"
  | "location_request"
  | "exit_intent"
  | "scroll_popup";

interface TrumpTowersLeadPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  popupType: TrumpPopupType;
}

export const POPUP_CONFIGS: Record<
  TrumpPopupType,
  {
    title: string;
    subtitle?: string;
    ctaText: string;
    leadSource: string;
  }
> = {
  hero_site_visit: {
    title: "Plan Your Trump Towers Site Visit",
    subtitle: "Select your preferred date & time for a private guided site tour of Trump Towers Hyderabad.",
    ctaText: "Request Site Visit",
    leadSource: "hero_site_visit",
  },
  price_request: {
    title: "Get Trump Towers Price Details",
    subtitle: "Share your details to receive current inventory availability and configuration pricing details privately.",
    ctaText: "Get Price Details",
    leadSource: "price_request",
  },
  floor_plan_request: {
    title: "Get Trump Towers Floor Plans",
    subtitle: "Download high-resolution 3.5, 4, 4.5 & 6 BHK layout floor plans for Trump Towers Hyderabad.",
    ctaText: "Get Floor Plans",
    leadSource: "floor_plan_request",
  },
  brochure_request: {
    title: "Get Trump Towers Official Brochure",
    subtitle: "Receive the official e-brochure, residence specifications, and Trump Club overview on WhatsApp.",
    ctaText: "Get Brochure",
    leadSource: "brochure_request",
  },
  callback_request: {
    title: "Talk to a Trump Towers Property Advisor",
    subtitle: "Have questions about 65-storey towers, private elevators, or RERA record? Call 9705080909 or get an instant callback.",
    ctaText: "Request Callback",
    leadSource: "callback_request",
  },
  whatsapp_click: {
    title: "Connect via WhatsApp on 9705080909",
    subtitle: "Receive instant floor plans, project deck, and availability updates directly on WhatsApp.",
    ctaText: "Connect on WhatsApp",
    leadSource: "whatsapp_click",
  },
  amenity_request: {
    title: "Trump Club & Amenity Dossier",
    subtitle: "Get complete details on the three-level floating Trump Club, spa, infinity pool, and private lounges.",
    ctaText: "Get Trump Club Details",
    leadSource: "amenity_request",
  },
  location_request: {
    title: "Golden Mile Location & Access Map",
    subtitle: "Receive exact site location, Financial District access map, and ORR connectivity details.",
    ctaText: "Get Location Details",
    leadSource: "location_request",
  },
  exit_intent: {
    title: "Before You Go — Request Trump Towers Details",
    subtitle: "Get floor plans, availability updates, and project details from Naani Projects.",
    ctaText: "Get Project Details",
    leadSource: "exit_intent",
  },
  scroll_popup: {
    title: "Interested in Trump Towers Hyderabad?",
    subtitle: "Get floor plans, availability and project details from Naani Projects.",
    ctaText: "Get Details",
    leadSource: "scroll_popup",
  },
};

const TRUMP_CONTEXT: PageContext = {
  propertyName: "Trump Towers Hyderabad",
  projectName: "Trump Towers Hyderabad",
  builderName: "Ira The Edge Developers LLP",
  location: "Golden Mile, Kokapet, Hyderabad",
  propertyType: "Ultra-Luxury Branded Residential Development",
  pageUrl: "/projects/trump-towers-hyderabad-kokapet",
  sourcePage: "Naani Projects – Trump Towers Hyderabad",
};

const TrumpTowersLeadPopup = ({
  open,
  onOpenChange,
  popupType,
}: TrumpTowersLeadPopupProps) => {
  const navigate = useNavigate();
  const config = POPUP_CONFIGS[popupType] || POPUP_CONFIGS.price_request;

  const handleCaptured = (profile: LeadProfile) => {
    navigate("/thank-you", {
      state: {
        projectName: "Trump Towers Hyderabad",
        projectUrl: "/projects/trump-towers-hyderabad-kokapet",
        context: TRUMP_CONTEXT,
        profile,
        leadSource: config.leadSource,
      },
    });
  };

  return (
    <LeadQualificationPopup
      open={open}
      onOpenChange={onOpenChange}
      context={TRUMP_CONTEXT}
      leadSource={`Naani Projects – Trump Towers Hyderabad (${config.leadSource})`}
      titleOverride={config.title}
      subtitleOverride={config.subtitle}
      ctaTextOverride={config.ctaText}
      onCaptured={handleCaptured}
    />
  );
};

export default TrumpTowersLeadPopup;
