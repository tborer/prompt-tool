import { z } from "zod";

export const promptWeaverFormSchema = z.object({
  promptType: z.enum(['Prompt 1', 'Prompt 2'], {
    required_error: "You need to select a prompt type.",
  }),
  field1: z.string().optional(),
  field2: z.string().optional(),
  field3: z.string().optional(),
  field4: z.string().optional(),
  field5: z.string().optional(),
  field6: z.string().optional(),
  prompt2Setup: z.string(),
}).superRefine((data, ctx) => {
  if (data.promptType === 'Prompt 1') {
    if (!data.field1?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Field 1 is required for Prompt 1.",
        path: ["field1"],
      });
    }
    if (!data.field2?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Field 2 is required for Prompt 1.",
        path: ["field2"],
      });
    }
    if (!data.field3?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Field 3 is required for Prompt 1.",
        path: ["field3"],
      });
    }
    if (!data.prompt1Setup.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Prompt 1 Setup cannot be empty when Prompt 1 is selected.",
        path: ["prompt1Setup"],
      });
    }
  } else if (data.promptType === 'Prompt 2') {
    if (!data.field4?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Field 4 is required for Prompt 2.",
        path: ["field4"],
      });
    }
    if (!data.field5?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Field 5 is required for Prompt 2.",
        path: ["field5"],
      });
    }
    if (!data.field6?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Field 6 is required for Prompt 2.",
        path: ["field6"],
      });
    }
    if (!data.prompt2Setup.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Prompt 2 Setup cannot be empty when Prompt 2 is selected.",
        path: ["prompt2Setup"],
      });
    }
  }
});

export type PromptWeaverFormValues = z.infer<typeof promptWeaverFormSchema>;
