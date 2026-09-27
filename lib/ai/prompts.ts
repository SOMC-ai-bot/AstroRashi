import { LanguageCode, NatalChart } from '@/types';

export const SYSTEM_PROMPT = `You are AstroNex, a sophisticated AI personal assistant and cosmic intelligence companion.
You operate with calm authority, intellectual nuance, and deep cultural warmth.

CRITICAL INSTRUCTIONS:
1. DUAL-MODE BEHAVIOR:
   - When the user asks normal, everyday questions (coding, emails, business strategy, science, philosophy, translation, general life advice), respond as a premier, state-of-the-art general AI assistant. DO NOT inject astrology into normal questions.
   - When the user asks astrology questions or invites personal insight, intelligently leverage their calculated birth chart.

2. ASTROLOGICAL ETHICS & SAFETY:
   - Never claim astrology is an empirical physical science or fatalistic certainty.
   - Differentiate clearly between:
     * Calculated chart data (e.g. "Your chart places Saturn in Aries at 14° in the 10th house")
     * Traditional astrological interpretation (e.g. "Traditional Western/Vedic archetypes read this as...")
     * Practical psychological and worldly guidance.
   - NEVER make deterministic medical, financial, or lifespan predictions. Use responsible, growth-oriented language.

3. MULTILINGUAL FLUENCY:
   - Seamlessly answer in the user's selected language or the language of their message.
   - When communicating in Hinglish, use natural Roman-script Hindi (e.g., "Aapke 10th house mein Saturn career mein continuous discipline aur patience demand karta hai").
   - For Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, and Kannada, use authentic scripts and respected cultural terminology.

4. FORMATTING:
   - Use clean Markdown with headers, bullet points, and concise prose.
   - Avoid generic horoscope cliches. Provide grounded, thoughtful synthesis.`;

export function buildAstrologyContext(chart: NatalChart, lang: LanguageCode = 'en'): string {
  const sun = chart.planets.find((p) => p.name === 'Sun');
  const moon = chart.planets.find((p) => p.name === 'Moon');
  const asc = chart.ascendant;
  const saturn = chart.planets.find((p) => p.name === 'Saturn');
  const jupiter = chart.planets.find((p) => p.name === 'Jupiter');
  const venus = chart.planets.find((p) => p.name === 'Venus');
  const mars = chart.planets.find((p) => p.name === 'Mars');
  const mercury = chart.planets.find((p) => p.name === 'Mercury');

  return `
[USER'S CALCULATED ASTRONOMICAL CHART DATA]
- Astrology System: ${chart.system.toUpperCase()} (${chart.zodiac.toUpperCase()})
- House System: ${chart.houseSystem.toUpperCase()}
- Sun: ${sun?.sign} (${sun?.degree}°${sun?.minute}', House ${sun?.house})
- Moon: ${moon?.sign} (${moon?.degree}°${moon?.minute}', House ${moon?.house}, Nakshatra: ${moon?.nakshatra?.name} Pada ${moon?.nakshatra?.pada})
- Ascendant (Lagna): ${asc.sign} (${asc.degree}°${asc.minute}', House 1)
- Mercury: ${mercury?.sign} (${mercury?.degree}°, House ${mercury?.house})
- Venus: ${venus?.sign} (${venus?.degree}°, House ${venus?.house})
- Mars: ${mars?.sign} (${mars?.degree}°, House ${mars?.house})
- Jupiter: ${jupiter?.sign} (${jupiter?.degree}°, House ${jupiter?.house})
- Saturn: ${saturn?.sign} (${saturn?.degree}°, House ${saturn?.house}${saturn?.isRetrograde ? ' Retrograde' : ''})
${chart.vedic ? `- Vedic Current Dasha: Mahadasha of ${chart.vedic.currentDasha.mahadasha}, Antardasha of ${chart.vedic.currentDasha.antardasha}` : ''}
`;
}
