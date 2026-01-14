import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { platforms, strategyTiers } from "@/lib/platformData";
import { Target, Award, Rocket, Star, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";

const tierIcons = {
  1: Award,
  2: Target,
  3: Rocket,
};

const tierColors = {
  1: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    badge: "bg-primary text-primary-foreground",
    icon: "text-primary",
  },
  2: {
    bg: "bg-chart-2/10",
    border: "border-chart-2/30",
    badge: "bg-chart-2 text-white",
    icon: "text-chart-2",
  },
  3: {
    bg: "bg-chart-3/10",
    border: "border-chart-3/30",
    badge: "bg-chart-3 text-white",
    icon: "text-chart-3",
  },
};

function TierCard({ tier }: { tier: typeof strategyTiers[0] }) {
  const colors = tierColors[tier.tier as 1 | 2 | 3];
  const Icon = tierIcons[tier.tier as 1 | 2 | 3];
  const tierPlatforms = tier.platforms
    .map((id) => platforms.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <Card className={`${colors.bg} border-2 ${colors.border}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-background/80`}>
              <Icon className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Tier {tier.tier}: {tier.name}
              </CardTitle>
              <CardDescription className="mt-1">{tier.description}</CardDescription>
            </div>
          </div>
          <Badge className={colors.badge}>
            {tierPlatforms.length} platforms
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tierPlatforms.map((platform) => (
            platform && (
              <div 
                key={platform.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border/50"
                data-testid={`card-strategy-platform-${platform.id}`}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: platform.logoColor }}
                >
                  {platform.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{platform.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{platform.pricing}</p>
                </div>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {platform.category}
                </Badge>
              </div>
            )
          ))}
        </div>

        <div className="pt-3 border-t border-border/50">
          <div className="flex items-start gap-2">
            <CheckCircle2 className={`w-4 h-4 mt-0.5 ${colors.icon}`} />
            <p className="text-sm text-muted-foreground">{tier.rationale}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StrategyTab() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="w-5 h-5" />
            Strategic Recommendations
          </h2>
          <p className="text-sm text-muted-foreground">
            Tiered platform adoption strategy based on INT Inc. consulting methodology
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          3-Phase Methodology
        </Badge>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 via-chart-2/5 to-chart-3/5">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-center md:text-left">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-sm">Tier 1: Foundation</p>
                <p className="text-xs text-muted-foreground">Start here</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
            <div className="flex items-center gap-2 text-center md:text-left">
              <Target className="w-5 h-5 text-chart-2" />
              <div>
                <p className="font-semibold text-sm">Tier 2: Specialization</p>
                <p className="text-xs text-muted-foreground">Expand use cases</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
            <div className="flex items-center gap-2 text-center md:text-left">
              <Rocket className="w-5 h-5 text-chart-3" />
              <div>
                <p className="font-semibold text-sm">Tier 3: Advanced</p>
                <p className="text-xs text-muted-foreground">Innovation & scale</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {strategyTiers.map((tier) => (
          <TierCard key={tier.tier} tier={tier} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Implementation Guidance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</span>
                Discovery (2-4 weeks)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1.5 pl-8">
                <li>Stakeholder interviews</li>
                <li>Current state assessment</li>
                <li>Use case prioritization</li>
                <li>Security requirements mapping</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-chart-2/20 text-chart-2 flex items-center justify-center text-xs font-bold">2</span>
                Strategy (2-3 weeks)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1.5 pl-8">
                <li>ROI modeling scenarios</li>
                <li>Tiered roadmap creation</li>
                <li>Risk assessment</li>
                <li>Change management planning</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-chart-3/20 text-chart-3 flex items-center justify-center text-xs font-bold">3</span>
                Implementation (8-16 weeks)
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1.5 pl-8">
                <li>Pilot program (1-2 teams)</li>
                <li>Iterative rollout</li>
                <li>Training delivery</li>
                <li>Continuous improvement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium">Methodology Sources:</span>
            <Badge variant="outline">Christian & Timbers (2024)</Badge>
            <Badge variant="outline">Larridin (2025)</Badge>
            <Badge variant="outline">LSE/Protiviti (2024)</Badge>
            <Badge variant="outline">McKinsey (2023)</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
