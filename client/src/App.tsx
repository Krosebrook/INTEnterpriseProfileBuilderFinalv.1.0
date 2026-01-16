import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExplorerTab } from "@/components/ExplorerTab";
import { ComparisonTab } from "@/components/ComparisonTab";
import { MatrixTab } from "@/components/MatrixTab";
import { ROICalculator } from "@/components/ROICalculator";
import { StrategyTab } from "@/components/StrategyTab";
import { AssessmentTab } from "@/components/AssessmentTab";
import { ProfileBuilderTab } from "@/components/ProfileBuilderTab";
import { PRDGeneratorTab } from "@/components/PRDGeneratorTab";
import { ErrorBoundary, TabErrorBoundary } from "@/components/ErrorBoundary";
import { SkipLink } from "@/components/SkipLink";
import { useAuth } from "@/hooks/use-auth";
import { Compass, GitCompare, Grid3X3, Calculator, Star, Sparkles, ClipboardCheck, BookOpen, LogIn, LogOut, User, FileText } from "lucide-react";
import sunsetBackground from "@assets/generated_images/sunset_landscape_with_orange_sun.png";

function PlatformExplorer() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("explorer");
  const { user, isLoading, isAuthenticated } = useAuth();

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
    <div className="min-h-screen relative">
      <SkipLink />
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${sunsetBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,14,28,0.75)] via-[rgba(20,28,50,0.70)] to-[rgba(54,32,8,0.65)]" />
      </div>
      
      {/* Scrollable Foreground Content */}
      <div className="relative z-10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
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
            
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || 'User'} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <a href="/api/logout" data-testid="button-logout">
                  <Button variant="ghost" size="icon" className="text-[#000000]">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            ) : (
              <a href="/api/login" data-testid="button-login">
                <Button variant="outline" size="sm" className="text-[#fac78e]">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-16 z-40 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
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
              <TabsTrigger 
                value="assessment" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-assessment"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Assess</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-profile"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger 
                value="prd" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-2"
                data-testid="tab-prd"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">PRD</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <main id="main-content" className="max-w-7xl mx-auto px-6 py-8" tabIndex={-1}>
          <TabsContent value="explorer" className="mt-0">
            <TabErrorBoundary>
              <ExplorerTab 
                selectedPlatforms={selectedPlatforms}
                onToggleSelect={togglePlatformSelection}
              />
            </TabErrorBoundary>
          </TabsContent>
          <TabsContent value="comparison" className="mt-0">
            <TabErrorBoundary>
              <ComparisonTab 
                selectedPlatforms={selectedPlatforms}
                onBack={goToExplorer}
              />
            </TabErrorBoundary>
          </TabsContent>
          <TabsContent value="matrix" className="mt-0">
            <TabErrorBoundary>
              <MatrixTab />
            </TabErrorBoundary>
          </TabsContent>
          <TabsContent value="roi" className="mt-0">
            <TabErrorBoundary>
              <ROICalculator />
            </TabErrorBoundary>
          </TabsContent>
          <TabsContent value="strategy" className="mt-0">
            <TabErrorBoundary>
              <StrategyTab />
            </TabErrorBoundary>
          </TabsContent>
          <TabsContent value="assessment" className="mt-0">
            <TabErrorBoundary>
              <AssessmentTab />
            </TabErrorBoundary>
          </TabsContent>
          <TabsContent value="profile" className="mt-0">
            <TabErrorBoundary>
              <ProfileBuilderTab />
            </TabErrorBoundary>
          </TabsContent>
          <TabsContent value="prd" className="mt-0">
            <TabErrorBoundary>
              <PRDGeneratorTab />
            </TabErrorBoundary>
          </TabsContent>
        </main>
      </Tabs>

      <footer className="border-t bg-background/85 backdrop-blur-md">
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
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PlatformExplorer />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
