import { useNavigate } from 'react-router-dom';
import { Button } from '@aegis/ui';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col items-center justify-center font-sans px-6 text-center">
      <div className="flex items-center gap-4 border-b border-slate-900 pb-6 mb-6">
        <span className="text-3xl font-extrabold text-indigo-500 font-mono">404</span>
        <span className="border-l border-slate-800 pl-4 text-xs text-slate-400 font-sans tracking-wide">
          This page could not be found.
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 border-slate-850"
        onClick={() => navigate('/')}
      >
        <Home className="w-3.5 h-3.5" /> Return Home
      </Button>
    </div>
  );
}
