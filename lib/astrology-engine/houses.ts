import { HousePosition, HouseSystem, PlanetName, PlanetPosition, ZodiacSignName } from '@/types';
import { getJulianDay, normDeg, toDeg, toRad } from './ayanamsa';
import { SIGN_RULERS, ZODIAC_SIGNS } from './planetary';

export function getLocalSiderealTime(date: Date, longitude: number): number {
  const jd = getJulianDay(date);
  const d = jd - 2451545.0;
  let gmst = 18.697374558 + 24.06570982441908 * d;
  gmst = gmst % 24;
  if (gmst < 0) gmst += 24;

  let lstHours = gmst + longitude / 15.0;
  lstHours = lstHours % 24;
  if (lstHours < 0) lstHours += 24;
  return lstHours * 15; // in degrees
}

export function calculateAscendantAndMC(
  date: Date,
  latitude: number,
  longitude: number,
  ayanamsa: number = 0
): {
  ascendantDeg: number;
  midheavenDeg: number;
} {
  const jd = getJulianDay(date);
  const d = jd - 2451545.0;
  const t = d / 36525;
  const lst = getLocalSiderealTime(date, longitude);
  const obliquity = 23.4392911 - 0.0130042 * t;

  const epsRad = toRad(obliquity);
  const latRad = toRad(latitude);
  const lstRad = toRad(lst);

  // Midheaven (MC)
  const tanMC = Math.tan(lstRad) / Math.cos(epsRad);
  let mcDeg = toDeg(Math.atan(tanMC));
  if (Math.cos(lstRad) < 0) mcDeg += 180;
  else if (Math.sin(lstRad) < 0) mcDeg += 360;
  const mcLon = normDeg(mcDeg - ayanamsa);

  // Ascendant (AC)
  const y = Math.cos(lstRad);
  const x = -(Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad));
  let acDeg = toDeg(Math.atan2(y, x));
  acDeg = normDeg(acDeg);
  const ascLon = normDeg(acDeg - ayanamsa);

  return {
    ascendantDeg: ascLon,
    midheavenDeg: mcLon,
  };
}

export function calculateHouses(
  ascendantDeg: number,
  midheavenDeg: number,
  houseSystem: HouseSystem = 'whole-sign'
): {
  houses: HousePosition[];
  houseCusps: number[];
} {
  const houses: HousePosition[] = [];
  const houseCusps: number[] = [];

  if (houseSystem === 'whole-sign') {
    // Whole Sign / Vedic Bhavas: 1st house is the entire sign of the Ascendant
    const ascSignIndex = Math.floor(ascendantDeg / 30);
    for (let h = 0; h < 12; h++) {
      const hSignIndex = (ascSignIndex + h) % 12;
      const cuspDeg = hSignIndex * 30;
      houseCusps.push(cuspDeg);
      houses.push({
        house: h + 1,
        sign: ZODIAC_SIGNS[hSignIndex],
        degree: 0,
        minute: 0,
        ruler: SIGN_RULERS[ZODIAC_SIGNS[hSignIndex]],
        planets: [],
      });
    }
  } else {
    // Placidus quadrant approximation
    const icLon = normDeg(midheavenDeg + 180);
    const dcLon = normDeg(ascendantDeg + 180);

    const q1 = normDeg(midheavenDeg - ascendantDeg) / 3;
    const q2 = normDeg(dcLon - midheavenDeg) / 3;
    const q3 = normDeg(icLon - dcLon) / 3;
    const q4 = normDeg(ascendantDeg - icLon) / 3;

    houseCusps[0] = ascendantDeg; // H1
    houseCusps[1] = normDeg(ascendantDeg + q4); // H2
    houseCusps[2] = normDeg(ascendantDeg + 2 * q4); // H3
    houseCusps[3] = icLon; // H4
    houseCusps[4] = normDeg(icLon + q3); // H5
    houseCusps[5] = normDeg(icLon + 2 * q3); // H6
    houseCusps[6] = dcLon; // H7
    houseCusps[7] = normDeg(dcLon + q2); // H8
    houseCusps[8] = normDeg(dcLon + 2 * q2); // H9
    houseCusps[9] = midheavenDeg; // H10
    houseCusps[10] = normDeg(midheavenDeg + q1); // H11
    houseCusps[11] = normDeg(midheavenDeg + 2 * q1); // H12

    for (let h = 0; h < 12; h++) {
      const cusp = houseCusps[h];
      const signIndex = Math.floor(cusp / 30);
      const signDeg = Math.floor(cusp % 30);
      const signMin = Math.floor(((cusp % 30) - signDeg) * 60);
      houses.push({
        house: h + 1,
        sign: ZODIAC_SIGNS[signIndex],
        degree: signDeg,
        minute: signMin,
        ruler: SIGN_RULERS[ZODIAC_SIGNS[signIndex]],
        planets: [],
      });
    }
  }

  return { houses, houseCusps };
}

export function assignPlanetsToHouses(
  planets: PlanetPosition[],
  houses: HousePosition[],
  houseCusps: number[],
  ascendantDeg: number,
  houseSystem: HouseSystem
): PlanetPosition[] {
  return planets.map((planet) => {
    let assignedHouse = 1;

    if (houseSystem === 'whole-sign') {
      const ascSignIdx = Math.floor(ascendantDeg / 30);
      const planetSignIdx = Math.floor(planet.absoluteDegree / 30);
      assignedHouse = ((planetSignIdx - ascSignIdx + 12) % 12) + 1;
    } else {
      for (let i = 0; i < 12; i++) {
        const cusp1 = houseCusps[i];
        const cusp2 = houseCusps[(i + 1) % 12];
        const diffTotal = normDeg(cusp2 - cusp1);
        const diffPlanet = normDeg(planet.absoluteDegree - cusp1);
        if (diffPlanet >= 0 && diffPlanet < diffTotal) {
          assignedHouse = i + 1;
          break;
        }
      }
    }

    planet.house = assignedHouse;
    if (!houses[assignedHouse - 1].planets.includes(planet.name)) {
      houses[assignedHouse - 1].planets.push(planet.name);
    }
    return planet;
  });
}
