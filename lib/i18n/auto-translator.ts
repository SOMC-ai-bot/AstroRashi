import { LanguageCode } from '@/types';
import { UI_TRANSLATIONS, registerTranslationDictionary } from './translations-registry';
import { EXTENDED_DESCRIPTIONS } from './dom-translator';

// Comprehensive dictionary for all remaining website sections, cards, and UI components
export const AUTO_TRANSLATE_DICTIONARY: Record<string, Partial<Record<LanguageCode, string>>> = {
  // Common UI Controls & Actions
  'Search...': {
    hi: 'खोजें...',
    bn: 'অনুসন্ধান করুন...',
    ta: 'தேடுக...',
    te: 'వెతకండి...',
    mr: 'शोधा...',
    gu: 'શોધો...',
    kn: 'ಹುಡುಕಿ...',
    ml: 'തിരയുക...',
    pa: 'ਖੋਜੋ...',
    or: 'ଖୋଜନ୍ତୁ...',
    as: 'সন্ধান কৰক...',
    ur: 'تلاش کریں...',
    ar: 'بحث...',
    hinglish: 'Search karein...',
  },
  'Search tools, charts, articles, remedies...': {
    hi: 'टूल्स, कुण्डली, लेख व उपाय खोजें...',
    bn: 'টুলস, কোষ্ঠী, প্রবন্ধ ও প্রতিকার অনুসন্ধান করুন...',
    ta: 'கருவிகள், ஜாதகம், கட்டுரைகள், பரிகாரங்களை தேடுக...',
    te: 'టూల్స్, కుండలి, వ్యాసాలు, నివారణలను వెతకండి...',
    mr: 'टूल्स, कुंडली, लेख आणि उपाय शोधा...',
    gu: 'ટૂલ્સ, કુંડળી, લેખો અને ઉપાયો શોધો...',
    kn: 'ಉಪಕರಣಗಳು, ಕುಂಡಲಿ, ಲೇಖನಗಳು ಮತ್ತು ಪರಿಹಾರಗಳನ್ನು ಹುಡುಕಿ...',
    ml: 'ടൂളുകൾ, ജാതകം, ലേഖനങ്ങൾ, പരിഹാരങ്ങൾ തിരയുക...',
    pa: 'ਟੂਲਜ਼, ਕੁੰਡਲੀ, ਲੇਖ ਅਤੇ ਉਪਾਅ ਖੋਜੋ...',
    or: 'ଉପକରଣ, କୁଣ୍ଡଳୀ, ଲେଖା ଏବଂ ପ୍ରତିକାର ଖୋଜନ୍ତୁ...',
    as: 'সঁজুলি, কুণ্ডলী, প্ৰবন্ধ আৰু প্ৰতিকাৰ সন্ধান কৰক...',
    ur: 'ٹولز، زائچہ، مضامین اور علاج تلاش کریں...',
    ar: 'ابحث عن الأدوات، الخرائط، المقالات، والعلاجات...',
    hinglish: 'Tools, charts, articles aur remedies search karein...',
  },
  'Ask AI Astrologer anything...': {
    hi: 'एआई ज्योतिषी से कुछ भी पूछें...',
    bn: 'এআই জ্যোতিষীকে যেকোনো প্রশ্ন করুন...',
    ta: 'AI ஜோதிடரிடம் எதுவும் கேளுங்கள்...',
    te: 'AI జ్యోతిష్కుడిని ఏదైనా అడగండి...',
    mr: 'एआय ज्योतिषाला काहीही विचारा...',
    gu: 'AI જ્યોતિષીને કંઈપણ પૂછો...',
    kn: 'AI ಜ್ಯೋತಿಷಿಯನ್ನು ಏನಾದರೂ ಕೇಳಿ...',
    ml: 'AI ജ്യോതിഷിയോട് എന്തും ചോദിക്കാം...',
    pa: 'ਏਆਈ ਜੋਤਸ਼ੀ ਨੂੰ ਕੁਝ ਵੀ ਪੁੱਛੋ...',
    or: 'ଏଆଇ ଜ୍ୟୋତିଷୀଙ୍କୁ ଯାହା ଇଚ୍ଛା ପଚାରନ୍ତୁ...',
    as: 'এআই জ্যোতিষীক যিকোনো কথা সোধক...',
    ur: 'اے آئی منجم سے کچھ بھی پوچھیں...',
    ar: 'اسأل الذكاء الاصطناعي الفلكي عن أي شيء...',
    hinglish: 'AI Astrologer se kuch bhi poochhein...',
  },
  'Ask Question': {
    hi: 'प्रश्न पूछें',
    bn: 'প্রশ্ন জিজ্ঞাসা করুন',
    ta: 'கேள்வி கேளுங்கள்',
    te: 'ప్రశ్న అడగండి',
    mr: 'प्रश्न विचारा',
    gu: 'પ્રશ્ન પૂછો',
    kn: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
    ml: 'ചോദ്യം ചോദിക്കുക',
    pa: 'ਸਵਾਲ ਪੁੱਛੋ',
    or: 'ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ',
    as: 'প্ৰশ্ন সোধক',
    ur: 'سوال پوچھیں',
    ar: 'اطرح سؤالاً',
    hinglish: 'Sawal Poochhein',
  },
  'Download': {
    hi: 'डाउनलोड करें',
    bn: 'ডাউনলোড করুন',
    ta: 'பதிவிறக்குக',
    te: 'డౌన్‌లోడ్ చేయండి',
    mr: 'डाउनलोड करा',
    gu: 'ડાઉનલોડ કરો',
    kn: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    ml: 'ഡൗൺലോഡ് ചെയ്യുക',
    pa: 'ਡਾਊਨਲੋਡ ਕਰੋ',
    or: 'ଡାଉନଲୋଡ କରନ୍ତୁ',
    as: 'ডাউনলোড কৰক',
    ur: 'ڈاؤن لوڈ کریں',
    ar: 'تحميل',
    hinglish: 'Download Karein',
  },
  'Print Report': {
    hi: 'रिपोर्ट प्रिंट करें',
    bn: 'রিপোর্ট প্রিন্ট করুন',
    ta: 'அறிக்கையை அச்சிடுக',
    te: 'నివేదికను ప్రింట్ చేయండి',
    mr: 'अहवाल मुद्रित करा',
    gu: 'રિપોર્ટ પ્રિન્ટ કરો',
    kn: 'ವರದಿ ಮುದ್ರಿಸಿ',
    ml: 'റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക',
    pa: 'ਰਿਪੋਰਟ ਪ੍ਰਿੰਟ ਕਰੋ',
    or: 'ରିପୋର୍ଟ ପ୍ରିଣ୍ଟ କରନ୍ତୁ',
    as: 'প্ৰতিবেদন প্ৰিণ্ট কৰক',
    ur: 'رپورٹ پرنٹ کریں',
    ar: 'طباعة التقرير',
    hinglish: 'Report Print Karein',
  },
  'Share': {
    hi: 'शेयर करें',
    bn: 'শেয়ার করুন',
    ta: 'பகிர்க',
    te: 'షేర్ చేయండి',
    mr: 'शेअर करा',
    gu: 'શેર કરો',
    kn: 'ಹಂಚಿಕೊಳ್ಳಿ',
    ml: 'പങ്കിടുക',
    pa: 'ਸਾਂਝਾ ਕਰੋ',
    or: 'ସେୟାର କରନ୍ତୁ',
    as: 'শ্বেয়াৰ কৰক',
    ur: 'شیئر کریں',
    ar: 'مشاركة',
    hinglish: 'Share Karein',
  },
  'Back': {
    hi: 'वापस जाएं',
    bn: 'ফিরে যান',
    ta: 'பின்னே செல்க',
    te: 'వెనక్కి వెళ్ళండి',
    mr: 'मागे जा',
    gu: 'પાછા જાઓ',
    kn: 'ಹಿಂದಕ್ಕೆ',
    ml: 'തിരികെ പോവുക',
    pa: 'ਵਾਪਸ ਜਾਓ',
    or: 'ପଛକୁ ଯାଆନ୍ତୁ',
    as: 'উভতি যাওক',
    ur: 'واپس',
    ar: 'رجوع',
    hinglish: 'Wapas Jayein',
  },
  'Close': {
    hi: 'बंद करें',
    bn: 'বন্ধ করুন',
    ta: 'மூடுக',
    te: 'మూసివేయండి',
    mr: 'बंद करा',
    gu: 'બંધ કરો',
    kn: 'ಮುಚ್ಚಿ',
    ml: 'അടയ്ക്കുക',
    pa: 'ਬੰਦ ਕਰੋ',
    or: 'ବନ୍ଦ କରନ୍ତୁ',
    as: 'বন্ধ কৰক',
    ur: 'بند کریں',
    ar: 'إغلاق',
    hinglish: 'Band Karein',
  },

  // Discover & Hero Screen
  'Cosmic Intelligence & Self-Discovery': {
    hi: 'ब्रह्मांडीय प्रज्ञा एवं आत्म-बोध',
    bn: 'মহাজাগতিক জ্ঞান ও আত্ম-আবিষ্কার',
    ta: 'பிரபஞ்ச நுண்ணறிவு மற்றும் சுய விழிப்புணர்வு',
    te: 'విశ్వ జ్ఞానం మరియు స్వీయ అన్వేషణ',
    mr: 'ब्रह्मांडीय बुद्धिमत्ता आणि आत्म-शोध',
    gu: 'બ્રહ્માંડીય જ્ઞાન અને આત્મ-ખોજ',
    kn: 'ಬ್ರಹ್ಮಾಂಡದ ಜ್ಞಾನ ಮತ್ತು ಆತ್ಮಾವಲೋಕನ',
    ml: 'പ്രപഞ്ച ജ്ഞാനവും ആത്മീയ തിരിച്ചറിവും',
    pa: 'ਬ੍ਰਹਿਮੰਡੀ ਗਿਆਨ ਅਤੇ ਆਤਮ-ਖੋਜ',
    or: 'ବ୍ରହ୍ମାଣ୍ଡୀୟ ଜ୍ଞାନ ଏବଂ ଆତ୍ମ-ସନ୍ଧାନ',
    as: 'মহাজাগতিক জ্ঞান আৰু আত্ম-আৱিষ্কাৰ',
    ur: 'کائناتی ذہانت اور خود شناسی',
    ar: 'الذكاء الكوني واكتشاف الذات',
    hinglish: 'Cosmic Intelligence & Self-Discovery',
  },
  'Vedic Wisdom & Astrological Readings': {
    hi: 'वैदिक ज्ञान एवं शास्त्रीय ज्योतिषीय फलादेश',
    bn: 'বৈদিক প্রজ্ঞা ও জ্যোতিষ পূর্বাভাস',
    ta: 'வேத ஞானம் மற்றும் ஜோதிட பலன்கள்',
    te: 'వేద జ్ఞానం మరియు జ్యోతిష ఫలితాలు',
    mr: 'वैदिक ज्ञान आणि ज्योतिषीय मार्गदर्शन',
    gu: 'વૈદિક જ્ઞાન અને જ્યોતિષીય માર્ગદર્શન',
    kn: 'ವೈದಿಕ ಜ್ಞಾನ ಮತ್ತು ಜ್ಯೋತಿಷ್ಯ ಭವಿಷ್ಯ',
    ml: 'വൈദിക ജ്ഞാനവും ജ്യോതിഷ പ്രവചനങ്ങളും',
    pa: 'ਵੈਦਿਕ ਗਿਆਨ ਅਤੇ ਜੋਤਿਸ਼ ਭਵਿੱਖਬਾਣੀ',
    or: 'ବୈଦିକ ଜ୍ଞାନ ଏବଂ ଜ୍ୟୋତିଷ ଫଳାଫଳ',
    as: 'বৈদিক জ্ঞান আৰু জ্যোতিষী গণনা',
    ur: 'ویدک حکمت اور نجومی پیش گوئیاں',
    ar: 'الحكمة الفيدية والقراءات الفلكية',
    hinglish: 'Vedic Wisdom & Astrological Readings',
  },
  'Welcome To': {
    hi: 'स्वागत है',
    bn: 'স্বাগতম',
    ta: 'வரவேற்கிறோம்',
    te: 'స్వాగతం',
    mr: 'स्वागत आहे',
    gu: 'સ્વાગત છે',
    kn: 'ಸ್ವಾಗತ',
    ml: 'സ്വാഗതം',
    pa: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    or: 'ସ୍ୱାଗତ',
    as: 'স্বাগতম',
    ur: 'خوش آمدید',
    ar: 'مرحباً بكم في',
    hinglish: 'Swagat Hai',
  },

  // Birth Chart Screen Terms
  'Chart Style:': {
    hi: 'कुण्डली शैली:',
    bn: 'কোষ্ঠী শৈলী:',
    ta: 'ஜாதக முறை:',
    te: 'కుండలి శైలి:',
    mr: 'कुंडली पद्धत:',
    gu: 'કુંડળી શૈલી:',
    kn: 'ಕುಂಡಲಿ ಶೈಲಿ:',
    ml: 'ജാതക ശൈലി:',
    pa: 'ਕੁੰਡਲੀ ਸ਼ੈਲੀ:',
    or: 'କୁଣ୍ଡଳୀ ଶୈଳୀ:',
    as: 'কুণ্ডলী শৈলী:',
    ur: 'زائچہ کی ساخت:',
    ar: 'نمط المخطط:',
    hinglish: 'Chart Style:',
  },
  'North Indian': {
    hi: 'उत्तर भारतीय',
    bn: 'উত্তর ভারতীয়',
    ta: 'வட இந்திய',
    te: 'ఉత్తర భారత',
    mr: 'उत्तर भारतीय',
    gu: 'ઉત્તર ભારતીય',
    kn: 'ಉತ್ತರ ಭಾರತ ಶೈಲಿ',
    ml: 'വടക്കേ ഇന്ത്യൻ',
    pa: 'ਉੱਤਰ ਭਾਰਤੀ',
    or: 'ଉତ୍ତର ଭାରତୀୟ',
    as: 'উত্তৰ ভাৰতীয়',
    ur: 'شمالی ہندوستانی',
    ar: 'شمال الهند',
    hinglish: 'North Indian',
  },
  'South Indian': {
    hi: 'दक्षिण भारतीय',
    bn: 'দক্ষিণ ভারতীয়',
    ta: 'தென் இந்திய',
    te: 'దక్షిణ భారత',
    mr: 'दक्षिण भारतीय',
    gu: 'દક્ષિણ ભારતીય',
    kn: 'ದಕ್ಷಿಣ ಭಾರತ ಶೈಲಿ',
    ml: 'തെക്കേ ഇന്ത്യൻ',
    pa: 'ਦੱਖਣ ਭਾਰਤੀ',
    or: 'ଦକ୍ଷିଣ ଭାରତୀୟ',
    as: 'দক্ষিণ ভাৰতীয়',
    ur: 'جنوبی ہندوستانی',
    ar: 'جنوب الهند',
    hinglish: 'South Indian',
  },
  'Western Wheel': {
    hi: 'पाश्चात्य चक्र (Western)',
    bn: 'পশ্চিমা চক্র',
    ta: 'மேற்கத்திய சக்கரம்',
    te: 'పాశ్చాత్య చక్రం',
    mr: 'पाश्चात्त्य चक्र',
    gu: 'વેસ્ટર્ન વ્હીલ',
    kn: 'ಪಾಶ್ಚಾತ್ಯ ಚಕ್ರ',
    ml: 'പാശ്ചാത്യ ചക്രം',
    pa: 'ਪੱਛਮੀ ਚੱਕਰ',
    or: 'ପାଶ୍ଚାତ୍ୟ ଚକ୍ର',
    as: 'পাশ্চাত্য চক্ৰ',
    ur: 'مغربی پہیہ',
    ar: 'العجلة الغربية',
    hinglish: 'Western Wheel',
  },
  'Lagna (D1)': {
    hi: 'लग्न कुण्डली (डी-1)',
    bn: 'লগ্ন কুণ্ডলী (ডি-১)',
    ta: 'லக்னம் (D1)',
    te: 'లగ్నం (D1)',
    mr: 'लग्न कुंडली (डी-1)',
    gu: 'લગ્ન કુંડળી (D1)',
    kn: 'ಲಗ್ನ (D1)',
    ml: 'ലഗ്നം (D1)',
    pa: 'ਲਗਨ (D1)',
    or: 'ଲଗ୍ନ (D1)',
    as: 'লগ্ন (D1)',
    ur: 'طالع (D1)',
    ar: 'الطالع (D1)',
    hinglish: 'Lagna (D1)',
  },
  'Navamsha (D9)': {
    hi: 'नवांश कुण्डली (डी-9)',
    bn: 'নবাংশ কুণ্ডলী (ডি-৯)',
    ta: 'நவாம்சம் (D9)',
    te: 'నవాంశ (D9)',
    mr: 'नवांश कुंडली (डी-9)',
    gu: 'નવાંશ કુંડળી (D9)',
    kn: 'ನವಾಂಶ (D9)',
    ml: 'നവാംശം (D9)',
    pa: 'ਨਵਾਂਸ਼ (D9)',
    or: 'ନବାଂଶ (D9)',
    as: 'নৱাংশ (D9)',
    ur: 'نواںشا (D9)',
    ar: 'نافامشا (D9)',
    hinglish: 'Navamsha (D9)',
  },
  'Chandra (Moon)': {
    hi: 'चन्द्र कुण्डली',
    bn: 'চন্দ্র কুণ্ডলী',
    ta: 'சந்திர குண்டலி',
    te: 'చంద్ర కుండలి',
    mr: 'चंद्र कुंडली',
    gu: 'ચંદ્ર કુંડળી',
    kn: 'ಚಂದ್ರ ಕುಂಡಲಿ',
    ml: 'ചന്ദ്ര കുണ്ഡലി',
    pa: 'ਚੰਦਰ ਕੁੰਡਲੀ',
    or: 'ଚନ୍ଦ୍ର କୁଣ୍ଡଳୀ',
    as: 'চন্দ্ৰ কুণ্ডলী',
    ur: 'قمری زائچہ',
    ar: 'مخطط القمر',
    hinglish: 'Chandra Kundli',
  },
  'Surya (Sun)': {
    hi: 'सूर्य कुण्डली',
    bn: 'সূর্য কুণ্ডলী',
    ta: 'சூரிய குண்டலி',
    te: 'సూర్య కుండలి',
    mr: 'सूर्य कुंडली',
    gu: 'સૂર્ય કુંડળી',
    kn: 'ಸೂರ್ಯ ಕುಂಡಲಿ',
    ml: 'സൂര്യ കുണ്ഡലി',
    pa: 'ਸੂਰਜ ਕੁੰਡਲੀ',
    or: 'ସୂର୍ଯ୍ୟ କୁଣ୍ଡଳୀ',
    as: 'সূৰ্য্য কুণ্ডলী',
    ur: 'شمسی زائچہ',
    ar: 'مخطط الشمس',
    hinglish: 'Surya Kundli',
  },

  // Tools Hub Categories & Sections
  '33+ Precision Vedic Astrology Tools': {
    hi: '33+ प्रामाणिक वैदिक ज्योतिष टूल्स',
    bn: '৩৩+ নির্ভুল বৈদিক জ্যোতিষ সরঞ্জাম',
    ta: '33+ துல்லியமான வேத ஜோதிட கருவிகள்',
    te: '33+ ఖచ్చితమైన వేద జ్యోతిష టూల్స్',
    mr: '33+ अचूक वैदिक ज्योतिष टूल्स',
    gu: '33+ સચોટ વૈદિક જ્યોતિષ ટૂલ્સ',
    kn: '33+ ನಿಖರ ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ಉಪಕರಣಗಳು',
    ml: '33+ കൃത്യതയുള്ള വൈദിക ജ്യോതിഷ ടൂളുകൾ',
    pa: '33+ ਸਟੀਕ ਵੈਦਿਕ ਜੋਤਿਸ਼ ਟੂਲਜ਼',
    or: '୩୩+ ସଠିକ୍ ବୈଦିକ ଜ୍ୟୋତିଷ ଉପକରଣ',
    as: '৩৩+ নিখুঁত বৈদিক জ্যোতিষ সঁজুলি',
    ur: '33+ مستند ویدک فلکیاتی ٹولز',
    ar: 'أكثر من 33 أداة فلكية فيدية فائقة الدقة',
    hinglish: '33+ Precision Vedic Astrology Tools',
  },
  'Explore comprehensive calculators, muhurat finders, compatibility testers, and dasha timelines.': {
    hi: 'सटीक कैलकुलेटर, शुभ मुहूर्त शोधक, कुंडली मिलान और महादशा समयरेखा का लाभ उठाएं।',
    bn: 'নির্ভুল ক্যালকুলেটর, শুভ মুহূর্ত, রাজযোটক ও দশা সময়রেখা ব্যবহার করুন।',
    ta: 'துல்லியமான கணிப்பான்கள், சுப முகூர்த்தம், பொருத்தங்கள் மற்றும் தசா காலங்களை ஆராயுங்கள்.',
    te: 'ఖచ్చితమైన కాలిక్యులేటర్లు, ముహూర్తాలు, కుండలి సరిపోలికలు మరియు దశల విశ్లేషణను పొందండి.',
    mr: 'अचूक कॅल्क्युलेटर, शुभ मुहूर्त, पत्रिका जुळवणी आणि महादशा कालरेषेचा लाभ घ्या.',
    gu: 'સચોટ કેલ્ક્યુલેટર, શુભ મુહૂર્ત, કુંડળી મિલન અને દશા સમયરેખાનો ઉપયોગ કરો.',
    kn: 'ನಿಖರ ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗಳು, ಶುಭ ಮುಹೂರ್ತಗಳು ಮತ್ತು ಜಾತಕ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    ml: 'കൃത്യമായ കാൽക്കുലേറ്ററുകൾ, മുഹൂർത്തങ്ങൾ, പൊരുത്തങ്ങൾ, ദശാ കാലഘട്ടങ്ങൾ എന്നിവ കണ്ടെത്തുക.',
    pa: 'ਸਟੀਕ ਕੈਲਕੁਲੇਟਰ, ਸ਼ੁਭ ਮੁਹੂਰਤ, ਕੁੰਡਲੀ ਮਿਲਾਣ ਅਤੇ ਮਹਾਦਸ਼ਾ ਸਮਾਂ-ਰੇਖਾ ਦੀ ਵਰਤੋਂ ਕਰੋ।',
    or: 'ସଠିକ୍ କ୍ୟାଲକୁଲେଟର, ଶୁଭ ମୁହୂର୍ତ୍ତ, କୁଣ୍ଡଳୀ ମିଳନ ଏବଂ ମହାଦଶା ସମୟରେଖାର ଲାଭ ନିଅନ୍ତୁ।',
    as: 'নিখুঁত কেলকুলেটৰ, শুভ মুহূৰ্ত, যোটক আৰু দশা সময়ৰেখা ব্যৱহাৰ কৰক।',
    ur: 'مستند کیلکولیٹرز، مبارک ساعتیں، زائچہ کا ملاپ اور ادوار کا تجزیہ کریں۔',
    ar: 'استكشف الحاسبات الفلكية الشاملة، أوقات السعد، توافق الأبراج، ودورات الداشا.',
    hinglish: 'Explore karein calculators, shubh muhurat, kundli matching aur dasha timelines.',
  },

  // Certified Reports Hub
  'Official Certified Vedic Reports': {
    hi: 'आधिकारिक प्रमाणित वैदिक रिपोर्ट्स',
    bn: 'অফিসিয়াল প্রত্যয়িত বৈদিক রিপোর্ট',
    ta: 'அதிகாரப்பூர்வ சான்றளிக்கப்பட்ட வேத அறிக்கைகள்',
    te: 'అధికారిక సర్టిఫైడ్ వేద నివేదికలు',
    mr: 'अधिकृत प्रमाणित वैदिक अहवाल',
    gu: 'સત્તાવાર પ્રમાણિત વૈદિક અહેવાલો',
    kn: 'ಅಧಿಕೃತ ಪ್ರಮಾಣೀಕೃತ ವೈದಿಕ ವರದಿಗಳು',
    ml: 'ഔദ്യോഗിക സർട്ടിഫൈഡ് വൈദിക റിപ്പോർട്ടുകൾ',
    pa: 'ਅਧਿਕਾਰਤ ਪ੍ਰਮਾਣਿਤ ਵੈਦਿਕ ਰਿਪੋਰਟਾਂ',
    or: 'ଅଧିକାରିକ ପ୍ରମାଣିତ ବୈଦିକ ରିପୋର୍ଟ',
    as: 'আনুষ্ঠানিক প্ৰমাণিত বৈদিক প্ৰতিবেদন',
    ur: 'سرکاری طور پر تصدیق شدہ ویدک رپورٹس',
    ar: 'التقارير الفيدية المعتمدة رسمياً',
    hinglish: 'Official Certified Vedic Reports',
  },
  'Download Complete Chart (PDF)': {
    hi: 'पूर्ण कुंडली डाउनलोड करें (PDF)',
    bn: 'সম্পূর্ণ কোষ্ঠী ডাউনলোড করুন (PDF)',
    ta: 'முழு ஜாதகம் பதிவிறக்குக (PDF)',
    te: 'పూర్తి కుండలి డౌన్‌లోడ్ చేయండి (PDF)',
    mr: 'पूर्ण कुंडली डाउनलोड करा (PDF)',
    gu: 'સંપૂર્ણ કુંડળી ડાઉનલોડ કરો (PDF)',
    kn: 'ಸಂಪೂರ್ಣ ಕುಂಡಲಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PDF)',
    ml: 'പൂർണ്ണ ജാതകം ഡൗൺലോഡ് ചെയ്യുക (PDF)',
    pa: 'ਪੂਰੀ ਕੁੰਡਲੀ ਡਾਊਨਲੋਡ ਕਰੋ (PDF)',
    or: 'ସମ୍ପୂର୍ଣ୍ଣ କୁଣ୍ଡଳୀ ଡାଉନଲୋଡ କରନ୍ତୁ (PDF)',
    as: 'সম্পূৰ্ণ কুণ্ডলী ডাউনলোড কৰক (PDF)',
    ur: 'مکمل زائچہ ڈاؤن لوڈ کریں (PDF)',
    ar: 'تحميل المخطط الكامل (PDF)',
    hinglish: 'Complete Chart Download Karein (PDF)',
  },
  'Unlock for ₹80 & Download PDF': {
    hi: '₹80 में अनलॉक करें एवं PDF डाउनलोड करें',
    bn: '₹৮০ দিয়ে আনলক করুন এবং PDF ডাউনলোড করুন',
    ta: '₹80 செலுத்தி அன்லாக் செய்து PDF பதிவிறக்குக',
    te: '₹80 చెల్లించి అన్‌లాక్ చేసి PDF డౌన్‌లోడ్ చేసుకోండి',
    mr: '₹80 मध्ये अनलॉक करा आणि PDF डाउनलोड करा',
    gu: '₹80 માં અનલૉક કરો અને PDF ડાઉનલોડ કરો',
    kn: '₹80 ಪಾವತಿಸಿ ಅನ್‌ಲಾಕ್ ಮಾಡಿ ಮತ್ತು PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    ml: '₹80 നൽകി അൺലോക്ക് ചെയ്ത് PDF ഡൗൺലോഡ് ചെയ്യുക',
    pa: '₹80 ਵਿੱਚ ਅਨਲਾਕ ਕਰੋ ਅਤੇ PDF ਡਾਊਨਲੋਡ ਕਰੋ',
    or: '₹୮୦ ରେ ଅନଲକ୍ କରନ୍ତୁ ଏବଂ PDF ଡାଉନଲୋଡ କରନ୍ତୁ',
    as: '₹৮০ ত আনলক কৰক আৰু PDF ডাউনলোড কৰক',
    ur: '₹80 میں انلاک کریں اور PDF ڈاؤن لوڈ کریں',
    ar: 'فتح مقابل 80 روبية وتحميل PDF',
    hinglish: '₹80 me Unlock karein aur PDF Download karein',
  },
  'Included with Basic & Premium': {
    hi: 'बेसिक एवं प्रीमियम सदस्यों हेतु निःशुल्क',
    bn: 'বেসিক এবং প্রিমিয়াম সদস্যদের জন্য বিনামূল্যে',
    ta: 'பேசிக் மற்றும் பிரீமியம் சந்தாதாரர்களுக்கு இலவசம்',
    te: 'బేసిక్ & ప్రీమియం సభ్యులకు ఉచితంగా లభించును',
    mr: 'बेसिक आणि प्रीमियम सदस्यांसाठी विनामूल्य',
    gu: 'બેઝિક અને પ્રીમિયમ સભ્યો માટે મફત',
    kn: 'ಬೇಸಿಕ್ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಸದಸ್ಯರಿಗೆ ಉಚಿತ',
    ml: 'ബേസിക് & പ്രീമിയം അംഗങ്ങൾക്ക് സൗജന്യം',
    pa: 'ਬੇਸਿਕ ਅਤੇ ਪ੍ਰੀਮੀਅਮ ਮੈਂਬਰਾਂ ਲਈ ਮੁਫ਼ਤ',
    or: 'ବେସିକ ଏବଂ ପ୍ରିମିୟମ ସଦସ୍ୟଙ୍କ ପାଇଁ ମାଗଣା',
    as: 'বেচিক আৰু প্ৰিমিয়াম সদস্যসকলৰ বাবে বিনামূলীয়া',
    ur: 'بیسک اور پریمیم ممبران کے لیے مفت',
    ar: 'مشمول مجاناً لمشتركي الباقة الأساسية والمميزة',
    hinglish: 'Basic & Premium members ke liye Included',
  },
  '₹80 for Free Users': {
    hi: 'निःशुल्क उपयोगकर्ताओं हेतु ₹80',
    bn: 'ফ্রি ব্যবহারকারীদের জন্য ₹৮০',
    ta: 'இலவச பயனர்களுக்கு ₹80',
    te: 'ఉచిత వినియోగదారులకు ₹80',
    mr: 'मोफत वापरकर्त्यांसाठी ₹80',
    gu: 'મફત વપરાશકર્તાઓ માટે ₹80',
    kn: 'ಉಚಿತ ಬಳಕೆದಾರರಿಗೆ ₹80',
    ml: 'സൗജന്യ ഉപയോക്താക്കൾക്ക് ₹80',
    pa: 'ਮੁਫ਼ਤ ਵਰਤੋਂਕਾਰਾਂ ਲਈ ₹80',
    or: 'ମାଗଣା ୟୁଜର୍ସଙ୍କ ପାଇଁ ₹୮୦',
    as: 'বিনামূলীয়া ব্যৱহাৰকাৰীৰ বাবে ₹৮০',
    ur: 'مفت صارفین کے لیے ₹80',
    ar: '80 روبية للمستخدمين العاديين',
    hinglish: 'Free users ke liye ₹80',
  },

  // Astrologers & Consultations
  'Verified Vedic Specialists': {
    hi: 'प्रमाणित वैदिक ज्योतिषाचार्य',
    bn: 'যাচাইকৃত বৈদিক বিশেষজ্ঞগণ',
    ta: 'சான்றளிக்கப்பட்ட வேத ஜோதிட நிபுணர்கள்',
    te: 'ధృవీకరించబడిన వేద పండితులు',
    mr: 'प्रमाणित वैदिक ज्योतिषी',
    gu: 'પ્રમાણિત વૈદિક જ્યોતિષીઓ',
    kn: 'ಪ್ರಾಮಾಣಿಕ ವೈದಿಕ ತಜ್ಞರು',
    ml: 'പരിശോധിച്ചുറപ്പിച്ച വൈദിക ജ്യോതിഷികൾ',
    pa: 'ਪ੍ਰਮਾਣਿਤ ਵੈਦਿਕ ਜੋਤਸ਼ੀ',
    or: 'ପ୍ରମାଣିତ ବୈଦିକ ଜ୍ୟୋତିଷୀ',
    as: 'প্ৰমাণিত বৈদিক জ্যোতিষীসকল',
    ur: 'تصدیق شدہ ویدک ماہرین',
    ar: 'خبراء فلك فيديون معتمدون',
    hinglish: 'Verified Vedic Specialists',
  },
  'Consult live with certified astrologers or chat with high-reasoning AI specialists.': {
    hi: 'अनुभवी आचार्यों से सीधे परामर्श लें अथवा उच्च-तर्क वैदिक एआई से संवाद करें।',
    bn: 'অভিজ্ঞ জ্যোতিষীদের সাথে সরাসরি কথা বলুন বা উন্নত এআই বিশেষজ্ঞের সাথে চ্যাট করুন।',
    ta: 'சான்றளிக்கப்பட்ட ஜோதிடர்களுடன் நேரடி ஆலோசனை அல்லது அறிவார்ந்த AI உடன் உரையாடுங்கள்.',
    te: 'సర్టిఫైడ్ జ్యోతిష్కులతో నేరుగా మాట్లాడండి లేదా వేద AI తో సంప్రదించండి.',
    mr: 'अनुभवी ज्योतिषांशी थेट संपर्क साधा किंवा प्रगत एआय ज्योतिषाचा सल्ला घ्या.',
    gu: 'અનુભવી જ્યોતિષીઓ સાથે સીધી વાતચીત કરો અથવા અદ્યતન AI સાથે પરામર્શ કરો.',
    kn: 'ಅನುಭವಿ ಜ್ಯೋತಿಷಿಗಳೊಂದಿಗೆ ನೇರ ಸಮಾಲೋಚನೆ ನಡೆಸಿ ಅಥವಾ AI ತಜ್ಞರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.',
    ml: 'വിദഗ്ദ്ധ ജ്യോതിഷികളുമായി നേരിട്ട് സംസാരിക്കുക അല്ലെങ്കിൽ AI യോട് സംവദിക്കുക.',
    pa: 'ਤਜਰਬੇਕਾਰ ਜੋਤਸ਼ੀਆਂ ਨਾਲ ਸਿੱਧੀ ਗੱਲ ਕਰੋ ਜਾਂ ਐਡਵਾਂਸਡ ਏਆਈ ਨਾਲ ਚਰਚਾ ਕਰੋ।',
    or: 'ଅଭିଜ୍ଞ ଜ୍ୟୋତିଷୀଙ୍କ ସହ ସିଧାସଳଖ ପରାମର୍ଶ କରନ୍ତୁ କିମ୍ବା AI ସହ ଚାଟ କରନ୍ତୁ।',
    as: 'অভিজ্ঞ জ্যোতিষীসকলৰ সৈতে পোনপটীয়া আলোচনা কৰক বা AI ৰ সৈতে কথা পাতক।',
    ur: 'مستند ماہرین سے براہ راست مشورہ لیں یا جدید اے آئی سے گفتگو کریں۔',
    ar: 'استشر كبار المنجمين المعتمدين مباشرة أو تحدث مع خبراء الذكاء الاصطناعي الفلكي.',
    hinglish: 'Certified astrologers se live consult karein ya high-reasoning AI se baat karein.',
  },

  // Learn Astrology & Knowledge
  'Vedic Astrology Masterclasses': {
    hi: 'वैदिक ज्योतिष विद्या एवं पाठ्यक्रम',
    bn: 'বৈদিক জ্যোতিষ পাঠশালা',
    ta: 'வேத ஜோதிட பாடங்கள்',
    te: 'వేద జ్యోతిష పాఠాలు',
    mr: 'वैदिक ज्योतिष अभ्यासक्रम',
    gu: 'વૈદિક જ્યોતિષ પાઠશાળા',
    kn: 'ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ತರಗತಿಗಳು',
    ml: 'വൈദിക ജ്യോതിഷ പാഠങ്ങൾ',
    pa: 'ਵੈਦਿਕ ਜੋਤਿਸ਼ ਕਲਾਸਾਂ',
    or: 'ବୈଦିକ ଜ୍ୟୋତିଷ ଶିକ୍ଷା',
    as: 'বৈদিক জ্যোতিষ পাঠ্যক্ৰম',
    ur: 'ویدک نجوم کے اسباق',
    ar: 'دروس تعليم الفلك الفيدي المتقدم',
    hinglish: 'Vedic Astrology Masterclasses',
  },

  // Subscription Plans
  'Choose Your Cosmic Journey': {
    hi: 'अपनी ब्रह्मांडीय योजना चुनें',
    bn: 'আপনার মহাজাগতিক পরিকল্পনা বেছে নিন',
    ta: 'உங்கள் பிரபஞ்ச திட்டத்தைத் தேர்ந்தெடுக்கவும்',
    te: 'మీ జ్యోతిష ప్రణాళికను ఎంచుకోండి',
    mr: 'तुमची योग्य योजना निवडा',
    gu: 'તમારી યોજના પસંદ કરો',
    kn: 'ನಿಮ್ಮ ಜ್ಯೋತಿಷ್ಯ ಯೋಜನೆಯನ್ನು ಆರಿಸಿ',
    ml: 'നിങ്ങളുടെ പ്ലാൻ തിരഞ്ഞെടുക്കുക',
    pa: 'ਆਪਣਾ ਪਲਾਨ ਚੁਣੋ',
    or: 'ଆପଣଙ୍କ ପ୍ଲାନ ଚୟନ କରନ୍ତୁ',
    as: 'আপোনাৰ পৰিকল্পনা বাছক',
    ur: 'اپنا مناسب پلان منتخب کریں',
    ar: 'اختر خطتك الكونية المناسبة',
    hinglish: 'Apna Cosmic Plan Chunein',
  },
  'Free Explorer': {
    hi: 'निःशुल्क अन्वेषक',
    bn: 'ফ্রি এক্সপ্লোরার',
    ta: 'இலவச எக்ஸ்ப್ளோரர்',
    te: 'ఉచిత అన్వేషకుడు',
    mr: 'मोफत एक्सप्लोरर',
    gu: 'મફત એક્સપ્લોરર',
    kn: 'ಉಚಿತ ಅನ್ವೇಷಕ',
    ml: 'സൗಜന്യ എക്സ്പ്ലോറർ',
    pa: 'ਮੁਫ਼ਤ ਐਕਸਪਲੋਰਰ',
    or: 'ମାଗଣା ଏକ୍ସପ୍ଲୋରର',
    as: 'বিনামূলীয়া অন্বেষক',
    ur: 'مفت صارف',
    ar: 'المستكشف المجاني',
    hinglish: 'Free Explorer',
  },
  'Basic Cosmic Pass': {
    hi: 'बेसिक कॉस्मिक पास',
    bn: 'বেসিক কসমিক পাস',
    ta: 'பேசிக் காஸ்மிக் பாஸ்',
    te: 'బేసిక్ కాస్మిక్ పాస్',
    mr: 'बेसिक कॉस्मिक पास',
    gu: 'બેઝિક કોસ્મિક પાસ',
    kn: 'ಬೇಸಿಕ್ ಕಾಸ್ಮಿಕ್ ಪಾಸ್',
    ml: 'ബേസിക് കോസ്മിക് പാസ്',
    pa: 'ਬੇਸਿਕ ਕੌਸਮਿਕ ਪਾਸ',
    or: 'ବେସିକ କସମିକ ପାସ',
    as: 'বেচিক কচমিক পাছ',
    ur: 'بیسک کائناتی پاس',
    ar: 'الباقة الكونية الأساسية',
    hinglish: 'Basic Cosmic Pass',
  },
  'Premium Infinite Pass': {
    hi: 'प्रीमियम इनफिनिट पास',
    bn: 'প্রিমিয়াম ইনফিনিট পাস',
    ta: 'பிரீமியம் இன்பினைட் பாஸ்',
    te: 'ప్రీమియం ఇన్‌ఫినిట్ పాస్',
    mr: 'प्रीमियम इन्फिनाइट पास',
    gu: 'પ્રીમિયમ ઇનફિનાઇટ પાસ',
    kn: 'ಪ್ರೀಮಿಯಂ ಇನ್ಫೈನೈಟ್ ಪಾಸ್',
    ml: 'പ്രീമിയം ഇൻഫിനിറ്റ് പാസ്',
    pa: 'ਪ੍ਰੀਮੀਅਮ ਇਨਫਿਨਾਈਟ ਪਾਸ',
    or: 'ପ୍ରିମିୟମ ଇନଫିନାଇଟ ପାସ',
    as: 'প্ৰিমিয়াম ইনফিনাইট পাছ',
    ur: 'پریمیم لا محدود پاس',
    ar: 'الباقة اللانهائية المميزة',
    hinglish: 'Premium Infinite Pass',
  },
  'Upgrade to Premium': {
    hi: 'प्रीमियम में अपग्रेड करें',
    bn: 'প্রিমিয়ামে আপগ্রেড করুন',
    ta: 'பிரீமியத்திற்கு மேம்படுத்தவும்',
    te: 'ప్రీమియమ్‌కు అప్‌గ్రేడ్ అవ్వండి',
    mr: 'प्रीमियममध्ये अपग्रेड करा',
    gu: 'પ્રીમિયમમાં અપગ્રેડ કરો',
    kn: 'ಪ್ರೀಮಿಯಂಗೆ ನವೀಕರಿಸಿ',
    ml: 'പ്രീമിയത്തിലേക്ക് അಪ್‌ഗ്രേഡ് ചെയ്യുക',
    pa: 'ਪ੍ਰੀਮੀਅਮ ਵਿੱਚ ਅੱਪਗ੍ਰੇਡ ਕਰੋ',
    or: 'ପ୍ରିମିୟମକୁ ଅପଗ୍ରେଡ଼ କରନ୍ତୁ',
    as: 'প্ৰিমিয়ামলৈ উন্নীত কৰক',
    ur: 'پریمیم میں اپ گریڈ کریں',
    ar: 'الترقية إلى الباقة المميزة',
    hinglish: 'Premium me Upgrade karein',
  },
};

