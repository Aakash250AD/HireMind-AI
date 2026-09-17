import { callWebhook } from './api';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; actionUrl: string }[];
}

export const SUGGESTED_COPILOT_PROMPTS = [
  'Show me the top 5 candidates across all jobs.',
  'Which candidates have verified Python & PyTorch skills?',
  'Compare the top 3 candidates for a given role.',
  'Which candidates need another interview or evidence verification?',
  'Show candidates with an overall score above 85%.'
];

export const copilotService = {
  async askCopilot(userPrompt: string): Promise<CopilotMessage> {
    return await callWebhook<CopilotMessage>({
      action: 'ASK_COPILOT',
      role: 'hr',
      data: { prompt: userPrompt }
    });
  }
};
