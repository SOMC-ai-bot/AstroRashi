import { ShubhMuhuratEntry } from '@/types';

export function getShubhMuhuratList(
  year: number = new Date().getFullYear(),
  category?: ShubhMuhuratEntry['category']
): ShubhMuhuratEntry[] {
  const allEntries: ShubhMuhuratEntry[] = [
    // Marriage
    {
      id: `m-1-${year}`,
      category: 'Marriage',
      title: 'Vivah Shubh Muhurat',
      date: `${year}-01-22`,
      dayOfWeek: 'Wednesday',
      startTime: '07:14',
      endTime: '13:30',
      nakshatra: 'Rohini',
      tithi: 'Shukla Dwitiya',
      auspiciousness: 'Most Auspicious',
      notes: 'Free from Bhadra and combustions. Ideal for holy marital vows.',
    },
    {
      id: `m-2-${year}`,
      category: 'Marriage',
      title: 'Vivah Shubh Muhurat',
      date: `${year}-02-14`,
      dayOfWeek: 'Friday',
      startTime: '08:45',
      endTime: '16:20',
      nakshatra: 'Uttara Phalguni',
      tithi: 'Shukla Saptami',
      auspiciousness: 'Most Auspicious',
      notes: 'Moon exalted; highly favorable for lasting domestic harmony.',
    },
    {
      id: `m-3-${year}`,
      category: 'Marriage',
      title: 'Vivah Shubh Muhurat',
      date: `${year}-04-18`,
      dayOfWeek: 'Friday',
      startTime: '10:00',
      endTime: '18:15',
      nakshatra: 'Anuradha',
      tithi: 'Shukla Ekadashi',
      auspiciousness: 'Auspicious',
      notes: 'Mitra deity alignment fostering lifelong companionship.',
    },
    {
      id: `m-4-${year}`,
      category: 'Marriage',
      title: 'Vivah Shubh Muhurat',
      date: `${year}-11-21`,
      dayOfWeek: 'Friday',
      startTime: '07:30',
      endTime: '14:45',
      nakshatra: 'Revati',
      tithi: 'Shukla Panchami',
      auspiciousness: 'Most Auspicious',
      notes: 'Deva Gana alignment with prosperous planetary blessings.',
    },

    // Vehicle Purchase
    {
      id: `v-1-${year}`,
      category: 'Vehicle',
      title: 'Vahan Kharid Shubh Muhurat',
      date: `${year}-01-29`,
      dayOfWeek: 'Wednesday',
      startTime: '07:11',
      endTime: '12:00',
      nakshatra: 'Shravana',
      tithi: 'Shukla Ekadashi',
      auspiciousness: 'Most Auspicious',
      notes: 'Vishnu nakshatra brings long-term safety, protection, and smooth travel.',
    },
    {
      id: `v-2-${year}`,
      category: 'Vehicle',
      title: 'Vahan Kharid Shubh Muhurat',
      date: `${year}-03-05`,
      dayOfWeek: 'Wednesday',
      startTime: '06:45',
      endTime: '14:10',
      nakshatra: 'Rohini',
      tithi: 'Shukla Panchami',
      auspiciousness: 'Most Auspicious',
      notes: 'Stable earth nakshatra; brings reliability and mechanical endurance.',
    },
    {
      id: `v-3-${year}`,
      category: 'Vehicle',
      title: 'Vahan Kharid Shubh Muhurat',
      date: `${year}-08-20`,
      dayOfWeek: 'Wednesday',
      startTime: '09:15',
      endTime: '15:30',
      nakshatra: 'Swati',
      tithi: 'Shukla Dwitiya',
      auspiciousness: 'Auspicious',
      notes: 'Air nakshatra under Vayu, blessing swift movement and swift transit.',
    },

    // Griha Pravesh (Housewarming)
    {
      id: `g-1-${year}`,
      category: 'Griha Pravesh',
      title: 'Griha Pravesh Shubh Muhurat',
      date: `${year}-02-07`,
      dayOfWeek: 'Friday',
      startTime: '07:05',
      endTime: '11:45',
      nakshatra: 'Rohini',
      tithi: 'Shukla Dashami',
      auspiciousness: 'Most Auspicious',
      notes: 'Fixed nakshatra blessing the foundation with domestic abundance and peace.',
    },
    {
      id: `g-2-${year}`,
      category: 'Griha Pravesh',
      title: 'Griha Pravesh Shubh Muhurat',
      date: `${year}-05-02`,
      dayOfWeek: 'Friday',
      startTime: '05:40',
      endTime: '12:15',
      nakshatra: 'Uttara Bhadrapada',
      tithi: 'Shukla Panchami',
      auspiciousness: 'Most Auspicious',
      notes: 'Auspicious entry during Akshaya Tritiya seasonal window.',
    },
    {
      id: `g-3-${year}`,
      category: 'Griha Pravesh',
      title: 'Griha Pravesh Shubh Muhurat',
      date: `${year}-10-17`,
      dayOfWeek: 'Friday',
      startTime: '06:25',
      endTime: '13:00',
      nakshatra: 'Pushya',
      tithi: 'Shukla Ekadashi',
      auspiciousness: 'Most Auspicious',
      notes: 'Pushya nakshatra brings spiritual serenity and continuous prosperity.',
    },

    // Property Purchase / Registry
    {
      id: `p-1-${year}`,
      category: 'Property',
      title: 'Sampatti Kharid / Registry',
      date: `${year}-01-16`,
      dayOfWeek: 'Thursday',
      startTime: '08:30',
      endTime: '14:20',
      nakshatra: 'Pushya',
      tithi: 'Krishna Dwitiya',
      auspiciousness: 'Most Auspicious',
      notes: 'Jupiter alignment ensures safe land title and capital appreciation.',
    },
    {
      id: `p-2-${year}`,
      category: 'Property',
      title: 'Sampatti Kharid / Registry',
      date: `${year}-06-12`,
      dayOfWeek: 'Thursday',
      startTime: '06:00',
      endTime: '13:45',
      nakshatra: 'Swati',
      tithi: 'Shukla Saptami',
      auspiciousness: 'Auspicious',
      notes: 'Favorable for commercial property and land investments.',
    },

    // Business / Startup Launch
    {
      id: `b-1-${year}`,
      category: 'Business',
      title: 'Vyapar Aarambh Shubh Muhurat',
      date: `${year}-01-09`,
      dayOfWeek: 'Thursday',
      startTime: '09:00',
      endTime: '12:30',
      nakshatra: 'Ashwini',
      tithi: 'Shukla Dashami',
      auspiciousness: 'Most Auspicious',
      notes: 'Ashwini brings rapid velocity, pioneering innovation, and early traction.',
    },
    {
      id: `b-2-${year}`,
      category: 'Business',
      title: 'Vyapar Aarambh Shubh Muhurat',
      date: `${year}-04-03`,
      dayOfWeek: 'Thursday',
      startTime: '07:30',
      endTime: '13:15',
      nakshatra: 'Rohini',
      tithi: 'Shukla Panchami',
      auspiciousness: 'Most Auspicious',
      notes: 'Ideal for founding companies requiring long-term recurring revenue.',
    },
    {
      id: `b-3-${year}`,
      category: 'Business',
      title: 'Vyapar Aarambh Shubh Muhurat',
      date: `${year}-10-23`,
      dayOfWeek: 'Thursday',
      startTime: '08:15',
      endTime: '14:00',
      nakshatra: 'Chitra',
      tithi: 'Shukla Pratipada',
      auspiciousness: 'Most Auspicious',
      notes: 'Celestial architect Vishwakarma energy blessing product design & branding.',
    },

    // Important Ceremonies
    {
      id: `c-1-${year}`,
      category: 'Ceremony',
      title: 'Namkaran Sanskar (Naming Ceremony)',
      date: `${year}-02-21`,
      dayOfWeek: 'Friday',
      startTime: '07:45',
      endTime: '11:30',
      nakshatra: 'Anuradha',
      tithi: 'Shukla Dashami',
      auspiciousness: 'Most Auspicious',
      notes: 'Gentle nakshatra blessing the child with radiant health and fortune.',
    },
    {
      id: `c-2-${year}`,
      category: 'Ceremony',
      title: 'Mundan Sanskar (Tonsure Ceremony)',
      date: `${year}-05-09`,
      dayOfWeek: 'Friday',
      startTime: '06:15',
      endTime: '10:45',
      nakshatra: 'Hasta',
      tithi: 'Shukla Dwitiya',
      auspiciousness: 'Auspicious',
      notes: 'Hand of blessings bringing clean mental focus and physical vitality.',
    },
  ];

  if (category) {
    return allEntries.filter((e) => e.category === category);
  }
  return allEntries;
}

export type MuhuratCategory =
  | 'marriage'
  | 'vehicle'
  | 'griha_pravesh'
  | 'property'
  | 'business'
  | 'naamkaran'
  | 'mundan';

export function getMuhuratList(category: MuhuratCategory) {
  const catMap: Record<MuhuratCategory, ShubhMuhuratEntry['category']> = {
    marriage: 'Marriage',
    vehicle: 'Vehicle',
    griha_pravesh: 'Griha Pravesh',
    property: 'Property',
    business: 'Business',
    naamkaran: 'Ceremony',
    mundan: 'Ceremony',
  };
  const list = getShubhMuhuratList(new Date().getFullYear(), catMap[category] || 'Marriage');
  return list.map((item) => ({
    id: item.id,
    date: `${item.date} (${item.dayOfWeek})`,
    timeWindow: `${item.startTime} – ${item.endTime}`,
    nakshatra: item.nakshatra,
    tithi: item.tithi,
    significance: `${item.title}: ${item.notes}`,
  }));
}

