import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

interface OGRoute {
  path: string;
  title: string;
  description: string;
  url: string;
  image: string;
  prerenderHtml?: string;
}

const SITE = 'https://www.naani.in';
const DEFAULT_OG = `${SITE}/naani-projects-logo.png`;

// Static pre-rendered crawlable HTML content for /about-us
const ABOUT_US_PRERENDER_HTML = `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.naani.in/about-us#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.naani.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://www.naani.in/about-us"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.naani.in/about-us#webpage",
    "url": "https://www.naani.in/about-us",
    "name": "About Naani Projects | Hyderabad Real Estate Experts",
    "description": "Learn about Naani Projects, a Hyderabad-focused real estate platform helping buyers explore apartments, villas, plots and new residential projects across Hyderabad.",
    "isPartOf": {
      "@id": "https://www.naani.in/#website"
    },
    "about": {
      "@id": "https://www.naani.in/#organization"
    }
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="text-amber-400 font-semibold">About Us</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Hyderabad Real Estate Discovery</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          About Naani Projects – <span class="text-amber-400">Hyderabad Real Estate Experts</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          Naani Projects is a specialized Hyderabad-focused property discovery platform helping buyers explore residential properties across prime locations. Whether you are searching for apartments, luxury villas, gated community plots, or new residential projects, Naani Projects simplifies project evaluation, location comparison, and direct advisor connectivity.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Who We Are: Your Trusted Guide to Hyderabad Real Estate</h2>
        <p class="text-slate-300 leading-relaxed">
          Naani Projects is a specialized digital platform designed specifically for <strong>Hyderabad real estate</strong> discovery. We understand that finding the right <strong>properties in Hyderabad</strong> requires clear data, honest location insights, and trustworthy guidance rather than high-pressure sales calls.
        </p>
        <p class="text-slate-300 leading-relaxed">
          Our platform aggregates and organizes verified details on premium <strong>residential projects in Hyderabad</strong>, covering premier high-rise developments, gated communities, and luxury residential layouts. By focusing exclusively on Hyderabad's dynamic housing ecosystem, we empower <strong>Hyderabad homebuyers</strong>, first-time property seekers, and seasoned real estate buyers to research housing options efficiently before making a major financial commitment.
        </p>
        <p class="text-slate-300 leading-relaxed">
          We collaborate with established real estate developers and property advisory networks to bring up-to-date layout details, floor plan configurations, location connectivity maps, and pricing structures directly to your fingertips.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Why Naani Projects Exists: Simplifying Property Discovery in Hyderabad</h2>
        <p class="text-slate-300 leading-relaxed">
          Navigating the modern property market in Hyderabad can quickly become overwhelming for buyers due to hundreds of active projects, conflicting price quotes, and persistent sales calls. We built Naani Projects around one central mission: <strong>"Find the Right Property, Smarter &amp; Faster in Hyderabad."</strong>
        </p>
        <p class="text-slate-300 leading-relaxed">
          Rather than forcing users through tedious registration walls or spamming their inboxes, Naani Projects delivers curated project brochures, floor plans, pricing estimates, and micro-market analysis directly via WhatsApp and on-demand advisory.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">What We Do</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Property Discovery</h3>
            <p class="text-slate-300 text-sm">Help buyers explore apartments, luxury villas, plots, and new residential projects across Hyderabad's prime locations.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Project Comparison</h3>
            <p class="text-slate-300 text-sm">Enable buyers to evaluate projects based on location advantages, pricing structures, amenity packages, and configuration layouts.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Location Discovery</h3>
            <p class="text-slate-300 text-sm">Provide in-depth neighborhood insights covering major residential growth corridors and IT hubs in Hyderabad.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Property Enquiries</h3>
            <p class="text-slate-300 text-sm">Allow buyers to query project details instantly via WhatsApp, direct phone calls, or streamlined enquiry forms.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Site Visit Assistance</h3>
            <p class="text-slate-300 text-sm">Help users schedule and coordinate guided property site visits with verified project representatives.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Buyer Guidance</h3>
            <p class="text-slate-300 text-sm">Deliver actionable insights, buying guides, and micro-market data to assist buyers before making booking decisions.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">How We Evaluate Project Information</h2>
        <p class="text-slate-300 leading-relaxed">
          Project details on Naani Projects are compiled from official developer releases, public RERA documentation, architectural site plans, physical site visits, and direct updates from builder representatives.
        </p>
        <div class="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm leading-relaxed">
          <strong>Naani Projects does not replace independent legal, financial or technical due diligence. Buyers should verify title, approvals, agreements and other legal documentation with qualified professionals before purchasing.</strong>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Hyderabad Areas We Cover</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm font-bold">
          <a href="/projects-in-kokapet" class="text-amber-400 hover:underline">Kokapet Projects</a>
          <a href="/projects-in-tellapur" class="text-amber-400 hover:underline">Tellapur Projects</a>
          <a href="/projects-in-gachibowli" class="text-amber-400 hover:underline">Gachibowli Projects</a>
          <a href="/projects-in-narsingi" class="text-amber-400 hover:underline">Narsingi Projects</a>
          <a href="/projects-in-kondapur" class="text-amber-400 hover:underline">Kondapur Projects</a>
          <a href="/projects-in-miyapur" class="text-amber-400 hover:underline">Miyapur Projects</a>
          <a href="/projects-in-bachupally" class="text-amber-400 hover:underline">Bachupally Projects</a>
          <a href="/projects-in-kollur" class="text-amber-400 hover:underline">Kollur Projects</a>
          <a href="/projects-in-tukkuguda" class="text-amber-400 hover:underline">Tukkuguda Projects</a>
          <a href="/projects-in-nallagandla" class="text-amber-400 hover:underline">Nallagandla Projects</a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Property Types You Can Explore</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold">
          <a href="/hyderabad/2-bhk-flats" class="text-amber-400 hover:underline">2 BHK Flats in Hyderabad</a>
          <a href="/hyderabad/3-bhk-flats" class="text-amber-400 hover:underline">3 BHK Flats in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">Apartments in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">Villas in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">Plots in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">New Residential Projects</a>
          <a href="/projects" class="text-amber-400 hover:underline">Gated Community Projects</a>
          <a href="/projects" class="text-amber-400 hover:underline">Luxury Homes in Hyderabad</a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Who We Help</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Homebuyers</h3>
            <p class="text-slate-300 text-xs mt-2">People looking for a home in Hyderabad based on budget, location, configuration and lifestyle requirements.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">First-Time Buyers</h3>
            <p class="text-slate-300 text-xs mt-2">People who need help understanding project options, carpet areas, loan approvals, and site visit processes.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Property Investors</h3>
            <p class="text-slate-300 text-xs mt-2">People researching Hyderabad growth corridors and residential developments objectively.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">NRI Buyers</h3>
            <p class="text-slate-300 text-xs mt-2">Users living outside Hyderabad/India who want to research Hyderabad residential properties remotely.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Our Approach to Property Discovery</h2>
        <p class="text-slate-300">1. Explore Properties &nbsp;|&nbsp; 2. Shortlist Projects &nbsp;|&nbsp; 3. Compare Locations &amp; Projects &nbsp;|&nbsp; 4. Request Details / Schedule a Visit &nbsp;|&nbsp; 5. Make an Informed Decision</p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Meet the Naani Projects Team</h2>
        <p class="text-slate-300">Naani Projects is powered by a dedicated team of Hyderabad real estate research analysts, property discovery advisors, and technology specialists committed to transparent, buyer-first guidance.</p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Why Choose Naani Projects</h2>
        <p class="text-slate-300">We offer Hyderabad-focused property discovery, objective project and location comparison, easy WhatsApp enquiry flows, buyer-focused information, and local micro-market knowledge.</p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Transparency &amp; Buyer Due Diligence</h2>
        <p class="text-slate-300">Project details, prices, availability, offers, and possession timelines can change over time. Buyers should verify information before booking, review legal documentation independently, and check RERA details through official government portals.</p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-lg font-bold text-white">What is Naani Projects?</h3>
            <p class="text-slate-300 text-sm mt-1">Naani Projects is a specialized Hyderabad-focused property discovery platform helping buyers explore residential properties across Hyderabad.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-lg font-bold text-white">What types of properties can I find on Naani Projects?</h3>
            <p class="text-slate-300 text-sm mt-1">Explore 2 BHK and 3 BHK apartments, luxury villas, gated community plots, and new launch residential projects in Hyderabad.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Which areas of Hyderabad does Naani Projects cover?</h3>
            <p class="text-slate-300 text-sm mt-1">We cover Kokapet, Neopolis, Financial District, Gachibowli, Narsingi, Tellapur, Kondapur, HITECH City, Miyapur, Bachupally, Kollur, Tukkuguda, and Shamshabad.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-[#0B101D]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Explore Hyderabad Properties</h2>
        <p class="text-slate-300">Browse active listings, compare locations, or speak directly with an advisor.</p>
        <div class="flex flex-wrap justify-center gap-6 text-sm font-semibold text-amber-400">
          <a href="/projects" class="hover:underline">Browse Projects</a>
          <a href="/hyderabad" class="hover:underline">Hyderabad Real Estate Hub</a>
          <a href="/hyderabad/2-bhk-flats" class="hover:underline">2 BHK Flats in Hyderabad</a>
          <a href="/hyderabad/3-bhk-flats" class="hover:underline">3 BHK Flats in Hyderabad</a>
          <a href="/list-your-property" class="hover:underline">List Your Property</a>
          <a href="/contact-us" class="hover:underline">Contact Naani Projects</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;

// Static pre-rendered crawlable HTML content for /contact-us
const CONTACT_US_PRERENDER_HTML = `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.naani.in/contact-us#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.naani.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": "https://www.naani.in/contact-us"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.naani.in/contact-us#webpage",
    "url": "https://www.naani.in/contact-us",
    "name": "Contact Naani Projects | Hyderabad Real Estate Experts",
    "description": "Contact Naani Projects for apartments, villas, plots and new residential projects in Hyderabad. Get property details, compare projects or request a site visit.",
    "isPartOf": {
      "@id": "https://www.naani.in/#website"
    },
    "about": {
      "@id": "https://www.naani.in/#organization"
    }
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="hover:text-amber-400">About Us</a>
        <a href="/contact-us" class="text-amber-400 font-semibold">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Property Discovery &amp; Assistance</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Contact Naani Projects – <span class="text-amber-400">Hyderabad Real Estate Experts</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          Naani Projects is a Hyderabad-focused property discovery platform helping buyers explore apartments, villas, plots and new residential projects across Hyderabad. Contact us to explore properties, request project details, compare projects, check unit availability, request floor plans, or schedule a guided site visit.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">How Can We Help You?</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Buy a Property</h3>
            <p class="text-slate-300 text-sm">Looking for an apartment, luxury villa, plot or residential property in Hyderabad based on your budget and preferences.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Explore New Projects</h3>
            <p class="text-slate-300 text-sm">Discover upcoming new residential projects, pre-launch offers, and gated community developments across Hyderabad.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Compare Projects</h3>
            <p class="text-slate-300 text-sm">Compare residential developments based on location advantages, configuration, amenities, and available pricing data.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Get Project Details</h3>
            <p class="text-slate-300 text-sm">Request comprehensive project information including digital brochures, floor plans, specifications, and cost sheets.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0F1629] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Schedule a Site Visit</h3>
            <p class="text-slate-300 text-sm">Request free coordination for guided project site visits at convenient times with dedicated property advisors.</p>
          </div>
          <a href="/list-your-property" class="p-6 rounded-xl bg-[#0F1629] border border-slate-800 block">
            <h3 class="text-lg font-bold text-amber-400">List Your Property</h3>
            <p class="text-slate-300 text-sm">Property owners or developers can explore options to list a residential project or property with Naani Projects.</p>
          </a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Contact Naani Projects</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-base font-bold text-white">Call Us</h3>
            <p class="text-amber-400 font-bold text-sm">+91 97050 80909</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-base font-bold text-white">WhatsApp</h3>
            <p class="text-emerald-400 font-bold text-sm">+91 97050 80909</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-base font-bold text-white">Email</h3>
            <p class="text-amber-400 font-bold text-sm">digitalnaani@gmail.com</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-base font-bold text-white">Visit Us</h3>
            <p class="text-slate-300 text-sm">Kondapur, Hyderabad, Telangana 500084, India</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Send a Property Enquiry</h2>
        <p class="text-slate-300 leading-relaxed">
          Tell us what type of property you are looking for in Hyderabad and our team can help you explore relevant options, request project information or enquire about a site visit.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Why Contact Naani Projects?</h2>
        <p class="text-slate-300 leading-relaxed">
          Naani Projects provides specialized Hyderabad real estate discovery, multiple housing categories (apartments, villas, plots, gated communities), side-by-side project comparison, easy WhatsApp enquiry flows, and transparent buyer assistance.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">How Our Property Enquiry Process Works</h2>
        <p class="text-slate-300">1. Share Requirements &nbsp;|&nbsp; 2. Explore Suitable Projects &nbsp;|&nbsp; 3. Compare Your Options &nbsp;|&nbsp; 4. Request Project Info &nbsp;|&nbsp; 5. Schedule a Site Visit</p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Hyderabad Areas We Serve</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm font-bold">
          <a href="/projects-in-kokapet" class="text-amber-400 hover:underline">Kokapet Projects</a>
          <a href="/projects-in-tellapur" class="text-amber-400 hover:underline">Tellapur Projects</a>
          <a href="/projects-in-gachibowli" class="text-amber-400 hover:underline">Gachibowli Projects</a>
          <a href="/projects-in-narsingi" class="text-amber-400 hover:underline">Narsingi Projects</a>
          <a href="/projects-in-kondapur" class="text-amber-400 hover:underline">Kondapur Projects</a>
          <a href="/projects-in-miyapur" class="text-amber-400 hover:underline">Miyapur Projects</a>
          <a href="/projects-in-bachupally" class="text-amber-400 hover:underline">Bachupally Projects</a>
          <a href="/projects-in-kollur" class="text-amber-400 hover:underline">Kollur Projects</a>
          <a href="/projects-in-tukkuguda" class="text-amber-400 hover:underline">Tukkuguda Projects</a>
          <a href="/projects-in-nallagandla" class="text-amber-400 hover:underline">Nallagandla Projects</a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Property Types You Can Explore</h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold">
          <a href="/hyderabad/2-bhk-flats" class="text-amber-400 hover:underline">2 BHK Flats in Hyderabad</a>
          <a href="/hyderabad/3-bhk-flats" class="text-amber-400 hover:underline">3 BHK Flats in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">Apartments in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">Villas in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">Plots in Hyderabad</a>
          <a href="/projects" class="text-amber-400 hover:underline">New Residential Projects</a>
          <a href="/projects" class="text-amber-400 hover:underline">Gated Community Projects</a>
          <a href="/hyderabad" class="hover:underline">Residential Projects</a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Hyderabad Real Estate Enquiries</h2>
        <p class="text-slate-300 leading-relaxed">
          Whether you are looking for apartments in Hyderabad, a villa in a gated community, a residential plot or a new project, Naani Projects provides a convenient way to explore property options across Hyderabad. Our team helps you review project details, compare neighborhood locations, and connect with verified builder representatives for site visit arrangements.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-lg font-bold text-white">How can I contact Naani Projects?</h3>
            <p class="text-slate-300 text-sm mt-1">Contact Naani Projects via WhatsApp at +91 97050 80909, call us directly at +91 97050 80909, email digitalnaani@gmail.com, or submit an online enquiry.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-lg font-bold text-white">What types of properties can I enquire about?</h3>
            <p class="text-slate-300 text-sm mt-1">Enquire about 2 BHK and 3 BHK apartments, luxury villas, gated community plots, new launches, and under-construction projects in Hyderabad.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800">
            <h3 class="text-lg font-bold text-white">Which areas of Hyderabad does Naani Projects cover?</h3>
            <p class="text-slate-300 text-sm mt-1">We cover Kokapet, Neopolis, Financial District, Gachibowli, Narsingi, Tellapur, Kondapur, HITECH City, Miyapur, Bachupally, Kollur, Tukkuguda, and Shamshabad.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Explore Hyderabad Properties</h2>
        <p class="text-slate-300">Browse active listings, compare locations, or speak directly with an advisor.</p>
        <div class="flex flex-wrap justify-center gap-6 text-sm font-semibold text-amber-400">
          <a href="/projects" class="hover:underline">Browse Projects</a>
          <a href="/about-us" class="hover:underline">About Naani Projects</a>
          <a href="/list-your-property" class="hover:underline">List Your Property</a>
          <a href="/hyderabad" class="hover:underline">Hyderabad Properties</a>
          <a href="/contact-us" class="hover:underline">Contact Us</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;

