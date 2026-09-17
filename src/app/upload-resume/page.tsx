'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CandidateUploadResumePage() {
  const router = useRouter();

  useEffect(() => {
    // Resume upload only ever happens as part of applying to a specific job
    // (the backend's APPLY_JOB action requires a jobId) — send candidates
    // to job browsing, where the real apply-with-resume flow lives.
    router.replace('/candidate/jobs');
  }, [router]);

  return null;
}
