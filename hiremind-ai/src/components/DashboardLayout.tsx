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
  MessageSquare,
  UserCircle,
  Command,
  Video,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { HMAICopilot } from './ui/HMAICopilot';
import { UserProfileMenu } from './ui/UserProfileMenu';
import { NotificationMenu } from './ui/NotificationMenu';


interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'hr' | 'candidate';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role = 'hr' }) => {
  const pathname = usePathname();
  const { theme, toggleTheme, clearCacheAndLogout } = useTheme();

  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = React.useState(false);

  const isCandidateRoute = pathname.startsWith('/candidate-dashboard') || pathname.startsWith('/interview');
  const activeRole: 'hr' | 'candidate' = role || (isCandidateRoute ? 'candidate' : 'hr');

  // Close menus on route change
  React.useEffect(() => {
    setProfileMenuOpen(false);
    setNotificationMenuOpen(false);
  }, [pathname]);

  const hrSidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Post Job', href: '/jobs/create', icon: Plus },
    { name: 'Applications', href: '/candidates', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const candidateSidebarItems = [
    { name: 'Dashboard', href: '/candidate-dashboard', icon: Home },
    { name: 'Browse Jobs', href: '/candidate/jobs', icon: Search },
    { name: 'My Applications', href: '/candidate/applications', icon: Briefcase },
    { name: 'Interviews', href: '/candidate/interviews', icon: Video },
    { name: 'Profile', href: '/candidate/profile', icon: UserCircle },
  ];

  const currentSidebar = activeRole === 'candidate' ? candidateSidebarItems : hrSidebarItems;

  return (
    <div className="min-h-screen bg-hm-bg flex font-sans text-ink">
      
      {/* 1. PREMIUM NAVIGATION RAIL */}
      <aside className="w-64 bg-surface/60 backdrop-blur-xl border-r border-border flex flex-col justify-between pt-6 pb-4 sticky top-0 h-screen select-none shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
        
        <div className="space-y-8">
          {/* Logo */}
          <div className="px-6">
            <Link href={activeRole === 'candidate' ? '/candidate-dashboard' : '/dashboard'} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-gradient-to-br from-hm-deep to-hm-matte flex items-center justify-center text-white shadow-md relative group">
                <BrainCircuit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-surface/20 rounded-[var(--radius-sm)] blur opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-hm-deep tracking-tight">
                  HireMind <span className="text-primary">AI</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Action Area */}
          <div className="px-4">
            <Link
              href={activeRole === 'hr' ? '/jobs/create' : '/candidate/jobs'}
              className="w-full py-2.5 px-4 bg-hm-deep hover:bg-hm-matte text-white rounded-[var(--radius-hm-button)] text-xs font-bold shadow-[var(--shadow-hm-button)] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {activeRole === 'hr' ? <Plus className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              <span>{activeRole === 'hr' ? 'Create Opportunity' : 'Explore Jobs'}</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 px-3">
            {currentSidebar.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-4 py-2.5 text-xs font-semibold rounded-[var(--radius-sm)] transition-all duration-200 group overflow-hidden ${
                    isActive
                      ? 'text-primary bg-primary-tint/30'
                      : 'text-ink-soft hover:bg-white/80 hover:text-ink'
                  }`}
                >
                  {/* Glowing Intelligence Line for Active State */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full shadow-[0_0_10px_rgba(22,87,204,0.6)]" />
                  )}
                  
                  <Icon className={`w-4 h-4 relative z-10 transition-colors ${isActive ? 'text-primary' : 'text-ink-faint group-hover:text-ink'}`} />
                  <span className="relative z-10">{item.name}</span>
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>


      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Top Command Bar */}
        <header className="bg-surface/40 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          
          {/* Command Search */}
          <div className="w-full max-w-xl relative group">
            <Search className="w-4 h-4 text-ink-faint absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search jobs, candidates, or ask HireMind..."
              className="w-full pl-11 pr-12 py-2.5 bg-surface/80 border border-border rounded-full text-sm font-medium text-ink focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white shadow-sm transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 bg-surface-sunken border border-border px-1.5 py-0.5 rounded text-[10px] font-bold text-ink-faint">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4 pl-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-sunken text-ink-soft hover:text-ink transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-px h-6 bg-border" />
            <NotificationMenu 
              isOpen={notificationMenuOpen} 
              onToggle={() => {
                setNotificationMenuOpen(!notificationMenuOpen);
                if (!notificationMenuOpen) setProfileMenuOpen(false);
              }}
              onClose={() => setNotificationMenuOpen(false)}
            />
            <div className="w-px h-6 bg-border" />
            <UserProfileMenu 
              role={activeRole} 
              isOpen={profileMenuOpen} 
              onToggle={() => {
                setProfileMenuOpen(!profileMenuOpen);
                if (!profileMenuOpen) setNotificationMenuOpen(false);
              }}
              onClose={() => setProfileMenuOpen(false)}
            />
          </div>
        </header>

        {/* Page Main Content with Asymmetric Spacing */}
        <main className="p-8 pb-24 flex-1">
          <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
        
        {/* Floating AI Copilot */}
        <HMAICopilot />

      </div>

    </div>
  );
};
