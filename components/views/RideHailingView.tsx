'use client';

import React, { useState } from 'react';
import {
  RideStep,
  RideVehicleOption,
  Driver,
  UserProfile,
} from '@/types/ubi';
import { VEHICLE_OPTIONS, AVAILABLE_DRIVERS } from '@/data/mockData';
import { InteractiveMap } from '@/components/common/InteractiveMap';
import {
  Car,
  MapPin,
  Search,
  Check,
  CreditCard,
  Clock,
  Phone,
  MessageSquare,
  Share2,
  AlertTriangle,
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Star,
  Users,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface RideHailingViewProps {
  userProfile: UserProfile;
  onOpenChat: (driver: Driver) => void;
  onOpenCall: (driver: Driver) => void;
}

export const RideHailingView: React.FC<RideHailingViewProps> = ({
  userProfile,
  onOpenChat,
  onOpenCall,
}) => {
  const [step, setStep] = useState<RideStep>(1);
  const [origin, setOrigin] = useState('Av. Germania, Qta. Los Rosales');
  const [destination, setDestination] = useState('Paseo Meneses, Torre Bolívar');
  const [selectedVehicle, setSelectedVehicle] = useState<RideVehicleOption>(VEHICLE_OPTIONS[0]);
  const [selectedDriver, setSelectedDriver] = useState<Driver>(AVAILABLE_DRIVERS[0]);
  const [selectedPayment, setSelectedPayment] = useState('Visa');
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [isDriverSheetOpen, setIsDriverSheetOpen] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const handleNextStep = (nextStep: RideStep) => {
    setStep(nextStep);
    if (nextStep === 4) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const handleDriverSelect = (driverId: string) => {
    const found = AVAILABLE_DRIVERS.find((d) => d.id === driverId);
    if (found) {
      setSelectedDriver(found);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f7fb] min-h-[calc(100vh-80px)] pb-16 md:pb-6">
      {/* Top Header Stepper Banner matching Mobile Screenshots 1, 2, 3, 4 */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-md mx-auto sm:max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0c2340] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-xs flex-shrink-0">
              {step}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#0c2340] leading-none tracking-tight">
              Pide Tu Carrera
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-500">
              Step {step}
            </span>

            {/* Stepper Dots for quick navigation */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s as RideStep)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    step === s
                      ? 'w-6 bg-[#2ec4b6]'
                      : step > s
                      ? 'w-2.5 bg-teal-400'
                      : 'w-2 bg-slate-200'
                  }`}
                  title={`Ir al Paso ${s}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Responsive Canvas & Workflow */}
      <div className="max-w-md sm:max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-5 w-full flex-1 flex flex-col gap-3">
        {/* INTERACTIVE MAP CONTAINER */}
        <div className="relative w-full h-[320px] sm:h-[390px] rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-[#eef3f8]">
          <InteractiveMap
            step={step}
            originText={origin}
            destinationText={destination}
            selectedVehicleType={selectedVehicle.type}
            isLiveTracking={step === 4}
            onSelectDriver={handleDriverSelect}
          />

          {/* Floating Driver Assignment Card in Step 3 matching Screenshot 3 */}
          {step === 3 && (
            <div className="absolute top-3 left-3 right-3 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 animate-fadeIn z-20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                  Conductor Asignado
                </span>
                <span className="text-xs text-slate-400 font-medium">ETA 2 min</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#2ec4b6] shadow-xs flex-shrink-0">
                  <Image
                    src={selectedDriver.avatar}
                    alt={selectedDriver.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0c2340] text-sm leading-tight">
                    Conductor: {selectedDriver.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedDriver.vehicleModel} • {selectedDriver.vehiclePlate}
                  </p>
                  <p className="text-sm font-extrabold text-teal-700 mt-0.5">
                    ${selectedVehicle.priceUsd.toFixed(2)} USD
                  </p>
                </div>
              </div>

              {/* Driver alternative selector */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {AVAILABLE_DRIVERS.slice(0, 2).map((drv) => (
                    <button
                      key={drv.id}
                      onClick={() => setSelectedDriver(drv)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold transition ${
                        selectedDriver.id === drv.id
                          ? 'bg-[#0c2340] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <div className="relative w-4 h-4 rounded-full overflow-hidden">
                        <Image
                          src={drv.avatar}
                          alt={drv.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span>{drv.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-amber-400">★{drv.rating}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsDriverSheetOpen(true)}
                  className="text-xs text-teal-600 font-bold hover:underline"
                >
                  Ver Ficha
                </button>
              </div>
            </div>
          )}

          {/* Step 4 Floating Driver Mini Banner matching Screenshot 4 */}
          {step === 4 && (
            <div
              onClick={() => setIsDriverSheetOpen(true)}
              className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-white transition z-20"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#2ec4b6]">
                  <Image
                    src={selectedDriver.avatar}
                    alt={selectedDriver.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-extrabold text-xs text-[#0c2340]">Conductor</p>
                    <span className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                      <Star size={11} className="fill-current" /> {selectedDriver.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{selectedDriver.vehicleModel}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg">
                  Ver Detalles
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STEP 1: ORIGEN & DESTINO (Matching Screenshot 1) */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/80 animate-fadeIn">
            {/* Step 1 Header matching Screenshot 1 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0c2340] text-white text-xs font-extrabold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0c2340]">
                  Step 1: Origen & Destino
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-400">Step 1</span>
            </div>

            {/* Inputs styled exactly like Screenshot 1 */}
            <div className="space-y-2.5 mb-4">
              {/* Origen Input Pill */}
              <div className="relative flex items-center bg-white border border-[#2ec4b6] rounded-xl px-3.5 py-2.5 shadow-2xs focus-within:ring-2 focus-within:ring-teal-300">
                <MapPin size={16} className="text-[#2ec4b6] mr-2 flex-shrink-0" />
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-700">Origen :</span>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Auto-complete"
                    className="w-full bg-transparent text-xs text-slate-800 focus:outline-none placeholder:text-slate-400"
                    id="ride-origin-input"
                  />
                </div>
              </div>

              {/* Destino Input Pill */}
              <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-2xs focus-within:border-[#2ec4b6] focus-within:ring-2 focus-within:ring-teal-300">
                <MapPin size={16} className="text-slate-400 mr-2 flex-shrink-0" />
                <div className="flex-1 flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-700">Destino :</span>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Punto de Entrega"
                    className="w-full bg-transparent text-xs text-slate-800 focus:outline-none placeholder:text-slate-400"
                    id="ride-destination-input"
                  />
                </div>
                <Search size={16} className="text-slate-400 ml-2 flex-shrink-0" />
              </div>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px]">
              <span className="text-slate-400 font-medium">Sugerencias:</span>
              {['Paseo Meneses', 'Aeropuerto', 'C.C. Ciudad Traki', 'Paseo Orinoco'].map((place) => (
                <button
                  key={place}
                  onClick={() => setDestination(place)}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-full border border-slate-200 transition"
                >
                  {place}
                </button>
              ))}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNextStep(2)}
              className="w-full py-3 px-5 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              id="btn-step-1-continue"
            >
              <span>Continuar a Selección de Vehículo</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: SELECCIONA TU VEHICULO (Matching Screenshot 2) */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/80 animate-fadeIn">
            {/* Step 2 Header matching Screenshot 2 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0c2340] text-white text-xs font-extrabold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0c2340]">
                  Selecciona Tu Vehículo
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-400">Step 2</span>
            </div>

            {/* Horizontal Carousel of Vehicle Cards matching Screenshot 2 */}
            <div className="relative">
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isSelected = selectedVehicle.id === veh.id;
                  return (
                    <div
                      key={veh.id}
                      onClick={() => setSelectedVehicle(veh)}
                      className={`min-w-[140px] sm:min-w-[160px] flex-1 p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between snap-start ${
                        isSelected
                          ? 'border-[#2ec4b6] bg-teal-50/50 shadow-sm ring-1 ring-teal-300'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      id={`veh-card-${veh.id}`}
                    >
                      <div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-[#0c2340] mb-1">
                          {veh.name}
                        </h4>

                        {/* Vehicle Vector / Illustration matching screenshot */}
                        <div className="h-12 flex items-center justify-center my-1">
                          {veh.type === 'moto' ? (
                            <div className="w-20 h-8 rounded-lg bg-teal-600/10 text-teal-700 flex items-center justify-center text-xs font-bold">
                              🛵 Moto UBI
                            </div>
                          ) : veh.type === 'premium' ? (
                            <div className="w-24 h-9 rounded-lg bg-[#0c2340] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                              🚗 Premium
                            </div>
                          ) : veh.type === 'xl' ? (
                            <div className="w-24 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                              🚙 XL 6 Pax
                            </div>
                          ) : (
                            <div className="w-24 h-9 rounded-lg bg-[#2ec4b6] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                              🚗 Standard
                            </div>
                          )}
                        </div>

                        {/* Capacity and ETA */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 my-1">
                          <span className="flex items-center gap-1 font-semibold">
                            <Users size={11} /> {veh.capacity}
                          </span>
                          <span className="font-bold text-teal-700">{veh.etaMinutes} min</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 mt-1">
                        <p className="font-extrabold text-sm text-[#0c2340]">
                          ${veh.priceUsd.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">
                          {veh.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carousel Pagination Dots matching Screenshot 2 */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="w-6 h-1.5 rounded-full bg-[#2ec4b6]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>

            {/* Actions for Step 2 */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setStep(1)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Atrás
              </button>
              <button
                onClick={() => handleNextStep(3)}
                className="flex-1 py-2.5 px-4 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                id="btn-step-2-continue"
              >
                <span>Confirmar {selectedVehicle.name} (${selectedVehicle.priceUsd.toFixed(2)})</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: METODO DE PAGO & CONFIRMAR (Matching Screenshot 3) */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/80 animate-fadeIn">
            {/* Step 3 Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0c2340] text-white text-xs font-extrabold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0c2340]">
                  Método de Pago
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-400">Step 3</span>
            </div>

            {/* Payment Method Selector Dropdown matching Screenshot 3 */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Método de Pago</span>
                <span className="text-sm font-extrabold text-[#0c2340]">
                  ${selectedVehicle.priceUsd.toFixed(2)}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                  className="w-full flex items-center justify-between bg-white border border-slate-200 hover:border-[#2ec4b6] rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition"
                  id="payment-dropdown-btn"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-blue-900 tracking-wider">VISA</span>
                    <span>{selectedPayment}</span>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {isPaymentDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-30 animate-fadeIn space-y-1">
                    {[
                      { name: 'Visa •••• 4821', brand: 'VISA' },
                      { name: 'Pago Móvil BDV / Banesco', brand: 'PAGOMÓVIL' },
                      { name: 'Zelle Directo', brand: 'ZELLE' },
                      { name: 'Efectivo USD', brand: 'EFECTIVO' },
                    ].map((m) => (
                      <button
                        key={m.name}
                        onClick={() => {
                          setSelectedPayment(m.name);
                          setIsPaymentDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-teal-50 text-left text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        <span className="font-bold text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{m.brand}</span>
                        <span>{m.name}</span>
                        {selectedPayment === m.name && <Check size={14} className="text-[#2ec4b6]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons matching Screenshot 3 */}
            <div className="space-y-2">
              {/* Primary: Pedir Carrera */}
              <button
                onClick={() => handleNextStep(4)}
                className="w-full py-3.5 px-6 bg-[#2ec4b6] hover:bg-[#25b5a8] text-white font-extrabold text-sm rounded-full shadow-lg shadow-teal-900/20 transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                id="btn-pedir-carrera-final"
              >
                <Car size={16} />
                <span>Pedir Carrera</span>
              </button>

              {/* Secondary: Programar Carrera */}
              <button
                onClick={() => {
                  setIsScheduled(true);
                  handleNextStep(4);
                }}
                className="w-full py-2.5 px-6 bg-white hover:bg-slate-50 text-[#0c2340] border border-slate-300 font-bold text-xs rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
                id="btn-programar-carrera"
              >
                <Clock size={14} className="text-slate-600" />
                <span>Programar Carrera</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMADO & EN RUTA (Matching Screenshot 4) */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 animate-fadeIn">
            {/* Step 4 Header & ETA matching Screenshot 4 */}
            <div className="text-center pb-4 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-extrabold text-[#0c2340]">
                Confirmado & En Ruta
              </h3>
              <p className="text-xs font-bold text-teal-700 mt-0.5">
                ETA: 2 min
              </p>
            </div>

            {/* Action Buttons matching Screenshot 4: Cancel & Share */}
            <div className="flex items-center gap-3 mt-4">
              {/* Cancel Button */}
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 px-4 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                id="btn-ride-cancel"
              >
                <X size={14} className="text-rose-500" />
                <span>Cancel</span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(
                    `Sigue mi carrera en UBI con ${selectedDriver.name} (${selectedDriver.vehiclePlate}) hacia ${destination}`
                  );
                  alert('Enlace de viaje copiado al portapapeles');
                }}
                className="flex-1 py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                id="btn-ride-share"
              >
                <Share2 size={14} className="text-slate-600" />
                <span>Share</span>
              </button>
            </div>

            {/* Quick trigger to open full Driver Sheet */}
            <button
              onClick={() => setIsDriverSheetOpen(true)}
              className="w-full mt-3 py-2 text-center text-xs font-bold text-teal-600 hover:text-teal-700"
            >
              Ver perfil completo del conductor ➔
            </button>
          </div>
        )}
      </div>

      {/* EXPANDED DRIVER PROFILE BOTTOM SHEET (Matching Screenshot 5) */}
      {isDriverSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-fadeIn">
          <div
            className="w-full max-w-md bg-white rounded-t-[32px] p-6 shadow-2xl animate-slideUp relative max-h-[90vh] overflow-y-auto"
            id="driver-profile-bottom-sheet"
          >
            {/* Top Sheet Drag Handle Bar matching Screenshot 5 */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

            <button
              onClick={() => setIsDriverSheetOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition"
              title="Cerrar"
            >
              <X size={18} />
            </button>

            {/* Driver Profile Header matching Screenshot 5 */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-teal-400 shadow-sm flex-shrink-0">
                <Image
                  src={selectedDriver.avatar}
                  alt={selectedDriver.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#0c2340] leading-tight">
                  {selectedDriver.name}
                </h3>
                <div className="flex items-center gap-1 text-amber-500 my-0.5">
                  <span className="font-bold text-xs text-[#0c2340] mr-1">
                    {selectedDriver.rating}
                  </span>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="fill-current" />
                  ))}
                  <span className="text-[11px] text-slate-400 ml-1">Reputación</span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {selectedDriver.vehicleModel} | Matrícula: {selectedDriver.vehiclePlate}
                </p>
                <p className="text-[10px] text-slate-400">
                  (Venezuelan Plate Number • Conductor UBI)
                </p>
              </div>
            </div>

            {/* TWO LARGE CIRCULAR COMMUNICATION BUTTONS matching Screenshot 5 */}
            <div className="grid grid-cols-2 gap-4 my-5">
              {/* Chat con Conductor */}
              <button
                onClick={() => {
                  setIsDriverSheetOpen(false);
                  onOpenChat(selectedDriver);
                }}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 transition group cursor-pointer active:scale-95"
                id="sheet-btn-chat"
              >
                <div className="w-12 h-12 rounded-full bg-[#0c2340] text-white flex items-center justify-center mb-1.5 shadow-md group-hover:bg-[#2ec4b6] transition">
                  <MessageSquare size={20} />
                </div>
                <span className="font-extrabold text-xs text-[#0c2340]">
                  Chat con Conductor
                </span>
              </button>

              {/* Llamar a Conductor */}
              <button
                onClick={() => {
                  setIsDriverSheetOpen(false);
                  onOpenCall(selectedDriver);
                }}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 transition group cursor-pointer active:scale-95"
                id="sheet-btn-call"
              >
                <div className="w-12 h-12 rounded-full bg-[#0c2340] text-white flex items-center justify-center mb-1.5 shadow-md group-hover:bg-[#2ec4b6] transition">
                  <Phone size={20} />
                </div>
                <span className="font-extrabold text-xs text-[#0c2340]">
                  Llamar a Conductor
                </span>
              </button>
            </div>

            {/* METRICS ROW matching Screenshot 5 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#0c2340]">ETA: Llegada en 3 min</p>
                <p className="text-[11px] text-slate-400">Distancia remanente</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-[#0c2340]">${selectedVehicle.priceUsd.toFixed(2)} USD</p>
                <p className="text-[11px] text-teal-700 font-semibold">{selectedVehicle.priceBs.toFixed(0)} Bs</p>
              </div>
            </div>

            {/* 3 BOTTOM PILL BUTTONS matching Screenshot 5 */}
            <div className="grid grid-cols-3 gap-2">
              {/* Compartir */}
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(
                    `Sigue mi carrera en UBI con ${selectedDriver.name} (${selectedDriver.vehiclePlate}) hacia ${destination}`
                  );
                  alert('Enlace copiado al portapapeles');
                }}
                className="py-2.5 px-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-full text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <Share2 size={13} />
                <span>Compartir</span>
              </button>

              {/* Soporte */}
              <button
                onClick={() => alert('Conectando con la Central UBI Ciudad Bolívar (Soporte 24/7)')}
                className="py-2.5 px-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-full text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <HelpCircle size={13} />
                <span>Soporte</span>
              </button>

              {/* SOS Red Pill */}
              <button
                onClick={() => alert('🚨 Alerta SOS activada: Localización en tiempo real enviada a la central de seguridad UBI.')}
                className="py-2.5 px-2 bg-[#e63946] hover:bg-rose-700 text-white rounded-full text-xs font-extrabold flex items-center justify-center gap-1 transition shadow-sm cursor-pointer"
              >
                <span>SOS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
