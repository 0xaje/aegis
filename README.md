# Aegis

Aegis is a Confidential Financial Intelligence Platform built on the Flare Network.

This repository houses the core infrastructure workspace utilizing a `pnpm` monorepo design, strict TypeScript standards, ESLint Flat Config, and Prettier formatting rules.

## Workspace Architecture

```
├── apps/
│   ├── web/                   # Vite React + TypeScript Frontend
│   └── api/                   # Fastify Backend API
├── packages/
│   ├── ui/                    # Reusable atomic UI design system components
│   ├── sdk/                   # Verifiable API, FTSO, and TEE client SDK
│   ├── contracts/             # Solidity smart contracts (Hardhat + OpenZeppelin)
│   ├── config/                # Shared TSConfigs, Linting, and tooling settings
│   └── types/                 # Shared domain model structures and interfaces
├── docs/
│   └── adr/                   # Architecture Decision Records (ADRs)
├── scripts/                   # Utility automation scripts
├── infra/                     # Orchestration and container files (Docker)
└── .github/                   # CI/CD Workflows (GitHub Actions)
```

## Getting Started

### Prerequisites

- Node.js >= 23.2.0
- pnpm >= 10.5.2
- Docker >= 29.4.3

### Installation

Install all package dependencies with a single command from the repository root:

```bash
pnpm install
```

### Build Workspace

Compile all workspaces using TypeScript Project References:

```bash
pnpm build
```

### Lint and Format Validation

Verify lint checks and code styling:

```bash
pnpm lint
```

### Local Services (Docker)

Start the local Postgres database and Hardhat mock node services:

```bash
docker compose up -d
```

## Developer Guidelines

- **Code Styling**: Enforced by Prettier and ESLint. Formatting runs automatically on file saves as defined in `.vscode/settings.json`.
- **Git Commits**: Husky triggers `lint-staged` on pre-commit, ensuring only lint-clean and format-compliant code can be committed.
- **Architecture Logs**: Check the `docs/adr/` folder for architectural justifications and tooling choices.
