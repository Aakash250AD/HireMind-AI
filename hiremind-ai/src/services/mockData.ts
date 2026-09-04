import { Job, Candidate, InterviewSession, ShortlistEntry, AutomationWorkflow, EmailCommunication, NotificationItem, AnalyticsSummary } from '@/types';

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior AI / Machine Learning Engineer',
    department: 'Artificial Intelligence',
    location: 'San Francisco, CA (Hybrid)',
    employmentType: 'Full-Time',
    experienceYears: '4+ years',
    education: "Master's or Bachelor's in CS / AI",
    salaryRange: '$160,000 - $210,000',
    description: 'We are seeking an exceptional AI/ML Engineer to lead the design and deployment of fine-tuned LLM agents and retrieval-augmented systems.',
    requiredSkills: ['Python', 'PyTorch', 'LLMs', 'FastAPI', 'Vector DBs', 'SQL'],
    preferredSkills: ['LangChain', 'Docker', 'Kubernetes', 'AWS SageMaker'],
    responsibilities: [
      'Architect and train domain-specific language models and multi-agent systems.',
      'Optimize latency and throughput of LLM inference pipelines.',
      'Collaborate with product managers to deliver autonomous workflow agents.'
    ],
    status: 'ACTIVE',
    candidateCount: 48,
    createdAt: '2026-08-20',
    extractedKeywords: ['Transformers', 'RAG', 'Agentic AI', 'PyTorch', 'Distributed Systems']
  },
  {
    id: 'job-2',
    title: 'Full Stack React & Node Architect',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'Full-Time',
    experienceYears: '5+ years',
    education: "Bachelor's in Computer Science",
    salaryRange: '$140,000 - $185,000',
    description: 'Lead the frontend architecture and backend API integrations for our next-generation web application.',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    preferredSkills: ['GraphQL', 'Redis', 'WebSockets', 'CI/CD Pipelines'],
    responsibilities: [
      'Build modular, scalable web apps with high performance and accessibility.',
      'Establish UI/UX design tokens and component libraries.',
      'Integrate third-party REST APIs and Webhook pipelines.'
    ],
    status: 'ACTIVE',
    candidateCount: 62,
    createdAt: '2026-08-22',
    extractedKeywords: ['Next.js', 'State Management', 'TypeScript', 'Rest API', 'Performance']
  },
  {
    id: 'job-3',
    title: 'Lead Data Engineer & Pipeline Architect',
    department: 'Data Platform',
    location: 'New York, NY',
    employmentType: 'Full-Time',
    experienceYears: '6+ years',
    education: "Bachelor's or Master's in Data Engineering",
    salaryRange: '$170,000 - $220,000',
    description: 'Build real-time ETL pipelines and data warehouses supporting large-scale AI automation platform analytics.',
    requiredSkills: ['Python', 'SQL', 'Apache Spark', 'Snowflake', 'Airflow', 'dbt'],
    preferredSkills: ['Kafka', 'Databricks', 'AWS Redshift'],
    responsibilities: [
      'Design fault-tolerant data pipelines processing millions of daily recruiter events.',
      'Ensure strict data privacy, SOC2 compliance, and encryption standards.'
    ],
    status: 'ACTIVE',
    candidateCount: 35,
    createdAt: '2026-08-25',
    extractedKeywords: ['ETL', 'Spark', 'Data Governance', 'Snowflake', 'Big Data']
  },
  {
    id: 'job-4',
    title: 'Senior DevOps & Autonomous Infrastructure Engineer',
    department: 'Infrastructure',
    location: 'Austin, TX (Hybrid)',
    employmentType: 'Full-Time',
    experienceYears: '4+ years',
    education: "Bachelor's in CS / IT",
    salaryRange: '$150,000 - $190,000',
    description: 'Manage cloud infrastructure, automated deployment pipelines, and zero-downtime microservices.',
    requiredSkills: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Prometheus'],
    preferredSkills: ['Helm', 'ArgoCD', 'Python Scripting'],
    responsibilities: [
      'Maintain 99.99% uptime for backend microservice triggers and webhook routers.',
      'Implement zero-trust security and continuous automated integration.'
    ],
    status: 'ACTIVE',
    candidateCount: 29,
    createdAt: '2026-08-28',
    extractedKeywords: ['Kubernetes', 'Terraform', 'CI/CD', 'AWS', 'Security']
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Arun Kumar',
    email: 'arun.kumar@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    currentRole: 'Senior Machine Learning Engineer at AI Labs',
    experienceYears: 5,
    education: 'M.S. in Computer Science, Stanford University',
    resumeUrl: '/resumes/arun_kumar_cv.pdf',
    appliedJobId: 'job-1',
    jobTitle: 'Senior AI / Machine Learning Engineer',
    appliedDate: '2026-08-28',
    stage: 'Shortlisted',
    matchScore: 94,
    interviewScore: 91,
    verificationScore: 95,
    overallScore: 93,
    skills: ['Python', 'PyTorch', 'LLMs', 'FastAPI', 'SQL', 'Docker', 'LangChain'],
    summary: 'Demonstrated extensive experience building RAG systems and multi-agent LLM frameworks with verified open-source contributions and strong technical communication.',
    verifications: [
      {
        claim: 'Python & LLM Agent Architecture Expert',
        category: 'Core AI',
        status: 'VERIFIED',
        confidence: 96,
        resumeEvidence: 'Built LLM multi-agent framework serving 50k daily active users.',
        interviewEvidence: 'Correctly articulated transformer attention mechanisms, quantization strategies, and latency optimization techniques during AI interview.',
        assessmentEvidence: 'Passed automated coding challenge with 100% test coverage for asynchronous Python agent pipelines.',
        explanation: 'AI detected direct, cross-verifiable evidence across resume projects, live interview technical responses, and benchmark code execution.'
      },
      {
        claim: 'Machine Learning Infrastructure & PyTorch',
        category: 'Frameworks',
        status: 'VERIFIED',
        confidence: 94,
        resumeEvidence: '4 years implementing PyTorch models for NLP tasks.',
        interviewEvidence: 'Deep understanding of distributed training (DDP) and GPU memory profiling.',
        assessmentEvidence: 'Verified via GitHub commit records attached to profile.',
        explanation: 'Strong consistency between claimed experience and technical evaluation performance.'
      },
      {
        claim: 'Kubernetes & Production Cloud Deployment',
        category: 'DevOps',
        status: 'PARTIALLY VERIFIED',
        confidence: 68,
        resumeEvidence: 'Lists Kubernetes deployment in current role.',
        interviewEvidence: 'Answered basic pod configuration questions, but lacked depth on ingress controller troubleshooting.',
        assessmentEvidence: 'No direct deployment repository provided in candidate portfolio.',
        explanation: 'Evidence suggests foundational user knowledge rather than senior infrastructure mastery. Recommended for technical interview validation.'
      }
    ],
    recruiterNotes: 'Arun is top candidate for Job-1. Impressive background in agentic LLM design.',
    decisionStatus: 'APPROVED'
  },
  {
    id: 'cand-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 876-5432',
    location: 'San Jose, CA',
    currentRole: 'Staff Frontend Engineer at WebTech',
    experienceYears: 6,
    education: 'B.S. in Software Engineering, UC Berkeley',
    resumeUrl: '/resumes/priya_sharma_cv.pdf',
    appliedJobId: 'job-2',
    jobTitle: 'Full Stack React & Node Architect',
    appliedDate: '2026-08-29',
    stage: 'Shortlisted',
    matchScore: 92,
    interviewScore: 89,
    verificationScore: 93,
    overallScore: 91,
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    summary: 'Expert React architect with proven track record leading design system implementations and high-throughput TypeScript microservices.',
    verifications: [
      {
        claim: 'React & Next.js Architecture Specialist',
        category: 'Frontend',
        status: 'VERIFIED',
        confidence: 95,
        resumeEvidence: 'Architected enterprise UI system used by 200+ internal developers.',
        interviewEvidence: 'Demonstrated superior knowledge of SSR, React Server Components, and client render optimization.',
        assessmentEvidence: 'Created clean, modular component library during live interactive coding module.',
        explanation: 'High confidence match backed by code quality and articulate technical explanation.'
      },
      {
        claim: 'PostgreSQL & Database Optimization',
        category: 'Backend',
        status: 'VERIFIED',
        confidence: 91,
        resumeEvidence: 'Optimized complex query execution times by 40%.',
        interviewEvidence: 'Explained index types, query execution plans, and connection pooling efficiently.',
        assessmentEvidence: 'Passed SQL schema design test with optimal indexing strategy.',
        explanation: 'Evidence fully validates backend database capabilities.'
      }
    ],
    recruiterNotes: 'Excellent communication and technical maturity. Ready for final partner call.',
    decisionStatus: 'PENDING'
  },
  {
    id: 'cand-3',
    name: 'Karthik S',
    email: 'karthik.s@example.com',
    phone: '+1 (555) 432-1098',
    location: 'Austin, TX',
    currentRole: 'Senior Data Engineer at Analytics Platform',
    experienceYears: 5,
    education: 'M.S. in Data Analytics, UT Austin',
    resumeUrl: '/resumes/karthik_cv.pdf',
    appliedJobId: 'job-3',
    jobTitle: 'Lead Data Engineer & Pipeline Architect',
    appliedDate: '2026-08-30',
    stage: 'Human Review',
    matchScore: 88,
    interviewScore: 86,
    verificationScore: 89,
    overallScore: 87,
    skills: ['Python', 'SQL', 'Apache Spark', 'Snowflake', 'Airflow', 'dbt'],
    summary: 'Strong data platform background with emphasis on Snowflake data modeling and Airflow DAG automation.',
    verifications: [
      {
        claim: 'Apache Spark & Big Data ETL',
        category: 'Data',
        status: 'VERIFIED',
        confidence: 90,
        resumeEvidence: 'Processed 10TB+ daily streaming datasets using PySpark.',
        interviewEvidence: 'Discussed memory management and shuffle partitions accurately.',
        assessmentEvidence: 'Successfully answered Spark cluster optimization scenario.',
        explanation: 'High evidence alignment for big data streaming.'
      }
    ],
    recruiterNotes: 'Candidate demonstrates solid alignment with core data pipeline needs.',
    decisionStatus: 'PENDING'
  },
  {
    id: 'cand-4',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Seattle, WA',
    currentRole: 'DevOps Lead at Cloud Scale',
    experienceYears: 7,
    education: 'B.S. in Computer Science, University of Washington',
    resumeUrl: '/resumes/elena_cv.pdf',
    appliedJobId: 'job-4',
    jobTitle: 'Senior DevOps & Autonomous Infrastructure Engineer',
    appliedDate: '2026-08-31',
    stage: 'Interview',
    matchScore: 90,
    interviewScore: 88,
    verificationScore: 92,
    overallScore: 90,
    skills: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Prometheus'],
    summary: 'Cloud infrastructure expert specializing in automated CI/CD pipelines, Kubernetes cluster provisioning, and security compliance.',
    verifications: [
      {
        claim: 'Terraform & Infrastructure as Code',
        category: 'DevOps',
        status: 'VERIFIED',
        confidence: 93,
        resumeEvidence: 'Managed multi-region AWS infrastructure via Terraform modules.',
        interviewEvidence: 'Described state management, module locking, and drift detection mechanisms clearly.',
        assessmentEvidence: 'Submitted valid Terraform module during screening task.',
        explanation: 'Strong confidence verified across all assessment nodes.'
      }
    ],
    decisionStatus: 'PENDING'
  },
  {
    id: 'cand-5',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Chicago, IL',
    currentRole: 'AI Researcher at Cognitive Corp',
    experienceYears: 3,
    education: 'Ph.D. Candidate in CS (ML focus), UChicago',
    resumeUrl: '/resumes/marcus_cv.pdf',
    appliedJobId: 'job-1',
    jobTitle: 'Senior AI / Machine Learning Engineer',
    appliedDate: '2026-09-01',
    stage: 'Verification',
    matchScore: 85,
    interviewScore: 84,
    verificationScore: 78,
    overallScore: 82,
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'FastAPI'],
    summary: 'Deep academic background in transformer architectures and model fine-tuning with 3 published papers.',
    verifications: [
      {
        claim: 'Production Microservices with FastAPI',
        category: 'Backend',
        status: 'UNVERIFIED',
        confidence: 45,
        resumeEvidence: 'Claims 3 years deploying high-scale APIs.',
        interviewEvidence: 'Interview responses focused mainly on academic script execution rather than production async server tuning.',
        assessmentEvidence: 'Insufficient repository evidence provided.',
        explanation: 'Claim requires additional recruiter verification during follow-up technical screen.'
      }
    ],
    decisionStatus: 'PENDING'
  }
];

