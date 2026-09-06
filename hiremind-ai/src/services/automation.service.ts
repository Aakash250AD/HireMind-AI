import { AutomationWorkflow, EmailCommunication } from '@/types';
import { MOCK_AUTOMATIONS, MOCK_EMAILS } from './mockData';
import { simulateNetworkDelay } from './api';

const automationsDb: AutomationWorkflow[] = [...MOCK_AUTOMATIONS];
const emailsDb: EmailCommunication[] = [...MOCK_EMAILS];

export const automationService = {
  async getAutomations(): Promise<AutomationWorkflow[]> {
    await simulateNetworkDelay(350);
    return [...automationsDb];
  },

  async triggerWorkflow(workflowId: string): Promise<AutomationWorkflow> {
    try {
      // Fire the n8n webhook provided by the user
      await fetch('https://api.agents.snsihub.ai/webhook-test/210ff37c-940e-4796-aa8c-991ac36631cc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'trigger_workflow',
          workflowId: workflowId,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.warn('Webhook delivery failed:', err);
    }

    await simulateNetworkDelay(1200);
    const index = automationsDb.findIndex((a) => a.id === workflowId);
    if (index !== -1) {
      automationsDb[index] = {
        ...automationsDb[index],
        status: 'RUNNING',
        lastRun: 'Just now',
        processedCount: automationsDb[index].processedCount + 1
      };
      // Auto-complete after 3 seconds simulation
      setTimeout(() => {
        automationsDb[index].status = 'COMPLETED';
      }, 3000);
      return automationsDb[index];
    }
    throw new Error('Automation workflow not found');
  },

  async getEmailCommunications(): Promise<EmailCommunication[]> {
    await simulateNetworkDelay(300);
    return [...emailsDb];
  },

  async retryEmail(emailId: string): Promise<EmailCommunication> {
    await simulateNetworkDelay(800);
    const index = emailsDb.findIndex((e) => e.id === emailId);
    if (index !== -1) {
      emailsDb[index] = {
        ...emailsDb[index],
        status: 'SENT',
        sentTime: 'Just now'
      };
      return emailsDb[index];
    }
    throw new Error('Email communication record not found');
  }
};
