'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeState, setFadeState] = useState<'entering' | 'visible' | 'exiting'>('entering');

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setFadeState('visible');
    }, 60);

    const exitTimer = setTimeout(() => {
      setFadeState('exiting');
    }, 1100);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1400);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#08080B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeState === 'exiting' ? 0 : 1,
        transition: 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background Cosmic Glows in Solar Orange and Planetary Blue */}
      <div
        style={{
          position: 'absolute',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 106, 0, 0.32) 0%, rgba(37, 99, 235, 0.18) 50%, transparent 70%)',
          filter: 'blur(36px)',
          animation: 'orbBreathe 2.5s infinite ease-in-out',
        }}
      />

      {/* Central AstroNex Logo Emblem */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: fadeState === 'entering' ? 'scale(0.92)' : 'scale(1)',
          opacity: fadeState === 'entering' ? 0 : 1,
          transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, #FF6A00 0%, #D95300 45%, #08080B 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 0 40px rgba(255, 106, 0, 0.65), 0 0 20px rgba(250, 204, 21, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '22px',
          }}
        >
          <Sparkles size={38} color="#FFFFFF" />
        </div>

        <h1
          style={{
            fontSize: '36px',
            fontWeight: 800,
            letterSpacing: '0.12em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FF9E4D 50%, #FACC15 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
          }}
        >
          ASTRONEX
        </h1>

        <p
          style={{
            fontSize: '12.5px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: '#FF7D1A' }}>✦</span>
          <span>Vedic Astrology & Cosmic Insights</span>
          <span style={{ color: '#38BDF8' }}>✦</span>
        </p>
      </div>

      {/* Skip button at top right */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: '28px',
          right: '24px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 14px',
          color: 'var(--text-muted)',
          fontSize: '12px',
          cursor: 'pointer',
        }}
      >
        Skip
      </button>
    </div>
  );
};
