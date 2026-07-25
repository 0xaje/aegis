/**
 * Aegis Shared Types
 */

export interface SystemConfig {
  env: 'development' | 'production' | 'test';
  version: string;
  debug: boolean;
}

export interface Asset {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

export interface TokenBalance {
  asset: Asset;
  balance: bigint;
}

export interface PortfolioAsset {
  asset: Asset;
  rawBalance: bigint;
  formattedBalance: string;
  priceUSD: number;
  valueUSD: number;
  allocationPercentage: number;
}

export interface AggregatedPortfolio {
  assets: PortfolioAsset[];
  totalValueUSD: number;
  updatedAt: number;
}
