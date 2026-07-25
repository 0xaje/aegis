import { useOutletContext } from 'react-router-dom';
import {
  MetricCard,
  PortfolioCard,
  TrustScore,
  FinancialHealth,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Skeleton,
} from '@aegis/ui';
import { Lock, LogIn } from 'lucide-react';

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

interface OutletContextType {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Dashboard() {
  const { isConnected, setIsConnected } = useOutletContext<OutletContextType>();
  const totalValueUSD = mockAssets.reduce((sum, asset) => sum + asset.valueUSD, 0);

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Confidential Portfolio Dashboard</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Overview of private assets, FTSOv2 price feeds, and attestation scores.
        </p>
      </div>

      {isConnected ? (
        /* Connected Active View */
        <div className="flex flex-col gap-8 w-full animate-in fade-in duration-300">
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
              title="FTSO FLR Oracle Price"
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
      ) : (
        /* Disconnected Premium Empty State View */
        <div className="flex flex-col gap-8 w-full relative">
          {/* High-fidelity Empty State Overlay Panel */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-[#05060a]/40 backdrop-blur-[2px] rounded-xl border border-dashed border-slate-800/80 min-h-[400px]">
            <Card className="max-w-md w-full border-glow text-center p-8 flex flex-col items-center gap-5 bg-[#0c0e14]/90 shadow-2xl glow-indigo">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center shadow-lg">
                <Lock className="w-5.5 h-5.5 text-indigo-400" />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest leading-none">
                  AUTHORIZATION REQUESTED
                </span>
                <CardTitle className="text-base font-bold text-slate-100">
                  Connect Web3 Wallet
                </CardTitle>
                <CardDescription className="text-xs text-slate-400 leading-relaxed font-sans px-4 mt-1">
                  Connect your credentials wallet to query private portfolio evaluations, read
                  FTSOv2 oracle feeds, and retrieve attestation proofs from Flare enclaves.
                </CardDescription>
              </div>

              <Button
                variant="primary"
                className="h-10 px-6 text-xs gap-1.5"
                onClick={handleConnect}
              >
                <LogIn className="w-4 h-4" /> Authenticate Secure Session
              </Button>
            </Card>
          </div>

          {/* Blurred Background Skeletons */}
          <div className="flex flex-col gap-8 opacity-20 pointer-events-none select-none blur-[1px]">
            {/* Metric Skeletons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6 flex flex-col gap-3">
                    <Skeleton className="w-20 h-3" />
                    <Skeleton className="w-32 h-6" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Table Skeletons */}
            <Card>
              <CardHeader>
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-48 h-3 mt-1.5" />
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
