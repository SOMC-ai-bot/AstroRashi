'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useConsultant } from '@/lib/state/consultant-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { ChatMessage } from '../ai/ChatMessage';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  X,
  Sparkles,
  Send,
  Lock,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Calculator,
  Compass,
  Heart,
  Briefcase,
  Clock,
  Brain,
  Globe,
  MapPin,
} from 'lucide-react';

export const AIConsultantChatModal: React.FC = () => {
  const {
    specialists,
    selectedSpecialist,
    activeSession,
    sessionRemainingSeconds,
    isStreaming,
    sendSpecialistMessage,
    endSpecialistSession,
    openSpecialistModal,
    setOpenSpecialistModal,
    switchSpecialist,
  } = useConsultant();

  const { openUpgradeModal, canAccessPersona } = useSubscription();
  const { activeProfile, natalChart } = useAstrology();

  const [inputVal, setInputVal] = useState('');
  const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);
  const [highThinking, setHighThinking] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isStreaming]);

  if (!openSpecialistModal || !activeSession || !selectedSpecialist) return null;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isStreaming) return;
    sendSpecialistMessage(text);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isExpired = activeSession.status === 'expired';

  const getSpecialistIcon = (id: string) => {
    switch (id) {
      case 'love_relationships':
        return <Heart size={16} color="#FACC15" />;
      case 'career_wealth':
        return <Briefcase size={16} color="var(--theme-orange)" />;
      case 'daily_guidance':
        return <Clock size={16} color="#38BDF8" />;
      case 'classic':
      default:
        return <Sparkles size={16} color="var(--theme-orange)" />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 5, 8, 0.9)',
        backdropFilter: 'blur(18px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '740px',
          height: '88vh',
          backgroundColor: '#0E0E14',
          border: '1px solid rgba(255, 106, 0, 0.28)',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 106, 0, 0.25)',
          overflow: 'hidden',
          animation: 'modalFadeIn 220ms ease',
        }}
      >
        {/* 1. Header Toolbar */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(14, 14, 20, 0.98)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            zIndex: 10,
          }}
        >
          {/* Specialist Selector / Identity */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: `linear-gradient(135deg, ${selectedSpecialist.accentColor}33 0%, #08080B 100%)`,
                border: `1.5px solid ${selectedSpecialist.accentColor}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getSpecialistIcon(selectedSpecialist.id)}
            </div>

            <div>
              <div
                onClick={() => setShowSwitchDropdown(!showSwitchDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedSpecialist.name}
                </h3>
                <ChevronDown size={14} color="var(--text-muted)" />
              </div>
              <span style={{ fontSize: '11px', color: '#FACC15', fontWeight: 600 }}>
                ✦ AstroNex Specialist Mode
              </span>
            </div>

            {/* Switch Specialist Dropdown */}
            {showSwitchDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '48px',
                  left: 0,
                  width: '300px',
                  backgroundColor: '#121218',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85)',
                  padding: '8px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ padding: '6px 8px', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Switch Specialist Mode
                </div>
                {specialists.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => {
                      setShowSwitchDropdown(false);
                      switchSpecialist(spec.id, true);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: spec.id === selectedSpecialist.id ? 'rgba(255, 106, 0, 0.18)' : 'transparent',
                      color: spec.id === selectedSpecialist.id ? '#FF8C33' : 'var(--text-primary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      {getSpecialistIcon(spec.id)}
                    </div>
                    <span>{spec.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Toolbar: High Thinking Toggle & Session Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* High Thinking Toggle */}
            <button
              type="button"
              onClick={() => setHighThinking(!highThinking)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                borderRadius: 'var(--radius-full)',
                background: highThinking ? 'rgba(250, 204, 21, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: highThinking ? '1px solid rgba(250, 204, 21, 0.45)' : '1px solid var(--border-subtle)',
                color: highThinking ? '#FACC15' : 'var(--text-muted)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              title="Toggle Gemini Deep Astronomical Thinking"
            >
              <Brain size={13} />
              <span>Deep Thinking {highThinking ? 'ON' : 'OFF'}</span>
            </button>

            {/* Session Timer (if free mode with limit) */}
            {selectedSpecialist.isFreeTier && sessionRemainingSeconds !== null && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: sessionRemainingSeconds < 60 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  border: sessionRemainingSeconds < 60 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
                  color: sessionRemainingSeconds < 60 ? '#EF4444' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              >
                <Clock size={12} />
                <span>{formatTimer(sessionRemainingSeconds)}</span>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                setOpenSpecialistModal(false);
                endSpecialistSession();
              }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* 2. Google Grounding Info Bar */}
        <div
          style={{
            padding: '8px 18px',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={12} color="#10B981" />
            <span>Google Search Ephemeris Grounding: <strong style={{ color: '#10B981' }}>Active</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={12} color="#38BDF8" />
            <span>Google Maps Coordinates: <strong style={{ color: '#38BDF8' }}>{activeProfile.birthPlace || 'Varanasi, India'}</strong></span>
          </div>
        </div>

        {/* 3. Messages Stream */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {activeSession.messages.map((msg, idx) => (
            <ChatMessage
              key={msg.id || idx}
              message={msg}
              isLast={idx === activeSession.messages.length - 1}
            />
          ))}

          {isStreaming && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', color: '#FACC15', fontSize: '13px' }}>
              <span className="animate-spin" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(250, 204, 21, 0.3)', borderTopColor: '#FACC15', borderRadius: '50%' }} />
              <span>{selectedSpecialist.name} is consulting traditional Vedic texts & live ephemeris...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 4. Input Toolbar */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(14, 14, 20, 0.98)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
            }}
          >
            <input
              type="text"
              placeholder={`Ask ${selectedSpecialist.name}...`}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming || isExpired}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '13.5px',
              }}
            />

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSend()}
              disabled={!inputVal.trim() || isStreaming || isExpired}
              icon={<Send size={14} />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
