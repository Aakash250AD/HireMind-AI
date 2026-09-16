export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  linkedin: string;
  dob?: string;
  gender?: string;
  github?: string;
  portfolio?: string;
}

export interface Education {
  id: string;
  college: string;
  degree: string;
  department: string;
  currentYear: string;
  graduationYear: string;
  cgpa: string;
  tenthPercentage?: string;
  twelfthPercentage?: string;
}

export interface Experience {
  status: 'Fresher' | 'Student' | 'Experienced';
  totalExperience: string;
  internships: string;
  preferredRole: string;
  preferredIndustry: string;
  preferredLocation: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  expectedSalary?: string;
  noticePeriod?: string;
}

export interface Skill {
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  role: string;
  link?: string;
  github?: string;
  duration: string;
}

export interface CandidatePreferences {
  certifications: string;
  achievements: string;
  languages: string;
  softSkills: string;
  hobbies: string;
  careerObjective: string;
}

export interface CandidateProfile {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience;
  skills: Skill[];
  projects: Project[];
  preferences: CandidatePreferences;
  resumeUrl?: string;
  profileCompletion: number;
}

export interface HRProfessionalInfo {
  jobTitle: string;
  companyName: string;
  department: string;
  yearsExperience: string;
  industry: string;
  companySize: string;
  workLocation: string;
  workEmail?: string;
  linkedin?: string;
}

export interface HRRecruitmentInfo {
  hiringRoles: string[];
  experienceLevel: string[];
  locations: string[];
  workMode: string[];
  hiringFrequency: string;
}

export interface HRCompanyInfo {
  companyName: string;
  logoUrl?: string;
  industry: string;
  website: string;
  size: string;
  headquarters: string;
  description: string;
  linkedin?: string;
}

export interface HRProfile {
  personalInfo: PersonalInfo;
  professionalInfo: HRProfessionalInfo;
  recruitmentInfo: HRRecruitmentInfo;
  companyInfo: HRCompanyInfo;
  profileCompletion: number;
}
