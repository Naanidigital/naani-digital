import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import LeadGateProvider from "./components/LeadGateProvider";

// Lazy load non-critical pages to reduce initial bundle
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const TridasaRisePage = lazy(() => import("./pages/TridasaRisePage"));
const ManAirportResidencyPage = lazy(() => import("./pages/ManAirportResidencyPage"));
const BrigadeGatewayNeopolis = lazy(() => import("./pages/BrigadeGatewayNeopolis"));
const PrestigeGoldenGrovePage = lazy(() => import("./pages/PrestigeGoldenGrovePage"));
const JayconGatewayTirupatiPage = lazy(() => import("./pages/JayconGatewayTirupatiPage"));
const AspireSpacesA3Page = lazy(() => import("./pages/AspireSpacesA3Page"));
const SriSohoInteriorsPage = lazy(() => import("./pages/SriSohoInteriorsPage"));
const Team4AriaMiyapurPage = lazy(() => import("./pages/Team4AriaMiyapurPage"));
const RajapushpaSierraPage = lazy(() => import("./pages/RajapushpaSierraPage"));
const CandeurEterniaPage = lazy(() => import("./pages/CandeurEterniaPage"));
const GodrejKukatpallyPage = lazy(() => import("./pages/GodrejKukatpallyPage"));
const RaghavaHaloPage = lazy(() => import("./pages/RaghavaHaloPage"));
const ArithaDhanwinTowersPage = lazy(() => import("./pages/ArithaDhanwinTowersPage"));
const SanviKowsalyaVasudhaPage = lazy(() => import("./pages/SanviKowsalyaVasudhaPage"));
const SanviManidweepaShikaramPage = lazy(() => import("./pages/SanviManidweepaShikaramPage"));
const SanviKowsalyaAvaniPage = lazy(() => import("./pages/SanviKowsalyaAvaniPage"));
const ProjectDetailDynamic = lazy(() => import("./pages/ProjectDetailDynamic"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const ListYourPropertyPage = lazy(() => import("./pages/ListYourPropertyPage"));
const LocationHubPage = lazy(() => import("./pages/LocationHubPage"));
const BuilderHubPage = lazy(() => import("./pages/BuilderHubPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const OAuthConsentPage = lazy(() => import("./pages/OAuthConsentPage"));
const HyderabadHubPage = lazy(() => import("./pages/HyderabadHubPage"));
const BhkLandingPage = lazy(() => import("./pages/BhkLandingPage"));
const BuyerGuidePage = lazy(() => import("./pages/BuyerGuidePage"));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <Toaster />
    <ScrollToTop />
    <LeadGateProvider />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Primary lowercase routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/tridasa-rise" element={<TridasaRisePage />} />
        <Route path="/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad" element={<ManAirportResidencyPage />} />
        <Route path="/projects/brigade-gateway-neopolis-kokapet-hyderabad" element={<BrigadeGatewayNeopolis />} />
        <Route path="/projects/prestige-golden-grove-hyderabad" element={<PrestigeGoldenGrovePage />} />
        <Route path="/projects/jaycon-gateway-tirupati" element={<JayconGatewayTirupatiPage />} />
        <Route path="/projects/aspire-spaces-a3-bachupally" element={<AspireSpacesA3Page />} />
        <Route path="/projects/sri-soho-interiors-designers-hyderabad" element={<SriSohoInteriorsPage />} />
        <Route path="/projects/team4-aria-miyapur-luxury-apartments-hyderabad" element={<Team4AriaMiyapurPage />} />
        <Route path="/projects/rajapushpa-sierra-tellapur-hyderabad" element={<RajapushpaSierraPage />} />
        <Route path="/projects/candeur-eternia-bachupally-hyderabad" element={<CandeurEterniaPage />} />
        <Route path="/projects/godrej-kukatpally-hyderabad" element={<GodrejKukatpallyPage />} />
        <Route path="/projects/raghava-halo-kondapur-hyderabad" element={<RaghavaHaloPage />} />
        <Route path="/projects/aritha-gbr-dhanwin-towers-bowrampet-hyderabad" element={<ArithaDhanwinTowersPage />} />
        <Route path="/projects/sanvis-kowsalya-vasudha-mallampet" element={<SanviKowsalyaVasudhaPage />} />
        <Route path="/projects/sanvi-kowsalya-manidweepa-shikaram-bachupally" element={<SanviManidweepaShikaramPage />} />
        <Route path="/projects/sanvi-kowsalya-avani-kristareddypet" element={<SanviKowsalyaAvaniPage />} />
        {/* Dynamic catch-all for DB-driven projects (must come AFTER all custom project routes) */}
        <Route path="/projects/:slug" element={<ProjectDetailDynamic />} />
        {/* User-submitted property pages share the same renderer */}
        <Route path="/property/:slug" element={<ProjectDetailDynamic />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/list-your-property" element={<ListYourPropertyPage />} />
        <Route path="/post-property" element={<Navigate to="/list-your-property" replace />} />
        <Route path="/sell-property" element={<Navigate to="/list-your-property" replace />} />

        {/* Auth + OAuth consent for MCP / external clients */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/.lovable/oauth/consent" element={<OAuthConsentPage />} />

        {/* SEO Industry Architecture Routes */}
        <Route path="/hyderabad" element={<HyderabadHubPage />} />
        <Route path="/hyderabad/2-bhk-flats" element={<BhkLandingPage forcedType="bhk-2" />} />
        <Route path="/hyderabad/3-bhk-flats" element={<BhkLandingPage forcedType="bhk-3" />} />
        <Route path="/hyderabad/2-bhk" element={<BhkLandingPage forcedType="bhk-2" />} />
        <Route path="/hyderabad/3-bhk" element={<BhkLandingPage forcedType="bhk-3" />} />
        <Route path="/hyderabad/:locationSlug/:bhkSlug" element={<BhkLandingPage />} />
        <Route path="/guides/:guideSlug" element={<BuyerGuidePage />} />

        {/* SEO hubs: location + builder landing pages */}
        <Route path="/projects-in-:locationSlug" element={<LocationHubPage />} />
        <Route path="/:builderSeoSlug" element={<BuilderHubPage />} />

        {/* 301-style redirects: legacy agency routes → /projects */}
        <Route path="/services" element={<Navigate to="/projects" replace />} />
        <Route path="/services/*" element={<Navigate to="/projects" replace />} />
        <Route path="/Services" element={<Navigate to="/projects" replace />} />
        <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
        <Route path="/Portfolio" element={<Navigate to="/projects" replace />} />
        <Route path="/testimonials" element={<Navigate to="/projects" replace />} />
        <Route path="/Testimonials" element={<Navigate to="/projects" replace />} />
        <Route path="/blogs" element={<Navigate to="/projects" replace />} />
        <Route path="/blogs/*" element={<Navigate to="/projects" replace />} />
        <Route path="/blog" element={<Navigate to="/projects" replace />} />
        <Route path="/blog/*" element={<Navigate to="/projects" replace />} />

        {/* Case-insensitive aliases */}
        <Route path="/About-us" element={<Navigate to="/about-us" replace />} />
        <Route path="/Contact-us" element={<Navigate to="/contact-us" replace />} />
        <Route path="/About" element={<Navigate to="/about-us" replace />} />
        <Route path="/Contact" element={<Navigate to="/contact-us" replace />} />
        <Route path="/project/jaycon-gateway-tirupati" element={<Navigate to="/projects/jaycon-gateway-tirupati" replace />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
