# Claude Systems Documentation – Part 2: INT Platform Explorer & Advanced Usage

**Continued from Part 1**

---

## 11. INT Platform Explorer v4.0 (Complete System)

### 11.1 What Is INT Platform Explorer?

**TL;DR:** A production-ready, single-file HTML application for comparing 16 AI platforms with zero dependencies.

**Analogy:** Think of it like Consumer Reports for AI platforms—comprehensive comparisons, research-backed scoring, and ROI calculator all in one tool that fits in your pocket (40KB file).

**Key Stats:**
- **File Size:** 40KB (single HTML file)
- **Platforms:** 16 AI systems fully profiled
- **Capabilities:** 25 dimensions evaluated (1-10 scale)
- **Dependencies:** ZERO (no npm, no build, no external libs)
- **Deploy Time:** 5 minutes (Vercel, Cloudflare, GitHub Pages)
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

### 11.2 Architecture Overview

**Single-File Design Philosophy:**
- HTML + CSS + JavaScript in one file
- Works offline (static data)
- No external dependencies
- No build process
- No npm packages
- No database required
- Copy-paste deployment

**5-Tab Interface:**

#### Tab 1: Explorer
**Purpose:** Browse and filter all 16 platforms

**Features:**
- Search by name or keyword
- Filter by category (Foundation, Specialized, Enterprise)
- Filter by priority (Tier 1, 2, 3)
- Platform cards show:
  - Logo
  - Verdict (1-sentence summary)
  - Market share percentage
  - Pricing (per user/month)
  - Compliance badges (SOC2, HIPAA, FedRAMP, GDPR)
- "Add to Compare" button (up to 4 platforms)

**Use Case:** Discovery and initial research

---

#### Tab 2: Comparison
**Purpose:** Side-by-side analysis of 2-4 platforms

**Features:**
- General attributes table:
  - Category
  - Target users
  - Pricing
  - Context window
  - Compliance
  - Market share
- Capability scores (10 dimensions, color-coded 1-10):
  - Code generation
  - Reasoning
  - Language understanding
  - Multimodal
  - Tool use
  - Speed
  - Cost efficiency
  - Enterprise features
  - Developer experience
  - Documentation quality
- Platform verdicts

**Use Case:** Finalist evaluation, stakeholder presentations

---

#### Tab 3: Matrix
**Purpose:** Comprehensive feature grid

**Features:**
- 16 platforms × 25 features
- Searchable by category filter
- Color-coded scores:
  - Red (1-4): Weak
  - Yellow (5-7): Moderate
  - Green (8-10): Strong
- Sticky headers (scroll without losing context)
- Export to CSV (coming in v4.1)

**Categories:**
1. Core Capabilities (6 features)
2. Technical Features (7 features)
3. Enterprise & Compliance (6 features)
4. Developer Experience (6 features)

**Use Case:** Deep technical evaluation, procurement checklist

---

#### Tab 4: ROI Calculator
**Purpose:** Business case quantification

**Features:**
- Real-time calculation engine
- Research-backed methodology (Larridin 2025, LSE/Protiviti 2024)

**Inputs:**
- Number of employees
- Average salary
- Adoption percentage (%)
- Weekly productivity gain (hours)
- Annual platform cost
- Training/onboarding cost

**Outputs:**
- Annual productivity value ($)
- Annual total cost ($)
- Net benefit ($)
- ROI percentage (%)
- Payback period (months)

**Assumptions:**
- 48 productive weeks/year
- Conservative 5-10 hrs/week gains
- Includes hidden costs (training, support)

**Use Case:** CFO presentations, budget justification

---

#### Tab 5: Strategy
**Purpose:** INT Inc. tiered recommendations

**Features:**
- **Tier 1 (Foundation):** 2-4 platforms for broad adoption
  - Example: Claude, ChatGPT Enterprise, Gemini
- **Tier 2 (Specialization):** Domain-specific tools
  - Example: GitHub Copilot (dev), Jasper (marketing)
- **Tier 3 (Advanced):** Cutting-edge/experimental
  - Example: Custom fine-tuned models, research previews

**Methodology:**
- Aligned with INT Inc. consulting framework
- Based on maturity curve (Crawl → Walk → Run)
- Considers change management, training, support

