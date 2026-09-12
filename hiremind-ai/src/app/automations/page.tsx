'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { WorkflowVisualizer } from '@/components/WorkflowVisualizer';
import { automationService } from '@/services/automation.service';
import { AutomationWorkflow, EmailCommunication } from '@/types';
import { Zap, Mail, Play, Loader2 } from 'lucide-react';

export default function AutomationsPage() {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [emails, setEmails] = useState<EmailCommunication[]>([]);
  const [runningId, setRunningId] = useState<string | null>(null);

  useEffect(() => {
    async function loadAutomations() {
      const [wData, eData] = await Promise.all([
        automationService.getAutomations(),
        automationService.getEmailCommunications()
      ]);
      setWorkflows(wData);
      setEmails(eData);
    }
    loadAutomations();
  }, []);

  const handleTrigger = async (id: string) => {
    setRunningId(id);
    const updated = await automationService.triggerWorkflow(id);
    setWorkflows((prev) => prev.map((w) => (w.id === id ? updated : w)));
    setTimeout(() => setRunningId(null), 1200);
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-text-primary">Automation Execution Pipeline</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Visualizing low-code platform backend workflows, webhook triggers, and automated recruiter emails.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-page-bg px-3 py-1.5 rounded-[var(--radius-sm)] border border-border text-xs font-bold text-emerald-400">
            <Zap className="w-4 h-4 fill-emerald-400" />
            <span>Low-Code Webhooks Ready</span>
          </div>
        </div>

        {/* Interactive Node Graph Visualizer Component */}
        <WorkflowVisualizer />

        {/* Automation Cards Grid */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-text-primary">Active Backend Automation Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((wf) => (
              <div
                key={wf.id}
                className="bg-surface border border-border hover:border-border-hover hover:shadow-sm p-5 rounded-[var(--radius-lg)] shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-text-primary">{wf.name}</h3>
                      <p className="text-xs text-text-secondary mt-1">{wf.description}</p>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                        wf.status === 'RUNNING' || runningId === wf.id
                          ? 'bg-blue-950/60 text-blue-400 border-blue-800/60 animate-pulse'
                          : 'bg-emerald-950/60 text-emerald-400 border-border'
                      }`}
                    >
                      ● {runningId === wf.id ? 'RUNNING' : wf.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-text-secondary bg-page-bg p-3 rounded-[var(--radius-md)] border border-border">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-text-muted block">Processed</span>
                      <span className="font-extrabold text-text-primary">{wf.processedCount} items</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-text-muted block">Duration</span>
                      <span className="font-bold text-text-secondary">{wf.duration}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-text-muted block">Last Run</span>
                      <span className="font-bold text-text-secondary">{wf.lastRun}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border">
                  <button
                    onClick={() => handleTrigger(wf.id)}
                    disabled={runningId === wf.id}
                    className="px-3.5 py-2 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] border border-border transition-colors flex items-center gap-1.5"
                  >
                    {runningId === wf.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                    <span>Execute Workflow</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Communication Automation UI */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>Automated Candidate Communication Telemetry</span>
              </h2>
              <p className="text-xs text-text-secondary">
                Transactional candidate email status triggered by low-code backend nodes.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {emails.map((email) => (
              <div
                key={email.id}
                className="bg-page-bg border border-border p-4 rounded-[var(--radius-md)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-text-primary">{email.candidateName} ({email.candidateEmail})</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/30 text-primary border border-border">
                      {email.emailType}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary font-medium mt-1">{email.subject}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{email.preview}</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-border">
                    {email.status}
                  </span>
                  <span className="text-[10px] text-text-muted">{email.sentTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
