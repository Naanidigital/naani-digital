import { Phone, MessageCircle } from "lucide-react";
import { NAANI_PHONE, NAANI_WA } from "@/lib/leadProfile";

/**
 * Sticky Call + WhatsApp contact for project pages.
 * Rendered as anchor tags so the global LeadGateProvider intercepts
 * once-per-session and runs the unified "Get Property Details" modal.
 */
const StickyContact = () => {
  const waHref = `https://wa.me/${NAANI_WA}?text=Hi`;
  const telHref = `tel:${NAANI_PHONE}`;

  return (
    <>
      {/* Desktop: bottom right floating */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-3">
        <a
          href={telHref}
          aria-label="Call us"
          className="group w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6 text-white" fill="white" />
        </a>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 md:hidden">
        <div className="flex gap-3">
          <a
            href={telHref}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-medium"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-medium"
          >
            <MessageCircle className="w-5 h-5" fill="white" />
            WhatsApp
          </a>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          +91 97050 80909
        </p>
      </div>
    </>
  );
};

export default StickyContact;
