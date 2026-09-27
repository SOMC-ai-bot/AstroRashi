import { AIConversation, AIMessage, LanguageCode } from '@/types';

const CONVERSATIONS_STORAGE_KEY = 'astronex_ai_conversations_v1';
const ACTIVE_CONV_ID_KEY = 'astronex_active_conv_id';

export function createInitialConversation(lang: LanguageCode = 'en'): AIConversation {
  return {
    id: 'conv_' + Date.now(),
    userId: 'usr_astronex_demo',
    title: lang === 'hi' ? 'नई बातचीत' : lang === 'hinglish' ? 'New Chat' : 'Cosmic Inquiries',
    language: lang,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPinned: false,
    mode: 'auto',
    messages: [
      {
        id: 'msg_welcome',
        role: 'assistant',
        content:
          lang === 'hi'
            ? 'नमस्ते! मैं एस्ट्रोनेक्स हूँ—आपका व्यक्तिगत एआई सहायक। आप मुझसे अपनी कुंडली, करियर, ग्रहों के गोचर के बारे में पूछ सकते हैं, या कोडिंग, व्यवसाय और सामान्य जीवन से जुड़े किसी भी प्रश्न पर चर्चा कर सकते हैं।'
            : lang === 'hinglish'
            ? 'Namaste! Main AstroNex hoon—aapka personal AI companion. Aap mujhse apni kundli, career, planetary transits ke baare me pooch sakte hain, ya coding, business aur daily life se judi koi bhi baat discuss kar sakte hain.'
            : "Welcome to AstroNex. I am your cosmic intelligence companion and personal AI assistant. You can ask me deep questions about your natal chart, planetary transits, and life timing—or ask me completely everyday questions about technology, coding, writing, business, and philosophy.",
        timestamp: new Date().toISOString(),
        intent: 'GENERAL_CHAT',
        astrologyContextUsed: false,
      },
    ],
  };
}

export function loadSavedConversations(): AIConversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load conversations from storage', e);
    return [];
  }
}

export function saveConversations(conversations: AIConversation[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
  } catch (e) {
    console.error('Failed to save conversations', e);
  }
}

export function getActiveConversationId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_CONV_ID_KEY);
}

export function setActiveConversationId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_CONV_ID_KEY, id);
}
