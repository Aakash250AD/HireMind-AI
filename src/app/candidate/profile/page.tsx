'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { IdentityCard } from '@/components/candidate-profile/IdentityCard';
import { ProfileForms } from '@/components/candidate-profile/ProfileForms';
import { ProfilePreviewModal } from '@/components/candidate-profile/ProfilePreviewModal';
import { HMButton } from '@/components/ui/HMButton';
import { supabase } from '@/lib/supabase';
import { Check } from 'lucide-react';

export default function CandidateProfilePage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }

      const { data } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('auth_provider_user_id', session.user.id)
        .single();

      setName(data?.full_name ?? session.user.user_metadata?.full_name ?? '');
      setEmail(data?.email ?? session.user.email ?? '');
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { error: updateError } = await supabase
        .from('users')
        .update({ full_name: name })
        .eq('auth_provider_user_id', session.user.id);

      if (updateError) throw updateError;

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      setError((err as Error).message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
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
          <HMButton variant="secondary" onClick={() => setIsPreviewOpen(true)} disabled={loading}>
            Preview Profile
          </HMButton>
          <HMButton
            onClick={handleSave}
            isLoading={isSaving}
            disabled={loading}
            className={isSaved ? "bg-success hover:bg-success text-white" : ""}
          >
            {isSaved ? (
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Saved</span>
            ) : "Save Profile"}
          </HMButton>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger-tint border border-danger text-danger text-xs font-semibold rounded-[var(--radius-md)]">
          {error}
        </div>
      )}

      {/* 3-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

        {/* Left: Identity Card */}
        <div className="lg:col-span-3">
          <IdentityCard name={name} email={email} />
        </div>

        {/* Center: Interactive Forms */}
        <div className="lg:col-span-9">
          <ProfileForms name={name} email={email} onNameChange={setName} />
        </div>

      </div>

      <ProfilePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} name={name} email={email} />

    </DashboardLayout>
  );
}
