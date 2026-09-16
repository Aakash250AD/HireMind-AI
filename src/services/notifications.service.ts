import { NotificationItem } from '@/types';
import { MOCK_NOTIFICATIONS } from './mockData';
import { simulateNetworkDelay, callWebhook } from './api';

const notificationsDb: NotificationItem[] = [...MOCK_NOTIFICATIONS];

export const notificationsService = {
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const response = await callWebhook<NotificationItem[]>({
        action: 'GET_NOTIFICATIONS',
        role: 'admin'
      });
      if (response) { return response; }
    } catch (error) {
      console.warn('Webhook GET_NOTIFICATIONS failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(250);
    return [...notificationsDb];
  },

  async markAsRead(id: string): Promise<void> {
    try {
      const response = await callWebhook<void>({
        action: 'MARK_NOTIFICATION_READ',
        role: 'admin',
        data: { notificationId: id }
      });
      if (response !== undefined) {
        const item = notificationsDb.find((n) => n.id === id);
        if (item) item.unread = false;
        return;
      }
    } catch (error) {
      console.warn('Webhook MARK_NOTIFICATION_READ failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(200);
    const item = notificationsDb.find((n) => n.id === id);
    if (item) item.unread = false;
  },

  async markAllAsRead(): Promise<void> {
    try {
      const response = await callWebhook<void>({
        action: 'MARK_ALL_NOTIFICATIONS_READ',
        role: 'admin'
      });
      if (response !== undefined) {
        notificationsDb.forEach((n) => (n.unread = false));
        return;
      }
    } catch (error) {
      console.warn('Webhook MARK_ALL_NOTIFICATIONS_READ failed, falling back to mock logic', error);
    }

    await simulateNetworkDelay(300);
    notificationsDb.forEach((n) => (n.unread = false));
  }
};
