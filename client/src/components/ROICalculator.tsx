import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import type { ROIInputs, ROIResults } from "@shared/schema";
import { Calculator, DollarSign, TrendingUp, Clock, Users, Percent, BookOpen, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WEEKS_PER_YEAR = 48;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value / 100);
}

function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = "default" 
}: { 
  title: string; 
  value: string; 
  subtitle?: string; 
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "success" | "primary";
}) {
  const variantStyles = {
    default: "bg-card",
    success: "bg-emerald-500/10 border-emerald-500/20",
    primary: "bg-primary/10 border-primary/20",
  };

  const iconStyles = {
    default: "text-muted-foreground",
    success: "text-emerald-500",
    primary: "text-primary",
  };

  return (
    <Card className={variantStyles[variant]}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold font-mono">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={`p-2 rounded-lg bg-muted/50`}>
            <Icon className={`w-5 h-5 ${iconStyles[variant]}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    employees: 500,
    averageSalary: 75000,
    adoptionPercentage: 60,
    weeklyProductivityGain: 7,
    annualPlatformCost: 12000,
    trainingCost: 5000,
  });

  const results = useMemo<ROIResults>(() => {
    const adoptedEmployees = Math.round(inputs.employees * (inputs.adoptionPercentage / 100));
    const hourlyRate = inputs.averageSalary / (WEEKS_PER_YEAR * 40);
    
    const annualProductivityValue = 
      adoptedEmployees * inputs.weeklyProductivityGain * hourlyRate * WEEKS_PER_YEAR;
    
    const annualTotalCost = inputs.annualPlatformCost + inputs.trainingCost;
    const netBenefit = annualProductivityValue - annualTotalCost;
    const roiPercentage = annualTotalCost > 0 ? (netBenefit / annualTotalCost) * 100 : 0;
    const paybackPeriodMonths = annualProductivityValue > 0 
      ? (annualTotalCost / annualProductivityValue) * 12 
      : 0;

    return {
      annualProductivityValue: Math.round(annualProductivityValue),
      annualTotalCost: Math.round(annualTotalCost),
      netBenefit: Math.round(netBenefit),
      roiPercentage: Math.round(roiPercentage),
      paybackPeriodMonths: Math.round(paybackPeriodMonths * 10) / 10,
    };
  }, [inputs]);

  const updateInput = <K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            ROI Calculator
          </h2>
          <p className="text-sm text-muted-foreground">
            Calculate the business case for AI platform investment
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          Research-backed methodology
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Organization Inputs</CardTitle>
            <CardDescription>Enter your organization's details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="employees" className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  Number of Employees
                </Label>
                <span className="font-mono text-sm">{inputs.employees.toLocaleString()}</span>
              </div>
              <Input
                id="employees"
                type="number"
                min={1}
                value={inputs.employees}
                onChange={(e) => updateInput("employees", parseInt(e.target.value) || 0)}
                data-testid="input-employees"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="salary" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  Average Annual Salary
                </Label>
                <span className="font-mono text-sm">{formatCurrency(inputs.averageSalary)}</span>
              </div>
              <Input
                id="salary"
                type="number"
                min={0}
                step={1000}
                value={inputs.averageSalary}
                onChange={(e) => updateInput("averageSalary", parseInt(e.target.value) || 0)}
                data-testid="input-salary"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-muted-foreground" />
                  Adoption Rate
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Percentage of employees who will actively use the AI platform</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <span className="font-mono text-sm">{inputs.adoptionPercentage}%</span>
              </div>
              <Slider
                value={[inputs.adoptionPercentage]}
                onValueChange={([value]) => updateInput("adoptionPercentage", value)}
                min={10}
                max={100}
                step={5}
                data-testid="slider-adoption"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Weekly Productivity Gain (hours)
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Research shows 5-10 hours/week is typical (Larridin 2025)</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <span className="font-mono text-sm">{inputs.weeklyProductivityGain}h</span>
              </div>
              <Slider
                value={[inputs.weeklyProductivityGain]}
                onValueChange={([value]) => updateInput("weeklyProductivityGain", value)}
                min={1}
                max={15}
                step={0.5}
                data-testid="slider-productivity"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cost Inputs</CardTitle>
            <CardDescription>Enter platform and implementation costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="platformCost" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  Annual Platform Cost
                </Label>
                <span className="font-mono text-sm">{formatCurrency(inputs.annualPlatformCost)}</span>
              </div>
              <Input
                id="platformCost"
                type="number"
                min={0}
                step={1000}
                value={inputs.annualPlatformCost}
                onChange={(e) => updateInput("annualPlatformCost", parseInt(e.target.value) || 0)}
                data-testid="input-platform-cost"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="trainingCost" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  Training & Onboarding Cost
                </Label>
                <span className="font-mono text-sm">{formatCurrency(inputs.trainingCost)}</span>
              </div>
              <Input
                id="trainingCost"
                type="number"
                min={0}
                step={500}
                value={inputs.trainingCost}
                onChange={(e) => updateInput("trainingCost", parseInt(e.target.value) || 0)}
                data-testid="input-training-cost"
              />
            </div>

            <div className="pt-4 border-t space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Assumptions</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                  {WEEKS_PER_YEAR} productive weeks per year
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                  40-hour work week baseline
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                  Conservative productivity estimates
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Annual Productivity Value"
          value={formatCurrency(results.annualProductivityValue)}
          subtitle="Time saved converted to $"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Total Annual Cost"
          value={formatCurrency(results.annualTotalCost)}
          subtitle="Platform + Training"
          icon={DollarSign}
        />
        <MetricCard
          title="Net Benefit"
          value={formatCurrency(results.netBenefit)}
          subtitle="Value minus cost"
          icon={Calculator}
          variant={results.netBenefit > 0 ? "success" : "default"}
        />
        <MetricCard
          title="ROI"
          value={formatPercent(results.roiPercentage)}
          subtitle={`Payback in ${results.paybackPeriodMonths} months`}
          icon={Percent}
          variant="primary"
        />
      </div>

      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium">Research Sources:</span>
            <Badge variant="outline">Larridin (2025)</Badge>
            <Badge variant="outline">LSE/Protiviti (2024)</Badge>
            <Badge variant="outline">McKinsey (2023)</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