// Static pre-rendered crawlable HTML content for /projects-in-kokapet
const NEO_TOWERS_PRERENDER_HTML = `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.naani.in/projects/neo-towers-neopolis-kokapet#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
      { "@type": "ListItem", "position": 3, "name": "Hyderabad", "item": "https://www.naani.in/hyderabad" },
      { "@type": "ListItem", "position": 4, "name": "Kokapet", "item": "https://www.naani.in/projects-in-kokapet" },
      { "@type": "ListItem", "position": 5, "name": "Neo Towers", "item": "https://www.naani.in/projects/neo-towers-neopolis-kokapet" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": "https://www.naani.in/projects/neo-towers-neopolis-kokapet#project",
    "name": "Neo Towers",
    "url": "https://www.naani.in/projects/neo-towers-neopolis-kokapet",
    "description": "Neo Towers in Neopolis, Kokapet, Hyderabad. Discover 3 & 4 BHK residences, 57-storey towers, sky amenities, Club Neo, Sky Office, Skydeck and West Hyderabad connectivity.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 11, Neopolis, Kokapet, Gandipet",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500075",
      "addressCountry": "IN"
    },
    "telephone": "+919705080909",
    "developer": {
      "@type": "Organization",
      "name": "Yula Globus Developers LLP"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.naani.in/projects/neo-towers-neopolis-kokapet#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Neo Towers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neo Towers is an uber-premium high-rise residential development located in Plot No. 11, Neopolis, Kokapet, West Hyderabad. Spanning 4.36 acres, it features two iconic 57-storey towers offering luxurious 3 & 4 BHK residences, panoramic 180° views, Sky Office facilities, and Club Neo."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Neo Towers located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neo Towers is located at Plot No. 11, Neopolis, Kokapet, Gandipet, Telangana – 500075. It commands a prime position in West Hyderabad's high-tech corridor, offering direct access to ORR Exit 1A, Financial District, Gachibowli, and HITEC City."
        }
      },
      {
        "@type": "Question",
        "name": "Who is developing Neo Towers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neo Towers is developed by Yula Globus Developers LLP, combining the property development expertise of Yula Properties, Globus, and Meeka."
        }
      },
      {
        "@type": "Question",
        "name": "What configurations are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neo Towers offers large-format 3 BHK and 4 BHK uber-premium apartments."
        }
      },
      {
        "@type": "Question",
        "name": "What are the apartment sizes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Residences at Neo Towers range from approximately 2,235 sq.ft. for 3 BHK layouts up to 4,565 sq.ft. for expansive 4 BHK suites."
        }
      },
      {
        "@type": "Question",
        "name": "What is the RERA number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neo Towers is registered under Telangana RERA with registration number TG RERA P02400010006."
        }
      },
      {
        "@type": "Question",
        "name": "What amenities are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neo Towers features 40+ lifestyle amenities spread across Club Neo, outdoor sports grounds, convenience lobbies, and rooftop sky decks including tennis courts, swimming pools, pet parks, and crèche."
        }
      },
      {
        "@type": "Question",
        "name": "What is Club Neo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Club Neo is the dedicated social, wellness, and recreational clubhouse hub at Neo Towers, featuring fitness studios, indoor sports, lounges, clinic, crèche, and community event spaces."
        }
      },
      {
        "@type": "Question",
        "name": "What is Sky Office?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sky Office is a signature executive workplace amenity at Neo Towers providing private meeting pods, open sky co-working desks, executive boardrooms, plug & play workstations, and office suites for resident professionals."
        }
      },
      {
        "@type": "Question",
        "name": "What is Skydeck?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Skydeck is an elevated rooftop lifestyle deck situated atop the 57-storey twin towers featuring an Open Air Amphitheatre, 3 Telescopic Points, Surya Namaskar Lawn, Star-Map Deck, Sky Trail, Sky Gym, Fragrance Garden, and Sky Cafe."
        }
      },
      {
        "@type": "Question",
        "name": "How is Neo Towers connected to Financial District?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Financial District is located approximately 15–25 minutes from Neo Towers via the Neopolis ORR access network, providing quick daily commutes for corporate professionals."
        }
      },
      {
        "@type": "Question",
        "name": "How is Neo Towers connected to HITEC City?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HITEC City and Mindspace IT Park are accessible within an estimated 15–25 minute drive band depending on route and traffic conditions."
        }
      },
      {
        "@type": "Question",
        "name": "How can I get current pricing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Current pricing and availability can vary by configuration, floor, orientation and inventory. Contact Naani Projects at 9705080909 for the latest details."
        }
      },
      {
        "@type": "Question",
        "name": "How can I schedule a site visit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can click 'Schedule a Site Visit' on this page, or directly call or WhatsApp Naani Projects on 9705080909 to arrange a guided property tour."
        }
      }
    ]
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100 font-sans">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/projects-in-kokapet" class="hover:text-amber-400">Kokapet</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <nav aria-label="Breadcrumb" class="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
    <div class="max-w-7xl mx-auto flex items-center gap-2">
      <a href="/" class="hover:text-amber-400">Home</a>
      <span>/</span>
      <a href="/projects" class="hover:text-amber-400">Projects</a>
      <span>/</span>
      <a href="/hyderabad" class="hover:text-amber-400">Hyderabad</a>
      <span>/</span>
      <a href="/projects-in-kokapet" class="hover:text-amber-400">Kokapet</a>
      <span>/</span>
      <span class="text-amber-400 font-semibold">Neo Towers</span>
    </div>
  </nav>

  <main>
    <!-- 1. HERO SECTION -->
    <section class="relative py-16 lg:py-24 bg-[#090D16]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-8">
        <div class="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase">
          TG RERA P02400010006 • Neopolis, Kokapet
        </div>

        <div class="space-y-4 max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Neo Towers Neopolis, Kokapet, Hyderabad – <span class="text-amber-400">3 &amp; 4 BHK Luxury Apartments</span>
          </h1>
          <p class="text-xl sm:text-2xl font-semibold text-slate-200">
            3 &amp; 4 BHK Uber-Premium Apartments in Neopolis, Kokapet
          </p>
          <p class="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            2,235–4,565 sq.ft. Residences • A distinctive high-rise address combining expansive residences, panoramic views, elevated workspaces, sky-level amenities and the connectivity advantage of Neopolis.
          </p>
        </div>

        <div class="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl my-6">
          <img src="/assets/tower-a.webp" alt="Neo Towers luxury apartments in Neopolis Kokapet Hyderabad" width="1200" height="800" class="w-full h-[480px] object-cover" fetchpriority="high" />
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto pt-4">
          <div class="bg-[#0B101D] border border-amber-500/20 p-3.5 rounded-xl text-center">
            <span class="block text-xl font-black text-amber-400">57 Storeys</span>
            <span class="text-xs text-slate-400">Vertical Skyline Living</span>
          </div>
          <div class="bg-[#0B101D] border border-amber-500/20 p-3.5 rounded-xl text-center">
            <span class="block text-xl font-black text-amber-400">4.36 Acres</span>
            <span class="text-xs text-slate-400">Master-Planned Site</span>
          </div>
          <div class="bg-[#0B101D] border border-amber-500/20 p-3.5 rounded-xl text-center">
            <span class="block text-xl font-black text-amber-400">2 Towers</span>
            <span class="text-xs text-slate-400">Iconic Twin Architecture</span>
          </div>
          <div class="bg-[#0B101D] border border-amber-500/20 p-3.5 rounded-xl text-center">
            <span class="block text-xl font-black text-amber-400">2,235–4,565</span>
            <span class="text-xs text-slate-400">Sq.Ft. Residences</span>
          </div>
          <div class="col-span-2 sm:col-span-1 bg-[#0B101D] border border-amber-500/20 p-3.5 rounded-xl text-center">
            <span class="block text-xl font-black text-amber-400">180° Panoramas</span>
            <span class="text-xs text-slate-400">ORR &amp; Green Views</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I%20want%20to%20get%20current%20price%20for%20Neo%20Towers%20Neopolis%20Kokapet." target="_blank" rel="noopener noreferrer" class="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold shadow-xl text-sm sm:text-base">
            Get Current Price
          </a>
          <a href="tel:+919705080909" class="px-7 py-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 font-bold text-sm sm:text-base">
            Call +91 97050 80909
          </a>
          <a href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I%20want%20to%20schedule%20a%20site%20visit%20for%20Neo%20Towers." target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base">
            WhatsApp 9705080909
          </a>
        </div>
      </div>
    </section>

    <!-- 2. PROJECT FACT BOX -->
    <section class="py-12 bg-[#0B101D] border-y border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div class="bg-[#090D16] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span class="text-xs font-bold text-amber-400 uppercase tracking-widest block">Project Fact Sheet</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Neo Towers at a Glance</h2>
            </div>
            <div class="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              Project information last verified: August 2026
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Project Name</span>
              <span class="text-white font-bold text-base mt-0.5 block">Neo Towers</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Developer</span>
              <span class="text-white font-bold text-base mt-0.5 block">Yula Globus Developers LLP</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Location</span>
              <span class="text-white font-bold text-base mt-0.5 block">Neopolis, Kokapet, Hyderabad</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Project Type</span>
              <span class="text-white font-bold text-base mt-0.5 block">Uber-Premium Apartments</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Configurations</span>
              <span class="text-amber-400 font-bold text-base mt-0.5 block">3 &amp; 4 BHK</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Residence Size</span>
              <span class="text-white font-bold text-base mt-0.5 block">2,235–4,565 sq.ft.</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Project Area</span>
              <span class="text-white font-bold text-base mt-0.5 block">4.36 Acres</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Towers &amp; Floors</span>
              <span class="text-white font-bold text-base mt-0.5 block">2 Towers • 57 Storeys</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">RERA Number</span>
              <span class="text-amber-400 font-bold text-base mt-0.5 block">TG RERA P02400010006</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800">
              <span class="text-slate-400 block font-medium text-xs">Pricing</span>
              <span class="text-amber-300 font-bold text-base mt-0.5 block">Contact for current details</span>
            </div>
            <div class="bg-[#0B101D] p-4 rounded-xl border border-slate-800 sm:col-span-2">
              <span class="text-slate-400 block font-medium text-xs">Expected Possession</span>
              <span class="text-white font-bold text-base mt-0.5 block">[Confirm with client]</span>
            </div>
          </div>

          <p class="text-xs text-slate-400 italic text-center pt-2">
            Pricing and availability are subject to change. Contact Naani Projects on 9705080909 for current information.
          </p>
        </div>
      </div>
    </section>

    <!-- 3. PROJECT OVERVIEW -->
    <section class="py-16 md:py-24 bg-[#090D16]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7 space-y-6">
            <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Project Overview</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Neo Towers Overview</h2>
            <div class="prose prose-invert text-slate-300 space-y-4 text-base leading-relaxed">
              <p>
                Neo Towers is positioned as an uber-premium residential development in Neopolis, Kokapet, one of West Hyderabad's emerging high-end residential and business districts. The development spans approximately 4.36 acres and comprises two iconic 57-storey towers that define the modern high-rise skyline of West Hyderabad.
              </p>
              <p>
                Residences are offered in large-format 3 and 4 BHK configurations, with sizes ranging from approximately 2,235 to 4,565 sq.ft. The project is engineered around panoramic views, generous layout proportions, acoustic separation, privacy, high-rise architecture, elevated lifestyle, sky-level recreation, work-from-home/business facilities, wellness, and seamless connectivity to the Outer Ring Road (ORR), Financial District, Gachibowli, and HITEC City.
              </p>
              <p>
                The official project website specifically highlights 180° panoramas with views toward the ORR expressway corridor, the Hyderabad city skyline, and the protected green landscape of the 111 GO Green Reserve. View experience varies by tower, floor, orientation, and apartment position across the two towers.
              </p>
              <p>
                As Neopolis develops into a premier master-planned commercial and high-density residential zone, Neo Towers provides homebuyers and executives with an elevated lifestyle experience backed by Club Neo, Sky Office, and rooftop Skydeck amenities.
              </p>
            </div>
          </div>
          <div class="lg:col-span-5">
            <div class="rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img src="/assets/tower-b.jpg" alt="Neo Towers twin tower residential development in Neopolis Kokapet" width="1000" height="650" class="w-full h-[450px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. PROJECT HIGHLIGHTS -->
    <section class="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 space-y-4">
            <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Architectural Highlights</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Project Highlights</h2>
            <p class="text-slate-300 text-base leading-relaxed">
              Neo Towers introduces a vertical profile across two iconic 57-storey towers, delivering high-rise lifestyle positioning and an elevated skyline presence in Neopolis, Kokapet.
            </p>
            <div class="space-y-3 text-sm text-slate-300 pt-2">
              <div class="flex items-start gap-2 font-medium"><span class="text-amber-400">✔</span> <span><strong>57-Storey Twin-Tower Skyline:</strong> Landmark vertical architecture commanding views across West Hyderabad.</span></div>
              <div class="flex items-start gap-2 font-medium"><span class="text-amber-400">✔</span> <span><strong>180° Panoramic Views:</strong> Wider visual horizons toward ORR expressway, city skyline, and green reserves.</span></div>
              <div class="flex items-start gap-2 font-medium"><span class="text-amber-400">✔</span> <span><strong>111 GO Green Reserve Views:</strong> Unobstructed green perspectives protecting visual relief.</span></div>
              <div class="flex items-start gap-2 font-medium"><span class="text-amber-400">✔</span> <span><strong>Corner-Plot Positioning:</strong> Located at Plot No. 11, Neopolis for natural light and ventilation.</span></div>
            </div>
          </div>
          <div class="lg:col-span-6 bg-[#090D16] p-4 rounded-3xl border border-amber-500/20">
            <img src="/assets/color-building.png" alt="Neo Towers twin tower architecture in Neopolis Kokapet Hyderabad" width="800" height="600" class="w-full h-[320px] object-contain mx-auto" loading="lazy" />
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <span class="block text-2xl font-black text-white">4.36 Acres</span>
            <span class="text-xs text-slate-400 font-medium block">Project Land Area</span>
          </div>
          <div class="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <span class="block text-2xl font-black text-white">2 Towers</span>
            <span class="text-xs text-slate-400 font-medium block">Iconic Twin Architecture</span>
          </div>
          <div class="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <span class="block text-2xl font-black text-white">57 Storeys</span>
            <span class="text-xs text-slate-400 font-medium block">Vertical High-Rise Living</span>
          </div>
          <div class="bg-[#090D16] p-6 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <span class="block text-2xl font-black text-white">3 &amp; 4 BHK</span>
            <span class="text-xs text-slate-400 font-medium block">2,235–4,565 sq.ft.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. CLUB NEO SECTION -->
    <section class="py-16 md:py-24 bg-[#090D16]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 order-2 lg:order-1">
            <div class="rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img src="/assets/club-neo.png" alt="Club Neo amenities at Neo Towers Neopolis Kokapet" width="1000" height="650" class="w-full h-[480px] object-cover" loading="lazy" />
            </div>
          </div>
          <div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Recreation &amp; Wellness</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Club Neo at Neo Towers</h2>
            <p class="text-slate-300 text-base leading-relaxed">
              The official website positions Club Neo as a major lifestyle component and the social and recreational hub of the project, incorporating fitness, indoor sports, family facilities, and community lounges.
            </p>
            <p class="text-slate-300 text-base leading-relaxed">
              Club Neo provides a multi-level social ecosystem featuring fully equipped fitness studios, indoor badminton and squash courts, community event spaces, senior citizen lounges, an health clinic with physio suite, pharmacy, grocery store, and children's crèche.
            </p>
            <div class="pt-2">
              <a href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20I%20want%20details%20about%20Club%20Neo%20at%20Neo%20Towers." target="_blank" rel="noopener noreferrer" class="inline-block px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-md">
                Explore Club Neo Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. SKYDECK & ELEVATED LIFESTYLE -->
    <section class="py-16 md:py-24 bg-[#0B101D] border-y border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 space-y-6">
            <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Elevated Lifestyle</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Skydeck &amp; Elevated Lifestyle</h2>
            <p class="text-slate-300 text-base leading-relaxed">
              The official website highlights Skydeck as a signature rooftop experience atop the 57-storey twin towers featuring an Open Air Amphitheatre, 3 Telescopic Points, Surya Namaskar Lawn, Star-Map Deck, Sky Trail, Sky Gym, Fragrance Garden, and Sky Cafe.
            </p>
            <p class="text-slate-300 text-base leading-relaxed">
              Residents can experience sunrise yoga on the Surya Namaskar Lawn, morning runs on the Sky Trail walking track, workout sessions at the elevated Sky Gym, evening relaxation at Sky Cafe, and nighttime stargazing through high-powered astronomical telescopes.
            </p>
            <div class="pt-2">
              <a href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20please%20share%20Skydeck%20details%20for%20Neo%20Towers." target="_blank" rel="noopener noreferrer" class="inline-block px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-sm shadow-md">
                Get Amenity Details
              </a>
            </div>
          </div>
          <div class="lg:col-span-6">
            <div class="rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img src="/assets/skydeck.jpg" alt="Neo Towers Skydeck rooftop amenities in Neopolis Kokapet" width="1000" height="650" class="w-full h-[480px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. SKY OFFICE WORKSPACES -->
    <section class="py-16 md:py-20 bg-[#090D16]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Work Above The Ordinary</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Sky Office – Executive Workspaces</h2>
          <p class="text-slate-300 text-base">
            Integrated executive work facilities designed for resident professionals, remote executives, and business owners within Neo Towers.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <h3 class="text-base font-bold text-white">Private Meeting Pods</h3>
            <p class="text-xs text-slate-400">Acoustic pods for private client discussions and video calls.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <h3 class="text-base font-bold text-white">Open Sky Co-Working</h3>
            <p class="text-xs text-slate-400">Open deck workstations with panoramic city skyline views.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <h3 class="text-base font-bold text-white">Boardrooms</h3>
            <p class="text-xs text-slate-400">Fully wired presentation rooms for formal team meetings.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 text-center space-y-2">
            <h3 class="text-base font-bold text-white">Plug &amp; Play Desks</h3>
            <p class="text-xs text-slate-400">High-speed connectivity desks for independent work.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 text-center space-y-2 md:col-span-2 lg:col-span-1">
            <h3 class="text-base font-bold text-white">Executive Suites</h3>
            <p class="text-xs text-slate-400">Dedicated suites for business networking and collaboration.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. MASTER AMENITIES MATRIX -->
    <section class="py-16 md:py-24 bg-[#0B101D] border-y border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Master Amenity List</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Neo Towers Amenities</h2>
          <p class="text-slate-300 text-base">
            Verified amenities divided into lifestyle, wellness, recreation, community, outdoor, and sky-level experiences.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#090D16] p-6 rounded-3xl border border-amber-500/20 space-y-3">
            <h3 class="text-lg font-bold text-white border-b border-slate-800 pb-2">Outdoor &amp; Sports</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              <li>• Tennis Court</li>
              <li>• Pickleball Court</li>
              <li>• Half Basketball Court</li>
              <li>• Box Cricket</li>
              <li>• Multipurpose Lawn</li>
              <li>• Dedicated Pet Park</li>
              <li>• Fitness Strip</li>
            </ul>
          </div>
          <div class="bg-[#090D16] p-6 rounded-3xl border border-amber-500/20 space-y-3">
            <h3 class="text-lg font-bold text-white border-b border-slate-800 pb-2">Community &amp; Lobbies</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              <li>• Reception Lobbies</li>
              <li>• Clinic &amp; Physio Suite</li>
              <li>• Pharmacy &amp; Grocery Store</li>
              <li>• ATM Kiosk</li>
              <li>• Senior Citizen Lounge</li>
              <li>• Children's Crèche</li>
              <li>• Art Gallery</li>
            </ul>
          </div>
          <div class="bg-[#090D16] p-6 rounded-3xl border border-amber-500/20 space-y-3">
            <h3 class="text-lg font-bold text-white border-b border-slate-800 pb-2">Sky Office Workspaces</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              <li>• Private Meeting Pods</li>
              <li>• Open Sky Co-Working</li>
              <li>• Wired Boardrooms</li>
              <li>• Plug &amp; Play Workstations</li>
              <li>• Executive Office Suites</li>
            </ul>
          </div>
          <div class="bg-[#090D16] p-6 rounded-3xl border border-amber-500/20 space-y-3">
            <h3 class="text-lg font-bold text-white border-b border-slate-800 pb-2">Sky-Level Experiences</h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              <li>• Open Air Amphitheatre</li>
              <li>• Telescope Points ×3</li>
              <li>• Surya Namaskar Lawn</li>
              <li>• Star-Map Deck</li>
              <li>• Sky Trail &amp; Sky Gym</li>
              <li>• Fragrance Garden</li>
              <li>• Sky Cafe</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. DEDICATED FLOOR PLANS SECTION -->
    <section class="py-16 md:py-24 bg-[#090D16]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Architectural Drawings</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Neo Towers Floor Plans</h2>
          <p class="text-slate-300 text-base">
            Explore high-resolution layout drawings for 3 &amp; 4 BHK residences at Neo Towers.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-[#0B101D] p-6 rounded-3xl border border-amber-500/20 space-y-4">
            <h3 class="text-lg font-bold text-white">Neo Towers 3 BHK Apartment Floor Plan</h3>
            <p class="text-xs text-slate-400">Ranging from approximately 2,235 sq.ft. featuring spacious living rooms, wide balconies, and utility areas.</p>
            <img src="/assets/floor-plan-1.jpg" alt="Neo Towers 3 BHK apartment floor plan" width="800" height="600" class="w-full h-[360px] object-contain mx-auto bg-white p-2 rounded-2xl" loading="lazy" />
            <div class="pt-2 text-right">
              <a href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20please%20send%203%20BHK%20floor%20plan%20for%20Neo%20Towers." target="_blank" rel="noopener noreferrer" class="inline-block px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                Request Detailed Floor Plan
              </a>
            </div>
          </div>
          <div class="bg-[#0B101D] p-6 rounded-3xl border border-amber-500/20 space-y-4">
            <h3 class="text-lg font-bold text-white">Neo Towers 4 BHK Apartment Floor Plan</h3>
            <p class="text-xs text-slate-400">Up to approximately 4,565 sq.ft. featuring grand entry foyer, family lounge, servant room, and panoramic view deck.</p>
            <img src="/assets/floor-plan-2.jpg" alt="Neo Towers 4 BHK apartment floor plan" width="800" height="600" class="w-full h-[360px] object-contain mx-auto bg-white p-2 rounded-2xl" loading="lazy" />
            <div class="pt-2 text-right">
              <a href="https://wa.me/919705080909?text=Hi%20Naani%20Projects%2C%20please%20send%204%20BHK%20floor%20plan%20for%20Neo%20Towers." target="_blank" rel="noopener noreferrer" class="inline-block px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                Request Detailed Floor Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 10. PROJECT GALLERY -->
    <section class="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Project Showcase</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Neo Towers Project Gallery</h2>
          <p class="text-slate-300 text-base">
            Complete collection of verified Neo Towers project elevation, clubhouse, skydeck, and floor plan images.
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-[#090D16] p-3 rounded-2xl border border-slate-800">
            <img src="/assets/tower-a.webp" alt="Neo Towers luxury apartments in Neopolis Kokapet Hyderabad" width="600" height="400" class="w-full h-56 object-cover rounded-xl" loading="lazy" />
            <p class="text-xs font-bold text-white mt-2">Tower A Exterior Elevation</p>
          </div>
          <div class="bg-[#090D16] p-3 rounded-2xl border border-slate-800">
            <img src="/assets/tower-b.jpg" alt="Neo Towers twin tower residential development in Neopolis Kokapet" width="600" height="400" class="w-full h-56 object-cover rounded-xl" loading="lazy" />
            <p class="text-xs font-bold text-white mt-2">Tower B Skyline View</p>
          </div>
          <div class="bg-[#090D16] p-3 rounded-2xl border border-slate-800">
            <img src="/assets/color-building.png" alt="Neo Towers twin tower architecture in Neopolis Kokapet Hyderabad" width="600" height="400" class="w-full h-56 object-contain rounded-xl" loading="lazy" />
            <p class="text-xs font-bold text-white mt-2">Twin Tower Architectural Profile</p>
          </div>
          <div class="bg-[#090D16] p-3 rounded-2xl border border-slate-800">
            <img src="/assets/club-neo.png" alt="Club Neo amenities at Neo Towers Neopolis Kokapet" width="600" height="400" class="w-full h-56 object-cover rounded-xl" loading="lazy" />
            <p class="text-xs font-bold text-white mt-2">Club Neo Clubhouse Hub</p>
          </div>
          <div class="bg-[#090D16] p-3 rounded-2xl border border-slate-800">
            <img src="/assets/skydeck.jpg" alt="Neo Towers Skydeck rooftop amenities in Neopolis Kokapet" width="600" height="400" class="w-full h-56 object-cover rounded-xl" loading="lazy" />
            <p class="text-xs font-bold text-white mt-2">Skydeck Rooftop Experience</p>
          </div>
          <div class="bg-[#090D16] p-3 rounded-2xl border border-slate-800">
            <img src="/assets/floor-plan-1.jpg" alt="Neo Towers 3 BHK apartment floor plan" width="600" height="400" class="w-full h-56 object-contain rounded-xl bg-white p-1" loading="lazy" />
            <p class="text-xs font-bold text-white mt-2">3 BHK Unit Floor Plan</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 11. LOCATION & CONNECTIVITY -->
    <section class="py-16 md:py-24 bg-[#090D16]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
          <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Prime West Hyderabad</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Neo Towers Location &amp; Connectivity</h2>
          <p class="text-slate-300 text-base">
            Positioned in Neopolis, Kokapet, offering high-rise connectivity advantage across West Hyderabad.
          </p>
        </div>

        <div class="prose prose-invert max-w-none text-slate-300 space-y-6 text-base leading-relaxed font-normal">
          <p>
            Neopolis, Kokapet has emerged as West Hyderabad's master-planned high-rise skyline district. Characterized by wide arterial grid roads, underground utility networks, commercial high-rises, and prime residential developments, Neopolis offers direct access to the Outer Ring Road (ORR) expressway network.
          </p>
          <p>
            Positioned near ORR Exit 1A, Neo Towers provides seamless transit toward Financial District, Gachibowli, HITEC City, and Mindspace IT Park. Contact Naani Projects for the latest location and connectivity details.
          </p>
        </div>

        <div class="overflow-x-auto bg-[#0B101D] rounded-2xl border border-amber-500/20 p-4">
          <h3 class="text-lg font-bold text-white mb-4 px-2">Location Connectivity Table</h3>
          <table class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="border-b border-slate-800 text-amber-400 font-bold uppercase text-xs">
                <th class="py-3 px-4">Destination</th>
                <th class="py-3 px-4 text-right">Approximate Project-Published Range</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-slate-300 text-xs sm:text-sm">
              <tr><td class="py-3 px-4 font-semibold text-white">ORR Exit 1A</td><td class="py-3 px-4 text-right text-amber-300 font-bold">Immediate expressway route</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">Financial District</td><td class="py-3 px-4 text-right text-amber-300 font-bold">15–25 min</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">HITEC City IT Park</td><td class="py-3 px-4 text-right text-amber-300 font-bold">15–25 min</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">Mindspace IT Park</td><td class="py-3 px-4 text-right text-amber-300 font-bold">15–25 min</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">Rajiv Gandhi International Airport</td><td class="py-3 px-4 text-right text-amber-300 font-bold">1–30 min category</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">Oakridge International School</td><td class="py-3 px-4 text-right text-amber-300 font-bold">10–22 min category</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">DPS Khajaguda</td><td class="py-3 px-4 text-right text-amber-300 font-bold">10–22 min category</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">AIG Hospitals</td><td class="py-3 px-4 text-right text-amber-300 font-bold">15–25 min category</td></tr>
              <tr><td class="py-3 px-4 font-semibold text-white">Inorbit Mall / IKEA Hyderabad</td><td class="py-3 px-4 text-right text-amber-300 font-bold">20–25 min category</td></tr>
            </tbody>
          </table>
          <p class="text-[11px] text-slate-400 mt-3 italic text-center">
            Travel times are approximate, based on project-published location information, and may vary depending on traffic, route and time of day. Contact Naani Projects for the latest location and connectivity details.
          </p>
        </div>
      </div>
    </section>

    <!-- 12. DEVELOPER & RERA -->
    <section class="py-16 md:py-24 bg-[#0B101D] border-t border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-4 bg-[#090D16] p-8 rounded-3xl border border-amber-500/20">
            <h2 class="text-2xl font-bold text-white">About the Project Developers</h2>
            <p class="text-slate-300 text-sm leading-relaxed">
              The official website displays Yula Properties, Globus, and Meeka as project-related brands/partners and identifies Yula Globus Developers LLP in the project information.
            </p>
            <p class="text-xs text-slate-400">Site Address: Plot No. 11, Neopolis, Kokapet, Gandipet, Telangana – 500075.</p>
          </div>
          <div class="space-y-4 bg-[#090D16] p-8 rounded-3xl border border-amber-500/20">
            <h2 class="text-2xl font-bold text-white">RERA Registration</h2>
            <p class="text-xl font-bold text-amber-400">TG RERA P02400010006</p>
            <p class="text-xs text-slate-300">Buyers should independently verify registration, approved plans, and status on the official Telangana RERA portal.</p>
            <a href="https://rera.telangana.gov.in/" target="_blank" rel="noopener noreferrer" class="inline-block text-xs text-amber-400 font-bold hover:underline">Verify on Telangana RERA Portal →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 13. HOMEBUYER PERSPECTIVE -->
    <section class="py-16 md:py-20 bg-[#090D16]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <div class="text-center max-w-3xl mx-auto space-y-2">
          <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Buyer Analysis</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Who Could Consider Neo Towers?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#0B101D] p-6 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="text-lg font-bold text-white">For Families</h3>
            <p class="text-xs text-slate-300 leading-relaxed">Large 3 &amp; 4 BHK formats, Club Neo recreation, clinic, and crèche facilities appeal to growing families.</p>
          </div>
          <div class="bg-[#0B101D] p-6 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="text-lg font-bold text-white">For Professionals</h3>
            <p class="text-xs text-slate-300 leading-relaxed">Sky Office meeting pods, co-working decks, and quick Financial District commutes benefit executives.</p>
          </div>
          <div class="bg-[#0B101D] p-6 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="text-lg font-bold text-white">For Lifestyle Buyers</h3>
            <p class="text-xs text-slate-300 leading-relaxed">Rooftop Skydeck, 57-storey high-rise skyline views, and sky trails offer a signature elevated experience.</p>
          </div>
          <div class="bg-[#0B101D] p-6 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="text-lg font-bold text-white">For Large-Home Buyers</h3>
            <p class="text-xs text-slate-300 leading-relaxed">Generous residence sizing from 2,235 to 4,565 sq.ft. provides ample living separation.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 14. INTERNAL LINKS -->
    <section class="py-16 md:py-20 bg-[#0B101D] border-t border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl font-bold text-white">Compare Neo Towers With Premium Projects in West Hyderabad</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-semibold text-amber-400">
          <a href="/projects-in-neopolis" class="hover:underline">Explore Projects in Neopolis</a>
          <a href="/projects-in-kokapet" class="hover:underline">Compare Apartments in Kokapet</a>
          <a href="/projects-in-financial-district" class="hover:underline">Flats Near Financial District</a>
          <a href="/projects/the-cascades-neopolis" class="hover:underline">The Cascades Neopolis</a>
          <a href="/projects/rise-with-9-neopolis-kokapet" class="hover:underline">Rise With 9 Neopolis</a>
          <a href="/projects/linq-by-raghava-neopolis" class="hover:underline">LINQ by Raghava</a>
        </div>
      </div>
    </section>

    <!-- 15. FAQS SECTION -->
    <section class="py-16 md:py-24 bg-[#090D16]">
      <div class="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest">Informational Guide</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p class="text-slate-300 text-base">Clear answers to essential questions about Neo Towers in Neopolis, Kokapet.</p>
        </div>

        <div class="space-y-4 text-sm">
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What is Neo Towers?</h3>
            <p class="text-slate-300 leading-relaxed">Neo Towers is an uber-premium high-rise residential development located in Plot No. 11, Neopolis, Kokapet, West Hyderabad. Spanning 4.36 acres, it features two iconic 57-storey towers offering luxurious 3 &amp; 4 BHK residences, panoramic 180° views, Sky Office facilities, and Club Neo.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">Where is Neo Towers located?</h3>
            <p class="text-slate-300 leading-relaxed">Neo Towers is located at Plot No. 11, Neopolis, Kokapet, Gandipet, Telangana – 500075. It commands a prime position in West Hyderabad's high-tech corridor, offering direct access to ORR Exit 1A, Financial District, Gachibowli, and HITEC City.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">Who is developing Neo Towers?</h3>
            <p class="text-slate-300 leading-relaxed">Neo Towers is developed by Yula Globus Developers LLP, combining the property development expertise of Yula Properties, Globus, and Meeka.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What configurations are available?</h3>
            <p class="text-slate-300 leading-relaxed">Neo Towers offers large-format 3 BHK and 4 BHK uber-premium apartments.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What are the apartment sizes?</h3>
            <p class="text-slate-300 leading-relaxed">Residences at Neo Towers range from approximately 2,235 sq.ft. for 3 BHK layouts up to 4,565 sq.ft. for expansive 4 BHK suites.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What is the RERA number?</h3>
            <p class="text-slate-300 leading-relaxed">Neo Towers is registered under Telangana RERA with registration number TG RERA P02400010006.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What amenities are available?</h3>
            <p class="text-slate-300 leading-relaxed">Neo Towers features 40+ lifestyle amenities spread across Club Neo, outdoor sports grounds, convenience lobbies, and rooftop sky decks including tennis courts, swimming pools, pet parks, and crèche.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What is Club Neo?</h3>
            <p class="text-slate-300 leading-relaxed">Club Neo is the dedicated social, wellness, and recreational clubhouse hub at Neo Towers, featuring fitness studios, indoor sports, lounges, clinic, crèche, and community event spaces.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What is Sky Office?</h3>
            <p class="text-slate-300 leading-relaxed">Sky Office is a signature executive workplace amenity at Neo Towers providing private meeting pods, open sky co-working desks, executive boardrooms, plug &amp; play workstations, and office suites for resident professionals.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">What is Skydeck?</h3>
            <p class="text-slate-300 leading-relaxed">Skydeck is an elevated rooftop lifestyle deck situated atop the 57-storey twin towers featuring an Open Air Amphitheatre, 3 Telescopic Points, Surya Namaskar Lawn, Star-Map Deck, Sky Trail, Sky Gym, Fragrance Garden, and Sky Cafe.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">How is Neo Towers connected to Financial District?</h3>
            <p class="text-slate-300 leading-relaxed">Financial District is located approximately 15–25 minutes from Neo Towers via the Neopolis ORR access network, providing quick daily commutes for corporate professionals.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">How is Neo Towers connected to HITEC City?</h3>
            <p class="text-slate-300 leading-relaxed">HITEC City and Mindspace IT Park are accessible within an estimated 15–25 minute drive band depending on route and traffic conditions.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">How can I get current pricing?</h3>
            <p class="text-slate-300 leading-relaxed">Current pricing and availability can vary by configuration, floor, orientation and inventory. Contact Naani Projects at 9705080909 for the latest details.</p>
          </div>
          <div class="bg-[#0B101D] p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 class="font-bold text-white text-base">How can I schedule a site visit?</h3>
            <p class="text-slate-300 leading-relaxed">You can click 'Schedule a Site Visit' on this page, or directly call or WhatsApp Naani Projects on 9705080909 to arrange a guided property tour.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 16. SOURCE METHODOLOGY & DISCLAIMER -->
    <section class="py-8 bg-[#070A11] border-t border-slate-800 text-slate-400 text-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-2">
        <p>
          <strong>Information Source:</strong> Project information has been compiled primarily from the official Neo Towers project website and publicly available regulatory information. Project specifications, availability, plans and other details may change. Buyers should independently verify current information with the promoter and Telangana RERA before making a purchase decision.
        </p>
        <p>
          <strong>RERA Disclaimer:</strong> Neo Towers is presented with Telangana RERA registration number TG RERA P02400010006. Contact sales support on 9705080909 for verified documentation.
        </p>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;

// Static pre-rendered crawlable HTML content for /projects/trump-towers-hyderabad-kokapet
const TRUMP_TOWERS_PRERENDER_HTML = `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.naani.in/projects/trump-towers-hyderabad-kokapet#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.naani.in/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.naani.in/projects" },
      { "@type": "ListItem", "position": 3, "name": "Hyderabad", "item": "https://www.naani.in/hyderabad" },
      { "@type": "ListItem", "position": 4, "name": "Kokapet", "item": "https://www.naani.in/projects-in-kokapet" },
      { "@type": "ListItem", "position": 5, "name": "Trump Towers Hyderabad", "item": "https://www.naani.in/projects/trump-towers-hyderabad-kokapet" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": "https://www.naani.in/projects/trump-towers-hyderabad-kokapet#project",
    "name": "Trump Towers Hyderabad",
    "url": "https://www.naani.in/projects/trump-towers-hyderabad-kokapet",
    "image": "https://www.naani.in/assets/trump-towers/hero.jpg",
    "description": "Explore Trump Towers Hyderabad in Kokapet's Golden Mile. Discover 65-storey twin towers, private elevators, large-format residences, the three-level Trump Club and West Hyderabad connectivity.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Golden Mile, Kokapet, Gandipet",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500075",
      "addressCountry": "IN"
    },
    "telephone": "+919705080909",
    "developer": {
      "@type": "Organization",
      "name": "Ira The Edge Developers LLP"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.naani.in/projects/trump-towers-hyderabad-kokapet#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Trump Towers Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trump Towers Hyderabad is an ultra-luxury branded residential development located in Golden Mile, Kokapet, Hyderabad. Spanning approximately 4.04 acres, it features two iconic 65-storey towers offering 3.5, 4, 4.5, and 6 BHK sky residences with private elevators and a three-level floating Trump Club."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Trump Towers Hyderabad located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trump Towers Hyderabad is located in Golden Mile, Kokapet, Gandipet Mandal, Hyderabad, Telangana – 500075. It is situated adjacent to Neopolis and Financial District with direct connectivity to ORR Exit 1A."
        }
      },
      {
        "@type": "Question",
        "name": "Who is the developer and promoter of Trump Towers Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The official developer and promoter registered under Telangana RERA is Ira The Edge Developers LLP. Tribeca Developers is the official development and brand partner."
        }
      },
      {
        "@type": "Question",
        "name": "Is Trump Towers Hyderabad owned or developed by Donald Trump?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Trump Towers Hyderabad is not owned, developed or sold by Donald J. Trump, The Trump Organization or any of their affiliates. Ira The Edge Developers LLP is the developer and promoter and uses the “Trump” name and mark under licence from DT Marks Hyderabad LLC."
        }
      },
      {
        "@type": "Question",
        "name": "What is the RERA registration number for Trump Towers Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The project is registered with Telangana RERA under registration number P02400010871 (HMDA permit no. 2128/HMDA/SWBP/2026)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the RERA completion date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The registered RERA completion date is 15 May 2031. Buyers should independently verify possession terms against official RERA filings and agreement documents."
        }
      }
    ]
  }
]
</script>

