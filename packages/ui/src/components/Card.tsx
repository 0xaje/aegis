import { cn } from '../utils.js';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'border border-slate-800/80 bg-gradient-to-b from-[#0c0e14]/90 to-[#07080c]/90 text-slate-100 rounded-xl overflow-hidden shadow-xl border-glow flex flex-col',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn('p-5 pb-3 flex flex-col gap-1', className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3
      className={cn(
        'font-sans font-bold text-sm text-slate-100 leading-none tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: CardProps) {
  return (
    <p className={cn('text-xs text-slate-400 font-sans leading-relaxed mt-0.5', className)}>
      {children}
    </p>
  );
}

export function CardContent({ className, children }: CardProps) {
  return (
    <div className={cn('p-5 pt-3 text-xs leading-relaxed text-slate-300 font-sans', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'px-5 py-4 bg-[#07080c]/50 border-t border-slate-900/60 mt-auto flex items-center justify-between gap-3 text-xs',
        className,
      )}
    >
      {children}
    </div>
  );
}
