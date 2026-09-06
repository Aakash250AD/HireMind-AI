'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { jobsService } from '@/services/jobs.service';
import { Job } from '@/types';
import { Sparkles, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CreateJobPage() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('Artificial Intelligence');
  const [location, setLocation] = useState('San Francisco, CA');
  const [employmentType, setEmploymentType] = useState<Job['employmentType']>('Full-Time');
  const [experience, setExperience] = useState('4+ years');
  const [education, setEducation] = useState("Bachelor's or Master's in CS");
  const [salary, setSalary] = useState('$150,000 - $190,000');
  const [jobDescription, setJobDescription] = useState('');

  // AI Extraction state
  const [analyzing, setAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<Partial<Job> | null>(null);

  const handleAnalyzeWithAI = async () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    const result = await jobsService.analyzeJobDescription(jobDescription, jobTitle);
    setExtractedData(result);
    setAnalyzing(false);
  };

  const handleCreateJob = async () => {
    const finalJob: Omit<Job, 'id' | 'createdAt' | 'candidateCount'> = {
      title: jobTitle || extractedData?.title || 'New AI Position',
      department,
      location,
      employmentType,
      experienceYears: experience,
      education,
      salaryRange: salary,
      description: jobDescription,
      requiredSkills: extractedData?.requiredSkills || ['Python', 'AI Agents'],
      preferredSkills: extractedData?.preferredSkills || ['Docker', 'AWS'],
      responsibilities: extractedData?.responsibilities || ['Develop autonomous pipelines.'],
      status: 'ACTIVE',
      extractedKeywords: extractedData?.extractedKeywords
    };

    const created = await jobsService.createJob(finalJob);
    router.push(`/jobs/${created.id}`);
  };

  return (
    <DashboardLayout role="hr">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white border border-border p-6 rounded-[var(--radius-md)] shadow-lg">
            <h2 className="text-lg font-bold text-text-primary mb-1">Create Job & Trigger AI Extraction</h2>
            <p className="text-xs text-text-secondary mb-6">
              Paste your raw job description below. HireMind AI will extract required skills, keywords, and responsibilities.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Autonomous AI Engineer"
                    className="w-full p-2.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white focus:outline-none"
                  >
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Data Platform">Data Platform</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-2.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full p-2.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Raw Job Description</label>
                <textarea
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste complete job description requirements here..."
                  className="w-full p-3 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
              </div>

              {/* Primary AI Analysis Trigger Button */}
              <button
                type="button"
                disabled={analyzing || !jobDescription.trim()}
                onClick={handleAnalyzeWithAI}
                className="w-full py-3 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-sm)] shadow-lg border border-border transition-colors flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>AI is analyzing your job description...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Analyze Job Description with AI Agent</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Extracted Attributes Results Display */}
          {extractedData && (
            <div className="bg-page-bg border border-border rounded-[var(--radius-md)] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>AI Job Analysis Complete</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-text-secondary uppercase">Required Skills Extracted:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {extractedData.requiredSkills?.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded bg-white border border-border text-text-primary font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-text-secondary uppercase">Extracted Keywords:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {extractedData.extractedKeywords?.map((kw) => (
                      <span key={kw} className="px-2.5 py-1 rounded bg-white text-text-secondary font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateJob}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-extrabold rounded-[var(--radius-sm)] shadow border border-border transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>Confirm & Publish Job Position</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}
