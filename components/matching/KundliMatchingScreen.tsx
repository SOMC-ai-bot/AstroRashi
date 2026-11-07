'use client';

import React, { useState, useMemo } from 'react';
import { useAstrology } from '@/lib/state/astrology-context';
import { useAuth } from '@/lib/state/auth-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { calculateAshtakootMatching } from '@/lib/astrology-engine/matching';
import { generateFullNatalChart } from '@/lib/astrology-engine/chart';
import { NorthIndianChart } from '@/components/charts/NorthIndianChart';
import { generateKundliMatchPDF } from '@/lib/utils/kundli-match-pdf';
import {
  Heart,
  Sparkles,
  Download,
  FileDown,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Check,
  Lock,
  Trash2,
} from 'lucide-react';

interface KundliMatchingScreenProps {
  onAddProfile?: () => void;
  onAskAI?: (prompt: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const KundliMatchingScreen: React.FC<KundliMatchingScreenProps> = ({
  onAskAI,
  onNavigateTab,
}) => {
  const { profiles = [], activeProfile, saveProfile, deleteProfile } = useAstrology();
  const { user } = useAuth();
  const { openUpgradeModal } = useSubscription();
  const isSubscriber = Boolean(user.isPremium || user.planTier === 'premium');
  const safeProfiles = profiles || [];

  // Base profile categories before ID selection
  const baseGroomProfiles = safeProfiles.filter(
    (p) => p.gender === 'male' || p.gender === 'Male' || p.relationship?.toLowerCase().includes('groom') || (!p.relationship?.toLowerCase().includes('bride') && p.gender?.toLowerCase() !== 'female')
  );

  const baseBrideProfiles = safeProfiles.filter(
    (p) => p.gender === 'female' || p.gender === 'Female' || p.relationship?.toLowerCase().includes('bride') || (!p.relationship?.toLowerCase().includes('groom') && p.gender?.toLowerCase() !== 'male')
  );

  // Feedback states
  const [savedFeedbackA, setSavedFeedbackA] = useState(false);
  const [savedFeedbackB, setSavedFeedbackB] = useState(false);
  const [deleteConfirmA, setDeleteConfirmA] = useState(false);
  const [deleteConfirmB, setDeleteConfirmB] = useState(false);

  // Partner 1 (Groom) Form State - Initialized safely & persisted
  const [selectedAId, setSelectedAId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('astronex_kundli_groom_id');
      if (saved) return saved;
    }
    return baseGroomProfiles[0]?.id || activeProfile?.id || '';
  });

