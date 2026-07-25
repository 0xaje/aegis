import { useOutletContext } from 'react-router-dom';
import { SimulationCard, Card, CardHeader, CardTitle, CardDescription } from '@aegis/ui';
import { Lock } from 'lucide-react';

export default function Simulation() {
  const { isConnected } = useOutletContext<{ isConnected: boolean }>();

  return (
    <div className="flex flex-col gap-6 w-full">
      {isConnected ? (
        <div className="w-full animate-in fade-in duration-200">
          <SimulationCard
            defaultWflrAlloc={70}
            defaultRiskTolerance="LOW"
            onSimulationChange={(alloc, risk) => console.info('Simulation updated:', alloc, risk)}
          />
        </div>
      ) : (
        <Card className="border-glow p-8 text-center flex flex-col items-center gap-4 bg-[#0c0e14]/50 border-dashed">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <CardHeader className="p-0 flex flex-col gap-0.5">
            <CardTitle>Simulation Panel Locked</CardTitle>
            <CardDescription className="max-w-xs mx-auto">
              Please authenticate your session to simulate reallocations and returns.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
