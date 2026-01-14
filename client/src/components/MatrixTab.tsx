import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { platforms, capabilityLabels, matrixFeatures } from "@/lib/platformData";
import type { PlatformCapabilities } from "@shared/schema";
import { Grid3X3, Info } from "lucide-react";

const categories = ["All", "Core Capabilities", "Enterprise & Cost"];

function ScoreCell({ score }: { score: number }) {
  const getScoreStyle = (s: number): string => {
    if (s >= 9) return "bg-emerald-500 text-white";
    if (s >= 7) return "bg-emerald-400/80 text-white";
    if (s >= 5) return "bg-amber-400 text-amber-950";
    if (s >= 3) return "bg-orange-400 text-orange-950";
    return "bg-red-400 text-white";
  };

  return (
    <div 
      className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${getScoreStyle(score)}`}
    >
      {score}
    </div>
  );
}

export function MatrixTab() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleFeatures = activeCategory === "All"
    ? matrixFeatures.flatMap((group) => group.features)
    : matrixFeatures.find((g) => g.category === activeCategory)?.features || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Grid3X3 className="w-5 h-5" />
            Capability Matrix
          </h2>
          <p className="text-sm text-muted-foreground">
            Compare all {platforms.length} platforms across {Object.keys(capabilityLabels).length} dimensions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <div className="flex gap-1.5">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`cursor-pointer hover-elevate ${activeCategory !== category ? "text-[#edbd11]" : ""}`}
                onClick={() => setActiveCategory(category)}
                data-testid={`filter-matrix-${category.toLowerCase().replace(/ /g, "-")}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Scores range from 1-10. Higher is better. Scroll horizontally to see all platforms.
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full">
            <div className="min-w-max">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="sticky left-0 z-20 bg-card p-4 text-left text-sm font-semibold min-w-[200px]">
                      Platform
                    </th>
                    {visibleFeatures.map((feature) => (
                      <th 
                        key={feature} 
                        className="p-3 text-center text-xs font-medium text-muted-foreground min-w-[80px]"
                      >
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">
                            <span className="line-clamp-2">
                              {capabilityLabels[feature as keyof PlatformCapabilities]}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {capabilityLabels[feature as keyof PlatformCapabilities]}
                          </TooltipContent>
                        </Tooltip>
                      </th>
                    ))}
                    <th className="p-3 text-center text-xs font-semibold text-primary min-w-[80px]">
                      Average
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((platform, idx) => {
                    const avg = Math.round(
                      visibleFeatures.reduce(
                        (sum, f) => sum + platform.capabilities[f as keyof PlatformCapabilities],
                        0
                      ) / visibleFeatures.length
                    );

                    return (
                      <tr 
                        key={platform.id}
                        className={`border-b transition-colors hover:bg-muted/30 ${
                          idx % 2 === 0 ? "" : "bg-muted/10"
                        }`}
                        data-testid={`row-matrix-${platform.id}`}
                      >
                        <td className="sticky left-0 z-10 bg-card p-3">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                              style={{ backgroundColor: platform.logoColor }}
                            >
                              {platform.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">{platform.name}</p>
                              <p className="text-xs text-muted-foreground">{platform.category}</p>
                            </div>
                          </div>
                        </td>
                        {visibleFeatures.map((feature) => (
                          <td key={feature} className="p-2 text-center">
                            <div className="flex justify-center">
                              <ScoreCell score={platform.capabilities[feature as keyof PlatformCapabilities]} />
                            </div>
                          </td>
                        ))}
                        <td className="p-2 text-center">
                          <div className="flex justify-center">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary font-mono font-bold text-sm border-2 border-primary/30">
                              {avg}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Score Legend:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-emerald-500" />
              <span className="text-xs">9-10 Excellent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-emerald-400/80" />
              <span className="text-xs">7-8 Strong</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-amber-400" />
              <span className="text-xs">5-6 Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-orange-400" />
              <span className="text-xs">3-4 Weak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-red-400" />
              <span className="text-xs">1-2 Limited</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
