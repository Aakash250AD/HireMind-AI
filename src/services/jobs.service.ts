import { Job } from '@/types';
import { callWebhook } from './api';
import { supabase } from '@/lib/supabase';

interface JobRow {
  id: string;
  hr_user_id: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: Job['employmentType'];
  experience_level: string | null;
  education: string | null;
  salary_range: string | null;
  description: string | null;
  required_skills: string[] | null;
  preferred_skills: string[] | null;
  responsibilities: string[] | null;
  status: Job['status'];
  created_at: string;
  extracted_keywords?: string[];
}

function mapJobRow(row: JobRow, candidateCount: number): Job {
  return {
    id: row.id,
    hrUserId: row.hr_user_id,
    title: row.title,
    department: row.department ?? '',
    location: row.location ?? '',
    employmentType: row.employment_type,
    experienceLevel: row.experience_level ?? '',
    education: row.education ?? '',
    salaryRange: row.salary_range ?? '',
    description: row.description ?? '',
    requiredSkills: row.required_skills ?? [],
    preferredSkills: row.preferred_skills ?? [],
    responsibilities: row.responsibilities ?? [],
    status: row.status,
    candidateCount,
    createdAt: row.created_at,
    extractedKeywords: row.extracted_keywords
  };
}

export const jobsService = {
  async getJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return [];

    const { data: counts, error: countsError } = await supabase
      .from('applications')
      .select('job_id');

    if (countsError) throw countsError;

    const countByJob = new Map<string, number>();
    for (const row of counts ?? []) {
      countByJob.set(row.job_id, (countByJob.get(row.job_id) ?? 0) + 1);
    }

    return data.map((job) => mapJobRow(job, countByJob.get(job.id) ?? 0));
  },

  async getJobById(id: string): Promise<Job | null> {
    return await callWebhook<Job | null>({
      action: 'GET_JOB',
      role: 'hr',
      data: { jobId: id }
    });
  },

 async analyzeJobDescription(rawDescription: string, titleHint?: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_JOB_AI;

  if (!webhookUrl) {
    throw new Error('Job AI webhook URL is not configured.');
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw_job_description: rawDescription,
      title_hint: titleHint,
    }),
  });

  if (!response.ok) {
    throw new Error(`Job AI extraction failed: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Job AI extraction failed.');
  }

  return result.data?.extraction ?? result.data;
},

  async createJob(newJob: Omit<Job, 'id' | 'hrUserId' | 'createdAt' | 'candidateCount'>): Promise<Job> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You must be signed in to create a job.');

    const dbJob = {
      hr_user_id: session.user.id,
      title: newJob.title,
      department: newJob.department,
      status: newJob.status || 'open',
      description: newJob.description,
      location: newJob.location,
      salary_range: newJob.salaryRange,
      required_skills: newJob.requiredSkills,
      employment_type: newJob.employmentType,
      experience_level: newJob.experienceLevel,
      education: newJob.education
    };

    const { data, error } = await supabase
      .from('jobs')
      .insert([dbJob])
      .select()
      .single();

    if (error) throw error;

    // Trigger Webhook (fire-and-forget notification to backend; job already persisted in Supabase)
    const webhookUrl = process.env.NEXT_PUBLIC_POST_JOB_WEBHOOK;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'CREATE_JOB', data: newJob, userId: session.user.id })
        });
      } catch (err) {
        console.error('Webhook failed, but job was created in Supabase:', err);
      }
    }

    return mapJobRow(data, 0);
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    return await callWebhook<Job>({
      action: 'UPDATE_JOB',
      role: 'hr',
      data: { id, updates }
    });
  },

  async deleteJob(id: string): Promise<void> {
    await callWebhook<void>({
      action: 'DELETE_JOB',
      role: 'hr',
      data: { id }
    });
  }
};
