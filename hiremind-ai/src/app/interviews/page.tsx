'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { interviewsService } from '@/services/interviews.service';
import { InterviewSession } from '@/types';
import { Video, Calendar, Clock, ChevronRight, Mic } from 'lucide-react';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);

  useEffect(() => {
    async function loadInterviews() {
      const data = await interviewsService.getInterviews();
      setInterviews(data);
    }
    loadInterviews();
  }, []);

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        <div className="bg-white border border-border-color p-6 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-text-primary">AI Autonomous Interviews</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Interactive voice and chat evaluation sessions conducted by HireMind AI.
            </p>
          </div>
          <Link
            href="/interview/int-session-101"
            className="px-5 py-3 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] border border-dark-blue shadow flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Launch Live Interview Portal</span>
          </Link>
        </div>

        <div className="space-y-4">
          {interviews.map((session) => (
            <div
              key={session.id}
              className="bg-white border border-border-color p-5 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#722F37] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-[var(--radius-md)] bg-primary/20 border border-[#722F37] text-primary">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-text-primary">{session.candidateName}</h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                      {session.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{session.jobTitle}</p>
                  <div className="flex items-center gap-4 text-xs text-text-muted mt-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {session.scheduledAt}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {session.durationMinutes} mins</span>
                    <span className="uppercase text-[10px] font-bold text-text-secondary">Mode: {session.mode}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-border-color">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-text-secondary">Interview Score</span>
                  <div className="text-base font-extrabold text-text-primary">{session.overallScore || 'N/A'}%</div>
                </div>
                <Link
                  href={`/interviews/${session.id}`}
                  className="px-3.5 py-2 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] border border-dark-blue transition-colors flex items-center gap-1"
                >
                  <span>View Transcript</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
