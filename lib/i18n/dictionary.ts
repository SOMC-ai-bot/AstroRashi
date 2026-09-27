import { LanguageCode } from '@/types';

export interface TranslationDictionary {
  appTitle: string;
  tagline: string;
  nav: {
    discover: string;
    charts: string;
    aiAssistant: string;
    consultant: string;
    community: string;
  };
  discover: {
    greeting: string;
    welcomeBack: string;
    premiumBannerTitle: string;
    premiumBannerSub: string;
    upgradeCTA: string;
    todayInsight: string;
    readMore: string;
    popularAstrologers: string;
    featuredDiscussions: string;
    yesterday: string;
    today: string;
    tomorrow: string;
  };
  charts: {
    title: string;
    subtitle: string;
    sunSign: string;
    moonSign: string;
    ascendant: string;
    tabs: {
      overview: string;
      positions: string;
      aspects: string;
      transits: string;
    };
    systemToggle: string;
    houseSystemToggle: string;
    askAI: string;
    viewWheel: string;
  };
  ai: {
    title: string;
    subtitle: string;
    placeholder: string;
    contextBadge: string;
    turnOffContext: string;
    turnOnContext: string;
    quickPromptsTitle: string;
    stopGenerating: string;
    regenerate: string;
    thinking: string;
    newChat: string;
    history: string;
  };
  consultants: {
    title: string;
    searchPlaceholder: string;
    bookSession: string;
    onlineNow: string;
    yearsExp: string;
    reviews: string;
    startingFrom: string;
    allSpecialities: string;
  };
  community: {
    title: string;
    createPost: string;
    searchCommunity: string;
    tabs: {
      forYou: string;
      following: string;
      trending: string;
      latest: string;
    };
    like: string;
    comment: string;
    share: string;
    save: string;
  };
  booking: {
    title: string;
    selectType: string;
    method: string;
    selectDate: string;
    selectTime: string;
    totalPrice: string;
    proceedToPay: string;
    confirmed: string;
  };
  profile: {
    title: string;
    birthDetails: string;
    editBirth: string;
    language: string;
    system: string;
    notifications: string;
    membership: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appTitle: 'AstroNex',
    tagline: 'Cosmic Intelligence & Self-Discovery',
    nav: {
      discover: 'Discover',
      charts: 'Charts',
      aiAssistant: 'Cosmic Chat',
      consultant: 'Consultant',
      community: 'Community',
    },
    discover: {
      greeting: 'Good day',
      welcomeBack: 'Welcome back',
      premiumBannerTitle: 'AstroNex Premium',
      premiumBannerSub: 'Unlock unlimited cosmic insights, deep chart transits, and priority astrologer sessions.',
      upgradeCTA: 'Upgrade Plan',
      todayInsight: "Today's Cosmic Energy",
      readMore: 'Read Full Analysis',
      popularAstrologers: 'Popular Astrologers',
      featuredDiscussions: 'Featured Community Discussions',
      yesterday: 'Yesterday',
      today: 'Today',
      tomorrow: 'Tomorrow',
    },
    charts: {
      title: 'Your Natal Chart',
      subtitle: 'Astronomical snapshot calculated at your precise birth moment',
      sunSign: 'Sun Sign',
      moonSign: 'Moon Sign',
      ascendant: 'Ascendant',
      tabs: {
        overview: 'Overview',
        positions: 'Positions',
        aspects: 'Aspects',
        transits: 'Transits',
      },
      systemToggle: 'Zodiac System',
      houseSystemToggle: 'House System',
      askAI: 'Consult Astrologer about this placement',
      viewWheel: 'Zodiac Wheel',
    },
    ai: {
      title: 'AstroNex Cosmic Intelligence',
      subtitle: 'Ask astrology queries or any life, career, relationship, and timing questions',
      placeholder: 'Ask anything (astrology, career, remedies, philosophy)...',
      contextBadge: 'Using your birth chart context',
      turnOffContext: 'Turn off chart context',
      turnOnContext: 'Turn on chart context',
      quickPromptsTitle: 'Suggested Inquiries',
      stopGenerating: 'Stop Generating',
      regenerate: 'Regenerate',
      thinking: 'Analyzing cosmic and logical context...',
      newChat: 'New Chat',
      history: 'Recent Chats',
    },
    consultants: {
      title: 'Consultant Marketplace',
      searchPlaceholder: 'Search astrologers by name, speciality, or tradition...',
      bookSession: 'Book Consultation',
      onlineNow: 'Online Now',
      yearsExp: 'yrs experience',
      reviews: 'reviews',
      startingFrom: 'From',
      allSpecialities: 'All Specialities',
    },
    community: {
      title: 'Cosmic Community',
      createPost: 'Create Post',
      searchCommunity: 'Search topics, questions, or #hashtags...',
      tabs: {
        forYou: 'For You',
        following: 'Following',
        trending: 'Trending',
        latest: 'Latest',
      },
      like: 'Like',
      comment: 'Comment',
      share: 'Share',
      save: 'Save',
    },
    booking: {
      title: 'Consultation Session Details',
      selectType: 'Select Consultation Focus',
      method: 'Meeting Method',
      selectDate: 'Choose Date',
      selectTime: 'Choose Time Slot',
      totalPrice: 'Total Session Fee',
      proceedToPay: 'Confirm & Reserve Slot',
      confirmed: 'Consultation Confirmed!',
    },
    profile: {
      title: 'Profile & Cosmic Settings',
      birthDetails: 'Birth Information',
      editBirth: 'Edit Birth Details',
      language: 'Application Language',
      system: 'Astrology System & Zodiac',
      notifications: 'Notifications',
      membership: 'Subscription Status',
    },
  },

