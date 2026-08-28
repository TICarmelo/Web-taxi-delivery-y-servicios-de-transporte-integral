'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AppView, PastOrder, UserProfile } from '@/types/ubi';
import {
  BicycleCourierIllustration,
  ShopperGirlIllustration,
  ScooterCourierCardIllustration,
  PersonalShopperCardIllustration,
  RideHailingCardIllustration,
  LeftBackdropCityCard,
  RightBackdropCityCard,
  BotanicalLeafCluster,
} from '@/components/common/VectorIllustrations';
import { Search, ChevronUp } from 'lucide-react';
import { INITIAL_PAST_ORDERS } from '@/data/mockData';
import { motion } from 'motion/react';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  onOpenTracking: (query: string, orderData?: PastOrder) => void;
  userProfile?: UserProfile;
  isLoggedIn?: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  onNavigate, 
  onOpenTracking,
  userProfile,
  isLoggedIn = false,
}) => {
  const [trackingQuery, setTrackingQuery] = useState('');

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingQuery.trim()) {
      onOpenTracking('#7890', INITIAL_PAST_ORDERS[2]);
    } else {
      const match = INITIAL_PAST_ORDERS.find(
        (o) =>
          o.id.toLowerCase().includes(trackingQuery.toLowerCase()) ||
          o.title.toLowerCase().includes(trackingQuery.toLowerCase())
      );
      onOpenTracking(trackingQuery, match || INITIAL_PAST_ORDERS[0]);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f4f7fb]">
      {/* HERO SECTION: Deep Navy Blue matching reference visual layout */}
      <section className="relative w-full bg-[#0c2340] text-white pt-10 pb-28 sm:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background ambient gradients */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#2ec4b6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#1d4ed8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Hero Visual Composition Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4"
          >
            {/* Left City Backdrop Card (Visible on lg screens) */}
            <div className="hidden xl:block flex-shrink-0 transform hover:scale-[1.02] transition duration-300">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#132c4d]/80">
                <LeftBackdropCityCard className="w-48 h-44" />
              </div>
            </div>

            {/* Cyclist Courier Illustration */}
            <div className="hidden md:block flex-shrink-0 transform hover:-translate-y-1 transition duration-300">
              <BicycleCourierIllustration className="w-48 h-36 lg:w-56 lg:h-40" />
            </div>

            {/* Center: Hero Typography & 3 Action Pill Buttons */}
            <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
              {/* Main Headline with UBI in green matching instruction */}
              {isLoggedIn && userProfile ? (
                <div className="mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs text-teal-300 font-semibold mb-2 border border-white/10">
                    <span>Sesión de Cliente Activa</span>
                  </div>
                  <h1
                    className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-white tracking-tight leading-[1.15] mb-2 text-center"
                    style={{ letterSpacing: '-0.025em' }}
                  >
                    Hola, {userProfile.name.split(' ')[0]}!!
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6 font-normal">
                    Tu plataforma inteligente de delivery, compras asistidas y transporte urbano en Ciudad Bolívar.
                  </p>
                </div>
              ) : (
                <>
                  <h1
                    className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-white tracking-tight leading-[1.15] mb-3 text-center"
                    style={{ letterSpacing: '-0.025em' }}
                  >
                    <span className="text-[#2ec4b6]">UBI:</span> Tu Ciudad, Tus<br />
                    Servicios, Simplificados.
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6 font-normal">
                    Tu plataforma inteligente de delivery, compras asistidas y transporte urbano en Ciudad Bolívar.
                  </p>
                </>
              )}

              {/* 3 Action Pill Buttons matching exact style in a single row */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 w-full flex-wrap sm:flex-nowrap">
                {/* Button 1: Pide Delivery */}
                <button
                  onClick={() => onNavigate('delivery')}
                  className="py-2.5 px-5 sm:px-6 bg-[#2ec4b6] hover:bg-[#25b5a8] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-teal-950/40 transition text-center cursor-pointer whitespace-nowrap"
                  id="hero-btn-pide-delivery"
                >
                  Pide Delivery
                </button>

                {/* Button 2: Pide Compras Asistidas */}
                <button
                  onClick={() => onNavigate('personal_shopper')}
                  className="py-2.5 px-5 sm:px-6 bg-[#2ec4b6] hover:bg-[#25b5a8] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-teal-950/40 transition text-center cursor-pointer whitespace-nowrap"
                  id="hero-btn-pide-compras"
                >
                  Pide Compras Asistidas
                </button>

                {/* Button 3: Pide Carrera */}
                <button
                  onClick={() => onNavigate('ride_hailing')}
                  className="py-2.5 px-5 sm:px-6 bg-[#d4a373] hover:bg-[#c99564] active:scale-[0.98] text-[#0c2340] font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-amber-950/40 transition text-center cursor-pointer whitespace-nowrap"
                  id="hero-btn-pide-carrera"
                >
                  Pide Carrera
                </button>
              </div>
            </div>

            {/* Shopper Girl Illustration */}
            <div className="hidden md:block flex-shrink-0 transform hover:-translate-y-1 transition duration-300">
              <ShopperGirlIllustration className="w-48 h-36 lg:w-56 lg:h-40" />
            </div>

            {/* Right City Backdrop Card (Visible on lg screens) */}
            <div className="hidden xl:block flex-shrink-0 transform hover:scale-[1.02] transition duration-300">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#132c4d]/80">
                <RightBackdropCityCard className="w-48 h-44" />
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 3 FLOATING SERVICE FEATURE CARDS with Scroll-reveal animation */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 z-20 w-full mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Pide Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onNavigate('delivery')}
            className="group relative bg-white rounded-3xl p-7 shadow-xl hover:shadow-2xl border border-slate-100/80 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
            id="service-card-delivery"
          >
            {/* Organic Botanical Leaf at bottom right corner */}
            <div className="absolute right-0 bottom-0 pointer-events-none transform translate-x-2 translate-y-2 group-hover:scale-110 transition-transform duration-300">
              <BotanicalLeafCluster className="w-28 h-28 text-teal-600" />
            </div>

            {/* Card Illustration */}
            <div className="flex items-center justify-center py-2 mb-2">
              <ScooterCourierCardIllustration className="w-44 h-32 transform group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-extrabold text-[#0c2340] mb-2 tracking-tight">
                Pide Delivery
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[260px]">
                Envíos rápidos de encomiendas, paquetes, comida y documentos directo a tu puerta en Ciudad Bolívar.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Pide Compras Asistidas */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onNavigate('personal_shopper')}
            className="group relative bg-white rounded-3xl p-7 shadow-xl hover:shadow-2xl border border-slate-100/80 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
            id="service-card-compras"
          >
            {/* Organic Botanical Leaf at bottom right corner */}
            <div className="absolute right-0 bottom-0 pointer-events-none transform translate-x-2 translate-y-2 group-hover:scale-110 transition-transform duration-300">
              <BotanicalLeafCluster className="w-28 h-28 text-emerald-600" />
            </div>

            {/* Card Illustration */}
            <div className="flex items-center justify-center py-2 mb-2">
              <PersonalShopperCardIllustration className="w-44 h-32 transform group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-extrabold text-[#0c2340] mb-2 tracking-tight">
                Pide Compras Asistidas
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[260px]">
                Un shopper dedicado va al supermercado o farmacia, busca tus marcas favoritas y te consulta en tiempo real.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Pide Carrera */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onNavigate('ride_hailing')}
            className="group relative bg-white rounded-3xl p-7 shadow-xl hover:shadow-2xl border border-slate-100/80 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
            id="service-card-carrera"
          >
            {/* Organic Botanical Leaf at bottom right corner */}
            <div className="absolute right-0 bottom-0 pointer-events-none transform translate-x-2 translate-y-2 group-hover:scale-110 transition-transform duration-300">
              <BotanicalLeafCluster className="w-28 h-28 text-teal-600" />
            </div>

            {/* Card Illustration */}
            <div className="flex items-center justify-center py-2 mb-2">
              <RideHailingCardIllustration className="w-44 h-32 transform group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-extrabold text-[#0c2340] mb-2 tracking-tight">
                Pide Carrera
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[260px]">
                Transporte urbano seguro, conductores certificados, autos climatizados y tarifas fijas transparentes.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* RASTREAR MI PEDIDO SECTION with scroll reveal animation */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto px-4 sm:px-6 w-full mb-20 text-center relative"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c2340] mb-6 tracking-tight">
          Rastrear mi Pedido
        </h2>

        {/* Search Bar Form with rounded pill & circular search button */}
        <form onSubmit={handleTrackingSubmit} className="relative max-w-xl mx-auto mb-6">
          <div className="relative flex items-center shadow-md hover:shadow-lg rounded-full overflow-hidden border border-slate-200 focus-within:border-[#2ec4b6] bg-white transition-all">
            <input
              type="text"
              value={trackingQuery}
              onChange={(e) => setTrackingQuery(e.target.value)}
              placeholder="Buscar un past pedido..."
              className="w-full py-3.5 pl-6 pr-14 text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-normal"
              id="tracking-search-input"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0c2340] hover:bg-[#14325a] active:scale-95 text-white flex items-center justify-center shadow-sm transition cursor-pointer"
              id="tracking-search-submit"
              title="Buscar pedido"
            >
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Quick Recent Chips for seamless testing */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400">Ejemplos:</span>
          {INITIAL_PAST_ORDERS.map((order) => (
            <button
              key={order.id}
              onClick={() => onOpenTracking(order.id, order)}
              className="px-3 py-1 bg-white hover:bg-teal-50 hover:text-[#00a896] border border-slate-200 rounded-full font-medium transition shadow-2xs cursor-pointer"
            >
              {order.id}
            </button>
          ))}
        </div>
      </motion.section>

      {/* TICARMELO MOCKUP SHOWCASE (Placed between tracking and footer) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md mx-auto px-4 sm:px-6 w-full mb-16 flex flex-col items-center justify-center text-center"
      >
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center">
          <Image
            src="/homepage/mockupticarmelo.png"
            alt="UBI App Mockup TICARMELO"
            width={320}
            height={400}
            className="w-auto h-auto max-h-[380px] object-contain drop-shadow-xl"
            priority={false}
          />
        </div>
      </motion.section>

      {/* Floating Scroll to Top Button matching image bottom right ^ */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-xl border border-slate-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Volver arriba"
        id="scroll-to-top-btn"
      >
        <ChevronUp size={20} className="text-slate-700" />
      </button>
    </div>
  );
};
