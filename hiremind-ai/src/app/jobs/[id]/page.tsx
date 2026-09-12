'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { callWebhook } from '@/lib/apiClient';
import { WEBHOOKS } from '@/lib/webhooks';
import { jobsService } from '@/services/jobs.service';
import { Job } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronRight, ChevronLeft, MapPin, DollarSign, X, Check, FileText } from 'lucide-react';

interface ShortlistCandidate {
  id: string;
  name: string;
  matchPercentage: number;
  interviewScore: number;
  verificationBadges: string[];
  transcriptExcerpt: string;
  explanationText: string;
}

export default function JobShortlistPage() {
  const params = useParams();
  const jobId = (params?.id as string) || 'job-1';
  
  const [candidates, setCandidates] = useState<ShortlistCandidate[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCandidate, setSelectedCandidate] = useState<ShortlistCandidate | null>(null);
  const [makingDecision, setMakingDecision] = useState(false);

  useEffect(() => {
    loadShortlist();
  }, [jobId]);

  async function loadShortlist() {
    setLoading(true);
    try {
      const [shortlist, jobDetails] = await Promise.all([
        callWebhook<ShortlistCandidate[]>(WEBHOOKS.shortlist, { jobId }),
        jobsService.getJobById(jobId)
      ]);
      setCandidates(shortlist || []);
      setJob(jobDetails);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDecision(candidateId: string, decision: 'advance' | 'pass') {
    setMakingDecision(true);
    try {
      await callWebhook(WEBHOOKS.decision, { jobId, candidateId, decision });
      // Remove from view
      setCandidates(c => c.filter(cand => cand.id !== candidateId));
      setSelectedCandidate(null);
    } catch (err) {
      alert('Failed to save decision.');
    } finally {
      setMakingDecision(false);
    }
  }

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        
        {/* Header */}
        <div>
          <button onClick={() => window.history.back()} className="text-ink-soft hover:text-ink text-sm font-medium flex items-center mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-ink">{job ? job.title : 'AI Shortlist Review'}</h1>
              <p className="text-sm text-ink-soft mt-1">Review job details and top candidates pre-screened by AI.</p>
            </div>
            <div className="text-sm font-medium text-ink-soft bg-surface-sunken px-3 py-1.5 rounded-[var(--radius-sm)] border border-border">
              Job ID: <span className="font-semibold text-ink">{jobId}</span>
            </div>
          </div>
        </div>

        {/* Job Overview Section */}
        {job && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface border border-border rounded-[var(--radius-md)] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Job Description</h3>
              <p className="text-xs text-text-secondary leading-relaxed bg-page-bg p-4 rounded-[var(--radius-sm)] border border-border">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="text-xs font-semibold px-2.5 py-1 bg-surface-sunken rounded border border-border text-ink">Department: {job.department}</span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-surface-sunken rounded border border-border text-ink">Location: {job.location}</span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-surface-sunken rounded border border-border text-ink">Salary: {job.salaryRange}</span>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-md)] p-6 shadow-sm space-y-4 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2">Recruitment Pipeline Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-page-bg border border-border rounded-[var(--radius-sm)]">
                  <span className="text-xs font-semibold text-text-secondary">Candidates Applied</span>
                  <span className="text-sm font-extrabold text-ink">{job.candidateCount}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-page-bg border border-border rounded-[var(--radius-sm)]">
                  <span className="text-xs font-semibold text-text-secondary">Candidates Selected</span>
                  <span className="text-sm font-extrabold text-success">{Math.floor(job.candidateCount * 0.15) || 2}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-page-bg border border-border rounded-[var(--radius-sm)]">
                  <span className="text-xs font-semibold text-text-secondary">Candidates Rejected</span>
                  <span className="text-sm font-extrabold text-danger">{Math.floor(job.candidateCount * 0.6) || 8}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <Card className="bg-danger-tint border-danger text-danger flex items-center justify-between p-4">
            <span className="text-sm font-medium">{error}</span>
            <Button variant="secondary" onClick={loadShortlist} className="bg-surface">Retry</Button>
          </Card>
        )}

        <div className="flex gap-6 relative">
          
          {/* Main List */}
          <div className={`flex-1 space-y-4 transition-all duration-300 ${selectedCandidate ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
            {loading ? (
              <div className="py-20 text-center text-ink-faint">Loading candidates...</div>
            ) : candidates.length === 0 ? (
              <Card className="py-20 text-center">
                <p className="text-ink-soft">No candidates in the shortlist currently.</p>
              </Card>
            ) : (
              candidates.map((cand, idx) => (
                <Card 
                  key={cand.id} 
                  interactive 
                  onClick={() => setSelectedCandidate(cand)}
                  className={`flex items-center justify-between gap-4 p-5 ${selectedCandidate?.id === cand.id ? 'border-primary shadow-sm bg-primary-tint/30' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-tint text-primary font-bold flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{cand.name}</h3>
                      <div className="flex gap-3 text-xs font-medium text-ink-soft mt-1">
                        <span>Match: <span className="text-success font-bold">{cand.matchPercentage}%</span></span>
                        <span>Interview: <span className="text-primary font-bold">{cand.interviewScore}/100</span></span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-ink-faint w-5 h-5" />
                </Card>
              ))
            )}
          </div>

          {/* Dossier Drawer */}
          {selectedCandidate && (
            <div className="flex-1 lg:w-1/2 bg-surface border border-border rounded-[12px] shadow-lg sticky top-6 h-fit max-h-[85vh] overflow-y-auto animate-in slide-in-from-right-4 fade-in duration-200">
              
              <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-semibold text-ink">Candidate Dossier</h2>
                <button onClick={() => setSelectedCandidate(null)} className="p-1 text-ink-faint hover:text-ink rounded-full hover:bg-surface-sunken">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                
                {/* Header Stats */}
                <div>
                  <h1 className="text-2xl font-bold text-ink mb-4">{selectedCandidate.name}</h1>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-success-tint p-4 rounded-[var(--radius-md)] border border-success/20">
                      <div className="text-xs font-semibold text-success uppercase tracking-wide">Overall Match</div>
                      <div className="text-3xl font-bold text-success mt-1">{selectedCandidate.matchPercentage}%</div>
                    </div>
                    <div className="bg-primary-tint p-4 rounded-[var(--radius-md)] border border-primary/20">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wide">AI Interview</div>
                      <div className="text-3xl font-bold text-primary mt-1">{selectedCandidate.interviewScore}/100</div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-3">Verification Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.verificationBadges.map(badge => (
                      <span key={badge} className="px-2.5 py-1 bg-surface-sunken border border-border rounded-md text-xs font-medium text-ink-soft flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-success" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Explanation */}
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-2">AI Evaluation</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {selectedCandidate.explanationText}
                  </p>
                </div>

                {/* Transcript Snippet */}
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-ink-faint" />
                    Key Interview Excerpt
                  </h3>
                  <div className="bg-surface-sunken border border-border p-4 rounded-[var(--radius-sm)] italic text-sm text-ink-soft border-l-4 border-l-primary">
                    "{selectedCandidate.transcriptExcerpt}"
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div className="sticky bottom-0 bg-surface border-t border-border p-4 flex gap-4">
                <Button 
                  variant="secondary" 
                  className="flex-1" 
                  isLoading={makingDecision}
                  onClick={() => handleDecision(selectedCandidate.id, 'pass')}
                >
                  Pass
                </Button>
                <Button 
                  className="flex-1 bg-success hover:bg-green-700" 
                  isLoading={makingDecision}
                  onClick={() => handleDecision(selectedCandidate.id, 'advance')}
                >
                  Advance
                </Button>
              </div>

            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}
