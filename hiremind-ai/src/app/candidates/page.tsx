'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { candidatesService } from '@/services/candidates.service';
import { Candidate } from '@/types';
import { Search, Filter, ChevronRight, Award } from 'lucide-react';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCandidates() {
      const data = await candidatesService.getCandidates();
      setCandidates(data || []);
      setLoading(false);
    }
    loadCandidates();
  }, []);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStage = selectedStage === 'ALL' || c.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-border-color p-6 rounded-[var(--radius-lg)] shadow-lg">
          <div>
            <h1 className="text-lg font-bold text-text-primary">Ingested Candidates Pool</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Parsed resumes, calculated match scores, and evidence-verified candidates.
            </p>
          </div>
          <Link
            href="/shortlist"
            className="px-4 py-2.5 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-md)] border border-dark-blue shadow flex items-center justify-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>View AI Shortlist</span>
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-border-color p-4 rounded-[var(--radius-md)]">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by candidate name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#722F37]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-page-bg border border-border-color rounded-[var(--radius-sm)] text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Stages</option>
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interview">Interview</option>
              <option value="Verification">Verification</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Human Review">Human Review</option>
              <option value="Hired">Hired</option>
            </select>
          </div>
        </div>

        {/* Candidate Table */}
        <div className="bg-white border border-border-color rounded-[var(--radius-lg)] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page-bg border-b border-border-color text-text-secondary uppercase font-bold text-[10px] tracking-wider">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Applied Position</th>
                  <th className="p-4">Match Score</th>
                  <th className="p-4">Interview Score</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4">Overall Score</th>
                  <th className="p-4">Stage Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#383838]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-text-secondary">Loading candidate telemetry...</td>
                  </tr>
                ) : filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-text-secondary">No candidates match search criteria.</td>
                  </tr>
                ) : (
                  filteredCandidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-page-bg transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-text-primary text-sm">{cand.name}</div>
                        <div className="text-[11px] text-text-secondary">{cand.location} • {cand.experienceYears} yrs exp</div>
                      </td>
                      <td className="p-4 text-text-secondary font-medium max-w-xs truncate">{cand.jobTitle}</td>
                      <td className="p-4 font-extrabold text-emerald-400">{cand.matchScore}%</td>
                      <td className="p-4 font-bold text-zinc-200">{cand.interviewScore > 0 ? `${cand.interviewScore}%` : 'Pending'}</td>
                      <td className="p-4 font-extrabold text-indigo-400">{cand.verificationScore}%</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-primary/30 border border-[#722F37] font-extrabold text-text-primary">
                          {cand.overallScore}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-page-bg border border-border-color text-text-secondary font-semibold text-[11px]">
                          {cand.stage}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/candidates/${cand.id}`}
                          className="px-3.5 py-1.5 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] border border-dark-blue transition-colors inline-flex items-center gap-1"
                        >
                          <span>Profile</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