export const MOCK_INTERVIEWS: InterviewSession[] = [
  {
    id: 'int-session-101',
    candidateId: 'cand-1',
    candidateName: 'Arun Kumar',
    jobId: 'job-1',
    jobTitle: 'Senior AI / Machine Learning Engineer',
    status: 'COMPLETED',
    scheduledAt: '2026-09-01 14:00',
    durationMinutes: 25,
    mode: 'voice',
    currentQuestionIndex: 5,
    questions: [
      {
        id: 'q1',
        question: 'Can you describe your experience fine-tuning Large Language Models for agentic autonomous workflows?',
        targetSkill: 'LLMs',
        candidateAnswer: 'I implemented QLoRA fine-tuning on Llama 3 models using custom synthetic datasets tailored for JSON output function calling, reducing structured output parse errors from 14% to under 0.8%.',
        score: 95,
        aiFeedback: 'Excellent technical depth, quantitative metrics provided, and clear domain mastery.'
      },
      {
        id: 'q2',
        question: 'How do you handle vector database indexing latency and recall precision in RAG systems?',
        targetSkill: 'Vector DBs',
        candidateAnswer: 'We utilized HNSW indexing in Qdrant with hybrid keyword-sparse and dense vector embeddings, maintaining sub-40ms P99 query latency over 10M document chunks.',
        score: 92,
        aiFeedback: 'Articulated trade-offs between indexing precision and latency effectively.'
      },
      {
        id: 'q3',
        question: 'Explain how you approach error handling and recovery when an AI agent encounters unparseable LLM output.',
        targetSkill: 'Agentic AI',
        candidateAnswer: 'We enforce strict Pydantic schema validation at the output node level. If parsing fails, a light fallback prompt with the validation error payload is sent to the LLM for self-correction, capped at 2 retry iterations.',
        score: 94,
        aiFeedback: 'Robust software engineering pattern for production agent stability.'
      }
    ],
    technicalScore: 94,
    communicationScore: 90,
    problemSolvingScore: 92,
    roleFitScore: 93,
    overallScore: 92,
    aiSummary: {
      strengths: [
        'Exceptional understanding of LLM agent architectures and Pydantic function calling.',
        'Strong quantitative approach to measuring model accuracy and latency.',
        'Articulate and structured communication style.'
      ],
      concerns: [
        'Slightly less emphasis on front-facing UI integration, though sufficient for pure AI core role.'
      ],
      areasToVerify: [
        'Confirm team leadership and mentorship background.'
      ],
      recommendation: 'Recommended for final recruiter review'
    }
  }
];

