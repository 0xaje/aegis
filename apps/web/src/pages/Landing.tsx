import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

export default function Landing() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      q: 'How is Aegis different from standard ZK-proofs?',
      a: 'While ZK-proofs verify calculations without revealing data, they can be computationally expensive for complex logic. Aegis uses TEEs (Trusted Execution Environments) to handle heavy computation at native speeds while maintaining strict data privacy.',
    },
    {
      q: 'Does Aegis have access to my strategy logic?',
      a: 'No. Your strategy logic is encrypted and only decrypted within the secure enclave of the hardware. Neither Aegis nor the node operator can view the plaintext code or the parameters during execution.',
    },
    {
      q: 'What assets are supported for intelligence reports?',
      a: 'Currently, we support all major Layer 1 assets, EVM-compatible tokens, and institutional-grade RWA (Real World Assets) tracked via the Flare Time Series Oracle (FTSO).',
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden bg-cyber-grid transition-colors">
      {/* TopNavBar */}
      <nav className="glass-panel font-sans text-sm sticky top-0 z-50 border-b shadow-2xl flex justify-between items-center px-6 py-3.5 w-full">
        <div className="flex items-center gap-8">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/25">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Aegis
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center px-4 py-1.5 bg-slate-900/90 rounded-full border border-white/10 focus-within:border-cyan-500/50 transition-colors backdrop-blur-md">
            <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
            <input
              className="bg-transparent border-none focus:outline-none text-xs w-36 ml-2 text-slate-200 placeholder:text-slate-500"
              placeholder="Search strategies..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Day / Night Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Day (Light)' : 'Night (Dark)'} mode`}
            className="p-2 rounded-full hover:bg-slate-800/80 text-slate-300 focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none cursor-pointer transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} view`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>
          <button
            onClick={() => navigate('/app/dashboard')}
            className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-cyan-400/30"
          >
            Launch Platform
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-20 px-6 hero-gradient overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950/60 to-[#030712]" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center z-10 py-12"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.9)]"></span>
              <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase">
                Secure On-Chain Intelligence
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto text-white">
              Confidential{' '}
              <span className="text-gradient-primary text-glow">Financial Intelligence</span>
            </h1>
            <p className="font-sans text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Analyze, simulate, and execute on-chain strategies with the unparalleled security of
              Flare Confidential Compute. Protect your alpha in the dark.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/app/dashboard')}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-sans font-bold text-base px-10 py-4 rounded-xl hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110 active:scale-[0.98] transition-all border border-cyan-400/40 cursor-pointer shadow-lg"
              >
                Launch Platform
              </button>
            </div>
          </motion.div>
        </section>

        {/* Problem/Solution Bento Grid */}
        <section className="py-xl px-lg max-w-container-max mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-headline-md text-headline-md mb-sm">Redefining Digital Privacy</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Modern institutional finance requires radical transparency for auditing, but absolute
              privacy for execution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg h-full">
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-2 glass-card rounded-xl p-xl flex flex-col justify-between overflow-hidden relative group"
            >
              <div className="z-10">
                <div className="mb-lg bg-error-container/20 w-fit p-md rounded-xl">
                  <span className="material-symbols-outlined text-error text-[32px]">
                    visibility_off
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-md">
                  The Transparency Paradox
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md max-w-md">
                  Public ledgers leak intent before execution. Front-running, sandwich attacks, and
                  strategy mirroring erode institutional edge.
                </p>
              </div>
              <div className="mt-xl h-48 rounded-lg overflow-hidden border border-outline-variant/20 relative">
                <img
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  alt="Financial flows visualization"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ_Xe0mtpu6kE2WirSG7FcefVCtF0dMKtbMPWidYaaF-YYNbkLIw3ymD4B1YrZkiUXGsJt9avUPmpW1Vx3KLts8LsmQKUg90sqPsS_k1BpgCFazegCIrr7wcfGz-vtnFPsD2J9sdyLxvXJeuppk3qhq4osot8AxAGCIVOK1mFGi70lXN2qhGTOpsMk7v3bR-sq5hwhrEwjNPAL9eAPCq9o6pxNcA0UF4h4qDzwXllnDzhYv_ngDSoUzDMsZYGsF3NmiVLRbpzOv6F8"
                />
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl p-xl flex flex-col h-full"
            >
              <div className="mb-lg bg-tertiary-container/20 w-fit p-md rounded-xl">
                <span className="material-symbols-outlined text-tertiary text-[32px]">
                  security
                </span>
              </div>
              <h3 className="font-title-sm text-title-sm mb-md">Aegis Solution</h3>
              <p className="text-on-surface-variant font-body-sm text-body-sm mb-lg">
                Compute-over-data happens in secure enclaves. Results are verified on-chain, but the
                logic remains hidden.
              </p>
              <ul className="space-y-sm mt-auto">
                <li className="flex items-center gap-sm text-body-sm font-mono-data">
                  <span className="material-symbols-outlined text-tertiary text-sm">
                    check_circle
                  </span>
                  Zero-Knowledge Simulation
                </li>
                <li className="flex items-center gap-sm text-body-sm font-mono-data">
                  <span className="material-symbols-outlined text-tertiary text-sm">
                    check_circle
                  </span>
                  TEEs for Strategy Logic
                </li>
              </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl p-xl flex flex-col md:flex-row items-center gap-lg md:col-span-3"
            >
              <div className="flex-1">
                <h3 className="font-headline-md text-headline-md mb-md">Institutional Integrity</h3>
                <p className="text-on-surface-variant">
                  Aegis bridges the gap between trustless execution and strategic secrecy, ensuring
                  your competitive advantage is never compromised by the medium it's built on.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md w-full md:w-auto">
                <div className="text-center p-md border-premium rounded-lg bg-surface-container-low">
                  <div className="text-primary font-display-lg text-display-lg-mobile font-bold">
                    100%
                  </div>
                  <div className="text-label-caps font-label-caps uppercase text-on-surface-variant">
                    Encrypted
                  </div>
                </div>
                <div className="text-center p-md border-premium rounded-lg bg-surface-container-low">
                  <div className="text-tertiary font-display-lg text-display-lg-mobile font-bold">
                    &lt;1ms
                  </div>
                  <div className="text-label-caps font-label-caps uppercase text-on-surface-variant">
                    Latency
                  </div>
                </div>
                <div className="text-center p-md border-premium rounded-lg bg-surface-container-low">
                  <div className="text-primary font-display-lg text-display-lg-mobile font-bold">
                    Zk
                  </div>
                  <div className="text-label-caps font-label-caps uppercase text-on-surface-variant">
                    Proofing
                  </div>
                </div>
                <div className="text-center p-md border-premium rounded-lg bg-surface-container-low">
                  <div className="text-on-secondary-container font-display-lg text-display-lg-mobile font-bold">
                    99%
                  </div>
                  <div className="text-label-caps font-label-caps uppercase text-on-surface-variant">
                    Uptime
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Flare Technology Section */}
        <section className="py-xl bg-surface-container-lowest overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none" />
          <div className="max-w-container-max mx-auto px-lg grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div>
              <h2 className="font-display-lg text-display-lg mb-lg leading-tight">
                Built on the <br />
                <span className="text-primary">Flare Infrastructure.</span>
              </h2>
              <div className="space-y-lg">
                <div className="flex gap-lg group">
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center border border-outline-variant/30 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary">hub</span>
                  </div>
                  <div>
                    <h4 className="font-title-sm text-title-sm mb-xs">FTSOv2 Data Oracles</h4>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">
                      Access high-integrity, decentralized price feeds directly from the Flare
                      network with sub-second finality and multi-source verification.
                    </p>
                  </div>
                </div>
                <div className="flex gap-lg group">
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center border border-outline-variant/30 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary">lock</span>
                  </div>
                  <div>
                    <h4 className="font-title-sm text-title-sm mb-xs">
                      Confidential Compute (TEEs)
                    </h4>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">
                      Leverage Trusted Execution Environments to process sensitive trade data
                      without revealing details to node operators or the public ledger.
                    </p>
                  </div>
                </div>
                <div className="flex gap-lg group">
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center border border-outline-variant/30 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary">token</span>
                  </div>
                  <div>
                    <h4 className="font-title-sm text-title-sm mb-xs">State Connector</h4>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">
                      Trustlessly verify events from other blockchains to trigger confidential
                      execution based on real-world or cross-chain state changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-full aspect-square max-w-md rounded-2xl border-premium bg-surface p-sm relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                <img
                  className="w-full h-full object-cover rounded-xl relative z-10"
                  alt="3D Rendering Microchip"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDblVwJAkw1RmPlzJ4acHM-5JFEHZrRpzH9HznPYLaeg-s3MZmbiRjFXbRyhjDB2nJqxyADqNQ00bPI_jRo0trow6HHg-AcshVeYQ0XNwWmV15JK7juABFAW1B7UqVQlUzHWSoO9DqUoehCkEio_6EuYihaebIqZit5U06phR13e-lvtxMs6NWEn7PEDfNhljvKy9v0az0-XkynueF8xzIUSgcZm0e90zzFXbjIUo562BH_CwvwDRysFCLaAZJ_rWQfgOjgX8MPumBS"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Step-by-Step */}
        <section className="py-xl px-lg max-w-container-max mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-headline-md text-headline-md mb-sm">The Aegis Lifecycle</h2>
            <p className="text-on-surface-variant">
              From raw data to private execution in four seamless phases.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
            {/* Step 1 */}
            <div
              className="relative flex flex-col items-center text-center group cursor-pointer"
              onClick={() => navigate('/app/intelligence')}
            >
              <div className="w-16 h-16 rounded-full border-premium bg-surface-container-high flex items-center justify-center mb-md relative z-10 step-line group-hover:bg-primary-container transition-all">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container">
                  analytics
                </span>
              </div>
              <div className="font-label-caps text-label-caps text-primary mb-xs">Phase 01</div>
              <h4 className="font-title-sm text-title-sm mb-sm text-on-surface">Analyze</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Ingest market data via FTSO or private API feeds into the secure enclave.
              </p>
            </div>
            {/* Step 2 */}
            <div
              className="relative flex flex-col items-center text-center group cursor-pointer"
              onClick={() => navigate('/app/dashboard')}
            >
              <div className="w-16 h-16 rounded-full border-premium bg-surface-container-high flex items-center justify-center mb-md relative z-10 step-line group-hover:bg-primary-container transition-all">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container">
                  science
                </span>
              </div>
              <div className="font-label-caps text-label-caps text-primary mb-xs">Phase 02</div>
              <h4 className="font-title-sm text-title-sm mb-sm text-on-surface">Simulate</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Run backtests and risk calculations against encrypted historical data.
              </p>
            </div>
            {/* Step 3 */}
            <div
              className="relative flex flex-col items-center text-center group cursor-pointer"
              onClick={() => navigate('/app/dashboard')}
            >
              <div className="w-16 h-16 rounded-full border-premium bg-surface-container-high flex items-center justify-center mb-md relative z-10 step-line group-hover:bg-primary-container transition-all">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container">
                  verified_user
                </span>
              </div>
              <div className="font-label-caps text-label-caps text-primary mb-xs">Phase 03</div>
              <h4 className="font-title-sm text-title-sm mb-sm text-on-surface">Verify</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Generate a hardware attestation proof that your risk calculation logic is valid.
              </p>
            </div>
            {/* Step 4 */}
            <div
              className="relative flex flex-col items-center text-center group cursor-pointer"
              onClick={() => navigate('/app/dashboard')}
            >
              <div className="w-16 h-16 rounded-full border-premium bg-surface-container-high flex items-center justify-center mb-md relative z-10 group-hover:bg-primary-container transition-all">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container">
                  bolt
                </span>
              </div>
              <div className="font-label-caps text-label-caps text-primary mb-xs">Phase 04</div>
              <h4 className="font-title-sm text-title-sm mb-sm text-on-surface">Execute</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Atomically deploy your strategy via private Flare Confidential Compute nodes.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-xl px-lg max-w-3xl mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-headline-md text-headline-md mb-sm">Common Inquiries</h2>
            <p className="text-on-surface-variant">
              Everything you need to know about our confidential infrastructure.
            </p>
          </div>
          <div className="space-y-md">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    className="w-full px-lg py-md flex justify-between items-center text-left hover:bg-surface-bright/50 transition-colors cursor-pointer outline-none"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="font-title-sm text-title-sm">{item.q}</span>
                    <span
                      className="material-symbols-outlined text-primary transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-lg pb-md text-on-surface-variant font-body-sm text-body-sm border-t border-outline-variant/10 pt-sm">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-xl px-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20" />
          <div className="max-w-2xl mx-auto py-xl">
            <h2 className="font-display-lg text-display-lg mb-md">Secure Your Edge Today.</h2>
            <p className="text-on-surface-variant mb-lg font-body-md text-body-md">
              Join the exclusive group of institutional operators utilizing Aegis for confidential
              execution.
            </p>
            <button
              onClick={() => navigate('/app/dashboard')}
              className="bg-primary text-on-primary font-title-sm text-title-sm px-xl py-md rounded-lg hover:brightness-110 shadow-xl shadow-primary/20 active:scale-95 transition-all cursor-pointer"
            >
              Launch Platform
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest font-body-sm text-body-sm w-full py-xl border-t border-outline-variant/10 flat">
        <div className="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-start gap-xl">
          <div className="space-y-md">
            <span className="font-title-sm text-title-sm font-bold text-on-surface block">
              Aegis Intelligence
            </span>
            <p className="text-on-surface-variant max-w-xs">
              The institutional standard for confidential decentralized finance and secure
              simulation.
            </p>
            <div className="flex gap-md">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                public
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                hub
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                terminal
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-xl w-full md:w-auto">
            <div>
              <h5 className="font-label-caps text-label-caps text-on-surface mb-md uppercase">
                Product
              </h5>
              <ul className="space-y-sm text-on-surface-variant">
                <li
                  onClick={() => navigate('/app/intelligence')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Intelligence
                </li>
                <li
                  onClick={() => navigate('/app/dashboard')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Dashboard
                </li>
                <li
                  onClick={() => navigate('/app/execution')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Execution
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-label-caps text-label-caps text-on-surface mb-md uppercase">
                Resources
              </h5>
              <ul className="space-y-sm text-on-surface-variant">
                <li
                  onClick={() => window.open('https://flare.network', '_blank')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Flare Network
                </li>
                <li
                  onClick={() => navigate('/app/dashboard')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Documentation
                </li>
                <li
                  onClick={() => window.open('https://github.com/0xaje/aegis', '_blank')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Whitepaper
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-label-caps text-label-caps text-on-surface mb-md uppercase">
                Legal
              </h5>
              <ul className="space-y-sm text-on-surface-variant">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Terms of Service
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Cookie Policy
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-lg mt-xl pt-lg border-t border-outline-variant/10 text-on-surface-variant/60 flex flex-col md:flex-row justify-between items-center gap-md">
          <p>© 2026 Aegis Financial Intelligence. All rights reserved.</p>
          <div className="flex gap-lg">
            <span className="hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span
              onClick={() => window.open('https://flare.network', '_blank')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Flare Network
            </span>
            <span
              onClick={() => navigate('/app/dashboard')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Documentation
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
