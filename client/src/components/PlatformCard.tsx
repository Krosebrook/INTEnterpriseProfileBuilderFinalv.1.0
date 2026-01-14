import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Platform } from "@shared/schema";
import { Plus, Check, TrendingUp } from "lucide-react";

interface PlatformCardProps {
  platform: Platform;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  maxSelectionsReached: boolean;
}

export function PlatformCard({ platform, isSelected, onToggleSelect, maxSelectionsReached }: PlatformCardProps) {
  const avgScore = Math.round(
    Object.values(platform.capabilities).reduce((a, b) => a + b, 0) / 
    Object.values(platform.capabilities).length
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Foundation": return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "Enterprise": return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "Specialized": return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "Developer": return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      case "Productivity": return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Tier 1": return "bg-primary/10 text-primary border-primary/20";
      case "Tier 2": return "bg-secondary text-secondary-foreground";
      case "Tier 3": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getComplianceBadgeColor = (cert: string) => {
    switch (cert) {
      case "SOC2": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      case "HIPAA": return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "FedRAMP": return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "GDPR": return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card 
      className={`h-full flex flex-col transition-all duration-200 hover-elevate ${
        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      }`}
      data-testid={`card-platform-${platform.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
              style={{ backgroundColor: platform.logoColor }}
            >
              {platform.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-base leading-tight truncate" data-testid={`text-platform-name-${platform.id}`}>
                {platform.name}
              </h3>
              <p className="text-sm text-muted-foreground font-mono" data-testid={`text-platform-pricing-${platform.id}`}>
                {platform.pricing}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary font-mono text-sm font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {avgScore}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average capability score</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-platform-verdict-${platform.id}`}>
          {platform.verdict}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge variant="outline" className={`text-xs ${getCategoryColor(platform.category)}`}>
            {platform.category}
          </Badge>
          <Badge variant="outline" className={`text-xs ${getTierColor(platform.priority)}`}>
            {platform.priority}
          </Badge>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Market Share</span>
            <span className="font-mono font-medium">{platform.marketShare}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Context</span>
            <span className="font-mono font-medium">{platform.contextWindow}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Target Users</span>
            <span className="font-medium text-right truncate max-w-[140px]">{platform.targetUsers}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 flex flex-col gap-3 border-t border-border">
        <div className="flex flex-wrap gap-1 w-full">
          {platform.compliance.map((cert) => (
            <Badge 
              key={cert} 
              variant="secondary" 
              className={`text-xs px-1.5 py-0 h-5 ${getComplianceBadgeColor(cert)}`}
            >
              {cert}
            </Badge>
          ))}
        </div>
        
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="w-full"
          onClick={() => onToggleSelect(platform.id)}
          disabled={!isSelected && maxSelectionsReached}
          data-testid={`button-compare-${platform.id}`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              Added to Compare
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-1.5" />
              Add to Compare
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
