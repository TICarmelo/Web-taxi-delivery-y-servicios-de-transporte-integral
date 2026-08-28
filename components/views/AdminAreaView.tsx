'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AppView } from '@/types/ubi';
import { 
  Users, 
  DollarSign, 
  Grid, 
  Truck, 
  Headphones, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  UserCheck, 
  FileText, 
  Lock, 
  Filter, 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShoppingBag,
  ExternalLink,
  PlusCircle,
  Eye,
  Edit,
  RotateCcw,
  Sliders,
  Car
} from 'lucide-react';

interface AdminAreaViewProps {
  onNavigate: (view: AppView) => void;
}

type AdminSubView = 'central' | 'usuarios' | 'finanzas' | 'operativa' | 'logistica' | 'soporte' | 'seguridad';
type SidebarTab = 'perfil' | 'activos' | 'reportes' | 'auditoria' | 'permisos';

export const AdminAreaView: React.FC<AdminAreaViewProps> = ({ onNavigate }) => {
  const [subView, setSubView] = useState<AdminSubView>('central');
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('perfil');
  const [clientSearch, setClientSearch] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState<'all' | 'Conductor' | 'Repartidor'>('all');
  const [selectedUserModal, setSelectedUserModal] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Mock Clients Data matching Image 2
  const clientsData = [
    {
      id: 'C-10234',
      name: 'Admin Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      location: 'Ciudad Bolívar',
      services: 'Servicios Utilizados',
      balance: '$500',
      lastActivity: '18/15/2023',
      rating: '4.9',
      trips: 45
    },
    {
      id: 'C-10235',
      name: 'Abrtera Gertil',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      location: 'Ciudad Bolívar',
      services: 'Servicios Utilizados',
      balance: '$500',
      lastActivity: '19/15/2023',
      rating: '4.8',
      trips: 38
    },
    {
      id: 'C-10256',
      name: 'Nombre Completo',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      location: 'Caracas',
      services: 'Ciudad Bolívar',
      balance: '$7.00',
      lastActivity: '18/15/2023',
      rating: '5.0',
      trips: 12
    },
    {
      id: 'C-10257',
      name: 'Darina Completo',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      location: 'Caracas',
      services: 'Servicios Utilizados',
      balance: '$1.000',
      lastActivity: '18/15/2023',
      rating: '4.7',
      trips: 84
    },
    {
      id: 'C-10258',
      name: 'Benox Tarff.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
      location: 'Caracas',
      services: 'Ciudad Bolívar',
      balance: '$3.00',
      lastActivity: '18/15/2023',
      rating: '4.6',
      trips: 19
    },
    {
      id: 'C-10289',
      name: 'Nombre Contirio',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      location: 'Ciudad Bolívar',
      services: 'Servicios',
      balance: '$300',
      lastActivity: '18/15/2023',
      rating: '4.9',
      trips: 62
    },
    {
      id: 'C-10390',
      name: 'Janna Garnigm',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
      location: 'Caracas',
      services: 'Servicios',
      balance: '$500',
      lastActivity: '18/15/2023',
      rating: '4.8',
      trips: 27
    }
  ];

  // Mock Employees Data matching Image 2
  const employeesData = [
    {
      id: 'E-2051',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      name: 'Nombre Completo',
      role: 'Conductor',
      location: 'Ciudad Bolívar',
      status: 'En Ruta',
      lastOrder: '18/15/2023',
      vehicle: 'Toyota Corolla (AB123CD)'
    },
    {
      id: 'E-2052',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      name: 'Esteban San R.',
      role: 'Conductor',
      location: 'Ciudad Bolívar',
      status: 'En Ruta',
      lastOrder: '18/15/2023',
      vehicle: 'Chevrolet Aveo (XY987ZT)'
    },
    {
      id: 'E-2033',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      name: 'James Oarlo',
      role: 'Repartidor',
      location: 'Ciudad Bolívar',
      status: 'Disponible',
      lastOrder: '18/15/2023',
      vehicle: 'Moto Bera SBR (M-4421)'
    },
    {
      id: 'E-2053',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      name: 'Torota Ralas',
      role: 'Repartidor',
      location: 'Ciudad Bolívar',
      status: 'Disponible',
      lastOrder: '18/15/2023',
      vehicle: 'Moto Empire Keeway (M-8902)'
    },
    {
      id: 'E-2051',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      name: 'Jusetra Admin',
      role: 'Repartidor',
      location: 'Ciudad Bolívar',
      status: 'Off-line',
      lastOrder: '18/15/2023',
      vehicle: 'Bicicleta Urbana (B-102)'
    },
    {
      id: 'E-2058',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      name: 'Suranna Mamo',
      role: 'Repartidor',
      location: 'Ciudad Bolívar',
      status: 'Off-line',
      lastOrder: '18/15/2023',
      vehicle: 'Moto Yamaha (M-7711)'
    }
  ];

  const filteredClients = clientsData.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
    c.location.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.id.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const filteredEmployees = employeesData.filter(e => 
    employeeFilter === 'all' ? true : e.role === employeeFilter
  );

  return (
    <div className="w-full min-h-screen bg-[#e8f1fa] text-slate-800 font-sans pb-16">
      
      {/* ========================================================
          TOP NAVBAR: Exactly matching reference images
          ======================================================== */}
      <header className="w-full bg-white border-b border-[#d2e3f3] sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: UBI Brand with Teal Pin & Star */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-[#2ec4b6] flex items-center justify-center shadow-sm relative">
              <MapPin size={20} className="text-[#0c2340] fill-[#0c2340]" />
              <Star size={8} className="text-white fill-white absolute top-2 right-2" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0c2340]">UBI</span>
          </div>

          {/* Center: Navigation Links matching Reference Design */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-[#2ec4b6] transition cursor-pointer"
            >
              Inicio
            </button>
            <button 
              onClick={() => onNavigate('services')} 
              className="hover:text-[#2ec4b6] transition cursor-pointer"
            >
              Servicios
            </button>
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-[#2ec4b6] transition cursor-pointer"
            >
              Cómo Funciona
            </button>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="hover:text-[#2ec4b6] transition cursor-pointer"
            >
              Área del Usuario
            </button>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="hover:text-[#2ec4b6] transition cursor-pointer"
            >
              Mis Pedidos
            </button>
          </nav>

          {/* Right: [Mis Pedidos] button & Supper-Admin Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#fbf5e8] text-[#8c6b2d] border border-[#f0e3c5] hover:bg-[#f6ebd4] rounded-lg text-xs font-bold transition shadow-2xs"
            >
              <ShoppingBag size={14} className="text-[#8c6b2d]" />
              <span>Mis Pedidos</span>
            </button>

            {/* Admin Avatar & Pill */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 relative shadow-2xs">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                  alt="Super-Admin"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-[#0c2340] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-slate-700">
                <span className="hidden sm:inline">Supper-Admin Saendi</span>
                <span className="sm:hidden">Admin</span>
              </div>
            </div>

            {/* Return to Home / Exit Admin */}
            <button
              onClick={() => onNavigate('home')}
              title="Volver a la App Principal"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* ========================================================
            PAGE HEADER / TITLE BAR WITH MODULE NAVIGATION
            ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              <span>Supervisión Central de Operaciones</span>
              <span>•</span>
              <span>Ciudad Bolívar, VE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
              {subView === 'central' ? 'UBI: Plataforma de Mando Central' : 'UBI: Gestión Global de Usuarios'}
            </h1>
          </div>

          {/* Module View Toggle */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#d2e3f3] shadow-xs">
            <button
              onClick={() => setSubView('central')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                subView === 'central' 
                  ? 'bg-[#0c2340] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Mando Central
            </button>
            <button
              onClick={() => setSubView('usuarios')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                subView === 'usuarios' 
                  ? 'bg-[#0c2340] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Gestión de Usuarios
            </button>
          </div>
        </div>

        {/* ========================================================
            VIEW 1: UBI PLATAFORMA DE MANDO CENTRAL (Matching Image 1)
            ======================================================== */}
        {subView === 'central' && (
          <div className="space-y-6">
            
            {/* Top Row Layout: Left Super-Admin Sidebar Card + 6 Top Module Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* LEFT: Super-Admin Profile Card (Matching Image 1 Left Section) */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#d2e3f3] shadow-sm flex flex-col items-center text-center">
                {/* Large Avatar */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#e9f2fa] shadow-md mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
                    alt="Super-Admin"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Verified Badge */}
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#2ec4b6] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                  </div>
                </div>

                <h3 className="text-lg font-black text-[#0c2340] leading-tight">Super-Admin</h3>
                <p className="text-xs text-slate-500 italic mb-5">Maximum Administrator</p>

                {/* Sidebar Navigation */}
                <div className="w-full space-y-1 text-left text-xs font-semibold">
                  <button
                    onClick={() => {
                      setActiveSidebarTab('perfil');
                      showToast('Visualizando Perfil de Super-Admin');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
                      activeSidebarTab === 'perfil'
                        ? 'bg-[#eef6fc] text-[#0c2340] font-bold border-l-4 border-[#2ec4b6]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <UserCheck size={16} className={activeSidebarTab === 'perfil' ? 'text-[#2ec4b6]' : 'text-slate-400'} />
                    <span>Mi Perfil</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarTab('activos');
                      setSubView('usuarios');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
                      activeSidebarTab === 'activos'
                        ? 'bg-[#eef6fc] text-[#0c2340] font-bold border-l-4 border-[#2ec4b6]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Users size={16} className="text-slate-400" />
                    <span>Personal Activos</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarTab('reportes');
                      showToast('Generando Reportes Analíticos de Ciudad Bolívar...');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
                      activeSidebarTab === 'reportes'
                        ? 'bg-[#eef6fc] text-[#0c2340] font-bold border-l-4 border-[#2ec4b6]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <FileText size={16} className="text-slate-400" />
                    <span>Reportes Analíticos</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarTab('auditoria');
                      showToast('Abriendo registros de Auditoría Operativa');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
                      activeSidebarTab === 'auditoria'
                        ? 'bg-[#eef6fc] text-[#0c2340] font-bold border-l-4 border-[#2ec4b6]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <RotateCcw size={16} className="text-slate-400" />
                    <span>Auditoría</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSidebarTab('permisos');
                      showToast('Nivel de Acceso: CONTROL TOTAL (Super-Admin)');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
                      activeSidebarTab === 'permisos'
                        ? 'bg-[#eef6fc] text-[#0c2340] font-bold border-l-4 border-[#2ec4b6]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Lock size={16} className="text-slate-400" />
                    <span>Permisos Especiales</span>
                  </button>
                </div>
              </div>

              {/* RIGHT: Top 6 Navy Module Cards (Matching Image 1 Top Grid) */}
              <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                
                {/* Module 1: Gestión Global de Usuarios */}
                <button
                  onClick={() => setSubView('usuarios')}
                  className="bg-[#0c2340] hover:bg-[#143258] text-white p-3.5 rounded-2xl flex flex-col items-center justify-between text-center transition-all transform hover:-translate-y-0.5 shadow-sm border border-[#1d3d66] cursor-pointer group h-36"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#2ec4b6] group-hover:scale-110 transition-transform">
                    <Users size={20} />
                  </div>
                  <p className="text-[11px] font-bold leading-tight line-clamp-3">
                    Gestión Global de Usuarios (Clientes y Empleados)
                  </p>
                </button>

                {/* Module 2: Administración Financiera & Contabilidad */}
                <button
                  onClick={() => showToast('Módulo de Administración Financiera & Contabilidad Activo')}
                  className="bg-[#0c2340] hover:bg-[#143258] text-white p-3.5 rounded-2xl flex flex-col items-center justify-between text-center transition-all transform hover:-translate-y-0.5 shadow-sm border border-[#1d3d66] cursor-pointer group h-36"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#2ec4b6] group-hover:scale-110 transition-transform">
                    <DollarSign size={20} />
                  </div>
                  <p className="text-[11px] font-bold leading-tight line-clamp-3">
                    Administración Financiera & Contabilidad
                  </p>
                </button>

                {/* Module 3: Áreas Operativas */}
                <button
                  onClick={() => showToast('Módulo de Áreas Operativas & Organización Interna')}
                  className="bg-[#0c2340] hover:bg-[#143258] text-white p-3.5 rounded-2xl flex flex-col items-center justify-between text-center transition-all transform hover:-translate-y-0.5 shadow-sm border border-[#1d3d66] cursor-pointer group h-36"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#2ec4b6] group-hover:scale-110 transition-transform">
                    <Grid size={20} />
                  </div>
                  <p className="text-[11px] font-bold leading-tight line-clamp-3">
                    Áreas Operativas (Organización Interna)
                  </p>
                </button>

                {/* Module 4: Logística Avanzada */}
                <button
                  onClick={() => showToast('Módulo de Logística Avanzada y Despachos en Tiempo Real')}
                  className="bg-[#0c2340] hover:bg-[#143258] text-white p-3.5 rounded-2xl flex flex-col items-center justify-between text-center transition-all transform hover:-translate-y-0.5 shadow-sm border border-[#1d3d66] cursor-pointer group h-36"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#2ec4b6] group-hover:scale-110 transition-transform">
                    <Sliders size={20} />
                  </div>
                  <p className="text-[11px] font-bold leading-tight line-clamp-3">
                    Logística Avanzada
                  </p>
                </button>

                {/* Module 5: Soporte Aote Élite */}
                <button
                  onClick={() => showToast('Módulo de Soporte y Atención Élite a Clientes y Conductores')}
                  className="bg-[#0c2340] hover:bg-[#143258] text-white p-3.5 rounded-2xl flex flex-col items-center justify-between text-center transition-all transform hover:-translate-y-0.5 shadow-sm border border-[#1d3d66] cursor-pointer group h-36"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#2ec4b6] group-hover:scale-110 transition-transform">
                    <Truck size={20} />
                  </div>
                  <p className="text-[11px] font-bold leading-tight line-clamp-3">
                    Soporte Aote Élite
                  </p>
                </button>

                {/* Module 6: Seguridad & Permisos */}
                <button
                  onClick={() => showToast('Módulo de Seguridad, Encriptación y Control de Permisos')}
                  className="bg-[#0c2340] hover:bg-[#143258] text-white p-3.5 rounded-2xl flex flex-col items-center justify-between text-center transition-all transform hover:-translate-y-0.5 shadow-sm border border-[#1d3d66] cursor-pointer group h-36"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#2ec4b6] group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-[11px] font-bold leading-tight line-clamp-3">
                    Seguridad & Permisos
                  </p>
                </button>
              </div>
            </div>

            {/* Mid Grid: 4 Interactive Performance & Tracking Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Widget 1: Estadísticas Vitales en Tiempo Real */}
              <div className="bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#0c2340]">Estadísticas Vitales en Tiempo Real</h4>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>

                {/* Chart Y-Axis + 12 Bars */}
                <div className="h-32 flex items-end justify-between gap-1 pt-2 pb-1 border-b border-slate-100">
                  <div className="flex flex-col justify-between h-full text-[9px] text-slate-400 pr-1">
                    <span>200</span>
                    <span>150</span>
                    <span>100</span>
                    <span>50</span>
                    <span>0</span>
                  </div>

                  {/* Monthly Teal Bars */}
                  {[
                    { m: 'Ene', h: '45%' },
                    { m: 'Mar', h: '60%' },
                    { m: 'Abr', h: '50%' },
                    { m: 'May', h: '70%' },
                    { m: 'Jun', h: '55%' },
                    { m: 'Jul', h: '85%' },
                    { m: 'Ago', h: '65%' },
                    { m: 'Sep', h: '90%' },
                    { m: 'Oct', h: '75%' },
                    { m: 'Nov', h: '80%' },
                    { m: 'Dic', h: '95%' },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div 
                        style={{ height: bar.h }} 
                        className="w-full bg-[#2ec4b6] rounded-t-sm group-hover:bg-[#20a396] transition-all"
                      />
                      <span className="text-[7px] text-slate-400 mt-1">{bar.m}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Stats Pills */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="bg-[#f0f9f8] p-2 rounded-xl border border-teal-100 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#2ec4b6]/20 flex items-center justify-center text-[#2ec4b6]">
                      <TrendingUp size={12} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block leading-tight">Good (Tio de 2023)</span>
                      <span className="font-bold text-[#0c2340] text-xs">$115.50</span>
                    </div>
                  </div>

                  <div className="bg-[#f0f9f8] p-2 rounded-xl border border-teal-100 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#2ec4b6]/20 flex items-center justify-center text-[#2ec4b6]">
                      <CheckCircle2 size={12} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block leading-tight">Staooh (10 de BOS4)</span>
                      <span className="font-bold text-[#0c2340] text-xs">$72.20</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 2: Contabilidad Detallada y Reportes Fiscales */}
              <div className="bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-[#0c2340]">Contabilidad Detallada y Reportes Fiscales</h4>
                    <ChevronRight size={14} className="text-slate-400" />
                  </div>

                  {/* Metrics Banner */}
                  <div className="flex items-center justify-between my-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Hoy</span>
                      <span className="text-base font-extrabold text-[#0c2340]">$110.50</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">Cierre Mes Actual</span>
                      <span className="text-base font-extrabold text-emerald-700 block mt-0.5">$650.00</span>
                    </div>
                  </div>
                </div>

                {/* Weekday Bar Chart */}
                <div className="h-28 flex items-end justify-between gap-1 pt-2 pb-1 border-b border-slate-100">
                  <div className="flex flex-col justify-between h-full text-[9px] text-slate-400 pr-1">
                    <span>$200</span>
                    <span>$150</span>
                    <span>$100</span>
                    <span>$50</span>
                    <span>0</span>
                  </div>

                  {[
                    { d: 'Lin', h: '30%' },
                    { d: 'Mar', h: '55%' },
                    { d: 'Mir', h: '45%' },
                    { d: 'Jun', h: '85%' },
                    { d: 'Viv', h: '60%' },
                    { d: 'Sia', h: '70%' },
                    { d: 'Dia', h: '75%' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div 
                        style={{ height: bar.h }} 
                        className="w-full bg-[#2ec4b6] rounded-t-sm group-hover:bg-[#20a396] transition-all"
                      />
                      <span className="text-[8px] text-slate-400 mt-1">{bar.d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 3: Mapa de Despliegue de Empleados & Cobertura */}
              <div className="bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#0c2340]">Mapa de Despliegue de Empleados & Cobertura</h4>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>

                {/* Vector Map Simulation */}
                <div className="relative w-full h-40 bg-[#d8ecf8] rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                  {/* SVG Street Grid matching Ciudad Bolívar */}
                  <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 300 200">
                    <line x1="0" y1="50" x2="300" y2="80" stroke="#b2d4ec" strokeWidth="4" />
                    <line x1="0" y1="120" x2="300" y2="150" stroke="#b2d4ec" strokeWidth="5" />
                    <line x1="80" y1="0" x2="120" y2="200" stroke="#b2d4ec" strokeWidth="4" />
                    <line x1="200" y1="0" x2="170" y2="200" stroke="#b2d4ec" strokeWidth="4" />
                    <line x1="30" y1="20" x2="270" y2="180" stroke="#2ec4b6" strokeWidth="2.5" strokeDasharray="4 2" />
                    
                    {/* Active Transit Path */}
                    <path d="M 40 160 Q 120 120 180 80 T 260 40" fill="none" stroke="#0077b6" strokeWidth="3" />
                  </svg>

                  {/* Markers */}
                  <div className="absolute top-10 left-16 bg-[#0c2340] text-white p-1 rounded-full shadow-md text-[8px] flex items-center gap-1">
                    <Car size={10} className="text-[#2ec4b6]" />
                  </div>
                  <div className="absolute top-20 right-20 bg-[#0c2340] text-white p-1 rounded-full shadow-md text-[8px] flex items-center gap-1">
                    <Truck size={10} className="text-[#2ec4b6]" />
                  </div>
                  <div className="absolute bottom-8 left-28 bg-[#0c2340] text-white p-1 rounded-full shadow-md text-[8px] flex items-center gap-1">
                    <Car size={10} className="text-[#2ec4b6]" />
                  </div>

                  {/* City Label & Status pill */}
                  <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs">
                    Ciudad Bolívar
                  </span>

                  <div className="absolute bottom-2 right-2 bg-white text-[#0c2340] px-2 py-0.5 rounded-full text-[9px] font-extrabold shadow-xs border border-slate-200">
                    Unidades: <span className="text-[#2ec4b6]">110</span>
                  </div>
                </div>
              </div>

              {/* Widget 4: Alertas de Flujo Crítico */}
              <div className="bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#0c2340]">Alertas de Flujo Crítico</h4>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>

                <div className="space-y-2 text-[11px] overflow-y-auto max-h-40 pr-1">
                  <div className="flex items-start gap-2 p-1.5 bg-red-50/70 border border-red-100 rounded-lg">
                    <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-red-900 block leading-tight">Soporte de Nivel 2</span>
                      <span className="text-[9px] text-red-700">Priorizada todas las entregas 46C01 00:00</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-1.5 bg-amber-50/70 border border-amber-100 rounded-lg">
                    <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 block leading-tight">Alerta de Fraude Potencial</span>
                      <span className="text-[9px] text-amber-700">Descripción disparatada parámetros 22C01 03:00</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-1.5 bg-amber-50/70 border border-amber-100 rounded-lg">
                    <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 block leading-tight">Alerta de Flujo Crítico</span>
                      <span className="text-[9px] text-amber-700">Demora priorizada al 10/21 03:00</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-1.5 bg-emerald-50/70 border border-emerald-100 rounded-lg">
                    <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-900 block leading-tight">Demora Crítica en Pedidos</span>
                      <span className="text-[9px] text-emerald-700">En acción por cuadrilla centro</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: Panel de Auditoría & Panel de Distribución de Operaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Bottom Left: Panel de Auditoría y Registros de Acción */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#d2e3f3] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#0c2340]">Panel de Auditoría y Registros de Acción</h4>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                        <UserCheck size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Usuario A modificado por Super-Admin</p>
                        <span className="text-[10px] text-slate-400">10 de Octubre • 14:32</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                      Auditado
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Aprobación de Gasto #123</p>
                        <span className="text-[10px] text-slate-400">20 de Octubre • 09:15</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Aprobado
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Ajuste de Tarifa Zonal (Paseo Meneses)</p>
                        <span className="text-[10px] text-slate-400">10 de Octubre • 18:40</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      Revisión
                    </span>
                  </div>
                </div>

                {/* Sub-summary pill items */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                  <div className="p-2 bg-[#f4f8fc] rounded-lg">
                    <span className="text-[9px] text-slate-400 block">Acción</span>
                    <span className="text-[11px] font-bold text-[#0c2340]">Cierre Mes Actual</span>
                  </div>
                  <div className="p-2 bg-[#f4f8fc] rounded-lg">
                    <span className="text-[9px] text-slate-400 block">Fiscal</span>
                    <span className="text-[11px] font-bold text-[#0c2340]">Reporte IVA</span>
                  </div>
                  <div className="p-2 bg-[#f4f8fc] rounded-lg">
                    <span className="text-[9px] text-slate-400 block">Balance</span>
                    <span className="text-[11px] font-bold text-[#0c2340]">Balance Cuentas</span>
                  </div>
                </div>
              </div>

              {/* Bottom Right: Panel de Distribución de Operaciones */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#d2e3f3] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#0c2340]">Panel de Distribución de Operaciones</h4>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[10px] uppercase">
                        <th className="pb-2">Acción de Acción</th>
                        <th className="pb-2">Usuario</th>
                        <th className="pb-2">Descripción</th>
                        <th className="pb-2">Tiempo / Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 font-bold text-[#0c2340]">Usuario modificado por Super-Admin</td>
                        <td className="py-2.5 text-slate-600">Aprobación Actual</td>
                        <td className="py-2.5 text-slate-500">Balance de Cuentas</td>
                        <td className="py-2.5 text-slate-400 text-[11px]">10/15/2023 19:32</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-[#0c2340]">Ajuste de Tarifa Paseo Meneses</td>
                        <td className="py-2.5 text-slate-600">Admin</td>
                        <td className="py-2.5 text-slate-500">Venezuela</td>
                        <td className="py-2.5 text-slate-400 text-[11px]">10/19/2023</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-[#0c2340]">Ajuste de la Tarifa Nocturna</td>
                        <td className="py-2.5 text-slate-600">Admin</td>
                        <td className="py-2.5 text-slate-500">Venezuela</td>
                        <td className="py-2.5 text-slate-400 text-[11px]">16/18/2023</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-[#0c2340]">Verificación Conductor #4512</td>
                        <td className="py-2.5 text-slate-600">Super-Admin</td>
                        <td className="py-2.5 text-slate-500">Ciudad Bolívar</td>
                        <td className="py-2.5 text-slate-400 text-[11px]">Hoy 08:30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            VIEW 2: UBI GESTIÓN GLOBAL DE USUARIOS (Matching Image 2)
            ======================================================== */}
        {subView === 'usuarios' && (
          <div className="space-y-6">
            
            {/* TOP ROW: Clientes Activos + Mapa Cobertura Clientes + Métricas de Cliente */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left 60%: Clientes Activos Table */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#d2e3f3] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-base font-black text-[#0c2340] tracking-tight">CLIENTES ACTIVOS</h3>
                  
                  {/* Search / Filter matching Image 2 */}
                  <div className="relative w-full sm:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter by Ciudad Bolívar..."
                      value={clientSearch}
                      onChange={(e) => setClientSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#2ec4b6]"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-bold uppercase">
                        <th className="pb-2">ID Cliente</th>
                        <th className="pb-2">Nombre Completo</th>
                        <th className="pb-2">Ubicación</th>
                        <th className="pb-2">Servicios Utilizados</th>
                        <th className="pb-2">Saldo/Créditos</th>
                        <th className="pb-2">Última Actividad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredClients.map((client) => (
                        <tr 
                          key={client.id} 
                          onClick={() => setSelectedUserModal(client)}
                          className="hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <td className="py-2.5 font-bold text-[#0c2340]">{client.id}</td>
                          <td className="py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200">
                                <Image
                                  src={client.avatar}
                                  alt={client.name}
                                  fill
                                  className="object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <span className="font-semibold text-slate-800 group-hover:text-[#2ec4b6] transition">
                                {client.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 text-slate-600">{client.location}</td>
                          <td className="py-2.5 text-slate-500">{client.services}</td>
                          <td className="py-2.5 font-bold text-emerald-700">{client.balance}</td>
                          <td className="py-2.5 text-slate-400 text-[11px]">{client.lastActivity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Middle 20%: Mapa de Cobertura de Clientes */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#0c2340]">Mapa de Cobertura de Clientes</h4>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>

                {/* Map with dense green cluster pins matching Image 2 */}
                <div className="relative w-full h-52 bg-[#dcedf8] rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" viewBox="0 0 200 200">
                    <line x1="0" y1="40" x2="200" y2="70" stroke="#b0d2ea" strokeWidth="3" />
                    <line x1="0" y1="110" x2="200" y2="130" stroke="#b0d2ea" strokeWidth="4" />
                    <line x1="60" y1="0" x2="90" y2="200" stroke="#b0d2ea" strokeWidth="3" />
                    <line x1="140" y1="0" x2="120" y2="200" stroke="#b0d2ea" strokeWidth="3" />
                  </svg>

                  {/* Dense cluster of green pins */}
                  <div className="absolute inset-4 flex flex-wrap items-center justify-center gap-1.5 opacity-90">
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <div key={idx} className="w-3.5 h-3.5 rounded-full bg-emerald-600 border border-white shadow-xs flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-white" />
                      </div>
                    ))}
                  </div>

                  <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded shadow-2xs">
                    Ciudad Bolívar
                  </span>

                  <div className="absolute bottom-2 right-2 bg-white text-[#0c2340] px-2 py-0.5 rounded-full text-[9px] font-extrabold shadow-xs border border-slate-200">
                    Unidades: <span className="text-emerald-600">6500</span>
                  </div>
                </div>
              </div>

              {/* Right 20%: Métricas de Cliente */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#0c2340]">Métricas de Cliente</h4>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>

                {/* Top Metrics numbers */}
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Clientes</span>
                    <span className="text-lg font-black text-[#0c2340]">6500</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Nuevos (Mes)</span>
                    <span className="text-sm font-bold text-emerald-600">+120</span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 font-semibold block mb-1">
                  Frecuencia de Uso por Servicio
                </span>

                {/* Frequency chart */}
                <div className="h-28 flex items-end justify-between gap-1 pt-2 pb-1 border-t border-slate-100">
                  <div className="flex flex-col justify-between h-full text-[8px] text-slate-400 pr-1">
                    <span>$200</span>
                    <span>$150</span>
                    <span>$100</span>
                    <span>$50</span>
                    <span>0</span>
                  </div>

                  {[
                    { d: 'Lin', h: '35%' },
                    { d: 'Mar', h: '65%' },
                    { d: 'Mir', h: '50%' },
                    { d: 'Jun', h: '95%' },
                    { d: 'Viv', h: '45%' },
                    { d: 'Siv', h: '70%' },
                    { d: 'Dis', h: '75%' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div 
                        style={{ height: bar.h }} 
                        className="w-full bg-[#2ec4b6] rounded-t-sm group-hover:bg-[#20a396] transition-all"
                      />
                      <span className="text-[7px] text-slate-400 mt-1">{bar.d}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* BOTTOM ROW: Empleados Table + Mapa Despliegue Empleados + Métricas de Empleado */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left 60%: Empleados Table */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#d2e3f3] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-base font-black text-[#0c2340] tracking-tight">
                    EMPLEADOS (CONDUCTORES Y REPARTIDORES)
                  </h3>

                  {/* Filter by Role */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-[11px] font-bold">
                    <button
                      onClick={() => setEmployeeFilter('all')}
                      className={`px-2.5 py-1 rounded-md transition ${employeeFilter === 'all' ? 'bg-white text-[#0c2340] shadow-2xs' : 'text-slate-500'}`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setEmployeeFilter('Conductor')}
                      className={`px-2.5 py-1 rounded-md transition ${employeeFilter === 'Conductor' ? 'bg-white text-[#0c2340] shadow-2xs' : 'text-slate-500'}`}
                    >
                      Conductores
                    </button>
                    <button
                      onClick={() => setEmployeeFilter('Repartidor')}
                      className={`px-2.5 py-1 rounded-md transition ${employeeFilter === 'Repartidor' ? 'bg-white text-[#0c2340] shadow-2xs' : 'text-slate-500'}`}
                    >
                      Repartidores
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-bold uppercase">
                        <th className="pb-2">ID Empleado</th>
                        <th className="pb-2">Foto Perfil</th>
                        <th className="pb-2">Nombre Completo</th>
                        <th className="pb-2">Rol</th>
                        <th className="pb-2">Ubicación Actual</th>
                        <th className="pb-2">Estado</th>
                        <th className="pb-2">Último Pedido</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEmployees.map((emp) => (
                        <tr 
                          key={emp.id + emp.name}
                          onClick={() => setSelectedUserModal(emp)}
                          className="hover:bg-slate-50 transition cursor-pointer group"
                        >
                          <td className="py-2.5 font-bold text-[#0c2340]">{emp.id}</td>
                          <td className="py-2.5">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200">
                              <Image
                                src={emp.avatar}
                                alt={emp.name}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </td>
                          <td className="py-2.5 font-semibold text-slate-800 group-hover:text-[#2ec4b6] transition">
                            {emp.name}
                          </td>
                          <td className="py-2.5 text-slate-600 font-medium">{emp.role}</td>
                          <td className="py-2.5 text-slate-500">{emp.location}</td>
                          <td className="py-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              emp.status === 'En Ruta' 
                                ? 'bg-teal-100 text-teal-800' 
                                : emp.status === 'Disponible' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-slate-200 text-slate-600'
                            }`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-slate-400 text-[11px]">{emp.lastOrder}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Middle 20%: Mapa de Despliegue de Empleados */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#0c2340]">Mapa de Despliegue de Empleados</h4>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>

                <div className="relative w-full h-52 bg-[#dcedf8] rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 200 200">
                    <line x1="0" y1="60" x2="200" y2="80" stroke="#0077b6" strokeWidth="3" />
                    <line x1="40" y1="160" x2="160" y2="40" stroke="#0077b6" strokeWidth="4" />
                    <line x1="20" y1="20" x2="180" y2="180" stroke="#2ec4b6" strokeWidth="2.5" strokeDasharray="3 3" />
                  </svg>

                  {/* Employee Route Points */}
                  <div className="absolute top-10 left-10 bg-[#0c2340] text-white p-1 rounded-full text-[8px] shadow-sm">
                    🚗
                  </div>
                  <div className="absolute top-20 right-12 bg-[#0c2340] text-white p-1 rounded-full text-[8px] shadow-sm">
                    🛵
                  </div>
                  <div className="absolute bottom-12 left-16 bg-[#0c2340] text-white p-1 rounded-full text-[8px] shadow-sm">
                    🚗
                  </div>

                  <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded shadow-2xs">
                    Ciudad Bolívar
                  </span>
                </div>
              </div>

              {/* Right 20%: Métricas de Empleado */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-[#d2e3f3] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#0c2340]">Métricas de Empleado</h4>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Empleados</span>
                    <span className="text-lg font-black text-[#0c2340]">110.50</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Asignaciones</span>
                    <span className="text-sm font-bold text-emerald-600">800</span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 font-semibold block mb-1">
                  Eficiencia de Ruta
                </span>

                {/* Efficiency Chart */}
                <div className="h-28 flex items-end justify-between gap-1 pt-2 pb-1 border-t border-slate-100">
                  <div className="flex flex-col justify-between h-full text-[8px] text-slate-400 pr-1">
                    <span>200</span>
                    <span>150</span>
                    <span>100</span>
                    <span>50</span>
                    <span>0</span>
                  </div>

                  {[
                    { d: '1', h: '25%' },
                    { d: '2', h: '45%' },
                    { d: '3', h: '75%' },
                    { d: '4', h: '65%' },
                    { d: '5', h: '95%' },
                    { d: '6', h: '50%' },
                    { d: '7', h: '80%' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div 
                        style={{ height: bar.h }} 
                        className="w-full bg-[#2ec4b6] rounded-t-sm group-hover:bg-[#20a396] transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ========================================================
          USER DETAILS MODAL (When clicking any user or employee row)
          ======================================================== */}
      {selectedUserModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500 shadow-sm">
                  <Image
                    src={selectedUserModal.avatar}
                    alt={selectedUserModal.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">{selectedUserModal.name}</h4>
                  <span className="text-xs text-slate-500">ID: {selectedUserModal.id} • {selectedUserModal.location}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedUserModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px]">Rol / Tipo</span>
                  <span className="font-bold text-[#0c2340]">{selectedUserModal.role || 'Cliente Registrado'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Estado Operativo</span>
                  <span className="font-bold text-teal-600">{selectedUserModal.status || 'Activo y Verificado'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Saldo / Créditos</span>
                  <span className="font-bold text-slate-800">{selectedUserModal.balance || '$0.00'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Última Conexión</span>
                  <span className="font-bold text-slate-800">{selectedUserModal.lastActivity || selectedUserModal.lastOrder || 'Hoy'}</span>
                </div>
              </div>

              {selectedUserModal.vehicle && (
                <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 flex items-center gap-2">
                  <Car size={16} className="text-teal-600" />
                  <div>
                    <span className="text-[10px] text-teal-800 block">Vehículo Asignado</span>
                    <span className="font-bold text-slate-900">{selectedUserModal.vehicle}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  showToast(`Modificación guardada para ${selectedUserModal.name}`);
                  setSelectedUserModal(null);
                }}
                className="flex-1 py-2.5 bg-[#0c2340] hover:bg-[#143258] text-white rounded-xl font-bold text-xs transition"
              >
                Actualizar Estado
              </button>
              <button
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c2340] text-white px-4 py-3 rounded-xl shadow-xl border border-teal-400/40 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#2ec4b6] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
