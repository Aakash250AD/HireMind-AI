'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardLayout } from '@/components/DashboardLayout';
import { analyticsService } from '@/services/analytics.service';
import { AnalyticsSummary } from '@/types';
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

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      const summary = await analyticsService.getAnalyticsSummary();
      setData(summary);
    }
    loadAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center text-xs text-text-secondary">
        Loading Recruitment Analytics...
      </div>
    );
  }

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-border p-6 rounded-[var(--radius-lg)] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-text-primary">AI Automation Efficiency Analytics</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Measuring screening speedup, candidate score distributions, and time-to-hire metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-page-bg p-1.5 rounded-[var(--radius-sm)] border border-border text-xs font-semibold">
            <span className="px-3 py-1 bg-primary text-text-primary rounded">Last 30 Days</span>
          </div>
        </div>

        {/* Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white border border-border p-4 rounded-[var(--radius-md)] shadow">
            <span className="text-[10px] uppercase font-bold text-text-secondary block">Time to Screen</span>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">{data.timeToScreenDays} Days</div>
            <span className="text-[9px] text-text-muted">vs 4.2 days manual</span>
          </div>
          <div className="bg-white border border-border p-4 rounded-[var(--radius-md)] shadow">
            <span className="text-[10px] uppercase font-bold text-text-secondary block">Time to Hire</span>
            <div className="text-xl font-extrabold text-text-primary mt-1">{data.timeToHireDays} Days</div>
            <span className="text-[9px] text-text-muted">Industry avg: 24 days</span>
          </div>
          <div className="bg-white border border-border p-4 rounded-[var(--radius-md)] shadow">
            <span className="text-[10px] uppercase font-bold text-text-secondary block">Screened Pool</span>
            <div className="text-xl font-extrabold text-text-primary mt-1">{data.candidatesScreened}</div>
            <span className="text-[9px] text-text-muted">100% LLM parsed</span>
          </div>
          <div className="bg-white border border-border p-4 rounded-[var(--radius-md)] shadow">
            <span className="text-[10px] uppercase font-bold text-text-secondary block">Interview Rate</span>
            <div className="text-xl font-extrabold text-primary mt-1">{data.interviewCompletionRate}%</div>
            <span className="text-[9px] text-text-muted">Autonomous audio/text</span>
          </div>
          <div className="bg-white border border-border p-4 rounded-[var(--radius-md)] shadow">
            <span className="text-[10px] uppercase font-bold text-text-secondary block">Shortlist Precision</span>
            <div className="text-xl font-extrabold text-amber-400 mt-1">{data.shortlistRate}%</div>
            <span className="text-[9px] text-text-muted">Passed benchmarks</span>
          </div>
          <div className="bg-white border border-border p-4 rounded-[var(--radius-md)] shadow">
            <span className="text-[10px] uppercase font-bold text-text-secondary block">Verification Rate</span>
            <div className="text-xl font-extrabold text-indigo-400 mt-1">{data.verificationRate}%</div>
            <span className="text-[9px] text-text-muted">High confidence</span>
          </div>
        </div>

        {/* Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications Trend Line Chart */}
          <div className="bg-white border border-border p-6 rounded-[var(--radius-lg)] shadow-lg">
            <h3 className="text-sm font-bold text-text-primary mb-4">Applications Ingested Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.applicationsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#383838" />
                  <XAxis dataKey="date" stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F1F1F', borderColor: '#383838', color: '#FFF' }} />
                  <Line type="monotone" dataKey="count" stroke="#722F37" strokeWidth={3} dot={{ fill: '#722F37' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Candidate Score Distribution Bar Chart */}
          <div className="bg-white border border-border p-6 rounded-[var(--radius-lg)] shadow-lg">
            <h3 className="text-sm font-bold text-text-primary mb-4">Candidate Overall Score Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.candidateScoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#383838" />
                  <XAxis dataKey="range" stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#A1A1AA" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F1F1F', borderColor: '#383838', color: '#FFF' }} />
                  <Bar dataKey="count" fill="#722F37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
