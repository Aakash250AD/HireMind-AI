'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, LogOut, Trash2, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme, clearCacheAndLogout } = useTheme();
  const [apiBaseUrl, setApiBaseUrl] = useState(
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.hiremind.ai/v1'
  );
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearCacheOnly = () => {
    localStorage.clear();
    sessionStorage.clear();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg">
          <h1 className="text-lg font-bold text-text-primary mb-1">Workspace Settings & User Preferences</h1>
          <p className="text-xs text-text-secondary">
            Manage your interface theme, low-code webhook URL, cache memory, and session settings.
          </p>
        </div>

        {/* Theme Settings Card */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-4">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
            <span>Appearance Theme Settings</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Toggle between Dark Mode (Enterprise Premium) and Light Mode.
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
            <span>Cache Reset & Session Security</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Clear all cached application state, stored credentials, and local storage tokens.
          </p>

          {cleared && (
            <div className="p-3 bg-emerald-950/60 border border-border text-emerald-300 text-xs font-semibold rounded-[var(--radius-sm)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Local browser cache successfully cleared!
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleClearCacheOnly}
              className="px-4 py-2.5 bg-page-bg hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-[var(--radius-md)] border border-border transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Clear Local Cache</span>
            </button>

            <button
              onClick={clearCacheAndLogout}
              className="px-5 py-2.5 bg-error-bg hover:bg-rose-900 text-error text-xs font-bold rounded-[var(--radius-md)] border border-border transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Clear Cache & Logout Session</span>
            </button>
          </div>
        </div>

        {/* Low Code Integration Webhook Settings */}
        <div className="bg-surface border border-border p-6 rounded-[var(--radius-lg)] shadow-lg space-y-4">
          <h2 className="text-base font-bold text-text-primary mb-1">Low-Code Webhook Base URL</h2>

          {saved && (
            <div className="p-3 bg-emerald-950/60 border border-border text-emerald-300 text-xs font-semibold rounded-[var(--radius-sm)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                NEXT_PUBLIC_API_BASE_URL
              </label>
              <input
                type="text"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                className="w-full p-2.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
              <p className="text-[10px] text-text-muted mt-1">
                Base URL for low-code automation webhooks (n8n, Make, Zapier, custom FastAPI endpoint).
              </p>
            </div>

            <div className="bg-page-bg border border-border p-4 rounded-[var(--radius-md)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <ShieldAlert className="w-4 h-4" />
                <span>Security Notice — Frontend Architecture</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Frontend code communicates strictly via safe public webhook triggers. No internal LLM API keys, database passwords, or private secrets are hardcoded in React components.
              </p>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-sm)] shadow border border-border transition-colors"
            >
              Save Endpoint Settings
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
