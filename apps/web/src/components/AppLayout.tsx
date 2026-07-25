import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  BrainCircuit,
  Play,
  History,
  Settings,
  Cpu,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@aegis/ui';

export function AppLayout() {
  const navItems = [
    { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/app/intelligence', label: 'Intelligence', icon: BrainCircuit },
    { to: '/app/simulation', label: 'Simulation', icon: Play },
    { to: '/app/execution', label: 'Execution', icon: Shield },
    { to: '/app/history', label: 'Attestation History', icon: History },
    { to: '/app/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col font-sans">
      {/* Top Banner Status Bar */}
      <div className="w-full bg-indigo-950/20 border-b border-border/60 py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-indigo-300">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Enclave TEE Node active: coston2-node-0x1a</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-500">
            <span>
              Attestation check: <span className="text-emerald-400 font-semibold">PASSED</span>
            </span>
            <span className="border-l border-slate-800 pl-4">Sig: 0xae63...7124</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r border-border bg-[#07080c] flex flex-col justify-between shrink-0 p-6 gap-6">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 select-none">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                  AEGIS
                </span>
                <span className="text-[8px] block text-slate-500 font-mono tracking-widest leading-none">
                  FLARE PLATFORM
                </span>
              </div>
            </Link>

            {/* Nav Menu */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all select-none
                      ${
                        isActive
                          ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="flex flex-col gap-4 border-t border-slate-900 pt-6">
            <div className="flex items-center gap-2 bg-[#0c0e14] p-3 rounded-lg border border-border/80">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-300 block truncate">
                  User Wallet
                </span>
                <span className="text-[9px] font-mono text-slate-500 block truncate">
                  0x9bB5...5fE4
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </div>

            <Link to="/">
              <Button
                variant="outline"
                className="w-full text-xs h-9 justify-center border-slate-800"
              >
                Return to Landing
              </Button>
            </Link>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 bg-[#05060a] p-6 md:p-8 flex flex-col max-w-7xl w-full mx-auto gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
