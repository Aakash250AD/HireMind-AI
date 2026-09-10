import { AnalyticsSummary } from '@/types';
import { MOCK_ANALYTICS } from './mockData';
import { simulateNetworkDelay, callWebhook } from './api';

export const analyticsService = {
  async getAnalyticsSummary(timeframeDays: number = 30): Promise<AnalyticsSummary> {
    try {
      const response = await callWebhook<AnalyticsSummary>({
        action: 'GET_ANALYTICS_SUMMARY',
        role: 'admin',
        data: { timeframeDays }
      });
      if (response) {
        return response;
      }
    } catch (error) {
      console.warn('Webhook GET_ANALYTICS_SUMMARY failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(500);
    // Return structured recruitment metrics
    return { ...MOCK_ANALYTICS };
  }
};
