'use server';

import { aiProductSearch } from '@/ai/flows/ai-product-search';
import { z } from 'zod';

const searchSchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters long.'),
});

type SearchState = {
  suggestions: string[];
  error: string | null;
};

export async function handleMeatSearch(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const query = formData.get('query');
  
  const validatedFields = searchSchema.safeParse({ query });

  if (!validatedFields.success) {
    return {
      suggestions: [],
      error: validatedFields.error.flatten().fieldErrors.query?.[0] ?? 'Invalid input.',
    };
  }

  try {
    const result = await aiProductSearch({ query: validatedFields.data.query });
    if (result && result.suggestions && result.suggestions.length > 0) {
      return { suggestions: result.suggestions, error: null };
    }
    return { suggestions: [], error: "We couldn't find any suggestions for your search." };
  } catch (error) {
    console.error("AI Search Error:", error);
    return {
      suggestions: [],
      error: 'An error occurred while searching. Please try again.',
    };
  }
}
