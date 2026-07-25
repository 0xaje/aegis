import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@aegis/ui';

export default function Settings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings configuration successfully saved locally.');
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      <form onSubmit={handleSave} className="max-w-2xl w-full flex flex-col gap-6">
        <Card className="border-glow">
          <CardHeader>
            <CardTitle>Network & Enclave Setup</CardTitle>
            <CardDescription>
              Configure connection parameters for reading FTSOv2 pricing feeds and verifying TEEs.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* Input 1 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                Flare Coston2 RPC Gateway
              </label>
              <input
                type="url"
                defaultValue="https://coston2-api.flare.network/ext/C/rpc"
                required
                className="bg-[#05060a] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none w-full focus:ring-1 focus:ring-ring font-mono"
              />
            </div>

            {/* Input 2 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
                TEE Secure Enclave URL
              </label>
              <input
                type="url"
                defaultValue="http://localhost:8080"
                required
                className="bg-[#05060a] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none w-full focus:ring-1 focus:ring-ring font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4 border-t border-slate-900 pt-4">
              <Button type="submit" variant="primary" className="h-9 px-4 text-xs font-semibold">
                Save Setup Options
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
