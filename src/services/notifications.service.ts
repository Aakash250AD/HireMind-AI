import { NotificationItem } from '@/types';
import { supabase } from '@/lib/supabase';

interface NotificationRow {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationItem['type'];
  unread: boolean;
  action_url: string | null;
}

function mapNotificationRow(row: NotificationRow): NotificationItem {
  return {
    id: row.id,
    title: row.title,
    message: row.message,
    timestamp: row.timestamp,
    type: row.type,
    unread: row.unread,
    actionUrl: row.action_url ?? undefined
  };
}

export const notificationsService = {
  async getNotifications(): Promise<NotificationItem[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return (data ?? []).map(mapNotificationRow);
  },

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase.from('notifications').update({ unread: false }).eq('id', id);
    if (error) throw error;
  },

  async markAllAsRead(): Promise<void> {
    const { error } = await supabase.from('notifications').update({ unread: false }).eq('unread', true);
    if (error) throw error;
  }
};
