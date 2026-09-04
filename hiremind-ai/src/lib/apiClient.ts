import { WEBHOOKS } from './webhooks';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const IS_MOCK = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

export async function callWebhook<T>(url: string, body?: object): Promise<T> {
  if (IS_MOCK) {
    return simulateMockData<T>(url, body);
  }

  const options: RequestInit = {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new ApiError(res.status, `HTTP Error ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Network/Parse Error: ${(error as Error).message}`);
  }
}

async function simulateMockData<T>(url: string, body?: any): Promise<T> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  switch (url) {
    case WEBHOOKS.hrStats:
      return {
        activeJobs: 12,
        applicants: 142,
        aiShortlisted: 45,
        interviews: 18,
        offers: 4,
        hired: 2,
      } as T;
    
    case WEBHOOKS.candidateStats:
      return {
        appliedJobs: 3,
        aiScreeningMatch: 88,
        aiInterviewScore: 92,
        skillVerification: 'Verified',
      } as T;

    case WEBHOOKS.jobList:
      return [
        {
          id: 'job-1',
          title: 'Senior Frontend Engineer',
          category: 'Engineering',
          status: 'ACTIVE',
          description: 'Build enterprise dashboards with Next.js.',
          location: 'Remote',
          salary: '$140k - $180k',
          skills: ['React', 'TypeScript', 'Next.js'],
          applicantCount: 24,
        },
        {
          id: 'job-2',
          title: 'Product Designer',
          category: 'Design',
          status: 'ACTIVE',
          description: 'Create beautiful enterprise tools.',
          location: 'New York / Hybrid',
          salary: '$120k - $160k',
          skills: ['Figma', 'UI/UX', 'Design Systems'],
          applicantCount: 45,
        }
      ] as T;

    case WEBHOOKS.jobCreate:
      return { success: true, message: 'Job created successfully' } as T;

    case WEBHOOKS.shortlist:
      return [
        {
          id: 'cand-1',
          name: 'Sarah Connor',
          matchPercentage: 94,
          interviewScore: 92,
          verificationBadges: ['Top 1% React', 'Communication'],
          transcriptExcerpt: '...I structured the architecture to handle 1M+ concurrent users...',
          explanationText: 'Sarah showed exceptional system design skills and deep knowledge of React rendering.',
        }
      ] as T;
      
    case WEBHOOKS.decision:
    case WEBHOOKS.candidateApply:
    case WEBHOOKS.assessmentSubmit:
      return { success: true } as T;

    case WEBHOOKS.candidateStatus:
      // Active Application Tracker
      return {
        currentStep: 3, // 1: Applied, 2: Screened, 3: AI Interview, 4: Assessment, 5: HR Review, 6: Offer
        applications: [
          {
            jobId: 'job-1',
            jobTitle: 'Senior Frontend Engineer',
            status: 'AI Interview',
            dateApplied: '2026-09-01'
          }
        ]
      } as T;

    case WEBHOOKS.interviewStart:
      return {
        sessionId: 'session-' + Date.now(),
        question: 'Hi! I am the HireMind AI Recruiter. To start, could you tell me about your experience building large-scale frontend applications?',
      } as T;

    case WEBHOOKS.interviewMessage:
      // simple deterministic mock
      const userText = body?.message?.toLowerCase() || '';
      if (userText.includes('bye') || userText.includes('done')) {
        return {
          done: true,
          closingNote: 'Thank you for your time! We will review your interview and get back to you.'
        } as T;
      }
      return {
        done: false,
        nextQuestion: 'That sounds great. How do you usually handle performance optimizations in React?',
      } as T;

    default:
      return { success: true, mocked: true } as T;
  }
}
