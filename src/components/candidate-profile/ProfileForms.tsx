'use client';

import React from 'react';
import { HMCard } from '@/components/ui/HMCard';
import { HMInput } from '@/components/ui/HMInput';
import { Info } from 'lucide-react';

interface ProfileFormsProps {
  name: string;
  email: string;
  onNameChange: (name: string) => void;
}

function NotConnectedNote({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-2 p-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-xs text-ink-faint">
      <Info className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{label} isn&apos;t connected to a backend yet — this section is a preview of what&apos;s coming.</span>
    </div>
  );
}

export function ProfileForms({ name, email, onNameChange }: ProfileFormsProps) {
  return (
    <div className="space-y-6">

      {/* Personal Identity */}
      <HMCard className="p-6" id="personal-info">
        <h3 className="text-lg font-bold text-ink mb-4 pb-2 border-b border-border">Personal Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <HMInput
            label="Full Name"
            placeholder="e.g. Jane Doe"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <HMInput label="Email" type="email" value={email} disabled />
        </div>
      </HMCard>

      {/* Technical Skills */}
      <HMCard className="p-6" id="skills">
        <h3 className="text-lg font-bold text-ink mb-1">Technical Skills</h3>
        <p className="text-xs text-ink-faint mb-4 pb-2 border-b border-border">Tell recruiters what you can build.</p>
        <NotConnectedNote label="Skills" />
      </HMCard>

      {/* Experience Timeline */}
      <HMCard className="p-6" id="experience">
        <h3 className="text-lg font-bold text-ink mb-4 pb-2 border-b border-border">Experience</h3>
        <NotConnectedNote label="Experience history" />
      </HMCard>

      {/* Resume Upload */}
      <HMCard className="p-6" id="resume">
        <h3 className="text-lg font-bold text-ink mb-4 pb-2 border-b border-border">Resume</h3>
        <NotConnectedNote label="Resume upload from this page" />
        <p className="text-xs text-ink-faint mt-3">
          You can upload a resume when applying to a specific job from the <a href="/candidate/jobs" className="text-primary font-semibold hover:underline">Browse Jobs</a> page.
        </p>
      </HMCard>

    </div>
  );
}
