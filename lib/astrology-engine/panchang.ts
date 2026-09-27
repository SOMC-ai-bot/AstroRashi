import { DailyPanchangData, PlanetName, ZodiacSignName } from '@/types';
import { normDeg, toDeg, toRad } from './ayanamsa';
import { calculateRawPlanetaryCoordinates, ZODIAC_SIGNS } from './planetary';
import { getNakshatraFromLongitude } from './nakshatra';

export const TITHI_NAMES = [
  'Pratipada',
  'Dwitiya',
  'Tritiya',
  'Chaturthi',
  'Panchami',
  'Shashti',
  'Saptami',
  'Ashtami',
  'Navami',
  'Dashami',
  'Ekadashi',
  'Dwadashi',
  'Trayodashi',
  'Chaturdashi',
  'Purnima', // 15
  'Pratipada (Krishna)',
  'Dwitiya (Krishna)',
  'Tritiya (Krishna)',
  'Chaturthi (Krishna)',
  'Panchami (Krishna)',
  'Shashti (Krishna)',
  'Saptami (Krishna)',
  'Ashtami (Krishna)',
  'Navami (Krishna)',
  'Dashami (Krishna)',
  'Ekadashi (Krishna)',
  'Dwadashi (Krishna)',
  'Trayodashi (Krishna)',
  'Chaturdashi (Krishna)',
  'Amavasya', // 30
];

export const YOGA_NAMES = [
  'Vishkambha',
  'Preeti',
  'Ayushman',
  'Saubhagya',
  'Shobhana',
  'Atiganda',
  'Sukarma',
  'Dhriti',
  'Shoola',
  'Ganda',
  'Vriddhi',
  'Dhruva',
  'Vyaghata',
  'Harshana',
  'Vajra',
  'Asiddhi',
  'Vyatipata',
  'Variyan',
  'Parigha',
  'Shiva',
  'Siddha',
  'Sadhya',
  'Shubha',
  'Shukla',
  'Brahma',
  'Indra',
  'Vaidhriti',
];

export const KARANA_NAMES = [
  'Bava',
  'Balava',
  'Kaulava',
  'Taitila',
  'Gara',
  'Vanija',
  'Vishti (Bhadra)',
  'Shakuni',
  'Chatushpada',
  'Naga',
  'Kintughna',
];

export const WEEKDAY_LORDS: { name: string; lord: PlanetName }[] = [
  { name: 'Sunday (Ravivara)', lord: 'Sun' },
  { name: 'Monday (Somavara)', lord: 'Moon' },
  { name: 'Tuesday (Mangalavara)', lord: 'Mars' },
  { name: 'Wednesday (Budhavara)', lord: 'Mercury' },
  { name: 'Thursday (Guruvara)', lord: 'Jupiter' },
  { name: 'Friday (Shukravara)', lord: 'Venus' },
  { name: 'Saturday (Shanivara)', lord: 'Saturn' },
];

/**
 * Calculates local sunrise and sunset using solar zenith algorithm.
 */
export function calculateSolarTimes(
  date: Date,
  latitude: number,
  longitude: number
): { sunrise: string; sunset: string; sunriseDate: Date; sunsetDate: Date } {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );

  // Approximate solar declination
  const declination = -23.44 * Math.cos(toRad((360 / 365) * (dayOfYear + 10)));
  const decRad = toRad(declination);
  const latRad = toRad(latitude);

  // Zenith angle for official sunrise/sunset = 90.833°
  const cosH =
    (Math.cos(toRad(90.833)) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));

  // Default fallback if polar day/night
  let hourAngleDeg = 90;
  if (cosH >= -1 && cosH <= 1) {
    hourAngleDeg = toDeg(Math.acos(cosH));
  }

  // Solar noon in hours UTC
  const solarNoonUTC = 12 - longitude / 15;
  const sunriseHoursUTC = solarNoonUTC - hourAngleDeg / 15;
  const sunsetHoursUTC = solarNoonUTC + hourAngleDeg / 15;

  // Convert to local time string
  const baseDay = new Date(date);
  baseDay.setUTCHours(0, 0, 0, 0);

  const riseMs = baseDay.getTime() + sunriseHoursUTC * 3600000;
  const setMs = baseDay.getTime() + sunsetHoursUTC * 3600000;

  const sunriseDate = new Date(riseMs);
  const sunsetDate = new Date(setMs);

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

  return {
    sunrise: formatTime(sunriseDate),
    sunset: formatTime(sunsetDate),
    sunriseDate,
    sunsetDate,
  };
}

