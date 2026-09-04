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
import { Sparkles, Briefcase, Plus, Users, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface HRStats {
  activeJobs: number;
  applicants: number;
  aiShortlisted: number;
  interviews: number;
  offers: number;
  hired: number;
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
  applicantCount: number;
}

export default function HRDashboard() {
  const [stats, setStats] = useState<HRStats | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPostingJob, setIsPostingJob] = useState(false);
  const [jobPosting, setJobPosting] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError(null);
    try {
      const [statsData, jobsData] = await Promise.all([
        callWebhook<HRStats>(WEBHOOKS.hrStats),
        callWebhook<Job[]>(WEBHOOKS.jobList),
      ]);
      setStats(statsData);
      setJobs(jobsData || []);
    } catch (err) {
      setError((err as Error).message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }

  async function handlePostJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setJobPosting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      await callWebhook(WEBHOOKS.jobCreate, payload);
      setIsPostingJob(false);
      // Reload jobs
      loadDashboard();
    } catch (err) {
      alert('Failed to post job');
    } finally {
      setJobPosting(false);
    }
  }

  return (
    <DashboardLayout role="hr">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-ink">Recruitment Command Center</h1>
            <p className="text-sm text-ink-soft">
              Manage jobs, pipeline, and AI shortlists.
            </p>
          </div>
          <Button onClick={() => setIsPostingJob(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {error && (
          <Card className="bg-danger-tint border-danger text-danger flex items-center justify-between p-4">
            <span className="text-sm font-medium">{error}</span>
            <Button variant="secondary" onClick={loadDashboard} className="bg-white">Retry</Button>
          </Card>
        )}

        {loading && !stats ? (
          <div className="py-20 text-center text-ink-faint">
            <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-sm">Loading dashboard...</p>
          </div>
        ) : stats ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="Active Jobs" value={stats.activeJobs} delta={12} />
              <StatCard label="Applicants" value={stats.applicants} delta={18} />
              <StatCard label="Shortlisted" value={stats.aiShortlisted} delta={24} />
              <StatCard label="Interviews" value={stats.interviews} delta={8} />
              <StatCard label="Offers" value={stats.offers} delta={4} />
              <StatCard label="Hired" value={stats.hired} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Jobs Grid */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ink">Active Openings</h2>
                </div>
                
                <div className="grid gap-4">
                  {jobs.map(job => (
                    <Card key={job.id} className="hover:border-primary/30 hover:shadow-sm transition-all flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-base font-semibold text-ink">{job.title}</h3>
                            <StatusPill status={job.status} variant={job.status === 'ACTIVE' ? 'success' : 'default'} />
                            <StatusPill status={job.category} />
                          </div>
                          <p className="text-sm text-ink-soft line-clamp-2 mb-2">{job.description}</p>
                          <div className="flex items-center gap-4 text-xs text-ink-faint font-medium">
                            <span>{job.location}</span>
                            <span>{job.salary}</span>
                            <span className="flex items-center gap-1 text-primary">
                              <Users className="w-3.5 h-3.5" />
                              {job.applicantCount} applicants
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex gap-2">
                          {job.skills.slice(0,3).map(skill => (
                            <span key={skill} className="px-2 py-1 bg-surface-sunken rounded text-[11px] font-medium text-ink-soft">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-surface-sunken rounded text-[11px] font-medium text-ink-faint">
                              +{job.skills.length - 3}
                            </span>
                          )}
                        </div>
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="secondary" className="text-xs px-3 py-1.5 h-auto">
                            Manage Job
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="bg-primary-tint border-primary/20 p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-primary mb-1">AI Copilot</h3>
                    <p className="text-sm text-primary/80">
                      Ask AI to compare candidate proctored test results and evidence verification summaries.
                    </p>
                  </div>
                  <Link href="/copilot" className="w-full">
                    <Button className="w-full shadow-sm bg-primary text-white">
                      Launch Copilot
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </>
        ) : null}

        {/* Post Job Modal (Simple implementation) */}
        {isPostingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
            <Card className="w-full max-w-lg shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
              <button onClick={() => setIsPostingJob(false)} className="absolute top-4 right-4 text-ink-faint hover:text-ink">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-ink mb-6">Post New Job</h2>
              <form onSubmit={handlePostJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Job Title</label>
                  <input required name="title" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Description</label>
                  <textarea required name="description" rows={3} className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Job description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1">Location</label>
                    <input required name="location" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Remote" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1">Salary Range</label>
                    <input required name="salary" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. $120k - $160k" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
                  <Button type="button" variant="secondary" onClick={() => setIsPostingJob(false)}>Cancel</Button>
                  <Button type="submit" isLoading={jobPosting}>Publish Job</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
