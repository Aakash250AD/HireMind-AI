import { NotificationItem } from '@/types';
import { MOCK_NOTIFICATIONS } from './mockData';
import { simulateNetworkDelay } from './api';

const notificationsDb: NotificationItem[] = [...MOCK_NOTIFICATIONS];

export const notificationsService = {
  async getNotifications(): Promise<NotificationItem[]> {
    await simulateNetworkDelay(250);
    return [...notificationsDb];
  },

  async markAsRead(id: string): Promise<void> {
    await simulateNetworkDelay(200);
    const item = notificationsDb.find((n) => n.id === id);
    if (item) item.unread = false;
  },

  async markAllAsRead(): Promise<void> {
    await simulateNetworkDelay(300);
    notificationsDb.forEach((n) => (n.unread = false));
  }
};