// Register in universal registry
registerTranslationDictionary(AUTO_TRANSLATE_DICTIONARY);

/**
 * Universal Native In-App Auto-Translator with Dynamic Fallback.
 * Instant zero-latency dictionary match + background high-fidelity real-time AI translation.
 */
let mutationObserver: MutationObserver | null = null;
let currentLanguage: LanguageCode = 'en';
let isTranslating = false;
let rafId: number | null = null;

// Dynamic In-Memory & LocalStorage Translation Cache
const dynamicTranslations: Record<string, string> = {};
const pendingQueue = new Set<string>();
let batchTimer: any = null;

// Load persisted translations from localStorage
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('astronex_dynamic_translations_v2');
    if (saved) {
      Object.assign(dynamicTranslations, JSON.parse(saved));
    }
  } catch (e) {
    // Ignore storage errors
  }
}

function persistDynamicTranslations() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('astronex_dynamic_translations_v2', JSON.stringify(dynamicTranslations));
  } catch (e) {
    // Ignore quota errors
  }
}

function scheduleBatchFetch(targetLang: LanguageCode) {
  if (batchTimer) clearTimeout(batchTimer);
  batchTimer = setTimeout(async () => {
    if (pendingQueue.size === 0 || targetLang === 'en') return;

    const textsToFetch = Array.from(pendingQueue).slice(0, 40);
    textsToFetch.forEach(t => pendingQueue.delete(t));

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: textsToFetch, targetLang }),
      });

      if (res.ok) {
        const data = await res.json();
        const translations = data.translations || {};
        let updated = false;

        for (const [orig, translated] of Object.entries(translations)) {
          if (translated && typeof translated === 'string') {
            const key = `${targetLang}:${orig.trim()}`;
            dynamicTranslations[key] = translated as string;
            updated = true;
          }
        }

        if (updated) {
          persistDynamicTranslations();
          // Apply translations to DOM nodes
          if (document.body) {
            translateDOMTree(document.body, targetLang);
            translateDOMAttributes(document.body, targetLang);
          }
        }
      }
    } catch (e) {
      console.warn('AutoTranslate batch fetch error:', e);
    }
  }, 100);
}

