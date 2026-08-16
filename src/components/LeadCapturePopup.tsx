import { useNavigate } from "react-router-dom";
import LeadQualificationPopup from "./LeadQualificationPopup";
import {
  detectPageContext,
  LeadProfile,
  PageContext,
} from "@/lib/leadProfile";

/**
 * LeadCapturePopup is now a thin wrapper that renders the unified
 * global LeadQualificationPopup ("Get Property Details") so every
 * enquiry surface across the site uses the same master modal.
 *
 * Public API (open/onOpenChange/source/projectName) is preserved so
 * every existing page keeps working unchanged.
 */

interface LeadCapturePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  projectName?: string;
}

const LeadCapturePopup = ({
  open,
  onOpenChange,
  source = "Generic CTA",
  projectName,
}: LeadCapturePopupProps) => {
  const navigate = useNavigate();

  const baseCtx: PageContext =
    typeof window !== "undefined"
      ? detectPageContext()
      : {
          propertyName: projectName || "",
          projectName: projectName || "",
          builderName: "",
          location: "",
          propertyType: "",
          pageUrl: "",
          sourcePage: "",
        };

  const context: PageContext = projectName
    ? { ...baseCtx, propertyName: projectName, projectName }
    : baseCtx;

  const handleCaptured = (profile: LeadProfile) => {
    navigate("/thank-you", {
      state: {
        projectName: context.propertyName,
        projectUrl:
          typeof window !== "undefined" ? window.location.pathname : "/",
        context,
        profile,
      },
    });
  };

  return (
    <LeadQualificationPopup
      open={open}
      onOpenChange={onOpenChange}
      context={context}
      leadSource={source}
      onCaptured={handleCaptured}
    />
  );
};

export default LeadCapturePopup;
