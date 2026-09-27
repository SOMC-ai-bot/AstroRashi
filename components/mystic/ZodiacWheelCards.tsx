'use client';

import React, { useState } from 'react';
import { Sparkles, Compass, Shield, Flame, Droplet, Wind, Mountain, ChevronRight } from 'lucide-react';

interface ZodiacSignData {
  id: string;
  name: string;
  sanskrit: string;
  month: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  lord: string;
  symbol: string;
  coreTrait: string;
  karmicGift: string;
  iconSvg: React.ReactNode;
}

interface ZodiacWheelCardsProps {
  onSelectSign?: (sign: string) => void;
}

export const ZodiacWheelCards: React.FC<ZodiacWheelCardsProps> = ({ onSelectSign }) => {
  const [activeSign, setActiveSign] = useState<string>('aries');

  const signs: ZodiacSignData[] = [
    {
      id: 'aries',
      name: 'Aries',
      sanskrit: 'Mesha',
      month: 'Month 1 (March - April)',
      dates: 'Mar 21 - Apr 19',
      element: 'Fire',
      lord: 'Mars (Mangala)',
      symbol: '♈',
      coreTrait: 'Pioneering initiative, relentless courage, and fiery vitality.',
      karmicGift: 'Ability to break through stagnancy and spark courageous new beginnings.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21V9a7 7 0 0 0-7-7c-2.5 0-4 1.8-4 4 0 3 2 4 4 4 1.5 0 2.5-.5 3-1" />
          <path d="M12 9a7 7 0 0 1 7-7c2.5 0 4 1.8 4 4 0 3-2 4-4 4-1.5 0-2.5-.5-3-1" />
        </svg>
      ),
    },
    {
      id: 'taurus',
      name: 'Taurus',
      sanskrit: 'Vrishabha',
      month: 'Month 2 (April - May)',
      dates: 'Apr 20 - May 20',
      element: 'Earth',
      lord: 'Venus (Shukra)',
      symbol: '♉',
      coreTrait: 'Unshakable stability, sensory refinement, and compounding abundance.',
      karmicGift: 'Mastery of tangible wealth, devotional loyalty, and enduring peace.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="15" r="6" />
          <path d="M6 3c0 3.5 2.7 6 6 6s6-2.5 6-6" />
        </svg>
      ),
    },
    {
      id: 'gemini',
      name: 'Gemini',
      sanskrit: 'Mithuna',
      month: 'Month 3 (May - June)',
      dates: 'May 21 - Jun 20',
      element: 'Air',
      lord: 'Mercury (Budha)',
      symbol: '♊',
      coreTrait: 'Agile intellect, versatile communication, and curiosity.',
      karmicGift: 'Bridging ideas, synthesizing diverse knowledge, and inspiring dialogue.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4c4 2 12 2 16 0" />
          <path d="M4 20c4-2 12-2 16 0" />
          <line x1="9" y1="5.5" x2="9" y2="18.5" />
          <line x1="15" y1="5.5" x2="15" y2="18.5" />
        </svg>
      ),
    },
    {
      id: 'cancer',
      name: 'Cancer',
      sanskrit: 'Karka',
      month: 'Month 4 (June - July)',
      dates: 'Jun 21 - Jul 22',
      element: 'Water',
      lord: 'Moon (Chandra)',
      symbol: '♋',
      coreTrait: 'Empathetic depth, protective sanctuary, and intuitive wisdom.',
      karmicGift: 'Emotional healing, honoring roots, and safeguarding sacred bonds.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M6 9a6 6 0 0 1 12 0" />
          <path d="M18 15a6 6 0 0 1-12 0" />
        </svg>
      ),
    },
    {
      id: 'leo',
      name: 'Leo',
      sanskrit: 'Simha',
      month: 'Month 5 (July - August)',
      dates: 'Jul 23 - Aug 22',
      element: 'Fire',
      lord: 'Sun (Surya)',
      symbol: '♌',
      coreTrait: 'Radiant sovereignty, generous leadership, and creative majesty.',
      karmicGift: 'Inspiring collective confidence, warmth, and noble purpose.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="16" r="3" />
          <path d="M9 16c0-5 3-10 6-10s4 3 4 5c0 4-4 7-4 7" />
          <circle cx="17" cy="19" r="2" />
        </svg>
      ),
    },
    {
      id: 'virgo',
      name: 'Virgo',
      sanskrit: 'Kanya',
      month: 'Month 6 (August - September)',
      dates: 'Aug 23 - Sep 22',
      element: 'Earth',
      lord: 'Mercury (Budha)',
      symbol: '♍',
      coreTrait: 'Meticulous discernment, healing service, and pragmatic craft.',
      karmicGift: 'Purifying complexities into orderly systems and uplifting health.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12a3 3 0 0 0 6 0V4" />
          <path d="M10 4v12a3 3 0 0 0 6 0V4" />
          <path d="M16 4v10a3 3 0 0 0 3 3h2" />
          <path d="M19 13l-3 8" />
        </svg>
      ),
    },
    {
      id: 'libra',
      name: 'Libra',
      sanskrit: 'Tula',
      month: 'Month 7 (September - October)',
      dates: 'Sep 23 - Oct 22',
      element: 'Air',
      lord: 'Venus (Shukra)',
      symbol: '♎',
      coreTrait: 'Harmonious balance, aesthetic grace, and diplomatic justice.',
      karmicGift: 'Creating equitable alliances and illuminating relational beauty.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="19" x2="21" y2="19" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <path d="M7 15a5 5 0 0 1 10 0" />
        </svg>
      ),
    },
    {
      id: 'scorpio',
      name: 'Scorpio',
      sanskrit: 'Vrishchika',
      month: 'Month 8 (October - November)',
      dates: 'Oct 23 - Nov 21',
      element: 'Water',
      lord: 'Mars & Ketu',
      symbol: '♏',
      coreTrait: 'Psychological depth, alchemical regeneration, and fierce truth.',
      karmicGift: 'Transmuting life’s deepest shadows into spiritual power.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v12a3 3 0 0 0 6 0V4" />
          <path d="M10 4v12a3 3 0 0 0 6 0V4" />
          <path d="M16 4v12a3 3 0 0 0 4 2.5l2-2" />
          <path d="M20 20l2-2-2-2" />
        </svg>
      ),
    },
    {
      id: 'sagittarius',
      name: 'Sagittarius',
      sanskrit: 'Dhanu',
      month: 'Month 9 (November - December)',
      dates: 'Nov 22 - Dec 21',
      element: 'Fire',
      lord: 'Jupiter (Brihaspati)',
      symbol: '♐',
      coreTrait: 'Expansive vision, philosophical optimism, and quest for dharma.',
      karmicGift: 'Aiming the arrow of higher wisdom and illuminating boundless horizons.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="19" x2="19" y2="5" />
          <polyline points="10 5 19 5 19 14" />
          <line x1="7" y1="17" x2="11" y2="13" />
        </svg>
      ),
    },
    {
      id: 'capricorn',
      name: 'Capricorn',
      sanskrit: 'Makara',
      month: 'Month 10 (December - January)',
      dates: 'Dec 22 - Jan 19',
      element: 'Earth',
      lord: 'Saturn (Shani)',
      symbol: '♑',
      coreTrait: 'Pragmatic ambition, generational legacy, and mastery of time.',
      karmicGift: 'Building enduring monuments and ascending life’s highest summits.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v10a4 4 0 0 0 8 0V4" />
          <path d="M12 14c0 3 2 6 5 6s4-2 4-5-2-4-4-4" />
        </svg>
      ),
    },
    {
      id: 'aquarius',
      name: 'Aquarius',
      sanskrit: 'Kumbha',
      month: 'Month 11 (January - February)',
      dates: 'Jan 20 - Feb 18',
      element: 'Air',
      lord: 'Saturn & Rahu',
      symbol: '♒',
      coreTrait: 'Humanitarian innovation, egalitarian vision, and original thinking.',
      karmicGift: 'Pouring the celestial nectar of future consciousness to all humanity.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8l3-3 3 3 3-3 3 3 3-3 3 3" />
          <path d="M3 16l3-3 3 3 3-3 3 3 3-3 3 3" />
        </svg>
      ),
    },
    {
      id: 'pisces',
      name: 'Pisces',
      sanskrit: 'Meena',
      month: 'Month 12 (February - March)',
      dates: 'Feb 19 - Mar 20',
      element: 'Water',
      lord: 'Jupiter (Brihaspati)',
      symbol: '♓',
      coreTrait: 'Transcendent compassion, mystical dissolution, and cosmic oneness.',
      karmicGift: 'Navigating oceanic realms of consciousness and granting unconditional grace.',
      iconSvg: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4c4 4 4 12 0 16" />
          <path d="M19 4c-4 4-4 12 0 16" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
  ];

  const currentSelectedSign = signs.find((s) => s.id === activeSign) || signs[0];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#C084FC',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px',
          }}
        >
          <Sparkles size={13} />
          <span>Vedic Rashi Insights • All 12 Months</span>
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '28px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '0.03em',
          }}
        >
          Know Yourself Through Your Sign
        </h3>
        <p style={{ fontSize: '13px', color: '#A79BBF', maxWidth: '580px', margin: '6px auto 0', lineHeight: 1.5 }}>
          Explore the divine alignment of all 12 cosmic signs across the 12 calendar months. Discover your elemental strengths, governing planetary lords, and karmic destiny.
        </p>
      </div>

      {/* Complete 12 Signs Grid Covering All 12 Months */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        {signs.map((sign) => {
          const isSelected = activeSign === sign.id;
          return (
            <div
              key={sign.id}
              onClick={() => {
                setActiveSign(sign.id);
                onSelectSign?.(sign.name);
              }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '16px 10px',
                borderRadius: '8px',
                background: isSelected
                  ? 'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.35) 0%, rgba(22, 14, 44, 0.95) 85%)'
                  : 'linear-gradient(180deg, rgba(20, 14, 38, 0.8) 0%, rgba(12, 8, 24, 0.95) 100%)',
                border: isSelected ? '1px solid #C084FC' : '1px solid rgba(168, 85, 247, 0.22)',
                boxShadow: isSelected
                  ? '0 12px 30px rgba(124, 58, 237, 0.45), 0 0 20px rgba(192, 132, 252, 0.3)'
                  : '0 6px 18px rgba(0, 0, 0, 0.65)',
                cursor: 'pointer',
                transition: 'all 220ms ease',
                transform: isSelected ? 'translateY(-3px)' : 'none',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  filter: isSelected ? 'drop-shadow(0 0 10px #C084FC)' : 'none',
                }}
              >
                {sign.iconSvg}
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: isSelected ? '#FFFFFF' : '#E4DCF9',
                  marginBottom: '2px',
                  letterSpacing: '0.02em',
                }}
              >
                {sign.name}
              </span>

              <span
                style={{
                  fontSize: '10.5px',
                  color: '#C084FC',
                  fontWeight: 600,
                  marginBottom: '3px',
                }}
              >
                {sign.sanskrit} • {sign.symbol}
              </span>

              <span
                style={{
                  fontSize: '9.5px',
                  color: '#71648A',
                }}
              >
                {sign.dates}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Sign Highlight Card */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(28, 16, 56, 0.9) 0%, rgba(14, 9, 28, 0.95) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'center',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>{currentSelectedSign.symbol}</span>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                {currentSelectedSign.name} ({currentSelectedSign.sanskrit})
              </h4>
              <span style={{ fontSize: '11.5px', color: '#FBBF24', fontWeight: 600 }}>
                {currentSelectedSign.month} • {currentSelectedSign.dates}
              </span>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#DDD6FE', lineHeight: 1.55 }}>
            {currentSelectedSign.coreTrait}
          </p>
        </div>

        <div style={{ borderLeft: '1px solid rgba(168, 85, 247, 0.25)', paddingLeft: '18px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '10px', fontSize: '12px' }}>
            <div>
              <span style={{ color: '#71648A', display: 'block' }}>Element:</span>
              <strong style={{ color: '#E4DCF9' }}>{currentSelectedSign.element}</strong>
            </div>
            <div>
              <span style={{ color: '#71648A', display: 'block' }}>Ruling Lord:</span>
              <strong style={{ color: '#C084FC' }}>{currentSelectedSign.lord}</strong>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
              ✦ Karmic Superpower:
            </span>
            <p style={{ fontSize: '12.5px', color: '#A79BBF', lineHeight: 1.45 }}>
              {currentSelectedSign.karmicGift}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