export function runWebsiteAutoTranslate(targetLang: LanguageCode) {
  if (typeof document === 'undefined') return;
  currentLanguage = targetLang;

  // Set RTL for Urdu and Arabic, LTR for others
  if (targetLang === 'ar' || targetLang === 'ur') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  document.documentElement.lang = targetLang;

  const body = document.body;
  if (!body) return;

  // Disconnect existing observer while running tree pass
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Quick synchronous pass
  isTranslating = true;
  try {
    translateDOMTree(body, targetLang);
    translateDOMAttributes(body, targetLang);
  } finally {
    isTranslating = false;
  }

  // If English, no need for observer
  if (targetLang === 'en') {
    return;
  }

  // Connect lightweight, debounced childList-only MutationObserver
  // NEVER observe characterData to avoid infinite recursive loops
  mutationObserver = new MutationObserver((mutations) => {
    if (isTranslating || currentLanguage === 'en') return;

    let hasNewElements = false;
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length > 0) {
        hasNewElements = true;
        break;
      }
    }

    if (!hasNewElements) return;

    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      if (isTranslating || !document.body) return;
      isTranslating = true;
      try {
        translateDOMTree(document.body, currentLanguage);
        translateDOMAttributes(document.body, currentLanguage);
      } finally {
        isTranslating = false;
      }
    });
  });

  mutationObserver.observe(body, {
    childList: true,
    subtree: true,
  });
}

