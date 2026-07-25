import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '../utils.js';

export interface HealthScoreProps {
  className?: string;
  healthFactor: number;
  liquidationThreshold?: number;
  currentRisk?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export function HealthScore({
  className,
  healthFactor,
  liquidationThreshold = 1.2,
  currentRisk = 'LOW',
}: HealthScoreProps) {
  // Translate factor into a 0 - 100 percentage for linear slider representation
  const maxFactorVal = 3.0;
  const factorPercentage = Math.min((healthFactor / maxFactorVal) * 100, 100);

  return (
    <Card className={cn('border-glow select-none', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Financial Safety Monitor</span>
          <span className="text-[10px] font-mono text-slate-500 uppercase">Collateral safety</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Metric metrics */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
              HEALTH FACTOR
            </span>
            <span className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight leading-none">
              {healthFactor.toFixed(2)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold block">
              STATUS ZONE
            </span>
            <span
              className={cn(
                'text-xs font-bold font-mono block mt-1 uppercase tracking-wide',
                currentRisk === 'LOW' && 'text-emerald-400',
                currentRisk === 'MEDIUM' && 'text-amber-400',
                currentRisk === 'HIGH' && 'text-rose-400',
              )}
            >
              {currentRisk} RISK
            </span>
          </div>
        </div>

        {/* Linear progress slider */}
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-2 rounded-full bg-slate-950 border border-slate-900 overflow-hidden">
            {/* Liquidation indicator line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10 opacity-70"
              style={{ left: `${(liquidationThreshold / maxFactorVal) * 100}%` }}
            />
            {/* Current health score line */}
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                currentRisk === 'LOW' && 'bg-gradient-to-r from-indigo-500 to-emerald-500',
                currentRisk === 'MEDIUM' && 'bg-gradient-to-r from-indigo-500 to-amber-500',
                currentRisk === 'HIGH' && 'bg-gradient-to-r from-indigo-500 to-rose-500',
              )}
              style={{ width: `${factorPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 leading-none">
            <span>Liquidation Threshold: {liquidationThreshold.toFixed(2)}</span>
            <span>Target Safety: 2.00+</span>
          </div>
        </div>

        {/* Dynamic Risk Warnings */}
        {healthFactor <= liquidationThreshold ? (
          <div className="flex items-start gap-3 p-3.5 bg-rose-950/20 border border-rose-900/30 rounded-lg text-rose-300 text-xs leading-relaxed">
            <AlertTriangle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
            <p>
              <strong>Critical Liquidation risk!</strong> Your health factor is below the threshold.
              Core collateral holds are subject to automated settlement rules. Wrap/deposit asset
              buffers immediately.
            </p>
          </div>
        ) : healthFactor < 1.8 ? (
          <div className="flex items-start gap-3 p-3.5 bg-amber-950/20 border border-amber-900/30 rounded-lg text-amber-300 text-xs leading-relaxed">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Volatility warning!</strong> Safety factor has declined below target levels.
              FTSOv2 price variance could trigger reallocation swap limits.
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-3.5 bg-emerald-950/15 border border-emerald-900/25 rounded-lg text-emerald-300 text-xs leading-relaxed">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Safety bounds secured.</strong> Portfolio collateral assets comfortably shield
              positions from liquidated settlement zones.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
