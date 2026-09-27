import { ZodiacSignName } from '@/types';

export interface HoroscopeReading {
  rashi: ZodiacSignName;
  period: 'daily' | 'weekly' | 'monthly';
  headline: string;
  generalOutlook: string;
  career: string;
  finance: string;
  love: string;
  health: string;
  luckyColor: string;
  luckyNumber: number;
  favourableDirection: string;
  cosmicAdvice: string;
}

export const HOROSCOPE_THEMES: Record<
  ZodiacSignName,
  {
    symbol: string;
    ruler: string;
    daily: {
      headline: string;
      outlook: string;
      career: string;
      finance: string;
      love: string;
      health: string;
      color: string;
      number: number;
      direction: string;
    };
    weekly: {
      headline: string;
      outlook: string;
      career: string;
      finance: string;
      love: string;
      health: string;
    };
    monthly: {
      headline: string;
      outlook: string;
      career: string;
      finance: string;
      love: string;
      health: string;
    };
  }
> = {
  Aries: {
    symbol: '♈',
    ruler: 'Mars',
    daily: {
      headline: 'Dynamic Initiative & Direct Action',
      outlook: 'Planetary currents encourage swift decisiveness today. Trust your instinctive leadership without letting impatience derail negotiations.',
      career: 'A strategic project gains momentum. Speak clearly in team assemblies and propose bold solutions.',
      finance: 'Favor calculated investments over spontaneous consumer splurges.',
      love: 'Passion runs high; express your appreciation openly with spontaneous warmth.',
      health: 'Channel excess fire through brisk cardiovascular exercise or outdoor activities.',
      color: 'Crimson Red',
      number: 9,
      direction: 'East',
    },
    weekly: {
      headline: 'Expanding Horizons and Professional Authority',
      outlook: 'This week provides an ideal window to consolidate recent milestones and chart your next ambitious chapter.',
      career: 'Leadership figures recognize your dedication; negotiate with clarity and calm confidence.',
      finance: 'Review recurring expenses to build greater long-term liquidity.',
      love: 'Clear mutual expectations bring peaceful intimacy.',
      health: 'Ensure consistent hydration and restorative sleep to balance dynamic output.',
    },
    monthly: {
      headline: 'Major Vocational Breakthrough & Resource Realignment',
      outlook: 'A transformative month where sustained effort converts into tangible institutional recognition.',
      career: 'High-visibility opportunities unfold; keep your systems organized and delegate effectively.',
      finance: 'Auspicious month for structuring long-term wealth assets.',
      love: 'Deep emotional bonds solidify through authentic mutual vulnerability.',
      health: 'Incorporate regular mindfulness to temper intense physical drives.',
    },
  },
  Taurus: {
    symbol: '♉',
    ruler: 'Venus',
    daily: {
      headline: 'Grounded Stability & Sensual Receptivity',
      outlook: 'Your earthy patience brings calm clarity to chaotic surroundings today. Focus on tangible craftsmanship.',
      career: 'Methodical execution outperforms hasty shortcuts. Your reliability sets a high benchmark.',
      finance: 'Favourable for reviewing real estate, tangible commodities, or long-term savings.',
      love: 'Nurture your relationship through comforting environments, good cuisine, and quiet presence.',
      health: 'Focus on throat care, gentle stretching, and mindful breathing exercises.',
      color: 'Emerald Green',
      number: 6,
      direction: 'South',
    },
    weekly: {
      headline: 'Steady Expansion in Financial and Domestic Spheres',
      outlook: 'Consistency is your supreme superpower this week as planetary alignments reinforce steady growth.',
      career: 'Commercial diplomacy resolves a lingering team friction.',
      finance: 'Inflow of capital through steady channels; maintain prudent budget allocations.',
      love: 'A shared creative project strengthens mutual devotion.',
      health: 'Nourish your body with clean, grounding foods and restorative rest.',
    },
    monthly: {
      headline: 'Cultivating Abundance and Enduring Value',
      outlook: 'Venusian blessings expand your appreciation for authentic beauty and domestic sanctuary.',
      career: 'Long-term contracts show promising development; your patience is rewarded.',
      finance: 'Strong month for personal asset accumulation and decorative investments.',
      love: 'Harmony flourishes in committed bonds; single natives attract grounded suitors.',
      health: 'Gentle nature walks and regular massage release physical tension.',
    },
  },
  Gemini: {
    symbol: '♊',
    ruler: 'Mercury',
    daily: {
      headline: 'Agile Curiosity & Linguistic Nuance',
      outlook: 'Mental agility is at an all-time peak. Connect diverse threads of information and initiate stimulating conversations.',
      career: 'Writing, publishing, and coding projects flourish. Pitch innovative ideas with enthusiasm.',
      finance: 'Multiple small income streams or speculative insights emerge; research thoroughly before committing.',
      love: 'Playful wit and intellectual bantering spark romantic chemistry.',
      health: 'Ease nervous energy through rhythmic breathwork and screen-free evening walks.',
      color: 'Sunlight Yellow',
      number: 5,
      direction: 'North',
    },
    weekly: {
      headline: 'Dynamic Networking & Creative Convergence',
      outlook: 'A bustling week of social synergy, rapid messaging, and intellectual discovery.',
      career: 'Cross-functional collaborations yield unexpected creative breakthroughs.',
      finance: 'Favorable for digital trade, communications, and short-term commercial contracts.',
      love: 'Stimulating dialogue revitalizes long-term bonds.',
      health: 'Protect your respiratory system and practice calming evening routines.',
    },
    monthly: {
      headline: 'Curiosity Unleashed & Intellectual Mastery',
      outlook: 'Your communicative genius opens doors to prestigious publishing or educational platforms.',
      career: 'Spearhead digital marketing campaigns or media initiatives with high charisma.',
      finance: 'Diversify revenue channels through freelance or consulting avenues.',
      love: 'Honest, heartfelt conversations dissolve misunderstandings effortlessly.',
      health: 'Maintain steady meal schedules to ground mental restlessness.',
    },
  },
  Cancer: {
    symbol: '♋',
    ruler: 'Moon',
    daily: {
      headline: 'Intuitive Sanctuary & Empathic Grounding',
      outlook: 'Honor your instinctual feelings today. Creating emotional safety allows your natural creativity to bloom.',
      career: 'Supportive team diplomacy earns deep loyalty. Trust your gut feelings in personnel matters.',
      finance: 'Channel resources into domestic security, insurance, or home improvement.',
      love: 'Deep empathetic listening heals past emotional vulnerabilities between partners.',
      health: 'Nurture digestive health with soothing herbal teas and mindful nutrition.',
      color: 'Moonlit Pearl White',
      number: 2,
      direction: 'North-West',
    },
    weekly: {
      headline: 'Emotional Rejuvenation & Domestic Harmony',
      outlook: 'Lunar rhythms illuminate your private sanctuary, inviting wholesome rest and familial bonding.',
      career: 'Steer ongoing negotiations from a place of quiet strength and emotional maturity.',
      finance: 'Secure conservative savings vehicles; avoid high-volatility temptations.',
      love: 'Warm domestic dinners deepen intimate trust.',
      health: 'Incorporate water-based relaxation, such as warm baths or swimming.',
    },
    monthly: {
      headline: 'Deepening Roots & Inner Sovereignty',
      outlook: 'A nurturing month of psychological healing, family cohesion, and internal strength.',
      career: 'Recognition comes through patient mentoring and emotional intelligence in leadership.',
      finance: 'Real estate and domestic property matters proceed smoothly.',
      love: 'Profound emotional connections blossom with genuine vulnerability.',
      health: 'Prioritize restorative sleep and emotional boundary setting.',
    },
  },
  Leo: {
    symbol: '♌',
    ruler: 'Sun',
    daily: {
      headline: 'Radiant Vitality & Heartfelt Leadership',
      outlook: 'Your natural charisma illuminates any room you enter. Lead with generous nobility and empower those around you.',
      career: 'Executive presentations and public visibility tasks succeed with stellar acclaim.',
      finance: 'Auspicious for investing in tools that enhance your professional visibility.',
      love: 'Grand gestures of romantic warmth and loyalty captivate your beloved.',
      health: 'Cardiovascular wellness is highlighted; engage in joyous aerobic movement.',
      color: 'Royal Gold',
      number: 1,
      direction: 'East',
    },
    weekly: {
      headline: 'Sovereign Expression & Artistic Mastery',
      outlook: 'Solar vitality fuels your creative confidence, enabling you to inspire peers with effortless elegance.',
      career: 'Take the center stage in high-stakes strategy meetings; your vision is contagious.',
      finance: 'Favorable revenue flow from creative or entrepreneurial endeavors.',
      love: 'Romance sparkles with dramatic affection and shared celebrations.',
      health: 'Maintain good spinal posture and enjoy sun-drenched morning walks.',
    },
    monthly: {
      headline: 'Creative Triumph & Professional Prominence',
      outlook: 'A triumphant month placing your unique talents squarely in the limelight of recognition.',
      career: 'Promotions, award nominations, or significant project launches manifest smoothly.',
      finance: 'Prosperity flows through leadership roles and creative enterprise.',
      love: 'Passionate warmth revitalizes mutual devotion and shared joy.',
      health: 'Balance public vibrancy with quiet introspective downtime.',
    },
  },
  Virgo: {
    symbol: '♍',
    ruler: 'Mercury',
    daily: {
      headline: 'Mindful Precision & Purposeful Service',
      outlook: 'Your keen eye for detail discovers elegant efficiencies where others see clutter. Refine your daily craft.',
      career: 'Quality assurance, analytical auditing, and systems architecture thrive under your touch.',
      finance: 'Prudent accounting and detailed budgeting unlock hidden savings.',
      love: 'Acts of thoughtful, practical service speak louder than flamboyant words.',
      health: 'Optimize gut wellness with fiber-rich whole foods and probiotic balance.',
      color: 'Forest Green',
      number: 5,
      direction: 'South',
    },
    weekly: {
      headline: 'Systemic Optimization & Wellness Calibration',
      outlook: 'A productive week for streamlining workspace routines and refining personal wellness regimens.',
      career: 'Colleagues rely on your precision to prevent costly oversights.',
      finance: 'Clean up balance sheets and automate recurring investments.',
      love: 'Thoughtful discussions about shared life responsibilities foster deep respect.',
      health: 'Establish calm evening rituals to soothe analytical overthinking.',
    },
    monthly: {
      headline: 'Mastery of Craft & Holistic Wellbeing',
      outlook: 'Your commitment to excellence culminates in refined mastery and high professional credibility.',
      career: 'Deliver high-caliber deliverables that earn long-term client trust.',
      finance: 'Financial clarity improves through disciplined fiscal tracking.',
      love: 'Authentic support in everyday tasks deepens partnership intimacy.',
      health: 'Emphasize clean nutrition, mindful walking, and digestive harmony.',
    },
  },
  Libra: {
    symbol: '♎',
    ruler: 'Venus',
    daily: {
      headline: 'Relational Harmony & Aesthetic Balance',
      outlook: 'Cosmic currents invite balance, diplomacy, and beauty into your interactions. Mediate conflicts with gentle grace.',
      career: 'Partnership ventures and diplomatic negotiations find win-win compromise.',
      finance: 'Favorable for art, interior aesthetics, and collaborative financial ventures.',
      love: 'Romantic sweetness and mutual reciprocity fill your shared atmosphere.',
      health: 'Support kidney and lower back health with good hydration and gentle yoga.',
      color: 'Pastel Rose Pink',
      number: 6,
      direction: 'West',
    },
    weekly: {
      headline: 'Diplomatic Triumphs & Artistic Inspiration',
      outlook: 'Venusian grace elevates your social diplomacy, creating peaceful bridges across contrasting viewpoints.',
      career: 'Contract negotiations reach fruitful consensus; legal matters proceed favorably.',
      finance: 'Prosperity through joint ventures and refined design projects.',
      love: 'Equilibrium and tender romantic charm grace your partnership.',
      health: 'Practice balancing yoga postures (Tree pose, Warrior) to center bodily equilibrium.',
    },
    monthly: {
      headline: 'Elevating Partnerships & Aesthetic Flourishing',
      outlook: 'A harmonious month centering around relational depth, cultural arts, and balanced diplomacy.',
      career: 'Collaborative partnerships emerge as your greatest professional catalysts.',
      finance: 'Income steady; invest thoughtfully in elevating your home aesthetic.',
      love: 'Commitments deepen; single Libras meet suitors through cultural gatherings.',
      health: 'Maintain fluid balance and enjoy soothing ambient music for mental relaxation.',
    },
  },
  Scorpio: {
    symbol: '♏',
    ruler: 'Mars',
    daily: {
      headline: 'Penetrating Insight & Transformative Power',
      outlook: 'Your investigative intuition cuts straight through surface illusions. Use this profound depth with compassionate discernment.',
      career: 'Uncover vital root causes in complex projects. Research and strategy yield breakthrough intelligence.',
      finance: 'Favourable for tax planning, legacy assets, and joint investments.',
      love: 'Intense emotional intimacy flourishes when both partners practice absolute transparency.',
      health: 'Support reproductive and pelvic health through core strengthening and restful stillness.',
      color: 'Deep Maroon / Black',
      number: 9,
      direction: 'North',
    },
    weekly: {
      headline: 'Karmic Shedding & Regenerative Breakthrough',
      outlook: 'A potent week for releasing stagnant patterns and stepping boldly into renewed personal sovereignty.',
      career: 'Solve deep-rooted organizational bottlenecks with unflinching strategic precision.',
      finance: 'Opportunities for debt restructuring or accessing hidden capital streams.',
      love: 'Magnetic emotional bonds deepen beyond words.',
      health: 'Detoxify your lifestyle with sauna, clean hydration, and emotional release journaling.',
    },
    monthly: {
      headline: 'Profound Rebirth & Empowered Sovereignty',
      outlook: 'A transformative month transmuting past emotional trials into unshakeable inner resilience.',
      career: 'Quiet strategic positioning leads to a commanding leadership breakthrough.',
      finance: 'Lucrative gains from joint assets, licensing, or research domains.',
      love: 'Soul-deep romantic connection with unwavering mutual loyalty.',
      health: 'Engage in deep therapeutic practices and regenerative sleep cycles.',
    },
  },
  Sagittarius: {
    symbol: '♐',
    ruler: 'Jupiter',
    daily: {
      headline: 'Philosophical Vision & Expansive Optimism',
      outlook: 'Your optimistic spirit seeks higher truths and wider horizons today. Share your visionary enthusiasm freely.',
      career: 'Higher education, international business, and long-range strategy align favorably.',
      finance: 'Fortune favors ethical, visionary expansion; steer clear of reckless gambles.',
      love: 'Explore adventures, foreign cultures, or inspiring philosophies together with your partner.',
      health: 'Stretch hips, thighs, and hamstrings to release tension from active travel.',
      color: 'Royal Saffron / Purple',
      number: 3,
      direction: 'East',
    },
    weekly: {
      headline: 'Adventurous Expansions & Cultural Enrichment',
      outlook: 'Jupiterian abundance widens your perspective, bringing serendipitous encounters with mentors and guides.',
      career: 'Educational initiatives and cross-border collaborations gain powerful momentum.',
      finance: 'Favorable timing for intellectual property and publishing investments.',
      love: 'Joyful laughter and philosophical camaraderie light up your romantic life.',
      health: 'Spend time outdoors beneath wide skies to revitalize natural stamina.',
    },
    monthly: {
      headline: 'Wider Horizons & Philosophical Stature',
      outlook: 'An expansive month rich with spiritual growth, auspicious travels, and visionary milestones.',
      career: 'Your authoritative expertise earns invitations to consult, teach, or lead globally.',
      finance: 'Prosperity expands through wisdom-based businesses and international clients.',
      love: 'Shared travel or philosophical discovery ignites romantic warmth.',
      health: 'Balance exuberant enthusiasm with regular physical grounding.',
    },
  },
  Capricorn: {
    symbol: '♑',
    ruler: 'Saturn',
    daily: {
      headline: 'Strategic Ambition & Masterful Architecture',
      outlook: 'Saturnian discipline is your greatest asset. Build structural integrity into your ambitions with calm determination.',
      career: 'Long-term professional milestones come into sharp focus. Senior executives respect your stoic accountability.',
      finance: 'Focus on enduring capital preservation and institutional assets.',
      love: 'Demonstrate loyalty through steadfast dependability and shared long-term goals.',
      health: 'Support skeletal joints, knees, and teeth with mineral-rich nourishment.',
      color: 'Slate Charcoal / Navy',
      number: 8,
      direction: 'South',
    },
    weekly: {
      headline: 'Consolidating Foundations & Climbing High Peaks',
      outlook: 'Methodical persistence moves mountains this week as your disciplined architecture proves resilient.',
      career: 'A major institutional contract or corporate restructuring validates your expertise.',
      finance: 'Solidify your emergency reserves and long-horizon pension plans.',
      love: 'Quiet shared security and mutual respect provide deep comforting solace.',
      health: 'Maintain joint mobility through low-impact resistance training.',
    },
    monthly: {
      headline: 'Pinnacle Achievements & Institutional Stature',
      outlook: 'A landmark month where years of patient labor translate into solid professional authority and respect.',
      career: 'Step into commanding governance or executive leadership roles.',
      finance: 'Strong capital consolidation and long-term asset growth.',
      love: 'Dependable devotion cements marital and partnership vows.',
      health: 'Honor scheduled rest to prevent chronic occupational fatigue.',
    },
  },
  Aquarius: {
    symbol: '♒',
    ruler: 'Saturn',
    daily: {
      headline: 'Visionary Innovation & Humanitarian Synergy',
      outlook: 'Unconventional thinking sparks breakthrough solutions today. Connect with community networks and visionary colleagues.',
      career: 'Technological systems, social collectives, and future-forward innovation thrive under your guidance.',
      finance: 'Explore progressive, technology-driven or decentralized financial mechanisms prudently.',
      love: 'Celebrate mental eccentricity and emotional freedom within respectful partnership boundaries.',
      health: 'Boost circulatory health and stretch calves and ankles during focused work sessions.',
      color: 'Electric Cyan / Cobalt',
      number: 4,
      direction: 'West',
    },
    weekly: {
      headline: 'Community Breakthroughs & Progressive Innovation',
      outlook: 'A collaborative week where your humanitarian ideals rally collective support for positive social evolution.',
      career: 'Launch digital platforms or collaborative group projects with widespread enthusiasm.',
      finance: 'Gains through group associations, tech grants, or decentralized networks.',
      love: 'Deep intellectual friendship serves as the bedrock for flourishing romance.',
      health: 'Incorporate brisk walks and fresh air to clear mental electromagnetic overload.',
    },
    monthly: {
      headline: 'Architecting the Future & Collective Elevation',
      outlook: 'An innovative month placing you at the forefront of community transformation and futuristic concepts.',
      career: 'Your original insights disrupt conventional bottlenecks, creating new industry pathways.',
      finance: 'Prosperity flows through networked communities and innovative technology.',
      love: 'Unconditional acceptance and intellectual resonance create enduring affection.',
      health: 'Balance high-tech screen time with grounding barefoot contact on earth.',
    },
  },
  Pisces: {
    symbol: '♓',
    ruler: 'Jupiter',
    daily: {
      headline: 'Mystical Empathy & Boundless Poetic Vision',
      outlook: 'Your spiritual intuition connects you deeply with the cosmic flow today. Channel oceanic feelings into creative arts.',
      career: 'Creative storytelling, musical arts, and compassionate counseling flow with extraordinary ease.',
      finance: 'Practice clear financial boundaries; maintain transparent written accounts.',
      love: 'Soulful devotion and romantic mysticism enchant your shared journey.',
      health: 'Pamper your feet with warm herbal soaks; practice gentle meditative breathing.',
      color: 'Seafoam Aquamarine / Violet',
      number: 7,
      direction: 'North',
    },
    weekly: {
      headline: 'Spiritual Synthesis & Creative Intuition',
      outlook: 'A serene week where artistic inspiration and mystical tranquility provide deep sanctuary from worldly noise.',
      career: 'Healing arts, philanthropic ventures, and creative endeavors receive divine wind in their sails.',
      finance: 'Intuitive timing assists investments; keep contracts simple and lucid.',
      love: 'Unspoken emotional telepathy weaves tender magic between lovers.',
      health: 'Prioritize deep dream sleep and ocean or water-side contemplation.',
    },
    monthly: {
      headline: 'Oceanic Compassion & Mystical Awakening',
      outlook: 'A profound month of spiritual alignment, artistic culmination, and universal empathy.',
      career: 'Your compassionate leadership inspires colleagues to work with greater harmony.',
      finance: 'Abundance manifests through charitable goodwill and artistic endeavors.',
      love: 'Transcendent romance and soulful forgiveness heal all lingering emotional boundaries.',
      health: 'Practice regular sound therapy or meditative music for nervous system equilibrium.',
    },
  },
};

export function getHoroscope(
  rashi: ZodiacSignName,
  period: 'daily' | 'weekly' | 'monthly' = 'daily'
): HoroscopeReading {
  const data = HOROSCOPE_THEMES[rashi] || HOROSCOPE_THEMES.Aries;
  const pData = data[period];

  return {
    rashi,
    period,
    headline: pData.headline,
    generalOutlook: pData.outlook,
    career: pData.career,
    finance: pData.finance,
    love: pData.love,
    health: pData.health,
    luckyColor: data.daily.color,
    luckyNumber: data.daily.number,
    favourableDirection: data.daily.direction,
    cosmicAdvice:
      'Horoscopic readings reflect broader archetypal currents. Personal birth chart placements and active Dasha cycles provide exact timing precision.',
  };
}
