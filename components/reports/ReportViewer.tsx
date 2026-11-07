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
  Download,
} from 'lucide-react';
import { downloadReportAsPDF } from '@/lib/utils/report-export';

interface ReportViewerProps {
  report: AstrologyReport;
  onBack: () => void;
}

function cleanAstrologyContent(text: string): React.ReactNode {
  if (!text) return '';
  // Strip standalone ***, --- or ___
  const cleaned = text
    .replace(/^\s*[\*\-_]{3,}\s*$/gm, '')
    .trim();
  if (!cleaned) return null;

  const parts: React.ReactNode[] = [];
  const regex = /(\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIdx = 0;
  let m;
  while ((m = regex.exec(cleaned)) !== null) {
    if (m.index > lastIdx) {
      parts.push(cleaned.substring(lastIdx, m.index).replace(/\*\*\*/g, '').replace(/\*\*/g, '').replace(/\*/g, ''));
    }
    const innerText = m[2] || m[3] || m[4];
    parts.push(
      <strong key={m.index} style={{ color: '#FACC15', fontWeight: 700 }}>
        {innerText.replace(/\*/g, '')}
      </strong>
    );
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < cleaned.length) {
    parts.push(cleaned.substring(lastIdx).replace(/\*\*\*/g, '').replace(/\*\*/g, '').replace(/\*/g, ''));
  }
  return parts.length > 0 ? parts : cleaned.replace(/\*/g, '');
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
      {/* Print-specific PDF Styles with Ultra-Sharp Contrast */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 14mm 14mm 16mm 14mm;
          }
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            text-rendering: optimizeLegibility !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
          }
          html, body {
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            color: #000000 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
            font-size: 11pt !important;
            line-height: 1.6 !important;
          }
          .no-print {
            display: none !important;
          }
          .pdf-page-break {
            page-break-before: always !important;
            break-before: page !important;
            margin-top: 24pt !important;
          }
          .pdf-report-card {
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            border: 1.5pt solid #334155 !important;
            color: #000000 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            padding: 16pt !important;
            margin-bottom: 16pt !important;
            border-radius: 6pt !important;
          }
          /* Headings: Deep contrast, pure black / rich amber-maroon */
          .pdf-report-card h1,
          .pdf-report-card h1 * {
            color: #000000 !important;
            font-size: 20pt !important;
            font-weight: 900 !important;
            line-height: 1.25 !important;
            margin-bottom: 6pt !important;
            text-shadow: none !important;
          }
          .pdf-report-card h2,
          .pdf-report-card h2 * {
            color: #78350F !important;
            font-size: 15pt !important;
            font-weight: 850 !important;
            line-height: 1.3 !important;
            margin-top: 10pt !important;
            margin-bottom: 6pt !important;
            border-left: 4.5pt solid #D97706 !important;
            padding-left: 8pt !important;
            text-shadow: none !important;
          }
          .pdf-report-card h3,
          .pdf-report-card h3 * {
            color: #92400E !important;
            font-size: 13pt !important;
            font-weight: 800 !important;
            line-height: 1.3 !important;
            margin-bottom: 6pt !important;
            text-shadow: none !important;
          }
          .pdf-report-card h4,
          .pdf-report-card h4 * {
            color: #78350F !important;
            font-size: 11.5pt !important;
            font-weight: 800 !important;
            margin-bottom: 6pt !important;
            text-shadow: none !important;
          }
          /* Body paragraphs: Crisp, pitch black, perfectly readable */
          .pdf-report-card p,
          .pdf-report-card p * {
            color: #000000 !important;
            font-size: 11pt !important;
            font-weight: 550 !important;
            line-height: 1.65 !important;
            margin-bottom: 8pt !important;
            text-align: left !important;
            letter-spacing: 0.01em !important;
          }
          .pdf-report-card strong,
          .pdf-report-card b {
            color: #000000 !important;
            font-weight: 900 !important;
          }
          .pdf-report-card span {
            color: #000000 !important;
            font-weight: 500 !important;
          }
          .pdf-report-card ul,
          .pdf-report-card ol {
            color: #000000 !important;
            padding-left: 18pt !important;
            margin-bottom: 10pt !important;
          }
          .pdf-report-card li,
          .pdf-report-card li * {
            color: #000000 !important;
            font-size: 11pt !important;
            font-weight: 550 !important;
            line-height: 1.6 !important;
            margin-bottom: 4pt !important;
          }
          /* Chapter summary quote box */
          .pdf-report-card div[style*="italic"],
          .pdf-report-card div[style*="fontStyle: 'italic'"] {
            background-color: #FFFDF5 !important;
            border: 1.5pt solid #F59E0B !important;
            border-left: 5pt solid #D97706 !important;
            color: #000000 !important;
            font-weight: 600 !important;
            font-size: 11.5pt !important;
            line-height: 1.6 !important;
            padding: 10pt 14pt !important;
            margin-bottom: 12pt !important;
            border-radius: 4pt !important;
          }
          /* Astrological evidence matrix cards */
          .pdf-report-card div[style*="gridTemplateColumns"] > div,
          .pdf-report-card div[style*="grid-template-columns"] > div {
            background-color: #F8FAFC !important;
            border: 1.5pt solid #475569 !important;
            border-radius: 4pt !important;
            padding: 8pt 10pt !important;
          }
          .pdf-report-card div[style*="gridTemplateColumns"] > div div,
          .pdf-report-card div[style*="grid-template-columns"] > div div {
            color: #000000 !important;
            font-weight: 650 !important;
          }
          /* Badges */
          .pdf-report-card span[class*="badge"],
          .pdf-report-card div[class*="badge"] {
            background-color: #FEF3C7 !important;
            color: #78350F !important;
            border: 1.5pt solid #D97706 !important;
            font-weight: 800 !important;
            font-size: 8.5pt !important;
          }
          /* Tables if present */
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            border: 1.5pt solid #334155 !important;
          }
          th {
            background-color: #FEF3C7 !important;
            color: #78350F !important;
            font-weight: 850 !important;
            border: 1.5pt solid #334155 !important;
            padding: 6pt 8pt !important;
          }
          td {
            color: #000000 !important;
            font-weight: 550 !important;
            border: 1.5pt solid #334155 !important;
            padding: 6pt 8pt !important;
          }
        }
      `}</style>

      {/* Top Action Bar */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          icon={<ArrowLeft size={14} />}
        >
          Back to Reports Hub
        </Button>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadReportAsPDF(report)}
            icon={<Download size={14} />}
          >
            Download Clean A4 PDF
          </Button>

          

          <Button
            variant="primary"
            size="sm"
            onClick={handleAskSpecialist}
            icon={<Sparkles size={14} />}
          >
            Discuss with Specialist
          </Button>
        </div>
      </div>

      {/* Report Header Cover */}
      <div
        className="pdf-report-card"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 47, 85, 0.35) 0%, rgba(14, 10, 24, 0.98) 100%)',
          border: '1.5px solid rgba(245, 208, 97, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <Badge variant="gold" size="sm">
                ✦ Certified AstroNex Vedic Analysis
              </Badge>
              <Badge variant="surface" size="sm">
                10 Master Chapters • ~5,000 Words Dossier
              </Badge>
              <Badge variant="wine" size="sm">
                Chitra Paksha (Lahiri)
              </Badge>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display), serif', fontSize: '28px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
              {report.title}
            </h1>
            <p style={{ fontSize: '13.5px', color: '#CBD5E1', marginTop: '6px' }}>
              Prepared for <strong style={{ color: 'var(--gold-primary)' }}>{report.profileName}</strong> • Generated on{' '}
              {new Date(report.generatedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </p>
          </div>
        </div>

        {/* Ethical / Symbolic Disclaimer Banner */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '12px',
            color: '#E2E8F0',
            lineHeight: 1.5,
          }}
        >
          <AlertCircle size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
          <span>
            This certified dossier synthesizes classical Parashari & Jaimini principles with modern astronomical ephemerides. It provides empowering timing awareness and does not replace licensed medical, financial, or legal counsel.
          </span>
        </div>
      </div>

      {/* Quick Jump Table of Contents (no-print) */}
      <div className="no-print" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
          📑 Quick Chapter Jump (10 Master Chapters):
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {report.chapters.map((ch, idx) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#E2E8F0',
                fontSize: '11.5px',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Ch {idx + 1}: {ch.title.split(':')[1]?.trim() || ch.title}
            </a>
          ))}
        </div>
      </div>

      {/* Strengths & Growth Areas Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <Card className="pdf-report-card" style={{ padding: '22px', borderLeft: '4px solid var(--gold-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Award size={18} color="var(--gold-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
              Identified Chart Strengths & Auspicious Yogas
            </h3>
          </div>
          <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.5 }}>
            {report.keyStrengths.map((str, idx) => (
              <li key={idx}>{str}</li>
            ))}
          </ul>
        </Card>

        <Card className="pdf-report-card" style={{ padding: '22px', borderLeft: '4px solid var(--accent-rose-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Flame size={18} color="var(--accent-rose-light)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
              Conscious Growth Areas & Stewardship
            </h3>
          </div>
          <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#E2E8F0', lineHeight: 1.5 }}>
            {report.keyGrowthAreas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Structured Chapters (10 In-Depth Chapters) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {report.chapters.map((chapter, idx) => (
          <Card
            key={chapter.id}
            id={chapter.id}
            className="pdf-report-card pdf-page-break"
            style={{
              padding: '28px',
              background: 'linear-gradient(180deg, rgba(20, 18, 33, 0.95) 0%, rgba(12, 11, 20, 0.98) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.22)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Badge variant="gold" size="sm">
                Chapter {idx + 1}
              </Badge>
              {chapter.subtitle && (
                <span style={{ fontSize: '12.5px', color: 'var(--gold-primary)', fontWeight: 600 }}>
                  {chapter.subtitle}
                </span>
              )}
            </div>

            <h2 style={{ fontFamily: 'var(--font-display), serif', fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
              {chapter.title}
            </h2>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderLeft: '3px solid var(--theme-orange-primary)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '18px',
                fontSize: '13.5px',
                color: '#F8FAFC',
                fontStyle: 'italic',
                lineHeight: 1.55,
              }}
            >
              &ldquo;{cleanAstrologyContent(chapter.summary)}&rdquo;
            </div>

            {/* Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              {(chapter.contentParagraphs || (chapter.content ? [chapter.content] : [])).map((para, pIdx) => {
                const node = cleanAstrologyContent(para);
                if (!node) return null;
                return (
                  <p key={pIdx} style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.8', margin: 0 }}>
                    {node}
                  </p>
                );
              })}
            </div>

            {/* Calculated Evidence Matrix */}
            {((chapter.evidencePoints && chapter.evidencePoints.length > 0) || (chapter.evidence && chapter.evidence.length > 0)) && (
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--gold-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                  ✦ Astrological Evidence & Astronomical Points
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {(chapter.evidencePoints || chapter.evidence || []).map((ev: any, evIdx: number) => (
                    <div
                      key={evIdx}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12.5px',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{ev.finding || ev.factor}</div>
                      {ev.placement && <div style={{ color: 'var(--gold-primary)', fontSize: '11.5px', marginTop: '2px' }}>{ev.placement}</div>}
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
                        Source: {ev.source || 'calculated_chart'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Traditional Insights */}
            {chapter.traditionalInsights && chapter.traditionalInsights.length > 0 && (
              <div style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: '#FACC15', marginBottom: '8px' }}>
                  📜 Classical Shastric Axioms
                </h4>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#E2E8F0', margin: 0 }}>
                  {chapter.traditionalInsights.map((ti, tiIdx) => (
                    <li key={tiIdx}>{cleanAstrologyContent(ti)}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Guidance */}
            {chapter.practicalRemedies && chapter.practicalRemedies.length > 0 && (
              <div style={{ backgroundColor: 'rgba(216, 197, 138, 0.08)', border: '1px solid rgba(216, 197, 138, 0.25)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '8px' }}>
                  ⚡ Chapter Practical Guidance
                </h4>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#F1F5F9', margin: 0 }}>
                  {chapter.practicalRemedies.map((pr, prIdx) => (
                    <li key={prIdx}>{cleanAstrologyContent(pr)}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Traditional Remedies & Disciplines */}
      {report.traditionalRemedies && report.traditionalRemedies.length > 0 && (
        <Card className="pdf-report-card pdf-page-break" style={{ padding: '26px', border: '1.5px solid rgba(216, 197, 138, 0.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={20} color="var(--gold-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display), serif', fontSize: '18px', fontWeight: 800, color: 'var(--gold-primary)' }}>
              Master Traditional Harmonizing Remedies & Disciplines
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            {report.traditionalRemedies.map((rem, rIdx) => (
              <div
                key={rIdx}
                style={{
                  padding: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '13px',
                  color: '#E2E8F0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  lineHeight: 1.5,
                }}
              >
                <CheckCircle2 size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{cleanAstrologyContent(rem)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bottom CTA to Specialist Astrologer */}
      <Card
        className="no-print"
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
