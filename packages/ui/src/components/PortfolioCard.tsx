import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { cn } from '../utils.js';

export interface PortfolioAsset {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  balance: string;
  valueUSD: number;
  priceUSD: number;
}

export interface PortfolioCardProps {
  assets: PortfolioAsset[];
  totalValueUSD: number;
  className?: string;
}

export function PortfolioCard({ assets, totalValueUSD, className }: PortfolioCardProps) {
  const formatBalance = (balStr: string, decimals: number) => {
    try {
      const balNum = parseFloat(balStr) / Math.pow(10, decimals);
      if (balNum < 0.001) return balNum.toExponential(4);
      return balNum.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      });
    } catch {
      return '0.00';
    }
  };

  return (
    <Card className={cn('border-glow', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-800/50">
        <div>
          <CardTitle>Asset Portfolios</CardTitle>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">
            SECURE ACCOUNT BALANCE
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-semibold text-slate-500 font-mono block">
            TOTAL VALUATION
          </span>
          <span className="text-lg font-bold text-indigo-400 font-mono">
            $
            {totalValueUSD.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/40 text-[10px] font-mono tracking-widest text-slate-500 uppercase select-none">
                <th className="py-4 px-6 font-semibold">Asset</th>
                <th className="py-4 px-4 font-semibold text-right">Balance</th>
                <th className="py-4 px-4 font-semibold">Allocation</th>
                <th className="py-4 px-4 font-semibold text-right">Price</th>
                <th className="py-4 px-6 font-semibold text-right">Value (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {assets.map((asset) => {
                const allocationPct =
                  totalValueUSD === 0 ? 0 : (asset.valueUSD / totalValueUSD) * 100;

                return (
                  <tr key={asset.symbol} className="hover:bg-slate-900/25 transition-colors group">
                    <td className="py-3.5 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-indigo-400 group-hover:border-indigo-500/20 group-hover:bg-slate-800/35 transition-all select-none">
                        {asset.symbol.substring(0, 3)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 block text-xs">
                          {asset.symbol}
                        </span>
                        <span className="text-[10px] text-slate-500 block leading-none">
                          {asset.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-300">
                      {formatBalance(asset.balance, asset.decimals)}
                    </td>

                    <td className="py-3.5 px-4 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-900/50">
                          <div
                            className="h-full bg-indigo-500/80 rounded-full transition-all duration-500"
                            style={{ width: `${allocationPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                          {allocationPct.toFixed(1)}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-xs text-slate-400">
                      $
                      {asset.priceUSD.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}
                    </td>

                    <td className="py-3.5 px-6 text-right font-mono text-xs font-semibold text-slate-100">
                      $
                      {asset.valueUSD.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
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
