'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className = '',
  fullWidth = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-full)',
        padding: '4px',
        gap: '4px',
        width: fullWidth ? '100%' : 'fit-content',
        overflowX: 'auto',
      }}
      className={className}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: fullWidth ? 1 : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: isActive
                ? 'linear-gradient(135deg, var(--accent-wine) 0%, var(--accent-rose) 100%)'
                : 'transparent',
              color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap',
              boxShadow: isActive ? '0 2px 10px rgba(194, 78, 120, 0.35)' : 'none',
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-full)',
                  padding: '1px 6px',
                  fontSize: '11px',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
