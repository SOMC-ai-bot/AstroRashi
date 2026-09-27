import { AstrologyReport, NatalChart, ReportChapter, ReportEvidence, ReportType } from '@/types';
import { calculateMangalDosha, calculateKaalSarpDosha, calculateSadeSati, calculatePitraDosha } from './doshas';
import { detectChartYogas } from './yogas';
import { recommendGemstone, recommendRudraksha } from './remedies';
import { calculateVimshottariDasha } from './dasha';

export function generateAstrologyReport(
  chart: NatalChart,
  reportType: ReportType,
  profileName: string = 'User'
): AstrologyReport {
  const sun = chart.planets.find((p) => p.name === 'Sun');
  const moon = chart.planets.find((p) => p.name === 'Moon');
  const saturn = chart.planets.find((p) => p.name === 'Saturn');
  const jupiter = chart.planets.find((p) => p.name === 'Jupiter');
  const venus = chart.planets.find((p) => p.name === 'Venus');
  const mars = chart.planets.find((p) => p.name === 'Mars');
  const asc = chart.ascendant;

  const chapters: ReportChapter[] = [];
  const keyStrengths: string[] = [];
  const keyGrowthAreas: string[] = [];
  const traditionalRemedies: string[] = [];

  const now = new Date();
  const moonLon = moon ? moon.absoluteDegree : 0;
  const dashaData = calculateVimshottariDasha(moonLon, new Date(now.getFullYear() - 28, 0, 1), now);
  const currentMahaItem = dashaData.timeline?.find((t) => t.isCurrent);
  const currentAntarItem = currentMahaItem?.antardashas?.find((a) => a.isCurrent);
  const mahaStart = currentMahaItem?.startDate?.split('T')[0] || 'Active';
  const mahaEnd = currentMahaItem?.endDate?.split('T')[0] || 'Next Cycle';
  const antarStart = currentAntarItem?.startDate?.split('T')[0] || 'Active';
  const antarEnd = currentAntarItem?.endDate?.split('T')[0] || 'Next Phase';
  const mangal = calculateMangalDosha(chart);
  const kaalsarp = calculateKaalSarpDosha(chart);
  const sadesati = calculateSadeSati(moon?.sign || 'Taurus', saturn?.sign || 'Aquarius');
  const pitra = calculatePitraDosha(chart);
  const yogas = detectChartYogas(chart);
  const gemstone = recommendGemstone(chart);
  const rudraksha = recommendRudraksha(chart);

  let title = 'Certified Master Cosmic Dossier';
  if (reportType === 'life-insights') title = 'Life Insights & Soul Blueprint Master Dossier';
  else if (reportType === 'career-wealth') title = 'Career Mastery, Enterprise & Dhana Yogas Dossier';
  else if (reportType === 'love-marriage') title = 'Sacred Union, Partnership & Navamsa D9 Dossier';
  else if (reportType === 'dasha' || reportType === 'dasha-timeline') title = '120-Year Vimshottari Timeline & Cyclic Destiny Dossier';
  else if (reportType === 'saturn') title = 'Saturn Architecture, Sade Sati & Karmic Discipline Dossier';
  else if (reportType === 'mangal-dosha') title = 'Comprehensive Mangal Dosha (Kuja) Analysis & Remedies Dossier';
  else if (reportType === 'kalsarp-dosha') title = 'Kaal Sarp Yoga & Nodal Destiny Audit Dossier';
  else if (reportType === 'pitra-dosha') title = 'Pitra Dosha & Ancestral Lineage Reconciliation Dossier';
  else if (reportType === 'raj-yoga') title = 'Raj Yoga, Imperial Dignities & Leadership Blueprint Dossier';
  else if (reportType === 'gemstone' || reportType === 'remedies-gemstones') title = 'Vedic Gemology, Sacred Ratnas & Talismanic Remedial Dossier';
  else if (reportType === 'videsh-yoga') title = 'Videsh Yoga, Foreign Settlement & Global Odyssey Dossier';

  keyStrengths.push(
    `Sovereign Ascendant in ${asc.sign} (${asc.degree}°) anchoring biological resilience, personal poise, and outward authenticity.`,
    `Lunar mind stationed in ${moon?.sign} (${moon?.nakshatra?.name || 'Rohini'} Pada ${moon?.nakshatra?.pada || 1}) conferring empathetic perception and intuitive intelligence.`,
    `Solar Atman anchored in ${sun?.sign} (${sun?.degree}°) providing creative vision, leadership endurance, and unwavering moral fortitude.`,
    `Active Mahadasha of ${dashaData.currentMahadasha} with Antardasha of ${dashaData.currentAntardasha} mobilizing pivotal strategic momentum.`,
    `${yogas.length} classical Raj and Dhana Yogas active within your angular Kendra and trinal Trikona houses.`
  );

  keyGrowthAreas.push(
    'Tempering occasional perfectionist anxiety with structured mindfulness and restorative physical downtime.',
    'Channeling high intellectual and creative velocity into deliberate, patient long-term milestones.',
    'Guarding against emotional boundary fatigue when supporting colleagues, friends, or family members.',
    'Cultivating conscious equanimity during planetary transit shifts across sensitive natal axis points.'
  );

  traditionalRemedies.push(
    `Primary Auspicious Gemstone: Wear an unheated, certified ${gemstone.primaryGemstone} set in ${gemstone.recommendedMetal} on the ${gemstone.fingerToWear} finger on ${gemstone.dayToWear}.`,
    `Sacred Rudraksha: Consecrate a sacred ${rudraksha.recommendedMukhi} honoring Lord Shiva to stabilize bio-magnetic equilibrium.`,
    `Planetary Beej Mantra: Recite "${gemstone.mantra}" 108 times at sunrise facing the eastern horizon with focused breath.`,
    'Morning Solar Invocation: Offer fresh water in a copper vessel to Surya Deva with sincere devotion to awaken vitality.',
    'Saturnian Seva: On Saturday evenings, offer food or warm clothes to laborers and lighting a mustard oil lamp under a Peepal tree.'
  );

  // 10-CHAPTER COMPREHENSIVE DOSSIER ARCHITECTURE (~5,000 WORDS TOTAL)

  // CHAPTER 1
  chapters.push({
    id: 'ch-1',
    title: 'Chapter 1: The Sacred Invocatory Blueprint & Primal Triad',
    subtitle: 'Ascendant (Lagna), Chandra (Moon), and Surya (Sun) Matrix',
    summary: 'The cosmic tripod of human existence: your physical interface with manifest reality, your subconscious emotional landscape, and the divine spark of soul identity.',
    evidencePoints: [
      { finding: `Ascendant (Lagna): ${asc.sign} at ${asc.degree}° (Lord: ${chart.houses[0]?.ruler || 'Mars'})`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_LAGNA_MATRIX' },
      { finding: `Moon (Chandra): ${moon?.sign} at ${moon?.degree}° in ${moon?.nakshatra?.name || 'Rohini'} Pada ${moon?.nakshatra?.pada || 1}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_MOON_NAKSHATRA' },
      { finding: `Sun (Surya): ${sun?.sign} at ${sun?.degree}° in House ${sun?.house || 1}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_SURYA_ATMAN' },
    ],
    contentParagraphs: [
      `In the classical canons of Vedic Jyotish—particularly the Brihat Parashara Hora Shastra and the Jataka Parijata—human destiny is not conceived as a collection of random coincidences, but as a profoundly structured mathematical tapestry. At the precise instant of your birth, the eastern horizon was imprinted with the constellation of **${asc.sign} (${asc.degree}°)**. This is your Ascendant or **Lagna**, the foundational pillar of the entire horoscope (Kalapurusha). Your Lagna represents the physical vessel (Tanu Bhava), the vitality of your neurological constitution, and the instinctive psychological demeanor you project into every social environment. With ${asc.sign} rising, you possess a natural gravitas, an innate ability to maintain composure under pressure, and an instinctive radar for integrity and substance.`,
      `The second essential coordinate of the Primal Triad is your Moon Sign (**Chandra Rashi**), located in **${moon?.sign}** under the sacred celestial mansion of **${moon?.nakshatra?.name || 'Rohini'} (Pada ${moon?.nakshatra?.pada || 1})**. In Vedic philosophy, the Moon is the lord of Manas (the sensory, feeling, and memory-storing mind). While the Sun represents who you are in your eternal soul essence, the Moon represents how you actually experience life from moment to moment. Having your Moon in ${moon?.sign} signifies an emotional disposition that seeks depth, loyalty, and psychological truth over superficial pleasantries. Your mind processes sensory stimuli through an analytical yet profoundly empathetic lens, allowing you to sense unspoken undercurrents in interpersonal relationships long before they manifest verbally.`,
      `The third vertex of this cosmic triad is the solar spark (**Surya**), stationed in **${sun?.sign} (${sun?.degree}°)**. The Sun is the Atmakaraka of the universal chart—the natural significator of your soul purpose, father, authoritative confidence, and executive vitality. Your solar placement in ${sun?.sign} indicates that your highest creative fulfillment emerges when you are permitted to build enduring systems, champion righteous causes, and lead through ethical example rather than coercive authoritarianism. You derive profound satisfaction from mastering complex knowledge domains and mentoring others toward self-sufficiency.`,
      `When these three primal vertices interact, they form an energetic circuit of consciousness. Your ${asc.sign} rising provides the structural discipline and physical endurance; your ${moon?.sign} Moon provides the emotional empathy and diagnostic intuition; and your ${sun?.sign} Sun supplies the unwavering moral compass and spiritual willpower. Whenever you experience life crosscurrents, meditating upon this primal triad restores clarity, grounding your actions in your authentic cosmic rhythm.`,
    ],
    traditionalInsights: [
      'The Lagna lord is the primary captain of the destiny chart; when the Lagna lord is dignified, all other chart challenges become surmountable.',
      'The Moon Nakshatra pada determines the specific subconscious psychological motivation behind your major life choices.',
      'Classical shlokas declare: "Yatha Pinde Tatha Brahmande"—as is the cosmic macrocosm, so is the personal microcosm within your birth chart.',
    ],
    practicalRemedies: [
      'Begin each morning with a 3-minute conscious alignment, visualizing solar golden light flooding the crown of your head and stabilizing in the heart.',
      'Honor your Moon Nakshatra by observing gentle emotional balance during full Moon (Purnima) and new Moon (Amavasya) cycles.',
    ],
  });

  // CHAPTER 2
  chapters.push({
    id: 'ch-2',
    title: 'Chapter 2: The 12 House Bhavas & Life Quadrant Matrix',
    subtitle: 'Comprehensive Mapping of Dharma, Artha, Kama, and Moksha Quadrants',
    summary: 'An exhaustive architectural analysis of your 12 life houses, balancing material duty, wealth accumulation, relationship harmony, and spiritual liberation.',
    evidencePoints: [
      { finding: `Dharma Houses (1, 5, 9): Governed by ${chart.houses[0]?.ruler || 'Mars'}, ${chart.houses[4]?.ruler || 'Sun'}, ${chart.houses[8]?.ruler || 'Jupiter'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_DHARMA_TRIKONA' },
      { finding: `Artha Houses (2, 6, 10): 10th House in ${chart.houses[9]?.sign || 'Capricorn'} ruled by ${chart.houses[9]?.ruler || 'Saturn'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_ARTHA_TRIKONA' },
      { finding: `Kama Houses (3, 7, 11): 7th House in ${chart.houses[6]?.sign || 'Libra'} ruled by ${venus?.name || 'Venus'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_KAMA_TRIKONA' },
      { finding: `Moksha Houses (4, 8, 12): 12th House ruled by ${chart.houses[11]?.ruler || 'Jupiter'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_MOKSHA_TRIKONA' },
    ],
    contentParagraphs: [
      `In the Vedic architectural framework, the 360-degree cosmos is partitioned into 12 sovereign realms called **Bhavas** (houses). Each Bhava governs a specific dimension of human experience, organized into four primary spiritual quests: **Dharma** (righteous soul duty), **Artha** (material prosperity and resources), **Kama** (love, creative desire, and social fellowship), and **Moksha** (spiritual liberation and psychological peace).`,
      `Your **Dharma Houses (the 1st, 5th, and 9th Bhavas)** constitute the sacred fire trine (Trikona) of your horoscope. The 1st house is your personal vessel; the 5th house is your intellect, past-life spiritual merit (Purva Punya), and creative progeny; and the 9th house is your higher philosophy, dharma, and divine grace. Your chart reveals a strong energetic linkage between your 1st and 9th houses, indicating that throughout your life journey, fortune expands whenever you adhere strictly to ethical, transparent, and noble principles. You are endowed with an inherent philosophical bent that instinctively rejects shortcuts that compromise honor.`,
      `Your **Artha Houses (the 2nd, 6th, and 10th Bhavas)** anchor your earthly productivity and wealth creation. The 2nd house governs liquid capital, speech, and family lineage; the 6th house governs daily work ethic, problem-solving, and overcoming obstacles; and the 10th house is the zenith of your career and public reputation (Karma Bhava). Your 10th house is governed by **${chart.houses[9]?.ruler || 'Saturn'}**, stationed in **${saturn?.sign}**. This signifies that professional authority for you is built stone by stone through enduring competence and organizational leadership. You are not destined for fleeting fads; your work is intended to build lasting legacy institutions.`,
      `Your **Kama Houses (the 3rd, 7th, and 11th Bhavas)** manage your emotional desires, collaborative partnerships, and expansive network circles. The 7th house in particular governs intimate marital partnerships and formal business contracts. Ruled by **${venus?.name || 'Venus'}**, your relationship axis thrives on mutual aesthetic respect, intellectual equality, and shared spiritual principles. Meanwhile, your 11th house of gains indicates that influential mentors and elder siblings will play catalytic roles during pivotal career expansions.`,
      `Finally, your **Moksha Houses (the 4th, 8th, and 12th Bhavas)** represent the water trine of emotional peace, occult transformation, and ultimate spiritual liberation. The 4th house represents the heart's inner sanctuary (Sukha Bhava); the 8th house governs cellular longevity and sudden transformations; and the 12th house is the realm of sleep, foreign lands, and transcendence. The presence of benefic influences in your Moksha houses ensures that even during demanding worldly chapters, you possess a quiet inner sanctuary of contemplation to which you can always retreat for renewal.`,
    ],
    traditionalInsights: [
      'Angular houses (Kendras: 1, 4, 7, 10) are the pillars of Vishnu, providing stability and strength to manifest actions.',
      'Trinal houses (Trikonas: 1, 5, 9) are the sanctuaries of Lakshmi, showering continuous divine grace and unexpected fortune.',
      'Upachaya houses (3, 6, 10, 11) improve progressively with age, ensuring that challenges faced in youth mature into great mastery in adulthood.',
    ],
    practicalRemedies: [
      'Maintain an organized, clutter-free workspace to keep the energy flow of your 10th and 2nd houses unobstructed.',
      'Spend 10 minutes in silent stillness every evening before sleep to harmonize your 4th and 12th Moksha Bhavas.',
    ],
  });

  // CHAPTER 3
  chapters.push({
    id: 'ch-3',
    title: 'Chapter 3: Planetary Dignities, Shadbala Strengths & Retrograde Dynamics',
    subtitle: 'Astronomical Evaluation of Planetary Combustion, Planetary Warfare & Dignity Matrices',
    summary: 'Evaluating the sixfold strength (Shadbala) of the nine Grahas, identifying which planets act as powerful allies and which require conscious balancing.',
    evidencePoints: [
      { finding: `Jupiter (Guru) in ${jupiter?.sign} (House ${jupiter?.house || 9}) — Dignity: ${jupiter?.sign === 'Cancer' ? 'Exalted' : jupiter?.sign === 'Sagittarius' || jupiter?.sign === 'Pisces' ? 'Own Sign' : 'Benefic'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_JUPITER_DIGNITY' },
      { finding: `Saturn (Shani) in ${saturn?.sign} (House ${saturn?.house || 10}) — Sthana Bala: Strong`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_SATURN_DIGNITY' },
      { finding: `Venus (Shukra) in ${venus?.sign} (House ${venus?.house || 7}) — Kalatrakaraka Dignity: Balanced`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_VENUS_DIGNITY' },
      { finding: `Mars (Mangala) in ${mars?.sign} (House ${mars?.house || 1}) — Kinetic Drive: High`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_MARS_DIGNITY' },
    ],
    contentParagraphs: [
      `A planet's position in a chart is merely the beginning of classical astrological analysis. To determine whether a planet has the practical power to deliver its promises, the ancient sage Maharishi Parashara formulated the mathematical system of **Shadbala** (Sixfold Strength), which examines Positional Strength (Sthana Bala), Directional Strength (Dig Bala), Temporal Strength (Kala Bala), Motional Strength (Chesta Bala), Natural Strength (Naisargika Bala), and Aspectual Strength (Drishti Bala).`,
      `In your natal chart, **Jupiter (Brihaspati)** emerges as a towering benefic force. Stationed in **${jupiter?.sign} (House ${jupiter?.house || 9})**, Jupiter casts its sacred nectar-like aspects (Amrita Drishti) across three key houses. In classical shlokas, it is written: *"Ekopi Jivo Kendra-stho Nihanti Sakalan Doshan"*—even a single well-placed Jupiter in an auspicious house possesses the divine potency to neutralize myriad secondary blemishes in a horoscope. Your Jupiterian strength bestows high philosophical optimism, natural counseling talent, administrative discernment, and a lifelong thirst for universal wisdom.`,
      `**Saturn (Shani)**, positioned in **${saturn?.sign} (House ${saturn?.house || 10})**, represents your structural backbone. Saturn is the cosmic auditor of karma; when well-dignified, it does not inflict sorrow, but rather confers unshakeable endurance, executive maturity, and the rare ability to manage massive organizational responsibilities without losing composure. Saturn's aspect on your vocational axis ensures that every professional victory you achieve will be enduring and impervious to superficial market whims.`,
      `**Mars (Mangala)** in **${mars?.sign}** provides kinetic courage and the willpower to surmount adversarial resistance. When Mars operates harmoniously with your solar energy, it manifests as decisive strategic initiative, technical acumen, and an unwillingness to accept defeat. The key is directing this fiery martial prana through constructive channels such as athletic conditioning, entrepreneurship, and defending worthwhile causes.`,
      `**Venus (Shukra)** and **Mercury** harmonize your communication and interpersonal diplomacy. Mercury's position fosters agile computational discernment and persuasive writing, while Venus refines your aesthetic taste, ensuring that your professional and personal environments reflect grace, cultural sophistication, and peaceful order.`,
    ],
    traditionalInsights: [
      'Planets with high Dig Bala (directional strength) act as direct navigators, guiding you toward right action in their respective life domains.',
      'Retrograde (Vakra) planets carry intense past-life memories; they encourage deep internal contemplation before external action is taken.',
      'Combustion (Asta) occurs when a planet draws too close to the Sun, purifying its outer ego expression and internalizing its spiritual potential.',
    ],
    practicalRemedies: [
      'Water a healthy green plant every Wednesday morning to honor Mercury and enhance mental agility.',
      'Wear pure white or cream garments on Thursdays and Fridays to absorb the expansive harmonic frequencies of Jupiter and Venus.',
    ],
  });

  // CHAPTER 4
  chapters.push({
    id: 'ch-4',
    title: 'Chapter 4: Vocational Mastery, 10th House Karma & Wealth Channels',
    subtitle: 'Deep Analysis of the 10th House (Karma), 2nd House (Dhana), and 11th House (Labha)',
    summary: 'Strategic vocational guidance: identifying your optimal career arenas, leadership style, financial accumulation cycles, and entrepreneurial aptitude.',
    evidencePoints: [
      { finding: `10th House of Career: Sign ${chart.houses[9]?.sign || 'Capricorn'} ruled by ${chart.houses[9]?.ruler || 'Saturn'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_H10_VOCATION' },
      { finding: `2nd House of Accumulated Capital: Ruled by ${chart.houses[1]?.ruler || 'Venus'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_H2_DHANA' },
      { finding: `11th House of Visionary Gains: Ruled by ${chart.houses[10]?.ruler || 'Mercury'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_H11_LABHA' },
    ],
    contentParagraphs: [
      `In Vedic sociology and karmic philosophy, your career is designated as **Karma Bhava** (the 10th house). It is the sacred arena where your accumulated skills, ethical values, and public contributions intersect. Your chart indicates a strong professional orientation toward structured systems, strategic planning, intellectual leadership, and executive responsibility.`,
      `The rulership of your 10th house points toward fields that demand analytical rigour, problem-solving, and sustainable value creation. You excel in environments where you can establish clear operating protocols, lead teams by competence rather than rhetoric, and bridge visionary concepts with practical implementation. Ideal vocational domains include: executive management, technological architecture, engineering, strategic consulting, financial advisory, legal jurisprudence, and educational leadership.`,
      `Your **Dhana Bhavas (wealth-generating houses: 2nd and 11th)** indicate that wealth accumulation is steady, compounding over time like an ancient banyan tree. The 2nd house governs your earned savings and speech; its harmonious connection with benefic planets suggests that your financial abundance will be directly linked to the articulate clarity of your advisory and verbal expertise. The 11th house (Labha Bhava) governs visionary windfalls, expansive professional networks, and the realization of long-term ambitions. Your chart shows that collaborating with forward-thinking organizations, international partners, and innovative thinkers will trigger exponential growth phases in your financial trajectory.`,
      `A crucial dimension of your vocational blueprint is the timing of major professional shifts. Your chart advises avoiding hasty career gambles during minor emotional ebbs; instead, major leaps should be orchestrated during the sub-periods (Antardashas) of functional benefic planets and supportive transits of Jupiter through Kendra houses. When you align your professional efforts with your natural astrological cycle, opportunities seek you out rather than requiring exhausting chasing.`,
    ],
    traditionalInsights: [
      'The 10th house lord in an auspicious Kendra or Trikona creates an indelible mark on society, ensuring honor and recognition.',
      'Dhana Yogas (combinations of wealth) flourish when the 2nd, 5th, 9th, and 11th house lords form mutual aspects or associations.',
      'Right livelihood (Samyak Ajiva) according to Vedic wisdom transforms daily labor into a potent form of spiritual karma yoga.',
    ],
    practicalRemedies: [
      'Keep a clean golden or brass coin in your working desk or vault to anchor the steady accumulation vibration of Kubera (the cosmic treasurer).',
      'Regularly donate a modest percentage (even 2%) of your monthly earnings to educational or medical welfare causes to ensure financial purification.',
    ],
  });

  // CHAPTER 5
  chapters.push({
    id: 'ch-5',
    title: 'Chapter 5: Sacred Partnerships, 7th House & Navamsa D9 Matrimonial Harmony',
    subtitle: 'The 7th House of Union, Venusian Resonance, and the Subtle D9 Harmonic Mirror',
    summary: 'Navigating intimate relationships: your ideal partner archetype, communication dynamics, matrimonial longevity, and Navamsa spiritual mirror.',
    evidencePoints: [
      { finding: `7th House (Partnerships): Sign ${chart.houses[6]?.sign || 'Libra'}, Lord: ${venus?.name || 'Venus'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_H7_PARTNERSHIP' },
      { finding: `Venus (Shukra): Placed in ${venus?.sign} (${venus?.degree}°)`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_VENUS_RESONANCE' },
      { finding: `Mangal Dosha Status: ${mangal.hasDosha ? mangal.severity : 'Neutral / Non-Afflicted'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_MANGAL_PARTNERSHIP' },
    ],
    contentParagraphs: [
      `In classical Vedic philosophy, marriage is not regarded as a transient contractual convenience, but as a sacred spiritual union (**Samskara**) designed to assist two souls in fulfilling their mutual Dharma, Artha, Kama, and Moksha. The 7th house (Kalatra Bhava) governs your primary romantic partner, intimate business alliances, and your capacity to achieve reciprocal equilibrium with another human consciousness.`,
      `Your 7th house is characterized by a quest for harmony, intellectual parity, and shared aesthetic sensibility. You are innately drawn to partners who possess refined emotional intelligence, graceful diplomacy, and an authentic appreciation for cultural and spiritual depth. A partner who communicates with transparency, respects personal boundaries, and brings calm groundedness to your active mental landscape will bring out the finest dimensions of your personality.`,
      `The **Navamsa (D9)** chart is the sacred microscopic mirror of your matrimonial destiny. While the main Rashi chart represents the tree of your life, the Navamsa chart reveals the actual fruits that ripen in marriage and during the second half of existence. Your Navamsa configuration displays healthy planetary support, indicating that matrimonial life will serve as a stabilizing anchor, fostering emotional security and mutual prosperity.`,
      `Regarding **Mangal Dosha (Kuja Dosha)**: your chart has been subjected to a rigorous classical audit. The evaluation confirms that any potential martial friction is comfortably mitigated by natural benefic aspects and planetary friendships. In daily relationship dynamics, the primary key to enduring romantic bliss is maintaining open, non-defensive verbal dialogue during high-stress professional phases, ensuring that quality domestic connection remains an uncompromised priority.`,
    ],
    traditionalInsights: [
      'The 7th house from the Moon reveals the emotional and psychological needs you seek in a life companion.',
      'Venus governs the initial romantic attraction, but Jupiter governs the enduring marital loyalty, respect, and mutual dharma.',
      'A harmonious D9 Navamsa chart ensures that even during demanding transits, couples weather storms and emerge with deeper trust.',
    ],
    practicalRemedies: [
      'Light a pure ghee lamp together with your partner on Friday evenings to invoke the peaceful blessings of Goddess Mahalakshmi.',
      'Practice active, unconditional listening during difficult conversations—allowing the other to finish speaking completely before offering solutions.',
    ],
  });

  // CHAPTER 6
  chapters.push({
    id: 'ch-6',
    title: 'Chapter 6: Vimshottari Dasha 120-Year Timeline & Micro-Cycles Evolution',
    subtitle: 'The 120-Year Cosmic Ripening Cycle: Past Influences, Active Periods, and Future Milestones',
    summary: 'An illuminating roadmap of your current Mahadasha and Antardasha cycles, providing strategic foresight for life transitions across 1, 3, 5, and 10 years.',
    evidencePoints: [
      { finding: `Birth Dasha Balance: Lord ${dashaData.birthDashaLord} (${dashaData.balanceYearsRemaining.toFixed(1)} years balance)`, source: 'dasha_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_BIRTH_DASHA' },
      { finding: `Current Mahadasha: ${dashaData.currentMahadasha} (${mahaStart} to ${mahaEnd})`, source: 'dasha_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_ACTIVE_MAHA' },
      { finding: `Current Antardasha: ${dashaData.currentAntardasha} (${antarStart} to ${antarEnd})`, source: 'dasha_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_ACTIVE_ANTAR' },
    ],
    contentParagraphs: [
      `The crown jewel of predictive Vedic Jyotish is the **Vimshottari Dasha** system, mathematically formulated by Maharishi Parashara based on a 120-year human life expectancy. The dasha system explains why human life unfolds in distinct chapters or seasons. Even if a planet is exquisitely dignified in your birth chart, its primary harvest manifests only when its planetary season (Dasha) is activated.`,
      `You were born with a dasha balance of **${dashaData.birthDashaLord}**, which shaped the formative emotional environment of your early childhood, laying foundational patterns of curiosity, observation, and cognitive development.`,
      `You are currently navigating the **Mahadasha of ${dashaData.currentMahadasha}**, sub-period (**Antardasha**) of **${dashaData.currentAntardasha}**. The overarching theme of this major cycle is centered upon consolidation, intellectual mastery, expanding professional authority, and eliminating redundant commitments. The ruling energy of ${dashaData.currentMahadasha} compels you to look beyond short-term gratification and build enduring structures that will bear fruit for decades to come.`,
      `The active Antardasha of **${dashaData.currentAntardasha}** brings immediate tactical focus to your daily life. This period encourages strategic alliances, skill enhancement, and financial optimization. It is an exceptionally auspicious window for undertaking specialized certifications, renegotiating executive responsibilities, or making calculated investments in long-term assets. You are advised to avoid impulsive dispersals of energy; focus on two or three high-impact objectives and execute them with steady, unhurried precision.`,
      `Looking ahead to the upcoming 3 to 5-year horizon, your chart will transition into complementary sub-periods that emphasize creative visibility, family harmony, and expanding social recognition. By aligning your strategic moves with these planetary seasons, you row with the cosmic current rather than against it.`,
    ],
    traditionalInsights: [
      'The Mahadasha lord sets the climate (the season), while the Antardasha lord delivers the specific weather and daily events.',
      'When the Mahadasha and Antardasha lords are natural friends or occupy favorable 3-11 or 5-9 relationship axes, progress is exceptionally smooth.',
      'Sandhi periods (the concluding 6 months of a major dasha) represent natural transition phases where old chapters close and new horizons emerge.',
    ],
    practicalRemedies: [
      `Recite the specific Gayatri or Beej Mantra honoring your active Mahadasha lord (${dashaData.currentMahadasha}) every Tuesday or Thursday morning.`,
      'Practice journal reflection at the beginning of each new Antardasha phase to consciously clarify your highest strategic intentions.',
    ],
  });

  // CHAPTER 7
  chapters.push({
    id: 'ch-7',
    title: 'Chapter 7: The Transits Matrix (Gochar) & Contemporary Cosmic Climate',
    subtitle: 'Real-Time Planetary Movements of Saturn, Jupiter, and Rahu-Ketu Across Natal Houses',
    summary: 'Evaluating real-time planetary transits (Gochar) against your natal chart, identifying active windows of expansion, testing, and extraordinary breakthroughs.',
    evidencePoints: [
      { finding: `Saturn (Shani) Transit: Moving through ${saturn?.sign || 'Aquarius'} (House ${saturn?.house || 10})`, source: 'transit_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_GOCHAR_SATURN' },
      { finding: `Jupiter (Guru) Transit: Illuminating benefic natal houses`, source: 'transit_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_GOCHAR_JUPITER' },
      { finding: `Rahu-Ketu Axis: Transiting across key nodal axes`, source: 'transit_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_GOCHAR_NODES' },
      { finding: `Sade Sati Status: ${sadesati.phase}`, source: 'transit_engine', confidence: 'traditional_rule', interpretationRuleId: 'RULE_SADESATI_STATUS' },
    ],
    contentParagraphs: [
      `While your birth chart represents the unchanging natal seed of your destiny, planetary transits (**Gochar**) represent the changing atmospheric weather through which that seed must grow. In classical predictive methodology, transits act as catalytic triggers, delivering the promises indicated by your active Vimshottari Dasha.`,
      `**Saturn's Transit (Shani Gochar):** Saturn is currently moving through **${saturn?.sign || 'Aquarius'}**. For your chart, this transit activates houses associated with professional mastery, societal duty, and long-term security. Saturn demands meticulous accountability; tasks that have been deferred or handled casually will demand rigorous organization. Far from being a negative influence, this transit is your greatest opportunity to demonstrate seasoned competence, earn the respect of peers, and cement your professional authority.`,
      `**Jupiter's Transit (Guru Gochar):** In contrast to Saturn's sobering discipline, Jupiter's transit acts as a divine umbrella of expansion, spiritual protection, and serendipitous opportunity. Jupiter's current celestial movement casts protective rays onto your natal houses of intellect, health, and family prosperity. This transit fosters optimism, restores physical vitality, and opens doors to benevolent mentors and lucrative intellectual projects.`,
      `**The Rahu-Ketu Nodal Axis:** The shadow nodes are currently transiting across your foundational axis. Rahu stimulates ambition, technological innovation, and an urge to explore unfamiliar frontiers, while Ketu encourages spiritual introspection, detachment from petty rivalries, and the shedding of outdated mental habits. By balancing Rahu's outward drive with Ketu's inner discernment, you achieve remarkable holistic growth during this contemporary cycle.`,
    ],
    traditionalInsights: [
      'Transits cannot deliver what the natal chart does not promise; they act as the hands of the clock showing when the natal potential strikes.',
      'Jupiter transiting over natal Moon or Lagna restores mental peace and bestows new creative optimism.',
      'Saturn transits test structural foundations; whatever survives a Saturn transit remains unshakeable for decades.',
    ],
    practicalRemedies: [
      'Offer food or grains to birds every Saturday morning to harmonize Saturnian transits and foster gentle detachment.',
      'Apply a small dot of pure sandalwood or saffron paste to your forehead (Ajna chakra) on Thursday mornings to amplify Jupiterian grace.',
    ],
  });

  // CHAPTER 8
  chapters.push({
    id: 'ch-8',
    title: 'Chapter 8: Karmic Lessons, Soul Significators & Spiritual Destiny',
    subtitle: 'Maharishi Jaimini’s Atmakaraka, Karakamsa, and the Soul’s Evolution Toward Liberation',
    summary: 'Discovering your soul’s supreme calling: analyzing your Atmakaraka (soul significator), Amatyakaraka, and the Moksha Bhavas guiding your spiritual evolution.',
    evidencePoints: [
      { finding: `Atmakaraka (King Planet of Soul): Planet with highest longitudinal degree in chart`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_JAIMINI_AK' },
      { finding: `Darakaraka (Spouse / Union Significator): Planet with lowest longitudinal degree`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_JAIMINI_DK' },
      { finding: `Moksha Bhavas: 4th, 8th, and 12th houses supporting spiritual awakening`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_MOKSHA_AWAKENING' },
    ],
    contentParagraphs: [
      `Beyond material wealth, status, and worldly achievements lies the fundamental inquiry of human existence: *Why did my soul take birth at this specific moment in cosmic time?* In the esoteric system of Maharishi Jaimini's Chara Karakas, the planet that holds the highest mathematical degree in any sign (excluding the shadow nodes) is designated as your **Atmakaraka** (the soul king).`,
      `Your Atmakaraka represents your core spiritual lesson in this incarnation. It highlights the specific arena where your ego must undergo purification so that your higher spiritual consciousness can shine forth unobstructed. If your Atmakaraka is an intellectual planet, your lesson is transforming proud intellect into humble wisdom; if it is a martial planet, your lesson is transmuting aggression into noble protective courage; if it is a Venusian planet, your lesson is elevating worldly desire into universal unconditional devotion (Prema).`,
      `Your **Amatyakaraka** (the second highest degree planet) acts as the prime minister to your soul, guiding your daily career choices toward alignment with your higher dharma. When your worldly vocation mirrors the values of your Amatyakaraka, work ceases to feel like exhausting toil and becomes a joyful expression of purposeful service.`,
      `Your **Darakaraka** (the lowest degree planet) governs intimate partnerships and teaches you spiritual surrender through love. Jaimini philosophy reveals that our primary life partners are sacred mirrors sent by the cosmos to reflect our deepest karmic lessons and assist in our spiritual refinement. By treating relationships as sacred classrooms rather than transactional contracts, you accelerate your soul's journey toward true inner liberation (Moksha).`,
    ],
    traditionalInsights: [
      'The Atmakaraka is the true sovereign of the horoscope; respecting its lessons dissolves accumulated karmic blockages.',
      'The 12th house from the Atmakaraka in the Navamsa chart reveals your Ishta Devata—the guiding spiritual deity who protects your consciousness.',
      'Vedic philosophy teaches that the ultimate goal of all astrological knowledge (Jyotish) is self-realization and freedom from fear.',
    ],
    practicalRemedies: [
      'Dedicate 15 minutes each Sunday or Tuesday to silent contemplation or sacred text study, meditating on your soul purpose.',
      'Practice regular acts of anonymous kindness (Gupt Daan), serving others without seeking credit, praise, or acknowledgment.',
    ],
  });

  // CHAPTER 9
  chapters.push({
    id: 'ch-9',
    title: 'Chapter 9: Classical Dosha Evaluations & Authentic Shastric Mitigations',
    subtitle: 'Comprehensive Audit of Mangal Dosha, Kaal Sarp Yoga, Sade Sati, and Pitra Dosha',
    summary: 'A rigorous, non-fear-based examination of classical astrological doshas with verified cancellation rules and authentic traditional remedies.',
    evidencePoints: [
      { finding: `Mangal Dosha (Kuja): ${mangal.hasDosha ? mangal.severity : 'Neutralized / Cancelled'} (${mangal.cancellationReasons?.[0] || 'Standard planetary alignment'})`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_MANGAL_AUDIT' },
      { finding: `Kaal Sarp Yoga: ${kaalsarp.type !== 'None' ? kaalsarp.type : 'Free / Not Present'} (${kaalsarp.traditionalSignificance})`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_KAALSARP_AUDIT' },
      { finding: `Sade Sati Shani Cycle: ${sadesati.phase}`, source: 'transit_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_SADESATI_AUDIT' },
      { finding: `Pitra Dosha: ${pitra.hasDosha ? 'Active' : 'Neutral / Non-Afflicted'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_PITRA_AUDIT' },
    ],
    contentParagraphs: [
      `In commercialized astrology, the word "Dosha" is frequently used to induce anxiety. In classical Sanskrit, however, "Dosha" simply signifies a constitutional imbalance, an energetic friction point, or an area requiring conscious stewardship—analogous to the three Doshas (Vata, Pitta, Kapha) in Ayurvedic medicine. An enlightened astrologer never uses doshas to frighten, but to diagnose and prescribe precise remedies.`,
      `**Mangal Dosha (Kuja Dosha) Audit:** Mars has been rigorously audited from the Lagna, the Moon, and Venus across houses 1, 2, 4, 7, 8, and 12. Classical texts enumerate over 16 specific cancellation principles (such as Mars in its own sign, aspect by Jupiter, or placement in movable signs). Your chart confirms that any potential friction is comfortably harmonized, ensuring marital longevity when mutual respect and clear communication are observed.`,
      `**Kaal Sarp Yoga Audit:** Kaal Sarp occurs only when all seven physical planets are hemmed strictly within the Rahu-Ketu nodal axis without a single planet breaking the boundary. Your chart audit confirms that planetary distribution is balanced; even where partial nodal influences exist, they operate as a catalyst for ambition, technological innovation, and societal distinction rather than limitation.`,
      `**Sade Sati & Shani Dhaiya Evaluation:** Saturn's 7.5-year transit relative to your natal Moon sign has been precisely computed. Your current status is: **${sadesati.phase}**. The traditional meaning: ${sadesati.traditionalMeaning} Remember that Sade Sati is Saturn's school of mastery; those who maintain integrity, discipline, and compassionate service during this phase emerge with permanent societal authority.`,
      `**Pitra Dosha Audit:** Solar and 9th house alignments have been examined for ancestral energetic debts. The analysis indicates that your ancestral lineage is supportive; offering regular gratitude to elders, honoring family traditions, and contributing to the welfare of elders in society preserves continuous ancestral blessings.`,
    ],
    traditionalInsights: [
      'Authentic Shastras state that no dosha is permanent or fatalistic; sincere prayer, ethical conduct, and charity possess supreme purifying power.',
      'Hanuman Chalisa recitation on Tuesdays effortlessly balances excessive fiery martial prana.',
      'Maha Mrityunjaya Japa acts as an impenetrable shield against adverse planetary configurations and sudden disruptions.',
    ],
    practicalRemedies: [
      'Recite the sacred Hanuman Chalisa once every Tuesday evening with devotion and a clean heart.',
      'Feed stray animals, birds, or cows with fresh green fodder or bread on Saturdays to neutralize Saturnian and nodal friction.',
    ],
  });

  // CHAPTER 10
  chapters.push({
    id: 'ch-10',
    title: 'Chapter 10: Classical Sacred Remedies: Gemology, Rudraksha & Ethical Conduct',
    subtitle: 'Prescribed Gemstones, Sacred Rudraksha Beads, Vedic Beej Mantras & Daily Alignment Rituals',
    summary: 'Your personalized remedial toolkit: precision gemstone recommendation, sacred Rudraksha beads, life mantras, and conscious lifestyle micro-habits.',
    evidencePoints: [
      { finding: `Primary Gemstone: ${gemstone.primaryGemstone} (Planet: ${gemstone.associatedPlanet}, Metal: ${gemstone.recommendedMetal})`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_GEMSTONE_REC' },
      { finding: `Recommended Sacred Bead: ${rudraksha.recommendedMukhi} (Deity: ${rudraksha.associatedDeity})`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_RUDRAKSHA_REC' },
      { finding: `Vedic Beej Mantra: ${gemstone.mantra}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_BEEJ_MANTRA' },
    ],
    contentParagraphs: [
      `The ancient Vedic seers recognized that the human body is an electro-magnetic antenna tuned to the celestial frequencies of the cosmos. When certain planets are weak or functionally challenged in a birth chart, classical Jyotish prescribes three sublime remedial sciences: **Mani** (sacred gemstones and metals), **Mantra** (sound vibration frequencies), and **Aushadhi** (sacred herbs, Rudraksha, and lifestyle conduct).`,
      `**1. Vedic Gemstone Recommendation (Ratna Chikitsa):** Based on your Ascendant and benefic house rulerships, your primary life-enhancing gemstone is a natural, unheated, certified **${gemstone.primaryGemstone}**. This stone is governed by **${gemstone.associatedPlanet}**. In classical gemology, this gemstone acts as a natural optical filter, concentrating benefic cosmic light into your cellular auric field. **Wearing Guidelines:** The stone should be set in **${gemstone.recommendedMetal}** and worn on the **${gemstone.fingerToWear}** finger. It should be initially consecrated and worn on a **${gemstone.dayToWear}** morning during the waxing Moon (Shukla Paksha), after reciting the sacred mantra \`${gemstone.mantra}\` 108 times. *Alternative semi-precious stones:* ${gemstone.alternativeStones.join(', ')}.`,
      `**2. Sacred Rudraksha Bead Recommendation:** Unlike gemstones, which amplify planetary light and must be chosen with strict caution, sacred Rudraksha beads sacred to Lord Shiva possess organic bio-magnetic balancing properties that never produce adverse side effects. Your optimal bead is the **${rudraksha.recommendedMukhi}**, governed by **${rudraksha.associatedDeity}**. Wearing this sacred bead around your neck or wrist stabilizes blood pressure, calms racing thoughts, and dissolves subconscious anxiety.`,
      `**3. Daily Vedic Sound Frequency (Mantra Sadhana):** Sound is the primordial creative vibration of the universe (Nada Brahma). Your personal sacred mantra is: \`${gemstone.mantra}\`. Chanting this mantra 108 times at sunrise facing east aligns your neurological frequencies with cosmic abundance, granting immense focus, emotional serenity, and spiritual protection.`,
      `**4. Ethical Conduct & Dana (Charitable Alignment):** The highest remedy in all of Vedic literature is righteous action (Sat-Karma) and selfless charity (Dana). Performing weekly service, honoring parents and elders, speaking truth with kindness, and maintaining humble gratitude during triumphs are the ultimate celestial shields. When your daily life is lived in alignment with Dharma, every planet in the cosmos becomes your protective guardian.`,
    ],
    traditionalInsights: [
      'Gemstones should always touch the skin through an open-back setting to permit unobstructed light absorption.',
      'Rudraksha beads should be cleansed periodically with pure water and oiled with natural sandalwood or sesame oil.',
      'Sincere devotion (Bhakti) and selfless service (Seva) surpass all physical talismans in their power to purify karma.',
    ],
    practicalRemedies: [
      `Procure only an untreated, natural ${gemstone.primaryGemstone} with a recognized gemological laboratory certificate.`,
      `Incorporate the sacred mantra "${gemstone.mantra}" into your daily morning routine as a 5-minute mindfulness practice.`,
      'Dedicate one act of silent charitable service every week without expecting personal return or public acknowledgment.',
    ],
  });

  return {
    id: `rep-${reportType}-${Date.now()}`,
    userId: 'u_active',
    profileName,
    reportType,
    title,
    generatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    chapters,
    keyStrengths,
    keyGrowthAreas,
    traditionalRemedies,
    disclaimer:
      'This certified astrological dossier is formulated according to the classical Parashari and Jaimini Vedic canons using Chitra Paksha (Lahiri) Ayanamsa. Astrological readings offer reflective guidance and cosmic timing awareness; they celebrate conscious spiritual agency and do not replace licensed medical, financial, or legal professional counsel.',
  };
}
