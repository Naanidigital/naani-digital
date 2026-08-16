import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadQualificationPopup from "./LeadQualificationPopup";
import {
  LeadProfile,
  PageContext,
  buildWhatsAppUrl,
  detectPageContext,
  getLeadProfile,
} from "@/lib/leadProfile";

/**
 * Global lead-qualification gate.
 *
 * Intercepts ALL clicks on:
 *   - <a href="tel:..."> (Call)
 *   - <a href="https://wa.me/..." | "whatsapp://...">  (WhatsApp)
 *   - anything with [data-lead-gate]  (Brochure download / Site visit / Know more)
 *
 * Behaviour (once-per-session gate):
 *   - If a qualified profile already exists in sessionStorage, the click is
 *     allowed. WhatsApp links are rewritten in-place with the rich profile
 *     message so the captured intent always rides along.
 *   - If no profile, the click is prevented, the qualification popup opens,
 *     and after submit the user is sent to /thank-you. The originally-clicked
 *     URL is preserved so /thank-you can offer a direct Call + WhatsApp.
 *
 * Lead Source labels are derived from the click target so the Google Sheet
 * shows exactly which CTA produced the lead.
 */

type GateType = "call" | "whatsapp" | "brochure" | "sitevisit" | "knowmore" | "generic";

interface PendingAction {
  type: GateType;
  href?: string;
  target?: string;
  context: PageContext;
  leadSource: string;
}

const isWhatsAppHref = (href: string) =>
  /^https?:\/\/(?:api\.|web\.)?wa\.me\//i.test(href) ||
  /^https?:\/\/(?:api\.|web\.)?whatsapp\.com\//i.test(href) ||
  /^whatsapp:/i.test(href);

const classifyAnchor = (a: HTMLAnchorElement, explicit?: string | null): GateType => {
  if (explicit) {
    const t = explicit.toLowerCase();
    if (["call", "whatsapp", "brochure", "sitevisit", "knowmore", "generic"].includes(t))
      return t as GateType;
  }
  const href = a.getAttribute("href") || "";
  if (href.startsWith("tel:")) return "call";
  if (isWhatsAppHref(href)) return "whatsapp";
  const text = (a.textContent || "").toLowerCase();
  if (/brochure|download/.test(text)) return "brochure";
  if (/site\s*visit|book.*visit|schedule.*visit/.test(text)) return "sitevisit";
  if (/know\s*more|view\s*details|more\s*details/.test(text)) return "knowmore";
  return "generic";
};

const labelForSource = (type: GateType) =>
  ({
    call: "Call CTA",
    whatsapp: "WhatsApp CTA",
    brochure: "Brochure Download CTA",
    sitevisit: "Site Visit CTA",
    knowmore: "Know More CTA",
    generic: "Generic CTA",
  }[type]);

const LeadGateProvider = () => {
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<PendingAction | null>(null);
  const navigate = useNavigate();

  const performAction = useCallback(
    (action: PendingAction, profile: LeadProfile | null) => {
      if (!action.href) return;
      let finalHref = action.href;
      if (action.type === "whatsapp") {
        finalHref = buildWhatsAppUrl(profile, action.context, action.type);
      }
      const target = action.target || (action.type === "call" ? "_self" : "_blank");
      if (target === "_self" || action.type === "call") {
        window.location.href = finalHref;
      } else {
        window.open(finalHref, target, "noopener,noreferrer");
      }
    },
    []
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Only left-click without modifiers
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const path = e.composedPath();
      let anchor: HTMLAnchorElement | null = null;
      let gateEl: HTMLElement | null = null;
      for (const node of path) {
        if (!(node instanceof HTMLElement)) continue;
        if (!gateEl && node.hasAttribute("data-lead-gate")) gateEl = node;
        if (!anchor && node.tagName === "A") anchor = node as HTMLAnchorElement;
        if (anchor && gateEl) break;
      }

      let href = "";
      let explicitType: string | null = null;
      let target: string | undefined;

      if (gateEl) {
        explicitType = gateEl.getAttribute("data-lead-gate");
        href = gateEl.getAttribute("data-lead-href") || anchor?.href || "";
        target = anchor?.target;
      } else if (anchor) {
        const rawHref = anchor.getAttribute("href") || "";
        if (!rawHref.startsWith("tel:") && !isWhatsAppHref(rawHref)) return;
        href = anchor.href;
        target = anchor.target;
      } else {
        return;
      }

      const type = anchor ? classifyAnchor(anchor, explicitType) : ((explicitType as GateType) || "generic");

      // Skip the gate for elements that explicitly opt out (e.g. floating CTA already gated, /thank-you page direct buttons)
      if ((anchor || gateEl)?.closest("[data-lead-gate-skip]")) return;

      const profile = getLeadProfile();
      const context = detectPageContext();
      const leadSource = labelForSource(type);

      if (profile) {
        // Already qualified — for WhatsApp, rewrite href in place so the rich
        // message includes the captured buyer intent.
        if (anchor && type === "whatsapp") {
          anchor.href = buildWhatsAppUrl(profile, context, type);
        }
        // Allow click through.
        return;
      }

      // Not qualified yet — intercept.
      e.preventDefault();
      e.stopPropagation();
      pendingRef.current = { type, href, target, context, leadSource };
      setOpen(true);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  const handleCaptured = useCallback(
    (profile: LeadProfile) => {
      const action = pendingRef.current;
      pendingRef.current = null;
      if (!action) {
        navigate("/thank-you");
        return;
      }
      // Per spec: always land on /thank-you after first qualification submit.
      // Pass the captured action so /thank-you can offer the direct Call + WhatsApp.
      navigate("/thank-you", {
        state: {
          projectName: action.context.propertyName,
          projectUrl: window.location.pathname,
          context: action.context,
          intentType: action.type,
          profile,
        },
      });
      // Action is NOT auto-performed; user explicitly continues from /thank-you.
      // This avoids surprise popup/redirect behavior on mobile.
    },
    [navigate]
  );

  // Always-on context for the popup (recomputed at open time)
  const ctx = pendingRef.current?.context || detectPageContext();
  const source = pendingRef.current?.leadSource || "Generic CTA";

  return (
    <LeadQualificationPopup
      open={open}
      onOpenChange={setOpen}
      context={ctx}
      leadSource={source}
      onCaptured={handleCaptured}
    />
  );
};

export default LeadGateProvider;
