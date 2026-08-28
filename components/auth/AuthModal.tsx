'use client';

import React, { useState } from 'react';
import { UbiLogo } from '@/components/common/UbiLogo';
import { UserProfile, EmployeeProfile } from '@/types/ubi';
import { User, ShoppingBag, Eye, EyeOff, X, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export type AuthModalStep = 'select_type' | 'client_login' | 'client_register' | 'employee_login';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClient: (user: UserProfile) => void;
  onLoginEmployee: (employee: EmployeeProfile) => void;
  initialStep?: AuthModalStep;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginClient,
  onLoginEmployee,
  initialStep = 'select_type',
}) => {
  const [step, setStep] = useState<AuthModalStep>(initialStep);
  const [showPassword, setShowPassword] = useState(false);

  // Client form state
  const [clientEmail, setClientEmail] = useState('carlos.mendoza@gmail.com');
  const [clientPassword, setClientPassword] = useState('••••••••••••');
  const [clientName, setClientName] = useState('Carlos Mendoza');
  const [clientPhone, setClientPhone] = useState('+58 414 852 1199');

  // Employee form state
  const [employeeId, setEmployeeId] = useState('EMP-4512');
  const [employeePassword, setEmployeePassword] = useState('••••••••••••');

  if (!isOpen) return null;

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const demoClient: UserProfile = {
      id: 'usr_carlos_01',
      name: clientName || 'Carlos Mendoza',
      email: clientEmail || 'carlos.mendoza@gmail.com',
      phone: clientPhone || '+58 414 852 1199',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      city: 'Ciudad Bolívar',
      role: 'Cliente Frecuente',
      rating: 4.9,
      totalTrips: 18,
      savedAddresses: [
        {
          id: 'addr_1',
          label: 'Casa',
          address: 'Av. Germania, Qta. Los Rosales',
          details: 'Portón blanco, timbre a la derecha',
          isDefault: true,
        },
        {
          id: 'addr_2',
          label: 'Oficina',
          address: 'Paseo Meneses, Torre Bolívar, Piso 3',
          details: 'Oficina 302',
        },
      ],
      paymentMethods: [
        {
          id: 'pay_1',
          type: 'pagomovil',
          title: 'Pago Móvil Banesco',
          details: '0134 - CI 20.458.123 - 0414-8521199',
          isDefault: true,
        },
        {
          id: 'pay_2',
          type: 'zelle',
          title: 'Zelle',
          details: 'carlos.mendoza@gmail.com',
        },
      ],
    };
    onLoginClient(demoClient);
    onClose();
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const demoEmployee: EmployeeProfile = {
      id: 'emp_jose_4512',
      employeeCode: employeeId || 'EMP-4512',
      name: 'José Hernández',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      roleTitle: 'Conductor',
      phone: '+58 412 998 3344',
      status: 'active',
      todayCompletedCount: 9,
      todayEarningsUsd: 110.50,
      todayOnlineTime: '6h 30m',
      activeAssignment: {
        id: '#4512',
        type: 'Delivery',
        destination: 'Ciudad Bolívar, Av. Jesús Soto',
        status: 'En Camino',
        customerName: 'Dra. Valentina Ramos',
        customerPhone: '+58 414 789 4411',
      },
      recentActivities: [
        { id: '1', type: 'Carrera', time: '11:30 AM', status: 'Completada', amount: '+$14.00' },
        { id: '2', type: 'Delivery', time: '10:15 AM', status: 'Completada', amount: '+$8.50' },
        { id: '3', type: 'Personal Shopper', time: '09:00 AM', status: 'Completada', amount: '+$18.00' },
        { id: '4', type: 'Carrera', time: '07:45 AM', status: 'Completada', amount: '+$12.00' },
      ],
    };
    onLoginEmployee(demoEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Container styled matching Exact Reference Screens */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#0c2340] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-[520px]">
        {/* Subtle background skyline outline matching Screenshots 2 & 3 */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-end">
          <svg className="w-full h-48 text-teal-200 fill-current" viewBox="0 0 400 150" preserveAspectRatio="none">
            <path d="M0,150 L0,120 L30,120 L30,90 L40,90 L40,120 L70,120 L70,80 L85,60 L100,80 L100,120 L130,120 L130,100 L160,100 L160,70 L170,70 L170,120 L210,120 L210,50 L220,30 L230,50 L230,120 L270,120 L270,95 L295,95 L295,120 L330,120 L330,75 L350,75 L350,120 L400,120 L400,150 Z" />
            <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        </div>

        {/* Top Header Bar with Close and Back */}
        <div className="relative z-10 p-5 flex items-center justify-between">
          {step !== 'select_type' ? (
            <button
              onClick={() => setStep('select_type')}
              className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
              title="Volver"
            >
              <ArrowLeft size={16} />
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
            title="Cerrar"
          >
            <X size={16} />
          </button>
        </div>

        {/* SCREEN 1: SELECT TYPE (Bienvenido a UBI) matching Reference Screen 1 */}
        {step === 'select_type' && (
          <div className="relative z-10 px-6 pb-8 flex-1 flex flex-col justify-between items-center text-center">
            {/* UBI Logo Pin & Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-500/20 border border-teal-400/40 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 rounded-full bg-[#2ec4b6] flex items-center justify-center text-[#0c2340] font-black text-xs">
                    ★
                  </div>
                </div>
                <span className="text-3xl font-black text-white tracking-tight">UBI</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Bienvenido a UBI
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Selecciona tu tipo de cuenta para continuar
              </p>
            </div>

            {/* 2 Options Cards: SOY CLIENTE / SOY EMPLEADO */}
            <div className="w-full space-y-3.5 mb-6">
              {/* Card 1: Soy Cliente */}
              <button
                onClick={() => setStep('client_login')}
                className="w-full bg-white rounded-2xl p-4 sm:p-5 text-left flex items-center gap-4 shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer border border-slate-100 group"
                id="btn-select-soy-cliente"
              >
                <div className="w-12 h-12 rounded-full bg-teal-50 text-[#2ec4b6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2ec4b6] group-hover:text-white transition">
                  <User size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-black text-[#0c2340] tracking-wider uppercase">
                    SOY CLIENTE
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                    Accede a tus servicios, compras y traslados personalizados.
                  </p>
                </div>
              </button>

              {/* Card 2: Soy Empleado */}
              <button
                onClick={() => setStep('employee_login')}
                className="w-full bg-white rounded-2xl p-4 sm:p-5 text-left flex items-center gap-4 shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer border border-slate-100 group"
                id="btn-select-soy-empleado"
              >
                <div className="w-12 h-12 rounded-full bg-teal-50 text-[#2ec4b6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2ec4b6] group-hover:text-white transition">
                  <ShoppingBag size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-black text-[#0c2340] tracking-wider uppercase">
                    SOY EMPLEADO
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                    Gestiona tus asignaciones, entregas y carreras activas.
                  </p>
                </div>
              </button>
            </div>

            {/* Footer Prompt */}
            <div className="text-xs text-slate-300">
              <span>¿Eres nuevo? </span>
              <button
                onClick={() => setStep('client_register')}
                className="font-bold text-white hover:text-teal-300 underline underline-offset-2 cursor-pointer"
              >
                Regístrate
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: CLIENT LOGIN matching Reference Screen 2 */}
        {step === 'client_login' && (
          <div className="relative z-10 px-6 pb-8 flex-1 flex flex-col justify-between">
            {/* White Login Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-[#0c2340] text-center mb-5 tracking-tight">
                Login Cliente
              </h2>

              <form onSubmit={handleClientSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0c2340] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="correo@gmail.com"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0c2340] mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={clientPassword}
                      onChange={(e) => setClientPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full py-2.5 pl-4 pr-10 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => alert('Se ha enviado un enlace de recuperación a tu correo')}
                    className="text-[11px] font-semibold text-slate-600 hover:text-[#0c2340] cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Iniciar Sesión Teal Pill Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition cursor-pointer active:scale-[0.99] mt-2"
                  id="btn-iniciar-sesion-cliente"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>

            {/* Bottom Register Prompt */}
            <div className="text-center text-xs text-slate-300 mt-4">
              <span>¿No tienes cuenta? </span>
              <button
                onClick={() => setStep('client_register')}
                className="font-bold text-white hover:text-teal-300 underline underline-offset-2 cursor-pointer"
              >
                Regístrate
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2B: CLIENT REGISTER */}
        {step === 'client_register' && (
          <div className="relative z-10 px-6 pb-8 flex-1 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-[#0c2340] text-center mb-4 tracking-tight">
                Crear Cuenta Cliente
              </h2>

              <form onSubmit={handleClientSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0c2340] mb-0.5">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full py-2 px-3.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0c2340] mb-0.5">
                    Teléfono (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+58 414 000 0000"
                    className="w-full py-2 px-3.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0c2340] mb-0.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="correo@gmail.com"
                    className="w-full py-2 px-3.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0c2340] mb-0.5">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full py-2 px-3.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white font-bold text-sm rounded-full shadow-md transition cursor-pointer mt-2"
                >
                  Completar Registro
                </button>
              </form>
            </div>

            <div className="text-center text-xs text-slate-300 mt-4">
              <span>¿Ya tienes cuenta? </span>
              <button
                onClick={() => setStep('client_login')}
                className="font-bold text-white hover:text-teal-300 underline cursor-pointer"
              >
                Inicia Sesión
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: EMPLOYEE LOGIN matching Reference Screen 3 */}
        {step === 'employee_login' && (
          <div className="relative z-10 px-6 pb-8 flex-1 flex flex-col justify-between">
            {/* White Login Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-[#0c2340] text-center mb-5 tracking-tight">
                Login Empleado
              </h2>

              <form onSubmit={handleEmployeeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0c2340] mb-1">
                    ID
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="ID de Empleado (Ej: EMP-4512)"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6] transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0c2340] mb-1">
                    Credenciales
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={employeePassword}
                      onChange={(e) => setEmployeePassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full py-2.5 pl-4 pr-10 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#2ec4b6] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => alert('Contacta a soporte técnico central de UBI para restablecer tus credenciales de empleado')}
                    className="text-[11px] font-semibold text-slate-600 hover:text-[#0c2340] cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Iniciar Sesión Teal Pill Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition cursor-pointer active:scale-[0.99] mt-2"
                  id="btn-iniciar-sesion-empleado"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>

            {/* Bottom Support Prompt */}
            <div className="text-center text-xs text-slate-300 mt-4">
              <span>¿Eres nuevo conductor o repartidor? </span>
              <button
                onClick={() => alert('Para registrarte como empleado, comunícate con la oficina principal de UBI en Ciudad Bolívar')}
                className="font-bold text-white hover:text-teal-300 underline underline-offset-2 cursor-pointer"
              >
                Solicitar Registro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
