'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProfileGuard({ children, requireRole }: { children: React.ReactNode, requireRole?: 'recruiter' | 'candidate' }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Onboarding Form State
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkProfile() {
      // BYPASSING ALL AUTHENTICATION FOR LOCAL DEV
      if (mounted) {
        setAuthorized(true);
        setChecking(false);
      }
    }

    checkProfile();

    return () => {
      mounted = false;
    };
  }, [pathname, requireRole, router]);

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      setShowOnboarding(false);
      setAuthorized(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-ink-soft text-sm font-semibold">Verifying credentials...</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {authorized && !showOnboarding && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-surface border border-border rounded-[var(--radius-lg)] shadow-2xl overflow-hidden p-6"
          >
            <h2 className="text-xl font-bold text-ink mb-1">Welcome to HireMind AI</h2>
            <p className="text-sm text-ink-soft mb-6">Let's finish setting up your account before you dive in.</p>
            
            <form onSubmit={handleOnboardingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-soft uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-soft uppercase mb-1.5">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('candidate')}
                    className={`py-2 px-3 border rounded-[var(--radius-md)] text-sm font-semibold transition-colors ${role === 'candidate' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-sunken border-border text-ink-soft hover:border-primary/50'}`}
                  >
                    Candidate
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('recruiter')}
                    className={`py-2 px-3 border rounded-[var(--radius-md)] text-sm font-semibold transition-colors ${role === 'recruiter' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface-sunken border-border text-ink-soft hover:border-primary/50'}`}
                  >
                    Recruiter
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 mt-4 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? 'Saving...' : 'Complete Setup'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
