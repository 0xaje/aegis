import * as React from 'react';
import { cn } from '../utils.js';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'verified';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold font-mono tracking-wider border transition-all select-none gap-1',
        variant === 'default' && 'bg-slate-800 text-slate-100 border-slate-700',
        variant === 'secondary' && 'bg-slate-900/60 text-slate-400 border-slate-800/80',
        variant === 'success' && 'bg-emerald-950/30 text-emerald-400 border-emerald-800/30',
        variant === 'warning' && 'bg-amber-950/30 text-amber-400 border-amber-800/30',
        variant === 'error' && 'bg-red-950/30 text-red-400 border-red-800/30',
        variant === 'verified' &&
          'bg-indigo-950/40 text-indigo-300 border-indigo-700/40 shadow-sm shadow-indigo-500/5',
        className,
      )}
      {...props}
    />
  );
}
