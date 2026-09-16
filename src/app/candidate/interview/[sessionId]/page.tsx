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
  const sessionId = params.sessionId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let isMounted = true;

    async function initInterview() {
      setIsTyping(true);
      try {
        if (sessionId === 'new') {
          // Dummy data for candidate to start the session, as we don't have global auth state hooked up here
          const newSession = await interviewsService.createInterviewSession(
            'cand-123',
            'Candidate User',
            'job-456',
            'Software Engineer',
            'text'
          );
          if (!isMounted) return;
          
          if (newSession.questions.length > 0) {
            setMessages([{ id: Date.now().toString(), role: 'ai', text: newSession.questions[0].question }]);
          }
          router.replace(`/candidate/interview/${newSession.id}`);
        } else {
          // If we somehow landed here with an ID but no messages, we could fetch it.
          const existingSession = await interviewsService.getInterviewById(sessionId);
          if (existingSession && isMounted) {
            setQuestionIndex(existingSession.currentQuestionIndex);
            if (existingSession.status === 'COMPLETED') {
               setIsCompleted(true);
            } else if (existingSession.questions.length > existingSession.currentQuestionIndex) {
               setMessages([{ id: Date.now().toString(), role: 'ai', text: existingSession.questions[existingSession.currentQuestionIndex].question }]);
            }
          }
        }
      } catch (err) {
        if (isMounted) setError('Failed to start the interview session. Please try again.');
      } finally {
        if (isMounted) setIsTyping(false);
      }
    }

    if (messages.length === 0) {
      initInterview();
    }

    return () => { isMounted = false; };
  }, [sessionId, router, messages.length]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || isCompleted) return;

    const answerText = inputValue.trim();
    const newMessage: Message = { id: Date.now().toString(), role: 'candidate', text: answerText };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      // Must pass sessionId to be completely stateless to the backend
      const response = await interviewsService.submitAnswer(sessionId, questionIndex, answerText);
      
      const { session, aiFollowUp } = response;
      
      if (session.status === 'COMPLETED' || !aiFollowUp) {
        setIsCompleted(true);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: aiFollowUp }]);
        setQuestionIndex(prev => prev + 1);
      }
    } catch (err) {
      setError(answerText);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
        <div className="mb-4 space-y-1">
          <h1 className="text-2xl font-semibold text-ink">AI Interview</h1>
          <p className="text-sm text-ink-soft">Respond to the AI assistant to complete your technical screening.</p>
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
