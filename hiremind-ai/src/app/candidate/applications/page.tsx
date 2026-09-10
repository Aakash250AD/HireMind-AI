'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { callWebhook } from '@/lib/apiClient';
import { WEBHOOKS } from '@/lib/webhooks';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, FileSearch, Video, Award, XCircle, CheckCircle, ArrowRight } from 'lucide-react';

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
  { name: 'Applied', icon: CheckCircle2 },
  { name: 'Under Review', icon: FileSearch },
  { name: 'Interview', icon: Video },
  { name: 'Shortlisted', icon: Award },
  { name: 'Decision', icon: CheckCircle },
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
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-ink">My Applications</h1>
          <p className="text-sm text-ink-soft mt-1">Track the status of your job applications in real-time.</p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {status && status.applications.length > 0 ? (
              status.applications.map(app => (
                <Card key={app.jobId} className="space-y-8 p-6 lg:p-8 hover:shadow-lg transition-shadow border border-border/60">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-ink">{app.jobTitle}</h2>
                      <p className="text-sm text-ink-soft mt-1">Applied on {app.dateApplied} • Req ID: {app.jobId}</p>
                    </div>
                    <StatusPill status={app.status} variant="primary" />
                  </div>

                  <div className="relative pt-8">
                    {/* Background track */}
                    <div className="absolute top-[42px] left-0 w-full h-1 bg-surface-sunken rounded-full -z-10" />
                    
                    {/* Active track */}
                    <div 
                      className="absolute top-[42px] left-0 h-1 bg-primary rounded-full -z-10 transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(100, Math.max(0, ((status.currentStep - 1) / (TRACKER_STEPS.length - 1)) * 100))}%` }}
                    />

                    <div className="flex justify-between relative">
                      {TRACKER_STEPS.map((step, idx) => {
                        const stepNum = idx + 1;
                        const isCompleted = stepNum < status.currentStep;
                        const isCurrent = stepNum === status.currentStep;
                        const Icon = step.icon;
                        
                        return (
                          <div key={step.name} className="flex flex-col items-center w-24 gap-3">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isCompleted 
                                  ? 'bg-primary text-white shadow-md'
                                  : isCurrent
                                  ? 'bg-white border-2 border-primary text-primary shadow-[0_0_15px_rgba(22,87,204,0.3)] animate-pulse'
                                  : 'bg-surface-sunken border border-border text-ink-faint'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[11px] font-bold uppercase tracking-wide text-center leading-tight ${
                              isCompleted || isCurrent ? 'text-ink' : 'text-ink-faint'
                            }`}>
                              {step.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Area for Current Step */}
                  {status.currentStep === 3 && (
                    <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/5 rounded-[var(--radius-lg)] p-4 border border-primary/10">
                      <div>
                        <h4 className="text-sm font-bold text-ink">Action Required: AI Interview</h4>
                        <p className="text-xs text-ink-soft mt-1">Your application has been selected for an AI technical screening. Please complete it to move forward.</p>
                      </div>
                      <Link href="/candidate/interviews">
                        <Button className="shrink-0 flex items-center gap-2">
                          Go to Interviews <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  )}

                </Card>
              ))
            ) : (
              <Card className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <FileSearch className="w-12 h-12 text-ink-faint" />
                <div>
                  <h3 className="text-lg font-bold text-ink">No Applications Found</h3>
                  <p className="text-sm text-ink-soft mt-1">You haven't applied to any jobs yet.</p>
                </div>
                <Link href="/candidate/jobs">
                  <Button variant="primary">Browse Open Roles</Button>
                </Link>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
