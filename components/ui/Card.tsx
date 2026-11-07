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
    borderRadius: 'var(--radius-md)',
    padding: '20px',
    backgroundColor: '#25282E',
    border: '1px solid #41454D',
    color: '#FFFFFF',
    transition: 'border-color 160ms ease, background 160ms ease',
    cursor: interactive ? 'pointer' : 'default',
    boxSizing: 'border-box',
  };

  const variantStyles: Record<CardVariant, React.CSSProperties> = {
    glass: {
      backgroundColor: '#25282E',
      border: '1px solid #41454D',
    },
    elevated: {
      backgroundColor: '#101722',
      border: '1px solid #41454D',
    },
    gradient: {
      backgroundColor: '#25282E',
      border: '1px solid #41454D',
    },
    gold: {
      backgroundColor: '#25282E',
      border: '1px solid #11A8EB',
    },
    orange: {
      backgroundColor: '#25282E',
      border: '1px solid #11A8EB',
    },
    blue: {
      backgroundColor: '#101722',
      border: '1px solid #11A8EB',
    },
    yellow: {
      backgroundColor: '#25282E',
      border: '1px solid #11A8EB',
    },
    green: {
      backgroundColor: '#101722',
      border: '1px solid #41454D',
    },
    holographic: {
      backgroundColor: '#25282E',
      border: '1px solid #41454D',
    },
  };

  return (
    <div
      className={className}
      style={{
        ...baseStyle,
        ...(variantStyles[variant] || variantStyles.glass),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
