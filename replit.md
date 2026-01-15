# INT Platform Explorer v4.0

## Overview

INT Platform Explorer is an enterprise decision-support tool for comparing AI platforms. It enables organizations to evaluate 16 AI platforms across 25 capability dimensions, calculate ROI, and generate tiered recommendations for stakeholder presentations.

The application is built as a React single-page application with an Express backend, using a tabbed interface with seven main sections: Explorer (browse/filter platforms), Comparison (side-by-side evaluation), Matrix (capability grid), ROI Calculator, Strategy (tiered recommendations), Assessment (AI readiness wizard), and Profile Builder (Claude configuration guide).

## Recent Changes (January 15, 2026)

**Security Enhancements:**
- Added Helmet middleware with CSP configuration (environment-aware for dev HMR)
- Implemented rate limiting (100 req/15min general, 20 req/min for ROI)
- Added comprehensive Zod validation for all POST endpoints

**Error Handling:**
- Added ErrorBoundary and TabErrorBoundary components for graceful failure handling
- Each tab content wrapped with error boundaries for isolation

**Accessibility:**
- Added SkipLink component for keyboard navigation
- Main content has proper id and tabIndex for focus management

**PWA Support:**
- Added manifest.json with app metadata and icons
- Implemented service worker with offline caching strategy
- Added meta tags for mobile web app support

**Documentation:**
- Created comprehensive README.md with setup instructions
- Added CONTRIBUTING.md with development guidelines
- Updated AUDIT_REPORT.md with resolved issues

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**Frontend Architecture:**
- React 18 with TypeScript
- Vite for development and bundling
- Tailwind CSS with CSS custom properties for theming (light/dark mode)
- shadcn/ui component library (Radix UI primitives)
- TanStack Query for server state management
- Client-side routing via tab-based navigation (no react-router)

**Backend Architecture:**
- Express.js server with TypeScript
- In-memory data storage (platform data defined in `server/storage.ts`)
- RESTful API endpoints under `/api/` prefix
- Static file serving for production builds

**Data Layer:**
- Drizzle ORM configured for PostgreSQL (schema in `shared/schema.ts`)
- Currently uses in-memory storage for platform data
- Database connection expects `DATABASE_URL` environment variable
- Shared TypeScript types between client and server via `@shared/` alias

**Key Design Decisions:**
1. **Static platform data** - Platform information is hardcoded rather than database-driven, optimizing for read performance and simplifying deployment
2. **Shared schema** - TypeScript interfaces defined in `shared/schema.ts` ensure type safety across the full stack
3. **Component-driven UI** - Extensive use of shadcn/ui components with custom theming via CSS variables
4. **Monorepo structure** - Client (`client/`), server (`server/`), and shared code (`shared/`) in single repository with path aliases

**Build System:**
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Database migrations via `drizzle-kit push`

## External Dependencies

**Database:**
- PostgreSQL (via `DATABASE_URL` environment variable)
- Drizzle ORM with `drizzle-kit` for schema management
- `connect-pg-simple` for session storage

**UI Libraries:**
- Radix UI primitives (dialogs, tooltips, tabs, sliders, etc.)
- Lucide React for icons
- Embla Carousel for carousel components
- Recharts for data visualization

**Fonts:**
- Inter (primary UI font)
- JetBrains Mono (monospace for metrics/code)
- DM Sans, Fira Code, Geist Mono (additional typography options)

**Development Tools:**
- TypeScript with strict mode
- Replit-specific Vite plugins for error overlay and dev banner