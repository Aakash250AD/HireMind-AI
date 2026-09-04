import React from 'react';
import { twMerge } from 'tailwind-merge';

export type StatusVariant = 'primary' | 'success' | 'warning' | 'danger' | 'default';

interface StatusPillProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

export function StatusPill({ status, variant = 'default', className }: StatusPillProps) {
  const variants = {
    primary: 'bg-primary-tint text-primary',
    success: 'bg-success-tint text-success',
    warning: 'bg-warning-tint text-warning',
    danger: 'bg-danger-tint text-danger',
    default: 'bg-surface-sunken text-ink-soft',
  };

  return (
    <span className={twMerge('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}>
      {status}
    </span>
  );
}
