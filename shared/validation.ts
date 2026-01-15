import { z } from "zod";

export const roiInputsSchema = z.object({
  employees: z.number()
    .int("Employee count must be a whole number")
    .min(1, "At least 1 employee required")
    .max(1000000, "Employee count exceeds maximum"),
  averageSalary: z.number()
    .min(1000, "Average salary must be at least $1,000")
    .max(10000000, "Average salary exceeds maximum"),
  adoptionPercentage: z.number()
    .min(1, "Adoption percentage must be at least 1%")
    .max(100, "Adoption percentage cannot exceed 100%"),
  weeklyProductivityGain: z.number()
    .min(0.1, "Weekly productivity gain must be at least 0.1 hours")
    .max(40, "Weekly productivity gain cannot exceed 40 hours"),
  annualPlatformCost: z.number()
    .min(0, "Platform cost cannot be negative")
    .max(100000000, "Platform cost exceeds maximum"),
  trainingCost: z.number()
    .min(0, "Training cost cannot be negative")
    .max(100000000, "Training cost exceeds maximum"),
});

export const platformCompareSchema = z.object({
  ids: z.array(z.string().min(1, "Platform ID cannot be empty"))
    .min(1, "At least 1 platform ID required")
    .max(4, "Maximum 4 platforms for comparison"),
});

export type ValidatedROIInputs = z.infer<typeof roiInputsSchema>;
export type ValidatedPlatformCompare = z.infer<typeof platformCompareSchema>;
