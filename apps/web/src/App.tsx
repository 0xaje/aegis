import { Button } from '@aegis/ui';

function App() {
  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 flex flex-col items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-4 text-center max-w-md p-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="font-bold text-lg text-white">A</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          Aegis Project Foundation
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          Clean repository infrastructure compiles cleanly across workspaces. Ready for feature
          integrations.
        </p>
        <a href="https://github.com/0xaje/aegis" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="border-slate-850 text-slate-300">
            Open Repository
          </Button>
        </a>
      </div>
    </div>
  );
}

export default App;
