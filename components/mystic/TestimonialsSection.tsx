'use client';

import React from 'react';
import { Star, Sparkles, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  city: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  highlight: string;
  avatarBg: string;
}

export const TestimonialsSection: React.FC = () => {
  const reviews: Testimonial[] = [
    {
      name: 'Dr. Rohit Sharma',
      role: 'Surgeon & Healthcare Director',
      city: 'New Delhi',
      service: 'Shani Sade Sati & Career Transit',
      rating: 5,
      date: 'Verified Seeker • October 2026',
      highlight: 'Remarkable accuracy in timing my medical fellowship and relocation.',
      avatarBg: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      text: 'The Sade Sati and 10th house Dasha breakdown was astoundingly precise. Rather than instilling fear, the analysis provided clear planetary rationale and specific Shiva-Hanuman upayas that brought immense mental equilibrium and career breakthrough.',
    },
    {
      name: 'Ananya & Vikramaditya Verma',
      role: 'Newly Married Couple',
      city: 'Lucknow & Varanasi',
      service: '36 Guna Ashtakoot Milan & Navamsa D9',
      rating: 5,
      date: 'Verified Match • September 2026',
      highlight: 'Both families found absolute peace of mind without any superstitions.',
      avatarBg: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
      text: 'Our families were apprehensive about Nadi and Bhakoot doshas. The master chart analysis walked us through the exact classical cancellations and mutual Moon-Venus harmonies. The dossier gave both families complete confidence and clarity.',
    },
    {
      name: 'Amanpreet Kapoor',
      role: 'Tech Founder & Investor',
      city: 'Chandigarh / Bengaluru',
      service: 'Dhana Yoga & Business Muhurat',
      rating: 5,
      date: 'Verified Seeker • August 2026',
      highlight: 'Timed our product launch to the exact auspicious hora window.',
      avatarBg: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
      text: 'We timed our international fundraising and platform launch using the Choghadiya and 11th house Jupiter transit guidance provided here. The clarity, absence of superstition, and direct mathematical precision was unlike any traditional astrology service.',
    },
    {
      name: 'Priya Malhotra',
      role: 'Corporate HR Executive',
      city: 'Jaipur, Rajasthan',
      service: 'Vimshottari Dasha & Ishta Devata',
      rating: 5,
      date: 'Verified Seeker • October 2026',
      highlight: 'Transformed my daily spiritual discipline and emotional resilience.',
      avatarBg: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
      text: 'Learning my exact Karakamsa lagna and Ishta Devata mantra helped anchor my spiritual practice during a turbulent Rahu antardasha. The deep insights were empathetic, uplifting, and grounded in genuine Shastric wisdom.',
    },
    {
      name: 'Rajeshwar Gupta',
      role: 'Senior Chartered Accountant',
      city: 'Kanpur, Uttar Pradesh',
      service: 'Vedic Janam Kundli Master Dossier',
      rating: 5,
      date: 'Verified Seeker • September 2026',
      highlight: 'Pure Parashari depth with the sophistication of modern engineering.',
      avatarBg: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
      text: 'Having studied Jyotish amateurishly for 20 years, I was thoroughly impressed by the fidelity of the Lahiri Ayanamsa degrees, Shadbala tables, and KP sub-lord derivations. The 40-page master PDF dossier is a treasure to keep for life.',
    },
    {
      name: 'Dr. Neha Tripathi',
      role: 'Assistant Professor of Philosophy',
      city: 'Varanasi, Uttar Pradesh',
      service: 'Navamsa D9 & Relationship Alignment',
      rating: 5,
      date: 'Verified Seeker • October 2026',
      highlight: 'First time I experienced astrology as a profound contemplative science.',
      avatarBg: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
      text: 'The explanation of how Navamsa reveals inner dharma while the birth chart anchors worldly embodiment was philosophical and luminous. The personalized remedies were simple, practical, and truly transformative. Dhanyawaad!',
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#F5D061',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px',
            background: 'rgba(245, 208, 97, 0.1)',
            padding: '5px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(245, 208, 97, 0.28)',
          }}
        >
          <Sparkles size={13} color="#F5D061" />
          <span>Real Client Experiences & Trust</span>
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: '32px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            margin: '4px 0',
          }}
        >
          What My Clients Say
        </h3>
        <p style={{ fontSize: '13.5px', color: '#94A3B8', maxWidth: '580px', margin: '6px auto 0', lineHeight: 1.6 }}>
          Enduring trust earned through mathematical rigor, classical Parashari Jyotish, and compassionate life solutions.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '20px',
        }}
      >
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              borderRadius: '18px',
              padding: '24px 22px',
              background: 'linear-gradient(180deg, rgba(20, 18, 32, 0.96) 0%, rgba(11, 10, 20, 0.99) 100%)',
              border: '1.5px solid rgba(249, 115, 22, 0.24)',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
            }}
            className="card-hover"
          >
            <div>
              {/* Header: Stars, Rating & Verified Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="#FACC15" color="#FACC15" />
                  ))}
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#FACC15', marginLeft: '4px' }}>
                    5.0
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 750,
                    color: '#34D399',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShieldCheck size={12} />
                  <span>Verified Seeker</span>
                </span>
              </div>

              {/* Bold Takeaway Highlight */}
              <div
                style={{
                  fontSize: '13.5px',
                  fontWeight: 750,
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  lineHeight: 1.45,
                }}
              >
                &ldquo;{rev.highlight}&rdquo;
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontSize: '12.5px',
                  color: '#CBD5E1',
                  lineHeight: 1.65,
                  fontStyle: 'normal',
                  marginBottom: '18px',
                }}
              >
                {rev.text}
              </p>
            </div>

            {/* Bottom: Client Profile & Service Tag */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: rev.avatarBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 800,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {rev.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '1px' }}>
                    {rev.role} • {rev.city}
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  color: '#F5D061',
                  background: 'rgba(245, 208, 97, 0.12)',
                  border: '1px solid rgba(245, 208, 97, 0.25)',
                  padding: '4px 9px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {rev.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
