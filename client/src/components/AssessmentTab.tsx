import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, Calendar, Users, Plus, Trash2, ArrowLeft, ArrowRight, 
  CheckCircle, Shield, Puzzle, AlertTriangle, TrendingUp, Trophy
} from "lucide-react";
import { 
  DEPARTMENTS, COMPLIANCE_STANDARDS, INTEGRATION_CATEGORIES, PAIN_POINTS,
  AI_PLATFORMS, calculateAllPlatformROI,
  type AssessmentFormData, type Department, type PlatformROI
} from "@/lib/assessmentData";

function Step1({ formData, setFormData }: { formData: AssessmentFormData; setFormData: (data: AssessmentFormData) => void }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Organization Details</CardTitle>
        <p className="text-sm text-muted-foreground">Let's start with some basic information about your organization</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="org_name">Organization Name *</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="org_name"
              value={formData.organization_name}
              onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
              placeholder="Enter your organization name"
              className="pl-10"
              data-testid="input-org-name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assessment_date">Assessment Date *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="assessment_date"
              type="date"
              value={formData.assessment_date}
              onChange={(e) => setFormData({ ...formData, assessment_date: e.target.value })}
              className="pl-10"
              data-testid="input-assessment-date"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium mb-2">What's Next?</h4>
          <p className="text-sm text-muted-foreground">
            After providing your organization details, you'll select departments to evaluate, 
            specify compliance requirements, choose desired integrations, and identify key pain points.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Step2({ formData, setFormData }: { formData: AssessmentFormData; setFormData: (data: AssessmentFormData) => void }) {
  const [newDept, setNewDept] = useState({ name: '', user_count: '', hourly_rate: '' });

  const addDepartment = () => {
    if (newDept.name && newDept.user_count && newDept.hourly_rate) {
      setFormData({
        ...formData,
        departments: [...formData.departments, {
          name: newDept.name,
          user_count: parseInt(newDept.user_count),
          annual_spend: 0,
          hourly_rate: parseFloat(newDept.hourly_rate)
        }]
      });
      setNewDept({ name: '', user_count: '', hourly_rate: '' });
    }
  };

  const removeDepartment = (index: number) => {
    setFormData({
      ...formData,
      departments: formData.departments.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Department Configuration</CardTitle>
        <p className="text-sm text-muted-foreground">Add the departments that will use AI platforms</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="space-y-2">
            <Label className="text-xs">Department</Label>
            <Select value={newDept.name} onValueChange={(value) => setNewDept({ ...newDept, name: value })}>
              <SelectTrigger data-testid="select-department">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Number of Users</Label>
            <Input
              type="number"
              min="1"
              value={newDept.user_count}
              onChange={(e) => setNewDept({ ...newDept, user_count: e.target.value })}
              placeholder="50"
              data-testid="input-user-count"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Avg. Hourly Rate ($)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={newDept.hourly_rate}
              onChange={(e) => setNewDept({ ...newDept, hourly_rate: e.target.value })}
              placeholder="65"
              data-testid="input-hourly-rate"
            />
          </div>

          <div className="flex items-end">
            <Button onClick={addDepartment} className="w-full" data-testid="button-add-department">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        {formData.departments.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Added Departments ({formData.departments.length})
            </h4>
            <div className="space-y-2" data-testid="list-departments">
              {formData.departments.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card border rounded-lg" data-testid={`row-dept-${index}`}>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <span className="font-medium" data-testid={`text-dept-name-${index}`}>{dept.name}</span>
                    <span className="text-muted-foreground" data-testid={`text-dept-users-${index}`}>{dept.user_count} users</span>
                    <span className="text-muted-foreground" data-testid={`text-dept-rate-${index}`}>${dept.hourly_rate}/hr</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDepartment(index)}
                    className="text-destructive hover:text-destructive"
                    data-testid={`button-remove-dept-${index}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.departments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground" data-testid="status-no-departments">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No departments added yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Step3({ formData, setFormData }: { formData: AssessmentFormData; setFormData: (data: AssessmentFormData) => void }) {
  const toggleCompliance = (standard: string) => {
    const current = formData.compliance_requirements;
    if (current.includes(standard)) {
      setFormData({ ...formData, compliance_requirements: current.filter(s => s !== standard) });
    } else {
      setFormData({ ...formData, compliance_requirements: [...current, standard] });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Compliance Requirements
        </CardTitle>
        <p className="text-sm text-muted-foreground">Select the compliance standards your organization must meet</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {COMPLIANCE_STANDARDS.map(standard => (
            <button
              key={standard}
              onClick={() => toggleCompliance(standard)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                formData.compliance_requirements.includes(standard)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card hover:bg-muted'
              }`}
              data-testid={`button-compliance-${standard.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="flex items-center gap-2">
                {formData.compliance_requirements.includes(standard) && (
                  <CheckCircle className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{standard}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Step4({ formData, setFormData }: { formData: AssessmentFormData; setFormData: (data: AssessmentFormData) => void }) {
  const toggleIntegration = (integration: string) => {
    const current = formData.desired_integrations;
    if (current.includes(integration)) {
      setFormData({ ...formData, desired_integrations: current.filter(s => s !== integration) });
    } else {
      setFormData({ ...formData, desired_integrations: [...current, integration] });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Puzzle className="h-5 w-5" />
          Desired Integrations
        </CardTitle>
        <p className="text-sm text-muted-foreground">Select the tools and platforms you need AI to integrate with</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(INTEGRATION_CATEGORIES).map(([category, integrations]) => (
          <div key={category}>
            <h4 className="text-sm font-medium mb-3">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {integrations.map(integration => (
                <Badge
                  key={integration}
                  variant={formData.desired_integrations.includes(integration) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleIntegration(integration)}
                  data-testid={`badge-integration-${integration.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {integration}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Step5({ formData, setFormData }: { formData: AssessmentFormData; setFormData: (data: AssessmentFormData) => void }) {
  const togglePainPoint = (painPoint: string) => {
    const current = formData.pain_points;
    if (current.includes(painPoint)) {
      setFormData({ ...formData, pain_points: current.filter(p => p !== painPoint) });
    } else {
      setFormData({ ...formData, pain_points: [...current, painPoint] });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Pain Points
        </CardTitle>
        <p className="text-sm text-muted-foreground">Identify the challenges AI can help solve</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {PAIN_POINTS.map(painPoint => (
            <button
              key={painPoint}
              onClick={() => togglePainPoint(painPoint)}
              className={`w-full p-3 rounded-lg border text-left transition-colors ${
                formData.pain_points.includes(painPoint)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card hover:bg-muted'
              }`}
              data-testid={`button-pain-${painPoint.slice(0, 20).toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="flex items-center gap-2">
                {formData.pain_points.includes(painPoint) && (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="text-sm">{painPoint}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Results({ formData, results, onReset }: { formData: AssessmentFormData; results: PlatformROI[]; onReset: () => void }) {
  const sortedResults = [...results].sort((a, b) => b.one_year_roi - a.one_year_roi);
  const winner = sortedResults[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Assessment Results for {formData.organization_name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on {formData.departments.length} departments with {formData.departments.reduce((acc, d) => acc + d.user_count, 0)} total users
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedResults.map((result, index) => {
          const platform = AI_PLATFORMS.find(p => p.id === result.platform);
          const isWinner = index === 0;
          
          return (
            <Card key={result.platform} className={isWinner ? 'ring-2 ring-primary' : ''} data-testid={`card-result-${result.platform}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: platform?.color }}
                    >
                      {result.platformName.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-base" data-testid={`text-result-name-${result.platform}`}>{result.platformName}</CardTitle>
                      {isWinner && <Badge data-testid="badge-recommended">Recommended</Badge>}
                    </div>
                  </div>
                  {isWinner && <Trophy className="h-5 w-5 text-primary" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Annual Savings</p>
                    <p className="font-mono font-semibold text-lg text-green-600 dark:text-green-400" data-testid={`text-savings-${result.platform}`}>
                      ${result.total_annual_savings.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Annual Cost</p>
                    <p className="font-mono font-semibold text-lg" data-testid={`text-cost-${result.platform}`}>
                      ${result.total_cost.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Net Benefit</p>
                    <p className={`font-mono font-semibold text-lg ${result.net_annual_savings > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} data-testid={`text-benefit-${result.platform}`}>
                      ${result.net_annual_savings.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">1-Year ROI</p>
                    <p className={`font-mono font-semibold text-lg ${result.one_year_roi > 100 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`} data-testid={`text-roi-${result.platform}`}>
                      {result.one_year_roi.toFixed(0)}%
                    </p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">3-Year ROI</span>
                    <span className="font-mono">{result.three_year_roi.toFixed(0)}%</span>
                  </div>
                  <Progress value={Math.min(result.three_year_roi / 10, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Assessment completed on {formData.assessment_date}</p>
              <p className="text-sm">Compliance: {formData.compliance_requirements.join(', ') || 'None selected'}</p>
            </div>
            <Button onClick={onReset} variant="outline" data-testid="button-new-assessment">
              <ArrowLeft className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AssessmentTab() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<PlatformROI[]>([]);
  const [formData, setFormData] = useState<AssessmentFormData>({
    organization_name: '',
    assessment_date: new Date().toISOString().split('T')[0],
    departments: [],
    compliance_requirements: [],
    desired_integrations: [],
    pain_points: []
  });

  const totalSteps = 5;

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.organization_name.trim() !== '';
      case 2: return formData.departments.length > 0;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const roiResults = calculateAllPlatformROI(formData.departments);
    setResults(roiResults);
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setShowResults(false);
    setResults([]);
    setFormData({
      organization_name: '',
      assessment_date: new Date().toISOString().split('T')[0],
      departments: [],
      compliance_requirements: [],
      desired_integrations: [],
      pain_points: []
    });
  };

  if (showResults) {
    return <Results formData={formData} results={results} onReset={handleReset} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 formData={formData} setFormData={setFormData} />;
      case 2: return <Step2 formData={formData} setFormData={setFormData} />;
      case 3: return <Step3 formData={formData} setFormData={setFormData} />;
      case 4: return <Step4 formData={formData} setFormData={setFormData} />;
      case 5: return <Step5 formData={formData} setFormData={setFormData} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            AI Readiness Assessment
          </h2>
          <p className="text-muted-foreground">Evaluate your organization's AI platform needs</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono">Step {currentStep} of {totalSteps}</p>
          <Progress value={(currentStep / totalSteps) * 100} className="w-32 h-2 mt-1" />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 1}
          data-testid="button-assessment-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {currentStep < totalSteps ? (
          <Button 
            onClick={handleNext} 
            disabled={!canProceed()}
            data-testid="button-assessment-next"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleComplete}
            data-testid="button-assessment-complete"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Assessment
          </Button>
        )}
      </div>
    </div>
  );
}
