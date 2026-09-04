import { Job } from '@/types';
import { MOCK_JOBS } from './mockData';
import { simulateNetworkDelay, callWebhook } from './api';

let jobsDatabase: Job[] = [...MOCK_JOBS];

export const jobsService = {
  async getJobs(): Promise<Job[]> {
    try {
      return await callWebhook<Job[]>({
        action: 'GET_JOBS',
        role: 'admin'
      });
    } catch (error) {
      await simulateNetworkDelay(400);
      return [...jobsDatabase];
    }
  },

  async getJobById(id: string): Promise<Job | null> {
    try {
      return await callWebhook<Job | null>({
        action: 'GET_JOB',
        role: 'admin',
        data: { jobId: id }
      });
    } catch (error) {
      await simulateNetworkDelay(300);
      const job = jobsDatabase.find((j) => j.id === id);
      return job || null;
    }
  },

  async analyzeJobDescription(rawDescription: string, titleHint?: string): Promise<Partial<Job>> {
    try {
      return await callWebhook<Partial<Job>>({
        action: 'ANALYZE_JOB_DESCRIPTION',
        role: 'admin',
        data: { rawDescription, titleHint }
      });
    } catch (error) {
      await simulateNetworkDelay(1800); // Simulate AI LLM extraction time
      
      // Extracted AI attributes based on JD
      return {
        title: titleHint || 'Senior Autonomous AI Systems Engineer',
        department: 'AI & Automation Solutions',
        experienceYears: '4+ years',
        education: "Master's or Bachelor's in CS / Data Science",
        salaryRange: '$155,000 - $205,000',
        description: rawDescription,
        requiredSkills: ['Python', 'PyTorch', 'FastAPI', 'LLMs', 'Vector Databases', 'Docker'],
        preferredSkills: ['LangChain', 'PostgreSQL', 'Redis', 'Kubernetes', 'CI/CD Pipelines'],
        responsibilities: [
          'Architect and deploy high-throughput autonomous LLM workflows and microservices.',
          'Optimize multi-agent decision reasoning, latency, and context window efficiency.',
          'Collaborate with product and recruitment leaders to refine automated evaluation benchmarks.'
        ],
        extractedKeywords: ['Agentic AI', 'RAG Pipelines', 'Vector Indexing', 'FastAPI', 'PyTorch']
      };
    }
  },

  async createJob(newJob: Omit<Job, 'id' | 'createdAt' | 'candidateCount'>): Promise<Job> {
    try {
      return await callWebhook<Job>({
        action: 'CREATE_JOB',
        role: 'admin',
        userId: 'admin-1',
        data: newJob
      });
    } catch (error) {
      await simulateNetworkDelay(800);
      const created: Job = {
        ...newJob,
        id: `job-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        candidateCount: 0
      };
      jobsDatabase.unshift(created);
      return created;
    }
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    try {
      return await callWebhook<Job>({
        action: 'UPDATE_JOB',
        role: 'admin',
        data: { id, updates }
      });
    } catch (error) {
      await simulateNetworkDelay(500);
      const index = jobsDatabase.findIndex((j) => j.id === id);
      if (index === -1) throw new Error('Job not found');
      jobsDatabase[index] = { ...jobsDatabase[index], ...updates };
      return jobsDatabase[index];
    }
  },

  async deleteJob(id: string): Promise<void> {
    try {
      await callWebhook<void>({
        action: 'DELETE_JOB',
        role: 'admin',
        data: { id }
      });
    } catch (error) {
      await simulateNetworkDelay(400);
      jobsDatabase = jobsDatabase.filter((j) => j.id !== id);
    }
  }
};
