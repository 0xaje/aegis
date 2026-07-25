import { Link } from 'react-router-dom';
import { Shield, BrainCircuit, Activity, Cpu, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@aegis/ui';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[-15%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid backing overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Landing Header */}
      <header className="border-b border-border/40 bg-[#05060a]/30 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                AEGIS
              </span>
              <span className="text-[8px] block text-slate-500 font-mono tracking-widest leading-none">
                FLARE NETWORK
              </span>
            </div>
          </div>
          <Link to="/app/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-800 text-slate-300 font-medium"
            >
              Launch Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center gap-16 relative z-10">
        {/* Main headlines */}
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-semibold text-indigo-400 font-mono tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            FLARE CONFIDENTIAL COMPUTE SANDBOX ACTIVE
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl font-sans">
            Confidential Financial Intelligence <br />
            <span className="bg-gradient-to-r from-indigo-400 via-slate-200 to-orange-400 bg-clip-text text-transparent">
              Built on Flare Network
            </span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Aegis privately analyzes asset balances, verifies risk models inside secure TEE
            enclaves, and executes verified swaps. Protected calculations backed by hardware
            attestation keys.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <Link to="/app/dashboard">
              <Button size="lg" variant="primary" className="h-11 px-6 text-xs">
                Launch Secure Dashboard
              </Button>
            </Link>
            <a href="https://github.com/0xaje/aegis" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-6 text-xs border-slate-850 text-slate-300"
              >
                View Codebase
              </Button>
            </a>
          </div>
        </div>

        {/* Dynamic Enclave Mockup Visualization */}
        <div className="w-full max-w-4xl border border-border bg-[#0c0e14]/50 rounded-2xl p-6 md:p-8 border-glow relative glow-indigo">
          <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[9px] text-slate-500">
            <Cpu className="w-3.5 h-3.5" /> SECURE CONTEXT ENGINE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-6">
            {/* Step 1: Encrypted Input */}
            <div className="bg-[#05060a]/80 border border-slate-900 rounded-xl p-4 flex flex-col gap-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">
                  User Browser
                </span>
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-slate-200">1. Encrypted Portfolio</span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Positions and parameters are sealed locally before transmission to prevent exposure.
              </p>
              <div className="font-mono text-[9px] text-slate-600 bg-slate-950 p-2 rounded truncate">
                enc: 0x9bB5e65789d4BBa65a9530de7bd...
              </div>
            </div>

            {/* Step 2: Enclave computation */}
            <div className="bg-indigo-950/20 border border-indigo-500/25 rounded-xl p-4 flex flex-col gap-3 relative shadow-md shadow-indigo-600/5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-indigo-400 uppercase font-semibold">
                  TEE Enclave
                </span>
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-indigo-300">2. Secure Evaluation</span>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                Risk optimization algorithm runs in isolated hardware memory. Host process cannot
                read calculations.
              </p>
              <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> MEMORY SEALED
              </div>
            </div>

            {/* Step 3: Verifiable proof */}
            <div className="bg-[#05060a]/80 border border-slate-900 rounded-xl p-4 flex flex-col gap-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">
                  On-Chain Executor
                </span>
                <Shield className="w-3.5 h-3.5 text-[#FF4A00]" />
              </div>
              <span className="text-xs font-semibold text-slate-200">3. Attested Settlement</span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Smart contracts verify hardware signatures before executing swap rules.
              </p>
              <div className="font-mono text-[9px] text-slate-600 bg-slate-950 p-2 rounded truncate">
                sign: MIIBIjANBgkqhkiG9w0BAQEFAAOC...
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          <div className="border border-border/80 bg-[#0c0e14]/40 rounded-xl p-6 flex flex-col gap-3 text-left">
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/25 flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-[#FF4A00]" />
            </div>
            <h3 className="font-semibold text-sm text-slate-200">Decentralized FTSOv2</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connects directly to Flare Time Series Oracle (FTSOv2) feeds to fetch real-time,
              high-fidelity asset prices and collateral bounds.
            </p>
          </div>

          <div className="border border-border/80 bg-[#0c0e14]/40 rounded-xl p-6 flex flex-col gap-3 text-left">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
              <BrainCircuit className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-sm text-slate-200">Confidential TEE Compute</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluates portfolio allocations and simulated risk thresholds inside secure hardware
              enclaves, hiding active holdings from host node operators.
            </p>
          </div>

          <div className="border border-border/80 bg-[#0c0e14]/40 rounded-xl p-6 flex flex-col gap-3 text-left">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
              <Cpu className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-sm text-slate-200">Attested Execution Proofs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Produces verifiable cryptographic passports containing hardware attestation signatures
              to approve executor contract rebalances.
            </p>
          </div>
        </div>
      </main>

      {/* Landing Footer */}
      <footer className="border-t border-border/40 py-6 mt-auto relative z-10 bg-[#05060a]/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
          <div>© 2026 Aegis Confidential Compute. Built on Flare Network.</div>
          <div className="flex gap-4">
            <a
              href="https://github.com/0xaje/aegis"
              className="hover:text-slate-400 transition-colors"
            >
              GitHub Repository
            </a>
            <span>•</span>
            <span>Coston2 Testnet Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
