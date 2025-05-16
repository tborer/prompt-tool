"use client";

import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { promptWeaverFormSchema, type PromptWeaverFormValues } from '@/lib/schema';
import { generateLlmOutput, type GenerateLlmOutputInput } from '@/ai/flows/llm-output-generation';

import InputsTab from '@/components/prompt-weaver/inputs-tab';
import PromptSetupTab from '@/components/prompt-weaver/prompt-setup-tab';
import { ListChecks, Settings2, VenetianMask } from 'lucide-react'; // VenetianMask as app icon

const HomePage: FC = () => {
  const [llmOutput, setLlmOutput] = useState<string>('');
  const [isSubmittingLlm, setIsSubmittingLlm] = useState<boolean>(false);
  const [llmError, setLlmError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PromptWeaverFormValues>({
    resolver: zodResolver(promptWeaverFormSchema),
    defaultValues: {
      promptType: 'Prompt 1',
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      field6: '',
      prompt1Setup: `Using the client information of:
{field1}
{field2}
{field3}

Writing as an attorney with experience in immigration and asylum cases, write a 3 paragraph brief that explains why the client has experienced hardship and is eligible for asylum. `,
      prompt2Setup: '',
    },
    mode: "onBlur" // Validate on blur
  });

  const onSubmit = async (data: PromptWeaverFormValues) => {
    setLlmOutput('');
    setLlmError(null);
    setIsSubmittingLlm(true);
    
    const aiInput: GenerateLlmOutputInput = {
      promptType: data.promptType,
      field1: data.field1,
      field2: data.field2,
      field3: data.field3,
      field4: data.field4,
      field5: data.field5,
      field6: data.field6,
      ...(data.promptType === 'Prompt 1' ? { prompt1Setup: data.prompt1Setup } : { prompt2Setup: data.prompt2Setup }),
      prompt2Setup: data.prompt2Setup, // Added prompt2Setup here
      llmApiKey: data.llmApiKey,
    };

    try {
      const result = await generateLlmOutput(aiInput);
      if (result.output) {
        setLlmOutput(result.output);
        toast({
          title: "Success!",
          description: "LLM output generated successfully.",
          variant: "default",
        });
      } else {
        throw new Error("Received empty output from LLM.");
      }
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred.';
      setLlmError(errorMessage);
      toast({
        title: "Error Generating Output",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingLlm(false);
    }
  };

  const handleFormError = (errors: any) => {
    // This function is called by react-hook-form if validation fails
    // Errors are displayed by FormMessage components, but we can add a general toast
    toast({
      title: "Validation Error",
      description: "Please check the form for errors and fill all required fields.",
      variant: "destructive",
    });
  };
  

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <VenetianMask className="h-12 w-12 text-primary" />
          <h1 className="ml-3 text-4xl font-bold text-primary tracking-tight">
            Prompt Weaver
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Craft and test your LLM prompts with dynamic inputs.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, handleFormError)} className="space-y-8">
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted shadow-inner">
              <TabsTrigger value="inputs" className="py-3 text-base data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">
                <ListChecks className="mr-2 h-5 w-5" /> Inputs & Output
              </TabsTrigger>
              <TabsTrigger value="setup" className="py-3 text-base data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md">
                <Settings2 className="mr-2 h-5 w-5" /> Prompt Setup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="inputs" className="mt-6 rounded-lg border border-border bg-card p-6 shadow-sm">
              <InputsTab
                form={form}
                llmOutput={llmOutput}
                isLoading={form.formState.isSubmitting}
                isSubmittingLlm={isSubmittingLlm}
                llmError={llmError}
              />
            </TabsContent>
            <TabsContent value="setup" className="mt-6 rounded-lg border border-border bg-card p-6 shadow-sm">
              <PromptSetupTab form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default HomePage;
