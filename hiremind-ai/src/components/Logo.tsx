import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-9 h-9 text-base',
    lg: 'w-12 h-12 text-xl'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`relative flex items-center justify-center rounded-md bg-primary shadow-sm ${iconSizes[size]}`}>
        <span className="font-extrabold tracking-tight text-text-primary flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19V5M4 12h16M20 19V5" />
            <circle cx="12" cy="12" r="3" className="fill-[#0A66C2] stroke-white" />
            <path d="M12 5v4M12 15v4" strokeDasharray="2 2" />
          </svg>
        </span>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-tight text-text-primary ${textSizes[size]}`}>
            HireMind <span className="text-primary font-extrabold">AI</span>
          </span>
          <span className="text-[10px] tracking-wider text-text-secondary font-semibold uppercase mt-0.5">
            Talent Verification
          </span>
        </div>
      )}
    </div>
  );
};