  hi: {
    appTitle: 'एस्ट्रोनेक्स',
    tagline: 'कॉस्मिक इंटेलिजेंस एवं आत्म-अन्वेषण',
    nav: {
      discover: 'डिस्कवर',
      charts: 'कुंडली',
      aiAssistant: 'एआई सहायक',
      consultant: 'ज्योतिषी',
      community: 'समुदाय',
    },
    discover: {
      greeting: 'नमस्ते',
      welcomeBack: 'पुनः स्वागत है',
      premiumBannerTitle: 'एस्ट्रोनेक्स प्रीमियम',
      premiumBannerSub: 'असीमित एआई इनसाइट्स, विस्तृत गोचर और प्राथमिकता बुकिंग प्राप्त करें।',
      upgradeCTA: 'अपग्रेड करें',
      todayInsight: 'आज की ग्रहीय ऊर्जा',
      readMore: 'विस्तार से पढ़ें',
      popularAstrologers: 'प्रमुख ज्योतिषी',
      featuredDiscussions: 'समुदाय में चर्चित',
      yesterday: 'कल (बीता)',
      today: 'आज',
      tomorrow: 'कल (आने वाला)',
    },
    charts: {
      title: 'आपकी जन्म कुंडली',
      subtitle: 'आपके जन्म समय की सटीक खगोलीय गणना पर आधारित',
      sunSign: 'सूर्य राशि',
      moonSign: 'चंद्र राशि',
      ascendant: 'लग्न',
      tabs: {
        overview: 'सारांश',
        positions: 'ग्रह स्थिति',
        aspects: 'दृष्टि संबंध',
        transits: 'गोचर',
      },
      systemToggle: 'ज्योतिष पद्धति',
      houseSystemToggle: 'भाव पद्धति',
      askAI: 'एआई से इस स्थिति के बारे में पूछें',
      viewWheel: 'कुंडली चक्र',
    },
    ai: {
      title: 'एस्ट्रोनेक्स एआई सहायक',
      subtitle: 'ज्योतिष या जीवन, करियर व कोडिंग का कोई भी सामान्य प्रश्न पूछें',
      placeholder: 'कुछ भी पूछें (कुंडली, करियर, कोडिंग, दर्शन)...',
      contextBadge: 'आपकी जन्म कुंडली का उपयोग कर रहा है',
      turnOffContext: 'कुंडली संदर्भ बंद करें',
      turnOnContext: 'कुंडली संदर्भ चालू करें',
      quickPromptsTitle: 'सुझाए गए प्रश्न',
      stopGenerating: 'रोकें',
      regenerate: 'पुनः उत्पन्न करें',
      thinking: 'विश्लेषण कर रहा है...',
      newChat: 'नई बातचीत',
      history: 'पिछली बातचीत',
    },
    consultants: {
      title: 'ज्योतिषी परामर्श मंच',
      searchPlaceholder: 'ज्योतिषी, विशेषज्ञता या पद्धति से खोजें...',
      bookSession: 'सत्र बुक करें',
      onlineNow: 'उपलब्ध हैं',
      yearsExp: 'वर्षों का अनुभव',
      reviews: 'समीक्षाएं',
      startingFrom: 'शुरुआत',
      allSpecialities: 'सभी विशेषज्ञताएं',
    },
    community: {
      title: 'ज्योतिष समुदाय',
      createPost: 'पोस्ट लिखें',
      searchCommunity: 'विषय या #हैशटैग खोजें...',
      tabs: {
        forYou: 'आपके लिए',
        following: 'फॉलो कर रहे हैं',
        trending: 'ट्रेंडिंग',
        latest: 'नवीनतम',
      },
      like: 'पसंद',
      comment: 'टिप्पणी',
      share: 'साझा करें',
      save: 'सहेजें',
    },
    booking: {
      title: 'परामर्श सत्र का विवरण',
      selectType: 'परामर्श का विषय चुनें',
      method: 'माध्यम',
      selectDate: 'तारीख चुनें',
      selectTime: 'समय चुनें',
      totalPrice: 'सत्र शुल्क',
      proceedToPay: 'स्थान सुरक्षित करें',
      confirmed: 'परामर्श सफलतापूर्वक बुक हो गया!',
    },
    profile: {
      title: 'प्रोफाइल एवं सेटिंग्स',
      birthDetails: 'जन्म विवरण',
      editBirth: 'जन्म विवरण बदलें',
      language: 'भाषा',
      system: 'ज्योतिष पद्धति',
      notifications: 'सूचनाएं',
      membership: 'सदस्यता स्थिति',
    },
  },

