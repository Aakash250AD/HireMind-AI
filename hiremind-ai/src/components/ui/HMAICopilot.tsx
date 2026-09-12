'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, MessageSquare, Search, BarChart2, Briefcase, Send, Loader2 } from 'lucide-react';
import { HMCard } from './HMCard';

import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

export function HMAICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      let aiContent = "I'm your HireMind AI Assistant. I can help you analyze candidates, screen resumes, or navigate the platform. How can I assist further?";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('find') || lowerText.includes('candidate')) {
        aiContent = "I'd be happy to help you source candidates. I can automatically scan the database for profiles matching your job descriptions and rank them by skill relevance.";
      } else if (lowerText.includes('data') || lowerText.includes('explain') || lowerText.includes('analytics')) {
        aiContent = "Based on our latest recruitment telemetry, your time-to-hire has decreased by 24% since implementing AI screening. Let me know if you want a detailed breakdown.";
      } else if (lowerText.includes('job') || lowerText.includes('post')) {
        aiContent = "I can generate a fully optimized job description for you. Just tell me the role title, key skills required, and the seniority level.";
      } else if (lowerText.includes('status')) {
        aiContent = "You currently have 3 open positions with 42 total applicants. 12 applicants are pending human review in the shortlisting pipeline.";
      }

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: aiContent };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-4"
          >
            <HMCard className="w-[340px] max-w-[calc(100vw-3rem)] h-[480px] max-h-[75vh] overflow-hidden flex flex-col shadow-2xl border-border">
              {/* Header */}
              <div className="bg-gradient-to-r from-hm-deep to-hm-matte p-4 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-primary-tint" />
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-none mb-1">HireMind AI</div>
                    <div className="text-[10px] text-primary-tint flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online \u0026 Ready
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-surface-sunken custom-scrollbar flex flex-col gap-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col h-full items-center justify-center text-center opacity-0 animate-in fade-in duration-500">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-ink mb-2">
                      I'm your AI Copilot
                    </p>
                    <p className="text-xs font-medium text-ink-soft mb-6">
                      Ask me to analyze candidates, generate job descriptions, or explain your hiring telemetry.
                    </p>
                    
                    <div className="space-y-2 w-full">
                      {[
                        { icon: Search, text: "Find suitable candidates" },
                        { icon: BarChart2, text: "Explain recruitment data" },
                        { icon: Briefcase, text: "Help create job post" }
                      ].map((item, i) => (
                        <button 
                          key={i}
                          onClick={() => handleSend(item.text)}
                          className="w-full flex items-center gap-3 p-2.5 rounded-[var(--radius-sm)] bg-surface border border-border hover:border-primary/50 hover:shadow-sm transition-all text-left group"
                        >
                          <item.icon className="w-4 h-4 text-primary/70 group-hover:text-primary shrink-0" />
                          <span className="text-xs font-semibold text-ink-soft group-hover:text-ink transition-colors">{item.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.role === 'user' 
                            ? 'bg-primary text-white rounded-br-sm shadow-sm' 
                            : 'bg-surface border border-border text-ink rounded-bl-sm shadow-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-surface border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
              
              {/* Input Area */}
              <div className="p-3 bg-surface border-t border-border shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="relative flex items-center"
                >
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message HireMind AI..." 
                    className="w-full pl-3 pr-10 py-2.5 bg-page-bg border border-border rounded-[var(--radius-sm)] text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className={`absolute right-1.5 p-1.5 rounded-md transition-colors ${
                      input.trim() ? 'bg-primary text-white hover:bg-primary-hover shadow-sm' : 'text-ink-faint hover:bg-page-bg'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </HMCard>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-primary to-primary-hover text-white rounded-full flex items-center justify-center relative shadow-xl border border-white/10"
        animate={{
          boxShadow: [
            "0 4px 20px rgba(22,87,204,0.4)",
            "0 4px 30px rgba(22,87,204,0.7)",
            "0 4px 20px rgba(22,87,204,0.4)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ 
          scale: 1.05, 
          transition: { duration: 0.2 } 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-6 h-6 relative z-10" />
        {/* Subtle notification dot if needed */}
        {!isOpen && messages.length > 0 && (
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-danger border-2 border-surface rounded-full animate-in zoom-in"></div>
        )}
      </motion.button>
    </div>
  );
}
