'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { RecruiterWorkflowBanner } from '@/components/RecruiterWorkflowBanner';
import { interviewsService } from '@/services/interviews.service';
import { InterviewSession } from '@/types';
import { CheckCircle2, ShieldCheck, ArrowLeft, MessageSquare } from 'lucide-react';

export default function InterviewDetailPage() {
  const params = useParams();
  const sessionId = (params?.id as string) || 'int-session-101';
  const [session, setSession] = useState<InterviewSession | null>(null);

  useEffect(() => {
    async function loadDetail() {
      const data = await interviewsService.getInterviewById(sessionId);
      setSession(data);
    }
    loadDetail();
  }, [sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center text-xs text-text-secondary">
        Loading Interview Evaluation Transcript...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={`Interview Result: ${session.candidateName}`} />
        <RecruiterWorkflowBanner />

        <main className="p-6 space-y-6 flex-1 max-w-5xl mx-auto w-full">
          <Link href="/interviews" className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Interviews
          </Link>

          {/* Evaluation Score Card */}
          <div className="bg-white border border-border-color p-6 rounded-[var(--radius-md)] shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-text-primary">{session.candidateName} — Interview Results</h2>
                <p className="text-xs text-text-secondary">{session.jobTitle} • Session ID: {session.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-text-secondary block">Overall Score</span>
                <span className="text-2xl font-extrabold text-emerald-400">{session.overallScore}%</span>
              </div>
            </div>

            {/* Score Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-page-bg p-4 rounded-[var(--radius-md)] border border-border-color">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-text-secondary block">Technical Knowledge</span>
                <span className="text-lg font-extrabold text-text-primary">{session.technicalScore}%</span>
              </div>
              <div className="text-center border-l border-border-color">
                <span className="text-[10px] uppercase font-bold text-text-secondary block">Communication</span>
                <span className="text-lg font-extrabold text-text-primary">{session.communicationScore}%</span>
              </div>
              <div className="text-center border-l border-border-color">
                <span className="text-[10px] uppercase font-bold text-text-secondary block">Problem Solving</span>
                <span className="text-lg font-extrabold text-text-primary">{session.problemSolvingScore}%</span>
              </div>
              <div className="text-center border-l border-border-color">
                <span className="text-[10px] uppercase font-bold text-text-secondary block">Role Fit</span>
                <span className="text-lg font-extrabold text-text-primary">{session.roleFitScore}%</span>
              </div>
            </div>

            {/* AI Summary Recommendation Box */}
            <div className="bg-primary/20 border border-[#722F37] p-4 rounded-[var(--radius-md)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>AI Recommendation</span>
              </div>
              <p className="text-sm font-bold text-text-primary">
                {session.aiSummary?.recommendation || 'Recommended for recruiter review'}
              </p>
              <p className="text-xs text-text-secondary">
                Candidate demonstrated strong technical depth with quantitative scenarios. Final decision belongs to human recruiter.
              </p>
            </div>
          </div>

          {/* Transcript Q&A Section */}
          <div className="bg-white border border-border-color p-6 rounded-[var(--radius-md)] shadow-lg space-y-4">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Interview Transcript & Evaluation Logs</span>
            </h3>

            <div className="space-y-4">
              {session.questions.map((q, idx) => (
                <div key={q.id} className="bg-page-bg border border-border-color p-4 rounded-[var(--radius-md)] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-primary uppercase">Question {idx + 1} ({q.targetSkill})</span>
                    <span className="font-extrabold text-emerald-400">Score: {q.score}%</span>
                  </div>
                  <p className="text-xs font-bold text-text-primary">{q.question}</p>
                  <div className="bg-white p-3 rounded-[var(--radius-sm)] border border-border-color text-xs text-text-secondary">
                    <span className="text-[10px] text-text-secondary uppercase font-bold block mb-1">Candidate Answer:</span>
                    {q.candidateAnswer}
                  </div>
                  <p className="text-[11px] text-text-secondary italic">
                    AI Feedback: {q.aiFeedback}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
