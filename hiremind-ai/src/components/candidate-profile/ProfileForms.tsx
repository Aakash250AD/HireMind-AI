'use client';

import React, { useState } from 'react';
import { HMCard } from '@/components/ui/HMCard';
import { HMInput } from '@/components/ui/HMInput';
import { HMButton } from '@/components/ui/HMButton';
import { Globe, Code, UploadCloud, Plus, Trash2 } from 'lucide-react';

export function ProfileForms() {
  const [skills, setSkills] = useState(['React', 'Node.js', 'Python', 'Machine Learning']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className="space-y-6">
      
      {/* Profile Completion Header */}
      <HMCard className="p-6 bg-gradient-to-r from-hm-deep to-primary border-none text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <h3 className="text-lg font-bold mb-1 relative z-10">Complete your profile</h3>
        <p className="text-xs text-white/80 mb-4 relative z-10">Candidates with complete profiles are easier for recruiters to evaluate.</p>
        
        <div className="w-full bg-white/20 rounded-full h-1.5 mb-4 relative z-10">
          <div className="bg-white h-1.5 rounded-full w-[72%]" />
        </div>
        
        <div className="flex flex-wrap gap-2 relative z-10">
          <button className="text-[11px] font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
            <Plus className="w-3 h-3" /> Add Technical Skills
          </button>
          <button className="text-[11px] font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
            <Plus className="w-3 h-3" /> Add Experience
          </button>
        </div>
      </HMCard>

      {/* Personal Identity */}
      <HMCard className="p-6" id="personal-info">
        <h3 className="text-lg font-bold text-ink mb-4 pb-2 border-b border-border">Personal Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <HMInput label="Full Name" placeholder="e.g. Aakash Karthick" defaultValue="Aakash Karthick" />
          <HMInput label="Email" type="email" placeholder="e.g. aakash@example.com" defaultValue="aakash@example.com" />
          <HMInput label="Phone Number" type="tel" placeholder="+91 9876543210" />
          <HMInput label="Location" placeholder="e.g. Bangalore, India" />
          
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
            <HMInput label="LinkedIn URL" icon={<Globe className="w-4 h-4" />} placeholder="linkedin.com/in/username" />
            <HMInput label="GitHub URL" icon={<Code className="w-4 h-4" />} placeholder="github.com/username" />
            <HMInput label="LeetCode URL" icon={<Code className="w-4 h-4" />} placeholder="leetcode.com/username" />
          </div>
        </div>
      </HMCard>

      {/* Technical Skills */}
      <HMCard className="p-6" id="skills">
        <h3 className="text-lg font-bold text-ink mb-1">Technical Skills</h3>
        <p className="text-xs text-ink-faint mb-4 pb-2 border-b border-border">Tell recruiters what you can build.</p>
        
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-1">
            <HMInput 
              placeholder="e.g. Docker, AWS, React..." 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
          </div>
          <HMButton onClick={addSkill} variant="secondary">Add Skill</HMButton>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <div key={skill} className="flex items-center gap-1.5 bg-surface-sunken border border-border px-3 py-1.5 rounded-full text-xs font-semibold text-ink-soft group">
              {skill}
              <button onClick={() => removeSkill(skill)} className="text-ink-faint hover:text-danger focus:outline-none">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </HMCard>

      {/* Experience Timeline */}
      <HMCard className="p-6" id="experience">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
          <h3 className="text-lg font-bold text-ink">Experience</h3>
          <HMButton size="sm" variant="outline" leftIcon={<Plus className="w-3 h-3" />}>Add</HMButton>
        </div>
        
        <div className="relative pl-6 border-l-2 border-border space-y-6">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-primary" />
            <h4 className="text-sm font-bold text-ink">AI/ML Intern</h4>
            <div className="text-xs font-semibold text-primary mb-1">HireMind Tech • Coimbatore, India</div>
            <div className="text-[11px] text-ink-faint mb-2">Jan 2025 - Present</div>
            <p className="text-xs text-ink-soft leading-relaxed">
              Developed core machine learning models for CV parsing and candidate matching. Improved parsing accuracy by 24% using custom NLP pipelines.
            </p>
          </div>
        </div>
      </HMCard>

      {/* Resume Upload */}
      <HMCard className="p-6" id="resume">
        <h3 className="text-lg font-bold text-ink mb-4 pb-2 border-b border-border">Resume</h3>
        
        <div className="w-full border-2 border-dashed border-primary/30 rounded-[var(--radius-md)] p-8 flex flex-col items-center justify-center bg-primary-tint/30 hover:bg-primary-tint/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-ink mb-1">Drop your resume here</p>
          <p className="text-xs text-ink-faint">Supported: PDF, DOC, DOCX (Max 5MB)</p>
        </div>
      </HMCard>

    </div>
  );
}
