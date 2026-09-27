'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Bookmark, Share2, ArrowRight, RotateCcw, AlertCircle, Check, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { AstrologyResultObject } from '@/types';
import { saveCalculationItem } from '@/lib/astrology-engine/history-engine';

interface UniversalToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolTitle: string;
  toolCategory: string;
  toolDescription: string;
  toolHowItWorks?: string;
  toolKeyFeatures?: string[];
  toolPracticalGuidance?: string;
  inputFormNode: React.ReactNode;
  result: AstrologyResultObject | null;
  isLoading: boolean;
  errorMessage?: string | null;
  onCalculate: () => void;
  onReset?: () => void;
  onAskAI: (prompt: string) => void;
  onSelectRelatedTool?: (toolId: string) => void;
}

export const UniversalToolModal: React.FC<UniversalToolModalProps> = ({
  isOpen,
  onClose,
  toolTitle,
  toolCategory,
  toolDescription,
  toolHowItWorks,
  toolKeyFeatures,
  toolPracticalGuidance,
  inputFormNode,
  result,
  isLoading,
  errorMessage,
  onCalculate,
  onReset,
  onAskAI,
  onSelectRelatedTool,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = () => {
    if (result) {
      const summaryText = `${toolTitle} Result:\n${result.interpretation.summary}\nCalculated via AstroNex`;
      navigator.clipboard?.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (result) {
      saveCalculationItem(
        result.toolId,
        toolTitle,
        JSON.stringify(result.input).slice(0, 40),
        result.interpretation.summary,
        'User',
        result
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2400);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={toolTitle} size="lg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Tool Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
          <div>
            <Badge variant="plum" size="sm">
              {toolCategory}
            </Badge>
          </div>
          {onReset && (
            <button
              onClick={onReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Input Form Section */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          {inputFormNode}

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="primary"
              size="md"
              onClick={onCalculate}
              disabled={isLoading}
              loading={isLoading}
            >
              Calculate Result
            </Button>
          </div>
        </div>

        {/* Error State */}
        {errorMessage && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(235, 87, 87, 0.15)',
              border: '1px solid rgba(235, 87, 87, 0.3)',
              color: '#FF7B7B',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Simple Arranged Result Layout */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'modalFadeIn 220ms ease' }}>
            {/* 1. Main Result Card */}
            <Card variant="gradient" style={{ padding: '20px', border: '1.5px solid var(--theme-orange-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold-primary)', letterSpacing: '0.06em' }}>
                  ✦ VERIFIED CALCULATION RESULT
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleSave}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      color: saved ? '#34C759' : 'var(--text-secondary)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {saved ? <Check size={13} /> : <Bookmark size={13} />}
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      color: copied ? '#34C759' : 'var(--text-secondary)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? <Check size={13} /> : <Share2 size={13} />}
                    <span>{copied ? 'Copied' : 'Share'}</span>
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.4 }}>
                {result.interpretation.summary}
              </h3>

              {result.interpretation.quality && (
                <Badge
                  variant={
                    result.interpretation.quality === 'Good'
                      ? 'gold'
                      : result.interpretation.quality === 'Avoid'
                      ? 'rose'
                      : 'surface'
                  }
                  size="sm"
                >
                  Status: {result.interpretation.quality}
                </Badge>
              )}
            </Card>

            {/* 2. Simple 'How This Tool Works' Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#38BDF8',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <BookOpen size={14} />
                <span>How This Tool Works</span>
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {toolHowItWorks ||
                  result.interpretation.howCalculated ||
                  `Calculated using your precise astronomical coordinates and Vedic sidereal degrees with Lahiri Ayanamsa.`}
              </p>
            </div>

            {/* 3. Simple 'Key Insights You Receive' Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#FACC15',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} />
                <span>Key Insights You Receive</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(toolKeyFeatures || [
                  'Sidereal planetary position mapped to classical astrological canons.',
                  'Direct evaluation of strength, harmony, and cosmic influences.',
                  'Clear timing awareness to optimize important life decisions.',
                ]).map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: '#E2E8F0' }}>
                    <span style={{ color: 'var(--gold-primary)', fontWeight: 800 }}>•</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Simple 'Practical Guidance' Card */}
            <div
              style={{
                background: 'rgba(216, 197, 138, 0.08)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(216, 197, 138, 0.25)',
              }}
            >
              <h4
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: 'var(--gold-primary)',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Compass size={14} />
                <span>Practical Guidance</span>
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                {toolPracticalGuidance ||
                  result.interpretation.whatThisMeans ||
                  'Use this calculation for reflective awareness, harmony, and informed personal decisions.'}
              </p>
            </div>

            {/* 5. Consult Specialist Astrologer on This Result */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(255, 106, 0, 0.2) 0%, rgba(250, 204, 21, 0.15) 100%)',
                border: '1px solid rgba(255, 106, 0, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                  Consult Specialist Astrologer
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Discuss this {toolTitle} result directly with our expert
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onAskAI(`Explain this ${toolTitle} result: "${result.interpretation.summary}". What does it mean for my personal journey?`);
                }}
                icon={<Sparkles size={14} />}
              >
                Ask Specialist
              </Button>
            </div>

            {/* Related Tools Links */}
            {result.relatedTools && result.relatedTools.length > 0 && (
              <div style={{ marginTop: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  RELATED TOOLS:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                  {result.relatedTools.map((rt) => (
                    <button
                      key={rt.id}
                      onClick={() => onSelectRelatedTool && onSelectRelatedTool(rt.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '11.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>{rt.title}</span>
                      <ArrowRight size={11} color="var(--accent-rose-light)" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Simple Contextual Note */}
            <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4, textAlign: 'center', marginTop: '4px' }}>
              {result.disclaimer || 'Astrological interpretations are reflective guides based on classical Jyotish.'}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
