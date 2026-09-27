'use client';

import React, { useState } from 'react';
import { NatalChart, PlanetPosition } from '@/types';

interface ZodiacWheelProps {
  chart: NatalChart;
  onSelectPlacement?: (pos: PlanetPosition) => void;
  selectedPlacement?: PlanetPosition | null;
  size?: number;
}

const ZODIAC_GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const ZODIAC_COLORS = [
  '#FF5E3A', // Aries (Fire)
  '#4CD964', // Taurus (Earth)
  '#FFCC00', // Gemini (Air)
  '#5AC8FA', // Cancer (Water)
  '#FF9500', // Leo (Fire)
  '#8E8E93', // Virgo (Earth)
  '#D8C58A', // Libra (Air)
  '#C24E78', // Scorpio (Water)
  '#AF52DE', // Sagittarius (Fire)
  '#A2845E', // Capricorn (Earth)
  '#5856D6', // Aquarius (Air)
  '#007AFF', // Pisces (Water)
];

export const ZodiacWheel: React.FC<ZodiacWheelProps> = ({
  chart,
  onSelectPlacement,
  selectedPlacement,
  size = 360,
}) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  const center = size / 2;
  const radius = size * 0.44;
  const innerRadius = size * 0.32;
  const centerRadius = size * 0.16;

  // Rotation offset based on Ascendant
  const ascDegree = chart.ascendant.absoluteDegree;
  // Put Ascendant at 9 o'clock (180 degrees in SVG coordinates)
  const rotationOffset = 180 - ascDegree;

  // Convert degree to SVG coordinates
  const getCoords = (deg: number, r: number) => {
    const adjusted = deg + rotationOffset;
    const rad = (adjusted * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id="wheelBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1B1B1E" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#171719" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#202023" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Outer Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius + 12}
          fill="url(#wheelBg)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
        />

        {/* 12 Zodiac Sign Segments */}
        {ZODIAC_GLYPHS.map((glyph, i) => {
          const startAngle = i * 30;
          const midAngle = startAngle + 15;
          const glyphCoords = getCoords(midAngle, radius + 2);
          const dividerCoords1 = getCoords(startAngle, innerRadius);
          const dividerCoords2 = getCoords(startAngle, radius + 12);

          return (
            <g key={i}>
              {/* Divider lines between signs */}
              <line
                x1={dividerCoords1.x}
                y1={dividerCoords1.y}
                x2={dividerCoords2.x}
                y2={dividerCoords2.y}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
              {/* Zodiac glyph */}
              <text
                x={glyphCoords.x}
                y={glyphCoords.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={ZODIAC_COLORS[i]}
                fontSize={size * 0.038}
                fontWeight="bold"
                style={{ opacity: 0.85 }}
              >
                {glyph}
              </text>
            </g>
          );
        })}

        {/* Inner Ring Circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="rgba(216, 197, 138, 0.25)"
          strokeWidth="1"
        />

        {/* 12 House Dividing Lines */}
        {chart.houses.map((h, i) => {
          const cuspDeg = (i * 30);
          const p1 = getCoords(cuspDeg, centerRadius);
          const p2 = getCoords(cuspDeg, innerRadius);
          const labelCoords = getCoords(cuspDeg + 15, innerRadius - 14);

          return (
            <g key={`house-${h.house}`}>
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={i === 0 || i === 9 ? 'var(--accent-rose)' : 'rgba(255, 255, 255, 0.1)'}
                strokeWidth={i === 0 || i === 9 ? 1.8 : 0.8}
                strokeDasharray={i === 0 || i === 9 ? undefined : '2 3'}
              />
              <text
                x={labelCoords.x}
                y={labelCoords.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--text-muted)"
                fontSize={size * 0.026}
              >
                {h.house}
              </text>
            </g>
          );
        })}

        {/* Aspect Lines in the Center */}
        {chart.aspects.slice(0, 10).map((asp, idx) => {
          const p1 = chart.planets.find((p) => p.name === asp.planet1);
          const p2 = chart.planets.find((p) => p.name === asp.planet2);
          if (!p1 || !p2) return null;

          const c1 = getCoords(p1.absoluteDegree, centerRadius);
          const c2 = getCoords(p2.absoluteDegree, centerRadius);

          const strokeColor = asp.isHarmonious ? 'rgba(216, 197, 138, 0.4)' : 'rgba(194, 78, 120, 0.45)';

          return (
            <line
              key={`asp-${idx}`}
              x1={c1.x}
              y1={c1.y}
              x2={c2.x}
              y2={c2.y}
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray={asp.isHarmonious ? undefined : '3 3'}
            />
          );
        })}

        {/* Center Hub */}
        <circle
          cx={center}
          cy={center}
          r={centerRadius}
          fill="#171719"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />

        {/* Center System Text */}
        <text
          x={center}
          y={center - 7}
          textAnchor="middle"
          fill="var(--gold-primary)"
          fontSize={size * 0.03}
          fontWeight="600"
          letterSpacing="0.04em"
        >
          {chart.system.toUpperCase()}
        </text>
        <text
          x={center}
          y={center + 10}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize={size * 0.024}
        >
          {chart.zodiac.toUpperCase()}
        </text>

        {/* Planetary Glyphs on the Chart */}
        {chart.planets.slice(0, 10).map((planet) => {
          const coords = getCoords(planet.absoluteDegree, (innerRadius + centerRadius) / 2);
          const isSelected = selectedPlacement?.name === planet.name;
          const isHovered = hoveredPlanet === planet.name;

          return (
            <g
              key={planet.name}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectPlacement && onSelectPlacement(planet)}
              onMouseEnter={() => setHoveredPlanet(planet.name)}
              onMouseLeave={() => setHoveredPlanet(null)}
            >
              {/* Highlight halo when selected/hovered */}
              {(isSelected || isHovered) && (
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={size * 0.04}
                  fill="rgba(194, 78, 120, 0.3)"
                  stroke="var(--accent-rose)"
                  strokeWidth="1.2"
                />
              )}
              <text
                x={coords.x}
                y={coords.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isSelected ? '#FFFFFF' : 'var(--text-primary)'}
                fontSize={size * 0.036}
                fontWeight={isSelected ? 'bold' : 'normal'}
              >
                {planet.symbol}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
