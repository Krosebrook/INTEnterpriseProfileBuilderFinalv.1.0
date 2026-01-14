// Re-export auth models (users and sessions tables for Replit Auth)
export * from "./models/auth";

export interface PlatformCapabilities {
  codeGeneration: number;
  reasoning: number;
  languageUnderstanding: number;
  multimodal: number;
  toolUse: number;
  speed: number;
  costEfficiency: number;
  enterpriseFeatures: number;
  developerExperience: number;
  documentation: number;
}

export interface Platform {
  id: string;
  name: string;
  category: "Foundation" | "Specialized" | "Enterprise" | "Developer" | "Productivity";
  priority: "Tier 1" | "Tier 2" | "Tier 3";
  verdict: string;
  marketShare: string;
  pricing: string;
  contextWindow: string;
  compliance: string[];
  targetUsers: string;
  capabilities: PlatformCapabilities;
  logoColor: string;
}

export interface ROIInputs {
  employees: number;
  averageSalary: number;
  adoptionPercentage: number;
  weeklyProductivityGain: number;
  annualPlatformCost: number;
  trainingCost: number;
}

export interface ROIResults {
  annualProductivityValue: number;
  annualTotalCost: number;
  netBenefit: number;
  roiPercentage: number;
  paybackPeriodMonths: number;
}

export interface StrategyTier {
  tier: number;
  name: string;
  description: string;
  platforms: string[];
  rationale: string;
}
