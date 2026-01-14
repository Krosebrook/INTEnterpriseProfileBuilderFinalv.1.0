# Claude Systems Documentation – Full Stack Insight Guide (INT Inc. Edition)

**TL;DR:** Comprehensive reference covering Claude's platforms, INT Platform Explorer v4.0, setup, features, and enterprise deployment best practices. Think of it as your technical manual + operator's handbook + enterprise implementation guide combined.

**Version:** 3.0 (INT Inc. Integration)  
**Date:** January 12, 2026  
**Status:** ✅ PRODUCTION READY

---

## NEW IN v3.0: INT PLATFORM EXPLORER

### What Is INT Platform Explorer?
A production-ready, single-file HTML application (40KB) that enables organizations to:
- Compare 16 AI platforms side-by-side
- Evaluate 25 capability dimensions
- Calculate ROI with research-backed methodology
- Generate tiered recommendations (Foundation → Specialization → Advanced)
- Export comparisons for stakeholder presentations

**Key Innovation:** Zero dependencies, works offline, deploy in 5 minutes.

**File:** `INT_Platform_Explorer_v4.0.html`  
**Quick Deploy:** Upload to Vercel, Cloudflare Pages, or GitHub Pages  
**Target Audience:** IT consulting firms, enterprise decision-makers, technical evaluators

---

## Document Structure

### PART I: CLAUDE PLATFORMS & SETUP (Sections 1-5)
- Platform overview (Web, Desktop, Mobile)
- Initial setup and configuration
- Personal preferences system
- Memory system architecture
- Skills ecosystem

### PART II: ENTERPRISE FEATURES (Sections 6-10)
- Connectors (MCP servers)
- Extensions and integrations
- Claude capabilities matrix
- Known limitations and workarounds
- Security and compliance

### PART III: INT PLATFORM EXPLORER (Sections 11-15)
- Platform Explorer architecture
- 16 AI platforms profiled
- Deployment playbooks
- ROI calculator methodology
- Multi-tenant roadmap

### PART IV: ADVANCED USAGE (Sections 16-20)
- Prompting frameworks
- Use case library (30+ examples)
- Templates and shortcuts
- Troubleshooting guide
- Quick reference

---

## 1. Claude Platforms Overview

### 1.1 Claude Web (claude.ai)

**What it is:** Browser-based interface accessible at https://claude.ai

**Core Capabilities:**
- Full conversational AI with file upload support (PDF, images, docs, spreadsheets)
- Artifact creation and rendering (React, HTML, Markdown, SVG, Mermaid)
- Web search integration (real-time information retrieval)
- Multi-modal input (text + images)
- Project-based organization with custom instructions
- Connector integrations (Google Drive, Slack, Linear, HubSpot, etc.)
- Persistent storage API for artifacts
- Team collaboration features (Pro/Team plans)

**UX/UI:**
- Left sidebar: conversation history, projects, settings
- Center: chat interface with streaming responses
- Right panel: artifacts render inline
- Settings accessible via gear icon (top-right)

**Platform-Specific Features:**
- Browser extension compatibility
- Direct URL sharing for conversations
- Web-only connectors (some MCP servers)
- Largest file upload limits

**Limitations:**
- Requires internet connection
- Session management via cookies
- Some MCP servers unavailable (desktop-only)

---

### 1.2 Claude Desktop

**What it is:** Native application for macOS/Windows with extended capabilities

**Core Capabilities:**
- Everything from Claude Web
- **MCP (Model Context Protocol) server support** – deepest integration
- Local file system access
- System-level integrations
- Offline caching (limited)
- Native notifications

**UX/UI:**
- Similar to web but with native OS chrome
- Better performance for large files
- System tray integration
- Native keyboard shortcuts

**Platform-Specific Features:**
- **MCP server configuration via JSON** (most powerful feature)
- Local tool execution (bash, file operations)
- Tighter OS integration (clipboard, notifications)
- Background processing

**Configuration File Location:**
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

