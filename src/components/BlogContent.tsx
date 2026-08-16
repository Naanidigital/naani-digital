import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, MessageCircle, TrendingUp, Lightbulb, Target, BookOpen, Rss, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";

const BlogContent = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate List of 43 Best AI Tools for 2025 to Boost Productivity",
      description: "Explore the 43 best AI tools for 2025—tested and ranked to boost productivity, automate workflows, and scale your digital marketing results.",
      date: "May 15, 2025",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      slug: "the-ultimate-list-of-43-best-ai-tools-for-2025-to-boost-productivity",
      category: "AI & Technology",
    },
    {
      id: 2,
      title: "How to Run Facebook Ads (Beginner-Friendly Guide)",
      description: "Learn how to run Facebook Ads with this easy, step-by-step beginner guide. Discover setup, targeting, budgeting, creatives, and optimization strategies.",
      date: "December 12, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80",
      slug: "how-to-run-facebook-ads",
      category: "Social Media",
    },
  ];

  const blogCategories = [
    { name: "SEO Strategies", count: 5, icon: TrendingUp },
    { name: "Social Media", count: 8, icon: Target },
    { name: "PPC & Ads", count: 4, icon: Lightbulb },
    { name: "Content Marketing", count: 6, icon: BookOpen },
  ];

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-2">
            Naani Projects Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-rainbow bg-clip-text text-transparent pb-2">
            Digital Marketing Campaigns That Generate Leads & Sales
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to the{" "}
            <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link> blog—your 
            go-to resource for actionable digital marketing strategies, tips, and insights. Whether you're a 
            startup founder in Hyderabad, a restaurant owner looking to attract more customers, or an IT company 
            scaling your B2B leads, our blog delivers real-world tactics that work.
          </p>
          <p className="text-muted-foreground">
            From{" "}
            <Link to="/services/seo-services" className="text-accent hover:underline">SEO strategies</Link> to{" "}
            <Link to="/services/social-media-marketing" className="text-accent hover:underline">social media marketing</Link> and{" "}
            <Link to="/services/pay-per-click-ads" className="text-accent hover:underline">PPC campaigns</Link>—we 
            share what's working right now in the Hyderabad market and beyond.
          </p>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">What You'll Learn From Our Blog</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <TrendingUp className="mx-auto text-accent mb-4" size={32} />
              <h3 className="font-bold mb-2">SEO That Ranks</h3>
              <p className="text-sm text-muted-foreground">Learn proven SEO strategies to dominate Google search in Hyderabad.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <Target className="mx-auto text-accent mb-4" size={32} />
              <h3 className="font-bold mb-2">Ads That Convert</h3>
              <p className="text-sm text-muted-foreground">Master Google Ads and Facebook Ads for maximum ROI.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <Lightbulb className="mx-auto text-accent mb-4" size={32} />
              <h3 className="font-bold mb-2">Growth Hacks</h3>
              <p className="text-sm text-muted-foreground">Discover startup growth strategies that work in the Indian market.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border border-border">
              <BookOpen className="mx-auto text-accent mb-4" size={32} />
              <h3 className="font-bold mb-2">Industry Insights</h3>
              <p className="text-sm text-muted-foreground">Real case studies from Hyderabad businesses across industries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fetchPriority="high" decoding="async" />
                  <div className="absolute top-4 left-4 bg-accent px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                    {post.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </div>
                </div>
                
                <CardHeader className="flex-grow">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0 mt-auto">
                  <Link to={`/blogs/${post.slug}`}>
                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-accent group-hover:translate-x-2 transition-transform duration-300">
                      Read Article <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Topics */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Topics We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {blogCategories.map((category, index) => (
              <div key={index} className="p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors text-center">
                <category.icon className="mx-auto text-accent mb-2" size={24} />
                <p className="font-semibold">{category.name}</p>
                <p className="text-xs text-muted-foreground">{category.count} Articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Read Our Blog */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Why Read the Naani Projects Blog?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Hyderabad-Focused Insights</h3>
                <p className="text-muted-foreground text-sm">Every strategy is tested and proven in the Hyderabad market. Local insights, local success.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">No Fluff, Just Action</h3>
                <p className="text-muted-foreground text-sm">We skip the theory and give you step-by-step guides you can implement today.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Industry-Specific Tips</h3>
                <p className="text-muted-foreground text-sm">Whether you're in real estate, healthcare, or IT—we cover strategies for your industry.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border">
              <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Updated Regularly</h3>
                <p className="text-muted-foreground text-sm">Digital marketing evolves fast. We keep our content fresh and relevant.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-8 text-center">
              <MessageCircle className="mx-auto text-accent mb-4" size={40} />
              <h2 className="text-2xl font-bold mb-4">Have a Question About Digital Marketing?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Reach out to{" "}
                <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link> on 
                WhatsApp. Our team is happy to answer your digital marketing questions and provide personalized advice.
              </p>
              <a 
                href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20have%20a%20question%20about%20digital%20marketing."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                  <MessageCircle className="mr-2" size={20} />
                  Ask Us on WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto bg-secondary/20 rounded-3xl p-8 md:p-12 border border-accent/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
          <Rss className="mx-auto text-accent mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Never Miss a Marketing Tip</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get the latest digital marketing strategies, tips, and 
            Hyderabad-focused insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <Button className="bg-gradient-rainbow hover:opacity-90">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Related Services */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Want Us to Handle Your Marketing?</h2>
          <p className="text-center text-muted-foreground mb-8">
            Reading is great, but results are better. Let{" "}
            <Link to="/" className="text-accent hover:underline font-semibold">Naani Projects</Link> implement 
            these strategies for your business. Here's what we offer:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/services/seo-services" className="p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors text-center">
              <h3 className="font-bold mb-1">SEO Services</h3>
              <p className="text-xs text-muted-foreground">Rank #1 on Google in Hyderabad</p>
            </Link>
            <Link to="/services/social-media-marketing" className="p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors text-center">
              <h3 className="font-bold mb-1">Social Media Marketing</h3>
              <p className="text-xs text-muted-foreground">Grow your followers & sales</p>
            </Link>
            <Link to="/services/pay-per-click-ads" className="p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors text-center">
              <h3 className="font-bold mb-1">PPC Campaigns</h3>
              <p className="text-xs text-muted-foreground">Instant leads with Google Ads</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-8 py-6 rounded-xl bg-gradient-rainbow">
            <p className="text-xl font-bold text-primary-foreground mb-2">
              Ready to Turn Knowledge Into Results?
            </p>
            <p className="text-primary-foreground/80 text-sm">
              Let's build a winning digital marketing strategy for your Hyderabad business
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/918185856789?text=Hi%20Naani%20Digital!%20I%20want%20to%20discuss%20digital%20marketing%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gradient-rainbow hover:opacity-90">
                <MessageCircle className="mr-2" size={20} />
                Get Your Free Strategy Call
              </Button>
            </a>
            <Link to="/contact-us">
              <Button size="lg" variant="outline">
                Contact Us <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogContent;
