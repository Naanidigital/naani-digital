import { Phone, MessageCircle, Calendar, Info } from "lucide-react";

interface Props {
  onOpenPopup: (type: "price_request" | "hero_site_visit" | "whatsapp_click" | "callback_request") => void;
}

const NeoTowersStickyCTA = ({ onOpenPopup }: Props) => {
  const handleWhatsApp = () => {
    onOpenPopup("whatsapp_click");
  };

  return (
    <>
      {/* Desktop Floating Sticky Bar (Bottom Right or Bottom Bar) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3 bg-[#090D16]/95 backdrop-blur-md border border-amber-500/30 p-2.5 rounded-2xl shadow-2xl">
        <button
          onClick={() => onOpenPopup("price_request")}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105"
        >
          <Info size={15} />
          Get Details
        </button>
        <button
          onClick={() => onOpenPopup("hero_site_visit")}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
        >
          <Calendar size={15} />
          Schedule Visit
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
        >
          <MessageCircle size={15} />
          WhatsApp 9705080909
        </button>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#090D16]/95 backdrop-blur-lg border-t border-amber-500/30 px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href="tel:9705080909"
          className="flex-1 flex flex-col items-center justify-center gap-1 bg-slate-900 border border-amber-500/30 text-amber-400 rounded-xl py-2 font-bold text-[11px] active:scale-95"
        >
          <Phone size={16} />
          Call 9705080909
        </a>
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#25D366] text-white rounded-xl py-2 font-extrabold text-[11px] active:scale-95 shadow-md"
        >
          <MessageCircle size={16} />
          WhatsApp
        </button>
        <button
          onClick={() => onOpenPopup("hero_site_visit")}
          className="flex-1 flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 rounded-xl py-2 font-extrabold text-[11px] active:scale-95 shadow-md"
        >
          <Calendar size={16} />
          Site Visit
        </button>
      </div>
    </>
  );
};

export default NeoTowersStickyCTA;
