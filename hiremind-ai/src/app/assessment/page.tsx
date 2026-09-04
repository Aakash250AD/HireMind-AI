'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { callWebhook } from '@/lib/apiClient';
import { WEBHOOKS } from '@/lib/webhooks';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AssessmentPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const answers = Object.fromEntries(formData.entries());
      
      await callWebhook(WEBHOOKS.assessmentSubmit, { answers });
      alert('Assessment submitted successfully!');
      router.push('/candidate-dashboard');
    } catch (err) {
      alert('Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Technical Assessment</h1>
          <p className="text-sm text-ink-soft">Complete the following multiple choice questions.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-3">
              <h3 className="font-medium text-ink">1. What is the primary purpose of React's useMemo hook?</h3>
              <div className="space-y-2 text-sm text-ink-soft">
                <label className="flex items-center gap-2"><input type="radio" name="q1" value="A" required /> A) To fetch data from an API.</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" value="B" required /> B) To memoize expensive calculations.</label>
                <label className="flex items-center gap-2"><input type="radio" name="q1" value="C" required /> C) To manage global state.</label>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-ink">2. How does Server-Side Rendering (SSR) improve SEO?</h3>
              <div className="space-y-2 text-sm text-ink-soft">
                <label className="flex items-center gap-2"><input type="radio" name="q2" value="A" required /> A) It sends fully constructed HTML to the crawler.</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" value="B" required /> B) It compresses images automatically.</label>
                <label className="flex items-center gap-2"><input type="radio" name="q2" value="C" required /> C) It prevents JavaScript from running.</label>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button type="submit" isLoading={submitting}>Submit Assessment</Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
