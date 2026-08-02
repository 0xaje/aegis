import { cn } from '../utils.js';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl border border-white/10 text-slate-100 overflow-hidden shadow-2xl flex flex-col',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn('p-6 pb-3 flex flex-col gap-1.5', className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3
      className={cn(
        'font-display font-bold text-lg md:text-xl text-white leading-snug tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: CardProps) {
  return (
    <p className={cn('text-sm text-slate-400 font-sans leading-relaxed mt-0.5', className)}>
      {children}
    </p>
  );
}

export function CardContent({ className, children }: CardProps) {
  return (
    <div className={cn('p-6 pt-3 text-sm leading-relaxed text-slate-200 font-sans', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'px-6 py-4 bg-slate-950/40 border-t border-white/5 mt-auto flex items-center justify-between gap-4 text-sm font-sans',
        className,
      )}
    >
      {children}
    </div>
  );
}
