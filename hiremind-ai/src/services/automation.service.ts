import { AutomationWorkflow, EmailCommunication } from '@/types';
import { MOCK_AUTOMATIONS, MOCK_EMAILS } from './mockData';
import { simulateNetworkDelay, callWebhook } from './api';

const automationsDb: AutomationWorkflow[] = [...MOCK_AUTOMATIONS];
const emailsDb: EmailCommunication[] = [...MOCK_EMAILS];

export const automationService = {
  async getAutomations(): Promise<AutomationWorkflow[]> {
    try {
      const response = await callWebhook<AutomationWorkflow[]>({
        action: 'GET_AUTOMATIONS',
        role: 'admin'
      });
      if (response) { return response; }
    } catch (error) {
      console.warn('Webhook GET_AUTOMATIONS failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(350);
    return [...automationsDb];
  },

  async triggerWorkflow(workflowId: string): Promise<AutomationWorkflow> {
    try {
      const response = await callWebhook<AutomationWorkflow>({
        action: 'TRIGGER_WORKFLOW',
        role: 'admin',
        data: { workflowId }
      });
      if (response) {
        const index = automationsDb.findIndex((a) => a.id === workflowId);
        if (index !== -1) automationsDb[index] = response;
        return response;
      }
    } catch (err) {
      console.warn('Webhook TRIGGER_WORKFLOW failed, falling back to mock logic:', err);
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
    try {
      const response = await callWebhook<EmailCommunication[]>({
        action: 'GET_EMAILS',
        role: 'admin'
      });
      if (response) { return response; }
    } catch (error) {
      console.warn('Webhook GET_EMAILS failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(300);
    return [...emailsDb];
  },

  async retryEmail(emailId: string): Promise<EmailCommunication> {
    try {
      const response = await callWebhook<EmailCommunication>({
        action: 'RETRY_EMAIL',
        role: 'admin',
        data: { emailId }
      });
      if (response) {
        const index = emailsDb.findIndex((e) => e.id === emailId);
        if (index !== -1) emailsDb[index] = response;
        return response;
      }
    } catch (error) {
      console.warn('Webhook RETRY_EMAIL failed, falling back to mock logic', error);
    }

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
