'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ 
  value, 
  className = '', 
  prefix = '', 
  suffix = '',
  duration = 800 
}: AnimatedCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const countValue = useMotionValue(0);

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      animate(countValue, value, {
        duration: duration / 1000,
        ease: "easeOut"
      });
    } else if (prefersReducedMotion) {
      countValue.set(value);
    }
  }, [value, isInView, countValue, prefersReducedMotion, duration]);

  const displayValue = useTransform(countValue, (current) => {
    return Math.round(current).toLocaleString();
  });

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {prefix}{value.toLocaleString()}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-flex items-center ${className}`}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
