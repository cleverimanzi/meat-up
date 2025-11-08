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

const AIProductSearchInputSchema = z.object({
  query: z.string().describe('The user search query for meat products.'),
});
export type AIProductSearchInput = z.infer<typeof AIProductSearchInputSchema>;

const AIProductSearchOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested meat products based on the query.'),
});
export type AIProductSearchOutput = z.infer<typeof AIProductSearchOutputSchema>;

export async function aiProductSearch(input: AIProductSearchInput): Promise<AIProductSearchOutput> {
  return aiProductSearchFlow(input);
}

const productSearchPrompt = ai.definePrompt({
  name: 'productSearchPrompt',
  input: {schema: AIProductSearchInputSchema},
  output: {schema: AIProductSearchOutputSchema},
  prompt: `You are a helpful assistant that suggests meat products based on user queries.

  The user may not know the exact name of the product, so you should use AI to understand their request and suggest relevant products.

  User Query: {{{query}}}

  Suggestions:`, // Ensure the LLM returns result in JSON format.
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
