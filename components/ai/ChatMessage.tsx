'use client';

import React, { useState } from 'react';
import { AIMessage } from '@/types';
import {
  Copy,
  Check,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  Globe,
  Brain,
  ExternalLink,
} from 'lucide-react';

interface ChatMessageProps {
  message: AIMessage;
  isLast?: boolean;
  onRegenerate?: () => void;
  onRate?: (feedback: 'like' | 'dislike') => void;
  onToggleSave?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isLast,
  onRegenerate,
  onRate,
  onToggleSave,
}) => {
  const [copied, setCopied] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Helper to parse inline bolding and clean up markdown
  const formatInlineText = (text: string): React.ReactNode => {
    // Clean up any stray triple asterisks
    const cleaned = text.replace(/\*\*\*(.*?)\*\*\*/g, '$1');
    const parts = cleaned.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#FFFFFF', fontWeight: 650 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Markdown parser for headings, bullet points, dividers, and code blocks
  const renderFormattedContent = (content: string) => {
    if (!content) return null;

    // Filter out raw standalone *** or --- lines into clean divider elements
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];

    lines.forEach((rawLine, index) => {
      const line = rawLine.trim();

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              style={{
                backgroundColor: '#0A0A0E',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                overflowX: 'auto',
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#FACC15',
                margin: '10px 0',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <code>{codeContent.join('\n')}</code>
            </pre>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(rawLine);
        return;
      }

      // Check for markdown horizontal divider (*** or --- or ___ or lone asterisks)
      if (line === '***' || line === '---' || line === '___' || /^[\*\-_]{3,}$/.test(line)) {
        elements.push(
          <div
            key={`hr-${index}`}
            style={{
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              margin: '14px 0',
              width: '100%',
            }}
          />
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={index}
            style={{
              fontSize: '16.5px',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '14px 0 6px',
              letterSpacing: '-0.01em',
            }}
          >
            {formatInlineText(line.replace('### ', ''))}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4
            key={index}
            style={{
              fontSize: '14.5px',
              fontWeight: 700,
              color: 'var(--theme-orange-light)',
              margin: '12px 0 4px',
            }}
          >
            {formatInlineText(line.replace('#### ', ''))}
          </h4>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li
            key={index}
            style={{
              marginLeft: '18px',
              marginBottom: '6px',
              fontSize: '13.5px',
              lineHeight: '1.55',
              color: 'var(--text-secondary)',
            }}
          >
            {formatInlineText(line.substring(2))}
          </li>
        );
      } else if (line === '') {
        elements.push(<div key={index} style={{ height: '8px' }} />);
      } else {
        elements.push(
          <p
            key={index}
            style={{
              fontSize: '13.5px',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              marginBottom: '6px',
            }}
          >
            {formatInlineText(line)}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
        maxWidth: '100%',
      }}
    >
      {/* Header Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px',
          fontSize: '11px',
          color: 'var(--text-muted)',
          padding: '0 4px',
        }}
      >
        <span style={{ fontWeight: 700, color: isUser ? '#FFFFFF' : 'var(--theme-orange-light)' }}>
          {isUser ? 'You' : 'AstroNex Specialist'}
        </span>
        <span>•</span>
        <span>{message.timestamp}</span>
      </div>

      {/* Astrological Deep-Reasoning Process Drawer (Collapsible) */}
      {!isUser && message.thinking && (
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            marginBottom: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 106, 0, 0.25)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setShowThinking(!showThinking)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '12px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FACC15', fontWeight: 600 }}>
              <Brain size={14} color="#FACC15" />
              <span>Deep Astrological Reasoning</span>
              {message.thoughtDuration && (
                <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 400 }}>
                  (Thought for {message.thoughtDuration}s)
                </span>
              )}
            </span>
            {showThinking ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showThinking && (
            <div
              style={{
                padding: '10px 14px',
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                fontSize: '11.5px',
                fontFamily: 'monospace',
                color: '#C4C4CE',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                maxHeight: '180px',
                overflowY: 'auto',
              }}
            >
              {message.thinking}
            </div>
          )}
        </div>
      )}

      {/* Message Bubble */}
      <div
        style={{
          maxWidth: '85%',
          backgroundColor: isUser
            ? 'linear-gradient(135deg, #FF6A00 0%, #D95300 100%)'
            : 'rgba(20, 20, 26, 0.95)',
          background: isUser
            ? 'linear-gradient(135deg, #FF6A00 0%, #D95300 100%)'
            : 'rgba(18, 18, 24, 0.95)',
          border: isUser ? 'none' : '1px solid var(--border-card)',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          padding: '14px 18px',
          boxShadow: isUser
            ? '0 4px 20px rgba(255, 106, 0, 0.35)'
            : '0 4px 20px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {renderFormattedContent(message.content)}

        {/* Google Maps & Google Search Grounding Footers */}
        {!isUser && (message.mapsGrounding || (message.searchGrounding && message.searchGrounding.length > 0)) && (
          <div
            style={{
              marginTop: '14px',
              paddingTop: '10px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {/* Google Maps Location Verification */}
            {message.mapsGrounding && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: '#38BDF8',
                  background: 'rgba(37, 99, 235, 0.12)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  width: 'fit-content',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                }}
              >
                <MapPin size={12} />
                <span>Google Maps Geocoded: {message.mapsGrounding.placeName} ({message.mapsGrounding.latitude.toFixed(2)}°N, {message.mapsGrounding.longitude.toFixed(2)}°E)</span>
              </div>
            )}

            {/* Google Search Ephemeris Grounding */}
            {message.searchGrounding && message.searchGrounding.length > 0 && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: '#10B981',
                  background: 'rgba(16, 185, 129, 0.12)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  width: 'fit-content',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <Globe size={12} />
                <span>Google Search Grounded: Real-time Lahiri Ephemeris Verified</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Toolbar for Assistant Messages */}
      {!isUser && message.content && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '6px',
            padding: '2px 6px',
          }}
        >
          {/* Copy */}
          <button
            onClick={handleCopy}
            title="Copy message"
            style={{
              background: 'none',
              border: 'none',
              color: copied ? '#FACC15' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>

          {/* Regenerate (if last message) */}
          {isLast && onRegenerate && (
            <button
              onClick={onRegenerate}
              title="Regenerate"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <RotateCw size={14} />
            </button>
          )}

          {/* Thumbs Up */}
          {onRate && (
            <button
              onClick={() => onRate('like')}
              title="Helpful"
              style={{
                background: 'none',
                border: 'none',
                color: message.feedback === 'like' ? '#10B981' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ThumbsUp size={14} />
            </button>
          )}

          {/* Thumbs Down */}
          {onRate && (
            <button
              onClick={() => onRate('dislike')}
              title="Not helpful"
              style={{
                background: 'none',
                border: 'none',
                color: message.feedback === 'dislike' ? '#F87171' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ThumbsDown size={14} />
            </button>
          )}

          {/* Save / Bookmark */}
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              title="Save message"
              style={{
                background: 'none',
                border: 'none',
                color: message.isSaved ? '#FACC15' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Bookmark size={14} fill={message.isSaved ? '#FACC15' : 'none'} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
