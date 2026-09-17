'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { WorkflowVisualizer } from '@/components/WorkflowVisualizer';
import { automationService } from '@/services/automation.service';
import { AutomationWorkflow, EmailCommunication } from '@/types';
import { Mail, Play, Loader2, Users2 } from 'lucide-react';

export default function AutomationsPage() {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [emails, setEmails] = useState<EmailCommunication[]>([]);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAutomations();
  }, []);

  async function loadAutomations() {
    setLoading(true);
    setError(null);
    try {
      const [wData, eData] = await Promise.all([
        automationService.getAutomations(),
        automationService.getEmailCommunications()
      ]);
      setWorkflows(wData);
      setEmails(eData);
    } catch (err) {
      setError((err as Error).message || 'Failed to load automations');
    } finally {
      setLoading(false);
    }
  }

  const handleTrigger = async (id: string) => {
    setRunningId(id);
    try {
      const updated = await automationService.triggerWorkflow(id);
      setWorkflows((prev) => prev.map((w) => (w.id === id ? updated : w)));
    } catch (err) {
      setError((err as Error).message || 'Failed to trigger workflow');
    } finally {
      setRunningId(null);
    }
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-text-primary">Automation Execution Pipeline</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Reflects the status of backend automation workflows run by SNS Workbench — this view is empty until those workflows report their own runs.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-danger-tint border border-danger text-danger p-4 rounded-[var(--radius-md)] flex items-center justify-between text-sm">
            <span>{error}</span>
            <button onClick={loadAutomations} className="font-bold underline">Retry</button>
          </div>
        )}

        {/* Interactive Node Graph Visualizer Component */}
        <WorkflowVisualizer />

        {/* Automation Cards Grid */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-text-primary">Active Backend Automation Agents</h2>
          {loading ? (
            <div className="py-8 text-center text-text-secondary text-sm">Loading automation workflows...</div>
          ) : workflows.length === 0 ? (
            <div className="py-10 text-center text-text-secondary text-sm border border-dashed border-border rounded-[var(--radius-lg)]">
              No automation runs recorded yet — this fills in as backend workflows execute.
            </div>
          ) : (
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
          )}
        </div>

        {/* Email Communication Automation UI */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>Automated Candidate Communication</span>
              </h2>
              <p className="text-xs text-text-secondary">
                Transactional candidate email status triggered by backend workflow nodes.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-6 text-center text-text-secondary text-sm">Loading email log...</div>
          ) : emails.length === 0 ? (
            <div className="py-8 text-center text-text-secondary text-sm border border-dashed border-border rounded-[var(--radius-md)]">
              No candidate emails sent yet.
            </div>
          ) : (
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
          )}
        </div>

        {/* Candidate Sourcing (not yet built) */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-3">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Users2 className="w-4 h-4 text-primary" />
            <span>Candidate Sourcing</span>
          </h2>
          <div className="p-6 text-center text-text-secondary text-sm border border-dashed border-border rounded-[var(--radius-md)]">
            Proactive candidate sourcing isn&apos;t connected yet — no sourcing webhook or trigger exists today. Once available, this panel will let you launch sourcing runs per job and track outreach status.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
