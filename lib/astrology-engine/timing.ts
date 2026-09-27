import { ChoghadiyaPeriod, GowriPeriod, HoraPeriod, PlanetName } from '@/types';
import { calculateSolarTimes } from './panchang';

// Choghadiya types & classification:
// Amrit (Good), Shubh (Good), Labh (Good)
// Char (Neutral)
// Rog (Avoid), Kaal (Avoid), Udveg (Avoid)
const CHOGHADIYA_TYPES: Record<string, 'Good' | 'Neutral' | 'Avoid'> = {
  Amrit: 'Good',
  Shubh: 'Good',
  Labh: 'Good',
  Char: 'Neutral',
  Rog: 'Avoid',
  Kaal: 'Avoid',
  Udveg: 'Avoid',
};

// Starting Choghadiya for each weekday (Sun=0 to Sat=6)
const DAY_CHOGHADIYA_ORDER = [
  ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'], // Sun
  ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit'], // Mon
  ['Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'], // Tue
  ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh'], // Wed
  ['Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh'], // Thu
  ['Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char'], // Fri
  ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal'], // Sat
];

const NIGHT_CHOGHADIYA_ORDER = [
  ['Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh'], // Sun
  ['Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char'], // Mon
  ['Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal'], // Tue
  ['Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg'], // Wed
  ['Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit'], // Thu
  ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog'], // Fri
  ['Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh'], // Sat
];

const GOWRI_QUALITIES: Record<string, 'Good' | 'Neutral' | 'Avoid'> = {
  Amirtham: 'Good',
  Uthi: 'Good',
  Labham: 'Good',
  Sugam: 'Good',
  Visham: 'Avoid',
  Rogam: 'Avoid',
  Soram: 'Avoid',
  Bandham: 'Avoid',
};

const GOWRI_DAY_ORDER = [
  ['Uthi', 'Amirtham', 'Rogam', 'Labham', 'Visham', 'Sugam', 'Soram', 'Bandham'], // Sun
  ['Amirtham', 'Rogam', 'Labham', 'Visham', 'Sugam', 'Soram', 'Bandham', 'Uthi'], // Mon
  ['Rogam', 'Labham', 'Visham', 'Sugam', 'Soram', 'Bandham', 'Uthi', 'Amirtham'], // Tue
  ['Labham', 'Visham', 'Sugam', 'Soram', 'Bandham', 'Uthi', 'Amirtham', 'Rogam'], // Wed
  ['Visham', 'Sugam', 'Soram', 'Bandham', 'Uthi', 'Amirtham', 'Rogam', 'Labham'], // Thu
  ['Sugam', 'Soram', 'Bandham', 'Uthi', 'Amirtham', 'Rogam', 'Labham', 'Visham'], // Fri
  ['Soram', 'Bandham', 'Uthi', 'Amirtham', 'Rogam', 'Labham', 'Visham', 'Sugam'], // Sat
];

// Chaldean Order of Planets (from slowest to fastest):
// Saturn -> Jupiter -> Mars -> Sun -> Venus -> Mercury -> Moon
const CHALDEAN_ORDER: PlanetName[] = [
  'Saturn',
  'Jupiter',
  'Mars',
  'Sun',
  'Venus',
  'Mercury',
  'Moon',
];

const WEEKDAY_STARTING_HORA: PlanetName[] = [
  'Sun', // Sunday
  'Moon', // Monday
  'Mars', // Tuesday
  'Mercury', // Wednesday
  'Jupiter', // Thursday
  'Venus', // Friday
  'Saturn', // Saturday
];

const HORA_THEMES: Record<PlanetName, { theme: string; activities: string[] }> = {
  Sun: {
    theme: 'Authority, Government, Leadership & Health',
    activities: ['Meeting officials', 'Applying for jobs', 'Health rituals', 'Executive decisions'],
  },
  Moon: {
    theme: 'Emotional Bonding, Food, Travel & Mother',
    activities: ['Creative arts', 'Family gatherings', 'Water travel', 'Nurturing relationships'],
  },
  Mars: {
    theme: 'Courage, Sports, Real Estate & Initiative',
    activities: ['Physical workouts', 'Property disputes', 'Surgery/procedures', 'Technical projects'],
  },
  Mercury: {
    theme: 'Commerce, Writing, Trading & Communication',
    activities: ['Signing contracts', 'Marketing campaigns', 'Coding/writing', 'Commercial negotiations'],
  },
  Jupiter: {
    theme: 'Higher Learning, Dharma, Wealth & Spirituality',
    activities: ['Financial investments', 'Consulting mentors', 'Spiritual ceremonies', 'Higher education'],
  },
  Venus: {
    theme: 'Aesthetics, Romance, Luxury & Diplomacy',
    activities: ['Courtship', 'Purchasing jewelry/clothing', 'Artistic creation', 'Diplomatic compromise'],
  },
  Saturn: {
    theme: 'Discipline, Labor, Foundation & Long-term Strategy',
    activities: ['Foundational construction', 'Hard endurance tasks', 'Agriculture', 'Debt clearance'],
  },
  Ascendant: { theme: 'General', activities: [] },
  Midheaven: { theme: 'General', activities: [] },
  Rahu: { theme: 'Ambition', activities: [] },
  Ketu: { theme: 'Detachment', activities: [] },
  Uranus: { theme: 'Innovation', activities: [] },
  Neptune: { theme: 'Intuition', activities: [] },
  Pluto: { theme: 'Transformation', activities: [] },
};

