import {
  AggregatedPortfolio,
  MarketData,
  PortfolioRecommendation,
  SimulationResult,
  PortfolioAsset,
} from '@aegis/types';
import { calculateRiskReport } from './risk.js';
import { formatTokenBalance } from './portfolio.js';

/**
 * Simulates a portfolio reallocation swap shift based on target recommendation adjustments.
 * Ensures the target weights are scaled to sum to exactly 100% and computes projected yields/risks.
 */
export function simulatePortfolioShift(
  portfolio: AggregatedPortfolio,
  recommendation: PortfolioRecommendation,
  marketData: MarketData,
  assetYieldAPYMap: Record<string, number>,
): SimulationResult {
  // 1. Build a target allocation map from the recommendation adjustments
  const adjustmentMap: Record<string, number> = {};
  recommendation.adjustments.forEach((adj) => {
    adjustmentMap[adj.assetAddress.toLowerCase()] = adj.targetAllocationPercentage;
  });

  // Calculate sum of specified target allocations to check if they require scaling normalization
  let totalTargetSum = 0;
  portfolio.assets.forEach((asset) => {
    const target = adjustmentMap[asset.asset.address.toLowerCase()] ?? 0;
    totalTargetSum += target;
  });

  // 2. Projected allocations mapping
  const projectedTotalValueUSD = portfolio.totalValueUSD;
  let projectedYieldAPY = 0;

  const projectedAllocation: PortfolioAsset[] = portfolio.assets.map((currentAsset) => {
    const addrKey = currentAsset.asset.address.toLowerCase();
    const rawTarget = adjustmentMap[addrKey] ?? 0;

    // Normalize allocation weight to sum to exactly 100%
    const allocationPercentage = totalTargetSum > 0 ? (rawTarget / totalTargetSum) * 100 : 0;

    const valueUSD = (allocationPercentage / 100) * projectedTotalValueUSD;

    // Estimate projected raw bigint balance based on price feeds
    const priceUSD = currentAsset.priceUSD;
    const rawBalance =
      priceUSD > 0
        ? BigInt(Math.floor((valueUSD / priceUSD) * Math.pow(10, currentAsset.asset.decimals)))
        : 0n;

    // Calculate projected yield contribution
    const yieldAPY = assetYieldAPYMap[addrKey] ?? 0;
    projectedYieldAPY += (allocationPercentage / 100) * yieldAPY;

    return {
      asset: currentAsset.asset,
      rawBalance,
      formattedBalance: formatTokenBalance(rawBalance, currentAsset.asset.decimals),
      priceUSD,
      valueUSD,
      allocationPercentage,
    };
  });

  // 3. Estimate projected risk metrics using the calculated projected portfolio
  const projectedAggregated: AggregatedPortfolio = {
    assets: projectedAllocation,
    totalValueUSD: projectedTotalValueUSD,
    updatedAt: Date.now(),
  };

  const projectedRisk = calculateRiskReport(projectedAggregated, marketData);

  return {
    recommendationId: recommendation.id,
    projectedAllocation,
    projectedTotalValueUSD,
    projectedYieldAPY: Math.round(projectedYieldAPY * 100) / 100,
    projectedRisk,
    projectedHealthScore: projectedRisk.overallHealthScore,
  };
}

/**
 * Simulates multiple recommendation proposals concurrently.
 */
export function simulateMultipleShifts(
  portfolio: AggregatedPortfolio,
  recommendations: PortfolioRecommendation[],
  marketData: MarketData,
  assetYieldAPYMap: Record<string, number>,
): SimulationResult[] {
  return recommendations.map((rec) =>
    simulatePortfolioShift(portfolio, rec, marketData, assetYieldAPYMap),
  );
}
