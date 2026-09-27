'use client';

import React from 'react';
import { PricingModal } from '@/components/subscription/PricingModal';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  return <PricingModal isOpen={isOpen} onClose={onClose} />;
};

