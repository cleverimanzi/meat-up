'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleMeatSearch } from '@/app/(main)/dashboard/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2, Search } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Search />}
      <span className="ml-2 hidden sm:inline">Search</span>
    </Button>
  );
}

export default function AiMeatSearch() {
  const [state, formAction] = useFormState(handleMeatSearch, { suggestions: [], error: null });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI-Powered Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex w-full items-center space-x-2">
          <Input
            name="query"
            type="text"
            placeholder="e.g., 'something for the grill' or 'lamb chops'"
            className="flex-grow"
          />
          <SubmitButton />
        </form>

        {state?.error && (
          <p className="mt-4 text-sm text-destructive">{state.error}</p>
        )}

        {state?.suggestions && state.suggestions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Suggestions for you:</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {state.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
