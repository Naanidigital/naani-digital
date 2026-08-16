import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle, ArrowLeft, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import {
  LeadProfile,
  NAANI_PHONE,
  PageContext,
  buildWhatsAppUrl,
  detectPageContext,
  getLeadProfile,
} from "@/lib/leadProfile";

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    projectName?: string;
    projectUrl?: string;
    context?: PageContext;
    intentType?: string;
    profile?: LeadProfile;
  } | null;

  const profile = state?.profile || getLeadProfile();
  const projectName = state?.projectName || state?.context?.propertyName || "our property";
  const projectUrl = state?.projectUrl || "";
  const intentType = state?.intentType || "generic";
  const context: PageContext =
    state?.context || {
      propertyName: projectName,
      projectName,
      builderName: "",
      location: "",
      propertyType: "",
      pageUrl: projectUrl ? `${window.location.origin}${projectUrl}` : window.location.href,
      sourcePage: "",
    };

  const waHref = buildWhatsAppUrl(profile, context, intentType);
  const telHref = `tel:${NAANI_PHONE}`;

  const getIntentHeading = () => {
    switch (intentType) {
      case "brochure":
        return "Brochure Request Confirmed!";
      case "sitevisit":
        return "Site Visit Request Received!";
      case "knowmore":
        return "Project Details Requested!";
      case "call":
        return "Callback Request Confirmed!";
      default:
        return "Thank You!";
    }
  };

  const getIntentMessage = () => {
    switch (intentType) {
      case "brochure":
        return `Your digital brochure and floor plans for ${projectName} are ready. Connect directly on WhatsApp below to receive the instant PDF packet.`;
      case "sitevisit":
        return `Your site visit request for ${projectName} has been registered. Our property advisor will get in touch to confirm your visit time.`;
      case "knowmore":
        return `Your inquiry for detailed pricing and availability at ${projectName} has been received. Our team will contact you shortly.`;
      default:
        return `Your request for ${projectName} has been received. Our dedicated Hyderabad property team will contact you shortly.`;
    }
  };

  return (
    <>
      <SEOHead
        title="Thank You | Naani Projects"
        description="Thank you for your enquiry. Our team will contact you shortly."
        canonicalUrl="https://www.naani.in/thank-you"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div data-lead-gate-skip className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {getIntentHeading()}
            </h1>
            <p className="text-muted-foreground text-base">
              {getIntentMessage()}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition-all hover:scale-105 text-base w-full"
            >
              <Phone size={20} />
              Call Now {NAANI_PHONE}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition-all hover:scale-105 text-base w-full"
            >
              <MessageCircle size={20} />
              WhatsApp Now {NAANI_PHONE}
            </a>
          </div>

          {projectUrl && (
            <Button
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/10 py-4 text-base"
              onClick={() => navigate(projectUrl)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {projectName}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
