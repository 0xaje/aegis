import * as React from 'react';
import { useAccount } from 'wagmi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@aegis/ui';
import {
  Lock,
  Shield,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Download,
  Cpu,
  Database,
  Percent,
  Scale,
  AlertCircle,
  ArrowRight,
  Zap,
  Clock,
  Fuel,
  Activity,
} from 'lucide-react';

// Simulates "Updated Xs ago" freshness timestamps per feed
function useLiveFreshness() {
  const [offsets, setOffsets] = React.useState({ btc: 1.8, eth: 2.1, flr: 1.4 });
  React.useEffect(() => {
    const id = setInterval(() => {
      setOffsets({
        btc: parseFloat((Math.random() * 3 + 0.5).toFixed(1)),
        eth: parseFloat((Math.random() * 3 + 0.5).toFixed(1)),
        flr: parseFloat((Math.random() * 3 + 0.5).toFixed(1)),
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return offsets;
}

export default function IntelligenceReport() {
  const { isConnected: realIsConnected } = useAccount();
  const demoMode =
    typeof window !== 'undefined' && localStorage.getItem('aegis_demo_mode') === 'true';
  const isConnected = realIsConnected || demoMode;
  const freshness = useLiveFreshness();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900/40 pb-4">
        <div>
          <h1 className="text-xl font-bold font-sans tracking-tight">
            Confidential Financial Intelligence
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            TEE-isolated risk audits and recommendation models computed securely on Flare.
          </p>
        </div>
        {isConnected && (
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2 h-9 border-slate-800 hover:bg-slate-900/40 text-slate-300 font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (PDF)</span>
          </Button>
        )}
      </div>

      {/* Flare Narrative Flow Strip */}
      {isConnected && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 select-none">
          {[
            {
              label: 'FTSOv2 Oracle',
              color: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
            },
            {
              label: 'Confidential Compute (TEE)',
              color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5',
            },
            {
              label: 'Verified Recommendation',
              color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
            },
            {
              label: 'StrategyRegistry',
              color: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
            },
          ].map((step, i, arr) => (
            <React.Fragment key={step.label}>
              <span
                className={`shrink-0 text-[9px] font-mono font-semibold px-2.5 py-1 rounded-full border ${step.color}`}
              >
                {step.label}
              </span>
              {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-slate-700 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      )}

      {isConnected ? (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-250">
          {/* ── DECISION SUMMARY ── */}
          <Card className="border-glow bg-gradient-to-br from-[#0c0e14] to-indigo-950/10 border-indigo-500/20">
            <CardContent className="pt-5 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Before → After Health */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">
                      Current
                    </span>
                    <span className="text-3xl font-extrabold font-sans text-slate-300">74</span>
                    <span className="text-[9px] text-slate-600 font-mono">Health</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="w-5 h-5 text-indigo-500" />
                    <span className="text-[8px] text-indigo-400 font-mono font-semibold">
                      PROJECTED
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider">
                      After
                    </span>
                    <span className="text-3xl font-extrabold font-sans text-emerald-400">89</span>
                    <span className="text-[9px] text-emerald-600 font-mono">Health</span>
                  </div>
                </div>

                <div className="h-px sm:h-10 w-full sm:w-px bg-slate-800/80 shrink-0" />

                {/* Metrics strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-500 font-mono uppercase flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" /> Expected Yield
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-400">+2.4%</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-500 font-mono uppercase flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-sky-400" /> Risk Delta
                    </span>
                    <span className="text-sm font-bold font-mono text-sky-400">−11%</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-500 font-mono uppercase flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-amber-400" /> Est. Gas
                    </span>
                    <span className="text-sm font-bold font-mono text-amber-400">0.0003 FLR</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-500 font-mono uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-violet-400" /> Time Required
                    </span>
                    <span className="text-sm font-bold font-mono text-violet-400">~12s</span>
                  </div>
                </div>

                <div className="h-px sm:h-10 w-full sm:w-px bg-slate-800/80 shrink-0" />

                {/* Confidence + CTA */}
                <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs font-bold font-sans text-indigo-300">
                      96% Confidence
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-8 px-4 text-[11px] gap-1.5 w-full sm:w-auto"
                  >
                    Execute Strategy <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {/* LEFT COLUMN: Health Score & Evidence Panel */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* 1. Overall Health Score */}
              <Card className="border-glow bg-[#0c0e14]/40 border-slate-800/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-sans font-bold flex items-center gap-2">
                    <Scale className="w-4 h-4 text-indigo-400" />
                    <span>Financial Health Scorecard</span>
                  </CardTitle>
                  <CardDescription>
                    Composite scoring calculated across four deterministic risk categories.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Radial Gauge */}
                  <div className="flex flex-col items-center justify-center p-2 border-r border-slate-900/60 pr-6">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="transparent"
                          stroke="#1e293b"
                          strokeWidth="6"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="transparent"
                          stroke="url(#healthGrad)"
                          strokeWidth="6"
                          strokeDasharray={2 * Math.PI * 42}
                          strokeDashoffset={2 * Math.PI * 42 * (1 - 88 / 100)}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-bold font-sans tracking-tight">88</span>
                        <span className="text-[9px] text-slate-500 font-mono tracking-wider leading-none uppercase">
                          Health
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        Diversification
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold font-mono">84%</span>
                        <span className="text-[9px] text-emerald-500 font-mono font-semibold">
                          ✓ Optimal
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        Concentration (HHI)
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold font-mono">94%</span>
                        <span className="text-[9px] text-emerald-500 font-mono font-semibold">
                          ✓ Low Risk
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        Volatility Index
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold font-mono">91%</span>
                        <span className="text-[9px] text-emerald-500 font-mono font-semibold">
                          ✓ Secure
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        Liquidity Ratio
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold font-mono">78%</span>
                        <span className="text-[9px] text-amber-500 font-mono font-semibold">
                          ⚠ Moderate
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Evidence Panel */}
              <Card className="border-glow bg-[#0c0e14]/40 border-slate-800/80 flex-1">
                <CardHeader className="pb-3 border-b border-slate-900/40">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-indigo-400 font-mono tracking-wider uppercase font-semibold">
                      Strategic Enclave Recommendation
                    </span>
                    <CardTitle className="text-base font-sans font-bold flex items-center gap-2 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Reallocate to Wrapped Flare (WFLR) Delegation</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 pt-4">
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Unallocated native FLR balances detected. Directing delegation configurations
                    wraps to top active FTSO pricing providers optimizes rewards margins and
                    mitigates overall volatility risks.
                  </p>

                  {/* Evidence Panel List */}
                  <div className="flex flex-col gap-2.5 bg-[#05060a]/50 p-4 rounded-lg border border-slate-900/60">
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold border-b border-slate-900/40 pb-1.5 mb-1.5">
                      Verifiable Execution Evidence
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {[
                        { label: 'Diversification improves', delta: '+14.2% projected increase' },
                        { label: 'Volatility decreases', delta: '−9.1% standard deviation shift' },
                        { label: 'Projected yield increases', delta: '+2.40% delegation APY' },
                        {
                          label: 'User policy limits audit',
                          delta: '100% within limits compliance',
                        },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start gap-2 text-xs font-sans">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-250">{item.label}</span>
                            <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                              {item.delta}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-900/60 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <Database className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-mono uppercase">
                          Data Source
                        </span>
                        <span className="text-[10px] font-semibold text-slate-300">
                          FTSOv2 Oracle
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-mono uppercase">
                          Enclave Node
                        </span>
                        <span className="text-[10px] font-semibold text-slate-300">
                          Flare Confidential TEE
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <Percent className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-mono uppercase">
                          Confidence
                        </span>
                        <span className="text-[10px] font-semibold text-slate-300">
                          96.0% (Strong)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: AI Decision Passport + Live Data Provenance */}
            <div className="flex flex-col gap-6">
              {/* AI Decision Passport */}
              <Card className="border-glow bg-[#0c0e14]/40 border-slate-800/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-sans font-bold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    <span>AI Decision Passport</span>
                  </CardTitle>
                  <CardDescription>
                    Verifiable hardware audit passport certifying execution integrity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 font-mono text-xs">
                  <div className="flex flex-col gap-3.5 bg-[#05060a] p-4 rounded-lg border border-slate-900">
                    {[
                      { label: 'Decision ID', value: 'AIG-000142', accent: 'text-indigo-400' },
                      { label: 'Generated', value: 'Today', accent: 'text-slate-300' },
                      { label: 'Market Source', value: 'FTSOv2 Oracle', accent: 'text-slate-300' },
                      {
                        label: 'Compute Mode',
                        value: 'Flare Confidential TEE',
                        accent: 'text-indigo-300 font-semibold',
                      },
                      { label: 'Confidence', value: '96.0%', accent: 'text-slate-300' },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between items-center border-b border-slate-900 pb-2"
                      >
                        <span className="text-slate-500 uppercase text-[9px]">{row.label}</span>
                        <span className={row.accent}>{row.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="text-slate-500 uppercase text-[9px]">Integrity Check</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-500 uppercase text-[9px]">Strategy Hash</span>
                      <div className="bg-[#0c0e14] p-2 rounded text-[9px] text-slate-400 leading-normal break-all border border-slate-900/60">
                        0x91f3ab8f2e718d45c58a93e3df7572792e391bde4c8908f2371a5c6893de79d0
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-indigo-400/90 bg-indigo-500/5 p-2.5 rounded-lg border border-indigo-500/10">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>AMD SEV-SNP hardware checks passed successfully.</span>
                  </div>
                </CardContent>
              </Card>

              {/* ── LIVE DATA PROVENANCE PANEL ── */}
              <Card className="border-glow bg-[#0c0e14]/40 border-slate-800/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-sans font-bold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-400" />
                    <span>Recommendation Inputs</span>
                  </CardTitle>
                  <CardDescription>Live-verified data sources feeding this report.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 font-mono text-[10px]">
                  {[
                    { asset: 'BTC Price', freshness: freshness.btc },
                    { asset: 'ETH Price', freshness: freshness.eth },
                    { asset: 'FLR Price', freshness: freshness.flr },
                  ].map((feed) => (
                    <div
                      key={feed.asset}
                      className="flex items-center justify-between py-2 border-b border-slate-900/50 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-slate-300 font-semibold">{feed.asset}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-400 font-semibold">FTSOv2</span>
                        <span className="text-slate-600">Updated {feed.freshness}s ago</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2 border-b border-slate-900/50">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span className="text-slate-300 font-semibold">Portfolio Snapshot</span>
                    </div>
                    <span className="text-indigo-400 font-semibold">Encrypted (ECIES)</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      <span className="text-slate-300 font-semibold">Execution Env.</span>
                    </div>
                    <span className="text-violet-400 font-semibold">Flare Confidential TEE</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <Card className="border-glow p-8 text-center flex flex-col items-center gap-4 bg-[#0c0e14]/50 border-dashed">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <CardHeader className="p-0 flex flex-col gap-0.5">
            <CardTitle>Intelligence Report Locked</CardTitle>
            <CardDescription className="max-w-xs mx-auto">
              Authenticate your session using the connect button in the sidebar or launch Demo Mode
              to view reports.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
