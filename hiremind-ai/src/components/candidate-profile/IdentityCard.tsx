import React from 'react';
import { Camera, Eye, CheckCircle2, Circle } from 'lucide-react';
import { HMCard } from '@/components/ui/HMCard';
import { HMButton } from '@/components/ui/HMButton';

interface IdentityCardProps {
  completionPercentage: number;
}

export function IdentityCard({ completionPercentage }: IdentityCardProps) {
  const sections = [
    { name: 'Personal Information', completed: true },
    { name: 'Education & Career', completed: true },
    { name: 'Technical Skills', completed: false },
    { name: 'Experience', completed: false },
    { name: 'Projects', completed: false },
    { name: 'Career Preferences', completed: false },
  ];

  return (
    <HMCard className="p-6 sticky top-24 flex flex-col items-center">
      
      {/* Avatar Container with glowing effect */}
      <div className="relative group mb-4">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300" />
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-hm-matte flex items-center justify-center text-white text-4xl font-extrabold shadow-lg border-4 border-white">
          AK
        </div>
        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-border rounded-full flex items-center justify-center text-ink-soft hover:text-primary hover:border-primary/30 shadow-sm transition-all hover:scale-110">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      <h2 className="text-xl font-bold text-ink">Aakash Karthick</h2>
      <p className="text-sm font-medium text-ink-faint mb-6">AI/ML Candidate</p>

      {/* Progress Indicator */}
      <div className="w-full bg-surface-sunken rounded-xl p-4 mb-6 border border-border/50 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-ink-soft uppercase tracking-wider">Profile Completion</span>
          <span className="text-sm font-extrabold text-primary">{completionPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Section Checklist */}
      <div className="w-full space-y-3 mb-8">
        {sections.map((section, idx) => (
          <div key={idx} className="flex items-center justify-between group cursor-pointer">
            <span className={`text-sm font-medium transition-colors ${section.completed ? 'text-ink-soft' : 'text-ink-faint group-hover:text-ink-soft'}`}>
              {section.name}
            </span>
            {section.completed ? (
              <CheckCircle2 className="w-4 h-4 text-success" />
            ) : (
              <Circle className="w-4 h-4 text-border group-hover:text-ink-faint transition-colors" />
            )}
          </div>
        ))}
      </div>

      <div className="w-full space-y-3 mt-auto">
        <HMButton variant="outline" className="w-full" leftIcon={<Eye className="w-4 h-4" />}>
          View Public Profile
        </HMButton>
      </div>
      
    </HMCard>
  );
}
