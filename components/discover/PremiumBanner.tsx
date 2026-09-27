'use client';

import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface PremiumBannerProps {
  onUpgrade: () => void;
}

export const PremiumBanner: React.FC<PremiumBannerProps> = ({ onUpgrade }) => {
  const { t } = useI18n();

  return (
    <div
      onClick={onUpgrade}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        background:
          'linear-gradient(135deg, rgba(166, 56, 103, 0.45) 0%, rgba(139, 47, 85, 0.3) 50%, rgba(27, 27, 30, 0.85) 100%)',
        border: '1px solid rgba(217, 106, 141, 0.35)',
        boxShadow: '0 10px 30px rgba(139, 47, 85, 0.25)',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 220ms ease',
      }}
      className="card-hover"
    >
      {/* Subtle Orbital Background SVG */}
      <svg
        style={{
          position: 'absolute',
          right: '-20px',
          top: '-30px',
          width: '180px',
          height: '180px',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="#D8C58A" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#C24E78" strokeWidth="1.2" />
      </svg>

      <div style={{ zIndex: 2, maxWidth: '75%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={15} color="var(--gold-primary)" />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--gold-primary)',
            }}
          >
            {t.discover.premiumBannerTitle}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {t.discover.premiumBannerSub}
        </p>
      </div>

      <div
        style={{
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'linear-gradient(135deg, var(--gold-primary) 0%, #C9B26D 100%)',
          color: '#171719',
          fontWeight: 600,
          fontSize: '12px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 4px 14px rgba(216, 197, 138, 0.35)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        <span>{t.discover.upgradeCTA}</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
};
