'use client';

import React from 'react';
import { PipelineStage } from '@/types';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface RecruitmentPipelineProps {
  currentStage?: PipelineStage;
  stageCounts?: Record<PipelineStage, number>;
  onStageClick?: (stage: PipelineStage) => void;
}

export const RecruitmentPipeline: React.FC<RecruitmentPipelineProps> = ({
  currentStage,
  stageCounts = {
    Applied: 348,
    Screening: 276,
    Interview: 42,
    Verification: 32,
    Shortlisted: 18,
    'Human Review': 12,
    Hired: 6,
    Archived: 0
  },
  onStageClick
}) => {
  const stages: PipelineStage[] = [
    'Applied',
    'Screening',
    'Interview',
    'Verification',
    'Shortlisted',
    'Human Review',
    'Hired'
  ];

  return (
    <div className="bg-white border border-border rounded-[var(--radius-md)] p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-text-primary tracking-tight">Recruitment Pipeline Workflow</h3>
          <p className="text-xs text-text-secondary">Autonomous AI Screening & Verification → Recruiter Final Hiring Review</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/40 px-3 py-1 rounded-full border border-border/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Human-in-the-Loop Active</span>
        </div>
      </div>

      {/* Visual Stages Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((stage, idx) => {
          const isSelected = currentStage === stage;
          const isHumanStage = stage === 'Human Review' || stage === 'Hired';

          return (
            <button
              key={stage}
              onClick={() => onStageClick && onStageClick(stage)}
              className={`flex flex-col items-start p-3 rounded-[var(--radius-sm)] border text-left transition-all relative group ${
                isSelected
                  ? 'bg-primary border-border text-white shadow-md'
                  : isHumanStage
                  ? 'bg-page-bg border-border text-white hover:border-border-hover hover:shadow-sm'
                  : 'bg-page-bg border-border text-text-secondary hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                  Step {idx + 1}
                </span>
                {idx < stages.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-text-muted hidden lg:block" />
                )}
              </div>
              <span className="text-xs font-bold truncate w-full">{stage}</span>
              <span className={`text-base font-extrabold mt-1 ${isSelected ? 'text-text-primary' : 'text-zinc-100'}`}>
                {stageCounts[stage] || 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
