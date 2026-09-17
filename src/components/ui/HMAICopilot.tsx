'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function HMAICopilot() {
  return (
    <Link href="/copilot" className="fixed bottom-6 right-6 z-50" aria-label="Open AI Copilot">
      <motion.div
        className="w-14 h-14 bg-gradient-to-br from-primary to-primary-hover text-white rounded-full flex items-center justify-center shadow-xl border border-white/10"
        animate={{
          boxShadow: [
            '0 4px 20px rgba(22,87,204,0.4)',
            '0 4px 30px rgba(22,87,204,0.7)',
            '0 4px 20px rgba(22,87,204,0.4)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
    </Link>
  );
}
