# Aegis Development Roadmap & Milestones

This log tracks milestones from the project foundation to simulated portfolio rebalances.

---

## Completed Milestones

### 1. Monorepo Foundation & Scaffolding (Milestone 1)

- Established pnpm monorepo structure with strict tsconfig Project References.
- Wired ESLint and Prettier rules.
- Configured Hardhat smart contracts compile pipelines.

### 2. Premium Design System (Milestone 2)

- Built dark-first component libraries inside `packages/ui` (Button, Card, Dialog, Drawer, Dropdown, Skeleton, Table, Tabs).
- Implemented composite Fintech widgets (MetricCard sparklines, HealthScore collateral bars, DecisionPassport enclave hashes).
- Configured CSF 3.0 Storybook preview stories.

### 3. Routing & App Shell (Milestone 3)

- Wired lazy-loaded routes (Landing, Dashboard, Intelligence, Simulation, Execution, History, Settings).
- Designed route layouts with collapsible sidebars, top headers, notification bell lists, and keyboard shortcut event handlers (`Cmd+K` palette).

### 4. Web3 Wallet Integration (Milestone 4)

- Hooked main pages to Wagmi v2 and QueryClient providers.
- Configured network switches for wrong chain alerts on Coston2 Testnet (id `114`).

### 5. FTSOv2 & Aggregation Engines (Milestone 5)

- Integrated Flare Contract Registry to dynamically resolve FTSOv2 pricing addresses.
- Implemented portfolio aggregator to convert raw bigints and calculate allocations.
- Built deterministic risk engines evaluating diversification, liquidity, volatility, and concentration.
- Coded portfolio simulation models with target weight scaling and yield projections.

---

## Future Milestones

### 6. TEE Multi-signature Enclave Attestations (Milestone 6)

- Wire AMD SEV-SNP cryptographic signature validators directly in node backend routers.
- Verify enclave image hashes against Coston2 smart contract records before signing swap parameters.

### 7. Automated Swap execution triggers (Milestone 7)

- Deploy `AegisPortfolioExecutor` contract swaps to Flare coston2 testnets.
- Integrate Flare Data Connector to query external web data inputs.
