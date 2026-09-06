import React from 'react';
import { cn } from '@/lib/utils'; // Assuming a standard cn utility exists. If not, I'll use raw template literals.

interface HMCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glass?: boolean;
}

export function HMCard({ children, className, hoverEffect = false, glass = false, ...props }: HMCardProps) {
  return (
    <div
      className={`bg-white border border-border rounded-[var(--radius-hm-card)] shadow-[var(--shadow-hm-card)] transition-all duration-200 ${
        hoverEffect ? 'hover:-translate-y-0.5 hover:shadow-[var(--shadow-hm-card-hover)] hover:border-border-hover' : ''
      } ${glass ? 'hm-glass' : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
