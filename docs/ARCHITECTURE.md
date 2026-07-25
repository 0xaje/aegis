# Aegis System Architecture & Monorepo Layout

This document describes the codebase structure, monorepo configuration, and cryptographic data flow for the Aegis platform.

---

## Monorepo Layout

Aegis is organized as a pnpm monorepo using TypeScript Project References:

```
├── apps/
│   ├── web/                 # React Vite frontend application (Wagmi + Tailwind)
│   └── api/                 # Fastify backend service API gateway
│
├── packages/
│   ├── ui/                  # Reusable React component library (radix + framer-motion)
│   ├── sdk/                 # Core domain logic (FTSO client, risk engine, simulation)
│   ├── contracts/           # Hardhat compilation workspace for Solidity contracts
│   ├── types/               # Shared domain interfaces registry
│   └── config/              # Shared ESLint, Prettier, and tsconfig configurations
```

### Module Resolution & ESM Constraints

1. **Explicit ESM Extensions**: Under `"moduleResolution": "NodeNext"`, all relative import statements within TypeScript files must declare explicit `.js` extensions (e.g. `import { config } from './wagmi.js'`).
2. **Project References**: Workspaces compile independently and link compiled types via `tsconfig.json` paths, preventing duplicate symbol compilation.

---

## Cryptographic Data Flow

The diagram below maps the secure execution lifecycle for rebalancing swaps:

```
┌──────────────┐          ┌──────────────────────┐          ┌──────────────────────┐
│  Vite App    │  ECIES   │     TEE Enclave      │  Sign    │   Flare Blockchain   │
│  (Browser)   ├─────────►│  (AMD SEV-SNP/SGX)   ├─────────►│ (AegisPortfolioExec) │
│              │  Payload │                      │  Payload │                      │
└──────────────┘          └──────────┬───────────┘          └──────────┬───────────┘
                                     │                                 │
                                     ▼                                 ▼
                                 FTSOv2 Feeds                      Verify hash
                                 (Real-time price)                (Execute Swap)
```

1. **Local Parameter Sealing**: The browser seals target allocation variables using ECIES public keys before dispatching.
2. **TEE Compute Enclave Isolation**: The enclave decrypts variables in protected memory, queries FTSOv2 price feeds from Flare, computes target allocations, and signs a transaction payload containing the enclave's code hash.
3. **On-chain Attestation Verification**: The `AegisPortfolioExecutor` contract receives the payload, verifies the enclave's signature, checks the registry to confirm the code hash is audited, and dispatches on-chain swaps.
