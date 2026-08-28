'use client';

import React from 'react';
import { X, CheckCircle2, Clock, MapPin, Truck, Car, ShoppingBag, ArrowRight } from 'lucide-react';
import { PastOrder } from '@/types/ubi';
import Image from 'next/image';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderQuery?: string;
  initialQuery?: string;
  orderData?: PastOrder | null;
  onNavigateToView?: (view: string) => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  isOpen,
  onClose,
  orderQuery,
  initialQuery = '#7890',
  orderData,
  onNavigateToView,
}) => {
  if (!isOpen) return null;

  const query = orderQuery || initialQuery;
  const orderTitle = orderData?.title || `Pedido ${query.toUpperCase()}`;
  const status = orderData?.status || 'En camino';
  const driverName = orderData?.driverOrShopperName || 'Esteban R. (Conductor Asignado)';
  const driverAvatar =
    orderData?.driverOrShopperAvatar ||
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center font-bold">
              <Truck size={20} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00a896]">
                Rastreador en Tiempo Real
              </span>
              <h3 className="text-lg font-bold text-[#0c2340] leading-tight">{orderTitle}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
            id="close-tracking-modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Tracker Stepper */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span className="text-teal-700 font-bold flex items-center gap-1">
              <CheckCircle2 size={14} className="text-[#00a896]" /> Confirmado
            </span>
            <span className="text-teal-700 font-bold flex items-center gap-1">
              <CheckCircle2 size={14} className="text-[#00a896]" /> En Preparación
            </span>
            <span className="text-[#0c2340] font-extrabold flex items-center gap-1">
              <Clock size={14} className="text-amber-500 animate-spin" /> {status}
            </span>
            <span className="text-slate-400">Entregado</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
            <div className="w-3/4 bg-gradient-to-r from-[#00a896] to-teal-400 rounded-full animate-pulse" />
          </div>

          <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200/60 text-xs">
            <span className="text-slate-600 font-medium">Estimado de Entrega:</span>
            <span className="text-sm font-extrabold text-[#0c2340]">12 - 18 minutos</span>
          </div>
        </div>

        {/* Assigned Agent / Driver Card */}
        <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500">
              <Image
                src={driverAvatar}
                alt={driverName}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Agente Asignado</p>
              <h4 className="text-sm font-bold text-[#0c2340]">{driverName}</h4>
              <p className="text-xs text-emerald-600 font-medium">En ruta a Ciudad Bolívar</p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2.5 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-lg">
              ⭐ 4.9
            </span>
          </div>
        </div>

        {/* Destination Info */}
        <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl">
          <div className="flex items-start gap-2">
            <MapPin size={15} className="text-[#00a896] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#0c2340]">Destino de entrega:</span>
              <p>Av. Germania, Qta. Los Rosales, Ciudad Bolívar</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              onClose();
              if (onNavigateToView) onNavigateToView('ride_hailing');
            }}
            className="flex-1 py-3 px-4 bg-[#0c2340] hover:bg-[#081a30] text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
            id="view-live-map-from-modal"
          >
            <span>Ver en Mapa En Vivo</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
