
'use server';

import { aiProductSearch } from '@/ai/flows/ai-product-search';
import { z } from 'zod';

const searchSchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters long.'),
});

type SearchState = {
  response: string | null;
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
      response: null,
      error: validatedFields.error.flatten().fieldErrors.query?.[0] ?? 'Invalid input.',
    };
  }

  try {
    const result = await aiProductSearch({ query: validatedFields.data.query });
    if (result && result.response) {
      return { response: result.response, error: null };
    }
    return { response: null, error: "We couldn't find any suggestions for your search." };
  } catch (error) {
    console.error("AI Search Error:", error);
    return {
      response: null,
      error: 'An error occurred while searching. Please try again.',
    };
  }
}
