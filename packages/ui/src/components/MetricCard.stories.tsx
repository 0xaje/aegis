import { MetricCard } from './MetricCard.js';

export default {
  title: 'Fintech/MetricCard',
  component: MetricCard,
};

export const Valuation = () => (
  <div className="max-w-xs w-full p-4">
    <MetricCard
      title="Protected Valuation"
      value="$125,750.40"
      change={4.8}
      changeLabel="vs last week"
      data={[120000, 122000, 121500, 123000, 124500, 125750]}
    />
  </div>
);

export const PriceFeed = () => (
  <div className="max-w-xs w-full p-4">
    <MetricCard
      title="FTSO FLR Price"
      value="$0.0300"
      change={-1.2}
      changeLabel="vs 24h ago"
      data={[0.0304, 0.0303, 0.0301, 0.0299, 0.0302, 0.03]}
    />
  </div>
);
