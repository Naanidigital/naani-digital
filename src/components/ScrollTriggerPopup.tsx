import { useEffect, useRef, useState } from "react";
import LeadCapturePopup from "./LeadCapturePopup";

interface ScrollTriggerPopupProps {
  projectName: string;
}

const ScrollTriggerPopup = ({ projectName }: ScrollTriggerPopupProps) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");
  const midTriggered = useRef(false);
  const endTriggered = useRef(false);

  useEffect(() => {
    const key = `scroll_popup_${window.location.pathname}`;
    const session = sessionStorage.getItem(key);
    if (session === "done") return;

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;

      if (!midTriggered.current && scrollPercent >= 0.5) {
        midTriggered.current = true;
        setSource("Mid-Page Auto Popup");
        setOpen(true);
      } else if (!endTriggered.current && scrollPercent >= 0.9) {
        endTriggered.current = true;
        setSource("End-Page Auto Popup");
        setOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val && endTriggered.current) {
      sessionStorage.setItem(
        `scroll_popup_${window.location.pathname}`,
        "done"
      );
    }
  };

  return (
    <LeadCapturePopup
      open={open}
      onOpenChange={handleOpenChange}
      source={source}
      projectName={projectName}
    />
  );
};

export default ScrollTriggerPopup;
