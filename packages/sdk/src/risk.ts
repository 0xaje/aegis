import { AggregatedPortfolio, MarketData, RiskReport } from '@aegis/types';

/**
 * Calculates risk report metrics deterministically using mathematical HHI indexes,
 * weighted standard dev calculations, and liquidity factors mappings.
 */
export function calculateRiskReport(
  portfolio: AggregatedPortfolio,
  marketData: MarketData,
): RiskReport {
  const assetCount = portfolio.assets.length;

  // Handle empty portfolios gracefully by returning zeroed scores
  if (assetCount === 0) {
    return {
      diversificationScore: 0,
      liquidityScore: 0,
      volatilityScore: 0,
      concentrationScore: 0,
      overallHealthScore: 0,
      updatedAt: Date.now(),
    };
  }

  // 1. Calculate Concentration Score using Herfindahl-Hirschman Index (HHI)
  // Formula: HHI = Sum(s_i ^ 2) where s_i represents individual asset allocation percentages (0 - 100).
  // HHI ranges from 0 to 10,000. 10,000 indicates absolute concentration (100% in one asset).
  // Concentration Score is normalized: 100 - (HHI / 100). Higher is better (lower concentration risk).
  let hhi = 0;
  portfolio.assets.forEach((asset) => {
    hhi += Math.pow(asset.allocationPercentage, 2);
  });
  const concentrationScore = Math.max(0, Math.min(100, 100 - hhi / 100));

  // 2. Calculate Diversification Score
  // Formula: Takes asset count factor and balances it with concentration score.
  // Count factor scales up to 4 assets (25% weight per asset up to 100%).
  // Diversification Score = (CountFactor + ConcentrationScore) / 2.
  const countFactor = Math.min(100, assetCount * 25);
  const diversificationScore = (countFactor + concentrationScore) / 2;

  // 3. Calculate Liquidity Score
  // Formula: Weighted average of individual asset liquidity coefficients.
  // Liquidity Score = Sum(allocationPercentage * liquidityCoefficient) where coefficient is between 0.0 and 1.0.
  // Missing coefficients default to 0.5 (medium liquidity).
  let weightedLiquidity = 0;
  portfolio.assets.forEach((asset) => {
    const marketAsset = marketData.assets[asset.asset.address.toLowerCase()];
    const coefficient = marketAsset ? marketAsset.liquidityCoefficient : 0.5;
    weightedLiquidity += asset.allocationPercentage * coefficient;
  });
  const liquidityScore = Math.max(0, Math.min(100, weightedLiquidity));

  // 4. Calculate Volatility Score
  // Formula: Weighted average of asset daily price volatility standard deviations.
  // Weighted Volatility = Sum(allocationPercentage / 100 * dailyVolatility).
  // Normalization: Volatility Score = Math.max(0, 100 - (WeightedVolatility * 1000)).
  // Higher volatility values scale down the score, indicating higher volatility risk.
  // Missing volatilities default to 0.04 (4% daily standard deviation variance).
  let weightedVolatility = 0;
  portfolio.assets.forEach((asset) => {
    const marketAsset = marketData.assets[asset.asset.address.toLowerCase()];
    const dailyVolatility = marketAsset ? marketAsset.dailyVolatility : 0.04;
    weightedVolatility += (asset.allocationPercentage / 100) * dailyVolatility;
  });
  const volatilityScore = Math.max(0, Math.min(100, 100 - weightedVolatility * 1000));

  // 5. Calculate Overall Financial Health Score
  // Formula: Weighted sum of all 4 deterministic sub-scores:
  // - Diversification: 30%
  // - Liquidity: 20%
  // - Volatility: 30%
  // - Concentration: 20%
  const overallHealthScore =
    0.3 * diversificationScore +
    0.2 * liquidityScore +
    0.3 * volatilityScore +
    0.2 * concentrationScore;

  return {
    diversificationScore: Math.round(diversificationScore * 100) / 100,
    liquidityScore: Math.round(liquidityScore * 100) / 100,
    volatilityScore: Math.round(volatilityScore * 100) / 100,
    concentrationScore: Math.round(concentrationScore * 100) / 100,
    overallHealthScore: Math.round(overallHealthScore * 100) / 100,
    updatedAt: Date.now(),
  };
}
