import { NatalChart } from '@/types';
import { calculateDailyPanchang } from './panchang';
import { calculateChoghadiya, calculateGowriPanchangam, calculatePlanetaryHora } from './timing';
import { calculateMangalDosha, calculateKaalSarpDosha, calculateSadeSati, calculatePitraDosha } from './doshas';
import { detectChartYogas } from './yogas';
import { calculateAshtakootMatching } from './matching';
import { calculateMulankAndBhagyank, calculateNameNumerology, calculateLoShuGrid } from './numerology';
import { recommendGemstone, recommendRudraksha } from './remedies';
import { getShubhMuhuratList } from './muhurat';
import { generateAstrologyReport } from './reports-engine';
import { calculateNavamsaChart } from './navamsa';
import { calculateVimshottariDasha } from './dasha';

export type AstrologyToolName =
  | 'getBirthChart'
  | 'getPlanetPositions'
  | 'getHousePositions'
  | 'getNakshatra'
  | 'getDasha'
  | 'getTransits'
  | 'getYogas'
  | 'getDoshas'
  | 'getNavamsa'
  | 'getPanchang'
  | 'getChoghadiya'
  | 'getGowriPanchang'
  | 'getRahuKaal'
  | 'getHora'
  | 'calculateKundliMatch'
  | 'calculateNumerology'
  | 'calculateGemstone'
  | 'calculateRudraksha'
  | 'calculateMuhurat'
  | 'getReportData';

export function executeAstrologyTool(
  toolName: AstrologyToolName,
  chart: NatalChart,
  params: Record<string, any> = {}
): Record<string, any> {
  const moon = chart.planets.find((p) => p.name === 'Moon');
  const now = new Date();

  switch (toolName) {
    case 'getBirthChart':
      return {
        ascendant: chart.ascendant,
        planets: chart.planets.map((p) => ({
          name: p.name,
          sign: p.sign,
          degree: p.degree,
          house: p.house,
          isRetrograde: p.isRetrograde,
          nakshatra: p.nakshatra?.name,
        })),
        houses: chart.houses.map((h) => ({ house: h.house, sign: h.sign, ruler: h.ruler })),
      };

    case 'getPlanetPositions':
      return { planets: chart.planets };

    case 'getHousePositions':
      return { houses: chart.houses };

    case 'getNakshatra':
      return {
        moonNakshatra: moon?.nakshatra,
        moonSign: moon?.sign,
        moonDegree: moon?.degree,
      };

    case 'getDasha':
      return calculateVimshottariDasha(moon ? moon.absoluteDegree : 0, new Date(1996, 8, 12), now);

    case 'getYogas':
      return { yogas: detectChartYogas(chart) };

    case 'getDoshas':
      return {
        mangalDosha: calculateMangalDosha(chart),
        kaalSarp: calculateKaalSarpDosha(chart),
        sadeSati: calculateSadeSati(moon?.sign || 'Taurus', 'Aquarius'),
        pitraDosha: calculatePitraDosha(chart),
      };

    case 'getNavamsa':
      return calculateNavamsaChart(chart.planets, chart.ascendant);

    case 'getPanchang':
      return calculateDailyPanchang(now, params.lat || 25.3176, params.lon || 82.9739);

    case 'getChoghadiya':
      return calculateChoghadiya(now, params.lat || 25.3176, params.lon || 82.9739);

    case 'getGowriPanchang':
      return calculateGowriPanchangam(now, params.lat || 25.3176, params.lon || 82.9739);

    case 'getRahuKaal': {
      const p = calculateDailyPanchang(now, params.lat || 25.3176, params.lon || 82.9739);
      return { rahuKaal: p.rahuKaal, yamaganda: p.yamaganda, gulika: p.gulika };
    }

    case 'getHora':
      return calculatePlanetaryHora(now, params.lat || 25.3176, params.lon || 82.9739);

    case 'calculateKundliMatch': {
      const moonLonA = moon ? moon.absoluteDegree : 45;
      const moonLonB = params.moonLonB || 120;
      return calculateAshtakootMatching(moonLonA, moonLonB, params.nameA || 'Person A', params.nameB || 'Person B');
    }

    case 'calculateNumerology': {
      const birthDate = params.birthDate || '1996-09-12';
      return {
        mulankBhagyank: calculateMulankAndBhagyank(birthDate),
        loShu: calculateLoShuGrid(birthDate),
      };
    }

    case 'calculateGemstone':
      return recommendGemstone(chart);

    case 'calculateRudraksha':
      return recommendRudraksha(chart);

    case 'calculateMuhurat':
      return { muhurats: getShubhMuhuratList(now.getFullYear(), params.category) };

    case 'getReportData':
      return generateAstrologyReport(chart, params.reportType || 'life-insights');

    default:
      return { error: `Tool ${toolName} not recognized` };
  }
}
