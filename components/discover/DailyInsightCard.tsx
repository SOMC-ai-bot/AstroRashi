'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAstrology } from '@/lib/state/astrology-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Sparkles, Sun, Moon, Zap, ChevronRight } from 'lucide-react';

interface DailyInsightCardProps {
  onAskAI: (query: string) => void;
}

export const DailyInsightCard: React.FC<DailyInsightCardProps> = ({ onAskAI }) => {
  const { natalChart, transits } = useAstrology();
  const { t } = useI18n();
  const [activeDay, setActiveDay] = useState<'today' | 'tomorrow' | 'yesterday'>('today');

  const sun = natalChart.planets.find((p) => p.name === 'Sun');
  const moon = natalChart.planets.find((p) => p.name === 'Moon');
  const primaryTransit = transits[0];

  const insights = {
    yesterday: {
      headline: 'Reflective Integration & Grounding',
      date: 'Yesterday’s Energy',
      summary: `The Moon in ${moon?.sign || 'Taurus'} established stability after mental turbulence. You were invited to consolidate ideas before committing to outward action.`,
      theme: 'Patience & Synthesis',
      icon: <Moon size={22} color="#38BDF8" />,
      accent: '#38BDF8',
    },
    today: {
      headline: 'Strategic Precision & Cosmic Alignment',
      date: 'Today’s Cosmic Influence',
      summary: `Sun in ${sun?.sign || 'Virgo'} aligns harmoniously with current planetary transits. A prime cosmic window for meticulous problem-solving, structured communication, and career momentum.`,
      theme: primaryTransit?.impactTheme || 'Discipline & Purpose',
      icon: <Sun size={22} color="#FACC15" />,
      accent: '#FACC15',
    },
    tomorrow: {
      headline: 'Catalytic Breakthroughs & Expansion',
      date: 'Tomorrow’s Horizon',
      summary: `Dynamic aspects invite bold creative initiative. Be prepared to voice original proposals and collaborate with mentors or trusted allies.`,
      theme: 'Momentum & Vision',
      icon: <Zap size={22} color="#FF6A00" />,
      accent: '#FF6A00',
    },
  };

  const current = insights[activeDay];

  return (
    <Card
      variant="elevated"
      style={{
        padding: '28px',
        border: '1px solid rgba(250, 204, 21, 0.25)',
        background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(255, 106, 0, 0.08) 40%, rgba(12, 13, 21, 0.98) 100%)',
        boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Day Selector Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '6px',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '4px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {(['yesterday', 'today', 'tomorrow'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              style={{
                background:
                  activeDay === day ? 'linear-gradient(135deg, #FF6A00 0%, #FFA04D 100%)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                color: activeDay === day ? '#FFFFFF' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: activeDay === day ? 800 : 500,
                cursor: 'pointer',
                transition: 'all 180ms ease',
                boxShadow: activeDay === day ? '0 2px 10px rgba(255, 106, 0, 0.4)' : 'none',
              }}
            >
              {t.discover[day]}
            </button>
          ))}
        </div>

        <Badge variant="gold" size="sm" dot>
          {current.date}
        </Badge>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 0 20px ${current.accent}33`,
            border: `1px solid ${current.accent}44`,
          }}
        >
          {current.icon}
        </div>
        <div>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '4px',
              fontFamily: 'var(--font-display)',
            }}
          >
            {current.headline}
          </h3>
          <p style={{ fontSize: '13px', color: current.accent, fontWeight: 700 }}>
            {current.theme}
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: '13.5px',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: '22px',
        }}
      >
        {current.summary}
      </p>

      {/* Action CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Button
          variant="gold"
          size="sm"
          onClick={() =>
            onAskAI(
              `How does today's transit of ${primaryTransit?.planet || 'Sun'} in ${primaryTransit?.currentSign || 'Virgo'} influence my ${sun?.sign || 'Virgo'} Sun chart?`
            )
          }
          icon={<Sparkles size={15} color="#08080B" />}
        >
          <span>Consult Astrologer on Today&apos;s Transits</span>
          <ChevronRight size={15} color="#08080B" />
        </Button>
      </div>
    </Card>
  );
};
