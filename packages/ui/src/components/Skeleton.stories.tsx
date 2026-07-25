import { Skeleton, Spinner } from './Skeleton.js';

export default {
  title: 'Atomic/Skeleton',
  component: Skeleton,
};

export const Default = () => (
  <div className="max-w-md w-full p-6 bg-[#0c0e14]/50 border border-slate-800 rounded-xl flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="w-24 h-3.5" />
        <Skeleton className="w-16 h-2.5" />
      </div>
    </div>
    <div className="flex flex-col gap-2 mt-2">
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-5/6 h-3" />
    </div>
  </div>
);

export const LoadingSpinner = () => (
  <div className="p-8 flex items-center gap-2 text-xs text-slate-400 font-mono">
    <Spinner /> Authenticating Enclave...
  </div>
);
