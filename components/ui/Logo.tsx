'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface LogoProps {
  variant?: 'light' | 'dark';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'light', showText = true, className = '' }) => {
  const router = useRouter();
  const textColor = variant === 'light' ? 'text-white' : 'text-bg-primary';

  // SVG логотип
  const logoSvg = variant === 'light'
    ? '/images/logo/logo-white.svg'
    : '/images/logo/logo.svg';

  return (
    <button
      onClick={() => router.push('/')}
      className={`flex items-center gap-2 transition-opacity hover:opacity-80 ${className}`}
      aria-label="На главную"
    >
      <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
        <img
          src={logoSvg}
          alt="Лаборатория блеска"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <span className={`font-bold text-sm md:text-base ${textColor} whitespace-nowrap`}>
          Лаборатория <span className="text-accent">блеска</span>
        </span>
      )}
    </button>
  );
};

export default Logo;