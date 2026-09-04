MOCK_JOBS = [
    {
        'id': 'job-1',
        'title': 'Senior AI / Machine Learning Engineer',
        'department': 'Artificial Intelligence',
        'location': 'San Francisco, CA (Hybrid)',
        'employment_type': 'Full-Time',
        'experience_years': '4+ years',
        'education': "Master's or Bachelor's in CS / AI",
        'salary_range': '$160,000 - $210,000',
        'description': 'Lead the design and deployment of fine-tuned LLM agents and retrieval-augmented systems.',
        'required_skills': ['Python', 'PyTorch', 'LLMs', 'FastAPI', 'Vector DBs', 'SQL'],
        'preferred_skills': ['LangChain', 'Docker', 'Kubernetes', 'AWS SageMaker'],
        'responsibilities': [
            'Architect and train domain-specific language models and multi-agent systems.',
            'Optimize latency and throughput of LLM inference pipelines.'
        ],
        'status': 'ACTIVE',
        'candidate_count': 48,
        'created_at': '2026-08-20',
        'extracted_keywords': ['Transformers', 'RAG', 'Agentic AI', 'PyTorch']
    },
    {
        'id': 'job-2',
        'title': 'Full Stack Architect',
        'department': 'Engineering',
        'location': 'Remote',
        'employment_type': 'Full-Time',
        'experience_years': '5+ years',
        'education': "Bachelor's in Computer Science",
        'salary_range': '$140,000 - $185,000',
        'description': 'Lead frontend architecture and backend API integrations for enterprise SaaS.',
        'required_skills': ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
        'preferred_skills': ['GraphQL', 'Redis', 'CI/CD Pipelines'],
        'responsibilities': [
            'Build modular, scalable web apps with high performance and accessibility.'
        ],
        'status': 'ACTIVE',
        'candidate_count': 62,
        'created_at': '2026-08-22',
        'extracted_keywords': ['State Management', 'TypeScript', 'Rest API']
    }
]

MOCK_CANDIDATES = [
    {
        'id': 'cand-1',
        'name': 'Arun Kumar',
        'email': 'arun.kumar@example.com',
        'phone': '+1 (555) 234-5678',
        'location': 'San Francisco, CA',
        'current_role': 'Senior Machine Learning Engineer at AI Labs',
        'experience_years': 5,
        'education': 'M.S. in Computer Science, Stanford University',
        'resume_url': '/resumes/arun_kumar_cv.pdf',
        'applied_job_id': 'job-1',
        'job_title': 'Senior AI / Machine Learning Engineer',
        'applied_date': '2026-08-28',
        'stage': 'Shortlisted',
        'match_score': 94,
        'interview_score': 91,
        'verification_score': 95,
        'overall_score': 93,
        'skills': ['Python', 'PyTorch', 'LLMs', 'FastAPI', 'SQL', 'Docker', 'LangChain'],
        'summary': 'Demonstrated extensive experience building RAG systems and multi-agent LLM frameworks.',
        'verifications': [
            {
                'claim': 'Python & LLM Agent Architecture Expert',
                'category': 'Core AI',
                'status': 'VERIFIED',
                'confidence': 96,
                'resumeEvidence': 'Built LLM multi-agent framework serving 50k daily active users.',
                'interviewEvidence': 'Correctly articulated transformer attention mechanisms and quantization.',
                'assessmentEvidence': 'Passed automated coding challenge with 100% test coverage.',
                'explanation': 'AI detected direct, cross-verifiable evidence across resume, interview, and code.'
            },
            {
                'claim': 'Kubernetes Cloud Deployment',
                'category': 'DevOps',
                'status': 'PARTIALLY VERIFIED',
                'confidence': 68,
                'resumeEvidence': 'Lists Kubernetes deployment in current role.',
                'interviewEvidence': 'Lacked depth on ingress controller troubleshooting.',
                'assessmentEvidence': 'No direct deployment repository provided.',
                'explanation': 'Foundational user knowledge rather than senior infrastructure mastery.'
            }
        ],
        'recruiter_notes': 'Top candidate for Job-1. Impressive background.',
        'decision_status': 'APPROVED'
    },
    {
        'id': 'cand-2',
        'name': 'Priya Sharma',
        'email': 'priya.sharma@example.com',
        'phone': '+1 (555) 876-5432',
        'location': 'San Jose, CA',
        'current_role': 'Staff Engineer at WebTech',
        'experience_years': 6,
        'education': 'B.S. in Software Engineering, UC Berkeley',
        'resume_url': '/resumes/priya_sharma_cv.pdf',
        'applied_job_id': 'job-2',
        'job_title': 'Full Stack Architect',
        'applied_date': '2026-08-29',
        'stage': 'Shortlisted',
        'match_score': 92,
        'interview_score': 89,
        'verification_score': 93,
        'overall_score': 91,
        'skills': ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
        'summary': 'Expert React architect leading component library implementations.',
        'verifications': [
            {
                'claim': 'React & TypeScript Architecture',
                'category': 'Frontend',
                'status': 'VERIFIED',
                'confidence': 95,
                'resumeEvidence': 'Architected UI system used by 200+ internal developers.',
                'interviewEvidence': 'Demonstrated superior knowledge of SSR and optimization.',
                'assessmentEvidence': 'Passed code design module.',
                'explanation': 'High confidence match backed by code quality.'
            }
        ],
        'recruiter_notes': 'Ready for partner screen.',
        'decision_status': 'PENDING'
    }
]

