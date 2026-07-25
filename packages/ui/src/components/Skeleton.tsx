import { cn } from '../utils.js';

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded bg-slate-900 border border-slate-800/40 select-none pointer-events-none',
        className,
      )}
    />
  );
}

export function Spinner({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'w-5 h-5 border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin',
        className,
      )}
    />
  );
}
