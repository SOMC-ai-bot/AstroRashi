const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'matching', 'KundliMatchingScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find start of KundliMatchingScreen component body up to handleDownloadReport
const startMarker = "export const KundliMatchingScreen: React.FC<KundliMatchingScreenProps> = ({";
const endMarker = "  const handleDownloadReport = () => {";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found!");
  process.exit(1);
}

const newComponentSetup = `export const KundliMatchingScreen: React.FC<KundliMatchingScreenProps> = ({
  onAskAI,
  onNavigateTab,
}) => {
  const { profiles = [], activeProfile, saveProfile, deleteProfile } = useAstrology();
  const { user } = useAuth();
  const { openUpgradeModal } = useSubscription();
  const safeProfiles = profiles || [];

  // Groom profiles: only male / groom or not bride
  const groomProfiles = safeProfiles.filter(
    (p) => p.gender === 'male' || p.relationship?.toLowerCase().includes('groom') || (!p.relationship?.toLowerCase().includes('bride') && p.gender !== 'female')
  );

  // Bride profiles: only female / bride or not groom
  const brideProfiles = safeProfiles.filter(
    (p) => p.gender === 'female' || p.relationship?.toLowerCase().includes('bride') || (!p.relationship?.toLowerCase().includes('groom') && p.gender !== 'male')
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
    return groomProfiles[0]?.id || activeProfile?.id || '';
  });

  const [partnerA, setPartnerA] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('astronex_kundli_groom_input');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    const def = groomProfiles[0] || activeProfile;
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
    return brideProfiles[0]?.id || '';
  });

  const [partnerB, setPartnerB] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('astronex_kundli_bride_input');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    const def = brideProfiles[0];
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

  // Auto-persist Groom inputs
  const updatePartnerA = (updater: (prev: typeof partnerA) => typeof partnerA) => {
    setPartnerA((prev) => {
      const updated = updater(prev);
      if (typeof window !== 'undefined') {
        localStorage.setItem('astronex_kundli_groom_input', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Auto-persist Bride inputs
  const updatePartnerB = (updater: (prev: typeof partnerB) => typeof partnerB) => {
    setPartnerB((prev) => {
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
    const newProf = {
      id: pId,
      name: partnerA.name.trim() || 'Groom Partner',
      relationship: 'Groom',
      birthDate: partnerA.birthDate,
      birthTime: partnerA.birthTime,
      birthPlace: partnerA.birthPlace,
      latitude: partnerA.latitude || 28.6139,
      longitude: partnerA.longitude || 77.2090,
      gender: 'male' as const,
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
    const newProf = {
      id: pId,
      name: partnerB.name.trim() || 'Bride Partner',
      relationship: 'Bride',
      birthDate: partnerB.birthDate,
      birthTime: partnerB.birthTime,
      birthPlace: partnerB.birthPlace,
      latitude: partnerB.latitude || 25.3176,
      longitude: partnerB.longitude || 82.9739,
      gender: 'female' as const,
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

`;

content = content.slice(0, startIndex) + newComponentSetup + content.slice(endIndex);

// Now let's replace the render of input cards: from {/* Input / Selection Section for Both Partners */} down to {/* Main Results Dashboard */}
const cardStartMarker = "{/* Input / Selection Section for Both Partners */}";
const cardEndMarker = "{/* Main Results Dashboard */}";

const cardStartIndex = content.indexOf(cardStartMarker);
const cardEndIndex = content.indexOf(cardEndMarker);

if (cardStartIndex === -1 || cardEndIndex === -1) {
  console.error("Card markers not found!");
  process.exit(1);
}

const newCardSection = `{\/* Input / Selection Section for Both Partners *\/}
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
                  👤 {p.name} {p.birthDate ? \`(\${p.birthDate})\` : ''} {p.birthPlace ? \`- \${p.birthPlace}\` : ''}
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
                  👤 {p.name} {p.birthDate ? \`(\${p.birthDate})\` : ''} {p.birthPlace ? \`- \${p.birthPlace}\` : ''}
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

      `;

content = content.slice(0, cardStartIndex) + newCardSection + content.slice(cardEndIndex);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated KundliMatchingScreen.tsx');

