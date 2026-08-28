'use client';

import React from 'react';
import { AppView } from '@/types/ubi';
import { Truck, ShoppingBag, Car, ChevronRight, Clock } from 'lucide-react';

interface ServicesHubViewProps {
  onNavigate: (view: AppView) => void;
}

export const ServicesHubView: React.FC<ServicesHubViewProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'delivery' as AppView,
      title: 'Pide Delivery',
      subtitle: 'Envíos Rápidos & Encomiendas',
      tag: 'Entrega Exprés',
      description:
        'Envío de documentos, paquetes, encomiendas y compras directas con mensajeros motorizados verificados en toda Ciudad Bolívar.',
      priceStarting: 'Desde $1.50',
      eta: '10 – 20 min',
      icon: <Truck size={24} className="text-[#2ec4b6]" />,
      features: ['Rastreo satelital en vivo', 'Confirmación de entrega con firma', 'Motorizados verificados'],
    },
    {
      id: 'personal_shopper' as AppView,
      title: 'Compras Asistidas',
      subtitle: 'Personal Shopper Exclusivo',
      tag: 'Concierge de Compras',
      description:
        'Un asistente dedicado realiza tus compras en supermercados, farmacias y bodegones selectos con comunicación en tiempo real.',
      priceStarting: 'Comisión desde $3.00',
      eta: '30 – 50 min',
      icon: <ShoppingBag size={24} className="text-[#2ec4b6]" />,
      features: ['Chat directo con fotos en vivo', 'Factura fiscal física detallada', 'Preservación de cadena de frío'],
    },
    {
      id: 'ride_hailing' as AppView,
      title: 'Pide Carrera',
      subtitle: 'Transporte Urbano Seguro',
      tag: 'Movilidad Urbana',
      description:
        'Traslados ejecutivos y familiares en vehículos confortables con conductores certificados, tarifa transparente fijada previamente y monitoreo.',
      priceStarting: 'Tarifa desde $2.00',
      eta: 'Llegada en 3 – 5 min',
      icon: <Car size={24} className="text-[#2ec4b6]" />,
      features: ['Categorías Estándar, Confort y XL 6 Pax', 'Botón de asistencia SOS', 'Pago Móvil, Zelle o Efectivo'],
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8fafc] min-h-[calc(100vh-80px)] pb-24 md:pb-12 text-[#0c2340]">
      {/* Top Header - Pure Elegant Minimal Typography, NO badge pill, NO sparkle icon */}
      <div className="bg-[#0c2340] text-white pt-8 pb-10 px-5 sm:px-8 text-center relative border-b border-white/10 shadow-sm">
        <div className="max-w-md sm:max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Nuestros Servicios
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm mx-auto leading-relaxed">
            Selecciona el servicio que necesitas en Ciudad Bolívar
          </p>
        </div>
      </div>

      {/* 3 Luxury & Elegant Service Cards Container */}
      <div className="max-w-md sm:max-w-xl mx-auto px-4 -mt-5 w-full space-y-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            onClick={() => onNavigate(srv.id)}
            className="group bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl border border-slate-200/90 hover:border-[#2ec4b6]/60 transition-all duration-300 cursor-pointer relative overflow-hidden active:scale-[0.99]"
            id={`service-card-${srv.id}`}
          >
            {/* Top Row: Luxury Icon Container + Title + Arrow Action */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#0c2340] border border-[#0c2340]/10 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                  {srv.icon}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#0c2340] group-hover:text-teal-700 transition leading-tight tracking-tight">
                    {srv.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500">
                    {srv.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#2ec4b6] group-hover:text-white flex items-center justify-center text-slate-400 transition-all duration-200 flex-shrink-0">
                <ChevronRight size={16} />
              </div>
            </div>

            {/* Subtle Minimal Tag */}
            <div className="mb-2.5">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
                {srv.tag}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 font-normal leading-relaxed mb-3.5">
              {srv.description}
            </p>

            {/* Features Bullet List */}
            <div className="space-y-1.5 mb-4 pt-3 border-t border-slate-100">
              {srv.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ec4b6]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Bottom Meta Row */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Clock size={13} className="text-[#2ec4b6]" />
                <span className="text-[11px]">{srv.eta}</span>
              </div>
              <span className="font-bold text-[#0c2340] group-hover:text-[#2ec4b6] transition flex items-center gap-1 text-[11px] sm:text-xs">
                <span>{srv.priceStarting}</span>
                <ChevronRight size={13} className="text-[#2ec4b6]" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
