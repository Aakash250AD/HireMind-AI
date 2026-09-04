'use client';

import React from 'react';

export const RecruiterWorkflowBanner: React.FC = () => {
  const steps = [
    'CREATE JOB',
    'AI ANALYSIS',
    'SOURCE CANDIDATES',
    'SCREEN RESUMES',
    'MATCH CANDIDATES',
    'AI INTERVIEW',
    'VERIFY SKILLS',
    'RANK',
    'SHORTLIST',
    'HUMAN REVIEW',
    'FINAL DECISION'
  ];

  return (
    <div className="w-full bg-page-bg border-b border-border-color px-4 py-2.5 overflow-x-auto no-scrollbar">
      <div className="flex items-center min-w-max justify-between gap-1 text-[11px] font-semibold text-text-secondary">
        <span className="text-primary font-bold uppercase tracking-wider text-[10px] mr-2">
          Autonomous Recruitment Flow:
        </span>
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <span
              className={`px-2 py-0.5 rounded border ${
                step === 'HUMAN REVIEW' || step === 'FINAL DECISION'
                  ? 'bg-primary/30 text-white border-[#722F37]'
                  : 'bg-white text-text-secondary border-border-color'
              }`}
            >
              {step}
            </span>
            {idx < steps.length - 1 && <span className="text-zinc-600">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
