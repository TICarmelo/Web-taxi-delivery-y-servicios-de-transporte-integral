'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UbiLogo } from '@/components/common/UbiLogo';
import { AppView } from '@/types/ubi';
import { ShieldCheck, MapPin, Phone, Mail, Heart, Tag } from 'lucide-react';
import { PricingModal } from '@/components/common/PricingModal';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  return (
    <footer className="w-full bg-[#081a30] text-slate-300 pt-12 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <UbiLogo size="md" variant="light" showSubtitle={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              UBI es la plataforma integral de movilidad, compras asistidas y delivery exprés diseñada para Ciudad Bolívar, Estado Bolívar, Venezuela.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold">
              <ShieldCheck size={16} />
              <span>Conductores y Shoppers verificados</span>
            </div>
          </div>

          {/* Col 2: Servicios */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Servicios</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('delivery')}
                  className="hover:text-teal-300 transition"
                >
                  Pide Delivery Exprés
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('personal_shopper')}
                  className="hover:text-teal-300 transition"
                >
                  Compras Asistidas (Personal Shopper)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ride_hailing')}
                  className="hover:text-teal-300 transition"
                >
                  Pide Carrera (Transporte Urbano)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-teal-300 transition"
                >
                  Seguimiento de Envíos en Tiempo Real
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cobertura en Ciudad Bolívar */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Zonas de Cobertura</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-teal-400 flex-shrink-0" />
                <span>Paseo Meneses & Casco Histórico</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-teal-400 flex-shrink-0" />
                <span>Av. Germania & Los Próceres</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-teal-400 flex-shrink-0" />
                <span>Av. Jesús Soto & Aeropuerto</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-teal-400 flex-shrink-0" />
                <span>Av. 17 de Diciembre & Vista Hermosa</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Métodos de Pago & Contacto */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Pagos & Soporte</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 bg-white/10 rounded-md text-[11px] font-bold text-white">
                Pago Móvil
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md text-[11px] font-bold text-white">
                Zelle
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md text-[11px] font-bold text-white">
                Visa / Master
              </span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md text-[11px] font-bold text-white">
                Efectivo USD
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-1.5">
                <Phone size={12} className="text-teal-400" />
                <span>WhatsApp Soporte: +58 424 987-UBI-01</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail size={12} className="text-teal-400" />
                <span>contact@ticarmelo.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Administrative Portal Access Banner / Section */}
        <div className="py-4 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/[0.02] px-4 rounded-xl my-4">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="font-medium">Panel de Control & Supervisión Central de Ciudad Bolívar</span>
          </div>
          <button
            onClick={() => {
              onNavigate('admin_area');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="btn-footer-admin-area"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c2340] hover:bg-[#15345a] text-white border border-teal-500/40 hover:border-teal-400 rounded-lg text-xs font-bold transition shadow-sm hover:shadow-md cursor-pointer group"
          >
            <ShieldCheck size={15} className="text-teal-400 group-hover:scale-110 transition-transform" />
            <span>Área Administrativa</span>
            <span className="text-[10px] bg-teal-400/20 text-teal-300 font-semibold px-2 py-0.5 rounded border border-teal-400/30">
              Mando Central
            </span>
          </button>
        </div>

        {/* Bottom Bar: Copyright & PRECIO WEB Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TICARMELO. Todos los derechos reservados.</p>

          {/* PRECIO WEB Button with TICARMELO Logo */}
          <button
            onClick={() => setIsPricingModalOpen(true)}
            id="btn-footer-precio-web"
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-[#0c2340] to-[#163860] hover:from-[#133358] hover:to-[#1e497a] text-white border border-teal-400/50 hover:border-teal-300 rounded-xl text-xs font-bold transition shadow-md hover:shadow-teal-500/20 cursor-pointer group"
          >
            {/* Logo Image */}
            <div className="w-5 h-5 rounded-md overflow-hidden bg-white/10 flex items-center justify-center relative flex-shrink-0 border border-teal-400/30">
              <Image
                src="/ticarmelo/logo.png"
                alt="TICARMELO"
                width={20}
                height={20}
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/logo.png';
                }}
              />
            </div>
            
            <span className="tracking-wide text-teal-300 group-hover:text-white transition">
              PRECIO WEB
            </span>

            <span className="text-[9px] bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded-full font-extrabold border border-teal-400/40">
              Promo 30 Días
            </span>
          </button>

          <p className="flex items-center gap-1 text-[11px] text-slate-400">
            Hecho para conectar tu ciudad con calidad y confianza
          </p>
        </div>
      </div>

      {/* Commercial Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </footer>
  );
};