  hinglish: {
    appTitle: 'AstroNex',
    tagline: 'Cosmic Intelligence & Self-Discovery',
    nav: {
      discover: 'Discover',
      charts: 'Kundli',
      aiAssistant: 'AI Dost',
      consultant: 'Astrologers',
      community: 'Community',
    },
    discover: {
      greeting: 'Namaste',
      welcomeBack: 'Welcome back',
      premiumBannerTitle: 'AstroNex Premium',
      premiumBannerSub: 'Unlimited AI insights, deep transits aur priority booking paayein.',
      upgradeCTA: 'Upgrade Karein',
      todayInsight: "Aaj Ki Cosmic Energy",
      readMore: 'Poora Padhein',
      popularAstrologers: 'Popular Astrologers',
      featuredDiscussions: 'Community Discussions',
      yesterday: 'Kal (Beeta)',
      today: 'Aaj',
      tomorrow: 'Kal (Aane wala)',
    },
    charts: {
      title: 'Aapki Janam Kundli',
      subtitle: 'Aapke exact birth time ke mathematical data par based',
      sunSign: 'Sun Sign (Surya)',
      moonSign: 'Moon Sign (Chandra)',
      ascendant: 'Lagna',
      tabs: {
        overview: 'Overview',
        positions: 'Graha Sthiti',
        aspects: 'Drishti',
        transits: 'Gochar',
      },
      systemToggle: 'Astrology System',
      houseSystemToggle: 'Bhava System',
      askAI: 'AI se is placement ke baare me poochein',
      viewWheel: 'Kundli Chakra',
    },
    ai: {
      title: 'AstroNex AI Assistant',
      subtitle: 'Kundli ho ya daily life, career ya normal coding - sab poochein',
      placeholder: 'Kuch bhi poochiye (Career, Kundli, Coding, Relationship)...',
      contextBadge: 'Aapki janam kundli use ho rahi hai',
      turnOffContext: 'Chart context band karein',
      turnOnContext: 'Chart context on karein',
      quickPromptsTitle: 'Suggested Questions',
      stopGenerating: 'Stop Karein',
      regenerate: 'Regenerate Karein',
      thinking: 'Analyze kar raha hoon...',
      newChat: 'New Chat',
      history: 'Recent Chats',
    },
    consultants: {
      title: 'Astrologer Marketplace',
      searchPlaceholder: 'Astrologer ya speciality search karein...',
      bookSession: 'Session Book Karein',
      onlineNow: 'Online Hai',
      yearsExp: 'saal ka experience',
      reviews: 'reviews',
      startingFrom: 'Starting at',
      allSpecialities: 'All Specialities',
    },
    community: {
      title: 'AstroNex Community',
      createPost: 'Post Create Karein',
      searchCommunity: 'Search #hashtags ya questions...',
      tabs: {
        forYou: 'For You',
        following: 'Following',
        trending: 'Trending',
        latest: 'Latest',
      },
      like: 'Like',
      comment: 'Comment',
      share: 'Share',
      save: 'Save',
    },
    booking: {
      title: 'Session Details',
      selectType: 'Consultation Type Select Karein',
      method: 'Call Method',
      selectDate: 'Date Choose Karein',
      selectTime: 'Time Slot Choose Karein',
      totalPrice: 'Total Fees',
      proceedToPay: 'Confirm & Book Karein',
      confirmed: 'Booking Confirm Ho Gayi!',
    },
    profile: {
      title: 'Profile & Settings',
      birthDetails: 'Birth Details',
      editBirth: 'Birth Data Edit Karein',
      language: 'App Language',
      system: 'Vedic / Western System',
      notifications: 'Notifications',
      membership: 'Subscription Plan',
    },
  },

  bn: {
    appTitle: 'অ্যাস্ট্রোনোক্স',
    tagline: 'মহাজাগতিক জ্ঞান ও আত্ম-আবিষ্কার',
    nav: {
      discover: 'আবিষ্কার',
      charts: 'কোষ্ঠী',
      aiAssistant: 'এআই সহকারী',
      consultant: 'জ্যোতিষী',
      community: 'কমিউনিটি',
    },
    discover: {
      greeting: 'নমস্কার',
      welcomeBack: 'স্বাগতম',
      premiumBannerTitle: 'অ্যাস্ট্রোনোক্স প্রিমিয়াম',
      premiumBannerSub: 'সীমাহীন এআই বিশ্লেষণ এবং অগ্রাধিকার বুকিং পান।',
      upgradeCTA: 'আপগ্রেড করুন',
      todayInsight: 'আজকের মহাজাগতিক শক্তি',
      readMore: 'বিস্তারিত পড়ুন',
      popularAstrologers: 'জনপ্রিয় জ্যোতিষীগণ',
      featuredDiscussions: 'আলোচিত বিষয়সমূহ',
      yesterday: 'গতকাল',
      today: 'আজ',
      tomorrow: 'আগামীকাল',
    },
    charts: {
      title: 'আপনার জন্ম কোষ্ঠী',
      subtitle: 'আপনার জন্মের সঠিক সময়ের উপর নির্ভুল গণনা',
      sunSign: 'সূর্য রাশি',
      moonSign: 'চন্দ্র রাশি',
      ascendant: 'লগ্ন',
      tabs: {
        overview: 'সারসংক্ষেপ',
        positions: 'গ্রহের অবস্থান',
        aspects: 'দৃষ্টি',
        transits: 'গোচর',
      },
      systemToggle: 'জ্যোতিষ পদ্ধতি',
      houseSystemToggle: 'ভাব পদ্ধতি',
      askAI: 'এআই-কে এই অবস্থান সম্পর্কে জিজ্ঞাসা করুন',
      viewWheel: 'কোষ্ঠী চক্র',
    },
    ai: {
      title: 'অ্যাস্ট্রোনোক্স এআই সহকারী',
      subtitle: 'জ্যোতিষ বা সাধারণ ক্যারিয়ার ও কোডিং প্রশ্ন করুন',
      placeholder: 'যেকোনো কিছু জিজ্ঞাসা করুন...',
      contextBadge: 'আপনার কোষ্ঠীর তথ্য ব্যবহৃত হচ্ছে',
      turnOffContext: 'কোষ্ঠী রেফারেন্স বন্ধ করুন',
      turnOnContext: 'কোষ্ঠী রেফারেন্স চালু করুন',
      quickPromptsTitle: 'প্রস্তাবিত প্রশ্ন',
      stopGenerating: 'থামান',
      regenerate: 'আবার তৈরি করুন',
      thinking: 'বিশ্লেষণ চলছে...',
      newChat: 'নতুন চ্যাট',
      history: 'পূর্ববর্তী চ্যাট',
    },
    consultants: {
      title: 'জ্যোতিষী পরামর্শক',
      searchPlaceholder: 'জ্যোতিষী বা বিশেষত্ব অনুসন্ধান করুন...',
      bookSession: 'সেশন বুক করুন',
      onlineNow: 'অনলাইন আছেন',
      yearsExp: 'বছরের অভিজ্ঞতা',
      reviews: 'মতামত',
      startingFrom: 'শুরু',
      allSpecialities: 'সকল বিশেষত্ব',
    },
    community: {
      title: 'কমিউনিটি',
      createPost: 'পোস্ট তৈরি করুন',
      searchCommunity: 'বিষয় বা হ্যাশট্যাগ অনুসন্ধান করুন...',
      tabs: {
        forYou: 'আপনার জন্য',
        following: 'অনুসরণ করছেন',
        trending: 'ট্রেন্ডিং',
        latest: 'সাম্প্রতিক',
      },
      like: 'পছন্দ',
      comment: 'মন্তব্য',
      share: 'শেয়ার',
      save: 'সংরক্ষণ',
    },
    booking: {
      title: 'পরামর্শের বিবরণ',
      selectType: 'পরামর্শের ধরন নির্বাচন করুন',
      method: 'পদ্ধতি',
      selectDate: 'তারিখ নির্বাচন করুন',
      selectTime: 'সময় নির্বাচন করুন',
      totalPrice: 'মোট ফি',
      proceedToPay: 'নিশ্চিত করুন',
      confirmed: 'বুকিং সম্পন্ন হয়েছে!',
    },
    profile: {
      title: 'প্রোফাইল ও সেটিংস',
      birthDetails: 'জন্মের তথ্য',
      editBirth: 'জন্ম তথ্য পরিবর্তন করুন',
      language: 'ভাষা',
      system: 'পদ্ধতি',
      notifications: 'বিজ্ঞপ্তি',
      membership: 'সাবস্ক্রিপশন',
    },
  },

