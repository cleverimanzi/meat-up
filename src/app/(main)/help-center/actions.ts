'use server';

import { aiHelpSearch } from '@/ai/flows/help-center-flow';
import { z } from 'zod';

const searchSchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters long.'),
});

type SearchState = {
  answer: string | null;
  error: string | null;
};

export async function handleHelpSearch(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const query = formData.get('query');
  
  const validatedFields = searchSchema.safeParse({ query });

  if (!validatedFields.success) {
    return {
      answer: null,
      error: validatedFields.error.flatten().fieldErrors.query?.[0] ?? 'Invalid input.',
    };
  }

  try {
    const result = await aiHelpSearch({ query: validatedFields.data.query });
    if (result.answer) {
      return { answer: result.answer, error: null };
    }
    return { answer: null, error: "I'm sorry, I couldn't find an answer to your question based on the available information." };
  } catch (error) {
    return {
      answer: null,
      error: 'An error occurred while searching. Please try again.',
    };
  }
}