<div class="min-h-screen bg-[#070A11] text-slate-100 font-sans">
  <main className="pt-20">
    <section class="relative py-16 bg-[#0B101D] border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <span class="px-3.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">Ultra-Luxury Branded Residences</span>
        <h1 class="text-4xl sm:text-6xl font-extrabold text-white">Trump Towers Hyderabad, Kokapet – Ultra-Luxury Branded Residences</h1>
        <p class="text-xl font-semibold text-slate-200">Ultra-Luxury Branded Residences in Kokapet's Golden Mile</p>
        <p class="text-slate-300 text-base max-w-3xl leading-relaxed">
          A landmark twin-tower residential development rising up to 65 storeys, combining expansive residences, private elevators, private decks and a three-level floating Trump Club in one of West Hyderabad's premium residential corridors.
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-4">
          <div class="bg-[#070A11] p-3.5 rounded-xl border border-slate-800 text-center"><span class="block text-lg font-bold text-amber-400">Up to 65 Storeys</span><span class="text-xs text-slate-400">Vertical Skyline Icon</span></div>
          <div class="bg-[#070A11] p-3.5 rounded-xl border border-slate-800 text-center"><span class="block text-lg font-bold text-amber-400">Approx. 4.04 Acres</span><span class="text-xs text-slate-400">Master-Planned Site</span></div>
          <div class="bg-[#070A11] p-3.5 rounded-xl border border-slate-800 text-center"><span class="block text-lg font-bold text-amber-400">2 Towers</span><span class="text-xs text-slate-400">Twin Architecture</span></div>
          <div class="bg-[#070A11] p-3.5 rounded-xl border border-slate-800 text-center"><span class="block text-lg font-bold text-emerald-400">P02400010871</span><span class="text-xs text-slate-400">Telangana RERA</span></div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#070A11]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <h2 class="text-3xl font-extrabold text-white">Trump Towers Hyderabad at a Glance</h2>
        <table class="w-full text-left text-sm text-slate-300 border border-slate-800">
          <tbody class="divide-y divide-slate-800">
            <tr><td class="py-3 px-4 font-bold text-white">Project</td><td class="py-3 px-4">Trump Towers Hyderabad</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">Location</td><td class="py-3 px-4">Golden Mile, Kokapet, Hyderabad, Telangana – 500075</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">Promoter</td><td class="py-3 px-4">Ira The Edge Developers LLP</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">Development Partner</td><td class="py-3 px-4">Tribeca Developers</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">RERA No.</td><td class="py-3 px-4 font-mono font-bold text-emerald-400">P02400010871</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">RERA Completion Date</td><td class="py-3 px-4 font-bold text-amber-300">15 May 2031</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">Site Area</td><td class="py-3 px-4">16,389.76 sq.m. (Approx. 4.04 Acres)</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">Configurations</td><td class="py-3 px-4">3.5, 4, 4.5 &amp; 6 BHK Formats (3,600–12,000 sq.ft.)</td></tr>
            <tr><td class="py-3 px-4 font-bold text-white">Residential Units</td><td class="py-3 px-4 font-bold text-amber-400">[Verify against current RERA certificate]</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="py-16 bg-[#0B101D]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 text-slate-300 text-base leading-relaxed">
        <h2 class="text-3xl font-extrabold text-white">Comprehensive Project Overview</h2>
        <p>Trump Towers Hyderabad brings a global branded-residential concept to Kokapet's Golden Mile, placing a highly amenity-rich luxury development within West Hyderabad's premium residential corridor.</p>
        <p>Spanning approximately 4.04 acres, Trump Towers Hyderabad features two iconic 65-storey residential towers designed to command an unmistakable presence on West Hyderabad's skyline. Developed by Ira The Edge Developers LLP in partnership with Tribeca Developers, the project introduces a high-elevation architectural form paired with large-format 3.5, 4, 4.5, and 6 BHK residences ranging from approximately 3,600 sq.ft. to 12,000 sq.ft.</p>
        <p>Every residence is conceived around maximum privacy and grand living proportions. Highlights include dedicated private elevator entry directly into individual apartments, expansive floor-to-ceiling double-glazed window walls, private outdoor decks with panoramic vistas over the Golden Mile, and meticulously engineered room layouts designed for high-end bespoke interior customization.</p>
      </div>
    </section>

    <section class="py-16 bg-[#070A11] border-t border-slate-800 text-xs text-slate-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 space-y-2">
        <p><strong>Official Brand Licensing Disclaimer:</strong> Trump Towers Hyderabad is not owned, developed or sold by Donald J. Trump, The Trump Organization or any of their affiliates. Ira The Edge Developers LLP is the developer and promoter of the property and uses the “Trump” name and mark under licence from DT Marks Hyderabad LLC, subject to the applicable agreement.</p>
        <p><strong>RERA Notice:</strong> TG RERA Reg. No. P02400010871. RERA completion date: 15 May 2031. Contact sales support on 9705080909 for verified documentation.</p>
      </div>
    </section>
  </main>
