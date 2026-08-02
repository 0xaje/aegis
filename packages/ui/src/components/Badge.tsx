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
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-sans tracking-wide select-none border backdrop-blur-md transition-all duration-150',
        // Variants
        variant === 'default' && 'bg-slate-800/80 text-slate-300 border-white/10 shadow-sm',
        variant === 'success' &&
          'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm shadow-emerald-500/10',
        variant === 'warning' &&
          'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/10',
        variant === 'error' &&
          'bg-red-500/10 text-red-400 border-red-500/30 shadow-sm shadow-red-500/10',
        variant === 'verified' &&
          'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-sm shadow-blue-500/10',
        className,
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full animate-pulse',
          variant === 'default' && 'bg-slate-400',
          variant === 'success' && 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
          variant === 'warning' && 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
          variant === 'error' && 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]',
          variant === 'verified' && 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]',
        )}
      />
      {children}
    </span>
  );
}
