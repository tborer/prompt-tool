console.log('Genkit initialization starting...');

import { defineExecutablePrompt } from '@genkit-ai/ai';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY! })],
  model: 'googleai/gemini-2.0-flash',
});

// Define a prompt that takes the finalPrompt string and structures it as a message for the LLM.
export const llmOutputPrompt = ai.defineExecutablePrompt({
  name: 'llmOutputPrompt',
  input: { schema: z.object({ finalPrompt: z.string() }) },
  output: { schema: z.string() }, // Assuming the output is just the generated text
  config: {
    type: 'chat', // Indicate that this is a chat-based prompt
  },
  generate: async ({ finalPrompt }) => {
    const chat = [
      {
        role: 'user',
        content: finalPrompt
      }
    ];
    console.log("Generated chat message:", chat); // Log the generated chat message
    return chat;
  }
});