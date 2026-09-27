'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BABY_NAMES_DATABASE } from '@/lib/astrology-engine/babynames';
import { BabyNameEntry, ZodiacSignName } from '@/types';
import { useConsultant } from '@/lib/state/consultant-context';
import {
  Search,
  Sparkles,
  Heart,
  Baby,
  Filter,
  Volume2,
  BookOpen,
} from 'lucide-react';

const RASHI_LIST: ZodiacSignName[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const BabyNamesScreen: React.FC = () => {
  const { startSpecialistSession } = useConsultant();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Boy' | 'Girl' | 'Unisex'>('All');
  const [selectedRashi, setSelectedRashi] = useState<string>('All');

  const filteredNames = useMemo(() => {
    return BABY_NAMES_DATABASE.filter((entry) => {
      const matchesGender = selectedGender === 'All' || entry.gender === selectedGender;
      const matchesRashi = selectedRashi === 'All' || entry.rashi === selectedRashi;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        entry.name.toLowerCase().includes(q) ||
        entry.meaning.toLowerCase().includes(q) ||
        entry.startingSound.toLowerCase().includes(q) ||
        entry.nakshatra.toLowerCase().includes(q);

      return matchesGender && matchesRashi && matchesQuery;
    });
  }, [searchQuery, selectedGender, selectedRashi]);

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
                Vedic Naamkaran Directory
              </Badge>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Rashi & Nakshatra Sound Syllables
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Astrological Baby Names Finder
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Find auspicious, culturally authentic Sanskrit names matching traditional birth lunar mansions (Nakshatras) and zodiac signs.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => startSpecialistSession('classic')}
            icon={<Sparkles size={14} color="var(--gold-primary)" />}
          >
            Consult Astrologer on Naamkaran Muhurat
          </Button>
        </div>

        {/* Search & Gender Controls */}
        <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div
            style={{
              flex: 1,
              minWidth: '220px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <Search size={16} color="var(--text-muted)" />
            <input
              placeholder="Search by name, meaning, or sound (e.g. Aarav, Divine, Sha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '13px',
                width: '100%',
              }}
            />
          </div>

          {/* Gender Filter Buttons */}
          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: 'var(--radius-full)' }}>
            {(['All', 'Boy', 'Girl', 'Unisex'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: selectedGender === g ? 'var(--accent-wine)' : 'transparent',
                  color: selectedGender === g ? '#FFFFFF' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Rashi Filter Scroll */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '12px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <button
            onClick={() => setSelectedRashi('All')}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: selectedRashi === 'All' ? 'var(--accent-wine)' : 'rgba(255, 255, 255, 0.05)',
              color: selectedRashi === 'All' ? '#FFFFFF' : 'var(--text-secondary)',
              fontSize: '11.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            All Rashis
          </button>
          {RASHI_LIST.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRashi(r)}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: selectedRashi === r ? 'var(--accent-wine)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedRashi === r ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '11.5px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        Showing <strong>{filteredNames.length}</strong> auspicious names
      </div>

      {/* Baby Names Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
        {filteredNames.map((item) => (
          <Card key={item.id} style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.name}
                </h3>
                <Badge size="sm" variant={item.gender === 'Boy' ? 'gold' : item.gender === 'Girl' ? 'wine' : 'neutral'}>
                  {item.gender}
                </Badge>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--gold-primary)', marginBottom: '6px' }}>
                <Volume2 size={13} />
                <span>Sound: <strong>{item.startingSound}</strong></span>
                <span>•</span>
                <span>{item.rashi}</span>
              </div>

              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '10px' }}>
                &ldquo;{item.meaning}&rdquo;
              </p>
            </div>

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Nakshatra: {item.nakshatra}</span>
              <span>Origin: {item.origin}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
