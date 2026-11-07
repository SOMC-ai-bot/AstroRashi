'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SplashScreen } from '@/components/splash/SplashScreen';
import { AppShell } from '@/components/layout/AppShell';

export default function Home() {
  const [view, setView] = useState<'splash' | 'app'>('splash');

  useEffect(() => {
    try {
      // Check if user already completed splash in this session
      const alreadyEntered = sessionStorage.getItem('astrorashi_session_active');
      if (alreadyEntered === 'true') {
        setView('app');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleEnterApp = useCallback(() => {
    try {
      localStorage.setItem('astronex_onboarded_v1', 'true');
      sessionStorage.setItem('astrorashi_session_active', 'true');
    } catch (e) {
      console.error(e);
    }
    setView('app');
  }, []);

  if (view === 'splash') {
    return <SplashScreen onComplete={handleEnterApp} />;
  }

  return <AppShell />;
}

