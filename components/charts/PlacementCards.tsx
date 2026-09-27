'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PlanetPosition } from '@/types';
import { interpretPlacement } from '@/lib/astrology/interpretation';
import { Sparkles, Compass } from 'lucide-react';

interface PlacementCardsProps {
  placements: PlanetPosition[];
  onAskAI: (prompt: string) => void;
  selectedPlacement?: PlanetPosition | null;
  onSelectPlacement?: (pos: PlanetPosition) => void;
}

export const PlacementCards: React.FC<PlacementCardsProps> = ({
  placements,
  onAskAI,
  selectedPlacement,
  onSelectPlacement,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {placements.map((pos) => {
        const isSelected = selectedPlacement?.name === pos.name;
        const interpretation = interpretPlacement(pos);

        return (
          <Card
            key={pos.name}
            variant={isSelected ? 'gradient' : 'glass'}
            style={{
              padding: '18px 20px',
              border: isSelected ? '1.5px solid var(--accent-rose)' : undefined,
            }}
          >
            {/* Header with Planet Symbol & Sign */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    color: isSelected ? 'var(--accent-rose-light)' : 'var(--gold-primary)',
                  }}
                >
                  {pos.symbol}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {pos.name} in {pos.sign}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    House {pos.house} • {pos.degree}°{pos.minute.toString().padStart(2, '0')}&apos;
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {pos.isRetrograde && (
                  <Badge variant="plum" size="sm">
                    Rx
                  </Badge>
                )}
                <Badge variant="outline" size="sm">
                  {pos.element}
                </Badge>
              </div>
            </div>

            {/* Vedic Nakshatra if present */}
            {pos.nakshatra && (
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--gold-muted)',
                  marginBottom: '10px',
                  background: 'rgba(216, 197, 138, 0.08)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-block',
                }}
              >
                Nakshatra: <strong>{pos.nakshatra.name}</strong> (Pada {pos.nakshatra.pada}, Lord: {pos.nakshatra.lord})
              </div>
            )}

            {/* AI Insight Summary */}
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '14px',
              }}
            >
              {interpretation.aiInsight}
            </p>

            {/* Action CTA & Selection */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--gold-primary)' }}>
                <span>✦ Key Role:</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {pos.name === 'Sun' ? 'Core Identity & Willpower' :
                   pos.name === 'Moon' ? 'Mind, Memory & Emotions' :
                   pos.name === 'Mars' ? 'Action, Courage & Drive' :
                   pos.name === 'Mercury' ? 'Communication & Intellect' :
                   pos.name === 'Jupiter' ? 'Higher Wisdom & Fortune' :
                   pos.name === 'Venus' ? 'Love, Harmony & Beauty' :
                   pos.name === 'Saturn' ? 'Discipline & Karma' :
                   pos.name === 'Rahu' ? 'Worldly Ambition' :
                   pos.name === 'Ketu' ? 'Spiritual Detachment' : 'Planetary Guide'}
                </span>
              </div>

              {onSelectPlacement && (
                <button
                  type="button"
                  onClick={() => onSelectPlacement(pos)}
                  style={{
                    background: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'none',
                    border: isSelected ? '1px solid rgba(168, 85, 247, 0.4)' : 'none',
                    color: isSelected ? '#C084FC' : 'var(--text-muted)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  {isSelected ? 'Selected' : 'View on Wheel'}
                </button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