**Research Sources:**
- Christian & Timbers (2024) market analysis
- Larridin (2025) productivity studies
- LSE/Protiviti (2024) ROI benchmarks
- McKinsey (2023) AI adoption surveys

**Use Case:** Strategic planning, roadmap creation

---

### 11.3 The 16 Platforms (Quick Reference)

| Platform | Category | Best For | Price/User/Month |
|----------|----------|----------|------------------|
| **Claude (Sonnet 4)** | Foundation | Coding, analysis | $20 |
| **ChatGPT Enterprise** | Foundation | Broad use cases | $60 |
| **Gemini Advanced** | Foundation | Google ecosystem | $20 |
| **Microsoft Copilot** | Enterprise | MS365 integration | $30 |
| **GitHub Copilot** | Specialized | Software dev | $10-20 |
| **Perplexity Pro** | Specialized | Research | $20 |
| **Anthropic API** | Developer | Custom integration | Pay-per-token |
| **OpenAI API** | Developer | Custom integration | Pay-per-token |
| **AWS Bedrock** | Enterprise | AWS ecosystem | Variable |
| **Azure OpenAI** | Enterprise | Azure ecosystem | Variable |
| **Cohere** | Developer | NLP tasks | Pay-per-token |
| **Hugging Face** | Developer | Open models | Free-variable |
| **Jasper** | Specialized | Marketing content | $49 |
| **Copy.ai** | Specialized | Sales copy | $49 |
| **Notion AI** | Productivity | Knowledge mgmt | $10 |
| **Slack AI** | Productivity | Team collab | $10 |

---

### 11.4 Deployment Playbooks

#### Option A: Vercel (Recommended)
**Time:** 5 minutes  
**Cost:** Free

