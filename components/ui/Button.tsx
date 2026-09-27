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
    fontWeight: 700,
    fontFamily: 'var(--font-sans)',
    letterSpacing: '-0.01em',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.55 : 1,
    transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
    textDecoration: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    width: fullWidth ? '100%' : undefined,
    position: 'relative',
    overflow: 'hidden',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '7px 16px',
      fontSize: '12px',
      borderRadius: '4px',
    },
    md: {
      padding: '10px 22px',
      fontSize: '13.5px',
      borderRadius: '4px',
    },
    lg: {
      padding: '13px 28px',
      fontSize: '15px',
      borderRadius: '6px',
    },
    icon: {
      padding: '10px',
      borderRadius: '6px',
      width: '40px',
      height: '40px',
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
      color: '#FFFFFF',
      boxShadow: '0 4px 18px rgba(124, 58, 237, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      border: '1px solid rgba(168, 85, 247, 0.45)',
    },
    orange: {
      background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
      color: '#FFFFFF',
      boxShadow: '0 4px 18px rgba(124, 58, 237, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      border: '1px solid rgba(168, 85, 247, 0.45)',
    },
    secondary: {
      background: 'rgba(22, 14, 44, 0.75)',
      color: '#F3EEFF',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
    },
    outline: {
      background: 'transparent',
      color: '#F3EEFF',
      border: '1px solid rgba(216, 180, 254, 0.5)',
      backdropFilter: 'blur(10px)',
    },
    gold: {
      background: 'linear-gradient(135deg, #FACC15 0%, #EAB308 100%)',
      color: '#08080B',
      fontWeight: 800,
      boxShadow: '0 6px 22px rgba(250, 204, 21, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
      border: '1px solid rgba(250, 204, 21, 0.5)',
    },
    yellow: {
      background: 'linear-gradient(135deg, #FACC15 0%, #EAB308 100%)',
      color: '#08080B',
      fontWeight: 800,
      boxShadow: '0 6px 22px rgba(250, 204, 21, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
      border: '1px solid rgba(250, 204, 21, 0.5)',
    },
    blue: {
      background: 'linear-gradient(135deg, #2563EB 0%, #0284C7 100%)',
      color: '#FFFFFF',
      boxShadow: '0 6px 22px rgba(37, 99, 235, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
      border: '1px solid rgba(56, 189, 248, 0.5)',
    },
    green: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      color: '#FFFFFF',
      boxShadow: '0 6px 22px rgba(16, 185, 129, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
      border: '1px solid rgba(16, 185, 129, 0.5)',
    },
    white: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
      color: '#08080B',
      fontWeight: 800,
      boxShadow: '0 6px 22px rgba(255, 255, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      border: '1px solid #FFFFFF',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.06)',
      color: '#FFFFFF',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.16)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
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
            width: '15px',
            height: '15px',
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
