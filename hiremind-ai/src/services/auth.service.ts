import { callWebhook } from './api';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  company: string;
  token: string;
}

export const authService = {
  async login(email: string, password: string, role: 'admin' | 'candidate' = 'admin'): Promise<UserSession> {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    return await callWebhook<UserSession>({
      action: 'LOGIN',
      role,
      data: { email, password }
    });
  },

  async register(name: string, company: string, email: string, password: string, role: 'admin' | 'candidate' = 'admin'): Promise<UserSession> {
    return await callWebhook<UserSession>({
      action: 'REGISTER',
      role,
      data: { name, company, email, password }
    });
  },

  async getCurrentUser(role: 'admin' | 'candidate' = 'admin'): Promise<UserSession | null> {
    return await callWebhook<UserSession | null>({
      action: 'GET_CURRENT_USER',
      role
    });
  },

  async logout(role: 'admin' | 'candidate' = 'admin'): Promise<void> {
    await callWebhook<void>({
      action: 'LOGOUT',
      role
    });
  },

  async googleLogin(email: string, name: string, googleId: string, role: 'admin' | 'candidate' = 'admin'): Promise<{ passwordSet: boolean; session: UserSession }> {
    return await callWebhook<{ passwordSet: boolean; session: UserSession }>({
      action: 'GOOGLE_LOGIN',
      role,
      data: { email, name, googleId }
    });
  },

  async setPassword(email: string, password: string, role: 'admin' | 'candidate' = 'admin'): Promise<UserSession> {
    return await callWebhook<UserSession>({
      action: 'SET_PASSWORD',
      role,
      data: { email, password }
    });
  }
};
