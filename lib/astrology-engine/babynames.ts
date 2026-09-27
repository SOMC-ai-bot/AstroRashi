import { BabyNameEntry, ZodiacSignName } from '@/types';

export const BABY_NAMES_DATABASE: BabyNameEntry[] = [
  // Aries (Chu, Che, Cho, La, Lee, Lu, Le, Lo, A)
  { id: 'bn-1', name: 'Aarav', gender: 'Boy', rashi: 'Aries', startingSound: 'A', nakshatra: 'Krittika', meaning: 'Peaceful, calm sound, wisdom', origin: 'Sanskrit' },
  { id: 'bn-2', name: 'Ananya', gender: 'Girl', rashi: 'Aries', startingSound: 'A', nakshatra: 'Krittika', meaning: 'Unique, matchless, divine grace', origin: 'Sanskrit' },
  { id: 'bn-3', name: 'Chetan', gender: 'Boy', rashi: 'Aries', startingSound: 'Che', nakshatra: 'Ashwini', meaning: 'Consciousness, vitality, soul', origin: 'Sanskrit' },
  { id: 'bn-4', name: 'Chhavi', gender: 'Girl', rashi: 'Aries', startingSound: 'Chha', nakshatra: 'Ardra', meaning: 'Radiant reflection, beauty', origin: 'Sanskrit' },
  { id: 'bn-5', name: 'Laksh', gender: 'Boy', rashi: 'Aries', startingSound: 'La', nakshatra: 'Ashwini', meaning: 'Aim, target, destiny', origin: 'Sanskrit' },
  { id: 'bn-6', name: 'Lavanya', gender: 'Girl', rashi: 'Aries', startingSound: 'La', nakshatra: 'Ashwini', meaning: 'Grace, elegance, natural beauty', origin: 'Sanskrit' },
  { id: 'bn-7', name: 'Leela', gender: 'Girl', rashi: 'Aries', startingSound: 'Lee', nakshatra: 'Bharani', meaning: 'Divine cosmic play', origin: 'Sanskrit' },

  // Taurus (Ee, U, E, O, Va, Vee, Vu, Ve, Vo)
  { id: 'bn-8', name: 'Vivaan', gender: 'Boy', rashi: 'Taurus', startingSound: 'Vee', nakshatra: 'Rohini', meaning: 'Full of life, first rays of sun', origin: 'Sanskrit' },
  { id: 'bn-9', name: 'Vedika', gender: 'Girl', rashi: 'Taurus', startingSound: 'Ve', nakshatra: 'Mrigashirsha', meaning: 'Consciousness, altar, sacred wisdom', origin: 'Sanskrit' },
  { id: 'bn-10', name: 'Varun', gender: 'Boy', rashi: 'Taurus', startingSound: 'Va', nakshatra: 'Rohini', meaning: 'Lord of cosmic waters', origin: 'Sanskrit' },
  { id: 'bn-11', name: 'Vanya', gender: 'Girl', rashi: 'Taurus', startingSound: 'Va', nakshatra: 'Rohini', meaning: 'Graceful gift of nature', origin: 'Sanskrit' },
  { id: 'bn-12', name: 'Om', gender: 'Unisex', rashi: 'Taurus', startingSound: 'O', nakshatra: 'Rohini', meaning: 'The primordial sacred sound', origin: 'Sanskrit' },
  { id: 'bn-13', name: 'Ishaan', gender: 'Boy', rashi: 'Taurus', startingSound: 'Ee', nakshatra: 'Krittika', meaning: 'Lord Shiva, northeast direction', origin: 'Sanskrit' },

  // Gemini (Kaa, Kee, Ku, Gha, Chha, Ke, Ko, Haa)
  { id: 'bn-14', name: 'Kabir', gender: 'Boy', rashi: 'Gemini', startingSound: 'Kaa', nakshatra: 'Mrigashirsha', meaning: 'Great, mystic poet of unity', origin: 'Sanskrit/Arabic' },
  { id: 'bn-15', name: 'Kavya', gender: 'Girl', rashi: 'Gemini', startingSound: 'Kaa', nakshatra: 'Mrigashirsha', meaning: 'Poetry in motion, artistic vision', origin: 'Sanskrit' },
  { id: 'bn-16', name: 'Kian', gender: 'Boy', rashi: 'Gemini', startingSound: 'Kee', nakshatra: 'Mrigashirsha', meaning: 'Grace of God, royal lineage', origin: 'Sanskrit' },
  { id: 'bn-17', name: 'Harshita', gender: 'Girl', rashi: 'Gemini', startingSound: 'Haa', nakshatra: 'Punarvasu', meaning: 'Bringer of lasting joy', origin: 'Sanskrit' },
  { id: 'bn-18', name: 'Kushal', gender: 'Boy', rashi: 'Gemini', startingSound: 'Ku', nakshatra: 'Ardra', meaning: 'Skilled, prosperous, clever', origin: 'Sanskrit' },

  // Cancer (Hee, Hoo, He, Ho, Daa, Dee, Doo, De, Do)
  { id: 'bn-19', name: 'Hridhaan', gender: 'Boy', rashi: 'Cancer', startingSound: 'Hee', nakshatra: 'Punarvasu', meaning: 'One with a great heart', origin: 'Sanskrit' },
  { id: 'bn-20', name: 'Hemani', gender: 'Girl', rashi: 'Cancer', startingSound: 'He', nakshatra: 'Pushya', meaning: 'Golden, Goddess Parvati', origin: 'Sanskrit' },
  { id: 'bn-21', name: 'Dev', gender: 'Boy', rashi: 'Cancer', startingSound: 'De', nakshatra: 'Ashlesha', meaning: 'Divine luminary, godlike', origin: 'Sanskrit' },
  { id: 'bn-22', name: 'Divya', gender: 'Girl', rashi: 'Cancer', startingSound: 'Dee', nakshatra: 'Ashlesha', meaning: 'Divine light, heavenly grace', origin: 'Sanskrit' },
  { id: 'bn-23', name: 'Darsh', gender: 'Boy', rashi: 'Cancer', startingSound: 'Daa', nakshatra: 'Pushya', meaning: 'Lord Krishna, clear vision', origin: 'Sanskrit' },

  // Leo (Maa, Mee, Moo, Me, Mo, Taa, Tee, Too, Te)
  { id: 'bn-24', name: 'Manan', gender: 'Boy', rashi: 'Leo', startingSound: 'Maa', nakshatra: 'Magha', meaning: 'Deep contemplative meditation', origin: 'Sanskrit' },
  { id: 'bn-25', name: 'Mira', gender: 'Girl', rashi: 'Leo', startingSound: 'Mee', nakshatra: 'Magha', meaning: 'Prosperous, saintly devotee, ocean', origin: 'Sanskrit' },
  { id: 'bn-26', name: 'Mohit', gender: 'Boy', rashi: 'Leo', startingSound: 'Mo', nakshatra: 'Purva Phalguni', meaning: 'Charmed, captivating, attractive', origin: 'Sanskrit' },
  { id: 'bn-27', name: 'Tanvi', gender: 'Girl', rashi: 'Leo', startingSound: 'Taa', nakshatra: 'Purva Phalguni', meaning: 'Delicate, radiant Goddess Durga', origin: 'Sanskrit' },
  { id: 'bn-28', name: 'Tejas', gender: 'Boy', rashi: 'Leo', startingSound: 'Te', nakshatra: 'Uttara Phalguni', meaning: 'Radiant energy, brilliance, sharp intellect', origin: 'Sanskrit' },

  // Virgo (To, Paa, Pee, Poo, Sha, Nna, Tha, Pe, Po)
  { id: 'bn-29', name: 'Pranav', gender: 'Boy', rashi: 'Virgo', startingSound: 'Paa', nakshatra: 'Uttara Phalguni', meaning: 'Sacred sound Om, divine vibration', origin: 'Sanskrit' },
  { id: 'bn-30', name: 'Pari', gender: 'Girl', rashi: 'Virgo', startingSound: 'Paa', nakshatra: 'Uttara Phalguni', meaning: 'Fairy, ethereal beauty', origin: 'Persian/Sanskrit' },
  { id: 'bn-31', name: 'Pooja', gender: 'Girl', rashi: 'Virgo', startingSound: 'Poo', nakshatra: 'Hasta', meaning: 'Sacred reverence, worship', origin: 'Sanskrit' },
  { id: 'bn-32', name: 'Parth', gender: 'Boy', rashi: 'Virgo', startingSound: 'Paa', nakshatra: 'Uttara Phalguni', meaning: 'Arjuna, king of courage', origin: 'Sanskrit' },
  { id: 'bn-33', name: 'Poorvi', gender: 'Girl', rashi: 'Virgo', startingSound: 'Poo', nakshatra: 'Hasta', meaning: 'Classical melody of the east', origin: 'Sanskrit' },

  // Libra (Raa, Ree, Roo, Re, Ro, Taa, Tee, Too, Te)
  { id: 'bn-34', name: 'Reyansh', gender: 'Boy', rashi: 'Libra', startingSound: 'Ree', nakshatra: 'Chitra', meaning: 'Ray of sunlight, part of Lord Vishnu', origin: 'Sanskrit' },
  { id: 'bn-35', name: 'Rhea', gender: 'Girl', rashi: 'Libra', startingSound: 'Re', nakshatra: 'Swati', meaning: 'Graceful singer, flowing stream', origin: 'Greek/Sanskrit' },
  { id: 'bn-36', name: 'Rohan', gender: 'Boy', rashi: 'Libra', startingSound: 'Ro', nakshatra: 'Swati', meaning: 'Ascending, blossoming sandalwood', origin: 'Sanskrit' },
  { id: 'bn-37', name: 'Riddhi', gender: 'Girl', rashi: 'Libra', startingSound: 'Ree', nakshatra: 'Chitra', meaning: 'Divine prosperity, wife of Ganesha', origin: 'Sanskrit' },
  { id: 'bn-38', name: 'Tisha', gender: 'Girl', rashi: 'Libra', startingSound: 'Tee', nakshatra: 'Vishakha', meaning: 'Joy, active energy, quiet happiness', origin: 'Sanskrit' },

  // Scorpio (Too, Te, To, Naa, Nee, Noo, Ne, No, Yaa)
  { id: 'bn-39', name: 'Naksh', gender: 'Boy', rashi: 'Scorpio', startingSound: 'Naa', nakshatra: 'Anuradha', meaning: 'Moon, constellation, brilliant feature', origin: 'Sanskrit' },
  { id: 'bn-40', name: 'Navya', gender: 'Girl', rashi: 'Scorpio', startingSound: 'Naa', nakshatra: 'Anuradha', meaning: 'Worth praising, fresh, innovative', origin: 'Sanskrit' },
  { id: 'bn-41', name: 'Neev', gender: 'Boy', rashi: 'Scorpio', startingSound: 'Nee', nakshatra: 'Anuradha', meaning: 'Solid foundation, strong bedrock', origin: 'Sanskrit' },
  { id: 'bn-42', name: 'Nisha', gender: 'Girl', rashi: 'Scorpio', startingSound: 'Nee', nakshatra: 'Anuradha', meaning: 'Serene night, gentle quiet', origin: 'Sanskrit' },
  { id: 'bn-43', name: 'Yash', gender: 'Boy', rashi: 'Scorpio', startingSound: 'Yaa', nakshatra: 'Jyeshtha', meaning: 'Fame, glorious reputation, triumph', origin: 'Sanskrit' },

  // Sagittarius (Ye, Yo, Bhaa, Bhee, Bhoo, Dhaa, Phaa, Dhaa, Bhe)
  { id: 'bn-44', name: 'Bhavin', gender: 'Boy', rashi: 'Sagittarius', startingSound: 'Bhaa', nakshatra: 'Mula', meaning: 'Glorious, living in victory', origin: 'Sanskrit' },
  { id: 'bn-45', name: 'Bhavya', gender: 'Girl', rashi: 'Sagittarius', startingSound: 'Bhaa', nakshatra: 'Mula', meaning: 'Grand, magnificent, Goddess Parvati', origin: 'Sanskrit' },
  { id: 'bn-46', name: 'Dhruv', gender: 'Boy', rashi: 'Sagittarius', startingSound: 'Dhaa', nakshatra: 'Purva Ashadha', meaning: 'The unshakeable pole star, steadfast', origin: 'Sanskrit' },
  { id: 'bn-47', name: 'Bhumi', gender: 'Girl', rashi: 'Sagittarius', startingSound: 'Bhoo', nakshatra: 'Purva Ashadha', meaning: 'Sacred Mother Earth', origin: 'Sanskrit' },
  { id: 'bn-48', name: 'Yuvraj', gender: 'Boy', rashi: 'Sagittarius', startingSound: 'Yu', nakshatra: 'Jyeshtha', meaning: 'Crown prince, youthful sovereign', origin: 'Sanskrit' },

  // Capricorn (Bho, Jaa, Jee, Khee, Khoo, Khe, Kho, Gaa, Gee)
  { id: 'bn-49', name: 'Jai', gender: 'Boy', rashi: 'Capricorn', startingSound: 'Jaa', nakshatra: 'Uttara Ashadha', meaning: 'Victory, triumph, conqueror', origin: 'Sanskrit' },
  { id: 'bn-50', name: 'Jiya', gender: 'Girl', rashi: 'Capricorn', startingSound: 'Jee', nakshatra: 'Uttara Ashadha', meaning: 'Sweet heart, joyful spirit', origin: 'Sanskrit' },
  { id: 'bn-51', name: 'Kiaan', gender: 'Boy', rashi: 'Capricorn', startingSound: 'Khee', nakshatra: 'Shravana', meaning: 'King, royal blessing of Lord Vishnu', origin: 'Sanskrit' },
  { id: 'bn-52', name: 'Garima', gender: 'Girl', rashi: 'Capricorn', startingSound: 'Gaa', nakshatra: 'Dhanishta', meaning: 'Dignity, moral grandeur, proud grace', origin: 'Sanskrit' },
  { id: 'bn-53', name: 'Gautam', gender: 'Boy', rashi: 'Capricorn', startingSound: 'Gaa', nakshatra: 'Dhanishta', meaning: 'Illuminator of darkness, Lord Buddha', origin: 'Sanskrit' },

  // Aquarius (Gu, Ge, Go, Saa, See, Soo, Se, So, Daa)
  { id: 'bn-54', name: 'Samar', gender: 'Boy', rashi: 'Aquarius', startingSound: 'Saa', nakshatra: 'Shatabhisha', meaning: 'Courageous warrior, evening companion', origin: 'Sanskrit' },
  { id: 'bn-55', name: 'Saanvi', gender: 'Girl', rashi: 'Aquarius', startingSound: 'Saa', nakshatra: 'Shatabhisha', meaning: 'Goddess Lakshmi, one who is revered', origin: 'Sanskrit' },
  { id: 'bn-56', name: 'Siddharth', gender: 'Boy', rashi: 'Aquarius', startingSound: 'See', nakshatra: 'Shatabhisha', meaning: 'One who has accomplished his goal', origin: 'Sanskrit' },
  { id: 'bn-57', name: 'Siya', gender: 'Girl', rashi: 'Aquarius', startingSound: 'See', nakshatra: 'Shatabhisha', meaning: 'Goddess Sita, radiant moonlight', origin: 'Sanskrit' },
  { id: 'bn-58', name: 'Sohan', gender: 'Boy', rashi: 'Aquarius', startingSound: 'So', nakshatra: 'Purva Bhadrapada', meaning: 'Handsome, charming, good-hearted', origin: 'Sanskrit' },

  // Pisces (Dee, Doo, Tha, Jha, Nya, De, Do, Chaa, Chee)
  { id: 'bn-59', name: 'Deepak', gender: 'Boy', rashi: 'Pisces', startingSound: 'Dee', nakshatra: 'Purva Bhadrapada', meaning: 'Sacred lamp, source of illumination', origin: 'Sanskrit' },
  { id: 'bn-60', name: 'Dia', gender: 'Girl', rashi: 'Pisces', startingSound: 'Dee', nakshatra: 'Purva Bhadrapada', meaning: 'Light, radiant candle, divine sparkle', origin: 'Sanskrit' },
  { id: 'bn-61', name: 'Daksh', gender: 'Boy', rashi: 'Pisces', startingSound: 'De', nakshatra: 'Revati', meaning: 'Capable, talented, son of Brahma', origin: 'Sanskrit' },
  { id: 'bn-62', name: 'Charvi', gender: 'Girl', rashi: 'Pisces', startingSound: 'Chaa', nakshatra: 'Revati', meaning: 'A graceful and beautiful woman', origin: 'Sanskrit' },
  { id: 'bn-63', name: 'Chirag', gender: 'Boy', rashi: 'Pisces', startingSound: 'Chee', nakshatra: 'Revati', meaning: 'Guiding lamp, bright light', origin: 'Sanskrit' },
];

export function getBabyNames(
  rashi?: ZodiacSignName,
  gender?: 'Boy' | 'Girl' | 'Unisex',
  searchQuery?: string
): BabyNameEntry[] {
  let result = [...BABY_NAMES_DATABASE];

  if (rashi) {
    result = result.filter((n) => n.rashi === rashi);
  }

  if (gender) {
    result = result.filter((n) => n.gender === gender || n.gender === 'Unisex');
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.meaning.toLowerCase().includes(q) ||
        n.startingSound.toLowerCase().includes(q) ||
        n.nakshatra.toLowerCase().includes(q)
    );
  }

  return result;
}
