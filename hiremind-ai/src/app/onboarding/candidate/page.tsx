'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileText,
  Award,
  Loader2,
  Plus,
  Trash2
} from 'lucide-react';

const steps = [
  { id: 1, name: 'Personal', icon: User },
  { id: 2, name: 'Education', icon: GraduationCap },
  { id: 3, name: 'Professional', icon: Briefcase },
  { id: 4, name: 'Skills', icon: Code },
  { id: 5, name: 'Projects', icon: FileText },
  { id: 6, name: 'Resume', icon: Award },
  { id: 7, name: 'Complete', icon: CheckCircle2 },
];

export default function CandidateOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // State slices
  const [personal, setPersonal] = useState({ fullName: '', email: '', phone: '', city: '', state: '', country: '', linkedin: '', github: '', portfolio: '', dob: '', gender: '' });
  
  const [educationList, setEducationList] = useState([{ college: '', degree: '', department: '', currentYear: '', graduationYear: '', cgpa: '' }]);
  
  const [professional, setProfessional] = useState({ status: 'Fresher', totalExperience: '', internships: '', preferredRole: '', preferredIndustry: '', preferredLocation: '', workMode: 'Hybrid', expectedSalary: '', noticePeriod: '' });
  
  const [skills, setSkills] = useState<{name: string, proficiency: string}[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentProficiency, setCurrentProficiency] = useState('Intermediate');
  
  const [projects, setProjects] = useState([{ name: '', description: '', technologies: '', role: '', link: '', github: '', duration: '' }]);
  
  const [additional, setAdditional] = useState({ certifications: '', languages: '', softSkills: '', hobbies: '', careerObjective: '' });

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  const finishOnboarding = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/candidate-dashboard');
    }, 1500);
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setSkills([...skills, { name: currentSkill.trim(), proficiency: currentProficiency }]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
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
            Step {currentStep} of 7
          </div>
        </div>
        {/* Mobile Progress Bar */}
        <div className="w-full h-1 bg-page-bg absolute bottom-0 left-0">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(currentStep / 7) * 100}%` }}></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-3xl bg-surface border border-border rounded-[var(--radius-lg)] p-8 md:p-10 shadow-2xl">
          
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Personal Information</h2>
              <p className="text-sm text-ink-faint mb-8">Let's start with your basic contact and location details.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Full Name</label>
                  <input type="text" value={personal.fullName} onChange={e => setPersonal({...personal, fullName: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="Sarah Jenkins" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Email</label>
                  <input type="email" value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="sarah@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input type="tel" value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">City</label>
                  <input type="text" value={personal.city} onChange={e => setPersonal({...personal, city: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="San Francisco" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">LinkedIn Profile</label>
                  <input type="url" value={personal.linkedin} onChange={e => setPersonal({...personal, linkedin: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="https://linkedin.com/in/username" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">GitHub Profile</label>
                  <input type="url" value={personal.github} onChange={e => setPersonal({...personal, github: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="https://github.com/username" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Education</h2>
              <p className="text-sm text-ink-faint mb-8">Add your most recent degree or currently pursuing education.</p>
              
              {educationList.map((edu, idx) => (
                <div key={idx} className="p-6 bg-surface-sunken border border-border rounded-[var(--radius-md)] mb-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">College / University</label>
                      <input type="text" value={edu.college} onChange={e => {
                        const newEd = [...educationList]; newEd[idx].college = e.target.value; setEducationList(newEd);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="Stanford University" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Degree</label>
                      <input type="text" value={edu.degree} onChange={e => {
                        const newEd = [...educationList]; newEd[idx].degree = e.target.value; setEducationList(newEd);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="B.S. Computer Science" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Graduation Year</label>
                      <input type="text" value={edu.graduationYear} onChange={e => {
                        const newEd = [...educationList]; newEd[idx].graduationYear = e.target.value; setEducationList(newEd);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="2025" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">CGPA / Percentage</label>
                      <input type="text" value={edu.cgpa} onChange={e => {
                        const newEd = [...educationList]; newEd[idx].cgpa = e.target.value; setEducationList(newEd);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="3.8" />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setEducationList([...educationList, { college: '', degree: '', department: '', currentYear: '', graduationYear: '', cgpa: '' }])} className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Another Education
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Professional Details</h2>
              <p className="text-sm text-ink-faint mb-8">Help AI match you with the right job profiles.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Current Status</label>
                  <select value={professional.status} onChange={e => setProfessional({...professional, status: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none">
                    <option>Fresher</option>
                    <option>Student</option>
                    <option>Experienced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Total Experience</label>
                  <input type="text" value={professional.totalExperience} onChange={e => setProfessional({...professional, totalExperience: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="e.g. 0 years" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Preferred Job Role</label>
                  <input type="text" value={professional.preferredRole} onChange={e => setProfessional({...professional, preferredRole: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="AI Engineer, Frontend Dev..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Preferred Work Mode</label>
                  <select value={professional.workMode} onChange={e => setProfessional({...professional, workMode: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none">
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Skills Profile</h2>
              <p className="text-sm text-ink-faint mb-8">Add your technical and soft skills to train the matching agent.</p>
              
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={currentSkill} 
                  onChange={e => setCurrentSkill(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="flex-1 px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" 
                  placeholder="e.g. React, Python, Machine Learning..." 
                />
                <select value={currentProficiency} onChange={e => setCurrentProficiency(e.target.value)} className="w-40 px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
                <button type="button" onClick={addSkill} className="px-6 py-3 bg-primary text-white rounded-[var(--radius-md)] text-sm font-bold hover:bg-primary-hover">Add</button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-sm font-semibold text-primary">{skill.name}</span>
                    <span className="text-[10px] uppercase font-bold text-ink-faint bg-surface px-1.5 rounded-sm">{skill.proficiency}</span>
                    <button type="button" onClick={() => removeSkill(idx)} className="text-ink-faint hover:text-danger ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
                {skills.length === 0 && (
                  <div className="text-sm text-ink-faint p-4 text-center w-full border border-dashed border-border rounded-[var(--radius-md)]">
                    No skills added yet. Add some skills above!
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Key Projects</h2>
              <p className="text-sm text-ink-faint mb-8">Showcase your best work to stand out.</p>
              
              {projects.map((proj, idx) => (
                <div key={idx} className="p-6 bg-surface-sunken border border-border rounded-[var(--radius-md)] mb-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Project Name</label>
                      <input type="text" value={proj.name} onChange={e => {
                        const newP = [...projects]; newP[idx].name = e.target.value; setProjects(newP);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="HireMind AI MVP" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Description</label>
                      <textarea rows={2} value={proj.description} onChange={e => {
                        const newP = [...projects]; newP[idx].description = e.target.value; setProjects(newP);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none resize-none" placeholder="A platform for AI recruitment..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Technologies Used</label>
                      <input type="text" value={proj.technologies} onChange={e => {
                        const newP = [...projects]; newP[idx].technologies = e.target.value; setProjects(newP);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="React, Node.js, Python" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Project Link / GitHub</label>
                      <input type="url" value={proj.link} onChange={e => {
                        const newP = [...projects]; newP[idx].link = e.target.value; setProjects(newP);
                      }} className="w-full px-4 py-3 bg-surface border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none" placeholder="https://github.com/..." />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setProjects([...projects, { name: '', description: '', technologies: '', role: '', link: '', github: '', duration: '' }])} className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Another Project
              </button>
            </div>
          )}

          {currentStep === 6 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-extrabold mb-2 text-ink">Resume & Additional Info</h2>
              <p className="text-sm text-ink-faint mb-8">Upload your CV and provide an objective.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-2">Upload Resume (PDF, DOCX)</label>
                  <div className="border-2 border-dashed border-border rounded-[var(--radius-lg)] p-8 text-center hover:bg-surface-sunken transition-colors cursor-pointer">
                    <FileText className="w-8 h-8 text-ink-faint mx-auto mb-3" />
                    <p className="text-sm font-bold text-ink">Click to upload or drag and drop</p>
                    <p className="text-xs text-ink-faint mt-1">Maximum file size 5MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5">Career Objective (About Me)</label>
                  <textarea rows={4} value={additional.careerObjective} onChange={e => setAdditional({...additional, careerObjective: e.target.value})} className="w-full px-4 py-3 bg-surface-sunken border border-border rounded-[var(--radius-md)] text-sm focus:border-primary focus:outline-none resize-none" placeholder="I am a passionate software engineer looking to..." />
                </div>
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-10">
              <div className="w-24 h-24 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-success" />
              </div>
              <h2 className="text-3xl font-extrabold mb-2 text-ink">Your Profile Is Ready!</h2>
              <p className="text-sm text-ink-faint mb-8 max-w-md mx-auto">
                Your professional dossier has been successfully generated. You can now use 1-click applications across the platform without ever retyping your info.
              </p>
              
              <div className="bg-surface-sunken border border-border rounded-[var(--radius-md)] p-6 max-w-sm mx-auto mb-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-ink">Profile Strength</span>
                  <span className="text-sm font-bold text-success">92%</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: '92%' }}></div>
                </div>
                <p className="text-xs text-ink-faint mt-3 text-left">Add 1 more project to reach 100%</p>
              </div>

              <button
                onClick={finishOnboarding}
                disabled={loading}
                className="w-full max-w-sm mx-auto py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-extrabold rounded-[var(--radius-md)] shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Go to Candidate Dashboard</span>}
              </button>
            </div>
          )}

          {/* Bottom Navigation */}
          {currentStep < 7 && (
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
                {currentStep === 6 ? 'Complete Profile' : 'Save & Continue'}
                {currentStep < 6 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
