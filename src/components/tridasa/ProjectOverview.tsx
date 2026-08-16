import { 
  Building2, 
  Home, 
  Layers, 
  Users, 
  Maximize, 
  Compass,
  Warehouse,
  Award
} from "lucide-react";

import projectOverviewImage from "@/assets/tridasa/project-overview.png";
import projectHighlightsImage from "@/assets/tridasa/project-highlights.png";

const highlights = [
  { icon: Maximize, label: "Total Area", value: "10.38 Acres" },
  { icon: Building2, label: "Blocks", value: "7" },
  { icon: Layers, label: "Floors", value: "G + 17" },
  { icon: Users, label: "Total Units", value: "952" },
  { icon: Home, label: "Unit Types", value: "3 & 4 BHK" },
  { icon: Maximize, label: "Sizes", value: "1,733 - 2,751 Sq.Ft." },
  { icon: Compass, label: "Facing", value: "East, West & North" },
  { icon: Warehouse, label: "Clubhouse", value: "55,000 Sq.Ft." },
];

const ProjectOverview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
            Project Highlights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Tridasa Rise?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Project Overview Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={projectOverviewImage}
              alt="Tridasa Rise Project Overview - Luxury 3 and 4 BHK Apartments in Nallagandla Hyderabad with 7 Blocks and 17 Floors"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <item.icon className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Project Highlights Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={projectHighlightsImage}
              alt="Tridasa Rise Project Highlights - IGBC Pre Certified Gold Rated Green Building with EV Charging and Premium Amenities"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-6 h-6 text-amber-600" />
            <span className="text-amber-600 font-semibold">Low Density – 92 Units Per Acre</span>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tridasa Rise is a low-density luxury gated community where chaos fades and serenity 
            takes its place, offering a balanced lifestyle filled with light, space, and harmony. 
            An IGBC Pre-Certified Gold rated project that integrates sustainability into its blueprint.
          </p>
          
          {/* IGBC Badge */}
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-700 dark:text-green-400 font-medium">IGBC Pre-Certified Gold Rated Project</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
