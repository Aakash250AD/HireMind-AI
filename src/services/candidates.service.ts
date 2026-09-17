import { Application, Candidate, InterviewSessionView, PipelineStage, ScreeningStatus } from '@/types';
import { callWebhook } from './api';
import { supabase } from '@/lib/supabase';

const STATUS_TO_STAGE: Record<ScreeningStatus, PipelineStage> = {
  submitted: 'Applied',
  parsing: 'Screening',
  parsed: 'Screening',
  scored: 'Screening',
  advanced: 'Interview',
  on_hold: 'Human Review',
  shortlisted: 'Shortlisted',
  rejected: 'Archived',
  declined: 'Archived',
  hired: 'Hired'
};

interface InterviewSessionRow {
  id: string;
  status: 'in_progress' | 'completed';
  transcript: InterviewSessionView['transcript'] | null;
  question_count: number | null;
  max_questions: number | null;
  evaluation_score: number | string | null;
  evaluation_summary: string | null;
  created_at: string;
  updated_at: string;
}

interface ApplicationRow {
  id: string;
  job_id: string;
  candidate_user_id: string;
  resume_file_url: string | null;
  resume_raw_text: string | null;
  parsed_profile: Record<string, unknown> | null;
  match_score: number | string | null;
  score_rationale: string | null;
  screening_status: ScreeningStatus;
  created_at: string;
  updated_at: string;
  users?: { full_name: string | null; email: string | null } | null;
  jobs?: { title: string | null } | null;
  interview_sessions?: InterviewSessionRow[] | InterviewSessionRow | null;
}