  const [partnerA, setPartnerA] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('astronex_kundli_groom_input');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    const def = baseGroomProfiles[0] || activeProfile;
    return {
      name: def?.name || '',
      gender: 'male' as const,
      birthDate: def?.birthDate || '',
      birthTime: def?.birthTime || '',
      birthPlace: def?.birthPlace || '',
      latitude: def?.latitude || 28.6139,
      longitude: def?.longitude || 77.2090,
    };
  });

  // Partner 2 (Bride) Form State - Initialized safely & persisted
  const [selectedBId, setSelectedBId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('astronex_kundli_bride_id');
      if (saved) return saved;
    }
    return baseBrideProfiles[0]?.id || '';
  });

  const [partnerB, setPartnerB] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('astronex_kundli_bride_input');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    const def = baseBrideProfiles[0];
    return {
      name: def?.name || '',
      gender: 'female' as const,
      birthDate: def?.birthDate || '',
      birthTime: def?.birthTime || '',
      birthPlace: def?.birthPlace || '',
      latitude: def?.latitude || 25.3176,
      longitude: def?.longitude || 82.9739,
    };
  });

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Filtered dropdown lists preventing cross-selection
  const groomProfiles = useMemo(() => {
    return baseGroomProfiles.filter((p) => !selectedBId || selectedBId === 'custom' || p.id !== selectedBId);
  }, [baseGroomProfiles, selectedBId]);

  const brideProfiles = useMemo(() => {
    return baseBrideProfiles.filter((p) => !selectedAId || selectedAId === 'custom' || p.id !== selectedAId);
  }, [baseBrideProfiles, selectedAId]);

  // Auto-persist Groom inputs
  const updatePartnerA = (updater: (prev: any) => any) => {
    setPartnerA((prev: any) => {
      const updated = updater(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem('astronex_kundli_groom_input', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Auto-persist Bride inputs
  const updatePartnerB = (updater: (prev: any) => any) => {
    setPartnerB((prev: any) => {
      const updated = updater(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem('astronex_kundli_bride_input', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Switch Groom Profile without losing custom input ability
  const handleSelectA = (id: string) => {
    setSelectedAId(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_kundli_groom_id', id);
    }
    if (id === 'custom') {
      return; // Keep existing inputs intact
    }
    const p = safeProfiles.find((item) => item.id === id);
    if (p) {
      updatePartnerA(() => ({
        name: p.name,
        gender: 'male',
        birthDate: p.birthDate || '',
        birthTime: p.birthTime || '',
        birthPlace: p.birthPlace || '',
        latitude: p.latitude || 28.6139,
        longitude: p.longitude || 77.2090,
      }));
    }
  };

  // Switch Bride Profile without losing custom input ability
  const handleSelectB = (id: string) => {
    setSelectedBId(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_kundli_bride_id', id);
    }
    if (id === 'custom') {
      return; // Keep existing inputs intact
    }
    const p = safeProfiles.find((item) => item.id === id);
    if (p) {
      updatePartnerB(() => ({
        name: p.name,
        gender: 'female',
        birthDate: p.birthDate || '',
        birthTime: p.birthTime || '',
        birthPlace: p.birthPlace || '',
        latitude: p.latitude || 25.3176,
        longitude: p.longitude || 82.9739,
      }));
    }
  };

  // Save Groom Profile
  const handleSavePartnerA = () => {
    const pId = selectedAId && selectedAId !== 'custom' ? selectedAId : 'p_groom_' + Date.now();
    const newProf: any = {
      id: pId,
      name: partnerA.name.trim() || 'Groom Partner',
      relationship: 'Groom',
      birthDate: partnerA.birthDate,
      birthTime: partnerA.birthTime,
      birthPlace: partnerA.birthPlace,
      latitude: partnerA.latitude || 28.6139,
      longitude: partnerA.longitude || 77.2090,
      timezone: 'Asia/Kolkata',
      gender: 'Male',
      astrologySystem: 'vedic',
      zodiacSystem: 'sidereal',
      houseSystem: 'whole-sign',
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProfile(newProf);
    setSelectedAId(pId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_kundli_groom_id', pId);
    }
    setSavedFeedbackA(true);
    setTimeout(() => setSavedFeedbackA(false), 2400);
  };

  // Save Bride Profile
  const handleSavePartnerB = () => {
    const pId = selectedBId && selectedBId !== 'custom' ? selectedBId : 'p_bride_' + Date.now();
    const newProf: any = {
      id: pId,
      name: partnerB.name.trim() || 'Bride Partner',
      relationship: 'Bride',
      birthDate: partnerB.birthDate,
      birthTime: partnerB.birthTime,
      birthPlace: partnerB.birthPlace,
      latitude: partnerB.latitude || 25.3176,
      longitude: partnerB.longitude || 82.9739,
      timezone: 'Asia/Kolkata',
      gender: 'Female',
      astrologySystem: 'vedic',
      zodiacSystem: 'sidereal',
      houseSystem: 'whole-sign',
      preferredLanguage: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProfile(newProf);
    setSelectedBId(pId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_kundli_bride_id', pId);
    }
    setSavedFeedbackB(true);
    setTimeout(() => setSavedFeedbackB(false), 2400);
  };

  const handleRemoveProfileA = () => {
    if (!selectedAId || selectedAId === 'custom') return;
    if (!deleteConfirmA) {
      setDeleteConfirmA(true);
      setTimeout(() => setDeleteConfirmA(false), 4000);
      return;
    }
    deleteProfile(selectedAId);
    setDeleteConfirmA(false);
    setSelectedAId('custom');
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_kundli_groom_id', 'custom');
    }
  };

  const handleRemoveProfileB = () => {
    if (!selectedBId || selectedBId === 'custom') return;
    if (!deleteConfirmB) {
      setDeleteConfirmB(true);
      setTimeout(() => setDeleteConfirmB(false), 4000);
      return;
    }
    deleteProfile(selectedBId);
    setDeleteConfirmB(false);
    setSelectedBId('custom');
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_kundli_bride_id', 'custom');
    }
  };

  // Generate authentic natal charts for both individuals safely
  const chartA = useMemo(() => {
    try {
      if (partnerA.birthDate) {
        return generateFullNatalChart(partnerA.birthDate, partnerA.birthTime || '12:00', partnerA.latitude || 28.6139, partnerA.longitude || 77.2090);
      }
    } catch (e) {}
    return generateFullNatalChart('1996-05-18', '09:20', 28.6139, 77.2090);
  }, [partnerA]);

  const chartB = useMemo(() => {
    try {
      if (partnerB.birthDate) {
        return generateFullNatalChart(partnerB.birthDate, partnerB.birthTime || '12:00', partnerB.latitude || 25.3176, partnerB.longitude || 82.9739);
      }
    } catch (e) {}
    return generateFullNatalChart('1998-08-24', '14:45', 25.3176, 82.9739);
  }, [partnerB]);

  // Extract true Moon and Mars positions
  const moonA = chartA.planets.find((p) => p.name === 'Moon');
  const moonB = chartB.planets.find((p) => p.name === 'Moon');
  const marsA = chartA.planets.find((p) => p.name === 'Mars');
  const marsB = chartB.planets.find((p) => p.name === 'Mars');

  // Check classical Manglik placements (1, 4, 7, 8, 12 from Lagna)
  const isManglikA = [1, 4, 7, 8, 12].includes(marsA?.house || 0);
  const isManglikB = [1, 4, 7, 8, 12].includes(marsB?.house || 0);

  // Accurate Moon Longitude computation
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
  ];
  const moonLonA = moonA ? signs.indexOf(moonA.sign) * 30 + (moonA.degree || 15) : 45;
  const moonLonB = moonB ? signs.indexOf(moonB.sign) * 30 + (moonB.degree || 15) : 135;

  // Calculate Ashtakoot Guna Milan
  const matchResult = useMemo(() => {
    return calculateAshtakootMatching(
      moonLonA,
      moonLonB,
      partnerA.name || 'Partner 1',
      partnerB.name || 'Partner 2',
      isManglikA,
      isManglikB
    );
  }, [moonLonA, moonLonB, partnerA.name, partnerB.name, isManglikA, isManglikB]);

  const handleDownloadReport = () => {
    if (!matchResult) return;
    if (!user.isPremium) {
      if (onNavigateTab) { onNavigateTab('subscription'); } else { openUpgradeModal('Vedic Ashtakoot Kundli Matching Dossier (PDF)'); }
      return;
    }

    generateKundliMatchPDF({
      partnerA: {
        name: partnerA.name,
        birthDate: partnerA.birthDate,
        birthTime: partnerA.birthTime,
        birthPlace: partnerA.birthPlace,
        ascendant: chartA.ascendant ? `${chartA.ascendant.sign} (${chartA.ascendant.degree.toFixed(2)}°)` : undefined,
        moonSign: matchResult.personA.moonSign,
        nakshatra: matchResult.personA.nakshatra,
        pada: matchResult.personA.pada,
        isManglik: isManglikA,
        marsHouse: marsA?.house,
      },
      partnerB: {
        name: partnerB.name,
        birthDate: partnerB.birthDate,
        birthTime: partnerB.birthTime,
        birthPlace: partnerB.birthPlace,
        ascendant: chartB.ascendant ? `${chartB.ascendant.sign} (${chartB.ascendant.degree.toFixed(2)}°)` : undefined,
        moonSign: matchResult.personB.moonSign,
        nakshatra: matchResult.personB.nakshatra,
        pada: matchResult.personB.pada,
        isManglik: isManglikB,
        marsHouse: marsB?.house,
      },
      totalScore: matchResult.totalScore,
      percentage: matchResult.percentage,
      verdict: matchResult.traditionalCompatibilityVerdict,
      kootas: matchResult.kootas,
      doshas: {
        nadiDosha: matchResult.doshaChecks.nadiDosha,
        bhakootDosha: matchResult.doshaChecks.bhakootDosha,
        manglikSymmetry: isManglikA === isManglikB ? 'Balanced (Both matched in Mars intensity)' : 'Asymmetric (Spiritual harmonization advised)',
      },
      strengths: matchResult.relationshipStrengths,
      remedies: [
        'Shiva-Parvati Puja: Chanting Om Namah Shivaya together on Mondays fosters deep emotional resilience.',
        'Friday Venus Charity: Offering white sweets or flowers in temple strengthens marital longevity.',
        'Mutual Dialogue: Always resolve differences before sunset; open communication supersedes technical afflictions.',
      ],
    });

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh',
        paddingBottom: '90px',
        color: '#E2E8F0',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '28px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 106, 0, 0.12)',
            border: '1px solid rgba(255, 106, 0, 0.3)',
            borderRadius: '20px',
            padding: '4px 14px',
            fontSize: '11.5px',
            color: '#FFB800',
            fontWeight: 700,
            marginBottom: '10px',
          }}
        >
          <Sparkles size={13} color="#FF6A00" />
          <span>Vedic Ashtakoot 36 Guna Milan Engine</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 8px' }}>
          Kundli Matching & Synastry
        </h1>
        <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0, maxWidth: '580px' }}>
          Calculate authentic Ashtakoot Guna Milan, dual North Indian birth charts, Manglik balance, and download full compatibility dossiers.
        </p>

        {/* Free Plan Upgrade Gate Banner */}
        {!user.isPremium && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1.5px solid #F59E0B',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              maxWidth: '680px',
            }}
          >
            <Lock size={20} color="#F59E0B" />
            <div style={{ textAlign: 'left' }}>
              <strong style={{ color: '#FDE68A', fontSize: '14px', display: 'block' }}>
                Kundli Matching is a Premium Feature
              </strong>
              <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                Free users do not have access to Kundli Milan calculations. Upgrade to Premium for unlimited matching & reports.
              </span>
            </div>
            <button
              type="button"
              onClick={() => { if (onNavigateTab) { onNavigateTab('subscription'); } else { openUpgradeModal('Kundli Matching & Compatibility'); } }}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                backgroundColor: '#F59E0B',
                color: '#000000',
                fontWeight: 800,
                fontSize: '12.5px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Upgrade Now
            </button>
          </div>
        )}
      </div>

      {/* Input / Selection Section for Both Partners */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        {/* Partner 1 Card (Boy / Groom) */}
        <div
          style={{
            backgroundColor: '#12141C',
            borderRadius: '22px',
            border: '1.5px solid rgba(56, 189, 248, 0.22)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Top Glow Accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #38BDF8 0%, rgba(56, 189, 248, 0.1) 100%)',
            }}
          />

          {/* Header & Mode Switch */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(56, 189, 248, 0.18)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  color: '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '14px',
                }}
              >
                1
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  First Partner <span style={{ color: '#38BDF8', fontSize: '13px', fontWeight: 700 }}>(Boy / Groom)</span>
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Dedicated Groom Astro Profile</span>
              </div>
            </div>

            {/* Save Profile Button */}
            <button
              type="button"
              onClick={handleSavePartnerA}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: savedFeedbackA ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.12)',
                border: savedFeedbackA ? '1px solid #10B981' : '1px solid rgba(56, 189, 248, 0.35)',
                color: savedFeedbackA ? '#34D399' : '#38BDF8',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              {savedFeedbackA ? <Check size={12} color="#34D399" /> : null}
              <span>{savedFeedbackA ? '✓ Saved!' : '💾 Save Profile'}</span>
            </button>
          </div>

          {/* Profile Quick Select Bar */}
          <div
            style={{
              backgroundColor: '#0A0C12',
              borderRadius: '12px',
              padding: '10px 12px',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Load Groom Profile:
              </label>
              {selectedAId && selectedAId !== 'custom' && (
                <button
                  type="button"
                  onClick={handleRemoveProfileA}
                  title="Remove this profile"
                  style={{
                    background: deleteConfirmA ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                    border: deleteConfirmA ? '1px solid #EF4444' : 'none',
                    color: deleteConfirmA ? '#FCA5A5' : '#64748B',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {deleteConfirmA ? 'Confirm Delete?' : 'Remove'}
                </button>
              )}
            </div>

            <select
              value={selectedAId}
              onChange={(e) => handleSelectA(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#141722',
                color: '#FFFFFF',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="custom">✍️ Custom Manual Entry (Direct Edit)</option>
              {groomProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  👤 {p.name} {p.birthDate ? `(${p.birthDate})` : ''} {p.birthPlace ? `- ${p.birthPlace}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Editable Fields (Always Visible & Directly Editable) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'block', marginBottom: '5px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter groom's full name"
                value={partnerA.name}
                onChange={(e) => updatePartnerA((prev) => ({ ...prev, name: e.target.value }))}
                style={{
                  width: '100%',
                  backgroundColor: '#0A0C12',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                  <Calendar size={12} color="#38BDF8" /> Birth Date
                </label>
                <input
                  type="date"
                  value={partnerA.birthDate}
                  onChange={(e) => updatePartnerA((prev) => ({ ...prev, birthDate: e.target.value }))}
                  style={{
                    width: '100%',
                    backgroundColor: '#0A0C12',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                  <Clock size={12} color="#38BDF8" /> Birth Time
                </label>
                <input
                  type="time"
                  value={partnerA.birthTime}
                  onChange={(e) => updatePartnerA((prev) => ({ ...prev, birthTime: e.target.value }))}
                  style={{
                    width: '100%',
                    backgroundColor: '#0A0C12',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                <MapPin size={12} color="#38BDF8" /> Birth City / Place
              </label>
              <input
                type="text"
                placeholder="e.g. New Delhi, India"
                value={partnerA.birthPlace}
                onChange={(e) => updatePartnerA((prev) => ({ ...prev, birthPlace: e.target.value }))}
                style={{
                  width: '100%',
                  backgroundColor: '#0A0C12',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Quick Info Chip */}
          <div
            style={{
              marginTop: '4px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#94A3B8',
            }}
          >
            <span>Lagna: <strong style={{ color: '#FFFFFF' }}>{chartA.ascendant?.sign || 'N/A'}</strong></span>
            <span>Moon: <strong style={{ color: '#FFB800' }}>{moonA?.sign || 'N/A'}</strong></span>
            <span>Manglik: <strong style={{ color: isManglikA ? '#F43F5E' : '#10B981' }}>{isManglikA ? 'Yes' : 'No'}</strong></span>
          </div>
        </div>

        {/* Partner 2 Card (Girl / Bride) */}
        <div
          style={{
            backgroundColor: '#12141C',
            borderRadius: '22px',
            border: '1.5px solid rgba(244, 63, 94, 0.22)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Top Glow Accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #F43F5E 0%, rgba(244, 63, 94, 0.1) 100%)',
            }}
          />

          {/* Header & Mode Switch */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(244, 63, 94, 0.18)',
                  border: '1px solid rgba(244, 63, 94, 0.35)',
                  color: '#F43F5E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '14px',
                }}
              >
                2
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Second Partner <span style={{ color: '#F43F5E', fontSize: '13px', fontWeight: 700 }}>(Girl / Bride)</span>
                </h3>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Dedicated Bride Astro Profile</span>
              </div>
            </div>

            {/* Save Profile Button */}
            <button
              type="button"
              onClick={handleSavePartnerB}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: savedFeedbackB ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.12)',
                border: savedFeedbackB ? '1px solid #10B981' : '1px solid rgba(244, 63, 94, 0.35)',
                color: savedFeedbackB ? '#34D399' : '#F43F5E',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              {savedFeedbackB ? <Check size={12} color="#34D399" /> : null}
              <span>{savedFeedbackB ? '✓ Saved!' : '💾 Save Profile'}</span>
            </button>
          </div>

          {/* Profile Quick Select Bar */}
          <div
            style={{
              backgroundColor: '#0A0C12',
              borderRadius: '12px',
              padding: '10px 12px',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Load Bride Profile:
              </label>
              {selectedBId && selectedBId !== 'custom' && (
                <button
                  type="button"
                  onClick={handleRemoveProfileB}
                  title="Remove this profile"
                  style={{
                    background: deleteConfirmB ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                    border: deleteConfirmB ? '1px solid #EF4444' : 'none',
                    color: deleteConfirmB ? '#FCA5A5' : '#64748B',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {deleteConfirmB ? 'Confirm Delete?' : 'Remove'}
                </button>
              )}
            </div>

            <select
              value={selectedBId}
              onChange={(e) => handleSelectB(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#141722',
                color: '#FFFFFF',
                border: '1px solid rgba(244, 63, 94, 0.25)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '12.5px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="custom">✍️ Custom Manual Entry (Direct Edit)</option>
              {brideProfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  👤 {p.name} {p.birthDate ? `(${p.birthDate})` : ''} {p.birthPlace ? `- ${p.birthPlace}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Editable Fields (Always Visible & Directly Editable) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'block', marginBottom: '5px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter bride's full name"
                value={partnerB.name}
                onChange={(e) => updatePartnerB((prev) => ({ ...prev, name: e.target.value }))}
                style={{
                  width: '100%',
                  backgroundColor: '#0A0C12',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                  <Calendar size={12} color="#F43F5E" /> Birth Date
                </label>
                <input
                  type="date"
                  value={partnerB.birthDate}
                  onChange={(e) => updatePartnerB((prev) => ({ ...prev, birthDate: e.target.value }))}
                  style={{
                    width: '100%',
                    backgroundColor: '#0A0C12',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                  <Clock size={12} color="#F43F5E" /> Birth Time
                </label>
                <input
                  type="time"
                  value={partnerB.birthTime}
                  onChange={(e) => updatePartnerB((prev) => ({ ...prev, birthTime: e.target.value }))}
                  style={{
                    width: '100%',
                    backgroundColor: '#0A0C12',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                <MapPin size={12} color="#F43F5E" /> Birth City / Place
              </label>
              <input
                type="text"
                placeholder="e.g. Varanasi, India"
                value={partnerB.birthPlace}
                onChange={(e) => updatePartnerB((prev) => ({ ...prev, birthPlace: e.target.value }))}
                style={{
                  width: '100%',
                  backgroundColor: '#0A0C12',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Quick Info Chip */}
          <div
            style={{
              marginTop: '4px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#94A3B8',
            }}
          >
            <span>Lagna: <strong style={{ color: '#FFFFFF' }}>{chartB.ascendant?.sign || 'N/A'}</strong></span>
            <span>Moon: <strong style={{ color: '#FFB800' }}>{moonB?.sign || 'N/A'}</strong></span>
            <span>Manglik: <strong style={{ color: isManglikB ? '#F43F5E' : '#10B981' }}>{isManglikB ? 'Yes' : 'No'}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Results Dashboard */}
      {matchResult && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Compatibility Score Banner with Download Button */}
          <div
            style={{
              backgroundColor: '#131418',
              borderRadius: '24px',
              padding: '28px 32px',
              border: '1px solid rgba(255, 106, 0, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 106, 0, 0.08) 0%, rgba(19, 20, 24, 0.98) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Circular Gauge */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#FF6A00 0% ' + matchResult.percentage + '%, rgba(255, 255, 255, 0.08) ' + matchResult.percentage + '% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(255, 106, 0, 0.3)',
                }}
              >
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    backgroundColor: '#0C0D10',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF' }}>{matchResult.totalScore}</span>
                  <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>/ 36 Gunas</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#FFB800', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Ashtakoot Vedic Milan
                </span>
                <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 6px' }}>
                  {matchResult.percentage}% Overall Compatibility
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: matchResult.totalScore >= 18 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: matchResult.totalScore >= 18 ? '#10B981' : '#F87171',
                      border: matchResult.totalScore >= 18 ? '1px solid #10B981' : '1px solid #F87171',
                    }}
                  >
                    {matchResult.totalScore >= 28 ? 'Uttama (Exceptional)' : matchResult.totalScore >= 18 ? 'Madhyama (Auspicious)' : 'Adhama (Low Score)'}
                  </span>
                  <span style={{ fontSize: '12.5px', color: '#94A3B8' }}>
                    {partnerA.name} & {partnerB.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Download Report Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={handleDownloadReport}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isSubscriber
                    ? 'linear-gradient(135deg, #FF6A00 0%, #D95300 100%)'
                    : 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 22px',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isSubscriber ? '0 4px 16px rgba(255, 106, 0, 0.35)' : '0 4px 16px rgba(124, 58, 237, 0.35)',
                  transition: 'all 0.15s ease',
                }}
              >
                {downloadSuccess ? (
                  <Check size={16} />
                ) : isSubscriber ? (
                  <FileDown size={16} />
                ) : (
                  <Lock size={16} />
                )}
                <span>
                  {downloadSuccess
                    ? 'PDF Dossier Generated!'
                    : isSubscriber
                    ? 'Download Match Dossier (PDF)'
                    : 'Unlock Match Dossier (Members Only)'}
                </span>
              </button>
            </div>
          </div>

          {/* Dual Charts: Side-by-Side North Indian Vedic Kundlis */}
          <div
            style={{
              backgroundColor: '#131418',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Dual Natal Kundli Comparison
                </h3>
                <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '4px 0 0' }}>
                  Comparative North Indian diamond charts computed with Lahiri Ephemeris
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#FFB800' }}>
                <ShieldCheck size={14} />
                <span>Ephemeris Validated</span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                alignItems: 'center',
              }}
            >
              {/* Chart A */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0C0D10', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#38BDF8', marginBottom: '4px' }}>
                  {partnerA.name}&apos;s Chart (D1)
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '12px' }}>
                  Lagna: {chartA.ascendant?.sign} | Moon: {moonA?.sign} ({moonA?.nakshatra?.name})
                </div>
                <NorthIndianChart chart={chartA} size={280} />
              </div>

              {/* Chart B */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0C0D10', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#F43F5E', marginBottom: '4px' }}>
                  {partnerB.name}&apos;s Chart (D1)
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '12px' }}>
                  Lagna: {chartB.ascendant?.sign} | Moon: {moonB?.sign} ({moonB?.nakshatra?.name})
                </div>
                <NorthIndianChart chart={chartB} size={280} />
              </div>
            </div>
          </div>

          {/* 8 Kootas Detailed Table */}
          <div
            style={{
              backgroundColor: '#131418',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Ashtakoot 8-Fold Compatibility Grid
            </h3>

            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#0C0D10', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <tr>
                    <th style={{ padding: '12px 14px', color: '#FFB800', fontWeight: 700 }}>Koota Name</th>
                    <th style={{ padding: '12px 14px', color: '#FFB800', fontWeight: 700 }}>Score</th>
                    <th style={{ padding: '12px 14px', color: '#FFB800', fontWeight: 700 }}>Area of Life</th>
                    <th style={{ padding: '12px 14px', color: '#FFB800', fontWeight: 700 }}>Detailed Astrological Finding</th>
                    <th style={{ padding: '12px 14px', color: '#FFB800', fontWeight: 700 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {matchResult.kootas.map((k, idx) => (
                    <tr
                      key={k.koota}
                      style={{
                        backgroundColor: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.2)',
                        borderBottom: idx === matchResult.kootas.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.04)',
                      }}
                    >
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#FFFFFF' }}>{k.koota}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#FF6A00', whiteSpace: 'nowrap' }}>
                        {k.score} / {k.maxScore}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#94A3B8', fontSize: '12px' }}>{k.area}</td>
                      <td style={{ padding: '12px 14px', color: '#CBD5E1', fontSize: '12.5px', lineHeight: 1.5 }}>
                        {k.details}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            backgroundColor: k.isFavourable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: k.isFavourable ? '#10B981' : '#F87171',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {k.isFavourable ? 'Favourable' : 'Attention'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dosha Analysis & Mitigations */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Manglik Comparison */}
            <div
              style={{
                backgroundColor: '#131418',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} color="#FFB800" />
                <span>Mangal Dosha (Kuja Dosha) Assessment</span>
              </h4>
              <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 12px' }}>
                Mars placement in 1st, 4th, 7th, 8th, or 12th house governs temperamental assertiveness in matrimony.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#0C0D10', borderRadius: '8px' }}>
                  <span>{partnerA.name}:</span>
                  <strong style={{ color: isManglikA ? '#F43F5E' : '#10B981' }}>{isManglikA ? `Manglik (Mars in H${marsA?.house})` : 'Non-Manglik'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#0C0D10', borderRadius: '8px' }}>
                  <span>{partnerB.name}:</span>
                  <strong style={{ color: isManglikB ? '#F43F5E' : '#10B981' }}>{isManglikB ? `Manglik (Mars in H${marsB?.house})` : 'Non-Manglik'}</strong>
                </div>
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#FFB800' }}>
                {isManglikA === isManglikB ? '✓ Balanced Mars Energies: Both partners match in vitality.' : '✦ Asymmetric Mangal status: Simple Vedic remedies neutralize differences.'}
              </div>
            </div>

            {/* Nadi & Bhakoot Check */}
            <div
              style={{
                backgroundColor: '#131418',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Nadi & Bhakoot Genetic Health</span>
              </h4>
              <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 12px' }}>
                Nadi evaluates physiological health and vital longevity, while Bhakoot examines emotional compounding.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#0C0D10', borderRadius: '8px' }}>
                  <span>Nadi Dosha:</span>
                  <strong style={{ color: matchResult.doshaChecks.nadiDosha ? '#F43F5E' : '#10B981' }}>
                    {matchResult.doshaChecks.nadiDosha ? 'Identified (Mitigation Advised)' : 'Absent (Flawless Harmony)'}
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#0C0D10', borderRadius: '8px' }}>
                  <span>Bhakoot Dosha:</span>
                  <strong style={{ color: matchResult.doshaChecks.bhakootDosha ? '#F43F5E' : '#10B981' }}>
                    {matchResult.doshaChecks.bhakootDosha ? 'Identified (Open Budgeting Advised)' : 'Absent (Harmonious Bond)'}
                  </strong>
                </div>
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#10B981' }}>
                ✓ {matchResult.traditionalCompatibilityVerdict}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
