// UI-facing pipeline stage, derived from applications.screening_status
export type PipelineStage =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Shortlisted'
  | 'Human Review'
  | 'Hired'
  | 'Archived';

// Real backend lifecycle value stored in applications.screening_status
export type ScreeningStatus =
  | 'submitted'
  | 'parsing'
  | 'parsed'
  | 'scored'
  | 'advanced'
  | 'rejected'
  | 'on_hold'
  | 'shortlisted'
  | 'hired'
  | 'declined';

export type SkillVerificationStatus = 'VERIFIED' | 'PARTIALLY VERIFIED' | 'UNVERIFIED';

export interface SkillEvidence {
  claim: string;
  category: string;
  status: SkillVerificationStatus;
  confidence: number;
  resumeEvidence: string;
  interviewEvidence: string;
  assessmentEvidence: string;
  explanation: string;
}

export interface InterviewTranscriptTurn {
  role: 'ai' | 'candidate';
  text: string;
  questionIndex?: number;
  score?: number;
  feedback?: string;
}

// Maps to interview_sessions, joined onto its parent application
export interface ApplicationInterview {
  id: string;
  status: 'in_progress' | 'completed';
  transcript: InterviewTranscriptTurn[];
  questionCount: number;
  maxQuestions: number;
  evaluationScore: number | null;
  evaluationSummary: string | null;
  createdAt: string;
  updatedAt: string;
}

// Maps directly to public.applications, joined with users (candidate identity) and jobs (title)
export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateUserId: string;
  candidateName: string;
  candidateEmail: string;
  resumeFileUrl: string | null;
  resumeRawText: string | null;
  parsedProfile: Record<string, unknown> | null;
  matchScore: number | null;
  scoreRationale: string | null;
  screeningStatus: ScreeningStatus;
  interview: ApplicationInterview | null;
  recruiterNotes?: string;
  decisionStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED';
  createdAt: string;
  updatedAt: string;
}

// UI-facing view of an Application, shaped for candidate-list/detail pages.
// Sourced from `applications` (+ joins), never from the legacy flat `candidates` table.
export interface Candidate {
  id: string; // applications.id
  name: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  experienceYears: number;
  education: string;
  resumeUrl: string;
  appliedJobId: string;
  jobTitle: string;
  appliedDate: string;
  stage: PipelineStage;
  matchScore: number;
  interviewScore: number;
  verificationScore: number;
  overallScore: number;
  skills: string[];
  verifications: SkillEvidence[];
  summary: string;
  recruiterNotes?: string;
  decisionStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED';
  interview: ApplicationInterview | null;
}

export interface Job {
  id: string;
  hrUserId: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: string;
  education: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  status: 'draft' | 'open' | 'closed';
  candidateCount: number;
  createdAt: string;
  extractedKeywords?: string[];
}

// UI-facing view of an interview session for monitoring pages (HR and candidate),
// derived from an Application + its ApplicationInterview — never a standalone collection.
export interface InterviewSessionView {
  id: string; // interview_sessions.id
  applicationId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  status: 'in_progress' | 'completed';
  mode: 'text' | 'voice';
  questionCount: number;
  maxQuestions: number;
  transcript: InterviewTranscriptTurn[];
  evaluationScore: number | null;
  evaluationSummary: string | null;
  createdAt: string;
}

export interface ShortlistEntry {
  rank: number;
  candidate: Candidate;
  explainableReasoning: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'RUNNING' | 'COMPLETED' | 'WAITING' | 'FAILED';
  lastRun: string;
  duration: string;
  processedCount: number;
  nodeCount: number;
  error?: string;
}

export interface EmailCommunication {
  id: string;
  candidateName: string;
  candidateEmail: string;
  emailType: 'Shortlist Notification' | 'Interview Invitation' | 'Follow-up Email' | 'Rejection Email';
  status: 'SENT' | 'PENDING' | 'FAILED';
  sentTime: string;
  subject: string;
  preview: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'candidate' | 'interview' | 'verification' | 'system';
  unread: boolean;
  actionUrl?: string;
}

export interface AnalyticsSummary {
  timeToScreenDays: number | null;
  timeToHireDays: number | null;
  candidatesScreened: number | null;
  interviewCompletionRate: number | null;
  shortlistRate: number | null;
  verificationRate: number | null;
  applicationsOverTime: { date: string; count: number }[];
  candidateScoreDistribution: { range: string; count: number }[];
  pipelineFunnel: { stage: string; count: number }[];
}
