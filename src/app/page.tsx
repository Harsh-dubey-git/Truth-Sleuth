'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleAnalysis, FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResult } from '@/components/analysis-result';
import { Methodology } from '@/components/methodology';
import { Loader2, Sparkles } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Analyze Article
    </Button>
  );
}

export default function Home() {
  const initialState: FormState = { success: false };
  const [state, formAction] = useActionState(handleAnalysis, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (!state.success && state.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
               <svg
                className="w-6 h-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 14 4-4" />
                <path d="M12 14v4" />
                <path d="M18.37 7.63A4.99 4.99 0 0 0 12 6a5 5 0 0 0-7 4c0 2.48 2.02 4.5 4.5 4.5h.5" />
                <path d="m11.5 14.5.5.5" />
                <path d="m6.43 2.57.5.5" />
                <path d="M17.57 2.57-.5.5" />
                <path d="M2.57 17.57l.5.5" />
                <path d="m17.57 17.57-.5.5" />
              </svg>
            </div>
            <h1 className="text-xl font-headline font-semibold text-foreground">
              Truth Sleuth
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">
            Your AI-powered guide to navigating the news landscape. Paste an article below to check its authenticity.
          </p>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex flex-1 flex-col p-4 sm:p-8 items-center">
            <header className="w-full max-w-3xl mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-headline font-bold text-foreground">
                  Article Analysis
                </h1>
                <SidebarTrigger className="md:hidden" />
            </header>

            <Card className="w-full max-w-3xl shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Analyze New Article</CardTitle>
                  <CardDescription>
                    Enter a news headline or the full article text for analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={formAction} className="space-y-4">
                    <Textarea
                      name="text"
                      placeholder="Paste your news article here..."
                      className="min-h-[200px] text-base"
                      required
                    />
                    <SubmitButton />
                  </form>
                </CardContent>
              </Card>

            {state.success && state.result && (
              <div className="w-full max-w-3xl">
                <AnalysisResult result={state.result} />
              </div>
            )}

            <Methodology />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
