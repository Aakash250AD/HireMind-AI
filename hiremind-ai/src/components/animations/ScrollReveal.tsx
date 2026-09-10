'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  duration = 0.5 
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialState = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 };
      case 'down': return { opacity: 0, y: -30 };
      case 'left': return { opacity: 0, x: 30 };
      case 'right': return { opacity: 0, x: -30 };
      case 'none': return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.25, 0.1, 0.25, 1.0] // smooth easing 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