function translateSingleTextNode(node: Text, lang: LanguageCode) {
  const parent = node.parentElement;
  if (!parent) return;

  const tag = parent.tagName.toLowerCase();
  if (
    tag === 'script' ||
    tag === 'style' ||
    tag === 'code' ||
    tag === 'pre' ||
    tag === 'svg' ||
    tag === 'path' ||
    tag === 'font' ||
    parent.closest('font') ||
    parent.closest('#google_translate_element') ||
    parent.closest('.skiptranslate')
  ) {
    return;
  }

  const currentVal = node.nodeValue || '';
  if (!currentVal.trim()) return;

  // Save original English string in-memory on the DOM node
  if (!(node as any).__origText) {
    (node as any).__origText = currentVal;
  }

  const orig = (node as any).__origText;
  const trimmed = orig.trim();

  if (lang === 'en') {
    if (node.nodeValue !== orig) {
      node.nodeValue = orig;
    }
    return;
  }

  // Helper to look up a string across static dictionaries & dynamic cache
  const getTranslation = (key: string): string | null => {
    // Dynamic real-time cache
    const dynKey = `${lang}:${key}`;
    if (dynamicTranslations[dynKey]) {
      return dynamicTranslations[dynKey];
    }

    if (AUTO_TRANSLATE_DICTIONARY[key] && AUTO_TRANSLATE_DICTIONARY[key][lang]) {
      return AUTO_TRANSLATE_DICTIONARY[key][lang]!;
    }
    if (EXTENDED_DESCRIPTIONS[key] && EXTENDED_DESCRIPTIONS[key][lang]) {
      return EXTENDED_DESCRIPTIONS[key][lang]!;
    }
    if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key][lang]) {
      return UI_TRANSLATIONS[key][lang];
    }
    // Hindi fallback for Hinglish, Punjabi, Urdu, Odia, Assamese if available
    if (
      (lang === 'hinglish' || lang === 'pa' || lang === 'ur' || lang === 'or' || lang === 'as') &&
      UI_TRANSLATIONS[key] &&
      UI_TRANSLATIONS[key]['hi']
    ) {
      return UI_TRANSLATIONS[key]['hi'];
    }
    return null;
  };

  // 1. Direct exact match
  const exact = getTranslation(trimmed);
  if (exact) {
    node.nodeValue = orig.replace(trimmed, exact);
    return;
  }

  // 2. Case-insensitive exact match
  const lowerTrimmed = trimmed.toLowerCase();
  for (const dictKey of Object.keys(UI_TRANSLATIONS)) {
    if (dictKey.toLowerCase() === lowerTrimmed) {
      const match = getTranslation(dictKey);
      if (match) {
        node.nodeValue = orig.replace(trimmed, match);
        return;
      }
    }
  }

  // 3. Substring phrase replacement for compounds (e.g. "Plans (₹199/yr)", "Unlock with Pro", etc.)
  let replaced = orig;
  let hasReplaced = false;

  // Search through UI_TRANSLATIONS keys ordered by length descending
  const sortedKeys = Object.keys(UI_TRANSLATIONS).filter(k => k.length > 3).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (replaced.includes(key)) {
      const translatedWord = getTranslation(key);
      if (translatedWord) {
        replaced = replaced.split(key).join(translatedWord);
        hasReplaced = true;
      }
    }
  }

  if (hasReplaced) {
    node.nodeValue = replaced;
    return;
  }

  // 4. If no translation exists, enqueue phrase for dynamic AI/API translation
  if (
    trimmed.length > 1 &&
    !/^[0-9+•%→←✦\s\.\:\,\(\)\/\-\$₹=><&!]+$/.test(trimmed) &&
    !dynamicTranslations[`${lang}:${trimmed}`] &&
    !pendingQueue.has(trimmed)
  ) {
    pendingQueue.add(trimmed);
    scheduleBatchFetch(lang);
  }
}

