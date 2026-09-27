'use client';

import React, { useState } from 'react';
import { useChat } from '@/lib/state/chat-context';
import { Plus, MessageSquare, Trash2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ChatHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatHistoryDrawer: React.FC<ChatHistoryDrawerProps> = ({ isOpen, onClose }) => {
  const {
    conversations,
    activeConversation,
    selectConversation,
    createNewConversation,
    deleteConversation,
  } = useChat();

  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 10, 12, 0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '320px',
          maxWidth: '85%',
          height: '100%',
          backgroundColor: '#1B1B1E',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          boxShadow: '10px 0 40px rgba(0, 0, 0, 0.5)',
          animation: 'slideInLeft 220ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Conversation History
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <Button
          variant="primary"
          size="md"
          icon={<Plus size={16} />}
          onClick={() => {
            createNewConversation();
            onClose();
          }}
          style={{ width: '100%', marginBottom: '16px' }}
        >
          New Conversation
        </Button>

        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '16px',
          }}
        >
          <Search size={14} color="var(--text-muted)" />
          <input
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        {/* Conversation List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filtered.map((conv) => {
            const isActive = conv.id === activeConversation.id;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  selectConversation(conv.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(194, 78, 120, 0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(194, 78, 120, 0.35)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 160ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <MessageSquare
                    size={15}
                    color={isActive ? 'var(--accent-rose-light)' : 'var(--text-muted)'}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {conv.title}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title="Delete chat"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
