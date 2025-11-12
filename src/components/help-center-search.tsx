'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleHelpSearch } from '@/app/(main)/help-center/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Loader2, Search, Sparkles } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Search />}
      <span className="ml-2 hidden sm:inline">Ask AI</span>
    </Button>
  );
}

export default function HelpCenterSearch() {
  const [state, formAction] = useActionState(handleHelpSearch, { answer: null, error: null });

  return (
    <div className="space-y-4">
        <form action={formAction} className="flex w-full items-center space-x-2">
          <Input
            name="query"
            type="text"
            placeholder="e.g., 'How long does delivery take?'"
            className="flex-grow"
            aria-label="Ask a question"
          />
          <SubmitButton />
        </form>

        {state?.error && (
          <p className="mt-2 text-sm text-destructive">{state.error}</p>
        )}

        {state?.answer && (
          <Card className="bg-muted/50 border-primary/20">
            <CardContent className="p-4">
                 <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-grow">
                        <p className="font-semibold text-primary">Answer from AI</p>
                        <p className="text-sm text-foreground">{state.answer}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
