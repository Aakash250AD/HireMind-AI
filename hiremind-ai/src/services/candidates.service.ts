import { Candidate, PipelineStage } from '@/types';
import { MOCK_CANDIDATES } from './mockData';
import { simulateNetworkDelay, callWebhook } from './api';

const candidatesDb: Candidate[] = [...MOCK_CANDIDATES];

export const candidatesService = {
  async getCandidates(jobId?: string, stage?: PipelineStage): Promise<Candidate[]> {
    try {
      return await callWebhook<Candidate[]>({
        action: 'GET_CANDIDATES',
        role: 'admin',
        data: { jobId, stage }
      });
    } catch (error) {
      await simulateNetworkDelay(400);
      let list = [...candidatesDb];
      if (jobId) {
        list = list.filter((c) => c.appliedJobId === jobId);
      }
      if (stage) {
        list = list.filter((c) => c.stage === stage);
      }
      return list;
    }
  },

  async getCandidateById(id: string): Promise<Candidate | null> {
    try {
      return await callWebhook<Candidate | null>({
        action: 'GET_CANDIDATE',
        role: 'admin',
        data: { candidateId: id }
      });
    } catch (error) {
      await simulateNetworkDelay(300);
      const candidate = candidatesDb.find((c) => c.id === id);
      return candidate || null;
    }
  },

  async updateCandidateStage(id: string, newStage: PipelineStage): Promise<Candidate> {
    try {
      return await callWebhook<Candidate>({
        action: 'UPDATE_CANDIDATE_STAGE',
        role: 'admin',
        data: { candidateId: id, newStage }
      });
    } catch (error) {
      await simulateNetworkDelay(400);
      const index = candidatesDb.findIndex((c) => c.id === id);
      if (index === -1) throw new Error('Candidate not found');
      candidatesDb[index] = { ...candidatesDb[index], stage: newStage };
      return candidatesDb[index];
    }
  },

  async submitRecruiterDecision(
    id: string,
    decisionStatus: 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED',
    notes?: string
  ): Promise<Candidate> {
    try {
      return await callWebhook<Candidate>({
        action: 'SUBMIT_DECISION',
        role: 'admin',
        userId: 'admin-1',
        data: { candidateId: id, decisionStatus, notes }
      });
    } catch (error) {
      await simulateNetworkDelay(600);
      const index = candidatesDb.findIndex((c) => c.id === id);
      if (index === -1) throw new Error('Candidate not found');

      let updatedStage = candidatesDb[index].stage;
      if (decisionStatus === 'APPROVED') updatedStage = 'Hired';
      if (decisionStatus === 'REJECTED') updatedStage = 'Archived';

      candidatesDb[index] = {
        ...candidatesDb[index],
        decisionStatus,
        recruiterNotes: notes || candidatesDb[index].recruiterNotes,
        stage: updatedStage
      };
      return candidatesDb[index];
    }
  },

  async uploadAndScreenResume(fileName: string, jobId: string): Promise<Candidate> {
    try {
      return await callWebhook<Candidate>({
        action: 'APPLY_JOB',
        role: 'candidate',
        userId: 'cand-1',
        data: { fileName, jobId }
      });
    } catch (error) {
      await simulateNetworkDelay(2500); // Simulate PDF extraction, LLM parsing, and verification
      const newCandidate: Candidate = {
        id: `cand-${Date.now()}`,
        name: fileName.replace(/[\._-]/g, ' ').replace(/(pdf|docx|doc)/gi, '').trim() || 'New Candidate',
        email: 'applicant.ai@example.com',
        phone: '+1 (555) 123-4455',
        location: 'San Francisco, CA',
        currentRole: 'Senior Software Engineer',
        experienceYears: 4,
        education: 'B.S. in Computer Science',
        resumeUrl: `/resumes/${fileName}`,
        appliedJobId: jobId,
        jobTitle: 'Senior AI / Machine Learning Engineer',
        appliedDate: new Date().toISOString().split('T')[0],
        stage: 'Screening',
        matchScore: 89,
        interviewScore: 0,
        verificationScore: 92,
        overallScore: 89,
        skills: ['Python', 'PyTorch', 'FastAPI', 'SQL', 'Docker'],
        summary: 'Automatically screened candidate via drag-and-drop resume ingestion pipeline.',
        verifications: [
          {
            claim: 'Python & FastAPI Backend Microservices',
            category: 'Backend',
            status: 'VERIFIED',
            confidence: 92,
            resumeEvidence: 'Listed 3 years developing FastAPI microservices.',
            interviewEvidence: 'Pending interactive AI interview.',
            assessmentEvidence: 'Resume project links validated.',
            explanation: 'Initial AI screening detected strong alignment.'
          }
        ],
        decisionStatus: 'PENDING'
      };

      candidatesDb.unshift(newCandidate);
      return newCandidate;
    }
  }
};
