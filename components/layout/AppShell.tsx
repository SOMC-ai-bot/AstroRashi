'use client';

import React, { useState } from 'react';
import { BottomNav, NavTab } from './BottomNav';
import { TopBar } from './TopBar';
import { DiscoverScreen } from '@/components/discover/DiscoverScreen';
import { ChartsScreen } from '@/components/charts/ChartsScreen';
import { ToolsHub } from '@/components/tools/ToolsHub';
import { ReportsHub } from '@/components/reports/ReportsHub';
import { LearnHub } from '@/components/learn/LearnHub';
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
import { useChat } from '@/lib/state/chat-context';
import { useSubscription } from '@/lib/state/subscription-context';

export const AppShell: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('discover');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isManageSubOpen, setIsManageSubOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { askAboutPlacement } = useChat();
  const {
    isUpgradeModalOpen,
    requiredFeatureName,
    closeUpgradeModal,
  } = useSubscription();

  const handleAskAI = (prompt: string) => {
    setActiveTab('ai');
    askAboutPlacement(prompt);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }} className="cosmic-bg">
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
        {/* Horizontal Navigation Top Bar Header with Dropdown Menus */}
        <TopBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenPremium={() => setIsPricingOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* Main Application Content Area */}
        <main
          style={{
            flex: 1,
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '24px 20px 0',
          }}
        >
            {activeTab === 'discover' && (
              <DiscoverScreen
                onTabChange={setActiveTab}
                onAskAI={handleAskAI}
                onOpenPremium={() => setIsPricingOpen(true)}
              />
            )}

            {activeTab === 'charts' && (
              <ChartsScreen
                onAskAI={handleAskAI}
                onOpenProfile={() => setActiveTab('profile')}
              />
            )}

            {activeTab === 'tools' && <ToolsHub onAskAI={handleAskAI} onNavigateTab={(tab) => setActiveTab(tab as NavTab)} />}

            {activeTab === 'reports' && <ReportsHub />}

            {activeTab === 'learn' && <LearnHub />}

            {activeTab === 'ai' && <AIAssistantScreen />}

            {activeTab === 'consultants' && <ConsultantScreen />}

            {activeTab === 'subscription' && <SubscriptionScreen onOpenPricing={() => setIsPricingOpen(true)} />}

            {activeTab === 'profile' && (
              <ProfileScreen
                onOpenPremium={() => setIsPricingOpen(true)}
                onOpenManageSubscription={() => setIsManageSubOpen(true)}
              />
            )}
          </main>

          {/* Mobile Bottom Navigation (visible on mobile/tablet, hidden on desktop) */}
          <div className="mobile-bottomnav-wrapper">
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>

      <style>{`
        .desktop-sidebar-wrapper {
          display: none;
        }
        .mobile-bottomnav-wrapper {
          display: block;
        }

        @media (min-width: 1024px) {
          .desktop-sidebar-wrapper {
            display: none;
          }
          .mobile-bottomnav-wrapper {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
