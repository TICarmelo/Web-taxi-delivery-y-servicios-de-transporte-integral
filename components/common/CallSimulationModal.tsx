'use client';

import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Shield } from 'lucide-react';
import Image from 'next/image';

interface CallSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName?: string;
  driverAvatar?: string;
  driverPhone?: string;
  vehicleInfo?: string;
}

export const CallSimulationModal: React.FC<CallSimulationModalProps> = ({
  isOpen,
  onClose,
  driverName = 'Esteban R.',
  driverAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  driverPhone = '+58 424 9876543',
  vehicleInfo = 'Toyota Corolla Blanco • AB 123 CD',
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#0c2340] text-white rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col items-center text-center">
        {/* Security / Safe Call Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs text-teal-300 font-medium mb-6">
          <Shield size={13} />
          <span>Llamada Segura Encriptada UBI</span>
        </div>

        {/* Driver Avatar with Pulse Rings */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-teal-400/20 animate-ping" />
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#2ec4b6] shadow-xl">
            <Image
              src={driverAvatar}
              alt={driverName}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Driver Name & Status */}
        <h3 className="text-2xl font-bold text-white mb-1">{driverName}</h3>
        <p className="text-sm text-slate-300 mb-1">{driverPhone}</p>
        <p className="text-xs text-emerald-400 font-mono tracking-widest font-semibold mb-8">
          EN LLAMADA ({formatTime(callDuration)})
        </p>

        {/* Audio Waveform visualization */}
        <div className="flex items-center justify-center gap-1 mb-8 h-8">
          {[12, 24, 32, 16, 28, 20, 30, 14, 26].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-[#2ec4b6] rounded-full animate-pulse"
              style={{
                height: `${h}px`,
                animationDelay: `${i * 150}ms`,
                animationDuration: '800ms',
              }}
            />
          ))}
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-6 w-full mb-2">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition active:scale-95 ${
              isMuted ? 'bg-amber-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title="Silenciar micrófono"
            id="call-mute-toggle"
          >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
          </button>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-900/40 transition active:scale-90"
            title="Finalizar llamada"
            id="call-end-button"
          >
            <PhoneOff size={28} />
          </button>

          {/* Speaker Button */}
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition active:scale-95 ${
              isSpeaker ? 'bg-teal-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title="Altavoz"
            id="call-speaker-toggle"
          >
            <Volume2 size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
