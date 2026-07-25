import { HealthScore } from './HealthScore.js';

export default {
  title: 'Fintech/HealthScore',
  component: HealthScore,
};

export const Secure = () => (
  <div className="max-w-md w-full p-4">
    <HealthScore healthFactor={2.45} currentRisk="LOW" />
  </div>
);

export const Warning = () => (
  <div className="max-w-md w-full p-4">
    <HealthScore healthFactor={1.45} currentRisk="MEDIUM" />
  </div>
);

export const Liquidated = () => (
  <div className="max-w-md w-full p-4">
    <HealthScore healthFactor={1.05} currentRisk="HIGH" />
  </div>
);
