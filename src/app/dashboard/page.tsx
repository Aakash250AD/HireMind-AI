'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { jobsService } from '@/services/jobs.service';
import { candidatesService } from '@/services/candidates.service';
import { analyticsService, HRStats } from '@/services/analytics.service';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { StatusPill } from '@/components/ui/StatusPill';
import { Plus, Users, X, Award } from 'lucide-react';
import { TiltCard } from '@/components/animations/TiltCard';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { GlitterBackground } from '@/components/animations/GlitterBackground';
import { motion } from 'framer-motion';

import { Job, Candidate } from '@/types';

export default function HRDashboard() {
  const [stats, setStats] = useState<HRStats | null>(null);
  const [statsNotConfigured, setStatsNotConfigured] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [topCandidates, setTopCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPostingJob, setIsPostingJob] = useState(false);
  const [jobPosting, setJobPosting] = useState(false);
  const [postJobError, setPostJobError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError(null);
    setStatsNotConfigured(false);
    try {
      const [jobsData, candidatesData] = await Promise.all([
        jobsService.getJobs(),
        candidatesService.getCandidates()
      ]);

      setJobs(jobsData || []);
      setTopCandidates(
        [...(candidatesData || [])].sort((a, b) => b.overallScore - a.overallScore).slice(0, 10)
      );

      try {
        const statsData = await analyticsService.getHRStats();
        setStats(statsData);
      } catch (statsErr) {
        setStatsNotConfigured(true);
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }

  async function handlePostJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setJobPosting(true);
    setPostJobError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const department = formData.get('department') as string;
      const description = formData.get('description') as string;
      const skillsRaw = formData.get('skills') as string;

      await jobsService.createJob({
        title,
        department,
        description,
        location: '',
        employmentType: 'full-time',
        experienceLevel: '',
        education: '',
        salaryRange: '',
        requiredSkills: skillsRaw.split(',').map((s) => s.trim()).filter(Boolean),
        preferredSkills: [],
        responsibilities: [],
        status: 'open'
      });

      e.currentTarget.reset();
      setIsPostingJob(false);
      loadDashboard();
    } catch (err) {
      setPostJobError((err as Error).message || 'Failed to post job');
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
            <Button variant="secondary" onClick={loadDashboard} className="bg-surface">Retry</Button>
          </Card>
        )}

        {loading && !stats ? (
          <div className="py-20 text-center text-ink-faint">
            <div className="animate-spin inline-block w-8 h-8 border border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-sm">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
              <StatCard label="Active Jobs" value={jobs.filter((j) => j.status === 'open').length} withTilt />
              {statsNotConfigured || !stats ? (
                <div className="col-span-2 md:col-span-4 flex items-center px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-xs text-ink-faint">
                  Application/offer/hire stats aren&apos;t connected yet — pending the analytics webhook.
                </div>
              ) : (
                <>
                  <StatCard label="Total Applications" value={stats.totalApplications ?? 0} withTilt />
                  <StatCard label="Pending Applications" value={stats.pendingApplications ?? 0} withTilt />
                  <StatCard label="Offers Extended" value={stats.offers ?? 0} withTilt />
                  <StatCard label="Hired" value={stats.hired ?? 0} withTilt />
                </>
              )}
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
                        className="relative z-10 bg-surface border border-border hover:border-border-hover rounded-[var(--radius-lg)] flex flex-col justify-between h-full cursor-grab active:cursor-grabbing"
                      >
                        {/* Upper content is 3D tilted */}
                        <TiltCard maxTilt={4} className="flex-1 w-full rounded-t-[var(--radius-lg)] overflow-hidden">
                          <div className="p-4 sm:p-6 pb-2 w-full h-full bg-surface flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="text-base font-semibold text-ink">{job.title}</h3>
                                  <StatusPill status={job.status} variant={job.status === 'open' ? 'success' : 'default'} />
                                  <StatusPill status={job.department} />
                                </div>
                                <p className="text-sm text-ink-soft line-clamp-2 mb-2">{job.description}</p>
                                <div className="flex items-center gap-4 text-xs text-ink-faint font-medium">
                                  <span>{job.location}</span>
                                  <span>{job.salaryRange}</span>
                                  <span className="flex items-center gap-1 text-primary">
                                    <Users className="w-3.5 h-3.5" />
                                    {job.candidateCount} applicants
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TiltCard>

                        {/* Action row remains completely flat and sharp */}
                        <div className="flex items-center justify-between p-4 sm:px-6 pt-4 border-t border-border bg-surface rounded-b-[var(--radius-lg)]">
                          <div className="flex gap-2 relative z-10 overflow-hidden">
                            {(job.requiredSkills || []).slice(0,3).map((skill, i) => (
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
                            {(job.requiredSkills || []).length > 3 && (
                              <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 3 * 0.1, duration: 0.3 }}
                                className="px-2 py-1 bg-surface-sunken rounded text-[11px] font-medium text-ink-faint"
                              >
                                +{(job.requiredSkills || []).length - 3}
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
                 <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-5 shadow-lg relative z-10">
                   <div className="flex items-center gap-2 mb-4">
                     <Award className="w-5 h-5 text-primary" />
                     <h2 className="text-lg font-semibold text-ink">Candidate Review Board</h2>
                   </div>
                   <div className="space-y-3">
                     {topCandidates.length === 0 ? (
                       <p className="text-sm text-ink-faint">No candidates found.</p>
                     ) : (
                       topCandidates.map(cand => (
                         <div key={cand.id} className="p-3 bg-surface-sunken border border-border rounded-md hover:border-primary/30 transition-colors">
                           <div className="flex justify-between items-start mb-2">
                             <div>
                               <p className="text-sm font-bold text-ink">{cand.name || 'Anonymous'}</p>
                               <p className="text-[11px] text-ink-soft">{cand.email}</p>
                             </div>
                             <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] font-extrabold">
                               {cand.overallScore}%
                             </span>
                           </div>
                           <Link
                             href={`/candidates/${cand.id}`}
                             className="mt-3 flex items-center justify-center gap-1.5 w-full h-8 text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white border border-primary/20 rounded-[var(--radius-sm)] transition-all"
                           >
                             Review & Decide
                           </Link>
                         </div>
                       ))
                     )}
                   </div>
                 </div>
              </div>
            </div>
          </>
        )}

        {/* Post Job Modal (Simple implementation) */}
        {isPostingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
            <Card className="w-full max-w-lg shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
              <button onClick={() => setIsPostingJob(false)} className="absolute top-4 right-4 text-ink-faint hover:text-ink">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-ink mb-6">Post New Job</h2>
              {postJobError && (
                <div className="mb-4 p-3 bg-danger-tint border border-danger text-danger text-xs font-semibold rounded-[var(--radius-sm)]">
                  {postJobError}
                </div>
              )}
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
                    <label className="block text-sm font-medium text-ink mb-1">Department</label>
                    <input required name="department" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Engineering" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1">Required Skills (comma separated)</label>
                    <input required name="skills" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. React, Node.js" />
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
