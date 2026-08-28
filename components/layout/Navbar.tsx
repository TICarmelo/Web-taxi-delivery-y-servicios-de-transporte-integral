'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UbiLogo } from '@/components/common/UbiLogo';
import { AppView, UserProfile, EmployeeProfile, AuthState } from '@/types/ubi';
import {
  Menu,
  X,
  ShoppingBag,
  Car,
  Truck,
  ChevronDown,
  User,
  Package,
  LogOut,
  Briefcase,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  authState: AuthState;
  onOpenAuth: () => void;
  onLogout: () => void;
  activeOrdersCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  authState,
  onOpenAuth,
  onLogout,
  activeOrdersCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setUserMenuOpen(false);
  };

  const handleAvatarClick = () => {
    if (!authState.isAuthenticated) {
      onOpenAuth();
    } else {
      setUserMenuOpen(!userMenuOpen);
    }
  };

  const handleAreaClick = () => {
    if (!authState.isAuthenticated) {
      onOpenAuth();
    } else if (authState.role === 'employee') {
      onNavigate('employee_area');
    } else {
      onNavigate('dashboard');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c2340] text-white border-b border-[#18365c] shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: UBI Brand Logo */}
        <div className="flex items-center gap-8">
          <UbiLogo
            size="md"
            variant="light"
            showSubtitle={false}
            onClick={() => handleNavClick('home')}
          />
        </div>

        {/* Center: Navigation Links for Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* Inicio with active teal underline */}
          <button
            onClick={() => handleNavClick('home')}
            className={`transition font-semibold pb-1 cursor-pointer ${
              currentView === 'home'
                ? 'text-teal-300 border-b-2 border-[#2ec4b6]'
                : 'text-slate-200 hover:text-white'
            }`}
            id="nav-link-inicio"
          >
            Inicio
          </button>

          {/* Servicios with dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className={`flex items-center gap-1.5 transition font-semibold pb-1 cursor-pointer ${
                currentView === 'ride_hailing' ||
                currentView === 'personal_shopper' ||
                currentView === 'delivery'
                  ? 'text-teal-300 border-b-2 border-[#2ec4b6]'
                  : 'text-slate-200 hover:text-white'
              }`}
              id="nav-link-servicios"
            >
              <span>Servicios</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-teal-300' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-fadeIn">
                <button
                  onClick={() => handleNavClick('delivery')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-[#00a896] flex items-center justify-center">
                    <Truck size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0c2340]">Pide Delivery</p>
                    <p className="text-xs text-slate-500">Envíos rápidos de paquetes</p>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('personal_shopper')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-[#00a896] flex items-center justify-center">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0c2340]">Compras Asistidas</p>
                    <p className="text-xs text-slate-500">Personal Shopper en el súper</p>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('ride_hailing')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 transition text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Car size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0c2340]">Pide Carrera</p>
                    <p className="text-xs text-slate-500">Transporte urbano seguro</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Cómo Funciona */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-slate-200 hover:text-white transition font-semibold pb-1 cursor-pointer"
            id="nav-link-como-funciona"
          >
            Cómo Funciona
          </button>

          {/* Área de Usuario / Área del Empleado */}
          <button
            onClick={handleAreaClick}
            className={`transition font-semibold pb-1 cursor-pointer ${
              currentView === 'dashboard' || currentView === 'employee_area'
                ? 'text-teal-300 border-b-2 border-[#2ec4b6]'
                : 'text-slate-200 hover:text-white'
            }`}
            id="nav-link-area-usuario"
          >
            {authState.role === 'employee' ? 'Área del Empleado' : 'Área de Usuario'}
          </button>
        </nav>

        {/* Right Section for Desktop */}
        <div className="hidden md:flex items-center gap-3.5 relative" ref={userMenuRef}>
          {/* Dark rounded box "Área de Usuario" */}
          <button
            onClick={handleAreaClick}
            className="px-4 py-2 bg-[#183354] hover:bg-[#204068] text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-white/5 shadow-xs flex items-center gap-1.5 cursor-pointer"
            id="nav-btn-area-box"
          >
            <span>{authState.role === 'employee' ? 'Área del Empleado' : 'Área de Usuario'}</span>
          </button>

          {/* User Profile Avatar / Trigger */}
          <div className="relative flex flex-col items-center">
            <button
              onClick={handleAvatarClick}
              className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition cursor-pointer flex-shrink-0 shadow-sm flex items-center justify-center ${
                authState.isAuthenticated
                  ? 'border-teal-400 hover:border-teal-300 ring-2 ring-teal-500/30'
                  : 'border-white/40 hover:border-teal-400 bg-white/10 hover:bg-white/20'
              }`}
              title={
                authState.isAuthenticated
                  ? authState.role === 'employee'
                    ? authState.employee?.name
                    : authState.user?.name
                  : 'Iniciar Sesión'
              }
              id="nav-user-avatar-circle"
            >
              {authState.isAuthenticated ? (
                <Image
                  src={
                    authState.role === 'employee'
                      ? authState.employee?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                      : authState.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                  }
                  alt="Usuario"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User size={20} className="text-white/80" />
              )}
            </button>

            {/* Badge pill for Employee (e.g. Conductor) matching Screenshot 5 */}
            {authState.isAuthenticated && authState.role === 'employee' && (
              <span className="absolute -bottom-2 bg-[#2ec4b6] text-[#0c2340] text-[9px] font-black uppercase px-2 py-0.2 rounded-full shadow-xs tracking-tight pointer-events-none">
                {authState.employee?.roleTitle || 'Conductor'}
              </span>
            )}
          </div>

          {/* Pill Outline Button or User Dropdown */}
          {!authState.isAuthenticated ? (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-full border border-white/60 hover:border-white hover:bg-white/10 text-white text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer"
              id="nav-btn-registrate-login"
            >
              Regístrate/Inicia Sesión
            </button>
          ) : (
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white font-medium py-1.5 px-2.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <span>{authState.role === 'employee' ? authState.employee?.name.split(' ')[0] : authState.user?.name.split(' ')[0]}</span>
              <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          )}

          {/* Dropdown Menu when Logged In */}
          {userMenuOpen && authState.isAuthenticated && (
            <div className="absolute top-full right-0 mt-3 w-56 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-fadeIn">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-xs text-[#0c2340]">
                  {authState.role === 'employee' ? authState.employee?.name : authState.user?.name}
                </p>
                <p className="text-[11px] text-teal-600 font-semibold">
                  {authState.role === 'employee' ? `Empleado • ${authState.employee?.employeeCode}` : 'Cliente UBI'}
                </p>
              </div>

              {authState.role === 'employee' ? (
                <button
                  onClick={() => handleNavClick('employee_area')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#00a896] rounded-xl transition text-left cursor-pointer"
                >
                  <Briefcase size={15} />
                  <span>Área del Empleado</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#00a896] rounded-xl transition text-left cursor-pointer"
                >
                  <UserCheck size={15} />
                  <span>Mi Panel y Pedidos</span>
                </button>
              )}

              <button
                onClick={() => {
                  onLogout();
                  setUserMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition text-left cursor-pointer mt-1"
              >
                <LogOut size={15} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Header matching Screenshots 1, 2, 3, 4, 5 */}
        <div className="flex items-center gap-3 md:hidden">
          {/* User Avatar Circle */}
          <div className="relative flex flex-col items-center">
            <button
              onClick={handleAvatarClick}
              className={`relative w-8 h-8 rounded-full overflow-hidden border-2 shadow-xs cursor-pointer flex items-center justify-center ${
                authState.isAuthenticated
                  ? 'border-teal-400'
                  : 'border-teal-400 bg-white/10'
              }`}
              title={authState.isAuthenticated ? 'Perfil' : 'Iniciar Sesión'}
            >
              {authState.isAuthenticated ? (
                <Image
                  src={
                    authState.role === 'employee'
                      ? authState.employee?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                      : authState.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                  }
                  alt="Usuario"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User size={16} className="text-white" />
              )}
            </button>

            {/* Mobile Employee Badge */}
            {authState.isAuthenticated && authState.role === 'employee' && (
              <span className="absolute -bottom-2 bg-[#2ec4b6] text-[#0c2340] text-[8px] font-black uppercase px-1.5 py-0.1 rounded-full shadow-xs pointer-events-none">
                {authState.employee?.roleTitle || 'Conductor'}
              </span>
            )}
          </div>

          {/* Hamburger Menu Toggle (3 horizontal lines) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#081a30] border-t border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {authState.isAuthenticated ? (
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-teal-400">
                  <Image
                    src={
                      authState.role === 'employee'
                        ? authState.employee?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                        : authState.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                    }
                    alt="Perfil"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">
                    {authState.role === 'employee' ? authState.employee?.name : authState.user?.name}
                  </p>
                  <p className="text-xs text-teal-300">
                    {authState.role === 'employee'
                      ? `Empleado (${authState.employee?.roleTitle})`
                      : 'Cliente VIP • Ciudad Bolívar'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="p-3 bg-white/5 rounded-xl mb-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-white">Invitado</p>
                <p className="text-xs text-slate-400">Inicia sesión para gestionar pedidos</p>
              </div>
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="py-1.5 px-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-[#0c2340] rounded-full text-xs font-bold transition cursor-pointer"
              >
                Iniciar Sesión
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
          >
            🏠 Inicio
          </button>

          <div className="space-y-1 pl-2 border-l-2 border-teal-500/40 my-2">
            <button
              onClick={() => handleNavClick('services')}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold text-teal-300 hover:bg-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>📋 Ver Todos los Servicios</span>
              <span className="text-[10px] bg-teal-500/20 px-2 py-0.5 rounded text-teal-200">3 Disponibles</span>
            </button>
            <button
              onClick={() => handleNavClick('delivery')}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
            >
              <Truck size={14} className="text-teal-400" /> Pide Delivery
            </button>
            <button
              onClick={() => handleNavClick('personal_shopper')}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={14} className="text-teal-400" /> Compras Asistidas (Personal Shopper)
            </button>
            <button
              onClick={() => handleNavClick('ride_hailing')}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
            >
              <Car size={14} className="text-amber-400" /> Pide Carrera (Transporte)
            </button>
          </div>

          {authState.role === 'employee' ? (
            <button
              onClick={() => handleNavClick('employee_area')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold text-teal-300 hover:bg-white/10 flex items-center justify-between cursor-pointer bg-teal-900/30 border border-teal-500/30"
            >
              <span>🚗 Área del Empleado</span>
              <span className="px-2 py-0.5 bg-[#2ec4b6] text-[#0c2340] text-xs font-black rounded-full">
                Activo
              </span>
            </button>
          ) : (
            <button
              onClick={handleAreaClick}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-white/10 flex items-center justify-between cursor-pointer"
            >
              <span>👤 Área de Usuario / Mis Pedidos</span>
              {activeOrdersCount > 0 && (
                <span className="px-2 py-0.5 bg-[#2ec4b6] text-white text-xs font-bold rounded-full">
                  {activeOrdersCount} Activos
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </header>
  );
};
