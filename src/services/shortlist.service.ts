import { ShortlistEntry } from '@/types';
import { callWebhook } from './api';

export const shortlistService = {
  async getShortlist(jobId?: string): Promise<ShortlistEntry[]> {
    return await callWebhook<ShortlistEntry[]>({
      action: 'GET_SHORTLIST',
      role: 'hr',
      data: { jobId }
    });
  },

  async getReasoningForCandidate(candidateId: string): Promise<string> {
    return await callWebhook<string>({
      action: 'GET_SHORTLIST_REASONING',
      role: 'hr',
      data: { candidateId }
    });
  }
};
