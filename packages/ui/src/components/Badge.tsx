import { cn } from '../utils.js';

export interface BadgeProps {
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'verified';
  children: React.ReactNode;
}

export function Badge({ className, variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-wider select-none border border-transparent leading-none uppercase',
        // Variants
        variant === 'default' && 'bg-slate-900/60 text-slate-400 border-slate-800',
        variant === 'success' &&
          'bg-emerald-950/40 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/5',
        variant === 'warning' &&
          'bg-amber-950/40 text-amber-400 border-amber-500/20 shadow-sm shadow-amber-500/5',
        variant === 'error' &&
          'bg-rose-950/40 text-rose-400 border-rose-500/20 shadow-sm shadow-rose-500/5',
        variant === 'verified' &&
          'bg-indigo-950/50 text-indigo-400 border-indigo-500/25 shadow-sm shadow-indigo-500/10 border-glow',
        className,
      )}
    >
      {children}
    </span>
  );
}
