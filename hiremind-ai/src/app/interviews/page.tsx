'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { Button } from '@/components/ui/Button';
import { interviewsService } from '@/services/interviews.service';
import { InterviewSession } from '@/types';
import { Video, Search, ChevronRight, UserCircle, PlayCircle, Filter } from 'lucide-react';

export default function HRInterviewsHubPage() {
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  async function loadInterviews() {
    setLoading(true);
    try {
      const data = await interviewsService.getInterviews();
      setInterviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout role="hr">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-ink">Interview Monitoring</h1>
            <p className="text-sm text-ink-soft mt-1">Monitor live and completed AI interviews across all your active jobs.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 border border-border rounded-full shadow-sm">
             <div className="relative">
                <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search candidate..." 
                  className="pl-9 pr-4 py-1.5 bg-surface-sunken rounded-full text-sm text-ink outline-none focus:ring-1 ring-primary w-48"
                />
             </div>
             <Button variant="secondary" className="rounded-full text-xs py-1 px-3">
               <Filter className="w-4 h-4 mr-1.5" /> Filter
             </Button>
          </div>
        </div>

        {loading ? (
           <div className="py-20 flex justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
           </div>
        ) : (
          <div className="grid gap-4">
            {interviews.map(session => (
              <Card key={session.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-surface-sunken flex items-center justify-center border border-border shrink-0">
                      <UserCircle className="w-6 h-6 text-ink-faint" />
                    </div>
                    {session.status === 'IN_PROGRESS' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-white rounded-full animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{session.candidateName}</h3>
                    <div className="flex items-center gap-3 text-sm text-ink-soft mt-1">
                      <span className="font-medium text-ink">{session.jobTitle}</span>
                      <span className="w-1 h-1 bg-border rounded-full" />
                      <span>{session.mode === 'voice' ? 'Voice AI' : 'Text AI'}</span>
                      <span className="w-1 h-1 bg-border rounded-full" />
                      <span>{session.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <StatusPill status={session.status} variant="primary" />
                    <p className="text-xs text-ink-faint mt-1.5">Scheduled: {session.scheduledAt}</p>
                  </div>
                  <Link href={`/interviews/${session.id}`}>
                    <Button variant={session.status === 'IN_PROGRESS' ? 'primary' : 'secondary'} className="flex items-center gap-2">
                      {session.status === 'IN_PROGRESS' ? (
                        <><PlayCircle className="w-4 h-4" /> Monitor Live</>
                      ) : (
                        <><Video className="w-4 h-4" /> View Results</>
                      )}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
            
            {interviews.length === 0 && (
              <div className="py-20 text-center text-ink-faint border border-dashed border-border rounded-xl">
                No active or completed interviews found.
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
