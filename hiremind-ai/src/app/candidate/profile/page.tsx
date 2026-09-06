'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { IdentityCard } from '@/components/candidate-profile/IdentityCard';
import { ProfileForms } from '@/components/candidate-profile/ProfileForms';
import { ProfilePreviewModal } from '@/components/candidate-profile/ProfilePreviewModal';
import { HMButton } from '@/components/ui/HMButton';
import { Check } from 'lucide-react';

export default function CandidateProfilePage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  return (
    <DashboardLayout role="candidate">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-ink tracking-tight">Candidate Profile</h1>
          <p className="text-sm font-medium text-ink-soft mt-1">
            Build your professional identity and improve your chances of getting shortlisted.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <HMButton variant="secondary" onClick={() => setIsPreviewOpen(true)}>
            Preview Profile
          </HMButton>
          <HMButton 
            onClick={handleSave} 
            isLoading={isSaving}
            className={isSaved ? "bg-success hover:bg-success text-white" : ""}
          >
            {isSaved ? (
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Saved</span>
            ) : "Save Profile"}
          </HMButton>
        </div>
      </div>

      {/* 3-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        
        {/* Left: Identity Card */}
        <div className="lg:col-span-3">
          <IdentityCard completionPercentage={72} />
        </div>
        
        {/* Center: Interactive Forms */}
        <div className="lg:col-span-9">
          <ProfileForms />
        </div>

      </div>

      <ProfilePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />

    </DashboardLayout>
  );
}
