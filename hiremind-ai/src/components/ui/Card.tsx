import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ interactive, className, children, ...props }: CardProps) {
  const baseStyles = 'bg-surface border border-border rounded-[12px] p-6';
  const interactiveStyles = interactive ? 'transition-shadow hover:shadow-md cursor-pointer' : '';
  
  return (
    <div className={twMerge(baseStyles, interactiveStyles, className)} {...props}>
      {children}
    </div>
  );
}
