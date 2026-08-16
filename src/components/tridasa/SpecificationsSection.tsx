import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Building2, 
  DoorOpen, 
  Paintbrush, 
  ChefHat, 
  Droplets, 
  Zap,
  Wrench,
  Layers
} from "lucide-react";

const specifications = [
  {
    id: "structure",
    icon: Building2,
    title: "Structure",
    items: [
      "RCC framed earthquake-resistant structure",
      "Concrete blocks for external and internal walls",
      "Anti-termite treatment for the entire structure",
      "External walls - 200mm thick concrete blocks",
      "Internal walls - 100mm thick concrete blocks",
    ],
  },
  {
    id: "joinery",
    icon: DoorOpen,
    title: "Joinery",
    items: [
      "Main door - Teak wood frame with designer flush door",
      "Internal doors - Hardwood frame with flush doors",
      "UPVC windows with clear glass and mosquito mesh",
      "Powder-coated aluminum sliding doors for balconies",
      "Premium quality hardware fittings",
    ],
  },
  {
    id: "flooring",
    icon: Layers,
    title: "Flooring & Dado",
    items: [
      "Living, Dining, Bedrooms - 800x800mm vitrified tiles",
      "Kitchen - Anti-skid ceramic tiles",
      "Bathrooms - Anti-skid ceramic tiles for flooring",
      "Bathroom dado - Ceramic tiles up to door height",
      "Balconies - Anti-skid ceramic tiles",
    ],
  },
  {
    id: "painting",
    icon: Paintbrush,
    title: "Painting",
    items: [
      "Internal walls - OBD (Oil Bound Distemper)",
      "External walls - Exterior emulsion paint",
      "Ceiling - OBD finish",
      "All wood and metal surfaces - Enamel paint",
    ],
  },
  {
    id: "kitchen",
    icon: ChefHat,
    title: "Kitchen",
    items: [
      "Granite platform with stainless steel sink",
      "Provision for water purifier",
      "Provision for exhaust fan",
      "Ceramic tile dado above platform",
      "Provision for washing machine in utility area",
    ],
  },
  {
    id: "plumbing",
    icon: Droplets,
    title: "Plumbing",
    items: [
      "Concealed CPVC plumbing with ISI mark pipes",
      "Premium quality CP fittings in bathrooms",
      "Solar water heating provision",
      "Provision for geysers in all bathrooms",
      "Rain water harvesting system",
    ],
  },
  {
    id: "electrical",
    icon: Zap,
    title: "Electrical",
    items: [
      "Concealed copper wiring with modular switches",
      "Adequate power points in all rooms",
      "TV and telephone points in living and master bedroom",
      "AC provision in living and all bedrooms",
      "Generator backup for common areas and lifts",
    ],
  },
  {
    id: "utilities",
    icon: Wrench,
    title: "Utilities & Services",
    items: [
      "High-speed elevators with ARD system",
      "24/7 security with CCTV surveillance",
      "Intercom facility",
      "Fire fighting system as per norms",
      "Sewage treatment plant",
      "Organic waste converter",
    ],
  },
];

const SpecificationsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
            Quality Standards
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Specifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium quality materials and finishes for lasting luxury
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {specifications.map((spec) => (
              <AccordionItem
                key={spec.id}
                value={spec.id}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-amber-500/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg flex items-center justify-center">
                      <spec.icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {spec.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <ul className="space-y-3 ml-14">
                    {spec.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default SpecificationsSection;
