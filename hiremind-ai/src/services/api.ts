// Base API Configuration & Helper for Low-Code Automation Webhook Integration

const getWebhookUrl = () => {
  const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
  return isDev 
    ? process.env.NEXT_PUBLIC_AUTOMATION_TEST_WEBHOOK_URL 
    : process.env.NEXT_PUBLIC_AUTOMATION_WEBHOOK_URL;
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
  const url = getWebhookUrl();
  
  if (!url) {
    console.warn(`[Webhook API] No webhook URL configured. Falling back to local mock data for action: ${payload.action}`);
    throw new Error('WEBHOOK_NOT_CONFIGURED');
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
    
    // Throw error so individual services can catch it and return fallback data
    throw err;
  }
}
