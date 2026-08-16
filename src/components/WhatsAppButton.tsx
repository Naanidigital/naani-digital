import { MessageCircle } from "lucide-react";
import { NAANI_WA } from "@/lib/leadProfile";

/**
 * Floating WhatsApp button. Rendered as an <a href="wa.me/..."> so the
 * global LeadGateProvider intercepts and runs the unified qualification
 * modal once per session. After qualification the link auto-rewrites
 * to include the rich buyer-intent message.
 */
const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${NAANI_WA}?text=Hi`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold-purple p-[2px] shadow-gold-lg hover:scale-110 transition-transform animate-fade-in animate-pulse-glow"
  >
    <span className="w-full h-full bg-background rounded-full flex items-center justify-center">
      <MessageCircle className="text-primary" size={24} />
    </span>
  </a>
);

export default WhatsAppButton;
