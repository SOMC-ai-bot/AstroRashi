'use client';

import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'orange'
  | 'secondary'
  | 'gold'
  | 'yellow'
  | 'blue'
  | 'green'
  | 'white'
  | 'ghost'
  | 'glass'
  | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  loading = false,
  fullWidth = false,
  className = '',
  style,
  disabled,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 650,
    fontFamily: 'var(--font-sans)',
    letterSpacing: '0.01em',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.55 : 1,
    transition: 'background 160ms ease, border-color 160ms ease, color 160ms ease',
    textDecoration: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    width: fullWidth ? '100%' : undefined,
    position: 'relative',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '7px 14px',
      fontSize: '12px',
      borderRadius: '6px',
    },
    md: {
      padding: '9px 18px',
      fontSize: '13px',
      borderRadius: '8px',
    },
    lg: {
      padding: '12px 24px',
      fontSize: '14.5px',
      borderRadius: '8px',
    },
    icon: {
      padding: '8px',
      borderRadius: '8px',
      width: '38px',
      height: '38px',
    },
  };

  // Pure Matte Solid Design Palette (#11A8EB blue primary, #25282E card, #101722 surface, #41454D border)
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: '#11A8EB',
      color: '#FFFFFF',
      border: '1px solid #11A8EB',
    },
    orange: {
      background: '#11A8EB',
      color: '#FFFFFF',
      border: '1px solid #11A8EB',
    },
    secondary: {
      background: '#101722',
      color: '#FFFFFF',
      border: '1px solid #41454D',
    },
    outline: {
      background: 'transparent',
      color: '#D5D7DA',
      border: '1px solid #41454D',
    },
    gold: {
      background: '#11A8EB',
      color: '#FFFFFF',
      border: '1px solid #11A8EB',
    },
    yellow: {
      background: '#11A8EB',
      color: '#FFFFFF',
      border: '1px solid #11A8EB',
    },
    blue: {
      background: '#11A8EB',
      color: '#FFFFFF',
      border: '1px solid #11A8EB',
    },
    green: {
      background: '#101722',
      color: '#FFFFFF',
      border: '1px solid #41454D',
    },
    white: {
      background: '#FFFFFF',
      color: '#050608',
      fontWeight: 700,
      border: '1px solid #FFFFFF',
    },
    ghost: {
      background: 'transparent',
      color: '#D5D7DA',
    },
    glass: {
      background: '#25282E',
      color: '#FFFFFF',
      border: '1px solid #41454D',
    },
  };

  return (
    <button
      className={className}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...(variantStyles[variant] || variantStyles.primary),
        ...style,
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          className="animate-spin"
          style={{
            display: 'inline-block',
            width: '14px',
            height: '14px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#fff',
            borderRadius: '50%',
          }}
        />
      ) : (
        icon
      )}
      {children}
    </button>
  );
};
