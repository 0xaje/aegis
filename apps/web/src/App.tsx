import { motion } from 'framer-motion';
import { Shield, Coins, BrainCircuit, Activity } from 'lucide-react';
import { Button } from '@aegis/ui';

function App() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800/80 sticky top-0 bg-[#090a0f]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                AEGIS
              </span>
              <span className="text-[10px] block text-slate-500 font-mono tracking-widest leading-none">
                FLARE NETWORK
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
            <a href="#dashboard" className="hover:text-white transition-colors text-white">
              Dashboard
            </a>
            <a href="#strategies" className="hover:text-white transition-colors">
              Strategies
            </a>
            <a href="#enclaves" className="hover:text-white transition-colors">
              Confidential Compute
            </a>
            <a
              href="#ftsos"
              className="hover:text-white transition-colors font-semibold text-indigo-400"
            >
              FTSOv2 Feeds
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-slate-800 hover:bg-slate-900 text-slate-300"
            >
              Launch App
            </Button>
            <Button variant="primary">Connect Wallet</Button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Banner with entry micro-animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-[#121420] to-[#0d0e15] p-8 md:p-12 shadow-xl glow-indigo"
        >
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-2xl flex flex-col gap-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              FLARE CONFIDENTIAL COMPUTE ACTIVE
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Confidential Financial Intelligence
            </h1>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Securely analyze, simulated, verify portfolio allocations, and deploy automated
              contract execution strategies without exposing confidential positions.
            </p>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-slate-800/60 rounded-xl bg-[#11131c] p-6 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-[#FF4A00]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">FTSOv2 Feeds</h3>
              <p className="text-sm text-slate-400 mt-1">
                Real-time dApp asset feeds queried directly from decentralized oracle providers.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-slate-800/60 rounded-xl bg-[#11131c] p-6 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Enclave Verification</h3>
              <p className="text-sm text-slate-400 mt-1">
                Secure enclaves evaluate asset weights and execute private, verifiable risk
                analyses.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border border-slate-800/60 rounded-xl bg-[#11131c] p-6 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Flare Contract Registry</h3>
              <p className="text-sm text-slate-400 mt-1">
                Automated address lookup for system-integrated smart contracts on Flare chain.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 mt-12 bg-[#090a0f]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>© 2026 Aegis Confidential Compute Inc. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-slate-400">
              Terms
            </a>
            <a href="#privacy" className="hover:text-slate-400">
              Privacy
            </a>
            <a href="#github" className="hover:text-slate-400">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
