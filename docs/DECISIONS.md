# Aegis Architecture Decisions Record (ADR Logs)

This log summarizes the design decisions made for the Aegis monorepo codebase.

---

## ADR 01: TypeScript Project References

- **Context**: Wires monorepo workspaces (`apps/web`, `apps/api`, `packages/sdk`, `packages/types`, `packages/ui`). Standard compilation without references causes compile speed lag and duplicate compiler declarations.
- **Decision**: Configured TypeScript references in root `tsconfig.json`. Each package defines a `tsconfig.json` extending base parameters, compiling to separate `dist/` builds.
- **Result**: Compilations speeds improved, compiler symbols are isolated, and package compilation warnings are resolved.

---

## ADR 02: Wagmi v2 & Viem Web3 Integration

- **Context**: Requires wallet integrations (MetaMask, Rabby, Coinbase Wallet, WalletConnect). Old configurations use legacy Web3.js providers or wagmi v0, which is incompatible with React 18/19 and modern ESM.
- **Decision**: Adopted **Wagmi v2** and **Viem** with TanStack React Query v5. Wagmi v2 manages persist connections, chain switches, and connector listings dynamically.
- **Result**: Secure auto-reconnect, dynamic injected Rabby support, and clean mock-free connection wrappers in `RouteLayout.tsx`.

---

## ADR 03: Explicit ESM File Extensions Suffixes

- **Context**: Monorepo packages specify `"type": "module"` and target `"moduleResolution": "NodeNext"`. Standard imports like `import { button } from './Button'` compile to invalid ESM statements under NodeNext.
- **Decision**: Enforced explicit `.js` suffixes in relative typescript source imports (e.g. `import { Button } from './Button.js'`).
- **Result**: Restores ESM package boundaries validation checks.

---

## ADR 04: Dynamic Flare Contract Registry Lookups

- **Context**: Avoid hardcoding contract addresses for FTSOv2 price feeds to ensure portability across Flare coston2 testnet, coston testnet, and mainnet.
- **Decision**: The SDK queries the Flare Contract Registry address `0xaD67f33e0255a7bf53c1516503c000f2B8E1857f` dynamically for name string `"FtsoV2"`. Addresses are cached permanently in memory.
- **Result**: Safe cross-chain migrations with no contract address re-hardcoding.
