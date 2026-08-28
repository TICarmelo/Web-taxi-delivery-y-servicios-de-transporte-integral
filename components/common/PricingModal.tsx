'use client';

import React from 'react';
import Image from 'next/image';
import { 
  X, 
  MessageSquare, 
  ExternalLink,
  Tag,
  ArrowRight
} from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOpenBrandWeb = () => {
    window.open('https://www.ticarmelo.com', '_blank', 'noopener,noreferrer');
  };

  const handleAcquireViaWhatsapp = () => {
    const text = encodeURIComponent(
      '¡Hola TICARMELO! Estoy interesado en adquirir la solución web y plataforma tecnológica para transporte/delivery con la promoción especial de 30 días.'
    );
    window.open(`https://wa.me/17866057557?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0c2340] border border-teal-500/30 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow accents */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#2ec4b6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#0077b6]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Close Button */}
        <button
          onClick={onClose}
          id="btn-close-pricing-modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header with Logo & Brand Title */}
          <div className="flex flex-col items-center text-center pt-2">
            <button
              onClick={handleOpenBrandWeb}
              id="btn-brand-header-link"
              className="group flex flex-col items-center cursor-pointer transition focus:outline-none"
              title="Visitar www.ticarmelo.com"
            >
              {/* Central Logo Container */}
              <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-teal-400/40 p-2 shadow-lg mb-3 group-hover:scale-105 group-hover:border-teal-300 transition-all flex items-center justify-center overflow-hidden">
                <Image
                  src="/ticarmelo/logo.png"
                  alt="TICARMELO Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback to /logo.png if needed
                    const target = e.target as HTMLImageElement;
                    target.src = '/logo.png';
                  }}
                />
              </div>

              {/* Title Header with Link Indicator */}
              <div className="flex items-center gap-1.5 text-teal-400 group-hover:text-teal-300 transition">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-teal-300 transition">
                  © TICARMELO
                </h2>
                <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" />
              </div>
              <span className="text-[11px] text-teal-400/80 font-semibold tracking-wide uppercase mt-0.5">
                Proveedor Tecnológico Oficial • www.ticarmelo.com
              </span>
            </button>
            <p className="text-xs text-slate-300 max-w-md mt-2 leading-relaxed">
              Ecosistema tecnológico integral para negocios de movilidad, fletes, mandados y delivery en tiempo real.
            </p>
          </div>

          {/* Core Features & Natural Capabilities List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              Características y Alcance de la Plataforma
            </h3>

            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">Portal de Clientes Autónomo:</strong> Cotizador de carreras, shopper y encomiendas en tiempo real, mapas vectoriales interactivos y pasarelas de pago directo.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">App de Conductor / Repartidor:</strong> Cola de asignaciones activas, llamadas directas, billetera de saldo, gráficos de rendimiento semanal y gestión de retiros.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">Mando Central & Auditoría:</strong> Supervisión de flotas en vivo, control de estados (En Ruta/Offline), reportes contables, alertas de flujo crítico y trazabilidad.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">Panel de Gestión Interna de Contenido (CMS):</strong> Área administrativa para que el dueño actualice textos, imágenes, tarifas zonales y banners sin depender del programador.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  <strong className="text-white">Infraestructura Nube & Soporte:</strong> Servidores de alta disponibilidad, copias de seguridad diarias, certificados SSL y soporte de TICARMELO.
                </span>
              </li>
            </ul>
          </div>

          {/* Pricing & Commercial Structure */}
          <div className="bg-gradient-to-br from-[#123156] to-[#0c2340] border border-teal-500/40 rounded-2xl p-5 relative overflow-hidden shadow-lg">
            
            {/* Promo 30 Days Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm">
                <Tag size={12} />
                Promoción Especial 30 Días
              </span>
              <span className="text-[11px] text-teal-300 font-semibold">
                Suscripción Tecnológica SaaS
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3">
              
              {/* Setup Fee */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">1. Setup & Despliegue Inicial</span>
                  <span className="text-[10px] text-slate-300">
                    Configuración de marca, pasarelas, base de datos y capacitación
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through mr-1.5">$1,800 USD</span>
                  <span className="text-base font-extrabold text-[#2ec4b6]">$650 USD</span>
                </div>
              </div>

              {/* Monthly Subscription Fee */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">2. Mensualidad Plataforma & Soporte</span>
                  <span className="text-[10px] text-slate-300">
                    Hosting nube, choferes ilimitados, backups y soporte técnico TICARMELO
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through mr-1.5">$350 USD/m</span>
                  <span className="text-base font-extrabold text-teal-300">$120 USD<span className="text-[10px] text-slate-300 font-normal">/mes</span></span>
                </div>
              </div>

            </div>

            <p className="text-[10px] text-slate-300 text-center mt-3 italic">
              * Tarifa promocional garantizada y congelada durante los primeros 30 días de contratación.
            </p>
          </div>

          {/* Action Button: Adquirir Web -> WhatsApp */}
          <div className="pt-1">
            <button
              onClick={handleAcquireViaWhatsapp}
              id="btn-acquire-web-whatsapp"
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#2ec4b6] to-[#00b4d8] hover:from-[#25a99d] hover:to-[#0096c7] text-[#0c2340] font-black rounded-xl text-sm transition-all shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
              <span>Adquirir Web con Proveedor (+1 786-605-7557)</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
