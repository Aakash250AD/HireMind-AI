'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { useTheme } from '@/components/ThemeProvider';
import { Briefcase, Users, Video, Award, CheckCircle2, LogOut, Lock, Shield, User, Settings, Bell } from 'lucide-react';
import { jobsService } from '@/services/jobs.service';
import { candidatesService } from '@/services/candidates.service';

export default function HRProfilePage() {
  const { clearCacheAndLogout } = useTheme();

  // Stats State
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, interviews: 0, hires: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Jenkins',
    title: 'Lead Recruiter',
    department: 'Talent Acquisition',
    email: 'sarah.jenkins@hiremind.ai',
    phone: '+1 (555) 019-2834',
    company: 'HireMind AI Inc.'
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    newApplicants: true,
    shortlistReady: true,
    interviewCompleted: false,
    dailySummary: true
  });
  
  // Security State
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const jobs = await jobsService.getJobs();
        const cands = await candidatesService.getCandidates();
        
        // Mock data aggregation for org-wide totals
        const activeJobs = jobs.filter(j => j.status === 'ACTIVE').length;
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

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
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
            <Card className="p-0 overflow-hidden border border-border bg-white shadow-sm">
              <div className="h-24 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border"></div>
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-12 left-6 w-24 h-24 bg-white rounded-full p-1 shadow-sm border border-border">
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                    {profile.name.charAt(0)}{profile.name.split(' ')[1]?.charAt(0)}
                  </div>
                </div>
                
                <div className="pt-14 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-ink">{profile.name}</h2>
                    <p className="text-ink-soft text-sm font-medium">{profile.title} • {profile.department}</p>
                    <p className="text-xs text-ink-faint mt-1">{profile.company}</p>
                  </div>
                  <Button 
                    variant={isEditing ? 'secondary' : 'primary'} 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Profile Form */}
            <Card id="settings" className="border border-border bg-white shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                {profileSaved && (
                  <span className="text-xs font-semibold text-success flex items-center gap-1 bg-success-tint px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-4 h-4" /> Saved locally
                  </span>
                )}
              </div>

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
                      onChange={e => setProfile(p => ({...p, email: e.target.value}))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-ink-soft">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profile.phone}
                      onChange={e => setProfile(p => ({...p, phone: e.target.value}))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-ink-soft">Job Title</label>
                    <input 
                      type="text" 
                      value={profile.title}
                      onChange={e => setProfile(p => ({...p, title: e.target.value}))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold text-ink-soft">Department</label>
                    <input 
                      type="text" 
                      value={profile.department}
                      onChange={e => setProfile(p => ({...p, department: e.target.value}))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                )}
              </form>
            </Card>

            {/* Notification Preferences */}
            <Card id="notifications" className="border border-border bg-white shadow-sm space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </h3>
                <p className="text-xs text-ink-soft mt-1">Manage what emails you receive from HireMind AI.</p>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-ink capitalize cursor-pointer flex-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <button 
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${value ? 'bg-primary' : 'bg-surface-sunken border border-border'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${value ? 'translate-x-2' : '-translate-x-2'}`} />
                    </button>
                  </div>
                ))}
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
              
              <div className="bg-white border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Briefcase className="w-5 h-5 text-indigo-500 mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.jobs}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Active Jobs</span>
              </div>
              <div className="bg-white border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Users className="w-5 h-5 text-blue-500 mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.candidates}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Total Candidates</span>
              </div>
              <div className="bg-white border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Video className="w-5 h-5 text-amber-500 mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.interviews}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Pending Interviews</span>
              </div>
              <div className="bg-white border border-border rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col justify-center items-center text-center">
                <Award className="w-5 h-5 text-success mb-2" />
                <span className="text-2xl font-bold text-ink">{loadingStats ? '-' : stats.hires}</span>
                <span className="text-xs font-medium text-ink-soft mt-1">Hires Made</span>
              </div>
            </div>

            {/* Account Security */}
            <Card id="security" className="border border-border bg-white shadow-sm space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Account Security
                </h3>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-ink flex items-center gap-1.5"><Lock className="w-4 h-4 text-ink-faint"/> Change Password</h4>
                  <input type="password" placeholder="Current Password" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm outline-none" />
                  <input type="password" placeholder="New Password" className="w-full px-3 py-2 bg-surface-sunken border border-border rounded-md text-sm outline-none" />
                  <Button variant="secondary" className="w-full">Update Password</Button>
                </div>

                <div className="pt-4 border-t border-border flex flex-col gap-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-start mt-0.5">
                      <input 
                        type="checkbox" 
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                        className="peer sr-only" 
                      />
                      <div className="w-4 h-4 rounded border border-border bg-surface-sunken peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-all">
                        {keepSignedIn && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-ink">Keep me signed in</span>
                      <span className="text-xs text-ink-faint leading-snug">Maintain session across browser restarts.</span>
                    </div>
                  </label>

                  <button 
                    onClick={clearCacheAndLogout}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-semibold rounded-[var(--radius-md)] border border-rose-200 transition-colors"
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
