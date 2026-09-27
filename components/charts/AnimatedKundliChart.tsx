'use client';

import React, { useState, useEffect } from 'react';
import { useAstrology } from '@/lib/state/astrology-context';
import { Sparkles, Eye, RotateCw, Compass, Info } from 'lucide-react';
import { calculateNavamsaChart } from '@/lib/astrology-engine/navamsa';
import { ZODIAC_SIGNS } from '@/lib/astrology-engine/planetary';

// 12 House Centers for North Indian Diamond Chart (Coordinates in 500x500 SVG space)
const HOUSE_CENTERS: Record<number, { x: number; y: number; name: string; english: string }> = {
  1: { x: 250, y: 155, name: 'तनु (Lagna)', english: '1st House • Self & Vitality' },
  2: { x: 135, y: 80, name: 'धन (Dhana)', english: '2nd House • Wealth & Speech' },
  3: { x: 75, y: 140, name: 'सहज (Sahaja)', english: '3rd House • Siblings & Courage' },
  4: { x: 155, y: 250, name: 'सुख (Sukha)', english: '4th House • Mother, Home & Peace' },
  5: { x: 75, y: 360, name: 'पुत्र (Putra)', english: '5th House • Intellect & Children' },
  6: { x: 135, y: 420, name: 'अरि (Ari)', english: '6th House • Enemies & Health' },
  7: { x: 250, y: 345, name: 'युवति (Yuvati)', english: '7th House • Marriage & Partnership' },
  8: { x: 365, y: 420, name: 'रन्ध्र (Randhra)', english: '8th House • Longevity & Mysteries' },
  9: { x: 425, y: 360, name: 'धर्म (Dharma)', english: '9th House • Fortune & Higher Truth' },
  10: { x: 345, y: 250, name: 'कर्म (Karma)', english: '10th House • Career & Legacy' },
  11: { x: 425, y: 140, name: 'लाभ (Labha)', english: '11th House • Gains & Aspirations' },
  12: { x: 365, y: 80, name: 'व्यय (Vyaya)', english: '12th House • Moksha & Foreign Travel' },
};

const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const ZODIAC_NAMES = [
  'Mesha (Aries)',
  'Vrishabha (Taurus)',
  'Mithuna (Gemini)',
  'Karka (Cancer)',
  'Simha (Leo)',
  'Kanya (Virgo)',
  'Tula (Libra)',
  'Vrishchika (Scorpio)',
  'Dhanu (Sagittarius)',
  'Makara (Capricorn)',
  'Kumbha (Aquarius)',
  'Meena (Pisces)',
];

const PLANET_SYMBOLS: Record<string, string> = {
  Sun: '☉ Su',
  Moon: '☽ Mo',
  Mars: '♂ Ma',
  Mercury: '☿ Me',
  Jupiter: '♃ Ju',
  Venus: '♀ Ve',
  Saturn: '♄ Sa',
  Rahu: '☊ Ra',
  Ketu: '☋ Ke',
};

interface AnimatedKundliChartProps {
  onAskAI?: (prompt: string) => void;
}

