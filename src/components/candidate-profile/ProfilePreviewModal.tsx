import React from 'react';
import { X } from 'lucide-react';
import { HMButton } from '@/components/ui/HMButton';

interface ProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
}

export function ProfilePreviewModal({ isOpen, onClose, name, email }: ProfilePreviewModalProps) {
  if (!isOpen) return null;

  const initials = name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-hm-deep/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] bg-surface rounded-[var(--radius-lg)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 px-6 border-b border-border bg-surface-sunken shrink-0">
          <h2 className="text-base font-bold text-ink">Recruiter View Preview</h2>
          <div className="flex items-center gap-3">
            <HMButton size="sm" variant="outline" onClick={onClose}>Edit Profile</HMButton>
            <button onClick={onClose} className="p-1.5 text-ink-faint hover:text-ink hover:bg-white rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-hm-bg">
          <div className="bg-surface rounded-[var(--radius-lg)] border border-border overflow-hidden shadow-sm">
            <div className="h-24 bg-gradient-to-r from-hm-deep to-primary relative" />

            <div className="px-8 pb-8 relative">
              <div className="absolute -top-10 w-20 h-20 rounded-full bg-surface border-4 border-white shadow-md flex items-center justify-center text-2xl font-black text-hm-deep">
                {initials}
              </div>

              <div className="pt-12">
                <h1 className="text-2xl font-black text-ink tracking-tight">{name || 'Unnamed Candidate'}</h1>
                <p className="text-sm text-ink-soft mt-1">{email}</p>
              </div>

              <div className="mt-8 p-4 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm text-ink-faint">
                Extended profile details (skills, experience, projects, resume) aren&apos;t connected to a backend yet, so recruiters currently only see your name and email here.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
