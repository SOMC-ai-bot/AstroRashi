'use client';

import React from 'react';
import { NatalChart, PlanetPosition, ZodiacSignName } from '@/types';
import { ZODIAC_SIGNS } from '@/lib/astrology-engine/planetary';

interface NorthIndianChartProps {
  chart: NatalChart;
  onSelectPlacement?: (planet: PlanetPosition) => void;
  onSelectHouse?: (houseNumber: number) => void;
  size?: number;
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({
  chart,
  onSelectPlacement,
  onSelectHouse,
  size = 380,
}) => {
  const ascSign = chart.ascendant.sign;
  const ascIndex = ZODIAC_SIGNS.indexOf(ascSign); // 0 to 11

  // Map each house (1 to 12) to its sign and occupant planets
  const houseData: {
    houseNumber: number;
    signNumber: number;
    signName: ZodiacSignName;
    planets: PlanetPosition[];
  }[] = [];

  for (let h = 1; h <= 12; h++) {
    const signIdx = (ascIndex + (h - 1)) % 12;
    const signName = ZODIAC_SIGNS[signIdx];
    const occupants = chart.planets.filter((p) => p.house === h);
    houseData.push({
      houseNumber: h,
      signNumber: signIdx + 1,
      signName,
      planets: occupants,
    });
  }

  // Geometric center coordinates for labels of each of the 12 houses in SVG viewBox 0 0 400 400
  // Standard North Indian geometry: Outer square (0,0 to 400,400), inner diamond connecting midpoints, two diagonals.
  const houseCoordinates: Record<
    number,
    { labelX: number; labelY: number; planetX: number; planetY: number }
  > = {
    1: { labelX: 200, labelY: 55, planetX: 200, planetY: 115 }, // Top diamond
    2: { labelX: 105, labelY: 35, planetX: 105, planetY: 72 }, // Top-left upper triangle
    3: { labelX: 35, labelY: 105, planetX: 70, planetY: 140 }, // Top-left lower triangle
    4: { labelX: 55, labelY: 200, planetX: 120, planetY: 200 }, // Left diamond
    5: { labelX: 35, labelY: 295, planetX: 70, planetY: 260 }, // Bottom-left upper triangle
    6: { labelX: 105, labelY: 365, planetX: 105, planetY: 328 }, // Bottom-left lower triangle
    7: { labelX: 200, labelY: 345, planetX: 200, planetY: 285 }, // Bottom diamond
    8: { labelX: 295, labelY: 365, planetX: 295, planetY: 328 }, // Bottom-right lower triangle
    9: { labelX: 365, labelY: 295, planetX: 330, planetY: 260 }, // Bottom-right upper triangle
    10: { labelX: 345, labelY: 200, planetX: 280, planetY: 200 }, // Right diamond
    11: { labelX: 365, labelY: 105, planetX: 330, planetY: 140 }, // Top-right lower triangle
    12: { labelX: 295, labelY: 35, planetX: 295, planetY: 72 }, // Top-right upper triangle
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        style={{
          backgroundColor: 'rgba(23, 23, 26, 0.85)',
          borderRadius: '16px',
          border: '1.5px solid rgba(216, 197, 138, 0.35)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 24px rgba(194, 78, 120, 0.08)',
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
          opacity="0.8"
        />

        {/* Diagonal Cross */}
        <line x1="10" y1="10" x2="390" y2="390" stroke="rgba(216, 197, 138, 0.5)" strokeWidth="1.5" />
        <line x1="390" y1="10" x2="10" y2="390" stroke="rgba(216, 197, 138, 0.5)" strokeWidth="1.5" />

        {/* Inner Diamond (Midpoint to Midpoint) */}
        <polygon
          points="200,10 390,200 200,390 10,200"
          fill="rgba(194, 78, 120, 0.04)"
          stroke="var(--gold-primary)"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* House Sign Numbers & Planet Labels */}
        {houseData.map((h) => {
          const coords = houseCoordinates[h.houseNumber];
          if (!coords) return null;

          const totalPlanetHeight = (h.planets.length - 1) * 14;
          const startY = coords.planetY - totalPlanetHeight / 2;

          return (
            <g
              key={h.houseNumber}
              onClick={() => onSelectHouse && onSelectHouse(h.houseNumber)}
              style={{ cursor: 'pointer' }}
            >
              {/* Sign Number (Small Gold) */}
              <text
                x={coords.labelX}
                y={coords.labelY}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--gold-primary)"
                fontSize="12"
                fontWeight="800"
                opacity="0.9"
              >
                {h.signNumber}
              </text>

              {/* Occupant Planets with proper spacing */}
              {h.planets.map((p, idx) => (
                <text
                  key={p.name}
                  x={coords.planetX}
                  y={startY + idx * 14}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={p.isRetrograde ? '#FB7185' : '#FFFFFF'}
                  fontSize="10.5"
                  fontWeight="700"
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
        ✦ Classical North Indian Diamond Kundli (D1 Lagna) • Tap any house or planet
      </p>
    </div>
  );
};
