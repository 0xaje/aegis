# Aegis Client SDK API Reference Guide

This document catalogs the functions, class methods, and interfaces exposed by `@aegis/sdk`.

---

## 1. Flare FTSOv2 price feeds API (`FlareFtsoClient`)

Queries decentralised price feeds directly on-chain from the Coston2 registry:

### Constructor

```typescript
constructor(rpcUrl?: string, cacheTTLMs?: number)
```

- `rpcUrl`: flare coston2 RPC url (defaults to coston2 endpoint).
- `cacheTTLMs`: price cache TTL limits (defaults to 30000ms / 30 seconds).

### Methods

- **`getFtsoV2Address(): Promise<string>`**: Queries the registry address `0xaD67f33e0255a7bf53c1516503c000f2B8E1857f` dynamically for the FTSOv2 name `"FtsoV2"`.
- **`getPrice(symbol: string): Promise<FTSOPrice>`**: Fetches pricing feeds value for `BTC`, `ETH`, `FLR`, or `FXRP`. Gracefully falls back to expired caches or default metrics on error.
- **`getPrices(symbols: string[]): Promise<Record<string, FTSOPrice>>`**: Queries multiple feeds concurrently.

---

## 2. Portfolio Aggregator APIs

Calculates valuations, normalizes raw bigints, and computes weights:

- **`formatTokenBalance(balance: bigint, decimals: number): string`**:
  Converts raw bigint values into readable decimal layouts using native string slicing to prevent float precision loss.
- **`aggregatePortfolio(balances: TokenBalance[], priceUSDMap: Record<string, number>): AggregatedPortfolio`**:
  Calculates asset valuations, total portfolio value, and allocation percentages weights.

---

## 3. Risk Engine APIs

Computes portfolio diversification, liquidity, concentration, and volatility:

- **`calculateRiskReport(portfolio: AggregatedPortfolio, marketData: MarketData): RiskReport`**:
  Estimates sub-scores using Herfindahl-Hirschman (HHI) index, weighted daily volatility standard deviations, and asset liquidity coefficients.

---

## 4. Portfolio Simulation APIs

Simulates rebalances and estimates outcomes before executing:

- **`simulatePortfolioShift(portfolio: AggregatedPortfolio, recommendation: PortfolioRecommendation, marketData: MarketData, assetYieldAPYMap: Record<string, number>): SimulationResult`**:
  Computes projected weights normalized to sum to exactly 100%, projected APY yields, and runs the result through `calculateRiskReport`.
- **`simulateMultipleShifts(...)`**: Simulates multiple recommendations concurrently.
