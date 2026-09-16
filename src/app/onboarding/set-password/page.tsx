'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, ArrowRight } from 'lucide-react';

export default function SetPasswordPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const email = session?.user?.email || '';
      const role = (session?.user as any)?.role || 'candidate';
      await supabase.auth.updateUser({ password });
      
      // Redirect based on role
      if (role === 'admin' || role === 'hr') {
        router.push('/dashboard');
      } else {
        router.push('/candidate-dashboard');
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface border border-border rounded-[var(--radius-lg)] p-8 shadow-2xl">
        <h1 className="text-2xl font-extrabold text-ink mb-2">Set Your Password</h1>
        <p className="text-sm text-ink-faint mb-6">
          Since you signed in with Google for the first time, please set a password for future logins.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-danger-tint border border-danger/20 text-danger text-xs font-bold rounded-[var(--radius-md)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-danger"></div>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Saving...</span>
            ) : (
              <>
                <span>Set Password</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
