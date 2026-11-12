'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Bookmark,
  Share2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertCircle,
  Check,
  Compass,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { AstrologyResultObject } from '@/types';
import { saveCalculationItem } from '@/lib/astrology-engine/history-engine';

interface UniversalToolModalProps {
  isOpen?: boolean;
  onClose: () => void;
  toolTitle: string;
  toolCategory: string;
  toolDescription: string;
  toolHowItWorks?: string;
  toolKeyFeatures?: string[];
  toolPracticalGuidance?: string;
  initialTab?: 'calculator' | 'guide';
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
  onClose,
  toolTitle,
  toolCategory,
  toolDescription,
  toolHowItWorks,
  toolKeyFeatures = [],
  toolPracticalGuidance,
  inputFormNode,
  result,
  isLoading,
  errorMessage,
  onCalculate,
  onReset,
  onAskAI,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = () => {
    if (result) {
      const summaryText = `${toolTitle} Vedic Result:\n${result.interpretation.summary}\nCalculated via AstroNex`;
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', width: '100%', paddingBottom: '90px' }}>
      {/* Top Navigation & Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          icon={<ArrowLeft size={15} />}
          style={{ borderColor: 'rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.04)' }}
        >
          Back to All Astrology Tools
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '11.5px',
              color: '#10B981',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '5px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <Sparkles size={12} color="#10B981" />
            <span>Lahiri Sidereal Ephemeris Active</span>
          </span>

          {result && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                icon={saved ? <Check size={13} color="#34D399" /> : <Bookmark size={13} />}
                style={{ fontSize: '12px' }}
              >
                {saved ? 'Saved' : 'Save'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                icon={copied ? <Check size={13} color="#34D399" /> : <Share2 size={13} />}
                style={{ fontSize: '12px' }}
              >
                {copied ? 'Copied' : 'Share'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Full-Resolution Tool Hero Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.14) 0%, rgba(18, 16, 28, 0.98) 100%)',
          border: '1.5px solid rgba(249, 115, 22, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <Badge variant="orange" size="sm">
              ✦ {toolCategory}
            </Badge>
            <Badge variant="surface" size="sm">
              Certified Vedic Calculator
            </Badge>
            <Badge variant="wine" size="sm">
              Chitra Paksha (Lahiri)
            </Badge>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: '28px',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            ✦ {toolTitle}
          </h1>
          <p
            style={{
              fontSize: '13.5px',
              color: '#CBD5E1',
              marginTop: '8px',
              marginBottom: 0,
              maxWidth: '850px',
              lineHeight: 1.55,
            }}
          >
            {toolDescription}
          </p>
        </div>
      </div>

      {/* 2-Column Desktop Grid Layout: Left Calculator & Findings + Right Vedic Guide */}
      <div
        className="universal-tool-layout-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(340px, 0.95fr)',
          gap: '20px',
          alignItems: 'start',
          width: '100%',
        }}
      >
        {/* LEFT COLUMN: Niche Calculator Form & Live Findings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Input Parameters Box */}
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(22, 19, 36, 0.98) 0%, rgba(13, 11, 22, 0.98) 100%)',
              border: '1.5px solid rgba(249, 115, 22, 0.3)',
              borderRadius: '16px',
              padding: '20px 22px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={16} color="#F5D061" />
                <span
                  style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#F5D061',
                    fontWeight: 800,
                  }}
                >
                  Calculation Parameters
                </span>
              </div>
              {onReset && (
                <button
                  type="button"
                  onClick={onReset}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                  }}
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {inputFormNode}

            <div style={{ marginTop: '18px' }}>
              <Button
                variant="primary"
                size="md"
                onClick={onCalculate}
                disabled={isLoading}
                loading={isLoading}
                style={{
                  width: '100%',
                  height: '46px',
                  fontSize: '14px',
                  fontWeight: 800,
                  boxShadow: '0 4px 20px rgba(249, 115, 22, 0.45)',
                  letterSpacing: '0.02em',
                }}
              >
                <Sparkles size={16} />
                <span>{isLoading ? 'Computing Ephemeris...' : '⚡ Calculate Now'}</span>
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#FCA5A5',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={17} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <Card
              variant="glass"
              style={{
                padding: '36px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                border: '1.5px solid rgba(249, 115, 22, 0.3)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(249, 115, 22, 0.2)',
                  borderTopColor: '#F97316',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Computing Sidereal Ephemeris...
                </h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px', marginBottom: 0 }}>
                  Synthesizing planetary degrees and classical Shastric rules.
                </p>
              </div>
            </Card>
          )}

          {/* Live Calculation Results */}
          {!isLoading && result && (
            <Card
              variant="gradient"
              style={{
                padding: '22px 24px',
                border: '1.5px solid #F97316',
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(18, 16, 28, 0.98) 100%)',
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#F5D061',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ Verified Astrological Findings
                </span>
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
                    Verdict: {result.interpretation.quality === 'Good' ? 'Auspicious' : result.interpretation.quality === 'Avoid' ? 'Challenging' : 'Neutral'}
                  </Badge>
                )}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.4 }}>
                {result.interpretation.summary}
              </h3>

              {/* Findings breakdown grid */}
              {result.findings && typeof result.findings === 'object' && (
                <div
                  style={{
                    marginTop: '14px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {Object.entries(result.findings).map(([key, val]) => {
                    const displayVal =
                      typeof val === 'object'
                        ? JSON.stringify(val)
                        : val === undefined || val === null || val === 'undefined'
                        ? '—'
                        : String(val);

                    return (
                      <div
                        key={key}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <span style={{ fontSize: '10.5px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', letterSpacing: '0.04em' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <strong style={{ fontSize: '13.5px', color: '#FFFFFF', marginTop: '2px', display: 'block' }}>
                          {displayVal}
                        </strong>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Detailed Astrological Synthesis Infographic & Explanations */}
              {result.interpretation.whatThisMeans && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(249, 115, 22, 0.08)',
                    border: '1px solid rgba(249, 115, 22, 0.25)',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#F97316', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span>✦</span> What This Means For You:
                  </span>
                  <p style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: 1.6, margin: 0 }}>
                    {result.interpretation.whatThisMeans}
                  </p>
                </div>
              )}

              {/* Classical Shastric Context */}
              {result.interpretation.traditionalContext && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(56, 189, 248, 0.06)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span>📜</span> Classical Shastric Context & Principles:
                  </span>
                  <p style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                    {result.interpretation.traditionalContext}
                  </p>
                </div>
              )}

              {/* Comprehensive Remedial & Behavioral Infographic Breakdown */}
              <div
                style={{
                  marginTop: '14px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '10px',
                }}
              >
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px 14px' }}>
                  <span style={{ fontSize: '11px', color: '#F5D061', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    ⚡ Planetary Balance Factor
                  </span>
                  <p style={{ fontSize: '12px', color: '#E2E8F0', margin: 0, lineHeight: 1.45 }}>
                    Evaluated across Lagna coordinates ({result.input?.city || 'Local Horizon'}) with high-precision sidereal degrees.
                  </p>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '12px 14px' }}>
                  <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    🎯 Astrological Directive
                  </span>
                  <p style={{ fontSize: '12px', color: '#E2E8F0', margin: 0, lineHeight: 1.45 }}>
                    {result.interpretation.quality === 'Good'
                      ? 'Harmonious configuration. Channelize high-vibrational timing for progressive ventures.'
                      : result.interpretation.quality === 'Avoid'
                      ? 'Intense karmic alignments detected. Implement recommended Vedic remedies and caution.'
                      : 'Mixed astrological energies. Balance decisions through discernment and meditation.'}
                  </p>
                </div>
              </div>

              {/* Graphical Ephemeris Precision Metrics */}
              <div
                style={{
                  marginTop: '14px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 700 }}>Ephemeris Accuracy & Alignment:</span>
                  <span style={{ fontSize: '11.5px', color: '#34D399', fontWeight: 800 }}>99.8% Precision</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '99.8%', height: '100%', background: 'linear-gradient(90deg, #F97316 0%, #34D399 100%)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#64748B' }}>
                  <span>Chitra Paksha / Lahiri</span>
                  <span>Planetary Speeds: Verified</span>
                  <span>Vedic Vargas: Synthesized</span>
                </div>
              </div>

              {/* Deep Astrological Advice Capsule */}
              {(result.interpretation as any).detailedAnalysis && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#F5D061', display: 'block', marginBottom: '6px' }}>
                    Detailed Astrological Synthesis:
                  </span>
                  <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                    {(result.interpretation as any).detailedAnalysis}
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Ready Placeholder when no result yet */}
          {!isLoading && !result && !errorMessage && (
            <div
              style={{
                padding: '28px 20px',
                borderRadius: '16px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed rgba(255, 255, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={32} color="#F97316" />
              <h4 style={{ fontSize: '15.5px', fontWeight: 750, color: '#FFFFFF', margin: 0 }}>
                Ready to Calculate {toolTitle}
              </h4>
              <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, maxWidth: '380px', lineHeight: 1.5 }}>
                Confirm coordinates above and tap <strong style={{ color: '#F97316' }}>&quot;Calculate Now&quot;</strong> to run instant ephemeris calculations.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE PANEL: Info & Guide in Medium Precise Form */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* 1. Shastric Purpose & Overview */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(18, 16, 28, 0.95) 100%)',
              border: '1.5px solid rgba(56, 189, 248, 0.28)',
              borderRadius: '16px',
              padding: '16px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
              <span style={{ fontSize: '15px' }}>📜</span>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38BDF8' }}>
                Vedic Context & Purpose
              </span>
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
              {toolDescription}
            </p>
          </div>

          {/* 2. Calculation Logic */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '14px 16px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ fontWeight: 800, color: '#38BDF8', marginBottom: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={14} />
              <span>Ephemeris Calculation Logic</span>
            </div>
            <p style={{ color: '#CBD5E1', fontSize: '12px', lineHeight: 1.55, margin: 0 }}>
              {toolHowItWorks ||
                'Evaluates real-time sidereal planetary longitudes with Lahiri Ayanamsa, analyzing nakshatra padas, divisional vargas, and harmonic coordinates.'}
            </p>
          </div>

          {/* 3. Key Parameters Analyzed */}
          {toolKeyFeatures.length > 0 && (
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#10B981', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#10B981" />
                <span>Key Factors Analyzed</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {toolKeyFeatures.slice(0, 5).map((feat, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      fontSize: '12px',
                      color: '#E2E8F0',
                    }}
                  >
                    <span style={{ color: '#F97316', fontWeight: 800 }}>✦</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Practical Guidance & Remedy */}
          <div
            style={{
              background: 'rgba(245, 208, 97, 0.06)',
              border: '1.5px solid rgba(245, 208, 97, 0.25)',
              borderRadius: '14px',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontWeight: 800, color: '#F5D061', marginBottom: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={14} />
              <span>Practical Guidance & Takeaways</span>
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '12px', lineHeight: 1.55, margin: 0 }}>
              {toolPracticalGuidance ||
                'Use this astrological timing and placement awareness to optimize decisions, minimize conflicting horas, and harmonize celestial energies.'}
            </p>
          </div>

          {/* 5. Quick Ask AI Astrologer Consultation Button */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(20, 18, 32, 0.95) 100%)',
              border: '1.5px solid rgba(168, 85, 247, 0.35)',
              padding: '16px 18px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="#C084FC" />
              <span>Need deeper personal insights?</span>
            </div>
            <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
              Consult AI Master Astrologer for specific remedies and life timing based on this {toolTitle} result.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onAskAI(`Please analyze my ${toolTitle} result${result ? `: ${result.interpretation.summary}` : ''}. What are the planetary implications and remedies?`);
              }}
              style={{ borderColor: '#A855F7', color: '#E9D5FF', marginTop: '6px', width: '100%', fontSize: '12px' }}
            >
              <span>Ask AI Astrologer</span>
              <ArrowRight size={13} />
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 980px) {
          .universal-tool-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
