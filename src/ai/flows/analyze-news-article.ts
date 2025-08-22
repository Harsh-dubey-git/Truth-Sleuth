'use server';

/**
 * @fileOverview An AI agent that analyzes news articles to determine if they are real or fake.
 *
 * - analyzeNewsArticle - A function that handles the news article analysis process.
 * - AnalyzeNewsArticleInput - The input type for the analyzeNewsArticle function.
 * - AnalyzeNewsArticleOutput - The return type for the analyzeNewsArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeNewsArticleInputSchema = z.object({
  text: z.string().describe('The news article text to analyze.'),
});
export type AnalyzeNewsArticleInput = z.infer<typeof AnalyzeNewsArticleInputSchema>;

const AnalyzeNewsArticleOutputSchema = z.object({
  prediction: z.enum(['Real', 'Fake']).describe('The predicted label for the news article.'),
  confidenceScore: z.number().min(0).max(1).describe('The confidence score of the prediction (0-1).'),
  keywords: z.array(z.string()).describe('A list of 3-5 keywords or phrases from the article that most strongly influenced the prediction.'),
  explanation: z.string().describe('A brief, neutral, and objective explanation of the reasoning behind the prediction, citing the keywords.'),
});
export type AnalyzeNewsArticleOutput = z.infer<typeof AnalyzeNewsArticleOutputSchema>;

export async function analyzeNewsArticle(input: AnalyzeNewsArticleInput): Promise<AnalyzeNewsArticleOutput> {
  return analyzeNewsArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeNewsArticlePrompt',
  input: {schema: AnalyzeNewsArticleInputSchema},
  output: {schema: AnalyzeNewsArticleOutputSchema},
  prompt: `You are a highly accurate and impartial fake news detection expert. Your goal is to analyze the provided news article and determine its authenticity based on its content, language, and structure.

Analyze the following news article:

Article: {{{text}}}

Carefully evaluate the article for indicators of real or fake news, such as sensationalism, emotional language, biased reporting, lack of sources, or factual inconsistencies.

Based on your analysis, provide the following in your response:
- prediction: Classify the article as "Real" or "Fake".
- confidenceScore: A value between 0 and 1 indicating your confidence in the prediction. Be critical and avoid extreme scores unless you are absolutely certain.
- keywords: Extract the 3 to 5 most influential keywords or short phrases from the article that led to your prediction.
- explanation: Provide a brief, neutral, and objective explanation for your decision, referencing the keywords you identified. Explain *why* those keywords are indicative of real or fake news.
  `,
});

const analyzeNewsArticleFlow = ai.defineFlow(
  {
    name: 'analyzeNewsArticleFlow',
    inputSchema: AnalyzeNewsArticleInputSchema,
    outputSchema: AnalyzeNewsArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
