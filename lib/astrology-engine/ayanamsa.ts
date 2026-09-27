// Lahiri Ayanamsa (Chitra Paksha) Astronomical Calculation Engine
// Reference epoch: J2000.0 (2000 Jan 1.5 TT = Julian Day 2451545.0)

export function getJulianDay(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

export function normDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

export function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
 * High-accuracy Lahiri Ayanamsa computation for any Julian Day.
 * Standard Chitra Paksha ayanamsa at J2000.0 is 23° 51' 11" (~23.85307°).
 * Precession rate is approx 50.290966 arcseconds/year (1.39697° per Julian century).
 */
export function getLahiriAyanamsa(jdn: number): number {
  const t = (jdn - 2451545.0) / 36525; // Julian centuries from J2000.0
  // Standard polynomial for Lahiri precession
  const ayanamsa = 23.85307 + 1.396971 * t + 0.000309 * t * t;
  return ayanamsa;
}

/**
 * Returns formatted Ayanamsa string in Deg° Min' Sec"
 */
export function formatAyanamsa(ayanamsaDeg: number): {
  degrees: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  const degrees = Math.floor(ayanamsaDeg);
  const remMinutes = (ayanamsaDeg - degrees) * 60;
  const minutes = Math.floor(remMinutes);
  const seconds = Math.round((remMinutes - minutes) * 60);
  return {
    degrees,
    minutes,
    seconds,
    formatted: `${degrees}° ${minutes}' ${seconds}"`,
  };
}
