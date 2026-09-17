'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { analyticsService } from '@/services/analytics.service';
import { AnalyticsSummary } from '@/types';
import { Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

function Metric({ label, value, suffix = '', hint }: { label: string; value: number | null | undefined; suffix?: string; hint: string }) {
  const available = value !== null && value !== undefined;
  return (
    <div className="bg-surface border border-border p-4 rounded-[var(--radius-md)] shadow">
      <span className="text-[10px] uppercase font-bold text-text-secondary block">{label}</span>
      <div className={`text-xl font-extrabold mt-1 ${available ? 'text-text-primary' : 'text-text-muted'}`}>
        {available ? `${value}${suffix}` : 'Not yet available'}
      </div>
      <span className="text-[9px] text-text-muted">{hint}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    setLoading(true);
    setError(null);
    setNotConfigured(false);
    try {
      const summary = await analyticsService.getAnalyticsSummary();
      setData(summary);
    } catch (err) {
      const message = (err as Error).message || '';
      if (message.includes('WEBHOOK_NOT_CONFIGURED')) {
        setNotConfigured(true);
      } else {
        setError(message || 'Failed to load analytics');
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout role="hr">
        <div className="py-20 text-center text-xs text-text-secondary">Loading Recruitment Analytics...</div>
      </DashboardLayout>
    );
  }

  if (notConfigured) {
    return (
      <DashboardLayout role="hr">
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <Sparkles className="w-10 h-10 text-text-secondary" />
          <h2 className="text-base font-bold text-text-primary">Analytics Isn&apos;t Connected Yet</h2>
          <p className="text-xs text-text-secondary max-w-sm">
            Once the analytics webhook is configured, recruitment funnel, score distribution, and time-to-hire metrics will appear here.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout role="hr">
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <p className="text-sm text-danger">{error || 'Failed to load analytics'}</p>
          <button onClick={loadAnalytics} className="text-xs font-bold text-primary underline">Retry</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-text-primary">AI Automation Efficiency Analytics</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Measuring screening speedup, candidate score distributions, and time-to-hire metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-page-bg p-1.5 rounded-[var(--radius-sm)] border border-border text-xs font-semibold">
            <span className="px-3 py-1 bg-primary text-white rounded">Last 30 Days</span>
          </div>
        </div>

        {/* Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Metric label="Time to Screen" value={data.timeToScreenDays} suffix=" Days" hint="Automated screening turnaround" />
          <Metric label="Time to Hire" value={data.timeToHireDays} suffix=" Days" hint="Application to hire" />
          <Metric label="Screened Pool" value={data.candidatesScreened} hint="Resumes parsed" />
          <Metric label="Interview Rate" value={data.interviewCompletionRate} suffix="%" hint="Completed AI interviews" />
          <Metric label="Shortlist Precision" value={data.shortlistRate} suffix="%" hint="Passed benchmarks" />
          <Metric label="Verification Rate" value={data.verificationRate} suffix="%" hint="High confidence" />
        </div>

        {/* Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Trend Line Chart */}
          <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg">
            <h3 className="text-sm font-bold text-text-primary mb-4">Applications Ingested Over Time</h3>
            {data.applicationsOverTime.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-xs text-text-muted">No application data yet.</div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.applicationsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
                    <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                    <Line type="monotone" dataKey="count" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Candidate Score Distribution Bar Chart */}
          <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg">
            <h3 className="text-sm font-bold text-text-primary mb-4">Candidate Overall Score Distribution</h3>
            {data.candidateScoreDistribution.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-xs text-text-muted">No scored candidates yet.</div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.candidateScoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="range" stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
                    <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                    <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
