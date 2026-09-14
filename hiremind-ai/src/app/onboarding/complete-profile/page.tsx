'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User, Phone, Briefcase, ArrowRight, Loader2 } from 'lucide-react';

export default function CompleteProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'recruiter' | 'candidate' | ''>('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profile) {
        if (profile.is_completed) {
          router.push(profile.role === 'recruiter' ? '/dashboard' : '/candidate-dashboard');
          return;
        }
        setFullName(profile.full_name || session.user.user_metadata?.full_name || '');
        setPhone(profile.phone || '');
        setRole(profile.role || '');
      } else {
        setFullName(session.user.user_metadata?.full_name || '');
      }
      setInitializing(false);
    }
    
    loadSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !role) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          full_name: fullName,
          phone: phone,
          role: role,
          is_completed: true,
          updated_at: new Date().toISOString()
        });

      if (upsertError) throw upsertError;

      router.push(role === 'recruiter' ? '/dashboard' : '/candidate-dashboard');
    } catch (err) {
      setError((err as Error).message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface border border-border rounded-[var(--radius-lg)] p-8 shadow-2xl">
        <h1 className="text-2xl font-extrabold text-ink mb-2">Complete Your Profile</h1>
        <p className="text-sm text-ink-faint mb-6">
          We need a few more details to set up your account.
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
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`py-3 px-4 border rounded-[var(--radius-md)] text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  role === 'recruiter' 
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20' 
                    : 'border-border bg-page-bg text-ink-soft hover:border-ink-faint hover:text-ink'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                HR / Recruiter
              </button>
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`py-3 px-4 border rounded-[var(--radius-md)] text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  role === 'candidate' 
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20' 
                    : 'border-border bg-page-bg text-ink-soft hover:border-ink-faint hover:text-ink'
                }`}
              >
                <User className="w-4 h-4" />
                Candidate
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !role}
            className="w-full py-3 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Saving...</span>
            ) : (
              <>
                <span>Complete Setup</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
