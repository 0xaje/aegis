# 2. Workspace Monorepo Tooling

Date: 2026-07-25

## Status

Accepted

## Context

Aegis is divided into multiple components: web frontend applications, backend services, smart contracts, client SDKs, schemas, and configurations. We need a monorepo setup to link dependencies locally, execute commands in parallel, and maintain strict type checks.

## Decision

We adopt the following workspace orchestration choices:

1. **pnpm Workspaces**: Links local package links (`@aegis/types`, `@aegis/sdk`, `@aegis/ui`) using node_modules symlinks. Provides fast, cached downloads and prevents phantom dependencies.
2. **TypeScript Project References**: Uses `composite: true` options to compile packages incrementally while enforcing exact workspace dependencies.
3. **ESLint Flat Config + Prettier**: Standardizes rule setups globally under a single unified ESLint file in the workspace root.
4. **Husky and lint-staged**: Runs pre-commit checks to block dirty code commits.

## Consequences

- **Benefits**:
  - Symlinked local dependencies speed up development cycle.
  - Consistent formatting is checked prior to git push events.
  - Strict type checking ensures API changes are checked globally.
- **Tradeoffs**:
  - Requires clean declaration references (`import ... from "./foo.js"`).
  - Incremental builds generate `.tsbuildinfo` build state files.
