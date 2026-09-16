'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion, PanInfo } from 'framer-motion';

interface SwipeToDecideCardProps {
  children: React.ReactNode;
  onAdvance?: () => void;
  onPass?: () => void;
  swipeThreshold?: number; // How far to drag before triggering
}

export function SwipeToDecideCard({ 
  children, 
  onAdvance, 
  onPass,
  swipeThreshold = 100 
}: SwipeToDecideCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [exitX, setExitX] = useState<number | null>(null);
  const x = useMotionValue(0);

  // Rotate slightly as we drag (max 10 degrees)
  const rotate = useTransform(x, [-300, 300], [-10, 10]);
  
  // Background opacity for hints
  const opacityLeft = useTransform(x, [-swipeThreshold, 0], [1, 0]);
  const opacityRight = useTransform(x, [0, swipeThreshold], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > swipeThreshold) {
      setExitX(1000);
      if (onAdvance) onAdvance();
    } else if (info.offset.x < -swipeThreshold) {
      setExitX(-1000);
      if (onPass) onPass();
    }
  };

  if (prefersReducedMotion) {
    return <div className="w-full h-full">{children}</div>;
  }

  // If we have exited, we don't render the card (or let parent handle unmount)
  // We'll let framer motion handle the exit animation via the exitX state.

  return (
    <div className="relative w-full h-full">
      {/* Background hint layers */}
      <motion.div 
        style={{ opacity: opacityRight }} 
        className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-start pl-8 text-green-700 font-bold z-0"
      >
        ADVANCE
      </motion.div>
      <motion.div 
        style={{ opacity: opacityLeft }} 
        className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-end pr-8 text-red-700 font-bold z-0"
      >
        PASS
      </motion.div>

      {/* The draggable card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // Elastic snap back to 0
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        animate={{ x: exitX !== null ? exitX : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