export const AnimatedKundliChart: React.FC<AnimatedKundliChartProps> = ({ onAskAI }) => {
  const { natalChart, activeProfile } = useAstrology();
  const [chartMode, setChartMode] = useState<'d1' | 'd9'>('d1');
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);
  const [isDrawingAnimated, setIsDrawingAnimated] = useState(false);

  useEffect(() => {
    setIsDrawingAnimated(true);
    const t = setTimeout(() => setIsDrawingAnimated(false), 2000);
    return () => clearTimeout(t);
  }, [chartMode]);

  // Compute D9 if mode is d9
  const navamsa = React.useMemo(() => {
    return calculateNavamsaChart(natalChart.planets, natalChart.ascendant);
  }, [natalChart]);

  // Map planets to houses (1-12)
  const housePlanets = React.useMemo(() => {
    const map: Record<number, string[]> = {
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
      7: [], 8: [], 9: [], 10: [], 11: [], 12: [],
    };

    if (chartMode === 'd1') {
      natalChart.planets.forEach((p) => {
        const h = p.house || 1;
        if (map[h]) {
          map[h].push(PLANET_SYMBOLS[p.name] || p.name.slice(0, 2));
        }
      });
    } else {
      navamsa.placements.forEach((np) => {
        const signIdx = ZODIAC_SIGNS.indexOf(np.d9Sign);
        const h = signIdx >= 0 ? ((signIdx % 12) + 1) : 1;
        if (map[h]) {
          map[h].push(PLANET_SYMBOLS[np.planet] || np.planet.slice(0, 2));
        }
      });
    }

    return map;
  }, [natalChart, navamsa, chartMode]);

  const ascSignIndex =
    ZODIAC_SIGNS.indexOf(natalChart.ascendant.sign) >= 0
      ? ZODIAC_SIGNS.indexOf(natalChart.ascendant.sign)
      : 0;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        padding: '28px',
        background: 'radial-gradient(circle at 50% 20%, rgba(124, 58, 237, 0.18) 0%, rgba(13, 8, 25, 0.98) 75%)',
        border: '1px solid rgba(168, 85, 247, 0.28)',
        boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(124, 58, 237, 0.2)',
        overflow: 'hidden',
      }}
      className="kundli-chart-card"
    >
      {/* Background Starry Nebula & Geometric Astrological Rings */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(1px 1px at 20px 30px, #FFFFFF, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 140px 70px, rgba(245, 158, 11, 0.8), rgba(0,0,0,0)), radial-gradient(1px 1px at 280px 180px, #FFFFFF, rgba(0,0,0,0))',
          backgroundSize: '320px 320px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* Top Controls & Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#F59E0B',
                background: 'rgba(245, 158, 11, 0.14)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              ✦ Vedic Kundli Drawing • {activeProfile.name}
            </span>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>
              Live Ephemeris
            </span>
          </div>

          <h3
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: '#FFFFFF',
              fontFamily: 'var(--font-sacred), serif',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>{chartMode === 'd1' ? 'Lagna Kundli (D1 Birth Chart)' : 'Navamsa Kundli (D9 Chart)'}</span>
          </h3>
        </div>

        {/* Toggle Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setChartMode('d1')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: chartMode === 'd1' ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
              background: chartMode === 'd1' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.04)',
              color: chartMode === 'd1' ? '#000000' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: chartMode === 'd1' ? '0 0 16px rgba(245, 158, 11, 0.4)' : 'none',
            }}
          >
            D1 Lagna
          </button>

          <button
            onClick={() => setChartMode('d9')}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: chartMode === 'd9' ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
              background: chartMode === 'd9' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255, 255, 255, 0.04)',
              color: chartMode === 'd9' ? '#000000' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: chartMode === 'd9' ? '0 0 16px rgba(245, 158, 11, 0.4)' : 'none',
            }}
          >
            D9 Navamsa
          </button>
        </div>
      </div>

      {/* Main Animated SVG Chart Drawing */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          margin: '0 auto',
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Rotating Outer Celestial Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-18px',
            borderRadius: '50%',
            border: '1px dashed rgba(245, 158, 11, 0.22)',
            animation: 'rotateCelestial 80s linear infinite',
            pointerEvents: 'none',
          }}
        />

        {/* SVG Drawing Canvas */}
        <svg
          viewBox="0 0 500 500"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
            filter: 'drop-shadow(0 0 18px rgba(245, 158, 11, 0.2))',
          }}
        >
          <defs>
            <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Outer Square Frame */}
          <rect
            x="20"
            y="20"
            width="460"
            height="460"
            fill="rgba(15, 14, 25, 0.85)"
            stroke="url(#goldStroke)"
            strokeWidth="2.5"
            rx="12"
            className={isDrawingAnimated ? 'animate-stroke-draw' : ''}
          />

          {/* 2. Primary Diagonals (Corner to Corner) */}
          <line
            x1="20"
            y1="20"
            x2="480"
            y2="480"
            stroke="url(#goldStroke)"
            strokeWidth="1.8"
            opacity="0.9"
            className={isDrawingAnimated ? 'animate-stroke-draw' : ''}
          />
          <line
            x1="480"
            y1="20"
            x2="20"
            y2="480"
            stroke="url(#goldStroke)"
            strokeWidth="1.8"
            opacity="0.9"
            className={isDrawingAnimated ? 'animate-stroke-draw' : ''}
          />

          {/* 3. Central Diamond (Connecting Midpoints) */}
          <polygon
            points="250,20 480,250 250,480 20,250"
            fill="none"
            stroke="url(#goldStroke)"
            strokeWidth="2.2"
            filter="url(#glowGold)"
            className={isDrawingAnimated ? 'animate-stroke-draw' : ''}
          />

          {/* 4. Glowing Corner Nodes */}
          {[
            { cx: 20, cy: 20 },
            { cx: 480, cy: 20 },
            { cx: 20, cy: 480 },
            { cx: 480, cy: 480 },
            { cx: 250, cy: 20 },
            { cx: 480, cy: 250 },
            { cx: 250, cy: 480 },
            { cx: 20, cy: 250 },
            { cx: 250, cy: 250 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r="4.5"
              fill="#FDE047"
              stroke="#D97706"
              strokeWidth="1.5"
              filter="url(#glowGold)"
            />
          ))}

          {/* 5. House Clickable Hit-Zones and Content */}
          {Object.entries(HOUSE_CENTERS).map(([hStr, coord]) => {
            const h = parseInt(hStr, 10);
            const planetsInHouse = housePlanets[h] || [];
            // Zodiac Sign Index for this house
            const signIdx = (ascSignIndex + (h - 1)) % 12;
            const rashiNum = signIdx + 1;
            const isHovered = hoveredHouse === h;

            return (
              <g
                key={h}
                onMouseEnter={() => setHoveredHouse(h)}
                onMouseLeave={() => setHoveredHouse(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* House Number & Rashi Indicator */}
                <text
                  x={coord.x}
                  y={coord.y - 12}
                  textAnchor="middle"
                  fill={isHovered ? '#FDE047' : '#F59E0B'}
                  fontSize="12px"
                  fontWeight="800"
                  fontFamily="var(--font-sans)"
                  opacity={isHovered ? 1 : 0.85}
                >
                  H{h} • {ZODIAC_SYMBOLS[signIdx]} {rashiNum}
                </text>

                {/* Sanskrit House Title */}
                <text
                  x={coord.x}
                  y={coord.y + 3}
                  textAnchor="middle"
                  fill={isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                  fontSize="9.5px"
                  fontWeight="600"
                  fontFamily="var(--font-sacred), serif"
                >
                  {coord.name.split(' ')[0]}
                </text>

                {/* Planets residing in this House */}
                {planetsInHouse.length > 0 && (
                  <text
                    x={coord.x}
                    y={coord.y + 20}
                    textAnchor="middle"
                    fill="#38BDF8"
                    fontSize="11.5px"
                    fontWeight="800"
                    fontFamily="var(--font-sans)"
                    filter="drop-shadow(0 0 6px rgba(56, 189, 248, 0.5))"
                  >
                    {planetsInHouse.join(' ')}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip & House Explanatory Capsule */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px 20px',
          borderRadius: '16px',
          background: 'rgba(20, 18, 33, 0.9)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B',
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <Compass size={18} />
          </div>

          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>
              {hoveredHouse
                ? `${HOUSE_CENTERS[hoveredHouse].name}: ${HOUSE_CENTERS[hoveredHouse].english}`
                : `Ascendant (Lagna): ${natalChart.ascendant.sign} (${natalChart.ascendant.degree}°)`}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              {hoveredHouse
                ? `Active Sign: ${ZODIAC_NAMES[(ascSignIndex + (hoveredHouse - 1)) % 12]} • Planets: ${
                    housePlanets[hoveredHouse]?.join(', ') || 'No occupying grahas (ruled by lord)'
                  }`
                : 'Hover over any house to inspect planetary occupancies, traditional significations, and harmonic rashi.'}
            </div>
          </div>
        </div>

        {onAskAI && (
          <button
            onClick={() =>
              onAskAI(
                hoveredHouse
                  ? `Explain House ${hoveredHouse} (${HOUSE_CENTERS[hoveredHouse].english}) in my birth chart.`
                  : 'Synthesize my overall Vedic birth chart blueprint and dominant yogas.'
              )
            }
            style={{
              padding: '7px 14px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: 'none',
              color: '#000000',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
            }}
          >
            <Sparkles size={13} />
            <span>Consult on House</span>
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes rotateCelestial {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-stroke-draw {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawChart 1.8s ease forwards;
        }
        @keyframes drawChart {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
