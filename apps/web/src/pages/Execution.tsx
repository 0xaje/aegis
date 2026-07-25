import * as React from 'react';
import { useAccount } from 'wagmi';
import { ExecutionStatusCard, Card, CardHeader, CardTitle, CardDescription } from '@aegis/ui';
import { Lock, ArrowRight } from 'lucide-react';

export default function Execution() {
  const { isConnected: realIsConnected } = useAccount();
  const demoMode =
    typeof window !== 'undefined' && localStorage.getItem('aegis_demo_mode') === 'true';
  const isConnected = realIsConnected || demoMode;
  const [step, setStep] = React.useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  const startPipelineDemo = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 3000);
    setTimeout(() => setStep(4), 4500);
    setTimeout(() => setStep(5), 6000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {isConnected ? (
        <div className="flex flex-col gap-5 w-full animate-in fade-in duration-200">
          {/* Flare Narrative Flow Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 select-none">
            {[
              {
                label: 'FTSOv2 Oracle',
                color: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
              },
              {
                label: 'Confidential Compute (TEE)',
                color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5',
              },
              {
                label: 'Verified Recommendation',
                color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
              },
              {
                label: 'StrategyRegistry',
                color: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
              },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <span
                  className={`shrink-0 text-[9px] font-mono font-semibold px-2.5 py-1 rounded-full border ${s.color}`}
                >
                  {s.label}
                </span>
                {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-slate-700 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
          <ExecutionStatusCard
            activeStep={step}
            strategyName="FTSO Optimization"
            onStartExecution={startPipelineDemo}
          />
        </div>
      ) : (
        <Card className="border-glow p-8 text-center flex flex-col items-center gap-4 bg-[#0c0e14]/50 border-dashed">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <CardHeader className="p-0 flex flex-col gap-0.5">
            <CardTitle>Execution Pipeline Locked</CardTitle>
            <CardDescription className="max-w-xs mx-auto">
              Please authenticate your wallet to initiate transaction rebalances.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
