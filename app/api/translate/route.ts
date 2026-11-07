import { NextRequest, NextResponse } from 'next/server';

// Server-side in-memory cache to avoid duplicate API requests across users/sessions
const translationCache: Record<string, string> = {};

// Clean text for translation lookup
function cacheKey(text: string, targetLang: string): string {
  return `${targetLang}:${text.trim().toLowerCase()}`;
}

// Map app language code to Google Translate language code
function getGoogleLangCode(lang: string): string {
  switch (lang) {
    case 'hinglish':
      return 'hi';
    case 'as':
      return 'as';
    case 'or':
      return 'or';
    case 'ur':
      return 'ur';
    case 'ar':
      return 'ar';
    default:
      return lang;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { texts, targetLang } = body;

    if (!texts || !Array.isArray(texts) || !targetLang) {
      return NextResponse.json(
        { error: 'texts (array) and targetLang (string) are required' },
        { status: 400 }
      );
    }

    if (targetLang === 'en') {
      const identity: Record<string, string> = {};
      texts.forEach((t: string) => {
        identity[t] = t;
      });
      return NextResponse.json({ translations: identity });
    }

    const googleLang = getGoogleLangCode(targetLang);
    const translations: Record<string, string> = {};
    const missingTexts: string[] = [];

    // 1. Check in-memory cache
    for (const text of texts) {
      if (typeof text !== 'string' || !text.trim()) continue;
      const key = cacheKey(text, targetLang);
      if (translationCache[key]) {
        translations[text] = translationCache[key];
      } else {
        missingTexts.push(text);
      }
    }

    // 2. Fetch missing texts in concurrent batches via Google Translate single client
    if (missingTexts.length > 0) {
      const concurrencyLimit = 6;
      for (let i = 0; i < missingTexts.length; i += concurrencyLimit) {
        const batch = missingTexts.slice(i, i + concurrencyLimit);
        await Promise.all(
          batch.map(async (text) => {
            try {
              const encoded = encodeURIComponent(text.trim());
              const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encoded}`;

              const res = await fetch(url, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                },
                next: { revalidate: 86400 },
              });

              if (res.ok) {
                const data = await res.json();
                if (data && Array.isArray(data[0])) {
                  const translated = data[0].map((item: any) => item[0]).join('');
                  if (translated && typeof translated === 'string') {
                    translations[text] = translated;
                    translationCache[cacheKey(text, targetLang)] = translated;
                    return;
                  }
                }
              }
            } catch (e) {
              // Ignore single phrase failure, fall back to original
            }
          })
        );
      }
    }

    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Error in /api/translate route:', error);
    return NextResponse.json(
      { error: 'Internal translation error', translations: {} },
      { status: 500 }
    );
  }
}

