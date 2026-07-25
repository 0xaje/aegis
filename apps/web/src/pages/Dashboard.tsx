import { useAccount } from 'wagmi';
import {
  MetricCard,
  PortfolioAllocation,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@aegis/ui';
import { Lock } from 'lucide-react';

export default function Dashboard() {
  const { isConnected } = useAccount();

  // Mock static balances
  const mockAssets = [
    {
      symbol: 'FLR',
      name: 'Flare',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      balance: '2500000000000000000000',
      valueUSD: 75.0,
      priceUSD: 0.03,
    },
    {
      symbol: 'WFLR',
      name: 'Wrapped Flare',
      address: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
      decimals: 18,
      balance: '15000000000000000000000',
      valueUSD: 450.0,
      priceUSD: 0.03,
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {isConnected ? (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MetricCard
              title="Confidential Assets Valuation"
              value="$525.00"
              change={3.2}
              data={[500, 505, 510, 508, 520, 525]}
            />
            <MetricCard
              title="FTSO FLR oracle feed"
              value="$0.0300"
              change={-0.5}
              data={[0.0304, 0.0302, 0.0301, 0.03]}
            />
          </div>
          <PortfolioAllocation assets={mockAssets} totalValueUSD={525.0} />
        </div>
      ) : (
        <Card className="border-glow p-8 text-center flex flex-col items-center gap-4 bg-[#0c0e14]/50 border-dashed">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <CardHeader className="p-0 flex flex-col gap-0.5">
            <CardTitle>Portfolio Locked</CardTitle>
            <CardDescription className="max-w-xs mx-auto">
              Authenticate your session using the connect button in the sidebar to read secure
              enclave records.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
