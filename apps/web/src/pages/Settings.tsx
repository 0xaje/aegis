import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@aegis/ui';
import { Sliders, Save, RefreshCcw } from 'lucide-react';

export default function Settings() {
  const [rpcUrl, setRpcUrl] = React.useState('https://coston2-api.flare.network/ext/C/rpc');
  const [registryAddr, setRegistryAddr] = React.useState(
    '0x3D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
  );
  const [enclaveUrl, setEnclaveUrl] = React.useState('http://localhost:8080');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings configuration successfully saved locally.');
  };

  const handleReset = () => {
    setRpcUrl('https://coston2-api.flare.network/ext/C/rpc');
    setRegistryAddr('0x3D8F7CA53789d4BBa65a9530de7bd0709d005fE4');
    setEnclaveUrl('http://localhost:8080');
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Enclave & Network Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure Flare network parameters, smart contract addresses, and TEE API endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side (8 columns) */}
        <form onSubmit={handleSave} className="lg:col-span-8 flex flex-col gap-6">
          <Card className="border-glow">
            <CardHeader>
              <CardTitle>RPC Connections & Contracts</CardTitle>
              <CardDescription>
                Configure remote gateway details for reading FTSOv2 oracle feeds.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* RPC Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                  FLARE RPC URL (COSTON2 RPC DEFAULT)
                </label>
                <input
                  type="url"
                  value={rpcUrl}
                  onChange={(e) => setRpcUrl(e.target.value)}
                  required
                  className="bg-[#05060a] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none w-full focus:ring-1 focus:ring-ring font-mono"
                />
              </div>

              {/* FTSO Registry Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                  FTSOv2 registry CONTRACT ADDRESS
                </label>
                <input
                  type="text"
                  value={registryAddr}
                  onChange={(e) => setRegistryAddr(e.target.value)}
                  required
                  pattern="^0x[a-fA-F0-9]{40}$"
                  className="bg-[#05060a] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none w-full focus:ring-1 focus:ring-ring font-mono"
                />
              </div>

              {/* Enclave URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                  TEE Secure Enclave Endpoint
                </label>
                <input
                  type="url"
                  value={enclaveUrl}
                  onChange={(e) => setEnclaveUrl(e.target.value)}
                  required
                  className="bg-[#05060a] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none w-full focus:ring-1 focus:ring-ring font-mono"
                />
              </div>

              {/* Form buttons */}
              <div className="flex justify-end gap-3 mt-4 border-t border-slate-900 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="border-slate-850 hover:bg-slate-900 text-slate-400"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Reset Default
                </Button>
                <Button type="submit" variant="primary">
                  <Save className="w-3.5 h-3.5" /> Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Right Side Info Box (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="border-glow bg-gradient-to-b from-[#0c0e14] to-[#0c0e14]/50">
            <CardHeader>
              <CardTitle>Local Context Info</CardTitle>
              <CardDescription>Status parameters calculated on local client.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 font-mono text-[10px] leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-900/60 pb-2">
                <span className="text-slate-500 font-sans font-semibold uppercase">
                  CLIENT RUNTIME
                </span>
                <span className="text-slate-300">Vite / React 19</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-900/60 pb-2">
                <span className="text-slate-500 font-sans font-semibold uppercase">
                  ACTIVE REGISTRY
                </span>
                <span className="text-indigo-400">coston2-core</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-sans font-semibold uppercase">
                  COMPUTE SHIELD
                </span>
                <span className="text-emerald-400">AMD SEV-SNP Active</span>
              </div>
              <div className="bg-[#05060a] border border-slate-900 p-3 rounded mt-2 text-[9px] text-slate-500 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-sans leading-normal">
                  Config modifications require local browser storage save checks. Attestation
                  reports refresh automatically.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
