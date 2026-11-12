'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, onClear, className = '', style, value, ...props }, ref) => {
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
            value={value}
            style={{
              width: '100%',
              padding: icon
                ? onClear && value
                  ? '12px 36px 12px 42px'
                  : '12px 16px 12px 42px'
                : onClear && value
                ? '12px 36px 12px 16px'
                : '12px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: error ? '1px solid #FF453A' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 180ms ease',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              ...style,
            }}
            className={`custom-input ${className}`}
            {...props}
          />
          {onClear && value ? (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear field"
              style={{
                position: 'absolute',
                right: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                cursor: 'pointer',
                fontSize: '11px',
                lineHeight: 1,
                padding: 0,
              }}
            >
              ✕
            </button>
          ) : null}
        </div>
        {error && <span style={{ fontSize: '12px', color: '#FF453A' }}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