MOCK_INTERVIEWS = [
    {
        'id': 'int-session-101',
        'candidate_id': 'cand-1',
        'candidate_name': 'Arun Kumar',
        'job_id': 'job-1',
        'job_title': 'Senior AI / Machine Learning Engineer',
        'status': 'COMPLETED',
        'scheduled_at': '2026-09-01 14:00',
        'duration_minutes': 25,
        'mode': 'voice',
        'current_question_index': 3,
        'questions': [
            {
                'id': 'q1',
                'question': 'Can you describe your experience fine-tuning LLMs for agentic workflows?',
                'targetSkill': 'LLMs',
                'candidateAnswer': 'I implemented QLoRA fine-tuning on Llama 3 models using custom synthetic datasets, reducing structured output parse errors to under 0.8%.',
                'score': 95,
                'aiFeedback': 'Excellent technical depth and quantitative metrics.'
            }
        ],
        'technical_score': 94,
        'communication_score': 90,
        'problem_solving_score': 92,
        'role_fit_score': 93,
        'overall_score': 92,
        'ai_summary': {
            'strengths': ['Exceptional LLM understanding', 'Quantitative metrics'],
            'concerns': ['Minor detail missing on edge-cases'],
            'areasToVerify': ['Confirm team leadership'],
            'recommendation': 'Recommended for recruiter review'
        }
    }
]

MOCK_AUTOMATIONS = [
    {
        'id': 'wf-1',
        'name': 'Job Description AI Parser',
        'description': 'Extracts skills, experience, and responsibilities.',
        'status': 'COMPLETED',
        'last_run': '5 minutes ago',
        'duration': '1.2s',
        'processed_count': 12,
        'node_count': 4
    },
    {
        'id': 'wf-2',
        'name': 'Resume Screening & Candidate Match Agent',
        'description': 'Parses incoming resumes and ranks experience.',
        'status': 'RUNNING',
        'last_run': 'Just now',
        'duration': '3.4s',
        'processed_count': 276,
        'node_count': 7
    }
]

MOCK_ANALYTICS = {
    'time_to_screen_days': 0.2,
    'time_to_hire_days': 4.5,
    'candidates_screened': 348,
    'interview_completion_rate': 94,
    'shortlist_rate': 18,
    'verification_rate': 88,
    'applications_over_time': [
        {'date': 'Aug 25', 'count': 24},
        {'date': 'Aug 26', 'count': 42},
        {'date': 'Aug 27', 'count': 58},
        {'date': 'Aug 28', 'count': 76},
        {'date': 'Aug 29', 'count': 95},
        {'date': 'Aug 30', 'count': 110},
        {'date': 'Aug 31', 'count': 140},
        {'date': 'Sep 01', 'count': 185}
    ]
}
