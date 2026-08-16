import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dumbbell, 
  Trees, 
  Building2,
  Waves,
  Users,
  Baby,
  Flower2,
  TreePine,
  Tent,
  Music,
  Briefcase,
  ShoppingBag,
  Car,
  Gamepad2,
  Coffee,
  Scissors,
  Theater,
  Target,
  Footprints,
  Church,
  LayoutGrid,
  Sparkles,
  Heart,
  Home
} from "lucide-react";

import clubhouseElevation from "@/assets/tridasa/clubhouse-elevation.png";
import clubhouseAmenities from "@/assets/tridasa/clubhouse-amenities.png";

const outdoorAmenities = [
  { icon: Target, name: "Tennis Court" },
  { icon: Target, name: "Basketball Court" },
  { icon: Target, name: "Pickleball Court" },
  { icon: Target, name: "Cricket Net" },
  { icon: Footprints, name: "Walking Track" },
  { icon: Footprints, name: "Skating Zone" },
  { icon: Users, name: "Senior Citizen Zone" },
  { icon: Heart, name: "Yoga & Meditation Space" },
  { icon: Church, name: "Temple Space" },
  { icon: Baby, name: "Kids Play Area" },
  { icon: Flower2, name: "Gardening Zone" },
  { icon: TreePine, name: "Forest Walk" },
  { icon: Flower2, name: "Scented Garden" },
  { icon: Tent, name: "Party Lawn" },
  { icon: Trees, name: "Herbal Garden" },
  { icon: Tent, name: "Relaxation Gazebo" },
  { icon: Dumbbell, name: "Outdoor Gym" },
  { icon: Music, name: "Open Air Theatre" },
  { icon: LayoutGrid, name: "Sculpture Garden" },
  { icon: ShoppingBag, name: "Market Zone" },
  { icon: Car, name: "Grand Entrance" },
  { icon: Briefcase, name: "Work From Nature" },
];

const clubhouseAmenitiesList = [
  { icon: Theater, name: "Banquet Hall" },
  { icon: Target, name: "Badminton Court" },
  { icon: Dumbbell, name: "Gym" },
  { icon: Tent, name: "Outdoor Deck" },
  { icon: Gamepad2, name: "Hobby Zone" },
  { icon: Users, name: "Guest Rooms" },
  { icon: Target, name: "Squash Court" },
  { icon: Waves, name: "Swimming Pool" },
  { icon: Heart, name: "Yoga / Meditation Space" },
  { icon: ShoppingBag, name: "Pharmacy" },
  { icon: Briefcase, name: "Business Centre" },
  { icon: ShoppingBag, name: "Super Market" },
  { icon: Tent, name: "Terrace Party Deck" },
  { icon: Heart, name: "Pilates / Aerobics" },
  { icon: ShoppingBag, name: "ATM" },
  { icon: Theater, name: "Mini Theatre" },
  { icon: Baby, name: "Creche" },
  { icon: Gamepad2, name: "Indoor Games" },
  { icon: Scissors, name: "Salon" },
  { icon: Coffee, name: "Cafeteria" },
];

const blockAmenities = [
  { icon: Dumbbell, name: "Podium Level Gym" },
  { icon: Baby, name: "Kids Play Zone" },
  { icon: Users, name: "Community Hall" },
  { icon: Briefcase, name: "Co-working Space" },
  { icon: Coffee, name: "Lounge Area" },
  { icon: Trees, name: "Terrace Garden" },
];

const AmenitiesSection = () => {
  const [activeTab, setActiveTab] = useState("clubhouse");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
            Project Amenities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            40+ Premium Amenities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience luxury living with our thoughtfully designed amenities spread across 
            55,000 sq.ft. clubhouse and expansive outdoor spaces.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full mt-6" />
        </div>

        {/* Clubhouse Elevation Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={clubhouseElevation}
              alt="Tridasa Rise Clubhouse Elevation - 55000 Sq Ft Premium Clubhouse with 5 Floors in Nallagandla Hyderabad"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">55,000 Sq.Ft. Clubhouse</h3>
              <p className="text-gray-200">5 Floors of Premium Amenities</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent mb-8 justify-center">
            <TabsTrigger
              value="clubhouse"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white px-6 py-3 rounded-lg border border-border data-[state=active]:border-amber-500"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Clubhouse Amenities
            </TabsTrigger>
            <TabsTrigger
              value="outdoor"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white px-6 py-3 rounded-lg border border-border data-[state=active]:border-amber-500"
            >
              <Trees className="w-4 h-4 mr-2" />
              Outdoor Amenities
            </TabsTrigger>
            <TabsTrigger
              value="block"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white px-6 py-3 rounded-lg border border-border data-[state=active]:border-amber-500"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Block Amenities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clubhouse" className="mt-0">
            {/* Clubhouse Amenities Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={clubhouseAmenities}
                alt="Tridasa Rise Clubhouse Amenities - Creche, Badminton Court, Squash Court, Mini Theatre, Yoga and Sports Area"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {clubhouseAmenitiesList.map((amenity, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 bg-muted/50 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-3">
                    <amenity.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{amenity.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="outdoor" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {outdoorAmenities.map((amenity, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 bg-muted/50 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                    <amenity.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{amenity.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="block" className="mt-0">
            <div className="bg-muted/30 rounded-2xl p-8 mb-6">
              <p className="text-center text-muted-foreground mb-6">
                Each block features podium-level amenities designed for convenience and community living.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {blockAmenities.map((amenity, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 bg-muted/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                    <amenity.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{amenity.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AmenitiesSection;
