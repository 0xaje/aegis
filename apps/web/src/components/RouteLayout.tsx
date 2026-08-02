import * as React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Sidebar, Header, Button, cn } from '@aegis/ui';
import {
  LayoutDashboard,
  BrainCircuit,
  Shield,
  History,
  Settings,
  Cpu,
  LogIn,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  User,
  Copy,
  AlertTriangle,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { flareTestnet } from 'viem/chains';

export function RouteLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Wagmi Web3 Hooks
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Layout States
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [connectModalOpen, setConnectModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const isWrongNetwork = isConnected && chainId !== flareTestnet.id;

  // Keyboard Shortcuts Event Listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setConnectModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation Items aligned with 4-stage narrative
  const navItems = [
    {
      label: 'Executive Overview',
      icon: <LayoutDashboard className="w-4 h-4 text-cyan-400" />,
      active: location.pathname === '/app/dashboard',
      onClick: () => navigate('/app/dashboard'),
    },
    {
      label: 'Confidential Intelligence',
      icon: <BrainCircuit className="w-4 h-4 text-cyan-400" />,
      active: location.pathname === '/app/intelligence',
      onClick: () => navigate('/app/intelligence'),
    },
    {
      label: 'On-Chain Execution',
      icon: <Shield className="w-4 h-4 text-cyan-400" />,
      active: location.pathname === '/app/execution',
      onClick: () => navigate('/app/execution'),
    },
    {
      label: 'Decision Passports',
      icon: <History className="w-4 h-4 text-cyan-400" />,
      active: location.pathname === '/app/history',
      onClick: () => navigate('/app/history'),
    },
    {
      label: 'Platform Settings',
      icon: <Settings className="w-4 h-4 text-cyan-400" />,
      active: location.pathname === '/app/settings',
      onClick: () => navigate('/app/settings'),
    },
  ];

  // Command Palette Options
  const commandOptions = [
    { label: 'Go to Dashboard', action: () => navigate('/app/dashboard') },
    { label: 'Go to Intelligence Report', action: () => navigate('/app/intelligence') },
    { label: 'Go to Execution Pipeline', action: () => navigate('/app/execution') },
    { label: 'Go to Attestation Log', action: () => navigate('/app/history') },
    { label: 'Go to Settings', action: () => navigate('/app/settings') },
    {
      label: isConnected ? 'Disconnect Wallet' : 'Connect Wallet',
      action: () => (isConnected ? triggerDisconnect() : setConnectModalOpen(true)),
    },
  ];

  const filteredCommands = commandOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const triggerDisconnect = () => {
    disconnect();
    setProfileOpen(false);
  };

  return (
    <div className="dark min-h-screen flex flex-col font-sans bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 bg-cyber-grid">
      {/* 1. Wrong Network Warning Banner */}
      {isWrongNetwork && (
        <div className="w-full bg-rose-500/20 border-b border-rose-500/40 py-2.5 px-6 animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Wrong network detected. Aegis calculations require Flare Coston2 Testnet.</span>
            </div>
            <Button
              size="sm"
              className="bg-rose-500 hover:bg-rose-600 text-white border-none h-7 px-3 py-1 font-semibold text-[11px] cursor-pointer"
              onClick={() => switchChain({ chainId: flareTestnet.id })}
            >
              Switch to Flare Coston2
            </Button>
          </div>
        </div>
      )}

      {/* Top Banner Status Bar */}
      <div className="w-full bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-2 px-6 select-none shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-semibold tracking-wide">
              Enclave TEE Gateway: Coston2 Secure Node
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-slate-400">
            <span>
              Network:{' '}
              <span className="text-emerald-400 font-bold">Flare Coston2 (Chain ID 114)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Sidebar */}
        <Sidebar
          className={cn(
            'hidden md:flex shrink-0 transition-all duration-300 border-r border-white/10 bg-slate-950/90 backdrop-blur-2xl shadow-xl',
            sidebarCollapsed ? 'w-20' : 'w-64',
          )}
          logo={
            <div className="flex flex-col gap-1">
              <div
                onClick={() => navigate('/')}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
                  <Shield className="w-5 h-5" />
                </div>
                {!sidebarCollapsed && (
                  <span className="font-display text-xl font-extrabold tracking-tight text-white">
                    Aegis
                  </span>
                )}
              </div>
            </div>
          }
          navItems={navItems.map((item) => ({
            ...item,
            label: sidebarCollapsed ? '' : item.label,
          }))}
          footer={
            <div className="flex flex-col gap-2">
              {isConnected ? (
                <>
                  {!sidebarCollapsed && (
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-white/10 font-mono text-xs text-slate-300 truncate">
                      {address}
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full gap-2 h-9 justify-center font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30"
                    onClick={triggerDisconnect}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {!sidebarCollapsed && <span>Disconnect Wallet</span>}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-1">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full gap-2 h-9 justify-center font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    onClick={() => setConnectModalOpen(true)}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    {!sidebarCollapsed && <span>Connect Wallet</span>}
                  </Button>
                </div>
              )}
            </div>
          }
        />

        {/* Content panel viewports */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <Header
            title={
              location.pathname === '/app/dashboard'
                ? 'Institutional Dashboard'
                : location.pathname === '/app/intelligence'
                  ? 'Confidential Financial Intelligence'
                  : location.pathname === '/app/simulation'
                    ? 'Zero-Knowledge Strategy Simulator'
                    : location.pathname === '/app/execution'
                      ? 'Confidential Execution Pipeline'
                      : location.pathname === '/app/history'
                        ? 'Attestation History Log'
                        : 'Platform Settings'
            }
            subtitle="Confidential Compute powered by Flare TEE Infrastructure"
            className="bg-surface/70 border-b border-outline-variant/10 backdrop-blur-xl"
            actions={
              <div className="flex items-center gap-md relative">
                {/* Search / Command triggers */}
                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  aria-label="Quick command search (Shortcut: Command K)"
                  className="hidden sm:flex items-center gap-sm px-md py-xs rounded-full bg-surface-container border border-outline-variant/20 text-body-sm text-on-surface-variant hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-primary" />
                  <span>Search commands...</span>
                  <kbd className="font-mono-data text-[10px] px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/30 text-on-surface-variant">
                    ⌘K
                  </kbd>
                </button>

                {/* Notifications trigger */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen((prev) => !prev)}
                    aria-label="View system status and notifications"
                    aria-expanded={notificationsOpen}
                    aria-haspopup="true"
                    className="p-2 rounded-full hover:bg-surface-bright/50 text-on-surface-variant relative focus-visible:ring-2 focus-visible:ring-primary outline-none cursor-pointer"
                  >
                    <Bell className="w-5 h-5" />
                  </button>

                  {/* Notifications Dropdown Panel */}
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        role="region"
                        aria-label="Notifications panel"
                        className="absolute right-0 mt-2 w-80 rounded-xl glass-card border border-outline-variant/20 p-sm shadow-2xl z-30 flex flex-col gap-xs"
                      >
                        <div className="px-md py-xs text-label-caps uppercase text-primary border-b border-outline-variant/10 flex justify-between items-center">
                          <span>System Status</span>
                        </div>
                        <div
                          className="flex flex-col max-h-60 overflow-y-auto text-body-sm"
                          role="status"
                          aria-live="polite"
                        >
                          {connectError && (
                            <div className="p-md bg-error-container/20 border-b border-error/20 text-error font-mono-data text-xs">
                              Connection Error: {connectError.message}
                            </div>
                          )}
                          <div className="p-md hover:bg-surface-bright/40 border-b border-outline-variant/10 rounded-lg">
                            <span className="font-semibold text-on-surface block">
                              Flare Coston2 RPC
                            </span>
                            <span className="text-on-surface-variant text-body-sm block mt-xs">
                              Connected to official Flare Coston2 RPC node.
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile wallet dropdown */}
                {isConnected ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen((prev) => !prev)}
                      aria-label="User account wallet profile menu"
                      aria-expanded={profileOpen}
                      aria-haspopup="true"
                      className="flex items-center gap-xs px-md py-xs rounded-full bg-surface-container border border-outline-variant/20 text-body-sm hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary outline-none transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-mono-data hidden sm:inline text-on-surface">
                        {formattedAddress}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant" />
                    </button>

                    {/* Profile Dropdown Panel */}
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-64 rounded-xl glass-card border border-outline-variant/20 p-md shadow-2xl z-30 flex flex-col gap-md"
                        >
                          <div className="flex flex-col gap-xs">
                            <span className="text-label-caps uppercase text-on-surface-variant">
                              Connected Wallet
                            </span>
                            <div className="font-mono-data text-body-sm text-primary truncate bg-surface-container p-xs rounded border border-outline-variant/20">
                              {address}
                            </div>
                          </div>
                          <div className="flex flex-col gap-xs">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-between h-8 border-outline-variant/30 text-on-surface hover:bg-surface-bright/50"
                              onClick={handleCopyAddress}
                            >
                              <span>Copy Address</span>
                              <Copy className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-full justify-between h-8 bg-error-container/30 text-error hover:bg-error-container/50 border border-error/20"
                              onClick={triggerDisconnect}
                            >
                              <span>Disconnect</span>
                              <LogOut className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="gap-xs h-8 px-md font-semibold bg-primary text-on-primary hover:brightness-110 shadow-md shadow-primary/20"
                    onClick={() => setConnectModalOpen(true)}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </Button>
                )}
              </div>
            }
          />

          {/* Router Content Container */}
          <main className="flex-1 p-lg max-w-container-max w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-start justify-center pt-20 px-lg"
            onClick={() => setCommandPaletteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              className="w-full max-w-xl glass-card rounded-xl border border-outline-variant/30 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-lg py-md border-b border-outline-variant/10">
                <Search className="w-5 h-5 text-primary mr-md" />
                <input
                  type="text"
                  placeholder="Type a command or navigate page..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-body-md text-on-surface w-full placeholder:text-on-surface-variant/50 font-sans"
                  autoFocus
                />
                <button
                  onClick={() => setCommandPaletteOpen(false)}
                  className="p-xs text-on-surface-variant hover:text-on-surface rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto p-sm flex flex-col gap-xs">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        cmd.action();
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full text-left px-md py-sm rounded-lg hover:bg-surface-bright/50 text-body-sm text-on-surface flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{cmd.label}</span>
                      <span className="material-symbols-outlined text-primary text-sm">
                        arrow_forward
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-lg text-center text-on-surface-variant font-body-sm">
                    No matching commands found.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect Wallet Modal */}
      <AnimatePresence>
        {connectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-lg"
            onClick={() => setConnectModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-md glass-card rounded-2xl border border-outline-variant/30 p-xl shadow-2xl flex flex-col gap-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-outline-variant/10 pb-md">
                <div className="flex items-center gap-md">
                  <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-title-sm text-on-surface">
                      Connect Web3 Wallet
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">Flare Coston2 Testnet</p>
                  </div>
                </div>
                <button
                  onClick={() => setConnectModalOpen(false)}
                  className="p-xs text-on-surface-variant hover:text-on-surface rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-md">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => {
                      connect({ connector });
                      setConnectModalOpen(false);
                    }}
                    className="w-full p-md rounded-xl bg-surface-container border border-outline-variant/20 hover:border-primary/50 hover:bg-surface-bright/50 flex items-center justify-between text-body-sm text-on-surface transition-all cursor-pointer"
                  >
                    <span className="font-semibold">{connector.name}</span>
                    <span className="material-symbols-outlined text-primary">
                      account_balance_wallet
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
