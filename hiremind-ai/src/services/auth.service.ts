import { simulateNetworkDelay } from './api';

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
    await simulateNetworkDelay(800);
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    return { ...MOCK_USER, email };
  },

  async register(name: string, company: string, email: string, password: string): Promise<UserSession> {
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
    await simulateNetworkDelay(200);
    return MOCK_USER;
  },

  async logout(): Promise<void> {
    await simulateNetworkDelay(300);
  }
};
