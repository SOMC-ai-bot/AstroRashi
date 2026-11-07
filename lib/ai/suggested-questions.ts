import { LanguageCode } from '@/types';

export interface SuggestedFAQ {
  id: string;
  category: string;
  question: string;
}

/**
 * Intelligent FAQ questions generator based on conversational context,
 * user intent (career, relationship, transits, dasha, remedies), and language.
 */
export function generateContextualFAQs(
  lastMessageText: string,
  userQuestion: string = '',
  lang: LanguageCode = 'en'
): SuggestedFAQ[] {
  const combined = `${userQuestion} ${lastMessageText}`.toLowerCase();

  // Career / Wealth
  if (
    combined.includes('career') ||
    combined.includes('job') ||
    combined.includes('profession') ||
    combined.includes('business') ||
    combined.includes('money') ||
    combined.includes('wealth') ||
    combined.includes('finance') ||
    combined.includes('नौकरी') ||
    combined.includes('व्यवसाय')
  ) {
    if (lang === 'hi') {
      return [
        { id: 'c1', category: 'करियर मार्गदर्शन', question: 'मेरी कुंडली में करियर में पदोन्नति का सही समय कब है?' },
        { id: 'c2', category: 'व्यवसाय एवं वित्त', question: 'क्या मुझे नौकरी में रहना चाहिए या खुद का व्यवसाय शुरू करना चाहिए?' },
        { id: 'c3', category: 'दशा प्रभाव', question: 'मेरी वर्तमान महादशा में धन प्राप्ति के क्या योग हैं?' },
        { id: 'c4', category: 'वैदिक उपाय', question: 'कार्यक्षेत्र में सफलता हेतु कौन से रत्न या उपाय फलदायी रहेंगे?' },
      ];
    }
    if (lang === 'hinglish') {
      return [
        { id: 'c1', category: 'Career Timing', question: 'Meri chart me promotion aur salary hike ka best timing kab hai?' },
        { id: 'c2', category: 'Business vs Job', question: 'Kya mujhe job continue karni chahiye ya business me shift hona chahiye?' },
        { id: 'c3', category: 'Dasha Insights', question: 'Current Mahadasha career growth ke liye kitni supportive hai?' },
        { id: 'c4', category: 'Remedies', question: 'Workplace success ke liye kaun se remedies ya mantras recommend hain?' },
      ];
    }
    return [
      { id: 'c1', category: 'Career Timing', question: 'When is my next auspicious window for a job promotion or switch?' },
      { id: 'c2', category: 'Vocation & Business', question: 'Does my chart favor independent enterprise or a stable corporate role?' },
      { id: 'c3', category: 'Dasha Impact', question: 'How is my current planetary period influencing my financial flow?' },
      { id: 'c4', category: 'Vedic Guidance', question: 'What classical remedies can remove professional roadblocks?' },
    ];
  }

  // Love / Marriage / Relationship
  if (
    combined.includes('love') ||
    combined.includes('marriage') ||
    combined.includes('partner') ||
    combined.includes('relationship') ||
    combined.includes('spouse') ||
    combined.includes('compatibility') ||
    combined.includes('विवाह') ||
    combined.includes('शादी')
  ) {
    if (lang === 'hi') {
      return [
        { id: 'm1', category: 'विवाह समय', question: 'मेरी कुंडली के अनुसार विवाह का योग कब बन रहा है?' },
        { id: 'm2', category: 'जीवनसाथी', question: 'मेरे भावी जीवनसाथी का स्वभाव और दिशा कैसी होगी?' },
        { id: 'm3', category: '7वां भाव', question: 'सप्तमेश की स्थिति वैवाहिक सुख के बारे में क्या संकेत देती है?' },
        { id: 'm4', category: 'सामंजस्य उपाय', question: 'प्रेम एवं संबंधों में मधुरता हेतु कौन सा उपाय सर्वश्रेष्ठ है?' },
      ];
    }
    if (lang === 'hinglish') {
      return [
        { id: 'm1', category: 'Marriage Timing', question: 'Meri kundli me marriage ke auspicious time kab ban rahe hain?' },
        { id: 'm2', category: 'Spouse Nature', question: 'Life partner ka nature aur background kaisa hone ke yog hain?' },
        { id: 'm3', category: '7th House Analysis', question: '7th house ruler mere marital harmony ke bare me kya batata hai?' },
        { id: 'm4', category: 'Remedies', question: 'Relationship peace aur understanding badhane ke liye remedies?' },
      ];
    }
    return [
      { id: 'm1', category: 'Marriage Timing', question: 'When are the strongest planetary transits for marriage or meeting my partner?' },
      { id: 'm2', category: 'Spouse Indicators', question: 'What attributes does my 7th house and Venus/Jupiter indicate about my spouse?' },
      { id: 'm3', category: 'Navamsha (D9)', question: 'How does my Navamsha chart reflect long-term marriage harmony?' },
      { id: 'm4', category: 'Relationship Harmony', question: 'What astrological practices enhance emotional bonding with my partner?' },
    ];
  }

  // Health / Energy / Well-being
  if (
    combined.includes('health') ||
    combined.includes('stress') ||
    combined.includes('energy') ||
    combined.includes('mental') ||
    combined.includes('disease') ||
    combined.includes('स्वास्थ्य') ||
    combined.includes('तनाव')
  ) {
    if (lang === 'hi') {
      return [
        { id: 'h1', category: 'स्वास्थ्य योग', question: 'मेरी जन्म कुंडली में ऊर्जा एवं शारीरिक शक्ति के क्या योग हैं?' },
        { id: 'h2', category: 'मानसिक शांति', question: 'चंद्रमा को बली करके मानसिक तनाव से मुक्ति कैसे पाएं?' },
        { id: 'h3', category: 'आयुर्वेदिक संतुलन', question: 'ग्रह स्थिति के अनुसार मेरे लिए कौन सा आहार-विहार अनुकूल है?' },
      ];
    }
    return [
      { id: 'h1', category: 'Vitality Analysis', question: 'What planetary influences govern my physical vitality and resilience?' },
      { id: 'h2', category: 'Mental Equilibrium', question: 'How can I strengthen my Moon placement to overcome mental fatigue?' },
      { id: 'h3', category: 'Chakra Balance', question: 'Which energy centers correspond to my current planetary transit?' },
    ];
  }

  // Transit / Sade Sati / Rahu-Ketu
  if (
    combined.includes('saturn') ||
    combined.includes('sade sati') ||
    combined.includes('rahu') ||
    combined.includes('ketu') ||
    combined.includes('transit') ||
    combined.includes('शनि') ||
    combined.includes('राहु')
  ) {
    if (lang === 'hi') {
      return [
        { id: 't1', category: 'शनि साढ़े साती', question: 'शनि की साढ़े साती या ढैया का मेरे जीवन पर क्या प्रभाव रहेगा?' },
        { id: 't2', category: 'राहु-केतु गोचर', question: 'राहु-केतु के वर्तमान गोचर से कौन से क्षेत्रों में बदलाव आएंगे?' },
        { id: 't3', category: 'शांति उपाय', question: 'शनि व राहु के प्रतिकूल प्रभाव को शांत करने के सरल उपाय क्या हैं?' },
      ];
    }
    return [
      { id: 't1', category: 'Saturn Period', question: 'How is Saturn’s transit currently shaping my patience and life lessons?' },
      { id: 't2', category: 'Karmic Nodes', question: 'What transformations are triggered by Rahu and Ketu in my chart?' },
      { id: 't3', category: 'Pacification', question: 'What classical mantras and charities pacify malefic planetary transits?' },
    ];
  }

  // General Vedic Astrological FAQs
  if (lang === 'hi') {
    return [
      { id: 'g1', category: 'भाग्य एवं उन्नति', question: 'मेरी कुंडली में सबसे अधिक शुभ और राजयोग कारक ग्रह कौन सा है?' },
      { id: 'g2', category: 'महादशा विश्लेषण', question: 'वर्तमान विंशोत्तरी दशा मेरे लिए कौन से नए अवसर लेकर आ रही है?' },
      { id: 'g3', category: 'आध्यात्मिक पथ', question: 'मेरी कुंडली के अनुसार मेरे जीवन का आध्यात्मिक उद्देश्य क्या है?' },
      { id: 'g4', category: 'दैनिक मार्गदर्शन', question: 'आज के दिन मेरे लिए कौन सा समय सबसे शुभ और अनुकूल रहेगा?' },
    ];
  }

  if (lang === 'hinglish') {
    return [
      { id: 'g1', category: 'Yogas & Strengths', question: 'Meri chart me sabse strong Raj Yoga ya Dhan Yoga kaun sa hai?' },
      { id: 'g2', category: 'Mahadasha Analysis', question: 'Present Mahadasha mere life goals ko kaise impact kar rahi hai?' },
      { id: 'g3', category: 'Soul Purpose', question: 'Vedic astrology ke according meri soul ka core life purpose kya hai?' },
      { id: 'g4', category: 'Actionable Remedies', question: 'Currently kaun se simple Vedic remedies mujhe daily follow karne chahiye?' },
    ];
  }

  return [
    { id: 'g1', category: 'Chart Strengths', question: 'Which planet is my primary Yogakaraka or functional benefic in this chart?' },
    { id: 'g2', category: 'Dasha Dynamics', question: 'What major milestones should I anticipate in my current Mahadasha cycle?' },
    { id: 'g3', category: 'Soul Purpose', question: 'What does my Atmakaraka and 9th house reveal about my spiritual journey?' },
    { id: 'g4', category: 'Daily Alignment', question: 'What daily disciplines and timings will best optimize my planetary energy?' },
  ];
}
