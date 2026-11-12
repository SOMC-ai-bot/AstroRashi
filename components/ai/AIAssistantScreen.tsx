'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/lib/state/chat-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { useAuth } from '@/lib/state/auth-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { ChatMessage } from './ChatMessage';
import { AstrologyContextBadge } from './AstrologyContextBadge';
import {
  Send,
  Square,
  Paperclip,
  Mic,
  MicOff,
  History,
  Plus,
  Sparkles,
  Heart,
  Briefcase,
  Shield,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  Trash2,
  FileText,
  Upload,
  CheckCircle,
  X,
  Clock,
  Lock,
} from 'lucide-react';

interface AstrologerNicheMode {
  id: string;
  name: string;
  title: string;
  icon: React.ReactNode;
  bg: string;
  accent: string;
  faqSuggestions: string[];
}

const ASTROLOGER_MODES: AstrologerNicheMode[] = [
  {
    id: 'vedic-master',
    name: 'Vedic Master Astrologer',
    title: 'Comprehensive Janam Kundli, Life Purpose & Planetary Yogas',
    icon: <Sparkles size={16} color="#11A8EB" />,
    bg: 'rgba(249, 115, 22, 0.1)',
    accent: '#11A8EB',
    faqSuggestions: [
      'What are the strongest Dhana & Raj Yogas in my Janam Kundli?',
      'How does my current Mahadasha impact my upcoming 2-year timeline?',
      'What is my soul purpose based on my Atmakaraka and Lagna lord?',
    ],
  },
  {
    id: 'love-relationship',
    name: 'Love & Marriage Astrologer',
    title: 'Kundli Milan, 7th House Dynamics, Soulmate Timing & Doshas',
    icon: <Heart size={16} color="#EC4899" />,
    bg: 'rgba(236, 72, 153, 0.1)',
    accent: '#EC4899',
    faqSuggestions: [
      'When is my favorable marriage timing according to Venus & Jupiter transits?',
      'How do Mangal Dosha or 7th house aspects affect my relationship compatibility?',
      'What qualities will my future spouse have based on the Navamsha (D9) chart?',
    ],
  },
  {
    id: 'career-wealth',
    name: 'Career & Wealth Astrologer',
    title: '10th House Karma, Business Venture Muhurats & Financial Growth',
    icon: <Briefcase size={16} color="#FBBF24" />,
    bg: 'rgba(251, 191, 36, 0.1)',
    accent: '#FBBF24',
    faqSuggestions: [
      'Should I pursue employment or independent business according to my 10th house?',
      'When is the optimal period for job change or financial investments?',
      'Which planetary periods trigger highest wealth accumulation in my chart?',
    ],
  },
  {
    id: 'dosha-remedy',
    name: 'Dosha & Remedial Astrologer',
    title: 'Sade Sati, Kaal Sarp Neutralization, Gemstones & Sacred Mantras',
    icon: <Shield size={16} color="#3B82F6" />,
    bg: 'rgba(59, 130, 246, 0.1)',
    accent: '#3B82F6',
    faqSuggestions: [
      'What specific remedies alleviate my current Saturn / Sade Sati phase?',
      'Which certified gemstone and sacred Beej mantra will fortify my Lagna lord?',
      'How can I harmonize Rahu-Ketu nodal karmic influences in my chart?',
    ],
  },
];

