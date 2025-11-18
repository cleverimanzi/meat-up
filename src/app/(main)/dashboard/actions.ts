
'use server';

import { aiProductSearch } from '@/ai/flows/ai-product-search';
import type { Product } from '@/lib/types';
import { z } from 'zod';

const searchSchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters long.'),
});

export type SearchState = {
  response: string | null;
  products: Product[] | null;
  error: string | null;
  searchId: string;
};

export async function handleMeatSearch(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const query = formData.get('query');
  
  const validatedFields = searchSchema.safeParse({ query });

  if (!validatedFields.success) {
    return {
      response: null,
      products: null,
      error: validatedFields.error.flatten().fieldErrors.query?.[0] ?? 'Invalid input.',
      searchId: new Date().getTime().toString(),
    };
  }

  try {
    const result = await aiProductSearch({ query: validatedFields.data.query });
    
    if (result) {
      return { 
        response: result.response, 
        products: result.products,
        error: null,
        searchId: new Date().getTime().toString(),
      };
    }
    return { 
        response: null, 
        products: null, 
        error: "We couldn't find any suggestions for your search.",
        searchId: new Date().getTime().toString(),
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    return {
      response: null,
      products: null,
      error: 'An error occurred while searching. Please try again.',
      searchId: new Date().getTime().toString(),
    };
  }
}
