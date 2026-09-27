'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/lib/state/chat-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useAstrology } from '@/lib/state/astrology-context';
import { ChatMessage } from './ChatMessage';
import { AstrologyContextBadge } from './AstrologyContextBadge';
import { QuickPromptChips } from './QuickPromptChips';
import { ChatHistoryDrawer } from './ChatHistoryDrawer';
import { GlowingOrb } from './GlowingOrb';
import {
  Send,
  Square,
  Paperclip,
  Mic,
  MicOff,
  History,
  Plus,
  Sparkles,
  Brain,
  Globe,
  MapPin,
} from 'lucide-react';

export const AIAssistantScreen: React.FC = () => {
  const {
    activeConversation,
    isStreaming,
    useAstrologyContext,
    toggleAstrologyContext,
    sendMessage,
    stopGeneration,
    regenerateLastMessage,
    createNewConversation,
    rateMessage,
    toggleSaveMessage,
  } = useChat();
  const { t } = useI18n();
  const { activeProfile } = useAstrology();

  const [inputVal, setInputVal] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [highThinking, setHighThinking] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation.messages, isStreaming]);

  const handleSend = () => {
    if (!inputVal.trim() || isStreaming) return;
    const toSend = attachmentName ? `[Attached: ${attachmentName}] ${inputVal}` : inputVal;
    sendMessage(toSend);
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
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setInputVal((prev) => (prev ? prev + ' ' : '') + 'What does my 10th house indicate about my career path?');
        setIsRecording(false);
      }, 2200);
    } else {
      setIsRecording(false);
    }
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
    }
  };

  const isWelcomeState = activeConversation.messages.length <= 1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 145px)',
        position: 'relative',
        maxWidth: '860px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <ChatHistoryDrawer isOpen={showHistory} onClose={() => setShowHistory(false)} />

      {/* 1. Header Toolbar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '0 0 12px 0',
          borderBottom: '1px solid var(--border-subtle)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowHistory(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 12px',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <History size={14} />
              <span>History</span>
            </button>

            <button
              onClick={createNewConversation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 12px',
                color: 'var(--text-muted)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <Plus size={14} />
              <span>New Session</span>
            </button>

            {/* Deep Reasoning Toggle */}
            <button
              onClick={() => setHighThinking(!highThinking)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: highThinking ? 'rgba(250, 204, 21, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                border: highThinking ? '1px solid rgba(250, 204, 21, 0.4)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 12px',
                color: highThinking ? '#FACC15' : 'var(--text-muted)',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Brain size={13} />
              <span>Deep Reasoning {highThinking ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Location & Ephemeris Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
              <Globe size={12} />
              <span>Grounded Intelligence</span>
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38BDF8' }}>
              <MapPin size={12} />
              <span>{activeProfile.birthPlace || 'Google Maps Registered'}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Astrology Context Badge with Toggle */}
        <AstrologyContextBadge
          useContext={useAstrologyContext}
          onToggle={toggleAstrologyContext}
        />
      </div>

      {/* 2. Scrollable Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 4px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Welcome Empty State */}
        {isWelcomeState && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              margin: 'auto 0 24px',
              padding: '0 16px',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <GlowingOrb size={64} state={isStreaming ? 'thinking' : 'idle'} />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              Chat with Expert Astrologers
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: 1.5, marginBottom: '24px' }}>
              Deep astrological reasoning engine synthesizing your birth chart placements, active Mahadashas, and live planetary ephemeris.
            </p>

            {/* Suggested Prompts */}
            <div style={{ width: '100%', maxWidth: '580px' }}>
              <QuickPromptChips onSelectPrompt={(p) => sendMessage(p)} />
            </div>
          </div>
        )}

        {/* Conversation Message List */}
        {activeConversation.messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isLast={index === activeConversation.messages.length - 1}
            onRegenerate={regenerateLastMessage}
            onRate={(feedback) => rateMessage(msg.id, feedback)}
            onToggleSave={() => toggleSaveMessage(msg.id)}
          />
        ))}

        {/* Thinking Indicator */}
        {isStreaming && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', color: '#FACC15', fontSize: '12.5px' }}>
            <Sparkles size={15} className="ai-orb-thinking" />
            <span>Consulting chart & Google verified ephemeris...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Stop Generation Button (if streaming) */}
      {isStreaming && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <button
            onClick={stopGeneration}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(14, 14, 20, 0.95)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
            }}
          >
            <Square size={12} fill="var(--theme-orange)" color="var(--theme-orange)" />
            <span>Stop Response</span>
          </button>
        </div>
      )}

      {/* 4. Active Attachment Pill */}
      {attachmentName && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px',
            color: '#FACC15',
            marginBottom: '6px',
          }}
        >
          <span>Attached: {attachmentName}</span>
          <button
            onClick={() => setAttachmentName(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* 5. Voice Listening Wave */}
      {isRecording && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '8px',
            backgroundColor: 'rgba(255, 106, 0, 0.2)',
            borderRadius: 'var(--radius-md)',
            color: '#FF8C33',
            fontSize: '12px',
            marginBottom: '6px',
          }}
        >
          <Mic size={15} />
          <span>Listening to your cosmic question...</span>
        </div>
      )}

      {/* 6. Input Control Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '8px 12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Attachment Upload */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'color 160ms ease',
          }}
          title="Attach chart image or PDF"
        >
          <Paperclip size={18} />
          <input
            type="file"
            accept="image/*,.pdf,.txt"
            onChange={handleAttachment}
            style={{ display: 'none' }}
          />
        </label>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your Dasha, transits, career, relationships, or gemstones..."
          rows={1}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#FFFFFF',
            fontSize: '13.5px',
            lineHeight: 1.5,
            resize: 'none',
            maxHeight: '120px',
            padding: '6px 4px',
          }}
        />

        {/* Mic Voice */}
        <button
          type="button"
          onClick={toggleVoiceRecording}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: isRecording ? 'rgba(255, 106, 0, 0.3)' : 'none',
            border: 'none',
            color: isRecording ? 'var(--theme-orange)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
          title={isRecording ? 'Stop voice recording' : 'Speak inquiry'}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputVal.trim() || isStreaming}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: inputVal.trim() && !isStreaming ? 'linear-gradient(135deg, #FF6A00 0%, #D95300 100%)' : 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: inputVal.trim() && !isStreaming ? '#FFFFFF' : 'var(--text-dim)',
            cursor: inputVal.trim() && !isStreaming ? 'pointer' : 'not-allowed',
            boxShadow: inputVal.trim() && !isStreaming ? '0 2px 10px rgba(255, 106, 0, 0.4)' : 'none',
            transition: 'all 160ms ease',
          }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};
