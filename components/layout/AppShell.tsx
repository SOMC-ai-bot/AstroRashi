'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BottomNav, NavTab } from './BottomNav';
import { TopBar } from './TopBar';
import { DiscoverScreen } from '@/components/discover/DiscoverScreen';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { ChartsScreen } from '@/components/charts/ChartsScreen';
import { KundliMatchingScreen } from '@/components/matching/KundliMatchingScreen';
import { PanchangCalendarScreen } from '@/components/panchang/PanchangCalendarScreen';
import { ToolsHub } from '@/components/tools/ToolsHub';
import { ReportsHub } from '@/components/reports/ReportsHub';
import { AIAssistantScreen } from '@/components/ai/AIAssistantScreen';
import { ConsultantScreen } from '@/components/consultants/ConsultantScreen';
import { SubscriptionScreen } from '@/components/subscription/SubscriptionScreen';
import { ProfileScreen } from '@/components/profile/ProfileScreen';
import { PricingModal } from '@/components/subscription/PricingModal';
import { UpgradeSheet } from '@/components/subscription/UpgradeSheet';
import { ManageSubscriptionModal } from '@/components/subscription/ManageSubscriptionModal';
import { AIConsultantChatModal } from '@/components/consultants/AIConsultantChatModal';
import { NotificationsDrawer } from '@/components/profile/NotificationsDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/lib/state/auth-context';
import { useChat } from '@/lib/state/chat-context';
import { useSubscription } from '@/lib/state/subscription-context';

export const AppShell: React.FC = () => {
  const { isAuthenticated } = useAuth();
  // For non-logged-in participants, keep Home tab from main website.
  // Dashboard is only available when user is logged in or after registration.
  const [activeTab, setActiveTab] = useState<NavTab>(() => (isAuthenticated ? 'dashboard' : 'home'));
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isManageSubOpen, setIsManageSubOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Automatically transition to Dashboard on login, and back to Home on logout
  const prevAuthRef = useRef(isAuthenticated);
  useEffect(() => {
    if (!prevAuthRef.current && isAuthenticated) {
      setActiveTab('dashboard');
    } else if (prevAuthRef.current && !isAuthenticated) {
      setActiveTab('home');
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated]);

  // If unauthenticated user somehow lands on dashboard, redirect to home
  useEffect(() => {
    if (!isAuthenticated && activeTab === 'dashboard') {
      setActiveTab('home');
    }
  }, [isAuthenticated, activeTab]);

  const { askAboutPlacement } = useChat();
  const {
    isUpgradeModalOpen,
    requiredFeatureName,
    closeUpgradeModal,
  } = useSubscription();

  const handleTabChange = useCallback((tab: NavTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const handleAskAI = (prompt: string) => {
    handleTabChange('ai');
    askAboutPlacement(prompt);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0B10' }} className="cosmic-bg">
      {/* Background Starfield Canvas overlay */}
      <div className="stars-overlay" />

      {/* Global Subscription, Auth & Consultation Modals */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <UpgradeSheet
        isOpen={isUpgradeModalOpen}
        requiredFeature={requiredFeatureName}
        onClose={closeUpgradeModal}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <ManageSubscriptionModal
        isOpen={isManageSubOpen}
        onClose={() => setIsManageSubOpen(false)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <AIConsultantChatModal />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', position: 'relative' }}>
        {/* Top Horizontal Bar with Brand Logo and Animated Dropdowns (No vertical sidebar!) */}
        <TopBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenPremium={() => setIsPricingOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Main Application Area - Full Width */}
        <main
          className="app-main-content"
          style={{
            flex: 1,
            width: '100%',
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '24px 20px 40px',
            boxSizing: 'border-box',
            overflowX: 'hidden',
          }}
        >
          {/* 1. Home / Discover Screen (Visible to all, default for non-logged in) */}
          {(activeTab === 'home' || activeTab === 'discover') && (
            <DiscoverScreen
              onTabChange={handleTabChange}
              onAskAI={handleAskAI}
              onOpenPremium={() => setIsPricingOpen(true)}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {/* 2. User Dashboard (Visible ONLY when logged in) */}
          {activeTab === 'dashboard' && isAuthenticated && (
            <UserDashboard
              onNavigateTab={(tab) => handleTabChange(tab as NavTab)}
              onAskAI={handleAskAI}
              onOpenCoinsModal={() => setIsPricingOpen(true)}
              onAddProfile={() => handleTabChange('profile')}
            />
          )}

          {/* 3. Birth Chart & Kundli Matrix */}
          {activeTab === 'charts' && (
            <ChartsScreen
              onAskAI={handleAskAI}
              onOpenProfile={() => setActiveTab('profile')}
              onNavigateTab={(tab) => handleTabChange(tab as NavTab)}
            />
          )}

          {/* 4. Kundli Matching (Guna Milan) */}
          {activeTab === 'matching' && (
            <KundliMatchingScreen
              onAskAI={handleAskAI}
              onAddProfile={() => setActiveTab('profile')}
              onNavigateTab={(tab) => handleTabChange(tab as NavTab)}
            />
          )}

          {/* 5. Vedic Panchang Calendar */}
          {activeTab === 'panchang' && (
            <PanchangCalendarScreen
              onSelectDate={(d) => console.log('Selected date:', d)}
            />
          )}

          {/* 6. Tools & Calculators Hub (33+) */}
          {activeTab === 'tools' && (
            <ToolsHub
              onAskAI={handleAskAI}
              onNavigateTab={(tab) => setActiveTab(tab as NavTab)}
            />
          )}

          {/* 7. Certified Reports */}
          {activeTab === 'reports' && <ReportsHub onNavigateTab={(tab) => handleTabChange(tab as NavTab)} />}

          {/* 8. AI Astrologer Chat */}
          {activeTab === 'ai' && <AIAssistantScreen onNavigateTab={(tab) => handleTabChange(tab as NavTab)} />}

          {/* 9. Expert Astrologers (Direct 1-on-1 & AI Chat Discussion) */}
          {activeTab === 'consultants' && (
            <ConsultantScreen
              onTabChange={setActiveTab}
              onAskAI={handleAskAI}
            />
          )}

          {/* 10. Store & Subscription Plans */}
          {activeTab === 'subscription' && (
            <SubscriptionScreen onOpenPricing={() => setIsPricingOpen(true)} />
          )}

          {/* 11. Profile & Settings */}
          {activeTab === 'profile' && (
            <ProfileScreen
              onOpenPremium={() => setIsPricingOpen(true)}
              onOpenManageSubscription={() => setIsManageSubOpen(true)}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation (visible on mobile < 1024px) */}
        <div className="mobile-bottomnav-wrapper">
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>

      <style jsx global>{`
        .mobile-bottomnav-wrapper {
          display: none;
        }

        @media (max-width: 1023px) {
          .mobile-bottomnav-wrapper {
            display: block;
          }
          .app-main-content {
            padding: 16px 12px 85px !important;
          }
        }
      `}</style>
    </div>
  );
};
