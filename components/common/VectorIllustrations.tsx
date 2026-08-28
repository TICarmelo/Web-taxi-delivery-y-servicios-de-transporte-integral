'use client';

import React from 'react';

// Golden 4-point Sparkle Star matching the background of the image
export const GoldenSparkle: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 18,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <path
      d="M12 0L13.8 8.2L22 12L13.8 15.8L12 24L10.2 15.8L2 12L10.2 8.2L12 0Z"
      fill="#f6bd60"
    />
  </svg>
);

// Botanical Leaves for the bottom right corner of Service Cards
export const BotanicalLeafCluster: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    {/* Large main leaf */}
    <path
      d="M95 95 C95 45 60 15 20 20 C15 55 45 90 95 95 Z"
      fill="#2ec4b6"
      fillOpacity="0.25"
    />
    <path
      d="M95 95 Q60 55 20 20"
      stroke="#0f766e"
      strokeWidth="1.5"
      strokeOpacity="0.4"
      strokeLinecap="round"
    />
    {/* Leaf veins */}
    <path d="M55 58 Q40 50 32 55" stroke="#0f766e" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
    <path d="M70 73 Q55 65 48 70" stroke="#0f766e" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
    
    {/* Second smaller overlapping leaf */}
    <path
      d="M98 90 C85 60 65 40 45 45 C42 65 65 85 98 90 Z"
      fill="#10b981"
      fillOpacity="0.2"
    />
  </svg>
);

// Left Backdrop City Card: Urban Skyline, bridge railing, pedestrian
export const LeftBackdropCityCard: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg
    viewBox="0 0 200 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <defs>
      <linearGradient id="citySky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0f2744" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    {/* Card background */}
    <rect width="200" height="180" rx="16" fill="url(#citySky)" />
    
    {/* Distant Skyscrapers / Cityscape Silhouettes */}
    <rect x="15" y="60" width="22" height="75" fill="#33527a" fillOpacity="0.5" />
    <rect x="40" y="45" width="26" height="90" fill="#2d486d" fillOpacity="0.6" />
    <polygon points="53,30 40,45 66,45" fill="#2d486d" fillOpacity="0.6" />
    <rect x="70" y="55" width="30" height="80" fill="#3a5c88" fillOpacity="0.5" />
    <rect x="105" y="70" width="25" height="65" fill="#2d486d" fillOpacity="0.6" />
    <rect x="135" y="40" width="28" height="95" fill="#33527a" fillOpacity="0.5" />
    <rect x="168" y="65" width="20" height="70" fill="#233a59" fillOpacity="0.7" />

    {/* Windows on buildings */}
    <rect x="45" y="55" width="3" height="4" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="52" y="55" width="3" height="4" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="45" y="65" width="3" height="4" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="52" y="65" width="3" height="4" fill="#60a5fa" fillOpacity="0.4" />
    <rect x="76" y="65" width="3" height="4" fill="#fcd34d" fillOpacity="0.4" />
    <rect x="84" y="65" width="3" height="4" fill="#fcd34d" fillOpacity="0.4" />

    {/* Bridge / Roadway Railing */}
    <rect x="0" y="130" width="200" height="8" fill="#1b3452" />
    <line x1="0" y1="130" x2="200" y2="130" stroke="#476f9d" strokeWidth="1.5" />
    <line x1="0" y1="138" x2="200" y2="138" stroke="#091829" strokeWidth="2" />
    {/* Railing posts */}
    <line x1="20" y1="130" x2="20" y2="138" stroke="#476f9d" strokeWidth="2" />
    <line x1="50" y1="130" x2="50" y2="138" stroke="#476f9d" strokeWidth="2" />
    <line x1="80" y1="130" x2="80" y2="138" stroke="#476f9d" strokeWidth="2" />
    <line x1="110" y1="130" x2="110" y2="138" stroke="#476f9d" strokeWidth="2" />
    <line x1="140" y1="130" x2="140" y2="138" stroke="#476f9d" strokeWidth="2" />
    <line x1="170" y1="130" x2="170" y2="138" stroke="#476f9d" strokeWidth="2" />

    {/* Foreground road */}
    <rect x="0" y="138" width="200" height="42" fill="#13273e" />

    {/* Subtle pedestrian figure on sidewalk */}
    <circle cx="105" cy="108" r="4.5" fill="#fcd34d" />
    <path d="M100 115 C100 112 110 112 110 115 L108 128 H102 Z" fill="#2ec4b6" />
    <line x1="103" y1="128" x2="101" y2="138" stroke="#0f172a" strokeWidth="2" />
    <line x1="107" y1="128" x2="109" y2="138" stroke="#0f172a" strokeWidth="2" />
    {/* Cart near pedestrian */}
    <rect x="75" y="118" width="18" height="14" rx="2" stroke="#94a3b8" strokeWidth="1.5" fill="#1e3a5f" />
    <circle cx="79" cy="134" r="2" fill="#94a3b8" />
    <circle cx="89" cy="134" r="2" fill="#94a3b8" />
    <path d="M93 120 L99 120 L102 125" stroke="#94a3b8" strokeWidth="1.5" />
  </svg>
);

