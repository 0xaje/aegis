import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils.js';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] gap-2 select-none font-sans relative overflow-hidden group',
          // Variants
          variant === 'primary' &&
            'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 border border-cyan-400/40 cursor-pointer font-bold tracking-wide',
          variant === 'secondary' &&
            'bg-slate-900/90 text-slate-100 hover:bg-slate-800/90 border border-white/15 shadow-md cursor-pointer hover:border-cyan-500/30 backdrop-blur-md',
          variant === 'outline' &&
            'border border-cyan-500/30 bg-slate-950/60 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-200 cursor-pointer backdrop-blur-xl shadow-sm',
          variant === 'ghost' &&
            'bg-transparent text-slate-300 hover:bg-slate-800/60 hover:text-cyan-300 cursor-pointer',
          variant === 'link' &&
            'bg-transparent text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300 active:scale-100 cursor-pointer',
          variant === 'destructive' &&
            'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 hover:text-rose-200 cursor-pointer shadow-sm shadow-rose-500/10',
          // Sizes
          size === 'default' && 'h-10 px-5 py-2 text-sm',
          size === 'sm' && 'h-8.5 px-3.5 text-xs rounded-lg',
          size === 'lg' && 'h-12 px-7 text-base rounded-2xl font-bold tracking-wide',
          size === 'icon' && 'h-10 w-10 p-0 rounded-xl',
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
