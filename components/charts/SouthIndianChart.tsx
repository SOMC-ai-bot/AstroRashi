'use client';

import React from 'react';
import { NatalChart, PlanetPosition, ZodiacSignName } from '@/types';

interface SouthIndianChartProps {
  chart: NatalChart;
  onSelectPlacement?: (planet: PlanetPosition) => void;
  size?: number;
}

// Fixed 4x4 grid layout with clockwise progression:
// [Pisces,      Aries,       Taurus,      Gemini]
// [Aquarius,    (empty),     (empty),     Cancer]
// [Capricorn,   (empty),     (empty),     Leo   ]
// [Sagittarius, Scorpio,     Libra,       Virgo ]
const SOUTH_GRID: (ZodiacSignName | null)[][] = [
  ['Pisces', 'Aries', 'Taurus', 'Gemini'],
  ['Aquarius', null, null, 'Cancer'],
  ['Capricorn', null, null, 'Leo'],
  ['Sagittarius', 'Scorpio', 'Libra', 'Virgo'],
];

export const SouthIndianChart: React.FC<SouthIndianChartProps> = ({
  chart,
  onSelectPlacement,
  size = 380,
}) => {
  const ascSign = chart.ascendant.sign;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          backgroundColor: 'rgba(23, 23, 26, 0.85)',
          borderRadius: '16px',
          border: '1.5px solid rgba(216, 197, 138, 0.4)',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        {SOUTH_GRID.map((row, rIdx) =>
          row.map((sign, cIdx) => {
            if (!sign) {
              // Center 2x2 empty space
              if (rIdx === 1 && cIdx === 1) {
                return (
                  <div
                    key="center-hub"
                    style={{
                      gridColumn: 'span 2',
                      gridRow: 'span 2',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(194, 78, 120, 0.05)',
                      border: '1px solid rgba(216, 197, 138, 0.2)',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold-primary)', letterSpacing: '0.05em' }}>
                      ASTRONEX
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      South Indian Kundli
                    </span>
                  </div>
                );
              }
              return null;
            }

            const isAsc = sign === ascSign;
            const planetsInSign = chart.planets.filter((p) => p.sign === sign);

            return (
              <div
                key={sign}
                style={{
                  border: '1px solid rgba(216, 197, 138, 0.25)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  backgroundColor: isAsc ? 'rgba(194, 78, 120, 0.12)' : 'transparent',
                }}
              >
                {/* Sign Label */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {sign.slice(0, 3).toUpperCase()}
                  </span>
                  {isAsc && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        color: 'var(--accent-rose-light)',
                        border: '1px solid var(--accent-rose)',
                        borderRadius: '3px',
                        padding: '1px 3px',
                      }}
                    >
                      ASC
                    </span>
                  )}
                </div>

                {/* Occupant Planets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {planetsInSign.map((p) => (
                    <span
                      key={p.name}
                      onClick={() => onSelectPlacement && onSelectPlacement(p)}
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 600,
                        color: p.isRetrograde ? 'var(--accent-rose-light)' : '#FFFFFF',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.name.slice(0, 2)}
                      {p.isRetrograde ? '®' : ''} {p.degree}°
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
        ✦ Classical South Indian Rectangular Kundli • Fixed signs clockwise from Pisces
      </p>
    </div>
  );
};
