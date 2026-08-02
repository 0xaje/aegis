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
    const height = 36;
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1;

    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 8) - 4;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  return (
    <Card
      className={cn(
        'relative select-none border-glow group hover:border-blue-500/30 transition-all duration-200',
        className,
      )}
    >
      <CardContent className="p-6 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-slate-400 font-sans tracking-wider uppercase font-semibold">
            {title}
          </span>
          <span className="text-2xl lg:text-3xl font-bold text-white font-mono tracking-tight leading-none">
            {value}
          </span>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 mt-1 text-xs font-sans text-slate-400">
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-bold font-mono px-1.5 py-0.5 rounded-md text-[11px]',
                  isPositive
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-rose-400 bg-rose-500/10 border border-rose-500/20',
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
              <span className="text-slate-400">{changeLabel}</span>
            </div>
          )}
        </div>

        {/* Sparkline Graph */}
        {data.length >= 2 && (
          <div className="shrink-0 flex items-center">
            <svg width="120" height="36" className="overflow-visible">
              <defs>
                <linearGradient
                  id={`sparkGradient-${title.replace(/\s+/g, '-')}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={isPositive ? '#10b981' : '#f43f5e'}
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor={isPositive ? '#10b981' : '#f43f5e'}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path
                d={buildSparklinePath()}
                fill="none"
                stroke={isPositive ? '#34d399' : '#f87171'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_2px_8px_rgba(52,211,153,0.3)]"
              />
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