**Example MCP Configuration:**
```json
{
  "mcpServers": {
    "github": {
      "type": "sse",
      "url": "https://mcp.github.com",
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx"
      }
    },
    "local-database": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "DB_CONNECTION": "postgresql://..."
      }
    }
  }
}
```

**Limitations:**
- Requires installation
- Platform-dependent (Mac vs Windows features vary)
- Some web connectors unavailable

---

### 1.3 Claude Mobile

**What it is:** iOS/Android apps for on-the-go access

**Core Capabilities:**
- Core conversational AI
- Photo/camera integration
- Voice input (platform-dependent)
- Basic file upload
- Conversation sync across devices
- Push notifications

**UX/UI:**
- Mobile-optimized interface
- Swipe gestures for navigation
- Bottom tab navigation
- Compact artifact rendering

**Platform-Specific Features:**
- Camera integration for real-time image analysis
- Voice-to-text input
- Share sheet integration (iOS)
- Mobile-specific shortcuts

**Limitations:**
- No MCP server support
- Limited connector availability
- Smaller file upload limits
- Artifact creation limited (simpler outputs)
- No bash/computer use tools

---

### 1.4 Platform Comparison Table

| Feature | Web | Desktop | Mobile |
|---------|-----|---------|--------|
| **MCP Servers** | Limited | **Full** | None |
| **Connectors** | Most | Most | Limited |
| **File Upload Size** | Large | **Largest** | Smallest |
| **Artifacts** | Full | Full | Limited |
| **Computer Use** | Yes | Yes | No |
| **Web Search** | Yes | Yes | Yes |
| **Projects** | Yes | Yes | Yes |
| **Voice Input** | No | No | Yes (native) |
| **Camera** | No | No | Yes |
| **Offline Mode** | No | Partial | Partial |

---

## 2. Claude Setup (Max Depth)

### 2.1 Initial Onboarding

**Step 1: Account Creation**
1. Visit https://claude.ai or download app
2. Choose sign-up method:
   - Email (magic link)
   - Google OAuth
   - Apple Sign-In (mobile)
3. Verify email/phone
4. Select plan (Free, Pro, Team)

**Step 2: Profile Setup**
1. Navigate to Settings → Profile
2. Set display name
3. Configure user preferences (detailed in Section 3)
4. Enable/disable memory system

**Step 3: Platform-Specific Setup**

**Web:**
- Bookmark claude.ai
- Install browser extension (optional)
- Configure default browser settings

**Desktop:**
- Download from https://claude.ai/download
- Install native app
- Configure MCP servers (advanced):
  - Locate `claude_desktop_config.json`
  - Add MCP server configurations
  - Grant filesystem permissions if prompted

**Mobile:**
- Download from App Store/Play Store
- Enable notifications
- Grant camera/microphone permissions (optional)

---

### 2.2 Advanced Configuration

#### 2.2.1 Projects Setup
- Create projects for different contexts (work, personal, research)
- Each project has:
  - Custom instructions (team-level preferences)
  - Separate conversation history
  - Shared knowledge base
  - Project-specific memory scope

#### 2.2.2 Connector Configuration
1. Navigate to Settings → Connectors
2. Authenticate with third-party services:
   - **Google Drive** (OAuth flow)
   - **Slack** (workspace approval)
   - **GitHub** (PAT or OAuth)
   - **Linear** (project management)
   - **HubSpot** (CRM integration)
   - **Notion** (knowledge base)
   - **Figma** (design collaboration)
   - **Stripe** (payment data)
   - **Sentry** (error tracking)
   - And 15+ more (see Section 6)

#### 2.2.3 Memory System
- Settings → Memory
- Toggle "Generate memory from chat history" (on/off)
- Enable "Search and reference past chats" (on/off)
- Review/edit memory entries periodically
- Scope: Global vs Project-specific

#### 2.2.4 Skills Installation
- Settings → Skills
- Browse available skills
- Install relevant skills:
  - **docx** - Word document creation/editing
  - **pdf** - PDF manipulation
  - **pptx** - Presentation creation
  - **xlsx** - Spreadsheet operations
  - **frontend-design** - Web UI creation
  - **staff-engineer-v3** - Production-ready architecture
  - And 20+ more (see Section 5)
