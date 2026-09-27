'use client';

import React from 'react';

interface SacredMandalaProps {
  size?: number;
}

export const SacredMandala: React.FC<SacredMandalaProps> = ({ size = 360 }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {/* Luminous Core Glow */}
      <div
        style={{
          position: 'absolute',
          width: `${size * 0.55}px`,
          height: `${size * 0.55}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 75%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="sacredCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#E9D5FF" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3B0764" stopOpacity="0" />
          </radialGradient>
          <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Outer Concentric Geometry Ring (Clockwise) */}
        <g className="sacred-ring-clockwise">
          <circle cx="250" cy="250" r="236" stroke="#A855F7" strokeWidth="1" strokeDasharray="3 6" opacity="0.45" />
          <circle cx="250" cy="250" r="222" stroke="#C084FC" strokeWidth="1.2" opacity="0.6" />
          <circle cx="250" cy="250" r="208" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.5" />

          {/* 12 Outer Cardinal Tick Rays */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 250 + Math.cos(angle) * 208;
            const y1 = 250 + Math.sin(angle) * 208;
            const x2 = 250 + Math.cos(angle) * 236;
            const y2 = 250 + Math.sin(angle) * 236;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C084FC" strokeWidth="1" opacity="0.6" />;
          })}

          {/* 8 Moon Phase Nodes around Outer Perimeter */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const cx = 250 + Math.cos(angle) * 222;
            const cy = 250 + Math.sin(angle) * 222;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="6" fill="#0D0819" stroke="#E9D5FF" strokeWidth="1.2" />
                <circle cx={cx - 1.5} cy={cy} r="3" fill="#C084FC" opacity="0.9" />
              </g>
            );
          })}
        </g>

        {/* 2. Counter-Rotating Intermediate Polygon Ring */}
        <g className="sacred-ring-counter">
          {/* Octagram Star 1 */}
          <polygon
            points="250,55 388,112 445,250 388,388 250,445 112,388 55,250 112,112"
            stroke="url(#purpleGradient)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          {/* Octagram Star 2 (rotated 22.5 deg) */}
          <polygon
            points="324,71 429,176 429,324 324,429 176,429 71,324 71,176 176,71"
            stroke="#A855F7"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />

          <circle cx="250" cy="250" r="160" stroke="#E9D5FF" strokeWidth="1" opacity="0.4" />
          <circle cx="250" cy="250" r="130" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        </g>

        {/* 3. Concentric Flower of Life / Sacred Triangles */}
        <g>
          {/* Equilateral Triangle Up */}
          <polygon
            points="250,120 362,315 138,315"
            stroke="#C084FC"
            strokeWidth="1.4"
            fill="none"
            opacity="0.75"
          />
          {/* Equilateral Triangle Down (Hexagram) */}
          <polygon
            points="250,380 362,185 138,185"
            stroke="#C084FC"
            strokeWidth="1.4"
            fill="none"
            opacity="0.75"
          />

          {/* Golden Center Octagram Rays */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x2 = 250 + Math.cos(angle) * 110;
            const y2 = 250 + Math.sin(angle) * 110;
            return <line key={i} x1="250" y1="250" x2={x2} y2={y2} stroke="#E9D5FF" strokeWidth="0.8" opacity="0.4" />;
          })}
        </g>

        {/* 4. Pulsing Luminous Core & Central Star */}
        <g className="sacred-core-pulse">
          <circle cx="250" cy="250" r="45" fill="url(#sacredCore)" filter="url(#purpleGlow)" />
          {/* Four-pointed sparkle star */}
          <path
            d="M 250 180 Q 250 250 180 250 Q 250 250 250 320 Q 250 250 320 250 Q 250 250 250 180 Z"
            fill="#FFFFFF"
            opacity="0.95"
            filter="url(#purpleGlow)"
          />
          {/* Diagonal secondary sparkle star */}
          <path
            d="M 250 205 Q 250 250 205 250 Q 250 250 250 295 Q 250 250 295 250 Q 250 250 250 205 Z"
            fill="#E9D5FF"
            opacity="0.8"
            transform="rotate(45 250 250)"
          />
          <circle cx="250" cy="250" r="6" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