export const MOCK_SHORTLIST: ShortlistEntry[] = [
  {
    rank: 1,
    candidate: MOCK_CANDIDATES[0],
    explainableReasoning: 'Candidate matches 94% of required skills, demonstrated outstanding LLM agent architecture knowledge during the interactive AI interview, and claims were cross-verified with 95% AI evidence confidence.'
  },
  {
    rank: 2,
    candidate: MOCK_CANDIDATES[1],
    explainableReasoning: 'Candidate achieves 92% skill alignment with deep Next.js and TypeScript architectural experience. High interview communication score (89%) and verified database capabilities.'
  },
  {
    rank: 3,
    candidate: MOCK_CANDIDATES[3],
    explainableReasoning: 'Demonstrates 90% match for DevOps requirements. Strong Terraform IaC evidence with 92% verification confidence score.'
  }
];

export const MOCK_AUTOMATIONS: AutomationWorkflow[] = [
  {
    id: 'wf-1',
    name: 'Job Description AI Parser',
    description: 'Extracts skills, experience, responsibilities, and key attributes from raw job postings.',
    status: 'COMPLETED',
    lastRun: '5 minutes ago',
    duration: '1.2s',
    processedCount: 12,
    nodeCount: 4
  },
  {
    id: 'wf-2',
    name: 'Resume Screening & Candidate Match Agent',
    description: 'Parses incoming resumes (PDF/DOCX), ranks experience against JD keywords, and calculates match scores.',
    status: 'RUNNING',
    lastRun: 'Just now',
    duration: '3.4s',
    processedCount: 276,
    nodeCount: 7
  },
  {
    id: 'wf-3',
    name: 'AI Conversational Interview Evaluator',
    description: 'Conducts interactive audio/text interview sessions and generates multi-dimensional skill evaluations.',
    status: 'COMPLETED',
    lastRun: '18 minutes ago',
    duration: '24s',
    processedCount: 42,
    nodeCount: 9
  },
  {
    id: 'wf-4',
    name: 'Evidence-Based Skill Verification Engine',
    description: 'Cross-references claimed skills against resume bullet points, interview transcripts, and coding assessments.',
    status: 'COMPLETED',
    lastRun: '1 hour ago',
    duration: '8.6s',
    processedCount: 94,
    nodeCount: 6
  },
  {
    id: 'wf-5',
    name: 'Automated Recruiter Communication & Scheduling',
    description: 'Triggers personalized invitation emails and connects with calendar scheduling endpoints.',
    status: 'WAITING',
    lastRun: '2 hours ago',
    duration: '0.9s',
    processedCount: 180,
    nodeCount: 5
  }
];