- Skills are automatically invoked when relevant

---

## 3. Personal Preferences (Max Depth)

### 3.1 User Preferences Location
**Settings → Profile → User Preferences** (text box)

### 3.2 Preference Categories

**Behavioral Preferences** (How Claude adapts behavior):
- Output format (bullet points, prose, tables)
- Artifact usage frequency
- Tool usage preferences (when to search, when to code)
- Communication style (formal, casual, technical)
- Language preferences

**Contextual Preferences** (Background/interests):
- Professional role/expertise
- Personal interests
- Current projects
- Learning goals
- Technical stack preferences

---

### 3.3 Preference Application Rules

**Always Applied:**
- Marked with "always", "for all chats", "whenever you respond"
- Language preferences with "only" (e.g., "only respond in Spanish")

**Conditionally Applied:**
- Only when directly relevant to task/domain
- Only when would improve response quality
- Never for generic technical questions (unless credential matches)

**Never Applied:**
- When surprising/confusing to user
- For unrelated domains
- When preferences conflict with query language

---

### 3.4 Example Preference Structures

```markdown
I'm a [ROLE] who focuses on [DOMAIN]. 

For technical explanations, always use analogies before diving into details.

When writing code, prioritize security-first patterns and include error handling.

I prefer TypeScript over JavaScript, Next.js for web projects, and Supabase for databases.

Never use bullet points in reports unless I explicitly ask.
```

---

## 4. Memory System (Max Depth)

### 4.1 How Claude Memory Works

**Architecture:**
- Memories derived from past conversations
- Periodic background updates (not real-time)
- Stored as key facts/preferences
- Scoped to Projects vs Global

**Memory Types:**
- **Work context** – job, role, tools, processes
- **Personal context** – interests, background, family
- **Top of mind** – current projects, active work
- **Brief history** – past conversations, decisions
- **Instructions** – user-specified preferences

---

### 4.2 Memory Scope

**Global Memory:**
- Conversations outside Projects
- Available across all non-project chats
- Updated from all non-project conversations

**Project Memory:**
- Conversations within a specific Project
- Isolated from other Projects
- Only includes that Project's history

---

### 4.3 Memory Lifecycle

**Creation:**
- Automatically generated from conversations
- Updated periodically (nightly batches)
- Derived, not verbatim transcripts

**Retention:**
- Persists until conversation deleted
- Deletion propagates to memory (nightly cleanup)
- Recent conversations may not yet be reflected

**Editing:**
- Via `memory_user_edits` tool
- Commands: view, add, remove, replace
- Max 30 edits, 200 chars each

---

### 4.4 Memory Application Patterns

**Direct Factual Questions:**
- Immediate answer (no preamble)
- Example: "When did I graduate?" → "MIT in 2018."

**Natural Integration:**
- Context applied without attribution
- No "Based on what I know about you..."
- No "I see in your profile..."

**Selective Application:**
- Only relevant memories used
- Generic questions = minimal personalization
- Explicit personalization requests = comprehensive

---

### 4.5 Memory Best Practices

**Do:**
- ✅ Review memory quarterly
- ✅ Update major decisions/constraints
- ✅ Remove outdated info
- ✅ Keep entries concise (under 200 chars)

**Don't:**
- ❌ Store secrets/passwords/PII
- ❌ Store verbatim commands
- ❌ Over-rely on memory for security
- ❌ Assume memory is comprehensive

---

### 4.6 Memory Editing Examples

**View current memory:**
```
memory_user_edits(command="view")
```

**Add new entry:**
```
memory_user_edits(command="add", control="User works at Anthropic as Staff Engineer")
```

**Replace entry #3:**
```
memory_user_edits(command="replace", line_number=3, replacement="User is CEO at Anthropic")
```

**Remove entry #5:**
```
memory_user_edits(command="remove", line_number=5)
```

---

## 5. Claude Skills (Max Depth)

### 5.1 What Are Skills?

**Definition:** Pre-packaged expertise bundles containing:
- Best practices documentation
- Tool usage patterns
- Domain-specific workflows
- Example templates

