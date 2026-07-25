import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Sidebar, Header, Button } from '@aegis/ui';
import {
  LayoutDashboard,
  BrainCircuit,
  Play,
  Shield,
  History,
  Settings,
  Cpu,
  LogIn,
  LogOut,
} from 'lucide-react';

export interface RouteLayoutProps {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RouteLayout({ isConnected, setIsConnected }: RouteLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Items
  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      active: location.pathname === '/app/dashboard',
      onClick: () => navigate('/app/dashboard'),
    },
    {
      label: 'Intelligence Report',
      icon: <BrainCircuit className="w-4 h-4" />,
      active: location.pathname === '/app/intelligence',
      onClick: () => navigate('/app/intelligence'),
    },
    {
      label: 'Simulation',
      icon: <Play className="w-4 h-4" />,
      active: location.pathname === '/app/simulation',
      onClick: () => navigate('/app/simulation'),
    },
    {
      label: 'Execution',
      icon: <Shield className="w-4 h-4" />,
      active: location.pathname === '/app/execution',
      onClick: () => navigate('/app/execution'),
    },
    {
      label: 'Attestation History',
      icon: <History className="w-4 h-4" />,
      active: location.pathname === '/app/history',
      onClick: () => navigate('/app/history'),
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      active: location.pathname === '/app/settings',
      onClick: () => navigate('/app/settings'),
    },
  ];

  const handleWalletToggle = () => {
    setIsConnected((prev) => !prev);
  };

  // Header Title Builder matching active routes paths
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/app/dashboard':
        return 'Dashboard Overview';
      case '/app/intelligence':
        return 'Confidential Intelligence Report';
      case '/app/simulation':
        return 'Private Strategy Simulation';
      case '/app/execution':
        return 'TEE Transaction Execution';
      case '/app/history':
        return 'Verification History';
      case '/app/settings':
        return 'Network Settings';
      default:
        return 'Aegis Platform';
    }
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col font-sans">
      {/* Top Banner Status Bar */}
      <div className="w-full bg-indigo-950/20 border-b border-slate-800/40 py-2.5 px-6">
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
        {/* Sidebar layouts */}
        <Sidebar
          className="hidden md:flex shrink-0"
          logo={
            <div className="flex items-center gap-2 select-none">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-sm tracking-wider text-white">AEGIS</span>
            </div>
          }
          navItems={navItems}
          footer={
            <div className="flex flex-col gap-3">
              {isConnected ? (
                <>
                  <div className="bg-[#0c0e14] p-3 rounded-lg border border-slate-900 font-mono text-[9px] text-slate-500 truncate">
                    0x9bB5e65789d4BBa65a9530de7bd0709d005fE4
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full gap-1.5 h-9"
                    onClick={handleWalletToggle}
                  >
                    <LogOut className="w-3.5 h-3.5" /> Disconnect
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full gap-1.5 h-9"
                  onClick={handleWalletToggle}
                >
                  <LogIn className="w-3.5 h-3.5" /> Connect Wallet
                </Button>
              )}
            </div>
          }
        />

        {/* Content body layout container */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            title={getHeaderTitle()}
            subtitle="Confidential Financial Intelligence built on Flare"
            actions={
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-850"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </div>
            }
          />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col gap-6">
            <Outlet context={{ isConnected, setIsConnected }} />
          </main>
        </div>
      </div>
    </div>
  );
}
