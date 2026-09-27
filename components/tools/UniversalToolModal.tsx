'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Bookmark, Share2, ArrowRight, RotateCcw, AlertCircle, Check } from 'lucide-react';
import { AstrologyResultObject } from '@/types';
import { saveCalculationItem } from '@/lib/astrology-engine/history-engine';

interface UniversalToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolTitle: string;
  toolCategory: string;
  toolDescription: string;
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

        {/* 5-Step Universal Result Architecture */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'modalFadeIn 220ms ease' }}>
            {/* 1. RESULT HEADER */}
            <Card variant="gradient" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--gold-primary)', letterSpacing: '0.05em' }}>
                  CALCULATED RESULT
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleSave}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 8px',
                      color: saved ? '#34C759' : 'var(--text-secondary)',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {saved ? <Check size={12} /> : <Bookmark size={12} />}
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 8px',
                      color: copied ? '#34C759' : 'var(--text-secondary)',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? <Check size={12} /> : <Share2 size={12} />}
                    <span>{copied ? 'Copied' : 'Share'}</span>
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
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
                  Quality: {result.interpretation.quality}
                </Badge>
              )}
            </Card>

            {/* SMART TOOL DESCRIPTION & WHAT YOU GAIN UPON CALCULATION */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(14, 10, 24, 0.95) 100%)',
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#FACC15', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} />
                  <span>About {toolTitle}</span>
                </h4>
                <p style={{ fontSize: '12.5px', color: '#E4DCF9', lineHeight: 1.55 }}>
                  {toolDescription} This calculation cross-references your exact astronomical coordinates and birth degrees with classical Vedic Jyotish principles to evaluate planetary dignity, aspects, and temporal strength.
                </p>
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#38BDF8', marginBottom: '4px' }}>
                  ✦ What You Gain from This Calculation
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  A clear, grounded understanding of your planetary influences, empowering you to navigate karmic cycles, optimize personal timing, and make informed choices aligned with your cosmic blueprint.
                </p>
              </div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-rose-light)', marginBottom: '6px' }}>
                ✦ What This Means
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {result.interpretation.whatThisMeans}
              </p>
            </div>

            {/* 3. HOW IT WAS CALCULATED */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                ⚙ How It Was Calculated
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {result.interpretation.howCalculated}
              </p>
            </div>

            {/* 4. TRADITIONAL INTERPRETATION */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                📜 Traditional Astrological Interpretation
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {result.interpretation.traditionalContext}
              </p>
            </div>

            {/* 5. CONSULT EXPERT ASTROLOGER ON THIS RESULT */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(255, 106, 0, 0.2) 0%, rgba(250, 204, 21, 0.15) 100%)',
                border: '1px solid rgba(255, 106, 0, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
                  Consult Expert Astrologer on This Result
                </p>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  Opens consultation with this calculation as verified evidence
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onClose();
                  onAskAI(`Explain this ${toolTitle} result: "${result.interpretation.summary}". What does it mean for my personal journey?`);
                }}
                icon={<Sparkles size={14} />}
              >
                Consult Astrologer
              </Button>
            </div>

            {/* Related Tools Links */}
            {result.relatedTools && result.relatedTools.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  RELATED TOOLS:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                  {result.relatedTools.map((rt) => (
                    <button
                      key={rt.id}
                      onClick={() => onSelectRelatedTool && onSelectRelatedTool(rt.id)}
                      style={{
                        padding: '6px 10px',
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

            {/* Contextual Ethical Disclaimer */}
            <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4, textAlign: 'center', marginTop: '8px' }}>
              {result.disclaimer}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
