import React from 'react';

interface HMInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const HMInput = React.forwardRef<HTMLInputElement, HMInputProps>(
  ({ className = '', label, icon, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-bold text-ink-soft uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-white border border-border rounded-md text-sm font-medium text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all ${
              icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5'
            } ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-[11px] font-semibold text-danger">{error}</span>}
      </div>
    );
  }
);

HMInput.displayName = 'HMInput';
