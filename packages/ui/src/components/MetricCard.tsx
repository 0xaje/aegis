import { Card, CardContent } from './Card.js';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils.js';

export interface MetricCardProps {
  title: string;
  value: string;
  change?: number; // e.g. 12.5 for +12.5%
  changeLabel?: string;
  data?: number[]; // data points for SVG sparkline
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  data,
  className,
}: MetricCardProps) {
  const isPositive = change === undefined || change >= 0;

  const renderSparkline = () => {
    if (!data || data.length < 2) return null;
    const width = 80;
    const height = 24;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min === 0 ? 1 : max - min;

    const points = data
      .map((val, index) => {
        const x = (index / (data.length - 1)) * width;
        // Invert Y axis for SVG (0,0 is top-left)
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <div className="flex items-center">
        <svg className="w-20 h-6 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
          <polyline
            fill="none"
            stroke={isPositive ? '#34d399' : '#f87171'}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    );
  };

  return (
    <Card hoverGlow className={cn('relative overflow-hidden border-glow', className)}>
      <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">
            {title}
          </span>
          {renderSparkline()}
        </div>

        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight leading-none font-sans">
            {value}
          </h2>

          {change !== undefined && (
            <div
              className={cn(
                'inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded',
                isPositive ? 'text-emerald-400 bg-emerald-950/20' : 'text-rose-400 bg-rose-950/20',
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              <span>
                {isPositive ? '+' : ''}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-slate-500 font-normal text-[10px] ml-1 font-sans">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
