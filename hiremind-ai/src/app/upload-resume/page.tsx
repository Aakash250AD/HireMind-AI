'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ResumeUploader } from '@/components/ResumeUploader';
import { Card } from '@/components/ui/Card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CandidateUploadResumePage() {
  const router = useRouter();

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-ink">Resume Ingestion</h1>
          <p className="text-sm text-ink-soft">
            Upload your latest resume to automatically populate your profile and match with open jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Uploader Column */}
          <div className="md:col-span-2 space-y-6">
            <ResumeUploader 
              onScreeningComplete={() => {
                // Optionally redirect or show next steps when complete
              }}
            />
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            <Card className="bg-primary-tint border-primary/20 space-y-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Sparkles className="w-5 h-5" />
                <span>How it works</span>
              </div>
              <ul className="text-sm text-primary/90 space-y-3 list-disc list-inside">
                <li>Our AI parses your experience and skills instantly.</li>
                <li>Your profile is automatically scored against active roles.</li>
                <li>Verified badges are issued for proven technical skills.</li>
              </ul>
            </Card>

            <Card className="space-y-4 text-center py-6">
              <h3 className="font-semibold text-ink">Already uploaded?</h3>
              <p className="text-xs text-ink-soft">Check your profile or start applying for roles immediately.</p>
              <Link href="/candidate-dashboard" className="inline-block pt-2">
                <Button variant="secondary" className="w-full justify-center">
                  Go to Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </Card>
          </div>
          
        </div>

      </div>
    </DashboardLayout>
  );
}