export const MOCK_EMAILS: EmailCommunication[] = [
  {
    id: 'email-1',
    candidateName: 'Arun Kumar',
    candidateEmail: 'arun.kumar@example.com',
    emailType: 'Shortlist Notification',
    status: 'SENT',
    sentTime: '2026-09-02 10:15 AM',
    subject: 'HireMind AI — Congratulations! You have been shortlisted for Senior AI Engineer',
    preview: 'Dear Arun, We are pleased to inform you that following your AI skill verification and interview...'
  },
  {
    id: 'email-2',
    candidateName: 'Priya Sharma',
    candidateEmail: 'priya.sharma@example.com',
    emailType: 'Interview Invitation',
    status: 'SENT',
    sentTime: '2026-09-02 11:30 AM',
    subject: 'HireMind AI — Interactive AI Technical Interview Session',
    preview: 'Hi Priya, You are invited to complete your 20-minute autonomous AI technical interview...'
  },
  {
    id: 'email-3',
    candidateName: 'Marcus Vance',
    candidateEmail: 'marcus.vance@example.com',
    emailType: 'Follow-up Email',
    status: 'PENDING',
    sentTime: 'Scheduled for 3:00 PM',
    subject: 'HireMind AI — Additional Verification Documents Requested',
    preview: 'Hello Marcus, To complete your skill verification process for FastAPI microservices...'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '5 New Candidates Applied',
    message: 'New resumes submitted for Senior AI / Machine Learning Engineer job position.',
    timestamp: '10 minutes ago',
    type: 'candidate',
    unread: true,
    actionUrl: '/candidates'
  },
  {
    id: 'notif-2',
    title: 'AI Screening Completed',
    message: 'Automated screening processed 48 resumes with an average match score of 84%.',
    timestamp: '35 minutes ago',
    type: 'system',
    unread: true,
    actionUrl: '/automations'
  },
  {
    id: 'notif-3',
    title: 'Interview Completed — Arun Kumar',
    message: 'AI Interview finished with 92% overall score. Recommended for recruiter review.',
    timestamp: '1 hour ago',
    type: 'interview',
    unread: false,
    actionUrl: '/interviews/int-session-101'
  },
  {
    id: 'notif-4',
    title: 'Skill Verification Finalized',
    message: '3 candidates require final recruiter decision review in the Shortlist panel.',
    timestamp: '2 hours ago',
    type: 'verification',
    unread: false,
    actionUrl: '/shortlist'
  }
];

