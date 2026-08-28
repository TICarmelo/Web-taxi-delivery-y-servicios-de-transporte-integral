'use client';

import React, { useState } from 'react';
import {
  ProductItem,
  CartItem,
  ShopperOrder,
  ShopperProgressStep,
  ShopperChatMessage,
  UserProfile,
} from '@/types/ubi';
import { SHOPPER_PRODUCTS, INITIAL_SHOPPER_ORDER } from '@/data/mockData';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Edit3,
  Send,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  CheckCheck,
  ChevronRight,
  Search,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

interface PersonalShopperViewProps {
  userProfile: UserProfile;
  onOpenTrackingModal: (id: string) => void;
}

export const PersonalShopperView: React.FC<PersonalShopperViewProps> = ({
  userProfile,
  onOpenTrackingModal,
}) => {
  const [order, setOrder] = useState<ShopperOrder>(INITIAL_SHOPPER_ORDER);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [customItemText, setCustomItemText] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Filter products by category & search
  const filteredProducts = SHOPPER_PRODUCTS.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setOrder((prev) => {
      const existing = prev.items.find((item) => item.product.id === product.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = prev.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prev.items, { product, quantity: 1 }];
      }

      const newSubtotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return {
        ...prev,
        items: newItems,
        subtotal: newSubtotal,
        total: newSubtotal + prev.serviceFee,
      };
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setOrder((prev) => {
      const newItems = prev.items
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      const newSubtotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return {
        ...prev,
        items: newItems,
        subtotal: newSubtotal,
        total: newSubtotal + prev.serviceFee,
      };
    });
  };

  const handleRemoveItem = (productId: string) => {
    setOrder((prev) => {
      const newItems = prev.items.filter((item) => item.product.id !== productId);
      const newSubtotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return {
        ...prev,
        items: newItems,
        subtotal: newSubtotal,
        total: newSubtotal + prev.serviceFee,
      };
    });
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemText.trim()) return;

    const customProduct: ProductItem = {
      id: `custom_${Date.now()}`,
      name: customItemText.trim(),
      category: 'especialidad',
      weight: 'Especial',
      price: 3.5,
      image: '✨',
      description: 'Artículo personalizado solicitado al Shopper',
    };

    handleAddToCart(customProduct);
    setCustomItemText('');
  };

  // Chat message send
  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ShopperChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrder((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newMsg],
    }));
    setChatInput('');

    // Shopper auto reply
    setTimeout(() => {
      const shopperReply: ShopperChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'shopper',
        text: '¡Entendido Ramón! Ya lo tomo en cuenta en el pasillo del supermercado 👍',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setOrder((prev) => ({
        ...prev,
        chatMessages: [...prev.chatMessages, shopperReply],
      }));
    }, 1200);
  };

  const handleFinalizeOrder = () => {
    setIsOrderPlaced(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f7fb] pb-16 md:pb-0">
      {/* Top Banner Header matching Screenshot 11 */}
      <section className="bg-[#0c2340] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-xs text-teal-300 font-semibold mb-3 border border-white/10">
                <span>Servicio Exclusivo Ciudad Bolívar</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
                Compras Asistidas: Tu Personal Shopper Personalizado
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Simplemente dinos qué necesitas y nosotros nos encargamos en el supermercado o farmacia.
              </p>
            </div>

            {/* ORDER STATUS PROGRESSION BAR matching Screenshot 11 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/15 w-full md:w-auto md:min-w-[440px]">
              <div className="flex items-center justify-between text-xs font-bold text-teal-300 mb-3 gap-2">
                <span className="text-white font-mono bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">Pedido {order.id}</span>
                <div className="flex items-center gap-2 bg-teal-950/60 border border-teal-500/30 px-3 py-1 rounded-full text-teal-300 shadow-inner">
                  <div className="relative flex items-center justify-center w-3 h-3">
                    <span className="absolute w-3 h-3 rounded-full border border-teal-400/50 animate-spin" style={{ borderTopColor: 'transparent', animationDuration: '3s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ec4b6]" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wide">
                    Status: Compras en Progreso
                  </span>
                </div>
              </div>

              {/* Step Progress Indicators */}
              <div className="relative flex items-center justify-between text-xs">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-4 right-4 h-1 bg-white/20 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-4 w-1/2 h-1 bg-[#2ec4b6] -translate-y-1/2 z-0" />

                {/* Step 1: Asignación */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#2ec4b6] text-[#0c2340] font-bold flex items-center justify-center shadow-md">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-200 mt-1">Asignación</span>
                </div>

                {/* Step 2: Compras en Progreso */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#2ec4b6] text-[#0c2340] font-extrabold flex items-center justify-center ring-4 ring-teal-400/30 shadow-md">
                    <ShoppingBag size={16} />
                  </div>
                  <span className="text-[11px] font-bold text-teal-300 mt-1">Compras en Progreso</span>
                </div>

                {/* Step 3: Revisión */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#d4a373] text-[#0c2340] font-bold flex items-center justify-center shadow-md">
                    3
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300 mt-1">Revisión</span>
                </div>

                {/* Step 4: Pago y Entrega */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-slate-300 font-bold flex items-center justify-center">
                    4
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 mt-1">Pago y Entrega</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN INTERACTIVE WORKSPACE (Grid: Cart / Products / Live Chat) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: SHOPPING LIST SUMMARY (3 Cols) matching Screenshot 11 */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-lg border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#00a896] flex items-center justify-center">
                    <ShoppingBag size={18} />
                  </div>
                  <h3 className="font-extrabold text-base text-[#0c2340]">
                    Shopping List Summary
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {order.items.length} productos
                </span>
              </div>

              {/* Store Assigned Banner */}
              <div className="bg-slate-50 rounded-2xl p-3 mb-4 text-xs">
                <p className="text-slate-500 font-medium">Establecimiento asignado:</p>
                <p className="font-bold text-[#0c2340]">{order.storeName}</p>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {order.items.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Tu lista está vacía. Selecciona productos del catálogo o escribe un encargo especial.
                  </div>
                ) : (
                  order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-100 transition"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                        <span className="text-xl flex-shrink-0">{item.product.image}</span>
                        <div className="truncate">
                          <h4 className="text-xs font-bold text-[#0c2340] truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            ${item.product.price.toFixed(2)} c/u • {item.product.weight}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Stepper & Delete */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#0c2340]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Eliminar producto"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total Calculation & Checkout */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal productos:</span>
                  <span className="font-semibold text-slate-800">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tarifa de servicio Shopper:</span>
                  <span className="font-semibold text-slate-800">${order.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm">
                  <span className="font-extrabold text-[#0c2340]">Total Running:</span>
                  <span className="text-xl font-extrabold text-[#00a896]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinalizeOrder}
                className="w-full py-3.5 px-4 bg-[#0c2340] hover:bg-[#081a30] active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2"
                id="btn-finalizar-pedido-shopper"
              >
                <span>{isOrderPlaced ? 'Pedido Confirmado' : 'Finalizar Pedido'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* COLUMN 2: ITEM SELECTION GRID (5 Cols) matching Screenshot 11 */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 shadow-lg border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="font-extrabold text-lg text-[#0c2340]">
                Item Selection Grid
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en el súper..."
                  className="py-1.5 pl-8 pr-3 bg-slate-100 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 w-full sm:w-44"
                />
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Category Filter Tabs matching Screenshot 11 */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs whitespace-nowrap">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'viveres', label: 'Víveres (Groceries)' },
                { id: 'farmacia', label: 'Farmacia' },
                { id: 'panaderia', label: 'Panadería' },
                { id: 'retail', label: 'General Retail' },
                { id: 'especialidad', label: 'Specialty Shops' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition ${
                    selectedCategory === cat.id
                      ? 'bg-[#00a896] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-teal-300 rounded-2xl transition shadow-2xs flex flex-col justify-between"
                >
                  <div className="text-center py-2">
                    <div className="text-4xl mb-1">{prod.image}</div>
                    <h4 className="font-extrabold text-xs text-[#0c2340] leading-tight line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{prod.weight}</p>
                    <p className="text-sm font-extrabold text-[#0c2340] mt-1">
                      ${prod.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="w-full py-2 bg-[#2ec4b6] hover:bg-[#20b2a5] text-[#0c2340] font-extrabold text-xs rounded-xl transition shadow-2xs active:scale-95 flex items-center justify-center gap-1"
                  >
                    <Plus size={14} />
                    <span>Añadir</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Item Request Form */}
            <form onSubmit={handleAddCustomItem} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={customItemText}
                onChange={(e) => setCustomItemText(e.target.value)}
                placeholder="¿Otro producto específico? Ej: Queso Guayanés, Leche condensada..."
                className="flex-1 py-2 px-3 bg-slate-100 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-[#0c2340] hover:bg-[#081a30] text-white font-bold text-xs rounded-xl transition"
              >
                Encargar
              </button>
            </form>
          </div>

          {/* COLUMN 3: LIVE CHAT PANEL WITH SHOPPER (4 Cols) matching Screenshot 11 */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col h-[580px]">
            {/* Shopper Header */}
            <div className="bg-[#00a896] text-white p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={order.shopperAvatar}
                    alt={order.shopperName}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm leading-tight">{order.shopperName}</h4>
                  <p className="text-[11px] text-teal-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    En vivo en el supermercado
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-[#f8fafc]">
              {order.chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isSystem = msg.sender === 'system';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="text-center my-1">
                      <span className="inline-block px-2.5 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-medium rounded-full">
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
                      className={`max-w-[85%] rounded-2xl p-2.5 text-xs shadow-2xs ${
                        isUser
                          ? 'bg-[#00a896] text-white rounded-tr-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Suggestions Chips */}
            <div className="p-2 bg-slate-50 border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
              <button
                onClick={() => setChatInput('¿Hay Harina PAN disponible?')}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-700 hover:border-teal-400"
              >
                ¿Hay Harina PAN?
              </button>
              <button
                onClick={() => setChatInput('Revisa la fecha de vencimiento porfa')}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-700 hover:border-teal-400"
              >
                Verificar fecha
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendChatMessage} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5">
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-teal-600 rounded-full"
                title="Adjuntar foto"
                onClick={() => setChatInput('Te envío la foto de la marca exacta')}
              >
                <Camera size={16} />
              </button>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 py-2 px-3 bg-slate-100 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-2 bg-[#00a896] hover:bg-[#008f80] disabled:opacity-40 text-white rounded-xl transition"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
