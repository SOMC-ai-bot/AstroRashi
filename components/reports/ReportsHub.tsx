'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ReportType, AstrologyReport } from '@/types';
import { useAstrology } from '@/lib/state/astrology-context';
import { useSubscription } from '@/lib/state/subscription-context';
import { useAuth } from '@/lib/state/auth-context';
import { generateAstrologyReport } from '@/lib/astrology-engine/reports-engine';
import { ReportViewer } from './ReportViewer';
import {
  FileText,
  ChevronDown,
  Sparkles,
  Heart,
  Briefcase,
  ShieldAlert,
  Clock,
  Gem,
  Calendar,
  Layers,
  Grid,
  Lock,
  ArrowRight,
  Download,
  Printer,
  Trash2,
  FolderHeart,
  CheckCircle2,
} from 'lucide-react';

export interface ReportCardDef {
  type: ReportType;
  title: string;
  description: string;
  chaptersCount: number;
  icon: React.ReactNode;
  category: 'core' | 'timing' | 'remedy' | 'partner';
  isFree: boolean;
}

export const REPORT_CATALOGUE: ReportCardDef[] = [
  {
    type: 'life-insights',
    title: 'Life Insights & Cosmic Blueprint',
    description: 'Comprehensive synthesis of Lagna, Moon sign, planetary yogas, life purpose, and primal triad.',
    chaptersCount: 5,
    icon: <Sparkles size={22} color="var(--gold-primary)" />,
    category: 'core',
    isFree: true,
  },
  {
    type: 'love-marriage',
    title: 'Love, Marriage & Relational Destiny',
    description: 'In-depth analysis of 7th house, Venus, Navamsa D9, spouse archetypes, and marital timing.',
    chaptersCount: 4,
    icon: <Heart size={22} color="var(--gold-primary)" />,
    category: 'partner',
    isFree: false,
  },
  {
    type: 'career-wealth',
    title: 'Career, Dharma & Financial Abundance',
    description: '10th house vocational analysis, 2nd & 11th Dhana Bhavas, business vs job enterprise potential.',
    chaptersCount: 4,
    icon: <Briefcase size={22} color="var(--accent-rose-light)" />,
    category: 'core',
    isFree: false,
  },
  {
    type: 'dosha-analysis',
    title: 'Complete Dosha & Remedial Audit',
    description: 'Mangal Dosha verification, Kaal Sarp variations, Sade Sati phase timing, and Pitra Dosha audit.',
    chaptersCount: 4,
    icon: <ShieldAlert size={22} color="var(--accent-rose-light)" />,
    category: 'remedy',
    isFree: false,
  },
  {
    type: 'dasha-timeline',
    title: '120-Year Vimshottari Dasha Timeline',
    description: 'Sequential analysis of all 9 Mahadashas and active Antardashas mapped across your life journey.',
    chaptersCount: 4,
    icon: <Clock size={22} color="var(--gold-primary)" />,
    category: 'timing',
    isFree: false,
  },
  {
    type: 'remedies-gemstones',
    title: 'Gemstones, Rudraksha & Sacred Mantras',
    description: 'Certified astrological prescriptions with safe wearing rules, weight, metal, and energized mantras.',
    chaptersCount: 3,
    icon: <Gem size={22} color="var(--gold-primary)" />,
    category: 'remedy',
    isFree: false,
  },
  {
    type: 'varshaphala',
    title: 'Varshaphala (Annual Solar Return)',
    description: 'Tajika annual chart evaluation, Muntha analysis, and planetary Lord of the Year forecast.',
    chaptersCount: 3,
    icon: <Calendar size={22} color="var(--accent-rose-light)" />,
    category: 'timing',
    isFree: true,
  },
  {
    type: 'transit-forecast',
    title: 'Planetary Transits (Gochar) Forecast',
    description: 'Major shifts of Saturn, Jupiter, Rahu, and Ketu evaluated against your natal Moon and Ascendant.',
    chaptersCount: 3,
    icon: <Layers size={22} color="var(--gold-primary)" />,
    category: 'timing',
    isFree: false,
  },
  {
    type: 'compatibility',
    title: 'Ashtakoot 36-Point Compatibility Report',
    description: 'Complete 8-koota matrimonial synergy breakdown with Nadi, Bhakoot, and Gana Dosha checks.',
    chaptersCount: 3,
    icon: <Heart size={22} color="var(--accent-rose-light)" />,
    category: 'partner',
    isFree: false,
  },
  {
    type: 'numerology-blueprint',
    title: 'Numerology Blueprint & Lo Shu Grid',
    description: 'Mulank, Bhagyank, Lo Shu 3x3 planes of expression, and name vibration harmony analysis.',
    chaptersCount: 3,
    icon: <Grid size={22} color="var(--gold-primary)" />,
    category: 'core',
    isFree: false,
  },
];

