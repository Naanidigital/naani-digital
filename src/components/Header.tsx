import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "List Your Property", href: "/list-your-property" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const openWhatsApp = () =>
    window.open(
      "https://wa.me/919705080909?text=Hi%2C%20I'm%20looking%20for%20a%20property%20in%20Hyderabad.%20Please%20share%20options.",
      "_blank"
    );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1220]/95 backdrop-blur-md border-b border-amber-500/25 shadow-md py-3">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Brand */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 group"
            aria-label="Naani Projects home"
          >
            <div className="h-10 w-10 bg-slate-900 rounded-xl p-1 shadow-xs border border-amber-500/30 flex items-center justify-center">
              <img
                src="/naani-projects-logo.png"
                alt="Naani Projects - Hyderabad Real Estate"
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                width="32"
                height="32"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Naani <span className="text-amber-400">Projects</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm font-bold text-slate-200 hover:text-amber-400 transition-colors rounded-lg hover:bg-amber-500/10"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-amber-500/50 text-amber-400 hover:bg-amber-500/20 font-bold px-4 py-2 rounded-xl transition-all"
              onClick={() => (window.location.href = "tel:+919705080909")}
            >
              <Phone size={15} className="mr-1.5" />
              Call Now
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold px-4 py-2 rounded-xl shadow-md transition-all"
              onClick={openWhatsApp}
            >
              <MessageCircle size={15} className="mr-1.5" />
              WhatsApp Us
            </Button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0B1220] border-b border-amber-500/30 py-4 shadow-2xl animate-slide-down">
            <nav className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-4 py-3 text-sm font-bold text-slate-200 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors w-full text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-amber-500/50 text-amber-400 font-bold"
                  onClick={() => (window.location.href = "tel:+919705080909")}
                >
                  <Phone size={14} className="mr-2" /> Call Now
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold"
                  onClick={openWhatsApp}
                >
                  <MessageCircle size={14} className="mr-2" /> WhatsApp Us
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
