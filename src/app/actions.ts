'use server';

import { analyzeNewsArticle, AnalyzeNewsArticleOutput } from '@/ai/flows/analyze-news-article';
import { z } from 'zod';

const formSchema = z.object({
  text: z.string().min(10, { message: 'Article text must be at least 10 characters long.' }),
});

export interface FormState {
  result?: AnalyzeNewsArticleOutput;
  error?: string;
  success: boolean;
}

export async function handleAnalysis(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.text?.join(', '),
    };
  }

  try {
    const result = await analyzeNewsArticle({ text: validatedFields.data.text });
    return { result, success: true };
  } catch (error) {
    console.error('Error analyzing article:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
