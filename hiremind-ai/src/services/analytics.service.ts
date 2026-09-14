import { AnalyticsSummary } from '@/types';
import { callWebhook } from './api';
import { MOCK_ANALYTICS } from './mockData';

export const analyticsService = {
  async getAnalyticsSummary(timeframeDays: number = 30): Promise<AnalyticsSummary> {
    try {
      return await callWebhook<AnalyticsSummary>({
        action: 'GET_ANALYTICS_SUMMARY',
        role: 'admin',
        data: { timeframeDays }
      });
    } catch {
      return MOCK_ANALYTICS;
    }
  },

  async getHRStats(): Promise<any> {
    const webhookUrl = process.env.NEXT_PUBLIC_ANALYTICS_SUMMARY_WEBHOOK;
    if (!webhookUrl) {
      console.warn('Analytics webhook URL missing, falling back to mock data.');
      return { activeJobs: 0, totalApplications: 0, pendingApplications: 0, offers: 0, hired: 0 };
    }
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin', action: 'GET_ANALYTICS_SUMMARY' })
      });
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  async getCandidateStats(): Promise<any> {
    try {
      return await callWebhook<any>({
        action: 'GET_ANALYTICS_SUMMARY',
        role: 'candidate'
      });
    } catch {
      return { activeJobs: 0, applied: 0, interviewed: 0, offers: 0 };
    }
  }
};
