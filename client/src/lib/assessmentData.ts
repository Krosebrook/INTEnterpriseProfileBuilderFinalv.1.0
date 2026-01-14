export const DEPARTMENTS = [
  'Sales',
  'Marketing',
  'Finance',
  'HR',
  'Customer Service',
  'Legal',
  'IT',
  'Operations',
  'Product',
  'Engineering'
];

export const COMPLIANCE_STANDARDS = [
  'SOC 2',
  'ISO 27001',
  'HIPAA',
  'GDPR',
  'FedRAMP',
  'PCI DSS',
  'CCPA',
  'NIST',
  'HITRUST'
];

export const INTEGRATION_CATEGORIES: Record<string, string[]> = {
  'CRM': ['Salesforce', 'HubSpot', 'Dynamics 365', 'Zoho'],
  'ERP': ['SAP', 'Oracle', 'NetSuite', 'Workday'],
  'HRIS': ['Workday', 'BambooHR', 'ADP', 'UKG'],
  'Productivity': ['Microsoft 365', 'Google Workspace', 'Slack', 'Zoom'],
  'Development': ['GitHub', 'GitLab', 'Jira', 'Azure DevOps'],
  'Analytics': ['Tableau', 'Power BI', 'Looker', 'Qlik']
};

export const PAIN_POINTS = [
  'Manual data entry and processing',
  'Long proposal and document creation cycles',
  'Multilingual communication barriers',
  'Inefficient customer support workflows',
  'Complex contract review processes',
  'Time-consuming research and analysis',
  'Repetitive email and communication tasks',
  'Data synthesis from multiple sources',
  'Content creation bottlenecks',
  'Meeting transcription and summarization'
];

export const ROI_BENCHMARKS: Record<string, Record<string, number>> = {
  'Sales': { 'google_gemini': 4.2, 'microsoft_copilot': 5.1, 'anthropic_claude': 3.8, 'openai_chatgpt': 4.5 },
  'Marketing': { 'google_gemini': 5.5, 'microsoft_copilot': 4.8, 'anthropic_claude': 5.2, 'openai_chatgpt': 6.1 },
  'Finance': { 'google_gemini': 3.9, 'microsoft_copilot': 5.8, 'anthropic_claude': 4.2, 'openai_chatgpt': 3.7 },
  'HR': { 'google_gemini': 4.1, 'microsoft_copilot': 5.3, 'anthropic_claude': 4.6, 'openai_chatgpt': 4.0 },
  'Customer Service': { 'google_gemini': 6.2, 'microsoft_copilot': 5.5, 'anthropic_claude': 5.9, 'openai_chatgpt': 6.5 },
  'Legal': { 'google_gemini': 5.0, 'microsoft_copilot': 4.5, 'anthropic_claude': 6.8, 'openai_chatgpt': 5.2 },
  'IT': { 'google_gemini': 4.8, 'microsoft_copilot': 6.5, 'anthropic_claude': 4.1, 'openai_chatgpt': 5.5 },
  'Operations': { 'google_gemini': 4.3, 'microsoft_copilot': 5.0, 'anthropic_claude': 4.7, 'openai_chatgpt': 4.2 },
  'Product': { 'google_gemini': 5.1, 'microsoft_copilot': 4.6, 'anthropic_claude': 5.4, 'openai_chatgpt': 5.8 },
  'Engineering': { 'google_gemini': 5.5, 'microsoft_copilot': 5.2, 'anthropic_claude': 4.9, 'openai_chatgpt': 6.2 }
};

export const PLATFORM_PRICING: Record<string, number> = {
  'google_gemini': 20,
  'microsoft_copilot': 30,
  'anthropic_claude': 25,
  'openai_chatgpt': 20
};

export const AI_PLATFORMS = [
  { id: 'google_gemini', name: 'Google Gemini', color: '#4285F4' },
  { id: 'microsoft_copilot', name: 'Microsoft Copilot', color: '#00A4EF' },
  { id: 'anthropic_claude', name: 'Anthropic Claude', color: '#D97757' },
  { id: 'openai_chatgpt', name: 'OpenAI ChatGPT', color: '#10A37F' }
];

export interface Department {
  name: string;
  user_count: number;
  annual_spend: number;
  hourly_rate: number;
}

export interface AssessmentFormData {
  organization_name: string;
  assessment_date: string;
  departments: Department[];
  compliance_requirements: string[];
  desired_integrations: string[];
  pain_points: string[];
}

export interface PlatformROI {
  platform: string;
  platformName: string;
  total_annual_savings: number;
  total_cost: number;
  net_annual_savings: number;
  one_year_roi: number;
  three_year_roi: number;
}

export function calculatePlatformROI(departments: Department[], platformId: string): PlatformROI {
  let totalAnnualSavings = 0;
  let totalCost = 0;

  const platformInfo = AI_PLATFORMS.find(p => p.id === platformId);

  departments.forEach(dept => {
    const hoursPerWeek = ROI_BENCHMARKS[dept.name]?.[platformId] || 0;
    const weeksPerYear = 50;
    const annualHoursSaved = hoursPerWeek * weeksPerYear * dept.user_count;
    const annualSavings = annualHoursSaved * dept.hourly_rate;
    const platformCost = (PLATFORM_PRICING[platformId] || 20) * 12 * dept.user_count;
    
    totalCost += platformCost;
    totalAnnualSavings += annualSavings;
  });

  const netAnnualSavings = totalAnnualSavings - totalCost;
  const oneYearROI = totalCost > 0 ? ((netAnnualSavings / totalCost) * 100) : 0;
  const threeYearROI = totalCost > 0 ? (((netAnnualSavings * 3) / totalCost) * 100) : 0;

  return {
    platform: platformId,
    platformName: platformInfo?.name || platformId,
    total_annual_savings: totalAnnualSavings,
    total_cost: totalCost,
    net_annual_savings: netAnnualSavings,
    one_year_roi: oneYearROI,
    three_year_roi: threeYearROI
  };
}

export function calculateAllPlatformROI(departments: Department[]): PlatformROI[] {
  return AI_PLATFORMS.map(platform => calculatePlatformROI(departments, platform.id));
}
