
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { handleMeatSearch, type SearchState } from '@/app/(main)/dashboard/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2, Search, Sparkles } from 'lucide-react';
import ProductGrid from './product-grid';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Search />}
      <span className="ml-2 hidden sm:inline">Search</span>
    </Button>
  );
}

const initialState: SearchState = {
  response: null,
  products: null,
  error: null,
  searchId: '',
};

export default function AiMeatSearch() {
  const [state, formAction] = useActionState(handleMeatSearch, initialState);
  const resultsRef = useRef<HTMLDivElement>(null);
  const prevSearchId = useRef<string | null>(null);

  useEffect(() => {
    if (state.searchId && state.searchId !== prevSearchId.current) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevSearchId.current = state.searchId;
    }
  }, [state.searchId]);

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

        <div ref={resultsRef} className="mt-6">
          {state?.error && (
            <p className="mt-4 text-sm text-destructive">{state.error}</p>
          )}

          {state?.response && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-lg font-semibold">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3>Our suggestion for you:</h3>
              </div>
              <p className="mt-2 text-muted-foreground">
                {state.response}
              </p>
            </div>
          )}

          {state?.products && state.products.length > 0 && (
            <div>
              <h3 className="mb-4 text-xl font-bold">Matching Products</h3>
              <ProductGrid products={state.products} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
