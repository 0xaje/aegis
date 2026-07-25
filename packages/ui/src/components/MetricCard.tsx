import { Card, CardContent } from './Card.js';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils.js';

export interface MetricCardProps {
  className?: string;
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  data?: number[];
}

export function MetricCard({
  className,
  title,
  value,
  change,
  changeLabel = 'vs last month',
  data = [],
}: MetricCardProps) {
  const isPositive = change !== undefined ? change >= 0 : true;

  // Simple SVG path builder for inline sparklines
  const buildSparklinePath = () => {
    if (data.length < 2) return '';
    const width = 120;
    const height = 30;
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1;

    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((val - minVal) / range) * height;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  return (
    <Card className={cn('relative select-none border-glow', className)}>
      <CardContent className="p-6 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-semibold">
            {title}
          </span>
          <span className="text-2xl font-extrabold text-slate-100 font-sans tracking-tight leading-none">
            {value}
          </span>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-1 text-[10px] font-sans text-slate-400">
              <span
                className={cn(
                  'inline-flex items-center font-bold font-mono',
                  isPositive ? 'text-emerald-400' : 'text-rose-400',
                )}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {isPositive ? '+' : ''}
                {change}%
              </span>
              <span>{changeLabel}</span>
            </div>
          )}
        </div>

        {/* Sparkline Graph */}
        {data.length >= 2 && (
          <div className="shrink-0 flex items-center">
            <svg width="120" height="30" className="overflow-visible">
              <path
                d={buildSparklinePath()}
                fill="none"
                stroke={isPositive ? '#10b981' : '#f43f5e'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.15)]"
              />
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
