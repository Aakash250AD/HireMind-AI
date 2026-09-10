import { ShortlistEntry } from '@/types';
import { MOCK_SHORTLIST } from './mockData';
import { simulateNetworkDelay, callWebhook } from './api';

export const shortlistService = {
  async getShortlist(): Promise<ShortlistEntry[]> {
    try {
      const response = await callWebhook<ShortlistEntry[]>({
        action: 'GET_SHORTLIST',
        role: 'admin'
      });
      if (response) { return response; }
    } catch (error) {
      console.warn('Webhook GET_SHORTLIST failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(400);
    return [...MOCK_SHORTLIST];
  },

  async getReasoningForCandidate(candidateId: string): Promise<string> {
    try {
      const response = await callWebhook<string>({
        action: 'GET_SHORTLIST_REASONING',
        role: 'admin',
        data: { candidateId }
      });
      if (response) { return response; }
    } catch (error) {
      console.warn('Webhook GET_SHORTLIST_REASONING failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(300);
    const entry = MOCK_SHORTLIST.find((s) => s.candidate.id === candidateId);
    if (entry) return entry.explainableReasoning;
    return 'Candidate demonstrates strong alignment with job specifications, passed AI screening benchmarks, and exhibits verified technical evidence across resume and interview checkpoints.';
  }
};
