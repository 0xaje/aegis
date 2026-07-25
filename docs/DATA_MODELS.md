# Aegis Domain Data Models Registry

This document lists the TypeScript interfaces and models shared across `@aegis/types` and `@aegis/sdk`.

---

## 1. Asset & Portfolio Types

### `Asset`

Represents an ERC-20 token descriptor:

```typescript
export interface Asset {
  address: string; // Checksummed smart contract address
  symbol: string; // Token symbol (e.g. WFLR)
  name: string; // Human-readable asset name
  decimals: number; // Token decimals (e.g. 18)
}
```

### `TokenBalance`

Represents raw balance values retrieved from blockchain queries:

```typescript
export interface TokenBalance {
  asset: Asset;
  balance: bigint; // Raw bigint balance value
}
```

### `PortfolioAsset`

Represents normalized valuations and weight distributions for a token:

```typescript
export interface PortfolioAsset {
  asset: Asset;
  rawBalance: bigint;
  formattedBalance: string; // Normalized string value (e.g. "2500")
  priceUSD: number; // Real-time FTSO oracle price USD
  valueUSD: number; // Computed value: formattedBalance * priceUSD
  allocationPercentage: number; // Allocation weight: (valueUSD / totalValueUSD) * 100
}
```

### `AggregatedPortfolio`

Consolidated portfolio evaluation details:

```typescript
export interface AggregatedPortfolio {
  assets: PortfolioAsset[];
  totalValueUSD: number;
  updatedAt: number; // Timestamp in milliseconds
}
```

---

## 2. Risk Engine Types

### `MarketAssetData`

Market parameters required for risk calculations:

```typescript
export interface MarketAssetData {
  address: string;
  dailyVolatility: number; // standard deviation of returns (e.g. 0.03 for BTC)
  liquidityCoefficient: number; // liquidity coefficient between 0.0 and 1.0 (USDT = 1.0)
}
```

### `RiskReport`

Calculated portfolio risk scores:

```typescript
export interface RiskReport {
  diversificationScore: number; // 0-100 (weighted counts and concentration HHI)
  liquidityScore: number; // 0-100 (weighted liquidity coefficients)
  volatilityScore: number; // 0-100 (normalized daily volatilities)
  concentrationScore: number; // 0-100 (HHI index concentration risk score)
  overallHealthScore: number; // 0-100 (weighted sum of sub-scores)
  updatedAt: number;
}
```

---

## 3. Simulation Types

### `TargetAllocationAdjustment`

Simulated target allocations:

```typescript
export interface TargetAllocationAdjustment {
  assetAddress: string;
  targetAllocationPercentage: number;
}
```

### `SimulationResult`

Output of portfolio reallocations simulations:

```typescript
export interface SimulationResult {
  recommendationId: string;
  projectedAllocation: PortfolioAsset[];
  projectedTotalValueUSD: number;
  projectedYieldAPY: number; // Estimated APY returns percentage (0 - 100)
  projectedRisk: RiskReport; // Projected risk scores
  projectedHealthScore: number; // Combined health score
}
```
