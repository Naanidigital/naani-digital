import { Button } from "@/components/ui/button";
import { MapPin, Download, Calendar, MessageCircle } from "lucide-react";

interface HeroSectionProps {
  onEnquireClick: () => void;
  onBrochureClick: () => void;
  onSiteVisitClick: () => void;
}

const HeroSection = ({ onEnquireClick, onBrochureClick, onSiteVisitClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/30" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Project badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">New Launch at Nallagandla</span>
          </div>

          {/* Project name */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Tridasa Rise
            <span className="block text-2xl md:text-3xl font-light mt-4 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              Where Life Shines
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-amber-200/80 font-light tracking-wide">
            ✨ Brightening Lives ✨
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span className="text-lg">Nallagandla, Hyderabad</span>
          </div>

          {/* Price highlight */}
          <div className="bg-gradient-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-gray-300 text-sm mb-2">Premium 3 & 4 BHK Apartments</p>
            <p className="text-3xl md:text-4xl font-bold text-white">
              1,733 - 2,751 <span className="text-lg font-normal text-amber-300">Sq. Ft.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={onEnquireClick}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Enquire Now
            </Button>

            <Button
              onClick={onBrochureClick}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-amber-500/50 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 px-8 py-6 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Brochure
            </Button>

            <Button
              onClick={onSiteVisitClick}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-amber-500/50 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 px-8 py-6 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Site Visit
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              RERA Approved
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Bank Approved
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Clear Title
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-amber-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
