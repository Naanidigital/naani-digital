import { Video } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-amber-500/10 text-amber-600 rounded-full text-sm font-medium mb-4">
            Visual Tour
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Walkthrough Videos
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Walkthrough Video - YouTube Embed */}
          <div className="group relative">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VDUV70rRxro"
                title="Tridasa Rise Project Walkthrough Video - Luxury Apartments in Nallagandla Hyderabad"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Label */}
            <div className="mt-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                <Video className="w-5 h-5" />
                <span className="text-sm font-medium">Project Walkthrough</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Virtual Tour of Tridasa Rise
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Explore every corner of your dream home
              </p>
            </div>
          </div>

          {/* Construction Status Video - YouTube Shorts Embed */}
          <div className="group relative">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/gdEW_3NpLvQ"
                title="Tridasa Rise Construction Status Update - Nallagandla Hyderabad"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Label */}
            <div className="mt-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                <Video className="w-5 h-5" />
                <span className="text-sm font-medium">Construction Update</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Latest Construction Status
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Watch the progress of your future home
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
