'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { candidatesService } from '@/services/candidates.service';
import { Candidate } from '@/types';
import { ChevronLeft } from 'lucide-react';

export default function CompareCandidatesPage() {
  return (
    <Suspense fallback={
      <DashboardLayout role="hr">
        <div className="py-16 text-center text-ink-faint">Loading...</div>
      </DashboardLayout>
    }>
      <CompareCandidatesContent />
    </Suspense>
  );
}

function CompareCandidatesContent() {
  const searchParams = useSearchParams();
  const ids = (searchParams.get('ids') ?? '').split(',').filter(Boolean).slice(0, 3);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCandidates();
  }, [searchParams]);

  async function loadCandidates() {
    if (ids.length === 0) {
      setCandidates([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(ids.map((id) => candidatesService.getCandidateById(id)));
      setCandidates(results.filter((c): c is Candidate => c !== null));
    } catch (err) {
      setError((err as Error).message || 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  }

  const scoreRows: { label: string; key: keyof Candidate }[] = [
    { label: 'Match Score', key: 'matchScore' },
    { label: 'Interview Score', key: 'interviewScore' },
    { label: 'Verification Score', key: 'verificationScore' },
    { label: 'Overall Score', key: 'overallScore' }
  ];

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        <div>
          <Link href="/candidates" className="text-ink-soft hover:text-ink text-sm font-medium flex items-center mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Candidates
          </Link>
          <h1 className="text-2xl font-semibold text-ink">Compare Candidates</h1>
          <p className="text-sm text-ink-soft mt-1">Side-by-side comparison of shortlisted candidates&apos; scores and summaries.</p>
        </div>

        {ids.length === 0 ? (
          <Card className="py-16 text-center text-ink-faint">
            Select 2–3 candidates from the Candidates list to compare them here.
          </Card>
        ) : error ? (
          <Card className="bg-danger-tint border-danger text-danger flex items-center justify-between p-4">
            <span className="text-sm font-medium">{error}</span>
            <Button variant="secondary" onClick={loadCandidates} className="bg-surface">Retry</Button>
          </Card>
        ) : loading ? (
          <Card className="py-16 text-center text-ink-faint">Loading candidates...</Card>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid gap-4 min-w-[640px]" style={{ gridTemplateColumns: `160px repeat(${candidates.length}, 1fr)` }}>
              {/* Header row */}
              <div />
              {candidates.map((c) => (
                <Card key={c.id} className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {c.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h3 className="text-sm font-bold text-ink">{c.name}</h3>
                  <p className="text-xs text-ink-soft">{c.jobTitle}</p>
                  <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-page-bg border border-border text-ink-soft">
                    {c.stage}
                  </span>
                </Card>
              ))}

              {/* Score rows */}
              {scoreRows.map((row) => (
                <React.Fragment key={row.key}>
                  <div className="flex items-center text-xs font-bold text-ink-soft uppercase tracking-wider px-2">
                    {row.label}
                  </div>
                  {candidates.map((c) => (
                    <div key={c.id} className="flex items-center justify-center bg-surface border border-border rounded-[var(--radius-md)] p-3">
                      <span className="text-lg font-black text-primary">{String(c[row.key])}%</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}

              {/* Summary row */}
              <div className="flex items-start text-xs font-bold text-ink-soft uppercase tracking-wider px-2 pt-2">
                AI Summary
              </div>
              {candidates.map((c) => (
                <div key={c.id} className="bg-surface border border-border rounded-[var(--radius-md)] p-3 text-xs text-ink-soft leading-relaxed">
                  {c.summary || 'No summary available yet.'}
                </div>
              ))}

              {/* Skills row */}
              <div className="flex items-start text-xs font-bold text-ink-soft uppercase tracking-wider px-2 pt-2">
                Skills
              </div>
              {candidates.map((c) => (
                <div key={c.id} className="bg-surface border border-border rounded-[var(--radius-md)] p-3 flex flex-wrap gap-1">
                  {(c.skills || []).length > 0 ? (
                    c.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-page-bg border border-border text-ink-soft font-semibold">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-ink-faint italic">None listed</span>
                  )}
                </div>
              ))}

              {/* Action row */}
              <div />
              {candidates.map((c) => (
                <Link
                  key={c.id}
                  href={`/candidates/${c.id}`}
                  className="text-center px-3 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-[var(--radius-sm)] transition-colors"
                >
                  Review Full Profile
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
