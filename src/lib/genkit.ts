console.log('Genkit initialization starting...');
import { definePrompt } from '@genkit-ai/ai';
import { initGenkit } from '@genkit-ai/core';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = initGenkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY! })],
  defaultModel: 'googleai/gemini-2.0-flash',
});

// Define a prompt that takes the finalPrompt string and structures it as a message for the LLM.
export const llmOutputPrompt = definePrompt(ai, {
  name: 'llmOutputPrompt',
  input: {schema: z.object({ finalPrompt: z.string() })},
  output: {schema: z.string()}, // Assuming the output is just the generated text
  config: { type: 'chat' }, // Indicate that this is a chat-based prompt
});