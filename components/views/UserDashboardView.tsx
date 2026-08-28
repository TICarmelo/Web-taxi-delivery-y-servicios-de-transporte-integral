'use client';

import React, { useState } from 'react';
import { UserProfile, PastOrder, AppView } from '@/types/ubi';
import { INITIAL_PAST_ORDERS } from '@/data/mockData';
import {
  User,
  ShoppingBag,
  CreditCard,
  MapPin,
  Check,
  Truck,
  Car,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  Home,
  Menu,
} from 'lucide-react';
import Image from 'next/image';

interface UserDashboardViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenTracking: (query: string, orderData?: PastOrder) => void;
  onNavigate: (view: AppView) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  userProfile,
  onUpdateProfile,
  onOpenTracking,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'pedidos' | 'direcciones' | 'pagos'>('perfil');
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name,
      email,
      phone,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f7fb] pb-16 md:pb-8">
      {/* ========================================================================= */}
      {/* MOBILE HERO AVATAR & HEADER - EXACTLY MATCHING USER'S REFERENCE IMAGE     */}
      {/* ========================================================================= */}
      <div className="md:hidden w-full">
        {/* Navy curved background header */}
        <div className="relative w-full bg-[#0c2340] pt-6 pb-12 px-4 flex flex-col items-center">
          {/* Avatar with teal status badge */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-3">
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Small teal location icon badge at bottom-right of avatar */}
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#2ec4b6] border-2 border-white flex items-center justify-center text-white">
              <MapPin size={11} className="fill-white" />
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {userProfile.name}
          </h2>
          <p className="text-xs text-slate-300 font-medium">
            {userProfile.role || 'Cliente'}
          </p>
        </div>

        {/* Mobile Main Content Cards Stack matching screenshot */}
        <div className="px-4 -mt-6 space-y-4 relative z-10">
          
          {/* CARD 1: Perfil */}
          <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100/90">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-base text-[#0c2340]">Perfil</h3>
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#0c2340] cursor-pointer"
              >
                <span>Guardar</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Datos personales y de contacto en Ciudad Bolívar.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                {/* Nombre */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2ec4b6]"
                  />
                </div>

                {/* Correo */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    Correo details
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2ec4b6]"
                  />
                </div>
              </div>

              {/* Teléfono + Botón Guardar */}
              <div className="flex items-end gap-2.5">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">
                    Teléfono a contactar
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2ec4b6]"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#0c2340] hover:bg-[#14325a] text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
                >
                  Guardar
                </button>
              </div>

              {savedSuccess && (
                <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 pt-1 animate-fadeIn">
                  <Check size={13} /> ¡Perfil guardado con éxito!
                </p>
              )}
            </form>
          </div>

          {/* CARD 2: Mis Pedidos & Historial matching screenshot */}
          <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100/90">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-extrabold text-base text-[#0c2340]">
                Mis Pedidos & Historial
              </h3>
              <ChevronRight size={16} className="text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Pedidos recientes y servicios completados.
            </p>

            {/* Pedidos List */}
            <div className="space-y-2.5">
              {/* Item 1: Delivery */}
              <div
                onClick={() => onOpenTracking(INITIAL_PAST_ORDERS[2].id, INITIAL_PAST_ORDERS[2])}
                className="p-3 bg-slate-50 hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <Truck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs text-[#0c2340]">Delivery</h4>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                        En camino
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Garodi Filrh, 1 items</p>
                    <p className="text-[10px] text-slate-400">Fecha: Hoy, 12:40 PM</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-extrabold text-xs text-[#0c2340]">$28.99</p>
                  <p className="text-[10px] text-teal-600 font-semibold">Driver info</p>
                </div>
              </div>

              {/* Item 2: Ride-Hailing */}
              <div
                onClick={() => onOpenTracking(INITIAL_PAST_ORDERS[0].id, INITIAL_PAST_ORDERS[0])}
                className="p-3 bg-slate-50 hover:bg-teal-50/50 rounded-2xl border border-slate-200/80 transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Car size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs text-[#0c2340]">Ride-Hailing</h4>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                        Completado
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Paseo Meneses ➔ Centro</p>
                    <p className="text-[10px] text-slate-400">Fecha: Ayer</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-extrabold text-xs text-[#0c2340]">$14.99</p>
                  <p className="text-[10px] text-teal-600 font-semibold">Driver info</p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Métodos de Pago matching screenshot */}
          <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100/90">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-base text-[#0c2340]">
                Métodos de Pago
              </h3>
              <ChevronRight size={16} className="text-slate-400" />
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              <div className="flex-1 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-700 font-bold text-xs">
                💵 Efectivo USD
              </div>
              <div className="flex-1 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center text-red-700 font-bold text-xs">
                💳 MasterCard ••••
              </div>
              <div className="flex-1 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 font-bold text-xs">
                📲 Pago Móvil
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (Expanded 2-column layout for larger screens)                 */}
      {/* ========================================================================= */}
      <div className="hidden md:block max-w-6xl mx-auto w-full py-8 px-6">
        {/* Top Header Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-[#00a896] rounded-full text-xs font-bold mb-1">
            <Sparkles size={13} />
            <span>Panel de Gestión UBI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] tracking-tight">
            Área del Usuario (Client Dashboard)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Administra tus pedidos activos, historial de servicios, direcciones y métodos de pago en Ciudad Bolívar.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Sidebar (4 cols) */}
          <div className="col-span-4 space-y-5">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#2ec4b6] shadow-md mb-3">
                <Image
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              <h3 className="text-xl font-extrabold text-[#0c2340] mb-0.5">
                {userProfile.name}
              </h3>
              <p className="text-xs font-bold text-[#00a896] uppercase tracking-wider mb-2">
                {userProfile.role || 'Cliente'}
              </p>
              <p className="text-xs text-slate-400 font-medium mb-4">
                {userProfile.city}
              </p>

              <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">Viajes Realizados</p>
                  <p className="text-base font-extrabold text-[#0c2340]">{userProfile.totalTrips}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <p className="text-slate-400 text-[10px] uppercase font-bold">Calificación</p>
                  <p className="text-base font-extrabold text-amber-600">⭐ {userProfile.rating}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-3 shadow-md border border-slate-100 space-y-1">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs transition ${
                  activeTab === 'perfil'
                    ? 'bg-teal-50 text-[#00a896] shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User size={16} />
                  <span>Mi Perfil</span>
                </div>
                <ChevronRight size={14} />
              </button>

              <button
                onClick={() => setActiveTab('pedidos')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs transition ${
                  activeTab === 'pedidos'
                    ? 'bg-teal-50 text-[#00a896] shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={16} />
                  <span>Mis Pedidos & Historial</span>
                </div>
                <span className="px-2 py-0.5 bg-[#2ec4b6] text-white text-[10px] font-bold rounded-full">
                  3
                </span>
              </button>

              <button
                onClick={() => setActiveTab('pagos')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs transition ${
                  activeTab === 'pagos'
                    ? 'bg-teal-50 text-[#00a896] shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard size={16} />
                  <span>Métodos de Pago</span>
                </div>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Content Area (8 cols) */}
          <div className="col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-lg text-[#0c2340]">Perfil</h3>
                <span className="text-xs text-slate-400">Datos personales de cuenta</span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#0c2340] focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#0c2340] focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Teléfono a Contactar
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#0c2340] focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {savedSuccess ? (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <Check size={14} /> ¡Perfil guardado con éxito!
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Tus datos están protegidos y verificados</span>
                  )}
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-[#0c2340] hover:bg-[#081a30] active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-sm transition cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>

            {/* Pedidos & Historial */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-lg text-[#0c2340]">
                  Mis Pedidos & Historial
                </h3>
                <span className="text-xs text-slate-400">Actividad reciente en Ciudad Bolívar</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {INITIAL_PAST_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => onOpenTracking(order.id, order)}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition cursor-pointer bg-slate-50/50 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-teal-100 text-[#00a896] flex items-center justify-center">
                          {order.type === 'delivery' ? <Truck size={16} /> : <Car size={16} />}
                        </div>
                        <div>
                          <p className="font-extrabold text-xs text-[#0c2340]">{order.title}</p>
                          <p className="text-[11px] text-slate-400">{order.date}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold">
                      <span className="text-[#0c2340]">${order.price.toFixed(2)} USD</span>
                      <span className="text-teal-600 hover:underline">Rastrear ➔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