function mapApplicationRow(row: ApplicationRow): Application {
  const candidate = row.users ?? { full_name: null, email: null };
  const job = row.jobs ?? { title: null };
  const session = Array.isArray(row.interview_sessions) ? row.interview_sessions[0] : row.interview_sessions;

  return {
    id: row.id,
    jobId: row.job_id,
    jobTitle: job.title ?? '',
    candidateUserId: row.candidate_user_id,
    candidateName: candidate.full_name ?? 'Unknown Candidate',
    candidateEmail: candidate.email ?? '',
    resumeFileUrl: row.resume_file_url,
    resumeRawText: row.resume_raw_text,
    parsedProfile: row.parsed_profile,
    matchScore: row.match_score !== null && row.match_score !== undefined ? Number(row.match_score) : null,
    scoreRationale: row.score_rationale,
    screeningStatus: row.screening_status,
    interview: session
      ? {
          id: session.id,
          status: session.status,
          transcript: session.transcript ?? [],
          questionCount: session.question_count ?? 0,
          maxQuestions: session.max_questions ?? 0,
          evaluationScore: session.evaluation_score !== null && session.evaluation_score !== undefined ? Number(session.evaluation_score) : null,
          evaluationSummary: session.evaluation_summary ?? null,
          createdAt: session.created_at,
          updatedAt: session.updated_at
        }
      : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

interface ParsedProfileFields {
  phone?: string;
  location?: string;
  currentRole?: string;
  experienceYears?: number;
  education?: string;
  verificationScore?: number;
  skills?: string[];
  verifications?: Candidate['verifications'];
}

function applicationToCandidate(app: Application): Candidate {
  const parsed = (app.parsedProfile ?? {}) as ParsedProfileFields;
  return {
    id: app.id,
    name: app.candidateName,
    email: app.candidateEmail,
    phone: parsed.phone ?? '',
    location: parsed.location ?? '',
    currentRole: parsed.currentRole ?? '',
    experienceYears: parsed.experienceYears ?? 0,
    education: parsed.education ?? '',
    resumeUrl: app.resumeFileUrl ?? '',
    appliedJobId: app.jobId,
    jobTitle: app.jobTitle,
    appliedDate: app.createdAt,
    stage: STATUS_TO_STAGE[app.screeningStatus] ?? 'Applied',
    matchScore: app.matchScore ?? 0,
    interviewScore: app.interview?.evaluationScore ?? 0,
    verificationScore: parsed.verificationScore ?? 0,
    overallScore: app.matchScore != null && app.interview?.evaluationScore != null
      ? Math.round((app.matchScore + app.interview.evaluationScore) / 2)
      : (app.matchScore ?? 0),
    skills: parsed.skills ?? [],
    verifications: parsed.verifications ?? [],
    summary: app.scoreRationale ?? '',
    recruiterNotes: app.recruiterNotes,
    decisionStatus: app.decisionStatus,
    interview: app.interview
  };
}

function applicationToInterviewView(app: Application): InterviewSessionView | null {
  if (!app.interview) return null;
  return {
    id: app.interview.id,
    applicationId: app.id,
    candidateName: app.candidateName,
    jobId: app.jobId,
    jobTitle: app.jobTitle,
    status: app.interview.status,
    mode: 'text',
    questionCount: app.interview.questionCount,
    maxQuestions: app.interview.maxQuestions,
    transcript: app.interview.transcript,
    evaluationScore: app.interview.evaluationScore,
    evaluationSummary: app.interview.evaluationSummary,
    createdAt: app.interview.createdAt
  };
}

const APPLICATION_SELECT = `*, users:candidate_user_id (full_name, email), jobs:job_id (title), interview_sessions (*)`;

export const candidatesService = {
  async getCandidates(jobId?: string, stage?: PipelineStage): Promise<Candidate[]> {
    let query = supabase.from('applications').select(APPLICATION_SELECT).order('created_at', { ascending: false });
    if (jobId) query = query.eq('job_id', jobId);

    const { data, error } = await query;
    if (error) throw error;

    let applications = (data ?? []).map(mapApplicationRow);
    if (stage) {
      applications = applications.filter((a) => (STATUS_TO_STAGE[a.screeningStatus] ?? 'Applied') === stage);
    }
    return applications.map(applicationToCandidate);
  },

  async getCandidateById(id: string): Promise<Candidate | null> {
    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return applicationToCandidate(mapApplicationRow(data));
  },

  async getInterviewSessions(): Promise<InterviewSessionView[]> {
    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .not('interview_sessions', 'is', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? [])
      .map(mapApplicationRow)
      .map(applicationToInterviewView)
      .filter((s): s is InterviewSessionView => s !== null);
  },

  async getMyInterviewSessions(): Promise<InterviewSessionView[]> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You must be signed in to view your interviews.');

    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .eq('candidate_user_id', session.user.id)
      .not('interview_sessions', 'is', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data ?? [])
      .map(mapApplicationRow)
      .map(applicationToInterviewView)
      .filter((s): s is InterviewSessionView => s !== null);
  },

  async getInterviewSessionById(applicationId: string): Promise<InterviewSessionView | null> {
    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .eq('id', applicationId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return applicationToInterviewView(mapApplicationRow(data));
  },

  async submitRecruiterDecision(
    applicationId: string,
    decisionStatus: 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED',
    notes?: string
  ): Promise<Candidate> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You must be signed in to submit a decision.');

    return await callWebhook<Candidate>({
      action: 'SUBMIT_DECISION',
      role: 'hr',
      userId: session.user.id,
      data: { applicationId, decisionStatus, notes }
    });
  },

  async uploadAndScreenResume(fileName: string, fileBase64: string, mimeType: string, jobId: string): Promise<Candidate> {
    const webhookUrl = process.env.NEXT_PUBLIC_APPLY_JOB_WEBHOOK;
    if (!webhookUrl) {
      throw new Error('Apply Job webhook not configured.');
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You must be signed in to apply for a job.');

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'APPLY_JOB',
        role: 'candidate',
        email: session.user.email,
        userId: session.user.id,
        data: { fileName, fileBase64, mimeType, jobId }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to apply for job.');
    }

    return await response.json();
  },

  async getCandidateApplications(): Promise<{ currentStep: number; applications: { jobId: string; jobTitle: string; status: PipelineStage; dateApplied: string }[] }> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You must be signed in to view your applications.');

    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .eq('candidate_user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const applications = (data ?? []).map(mapApplicationRow);
    if (applications.length === 0) {
      return { currentStep: 1, applications: [] };
    }

    const activeApp = applications[0];
    const stage = STATUS_TO_STAGE[activeApp.screeningStatus] ?? 'Applied';
    const STEP_BY_STAGE: Record<PipelineStage, number> = {
      Applied: 1,
      Screening: 2,
      Interview: 3,
      Shortlisted: 4,
      'Human Review': 4,
      Hired: 5,
      Archived: 5
    };

    return {
      currentStep: STEP_BY_STAGE[stage],
      applications: applications.map((a) => ({
        jobId: a.jobId,
        jobTitle: a.jobTitle,
        status: STATUS_TO_STAGE[a.screeningStatus] ?? 'Applied',
        dateApplied: a.createdAt
      }))
    };
  }
};