  ta: {
    appTitle: 'ஆஸ்ட்ரோநெக்ஸ்',
    tagline: 'பிரபஞ்ச நுண்ணறிவு மற்றும் சுய கண்டுபிடிப்பு',
    nav: {
      discover: 'கண்டறிக',
      charts: 'ஜாதகம்',
      aiAssistant: 'AI உதவியாளர்',
      consultant: 'ஜோதிடர்கள்',
      community: 'சமூகம்',
    },
    discover: {
      greeting: 'வணக்கம்',
      welcomeBack: 'மீண்டும் நல்வரவு',
      premiumBannerTitle: 'ஆஸ்ட்ரோநெக்ஸ் பிரீமியம்',
      premiumBannerSub: 'வரம்பற்ற AI வழிகாட்டுதல் மற்றும் முன்னுரிமை முன்பதிவு பெறுக.',
      upgradeCTA: 'மேம்படுத்துக',
      todayInsight: 'இன்றைய பிரபஞ்ச ஆற்றல்',
      readMore: 'முழு விவரம்',
      popularAstrologers: 'பிரபல ஜோதிடர்கள்',
      featuredDiscussions: 'சமூக விவாதங்கள்',
      yesterday: 'நேற்று',
      today: 'இன்று',
      tomorrow: 'நாளை',
    },
    charts: {
      title: 'உங்கள் பிறந்த ஜாதகம்',
      subtitle: 'துல்லியமான வானியல் கணிப்பு',
      sunSign: 'சூரிய ராசி',
      moonSign: 'சந்திர ராசி',
      ascendant: 'லக்னம்',
      tabs: {
        overview: 'கண்ணோட்டம்',
        positions: 'கிரக நிலைகள்',
        aspects: 'பார்வைகள்',
        transits: 'கோச்சாரம்',
      },
      systemToggle: 'ஜோதிட முறை',
      houseSystemToggle: 'பாவகம்',
      askAI: 'AI-யிடம் கேட்கவும்',
      viewWheel: 'ஜாதக சக்கரம்',
    },
    ai: {
      title: 'ஆஸ்ட்ரோநெக்ஸ் AI',
      subtitle: 'ஜோதிடம் அல்லது பொதுவான கேள்விகளைக் கேளுங்கள்',
      placeholder: 'எதையும் கேளுங்கள்...',
      contextBadge: 'உங்கள் ஜாதகத் தகவல் பயன்படுத்தப்படுகிறது',
      turnOffContext: 'ஜாதக அமைப்பை நிறுத்து',
      turnOnContext: 'ஜாதக அமைப்பை இயக்கு',
      quickPromptsTitle: 'பரிந்துரைக்கப்பட்ட கேள்விகள்',
      stopGenerating: 'நிறுத்து',
      regenerate: 'மீண்டும் உருவாக்கு',
      thinking: 'சிந்திக்கிறது...',
      newChat: 'புதிய உரையாடல்',
      history: 'முந்தையவை',
    },
    consultants: {
      title: 'ஜோதிட சந்தை',
      searchPlaceholder: 'ஜோதிடரைத் தேடுங்கள்...',
      bookSession: 'பதிவு செய்க',
      onlineNow: 'ஆன்லைனில்',
      yearsExp: 'ஆண்டுகள் அனுபவம்',
      reviews: 'மதிப்புரைகள்',
      startingFrom: 'தொடக்க விலை',
      allSpecialities: 'அனைத்து பிரிவுகள்',
    },
    community: {
      title: 'ஜோதிட சமூகம்',
      createPost: 'பதிவிடுக',
      searchCommunity: 'தேடுக...',
      tabs: {
        forYou: 'உங்களுக்காக',
        following: 'பின்பற்றுபவை',
        trending: 'டிரெண்டிங்',
        latest: 'சமீபத்தியவை',
      },
      like: 'விருப்பம்',
      comment: 'கருத்து',
      share: 'பகிர்',
      save: 'சேமி',
    },
    booking: {
      title: 'ஆலோசனை விவரங்கள்',
      selectType: 'பிரிவை தேர்ந்தெடுக்கவும்',
      method: 'முறை',
      selectDate: 'தேதியை தேர்ந்தெடுக்கவும்',
      selectTime: 'நேரத்தை தேர்ந்தெடுக்கவும்',
      totalPrice: 'மொத்த கட்டணம்',
      proceedToPay: 'உறுதி செய்க',
      confirmed: 'முன்பதிவு உறுதியானது!',
    },
    profile: {
      title: 'சுயவிவரம்',
      birthDetails: 'பிறந்த விவரங்கள்',
      editBirth: 'மாற்றுக',
      language: 'மொழி',
      system: 'ஜோதிட அமைப்பு',
      notifications: 'அறிவிப்புகள்',
      membership: 'சந்தா நிலை',
    },
  },

