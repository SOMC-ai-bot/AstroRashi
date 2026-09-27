import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import { AuthProvider } from '@/lib/state/auth-context';
import { SubscriptionProvider } from '@/lib/state/subscription-context';
import { AstrologyProvider } from '@/lib/state/astrology-context';
import { ChatProvider } from '@/lib/state/chat-context';
import { ConsultantProvider } from '@/lib/state/consultant-context';
import { CommunityProvider } from '@/lib/state/community-context';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#171719',
};

export const metadata: Metadata = {
  title: 'AstroNex — Cosmic Intelligence & Self-Discovery',
  description:
    'AstroNex is a premium AI-powered personal assistant, authentic astronomical natal chart platform, astrologer consultation marketplace, and cosmic community.',
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
                    <CommunityProvider>{children}</CommunityProvider>
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