export const MOCK_ANALYTICS: AnalyticsSummary = {
  timeToScreenDays: 0.2, // ~4 hours vs traditional 4 days
  timeToHireDays: 4.5,
  candidatesScreened: 348,
  interviewCompletionRate: 94,
  shortlistRate: 18,
  verificationRate: 88,
  applicationsOverTime: [
    { date: 'Aug 25', count: 24 },
    { date: 'Aug 26', count: 42 },
    { date: 'Aug 27', count: 58 },
    { date: 'Aug 28', count: 76 },
    { date: 'Aug 29', count: 95 },
    { date: 'Aug 30', count: 110 },
    { date: 'Aug 31', count: 140 },
    { date: 'Sep 01', count: 185 }
  ],
  candidateScoreDistribution: [
    { range: '90-100%', count: 18 },
    { range: '80-89%', count: 42 },
    { range: '70-79%', count: 85 },
    { range: '60-69%', count: 94 },
    { range: '<60%', count: 109 }
  ],
  pipelineFunnel: [
    { stage: 'Applied', count: 348 },
    { stage: 'Screened', count: 276 },
    { stage: 'Interviewed', count: 42 },
    { stage: 'Verified', count: 32 },
    { stage: 'Shortlisted', count: 18 },
    { stage: 'Hired', count: 6 }
  ]
};
