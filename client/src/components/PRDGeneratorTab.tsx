import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Loader2, Sparkles } from "lucide-react";
import type { PRDDocument } from "@shared/schema";

export function PRDGeneratorTab() {
  const [featureIdea, setFeatureIdea] = useState("");
  const [prdDocument, setPrdDocument] = useState<PRDDocument | null>(null);
  const { toast } = useToast();

  const generatePRD = useMutation({
    mutationFn: async (input: { featureIdea: string }) => {
      const response = await fetch("/api/prd/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate PRD");
      }

      return response.json() as Promise<PRDDocument>;
    },
    onSuccess: (data) => {
      setPrdDocument(data);
      toast({
        title: "PRD Generated Successfully",
        description: "Your Product Requirements Document is ready to review.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (featureIdea.trim().length < 10) {
      toast({
        title: "Invalid Input",
        description: "Please provide a feature idea with at least 10 characters.",
        variant: "destructive",
      });
      return;
    }

    generatePRD.mutate({ featureIdea: featureIdea.trim() });
  };

  const handleDownload = () => {
    if (!prdDocument) return;

    const content = generateMarkdownContent(prdDocument);
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const sanitizedTitle = prdDocument.featureIdea.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
    a.download = `PRD_${sanitizedTitle}_${timestamp}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your PRD has been downloaded as a Markdown file.",
    });
  };

  const generateMarkdownContent = (prd: PRDDocument): string => {
    let content = `# ${prd.title}\n\n`;
    content += `**Generated:** ${new Date(prd.generatedAt).toLocaleString()}\n\n`;
    content += `**Feature Idea:** ${prd.featureIdea}\n\n`;
    content += `---\n\n`;

    prd.sections.forEach((section) => {
      content += `# ${section.title}\n\n`;
      content += `${section.content}\n\n`;
      content += `---\n\n`;
    });

    return content;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>PRD Generator</CardTitle>
              <CardDescription>
                Generate comprehensive Product Requirements Documents from feature ideas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertDescription>
              Provide a detailed description of your feature or product idea, and we'll generate a complete,
              spec-driven PRD following industry best practices.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <label htmlFor="feature-idea" className="text-sm font-medium">
              Feature Idea
            </label>
            <Textarea
              id="feature-idea"
              placeholder="Example: A real-time collaboration feature that allows multiple users to edit documents simultaneously with conflict resolution, presence indicators, and comment threads..."
              value={featureIdea}
              onChange={(e) => setFeatureIdea(e.target.value)}
              rows={6}
              className="resize-none"
              disabled={generatePRD.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Minimum 10 characters. Be as detailed as possible for better results.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={generatePRD.isPending || featureIdea.trim().length < 10}
              className="flex-1"
            >
              {generatePRD.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating PRD...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate PRD
                </>
              )}
            </Button>

            {prdDocument && (
              <Button onClick={handleDownload} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {prdDocument && (
        <Card>
          <CardHeader>
            <CardTitle>{prdDocument.title}</CardTitle>
            <CardDescription>
              Generated on {new Date(prdDocument.generatedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Feature Idea:</p>
              <p className="text-sm text-muted-foreground">{prdDocument.featureIdea}</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {prdDocument.sections.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">{section.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                      {section.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
