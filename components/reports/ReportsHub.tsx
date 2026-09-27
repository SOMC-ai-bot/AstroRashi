'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ReportType, AstrologyReport } from '@/types';
import { useAstrology } from '@/lib/state/astrology-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import { generateAstrologyReport } from '@/lib/astrology-engine/reports-engine';
import { ReportViewer } from './ReportViewer';
import {
  FileText,
  Sparkles,
  Heart,
  Briefcase,
  ShieldAlert,
  Clock,
  Gem,
  Calendar,
  Layers,
  Grid,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface ReportCardDef {
  type: ReportType;
  title: string;
  description: string;
  chaptersCount: number;
  icon: React.ReactNode;
  category: 'core' | 'timing' | 'remedy' | 'partner';
  isFree: boolean;
}

const REPORT_CATALOGUE: ReportCardDef[] = [
  {
    type: 'life-insights',
    title: 'Life Insights & Cosmic Blueprint',
    description: 'Comprehensive synthesis of Lagna, Moon sign, planetary yogas, life purpose, and primal triad.',
    chaptersCount: 5,
    icon: <Sparkles size={22} color="var(--gold-primary)" />,
    category: 'core',
    isFree: true,
  },
  {
    type: 'love-marriage',
    title: 'Love, Marriage & Relational Destiny',
    description: 'In-depth analysis of 7th house, Venus, Navamsa D9, spouse archetypes, and marital timing.',
    chaptersCount: 4,
    icon: <Heart size={22} color="var(--gold-primary)" />,
    category: 'partner',
    isFree: false,
  },
  {
    type: 'career-wealth',
    title: 'Career, Dharma & Financial Abundance',
    description: '10th house vocational analysis, 2nd & 11th Dhana Bhavas, business vs job enterprise potential.',
    chaptersCount: 4,
    icon: <Briefcase size={22} color="var(--accent-rose-light)" />,
    category: 'core',
    isFree: false,
  },
  {
    type: 'dosha-analysis',
    title: 'Complete Dosha & Remedial Audit',
    description: 'Mangal Dosha verification, Kaal Sarp variations, Sade Sati phase timing, and Pitra Dosha audit.',
    chaptersCount: 4,
    icon: <ShieldAlert size={22} color="var(--accent-rose-light)" />,
    category: 'remedy',
    isFree: false,
  },
  {
    type: 'dasha-timeline',
    title: '120-Year Vimshottari Dasha Timeline',
    description: 'Sequential analysis of all 9 Mahadashas and active Antardashas mapped across your life journey.',
    chaptersCount: 4,
    icon: <Clock size={22} color="var(--gold-primary)" />,
    category: 'timing',
    isFree: false,
  },
  {
    type: 'remedies-gemstones',
    title: 'Gemstones, Rudraksha & Sacred Mantras',
    description: 'Certified astrological prescriptions with safe wearing rules, weight, metal, and energized mantras.',
    chaptersCount: 3,
    icon: <Gem size={22} color="var(--gold-primary)" />,
    category: 'remedy',
    isFree: false,
  },
  {
    type: 'varshaphala',
    title: 'Varshaphala (Annual Solar Return)',
    description: 'Tajika annual chart evaluation, Muntha analysis, and planetary Lord of the Year forecast.',
    chaptersCount: 3,
    icon: <Calendar size={22} color="var(--accent-rose-light)" />,
    category: 'timing',
    isFree: false,
  },
  {
    type: 'transit-forecast',
    title: 'Planetary Transits (Gochar) Forecast',
    description: 'Major shifts of Saturn, Jupiter, Rahu, and Ketu evaluated against your natal Moon and Ascendant.',
    chaptersCount: 3,
    icon: <Layers size={22} color="var(--gold-primary)" />,
    category: 'timing',
    isFree: false,
  },
  {
    type: 'compatibility',
    title: 'Ashtakoot 36-Point Compatibility Report',
    description: 'Complete 8-koota matrimonial synergy breakdown with Nadi, Bhakoot, and Gana Dosha checks.',
    chaptersCount: 3,
    icon: <Heart size={22} color="var(--accent-rose-light)" />,
    category: 'partner',
    isFree: false,
  },
  {
    type: 'numerology-blueprint',
    title: 'Numerology Blueprint & Lo Shu Grid',
    description: 'Mulank, Bhagyank, Lo Shu 3x3 planes of expression, and name vibration harmony analysis.',
    chaptersCount: 3,
    icon: <Grid size={22} color="var(--gold-primary)" />,
    category: 'core',
    isFree: false,
  },
];

export const ReportsHub: React.FC = () => {
  const { natalChart, activeProfile } = useAstrology();
  const { user } = useAuth();
  const { openUpgradeModal } = useSubscription();

  const [activeReport, setActiveReport] = useState<AstrologyReport | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleGenerate = (def: ReportCardDef) => {
    if (!def.isFree && !user.isPremium) {
      openUpgradeModal(`${def.title} (PDF Report)`);
      return;
    }

    const report = generateAstrologyReport(natalChart, def.type, activeProfile.name);
    setActiveReport(report);
  };

  if (activeReport) {
    return <ReportViewer report={activeReport} onBack={() => setActiveReport(null)} />;
  }

  const filteredReports = REPORT_CATALOGUE.filter((r) => {
    if (selectedFilter === 'all') return true;
    return r.category === selectedFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '90px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(139, 47, 85, 0.25) 0%, rgba(20, 20, 24, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Badge variant="gold" size="sm">
                Evidence-Based Reports
              </Badge>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Active Chart: <strong style={{ color: 'var(--text-primary)' }}>{activeProfile.name}</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Astrological Reports & Deep Insights
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Multi-chapter, citation-grounded dossiers synthesized deterministically from classical Sanskrit texts and ephemeris calculations.
            </p>
          </div>

          {!user.isPremium && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openUpgradeModal('Full Astrological Report Bundle')}
              icon={<Sparkles size={14} color="var(--gold-primary)" />}
            >
              Unlock All Reports (₹199)
            </Button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: 'All 10 Reports' },
            { id: 'core', label: 'Core Blueprints' },
            { id: 'partner', label: 'Love & Marriage' },
            { id: 'timing', label: 'Timelines & Transits' },
            { id: 'remedy', label: 'Doshas & Remedies' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              style={{
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: selectedFilter === cat.id ? 'var(--accent-wine)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedFilter === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: selectedFilter === cat.id ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredReports.map((item) => {
          const isAccessible = item.isFree || user.isPremium;

          return (
            <Card
              key={item.type}
              variant="elevated"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isAccessible
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px dashed rgba(216, 197, 138, 0.3)',
                background: 'linear-gradient(180deg, rgba(27, 27, 30, 0.95) 0%, rgba(20, 20, 24, 0.95) 100%)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>

                  <Badge size="sm" variant={item.isFree ? 'gold' : isAccessible ? 'wine' : 'outline'}>
                    {item.isFree ? 'Free Report' : isAccessible ? 'Unlocked' : 'Pro Report'}
                  </Badge>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '14px' }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--gold-primary)', marginBottom: '16px' }}>
                  <FileText size={13} />
                  <span>{item.chaptersCount} In-Depth Structured Chapters</span>
                </div>
              </div>

              <Button
                variant={isAccessible ? 'primary' : 'outline'}
                fullWidth
                onClick={() => handleGenerate(item)}
                icon={isAccessible ? <FileText size={14} /> : <Lock size={14} color="var(--gold-primary)" />}
              >
                {isAccessible ? 'Generate & View Report' : 'Unlock with Pro (₹199)'}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
