import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { name: "Rajesh", business: "Restaurant Owner", rating: 5, text: "Naani Projects transformed our online presence. Within 3 months, our social media following doubled and we saw a 40% increase in reservations through our website." },
  { name: "Priya", business: "E-commerce Founder", rating: 5, text: "The team's expertise in SEO and paid ads helped us reach customers we never thought possible. Our revenue has grown consistently every month since we started working together." },
  { name: "Anil", business: "Real Estate Developer", rating: 5, text: "Professional, creative, and results-driven. Naani Projects's branding work helped us stand out in a competitive market. Highly recommend their services!" },
  { name: "Sneha", business: "Retail Store Owner", rating: 5, text: "From WhatsApp marketing to beautiful social media posts, they handle everything. Our customer engagement has never been better. Great value for money!" },
  { name: "Vikram", business: "Healthcare Provider", rating: 5, text: "The website they designed for us is stunning and easy to use. We've received so many compliments from patients. The team is always responsive and helpful." },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => { setIsAutoPlaying(false); setDirection(-1); setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length); };
  const goToNext = () => { setIsAutoPlaying(false); setDirection(1); setCurrentIndex((prev) => (prev + 1) % testimonials.length); };
  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">What Our Clients Say</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">Real feedback from real businesses we've helped grow</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="zoomIn" delay={0.15}>
          <div className="max-w-4xl mx-auto">
            <div className="glass-card overflow-hidden">
              <div className="p-[2px] rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20">
                <div className="bg-card rounded-2xl p-8 md:p-12">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex} custom={direction}
                      initial={{ opacity: 0, x: direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 40 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                      className="flex flex-col items-center text-center space-y-6"
                    >
                      <div className="flex gap-1">
                        {Array.from({ length: current.rating }).map((_, i) => (
                          <Star key={i} className="fill-primary text-primary" size={20} />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                        "{current.text}"
                      </blockquote>
                      <div className="space-y-2">
                        <p className="text-lg font-bold text-primary">{current.name}</p>
                        <p className="text-sm text-secondary">{current.business}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-center gap-4 pt-8">
                    <Button variant="outline" size="icon" onClick={goToPrevious}
                      className="rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary hover:scale-110 transition-all duration-300">
                      <ChevronLeft size={20} />
                    </Button>
                    <div className="flex gap-4">
                      {testimonials.map((_, index) => (
                        <button key={index}
                          onClick={() => { setIsAutoPlaying(false); setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
                          className={`h-4 rounded-full transition-all duration-300 ${
                            index === currentIndex ? "w-8 bg-primary shadow-gold" : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                    <Button variant="outline" size="icon" onClick={goToNext}
                      className="rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary hover:scale-110 transition-all duration-300">
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;