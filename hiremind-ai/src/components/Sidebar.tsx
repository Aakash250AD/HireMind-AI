'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Video, 
  Award, 
  BarChart3, 
  Bot, 
  Zap, 
  Settings, 
  Bell,
  PlusCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Interviews', href: '/interviews', icon: Video },
    { name: 'Shortlist', href: '/shortlist', icon: Award },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'AI Copilot', href: '/copilot', icon: Bot, badge: 'AI' },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Profile', href: '/hr/profile', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col justify-between h-screen sticky top-0 z-30 shrink-0 select-none">
      <div>
        {/* Logo Section */}
        <div className="p-5 border-b border-border">
          <Link href="/dashboard">
            <Logo size="md" />
          </Link>
        </div>

        {/* Quick CTA */}
        <div className="px-4 pt-4">
          <Link
            href="/jobs/create"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary hover:bg-dark-blue text-white text-sm font-semibold rounded-[var(--radius-sm)] shadow border border-border transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Job with AI</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-[var(--radius-sm)] transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md border border-border'
                    : 'text-text-secondary hover:bg-page-bg hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-text-secondary'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-900 text-primary border border-border">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Recruiter Workspace Profile Card */}
      <div className="p-4 border-t border-border bg-page-bg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-text-primary text-sm border border-border">
            SJ
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-text-primary truncate">Sarah Jenkins</span>
            <span className="text-xs text-text-secondary truncate">Lead Recruiter</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
