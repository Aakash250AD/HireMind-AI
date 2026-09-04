'use client';

import React, { useState } from 'react';
import { SkillEvidence } from '@/types';
import { CheckCircle2, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface SkillVerificationCardProps {
  verification: SkillEvidence;
}

export const SkillVerificationCard: React.FC<SkillVerificationCardProps> = ({ verification }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = (status: SkillEvidence['status']) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>VERIFIED</span>
          </span>
        );
      case 'PARTIALLY VERIFIED':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded bg-amber-950/60 text-amber-400 border border-amber-800/60">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>PARTIALLY VERIFIED</span>
          </span>
        );
      case 'UNVERIFIED':
        return (
          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded bg-error-bg text-primary border border-error/60">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>UNVERIFIED</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-page-bg border border-border-color rounded-[var(--radius-md)] p-4 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-[var(--radius-sm)] bg-white border border-border-color text-primary">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">CLAIM:</span>
              <h4 className="text-sm font-bold text-text-primary">{verification.claim}</h4>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">Category: {verification.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {getStatusBadge(verification.status)}
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-text-secondary font-semibold uppercase">Confidence</span>
            <span className="text-sm font-extrabold text-text-primary">{verification.confidence}%</span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-[var(--radius-sm)] bg-white hover:bg-zinc-700 text-text-secondary transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Evidence Comparison */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border-color space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-[var(--radius-sm)] border border-border-color">
              <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                📄 Resume Evidence
              </span>
              <p className="text-xs text-zinc-200 mt-1">{verification.resumeEvidence || 'No direct claim in resume.'}</p>
            </div>
            <div className="bg-white p-3 rounded-[var(--radius-sm)] border border-border-color">
              <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                🎤 AI Interview Evidence
              </span>
              <p className="text-xs text-zinc-200 mt-1">{verification.interviewEvidence || 'Interview pending.'}</p>
            </div>
            <div className="bg-white p-3 rounded-[var(--radius-sm)] border border-border-color">
              <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                💻 Assessment Evidence
              </span>
              <p className="text-xs text-zinc-200 mt-1">{verification.assessmentEvidence || 'No assessment data.'}</p>
            </div>
          </div>

          <div className="bg-primary/15 border border-[#722F37]/40 p-3 rounded-[var(--radius-sm)]">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
              AI Assessment Reasoning:
            </span>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">{verification.explanation}</p>
            <p className="text-[10px] text-text-secondary italic mt-2">
              * Recommended for recruiter review. AI provides evidence matching; final verification decision belongs to the recruiter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
