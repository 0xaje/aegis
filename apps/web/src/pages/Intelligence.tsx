import { IntelligenceCard, Badge } from '@aegis/ui';
import { Cpu } from 'lucide-react';

export default function Intelligence() {
  const recommendations = [
    {
      id: 'rec-ftso-yield',
      strategyName: 'FTSO Delegation Optimization',
      riskTolerance: 'LOW' as const,
      confidenceScore: 0.98,
      simulatedReturn: 0.085,
      verifiedByConfidentialCompute: true,
      rationale:
        'Your portfolio contains 2,500 un-delegated FLR. Deploying delegation rules via TEE enclaves automatically directs wraps to top FTSO pricing providers for risk-free APY.',
      allocation: [
        { symbol: 'WFLR', percentage: 70 },
        { symbol: 'USDT', percentage: 30 },
      ],
    },
    {
      id: 'rec-vol-hedge',
      strategyName: 'Stablecoin Hedged Accumulator',
      riskTolerance: 'MEDIUM' as const,
      confidenceScore: 0.89,
      simulatedReturn: 0.124,
      verifiedByConfidentialCompute: true,
      rationale:
        'FTSOv2 feed indicates high local volatility for FLR. Hedging 40% of positions into USDT locks gains while preserving buy-side liquidity.',
      allocation: [
        { symbol: 'WFLR', percentage: 60 },
        { symbol: 'USDT', percentage: 40 },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Confidential Intelligence</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographically verified allocation recommendations calculated inside secure TEE
            enclaves.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/20 border border-indigo-900/35">
          <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-[10px] font-mono text-indigo-300 font-semibold uppercase">
            Enclave: AMD-SEV-ACTIVE
          </span>
        </div>
      </div>

      {/* Intro info box */}
      <div className="bg-[#0c0e14]/40 border border-border p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-glow">
        <div className="max-w-2xl">
          <span className="text-[9px] font-bold text-indigo-400 font-mono block tracking-wider uppercase">
            HOW IT WORKS
          </span>
          <h3 className="font-semibold text-sm text-slate-200 mt-1">
            Zero-Knowledge Private Portfolio Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Your asset balances are encrypted using the enclave's public key before leaving your
            browser. Calculations, risk analysis, and FTSO queries happen entirely within memory
            shield bounds. No host operators or APIs can read your data.
          </p>
        </div>
        <Badge variant="verified">100% PRIVATE COMPUTE</Badge>
      </div>

      {/* Recommendations Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recommendations.map((rec) => (
          <IntelligenceCard
            key={rec.id}
            strategyName={rec.strategyName}
            riskTolerance={rec.riskTolerance}
            confidenceScore={rec.confidenceScore}
            simulatedReturn={rec.simulatedReturn}
            verifiedByConfidentialCompute={rec.verifiedByConfidentialCompute}
            rationale={rec.rationale}
            allocation={rec.allocation}
            onExecute={() => alert(`Strategy execution authorized for ${rec.strategyName}`)}
          />
        ))}
      </div>
    </div>
  );
}
