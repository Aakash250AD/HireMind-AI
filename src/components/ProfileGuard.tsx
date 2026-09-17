'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'hr' | 'candidate';

type GuardStatus =
  | 'checking'
  | 'authorized'
  | 'unauthenticated'
  | 'wrong-role'
  | 'profile-not-found';

async function resolveRole(): Promise<Role | null> {
  // Get the authenticated Supabase user.
  // Do not trust a client-provided role or user ID.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  // public.profiles.id must equal auth.users.id
  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return null;
  }

  if (profile.role === 'hr' || profile.role === 'candidate') {
    return profile.role;
  }

  return null;
}

export function ProfileGuard({
  children,
  requireRole,
}: {
  children: React.ReactNode;
  requireRole?: Role;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<GuardStatus>('checking');
  const [userRole, setUserRole] = useState<Role | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      if (!mounted) return;

      setStatus('checking');

      try {
        // Check whether a Supabase session exists.
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          if (!mounted) return;

          setUserRole(null);
          setStatus('unauthenticated');
          return;
        }

        // Resolve the role ONLY from public.profiles.
        const role = await resolveRole();

        if (!mounted) return;

        if (!role) {
          setUserRole(null);
          setStatus('profile-not-found');
          return;
        }

        setUserRole(role);

        if (requireRole && role !== requireRole) {
          setStatus('wrong-role');
          return;
        }

        setStatus('authorized');
      } catch (error) {
        if (!mounted) return;

        console.error(
          'ProfileGuard authentication check failed:',
          error instanceof Error ? error.message : 'Unknown error'
        );

        setUserRole(null);
        setStatus('unauthenticated');
      }
    };

    // Initial authentication check.
    void checkSession();

    // React to future auth changes.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // Defer the async Supabase work.
      // This avoids running another Supabase call directly
      // inside the auth-state callback.
      setTimeout(() => {
        if (!mounted) return;

        if (event === 'SIGNED_OUT') {
          setUserRole(null);
          setStatus('unauthenticated');
          return;
        }

        void checkSession();
      }, 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [requireRole]);

  // ------------------------------------------------------------
  // CHECKING
  // ------------------------------------------------------------

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />

        <p className="text-ink-soft text-sm font-semibold">
          Verifying credentials...
        </p>
      </div>
    );
  }

  // ------------------------------------------------------------
  // NOT AUTHENTICATED
  // ------------------------------------------------------------

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-10 h-10 text-danger mb-4" />

        <h1 className="text-lg font-bold text-ink mb-1">
          Please sign in
        </h1>

        <p className="text-sm text-ink-soft mb-6 max-w-sm">
          You need to be signed in to view this page.
        </p>

        <button
          onClick={() => router.push('/')}
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-[var(--radius-md)] transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------
  // PROFILE NOT FOUND
  // ------------------------------------------------------------

  if (status === 'profile-not-found') {
    return (
      <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-10 h-10 text-danger mb-4" />

        <h1 className="text-lg font-bold text-ink mb-1">
          Profile not found
        </h1>

        <p className="text-sm text-ink-soft mb-6 max-w-sm">
          Your account is authenticated, but your HireMind profile could not
          be found.
        </p>

        <button
          onClick={() => router.push('/')}
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-[var(--radius-md)] transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------
  // WRONG ROLE
  // ------------------------------------------------------------

  if (status === 'wrong-role') {
    const correctPath =
      userRole === 'hr'
        ? '/dashboard'
        : userRole === 'candidate'
          ? '/candidate-dashboard'
          : '/';

    return (
      <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-10 h-10 text-danger mb-4" />

        <h1 className="text-lg font-bold text-ink mb-1">
          Not authorized
        </h1>

        <p className="text-sm text-ink-soft mb-6 max-w-sm">
          This page is only available to{' '}
          {requireRole === 'hr'
            ? 'HR/recruiter'
            : 'candidate'}{' '}
          accounts.
        </p>

        <button
          onClick={() => router.push(correctPath)}
          className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-[var(--radius-md)] transition-colors"
        >
          Go to Your Workspace
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------
  // AUTHORIZED
  // ------------------------------------------------------------

  return (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );
}