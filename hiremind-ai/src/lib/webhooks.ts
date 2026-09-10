export const WEBHOOKS = {
  jobCreate: process.env.NEXT_PUBLIC_WEBHOOK_JOB_CREATE || 'mock-jobCreate',
  jobList: process.env.NEXT_PUBLIC_WEBHOOK_JOB_LIST || 'mock-jobList',
  candidateApply: process.env.NEXT_PUBLIC_WEBHOOK_CANDIDATE_APPLY || 'mock-candidateApply',
  candidateStatus: process.env.NEXT_PUBLIC_WEBHOOK_CANDIDATE_STATUS || 'mock-candidateStatus',
  interviewStart: process.env.NEXT_PUBLIC_WEBHOOK_INTERVIEW_START || 'mock-interviewStart',
  interviewMessage: process.env.NEXT_PUBLIC_WEBHOOK_INTERVIEW_MESSAGE || 'mock-interviewMessage',
  assessmentSubmit: process.env.NEXT_PUBLIC_WEBHOOK_ASSESSMENT_SUBMIT || 'mock-assessmentSubmit',
  shortlist: process.env.NEXT_PUBLIC_WEBHOOK_SHORTLIST || 'mock-shortlist',
  decision: process.env.NEXT_PUBLIC_WEBHOOK_DECISION || 'mock-decision',
  hrStats: process.env.NEXT_PUBLIC_WEBHOOK_HR_STATS || 'mock-hrStats',
  candidateStats: process.env.NEXT_PUBLIC_WEBHOOK_CANDIDATE_STATS || 'mock-candidateStats',
};
