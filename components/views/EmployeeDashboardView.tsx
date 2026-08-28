'use client';

import React, { useState } from 'react';
import { EmployeeProfile, AppView } from '@/types/ubi';
import { UbiLogo } from '@/components/common/UbiLogo';
import {
  Package,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Navigation,
  Car,
  Truck,
  ShoppingBag,
  Power,
  ShieldCheck,
  ChevronRight,
  Home,
  FileText,
  BarChart3,
  User,
  LogOut,
  Star,
  Check,
  Globe,
  Bell,
  CreditCard,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  Sparkles,
  Info,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import Image from 'next/image';

interface EmployeeDashboardViewProps {
  employee: EmployeeProfile;
  onNavigate: (view: AppView) => void;
  onOpenCall: (name: string, role: string, avatar: string) => void;
  onOpenTracking: (id: string) => void;
  onLogout: () => void;
}

interface PendingAssignment {
  id: string;
  type: 'carrera' | 'shopper' | 'delivery';
  title: string;
  eta: string;
  origin: string;
  destination: string;
  price: number;
  customerName: string;
  customerAvatar: string;
  customerRating: number;
}

export const EmployeeDashboardView: React.FC<EmployeeDashboardViewProps> = ({
  employee,
  onNavigate,
  onOpenCall,
  onOpenTracking,
  onLogout,
}) => {
  // Tab State: 'inicio' | 'asignaciones' | 'ganancias' | 'perfil'
  const [activeTab, setActiveTab] = useState<'inicio' | 'asignaciones' | 'ganancias' | 'perfil'>('asignaciones');

  // Employee State
  const [isActiveStatus, setIsActiveStatus] = useState(employee.status !== 'offline');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [paymentMethodsEnabled, setPaymentMethodsEnabled] = useState(true);

  // Active Assignment in Progress (matching Image 1)
  const [activeTrip, setActiveTrip] = useState({
    id: '#UBI-7890',
    type: 'Carrera Express',
    origin: 'Av. Paseo Meneses, frente a Farmatodo',
    destination: 'C.C. Las Virtudes, Ciudad Bolívar',
    customerName: 'Esteban R.',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    customerRating: 4.8,
    price: 6.30,
    etaMinutes: 14,
    status: 'En Curso',
  });

  // Pending Queue (matching Image 1)
  const [pendingAssignments, setPendingAssignments] = useState<PendingAssignment[]>([
    {
      id: '#UBI-4521',
      type: 'carrera',
      title: 'Carrera en Ruta',
      eta: '24.0 min',
      origin: 'Av. Paseo Meneses',
      destination: 'C.C. Las Virtudes',
      price: 5.80,
      customerName: 'Esteban R.',
      customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      customerRating: 4.9,
    },
    {
      id: '#UBI-4522',
      type: 'shopper',
      title: 'Compras Asistidas (Súper)',
      eta: '25.0 min',
      origin: 'Bodegón Río Orinoco',
      destination: 'Urb. Los Próceres, Manzana 4',
      price: 12.50,
      customerName: 'Carla Mendoza',
      customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      customerRating: 4.8,
    },
    {
      id: '#UBI-4523',
      type: 'delivery',
      title: 'Envío de Paquete Express',
      eta: '18.0 min',
      origin: 'Av. 5 de Julio, Casco Histórico',
      destination: 'Av. Jesús Soto, Edif. Orinoco',
      price: 4.50,
      customerName: 'Manuel D.',
      customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      customerRating: 5.0,
    },
  ]);

  // Modals
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile fields state
  const [profileData, setProfileData] = useState({
    name: 'Ramón Fuentes',
    role: 'Conductor (Nivel: Experto)',
    rating: 4.9,
    completedTrips: 1420,
    averageScore: 4.80,
    acceptanceRate: 98,
    vehicle: 'Toyota Corolla | Matrícula: AB 123 CD (Ciudad Bolívar) <2022>',
    phone: '+58 412 889 5522',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  });

  // Earnings Data (matching Images 2 & 3)
  const [earningsData, setEarningsData] = useState({
    today: 110.50,
    thisWeek: 650.00,
    totalAvailable: 785.00,
    history: [
      { id: '1', date: '12 de Octubre 2024', method: 'Pago Móvil', amount: 110.50, status: 'Completado', type: 'pagomovil' },
      { id: '2', date: '10 de Octubre 2024', method: 'Pago Móvil / P2P', amount: 650.00, status: 'Completado', type: 'p2p' },
      { id: '3', date: '05 de Octubre 2024', method: 'Pago Móvil', amount: 32.00, status: 'Completado', type: 'pagomovil' },
    ],
  });

  // Withdrawal form
  const [withdrawAmount, setWithdrawAmount] = useState('785.00');
  const [withdrawMethod, setWithdrawMethod] = useState<'pagomovil' | 'zelle' | 'binance' | 'banco'>('pagomovil');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAcceptPending = (assignment: PendingAssignment) => {
    // Move from pending to active
    setActiveTrip({
      id: assignment.id,
      type: assignment.title,
      origin: assignment.origin,
      destination: assignment.destination,
      customerName: assignment.customerName,
      customerAvatar: assignment.customerAvatar,
      customerRating: assignment.customerRating,
      price: assignment.price,
      etaMinutes: parseInt(assignment.eta) || 15,
      status: 'En Curso',
    });

    setPendingAssignments(prev => prev.filter(p => p.id !== assignment.id));
    showToast(`¡Asignación ${assignment.id} aceptada con éxito!`);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0 || amountNum > earningsData.totalAvailable) {
      alert('Por favor ingresa un monto válido dentro de tu saldo disponible.');
      return;
    }

    setWithdrawSuccess(true);
    setTimeout(() => {
      setEarningsData(prev => ({
        ...prev,
        totalAvailable: prev.totalAvailable - amountNum,
        history: [
          {
            id: String(Date.now()),
            date: 'Hoy (Procesado)',
            method: withdrawMethod === 'pagomovil' ? 'Pago Móvil' : withdrawMethod === 'zelle' ? 'Zelle' : 'Binance P2P',
            amount: amountNum,
            status: 'Completado',
            type: withdrawMethod,
          },
          ...prev.history,
        ],
      }));
      setWithdrawSuccess(false);
      setWithdrawModalOpen(false);
      showToast(`¡Retiro de $${amountNum.toFixed(2)} procesado exitosamente!`);
    }, 1200);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#0c2340] text-slate-800 min-h-screen relative pb-24 md:pb-16 select-none font-sans">
      
      {/* ========================================================
          SUB-HEADER TITLE BANNER (Directly beneath main Navbar)
          ======================================================== */}
      <div className="w-full bg-[#0c2340] text-white pt-3 pb-4 px-4 sm:px-6 shadow-sm border-b border-[#18365c]/60">
        <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {activeTab === 'asignaciones' && 'Mis Asignaciones'}
            {activeTab === 'ganancias' && 'Mis Ganancias'}
            {activeTab === 'perfil' && 'Perfil del Empleado'}
            {activeTab === 'inicio' && `Hola, ${profileData.name.split(' ')[0]}`}
          </h1>

          {/* Quick status pill indicator in title bar */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-semibold text-teal-300">
            <span className={`w-2 h-2 rounded-full ${isActiveStatus ? 'bg-[#2ec4b6] animate-pulse' : 'bg-slate-400'}`} />
            <span>{isActiveStatus ? 'En Ruta' : 'Pausado'}</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          BODY CONTENT AREA (Gray Canvas Container)
          ======================================================== */}
      <main className="flex-1 bg-[#f0f4f9] w-full pt-4 pb-8">
        <div className="max-w-md sm:max-w-xl mx-auto px-4 space-y-4">

          {/* ====================================================
              TAB 1: ASIGNACIONES (Exact replica of Image 1)
              ==================================================== */}
          {activeTab === 'asignaciones' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* SECTION: EN CURSO */}
              <div>
                <h2 className="text-base font-extrabold text-[#0c2340] mb-2 tracking-tight">
                  En Curso
                </h2>

                {/* Main En Curso Card */}
                <div className="bg-white rounded-3xl p-4 shadow-md border border-slate-100 overflow-hidden">
                  
                  {/* Embedded Interactive Vector Map Route */}
                  <div className="relative w-full h-52 bg-[#e8f1f5] rounded-2xl overflow-hidden border border-slate-200 shadow-inner mb-3">
                    
                    {/* Simulated Map SVG Roads & Grid */}
                    <svg className="w-full h-full" viewBox="0 0 400 220">
                      {/* Background grid */}
                      <rect width="400" height="220" fill="#eef4f7" />
                      
                      {/* Secondary streets */}
                      <path d="M 0 50 L 400 50" stroke="#dce5eb" strokeWidth="6" />
                      <path d="M 0 160 L 400 160" stroke="#dce5eb" strokeWidth="8" />
                      <path d="M 80 0 L 80 220" stroke="#dce5eb" strokeWidth="6" />
                      <path d="M 320 0 L 320 220" stroke="#dce5eb" strokeWidth="8" />

                      {/* Main Avenue: Av. Paseo Meneses */}
                      <path
                        d="M 50 180 Q 150 140 220 80 T 360 40"
                        stroke="#b8d5e5"
                        strokeWidth="14"
                        fill="none"
                        strokeLinecap="round"
                      />

                      {/* Active Blue Navigation Route Line */}
                      <path
                        d="M 60 170 Q 150 130 220 80 T 340 50"
                        stroke="#2ec4b6"
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="6 3"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />

                      {/* Origin Dot (Av. Paseo Meneses) */}
                      <circle cx="60" cy="170" r="6" fill="#0c2340" />
                      <circle cx="60" cy="170" r="3" fill="#2ec4b6" />

                      {/* Destination Pin (C.C. Las Virtudes) */}
                      <g transform="translate(330, 30)">
                        <path d="M 10 0 C 4.5 0 0 4.5 0 10 C 0 17.5 10 26 10 26 C 10 26 20 17.5 20 10 C 20 4.5 15.5 0 10 0 Z" fill="#2ec4b6" />
                        <circle cx="10" cy="10" r="4" fill="white" />
                      </g>

                      {/* Moving Car On Route */}
                      <g transform="translate(180, 95)">
                        <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#0c2340" />
                        <rect x="-10" y="-6" width="20" height="12" rx="2" fill="#204068" />
                        <circle cx="-7" cy="9" r="3" fill="#333" />
                        <circle cx="7" cy="9" r="3" fill="#333" />
                        <circle cx="-7" cy="-9" r="3" fill="#333" />
                        <circle cx="7" cy="-9" r="3" fill="#333" />
                      </g>

                      {/* Second Nearby Vehicle */}
                      <g transform="translate(280, 70)">
                        <rect x="-10" y="-6" width="20" height="12" rx="3" fill="#507299" />
                      </g>

                      {/* Street labels */}
                      <text x="35" y="195" fontSize="9" fill="#64748b" fontWeight="600">Av. Paseo Meneses</text>
                      <text x="260" y="30" fontSize="9" fill="#0c2340" fontWeight="700">C.C. Las Virtudes</text>
                    </svg>

                    {/* Top Left Icon Badges (Car & Grocery Bag) matching Image 1 */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <div className="w-8 h-8 rounded-xl bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                        <Car size={16} />
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-[#e5a93c] text-white flex items-center justify-center shadow-md">
                        <ShoppingBag size={16} />
                      </div>
                    </div>

                    {/* Floating ETA Tooltip Pills on map matching Image 1 */}
                    <div className="absolute top-1/2 left-[44%] -translate-y-8 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-md border border-slate-200 flex items-center gap-1 text-[10px] font-bold text-slate-800">
                      <Car size={10} className="text-[#0c2340]" />
                      <span>3 min</span>
                    </div>

                    <div className="absolute top-1/4 right-[22%] bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-md border border-slate-200 flex items-center gap-1 text-[10px] font-bold text-slate-800">
                      <Car size={10} className="text-[#0c2340]" />
                      <span>2 min</span>
                    </div>

                    {/* Zoom & Pin Map Controls (bottom right) */}
                    <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-10">
                      <div className="bg-white rounded-lg shadow-md border border-slate-200 flex flex-col overflow-hidden">
                        <button
                          onClick={() => showToast('Acercando mapa GPS...')}
                          className="p-1.5 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                          aria-label="Acercar"
                        >
                          <Plus size={12} />
                        </button>
                        <div className="h-[1px] bg-slate-200" />
                        <button
                          onClick={() => showToast('Alejando mapa GPS...')}
                          className="p-1.5 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                          aria-label="Alejar"
                        >
                          <Minus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Origen & Destino Text */}
                  <div className="space-y-1 text-xs mb-3 px-1">
                    <p className="text-slate-800 font-bold">
                      <span className="text-slate-500 font-semibold">Origen: </span>
                      {activeTrip.origin}
                    </p>
                    <p className="text-slate-800 font-bold">
                      <span className="text-slate-500 font-semibold">Destino: </span>
                      {activeTrip.destination}
                    </p>
                  </div>

                  {/* Customer Row & Fare/Time stats matching Image 1 */}
                  <div className="flex items-center justify-between pt-2 pb-3 px-1 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-xs">
                        <Image
                          src={activeTrip.customerAvatar}
                          alt={activeTrip.customerName}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0c2340] leading-tight">
                          {activeTrip.customerName}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span className="text-slate-700">{activeTrip.customerRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-black text-[#0c2340] leading-tight">
                        ${activeTrip.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        ~{activeTrip.etaMinutes} min
                      </p>
                    </div>
                  </div>

                  {/* Two Action Buttons: [Ver Detalles] and [Llamar Cliente] matching Image 1 */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => setDetailsModalOpen(true)}
                      className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-[#0c2340] border border-slate-300 rounded-full text-xs font-bold transition shadow-xs cursor-pointer text-center"
                    >
                      Ver Detalles
                    </button>

                    <button
                      onClick={() => onOpenCall(activeTrip.customerName, 'Cliente Asignado', activeTrip.customerAvatar)}
                      className="w-full py-2.5 px-3 bg-[#0c2340] hover:bg-[#16365e] text-white rounded-full text-xs font-bold transition shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Phone size={13} className="text-emerald-300" />
                      <span>Llamar Cliente</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION: PENDIENTES matching Image 1 */}
              <div>
                <h2 className="text-base font-extrabold text-[#0c2340] mb-2 tracking-tight">
                  Pendientes
                </h2>

                <div className="space-y-3">
                  {pendingAssignments.map((pending) => (
                    <div
                      key={pending.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 transition hover:shadow-md"
                    >
                      {/* Top Row: Icon badge + Title + Time pill */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#0c2340] text-white flex items-center justify-center shadow-xs">
                            {pending.type === 'carrera' && <Car size={18} />}
                            {pending.type === 'shopper' && <ShoppingBag size={18} />}
                            {pending.type === 'delivery' && <Truck size={18} />}
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-[#0c2340]">
                            {pending.title}
                          </span>
                        </div>

                        {/* Light Amber Pill */}
                        <div className="bg-[#fef3c7] text-[#92400e] px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-200/60">
                          {pending.eta}
                        </div>
                      </div>

                      {/* Origin & Destination */}
                      <div className="space-y-0.5 text-xs text-slate-700 pl-1 mb-3">
                        <p className="font-medium">
                          <span className="text-slate-400 font-normal">Origen: </span>
                          {pending.origin}
                        </p>
                        <p className="font-medium">
                          <span className="text-slate-400 font-normal">Destino: </span>
                          {pending.destination}
                        </p>
                      </div>

                      {/* Bottom Row: Customer summary + Aceptar Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200">
                            <Image
                              src={pending.customerAvatar}
                              alt={pending.customerName}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">
                            {pending.customerName} • <span className="font-bold text-emerald-600">${pending.price.toFixed(2)}</span>
                          </span>
                        </div>

                        {/* Solid Dark Blue Aceptar Button */}
                        <button
                          onClick={() => handleAcceptPending(pending)}
                          className="py-1.5 px-6 bg-[#0c2340] hover:bg-[#16365e] text-white rounded-full text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
                        >
                          Aceptar
                        </button>
                      </div>
                    </div>
                  ))}

                  {pendingAssignments.length === 0 && (
                    <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-slate-200">
                      <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700">No hay más pedidos pendientes en cola</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Te avisaremos automáticamente al entrar una nueva carrera.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* ====================================================
              TAB 2: GANANCIAS (Exact replica of Images 2 & 3)
              ==================================================== */}
          {activeTab === 'ganancias' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* CARD 1: EARNINGS SUMMARY matching Images 2 & 3 */}
              <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">
                <h2 className="text-base font-extrabold text-[#0c2340] mb-3 tracking-tight">
                  Earnings Summary
                </h2>

                {/* 3 Metric Columns */}
                <div className="grid grid-cols-3 gap-2 text-center pb-4 border-b border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-0.5">Hoy</p>
                    <p className="text-base sm:text-lg font-black text-[#0c2340]">
                      ${earningsData.today.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-0.5">Esta Semana</p>
                    <p className="text-base sm:text-lg font-black text-[#0c2340]">
                      ${earningsData.thisWeek.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold mb-0.5">Total</p>
                    <p className="text-base sm:text-lg font-black text-[#0c2340]">
                      ${earningsData.totalAvailable.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Large Teal Banner: Disponible para Cobrar */}
                <div className="mt-4 bg-gradient-to-r from-[#2ec4b6] to-[#20a396] text-white rounded-2xl p-4 text-center shadow-md">
                  <p className="text-xs font-semibold tracking-wide text-teal-100 mb-1">
                    Disponible para Cobrar
                  </p>
                  <p className="text-3xl sm:text-4xl font-black tracking-tight">
                    ${earningsData.totalAvailable.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* CARD 2: GANANCIAS SEMANALES (Interactive Bar & Trend Chart) */}
              <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">
                <h2 className="text-base font-extrabold text-[#0c2340] mb-4 tracking-tight">
                  Ganancias Semanales
                </h2>

                {/* Chart Container */}
                <div className="relative w-full h-48 sm:h-56 pt-2">
                  <svg className="w-full h-full" viewBox="0 0 360 180">
                    {/* Horizontal grid lines with Y values */}
                    <g className="text-[9px] fill-slate-400 font-semibold">
                      <line x1="30" y1="20" x2="350" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="5" y="24">400</text>

                      <line x1="30" y1="55" x2="350" y2="55" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="5" y="59">300</text>

                      <line x1="30" y1="90" x2="350" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="5" y="94">200</text>

                      <line x1="30" y1="125" x2="350" y2="125" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="5" y="129">110</text>

                      <line x1="30" y1="155" x2="350" y2="155" stroke="#e2e8f0" strokeWidth="1" />
                      <text x="15" y="158">0</text>
                    </g>

                    {/* Teal Bars for 7 days (Lu, Ma, Mi, Ju, Vi, Sa, Do) matching Image 2 & 3 */}
                    {/* Day 1: Lu ($30) */}
                    <rect x="42" y="145" width="16" height="10" rx="3" fill="#2ec4b6" className="hover:opacity-80 transition cursor-pointer" />
                    {/* Day 2: Ma ($230) */}
                    <rect x="87" y="75" width="16" height="80" rx="3" fill="#2ec4b6" className="hover:opacity-80 transition cursor-pointer" />
                    {/* Day 3: Mi ($150) */}
                    <rect x="132" y="105" width="16" height="50" rx="3" fill="#2ec4b6" className="hover:opacity-80 transition cursor-pointer" />
                    {/* Day 4: Ju ($260) */}
                    <rect x="177" y="65" width="16" height="90" rx="3" fill="#2ec4b6" className="hover:opacity-80 transition cursor-pointer" />
                    {/* Day 5: Vi ($130) */}
                    <rect x="222" y="112" width="16" height="43" rx="3" fill="#2ec4b6" className="hover:opacity-80 transition cursor-pointer" />
                    {/* Day 6: Sa ($350 - Peak) */}
                    <rect x="267" y="35" width="16" height="120" rx="3" fill="#2ec4b6" className="hover:opacity-80 transition cursor-pointer" />
                    {/* Day 7: Do ($250) */}
                    <rect x="312" y="70" width="16" height="85" rx="3" fill="#2ec4b6" className="hover:opacity-80 transition cursor-pointer" />

                    {/* Dark Navy Overlay Trend Line matching Image 2 */}
                    <path
                      d="M 50 145 L 95 75 L 140 105 L 185 65 L 230 112 L 275 35 L 320 70"
                      stroke="#0c2340"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* X-Axis Day Labels matching Image 2 */}
                    <g className="text-[10px] fill-slate-600 font-bold">
                      <text x="44" y="172">Lu</text>
                      <text x="89" y="172">Ma</text>
                      <text x="134" y="172">Mi</text>
                      <text x="179" y="172">Ju</text>
                      <text x="224" y="172">Vi</text>
                      <text x="269" y="172">Sa</text>
                      <text x="314" y="172">Do</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* CARD 3: HISTORIAL DE COBROS matching Images 2 & 3 */}
              <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-extrabold text-[#0c2340] tracking-tight">
                    Historial de Cobros
                  </h2>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Completado
                  </span>
                </div>

                {/* Cobros Rows */}
                <div className="space-y-3">
                  {earningsData.history.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2.5 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <Check size={16} strokeWidth={3} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0c2340]">
                            {item.status}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {item.date}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-black text-[#0c2340]">
                          ${item.amount.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-slate-500 font-semibold">
                          {item.method}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Retirar Ganancias Full-Width Teal Pill Button matching Images 2 & 3 */}
                <button
                  onClick={() => setWithdrawModalOpen(true)}
                  className="w-full mt-4 py-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white rounded-full text-sm font-bold transition shadow-sm cursor-pointer text-center active:scale-98"
                >
                  Retirar Ganancias
                </button>
              </div>

            </div>
          )}

          {/* ====================================================
              TAB 3: PERFIL (Exact replica of Image 4)
              ==================================================== */}
          {activeTab === 'perfil' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* TOP PROFILE BANNER: Central Avatar with Verified Badge */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 text-center relative overflow-hidden">
                {/* Decorative background curve */}
                <div className="absolute -top-12 left-0 right-0 h-28 bg-[#0c2340] rounded-b-[40px] opacity-10" />

                {/* Large Central Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-3 mt-1">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                    <Image
                      src={profileData.avatar}
                      alt={profileData.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Verified Check Badge matching Image 4 */}
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#2ec4b6] text-white flex items-center justify-center border-2 border-white shadow-md">
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>

                {/* Name & Role */}
                <h2 className="text-lg font-black text-[#0c2340] tracking-tight">
                  {profileData.name}
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  {profileData.role}
                </p>

                {/* 3 Metric Summary Boxes matching Image 4 */}
                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-center gap-0.5 text-amber-500 font-black text-sm">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span>{profileData.rating}</span>
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 leading-tight">
                      Carreras Completadas
                    </p>
                    <p className="text-[10px] text-slate-400">({profileData.completedTrips}+)</p>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-black text-[#0c2340]">
                      {profileData.averageScore.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 leading-tight">
                      Puntuación Promedio
                    </p>
                    <p className="text-[10px] text-emerald-600 font-bold">Excelente</p>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-black text-[#0c2340]">
                      {profileData.acceptanceRate}%
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold mt-1 leading-tight">
                      Aceptación de Viajes
                    </p>
                    <p className="text-[10px] text-teal-600 font-bold">Top 5%</p>
                  </div>
                </div>
              </div>

              {/* CARD 2: PERFIL DE INFORMACIÓN matching Image 4 */}
              <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 space-y-3">
                <h3 className="text-sm font-extrabold text-[#0c2340] tracking-tight">
                  Perfil de Información
                </h3>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-[#0c2340]">{profileData.name}</p>
                    <p className="text-[11px] text-slate-500">{profileData.phone}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-200/80 px-2.5 py-1 rounded-lg">
                    Punto Conductor Activo
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    {profileData.vehicle}
                  </p>
                </div>
              </div>

              {/* CARD 3: PREFERENCIAS & TOGGLES matching Image 4 */}
              <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 space-y-4">
                {/* Language Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#0c2340]">
                    <Globe size={16} className="text-slate-600" />
                    <span>Lenguaje / Idioma</span>
                  </div>

                  <div className="flex items-center bg-[#0c2340] rounded-full p-0.5 text-xs font-bold">
                    <button
                      onClick={() => setLanguage('es')}
                      className={`px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                        language === 'es' ? 'bg-[#2ec4b6] text-[#0c2340]' : 'text-white'
                      }`}
                    >
                      Es
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                        language === 'en' ? 'bg-[#2ec4b6] text-[#0c2340]' : 'text-white'
                      }`}
                    >
                      En
                    </button>
                  </div>
                </div>

                {/* Notifications Switch */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#0c2340]">
                    <Bell size={16} className="text-slate-600" />
                    <span>Notificaciones Push</span>
                  </div>

                  <button
                    onClick={() => {
                      setNotificationsEnabled(!notificationsEnabled);
                      showToast(notificationsEnabled ? 'Notificaciones silenciadas' : 'Notificaciones activadas');
                    }}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                      notificationsEnabled ? 'bg-[#2ec4b6] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                {/* Payment Methods Switch */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#0c2340]">
                    <CreditCard size={16} className="text-slate-600" />
                    <span>Métodos de Pago Activos</span>
                  </div>

                  <button
                    onClick={() => {
                      setPaymentMethodsEnabled(!paymentMethodsEnabled);
                      showToast(paymentMethodsEnabled ? 'Cobros en pausa' : 'Métodos de pago habilitados');
                    }}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                      paymentMethodsEnabled ? 'bg-[#2ec4b6] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
                  </button>
                </div>
              </div>

              {/* ACTION BUTTONS matching Image 4 */}
              <div className="space-y-2.5 pt-1">
                {/* Editar Perfil Teal Button */}
                <button
                  onClick={() => setEditProfileModalOpen(true)}
                  className="w-full py-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white rounded-full text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer text-center"
                >
                  Editar Perfil
                </button>

                {/* Cerrar Sesión White/Red Button */}
                <button
                  onClick={onLogout}
                  className="w-full py-3 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-full text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer text-center"
                >
                  Cerrar Sesión
                </button>
              </div>

            </div>
          )}

          {/* ====================================================
              TAB 4: INICIO (Operational Quick Dashboard)
              ==================================================== */}
          {activeTab === 'inicio' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Online/Offline Status Banner */}
              <div className="bg-white rounded-3xl p-4 shadow-md border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3.5 h-3.5 rounded-full ${
                      isActiveStatus ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-black text-[#0c2340]">
                      {isActiveStatus ? 'ESTADO: ACTIVO Y EN RUTA' : 'ESTADO: DESCONECTADO (Pausa)'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isActiveStatus ? 'Recibiendo solicitudes de Ciudad Bolívar' : 'Conéctate para aceptar viajes'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsActiveStatus(!isActiveStatus);
                    showToast(!isActiveStatus ? '¡Conectado a la red UBI!' : 'Has pausado tu disponibilidad');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                    isActiveStatus
                      ? 'bg-emerald-500/20 text-emerald-800 border border-emerald-400/40 hover:bg-emerald-500/30'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <Power size={13} />
                  <span>{isActiveStatus ? 'Pausar' : 'Conectar'}</span>
                </button>
              </div>

              {/* Active Trip Quick Preview */}
              <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-extrabold text-[#0c2340]">
                    Carrera en Curso
                  </h3>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
                    {activeTrip.status}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-3 space-y-1 text-xs">
                  <p className="font-bold text-slate-800">
                    <span className="text-slate-400 font-semibold">Cliente: </span>
                    {activeTrip.customerName} (★ {activeTrip.customerRating})
                  </p>
                  <p className="font-medium text-slate-700">
                    <span className="text-slate-400 font-semibold">Destino: </span>
                    {activeTrip.destination}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setActiveTab('asignaciones')}
                    className="py-2.5 px-3 bg-[#0c2340] hover:bg-[#16365e] text-white rounded-xl text-xs font-bold transition text-center cursor-pointer"
                  >
                    Ver en Asignaciones
                  </button>
                  <button
                    onClick={() => onOpenCall(activeTrip.customerName, 'Cliente', activeTrip.customerAvatar)}
                    className="py-2.5 px-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white rounded-xl text-xs font-bold transition text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Phone size={13} />
                    <span>Llamar</span>
                  </button>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab('ganancias')}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-left hover:shadow-md transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center mb-2">
                    <DollarSign size={18} />
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">Saldo Disponible</p>
                  <p className="text-base font-black text-[#0c2340]">${earningsData.totalAvailable.toFixed(2)}</p>
                  <p className="text-[10px] text-teal-600 font-bold mt-1">Ver Ganancias →</p>
                </button>

                <button
                  onClick={() => setActiveTab('perfil')}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-left hover:shadow-md transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                    <Award size={18} />
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">Nivel de Conductor</p>
                  <p className="text-base font-black text-[#0c2340]">Experto (4.9 ★)</p>
                  <p className="text-[10px] text-amber-600 font-bold mt-1">Ver Perfil →</p>
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ========================================================
          BOTTOM TAB NAVIGATION BAR matching Screenshots 1, 2, 3, 4
          ======================================================== */}
      <nav
        aria-label="Navegación del Conductor UBI"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-2xl px-2 py-2 flex items-center justify-around max-w-md sm:max-w-xl mx-auto rounded-t-2xl"
        id="employee-bottom-navbar"
      >
        {/* Tab 1: Inicio */}
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center justify-center transition cursor-pointer ${
            activeTab === 'inicio'
              ? 'py-1.5 px-4 bg-[#2ec4b6] text-white rounded-xl shadow-xs font-bold'
              : 'py-1 px-3 text-slate-500 hover:text-[#0c2340] font-semibold'
          }`}
          id="tab-inicio"
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5">Inicio</span>
        </button>

        {/* Tab 2: Asignaciones (Active style matches Screenshot 1 & 2) */}
        <button
          onClick={() => setActiveTab('asignaciones')}
          className={`flex flex-col items-center justify-center transition cursor-pointer ${
            activeTab === 'asignaciones'
              ? 'py-1.5 px-4 bg-[#2ec4b6] text-white rounded-xl shadow-xs font-bold'
              : 'py-1 px-3 text-slate-500 hover:text-[#0c2340] font-semibold'
          }`}
          id="tab-asignaciones"
        >
          <FileText size={18} />
          <span className="text-[10px] mt-0.5">Asignaciones</span>
        </button>

        {/* Tab 3: Ganancias */}
        <button
          onClick={() => setActiveTab('ganancias')}
          className={`flex flex-col items-center justify-center transition cursor-pointer ${
            activeTab === 'ganancias'
              ? 'py-1.5 px-4 bg-[#2ec4b6] text-white rounded-xl shadow-xs font-bold'
              : 'py-1 px-3 text-slate-500 hover:text-[#0c2340] font-semibold'
          }`}
          id="tab-ganancias"
        >
          <BarChart3 size={18} />
          <span className="text-[10px] mt-0.5">Ganancias</span>
        </button>

        {/* Tab 4: Perfil */}
        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex flex-col items-center justify-center transition cursor-pointer ${
            activeTab === 'perfil'
              ? 'py-1.5 px-4 bg-[#2ec4b6] text-white rounded-xl shadow-xs font-bold'
              : 'py-1 px-3 text-slate-500 hover:text-[#0c2340] font-semibold'
          }`}
          id="tab-perfil"
        >
          <User size={18} />
          <span className="text-[10px] mt-0.5">Perfil</span>
        </button>
      </nav>

      {/* ========================================================
          MODAL: DETALLES DE ASIGNACIÓN
          ======================================================== */}
      {detailsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0c2340]">
                Detalles del Viaje {activeTrip.id}
              </h3>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <p className="font-semibold text-slate-500">Punto de Recogida (Origen):</p>
                <p className="font-bold text-slate-800">{activeTrip.origin}</p>
                <p className="font-semibold text-slate-500 pt-1">Punto de Entrega (Destino):</p>
                <p className="font-bold text-slate-800">{activeTrip.destination}</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-teal-50 rounded-xl text-[#0c2340]">
                <div>
                  <p className="font-semibold text-slate-600">Tarifa Estimada:</p>
                  <p className="text-base font-black text-[#00a896]">${activeTrip.price.toFixed(2)} USD</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-600">Tiempo de Ruta:</p>
                  <p className="text-sm font-bold text-slate-800">~{activeTrip.etaMinutes} minutos</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{activeTrip.customerName}</p>
                  <p className="text-[11px] text-slate-500">Calificación ★ {activeTrip.customerRating}</p>
                </div>
                <button
                  onClick={() => {
                    setDetailsModalOpen(false);
                    onOpenCall(activeTrip.customerName, 'Cliente', activeTrip.customerAvatar);
                  }}
                  className="py-1.5 px-3 bg-[#0c2340] text-white rounded-lg text-xs font-bold"
                >
                  Llamar
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setDetailsModalOpen(false);
                showToast('Navegación GPS iniciada hacia el destino');
              }}
              className="w-full py-2.5 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white rounded-full text-xs font-bold transition shadow-sm cursor-pointer text-center"
            >
              Iniciar Navegación GPS
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: RETIRAR GANANCIAS
          ======================================================== */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0c2340]">
                Retirar Ganancias UBI
              </h3>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Monto a Retirar (USD):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-slate-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    max={earningsData.totalAvailable}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-black text-sm text-[#0c2340] focus:ring-2 focus:ring-[#2ec4b6] outline-hidden"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Saldo disponible: <span className="font-bold text-emerald-600">${earningsData.totalAvailable.toFixed(2)} USD</span>
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Método de Pago:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('pagomovil')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      withdrawMethod === 'pagomovil'
                        ? 'border-[#2ec4b6] bg-teal-50 text-[#0c2340] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-xs">Pago Móvil</p>
                    <p className="text-[10px] text-slate-500">Banesco / Mercantil</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('zelle')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      withdrawMethod === 'zelle'
                        ? 'border-[#2ec4b6] bg-teal-50 text-[#0c2340] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-xs">Zelle (USD)</p>
                    <p className="text-[10px] text-slate-500">Sin comisiones</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('binance')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      withdrawMethod === 'binance'
                        ? 'border-[#2ec4b6] bg-teal-50 text-[#0c2340] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-xs">Binance Pay</p>
                    <p className="text-[10px] text-slate-500">USDT P2P</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('banco')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      withdrawMethod === 'banco'
                        ? 'border-[#2ec4b6] bg-teal-50 text-[#0c2340] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-xs">Transf. Bancaria</p>
                    <p className="text-[10px] text-slate-500">Banesco / BDV</p>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={withdrawSuccess}
                className="w-full mt-2 py-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white rounded-full text-xs font-bold transition shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                {withdrawSuccess ? (
                  <span>Procesando Retiro...</span>
                ) : (
                  <span>Confirmar y Transferir Ganancias</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDITAR PERFIL
          ======================================================== */}
      {editProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#0c2340]">
                Editar Perfil del Empleado
              </h3>
              <button
                onClick={() => setEditProfileModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditProfileModalOpen(false);
                showToast('Perfil actualizado correctamente');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-hidden focus:ring-2 focus:ring-[#2ec4b6]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Teléfono:</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-hidden focus:ring-2 focus:ring-[#2ec4b6]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vehículo y Placa:</label>
                <textarea
                  rows={2}
                  value={profileData.vehicle}
                  onChange={(e) => setProfileData({ ...profileData, vehicle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-hidden focus:ring-2 focus:ring-[#2ec4b6]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white rounded-full text-xs font-bold transition shadow-sm cursor-pointer text-center"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0c2340] text-white px-4 py-2.5 rounded-full shadow-2xl border border-teal-400/50 flex items-center gap-2 text-xs font-bold animate-fadeIn">
          <Sparkles size={14} className="text-teal-300" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