// Right Backdrop City Card: Urban street corner, trees, modern car
export const RightBackdropCityCard: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg
    viewBox="0 0 200 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <defs>
      <linearGradient id="citySkyRight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0f2744" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <rect width="200" height="180" rx="16" fill="url(#citySkyRight)" />

    {/* Background Buildings */}
    <rect x="15" y="50" width="35" height="90" fill="#2d486d" fillOpacity="0.5" />
    <rect x="55" y="40" width="40" height="100" fill="#37577f" fillOpacity="0.5" />
    <rect x="100" y="60" width="30" height="80" fill="#2d486d" fillOpacity="0.6" />
    <rect x="135" y="45" width="45" height="95" fill="#33527a" fillOpacity="0.5" />

    {/* Urban Green Trees */}
    <circle cx="28" cy="115" r="14" fill="#0d9488" fillOpacity="0.7" />
    <rect x="26" y="125" width="4" height="15" fill="#78350f" />
    <circle cx="45" cy="118" r="10" fill="#14b8a6" fillOpacity="0.6" />
    <rect x="43" y="125" width="3" height="15" fill="#78350f" />

    {/* Road Surface */}
    <rect x="0" y="135" width="200" height="45" fill="#13273e" />
    <line x1="0" y1="135" x2="200" y2="135" stroke="#2a4567" strokeWidth="2" />

    {/* Modern Gold/Bronze Sedan Car Driving */}
    {/* Wheels */}
    <circle cx="85" cy="148" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
    <circle cx="85" cy="148" r="4" fill="#cbd5e1" />
    <circle cx="160" cy="148" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
    <circle cx="160" cy="148" r="4" fill="#cbd5e1" />

    {/* Car body */}
    <path
      d="M60 138 Q65 125 78 125 L95 125 L112 106 L158 106 L178 125 L188 130 Q194 135 192 142 L188 144 H173 Q170 136 160 136 Q148 136 146 144 H100 Q98 136 86 136 Q74 136 72 144 H60 Z"
      fill="#d4a373"
    />
    {/* Windows */}
    <path d="M115 109 L100 123 H128 V109 Z" fill="#93c5fd" fillOpacity="0.8" stroke="#78350f" strokeWidth="1" />
    <path d="M132 109 V123 H156 L148 109 Z" fill="#93c5fd" fillOpacity="0.8" stroke="#78350f" strokeWidth="1" />
    {/* Headlight */}
    <path d="M188 131 L192 135 L186 137 Z" fill="#fef08a" />
  </svg>
);

