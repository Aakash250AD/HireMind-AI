export const WEBHOOKS = {
  jobCreate: process.env.NEXT_PUBLIC_WEBHOOK_JOB_CREATE!,
  jobList: process.env.NEXT_PUBLIC_WEBHOOK_JOB_LIST!,
  candidateApply: process.env.NEXT_PUBLIC_WEBHOOK_CANDIDATE_APPLY!,
  candidateStatus: process.env.NEXT_PUBLIC_WEBHOOK_CANDIDATE_STATUS!,
  interviewStart: process.env.NEXT_PUBLIC_WEBHOOK_INTERVIEW_START!,
  interviewMessage: process.env.NEXT_PUBLIC_WEBHOOK_INTERVIEW_MESSAGE!,
  assessmentSubmit: process.env.NEXT_PUBLIC_WEBHOOK_ASSESSMENT_SUBMIT!,
  shortlist: process.env.NEXT_PUBLIC_WEBHOOK_SHORTLIST!,
  decision: process.env.NEXT_PUBLIC_WEBHOOK_DECISION!,
  hrStats: process.env.NEXT_PUBLIC_WEBHOOK_HR_STATS!,
  candidateStats: process.env.NEXT_PUBLIC_WEBHOOK_CANDIDATE_STATS!,
};
