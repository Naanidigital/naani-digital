import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

interface FAQItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  items?: FAQItem[];
  pageUrl?: string;
}

const FAQSection = ({ faqs, items, pageUrl = "https://www.naani.in" }: FAQSectionProps) => {
  const rawList = faqs || items || [];
  const list = rawList.map(item => ({
    question: item.question || item.q || "",
    answer: item.answer || item.a || "",
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": list.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  if (!list.length) return null;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about real estate &amp; property buying in Hyderabad
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {list.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glassmorphic rounded-xl px-6 border-border/50 hover:border-accent/50 transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
