import { Facebook, Instagram, Youtube, Phone, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProjects, projectPath, type DBProject } from "@/lib/projectsApi";

const Footer = () => {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [allProjects, setAllProjects] = useState<DBProject[]>([]);
  useEffect(() => {
    fetchProjects().then(setAllProjects).catch(() => {});
  }, []);

  const socials = [
    { icon: Instagram, href: "https://www.instagram.com/naaniprojects/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/NaaniProjects/", label: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/@NaaniProjects", label: "YouTube" },
  ];

  const locations = [
    "Kokapet", "Tellapur", "Miyapur", "Gachibowli",
    "Bachupally", "Tukkuguda", "Neopolis", "Financial District",
  ];

  return (
    <footer className="bg-[#070A10] text-white border-t border-amber-500/20 relative pt-12 pb-8">
      {/* TOP FLOATING GOLD WHATSAPP BANNER */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-slate-950 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-6xl mx-auto text-center mb-16 relative z-10 border border-amber-300">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-3">
            Get Best Property Deals on WhatsApp
          </h2>
          <p className="text-slate-900 text-base md:text-lg font-bold max-w-3xl mx-auto mb-8">
            Share your location, budget and preferences. We'll send a curated shortlist within 30 minutes. Free for buyers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <a
              href="https://wa.me/919705080909?text=Hi%2C%20I'm%20looking%20for%20a%20property%20in%20Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold w-56 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              <MessageCircle size={20} /> WhatsApp Us Now
            </a>
            <a
              href="tel:+919705080909"
              className="bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold w-56 h-12 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg border border-amber-400/40 transition-all hover:scale-105"
            >
              <Phone size={20} /> Call +91 97050 80909
            </a>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* COL 1: Brand & Social */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 bg-slate-900 rounded-xl p-1 shadow-md border border-amber-500/30 flex items-center justify-center">
                <img
                  src="/naani-projects-logo.png"
                  alt="Naani Projects Logo"
                  className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                  width="32" height="32" loading="lazy"
                />
              </div>
              <span className="text-xl font-extrabold text-white">Naani <span className="text-amber-400">Projects</span></span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Find the right property — apartments, villas, gated communities and luxury homes in Hyderabad — smarter and faster on WhatsApp.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-all duration-300 hover:scale-110 flex items-center justify-center border border-amber-500/30"
                  aria-label={s.label}>
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: Explore & Browse Projects */}
          <div>
            <h3 className="font-extrabold text-white mb-4 text-base tracking-wider uppercase text-amber-400">Explore</h3>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                { to: "/", label: "Home" },
                { to: "/projects", label: "All Projects" },
                { to: "/about-us", label: "About Us" },
                { to: "/contact-us", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-200 font-bold hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-amber-400 mb-2 text-sm">Browse Projects</h4>
            <div className="relative">
              <button
                onClick={() => setProjectsOpen((v) => !v)}
                aria-expanded={projectsOpen}
                className="w-full flex items-center justify-between gap-2 text-sm text-white font-bold hover:text-amber-400 transition-colors border border-amber-500/30 rounded-xl px-4 py-2.5 bg-slate-900"
              >
                <span>All Projects ({allProjects.length || 224})</span>
                <ChevronDown size={16} className={`text-amber-400 transition-transform ${projectsOpen ? "rotate-180" : ""}`} />
              </button>
              {projectsOpen && (
                <ul className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-amber-500/40 bg-[#0B101D] shadow-2xl divide-y divide-amber-500/20 absolute left-0 right-0 z-30">
                  {allProjects.map((p) => (
                    <li key={p.id}>
                      <Link to={projectPath(p)} onClick={() => setProjectsOpen(false)}
                        className="block px-4 py-2.5 text-xs text-slate-200 hover:text-amber-400 hover:bg-amber-500/10 transition-colors">
                        <span className="font-bold">{p.name}</span>
                        <span className="block text-[10px] text-amber-400/80 mt-0.5">{p.location}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* COL 3: Top Locations */}
          <div>
            <h3 className="font-extrabold text-white mb-4 text-base tracking-wider uppercase text-amber-400">Top Locations</h3>
            <ul className="space-y-2 text-sm">
              {locations.map((loc) => (
                <li key={loc}>
                  <Link to="/projects" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">
                    Projects in {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: Get In Touch */}
          <div>
            <h3 className="font-extrabold text-white mb-4 text-base tracking-wider uppercase text-amber-400">Get In Touch</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <span className="font-medium">Kondapur, Hyderabad, Telangana 500084, India</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Phone size={18} className="text-amber-400 shrink-0" />
                <a href="tel:+919705080909" className="font-bold text-white hover:text-amber-400 transition-colors">+91 97050 80909</a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <MessageCircle size={18} className="text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919705080909?text=Hi%2C%20I'm%20looking%20for%20a%20property%20in%20Hyderabad"
                  target="_blank" rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:underline transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="pt-8 border-t border-amber-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs md:text-sm text-slate-400 font-medium">
            <p>© {new Date().getFullYear()} Naani Projects. All rights reserved.</p>
            <p className="text-amber-400/90 font-bold">Find the Right Property, Smarter &amp; Faster on WhatsApp</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
