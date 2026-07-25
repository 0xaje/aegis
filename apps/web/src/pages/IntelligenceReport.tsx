import { useOutletContext } from 'react-router-dom';
import { RecommendationCard, Card, CardHeader, CardTitle, CardDescription } from '@aegis/ui';
import { Lock } from 'lucide-react';

export default function IntelligenceReport() {
  const { isConnected } = useOutletContext<{ isConnected: boolean }>();

  return (
    <div className="flex flex-col gap-6 w-full">
      {isConnected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in duration-200">
          <RecommendationCard
            strategyName="FTSO Delegation Optimization"
            riskTolerance="LOW"
            confidenceScore={0.98}
            simulatedReturn={0.085}
            rationale="Unallocated FLR balances detected. Directing delegation configurations wraps to top active FTSO pricing providers optimizes rewards risk-free."
            allocation={[{ symbol: 'WFLR', percentage: 100 }]}
            onExecute={() => alert('Strategy authorized')}
          />
        </div>
      ) : (
        <Card className="border-glow p-8 text-center flex flex-col items-center gap-4 bg-[#0c0e14]/50 border-dashed">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <CardHeader className="p-0 flex flex-col gap-0.5">
            <CardTitle>Intelligence Feed Locked</CardTitle>
            <CardDescription className="max-w-xs mx-auto">
              Please authenticate your wallet to query active strategy recommendation cards.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
