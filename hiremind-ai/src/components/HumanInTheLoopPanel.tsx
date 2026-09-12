'use client';

import React, { useState } from 'react';
import { Candidate } from '@/types';
import { ShieldAlert, CheckCircle, XCircle, FileQuestion, Lock } from 'lucide-react';
import { SwipeToDecideCard } from '@/components/animations/SwipeToDecideCard';

interface HumanInTheLoopPanelProps {
  candidate: Candidate;
  onDecisionSubmitted?: (status: 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED', notes: string) => void;
}

export const HumanInTheLoopPanel: React.FC<HumanInTheLoopPanelProps> = ({
  candidate,
  onDecisionSubmitted
}) => {
  const [notes, setNotes] = useState(candidate.recruiterNotes || '');
  const [submitting, setSubmitting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(candidate.decisionStatus || 'PENDING');

  const handleDecision = async (status: 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED') => {
    setSubmitting(true);
    setCurrentStatus(status);
    if (onDecisionSubmitted) {
      await onDecisionSubmitted(status, notes);
    }
    setSubmitting(false);
  };

  return (
    <SwipeToDecideCard 
      swipeThreshold={150} 
      onAdvance={() => handleDecision('APPROVED')} 
      onPass={() => handleDecision('REJECTED')}
    >
      <div className="bg-surface border border-border rounded-[var(--radius-md)] p-5 shadow-2xl relative overflow-hidden">
      {/* Top Banner Notice */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
        <Lock className="w-4 h-4" />
        <span>HUMAN-IN-THE-LOOP RECRUITER DECISION PANEL</span>
      </div>

      <div className="bg-page-bg p-4 rounded-[var(--radius-sm)] border border-border mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-text-secondary">AI Evaluation Recommendation</span>
            <h4 className="text-base font-bold text-emerald-400 mt-0.5">
              Recommended for final recruiter review
            </h4>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-text-secondary">Overall Match</span>
            <div className="text-lg font-extrabold text-text-primary">{candidate.overallScore}%</div>
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-2 leading-relaxed">
          AI agents have screened candidate resume, evaluated technical responses, and cross-referenced evidence.
          <strong className="text-white"> Final hiring decisions are strictly made by human recruiters.</strong>
        </p>
      </div>

      {/* Recruiter Notes Area */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
          Recruiter Decision Notes / Feedback
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter recruiter review justification or notes prior to decision..."
          className="w-full p-3 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          {currentStatus === 'APPROVED' && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded border border-border flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> APPROVED FOR HIRE
            </span>
          )}
          {currentStatus === 'REJECTED' && (
            <span className="text-xs font-bold text-primary bg-error-bg px-3 py-1.5 rounded border border-border flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> REJECTED BY RECRUITER
            </span>
          )}
          {currentStatus === 'INFO_REQUESTED' && (
            <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded border border-amber-800/60 flex items-center gap-1.5">
              <FileQuestion className="w-4 h-4" /> MORE INFO REQUESTED
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            disabled={submitting}
            onClick={() => handleDecision('INFO_REQUESTED')}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-page-bg hover:bg-zinc-700 text-amber-400 text-xs font-bold rounded-[var(--radius-sm)] border border-amber-500/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <FileQuestion className="w-3.5 h-3.5" />
            <span>REQUEST INFO</span>
          </button>
          <button
            disabled={submitting}
            onClick={() => handleDecision('REJECTED')}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-rose-950/50 hover:bg-rose-900 text-error text-xs font-bold rounded-[var(--radius-sm)] border border-border transition-colors flex items-center justify-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>REJECT</span>
          </button>
          <button
            disabled={submitting}
            onClick={() => handleDecision('APPROVED')}
            className="flex-1 sm:flex-none px-4 py-2 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-sm)] shadow border border-border transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>APPROVE</span>
          </button>
        </div>
      </div>
      </div>
    </SwipeToDecideCard>
  );
};
