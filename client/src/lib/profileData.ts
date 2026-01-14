export type Role = 'All' | 'Finance' | 'Sales' | 'Engineering' | 'Marketing' | 'Operations' | 'HR';

export const ROLES: { id: Role; label: string; description: string }[] = [
  { id: 'All', label: 'All Roles', description: 'View content for all departments' },
  { id: 'Finance', label: 'Finance', description: 'Budget analysis, forecasting, financial reporting' },
  { id: 'Sales', label: 'Sales', description: 'Deal analysis, proposals, competitive research' },
  { id: 'Engineering', label: 'Engineering', description: 'Code review, architecture, security' },
  { id: 'Marketing', label: 'Marketing', description: 'Content creation, campaigns, analytics' },
  { id: 'Operations', label: 'Operations', description: 'Process optimization, workflow automation' },
  { id: 'HR', label: 'Human Resources', description: 'Talent management, policies, training' }
];

export const SECURITY_FEATURES = [
  'Zero Data Retention (ZDR) enabled',
  'Role-based access controls (RBAC)',
  'Comprehensive audit logging',
  'Prompt injection defense',
  'SOC 2 Type II compliant',
  'GDPR/HIPAA-ready'
];

export const KEY_CAPABILITIES = [
  'Real-time web search with citations',
  'Role-isolated memory (30-day expiry)',
  'Code execution sandbox',
  'Artifacts for documents & code',
  'File upload and analysis',
  'MCP server integrations'
];

export interface RoleProfile {
  role: Role;
  icon: string;
  color: string;
  responsibilities: string;
  capabilities: string[];
  features: {
    enabled: string[];
    disabled: string[];
  };
  tools: string[];
  escalationRules: string[];
  commonRequests: {
    request: string;
    process: string[];
  }[];
}

