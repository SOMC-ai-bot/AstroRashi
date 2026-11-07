const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'components', 'layout', 'CompanyFooter.tsx');

const content = `'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { NavTab } from './BottomNav';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Mail,
  Lock,
  FileText,
  RefreshCcw,
  Truck,
  Cookie,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Star,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Calendar,
  Heart,
  Calculator,
  Compass,
  ArrowUpRight,
  Layers,
  Award,
  Globe,
  Sliders,
} from 'lucide-react';

export type FooterModalTopic =
  // Company Policies
  | 'about'
  | 'contact'
  | 'data-privacy'
  | 'privacy-policy'
  | 'terms'
  | 'refund'
  | 'delivery'
  | 'cookies'
  // Product Informational
  | 'features'
  | 'how-it-works'
  | 'android-app'
  | 'comparisons'
  | 'alternatives'
  // Learn Informational
  | 'zodiac-signs'
  | 'houses'
  | 'planets'
  | 'western-astrology'
  | 'blog';

interface CompanyFooterProps {
  onTabChange?: (tab: NavTab) => void;
  onOpenPremium?: () => void;
  onOpenAuth?: () => void;
}

export const CompanyFooter: React.FC<CompanyFooterProps> = ({
  onTabChange,
  onOpenPremium,
  onOpenAuth,
}) => {
  const [activeModal, setActiveModal] = useState<FooterModalTopic | null>(null);
  const [cookieConsent, setCookieConsent] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });
  const [cookieSaved, setCookieSaved] = useState(false);
  const [activeSignTab, setActiveSignTab] = useState<'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'>('Aries');

  const handleOpen = (topic: FooterModalTopic) => {
    setActiveModal(topic);
    setCookieSaved(false);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const navigateTo = (tab: NavTab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    handleClose();
  };

  // Render modal content
  const renderModalContent = () => {
    switch (activeModal) {
      // ════════════════════════════════════════════════════════════════════════
      // PRODUCT MODALS
      // ════════════════════════════════════════════════════════════════════════
      case 'features':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <div style={{ padding: '12px 16px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} color="#F97316" />
              <span style={{ fontWeight: 700, color: '#FDBA74' }}>
                AstroRashi Platform Feature Matrix
              </span>
            </div>
            <p>
              AstroRashi combines ancient Vedic Shastras with cutting-edge astronomical ephemeris computing and conversational AI intelligence:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#F97316', marginBottom: '4px' }}>1. Sub-Arcsecond Kundli Engine</div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>D-1 Rashi, D-9 Navamsha, Bhava Chalit, and divisional charts with Lahiri, Raman, Krishnamurti (KP), and Tropical zodiac support.</div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#38BDF8', marginBottom: '4px' }}>2. Vimshottari 3-Tier Dasha</div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>120-year cycle broken into Mahadasha, Antardasha, and Pratyantardasha calibrated to accurate Moon Nakshatra degrees.</div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#EC4899', marginBottom: '4px' }}>3. Ashtakoota 36-Guna Matching</div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>Deep compatibility matrix: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi with full Manglik cancellation rules.</div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#A855F7', marginBottom: '4px' }}>4. AI Astrologer Assistant</div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>Conversational guidance powered by fine-tuned Gemini models grounded in your personalized planetary placements.</div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#10B981', marginBottom: '4px' }}>5. 33+ Vedic Calculators</div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>Sade Sati, Kaal Sarp, Manglik Dosha, Lucky Gemstones, Rudraksha recommendation, Numerology, and Name matching.</div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#EAB308', marginBottom: '4px' }}>6. Multilingual in 15 Languages</div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, and Urdu.</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => navigateTo('charts')}
                style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '8px', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
              >
                View Birth Chart
              </button>
              <button
                type="button"
                onClick={() => navigateTo('tools')}
                style={{ padding: '10px 18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
              >
                Open 33+ Calculators
              </button>
            </div>
          </div>
        );

      case 'how-it-works':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <h4 style={{ color: '#F97316', margin: 0, fontSize: '16px' }}>Precision Ephemeris &amp; Astrological Architecture</h4>
            <p>
              Unlike generic horoscope platforms that rely on pre-written daily sun-sign blurbs, AstroRashi uses real-time astronomical coordinate mechanics:
            </p>
            <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <strong>High-Precision Coordinates:</strong> You enter your exact birth date, time, and city. Our service geocodes the exact latitude, longitude, and timezone offset to avoid DST inaccuracies.
              </li>
              <li>
                <strong>Astronomical Ephemeris Lookup:</strong> We calculate Julian Day numbers and compute true celestial longitudes of all 9 Navagrahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu) plus Uranus, Neptune, and Pluto.
              </li>
              <li>
                <strong>Ayanamsha Shift:</strong> By applying the Swiss/Chitrapaksha Lahiri Ayanamsha (~24° 08&apos;), we map tropical longitudes to sidereal Nakshatra constellations (Aswini through Revati).
              </li>
              <li>
                <strong>Ascendant (Lagna) Calculation:</strong> The exact eastern horizon intersection at your birth moment determines your 1st House, setting up the entire 12-Bhava natal matrix.
              </li>
              <li>
                <strong>AI Synthesis:</strong> Our astrological models evaluate planetary dignity (Uccha, Neecha, Swakshetra), aspect angles (Drishti), and active Vimshottari Dasha to answer your questions accurately.
              </li>
            </ol>
            <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '8px', fontSize: '12.5px', color: '#38BDF8' }}>
              ✓ All calculations are strictly deterministic and reproducible against standard ephemerides.
            </div>
          </div>
        );

      case 'android-app':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px' }}>
              <Smartphone size={24} color="#10B981" />
              <div>
                <div style={{ fontWeight: 800, color: '#6EE7B7', fontSize: '15px' }}>AstroRashi for Android &amp; Mobile</div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>Available as a Progressive Web App (PWA) and coming soon to Google Play</div>
              </div>
            </div>
            <p>
              Experience seamless Vedic astrology right on your phone without downloading heavy APKs:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Instant Install on Android:</strong> Tap Chrome menu &rarr; &quot;Add to Home Screen&quot; or &quot;Install App&quot; to run AstroRashi full-screen with app-like performance.</li>
              <li><strong>Offline Chart Caching:</strong> View your stored natal chart, divisional charts, and saved family Kundlis even without an active data connection.</li>
              <li><strong>Daily Rahu Kaal &amp; Transit Alerts:</strong> Receive auspicious Muhurta timings and planetary transit notifications directly on your lock screen.</li>
            </ul>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  alert('To install AstroRashi on your device:\\n\\n1. Tap the Share or 3-dots icon in your mobile browser.\\n2. Select "Add to Home Screen" or "Install App".\\n3. AstroRashi will launch as a standalone app on your home screen!');
                }}
                style={{
                  padding: '10px 18px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Install App on This Device
              </button>
            </div>
          </div>
        );

      case 'comparisons':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '13px', lineHeight: 1.6 }}>
            <h4 style={{ color: '#F97316', margin: 0, fontSize: '15px' }}>Why Astrologers &amp; Seekers Choose AstroRashi</h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
                    <th style={{ padding: '10px', color: '#94A3B8' }}>Feature</th>
                    <th style={{ padding: '10px', color: '#F97316' }}>AstroRashi</th>
                    <th style={{ padding: '10px', color: '#CBD5E1' }}>Traditional Portals</th>
                    <th style={{ padding: '10px', color: '#CBD5E1' }}>Generic AI (ChatGPT)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Ephemeris Accuracy</td>
                    <td style={{ padding: '10px', color: '#10B981', fontWeight: 700 }}>Sub-arcsecond NASA JPL</td>
                    <td style={{ padding: '10px', color: '#94A3B8' }}>Approximated lookup</td>
                    <td style={{ padding: '10px', color: '#EF4444' }}>Severe hallucinations</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>36-Guna Kundli Matching</td>
                    <td style={{ padding: '10px', color: '#10B981', fontWeight: 700 }}>Full 8 Kootas + Cancellation</td>
                    <td style={{ padding: '10px', color: '#94A3B8' }}>Basic score only</td>
                    <td style={{ padding: '10px', color: '#EF4444' }}>None / Incorrect Gunas</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Vimshottari Dasha</td>
                    <td style={{ padding: '10px', color: '#10B981', fontWeight: 700 }}>Complete 3-Level Breakdown</td>
                    <td style={{ padding: '10px', color: '#94A3B8' }}>Often locked behind paywall</td>
                    <td style={{ padding: '10px', color: '#EF4444' }}>Unreliable dates</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>User Privacy &amp; Data</td>
                    <td style={{ padding: '10px', color: '#10B981', fontWeight: 700 }}>100% Zero-Sale Guarantee</td>
                    <td style={{ padding: '10px', color: '#EF4444' }}>Ad networks &amp; trackers</td>
                    <td style={{ padding: '10px', color: '#F59E0B' }}>Used for model training</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Ad-Free Experience</td>
                    <td style={{ padding: '10px', color: '#10B981', fontWeight: 700 }}>100% Ad-Free Clean UI</td>
                    <td style={{ padding: '10px', color: '#EF4444' }}>Intrusive popups &amp; banners</td>
                    <td style={{ padding: '10px', color: '#94A3B8' }}>Text only interface</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'alternatives':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <h4 style={{ color: '#F97316', margin: 0, fontSize: '15px' }}>Modern Alternative to Outdated Astrological Software</h4>
            <p>
              For decades, astrologers had to rely on legacy desktop software from the 1990s (like Parashara&apos;s Light or Kundli 7) or ad-stuffed web portals cluttered with misleading gem ads and pop-ups.
            </p>
            <p>
              <strong>AstroRashi</strong> was built from the ground up as a modern, high-precision alternative:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Zero Clutter:</strong> Modern dark cosmic glassmorphism aesthetic focused on clarity and readability.</li>
              <li><strong>Interactive Vedic Charts:</strong> Hover over houses and planets to inspect degrees, Nakshatra padas, Karakas, and Avashthas instantly.</li>
              <li><strong>Multi-Profile Family Vault:</strong> Save and manage birth details for your family and friends with instant 1-click synastry.</li>
            </ul>
          </div>
        );

      // ════════════════════════════════════════════════════════════════════════
      // LEARN MODALS
      // ════════════════════════════════════════════════════════════════════════
      case 'zodiac-signs':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#E2E8F0', fontSize: '13.5px', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ color: '#F97316', margin: 0, fontSize: '16px' }}>The 12 Vedic Rashis (Zodiac Signs)</h4>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>Sidereal Lahiri System</span>
            </div>
            <p style={{ margin: 0 }}>
              In Vedic astrology, your Rashi (Moon sign) and Lagna (Ascendant) determine your core psyche, vitality, and karmic journey:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {[
                { sign: 'Mesha (Aries)', ruler: 'Mars (Mangal)', element: 'Fire (Agni)', quality: 'Dynamic, courage, initiative' },
                { sign: 'Vrishabha (Taurus)', ruler: 'Venus (Shukra)', element: 'Earth (Prithvi)', quality: 'Stability, luxury, patience' },
                { sign: 'Mithuna (Gemini)', ruler: 'Mercury (Budha)', element: 'Air (Vayu)', quality: 'Intellect, communication, adaptability' },
                { sign: 'Karka (Cancer)', ruler: 'Moon (Chandra)', element: 'Water (Jala)', quality: 'Intuition, emotion, nurturing' },
                { sign: 'Simha (Leo)', ruler: 'Sun (Surya)', element: 'Fire (Agni)', quality: 'Leadership, radiance, nobility' },
                { sign: 'Kanya (Virgo)', ruler: 'Mercury (Budha)', element: 'Earth (Prithvi)', quality: 'Analytical, precision, healing' },
                { sign: 'Tula (Libra)', ruler: 'Venus (Shukra)', element: 'Air (Vayu)', quality: 'Harmony, diplomacy, aesthetics' },
                { sign: 'Vrishchika (Scorpio)', ruler: 'Mars / Ketu', element: 'Water (Jala)', quality: 'Transformation, intensity, depth' },
                { sign: 'Dhanu (Sagittarius)', ruler: 'Jupiter (Guru)', element: 'Fire (Agni)', quality: 'Dharma, philosophy, exploration' },
                { sign: 'Makara (Capricorn)', ruler: 'Saturn (Shani)', element: 'Earth (Prithvi)', quality: 'Perseverance, discipline, structure' },
                { sign: 'Kumbha (Aquarius)', ruler: 'Saturn / Rahu', element: 'Air (Vayu)', quality: 'Innovation, humanitarian, visionary' },
                { sign: 'Meena (Pisces)', ruler: 'Jupiter (Guru)', element: 'Water (Jala)', quality: 'Moksha, spirituality, compassion' },
              ].map((r, idx) => (
                <div key={idx} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#FDBA74', fontSize: '13px' }}>{r.sign}</div>
                  <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px' }}>Ruler: <strong style={{ color: '#E2E8F0' }}>{r.ruler}</strong> • {r.element}</div>
                  <div style={{ fontSize: '11.5px', color: '#CBD5E1', marginTop: '4px' }}>{r.quality}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => navigateTo('charts')}
                style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '8px', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer', fontSize: '12.5px' }}
              >
                Inspect Your Signs in Birth Chart &rarr;
              </button>
            </div>
          </div>
        );

      case 'houses':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#E2E8F0', fontSize: '13.5px', lineHeight: 1.6 }}>
            <h4 style={{ color: '#F97316', margin: 0, fontSize: '16px' }}>The 12 Bhavas (Houses of Destiny)</h4>
            <p style={{ margin: 0 }}>
              Each house in your Kundli governs specific life dimensions, karmic challenges, and worldly rewards:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              {[
                { num: '1st Bhava (Tanu)', label: 'Self & Vitality', desc: 'Physical constitution, persona, head, health, and natural disposition.' },
                { num: '2nd Bhava (Dhana)', label: 'Wealth & Speech', desc: 'Accumulated assets, family lineage, speech truthfulness, face, and food.' },
                { num: '3rd Bhava (Sahaja)', label: 'Courage & Siblings', desc: 'Initiative, short journeys, writing, younger siblings, and throat/arms.' },
                { num: '4th Bhava (Sukha)', label: 'Mother & Heart', desc: 'Inner peace, home, vehicles, emotional foundation, real estate, and mother.' },
                { num: '5th Bhava (Putra)', label: 'Intelligence & Purva Punya', desc: 'Creativity, past-life merits, children, romance, mantra siddhi, and intellect.' },
                { num: '6th Bhava (Ari)', label: 'Enemies & Overcoming', desc: 'Debts, disputes, competitive exams, immune vitality, daily work, and service.' },
                { num: '7th Bhava (Yuvati)', label: 'Marriage & Partnerships', desc: 'Spouse, business alliances, public relations, trade, and lifelong bond.' },
                { num: '8th Bhava (Randhra)', label: 'Transformation & Longevity', desc: 'Occult wisdom, unexpected inheritance, lifespan, mysteries, and research.' },
                { num: '9th Bhava (Dharma)', label: 'Fortune & Wisdom', desc: 'Higher philosophy, father, guru, pilgrimage, ethics, and destiny grace.' },
                { num: '10th Bhava (Karma)', label: 'Career & Authority', desc: 'Professional triumph, status, executive power, public reputation, and deeds.' },
                { num: '11th Bhava (Labha)', label: 'Gains & Aspirations', desc: 'Incoming revenue, friendships, social influence, elder siblings, and fulfillment.' },
                { num: '12th Bhava (Vyaya)', label: 'Moksha & Foreign Lands', desc: 'Spiritual liberation, meditation, sleep, foreign travels, and expenses.' },
              ].map((b, idx) => (
                <div key={idx} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '13px' }}>{b.num}</div>
                  <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '12px' }}>{b.label}</div>
                  <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px' }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'planets':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#E2E8F0', fontSize: '13.5px', lineHeight: 1.6 }}>
            <h4 style={{ color: '#F97316', margin: 0, fontSize: '16px' }}>The Navagrahas (Nine Cosmic Energies)</h4>
            <p style={{ margin: 0 }}>
              The 9 Vedic grahas are living karmic forces that channel the cosmic matrix through your birth chart:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px' }}>
              {[
                { name: 'Surya (Sun)', signifies: 'Soul (Atma), father, power, leadership, vitality', exalt: 'Aries', debil: 'Libra', years: '6 Years' },
                { name: 'Chandra (Moon)', signifies: 'Mind (Manas), mother, emotional flow, peace', exalt: 'Taurus', debil: 'Scorpio', years: '10 Years' },
                { name: 'Mangal (Mars)', signifies: 'Courage, willpower, blood, land, brothers', exalt: 'Capricorn', debil: 'Cancer', years: '7 Years' },
                { name: 'Budha (Mercury)', signifies: 'Intellect, speech, commerce, analytics, nerves', exalt: 'Virgo', debil: 'Pisces', years: '17 Years' },
                { name: 'Guru (Jupiter)', signifies: 'Wisdom, dharma, prosperity, children, guru', exalt: 'Cancer', debil: 'Capricorn', years: '16 Years' },
                { name: 'Shukra (Venus)', signifies: 'Love, beauty, artistic talent, luxury, spouse', exalt: 'Pisces', debil: 'Virgo', years: '20 Years' },
                { name: 'Shani (Saturn)', signifies: 'Karma, discipline, longevity, patience, time', exalt: 'Libra', debil: 'Aries', years: '19 Years' },
                { name: 'Rahu (North Node)', signifies: 'Ambition, foreign influence, tech, obsession', exalt: 'Taurus/Gemini', debil: 'Scorpio/Sagittarius', years: '18 Years' },
                { name: 'Ketu (South Node)', signifies: 'Moksha, detachment, mysticism, spirituality', exalt: 'Scorpio/Sagittarius', debil: 'Taurus/Gemini', years: '7 Years' },
              ].map((p, idx) => (
                <div key={idx} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 800, color: '#C084FC', fontSize: '13px' }}>{p.name}</div>
                  <div style={{ fontSize: '11.5px', color: '#E2E8F0', marginTop: '2px' }}>{p.signifies}</div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                    Exalted: <span style={{ color: '#86EFAC' }}>{p.exalt}</span> • Debilitated: <span style={{ color: '#FCA5A5' }}>{p.debil}</span>
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#FDBA74', marginTop: '2px' }}>Dasha Duration: {p.years}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'western-astrology':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <h4 style={{ color: '#38BDF8', margin: 0, fontSize: '16px' }}>Vedic (Sidereal) vs. Western (Tropical) Astrology</h4>
            <p>
              AstroRashi offers native support for both classical traditions. Understanding the key differences allows you to harness both perspectives:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div style={{ padding: '14px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#F97316', fontSize: '14px', marginBottom: '6px' }}>Vedic (Nirayana / Sidereal)</div>
                <div style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: 1.55 }}>
                  Based on the physical backdrop of fixed star constellations. Accounts for the Earth&apos;s axial precession (~24° difference called Ayanamsha). Focuses heavily on the Moon sign, Nakshatras, and Vimshottari timing.
                </div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#38BDF8', fontSize: '14px', marginBottom: '6px' }}>Western (Sayana / Tropical)</div>
                <div style={{ fontSize: '12.5px', color: '#CBD5E1', lineHeight: 1.55 }}>
                  Based on the Earth-Sun relationship tied to equinoxes and solstices (0° Aries begins at the Spring Equinox). Focuses heavily on the Sun sign, psychological archetypes, and aspects like sextiles and squares.
                </div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#94A3B8' }}>
              💡 In AstroRashi, you can effortlessly switch between <strong>Vedic Lahiri</strong> and <strong>Western Tropical</strong> in your birth chart view with 1 click!
            </p>
          </div>
        );

      case 'blog':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#E2E8F0', fontSize: '13.5px', lineHeight: 1.6 }}>
            <h4 style={{ color: '#F97316', margin: 0, fontSize: '16px' }}>AstroRashi Vedic Knowledge Digest</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'The Truth About Sade Sati: Why Saturn Disciplines, Not Destroys', date: 'Vedic Research • 6 min read', summary: 'Understanding the 7.5-year transit of Saturn through the 12th, 1st, and 2nd houses from your natal Moon and constructive remedies.' },
                { title: 'Manglik Dosha Demystified: Classical Shastric Cancellation Rules', date: 'Kundli Matching • 5 min read', summary: 'Why 70% of apparent Manglik charts have complete astrological cancellation (Bhanga) according to Brihat Parashara Hora Shastra.' },
                { title: 'Navamsha (D9) Chart: Unlocking Your True Dharma & Life Partner', date: 'Divisional Charts • 8 min read', summary: 'How the 9th harmonic division reveals the strength of planets after age 30 and pinpoints your destined marriage dynamics.' },
                { title: 'Choosing Shubh Muhurta for Housewarming, Marriage & Business Launch', date: 'Panchang Wisdom • 4 min read', summary: 'Avoiding Rahu Kaal and Gulika while harnessing Abhijit Muhurat, Amrit Siddhi, and Sarvartha Siddhi Yogas.' },
              ].map((article, idx) => (
                <div key={idx} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '14px' }}>{article.title}</div>
                  <div style={{ fontSize: '11px', color: '#F97316', margin: '2px 0 4px' }}>{article.date}</div>
                  <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>{article.summary}</div>
                </div>
              ))}
            </div>
          </div>
        );

      // ════════════════════════════════════════════════════════════════════════
      // COMPANY POLICIES MODALS
      // ════════════════════════════════════════════════════════════════════════
      case 'about':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '10px' }}>
              <Sparkles size={20} color="#F97316" />
              <span style={{ fontWeight: 700, color: '#FDBA74' }}>
                AstroRashi • Sacred Vedic Heritage Meets Modern Ephemeris Computing
              </span>
            </div>
            <p>
              <strong>AstroRashi</strong> is a modern astrological intelligence platform built by a dedicated team of Vedic researchers, ephemeris engineers, and AI developers. Our mission is to preserve the profound precision of Maharishi Parashara&apos;s <em>Brihat Parashara Hora Shastra</em>, Jaimini Sutras, and classical Muhurta wisdom while presenting them through an intuitive, contemporary interface.
            </p>
            <h4 style={{ color: '#F97316', margin: '8px 0 4px', fontSize: '15px' }}>What Makes AstroRashi Different</h4>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>High-Precision Ephemeris:</strong> Sub-arcsecond planetary calculations using high-accuracy astronomical algorithms with standard Chitrapaksha / Lahiri Ayanamsha (sidereal) and tropical (Western) options.</li>
              <li><strong>Complete Dasha Matrices:</strong> Multi-tiered Vimshottari Mahadasha, Antardasha, and Pratyantardasha timing calibrated to the exact birth coordinates.</li>
              <li><strong>Ashtakoota &amp; Synastry:</strong> 36-Guna Kundli matching engine calculating Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi with comprehensive Manglik Dosha cancellation rules.</li>
              <li><strong>AI Companion + Certified Astrologers:</strong> Blending real-time computational astrology with verified astrological insights.</li>
            </ul>
            <div style={{ marginTop: '8px', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '12.5px', color: '#94A3B8' }}>
              Headquartered in India with research contributors across Varanasi, Bengaluru, and international astrological societies.
            </div>
          </div>
        );

      case 'contact':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <p>
              We are dedicated to providing responsive, respectful, and compassionate assistance for all technical, astrological, and billing inquiries.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '10px' }}>
                <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>Client Support &amp; Enquiries</div>
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>support@astrorashi.com</div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>Typical response within 2–4 hours</div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '10px' }}>
                <div style={{ color: '#F97316', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>Consultations &amp; Vedic Desk</div>
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>consult@astrorashi.com</div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>Direct appointment coordination</div>
              </div>
            </div>
            <h4 style={{ color: '#38BDF8', margin: '8px 0 4px', fontSize: '15px' }}>Operational Hours</h4>
            <p style={{ margin: 0 }}>
              • <strong>Kundli &amp; Digital Dossiers:</strong> 24 hours a day, 7 days a week (Automated computational engine).<br />
              • <strong>Live Astrologer Desk:</strong> 09:00 AM – 11:00 PM IST (Monday through Sunday).<br />
              • <strong>Emergency Billing &amp; Payment Support:</strong> Monitored round the clock.
            </p>
            <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '12px', color: '#94A3B8' }}>
              Registered Office: AstroRashi Technologies Pvt. Ltd., Tech Cosmics Park, Outer Ring Road, Bengaluru, Karnataka 560103, India.
            </div>
          </div>
        );

      case 'data-privacy':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <div style={{ padding: '12px 16px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.35)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={18} color="#C084FC" />
              <span style={{ fontWeight: 700, color: '#E9D5FF' }}>
                Strict Confidentiality of Your Sacred Birth Details
              </span>
            </div>
            <p>
              In Vedic astrology, your exact date, time, and latitude/longitude coordinates represent personal celestial blueprints. We treat this information with the utmost digital hygiene and respect.
            </p>
            <h4 style={{ color: '#C084FC', margin: '4px 0', fontSize: '15px' }}>Our Privacy Commitments</h4>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Zero Sale of Personal Data:</strong> We never sell, rent, or lease your name, birth coordinates, email, or telephone numbers to advertisers, brokers, or external entities.</li>
              <li><strong>Encrypted in Transit &amp; at Rest:</strong> All planetary calculations and session communications are encrypted using TLS 1.3 in transit and AES-256 at rest.</li>
              <li><strong>Client-Side Calculation First:</strong> Your chart ephemeris and divisional D-charts are computed client-side in your browser wherever possible to minimize raw transmission.</li>
              <li><strong>Total Data Control:</strong> You can purge your saved birth profiles, family profiles, and stored PDF dossiers at any time directly from the Profile &amp; Settings menu with immediate effect.</li>
            </ul>
          </div>
        );

      case 'privacy-policy':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '13.5px', lineHeight: 1.65 }}>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Effective Date: November 2026 • Compliant with Indian DPDP Act 2023 &amp; Global Privacy Standards</div>
            <p>
              This Privacy Policy describes how <strong>AstroRashi</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, processes, and protects your information when you access our web application, tools, and services.
            </p>
            <h4 style={{ color: '#10B981', margin: '4px 0', fontSize: '14.5px' }}>1. Information We Collect</h4>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Birth Information:</strong> Full name, date of birth, accurate birth time, birth city/country, and derived geographic coordinates (latitude, longitude, timezone).</li>
              <li><strong>Account Credentials:</strong> Email address, mobile telephone number, and authentication tokens (via Firebase Authentication).</li>
              <li><strong>Astrological Preferences:</strong> Selected tradition (Vedic Lahiri vs. Western Tropical), house system (Whole Sign, Placidus, Equal), and language selection.</li>
              <li><strong>Payment Records:</strong> Transaction IDs, plan tiers, and payment status handled securely via Razorpay / Stripe (we never store full credit/debit card numbers on our servers).</li>
            </ul>
            <h4 style={{ color: '#10B981', margin: '4px 0', fontSize: '14.5px' }}>2. Purpose of Processing</h4>
            <p style={{ margin: 0 }}>
              Information is processed exclusively to: (a) construct natal, divisional, and transit Kundli charts; (b) compute Dasha timelines and synastry match scores; (c) deliver certified PDF dossiers; and (d) enable verified customer login sessions.
            </p>
            <h4 style={{ color: '#10B981', margin: '4px 0', fontSize: '14.5px' }}>3. Data Retention &amp; Rights</h4>
            <p style={{ margin: 0 }}>
              You retain the right to review, update, rectify, or request deletion of your account and all associated natal profiles. To exercise these rights, email <em>privacy@astrorashi.com</em> or use the reset controls in your profile screen.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '13.5px', lineHeight: 1.65 }}>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Last Updated: November 2026</div>
            <p>
              By accessing or utilizing the <strong>AstroRashi</strong> application, calculators, Kundli charts, AI astrological companion, and related features, you agree to be bound by these Terms of Service.
            </p>
            <div style={{ padding: '12px 14px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '8px' }}>
              <strong style={{ color: '#FCD34D' }}>Important Advisory &amp; Astrological Disclaimer:</strong>
              <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: '#FEF3C7', lineHeight: 1.55 }}>
                Astrological interpretations, Vedic birth chart calculations, synastry readings, planetary transit insights, and AI suggestions are provided for spiritual guidance, personal reflection, and cultural exploration only. Astrology is not an exact empirical science and should not substitute for licensed medical, psychological, legal, or professional financial advice.
              </p>
            </div>
            <h4 style={{ color: '#F59E0B', margin: '4px 0', fontSize: '14.5px' }}>1. User Account Integrity</h4>
            <p style={{ margin: 0 }}>
              You are responsible for maintaining the confidentiality of your login credentials and for providing accurate birth time and location details to ensure valid astronomical calculations.
            </p>
            <h4 style={{ color: '#F59E0B', margin: '4px 0', fontSize: '14.5px' }}>2. Intellectual Property</h4>
            <p style={{ margin: 0 }}>
              All algorithmic chart rendering code, UI layouts, planetary iconography, Vedic analysis modules, and generated PDF dossier formats are the intellectual property of AstroRashi Technologies. You may download personal PDF dossiers for individual, non-commercial use only.
            </p>
            <h4 style={{ color: '#F59E0B', margin: '4px 0', fontSize: '14.5px' }}>3. Fair Use &amp; Platform Availability</h4>
            <p style={{ margin: 0 }}>
              We strive for 99.9% uptime of our calculation engine. Automated scraping, malicious query flooding, or reverse engineering of astrological calculation endpoints is strictly prohibited.
            </p>
          </div>
        );

      case 'refund':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <div style={{ padding: '12px 16px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '10px' }}>
              <strong style={{ color: '#F472B6' }}>100% Transparency &amp; Fair Refund Policy</strong>
            </div>
            <p>
              At AstroRashi, we stand behind the precision of our ephemeris engine and the depth of our readings. If you encounter any issue, here is how our policy operates:
            </p>
            <h4 style={{ color: '#F472B6', margin: '4px 0', fontSize: '14.5px' }}>1. Digital Subscriptions (Premium Plans)</h4>
            <p style={{ margin: 0 }}>
              • <strong>7-Day Window:</strong> If you are unsatisfied with your Premium subscription within 7 days of initial purchase, contact support@astrorashi.com for a full, unconditional refund.<br />
              • <strong>Easy Cancellation:</strong> You can cancel auto-renewal at any time from the Profile &amp; Settings screen without cancellation fees. You will retain access until the end of your billing cycle.
            </p>
            <h4 style={{ color: '#F472B6', margin: '4px 0', fontSize: '14.5px' }}>2. Certified PDF Dossiers &amp; Reports</h4>
            <p style={{ margin: 0 }}>
              Because PDF dossiers are dynamically compiled using high-precision ephemeris computation upon purchase, refunds for generated dossiers are provided if:
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>A technical glitch prevented the PDF from rendering or downloading properly.</li>
              <li>A verified system calculation error occurred in planetary longitude or house cusps.</li>
              <li>You were billed multiple times in error for a single transaction.</li>
            </ul>
            <h4 style={{ color: '#F472B6', margin: '4px 0', fontSize: '14.5px' }}>3. How to Request a Refund</h4>
            <p style={{ margin: 0 }}>
              Send an email to <strong>refunds@astrorashi.com</strong> with your registered email, order/transaction ID, and a brief description. Approved refunds are credited to the original payment method within 5–7 business days.
            </p>
          </div>
        );

      case 'delivery':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <div style={{ padding: '12px 16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '10px' }}>
              <strong style={{ color: '#818CF8' }}>Instant Digital Fulfillment Engine</strong>
            </div>
            <p>
              All products, services, and reports available on <strong>AstroRashi</strong> are 100% digital goods delivered instantly over high-speed secure cloud servers. There are no physical shipping charges or postal delays.
            </p>
            <h4 style={{ color: '#818CF8', margin: '4px 0', fontSize: '14.5px' }}>Delivery Timelines</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <strong>• Kundli Charts &amp; Planetary Degrees:</strong> Delivered <em>instantly (sub-second)</em> directly in your active browser session.
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <strong>• Certified Astrological PDF Dossiers:</strong> Generated in <em>3–5 seconds</em> with direct in-browser view, one-click print/PDF download, and permanent storage in your dossier vault.
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <strong>• AI Astrologer Consultations:</strong> Instant streaming responses powered by Google Gemini and specialized Vedic planetary prompts.
              </div>
              <div style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <strong>• Premium Plan Activation:</strong> Immediate upon successful payment confirmation from the gateway.
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#94A3B8' }}>
              If you do not see your generated report immediately, simply refresh the Reports tab or reach out to <em>delivery@astrorashi.com</em> with your transaction receipt.
            </p>
          </div>
        );

      case 'cookies':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#E2E8F0', fontSize: '14px', lineHeight: 1.65 }}>
            <p>
              We use necessary local storage items and cookies to preserve your astrological settings (e.g. Sidereal vs. Tropical, selected birth profiles, and active language) so your calculations remain seamlessly available when you return.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>Strictly Essential &amp; Natal Computation</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Required for auth sessions, ephemeris state, and profile persistence.</div>
                </div>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, padding: '4px 8px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px' }}>Always Active</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>Performance &amp; Ephemeris Caching</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Caches planetary ephemeris tables to speed up chart loading times.</div>
                </div>
                <input
                  type="checkbox"
                  checked={cookieConsent.analytics}
                  onChange={(e) => setCookieConsent({ ...cookieConsent, analytics: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#F97316', cursor: 'pointer' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>Astrological Notifications &amp; Reminders</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Remembers daily Rahu Kaal, transit alert settings, and Muhurta preferences.</div>
                </div>
                <input
                  type="checkbox"
                  checked={cookieConsent.marketing}
                  onChange={(e) => setCookieConsent({ ...cookieConsent, marketing: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#F97316', cursor: 'pointer' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setCookieSaved(true);
                  setTimeout(() => handleClose(), 1000);
                }}
                style={{
                  padding: '9px 18px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {cookieSaved ? (
                  <>
                    <CheckCircle size={15} />
                    <span>Preferences Saved!</span>
                  </>
                ) : (
                  <span>Save Cookie Preferences</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCookieConsent({ essential: true, analytics: true, marketing: true });
                  setCookieSaved(true);
                  setTimeout(() => handleClose(), 1000);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38BDF8',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'features': return 'Platform Features & Capabilities';
      case 'how-it-works': return 'How AstroRashi Works';
      case 'android-app': return 'Android & Mobile PWA App';
      case 'comparisons': return 'AstroRashi Platform Comparison';
      case 'alternatives': return 'AstroRashi Modern Alternative';
      case 'zodiac-signs': return 'Zodiac Signs (12 Rashis)';
      case 'houses': return 'Astrological Houses (12 Bhavas)';
      case 'planets': return 'The Navagrahas (Nine Celestial Bodies)';
      case 'western-astrology': return 'Western & Tropical Astrology';
      case 'blog': return 'Vedic Knowledge & Astrological Insights';
      case 'about': return 'About AstroRashi';
      case 'contact': return 'Contact & Vedic Client Desk';
      case 'data-privacy': return 'Your Data & Privacy';
      case 'privacy-policy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'refund': return 'Refund Policy';
      case 'delivery': return 'Delivery Policy';
      case 'cookies': return 'Manage Cookies';
      default: return 'AstroRashi Information';
    }
  };

  // Reusable Link Item
  const FooterLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '3px 0',
        display: 'block',
        color: '#94A3B8',
        fontSize: '13.5px',
        fontWeight: 450,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'color 0.15s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.transform = 'translateX(3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#94A3B8';
        e.currentTarget.style.transform = 'translateX(0px)';
      }}
    >
      {label}
    </button>
  );

  return (
    <>
      <footer
        style={{
          marginTop: '64px',
          paddingTop: '48px',
          paddingBottom: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#07080C',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px 32px',
          }}
        >
          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 1: BRAND LOGO + ABOUT PARAGRAPH + SOCIALS + GET THE APP
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ gridColumn: 'span 2', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Logo Badge matching the reference image */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                }}
              >
                <Sparkles size={20} color="#FFFFFF" />
              </div>
              <div
                style={{
                  padding: '4px 12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  AstroRashi
                </span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F97316', background: 'rgba(249, 115, 22, 0.15)', padding: '2px 5px', borderRadius: '4px' }}>
                  AI
                </span>
              </div>
            </div>

            {/* Paragraph 1 */}
            <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '420px' }}>
              AstroRashi is an advanced AI astrologer for Vedic and Western astrology. Ask about career, marriage, health or money and get answers from your own birth chart, in 15 languages.
            </p>

            {/* Paragraph 2 */}
            <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '420px' }}>
              Free Panchang, kundli matching and 33+ astrology calculators, all built on precise astronomical calculations. Your birth details are never sold.
            </p>

            {/* Social Icons matching the reference image */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px' }}>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#EC4899'; e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#1877F2'; e.currentTarget.style.background = 'rgba(24, 119, 242, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            {/* GET THE APP section */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                GET THE APP
              </div>
              <button
                type="button"
                onClick={() => handleOpen('android-app')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 14px',
                  backgroundColor: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* Google Play store colored triangle */}
                <svg width="22" height="22" viewBox="0 0 512 512">
                  <path fill="#4caf50" d="M325.3 234.3L104.6 13l280.8 161.2z"/>
                  <path fill="#ffeb3b" d="M470 234.3l-84.8-48.8-60 48.8 60 48.8L470 234.3z"/>
                  <path fill="#f44336" d="M104.6 499l220.7-221.3 60 48.8L104.6 499z"/>
                  <path fill="#2196f3" d="M104.6 13v486L325.3 234.3z"/>
                </svg>
                <div>
                  <div style={{ fontSize: '9px', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GET IT ON</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>Google Play</div>
                </div>
              </button>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                iPhone app coming soon
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 2: PRODUCT
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              PRODUCT
            </h3>
            <FooterLink label="Features" onClick={() => handleOpen('features')} />
            <FooterLink label="How It Works" onClick={() => handleOpen('how-it-works')} />
            <FooterLink label="AI Astrologers" onClick={() => navigateTo('ai')} />
            <FooterLink label="Reports" onClick={() => navigateTo('reports')} />
            <FooterLink label="Pricing" onClick={() => { if (onOpenPremium) onOpenPremium(); }} />
            <FooterLink label="Android App" onClick={() => handleOpen('android-app')} />
            <FooterLink label="Comparisons" onClick={() => handleOpen('comparisons')} />
            <FooterLink label="Alternatives" onClick={() => handleOpen('alternatives')} />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 3: FREE TOOLS
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              FREE TOOLS
            </h3>
            <FooterLink label="Panchang" onClick={() => navigateTo('panchang')} />
            <FooterLink label="Calculators" onClick={() => navigateTo('tools')} />
            <FooterLink label="Love Calculator" onClick={() => navigateTo('matching')} />
            <FooterLink label="Shubh Muhurat" onClick={() => navigateTo('panchang')} />
            <FooterLink label="Horoscope" onClick={() => navigateTo('charts')} />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 4: LEARN
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              LEARN
            </h3>
            <FooterLink label="Zodiac Signs (Rashis)" onClick={() => handleOpen('zodiac-signs')} />
            <FooterLink label="Houses (Bhavas)" onClick={() => handleOpen('houses')} />
            <FooterLink label="Planets (Navagraha)" onClick={() => handleOpen('planets')} />
            <FooterLink label="Western Astrology" onClick={() => handleOpen('western-astrology')} />
            <FooterLink label="Blog" onClick={() => handleOpen('blog')} />
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              COLUMN 5: COMPANY
             ═══════════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              COMPANY
            </h3>
            <FooterLink label="About" onClick={() => handleOpen('about')} />
            <FooterLink label="Contact" onClick={() => handleOpen('contact')} />
            <FooterLink label="Your Data & Privacy" onClick={() => handleOpen('data-privacy')} />
            <FooterLink label="Privacy Policy" onClick={() => handleOpen('privacy-policy')} />
            <FooterLink label="Terms of Service" onClick={() => handleOpen('terms')} />
            <FooterLink label="Refund Policy" onClick={() => handleOpen('refund')} />
            <FooterLink label="Delivery Policy" onClick={() => handleOpen('delivery')} />
            <FooterLink label="Manage cookies" onClick={() => handleOpen('cookies')} />
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            maxWidth: '1240px',
            margin: '40px auto 0',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '12px',
            color: '#64748B',
          }}
        >
          <div>© {new Date().getFullYear()} AstroRashi Technologies Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>NASA JPL Ephemeris • Lahiri Sidereal & Tropical</span>
            <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              Secure 256-Bit SSL
            </span>
          </div>
        </div>
      </footer>

      {/* ── Policy & Information Modal Dialog with Tabs ── */}
      <Modal
        isOpen={Boolean(activeModal)}
        onClose={handleClose}
        title={getModalTitle()}
        size="lg"
        maxWidth="840px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick categories switcher inside modal */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              padding: '4px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              scrollbarWidth: 'none',
            }}
          >
            {[
              { id: 'features', label: 'Features' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'zodiac-signs', label: 'Rashis' },
              { id: 'houses', label: 'Houses' },
              { id: 'planets', label: 'Navagraha' },
              { id: 'western-astrology', label: 'Western' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' },
              { id: 'data-privacy', label: 'Data & Privacy' },
              { id: 'terms', label: 'Terms' },
              { id: 'refund', label: 'Refunds' },
              { id: 'cookies', label: 'Cookies' },
            ].map((tab) => {
              const isSelected = tab.id === activeModal;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleOpen(tab.id as FooterModalTopic)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: isSelected ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : '#94A3B8',
                    fontSize: '11.5px',
                    fontWeight: isSelected ? 750 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Modal Body */}
          <div
            style={{
              maxHeight: '62vh',
              overflowY: 'auto',
              paddingRight: '6px',
            }}
          >
            {renderModalContent()}
          </div>
        </div>
      </Modal>
    </>
  );
};
`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log('CompanyFooter.tsx upgraded successfully with full 5-column layout!');