function translateDOMTree(root: HTMLElement | Node, lang: LanguageCode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (
        tag === 'script' ||
        tag === 'style' ||
        tag === 'code' ||
        tag === 'pre' ||
        tag === 'svg' ||
        tag === 'path' ||
        tag === 'font' ||
        parent.closest('font') ||
        parent.closest('#google_translate_element') ||
        parent.closest('.skiptranslate')
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  let current: Node | null = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }

  for (const textNode of nodes) {
    translateSingleTextNode(textNode, lang);
  }
}

function translateDOMAttributes(root: HTMLElement, lang: LanguageCode) {
  const elements = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
  elements.forEach((el) => {
    const ph = el.getAttribute('placeholder');
    if (!ph) return;

    if (!(el as any).__origPlaceholder) {
      (el as any).__origPlaceholder = ph;
    }

    const orig = (el as any).__origPlaceholder;
    if (lang === 'en') {
      el.setAttribute('placeholder', orig);
    } else if (dynamicTranslations[`${lang}:${orig}`]) {
      el.setAttribute('placeholder', dynamicTranslations[`${lang}:${orig}`]);
    } else if (AUTO_TRANSLATE_DICTIONARY[orig] && AUTO_TRANSLATE_DICTIONARY[orig][lang]) {
      el.setAttribute('placeholder', AUTO_TRANSLATE_DICTIONARY[orig][lang]!);
    } else if (UI_TRANSLATIONS[orig] && UI_TRANSLATIONS[orig][lang]) {
      el.setAttribute('placeholder', UI_TRANSLATIONS[orig][lang]);
    } else if (!pendingQueue.has(orig)) {
      pendingQueue.add(orig);
      scheduleBatchFetch(lang);
    }
  });
}
