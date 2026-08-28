'use client';

import React, { useState } from 'react';
import { AppView, Driver, PastOrder, UserProfile, EmployeeProfile, AuthState } from '@/types/ubi';
import { INITIAL_USER_PROFILE, INITIAL_PAST_ORDERS, AVAILABLE_DRIVERS } from '@/data/mockData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomeView } from '@/components/views/HomeView';
import { RideHailingView } from '@/components/views/RideHailingView';
import { PersonalShopperView } from '@/components/views/PersonalShopperView';
import { DeliveryFlowView } from '@/components/views/DeliveryFlowView';
import { UserDashboardView } from '@/components/views/UserDashboardView';
import { ServicesHubView } from '@/components/views/ServicesHubView';
import { EmployeeDashboardView } from '@/components/views/EmployeeDashboardView';
import { AdminAreaView } from '@/components/views/AdminAreaView';
import { TrackingModal } from '@/components/common/TrackingModal';
import { CallSimulationModal } from '@/components/common/CallSimulationModal';
import { ChatDrawer } from '@/components/common/ChatDrawer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { AuthModal, AuthModalStep } from '@/components/auth/AuthModal';

export default function Page() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  // Auth State: Initially unlogged as requested
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: 'guest',
    user: undefined,
    employee: undefined,
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialStep, setAuthModalInitialStep] = useState<AuthModalStep>('select_type');

  // Client user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // Employee profile data
  const [employeeProfile, setEmployeeProfile] = useState<EmployeeProfile>({
    id: 'emp_jose_4512',
    employeeCode: 'EMP-4512',
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
  });

  // Modal States
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [activeTrackingQuery, setActiveTrackingQuery] = useState('#7890');
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<PastOrder | undefined>(INITIAL_PAST_ORDERS[0]);

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [activeCallTarget, setActiveCallTarget] = useState({
    name: AVAILABLE_DRIVERS[0].name,
    avatar: AVAILABLE_DRIVERS[0].avatar,
    info: `${AVAILABLE_DRIVERS[0].vehicleModel} • ${AVAILABLE_DRIVERS[0].vehiclePlate}`,
  });

  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [activeChatDriver, setActiveChatDriver] = useState<Driver>(AVAILABLE_DRIVERS[0]);

  // Auth Handlers
  const handleOpenAuth = (step: AuthModalStep = 'select_type') => {
    setAuthModalInitialStep(step);
    setAuthModalOpen(true);
  };

  const handleLoginClient = (client: UserProfile) => {
    setUserProfile(client);
    setAuthState({
      isAuthenticated: true,
      role: 'client',
      user: client,
    });
    setAuthModalOpen(false);
  };

  const handleLoginEmployee = (employee: EmployeeProfile) => {
    setEmployeeProfile(employee);
    setAuthState({
      isAuthenticated: true,
      role: 'employee',
      employee: employee,
    });
    setCurrentView('employee_area');
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      role: 'guest',
    });
    setCurrentView('home');
  };

  // Handler for Tracking Modal
  const handleOpenTracking = (query: string, orderData?: PastOrder) => {
    setActiveTrackingQuery(query);
    setActiveTrackingOrder(orderData || INITIAL_PAST_ORDERS[0]);
    setTrackingModalOpen(true);
  };

  // Handler for Voice Call Simulation
  const handleOpenDriverCall = (driver: Driver) => {
    setActiveCallTarget({
      name: driver.name,
      avatar: driver.avatar,
      info: `${driver.vehicleModel} • ${driver.vehiclePlate}`,
    });
    setCallModalOpen(true);
  };

  const handleOpenCustomCall = (name: string, role: string, avatar: string) => {
    setActiveCallTarget({
      name,
      avatar,
      info: role,
    });
    setCallModalOpen(true);
  };

  // Handler for Chat Drawer
  const handleOpenChat = (driver: Driver) => {
    setActiveChatDriver(driver);
    setChatDrawerOpen(true);
  };

  // Render view router
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            onNavigate={(view) => setCurrentView(view)}
            onOpenTracking={handleOpenTracking}
            userProfile={authState.user}
            isLoggedIn={authState.isAuthenticated && authState.role === 'client'}
          />
        );
      case 'employee_area':
        return (
          <EmployeeDashboardView
            employee={employeeProfile}
            onNavigate={(view) => setCurrentView(view)}
            onOpenCall={handleOpenCustomCall}
            onOpenTracking={(id) => handleOpenTracking(id)}
            onLogout={handleLogout}
          />
        );
      case 'ride_hailing':
        return (
          <RideHailingView
            userProfile={userProfile}
            onOpenChat={handleOpenChat}
            onOpenCall={handleOpenDriverCall}
          />
        );
      case 'personal_shopper':
        return (
          <PersonalShopperView
            userProfile={userProfile}
            onOpenTrackingModal={(id) => handleOpenTracking(id)}
          />
        );
      case 'delivery':
        return (
          <DeliveryFlowView
            userProfile={userProfile}
            onOpenTracking={handleOpenTracking}
          />
        );
      case 'dashboard':
        return (
          <UserDashboardView
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
            onOpenTracking={handleOpenTracking}
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      case 'services':
        return (
          <ServicesHubView
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      case 'admin_area':
        return (
          <AdminAreaView
            onNavigate={(view) => setCurrentView(view)}
          />
        );
      default:
        return (
          <HomeView
            onNavigate={(view) => setCurrentView(view)}
            onOpenTracking={handleOpenTracking}
            userProfile={authState.user}
            isLoggedIn={authState.isAuthenticated && authState.role === 'client'}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col">
      {/* Navigation Bar (Hidden on admin_area to use its specialized reference top bar) */}
      {currentView !== 'admin_area' && (
        <Navbar
          currentView={currentView}
          onNavigate={(v) => setCurrentView(v)}
          authState={authState}
          onOpenAuth={() => handleOpenAuth('select_type')}
          onLogout={handleLogout}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {renderCurrentView()}
      </main>

      {/* Global Mobile Bottom Navigation (Visible on views EXCEPT Employee Area and Admin Area) */}
      {currentView !== 'employee_area' && currentView !== 'admin_area' && (
        <MobileBottomNav
          currentView={currentView}
          onNavigate={(v) => setCurrentView(v)}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={(v) => setCurrentView(v)} />

      {/* Auth Modal (Bienvenido a UBI -> Soy Cliente / Soy Empleado -> Login Cliente / Login Empleado) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialStep={authModalInitialStep}
        onLoginClient={handleLoginClient}
        onLoginEmployee={handleLoginEmployee}
      />

      {/* Rastrear mi Pedido Modal matching Reference Design */}
      <TrackingModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        initialQuery={activeTrackingQuery}
        orderData={activeTrackingOrder}
      />

      {/* Conductor / Customer Call Simulation Modal */}
      <CallSimulationModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        driverName={activeCallTarget.name}
        driverAvatar={activeCallTarget.avatar}
        vehicleInfo={activeCallTarget.info}
      />

      {/* Chat Drawer for Shopper / Conductor */}
      <ChatDrawer
        isOpen={chatDrawerOpen}
        onClose={() => setChatDrawerOpen(false)}
        agentName={activeChatDriver.name}
        agentAvatar={activeChatDriver.avatar}
        agentRole={`${activeChatDriver.vehicleModel} (${activeChatDriver.vehiclePlate})`}
      />
    </div>
  );
}