  te: {
    appTitle: 'ఆస్ట్రోనెక్స్',
    tagline: 'కాస్మిక్ ఇంటెలిజెన్స్ & ఆత్మ అన్వేషణ',
    nav: {
      discover: 'అన్వేషించండి',
      charts: 'జాతకం',
      aiAssistant: 'AI సహాయకుడు',
      consultant: 'జ్యోతిష్కులు',
      community: 'కమ్యూనిటీ',
    },
    discover: {
      greeting: 'నమస్కారం',
      welcomeBack: 'పునః స్వాగతం',
      premiumBannerTitle: 'ఆస్ట్రోనెక్స్ ప్రీమియం',
      premiumBannerSub: 'పరిమితి లేని AI అంతర్దృష్టులు మరియు ప్రాధాన్య బుకింగ్.',
      upgradeCTA: 'అప్‌గ్రేడ్ చేయండి',
      todayInsight: 'నేటి కాస్మిక్ శక్తి',
      readMore: 'పూర్తి వివరాలు',
      popularAstrologers: 'ప్రముఖ జ్యోతిష్కులు',
      featuredDiscussions: 'ప్రముఖ చర్చలు',
      yesterday: 'నిన్న',
      today: 'నేడు',
      tomorrow: 'రేపు',
    },
    charts: {
      title: 'మీ జన్మ కుండలి',
      subtitle: 'ఖచ్చితమైన ఖగోళ గణనల ఆధారంగా',
      sunSign: 'సూర్య రాశి',
      moonSign: 'చంద్ర రాశి',
      ascendant: 'లగ్నం',
      tabs: {
        overview: 'సారాంశం',
        positions: 'గ్రహ స్థితులు',
        aspects: 'దృష్టి',
        transits: 'గోచారం',
      },
      systemToggle: 'జ్యోతిష పద్ధతి',
      houseSystemToggle: 'భావ పద్ధతి',
      askAI: 'AI ని అడగండి',
      viewWheel: 'కుండలి చక్రం',
    },
    ai: {
      title: 'ఆస్ట్రోనెక్స్ AI',
      subtitle: 'జ్యోతిష్యం లేదా ఏవైనా సాధారణ ప్రశ్నలు అడగండి',
      placeholder: 'ఏదైనా అడగండి...',
      contextBadge: 'మీ కుండలి ఆధారంగా',
      turnOffContext: 'కుండలి ప్రస్తావన ఆపివేయి',
      turnOnContext: 'కుండలి ప్రస్తావన ప్రారంభించు',
      quickPromptsTitle: 'సూచించిన ప్రశ్నలు',
      stopGenerating: 'ఆపు',
      regenerate: 'మళ్ళీ రూపొందించు',
      thinking: 'విశ్లేషిస్తోంది...',
      newChat: 'కొత్త చాట్',
      history: 'మునుపటి చాట్స్',
    },
    consultants: {
      title: 'జ్యోతిష్యుల మార్కెట్',
      searchPlaceholder: 'జ్యోతిష్కుడిని శోధించండి...',
      bookSession: 'బుక్ చేయండి',
      onlineNow: 'ఆన్‌లైన్ లో ఉన్నారు',
      yearsExp: 'సంవత్సరాల అనుభవం',
      reviews: 'సమీక్షలు',
      startingFrom: 'ప్రారంభం',
      allSpecialities: 'అన్ని విభాగాలు',
    },
    community: {
      title: 'జ్యోతిష్య కమ్యూనిటీ',
      createPost: 'పోస్ట్ రాయండి',
      searchCommunity: 'శోధించండి...',
      tabs: {
        forYou: 'మీ కోసం',
        following: 'ఫాలో అవుతున్నవి',
        trending: 'ట్రెండింగ్',
        latest: 'తాజావి',
      },
      like: 'లైక్',
      comment: 'కామెంట్',
      share: 'షేర్',
      save: 'సేవ్',
    },
    booking: {
      title: 'సెషన్ వివరాలు',
      selectType: 'రకాన్ని ఎంచుకోండి',
      method: 'పద్ధతి',
      selectDate: 'తేదీని ఎంచుకోండి',
      selectTime: 'సమయాన్ని ఎంచుకోండి',
      totalPrice: 'మొత్తం రుసుము',
      proceedToPay: 'నిర్ధారించండి',
      confirmed: 'బుకింగ్ విజయవంతమైంది!',
    },
    profile: {
      title: 'ప్రొఫైల్ మరియు సెట్టింగ్స్',
      birthDetails: 'జన్మ వివరాలు',
      editBirth: 'సవరించండి',
      language: 'భాష',
      system: 'పద్ధతి',
      notifications: 'నోటిఫికేషన్లు',
      membership: 'సభ్యత్వ హోదా',
    },
  },

