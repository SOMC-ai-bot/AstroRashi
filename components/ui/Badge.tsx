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
    gap: '6px',
    borderRadius: 'var(--radius-full)',
    fontWeight: 700,
    letterSpacing: '0.03em',
    fontFamily: 'var(--font-sans)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'all 0.18s ease',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '4px 10px',
      fontSize: '11px',
    },
    md: {
      padding: '6px 14px',
      fontSize: '12.5px',
    },
  };

  const variantStyles: Record<BadgeVariant, { container: React.CSSProperties; dotColor: string }> = {
    orange: {
      container: {
        background: 'rgba(255, 106, 0, 0.14)',
        color: '#FFA04D',
        border: '1px solid rgba(255, 106, 0, 0.4)',
        boxShadow: '0 2px 10px rgba(255, 106, 0, 0.15)',
      },
      dotColor: '#FF6A00',
    },
    blue: {
      container: {
        background: 'rgba(37, 99, 235, 0.16)',
        color: '#60A5FA',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        boxShadow: '0 2px 10px rgba(37, 99, 235, 0.18)',
      },
      dotColor: '#38BDF8',
    },
    yellow: {
      container: {
        background: 'rgba(250, 204, 21, 0.14)',
        color: '#FDE047',
        border: '1px solid rgba(250, 204, 21, 0.4)',
        boxShadow: '0 2px 10px rgba(250, 204, 21, 0.15)',
      },
      dotColor: '#FACC15',
    },
    gold: {
      container: {
        background: 'rgba(250, 204, 21, 0.16)',
        color: '#FACC15',
        border: '1px solid rgba(250, 204, 21, 0.45)',
        boxShadow: '0 2px 10px rgba(250, 204, 21, 0.2)',
      },
      dotColor: '#FACC15',
    },
    green: {
      container: {
        background: 'rgba(16, 185, 129, 0.14)',
        color: '#34D399',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        boxShadow: '0 2px 10px rgba(16, 185, 129, 0.15)',
      },
      dotColor: '#10B981',
    },
    white: {
      container: {
        background: 'rgba(255, 255, 255, 0.12)',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
      },
      dotColor: '#FFFFFF',
    },
    wine: {
      container: {
        background: 'rgba(255, 106, 0, 0.15)',
        color: '#FFA04D',
        border: '1px solid rgba(255, 106, 0, 0.4)',
        boxShadow: '0 2px 10px rgba(255, 106, 0, 0.15)',
      },
      dotColor: '#FF6A00',
    },
    rose: {
      container: {
        background: 'rgba(255, 106, 0, 0.14)',
        color: '#FF8C33',
        border: '1px solid rgba(255, 106, 0, 0.35)',
        boxShadow: '0 2px 10px rgba(255, 106, 0, 0.15)',
      },
      dotColor: '#FF7D1A',
    },
    plum: {
      container: {
        background: 'rgba(37, 99, 235, 0.16)',
        color: '#60A5FA',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        boxShadow: '0 2px 10px rgba(37, 99, 235, 0.18)',
      },
      dotColor: '#38BDF8',
    },
    outline: {
      container: {
        background: 'transparent',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-subtle)',
      },
      dotColor: '#8E92AA',
    },
    surface: {
      container: {
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'var(--text-primary)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      dotColor: '#E2E4F0',
    },
    neutral: {
      container: {
        background: 'rgba(255, 255, 255, 0.06)',
        color: 'var(--text-muted)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      dotColor: '#8E92AA',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.orange;

  return (
    <span
      className={className}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...currentVariant.container,
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: currentVariant.dotColor,
            boxShadow: `0 0 8px ${currentVariant.dotColor}`,
          }}
        />
      )}
      {icon}
      {children}
    </span>
  );
};