const pad = (n: number) => String(n).padStart(2, '0');
const formatHM = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export function calculateChoghadiya(
  date: Date,
  latitude: number = 25.3176,
  longitude: number = 82.9739
): {
  dayPeriods: ChoghadiyaPeriod[];
  nightPeriods: ChoghadiyaPeriod[];
  currentPeriod: ChoghadiyaPeriod | null;
} {
  const weekday = date.getDay();
  const { sunriseDate, sunsetDate } = calculateSolarTimes(date, latitude, longitude);

  // Day periods (8 equal parts)
  const dayDurationMs = sunsetDate.getTime() - sunriseDate.getTime();
  const dayPartMs = dayDurationMs / 8;
  const dayNames = DAY_CHOGHADIYA_ORDER[weekday];

  // Night periods (8 equal parts until next day sunrise)
  const nextDay = new Date(date.getTime() + 86400000);
  const nextSolar = calculateSolarTimes(nextDay, latitude, longitude);
  const nightDurationMs = nextSolar.sunriseDate.getTime() - sunsetDate.getTime();
  const nightPartMs = nightDurationMs / 8;
  const nightNames = NIGHT_CHOGHADIYA_ORDER[weekday];

  const nowMs = date.getTime();
  let currentPeriod: ChoghadiyaPeriod | null = null;

  const dayPeriods: ChoghadiyaPeriod[] = dayNames.map((name, i) => {
    const s = new Date(sunriseDate.getTime() + i * dayPartMs);
    const e = new Date(s.getTime() + dayPartMs);
    const isCurrent = nowMs >= s.getTime() && nowMs < e.getTime();
    const period: ChoghadiyaPeriod = {
      name,
      ruler: 'Sun',
      startTime: formatHM(s),
      endTime: formatHM(e),
      classification: CHOGHADIYA_TYPES[name] || 'Neutral',
      isDay: true,
      isCurrent,
    };
    if (isCurrent) currentPeriod = period;
    return period;
  });

  const nightPeriods: ChoghadiyaPeriod[] = nightNames.map((name, i) => {
    const s = new Date(sunsetDate.getTime() + i * nightPartMs);
    const e = new Date(s.getTime() + nightPartMs);
    const isCurrent = nowMs >= s.getTime() && nowMs < e.getTime();
    const period: ChoghadiyaPeriod = {
      name,
      ruler: 'Moon',
      startTime: formatHM(s),
      endTime: formatHM(e),
      classification: CHOGHADIYA_TYPES[name] || 'Neutral',
      isDay: false,
      isCurrent,
    };
    if (isCurrent) currentPeriod = period;
    return period;
  });

  return { dayPeriods, nightPeriods, currentPeriod };
}

export function calculateGowriPanchangam(
  date: Date,
  latitude: number = 25.3176,
  longitude: number = 82.9739
): {
  dayPeriods: GowriPeriod[];
  nightPeriods: GowriPeriod[];
  currentPeriod: GowriPeriod | null;
} {
  const weekday = date.getDay();
  const { sunriseDate, sunsetDate } = calculateSolarTimes(date, latitude, longitude);
  const dayDurationMs = sunsetDate.getTime() - sunriseDate.getTime();
  const dayPartMs = dayDurationMs / 8;

  const nextDay = new Date(date.getTime() + 86400000);
  const nextSolar = calculateSolarTimes(nextDay, latitude, longitude);
  const nightDurationMs = nextSolar.sunriseDate.getTime() - sunsetDate.getTime();
  const nightPartMs = nightDurationMs / 8;

  const nowMs = date.getTime();
  let currentPeriod: GowriPeriod | null = null;
  const names = GOWRI_DAY_ORDER[weekday];

  const dayPeriods: GowriPeriod[] = names.map((name, i) => {
    const s = new Date(sunriseDate.getTime() + i * dayPartMs);
    const e = new Date(s.getTime() + dayPartMs);
    const isCurrent = nowMs >= s.getTime() && nowMs < e.getTime();
    const period: GowriPeriod = {
      name,
      startTime: formatHM(s),
      endTime: formatHM(e),
      quality: GOWRI_QUALITIES[name] || 'Neutral',
      isDay: true,
      isCurrent,
    };
    if (isCurrent) currentPeriod = period;
    return period;
  });

  const nightPeriods: GowriPeriod[] = names.map((name, i) => {
    const s = new Date(sunsetDate.getTime() + i * nightPartMs);
    const e = new Date(s.getTime() + nightPartMs);
    const isCurrent = nowMs >= s.getTime() && nowMs < e.getTime();
    const period: GowriPeriod = {
      name,
      startTime: formatHM(s),
      endTime: formatHM(e),
      quality: GOWRI_QUALITIES[name] || 'Neutral',
      isDay: false,
      isCurrent,
    };
    if (isCurrent) currentPeriod = period;
    return period;
  });

  return { dayPeriods, nightPeriods, currentPeriod };
}

