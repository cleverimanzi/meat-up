
'use server';

/**
 * @fileOverview Implements the AI-powered product search flow.
 *
 * - aiProductSearch - A function that accepts a search query and returns relevant product suggestions.
 * - AIProductSearchInput - The input type for the aiProductSearch function.
 * - AIProductSearchOutput - The return type for the aiProductSearch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { products } from '@/lib/products';
import type { Product } from '@/lib/types';

const AIProductSearchInputSchema = z.object({
  query: z.string().describe('The user search query for meat products.'),
});
export type AIProductSearchInput = z.infer<typeof AIProductSearchInputSchema>;

const AIProductSearchOutputSchema = z.object({
  response: z
    .string()
    .describe(
      "A helpful, conversational response to the user's query. Use the search results to suggest specific products. If no relevant products are found, politely say that you couldn't find any suggestions and encourage them to browse."
    ),
});
export type AIProductSearchOutput = z.infer<typeof AIProductSearchOutputSchema>;

// This is a "tool" the AI can use to search for products.
const productSearchTool = ai.defineTool(
  {
    name: 'productSearch',
    description: 'Search for meat products in the store catalog.',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.array(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
    })),
  },
  async (input) => {
    const lowercasedQuery = input.query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
    );
  }
);

export async function aiProductSearch(
  input: AIProductSearchInput
): Promise<AIProductSearchOutput> {
  return aiProductSearchFlow(input);
}

const aiProductSearchFlow = ai.defineFlow(
  {
    name: 'aiProductSearchFlow',
    inputSchema: AIProductSearchInputSchema,
    outputSchema: AIProductSearchOutputSchema,
  },
  async ({ query }) => {

    const llmResponse = await ai.generate({
      prompt: `You are a friendly and helpful butcher's assistant for an online store called MeatUp.
      Your goal is to help users find the perfect meat product based on their search query.

      1. First, use the productSearch tool to find relevant products based on the user's query.
      2. Analyze the search results.
      3. Formulate a conversational, helpful recommendation based on what you found. Your suggestions MUST come from the tool's results.

      - If the search returns good matches, respond enthusiastically and mention one or two products. For example: "Lamb Chops are a fantastic choice! We have tender and flavorful ones ready for you." or "For the grill, I'd recommend our Prime Ribeye Steak or Thick-Cut Pork Chops. Both are excellent for grilling!"
      - If the search returns no results, politely tell the user you couldn't find any suggestions for their query and encourage them to browse the full product list. For example: "I couldn't find any specific suggestions for that, but feel free to browse our full selection of high-quality meats!"
      - Always keep the final response concise, friendly, and in a single paragraph.

      User Query: "${query}"`,
      tools: [productSearchTool],
      model: ai.registry.getModel('googleai/gemini-2.5-flash'),
    });

    const choice = llmResponse.choices[0];
    const toolResponse = choice.toolResponse;

    if (toolResponse) {
       const finalLlmResponse = await ai.generate({
         prompt: `Based on the search results, provide a friendly and conversational response to the user's query.
          User Query: "${query}"
          Search Results: ${JSON.stringify(toolResponse.output)}`,
         model: ai.registry.getModel('googleai/gemini-2.5-flash'),
       });
       return { response: finalLlmResponse.text };
    }

    // If no tool was called, return the direct text response
    if (choice.message.content[0].text) {
        return { response: choice.text };
    }

    return { response: "I couldn't find any suggestions right now, but please feel free to browse our products!" };
  }
);
