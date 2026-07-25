import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { AlertCircle, Activity } from 'lucide-react';
import { cn } from '../utils.js';

export interface FinancialHealthProps {
  healthFactor: number; // e.g. 2.10
  liquidationThreshold: number; // e.g. 1.20
  currentRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  className?: string;
}

export function FinancialHealth({
  healthFactor,
  liquidationThreshold,
  currentRisk,
  className,
}: FinancialHealthProps) {
  const minVal = 0.8;
  const maxVal = 3.0;
  const percentage = Math.min(
    Math.max(((healthFactor - minVal) / (maxVal - minVal)) * 100, 0),
    100,
  );

  return (
    <Card hoverGlow className={cn('border-glow', className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle>Portfolio Health Monitor</CardTitle>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">
            COLLATERALIZATION RATIOS
          </p>
        </div>
        <Activity className="w-5 h-5 text-emerald-400" />
      </CardHeader>

      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-500">HEALTH FACTOR</span>
            <span
              className={cn(
                'text-3xl font-extrabold font-mono leading-none mt-1',
                currentRisk === 'LOW' && 'text-emerald-400',
                currentRisk === 'MEDIUM' && 'text-amber-400',
                currentRisk === 'HIGH' && 'text-rose-400',
              )}
            >
              {healthFactor.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-500 block">LIQUIDATION BOUNDS</span>
            <span className="text-xs font-bold text-slate-300 font-mono block mt-1">
              &lt; {liquidationThreshold.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative pt-4 pb-2">
          <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 relative border border-slate-900">
            {/* Liquidation threshold marker */}
            <div
              className="absolute top-[-3px] bottom-[-3px] w-0.5 bg-white z-10"
              style={{ left: `${((liquidationThreshold - minVal) / (maxVal - minVal)) * 100}%` }}
            />

            {/* Current health pointer */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#05060a] border-2 border-indigo-500 shadow-md transition-all duration-700"
              style={{ left: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 mt-2.5 uppercase tracking-widest select-none">
            <span>Critical (&lt;1.0)</span>
            <span>Warning</span>
            <span>Secure (3.0)</span>
          </div>
        </div>

        {currentRisk !== 'LOW' && (
          <div className="flex items-start gap-2.5 bg-amber-950/20 border border-amber-900/30 rounded-lg p-3 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Liquidation threshold warning. Your asset ratios are within volatile bounds. Consider
              reallocating to lock FTSO yields.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
