import { Button } from "@/components/ui/button";
import { MapPin, School, Building, Landmark, ShoppingBag, Train, MessageCircle } from "lucide-react";
import locationMapImage from "@/assets/tridasa/location-map.png";

interface LocationSectionProps {
  onEnquireClick: () => void;
}

const connectivityData = [
  { icon: School, label: "Schools", distance: "5 mins", places: "Glendale, Sadhana Infinity, BHEL Public School" },
  { icon: Building, label: "Hospitals", distance: "6 mins", places: "Citizen Hospital, Yashoda, Continental" },
  { icon: Landmark, label: "Banks & ATMs", distance: "4 mins", places: "All major banks nearby" },
  { icon: ShoppingBag, label: "Malls & Shopping", distance: "5-10 mins", places: "Aparna Neo Mall, AMB Mall, Inorbit" },
  { icon: Train, label: "IT & Transport", distance: "10 mins", places: "Financial District, ORR Exit, Lingampalli Railway" },
];

const LocationSection = ({ onEnquireClick }: LocationSectionProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
            Prime Location
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Strategic Location at Nallagandla
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Location Map Image */}
          <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden border border-border shadow-lg">
            <img 
              src={locationMapImage}
              alt="Tridasa Rise Location Map - Nallagandla Hyderabad near Financial District ORR and IT Hubs"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Location marker overlay */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-foreground">Nallagandla, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Connectivity Details */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Everything Within Reach
            </h3>
            <p className="text-muted-foreground">
              Strategically located at Nallagandla with excellent connectivity to IT hubs, 
              educational institutions, healthcare facilities, and entertainment zones.
            </p>

            <div className="space-y-4">
              {connectivityData.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <span className="text-amber-600 font-medium">{item.distance}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.places}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key highlights */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 mt-8">
              <h4 className="font-semibold text-foreground mb-4">Location Highlights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  10 mins from ORR & Lingampalli Railway Station
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  45 mins from Rajiv Gandhi International Airport
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Close to Financial District & IT corridor
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Surrounded by reputed schools & hospitals
                </li>
              </ul>
            </div>

            <Button 
              onClick={onEnquireClick}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Location Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
