'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles } from 'lucide-react';

interface NavbarProps {
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title = 'Dashboard' }) => {
  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-text-primary tracking-tight">{title}</h1>
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-page-bg border border-border text-xs text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Low-Code Automation Webhook Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Global Search */}
        <div className="relative hidden sm:block w-64 lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search candidates, jobs, skills..."
            className="w-full pl-9 pr-4 py-1.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-ink placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          />
        </div>

        {/* AI Copilot Quick Button */}
        <Link
          href="/copilot"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-primary/20 border border-border text-xs font-semibold text-white hover:bg-primary/40 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>AI Copilot</span>
        </Link>

        {/* Notification Bell */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-[var(--radius-sm)] bg-page-bg border border-border text-text-secondary hover:text-text-primary hover:border-border-hover hover:shadow-sm transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
        </Link>
      </div>
    </header>
  );
};
