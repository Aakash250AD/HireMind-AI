export type PipelineStage = 
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Verification'
  | 'Shortlisted'
  | 'Human Review'
  | 'Hired'
  | 'Archived';

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

export interface Candidate {
  id: string;
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
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote';
  experienceYears: string;
  education: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  status: 'ACTIVE' | 'DRAFT' | 'CLOSED';
  candidateCount: number;
  createdAt: string;
  extractedKeywords?: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  targetSkill: string;
  candidateAnswer?: string;
  score?: number;
  aiFeedback?: string;
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  scheduledAt: string;
  durationMinutes: number;
  mode: 'text' | 'voice';
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  technicalScore?: number;
  communicationScore?: number;
  problemSolvingScore?: number;
  roleFitScore?: number;
  overallScore?: number;
  aiSummary?: {
    strengths: string[];
    concerns: string[];
    areasToVerify: string[];
    recommendation: string;
  };
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
  timeToScreenDays: number;
  timeToHireDays: number;
  candidatesScreened: number;
  interviewCompletionRate: number;
  shortlistRate: number;
  verificationRate: number;
  applicationsOverTime: { date: string; count: number }[];
  candidateScoreDistribution: { range: string; count: number }[];
  pipelineFunnel: { stage: string; count: number }[];
}
