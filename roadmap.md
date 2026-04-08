# INT Platform Explorer v4.0 — Product Roadmap

> **Audience:** Engineers, product owners, and stakeholders at INT Inc.  
> **Last updated:** April 2026  
> **Current version:** 4.0 (production-ready baseline)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Audit](#current-state-audit)
   - [What Is Working Well (Hidden Gems)](#what-is-working-well-hidden-gems)
   - [Active Gaps & Bugs to Fix](#active-gaps--bugs-to-fix)
3. [Roadmap](#roadmap)
   - [Phase 0 — Immediate Fixes (Now)](#phase-0--immediate-fixes-now)
   - [Phase 1 — Production Hardening (Q2 2026)](#phase-1--production-hardening-q2-2026)
   - [Phase 2 — Feature Expansion (Q3 2026)](#phase-2--feature-expansion-q3-2026)
   - [Phase 3 — Intelligence & Differentiation (Q4 2026)](#phase-3--intelligence--differentiation-q4-2026)
   - [Phase 4 — Scale & Enterprise Depth (2027)](#phase-4--scale--enterprise-depth-2027)
4. [Differentiators](#differentiators)
5. [Documentation Improvements](#documentation-improvements)
6. [Tech Debt Register](#tech-debt-register)

---

## Executive Summary

INT Platform Explorer v4.0 is a **well-architected, enterprise-grade decision-support tool** that helps organizations evaluate, compare, and adopt AI platforms. The core is solid: modular React + Express stack, Drizzle ORM with PostgreSQL, full Zod validation, Helmet security headers, rate limiting, React error boundaries, and Playwright visual-regression tests. All known TypeScript compilation errors have been resolved and previously-identified critical and high-priority gaps are closed.

This roadmap documents what remains to address, what should be built next, and the hidden strengths of the platform that can be leveraged as product differentiators.

---

## Current State Audit

### What Is Working Well (Hidden Gems)

These are capabilities that already exist in the codebase and provide genuine value — many are not yet surfaced prominently in the UI or documentation.

| # | Gem | Where | Why It Matters |
|---|-----|-------|----------------|
| G1 | **16-platform data model with 10 capability dimensions** | `server/storage.ts` | Covers Foundation, Specialized, Enterprise, Developer, and Productivity categories — a thorough, opinionated dataset that goes far beyond typical competitor comparison tools |
| G2 | **Template-driven PRD generator (13 sections, zero AI API cost)** | `server/storage.ts` → `generatePRD()` | Generates complete, spec-driven Product Requirements Documents entirely in-process; no LLM API key required, instant, offline-capable |
| G3 | **Multi-department ROI calculator with per-platform benchmarks** | `client/src/lib/assessmentData.ts` | `ROI_BENCHMARKS` table covers 10 departments × 4 platforms with research-backed multipliers — most competitors offer only single-number "productivity gain" sliders |
| G4 | **5-step AI Readiness Assessment wizard** | `AssessmentTab.tsx` | Captures org name, departments (with headcount + hourly rate), compliance standards (9 options), integration categories, and pain points — generates per-platform ROI scores from real inputs |
| G5 | **Role-based Enterprise Profile Builder** | `ProfileBuilderTab.tsx` + `lib/profileData.ts` | Ready-to-use system prompts, escalation protocols, feature flags, and tools per role (Finance, Sales, Engineering, Marketing, Ops, HR); deployable Claude system prompt with one-click copy |
| G6 | **Deployment progress checklist with persistent state** | `ProfileBuilderTab.tsx` → `DeploymentSection` | Interactive phased deployment checklist (checkboxes + progress bar) built directly into the UI — replaces a Confluence page for most teams |
| G7 | **Playwright visual regression test suite** | `e2e/error-boundary.spec.ts` | Screenshot baselines for 5 views + dark mode; catches unintended regressions without unit test sprawl |
| G8 | **Granular React error boundaries per tab** | `ErrorBoundary.tsx` | Root + per-tab error isolation means a crash in the PRD Generator does not take down the Explorer or ROI tabs |
| G9 | **Sunset/sunrise fixed-parallax background** | `App.tsx` + `design_guidelines.md` | Distinctive, branded visual identity using a real image asset with a gradient overlay system — differentiates from generic SaaS dashboards |
| G10 | **WCAG skip-to-content link + semantic landmark** | `SkipLink.tsx` + `<main id="main-content">` | `<main tabIndex={-1}>` with a skip link is implemented; accessibility foundation is real, not just aspirational |
| G11 | **Shared Zod validation across client + server** | `shared/validation.ts` | The same schemas that validate the Express API can be imported by the React client, eliminating double maintenance of validation rules |
| G12 | **Content Security Policy with dev/prod branching** | `server/routes.ts` → Helmet config | CSP automatically allows `ws:/wss:` in development for Vite HMR while locking down production — zero config needed by developers |

---

### Active Gaps & Bugs to Fix

#### Security

| ID | Severity | Description | File(s) |
|----|----------|-------------|---------|
| S1 | Medium | `POST /api/prd/generate` and `POST /api/platforms/compare` are not rate-limited independently; only the global `apiLimiter` (100 req/15 min) protects them — the PRD generator is CPU-bound and should have its own tighter limiter | `server/routes.ts` |
| S2 | Low | Session cookie `sameSite` attribute is not explicitly set in the session config; should be `"strict"` for production | `server/replit_integrations/auth/` |
| S3 | Low | No data retention / account deletion path for users stored in PostgreSQL (`users` table) — violates GDPR right-to-erasure | `server/storage.ts`, `server/db.ts` |
| S4 | Low | `scriptSrc: ["'self'", "'unsafe-inline'"]` in the CSP is overly permissive; inline scripts should be replaced with nonces or hashes | `server/routes.ts` |

#### Functional / UX

| ID | Severity | Description | File(s) |
|----|----------|-------------|---------|
| F1 | Medium | Platform selections in the Explorer tab are **not persisted** across page reloads; user must re-select every session | `App.tsx` |
| F2 | Medium | The Assessment tab's per-platform ROI scores are computed client-side using static benchmarks in `assessmentData.ts`, which duplicates and diverges from the authoritative server-side `calculateROI()` logic | `client/src/lib/assessmentData.ts`, `server/storage.ts` |
| F3 | Low | The PRD generator produces generic placeholder text (e.g., "The current system lacks the capability to: `{featureIdea}`") regardless of input — the 13 sections are structurally correct but content is boilerplate | `server/storage.ts` → `generatePRD()` private methods |
| F4 | Low | No empty-state UI when the Comparison tab has zero platforms selected — a blank screen appears with no call-to-action | `ComparisonTab.tsx` |
| F5 | Low | `Matrix` tab scores render as raw numbers (1–10); no color heat-map is implemented despite being called out in `design_guidelines.md` | `MatrixTab.tsx` |
| F6 | Low | `contextWindow: "N/A"` is stored as a string for several platforms (Jasper, Copy.ai, Notion AI, Slack AI); this breaks any future numeric sorting or filtering | `server/storage.ts` |
| F7 | Low | No ARIA live region announces ROI calculation results to screen readers after the form submits | `ROICalculator.tsx` |
| F8 | Low | Deployment checklist state in the Profile Builder resets on page reload (local `useState` only) | `ProfileBuilderTab.tsx` → `DeploymentSection` |

#### Developer Experience

| ID | Severity | Description | File(s) |
|----|----------|-------------|---------|
| D1 | Medium | `@playwright/test` is listed as a **production dependency** instead of `devDependencies`; this bloats the production bundle | `package.json` |
| D2 | Low | Platform data (`platformsData`, `strategyTiersData`) is hardcoded in `server/storage.ts` — a 600-line file; this should be extracted to `shared/data/platforms.ts` for maintainability | `server/storage.ts` |
| D3 | Low | `WEEKS_PER_YEAR = 48` is defined in both `server/storage.ts` and `client/src/components/ROICalculator.tsx`; single source of truth should live in `shared/` | Both files |
| D4 | Low | No `.env.example` file; new developers must infer required environment variables from README prose | Root |
| D5 | Low | The Playwright config (`playwright.config.ts`) does not set a `baseURL`; tests rely on a running dev server with no documented startup command for CI | `playwright.config.ts` |

---

## Roadmap

### Phase 0 — Immediate Fixes (Now)

> Target: 1–2 days of engineering. Zero new dependencies.

- [ ] **[S1]** Add a dedicated `prdLimiter` (e.g., 10 req/min) to `POST /api/prd/generate` to protect the CPU-bound PRD generator  
- [ ] **[D1]** Move `@playwright/test` from `dependencies` to `devDependencies` in `package.json`  
- [ ] **[D3]** Extract `WEEKS_PER_YEAR = 48` to `shared/constants.ts`; import from there in both `server/storage.ts` and `ROICalculator.tsx`  
- [ ] **[D4]** Add `.env.example` with `DATABASE_URL`, `SESSION_SECRET`, and `PORT` documented  
- [ ] **[F4]** Add empty-state card in `ComparisonTab.tsx` with a "Go to Explorer" CTA when no platforms are selected  
- [ ] **[F7]** Add `aria-live="polite"` region to ROI results panel so screen readers announce updated values  

---

### Phase 1 — Production Hardening (Q2 2026)

> Target: 2–4 weeks. Closes all medium-severity gaps before first external customer deployment.

**Security**
- [ ] **[S2]** Set `sameSite: "strict"` on session cookie in the auth configuration  
- [ ] **[S4]** Replace `'unsafe-inline'` in `scriptSrc` with a nonce-based CSP policy using a Vite plugin (`vite-plugin-csp` or equivalent)  
- [ ] **[S3]** Implement `DELETE /api/user` endpoint that removes user row and all associated session data; document in README under Privacy  

**Persistence**
- [ ] **[F1]** Persist selected platform IDs to `localStorage` (key: `int-selected-platforms`); restore on mount via a `useSelectedPlatforms` custom hook  
- [ ] **[F8]** Persist deployment checklist state to `localStorage` (key: `int-deploy-checklist`) using the same pattern  

**Data Quality**
- [ ] **[F6]** Change `contextWindow` on platforms that have no context window to `null` (typed as `string | null`) and update UI to display "N/A" conditionally  
- [ ] **[F2]** Remove the static `ROI_BENCHMARKS` table from `assessmentData.ts`; call `POST /api/roi/calculate` from the Assessment tab with the per-department inputs instead  
- [ ] **[D2]** Extract `platformsData` and `strategyTiersData` arrays into `shared/data/platforms.ts` and `shared/data/strategy.ts`; import them in `server/storage.ts`  

**Testing**
- [ ] **[D5]** Add `baseURL: "http://localhost:5000"` to `playwright.config.ts`; document `npm run dev` as the prerequisite for E2E tests in `CONTRIBUTING.md`  
- [ ] Add at least 5 unit tests for the ROI calculation logic in `server/storage.ts` using Node's built-in test runner or Vitest  

---

### Phase 2 — Feature Expansion (Q3 2026)

> Target: 6–10 weeks. Increases daily active value for enterprise users.

**Matrix Tab Heatmap**
- Implement color heat-map scoring in `MatrixTab.tsx`: cells colored on a green (10) → yellow (5) → red (1) gradient using Tailwind dynamic classes or a tiny `score-to-color` utility in `lib/utils.ts`  
- Add a legend/key below the matrix explaining the scale

**Shareable Comparison Links**
- Encode selected platform IDs as a URL query parameter (`?compare=claude-sonnet,chatgpt-enterprise`)  
- On load, parse the parameter and pre-populate `selectedPlatforms` state  
- Add a "Share" button in the Comparison tab that copies the URL to the clipboard

**PRD Generator Enhancement**
- Replace the generic boilerplate in `generatePRD()` private methods with context-aware templates that incorporate keywords extracted from the feature idea (simple string matching / keyword categorization — no LLM required)  
- Add a "Regenerate Section" button per accordion item so users can iterate on individual sections

**User Preference Persistence (Server-Backed)**
- For authenticated users: save `selectedPlatforms` and Assessment wizard progress to a new `user_preferences` table in PostgreSQL (Drizzle schema, single JSON column)  
- Sync on auth; fall back to `localStorage` for anonymous users

**Export & Sharing**
- Add PDF export for the Comparison tab using the browser Print API with a `@media print` stylesheet  
- Add CSV export for the Matrix tab  
- The PRD download already works (Markdown); add a "Copy as HTML" option

---

### Phase 3 — Intelligence & Differentiation (Q4 2026)

> Target: 8–12 weeks. Turns the platform from a reference tool into an AI advisor.

**Real-Time Platform Data**
- Replace the static in-memory `platformsData` with a scheduled data-sync job (cron or Replit scheduler) that fetches pricing and context window updates from vendor APIs / public pricing pages  
- Add a `lastUpdated` timestamp to each platform object; surface it in the UI as "Data current as of…"

**AI-Powered PRD Generation**
- Integrate the Anthropic Claude API (or OpenAI) as an **optional, configurable backend** for `POST /api/prd/generate`  
- Fall back to the current template-based generator when `ANTHROPIC_API_KEY` is not set  
- Add a character count and quality-score estimate before generation

**Smart Assessment Recommendations**
- After the 5-step Assessment wizard, generate a **ranked platform shortlist** with plain-language rationale based on the org's departments, compliance standards, integrations, and pain points  
- Compare selected platforms against the shortlist and highlight gaps

**Watchlist & Alerts**
- Allow authenticated users to "watch" up to 5 platforms  
- Send a weekly digest (email or Replit notification) when pricing, context window, or compliance status changes for a watched platform

**Comparison History**
- Store past comparison sessions for authenticated users in a `comparison_history` table  
- Surface a "Recent Comparisons" dropdown in the Comparison tab header

---

### Phase 4 — Scale & Enterprise Depth (2027)

> Target: Full fiscal year. Targets org-wide rollout and multi-tenant SaaS readiness.

**Multi-Tenant Architecture**
- Add an `organizations` table; associate users with an org via `organization_id`  
- Implement org-level admin roles: admins can manage which platforms are visible, set default comparison sets, and view aggregate assessment results

**SSO / SAML Integration**
- Add SAML 2.0 support alongside the existing Replit Auth (OAuth) for enterprise SSO (Okta, Azure AD, Google Workspace)  
- Implement `passport-saml` strategy

**Custom Platform Entries**
- Allow authenticated admins to add custom/internal AI platforms to their org's view (e.g., a self-hosted LLaMA deployment)  
- Custom platforms participate in all comparison, matrix, and ROI features

**Audit Logging**
- Log all API calls (user, endpoint, timestamp, inputs hash) to a `audit_log` table for SOC 2 compliance  
- Expose a read-only audit log view in a new admin panel

**Observability**
- Integrate structured logging (e.g., `pino`) to replace the current `console.log` approach  
- Emit metrics (response time, error rate, endpoint usage) to a monitoring service (Datadog, New Relic, or OpenTelemetry collector)  
- Add a `/api/health` endpoint with database connectivity check

**Accessibility Audit**
- Commission a formal WCAG 2.2 AA audit with automated (`axe-core`) + manual (NVDA/VoiceOver) testing  
- Address all findings before enterprise procurement sign-off

---

## Differentiators

What makes INT Platform Explorer meaningfully different from generic AI comparison tools (e.g., G2, Gartner Peer Insights, Futurepedia):

| Differentiator | Description |
|----------------|-------------|
| **Depth-first capability scoring** | 10 dimensions × 16 platforms with expert-curated scores, not user crowdsourcing — more consistent and auditable |
| **Integrated ROI calculator** | Not a marketing calculator; uses real workforce inputs (headcount, hourly rate, adoption %) and produces net benefit, payback period, and ROI% — ready for CFO presentations |
| **Role-based enterprise profiles** | Ready-to-paste system prompts, guardrails, and escalation protocols per job function — accelerates actual Claude deployment, not just evaluation |
| **Offline-capable PRD generator** | 13-section PRD generated in-process with zero external API calls — works air-gapped, no per-request cost |
| **5-step readiness wizard** | Structured intake (org, departments, compliance, integrations, pain points) produces personalized platform recommendations — closer to a consulting engagement than a filter widget |
| **3-tier deployment strategy** | Opinionated, research-backed sequencing (Foundation → Specialization → Advanced) with named platform recommendations per tier — gives procurement teams a defensible starting point |
| **INT Inc branding & customizability** | Built to be white-labeled per customer org; role profiles, baseline prompts, and compliance postures can all be swapped per tenant |

---

## Documentation Improvements

| Priority | Item | Recommendation |
|----------|------|---------------|
| High | `.env.example` | Create file at repo root with all required variables and descriptions |
| High | API reference | Move the API endpoint table from `README.md` to `docs/API.md` with request/response examples (curl + TypeScript fetch) |
| Medium | Architecture diagram | Add a `docs/ARCHITECTURE.md` with a Mermaid diagram showing the client → server → storage → DB data flow |
| Medium | Data model | Document the `Platform`, `ROIInputs`, `PRDDocument`, and `StrategyTier` types in `docs/DATA_MODEL.md` with field descriptions and valid ranges |
| Medium | Deployment guide | Add `docs/DEPLOYMENT.md` covering Replit deployment, environment variables, database provisioning, and session secret rotation |
| Medium | Contributing guide | Expand `CONTRIBUTING.md` with: how to add a new platform, how to run E2E tests locally, and the conventional commit types in use |
| Low | Accessibility statement | Add `docs/ACCESSIBILITY.md` documenting current WCAG coverage, known gaps, and testing methodology |
| Low | Changelog | Create `CHANGELOG.md` using Keep a Changelog format; retrospectively document v1.0–v4.0 milestones |

---

## Tech Debt Register

A consolidated list of technical debt items not covered by the phased roadmap above.

| ID | Area | Item | Effort |
|----|------|------|--------|
| T1 | Architecture | `server/storage.ts` is 600+ lines; split into `platforms.service.ts`, `roi.service.ts`, `prd.service.ts` | Small |
| T2 | Data | Platform data hardcoded in TypeScript; migrate to seed SQL or a JSON file loaded at startup | Small |
| T3 | Testing | No unit tests for ROI calculation edge cases (zero employees, 100% adoption, cost = 0) | Small |
| T4 | Testing | Playwright tests use `page.waitForTimeout()` (flaky); replace with `waitForSelector` or `waitForResponse` | Small |
| T5 | Frontend | `assessmentData.ts` ROI benchmarks duplicate server logic; unify (see F2) | Medium |
| T6 | Frontend | No `React.lazy()` / `Suspense` for tab content; all 8 tab components load on initial render | Medium |
| T7 | Frontend | `ThemeToggle` uses `next-themes` which is a Next.js-oriented library; consider a lighter alternative for a Vite/React project | Small |
| T8 | Security | Logout is a plain `<a href="/api/logout">` link; should be a form POST to prevent CSRF-based forced logout | Small |
| T9 | UX | Mobile navigation has 8 tabs in a single row; collapses to icon-only but tab bar overflows on small screens (< 375px) | Medium |
| T10 | Observability | All server errors are swallowed into generic 500 messages; structured error codes would improve client-side error UX | Medium |
