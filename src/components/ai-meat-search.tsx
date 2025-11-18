
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleMeatSearch } from '@/app/(main)/dashboard/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2, Search, Sparkles } from 'lucide-react';

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
  const [state, formAction] = useActionState(handleMeatSearch, { response: null, error: null });

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

        {state?.response && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3>Our suggestion for you:</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              {state.response}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
