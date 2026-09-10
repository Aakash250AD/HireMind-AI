'use client';

import React, { useState } from 'react';
import { Sparkles, X, MessageSquare, Search, BarChart2, Briefcase } from 'lucide-react';
import { HMCard } from './HMCard';

import { motion } from 'framer-motion';

export function HMAICopilot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <HMCard className="w-80 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-hm-deep to-hm-matte p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-tint" />
                <span className="font-bold text-sm">HireMind AI Copilot</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 bg-surface-sunken">
              <p className="text-xs font-medium text-ink mb-4">
                How can I assist you today?
              </p>
              
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-2.5 rounded-[var(--radius-sm)] bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left group">
                  <Search className="w-4 h-4 text-primary group-hover:text-primary-hover shrink-0" />
                  <span className="text-xs font-semibold text-ink-soft">Find suitable candidates</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-[var(--radius-sm)] bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left group">
                  <BarChart2 className="w-4 h-4 text-primary group-hover:text-primary-hover shrink-0" />
                  <span className="text-xs font-semibold text-ink-soft">Explain recruitment data</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-[var(--radius-sm)] bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left group">
                  <MessageSquare className="w-4 h-4 text-primary group-hover:text-primary-hover shrink-0" />
                  <span className="text-xs font-semibold text-ink-soft">Check application status</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-[var(--radius-sm)] bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left group">
                  <Briefcase className="w-4 h-4 text-primary group-hover:text-primary-hover shrink-0" />
                  <span className="text-xs font-semibold text-ink-soft">Help create job post</span>
                </button>
              </div>
            </div>
            
            <div className="p-3 bg-white border-t border-border">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask AI..." 
                  className="w-full pl-3 pr-10 py-2 bg-surface-sunken border border-border rounded-md text-xs text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary hover:text-primary-hover">
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </HMCard>
        </div>
      )}

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center relative"
        animate={{
          boxShadow: [
            "0 4px 20px rgba(22,87,204,0.3)",
            "0 4px 30px rgba(22,87,204,0.6)",
            "0 4px 20px rgba(22,87,204,0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 6px 35px rgba(22,87,204,0.7)",
          transition: { duration: 0.2 } 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-5 h-5 relative z-10" />
      </motion.button>
    </div>
  );
}
