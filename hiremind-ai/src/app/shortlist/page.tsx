'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { shortlistService } from '@/services/shortlist.service';
import { ShortlistEntry } from '@/types';
import { Award, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ShortlistPage() {
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [selectedReasoning, setSelectedReasoning] = useState<string | null>(null);

  useEffect(() => {
    async function loadShortlist() {
      const data = await shortlistService.getShortlist();
      setShortlist(data);
    }
    loadShortlist();
  }, []);

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        <div className="bg-white border border-border-color p-6 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-[#722F37] text-xs font-bold text-primary mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Explainable AI Candidate Ranking Engine</span>
            </div>
            <h1 className="text-xl font-extrabold text-text-primary">AI Shortlisted Top Talent</h1>
            <p className="text-xs text-text-secondary mt-1">
              Multi-dimensional ranking synthesizing resume match, interview performance, and verified evidence.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {shortlist.map((item) => (
            <div
              key={item.candidate.id}
              className="bg-white border border-border-color hover:border-[#722F37] p-6 rounded-[var(--radius-lg)] shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-primary flex items-center justify-center font-extrabold text-text-primary text-lg border border-dark-blue shrink-0 shadow">
                  #{item.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-text-primary">{item.candidate.name}</h3>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      RECOMMENDED FOR REVIEW
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.candidate.jobTitle} • {item.candidate.location}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.candidate.skills.slice(0, 5).map((sk) => (
                      <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-page-bg text-text-secondary border border-border-color">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-border-color">
                <div className="grid grid-cols-3 gap-3 text-center bg-page-bg p-3 rounded-[var(--radius-md)] border border-border-color">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-text-secondary block">Match</span>
                    <span className="text-xs font-extrabold text-emerald-400">{item.candidate.matchScore}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-text-secondary block">Interview</span>
                    <span className="text-xs font-extrabold text-text-primary">{item.candidate.interviewScore}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-text-secondary block">Verification</span>
                    <span className="text-xs font-extrabold text-primary">{item.candidate.verificationScore}%</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedReasoning(item.explainableReasoning)}
                    className="w-full sm:w-auto px-3.5 py-2 bg-page-bg hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-[var(--radius-sm)] border border-border-color transition-colors flex items-center justify-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-primary" />
                    <span>Why Shortlisted?</span>
                  </button>

                  <Link
                    href={`/candidates/${item.candidate.id}`}
                    className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-sm)] shadow border border-dark-blue transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Review Candidate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedReasoning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-[#722F37] rounded-[var(--radius-lg)] max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5" />
                <span>Explainable AI Shortlist Reasoning</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed bg-page-bg p-4 rounded-[var(--radius-md)] border border-border-color">
                {selectedReasoning}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedReasoning(null)}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-[var(--radius-sm)] border border-dark-blue"
                >
                  Close Explanation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