// Bicycle Courier illustration matching screenshot 1, 2, 4
export const BicycleCourierIllustration: React.FC<{ className?: string }> = ({ className = 'w-56 h-40' }) => (
  <svg
    viewBox="0 0 260 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <defs>
      <linearGradient id="cyclistBagGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2ec4b6" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
      <linearGradient id="cyclistShirtGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2ec4b6" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>

    {/* Dynamic Wind / Speed lines behind cyclist */}
    <path d="M10 75 H50" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 6" />
    <path d="M20 100 H60" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
    <path d="M8 128 H45" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

    {/* Sparkle near head */}
    <path
      d="M175 42 L177 50 L185 52 L177 54 L175 62 L173 54 L165 52 L173 50 Z"
      fill="#f6bd60"
    />

    {/* Bicycle Rear Wheel */}
    <circle cx="80" cy="140" r="32" stroke="#38bdf8" strokeWidth="3.5" fill="none" />
    <circle cx="80" cy="140" r="6" fill="#0284c7" />
    {/* Spokes */}
    <line x1="80" y1="108" x2="80" y2="172" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="48" y1="140" x2="112" y2="140" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="57" y1="117" x2="103" y2="163" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="57" y1="163" x2="103" y2="117" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />

    {/* Bicycle Front Wheel */}
    <circle cx="190" cy="140" r="32" stroke="#38bdf8" strokeWidth="3.5" fill="none" />
    <circle cx="190" cy="140" r="6" fill="#0284c7" />
    {/* Spokes */}
    <line x1="190" y1="108" x2="190" y2="172" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="158" y1="140" x2="222" y2="140" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="167" y1="117" x2="213" y2="163" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />
    <line x1="167" y1="163" x2="213" y2="117" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.7" />

    {/* Bike Diamond Frame */}
    <path
      d="M80 140 L130 140 L168 96 L124 96 Z"
      stroke="#0284c7"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path d="M130 140 L118 76" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
    <path d="M190 140 L164 70" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
    {/* Handlebars */}
    <path d="M156 70 H174" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" />
    {/* Saddle */}
    <path d="M106 76 H130" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />

    {/* Pedals & Chain */}
    <circle cx="130" cy="140" r="8" fill="#0284c7" />
    <path d="M130 140 L120 152" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="120" cy="152" r="3" fill="#fcd34d" />

    {/* Rider Legs */}
    {/* Back leg */}
    <path d="M118 80 L98 108 L120 152" stroke="#075985" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Front leg */}
    <path d="M118 80 L140 110 L130 140" stroke="#0369a1" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Torso leaning forward */}
    <path d="M118 80 L146 50" stroke="url(#cyclistShirtGrad)" strokeWidth="14" strokeLinecap="round" />

    {/* Delivery Backpack Box */}
    <rect x="88" y="36" width="38" height="42" rx="7" fill="url(#cyclistBagGrad)" />
    <rect x="94" y="42" width="26" height="28" rx="4" fill="#0d9488" fillOpacity="0.4" />
    <text x="107" y="62" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">9</text>

    {/* Arms holding handlebars */}
    <path d="M142 54 L165 72" stroke="#fcd34d" strokeWidth="5" strokeLinecap="round" />

    {/* Head & Helmet/Cap */}
    <circle cx="158" cy="36" r="11" fill="#fcd34d" />
    {/* Turquoise Helmet with visor */}
    <path d="M147 34 C147 22 168 22 172 34 Z" fill="#2ec4b6" />
    <path d="M147 35 H174" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Woman with Grocery Cart matching screenshot 1, 2, 4
