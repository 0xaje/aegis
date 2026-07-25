# Aegis: Product Overview & Feature Specifications

Aegis is a secure, institutional-grade portfolio rebalancing and risk estimation client built on the **Flare Network**. The platform provides a secure environment for calculating volatility standard deviations, estimating asset weights, and automating swap rebalances.

---

## The Core Problem

In traditional DeFi:

1. **Asset Exposure Leakage**: Managing weights reveals adjustments strategies to miners and front-running bots before execution.
2. **Oracle Centralization**: Standard portfolio valuation relies on centralized off-chain API gateways, introducing oracle manipulation vulnerabilities.
3. **Execution Verification Gaps**: Automated on-chain swaps cannot verify if execution logic matches audited parameters.

---

## Core Product Pillars

To resolve these issues, Aegis integrates three technological pillars:

```
┌─────────────────────────────────────────────────────────┐
│                    Aegis Platform                       │
├───────────────────┬───────────────────┬─────────────────┤
│   Confidential    │   Decentralized   │   Verifiable    │
│    Computation    │    Data Feeds     │   Attestations  │
│   (AMD SEV-TEEs)  │    (FTSOv2)       │   (SNP Proofs)  │
└───────────────────┴───────────────────┴─────────────────┘
```

1. **Confidential Computation (TEEs)**: Sensitive asset balances are sealed locally in the browser memory using ECIES, and calculations run within hardware-isolated memory enclaves (TEEs). Host node operators cannot read calculations.
2. **Decentralized Data Feeds (FTSOv2)**: Aegis uses the Flare Time Series Oracle (FTSOv2) directly on-chain to verify real-time price feeds, securing collateral limits against manipulation.
3. **Verifiable Attestations (SNP Passports)**: Enclaves generate signed hardware certificates containing the audited code hash, which coston2 smart contract registries verify before swapping.

---

## User Personas & Workflows

1. **Private Fund Managers**: Build target allocations and run deterministic risk models privately before dispatching execution payloads.
2. **DeFi Yield Delegators**: Securely delegate WFLR wrapper configurations to active FTSO providers based on enclave pricing calculations.
3. **System Nodes Validators**: Execute verified portfolio triggers only when accompanied by signed hardware enclave attestation proofs.
