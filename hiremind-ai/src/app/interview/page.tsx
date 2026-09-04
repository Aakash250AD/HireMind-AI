'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { callWebhook } from '@/lib/apiClient';
import { WEBHOOKS } from '@/lib/webhooks';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Send, User, Sparkles, ChevronLeft, CheckCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  text: string;
}

interface InterviewStartResponse {
  sessionId: string;
  question: string;
}

interface InterviewMessageResponse {
  nextQuestion?: string;
  done?: boolean;
  closingNote?: string;
}

export default function AIInterviewPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [closingNote, setClosingNote] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startInterview();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function startInterview() {
    try {
      const res = await callWebhook<InterviewStartResponse>(WEBHOOKS.interviewStart);
      setSessionId(res.sessionId);
      setMessages([
        { id: 'msg-1', role: 'ai', text: res.question }
      ]);
    } catch (err) {
      setMessages([{ id: 'msg-err', role: 'ai', text: 'Error connecting to interview server. Please try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim() || !sessionId || isTyping || isDone) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message to transcript
    const userMsg: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await callWebhook<InterviewMessageResponse>(WEBHOOKS.interviewMessage, {
        sessionId,
        message: userText
      });

      if (res.done) {
        setIsDone(true);
        setClosingNote(res.closingNote || 'The interview has concluded.');
      } else if (res.nextQuestion) {
        setMessages(prev => [...prev, { id: `msg-${Date.now()}`, role: 'ai', text: res.nextQuestion! }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { id: `msg-${Date.now()}`, role: 'ai', text: 'Sorry, I encountered a network error. Could you repeat that?' }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <DashboardLayout role="candidate">
      <div className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col">
        
        {/* Header */}
        <div>
          <Link href="/candidate-dashboard" className="text-ink-soft hover:text-ink text-sm font-medium flex items-center mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-tint rounded-full flex items-center justify-center text-primary shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-ink">AI Screening Interview</h1>
              <p className="text-sm text-ink-soft">Session ID: {sessionId || 'Initializing...'}</p>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <Card className="flex-1 flex flex-col overflow-hidden p-0 bg-surface">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-sunken/50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-primary text-white' : 'bg-surface border border-border text-ink'}`}>
                  {msg.role === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.role === 'ai' ? 'bg-white border border-border text-ink' : 'bg-primary text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white border border-border rounded-2xl p-4 shadow-sm flex items-center gap-1.5 h-[52px]">
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area or Done State */}
          <div className="p-4 border-t border-border bg-white">
            {isDone ? (
              <div className="text-center py-4 space-y-4">
                <div className="mx-auto w-12 h-12 bg-success-tint rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">Interview Completed</h3>
                  <p className="text-sm text-ink-soft mt-1 max-w-lg mx-auto">{closingNote}</p>
                </div>
                <Link href="/candidate-dashboard" className="inline-block mt-2">
                  <Button variant="secondary">Return to Dashboard</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your response here..."
                  className="flex-1 bg-surface-sunken border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                  disabled={isTyping || !sessionId}
                  autoFocus
                />
                <Button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping || !sessionId}
                  className="px-6 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>

        </Card>
      </div>
    </DashboardLayout>
  );
}
