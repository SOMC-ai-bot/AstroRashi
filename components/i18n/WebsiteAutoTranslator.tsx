'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { LanguageCode } from '@/types';
import { runWebsiteAutoTranslate } from '@/lib/i18n/auto-translator';

const LANG_DISPLAY_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  hinglish: 'Hinglish',
  bn: 'বাংলা (Bengali)',
  ta: 'தமிழ் (Tamil)',
  te: 'తెలుగు (Telugu)',
  mr: 'मराठी (Marathi)',
  gu: 'ગુજરાતી (Gujarati)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  or: 'ଓଡ଼ିଆ (Odia)',
  as: 'অসমীয়া (Assamese)',
  ur: 'اردو (Urdu)',
  ar: 'العربية (Arabic)',
};

export function WebsiteAutoTranslator() {
  const { language } = useI18n();
  const isFirstMount = useRef(true);
  const [translatingToast, setTranslatingToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pure Native In-App Auto-Translator Pass
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Apply native multi-language translation and RTL/LTR layout
    runWebsiteAutoTranslate(language);

    // Show toast only on user-initiated language change (skip initial mount)
    if (isFirstMount.current) {
      isFirstMount.current = false;
    } else {
      setTranslatingToast(LANG_DISPLAY_NAMES[language] || language);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setTranslatingToast(null);
      }, 2000);
    }

    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [language]);

  if (!translatingToast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '84px',
        right: '24px',
        zIndex: 99999,
        backgroundColor: '#0A0D1B',
        border: '1px solid rgba(245, 208, 97, 0.55)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.9), 0 0 24px rgba(245, 208, 97, 0.35)',
        borderRadius: '9999px',
        padding: '8px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#FDE89C',
        fontSize: '13px',
        fontWeight: 700,
        animation: 'fadeInUp 200ms ease-out',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#34D399',
          boxShadow: '0 0 10px #34D399',
          display: 'inline-block',
        }}
      />
      <span>✦ {translatingToast}</span>
    </div>
  );
}
