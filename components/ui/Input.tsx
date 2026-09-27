'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', style, ...props }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        {label && (
          <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>
            {label}
          </label>
        )}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          {icon && (
            <div
              style={{
                position: 'absolute',
                left: '14px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            >
              {icon}
            </div>
          )}
          <input
            ref={ref}
            style={{
              width: '100%',
              padding: icon ? '12px 16px 12px 42px' : '12px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: error ? '1px solid #FF453A' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 180ms ease',
              fontFamily: 'inherit',
              ...style,
            }}
            className={`custom-input ${className}`}
            {...props}
          />
        </div>
        {error && <span style={{ fontSize: '12px', color: '#FF453A' }}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