export const ShopperGirlIllustration: React.FC<{ className?: string }> = ({ className = 'w-56 h-40' }) => (
  <svg
    viewBox="0 0 260 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <defs>
      <linearGradient id="shopperGirlTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2ec4b6" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>

    {/* Sparkle near top right */}
    <path
      d="M175 22 L177 30 L185 32 L177 34 L175 42 L173 34 L165 32 L173 30 Z"
      fill="#f6bd60"
    />

    {/* Grocery Cart Basket */}
    <rect x="150" y="72" width="62" height="46" rx="6" stroke="#94a3b8" strokeWidth="3" fill="#f8fafc" fillOpacity="0.85" />
    {/* Cart grid lines */}
    <path d="M165 72 V118 M180 72 V118 M195 72 V118" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M150 88 H212 M150 102 H212" stroke="#cbd5e1" strokeWidth="1.5" />

    {/* Fresh Items inside the Shopping Cart */}
    {/* Baguettes / Bread in brown bag */}
    <rect x="156" y="50" width="16" height="26" rx="3" fill="#d97706" />
    <path d="M158 50 L164 36 L170 50" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    {/* Fresh green lettuce / celery */}
    <path d="M176 52 C176 40 188 40 188 52 Z" fill="#22c55e" />
    <path d="M182 52 C182 36 198 36 198 52 Z" fill="#16a34a" />
    {/* Juice carton / groceries */}
    <rect x="194" y="55" width="14" height="20" rx="2" fill="#ef4444" />

    {/* Cart Frame & Wheels */}
    <path d="M138 74 L150 74 L156 128 H206" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="162" cy="138" r="7" fill="#334155" stroke="#94a3b8" strokeWidth="2.5" />
    <circle cx="200" cy="138" r="7" fill="#334155" stroke="#94a3b8" strokeWidth="2.5" />

    {/* Shopper Woman Figure */}
    {/* Legs in dark trousers */}
    <path d="M96 102 L88 152" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
    <path d="M102 102 L112 152" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
    {/* Shoes */}
    <path d="M82 152 H94" stroke="#0f766e" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M108 152 H120" stroke="#0f766e" strokeWidth="4.5" strokeLinecap="round" />

    {/* Torso & Turquoise Blouse */}
    <path d="M90 60 Q100 56 108 60 L102 105 H92 Z" fill="url(#shopperGirlTop)" />

    {/* Arm pushing cart handle */}
    <path d="M104 68 L140 75" stroke="#fcd34d" strokeWidth="4.5" strokeLinecap="round" />

    {/* Head & Hair */}
    <circle cx="98" cy="42" r="9.5" fill="#fcd34d" />
    {/* Long Dark Brunette Hair */}
    <path
      d="M88 40 C88 26 110 26 110 40 C110 54 104 60 104 66 C100 66 88 52 88 40 Z"
      fill="#334155"
    />
  </svg>
);