  mr: {
    appTitle: 'অ্যাस्ट्रोनेक्स',
    tagline: 'कॉस्मिक बुद्धिमत्ता आणि स्व-शोध',
    nav: {
      discover: 'डिस्कव्हर',
      charts: 'कुंडली',
      aiAssistant: 'एआय सहाय्यक',
      consultant: 'ज्योतिषी',
      community: 'कम्युनिटी',
    },
    discover: {
      greeting: 'नमस्कार',
      welcomeBack: 'पुन्हा स्वागत आहे',
      premiumBannerTitle: 'एस्ट्रोनेक्स प्रीमियम',
      premiumBannerSub: 'अमर्याद एआय विश्लेषण आणि प्राधान्य बुकिंग मिळवा.',
      upgradeCTA: 'अपग्रेड करा',
      todayInsight: 'आजची ग्रहीय ऊर्जा',
      readMore: 'सविस्तर वाचा',
      popularAstrologers: 'लोकप्रिय ज्योतिषी',
      featuredDiscussions: 'चर्चेतील विषय',
      yesterday: 'काल',
      today: 'आज',
      tomorrow: 'उद्या',
    },
    charts: {
      title: 'तुमची जन्मपत्रिका',
      subtitle: 'अचूक खगोलीय गणितावर आधारित',
      sunSign: 'सूर्य रास',
      moonSign: 'चंद्र रास',
      ascendant: 'लग्न',
      tabs: {
        overview: 'आढावा',
        positions: 'ग्रह स्थिती',
        aspects: 'दृष्टी',
        transits: 'गोचर',
      },
      systemToggle: 'ज्योतिष पद्धत',
      houseSystemToggle: 'स्थान पद्धत',
      askAI: 'एआय ला विचारा',
      viewWheel: 'कुंडली चक्र',
    },
    ai: {
      title: 'एस्ट्रोनेक्स एआय',
      subtitle: 'ज्योतिष किंवा जीवनातील कोणताही प्रश्न विचारा',
      placeholder: 'काहीही विचारा...',
      contextBadge: 'तुमची कुंडली वापरत आहे',
      turnOffContext: 'कुंडली संदर्भ बंद करा',
      turnOnContext: 'कुंडली संदर्भ चालू करा',
      quickPromptsTitle: 'सुचवलेले प्रश्न',
      stopGenerating: 'थांबवा',
      regenerate: 'पुन्हा जनरेट करा',
      thinking: 'विश्लेषण सुरू आहे...',
      newChat: 'नवीन संभाषण',
      history: 'मागील संभाषणे',
    },
    consultants: {
      title: 'ज्योतिषी कन्सल्टेशन',
      searchPlaceholder: 'ज्योतिषी शोधा...',
      bookSession: 'सत्र बुक करा',
      onlineNow: 'ऑनलाइन उपलब्ध',
      yearsExp: 'वर्षांचा अनुभव',
      reviews: 'अभिप्राय',
      startingFrom: 'किमान',
      allSpecialities: 'सर्व शाखा',
    },
    community: {
      title: 'कम्युनिटी',
      createPost: 'पोस्ट करा',
      searchCommunity: 'शोध घ्या...',
      tabs: {
        forYou: 'तुमच्यासाठी',
        following: 'फॉलो करत आहात',
        trending: 'ट्रेंडिंग',
        latest: 'नवीनतम',
      },
      like: 'लाईक',
      comment: 'कमेंट',
      share: 'शेअर',
      save: 'जतन करा',
    },
    booking: {
      title: 'सत्र तपशील',
      selectType: 'प्रकार निवडा',
      method: 'माध्यम',
      selectDate: 'तारीख निवडा',
      selectTime: 'वेळ निवडा',
      totalPrice: 'एकूण शुल्क',
      proceedToPay: 'निश्चित करा',
      confirmed: 'सत्र यशस्वीरित्या बुक झाले!',
    },
    profile: {
      title: 'प्रोफाइल आणि सेटिंग्ज',
      birthDetails: 'जन्म माहिती',
      editBirth: 'बदल करा',
      language: 'भाषा',
      system: 'पद्धत',
      notifications: 'सूचना',
      membership: 'सदस्यता स्थिती',
    },
  },

