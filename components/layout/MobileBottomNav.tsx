'use client';

import React from 'react';
import { AppView } from '@/types/ubi';
import { Home, Menu, ShoppingBag, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
}) => {
  // Never show on homepage as instructed
  if (currentView === 'home') {
    return null;
  }

  const isServicesActive = currentView === 'services';
  const isOrdersActive = currentView === 'dashboard';

  return (
    <nav
      aria-label="Navegación Móvil Principal"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl px-2 py-1.5 flex items-center justify-around"
      id="ubi-mobile-bottom-nav"
    >
      {/* Inicio */}
      <button
        onClick={() => onNavigate('home')}
        className="flex flex-col items-center justify-center py-1 px-3 transition cursor-pointer text-slate-500 hover:text-[#0c2340]"
        id="bottom-nav-inicio"
      >
        <Home size={18} />
        <span className="text-[10px] font-semibold mt-0.5">Inicio</span>
      </button>

      {/* Servicios (Opens the dedicated 3-services hub page) */}
      <button
        onClick={() => onNavigate('services')}
        className={`flex flex-col items-center justify-center transition cursor-pointer ${
          isServicesActive
            ? 'py-1.5 px-4 bg-[#2ec4b6] text-white rounded-xl shadow-sm'
            : 'py-1 px-3 text-slate-500 hover:text-[#0c2340]'
        }`}
        id="bottom-nav-servicios"
      >
        <Menu size={18} />
        <span className={`text-[10px] mt-0.5 ${isServicesActive ? 'font-bold' : 'font-semibold'}`}>
          Servicios
        </span>
      </button>

      {/* Mis Pedidos (Active Teal Tab matching exact reference design) */}
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center justify-center transition cursor-pointer ${
          isOrdersActive
            ? 'py-1.5 px-4 bg-[#2ec4b6] text-white rounded-xl shadow-sm'
            : 'py-1 px-3 text-slate-500 hover:text-[#0c2340]'
        }`}
        id="bottom-nav-pedidos"
      >
        <ShoppingBag size={18} />
        <span className={`text-[10px] mt-0.5 ${isOrdersActive ? 'font-bold' : 'font-semibold'}`}>
          Mis Pedidos
        </span>
      </button>

      {/* Perfil */}
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex flex-col items-center justify-center py-1 px-3 transition cursor-pointer text-slate-500 hover:text-[#0c2340]"
        id="bottom-nav-perfil"
      >
        <User size={18} />
        <span className="text-[10px] font-semibold mt-0.5">Perfil</span>
      </button>
    </nav>
  );
};
