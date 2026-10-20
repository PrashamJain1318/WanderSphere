# WanderSphere — Phase 0: Project Foundation

> **Product Positioning:**  
> _"Discover the world. Share your journey. Plan every detail."_

WanderSphere is a production-oriented worldwide travel community and itinerary planner launching in India first. This repository hosts the Phase 0 foundational monorepo, providing a robust, extensible architecture built with modern TypeScript tooling, Next.js (App Router), Express, Mongoose, and isolated domain packages.

---

## 1. Monorepo Architecture

WanderSphere is organized as a **pnpm workspace** monorepo:

| Directory                                            | Type                    | Purpose                                                                                                                         |
| :--------------------------------------------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| [`apps/web`](./apps/web)                             | Next.js 15 (App Router) | Premium responsive travel editorial application, public landing page, and workspace shells (`/traveler`, `/planner`, `/admin`). |
| [`apps/api`](./apps/api)                             | Express + Node.js       | Microservice API providing request IDs, structured logging, centralized errors, and liveness/readiness health probes.           |
| [`packages/contracts`](./packages/contracts)         | Shared TypeScript / Zod | Shared API schemas, contract definitions, error payloads, and travel entity interfaces.                                         |
| [`packages/budget-engine`](./packages/budget-engine) | Shared TypeScript       | Reserved pure deterministic engine for multi-currency travel budget calculations with zero floating-point ambiguities.          |
| [`packages/config`](./packages/config)               | Shared Config           | Centralized strict TypeScript configurations, ESLint base configs, and shared build settings.                                   |
| [`docs`](./docs)                                     | Documentation           | Architectural design, API contracts, security standards, and data source configurations.                                        |
| [`.github/workflows`](./.github/workflows)           | CI / CD                 | GitHub Actions automated pipeline enforcing formatting, linting, type safety, test suites, and production builds.               |

---

## 2. Prerequisites

Ensure you have the following installed locally:

- **Node.js**: `v20.0.0` or higher (verified with `v22.23.2`)
- **pnpm**: `v9.0.0` or higher (verified with `v11.24.0`)
- **Git**: `2.30.0` or higher
- _(Optional)_ **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

---

## 3. Quickstart & Local Development

### Step 1: Clone and install dependencies

```bash
git clone <repo-url>
cd WanderSphere
pnpm install
```

### Step 2: Configure environment variables

Copy the template `.env.example` to `.env`:

```bash
cp .env.example .env
```

_Note: In Phase 0, MongoDB is **optional** (`MONGODB_REQUIRED=false`). The API starts cleanly and verifies non-database routes and health checks even if no MongoDB instance is running._

### Step 3: Run development servers

To run both the Next.js frontend and Express API concurrently:

```bash
pnpm dev
```

Alternatively, run apps individually:

```bash
# Start backend API (port 4000)
pnpm dev:api

# Start frontend Web App (port 3000)
pnpm dev:web
```

- **Frontend URL:** [http://localhost:3000](http://localhost:3000)
- **API Health Endpoint:** [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

---

## 4. Workspaces & Available Scripts

The root `package.json` coordinates all monorepo tasks:

```bash
# Type check all packages and applications with strict TypeScript
pnpm typecheck

# Lint all code using ESLint
pnpm lint

# Check code formatting with Prettier
pnpm format:check

# Auto-format all code
pnpm format

# Run automated unit and integration test suites (Vitest & Supertest)
pnpm test

# Build production bundles for all packages and applications
pnpm build
```

---

## 5. Phase 0 Boundaries & Constraints

To maintain a clean foundation, Phase 0 adheres strictly to the following boundaries:

1. **Three.js Planetary Globe:** Three.js bundles are intentionally deferred to Phase 1. A dedicated `<GlobeBoundary />` component isolates the layout and dimensions with an accessible editorial placeholder.
2. **Workspace Shells:** `/traveler`, `/planner`, and `/admin` routes are established as structural shells with clear Phase 0 indicators; they do not pretend features are implemented.
3. **Database Independence:** If MongoDB credentials are not provided, the API runs safely in database-independent mode, and the `/api/v1/health` endpoint transparently reports `database: not_configured` without pretending to be connected.
4. **Zero-Mock Policy:** No fake API endpoints pretend to provide live external flight/hotel data.

---

## 6. Documentation Reference

- **[Architecture & Topology Guide](./docs/architecture.md)**
- **[API Specifications & Health Contract](./docs/api.md)**
- **[Security Architecture & Threat Model](./docs/security.md)**
- **[Data Sources & MongoDB Setup](./docs/data-sources.md)**
