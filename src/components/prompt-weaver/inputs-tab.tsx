"use client";

import type { UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import LlmOutputDisplay from "./llm-output-display";
import type { PromptWeaverFormValues } from '@/lib/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface InputsTabProps {
  form: UseFormReturn<PromptWeaverFormValues>;
  llmOutput: string;
  isLoading: boolean;
  isSubmittingLlm: boolean;
  llmError: string | null;
}

const InputsTab: FC<InputsTabProps> = ({ form, llmOutput, isLoading, isSubmittingLlm, llmError }) => {
  const selectedPromptType = form.watch("promptType");

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">Configure Inputs</CardTitle>
          <CardDescription>Select a prompt type and provide the necessary inputs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="promptType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium text-foreground">Select Prompt Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Prompt 1" id="prompt1" />
                      </FormControl>
                      <FormLabel htmlFor="prompt1" className="font-normal text-foreground">
                        Prompt 1
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Prompt 2" id="prompt2" />
                      </FormControl>
                      <FormLabel htmlFor="prompt2" className="font-normal text-foreground">
                        Prompt 2
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedPromptType === 'Prompt 1' && (
            <div className="space-y-4 p-4 border border-border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium text-primary">Prompt 1 Fields</h3>
              {[1, 2, 3].map((num) => (
                <FormField
                  key={`field${num}`}
                  control={form.control}
                  name={`field${num}` as keyof PromptWeaverFormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Field {num}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter value for Field ${num}`} {...field} className="bg-background focus-visible:ring-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}

          {selectedPromptType === 'Prompt 2' && (
             <div className="space-y-4 p-4 border border-border rounded-md bg-muted/20">
              <h3 className="text-lg font-medium text-primary">Prompt 2 Fields</h3>
              {[4, 5, 6].map((num) => (
                <FormField
                  key={`field${num}`}
                  control={form.control}
                  name={`field${num}` as keyof PromptWeaverFormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Field {num}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter value for Field ${num}`} {...field} className="bg-background focus-visible:ring-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 shadow-md" 
        disabled={isLoading || isSubmittingLlm}
      >
        {isSubmittingLlm ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        Submit to LLM
      </Button>

      <LlmOutputDisplay output={llmOutput} isLoading={isSubmittingLlm} error={llmError} />
    </div>
  );
};

export default InputsTab;