**Think of it like:** Plugin system + training manual. Each skill is a specialized co-pilot for specific tasks.

---

### 5.2 Built-In Skills (Public)

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| **docx** | Word document creation/editing | Professional documents, tracked changes |
| **pdf** | PDF manipulation | Form filling, text extraction, merging |
| **pptx** | Presentation creation | Slide decks, formatting |
| **xlsx** | Spreadsheet operations | Data analysis, formulas, charts |
| **frontend-design** | Web UI creation | Landing pages, dashboards, components |
| **mcp-builder** | MCP server development | Building custom integrations |
| **web-artifacts-builder** | Complex React artifacts | Multi-component apps |
| **accessibility-core** | WCAG compliance | Accessible interfaces |
| **workflow-automation** | n8n/Zapier/Make | No-code automation |
| **staff-engineer-v3** | Production architecture | Security-first, modular systems |

---

### 5.3 User-Uploaded Skills

**Location:** `/mnt/skills/user/`

**Available User Skills:**
- responsive-design-patterns
- animation-motion-design
- workflow-automation
- ui-component-library
- professional-web-design
- production-graphics
- design-system-builder
- advanced-visual-design
- advanced-ux-patterns
- skill-troubleshooter
- ai-agents-workflow
- And 10+ more specialized skills

---

### 5.4 Skill Lifecycle

**Installation:**
1. Settings → Skills
2. Browse/Search
3. Click "Install"
4. Skill available immediately

**Activation:**
- Automatic when relevant task detected
- Claude reads SKILL.md before executing
- Multi-skill combination possible

**Updates:**
- Public skills: automatic
- User skills: manual upload

**Removal:**
1. Settings → Skills
2. Select skill
3. Click "Remove"

---

### 5.5 Creating Custom Skills

**Structure:**
```
skill-name/
├── SKILL.md (required)
├── examples/ (optional)
├── templates/ (optional)
└── resources/ (optional)
```

**SKILL.md Format:**
```yaml
---
name: skill-name
description: Brief purpose
version: 1.0.0
---

# Skill Documentation

## Purpose
What this skill does

## When to Use
Trigger patterns

## Best Practices
Key guidelines

## Examples
Usage examples
```

**Packaging:**
1. Zip the folder
2. Upload via Settings → Skills

---

### 5.6 Skill Best Practices

**Do:**
- ✅ Read skill docs BEFORE executing
- ✅ Combine multiple skills when needed
- ✅ Follow skill-specific patterns
- ✅ Update skills when processes change

**Don't:**
- ❌ Skip skill docs (defeats purpose)
- ❌ Override skill guidance without reason
- ❌ Duplicate existing skills
- ❌ Create overly broad skills (narrow scope = better)

---

## 6. Connectors (Max Depth)

### 6.1 What Are Connectors?

**Definition:** Pre-configured integrations with external services via MCP (Model Context Protocol)

**Think of it like:** OAuth-enabled bridges to SaaS tools. One-click auth, instant access to external data.

---

### 6.2 Available Connectors (26 MCP Servers)

| Connector | Category | Use Case |
|-----------|----------|----------|
| **Atlassian** | Project Mgmt | Jira, Confluence integration |
| **Stripe** | Payments | Transaction data, customer info |
| **Canva** | Design | Template access, design generation |
| **Notion** | Knowledge | Database queries, page creation |
| **Sentry** | Monitoring | Error tracking, performance |
| **Intercom** | Support | Customer conversations |
| **Plaid** | Finance | Bank account data |
| **Zapier** | Automation | Workflow triggers |
| **Netlify** | Hosting | Deployment, site management |
| **Hugging Face** | AI/ML | Model access, datasets |
| **Linear** | Project Mgmt | Issue tracking, roadmaps |
| **Figma** | Design | File access, prototypes |
| **GitHub** | Development | Code repos, PRs, issues |
| **Vercel** | Hosting | Deployments, analytics |
| **Cloudflare** | Edge | Workers, KV, R2 storage |
| **HubSpot** | CRM | Contacts, deals, pipelines |
| **monday.com** | Project Mgmt | Boards, workflows |
| **n8n** | Automation | Custom workflows |
| **GoDaddy** | Domains | DNS management |
| **Cloudinary** | Media | Image/video optimization |
| **Fireflies** | Meetings | Transcription, notes |
| **Close** | Sales | CRM, email tracking |
| **Stytch** | Auth | Authentication flows |
| **Daloopa** | Finance | Financial data extraction |
| **CData** | Data | Multi-source connectors |
| **Scholar Gateway** | Research | Academic paper access |

