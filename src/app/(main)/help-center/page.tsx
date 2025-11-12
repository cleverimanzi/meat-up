import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import HelpCenterSearch from '@/components/help-center-search';

const faqs = [
  {
    question: 'How is the meat packaged?',
    answer:
      'All our meat is vacuum-sealed to ensure maximum freshness and hygiene. It is then placed in insulated packaging to maintain a cold temperature during delivery.',
  },
  {
    question: 'What are the delivery options?',
    answer:
      'We offer standard and express delivery. Standard delivery usually takes 1-2 business days, while express delivery ensures your order arrives on the same day if placed before noon.',
  },
  {
    question: 'How do I know the meat is fresh?',
    answer:
      'We source our meat from trusted local butchers daily. Our commitment to quality and our vacuum-sealed packaging guarantees that you receive only the freshest products.',
  },
  {
    question: 'Can I return my order?',
    answer:
      'Due to the perishable nature of our products, we do not accept returns. However, if you are not satisfied with your order for any reason, please contact our support team, and we will do our best to resolve the issue.',
  },
  {
    question: 'How do I place a custom order?',
    answer:
      'For custom cuts or bulk orders, please contact us directly through our WhatsApp chat or email. We are happy to accommodate your specific needs.',
  },
];

export default function HelpCenterPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <HelpCircle className="h-8 w-8" />
            Help Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Have questions? Ask our AI assistant or check our frequently asked questions below.
          </p>

          <HelpCenterSearch />

          <div className="mt-8">
            <h3 className="mb-4 text-2xl font-headline font-bold">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
