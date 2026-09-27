'use client';

import React, { useState } from 'react';
import { useAstrology } from '@/lib/state/astrology-context';
import { useAuth } from '@/lib/state/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { ZodiacWheel } from './ZodiacWheel';
import { NorthIndianChart } from './NorthIndianChart';
import { SouthIndianChart } from './SouthIndianChart';
import { PlacementCards } from './PlacementCards';
import { AspectsTable } from './AspectsTable';
import { TransitsView } from './TransitsView';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Settings2, Compass, Layers } from 'lucide-react';
import { PlanetPosition } from '@/types';

interface ChartsScreenProps {
  onAskAI: (prompt: string) => void;
  onOpenProfile: () => void;
}

export const ChartsScreen: React.FC<ChartsScreenProps> = ({ onAskAI, onOpenProfile }) => {
  const { user } = useAuth();
  const {
    natalChart,
    transits,
    selectedPlacement,
    setSelectedPlacement,
    system,
    setSystem,
    houseSystem,
    setHouseSystem,
    activeProfile,
  } = useAstrology();
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'aspects' | 'transits'>(
    'overview'
  );
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'western'>('north');
  const [chartDivision, setChartDivision] = useState<'d1' | 'd9'>('d1');

  const sun = natalChart.planets.find((p) => p.name === 'Sun');
  const moon = natalChart.planets.find((p) => p.name === 'Moon');
  const asc = natalChart.ascendant;

  const tabItems = [
    { id: 'overview', label: t.charts.tabs.overview },
    { id: 'positions', label: t.charts.tabs.positions, count: natalChart.planets.length },
    { id: 'aspects', label: t.charts.tabs.aspects, count: natalChart.aspects.length },
    { id: 'transits', label: t.charts.tabs.transits, count: transits.length },
  ];

  const handleSelectPlacement = (p: PlanetPosition) => {
    setSelectedPlacement(p);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '90px' }}>
      {/* 1. Header with Active Profile & Triad */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeProfile.name}&apos;s Birth Chart
              </h2>
              {activeProfile.relationship !== 'Me' && (
                <span style={{ fontSize: '11px', background: 'rgba(194, 78, 120, 0.2)', color: 'var(--accent-rose-light)', padding: '2px 8px', borderRadius: '12px' }}>
                  {activeProfile.relationship}
                </span>
              )}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {activeProfile.birthPlace} • {activeProfile.birthDate} at {activeProfile.birthTime}
            </p>
          </div>

          <Button variant="glass" size="sm" onClick={onOpenProfile} icon={<Settings2 size={15} />}>
            Profiles
          </Button>
        </div>

        {/* Big 3 Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '14px' }}>
          <Card variant="glass" style={{ padding: '14px 12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--gold-primary)', fontWeight: 600 }}>
              {t.charts.sunSign}
            </span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {sun?.sign}
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {sun?.degree}°{sun?.minute}&apos;
            </p>
          </Card>

          <Card variant="glass" style={{ padding: '14px 12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--accent-rose-light)', fontWeight: 600 }}>
              {t.charts.moonSign}
            </span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {moon?.sign}
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {moon?.degree}°{moon?.minute}&apos;
            </p>
          </Card>

          <Card variant="glass" style={{ padding: '14px 12px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {t.charts.ascendant}
            </span>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {asc.sign}
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {asc.degree}°{asc.minute}&apos;
            </p>
          </Card>
        </div>
      </div>

      {/* 2. Chart Visualizer Controls: Style (North, South, Western) & Division (D1, D9) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        {/* Style Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Chart Style:</span>
          <button
            onClick={() => setChartStyle('north')}
            style={{
              background: chartStyle === 'north' ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.06)',
              color: chartStyle === 'north' ? '#171719' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            North Indian
          </button>
          <button
            onClick={() => setChartStyle('south')}
            style={{
              background: chartStyle === 'south' ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.06)',
              color: chartStyle === 'south' ? '#171719' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            South Indian
          </button>
          <button
            onClick={() => setChartStyle('western')}
            style={{
              background: chartStyle === 'western' ? 'var(--accent-rose)' : 'rgba(255, 255, 255, 0.06)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Western Wheel
          </button>
        </div>

        {/* Division Selector (D1 vs D9 Navamsa) */}
        {chartStyle !== 'western' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Kundli:</span>
            <button
              onClick={() => setChartDivision('d1')}
              style={{
                background: chartDivision === 'd1' ? 'rgba(194, 78, 120, 0.3)' : 'transparent',
                border: '1px solid var(--border-subtle)',
                color: chartDivision === 'd1' ? '#FFFFFF' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px 8px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              D1 (Lagna)
            </button>
            <button
              onClick={() => setChartDivision('d9')}
              style={{
                background: chartDivision === 'd9' ? 'rgba(194, 78, 120, 0.3)' : 'transparent',
                border: '1px solid var(--border-subtle)',
                color: chartDivision === 'd9' ? '#FFFFFF' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px 8px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              D9 (Navamsa)
            </button>
          </div>
        )}
      </div>

      {/* 3. Interactive Kundli / Wheel Presentation */}
      <Card variant="glass" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {chartStyle === 'north' && (
          <NorthIndianChart
            chart={natalChart}
            onSelectPlacement={handleSelectPlacement}
            onSelectHouse={(h) => onAskAI(`What does my ${h}th house signify in my chart?`)}
            size={340}
          />
        )}

        {chartStyle === 'south' && (
          <SouthIndianChart
            chart={natalChart}
            onSelectPlacement={handleSelectPlacement}
            size={340}
          />
        )}

        {chartStyle === 'western' && (
          <ZodiacWheel
            chart={natalChart}
            onSelectPlacement={handleSelectPlacement}
            selectedPlacement={selectedPlacement}
            size={320}
          />
        )}

        {selectedPlacement && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(194, 78, 120, 0.12)',
              border: '1px solid rgba(194, 78, 120, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '380px',
            }}
          >
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                {selectedPlacement.name} in {selectedPlacement.sign} ({selectedPlacement.degree}°{selectedPlacement.minute}&apos;)
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                House {selectedPlacement.house} • Nakshatra: {selectedPlacement.nakshatra?.name} (Pada {selectedPlacement.nakshatra?.pada})
              </p>
            </div>
            <Badge variant="gold" size="sm">
              Selected Point
            </Badge>
          </div>
        )}
      </Card>

      {/* 4. Segmented Control Tabs */}
      <Tabs
        items={tabItems}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as any)}
        fullWidth
      />

      {/* 5. Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* AI Comprehensive Synthesis Card */}
          <Card variant="gradient" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={16} color="var(--gold-primary)" />
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gold-primary)' }}>
                AstroNex Synthesis of Your Chart Blueprint
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Your chart harmonizes the solar vitality of <strong>Sun in {sun?.sign}</strong>, the emotional depth of <strong>Moon in {moon?.sign}</strong>, and the rising presence of <strong>Ascendant in {asc.sign}</strong>.
            </p>

            {/* Absolute Beginner Quick Reference Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', border: '1px solid rgba(250, 204, 21, 0.2)' }}>
                <span style={{ fontSize: '11px', color: '#FACC15', fontWeight: 700, display: 'block' }}>☀️ 1. Core Purpose (Sun)</span>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>{sun?.sign} (House {sun?.house || 1})</span>
                <p style={{ fontSize: '11px', color: '#A79BBF', marginTop: '2px', lineHeight: 1.4 }}>Drives your conscious willpower, professional ambition, and creative vitality.</p>
              </div>

              <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 700, display: 'block' }}>🌙 2. Emotional Instincts (Moon)</span>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>{moon?.sign} (House {moon?.house || 4})</span>
                <p style={{ fontSize: '11px', color: '#A79BBF', marginTop: '2px', lineHeight: 1.4 }}>Governs inner peace, memory, instinctual reactions, and relationship comfort.</p>
              </div>

              <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', border: '1px solid rgba(192, 132, 252, 0.2)' }}>
                <span style={{ fontSize: '11px', color: '#C084FC', fontWeight: 700, display: 'block' }}>🌅 3. Life Path & Persona (Lagna)</span>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>{asc.sign} Rising (House 1)</span>
                <p style={{ fontSize: '11px', color: '#A79BBF', marginTop: '2px', lineHeight: 1.4 }}>Shapes your physical energy, spontaneous presence, and overall path.</p>
              </div>

              <div style={{ padding: '10px 12px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                <span style={{ fontSize: '11px', color: '#34D399', fontWeight: 700, display: 'block' }}>⏳ 4. Active Chapter (Dasha)</span>
                <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>{natalChart.vedic?.currentDasha?.mahadasha || 'Jupiter'} Cycle</span>
                <p style={{ fontSize: '11px', color: '#A79BBF', marginTop: '2px', lineHeight: 1.4 }}>Your active life season guiding what experiences and lessons are unfolding now.</p>
              </div>
            </div>

            {natalChart.vedic && (
              <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(0,0,0,0.25)', borderRadius: 'var(--radius-sm)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Vedic Sidereal Context (Lahiri Ayanamsa)
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Birth Nakshatra: <strong>{natalChart.vedic.birthNakshatra}</strong> (Pada {natalChart.vedic.nakshatraPada}). Currently navigating the Mahadasha of <strong>{natalChart.vedic.currentDasha.mahadasha}</strong> with Antardasha of <strong>{natalChart.vedic.currentDasha.antardasha}</strong>.
                </p>
              </div>
            )}

            <Button
              variant="glass"
              size="md"
              onClick={() => onAskAI('Can you provide an in-depth reading of my entire birth chart synthesis?')}
            >
              <Sparkles size={14} />
              <span>Consult Astrologer for Complete Natal Reading</span>
            </Button>
          </Card>

          <PlacementCards
            placements={natalChart.planets.slice(0, 4)}
            onAskAI={onAskAI}
            selectedPlacement={selectedPlacement}
            onSelectPlacement={setSelectedPlacement}
          />
        </div>
      )}

      {activeTab === 'positions' && (
        <PlacementCards
          placements={natalChart.planets}
          onAskAI={onAskAI}
          selectedPlacement={selectedPlacement}
          onSelectPlacement={setSelectedPlacement}
        />
      )}

      {activeTab === 'aspects' && (
        <AspectsTable aspects={natalChart.aspects} onAskAI={onAskAI} />
      )}

      {activeTab === 'transits' && (
        <TransitsView transits={transits} onAskAI={onAskAI} />
      )}
    </div>
  );
};
