import { AutomationWorkflow, EmailCommunication } from '@/types';
import { supabase } from '@/lib/supabase';
import { callWebhook } from './api';

interface AutomationRow {
  id: string;
  name: string;
  description: string | null;
  status: AutomationWorkflow['status'];
  last_run: string | null;
  duration: string | null;
  processed_count: number | null;
  node_count: number | null;
  error: string | null;
}

function mapAutomationRow(row: AutomationRow): AutomationWorkflow {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    status: row.status,
    lastRun: row.last_run ?? '',
    duration: row.duration ?? '',
    processedCount: row.processed_count ?? 0,
    nodeCount: row.node_count ?? 0,
    error: row.error ?? undefined
  };
}

interface EmailRow {
  id: string;
  candidate_name: string | null;
  candidate_email: string;
  email_type: EmailCommunication['emailType'];
  status: EmailCommunication['status'];
  sent_time: string | null;
  subject: string | null;
  preview: string | null;
}

function mapEmailRow(row: EmailRow): EmailCommunication {
  return {
    id: row.id,
    candidateName: row.candidate_name ?? '',
    candidateEmail: row.candidate_email,
    emailType: row.email_type,
    status: row.status,
    sentTime: row.sent_time ?? '',
    subject: row.subject ?? '',
    preview: row.preview ?? ''
  };
}

export const automationService = {
  async getAutomations(): Promise<AutomationWorkflow[]> {
    const { data, error } = await supabase
      .from('automation_runs')
      .select('*')
      .order('last_run', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(mapAutomationRow);
  },

  async triggerWorkflow(workflowId: string): Promise<AutomationWorkflow> {
    const result = await callWebhook<AutomationWorkflow>({
      action: 'TRIGGER_WORKFLOW',
      role: 'hr',
      data: { workflowId }
    });
    return result;
  },

  async getEmailCommunications(): Promise<EmailCommunication[]> {
    const { data, error } = await supabase
      .from('email_communications')
      .select('*')
      .order('sent_time', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(mapEmailRow);
  },

  async retryEmail(emailId: string): Promise<EmailCommunication> {
    return await callWebhook<EmailCommunication>({
      action: 'RETRY_EMAIL',
      role: 'hr',
      data: { emailId }
    });
  }
};
