'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { callWebhook } from '@/lib/apiClient';
import { WEBHOOKS } from '@/lib/webhooks';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { StatusPill } from '@/components/ui/StatusPill';
import { PlayCircle } from 'lucide-react';
import { candidatesService } from '@/services/candidates.service';
import { jobsService } from '@/services/jobs.service';
import { Candidate, Job } from '@/types';
import { TiltCard } from '@/components/animations/TiltCard';
import { MagneticButton } from '@/components/animations/MagneticButton';

const TRACKER_STEPS = [
  'Applied',
  'Screening', // Adjusted to match candidate.stage
  'Interview',
  'Shortlisted',
  'Offer',
  'Hired'
];

function getStepIndex(stage: string) {
  switch (stage) {
    case 'Applied': return 1;
    case 'Screening': return 2;
    case 'Interview': return 3;
    case 'Shortlisted': return 4;
    case 'Offer': return 5;
    case 'Hired': return 6;
    default: return 1;
  }
}

export default function CandidateDashboardPage() {
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      // Mocking getting the current candidate's applications (let's assume cand-1)
      const cands = await candidatesService.getCandidates();
      // We will pretend all fetched candidates are applications by this user for the demo
      setCandidateData(cands.slice(0, 3)); // just take top 3 for dashboard
      
      const jobsData = await jobsService.getJobs();
      setJobs(jobsData.slice(0, 3)); // Featured jobs
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const activeApp = candidateData.length > 0 ? candidateData[0] : null;
  const currentStep = activeApp ? getStepIndex(activeApp.stage) : 1;

  // Calculate averages for stat cards
  const appliedJobsCount = candidateData.length;
  const avgMatch = Math.round(candidateData.reduce((acc, c) => acc + (c.matchScore || 0), 0) / (appliedJobsCount || 1));
  const avgInterview = Math.round(candidateData.reduce((acc, c) => acc + (c.interviewScore || 0), 0) / (appliedJobsCount || 1));
  const avgVerification = Math.round(candidateData.reduce((acc, c) => acc + (c.verificationScore || 0), 0) / (appliedJobsCount || 1));

  return (
    <DashboardLayout role="candidate">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-ink">Welcome back, Candidate</h1>
          <p className="text-sm text-ink-soft">
            Track your applications and complete pending assessments.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-ink-faint">Loading dashboard...</div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Applied Jobs" value={appliedJobsCount} />
              <StatCard label="AI Match %" value={`${avgMatch}%`} />
              <StatCard label="Interview Score" value={`${avgInterview}%`} />
              <StatCard label="Skill Verification" value={`${avgVerification}%`} />
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
                      <StatusPill status={activeApp.stage} variant="primary" />
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
                    
                    {currentStep === 3 && (
                      <div className="pt-4 mt-2 border-t border-border">
                        <MagneticButton>
                          <Link href="/candidate/interview/new" className="inline-flex items-center justify-center gap-2 w-full mt-4 py-2.5 px-4 bg-primary text-white font-semibold rounded-[var(--radius-md)] shadow-sm hover:bg-dark-blue transition-colors">
                            <PlayCircle className="w-4 h-4" />
                            Start AI Interview
                          </Link>
                        </MagneticButton>
                      </div>
                    )}
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
                    {jobs.map(job => (
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
                 {/* Empty sidebar for now or generic widgets */}
                 <Card>
                   <h3 className="font-semibold text-ink mb-2">Next Steps</h3>
                   <p className="text-sm text-ink-soft mb-4">Complete your pending assessments and interviews to boost your verification score.</p>
                   <MagneticButton>
                     <Link href="/candidate/assessments">
                       <Button className="w-full">View Assessments</Button>
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
