'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Sparkles, ArrowRight, ShieldCheck, Video, Bot, Zap, BarChart3, CheckCircle, Lock } from 'lucide-react';
import { TiltCard } from '@/components/animations/TiltCard';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-page-bg text-text-primary flex flex-col font-sans selection:bg-primary selection:text-text-primary">
      {/* Navigation */}
      <header className="border-b border-border bg-page-bg/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Logo size="md" />
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-text-secondary">
          <a href="#how-it-works" className="hover:text-text-primary transition-colors">How It Works</a>
          <a href="#verification" className="hover:text-text-primary transition-colors">Skill Verification</a>
          <a href="#security" className="hover:text-text-primary transition-colors">Human-in-the-Loop</a>
        </div>
        <div className="flex items-center gap-3">
          {/* Removed login buttons from header per user request */}
        </div>
      </header>

      {/* Hero Section */}
      <ScrollReveal direction="up" duration={0.8}>
        <section className="relative px-6 py-20 lg:py-28 max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary max-w-4xl leading-tight">
            Hire Smarter. <br />
            <span className="text-primary">Verify Talent.</span> Decide Better.
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            An autonomous AI recruitment platform that sources, screens, interviews, and verifies candidates — while keeping recruiters in control of the final hiring decision.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton magneticPull={20}>
              <Link
                href="/login/hr"
                className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-dark-blue text-white text-sm font-extrabold rounded-[var(--radius-md)] border border-border shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Start Hiring Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <MagneticButton magneticPull={20}>
              <Link
                href="/login/candidate"
                className="w-full sm:w-auto px-8 py-3.5 bg-surface hover:bg-page-bg text-primary text-sm font-extrabold rounded-[var(--radius-md)] border border-primary shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 bg-light-blue hover:bg-[#D8E7F1] text-[#16324F] text-sm font-semibold rounded-[var(--radius-md)] border border-border transition-colors flex items-center justify-center"
            >
              See How It Works
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* Problem vs Solution */}
      <section className="bg-surface border-y border-border py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-surface p-8 rounded-[var(--radius-lg)] border border-border">
            <h3 className="text-xl font-bold text-primary mb-3">The Recruitment Problem</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Recruiters waste 70% of their time on manual tasks: parsing repetitive job descriptions, reading hundreds of resume PDFs, manually sending emails, and guessing candidate skill authenticity.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-[var(--radius-lg)] border border-border">
            <h3 className="text-xl font-bold text-emerald-400 mb-3">The HireMind Solution</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              HireMind AI automates sourcing, resume screening, technical interviews, and evidence-based skill verification — presenting explainable recommendations so recruiters make informed final hiring decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Key Feature Cards */}
      <ScrollReveal direction="up" duration={0.6} delay={0.2}>
        <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-text-primary">Autonomous AI Capabilities</h2>
            <p className="text-sm text-text-secondary mt-2">Built for modern enterprise recruiters and hiring leaders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TiltCard maxTilt={8}>
              <div className="bg-surface p-6 rounded-[var(--radius-md)] border border-border h-full">
                <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-base font-bold text-text-primary">AI Skill Verification</h4>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Compares candidate claims against evidence from resumes, coding challenges, and live AI interviews with confidence ratings.
                </p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8}>
              <div className="bg-surface p-6 rounded-[var(--radius-md)] border border-border h-full">
                <Video className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-base font-bold text-text-primary">Interactive AI Interview</h4>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Autonomous voice and text interviews evaluating technical knowledge, communication, and scenario problem-solving skills.
                </p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8}>
              <div className="bg-surface p-6 rounded-[var(--radius-md)] border border-border h-full">
                <Bot className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-base font-bold text-text-primary">Recruiter AI Copilot</h4>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                  Ask natural language questions to compare candidates, audit evidence gaps, and summarize shortlist reasoning instantly.
                </p>
              </div>
            </TiltCard>
          </div>
        </section>
      </ScrollReveal>

      {/* Human-in-the-Loop Core Philosophy */}
      <section id="security" className="bg-surface border-t border-border py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-border text-xs font-bold text-primary mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Human-in-the-Loop Safeguard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            AI Automates. Human Recruiter Decides.
          </h2>
          <p className="text-sm text-text-secondary mt-3 leading-relaxed">
            HireMind AI never makes autonomous hiring decisions. Our system presents evidence-based recommendations, leaving final hiring authority strictly with human recruiters.
          </p>
        </div>
      </section>

      {/* How It Works - Detailed Description */}
      <section id="how-it-works" className="bg-page-bg border-t border-border py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-text-primary">How HireMind AI Works</h2>
            <p className="text-sm text-text-secondary mt-3">A transparent look at our autonomous recruitment pipeline.</p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-surface p-6 rounded-[var(--radius-md)] border border-border flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-text-primary">Talent Ingestion & Skill Parsing</h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Candidates securely upload their resume and portfolio. Our AI instantly parses the data, extracting core technical skills, past experiences, and educational background without the need for manual data entry.
                </p>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-[var(--radius-md)] border border-border flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-text-primary">Autonomous Verification & Interview</h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  The system cross-references claimed skills against live GitHub repositories and triggers a conversational AI voice interview to validate technical knowledge and problem-solving abilities in real-time.
                </p>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-[var(--radius-md)] border border-border flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-text-primary">Recruiter Decision Telemetry</h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  All evidence is compiled into a highly readable Candidate Dossier. The Recruiter AI Copilot flags strengths and inconsistencies, presenting a clear recommendation for the human recruiter to make the final decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-page-bg px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <Logo size="sm" />
          <p>© 2026 HireMind AI. All rights reserved. Autonomous Recruitment & Talent Verification.</p>
        </div>
      </footer>
    </div>
  );
}