---

### 6.3 Connector Setup Process

1. **Settings → Connectors**
2. Click "Connect" on desired service
3. Complete OAuth flow (or enter API key)
4. Grant permissions
5. Connector active immediately

**Usage:**
- Automatically available in conversations
- Claude suggests when relevant
- Can be manually invoked via prompts

---

### 6.4 Claude Desktop Connectors (MCP Servers)

**What's Different:**
- More control (JSON config)
- Local server support
- Custom parameters
- Advanced authentication

**Example Configuration:**
```json
{
  "mcpServers": {
    "github": {
      "type": "sse",
      "url": "https://mcp.github.com",
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxx"
      }
    },
    "local-database": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "DB_CONNECTION": "postgresql://..."
      }
    }
  }
}
```

**MCP Server Types:**
1. **SSE (Server-Sent Events):** HTTP-based, cloud-hosted
2. **stdio:** Local process, stdin/stdout communication

**Security Notes:**
- Store credentials in env vars (never hardcode)
- Use `.env` files for local servers
- Rotate tokens quarterly
- Minimal permissions (principle of least privilege)

---

### 6.5 Connector Best Practices

**Do:**
- ✅ Grant minimal necessary permissions
- ✅ Rotate credentials quarterly
- ✅ Test connectors after setup
- ✅ Monitor connector usage (audit logs)
- ✅ Disconnect unused connectors

**Don't:**
- ❌ Share connector credentials
- ❌ Use admin accounts for connectors
- ❌ Grant "full access" unless required
- ❌ Leave test connectors active in prod

---

## 7. Extensions & Integrations

### 7.1 Extension Ecosystem

**Current State (as of January 2025):**
- Browser extensions (Chrome, Firefox, Safari)
- IDE extensions (VS Code, JetBrains)
- API-based integrations

**Note:** Claude's extension ecosystem is still maturing. Most "extensions" are actually:
1. Web connectors (via MCP)
2. API integrations
3. Third-party tools using Claude API

---

### 7.2 Browser Extensions

**Official:**
- None currently (as of Jan 2025)

**Third-Party (Unofficial):**
- Chat exporters
- UI enhancers
- Prompt libraries
- (Verify current availability via web search)

**Security Considerations:**
- ⚠️ Third-party extensions may access conversation data
- ⚠️ Review permissions before installing
- ⚠️ Prefer official or verified extensions
- ⚠️ Audit extension network activity

---

### 7.3 IDE Extensions

**VS Code:**
- Claude Code (CLI tool, not traditional extension)
- API-based plugins (community-built)

**JetBrains:**
- API integrations
- Custom plugins using Anthropic API

---

## 8. Claude Current Abilities (Max Depth)

### 8.1 Model Versions

**Claude 4 Family (Current):**
- **Claude Opus 4.1, 4:** Most capable, highest intelligence
- **Claude Sonnet 4.5, 4:** Best balance (speed + intelligence) – **CURRENT DEFAULT**
- **Claude Haiku 4.5:** Fastest, most efficient

**Model Strings (for API):**
- `claude-sonnet-4-5-20250929`
- `claude-haiku-4-5-20251001`

---

### 8.2 Core Capabilities

**1. Natural Language Understanding**
- Context windows: 200K tokens (~150K words)
- Multilingual (100+ languages)
- Nuanced instruction following
- Ambiguity resolution

**2. Code Generation & Analysis**
- Multi-language support (Python, JavaScript, TypeScript, Rust, Go, C++, Java, etc.)
- Full-stack applications
- Code review and debugging
- Test generation
- Documentation writing

