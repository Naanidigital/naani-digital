import { Button } from "@/components/ui/button";
import { Expand } from "lucide-react";
import masterPlanImage from "@/assets/tridasa/master-plan.png";

interface MasterPlanProps {
  onViewClick: () => void;
}

const MasterPlan = ({ onViewClick }: MasterPlanProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
            Site Layout
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Master Plan
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Master Plan Image */}
          <div 
            onClick={onViewClick}
            className="group relative aspect-[16/10] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden cursor-pointer border-2 border-amber-300 dark:border-amber-800 hover:border-amber-500 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <img 
              src={masterPlanImage}
              alt="Tridasa Rise Master Plan - 10.38 Acres Gated Community Layout with 7 Blocks and 55000 Sq Ft Clubhouse in Nallagandla Hyderabad"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                  <Expand className="w-8 h-8 text-white" />
                </div>
                <p className="text-white text-lg font-semibold">View Full Master Plan</p>
                <p className="text-gray-200 text-sm mt-1">Click to get detailed layout</p>
              </div>
            </div>

            {/* Corner badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 rounded-full">
              <span className="text-white text-xs font-medium">10.38 Acres</span>
            </div>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">7</p>
              <p className="text-sm text-muted-foreground">Blocks</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">952</p>
              <p className="text-sm text-muted-foreground">Premium Units</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">55K</p>
              <p className="text-sm text-muted-foreground">Sq.Ft. Clubhouse</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">22+</p>
              <p className="text-sm text-muted-foreground">Outdoor Amenities</p>
            </div>
          </div>

          {/* Info text */}
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Click on the master plan to submit an enquiry and receive the detailed layout
          </p>
        </div>
      </div>
    </section>
  );
};

export default MasterPlan;
