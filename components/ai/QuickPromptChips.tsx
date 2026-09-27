'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface QuickPromptChipsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const QuickPromptChips: React.FC<QuickPromptChipsProps> = ({ onSelectPrompt }) => {
  const { language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>('career');

  const categories = [
    { id: 'career', label: 'Career & Goals' },
    { id: 'love', label: 'Love & Relationship' },
    { id: 'general', label: 'Tech & Productivity' },
    { id: 'chart', label: 'Birth Chart Analysis' },
  ];

  const promptCatalog: Record<string, Record<string, string[]>> = {
    career: {
      en: [
        "What does my 10th house indicate about my career path?",
        "When is the best astrological timing for a professional pivot?",
        "What are the major strengths in my vocational blueprint?",
      ],
      hi: [
        "मेरी कुंडली का दशम भाव मेरे करियर के बारे में क्या कहता है?",
        "नौकरी या व्यापार में परिवर्तन के लिए क्या समय अनुकूल है?",
        "मेरे चार्ट में कौन से ग्रह करियर को मजबूती प्रदान करते हैं?",
      ],
      hinglish: [
        "Career ke liye meri kundli ka 10th house kya bolta hai?",
        "Job change ya business startup ke liye auspicious timing kya hai?",
        "Saturn aur Sun placements mere professional growth ko kaise shape karte hain?",
      ],
    },
    love: {
      en: [
        "What does my Venus and 7th house reveal about relationships?",
        "How can I balance independence and emotional intimacy?",
        "What emotional qualities does my Moon seek in a long-term partner?",
      ],
      hi: [
        "सप्तम भाव और शुक्र मेरे वैवाहिक जीवन को कैसे प्रभावित करते हैं?",
        "मेरी चंद्र राशि के अनुसार मेरी भावनात्मक आवश्यकताएं क्या हैं?",
      ],
      hinglish: [
        "Relationship aur marriage ke mamle mein mera 7th house kya batata hai?",
        "Mera Moon sign partner se emotionally kya demand karta hai?",
      ],
    },
    general: {
      en: [
        "Explain quantum computing in simple terms with an analogy.",
        "Write a clean TypeScript retry function with exponential backoff.",
        "Draft a polite but firm email requesting an update on a pending contract.",
        "Give me 3 high-leverage B2B business ideas for technology enterprise.",
      ],
      hi: [
        "क्वांटम कंप्यूटिंग की अवधारणा को सरल उदाहरण से समझाइए।",
        "व्यापारिक सहयोग के लिए एक औपचारिक ईमेल का प्रारूप तैयार करें।",
      ],
      hinglish: [
        "Quantum computing ko aasaan bhasha mein explain karo.",
        "Ek professional business partnership proposal email draft karo.",
        "Python mein asynchronous data fetching ka clean code likho.",
      ],
    },
    chart: {
      en: [
        "Synthesize my Sun, Moon, and Ascendant triad.",
        "Explain the significance of my Saturn placement.",
        "How do current planetary transits affect my personal growth?",
      ],
      hi: [
        "मेरी सूर्य, चंद्र और लग्न राशि का संपूर्ण विश्लेषण करें।",
        "मेरी कुंडली में शनि की स्थिति का जीवन पर क्या प्रभाव है?",
      ],
      hinglish: [
        "Meri Sun, Moon aur Lagna ka complete synthesis batao.",
        "Mera Saturn return kab hai aur iska kya impact hoga?",
      ],
    },
  };

  const getPrompts = () => {
    const cat = promptCatalog[activeCategory] || promptCatalog.career;
    return cat[language] || cat.en || cat.hinglish || [];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeCategory === c.id ? 'var(--accent-wine)' : 'rgba(255, 255, 255, 0.06)',
              color: activeCategory === c.id ? '#FFFFFF' : 'var(--text-muted)',
              fontSize: '11px',
              fontWeight: activeCategory === c.id ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 160ms ease',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Suggested Prompt Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {getPrompts().map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 180ms ease',
            }}
            className="chip-hover"
          >
            &ldquo;{prompt}&rdquo;
          </button>
        ))}
      </div>
    </div>
  );
};
