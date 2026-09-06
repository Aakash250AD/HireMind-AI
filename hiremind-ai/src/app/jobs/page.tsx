'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { jobsService } from '@/services/jobs.service';
import { Job } from '@/types';
import { PlusCircle, Search, MapPin, DollarSign, Users, ChevronRight } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  useEffect(() => {
    async function fetchJobs() {
      const data = await jobsService.getJobs();
      setJobs(data || []);
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          j.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = departmentFilter === 'ALL' || j.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-border p-6 rounded-[var(--radius-lg)] shadow-lg">
          <div>
            <h1 className="text-lg font-bold text-text-primary">Job Position Management</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              All open positions monitored by autonomous recruitment agents.
            </p>
          </div>
          <Link
            href="/jobs/create"
            className="px-5 py-3 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] border border-border shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Job</span>
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-border p-4 rounded-[var(--radius-md)]">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search jobs by title or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Departments</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Engineering">Engineering</option>
              <option value="Data Platform">Data Platform</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>
        </div>

        {/* Jobs List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-border hover:border-border-hover hover:shadow-sm rounded-[var(--radius-lg)] p-6 shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/20 border border-border px-2.5 py-0.5 rounded">
                      {job.department}
                    </span>
                    <h3 className="text-base font-bold text-text-primary mt-2">{job.title}</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-[var(--radius-sm)] font-bold bg-emerald-950/60 text-emerald-400 border border-border">
                    {job.status}
                  </span>
                </div>

                <p className="text-xs text-text-secondary mt-2 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-text-secondary" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-text-secondary" />
                    <span className="truncate">{job.salaryRange}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {job.requiredSkills.map((sk) => (
                    <span key={sk} className="text-[10px] px-2 py-0.5 rounded bg-page-bg border border-border text-text-secondary font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-text-secondary font-semibold">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{job.candidateCount} Applicants</span>
                </div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-4 py-2 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-sm)] border border-border transition-colors flex items-center gap-1"
                >
                  <span>Manage Job</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
