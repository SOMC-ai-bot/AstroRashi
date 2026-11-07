'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LEARNING_ARTICLES, GLOSSARY_ENTRIES } from '@/lib/astrology-engine/learn-data';
import { LearningArticle, GlossaryEntry } from '@/types';
import { useConsultant } from '@/lib/state/consultant-context';
import {
  BookOpen,
  Search,
  Sparkles,
  Compass,
  ArrowRight,
  Clock,
  HelpCircle,
  CheckCircle2,
  X,
  ExternalLink,
  ArrowLeft,
  Printer,
  Award,
} from 'lucide-react';

export const LearnHub: React.FC = () => {
  const { startSpecialistSession } = useConsultant();

  const [activeTab, setActiveTab] = useState<'articles' | 'glossary'>('articles');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<LearningArticle | null>(null);

  const handleOpenInNewWindow = (article: LearningArticle) => {
    const newWindow = window.open('', '_blank');
    if (!newWindow) return;

    const notesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${article.title} | AstroNex Cosmic Study Notes</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Outfit', 'Segoe UI', Roboto, sans-serif;
      line-height: 1.8;
      color: #E2E8F0;
      background: #0A0914;
      max-width: 900px;
      margin: 0 auto;
      padding: 48px 24px;
    }
    h1, h2, h3, h4 { color: #FFFFFF; font-family: 'Cinzel', Georgia, serif; letter-spacing: 0.02em; }
    h1 { font-size: 32px; border-bottom: 2px solid #F5D061; padding-bottom: 16px; margin-bottom: 24px; line-height: 1.3; }
    h2 { font-size: 22px; color: #F5D061; margin-top: 40px; margin-bottom: 16px; border-left: 4px solid #FF6A00; padding-left: 12px; }
    h3 { font-size: 18px; color: #38BDF8; margin-top: 24px; margin-bottom: 12px; }
    .badge { display: inline-block; background: rgba(245, 208, 97, 0.2); color: #F5D061; border: 1px solid rgba(245, 208, 97, 0.4); padding: 5px 14px; border-radius: 999px; font-size: 12.5px; font-weight: bold; margin-bottom: 16px; }
    .intro-box { background: rgba(255, 255, 255, 0.04); border-left: 4px solid #F5D061; padding: 20px 24px; border-radius: 8px; margin-bottom: 32px; font-size: 16px; color: #F8FAFC; line-height: 1.7; }
    .note-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.09); border-radius: 12px; padding: 26px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
    .principles-box { background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(20, 18, 33, 0.9) 100%); border: 1px solid rgba(168, 85, 247, 0.35); border-radius: 12px; padding: 24px; margin-bottom: 32px; }
    ul { padding-left: 24px; margin: 14px 0; }
    li { margin-bottom: 10px; font-size: 15px; }
    p { margin-bottom: 16px; font-size: 15px; }
    .faq-box { background: rgba(255, 255, 255, 0.02); border-left: 3px solid #38BDF8; padding: 14px 18px; margin-bottom: 14px; border-radius: 6px; }
    .outro-box { background: linear-gradient(135deg, rgba(255, 106, 0, 0.2) 0%, rgba(245, 208, 97, 0.12) 100%); border: 1.5px solid rgba(245, 208, 97, 0.35); border-radius: 12px; padding: 26px; margin-top: 40px; }
    @media print {
      body { background: #FFFFFF; color: #0F172A; }
      h1, h2, h3 { color: #0F172A; }
      .intro-box, .note-card, .principles-box, .outro-box { background: #F8FAFC; border: 1px solid #CBD5E1; color: #1E293B; }
    }
  </style>
</head>
<body>
  <div class="badge">${article.branch} • ${article.category} • ${article.readingTime}</div>
  <h1>${article.title}</h1>
  <div class="intro-box"><strong>🌟 Executive Introduction:</strong><br/>${article.summary}</div>
  ${article.keyTakeaways ? `
  <div class="principles-box">
    <h3>📌 Key Astrological Principles & Executive Notes</h3>
    <ul>${article.keyTakeaways.map((k) => `<li><strong>${k}</strong></li>`).join('')}</ul>
  </div>` : ''}
  <div>
    <h2>📖 Deep-Dive Study Notes & Chapter Breakdown</h2>
    ${article.content
        .map(
          (p) => `
      <div class="note-card">
        <p>${p.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>
      </div>
    `
        )
        .join('')}
  </div>
  ${article.faqs && article.faqs.length > 0
        ? `
  <div>
    <h2>❓ Frequently Asked Questions & Classical Clarifications</h2>
    ${article.faqs
          .map(
            (f) => `
      <div class="faq-box">
        <strong>Q: ${f.question}</strong>
        <p style="margin-top: 6px; color: #CBD5E1;">A: ${f.answer}</p>
      </div>
    `
          )
          .join('')}
  </div>`
        : ''
      }
  <div class="outro-box">
    <h3>🎯 Executive Outro & Practical Synthesis</h3>
    <p>Understanding these cosmic archetypes empowers you to perceive your psychological blueprints with conscious, spiritual agency. For chart-specific verification, consult our AstroNex specialists.</p>
  </div>
</body>
</html>`;
    newWindow.document.write(notesHtml);
    newWindow.document.close();
  };

  // Filter articles
  const filteredArticles = LEARNING_ARTICLES.filter((art) => {
    const matchesBranch = selectedBranch === 'All' || art.branch === selectedBranch;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q);
    return matchesBranch && matchesQuery;
  });

  // Filter glossary
  const filteredGlossary = GLOSSARY_ENTRIES.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // DEDICATED FULL-PAGE STUDY NOTES READER VIEW (NOT IN A POP-UP WINDOW)
  if (activeArticle) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '90px' }}>
        {/* Navigation Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveArticle(null)}
            icon={<ArrowLeft size={15} />}
          >
            Back to All Guides
          </Button>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenInNewWindow(activeArticle)}
              icon={<ExternalLink size={14} />}
            >
              Open in New Webpage
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              icon={<Printer size={14} />}
            >
              Print Notes (PDF)
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => startSpecialistSession('classic')}
              icon={<Sparkles size={14} />}
            >
              Ask Astrologer
            </Button>
          </div>
        </div>

        {/* Master Document Header Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(139, 47, 85, 0.3) 0%, rgba(14, 10, 24, 0.96) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-xl)',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Badge variant="gold" size="sm">
              {activeArticle.branch}
            </Badge>
            <Badge variant="surface" size="sm">
              {activeArticle.category}
            </Badge>
            <span style={{ fontSize: '12px', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} />
              <span>{activeArticle.readingTime}</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: '28px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.01em',
              lineHeight: 1.35,
              marginBottom: '16px',
            }}
          >
            {activeArticle.title}
          </h1>

          {/* Intro Box */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderLeft: '4px solid var(--gold-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
            }}
          >
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} />
              <span>Executive Introduction & Premise</span>
            </h4>
            <p style={{ fontSize: '14px', color: '#F1F5F9', lineHeight: 1.65 }}>
              {activeArticle.summary}
            </p>
          </div>
        </div>

        {/* Key Astrological Principles & Executive Notes */}
        {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(20, 18, 33, 0.9) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '17px',
                fontWeight: 800,
                color: '#FACC15',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Award size={18} />
              <span>Key Astrological Principles & Executive Notes</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {activeArticle.keyTakeaways.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <CheckCircle2 size={16} color="#34D399" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Notes & Chapters Body (Structured with proper gaps and headlines) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <BookOpen size={20} />
            <span>Deep-Dive Study Notes & Chapter Breakdown</span>
          </h2>

          {activeArticle.content.map((para, idx) => {
            const lines = para.split('\n');
            const headline = lines[0];
            const bodyLines = lines.slice(1).join('\n');

            return (
              <Card
                key={idx}
                style={{
                  padding: '24px 28px',
                  background: 'linear-gradient(180deg, rgba(20, 18, 33, 0.95) 0%, rgba(12, 11, 20, 0.98) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.22)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                {headline && (
                  <h3
                    style={{
                      fontFamily: 'var(--font-display), serif',
                      fontSize: '17px',
                      fontWeight: 800,
                      color: '#F5D061',
                      marginBottom: '14px',
                      borderLeft: '3px solid var(--theme-orange-primary)',
                      paddingLeft: '10px',
                    }}
                  >
                    {headline}
                  </h3>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {(bodyLines || para)
                    .split('\n\n')
                    .map((block, bIdx) => (
                      <p
                        key={bIdx}
                        style={{
                          fontSize: '14px',
                          color: '#CBD5E1',
                          lineHeight: '1.8',
                          margin: 0,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {block}
                      </p>
                    ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Real-World Case Study / Practical Application */}
        <Card
          style={{
            padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: '16px',
              fontWeight: 800,
              color: '#38BDF8',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Compass size={18} />
            <span>Practical Chart Application & Reading Strategy</span>
          </h3>
          <p style={{ fontSize: '13.5px', color: '#E2E8F0', lineHeight: 1.7 }}>
            When analyzing your natal chart or consulting an astrologer, always synthesize this placement alongside your active <strong>Vimshottari Dasha</strong> and current <strong>Saturn / Jupiter transits</strong>. Classical Jyotish emphasizes that no single planetary configuration functions in isolation—it operates within the dynamic holographic web of your entire birth chart.
          </p>
        </Card>

        {/* FAQs Section */}
        {activeArticle.faqs && activeArticle.faqs.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '18px',
                fontWeight: 800,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <HelpCircle size={18} color="var(--gold-primary)" />
              <span>Frequently Asked Questions & Clarifications</span>
            </h3>

            {activeArticle.faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                  Q: {faq.question}
                </div>
                <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6 }}>
                  A: {faq.answer}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Executive Outro & Spiritual Conclusion */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 106, 0, 0.18) 0%, rgba(245, 208, 97, 0.12) 100%)',
            border: '1.5px solid rgba(245, 208, 97, 0.35)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
              🎯 Executive Outro: Integrating Cosmic Wisdom
            </h4>
            <p style={{ fontSize: '13px', color: '#E2E8F0', maxWidth: '620px', lineHeight: 1.55 }}>
              True astrological wisdom does not breed fatalistic passivity; it awakens conscious agency and calm discernment. Deepen your understanding by consulting an AstroNex specialist on your chart.
            </p>
          </div>

          <Button
            variant="gold"
            size="md"
            onClick={() => startSpecialistSession('classic')}
            icon={<Sparkles size={15} />}
          >
            Discuss with Astrologer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '90px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(139, 47, 85, 0.25) 0%, rgba(20, 20, 24, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Badge variant="gold" size="sm">
                Astrology Academy & Glossary
              </Badge>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Vedic • Western • KP • Numerology
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Learn Astrology
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Structured, classical educational guides and comprehensive dictionary of astrological terms.
            </p>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: 'var(--radius-full)' }}>
            <button
              onClick={() => setActiveTab('articles')}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: activeTab === 'articles' ? 'var(--accent-wine)' : 'transparent',
                color: activeTab === 'articles' ? '#FFFFFF' : 'var(--text-muted)',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Guides & Articles
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: activeTab === 'glossary' ? 'var(--accent-wine)' : 'transparent',
                color: activeTab === 'glossary' ? '#FFFFFF' : 'var(--text-muted)',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Glossary (A-Z)
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            placeholder={
              activeTab === 'articles'
                ? 'Search articles (e.g. Navagrahas, Houses, Dasha, Synastry)...'
                : 'Search glossary terms (e.g. Ayanamsa, Darakaraka, Sade Sati)...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '13px',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Tab 1: Articles */}
      {activeTab === 'articles' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Branch Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['All', 'Vedic', 'Western', 'KP', 'Numerology'].map((branch) => (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: selectedBranch === branch ? 'var(--accent-wine)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedBranch === branch ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: selectedBranch === branch ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {branch}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                variant="elevated"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveArticle(article)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <Badge size="sm" variant={article.branch === 'Vedic' ? 'gold' : 'wine'}>
                      {article.branch}
                    </Badge>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '14px' }}>
                    {article.summary}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '11.5px', color: 'var(--gold-primary)', fontWeight: 600 }}>
                    {article.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--accent-rose-light)', fontWeight: 600 }}>
                    <span>Read Guide</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Tab 2: Glossary (A-Z) */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {filteredGlossary.map((item, idx) => (
            <Card key={idx} style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gold-primary)' }}>
                  {item.term}
                </span>
                <Badge size="sm" variant="outline">
                  {item.category}
                </Badge>
              </div>

              {item.sanskritName && (
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Sanskrit: <em>{item.sanskritName}</em>
                </div>
              )}

              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                {item.definition}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
