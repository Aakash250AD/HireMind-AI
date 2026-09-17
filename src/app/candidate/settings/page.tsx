'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useTheme } from '@/components/ThemeProvider';
import { supabase } from '@/lib/supabase';
import { Sun, Moon, LogOut, Trash2, CheckCircle2, RefreshCw, Mail } from 'lucide-react';

export default function CandidateSettingsPage() {
  const { theme, toggleTheme, clearCacheAndLogout } = useTheme();
  const [cleared, setCleared] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
  }, []);

  const handleClearCacheOnly = () => {
    localStorage.clear();
    sessionStorage.clear();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <DashboardLayout role="candidate">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg">
          <h1 className="text-lg font-bold text-text-primary mb-1">Account Settings</h1>
          <p className="text-xs text-text-secondary">
            Manage your interface theme, session, and account.
          </p>
        </div>

        {/* Account */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-3">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <span>Account</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Signed in as <span className="font-semibold text-text-primary">{email ?? 'unknown'}</span>
          </p>
        </div>

        {/* Theme Settings Card */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-4">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
            <span>Appearance Theme</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Toggle between Dark Mode and Light Mode.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={toggleTheme}
              className={`px-5 py-2.5 rounded-[var(--radius-md)] text-xs font-bold border transition-all flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-primary text-white border-border shadow'
                  : 'bg-zinc-200 text-zinc-800 border-zinc-300'
              }`}
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Current Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>

        {/* Clear Cache & Logout Settings Card */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-4">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2 text-primary">
            <Trash2 className="w-5 h-5" />
            <span>Cache Reset & Session</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Clear cached application state and local storage on this device.
          </p>

          {cleared && (
            <div className="p-3 bg-success-tint border border-success text-success text-xs font-semibold rounded-[var(--radius-sm)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Local browser cache successfully cleared!
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleClearCacheOnly}
              className="px-4 py-2.5 bg-page-bg hover:bg-surface-sunken text-text-secondary text-xs font-bold rounded-[var(--radius-md)] border border-border transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Clear Local Cache</span>
            </button>

            <button
              onClick={clearCacheAndLogout}
              className="px-5 py-2.5 bg-danger-tint hover:bg-danger hover:text-white text-danger text-xs font-bold rounded-[var(--radius-md)] border border-danger transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Clear Cache & Logout</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
