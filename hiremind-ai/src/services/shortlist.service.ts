import { ShortlistEntry } from '@/types';
import { MOCK_SHORTLIST } from './mockData';
import { simulateNetworkDelay } from './api';

export const shortlistService = {
  async getShortlist(): Promise<ShortlistEntry[]> {
    await simulateNetworkDelay(400);
    return [...MOCK_SHORTLIST];
  },

  async getReasoningForCandidate(candidateId: string): Promise<string> {
    await simulateNetworkDelay(300);
    const entry = MOCK_SHORTLIST.find((s) => s.candidate.id === candidateId);
    if (entry) return entry.explainableReasoning;
    return 'Candidate demonstrates strong alignment with job specifications, passed AI screening benchmarks, and exhibits verified technical evidence across resume and interview checkpoints.';
  }
};
