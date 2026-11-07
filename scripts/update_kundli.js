const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'components', 'matching', 'KundliMatchingScreen.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// We want to replace the state handling and card rendering in KundliMatchingScreen.tsx
// Let's create a robust updated version.

const updatedCode = `// Save profile to context and also update state
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
    setSelectedAId(newProf.id);
    setSavedFeedbackA(true);
    setTimeout(() => setSavedFeedbackA(false), 2400);
  };

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
    setSelectedBId(newProf.id);
    setSavedFeedbackB(true);
    setTimeout(() => setSavedFeedbackB(false), 2400);
  };
`;

console.log('Script helper ready');

