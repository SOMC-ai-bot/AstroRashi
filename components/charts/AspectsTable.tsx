'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { AspectData } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { interpretAspect } from '@/lib/astrology/interpretation';

interface AspectsTableProps {
  aspects: AspectData[];
  onAskAI: (prompt: string) => void;
}

export const AspectsTable: React.FC<AspectsTableProps> = ({ aspects, onAskAI }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {aspects.map((asp, index) => {
        const info = interpretAspect(asp);
        return (
          <Card key={index} variant="glass" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', color: asp.isHarmonious ? 'var(--gold-primary)' : 'var(--accent-rose-light)' }}>
                  {asp.symbol}
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {asp.planet1} {asp.type} {asp.planet2}
                </h4>
              </div>

              <Badge variant={asp.isHarmonious ? 'gold' : 'plum'} size="sm">
                Orb {asp.orb}°
              </Badge>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
              {info.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px' }}>
              <span style={{ fontSize: '11.5px', color: asp.isHarmonious ? '#34D399' : '#FBBF24', fontWeight: 600 }}>
                {asp.isHarmonious ? '✦ Harmonious Planetary Trine/Sextile' : '✦ Growth Tension (Square/Opposition)'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {asp.orb}° precision orb
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
