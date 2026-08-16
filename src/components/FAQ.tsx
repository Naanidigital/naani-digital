import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What services does Naani Projects offer?",
    answer: "Naani Projects provides end-to-end digital marketing solutions including SEO, PPC (Meta & Google Ads), social media management, website design & development, content marketing, branding, graphic/video design, WhatsApp/Email/SMS marketing, and influencer/LinkedIn campaigns."
  },
  {
    question: "How do I get started with your agency?",
    answer: "Simply contact us using our online form, WhatsApp, or email. We'll arrange a discovery call to understand your business needs and recommend tailored solutions."
  },
  {
    question: "Can you help my business even if we are new to digital marketing?",
    answer: "Absolutely! We guide startups and businesses of all sizes, customizing our strategies to your current level and growth goals."
  },
  {
    question: "How much does digital marketing cost?",
    answer: "Our pricing depends on goals, channels selected, and campaign scale. Contact us for a no-obligation quote or schedule a free audit."
  },
  {
    question: "Will my new website be mobile-friendly?",
    answer: "Yes, every site we build is fully responsive and optimized for all devices—mobile, tablet, and desktop."
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes, we offer redesign and optimization services to improve UI/UX, speed, SEO, and conversions."
  },
  {
    question: "What industries do you serve?",
    answer: "We work across all sectors, including healthcare, IT, real estate, pharma, hospitality, aviation, food, travel, retail, F&B, and more."
  },
  {
    question: "How do you measure the success of digital campaigns?",
    answer: "We track and report on key metrics: website traffic, SEO ranking, ad ROI, lead generation, and audience engagement using reliable analytics tools."
  },
  {
    question: "What is your average project turnaround time?",
    answer: "Timelines depend on project size—simple campaigns can start in days, while full websites may take 2–6 weeks."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer continuous support, analytics reviews, and post-launch updates to ensure lasting performance."
  },
  {
    question: "Can you help manage my social media platforms?",
    answer: "Absolutely! Our team creates, schedules, and manages content, ads, and community engagement on major social media channels."
  },
  {
    question: "How secure is my website and data?",
    answer: "We follow best practices for site security, data privacy, and ongoing monitoring. All client and user data is kept confidential."
  },
  {
    question: "How do I contact you for urgent updates?",
    answer: "You can reach us via WhatsApp (+91 81858 56789), call, or email—contact details are always at the bottom of the website."
  },
  {
    question: "What's your process for new projects?",
    answer: "From discovery and planning to creative execution and performance tracking, we keep you informed at every step with clear communication."
  },
  {
    question: "Do you offer any special promotions for new clients?",
    answer: "Yes! Special surprise offers are available for new clients—reach out to learn more."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-rainbow mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-rainbow bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about working with Naani Projects.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-rainbow text-white font-semibold hover:shadow-glow transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
