import { Card, CardHeader, CardTitle, CardContent } from './Card.js';
import { Check, ShieldCheck } from 'lucide-react';
import { cn } from '../utils.js';

export interface TrustScoreProps {
  score: number; // 0 to 100
  attestationPassed: boolean;
  codeHashMatched: boolean;
  ftsoVerified: boolean;
  className?: string;
}

export function TrustScore({
  score,
  attestationPassed,
  codeHashMatched,
  ftsoVerified,
  className,
}: TrustScoreProps) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card hoverGlow className={cn('border-glow', className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle>Hardware Trust score</CardTitle>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">
            ENCLAVE DEVIATION MONITOR
          </p>
        </div>
        <ShieldCheck className="w-5 h-5 text-indigo-400" />
      </CardHeader>

      <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
        {/* Score Radial Circle */}
        <div className="relative w-24 h-24 flex items-center justify-center select-none">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-800/80"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-indigo-500 transition-all duration-1000 ease-out"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold font-mono text-slate-100 leading-none">
              {score}%
            </span>
            <span className="text-[8px] text-indigo-400 font-semibold font-mono tracking-widest uppercase mt-1">
              ATTESTED
            </span>
          </div>
        </div>

        {/* Detailed attestation checks checklist */}
        <div className="flex-1 flex flex-col gap-2.5 w-full">
          <div className="flex items-center justify-between border-b border-slate-900/60 pb-1.5">
            <span className="text-xs text-slate-400 font-medium">TEE Hardware Proof</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono font-semibold text-emerald-400">PASSED</span>
              {attestationPassed ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-900/60 pb-1.5">
            <span className="text-xs text-slate-400 font-medium">Docker Enclave Hash</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono font-semibold text-emerald-400">MATCHED</span>
              {codeHashMatched ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">FTSO Oracle Signatures</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono font-semibold text-emerald-400">VALID</span>
              {ftsoVerified ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
