'use client';

import React, { useRef, useEffect } from 'react';
import { Bell, Briefcase, FileText, Calendar } from 'lucide-react';

interface NotificationMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function NotificationMenu({ isOpen, onToggle, onClose }: NotificationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const unreadCount = 3;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const notifications = [
    { id: 1, type: 'application', title: 'New candidate application', desc: 'Arun Kumar applied for Senior AI Engineer', time: '10 mins ago', icon: Briefcase, color: 'text-primary' },
    { id: 2, type: 'status', title: 'Application update', desc: 'Your application moved to Technical Review', time: '1 hour ago', icon: FileText, color: 'text-warning' },
    { id: 3, type: 'interview', title: 'Interview reminder', desc: 'Interview scheduled for tomorrow at 10:00 AM', time: '2 hours ago', icon: Calendar, color: 'text-success' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={onToggle}
        className="relative p-2 text-ink-faint hover:text-ink hover:bg-white rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-hm-burgundy rounded-full border border-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-surface border border-border rounded-[20px] shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          
          <div className="p-4 border-b border-border flex items-center justify-between bg-surface-sunken">
            <h4 className="text-sm font-bold text-ink">Notifications</h4>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold text-primary bg-primary-tint px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>

          <div className="flex flex-col max-h-[320px] overflow-y-auto custom-scrollbar">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <button 
                  key={n.id}
                  onClick={onClose}
                  className="w-full text-left flex gap-3 p-4 border-b border-border hover:bg-surface-sunken transition-colors group last:border-b-0"
                >
                  <div className={`mt-0.5 shrink-0 ${n.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-ink">{n.title}</span>
                    <span className="text-[11px] text-ink-soft leading-tight mt-0.5">{n.desc}</span>
                    <span className="text-[10px] text-ink-faint mt-1.5">{n.time}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2 border-t border-border bg-surface-sunken text-center">
            <button 
              onClick={onClose}
              className="text-[11px] font-bold text-primary hover:text-primary-hover"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
