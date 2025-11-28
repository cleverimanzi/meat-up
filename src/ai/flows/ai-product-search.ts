
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

const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    category: z.string(),
});

const AIProductSearchOutputSchema = z.object({
  response: z
    .string()
    .describe(
      "A helpful, conversational response to the user's query. Use the search results to suggest specific products. If no relevant products are found, politely say that you couldn't find any suggestions and encourage them to browse."
    ),
  products: z.array(ProductSchema).describe("An array of product objects that are most relevant to the user's search query.")
});
export type AIProductSearchOutput = z.infer<typeof AIProductSearchOutputSchema>;

// This is a "tool" the AI can use to search for products.
const productSearchTool = ai.defineTool(
  {
    name: 'productSearch',
    description: 'Search for meat products in the store catalog. You can search by a keyword, or filter by a specific product category.',
    inputSchema: z.object({ 
      query: z.string().optional().describe('A general search keyword. Can be a product name, a characteristic (like "tender" or "spicy"), or a cooking method (like "grill" or "roast").'),
      category: z.string().optional().describe('A specific category to filter by. Available categories are: beef, pork, chicken, lamb, fish, poultry, other.'),
    }),
    outputSchema: z.array(ProductSchema),
  },
  async (input) => {
    console.log('productSearchTool searching for:', input);
    let filteredProducts = [...products];

    // Filter by category
    if (input.category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === input.category.toLowerCase());
    }

    // Filter by query string
    if (input.query) {
      const lowercasedQuery = input.query.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery) ||
          lowercasedQuery.split(' ').some(keyword => 
              product.name.toLowerCase().includes(keyword) || 
              product.description.toLowerCase().includes(keyword) ||
              product.category.toLowerCase().includes(keyword)
          )
      );
    }
    
    console.log(`Found ${filteredProducts.length} products`);
    return filteredProducts;
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

      1. First, analyze the user's query to understand their intent. Do they mention a specific type of meat like 'beef' or 'chicken'? If so, use the 'category' parameter in the productSearch tool. Otherwise, use the 'query' parameter for a general search.
      2. You MUST use the productSearch tool to find relevant products based on the user's query.
      3. Analyze the search results from the tool.
      4. Based on the products found, formulate a friendly, conversational response. For example: "For the grill, I'd recommend our Prime Ribeye Steak or Thick-Cut Pork Chops. Both are excellent choices!".
      5. Return both the conversational response AND the array of product objects you found using the tool.
      6. If the tool returns no products, create a response like "I couldn't find any specific matches for that, but feel free to browse our full selection!" and return an empty array for the products.
      7. Your final output must strictly follow the required JSON schema with 'response' and 'products' fields.

      User Query: "${query}"`,
      tools: [productSearchTool],
      model: ai.registry.getModel('googleai/gemini-2.5-flash'),
      output: {
        schema: AIProductSearchOutputSchema,
        format: 'json',
      }
    });
    
    const output = llmResponse.output;
    if (output) {
        return output;
    }

    // Fallback in case the model fails to produce structured output
    return { 
        response: "I'm sorry, I had trouble with that search. Please try a different query or browse our products directly.",
        products: [] 
    };
  }
);
