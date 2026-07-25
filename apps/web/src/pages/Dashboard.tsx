import { MetricCard, PortfolioCard, TrustScore, FinancialHealth } from '@aegis/ui';

// Mock asset balances matching @aegis/types Definitions
const mockAssets = [
  {
    symbol: 'FLR',
    name: 'Flare',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    balance: '2500000000000000000000', // 2,500 FLR
    valueUSD: 75.0,
    priceUSD: 0.03,
  },
  {
    symbol: 'WFLR',
    name: 'Wrapped Flare',
    address: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
    decimals: 18,
    balance: '15000000000000000000000', // 15,000 WFLR
    valueUSD: 450.0,
    priceUSD: 0.03,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x9bB5e65789d4BBa65a9530de7bd0709d005fE4',
    decimals: 6,
    balance: '200000000', // 200 USDT
    valueUSD: 200.0,
    priceUSD: 1.0,
  },
];

export default function Dashboard() {
  const totalValueUSD = mockAssets.reduce((sum, asset) => sum + asset.valueUSD, 0);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Asset Dashboard</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Overview of confidential portfolios and real-time oracle metrics.
        </p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <MetricCard
          title="Protected Valuation"
          value={`$${totalValueUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={4.8}
          changeLabel="vs last week"
          data={[700, 712, 708, 715, 719, 725]}
        />
        <MetricCard
          title="FTSO FLR oracle Price"
          value="$0.0300"
          change={-0.8}
          changeLabel="vs 24h ago"
          data={[0.0305, 0.0303, 0.0302, 0.0301, 0.0304, 0.03]}
        />
        <MetricCard
          title="Verified Epoch Computes"
          value="1,408"
          change={18.2}
          changeLabel="attestation calls"
          data={[1100, 1150, 1200, 1310, 1380, 1408]}
        />
      </div>

      {/* Main Portfolio Breakdown */}
      <PortfolioCard assets={mockAssets} totalValueUSD={totalValueUSD} />

      {/* Risk and Trust Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrustScore
          score={98}
          attestationPassed={true}
          codeHashMatched={true}
          ftsoVerified={true}
        />
        <FinancialHealth healthFactor={2.25} liquidationThreshold={1.2} currentRisk="LOW" />
      </div>
    </div>
  );
}
