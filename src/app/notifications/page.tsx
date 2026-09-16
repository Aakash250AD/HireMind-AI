'use client';

import React, { useEffect, useState } from 'react';
import { notificationsService } from '@/services/notifications.service';
import { NotificationItem } from '@/types';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    async function loadNotifs() {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
    }
    loadNotifs();
  }, []);

  const handleMarkAllRead = async () => {
    await notificationsService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <DashboardLayout role="hr">
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

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`bg-surface border p-4 rounded-[var(--radius-md)] shadow transition-all flex items-start justify-between gap-4 ${
                n.unread ? 'border-border' : 'border-border'
              }`}
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
                  className="px-3 py-1.5 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-[var(--radius-sm)] border border-border shrink-0 flex items-center gap-1"
                >
                  <span>Action</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
