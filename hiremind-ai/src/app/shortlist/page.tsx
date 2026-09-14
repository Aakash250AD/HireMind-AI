'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Candidate, ShortlistEntry } from '@/types';
import { Award, ChevronRight, CheckCircle, ShieldAlert, Zap } from 'lucide-react';
import Link from 'next/link';
import { MOCK_SHORTLIST } from '@/services/mockData';

// If MOCK_SHORTLIST is empty (since we cleared it), we'll provide a local empty state array.
// But we want to at least show the UI, so let's allow it to be empty.
// To demonstrate the UX as requested, we could inject a few mock entries here ONLY for this page if they want to see the UX,
// but the user previously asked to remove all mock data. Let's keep it empty, or maybe the user wants to see the UX? 
// "give me a ui and ux for both candidate and hR" - if data is empty, the UX is just an empty state.
// We'll build the table UI so it's ready for data.

export default function ShortlistPage() {
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch for the shortlist data
    const fetchShortlist = async () => {
      setLoading(true);
      // In a real app, this would be: await candidatesService.getShortlist()
      setShortlist([]);
      setLoading(false);
    };
    fetchShortlist();
  }, []);

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Award className="w-32 h-32 text-primary" />
          </div>
          <div className="relative z-10">
            <h1 className="text-xl font-black text-text-primary flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              AI Shortlist Results
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Top recommended candidates mathematically ranked based on technical alignment, interview performance, and verified evidence.
            </p>
          </div>
          <div className="relative z-10 bg-page-bg border border-border px-4 py-2 rounded-lg text-center">
            <span className="block text-[10px] uppercase font-bold text-text-secondary">Shortlisted</span>
            <span className="text-xl font-black text-text-primary">{shortlist.length}</span>
          </div>
        </div>

        {/* Shortlist Table */}
        <div className="bg-surface border border-border rounded-[var(--radius-lg)] shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-text-secondary text-sm">
              Analyzing candidates and computing AI rankings...
            </div>
          ) : shortlist.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-page-bg rounded-full flex items-center justify-center mb-4 border border-border">
                <ShieldAlert className="w-8 h-8 text-text-secondary" />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">No Candidates Shortlisted Yet</h3>
              <p className="text-xs text-text-secondary max-w-sm">
                As candidates apply and complete their AI interviews, the top matches will automatically appear ranked here.
              </p>
              <Link
                href="/candidates"
                className="mt-6 px-4 py-2 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs font-bold text-text-primary hover:text-primary transition-colors"
              >
                View Full Candidate Pool
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-page-bg border-b border-border text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                    <th className="p-4 w-16 text-center">Rank</th>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Overall Score</th>
                    <th className="p-4 w-1/3">AI Reasoning</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shortlist.map((entry) => (
                    <tr key={entry.candidate.id} className="hover:bg-page-bg transition-colors">
                      <td className="p-4 text-center">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-sm border
                          ${entry.rank === 1 ? 'bg-amber-400/20 text-amber-400 border-amber-400/30' : 
                            entry.rank === 2 ? 'bg-zinc-300/20 text-zinc-300 border-zinc-300/30' : 
                            entry.rank === 3 ? 'bg-orange-400/20 text-orange-400 border-orange-400/30' : 
                            'bg-surface-sunken text-text-secondary border-border'}
                        `}>
                          #{entry.rank}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-sm text-text-primary">{entry.candidate.name}</div>
                        <div className="text-[11px] text-text-secondary mt-0.5">{entry.candidate.jobTitle}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg text-primary">{entry.candidate.overallScore}%</span>
                          {entry.candidate.overallScore >= 90 && <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                          {entry.explainableReasoning}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/candidates/${entry.candidate.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] transition-colors"
                        >
                          Review <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
