import { simulateNetworkDelay, callWebhook } from './api';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  company: string;
  token: string;
}

const MOCK_USER: UserSession = {
  id: 'user-recruiter-1',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@techcorp.io',
  company: 'TechCorp Autonomous AI',
  token: 'hiremind_mock_jwt_token_872346'
};

export const authService = {
  async login(email: string, password: string): Promise<UserSession> {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    try {
      const response = await callWebhook<UserSession>({
        action: 'LOGIN',
        role: 'admin',
        data: { email, password }
      });
      if (response) {
        return response;
      }
    } catch (error) {
      console.warn('Webhook LOGIN failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(800);
    return { ...MOCK_USER, email };
  },

  async register(name: string, company: string, email: string, password: string): Promise<UserSession> {
    try {
      const response = await callWebhook<UserSession>({
        action: 'REGISTER',
        role: 'admin',
        data: { name, company, email, password }
      });
      if (response) {
        return response;
      }
    } catch (error) {
      console.warn('Webhook REGISTER failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(1000);
    return {
      id: `user-${Date.now()}`,
      name,
      company,
      email,
      token: `hiremind_token_${Date.now()}`
    };
  },

  async getCurrentUser(): Promise<UserSession | null> {
    try {
      const response = await callWebhook<UserSession | null>({
        action: 'GET_CURRENT_USER',
        role: 'admin'
      });
      if (response !== undefined) {
        return response || null;
      }
    } catch (error) {
      console.warn('Webhook GET_CURRENT_USER failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(200);
    return MOCK_USER;
  },

  async logout(): Promise<void> {
    try {
      await callWebhook<void>({
        action: 'LOGOUT',
        role: 'admin'
      });
    } catch (error) {
      console.warn('Webhook LOGOUT failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(300);
  }
};
