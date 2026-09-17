import { ApplicationInterview } from '@/types';
import { callWebhook } from './api';

export interface InterviewSessionResult {
  id: string;
  applicationId: string;
  status: 'in_progress' | 'completed';
  questionCount: number;
  maxQuestions: number;
  currentQuestion?: string;
}

export const interviewsService = {
  async getInterviewById(sessionId: string): Promise<ApplicationInterview | null> {
    return await callWebhook<ApplicationInterview | null>({
      action: 'GET_INTERVIEW',
      role: 'candidate',
      data: { sessionId }
    });
  },

  async createInterviewSession(applicationId: string): Promise<InterviewSessionResult> {
    return await callWebhook<InterviewSessionResult>({
      action: 'START_INTERVIEW',
      role: 'candidate',
      data: { applicationId }
    });
  },

  async submitAnswer(sessionId: string, questionIndex: number, answerText: string): Promise<{ session: InterviewSessionResult; nextQuestion?: string; completed: boolean }> {
    return await callWebhook<{ session: InterviewSessionResult; nextQuestion?: string; completed: boolean }>({
      action: 'SUBMIT_INTERVIEW_ANSWER',
      role: 'candidate',
      data: { sessionId, questionIndex, answerText }
    });
  }
};
