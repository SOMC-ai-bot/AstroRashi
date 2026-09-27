'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AISpecialist, AIMessage, SpecialistSession } from '@/types';
import { AI_SPECIALISTS, getSpecialistById, canAccessSpecialist } from '../specialists/config';
import { useAuth } from './auth-context';
import { useAstrology } from './astrology-context';
import { useSubscription } from './subscription-context';
import { useI18n } from '../i18n/i18n-context';
import { defaultAIProvider } from '../ai/fallback';
import { executeAstrologyTool, AstrologyToolName } from '../astrology-engine/ai-tools';

interface SpecialistContextType {
  specialists: AISpecialist[];
  selectedSpecialist: AISpecialist | null;
  activeSession: SpecialistSession | null;
  sessionRemainingSeconds: number | null; // null if unlimited, otherwise number > 0
  isStreaming: boolean;
  consultationHistory: SpecialistSession[];
  startSpecialistSession: (specialistId: string) => boolean;
  switchSpecialist: (newSpecialistId: string, preserveContext?: boolean) => boolean;
  sendSpecialistMessage: (text: string) => Promise<void>;
  endSpecialistSession: () => void;
  openSpecialistModal: boolean;
  setOpenSpecialistModal: (open: boolean) => void;

  // Backward-compatible aliases for consultant UI
  consultants: AISpecialist[];
  selectedConsultant: AISpecialist | null;
  startConsultation: (id: string) => boolean;
  switchConsultant: (id: string) => boolean;
  sendConsultantMessage: (text: string) => Promise<void>;
  endConsultation: () => void;
  openConsultantModal: boolean;
  setOpenConsultantModal: (open: boolean) => void;
}

const SpecialistContext = createContext<SpecialistContextType | null>(null);

const STORAGE_SPECIALIST_SESSIONS_KEY = 'astronex_specialist_sessions_v1';

