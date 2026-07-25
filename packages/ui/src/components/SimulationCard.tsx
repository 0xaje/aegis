import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card.js';
import { Button } from './Button.js';
import { Sliders, AlertTriangle } from 'lucide-react';
import { cn } from '../utils.js';

export interface SimulationCardProps {
  className?: string;
  defaultWflrAlloc?: number;
  defaultRiskTolerance?: 'LOW' | 'MEDIUM' | 'HIGH';
  onSimulationChange?: (wflrAlloc: number, riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH') => void;
}

export function SimulationCard({
  className,
  defaultWflrAlloc = 70,
  defaultRiskTolerance = 'LOW',
  onSimulationChange,
}: SimulationCardProps) {
  const [wflrAlloc, setWflrAlloc] = React.useState(defaultWflrAlloc);
  const [riskTolerance, setRiskTolerance] = React.useState<'LOW' | 'MEDIUM' | 'HIGH'>(
    defaultRiskTolerance,
  );

  const usdtAlloc = 100 - wflrAlloc;

  // Calculates yield parameters dynamically
  const getSimulatedApy = () => {
    const baseFlrYield = riskTolerance === 'LOW' ? 0.085 : riskTolerance === 'MEDIUM' ? 0.11 : 0.16;
    const stableYield = 0.045; // 4.5% standard USDT yield
    const compositeApy = (wflrAlloc / 100) * baseFlrYield + (usdtAlloc / 100) * stableYield;
    return (compositeApy * 100).toFixed(2);
  };

  const getHealthFactor = () => {
    const rawVal = 3.0 - (wflrAlloc / 100) * 1.5 + (riskTolerance === 'HIGH' ? -0.4 : 0);
    return Math.max(rawVal, 1.0).toFixed(2);
  };

  // Triggers outer changes
  React.useEffect(() => {
    if (onSimulationChange) {
      onSimulationChange(wflrAlloc, riskTolerance);
    }
  }, [wflrAlloc, riskTolerance, onSimulationChange]);

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-8 w-full select-none', className)}>
      {/* Input panel */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <Card className="border-glow">
          <CardHeader>
            <CardTitle>Adjust Target Ratios</CardTitle>
            <CardDescription>
              Simulates shift in asset weights to lock yields or stable hedges.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            {/* Risk Selection */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                Risk Tolerance Model
              </span>
              <div className="flex gap-3">
                {(['LOW', 'MEDIUM', 'HIGH'] as const).map((level) => (
                  <Button
                    key={level}
                    variant={riskTolerance === level ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setRiskTolerance(level)}
                    className="flex-1 font-semibold"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* Slider 1: WFLR */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">
                  Wrapped Flare (WFLR) Allocation
                </span>
                <span className="font-mono text-indigo-400 font-bold">{wflrAlloc}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={wflrAlloc}
                onChange={(e) => setWflrAlloc(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-905 h-2 rounded-lg cursor-pointer appearance-none border border-slate-800"
              />
            </div>

            {/* Slider 2: USDT */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-400">
                  Tether Stablecoin (USDT) Allocation
                </span>
                <span className="font-mono text-slate-500 font-bold">{usdtAlloc}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                <div
                  className="h-full bg-slate-800 rounded-full transition-all duration-300"
                  style={{ width: `${usdtAlloc}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outputs Panel */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="border-glow bg-gradient-to-b from-[#0c0e14] to-[#0c0e14]/50">
          <CardHeader className="border-b border-slate-800/40 pb-4">
            <CardTitle>Simulation outputs</CardTitle>
            <CardDescription>Estimated metrics based on inputs.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-6">
            {/* APY Output */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                  SIMULATED APY
                </span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                  {getSimulatedApy()}%
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950/20 border border-emerald-900/40 flex items-center justify-center">
                <Sliders className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            {/* Health Output */}
            <div className="flex items-center justify-between border-t border-slate-900 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                  SIMULATED HEALTH FACTOR
                </span>
                <span className="text-xl font-bold text-slate-200 font-mono mt-1">
                  {getHealthFactor()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold block">
                  RISK ZONE
                </span>
                <span
                  className={cn(
                    'text-xs font-bold font-mono block mt-1',
                    Number(getHealthFactor()) > 1.8 ? 'text-emerald-400' : 'text-amber-400',
                  )}
                >
                  {Number(getHealthFactor()) > 1.8 ? 'SECURE' : 'WARNING'}
                </span>
              </div>
            </div>

            {/* Warnings if WFLR > 85% */}
            {wflrAlloc > 85 && (
              <div className="flex items-start gap-2 bg-rose-955/20 border border-rose-900/35 rounded-lg p-3 text-xs text-rose-300">
                <AlertTriangle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-sans">
                  Concentrated exposure warning. Allocating over 85% of assets into volatile Flare
                  contracts decreases security coefficients under sharp market shifts.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
