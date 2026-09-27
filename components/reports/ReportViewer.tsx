'use client';

import React from 'react';
import { AstrologyReport } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useConsultant } from '@/lib/state/consultant-context';
import {
  X,
  Printer,
  Sparkles,
  Share2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Award,
  Flame,
  ArrowLeft,
} from 'lucide-react';

interface ReportViewerProps {
  report: AstrologyReport;
  onBack: () => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ report, onBack }) => {
  const { startSpecialistSession } = useConsultant();

  const handlePrint = () => {
    window.print();
  };

  const handleAskSpecialist = () => {
    const rType = report.type || report.reportType;
    let specialistId = 'classic';
    if (rType === 'love-marriage' || rType === 'compatibility') {
      specialistId = 'love_relationships';
    } else if (rType === 'career-wealth') {
      specialistId = 'career_wealth';
    } else if (rType === 'transit-forecast') {
      specialistId = 'daily_guidance';
    }
    startSpecialistSession(specialistId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '80px' }}>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          icon={<ArrowLeft size={14} />}
        >
          Back to Reports Hub
        </Button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            icon={<Printer size={14} />}
          >
            Print / Save PDF
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleAskSpecialist}
            icon={<Sparkles size={14} />}
          >
            Discuss with Specialist Astrologer
          </Button>
        </div>
      </div>

      {/* Report Header Cover */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(139, 47, 85, 0.3) 0%, rgba(20, 20, 24, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-xl)',
          padding: '30px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div>
            <Badge variant="gold" size="sm" style={{ marginBottom: '8px' }}>
              ✦ Certified AstroNex Analysis
            </Badge>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {report.title}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Generated for <strong style={{ color: 'var(--text-primary)' }}>{report.profileName}</strong> on{' '}
              {new Date(report.generatedAt).toLocaleDateString(undefined, { dateStyle: 'long' })} • System: Vedic Sidereal (Chitra Paksha Lahiri)
            </p>
          </div>
        </div>

        {/* Ethical / Symbolic Disclaimer Banner */}
        <div
          style={{
            padding: '10px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11.5px',
            color: 'var(--text-muted)',
          }}
        >
          <AlertCircle size={14} color="var(--gold-primary)" />
          <span>
            Astrological insights represent classical symbolic archetypes and psychological tendencies, not immutable or guaranteed life outcomes. Use for self-reflection and timing awareness.
          </span>
        </div>
      </div>

      {/* Strengths & Growth Areas Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <Card style={{ padding: '20px', borderLeft: '4px solid var(--gold-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Award size={18} color="var(--gold-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Identified Chart Strengths
            </h3>
          </div>
          <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            {report.keyStrengths.map((str, idx) => (
              <li key={idx}>{str}</li>
            ))}
          </ul>
        </Card>

        <Card style={{ padding: '20px', borderLeft: '4px solid var(--accent-rose-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Flame size={18} color="var(--accent-rose-light)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Conscious Growth Areas
            </h3>
          </div>
          <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            {report.keyGrowthAreas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Structured Chapters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {report.chapters.map((chapter, idx) => (
          <Card key={chapter.id} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Badge variant="outline" size="sm">
                Chapter {idx + 1}
              </Badge>
              <span style={{ fontSize: '12px', color: 'var(--gold-primary)', fontWeight: 600 }}>
                {chapter.subtitle}
              </span>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              {chapter.title}
            </h2>

            <p style={{ fontSize: '13.5px', color: 'var(--gold-primary)', fontWeight: 500, marginBottom: '14px', lineHeight: '1.5' }}>
              &ldquo;{chapter.summary}&rdquo;
            </p>

            <div
              style={{
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: '1.7',
                whiteSpace: 'pre-line',
                marginBottom: '18px',
              }}
            >
              {chapter.content}
            </div>

            {/* Calculated Evidence Matrix */}
            {chapter.evidence && chapter.evidence.length > 0 && (
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Calculated Chart Factors (Evidence)
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                  {chapter.evidence.map((ev: any, evIdx: number) => (
                    <div
                      key={evIdx}
                      style={{
                        padding: '8px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ev.factor}</div>
                      <div style={{ color: 'var(--gold-primary)', fontSize: '11.5px' }}>{ev.placement}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
                        Influence: {ev.influence}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Traditional Remedies & Disciplines */}
      {report.traditionalRemedies && report.traditionalRemedies.length > 0 && (
        <Card style={{ padding: '22px', border: '1px solid rgba(216, 197, 138, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={18} color="var(--gold-primary)" />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--gold-primary)' }}>
              Traditional Harmonizing Remedies & Disciplines
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
            {report.traditionalRemedies.map((rem, rIdx) => (
              <div
                key={rIdx}
                style={{
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12.5px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{rem}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bottom CTA to Specialist Astrologer */}
      <Card
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(255, 106, 0, 0.16) 0%, rgba(14, 14, 20, 0.95) 100%)',
          border: '1px solid rgba(255, 106, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div>
          <h4 style={{ fontSize: '16.5px', fontWeight: 800, color: '#FFFFFF' }}>
            Have deeper questions about this report?
          </h4>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Open a private consultation with an AstroNex Specialist to analyze specific timings, remedies, and career paths.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleAskSpecialist}
          icon={<Sparkles size={15} />}
        >
          Consult AstroNex Specialist
        </Button>
      </Card>
    </div>
  );
};