export function calculateDailyPanchang(
  date: Date,
  latitude: number = 25.3176, // Default Varanasi
  longitude: number = 82.9739,
  locationName: string = 'Varanasi, India',
  timezone: string = 'Asia/Kolkata'
): DailyPanchangData {
  const { positions } = calculateRawPlanetaryCoordinates(date, true);
  const sunLon = positions.Sun.longitude;
  const moonLon = positions.Moon.longitude;

  // 1. Tithi (12° segments between Moon and Sun)
  const diffLon = normDeg(moonLon - sunLon);
  const tithiIndex = Math.min(29, Math.floor(diffLon / 12));
  const tithiNumber = tithiIndex + 1;
  const paksha: 'Shukla' | 'Krishna' = tithiNumber <= 15 ? 'Shukla' : 'Krishna';
  const progressPercent = Math.round(((diffLon % 12) / 12) * 100);

  // 2. Vara (Weekday)
  const weekday = date.getDay();
  const vara = WEEKDAY_LORDS[weekday];

  // 3. Nakshatra
  const nakData = getNakshatraFromLongitude(moonLon);

  // 4. Yoga (Sum of Sun and Moon / 13° 20')
  const yogaLon = normDeg(sunLon + moonLon);
  const yogaIndex = Math.floor(yogaLon / (360 / 27)) % 27;
  const yogaName = YOGA_NAMES[yogaIndex];

  // 5. Karana (Half-tithi, 6° each)
  const karanaIndex = Math.floor(diffLon / 6);
  let karanaName = KARANA_NAMES[0];
  if (karanaIndex === 0) karanaName = 'Kintughna';
  else if (karanaIndex >= 57) {
    if (karanaIndex === 57) karanaName = 'Shakuni';
    else if (karanaIndex === 58) karanaName = 'Chatushpada';
    else karanaName = 'Naga';
  } else {
    karanaName = KARANA_NAMES[(karanaIndex - 1) % 7];
  }

  // 6. Signs
  const sunSign = ZODIAC_SIGNS[Math.floor(sunLon / 30)];
  const moonSign = ZODIAC_SIGNS[Math.floor(moonLon / 30)];

  // 7. Samvats
  const currentYear = date.getFullYear();
  const vikramSamvat = currentYear + 57;
  const shakaSamvat = currentYear - 78;

  // 8. Solar Times
  const { sunrise, sunset, sunriseDate, sunsetDate } = calculateSolarTimes(date, latitude, longitude);

  // 9. Day divisions (8 equal parts of daylight)
  const dayDurationMs = sunsetDate.getTime() - sunriseDate.getTime();
  const partMs = dayDurationMs / 8;

  // Rahu Kaal lookup table (part index 0 to 7 from sunrise)
  // Sun: 7th (16:30-18:00), Mon: 1st (07:30-09:00), Tue: 6th (15:00-16:30),
  // Wed: 4th (12:00-13:30), Thu: 5th (13:30-15:00), Fri: 3rd (10:30-12:00), Sat: 2nd (09:00-10:30)
  const rahuOrder = [7, 1, 6, 4, 5, 3, 2];
  const yamagandaOrder = [4, 3, 2, 1, 0, 6, 5];
  const gulikaOrder = [6, 5, 4, 3, 2, 1, 0];

  const pad = (n: number) => String(n).padStart(2, '0');
  const getWindow = (partIndex: number) => {
    const s = new Date(sunriseDate.getTime() + partIndex * partMs);
    const e = new Date(s.getTime() + partMs);
    return {
      start: `${pad(s.getHours())}:${pad(s.getMinutes())}`,
      end: `${pad(e.getHours())}:${pad(e.getMinutes())}`,
    };
  };

  const rahuKaal = getWindow(rahuOrder[weekday]);
  const yamaganda = getWindow(yamagandaOrder[weekday]);
  const gulika = getWindow(gulikaOrder[weekday]);

  // Abhijit Muhurta (approx 48 mins centered at local noon)
  const solarNoonMs = sunriseDate.getTime() + dayDurationMs / 2;
  const abhijitStart = new Date(solarNoonMs - 24 * 60000);
  const abhijitEnd = new Date(solarNoonMs + 24 * 60000);
  const abhijitMuhurta = {
    start: `${pad(abhijitStart.getHours())}:${pad(abhijitStart.getMinutes())}`,
    end: `${pad(abhijitEnd.getHours())}:${pad(abhijitEnd.getMinutes())}`,
  };

  // Brahma Muhurta (96 to 48 mins before sunrise)
  const brahmaStart = new Date(sunriseDate.getTime() - 96 * 60000);
  const brahmaEnd = new Date(sunriseDate.getTime() - 48 * 60000);
  const brahmaMuhurta = {
    start: `${pad(brahmaStart.getHours())}:${pad(brahmaStart.getMinutes())}`,
    end: `${pad(brahmaEnd.getHours())}:${pad(brahmaEnd.getMinutes())}`,
  };

  const summary = `Today is ${TITHI_NAMES[tithiIndex]} (${paksha} Paksha) in ${vara.name}. The Moon resides in ${nakData.nakshatra.name} Nakshatra (Pada ${nakData.pada}) under ${moonSign}. Auspicious Abhijit window is active between ${abhijitMuhurta.start} - ${abhijitMuhurta.end}. Avoid major beginnings during Rahu Kaal (${rahuKaal.start} - ${rahuKaal.end}).`;

  return {
    date: date.toISOString().split('T')[0],
    locationName,
    latitude,
    longitude,
    timezone,
    sunrise,
    sunset,
    moonrise: '19:42',
    moonset: '07:15',
    tithi: {
      number: tithiNumber,
      name: TITHI_NAMES[tithiIndex],
      paksha,
      progressPercent,
    },
    vara: {
      name: vara.name,
      lord: vara.lord,
    },
    nakshatra: {
      name: nakData.nakshatra.name,
      lord: String(nakData.nakshatra.lord),
      pada: nakData.pada,
    },
    yoga: {
      name: yogaName,
      meaning: 'Favourable spiritual alignment',
    },
    karana: {
      name: karanaName,
      type: 'Fixed / Movable',
    },
    sunSign,
    moonSign,
    vikramSamvat,
    shakaSamvat,
    rahuKaal,
    yamaganda,
    gulika,
    abhijitMuhurta,
    brahmaMuhurta,
    summary,
  };
}
