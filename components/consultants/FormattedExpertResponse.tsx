import React from 'react';
import {
  Sparkles,
  Heart,
  Briefcase,
  Shield,
  Star,
  CheckCircle,
  Clock,
  Compass,
  TrendingUp,
} from 'lucide-react';

interface FormattedExpertResponseProps {
  content: string;
  expertName?: string;
}

export const FormattedExpertResponse: React.FC<FormattedExpertResponseProps> = ({
  content,
  expertName,
}) => {
  if (!content) return null;

  // Clean raw markdown indicators like ***, **, ###, ##, #
  const cleanRawText = (raw: string) => {
    return raw
      .replace(/###+\s*/g, '')
      .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^#+\s*/g, '')
      .trim();
  };

  const lines = content.split('\n');
  const sections: React.ReactNode[] = [];
  let currentBullets: string[] = [];
  let currentKeyValues: { key: string; value: string }[] = [];

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      sections.push(
        <div key={`bullets-${sections.length}`} style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
          {currentBullets.map((b, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#E2E8F0',
                  marginTop: '7px',
                  flexShrink: 0,
                }}
              />
              <span style={{ color: '#E2E8F0', fontSize: '13px', lineHeight: 1.55 }}>
                {b}
              </span>
            </div>
          ))}
        </div>
      );
      currentBullets = [];
    }
  };

  const flushKeyValues = () => {
    if (currentKeyValues.length > 0) {
      sections.push(
        <div
          key={`grid-${sections.length}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '8px',
            margin: '10px 0',
          }}
        >
          {currentKeyValues.map((kv, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
            >
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {kv.key}
              </div>
              <div style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600, marginTop: '2px' }}>
                {kv.value}
              </div>
            </div>
          ))}
        </div>
      );
      currentKeyValues = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) {
      flushBullets();
      flushKeyValues();
      continue;
    }

    const cleaned = cleanRawText(rawLine);

    // Bullet point detection
    if (rawLine.startsWith('- ') || rawLine.startsWith('* ') || rawLine.startsWith('• ') || /^\d+\.\s/.test(rawLine)) {
      const bulletContent = cleaned.replace(/^[-*•\d.]\s*/, '').trim();
      currentBullets.push(bulletContent);
      continue;
    }

    // Key-Value metric detection (e.g. "Lagna Lord: Mars in 10th House" or "Remedy: Chant Gayatri")
    if (rawLine.includes(':') && !rawLine.startsWith('http') && rawLine.length < 90) {
      const parts = cleaned.split(':');
      if (parts.length === 2 && parts[0].length < 35) {
        currentKeyValues.push({ key: parts[0].trim(), value: parts[1].trim() });
        continue;
      }
    }

    flushBullets();
    flushKeyValues();

    // Section title / header detection
    const isHeading =
      rawLine.startsWith('#') ||
      rawLine.toUpperCase() === rawLine && rawLine.length < 50 ||
      (rawLine.endsWith(':') && rawLine.length < 45);

    if (isHeading) {
      sections.push(
        <div
          key={`head-${sections.length}`}
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: sections.length > 0 ? '12px' : '0',
            marginBottom: '4px',
            borderLeft: '3px solid #F97316',
            paddingLeft: '8px',
          }}
        >
          {cleaned.replace(/:$/, '')}
        </div>
      );
    } else {
      // Standard narrative paragraph
      sections.push(
        <p
          key={`p-${sections.length}`}
          style={{
            margin: '6px 0',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#CBD5E1',
          }}
        >
          {cleaned}
        </p>
      );
    }
  }

  flushBullets();
  flushKeyValues();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {sections}
    </div>
  );
};

