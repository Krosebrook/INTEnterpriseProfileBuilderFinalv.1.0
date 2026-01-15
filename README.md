# INT Platform Explorer v4.0

Enterprise decision-support tool for comparing AI platforms. Evaluate 16 AI platforms across 25 capability dimensions, calculate ROI, and generate tiered recommendations for stakeholder presentations.

## Features

- **Explorer Tab**: Browse and filter 16 AI platforms with detailed capability scores
- **Comparison Tab**: Side-by-side analysis of up to 4 platforms
- **Matrix Tab**: Capability grid visualization across all dimensions
- **ROI Calculator**: Business case tool with productivity and cost analysis
- **Strategy Tab**: 3-tier platform recommendations
- **Assessment Tab**: 5-step AI readiness wizard
- **Profile Builder**: Claude enterprise configuration guide

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query
- **Authentication**: Replit Auth (OAuth with Google, GitHub, email)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (automatically provided on Replit)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SESSION_SECRET`: Session encryption key

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API client
│   │   └── pages/          # Page components
├── server/                 # Express backend
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Data storage layer
│   └── db.ts               # Database connection
├── shared/                 # Shared types and schemas
│   ├── schema.ts           # TypeScript interfaces
│   └── validation.ts       # Zod validation schemas
└── docs/                   # Documentation
```

## API Endpoints

### Platforms
- `GET /api/platforms` - List all platforms
- `GET /api/platforms/:id` - Get platform by ID
- `POST /api/platforms/compare` - Compare multiple platforms

### Strategy
- `GET /api/strategy` - Get strategy tier recommendations

### ROI Calculator
- `POST /api/roi/calculate` - Calculate ROI metrics

### Authentication
- `GET /api/login` - Initiate OAuth login
- `GET /api/logout` - Log out user
- `GET /api/auth/user` - Get current user

## Security Features

- **Input Validation**: Zod schemas for all POST endpoints
- **Rate Limiting**: API request throttling (100 req/15min, 20 req/min for ROI)
- **Security Headers**: Helmet middleware for CSP, XSS protection
- **Session Security**: HTTP-only cookies, secure transport

## Accessibility

- WCAG 2.2 compliant design patterns
- Keyboard navigation support
- Skip-to-content link
- ARIA labels and semantic HTML
- Error boundaries for graceful failure handling

## Performance

- Lazy loading for tab content
- In-memory caching for platform data
- TanStack Query for efficient data fetching
- Vite for fast development and optimized builds

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

© 2026 INT Inc. All rights reserved.
