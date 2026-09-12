'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusPill } from '@/components/ui/StatusPill';
import { Search, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { jobsService } from '@/services/jobs.service';
import { candidatesService } from '@/services/candidates.service';
import { Job } from '@/types';
import { useRouter } from 'next/navigation';
import { TiltCard } from '@/components/animations/TiltCard';
import { MagneticButton } from '@/components/animations/MagneticButton';

function ApplyModal({ job, onClose, onSuccess }: { job: Job, onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [degree, setDegree] = useState('');

  const handleApply = async () => {
    if (!name.trim()) return alert('Please enter your name.');
    if (!degree.trim()) return alert('Please enter your degree.');
    if (!skills.trim()) return alert('Please enter your skills.');
    if (!fileName.trim()) return alert('Please upload a resume file.');
    
    setLoading(true);
    try {
      await candidatesService.uploadAndScreenResume(fileName, job.id);
      onSuccess();
    } catch (err) {
      alert('Failed to apply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div>
          <h3 className="text-xl font-bold text-ink">Apply for {job.title}</h3>
          <p className="text-sm text-ink-soft mt-1">Please fill in your details to apply.</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-page-bg text-ink"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Degree / Education</label>
            <input 
              type="text" 
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-page-bg text-ink"
              placeholder="e.g. B.S. Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Key Skills</label>
            <input 
              type="text" 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-page-bg text-ink"
              placeholder="e.g. React, TypeScript, Node.js"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Resume Upload</label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              className="w-full px-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-surface-sunken file:text-ink hover:file:bg-border cursor-pointer bg-page-bg"
            />
            <p className="text-xs text-ink-faint mt-1">Accepted formats: PDF, DOC, DOCX, JPG.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleApply} isLoading={loading}>Submit Application</Button>
        </div>
      </Card>
    </div>
  );
}

export default function CandidateJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setLoading(true);
    try {
      const data = await jobsService.getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    (j.requiredSkills || []).some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout role="candidate">
      <div className="space-y-6 max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-ink">Find Jobs</h1>
            <p className="text-sm text-ink-soft">Search and apply for your next great opportunity.</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <Card className="flex items-center gap-3 p-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-surface-sunken border border-border rounded-md">
            <Search className="w-4 h-4 text-ink-faint shrink-0" />
            <input 
              type="text"
              placeholder="Search by title or skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-ink w-full"
            />
          </div>
        </Card>

        {loading ? (
          <div className="py-20 text-center text-ink-faint">Loading jobs...</div>
        ) : (
          <div className="grid gap-4">
            {filteredJobs.length === 0 ? (
              <div className="py-12 text-center text-ink-faint">No jobs found matching your search.</div>
            ) : (
              filteredJobs.map(job => (
                <TiltCard key={job.id} maxTilt={2}>
                  <Card className="flex flex-col md:flex-row md:items-start justify-between gap-6 hover:shadow-md transition-shadow h-full">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-ink-soft mt-1">
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.department}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salaryRange}</span>
                        </div>
                      </div>
                      <StatusPill status={job.status === 'ACTIVE' ? 'Hiring' : job.status} />
                    </div>
                    
                    <p className="text-sm text-ink leading-relaxed line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(job.requiredSkills || []).map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-surface-sunken text-ink-soft border border-border text-xs rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto shrink-0 md:pl-4 md:border-l border-border flex flex-col items-center md:items-end gap-3 justify-center">
                    <MagneticButton>
                      <Button onClick={() => setApplyingJob(job)} className="w-full md:w-32">
                        Apply Now
                      </Button>
                    </MagneticButton>
                  </div>
                  </Card>
                </TiltCard>
              ))
            )}
          </div>
        )}
      </div>

      {applyingJob && (
        <ApplyModal 
          job={applyingJob} 
          onClose={() => setApplyingJob(null)} 
          onSuccess={() => {
            setApplyingJob(null);
            router.push('/candidate/applications');
          }} 
        />
      )}
    </DashboardLayout>
  );
}
