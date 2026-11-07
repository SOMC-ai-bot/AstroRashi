'use client';

import React, { useEffect, useState, useRef } from 'react';
import { AstroRashiLogo } from '@/components/brand/AstroRashiLogo';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 180);
  };

  useEffect(() => {
    // Automatically advance into the application after 1.4 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1200);

    const completeTimer = setTimeout(() => {
      handleFinish();
    }, 1400);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div
      onClick={handleFinish}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#06070E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Background Solar Orange & Deep Violet Cosmic Radial Glows */}
      <div
        style={{
          position: 'absolute',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(124, 58, 237, 0.22) 50%, transparent 75%)',
          filter: 'blur(45px)',
          animation: 'orbBreathe 2.4s infinite ease-in-out',
          pointerEvents: 'none',
        }}
      />

      {/* Central AstroRashi Logo & Sacred Geometry Animation */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          animation: 'modalFadeIn 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <AstroRashiLogo size="xl" />

        {/* Ambient Loading Dots Indicator */}
        <div
          style={{
            marginTop: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#F97316',
              animation: 'sacredPulseCore 1.2s infinite ease-in-out',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FDE047',
              animation: 'sacredPulseCore 1.2s infinite ease-in-out 0.2s',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#C084FC',
              animation: 'sacredPulseCore 1.2s infinite ease-in-out 0.4s',
            }}
          />
        </div>

        <p
          style={{
            fontSize: '12px',
            color: '#94A3B8',
            marginTop: '16px',
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>Aligning Vedic Ephemeris...</span>
        </p>
      </div>

      {/* Direct Skip Button (Top Right, High Z-Index, Explicit Pointer Events) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleFinish();
        }}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 100000,
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1.5px solid rgba(249, 115, 22, 0.4)',
          borderRadius: '24px',
          padding: '8px 18px',
          color: '#FFFFFF',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
          transition: 'all 150ms ease',
          pointerEvents: 'auto',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.25)';
          e.currentTarget.style.borderColor = '#F97316';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
        }}
      >
        <span>Skip</span>
        <ArrowRight size={14} color="#F97316" />
      </button>

      {/* Bottom Hint */}
      <span
        style={{
          position: 'absolute',
          bottom: '24px',
          fontSize: '11px',
          color: '#64748B',
          letterSpacing: '0.04em',
        }}
      >
        Tap anywhere to enter application
      </span>
    </div>
  );
};
