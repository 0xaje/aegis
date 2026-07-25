import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { Badge } from './Badge.js';
import { BrainCircuit, CheckCircle2, TrendingUp } from 'lucide-react';
import { cn } from '../utils.js';

export interface IntelligenceCardProps {
  strategyName: string;
  riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH';
  confidenceScore: number; // 0 to 1
  simulatedReturn: number; // e.g. 0.085 for 8.5%
  verifiedByConfidentialCompute: boolean;
  rationale: string;
  allocation: Array<{ symbol: string; percentage: number }>;
  onExecute?: () => void;
  className?: string;
}

export function IntelligenceCard({
  strategyName,
  riskTolerance,
  confidenceScore,
  simulatedReturn,
  verifiedByConfidentialCompute,
  rationale,
  allocation,
  onExecute,
  className,
}: IntelligenceCardProps) {
  const scorePercentage = Math.round(confidenceScore * 100);

  return (
    <Card glow className={cn('border-glow relative overflow-hidden', className)}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />

      <CardHeader className="flex flex-row items-start justify-between pb-4 border-b border-slate-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/10 border border-indigo-500/25 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-indigo-400" />
            </div>
            <CardTitle className="text-base font-bold">Confidential Recommendation</CardTitle>
          </div>
          <h4 className="text-lg font-bold text-slate-100 mt-1">{strategyName}</h4>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <Badge
            variant={
              riskTolerance === 'LOW' ? 'success' : riskTolerance === 'MEDIUM' ? 'warning' : 'error'
            }
          >
            {riskTolerance} RISK
          </Badge>
          {verifiedByConfidentialCompute && (
            <Badge variant="verified">
              <CheckCircle2 className="w-3 h-3 text-indigo-300" /> TEE SECURE
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 flex flex-col gap-6">
        {/* Key Metrics row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#07080c]/50 border border-slate-800/40 rounded-lg p-3.5 flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
              CONFIDENCE INDEX
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-indigo-400">
                {scorePercentage}%
              </span>
              <span className="text-[10px] text-slate-400">Score</span>
            </div>
          </div>

          <div className="bg-[#07080c]/50 border border-slate-800/40 rounded-lg p-3.5 flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
              EST. ANNUAL YIELD
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-emerald-400">
                {(simulatedReturn * 100).toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-400">APY</span>
            </div>
          </div>
        </div>

        {/* Rationale */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
            DECISION RATIONALE
          </span>
          <p className="text-xs text-slate-300 leading-relaxed bg-[#07080c]/30 border border-slate-800/20 rounded-lg p-3">
            {rationale}
          </p>
        </div>

        {/* Target Allocation */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
            PROPOSED ALLOCATION TARGETS
          </span>
          <div className="flex flex-wrap gap-2">
            {allocation.map((alloc) => (
              <div
                key={alloc.symbol}
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="font-semibold text-slate-200 font-mono">{alloc.symbol}</span>
                <span className="text-slate-400 font-mono border-l border-slate-800 pl-2">
                  {alloc.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Execute button */}
        {onExecute && (
          <button
            onClick={onExecute}
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all border border-indigo-500/20 shadow-md shadow-indigo-600/10 mt-2"
          >
            <TrendingUp className="w-4 h-4" />
            Authorize Strategy Execution
          </button>
        )}
      </CardContent>
    </Card>
  );
}
