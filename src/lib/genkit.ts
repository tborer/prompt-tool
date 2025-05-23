console.log('Genkit initialization starting...');
import { createRegistry, definePrompt } from '@genkit-ai/ai';
import { genkit } from 'genkit';
import * as z from 'zod';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY! })],
  model: 'googleai/gemini-2.0-flash',
});

const registry = createRegistry('default');

export const llmOutputPrompt = definePrompt(registry, {
  input: { schema: z.object({ finalPrompt: z.string() }) },
  output: { schema: z.object({ output: z.string() }) }, // match GenerateLlmOutputOutputSchema
  config: { type: 'chat' },
});