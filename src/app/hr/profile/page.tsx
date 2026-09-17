'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/components/ThemeProvider';
import { Briefcase, Users, Video, Award, CheckCircle2, LogOut, Lock, Shield, User, Bell } from 'lucide-react';
import { jobsService } from '@/services/jobs.service';
import { candidatesService } from '@/services/candidates.service';
import { supabase } from '@/lib/supabase';

export default function HRProfilePage() {
  const { clearCacheAndLogout } = useTheme();

  // Stats State
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, interviews: 0, hires: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    company: ''
  });

  // Security State
  const [passwordFields, setPasswordFields] = useState({ current: '', next: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      setLoadingProfile(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoadingProfile(false); return; }

      const { data } = await supabase
        .from('users')
        .select('full_name, email, company_name')
        .eq('auth_provider_user_id', session.user.id)
        .single();

      setProfile({
        name: data?.full_name ?? session.user.user_metadata?.full_name ?? '',
        email: data?.email ?? session.user.email ?? '',
        company: data?.company_name ?? ''
      });
      setLoadingProfile(false);
    }
    loadProfile();
  }, []);

  useEffect(() => {
    async function loadStats() {
      try {
        const jobs = await jobsService.getJobs();
        const cands = await candidatesService.getCandidates();
        
        const activeJobs = jobs.filter(j => j.status === 'open').length;
        const totalCandidates = cands.length;
        const pendingInterviews = cands.filter(c => c.stage === 'Interview').length;
        const hired = cands.filter(c => c.stage === 'Hired').length;

        setStats({
          jobs: activeJobs,
          candidates: totalCandidates,
          interviews: pendingInterviews,
          hires: hired
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoadingStats(false);
      }
    }
    loadStats();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('users')
        .update({ full_name: profile.name, company_name: profile.company })
        .eq('auth_provider_user_id', session.user.id);

      if (error) throw error;

      setIsEditing(false);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err) {
      setProfileError((err as Error).message || 'Failed to save profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordFields.next) {
      setPasswordMessage('Enter a new password.');
      return;
    }
    setPasswordSaving(true);
    setPasswordMessage(null);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwordFields.next });
      if (error) throw error;
      setPasswordFields({ current: '', next: '' });
      setPasswordMessage('Password updated.');
    } catch (err) {
      setPasswordMessage((err as Error).message || 'Failed to update password');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <DashboardLayout role="hr">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-ink">My Profile</h1>
          <p className="text-sm text-ink-soft">
            Manage your personal information, activity stats, and security preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Identity & Editing */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Identity Card */}
            <Card className="p-0 overflow-hidden border border-border bg-surface shadow-sm">
              <div className="h-24 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border"></div>
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-12 left-6 w-24 h-24 bg-surface rounded-full p-1 shadow-sm border border-border">
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                    {profile.name.charAt(0)}{profile.name.split(' ')[1]?.charAt(0)}
                  </div>
                </div>
                
                <div className="pt-14 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-ink">{loadingProfile ? 'Loading...' : (profile.name || 'Unnamed')}</h2>
                    <p className="text-xs text-ink-faint mt-1">{profile.company}</p>
                  </div>
                  <Button
                    variant={isEditing ? 'secondary' : 'primary'}
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={loadingProfile}
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Profile Form */}
            <Card id="settings" className="border border-border bg-surface shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                {profileSaved && (
                  <span className="text-xs font-semibold text-success flex items-center gap-1 bg-success-tint px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-4 h-4" /> Saved
                  </span>
                )}
              </div>

              {profileError && (
                <div className="p-3 bg-danger-tint border border-danger text-danger text-xs font-semibold rounded-md">
                  {profileError}
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-ink-soft">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={e => setProfile(p => ({...p, name: e.target.value}))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-ink-soft">Work Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-ink-soft">Company Name</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={e => setProfile(p => ({...p, company: e.target.value}))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" isLoading={profileSaving}>Save Changes</Button>
                  </div>
                )}
              </form>
            </Card>

            {/* Notification Preferences */}
            <Card id="notifications" className="border border-border bg-surface shadow-sm space-y-4">
              <div className="border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </h3>
                <p className="text-xs text-ink-soft mt-1">Email notification preferences aren&apos;t connected yet — pending a backend preferences store.</p>
              </div>
            </Card>
          </div>

          {/* Right Column: Stats & Security */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Activity Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <h3 className="text-sm font-bold text-ink mb-1">Your Activity Overview</h3>
                <p className="text-xs text-ink-faint mb-3">Currently showing org-wide totals (per-recruiter filtering coming soon).</p>
              </div>
              
              <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Briefcase className="w-5 h-5 text-indigo-500 mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.jobs}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Active Jobs</span>
              </div>
              <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Users className="w-5 h-5 text-blue-500 mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.candidates}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Total Candidates</span>
              </div>
              <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Video className="w-5 h-5 text-amber-500 mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.interviews}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Pending Interviews</span>
              </div>
              <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Award className="w-5 h-5 text-success mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.hires}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Hires Made</span>
              </div>
            </div>

            {/* Account Security */}
            <Card id="security" className="border border-border bg-surface shadow-sm space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Account Security
                </h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-ink flex items-center gap-1.5"><Lock className="w-4 h-4 text-ink-faint"/> Change Password</h4>
                  {passwordMessage && (
                    <p className="text-xs font-semibold text-ink-soft">{passwordMessage}</p>
                  )}
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordFields.next}
                    onChange={(e) => setPasswordFields((p) => ({ ...p, next: e.target.value }))}
                    className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm outline-none"
                  />
                  <Button variant="secondary" className="w-full" onClick={handlePasswordUpdate} isLoading={passwordSaving}>
                    Update Password
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <button
                    onClick={clearCacheAndLogout}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-danger-tint hover:bg-danger hover:text-white text-danger text-sm font-semibold rounded-[var(--radius-md)] border border-danger transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout Session
                  </button>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
