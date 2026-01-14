import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ExplorerTab } from "@/components/ExplorerTab";
import { ComparisonTab } from "@/components/ComparisonTab";
import { MatrixTab } from "@/components/MatrixTab";
import { ROICalculator } from "@/components/ROICalculator";
import { StrategyTab } from "@/components/StrategyTab";
import { Compass, GitCompare, Grid3X3, Calculator, Star, Sparkles } from "lucide-react";

function PlatformExplorer() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("explorer");

  const togglePlatformSelection = (id: string) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const goToExplorer = () => setActiveTab("explorer");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight" data-testid="text-app-title">
                INT Platform Explorer
              </h1>
              <p className="text-xs text-muted-foreground font-mono">v4.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedPlatforms.length > 0 && (
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full font-mono">
                {selectedPlatforms.length}/4 comparing
              </span>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-6">
            <TabsList className="w-full h-12 bg-transparent p-0 gap-0">
              <TabsTrigger 
                value="explorer" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-explorer"
              >
                <Compass className="w-4 h-4" />
                <span className="hidden sm:inline">Explorer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="comparison" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-comparison"
              >
                <GitCompare className="w-4 h-4" />
                <span className="hidden sm:inline">Comparison</span>
                {selectedPlatforms.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-mono">
                    {selectedPlatforms.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="matrix" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-matrix"
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">Matrix</span>
              </TabsTrigger>
              <TabsTrigger 
                value="roi" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-roi"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">ROI</span>
              </TabsTrigger>
              <TabsTrigger 
                value="strategy" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-strategy"
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Strategy</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <TabsContent value="explorer" className="mt-0">
            <ExplorerTab 
              selectedPlatforms={selectedPlatforms}
              onToggleSelect={togglePlatformSelection}
            />
          </TabsContent>
          <TabsContent value="comparison" className="mt-0">
            <ComparisonTab 
              selectedPlatforms={selectedPlatforms}
              onBack={goToExplorer}
            />
          </TabsContent>
          <TabsContent value="matrix" className="mt-0">
            <MatrixTab />
          </TabsContent>
          <TabsContent value="roi" className="mt-0">
            <ROICalculator />
          </TabsContent>
          <TabsContent value="strategy" className="mt-0">
            <StrategyTab />
          </TabsContent>
        </main>
      </Tabs>

      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">INT Platform Explorer</p>
                <p className="text-xs text-muted-foreground">Powered by INT Inc.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>16 Platforms</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>25 Capability Dimensions</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>Research-Backed ROI</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} INT Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PlatformExplorer />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
