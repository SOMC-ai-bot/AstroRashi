import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import { AuthProvider } from '@/lib/state/auth-context';
import { SubscriptionProvider } from '@/lib/state/subscription-context';
import { AstrologyProvider } from '@/lib/state/astrology-context';
import { ChatProvider } from '@/lib/state/chat-context';
import { ConsultantProvider } from '@/lib/state/consultant-context';
import { CommunityProvider } from '@/lib/state/community-context';
import { CookieConsentBanner } from '@/components/company/CookieConsentBanner';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#171719',
};

export const metadata: Metadata = {
  title: 'AstroRashi — Modern Vedic Astrology & Cosmic Intelligence',
  description:
    'AstroRashi is an ultra-modern AI-powered Vedic astrology platform, authentic Lagna chart suite, Kundli matching engine, and Panchang calendar.',
  keywords: [
    'astrology',
    'natal chart',
    'birth chart',
    'ai assistant',
    'vedic astrology',
    'astronomy',
    'horoscope',
    'consultations',
    'transits',
    'kundli',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <AstrologyProvider>
                <ChatProvider>
                  <ConsultantProvider>
                    <CommunityProvider>
                    {children}
                    <CookieConsentBanner />
                  </CommunityProvider>
                  </ConsultantProvider>
                </ChatProvider>
              </AstrologyProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
