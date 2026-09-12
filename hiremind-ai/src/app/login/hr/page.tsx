'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight,
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle2,
  Lock,
  Mail,
} from 'lucide-react';

export default function HRLoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Container Split Card */}
      <div className="w-full max-w-5xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Unique Visual Hero Experience (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#0A0D14] p-8 md:p-10 text-text-primary flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Background Glow Spheres */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#38BDF8]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-primary/40 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo and Back */}
          <div className="relative z-10 flex flex-col items-start gap-4">
            <Link href="/" className="text-white/80 hover:text-primary flex items-center gap-1.5 text-xs font-semibold transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2.5 bg-surface/10 backdrop-blur-md px-3.5 py-2 rounded-[var(--radius-lg)] border border-white/15">
                <div className="w-7 h-7 bg-surface rounded-[var(--radius-md)] flex items-center justify-center text-primary font-bold">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <span className="font-extrabold tracking-tight text-white text-base">
                  HireMind <span className="text-[#38BDF8]">AI</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Dynamic Hero Feature Card */}
          <div className="relative z-10 space-y-6 my-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 text-xs font-semibold text-sky-200 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Next-Gen Talent Ingestion</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-text-primary text-white">
              Autonomous AI Recruitment Command Suite
            </h2>

            <p className="text-xs md:text-sm text-sky-100/80 leading-relaxed">
              Automate job analysis, candidate screening, AI voice interviews, and evidence verification while retaining 100% human hiring decision control.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-medium text-sky-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Evidence-Based Skill Verification Engine</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-sky-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Recruiter AI Copilot Decision Assistant</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-sky-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Human-in-the-Loop Decision Control</span>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-sky-200/70">
            <span>Enterprise Security Guaranteed</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

        </div>

        {/* Right Column: Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-surface">
          
          <div className="w-full max-w-md mx-auto">
            {/* Form Header */}
            <div className="mb-8">
              <h1 className="text-xl md:text-2xl font-extrabold text-ink tracking-tight">
                HR Recruiter Sign In
              </h1>
              <p className="text-xs text-ink-soft mt-1">
                Enter your enterprise corporate credentials to access the recruitment command center.
              </p>
            </div>

            {/* Google Authentication Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
              className="w-full py-2.5 px-4 mb-6 bg-surface hover:bg-page-bg border border-border rounded-[var(--radius-md)] shadow-sm transition-all flex items-center justify-center gap-3"
            >
              {googleLoading ? (
                <span className="text-xs font-bold text-ink">Connecting to Google...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-xs font-bold text-ink">Sign in with Google (Enterprise)</span>
                </>
              )}
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-3 text-xs text-ink-faint font-medium">OR CONTINUE WITH EMAIL</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative mb-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-3.5 pr-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-xs font-semibold text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
                  Company Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-3.5 pr-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-xs font-semibold text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                    placeholder="e.g. Acme Enterprise"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink-faint absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-xs font-semibold text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                    placeholder="recruiter@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[11px] font-bold text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-ink-faint absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-xs font-semibold text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-[#0A66C2] border-border"
                  />
                  <span className="text-xs text-ink-soft font-medium">Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Access Recruiter Suite</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-6 text-center text-xs text-ink-faint">
                Don't have an account?{' '}
                <Link href="/register" className="text-primary font-bold hover:underline">
                  Sign up
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
