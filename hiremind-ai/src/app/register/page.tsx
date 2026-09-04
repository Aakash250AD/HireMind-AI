'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { authService } from '@/services/auth.service';
import { UserCheck, User, Building2, Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'hr' | 'candidate'>('hr');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authService.register(fullName, company, email, password);
      if (role === 'hr') {
        router.push('/dashboard');
      } else {
        router.push('/candidate-dashboard');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-6 select-none font-sans">
      <div className="w-full max-w-md bg-white border border-border-color rounded-[var(--radius-lg)] p-8 shadow-2xl relative">
        <Link href="/" className="absolute top-4 left-4 text-text-secondary hover:text-text-primary flex items-center gap-1 text-xs font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
        <div className="flex flex-col items-center text-center mb-6 mt-4">
          <Logo size="lg" />
          <h1 className="text-xl font-extrabold text-text-primary mt-4">Create Account</h1>
          <p className="text-xs text-text-secondary mt-1">Select your role to get started with HireMind AI</p>
        </div>

        {/* Split Role Selection Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-page-bg p-1.5 rounded-[var(--radius-md)] border border-border-color mb-6">
          <button
            type="button"
            onClick={() => setRole('hr')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold transition-all ${
              role === 'hr'
                ? 'bg-primary text-white shadow-md border border-dark-blue'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>HR Recruiter</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('candidate')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold transition-all ${
              role === 'candidate'
                ? 'bg-primary text-white shadow-md border border-dark-blue'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Candidate</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-bg border border-error text-error text-xs font-semibold rounded-[var(--radius-sm)]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full pl-9 pr-4 py-2 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-text-primary placeholder-[#999999] focus:outline-none focus:border-[#722F37]"
              />
            </div>
          </div>

          {role === 'hr' && (
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="TechCorp AI"
                  className="w-full pl-9 pr-4 py-2 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-text-primary placeholder-[#999999] focus:outline-none focus:border-[#722F37]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              {role === 'hr' ? 'Work Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'hr' ? 'sarah@techcorp.io' : 'candidate@example.com'}
                className="w-full pl-9 pr-4 py-2 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-text-primary placeholder-[#999999] focus:outline-none focus:border-[#722F37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-text-primary placeholder-[#999999] focus:outline-none focus:border-[#722F37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-text-primary placeholder-[#999999] focus:outline-none focus:border-[#722F37]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-sm)] shadow-lg border border-dark-blue transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Create {role === 'hr' ? 'HR Recruiter' : 'Candidate'} Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-border-color text-center text-xs text-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
