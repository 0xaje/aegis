import { Link } from 'react-router-dom';
import { Shield, BrainCircuit, Activity, Cpu, ArrowRight } from 'lucide-react';
import { Button } from '@aegis/ui';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Landing Nav */}
      <header className="border-b border-border/40 bg-[#05060a]/40 backdrop-blur-md relative z-10">
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
            <Button variant="primary" size="sm">
              Launch App <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Banner Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center gap-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-[10px] font-semibold text-indigo-400 font-mono tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          CONFIDENTIAL PORTFOLIO ANALYTICS BUILT ON FLARE
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl">
          Verifiable Private Intelligence <br className="hidden md:inline" />
          for Crypto Asset Portfolios
        </h1>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mt-2">
          Aegis privately analyzes asset balances, verifies risk models inside secure enclaves, and
          executes verified swaps. Protected calculations backed by hardware attestation keys.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <Link to="/app/dashboard">
            <Button size="lg" variant="primary">
              Connect Secure Wallet
            </Button>
          </Link>
          <a href="https://github.com/0xaje/aegis" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-slate-800 text-slate-300">
              Read Smart Contracts
            </Button>
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24">
          {/* Box 1 */}
          <div className="border border-border bg-[#0c0e14]/60 rounded-xl p-6 flex flex-col gap-4 text-left border-glow">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#FF4A00]" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-200">Decentralized FTSOv2</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Connects directly to Flare Time Series Oracle (FTSOv2) feeds to fetch real-time,
                high-fidelity asset prices and collateral bounds.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="border border-border bg-[#0c0e14]/60 rounded-xl p-6 flex flex-col gap-4 text-left border-glow">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-200">Confidential TEE Compute</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Evaluates portfolio allocations and simulated risk thresholds inside secure hardware
                enclaves, hiding active holdings from host node operators.
              </p>
            </div>
          </div>

          {/* Box 3 */}
          <div className="border border-border bg-[#0c0e14]/60 rounded-xl p-6 flex flex-col gap-4 text-left border-glow">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-200">Attested Execution Proofs</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Produces verifiable cryptographic passports containing hardware attestation
                signatures to approve executor contract rebalances.
              </p>
            </div>
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
