'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TransitData } from '@/types';
import { Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TransitsViewProps {
  transits: TransitData[];
  onAskAI: (prompt: string) => void;
}

export const TransitsView: React.FC<TransitsViewProps> = ({ transits, onAskAI }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          background: 'rgba(216, 197, 138, 0.08)',
          border: '1px solid rgba(216, 197, 138, 0.2)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Activity size={18} color="var(--gold-primary)" />
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Real-time astronomical transits currently interacting with your natal chart.
        </span>
      </div>

      {transits.map((transit, i) => (
        <Card key={i} variant="glass" style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: 'var(--gold-primary)',
                }}
              >
                {transit.planet.slice(0, 2)}
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Transit {transit.planet} in {transit.currentSign}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {transit.degree}° • {transit.duration}
                </p>
              </div>
            </div>

            {transit.isRetrograde && (
              <Badge variant="plum" size="sm">
                Retrograde
              </Badge>
            )}
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
            {transit.impactTheme}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '11.5px', color: '#FACC15', fontWeight: 600 }}>
              ✦ Transit Advice: Focus on grounding and conscious initiative.
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
