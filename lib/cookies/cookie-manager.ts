export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  consentGiven: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'astrorashi_cookie_preferences';

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  consentGiven: false,
  updatedAt: new Date().toISOString(),
};

export function getCookiePreferences(): CookiePreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_COOKIE_PREFERENCES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_COOKIE_PREFERENCES;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_COOKIE_PREFERENCES,
      ...parsed,
      necessary: true, // Always true
    };
  } catch (e) {
    console.error('Error reading cookie preferences:', e);
    return DEFAULT_COOKIE_PREFERENCES;
  }
}

export function saveCookiePreferences(
  prefs: Partial<Omit<CookiePreferences, 'necessary' | 'consentGiven' | 'updatedAt'>> & {
    all?: boolean;
    rejectOptional?: boolean;
  }
): CookiePreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_COOKIE_PREFERENCES;
  }

  const current = getCookiePreferences();
  let updated: CookiePreferences;

  if (prefs.all) {
    updated = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      consentGiven: true,
      updatedAt: new Date().toISOString(),
    };
  } else if (prefs.rejectOptional) {
    updated = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      consentGiven: true,
      updatedAt: new Date().toISOString(),
    };
  } else {
    updated = {
      ...current,
      ...prefs,
      necessary: true,
      consentGiven: true,
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('astrorashi_cookie_update', { detail: updated }));
  } catch (e) {
    console.error('Error saving cookie preferences:', e);
  }

  return updated;
}

export function hasGivenCookieConsent(): boolean {
  if (typeof window === 'undefined') return true;
  return getCookiePreferences().consentGiven;
}

