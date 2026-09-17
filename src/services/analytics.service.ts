import { AnalyticsSummary } from '@/types';
import { callWebhook } from './api';

export interface HRStats {
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  offers: number;
  hired: number;
}

export const analyticsService = {
  async getAnalyticsSummary(timeframeDays: number = 30): Promise<AnalyticsSummary> {
    return await callWebhook<AnalyticsSummary>({
      action: 'GET_ANALYTICS_SUMMARY',
      role: 'hr',
      data: { timeframeDays }
    });
  },

  async getHRStats(): Promise<HRStats> {
    const webhookUrl = process.env.NEXT_PUBLIC_ANALYTICS_SUMMARY_WEBHOOK;
    if (!webhookUrl) {
      throw new Error('WEBHOOK_NOT_CONFIGURED_FOR_HR_STATS');
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'hr', action: 'GET_ANALYTICS_SUMMARY' })
    });
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return await response.json();
  },

  async getCandidateStats(): Promise<{ activeJobs: number; applied: number; interviewed: number; offers: number }> {
    return await callWebhook({
      action: 'GET_ANALYTICS_SUMMARY',
      role: 'candidate'
    });
  }
};
