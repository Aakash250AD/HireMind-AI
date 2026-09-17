'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { HumanInTheLoopPanel } from '@/components/HumanInTheLoopPanel';
import { candidatesService } from '@/services/candidates.service';
import { Candidate } from '@/types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Video, MessageSquareText, CheckCircle } from 'lucide-react';

export default function CandidateProfilePage() {
  const params = useParams();
  const candidateId = params?.id as string;
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [candidateId]);

  async function fetchProfile() {
    setLoading(true);
    setError(null);
    try {
      const data = await candidatesService.getCandidateById(candidateId);
      setCandidate(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load candidate profile');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout role="hr">
        <div className="flex items-center justify-center py-20 text-xs text-text-secondary">
          Loading Candidate Profile...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="hr">
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <p className="text-sm text-danger">{error}</p>
          <button onClick={fetchProfile} className="text-xs font-bold text-primary underline">Retry</button>
        </div>
      </DashboardLayout>
    );
  }

  if (!candidate) {
    return (
      <DashboardLayout role="hr">
        <div className="flex flex-col items-center justify-center py-20 gap-2 text-center">
          <p className="text-sm text-text-secondary">Candidate not found.</p>
          <Link href="/candidates" className="text-xs font-bold text-primary underline">Back to Candidates</Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="hr">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink">Candidate Profile: {candidate.name}</h1>
        </div>
        <main className="space-y-6 flex-1 w-full mt-6">
          {/* Top Profile Header */}
          <div className="bg-surface border border-border p-6 rounded-[var(--radius-md)] shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-primary flex items-center justify-center font-extrabold text-text-primary text-xl border border-border shadow-lg shrink-0">
                  {candidate.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-extrabold text-text-primary">{candidate.name}</h2>
                    <span className="px-2.5 py-0.5 rounded bg-page-bg text-text-secondary text-xs font-bold border border-border">
                      {candidate.stage}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary font-medium mt-1">{candidate.currentRole}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary mt-2">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {candidate.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {candidate.phone}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {candidate.location}</span>
                  </div>
                </div>
              </div>

              {/* Score Breakdown Pills */}
              <div className="grid grid-cols-3 gap-2 bg-page-bg p-3 rounded-[var(--radius-md)] border border-border">
                <div className="text-center p-2">
                  <span className="text-[10px] uppercase font-bold text-text-secondary">Match</span>
                  <div className="text-base font-extrabold text-emerald-400">{candidate.matchScore}%</div>
                </div>
                <div className="text-center p-2 border-x border-border">
                  <span className="text-[10px] uppercase font-bold text-text-secondary">Interview</span>
                  <div className="text-base font-extrabold text-text-primary">{candidate.interviewScore}%</div>
                </div>
                <div className="text-center p-2">
                  <span className="text-[10px] uppercase font-bold text-text-secondary">Verification</span>
                  <div className="text-base font-extrabold text-primary">{candidate.verificationScore}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Feature: Human-in-the-loop Recruiter Panel */}
          <HumanInTheLoopPanel
            candidate={candidate}
            onDecisionSubmitted={async (status, notes) => {
              const updated = await candidatesService.submitRecruiterDecision(candidate.id, status, notes);
              setCandidate(updated);
            }}
          />



          {/* Summary & Resume Detail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface border border-border rounded-[var(--radius-md)] p-6 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Candidate Executive Summary</h3>
              <p className="text-xs text-text-secondary leading-relaxed bg-page-bg p-4 rounded-[var(--radius-sm)] border border-border">
                {candidate.summary || 'No AI summary available yet.'}
              </p>
              <p className="text-[10px] text-text-muted">
                Match ({candidate.matchScore}%) is derived from resume-to-job comparison. Interview ({candidate.interviewScore}%) reflects live AI interview performance, scored separately.
              </p>

              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider pt-2">Skills Inventory</h3>
              <div className="flex flex-wrap gap-1.5">
                {(candidate.skills || []).length > 0 ? (
                  (candidate.skills || []).map((sk) => (
                    <span key={sk} className="px-3 py-1 bg-page-bg border border-border text-text-primary text-xs font-semibold rounded-[var(--radius-sm)]">
                      {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-text-secondary italic">No skills listed</span>
                )}
              </div>
            </div>

            <div className="bg-surface border border-border rounded-[var(--radius-md)] p-6 shadow-lg space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2">Education & Resume</h3>
                <div className="text-xs text-text-secondary space-y-2">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-text-secondary shrink-0 mt-0.5" />
                    <span>{candidate.education}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-text-secondary shrink-0 mt-0.5" />
                    <span>{candidate.experienceYears} Years Professional Experience</span>
                  </div>
                </div>
              </div>

              {candidate.interview ? (
                <Link
                  href={`/interviews/${candidate.id}`}
                  className="w-full py-2.5 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] border border-border transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>{candidate.interview.status === 'in_progress' ? 'Monitor Live Interview' : 'View Interview Results'}</span>
                </Link>
              ) : (
                <div className="w-full py-2.5 bg-page-bg text-text-secondary text-xs font-semibold rounded-[var(--radius-sm)] border border-border text-center">
                  No interview started yet
                </div>
              )}
            </div>
          </div>

          {/* Interview Transcript & Evaluation */}
          {candidate.interview && (
            <div className="bg-surface border border-border rounded-[var(--radius-md)] p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                  <MessageSquareText className="w-4 h-4 text-primary" />
                  AI Interview Transcript & Evaluation
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-page-bg border border-border text-text-secondary">
                  {candidate.interview.status === 'in_progress' ? 'In Progress' : 'Completed'}
                </span>
              </div>

              {candidate.interview.transcript.length === 0 ? (
                <p className="text-xs text-text-secondary italic">No transcript recorded yet.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {candidate.interview.transcript.map((turn, i) => (
                    <div key={i} className="text-xs bg-page-bg border border-border rounded-[var(--radius-sm)] p-3">
                      <div className="font-bold uppercase text-[10px] text-text-secondary mb-1">
                        {turn.role === 'candidate' ? 'Candidate' : 'AI Interviewer'}
                        {turn.score != null && <span className="ml-2 text-primary">Score: {turn.score}</span>}
                      </div>
                      <p className="text-text-primary">{turn.text}</p>
                      {turn.feedback && <p className="text-text-muted mt-1 italic">{turn.feedback}</p>}
                    </div>
                  ))}
                </div>
              )}

              {candidate.interview.evaluationSummary && (
                <div className="pt-3 border-t border-border flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-text-secondary block mb-1">AI Evaluation Summary</span>
                    <p className="text-xs text-text-primary leading-relaxed">{candidate.interview.evaluationSummary}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
