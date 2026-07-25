import { Sidebar, Header } from './Layouts.js';
import { Button } from './Button.js';
import { LayoutDashboard, BrainCircuit, Shield, Cpu } from 'lucide-react';

export default {
  title: 'Layout/Workspace',
  component: Sidebar,
};

export const SidebarExample = () => (
  <div className="flex min-h-[400px] border border-slate-800 rounded-xl overflow-hidden max-w-sm">
    <Sidebar
      logo={
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-500" />
          <span className="font-bold text-sm tracking-wider text-white">AEGIS</span>
        </div>
      }
      navItems={[
        { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, active: true },
        { label: 'Intelligence', icon: <BrainCircuit className="w-4 h-4" />, active: false },
        { label: 'Execution', icon: <Shield className="w-4 h-4" />, active: false },
      ]}
      footer={
        <div className="flex flex-col gap-2">
          <div className="bg-[#0c0e14] p-3 rounded-lg border border-slate-900 font-mono text-[9px] text-slate-500">
            0x9bB5...5fE4
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Disconnect
          </Button>
        </div>
      }
    />
  </div>
);

export const HeaderExample = () => (
  <div className="max-w-xl w-full p-4">
    <Header
      title="Asset Reallocation"
      subtitle="Configure secure swap parameters inside hardware shields."
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-950/20 border border-indigo-900/30 text-[9px] font-mono text-indigo-400 font-semibold">
            <Cpu className="w-3 h-3 animate-pulse" /> TEE: ACTIVE
          </div>
          <Button size="sm">Connect Wallet</Button>
        </div>
      }
    />
  </div>
);
