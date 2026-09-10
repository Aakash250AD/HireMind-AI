import { simulateNetworkDelay, callWebhook } from './api';

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; actionUrl: string }[];
}

export const SUGGESTED_COPILOT_PROMPTS = [
  'Show me the top 5 candidates across all jobs.',
  'Why was Arun Kumar shortlisted for Senior AI Engineer?',
  'Which candidates have verified Python & PyTorch skills?',
  'Compare the top 3 candidates for Full Stack Architect.',
  'Which candidates need another interview or evidence verification?',
  'Show candidates with an overall score above 85%.'
];

export const copilotService = {
  async askCopilot(userPrompt: string): Promise<CopilotMessage> {
    try {
      const response = await callWebhook<CopilotMessage>({
        action: 'ASK_COPILOT',
        role: 'admin',
        data: { prompt: userPrompt }
      });
      if (response) { return response; }
    } catch (error) {
      console.warn('Webhook ASK_COPILOT failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(1200);

    const promptLower = userPrompt.toLowerCase();
    let responseText = '';
    let suggestedActions: { label: string; actionUrl: string }[] | undefined;

    if (promptLower.includes('arun') || promptLower.includes('shortlisted')) {
      responseText = `**AI Copilot Analysis:**\n\n**Arun Kumar** is ranked **#1** for the *Senior AI / Machine Learning Engineer* role with an **Overall Score of 93%**.\n\nKey reasons for shortlisting:\n- **94% Resume Match Score**: Direct alignment with LLM agent architecture and PyTorch requirements.\n- **95% Skill Verification Confidence**: Verified evidence across Python, PyTorch, and Vector DBs.\n- **91% AI Interview Score**: Exceptional clarity when discussing QLoRA quantization and Pydantic function calling fallbacks.\n\n*Note: Final hiring decision remains with the recruiter.*`;
      suggestedActions = [
        { label: 'View Candidate Profile', actionUrl: '/candidates/cand-1' },
        { label: 'Review Evidence Breakdown', actionUrl: '/candidates/cand-1#verification' }
      ];
    } else if (promptLower.includes('verified python') || promptLower.includes('skills')) {
      responseText = `**Verified Python Candidates:**\n\n1. **Arun Kumar** (95% Confidence) — Senior AI Engineer — *VERIFIED*\n2. **Priya Sharma** (93% Confidence) — Full Stack Architect — *VERIFIED*\n3. **Karthik S** (90% Confidence) — Lead Data Engineer — *VERIFIED*\n4. **Marcus Vance** (45% Confidence) — AI Researcher — *UNVERIFIED (Requires technical review)*\n\nAll verified candidates have demonstrated evidence across live technical interview answers or repository code benchmarks.`;
      suggestedActions = [
        { label: 'Open Shortlist View', actionUrl: '/shortlist' }
      ];
    } else if (promptLower.includes('compare') || promptLower.includes('top 3')) {
      responseText = `**Top 3 Candidates Comparison:**\n\n| Candidate | Job Role | Match | Interview | Verification | Overall |\n|---|---|---|---|---|---|\n| **Arun Kumar** | Senior AI Engineer | 94% | 91% | 95% | **93%** |\n| **Priya Sharma** | Full Stack Architect | 92% | 89% | 93% | **91%** |\n| **Elena Rostova** | Senior DevOps Engineer | 90% | 88% | 92% | **90%** |\n\nRecommendation: All three candidates are **Recommended for Recruiter Final Review**.`;
      suggestedActions = [
        { label: 'Open Candidates Table', actionUrl: '/candidates' }
      ];
    } else {
      responseText = `**AI Recommendation for "${userPrompt}":**\n\nBased on current recruitment telemetry:\n- **12 Active Jobs** are being monitored by autonomous screening agents.\n- **348 Total Candidates** processed with an average verification confidence of **88%**.\n- **3 Candidates** currently require final recruiter decision review in the Shortlist center.\n\nWould you like me to highlight candidate evidence gaps or generate email templates for interview scheduling?`;
      suggestedActions = [
        { label: 'View Shortlist Panel', actionUrl: '/shortlist' },
        { label: 'Check Automations Status', actionUrl: '/automations' }
      ];
    }

    return {
      id: `copilot-msg-${Date.now()}`,
      sender: 'assistant',
      content: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions
    };
  }
};
