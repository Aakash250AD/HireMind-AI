'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { interviewsService } from '@/services/interviews.service';
import { InterviewSession } from '@/types';
import { ArrowLeft, User, Phone, CheckCircle, BrainCircuit, Activity, BarChart, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function HRInterviewMonitorPage() {
  const params = useParams();
  const sessionId = params.id as string;
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) loadSession();
  }, [sessionId]);

  async function loadSession() {
    try {
      const data = await interviewsService.getInterviewById(sessionId);
      setSession(data);
    } catch (err) {
      console.error(err);
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

  const isCompleted = session.status === 'COMPLETED';

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
                {session.status === 'IN_PROGRESS' && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    <Activity className="w-3 h-3" /> Live
                  </span>
                )}
              </h1>
              <p className="text-xs text-ink-faint">Req: {session.jobId} • Mode: {session.mode}</p>
            </div>
          </div>
          {isCompleted && (
            <Button variant="primary" className="bg-success hover:bg-success/90">Approve Candidate</Button>
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
               <div className="w-full flex items-center justify-center gap-2 mt-4 text-xs font-semibold text-primary bg-primary/5 py-1.5 rounded-full border border-primary/20">
                  <CheckCircle className="w-3.5 h-3.5" /> ID Verified
               </div>
             </Card>

             <Card className="p-5 flex-1">
               <h3 className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-4">Interview Details</h3>
               <div className="space-y-4">
                 <div>
                   <div className="text-xs text-ink-soft">Duration</div>
                   <div className="text-sm font-semibold text-ink">{session.durationMinutes} Minutes</div>
                 </div>
                 <div>
                   <div className="text-xs text-ink-soft">AI Mode</div>
                   <div className="text-sm font-semibold text-ink capitalize flex items-center gap-2">
                     <Phone className="w-4 h-4 text-ink-faint" /> {session.mode} Voice Agent
                   </div>
                 </div>
                 <div>
                   <div className="text-xs text-ink-soft">Scheduled</div>
                   <div className="text-sm font-semibold text-ink">{session.scheduledAt}</div>
                 </div>
               </div>
             </Card>
          </div>

          {/* CENTER PANE: Interview Interface / Transcript */}
          <div className="lg:col-span-6 flex flex-col min-h-0 border border-border bg-surface rounded-[var(--radius-lg)] shadow-sm overflow-hidden">
             <div className="bg-surface-sunken border-b border-border p-4 shrink-0 flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-primary" /> Live Transcript
                </h3>
                <div className="text-xs font-semibold text-ink-soft">
                   Progress: {session.currentQuestionIndex} / {session.questions.length}
                </div>
             </div>
             
             {/* Fake Waveform for Voice */}
             {session.mode === 'voice' && session.status === 'IN_PROGRESS' && (
               <div className="h-16 bg-hm-matte flex items-center justify-center gap-1 shrink-0 overflow-hidden">
                  {[...Array(40)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-primary rounded-full animate-pulse" 
                      style={{ 
                        height: `${Math.max(10, Math.random() * 40)}px`,
                        animationDelay: `${Math.random() * 0.5}s`
                      }} 
                    />
                  ))}
               </div>
             )}

             <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-surface">
                {session.questions.slice(0, session.currentQuestionIndex + 1).map((q, i) => (
                  <div key={q.id} className="space-y-4">
                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex flex-col items-center justify-center text-white shrink-0">
                           <BrainCircuit className="w-4 h-4" />
                        </div>
                        <div className="bg-surface-sunken p-3.5 rounded-[var(--radius-md)] rounded-tl-none border border-border text-sm text-ink max-w-[85%]">
                           <div className="text-[10px] font-bold text-primary mb-1 uppercase">HireMind AI (Question {i + 1})</div>
                           <p>{q.question}</p>
                        </div>
                     </div>
                     
                     {q.candidateAnswer ? (
                       <div className="flex gap-3 flex-row-reverse">
                          <div className="w-8 h-8 rounded-full bg-hm-matte flex flex-col items-center justify-center text-white shrink-0">
                             <User className="w-4 h-4" />
                          </div>
                          <div className="bg-primary/5 p-3.5 rounded-[var(--radius-md)] rounded-tr-none border border-primary/20 text-sm text-ink max-w-[85%]">
                             <div className="text-[10px] font-bold text-hm-matte mb-1 uppercase">Candidate</div>
                             <p>{q.candidateAnswer}</p>
                          </div>
                       </div>
                     ) : (
                       <div className="flex gap-3 flex-row-reverse opacity-50">
                          <div className="w-8 h-8 rounded-full bg-hm-matte flex items-center justify-center text-white shrink-0">
                             <User className="w-4 h-4" />
                          </div>
                          <div className="bg-surface-sunken p-3.5 rounded-[var(--radius-md)] rounded-tr-none border border-border text-sm text-ink flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce" />
                             <div className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce delay-75" />
                             <div className="w-1.5 h-1.5 rounded-full bg-ink-faint animate-bounce delay-150" />
                          </div>
                       </div>
                     )}
                  </div>
                ))}
             </div>
          </div>

          {/* RIGHT PANE: AI Evaluation */}
          <div className="lg:col-span-3 flex flex-col gap-4 min-h-0 overflow-y-auto">
             <Card className="p-5 bg-hm-deep text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
                <h3 className="text-xs font-bold text-primary-tint uppercase tracking-wider mb-4 relative z-10">AI Final Evaluation</h3>
                
                {isCompleted && session.aiSummary ? (
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-end gap-2">
                      <div className="text-5xl font-black">{session.overallScore}</div>
                      <div className="text-sm font-medium text-white/60 mb-1">/ 100 Match</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/80">Technical</span>
                          <span className="font-bold">{session.technicalScore}</span>
                        </div>
                        <div className="w-full h-1 bg-surface/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${session.technicalScore}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/80">Communication</span>
                          <span className="font-bold">{session.communicationScore}</span>
                        </div>
                        <div className="w-full h-1 bg-surface/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${session.communicationScore}%` }} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs font-bold text-success flex items-center gap-1.5 mb-2">
                        <CheckCircle className="w-4 h-4" /> Recommendation
                      </div>
                      <p className="text-sm font-medium">{session.aiSummary.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center py-10 text-center opacity-70">
                    <BarChart className="w-10 h-10 mb-3" />
                    <p className="text-sm">AI Evaluation will be generated once the interview is complete.</p>
                  </div>
                )}
             </Card>

             {isCompleted && session.aiSummary && (
               <Card className="p-5 flex-1">
                 <h3 className="text-xs font-bold text-ink-faint uppercase tracking-wider mb-4 flex items-center gap-1.5">
                   <ShieldAlert className="w-4 h-4 text-warning" /> Areas to Verify
                 </h3>
                 <ul className="space-y-3">
                   {session.aiSummary.areasToVerify?.map((area, idx) => (
                     <li key={idx} className="text-sm text-ink-soft flex items-start gap-2">
                       <span className="text-warning mt-0.5">•</span> {area}
                     </li>
                   ))}
                   {(!session.aiSummary.areasToVerify || session.aiSummary.areasToVerify.length === 0) && (
                     <li className="text-sm text-ink-faint italic">No major concerns flagged.</li>
                   )}
                 </ul>
               </Card>
             )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
