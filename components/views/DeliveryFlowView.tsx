'use client';

import React, { useState } from 'react';
import { UserProfile, PastOrder } from '@/types/ubi';
import { ScooterCourierCardIllustration } from '@/components/common/VectorIllustrations';
import {
  Truck,
  MapPin,
  Package,
  User,
  Phone,
  FileText,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeliveryFlowViewProps {
  userProfile: UserProfile;
  onOpenTracking: (query: string, orderData?: PastOrder) => void;
}

export const DeliveryFlowView: React.FC<DeliveryFlowViewProps> = ({
  userProfile,
  onOpenTracking,
}) => {
  const [pickupAddr, setPickupAddr] = useState('Av. Germania, Qta. Los Rosales');
  const [dropoffAddr, setDropoffAddr] = useState('Paseo Meneses, C.C. Bolívar Plaza');
  const [recipientName, setRecipientName] = useState('Mariana Gómez');
  const [recipientPhone, setRecipientPhone] = useState('+58 412 8877665');
  const [packageType, setPackageType] = useState<'sobre' | 'pequeno' | 'mediano' | 'comida'>('pequeno');
  const [notes, setNotes] = useState('Entregar en recepción con Mariana.');
  const [isOrdered, setIsOrdered] = useState(false);
  const [trackingCode, setTrackingCode] = useState('UBI-DEL-4091');

  const prices = {
    sobre: { usd: 3.0, bs: 318 },
    pequeno: { usd: 4.5, bs: 477 },
    mediano: { usd: 7.0, bs: 742 },
    comida: { usd: 4.0, bs: 424 },
  };

  const handleOrderDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `UBI-DEL-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingCode(newCode);
    setIsOrdered(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f7fb] py-8 px-4 sm:px-6 lg:px-8 pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Top Hero Banner */}
        <div className="bg-[#0c2340] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 bg-white/10 text-teal-300 rounded-full text-xs font-bold mb-3 border border-white/10">
              <span>Delivery Exprés en Minutos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
              Pide Delivery en Ciudad Bolívar
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Enviamos documentos, encomiendas, compras o alimentos con repartidores motorizados verificados en toda la ciudad.
            </p>
          </div>

          <div className="flex-shrink-0">
            <ScooterCourierCardIllustration className="w-36 h-28 sm:w-44 sm:h-32" />
          </div>
        </div>

        {/* Delivery Order Form */}
        {!isOrdered ? (
          <form onSubmit={handleOrderDelivery} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Cols: Addresses & Recipient */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-4">
              <h3 className="font-extrabold text-lg text-[#0c2340] border-b border-slate-100 pb-3">
                Detalles del Envío
              </h3>

              {/* Punto de Recogida */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Punto de Recogida (Origen)
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-teal-500">
                  <MapPin size={16} className="text-[#00a896] mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={pickupAddr}
                    onChange={(e) => setPickupAddr(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#0c2340] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Punto de Entrega */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Punto de Entrega (Destino)
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-teal-500">
                  <MapPin size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={dropoffAddr}
                    onChange={(e) => setDropoffAddr(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#0c2340] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Nombre del Destinatario
                  </label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-teal-500">
                    <User size={16} className="text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#0c2340] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Teléfono del Destinatario
                  </label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-teal-500">
                    <Phone size={16} className="text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="tel"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#0c2340] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Instrucciones o Referencias para el Repartidor
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Right 5 Cols: Package Size & Quote */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-5">
              <h3 className="font-extrabold text-lg text-[#0c2340] border-b border-slate-100 pb-3">
                Tamaño del Paquete
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'sobre', label: 'Sobre / Documento', icon: '📄', desc: 'Hasta 500g' },
                  { id: 'pequeno', label: 'Paquete Pequeño', icon: '📦', desc: 'Hasta 3kg' },
                  { id: 'mediano', label: 'Caja Mediana', icon: '🛍️', desc: 'Hasta 8kg' },
                  { id: 'comida', label: 'Comida / Alimentos', icon: '🍔', desc: 'Con bolso térmico' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPackageType(item.id as any)}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      packageType === item.id
                        ? 'border-[#00a896] bg-teal-50/60 shadow-xs ring-2 ring-teal-400/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <div>
                      <p className="font-extrabold text-xs text-[#0c2340] leading-tight">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Price summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-slate-600 font-medium">Tarifa estimada:</span>
                  <span className="text-2xl font-extrabold text-[#0c2340]">
                    ${prices[packageType].usd.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Equivalente en Bolívares:</span>
                  <span className="font-bold text-teal-700">{prices[packageType].bs} Bs</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2ec4b6] hover:bg-[#20b2a5] active:scale-[0.99] text-[#0c2340] font-extrabold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
                id="submit-delivery-request"
              >
                <Truck size={18} />
                <span>Solicitar Delivery Ahora</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-xl mx-auto text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-teal-100 text-[#00a896] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} />
            </div>

            <h3 className="text-2xl font-extrabold text-[#0c2340] mb-1">
              ¡Delivery Asignado con Éxito!
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Tu repartidor motorizado está en camino al punto de recogida en Ciudad Bolívar.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 text-left mb-6 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Código de Rastreo:</span>
                <span className="font-extrabold text-teal-700">{trackingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destinatario:</span>
                <span className="font-bold text-[#0c2340]">{recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tiempo Estimado:</span>
                <span className="font-bold text-slate-800">15 - 20 minutos</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onOpenTracking(trackingCode)}
                className="flex-1 py-3 bg-[#0c2340] hover:bg-[#081a30] text-white font-bold text-xs rounded-xl transition"
              >
                Rastrear Envío en Vivo
              </button>
              <button
                onClick={() => setIsOrdered(false)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Nuevo Envío
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
