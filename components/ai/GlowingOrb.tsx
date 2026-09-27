'use client';

import React from 'react';

interface GlowingOrbProps {
  size?: number;
  state?: 'idle' | 'thinking' | 'streaming';
  onClick?: () => void;
  interactive?: boolean;
}

export const GlowingOrb: React.FC<GlowingOrbProps> = ({
  size = 56,
  state = 'idle',
  onClick,
  interactive = true,
}) => {
  const isThinking = state === 'thinking';
  const isStreaming = state === 'streaming';

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: interactive ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {/* Outer ambient blur glow */}
      <div
        style={{
          position: 'absolute',
          inset: `-${size * 0.25}px`,
          borderRadius: '50%',
          background: isThinking
            ? 'radial-gradient(circle, rgba(217, 106, 141, 0.6) 0%, rgba(139, 47, 85, 0.4) 45%, transparent 70%)'
            : isStreaming
            ? 'radial-gradient(circle, rgba(216, 197, 138, 0.5) 0%, rgba(194, 78, 120, 0.4) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(194, 78, 120, 0.45) 0%, rgba(139, 47, 85, 0.25) 50%, transparent 70%)',
          filter: 'blur(12px)',
          transition: 'all 400ms ease',
        }}
      />

      {/* Main Orb Body */}
      <div
        className={isThinking ? 'ai-orb-thinking' : 'ai-orb-idle'}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #A63867 0%, #681C3D 50%, #171719 100%)',
          boxShadow: isThinking
            ? '0 0 28px rgba(217, 106, 141, 0.8), inset 0 0 16px rgba(255, 255, 255, 0.4)'
            : '0 0 20px rgba(194, 78, 120, 0.5), inset 0 0 12px rgba(216, 197, 138, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Core highlight */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '35%',
            height: '35%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(216, 197, 138, 0.4) 50%, transparent 80%)',
            filter: 'blur(2px)',
          }}
        />

        {/* Center cosmic sparkle icon */}
        <svg
          width={size * 0.42}
          height={size * 0.42}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            zIndex: 2,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          }}
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      </div>
    </div>
  );
};
