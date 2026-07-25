export interface FtsoPriceFeed {
  symbol: string;
  price: string; // BigInt price value serialized as string
  decimals: number;
  timestamp: number;
}

export interface ConfidentialComputeRequest {
  id: string;
  enclaveId: string;
  codeHash: string;
  encryptedInputs: string; // Base64 or Hex encoded encrypted payload
  portfolioData: string;
  timestamp: string;
}

export interface ConfidentialComputeResponse {
  requestId: string;
  verified: boolean;
  decryptedOutputs: {
    recommendedStrategyId: string;
    riskMetrics: {
      sharpeRatio: number;
      maxDrawdown: number;
      volatility: number;
    };
    decisionsExplanation: string;
  };
  attestationReport: string; // Hex/PEM attestation report proof
  signature: string;
}
