'use client';

import React from 'react';

interface UbiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const UbiLogo: React.FC<UbiLogoProps> = ({
  size = 'md',
  variant = 'light',
  showSubtitle = false,
  className = '',
  onClick,
}) => {
  const pinSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const isLight = variant === 'light';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${
        onClick ? 'cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${className}`}
      id="ubi-main-logo"
    >
      {/* Pin Icon with Glow & Star */}
      <div className={`relative ${pinSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id="ubiPinGrad" x1="20" y1="10" x2="80" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2ec4b6" />
              <stop offset="100%" stopColor="#008170" />
            </linearGradient>
            <filter id="pinGlow" x="0" y="0" width="100" height="120" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer location pin path */}
          <path
            d="M50 115C50 115 15 75 15 45C15 25.67 30.67 10 50 10C69.33 10 85 25.67 85 45C85 75 50 115 50 115Z"
            fill="url(#ubiPinGrad)"
          />

          {/* Inner circle cutout */}
          <circle cx="50" cy="45" r="22" fill={isLight ? '#0c2340' : '#ffffff'} />

          {/* Star in center */}
          <path
            d="M50 31L53.8 39.5L63 40.5L56 46.5L58 55.5L50 51L42 55.5L44 46.5L37 40.5L46.2 39.5L50 31Z"
            fill="#f6bd60"
          />

          {/* Small spark highlight */}
          <circle cx="34" cy="26" r="3" fill="#ffffff" fillOpacity="0.8" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight leading-none ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#0c2340]'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          UBI
        </span>
        {showSubtitle && (
          <span
            className={`text-[10px] uppercase font-bold tracking-widest leading-none mt-0.5 ${
              isLight ? 'text-teal-300' : 'text-[#00a896]'
            }`}
          >
            Ciudad Bolívar
          </span>
        )}
      </div>
    </div>
  );
};
