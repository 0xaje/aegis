import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@aegis/ui';
import { ArrowRight, Shield } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col items-center justify-center font-sans px-4">
      {/* Background radial halo */}
      <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="max-w-md w-full border-glow p-6 text-center flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-650 bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Shield className="w-6 h-6 text-white" />
        </div>

        <CardHeader className="p-0 flex flex-col gap-1">
          <CardTitle className="text-xl font-bold tracking-tight text-slate-100">
            Aegis Platform Launcher
          </CardTitle>
          <CardDescription className="text-xs text-slate-400 max-w-xs mx-auto">
            Confidential Financial Intelligence and execution triggers built on Flare Network TEE
            memory enclaves.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 text-slate-400 text-xs leading-relaxed">
          Select connect wallet options in the dashboard sidebar to unlock secure risk calculations
          and FTSOv2 price feeds.
        </CardContent>

        <Button
          variant="primary"
          className="w-full h-11 text-xs gap-1.5 font-semibold mt-2"
          onClick={() => navigate('/app/dashboard')}
        >
          Enter Dashboard <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  );
}
