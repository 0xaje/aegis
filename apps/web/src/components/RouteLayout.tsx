import * as React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Sidebar, Header, Button, cn } from '@aegis/ui';
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
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  User,
  Copy,
  Terminal,
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
  const [isDarkMode, setIsDarkMode] = React.useState(true);
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

  // Command Palette Options
  const commandOptions = [
    { label: 'Go to Dashboard', action: () => navigate('/app/dashboard') },
    { label: 'Go to Intelligence Report', action: () => navigate('/app/intelligence') },
    { label: 'Go to Simulation', action: () => navigate('/app/simulation') },
    { label: 'Go to Execution', action: () => navigate('/app/execution') },
    { label: 'Go to Attestation History', action: () => navigate('/app/history') },
    { label: 'Go to Settings', action: () => navigate('/app/settings') },
    {
      label: isConnected ? 'Disconnect Wallet' : 'Connect Wallet',
      action: () => (isConnected ? disconnect() : setConnectModalOpen(true)),
    },
  ];

  const filteredCommands = commandOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formattedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Wallet address copied to clipboard');
    }
  };

  const triggerDisconnect = () => {
    disconnect();
    setProfileOpen(false);
  };

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col font-sans transition-colors duration-250',
        isDarkMode ? 'bg-[#05060a] text-slate-100' : 'bg-slate-50 text-slate-900',
      )}
    >
      {/* 1. Wrong Network Warning Banner */}
      {isWrongNetwork && (
        <div className="w-full bg-rose-950/30 border-b border-rose-900/40 py-2.5 px-6 animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-rose-455 text-rose-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Wrong network detected. Aegis calculations require Flare Coston2.</span>
            </div>
            <Button
              size="sm"
              className="bg-rose-900/80 hover:bg-rose-900 hover:text-white border-none h-7 px-3 py-1 font-semibold text-[10px]"
              onClick={() => switchChain({ chainId: flareTestnet.id })}
            >
              Switch to Flare Coston2
            </Button>
          </div>
        </div>
      )}

      {/* Top Banner Status Bar */}
      <div
        className={cn(
          'w-full border-b py-2.5 px-6 select-none',
          isDarkMode ? 'bg-indigo-950/20 border-slate-800/40' : 'bg-indigo-50/40 border-slate-200',
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-indigo-455 text-indigo-400">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Enclave TEE Node active: coston2-node-0x1a</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>
              Attestation check: <span className="text-emerald-500 font-semibold">PASSED</span>
            </span>
            <span className="border-l border-slate-800 pl-4">Sig: 0xae63...7124</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Sidebar */}
        <Sidebar
          className={cn(
            'hidden md:flex shrink-0 transition-all duration-300',
            sidebarCollapsed ? 'w-20' : 'w-64',
            isDarkMode ? 'bg-[#07080c]' : 'bg-white border-slate-200',
          )}
          logo={
            <div className="flex items-center gap-2 select-none">
              <Shield className="w-5 h-5 text-indigo-500" />
              {!sidebarCollapsed && <span className="font-bold text-sm tracking-wider">AEGIS</span>}
            </div>
          }
          navItems={navItems.map((item) => ({
            ...item,
            label: sidebarCollapsed ? '' : item.label,
          }))}
          footer={
            <div className="flex flex-col gap-3">
              {isConnected ? (
                <>
                  {!sidebarCollapsed && (
                    <div className="bg-[#0c0e14] p-3 rounded-lg border border-slate-900 font-mono text-[9px] text-slate-500 truncate">
                      {address}
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full gap-1.5 h-9 justify-center font-semibold"
                    onClick={triggerDisconnect}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {!sidebarCollapsed && <span>Disconnect</span>}
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full gap-1.5 h-9 justify-center font-semibold"
                  onClick={() => setConnectModalOpen(true)}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  {!sidebarCollapsed && <span>Connect Wallet</span>}
                </Button>
              )}
            </div>
          }
        />

        {/* Content panel viewports */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <Header
            title={location.pathname === '/app/dashboard' ? 'Dashboard Overview' : 'Aegis Platform'}
            subtitle="Confidential Financial Intelligence built on Flare"
            className={isDarkMode ? 'bg-[#07080c]/30' : 'bg-white border-slate-200'}
            actions={
              <div className="flex items-center gap-4 relative">
                {/* Search / Command triggers */}
                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  className={cn(
                    'hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border outline-none font-sans',
                    isDarkMode
                      ? 'border-slate-800 bg-[#0c0e14]/60 text-slate-400 hover:text-slate-200'
                      : 'border-slate-200 bg-slate-100 text-slate-650 hover:bg-slate-200 text-slate-600',
                  )}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search...</span>
                  <kbd className="font-mono text-[9px] px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 leading-none">
                    ⌘K
                  </kbd>
                </button>

                {/* Notifications trigger */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen((prev) => !prev)}
                    className="p-2 rounded-lg hover:bg-slate-900/40 relative outline-none focus:outline-none"
                  >
                    <Bell className="w-4.5 h-4.5 text-slate-400 hover:text-slate-200" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                  </button>

                  {/* Notifications Dropdown Panel */}
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                          'absolute right-0 mt-2 w-72 rounded-lg border p-1 shadow-lg z-30 flex flex-col gap-1',
                          isDarkMode
                            ? 'bg-[#0c0e14] border-slate-800 text-slate-200'
                            : 'bg-white border-slate-200 text-slate-900',
                        )}
                      >
                        <div className="px-3 py-2 text-[10px] font-mono text-slate-500 uppercase border-b border-slate-900/30">
                          System Alerts
                        </div>
                        <div className="flex flex-col max-h-60 overflow-y-auto text-[11px] leading-normal font-sans">
                          {connectError && (
                            <div className="p-3 bg-rose-950/20 border-b border-rose-900/30 text-rose-400 font-mono text-[10px]">
                              Connection Error: {connectError.message}
                            </div>
                          )}
                          <div className="p-3 hover:bg-slate-900/25 border-b border-slate-900/30">
                            <span className="font-semibold text-slate-200 block">
                              Attestation Verified
                            </span>
                            <span className="text-slate-500 text-[10px] block mt-0.5">
                              Enclave coston2-node-0x1a is active (1 min ago)
                            </span>
                          </div>
                          <div className="p-3 hover:bg-slate-900/25 border-b border-slate-900/30">
                            <span className="font-semibold text-slate-200 block">
                              FTSOv2 Price updated
                            </span>
                            <span className="text-slate-500 text-[10px] block mt-0.5">
                              WFLR/USD checked bounds (5 mins ago)
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dark-mode indicator switcher */}
                <button
                  onClick={() => setIsDarkMode((prev) => !prev)}
                  className="p-2 rounded-lg hover:bg-slate-900/40 outline-none focus:outline-none"
                >
                  {isDarkMode ? (
                    <Sun className="w-4.5 h-4.5 text-slate-400 hover:text-yellow-400" />
                  ) : (
                    <Moon className="w-4.5 h-4.5 text-slate-650 hover:text-slate-900" />
                  )}
                </button>

                {/* Profile wallet dropdown */}
                {isConnected ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen((prev) => !prev)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs outline-none focus:outline-none',
                        isDarkMode
                          ? 'border-slate-800 hover:bg-slate-900/40 text-slate-350'
                          : 'border-slate-200 hover:bg-slate-100 text-slate-700',
                      )}
                    >
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="font-mono hidden sm:inline">{formattedAddress}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Profile Dropdown Panel */}
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className={cn(
                            'absolute right-0 mt-2 w-56 rounded-lg border p-1 shadow-lg z-30 flex flex-col gap-1',
                            isDarkMode
                              ? 'bg-[#0c0e14] border-slate-800 text-slate-200'
                              : 'bg-white border-slate-200 text-slate-900',
                          )}
                        >
                          <div className="px-3 py-2 flex flex-col gap-1.5 border-b border-slate-900/30">
                            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                              User Address
                            </span>
                            <div className="flex items-center justify-between gap-2 bg-[#05060a] p-1.5 rounded border border-slate-900 font-mono text-[9px] text-slate-400 leading-none">
                              <span className="truncate max-w-[120px]">{address}</span>
                              <button onClick={handleCopyAddress} className="hover:text-white">
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col text-xs">
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-slate-900/25 text-slate-300 hover:text-white"
                              onClick={() => {
                                navigate('/app/settings');
                                setProfileOpen(false);
                              }}
                            >
                              Settings Panel
                            </button>
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-slate-900/25 text-rose-400 hover:text-rose-350 font-semibold"
                              onClick={triggerDisconnect}
                            >
                              Disconnect Session
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Button variant="primary" size="sm" onClick={() => setConnectModalOpen(true)}>
                    Connect Wallet
                  </Button>
                )}
              </div>
            }
          />

          {/* Child pages views */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col gap-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 2. Command Palette Overlay Modal */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCommandPaletteOpen(false)}
              className="fixed inset-0 bg-[#05060a]/75 backdrop-blur-[3px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.15 }}
              className="bg-[#0c0e14] border border-slate-800 w-full max-w-lg rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col border-glow"
            >
              <div className="flex items-center gap-3 px-4 border-b border-slate-900/60 py-3.5">
                <Search className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a command or lookup view..."
                  className="bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-500 w-full font-sans"
                  autoFocus
                />
              </div>

              <div className="p-2 max-h-72 overflow-y-auto flex flex-col gap-0.5">
                <div className="px-2 py-1.5 text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none font-bold">
                  Navigation & Tools
                </div>
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        opt.action();
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-350 hover:text-white hover:bg-indigo-600/10 hover:text-indigo-400 rounded-lg flex items-center justify-between group outline-none border border-transparent"
                    >
                      <span className="font-semibold">{opt.label}</span>
                      <Terminal className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center text-xs text-slate-500 font-sans">
                    No matching commands found.
                  </div>
                )}
              </div>

              <div className="bg-[#07080c]/50 px-4 py-2 border-t border-slate-900/60 text-[9px] font-mono text-slate-500 flex items-center justify-between select-none">
                <span>Use keyboard shortcut options or click to execute</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Connect Wallet Select Dialogue Modal */}
      <AnimatePresence>
        {connectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConnectModalOpen(false)}
              className="fixed inset-0 bg-[#05060a]/75 backdrop-blur-[3px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0c0e14] border border-slate-800 w-full max-w-sm rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col border-glow p-6 gap-6 relative"
            >
              <button
                onClick={() => setConnectModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-900/40 outline-none focus:outline-none"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>

              <div className="flex flex-col gap-1 select-none">
                <span className="text-[10px] text-slate-550 text-indigo-400 font-mono tracking-wider uppercase font-semibold">
                  Select Provider Protocol
                </span>
                <h3 className="text-base font-bold text-slate-100">Connect to Aegis Platform</h3>
                <p className="text-xs text-slate-450 text-slate-400 leading-relaxed mt-1">
                  Authenticate your credentials using supported injected or WalletConnect client
                  connectors on Flare Coston2.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => {
                      connect({ connector });
                      setConnectModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#05060a] border border-slate-850 hover:border-indigo-500/40 rounded-xl text-xs text-slate-200 font-semibold transition-all hover:bg-indigo-950/10 group outline-none"
                  >
                    <span>{connector.name}</span>
                    <span className="text-[10px] text-slate-550 group-hover:text-indigo-400 font-mono">
                      Connect →
                    </span>
                  </button>
                ))}
              </div>

              {connectError && (
                <div className="bg-rose-955/10 border border-rose-900/30 rounded-lg p-3 text-[10px] font-mono text-rose-350 leading-normal">
                  Error linking: {connectError.message}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
