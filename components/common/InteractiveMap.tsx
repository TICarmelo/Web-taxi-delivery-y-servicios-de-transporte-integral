'use client';

import React, { useState, useEffect } from 'react';
import { Navigation, Plus, Minus, Compass, Car, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface InteractiveMapProps {
  step?: 1 | 2 | 3 | 4;
  originText?: string;
  destinationText?: string;
  selectedVehicleType?: string;
  isLiveTracking?: boolean;
  onSelectDriver?: (driverId: string) => void;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  step = 1,
  originText = 'Av. Germania, Qta. Los Rosales',
  destinationText = 'Paseo Meneses, Torre Bolívar',
  selectedVehicleType = 'standard',
  isLiveTracking = false,
  onSelectDriver,
  className = '',
}) => {
  const [zoom, setZoom] = useState(1);
  const [carProgress, setCarProgress] = useState(0.2); // 0 to 1 along path

  // Simulate smooth car movement along the route in step 4 / live tracking
  useEffect(() => {
    if (step === 4 || isLiveTracking) {
      const interval = setInterval(() => {
        setCarProgress((prev) => (prev >= 0.95 ? 0.15 : prev + 0.05));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [step, isLiveTracking]);

  // Route coordinates on 500x500 SVG canvas
  // Point A (Origin): (180, 220) -> Point B: (240, 310) -> Point C: (310, 180) (Destination)
  const originX = 180;
  const originY = 220;
  const destX = 320;
  const destY = 175;

  // Active moving vehicle interpolation along the route
  const currentCarX = originX + (destX - originX) * carProgress;
  const currentCarY = originY + (destY - originY) * carProgress;

  return (
    <div
      className={`relative w-full h-full min-h-[380px] bg-[#eef3f8] overflow-hidden rounded-2xl border border-slate-200 select-none ${className}`}
      id="ubi-interactive-map"
    >
      {/* SVG Canvas Map */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full object-cover transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        <defs>
          {/* River gradient */}
          <linearGradient id="riverGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
          </linearGradient>

          {/* Route path gradient */}
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00a896" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Pulse ring animation */}
          <radialGradient id="haloPulse">
            <stop offset="0%" stopColor="#2ec4b6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2ec4b6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Land Background */}
        <rect width="500" height="500" fill="#f1f5f9" />

        {/* Orinoco River Body (Bottom left curve matching screenshots) */}
        <path
          d="M0 320 Q 80 340 140 410 T 250 500 L 0 500 Z"
          fill="url(#riverGrad)"
        />
        {/* Riverbank Greenery */}
        <path
          d="M0 315 Q 85 335 145 405 T 255 500"
          stroke="#86efac"
          strokeWidth="10"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Parks and Green Areas */}
        {/* Parque Leonardo Ruiz Pineda */}
        <rect x="50" y="80" width="80" height="60" rx="8" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="1" />
        <text x="90" y="115" fontSize="8" fill="#15803d" fontWeight="600" textAnchor="middle">
          Parque Ruiz Pineda
        </text>

        {/* Jardín Botánico */}
        <path d="M 360 300 Q 420 280 460 340 T 380 420 Z" fill="#dcfce7" />
        <text x="410" y="340" fontSize="7" fill="#15803d" fontWeight="600" textAnchor="middle">
          Zona Verde
        </text>

        {/* City Blocks (Buildings) */}
        <g fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1">
          <rect x="150" y="70" width="45" height="35" rx="3" />
          <rect x="210" y="60" width="55" height="40" rx="3" />
          <rect x="280" y="55" width="70" height="45" rx="3" />
          <rect x="370" y="70" width="50" height="40" rx="3" />

          <rect x="70" y="180" width="50" height="40" rx="3" />
          <rect x="70" y="240" width="60" height="50" rx="3" />

          <rect x="210" y="140" width="45" height="45" rx="3" />
          <rect x="270" y="140" width="40" height="35" rx="3" />
          <rect x="330" y="130" width="60" height="45" rx="3" />

          <rect x="230" y="230" width="55" height="40" rx="3" />
          <rect x="300" y="230" width="65" height="45" rx="3" />
          <rect x="380" y="210" width="60" height="50" rx="3" />

          <rect x="160" y="340" width="50" height="40" rx="3" />
          <rect x="230" y="330" width="60" height="45" rx="3" />
          <rect x="310" y="320" width="50" height="45" rx="3" />
        </g>

        {/* Street Network (Avenidas & Calles de Ciudad Bolívar) */}
        <g stroke="#ffffff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Diagonal: Av. Germania */}
          <path d="M 40 450 L 180 220 L 320 60" />
          {/* Paseo Meneses */}
          <path d="M 80 150 L 440 220" />
          {/* Av. Jesús Soto */}
          <path d="M 180 220 L 240 310 L 460 300" />
          {/* Av. 17 de Diciembre */}
          <path d="M 280 50 L 320 180 L 360 440" />
          {/* Connecting Cross Streets */}
          <path d="M 140 80 L 140 280" />
          <path d="M 400 80 L 400 380" />
          <path d="M 100 360 L 360 360" />
        </g>

        {/* Secondary Street Overlay for contrast */}
        <g stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round">
          <path d="M 40 450 L 180 220 L 320 60" strokeDasharray="6 4" />
          <path d="M 80 150 L 440 220" />
          <path d="M 180 220 L 240 310 L 460 300" />
          <path d="M 280 50 L 320 180 L 360 440" />
        </g>

        {/* Street Labels */}
        <text x="140" y="35" fontSize="10" fill="#64748b" fontWeight="bold">
          Ciudad Bolívar
        </text>
        <text x="90" y="165" fontSize="7" fill="#94a3b8" fontWeight="600">
          Paseo Meneses
        </text>
        <text x="100" y="270" fontSize="7" fill="#94a3b8" fontWeight="600" transform="rotate(-45 100,270)">
          Av. Germania
        </text>
        <text x="310" y="275" fontSize="7" fill="#94a3b8" fontWeight="600">
          Av. Jesús Soto
        </text>

        {/* ROUTE PATH: From Origin to Destination */}
        <g>
          {/* Route shadow */}
          <path
            d="M 180 220 L 240 310 L 320 175"
            stroke="#0f766e"
            strokeWidth="7"
            strokeOpacity="0.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Active Colored Route */}
          <path
            d="M 180 220 L 240 310 L 320 175"
            stroke="url(#routeGrad)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Route waypoint dots */}
          <circle cx="240" cy="310" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* NEARBY AVAILABLE CARS WITH ETA BADGES (Matching Screenshots 5, 6, 7) */}
        {/* Car 1: 2 min (near top) */}
        <g
          className="cursor-pointer transition-transform hover:scale-110"
          onClick={() => onSelectDriver && onSelectDriver('drv_esteban')}
        >
          {/* ETA Badge */}
          <g transform="translate(290, 110)">
            <rect x="0" y="0" width="54" height="20" rx="6" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
            <Car x="6" y="4" size={12} className="text-slate-700" />
            <text x="24" y="14" fontSize="9" fontWeight="bold" fill="#0f172a">2 min</text>
          </g>
          {/* Car Graphic */}
          <g transform="translate(310, 135) rotate(-35)">
            <rect x="-8" y="-14" width="16" height="28" rx="4" fill="#0f2942" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="-6" y="-8" width="12" height="7" rx="1.5" fill="#38bdf8" />
            <rect x="-6" y="3" width="12" height="6" rx="1.5" fill="#38bdf8" />
          </g>
        </g>

        {/* Car 2: 3 min (near center) */}
        <g
          className="cursor-pointer transition-transform hover:scale-110"
          onClick={() => onSelectDriver && onSelectDriver('drv_maria')}
        >
          <g transform="translate(180, 260)">
            <rect x="0" y="0" width="54" height="20" rx="6" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
            <Car x="6" y="4" size={12} className="text-slate-700" />
            <text x="24" y="14" fontSize="9" fontWeight="bold" fill="#0f172a">3 min</text>
          </g>
          <g transform="translate(160, 275) rotate(45)">
            <rect x="-8" y="-14" width="16" height="28" rx="4" fill="#0f2942" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="-6" y="-8" width="12" height="7" rx="1.5" fill="#38bdf8" />
            <rect x="-6" y="3" width="12" height="6" rx="1.5" fill="#38bdf8" />
          </g>
        </g>

        {/* Car 3: 5 min (near right) */}
        <g
          className="cursor-pointer transition-transform hover:scale-110"
          onClick={() => onSelectDriver && onSelectDriver('drv_carlos')}
        >
          <g transform="translate(260, 195)">
            <rect x="0" y="0" width="54" height="20" rx="6" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
            <Car x="6" y="4" size={12} className="text-slate-700" />
            <text x="24" y="14" fontSize="9" fontWeight="bold" fill="#0f172a">5 min</text>
          </g>
          <g transform="translate(245, 235) rotate(-15)">
            <rect x="-8" y="-14" width="16" height="28" rx="4" fill="#0f2942" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="-6" y="-8" width="12" height="7" rx="1.5" fill="#38bdf8" />
            <rect x="-6" y="3" width="12" height="6" rx="1.5" fill="#38bdf8" />
          </g>
        </g>

        {/* Car 4: 2 min (bottom lane) */}
        <g transform="translate(240, 270)">
          <g transform="translate(10, 0)">
            <rect x="0" y="0" width="54" height="20" rx="6" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" />
            <Car x="6" y="4" size={12} className="text-slate-700" />
            <text x="24" y="14" fontSize="9" fontWeight="bold" fill="#0f172a">2 min</text>
          </g>
          <g transform="translate(30, 40) rotate(80)">
            <rect x="-8" y="-14" width="16" height="28" rx="4" fill="#0f2942" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="-6" y="-8" width="12" height="7" rx="1.5" fill="#38bdf8" />
            <rect x="-6" y="3" width="12" height="6" rx="1.5" fill="#38bdf8" />
          </g>
        </g>

        {/* ORIGIN PIN ("Punto de Partida") */}
        <g transform={`translate(${originX}, ${originY})`}>
          {/* Animated pulse halo */}
          <circle cx="0" cy="0" r="24" fill="url(#haloPulse)" className="animate-pulse-subtle" />
          {/* Origin Flag / Label */}
          <g transform="translate(-55, -45)">
            <rect x="0" y="0" width="110" height="26" rx="6" fill="#0f2942" filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.25))" />
            <text x="55" y="17" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">
              Punto de Partida
            </text>
          </g>
          {/* Pin Graphic */}
          <path
            d="M 0 -18 C -10 -18 -16 -10 -16 0 C -16 12 0 24 0 24 C 0 24 16 12 16 0 C 16 -10 10 -18 0 -18 Z"
            fill="#2ec4b6"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx="0" cy="0" r="5" fill="#ffffff" />
        </g>

        {/* DESTINATION PIN ("Destino") */}
        <g transform={`translate(${destX}, ${destY})`}>
          {/* Destination Badge */}
          <g transform="translate(-35, -42)">
            <rect x="0" y="0" width="70" height="26" rx="6" fill="#0f2942" filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.25))" />
            <text x="35" y="17" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">
              Destino
            </text>
          </g>
          {/* Pin Graphic */}
          <path
            d="M 0 -18 C -10 -18 -16 -10 -16 0 C -16 12 0 24 0 24 C 0 24 16 12 16 0 C 16 -10 10 -18 0 -18 Z"
            fill="#0284c7"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx="0" cy="0" r="5" fill="#ffffff" />
        </g>

        {/* ACTIVE MOVING CAR FOR STEP 4 (Live Tracking) */}
        {(step === 4 || isLiveTracking) && (
          <g transform={`translate(${currentCarX}, ${currentCarY})`} className="transition-all duration-700 ease-out">
            <circle cx="0" cy="0" r="18" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
            <rect x="-10" y="-18" width="20" height="36" rx="5" fill="#00a896" stroke="#ffffff" strokeWidth="2" />
            <rect x="-7" y="-11" width="14" height="9" rx="2" fill="#e0f2fe" />
            <rect x="-7" y="4" width="14" height="8" rx="2" fill="#e0f2fe" />
            {/* Live Tag */}
            <g transform="translate(-25, -34)">
              <rect x="0" y="0" width="50" height="18" rx="4" fill="#0f2942" />
              <text x="25" y="12" fontSize="8" fontWeight="bold" fill="#2ec4b6" textAnchor="middle">
                Standard
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Floating Map Zoom & Action Controls */}
      <div className="absolute right-3 bottom-4 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-lg border border-slate-200 z-10">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-700 transition active:scale-95"
          title="Acercar"
          id="map-zoom-in"
        >
          <Plus size={16} />
        </button>
        <div className="h-[1px] bg-slate-200 mx-1" />
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-700 transition active:scale-95"
          title="Alejar"
          id="map-zoom-out"
        >
          <Minus size={16} />
        </button>
      </div>

      {/* Recenter Button */}
      <button
        onClick={() => setZoom(1)}
        className="absolute right-3 top-4 p-2.5 bg-white/95 backdrop-blur-md hover:bg-slate-100 rounded-xl shadow-md border border-slate-200 text-[#0c2340] transition active:scale-95 z-10"
        title="Centrar mapa"
        id="map-recenter"
      >
        <Compass size={18} className="text-[#00a896]" />
      </button>

      {/* City Badge */}
      <div className="absolute left-3 top-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-slate-200 flex items-center gap-1.5 z-10">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-slate-700">Ciudad Bolívar, VE</span>
      </div>
    </div>
  );
};
