import React from 'react';

interface HMAIOrbProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HMAIOrb({ size = 'md', className = '' }: HMAIOrbProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-soft" />
      
      {/* The core 3D orb */}
      <div className="relative w-[80%] h-[80%] rounded-full animate-float">
        {/* Base gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-primary/20 to-primary/80 shadow-[inset_0_-10px_20px_rgba(22,87,204,0.5),0_10px_30px_rgba(22,87,204,0.3)]" />
        
        {/* Glass reflection (top highlight) */}
        <div className="absolute top-[5%] left-[10%] w-[60%] h-[30%] bg-gradient-to-b from-white/80 to-transparent rounded-full rotate-[-15deg] blur-[1px]" />
        
        {/* Inner core particle */}
        <div className="absolute inset-0 m-auto w-1/4 h-1/4 bg-surface rounded-full blur-[2px] animate-pulse-soft shadow-[0_0_15px_#fff]" />
      </div>
      
      {/* Tiny floating particles (pure CSS) */}
      <div className="absolute inset-0 animate-spin-slow pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-1.5 h-1.5 bg-primary rounded-full blur-[1px]" />
        <div className="absolute bottom-[20%] right-[15%] w-1 h-1 bg-surface rounded-full" />
        <div className="absolute top-[40%] right-[5%] w-2 h-2 bg-primary/50 rounded-full blur-[2px]" />
      </div>
    </div>
  );
}
