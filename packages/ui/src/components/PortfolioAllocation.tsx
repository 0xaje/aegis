import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { cn } from '../utils.js';

export interface AssetAllocation {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  balance: string;
  valueUSD: number;
  priceUSD: number;
}

export interface PortfolioAllocationProps {
  className?: string;
  assets: AssetAllocation[];
  totalValueUSD: number;
}

export function PortfolioAllocation({
  className,
  assets,
  totalValueUSD,
}: PortfolioAllocationProps) {
  return (
    <Card className={cn('border-glow select-none', className)}>
      <CardHeader className="border-b border-slate-900/60 pb-4">
        <CardTitle className="flex justify-between items-center text-sm text-slate-100 font-sans font-bold">
          <span>Private Holdings Allocation</span>
          <span className="text-[10px] font-mono text-slate-500 uppercase">FTSOv2 Valued</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-900/60 text-[10px] font-mono tracking-widest text-slate-500 uppercase select-none">
                <th className="py-4 px-6">Asset Name</th>
                <th className="py-4 px-4">Balance</th>
                <th className="py-4 px-4">Oracle Price</th>
                <th className="py-4 px-4">Value USD</th>
                <th className="py-4 px-6 text-right">Allocation weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/30">
              {assets.map((asset) => {
                const allocationWeight =
                  totalValueUSD > 0 ? (asset.valueUSD / totalValueUSD) * 100 : 0;

                // Formats asset balance values cleanly
                const rawBal = Number(asset.balance) / Math.pow(10, asset.decimals);
                const formattedBalance = rawBal.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                });

                return (
                  <tr key={asset.address} className="hover:bg-slate-900/15 transition-colors group">
                    <td className="py-4 px-6 font-semibold text-slate-200">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-200">{asset.name}</span>
                        <span className="text-[9px] font-mono text-slate-500 font-bold block truncate max-w-[140px] uppercase">
                          {asset.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-mono">{formattedBalance}</td>
                    <td className="py-4 px-4 text-slate-300 font-mono">
                      $
                      {asset.priceUSD.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-200 font-mono">
                      $
                      {asset.valueUSD.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3.5">
                        <span className="font-mono text-slate-400 font-semibold text-[10px] min-w-[32px] text-right">
                          {allocationWeight.toFixed(1)}%
                        </span>
                        <div className="w-20 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                          <div
                            className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${allocationWeight}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
