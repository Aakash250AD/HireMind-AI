'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useTheme } from './ThemeProvider';
import { 
  LayoutDashboard, 
  Briefcase, 
  Video, 
  Award, 
  User, 
  Plus,
  Search, 
  Sparkles, 
  Sun, 
  Moon, 
  LogOut, 
  Settings, 
  FileText,
  LucideIcon,
  Bell
} from 'lucide-react';
import { UserProfileMenu } from './ui/UserProfileMenu';

interface TopNavbarProps {
  role?: 'hr' | 'candidate';
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ role = 'hr' }) => {
  const pathname = usePathname();
  const { theme, toggleTheme, clearCacheAndLogout } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  const isCandidateRoute = pathname.startsWith('/candidate-dashboard') || pathname.startsWith('/interview');
  const activeRole: 'hr' | 'candidate' = role || (isCandidateRoute ? 'candidate' : 'hr');

  const hrNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Tests & Assessments', href: '/interviews', icon: FileText },
    { name: 'Shortlist', href: '/shortlist', icon: Award },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const candidateNavigation: NavItem[] = [
    { name: 'My Applications', href: '/candidate-dashboard', icon: User },
    { name: 'Find Jobs', href: '/jobs', icon: Briefcase },
    { name: 'MCQ & Aptitude Test', href: '/interview/int-session-101', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const currentNav = activeRole === 'candidate' ? candidateNavigation : hrNavigation;

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40 w-full select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-8">
        
        {/* Left: Brand Logo & Badge & Navigation */}
        <div className="flex items-center gap-8">
        
        {/* Left: Brand Logo & Badge */}
        <div className="flex items-center gap-4">
          <Link href={activeRole === 'candidate' ? '/candidate-dashboard' : '/dashboard'}>
            <Logo size="sm" />
          </Link>

          <span className="px-2.5 py-0.5 rounded-full bg-page-bg border border-border text-[11px] font-semibold text-text-secondary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>{activeRole === 'candidate' ? 'Candidate Portal' : 'HR Recruiter Suite'}</span>
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1">
          {currentNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center px-4 py-1.5 text-xs font-semibold border-b-2 transition-all duration-150 ${
                  isActive
                    ? 'border-border text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
                <span className="text-[11px]">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 ml-auto">
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            className="p-1.5 rounded-md bg-page-bg border border-border text-text-secondary hover:text-text-primary transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {activeRole === 'hr' && (
            <Link
              href="/copilot"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-page-bg border border-border text-xs font-semibold text-primary hover:bg-[#EAE6DF] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AI Copilot</span>
            </Link>
          )}

          <button
            title="Notifications"
            className="relative p-1.5 rounded-full bg-page-bg border border-border text-text-secondary hover:text-text-primary transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 border border-white rounded-full"></span>
          </button>

          <UserProfileMenu 
            role={activeRole} 
            isOpen={isProfileMenuOpen} 
            onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)} 
            onClose={() => setIsProfileMenuOpen(false)} 
          />

          <Link
            href="/jobs"
            className="flex items-center gap-1.5 py-1.5 px-4 bg-primary hover:bg-dark-blue text-white text-xs font-bold rounded-full shadow-sm transition-all"
          >
            {activeRole === 'hr' ? <Plus className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            <span>{activeRole === 'hr' ? 'Post Job' : 'Search Jobs'}</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
