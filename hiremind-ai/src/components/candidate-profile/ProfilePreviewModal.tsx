import React from 'react';
import { X, MapPin, Building, GraduationCap, Globe, Code, ExternalLink } from 'lucide-react';
import { HMButton } from '@/components/ui/HMButton';

interface ProfilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfilePreviewModal({ isOpen, onClose }: ProfilePreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-hm-deep/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="w-full max-w-4xl max-h-[90vh] bg-surface rounded-[var(--radius-lg)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-border bg-surface-sunken shrink-0">
          <h2 className="text-base font-bold text-ink">Recruiter View Preview</h2>
          <div className="flex items-center gap-3">
            <HMButton size="sm" variant="outline" onClick={onClose}>Edit Profile</HMButton>
            <button onClick={onClose} className="p-1.5 text-ink-faint hover:text-ink hover:bg-white rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-hm-bg">
          
          <div className="bg-surface rounded-[var(--radius-lg)] border border-border overflow-hidden shadow-sm">
            {/* Header / Banner */}
            <div className="h-32 bg-gradient-to-r from-hm-deep to-primary relative" />
            
            <div className="px-8 pb-8 relative">
              {/* Avatar overlapping banner */}
              <div className="absolute -top-12 w-24 h-24 rounded-full bg-surface border-4 border-white shadow-md flex items-center justify-center text-3xl font-black text-hm-deep overflow-hidden">
                AK
              </div>
              
              <div className="flex justify-end pt-4 pb-2 gap-2">
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-soft hover:bg-surface-sunken transition-colors">
                  <Code className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-soft hover:bg-surface-sunken transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2">
                <h1 className="text-2xl font-black text-ink tracking-tight">Aakash Karthick</h1>
                <p className="text-sm font-semibold text-primary mt-1">AI/ML Candidate • HireMind Tech</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-ink-faint font-medium">
                  <MapPin className="w-3.5 h-3.5" /> Coimbatore, India
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-bold text-ink mb-3 uppercase tracking-wider">About</h3>
                <p className="text-sm text-ink-soft leading-relaxed max-w-3xl">
                  Passionate AI researcher and backend engineer focusing on NLP and automation. Built multiple models improving data extraction accuracy. Looking for roles involving Generative AI and scalable backend systems.
                </p>
              </div>

              <div className="mt-8 border-t border-border pt-8">
                <h3 className="text-sm font-bold text-ink mb-4 uppercase tracking-wider">Experience</h3>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-[var(--radius-sm)] bg-surface-sunken flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5 text-ink-soft" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-ink">AI/ML Intern</h4>
                    <div className="text-sm text-ink-soft font-medium">HireMind Tech</div>
                    <div className="text-xs text-ink-faint mt-1">Jan 2025 - Present</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-8">
                <h3 className="text-sm font-bold text-ink mb-4 uppercase tracking-wider">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Machine Learning', 'React', 'Node.js', 'PostgreSQL'].map(skill => (
                    <span key={skill} className="bg-surface-sunken text-ink-soft px-3 py-1 rounded-full text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
