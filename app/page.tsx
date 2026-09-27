'use client';

import React, { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/splash/SplashScreen';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { AppShell } from '@/components/layout/AppShell';

export default function Home() {
  const [view, setView] = useState<'splash' | 'onboarding' | 'app'>('splash');

  useEffect(() => {
    try {
      const hasOnboarded = localStorage.getItem('astronex_onboarded_v1');
      // If already visited, we show a brief splash then go straight to app
      // If first visit, splash transitions to onboarding
      if (hasOnboarded === 'true') {
        // Will be routed by splash onComplete
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSplashComplete = () => {
    try {
      const hasOnboarded = localStorage.getItem('astronex_onboarded_v1');
      if (hasOnboarded === 'true') {
        setView('app');
      } else {
        setView('onboarding');
      }
    } catch (e) {
      setView('app');
    }
  };

  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem('astronex_onboarded_v1', 'true');
    } catch (e) {
      console.error(e);
    }
    setView('app');
  };

  if (view === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (view === 'onboarding') {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  return <AppShell />;
}
