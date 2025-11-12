'use server';

/**
 * @fileOverview Implements an AI-powered search for the help center.
 *
 * - aiHelpSearch - A function that accepts a user query and returns an answer based on FAQs.
 * - AIHelpSearchInput - The input type for the aiHelpSearch function.
 * - AIHelpSearchOutput - The return type for the aiHelpSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

const faqContext = faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');

const AIHelpSearchInputSchema = z.object({
  query: z.string().describe('The user question about the service.'),
});
export type AIHelpSearchInput = z.infer<typeof AIHelpSearchInputSchema>;

const AIHelpSearchOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question based on the provided FAQ context.'),
});
export type AIHelpSearchOutput = z.infer<typeof AIHelpSearchOutputSchema>;

export async function aiHelpSearch(input: AIHelpSearchInput): Promise<AIHelpSearchOutput> {
  return aiHelpSearchFlow(input);
}

const helpSearchPrompt = ai.definePrompt({
  name: 'helpSearchPrompt',
  input: {schema: AIHelpSearchInputSchema},
  output: {schema: AIHelpSearchOutputSchema},
  prompt: `You are a helpful assistant for an online meat shop called MeatUp. Your role is to answer user questions based *only* on the Frequently Asked Questions (FAQ) context provided below.

  If the answer is in the context, provide a clear and concise answer.
  If the question cannot be answered using the context, simply say "I'm sorry, I couldn't find an answer to your question based on the available information." Do not use outside knowledge.

  FAQ Context:
  ---
  ${faqContext}
  ---

  User Question: {{{query}}}
  
  Answer:`,
});

const aiHelpSearchFlow = ai.defineFlow(
  {
    name: 'aiHelpSearchFlow',
    inputSchema: AIHelpSearchInputSchema,
    outputSchema: AIHelpSearchOutputSchema,
  },
  async input => {
    const {output} = await helpSearchPrompt(input);
    return output!;
  }
);