export function calculatePlanetaryHora(
  date: Date,
  latitude: number = 25.3176,
  longitude: number = 82.9739
): {
  horas: HoraPeriod[];
  currentHora: HoraPeriod | null;
  nextHora: HoraPeriod | null;
} {
  const weekday = date.getDay();
  const { sunriseDate, sunsetDate } = calculateSolarTimes(date, latitude, longitude);

  const dayDurationMs = sunsetDate.getTime() - sunriseDate.getTime();
  const dayHoraMs = dayDurationMs / 12;

  const nextDay = new Date(date.getTime() + 86400000);
  const nextSolar = calculateSolarTimes(nextDay, latitude, longitude);
  const nightDurationMs = nextSolar.sunriseDate.getTime() - sunsetDate.getTime();
  const nightHoraMs = nightDurationMs / 12;

  const startLord = WEEKDAY_STARTING_HORA[weekday];
  const startIdx = CHALDEAN_ORDER.indexOf(startLord);

  const horas: HoraPeriod[] = [];
  const nowMs = date.getTime();
  let currentHora: HoraPeriod | null = null;
  let nextHora: HoraPeriod | null = null;

  // 12 daytime Horas
  for (let i = 0; i < 12; i++) {
    const planet = CHALDEAN_ORDER[(startIdx + i) % 7];
    const s = new Date(sunriseDate.getTime() + i * dayHoraMs);
    const e = new Date(s.getTime() + dayHoraMs);
    const isCurrent = nowMs >= s.getTime() && nowMs < e.getTime();
    const themeData = HORA_THEMES[planet] || { theme: 'Cosmic influence', activities: [] };

    const hora: HoraPeriod = {
      hourNumber: i + 1,
      planet,
      startTime: formatHM(s),
      endTime: formatHM(e),
      traditionalTheme: themeData.theme,
      recommendedActivities: themeData.activities,
      isCurrent,
    };
    horas.push(hora);
    if (isCurrent) currentHora = hora;
  }

  // 12 nighttime Horas
  for (let i = 0; i < 12; i++) {
    const planet = CHALDEAN_ORDER[(startIdx + 12 + i) % 7];
    const s = new Date(sunsetDate.getTime() + i * nightHoraMs);
    const e = new Date(s.getTime() + nightHoraMs);
    const isCurrent = nowMs >= s.getTime() && nowMs < e.getTime();
    const themeData = HORA_THEMES[planet] || { theme: 'Cosmic influence', activities: [] };

    const hora: HoraPeriod = {
      hourNumber: 13 + i,
      planet,
      startTime: formatHM(s),
      endTime: formatHM(e),
      traditionalTheme: themeData.theme,
      recommendedActivities: themeData.activities,
      isCurrent,
    };
    horas.push(hora);
    if (isCurrent) currentHora = hora;
  }

  // Find next hora
  if (currentHora) {
    const currIdx = horas.findIndex((h) => h.hourNumber === currentHora?.hourNumber);
    if (currIdx >= 0 && currIdx < horas.length - 1) {
      nextHora = horas[currIdx + 1];
    }
  }

  return { horas, currentHora, nextHora };
}

export const calculateGowriPanchang = calculateGowriPanchangam;

export function calculateHourlyHora(
  date: Date,
  latitude: number = 25.3176,
  longitude: number = 82.9739
): Array<{
  hourNumber: number;
  planet: PlanetName;
  startTime: string;
  endTime: string;
  favorableFor: string;
}> {
  const result = calculatePlanetaryHora(date, latitude, longitude);
  return result.horas.map((h) => ({
    hourNumber: h.hourNumber,
    planet: h.planet,
    startTime: h.startTime,
    endTime: h.endTime,
    favorableFor: h.recommendedActivities.join(', ') || h.traditionalTheme,
  }));
}
