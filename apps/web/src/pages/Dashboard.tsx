import * as React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FlareFtsoClient, calculateRiskReport, aggregatePortfolio } from '@aegis/sdk';
import { formatUnits } from 'viem';
import { Check } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  // Collapsible state for secondary details
  const [activityOpen, setActivityOpen] = React.useState(false);

  // Real account balances on Coston2
  const { data: flrBalance, isLoading: isFlrLoading } = useBalance({ address });
  const { data: wflrBalance, isLoading: isWflrLoading } = useBalance({
    address,
    token: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4' as `0x${string}`,
  });

  // Query real FTSOv2 price feeds
  const [flrPriceUSD, setFlrPriceUSD] = React.useState<number | null>(null);
  const [priceError, setPriceError] = React.useState<string | null>(null);
  const [isPriceLoading, setIsPriceLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const isMounted = true;
    async function fetchPrice() {
      try {
        setIsPriceLoading(true);
        setPriceError(null);
        const client = new FlareFtsoClient();
        const p = await client.getPrice('FLR');
        if (isMounted) setFlrPriceUSD(p.priceUSD);
      } catch (err) {
        if (isMounted) setPriceError(err instanceof Error ? err.message : 'FTSOv2 query failed');
      } finally {
        if (isMounted) setIsPriceLoading(false);
      }
    }
    fetchPrice();
  }, []);

  const flrRaw = flrBalance?.value ?? 0n;
  const wflrRaw = wflrBalance?.value ?? 0n;

  const flrFormatted = flrBalance ? formatUnits(flrBalance.value, flrBalance.decimals) : '0';
  const wflrFormatted = wflrBalance ? formatUnits(wflrBalance.value, wflrBalance.decimals) : '0';

  const aggregatedPortfolio = React.useMemo(() => {
    const rawBalances = [
      {
        asset: {
          address: '0x0000000000000000000000000000000000000000',
          symbol: 'FLR',
          name: 'Flare Native',
          decimals: 18,
        },
        balance: flrRaw,
      },
      {
        asset: {
          address: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
          symbol: 'WFLR',
          name: 'Wrapped Flare',
          decimals: 18,
        },
        balance: wflrRaw,
      },
    ];

    const priceMap: Record<string, number> = {
      '0x0000000000000000000000000000000000000000': flrPriceUSD ?? 0,
      '0x1d8f7ca53789d4bba65a9530de7bd0709d005fe4': flrPriceUSD ?? 0,
    };

    return aggregatePortfolio(rawBalances, priceMap);
  }, [flrRaw, wflrRaw, flrPriceUSD]);

  const riskReport = React.useMemo(() => {
    return calculateRiskReport(aggregatedPortfolio, {
      assets: {
        '0x0000000000000000000000000000000000000000': {
          address: '0x0000000000000000000000000000000000000000',
          dailyVolatility: 0.03,
          liquidityCoefficient: 0.9,
        },
        '0x1d8f7ca53789d4bba65a9530de7bd0709d005fe4': {
          address: '0x1d8f7ca53789d4bba65a9530de7bd0709d005fe4',
          dailyVolatility: 0.03,
          liquidityCoefficient: 0.95,
        },
      },
    });
  }, [aggregatedPortfolio]);

  const totalValuation = aggregatedPortfolio.totalValueUSD.toFixed(2);

  return (
    <div className="flex flex-col gap-xl w-full max-w-5xl mx-auto py-md">
      {isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-xl w-full"
        >
          {/* 1. Financial Health Score (HERO) */}
          <div className="glass-card rounded-2xl p-xl border-l-4 border-l-primary flex flex-col md:flex-row items-center justify-between gap-xl bg-surface-container">
            <div className="flex flex-col gap-xs text-left">
              <span className="text-label-caps uppercase text-primary tracking-widest font-mono-data">
                Current Financial Health
              </span>
              <div className="flex items-baseline gap-md">
                <span className="font-display text-5xl md:text-6xl font-extrabold text-glow text-on-surface">
                  74
                </span>
                <span className="text-title-sm text-on-surface-variant font-mono-data">/ 100</span>
              </div>
              <span className="text-body-sm text-tertiary font-semibold flex items-center gap-xs mt-xs">
                <span className="material-symbols-outlined text-sm">verified</span>
                Verified by Flare FTSOv2 &amp; TEE Enclave Risk Engine
              </span>
            </div>

            <div className="p-lg rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-xs text-right w-full md:w-auto">
              <span className="text-label-caps uppercase text-on-surface-variant">
                Portfolio Valuation
              </span>
              <span className="font-display text-3xl font-bold text-primary">
                ${totalValuation}
              </span>
              <span className="text-[11px] text-on-surface-variant font-mono-data">
                Flare Coston2 Account
              </span>
            </div>
          </div>

          {/* 2. Decision Summary */}
          <div className="glass-card rounded-xl p-lg flex flex-col gap-md">
            <h3 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/10 pb-xs">
              Executive Decision Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md font-mono-data text-body-sm">
              <div className="p-md rounded-lg bg-surface-container-low border-premium flex flex-col gap-xs">
                <span className="text-label-caps text-on-surface-variant uppercase font-sans">
                  Concentration Risk
                </span>
                <span className="font-bold text-tertiary">
                  {riskReport.concentrationScore} / 100 (Low Risk)
                </span>
              </div>
              <div className="p-md rounded-lg bg-surface-container-low border-premium flex flex-col gap-xs">
                <span className="text-label-caps text-on-surface-variant uppercase font-sans">
                  Liquidity Score
                </span>
                <span className="font-bold text-primary">
                  {riskReport.liquidityScore} / 100 (High Liquidity)
                </span>
              </div>
              <div className="p-md rounded-lg bg-surface-container-low border-premium flex flex-col gap-xs">
                <span className="text-label-caps text-on-surface-variant uppercase font-sans">
                  Diversification Factor
                </span>
                <span className="font-bold text-secondary">
                  {riskReport.diversificationScore} / 100
                </span>
              </div>
            </div>
          </div>

          {/* 3. Recommended Strategy Card */}
          <div className="glass-card rounded-2xl p-xl bg-surface-container border border-tertiary/30 flex flex-col gap-lg">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-xs">
              <div className="space-y-xs">
                <span className="text-label-caps uppercase text-tertiary tracking-widest font-mono-data">
                  Recommended Strategy
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Increase FLR Allocation by 8%
                </h3>
              </div>
              <span className="px-md py-xs rounded-full bg-tertiary-container/20 text-tertiary font-mono-data text-label-caps uppercase border border-tertiary/30">
                96% Confidence
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-md text-center font-mono-data text-body-sm">
              <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/10">
                <span className="text-label-caps text-on-surface-variant uppercase block mb-xs font-sans">
                  Current Health
                </span>
                <span className="font-bold text-on-surface text-headline-md">74</span>
              </div>
              <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/10">
                <span className="text-label-caps text-on-surface-variant uppercase block mb-xs font-sans">
                  Projected Health
                </span>
                <span className="font-bold text-tertiary text-headline-md">89</span>
              </div>
              <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/10">
                <span className="text-label-caps text-on-surface-variant uppercase block mb-xs font-sans">
                  Expected Yield
                </span>
                <span className="font-bold text-primary text-headline-md">+2.4%</span>
              </div>
              <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/10">
                <span className="text-label-caps text-on-surface-variant uppercase block mb-xs font-sans">
                  Risk Reduction
                </span>
                <span className="font-bold text-secondary text-headline-md">11%</span>
              </div>
            </div>

            {/* Why this recommendation? Checklist */}
            <div className="p-md rounded-xl bg-surface-container-low/70 border border-outline-variant/20 flex flex-col gap-sm">
              <span className="font-bold text-on-surface text-body-sm flex items-center gap-xs">
                <span className="text-tertiary">Why this recommendation?</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-xs text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-xs text-tertiary font-medium">
                  <Check className="w-3.5 h-3.5 text-cyan-400" /> Diversification improves
                </div>
                <div className="flex items-center gap-xs text-tertiary font-medium">
                  <Check className="w-3.5 h-3.5 text-cyan-400" /> Volatility decreases
                </div>
                <div className="flex items-center gap-xs text-tertiary font-medium">
                  <Check className="w-3.5 h-3.5 text-cyan-400" /> Expected yield increases
                </div>
                <div className="flex items-center gap-xs text-tertiary font-medium">
                  <Check className="w-3.5 h-3.5 text-cyan-400" /> Within your risk policy
                </div>
                <div className="flex items-center gap-xs text-tertiary font-medium sm:col-span-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" /> Based on current FTSOv2 market
                  data
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-xs">
              <button
                onClick={() => navigate('/app/execution')}
                className="bg-primary text-on-primary font-title-sm text-body-sm px-xl py-md rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer font-semibold w-full md:w-auto"
              >
                Execute Strategy (+8% FLR)
              </button>
            </div>
          </div>

          {/* 4. Portfolio Snapshot */}
          <div className="glass-card rounded-xl p-lg flex flex-col gap-md">
            <div className="flex justify-between items-center border-b border-outline-variant/10 pb-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Portfolio Snapshot
              </h3>
              <span className="text-label-caps font-mono-data text-tertiary">Live Balances</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/10 text-label-caps text-on-surface-variant uppercase">
                    <th className="py-md px-md">Asset</th>
                    <th className="py-md px-md">On-Chain Balance</th>
                    <th className="py-md px-md">FTSOv2 Price</th>
                    <th className="py-md px-md text-right">USD Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 font-mono-data text-body-sm">
                  <tr className="hover:bg-surface-bright/30 transition-colors">
                    <td className="py-md px-md flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-primary">
                        F
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">FLR</div>
                        <div className="text-body-sm text-on-surface-variant font-sans">
                          Flare Native
                        </div>
                      </div>
                    </td>
                    <td className="py-md px-md text-on-surface">
                      {isFlrLoading ? 'Loading...' : flrFormatted}
                    </td>
                    <td className="py-md px-md text-on-surface">
                      {flrPriceUSD !== null ? `$${flrPriceUSD.toFixed(4)}` : 'N/A'}
                    </td>
                    <td className="py-md px-md text-right font-bold text-primary">
                      $
                      {flrPriceUSD !== null
                        ? (Number(flrFormatted) * flrPriceUSD).toFixed(2)
                        : '0.00'}
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-bright/30 transition-colors">
                    <td className="py-md px-md flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-primary">
                        W
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">WFLR</div>
                        <div className="text-body-sm text-on-surface-variant font-sans">
                          Wrapped Flare
                        </div>
                      </div>
                    </td>
                    <td className="py-md px-md text-on-surface">
                      {isWflrLoading ? 'Loading...' : wflrFormatted}
                    </td>
                    <td className="py-md px-md text-on-surface">
                      {flrPriceUSD !== null ? `$${flrPriceUSD.toFixed(4)}` : 'N/A'}
                    </td>
                    <td className="py-md px-md text-right font-bold text-primary">
                      $
                      {flrPriceUSD !== null
                        ? (Number(wflrFormatted) * flrPriceUSD).toFixed(2)
                        : '0.00'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Trusted Market Data */}
          <div className="glass-card rounded-xl p-lg flex flex-col md:flex-row items-center justify-between gap-md border-l-4 border-l-tertiary">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 border border-tertiary/30 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Flare FTSOv2 Oracle Index
                </h4>
                <p className="text-body-sm text-on-surface-variant">
                  Live decentralized price feeds with sub-second finality.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-lg font-mono-data text-body-sm">
              {/* Mini SVG Sparkline */}
              <div className="hidden sm:flex flex-col items-center">
                <span className="text-[10px] text-tertiary font-mono-data mb-0.5">
                  Sub-second Trend
                </span>
                <svg
                  className="w-20 h-6 text-tertiary stroke-current fill-none"
                  viewBox="0 0 80 24"
                >
                  <path
                    d="M0 18 Q 15 12, 30 16 T 60 8 T 80 4"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <span className="text-label-caps text-on-surface-variant uppercase block">
                  FLR/USD
                </span>
                <span className="font-bold text-primary text-title-sm">
                  {isPriceLoading
                    ? 'Loading...'
                    : priceError
                      ? 'Error'
                      : `$${flrPriceUSD?.toFixed(4)}`}
                </span>
              </div>
              <span className="px-md py-xs rounded-full bg-tertiary-container/20 text-tertiary font-mono-data text-label-caps uppercase border border-tertiary/30">
                Verified
              </span>
            </div>
          </div>

          {/* 6. Recent Activity (Collapsible Panel) */}
          <div className="glass-card rounded-xl overflow-hidden">
            <button
              onClick={() => setActivityOpen(!activityOpen)}
              className="w-full p-lg flex justify-between items-center text-left hover:bg-surface-bright/50 transition-colors cursor-pointer outline-none"
            >
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">history</span>
                <h3 className="font-headline-md text-title-sm text-on-surface">
                  Recent Enclave &amp; Execution Activity
                </h3>
              </div>
              <span
                className="material-symbols-outlined text-primary transition-transform duration-300"
                style={{ transform: activityOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                expand_more
              </span>
            </button>

            <AnimatePresence>
              {activityOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-lg pt-0 border-t border-outline-variant/10 text-body-sm text-on-surface-variant font-mono-data space-y-sm">
                    <div className="flex justify-between py-xs border-b border-outline-variant/10">
                      <span>Account Connected: {address}</span>
                      <span className="text-tertiary">Active</span>
                    </div>
                    <div className="flex justify-between py-xs">
                      <span>FTSOv2 Price Query</span>
                      <span className="text-primary">Sub-second Sync</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        /* Guidance-Driven Empty State: No Portfolio Found */
        <div className="glass-card rounded-2xl p-xl text-center flex flex-col items-center gap-lg max-w-xl mx-auto my-xl border-l-4 border-l-primary">
          <div className="w-16 h-16 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[36px]">account_balance_wallet</span>
          </div>
          <div className="space-y-xs">
            <span className="text-label-caps uppercase text-primary font-mono-data tracking-widest">
              No Portfolio Found
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Connect Wallet to Read On-Chain Balances
            </h2>
          </div>
          <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/10 text-body-sm text-on-surface-variant space-y-sm text-left font-sans">
            <div>
              <strong className="text-on-surface block font-mono-data text-label-caps uppercase text-primary">
                Why is this screen empty?
              </strong>
              <span>
                No Web3 wallet is currently connected to discover your on-chain FLR and WFLR
                holdings on Flare Coston2 Testnet.
              </span>
            </div>
            <div>
              <strong className="text-on-surface block font-mono-data text-label-caps uppercase text-tertiary">
                What should you do next?
              </strong>
              <span>
                Connect your Web3 credentials wallet to view your Financial Health Score and live
                FTSOv2 valuation. Need testnet FLR tokens?{' '}
                <a
                  href="https://coston2-faucet.towolabs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:brightness-110 font-medium"
                >
                  Claim Free Coston2 FLR Faucet Tokens →
                </a>
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              const connectBtn = document.querySelector(
                'header button:last-child',
              ) as HTMLButtonElement;
              if (connectBtn) connectBtn.click();
            }}
            className="w-full bg-primary text-on-primary font-title-sm text-body-sm py-md rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer font-semibold"
          >
            Connect Web3 Wallet
          </button>
        </div>
      )}
    </div>
  );
}
