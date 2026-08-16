import LeadCapturePopup from "@/components/LeadCapturePopup";

/**
 * Legacy Tridasa EnquiryPopup — now delegates to the unified
 * global LeadCapturePopup → LeadQualificationPopup so the entire
 * site uses one master modal.
 */

interface EnquiryPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

const EnquiryPopup = ({ open, onOpenChange, source = "Tridasa Rise" }: EnquiryPopupProps) => (
  <LeadCapturePopup
    open={open}
    onOpenChange={onOpenChange}
    source={source}
    projectName="Tridasa Rise"
  />
);

export default EnquiryPopup;
