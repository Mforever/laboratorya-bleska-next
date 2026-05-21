// components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-element border-t border-accent/20 p-4 z-50">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-sm">
          Мы используем cookies для улучшения работы сайта.
          <a href="/privacy" className="text-accent ml-1">Подробнее</a>
        </p>
        <button
          onClick={accept}
          className="px-6 py-2 bg-accent hover:bg-accent-hover text-bg-primary rounded-lg transition-all"
        >
          Принять
        </button>
      </div>
    </div>
  );
}