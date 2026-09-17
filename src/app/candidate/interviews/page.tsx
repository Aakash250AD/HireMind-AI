'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { candidatesService } from '@/services/candidates.service';
import { InterviewSessionView } from '@/types';
import { Video, CheckCircle, Play, FileText, Bot } from 'lucide-react';

export default function CandidateInterviewsHub() {
  const [interviews, setInterviews] = useState<InterviewSessionView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInterviews();
  }, []);

  async function loadInterviews() {
    setLoading(true);
    setError(null);
    try {
      const data = await candidatesService.getMyInterviewSessions();
      setInterviews(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load your interviews');
    } finally {
      setLoading(false);
    }
  }

  const activeInterviews = interviews.filter(i => i.status !== 'completed');
  const pastInterviews = interviews.filter(i => i.status === 'completed');

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-semibold text-ink">AI Interviews</h1>
            <p className="text-sm text-ink-soft mt-1">Manage your pending and completed AI interview sessions.</p>
          </div>
        </div>

        {error && (
          <Card className="bg-danger-tint border-danger text-danger flex items-center justify-between p-4">
            <span className="text-sm font-medium">{error}</span>
            <Button variant="secondary" onClick={loadInterviews} className="bg-surface">Retry</Button>
          </Card>
        )}

        {loading ? (
          <div className="py-20 text-center text-ink-faint">Loading your interviews...</div>
        ) : (
          <div className="space-y-10">
            
            {/* Active Interviews Section */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" /> Active & Pending
              </h2>
              
              {activeInterviews.length === 0 ? (
                <Card className="py-12 text-center text-ink-faint bg-surface-sunken">
                  No pending interviews at the moment.
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {activeInterviews.map(interview => (
                    <Card key={interview.id} className="flex flex-col justify-between border border-primary/20 bg-surface shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                      <div className="space-y-4 p-2">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                              In Progress
                            </span>
                            <span className="flex items-center gap-1 text-xs text-ink-faint">
                              <Bot className="w-3.5 h-3.5" /> AI Chat
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-ink leading-tight mt-2">{interview.jobTitle}</h3>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft bg-surface-sunken p-3 rounded-[var(--radius-sm)] border border-border/50">
                          <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-ink-faint" /> {interview.questionCount} / {interview.maxQuestions} questions</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border/50 mt-4">
                        <Link href={`/candidate/interview/${interview.applicationId}`} className="block">
                          <Button className="w-full flex justify-center items-center gap-2">
                            <Play className="w-4 h-4 fill-white" />
                            Resume Interview
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Past Interviews Section */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" /> Completed
              </h2>
              
              {pastInterviews.length === 0 ? (
                <Card className="py-12 text-center text-ink-faint">
                  You have not completed any AI interviews yet.
                </Card>
              ) : (
                <div className="grid gap-4">
                  {pastInterviews.map(interview => (
                    <Card key={interview.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-80 hover:opacity-100 transition-opacity">
                      <div>
                        <h3 className="text-base font-semibold text-ink">{interview.jobTitle}</h3>
                        <div className="flex items-center gap-3 text-xs text-ink-faint mt-1">
                          <span>AI Chat Interview</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs font-bold text-success uppercase">Completed</div>
                          <div className="text-xs text-ink-soft">Under review</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