  gu: {
    appTitle: 'એસ્ટ્રોનેક્સ',
    tagline: 'કોસ્મિક બુદ્ધિમત્તા અને આત્મ-શોધ',
    nav: {
      discover: 'શોધો',
      charts: 'કુંડળી',
      aiAssistant: 'AI સહાયક',
      consultant: 'જ્યોતિષી',
      community: 'સમુદાય',
    },
    discover: {
      greeting: 'નમસ્તે',
      welcomeBack: 'સ્વાગત છે',
      premiumBannerTitle: 'એસ્ટ્રોનેક્સ પ્રીમિયમ',
      premiumBannerSub: 'અમર્યાદિત AI સલાહ અને પ્રાથમિકતા બુકિંગ મેળવો.',
      upgradeCTA: 'અપગ્રેડ કરો',
      todayInsight: 'આજની ગ્રહીય ઊર્જા',
      readMore: 'સંપૂર્ણ વાંચો',
      popularAstrologers: 'લોકપ્રિય જ્યોતિષીઓ',
      featuredDiscussions: 'ચર્ચિત વિષયો',
      yesterday: 'ગઈકાલે',
      today: 'આજે',
      tomorrow: 'આવતીકાલે',
    },
    charts: {
      title: 'તમારી જન્મકુંડળી',
      subtitle: 'સચોટ ખગોળીય ગણતરી પર આધારિત',
      sunSign: 'સૂર્ય રાશિ',
      moonSign: 'ચંદ્ર રાશિ',
      ascendant: 'લગ્ન',
      tabs: {
        overview: 'સારાંશ',
        positions: 'ગ્રહ સ્થિતિ',
        aspects: 'દ્રષ્ટિ',
        transits: 'ગોચર',
      },
      systemToggle: 'જ્યોતિષ પદ્ધતિ',
      houseSystemToggle: 'ભાવ પદ્ધતિ',
      askAI: 'AI ને પૂછો',
      viewWheel: 'કુંડળી ચક્ર',
    },
    ai: {
      title: 'એસ્ટ્રોનેક્સ AI',
      subtitle: 'કુંડળી કે કોઈપણ સામાન્ય પ્રશ્ન પૂછો',
      placeholder: 'કંઈપણ પૂછો...',
      contextBadge: 'કુંડળીની માહિતીનો ઉપયોગ થઈ રહ્યો છે',
      turnOffContext: 'કુંડળી સંદર્ભ બંધ કરો',
      turnOnContext: 'કુંડળી સંદર્ભ ચાલુ કરો',
      quickPromptsTitle: 'સૂચવેલા પ્રશ્નો',
      stopGenerating: 'અટકાવો',
      regenerate: 'ફરીથી બનાવો',
      thinking: 'વિશ્લેષણ કરી રહ્યું છે...',
      newChat: 'નવી વાતચીત',
      history: 'પાછલી વાતચીત',
    },
    consultants: {
      title: 'જ્યોતિષી સલાહકાર',
      searchPlaceholder: 'જ્યોતિષી શોધો...',
      bookSession: 'બુકિંગ કરો',
      onlineNow: 'ઓનલાઇન છે',
      yearsExp: 'વર્ષનો અનુભવ',
      reviews: 'સમીક્ષાઓ',
      startingFrom: 'પ્રારંભિક',
      allSpecialities: 'બધી વિશેષતાઓ',
    },
    community: {
      title: 'સમુદાય',
      createPost: 'પોસ્ટ બનાવો',
      searchCommunity: 'શોધ કરો...',
      tabs: {
        forYou: 'તમારા માટે',
        following: 'ફોલો કરો છો',
        trending: 'ટ્રેન્ડિંગ',
        latest: 'નવીનતમ',
      },
      like: 'પસંદ',
      comment: 'ટિપ્પણી',
      share: 'શેર',
      save: 'સાચવો',
    },
    booking: {
      title: 'વિગતો',
      selectType: 'પ્રકાર પસંદ કરો',
      method: 'માધ્યમ',
      selectDate: 'તારીખ પસંદ કરો',
      selectTime: 'સમય પસંદ કરો',
      totalPrice: 'કુલ ફી',
      proceedToPay: 'પુષ્ટિ કરો',
      confirmed: 'બુકિંગ સફળ રહ્યું!',
    },
    profile: {
      title: 'પ્રોફાઇલ',
      birthDetails: 'જન્મ વિગતો',
      editBirth: 'ફેરફાર કરો',
      language: 'ભાષા',
      system: 'પદ્ધતિ',
      notifications: 'સૂચનાઓ',
      membership: 'સભ્યપદ',
    },
  },

