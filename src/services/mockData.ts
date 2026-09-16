import { Job, Candidate, InterviewSession, ShortlistEntry, AutomationWorkflow, EmailCommunication, NotificationItem, AnalyticsSummary } from '@/types';

export const MOCK_JOBS: Job[] = [];
export const MOCK_CANDIDATES: Candidate[] = [];
export const MOCK_INTERVIEWS: InterviewSession[] = [];
export const MOCK_SHORTLIST: ShortlistEntry[] = [];
export const MOCK_AUTOMATIONS: AutomationWorkflow[] = [];
export const MOCK_EMAILS: EmailCommunication[] = [];
export const MOCK_NOTIFICATIONS: NotificationItem[] = [];

export const MOCK_ANALYTICS: AnalyticsSummary = {
  timeToScreenDays: 0,
  timeToHireDays: 0,
  candidatesScreened: 0,
  interviewCompletionRate: 0,
  shortlistRate: 0,
  verificationRate: 0,
  applicationsOverTime: [],
  candidateScoreDistribution: [],
  pipelineFunnel: []
};
