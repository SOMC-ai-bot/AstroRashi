import { VimshottariDashaData } from '@/types';
import { getNakshatraFromLongitude } from './nakshatra';

export interface DashaLordConfig {
  lord: string;
  durationYears: number;
}

export const VIMSHOTTARI_CYCLE: DashaLordConfig[] = [
  { lord: 'Ketu', durationYears: 7 },
  { lord: 'Venus', durationYears: 20 },
  { lord: 'Sun', durationYears: 6 },
  { lord: 'Moon', durationYears: 10 },
  { lord: 'Mars', durationYears: 7 },
  { lord: 'Rahu', durationYears: 18 },
  { lord: 'Jupiter', durationYears: 16 },
  { lord: 'Saturn', durationYears: 19 },
  { lord: 'Mercury', durationYears: 17 },
];

function addYearsToDate(date: Date, years: number): Date {
  const d = new Date(date);
  const ms = years * 365.2425 * 86400000;
  return new Date(d.getTime() + ms);
}

function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function calculateVimshottariDasha(
  moonLongitude: number,
  birthDate: Date,
  referenceDate: Date = new Date()
): VimshottariDashaData {
  const nakData = getNakshatraFromLongitude(moonLongitude);
  const birthLord = nakData.nakshatra.lord;

  // Find index of starting lord in Vimshottari sequence
  const startIndex = VIMSHOTTARI_CYCLE.findIndex(
    (c) => c.lord.toLowerCase() === birthLord.toLowerCase()
  );
  const safeStartIndex = startIndex >= 0 ? startIndex : 0;
  const initialConfig = VIMSHOTTARI_CYCLE[safeStartIndex];

  // Fraction of nakshatra completed (from 0 to 1)
  const nakSpan = 360 / 27; // 13.333333°
  const fractionElapsed = nakData.degreeInNakshatra / nakSpan;
  const fractionRemaining = Math.max(0, Math.min(1, 1 - fractionElapsed));

  // Balance of birth dasha remaining in years
  const birthBalanceYears = initialConfig.durationYears * fractionRemaining;

  const timeline: VimshottariDashaData['timeline'] = [];
  let currentPointer = new Date(birthDate);

  let currentMahadasha = initialConfig.lord;
  let currentAntardasha = initialConfig.lord;
  const nowTime = referenceDate.getTime();

  for (let i = 0; i < 9; i++) {
    const cycleIndex = (safeStartIndex + i) % 9;
    const config = VIMSHOTTARI_CYCLE[cycleIndex];
    const duration = i === 0 ? birthBalanceYears : config.durationYears;

    const startDate = new Date(currentPointer);
    const endDate = addYearsToDate(startDate, duration);
    currentPointer = new Date(endDate);

    const isMahaCurrent = nowTime >= startDate.getTime() && nowTime <= endDate.getTime();
    if (isMahaCurrent) {
      currentMahadasha = config.lord;
    }

    // Generate 9 Antardashas within this Mahadasha
    const antardashas: VimshottariDashaData['timeline'][0]['antardashas'] = [];
    let antarPointer = new Date(startDate);

    for (let j = 0; j < 9; j++) {
      const subIndex = (cycleIndex + j) % 9;
      const subConfig = VIMSHOTTARI_CYCLE[subIndex];
      // Antardasha duration = (Maha duration * Antar duration) / 120
      const subYears = (config.durationYears * subConfig.durationYears) / 120;
      // Scale if first dasha has remaining balance
      const effectiveSubYears = (subYears * duration) / config.durationYears;

      const subStart = new Date(antarPointer);
      const subEnd = addYearsToDate(subStart, effectiveSubYears);
      antarPointer = new Date(subEnd);

      const isAntarCurrent = nowTime >= subStart.getTime() && nowTime <= subEnd.getTime();
      if (isAntarCurrent && isMahaCurrent) {
        currentAntardasha = subConfig.lord;
      }

      antardashas.push({
        antardasha: subConfig.lord,
        startDate: formatDateISO(subStart),
        endDate: formatDateISO(subEnd),
        isCurrent: isAntarCurrent,
      });
    }

    timeline.push({
      mahadasha: config.lord,
      startDate: formatDateISO(startDate),
      endDate: formatDateISO(endDate),
      isCurrent: isMahaCurrent,
      antardashas,
    });
  }

  return {
    birthDashaLord: initialConfig.lord,
    balanceYearsRemaining: Number(birthBalanceYears.toFixed(2)),
    currentMahadasha,
    currentAntardasha,
    timeline,
  };
}
