'use client';

import React, { useState } from 'react';
import { X, Send, Image as ImageIcon, Smile, Mic, CheckCheck } from 'lucide-react';
import { ShopperChatMessage } from '@/types/ubi';
import Image from 'next/image';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  agentName?: string;
  agentAvatar?: string;
  agentRole?: string;
  initialMessages?: ShopperChatMessage[];
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  title = 'Chat con Shopper / Conductor',
  agentName = 'Ana M. (Personal Shopper)',
  agentAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  agentRole = 'En el supermercado',
  initialMessages = [],
}) => {
  const [messages, setMessages] = useState<ShopperChatMessage[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: '1',
            sender: 'shopper',
            text: '¡Hola! Ya estoy preparando tu pedido. ¿Deseas agregar alguna indicación especial?',
            timestamp: '10:24 AM',
          },
        ]
  );
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg: ShopperChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate smart auto-reply after 1.2 seconds
    setTimeout(() => {
      const autoReply: ShopperChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'shopper',
        text: '¡Entendido! Ya lo tengo anotado y lo estoy incluyendo en tu orden.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1200);
  };

  const handleQuickChip = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideLeft">
        {/* Chat Header matching screenshots */}
        <div className="bg-[#00a896] text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={agentAvatar}
                alt={agentName}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{agentName}</h3>
              <p className="text-xs text-teal-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                {agentRole}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white hover:bg-white/20 rounded-full transition"
            id="close-chat-drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex gap-2 overflow-x-auto text-xs whitespace-nowrap">
          <button
            onClick={() => handleQuickChip('¿Tienes Harina PAN disponible?')}
            className="px-3 py-1 bg-white border border-slate-200 hover:border-teal-400 rounded-full text-slate-700 transition"
          >
            🌽 ¿Hay Harina PAN?
          </button>
          <button
            onClick={() => handleQuickChip('¿Cuánto tiempo estimas para llegar?')}
            className="px-3 py-1 bg-white border border-slate-200 hover:border-teal-400 rounded-full text-slate-700 transition"
          >
            ⏱️ ¿Cuánto falta?
          </button>
          <button
            onClick={() => handleQuickChip('Por favor sustitúyelo por la marca disponible')}
            className="px-3 py-1 bg-white border border-slate-200 hover:border-teal-400 rounded-full text-slate-700 transition"
          >
            🔄 Sustituto OK
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8fafc]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="inline-block px-3 py-1 bg-slate-200/70 text-slate-600 text-[11px] font-medium rounded-full">
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-xs ${
                    isUser
                      ? 'bg-[#00a896] text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck size={12} className="text-teal-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-slate-50 rounded-full transition"
            title="Adjuntar foto de producto"
            onClick={() => handleQuickChip('Te comparto la foto del producto que necesito')}
          >
            <ImageIcon size={20} />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe un mensaje a tu Shopper..."
            className="flex-1 py-2.5 px-3.5 bg-slate-100 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            id="chat-drawer-input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#00a896] hover:bg-[#008f80] disabled:opacity-40 text-white rounded-xl transition shadow-sm active:scale-95"
            id="chat-drawer-send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
