import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, Zap, Users, Lock, CheckCircle, AlertTriangle, BookOpen,
  DollarSign, TrendingUp, Code, Megaphone, Settings, Copy, Check
} from "lucide-react";
import { 
  ROLES, SECURITY_FEATURES, KEY_CAPABILITIES, ROLE_PROFILES, DEPLOYMENT_PHASES,
  type Role
} from "@/lib/profileData";

function RoleSelector({ selectedRole, onSelectRole }: { selectedRole: Role; onSelectRole: (role: Role) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ROLES.map(role => (
        <Button
          key={role.id}
          variant={selectedRole === role.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectRole(role.id)}
          data-testid={`button-role-${role.id.toLowerCase()}`}
          className={selectedRole !== role.id ? "text-[#fac78e]" : undefined}
        >
          {role.label}
        </Button>
      ))}
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2">Welcome to INT Inc Claude Enterprise</h3>
          <p className="text-muted-foreground">
            This comprehensive guide provides everything you need to safely and effectively use Claude AI 
            across your role at INT Inc. From baseline security guidelines to advanced workflows, this 
            documentation ensures you maximize productivity while maintaining our SOC 2 Type II compliance standards.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security First
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {SECURITY_FEATURES.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Powerful Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {KEY_CAPABILITIES.slice(0, 4).map((cap, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Role-Specific Profiles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Finance:</strong> Budget analysis, forecasting, cost optimization</p>
            <p><strong>Sales:</strong> RFP analysis, proposals, competitive intelligence</p>
            <p><strong>Engineering:</strong> Code review, architecture, security analysis</p>
            <p><strong>Marketing:</strong> Content creation, campaign strategy, analytics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Critical Guardrails
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <span>Never output customer PII or credentials</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <span>Escalate decisions &gt;$10K to humans</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <span>All code requires peer review</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <span>Flag uncertainty, never hallucinate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {[
              'Identify your role (Finance, Sales, Engineering, Marketing, Ops, HR)',
              'Review the Baseline Prompt to understand core security guidelines',
              'Explore Feature Guides (web search, memory, artifacts, code, files)',
              'Read your Role Profile for specific capabilities and workflows',
              'Start asking questions and apply best practices from this guide'
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full flex-shrink-0 text-xs font-medium">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

function RoleProfilesSection({ selectedRole }: { selectedRole: Role }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign': return DollarSign;
      case 'TrendingUp': return TrendingUp;
      case 'Code': return Code;
      case 'Megaphone': return Megaphone;
      case 'Settings': return Settings;
      case 'Users': return Users;
      default: return Users;
    }
  };

  const filteredProfiles = selectedRole === 'All' 
    ? ROLE_PROFILES 
    : ROLE_PROFILES.filter(p => p.role === selectedRole);

  return (
    <div className="space-y-6">
      {filteredProfiles.map(profile => {
        const Icon = getIcon(profile.icon);
        
        return (
          <Card key={profile.role} data-testid={`card-role-${profile.role.toLowerCase()}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10`}>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span data-testid={`text-role-name-${profile.role.toLowerCase()}`}>{profile.role}</span>
                  <p className="text-sm font-normal text-muted-foreground">{profile.responsibilities}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Capabilities</h4>
                <ul className="space-y-1" data-testid={`list-capabilities-${profile.role.toLowerCase()}`}>
                  {profile.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Enabled Features</h4>
                  <div className="flex flex-wrap gap-1" data-testid={`list-features-${profile.role.toLowerCase()}`}>
                    {profile.features.enabled.map((f, i) => (
                      <Badge key={i} variant="default" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-1" data-testid={`list-tools-${profile.role.toLowerCase()}`}>
                    {profile.tools.map((t, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Escalation Rules
                </h4>
                <ul className="space-y-1">
                  {profile.escalationRules.map((rule, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {rule}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function BaselinePromptSection() {
  const [copied, setCopied] = useState(false);
  
  const baselinePrompt = `You are Claude, an AI assistant deployed for INT Inc (Buffalo Grove, IL).

CORE IDENTITY
- Role: Enterprise AI assistant
- Compliance: SOC 2 Type II, GDPR, HIPAA-ready
- Data Policy: Zero Data Retention (ZDR) enabled

SECURITY GUARDRAILS
- Never output customer PII, passwords, or API keys
- Escalate financial decisions >$10,000 to human review
- All code suggestions require peer review before deployment
- Flag uncertainty explicitly; never fabricate information

RESPONSE GUIDELINES
- Be concise but thorough
- Cite sources for factual claims
- Ask clarifying questions when requirements are ambiguous
- Document assumptions in artifacts for audit trail

ESCALATION PROTOCOL
- Security issues → CSO review required
- Budget changes >$50K → CFO approval
- Production deployments → CTO sign-off
- Legal/compliance → General Counsel review`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(baselinePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Baseline System Prompt
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              data-testid="button-copy-prompt"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Universal system prompt for all INT Inc users. This establishes core security guidelines and behavior.
          </p>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
            {baselinePrompt}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Prompt Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Core Identity</h4>
              <p className="text-sm text-muted-foreground">
                Establishes Claude's role as an enterprise assistant with compliance requirements.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Security Guardrails</h4>
              <p className="text-sm text-muted-foreground">
                Hard boundaries that Claude will never cross, regardless of instruction.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Response Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                Quality standards for all responses including citation and documentation requirements.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Escalation Protocol</h4>
              <p className="text-sm text-muted-foreground">
                Clear rules for when human review is required before taking action.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DeploymentSection() {
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    if (completedItems.includes(item)) {
      setCompletedItems(completedItems.filter(i => i !== item));
    } else {
      setCompletedItems([...completedItems, item]);
    }
  };

  const totalItems = DEPLOYMENT_PHASES.reduce((acc, phase) => acc + phase.items.length, 0);
  const progress = (completedItems.length / totalItems) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Deployment Progress</CardTitle>
            <span className="text-sm font-mono" data-testid="text-deploy-progress">{completedItems.length}/{totalItems} complete</span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-deploy" />
        </CardHeader>
      </Card>

      {DEPLOYMENT_PHASES.map(phase => (
        <Card key={phase.phase}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                {phase.phase}
              </span>
              {phase.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {phase.items.map((item, i) => {
                const itemKey = `${phase.phase}-${i}`;
                const isCompleted = completedItems.includes(itemKey);
                
                return (
                  <button
                    key={i}
                    onClick={() => toggleItem(itemKey)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                      isCompleted 
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                        : 'hover:bg-muted'
                    }`}
                    data-testid={`checkbox-deploy-${phase.phase}-${i}`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : 'border-muted-foreground'
                    }`}>
                      {isCompleted && <Check className="w-3 h-3" />}
                    </div>
                    <span className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProfileBuilderTab() {
  const [selectedRole, setSelectedRole] = useState<Role>('All');
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Enterprise Profile Builder
          </h2>
          <p className="text-muted-foreground">Claude configuration guide for INT Inc</p>
        </div>
        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="overview" data-testid="tab-profile-overview">Overview</TabsTrigger>
          <TabsTrigger value="roles" data-testid="tab-profile-roles">Roles</TabsTrigger>
          <TabsTrigger value="baseline" data-testid="tab-profile-baseline">Baseline</TabsTrigger>
          <TabsTrigger value="deploy" data-testid="tab-profile-deploy">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewSection />
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <RoleProfilesSection selectedRole={selectedRole} />
        </TabsContent>

        <TabsContent value="baseline" className="mt-6">
          <BaselinePromptSection />
        </TabsContent>

        <TabsContent value="deploy" className="mt-6">
          <DeploymentSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