export function ConsultantProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { natalChart } = useAstrology();
  const { consultationDurationLimit, openUpgradeModal } = useSubscription();
  const { language } = useI18n();

  const [specialists] = useState<AISpecialist[]>(AI_SPECIALISTS);
  const [selectedSpecialist, setSelectedSpecialist] = useState<AISpecialist | null>(AI_SPECIALISTS[0]);
  const [activeSession, setActiveSession] = useState<SpecialistSession | null>(null);
  const [sessionRemainingSeconds, setSessionRemainingSeconds] = useState<number | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [openSpecialistModal, setOpenSpecialistModal] = useState(false);
  const [consultationHistory, setConsultationHistory] = useState<SpecialistSession[]>([]);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load past sessions from storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SPECIALIST_SESSIONS_KEY);
      if (saved) {
        setConsultationHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Countdown timer management for limited free sessions
  useEffect(() => {
    if (activeSession && activeSession.status === 'active' && sessionRemainingSeconds !== null) {
      timerIntervalRef.current = setInterval(() => {
        setSessionRemainingSeconds((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            handleSessionExpire();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [activeSession?.id, activeSession?.status]);

  const handleSessionExpire = () => {
    setActiveSession((prev) => (prev ? { ...prev, status: 'expired' } : null));
    setSessionRemainingSeconds(0);
  };

  const startSpecialistSession = (specialistId: string): boolean => {
    const specialist = getSpecialistById(specialistId);

    // Entitlement gate
    if (!canAccessSpecialist(user, specialistId)) {
      openUpgradeModal(`${specialist.name} (AI Specialist Mode)`);
      return false;
    }

    setSelectedSpecialist(specialist);

    const initialAIMessage: AIMessage = {
      id: `msg_welcome_${Date.now()}`,
      role: 'assistant',
      specialistId: specialist.id,
      content: `### ✦ ${specialist.name}
**${specialist.subtitle}**

Hello ${user.name}! I am analyzing your birth chart (${user.birthDate}, ${user.birthPlace}). How can I assist your ${specialist.name} inquiry today?

*Suggested questions:*
${specialist.suggestedPrompts.map((p) => `- "${p}"`).join('\n')}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newSession: SpecialistSession = {
      id: `sess_spec_${Date.now()}`,
      userId: user.id,
      specialistId: specialist.id,
      specialistName: specialist.name,
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      maxDurationSeconds: consultationDurationLimit || Infinity,
      status: 'active',
      messages: [initialAIMessage],
    };

    setActiveSession(newSession);
    setSessionRemainingSeconds(consultationDurationLimit);
    setOpenSpecialistModal(true);

    return true;
  };

  const switchSpecialist = (newSpecialistId: string, preserveContext = true): boolean => {
    const specialist = getSpecialistById(newSpecialistId);
    if (!canAccessSpecialist(user, newSpecialistId)) {
      openUpgradeModal(`${specialist.name} Mode`);
      return false;
    }

    setSelectedSpecialist(specialist);

    const switchNotice: AIMessage = {
      id: `msg_switch_${Date.now()}`,
      role: 'system',
      specialistId: specialist.id,
      content: `*Switched to **${specialist.name}** mode. Chart context and conversation history preserved.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        specialistId: specialist.id,
        specialistName: specialist.name,
        messages: preserveContext ? [...prev.messages, switchNotice] : [switchNotice],
      };
    });

    return true;
  };

  const sendSpecialistMessage = async (text: string) => {
    if (!text.trim() || !activeSession || isStreaming) return;

    const userMsg: AIMessage = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...activeSession.messages, userMsg];
    setActiveSession((prev) => (prev ? { ...prev, messages: updatedMessages } : null));
    setIsStreaming(true);

    try {
      const specialist = selectedSpecialist || AI_SPECIALISTS[0];

      // Execute relevant preferred tools for this specialist
      const toolResults: Record<string, any> = {};
      for (const tool of specialist.preferredTools.slice(0, 3) as AstrologyToolName[]) {
        try {
          toolResults[tool] = executeAstrologyTool(tool, natalChart);
        } catch (e) {
          console.error(`Tool execution error for ${tool}:`, e);
        }
      }

      // Generate response through shared intelligence engine
      const response = await defaultAIProvider.generateResponse({
        messages: updatedMessages,
        natalChart,
        userLanguage: language,
        useAstrologyContext: true,
        specialistId: specialist.id,
        specialistSystemPrompt: specialist.systemPrompt,
        toolResults,
      });

      const assistantMsg: AIMessage = {
        id: `msg_ast_${Date.now()}`,
        role: 'assistant',
        specialistId: specialist.id,
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: 'SPECIALIST_CHAT',
        astrologyContextUsed: true,
        astrologyContextData: {
          planet: response.contextPill?.planet || 'Sun',
          house: response.contextPill?.house || '10th House',
          theme: specialist.subtitle,
          findings: toolResults,
        },
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setActiveSession((prev) => {
        if (!prev) return null;
        const updated = { ...prev, messages: finalMessages };
        // Save to history
        try {
          const past = consultationHistory.filter((s) => s.id !== updated.id);
          const newHist = [updated, ...past].slice(0, 20);
          setConsultationHistory(newHist);
          localStorage.setItem(STORAGE_SPECIALIST_SESSIONS_KEY, JSON.stringify(newHist));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    } catch (error) {
      console.error('Error generating specialist response:', error);
    } finally {
      setIsStreaming(false);
    }
  };

  const endSpecialistSession = () => {
    if (activeSession) {
      const endedSession: SpecialistSession = {
        ...activeSession,
        endedAt: new Date().toISOString(),
        status: 'ended',
      };
      setActiveSession(null);
      setSessionRemainingSeconds(null);
      try {
        const past = consultationHistory.filter((s) => s.id !== endedSession.id);
        const newHist = [endedSession, ...past].slice(0, 20);
        setConsultationHistory(newHist);
        localStorage.setItem(STORAGE_SPECIALIST_SESSIONS_KEY, JSON.stringify(newHist));
      } catch (e) {
        console.error(e);
      }
    }
    setOpenSpecialistModal(false);
  };

  return (
    <SpecialistContext.Provider
      value={{
        specialists,
        selectedSpecialist,
        activeSession,
        sessionRemainingSeconds,
        isStreaming,
        consultationHistory,
        startSpecialistSession,
        switchSpecialist,
        sendSpecialistMessage,
        endSpecialistSession,
        openSpecialistModal,
        setOpenSpecialistModal,

        // Backward-compatible bindings
        consultants: specialists,
        selectedConsultant: selectedSpecialist,
        startConsultation: startSpecialistSession,
        switchConsultant: switchSpecialist,
        sendConsultantMessage: sendSpecialistMessage,
        endConsultation: endSpecialistSession,
        openConsultantModal: openSpecialistModal,
        setOpenConsultantModal: setOpenSpecialistModal,
      }}
    >
      {children}
    </SpecialistContext.Provider>
  );
}

export function useSpecialist() {
  const ctx = useContext(SpecialistContext);
  if (!ctx) {
    throw new Error('useSpecialist must be used within ConsultantProvider');
  }
  return ctx;
}

// Backward-compatible alias
export const useConsultant = useSpecialist;