**Steps:**
1. Create Vercel account (https://vercel.com)
2. Click "Import Git Repository"
3. Upload `INT_Platform_Explorer_v4_0.html`
4. Click "Deploy"
5. Share URL: `https://your-project.vercel.app`

**Pros:**
- Global CDN (fast)
- HTTPS automatic
- Free tier generous
- Zero config

**Cons:**
- Requires Vercel account
- Rate limits on free tier

---

#### Option B: Cloudflare Pages
**Time:** 5 minutes  
**Cost:** Free

**Steps:**
1. Create Cloudflare account
2. Go to Pages → Create Project
3. Upload HTML file
4. Click "Deploy"
5. Share URL: `https://your-project.pages.dev`

**Pros:**
- Edge network (fastest)
- DDoS protection
- Free tier unlimited

**Cons:**
- Cloudflare account required
- Steeper learning curve

---

#### Option C: GitHub Pages
**Time:** 10 minutes  
**Cost:** Free

**Steps:**
1. Create GitHub repo
2. Upload file (rename to `index.html`)
3. Settings → Pages → Deploy from branch
4. Share URL: `https://yourorg.github.io/int-platform-explorer`

**Pros:**
- Free forever
- Version control built-in
- No vendor lock-in

**Cons:**
- Slower than CDNs
- Requires Git knowledge

---

#### Option D: Self-Host (On-Premise)
**Time:** 15 minutes  
**Cost:** Variable

**Steps:**
1. Place file on web server
2. Configure HTTPS (Let's Encrypt)
3. Set up firewall rules
4. Share internal URL

**Pros:**
- Full control
- No external dependencies
- Compliance-friendly

**Cons:**
- Maintenance overhead
- Security responsibility

---

### 11.5 Customization Guide

#### Branding
**Location:** Lines 50-100 in HTML file

```html
<!-- Change logo -->
<div class="logo">
  <img src="your-logo.png" alt="Your Company">
</div>

<!-- Change colors -->
<style>
  :root {
    --primary: #2563eb;      /* Your brand blue */
    --secondary: #10b981;    /* Your brand green */
    --background: #ffffff;
    --text: #1f2937;
  }
</style>
```

#### Platform Data
**Location:** Lines 200-1000 (JavaScript PLATFORMS array)

**Add New Platform:**
```javascript
{
  id: "new-platform",
  name: "New Platform Name",
  category: "Foundation",
  priority: "Tier 1",
  verdict: "One-sentence summary",
  marketShare: "5%",
  pricing: "$30/user/month",
  contextWindow: "100K tokens",
  compliance: ["SOC2", "GDPR"],
  capabilities: {
    codeGeneration: 8,
    reasoning: 9,
    languageUnderstanding: 9,
    multimodal: 7,
    toolUse: 8,
    speed: 7,
    costEfficiency: 8,
    enterpriseFeatures: 9,
    developerExperience: 8,
    documentation: 8
  }
}
```

#### ROI Calculator Defaults
**Location:** Lines 1500-1600

```javascript
// Modify default assumptions
const DEFAULT_SALARY = 75000;
const DEFAULT_ADOPTION = 50;
const DEFAULT_PRODUCTIVITY_GAIN = 5;
const WEEKS_PER_YEAR = 48;
```

---

### 11.6 INT Inc. Consulting Framework Integration

**3-Phase Methodology:**

#### Phase 1: Discovery (2-4 weeks)
**Tools:** Platform Explorer tabs 1-3 (Explorer, Comparison, Matrix)

**Activities:**
- Stakeholder interviews (IT, security, compliance, end users)
- Current state assessment (tools inventory, spend analysis)
- Use case prioritization (high-impact, low-effort first)
- Security requirements mapping (SOC2, HIPAA, FedRAMP)

**Deliverables:**
- Readiness scorecard
- Use case heatmap
- Platform shortlist (3-5 finalists)

---

#### Phase 2: Strategy (2-3 weeks)
**Tools:** Platform Explorer tabs 4-5 (ROI, Strategy)

**Activities:**
- ROI modeling (conservative, moderate, aggressive scenarios)
- Tiered roadmap creation (Tier 1 → 2 → 3)
- Risk assessment (vendor lock-in, data privacy, cost overruns)
- Change management planning (training, comms, support)

**Deliverables:**
- Business case deck (CFO-ready)
- 12-month implementation roadmap
- Success metrics dashboard

---

#### Phase 3: Implementation (8-16 weeks)
**Tools:** Platform-specific guides + INT Inc. playbooks

**Activities:**
- Pilot program (1-2 teams, 30-60 days)
- Iterative rollout (department by department)
- Training delivery (role-based tracks)
- Support infrastructure (Slack channel, office hours, FAQ)

**Deliverables:**
- Adoption metrics (weekly active users)
- Impact reports (productivity gains, cost savings)
- Lessons learned document
- Continuous improvement plan

---

### 11.7 Security & Compliance Checklist

**Before Deploying Platform Explorer:**

- [ ] **Data Privacy:** No personal data collected (static tool)
- [ ] **HTTPS:** Always deploy with SSL/TLS
- [ ] **Access Control:** Consider password protection (if internal)
- [ ] **Audit Logging:** Track who views (if using analytics in v4.1+)
- [ ] **Vendor Due Diligence:** Verify platform compliance claims
- [ ] **Terms of Service:** Review each platform's TOS
- [ ] **Data Residency:** Confirm data storage locations (EU, US, etc.)
- [ ] **Incident Response:** Have rollback plan if platform has outage

**For Enterprise Deployments:**

- [ ] **SOC2 Type II:** Verify annual audits
- [ ] **HIPAA BAA:** Get signed agreement if handling PHI
- [ ] **FedRAMP:** Confirm authorization level (Moderate, High)
- [ ] **GDPR:** Review data processing agreements
- [ ] **ISO 27001:** Check certifications
- [ ] **Penetration Testing:** Request latest reports
- [ ] **SLA Guarantees:** 99.9% uptime minimum
- [ ] **Data Breach Notification:** <72 hours required

---

### 11.8 Production Roadmap (v4.1 → v5.0)

#### v4.1: Enhanced Analytics (2-3 weeks)
**Features:**
- PostHog integration (privacy-first)
- Track which platforms users view most
- Track comparison combinations
- Track ROI calculations run
- Export usage reports

**Value:** Understand decision patterns, improve tool

---

#### v4.2: PDF Export (1-2 weeks)
**Features:**
- Export comparison tables to PDF
- Include charts, graphs, verdicts
- Add custom branding (logo, colors)
- Generate executive summaries

**Value:** Stakeholder presentations, board decks

---

#### v4.3: URL Sharing (1 week)
**Features:**
- Share specific comparisons via URL
- Example: `?platforms=claude,chatgpt,gemini`
- Deep linking to specific tabs
- Bookmark favorite configurations

**Value:** Team collaboration, repeatability

---

#### v4.4: Assessment Quiz (2-3 weeks)
**Features:**
- 10-question organizational readiness quiz
- Input: team size, use cases, budget, maturity
- Output: personalized platform recommendations
- Export report with justification

**Value:** Self-service for smaller organizations

---

#### v4.5: White-Label & Multi-Tenant (10-12 weeks)
**Features:**
- Configurable branding (logo, colors, fonts)
- Multi-org support (different platforms per client)
- User authentication & permissions
- Admin dashboard (manage platforms, data)
- API for integration (embed in client portals)

**Value:** INT Inc. can productize for resale

---

### 11.9 Known Limitations & Blindspots

**What We Don't Have:**
- Real-time pricing updates (update quarterly)
- User behavior analytics (no tracking by default)
- Mobile app (responsive web only)
- Dark mode (light theme only)
- Offline service worker

**What We Don't Know:**
- Real adoption patterns (batch vs incremental?)
- Seasonal trends (Q4 rush?)
- Regional variations (US vs EU pricing)
- Success rates (Tier 1 → Tier 2 transition %)

**What May Be Stale:**
- Pricing (Q1 2025 snapshot, verify with vendors)
- Market share (Christian & Timbers 2024, check Gartner)
- Compliance certs (quarterly expiration risk)
- Feature scores (directional, not benchmarks)

**Recommended Validation:**
1. Call vendor sales for current pricing (1 hr/vendor)
2. Pull latest Gartner Magic Quadrant (2 hrs)
3. Internal survey: Which platforms do we recommend most?
4. Set up alerts: IFTTT/Zapier for pricing changes

---

## 12. Prompting Frameworks (Max Depth)

### 12.1 Chain-of-Thought (CoT)

**What:** Break complex reasoning into explicit steps

**When:** Multi-step problems, math, logic puzzles, debugging

**Structure:**
```
Let's think step-by-step:
1. [First consideration]
2. [Second consideration]
3. [Third consideration]
4. [Conclusion]
```

**Example:**
```
Calculate ROI for Claude deployment:

Let's think step-by-step:
1. Productivity gain: 500 employees × 7 hrs/week × 48 weeks = 168K hours/year
2. Value: 168K hours × $50/hr (avg salary) = $8.4M
3. Cost: 500 users × $20/month × 12 months = $120K + $50K training = $170K
4. ROI: ($8.4M - $170K) / $170K = 4,741% (47x return)
```

**Claude Compatibility:** ✅ Excellent (native strength)

---

### 12.2 Tree of Thought (ToT)

**What:** Explore multiple reasoning paths, prune bad ones

**When:** Open-ended problems, creative tasks, strategic planning

**Structure:**
```
Generate 3 approaches to [problem]:

Approach 1: [description]
→ Evaluate: [pros/cons]
→ Verdict: [keep/discard]

Approach 2: [description]
→ Evaluate: [pros/cons]
→ Verdict: [keep/discard]

Approach 3: [description]
→ Evaluate: [pros/cons]
→ Verdict: [keep/discard]

Expand best approach(es)...
```

**Example:**
```
How should INT Inc. price Platform Explorer v4.5 (white-label)?

Approach 1: One-time license fee ($50K)
→ Pros: Predictable revenue, easy to explain
→ Cons: No recurring revenue, hard to scale
→ Verdict: Discard

Approach 2: Annual subscription ($10K/year)
→ Pros: Recurring revenue, aligns with SaaS model
→ Cons: Harder initial sale, churn risk
→ Verdict: Keep

Approach 3: Usage-based ($ per comparison run)
→ Pros: Scales with value, low entry barrier
→ Cons: Unpredictable revenue, complex tracking
→ Verdict: Explore as hybrid (base + usage)

Expand Approach 2 with hybrid model...
```

**Claude Compatibility:** ✅ Excellent (supports multi-step exploration)

---

### 12.3 ReAct (Reasoning + Acting)

**What:** Interleave reasoning and tool use

**When:** Tasks requiring external data, APIs, multi-tool workflows

**Structure:**
```
Thought: [reasoning]
Action: [tool call]
Observation: [tool result]
Thought: [next reasoning]
Action: [next tool call]
...
Final Answer: [conclusion]
```

**Example:**
```
Task: Find latest Claude pricing and compare to ChatGPT Enterprise.

Thought: I need current pricing data (post-Jan 2025).
Action: web_search("Claude Pro pricing 2025")
Observation: Claude Pro is $20/user/month, Team is $30/user/month.

Thought: Now need ChatGPT Enterprise pricing.
Action: web_search("ChatGPT Enterprise pricing 2025")
Observation: ChatGPT Enterprise is $60/user/month.

Thought: Have both prices, can now compare.
Final Answer: 
- Claude Pro: $20/user/month
- ChatGPT Enterprise: $60/user/month
- Difference: ChatGPT is 3x more expensive
- Use case matters: ChatGPT Enterprise includes dedicated support, SLAs
```

**Claude Compatibility:** ✅ Native (built-in tool use)

---

### 12.4 Few-Shot Prompting

**What:** Provide examples to establish pattern

**When:** Specific output format, style matching, classification

**Structure:**
```
Example 1: Input → Output
Example 2: Input → Output
Example 3: Input → Output

Now you try:
Input: [your input]
Output: [Claude generates]
```

**Example:**
```
Convert platform descriptions to verdicts (1 sentence):

Example 1:
Input: "Claude is a powerful AI assistant with strong reasoning capabilities, excellent code generation, and a focus on safety."
Output: "Best for coding and analysis with safety guardrails."

Example 2:
Input: "ChatGPT Enterprise offers broad capabilities with custom GPTs, DALL-E integration, and Microsoft 365 integration."
Output: "Best for general-purpose use with enterprise features."

Now you try:
Input: "GitHub Copilot provides AI-powered code completion, inline suggestions, and chat-based assistance for developers."
Output: "Best for software development with IDE integration."
```

**Claude Compatibility:** ✅ Excellent (learns from examples quickly)

---

### 12.5 Zero-Shot Prompting

**What:** Single instruction, no examples

**When:** Simple tasks, Claude already knows the pattern

**Structure:**
```
[Instruction]
```

**Example:**
```
Summarize INT Platform Explorer v4.0 in 3 bullet points.
```

**Claude Compatibility:** ✅ Excellent (default mode)

---

### 12.6 Self-Consistency

**What:** Generate multiple outputs, pick most common

**When:** Ambiguous problems, need higher confidence

**Structure:**
```
Generate 5 solutions to [problem].
Then pick the most common/best approach.
```

**Example:**
```
What's 37 × 48? (Generate 5 attempts)

Attempt 1: 1,776
Attempt 2: 1,776
Attempt 3: 1,776
Attempt 4: 1,786 (error)
Attempt 5: 1,776

Most common: 1,776 (appears 4/5 times) ✅
```

**Claude Compatibility:** ⚠️ Moderate (manual, no native aggregation)

---

### 12.7 Prompt Chaining

**What:** Break task into subtasks, chain outputs

**When:** Complex workflows, multi-step generation

**Structure:**
```
Step 1: [Subtask 1] → Output A
Step 2: [Use Output A in Subtask 2] → Output B
Step 3: [Use Output B in Subtask 3] → Final Output
```

**Example:**
```
Step 1: Research top 5 AI platforms → List of platforms
Step 2: For each platform, extract pricing → Pricing table
Step 3: Calculate average pricing → $35/user/month average
Step 4: Generate recommendation → "Budget $40/user/month for enterprise"
```

**Claude Compatibility:** ✅ Native (use follow-up prompts)

---

### 12.8 Frameworks Comparison Table

| Framework | Complexity | Speed | Best For | Claude Fit |
|-----------|------------|-------|----------|------------|
| **Chain-of-Thought** | Low | Fast | Math, logic, debugging | ✅ Excellent |
| **Tree of Thought** | High | Slow | Creative, strategic | ✅ Excellent |
| **ReAct** | Medium | Medium | Tool-heavy tasks | ✅ Native |
| **Few-Shot** | Low | Fast | Style/format matching | ✅ Excellent |
| **Zero-Shot** | Very Low | Very Fast | Simple tasks | ✅ Default |
| **Self-Consistency** | Medium | Slow | High-confidence needs | ⚠️ Manual |
| **Prompt Chaining** | Medium | Medium | Multi-step workflows | ✅ Native |

---

## 13. INT Inc. Deployment Patterns

### 13.1 Enterprise Client Engagement Flow

**Week 1-2: Discovery**
1. Stakeholder interviews (IT, security, compliance, business)
2. Current state inventory (existing tools, licenses, spend)
3. Use case workshop (prioritize by impact × feasibility)
4. Security requirements gathering (compliance, data residency)

**Tools:**
- Platform Explorer tabs 1-3 (research)
- SWOT analysis template
- Use case prioritization matrix

**Deliverables:**
- Discovery report (15-20 pages)
- Platform shortlist (3-5 finalists)
- Security/compliance matrix

---

**Week 3-4: Strategy**
1. ROI modeling (conservative, moderate, aggressive)
2. Tiered roadmap (Foundation → Specialization → Advanced)
3. Risk assessment (vendor lock-in, cost overruns, adoption)
4. Change management plan (training, comms, support)

**Tools:**
- Platform Explorer tab 4 (ROI calculator)
- Platform Explorer tab 5 (tiered recommendations)
- Change management templates

**Deliverables:**
- Business case deck (CFO-ready, 10-15 slides)
- 12-month implementation roadmap
- Success metrics dashboard

---

**Week 5-8: Pilot**
1. Select 1-2 teams (early adopters, tech-savvy)
2. Deploy chosen platform(s)
3. Training sessions (role-based)
4. Weekly check-ins (usage, feedback, blockers)

**Tools:**
- Platform-specific onboarding guides
- Training materials (video, docs, hands-on)
- Slack support channel

**Deliverables:**
- Pilot report (usage metrics, feedback, lessons)
- Refined rollout plan
- Updated training materials

---

**Week 9-20: Rollout**
1. Department-by-department deployment
2. Training at scale (webinars, self-service)
3. Support infrastructure (help desk, FAQ, office hours)
4. Continuous monitoring (adoption, satisfaction, impact)

**Tools:**
- Adoption dashboard (usage metrics)
- Support ticketing system
- Monthly business reviews

**Deliverables:**
- Adoption reports (weekly/monthly)
- Impact reports (productivity, cost savings)
- Continuous improvement roadmap

---

### 13.2 Pricing Models (INT Inc. Services)

**Discovery Package:** $25K - $50K (2-4 weeks)
- Stakeholder interviews
- Current state assessment
- Platform shortlist
- Security/compliance review

**Strategy Package:** $50K - $100K (4-6 weeks)
- Includes Discovery
- ROI modeling
- Tiered roadmap
- Business case deck

**Full Implementation:** $200K - $450K (14-24 weeks)
- Includes Discovery + Strategy
- Pilot program
- Department rollout
- Training delivery
- Support infrastructure
- 90-day post-launch support

**Managed Services:** $10K - $25K/month (ongoing)
- Continuous optimization
- Monthly business reviews
- New use case development
- Platform updates management
- Vendor relationship management

---

### 13.3 Success Metrics

**Adoption Metrics:**
- Weekly active users (WAU)
- Monthly active users (MAU)
- Retention rate (% returning after 30 days)
- Breadth (% of departments using)

**Impact Metrics:**
- Productivity gains (self-reported hours saved)
- Quality improvements (error reduction, faster turnaround)
- Cost savings (license consolidation, efficiency)
- Employee satisfaction (NPS, pulse surveys)

**Business Metrics:**
- ROI (actual vs projected)
- Payback period (months)
- Total cost of ownership (TCO)
- Net benefit (value - cost)

**Leading Indicators:**
- Training completion rate
- Support ticket volume (decreasing over time)
- Power user emergence (top 10% usage)
- Use case expansion (new applications discovered)

---

## 14. Templates & Quick Reference

### 14.1 Code Generation Template

```
Create a [GET/POST/PUT/DELETE] endpoint for [resource]:
- Path: /api/[resource]
- Auth: [JWT/OAuth/API key]
- Input: [schema]
- Output: [schema]
- Errors: [400/401/404/500]
- Rate limit: [X req/min]
Include: validation, error handling, tests.
```

---

### 14.2 Architecture Review Template

```
Review this architecture for [system]:
1. Security (OWASP Top 10)
2. Performance (bottlenecks, scalability)
3. Maintainability (coupling, complexity)
4. Observability (logs, metrics, traces)
5. Cost (infrastructure spend)
6. Compliance (SOC2, HIPAA if relevant)
Provide: severity (P0-P3), recommendations, refactored design.
```

---

### 14.3 ROI Calculation Template

```
Calculate ROI for [AI platform]:

Inputs:
- Employees: [number]
- Avg salary: $[amount]
- Adoption: [X]%
- Weekly productivity gain: [Y] hours
- Platform cost: $[Z]/user/month
- Training cost: $[W] one-time

Formula:
1. Annual productivity value = employees × adoption × gain × 48 weeks × (salary / 2080 hours)
2. Annual platform cost = employees × cost × 12 months
3. Total cost = platform cost + training cost
4. Net benefit = productivity value - total cost
5. ROI = (net benefit / total cost) × 100%
```

---

### 14.4 Platform Comparison Template

```
Compare [Platform A] vs [Platform B]:

| Dimension | Platform A | Platform B | Winner |
|-----------|------------|------------|--------|
| Pricing | $X | $Y | [A/B] |
| Context window | XK tokens | YK tokens | [A/B] |
| Code generation | [1-10] | [1-10] | [A/B] |
| Reasoning | [1-10] | [1-10] | [A/B] |
| Enterprise features | [1-10] | [1-10] | [A/B] |
| Compliance | [badges] | [badges] | [A/B] |
| Support | [tier] | [tier] | [A/B] |

Recommendation: [Platform X] for [reason]
```

---

### 14.5 Use Case Validation Template

```
Validate use case: [description]

1. Impact: [High/Medium/Low]
   - Quantify: [X hours saved, Y% error reduction, $Z cost savings]

2. Feasibility: [High/Medium/Low]
   - Technical: [tools available, skills required, timeline]
   - Organizational: [stakeholder buy-in, change management, budget]

3. Risk: [High/Medium/Low]
   - Technical: [complexity, dependencies, failure modes]
   - Business: [adoption, compliance, vendor lock-in]

4. Priority: [P0/P1/P2/P3]
   - Formula: Impact × Feasibility / Risk
   
5. Recommendation: [Go/No-Go/Defer]
```

---

## 15. Troubleshooting Guide

### 15.1 Platform Explorer Issues

**Problem: HTML file won't load**
- **Check:** Browser version (Chrome 90+, Firefox 88+, Safari 14+)
- **Fix:** Update browser or try different one

**Problem: Platforms not displaying**
- **Check:** JavaScript enabled in browser
- **Fix:** Settings → Privacy → Enable JavaScript

**Problem: ROI calculator shows NaN**
- **Check:** All input fields filled with valid numbers
- **Fix:** Enter positive numbers, no special characters

**Problem: Comparison table is blank**
- **Check:** Platforms added to comparison (click "+ Compare" first)
- **Fix:** Add 2-4 platforms before viewing Comparison tab

---

### 15.2 Claude Platform Issues

**Problem: Memory not working**
- **Check:** Memory enabled? (Settings → Memory)
- **Fix:** Toggle on, wait 24 hours for first sync

**Problem: Connector failing**
- **Check:** Credentials valid? OAuth token expired?
- **Fix:** Reconnect in Settings → Connectors

**Problem: MCP server not connecting (desktop)**
- **Check:** JSON syntax in `claude_desktop_config.json`
- **Fix:** Validate JSON, check env vars, restart app

**Problem: File upload fails**
- **Check:** File size (<10MB) and type (PDF, PNG, TXT, CSV)
- **Fix:** Compress file or convert format

---

### 15.3 INT Inc. Engagement Issues

**Problem: Client stakeholders not aligned**
- **Root Cause:** Unclear success metrics, siloed decision-making
- **Fix:** Run alignment workshop (OKRs, use cases, ROI targets)

**Problem: Low pilot adoption**
- **Root Cause:** Insufficient training, unclear value prop
- **Fix:** Add hands-on training, share quick wins, identify champions

**Problem: ROI not materializing**
- **Root Cause:** Low adoption, wrong use cases, poor change management
- **Fix:** Pulse survey → identify blockers → targeted intervention

---

**[End of Part 2 - Continued in Part 3: Quick Reference & Appendices]**
