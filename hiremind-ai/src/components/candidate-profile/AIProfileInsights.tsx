import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { HMCard } from '@/components/ui/HMCard';

export function AIProfileInsights() {
  return (
    <HMCard className="p-6 sticky top-24 bg-gradient-to-b from-white to-primary-tint/20 border-primary/10">
      
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-full bg-primary-tint flex items-center justify-center text-primary">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ink">AI Profile Insights</h3>
          <p className="text-[10px] text-ink-faint">Frontend Mock Analysis</p>
        </div>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl" />
        <div className="relative text-center">
          <div className="text-4xl font-black text-ink tracking-tighter mb-1">82<span className="text-xl text-primary">%</span></div>
          <p className="text-xs font-semibold text-success flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" /> Profile Strength
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-ink-soft">Technical Skills</span>
            <span className="text-success font-bold">Strong</span>
          </div>
          <div className="w-full h-1.5 bg-surface-sunken rounded-full overflow-hidden">
            <div className="h-full bg-success w-[85%] rounded-full" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-ink-soft">Projects</span>
            <span className="text-primary font-bold">Excellent</span>
          </div>
          <div className="w-full h-1.5 bg-surface-sunken rounded-full overflow-hidden">
            <div className="h-full bg-primary w-[95%] rounded-full" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-ink-soft">Experience</span>
            <span className="text-warning font-bold">Needs work</span>
          </div>
          <div className="w-full h-1.5 bg-surface-sunken rounded-full overflow-hidden">
            <div className="h-full bg-warning w-[40%] rounded-full" />
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-[var(--radius-md)] p-4 border border-border shadow-sm">
        <h4 className="text-xs font-bold text-ink mb-3 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-primary" /> Recommended Actions
        </h4>
        <ul className="space-y-2 text-[11px] text-ink-soft font-medium">
          <li className="flex items-start gap-2">
            <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            Add 2 more technical skills to match average AI roles.
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-success shrink-0" />
            <span className="line-through opacity-60">Add your GitHub profile.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
            Detail your internship responsibilities clearly.
          </li>
        </ul>
      </div>

    </HMCard>
  );
}
