import React from 'react';
import { HMCard } from './HMCard';

interface HMMetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export function HMMetricCard({ title, value, trend, trendDirection = 'neutral', icon }: HMMetricCardProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-danger',
    neutral: 'text-ink-faint'
  };

  return (
    <HMCard hoverEffect className="p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Subtle background glow effect on hover for the Command Center feel */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-ink-soft uppercase tracking-wider">{title}</h3>
        {icon && <div className="text-primary/70">{icon}</div>}
      </div>
      
      <div>
        <div className="text-3xl font-extrabold text-ink tracking-tight">{value}</div>
        {trend && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
            <span className={`${trendColors[trendDirection]}`}>
              {trendDirection === 'up' && '↑ '}
              {trendDirection === 'down' && '↓ '}
              {trendDirection === 'neutral' && '→ '}
              {trend}
            </span>
          </div>
        )}
      </div>
    </HMCard>
  );
}