</div>`;

const KOKAPET_PRERENDER_HTML = `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.naani.in/projects-in-kokapet#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.naani.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://www.naani.in/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Kokapet",
        "item": "https://www.naani.in/projects-in-kokapet"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.naani.in/projects-in-kokapet#webpage",
    "url": "https://www.naani.in/projects-in-kokapet",
    "name": "Projects in Kokapet, Hyderabad | Apartments & Homes | Naani Projects",
    "description": "Compare residential projects, apartments, and gated layouts in Kokapet, Hyderabad. View floor plans, location advantages, and project details.",
    "isPartOf": {
      "@id": "https://www.naani.in/#website"
    },
    "about": {
      "@id": "https://www.naani.in/#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://www.naani.in/projects-in-kokapet#itemlist",
    "name": "Projects in Kokapet, Hyderabad",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://www.naani.in/projects/brigade-gateway-neopolis-kokapet-hyderabad",
        "name": "Brigade Gateway Neopolis"
      }
    ]
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="hover:text-amber-400">About Us</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <nav aria-label="Breadcrumb" class="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
    <div class="max-w-6xl mx-auto flex items-center gap-2">
      <a href="/" class="hover:text-amber-400">Home</a>
      <span>/</span>
      <a href="/projects" class="hover:text-amber-400">Projects</a>
      <span>/</span>
      <span class="text-amber-400 font-medium">Kokapet</span>
    </div>
  </nav>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Hyderabad Properties</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Projects in Kokapet – <span class="text-amber-400">Luxury Apartments &amp; Homes</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          Kokapet is a major residential hub in West Hyderabad, located close to the Financial District and Neopolis SEZ, featuring multi-tower apartment developments and gated communities.
        </p>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <a href="https://wa.me/919705080909?text=Hi%2C%20share%20top%20projects%20in%20Kokapet%2C%20Hyderabad." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg">
            WhatsApp for Kokapet Projects
          </a>
          <a href="tel:+919705080909" class="px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm">
            Call +91 97050 80909
          </a>
          <a href="https://wa.me/919705080909?text=Hi%2C%20I%20want%20to%20book%20a%20site%20visit%20in%20Kokapet." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm">
            Book Site Visit
          </a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-center">
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Active Projects</p>
            <p class="font-bold text-amber-400 text-lg">1+</p>
          </div>
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Configurations</p>
            <p class="font-bold text-white text-lg">2/3/4/5/6 BHK</p>
          </div>
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Location</p>
            <p class="font-bold text-white text-lg">Kokapet, HYD</p>
          </div>
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Possession</p>
            <p class="font-bold text-white text-lg">2025–2028</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Featured Projects in Kokapet</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-4">
            <div class="space-y-1">
              <span class="text-xs font-bold text-amber-400 uppercase">Kokapet, Hyderabad</span>
              <h3 class="text-xl font-bold text-white">
                <a href="/projects/brigade-gateway-neopolis-kokapet-hyderabad" class="hover:text-amber-400">Brigade Gateway Neopolis</a>
              </h3>
              <p class="text-xs text-slate-400">By Brigade Group</p>
            </div>
            <p class="text-slate-300 text-sm">Luxury 3, 4, 5 &amp; 6 BHK apartments in Neopolis, Kokapet, Hyderabad with sky-high towers and world-class amenities.</p>
            <div class="pt-2">
              <a href="/projects/brigade-gateway-neopolis-kokapet-hyderabad" class="inline-block px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500/20">
                View Project Details →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Why Buy Property in Kokapet?</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Strong builder presence and RERA-approved launches in Kokapet.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Excellent ORR / Metro / IT-corridor connectivity from Kokapet.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Strong appreciation and 3-4% rental yields for premium 2 &amp; 3 BHK stock.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Top schools, hospitals and retail catchment within 5 km of Kokapet.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Naani Projects gets you builder-direct pricing — no buyer brokerage.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Verified inventory, exclusive launch alerts and WhatsApp-first support.
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Explore Similar Locations</h2>
        <div class="flex flex-wrap gap-3">
          <a href="/projects-in-narsingi" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Narsingi</a>
          <a href="/projects-in-financial-district" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Financial District</a>
          <a href="/projects-in-gachibowli" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Gachibowli</a>
          <a href="/projects-in-neopolis" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Neopolis</a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <div class="space-y-4 max-w-4xl">
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Why consider buying property in Kokapet, Hyderabad?</h3>
            <p class="text-slate-300 text-sm">Kokapet offers convenient access to IT corridors, Outer Ring Road connectivity, and growing social infrastructure, making it a popular choice for homebuyers and investors.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">What is the price range for apartments in Kokapet?</h3>
            <p class="text-slate-300 text-sm">Property prices in Kokapet vary based on builder, BHK configuration, floor area, and amenities. Contact Naani Projects on WhatsApp for updated pricing on specific projects.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Which developers have active projects in Kokapet?</h3>
            <p class="text-slate-300 text-sm">Developers active in Kokapet include Aparna, Brigade, Prestige, My Home, Rajapushpa, Candeur, Anuhar, and Team4. You can compare their floor plans and status on Naani Projects.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Are ready-to-move flats available in Kokapet?</h3>
            <p class="text-slate-300 text-sm">Yes, Kokapet has both ready-to-move and under-construction projects. Share your preferred timeline on WhatsApp at +91 97050 80909 to get matching options.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Is Kokapet suitable for rental income?</h3>
            <p class="text-slate-300 text-sm">Kokapet sees regular rental interest due to its proximity to IT hubs and office corridors. Rental returns depend on unit size, furnishings, and project location.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">How can I schedule a site visit in Kokapet?</h3>
            <p class="text-slate-300 text-sm">Select any project on our website or message +91 97050 80909 on WhatsApp with your preferred date and time to arrange a site visit.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Do buyers pay any advisory fees to Naani Projects?</h3>
            <p class="text-slate-300 text-sm">No, our project discovery and advisory service is free for homebuyers.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-[#0B101D]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Explore Hyderabad Properties</h2>
        <p class="text-slate-300">Browse active listings, compare locations, or speak directly with an advisor.</p>
        <div class="flex flex-wrap justify-center gap-6 text-sm font-semibold text-amber-400">
          <a href="/projects" class="hover:underline">Browse Projects</a>
          <a href="/hyderabad" class="hover:underline">Hyderabad Properties</a>
          <a href="/hyderabad/2-bhk-flats" class="hover:underline">2 BHK Flats in Hyderabad</a>
          <a href="/hyderabad/3-bhk-flats" class="hover:underline">3 BHK Flats in Hyderabad</a>
          <a href="/about-us" class="hover:underline">About Naani Projects</a>
          <a href="/list-your-property" class="hover:underline">List Your Property</a>
          <a href="/contact-us" class="hover:underline">Contact Us</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;

// Static pre-rendered crawlable HTML content for /projects-in-tellapur
const TELLAPUR_PRERENDER_HTML = `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.naani.in/projects-in-tellapur#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.naani.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://www.naani.in/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Tellapur",
        "item": "https://www.naani.in/projects-in-tellapur"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.naani.in/projects-in-tellapur#webpage",
    "url": "https://www.naani.in/projects-in-tellapur",
    "name": "Projects in Tellapur, Hyderabad | Apartments & Homes | Naani Projects",
    "description": "Compare residential projects, apartments, and gated layouts in Tellapur, Hyderabad. View floor plans, location advantages, and project details.",
    "isPartOf": {
      "@id": "https://www.naani.in/#website"
    },
    "about": {
      "@id": "https://www.naani.in/#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://www.naani.in/projects-in-tellapur#itemlist",
    "name": "Projects in Tellapur, Hyderabad",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://www.naani.in/projects/prestige-golden-grove-hyderabad",
        "name": "Prestige Golden Grove"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://www.naani.in/projects/rajapushpa-sierra-tellapur-hyderabad",
        "name": "Rajapushpa Sierra"
      }
    ]
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="hover:text-amber-400">About Us</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <nav aria-label="Breadcrumb" class="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
    <div class="max-w-6xl mx-auto flex items-center gap-2">
      <a href="/" class="hover:text-amber-400">Home</a>
      <span>/</span>
      <a href="/projects" class="hover:text-amber-400">Projects</a>
      <span>/</span>
      <span class="text-amber-400 font-medium">Tellapur</span>
    </div>
  </nav>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Hyderabad Properties</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Projects in Tellapur – <span class="text-amber-400">Luxury Apartments &amp; Homes</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          Tellapur is a growing residential corridor in West Hyderabad, popular with families seeking gated communities with access to the ORR and nearby international schools.
        </p>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <a href="https://wa.me/919705080909?text=Hi%2C%20share%20top%20projects%20in%20Tellapur%2C%20Hyderabad." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg">
            WhatsApp for Tellapur Projects
          </a>
          <a href="tel:+919705080909" class="px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm">
            Call +91 97050 80909
          </a>
          <a href="https://wa.me/919705080909?text=Hi%2C%20I%20want%20to%20book%20a%20site%20visit%20in%20Tellapur." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm">
            Book Site Visit
          </a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-center">
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Active Projects</p>
            <p class="font-bold text-amber-400 text-lg">2+</p>
          </div>
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Configurations</p>
            <p class="font-bold text-white text-lg">2/3/4 BHK</p>
          </div>
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Location</p>
            <p class="font-bold text-white text-lg">Tellapur, HYD</p>
          </div>
          <div class="p-4 rounded-xl bg-[#0F1629] border border-slate-800">
            <p class="text-xs text-slate-400">Possession</p>
            <p class="font-bold text-white text-lg">2025–2028</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Featured Projects in Tellapur</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-4">
            <div class="space-y-1">
              <span class="text-xs font-bold text-amber-400 uppercase">Tellapur, Hyderabad</span>
              <h3 class="text-xl font-bold text-white">
                <a href="/projects/prestige-golden-grove-hyderabad" class="hover:text-amber-400">Prestige Golden Grove</a>
              </h3>
              <p class="text-xs text-slate-400">By Prestige Group</p>
            </div>
            <p class="text-slate-300 text-sm">Premium 2, 3 &amp; 4 BHK luxury apartments in Tellapur near ORR. 28.7 acres, 10 towers, top-class clubhouse.</p>
            <div class="pt-2">
              <a href="/projects/prestige-golden-grove-hyderabad" class="inline-block px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500/20">
                View Project Details →
              </a>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-[#0F1629] border border-slate-800 space-y-4">
            <div class="space-y-1">
              <span class="text-xs font-bold text-amber-400 uppercase">Tellapur, Hyderabad</span>
              <h3 class="text-xl font-bold text-white">
                <a href="/projects/rajapushpa-sierra-tellapur-hyderabad" class="hover:text-amber-400">Rajapushpa Sierra</a>
              </h3>
              <p class="text-xs text-slate-400">By Rajapushpa Properties</p>
            </div>
            <p class="text-slate-300 text-sm">G+49 luxury 2 &amp; 3 BHK apartments in Tellapur, Hyderabad with 1.5 lakh sft clubhouse near Gachibowli.</p>
            <div class="pt-2">
              <a href="/projects/rajapushpa-sierra-tellapur-hyderabad" class="inline-block px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500/20">
                View Project Details →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Why Buy Property in Tellapur?</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Strong builder presence and RERA-approved launches in Tellapur.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Excellent ORR / Metro / IT-corridor connectivity from Tellapur.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Strong appreciation and 3-4% rental yields for premium 2 &amp; 3 BHK stock.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Top schools, hospitals and retail catchment within 5 km of Tellapur.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Naani Projects gets you builder-direct pricing — no buyer brokerage.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Verified inventory, exclusive launch alerts and WhatsApp-first support.
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Explore Similar Locations</h2>
        <div class="flex flex-wrap gap-3">
          <a href="/projects-in-bachupally" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Bachupally</a>
          <a href="/projects-in-kollur" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Kollur</a>
          <a href="/projects-in-narsingi" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Narsingi</a>
          <a href="/projects-in-gachibowli" class="px-4 py-2 rounded-full border border-amber-500/30 text-amber-400 font-medium text-sm hover:bg-amber-500/10">Projects in Gachibowli</a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <div class="space-y-4 max-w-4xl">
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Why consider buying property in Tellapur, Hyderabad?</h3>
            <p class="text-slate-300 text-sm">Tellapur offers convenient access to IT corridors, Outer Ring Road connectivity, and growing social infrastructure, making it a popular choice for homebuyers and investors.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">What is the price range for apartments in Tellapur?</h3>
            <p class="text-slate-300 text-sm">Property prices in Tellapur vary based on builder, BHK configuration, floor area, and amenities. Contact Naani Projects on WhatsApp for updated pricing on specific projects.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Which developers have active projects in Tellapur?</h3>
            <p class="text-slate-300 text-sm">Developers active in Tellapur include Aparna, Brigade, Prestige, My Home, Rajapushpa, Candeur, Anuhar, and Team4. You can compare their floor plans and status on Naani Projects.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Are ready-to-move flats available in Tellapur?</h3>
            <p class="text-slate-300 text-sm">Yes, Tellapur has both ready-to-move and under-construction projects. Share your preferred timeline on WhatsApp at +91 97050 80909 to get matching options.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Is Tellapur suitable for rental income?</h3>
            <p class="text-slate-300 text-sm">Tellapur sees regular rental interest due to its proximity to IT hubs and office corridors. Rental returns depend on unit size, furnishings, and project location.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">How can I schedule a site visit in Tellapur?</h3>
            <p class="text-slate-300 text-sm">Select any project on our website or message +91 97050 80909 on WhatsApp with your preferred date and time to arrange a site visit.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Do buyers pay any advisory fees to Naani Projects?</h3>
            <p class="text-slate-300 text-sm">No, our project discovery and advisory service is free for homebuyers.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-[#0B101D]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Explore Hyderabad Properties</h2>
        <p class="text-slate-300">Browse active listings, compare locations, or speak directly with an advisor.</p>
        <div class="flex flex-wrap justify-center gap-6 text-sm font-semibold text-amber-400">
          <a href="/projects" class="hover:underline">Browse Projects</a>
          <a href="/hyderabad" class="hover:underline">Hyderabad Properties</a>
          <a href="/hyderabad/2-bhk-flats" class="hover:underline">2 BHK Flats in Hyderabad</a>
          <a href="/hyderabad/3-bhk-flats" class="hover:underline">3 BHK Flats in Hyderabad</a>
          <a href="/about-us" class="hover:underline">About Naani Projects</a>
          <a href="/list-your-property" class="hover:underline">List Your Property</a>
          <a href="/contact-us" class="hover:underline">Contact Us</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;

function generateLocationPrerenderHtml(locationSlug: string, locName: string): string {
  const canonical = `${SITE}/projects-in-${locationSlug}`;
  const intro = `Discover the best premium and luxury residential projects in ${locName}, Hyderabad — handpicked, RERA-verified and curated by Naani Projects.`;

  return `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "${canonical}#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "${SITE}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "${SITE}/projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${locName}",
        "item": "${canonical}"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "${canonical}#webpage",
    "url": "${canonical}",
    "name": "Projects in ${locName}, Hyderabad | Apartments & Homes | Naani Projects",
    "description": "Compare residential projects, apartments, and gated layouts in ${locName}, Hyderabad. View floor plans, location advantages, and project details.",
    "isPartOf": {
      "@id": "${SITE}/#website"
    },
    "about": {
      "@id": "${SITE}/#organization"
    }
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="hover:text-amber-400">About Us</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <nav aria-label="Breadcrumb" class="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
    <div class="max-w-6xl mx-auto flex items-center gap-2">
      <a href="/" class="hover:text-amber-400">Home</a>
      <span>/</span>
      <a href="/projects" class="hover:text-amber-400">Projects</a>
      <span>/</span>
      <span class="text-amber-400 font-medium">${locName}</span>
    </div>
  </nav>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Hyderabad Properties</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Projects in ${locName} – <span class="text-amber-400">Luxury Apartments &amp; Homes</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          ${intro}
        </p>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <a href="https://wa.me/919705080909?text=Hi%2C%20share%20top%20projects%20in%20${encodeURIComponent(locName)}%2C%20Hyderabad." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg">
            WhatsApp for ${locName} Projects
          </a>
          <a href="tel:+919705080909" class="px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm">
            Call +91 97050 80909
          </a>
          <a href="https://wa.me/919705080909?text=Hi%2C%20I%20want%20to%20book%20a%20site%20visit%20in%20${encodeURIComponent(locName)}." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm">
            Book Site Visit
          </a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Why Buy Property in ${locName}?</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Strong builder presence and RERA-approved launches in ${locName}.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Excellent ORR / Metro / IT-corridor connectivity from ${locName}.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Strong appreciation and 3-4% rental yields for premium 2 &amp; 3 BHK stock.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Top schools, hospitals and retail catchment within 5 km of ${locName}.
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#090D16] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <div class="space-y-4 max-w-4xl">
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">Why consider buying property in ${locName}, Hyderabad?</h3>
            <p class="text-slate-300 text-sm">${locName} offers convenient access to IT corridors, Outer Ring Road connectivity, and growing social infrastructure, making it a popular choice for homebuyers and investors.</p>
          </div>
          <div class="p-6 rounded-xl bg-[#0B101D] border border-slate-800 space-y-1">
            <h3 class="text-lg font-bold text-white">How can I schedule a site visit in ${locName}?</h3>
            <p class="text-slate-300 text-sm">Select any project on our website or message +91 97050 80909 on WhatsApp with your preferred date and time to arrange a site visit.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;
}

