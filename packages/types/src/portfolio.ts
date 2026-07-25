export interface Asset {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  balance: string; // BigNumber/BigInt serialized as string
  valueUSD: number;
  priceUSD: number;
}

export interface Portfolio {
  userId: string;
  address: string;
  assets: Asset[];
  totalValueUSD: number;
  updatedAt: string;
}

export interface InvestmentStrategy {
  id: string;
  name: string;
  riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH';
  allocation: Array<{
    symbol: string;
    percentage: number;
  }>;
  description: string;
}

export interface AIRecommendation {
  id: string;
  strategyId: string;
  rationale: string;
  simulatedReturn: number; // expected percentage return (e.g., 0.12 for 12%)
  confidenceScore: number; // 0.0 to 1.0
  verifiedByConfidentialCompute: boolean;
  signature?: string; // Enclave signature
  timestamp: string;
}
