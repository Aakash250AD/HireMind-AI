'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { candidatesService } from '@/services/candidates.service';
import { InterviewSessionView } from '@/types';
import { ArrowLeft, User, CheckCircle, BrainCircuit, Activity, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function HRInterviewMonitorPage() {
  const params = useParams();
  const applicationId = params.id as string;
  const [session, setSession] = useState<InterviewSessionView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (applicationId) loadSession();
  }, [applicationId]);

  async function loadSession() {
    setLoading(true);
    setError(null);
    try {
      const data = await candidatesService.getInterviewSessionById(applicationId);
      setSession(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load interview session');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout role="hr">
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="hr">
        <div className="py-20 text-center space-y-4">
          <h2 className="text-xl font-bold text-ink">Couldn&apos;t load this interview</h2>
          <p className="text-sm text-ink-soft">{error}</p>
          <Button onClick={loadSession}>Retry</Button>
        </div>
      </DashboardLayout>
    );
  }

  if (!session) {
    return (
      <DashboardLayout role="hr">
        <div className="py-20 text-center">
          <h2 className="text-xl font-bold text-ink">Interview Session Not Found</h2>
          <Link href="/interviews">
             <Button className="mt-4">Return to Interviews</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const isCompleted = session.status === 'completed';

  return (
    <DashboardLayout role="hr">
      <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-140px)] gap-6">

        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/interviews" className="text-ink-soft hover:text-ink transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-ink flex items-center gap-3">
                Interview Monitor
                {!isCompleted && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    <Activity className="w-3 h-3" /> Live
                  </span>
                )}
              </h1>
              <p className="text-xs text-ink-faint">Job: {session.jobTitle}</p>
            </div>
          </div>
          {isCompleted && (
            <Link href={`/candidates/${session.applicationId}`}>
              <Button variant="primary" className="bg-success hover:bg-success/90">Review Candidate</Button>
            </Link>
          )}
        </div>

        {/* 3-Pane Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

          {/* LEFT PANE: Candidate Info */}
          <div className="lg:col-span-3 flex flex-col gap-4 min-h-0 overflow-y-auto">
             <Card className="p-5 flex flex-col items-center text-center">
               <div className="w-20 h-20 rounded-full bg-surface-sunken flex items-center justify-center mb-3 border border-border">
                  <User className="w-10 h-10 text-ink-faint" />
               </div>
               <h2 className="text-lg font-bold text-ink">{session.candidateName}</h2>
               <p className="text-sm text-ink-soft">{session.jobTitle}</p>
             </Card>

             <Card className="p-5 flex-1">
               <h3 className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-4">Interview Details</h3>
               <div className="space-y-4">
                 <div>
                   <div className="text-xs text-ink-soft">Progress</div>
                   <div className="text-sm font-semibold text-ink">{session.questionCount} / {session.maxQuestions} questions</div>
                 </div>
                 <div>
                   <div className="text-xs text-ink-soft">Mode</div>
                   <div className="text-sm font-semibold text-ink">Text AI Interview</div>
                 </div>
                 <div>
                   <div className="text-xs text-ink-soft">Started</div>
                   <div className="text-sm font-semibold text-ink">{new Date(session.createdAt).toLocaleString()}</div>
                 </div>
               </div>
             </Card>
          </div>

          {/* CENTER PANE: Transcript */}
          <div className="lg:col-span-6 flex flex-col min-h-0 border border-border bg-surface rounded-[var(--radius-lg)] shadow-sm overflow-hidden">
             <div className="bg-surface-sunken border-b border-border p-4 shrink-0 flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-primary" /> Interview Transcript
                </h3>
                <div className="text-xs font-semibold text-ink-soft">
                   Progress: {session.questionCount} / {session.maxQuestions}
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface">
                {session.transcript.length === 0 ? (
                  <div className="py-16 text-center text-ink-faint text-sm">
                    No transcript yet — the interview hasn&apos;t started.
                  </div>
                ) : (
                  session.transcript.map((turn, i) => (
                    <div key={i} className={`flex gap-3 ${turn.role === 'candidate' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${turn.role === 'candidate' ? 'bg-hm-matte' : 'bg-primary'}`}>
                        {turn.role === 'candidate' ? <User className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
                      </div>
                      <div className={`p-3.5 rounded-[var(--radius-md)] border text-sm max-w-[85%] ${turn.role === 'candidate' ? 'bg-primary/5 border-primary/20 rounded-tr-none text-ink' : 'bg-surface-sunken border-border rounded-tl-none text-ink'}`}>
                        <div className={`text-[10px] font-bold mb-1 uppercase ${turn.role === 'candidate' ? 'text-hm-matte' : 'text-primary'}`}>
                          {turn.role === 'candidate' ? 'Candidate' : 'HireMind AI'}
                        </div>
                        <p>{turn.text}</p>
                        {turn.score != null && (
                          <div className="text-[10px] text-ink-faint mt-2">Score: {turn.score}</div>
                        )}
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>

          {/* RIGHT PANE: AI Evaluation */}
          <div className="lg:col-span-3 flex flex-col gap-4 min-h-0 overflow-y-auto">
             <Card className="p-5 bg-hm-deep text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
                <h3 className="text-xs font-bold text-primary-tint uppercase tracking-wider mb-4 relative z-10">AI Final Evaluation</h3>

                {isCompleted && session.evaluationScore != null ? (
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-end gap-2">
                      <div className="text-5xl font-black">{session.evaluationScore}</div>
                      <div className="text-sm font-medium text-white/60 mb-1">/ 100</div>
                    </div>

                    {session.evaluationSummary && (
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-xs font-bold text-success flex items-center gap-1.5 mb-2">
                          <CheckCircle className="w-4 h-4" /> Summary
                        </div>
                        <p className="text-sm font-medium">{session.evaluationSummary}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center py-10 text-center opacity-70">
                    <BarChart className="w-10 h-10 mb-3" />
                    <p className="text-sm">AI Evaluation will be generated once the interview is complete.</p>
                  </div>
                )}
             </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
