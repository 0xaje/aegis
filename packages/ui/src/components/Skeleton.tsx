import * as React from 'react';
import { cn } from '../utils.js';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-slate-800/50', className)} {...props} />;
}

export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'h-4 w-4 animate-spin rounded-full border-2 border-slate-800 border-t-indigo-500',
        className,
      )}
      {...props}
    />
  );
}
