'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { interviewsService } from '@/services/interviews.service';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'ai' | 'candidate';
  text: string;
}

export default function CandidateInterviewPage() {
  const params = useParams();
  const router = useRouter();
  // Route param is the applications.id this interview belongs to.
  const applicationId = params.sessionId as string;

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [starting, setStarting] = useState(true);
  const [startError, setStartError] = useState<string | null>(null);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let isMounted = true;

    async function initInterview() {
      setStarting(true);
      setStartError(null);
      try {
        const result = await interviewsService.createInterviewSession(applicationId);
        if (!isMounted) return;
        setSessionId(result.id);
        if (result.currentQuestion) {
          setMessages([{ id: Date.now().toString(), role: 'ai', text: result.currentQuestion }]);
        }
      } catch (err) {
        if (isMounted) setStartError((err as Error).message || 'Failed to start the interview session.');
      } finally {
        if (isMounted) setStarting(false);
      }
    }

    initInterview();
    return () => { isMounted = false; };
  }, [applicationId]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || isCompleted || !sessionId) return;

    const answerText = inputValue.trim();
    const newMessage: Message = { id: Date.now().toString(), role: 'candidate', text: answerText };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await interviewsService.submitAnswer(sessionId, questionIndex, answerText);

      if (response.completed || !response.nextQuestion) {
        setIsCompleted(true);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: response.nextQuestion! }]);
        setQuestionIndex(prev => prev + 1);
      }
    } catch (err) {
      setError(answerText);
    } finally {
      setIsTyping(false);
    }
  };

  if (starting) {
    return (
      <DashboardLayout role="candidate">
        <div className="max-w-4xl mx-auto py-20 text-center text-ink-faint">
          Preparing your AI interview...
        </div>
      </DashboardLayout>
    );
  }

  if (startError) {
    return (
      <DashboardLayout role="candidate">
        <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-danger mx-auto" />
          <h2 className="text-lg font-bold text-ink">Couldn&apos;t start your interview</h2>
          <p className="text-sm text-ink-soft">{startError}</p>
          <Button onClick={() => router.push('/candidate/interviews')}>Back to Interviews</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
        <div className="mb-4 space-y-1">
          <h1 className="text-2xl font-semibold text-ink">AI Interview</h1>
          <p className="text-sm text-ink-soft">Respond to the AI assistant to complete your technical screening. Voice mode is coming soon — text only for now.</p>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden bg-surface shadow-sm p-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-sunken">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'candidate' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-[var(--radius-lg)] p-4 text-sm ${
                    msg.role === 'candidate'
                      ? 'bg-primary text-white shadow-sm rounded-tr-none'
                      : 'bg-surface border border-border text-ink rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border text-ink rounded-[var(--radius-lg)] rounded-tl-none p-4 shadow-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-ink-faint animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-[var(--radius-lg)] rounded-tl-none p-4 shadow-sm max-w-[80%] flex flex-col gap-3">
                  <div className="flex gap-2 items-start">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-sm">Having trouble reaching the interviewer. Retry sending your last message?</p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setInputValue(error);
                      setError(null);
                    }}
                    className="self-start bg-surface text-xs py-1 px-3"
                  >
                    Load Failed Message
                  </Button>
                </div>
              </div>
            )}

            {isCompleted && (
              <div className="flex justify-center pt-4">
                <div className="bg-success-tint border border-success-border text-success-ink rounded-[var(--radius-lg)] p-6 shadow-sm max-w-md text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white mb-2">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">Interview Complete</h3>
                  <p className="text-sm">Thank you for your time. Your responses have been recorded and will be reviewed by our recruiting team.</p>
                  <Button onClick={() => router.push('/candidate-dashboard')} className="mt-2 w-full">Return to Dashboard</Button>
                </div>
              </div>
            )}

            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-surface">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={isCompleted ? "Interview completed" : "Type your response..."}
                disabled={isCompleted || isTyping}
                className="flex-1 text-ink bg-surface-sunken border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping || isCompleted}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center shrink-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
