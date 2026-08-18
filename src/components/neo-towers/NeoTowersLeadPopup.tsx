import { useNavigate } from "react-router-dom";
import LeadQualificationPopup from "@/components/LeadQualificationPopup";
import { LeadProfile, PageContext } from "@/lib/leadProfile";

export type NeoPopupType =
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

interface NeoTowersLeadPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  popupType: NeoPopupType;
}

export const POPUP_CONFIGS: Record<
  NeoPopupType,
  {
    title: string;
    subtitle?: string;
    ctaText: string;
    leadSource: string;
  }
> = {
  hero_site_visit: {
    title: "Plan Your Neo Towers Visit",
    subtitle: "Select your preferred date & time. Our team will arrange a guided site visit.",
    ctaText: "Request Site Visit",
    leadSource: "hero_site_visit",
  },
  price_request: {
    title: "Get Neo Towers Price Details",
    subtitle: "Share your details and get the latest configuration-wise price and availability privately.",
    ctaText: "Get Price Details",
    leadSource: "price_request",
  },
  floor_plan_request: {
    title: "Get Neo Towers Floor Plans",
    subtitle: "Download high-resolution 3 & 4 BHK layout floor plans for Neo Towers.",
    ctaText: "Get Floor Plan",
    leadSource: "floor_plan_request",
  },
  brochure_request: {
    title: "Get the Neo Towers Brochure",
    subtitle: "Receive the official e-brochure, spec sheet, and skydeck feature list on WhatsApp/Email.",
    ctaText: "Get Brochure",
    leadSource: "brochure_request",
  },
  callback_request: {
    title: "Talk to a Neo Towers Property Expert",
    subtitle: "Have questions about towers, views, or RERA details? Call or get an instant expert callback.",
    ctaText: "Request Callback",
    leadSource: "callback_request",
  },
  whatsapp_click: {
    title: "Connect via WhatsApp on 9705080909",
    subtitle: "Provide your contact info to get instant floor plans & project deck via WhatsApp.",
    ctaText: "Connect on WhatsApp",
    leadSource: "whatsapp_click",
  },
  amenity_request: {
    title: "Want the Complete Neo Towers Amenity List?",
    subtitle: "Get full details on Club Neo, Sky Office, Skydeck, and all 40+ lifestyle amenities.",
    ctaText: "Get Amenity Details",
    leadSource: "amenity_request",
  },
  location_request: {
    title: "Get Neo Towers Location Details",
    subtitle: "Receive exact location pin, ORR Exit 1A map, and school/hospital connectivity details.",
    ctaText: "Send Location Details",
    leadSource: "location_request",
  },
  exit_intent: {
    title: "Before You Go — Get Neo Towers Details",
    subtitle: "Want the floor plans, latest availability and project details? Leave your details and our team will get in touch.",
    ctaText: "Get Project Details",
    leadSource: "exit_intent",
  },
  scroll_popup: {
    title: "Interested in Neo Towers?",
    subtitle: "Get floor plans, availability and project details from Naani Projects.",
    ctaText: "Get Details",
    leadSource: "scroll_popup",
  },
};

const NEO_CONTEXT: PageContext = {
  propertyName: "Neo Towers",
  projectName: "Neo Towers",
  builderName: "Yula Globus Developers LLP",
  location: "Neopolis, Kokapet, West Hyderabad",
  propertyType: "3 & 4 BHK Uber-Premium Apartments",
  pageUrl: "/projects/neo-towers-neopolis-kokapet",
  sourcePage: "Naani Projects – Neo Towers",
};

const NeoTowersLeadPopup = ({
  open,
  onOpenChange,
  popupType,
}: NeoTowersLeadPopupProps) => {
  const navigate = useNavigate();
  const config = POPUP_CONFIGS[popupType] || POPUP_CONFIGS.price_request;

  const handleCaptured = (profile: LeadProfile) => {
    navigate("/thank-you", {
      state: {
        projectName: "Neo Towers",
        projectUrl: "/projects/neo-towers-neopolis-kokapet",
        context: NEO_CONTEXT,
        profile,
        leadSource: config.leadSource,
      },
    });
  };

  return (
    <LeadQualificationPopup
      open={open}
      onOpenChange={onOpenChange}
      context={NEO_CONTEXT}
      leadSource={`Naani Projects – Neo Towers (${config.leadSource})`}
      titleOverride={config.title}
      subtitleOverride={config.subtitle}
      ctaTextOverride={config.ctaText}
      onCaptured={handleCaptured}
    />
  );
};

export default NeoTowersLeadPopup;
