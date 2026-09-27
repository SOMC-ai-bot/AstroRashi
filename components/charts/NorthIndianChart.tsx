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
    1: { labelX: 200, labelY: 130, planetX: 200, planetY: 155 }, // Top diamond
    2: { labelX: 110, labelY: 65, planetX: 110, planetY: 85 }, // Top-left upper triangle
    3: { labelX: 65, labelY: 110, planetX: 65, planetY: 130 }, // Top-left lower triangle
    4: { labelX: 130, labelY: 200, planetX: 130, planetY: 225 }, // Left diamond
    5: { labelX: 65, labelY: 290, planetX: 65, planetY: 310 }, // Bottom-left upper triangle
    6: { labelX: 110, labelY: 335, planetX: 110, planetY: 355 }, // Bottom-left lower triangle
    7: { labelX: 200, labelY: 270, planetX: 200, planetY: 295 }, // Bottom diamond
    8: { labelX: 290, labelY: 335, planetX: 290, planetY: 355 }, // Bottom-right lower triangle
    9: { labelX: 335, labelY: 290, planetX: 335, planetY: 310 }, // Bottom-right upper triangle
    10: { labelX: 270, labelY: 200, planetX: 270, planetY: 225 }, // Right diamond
    11: { labelX: 335, labelY: 110, planetX: 335, planetY: 130 }, // Top-right lower triangle
    12: { labelX: 290, labelY: 65, planetX: 290, planetY: 85 }, // Top-right upper triangle
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
                fontWeight="700"
                opacity="0.85"
              >
                {h.signNumber}
              </text>

              {/* Occupant Planets */}
              {h.planets.length > 0 && (
                <text
                  x={coords.planetX}
                  y={coords.planetY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="600"
                >
                  {h.planets.map((p, idx) => (
                    <tspan
                      key={p.name}
                      x={coords.planetX}
                      dy={idx === 0 ? 0 : 13}
                      fill={p.isRetrograde ? 'var(--accent-rose-light)' : '#FFFFFF'}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectPlacement) onSelectPlacement(p);
                      }}
                    >
                      {p.name.slice(0, 2)}
                      {p.isRetrograde ? '®' : ''} {p.degree}°
                    </tspan>
                  ))}
                </text>
              )}
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