interface AIAssistantScreenProps {
  onNavigateTab?: (tab: string) => void;
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({ onNavigateTab }) => {
  const {
    conversations,
    activeConversation,
    isStreaming,
    useAstrologyContext,
    toggleAstrologyContext,
    sendMessage,
    stopGeneration,
    regenerateLastMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
    selectedAstrologerMode,
    setSelectedAstrologerMode,
  } = useChat();
  const { t } = useI18n();
  const { activeProfile, natalChart } = useAstrology();
  const { user } = useAuth();
  const { openUpgradeModal } = useSubscription();

  // 15-minute consultation session limit for free / non-logged-in users on AI Astrologer ONLY
  // AFTER THAT NO ACCESS
  const isFreeOrGuest = !user.isPremium;

  const [sessionSeconds, setSessionSeconds] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('astronex_free_consultation_secs');
      if (stored) return parseInt(stored, 10);
    }
    return 900; // 15 minutes = 900 seconds
  });

  const isTimerExpired = isFreeOrGuest && sessionSeconds <= 0;

  useEffect(() => {
    if (!isFreeOrGuest) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => {
        const next = Math.max(0, prev - 1);
        if (typeof window !== 'undefined') {
          localStorage.setItem('astronex_free_consultation_secs', next.toString());
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFreeOrGuest]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const [inputVal, setInputVal] = useState('');
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  // Responsive: Check screen size on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowHistorySidebar(window.innerWidth > 900);
    }
  }, []);

  // Active Niche Astrologer Mode synced with chat context
  // Free users are restricted to 'vedic-master' ONLY; others trigger upgrade popup
  const activeModeId = selectedAstrologerMode || 'vedic-master';
  const setActiveModeId = (modeId: string) => {
    if (isFreeOrGuest && modeId !== 'vedic-master') {
      openUpgradeModal('Unlock Specialized Niche Astrologers');
      return;
    }
    setSelectedAstrologerMode(modeId);
  };
  const activeMode = ASTROLOGER_MODES.find((m) => m.id === activeModeId) || ASTROLOGER_MODES[0];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation.messages, isStreaming]);

  const handleSend = () => {
    if (!inputVal.trim() || isStreaming) return;

    let payload = inputVal.trim();
    if (attachmentName) {
      payload = `[Attached File: ${attachmentName}] ${payload}`;
    }

    sendMessage(payload);
    setInputVal('');
    setAttachmentName(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputVal((prev) => (prev ? prev + ' ' + transcript : transcript));
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  return (
    <div
      className="ai-assistant-container"
      style={{
        display: 'grid',
        gridTemplateColumns: showHistorySidebar ? '260px minmax(0, 1fr)' : '0px minmax(0, 1fr)',
        gap: showHistorySidebar ? '16px' : '0px',
        height: 'calc(100vh - 145px)',
        position: 'relative',
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        transition: 'grid-template-columns 200ms ease, gap 200ms ease',
      }}
    >
      {/* ================= 1. LEFT: CONSULTATION HISTORY SIDEBAR ================= */}
      <div
        className="ai-history-sidebar"
        style={{
          display: showHistorySidebar ? 'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: '#101722',
          borderRadius: '16px',
          border: '1px solid #41454D',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid #41454D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={16} color="#D5D7DA" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              History
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowHistorySidebar(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#A6A9AF',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="Collapse History Panel"
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* New Session Button */}
        <div style={{ padding: '12px 16px' }}>
          <button
            type="button"
            onClick={createNewConversation}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '8px',
              backgroundColor: '#101722',
              border: '1px solid #41454D',
              color: '#E2E8F0',
              fontSize: '12.5px',
              fontWeight: 650,
              cursor: 'pointer',
              transition: 'background 0.14s ease',
            }}
          >
            <Plus size={15} color="#11A8EB" />
            <span>New Consultation</span>
          </button>
        </div>

        {/* Saved Sessions List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 12px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConversation.id;
            return (
              <div
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  backgroundColor: isSelected ? '#1A1E2B' : 'transparent',
                  border: isSelected ? '1px solid #2B3247' : '1px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '12.5px',
                      fontWeight: isSelected ? 650 : 500,
                      color: isSelected ? '#FFFFFF' : '#A6A9AF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {conv.title || 'Astrology Consultation'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
                    {conv.messages.length} messages
                  </div>
                </div>

                {conversations.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748B',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    title="Delete Conversation"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 2. MAIN: ASTROLOGER CHAT WINDOW ================= */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050608',
          borderRadius: '16px',
          border: '1px solid #41454D',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '12px 18px',
            borderBottom: '1px solid #41454D',
            backgroundColor: '#101722',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {!showHistorySidebar && (
                <button
                  type="button"
                  onClick={() => setShowHistorySidebar(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#101722',
                    border: '1px solid #41454D',
                    color: '#D5D7DA',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                  }}
                  title="Show Consultation History"
                >
                  <History size={13} color="#D5D7DA" />
                  <span>History</span>
                </button>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#101722',
                    border: '1px solid #41454D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {activeMode.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                    {activeMode.name}
                  </h2>
                  <p style={{ fontSize: '11px', color: '#A6A9AF', margin: 0 }}>
                    {activeMode.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Timer */}
            {isFreeOrGuest && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  backgroundColor: isTimerExpired ? 'rgba(239, 68, 68, 0.15)' : '#101722',
                  border: isTimerExpired ? '1px solid #EF4444' : '1px solid #41454D',
                  color: isTimerExpired ? '#EF4444' : '#E2E8F0',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                }}
                title="15 Minutes consultation session limit ONLY AFTER THAT NO ACCESS"
              >
                <Clock size={12} />
                <span>{isTimerExpired ? 'EXPIRED (00:00)' : formatTimer(sessionSeconds)}</span>
              </div>
            )}
          </div>

          {/* Mode Selector Strip */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '2px',
            }}
          >
            {ASTROLOGER_MODES.map((mode) => {
              const isSelected = mode.id === activeModeId;
              const isLockedForUser = isFreeOrGuest && mode.id !== 'vedic-master';

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveModeId(mode.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#1C202C' : '#25282E',
                    border: isSelected ? '1px solid #11A8EB' : '1px solid #41454D',
                    color: isSelected ? '#FFFFFF' : '#A6A9AF',
                    fontSize: '12px',
                    fontWeight: isSelected ? 650 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    opacity: isLockedForUser ? 0.75 : 1,
                  }}
                  title={isLockedForUser ? 'Locked for free users. Click to unlock with Premium.' : mode.title}
                >
                  {isLockedForUser ? <Lock size={13} color="#FBBF24" /> : mode.icon}
                  <span>{mode.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Free Timer Notice Bar */}
        {isFreeOrGuest && (
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: isTimerExpired ? '#161215' : '#25282E',
              borderBottom: '1px solid #41454D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11.5px',
              color: isTimerExpired ? '#FCA5A5' : '#D5D7DA',
            }}
          >
            <span>
              {isTimerExpired
                ? '15 Minutes consultation session limit reached. ONLY AFTER THAT NO ACCESS. Upgrade to Premium to continue consulting.'
                : `15 Minutes consultation session limit ONLY AFTER THAT NO ACCESS (${formatTimer(sessionSeconds)} remaining).`}
            </span>
            <button
              type="button"
              onClick={() => openUpgradeModal('AI Astrologer 10-Minute Consultation Limit')}
              style={{
                backgroundColor: '#11A8EB',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 12px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 650,
                cursor: 'pointer',
              }}
            >
              Upgrade
            </button>
          </div>
        )}

        {/* Chat Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#050608',
          }}
        >
          {activeConversation.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isStreaming={isStreaming && message.id === activeConversation.messages[activeConversation.messages.length - 1]?.id}
              onRegenerate={regenerateLastMessage}
            />
          ))}

          {isStreaming && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A6A9AF', fontSize: '12px' }}>
              <Clock size={13} className="animate-spin" color="#11A8EB" />
              <span>Analyzing planetary configurations...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid #41454D',
            backgroundColor: '#101722',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#25282E',
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
              placeholder={`Ask ${activeMode.name} regarding your horoscope, career, marriage or yogas...`}
              rows={1}
              disabled={isStreaming || isTimerExpired}
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
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!inputVal.trim() || isStreaming || isTimerExpired}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: inputVal.trim() && !isStreaming ? '#11A8EB' : '#1C1F2B',
                border: 'none',
                color: inputVal.trim() && !isStreaming ? '#FFFFFF' : '#64748B',
                cursor: inputVal.trim() && !isStreaming ? 'pointer' : 'not-allowed',
                flexShrink: 0,
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .ai-assistant-container {
            grid-template-columns: 1fr !important;
            gap: 0px !important;
            height: calc(100vh - 140px) !important;
          }
          .ai-history-sidebar {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 280px !important;
            max-width: 85vw !important;
            z-index: 40 !important;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8) !important;
          }
        }
      `}</style>
    </div>
  );
};
