import { AspectData, PlanetName, PlanetPosition, ZodiacSignName } from '@/types';

export const SIGN_MEANINGS: Record<
  ZodiacSignName,
  {
    archetype: string;
    essence: string;
    keyTraits: string[];
    shadow: string;
  }
> = {
  Aries: {
    archetype: 'The Pioneer & Catalyst',
    essence: 'Dynamic fire initiating bold new paths with courage and spontaneous vitality.',
    keyTraits: ['Courageous', 'Pioneering', 'Direct', 'Passionate'],
    shadow: 'Impatience or impetuous reactions when encountering delay.',
  },
  Taurus: {
    archetype: 'The Builder & Guardian of Value',
    essence: 'Grounded earth fostering enduring beauty, sensuous comfort, and unwavering stability.',
    keyTraits: ['Grounded', 'Sensual', 'Methodical', 'Resilient'],
    shadow: 'Inertia or resistance to necessary transformation.',
  },
  Gemini: {
    archetype: 'The Messenger & Curious Weaver',
    essence: 'Agile air bridging diverse ideas, linguistic nuance, and endless curiosity.',
    keyTraits: ['Intellectual', 'Adaptable', 'Articulate', 'Inquisitive'],
    shadow: 'Restlessness or dispersed mental energy.',
  },
  Cancer: {
    archetype: 'The Nurturer & Intuitive Anchor',
    essence: 'Profound water honoring emotional sanctuaries, empathetic memory, and instinctual protection.',
    keyTraits: ['Empathetic', 'Protective', 'Intuitive', 'Devoted'],
    shadow: 'Protective withdrawal or emotional defensiveness.',
  },
  Leo: {
    archetype: 'The Luminary & Sovereign Creator',
    essence: 'Radiant fire expressing authentic generosity, creative warmth, and heartfelt leadership.',
    keyTraits: ['Radiant', 'Generous', 'Charismatic', 'Creative'],
    shadow: 'Vulnerability to external validation or pride.',
  },
  Virgo: {
    archetype: 'The Artisan & Mindful Alchemist',
    essence: 'Discerning earth refining crafts through precision, purposeful service, and conscious devotion.',
    keyTraits: ['Analytical', 'Pragmatic', 'Detail-oriented', 'Devoted to Mastery'],
    shadow: 'Perfectionistic self-criticism.',
  },
  Libra: {
    archetype: 'The Diplomat & Harmonizer',
    essence: 'Relational air cultivating aesthetic equilibrium, thoughtful justice, and mutual reciprocity.',
    keyTraits: ['Diplomatic', 'Aesthetic', 'Fair-minded', 'Harmonious'],
    shadow: 'Hesitation in confrontation to preserve surface peace.',
  },
  Scorpio: {
    archetype: 'The Alchemist & Deep Seeker',
    essence: 'Transformative water penetrating beneath surface illusions to unlock authentic personal sovereignty.',
    keyTraits: ['Perceptive', 'Magnetic', 'Regenerative', 'Unflinching'],
    shadow: 'Reluctance to release old grievances or trust easily.',
  },
  Sagittarius: {
    archetype: 'The Philosopher & Visionary Nomad',
    essence: 'Expansive fire seeking philosophical truth, cultural horizons, and optimistic adventure.',
    keyTraits: ['Expansive', 'Philosophical', 'Honest', 'Inspirational'],
    shadow: 'Overextension or restlessness with mundane routines.',
  },
  Capricorn: {
    archetype: 'The Architect & Master of Time',
    essence: 'Disciplined earth constructing enduring legacies through patience, integrity, and stoic determination.',
    keyTraits: ['Disciplined', 'Strategic', 'Accountable', 'Patient'],
    shadow: 'Carrying excessive solitary responsibility.',
  },
  Aquarius: {
    archetype: 'The Visionary & Humanitarian Architect',
    essence: 'Innovative air championing collective evolution, intellectual freedom, and unconventional insight.',
    keyTraits: ['Innovative', 'Humanitarian', 'Independent', 'Original'],
    shadow: 'Emotional detachment in intimate exchanges.',
  },
  Pisces: {
    archetype: 'The Mystic & Dreamer of the Deep',
    essence: 'Boundless water merging with universal compassion, poetic reverie, and spiritual synthesis.',
    keyTraits: ['Imaginative', 'Compassionate', 'Mystical', 'Receptive'],
    shadow: 'Diffusing boundaries or escapism.',
  },
};

export const HOUSE_THEMES: Record<
  number,
  {
    traditionalName: string;
    vedicName: string;
    area: string;
    description: string;
  }
