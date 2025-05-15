import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

interface LlmOutputDisplayProps {
  output: string;
  isLoading: boolean;
  error: string | null;
}

const LlmOutputDisplay: FC<LlmOutputDisplayProps> = ({ output, isLoading, error }) => {
  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">LLM Output</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center p-10 text-muted-foreground">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-accent" />
            <span className="text-lg">Generating output...</span>
          </div>
        )}
        {error && !isLoading && (
          <Alert variant="destructive" className="bg-destructive/10">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!isLoading && !error && output && (
          <Textarea
            value={output}
            readOnly
            className="min-h-[200px] w-full rounded-md border bg-secondary/30 p-3 text-sm text-foreground focus-visible:ring-accent"
            aria-label="LLM Output"
          />
        )}
        {!isLoading && !error && !output && (
          <div className="p-10 text-center text-muted-foreground">
            <p className="text-lg">Output will appear here once generated.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LlmOutputDisplay;
