'use client';

import React, { useEffect, useState } from 'react';
import { notificationsService } from '@/services/notifications.service';
import { NotificationItem } from '@/types';
import { DashboardLayout } from '@/components/DashboardLayout';
import { supabase } from '@/lib/supabase';
import { Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<'hr' | 'candidate'>('hr');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const metaRole = data.session?.user.user_metadata?.role;
      if (metaRole === 'hr' || metaRole === 'candidate') setRole(metaRole);
    });
  }, []);

  useEffect(() => {
    loadNotifs();
  }, []);

  async function loadNotifs() {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    } catch (err) {
      setError((err as Error).message || 'Failed to mark notifications read');
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await notificationsService.markAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    } catch (err) {
      setError((err as Error).message || 'Failed to mark notification read');
    }
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        <div className="bg-surface border border-border p-5 rounded-[var(--radius-lg)] shadow-lg flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-text-primary">System Alerts & Pipeline Notifications</h1>
            <p className="text-xs text-text-secondary mt-0.5">Real-time alerts triggered by autonomous screening nodes.</p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="px-3.5 py-2 bg-page-bg hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-[var(--radius-sm)] border border-border"
          >
            Mark All as Read
          </button>
        </div>

        {error && (
          <div className="bg-danger-tint border border-danger text-danger p-4 rounded-[var(--radius-md)] flex items-center justify-between text-sm">
            <span>{error}</span>
            <button onClick={loadNotifs} className="font-bold underline">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-text-secondary text-sm">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center text-text-secondary text-sm border border-dashed border-border rounded-[var(--radius-md)]">
            You&apos;re all caught up — no notifications yet.
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => n.unread && handleMarkRead(n.id)}
                className="bg-surface border border-border p-4 rounded-[var(--radius-md)] shadow transition-all flex items-start justify-between gap-4 cursor-pointer hover:border-primary/40"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-[var(--radius-sm)] bg-page-bg border border-border text-primary">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-text-primary">{n.title}</h3>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{n.message}</p>
                    <span className="text-[10px] text-text-muted block mt-1">{n.timestamp}</span>
                  </div>
                </div>

                {n.actionUrl && (
                  <Link
                    href={n.actionUrl}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1.5 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] border border-border shrink-0 flex items-center gap-1"
                  >
                    <span>Action</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
