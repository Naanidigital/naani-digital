import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import {
  ShieldCheck,
  Lock,
  Database,
  MessageSquare,
  UserCheck,
  Server,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export const PrivacyPolicyPage = () => {
  const canonicalUrl = "https://www.naani.in/privacy-policy";
  const title = "Privacy Policy | Naani Projects Hyderabad";
  const description =
    "Read the Naani Projects Privacy Policy. Understand how we collect, use, protect, and process your property enquiry details, contact information, and WhatsApp communications.";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    headline: "Naani Projects Privacy Policy",
    description,
    url: canonicalUrl,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "Naani Projects",
      url: "https://www.naani.in",
    },
    publisher: {
      "@type": "RealEstateAgent",
      name: "Naani Projects",
      url: "https://www.naani.in",
      logo: "https://www.naani.in/naani-projects-logo.png",
      telephone: "+919493943946",
      email: "naaniprojects@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kondapur",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500084",
        addressCountry: "IN",
      },
    },
  };

  const sections = [
    { id: "introduction", label: "1. Introduction & Overview" },
    { id: "information-collected", label: "2. Information We Collect" },
    { id: "how-we-use", label: "3. How We Use Information" },
    { id: "whatsapp", label: "4. WhatsApp Communications" },
    { id: "crm-processing", label: "5. CRM & Staff Access" },
    { id: "service-providers", label: "6. Third-Party Service Providers" },
    { id: "data-retention", label: "7. Data Security & Retention" },
    { id: "cookies-analytics", label: "8. Cookies & Storage" },
    { id: "user-rights", label: "9. Your Privacy Rights" },
    { id: "contact-us", label: "10. Contact & Grievance Redressal" },
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        structuredData={structuredData}
      />

      {/* HEADER HERO */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-slate-950 via-[#0B1120] to-slate-950 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.12),rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center space-x-2 text-xs text-muted-foreground mb-6 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="text-muted-foreground/60" />
            <span className="text-amber-400 font-semibold">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            <span>Privacy & Data Protection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Naani Projects <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Privacy Policy</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            This Privacy Policy explains how Naani Projects collects, uses, protects, and discloses personal information
            gathered through our property discovery portal, customer enquiry forms, CRM operations, and direct WhatsApp
            communications across Hyderabad, Telangana.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-300">Effective Date:</span> November 2026
            </div>
            <div>
              <span className="font-semibold text-slate-300">Last Reviewed:</span> November 23, 2026
            </div>
            <div>
              <span className="font-semibold text-slate-300">Jurisdiction:</span> Hyderabad, Telangana, India
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT & QUICK NAV */}
      <section className="py-12 sm:py-16 bg-slate-950 text-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* STICKY QUICK NAVIGATION (DESKTOP) */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 bg-[#0D1526] border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                  <FileText size={16} /> Table of Contents
                </h2>
                <nav className="space-y-1.5 text-xs">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block px-3 py-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/50 transition-colors font-medium"
                    >
                      {sec.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                  <p className="font-semibold text-slate-300">Have privacy questions?</p>
                  <p>Our team is available to assist with data requests or inquiries.</p>
                  <a
                    href="mailto:naaniprojects@gmail.com"
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-bold mt-1"
                  >
                    <Mail size={14} /> naaniprojects@gmail.com
                  </a>
                </div>
              </div>
            </aside>

            {/* MAIN POLICY CONTENT */}
            <div className="lg:col-span-8 space-y-12">

              {/* 1. Introduction */}
              <article id="introduction" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Introduction & Overview</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-3 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    Welcome to <strong>Naani Projects</strong> (<a href="https://naani.in" className="text-amber-400 hover:underline">https://naani.in</a>).
                    We are a dedicated real estate advisory and property discovery platform based in Hyderabad, Telangana.
                    We assist prospective homebuyers, NRI investors, and commercial property seekers in exploring verified residential
                    apartments, luxury villas, and gated communities.
                  </p>
                  <p>
                    We respect your privacy and are committed to safeguarding the personal and contact information you entrust with us.
                    This policy outlines the principles governing our data collection, processing, communication practices, and the technical
                    safeguards we employ to maintain your confidentiality.
                  </p>
                  <p>
                    By accessing our website, submitting property inquiry forms, requesting project brochures, scheduling site visits,
                    or initiating conversations with our team on WhatsApp, you acknowledge and agree to the practices described herein.
                  </p>
                </div>
              </article>

              {/* 2. Information We Collect */}
              <article id="information-collected" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Information We Collect</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-4 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    We collect information directly from you when you interact with our platform, request property documentation,
                    or communicate with our real estate advisory specialists:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Property Enquiry & Lead Data:</strong> When you complete an enquiry form,
                        request a project brochure, or register for a site visit, we collect your full name, 10-digit mobile phone number,
                        optional email address, preferred configurations (e.g., 2 BHK, 3 BHK, 4 BHK, Villa, Plot), estimated budget brackets,
                        and targeted residential growth corridors in Hyderabad (such as Kokapet, Tellapur, Neopolis, Financial District,
                        Miyapur, or Bachupally).
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">WhatsApp Communication Data:</strong> When you initiate contact or reply to our
                        official WhatsApp Business account (+91 94939 43946 or +91 97050 80909), we process your WhatsApp phone number (`wa_id`),
                        display name, message contents, timestamp, and message delivery or read status.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Property Listing Submissions:</strong> For property owners, builders, or developers
                        submitting listings via our "List Your Property" portal, we collect authorized contact details, property address,
                        carpet area, structural specifications, RERA certification numbers, and asking price points.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Technical & Usage Information:</strong> When you browse our portal, our servers
                        automatically log standard technical data such as browser type, referring URL, operating system, and anonymous
                        interaction metrics used to diagnose performance and enhance layout usability.
                      </div>
                    </li>
                  </ul>
                </div>
              </article>

              {/* 3. How We Use Your Information */}
              <article id="how-we-use" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">How We Use Your Information</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-4 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    Naani Projects utilizes the information collected exclusively for legitimate real estate advisory,
                    transaction facilitation, and direct customer service purposes:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                        <FileText size={16} className="text-amber-400" /> Brochure & Detail Delivery
                      </h3>
                      <p className="text-xs text-slate-400">
                        Sending official project e-brochures, sanctioned floor plans, pricing sheets, and unit availability directly to your WhatsApp or email.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                        <UserCheck size={16} className="text-amber-400" /> Tailored Recommendations
                      </h3>
                      <p className="text-xs text-slate-400">
                        Filtering 220+ verified Hyderabad residential projects to match your specific commute, budget, and family requirement parameters.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                        <Clock size={16} className="text-amber-400" /> Site Visit Coordination
                      </h3>
                      <p className="text-xs text-slate-400">
                        Arranging convenient on-site inspections, model flat walkthroughs, and developer meetings across Hyderabad corridors.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <h3 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-amber-400" /> Customer Support & Follow-up
                      </h3>
                      <p className="text-xs text-slate-400">
                        Responding to inquiries, answering RERA verification queries, and providing ongoing support during your property acquisition.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 font-medium">
                    <strong>Zero Spam & No Data Brokering:</strong> We respect your peace of mind. We do <strong>not</strong> sell,
                    lease, rent, or trade your personal phone number or email address to third-party telemarketing agencies or
                    external loan aggregators.
                  </div>
                </div>
              </article>

              {/* 4. WhatsApp Communications */}
              <article id="whatsapp" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">WhatsApp Communications</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-4 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    WhatsApp is Naani Projects' primary real-time communication channel. When you request property assistance
                    or contact our advisors via WhatsApp:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-emerald-400 shrink-0 mt-1" />
                      <span>
                        <strong>Inbound & Outbound Messaging:</strong> Communications are conducted through Meta's secure WhatsApp Business Cloud API
                        and our verified business numbers (+91 94939 43946 and +91 97050 80909).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-emerald-400 shrink-0 mt-1" />
                      <span>
                        <strong>Automated & Advisory Assistance:</strong> Initial confirmation messages may be dispatched to deliver requested
                        brochures or acknowledge inquiries, followed by personal consultation with an assigned Naani Projects property specialist.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-emerald-400 shrink-0 mt-1" />
                      <span>
                        <strong>Opting Out / Stopping Messages:</strong> You retain complete control over your communication preferences.
                        To stop receiving updates, simply reply with "STOP", "UNSUBSCRIBE", or inform your assigned property advisor.
                        Your request will be honored promptly without hindrance.
                      </span>
                    </li>
                  </ul>
                </div>
              </article>

              {/* 5. CRM & Staff Access */}
              <article id="crm-processing" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">CRM Processing & Authorised Staff Access</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-3 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    To ensure high service quality and prompt responsiveness, customer inquiries and WhatsApp conversations are processed
                    within our secure, internal Customer Relationship Management (CRM) portal located at <code className="text-amber-400 text-xs px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">/crm</code>.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Lock size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Strict Authentication & Role-Based Access:</strong> Access to the CRM is restricted strictly to authenticated,
                        authorized staff members holding verified administrative or support credentials. Public visitors and unauthorized users
                        are denied access.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Database size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Row-Level Security (RLS):</strong> Our database employs granular Row Level Security policies ensuring that
                        only authorized CRM operations can interact with customer records, conversation threads, and staff assignments.
                      </span>
                    </li>
                  </ul>
                </div>
              </article>

              {/* 6. Third-Party Service Providers */}
              <article id="service-providers" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Third-Party Service Providers</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-4 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    We partner with reputable cloud infrastructure and enterprise technology providers to maintain portal uptime,
                    securely store information, and deliver WhatsApp communications:
                  </p>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <Server size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white text-sm">Meta Platforms, Inc. (WhatsApp Cloud API):</strong>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Powers the enterprise WhatsApp communication infrastructure used to receive inquiries and transmit project brochures.
                          Data processed is governed by Meta's enterprise security standards and terms.
                        </p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <Database size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white text-sm">Supabase Inc.:</strong>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Provides our cloud-hosted PostgreSQL database, Edge Functions, and encrypted asset storage.
                          All database transactions are secured using industry-standard TLS encryption and role-level isolation.
                        </p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <Server size={18} className="text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white text-sm">Vercel Inc.:</strong>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Hosts the Naani Projects web application on globally distributed edge networks, delivering fast,
                          secure HTTPS delivery and DDoS mitigation.
                        </p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                      <Eye size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white text-sm">Google LLC (Google Tag Manager & Google Workspace):</strong>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Google Tag Manager is used on our website to orchestrate performance analytics. In addition,
                          website enquiry notifications and backup records are securely processed through Google Apps Script
                          and private Google Sheets for internal administrative tracking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* 7. Data Security & Retention */}
              <article id="data-retention" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Data Security & Retention Practices</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-3 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    We employ robust technical and administrative safeguards designed to protect personal data against accidental loss,
                    unauthorized modification, disclosure, or access:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Lock size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Encryption in Transit:</strong> All communications between your web browser and our servers are encrypted using
                        industry-standard Transport Layer Security (HTTPS with TLS 1.2 and TLS 1.3 support).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Retention Guidelines:</strong> We retain customer lead and inquiry information only as long as reasonably
                        necessary to fulfill real estate advisory services, maintain audit records, coordinate ongoing property bookings,
                        or comply with applicable legal and taxation regulations in India.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Data Minimization:</strong> We only collect information strictly relevant to answering property enquiries,
                        delivering documentation, and scheduling site visits.
                      </span>
                    </li>
                  </ul>
                </div>
              </article>

              {/* 8. Cookies & Storage */}
              <article id="cookies-analytics" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    8
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Cookies, Local Storage & Analytics</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-3 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    Our website uses modern browser storage mechanisms to maintain session continuity and optimal navigation:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Session Storage (`sessionStorage`):</strong> Temporarily stores your filter selections and lead profile during an
                        active browsing session so that you do not have to re-enter your preferences across multiple project pages.
                        This data automatically clears when you close your browser tab.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Local Storage (`localStorage`):</strong> Exclusively utilized for authenticated CRM staff sessions to preserve
                        secure authentication tokens. Public visitors do not have persistent tracking cookies placed via this mechanism.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-1" />
                      <span>
                        <strong>Performance Analytics:</strong> Aggregated, non-personally identifiable analytics help us evaluate popular
                        locations, high-demand project configurations, and ensure rapid loading times on mobile devices.
                      </span>
                    </li>
                  </ul>
                </div>
              </article>

              {/* 9. Your Rights */}
              <article id="user-rights" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    9
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Your Rights & Choices</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-4 bg-[#0D1526]/50 p-6 rounded-2xl border border-slate-800/80">
                  <p>
                    Regardless of your location, Naani Projects provides clear, transparent rights regarding your personal data:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <strong className="text-white text-sm block mb-1">Right to Access</strong>
                      <p className="text-xs text-slate-400">
                        Request confirmation of whether we hold personal information regarding you and receive a copy of your inquiry records.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <strong className="text-white text-sm block mb-1">Right to Rectification</strong>
                      <p className="text-xs text-slate-400">
                        Request correction of inaccurate, outdated, or incomplete phone numbers, email addresses, or property requirements.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <strong className="text-white text-sm block mb-1">Right to Erasure / Deletion</strong>
                      <p className="text-xs text-slate-400">
                        Request the deletion or removal of your contact details and communication history from our active CRM database.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <strong className="text-white text-sm block mb-1">Right to Withdraw Consent</strong>
                      <p className="text-xs text-slate-400">
                        Revoke permission for phone calls or WhatsApp messages at any time. We will immediately cease further follow-up outreach.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pt-2">
                    To exercise any of these rights, please email us at <a href="mailto:naaniprojects@gmail.com" className="text-amber-400 hover:underline">naaniprojects@gmail.com</a> or
                    contact our privacy desk using the verified details below. Our administrative team reviews verified requests for access, correction and deletion and will respond within the timeframe required by applicable law.
                  </p>
                </div>
              </article>

              {/* 10. Contact Information */}
              <article id="contact-us" className="space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                    10
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Contact Information & Grievance Redressal</h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-4 bg-[#0D1526] p-6 rounded-2xl border border-amber-500/30 shadow-xl">
                  <p>
                    If you have any questions, concerns, complaints, or privacy requests regarding this policy or our data handling practices,
                    please reach out directly to our designated privacy desk:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <Mail size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-400 block">Official Privacy Email</span>
                        <a href="mailto:naaniprojects@gmail.com" className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                          naaniprojects@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <Phone size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-400 block">Direct Telephone & WhatsApp</span>
                        <a href="tel:+919493943946" className="text-sm font-bold text-white hover:text-amber-400 transition-colors">
                          +91 94939 43946
                        </a>
                        <span className="text-xs text-slate-400 block mt-0.5">Secondary: +91 97050 80909</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 sm:col-span-2">
                      <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-400 block">Office Address</span>
                        <span className="text-sm font-medium text-white">
                          Naani Projects, Kondapur, Hyderabad, Telangana 500084, India
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span>Operating Hours: Monday – Sunday, 9:00 AM – 8:00 PM IST</span>
                    <Link to="/contact-us" className="text-amber-400 hover:underline font-bold inline-flex items-center gap-1">
                      Contact Us Page <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
