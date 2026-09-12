import { Job } from '@/types';
import { callWebhook } from './api';

export const jobsService = {
  async getJobs(): Promise<Job[]> {
    return await callWebhook<Job[]>({
      action: 'GET_JOBS',
      role: 'admin'
    });
  },

  async getJobById(id: string): Promise<Job | null> {
    return await callWebhook<Job | null>({
      action: 'GET_JOB',
      role: 'admin',
      data: { jobId: id }
    });
  },

  async analyzeJobDescription(rawDescription: string, titleHint?: string): Promise<Partial<Job>> {
    return await callWebhook<Partial<Job>>({
      action: 'ANALYZE_JOB_DESCRIPTION',
      role: 'admin',
      data: { rawDescription, titleHint }
    });
  },

  async createJob(newJob: Omit<Job, 'id' | 'createdAt' | 'candidateCount'>): Promise<Job> {
    return await callWebhook<Job>({
      action: 'CREATE_JOB',
      role: 'admin',
      userId: 'admin-1', // You can dynamically pass the HR's user ID here
      data: newJob
    });
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    return await callWebhook<Job>({
      action: 'UPDATE_JOB',
      role: 'admin',
      data: { id, updates }
    });
  },

  async deleteJob(id: string): Promise<void> {
    await callWebhook<void>({
      action: 'DELETE_JOB',
      role: 'admin',
      data: { id }
    });
  }
};
