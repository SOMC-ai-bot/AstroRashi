'use client';

import React from 'react';

export type BadgeVariant =
  | 'orange'
  | 'blue'
  | 'yellow'
  | 'gold'
  | 'green'
  | 'white'
  | 'wine'
  | 'rose'
  | 'plum'
  | 'outline'
  | 'surface'
  | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  dot?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'orange',
  size = 'sm',
  children,
  icon,
  dot = false,
  className = '',
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    borderRadius: '4px',
    fontWeight: 650,
    letterSpacing: '0.02em',
    fontFamily: 'var(--font-sans)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'all 0.16s ease',
  };

  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? { padding: '2px 8px', fontSize: '11px', lineHeight: '16px' }
      : { padding: '4px 12px', fontSize: '12.5px', lineHeight: '18px' };

  // Matte Dark Theme Palette (#11A8EB blue, #25282E card, #101722 surface, #41454D border)
  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    orange: {
      background: '#101722',
      color: '#11A8EB',
      border: '1px solid #11A8EB',
    },
    blue: {
      background: '#101722',
      color: '#11A8EB',
      border: '1px solid #11A8EB',
    },
    yellow: {
      background: '#101722',
      color: '#FFFFFF',
      border: '1px solid #41454D',
    },
    gold: {
      background: '#101722',
      color: '#FFFFFF',
      border: '1px solid #11A8EB',
    },
    green: {
      background: '#101722',
      color: '#11A8EB',
      border: '1px solid #41454D',
    },
    white: {
      background: '#25282E',
      color: '#FFFFFF',
      border: '1px solid #41454D',
    },
    wine: {
      background: '#101722',
      color: '#D5D7DA',
      border: '1px solid #41454D',
    },
    rose: {
      background: '#101722',
      color: '#D5D7DA',
      border: '1px solid #41454D',
    },
    plum: {
      background: '#101722',
      color: '#11A8EB',
      border: '1px solid #41454D',
    },
    outline: {
      background: 'transparent',
      color: '#D5D7DA',
      border: '1px solid #41454D',
    },
    surface: {
      background: '#25282E',
      color: '#FFFFFF',
      border: '1px solid #41454D',
    },
    neutral: {
      background: '#101722',
      color: '#D5D7DA',
      border: '1px solid #41454D',
    },
  };

  return (
    <span
      className={className}
      style={{
        ...baseStyle,
        ...sizeStyle,
        ...(variantStyles[variant] || variantStyles.orange),
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#11A8EB',
            display: 'inline-block',
          }}
        />
      )}
      {icon}
      {children}
    </span>
  );
};
