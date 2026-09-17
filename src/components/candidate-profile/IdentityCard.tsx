import React from 'react';
import { Eye } from 'lucide-react';
import { HMCard } from '@/components/ui/HMCard';
import { HMButton } from '@/components/ui/HMButton';

interface IdentityCardProps {
  name: string;
  email: string;
}

export function IdentityCard({ name, email }: IdentityCardProps) {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <HMCard className="p-6 sticky top-24 flex flex-col items-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-hm-matte flex items-center justify-center text-white text-4xl font-extrabold shadow-lg border-4 border-white">
          {initials}
        </div>
      </div>

      <h2 className="text-xl font-bold text-ink">{name || 'Unnamed Candidate'}</h2>
      <p className="text-sm font-medium text-ink-faint mb-6">{email}</p>

      <div className="w-full bg-surface-sunken rounded-[var(--radius-md)] p-4 mb-2 border border-border/50 text-xs text-ink-faint leading-relaxed">
        Extended profile fields (skills, experience, projects) will sync once the candidate profile backend is connected. Only your name is saved today.
      </div>

      <div className="w-full space-y-3 mt-auto pt-4">
        <HMButton variant="outline" className="w-full" leftIcon={<Eye className="w-4 h-4" />} disabled>
          View Public Profile (coming soon)
        </HMButton>
      </div>
    </HMCard>
  );
}