// Feature Card 1: Scooter Courier (Delivery)
export const ScooterCourierCardIllustration: React.FC<{ className?: string }> = ({ className = 'w-40 h-28' }) => (
  <svg
    viewBox="0 0 200 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <defs>
      <linearGradient id="scooterTealGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2ec4b6" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>
    </defs>

    {/* Background speed lines */}
    <path d="M12 65 H42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
    <path d="M8 85 H32" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />

    {/* Scooter Wheels */}
    <circle cx="55" cy="115" r="18" fill="#334155" stroke="#94a3b8" strokeWidth="4" />
    <circle cx="55" cy="115" r="6" fill="#f8fafc" />
    <circle cx="145" cy="115" r="18" fill="#334155" stroke="#94a3b8" strokeWidth="4" />
    <circle cx="145" cy="115" r="6" fill="#f8fafc" />

    {/* Chassis & Footboard */}
    <path d="M60 115 H140 L130 90 L85 90 Z" fill="url(#scooterTealGrad)" />
    <path d="M130 90 L140 55 L130 55" stroke="url(#scooterTealGrad)" strokeWidth="6" strokeLinecap="round" />
    <rect x="120" y="52" width="22" height="5" rx="2" fill="#0f172a" />

    {/* Delivery Box at Rear */}
    <rect x="45" y="60" width="35" height="34" rx="5" fill="#2ec4b6" stroke="#0f766e" strokeWidth="2" />
    <path d="M62 70 V84 M55 77 H70" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

    {/* Rider */}
    <path d="M95 90 L92 65" stroke="#14b8a6" strokeWidth="12" strokeLinecap="round" />
    <path d="M95 68 L126 56" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" />
    <circle cx="102" cy="46" r="9" fill="#fcd34d" />
    <path d="M93 44 C93 33 111 33 113 44 Z" fill="#0f766e" />
    <path d="M93 45 H115" stroke="#2ec4b6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Feature Card 2: Shopping Cart & Groceries (Personal Shopper)
export const PersonalShopperCardIllustration: React.FC<{ className?: string }> = ({ className = 'w-40 h-28' }) => (
  <svg
    viewBox="0 0 200 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Paper Grocery Bag with Fresh Vegetables */}
    <rect x="25" y="65" width="42" height="50" rx="4" fill="#d97706" fillOpacity="0.9" />
    <path d="M32 65 L36 38 Q42 32 46 45 L48 65" fill="#22c55e" />
    <path d="M44 65 L50 32 Q58 28 60 48 L61 65" fill="#16a34a" />
    <circle cx="38" cy="58" r="6" fill="#ef4444" />

    {/* Woman pushing cart */}
    <circle cx="95" cy="42" r="8" fill="#fcd34d" />
    <path d="M87 40 C87 30 104 30 104 40 C104 50 99 56 99 60 Z" fill="#334155" />
    <path d="M92 56 L96 95" stroke="#2ec4b6" strokeWidth="9" strokeLinecap="round" />
    <path d="M93 95 L86 130" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M97 95 L106 130" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M97 64 L125 76" stroke="#fcd34d" strokeWidth="3.5" strokeLinecap="round" />

    {/* Grocery Trolley */}
    <rect x="130" y="74" width="46" height="34" rx="4" stroke="#94a3b8" strokeWidth="2.5" fill="#f1f5f9" />
    <path d="M142 74 V108 M154 74 V108 M166 74 V108" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="138" cy="120" r="5" fill="#334155" />
    <circle cx="168" cy="120" r="5" fill="#334155" />
    <path d="M122 76 L130 76 L134 114 H172" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />

    {/* Fresh items in trolley */}
    <circle cx="145" cy="68" r="6" fill="#ef4444" />
    <rect x="153" y="60" width="10" height="15" rx="2" fill="#3b82f6" />
    <circle cx="168" cy="68" r="6" fill="#f59e0b" />
  </svg>
);

// Feature Card 3: Modern Blue Sedan Car (Ride-Hailing)
export const RideHailingCardIllustration: React.FC<{ className?: string }> = ({ className = 'w-40 h-28' }) => (
  <svg
    viewBox="0 0 200 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <defs>
      <linearGradient id="carBodyGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="carGlass2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>

    {/* Car Shadow */}
    <ellipse cx="100" cy="122" rx="80" ry="8" fill="#0f172a" fillOpacity="0.15" />

    {/* Wheels */}
    <circle cx="52" cy="112" r="16" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
    <circle cx="52" cy="112" r="6" fill="#e2e8f0" />
    <circle cx="148" cy="112" r="16" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
    <circle cx="148" cy="112" r="6" fill="#e2e8f0" />

    {/* Car Main Body */}
    <path
      d="M20 98 Q22 84 38 84 L60 84 L80 58 L140 58 L168 84 L180 90 Q188 95 186 106 L180 108 H166 Q164 96 148 96 Q132 96 130 108 H70 Q68 96 52 96 Q36 96 34 108 H20 Z"
      fill="url(#carBodyGrad2)"
    />

    {/* Car Windows */}
    <path
      d="M84 62 L66 82 H100 V62 Z"
      fill="url(#carGlass2)"
      stroke="#1e3a8a"
      strokeWidth="1.5"
    />
    <path
      d="M104 62 V82 H138 L126 62 Z"
      fill="url(#carGlass2)"
      stroke="#1e3a8a"
      strokeWidth="1.5"
    />

    {/* Headlight & Taillight */}
    <path d="M182 92 L185 96 L178 98 Z" fill="#fef08a" />
    <path d="M22 92 L20 97 L26 97 Z" fill="#ef4444" />

    {/* Door handle & line */}
    <line x1="102" y1="88" x2="114" y2="88" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
