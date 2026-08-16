import { Phone } from "lucide-react";

const GlobalCallButton = () => {
  return (
    <a
      href="tel:+919705080909"
      className="call-btn fixed top-5 right-5 z-[60] hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg transition-all hover:scale-105"
    >
      <Phone size={15} className="text-amber-400" />
      +91 97050 80909
    </a>
  );
};

export default GlobalCallButton;
