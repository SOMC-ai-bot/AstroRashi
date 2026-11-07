'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Send,
  Clock,
  Sparkles,
  Lock,
  Crown,
  ShieldCheck,
  Star,
  CheckCircle2,
  Copy,
  Check,
  RotateCw,
  Award,
  Heart,
  Briefcase,
  AlertCircle,
  FileText,
  LogOut,
  XCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { defaultAIProvider } from '@/lib/ai/fallback';
import { classifyIntent } from '@/lib/ai/routing';
import { ExpertAstrologer, BookingFormData } from './ConsultantScreen';
import { AIMessage } from '@/types';
import { FormattedExpertResponse } from './FormattedExpertResponse';

interface FullExpertChatScreenProps {
  expert: ExpertAstrologer;
  bookingData: BookingFormData;
  onBack: () => void;
  onEndChat: () => void;
}

export const FullExpertChatScreen: React.FC<FullExpertChatScreenProps> = ({
  expert,
  bookingData,
  onBack,
  onEndChat,
}) => {
  const { user } = useAuth();
  const { natalChart, activeProfile } = useAstrology();
  const { openUpgradeModal } = useSubscription();

  // Consultation Session Timer: 20 minutes = 1200 seconds
  const TOTAL_SESSION_SECONDS = 20 * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`astronex_expert_timer_${expert.id}_${bookingData.fullName}`);
      if (stored) return parseInt(stored, 10);
    }
    return TOTAL_SESSION_SECONDS;
  });

  const isExpired = secondsRemaining <= 0;
  const isTimerLow = secondsRemaining <= 180 && secondsRemaining > 0;

  // Session messages persisted in localStorage
  const storageKey = `astronex_expert_fullchat_${expert.id}_${bookingData.fullName}`;
  const [messages, setMessages] = useState<AIMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    // Clean, structured initial welcome message without markdown hashes or asterisks
    return [
      {
        id: `ast-init-${Date.now()}`,
        role: 'assistant',
        content: `Namaste and Pranam ${bookingData.fullName}.\n\nI am ${expert.name}, ${expert.title}. I have reviewed your consultation dossier:\n\nDate of Birth: ${bookingData.birthDate}\nTime of Birth: ${bookingData.birthTime}\nGender: ${bookingData.gender}\n${bookingData.phoneNumber ? `Contact: ${bookingData.phoneNumber}\n` : ''}\nAs an expert with ${expert.experienceYears}+ years of experience specializing in ${expert.specialties.join(', ')}, I have calculated your astrological placements.\n\nOur 20-minute dedicated consultation is active. Please ask your questions regarding career, relationship timing, or specific Vedic remedies.`,
        timestamp: new Date().toISOString(),
      },
    ];
  });

  const [inputVal, setInputVal] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isConfirmingEnd, setIsConfirmingEnd] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Countdown 20-Minute Timer
  useEffect(() => {
    if (isExpired) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        const next = Math.max(0, prev - 1);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`astronex_expert_timer_${expert.id}_${bookingData.fullName}`, next.toString());
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExpired, expert.id, bookingData.fullName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Save messages whenever updated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleSend = async () => {
    const text = inputVal.trim();
    if (!text || isStreaming || isExpired) return;

    const userMsgId = `usr-${Date.now()}`;
    const astMsgId = `ast-${Date.now() + 1}`;

    const userMessage: AIMessage = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const initialAssistantMessage: AIMessage = {
      id: astMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage, initialAssistantMessage];
    setMessages(updatedMessages);
    setInputVal('');
    setIsStreaming(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      let accumulated = '';
      const intent = classifyIntent(text, true);

      // Instruct model to respond in structured professional format without markdown stars or hashes
      const structuredPrompt = `You are ${expert.name}, ${expert.title}. Respond with authentic Vedic authority and structured clarity. Format your answer in paragraphs, clean bullet points, or key-value summary lines. DO NOT USE markdown symbols like '**' or '###' in your response. Present facts, timings, and remedies in a clean, legible manner.`;

      await defaultAIProvider.generateStream(
        {
          messages: [
            { role: 'system', content: structuredPrompt },
            ...updatedMessages.slice(0, -1).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          natalChart,
          userLanguage: 'en',
          useAstrologyContext: true,
          intent,
          specialistId: expert.id,
          specialistName: expert.name,
        },
        (chunk: string) => {
          accumulated += chunk;
          setMessages((prev) =>
            prev.map((m) => (m.id === astMsgId ? { ...m, content: accumulated } : m))
          );
        }
      );
    } catch (err) {
      console.error('Error generating expert consultation response:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === astMsgId
            ? {
                ...m,
                content:
                  'Shubham Astu. Your planetary configurations indicate positive transits approaching. Please maintain disciplined spiritual practice, and chant the Surya Gayatri mantra during sunrise.',
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderExpertGlyph = () => {
    switch (expert.iconType) {
      case 'shastri':
        return <Award size={20} color="#11A8EB" />;
      case 'sundaram':
        return <Heart size={20} color="#EC4899" />;
      case 'joshi':
        return <Briefcase size={20} color="#FBBF24" />;
      case 'devendra':
      default:
        return <Sparkles size={20} color="#8B5CF6" />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 135px)',
        width: '100%',
        maxWidth: '1160px',
        margin: '0 auto',
        backgroundColor: '#050608',
        borderRadius: '16px',
        border: '1px solid #41454D',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
      }}
    >
      {/* =========================================================================
          1. MATTE DARK HEADER (Non-Glowing, Modern & Professional)
         ========================================================================= */}
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid #41454D',
          backgroundColor: '#101722',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Left: Back button + Expert Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                backgroundColor: '#101722',
                border: '1px solid #41454D',
                color: '#D5D7DA',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Return to Experts Directory and End Session"
            >
              <ArrowLeft size={15} />
              <span>All Experts</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#101722',
                  border: '1px solid #41454D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {renderExpertGlyph()}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h2 style={{ fontSize: '15.5px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    {expert.name}
                  </h2>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      fontSize: '11px',
                      color: '#10B981',
                      fontWeight: 650,
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    <ShieldCheck size={12} />
                    Verified
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#A6A9AF', marginTop: '2px' }}>
                  {expert.title} • {expert.experienceYears}+ Yrs Experience
                </div>
              </div>
            </div>
          </div>

          {/* Right: 20-Minute Countdown Timer & End Chat Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Consultation Timer Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: isExpired
                  ? 'rgba(239, 68, 68, 0.15)'
                  : isTimerLow
                  ? 'rgba(245, 158, 11, 0.15)'
                  : '#101722',
                border: isExpired
                  ? '1px solid #EF4444'
                  : isTimerLow
                  ? '1px solid #F59E0B'
                  : '1px solid #41454D',
                color: isExpired ? '#EF4444' : isTimerLow ? '#F59E0B' : '#E2E8F0',
                fontSize: '12.5px',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
              title="20-Minute dedicated consultation session limit"
            >
              <Clock size={13} />
              <span>{isExpired ? 'SESSION ENDED' : formatTimer(secondsRemaining)}</span>
            </div>

            {/* End Chat Button */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to end this consultation session?')) {
                  onEndChat();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#FCA5A5',
                fontSize: '12px',
                fontWeight: 650,
                cursor: 'pointer',
              }}
              title="End this consultation now"
            >
              <XCircle size={14} />
              <span>End Chat</span>
            </button>
          </div>
        </div>

        {/* Sub-strip: Consultation Dossier Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: '#12141D',
            fontSize: '11.5px',
            color: '#A6A9AF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Client:</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{bookingData.fullName}</span>
            <span>•</span>
            <span>DOB: {bookingData.birthDate} ({bookingData.birthTime})</span>
            <span>•</span>
            <span>Gender: {bookingData.gender}</span>
          </div>
          <div style={{ color: '#64748B' }}>
            Specialties: {expert.specialties.join(', ')}
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. CHAT MESSAGES BODY (Structured Typography, No ** or ###)
         ========================================================================= */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: '#050608',
        }}
      >
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              {/* Message Header Label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '4px',
                  fontSize: '11px',
                  color: '#64748B',
                }}
              >
                <span style={{ fontWeight: 600, color: isUser ? '#FFFFFF' : '#D5D7DA' }}>
                  {isUser ? bookingData.fullName : expert.name}
                </span>
                <span>• {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              {/* Message Content Bubble */}
              <div
                style={{
                  maxWidth: isUser ? '80%' : '88%',
                  padding: '12px 16px',
                  borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  backgroundColor: isUser ? '#25282E' : '#25282E',
                  border: isUser ? '1px solid #41454D' : '1px solid #1C202D',
                  color: '#E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                }}
              >
                {isUser ? (
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.55, color: '#F8FAFC' }}>
                    {message.content}
                  </p>
                ) : (
                  <FormattedExpertResponse content={message.content} expertName={expert.name} />
                )}
              </div>

              {/* Copy Toolbar */}
              {!isUser && message.content && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', paddingLeft: '2px' }}>
                  <button
                    type="button"
                    onClick={() => handleCopy(message.id, message.content)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copiedId === message.id ? '#10B981' : '#64748B',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                    }}
                  >
                    {copiedId === message.id ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedId === message.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {isStreaming && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A6A9AF', fontSize: '12px' }}>
            <Clock size={13} className="animate-spin" color="#11A8EB" />
            <span>{expert.name} is formulating structured astrological counsel...</span>
          </div>
        )}

        {/* 20-Minute Expiration Notice */}
        {isExpired && (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '10px',
              backgroundColor: '#161215',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#FFFFFF',
              textAlign: 'center',
              margin: '8px 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
              <Lock size={15} color="#EF4444" />
              <span style={{ fontWeight: 700, fontSize: '13px' }}>20-Minute Consultation Window Concluded</span>
            </div>
            <p style={{ fontSize: '12px', color: '#D5D7DA', margin: '0 0 8px' }}>
              Your dedicated 20-minute consultation with {expert.name} has concluded.
            </p>
            <button
              type="button"
              onClick={onEndChat}
              style={{
                backgroundColor: '#41454D',
                border: '1px solid #33394D',
                borderRadius: '6px',
                padding: '6px 14px',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Return to All Experts
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* =========================================================================
          3. FULL-SIZED CHAT INPUT BAR
         ========================================================================= */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid #41454D',
          backgroundColor: '#101722',
        }}
      >
        {isExpired ? (
          <div
            style={{
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: '#12141D',
              border: '1px dashed #41454D',
              textAlign: 'center',
              color: '#A6A9AF',
              fontSize: '12.5px',
            }}
          >
            Consultation input is closed as the 20-minute consultation window has finished.
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#12141D',
              border: '1px solid #41454D',
              borderRadius: '20px',
              padding: '5px 12px',
            }}
          >
            <textarea
              ref={textareaRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${expert.name} about your horoscope, career timing, remedies, or marriage...`}
              rows={1}
              disabled={isStreaming || isExpired}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '13px',
                lineHeight: 1.5,
                resize: 'none',
                maxHeight: '120px',
                padding: '6px 4px',
                fontFamily: 'inherit',
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!inputVal.trim() || isStreaming || isExpired}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background:
                  inputVal.trim() && !isStreaming
                    ? '#11A8EB'
                    : '#25282E',
                border: 'none',
                color: inputVal.trim() && !isStreaming ? '#FFFFFF' : '#64748B',
                cursor: inputVal.trim() && !isStreaming ? 'pointer' : 'not-allowed',
                flexShrink: 0,
                transition: 'background 0.14s ease',
              }}
            >
              <Send size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
