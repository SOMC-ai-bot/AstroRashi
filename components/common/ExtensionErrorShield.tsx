'use client';

import { useEffect } from 'react';

/**
 * ExtensionErrorShield
 * Intercepts and silences unhandled errors and promise rejections originating from
 * third-party browser extensions (such as CRX Emulator, adblockers, translation extensions)
 * so that they do not trigger the Next.js development error overlay or disrupt the user experience.
 */
export function ExtensionErrorShield() {
  useEffect(() => {
    function isExtensionOrIgnoredError(msg?: string, source?: string, stack?: string): boolean {
      const combined = `${msg || ''} ${source || ''} ${stack || ''}`.toLowerCase();
      return (
        combined.includes('chrome-extension://') ||
        combined.includes('moz-extension://') ||
        combined.includes('safari-extension://') ||
        combined.includes('chrome: call method') ||
        combined.includes('window message') ||
        combined.includes('bekkpoinfafbjglppgdobfdeckghdhlo') ||
        combined.includes('resizeobserver loop')
      );
    }

    const errorHandler = (event: ErrorEvent) => {
      const msg = event.message || event.error?.message;
      const source = event.filename;
      const stack = event.error?.stack;
      if (isExtensionOrIgnoredError(msg, source, stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg = typeof reason === 'object' && reason !== null ? reason.message || String(reason) : String(reason || '');
      const stack = typeof reason === 'object' && reason !== null ? reason.stack : '';
      if (isExtensionOrIgnoredError(msg, '', stack)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    };

    window.addEventListener('error', errorHandler, true);
    window.addEventListener('unhandledrejection', rejectionHandler, true);

    return () => {
      window.removeEventListener('error', errorHandler, true);
      window.removeEventListener('unhandledrejection', rejectionHandler, true);
    };
  }, []);

  return null;
}
