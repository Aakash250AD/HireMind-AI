'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { callWebhook } from '@/lib/apiClient';
import { WEBHOOKS } from '@/lib/webhooks';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';

interface ApplicationStatus {
  currentStep: number;
  applications: {
    jobId: string;
    jobTitle: string;
    status: string;
    dateApplied: string;
  }[];
}

const TRACKER_STEPS = [
  'Applied',
  'Under Review',
  'Interview',
  'Shortlisted',
  'Rejected',
  'Hired'
];

export default function CandidateApplicationsPage() {
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    setLoading(true);
    try {
      const data = await callWebhook<ApplicationStatus>(WEBHOOKS.candidateStatus);
      setStatus(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-ink">My Applications</h1>
          <p className="text-sm text-ink-soft mt-1">Track the status of your job applications.</p>
        </div>

        {loading ? (
          <div className="py-10 text-center text-ink-faint">Loading applications...</div>
        ) : (
          <div className="space-y-6">
            {status && status.applications.length > 0 ? (
              status.applications.map(app => (
                <Card key={app.jobId} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-ink">{app.jobTitle}</h2>
                      <p className="text-xs text-ink-soft">Applied on {app.dateApplied}</p>
                    </div>
                    <StatusPill status={app.status} variant="primary" />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {TRACKER_STEPS.map((step, idx) => {
                      const stepNum = idx + 1;
                      const isCompleted = stepNum < status.currentStep;
                      const isCurrent = stepNum === status.currentStep;
                      
                      return (
                        <div 
                          key={step} 
                          className={`flex-1 min-w-[100px] p-3 text-center rounded-lg border text-xs font-semibold transition-all ${
                            isCompleted 
                              ? 'bg-primary border-primary text-white'
                              : isCurrent
                              ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(22,87,204,0.3)] animate-pulse'
                              : 'bg-surface-sunken border-border text-ink-faint'
                          }`}
                        >
                          {stepNum}. {step}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="py-12 text-center text-ink-soft">
                You haven't applied to any jobs yet. Browse jobs to get started.
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
