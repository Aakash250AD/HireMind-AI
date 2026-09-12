import React from 'react';
import { Loader2 } from 'lucide-react';

interface HMButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function HMButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: HMButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-[var(--radius-hm-button)] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white shadow-[var(--shadow-hm-button)] hover:shadow-lg border border-transparent",
    secondary: "bg-surface hover:bg-surface-sunken text-primary border border-border shadow-sm hover:border-primary/30",
    outline: "bg-transparent hover:bg-surface-sunken text-ink-soft border border-border hover:border-ink-faint",
    ghost: "bg-transparent hover:bg-surface-sunken text-ink-soft border-transparent"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5"
  };

  const isDisabled = disabled || isLoading;
  const disabledStyles = isDisabled ? "opacity-60 cursor-not-allowed active:scale-100" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
