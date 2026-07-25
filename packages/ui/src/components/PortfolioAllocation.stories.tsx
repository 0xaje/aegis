import { PortfolioAllocation } from './PortfolioAllocation.js';

export default {
  title: 'Fintech/PortfolioAllocation',
  component: PortfolioAllocation,
};

const mockAssets = [
  {
    symbol: 'FLR',
    name: 'Flare',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    balance: '2500000000000000000000', // 2,500 FLR
    valueUSD: 75.0,
    priceUSD: 0.03,
  },
  {
    symbol: 'WFLR',
    name: 'Wrapped Flare',
    address: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
    decimals: 18,
    balance: '15000000000000000000000', // 15,000 WFLR
    valueUSD: 450.0,
    priceUSD: 0.03,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0x9bB5e65789d4BBa65a9530de7bd0709d005fE4',
    decimals: 6,
    balance: '200000000', // 200 USDT
    valueUSD: 200.0,
    priceUSD: 1.0,
  },
];

export const Default = () => (
  <div className="max-w-3xl w-full p-4">
    <PortfolioAllocation assets={mockAssets} totalValueUSD={725.0} />
  </div>
);
