'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { authService } from '@/services/auth.service';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  Loader2,
  Briefcase,
  Users
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'candidate' | 'hr' | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError('Please select an account type.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (role === 'hr') {
        router.push('/onboarding/hr');
      } else {
        router.push('/onboarding/candidate');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Registration failed.');
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    if (!role) {
      setError('Please select an account type before continuing with Google.');
      return;
    }
    setGoogleLoading(true);
    setError('');
    setTimeout(() => {
      setGoogleLoading(false);
      if (role === 'hr') {
        router.push('/onboarding/hr');
      } else {
        router.push('/onboarding/candidate');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-6 select-none font-sans text-ink">
      <div className="w-full max-w-4xl bg-surface border border-border rounded-[var(--radius-lg)] p-8 md:p-12 shadow-2xl relative grid grid-cols-1 md:grid-cols-2 gap-12">
        <Link href="/" className="absolute top-6 left-6 text-ink-faint hover:text-ink flex items-center gap-1 text-xs font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        
        {/* Left Column: Form Details */}
        <div className="flex flex-col pt-8">
          <div className="mb-8">
            <Logo size="md" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink mt-6 tracking-tight">Create your account</h1>
            <p className="text-sm text-ink-faint mt-2">Join HireMind AI and accelerate your career or hiring process.</p>
          </div>

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
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink placeholder-ink-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink placeholder-ink-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink placeholder-ink-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                    className="w-full pl-10 pr-4 py-3 bg-page-bg border border-border rounded-[var(--radius-md)] text-sm font-medium text-ink placeholder-ink-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-extrabold rounded-[var(--radius-md)] shadow-lg transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-3 text-xs text-ink-faint font-bold tracking-wider">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading || loading}
            className="w-full py-3 bg-surface-sunken hover:bg-border/30 border border-border rounded-[var(--radius-md)] transition-all flex items-center justify-center gap-3 text-sm font-bold text-ink"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-ink-faint" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>
          
          <div className="mt-8 text-center text-sm text-ink-faint">
            Already have an account?{' '}
            <Link href="/" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Right Column: Role Selection */}
        <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 md:pl-12">
          <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-primary"></span>
            Select Your Role
          </h3>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`w-full text-left p-6 rounded-[var(--radius-lg)] border-2 transition-all relative overflow-hidden group ${
                role === 'candidate' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-page-bg hover:border-primary/50'
              }`}
            >
              {role === 'candidate' && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-4 -mt-4"></div>
              )}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  role === 'candidate' ? 'bg-primary text-white' : 'bg-surface border border-border text-ink-soft group-hover:text-primary'
                }`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-lg font-extrabold mb-1 ${role === 'candidate' ? 'text-primary' : 'text-ink'}`}>Candidate / Fresher</h4>
                  <p className="text-xs text-ink-faint leading-relaxed font-medium">Create your professional profile, discover opportunities and apply for jobs.</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('hr')}
              className={`w-full text-left p-6 rounded-[var(--radius-lg)] border-2 transition-all relative overflow-hidden group ${
                role === 'hr' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-page-bg hover:border-primary/50'
              }`}
            >
              {role === 'hr' && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-4 -mt-4"></div>
              )}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  role === 'hr' ? 'bg-primary text-white' : 'bg-surface border border-border text-ink-soft group-hover:text-primary'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-lg font-extrabold mb-1 ${role === 'hr' ? 'text-primary' : 'text-ink'}`}>HR / Recruiter</h4>
                  <p className="text-xs text-ink-faint leading-relaxed font-medium">Create your recruiter profile, post jobs and manage candidates.</p>
                </div>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
