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
          'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none active:scale-98 duration-100 gap-2',
          // Variants
          variant === 'primary' &&
            'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm border border-indigo-500/20 font-semibold',
          variant === 'secondary' &&
            'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
          variant === 'outline' &&
            'border border-slate-800 bg-transparent text-slate-300 hover:bg-slate-900/60 hover:text-white',
          variant === 'ghost' &&
            'bg-transparent text-slate-400 hover:bg-slate-900/60 hover:text-slate-100',
          variant === 'link' &&
            'bg-transparent text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-300 active:scale-100',
          variant === 'destructive' &&
            'bg-red-950/60 text-red-200 border border-red-900/50 hover:bg-red-900 hover:text-white',
          // Sizes
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-8 px-3 text-xs rounded-md',
          size === 'lg' && 'h-12 px-6 text-base rounded-xl',
          size === 'icon' && 'h-10 w-10 p-0',
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
