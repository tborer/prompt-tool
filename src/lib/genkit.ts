console.log('Genkit initialization starting...');

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY! })],
  model: 'googleai/gemini-2.0-flash',
});

// Define a prompt that takes the finalPrompt string and structures it as a message for the LLM.
export const llmOutputPrompt = ai.definePrompt({
  name: 'llmOutputPrompt',
  input: { schema: z.object({ finalPrompt: z.string() }) },
  output: { schema: z.string() }, // Assuming the output is just the generated text
});