function generateBuilderPrerenderHtml(builderSlug: string, builderName: string): string {
  const canonical = `${SITE}/${builderSlug}-projects-hyderabad`;
  const intro = `${builderName} is a top real estate developer in Hyderabad delivering RERA-compliant residential developments, gated communities, and luxury apartments.`;

  return `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "${canonical}#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE}/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "${SITE}/projects" },
      { "@type": "ListItem", "position": 3, "name": "${builderName}", "item": "${canonical}" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "${canonical}#organization",
    "name": "${builderName}",
    "url": "${canonical}",
    "description": "${intro}"
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="hover:text-amber-400">About Us</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <nav aria-label="Breadcrumb" class="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
    <div class="max-w-6xl mx-auto flex items-center gap-2">
      <a href="/" class="hover:text-amber-400">Home</a>
      <span>/</span>
      <a href="/projects" class="hover:text-amber-400">Projects</a>
      <span>/</span>
      <span class="text-amber-400 font-medium">${builderName}</span>
    </div>
  </nav>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Builder Spotlight</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          ${builderName} Projects in Hyderabad – <span class="text-amber-400">Luxury Apartments &amp; Homes</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          ${intro}
        </p>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <a href="https://wa.me/919705080909?text=Hi%2C%20share%20all%20${encodeURIComponent(builderName)}%20projects%20in%20Hyderabad." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg">
            WhatsApp for ${builderName} Projects
          </a>
          <a href="tel:+919705080909" class="px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm">
            Call +91 97050 80909
          </a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Why Choose ${builderName} in Hyderabad?</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            RERA-compliant construction standards and transparent booking terms.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Prime location selections in high-growth Hyderabad IT corridors.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Resort-style amenities, clubhouse facilities, and high resale demand.
          </div>
          <div class="p-5 rounded-xl bg-[#0B101D] border border-slate-800 text-sm text-slate-300">
            Direct pricing advantages and instant floor plan assistance with Naani Projects.
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;
}

function generateProjectPrerenderHtml(projectSlug: string, projectTitle: string): string {
  const canonical = `${SITE}/projects/${projectSlug}`;
  const intro = `${projectTitle} is a premier residential property in Hyderabad offering modern floor plans, gated community amenities, and strategic connectivity.`;

  return `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "${canonical}#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE}/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "${SITE}/projects" },
      { "@type": "ListItem", "position": 3, "name": "${projectTitle}", "item": "${canonical}" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": "${canonical}#listing",
    "name": "${projectTitle}",
    "description": "${intro}",
    "url": "${canonical}",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    }
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="hover:text-amber-400">About Us</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <nav aria-label="Breadcrumb" class="w-full bg-[#0B101D] border-b border-slate-800/80 py-3 px-4 sm:px-8 lg:px-12 text-xs text-slate-400">
    <div class="max-w-6xl mx-auto flex items-center gap-2">
      <a href="/" class="hover:text-amber-400">Home</a>
      <span>/</span>
      <a href="/projects" class="hover:text-amber-400">Projects</a>
      <span>/</span>
      <span class="text-amber-400 font-medium">${projectTitle}</span>
    </div>
  </nav>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <span class="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">Verified Project</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          ${projectTitle} – <span class="text-amber-400">Luxury Apartments in Hyderabad</span>
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          ${intro}
        </p>
        <div class="flex flex-wrap justify-center gap-4 pt-4">
          <a href="https://wa.me/919705080909?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(projectTitle)}.%20Please%20share%20price%20and%20floor%20plans." target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg">
            WhatsApp for Floor Plans
          </a>
          <a href="tel:+919705080909" class="px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-sm">
            Call +91 97050 80909
          </a>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#0B101D] border-b border-slate-800/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Project Overview &amp; Highlights</h2>
        <p class="text-slate-300 text-base leading-relaxed">
          ${projectTitle} is designed for homebuyers seeking luxury living, strategic location connectivity, and high potential rental yields. Review pricing, specifications, and site visit options with Naani Projects.
        </p>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;
}

