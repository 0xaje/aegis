import * as React from 'react';
import { useAccount } from 'wagmi';
import { ExecutionStatusCard, Card, CardHeader, CardTitle, CardDescription } from '@aegis/ui';
import { Lock } from 'lucide-react';

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
        <div className="w-full animate-in fade-in duration-200">
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
