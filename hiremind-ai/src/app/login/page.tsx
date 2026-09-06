'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { 
  UserCheck, 
  User, 
  ArrowRight,
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Bot, 
  BrainCircuit, 
  CheckCircle2,
  Lock,
  Mail
} from 'lucide-react';

export default function SplitLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'hr' | 'candidate'>('hr');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'hr') {
        router.push('/dashboard');
      } else {
        router.push('/candidate-dashboard');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Container Split Card */}
      <div className="w-full max-w-5xl bg-white border border-border rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Unique Visual Hero Experience (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#0A0D14] p-8 md:p-10 text-text-primary flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Background Glow Spheres */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#38BDF8]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-primary/40 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo and Back */}
          <div className="relative z-10 flex flex-col items-start gap-4">
            <Link href="/" className="text-white/80 hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-[var(--radius-lg)] border border-white/15">
                <div className="w-7 h-7 bg-white rounded-[var(--radius-md)] flex items-center justify-center text-primary font-bold">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Next-Gen Talent Ingestion</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-text-primary">
              {role === 'hr' 
                ? 'Autonomous AI Recruitment Command Suite' 
                : 'Accelerate Your Career with AI Skill Verification'}
            </h2>

            <p className="text-xs md:text-sm text-sky-100/80 leading-relaxed">
              {role === 'hr'
                ? 'Automate job analysis, candidate screening, AI voice interviews, and evidence verification while retaining 100% human hiring decision control.'
                : 'Complete instant AI screening, demonstrate verified evidence for your core technical skills, and track active application status in real-time.'}
            </p>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-medium text-sky-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{role === 'hr' ? 'Evidence-Based Skill Verification Engine' : 'Direct AI Interview & Voice Evaluation'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-sky-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{role === 'hr' ? 'Recruiter AI Copilot Decision Assistant' : 'Real-time Application Status Telemetry'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-sky-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{role === 'hr' ? 'Human-in-the-Loop Decision Control' : '1-Click Fast-Track AI Job Applications'}</span>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-sky-200/70">
            <span>Enterprise Security Guaranteed</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

        </div>

        {/* Right Column: Unique Interactive Split Form (7 Cols) */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white">
          
          <div>
            {/* Split Portal Switcher Pills */}
            <div className="bg-page-bg p-1.5 rounded-[var(--radius-lg)] border border-border mb-8 grid grid-cols-2 gap-1 max-w-sm">
              <button
                type="button"
                onClick={() => { setRole('hr'); setEmail('recruiter@company.com'); }}
                className={`py-2.5 px-4 rounded-[var(--radius-md)] text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  role === 'hr'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>HR Recruiter</span>
              </button>

              <button
                type="button"
                onClick={() => { setRole('candidate'); setEmail('candidate@example.com'); }}
                className={`py-2.5 px-4 rounded-[var(--radius-md)] text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  role === 'candidate'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Candidate</span>
              </button>
            </div>

            {/* Form Header */}
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
                {role === 'hr' ? 'HR Recruiter Sign In' : 'Candidate Portal Access'}
              </h1>
              <p className="text-xs text-text-secondary mt-1">
                {role === 'hr'
                  ? 'Enter your enterprise corporate credentials to access the recruitment command center.'
                  : 'Enter your applicant credentials to manage your job applications and AI interviews.'}
              </p>
            </div>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {role === 'hr' && (
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={company || 'HireMind AI Corp'}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-3.5 pr-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-xs font-semibold text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                      placeholder="e.g. Acme Enterprise"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                  {role === 'hr' ? 'Work Email Address' : 'Candidate Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-secondary absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-xs font-semibold text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
                    placeholder={role === 'hr' ? 'recruiter@company.com' : 'candidate@example.com'}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[11px] font-bold text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-text-secondary absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password || '••••••••'}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-page-bg border border-border rounded-[var(--radius-md)] text-xs font-semibold text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all"
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
                  <span className="text-xs text-text-secondary font-medium">Keep me signed in</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{role === 'hr' ? 'Access Recruiter Suite' : 'Access Candidate Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Footer Register Prompt */}
          <div className="pt-6 border-t border-border text-center text-xs text-text-secondary">
            <span>Don&apos;t have an account yet? </span>
            <Link href="/register" className="font-bold text-primary hover:underline">
              Create HireMind Account
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
