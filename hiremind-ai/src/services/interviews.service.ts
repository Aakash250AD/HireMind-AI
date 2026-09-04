import { InterviewSession } from '@/types';
import { MOCK_INTERVIEWS } from './mockData';
import { simulateNetworkDelay } from './api';

const interviewsDb: InterviewSession[] = [...MOCK_INTERVIEWS];

export const interviewsService = {
  async getInterviews(): Promise<InterviewSession[]> {
    await simulateNetworkDelay(350);
    return [...interviewsDb];
  },

  async getInterviewById(id: string): Promise<InterviewSession | null> {
    await simulateNetworkDelay(300);
    const session = interviewsDb.find((s) => s.id === id);
    return session || null;
  },

  async createInterviewSession(candidateId: string, candidateName: string, jobId: string, jobTitle: string, mode: 'text' | 'voice'): Promise<InterviewSession> {
    await simulateNetworkDelay(600);
    const newSession: InterviewSession = {
      id: `int-session-${Date.now()}`,
      candidateId,
      candidateName,
      jobId,
      jobTitle,
      status: 'IN_PROGRESS',
      scheduledAt: new Date().toLocaleString(),
      durationMinutes: 20,
      mode,
      currentQuestionIndex: 0,
      questions: [
        {
          id: 'q-1',
          question: `Hello ${candidateName}. Welcome to your HireMind AI interview for the ${jobTitle} role. Could you briefly describe your experience architecting high-performance scalable systems?`,
          targetSkill: 'Architecture'
        },
        {
          id: 'q-2',
          question: 'How do you structure error boundaries and asynchronous exception handling in production microservices?',
          targetSkill: 'Error Handling'
        },
        {
          id: 'q-3',
          question: 'What performance metrics do you prioritize when optimizing database queries and caching layers?',
          targetSkill: 'Performance'
        },
        {
          id: 'q-4',
          question: 'Can you walk us through a complex technical conflict you resolved within your engineering team?',
          targetSkill: 'Communication & Problem Solving'
        }
      ]
    };
    interviewsDb.unshift(newSession);
    return newSession;
  },

  async submitAnswer(sessionId: string, questionIndex: number, answerText: string): Promise<{ session: InterviewSession; aiFollowUp?: string }> {
    await simulateNetworkDelay(1200); // Simulate AI processing candidate response
    const session = interviewsDb.find((s) => s.id === sessionId);
    if (!session) throw new Error('Interview session not found');

    if (session.questions[questionIndex]) {
      session.questions[questionIndex].candidateAnswer = answerText;
      session.questions[questionIndex].score = Math.floor(Math.random() * 15) + 84; // 84-98 range
      session.questions[questionIndex].aiFeedback = 'Candidate provided structured, clear technical rationale with valid scenario examples.';
    }

    const nextIndex = questionIndex + 1;
    session.currentQuestionIndex = nextIndex;

    let aiFollowUp: string | undefined;
    if (nextIndex < session.questions.length) {
      aiFollowUp = session.questions[nextIndex].question;
    } else {
      // Completed interview evaluation calculation
      session.status = 'COMPLETED';
      session.technicalScore = 91;
      session.communicationScore = 88;
      session.problemSolvingScore = 93;
      session.roleFitScore = 90;
      session.overallScore = 91;
      session.aiSummary = {
        strengths: [
          'Strong conceptual clarity in asynchronous workflow design.',
          'Articulate explanations with practical production examples.',
          'Proactive emphasis on monitoring and exception fallback strategies.'
        ],
        concerns: [
          'Minor detail missing on edge-case vector index rebuilding.'
        ],
        areasToVerify: [
          'Verify specific AWS IAM policy permissions during team onboarding.'
        ],
        recommendation: 'Recommended for recruiter review'
      };
    }

    return { session, aiFollowUp };
  }
};
