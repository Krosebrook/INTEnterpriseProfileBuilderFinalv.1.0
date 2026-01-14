import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { platforms, capabilityLabels } from "@/lib/platformData";
import type { Platform, PlatformCapabilities } from "@shared/schema";
import { ArrowLeft, Trophy, TrendingUp, Users, DollarSign, Shield, Info } from "lucide-react";

interface ComparisonTabProps {
  selectedPlatforms: string[];
  onBack: () => void;
}

function ScoreBar({ score, label }: { score: number; label: string }) {
  const getScoreColor = (s: number) => {
    if (s >= 8) return "bg-emerald-500";
    if (s >= 5) return "bg-amber-500";
    return "bg-red-500";
  };

  const getScoreTextColor = (s: number) => {
    if (s >= 8) return "text-emerald-600 dark:text-emerald-400";
    if (s >= 5) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-mono font-semibold ${getScoreTextColor(score)}`}>{score}/10</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getScoreColor(score)}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

function PlatformColumn({ platform, isHighest }: { platform: Platform; isHighest: Record<string, boolean> }) {
  const avgScore = Math.round(
    Object.values(platform.capabilities).reduce((a, b) => a + b, 0) / 
    Object.values(platform.capabilities).length
  );

  return (
    <div className="space-y-6">
      <Card className={isHighest.avgScore ? "ring-2 ring-primary" : ""}>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: platform.logoColor }}
            >
              {platform.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate" data-testid={`text-comparison-name-${platform.id}`}>
                {platform.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-mono">{platform.pricing}</p>
            </div>
            {isHighest.avgScore && (
              <Tooltip>
                <TooltipTrigger>
                  <Trophy className="w-5 h-5 text-primary" />
                </TooltipTrigger>
                <TooltipContent>Highest average score</TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted/50">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold font-mono">{avgScore}</span>
            <span className="text-sm text-muted-foreground">avg score</span>
          </div>
          
          <p className="text-sm text-muted-foreground">{platform.verdict}</p>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline">{platform.category}</Badge>
            <Badge variant="secondary">{platform.priority}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Info className="w-4 h-4" />
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" /> Target Users
            </span>
            <span className="font-medium text-right max-w-[160px] truncate">{platform.targetUsers}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Market Share
            </span>
            <span className="font-mono font-medium">{platform.marketShare}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Context Window</span>
            <span className="font-mono font-medium">{platform.contextWindow}</span>
          </div>
          <div className="pt-2 border-t">
            <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
              <Shield className="w-3 h-3" /> Compliance
            </span>
            <div className="flex flex-wrap gap-1">
              {platform.compliance.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(Object.keys(platform.capabilities) as Array<keyof PlatformCapabilities>).map((key) => (
            <ScoreBar 
              key={key} 
              score={platform.capabilities[key]} 
              label={capabilityLabels[key]}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function ComparisonTab({ selectedPlatforms, onBack }: ComparisonTabProps) {
  const selectedData = selectedPlatforms
    .map((id) => platforms.find((p) => p.id === id))
    .filter(Boolean) as Platform[];

  if (selectedData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <TrendingUp className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No platforms selected</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Add platforms from the Explorer tab to compare them side-by-side.
        </p>
        <Button onClick={onBack} data-testid="button-go-to-explorer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go to Explorer
        </Button>
      </div>
    );
  }

  const avgScores = selectedData.map((p) => ({
    id: p.id,
    score: Math.round(
      Object.values(p.capabilities).reduce((a, b) => a + b, 0) / 
      Object.values(p.capabilities).length
    ),
  }));
  const maxAvgScore = Math.max(...avgScores.map((s) => s.score));

  const getHighlights = (platform: Platform) => ({
    avgScore: avgScores.find((s) => s.id === platform.id)?.score === maxAvgScore,
  });

  const gridCols = selectedData.length === 2 
    ? "md:grid-cols-2" 
    : selectedData.length === 3 
      ? "md:grid-cols-3" 
      : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Side-by-Side Comparison</h2>
          <p className="text-sm text-muted-foreground">
            Comparing {selectedData.length} platform{selectedData.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline" onClick={onBack} data-testid="button-back-to-explorer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explorer
        </Button>
      </div>

      <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
        {selectedData.map((platform) => (
          <PlatformColumn 
            key={platform.id} 
            platform={platform} 
            isHighest={getHighlights(platform)}
          />
        ))}
      </div>
    </div>
  );
}
