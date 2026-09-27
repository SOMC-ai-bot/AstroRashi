'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getCalculationHistory, clearCalculationHistory } from '@/lib/astrology-engine/history-engine';
import { CalculationHistoryItem } from '@/types';
import {
  X,
  History,
  Trash2,
  ExternalLink,
  Calculator,
  Calendar,
} from 'lucide-react';

interface SavedCalculationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTool?: (toolId: string) => void;
}

export const SavedCalculationsModal: React.FC<SavedCalculationsModalProps> = ({
  isOpen,
  onClose,
  onOpenTool,
}) => {
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getCalculationHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    clearCalculationHistory();
    setHistory([]);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 10, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '85vh',
          backgroundColor: '#1B1B1E',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(216, 197, 138, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <History size={18} color="var(--gold-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Calculation History
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Deterministic calculations and tool audits performed on your device.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content List */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Calculator size={36} color="var(--text-muted)" style={{ margin: '0 auto 10px auto' }} />
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                No Calculations Recorded Yet
              </p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                When you run calculators in Tools Hub or Panchang, your findings are safely stored here offline.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Total saved records: {history.length}
                </span>
                <button
                  onClick={handleClear}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-rose-light)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={12} />
                  <span>Clear All</span>
                </button>
              </div>

              {history.map((item) => (
                <Card key={item.id} style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.title || item.toolName}
                    </span>
                    <Badge size="sm" variant="gold">
                      {item.toolName}
                    </Badge>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {item.summary || item.resultSummary}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>Chart: {item.profileName}</span>
                    <span>{new Date(item.timestamp || item.calculatedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
