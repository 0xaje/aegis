# Hackathon Refactoring & Codebase Cleanup Report

This log documents the code modifications performed to remove hacky files, consolidate dependencies, and restore type safety standards inside Aegis.

---

## Clean Code Restorations

1. **Monorepo Separation of Concerns**:
   - Split inline scripts and components into distinct packages: `packages/ui` (React components), `packages/sdk` (Core calculations), and `packages/types` (Shared domain interfaces).
2. **TypeScript reference checking**:
   - Replaced duplicate compiler configs with strict extending tsconfig references, enabling independent builds under `tsc -b`.
3. **Removed Hardcoded Mock endpoints**:
   - Cleared custom off-chain routing configurations and mockup addresses from contracts.
   - Refactored price feeds queries to dynamically resolve target contract addresses from the official Flare Contract Registry.
4. **Decoupled Wallet Connections**:
   - Replaced local mock connection variables with Wagmi v2 hooks (`useAccount`, `useConnect`), matching modern dApp patterns.
5. **No Style duplication**:
   - Merged custom style variables into global css variables, referencing centralized styles in `packages/ui` and removing inline CSS overrides.
