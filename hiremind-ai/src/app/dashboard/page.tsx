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
import { TiltCard } from '@/components/animations/TiltCard';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { GlitterBackground } from '@/components/animations/GlitterBackground';
import { motion } from 'framer-motion';

interface HRStats {
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
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
      <GlitterBackground />
      <div className="space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-ink">Recruitment Command Center</h1>
            <p className="text-sm text-ink-soft">
              Manage jobs, pipeline, and AI shortlists.
            </p>
          </div>
          <MagneticButton>
            <Button onClick={() => setIsPostingJob(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </MagneticButton>
        </div>

        {error && (
          <Card className="bg-danger-tint border-danger text-danger flex items-center justify-between p-4">
            <span className="text-sm font-medium">{error}</span>
            <Button variant="secondary" onClick={loadDashboard} className="bg-white">Retry</Button>
          </Card>
        )}

        {loading && !stats ? (
          <div className="py-20 text-center text-ink-faint">
            <div className="animate-spin inline-block w-8 h-8 border border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-sm">Loading dashboard...</p>
          </div>
        ) : stats ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
              <StatCard label="Active Jobs" value={jobs.length} delta={2} withTilt />
              <StatCard label="Total Applications" value={stats.totalApplications || 85} delta={18} withTilt />
              <StatCard label="Pending Applications" value={stats.pendingApplications || 43} delta={5} withTilt />
              <StatCard label="Offers Extended" value={stats.offers || 8} delta={2} withTilt />
              <StatCard label="Hired" value={stats.hired || 12} withTilt />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Jobs Grid */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ink">Active Openings</h2>
                </div>
                
                <div className="grid gap-4 relative z-10">
                  {jobs.map(job => (
                    <div key={job.id} className="relative group overflow-hidden rounded-[var(--radius-lg)] shadow-lg">
                      {/* Swipe Actions Background */}
                      <div className="absolute inset-y-0 right-0 w-64 bg-surface-sunken flex items-center justify-end px-6 gap-2 z-0 border border-l-0 border-border rounded-r-[var(--radius-lg)]">
                        <Button variant="secondary" className="px-3 py-1.5 h-auto text-xs font-semibold hover:bg-page-bg text-ink-soft hover:text-ink">Pause</Button>
                        <Button variant="secondary" className="px-3 py-1.5 h-auto text-xs font-semibold hover:bg-page-bg text-ink-soft hover:text-ink">Dup</Button>
                        <Button className="px-3 py-1.5 h-auto text-xs font-semibold bg-danger-tint text-danger border-danger hover:bg-danger hover:text-white transition-colors">Archive</Button>
                      </div>

                      {/* Foreground Swipeable Card */}
                      <motion.div
                        drag="x"
                        dragConstraints={{ left: -220, right: 0 }}
                        dragElastic={0.1}
                        className="relative z-10 bg-white border border-border hover:border-border-hover rounded-[var(--radius-lg)] flex flex-col justify-between h-full cursor-grab active:cursor-grabbing"
                      >
                        {/* Upper content is 3D tilted */}
                        <TiltCard maxTilt={4} className="flex-1 w-full rounded-t-[var(--radius-lg)] overflow-hidden">
                          <div className="p-4 sm:p-6 pb-2 w-full h-full bg-white flex flex-col gap-4">
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
                          </div>
                        </TiltCard>

                        {/* Action row remains completely flat and sharp */}
                        <div className="flex items-center justify-between p-4 sm:px-6 pt-4 border-t border-border bg-white rounded-b-[var(--radius-lg)]">
                          <div className="flex gap-2 relative z-10 overflow-hidden">
                            {job.skills.slice(0,3).map((skill, i) => (
                              <motion.span 
                                key={skill}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                className="px-2 py-1 bg-surface-sunken rounded text-[11px] font-medium text-ink-soft"
                              >
                                {skill}
                              </motion.span>
                            ))}
                            {job.skills.length > 3 && (
                              <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 3 * 0.1, duration: 0.3 }}
                                className="px-2 py-1 bg-surface-sunken rounded text-[11px] font-medium text-ink-faint"
                              >
                                +{job.skills.length - 3}
                              </motion.span>
                            )}
                          </div>
                          <Link href={`/jobs/${job.id}`} onPointerDown={(e) => e.stopPropagation()}>
                            <Button variant="secondary" className="text-xs px-3 py-1.5 h-auto">
                              Manage Job
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                 {/* Sidebar Content Area (Available for future widgets) */}
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
                  <input required name="title" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-1">Description</label>
                  <textarea required name="description" rows={3} className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Job description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1">Location</label>
                    <input required name="location" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Remote" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1">Salary Range</label>
                    <input required name="salary" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. ₹12L - ₹16L" />
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
