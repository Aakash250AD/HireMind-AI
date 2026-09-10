'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { HumanInTheLoopPanel } from '@/components/HumanInTheLoopPanel';
import { candidatesService } from '@/services/candidates.service';
import { Candidate } from '@/types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, Sparkles, Video } from 'lucide-react';

export default function CandidateProfilePage() {
  const params = useParams();
  const candidateId = (params?.id as string) || 'cand-1';
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const data = await candidatesService.getCandidateById(candidateId);
      setCandidate(data);
    }
    fetchProfile();
  }, [candidateId]);

  if (!candidate) {
    return (
      <DashboardLayout role="hr">
        <div className="flex items-center justify-center py-20 text-xs text-text-secondary">
          Loading Candidate Profile...
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
          <div className="bg-white border border-border p-6 rounded-[var(--radius-md)] shadow-lg">
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
            <div className="md:col-span-2 bg-white border border-border rounded-[var(--radius-md)] p-6 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Candidate Executive Summary</h3>
              <p className="text-xs text-text-secondary leading-relaxed bg-page-bg p-4 rounded-[var(--radius-sm)] border border-border">
                {candidate.summary}
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

            <div className="bg-white border border-border rounded-[var(--radius-md)] p-6 shadow-lg space-y-4 flex flex-col justify-between">
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

              <Link
                href="/interview/int-session-101"
                className="w-full py-2.5 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] border border-border transition-colors flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Launch AI Candidate Interview</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
