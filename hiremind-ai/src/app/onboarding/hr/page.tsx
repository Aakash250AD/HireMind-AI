'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { 
  CheckCircle2, 
  ArrowRight, 
  User,
  Briefcase,
  Target,
  Building,
  Loader2
} from 'lucide-react';

const steps = [
  { id: 1, name: 'Personal', icon: User },
  { id: 2, name: 'Professional', icon: Briefcase },
  { id: 3, name: 'Recruitment', icon: Target },
  { id: 4, name: 'Company', icon: Building },
  { id: 5, name: 'Complete', icon: CheckCircle2 },
];

export default function HROnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [personal, setPersonal] = useState({ fullName: '', email: '', phone: '', city: '', linkedin: '' });
  const [professional, setProfessional] = useState({ jobTitle: '', companyName: '', department: '', yearsExperience: '', industry: '' });
  const [recruitment, setRecruitment] = useState({ hiringRoles: '', experienceLevel: 'Mid-Level', workMode: 'Hybrid', hiringFrequency: 'Monthly' });
  const [company, setCompany] = useState({ companyName: '', industry: '', website: '', size: '', headquarters: '', description: '' });

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const finishOnboarding = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-hm-bg flex flex-col font-sans text-ink">
      
      {/* Top Navbar / Progress */}
      <header className="bg-surface border-b border-border sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="hidden md:flex items-center gap-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex flex-col items-center gap-1 ${currentStep >= step.id ? 'text-primary' : 'text-ink-faint'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep === step.id ? 'border-primary bg-primary/10' : 
                    currentStep > step.id ? 'border-primary bg-primary text-white' : 'border-border bg-page-bg'
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mb-4 ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-xs font-bold text-ink-soft">
            Step {currentStep} of 5
          </div>
        </div>
        {/* Mobile Progress Bar */}
        <div className="w-full h-1 bg-page-bg absolute bottom-0 left-0">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(currentStep / 5) * 100}%` }}></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-3xl bg-surface border border-border rounded-[var(--radius-lg)] p-8 md:p-10 shadow-2xl">
          
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Personal Information</h2>
              <p className="text-sm text-ink-faint mb-8">Basic contact details for your recruiter profile.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Full Name</label>
                  <input type="text" value={personal.fullName} onChange={e => setPersonal({...personal, fullName: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="Arun Kumar" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Email</label>
                  <input type="email" value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="arun@abctech.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input type="tel" value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">LinkedIn Profile</label>
                  <input type="url" value={personal.linkedin} onChange={e => setPersonal({...personal, linkedin: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Professional Details</h2>
              <p className="text-sm text-ink-faint mb-8">What is your role within your organization?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Job Title</label>
                  <input type="text" value={professional.jobTitle} onChange={e => setProfessional({...professional, jobTitle: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="Talent Acquisition Specialist" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Company Name</label>
                  <input type="text" value={professional.companyName} onChange={e => setProfessional({...professional, companyName: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="ABC Technologies" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Department</label>
                  <input type="text" value={professional.department} onChange={e => setProfessional({...professional, department: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="Human Resources" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Years of Experience</label>
                  <input type="text" value={professional.yearsExperience} onChange={e => setProfessional({...professional, yearsExperience: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="e.g. 4 Years" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Recruitment Preferences</h2>
              <p className="text-sm text-ink-faint mb-8">Help us personalize your dashboard for the roles you hire.</p>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Primary Hiring Roles</label>
                  <input type="text" value={recruitment.hiringRoles} onChange={e => setRecruitment({...recruitment, hiringRoles: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="e.g. AI Engineer, Full Stack Developer (comma separated)" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Target Experience Level</label>
                    <select value={recruitment.experienceLevel} onChange={e => setRecruitment({...recruitment, experienceLevel: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none">
                      <option>Fresher</option>
                      <option>0-2 Years</option>
                      <option>2-5 Years</option>
                      <option>5+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Hiring Frequency</label>
                    <select value={recruitment.hiringFrequency} onChange={e => setRecruitment({...recruitment, hiringFrequency: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none">
                      <option>Occasionally</option>
                      <option>Monthly</option>
                      <option>Frequently</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Company Profile</h2>
              <p className="text-sm text-ink-faint mb-8">This information will be displayed on your job postings.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Company Description</label>
                  <textarea rows={3} value={company.description} onChange={e => setCompany({...company, description: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none resize-none" placeholder="A brief description of your company..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Website URL</label>
                  <input type="url" value={company.website} onChange={e => setCompany({...company, website: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="https://abctech.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Headquarters / Location</label>
                  <input type="text" value={company.headquarters} onChange={e => setCompany({...company, headquarters: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="New York, NY" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Company Size</label>
                  <select value={company.size} onChange={e => setCompany({...company, size: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none">
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Industry</label>
                  <input type="text" value={company.industry} onChange={e => setCompany({...company, industry: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="Information Technology" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-10">
              <div className="w-24 h-24 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-success" />
              </div>
              <h2 className="text-3xl font-extrabold mb-2 text-ink">Your Recruiter Profile Is Ready</h2>
              <p className="text-sm text-ink-faint mb-8 max-w-md mx-auto">
                Your hiring preferences and company details have been successfully configured. You are now ready to post jobs and verify talent.
              </p>
              
              <div className="bg-surface-sunken border border-border rounded-[var(--radius-md)] p-6 max-w-sm mx-auto mb-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-ink">Profile Strength</span>
                  <span className="text-sm font-bold text-success">95% Complete</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: '95%' }}></div>
                </div>
              </div>

              <button
                onClick={finishOnboarding}
                disabled={loading}
                className="w-full max-w-sm mx-auto py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-extrabold rounded-[var(--radius-md)] shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Go to HR Dashboard</span>}
              </button>
            </div>
          )}

          {/* Bottom Navigation */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              {currentStep > 1 ? (
                <button type="button" onClick={handleBack} className="px-6 py-2.5 text-sm font-bold text-ink hover:bg-surface-sunken rounded-[var(--radius-md)] border border-border transition-colors">
                  Back
                </button>
              ) : <div></div>}
              
              <button 
                type="button" 
                onClick={handleNext}
                className="px-8 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-extrabold rounded-[var(--radius-md)] shadow-md transition-all flex items-center gap-2"
              >
                {currentStep === 4 ? 'Complete Profile' : 'Save & Continue'}
                {currentStep < 4 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
