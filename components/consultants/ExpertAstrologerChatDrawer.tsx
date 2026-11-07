'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Clock,
  Sparkles,
  Lock,
  Crown,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Star,
  GraduationCap,
  Heart,
  Briefcase,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/lib/state/auth-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { generateAstrologyResponse } from '@/lib/ai/routing';
import { ExpertAstrologer } from './ConsultantScreen';

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  birthTime: string;
  gender: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ExpertAstrologerChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  expert: ExpertAstrologer | null;
  bookingData: BookingFormData | null;
}

export const ExpertAstrologerChatDrawer: React.FC<ExpertAstrologerChatDrawerProps> = ({
  isOpen,
  onClose,
  expert,
  bookingData,
}) => {
  const { user } = useAuth();
  const { natalChart, activeProfile } = useAstrology();
  const { openUpgradeModal } = useSubscription();

  // Consultation Session Timer: 15 minutes (900 seconds)
  const TOTAL_SESSION_SECONDS = 15 * 60; // 900 seconds
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_SESSION_SECONDS);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize session when opened
  useEffect(() => {
    if (isOpen && expert) {
      setSecondsRemaining(TOTAL_SESSION_SECONDS);
      setIsSessionActive(true);
      setInputText('');

      const clientName = bookingData?.fullName || activeProfile.name || 'Seeker';
      const dob = bookingData?.birthDate || activeProfile.birthDate || '1996-09-12';
      const time = bookingData?.birthTime || activeProfile.birthTime || '14:30';
      const gender = bookingData?.gender || activeProfile.gender || 'Not specified';
      const phone = bookingData?.phoneNumber ? ` (Phone: ${bookingData.phoneNumber})` : '';

      // Personalized Astrologer Opening Greeting
      const initialGreeting: ChatMessage = {
        id: 'msg-init',
        role: 'assistant',
        content: `Namaste ${clientName}! Pranam. I am ${expert.name}, ${expert.title}. I have received your consultation dossier (DOB: ${dob}, Time: ${time}, Gender: ${gender}${phone}). As an expert in ${expert.specialties.join(', ')}, I have synchronized your planetary alignments and current Vimshottari Mahadasha. How may I guide your path today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialGreeting]);
    }
  }, [isOpen, expert, bookingData]);

  // Countdown 15-Minute Timer
  useEffect(() => {
    if (!isOpen || !isSessionActive) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSessionActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isSessionActive]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen || !expert) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimerLow = secondsRemaining <= 180 && secondsRemaining > 0; // Less than 3 mins
  const isExpired = secondsRemaining === 0;

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text || isTyping || isExpired) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Specialized Expert System Prompt emphasizing the expert's specific identity and title
      const expertSystemPrompt = `You are ${expert.name}, ${expert.title} (${expert.experienceYears}+ years of experience, specialized in ${expert.specialties.join(', ')}).
You are conducting a verified 1-on-1 personalized Vedic astrology consultation with the seeker.
Seeker Details:
- Name: ${bookingData?.fullName || activeProfile.name}
- DOB: ${bookingData?.birthDate || activeProfile.birthDate}
- Time: ${bookingData?.birthTime || activeProfile.birthTime}
- Gender: ${bookingData?.gender || activeProfile.gender}
- Primary Inquiries: ${expert.specialties.join(', ')}

Tone & Persona:
1. Speak in first person as "${expert.name}" with authentic reverence, Vedic authority, warmth, and erudition.
2. Address the seeker respectfully by name. Reference their specific birth details, Dasha timing, and planets.
3. Provide concrete astrological interpretations, classical remedies (mantras, gemstones, fasts, donations), and timing.
4. Keep answers detailed yet direct and reassuring. Never break character.`;

      const aiQuery = `${expertSystemPrompt}\n\nClient Question: "${text}"`;

      // Call AI generation
      const aiResponse = await generateAstrologyResponse(aiQuery, {
        userName: bookingData?.fullName || activeProfile.name,
        birthDate: bookingData?.birthDate || activeProfile.birthDate,
        birthTime: bookingData?.birthTime || activeProfile.birthTime,
        birthPlace: activeProfile.birthPlace,
        chart: natalChart,
      });

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating expert consultation response:', error);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: `Shubham Astu. Your planetary positions indicate favorable developments ahead. Please maintain clarity in your daily practices and chant the Gayatri mantra during sunrise for mental tranquility.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 6, 10, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Side Column Drawer */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          backgroundColor: '#0A0B10',
          borderLeft: '1.5px solid rgba(249, 115, 22, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.9)',
          position: 'relative',
          animation: 'slideLeft 0.25s ease-out',
        }}
      >
        {/* =========================================================================
            1. HEADER BANNER: Expert Info, Verified Credentials, 15-Min Timer
           ========================================================================= */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(20, 15, 30, 0.98) 0%, rgba(10, 11, 16, 0.98) 100%)',
            borderBottom: '1px solid rgba(249, 115, 22, 0.25)',
            padding: '16px 20px',
            position: 'relative',
          }}
        >
          {/* Top Bar: Title & Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isExpired ? '#EF4444' : '#10B981',
                  boxShadow: isExpired ? '0 0 8px #EF4444' : '0 0 8px #10B981',
                }}
              />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#F97316', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                EXPERT ASTROLOGERS • 1-ON-1
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Expert Profile Banner Display */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            {/* Expert Icon Badge (No personal photo, consistent icon badge) */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(139, 92, 246, 0.2) 100%)',
                border: '1.5px solid #F97316',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)',
                flexShrink: 0,
              }}
            >
              <Sparkles size={24} color="#F97316" />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {expert.name}
                </h2>
                <ShieldCheck size={16} color="#10B981" />
              </div>
              <div style={{ fontSize: '12px', color: '#FED7AA', fontWeight: 600 }}>
                {expert.title}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                {expert.experienceYears}+ Years • {expert.languages.join(', ')}
              </div>
            </div>

            {/* 15-Minute Countdown Timer Badge */}
            <div
              style={{
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: isExpired
                  ? 'rgba(239, 68, 68, 0.18)'
                  : isTimerLow
                  ? 'rgba(245, 158, 11, 0.2)'
                  : 'rgba(16, 185, 129, 0.15)',
                border: isExpired
                  ? '1.5px solid #EF4444'
                  : isTimerLow
                  ? '1.5px solid #F59E0B'
                  : '1px solid rgba(16, 185, 129, 0.4)',
                textAlign: 'right',
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: '10px', color: '#CBD5E1', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <Clock size={11} />
                <span>{isExpired ? 'SESSION ENDED' : 'TIME REMAINING'}</span>
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  color: isExpired ? '#EF4444' : isTimerLow ? '#FBBF24' : '#10B981',
                  marginTop: '1px',
                }}
              >
                {formatTime(secondsRemaining)}
              </div>
            </div>
          </div>

          {/* Client Consultation Dossier Chip */}
          {bookingData && (
            <div
              style={{
                marginTop: '12px',
                padding: '6px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '11px',
                color: '#CBD5E1',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span style={{ color: '#F97316', fontWeight: 700 }}>Dossier:</span>
              <span>{bookingData.fullName}</span>
              <span>•</span>
              <span>DOB: {bookingData.birthDate} ({bookingData.birthTime})</span>
              <span>•</span>
              <span>{bookingData.gender}</span>
              {user.isPremium ? (
                <span style={{ marginLeft: 'auto', color: '#10B981', fontWeight: 700 }}>
                  VIP Access (Free)
                </span>
              ) : (
                <span style={{ marginLeft: 'auto', color: '#F97316', fontWeight: 700 }}>
                  Paid: ₹{expert.pricingPerSession}
                </span>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            2. CHAT MESSAGES STREAM
           ========================================================================= */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                }}
              >
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
                  <span style={{ fontWeight: 700, color: isUser ? '#FDBA74' : '#CBD5E1' }}>
                    {isUser ? bookingData?.fullName || 'You' : expert.name}
                  </span>
                  <span>• {msg.timestamp}</span>
                </div>

                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: isUser
                      ? 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.09)',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    boxShadow: isUser
                      ? '0 4px 14px rgba(234, 88, 12, 0.3)'
                      : '0 4px 14px rgba(0, 0, 0, 0.4)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FED7AA', fontSize: '12px' }}>
              <Sparkles size={14} className="animate-spin" color="#F97316" />
              <span>{expert.name} is examining your planetary placements...</span>
            </div>
          )}

          {/* Time Expired Notice */}
          {isExpired && (
            <div
              style={{
                marginTop: '10px',
                padding: '14px 18px',
                borderRadius: '14px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1.5px solid #EF4444',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                <Lock size={16} color="#EF4444" />
                <span style={{ fontWeight: 800, fontSize: '13px' }}>15-Minute Consultation Concluded</span>
              </div>
              <p style={{ fontSize: '12px', color: '#CBD5E1', margin: '0 0 10px' }}>
                Your dedicated 15-minute 1-on-1 consultation window with {expert.name} has concluded.
              </p>
              {!user.isPremium && (
                <button
                  type="button"
                  onClick={() => openUpgradeModal('Extended Expert Astrologer Sessions')}
                  style={{
                    backgroundColor: '#F97316',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Upgrade to VIP for Unlimited Priority Sessions
                </button>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* =========================================================================
            3. CHAT INPUT BAR (Locked if Expired)
           ========================================================================= */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#07080C',
          }}
        >
          {isExpired ? (
            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                textAlign: 'center',
                color: '#94A3B8',
                fontSize: '13px',
              }}
            >
              Chat is closed as the 15-minute consultation window has finished.
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '16px',
                padding: '8px 12px',
              }}
            >
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${expert.name} about your horoscope, career, remedies...`}
                rows={1}
                disabled={isTyping}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  resize: 'none',
                  maxHeight: '100px',
                  lineHeight: 1.4,
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: inputText.trim() && !isTyping
                    ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
                    : 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputText.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  boxShadow: inputText.trim() ? '0 2px 10px rgba(249, 115, 22, 0.4)' : 'none',
                }}
              >
                <Send size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

