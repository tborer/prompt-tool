"use client";


import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import type { FC } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { PromptWeaverFormValues } from '@/lib/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PromptSetupTabProps {
  form: UseFormReturn<PromptWeaverFormValues>;
}

const PromptSetupTab: FC<PromptSetupTabProps> = ({ form }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">Configure Prompts & API</CardTitle>
        <CardDescription>Set up your LLM API Key and the base text for your prompts. Use placeholders like {'{field1}'} for dynamic input.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="prompt1Setup"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-foreground">Prompt 1 Setup</FormLabel>
              <FormControl>
                <Textarea                  className="min-h-[150px] bg-background focus-visible:ring-accent"
                  {...field} // Let react-hook-form manage value and onChange
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt2Setup"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-foreground">Prompt 2 Setup</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter setup text for Prompt 2. Example: Translate '{field4}' into {field5}."
                  className="min-h-[150px] bg-background focus-visible:ring-accent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PromptSetupTab;
