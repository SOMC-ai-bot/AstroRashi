'use client';

import React from 'react';

export type CardVariant =
  | 'glass'
  | 'elevated'
  | 'gradient'
  | 'gold'
  | 'orange'
  | 'blue'
  | 'yellow'
  | 'green'
  | 'holographic';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
  children: React.ReactNode;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  interactive = false,
  glow = false,
  children,
  style,
  className = '',
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    padding: '22px',
    transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms cubic-bezier(0.16, 1, 0.3, 1), border-color 260ms cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: interactive ? 'pointer' : 'default',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  const variantStyles: Record<CardVariant, React.CSSProperties> = {
    glass: {
      background: 'linear-gradient(180deg, rgba(20, 14, 40, 0.82) 0%, rgba(10, 7, 22, 0.94) 100%)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      border: '1px solid rgba(168, 85, 247, 0.22)',
      boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    },
    elevated: {
      background: 'linear-gradient(180deg, rgba(26, 17, 52, 0.88) 0%, rgba(13, 8, 28, 0.98) 100%)',
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      border: '1px solid rgba(168, 85, 247, 0.35)',
      boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(124, 58, 237, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    },
    gradient: {
      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(14, 9, 30, 0.96) 100%)',
      border: '1px solid rgba(168, 85, 247, 0.4)',
      boxShadow: '0 18px 45px -10px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
    },
    orange: {
      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(14, 9, 30, 0.96) 100%)',
      border: '1px solid rgba(168, 85, 247, 0.4)',
      boxShadow: '0 18px 45px -10px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
    },
    gold: {
      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.14) 0%, rgba(14, 15, 24, 0.96) 100%)',
      border: '1px solid rgba(250, 204, 21, 0.35)',
      boxShadow: '0 18px 45px -10px rgba(250, 204, 21, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    },
    yellow: {
      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.14) 0%, rgba(14, 15, 24, 0.96) 100%)',
      border: '1px solid rgba(250, 204, 21, 0.35)',
      boxShadow: '0 18px 45px -10px rgba(250, 204, 21, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    },
    blue: {
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.16) 0%, rgba(14, 15, 24, 0.96) 100%)',
      border: '1px solid rgba(56, 189, 248, 0.35)',
      boxShadow: '0 18px 45px -10px rgba(37, 99, 235, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    },
    green: {
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(14, 15, 24, 0.96) 100%)',
      border: '1px solid rgba(16, 185, 129, 0.35)',
      boxShadow: '0 18px 45px -10px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    },
    holographic: {
      background: 'linear-gradient(145deg, rgba(255, 106, 0, 0.12) 0%, rgba(37, 99, 235, 0.1) 50%, rgba(250, 204, 21, 0.12) 100%)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
  };

  const glowStyle: React.CSSProperties = glow
    ? {
        boxShadow:
          variant === 'orange' || variant === 'gradient'
            ? '0 0 35px rgba(255, 106, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : variant === 'blue'
            ? '0 0 35px rgba(56, 189, 248, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : variant === 'gold' || variant === 'yellow'
            ? '0 0 35px rgba(250, 204, 21, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : variant === 'green'
            ? '0 0 35px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 0 35px rgba(255, 255, 255, 0.15)',
      }
    : {};

  return (
    <div
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...glowStyle,
        ...style,
      }}
      className={`custom-card shimmer-card ${interactive ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
