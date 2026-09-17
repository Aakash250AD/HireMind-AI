'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { StatusPill } from '@/components/ui/StatusPill';
import { PlayCircle } from 'lucide-react';
import { candidatesService } from '@/services/candidates.service';
import { jobsService } from '@/services/jobs.service';
import { Job, PipelineStage } from '@/types';
import { TiltCard } from '@/components/animations/TiltCard';
import { MagneticButton } from '@/components/animations/MagneticButton';

const TRACKER_STEPS: PipelineStage[] = ['Applied', 'Screening', 'Interview', 'Shortlisted', 'Hired'];

function getStepIndex(stage: PipelineStage) {
  const idx = TRACKER_STEPS.indexOf(stage);
  return idx === -1 ? 1 : idx + 1;
}

interface MyApplication {
  jobId: string;
  jobTitle: string;
  status: PipelineStage;
  dateApplied: string;
}

export default function CandidateDashboardPage() {
  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError(null);
    try {
      const [appData, jobsData] = await Promise.all([
        candidatesService.getCandidateApplications(),
        jobsService.getJobs()
      ]);
      setApplications(appData.applications);
      setJobs(jobsData.slice(0, 3));
    } catch (err) {
      setError((err as Error).message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }

  const activeApp = applications.length > 0 ? applications[0] : null;
  const currentStep = activeApp ? getStepIndex(activeApp.status) : 1;

  return (
    <DashboardLayout role="candidate">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-ink">Welcome back</h1>
          <p className="text-sm text-ink-soft">
            Track your applications and complete pending assessments.
          </p>
        </div>

        {error && (
          <Card className="bg-danger-tint border-danger text-danger flex items-center justify-between p-4">
            <span className="text-sm font-medium">{error}</span>
            <Button variant="secondary" onClick={loadDashboard} className="bg-surface">Retry</Button>
          </Card>
        )}

        {loading ? (
          <div className="py-20 text-center text-ink-faint">Loading dashboard...</div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              <StatCard label="Applied Jobs" value={applications.length} />
              <StatCard label="Furthest Stage" value={activeApp ? activeApp.status : '—'} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">

                {/* Active Application Tracker */}
                {activeApp && (
                  <Card className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-ink">Active Application</h2>
                        <p className="text-sm text-ink-soft">{activeApp.jobTitle}</p>
                      </div>
                      <StatusPill status={activeApp.status} variant="primary" />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {TRACKER_STEPS.map((step, idx) => {
                        const stepNum = idx + 1;
                        const isCompleted = stepNum < currentStep;
                        const isCurrent = stepNum === currentStep;

                        return (
                          <div
                            key={step}
                            className={`flex-1 min-w-[100px] p-3 text-center rounded-[var(--radius-sm)] border text-xs font-semibold transition-all ${
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

                    {activeApp.status === 'Interview' && (
                      <div className="pt-4 mt-2 border-t border-border">
                        <MagneticButton>
                          <Link href="/candidate/interviews" className="inline-flex items-center justify-center gap-2 w-full mt-4 py-2.5 px-4 bg-primary text-white font-semibold rounded-[var(--radius-md)] shadow-sm hover:bg-dark-blue transition-colors">
                            <PlayCircle className="w-4 h-4" />
                            Continue AI Interview
                          </Link>
                        </MagneticButton>
                      </div>
                    )}
                  </Card>
                )}

                {!activeApp && (
                  <Card className="py-12 text-center text-ink-faint">
                    You haven&apos;t applied to any jobs yet.
                  </Card>
                )}

                {/* Featured Jobs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-ink">Featured Open Jobs</h2>
                    <Link href="/candidate/jobs" className="text-sm font-semibold text-primary hover:underline">
                      View all jobs
                    </Link>
                  </div>
                  <div className="grid gap-4">
                    {jobs.length === 0 ? (
                      <Card className="py-8 text-center text-ink-faint text-sm">No open jobs right now.</Card>
                    ) : jobs.map(job => (
                      <TiltCard key={job.id} maxTilt={4}>
                        <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow h-full">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-base font-semibold text-ink">{job.title}</h3>
                              <StatusPill status={job.department} />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-ink-faint font-medium">
                              <span>{job.location}</span>
                              <span>{job.salaryRange}</span>
                            </div>
                          </div>
                          <Link href="/candidate/jobs">
                            <Button variant="secondary">View Details</Button>
                          </Link>
                        </Card>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <Card>
                   <h3 className="font-semibold text-ink mb-2">Next Steps</h3>
                   <p className="text-sm text-ink-soft mb-4">Complete your pending assessments and interviews to boost your verification score.</p>
                   <MagneticButton>
                     <Link href="/candidate/interviews">
                       <Button className="w-full">View Interviews</Button>
                     </Link>
                   </MagneticButton>
                 </Card>
              </div>

            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