> = {
  1: {
    traditionalName: 'House of Self & First Impressions',
    vedicName: 'Tanu Bhava',
    area: 'Identity, physical vitality, outward presence, and life outlook.',
    description: 'Represents your primary interface with the world and spontaneous self-expression.',
  },
  2: {
    traditionalName: 'House of Values & Resources',
    vedicName: 'Dhana Bhava',
    area: 'Personal finances, tangible assets, self-worth, and sustenance.',
    description: 'Examines how you generate wealth, honor material stability, and cultivate core values.',
  },
  3: {
    traditionalName: 'House of Communication & Siblings',
    vedicName: 'Sahaja Bhava',
    area: 'Intellect, local environment, siblings, writing, and early learning.',
    description: 'Illuminates your everyday cognitive exchanges, manual skills, and networking agility.',
  },
  4: {
    traditionalName: 'House of Roots & Foundation',
    vedicName: 'Sukha Bhava',
    area: 'Home, ancestral roots, private foundation, and emotional contentment.',
    description: 'Reflects the sanctuary you build within yourself and your foundational sanctuary.',
  },
  5: {
    traditionalName: 'House of Pleasure & Creative Expression',
    vedicName: 'Putra Bhava',
    area: 'Creativity, romance, joyful hobbies, children, and spontaneous play.',
    description: 'Reveals where your heart finds joyous self-celebration and original creation.',
  },
  6: {
    traditionalName: 'House of Health & Daily Service',
    vedicName: 'Ari Bhava',
    area: 'Routines, wellness habits, problem-solving, craftsmanship, and service.',
    description: 'Focuses on the daily disciplines and mindfulness that sustain longevity and clarity.',
  },
  7: {
    traditionalName: 'House of Partnerships & Contracts',
    vedicName: 'Yuvati Bhava',
    area: 'Committed relationships, marriage, business collaborations, and diplomacy.',
    description: 'Examines how you balance mutual reciprocity and meet the mirror of significant others.',
  },
  8: {
    traditionalName: 'House of Transformation & Shared Assets',
    vedicName: 'Randhra Bhava',
    area: 'Regeneration, intimacy, shared resources, mystery, and deep psychological metamorphosis.',
    description: 'Speaks to the profound alchemy of trust, shared depths, and cyclic rebirth.',
  },
  9: {
    traditionalName: 'House of Philosophy & Higher Horizons',
    vedicName: 'Dharma Bhava',
    area: 'Higher learning, foreign travel, spiritual philosophy, ethics, and worldviews.',
    description: 'Explores your search for existential meaning, wisdom traditions, and expansive horizons.',
  },
  10: {
    traditionalName: 'House of Career & Social Calling',
    vedicName: 'Karma Bhava',
    area: 'Public reputation, legacy, career achievement, authority, and destiny.',
    description: 'Highlights your life mastery, professional milestones, and contribution to society.',
  },
  11: {
    traditionalName: 'House of Community & Visionary Hopes',
    vedicName: 'Labha Bhava',
    area: 'Friendships, collective goals, humanitarian circles, and realized aspirations.',
    description: 'Reveals the networks, kindred allies, and visionary ideals shaping your future.',
  },
  12: {
    traditionalName: 'House of the Unconscious & Transcendence',
    vedicName: 'Vyaya Bhava',
    area: 'Solitude, spiritual contemplation, dreams, surrender, and subconscious depths.',
    description: 'Guides your inward journey into quiet meditation, healing, and universal oneness.',
  },
};

export function interpretPlacement(pos: PlanetPosition): {
  headline: string;
  traditionalReading: string;
  aiInsight: string;
  suggestedPrompt: string;
} {
  const signInfo = SIGN_MEANINGS[pos.sign];
  const houseInfo = HOUSE_THEMES[pos.house];

  const headline = `${pos.name} in ${pos.sign}`;
  const traditionalReading = `Traditional astrology interprets ${pos.name} in ${pos.sign} within the ${pos.house}th House (${houseInfo?.traditionalName || ''}) as a focalization of ${signInfo?.essence || 'unique energy'}. Here, ${pos.name}'s fundamental drive is expressed through the archetype of ${signInfo?.archetype}.`;
  
  const aiInsight = `Your chart places ${pos.name} in ${pos.sign} at ${pos.degree}°${pos.minute.toString().padStart(2, '0')}' in your ${pos.house}th house. In practical daily life, this indicates that your innate strengths include being ${signInfo?.keyTraits.slice(0, 3).join(', ')}. While traditional approaches associate this placement with deliberate progress, it may be read as an invitation to balance your natural drive with mindful self-compassion.`;

  const suggestedPrompt = `What does my ${pos.name} in ${pos.sign} in the ${pos.house}th house mean for my personal growth?`;

  return {
    headline,
    traditionalReading,
    aiInsight,
    suggestedPrompt,
  };
}

export function interpretAspect(aspect: AspectData): {
  headline: string;
  description: string;
  advice: string;
} {
  const dynamic = aspect.isHarmonious ? 'harmonious, fluid dialogue' : 'creative tension and catalytic friction';
  return {
    headline: `${aspect.planet1} ${aspect.type} ${aspect.planet2}`,
    description: `A ${dynamic} with an orb of ${aspect.orb}°. Traditional astrology views this angular geometry as an opportunity where the principles of ${aspect.planet1} and ${aspect.planet2} interact closely.`,
    advice: aspect.isHarmonious
      ? 'This indicates natural flow and ease. Harness this synergy intentionally in collaborative or creative efforts.'
      : 'This highlights a dynamic growth point. Consciously integrating both planetary principles transforms friction into mastery.',
  };
}
