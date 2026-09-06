'use client';

import React from 'react';

export const WorkflowVisualizer: React.FC = () => {
  const nodes = [
    { id: 'n1', title: 'Webhook Trigger', subtitle: 'Low-Code Event', icon: '⚡' },
    { id: 'n2', title: 'Job Analysis Agent', subtitle: 'LLM Parser', icon: '🧠' },
    { id: 'n3', title: 'Candidate Search Pool', subtitle: 'Auto Sourcing', icon: '👥' },
    { id: 'n4', title: 'Resume Parser', subtitle: 'PDF / DOCX Ingest', icon: '📄' },
    { id: 'n5', title: 'AI Match Scoring', subtitle: 'Semantic Vector Rank', icon: '🎯' },
    { id: 'n6', title: 'Interactive AI Interview', subtitle: 'Voice & Text Session', icon: '🎤' },
    { id: 'n7', title: 'Skill Verification Engine', subtitle: 'Evidence Cross-Check', icon: '⭐' },
    { id: 'n8', title: 'Candidate Ranking', subtitle: 'Multi-Factor Score', icon: '🏆' },
    { id: 'n9', title: 'Human Review Panel', subtitle: 'Recruiter Final Decision', icon: '👨‍💼' }
  ];

  return (
    <div className="bg-white border border-border rounded-[var(--radius-md)] p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-text-primary">Low-Code Backend Automation Workflow</h3>
          <p className="text-xs text-text-secondary">
            Frontend visual representation of backend webhook nodes executed on external platforms.
          </p>
        </div>
        <span className="text-xs font-bold text-primary bg-primary/20 border border-border px-3 py-1 rounded-full">
          ● Workflow Engine Connected
        </span>
      </div>

      {/* Visual Graph Layout */}
      <div className="relative flex flex-col gap-4 overflow-x-auto py-2 no-scrollbar">
        <div className="flex items-center justify-between min-w-max gap-4">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div
                className={`p-4 rounded-[var(--radius-md)] border flex flex-col items-center justify-center text-center w-40 transition-all ${
                  node.id === 'n9'
                    ? 'bg-primary border-border shadow-lg text-white'
                    : 'bg-page-bg border-border hover:border-border-hover hover:shadow-sm'
                }`}
              >
                <span className="text-2xl mb-1">{node.icon}</span>
                <span className="text-xs font-bold text-text-primary line-clamp-1">{node.title}</span>
                <span className="text-[10px] text-text-secondary mt-0.5">{node.subtitle}</span>
              </div>
              {index < nodes.length - 1 && (
                <div className="flex items-center text-text-muted font-bold text-sm">
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
