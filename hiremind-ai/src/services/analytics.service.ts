import { AnalyticsSummary } from '@/types';
import { MOCK_ANALYTICS } from './mockData';
import { simulateNetworkDelay } from './api';

export const analyticsService = {
  async getAnalyticsSummary(timeframeDays: number = 30): Promise<AnalyticsSummary> {
    await simulateNetworkDelay(500);
    // Return structured recruitment metrics
    return { ...MOCK_ANALYTICS };
  }
};
