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
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

interface CandidateStats {
  appliedJobs: number;
  profileCompletion: number;
}

interface ApplicationStatus {
  currentStep: number;
  applications: {
    jobId: string;
    jobTitle: string;
    status: string;
    dateApplied: string;
  }[];
}

interface Job {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  location: string;
  salary: string;
  skills: string[];
}

const TRACKER_STEPS = [
  'Applied',
  'Under Review',
  'Interview',
  'Shortlisted',
  'Rejected',
  'Hired'
];

export default function CandidateDashboardPage() {
  const [stats, setStats] = useState<CandidateStats | null>(null);
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [statsData, statusData, jobsData] = await Promise.all([
        callWebhook<CandidateStats>(WEBHOOKS.candidateStats),
        callWebhook<ApplicationStatus>(WEBHOOKS.candidateStatus),
        callWebhook<Job[]>(WEBHOOKS.jobList)
      ]);
      setStats(statsData);
      setStatus(statusData);
      setJobs(jobsData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleApply(jobId: string) {
    setApplyingTo(jobId);
    try {
      await callWebhook(WEBHOOKS.candidateApply, { jobId });
      alert('Application submitted successfully!');
      loadDashboard();
    } catch (err) {
      alert('Failed to apply.');
    } finally {
      setApplyingTo(null);
    }
  }

  return (
    <DashboardLayout role="candidate">
      <div className="space-y-8">
        
        {/* Header */}
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
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Applied Jobs" value={stats.appliedJobs} />
                <StatCard label="Profile Completion" value={`${stats.profileCompletion || 60}%`} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 space-y-8">
                {/* Active Application Tracker */}
                {status && status.applications.length > 0 && (
                  <Card className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-ink">Active Application</h2>
                        <p className="text-sm text-ink-soft">{status.applications[0].jobTitle}</p>
                      </div>
                      <StatusPill status={status.applications[0].status} variant="primary" />
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
                )}

                {/* Available Jobs */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-ink">Recommended Jobs</h2>
                  <div className="grid gap-4">
                    {jobs.map(job => (
                      <Card key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-base font-semibold text-ink">{job.title}</h3>
                            <StatusPill status={job.category} />
                          </div>
                          <div className="flex items-center gap-4 text-xs text-ink-faint font-medium">
                            <span>{job.location}</span>
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleApply(job.id)} 
                          isLoading={applyingTo === job.id}
                        >
                          Apply Now
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 {/* Sidebar Content Area */}
              </div>

            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
