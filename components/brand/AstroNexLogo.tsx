'use client';

import React from 'react';
import { AstroRashiLogo } from './AstroRashiLogo';

export { AstroRashiLogo };

interface AstroNexLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AstroNexLogo: React.FC<AstroNexLogoProps> = (props) => {
  return <AstroRashiLogo {...props} />;
};
