import React from 'react';
import { Card } from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { AnimatedCounter } from '../animations/AnimatedCounter';
import { motion } from 'framer-motion';
import { TiltCard } from '../animations/TiltCard';

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: number;
  className?: string;
  withTilt?: boolean;
}

export function StatCard({ label, value, delta, className, withTilt }: StatCardProps) {
  const isPositive = delta && delta > 0;
  const isNegative = delta && delta < 0;

  const content = (
    <Card className={twMerge('flex flex-col gap-2 p-5 h-full', className)}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">
        {label}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-[28px] font-semibold text-ink leading-none">
          {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
        </div>
        {delta !== undefined && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className={twMerge('flex items-center text-sm font-medium', isPositive ? 'text-success' : isNegative ? 'text-danger' : 'text-ink-faint')}
          >
            {isPositive && <ArrowUpRight className="w-4 h-4 mr-0.5" />}
            {isNegative && <ArrowDownRight className="w-4 h-4 mr-0.5" />}
            {Math.abs(delta)}%
          </motion.div>
        )}
      </div>
    </Card>
  );

  return withTilt ? <TiltCard maxTilt={5}>{content}</TiltCard> : content;
}
