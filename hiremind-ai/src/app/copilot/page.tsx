'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { copilotService, SUGGESTED_COPILOT_PROMPTS, CopilotMessage } from '@/services/copilot.service';
import { Bot, Send, User, Loader2, ArrowRight } from 'lucide-react';

export default function CopilotPage() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      content: `**Hello Sarah! I am your HireMind AI Recruiter Copilot.**\n\nI can analyze candidates across active jobs, audit evidence confidence scores, and summarize shortlist rationale.\n\nHow can I assist your recruitment decisions today?`,
      timestamp: 'Just now'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (promptToSend?: string) => {
    const prompt = promptToSend || inputPrompt;
    if (!prompt.trim() || loading) return;

    const userMsg: CopilotMessage = {
      // eslint-disable-next-line react-hooks/purity
      id: `user-${Date.now()}`,
      sender: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptToSend) setInputPrompt('');
    setLoading(true);

    try {
      const assistantMsg = await copilotService.askCopilot(prompt);
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Top Info Header */}
        <div className="bg-white border border-border-color p-5 rounded-[var(--radius-lg)] shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[var(--radius-md)] bg-primary/20 border border-[#722F37] text-primary">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-bold text-text-primary">HireMind Copilot</h1>
              <p className="text-xs text-text-secondary">Conversational AI assistant for explainable recruiter decision support.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            LLM Model Active
          </span>
        </div>

        {/* Suggested Prompt Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider block">
            Suggested Recruiter Queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_COPILOT_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-[var(--radius-sm)] bg-white hover:bg-primary/40 text-text-secondary hover:text-text-primary border border-border-color hover:border-[#722F37] transition-all text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Copilot Chat Log Window */}
        <div className="flex-1 bg-white border border-border-color rounded-[var(--radius-lg)] p-6 overflow-y-auto space-y-4 my-4 min-h-[400px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center text-text-primary shrink-0 border border-dark-blue">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                  <span className="font-bold uppercase">{msg.sender === 'user' ? 'Recruiter' : 'AI Copilot'}</span>
                  <span>• {msg.timestamp}</span>
                </div>
                <div
                  className={`p-4 rounded-[var(--radius-md)] text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white border border-dark-blue'
                      : 'bg-page-bg text-zinc-200 border border-border-color'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.suggestedActions && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedActions.map((act, idx) => (
                      <Link
                        key={idx}
                        href={act.actionUrl}
                        className="px-3 py-1.5 bg-primary/30 hover:bg-primary text-white text-xs font-bold rounded-[var(--radius-sm)] border border-[#722F37] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-page-bg flex items-center justify-center text-text-secondary shrink-0 border border-border-color">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-text-secondary bg-page-bg p-3 rounded-[var(--radius-md)] w-max border border-border-color">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>AI Copilot is synthesizing candidate telemetry...</span>
            </div>
          )}
        </div>

        {/* Text Input Box */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Copilot anything about candidates, verification scores, or job pipelines..."
            disabled={loading}
            className="flex-1 p-3.5 bg-white border border-border-color rounded-[var(--radius-md)] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#722F37]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !inputPrompt.trim()}
            className="px-6 py-3.5 bg-primary hover:bg-dark-blue text-white text-xs font-extrabold rounded-[var(--radius-md)] border border-dark-blue shadow flex items-center gap-2"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
