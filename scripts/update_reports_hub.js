const fs = require('fs');

let code = fs.readFileSync('components/reports/ReportsHub.tsx', 'utf8').replace(/\r\n/g, '\n');

// 1. In seed default reports:
const oldSeed = `      // Seed default baseline reports
      const defaultBlueprint = generateAstrologyReport(natalChart, 'life-insights', activeProfile.name);
      const defaultTransit = generateAstrologyReport(natalChart, 'varshaphala', activeProfile.name);`;

const newSeed = `      // Seed default baseline reports
      const effectiveName = user?.name || activeProfile?.name || 'Cosmic Seeker';
      const defaultBlueprint = generateAstrologyReport(natalChart, 'life-insights', effectiveName);
      const defaultTransit = generateAstrologyReport(natalChart, 'varshaphala', effectiveName);`;

if (code.includes(oldSeed)) {
  code = code.replace(oldSeed, newSeed);
  console.log('SUCCESS: ReportsHub seed updated');
} else {
  console.log('oldSeed not found');
}

// 2. In useEffect dependency array:
code = code.replace(
  '}, [natalChart, activeProfile.name]);',
  '}, [natalChart, activeProfile?.name, user?.name]);'
);

// 3. In handleGenerate:
const oldGen = `    const report = generateAstrologyReport(natalChart, def.type, activeProfile.name);`;
const newGen = `    const effectiveName = user?.name || activeProfile?.name || 'Cosmic Seeker';
    const report = generateAstrologyReport(natalChart, def.type, effectiveName);`;

if (code.includes(oldGen)) {
  code = code.replace(oldGen, newGen);
  console.log('SUCCESS: ReportsHub handleGenerate updated');
} else {
  console.log('oldGen not found');
}

// 4. In header banner:
const oldBanner = `Active Chart: <strong style={{ color: 'var(--text-primary)' }}>{activeProfile.name}</strong>`;
const newBanner = `Active Chart: <strong style={{ color: 'var(--text-primary)' }}>{user?.name || activeProfile?.name}</strong>`;

if (code.includes(oldBanner)) {
  code = code.replace(oldBanner, newBanner);
  console.log('SUCCESS: ReportsHub header banner updated');
} else {
  console.log('oldBanner not found');
}

// 5. In card display:
const oldCardDisplay = `<span style={{ color: '#FACC15', fontWeight: 650 }}>{report.profileName || activeProfile.name}</span>`;
const newCardDisplay = `<span style={{ color: '#FACC15', fontWeight: 650 }}>{report.profileName || user?.name || activeProfile?.name}</span>`;

if (code.includes(oldCardDisplay)) {
  code = code.replace(oldCardDisplay, newCardDisplay);
  console.log('SUCCESS: ReportsHub card display updated');
} else {
  console.log('oldCardDisplay not found');
}

fs.writeFileSync('components/reports/ReportsHub.tsx', code, 'utf8');

