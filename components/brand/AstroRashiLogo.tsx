'use client';

import React from 'react';

interface AstroRashiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AstroRashiLogo: React.FC<AstroRashiLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = true,
  className,
  onClick,
}) => {
  const dimensions = {
    sm: { iconSize: 32, svgSize: 20, fontSize: 16, subSize: 8 },
    md: { iconSize: 40, svgSize: 24, fontSize: 19, subSize: 9 },
    lg: { iconSize: 52, svgSize: 32, fontSize: 24, subSize: 11 },
    xl: { iconSize: 72, svgSize: 46, fontSize: 32, subSize: 13 },
  }[size];

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'sm' ? '8px' : size === 'md' ? '10px' : '14px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {/* Matte Blue & Black Geometric Emblem (No Gradients, No Neon Glow) */}
      <div
        style={{
          width: `${dimensions.iconSize}px`,
          height: `${dimensions.iconSize}px`,
          borderRadius: '8px',
          backgroundColor: '#101722',
          border: '1.5px solid #11A8EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <svg
          width={dimensions.svgSize}
          height={dimensions.svgSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orbital Circle */}
          <circle cx="50" cy="50" r="44" stroke="#41454D" strokeWidth="2.5" strokeDasharray="4 3" />

          {/* 4 Cardinal Nodes */}
          <circle cx="50" cy="6" r="3.5" fill="#11A8EB" />
          <circle cx="94" cy="50" r="3.5" fill="#11A8EB" />
          <circle cx="50" cy="94" r="3.5" fill="#11A8EB" />
          <circle cx="6" cy="50" r="3.5" fill="#11A8EB" />

          {/* Ashtakoot Diamond Star */}
          <polygon points="50,14 86,50 50,86 14,50" stroke="#11A8EB" strokeWidth="2.8" fill="none" />

          {/* Secondary Square */}
          <polygon points="25,25 75,25 75,75 25,75" stroke="#FFFFFF" strokeWidth="1.8" fill="none" opacity="0.8" />

          {/* Cross Axis */}
          <line x1="50" y1="18" x2="50" y2="82" stroke="#41454D" strokeWidth="1.5" />
          <line x1="18" y1="50" x2="82" y2="50" stroke="#41454D" strokeWidth="1.5" />

          {/* Center Bindu */}
          <circle cx="50" cy="50" r="6" fill="#11A8EB" />
          <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* AstroRashi Typography (Clean White & Blue, No Glowing Text) */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontSize: `${dimensions.fontSize}px`,
              fontWeight: 800,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#FFFFFF', fontWeight: 800 }}>Astro</span>
            <span style={{ color: '#11A8EB', fontWeight: 800, marginLeft: '2px' }}>
              Rashi
            </span>
          </div>

          {showSubtitle && (
            <span
              style={{
                fontSize: `${dimensions.subSize}px`,
                fontWeight: 650,
                color: '#D5D7DA',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '2px',
                lineHeight: 1,
              }}
            >
              Vedic Cosmic Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
