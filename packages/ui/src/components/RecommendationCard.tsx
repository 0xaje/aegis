import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { Badge } from './Badge.js';
import { Button } from './Button.js';
import { BrainCircuit, CheckCircle2, TrendingUp } from 'lucide-react';
import { cn } from '../utils.js';

export interface RecommendationCardProps {
  className?: string;
  strategyName: string;
  riskTolerance: 'LOW' | 'MEDIUM' | 'HIGH';
  confidenceScore: number;
  simulatedReturn: number;
  verifiedByConfidentialCompute?: boolean;
  rationale: string;
  allocation: { symbol: string; percentage: number }[];
  onExecute?: () => void;
}

export function RecommendationCard({
  className,
  strategyName,
  riskTolerance,
  confidenceScore,
  simulatedReturn,
  verifiedByConfidentialCompute = true,
  rationale,
  allocation,
  onExecute,
}: RecommendationCardProps) {
  return (
    <Card className={cn('border-glow select-none', className)}>
      <CardHeader className="border-b border-slate-900/60 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
              TEE REALLOCATION PROPOSAL
            </span>
            <CardTitle>{strategyName}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={
                riskTolerance === 'LOW'
                  ? 'success'
                  : riskTolerance === 'MEDIUM'
                    ? 'warning'
                    : 'error'
              }
            >
              {riskTolerance} RISK
            </Badge>
            {verifiedByConfidentialCompute && <Badge variant="verified">TEE Verified</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 flex flex-col gap-5 text-xs font-sans">
        {/* Performance metrics */}
        <div className="grid grid-cols-2 gap-4 bg-[#07080c]/50 p-4 rounded-xl border border-slate-900/60">
          <div className="flex items-start gap-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] text-slate-500 font-mono block tracking-wider uppercase font-semibold">
                Simulated APY
              </span>
              <span className="text-base font-extrabold text-emerald-400 font-mono block leading-none mt-1">
                +{(simulatedReturn * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <BrainCircuit className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] text-slate-500 font-mono block tracking-wider uppercase font-semibold">
                Confidence Score
              </span>
              <span className="text-base font-extrabold text-indigo-400 font-mono block leading-none mt-1">
                {(confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Rationale explanation */}
        <div className="text-slate-400 leading-relaxed font-sans text-xs">{rationale}</div>

        {/* Target Allocation splits */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
            Target Allocation weights
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {allocation.map((alloc) => (
              <div
                key={alloc.symbol}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-[10px] font-mono font-semibold"
              >
                <span className="text-indigo-400 font-extrabold">{alloc.symbol}</span>
                <span className="text-slate-400">{alloc.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button callback */}
        {onExecute && (
          <div className="flex justify-end mt-2 border-t border-slate-900 pt-4">
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 h-9 px-4 font-semibold"
              onClick={onExecute}
            >
              <CheckCircle2 className="w-4 h-4 text-white" /> Authorize Strategy Execution
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
