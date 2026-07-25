# Aegis: Confidential Financial Intelligence on Flare

Aegis is a secure, institutional-grade portfolio rebalancing and risk estimation platform built on the **Flare Network**. By combining hardware-isolated compute enclaves (TEEs) with decentralized price feeds (FTSOv2), Aegis ensures user portfolios are evaluated and rebalanced with absolute privacy and tamper-proof accuracy.

---

## ✦ The Problem

In standard DeFi:

- **Exposure Leakage**: Submitting rebalance triggers publicizes target asset adjustments, exposing transactions to bot front-running.
- **Oracle Vulnerability**: Standard tracking platforms query pricing from centralized APIs, exposing liquidations to gateway manipulation.
- **Execution Verification Gaps**: Automated swaps cannot guarantee that the underlying asset logic aligns with audited code.

## ✦ The Solution (Flare Confidential Compute)

Aegis implements a secure cryptographic workflow utilizing:

1. **AMD SEV-SNP/Intel SGX TEEs**: Client browser payloads are encrypted (using ECIES) and decrypted only inside isolated hardware enclaves. Node operators cannot inspect variables.
2. **Decentralized price feeds (FTSOv2)**: The enclave queries pricing data directly on-chain from Flare FTSOv2 providers to estimate risk indices without trusting off-chain APIs.
3. **On-Chain Attestation registries**: Strategist recommendations are registered via `StrategyRegistry.sol` and validated by `ExecutionManager.sol` only when accompanied by signed hardware attestation certificates.

---

## ✦ System Architecture & Data Flow

```
┌──────────────┐          ┌──────────────────────┐          ┌──────────────────────┐
│  Vite App    │  ECIES   │     TEE Enclave      │  Sign    │   Flare Blockchain   │
│  (Browser)   ├─────────►│  (AMD SEV-SNP/SGX)   ├─────────►│ (StrategyRegistry)   │
│              │  Payload │                      │  Payload │ (ExecutionManager)   │
└──────────────┘          └──────────┬───────────┘          └──────────────────────┘
                                     │
                                     ▼
                                 FTSOv2 Feeds
                                 (Real-time price)
```

1. **Parameters Sealing**: The browser seals reallocation targets before sending.
2. **TEE Compute**: The enclave decrypts variables, reads FTSOv2 oracle feeds, audits weights, and yields attestation signatures.
3. **On-Chain Log**: Smart contracts verify the enclave signature and code hash before recording the strategy.

---

## ✦ Monorepo Layout

```
├── apps/
│   ├── web/                   # Vite React + TypeScript Frontend (Wagmi + Tailwind CSS)
│   └── api/                   # Fastify Backend TEE gateway API
│
├── packages/
│   ├── ui/                    # Reusable atomic and composite UI design components
│   ├── sdk/                   # Core calculator SDK (FTSO client, risk model, simulator)
│   ├── contracts/             # Solidity smart contracts compiled via Hardhat
│   ├── config/                # Shared ESLint config configurations
│   └── types/                 # Shared domain types and interfaces registry
```

---

## ✦ Tech Stack

- **Web**: React, TypeScript (Strict), Tailwind CSS, Framer Motion, Wagmi v2, Viem.
- **Smart Contracts**: Solidity (0.8.20), Hardhat, Ethers v6, TypeChain.
- **Processors**: AMD SEV-SNP, Intel SGX (TEE).
- **Tooling**: pnpm workspaces, ESLint, Prettier, Husky.

---

## ✦ Getting Started

### 1. Installation

Install all monorepo dependencies with a single root command:

```bash
pnpm install
```

### 2. Smart Contract compilation

Compile smart contracts and generate updated TypeScript TypeChain bindings:

```bash
pnpm --filter @aegis/contracts compile
```

### 3. Compile TypeScript reference targets

Build package workspaces using TypeScript project references:

```bash
pnpm build
```

### 4. Run Development Servers

Launch local dev environments (Frontend at `http://localhost:3000`):

```bash
pnpm dev
```

---

## ✦ Platform Features & Highlights

- **Dynamic Demo Mode**: Bypass wallet setups instantly to inspect reports and triggers under RPC congestion.
- **AI Decision Passport**: Verifiable hardware audit passport certifying execution integrity.
- **Evidence Panel**: Detailed scoring parameters transparently detailing rebalancing reasons.
