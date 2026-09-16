'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface UserProfileMenuProps {
  role: 'hr' | 'candidate';
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function UserProfileMenu({ role, isOpen, onToggle, onClose }: UserProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { clearCacheAndLogout } = useTheme();

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

  const menuItems = [
    { icon: User, title: 'My Profile', desc: 'View and edit your profile', href: role === 'hr' ? '/hr/profile' : '/candidate/profile' },
    { icon: Settings, title: 'Settings', desc: 'Manage account preferences', href: role === 'hr' ? '/settings' : '/candidate/settings' },
    { icon: Bell, title: 'Notifications', desc: 'Notification preferences', href: '/notifications' },
    { icon: Shield, title: 'Security', desc: 'Password and security', href: '/settings' },
    { icon: HelpCircle, title: 'Help & Support', desc: 'Get help with HireMind AI', href: '/settings' },
  ];

  const [candidateName, setCandidateName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const detailsStr = localStorage.getItem('candidateDetails');
      if (detailsStr) {
        try {
          const details = JSON.parse(detailsStr);
          if (details.name) setCandidateName(details.name);
        } catch (e) {}
      }
    }
  }, []);

  const displayName = role === 'hr' ? 'HR Administrator' : (candidateName || 'Candidate');

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={onToggle}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-hm-matte flex items-center justify-center text-white text-sm font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
          {role === 'hr' ? 'HR' : (candidateName ? candidateName.charAt(0).toUpperCase() : 'CD')}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-surface border border-border rounded-[20px] shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center gap-3 bg-surface-sunken">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-hm-matte flex items-center justify-center text-white text-lg font-bold">
              {role === 'hr' ? 'HR' : (candidateName ? candidateName.charAt(0).toUpperCase() : 'CD')}
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">
                {displayName}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs font-medium text-ink-faint">Active</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2 flex flex-col gap-1">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-surface-sunken transition-colors group"
                >
                  <Icon className="w-5 h-5 text-ink-faint group-hover:text-primary transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-ink">{item.title}</span>
                    <span className="text-[11px] text-ink-faint">{item.desc}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-border p-2">
            <button 
              onClick={() => {
                onClose();
                clearCacheAndLogout();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-danger-tint text-danger transition-colors group"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs font-bold">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