  kn: {
    appTitle: 'ಆಸ್ಟ್ರೋನೆಕ್ಸ್',
    tagline: 'ಕಾಸ್ಮಿಕ್ ಬುದ್ಧಿವಂತಿಕೆ ಮತ್ತು ಆತ್ಮ ಶೋಧನೆ',
    nav: {
      discover: 'ಅನ್ವೇಷಿಸಿ',
      charts: 'ಕುಂಡಲಿ',
      aiAssistant: 'AI ಸಹಾಯಕ',
      consultant: 'ಜ್ಯೋತಿಷಿಗಳು',
      community: 'ಸಮುದಾಯ',
    },
    discover: {
      greeting: 'ನಮಸ್ಕಾರ',
      welcomeBack: 'ಮತ್ತೆ ಸುಸ್ವಾಗತ',
      premiumBannerTitle: 'ಆಸ್ಟ್ರೋನೆಕ್ಸ್ ಪ್ರೀಮಿಯಂ',
      premiumBannerSub: 'ಅನಿಯಮಿತ AI ಒಳನೋಟಗಳು ಮತ್ತು ಆದ್ಯತೆಯ ಬುಕಿಂಗ್ ಪಡೆಯಿರಿ.',
      upgradeCTA: 'ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಿ',
      todayInsight: 'ಇಂದಿನ ಕಾಸ್ಮಿಕ್ ಶಕ್ತಿ',
      readMore: 'ಸಂಪೂರ್ಣ ಓದಿ',
      popularAstrologers: 'ಜನಪ್ರಿಯ ಜ್ಯೋತಿಷಿಗಳು',
      featuredDiscussions: 'ಚರ್ಚೆಯಲ್ಲಿರುವ ವಿಷಯಗಳು',
      yesterday: 'ನಿನ್ನೆ',
      today: 'ಇಂದು',
      tomorrow: 'ನಾಳೆ',
    },
    charts: {
      title: 'ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿ',
      subtitle: 'ನಿಖರವಾದ ಖಗೋಳ ಲೆಕ್ಕಾಚಾರಗಳ ಆಧಾರದ ಮೇಲೆ',
      sunSign: 'ಸೂರ್ಯ ರಾಶಿ',
      moonSign: 'ಚಂದ್ರ ರಾಶಿ',
      ascendant: 'ಲಗ್ನ',
      tabs: {
        overview: 'ಅವಲೋಕನ',
        positions: 'ಗ್ರಹ ಸ್ಥಿತಿಗಳು',
        aspects: 'ದೃಷ್ಟಿ',
        transits: 'ಗೋಚಾರ',
      },
      systemToggle: 'ಜ್ಯೋತಿಷ್ಯ ಪದ್ಧತಿ',
      houseSystemToggle: 'ಭಾವ ಪದ್ಧತಿ',
      askAI: 'AI ಗೆ ಕೇಳಿ',
      viewWheel: 'ಕುಂಡಲಿ ಚಕ್ರ',
    },
    ai: {
      title: 'ಆಸ್ಟ್ರೋನೆಕ್ಸ್ AI',
      subtitle: 'ಜ್ಯೋತಿಷ್ಯ ಅಥವಾ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ',
      placeholder: 'ಏನನ್ನಾದರೂ ಕೇಳಿ...',
      contextBadge: 'ಕುಂಡಲಿಯ ವಿವರಗಳನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ',
      turnOffContext: 'ಕುಂಡಲಿ ಉಲ್ಲೇಖ ನಿಲ್ಲಿಸಿ',
      turnOnContext: 'ಕುಂಡಲಿ ಉಲ್ಲೇಖ ಪ್ರಾರಂಭಿಸಿ',
      quickPromptsTitle: 'ಸೂಚಿಸಲಾದ ಪ್ರಶ್ನೆಗಳು',
      stopGenerating: 'ನಿಲ್ಲಿಸಿ',
      regenerate: 'ಮತ್ತೆ ರಚಿಸಿ',
      thinking: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      newChat: 'ಹೊಸ ಸಂವಾದ',
      history: 'ಹಿಂದಿನ ಸಂವಾದಗಳು',
    },
    consultants: {
      title: 'ಜ್ಯೋತಿಷಿಗಳ ಮಾರ್ಕೆಟ್',
      searchPlaceholder: 'ಜ್ಯೋತಿಷಿಗಳನ್ನು ಹುಡುಕಿ...',
      bookSession: 'ಬುಕ್ ಮಾಡಿ',
      onlineNow: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದಾರೆ',
      yearsExp: 'ವರ್ಷಗಳ ಅನುಭವ',
      reviews: 'ವಿಮರ್ಶೆಗಳು',
      startingFrom: 'ಪ್ರಾರಂಭಿಕ',
      allSpecialities: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು',
    },
    community: {
      title: 'ಜ್ಯೋತಿಷ್ಯ ಸಮುದಾಯ',
      createPost: 'ಪೋಸ್ಟ್ ಮಾಡಿ',
      searchCommunity: 'ಹುಡುಕಿ...',
      tabs: {
        forYou: 'ನಿಮಗಾಗಿ',
        following: 'ಫಾಲೋ ಮಾಡುತ್ತಿರುವುದು',
        trending: 'ಟ್ರೆಂಡಿಂಗ್',
        latest: 'ಇತ್ತೀಚಿನವು',
      },
      like: 'ಇಷ್ಟ',
      comment: 'ಕಾಮೆಂಟ್',
      share: 'ಹಂಚಿಕೊಳ್ಳಿ',
      save: 'ಉಳಿಸಿ',
    },
    booking: {
      title: 'ಸೆಷನ್ ವಿವರಗಳು',
      selectType: 'ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      method: 'ವಿಧಾನ',
      selectDate: 'ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
      selectTime: 'ಸಮಯ ಆಯ್ಕೆಮಾಡಿ',
      totalPrice: 'ಒಟ್ಟು ಶುಲ್ಕ',
      proceedToPay: 'ಖಚಿತಪಡಿಸಿ',
      confirmed: 'ಬುಕಿಂಗ್ ದೃಢಪಟ್ಟಿದೆ!',
    },
    profile: {
      title: 'ಪ್ರೊಫೈಲ್ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್ಸ್',
      birthDetails: 'ಜನ್ಮ ವಿವರಗಳು',
      editBirth: 'ಬದಲಾಯಿಸಿ',
      language: 'ಭಾಷೆ',
      system: 'ಪದ್ಧತಿ',
      notifications: 'ಸೂಚನೆಗಳು',
      membership: 'ಚಂದಾದಾರಿಕೆ ಸ್ಥಿತಿ',
    },
  },
} as any;

// Fallback mappings for newly supported Indian regional languages
(TRANSLATIONS as any)['ml'] = TRANSLATIONS['ta'];
(TRANSLATIONS as any)['pa'] = TRANSLATIONS['hi'];
(TRANSLATIONS as any)['or'] = TRANSLATIONS['bn'];
(TRANSLATIONS as any)['as'] = TRANSLATIONS['bn'];
(TRANSLATIONS as any)['ur'] = TRANSLATIONS['hi'];
(TRANSLATIONS as any)['ar'] = TRANSLATIONS['en'];

