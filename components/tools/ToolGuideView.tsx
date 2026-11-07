'use client';

import React from 'react';
import { ToolGuideData } from '@/lib/astrology-engine/tool-guides-data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
  HelpCircle,
  Share2,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ToolGuideViewProps {
  guide: ToolGuideData;
  onBack: () => void;
  onLaunchTool: (toolId: string) => void;
}

export const ToolGuideView: React.FC<ToolGuideViewProps> = ({
  guide,
  onBack,
  onLaunchTool,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Guide link copied to clipboard!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '90px' }}>
      {/* 1. Top Action & Breadcrumb Navigation Bar */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            icon={<ArrowLeft size={15} />}
          >
            Back to Tools Hub
          </Button>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '13px', color: 'var(--gold-primary)', fontWeight: 600 }}>
            {guide.title}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            icon={<Share2 size={14} />}
          >
            Share
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onLaunchTool(guide.toolId)}
            icon={<Calculator size={14} />}
          >
            Open Calculator Tool
          </Button>
        </div>
      </div>

      {/* 2. Hero Header Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(139, 47, 85, 0.35) 0%, rgba(14, 10, 24, 0.98) 100%)',
          border: '1.5px solid rgba(245, 208, 97, 0.35)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <Badge variant="gold" size="sm">
            {guide.branch}
          </Badge>
          <Badge variant="surface" size="sm">
            {guide.category}
          </Badge>
          <span style={{ fontSize: '12px', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} />
            <span>{guide.estimatedReadTime}</span>
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '30px',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.3,
            marginBottom: '8px',
          }}
        >
          {guide.title}
        </h1>

        <p style={{ fontSize: '15px', color: 'var(--gold-primary)', fontWeight: 600, marginBottom: '16px' }}>
          {guide.subtitle}
        </p>

        {/* Executive Introduction Callout */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderLeft: '4px solid var(--gold-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
          }}
        >
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={15} />
            <span>Executive Overview</span>
          </h4>
          <p style={{ fontSize: '14px', color: '#F1F5F9', lineHeight: 1.65 }}>
            {guide.introduction}
          </p>
        </div>
      </div>

      {/* 3. Section A & B: What It Is & What It Calculates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <Card variant="elevated" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <BookOpen size={18} color="var(--gold-primary)" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF' }}>
              What This Tool Is
            </h3>
          </div>
          <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: 1.65 }}>
            {guide.whatItIs}
          </p>
        </Card>

        <Card variant="elevated" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Calculator size={18} color="var(--gold-primary)" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF' }}>
              What It Calculates
            </h3>
          </div>
          <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: 1.65 }}>
            {guide.whatItCalculates}
          </p>
        </Card>
      </div>

      {/* 4. Section C: Calculation Engine Mechanics (How It Works) */}
      <Card variant="gradient" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Layers size={20} color="var(--gold-primary)" />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
            How the Calculation Works (Mathematical & Ephemeris Engine)
          </h3>
        </div>
        <p style={{ fontSize: '14px', color: '#E2E8F0', lineHeight: 1.75 }}>
          {guide.howItWorks}
        </p>
      </Card>

      {/* 5. Section D & E: Required Information & Why Needed */}
      <Card variant="glass" style={{ padding: '26px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '14px' }}>
          Required Birth Information & Scientific Rationale
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          To ensure astronomical accuracy, this tool relies upon precise geocentric celestial mechanics:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {guide.requiredInfo.map((info, idx) => (
            <div
              key={idx}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                {info.field}
              </div>
              <div style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5 }}>
                {info.whyNeeded}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 6. Section F: How to Read & Interpret Results */}
      <Card variant="elevated" style={{ padding: '26px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
          How to Read & Interpret Your Result
        </h3>
        <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '16px' }}>
          {guide.howToInterpret.overview}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {guide.howToInterpret.keyPoints.map((point, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <CheckCircle2 size={16} color="#34D399" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span style={{ fontSize: '13.5px', color: '#E2E8F0', lineHeight: 1.5 }}>{point}</span>
            </div>
          ))}
        </div>

        {guide.howToInterpret.matrix && guide.howToInterpret.matrix.length > 0 && (
          <div style={{ marginTop: '16px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--gold-primary)' }}>
                  <th style={{ padding: '8px 12px' }}>Indicator</th>
                  <th style={{ padding: '8px 12px' }}>Classical Meaning</th>
                  <th style={{ padding: '8px 12px' }}>Guidance & Upaya</th>
                </tr>
              </thead>
              <tbody>
                {guide.howToInterpret.matrix.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#FFFFFF' }}>{row.indicator}</td>
                    <td style={{ padding: '10px 12px', color: '#CBD5E1' }}>{row.meaning}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--gold-muted)' }}>{row.advice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* 7. Section G & H: Chart Relation & Myth-Busting Warning */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <Card variant="glass" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '10px' }}>
            How This Relates to Your Whole Birth Chart
          </h4>
          <p style={{ fontSize: '13.5px', color: '#CBD5E1', lineHeight: 1.65 }}>
            {guide.relationToChart}
          </p>
        </Card>

        {/* Myth-Buster Warning Box */}
        <div
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F87171', marginBottom: '10px' }}>
            <AlertTriangle size={18} />
            <h4 style={{ fontSize: '16px', fontWeight: 800 }}>
              What This Result Does NOT Mean
            </h4>
          </div>
          <ul style={{ paddingLeft: '20px', margin: 0, color: '#FECACA', fontSize: '13px', lineHeight: 1.65 }}>
            {guide.whatItDoesNotMean.map((item, mIdx) => (
              <li key={mIdx} style={{ marginBottom: '6px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8. Section I & J: Practical Real-Life Case Example */}
      <Card
        style={{
          padding: '26px',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
        }}
      >
        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#38BDF8', marginBottom: '10px' }}>
          Real-World Case Example & Practical Application
        </h4>
        <p style={{ fontSize: '13.5px', color: '#F1F5F9', marginBottom: '8px' }}>
          <strong>Scenario:</strong> {guide.practicalExample.scenario}
        </p>
        <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
          <strong>Input:</strong> {guide.practicalExample.inputs}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
          <strong>Finding:</strong> {guide.practicalExample.finding}
        </p>
        <p style={{ fontSize: '13.5px', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '8px' }}>
          <strong>Interpretation:</strong> {guide.practicalExample.interpretation}
        </p>
        <div style={{ padding: '10px 14px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '6px', borderLeft: '3px solid #38BDF8' }}>
          <span style={{ fontSize: '13px', color: '#BAE6FD', fontWeight: 600 }}>Actionable Guidance: </span>
          <span style={{ fontSize: '13px', color: '#E0F2FE' }}>{guide.practicalExample.actionableAdvice}</span>
        </div>
      </Card>

      {/* 9. FAQs Section */}
      {guide.faqs && guide.faqs.length > 0 && (
        <Card variant="glass" style={{ padding: '26px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} color="var(--gold-primary)" />
            <span>Frequently Asked Questions & Classical Nuances</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {guide.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                  Q: {faq.question}
                </div>
                <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6 }}>
                  A: {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 10. Bottom CTA Bar: Launch Tool Now */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(245, 208, 97, 0.16) 0%, rgba(217, 119, 6, 0.22) 100%)',
          border: '1.5px solid rgba(245, 208, 97, 0.4)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
            Ready to calculate your {guide.title.split(' ')[0]}?
          </h4>
          <p style={{ fontSize: '13px', color: '#FDE68A', maxWidth: '600px' }}>
            Launch the interactive calculator with your verified birth coordinates to generate your personal astrological reading.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => onLaunchTool(guide.toolId)}
          icon={<ArrowRight size={16} />}
        >
          Launch Calculator Now
        </Button>
      </div>
    </div>
  );
};
