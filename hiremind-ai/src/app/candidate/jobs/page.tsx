'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { callWebhook } from '@/lib/apiClient';
import { WEBHOOKS } from '@/lib/webhooks';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusPill } from '@/components/ui/StatusPill';

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

export default function CandidateJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setLoading(true);
    try {
      const data = await callWebhook<Job[]>(WEBHOOKS.jobList);
      setJobs(data || []);
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
    } catch (err) {
      alert('Failed to apply.');
    } finally {
      setApplyingTo(null);
    }
  }

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-ink">Browse Jobs</h1>
          <p className="text-sm text-ink-soft mt-1">Find and apply for open positions that match your skills.</p>
        </div>

        {loading ? (
          <div className="py-10 text-center text-ink-faint">Loading jobs...</div>
        ) : (
          <div className="grid gap-4">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <Card key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 hover:shadow-sm transition-all">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                      <StatusPill status={job.category} />
                    </div>
                    <p className="text-sm text-ink-soft line-clamp-2 mb-3">{job.description}</p>
                    <div className="flex items-center gap-4 text-xs text-ink-faint font-medium">
                      <span>{job.location}</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleApply(job.id)} 
                    isLoading={applyingTo === job.id}
                    className="shrink-0"
                  >
                    Apply Job
                  </Button>
                </Card>
              ))
            ) : (
              <Card className="py-12 text-center text-ink-soft">
                No jobs available right now. Please check back later.
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
