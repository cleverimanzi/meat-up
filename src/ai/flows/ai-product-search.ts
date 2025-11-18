
'use server';

/**
 * @fileOverview Implements the AI-powered product search flow.
 *
 * - aiProductSearch - A function that accepts a search query and returns relevant product suggestions.
 * - AIProductSearchInput - The input type for the aiProductSearch function.
 * - AIProductSearchOutput - The return type for the aiProductSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { products } from '@/lib/products';

const allProductNames = products.map(p => p.name).join(', ');

const AIProductSearchInputSchema = z.object({
  query: z.string().describe('The user search query for meat products.'),
});
export type AIProductSearchInput = z.infer<typeof AIProductSearchInputSchema>;

const AIProductSearchOutputSchema = z.object({
  response: z.string().describe("A helpful, conversational response to the user's query, suggesting specific products from the list. If no relevant products are found, say that you couldn't find any suggestions."),
});
export type AIProductSearchOutput = z.infer<typeof AIProductSearchOutputSchema>;

export async function aiProductSearch(input: AIProductSearchInput): Promise<AIProductSearchOutput> {
  return aiProductSearchFlow(input);
}

const productSearchPrompt = ai.definePrompt({
  name: 'productSearchPrompt',
  input: {schema: AIProductSearchInputSchema},
  output: {schema: AIProductSearchOutputSchema},
  prompt: `You are a friendly and helpful butcher's assistant for an online store called MeatUp. Your goal is to help users find the perfect meat product based on their search query.

  You have the following products available: ${allProductNames}.

  Analyze the user's query and provide a conversational, helpful recommendation from the available product list. Your suggestions MUST be from this list.

  - If the query matches products well (e.g., 'lamb chops'), respond enthusiastically. For example: "Lamb Chops are a fantastic choice! We have tender and flavorful ones ready for you."
  - If the query is more general (e.g., 'something for the grill'), suggest a few good options. For example: "For the grill, I'd recommend our Prime Ribeye Steak or Thick-Cut Pork Chops. Both are excellent for grilling!"
  - If no relevant products are found, politely tell the user you couldn't find any suggestions and encourage them to browse the full product list. For example: "I couldn't find any specific suggestions for that, but feel free to browse our full selection of products!"
  - Always keep the response concise and friendly.

  User Query: {{{query}}}
`,
});

const aiProductSearchFlow = ai.defineFlow(
  {
    name: 'aiProductSearchFlow',
    inputSchema: AIProductSearchInputSchema,
    outputSchema: AIProductSearchOutputSchema,
  },
  async input => {
    const {output} = await productSearchPrompt(input);
    return output!;
  }
);
