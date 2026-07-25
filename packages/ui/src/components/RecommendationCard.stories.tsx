import { RecommendationCard } from './RecommendationCard.js';

export default {
  title: 'Fintech/RecommendationCard',
  component: RecommendationCard,
};

export const Default = () => (
  <div className="max-w-md w-full p-4">
    <RecommendationCard
      strategyName="FTSO Delegation Optimization"
      riskTolerance="LOW"
      confidenceScore={0.98}
      simulatedReturn={0.085}
      verifiedByConfidentialCompute={true}
      rationale="Your portfolio WFLR balances are currently unallocated. Directing delegation wrap configurations to top active FTSO pricing providers optimizes rewards risk-free."
      allocation={[
        { symbol: 'WFLR', percentage: 75 },
        { symbol: 'USDT', percentage: 25 },
      ]}
      onExecute={() => alert('Strategy authorization signed')}
    />
  </div>
);