function generateCategoryPrerenderHtml(categoryPath: string, categoryTitle: string): string {
  const canonical = `${SITE}${categoryPath}`;
  const intro = `Explore verified residential properties, flats, and luxury apartments in ${categoryTitle} with Naani Projects.`;

  return `<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "${canonical}#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE}/" },
      { "@type": "ListItem", "position": 2, "name": "Hyderabad", "item": "${SITE}/hyderabad" },
      { "@type": "ListItem", "position": 3, "name": "${categoryTitle}", "item": "${canonical}" }
    ]
  }
]
</script>
<div class="min-h-screen bg-[#090D16] text-slate-100">
  <header class="w-full bg-[#090D16] border-b border-slate-800/80 py-4 px-4 sm:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <a href="/" class="text-xl font-extrabold text-white">Naani Projects</a>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <a href="/" class="hover:text-amber-400">Home</a>
        <a href="/projects" class="hover:text-amber-400">Projects</a>
        <a href="/hyderabad" class="hover:text-amber-400">Hyderabad Hub</a>
        <a href="/about-us" class="hover:text-amber-400">About Us</a>
        <a href="/contact-us" class="hover:text-amber-400">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="py-16 md:py-24 bg-gradient-to-b from-[#090D16] via-[#0D1322] to-[#090D16]">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          ${categoryTitle} – <span class="text-amber-400">Properties &amp; Apartments</span>
        </h1>
        <p class="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
          ${intro}
        </p>
      </div>
    </section>
  </main>

  <footer class="py-8 bg-[#090D16] border-t border-slate-800/80 text-center text-xs text-slate-500">
    <p>© Naani Projects. All rights reserved. Hyderabad Real Estate Experts.</p>
  </footer>
</div>`;
}

