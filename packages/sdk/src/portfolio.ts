import { TokenBalance, AggregatedPortfolio, PortfolioAsset } from '@aegis/types';

/**
 * Formats a raw bigint token balance into a decimal string matching the asset decimals precision.
 * Uses native string slicing to prevent precision loss associated with float conversions.
 */
export function formatTokenBalance(balance: bigint, decimals: number): string {
  if (balance === 0n) return '0';
  const isNegative = balance < 0n;
  const absoluteBalance = isNegative ? -balance : balance;
  const balanceString = absoluteBalance.toString().padStart(decimals + 1, '0');
  const integerPart = balanceString.slice(0, -decimals) || '0';
  const fractionalPart = balanceString.slice(-decimals).replace(/0+$/, '');

  const result = fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
  return isNegative ? `-${result}` : result;
}

/**
 * Valuates raw token balances against an oracle price map to compute total portfolio USD value
 * and dynamic weight distributions.
 */
export function aggregatePortfolio(
  balances: TokenBalance[],
  priceUSDMap: Record<string, number>,
): AggregatedPortfolio {
  let totalValueUSD = 0;

  // 1. First pass: compute asset valuations
  const assetsValued = balances.map((item) => {
    // Address lookup is case-insensitive
    const priceUSD = priceUSDMap[item.asset.address.toLowerCase()] ?? 0;

    // Normalize balance to number for USD estimation
    const balanceNormalized = Number(item.balance) / Math.pow(10, item.asset.decimals);
    const valueUSD = balanceNormalized * priceUSD;
    totalValueUSD += valueUSD;

    return {
      asset: item.asset,
      rawBalance: item.balance,
      formattedBalance: formatTokenBalance(item.balance, item.asset.decimals),
      priceUSD,
      valueUSD,
      allocationPercentage: 0, // Computed in the next pass
    };
  });

  // 2. Second pass: compute allocation weights
  const assetsAggregated: PortfolioAsset[] = assetsValued.map((asset) => {
    const allocationPercentage = totalValueUSD > 0 ? (asset.valueUSD / totalValueUSD) * 100 : 0;

    return {
      ...asset,
      allocationPercentage,
    };
  });

  return {
    assets: assetsAggregated,
    totalValueUSD,
    updatedAt: Date.now(),
  };
}
