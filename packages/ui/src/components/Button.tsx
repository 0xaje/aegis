import * as React from 'react';
import { cn } from '../utils.js';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 active:scale-98 duration-100',
          variant === 'primary' && 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
          variant === 'secondary' &&
            'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
          variant === 'outline' &&
            'border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800',
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
