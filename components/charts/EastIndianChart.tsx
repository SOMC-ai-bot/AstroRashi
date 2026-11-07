'use client';

import React from 'react';
import { NatalChart, PlanetPosition, ZodiacSignName } from '@/types';
import { ZODIAC_SIGNS } from '@/lib/astrology-engine/planetary';

interface EastIndianChartProps {
  chart: NatalChart;
  onSelectPlacement?: (planet: PlanetPosition) => void;
  size?: number;
}

/**
 * Traditional Eastern / Bengali / Oriya Kundli Chart.
 * Fixed sign layout in 4x4 coordinate space where outer quadrants and triangles 
 * map to the 12 rashis in clockwise or classical Eastern order:
 * Aries is Top-Center, Taurus is Top-Right, Gemini is Right-Top, Cancer is Right-Bottom,
 * Leo is Bottom-Right, Virgo is Bottom-Center, Libra is Bottom-Left, Scorpio is Left-Bottom,
 * Sagittarius is Left-Top, Capricorn is Top-Left Inner, Aquarius/Pisces surrounding.
 */
export const EastIndianChart: React.FC<EastIndianChartProps> = ({
  chart,
  onSelectPlacement,
  size = 380,
}) => {
  const ascSign = chart.ascendant.sign;

  // 12 Sign definitions with bounding box regions for East Indian classical geometry
  // Classical East Indian Chart is a square with an internal square and crossed diagonal lines
  const EAST_SIGNS: { sign: ZodiacSignName; label: string; x: number; y: number }[] = [
    { sign: 'Aries', label: '1. Mesha', x: 200, y: 55 },
    { sign: 'Taurus', label: '2. Vrishabha', x: 335, y: 70 },
    { sign: 'Gemini', label: '3. Mithuna', x: 345, y: 155 },
    { sign: 'Cancer', label: '4. Karka', x: 345, y: 245 },
    { sign: 'Leo', label: '5. Simha', x: 335, y: 330 },
    { sign: 'Virgo', label: '6. Kanya', x: 200, y: 345 },
    { sign: 'Libra', label: '7. Tula', x: 65, y: 330 },
    { sign: 'Scorpio', label: '8. Vrishchika', x: 55, y: 245 },
    { sign: 'Sagittarius', label: '9. Dhanu', x: 55, y: 155 },
    { sign: 'Capricorn', label: '10. Makara', x: 65, y: 70 },
    { sign: 'Aquarius', label: '11. Kumbha', x: 135, y: 135 },
    { sign: 'Pisces', label: '12. Meena', x: 265, y: 135 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        style={{
          backgroundColor: 'rgba(23, 23, 26, 0.85)',
          borderRadius: '16px',
          border: '1.5px solid rgba(216, 197, 138, 0.4)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 24px rgba(249, 115, 22, 0.08)',
        }}
      >
        {/* Outer Square */}
        <rect
          x="10"
          y="10"
          width="380"
          height="380"
          fill="none"
          stroke="var(--gold-primary)"
          strokeWidth="2"
          opacity="0.85"
        />

        {/* 3x3 Division Lines for Eastern Style */}
        <line x1="10" y1="10" x2="390" y2="390" stroke="rgba(216, 197, 138, 0.45)" strokeWidth="1.5" />
        <line x1="390" y1="10" x2="10" y2="390" stroke="rgba(216, 197, 138, 0.45)" strokeWidth="1.5" />
        
        {/* Inner Diamond */}
        <polygon
          points="200,10 390,200 200,390 10,200"
          fill="none"
          stroke="rgba(216, 197, 138, 0.6)"
          strokeWidth="1.5"
        />

        {/* Center Box */}
        <rect
          x="140"
          y="140"
          width="120"
          height="120"
          fill="rgba(194, 78, 120, 0.08)"
          stroke="var(--gold-primary)"
          strokeWidth="1.5"
        />

        {/* Center Title */}
        <text
          x="200"
          y="195"
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--gold-primary)"
          fontSize="12"
          fontWeight="800"
          letterSpacing="0.05em"
        >
          EAST INDIAN
        </text>
        <text
          x="200"
          y="212"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#94A3B8"
          fontSize="9.5"
          fontWeight="600"
        >
          KUNDLI
        </text>

        {/* Sign Cells & Placements */}
        {EAST_SIGNS.map((item) => {
          const isAsc = item.sign === ascSign;
          const occupants = chart.planets.filter((p) => p.sign === item.sign);

          return (
            <g key={item.sign}>
              {/* Sign label */}
              <text
                x={item.x}
                y={item.y - 12}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isAsc ? '#F97316' : '#94A3B8'}
                fontSize="10"
                fontWeight={isAsc ? '800' : '600'}
              >
                {item.sign.slice(0, 3).toUpperCase()} {isAsc ? '✦ Lagna' : ''}
              </text>

              {/* Occupant Planets */}
              {occupants.map((p, idx) => (
                <text
                  key={p.name}
                  x={item.x}
                  y={item.y + 3 + idx * 13}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={p.isRetrograde ? '#FB7185' : '#FFFFFF'}
                  fontSize="10"
                  fontWeight="600"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectPlacement) onSelectPlacement(p);
                  }}
                >
                  {p.name.slice(0, 2)}{p.isRetrograde ? '®' : ''} {p.degree}°
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
        ✦ Classical East Indian (Bangla / Odia) Kundli • Fixed Sign Configuration
      </p>
    </div>
  );
};
