'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-md bg-white border border-border-color rounded-[var(--radius-lg)] p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-6">
          <Logo size="lg" />
          <h2 className="text-xl font-bold text-text-primary mt-4">Reset Password</h2>
          <p className="text-xs text-text-secondary mt-1">Enter your email to receive recovery instructions</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-text-primary">Reset Link Sent</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              We have dispatched a password recovery link to your email address. Please check your inbox.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="email"
                  required
                  placeholder="recruiter@company.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#722F37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-sm)] shadow-lg border border-dark-blue transition-colors"
            >
              Send Reset Instructions
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