interface ReportsHubProps {
  onNavigateTab?: (tab: string) => void;
}

export const ReportsHub: React.FC<ReportsHubProps> = ({ onNavigateTab }) => {
  const { natalChart, activeProfile } = useAstrology();
  const { user } = useAuth();
  const { openUpgradeModal } = useSubscription();

  const [activeReport, setActiveReport] = useState<AstrologyReport | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [hubTab, setHubTab] = useState<'catalogue' | 'my-reports'>('catalogue');
  const [myReports, setMyReports] = useState<AstrologyReport[]>([]);

  // Load and hydrate stored reports
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('astronex_my_reports_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMyReports(parsed);
          return;
        }
      }
      // Seed default baseline reports
      const effectiveName = user?.name || activeProfile?.name || 'Cosmic Seeker';
      const defaultBlueprint = generateAstrologyReport(natalChart, 'life-insights', effectiveName);
      const defaultTransit = generateAstrologyReport(natalChart, 'varshaphala', effectiveName);
      const initialList = [defaultBlueprint, defaultTransit];
      setMyReports(initialList);
      localStorage.setItem('astronex_my_reports_v1', JSON.stringify(initialList));
    } catch (e) {
      console.warn('Could not read saved reports:', e);
    }
  }, [natalChart, activeProfile?.name, user?.name]);

  const saveReportToStorage = (report: AstrologyReport) => {
    try {
      const updated = [report, ...myReports.filter((r) => r.id !== report.id)];
      setMyReports(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('astronex_my_reports_v1', JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Failed to save report:', e);
    }
  };

  const handleDeleteReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = myReports.filter((r) => r.id !== id);
    setMyReports(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('astronex_my_reports_v1', JSON.stringify(updated));
    }
  };

  const handleGenerate = (def: ReportCardDef) => {
    if (!def.isFree && !user.isPremium) {
      openUpgradeModal(`${def.title} (PDF Report)`);
      return;
    }

    const effectiveName = user?.name || activeProfile?.name || 'Cosmic Seeker';
    const report = generateAstrologyReport(natalChart, def.type, effectiveName);
    saveReportToStorage(report);
    setActiveReport(report);
  };

  const handleDownloadPdf = (report: AstrologyReport, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveReport(report);
    setTimeout(() => {
      window.print();
    }, 350);
  };

  if (activeReport) {
    return <ReportViewer report={activeReport} onBack={() => setActiveReport(null)} />;
  }

  const filteredReports = REPORT_CATALOGUE.filter((r) => {
    if (selectedFilter === 'all') return true;
    return r.category === selectedFilter;
  });

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
                Evidence-Based Astrological Dossiers
              </Badge>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Active Chart: <strong style={{ color: 'var(--text-primary)' }}>{user?.name || activeProfile?.name}</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Astrological Reports & Deep Insights
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Multi-chapter, citation-grounded dossiers synthesized deterministically from classical Sanskrit texts and ephemeris calculations.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!user.isPremium && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => openUpgradeModal('Full Astrological Report Bundle')}
                icon={<Sparkles size={14} color="var(--gold-primary)" />}
              >
                Unlock All Reports (Premium ₹59)
              </Button>
            )}
          </div>
        </div>

        {/* Top Hub Navigation: Catalogue vs MY REPORTS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginTop: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Select View Mode:
            </span>
            <div style={{ position: 'relative' }}>
              <select
                value={hubTab}
                onChange={(e) => setHubTab(e.target.value as 'catalogue' | 'my-reports')}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  backgroundColor: '#161922',
                  color: hubTab === 'catalogue' ? '#FED7AA' : '#FEF08A',
                  border: '1.5px solid ' + (hubTab === 'catalogue' ? '#F97316' : '#FACC15'),
                  borderRadius: '14px',
                  padding: '9px 38px 9px 16px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <option value="catalogue" style={{ backgroundColor: '#111319', color: '#FFFFFF' }}>
                  📄 Report Catalogue (10 In-Depth Reports)
                </option>
                <option value="my-reports" style={{ backgroundColor: '#111319', color: '#FFFFFF' }}>
                  📁 MY REPORTS ({myReports.length} Saved Dossiers)
                </option>
              </select>
              <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8' }}>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
              Active Mode: <strong style={{ color: hubTab === 'catalogue' ? '#F97316' : '#FACC15' }}>{hubTab === 'catalogue' ? 'Catalogue Browsing' : 'My Vault'}</strong>
            </span>
          </div>
        </div>

        {/* Filter Pills (for Catalogue) */}
        {hubTab === 'catalogue' && (
          <div style={{ display: 'flex', gap: '6px', marginTop: '16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {[
              { id: 'all', label: 'All 10 Reports' },
              { id: 'core', label: 'Core Blueprints' },
              { id: 'partner', label: 'Love & Marriage' },
              { id: 'timing', label: 'Timelines & Transits' },
              { id: 'remedy', label: 'Doshas & Remedies' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: selectedFilter === cat.id ? 'var(--accent-wine)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedFilter === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: selectedFilter === cat.id ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      
      {/* Free Plan Upgrade Gate Banner for Reports */}
      {!user.isPremium && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1.5px solid #F59E0B',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              maxWidth: '680px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Lock size={22} color="#F59E0B" />
            <div style={{ textAlign: 'left', flex: 1 }}>
              <strong style={{ color: '#FDE68A', fontSize: '14px', display: 'block' }}>
                Full Astrological Dossiers are a Premium Feature
              </strong>
              <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                15 Minutes consultation session limit ONLY AFTER THAT NO ACCESS. Upgrade to Premium to generate &amp; download all 10 certified PDF reports.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onNavigateTab) {
                  onNavigateTab('subscription');
                } else {
                  openUpgradeModal('Certified Reports & Dossiers');
                }
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                backgroundColor: '#F59E0B',
                color: '#000000',
                fontWeight: 800,
                fontSize: '12.5px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* MY REPORTS SECTION */}
      {hubTab === 'my-reports' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Free User Upgrade Banner for My Reports */}
          {!user.isPremium && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                border: '1.5px solid #F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                <Lock size={22} color="#F59E0B" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#FDE68A', fontSize: '14px', display: 'block' }}>
                    15 Minutes consultation session limit ONLY AFTER THAT NO ACCESS
                  </strong>
                  <span style={{ fontSize: '12px', color: '#CBD5E1' }}>
                    Stored dossiers &amp; printable PDF booklets are locked for free users. Upgrade to Premium for unrestricted full report downloads.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateTab) {
                    onNavigateTab('subscription');
                  } else {
                    openUpgradeModal('Unlock Stored Astrological Dossiers');
                  }
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#F59E0B',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '12.5px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Upgrade Now
              </button>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
                Your Stored Astrological Dossiers
              </h3>
              <p style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '2px' }}>
                Access generated natal reports, view comprehensive chapters, or export instantly as printable PDF booklets.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHubTab('catalogue')}
              icon={<Sparkles size={14} color="#F97316" />}
            >
              Generate New Report
            </Button>
          </div>

          {myReports.length === 0 ? (
            <Card style={{ padding: '40px', textAlign: 'center', background: 'rgba(20, 20, 26, 0.6)' }}>
              <FolderHeart size={44} color="#FACC15" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                No Reports Saved Yet
              </h4>
              <p style={{ fontSize: '13px', color: '#94A3B8', maxWidth: '420px', margin: '0 auto 18px' }}>
                Choose any in-depth report from the catalogue above to synthesize and save your comprehensive astrological analysis.
              </p>
              <Button variant="primary" onClick={() => setHubTab('catalogue')}>
                Explore Report Catalogue
              </Button>
            </Card>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '16px' }}>
              {myReports.map((report) => (
                <Card
                  key={report.id}
                  variant="elevated"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1.5px solid rgba(250, 204, 21, 0.25)',
                    background: 'linear-gradient(180deg, rgba(28, 25, 23, 0.95) 0%, rgba(18, 18, 22, 0.95) 100%)',
                    borderRadius: '16px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(250, 204, 21, 0.12)',
                          border: '1px solid rgba(250, 204, 21, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FileText size={20} color="#FACC15" />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Badge size="sm" variant="gold">
                          PDF Ready
                        </Badge>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteReport(report.id, e)}
                          title="Delete Report"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                      {report.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.45', marginBottom: '12px' }}>
                      {(report.disclaimer || report.chapters?.[0]?.content || "Comprehensive Vedic & Western astrological life breakdown").slice(0, 110)}...
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#CBD5E1', marginBottom: '16px' }}>
                      <span style={{ color: '#FACC15', fontWeight: 650 }}>{report.profileName || user?.name || activeProfile?.name}</span>
                      <span>•</span>
                      <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{(report.chapters || []).length} Chapters</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <Button
                      variant={!user.isPremium ? "outline" : "primary"}
                      size="sm"
                      onClick={() => {
                        if (!user.isPremium) {
                          if (onNavigateTab) {
                            onNavigateTab('subscription');
                          } else {
                            openUpgradeModal(report.title + ' (View Report)');
                          }
                          return;
                        }
                        setActiveReport(report);
                      }}
                      icon={!user.isPremium ? <Lock size={13} color="#F59E0B" /> : <FileText size={13} />}
                    >
                      <span>{!user.isPremium ? 'Locked (View)' : 'View Report'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        if (!user.isPremium) {
                          if (onNavigateTab) {
                            onNavigateTab('subscription');
                          } else {
                            openUpgradeModal(report.title + ' (PDF Download)');
                          }
                          return;
                        }
                        handleDownloadPdf(report, e);
                      }}
                      icon={!user.isPremium ? <Lock size={13} color="#F59E0B" /> : <Download size={13} color="#FACC15" />}
                    >
                      <span>{!user.isPremium ? 'Locked (PDF)' : 'Download PDF'}</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* CATALOGUE GRID */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '16px' }}>
          {filteredReports.map((item) => {
            const isAccessible = item.isFree || user.isPremium;

            return (
              <Card
                key={item.type}
                variant="elevated"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isAccessible
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px dashed rgba(216, 197, 138, 0.3)',
                  background: 'linear-gradient(180deg, rgba(27, 27, 30, 0.95) 0%, rgba(20, 20, 24, 0.95) 100%)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </div>

                    <Badge size="sm" variant={item.isFree ? 'gold' : isAccessible ? 'wine' : 'outline'}>
                      {item.isFree ? 'Free Report' : isAccessible ? 'Unlocked' : 'Pro Report'}
                    </Badge>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '14px' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--gold-primary)', marginBottom: '16px' }}>
                    <FileText size={13} />
                    <span>{item.chaptersCount} In-Depth Structured Chapters</span>
                  </div>
                </div>

                <Button
                  variant={isAccessible ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => handleGenerate(item)}
                  icon={isAccessible ? <FileText size={14} /> : <Lock size={14} color="var(--gold-primary)" />}
                >
                  {isAccessible ? 'Generate & View Report' : 'Unlock with Premium (₹59)'}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
