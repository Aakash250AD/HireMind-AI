import { Job } from '@/types';
import { callWebhook } from './api';
import { supabase } from '@/lib/supabase';

export const jobsService = {
  async getJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      // Silencing the Supabase API error for local mock flow
      // console.error('Error fetching jobs:', error);
      return [];
    }
    
    // Map snake_case to camelCase
    return data.map(job => ({
      ...job,
      createdAt: job.created_at,
      candidateCount: job.candidate_count || 0
    })) as Job[];
  },

  async getJobById(id: string): Promise<Job | null> {
    return await callWebhook<Job | null>({
      action: 'GET_JOB',
      role: 'admin',
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

  async createJob(newJob: Omit<Job, 'id' | 'createdAt' | 'candidateCount'>): Promise<Job> {
    const { data: { session } } = await supabase.auth.getSession();
    
    const dbJob = {
      title: newJob.title,
      department: newJob.department,
      status: newJob.status || 'ACTIVE',
      description: newJob.description,
      location: newJob.location,
      salaryRange: newJob.salaryRange,
      requiredSkills: newJob.requiredSkills,
      employmentType: newJob.employmentType,
      experienceYears: newJob.experienceYears,
      education: newJob.education,
      created_by: session?.user?.id
    };

    const { data, error } = await supabase
      .from('jobs')
      .insert([dbJob])
      .select()
      .single();

    if (error) throw error;

    // Trigger Webhook
    const webhookUrl = process.env.NEXT_PUBLIC_POST_JOB_WEBHOOK;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'CREATE_JOB', data: newJob, userId: session?.user?.id })
        });
      } catch (err) {
        console.error('Webhook failed, but job was created in Supabase:', err);
      }
    }

    return {
      ...data,
      createdAt: data.created_at,
      candidateCount: data.candidate_count || 0
    } as Job;
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    return await callWebhook<Job>({
      action: 'UPDATE_JOB',
      role: 'admin',
      data: { id, updates }
    });
  },

  async deleteJob(id: string): Promise<void> {
    await callWebhook<void>({
      action: 'DELETE_JOB',
      role: 'admin',
      data: { id }
    });
  }
};
