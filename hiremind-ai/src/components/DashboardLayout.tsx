'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Briefcase, 
  Trophy, 
  FileText, 
  Users, 
  Sparkles, 
  Settings, 
  Plus, 
  LogOut,
  BrainCircuit,
  Search,
  CheckCircle2,
  Calendar,
  BarChart3,
  Bell,
  MessageSquare,
  UserCircle
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'hr' | 'candidate';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role = 'hr' }) => {
  const pathname = usePathname();
  const { theme, toggleTheme, clearCacheAndLogout } = useTheme();

  const isCandidateRoute = pathname.startsWith('/candidate-dashboard') || pathname.startsWith('/interview');
  const activeRole: 'hr' | 'candidate' = role || (isCandidateRoute ? 'candidate' : 'hr');

  const hrSidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Jobs & Openings', href: '/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'AI Screening', href: '/screening', icon: Sparkles },
    { name: 'AI Shortlist', href: '/shortlist', icon: Trophy },
    { name: 'Skill Verification', href: '/verification', icon: CheckCircle2 },
    { name: 'Interviews', href: '/interviews', icon: Calendar },
    { name: 'Assessments', href: '/assessments', icon: FileText },
    { name: 'Recruitment Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Automations', href: '/automations', icon: BrainCircuit },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const candidateSidebarItems = [
    { name: 'Home', href: '/candidate-dashboard', icon: Home },
    { name: 'Find Jobs', href: '/jobs', icon: Search },
    { name: 'My Applications', href: '/applications', icon: Briefcase },
    { name: 'Recommended Jobs', href: '/recommended', icon: Sparkles },
    { name: 'Assessments', href: '/assessments', icon: FileText },
    { name: 'Interviews', href: '/interviews', icon: Calendar },
    { name: 'AI Profile', href: '/ai-profile', icon: BrainCircuit },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'My Profile', href: '/profile', icon: UserCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const currentSidebar = activeRole === 'candidate' ? candidateSidebarItems : hrSidebarItems;

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex font-sans text-slate-900">
      
      {/* 1. PLAIN WHITE SIDEBAR */}
      <aside className="w-64 bg-white border-r border-[#BAE6FD] flex flex-col justify-between p-4 sticky top-0 h-screen select-none shrink-0 shadow-xs">
        
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-between px-2 pt-1">
            <Link href={activeRole === 'candidate' ? '/candidate-dashboard' : '/dashboard'} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[#0284C7] flex items-center justify-center text-text-primary shadow-md">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                  HireMind <span className="text-[#0284C7]">AI</span>
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                  Talent Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Action Button Pill */}
          <div className="px-1">
            <Link
              href={activeRole === 'hr' ? '/jobs/create' : '/jobs'}
              className="w-full py-2.5 px-4 bg-[#E0F2FE] border border-[#0284C7]/30 text-[#0284C7] hover:bg-[#0284C7] hover:text-text-primary rounded-full text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {activeRole === 'hr' ? <Plus className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              <span>{activeRole === 'hr' ? '+ Post Job' : 'Find Jobs'}</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {currentSidebar.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold rounded-[var(--radius-md)] transition-all ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-md font-extrabold'
                      : 'text-slate-600 hover:bg-[#E0F2FE] hover:text-[#0284C7]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="space-y-3 pt-4 border-t border-[#BAE6FD]">
          <div className="p-3 bg-[#F0F9FF] border border-[#BAE6FD] rounded-[var(--radius-lg)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0284C7]">Recruitment Suite</span>
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {activeRole === 'candidate' ? 'Candidate Portal Active' : 'Autonomous AI Active'}
            </p>
          </div>

          <button
            onClick={clearCacheAndLogout}
            className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-[var(--radius-md)] text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        </div>

      </aside>

      {/* 2. PLAIN WHITE CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Bar */}
        <header className="bg-white border-b border-[#BAE6FD] px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="w-full max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search jobs, candidates, tests..."
              className="w-full pl-10 pr-4 py-2 bg-[#F0F9FF] border border-[#BAE6FD] rounded-full text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0284C7] focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#E0F2FE] text-[#0284C7] text-xs font-bold rounded-full border border-[#0284C7]/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Verified Talent Profiles</span>
            </span>

            {activeRole === 'hr' && (
              <Link
                href="/copilot"
                className="px-3.5 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 shadow"
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>AI Copilot</span>
              </Link>
            )}
          </div>
        </header>

        {/* Page Main Content */}
        <main className="p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
};
