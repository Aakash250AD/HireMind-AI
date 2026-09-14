import { Candidate, PipelineStage } from '@/types';
import { callWebhook } from './api';
import { supabase } from '@/lib/supabase';

export const candidatesService = {
  async getCandidates(jobId?: string, stage?: PipelineStage): Promise<Candidate[]> {
    try {
      return await callWebhook<Candidate[]>({
        action: 'GET_CANDIDATES',
        role: 'admin',
        data: { jobId, stage }
      });
    } catch {
      return [];
    }
  },

  async getCandidateById(id: string): Promise<Candidate | null> {
    try {
      return await callWebhook<Candidate | null>({
        action: 'GET_CANDIDATE',
        role: 'admin',
        data: { candidateId: id }
      });
    } catch {
      return null;
    }
  },

  async updateCandidateStage(id: string, newStage: PipelineStage): Promise<Candidate> {
    return await callWebhook<Candidate>({
      action: 'UPDATE_CANDIDATE_STAGE',
      role: 'admin',
      data: { candidateId: id, newStage }
    });
  },

  async submitRecruiterDecision(
    id: string,
    decisionStatus: 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED',
    notes?: string
  ): Promise<Candidate> {
    return await callWebhook<Candidate>({
      action: 'SUBMIT_DECISION',
      role: 'admin',
      userId: 'admin-1',
      data: { candidateId: id, decisionStatus, notes }
    });
  },

  async uploadAndScreenResume(fileName: string, fileBase64: string, mimeType: string, jobId: string): Promise<Candidate> {
    const webhookUrl = process.env.NEXT_PUBLIC_APPLY_JOB_WEBHOOK;
    if (!webhookUrl) {
      throw new Error('Apply Job webhook not configured.');
    }
    
    // We fetch the current user's email to pass it to the webhook
    const { data: { session } } = await supabase.auth.getSession();

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'APPLY_JOB',
        role: 'candidate',
        email: session?.user?.email || 'unknown@example.com',
        userId: session?.user?.id || 'cand-1',
        data: { fileName, fileBase64, mimeType, jobId }
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to apply for job.');
    }
    
    return await response.json();
  },

  async getCandidateApplications(): Promise<any> {
    let candidates: Candidate[] = [];
    try {
      candidates = await callWebhook<Candidate[]>({
        action: 'GET_CANDIDATES',
        role: 'candidate',
        userId: 'cand-1'
      });
    } catch {
      candidates = [];
    }
    
    // Map it to ApplicationStatus shape used by candidate/applications/page.tsx
    if (!candidates || candidates.length === 0) {
      return { currentStep: 1, applications: [] };
    }
    
    const activeApp = candidates[0];
    let currentStep = 1;
    switch (activeApp.stage) {
      case 'Applied': currentStep = 1; break;
      case 'Screening': currentStep = 2; break;
      case 'Interview': currentStep = 3; break;
      case 'Shortlisted': currentStep = 4; break;
      case 'Human Review': currentStep = 4; break;
      case 'Hired': currentStep = 5; break;
      default: currentStep = 1; break;
    }
    
    return {
      currentStep,
      applications: candidates.map(c => ({
        jobId: c.appliedJobId,
        jobTitle: c.jobTitle,
        status: c.stage,
        dateApplied: c.appliedDate
      }))
    };
  }
};
