'use client';

import React from 'react';
import { Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import { useAstrology } from '@/lib/state/astrology-context';

interface AstrologyContextBadgeProps {
  useContext: boolean;
  onToggle: () => void;
}

export const AstrologyContextBadge: React.FC<AstrologyContextBadgeProps> = ({
  useContext,
  onToggle,
}) => {
  const { natalChart } = useAstrology();
  const sun = natalChart.planets.find((p) => p.name === 'Sun');
  const moon = natalChart.planets.find((p) => p.name === 'Moon');
  const asc = natalChart.ascendant;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        backgroundColor: useContext ? 'rgba(194, 78, 120, 0.12)' : 'rgba(255, 255, 255, 0.04)',
        border: useContext ? '1px solid rgba(194, 78, 120, 0.28)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        transition: 'all 200ms ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
        <Sparkles
          size={14}
          color={useContext ? 'var(--accent-rose-light)' : 'var(--text-muted)'}
        />
        {useContext ? (
          <span style={{ color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            Using your chart: <strong>☉ {sun?.sign}</strong> • <strong>☽ {moon?.sign}</strong> • <strong>AC {asc.sign}</strong>
          </span>
        ) : (
          <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            General Guidance mode (Birth chart context paused)
          </span>
        )}
      </div>

      <button
        onClick={onToggle}
        style={{
          background: 'none',
          border: 'none',
          color: useContext ? 'var(--accent-rose-light)' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '2px 6px',
          fontWeight: 500,
          fontSize: '11px',
          flexShrink: 0,
        }}
      >
        {useContext ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
      </button>
    </div>
  );
};