**3. Data Analysis**
- CSV/Excel processing
- Statistical analysis
- Visualization recommendations
- Pattern recognition

**4. Creative Writing**
- Long-form content (articles, stories, scripts)
- Marketing copy
- Technical documentation
- Email drafting

**5. Reasoning & Problem-Solving**
- Multi-step logical reasoning
- Mathematical problem-solving
- Strategic planning
- Decision analysis

**6. Multi-Modal Input**
- Image analysis (OCR, object detection, scene understanding)
- PDF parsing (text extraction, table detection)
- Document understanding

**7. Tool Use (Function Calling)**
- Web search
- File operations
- API calls
- Custom tools via MCP

**8. Artifact Creation**
- React components (interactive UIs)
- HTML/CSS (landing pages)
- SVG (diagrams, illustrations)
- Mermaid (flowcharts, diagrams)
- Markdown (documents)

---

### 8.3 Model-Specific Differences

| Capability | Opus 4 | Sonnet 4.5 | Haiku 4.5 |
|------------|--------|------------|-----------|
| **Intelligence** | Highest | High | Good |
| **Speed** | Slower | Fast | Fastest |
| **Cost** | Highest | Medium | Lowest |
| **Context** | 200K | 200K | 200K |
| **Best For** | Complex reasoning | Daily tasks | High-volume |

---

### 8.4 Advanced Features

**1. Artifacts**
- Persistent storage API (key-value, 5MB/key)
- Shared vs personal data scoping
- Real-time collaboration (shared artifacts)

**2. Computer Use (Beta)**
- Bash command execution
- File creation/editing
- Directory navigation
- Python/Node.js execution

**3. Web Search Integration**
- Real-time information retrieval
- Source citation
- Multi-result synthesis

**4. Memory System**
- Cross-conversation context
- User preference learning
- Project-specific memory

**5. MCP Protocol**
- External tool integration
- Custom function calling
- Stateful workflows

---

### 8.5 Knowledge Cutoff

**Training Data:** Through January 2025

**Current Information:**
- Via web search for post-cutoff events
- Real-time data via MCP servers
- User-provided documents

**Special Note:**
- Donald Trump is the current president (inaugurated January 20, 2025)
- Defeated Kamala Harris in 2024 election

---

## 9. Claude Limitations (Max Depth)

### 9.1 Technical Limitations

**1. Context Window Constraints**
- 200K tokens max (~150K words)
- Performance degrades with very long contexts
- No perfect recall across long conversations

**2. File Processing**
- **Supported:** PNG, JPEG, GIF, WebP (images); PDF, TXT, MD, HTML, CSV (docs)
- **Not Supported:** Video, audio (except transcripts)
- Size limits: 5-10MB (varies by platform)

**3. Real-Time Data**
- No direct market data feeds
- No live streaming data
- Web search for current info only

**4. Computational Limits**
- No persistent state between API calls
- No long-running background processes
- Tool execution timeouts (~60 seconds)

---

### 9.2 Policy Limitations

**1. Content Restrictions**
- No child safety violations (strict)
- No malware/exploit code
- No weapons information (chemical, biological, nuclear)
- No real-person deepfakes or impersonation

**2. Financial/Legal Advice**
- Can provide information, not recommendations
- Must caveat (not a lawyer/advisor)
- No confident trade recommendations

**3. Privacy**
- Cannot identify people in images
- Won't search for personal info without consent
- Redacts PII in examples

---

### 9.3 Known Bugs & Workarounds

**Issue: Tool calling loops**
- **Cause:** MCP server returns incomplete data
- **Workaround:** Manually paginate or provide full context upfront

**Issue: Artifact rendering fails**
- **Cause:** Complex React dependencies
- **Workaround:** Use simpler components, avoid external CDNs

**Issue: Memory staleness**
- **Cause:** Nightly update cycle
- **Workaround:** Re-state critical info in conversation

**Issue: Web search hallucinations**
- **Cause:** Over-indexing on single source
- **Workaround:** Request multiple sources, cross-reference

