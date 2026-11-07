'use client';

import React, { useEffect, useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string;
  allowMaximize?: boolean;
  defaultMaximized?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '560px',
  size,
  allowMaximize = true,
  defaultMaximized = false,
}) => {
  const [isMaximized, setIsMaximized] = useState(defaultMaximized);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsMaximized(defaultMaximized);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultMaximized]);

  if (!isOpen) return null;

  const effectiveMaxWidth =
    size === 'sm'
      ? '520px'
      : size === 'md'
      ? '680px'
      : size === 'lg'
      ? '920px'
      : size === 'xl'
      ? '1380px'
      : size === 'full'
      ? '96vw'
      : maxWidth;

  const isWideModal = size === 'xl' || size === 'full';

  return (
    <div
      className={`astronex-modal-overlay ${isMaximized ? 'overlay-maximized' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: isMaximized ? 'stretch' : 'center',
        justifyContent: 'center',
        padding: isMaximized ? '0' : '16px',
        backgroundColor: 'rgba(8, 8, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'modalFadeIn 180ms ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`astronex-modal-container ${isMaximized ? 'maximized' : ''} ${isWideModal ? 'wide-modal' : ''}`}
        style={{
          position: 'relative',
          width: isWideModal ? '94vw' : '100%',
          maxWidth: isMaximized ? '100vw' : effectiveMaxWidth,
          height: isMaximized ? '100vh' : isWideModal ? '88vh' : 'auto',
          maxHeight: isMaximized ? '100vh' : '92vh',
          backgroundColor: 'var(--bg-surface, #141418)',
          border: isMaximized ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: isMaximized ? '0' : 'var(--radius-xl, 20px)',
          boxShadow: isMaximized
            ? 'none'
            : '0 24px 64px rgba(0, 0, 0, 0.75), 0 0 32px rgba(249, 115, 22, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {title && (
          <div
            className="astronex-modal-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 22px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              gap: '12px',
            }}
          >
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--text-primary, #FFFFFF)',
                letterSpacing: '0.01em',
                margin: 0,
                flex: 1,
              }}
            >
              {title}
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {allowMaximize && (
                <button
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? 'Restore dimension' : 'Maximize to full screen'}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#CBD5E1',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    transition: 'all 140ms ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                title="Close"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#CBD5E1',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  transition: 'all 140ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div
          className="astronex-modal-content"
          style={{
            padding: '22px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </div>

      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (max-width: 640px) {
          .astronex-modal-overlay {
            padding: 0 !important;
            align-items: flex-end !important;
          }
          .astronex-modal-container {
            width: 100% !important;
            max-width: 100vw !important;
            height: 94vh !important;
            max-height: 94vh !important;
            border-radius: 20px 20px 0 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
          }
          .astronex-modal-container.maximized {
            height: 100vh !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
          }
          .astronex-modal-header {
            padding: 14px 16px !important;
          }
          .astronex-modal-content {
            padding: 16px 14px !important;
          }
        }
      `}</style>
    </div>
  );
};