export const ROLE_PROFILES: RoleProfile[] = [
  {
    role: 'Finance',
    icon: 'DollarSign',
    color: 'green',
    responsibilities: 'Budget analysis, forecasting, financial reporting, cost optimization',
    capabilities: [
      'Budget variance analysis (Actual vs Budget vs Forecast)',
      'Cash flow projections',
      'Cost-benefit analysis for new initiatives',
      'Financial trend analysis',
      'Report automation (P&L, balance sheet summaries)'
    ],
    features: {
      enabled: ['Web search', 'Memory', 'Artifacts', 'Code execution', 'Files'],
      disabled: ['Code execution on customer data (compliance restriction)']
    },
    tools: ['Stripe (revenue verification)', 'Notion (finance policies)', 'Excel/CSV'],
    escalationRules: [
      'Any budget change >$50K → CFO approval required',
      'Any forecast assumption change → Document in artifact',
      'Any data discrepancy → Flag immediately, don\'t guess'
    ],
    commonRequests: [
      {
        request: 'Analyze our Q4 spending vs budget',
        process: ['Ask for Q4 P&L and budget file', 'Calculate variances', 'Create artifact with variance analysis']
      }
    ]
  },
  {
    role: 'Sales',
    icon: 'TrendingUp',
    color: 'blue',
    responsibilities: 'Deal analysis, proposal generation, competitive research, pipeline management',
    capabilities: [
      'RFP analysis and response generation',
      'Proposal templates and customization',
      'Competitive intelligence (battle cards)',
      'Deal stage prediction and risk assessment',
      'Sales playbook documentation'
    ],
    features: {
      enabled: ['Web search', 'Memory', 'Artifacts', 'Files'],
      disabled: ['Code execution (not needed for sales)']
    },
    tools: ['Stripe (customer subscription, MRR)', 'HubSpot (deal pipeline)', 'Notion (playbooks)'],
    escalationRules: [
      'No customer pricing in prompts',
      'Contracts need legal review before sending',
      'Competitive analysis is for internal strategy only'
    ],
    commonRequests: [
      {
        request: 'Generate a proposal for customer X',
        process: ['Ask for scope and pain points', 'Generate proposal artifact', 'Require legal sign-off']
      }
    ]
  },
  {
    role: 'Engineering',
    icon: 'Code',
    color: 'purple',
    responsibilities: 'Architecture design, code review, security analysis, documentation, deployment',
    capabilities: [
      'Code generation (Python, JavaScript, TypeScript, SQL, bash)',
      'Architecture design (system design, scaling, security)',
      'Security review (OWASP, injection, auth, encryption)',
      'Performance optimization (profiling, caching, database)',
      'Test design and coverage analysis'
    ],
    features: {
      enabled: ['Web search', 'Memory', 'Artifacts', 'Code execution', 'Files'],
      disabled: []
    },
    tools: ['GitHub (PRs, code review)', 'Vercel (deployment)', 'Linear (issues)', 'Slack (incidents)'],
    escalationRules: [
      'Security findings >medium severity → CSO review required',
      'Deployments >prod env → CTO approval required',
      'Architecture decisions → Document in design doc'
    ],
    commonRequests: [
      {
        request: 'Review this code for security issues',
        process: ['Check OWASP Top 10', 'Report severity-tagged findings', 'Suggest minimal fixes']
      }
    ]
  },
  {
    role: 'Marketing',
    icon: 'Megaphone',
    color: 'orange',
    responsibilities: 'Content creation, campaign strategy, competitive analysis, reporting',
    capabilities: [
      'Content generation (blog posts, case studies, whitepapers, email)',
      'Campaign planning (strategy, messaging, targeting)',
      'Competitive analysis (market positioning, messaging gaps)',
      'Analytics interpretation (traffic, engagement, conversion)',
      'Design brief creation'
    ],
    features: {
      enabled: ['Web search', 'Memory', 'Artifacts', 'Files'],
      disabled: ['Code execution (not needed)']
    },
    tools: ['Figma (design files)', 'Notion (brand guidelines)', 'Cloudinary (images)'],
    escalationRules: [
      'No customer names in marketing analysis (anonymize)',
      'Competitive content is for internal strategy only',
      'Brand claims need substantiation (cite sources)'
    ],
    commonRequests: [
      {
        request: 'Create an email campaign for product launch',
        process: ['Ask for product features and target audience', 'Create email copy variants', 'Include subject lines and CTAs']
      }
    ]
  },
  {
    role: 'Operations',
    icon: 'Settings',
    color: 'gray',
    responsibilities: 'Process optimization, workflow automation, resource allocation',
    capabilities: [
      'Process documentation and workflow mapping',
      'Resource allocation optimization',
      'Vendor evaluation and comparison',
      'SLA monitoring and reporting',
      'Automation opportunity identification'
    ],
    features: {
      enabled: ['Web search', 'Memory', 'Artifacts', 'Code execution', 'Files'],
      disabled: []
    },
    tools: ['Notion (SOPs)', 'Slack (notifications)', 'Google Sheets'],
    escalationRules: [
      'Process changes affecting >5 people → Manager approval',
      'Vendor changes → Procurement review',
      'Budget impact → Finance review'
    ],
    commonRequests: [
      {
        request: 'Map our current onboarding workflow',
        process: ['Interview stakeholders', 'Document current state', 'Identify bottlenecks and improvements']
      }
    ]
  },
  {
    role: 'HR',
    icon: 'Users',
    color: 'pink',
    responsibilities: 'Talent management, policies, training, employee experience',
    capabilities: [
      'Job description generation',
      'Policy documentation',
      'Training content creation',
      'Performance review templates',
      'Employee survey analysis'
    ],
    features: {
      enabled: ['Web search', 'Memory', 'Artifacts', 'Files'],
      disabled: ['Code execution (not needed for HR)']
    },
    tools: ['BambooHR', 'Notion (policies)', 'Google Forms'],
    escalationRules: [
      'Compensation decisions → VP HR approval',
      'Policy changes → Legal review',
      'Employee PII → Never include in prompts'
    ],
    commonRequests: [
      {
        request: 'Create a job description for Senior Engineer',
        process: ['Ask for role requirements', 'Generate JD with responsibilities', 'Include qualifications and benefits']
      }
    ]
  }
];

export const DEPLOYMENT_PHASES = [
  {
    phase: 1,
    title: 'Foundation Setup',
    items: [
      'Configure SSO integration',
      'Set up role-based access controls',
      'Enable audit logging',
      'Configure data retention policies'
    ]
  },
  {
    phase: 2,
    title: 'Pilot Program',
    items: [
      'Select pilot departments (recommend 2-3)',
      'Train pilot users on baseline prompt',
      'Establish feedback channels',
      'Monitor usage patterns'
    ]
  },
  {
    phase: 3,
    title: 'Full Deployment',
    items: [
      'Roll out to remaining departments',
      'Deploy role-specific configurations',
      'Enable MCP integrations',
      'Establish support procedures'
    ]
  },
  {
    phase: 4,
    title: 'Optimization',
    items: [
      'Analyze usage metrics',
      'Refine prompts based on feedback',
      'Expand use cases',
      'Document best practices'
    ]
  }
];
