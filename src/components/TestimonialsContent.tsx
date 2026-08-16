import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle, CheckCircle, Users, Award, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const testimonials = [
  {
    name: "Rajesh Kumar",
    business: "Restaurant Chain Owner, Hyderabad",
    rating: 5,
    text: "Naani Projects transformed our online presence. Within 3 months, our social media following doubled and we saw a 40% increase in reservations through our website. Their team truly understands the Hyderabad market.",
    result: "40% more reservations",
  },
  {
    name: "Dr. Priya Reddy",
    business: "Multi-Specialty Clinic, Hyderabad",
    rating: 5,
    text: "The team's expertise in SEO helped us reach patients we never thought possible. We now rank #1 for several healthcare keywords in Hyderabad. Our patient appointments have increased by 150%.",
    result: "150% patient growth",
  },
  {
    name: "Anil Sharma",
    business: "Real Estate Developer, Hyderabad",
    rating: 5,
    text: "Professional, creative, and results-driven. Naani Projects's PPC and branding work helped us generate 320% more qualified leads. Highly recommend their services for any real estate business!",
    result: "320% more leads",
  },
  {
    name: "Sneha Rao",
    business: "Salon & Spa Owner, Hyderabad",
    rating: 5,
    text: "From WhatsApp marketing to beautiful social media posts, they handle everything. Our customer engagement has never been better. Great value for money and always responsive!",
    result: "2x customer engagement",
  },
  {
    name: "Vikram Reddy",
    business: "IT Startup Founder, Hyderabad",
    rating: 5,
    text: "The LinkedIn marketing strategy they developed for us was game-changing. We generated 500+ B2B leads in just 60 days. Naani Projects is the real deal for startups in Hyderabad.",
    result: "500+ B2B leads",
  },
];

const TestimonialsContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Client Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Online Marketing Agency in Hyderabad – Client Reviews
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Don't just take our word for it. Read what real Hyderabad businesses say about working with{" "}
            <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link>. 
            From restaurants to real estate, healthcare to IT startups—our clients share their honest 
            experiences and the results they've achieved with our digital marketing services.
          </p>
          <p className="text-muted-foreground">
            We believe in transparency and accountability. Every testimonial here is from a verified client 
            who trusted us with their growth. Want to join them? Check out our{" "}
            <Link to="/services/seo-services" className="text-accent hover:underline">SEO services</Link>,{" "}
            <Link to="/services/social-media-marketing" className="text-accent hover:underline">social media marketing</Link>, and{" "}
            <Link to="/services/pay-per-click-ads" className="text-accent hover:underline">PPC campaigns</Link>.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="fill-accent text-accent" size={16} />
              ))}
            </div>
            <p className="text-2xl font-bold">4.9/5</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <Users className="mx-auto text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">14+</p>
            <p className="text-sm text-muted-foreground">Happy Clients</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <Award className="mx-auto text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <TrendingUp className="mx-auto text-accent mb-2" size={24} />
            <p className="text-2xl font-bold">50+</p>
            <p className="text-sm text-muted-foreground">Projects Delivered</p>
          </div>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Featured Client Stories</h2>
          <Card className="border-accent/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-rainbow p-[2px]">
                <div className="bg-card p-8 md:p-12">
                  <div className="flex flex-col items-center text-center space-y-6 animate-fade-in" key={currentIndex}>
                    <Quote className="text-accent/30" size={48} />
                    
                    <div className="flex gap-1">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star key={i} className="fill-accent text-accent" size={20} />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl font-medium leading-relaxed">
                      "{current.text}"
                    </blockquote>

                    <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">
                      {current.result}
                    </div>

                    <div className="space-y-2">
                      <p className="text-lg font-bold text-accent">{current.name}</p>
                      <p className="text-sm text-muted-foreground">{current.business}</p>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPrevious}
                        className="rounded-full hover:bg-accent/10 hover:border-accent"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft size={20} />
                      </Button>

                      <div className="flex gap-4">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setIsAutoPlaying(false);
                              setCurrentIndex(index);
                            }}
                            aria-label={`Go to testimonial ${index + 1}`}
                            className={`h-4 rounded-full transition-all duration-300 ${
                              index === currentIndex
                                ? "w-8 bg-accent"
                                : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            }`}
                          />
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNext}
                        className="rounded-full hover:bg-accent/10 hover:border-accent"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Testimonials Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Hyderabad Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="fill-accent text-accent" size={14} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4">"{testimonial.text}"</p>
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                    {testimonial.result}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Clients Trust Us */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Hyderabad Businesses Trust Naani Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Transparent Communication</h3>
                <p className="text-muted-foreground text-sm">We keep you updated at every step. Regular reports, clear metrics, and honest feedback—no surprises.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Results-Driven Approach</h3>
                <p className="text-muted-foreground text-sm">We focus on what matters—leads, sales, and growth. Every campaign is optimized for ROI.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Local Expertise</h3>
                <p className="text-muted-foreground text-sm">We understand Hyderabad's market, culture, and customer behavior. Your campaigns are tailored for local success.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Dedicated Support</h3>
                <p className="text-muted-foreground text-sm">A dedicated account manager who knows your business inside-out. Quick responses, proactive solutions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-8 text-center">
              <MessageCircle className="mx-auto text-accent mb-4" size={40} />
              <h2 className="text-2xl font-bold mb-4">Want to Be Our Next Success Story?</h2>
              <p className="text-muted-foreground mb-6">
                Join 14+ satisfied Hyderabad businesses that chose{" "}
                <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link> for their growth. 
                Let's discuss how we can help you achieve similar results.
              </p>
              <a 
                href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20read%20your%20client%20testimonials%20and%20want%20to%20discuss%20my%20project."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                  <MessageCircle className="mr-2" size={20} />
                  Get Your Free Consultation on WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Reference Offer */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">Want to Speak with a Past Client?</h2>
          <p className="text-center text-muted-foreground mb-6">
            We're confident in our work. If you'd like to speak with one of our past clients for a reference, 
            we're happy to connect you. Just reach out and we'll arrange a call with a client in your industry.
          </p>
          <div className="text-center">
            <a 
              href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20would%20like%20to%20speak%20with%20a%20past%20client%20for%20reference."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                Request a Client Reference
              </Button>
            </a>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-8 py-6 rounded-xl bg-gradient-rainbow">
            <p className="text-xl font-bold text-primary-foreground mb-2">
              Ready to Experience the Naani Projects Difference?
            </p>
            <p className="text-primary-foreground/80 text-sm">
              100% client satisfaction. 50+ successful campaigns. Your success is next.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20want%20to%20start%20my%20digital%20marketing%20journey."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                <MessageCircle className="mr-2" size={20} />
                Start Your Journey Today
              </Button>
            </a>
            <Link to="/portfolio">
              <Button size="lg" variant="outline">
                View Our Portfolio <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsContent;
