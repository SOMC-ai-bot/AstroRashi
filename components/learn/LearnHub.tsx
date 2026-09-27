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
} from 'lucide-react';

export const LearnHub: React.FC = () => {
  const { startSpecialistSession } = useConsultant();

  const [activeTab, setActiveTab] = useState<'articles' | 'glossary'>('articles');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<LearningArticle | null>(null);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '90px' }}>
      {/* Article Reading Modal / Detail View */}
      {activeArticle && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 10, 12, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              backgroundColor: '#1B1B1E',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '18px 22px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Badge variant="gold" size="sm">
                    {activeArticle.branch}
                  </Badge>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {activeArticle.category} • {activeArticle.readingTime}
                  </span>
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {activeArticle.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div style={{ padding: '22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--gold-primary)', fontWeight: 500, lineHeight: '1.5' }}>
                {activeArticle.summary}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeArticle.content.map((p, idx) => (
                  <p key={idx} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              {activeArticle.keyTakeaways && (
                <div style={{ backgroundColor: 'rgba(216, 197, 138, 0.06)', border: '1px solid rgba(216, 197, 138, 0.2)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold-primary)', marginBottom: '8px' }}>
                    Key Astrological Principles
                  </h4>
                  <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {activeArticle.keyTakeaways.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              {activeArticle.faqs && activeArticle.faqs.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Frequently Asked Questions
                  </h4>
                  {activeArticle.faqs.map((faq, idx) => (
                    <div key={idx} style={{ marginBottom: '10px', padding: '10px 12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Q: {faq.question}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        A: {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'rgba(20, 20, 24, 0.95)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveArticle(null);
                  startSpecialistSession('classic');
                }}
                icon={<Sparkles size={13} color="var(--gold-primary)" />}
              >
                Ask Specialist about this topic
              </Button>

              <Button variant="primary" size="sm" onClick={() => setActiveArticle(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

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
