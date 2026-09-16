import { ShortlistEntry } from '@/types';
import { callWebhook } from './api';

export const shortlistService = {
  async getShortlist(jobId?: string): Promise<any[]> {
    return await callWebhook<any[]>({
      action: 'GET_SHORTLIST',
      role: 'admin',
      data: { jobId }
    });
  },

  async getReasoningForCandidate(candidateId: string): Promise<string> {
    return await callWebhook<string>({
      action: 'GET_SHORTLIST_REASONING',
      role: 'admin',
      data: { candidateId }
    });
  },

  async submitDecision(jobId: string, candidateId: string, decision: 'advance' | 'pass'): Promise<void> {
    await callWebhook<void>({
      action: 'SUBMIT_DECISION',
      role: 'admin',
      data: { jobId, candidateId, decision }
    });
  }
};
