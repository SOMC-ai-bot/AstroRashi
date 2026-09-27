'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { NotificationItem } from '@/types';
import { SAMPLE_NOTIFICATIONS } from '@/lib/mock/seed-data';
import { Bell, CheckCheck, Sparkles, Calendar, MessageSquare } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(SAMPLE_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'insight':
        return <Sparkles size={16} color="var(--gold-primary)" />;
      case 'specialist':
        return <Calendar size={16} color="var(--accent-rose-light)" />;
      case 'community':
        return <MessageSquare size={16} color="var(--accent-rose)" />;
      default:
        return <Bell size={16} color="var(--text-muted)" />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cosmic Notifications" maxWidth="480px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={markAllRead}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: 'var(--accent-rose-light)',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <CheckCheck size={14} />
            <span>Mark all as read</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: n.isRead ? 'rgba(255, 255, 255, 0.03)' : 'rgba(194, 78, 120, 0.1)',
                border: n.isRead ? '1px solid var(--border-subtle)' : '1px solid rgba(194, 78, 120, 0.3)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {getIcon(n.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {n.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.timestamp}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {n.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
