import { AstrologyReport, NatalChart, ReportChapter, ReportEvidence, ReportType } from '@/types';
import { calculateMangalDosha, calculateKaalSarpDosha, calculateSadeSati, calculatePitraDosha } from './doshas';
import { detectChartYogas } from './yogas';
import { recommendGemstone } from './remedies';
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
  const mangal = calculateMangalDosha(chart);
  const kaalsarp = calculateKaalSarpDosha(chart);
  const sadesati = calculateSadeSati(moon?.sign || 'Taurus', saturn?.sign || 'Aquarius');
  const pitra = calculatePitraDosha(chart);
  const yogas = detectChartYogas(chart);
  const gemstone = recommendGemstone(chart);

  let title = 'Comprehensive Astrological Report';

  // 1. LIFE INSIGHTS REPORT
  if (reportType === 'life-insights') {
    title = 'Life Insights & Cosmic Blueprint Report';
    keyStrengths.push(
      `Strong Lagna in ${asc.sign} conferring resilient vitality and outward authenticity.`,
      `Moon placed in ${moon?.sign} (${moon?.nakshatra?.name}) providing deep emotional insight.`,
      `Active Mahadasha of ${dashaData.currentMahadasha} supporting focused life evolution.`
    );
    keyGrowthAreas.push(
      'Channeling intense mental energy into steady daily routines.',
      'Balancing high professional ambitions with restorative domestic downtime.'
    );
    traditionalRemedies.push(
      'Morning Sun salutations (Surya Namaskar) facing east.',
      'Wearing natural cotton or silk colors matching your planetary day.',
      `Reciting the Gayatri Mantra or ${gemstone.mantra}.`
    );

    chapters.push(
      {
        id: 'ch-1',
        title: 'Chapter 1: Foundational Archetype & Primal Triad',
        subtitle: 'Sun, Moon, and Ascendant Matrix',
        summary: 'Your primal triad anchors your outward vitality, inner emotional landscape, and physical interface with the world.',
        evidencePoints: [
          { finding: `Sun in ${sun?.sign} (${sun?.degree}°)`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_SUN_SIGN' },
          { finding: `Moon in ${moon?.sign} (${moon?.nakshatra?.name} Pada ${moon?.nakshatra?.pada})`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_MOON_NAK' },
          { finding: `Ascendant (Lagna) in ${asc.sign} (${asc.degree}°)`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_LAGNA_DEG' },
        ],
        contentParagraphs: [
          `Your solar essence is anchored in **${sun?.sign}**, reflecting your creative vitality and core life direction. This placement inspires you to lead by example and build enduring integrity into all your undertakings.`,
          `Your lunar mind resides in **${moon?.sign}** under the sacred constellation of **${moon?.nakshatra?.name} (Pada ${moon?.nakshatra?.pada})**. In classical Jyotish, this indicates a mind capable of deep sensitivity, quick intuitive discernment, and loyalty to authentic relationships.`,
          `Your rising sign (Lagna) of **${asc.sign}** shapes how you spontaneously engage with new surroundings, projecting poise, natural presence, and a grounded demeanor.`,
        ],
        traditionalInsights: [
          'The Ascendant lord acts as the primary captain of your destiny chart.',
          'Nakshatra padas reveal the subconscious psychological motivation of your decision-making.',
        ],
      },
      {
        id: 'ch-2',
        title: 'Chapter 2: Vocational Mastery & Dhana Bhavas',
        subtitle: 'Career, Enterprise, and Wealth Flow',
        summary: 'Analysis of the 10th house of career, 2nd house of accumulated wealth, and 11th house of visionary gains.',
        evidencePoints: [
          { finding: `10th House ruler: ${chart.houses.find((h) => h.house === 10)?.ruler || 'Mercury'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_H10_RULER' },
          { finding: `Saturn placed in ${saturn?.sign} (House ${saturn?.house})`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_SATURN_HOUSE' },
        ],
        contentParagraphs: [
          `Your career axis is governed by the tenth house, which highlights professional mastery through structured systems, domain expertise, and executive accountability.`,
          `Saturn’s placement in **${saturn?.sign} (House ${saturn?.house})** suggests that early career efforts require patient perseverance. Rewards, authority, and public distinction accumulate steadily over time rather than through overnight shortcuts.`,
        ],
        traditionalInsights: [
          'Tenth house lords associated with benefic planets produce honorable public prestige.',
          'Saturnian discipline ensures that accomplishments gained later in life remain unshakeable.',
        ],
      },
      {
        id: 'ch-3',
        title: 'Chapter 3: Timing & Vimshottari Dasha Cycles',
        subtitle: 'Current Planetary Season & Life Phase',
        summary: 'Understanding the cosmic tides currently shaping your opportunities and strategic decisions.',
        evidencePoints: [
          { finding: `Current Mahadasha: ${dashaData.currentMahadasha}`, source: 'dasha_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_DASHA_MAHA' },
          { finding: `Current Antardasha: ${dashaData.currentAntardasha}`, source: 'dasha_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_DASHA_ANTAR' },
        ],
        contentParagraphs: [
          `You are actively navigating the **Mahadasha of ${dashaData.currentMahadasha}** with the sub-period (**Antardasha**) of **${dashaData.currentAntardasha}**.`,
          `This planetary combination prioritizes intellectual clarity, structural refinement, and consolidating key alliances. It encourages deep focus rather than dispersed multitasking.`,
        ],
        traditionalInsights: [
          'Antardasha periods activate the specific house rulerships of both participating planets.',
        ],
      }
    );
  }

  // 2. DASHA REPORT
  else if (reportType === 'dasha') {
    title = 'Vimshottari Dasha & Life Timeline Report';
    keyStrengths.push(
      `Clear 120-year roadmap anchored in natal Moon Nakshatra (${moon?.nakshatra?.name}).`,
      `Active period of ${dashaData.currentMahadasha} - ${dashaData.currentAntardasha} creates high strategic momentum.`
    );
    keyGrowthAreas.push('Anticipating planetary shift transitions without abrupt decisions.');
    traditionalRemedies.push(
      `Dedicated meditation and mantra recitation honoring ${dashaData.currentMahadasha}.`,
      'Weekly charity or service aligned with the active Dasha lord.'
    );

    chapters.push(
      {
        id: 'dash-1',
        title: 'Current Mahadasha & Antardasha Analysis',
        summary: `Detailed examination of your active planetary cycle: ${dashaData.currentMahadasha} - ${dashaData.currentAntardasha}.`,
        evidencePoints: [
          { finding: `Birth Dasha Lord: ${dashaData.birthDashaLord}`, source: 'dasha_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_BIRTH_DASHA' },
          { finding: `Current Mahadasha: ${dashaData.currentMahadasha}`, source: 'dasha_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_ACTIVE_MAHA' },
        ],
        contentParagraphs: [
          `In classical Parashari astrology, the 120-year Vimshottari dasha system reflects how your natal consciousness unfolds across time.`,
          `The ruling frequency of **${dashaData.currentMahadasha}** sets the overarching macro theme of this life chapter, while the sub-period of **${dashaData.currentAntardasha}** governs immediate events, opportunities, and psychological focus.`,
        ],
        traditionalInsights: [
          'Planets give results according to the houses they own and occupy in the natal chart.',
        ],
      }
    );
  }

  // 3. LOVE & MARRIAGE REPORT
  else if (reportType === 'love-marriage') {
    title = 'Love, Partnership & Navamsa Marriage Report';
    keyStrengths.push(
      `Venus placed in ${venus?.sign} providing refined relational taste and natural diplomacy.`,
      `Manglik status evaluated as ${mangal.severity} with classical mitigation principles.`
    );
    keyGrowthAreas.push('Cultivating open emotional dialogue during challenging transits.');
    traditionalRemedies.push(
      'Lighting a pure ghee lamp on Friday evenings to honor Goddess Mahalakshmi.',
      'Practicing honest, weekly mutual check-ins with your partner.'
    );

    chapters.push(
      {
        id: 'love-1',
        title: 'Relational Archetypes & 7th House Dynamics',
        summary: 'Analyzing the 7th house of partnerships, Venusian resonance, and spouse characteristics.',
        evidencePoints: [
          { finding: `Venus in ${venus?.sign} (House ${venus?.house})`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_VENUS_POS' },
          { finding: `Mangal Dosha Status: ${mangal.hasDosha ? 'Active' : 'Neutral / Cancelled'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_MANGAL_STAT' },
        ],
        contentParagraphs: [
          `Your 7th house indicates a partner who brings balance, intellect, and complementary perspective to your life.`,
          `Venus in **${venus?.sign}** highlights an attraction to partners who appreciate culture, authentic sincerity, and peaceful domestic aesthetics.`,
          mangal.traditionalMeaning,
        ],
        traditionalInsights: [
          'The Navamsa D9 chart serves as the subtle spiritual mirror of matrimonial harmony.',
        ],
      }
    );
  }

  // 4. SATURN / SHANI REPORT
  else if (reportType === 'saturn') {
    title = 'Saturn Blueprint, Sade Sati & Dhaiya Report';
    keyStrengths.push(
      `Natal Saturn in ${saturn?.sign} builds endurance and long-term organizational wisdom.`,
      `Sade Sati status: ${sadesati.phase}.`
    );
    keyGrowthAreas.push('Releasing unnecessary perfectionism and cultivating patience.');
    traditionalRemedies.push(
      'Chanting "Om Sham Shanaishcharaya Namah" on Saturday evenings.',
      'Donating black sesame seeds, mustard oil, or warm blankets to those in need.'
    );

    chapters.push(
      {
        id: 'sat-1',
        title: 'Saturnian Architecture & Sade Sati Progression',
        summary: 'Deep dive into Saturn’s natal dignity, transits, and karmic life lessons.',
        evidencePoints: [
          { finding: `Natal Saturn in ${saturn?.sign} (House ${saturn?.house})`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_SAT_NATAL' },
          { finding: `Sade Sati Phase: ${sadesati.phase}`, source: 'transit_engine', confidence: 'astronomical', interpretationRuleId: 'RULE_SADESATI_PHASE' },
        ],
        contentParagraphs: [
          `Saturn represents the principle of divine time, stoic accountability, and real-world boundaries.`,
          sadesati.traditionalMeaning,
        ],
        traditionalInsights: [
          'Saturn does not punish; it purifies intent and dismantles egoic attachments to build enduring character.',
        ],
      }
    );
  }

  // 5. MANGAL DOSHA REPORT
  else if (reportType === 'mangal-dosha') {
    title = 'Mangal Dosha (Kuja Dosha) Analysis Report';
    keyStrengths.push(
      `Mars positioned in ${mars?.sign} providing dynamic drive and courageous resolve.`,
      `Dosha classification: ${mangal.severity} (${mangal.isCancelled ? 'Cancelled by classical rules' : 'Active'}).`
    );
    keyGrowthAreas.push('Directing physical and passionate energies into constructive channels.');
    traditionalRemedies.push(
      'Chanting the Hanuman Chalisa on Tuesdays.',
      'Supporting blood donation drives or sports education charities.'
    );

    chapters.push(
      {
        id: 'man-1',
        title: 'Mars Placements & Classical Cancellation Factors',
        summary: 'Assessing Mars from Lagna, Moon, and Venus with textual cancellation exemptions.',
        evidencePoints: [
          { finding: `Mars in House ${mangal.marsHouseFromLagna} from Lagna`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_MARS_LAGNA' },
          { finding: `Cancellation Status: ${mangal.isCancelled ? 'Yes' : 'No'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_MARS_CANCEL' },
        ],
        contentParagraphs: [
          mangal.traditionalMeaning,
          mangal.cancellationReasons.length > 0
            ? `Classical exemptions identified: ${mangal.cancellationReasons.join(' ')}`
            : 'No direct classical cancellations apply; traditional mindfulness in matrimonial communication is advised.',
        ],
        traditionalInsights: [
          'Mangal Dosha is fundamentally about passion and energetic assertiveness rather than fatalistic negativity.',
        ],
      }
    );
  }

  // 6. KALSARP DOSHA REPORT
  else if (reportType === 'kalsarp-dosha') {
    title = 'Kaal Sarp Yoga Comprehensive Report';
    keyStrengths.push(
      `Nodal alignment evaluated as ${kaalsarp.type}.`,
      'Promotes high resilience and focused worldly drive when channeled constructively.'
    );
    keyGrowthAreas.push('Overcoming psychological anxieties through meditative stillness.');
    traditionalRemedies.push(
      'Performing Maha Mrityunjaya Japa or meditation on Lord Shiva.',
      'Honoring serpents (Nagas) and nature spirits with milk or water offerings.'
    );

    chapters.push(
      {
        id: 'ks-1',
        title: 'Rahu-Ketu Axis & Planetary Hemispheres',
        summary: 'Evaluating the celestial distribution of classical planets relative to the lunar nodes.',
        evidencePoints: [
          { finding: `Kaal Sarp Formation: ${kaalsarp.type}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_KS_TYPE' },
          { finding: `Rahu in House ${kaalsarp.rahuHouse}, Ketu in House ${kaalsarp.ketuHouse}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_NODAL_AXIS' },
        ],
        contentParagraphs: [
          kaalsarp.traditionalSignificance,
          kaalsarp.educationalNote,
        ],
        traditionalInsights: [
          'Many historical luminaries had full Kaal Sarp formations, using its intense focus to achieve legendary world prominence.',
        ],
      }
    );
  }

  // 7. PITRA DOSHA REPORT
  else if (reportType === 'pitra-dosha') {
    title = 'Pitra Dosha & Ancestral Karma Report';
    keyStrengths.push(
      `Solar and 9th house indicators analyzed.`,
      `Status: ${pitra.hasDosha ? 'Lineage indicators active' : 'Clear / Free from affliction'}.`
    );
    keyGrowthAreas.push('Honoring generational wisdom while consciously breaking unhelpful ancestral loops.');
    traditionalRemedies.push(...pitra.classicalMitigations);

    chapters.push(
      {
        id: 'pit-1',
        title: '9th House Bhagya & Sun Affliction Analysis',
        summary: 'Investigating solar and 9th house relationships to Rahu, Ketu, and Saturn.',
        evidencePoints: [
          { finding: `Sun Affliction: ${pitra.sunAffliction ? 'Detected' : 'None'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_SUN_AFFLICTION' },
          { finding: `9th House Status: ${pitra.ninthHouseAffliction ? 'Afflicted' : 'Harmonious'}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_H9_AFFLICTION' },
        ],
        contentParagraphs: [
          pitra.traditionalGuidance,
        ],
        traditionalInsights: [
          'Pitra Dosha is regarded in sacred philosophy as an invitation to offer gratitude and service to ancestral lineages.',
        ],
      }
    );
  }

  // 8. RAJ YOGA REPORT
  else if (reportType === 'raj-yoga') {
    title = 'Raj Yoga & Royal Dignities Report';
    keyStrengths.push(
      `${yogas.length} classical Raj and Dhana Yogas detected in your natal blueprint.`,
      yogas[0] ? `Prominent yoga: ${yogas[0].name} (${yogas[0].category}).` : 'Well-balanced kendra-trikona relationships.'
    );
    keyGrowthAreas.push('Aligning personal ambitions with genuine public service and moral integrity.');
    traditionalRemedies.push(
      'Regular philanthropic contributions to educational or medical welfare causes.',
      'Honoring mentors and maintaining humility in moments of triumph.'
    );

    chapters.push(
      {
        id: 'ry-1',
        title: 'Detected Classical Yogas & Executive Dignities',
        summary: 'Scanning Kendra-Trikona, Pancha Mahapurusha, and Dhana combinations.',
        evidencePoints: yogas.map((y) => ({
          finding: `${y.name}: ${y.formationLogic}`,
          source: 'calculated_chart',
          confidence: 'traditional_rule',
          interpretationRuleId: `RULE_YOGA_${y.id.toUpperCase()}`,
        })),
        contentParagraphs: yogas.map(
          (y) =>
            `### ✦ ${y.name} (${y.sanskritName})\n**Category:** ${y.category} • **Strength:** ${y.strengthScore}/10\n\n${y.traditionalInterpretation}\n*Formation:* ${y.formationLogic}`
        ),
        traditionalInsights: [
          'Raj Yogas manifest their supreme worldly fruits during the Mahadasha and Antardasha of the participating planets.',
        ],
      }
    );
  }

  // 9. GEMSTONE REPORT
  else if (reportType === 'gemstone') {
    title = 'Personalized Vedic Gemstone & Ratna Report';
    keyStrengths.push(
      `Primary auspicious gemstone: ${gemstone.primaryGemstone} (${gemstone.associatedPlanet}).`,
      `Optimal setting: ${gemstone.recommendedMetal} worn on ${gemstone.fingerToWear}.`
    );
    keyGrowthAreas.push('Ensuring gems are unheated, untreated, and ethically sourced.');
    traditionalRemedies.push(
      `Chanting ${gemstone.mantra} 108 times before initial wearing.`,
      `Alternative non-gemstone remedy: Meditation, conscious color therapy, and planetary charity.`
    );

    chapters.push(
      {
        id: 'gem-1',
        title: 'Primary Auspicious Gemstone Analysis',
        summary: 'Scientific and traditional rationale based on Ascendant and benefic house lordship.',
        evidencePoints: [
          { finding: `Primary Gemstone: ${gemstone.primaryGemstone}`, source: 'calculated_chart', confidence: 'traditional_rule', interpretationRuleId: 'RULE_GEM_REC' },
          { finding: `Benefic Planet: ${gemstone.associatedPlanet}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_GEM_PLANET' },
        ],
        contentParagraphs: [
          gemstone.rationale,
          `**Traditional Wearing Methodology:**\n- **Metal:** ${gemstone.recommendedMetal}\n- **Finger:** ${gemstone.fingerToWear}\n- **Auspicious Timing:** ${gemstone.dayToWear}\n- **Sacred Mantra:** \`${gemstone.mantra}\``,
          `**Alternative Semi-Precious Up-Ratnas:** ${gemstone.alternativeStones.join(', ')}.`,
        ],
        traditionalInsights: [
          'Vedic gems act as natural prisms concentrating specific cosmic light spectra into the cellular auric body.',
        ],
      }
    );
  }

  // 10. VIDESH YOGA REPORT
  else if (reportType === 'videsh-yoga') {
    title = 'Videsh Yoga & Foreign Settlement Report';
    const h12 = chart.houses.find((h) => h.house === 12);
    const h9 = chart.houses.find((h) => h.house === 9);
    const rahu = chart.planets.find((p) => p.name === 'Rahu');

    keyStrengths.push(
      `12th house of overseas voyages governed by ${h12?.ruler || 'Jupiter'}.`,
      `Rahu placed in ${rahu?.sign} (House ${rahu?.house}) stimulating foreign curiosity.`
    );
    keyGrowthAreas.push('Maintaining cultural grounding while embracing international relocation.');
    traditionalRemedies.push(
      'Keeping a small vessel of Ganga Jal or native soil when traveling abroad.',
      'Honoring Lord Varuna and Lord Shiva for safe overseas travels.'
    );

    chapters.push(
      {
        id: 'vid-1',
        title: 'Overseas Travel, Relocation & 12th House Analysis',
        summary: 'Examining the 12th house (overseas stay), 9th house (long journeys), and Rahu (alien lands).',
        evidencePoints: [
          { finding: `12th House Sign: ${h12?.sign || 'Pisces'}, Ruler: ${h12?.ruler || 'Jupiter'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_H12_VIDESH' },
          { finding: `9th House (Long Voyages) Ruler: ${h9?.ruler || 'Mars'}`, source: 'calculated_chart', confidence: 'astronomical', interpretationRuleId: 'RULE_H9_TRAVEL' },
        ],
        contentParagraphs: [
          `In traditional Vedic astrology, foreign travel, long-distance education, and overseas settlement are analyzed through the 9th house (pilgrimages & long journeys), the 12th house (distant lands & foreign residence), and the nodal influence of Rahu.`,
          `Your chart displays favorable indicators for international travel and professional engagements with multinational teams, particularly during transits activating your 9th and 12th houses.`,
        ],
        traditionalInsights: [
          'Movable signs on the 9th and 12th house cusps traditionally signify frequent change of location and high mobility.',
        ],
      }
    );
  }

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
      'This report represents a structured traditional Vedic and astronomical interpretation. Astrological readings provide reflective guidance and do not constitute guaranteed outcomes or replace professional advice.',
  };
}
