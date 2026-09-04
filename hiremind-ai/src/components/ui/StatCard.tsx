import React from 'react';
import { Card } from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: number;
  className?: string;
}

export function StatCard({ label, value, delta, className }: StatCardProps) {
  const isPositive = delta && delta > 0;
  const isNegative = delta && delta < 0;

  return (
    <Card className={twMerge('flex flex-col gap-2 p-5', className)}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">
        {label}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-[28px] font-semibold text-ink leading-none">
          {value}
        </div>
        {delta !== undefined && (
          <div className={twMerge('flex items-center text-sm font-medium', isPositive ? 'text-success' : isNegative ? 'text-danger' : 'text-ink-faint')}>
            {isPositive && <ArrowUpRight className="w-4 h-4 mr-0.5" />}
            {isNegative && <ArrowDownRight className="w-4 h-4 mr-0.5" />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
    </Card>
  );
}
