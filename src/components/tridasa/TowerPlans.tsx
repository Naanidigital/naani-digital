import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Eye } from "lucide-react";

import blockAB from "@/assets/tridasa/block-a-b.png";
import blockCG from "@/assets/tridasa/block-c-g.png";
import blockDF from "@/assets/tridasa/block-d-f.png";
import blockE from "@/assets/tridasa/block-e.png";

interface TowerPlansProps {
  onViewPlan: (tower: string) => void;
}

const blocks = [
  { 
    id: "blockAB", 
    name: "Block A & B", 
    units: "272 Units", 
    types: "3 & 4 BHK",
    image: blockAB,
    alt: "Tridasa Rise Block A & B Floor Plan - 3 BHK and 4 BHK Apartments Layout Nallagandla Hyderabad"
  },
  { 
    id: "blockCG", 
    name: "Block C & G", 
    units: "272 Units", 
    types: "3 BHK",
    image: blockCG,
    alt: "Tridasa Rise Block C & G Floor Plan - 3 BHK Apartments Layout Nallagandla Hyderabad"
  },
  { 
    id: "blockDF", 
    name: "Block D & F", 
    units: "272 Units", 
    types: "3 & 4 BHK",
    image: blockDF,
    alt: "Tridasa Rise Block D & F Floor Plan - 3 BHK and 4 BHK Apartments Layout Nallagandla Hyderabad"
  },
  { 
    id: "blockE", 
    name: "Block E", 
    units: "136 Units", 
    types: "3 BHK",
    image: blockE,
    alt: "Tridasa Rise Block E Floor Plan - 3 BHK Apartments Layout Nallagandla Hyderabad"
  },
];

const TowerPlans = ({ onViewPlan }: TowerPlansProps) => {
  const [activeTab, setActiveTab] = useState("blockAB");

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
            Floor Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Block & Layout Plans
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Block Tabs */}
            <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent mb-8 justify-center">
              {blocks.map((block) => (
                <TabsTrigger
                  key={block.id}
                  value={block.id}
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-white px-6 py-3 rounded-lg border border-border data-[state=active]:border-amber-500"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  {block.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Block Content */}
            {blocks.map((block) => (
              <TabsContent key={block.id} value={block.id} className="mt-0">
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Block Info */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {block.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Premium apartments with modern amenities and thoughtful design
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-sm text-muted-foreground">Total Units</p>
                          <p className="text-xl font-bold text-foreground">{block.units}</p>
                        </div>
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-sm text-muted-foreground">Unit Types</p>
                          <p className="text-xl font-bold text-foreground">{block.types}</p>
                        </div>
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-sm text-muted-foreground">Floors</p>
                          <p className="text-xl font-bold text-foreground">G + 17</p>
                        </div>
                        <div className="bg-muted/50 rounded-xl p-4">
                          <p className="text-sm text-muted-foreground">Units/Floor</p>
                          <p className="text-xl font-bold text-foreground">8</p>
                        </div>
                      </div>

                      <Button 
                        onClick={() => onViewPlan(block.name)}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        View Floor Plans
                      </Button>
                    </div>

                    {/* Layout Preview with Actual Image */}
                    <div 
                      onClick={() => onViewPlan(block.name)}
                      className="group relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden cursor-pointer border border-amber-200 dark:border-amber-800 hover:border-amber-500 transition-all"
                    >
                      <img 
                        src={block.image} 
                        alt={block.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="font-semibold">{block.name} Layout</p>
                          <p className="text-sm text-gray-200">Click to view detailed plans</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Available Unit Types */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-4">Available Configurations</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div 
                        onClick={() => onViewPlan(`${block.name} - 3 BHK Type A`)}
                        className="bg-muted/50 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg p-4 cursor-pointer transition-colors border border-transparent hover:border-amber-300"
                      >
                        <p className="font-medium text-foreground">3 BHK - Type A</p>
                        <p className="text-sm text-muted-foreground">1,733 Sq. Ft.</p>
                      </div>
                      <div 
                        onClick={() => onViewPlan(`${block.name} - 3 BHK Type B`)}
                        className="bg-muted/50 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg p-4 cursor-pointer transition-colors border border-transparent hover:border-amber-300"
                      >
                        <p className="font-medium text-foreground">3 BHK - Type B</p>
                        <p className="text-sm text-muted-foreground">1,890 Sq. Ft.</p>
                      </div>
                      <div 
                        onClick={() => onViewPlan(`${block.name} - 4 BHK Type A`)}
                        className="bg-muted/50 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg p-4 cursor-pointer transition-colors border border-transparent hover:border-amber-300"
                      >
                        <p className="font-medium text-foreground">4 BHK - Type A</p>
                        <p className="text-sm text-muted-foreground">2,345 Sq. Ft.</p>
                      </div>
                      <div 
                        onClick={() => onViewPlan(`${block.name} - 4 BHK Type B`)}
                        className="bg-muted/50 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg p-4 cursor-pointer transition-colors border border-transparent hover:border-amber-300"
                      >
                        <p className="font-medium text-foreground">4 BHK - Type B</p>
                        <p className="text-sm text-muted-foreground">2,751 Sq. Ft.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TowerPlans;
