import { SimulationCard } from './SimulationCard.js';

export default {
  title: 'Fintech/SimulationCard',
  component: SimulationCard,
};

export const Default = () => (
  <div className="max-w-4xl w-full p-4">
    <SimulationCard
      defaultWflrAlloc={75}
      defaultRiskTolerance="LOW"
      onSimulationChange={(alloc, risk) => console.info('Simulated change:', alloc, risk)}
    />
  </div>
);
