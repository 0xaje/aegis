import { useAccount } from 'wagmi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@aegis/ui';
import {
  Lock,
  Shield,
  CheckCircle,
  TrendingUp,
  Download,
  Cpu,
  Database,
  Percent,
  Scale,
  AlertCircle,
} from 'lucide-react';

export default function IntelligenceReport() {
  const { isConnected: realIsConnected } = useAccount();
  const demoMode =
    typeof window !== 'undefined' && localStorage.getItem('aegis_demo_mode') === 'true';
  const isConnected = realIsConnected || demoMode;

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

      {isConnected ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full animate-in fade-in duration-250">
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
                {/* Recommendation Description */}
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Unallocated native FLR balances detected. Directing delegation configurations
                  wraps to top active FTSO pricing providers optimizes rewards margins and mitigates
                  overall volatility risks.
                </p>

                {/* Evidence Panel List */}
                <div className="flex flex-col gap-2.5 bg-[#05060a]/50 p-4 rounded-lg border border-slate-900/60">
                  <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold border-b border-slate-900/40 pb-1.5 mb-1.5">
                    Verifiable Execution Evidence
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="flex items-start gap-2 text-xs font-sans">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-250">
                          Diversification improves
                        </span>
                        <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                          +14.2% projected increase
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs font-sans">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-250">Volatility decreases</span>
                        <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                          -9.1% standard deviation shift
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs font-sans">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-250">
                          Projected yield increases
                        </span>
                        <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                          +2.40% delegation APY
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs font-sans">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-250">
                          User policy limits audit
                        </span>
                        <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                          100% within limits compliance
                        </span>
                      </div>
                    </div>
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

          {/* RIGHT COLUMN: AI Decision Passport Card */}
          <div className="flex flex-col gap-6">
            <Card className="border-glow bg-[#0c0e14]/40 border-slate-800/80 flex-1">
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
                {/* Passport layout */}
                <div className="flex flex-col gap-3.5 bg-[#05060a] p-4 rounded-lg border border-slate-900">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-slate-500 uppercase text-[9px]">Decision ID</span>
                    <span className="font-semibold text-indigo-400 tracking-wider">AIG-000142</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-slate-500 uppercase text-[9px]">Generated</span>
                    <span className="text-slate-300">Today</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-slate-500 uppercase text-[9px]">Market Source</span>
                    <span className="text-slate-300">FTSOv2 Oracle</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-slate-500 uppercase text-[9px]">Compute Mode</span>
                    <span className="text-slate-350 text-indigo-350 font-semibold">
                      Flare Confidential TEE
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-slate-500 uppercase text-[9px]">Confidence</span>
                    <span className="text-slate-300">96.0%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <span className="text-slate-500 uppercase text-[9px]">Integrity Check</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-slate-500 uppercase text-[9px]">Strategy Hash</span>
                    <div className="bg-[#0c0e14] p-2 rounded text-[9px] text-slate-400 leading-normal break-all border border-slate-900/60">
                      0x91f3ab8f2e718d45c58a93e3df7572792e391bde4c8908f2371a5c6893de79d0
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-slate-400 leading-normal font-sans text-xs">
                  <div className="flex items-center gap-2 text-[10px] text-indigo-400/90 bg-indigo-500/5 p-2.5 rounded-lg border border-indigo-500/10">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>AMD SEV-SNP hardware checks passed successfully.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