---

### 9.4 Model Limitations

**Claude 4 Sonnet 4.5 (Current):**
- ✅ Best balance of speed/intelligence
- ❌ Occasionally overconfident on edge cases
- ❌ Struggles with very niche/new APIs (post-Jan 2025)

**Claude 4 Opus:**
- ✅ Highest reasoning capability
- ❌ Slower response times
- ❌ Overkill for simple tasks

**Claude 4 Haiku:**
- ✅ Very fast
- ❌ Less nuanced reasoning
- ❌ Shorter responses

---

## 10. Lessons Learned / Best Practices

### 10.1 Power User Lessons

**1. Prompt Structure Matters More Than Length**
- ❌ "Write me a good landing page"
- ✅ "Write a landing page for [product]. Target audience: [persona]. Include: hero, 3 benefits, CTA. Tone: conversational."

**2. Use Projects for Context Isolation**
- Keep work/personal separate
- Custom instructions per project
- Prevents context bleed

**3. Memory Is a Tool, Not a Crutch**
- Review quarterly
- Update major changes immediately
- Don't rely for security-critical info

**4. Skills Are Your Force Multipliers**
- Always check available skills first
- Read skill docs BEFORE coding
- Combine skills for complex tasks

**5. Web Search Is Not a Fallback**
- Use proactively for current events
- Don't apologize for knowledge cutoff
- Cite sources properly

---

### 10.2 Common Pitfalls

**Pitfall #1: Over-Prompting**
- **Problem:** 500-word prompts when 50 words suffice
- **Fix:** Start concise, add detail if needed

**Pitfall #2: Ignoring Artifacts**
- **Problem:** Asking for code in chat instead of artifact
- **Fix:** Request "create a file" or "make an artifact"

**Pitfall #3: Not Using Tools**
- **Problem:** Asking Claude to "imagine" external data
- **Fix:** Use web search, MCP connectors, file uploads

**Pitfall #4: Memory Bloat**
- **Problem:** 30 outdated memory entries
- **Fix:** Quarterly cleanup, remove stale info

**Pitfall #5: No Error Handling in Code**
- **Problem:** Claude provides happy-path-only code
- **Fix:** Explicitly request error handling, validation, edge cases

---

### 10.3 Keyboard Shortcuts

**Web Interface:**
- `Cmd/Ctrl + K`: New conversation
- `Cmd/Ctrl + Shift + L`: Toggle sidebar
- `Cmd/Ctrl + /`: Focus chat input
- `Esc`: Cancel ongoing response
- `↑`: Edit last message

**Desktop (Additional):**
- `Cmd/Ctrl + ,`: Settings
- `Cmd/Ctrl + N`: New window
- `Cmd/Ctrl + W`: Close conversation

**Mobile:**
- Swipe left: Delete conversation
- Long-press: Copy message
- Pull-down: Refresh

---

### 10.4 Do's & Don'ts Cheat Sheet

**Do:**
- ✅ Use `[SPIKE]`, `[PROD]`, `[SKEPTIC]` prefixes to set scope
- ✅ Request "show me 3 options" for decision-making
- ✅ Ask for analogies first (easier to understand)
- ✅ Upload files instead of pasting long text
- ✅ Use Projects for different contexts
- ✅ Enable memory for personalization
- ✅ Review memory quarterly
- ✅ Use web search for post-Jan 2025 info
- ✅ Request error handling explicitly
- ✅ Ask for tests when generating code

**Don't:**
- ❌ Paste 10,000 lines of code (upload file instead)
- ❌ Ask Claude to "remember" without using memory tool
- ❌ Assume Claude has real-time data (search instead)
- ❌ Request personal info about people (privacy)
- ❌ Expect Claude to execute long-running tasks (60s timeout)
- ❌ Use Claude for final legal/financial decisions
- ❌ Store secrets in memory or conversations
- ❌ Over-format responses (bullet points everywhere)
- ❌ Ignore skill documentation
- ❌ Forget to cite sources when using web search

---

**[Continued in Part 2: Sections 11-20 with INT Platform Explorer details]**