const ogRoutes: OGRoute[] = [
  // ===== Homepage (Static Pre-render Target) =====
  {
    path: '/',
    title: 'Naani Projects | Premium Real Estate & Apartments in Hyderabad',
    description: 'Explore verified luxury apartments, gated communities, and new residential projects for sale in Hyderabad with Naani Projects.',
    url: `${SITE}/`,
    image: DEFAULT_OG,
    prerenderHtml: generateCategoryPrerenderHtml('/', 'Naani Projects – Real Estate & Apartments in Hyderabad'),
  },

  // ===== About Us (Static Pre-render Target) =====
  {
    path: '/about-us',
    title: 'About Naani Projects | Hyderabad Real Estate Experts',
    description: 'Learn about Naani Projects, a Hyderabad-focused real estate platform helping buyers explore apartments, villas, plots and new residential projects across Hyderabad.',
    url: `${SITE}/about-us`,
    image: `${SITE}/naani-projects-hyderabad-real-estate-team.webp`,
    prerenderHtml: ABOUT_US_PRERENDER_HTML,
  },

  // ===== Contact Us (Static Pre-render Target) =====
  {
    path: '/contact-us',
    title: 'Contact Naani Projects | Hyderabad Real Estate Experts',
    description: 'Contact Naani Projects for apartments, villas, plots and new residential projects in Hyderabad. Get property details, compare projects or request a site visit.',
    url: `${SITE}/contact-us`,
    image: `${SITE}/naani-projects-contact-hyderabad-real-estate.webp`,
    prerenderHtml: CONTACT_US_PRERENDER_HTML,
  },
  {
    path: '/list-your-property',
    title: 'List Your Property in Hyderabad | Naani Projects',
    description: 'List your apartment, villa or property for sale in Hyderabad with Naani Projects. Connect with serious buyers instantly.',
    url: `${SITE}/list-your-property`,
    image: DEFAULT_OG,
    prerenderHtml: generateCategoryPrerenderHtml('/list-your-property', 'List Your Property in Hyderabad'),
  },

  // ===== Location Hubs (Static Pre-render Targets) =====
  {
    path: '/projects-in-kokapet',
    title: 'Projects in Kokapet, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Kokapet, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-kokapet`,
    image: DEFAULT_OG,
    prerenderHtml: KOKAPET_PRERENDER_HTML,
  },
  {
    path: '/projects-in-tellapur',
    title: 'Projects in Tellapur, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Tellapur, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-tellapur`,
    image: DEFAULT_OG,
    prerenderHtml: TELLAPUR_PRERENDER_HTML,
  },
  {
    path: '/projects-in-gachibowli',
    title: 'Projects in Gachibowli, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Gachibowli, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-gachibowli`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('gachibowli', 'Gachibowli'),
  },
  {
    path: '/projects-in-financial-district',
    title: 'Projects in Financial District, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Financial District, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-financial-district`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('financial-district', 'Financial District'),
  },
  {
    path: '/projects-in-bachupally',
    title: 'Projects in Bachupally, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Bachupally, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-bachupally`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('bachupally', 'Bachupally'),
  },
  {
    path: '/projects-in-narsingi',
    title: 'Projects in Narsingi, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Narsingi, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-narsingi`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('narsingi', 'Narsingi'),
  },
  {
    path: '/projects-in-miyapur',
    title: 'Projects in Miyapur, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Miyapur, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-miyapur`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('miyapur', 'Miyapur'),
  },
  {
    path: '/projects-in-kukatpally',
    title: 'Projects in Kukatpally, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Kukatpally, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-kukatpally`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('kukatpally', 'Kukatpally'),
  },
  {
    path: '/projects-in-manikonda',
    title: 'Projects in Manikonda, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Manikonda, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-manikonda`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('manikonda', 'Manikonda'),
  },
  {
    path: '/projects-in-nanakramguda',
    title: 'Projects in Nanakramguda, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Nanakramguda, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-nanakramguda`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('nanakramguda', 'Nanakramguda'),
  },
  {
    path: '/projects-in-hi-tech-city',
    title: 'Projects in HITEC City, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in HITEC City, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-hi-tech-city`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('hi-tech-city', 'HITEC City'),
  },
  {
    path: '/projects-in-neopolis',
    title: 'Projects in Neopolis, Hyderabad | Apartments & Homes | Naani Projects',
    description: 'Compare residential projects, apartments, and gated layouts in Neopolis, Hyderabad. View floor plans, location advantages, and project details.',
    url: `${SITE}/projects-in-neopolis`,
    image: DEFAULT_OG,
    prerenderHtml: generateLocationPrerenderHtml('neopolis', 'Neopolis'),
  },

  // ===== SEO Hubs =====
  {
    path: '/hyderabad',
    title: 'Properties & Flats for Sale in Hyderabad | Naani Projects',
    description: 'Explore verified 2 BHK & 3 BHK flats, luxury apartments, and new residential projects for sale in Hyderabad. Compare top locations, prices, and builders with Naani.',
    url: `${SITE}/hyderabad`,
    image: DEFAULT_OG,
    prerenderHtml: generateCategoryPrerenderHtml('/hyderabad', 'Properties & Flats for Sale in Hyderabad'),
  },
  {
    path: '/hyderabad/2-bhk-flats',
    title: '2 BHK Flats for Sale in Hyderabad | Naani Projects',
    description: 'Explore 2 BHK flats and apartments for sale in Hyderabad. Compare verified projects, locations, builders, amenities and floor plans with Naani.',
    url: `${SITE}/hyderabad/2-bhk-flats`,
    image: DEFAULT_OG,
    prerenderHtml: generateCategoryPrerenderHtml('/hyderabad/2-bhk-flats', '2 BHK Flats for Sale in Hyderabad'),
  },
  {
    path: '/hyderabad/3-bhk-flats',
    title: '3 BHK Flats for Sale in Hyderabad | Naani Projects',
    description: 'Explore 3 BHK luxury flats and apartments for sale in Hyderabad. Discover gated communities in Kokapet, Nallagandla, Tellapur & Gachibowli with Naani.',
    url: `${SITE}/hyderabad/3-bhk-flats`,
    image: DEFAULT_OG,
    prerenderHtml: generateCategoryPrerenderHtml('/hyderabad/3-bhk-flats', '3 BHK Flats for Sale in Hyderabad'),
  },

  // ===== Projects hub =====
  {
    path: '/projects',
    title: "Naani's Properties | Premium Real Estate Projects in Hyderabad",
    description: 'Explore curated premium real estate projects in Hyderabad and beyond. Get instant project details on WhatsApp from Naani Projects.',
    url: `${SITE}/projects`,
    image: DEFAULT_OG,
    prerenderHtml: generateCategoryPrerenderHtml('/projects', 'All Hyderabad Real Estate Projects'),
  },

  // ===== Individual project pages =====
  {
    path: '/projects/tridasa-rise',
    title: 'Tridasa Rise Nallagandla | Luxury 3 & 4 BHK Apartments Hyderabad',
    description: 'Tridasa Rise – Premium 3 & 4 BHK apartments in Nallagandla, Hyderabad. 10.38 acres, 7 blocks, 55,000 sq ft clubhouse. IGBC Gold low-density luxury living.',
    url: `${SITE}/projects/tridasa-rise`,
    image: `${SITE}/og-tridasa-rise.jpg`,
  },
  {
    path: '/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad',
    title: '4BHK Villas Near Me in Tukkuguda Hyderabad | Man Airport Residency',
    description: 'Looking for 4BHK villas near me? Explore ready-to-occupy luxury villas at Man Airport Residency, Tukkuguda Hyderabad near Airport & ORR.',
    url: `${SITE}/projects/man-airport-residency-4bhk-villas-near-me-tukkuguda-hyderabad`,
    image: `${SITE}/og-man-airport-residency.jpg`,
  },
  {
    path: '/projects/brigade-gateway-neopolis-kokapet-hyderabad',
    title: 'Luxury Apartments in Kokapet Hyderabad | Brigade Gateway Neopolis',
    description: 'Brigade Gateway Neopolis – premium 3, 4, 5 & 6 BHK homes in Kokapet, Hyderabad with world-class amenities, sky-high towers, excellent connectivity.',
    url: `${SITE}/projects/brigade-gateway-neopolis-kokapet-hyderabad`,
    image: `${SITE}/og-brigade-gateway-neopolis.jpg`,
  },
  {
    path: '/projects/the-cascades-neopolis',
    title: 'The Cascades Neopolis Hyderabad | Price, Floor Plans & RERA',
    description: 'Explore The Cascades Neopolis in Kokapet, Hyderabad. View 3 & 4 BHK sizes, prices, floor plans, amenities, RERA details, location and project highlights.',
    url: `${SITE}/projects/the-cascades-neopolis`,
    image: DEFAULT_OG,
  },
  {
    path: '/projects/neo-towers-neopolis-kokapet',
    title: 'Neo Towers Neopolis Kokapet Hyderabad | 3 & 4 BHK Apartments',
    description: 'Explore Neo Towers in Neopolis, Kokapet, Hyderabad. Discover 3 & 4 BHK residences, 57-storey towers, sky amenities, Club Neo, Sky Office, Skydeck and West Hyderabad connectivity.',
    url: `${SITE}/projects/neo-towers-neopolis-kokapet`,
    image: DEFAULT_OG,
    prerenderHtml: NEO_TOWERS_PRERENDER_HTML,
  },
  {
    path: '/projects/trump-towers-hyderabad-kokapet',
    title: 'Trump Towers Hyderabad Kokapet | Luxury Branded Residences',
    description: 'Explore Trump Towers Hyderabad in Kokapet\'s Golden Mile. Discover 65-storey twin towers, private elevators, large-format residences, the three-level Trump Club and West Hyderabad connectivity.',
    url: `${SITE}/projects/trump-towers-hyderabad-kokapet`,
    image: `${SITE}/assets/trump-towers/hero.jpg`,
    prerenderHtml: TRUMP_TOWERS_PRERENDER_HTML,
  },
  {
    path: '/projects/trump-towers-hyderabad',
    title: 'Trump Towers Hyderabad Kokapet | Luxury Branded Residences',
    description: 'Explore Trump Towers Hyderabad in Kokapet\'s Golden Mile. Discover 65-storey twin towers, private elevators, large-format residences, the three-level Trump Club and West Hyderabad connectivity.',
    url: `${SITE}/projects/trump-towers-hyderabad-kokapet`,
    image: `${SITE}/assets/trump-towers/hero.jpg`,
    prerenderHtml: TRUMP_TOWERS_PRERENDER_HTML,
  },
  {
    path: '/projects/rise-with-9',
    title: 'Rise With 9 Neopolis Kokapet Hyderabad | Luxury 3 & 4 BHK',
    description: 'Explore Rise With 9 in Neopolis, Kokapet, Hyderabad. Discover its large-format luxury residences, double-height living, sky amenities, clubhouse, connectivity and RERA details.',
    url: `${SITE}/projects/rise-with-9`,
    image: DEFAULT_OG,
  },
  {
    path: '/projects/rise-with-9-neopolis-kokapet',
    title: 'Rise With 9 Neopolis Kokapet Hyderabad | Luxury 3 & 4 BHK',
    description: 'Explore Rise With 9 in Neopolis, Kokapet, Hyderabad. Discover its large-format luxury residences, double-height living, sky amenities, clubhouse, connectivity and RERA details.',
    url: `${SITE}/projects/rise-with-9-neopolis-kokapet`,
    image: DEFAULT_OG,
  },
  {
    path: '/projects/linq-by-raghava',
    title: 'LINQ by Raghava Neopolis Kokapet | Luxury 3 BHK Apartments',
    description: 'Explore LINQ by Raghava in Kokapet, Neopolis, Hyderabad. Discover spacious 3 BHK residences, 5.5 lakh+ sq.ft. amenities, sky experiences, clubhouse facilities and connectivity.',
    url: `${SITE}/projects/linq-by-raghava`,
    image: DEFAULT_OG,
  },
  {
    path: '/projects/linq-by-raghava-neopolis',
    title: 'LINQ by Raghava Neopolis Kokapet | Luxury 3 BHK Apartments',
    description: 'Explore LINQ by Raghava in Kokapet, Neopolis, Hyderabad. Discover spacious 3 BHK residences, 5.5 lakh+ sq.ft. amenities, sky experiences, clubhouse facilities and connectivity.',
    url: `${SITE}/projects/linq-by-raghava-neopolis`,
    image: DEFAULT_OG,
  },
  {
    path: '/projects/prestige-golden-grove-hyderabad',
    title: 'Prestige Golden Grove Hyderabad | Luxury Apartments Near ORR',
    description: 'Prestige Golden Grove Hyderabad – premium 2, 3 & 4 BHK luxury apartments in Tellapur near ORR. 28.7 acres, 10 towers. Starting ₹93.5 Lakhs.',
    url: `${SITE}/projects/prestige-golden-grove-hyderabad`,
    image: `${SITE}/og-prestige-golden-grove.jpg`,
  },
  {
    path: '/projects/jaycon-gateway-tirupati',
    title: 'Jaycon Gateway Tirupati | Premium Suites with Rental Income',
    description: 'Invest in Jaycon Gateway Tirupati premium managed suites near Tirumala. Earn passive rental income with a fully managed property. Book your unit today.',
    url: `${SITE}/projects/jaycon-gateway-tirupati`,
    image: `${SITE}/og-jaycon-gateway-tirupati.jpg`,
  },
  {
    path: '/projects/aspire-spaces-a3-bachupally',
    title: 'Aspire Spaces A3 Bachupally | 2 & 3 BHK Apartments Mallampet Hyderabad',
    description: 'Aspire Spaces A3 – Premium 2 & 3 BHK apartments in Mallampet, Hyderabad. 3.7 acres, 2 towers, top-tier amenities. Click to unlock pricing.',
    url: `${SITE}/projects/aspire-spaces-a3-bachupally`,
    image: `${SITE}/og-aspire-spaces-a3.jpg`,
  },
  {
    path: '/projects/sri-soho-interiors-designers-hyderabad',
    title: 'Sri Soho Interiors | Premium Interior Designers in Hyderabad',
    description: 'Sri Soho Interiors – premium modular kitchens, bedrooms, living, dining, decorative units, kids rooms, office and commercial interiors in Hyderabad.',
    url: `${SITE}/projects/sri-soho-interiors-designers-hyderabad`,
    image: `${SITE}/og-sri-soho-interiors.jpg`,
  },
  {
    path: '/projects/team4-aria-miyapur-luxury-apartments-hyderabad',
    title: 'Team4 Aria Miyapur | Price, Floor Plans & Luxury Apartments Hyderabad',
    description: 'Team4 Aria Miyapur – ultra luxury 3 & 3.5 BHK G+48 apartments in Hyderabad with 3.5 acre courtyard, infinity pool & premium amenities.',
    url: `${SITE}/projects/team4-aria-miyapur-luxury-apartments-hyderabad`,
    image: `${SITE}/og-team4-aria-miyapur.jpg`,
  },
  {
    path: '/projects/rajapushpa-sierra-tellapur-hyderabad',
    title: 'Rajapushpa Sierra Tellapur | Luxury 2 & 3 BHK Apartments in Hyderabad',
    description: 'Rajapushpa Sierra – G+49 luxury 2 & 3 BHK apartments in Tellapur, Hyderabad. 1.5 lakh sft clubhouse near Gachibowli. Starting ₹94 Lakhs. Book site visit.',
    url: `${SITE}/projects/rajapushpa-sierra-tellapur-hyderabad`,
    image: `${SITE}/og-rajapushpa-sierra.jpg`,
  },
];

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectOGTags(html: string, route: OGRoute): string {
  const t = escapeHtml(route.title);
  const d = escapeHtml(route.description);
  const u = escapeHtml(route.url);
  const img = escapeHtml(route.image);

  // Strip every existing canonical / og:* / twitter:* tag that the static
  // index.html ships with so the per-route values are the only ones present.
  let result = html
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<meta\s+property="og:[^"]+"[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, '');

  // Swap the <title> and <meta name="description"> to the per-route values.
  result = result.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  result = result.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${d}" />`
  );

  const ogTags = `
    <!-- Per-route SEO metadata (Naani Projects) -->
    <link rel="canonical" href="${u}" />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${u}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:secure_url" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Naani Projects" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@NaaniProjects" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${img}" />`;

  result = result.replace('</head>', `${ogTags}\n  </head>`);

  // If static HTML content is provided for pre-rendering, inject it inside <div id="root"></div>
  if (route.prerenderHtml) {
    result = result.replace('<div id="root"></div>', `<div id="root">${route.prerenderHtml}</div>`);
  }

  return result;
}

