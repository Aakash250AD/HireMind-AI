'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt in degrees (default 6)
  scaleOnHover?: number; // scale on hover (default 1.01)
}

export function TiltCard({ children, className = '', maxTilt = 6, scaleOnHover = 1.01 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check for touch device on mount
  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isTouchDevice || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the element (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // If reduced motion or touch device, render standard div without 3D transforms
  if (prefersReducedMotion || isTouchDevice) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Subtle dynamic shadow based on tilt */}
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
        style={{
          boxShadow: isHovered ? '0 20px 40px -20px rgba(0,0,0,0.1)' : 'none',
          transform: 'translateZ(-10px)'
        }}
      />
      
      {/* Content wrapper to pull it slightly "forward" in 3D space */}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} className="h-full w-full rounded-[inherit]">
        {children}
      </div>
    </motion.div>
  );
}
