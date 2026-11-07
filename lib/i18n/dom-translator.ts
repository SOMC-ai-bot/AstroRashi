import { LanguageCode } from '@/types';
import { UI_TRANSLATIONS, registerTranslationDictionary } from './translations-registry';

// Extended dictionary of long-form writings, section intros, and descriptions
export const EXTENDED_DESCRIPTIONS: Record<string, Partial<Record<LanguageCode, string>>> = {
  'Unveil your sacred destiny through authentic Vedic ephemeris calculations, 27 Nakshatras, Lahiri Ayanamsa, and timeless planetary alignments.': {
    hi: 'प्रामाणिक वैदिक गणनाओं, 27 नक्षत्रों, लाहिड़ी अयनांश और कालजयी ग्रहीय संरेखण के माध्यम से अपने पवित्र भाग्य को जानें।',
    bn: 'প্রামাণিক বৈদিক গণনা, ২৭টি নক্ষত্র, লাহিড়ী অয়নাংশ এবং গ্রহের অবস্থানের মাধ্যমে আপনার ভাগ্য জানুন।',
    ta: 'உண்மையான வேத கணிப்புகள், 27 நட்சத்திரங்கள், லஹிரி அயனாம்சம் மற்றும் கிரக நிலைகள் மூலம் உங்கள் விதியை அறிந்து கொள்ளுங்கள்.',
    te: 'ప్రామాణిక వేద గణాంకాలు, 27 నక్షత్రాలు, లాహిరి అయనాంశం మరియు గ్రహాల స్థానాల ద్వారా మీ విధిని తెలుసుకోండి.',
    mr: 'अस्सल वैदिक गणिते, 27 नक्षत्रे, लाहिरी अयनांश आणि ग्रह स्थितींद्वारे आपले पवित्र भविष्य जाणून घ्या.',
    gu: 'પ્રમાણિક વૈદિક ગણતરીઓ, 27 નક્ષત્રો, લાહિરી અયનાંશ અને ગ્રહોની સ્થિતિ દ્વારા તમારું ભાગ્ય જાણો.',
    kn: 'ಅಧಿಕೃತ ವೈದಿಕ ಲೆಕ್ಕಾಚಾರಗಳು, 27 ನಕ್ಷತ್ರಗಳು ಮತ್ತು ಗ್ರಹಗಳ ಜೋಡಣೆಯ ಮೂಲಕ ನಿಮ್ಮ ಪವಿತ್ರ ಭವಿಷ್ಯವನ್ನು ತಿಳಿಯಿರಿ.',
    ml: 'ആധികാരിക വൈദിക കണക്കുകൂട്ടലുകൾ, 27 നക്ഷത്രങ്ങൾ, ലാഹിരി അയനാംശം എന്നിവയിലൂടെ നിങ്ങളുടെ ഭാഗ്യം കണ്ടെത്തുക.',
    pa: 'ਪ੍ਰਮਾਣਿਕ ਵੈਦਿਕ ਗਣਨਾਵਾਂ, 27 ਨਕਸ਼ੱਤਰਾਂ ਅਤੇ ਗ੍ਰਹਿ ਸਥਿਤੀਆਂ ਰਾਹੀਂ ਆਪਣੀ ਹੋਣੀ ਨੂੰ ਜਾਣੋ।',
    or: 'ପ୍ରାମାଣିକ ବୈଦିକ ଗଣନା, ୨୭ ନକ୍ଷତ୍ର ଏବଂ ଗ୍ରହ ସ୍ଥିତି ମାଧ୍ୟମରେ ଆପଣଙ୍କ ଭାଗ୍ୟ ଜାଣନ୍ତୁ।',
    as: 'প্ৰামাণিক বৈদিক গণনা, ২৭টা নক্ষত্ৰ আৰু গ্ৰহৰ অৱস্থানৰ জৰিয়তে আপোনাৰ ভাগ্য জানক।',
    ur: 'مستند ویدک حسابات، 27 کواکب اور سیاروی توازن کے ذریعے اپنی تقدیر دریافت کریں۔',
    ar: 'اكتشف مصيرك المقدس من خلال الحسابات الفلكية الفيدية الأصيلة وتوافق الكواكب.',
    hinglish: 'Authentic Vedic ganana, 27 Nakshatras aur graha sthitiyon ke dwara apna pavitra bhavishya jaanein.',
  },
  'Total Full Precision Birth Chart (Kundli) Master PDF': {
    hi: 'सम्पूर्ण जन्म कुण्डली (कुंडली) मास्टर पीडीएफ',
    bn: 'সম্পূর্ণ জন্ম কোষ্ঠী (কুণ্ডলী) মাস্টার পিডিএফ',
    ta: 'முழுமையான துல்லியமான பிறப்பு ஜாதகம் (குண்டலி) மாஸ்டர் PDF',
    te: 'సంపూర్ణ ఖచ్చితమైన జన్మ కుండలి మాస్టర్ PDF',
    mr: 'संपूर्ण अचूक जन्मपत्रिका (कुंडली) मास्टर पीडीएफ',
    gu: 'સંપૂર્ણ ચોક્કસ જન્મકુંડળી માસ્ટર પીડીએફ',
    kn: 'ಸಂಪೂರ್ಣ ನಿಖರವಾದ ಜನ್ಮ ಕುಂಡಲಿ ಮಾಸ್ಟರ್ PDF',
    ml: 'പൂർണ്ണ കൃത്യതയുള്ള ജനന ജാതകം (കുണ്ഡലി) മാസ്റ്റർ PDF',
    pa: 'ਸੰਪੂਰਨ ਸਟੀਕ ਜਨਮ ਕੁੰਡਲੀ ਮਾਸਟਰ ਪੀਡੀਐਫ',
    or: 'ସମ୍ପୂର୍ଣ୍ଣ ସଠିକ୍ ଜନ୍ମ କୁଣ୍ଡଳୀ ମାଷ୍ଟର PDF',
    as: 'সম্পূৰ্ণ নিখুঁত জন্ম কুণ্ডলী মাষ্টাৰ PDF',
    ur: 'مکمل درست پیدائشی زائچہ (کنڈلی) ماسٹر پی ڈی ایف',
    ar: 'ملف المخطط الفلكي الشامل فائق الدقة (كوندلي) PDF',
    hinglish: 'Sampurna Precision Birth Chart (Kundli) Master PDF',
  },
  'Complete 4-page high-contrast Vedic report: North Indian SVG Kundli diagram, all 9 graha exact degrees & dignities, 12-house synthesis, Vimshottari Mahadasha timeline, Shadbala strengths, Yogas, and personalized Vedic remedies.': {
    hi: 'सम्पूर्ण 4-पृष्ठीय उच्च-कंट्रास्ट वैदिक रिपोर्ट: उत्तर भारतीय कुण्डली आरेख, सभी 9 ग्रहों के सटीक अंश व गरिमा, 12 भावों का विश्लेषण, विंशोत्तरी महादशा समयरेखा, षड्बल सामर्थ्य, शुभ योग व व्यक्तिगत वैदिक उपाय।',
    bn: 'সম্পূর্ণ ৪ পৃষ্ঠার স্পষ্ট বৈদিক রিপোর্ট: উত্তর ভারতীয় কুণ্ডলী চিত্র, ৯টি গ্রহের সঠিক ডিগ্রি, ১২টি ভাবের বিশ্লেষণ, বিংশোত্তরী মহাদশা, ষড়বল শক্তি, যোগ এবং বৈদিক প্রতিকার।',
    ta: 'முழுமையான 4 பக்க வேத அறிக்கை: வட இந்திய குண்டலி வரைபடம், 9 கிரகங்களின் பாகைகள், 12 பாவங்களின் பகுப்பாய்வு, விம்சோத்தரி மகா தசா காலவரிசை, ஷட்பல வலிமை மற்றும் வேத பரிகாரங்கள்.',
    te: 'పూర్తి 4 పేజీల స్పష్టమైన వేద నివేదిక: ఉత్తర భారత కుండలి చిత్రం, 9 గ్రహాల ఖచ్చితమైన డిగ్రీలు, 12 భావాల విశ్లేషణ, వింశోత్తరి మహాదశ, షడ్బల బలం మరియు వేద నివారణలు.',
    mr: 'संपूर्ण 4 पृष्ठांचा वैदिक अहवाल: उत्तर भारतीय कुंडली आकृती, सर्व 9 ग्रहांचे अचूक अंश, 12 भावांचे विश्लेषण, विंशोत्तरी महादशा, षड्बल सामर्थ्य आणि वैयक्तिक वैदिक उपाय.',
    gu: 'સંપૂર્ણ 4 પાનાનો વૈદિક રિપોર્ટ: ઉત્તર ભારતીય કુંડળી આકૃતિ, તમામ 9 ગ્રહોના ચોક્કસ અંશ, 12 ભાવોનું વિશ્લેષણ, વિંશોત્તરી મહાદશા, ષડ્બલ શક્તિ અને વૈદિક ઉપાયો.',
    kn: 'ಸಂಪೂರ್ಣ 4 ಪುಟಗಳ ವೈದಿಕ ವರದಿ: ಉತ್ತರ ಭಾರತದ ಕುಂಡಲಿ ರೇಖಾಚಿತ್ರ, 9 ಗ್ರಹಗಳ ನಿಖರ ಅಂಶಗಳು, 12 ಮನೆಗಳ ವಿಶ್ಲೇಷಣೆ, ವಿಂಶೋತ್ತರಿ ಮಹಾದಶ ಕಾಲಾವಧಿ, ಷಡ್ಬಲ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ಪರಿಹಾರಗಳು.',
    ml: 'പൂർണ്ണ 4 പേജ് വൈദിക റിപ്പോർട്ട്: വടക്കേ ഇന്ത്യൻ കുണ്ഡലി ചിത്രം, 9 ഗ്രഹങ്ങളുടെ കൃത്യമായ ഡിഗ്രികൾ, 12 ഭാവങ്ങളുടെ അപഗ്രഥനം, വിംശോത്തരി മഹാദശ, ഷഡ്ബല ശക്തി, പരിഹാരങ്ങൾ.',
    pa: 'ਪੂਰੀ 4 ਸਫ਼ਿਆਂ ਦੀ ਵੈਦਿਕ ਰਿਪੋਰਟ: ਉੱਤਰ ਭਾਰਤੀ ਕੁੰਡਲੀ ਨਕਸ਼ਾ, 9 ਗ੍ਰਹਾਂ ਦੇ ਸਟੀਕ ਅੰਸ਼, 12 ਘਰਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ, ਵਿੰਸ਼ੋਤਰੀ ਮਹਾਦਸ਼ਾ ਅਤੇ ਵੈਦਿਕ ਉਪਾਅ।',
    or: 'ସମ୍ପୂର୍ଣ୍ଣ ୪ ପୃଷ୍ଠାର ବୈଦିକ ରିପୋର୍ଟ: ଉତ୍ତର ଭାରତୀୟ କୁଣ୍ଡଳୀ ଚିତ୍ର, ୯ ଗ୍ରହଙ୍କ ସଠିକ୍ ଅଂଶ, ୧୨ ଭାବର ବିଶ୍ଳେଷଣ, ବିଂଶୋତ୍ତରୀ ମହାଦଶା ଏବଂ ବୈଦିକ ପ୍ରତିକାର।',
    as: 'সম্পূৰ্ণ ৪ পৃষ্ঠাৰ বৈদিক প্ৰতিবেদন: উত্তৰ ভাৰতীয় কুণ্ডলী ছবি, ৯টা গ্ৰহৰ সঠিক অংশ, ১২টা ভাবৰ বিশ্লেষণ, বিংশোত্তৰী মহাদশা আৰু বৈদিক প্ৰতিকাৰ।',
    ur: 'مکمل 4 صفحات پر مشتمل ویدک رپورٹ: شمالی ہندوستانی کنڈلی ڈایاگرام، تمام 9 سیاروں کے درست درجات، 12 گھروں کا تجزیہ، ومشتری مہادشا اور ویدک علاج۔',
    ar: 'تقرير فيدي شامل من 4 صفحات: مخطط كوندلي لشمال الهند، درجات الكواكب التسعة، تحليل المنازل الـ 12، جدول الفيمشوتاري دوشا، وقوة شادبالا والعلاجات الفلكية.',
    hinglish: 'Sampurna 4-page Vedic report: North Indian Kundli chart, sabhi 9 grahon ke exact degrees, 12 bhavon ka vishleshan, Vimshottari Mahadasha timeline, Shadbala aur Vedic remedies.',
  },
  'Schedule a Reading': {
    hi: 'परामर्श सत्र बुक करें',
    bn: 'পরামর্শ বুক করুন',
    ta: 'ஜோதிட ஆலோசனை முன்பதிவு',
    te: 'సంప్రదింపుల సమయం బుక్ చేయండి',
    mr: 'सल्लामसलत बुक करा',
    gu: 'પરામર્શ સમય બુક કરો',
    kn: 'ಸಮಾಲೋಚನೆ ಬುಕ್ ಮಾಡಿ',
    ml: 'കൺസൾട്ടേഷൻ ബുക്ക് ചെയ്യുക',
    pa: 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    or: 'ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ',
    as: 'পৰামৰ্শ বুক কৰক',
    ur: 'سیشن بک کریں',
    ar: 'احجز جلسة استشارة',
    hinglish: 'Reading Schedule Karein',
  },
  'Explore Natal Chart': {
    hi: 'जन्म कुण्डली देखें',
    bn: 'জন্ম কোষ্ঠী দেখুন',
    ta: 'பிறப்பு ஜாதகம் காண்க',
    te: 'జన్మ కుండలిని చూడండి',
    mr: 'जन्मपत्रिका पहा',
    gu: 'જન્મકુંડળી જુઓ',
    kn: 'ಜನ್ಮ ಕುಂಡಲಿ ನೋಡಿ',
    ml: 'ജനന ജാതകം കാണുക',
    pa: 'ਜਨਮ ਕੁੰਡਲੀ ਦੇਖੋ',
    or: 'ଜନ୍ମ କୁଣ୍ଡଳୀ ଦେଖନ୍ତୁ',
    as: 'জন্ম কুণ্ডলী চাওক',
    ur: 'زائچہ پیدائش دیکھیں',
    ar: 'استكشف خريطة الولادة',
    hinglish: 'Natal Chart Dekhein',
  },
  'Download Full Birth Chart (PDF)': {
    hi: 'सम्पूर्ण जन्म कुंडली डाउनलोड करें (PDF)',
    bn: 'সম্পূর্ণ জন্ম কোষ্ঠী ডাউনলোড করুন (PDF)',
    ta: 'முழு ஜாதகத்தை பதிவிறக்குக (PDF)',
    te: 'పూర్తి జన్మ కుండలిని డౌన్‌లోడ్ చేయండి (PDF)',
    mr: 'संपूर्ण जन्मपत्रिका डाउनलोड करा (PDF)',
    gu: 'સંપૂર્ણ જન્મકુંડળી ડાઉનલોડ કરો (PDF)',
    kn: 'ಸಂಪೂರ್ಣ ಜನ್ಮ ಕುಂಡಲಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PDF)',
    ml: 'പൂർണ്ണ ജാതകം ഡൗൺലോഡ് ചെയ്യുക (PDF)',
    pa: 'ਪੂਰੀ ਜਨਮ ਕੁੰਡਲੀ ਡਾਊਨਲੋਡ ਕਰੋ (PDF)',
    or: 'ସମ୍ପୂର୍ଣ୍ଣ ଜନ୍ମ କୁଣ୍ଡଳୀ ଡାଉନଲୋଡ କରନ୍ତୁ (PDF)',
    as: 'সম্পূৰ্ণ জন্ম কুণ্ডলী ডাউনলোড কৰক (PDF)',
    ur: 'مکمل پیدائشی زائچہ ڈاؤن لوڈ کریں (PDF)',
    ar: 'تحميل خريطة الولادة الكاملة (PDF)',
    hinglish: 'Full Birth Chart Download Karein (PDF)',
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
  'Specialist Consultations': {
    hi: 'विशेषज्ञ ज्योतिषीय परामर्श',
    bn: 'বিশেষজ্ঞ জ্যোতিষ পরামর্শ',
    ta: 'நிபுணத்துவ ஜோதிட ஆலோசனைகள்',
    te: 'నిపుణులైన జ్యోతిష సంప్రదింపులు',
    mr: 'तज्ज्ञ ज्योतिष सल्लामसलत',
    gu: 'નિષ્ણાત જ્યોતિષીય પરામર્શ',
    kn: 'ತಜ್ಞ ಜ್ಯೋತಿಷ್ಯ ಸಮಾಲೋಚನೆಗಳು',
    ml: 'വിദഗ്ദ്ധ ജ്യോതിഷ കൺസൾട്ടേഷനുകൾ',
    pa: 'ਮਾਹਰ ਜੋਤਿਸ਼ ਸਲਾਹ',
    or: 'ବିଶେଷଜ୍ଞ ଜ୍ୟୋତିଷ ପରାମର୍ଶ',
    as: 'বিশেষজ্ঞ জ্যোতিষ পৰামৰ্শ',
    ur: 'ماہرانہ نجومی مشاورت',
    ar: 'استشارات فلكية متخصصة',
    hinglish: 'Specialist Astrological Consultations',
  },
  'Daily Cosmic Horoscope': {
    hi: 'दैनिक राशिफल एवं ग्रह प्रभाव',
    bn: 'দৈনিক রাশিফল ও গ্রহ প্রভাব',
    ta: 'தினசரி ராசிபலன் மற்றும் கிரக ஆதிக்கம்',
    te: 'రోజువారీ రాశిఫలాలు & గ్రహాల ప్రభావం',
    mr: 'दैनिक राशीभविष्य आणि ग्रह प्रभाव',
    gu: 'દૈનિક રાશિફળ અને ગ્રહ પ્રભાવ',
    kn: 'ದೈನಂದಿನ ಜಾತಕ ಫಲ ಮತ್ತು ಗ್ರಹ ಪ್ರಭಾವ',
    ml: 'പ്രതിദിന രാശിഫലം',
    pa: 'ਰੋਜ਼ਾਨਾ ਰਾਸ਼ੀਫਲ',
    or: 'ଦୈନିକ ରାଶିଫଳ',
    as: 'দৈনিক ৰাশিফল',
    ur: 'روزانہ زائچہ و سیاروی اثرات',
    ar: 'الأبراج اليومية وتأثير الكواكب',
    hinglish: 'Daily Rashifal & Cosmic Energy',
  },
  'Explore 33+ Vedic Tools': {
    hi: '33+ वैदिक टूल्स का अन्वेषण करें',
    bn: '৩৩+ বৈদিক টুলস ব্যবহার করুন',
    ta: '33+ வேத கருவிகளை ஆராயுங்கள்',
    te: '33+ వేద టూల్స్‌ను అన్వేషించండి',
    mr: '33+ वैदिक टूल्सचा लाभ घ्या',
    gu: '33+ વૈદિક ટૂલ્સ અજમાવો',
    kn: '33+ ವೈದಿಕ ಉಪಕರಣಗಳನ್ನು ಬಳಸಿ',
    ml: '33+ വൈദിക ടൂളുകൾ പരിശോധിക്കുക',
    pa: '33+ ਵੈਦਿਕ ਟੂਲਜ਼ ਦੀ ਵਰਤੋਂ ਕਰੋ',
    or: '୩୩+ ବୈଦିକ ଉପକରଣ ବ୍ୟବହାର କରନ୍ତୁ',
    as: '৩৩+ বৈদিক সঁজুলি ব্যৱহাৰ কৰক',
    ur: '33+ ویدک ٹولز تلاش کریں',
    ar: 'استكشف أكثر من 33 أداة فلكية',
    hinglish: 'Explore karein 33+ Vedic Tools',
  },
};

// Register in universal registry
registerTranslationDictionary(EXTENDED_DESCRIPTIONS);

/**
 * Universal in-browser DOM text node translator.
 * Walks visible text nodes and translates matches immediately.
 */
let isTranslating = false;

export function applyDOMTranslation(targetLang: LanguageCode) {
  if (typeof document === 'undefined') return;

  const body = document.body;
  if (!body) return;

  if (targetLang === 'ar' || targetLang === 'ur') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  document.documentElement.lang = targetLang;

  if (isTranslating) return;
  isTranslating = true;

  try {
    walkTextNodes(body, targetLang);
    translateAttributes(body, targetLang);
  } finally {
    isTranslating = false;
  }
}


function translateSingleTextNode(node: Text, lang: LanguageCode) {
  const parent = node.parentElement;
  if (!parent) return;

  // Skip code, script, style, and svg elements
  const tag = parent.tagName.toLowerCase();
  if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre' || tag === 'svg' || tag === 'path') {
    return;
  }

  const currentVal = node.nodeValue || '';
  if (!currentVal.trim()) return;

  // Save original English text
  if (!(node as any).__origText) {
    (node as any).__origText = currentVal;
  }

  const orig = (node as any).__origText;
  const trimmed = orig.trim();

  if (lang === 'en') {
    // Restore original English text
    if (node.nodeValue !== orig) {
      node.nodeValue = orig;
    }
    return;
  }

  // 1. Exact match in EXTENDED_DESCRIPTIONS
  if (EXTENDED_DESCRIPTIONS[trimmed] && EXTENDED_DESCRIPTIONS[trimmed][lang]) {
    node.nodeValue = orig.replace(trimmed, EXTENDED_DESCRIPTIONS[trimmed][lang]!);
    return;
  }

  // 2. Exact match in UI_TRANSLATIONS
  if (UI_TRANSLATIONS[trimmed] && UI_TRANSLATIONS[trimmed][lang]) {
    node.nodeValue = orig.replace(trimmed, UI_TRANSLATIONS[trimmed][lang]);
    return;
  }

  // 3. Fallback to Hindi if target is Punjabi/Urdu/Hinglish
  if (UI_TRANSLATIONS[trimmed] && UI_TRANSLATIONS[trimmed]['hi'] && (lang === 'hinglish' || lang === 'pa' || lang === 'ur')) {
    node.nodeValue = orig.replace(trimmed, UI_TRANSLATIONS[trimmed]['hi']);
    return;
  }
}

function walkTextNodes(root: HTMLElement | Node, lang: LanguageCode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre' || tag === 'svg' || tag === 'path') {
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

function translateAttributes(root: HTMLElement, lang: LanguageCode) {
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
    } else if (UI_TRANSLATIONS[orig] && UI_TRANSLATIONS[orig][lang]) {
      el.setAttribute('placeholder', UI_TRANSLATIONS[orig][lang]);
    }
  });
}