export function ogPrerender(): Plugin {
  return {
    name: 'og-prerender',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) {
        console.warn('[og-prerender] dist/index.html not found, skipping');
        return;
      }
      const indexHtml = fs.readFileSync(indexPath, 'utf-8');

      // Dynamically discover all routes from public/sitemaps/*.xml
      const allRoutesMap = new Map<string, OGRoute>();

      // Helper to format slug to Title Case: "aparna-cyber-heights" -> "Aparna Cyber Heights"
      const formatSlugTitle = (slug: string) =>
        slug
          .replace(/-hyderabad$/, '')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

      // Handcrafted routes take precedence
      for (const r of ogRoutes) {
        let prerenderHtml = r.prerenderHtml;
        if (!prerenderHtml) {
          if (r.path.startsWith('/projects/')) {
            const slug = r.path.replace('/projects/', '');
            prerenderHtml = generateProjectPrerenderHtml(slug, formatSlugTitle(slug));
          } else if (r.path.startsWith('/projects-in-')) {
            const locationSlug = r.path.replace('/projects-in-', '');
            prerenderHtml = generateLocationPrerenderHtml(locationSlug, formatSlugTitle(locationSlug));
          } else if (r.path.endsWith('-projects-hyderabad')) {
            const builderSlug = r.path.replace(/^\//, '').replace('-projects-hyderabad', '');
            prerenderHtml = generateBuilderPrerenderHtml(builderSlug, formatSlugTitle(builderSlug));
          } else if (r.path.startsWith('/hyderabad')) {
            const sub = formatSlugTitle(r.path.replace('/hyderabad/', '').replace('/hyderabad', 'Properties in Hyderabad'));
            prerenderHtml = generateCategoryPrerenderHtml(r.path, sub);
          }
        }
        allRoutesMap.set(r.path, { ...r, prerenderHtml });
      }

      // Parse XML sitemap files in public/sitemaps/
      const sitemapsDir = path.resolve(process.cwd(), 'public/sitemaps');
      if (fs.existsSync(sitemapsDir)) {
        const files = fs.readdirSync(sitemapsDir);
        for (const file of files) {
          if (!file.endsWith('.xml')) continue;
          const xmlContent = fs.readFileSync(path.join(sitemapsDir, file), 'utf-8');
          const matches = xmlContent.matchAll(/<loc>(https:\/\/www\.naani\.in(\/[^<]*))<\/loc>/g);
          for (const match of matches) {
            const fullUrl = match[1];
            const routePath = match[2];
            if (!routePath || routePath === '/' || allRoutesMap.has(routePath)) continue;

            let title = 'Naani Projects | Real Estate Hyderabad';
            let description =
              'Explore verified real estate properties, flats, villas and plots in Hyderabad with Naani Projects.';
            let prerenderHtml: string | undefined;

            if (routePath.startsWith('/projects/')) {
              const slug = routePath.replace('/projects/', '');
              const cleanTitle = formatSlugTitle(slug);
              title = `${cleanTitle} | Residential Project in Hyderabad | Naani Projects`;
              description = `Explore project details for ${cleanTitle} in Hyderabad. Review floor plans, location connectivity, and developer information on Naani Projects.`;
              prerenderHtml = generateProjectPrerenderHtml(slug, cleanTitle);
            } else if (routePath.startsWith('/projects-in-')) {
              const locationSlug = routePath.replace('/projects-in-', '');
              const loc = formatSlugTitle(locationSlug);
              title = `Projects in ${loc}, Hyderabad | Apartments & Homes | Naani Projects`;
              description = `Compare residential projects, apartments, and gated layouts in ${loc}, Hyderabad. View floor plans, location advantages, and project details.`;
              prerenderHtml = generateLocationPrerenderHtml(locationSlug, loc);
            } else if (routePath.endsWith('-projects-hyderabad')) {
              const builderSlug = routePath.replace(/^\//, '').replace('-projects-hyderabad', '');
              const builder = formatSlugTitle(builderSlug);
              title = `${builder} Projects in Hyderabad | Residential Developments | Naani Projects`;
              description = `Explore residential developments by ${builder} in Hyderabad. Compare floor plans, project locations, and available configurations on Naani Projects.`;
              prerenderHtml = generateBuilderPrerenderHtml(builderSlug, builder);
            } else if (routePath.startsWith('/hyderabad/')) {
              const sub = formatSlugTitle(routePath.replace('/hyderabad/', ''));
              title = `${sub} in Hyderabad | Naani Projects`;
              description = `Browse ${sub} in Hyderabad. Compare project locations, floor plans, and developer details with Naani Projects.`;
              prerenderHtml = generateCategoryPrerenderHtml(routePath, sub);
            }

            allRoutesMap.set(routePath, {
              path: routePath,
              title,
              description,
              url: fullUrl,
              image: DEFAULT_OG,
              prerenderHtml,
            });
          }
        }
      }

      // Pre-render static HTML file with route-specific canonical & OG tags for every route
      let count = 0;
      for (const route of allRoutesMap.values()) {
        const html = injectOGTags(indexHtml, route);
        if (route.path === '/') {
          fs.writeFileSync(indexPath, html);
        } else {
          const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, 'index.html'), html);
        }
        count++;
      }
      console.log(`[og-prerender] ✅ Successfully pre-rendered ${count} pages with explicit canonical, OG tags & HTML content.`);
    },
  };
}
