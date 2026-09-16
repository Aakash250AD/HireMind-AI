// Base API Configuration & Helper for Low-Code Automation Webhook Integration

const DOMAIN_WEBHOOKS: Record<string, string | undefined> = {
  auth: process.env.NEXT_PUBLIC_WEBHOOK_AUTH,
  jobs: process.env.NEXT_PUBLIC_WEBHOOK_JOBS,
  candidates: process.env.NEXT_PUBLIC_WEBHOOK_CANDIDATES,
  interviews: process.env.NEXT_PUBLIC_WEBHOOK_INTERVIEWS,
  evaluation: process.env.NEXT_PUBLIC_WEBHOOK_EVALUATION,
  shortlist: process.env.NEXT_PUBLIC_WEBHOOK_SHORTLIST,
  decision: process.env.NEXT_PUBLIC_WEBHOOK_DECISION,
  copilot: process.env.NEXT_PUBLIC_WEBHOOK_COPILOT,
  notifications: process.env.NEXT_PUBLIC_WEBHOOK_NOTIFICATIONS,
  automations: process.env.NEXT_PUBLIC_WEBHOOK_AUTOMATIONS,
  analytics: process.env.NEXT_PUBLIC_WEBHOOK_ANALYTICS,
};

const ACTION_DOMAIN: Record<string, string> = {
  // Auth
  LOGIN: 'auth',
  REGISTER: 'auth',
  GET_CURRENT_USER: 'auth',
  LOGOUT: 'auth',
  
  // Jobs
  CREATE_JOB: 'jobs',
  GET_JOBS: 'jobs',
  GET_JOB: 'jobs',
  UPDATE_JOB: 'jobs',
  DELETE_JOB: 'jobs',
  ANALYZE_JOB_DESCRIPTION: 'jobs',
  
  // Candidates
  APPLY_JOB: 'candidates',
  GET_CANDIDATES: 'candidates',
  GET_CANDIDATE: 'candidates',
  UPDATE_CANDIDATE_STAGE: 'candidates',
  
  // Decision
  SUBMIT_DECISION: 'decision',
  
  // Interviews & Evaluation
  START_INTERVIEW: 'interviews',
  SUBMIT_INTERVIEW_ANSWER: 'interviews',
  
  // Shortlist
  GET_SHORTLIST: 'shortlist',
  GET_SHORTLIST_REASONING: 'shortlist',
  
  // Copilot
  ASK_COPILOT: 'copilot',
  
  // Notifications & Emails
  GET_EMAILS: 'notifications',
  RETRY_EMAIL: 'notifications',
  GET_NOTIFICATIONS: 'notifications',
  MARK_NOTIFICATION_READ: 'notifications',
  MARK_ALL_NOTIFICATIONS_READ: 'notifications',
  
  // Automations
  GET_AUTOMATIONS: 'automations',
  TRIGGER_WORKFLOW: 'automations',
  
  // Analytics
  GET_ANALYTICS_SUMMARY: 'analytics',
};

const getWebhookUrl = (action: string): string | undefined => {
  const domain = ACTION_DOMAIN[action];
  if (!domain) return undefined;
  return DOMAIN_WEBHOOKS[domain];
};

// Simulated latency helper to mimic asynchronous AI execution when running locally
export const simulateNetworkDelay = (ms: number = 600): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export interface WebhookPayload {
  action: string;
  role: 'admin' | 'candidate';
  userId?: string;
  data?: unknown;
}

export interface WebhookResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export async function callWebhook<T>(payload: WebhookPayload): Promise<T> {
  const url = getWebhookUrl(payload.action);
  
  if (!url) {
    console.warn(`[Webhook API] No webhook URL configured for action: ${payload.action} (Domain: ${ACTION_DOMAIN[payload.action] || 'Unknown'})`);
    throw new Error(`WEBHOOK_NOT_CONFIGURED_FOR_${payload.action}`);
  }

  const timeoutMs = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }

    const responseData: WebhookResponse<T> = await response.json();
    
    if (!responseData.success) {
      throw new Error(responseData.error || responseData.message || 'Unknown Webhook Error');
    }

    return responseData.data as T;

  } catch (error: unknown) {
    clearTimeout(timeoutId);
    
    const err = error as Error;
    if (err.name === 'AbortError') {
      console.warn(`[Webhook API] Request timed out after ${timeoutMs}ms for action: ${payload.action}`);
    } else {
      console.warn(`[Webhook API] Call failed for action: ${payload.action}`, err);
    }
    
    throw err;
  }
}
